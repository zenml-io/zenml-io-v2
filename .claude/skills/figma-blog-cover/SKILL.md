---
name: figma-blog-cover
description: >-
  Generate a blog post's cover from the Blog Cover / 16:9 component in the
  ZenML Templates Figma file: place one instance per post in its month section
  on the Blog Covers page, export it at 3840x2160, convert to AVIF + JPEG,
  upload both to R2 and print the paste-ready mainImage / seo.ogImage
  frontmatter. Also builds Kitaru-vs-X comparison cards from the VS template,
  and can add a missing ServiceLogo component (named by slug) to the Hashi
  Design System library when a VS card needs a competitor mark that doesn't
  exist yet. Use when a post in src/content/blog/ has no Figma cover, when a cover
  must be regenerated, or when blog-post-contributor reaches its cover step.
  Triggers: "blog cover", "figma cover", "cover image for post", "make the
  cover", "generate cover", "new cover", "comparison card", "add logo",
  "missing mark", "new service logo".
---

# Figma Blog Cover

## Quick start

For a person:

1. Open the ZenML Templates file in the Figma desktop app (the shared ZenML editor account, see `.env`).
2. Make sure the post exists at `src/content/blog/<slug>.md` with a `date` and a `title`.
3. Ask Claude Code: `make the cover for <slug>`. For an alternatives or versus post add the competitors: `make the comparison card for <slug> with langfuse, langsmith, arize`.
4. Look at the screenshot it shows you. The title fits in three lines and the subtitle, if any, is one short line that adds something the title doesn't say.
5. Paste the printed `mainImage` and `seo.ogImage` block into the post's frontmatter and open the PR. Until the 16:9 site layout ships, keep the block in the PR description instead.

If a competitor has no logo in Hashi yet, say `add logo <slug>`; the skill sources it, builds the component, and tells you when the library needs a republish.

For an agent: run the Preconditions, then Steps S0 to S7 in order, then Verification, then Report. Every rule you need is in this file and the references it links.

Contract: `figma-blog-cover <slug> [--brand ZenML|Kitaru] [--layout <Layout>] [--bg <Style>] [--title "..."] [--subtitle "..."] [--no-subtitle] [--comparison a,b,c] [--include-zenml True|False] [--tile-batch N] [--fallback "<reason>"] [--allow-new-column] [--dry-run]`.
Every flag is passed straight to find-slot (S0); `--dry-run`, `--allow-new-column` and `--no-subtitle` take no value, the rest take one. `find-slot.ts --month YYYY-MM` is the second form (no slug): it reflows one month section and is only used by the Idempotency rule below.
The slug is the post file `src/content/blog/<slug>.md`. One cover per post, 16:9, instance name = slug.
Read `references/figma-ids.md` before the first Figma call; the other references are listed at the end.

## Preconditions (abort on any, with a question)

1. `whoami` (Figma MCP) reports the email held in `FIGMA_EDITOR_EMAIL` (`.env`; the address never goes into a repo file) with a **Full** seat on the **ZenML** org. Any other account: stop. `figma.currentUser` is not readable inside `use_figma`, so this is the whole account gate.
2. The file `tDusxGZ3wyvc08u3GiUpy4` is open in the Figma desktop app. Check = the first `use_figma` call returns `figma.root.name` (it returns `"Document"`, not the file title) and `await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('174:1785'))` succeeds with page name `Blog Covers` (S1 does this; `174:1785` is a PAGE, not a frame under `0:1`). Any error: stop.
3. `.env` has `FIGMA_EDITOR_EMAIL`, `CLOUDFLARE_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`.
4. Load the `figma:figma-use` skill with the Skill tool before the first `use_figma` call. Its ops rule binds: **at most 10 logical operations per `use_figma` call**, and a loop counts one op per node it touches. Chunk accordingly (S2, S4).
5. `src/content/blog/<slug>.md` exists with a parseable `date`.
6. Only one lane touches Figma at a time. Never run this skill in parallel with another Figma writer.

## Defaults (find-slot derives them, flags override)

- `title` → `titleSource` → headline shortened to at most three lines (see Copy below); `seo.description` → `subtitleSource`, **input only** — the subtitle is present by default, one line derived from it; `date` → month section and slot.
- `category == kitaru` or `kitaru ∈ tags` → Brand `Kitaru`, else `ZenML`.
- Title matching `/alternatives|\bvs\b/i` → find-slot suggests `--comparison`; `/introducing|launch|release/i` → suggests `Full Bleed`.
- Eyebrow `BLOG`; Site stays at the component default (`ZENML.IO`).
- Layout and Background come from the legal set in `references/design-rules.md`, computed against the month's siblings.

## Steps

Run every step in order. Each `scripts/figma/s*.js` starts with `const P = __PARAMS__;`. Save the find-slot output as `$S/P.json` and let `node .claude/skills/figma-blog-cover/scripts/figma/paste.mjs <s*.js> "$S/P.json" "$S/<step>.js"` write the runnable copy (P pasted verbatim, keys untouched; it refuses a P that still carries `questions`), then pass that file's body as the `use_figma` code. Never paste by hand and never edit `P`. One `setCurrentPageAsync` per call, never inside a loop.

**S0 find-slot (deterministic, no Figma).** `pnpm exec tsx .claude/skills/figma-blog-cover/scripts/find-slot.ts <slug> [flags]` prints one JSON object `P` (`sectionName`, `columnX`, `orderedSlugs`, `slotIndex`, `rows`, `sectionHeight`, `positions`, `chosenLayout`, `chosenBg`, `titleSource`, `subtitleSource`, `titleBudget`, `titleMeasure`, `titleLines`, `headline`, `subtitle`, `showSubtitle`, `vs` for `--comparison`, `fallback`, `allowNewColumn`, `dryRun`, `suggestions`, `questions`). First pass without `--siblings` gives the month, section name and defaults; fail here on a bad slug or date. Exit code 3 means `questions` is non-empty — surface them and stop. A `warning:` line on stderr (also in `suggestions`) means a supplied `--title` / `--subtitle` is over its budget — fix it before S3. A suggestion that the headline would leave one word alone on its last line, or run past three lines, in the chosen layout's measure (`titleLines` is the estimate) names a wider legal layout: take it with `--layout` now — the S6 screenshot decides, but fixing it here saves a Figma round trip. On a `--comparison` run that estimate and the cover headline budget are skipped (`P.titleLines` is not meaningful for a VS card); `vs.title` and the `for` line carry their own 34-character budgets.

**S1 preflight (read-only).** Run `scripts/figma/s1-preflight.js`. It returns the year column's sections (id, name, y, height, child count) plus `columnMissing`, an existing instance named `<slug>` if any (id, parent section), and the target month's siblings as `[{slug, layout, bgStyle, date?}]`. `columnMissing: true` (a year with no column) → question, stop; only after Zuri confirms re-run find-slot with `--allow-new-column` (S2 refuses to start a column otherwise). Re-run find-slot with `--siblings '<that array>'` to get the final `P`: the legal Layout/Background given the neighbours, and a cross-check of live covers against the month's posts (a live cover that is not a post of the month, or a post with no cover, lands in `questions`). Positions come from the content collection's ordered slugs, not from the canvas. With `--dry-run` (`P.dryRun: true`) stop here and print `P`. If `existing.sectionName` differs from `P.sectionName`, the post's month changed — follow the Idempotency rule below after S5.

**S2 ensure section.** Run S2 every time; it writes nothing when the column is already correct. `scripts/figma/s2-ensure-section.js` creates the section if absent (`YYYY-MM · Month YYYY`, width 10720, height per `references/grid.md`), resizes it when `P.sectionHeight` differs (S1 reports `rowsGrew` for the report), and shifts the later sections of that column down. **Ops: at most 10 per call — the create (if any) plus section moves; the sections still to move come back in `pending`; re-run S2 while `pending` is non-empty.** Only y-values that differ are written, so re-runs converge. A year with no column → S2 throws unless `P.allowNewColumn` (see S1).

**S3 upsert cover.** `scripts/figma/s3-upsert-cover.js`: find the instance named `<slug>` or create it from the `162:1845` variant `Brand=<brand>, Layout=<layout>` (fonts of that variant loaded before `createInstance`; the instance's own fonts read back before any text write — Borna Medium, Nudica Mono Regular, Nudica Mono Medium are the floor, not the list), `setProperties` with the `#id` keys (`Show subtitle#162:33` = `P.showSubtitle`, true by default; when false the script also writes `Subtitle#162:32` as `""`), set the exposed `Background` nested instance's `Brand`/`Style`, `appendChild` into the month section, name = slug, then x/y (section-relative). For `--comparison` run `scripts/figma/s3-vs-comparison.js` instead — read `references/vs-template.md` first; every competitor needs a key from `references/service-logo-keys.md`. **Tile batches:** the script swaps only `P.vs.tileRange` (≤7 swaps per call). For Count ≤ 7 that is every tile in one call. For Count ≥ 8 find-slot emits `vs.tileBatches = [[0,7],[7,N]]`: run S3-vs with the batch-0 `P`, then re-run find-slot with the same flags plus `--tile-batch 1` and run S3-vs again with that `P` (it finds the instance by name and only swaps). Never edit `P` by hand.

**S4 reflow.** `scripts/figma/s4-reflow.js` sets x/y of every child of the month section from `P`'s ordered positions and the section height. **Ops: at most 10 per call — a section resize (if any) plus child moves; the rest come back in `pending`; re-run while non-empty** (a section holds at most 20 covers, so at most two or three calls). **Hard rule: when S4 resized the section (`mutatedNodeIds` contains the section id), it must be followed by S2 → S5** — S4 never moves the sections below, so skipping S2 leaves the grown section overlapping the next month.

**S5 verify (read-only).** `scripts/figma/s5-verify.js` compares `absoluteBoundingBox` of every child of every touched section against the section's box plus the expected slot, checks `name === slug`, and that `mainComponent.parent` is `162:1845` or `113:300`. It returns `mismatches`; anything but `[]` → fix, re-run S4/S5, do not export. Its column check already covers every section of the year column, so one S5 run with the target `P` verifies the S2 shift. Running S5 with a `--month` `P` on sections this run did not touch is optional and reports the within-section order the 2026-08-27/28 batch left there (slots that differ from find-slot's date-desc order, even two covers on one slot); those are pre-existing — list them in the report, do not reflow them unless Zuri asks (the `--month` path does that as a separate job).

**S6 export.** Eyeball first: `get_screenshot({fileKey, nodeId})` of the new instance — no clipped type, no orphan words, logos resolved, **and the copy check: a title over three lines, one word alone on the title's last line (an orphan), any multi-line subtitle, or a subtitle that restates the title is a defect — fix it, re-run S3 and screenshot again before exporting.** Remedy for line problems: the image layouts set the title in an 800 px measure, `Panel Bottom` in 1760 px and `Text` / `Full Bleed` in 1680 px (`references/design-rules.md`), so re-run S0 with the same `--siblings` plus `--layout "<wider legal layout>"` or a different `--title` cut; S3 then updates the instance in place. Then export with `download_assets` only:
```
download_assets({ fileKey: 'tDusxGZ3wyvc08u3GiUpy4', nodeId: '<instance id>', defaultFormat: 'png', defaultScale: 2 })
curl -sL -o "$S/<slug>.png" "<result export.url>"   # $S = scratch dir; the URL is short-lived, curl it immediately
```
Ignore the `rawImages` / `svgAssets` URLs in the result, and a `svgAssetsTruncated` / "select a smaller node" notice — a VS card's subtree holds more than 20 vectors, so it always says that; `export.url` is still the full PNG and it is not an error. `get_screenshot` is not an export path — it caps at the node's natural 1920x1080.

**S7 publish.** `pnpm exec tsx .claude/skills/figma-blog-cover/scripts/publish-cover.ts <slug> "$S/<slug>.png" [--no-upload] [--allow-1x]`. It asserts the PNG is exactly 3840x2160 (1920x1080 only behind `--allow-1x`, with a printed warning), writes `<slug>-cover.avif` at 1920x1080 (quality 75, 4:4:4) and `<slug>-cover.jpg` at 1920x1080 AVIF / 1200x675 JPEG for Open Graph, uploads both to `content/blog/<slug>` on R2, HEADs the URLs, and prints JSON + the YAML block. `--no-upload` stops after the local files. (`--allow-any-source` — any 16:9 image ≥1200 px wide — exists for blog-post-contributor's "cover provided" path only; never for a Figma export.)

## Copy: headline, subtitle, alt text

**Cover copy stays minimal.** The post title and `seo.description` are inputs (`P.titleSource`, `P.subtitleSource`), never pasted onto the card. Character budgets, the punctuation-boundary shortening rule, and worked examples all live in `references/design-rules.md` (Text section) — read it before writing any copy; this section states the rule, not the numbers.

- Headline: **at most three lines, no orphan word on the last line** (`P.titleBudget` carries the layout's character cap). Shorten faithfully, never rewrite — drop trailing clauses and questions, keep numbers and product names, and keep the published title's meaning. find-slot cuts at a punctuation boundary itself and asks (exit 3) when that is not enough; pass `--title "<short title>"` for the final wording.
- Subtitle: **present by default** — find-slot derives one line, at most 55 characters, from `seo.description` (`--subtitle "<line>"` overrides, `--no-subtitle` clears both fields to `showSubtitle: false` / `subtitle: ""`). Never the full `seo.description`, never two lines, never a body sentence. A derived or supplied subtitle that restates the title is a suggestion, not a question; a supplied subtitle equal to `seo.description` is still a question.
- VS card: headline `<N> <Competitor> Alternatives`; sub-line `for ` + the title's qualifier (`--subtitle` here sets the qualifier). N counts the listed competitors plus the brand tile when `--include-zenml` is true. find-slot derives the headline from the title and flags a suggestion when the title's own count differs; `--title` overrides a bad derivation.
- Every cover is screenshot-checked (S6) before it is reported: a copy defect (design-rules.md's Visual acceptance section) must be fixed before export.
- Alt text (goes in the YAML): one sentence describing what is on the card — brand, headline, and for a VS card the logos in tile order. Pattern from the existing posts: `ZenML blog cover for <title>, showing the logos of A, B, C`; VS card: `<Brand> comparison card for <headline> <for-line>, showing the logos of <Brand>, A, B, C` (brand tile first, then the competitors in tile order).

## Fallback rule (never silent)

`--comparison` with any competitor whose `ServiceLogo/<slug>` key is unknown, or a failure of `variant.createInstance()` / `swapComponent` in S3-vs → key lookup first: (a) `mainComponent.key` off an existing `ServiceLogo/<slug>` instance in the file, or (b) `get_libraries` / `search_design_system` with an **exact** name match `ServiceLogo/<slug>` — a fuzzy hit is a miss. Still missing → **offer the Missing marks sub-flow below before falling back**: ask whether to add the mark now (it takes one source-mark.sh call plus a look at the candidate, usually a couple of minutes) rather than silently downgrading a VS card that could have had the real logo. Only after that offer is declined, or the sub-flow itself fails (no automatic candidate and no time to source by hand, or a mark that fails the visual acceptance check) → build a `Blog Cover / 16:9` with Layout `Panel Bottom` instead, set `fallback` in the report and **print it in bold** with the reason. Append any key found (by lookup or by adding the mark) to `references/service-logo-keys.md`.

Procedure: **re-run S0 without `--comparison` and with `--fallback "<reason>"`** (keep `--siblings` and the other flags). That `P` forces `chosenLayout: "Panel Bottom"`, has `comparison`/`vs` null, `expectedSetId` = the cover set `162:1845`, and carries `fallback: "<reason>"` for the report. A Panel Bottom adjacency clash is passed through as a suggestion, not a question — the fallback rule overrides the adjacency rule; say so in the report. Never run `s3-upsert-cover.js` with the `--comparison` `P` (its `expectedSetId` is `113:300`, so S5 would fail on the set id) and never hand-edit `P`. If a VS attempt left a broken instance named `<slug>`, remove it before S3 — the cover path reuses the name. Then continue from S1 with the new `P`. Record every deviation from these steps in the report.

## Missing marks

When a VS card needs a `ServiceLogo/<slug>` that isn't in `references/service-logo-keys.md` and both lookups above miss, this skill can add it to the Hashi Design System library instead of falling back straight to Panel Bottom. Full sub-flow: `references/add-mark.md`. Short version: `scripts/source-mark.sh <slug> [<display name>]` tries Iconify/SVGL/LobeHub automatically and saves rendered candidates to look at; pick one (or source by hand from the brand's site/GitHub org), fix any raw-SVG issues (CSS-class fills, empty `fill=""`, missing `xmlns`, `currentColor`), then `scripts/normalize-mark.sh <svg> <slug>` runs the monorepo's contract normalizer and copies the result into the monorepo's asset folder. Creating the actual Figma component is `scripts/figma/m1-create-mark.js` (paste convention, same as every other script here) followed by the read-only `m2-verify-mark.js` sanity re-check and a `get_screenshot` look. Record the new key with `scripts/append-key.ts <slug> <key>`. A new component cannot be used from the templates file until a library editor republishes Hashi through the Figma UI — this sub-flow ends by listing every mark awaiting republish plus the monorepo-commit and FIGMA-PARITY.md follow-ups, it does not wait for the republish itself.

## Idempotency

- An instance named `<slug>` is updated in place, never duplicated; if its month changed it is reparented into the right section (set x/y again after `appendChild` — the numbers do not follow the node).
- **Month changed (S1 `existing.sectionName !== P.sectionName`): the old section must be reflowed too, mandatory.** After S5 passes for the new month, in this order: (1) `find-slot.ts --month <old YYYY-MM>` with no `--siblings`; (2) run S1 with that `P` (it accepts a `--month` `P`) to read the old section's live siblings *after* the reparent — the first S1 run only returned the new month's siblings, and any list captured before S3 still contains the moved slug and would fail find-slot's cross-check; (3) re-run `find-slot.ts --month <old YYYY-MM> --siblings '<that array>'` (its `P` has `slug: null` and the old month's positions); (4) S2, S4 and S5 with that `P`. S3 is never run with a `--month` `P`. If the old month has no posts left, find-slot asks (exit 3): leave the section in place at height 1480 and report it — this skill never deletes a section; Zuri removes it by hand and the next S2 run closes the column gap.
- Retries reuse the instance by name. A broken instance (missing tiles, failed swaps) is removed before the retry.
- A run that finds its section and its instance already on the canvas (an earlier aborted attempt, or a re-run with new copy) is the normal case, not a deviation: S2 and S4 write nothing (`ops: 0`, `pending: []`), S3 updates copy, layout and background in place. Never delete and recreate a healthy instance.
- Switching a post between the cover template and the VS template (either direction, including the Panel Bottom fallback after a VS attempt) requires removing the old instance first: both S3 scripts check the instance's component set against `P.expectedSetId` and refuse to touch an instance from the other set.
- Reflow recomputes every position from the ordered slug list, so re-runs converge to the same canvas.
- Sections are found by exact name and created only when absent.

## Verification (before reporting done)

- S5 returned `mismatches: []` for every touched section — including the old month's section after a month change; the new instance's `name === slug`.
- The S6 screenshot passed the copy check: title on at most three lines with no orphan word on the last line, subtitle absent or a single line at most 55 characters that adds something the title does not say (S3's `props.ShowSubtitle` matches `P.showSubtitle`).
- Pre-existing mismatches S5 reported in sections this run did not touch are listed in the report as such, and were not reflowed.
- `sips -g pixelWidth -g pixelHeight "$S/<slug>.png"` → 3840 x 2160.
- `.cache/covers/<slug>-cover.avif` is 1920x1080 and `.jpg` is 1200x675; `curl -sI <url>` on both R2 URLs → `200` with `content-type: image/avif` / `image/jpeg`.
- The YAML uses the AVIF for `mainImage.url` and the JPEG for `seo.ogImage` — never the same URL.

## Report

One JSON block `{figmaNodeId, sectionName, slot, layout, brand, bgStyle, headline, subtitle, png, avif, jpg, urls, fallback, questions}` (`subtitle` is `""` only when `--no-subtitle` was passed or `seo.description` is empty) followed by the paste-ready YAML:
```yaml
mainImage:
  url: "https://assets.zenml.io/content/blog/<slug>/<sha8>/<slug>-cover.avif"
  alt: "<alt text>"
seo:
  ogImage: "https://assets.zenml.io/content/blog/<slug>/<sha8>/<slug>-cover.jpg"
```
The two `sha8` segments differ (content-addressed keys). Do not edit the post's frontmatter unless asked — hand the snippet over. Unknown sibling names, a missing column, or a placement mismatch go into `questions`; stop before writing or exporting.

## References

- `references/figma-ids.md` — file key, page/section ids, component sets, property keys, variant names, fonts, account gate.
- `references/grid.md` — slot geometry, section sizes, column layout, reflow algorithm.
- `references/design-rules.md` — legal Layout/Background combinations, per-month photo uniqueness, character budgets.
- `references/traps.md` — ops budget and chunking, fonts, section-relative coordinates, stale API surface, export gotchas, what the first E2E run taught.
- `references/vs-template.md` — live VS instance tree and the tile-swap recipe.
- `references/service-logo-keys.md` — `ServiceLogo/<slug>` component keys (supplied, never discovered by `use_figma`).
- `references/add-mark.md` — sub-flow for adding a missing `ServiceLogo/<slug>` mark: sourcing order, pre-fix checklist, normalize, Figma creation (M1/M2), key append, republish gate.
