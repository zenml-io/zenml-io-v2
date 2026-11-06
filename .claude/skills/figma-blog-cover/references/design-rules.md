# Cover design rules

Rules for every cover. find-slot applies them deterministically; flags may override only inside the legal set — an illegal combination is rejected with a question, not silently corrected.

## Format and placement

- **16:9 for everything.** Covers are `Blog Cover / 16:9` (or the VS template) at 1920 x 1080; published files are a 1920 x 1080 AVIF (`mainImage.url`) and a 1200 x 675 JPEG (`seo.ogImage`).
- One instance per post, on the Blog Covers page (`174:1785`, `figma-ids.md`), in the section for the post's `date` month, instance name = post slug exactly.

## Brand

- `category == kitaru` or `kitaru` in `tags` → `Brand=Kitaru`; everything else `Brand=ZenML`. Background `Brand` always equals the cover `Brand`.
- The logo follows the Brand. `ZenML Labs` is the one alternative: ZenML brand only, for posts about the company rather than a product. It exists on the code route (`--logo "ZenML Labs"`), because the Figma template has no Labs option.

## Variety

- Inside the legal set, take the layout and background the month has used least, and avoid a background a neighbouring cover shows. find-slot does this and the post's slug breaks ties, so a re-run lands on the same cover and an empty month still varies. `Full Bleed` still comes first on a launch title.
- Copy fit outranks adjacency. When no legal layout holds the copy, `render-cover.ts` may repeat a neighbour's layout and says so; `Full Bleed` still needs a launch title.
- A code cover counts as soon as it is recorded in `assets/cover-manifest.json`. Both routes read that file.

## Layout

- Legal `Layout` values: `Text`, `Panel Bottom`, `Image Right`, `Image Left`, `Full Bleed`.
- **No two adjacent covers in a section share a `Layout`** (adjacent = neighbouring slots in the ordered list, i.e. slot i and i±1 after reflow). Exception: two `Panel Bottom` covers may touch when both carry a photo (the photo rule below wins).
- `Full Bleed` is reserved for release/launch posts (`/introducing|launch|release/i` in the title).
- `Text` is for opinion and deep-dive shapes.
- Comparison / alternatives posts (`/alternatives|\bvs\b/i`) get the VS template when every competitor key is known, otherwise `Panel Bottom` (the documented fallback: re-run find-slot with `--fallback "<reason>"`, reported in bold). The fallback overrides the adjacency rule — a Panel Bottom clash is noted in the report, not asked.

## Background (`Style`)

- New covers use **`Photo 01`–`Photo 09` only**, never the legacy un-numbered `Photo`. The legacy `Photo` on existing covers is not a number and does not count toward uniqueness.
- **Photos are per brand.** `Photo 01`–`Photo 09` hold the same image under both `Brand` variants of Cover BG (`150:1697`), so setting the Background's `Brand` does not make a photo on-brand. Kitaru uses only `Photo 01` and `Photo 08` (the saturated orange/green photos); ZenML uses only `Photo 02`–`07` and `Photo 09` (the pale sage/peach ones). find-slot emits the list as `P.brandPhotos`, S3 refuses and S5 reports an off-brand photo. Read 2026-10-29 from the variants; update this list and `BRAND_PHOTOS` in find-slot together if the photo set changes.
- **Photos rotate.** find-slot takes the brand photo the month has used least, and avoids one a neighbouring cover shows. A month can repeat a photo, but only after using the others; Kitaru reaches that after two.
- **Layouts with an image area take photos only.** `Panel Bottom`, `Image Left` and `Image Right` use `Photo 01`–`Photo 09`.
- **`Photo 08` never goes on `Image Right`,** because that half of the photo is nearly plain grey. `Image Left` and `Panel Bottom` are fine.
- **Full covers never take a photo.** `Text` and `Full Bleed` use the full backgrounds: `Chevron`, `Mesh`, `Field`, `Tint` and `Deep`. Those five never go on a layout with an image area.
- `Full Bleed` only takes `Deep`, because its type is light. `Text` takes `Chevron`, `Mesh`, `Field` or `Tint`, never `Deep`, because its type is dark.

## Text

- Eyebrow `BLOG` by default; live covers also use `DEEP DIVE`, `GUIDE`, `CASE STUDY`, `RESEARCH`, `NEWSLETTER`, `RELEASE` and `COMPARISON`, so a regenerated cover keeps its eyebrow. Site stays at the component default `ZENML.IO`.
- **Cover copy stays minimal** — a card carrying the full four-line title with `seo.description` as a four-line subtitle is rejected. The post title and `seo.description` are inputs (`P.titleSource`, `P.subtitleSource`), never pasted onto the card.
- Headline: **at most three lines, no orphan word on the last line.** The character budget is a copy cap, not a line count: about **90 characters** on `Text` and `Full Bleed` (two lines), about **60** on `Panel Bottom` / `Image Left` / `Image Right` (find-slot emits it as `P.titleBudget`). Shorten faithfully, never rewrite or invent: drop trailing clauses and questions, keep numbers and product names, keep the published title's meaning (including retired vocabulary if the title uses it). Example: `Braintrust Pricing Guide: How Much Does It Actually Cost?` → `Braintrust Pricing Guide`. find-slot cuts at a punctuation boundary itself; pass `--title` for a better cut.
- How the headline breaks depends on the layout's title measure (`figma-ids.md`): `Image Left` / `Image Right` set it in **800 px**, `Text` / `Full Bleed` in 1680 px, `Panel Bottom` in 1760 px. At 800 px about 18 characters fit on a line (`Braintrust Pricing Guide` became `Braintrust Pricing / Guide` — an orphan). find-slot estimates the breaks (`P.titleLines`) and, when the last line would be a single word or a fourth line appears, suggests the widest legal layout for the slot; take it with `--layout` before S3, or re-cut with `--title`. The S6 screenshot is the final judge.
- Subtitle: **present by default, shortened to one line unless `--subtitle` sets a longer one on a layout that holds it** — find-slot derives one line, at most 55 characters, from `seo.description`: the first clause up to a clause boundary (`:`, `;`, `,`, ` — `, ` - `, `.`) that fits the budget, with a trailing period stripped; when no clause fits it cuts at the last word boundary instead and flags a suggestion asking for a better line. `--subtitle "<line>"` overrides (e.g. `Plans, meters and the real monthly bill`); `--no-subtitle` clears it to `showSubtitle: false`, `Subtitle` written as `""`, `Show subtitle#162:33 = false`. Never the full `seo.description`, never two lines in `Panel Bottom`. A subtitle equal to `seo.description` is a question; one that restates the title is a suggestion, not a question.
- **Long copy changes the layout, never the panel.** `Panel Bottom` is for short copy: at most a two-line title (60 characters) with a one-line subtitle (55 characters). Anything longer goes to a layout with no division (`Text`, or `Full Bleed` on a launch title) or to two columns (`Image Left`, `Image Right`). Those take a title of up to three lines and a subtitle of up to 100 characters: two lines on `Text` and `Full Bleed`, three in a column. A title over 60 characters needs `Text` or `Full Bleed`, because at 800 px it would run past three lines. find-slot applies this when it picks a layout and flags a `--layout` that does not hold the copy. If no legal layout holds it, shorten the copy. Older covers that break this are legacy, never precedent.
- VS card: headline `<N> <Competitor> Alternatives` at **most 34 characters**; sub-line `for ` (Borna Medium) + qualifier (Borna SemiBold), the whole `for …` line at **most 34 characters**. N = competitor tiles + 1 when `Include ZenML=True`. find-slot derives it from the post title (`<number> [Best] <Competitor> Alternatives` anywhere in the title → `<N> <Competitor> Alternatives`, N recomputed from the tiles, `Best` and `We Tested …` dropped; the qualifier is the text after ` for `). The cover-template budgets and line estimate do not apply to a VS card.

## Visual acceptance (eyeball via `get_screenshot` before export)

No clipped or overflowing title, no orphan word on the last line, logos resolved (no placeholder tile), brand matches the post, no gap left in the month grid after reflow. **Copy defects that block export:** a title over three lines, a single word alone on the title's last line, copy past its layout's limit (a two-line subtitle in `Panel Bottom` above all), or a subtitle that restates the title — fix (`--layout` with a wider measure, `--title`, drop `--subtitle`), re-run S3 (it updates in place), screenshot again.
