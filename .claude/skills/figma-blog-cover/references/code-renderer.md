# Code renderer

`scripts/render-cover.ts` makes a cover without Figma. `scripts/lib/cover-renderer.ts` holds the layouts and colours, read from the `Blog Cover / 16:9` variants. `find-slot.ts` still applies the rules, and `assets/` holds what used to live only in Figma.

| Asset | What it is |
|---|---|
| `assets/backgrounds/` | The Cover BG variants as 3840 x 2160 WebP (quality 90): five styles per brand and photos 01 to 09 |
| `assets/logos/` | ZenML, Kitaru and ZenML Labs, positive and negative |
| `assets/service-logos/` | Every `ServiceLogo` mark from the Hashi library as a 24 x 24 SVG, longest side 20, centred. Exported from the library page on 2026-11-06, with 9 uneven marks normalised |
| `assets/vs/` | The ZenML and Kitaru brand hexagons |
| `assets/cover-manifest.json` | One row per cover, seeded from the Figma page on 2026-11-06. It replaces the canvas as the record of what a month has used |

## How it renders

Chromium through Playwright, not the Satori OG pipeline: its Borna lines ran up to 18 px wide at 3840, while Chromium stayed within 1 px. The overlay renders on a transparent page at 1920 x 1080, 2x, and sharp composites it over the background. Launch with `--font-render-hinting=none`.

## Traps

- **Font metrics differ by platform.** Linux read different vertical metrics and text moved up to 3 px. `@font-face` pins them, and each text block's baseline is pinned at runtime.
- **Figma sets the copy 1 px lower than CSS** on every layout, and keeps frames on whole pixels where CSS centring leaves a half.
- **Pill width rounds up.** Figma drops the last letter's tracking, then rounds the text width up.
- **Line breaks.** Figma wraps greedily, so the renderer does too. `text-wrap: balance` only rescues a one-word last line, which Figma would have left as a defect.
- **The Negative logo exports** carry a canvas rect and a frame stroke. The files in `assets/logos/` have them removed; re-export with care.
- **One-off background images.** A cover's Style can name a photo while its fill holds another: `robot-learning-one-control-plane` did on 2026-11-05.
- **A match to Figma proves rendering, not good copy.** Figma's own covers can break the design rules; the renderer's limits come from `design-rules.md`.

## Test results, 2026-11-06

25 live covers with their real copy, against 3840 x 2160 Figma exports, on macOS and Linux ARM (Playwright 1.64.1): all five layouts, both brands, except Kitaru `Image Left`, which no live cover uses; its colours were read from the variant instead.

Pass marks, fixed before running: same line count, every text line, logo and pill edge within 2 px at 3840, SSIM at least 0.99 at 1920 on the original backgrounds.

- Line counts and edges: 25 of 25 on both platforms.
- SSIM: 23 of 25. `trigger-dev-pricing` and `how-i-rebuilt-zenml-io-in-a-week-with-claude-code` scored 0.9895 to 0.9897. Both are half-pixel rounding on copy of odd height, and Figma rounds those both ways, so no single rule matches every cover.
- Mac against Linux: at most 0.13% of channels differ by more than 8 levels.
- The WebP backgrounds lose film grain that the AVIF at quality 75 loses anyway: quality 99 raised the final SSIM by at most 0.006 and tripled the size.

These sets also tuned the fixes, so they are not held out. Linux x86 and Windows are untested.

## When the Figma template changes

Update the tables in `cover-renderer.ts` or `vs-card.ts`, re-export any changed background, and repeat the test.

## VS cards

`scripts/lib/vs-card.ts` holds all 20 tile arrangements from `Template — VS Comparison` (`113:300`). ZenML and Kitaru share the geometry. The page is drawn whole, so it needs no background file.

Tested 2026-11-06 against 25 published cards covering 12 of the 20 arrangements; the rest have no live card and were checked by eye. The six cards with the template's fonts reach 0.998+ SSIM in the header. Three of those with no normalised mark score 0.994 to 0.995 on the tiles. Cards that use one of the 9 normalised marks score lower on purpose. 77 live cards lost the SemiBold on the for-line and 10 set a SemiBold title, so their headers differ from the template and from new cards.
