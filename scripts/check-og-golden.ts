/**
 * check-og-golden.ts
 *
 * Renders one Kitaru-vs-X Open Graph card through the real pipeline
 * (satori → resvg → sharp, see scripts/og/generate-compare-og.ts) and
 * compares the decoded pixels against a committed golden JPEG in
 * tests/snapshots/rendered/. Runs as step 9 of `pnpm smoke:dist` and
 * standalone via `pnpm check:og`. Regenerate with `pnpm og:golden:update`
 * and look at the new image before committing it — the diff IS the review.
 *
 * Why this exists: the OG generator is a hand-run script, so nothing else in
 * CI executes satori, @resvg/resvg-js or sharp. A Dependabot bump of any of
 * them passes fully green even if the cards it would produce are broken.
 * satori 0.29 → 0.33 (#290) swapped in a new text-shaping engine and moved
 * 0.5–2.7% of the pixels on every card (kerning only, harmless — but CI could
 * not have told us that, and a blank card would have shipped green too).
 *
 * Why pixels with a tolerance, not a byte hash: JPEG encoding is not
 * bit-identical across libvips builds/platforms, so a hash would flap between
 * macOS and the Linux runners. Decoding both images and counting pixels that
 * moved by more than CHANNEL_DELTA (of 255) ignores encoder noise; failing at
 * MAX_CHANGED_PCT catches a re-layout while still allowing sub-pixel drift.
 * The #290 shift measured 1.28% on this card, so the threshold flags it.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { ACTUAL_DIR, logResult, SNAPSHOT_DIR } from "./check-dist-snapshots";
import { loadEntries, loadFonts, renderJpeg } from "./og/generate-compare-og";

/** Same page the MDX rendered-content golden uses, so one slug covers both. */
export const OG_GOLDEN_SLUG = "kitaru-vs-temporal";
export const OG_GOLDEN_PATH = join(SNAPSHOT_DIR, `og-${OG_GOLDEN_SLUG}.jpg`);

/** Per-channel difference (0–255) at or below which a pixel counts as unchanged. */
export const CHANNEL_DELTA = 24;
/** Percentage of changed pixels above which the check fails. */
export const MAX_CHANGED_PCT = 0.5;

interface RawImage {
  data: Buffer;
  channels: number;
}

async function decodeRgb(jpeg: Buffer) {
  const { data, info } = await sharp(jpeg)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

/** Percentage of pixels whose max per-channel delta exceeds CHANNEL_DELTA. */
export function changedPixelPct(a: RawImage, b: RawImage): number {
  const pixels = a.data.length / a.channels;
  let changed = 0;
  for (let i = 0; i < a.data.length; i += a.channels) {
    for (let c = 0; c < a.channels; c++) {
      if (Math.abs(a.data[i + c] - b.data[i + c]) > CHANNEL_DELTA) {
        changed++;
        break;
      }
    }
  }
  return (changed / pixels) * 100;
}

async function renderGoldenCard(): Promise<Buffer> {
  const [[entry], fonts] = await Promise.all([loadEntries([OG_GOLDEN_SLUG]), loadFonts()]);
  if (!entry) throw new Error(`No compare entry named ${OG_GOLDEN_SLUG}`);
  return renderJpeg(entry, fonts);
}

/** Returns the failure count (0 or 1), matching the other smoke checks. */
export async function checkOgGolden(): Promise<number> {
  const actual = await renderGoldenCard();
  mkdirSync(ACTUAL_DIR, { recursive: true });
  const actualPath = join(ACTUAL_DIR, `og-${OG_GOLDEN_SLUG}.jpg`);
  writeFileSync(actualPath, actual);

  if (!existsSync(OG_GOLDEN_PATH)) {
    logResult(false, `Missing golden ${OG_GOLDEN_PATH}. Run pnpm og:golden:update.`);
    return 1;
  }
  const [want, got] = await Promise.all([decodeRgb(readFileSync(OG_GOLDEN_PATH)), decodeRgb(actual)]);
  if (want.width !== got.width || want.height !== got.height) {
    logResult(
      false,
      `OG card size changed: golden ${want.width}×${want.height}, rendered ${got.width}×${got.height}`,
    );
    return 1;
  }
  const changedPct = changedPixelPct(want, got);
  const ok = changedPct <= MAX_CHANGED_PCT;
  logResult(
    ok,
    ok
      ? `OG card ${OG_GOLDEN_SLUG}: ${changedPct.toFixed(3)}% of pixels changed (limit ${MAX_CHANGED_PCT}%)`
      : `OG card ${OG_GOLDEN_SLUG} drifted from its golden: ${changedPct.toFixed(3)}% of pixels changed (limit ${MAX_CHANGED_PCT}%). ` +
          `Compare ${OG_GOLDEN_PATH} with ${actualPath}; if the change is intended, run pnpm og:golden:update.`,
  );
  return ok ? 0 : 1;
}

async function main() {
  if (process.argv.includes("--update")) {
    mkdirSync(SNAPSHOT_DIR, { recursive: true });
    writeFileSync(OG_GOLDEN_PATH, await renderGoldenCard());
    logResult(true, `wrote ${OG_GOLDEN_PATH} — look at it before committing`);
    return;
  }
  process.exit(await checkOgGolden());
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
