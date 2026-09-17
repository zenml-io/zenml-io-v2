/** Audit default OG coverage; only --write invokes the existing R2 pipeline. */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";
import { OG_CARDS, type OgCard } from "../../src/lib/ogCards.js";
import {
  FAMILIES,
  generateDefaultOg,
  loadDefaultEntries,
  readManifest,
} from "./generate-default-og.js";
import { REPO_ROOT } from "./pipeline.js";

async function filesBelow(dir: string, prefix = ""): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const name = prefix + entry.name;
      return entry.isDirectory()
        ? filesBelow(join(dir, entry.name), `${name}/`)
        : [name];
    }),
  );
  return files.flat().sort();
}

/** Discover keys, never copy: page headlines must be authored in OG_CARDS. */
export async function requiredPageKeys(root: string): Promise<string[]> {
  const keys = new Set<string>();
  for (const [collection, prefix] of [
    ["case-studies", "case-study"],
    ["projects", "project"],
  ] as const) {
    const dir = join(root, "src/content", collection);
    for (const file of await filesBelow(dir)) {
      if (!file.endsWith(".md")) continue;
      const { data } = matter(await readFile(join(dir, file), "utf8"));
      if (data.draft) continue;
      // Bespoke content images have their own publishing workflow.
      if (data.seo?.ogImage && !data.seo.ogImage.includes("/og/pages/"))
        continue;
      keys.add(`${prefix}-${data.slug ?? file.replace(/\.md$/, "")}`);
    }
  }
  // Static pages opt in through an authored OG_CARDS entry or a literal lookup.
  // Other routes deliberately use bespoke images or the generic site fallback.
  for (const directory of ["src/pages", "src/lib"]) {
    for (const file of await filesBelow(join(root, directory))) {
      if (!/\.(astro|tsx?)$/.test(file)) continue;
      const source = await readFile(join(root, directory, file), "utf8");
      const references = source.matchAll(
        /\b(?:defaultOgImage|defaultOgUrl|hasDefaultOgCard)\s*\(\s*["']pages["']\s*,\s*["']([^"']+)["']/g,
      );
      for (const reference of references) keys.add(reference[1]);
    }
  }
  return [...keys].sort();
}

export async function syncDefaultOg({
  root = REPO_ROOT,
  cards = OG_CARDS,
  write = false,
  generate = generateDefaultOg,
  log = console.log,
}: {
  root?: string;
  cards?: readonly OgCard[];
  write?: boolean;
  generate?: (args: string[]) => Promise<void>;
  log?: (message: string) => void;
} = {}): Promise<number> {
  const manifest = await readManifest(root);
  const authored = new Set(cards.map((card) => card.key));
  const missingCopy = (await requiredPageKeys(root)).filter(
    (key) => !authored.has(key),
  );
  let missingCount = 0;
  log(`Default OG sync — ${write ? "WRITE" : "DRY-RUN"}`);
  for (const family of FAMILIES) {
    const slugs =
      family === "pages"
        ? cards.map((card) => card.key)
        : (await loadDefaultEntries(family, null, root)).map(
            (entry) => entry.slug,
          );
    const existing = new Set(manifest[family]);
    const missing = slugs.filter((slug) => !existing.has(slug));
    missingCount += missing.length;
    log(`${family}: ${missing.length} missing card(s)`);
    for (const slug of missing) log(`  ${family}/${slug}`);
  }
  for (const key of missingCopy) {
    log(
      `Missing OG_CARDS entry: ${key}. Add authored copy in src/lib/ogCards.ts.`,
    );
  }
  // Preflight the whole inventory before any rendering, upload or manifest write.
  if (missingCopy.length) {
    log(
      `Blocked: ${missingCopy.length} missing OG_CARDS entry/entries. No cards generated.`,
    );
    return 1;
  }
  if (!missingCount) {
    log("All default OG cards are present.");
    return 0;
  }
  if (write) await generate(["--missing", "--write"]);
  else
    log(
      "Dry-run complete. Run pnpm og:sync --write to render, upload to R2 and update the manifest.",
    );
  return 0;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const args = process.argv.slice(2).filter((arg) => arg !== "--");
  if (args.some((arg) => arg !== "--write")) {
    console.error("Usage: pnpm og:sync [--write]");
    process.exitCode = 1;
  } else {
    syncDefaultOg({ write: args.includes("--write") })
      .then((code) => {
        process.exitCode = code;
      })
      .catch((error) => {
        console.error(error);
        process.exitCode = 1;
      });
  }
}
