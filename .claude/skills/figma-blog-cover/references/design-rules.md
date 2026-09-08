# Cover design rules

Rules for every cover. find-slot applies them deterministically; flags may override only inside the legal set — an illegal combination is rejected with a question, not silently corrected.

## Format and placement

- **16:9 for everything.** Covers are `Blog Cover / 16:9` (or the VS template) at 1920 x 1080; published files are a 1920 x 1080 AVIF (`mainImage.url`) and a 1200 x 675 JPEG (`seo.ogImage`).
- One instance per post, on the Blog Covers page (`174:1785`, `figma-ids.md`), in the section for the post's `date` month, instance name = post slug exactly.

## Brand

- `category == kitaru` or `kitaru` in `tags` → `Brand=Kitaru`; everything else `Brand=ZenML`. Background `Brand` always equals the cover `Brand`.

## Layout

- Legal `Layout` values: `Text`, `Panel Bottom`, `Image Right`, `Image Left`, `Full Bleed`.
- **No two adjacent covers in a section share a `Layout`** (adjacent = neighbouring slots in the ordered list, i.e. slot i and i±1 after reflow).
- `Full Bleed` is reserved for release/launch posts (`/introducing|launch|release/i` in the title).
- `Text` is for opinion and deep-dive shapes.
- Comparison / alternatives posts (`/alternatives|\bvs\b/i`) get the VS template when every competitor key is known, otherwise `Panel Bottom` (the documented fallback: re-run find-slot with `--fallback "<reason>"`, reported in bold). The fallback overrides the adjacency rule — a Panel Bottom clash is noted in the report, not asked.

## Background (`Style`)

- New covers use **`Photo 01`–`Photo 09` only**, never the legacy un-numbered `Photo`. The legacy `Photo` on existing covers is not a number and does not count toward uniqueness.
- **No two covers inside one month section share a `Photo 0N`.** Round-robin the free numbers. No free number left → find-slot puts a question in `P`; stop and ask rather than repeat one.
- **Hard rule:** `Image Left` / `Image Right` only ever pair with `Photo 0N`, `Mesh` or `Deep`. `Field` and `Tint` are too quiet to carry half a card.

## Text

- Eyebrow `BLOG`. Site stays at the component default `ZENML.IO`.
- **Cover copy stays minimal** — a card carrying the full four-line title with `seo.description` as a four-line subtitle is rejected. The post title and `seo.description` are inputs (`P.titleSource`, `P.subtitleSource`), never pasted onto the card.
- Headline: **at most three lines, no orphan word on the last line.** The character budget is a copy cap, not a line count: about **55 characters** on `Text` and `Full Bleed`, about **60** on `Panel Bottom` / `Image Left` / `Image Right` (find-slot emits it as `P.titleBudget`). Shorten faithfully, never rewrite or invent: drop trailing clauses and questions, keep numbers and product names, keep the published title's meaning (including retired vocabulary if the title uses it). Example: `Braintrust Pricing Guide: How Much Does It Actually Cost?` → `Braintrust Pricing Guide`. find-slot cuts at a punctuation boundary itself; pass `--title` for a better cut.
- How the headline breaks depends on the layout's title measure (`figma-ids.md`): `Image Left` / `Image Right` set it in **800 px**, `Text` / `Full Bleed` in 1680 px, `Panel Bottom` in 1760 px. At 800 px about 18 characters fit on a line (`Braintrust Pricing Guide` became `Braintrust Pricing / Guide` — an orphan). find-slot estimates the breaks (`P.titleLines`) and, when the last line would be a single word or a fourth line appears, suggests the widest legal layout for the slot; take it with `--layout` before S3, or re-cut with `--title`. The S6 screenshot is the final judge.
- Subtitle: **present by default, shortened to one line** — find-slot derives one line, at most 55 characters, from `seo.description`: the first clause up to a clause boundary (`:`, `;`, `,`, ` — `, ` - `, `.`) that fits the budget, with a trailing period stripped; when no clause fits it cuts at the last word boundary instead and flags a suggestion asking for a better line. `--subtitle "<line>"` overrides (e.g. `Plans, meters and the real monthly bill`); `--no-subtitle` clears it to `showSubtitle: false`, `Subtitle` written as `""`, `Show subtitle#162:33 = false`. Never the full `seo.description`, never two lines. A subtitle equal to `seo.description` is a question; one that restates the title is a suggestion, not a question.
- VS card: headline `<N> <Competitor> Alternatives` at **most 34 characters**; sub-line `for ` (Borna Medium) + qualifier (Borna SemiBold), the whole `for …` line at **most 34 characters**. N = competitor tiles + 1 when `Include ZenML=True`. find-slot derives it from the post title (`<number> [Best] <Competitor> Alternatives` anywhere in the title → `<N> <Competitor> Alternatives`, N recomputed from the tiles, `Best` and `We Tested …` dropped; the qualifier is the text after ` for `). The cover-template budgets and line estimate do not apply to a VS card.

## Visual acceptance (eyeball via `get_screenshot` before export)

No clipped or overflowing title, no orphan word on the last line, logos resolved (no placeholder tile), brand matches the post, no gap left in the month grid after reflow. **Copy defects that block export:** a title over three lines, a single word alone on the title's last line, any multi-line subtitle, or a subtitle that restates the title — fix (`--layout` with a wider measure, `--title`, drop `--subtitle`), re-run S3 (it updates in place), screenshot again.
