/**
 * Shared machinery for the Open Graph card generators.
 *
 * Both generators — `generate-compare-og.ts` (the VS cards) and
 * `generate-default-og.ts` (the default card: databases, hubs, pages) — load
 * the same fonts, push their JSX through the same satori → resvg → sharp
 * pass and upload to R2 with the same uploader flags. Those pieces live here
 * so a change to the render settings moves every card at once.
 *
 * Nothing here is card-specific: the element, its background colour and the
 * R2 prefix are always passed in by the caller.
 */

import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { Resvg } from "@resvg/resvg-js";
import type { ReactElement } from "react";
import satori from "satori";
import sharp from "sharp";
import { OG_HEIGHT, OG_WIDTH } from "./template.js";

/** Card geometry, re-exported so a generator only imports from here. */
export { OG_HEIGHT, OG_WIDTH };

const execFileP = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(__dirname, "..", "..");

/** Dry runs and pre-upload renders land here (gitignored). */
export const CACHE_DIR = join(REPO_ROOT, ".cache/og");

/** The two site fonts, as the WOFF siblings satori can parse. */
export const FONT_SPECS = [
  { family: "Borna", file: "borna-medium.woff", weight: 500 },
  { family: "Rethink Sans", file: "rethink-sans-regular.woff", weight: 400 },
] as const;

export async function loadFonts() {
  return Promise.all(
    FONT_SPECS.map(async (spec) => {
      const path = join(REPO_ROOT, `public/fonts/${spec.file}`);
      if (!existsSync(path))
        throw new Error(
          `Missing font file: ${path}. The OG renderer uses WOFF siblings of the site fonts.`,
        );
      return {
        name: spec.family,
        data: await readFile(path),
        weight: spec.weight,
        style: "normal" as const,
      };
    }),
  );
}

export type Font = Awaited<ReturnType<typeof loadFonts>>[number];

/** Render width of the final JPEG; the 16:9 composition is authored at 1920. */
export const RENDER_WIDTH = 2400;

/**
 * satori (JSX → SVG) → resvg (SVG → PNG @ RENDER_WIDTH) → sharp (PNG → JPEG).
 *
 * quality 85 + mozjpeg + 4:2:0 is the sweet spot for text-heavy cards. Luma
 * stays full-resolution (sharp text edges); chroma is halved on both axes
 * (invisible against the near-monochrome content). ~70–100 KB output.
 */
export async function renderOgJpeg(
  element: ReactElement,
  fonts: Font[],
  background: string,
): Promise<Buffer> {
  const svg = await satori(element, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });

  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: RENDER_WIDTH },
    background,
  })
    .render()
    .asPng();

  return sharp(png)
    .jpeg({
      quality: 85,
      mozjpeg: true,
      chromaSubsampling: "4:2:0",
      trellisQuantisation: true,
      overshootDeringing: true,
      optimiseScans: true,
    })
    .toBuffer();
}

/** Files per `uv run` call — argv length is the limit, not the uploader. */
export const UPLOAD_BATCH_SIZE = 200;

/**
 * Upload rendered cards to R2 under a literal key.
 *
 * `--literal-key` writes to `${prefix}/${filename}` (no sha8 segment) so the
 * URL is the one `seo.ts` derives — deterministic, overwrites in place on
 * regen. Credentials come from the operator's `.env`; no generator reads them.
 */
export async function uploadToR2(
  prefix: string,
  filePaths: string[],
): Promise<void> {
  for (let i = 0; i < filePaths.length; i += UPLOAD_BATCH_SIZE) {
    const batch = filePaths.slice(i, i + UPLOAD_BATCH_SIZE);
    await execFileP(
      "uv",
      [
        "run",
        "scripts/r2-upload.py",
        ...batch,
        "--prefix",
        prefix,
        "--literal-key",
        "--overwrite",
      ],
      { cwd: REPO_ROOT },
    );
  }
}
