/**
 * publish-cover.ts — turn the exported cover PNG into the two R2 assets.
 *
 * Usage (from any cwd):
 *   pnpm exec tsx .claude/skills/figma-blog-cover/scripts/publish-cover.ts <slug> <png> [--no-upload] [--allow-1x] [--allow-any-source]
 *
 * Input: the PNG from download_assets({defaultFormat:'png', defaultScale:2}) —
 * exactly 3840x2160. A 1920x1080 export (get_screenshot, or scale 1) is only
 * accepted behind --allow-1x and prints a warning (A5).
 * --allow-any-source is the blog-post-contributor "cover provided" path (not a
 * Figma export): any sharp-readable image that is 16:9 (within 1%) and at least
 * 1200 px wide is accepted, with a printed warning naming its size.
 *
 * Output: .cache/covers/<slug>-cover.avif at 1920x1080 (2x for the hero; the site
 *   serves one <img> with no srcset) and <slug>-cover.jpg at 1200x675 (Open Graph).
 *   AVIF: quality 75, effort 6, 4:4:4 chroma (crisp type; ~50 KB for a real cover)
 *   JPEG: the exact recipe from scripts/og/generate-compare-og.ts
 *         (quality 85, mozjpeg, 4:2:0, trellis, overshoot deringing, optimiseScans)
 * Then, unless --no-upload:
 *   uv run scripts/r2-upload.py <avif> <jpg> --prefix content/blog/<slug>
 *   (keys are content-addressed: content/blog/<slug>/<sha8>/<file>), parse the
 *   two "  URL: " lines, HEAD both URLs (200 + image/avif / image/jpeg).
 * Prints one JSON block, then the paste-ready YAML (mainImage.url = AVIF,
 * seo.ogImage = JPEG — never the same URL; alt is a placeholder to fill in).
 */

import { execFile } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileP = promisify(execFile);

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(SCRIPT_DIR, "../../../..");
const OUT_DIR = join(REPO, ".cache/covers");
const R2_UPLOAD = "scripts/r2-upload.py";

const AVIF_OUT = { width: 1920, height: 1080 };
const JPEG_OUT = { width: 1200, height: 675 };
const OUT_WIDTH = JPEG_OUT.width;
const OUT_HEIGHT = JPEG_OUT.height;
const FULL = { width: 3840, height: 2160 };
const HALF = { width: 1920, height: 1080 };
const AVIF_TARGET_BYTES = 150 * 1024;

function fail(msg: string): never {
  console.error(`publish-cover: ${msg}`);
  process.exit(1);
}

const KNOWN_FLAGS = new Set(["--no-upload", "--allow-1x", "--allow-any-source"]);
const MIN_ANY_SOURCE_WIDTH = 1200;
const ASPECT_TOLERANCE = 0.01;

function parseArgs(argv: string[]): { slug: string; png: string; upload: boolean; allow1x: boolean; allowAnySource: boolean } {
  const positional = argv.filter((a) => !a.startsWith("--"));
  const flags = new Set(argv.filter((a) => a.startsWith("--")));
  for (const f of flags) if (!KNOWN_FLAGS.has(f)) fail(`unknown flag ${f}`);
  const [slug, png] = positional;
  if (!slug || !png) fail("usage: publish-cover.ts <slug> <png> [--no-upload] [--allow-1x] [--allow-any-source]");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) fail(`slug "${slug}" is not a blog slug`);
  return { slug, png: resolve(png), upload: !flags.has("--no-upload"), allow1x: flags.has("--allow-1x"), allowAnySource: flags.has("--allow-any-source") };
}

async function convert(png: string, avifPath: string, jpgPath: string): Promise<void> {
  await sharp(png)
    .resize(AVIF_OUT.width, AVIF_OUT.height, { fit: "fill", kernel: "lanczos3" })
    .avif({ quality: 75, effort: 6, chromaSubsampling: "4:4:4" })
    .toFile(avifPath);
  const base = sharp(png).resize(JPEG_OUT.width, JPEG_OUT.height, { fit: "fill", kernel: "lanczos3" });
  // JPEG recipe verbatim from scripts/og/generate-compare-og.ts (renderCard).
  await base
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
}

async function assertDims(file: string, w: number, h: number): Promise<void> {
  const m = await sharp(file).metadata();
  if (m.width !== w || m.height !== h) fail(`${file} is ${m.width}x${m.height}, expected ${w}x${h}`);
}

async function upload(slug: string, avifPath: string, jpgPath: string): Promise<{ avif: string; jpg: string }> {
  const prefix = `content/blog/${slug}`;
  let stdout: string;
  try {
    ({ stdout } = await execFileP("uv", ["run", R2_UPLOAD, avifPath, jpgPath, "--prefix", prefix], { cwd: REPO }));
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message: string };
    fail(`r2-upload.py failed: ${err.message}\n${err.stdout ?? ""}${err.stderr ?? ""}`);
  }
  // r2-upload.py prints "  URL: <url>" once per file, in argument order.
  const urls = stdout
    .split("\n")
    .filter((l) => l.startsWith("  URL: "))
    .map((l) => l.slice("  URL: ".length).trim());
  if (urls.length !== 2) fail(`expected two "  URL: " lines from r2-upload.py, got ${urls.length}:\n${stdout}`);
  const [avif, jpg] = urls;
  if (!avif.endsWith(".avif") || !jpg.endsWith(".jpg")) fail(`URL order/extension mismatch:\n${urls.join("\n")}`);
  await Promise.all([assertLive(avif, "image/avif"), assertLive(jpg, "image/jpeg")]);
  return { avif, jpg };
}

async function assertLive(url: string, contentType: string): Promise<void> {
  const res = await fetch(url, { method: "HEAD" });
  const ct = res.headers.get("content-type") ?? "";
  if (res.status !== 200 || !ct.startsWith(contentType)) {
    fail(`HEAD ${url} → ${res.status} ${ct || "(no content-type)"}; expected 200 ${contentType}`);
  }
}

async function main(): Promise<void> {
  const { slug, png, upload: doUpload, allow1x, allowAnySource } = parseArgs(process.argv.slice(2));
  if (!existsSync(png)) fail(`no such file: ${png}`);

  const meta = await sharp(png).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const is2x = width === FULL.width && height === FULL.height;
  const is1x = width === HALF.width && height === HALF.height;
  if (!is2x && !is1x) {
    if (!allowAnySource) fail(`${png} is ${width}x${height}; expected ${FULL.width}x${FULL.height} (download_assets png scale 2). A non-Figma cover needs --allow-any-source (16:9, ≥${MIN_ANY_SOURCE_WIDTH} px wide).`);
    const aspect = height > 0 ? width / height : 0;
    if (Math.abs(aspect - OUT_WIDTH / OUT_HEIGHT) > ASPECT_TOLERANCE) fail(`${png} is ${width}x${height} (aspect ${aspect.toFixed(4)}); --allow-any-source needs a 16:9 source (${(OUT_WIDTH / OUT_HEIGHT).toFixed(4)} ± ${ASPECT_TOLERANCE}) — crop it first, this script never crops.`);
    if (width < MIN_ANY_SOURCE_WIDTH) fail(`${png} is ${width}x${height}; --allow-any-source needs at least ${MIN_ANY_SOURCE_WIDTH} px wide (the published files are ${OUT_WIDTH}x${OUT_HEIGHT}).`);
    console.error(`WARNING: source is ${width}x${height} (not a Figma export); accepted because of --allow-any-source.`);
  }
  if (is1x && !allow1x && !allowAnySource) fail(`${png} is ${HALF.width}x${HALF.height}. The export path is download_assets({defaultFormat:'png', defaultScale:2}) → 3840x2160; re-export, or pass --allow-1x to accept the half-size source.`);
  if (is1x && !allowAnySource) console.error(`WARNING: source is ${HALF.width}x${HALF.height} (half size); accepted because of --allow-1x. Prefer the 3840x2160 download_assets export.`);

  await mkdir(OUT_DIR, { recursive: true });
  const avifPath = join(OUT_DIR, `${slug}-cover.avif`);
  const jpgPath = join(OUT_DIR, `${slug}-cover.jpg`);
  await convert(png, avifPath, jpgPath);
  await assertDims(avifPath, AVIF_OUT.width, AVIF_OUT.height);
  await assertDims(jpgPath, JPEG_OUT.width, JPEG_OUT.height);

  const sizes = { avif: (await stat(avifPath)).size, jpg: (await stat(jpgPath)).size };
  if (sizes.avif > AVIF_TARGET_BYTES) console.error(`WARNING: AVIF is ${sizes.avif} bytes (> ${AVIF_TARGET_BYTES}); check the source before publishing.`);

  const urls = doUpload ? await upload(slug, avifPath, jpgPath) : null;

  process.stdout.write(`${JSON.stringify({ slug, png, source: `${meta.width}x${meta.height}`, avif: avifPath, jpg: jpgPath, sizes, urls }, null, 2)}\n`);
  const avifUrl = urls?.avif ?? `<upload skipped: ${avifPath}>`;
  const jpgUrl = urls?.jpg ?? `<upload skipped: ${jpgPath}>`;
  process.stdout.write(
    [
      "",
      "# ── Paste into frontmatter (fill in alt) ──",
      "mainImage:",
      `  url: "${avifUrl}"`,
      '  alt: ""',
      "seo:",
      `  ogImage: "${jpgUrl}"`,
      "",
    ].join("\n"),
  );
}

main().catch((e) => fail((e as Error).stack ?? String(e)));
