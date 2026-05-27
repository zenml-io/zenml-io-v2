/**
 * Generate Open Graph JPEG cards for every Kitaru-vs-X compare page.
 *
 * Pipeline: gray-matter → satori (JSX → SVG) → @resvg/resvg-js (SVG → PNG)
 *           → sharp (PNG → JPEG) → optional R2 upload + frontmatter patch.
 *
 * Dry-run by default (writes JPEGs to .cache/og/). Pass --write to upload
 * to R2 and rewrite each .mdx's `ogImage:` line.
 *
 * Pass --slug=<basename> (repeatable) to limit to specific pages, e.g.
 *   pnpm og:compare --slug=kitaru-vs-temporal
 */

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { resolve, join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

import { CompareOg } from "./template.js";

const execFileP = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");
const COMPARE_DIR = join(REPO_ROOT, "src/content/compare-kitaru");
const CACHE_DIR = join(REPO_ROOT, ".cache/og");
// Mirrors r2-upload.py's R2_PUBLIC_BASE_URL default so an env override stays
// in sync across the two scripts.
const R2_PUBLIC_BASE = process.env.R2_PUBLIC_BASE_URL ?? "https://assets.zenml.io";
const R2_PREFIX_ROOT = "compare/kitaru-og";

const FONT_SPECS = [
  { family: "Plus Jakarta Sans", dir: "plus-jakarta-sans", weight: 500 },
  { family: "Plus Jakarta Sans", dir: "plus-jakarta-sans", weight: 800 },
  { family: "JetBrains Mono", dir: "jetbrains-mono", weight: 500 },
] as const;

interface Frontmatter {
  competitor?: string;
  cardSubtitle?: string;
  title?: string;
  ogImage?: string;
  [key: string]: unknown;
}

interface CompareEntry {
  slug: string;
  mdxPath: string;
  frontmatter: Frontmatter;
  body: string;
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
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));
  const entries: CompareEntry[] = [];
  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, "");
    if (filterSlugs && !filterSlugs.includes(slug)) continue;
    const fullPath = join(COMPARE_DIR, file);
    const raw = await readFile(fullPath, "utf8");
    const parsed = matter(raw);
    entries.push({
      slug,
      mdxPath: fullPath,
      frontmatter: parsed.data as Frontmatter,
      body: parsed.content,
    });
  }
  entries.sort((a, b) => a.slug.localeCompare(b.slug));
  return entries;
}

type Font = Awaited<ReturnType<typeof loadFonts>>[number];

async function renderJpeg(entry: CompareEntry, fonts: Font[]): Promise<Buffer> {
  const competitor = entry.frontmatter.competitor;
  const subtitle = entry.frontmatter.cardSubtitle;
  if (!competitor) throw new Error(`${entry.slug}: missing frontmatter.competitor`);
  if (!subtitle) throw new Error(`${entry.slug}: missing frontmatter.cardSubtitle`);

  const svg = await satori(CompareOg({ competitor, subtitle }), {
    width: 1200,
    height: 627,
    fonts,
  });

  // Render at native 2x (2400×1254). For text-only content, downscaling via
  // lanczos softens edges; outputting at 2x keeps text pin-sharp on retina
  // previewers and lets OG consumers downscale themselves. OG spec is
  // 1.91:1 aspect ratio with a 1200×627 minimum — 2400×1254 hits the same
  // ratio at higher density and is well within consumer limits (LinkedIn
  // accepts up to 7680×4320; Twitter/Slack/Discord scale).
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: 2400 },
    background: "#FAF8F4",
  })
    .render()
    .asPng();

  // Tuning notes:
  //   quality 85 + mozjpeg + 4:2:0 chroma is the sweet spot for text-heavy
  //   OG cards. Luma is preserved at full resolution (so text edges stay
  //   pin-sharp), chroma is halved on both axes (invisible against the
  //   nearly-monochrome content). Lands ~50–70 KB at 2400×1254.
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

async function uploadToR2(filePath: string, slug: string): Promise<string> {
  const prefix = `${R2_PREFIX_ROOT}/${slug}`;
  await execFileP("uv", ["run", "scripts/r2-upload.py", filePath, "--prefix", prefix], {
    cwd: REPO_ROOT,
  });
  // r2-upload.py inserts a SHA-256[:8] segment between prefix and filename
  // (see build_key() in scripts/r2-upload.py — `{prefix}/{sha8}/{filename}`).
  // We mirror that algorithm here so the resulting URL matches the R2 key.
  const bytes = await readFile(filePath);
  const sha8 = createHash("sha256").update(bytes).digest("hex").slice(0, 8);
  return `${R2_PUBLIC_BASE}/${prefix}/${sha8}/${basename(filePath)}`;
}

async function patchFrontmatter(entry: CompareEntry, newOgImage: string): Promise<void> {
  if (entry.frontmatter.ogImage === newOgImage) return; // idempotent
  if (!entry.frontmatter.ogImage) {
    // First-time seed: gray-matter.stringify would reformat the entire YAML
    // block (strip quotes, fold long strings) — noisy diff. Seed the line
    // manually once, then this script handles subsequent updates cleanly.
    throw new Error(
      `${entry.slug}: no existing ogImage to patch. Add a placeholder line ` +
        `'ogImage: "tbd"' to the frontmatter, then re-run.`,
    );
  }
  // Targeted line replace — preserves all other YAML formatting exactly.
  const raw = await readFile(entry.mdxPath, "utf8");
  const next = raw.replace(/^ogImage:.*$/m, `ogImage: "${newOgImage}"`);
  await writeFile(entry.mdxPath, next, "utf8");
  entry.frontmatter.ogImage = newOgImage;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const slugArgs = args
    .filter((a) => a.startsWith("--slug="))
    .map((a) => a.slice("--slug=".length));
  const filterSlugs = slugArgs.length > 0 ? slugArgs : null;

  await mkdir(CACHE_DIR, { recursive: true });

  const entries = await loadEntries(filterSlugs);
  if (entries.length === 0) {
    console.error("No entries matched.");
    process.exit(1);
  }

  const fonts = await loadFonts();

  console.log(`Rendering ${entries.length} card(s) — mode: ${write ? "WRITE" : "DRY-RUN"}`);

  for (const entry of entries) {
    const outPath = join(CACHE_DIR, `${entry.slug}.jpg`);
    try {
      const jpeg = await renderJpeg(entry, fonts);
      await writeFile(outPath, jpeg);
      const sizeKb = (jpeg.byteLength / 1024).toFixed(1);
      console.log(`  ✓ ${entry.slug}.jpg (${sizeKb} KB) → ${outPath}`);

      if (write) {
        const url = await uploadToR2(outPath, entry.slug);
        await patchFrontmatter(entry, url);
        console.log(`    ↳ uploaded + patched ogImage → ${url}`);
      }
    } catch (err) {
      console.error(`  ✗ ${entry.slug}:`, err instanceof Error ? err.message : err);
      throw err;
    }
  }

  if (!write) {
    console.log("\nDry-run complete. Re-run with --write to upload + patch frontmatter.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
