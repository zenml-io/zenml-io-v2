/**
 * parity.ts — PR3 comparison-consolidation parity instrument.
 *
 * The 28 ZenML comparison routes (25 `/compare/zenml-vs-*` + 3 `/vs/*`) must
 * render byte-identical after the templates behind them are consolidated.
 * This script captures a baseline of the raw built HTML before the
 * consolidation, then — after the consolidation — byte-compares a fresh
 * `dist/client` against that baseline under normalisation, and classifies
 * any failure so a byte diff caused by moved component files (Astro scoping
 * artefacts) doesn't read the same as a real content regression.
 *
 * Route list: derived from `src/content/compare/*.md` and
 * `src/content/vs-pages/*.md` via each file's frontmatter `slug` field (not
 * the filename — the live templates key off `item.data.slug`), filtered with
 * `!draft` (the live templates' predicate). Expected count is exactly 28; a
 * different count is a hard failure in every mode, because it means the route
 * list itself has drifted and nothing downstream can be trusted.
 *
 * Modes:
 *   --capture        Copy the 28 RAW (unnormalised) html files, the CSS
 *                     bundles they reference, and a manifest.json into
 *                     .cache/compare-parity/baseline/.
 *                     Refuses (exit 1) if the working tree has tracked
 *                     modifications, or if dist/client or any of the 28
 *                     files is missing — a baseline captured any other way
 *                     would silently mean nothing.
 *   (no argument)     Compare the captured baseline against a fresh
 *                     dist/client for all 28 routes, normalising BOTH sides
 *                     with the imported `normaliseSnapshot` (the same
 *                     normaliser `pnpm smoke:dist` uses — see below).
 *   --diff <route>    Write the two normalised, blog-rail-excised versions
 *                     of one route to temp files and shell out to `diff -u`
 *                     so a human can read the full diff.
 *
 * Why `normaliseSnapshot` is imported, not reimplemented: duplicating it
 * would fork the definition of "identical" so this script's evidence would
 * be computed under different rules than CI's snapshot gate. Its three
 * operations are all load-bearing here: asset hashes and
 * `data-astro-cid-*` both change when a component file moves or is renamed,
 * and the one-tag-per-line split is what makes "first differing line" mean
 * "first differing tag" below.
 *
 * Blog-rail excision (applied to both sides, after normaliseSnapshot, in
 * both compare mode and --diff): every compare page ends with a
 * `<section class="blog-section">` that renders the 3 most recently
 * published blog posts dynamically (no entry pins `relatedBlogSlugs`), so a
 * blog post merging mid-flight must not fail all 25 comparisons for a
 * reason that has nothing to do with the templates under test. Within each
 * matched section, the span from the first `<article` to the last
 * `</article>` is replaced with the token `[BLOG-RAIL-CARDS-ELIDED:<n>]`,
 * where `<n>` is the number of `<article` elements actually elided — so a
 * rail that silently drops from three cards to two produces a different
 * token and still fails. `/vs/*` pages carry no blog-section, so the
 * excision is a clean no-op there.
 *
 * Stylesheets: the components behind these pages emit their `<style>` blocks
 * into a hashed bundle (`/_astro/_slug_.<hash>.css`, ~14 KB, shared by all 25
 * `/compare/*` routes; the 3 `/vs/*` routes reference no such bundle), and
 * `normaliseSnapshot` masks that hash — so comparing HTML alone leaves every
 * one of those rules outside the gate, and a restyle would pass green. Capture
 * therefore also copies each `/_astro/*.css` bundle the 28 routes reference,
 * and compare mode diffs them by base name (the hash moves with content, so
 * the name is the identity and the content is the check). This is reported in
 * its own section: a `global.css` change is a site-wide edit to explain, not
 * one of the 28 routes regressing.
 *
 * Kitaru guard set: `src/pages/compare/[slug].astro` emits the 10
 * `kitaru-vs-*` routes from the SAME dispatcher as the 25 `zenml-vs-*` ones,
 * and they share the same CSS bundle — so a change to the dispatcher or to a
 * shared component could regress them while all 28 parity routes stay green.
 * The ruling for this wave is that those pages are untouched; comparing them
 * is the cheapest proof, so they are captured and compared as a separate
 * guard set, reported under its own heading and counted separately from the
 * 28. They are NOT part of the parity set and no ruling about them changes.
 *
 * DOCBLOCK BLIND SPOT: the excision means the three BlogCard subtrees
 * (headline, excerpt, author, image, reading time) are NOT checked by this
 * script. What still IS checked: the section wrapper classes, the
 * `fade-in-element` div, SectionIntro's text and class overrides, the grid
 * class (`gridVariant` and `reveal` are still verified), and the trailing
 * `<style>`/`<script>` pair. A green run here is not evidence the card
 * markup itself survived the consolidation.
 *
 * Classification caveat: `classifyFailure` strips ALL `<style>` blocks (not
 * just Astro's scoped ones), so a content change confined entirely to a
 * `<style>` block is labelled SCOPING-ONLY. The route still fails and the
 * printed first-differing-tag shows the real change — only the triage label
 * can mislead, and the diff printed next to it corrects it.
 *
 * Known non-determinism, already checked, deliberately given no special
 * treatment: the `astro-island` `uid` attribute is derived from island
 * props/content, so it is identical across a capture/compare pair; there
 * are no per-request nonces on these pages; Pagefind's index glob is
 * `*ops-database/*.html`, so these routes carry no `data-pagefind-*`
 * attributes to begin with. The footer's `new Date().getFullYear()` is the
 * only date on the page — it is real, checked content, not noise.
 *
 * This script is deliberately NOT added to `package.json`'s `lint` script or
 * `biome.json`'s `includes` list — both enumerate scripts individually, and
 * `scripts/migrations/split-project-bodies.ts` follows the same convention.
 * Note that also means `pnpm exec biome check <this file>` is a silent no-op
 * (Biome only processes paths in `biome.json`'s `files.includes` allowlist):
 * to actually lint/format it, point `--config-path` at a config without that
 * allowlist. It was formatted that way when authored. Types are kept trivial
 * — `tsconfig.check.json` excludes `scripts/`, so `astro check` never sees
 * this file.
 *
 * Usage:
 *   pnpm exec tsx scripts/migrations/compare-blocks/parity.ts --capture
 *   pnpm exec tsx scripts/migrations/compare-blocks/parity.ts
 *   pnpm exec tsx scripts/migrations/compare-blocks/parity.ts --diff compare/zenml-vs-mlflow.html
 */

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import matter from "gray-matter";
import { normaliseSnapshot } from "../../check-dist-snapshots.ts";

const COMPARE_DIR = "src/content/compare";
const VS_DIR = "src/content/vs-pages";
const KITARU_DIR = "src/content/compare-kitaru";
const DIST_DIR = "dist/client";
const CACHE_DIR = ".cache/compare-parity";
const BASELINE_DIR = join(CACHE_DIR, "baseline");
const MANIFEST_PATH = join(BASELINE_DIR, "manifest.json");
const EXPECTED_ROUTE_COUNT = 28;

interface Route {
  /** Relative path under dist/client (and under the baseline dir), e.g. "compare/zenml-vs-mlflow.html". */
  route: string;
  slug: string;
  kind: "compare" | "vs";
}

interface Manifest {
  capturedAt: string;
  gitSha: string;
  gitDirty: boolean;
  routes: string[];
  guardRoutes: string[];
  stylesheets: string[];
}

// --- Stylesheet parity --------------------------------------------------------

const STYLESHEET_HREF_RE = /\/_astro\/[^"'\s]+?\.css/g;
/** `/_astro/_slug_.Bwq-O1lr.css` → `_slug_` — the hash moves with content, the base name identifies the bundle. */
function stylesheetBaseName(href: string): string {
  const file = href.slice(href.lastIndexOf("/") + 1);
  return file.replace(/\.[A-Za-z0-9_-]{8}\.css$/, "");
}

/** Every `/_astro/*.css` the given HTML links, de-duplicated. */
function referencedStylesheets(html: string): string[] {
  return [...new Set(html.match(STYLESHEET_HREF_RE) ?? [])].sort();
}

/**
 * Union of the stylesheets referenced by a set of HTML files, keyed
 * `<kind>:<base name>` → dist-relative href.
 *
 * The key includes the route kind because Astro names a route bundle after its
 * route FILE: `compare/[slug].astro` and `vs/[slug].astro` would both emit
 * `_slug_.<hash>.css`. Only `/compare/*` emits one today, but the very
 * consolidation this script guards could give `/vs/*` its own — and keying on
 * the base name alone would then let one silently overwrite the other, so the
 * compare bundle would drop out of the gate and the tool would diff a baseline
 * compare bundle against a new vs bundle.
 */
function collectStylesheets(dir: string, routes: Route[]): Map<string, string> {
  const byKey = new Map<string, string>();
  for (const r of routes) {
    const p = join(dir, r.route);
    if (!existsSync(p)) continue;
    for (const href of referencedStylesheets(readFileSync(p, "utf8"))) {
      byKey.set(`${r.kind}:${stylesheetBaseName(href)}`, href);
    }
  }
  return byKey;
}

/** Reads every content file in a dir and returns its frontmatter data, sorted by filename for determinism. */
function readFrontmatterEntries(
  dir: string,
  ext = ".md",
): Array<{ file: string; data: Record<string, unknown> }> {
  return readdirSync(dir)
    .filter((name) => name.endsWith(ext))
    .sort()
    .map((file) => ({
      file,
      data: matter(readFileSync(join(dir, file), "utf8")).data,
    }));
}

/**
 * Derives the 28 routes from content frontmatter (slug field, not filename —
 * the live route templates key off `item.data.slug`). Throws if the count
 * isn't exactly 28: every mode must hard-fail on that, since a drifted route
 * list means nothing downstream can be trusted.
 */
function deriveRoutes(): Route[] {
  const compareRoutes: Route[] = readFrontmatterEntries(COMPARE_DIR)
    .filter(({ data }) => !data.draft)
    .map(({ data }) => ({
      route: `compare/${data.slug}.html`,
      slug: String(data.slug),
      kind: "compare",
    }));

  const vsRoutes: Route[] = readFrontmatterEntries(VS_DIR)
    .filter(({ data }) => !data.draft)
    .map(({ data }) => ({
      route: `vs/${data.slug}.html`,
      slug: String(data.slug),
      kind: "vs",
    }));

  const routes = [...compareRoutes, ...vsRoutes];
  if (routes.length !== EXPECTED_ROUTE_COUNT) {
    throw new Error(
      `expected ${EXPECTED_ROUTE_COUNT} routes (25 compare + 3 vs), found ${routes.length} ` +
        `(${compareRoutes.length} compare + ${vsRoutes.length} vs). The route list has drifted — ` +
        "fix the content collections or this derivation before trusting anything else this script reports.",
    );
  }
  return routes;
}

/**
 * Runs a git command, or exits. Both callers below are load-bearing for
 * whether a baseline means anything, so a git that is missing, or that exits
 * non-zero, must stop the capture rather than resolve to "" and read as a
 * clean tree.
 */
function git(args: string[]): string {
  const result = spawnSync("git", args, { encoding: "utf8" });
  if (
    result.error ||
    result.status !== 0 ||
    typeof result.stdout !== "string"
  ) {
    console.error(
      `ERROR: \`git ${args.join(" ")}\` failed (${result.error?.message ?? `exit ${result.status}`}). ` +
        "Parity capture depends on git to prove the tree is clean — refusing to continue.",
    );
    process.exit(1);
  }
  return result.stdout;
}

/**
 * The 10 `kitaru-vs-*` routes. They are NOT part of the 28-route parity set,
 * but `src/pages/compare/[slug].astro` emits them from the same dispatcher and
 * they share the same `_slug_.css` bundle, so a change to the dispatcher or to
 * a shared component can regress them while all 28 stay green. The ruling for
 * this wave is that they are untouched; comparing them is the cheapest proof
 * of that, so they are captured and compared as a separate guard set.
 *
 * They key off the entry id (filename), not a frontmatter `slug` — these
 * entries have no `slug` field and the dispatcher routes them by `e.id`.
 */
function deriveGuardRoutes(): Route[] {
  return readFrontmatterEntries(KITARU_DIR, ".mdx")
    .filter(({ data }) => !data.draft)
    .map(({ file }) => ({
      route: `compare/${file.replace(/\.mdx$/, "")}.html`,
      slug: file.replace(/\.mdx$/, ""),
      kind: "compare" as const,
    }));
}

/** Tracked (not untracked) working-tree modifications — untracked scratch files don't make a capture untrustworthy. */
function hasTrackedModifications(): boolean {
  return git(["status", "--porcelain"])
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .some((line) => !line.startsWith("??"));
}

function currentGitSha(): string {
  return git(["rev-parse", "HEAD"]).trim();
}

// --- Blog-rail excision -----------------------------------------------------

const BLOG_SECTION_RE = /<section class="blog-section[\s\S]*?<\/section>/g;
const ARTICLE_OPEN = "<article";
const ARTICLE_CLOSE = "</article>";

function elideBlogRailCards(html: string): string {
  return html.replace(BLOG_SECTION_RE, (section) => {
    const first = section.indexOf(ARTICLE_OPEN);
    const last = section.lastIndexOf(ARTICLE_CLOSE);
    if (first === -1 || last === -1) return section;
    const elided = section.slice(first, last + ARTICLE_CLOSE.length);
    const cardCount = elided.split(ARTICLE_OPEN).length - 1;
    return (
      section.slice(0, first) +
      `[BLOG-RAIL-CARDS-ELIDED:${cardCount}]` +
      section.slice(last + ARTICLE_CLOSE.length)
    );
  });
}

/** normaliseSnapshot + the blog-rail excision — the "identical" this script judges routes by. */
function normaliseForCompare(html: string): string {
  return elideBlogRailCards(normaliseSnapshot(html));
}

// --- Classification ----------------------------------------------------------

const CID_PLACEHOLDER_RE = /\s*data-astro-cid-\[hash\]/g;
const STYLE_BLOCK_RE = /<style[\s\S]*?<\/style>/g;

/** Strips Astro scoping artefacts from an already-normalised string, for classification only. */
function stripScopingArtefacts(html: string): string {
  return html.replace(STYLE_BLOCK_RE, "").replace(CID_PLACEHOLDER_RE, "");
}

function classifyFailure(
  baseline: string,
  actual: string,
): "SCOPING-ONLY" | "CONTENT" {
  return stripScopingArtefacts(baseline) === stripScopingArtefacts(actual)
    ? "SCOPING-ONLY"
    : "CONTENT";
}

// --- First-differing-tag context --------------------------------------------

const CONTEXT_LINES = 3;
const MAX_LINE_LEN = 200;

function truncate(line: string): string {
  return line.length > MAX_LINE_LEN ? `${line.slice(0, MAX_LINE_LEN)}…` : line;
}

function printFirstDifference(baseline: string, actual: string) {
  const baseLines = baseline.split("\n");
  const actualLines = actual.split("\n");
  const maxLen = Math.max(baseLines.length, actualLines.length);
  let diffIndex = -1;
  for (let i = 0; i < maxLen; i++) {
    if (baseLines[i] !== actualLines[i]) {
      diffIndex = i;
      break;
    }
  }
  if (diffIndex === -1) return; // shouldn't happen for an already-known mismatch

  const from = Math.max(0, diffIndex - CONTEXT_LINES);
  const to = diffIndex + CONTEXT_LINES;

  console.log(`      first differing tag at line ${diffIndex + 1}:`);
  console.log(
    `      --- baseline (lines ${from + 1}-${Math.min(to, baseLines.length - 1) + 1}) ---`,
  );
  for (let i = from; i <= to && i < baseLines.length; i++) {
    console.log(
      `      ${i === diffIndex ? ">" : " "} ${truncate(baseLines[i])}`,
    );
  }
  console.log(
    `      --- actual (lines ${from + 1}-${Math.min(to, actualLines.length - 1) + 1}) ---`,
  );
  for (let i = from; i <= to && i < actualLines.length; i++) {
    console.log(
      `      ${i === diffIndex ? ">" : " "} ${truncate(actualLines[i])}`,
    );
  }
}

// --- Modes --------------------------------------------------------------------

function runCapture() {
  if (hasTrackedModifications()) {
    console.error(
      "ERROR: working tree has tracked modifications. A baseline captured over a dirty " +
        "tree can't be trusted later — commit or stash first, then re-run --capture.",
    );
    process.exit(1);
  }

  if (!existsSync(DIST_DIR)) {
    console.error(
      `ERROR: ${DIST_DIR}/ is missing. Run \`pnpm build\` before --capture.`,
    );
    process.exit(1);
  }

  let routes: Route[];
  try {
    routes = deriveRoutes();
  } catch (error) {
    console.error(`ERROR: ${(error as Error).message}`);
    process.exit(1);
  }
  const guardRoutes = deriveGuardRoutes();
  const allRoutes = [...routes, ...guardRoutes];

  const missing = allRoutes.filter((r) => !existsSync(join(DIST_DIR, r.route)));
  if (missing.length > 0) {
    console.error(
      `ERROR: ${missing.length} of ${allRoutes.length} expected route(s) are missing from ${DIST_DIR}/:`,
    );
    for (const r of missing) console.error(`   - ${r.route}`);
    console.error(
      "A baseline can't omit routes it's meant to guard. Fix the build, then re-run --capture.",
    );
    process.exit(1);
  }

  mkdirSync(BASELINE_DIR, { recursive: true });
  for (const r of allRoutes) {
    const dest = join(BASELINE_DIR, r.route);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(join(DIST_DIR, r.route), dest);
    console.log(`✅ captured ${r.route}`);
  }

  // The component styles these pages render with live in a hashed bundle the
  // HTML normaliser masks by design, so they must be captured separately or
  // they are outside the gate entirely (see the stylesheet note in the docblock).
  const stylesheets = collectStylesheets(DIST_DIR, routes);
  for (const href of stylesheets.values()) {
    const src = join(DIST_DIR, href.replace(/^\//, ""));
    if (!existsSync(src)) {
      console.error(
        `ERROR: referenced stylesheet ${href} is missing from ${DIST_DIR}/.`,
      );
      process.exit(1);
    }
    const dest = join(BASELINE_DIR, href.replace(/^\//, ""));
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
    console.log(`✅ captured ${href}`);
  }

  const manifest: Manifest = {
    capturedAt: new Date().toISOString(),
    gitSha: currentGitSha(),
    // Always false: the guard above exits before reaching here on a dirty
    // tree. The field records that the check ran and passed — a `true` in a
    // manifest could only come from hand-editing it.
    gitDirty: hasTrackedModifications(),
    routes: routes.map((r) => r.route),
    guardRoutes: guardRoutes.map((r) => r.route),
    stylesheets: [...stylesheets.values()],
  };
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `\n${routes.length} route(s), ${guardRoutes.length} kitaru guard route(s) and ${stylesheets.size} stylesheet(s) captured to ${BASELINE_DIR}/ (manifest: ${MANIFEST_PATH}).`,
  );
}

/**
 * Compares the CSS bundles the 28 routes link, by base name (the hash moves
 * with content, so the name is the identity and the content is the check).
 * Reported separately from route parity: a `global` bundle change is a
 * site-wide edit to explain, not one of the 28 routes regressing.
 * Returns the number of failing bundles.
 */
function compareStylesheets(routes: Route[]): number {
  const baseline = collectStylesheets(BASELINE_DIR, routes);
  const actual = collectStylesheets(DIST_DIR, routes);
  const names = [...new Set([...baseline.keys(), ...actual.keys()])].sort();

  let failed = 0;
  console.log("\nStylesheets referenced by these routes:");
  for (const name of names) {
    const bHref = baseline.get(name);
    const aHref = actual.get(name);
    if (!bHref || !aHref) {
      console.log(
        `❌ ${name}.css: ${bHref ? "no longer referenced" : "newly referenced"} (baseline: ${bHref ?? "—"}, now: ${aHref ?? "—"})`,
      );
      failed += 1;
      continue;
    }
    const bPath = join(BASELINE_DIR, bHref.replace(/^\//, ""));
    const aPath = join(DIST_DIR, aHref.replace(/^\//, ""));
    if (!existsSync(bPath) || !existsSync(aPath)) {
      console.log(
        `❌ ${name}.css: missing file (baseline copy: ${existsSync(bPath)}, dist: ${existsSync(aPath)})`,
      );
      failed += 1;
      continue;
    }
    const b = readFileSync(bPath, "utf8");
    const a = readFileSync(aPath, "utf8");
    if (b === a) {
      console.log(`✅ ${name}.css (${a.length} bytes, unchanged)`);
      continue;
    }
    failed += 1;
    console.log(
      `❌ ${name}.css: content changed (${b.length} → ${a.length} bytes)`,
    );
    printFirstDifference(b.replace(/}/g, "}\n"), a.replace(/}/g, "}\n"));
  }
  return failed;
}

function runCompare() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error(
      `ERROR: no baseline at ${BASELINE_DIR}/ — run --capture first.`,
    );
    process.exit(1);
  }
  if (!existsSync(DIST_DIR)) {
    console.error(
      `ERROR: ${DIST_DIR}/ is missing. Run \`pnpm build\` before comparing.`,
    );
    process.exit(1);
  }

  const manifest: Manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  console.log(
    `Baseline captured ${manifest.capturedAt} at ${manifest.gitSha.slice(0, 7)}.\n`,
  );

  let routes: Route[];
  try {
    routes = deriveRoutes();
  } catch (error) {
    console.error(`ERROR: ${(error as Error).message}`);
    process.exit(1);
  }

  const tally = compareRouteSet(routes);
  const guard = compareRouteSet(
    deriveGuardRoutes(),
    "\nKitaru guard routes (must be untouched — same dispatcher, same bundle):",
  );
  const styleFailures = compareStylesheets(routes);

  console.log(
    `\n${tally.passed} passed, ${tally.failed} failed, ${tally.skipped} skipped-missing (of ${routes.length} routes); ` +
      `${guard.passed}/${guard.passed + guard.failed + guard.skipped} kitaru guard routes unchanged; ` +
      `${styleFailures} stylesheet(s) changed.`,
  );
  const bad =
    tally.failed + tally.skipped + guard.failed + guard.skipped + styleFailures;
  if (bad > 0) process.exit(1);
}

/** Byte-compares one set of routes, printing a mark per route. */
function compareRouteSet(
  routes: Route[],
  heading?: string,
): { passed: number; failed: number; skipped: number } {
  if (heading) console.log(heading);
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const r of routes) {
    const baselinePath = join(BASELINE_DIR, r.route);
    const distPath = join(DIST_DIR, r.route);

    if (!existsSync(baselinePath)) {
      console.log(`❌ ${r.route}: no baseline copy (re-run --capture)`);
      failed += 1;
      continue;
    }
    if (!existsSync(distPath)) {
      console.log(`↷ ${r.route}: skipped-missing (not in ${DIST_DIR}/)`);
      skipped += 1;
      continue;
    }

    const baseline = normaliseForCompare(readFileSync(baselinePath, "utf8"));
    const actual = normaliseForCompare(readFileSync(distPath, "utf8"));

    if (baseline === actual) {
      console.log(`✅ ${r.route}`);
      passed += 1;
      continue;
    }

    const classification = classifyFailure(baseline, actual);
    console.log(`❌ ${r.route}: FAIL (${classification})`);
    printFirstDifference(baseline, actual);
    failed += 1;
  }
  return { passed, failed, skipped };
}

function runDiff(routeArg: string | undefined) {
  if (!routeArg) {
    console.error(
      "ERROR: --diff requires a route, e.g. --diff compare/zenml-vs-mlflow.html",
    );
    process.exit(1);
  }
  if (!existsSync(MANIFEST_PATH)) {
    console.error(
      `ERROR: no baseline at ${BASELINE_DIR}/ — run --capture first.`,
    );
    process.exit(1);
  }
  if (!existsSync(DIST_DIR)) {
    console.error(
      `ERROR: ${DIST_DIR}/ is missing. Run \`pnpm build\` before --diff.`,
    );
    process.exit(1);
  }

  let routes: Route[];
  try {
    routes = deriveRoutes();
  } catch (error) {
    console.error(`ERROR: ${(error as Error).message}`);
    process.exit(1);
  }

  const route = routes.find((r) => r.route === routeArg || r.slug === routeArg);
  if (!route) {
    console.error(
      `ERROR: "${routeArg}" doesn't match any of the ${routes.length} known routes. ` +
        'Pass either the full route (e.g. "compare/zenml-vs-mlflow.html") or the slug (e.g. "zenml-vs-mlflow").',
    );
    process.exit(1);
  }

  const baselinePath = join(BASELINE_DIR, route.route);
  const distPath = join(DIST_DIR, route.route);
  if (!existsSync(baselinePath) || !existsSync(distPath)) {
    console.error(
      `ERROR: missing file for ${route.route} (baseline: ${existsSync(baselinePath)}, dist: ${existsSync(distPath)}).`,
    );
    process.exit(1);
  }

  const baseline = normaliseForCompare(readFileSync(baselinePath, "utf8"));
  const actual = normaliseForCompare(readFileSync(distPath, "utf8"));

  const diffDir = join(CACHE_DIR, "diff");
  mkdirSync(diffDir, { recursive: true });
  const baselineOut = join(diffDir, `${route.slug}-baseline.html`);
  const actualOut = join(diffDir, `${route.slug}-actual.html`);
  writeFileSync(baselineOut, baseline);
  writeFileSync(actualOut, actual);

  const result = spawnSync("diff", ["-u", baselineOut, actualOut], {
    stdio: "inherit",
  });
  if (result.error) {
    console.log(
      `(no \`diff\` on PATH) compare manually: ${baselineOut} ${actualOut}`,
    );
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    runCompare();
  } else if (args[0] === "--capture") {
    runCapture();
  } else if (args[0] === "--diff") {
    runDiff(args[1]);
  } else {
    console.error(
      "Usage: pnpm exec tsx scripts/migrations/compare-blocks/parity.ts [--capture | --diff <route>]",
    );
    process.exit(1);
  }
}

main();
