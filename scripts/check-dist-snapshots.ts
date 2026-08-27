/**
 * check-dist-snapshots.ts
 *
 * Compares the rendered HTML of a few representative pages in dist/ against
 * committed golden copies in tests/snapshots/rendered/. Runs as part of
 * `pnpm smoke:dist` (after `pnpm build`), and standalone via
 * `pnpm check:snapshots`. Regenerate the goldens with `pnpm snapshots:update`
 * and review the diff before committing it — the diff IS the review.
 *
 * Why this exists: the Markdown/MDX pipeline (remark, rehype, Shiki,
 * SmartyPants, the MDX component bindings) is exercised by nothing in CI
 * except "did the build exit 0". The Astro 7.2.4 bump (#268) silently changed
 * smart-quote direction on 11 pages; a worse change — dropped code blocks,
 * un-escaped HTML, a broken table — would have shipped green too. A golden
 * copy of one blog post (plain Markdown) and one Kitaru-vs-X page (MDX with
 * component imports) turns "the build succeeded" into "the build produced
 * the same content it produced last time".
 *
 * Only the content region of each page is snapshotted (not <head>, nav,
 * footer, related posts), so routine site-furniture changes don't churn the
 * goldens. Build-identity attributes (hashed asset names, Astro's scoped-style
 * ids) are normalised for the same reason.
 */

import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { load } from "cheerio";

export const DIST_DIR = "dist/client";
const SNAPSHOT_DIR = "tests/snapshots/rendered";
const ACTUAL_DIR = ".cache/snapshots";

export function logResult(ok: boolean, message: string) {
  console.log(`   ${ok ? "✅" : "❌"} ${message}`);
}

interface SnapshotTarget {
  /** Page under dist/client. */
  page: string;
  /** CSS selector for the region to snapshot; must match exactly one element. */
  selector: string;
  /** Golden file name under SNAPSHOT_DIR. */
  golden: string;
  /** What this page exercises — shown in the failure message. */
  covers: string;
}

const SNAPSHOT_TARGETS: SnapshotTarget[] = [
  {
    page: "blog/agents-are-not-microservices.html",
    selector: ".prose",
    golden: "blog-agents-are-not-microservices.html",
    covers:
      "plain-Markdown blog body: headings, table, fenced code (Shiki), smart quotes, links",
  },
  {
    page: "compare/kitaru-vs-temporal.html",
    selector: ".compare-body-inner",
    golden: "compare-kitaru-vs-temporal.html",
    covers:
      "MDX compare-page body: component imports, ComparisonTable, CodeCompare panes (Shiki)",
  },
];

/**
 * Hashed build assets (`/_astro/name.Ab12Cd34.css`) change whenever any
 * source they bundle changes, and `data-astro-cid-*` is a hash of the
 * component's file path — neither says anything about rendered content.
 */
const ASSET_HASH_RE = /(\/_astro\/[^"'\s]+?)\.[A-Za-z0-9_-]{8}\.(\w+)/g;
const SCOPED_STYLE_ID_RE = /data-astro-cid-[a-z0-9]+/g;

function normaliseSnapshot(html: string): string {
  const normalised = html
    .replace(ASSET_HASH_RE, "$1.[hash].$2")
    .replace(SCOPED_STYLE_ID_RE, "data-astro-cid-[hash]")
    // One tag per line so a golden diff reads like a document, not one 30 KB
    // line. Cheerio escapes "<" in text nodes, so this is a tag boundary
    // nearly everywhere; a "<" inside an attribute value or inline <script>
    // would also get a newline, which is ugly but still deterministic.
    .replace(/</g, "\n<")
    .trim();
  return `${normalised}\n`;
}

/** The normalised content region, or null (already logged) if it can't be read. */
function readRegion(target: SnapshotTarget): string | null {
  const pagePath = join(DIST_DIR, target.page);
  if (!existsSync(pagePath)) {
    logResult(false, `${target.page} is missing from ${DIST_DIR}/`);
    return null;
  }
  const $ = load(readFileSync(pagePath, "utf8"));
  const matches = $(target.selector);
  if (matches.length !== 1) {
    logResult(
      false,
      `${target.page}: selector "${target.selector}" matched ${matches.length} elements (expected exactly 1)`,
    );
    return null;
  }
  return normaliseSnapshot($.html(matches.first()));
}

function printDiff(goldenPath: string, actualPath: string) {
  const result = spawnSync("diff", ["-u", goldenPath, actualPath], {
    stdio: "inherit",
  });
  if (result.error) {
    console.log(
      `      (no \`diff\` on PATH) compare: ${goldenPath} ${actualPath}`,
    );
  }
}

/**
 * Returns the number of failing targets. With `update` set, rewrites the
 * goldens instead and returns 0.
 */
export function checkRenderedSnapshots(update = false): number {
  let failures = 0;
  for (const target of SNAPSHOT_TARGETS) {
    const goldenPath = join(SNAPSHOT_DIR, target.golden);
    const actualPath = join(ACTUAL_DIR, target.golden);
    const actual = readRegion(target);
    if (actual === null) {
      failures += 1;
      continue;
    }

    if (update) {
      writeFileSync(goldenPath, actual);
      logResult(true, `wrote ${goldenPath} from ${target.page}`);
      continue;
    }

    const golden = existsSync(goldenPath)
      ? readFileSync(goldenPath, "utf8")
      : null;
    if (golden === actual) {
      rmSync(actualPath, { force: true });
      logResult(true, `${target.page} matches ${goldenPath}`);
      continue;
    }

    failures += 1;
    mkdirSync(ACTUAL_DIR, { recursive: true });
    writeFileSync(actualPath, actual);
    if (golden === null) {
      logResult(
        false,
        `${goldenPath} does not exist — run \`pnpm snapshots:update\` and commit it`,
      );
      continue;
    }
    logResult(
      false,
      `${target.page} no longer matches ${goldenPath} (covers: ${target.covers})`,
    );
    printDiff(goldenPath, actualPath);
    console.log(
      "      if the change is intended: pnpm snapshots:update, review the golden diff, commit it",
    );
  }
  return failures;
}

function main() {
  if (!existsSync(DIST_DIR)) {
    console.error(
      `ERROR: ${DIST_DIR}/ not found. Run pnpm build before pnpm check:snapshots.`,
    );
    process.exit(1);
  }
  const update = process.argv.includes("--update");
  console.log(
    update
      ? `Updating rendered-content goldens in ${SNAPSHOT_DIR}/`
      : `Checking rendered content against ${SNAPSHOT_DIR}/`,
  );
  const failures = checkRenderedSnapshots(update);
  console.log(failures === 0 ? "✅ PASS" : `❌ FAIL (${failures})`);
  process.exit(failures > 0 ? 1 : 0);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main();
}
