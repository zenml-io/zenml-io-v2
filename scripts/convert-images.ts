/**
 * convert-images.ts — convert content images to AVIF (and optionally a JPEG
 * sibling for Open Graph cards) with sharp, so R2 uploads need no external
 * encoder. Same sharp recipes as
 * `.claude/skills/figma-blog-cover/scripts/publish-cover.ts` (AVIF) and
 * `scripts/og/generate-compare-og.ts` (JPEG).
 *
 * Usage:
 *   pnpm images:convert <file...> [--preset inline|cover] [--resize <px>]
 *     [--quality <1-100>] [--jpeg] [--out-dir <dir>]
 *
 * Presets (explicit flags override):
 *   inline (default) — resize to max 800px, AVIF only
 *   cover             — resize to max 1200px, AVIF + a JPEG sibling
 *
 * Output is written next to each input (or under --out-dir) as
 * <basename>.avif and, when a JPEG is produced, <basename>.jpg. The input
 * file is never overwritten. Non-image files are skipped with a warning.
 */

import { mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import sharp from "sharp";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".tif", ".tiff", ".avif"]);

interface Preset {
  resize: number;
  jpeg: boolean;
}

const PRESETS: Record<"inline" | "cover", Preset> = {
  inline: { resize: 800, jpeg: false },
  cover: { resize: 1200, jpeg: true },
};

const AVIF_QUALITY = 60;
const AVIF_EFFORT = 6;

function parseArgs(argv: string[]) {
  const files: string[] = [];
  let preset: "inline" | "cover" = "inline";
  let resize: number | undefined;
  let quality: number | undefined;
  let jpeg = false;
  let outDir: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--preset") preset = argv[++i] as "inline" | "cover";
    else if (arg === "--resize") resize = Number(argv[++i]);
    else if (arg === "--quality") quality = Number(argv[++i]);
    else if (arg === "--jpeg") jpeg = true;
    else if (arg === "--out-dir") outDir = argv[++i];
    else if (arg.startsWith("--")) throw new Error(`unknown flag ${arg}`);
    else files.push(arg);
  }

  if (files.length === 0) {
    throw new Error(
      "usage: convert-images.ts <file...> [--preset inline|cover] [--resize <px>] [--quality <1-100>] [--jpeg] [--out-dir <dir>]",
    );
  }
  if (!(preset in PRESETS)) throw new Error(`--preset must be "inline" or "cover", got "${preset}"`);

  return { files, preset: PRESETS[preset], resize, quality, jpeg, outDir };
}

function fmtBytes(n: number): string {
  return `${(n / 1024).toFixed(1)} KB`;
}

async function convertOne(
  file: string,
  opts: { resize: number; quality: number; jpeg: boolean; outDir?: string },
): Promise<boolean> {
  const inputPath = resolve(file);
  if (!existsSync(inputPath)) {
    console.error(`✗ ${file}: no such file`);
    return false;
  }
  if (!IMAGE_EXTENSIONS.has(extname(inputPath).toLowerCase())) {
    console.warn(`skip ${file}: not a recognized image file`);
    return true;
  }

  const sourceBytes = (await stat(inputPath)).size;
  const dir = opts.outDir ? resolve(opts.outDir) : resolve(inputPath, "..");
  await mkdir(dir, { recursive: true });
  const stem = basename(inputPath, extname(inputPath));
  const avifPath = join(dir, `${stem}.avif`);
  const jpgPath = join(dir, `${stem}.jpg`);

  if (avifPath === inputPath || (opts.jpeg && jpgPath === inputPath)) {
    console.error(`✗ ${file}: output would overwrite the input, skipping`);
    return false;
  }

  try {
    const src = sharp(inputPath).resize(opts.resize, opts.resize, { fit: "inside", withoutEnlargement: true });

    await src.clone().avif({ quality: opts.quality, effort: AVIF_EFFORT }).toFile(avifPath);
    const avifMeta = await sharp(avifPath).metadata();
    const avifBytes = (await stat(avifPath)).size;
    const avifReduction = (100 * (1 - avifBytes / sourceBytes)).toFixed(0);
    console.log(`✓ ${avifPath}  ${avifMeta.width}x${avifMeta.height}  ${fmtBytes(avifBytes)}  (${avifReduction}% smaller than source ${fmtBytes(sourceBytes)})`);

    if (opts.jpeg) {
      await src
        .clone()
        .jpeg({
          quality: 85,
          mozjpeg: true,
          chromaSubsampling: "4:2:0",
          trellisQuantisation: true,
          overshootDeringing: true,
          optimiseScans: true,
        })
        .toFile(jpgPath);
      const jpgMeta = await sharp(jpgPath).metadata();
      const jpgBytes = (await stat(jpgPath)).size;
      const jpgReduction = (100 * (1 - jpgBytes / sourceBytes)).toFixed(0);
      console.log(`✓ ${jpgPath}  ${jpgMeta.width}x${jpgMeta.height}  ${fmtBytes(jpgBytes)}  (${jpgReduction}% smaller than source ${fmtBytes(sourceBytes)})`);
    }
    return true;
  } catch (err) {
    console.error(`✗ ${file}: ${(err as Error).message}`);
    return false;
  }
}

async function main(): Promise<void> {
  const { files, preset, resize, quality, jpeg, outDir } = parseArgs(process.argv.slice(2));
  const opts = {
    resize: resize ?? preset.resize,
    quality: quality ?? AVIF_QUALITY,
    jpeg: jpeg || preset.jpeg,
    outDir,
  };

  let ok = true;
  for (const file of files) {
    const success = await convertOne(file, opts);
    if (!success) ok = false;
  }
  if (!ok) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
