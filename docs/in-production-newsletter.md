# In Production newsletter runbook

## What it is

In Production is a twice-weekly email with four case studies from the LLMOps Database. It goes out every Tuesday and Thursday at 09:00 Europe/Amsterdam to the Brevo list that collects LLMOps signups. The email footer says it is made by ZenML Labs.

A GitHub Actions workflow builds each issue ahead of time and queues it in Brevo. Nobody writes an issue by hand. A person can still cancel or edit one before it sends (see "The veto window").

## How a run works

The code is in `scripts/newsletter/`, and `run.ts` calls the steps in this order.

1. Work out the send slot (the next Tuesday or Thursday 09:00, at least 12 hours away). If Brevo already has a queued campaign for that slot, stop. This stops a second run from sending a duplicate.
2. Work out which entries were already sent. The script reads the past "In Production #N" campaigns from Brevo and pulls the case-study links out of their HTML. Only sent, queued, in-review, in-process and archived campaigns count. A cancelled or draft campaign does not, so its entries go back into the pool.
3. Build the pool: entries published in the last 30 days that were not already sent. If four good entries do not turn up, widen the window to 60 days.
4. Ask Jev (the TypeSafe scoring model) about each entry: how much evidence of production use, and how technically specific. Entries below the floor are dropped.
5. Pick the four newest entries that survived. No company appears twice. No industry appears twice unless that is the only way to reach four.
6. Check that each picked entry's page answers with HTTP 200. A dead page drops out and the next entry takes its place.
7. Ask the writer model (`gpt-6-luna`) for a two-sentence technical blurb per entry. For every sentence it names the section of the entry it drew on. The first entry also gets a short hook for the subject line.
8. Jev checks each sentence against the section the writer named, and scores the tone. A blurb that fails gets one retry with the reasons attached. If the retry fails too, the issue uses the first sentence of the entry's own summary, word for word, and the run report marks it with a warning sign.
9. Render the email HTML.
10. Create the Brevo campaign as a draft.
11. Send a preview to the three preview addresses.
12. Schedule the campaign for the slot. This step only happens in schedule mode.
13. Email a run report to the same three addresses: which entries went in, which were filtered out and why, each blurb's Jev result, and any fallback.

## The veto window

The preview and the run report arrive about 15 hours before the send (the run starts the afternoon before). To stop or change an issue:

- Open the campaign in Brevo (its name is "In Production #N", followed by the date).
- To edit it, change the content while it is still queued. To stop it, cancel it or move it back to a draft.
- Do this before 09:00 on the send day.

What happens next depends on what you did. If you cancel or draft the campaign, its entries count as unsent and can appear in a later issue. If you leave it queued, it sends and its entries are used up. The next timer run sees that the slot is empty and builds a fresh issue for it, so cancel early enough that a rebuild is what you want.

## Modes

`pnpm newsletter:run --mode=<mode>` takes three modes.

| Mode | Brevo writes | What you get |
| --- | --- | --- |
| `dry-run` | none | Renders the issue to a temporary HTML file and prints the report as JSON. |
| `test-only` | draft campaign, preview email, run report | Everything except the scheduling. |
| `schedule` | draft, preview, schedule, run report | The real thing. The issue goes to the list at the send slot. |

The workflow is `.github/workflows/newsletter.yml`.

- The timer fires Monday and Wednesday at 16:00 UTC, so the issue lands on the next Tuesday or Thursday. Timer runs use `schedule` mode.
- Timer runs do nothing until the repository variable `NEWSLETTER_LIVE` is set to `true`. Turn that variable off to pause the newsletter.
- Manual runs (workflow dispatch) default to `test-only`. Pick `schedule` on purpose, or `dry-run` for no Brevo writes at all.
- The job only runs on `main`. It never runs on pull requests, and it uses no Cloudflare credentials.

Secrets the workflow reads (names only): `BREVO_API_KEY`, `OPENAI_API_KEY`, `TYPESAFE_API_KEY`.

## Local preview

Put the three keys in the repo's `.env`, then run `pnpm newsletter:preview`. It runs a dry run: it reads Brevo campaigns if a Brevo key exists, calls OpenAI and Jev, writes nothing to Brevo, and prints where it saved the rendered HTML. Open that file in a browser.

## When something goes wrong

- Fewer than four eligible entries after widening to 60 days: the run skips this slot and sends the report explaining why. No campaign is created.
- OpenAI or Jev is down, or a key is wrong: the run fails before it touches Brevo. Check the workflow log, fix the cause, and re-run manually. Nothing was queued, so nothing goes out.
- The writer returns unusable output: that entry gets one retry, then the plain first sentence of its summary. The issue still ships and the report flags it.
- The preview email fails to send: the draft stays a draft, nothing is scheduled, and a re-run tries again.

## Tuning

- `scripts/newsletter/quality.ts` holds the Jev model version and the three thresholds: `WORTH_FLOOR` (entry filter), `SUPPORT_CONFIDENCE_MIN` (a sentence must be supported by its section at this confidence), and `TONE_MAX` (promotional tone ceiling).
- Jev is pinned to one version on purpose, never `jev-latest`. The thresholds were set against that version's scores. Before changing the version, re-check the thresholds on a labelled sample of recent entries.
- `scripts/newsletter/write.ts` holds the writer model and its editorial rules.
- The brief is about what teams built and what they learned. Blurbs leave out user counts, benchmark scores and business outcomes, unless the number is itself the technical point (a threshold, a timeout, a tier count).
- Pool size, window lengths and the issue size live in `scripts/newsletter/run.ts`. Send days and hour live in `schedule.ts`.
- Tests are in `tests/newsletter/`.

## Signup surfaces on the site

- A signup strip (`NewsletterStrip.astro`, copy from `src/lib/inProduction.ts`) sits on every LLMOps database entry and on `/llmops-database`.
- `/in-production` is the landing page, with a sample of what an issue looks like.
- The closing band on the database routes (`DATABASE_CTA` in `src/lib/databases.ts`) posts to the same Brevo list.
- MLOps database pages use their own copy in `MLOPS_DATABASE_CTA`. It says In Production sends LLMOps case studies, so nobody signs up there expecting MLOps content.
