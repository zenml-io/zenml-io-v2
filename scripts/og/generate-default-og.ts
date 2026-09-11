/**
 * Generate the default Open Graph card for everything that is not a VS
 * comparison page: the LLMOps and MLOps research databases, and the hub,
 * index and standalone pages listed in `src/lib/ogCards.ts`.
 *
 * Pipeline: gray-matter / ogCards (copy) → satori (JSX → SVG)
 *           → @resvg/resvg-js (SVG → PNG @ 2400px) → sharp (PNG → JPEG)
 *           → optional R2 upload at a deterministic key.
 * The render and the uploader are shared with the VS generator (pipeline.ts).
 *
 * Dry-run by default, writing to .cache/og/<family>/<slug>.jpg:
 *   pnpm og:default --family=mlops
 *   pnpm og:default --family=pages --slug=pricing
 *   pnpm og:default --missing            # only slugs with no card yet
 *
 * `pnpm og:default:write` uploads to R2 and rewrites the manifest
 * `src/data/og-cards.json`, which is what `hasDefaultOgCard()` reads. Run it
 * after publishing new database entries so their cards exist before the
 * pages that point at them ship.
 *
 * A card that throws is reported and skipped; the run still exits non-zero,
 * so one broken entry never silently drops out of a batch.
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";
import {
  DEFAULT_OG_PREFIX,
  type DefaultOgFamily,
} from "../../src/lib/constants.js";
import { OG_CARDS, type OgBrand, type OgLayout } from "../../src/lib/ogCards.js";
import {
  DefaultOg,
  type DefaultOgBackground,
  defaultOgBackground,
  fitDefaultOg,
  pickDefaultOgBackground,
  subtitleLinesOf,
} from "./default-template.js";
import {
  CACHE_DIR,
  type Font,
  loadFonts,
  REPO_ROOT,
  renderOgJpeg,
  uploadToR2,
} from "./pipeline.js";

const FAMILIES = Object.keys(DEFAULT_OG_PREFIX) as DefaultOgFamily[];

/** Where each database family's entries live, and how its cards read. */
const DATABASES = {
  llmops: {
    dir: join(REPO_ROOT, "src/content/llmops-database"),
    eyebrow: "LLMOps Database",
    brand: "zenml",
  },
  mlops: {
    dir: join(REPO_ROOT, "src/content/mlops-database"),
    eyebrow: "MLOps Database",
    brand: "zenml",
  },
} as const satisfies Record<string, { dir: string; eyebrow: string; brand: OgBrand }>;

const MANIFEST_PATH = join(REPO_ROOT, "src/data/og-cards.json");

export interface DefaultOgEntry {
  family: DefaultOgFamily;
  /** R2 filename and, for the databases, the route slug. */
  slug: string;
  brand: OgBrand;
  eyebrow: string;
  layout: OgLayout;
  background: DefaultOgBackground;
  title: string;
  subtitle: string;
}

type Manifest = Record<DefaultOgFamily, string[]>;

async function readManifest(): Promise<Manifest> {
  const raw = JSON.parse(await readFile(MANIFEST_PATH, "utf8")) as Partial<
    Record<DefaultOgFamily, string[]>
  >;
  return Object.fromEntries(
    FAMILIES.map((family) => [family, raw[family] ?? []]),
  ) as Manifest;
}

/** Merge the slugs just uploaded into the committed manifest. */
async function writeManifest(added: DefaultOgEntry[]): Promise<Manifest> {
  const manifest = await readManifest();
  for (const family of FAMILIES) {
    const slugs = new Set(manifest[family]);
    for (const entry of added)
      if (entry.family === family) slugs.add(entry.slug);
    manifest[family] = [...slugs].sort((a, b) => a.localeCompare(b));
  }
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

interface DatabaseFrontmatter {
  title?: string;
  slug?: string;
  draft?: boolean;
  company?: string;
  year?: number;
}

/**
 * Database copy (D4): the entry title, with the company and year beneath.
 * The eyebrow chip names the database, so the subtitle falls back to it
 * only when an entry has neither.
 */
function databaseSubtitle(
  frontmatter: DatabaseFrontmatter,
  eyebrow: string,
): string {
  const attribution = [frontmatter.company, frontmatter.year]
    .filter(Boolean)
    .join(" · ");
  return attribution || `ZenML ${eyebrow}`;
}

/** Every card in a family, optionally narrowed to a list of slugs. */
export async function loadDefaultEntries(
  family: DefaultOgFamily,
  filterSlugs?: string[] | null,
): Promise<DefaultOgEntry[]> {
  const wanted = (slug: string) => !filterSlugs || filterSlugs.includes(slug);

  if (family === "pages")
    return OG_CARDS.filter((card) => wanted(card.key)).map((card) => ({
      family,
      slug: card.key,
      brand: card.brand ?? "labs",
      eyebrow: card.eyebrow,
      layout: card.layout ?? "panel",
      background: pickDefaultOgBackground(`${family}/${card.key}`),
      title: card.title,
      subtitle: card.subtitle,
    }));

  const { dir, eyebrow, brand } = DATABASES[family];
  const files = (await readdir(dir)).filter((file) => file.endsWith(".md"));
  const entries = await Promise.all(
    files.map(async (file): Promise<DefaultOgEntry | null> => {
      const frontmatter = matter(await readFile(join(dir, file), "utf8"))
        .data as DatabaseFrontmatter;
      const slug = frontmatter.slug ?? file.replace(/\.md$/, "");
      if (frontmatter.draft || !wanted(slug)) return null;
      if (!frontmatter.title)
        throw new Error(`${file}: missing frontmatter.title`);
      return {
        family,
        slug,
        brand,
        eyebrow,
        layout: "panel",
        background: pickDefaultOgBackground(`${family}/${slug}`),
        title: frontmatter.title,
        subtitle: databaseSubtitle(frontmatter, eyebrow),
      };
    }),
  );
  return entries
    .filter((entry): entry is DefaultOgEntry => entry !== null)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Fit the copy to the frame, then render the card. */
export async function renderDefaultJpeg(
  entry: DefaultOgEntry,
  fonts: Font[],
): Promise<Buffer> {
  const fit = await fitDefaultOg(
    entry.title,
    subtitleLinesOf(entry.subtitle),
    fonts,
    entry.layout,
  );
  return renderOgJpeg(
    DefaultOg({
      brand: entry.brand,
      eyebrow: entry.eyebrow,
      layout: entry.layout,
      background: entry.background,
      title: entry.title,
      subtitle: entry.subtitle,
      fit,
    }),
    fonts,
    defaultOgBackground(entry.brand),
  );
}

function parseFamilies(args: string[]): DefaultOgFamily[] {
  const requested = args
    .filter((arg) => arg.startsWith("--family="))
    .map((arg) => arg.slice("--family=".length));
  for (const family of requested)
    if (!FAMILIES.includes(family as DefaultOgFamily))
      throw new Error(
        `Unknown --family=${family}. Expected one of: ${FAMILIES.join(", ")}`,
      );
  return requested.length > 0 ? (requested as DefaultOgFamily[]) : FAMILIES;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const onlyMissing = args.includes("--missing");
  const families = parseFamilies(args);
  const filterSlugs = args
    .filter((arg) => arg.startsWith("--slug="))
    .map((arg) => arg.slice("--slug=".length));

  const manifest = await readManifest();
  const fonts = await loadFonts();
  const rendered: DefaultOgEntry[] = [];
  const failed: string[] = [];

  for (const family of families) {
    const entries = (
      await loadDefaultEntries(
        family,
        filterSlugs.length > 0 ? filterSlugs : null,
      )
    ).filter((entry) => !onlyMissing || !manifest[family].includes(entry.slug));
    if (entries.length === 0) continue;

    const outDir = join(CACHE_DIR, family);
    await mkdir(outDir, { recursive: true });
    console.log(
      `Rendering ${entries.length} ${family} card(s) — mode: ${write ? "WRITE" : "DRY-RUN"}`,
    );

    const paths: string[] = [];
    for (const entry of entries) {
      try {
        const jpeg = await renderDefaultJpeg(entry, fonts);
        const outPath = join(outDir, `${entry.slug}.jpg`);
        await writeFile(outPath, jpeg);
        paths.push(outPath);
        rendered.push(entry);
        console.log(
          `  ✓ [${family}] ${entry.slug}.jpg (${(jpeg.byteLength / 1024).toFixed(1)} KB)`,
        );
      } catch (error) {
        failed.push(`${family}/${entry.slug}`);
        console.error(
          `  ✗ [${family}] ${entry.slug}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    if (write && paths.length > 0) {
      await uploadToR2(DEFAULT_OG_PREFIX[family], paths);
      console.log(
        `  ↳ uploaded ${paths.length} ${family} card(s) to ${DEFAULT_OG_PREFIX[family]}/`,
      );
    }
  }

  if (rendered.length === 0 && failed.length === 0) {
    console.error("No entries matched.");
    process.exit(1);
  }

  if (write) {
    const updated = await writeManifest(rendered);
    console.log(
      `  ↳ manifest: ${FAMILIES.map((family) => `${family} ${updated[family].length}`).join(", ")}`,
    );
  } else {
    console.log("\nDry-run complete. Re-run with --write to upload to R2.");
  }

  if (failed.length > 0) {
    console.error(`\n${failed.length} card(s) failed: ${failed.join(", ")}`);
    process.exit(1);
  }
}

// Only run when invoked directly (`pnpm og:default`); the golden check
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
