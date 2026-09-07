# Figma ids and property keys

All values read live on 2026-09-07 (Spike). Never re-derive an id from a name search; use these.

## File, page, account

| What | Value |
|---|---|
| File | **ZenML Templates — New Brand**, key `tDusxGZ3wyvc08u3GiUpy4` |
| Page | `174:1785` **Blog Covers** — a PAGE of its own (the root has three: `0:1` Social Media, `102:8` Swag - Postcards, `174:1785` Blog Covers); `await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('174:1785'))` once per call |
| Blog Covers container | `174:1785` — the same PAGE node; the month sections are its direct children, so section x/y are page coordinates and the page has no `absoluteBoundingBox` (S5 treats the container origin as 0,0) |
| Account gate | `whoami` → the shared ZenML Figma editor account: email equal to `FIGMA_EDITOR_EMAIL` in `.env` (the address is never written into a repo file), plans: ZenML (seat **Full**, tier org), Libraries (seat View, tier starter). `figma.currentUser` inside `use_figma` throws `in get_currentUser: "currentUser" is not a supported API` — do not call it |
| File-open check | first `use_figma` call returns `figma.root.name === "Document"` (not the file title) and `await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('174:1785'))` succeeds with `figma.currentPage.name === "Blog Covers"`; any error → stop with a question. Gate on `174:1785` only: `0:1` (Social Media) holds no covers, and `figma.currentPage` at the start of a call is whatever page the desktop app last showed, so it proves nothing |

## Blog Cover / 16:9 — component set `162:1845`

Variant names are literally `Brand=<Brand>, Layout=<Layout>` (e.g. `162:1765` = `Brand=Kitaru, Layout=Panel Bottom`). Find the variant with `set.children.find(c => c.name === ...)`. Read `componentPropertyDefinitions` off the COMPONENT_SET, never off a variant COMPONENT.

| Property key (verbatim, `#id` suffix included) | Type | Default |
|---|---|---|
| `Eyebrow#162:30` | TEXT | `BLOG` |
| `Title#162:31` | TEXT | (set default headline) |
| `Subtitle#162:32` | TEXT | (set default) |
| `Show subtitle#162:33` | BOOLEAN | `true` |
| `Site#162:34` | TEXT | `ZENML.IO` |
| `Brand` | VARIANT | `ZenML` — options `ZenML`, `Kitaru` |
| `Layout` | VARIANT | `Text` — options `Text`, `Panel Bottom`, `Image Right`, `Image Left`, `Full Bleed` |

Instance size 1920 x 1080. Text layers inside an instance: `Title` (`I<inst>;162:1771`, Borna Medium), `Subtitle` (`;162:1772`, Borna Medium), `Site` (`;162:1784`, Nudica Mono Regular), and the eyebrow layer is **named `BLOG`** (`;162:1769`, Nudica Mono Medium) — it renders `Eyebrow#162:30`. No text styles are applied (`textStyleId === ""`), so nothing binds by style id.

## Cover BG / 16:9 — component set `150:1697` (the `Background` nested instance)

The background is an **exposed nested instance, not an instance-swap property**. Find it with
`inst.findOne(n => n.type === 'INSTANCE' && n.name === 'Background')` — it is the only entry in `inst.exposedInstances` — and set its own properties: `bg.setProperties({ Brand: <Brand>, Style: <Style> })`.

| Property | Options |
|---|---|
| `Brand` | `ZenML` (default), `Kitaru` |
| `Style` | `Photo` (default, legacy un-numbered), `Chevron`, `Mesh`, `Field`, `Tint`, `Deep`, `Photo 01` … `Photo 09` |

30 variants (2 brands x 15 styles). New covers use `Photo 01`–`Photo 09` only, never the legacy `Photo` (see `design-rules.md`). Live examples: `175:1806` `introducing-the-new-kitaru` = `Brand=Kitaru, Layout=Panel Bottom`, Background `Brand=Kitaru, Style=Photo` (legacy), at x 160 / y 240 inside section `307:4218`; `379:15513` `braintrust-pricing` = the first cover this skill made (E2E 2026-09-07): `Brand=Kitaru, Layout=Image Right`, Background `Brand=Kitaru, Style=Photo 01`, `Show subtitle#162:33 = false`, at x 160 / y 240 inside section `379:15512`.

### Title measure per Layout (Kitaru variants, read in the 2026-09-07 E2E)

| Layout | Title layer width | Note |
|---|---|---|
| `Text` | 1680 px | |
| `Full Bleed` | 1680 px | |
| `Panel Bottom` | 1760 px | widest |
| `Image Left` | 800 px | less than half — the same headline breaks very differently |
| `Image Right` | 800 px | `Braintrust Pricing Guide` (24 chars, Borna Medium 80 px) set as `Braintrust Pricing / Guide` |

ZenML variants were not measured; find-slot assumes the same widths until someone reads them. find-slot emits the chosen layout's width as `P.titleMeasure` and a greedy line estimate as `P.titleLines` (anchor: 18 characters per line at 800 px, scaled for the wider measures).

## Template — VS Comparison — component set `113:300`

Axes: `Count` (`"10"` … `"1"`, default `"10"`), `Include ZenML` (`"True"`, `"False"`, default `"True"`), `Brand` (`ZenML`, `Kitaru`, default `ZenML`) — 40 variants named literally `Count=<n>, Include ZenML=<bool>, Brand=<brand>`. No TEXT or INSTANCE_SWAP properties on the set; texts and logos are edited on nested nodes (`vs-template.md`). Live example: `232:3744` `trigger-dev-alternatives` = `Count=6, Include ZenML=True, Brand=Kitaru` (main component `193:2371`). `vs-hexagon` set `111:224`; `kitaru-hexagon` `187:1794`.

## 2026 column section ids

S1 reads the live column every run; this list is only for reading S1 output or a report by eye.

| id | name |
|---|---|
| `379:15512` | `2026-09 · September 2026` |
| `307:4218` | `2026-08 · August 2026` |
| `307:4219` | `2026-07 · July 2026` |
| `307:4220` | `2026-06 · June 2026` |
| `307:4221` | `2026-05 · May 2026` |
| `307:4222` | `2026-04 · April 2026` |
| `307:4223` | `2026-03 · March 2026` |
| `307:4224` | `2026-02 · February 2026` |
| `307:4225` | `2026-01 · January 2026` |

All at x 0, width 10720. Known pre-existing within-section mismatches from the 2026-08-27/28 batch (reported by S5 `--month` runs, not touched by the skill): `2026-05` two covers swapped, `2026-03` `why-agents-need-durable-execution` and `e2b-vs-daytona` on the same slot (4400,1520), `2026-02` five and `2026-01` ten slot mismatches. Reflowing them is Zuri's call (`find-slot.ts --month`).

## Fonts (all present in `figma.listAvailableFontsAsync()` on this machine)

- Cover: `Borna` `Medium` (Title, Subtitle), `Nudica Mono` `Regular` (Site), `Nudica Mono` `Medium` (eyebrow).
- VS card: add `Borna` `SemiBold` (sub-line emphasis span) and `Rethink Sans` `Medium` (the `VS` separators).
- Style strings are exact: `SemiBold` exists, `Semi Bold` does not. Borna ships Regular/Medium/SemiBold/Bold + italics; Nudica Mono Thin…Bold + italics.
- If any pair is missing from `listAvailableFontsAsync`, stop and ask — never substitute a family.
