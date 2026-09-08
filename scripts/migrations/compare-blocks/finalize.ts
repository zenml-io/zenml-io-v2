/**
 * finalize.ts — the removal half of the compare-to-blocks migration.
 *
 * `convert.ts` materialised every rendered value into `blocks[]` and `hero`
 * without taking anything away, so each entry currently holds the same data
 * twice. This removes the now-unread half: the flat frontmatter fields the old
 * template computed from, and the body those fields were scraped out of.
 *
 * It runs only after the template already renders from blocks. Nothing here
 * reads the body — the table and both code panes live in `blocks[]` now — and
 * the original bodies remain in git history.
 *
 * Refuses to touch an entry that has no `blocks`/`hero`, so running it before
 * (or instead of) the conversion cannot strip an entry down to nothing.
 *
 * Two fields that LOOK retired are deliberately kept: `seoDescription` and
 * `openGraphImage` still feed the SEO chain, and three entries (alteryx,
 * dataiku, domino-data-lab) carry no `seo:` block at all and get their
 * canonical description and card image from exactly those two fields.
 *
 * This script is deliberately NOT added to `package.json`'s `lint` script or
 * `biome.json`'s `includes` list — both enumerate scripts individually, and
 * `scripts/migrations/split-project-bodies.ts` follows the same convention.
 * That also means `pnpm exec biome check <this file>` is a silent no-op; to
 * lint or format it, point `--config-path` at a config without that allowlist.
 * Types are kept trivial — `tsconfig.check.json` excludes `scripts/`.
 *
 * Usage:
 *   pnpm exec tsx scripts/migrations/compare-blocks/finalize.ts --dry-run
 *   pnpm exec tsx scripts/migrations/compare-blocks/finalize.ts --write
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../../..");
const CONTENT_DIR = path.join(ROOT, "src/content/compare");

/**
 * Top-level keys the conversion folded into `blocks[]`/`hero`. Every one is
 * now read by nothing: the template takes these values from the blocks.
 */
const RETIRED_KEYS = [
  "headline",
  "heroText",
  "ctaHeadline",
  "quote",
  "advantages",
  "learnMoreUrl",
  "heroPrimaryCta",
  "heroSecondaryCta",
  "valueSections",
  "codeComparison",
  "featureTableHtml",
  "strategyCtaHeadline",
  "finalCta",
  "relatedBlogSlugs",
] as const;

/** Keys that must survive, checked after the rewrite. */
const REQUIRED_AFTER = [
  "title",
  "slug",
  "toolName",
  "category",
  "blocks",
  "hero",
  "webflow",
] as const;

/**
 * Removes a top-level key and every continuation line belonging to it.
 * A continuation is any line more indented than column 0, or blank; the key
 * ends at the next line starting a new top-level key (or end of input).
 */
function removeTopLevelKeys(frontmatter: string, keys: readonly string[]) {
  const lines = frontmatter.split("\n");
  const out: string[] = [];
  const removed: string[] = [];
  let skipping: string | null = null;

  for (const line of lines) {
    const topLevelKey = /^([A-Za-z_][\w-]*):/.exec(line);
    if (topLevelKey) {
      const key = topLevelKey[1];
      if (keys.includes(key)) {
        skipping = key;
        removed.push(key);
        continue;
      }
      skipping = null;
      out.push(line);
      continue;
    }
    // Not a top-level key: either a continuation of what we're skipping, or
    // content belonging to the last kept key.
    if (skipping !== null) continue;
    out.push(line);
  }

  return { frontmatter: out.join("\n"), removed };
}

function main() {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  if (!write && !args.includes("--dry-run") && args.length > 0) {
    console.error(
      "Usage: pnpm exec tsx scripts/migrations/compare-blocks/finalize.ts [--dry-run | --write]",
    );
    process.exit(1);
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  let changed = 0;
  let alreadyDone = 0;
  let failures = 0;

  for (const filename of files) {
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = matter(raw);
    const slug = (parsed.data.slug as string) || filename.replace(/\.md$/, "");

    if (!parsed.data.blocks || !parsed.data.hero) {
      console.error(
        `✗ ${slug}: no blocks/hero — run convert.ts first. Refusing to strip this entry.`,
      );
      failures += 1;
      continue;
    }

    const present = RETIRED_KEYS.filter((k) => parsed.data[k] !== undefined);
    const bodyHasContent = parsed.content.trim().length > 0;
    if (present.length === 0 && !bodyHasContent) {
      alreadyDone += 1;
      console.log(`· ${slug}: already finalized`);
      continue;
    }

    const match = /^---\n([\s\S]*?\n)---\n([\s\S]*)$/.exec(raw);
    if (!match) {
      console.error(`✗ ${slug}: could not split frontmatter`);
      failures += 1;
      continue;
    }

    const { frontmatter, removed } = removeTopLevelKeys(match[1], RETIRED_KEYS);
    const next = `---\n${frontmatter}---\n`;

    // Re-parse the exact bytes about to be written: the removal must not have
    // disturbed anything that stays, and the retired keys must really be gone.
    const after = matter(next);
    const stillPresent = RETIRED_KEYS.filter(
      (k) => after.data[k] !== undefined,
    );
    const missing = REQUIRED_AFTER.filter((k) => after.data[k] === undefined);
    const blocksIntact =
      JSON.stringify(after.data.blocks) === JSON.stringify(parsed.data.blocks);
    const heroIntact =
      JSON.stringify(after.data.hero) === JSON.stringify(parsed.data.hero);

    if (
      stillPresent.length > 0 ||
      missing.length > 0 ||
      !blocksIntact ||
      !heroIntact
    ) {
      console.error(
        `✗ ${slug}: round-trip failed (still present: ${stillPresent.join(", ") || "none"}; ` +
          `missing: ${missing.join(", ") || "none"}; blocks intact: ${blocksIntact}; hero intact: ${heroIntact})`,
      );
      failures += 1;
      continue;
    }

    changed += 1;
    console.log(
      `✓ ${slug}: removed ${removed.length} field(s) (${removed.join(", ")})${
        bodyHasContent ? `, blanked ${parsed.content.length} body bytes` : ""
      }`,
    );
    if (write) fs.writeFileSync(filePath, next, "utf-8");
  }

  console.log(
    `\n${changed} entr${changed === 1 ? "y" : "ies"} ${write ? "finalized" : "verified (dry run — nothing written)"}, ` +
      `${alreadyDone} already finalized, ${files.length} file(s) total.`,
  );
  if (failures > 0) {
    console.error(`${failures} failure(s).`);
    process.exit(1);
  }
}

main();
