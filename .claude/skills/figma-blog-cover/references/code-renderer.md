# Code renderer (planned, not built)

A fallback for people without Figma access: render a cover in code and keep it visually the same as the Figma template. Nothing here is wired into the skill's steps yet. Until the gaps below close, covers come from Figma.

Tested 2026-11-05 on `Panel Bottom` only: 3 covers to tune, then 10 new covers (4 Kitaru, 6 ZenML) on macOS and Linux ARM.

## Engine

Use Chromium through Playwright, pinned to one version. Do not use the Satori OG pipeline: its Borna lines ran up to 18 px wide at 3840, while Chromium stayed within 1 px.

Render the overlay with a transparent page background at 1920 x 1080 and `deviceScaleFactor: 2`, then composite it over the background file with sharp. That keeps photo pixels identical to Figma.

CSS the render needs: `-webkit-font-smoothing: antialiased`, `text-rendering: geometricPrecision`, `font-kerning: normal`. Launch with `--font-render-hinting=none`.

## Panel Bottom values (px at 1920)

| Element | Value |
|---|---|
| Panel | top 540, height 540 |
| Title | Borna Medium 80, line height 90, tracking -0.02em, left 80, width 1760, top 81 inside the panel |
| Subtitle | Borna Medium 44, line height 49, tracking -0.02em, 24 below the title |
| Logo | left 80, top 392 inside the panel, height 68; width 315 ZenML, 304 Kitaru |
| Site | Nudica Mono Regular 32, line height 38, tracking 0.06em, left 1667, top 407 inside the panel |
| Eyebrow pill | left 80, top 80, height 78, 1 px border inside, padding 19 / 39 plus the border, radius 100; Nudica Mono Medium 32, tracking 0.06em |

| Colour | ZenML | Kitaru |
|---|---|---|
| Title | `#151E19` | `#1C1E19` |
| Subtitle | `#63775E` | `#834314` |
| Site | `#63775E` | `#645D53` |
| Panel | `#E3E7CC` | `#FAF6EF` |
| Pill fill | `#E3E7CC` | `#EA7118` |
| Pill stroke | `#799268` | `#B65915` |
| Pill text | `#63775E` | `#FCF7F3` |

## Traps

- **Font metrics differ by platform.** The fonts set `USE_TYPO_METRICS`, so Linux read different vertical metrics from macOS and text moved up to 3 px. Pin them in `@font-face` with `ascent-override`, `descent-override` and `line-gap-override: 0%`: Borna 95.5 / 26.3, Nudica Mono Regular 96.3 / 25.7, Nudica Mono Medium 96.6 / 26.
- **Baselines still round differently.** After pinning metrics, Linux sat 1 px off. Measure each text block's baseline at runtime and shift it to the expected value: title 72, subtitle 39, site 30, eyebrow 30.
- **Pill width rounds up.** Figma drops the last letter's tracking, then rounds the text width up. The text width is `ceil(width - 1.92)`. Without this, `BLOG` comes out about 1 px narrow.
- **One-off background images.** A cover's Style can name a photo while its fill holds another image. On 2026-11-05, 1 of 269 covers did: `robot-learning-one-control-plane`. Compare the background's `imageHash` with its main component before trusting Style.
- **The month's used photos live in Figma.** find-slot reads them from the canvas. A code route needs a manifest in the repo, or two routes can reuse one photo in a month.
- **Code covers do not appear on the Blog Covers page** until someone with access syncs them.
- **find-slot still expects Figma.** Without `FIGMA_EDITOR_EMAIL` it raises an account question, and without `--siblings` it picks the first free photo for every cover. A code route has to skip that gate and read a repo manifest.
- **Line estimates are not enough.** find-slot's estimate missed the orphan on the 12 Factors title and flagged two that do not occur. A code route should measure real lines in Chromium and fail the render on an orphan or on copy past `design-rules.md`.
- **Eyebrows differ from `BLOG`.** Live covers also use `DEEP DIVE`, `CASE STUDY`, `NEWSLETTER`, `RELEASE` and `GUIDE`. Regenerating one keeps its eyebrow.

## Acceptance test

Export Figma references at 3840 x 2160, render the same copy, and fix the pass marks before running:

- Same title and subtitle line counts.
- Every text line, logo and pill edge within 2 px at 3840.
- Photo pixels outside the pill identical.
- Panel SSIM at least 0.99 at 3840 and 0.995 at 1200.
- Pill width checked directly, because SSIM missed the `BLOG` bug.
- Run on a held-out set, on every platform that will render, and finish with a blind review.

A match to Figma proves rendering only, not good copy fit: Figma's own covers can break the design rules. Run `design-rules.md` first and reject those covers instead of reproducing them.

## Gaps before building

- `Text`, `Full Bleed`, `Image Left`, `Image Right` and the VS card are untested, and long copy depends on them. Their values and backgrounds need one read from Figma.
- Linux passed only after fixes made on the same 10 covers, so it needs a fresh set. Linux x86 and Windows are untested.
- Background files for all 30 Cover BG variants need exporting and a home. VS cards also need every logo as a file.
