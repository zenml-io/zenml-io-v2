/**
 * Generate Open Graph JPEG cards for every Kitaru-vs-X compare page.
 *
 * Pipeline: gray-matter (parse frontmatter) → satori (JSX → SVG)
 *           → @resvg/resvg-js (SVG → PNG @ 2x) → sharp (PNG → JPEG)
 *           → optional R2 upload at a deterministic key.
 *
 * Dry-run by default (writes JPEGs to .cache/og/). Pass --write to upload
 * to R2. URLs are derived from slug via `compareOgUrl()` in src/lib/seo.ts;
 * no frontmatter mutation needed.
 *
 * Pass --slug=<basename> (repeatable) to limit to specific pages, e.g.
 *   pnpm og:compare --slug=kitaru-vs-temporal
 */

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

import { CompareOg } from "./template.js";
import { KITARU_COMPARE_OG_PREFIX } from "../../src/lib/constants.js";

const execFileP = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const COMPARE_DIR = join(REPO_ROOT, "src/content/compare-kitaru");
const CACHE_DIR = join(REPO_ROOT, ".cache/og");

const FONT_SPECS = [
  { family: "Plus Jakarta Sans", dir: "plus-jakarta-sans", weight: 500 },
  { family: "Plus Jakarta Sans", dir: "plus-jakarta-sans", weight: 800 },
  { family: "JetBrains Mono", dir: "jetbrains-mono", weight: 500 },
] as const;

interface Frontmatter {
  competitor?: string;
  cardSubtitle?: string;
}

interface CompareEntry {
  slug: string;
  frontmatter: Frontmatter;
}

async function loadFonts() {
  return Promise.all(
    FONT_SPECS.map(async (spec) => {
      const path = join(
        REPO_ROOT,
        `node_modules/@fontsource/${spec.dir}/files/${spec.dir}-latin-${spec.weight}-normal.woff`,
      );
      if (!existsSync(path)) throw new Error(`Missing font file: ${path}. Did pnpm install run?`);
      return {
        name: spec.family,
        data: await readFile(path),
        weight: spec.weight,
        style: "normal" as const,
      };
    }),
  );
}

async function loadEntries(filterSlugs: string[] | null): Promise<CompareEntry[]> {
  const files = await readdir(COMPARE_DIR);
  const entries: CompareEntry[] = [];
  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    if (filterSlugs && !filterSlugs.includes(slug)) continue;
    const raw = await readFile(join(COMPARE_DIR, file), "utf8");
    entries.push({ slug, frontmatter: matter(raw).data as Frontmatter });
  }
  entries.sort((a, b) => a.slug.localeCompare(b.slug));
  return entries;
}

type Font = Awaited<ReturnType<typeof loadFonts>>[number];

async function renderJpeg(entry: CompareEntry, fonts: Font[]): Promise<Buffer> {
  const { competitor, cardSubtitle } = entry.frontmatter;
  if (!competitor) throw new Error(`${entry.slug}: missing frontmatter.competitor`);
  if (!cardSubtitle) throw new Error(`${entry.slug}: missing frontmatter.cardSubtitle`);

  const svg = await satori(CompareOg({ competitor, subtitle: cardSubtitle }), {
    width: 1200,
    height: 627,
    fonts,
  });

  // Render at native 2x (2400×1254). For text-only content, downscaling via
  // lanczos softens edges; outputting at 2x keeps text pin-sharp on retina
  // previewers and lets OG consumers downscale themselves. OG spec is
  // 1.91:1 aspect ratio with a 1200×627 minimum — 2400×1254 hits the same
  // ratio at higher density and is well within consumer limits.
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: 2400 },
    background: "#FAF8F4",
  })
    .render()
    .asPng();

  // quality 85 + mozjpeg + 4:2:0 is the sweet spot for text-heavy cards.
  // Luma stays full-resolution (sharp text edges); chroma is halved on both
  // axes (invisible against the near-monochrome content). ~70–100 KB output.
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

async function uploadToR2(filePath: string, slug: string): Promise<void> {
  // --literal-key writes to `${prefix}/${filename}` (no sha8 segment) so the
  // URL is `compareOgUrl(slug)` — deterministic, overwrites in place on regen.
  await execFileP(
    "uv",
    ["run", "scripts/r2-upload.py", filePath, "--prefix", KITARU_COMPARE_OG_PREFIX, "--literal-key", "--overwrite"],
    { cwd: REPO_ROOT },
  );
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const filterSlugs = args
    .filter((a) => a.startsWith("--slug="))
    .map((a) => a.slice("--slug=".length));

  await mkdir(CACHE_DIR, { recursive: true });

  const entries = await loadEntries(filterSlugs.length > 0 ? filterSlugs : null);
  if (entries.length === 0) {
    console.error("No entries matched.");
    process.exit(1);
  }

  const fonts = await loadFonts();
  console.log(`Rendering ${entries.length} card(s) — mode: ${write ? "WRITE" : "DRY-RUN"}`);

  for (const entry of entries) {
    const outPath = join(CACHE_DIR, `${entry.slug}.jpg`);
    const jpeg = await renderJpeg(entry, fonts);
    await writeFile(outPath, jpeg);
    console.log(`  ✓ ${entry.slug}.jpg (${(jpeg.byteLength / 1024).toFixed(1)} KB)`);
    if (write) {
      await uploadToR2(outPath, entry.slug);
      console.log(`    ↳ uploaded`);
    }
  }

  if (!write) {
    console.log("\nDry-run complete. Re-run with --write to upload to R2.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
