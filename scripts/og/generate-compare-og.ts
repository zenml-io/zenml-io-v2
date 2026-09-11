/**
 * Generate Open Graph JPEG cards for every MDX compare page: the
 * `compare-kitaru` collection (Kitaru brand) and the `compare-zenml`
 * collection (ZenML brand). The brand is picked by collection directory
 * and decides the template palette and the R2 prefix.
 *
 * Pipeline: gray-matter (parse frontmatter) → satori (JSX → SVG)
 *           → @resvg/resvg-js (SVG → PNG @ 2400px) → sharp (PNG → JPEG)
 *           → optional R2 upload at a deterministic key.
 * The render, the fonts and the uploader live in `pipeline.ts`, shared with
 * the default-card generator.
 *
 * Dry-run by default (writes JPEGs to .cache/og/). Pass --write to upload
 * to R2. URLs are derived from slug via `compareOgUrl()` in src/lib/seo.ts;
 * no frontmatter mutation needed.
 *
 * Pass --slug=<basename> (repeatable) to limit to specific pages, e.g.
 *   pnpm og:compare --slug=kitaru-vs-pydantic-ai
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";
import sharp from "sharp";
import {
  COMPARE_OG_PREFIX,
  type CompareOgBrand,
} from "../../src/lib/constants.js";
import {
  CACHE_DIR,
  type Font,
  loadFonts,
  REPO_ROOT,
  renderOgJpeg,
  uploadToR2,
} from "./pipeline.js";
import { CompareOg, compareOgBackground } from "./template.js";

export { loadFonts };

const COLLECTION_DIRS: Record<CompareOgBrand, string> = {
  kitaru: join(REPO_ROOT, "src/content/compare-kitaru"),
  zenml: join(REPO_ROOT, "src/content/compare-zenml"),
};
const BRANDS = Object.keys(COLLECTION_DIRS) as CompareOgBrand[];

interface Frontmatter {
  competitor?: string;
  competitorLogo?: string;
  cardSubtitle?: string;
}

interface CompareEntry {
  slug: string;
  brand: CompareOgBrand;
  frontmatter: Frontmatter;
}

export async function loadEntries(
  filterSlugs: string[] | null,
): Promise<CompareEntry[]> {
  const perBrand = await Promise.all(
    BRANDS.map(async (brand) => {
      const dir = COLLECTION_DIRS[brand];
      const files = (await readdir(dir)).filter((file) =>
        file.endsWith(".mdx"),
      );
      return Promise.all(
        files
          .map((file) => ({ file, slug: file.replace(/\.mdx$/, "") }))
          .filter(({ slug }) => !filterSlugs || filterSlugs.includes(slug))
          .map(async ({ file, slug }) => ({
            slug,
            brand,
            frontmatter: matter(await readFile(join(dir, file), "utf8"))
              .data as Frontmatter,
          })),
      );
    }),
  );
  return perBrand.flat().sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function renderJpeg(
  entry: CompareEntry,
  fonts: Font[],
): Promise<Buffer> {
  const { competitor, cardSubtitle } = entry.frontmatter;
  if (!competitor)
    throw new Error(`${entry.slug}: missing frontmatter.competitor`);
  if (!cardSubtitle)
    throw new Error(`${entry.slug}: missing frontmatter.cardSubtitle`);

  const logoPath = entry.frontmatter.competitorLogo;
  if (!logoPath)
    throw new Error(`${entry.slug}: missing frontmatter.competitorLogo`);
  let logo: Buffer;
  if (logoPath.startsWith("https://")) {
    const response = await fetch(logoPath);
    if (!response.ok)
      throw new Error(
        `Cannot load competitor logo: ${response.status} ${logoPath}`,
      );
    logo = Buffer.from(await response.arrayBuffer());
  } else {
    const path = resolve(REPO_ROOT, "public", logoPath.replace(/^\//, ""));
    if (!path.startsWith(`${join(REPO_ROOT, "public")}/`))
      throw new Error("Logo must be a public asset");
    logo = await readFile(path);
  }
  // Preserve the existing mark's colours and aspect ratio in a square logo slot.
  const logoPng = await sharp(logo)
    .resize(480, 480, { fit: "contain", background: "#00000000" })
    .png()
    .toBuffer();
  const competitorLogo = `data:image/png;base64,${logoPng.toString("base64")}`;

  // Keep the approved 16:9 composition, rendered at 2400px for social previews.
  return renderOgJpeg(
    CompareOg({
      competitor,
      subtitle: cardSubtitle,
      competitorLogo,
      brand: entry.brand,
    }),
    fonts,
    compareOgBackground(entry.brand),
  );
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const filterSlugs = args
    .filter((a) => a.startsWith("--slug="))
    .map((a) => a.slice("--slug=".length));

  await mkdir(CACHE_DIR, { recursive: true });

  const entries = await loadEntries(
    filterSlugs.length > 0 ? filterSlugs : null,
  );
  if (entries.length === 0) {
    console.error("No entries matched.");
    process.exit(1);
  }

  const fonts = await loadFonts();
  console.log(
    `Rendering ${entries.length} card(s) — mode: ${write ? "WRITE" : "DRY-RUN"}`,
  );

  const rendered: Array<{ brand: CompareOgBrand; outPath: string }> = [];
  for (const entry of entries) {
    const outPath = join(CACHE_DIR, `${entry.slug}.jpg`);
    const jpeg = await renderJpeg(entry, fonts);
    await writeFile(outPath, jpeg);
    rendered.push({ brand: entry.brand, outPath });
    console.log(
      `  ✓ [${entry.brand}] ${entry.slug}.jpg (${(jpeg.byteLength / 1024).toFixed(1)} KB)`,
    );
  }

  if (write) {
    for (const brand of BRANDS) {
      const paths = rendered
        .filter((r) => r.brand === brand)
        .map((r) => r.outPath);
      if (paths.length === 0) continue;
      await uploadToR2(COMPARE_OG_PREFIX[brand], paths);
      console.log(
        `  ↳ uploaded ${paths.length} ${brand} card(s) to ${COMPARE_OG_PREFIX[brand]}/`,
      );
    }
  }

  if (!write) {
    console.log("\nDry-run complete. Re-run with --write to upload to R2.");
  }
}

// Only run when invoked directly (`pnpm og:compare`); `check-og-golden.ts`
// imports the pipeline above without rendering every card.
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
