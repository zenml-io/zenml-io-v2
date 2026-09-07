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

/**
 * One card per brand variant. The Kitaru slug is the same page the MDX
 * rendered-content golden uses; the ZenML slug exercises the template's
 * <img> data-URI path through satori/resvg, which the Kitaru card never hits.
 */
export const OG_GOLDEN_SLUGS = ["kitaru-vs-pydantic-ai", "zenml-vs-pydantic-ai"] as const;
const goldenPath = (slug: string) => join(SNAPSHOT_DIR, `og-${slug}.jpg`);

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

async function renderGoldenCards(): Promise<Array<{ slug: string; jpeg: Buffer }>> {
  const [entries, fonts] = await Promise.all([loadEntries([...OG_GOLDEN_SLUGS]), loadFonts()]);
  return Promise.all(
    OG_GOLDEN_SLUGS.map(async (slug) => {
      const entry = entries.find((e) => e.slug === slug);
      if (!entry) throw new Error(`No compare entry named ${slug}`);
      return { slug, jpeg: await renderJpeg(entry, fonts) };
    }),
  );
}

/** Returns the failure count, matching the other smoke checks. */
export async function checkOgGolden(): Promise<number> {
  mkdirSync(ACTUAL_DIR, { recursive: true });
  let failures = 0;
  for (const { slug, jpeg: actual } of await renderGoldenCards()) {
    const actualPath = join(ACTUAL_DIR, `og-${slug}.jpg`);
    writeFileSync(actualPath, actual);
    const golden = goldenPath(slug);

    if (!existsSync(golden)) {
      logResult(false, `Missing golden ${golden}. Run pnpm og:golden:update.`);
      failures++;
      continue;
    }
    const [want, got] = await Promise.all([decodeRgb(readFileSync(golden)), decodeRgb(actual)]);
    if (want.width !== got.width || want.height !== got.height) {
      logResult(
        false,
        `OG card ${slug} size changed: golden ${want.width}×${want.height}, rendered ${got.width}×${got.height}`,
      );
      failures++;
      continue;
    }
    const changedPct = changedPixelPct(want, got);
    const ok = changedPct <= MAX_CHANGED_PCT;
    logResult(
      ok,
      ok
        ? `OG card ${slug}: ${changedPct.toFixed(3)}% of pixels changed (limit ${MAX_CHANGED_PCT}%)`
        : `OG card ${slug} drifted from its golden: ${changedPct.toFixed(3)}% of pixels changed (limit ${MAX_CHANGED_PCT}%). ` +
            `Compare ${golden} with ${actualPath}; if the change is intended, run pnpm og:golden:update.`,
    );
    if (!ok) failures++;
  }
  return failures;
}

async function main() {
  if (process.argv.includes("--update")) {
    mkdirSync(SNAPSHOT_DIR, { recursive: true });
    for (const { slug, jpeg } of await renderGoldenCards()) {
      writeFileSync(goldenPath(slug), jpeg);
      logResult(true, `wrote ${goldenPath(slug)} — look at it before committing`);
    }
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
