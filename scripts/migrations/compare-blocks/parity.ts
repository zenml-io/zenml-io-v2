/**
 * parity.ts — PR3 comparison-consolidation parity instrument.
 *
 * The 28 ZenML comparison routes (25 `/compare/zenml-vs-*` + 3 `/vs/*`) must
 * render byte-identical after the templates behind them are consolidated.
 * This script builds two immutable git refs in isolated worktrees, captures
 * their raw built HTML, then byte-compares the two captures under
 * normalisation, and classifies any failure so a byte diff caused by moved
 * component files (Astro scoping artefacts) doesn't read the same as a real
 * content regression.
 *
 * Route list: derived, per captured ref, from that ref's own
 * `src/content/compare/*.md` and `src/content/vs-pages/*.md` via each
 * file's frontmatter `slug` field (not the filename — the live templates key
 * off `item.data.slug`), filtered with `!draft` (the live templates'
 * predicate). Expected count is exactly 28; a different count is a hard
 * failure, because it means the route list itself has drifted and nothing
 * downstream can be trusted.
 *
 * Modes:
 *   --prepare <ref> [--rebuild]
 *                     Resolve <ref> to a full commit SHA, build it in an
 *                     isolated detached worktree, and capture its 28 routes,
 *                     the 10 kitaru guard routes, and the CSS bundles they
 *                     reference into .cache/compare-parity/captures/<sha>/.
 *                     A capture is keyed by that immutable SHA: re-running
 *                     --prepare with a ref that resolves to a SHA already
 *                     captured just reuses it (prints where from) unless
 *                     --rebuild is passed. See "Why a build-from-ref
 *                     capture" below for what this replaces and why.
 *   --base <ref> --candidate <ref>
 *                     Compare two prepared captures. Both flags are
 *                     required and must resolve to different SHAs — refuses
 *                     if they match, since a build compared with itself
 *                     proves nothing. Refuses if either SHA has no capture
 *                     (run --prepare for it first). Normalises both sides
 *                     with the imported `normaliseSnapshot` (the same
 *                     normaliser `pnpm smoke:dist` uses — see below).
 *   --diff <route> --base <ref> --candidate <ref>
 *                     Write the two normalised, blog-rail-excised versions
 *                     of one route (from the base and candidate captures) to
 *                     temp files and shell out to `diff -u` so a human can
 *                     read the full diff.
 *
 * Why a build-from-ref capture (not a --capture-whatever-dist-exists mode):
 * an earlier version of this script had a `--capture` mode that copied
 * whichever gitignored dist/client happened to be on disk, and a compare
 * mode that only printed the git SHA recorded alongside it — it never
 * proved either output was actually built from that SHA. Stale output, or a
 * candidate build compared with itself, could produce a fully green run.
 * `--prepare <ref>` closes that: it resolves the ref itself, builds it in a
 * worktree pinned to that exact commit, re-verifies the worktree's HEAD and
 * working-tree cleanliness both before and after the build, and only then
 * captures — so a capture's manifest SHA is a claim this script checked,
 * not one it trusted. Compare mode requires two such captures by SHA and
 * refuses a self-comparison. This also means the route list itself is
 * derived from each ref's own content at that ref, not from whatever the
 * current checkout happens to have. The manifest also records a sha256 per
 * captured file, and every compare re-hashes them first, so a capture that
 * was edited or lost a file after --prepare fails by name rather than
 * standing in for the build it no longer matches.
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
 * one of those rules outside the gate, and a restyle would pass green. Each
 * capture therefore also stores every `/_astro/*.css` bundle the 28 parity
 * routes AND the 10 kitaru guard routes reference — including bundles only
 * a guard route links (e.g. `ComparisonCta.<hash>.css`, a per-page
 * `kitaru-vs-<slug>.<hash>.css`) — and compare mode diffs them by base name
 * (the hash moves with content, so the name is the identity and the content
 * is the check). This is reported in two sections: the 28 parity routes'
 * bundles under "Stylesheets referenced by these routes", the 10 guard
 * routes' bundles under their own "Kitaru guard stylesheets" heading, keyed
 * `guard:<base name>` so a guard-only bundle can never collide with a
 * `compare:`/`vs:` key even when it's the very same shared file. A
 * `global.css` change is a site-wide edit to explain, not one of the 28
 * routes (or the 10 guard routes) regressing. The `_slug_` bundle is the
 * one exception in both sections — see "The accepted /vs delta" below for
 * why it is exempted from the byte compare and checked a different way
 * instead.
 *
 * The accepted /vs delta (finding 2 of PR #284's review): giving /compare/*
 * and /vs/* one shared template made Vite move 20 cid-scoped rules out of
 * the shared compare:_slug_.css bundle and into an inline `<style>` block
 * on every page that uses them, IN THE COMMIT THAT PERFORMED THAT MOVE.
 * `/compare/*` pages already linked that bundle, so this nets to zero
 * there; `/vs/*` pages never did, so a comparison spanning the move gives
 * them 20 rules they didn't render before. That is a real, accepted change
 * for that comparison — not something normaliseSnapshot or the blog-rail
 * excision can wave through — but it is only a relocation when the base
 * and candidate's compare:_slug_.css bundles actually differ. Comparing
 * two refs that are both already past the move (e.g. two later points on
 * main) sees an identical bundle on both sides: there is nothing left to
 * relocate, so /vs/* must match base exactly, same as /compare/*.
 * checkRouteCss therefore selects one of two regimes per run — printed at
 * the top of compare mode's output, before either regime's checks run:
 *
 *   - "identical": the base and candidate compare:_slug_.css rule
 *     multisets are the same. verifyAcceptedRulesAreRelocated() is
 *     skipped (there is nothing to verify was relocated), and /vs/*
 *     routes must equal base's CSS rule multiset exactly — no rule added,
 *     none removed — exactly like /compare/*.
 *   - "relocation": the two bundles differ. Today's original behaviour,
 *     unchanged, applies:
 *
 *   - CSS is tokenized into individual rules (tokenizeCssRules — a container
 *     at-rule like @media, @supports, @layer or a container query is
 *     unwrapped so its
 *     inner rules are checked individually; @keyframes and other leaf
 *     at-rules are kept whole) and diffed as a MULTISET per route, combining
 *     each page's own inline `<style>` blocks with every `/_astro/*.css`
 *     bundle it references (checkRouteCss). `/compare/*` routes (and the
 *     kitaru guard routes, which share the same dispatcher) must match the
 *     base multiset exactly in either regime. In the "relocation" regime,
 *     `/vs/*` routes must match base plus EXACTLY the 20 rules in
 *     ACCEPTED_VS_EXTRA_RULES — each identified by a stable fingerprint
 *     (selector + sha1 of the whole normalised rule), not by text, so
 *     incidental whitespace changes can't widen the allowance.
 *   - verifyAcceptedRulesAreRelocated() additionally requires every one of
 *     those 20 sha1s to already exist, verbatim, in the BASE build's
 *     compare:_slug_.css bundle — the check that makes this a RELOCATION
 *     allowance (these rules already rendered somewhere) rather than a
 *     standing exemption for "20 new rules, whatever they are." It only
 *     runs in the "relocation" regime.
 *
 * In either regime, a rule may never simply disappear from a `/vs/*`
 * route. Once a route's CSS passes, its `<style>` blocks are stripped from
 * both sides (that content was already judged above) and the CookieConsent
 * uid is reconciled (see below) before the existing byte compare runs on
 * what's left — so nothing about the accepted delta escapes the gate
 * unverified, it's just verified as rules and one attribute instead of
 * as bytes in place.
 *
 * Re-deriving ACCEPTED_VS_EXTRA_RULES after a deliberate change: run
 * `--base <old-ref> --candidate <new-ref>` where <new-ref> is the commit
 * that performs the move (so the two compare:_slug_.css bundles actually
 * differ and the "relocation" regime applies — comparing two refs on the
 * same side of the move reports "identical" and skips this check). Any
 * unexpected addition on a `/vs/*` route is printed as a ready-to-paste
 * `{ selector, sha1 }` entry — copy those into the constant. If the
 * relocation source ever isn't compare:_slug_.css any more,
 * `verifyAcceptedRulesAreRelocated` names the bundle it looked in and
 * needs its lookup key ("compare:_slug_") updated too.
 *
 * Kitaru guard set: `src/pages/compare/[slug].astro` emits the 10
 * `kitaru-vs-*` routes from the SAME dispatcher as the 25 `zenml-vs-*` ones,
 * and they share the same CSS bundle — so a change to the dispatcher or to a
 * shared component could regress them while all 28 parity routes stay
 * green. The ruling for this wave is that those pages are untouched;
 * comparing them is the cheapest proof, so they are captured and compared
 * as a separate guard set, reported under its own heading and counted
 * separately from the 28. They are NOT part of the parity set and no
 * ruling about them changes.
 *
 * The guard set is also asserted, not just compared: EXPECTED_GUARD_ROUTE_
 * COUNT (10) is checked against the base manifest, the candidate manifest,
 * AND a live re-derivation from each worktree's own content — all four must
 * agree on the same 10 routes, by name, or compare mode refuses to run.
 * Deriving only from "whatever the dispatcher currently emits" would let a
 * removed or drafted route silently turn 10/10 green into 9/9 green. That
 * live re-derivation first checks the worktree still exists — a pruned
 * worktree fails by a named error, not a raw ENOENT — then re-verifies its
 * HEAD and cleanliness against the SHA the capture claims, so a worktree
 * whose HEAD moved since --prepare fails loudly instead of silently
 * re-deriving from the wrong content.
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
 * Known non-determinism: the `astro-island` `uid` attribute is derived from
 * island props/content, so it is identical across a capture/compare pair
 * unless an island's own content changed — which the CSS relocation above
 * does, for the CookieConsent island's compiled bundle. That one shift is
 * the second half of the accepted /vs delta: reconcileCookieConsentUid()
 * checks every astro-island tag by position, and allows AT MOST ONE to
 * differ, ONLY if it's the CookieConsent island (matched by `component-url`,
 * not `uid`) and ONLY if `uid` is the sole differing attribute; that one
 * uid is then replaced with a stable placeholder on both sides before the
 * byte compare runs. A second island's uid moving, a non-uid attribute
 * differing, or a differing island that isn't CookieConsent all fail here,
 * with the offending tag(s) printed — this is not a blanket "uid attributes
 * don't count" exemption. There are no per-request nonces on these pages;
 * Pagefind's index glob is `*ops-database/*.html`, so these routes carry no
 * `data-pagefind-*` attributes to begin with. The footer's
 * `new Date().getFullYear()` is the only date on the page — it is real,
 * checked content, not noise.
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
 *   pnpm exec tsx scripts/migrations/compare-blocks/parity.ts \
 *     --prepare 214008c3e60ffe6891b8eb2d4c5af178aaca602c
 *   pnpm exec tsx scripts/migrations/compare-blocks/parity.ts \
 *     --prepare dbdfa2f774441db8c2c2cd9c5a0fb849d25f93e1
 *   pnpm exec tsx scripts/migrations/compare-blocks/parity.ts \
 *     --base 214008c3e60ffe6891b8eb2d4c5af178aaca602c \
 *     --candidate dbdfa2f774441db8c2c2cd9c5a0fb849d25f93e1
 *   pnpm exec tsx scripts/migrations/compare-blocks/parity.ts \
 *     --diff compare/zenml-vs-mlflow.html \
 *     --base <ref> --candidate <ref>
 */

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
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

const COMPARE_SUBDIR = "src/content/compare";
const VS_SUBDIR = "src/content/vs-pages";
const KITARU_SUBDIR = "src/content/compare-kitaru";
const DIST_SUBDIR = "dist/client";
const CACHE_DIR = ".cache/compare-parity";
const WORKTREES_DIR = join(CACHE_DIR, "worktrees");
const CAPTURES_DIR = join(CACHE_DIR, "captures");
const EXPECTED_ROUTE_COUNT = 28;
const EXPECTED_GUARD_ROUTE_COUNT = 10;

interface Route {
  /**
   * Relative path under dist/client (and under a capture dir), e.g.
   * "compare/zenml-vs-mlflow.html".
   */
  route: string;
  slug: string;
  kind: "compare" | "vs";
}

interface Manifest {
  sha: string;
  /**
   * The ref as typed on the command line (e.g. "main", a tag, or the SHA
   * itself).
   */
  ref: string;
  builtAt: string;
  worktreePath: string;
  /**
   * Worktree HEAD re-read after the build, to prove the build didn't move it.
   */
  headAfterBuild: string;
  routes: string[];
  guardRoutes: string[];
  stylesheets: string[];
  /**
   * sha256 of every captured file, keyed by its path under the capture dir.
   * Written at --prepare from the freshly built dist and re-verified by
   * every compare, so a capture edited after the fact (or a file that went
   * missing) fails by name instead of silently standing in for the build.
   */
  files: Record<string, string>;
}

// --- git / worktree plumbing -------------------------------------------------

/**
 * Runs a git command, or exits. Every caller below is load-bearing for
 * whether a capture means anything, so a git that is missing, or that exits
 * non-zero, must stop the run rather than resolve to "" and read as success.
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
        "Parity depends on git to prove what was built — refusing to continue.",
    );
    process.exit(1);
  }
  return result.stdout;
}

/** Resolves a ref to a full commit SHA, exiting if it doesn't resolve. */
function resolveSha(ref: string): string {
  return git(["rev-parse", "--verify", `${ref}^{commit}`]).trim();
}

/**
 * Runs a build-step command with inherited stdio inside a worktree, or exits on
 * failure.
 */
function runInWorktree(cmd: string, args: string[], cwd: string) {
  const result = spawnSync(cmd, args, { cwd, stdio: "inherit" });
  if (result.error || result.status !== 0) {
    console.error(
      `ERROR: \`${cmd} ${args.join(" ")}\` failed in ${cwd} ` +
        `(${result.error?.message ?? `exit ${result.status}`}).`,
    );
    process.exit(1);
  }
}

/**
 * Confirms a worktree's HEAD matches the pinned SHA and its tree is clean.
 * Called before AND after the build: a build script that checks out a
 * different ref, or leaves tracked modifications, must not silently pass
 * its output off as "built from <sha>".
 */
function verifyWorktree(path: string, sha: string, when: string): string {
  const head = git(["-C", path, "rev-parse", "HEAD"]).trim();
  if (head !== sha) {
    console.error(
      `ERROR: worktree at ${path} has HEAD ${head}, expected ${sha} (${when}).`,
    );
    process.exit(1);
  }
  const status = git(["-C", path, "status", "--porcelain"]).trim();
  if (status.length > 0) {
    console.error(
      `ERROR: worktree at ${path} is not clean (${when}):\n${status}`,
    );
    process.exit(1);
  }
  return head;
}

// --- Route derivation ---------------------------------------------------------

/**
 * Reads every content file in a dir and returns its frontmatter data, sorted by
 * filename for determinism.
 */
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
 * Derives the 28 routes from a given checkout's content frontmatter (slug
 * field, not filename — the live route templates key off `item.data.slug`).
 * `rootDir` is the checkout root (a worktree, not necessarily the current
 * one), so the route list reflects the content AT the SHA that checkout is
 * pinned to. Throws if the count isn't exactly 28: every mode must hard-fail
 * on that, since a drifted route list means nothing downstream can be
 * trusted.
 */
function deriveRoutes(rootDir: string): Route[] {
  const compareRoutes: Route[] = readFrontmatterEntries(
    join(rootDir, COMPARE_SUBDIR),
  )
    .filter(({ data }) => !data.draft)
    .map(({ data }) => ({
      route: `compare/${data.slug}.html`,
      slug: String(data.slug),
      kind: "compare",
    }));

  const vsRoutes: Route[] = readFrontmatterEntries(join(rootDir, VS_SUBDIR))
    .filter(({ data }) => !data.draft)
    .map(({ data }) => ({
      route: `vs/${data.slug}.html`,
      slug: String(data.slug),
      kind: "vs",
    }));

  const routes = [...compareRoutes, ...vsRoutes];
  if (routes.length !== EXPECTED_ROUTE_COUNT) {
    throw new Error(
      `expected ${EXPECTED_ROUTE_COUNT} routes (25 compare + 3 vs) in ${rootDir}, ` +
        `found ${routes.length} (${compareRoutes.length} compare + ${vsRoutes.length} vs). ` +
        "The route list has drifted — fix the content collections or this " +
        "derivation before trusting anything else this script reports.",
    );
  }
  return routes;
}

/**
 * The 10 `kitaru-vs-*` routes for a given checkout. They are NOT part of the
 * 28-route parity set, but `src/pages/compare/[slug].astro` emits them from
 * the same dispatcher and they share the same `_slug_.css` bundle, so a
 * change to the dispatcher or to a shared component can regress them while
 * all 28 stay green. The ruling for this wave is that they are untouched;
 * comparing them is the cheapest proof of that, so they are captured and
 * compared as a separate guard set.
 *
 * They key off the entry id (filename), not a frontmatter `slug` — these
 * entries have no `slug` field and the dispatcher routes them by `e.id`.
 */
function deriveGuardRoutes(rootDir: string): Route[] {
  return readFrontmatterEntries(join(rootDir, KITARU_SUBDIR), ".mdx")
    .filter(({ data }) => !data.draft)
    .map(({ file }) => ({
      route: `compare/${file.replace(/\.mdx$/, "")}.html`,
      slug: file.replace(/\.mdx$/, ""),
      kind: "compare" as const,
    }));
}

/**
 * Route path → its Route.kind, from the path prefix alone (used once a
 * route is just a captured string).
 */
function routeKind(route: string): "compare" | "vs" {
  return route.startsWith("vs/") ? "vs" : "compare";
}

/**
 * Rehydrates plain route-path strings (as stored in a manifest) into Route
 * objects for stylesheet collection.
 */
function toRouteObjs(routes: string[]): Route[] {
  return routes.map((route) => ({
    route,
    slug: route.replace(/^(compare|vs)\//, "").replace(/\.html$/, ""),
    kind: routeKind(route),
  }));
}

/** Sorted union of two route-path lists, de-duplicated. */
function unionRoutes(a: string[], b: string[]): string[] {
  return [...new Set([...a, ...b])].sort();
}

// --- Stylesheet parity --------------------------------------------------------

const STYLESHEET_HREF_RE = /\/_astro\/[^"'\s]+?\.css/g;
/**
 * `/_astro/_slug_.Bwq-O1lr.css` → `_slug_` — the hash moves with content,
 * the base name identifies the bundle.
 */
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
 * compare bundle against a new vs bundle. `keyKind`, when passed, overrides
 * `r.kind` for every route in this call — used to key the 10 kitaru guard
 * routes' bundles under `guard:` instead of `compare:`, so a guard-only
 * bundle can never collide with (or be shadowed by) a real parity-route key,
 * even when the underlying file is the very same shared `_slug_` bundle.
 */
function collectStylesheets(
  dir: string,
  routes: Route[],
  keyKind?: string,
): Map<string, string> {
  const byKey = new Map<string, string>();
  for (const r of routes) {
    const p = join(dir, r.route);
    if (!existsSync(p)) continue;
    for (const href of referencedStylesheets(readFileSync(p, "utf8"))) {
      byKey.set(`${keyKind ?? r.kind}:${stylesheetBaseName(href)}`, href);
    }
  }
  return byKey;
}

// --- CSS rule accounting (finding 2: the accepted /vs delta) ---------------
//
// The consolidation makes /compare/* and /vs/* share one template, and Vite
// responded by moving 20 cid-scoped rules out of the shared compare:_slug_
// bundle and inlining them on every page that uses them — /compare/* pages
// net zero (the rules were already reachable there via the bundle), /vs/*
// pages net +20 (they never linked that bundle, so the rules are new to
// them). A plain byte compare of the HTML or the bundle can't tell that
// apart from a real regression, so instead this section tokenizes CSS into
// individual rules and diffs the two sides as a multiset: same rule text in
// a different place is a no-op, a genuinely new or missing rule is not.
//
// No dependency is added for this (postcss is not hoisted in
// node_modules) — the tokenizer below only has to handle what these
// bundles/inline blocks actually contain: plain rules, @media/@supports
// (and Tailwind v4's @layer and container-query blocks), and @keyframes.
//
// The names are written WITHOUT their "@" and joined below on purpose:
// Tailwind v4 scans every non-ignored file in the repo (this script
// included) for utility candidates, and the container-query at-rule's
// name is also a Tailwind utility, so spelling it out here as a literal
// added that utility to the site's global.css and failed the very parity
// run this script performs.
const CSS_CONTAINER_AT_RULE_NAMES = [
  "media",
  "supports",
  "layer",
  "container",
  "document",
  "-moz-document",
];
const CSS_CONTAINER_AT_RULE_PREFIXES = CSS_CONTAINER_AT_RULE_NAMES.map(
  (name) => `@${name}`,
);

function stripCssComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function normaliseCssWhitespace(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

/**
 * Tokenizes CSS text into a flat array of top-level rule keys. A "rule" is a
 * selector (or at-rule prelude) plus its declaration block, whitespace-
 * normalised — a multi-selector rule (`th,td{...}`) is kept as one rule, not
 * split apart. Container at-rules (@media, @supports, @layer, the
 * container-query at-rule, @document — Tailwind v4 nests almost everything
 * in @layer) are unwrapped:
 * each inner rule becomes its own entry, keyed with the container's
 * normalised prelude prefixed on, so a declaration moving in or out of a
 * @media block (or one @layer deeper) is a real identity change, not
 * something hidden inside an opaque block compare. Any other at-rule
 * (@keyframes, @font-face, @page, …) is kept as ONE rule, keyed by its full
 * name+body — @keyframes' steps are not diffed individually.
 */
function tokenizeCssRules(css: string, prefix = ""): string[] {
  const text = stripCssComments(css);
  const rules: string[] = [];
  let i = 0;
  while (i < text.length) {
    const brace = text.indexOf("{", i);
    if (brace === -1) break;
    const prelude = normaliseCssWhitespace(text.slice(i, brace));
    if (prelude === "") {
      i = brace + 1;
      continue;
    }
    let depth = 1;
    let j = brace + 1;
    while (j < text.length && depth > 0) {
      if (text[j] === "{") depth += 1;
      else if (text[j] === "}") depth -= 1;
      j += 1;
    }
    const body = text.slice(brace + 1, j - 1);
    const lower = prelude.toLowerCase();
    if (CSS_CONTAINER_AT_RULE_PREFIXES.some((p) => lower.startsWith(p))) {
      rules.push(...tokenizeCssRules(body, `${prefix}${prelude} `));
    } else {
      rules.push(`${prefix}${prelude}{${normaliseCssWhitespace(body)}}`);
    }
    i = j;
  }
  return rules;
}

function ruleMultiset(rules: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const r of rules) m.set(r, (m.get(r) ?? 0) + 1);
  return m;
}

function addIntoMultiset(into: Map<string, number>, from: Map<string, number>) {
  for (const [k, v] of from) into.set(k, (into.get(k) ?? 0) + v);
}

function multisetDiff(
  base: Map<string, number>,
  candidate: Map<string, number>,
): { added: Map<string, number>; removed: Map<string, number> } {
  const added = new Map<string, number>();
  const removed = new Map<string, number>();
  for (const key of new Set([...base.keys(), ...candidate.keys()])) {
    const b = base.get(key) ?? 0;
    const c = candidate.get(key) ?? 0;
    if (c > b) added.set(key, c - b);
    if (b > c) removed.set(key, b - c);
  }
  return { added, removed };
}

/**
 * A rule's stable identity for the accepted-list: its selector/prelude, plus a
 * sha1 of the whole normalised rule (selector + body).
 */
function ruleFingerprint(key: string): { selector: string; sha1: string } {
  const braceIndex = key.indexOf("{");
  const selector = braceIndex === -1 ? key : key.slice(0, braceIndex);
  return { selector, sha1: createHash("sha1").update(key).digest("hex") };
}

const bundleRuleMultisetCache = new Map<string, Map<string, number>>();

/**
 * Tokenizes one CSS bundle file's rules, cached by path — the same global.css
 * is read for every one of the 28+10 routes.
 */
function bundleRuleMultiset(path: string): Map<string, number> {
  const cached = bundleRuleMultisetCache.get(path);
  if (cached) return cached;
  const css = existsSync(path) ? readFileSync(path, "utf8") : "";
  const ms = ruleMultiset(tokenizeCssRules(css));
  bundleRuleMultisetCache.set(path, ms);
  return ms;
}

const INLINE_STYLE_CONTENT_RE = /<style[^>]*>([\s\S]*?)<\/style>/g;

function extractInlineStyleContents(html: string): string[] {
  return [...html.matchAll(INLINE_STYLE_CONTENT_RE)].map((m) => m[1]);
}

/**
 * The full CSS rule multiset a page renders with: its own inline `<style>`
 * blocks plus every `/_astro/*.css` bundle it links, resolved against `dir`
 * (a capture directory). A referenced bundle this script didn't capture
 * (the 10 kitaru guard routes link a couple of component-specific bundles
 * `--prepare` never collects, since it only scans the 28 parity routes —
 * see the docblock) contributes nothing on either side rather than erroring,
 * which is safe for a base/candidate DIFF (missing on both cancels out) but
 * means such a bundle's own content isn't independently verified here.
 */
function pageCssMultiset(dir: string, html: string): Map<string, number> {
  const result = ruleMultiset(
    tokenizeCssRules(extractInlineStyleContents(html).join("\n")),
  );
  for (const href of referencedStylesheets(html)) {
    addIntoMultiset(
      result,
      bundleRuleMultiset(join(dir, href.replace(/^\//, ""))),
    );
  }
  return result;
}

/**
 * The 20 rules PR #284 documents as relocated from the shared
 * compare:_slug_.css bundle into an inline `<style>` block, allowed to
 * appear as CSS additions on `/vs/*` pages ONLY (see checkRouteCss). Each
 * entry is a stable fingerprint (selector + sha1 of the whole normalised
 * rule), not the rule text itself, so this list stays readable and so a
 * change to unrelated whitespace can't accidentally widen the allowance.
 *
 * verifyAcceptedRulesAreRelocated() additionally checks, on every compare
 * run, that all 20 sha1s are present verbatim in the BASE build's shared
 * compare:_slug_.css bundle — that's the assertion that makes this a
 * relocation allowance and not a blank check for "20 new rules, no matter
 * what they say."
 *
 * To re-derive this list after a deliberate change (e.g. more rules move,
 * or the components' cid hashes change on a rebuild): run
 *   --base <old-ref> --candidate <new-ref>
 * A `/vs/*` route with unexpected additions prints each culprit as a
 * ready-to-paste `{ selector, sha1 }` entry — paste those in below.
 */
const ACCEPTED_VS_EXTRA_RULES: Array<{ selector: string; sha1: string }> = [
  {
    selector: ".code-comparison-block[data-astro-cid-eyb4uqyo] code",
    sha1: "5186889fbba6215e3e78d36002848a51bec42351",
  },
  {
    selector: ".code-comparison-block[data-astro-cid-eyb4uqyo] pre",
    sha1: "23ef69472c3069c018b6df041adb1a12d6d9fbfa",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] .icon",
    sha1: "a61aafc092831b6bef0dca5758138c67ef2e8922",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] .no",
    sha1: "b3f821605f402ab15d4e34a6b6815a2b4cce6b86",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] .tooltip .tooltiptext",
    sha1: "5652e41c3a8d5089799a9e7d009f5a0810215f51",
  },
  {
    selector:
      ".compare-table[data-astro-cid-tzmzurqp] .tooltip:hover .tooltiptext",
    sha1: "55b1f9f3d72b3444afe3e7e3bb2d69d1bbfdc59e",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] .tooltip",
    sha1: "429a8d79c2f360bd924a6347dcee18c4fc50060b",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] .yes",
    sha1: "c6420363c8e64365837aa499d25a3bbc420cd6dc",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] [data-rt-embed-type]",
    sha1: "4b503bca9b4f908f77e209eef2e2c0b36b1ae0c8",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] table",
    sha1: "7d180d82ec8a83995834b3c03146320d66db3733",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] tbody tr td:first-child",
    sha1: "b3efed619c942fa6ef1f3e70e6f12b346e9713b9",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] tbody tr td:last-child",
    sha1: "1768a0eef94e78b89b79c39a432dd7552b27fcd5",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] tbody tr td",
    sha1: "a58744c0fcb872fb9fa1171fab84654e645f09f5",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] tbody tr:nth-child(2n)",
    sha1: "705b7f416708c11d41848a77958e4bf1d55d828d",
  },
  {
    selector: ".compare-table[data-astro-cid-tzmzurqp] tbody tr:nth-child(odd)",
    sha1: "fafb69b95e179c1a90030a36babe9d04c0672db0",
  },
  {
    selector:
      ".compare-table[data-astro-cid-tzmzurqp] th,.compare-table[data-astro-cid-tzmzurqp] td",
    sha1: "03bc7f751bb859ea598438c1ae9ee2e773c4e84b",
  },
  {
    selector: ".fade-in-element[data-astro-cid-eyb4uqyo].is-visible",
    sha1: "d26cb3fc481f74929f434e059d58d1331875850b",
  },
  {
    selector: ".fade-in-element[data-astro-cid-eyb4uqyo]",
    sha1: "2915ed55d629adb01e46ef5b9baa3f997e067b11",
  },
  {
    selector:
      ".strategy-cta-section[data-astro-cid-t6knrzod] .fade-in-element[data-astro-cid-t6knrzod].is-visible",
    sha1: "c21d3b83d8568e95fc668c9666363c3c9a89b005",
  },
  {
    selector:
      ".strategy-cta-section[data-astro-cid-t6knrzod] .fade-in-element[data-astro-cid-t6knrzod]",
    sha1: "dc4c6eb57e9a6f95d67b24e2a2889e8f5847e9a8",
  },
];

interface CssCheckResult {
  ok: boolean;
  message?: string;
}

function formatRuleList(label: string, rules: Map<string, number>): string[] {
  const lines = [`      ${label}:`];
  for (const [key, count] of rules) {
    lines.push(`        x${count}  ${truncate(key)}`);
  }
  return lines;
}

/**
 * Which of the two "accepted /vs delta" regimes this comparison is in (see
 * the docblock's "The accepted /vs delta" section): "identical" when the
 * base and candidate's compare:_slug_.css rule multisets match (no
 * relocation happened for this pair), "relocation" when they differ.
 * Computed once per run by slugBundlesIdentical() and threaded through
 * checkRouteCss so every route is judged under the same regime.
 */
type VsRegime = "identical" | "relocation";

/**
 * Finding 2: asserts the CSS rule multiset a route's kind allows.
 * `/compare/*` (and the kitaru guard routes, which share the dispatcher):
 * candidate must equal base exactly — nothing added, nothing removed, in
 * either regime.
 * `/vs/*`: when `vsRegime` is "identical", the same rule applies — nothing
 * added, nothing removed. When `vsRegime` is "relocation", candidate must
 * equal base PLUS exactly ACCEPTED_VS_EXTRA_RULES (one each), never more,
 * never fewer, never a different rule under the same count.
 */
function checkRouteCss(
  kind: "compare" | "vs",
  baseDir: string,
  candidateDir: string,
  baseHtml: string,
  candidateHtml: string,
  vsRegime: VsRegime,
): CssCheckResult {
  const baseMs = pageCssMultiset(baseDir, baseHtml);
  const candidateMs = pageCssMultiset(candidateDir, candidateHtml);
  const { added, removed } = multisetDiff(baseMs, candidateMs);

  if (kind === "compare") {
    if (added.size === 0 && removed.size === 0) return { ok: true };
    const lines = [
      "      CSS rule multiset changed (compare routes must match exactly):",
    ];
    if (added.size > 0) lines.push(...formatRuleList("added", added));
    if (removed.size > 0) lines.push(...formatRuleList("removed", removed));
    return { ok: false, message: lines.join("\n") };
  }

  // kind === "vs": no rule may ever simply disappear, in either regime.
  if (removed.size > 0) {
    return {
      ok: false,
      message: [
        "      CSS rule(s) disappeared on a vs route (not part of the accepted delta):",
        ...formatRuleList("removed", removed),
      ].join("\n"),
    };
  }

  if (vsRegime === "identical") {
    if (added.size === 0) return { ok: true };
    const lines = [
      "      CSS rule multiset changed (base and candidate's " +
        "compare:_slug_.css bundles are identical, so no relocation " +
        "applies here — this vs route must match base exactly):",
    ];
    lines.push(...formatRuleList("added", added));
    return { ok: false, message: lines.join("\n") };
  }

  // vsRegime === "relocation": every addition must be exactly one of
  // ACCEPTED_VS_EXTRA_RULES, exactly once.
  const acceptedBySha1 = new Map(
    ACCEPTED_VS_EXTRA_RULES.map((r) => [r.sha1, r]),
  );
  const seenSha1 = new Set<string>();
  const unexpected: Array<{ key: string; count: number }> = [];
  const wrongCount: Array<{ selector: string; sha1: string; count: number }> =
    [];

  for (const [key, count] of added) {
    const { selector, sha1 } = ruleFingerprint(key);
    const accepted = acceptedBySha1.get(sha1);
    if (!accepted) {
      unexpected.push({ key, count });
      continue;
    }
    seenSha1.add(sha1);
    if (count !== 1) wrongCount.push({ selector, sha1, count });
  }
  const missing = ACCEPTED_VS_EXTRA_RULES.filter((r) => !seenSha1.has(r.sha1));

  if (
    unexpected.length === 0 &&
    wrongCount.length === 0 &&
    missing.length === 0
  ) {
    return { ok: true };
  }

  const lines: string[] = [
    "      CSS rule multiset does not match base + ACCEPTED_VS_EXTRA_RULES:",
  ];
  if (unexpected.length > 0) {
    lines.push("      unexpected rule(s) (not in ACCEPTED_VS_EXTRA_RULES):");
    for (const u of unexpected) {
      const { selector, sha1 } = ruleFingerprint(u.key);
      lines.push(`        x${u.count}  ${truncate(u.key)}`);
      lines.push(
        `             paste to accept: { selector: ${JSON.stringify(selector)}, sha1: "${sha1}" },`,
      );
    }
  }
  if (wrongCount.length > 0) {
    lines.push("      accepted rule(s) with an unexpected count:");
    for (const w of wrongCount) {
      lines.push(
        `        ${w.selector} (sha1 ${w.sha1}): expected x1, found x${w.count}`,
      );
    }
  }
  if (missing.length > 0) {
    lines.push("      accepted rule(s) missing (expected, not found):");
    for (const m of missing)
      lines.push(`        ${m.selector} (sha1 ${m.sha1})`);
  }
  return { ok: false, message: lines.join("\n") };
}

/**
 * Whether the base and candidate's shared compare:_slug_.css bundles have
 * an identical CSS rule multiset. When they do, this comparison spans no
 * relocation — e.g. both refs are already past the consolidation — so the
 * "relocation" regime's 20-rule allowance doesn't apply and /vs/* routes
 * must match base exactly, same as /compare/*. Returns false (i.e. treats
 * it as "relocation", today's original behaviour) if either side has no
 * compare:_slug_ bundle at all.
 */
function slugBundlesIdentical(
  baseDir: string,
  candidateDir: string,
  baseRoutes: Route[],
  candidateRoutes: Route[],
): boolean {
  const baseHref = collectStylesheets(baseDir, baseRoutes).get(
    "compare:_slug_",
  );
  const candidateHref = collectStylesheets(candidateDir, candidateRoutes).get(
    "compare:_slug_",
  );
  if (!baseHref || !candidateHref) return false;
  const baseMs = bundleRuleMultiset(join(baseDir, baseHref.replace(/^\//, "")));
  const candidateMs = bundleRuleMultiset(
    join(candidateDir, candidateHref.replace(/^\//, "")),
  );
  const { added, removed } = multisetDiff(baseMs, candidateMs);
  return added.size === 0 && removed.size === 0;
}

/**
 * Finding 2's narrowing assertion: every ACCEPTED_VS_EXTRA_RULES sha1 must
 * be present, verbatim, in the BASE build's shared compare:_slug_.css
 * bundle. Without this, the accepted-rule list would just be a fixed
 * allowance for "20 new rules with these exact fingerprints, wherever they
 * came from" — checking against the base bundle is what makes it mean
 * "these rules already existed and only moved." Only called in the
 * "relocation" regime (see VsRegime) — in the "identical" regime there is
 * nothing to verify was relocated.
 */
function verifyAcceptedRulesAreRelocated(baseDir: string, base: Manifest) {
  const stylesheets = collectStylesheets(baseDir, toRouteObjs(base.routes));
  const slugHref = stylesheets.get("compare:_slug_");
  if (!slugHref) {
    console.error(
      "ERROR: base capture has no compare:_slug_ bundle. The accepted /vs " +
        "delta assumes ACCEPTED_VS_EXTRA_RULES lives in that shared " +
        "bundle at the base ref — re-derive the constant (see its " +
        "docblock) before trusting this comparison.",
    );
    process.exit(1);
  }
  const pool = bundleRuleMultiset(join(baseDir, slugHref.replace(/^\//, "")));
  const poolSha1 = new Set(
    [...pool.keys()].map((k) => ruleFingerprint(k).sha1),
  );
  const missing = ACCEPTED_VS_EXTRA_RULES.filter((r) => !poolSha1.has(r.sha1));
  if (missing.length > 0) {
    console.error(
      "ERROR: ACCEPTED_VS_EXTRA_RULES contains rule(s) not present " +
        `verbatim in the base build's ${slugHref} — the /vs allowance is ` +
        "no longer provably a relocation. Re-derive the constant (see " +
        "its docblock) before trusting this comparison:",
    );
    for (const m of missing)
      console.error(`   - ${m.selector} (sha1 ${m.sha1})`);
    process.exit(1);
  }
}

// --- CookieConsent astro-island uid reconciliation --------------------------

const ASTRO_ISLAND_TAG_RE = /<astro-island\b[^>]*>/g;

function extractAstroIslandTags(html: string): string[] {
  return html.match(ASTRO_ISLAND_TAG_RE) ?? [];
}

/**
 * Replaces exactly the `index`-th `<astro-island>` tag in `html` with
 * `replacement`, found by match position rather than by
 * `String.prototype.replace(searchTag, replacement)`. Two problems with
 * the latter: `replacement` is a string, so `$&`/`$'`/`` $` ``/`$1`
 * sequences inside it are interpreted as replacement patterns instead of
 * inserted literally; and `.replace` rewrites the FIRST textual occurrence
 * of `searchTag`, not necessarily the one at `index`, if the same tag text
 * happens to appear more than once. Splicing at the match's own offset
 * avoids both: the text is inserted verbatim and the correct occurrence is
 * the one rewritten.
 */
function replaceNthAstroIsland(
  html: string,
  index: number,
  replacement: string,
): string {
  const re = new RegExp(ASTRO_ISLAND_TAG_RE.source, ASTRO_ISLAND_TAG_RE.flags);
  const match = [...html.matchAll(re)][index];
  if (!match || match.index === undefined) {
    throw new Error(
      `replaceNthAstroIsland: no astro-island match at index ${index}`,
    );
  }
  return (
    html.slice(0, match.index) +
    replacement +
    html.slice(match.index + match[0].length)
  );
}

function islandAttr(tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

/**
 * Matched on `component-url` (which compiled component file backs the island),
 * not `uid` — `uid` is exactly the attribute expected to move.
 */
function isCookieConsentIsland(tag: string): boolean {
  return (islandAttr(tag, "component-url") ?? "").includes("/CookieConsent.");
}

function stripIslandUid(tag: string): string {
  return tag.replace(/\suid="[^"]*"/, "");
}

const UID_PLACEHOLDER = 'uid="[COOKIECONSENT-UID]"';

type UidReconcileResult =
  | {
      ok: true;
      base: string;
      candidate: string;
      shift?: { from: string; to: string };
    }
  | { ok: false; message: string };

/**
 * Finding 2's second accepted delta: the CookieConsent astro-island's `uid`
 * (derived from island props/content — see the docblock's "Known
 * non-determinism" note) shifts once the moved CSS changes what Vite bundles
 * around it. Compares every astro-island tag by position; if AT MOST ONE
 * differs, and that one differs ONLY in `uid`, and it's the CookieConsent
 * island, replaces that one uid with a stable placeholder on both sides so
 * the byte compare below doesn't trip on it. Anything else — a different
 * island's uid moving, more than one island differing, a non-uid attribute
 * differing, or the island counts themselves differing — fails here with the
 * offending tag(s) printed, not silently allowed through.
 */
function reconcileCookieConsentUid(
  baseHtml: string,
  candidateHtml: string,
): UidReconcileResult {
  const baseIslands = extractAstroIslandTags(baseHtml);
  const candidateIslands = extractAstroIslandTags(candidateHtml);

  if (baseIslands.length !== candidateIslands.length) {
    return {
      ok: false,
      message:
        `      astro-island count differs: base has ${baseIslands.length}, ` +
        `candidate has ${candidateIslands.length}.`,
    };
  }

  const diffIndices: number[] = [];
  for (let i = 0; i < baseIslands.length; i++) {
    if (baseIslands[i] !== candidateIslands[i]) diffIndices.push(i);
  }
  if (diffIndices.length === 0) {
    return { ok: true, base: baseHtml, candidate: candidateHtml };
  }
  if (diffIndices.length > 1) {
    return {
      ok: false,
      message:
        `      ${diffIndices.length} astro-island(s) differ (at most 1 is ` +
        `accepted, for CookieConsent's uid): ${diffIndices.map((i) => `#${i}`).join(", ")}`,
    };
  }

  const i = diffIndices[0];
  const baseTag = baseIslands[i];
  const candidateTag = candidateIslands[i];
  if (
    !isCookieConsentIsland(baseTag) ||
    stripIslandUid(baseTag) !== stripIslandUid(candidateTag)
  ) {
    return {
      ok: false,
      message:
        `      astro-island #${i} differs beyond the accepted CookieConsent ` +
        `uid shift:\n        base:      ${truncate(baseTag)}\n        candidate: ${truncate(candidateTag)}`,
    };
  }

  const from = islandAttr(baseTag, "uid") ?? "";
  const to = islandAttr(candidateTag, "uid") ?? "";
  const placeholderTag = (tag: string) =>
    stripIslandUid(tag).replace(
      "<astro-island",
      `<astro-island ${UID_PLACEHOLDER}`,
    );

  return {
    ok: true,
    base: replaceNthAstroIsland(baseHtml, i, placeholderTag(baseTag)),
    candidate: replaceNthAstroIsland(
      candidateHtml,
      i,
      placeholderTag(candidateTag),
    ),
    shift: from === to ? undefined : { from, to },
  };
}

function stripStyleBlocks(html: string): string {
  return html.replace(STYLE_BLOCK_RE, "");
}

interface RoutePairResult {
  base: string;
  candidate: string;
  cssMessage?: string;
  uidMessage?: string;
  uidShift?: { from: string; to: string };
}

/**
 * Prepares one route's two captures for the byte compare: checks the CSS
 * rule multiset (checkRouteCss), strips `<style>` blocks from both sides
 * (that content is judged by the CSS check, not by bytes), reconciles the
 * one accepted CookieConsent uid shift, then runs the existing
 * normaliseForCompare pipeline. `cssMessage`/`uidMessage` are set instead of
 * failing outright so a caller (compare mode fails the route; `--diff` shows
 * the message and still prints whatever content diff remains) can decide
 * what to do with them.
 */
function normalisedPairForRoute(
  kind: "compare" | "vs",
  baseDir: string,
  candidateDir: string,
  baseRawHtml: string,
  candidateRawHtml: string,
  vsRegime: VsRegime,
): RoutePairResult {
  const cssResult = checkRouteCss(
    kind,
    baseDir,
    candidateDir,
    baseRawHtml,
    candidateRawHtml,
    vsRegime,
  );
  const baseNoStyle = stripStyleBlocks(baseRawHtml);
  const candidateNoStyle = stripStyleBlocks(candidateRawHtml);
  const uidResult = reconcileCookieConsentUid(baseNoStyle, candidateNoStyle);

  const baseForCompare = uidResult.ok ? uidResult.base : baseNoStyle;
  const candidateForCompare = uidResult.ok
    ? uidResult.candidate
    : candidateNoStyle;

  return {
    base: normaliseForCompare(baseForCompare),
    candidate: normaliseForCompare(candidateForCompare),
    cssMessage: cssResult.ok ? undefined : cssResult.message,
    uidMessage: uidResult.ok ? undefined : uidResult.message,
    uidShift: uidResult.ok ? uidResult.shift : undefined,
  };
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

/**
 * normaliseSnapshot + the blog-rail excision — the "identical" this script
 * judges routes by.
 */
function normaliseForCompare(html: string): string {
  return elideBlogRailCards(normaliseSnapshot(html));
}

// --- Classification ----------------------------------------------------------

const CID_PLACEHOLDER_RE = /\s*data-astro-cid-\[hash\]/g;
const STYLE_BLOCK_RE = /<style[\s\S]*?<\/style>/g;

/**
 * Strips Astro scoping artefacts from an already-normalised string, for
 * classification only.
 */
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
    `      --- base (lines ${from + 1}-${Math.min(to, baseLines.length - 1) + 1}) ---`,
  );
  for (let i = from; i <= to && i < baseLines.length; i++) {
    console.log(
      `      ${i === diffIndex ? ">" : " "} ${truncate(baseLines[i])}`,
    );
  }
  console.log(
    `      --- candidate (lines ${from + 1}-${Math.min(to, actualLines.length - 1) + 1}) ---`,
  );
  for (let i = from; i <= to && i < actualLines.length; i++) {
    console.log(
      `      ${i === diffIndex ? ">" : " "} ${truncate(actualLines[i])}`,
    );
  }
}

// --- --prepare ----------------------------------------------------------------

function loadManifestIfPresent(captureDir: string): Manifest | undefined {
  const manifestPath = join(captureDir, "manifest.json");
  if (!existsSync(manifestPath)) return undefined;
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

function runPrepare(refArg: string | undefined, rebuild: boolean) {
  if (!refArg) {
    console.error(
      "ERROR: --prepare requires a ref, e.g. --prepare 214008c3e60ffe6891b8eb2d4c5af178aaca602c",
    );
    process.exit(1);
  }

  const sha = resolveSha(refArg);
  const captureDir = join(CAPTURES_DIR, sha);

  const existing = loadManifestIfPresent(captureDir);
  if (existing && existing.sha === sha && !rebuild) {
    console.log(
      `Reusing existing capture for ${refArg} → ${sha} from ${captureDir}/ ` +
        `(built ${existing.builtAt}). Pass --rebuild to force a fresh build.`,
    );
    return;
  }

  mkdirSync(WORKTREES_DIR, { recursive: true });
  const worktreePath = join(WORKTREES_DIR, sha);

  if (existsSync(worktreePath)) {
    verifyWorktree(worktreePath, sha, "existing worktree, before build");
    console.log(`Reusing existing worktree at ${worktreePath}.`);
  } else {
    console.log(`Creating detached worktree for ${sha} at ${worktreePath}...`);
    git(["worktree", "add", "--detach", worktreePath, sha]);
    verifyWorktree(worktreePath, sha, "freshly created worktree");
  }

  console.log(`\nInstalling dependencies in ${worktreePath}...`);
  runInWorktree(
    "pnpm",
    ["install", "--frozen-lockfile", "--prefer-offline"],
    worktreePath,
  );

  console.log(`\nBuilding ${worktreePath}...`);
  runInWorktree("pnpm", ["build"], worktreePath);

  const headAfterBuild = verifyWorktree(worktreePath, sha, "after build");

  const distDir = join(worktreePath, DIST_SUBDIR);
  if (!existsSync(distDir)) {
    console.error(`ERROR: ${distDir}/ is missing after build.`);
    process.exit(1);
  }

  let routes: Route[];
  try {
    routes = deriveRoutes(worktreePath);
  } catch (error) {
    console.error(`ERROR: ${(error as Error).message}`);
    process.exit(1);
  }
  const guardRoutes = deriveGuardRoutes(worktreePath);
  const allRoutes = [...routes, ...guardRoutes];

  const missing = allRoutes.filter((r) => !existsSync(join(distDir, r.route)));
  if (missing.length > 0) {
    console.error(
      `ERROR: ${missing.length} of ${allRoutes.length} expected route(s) are missing from ${distDir}/:`,
    );
    for (const r of missing) console.error(`   - ${r.route}`);
    console.error(
      "A capture can't omit routes it's meant to guard. Fix the build, then re-run --prepare.",
    );
    process.exit(1);
  }

  mkdirSync(captureDir, { recursive: true });
  const files: Record<string, string> = {};
  for (const r of allRoutes) {
    const dest = join(captureDir, r.route);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(join(distDir, r.route), dest);
    files[r.route] = sha256File(dest);
    console.log(`✅ captured ${r.route}`);
  }

  // The component styles these pages render with live in a hashed bundle the
  // HTML normaliser masks by design, so they must be captured separately or
  // they are outside the gate entirely (see the stylesheet note in the docblock).
  // The 10 kitaru guard routes are captured too, keyed under "guard" — they
  // link a couple of component-specific bundles (e.g. ComparisonCta,
  // per-page kitaru-vs-<slug>) that the 28 parity routes never reference, and
  // those would otherwise never be captured or compared at all.
  const stylesheets = collectStylesheets(distDir, routes);
  const guardStylesheets = collectStylesheets(distDir, guardRoutes, "guard");
  // De-duplicated: the map is keyed per route kind (or "guard"), so a bundle
  // referenced under more than one key — global.css, or the shared _slug_
  // bundle a guard route and a parity route both link — appears more than
  // once in the map but is one file.
  const stylesheetFiles = [
    ...new Set([...stylesheets.values(), ...guardStylesheets.values()]),
  ].sort();
  for (const href of stylesheetFiles) {
    const src = join(distDir, href.replace(/^\//, ""));
    if (!existsSync(src)) {
      console.error(
        `ERROR: referenced stylesheet ${href} is missing from ${distDir}/.`,
      );
      process.exit(1);
    }
    const dest = join(captureDir, href.replace(/^\//, ""));
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
    files[href.replace(/^\//, "")] = sha256File(dest);
    console.log(`✅ captured ${href}`);
  }

  const manifest: Manifest = {
    sha,
    ref: refArg,
    builtAt: new Date().toISOString(),
    worktreePath,
    headAfterBuild,
    routes: routes.map((r) => r.route),
    guardRoutes: guardRoutes.map((r) => r.route),
    stylesheets: stylesheetFiles,
    files,
  };
  writeFileSync(
    join(captureDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log(
    `\n${routes.length} route(s), ${guardRoutes.length} kitaru guard route(s) and ` +
      `${stylesheetFiles.length} stylesheet(s) captured to ${captureDir}/ ` +
      `(manifest: ${join(captureDir, "manifest.json")}).`,
  );
}

// --- --base / --candidate compare ---------------------------------------------

function loadCapture(sha: string, ref: string): Manifest {
  const captureDir = join(CAPTURES_DIR, sha);
  const manifest = loadManifestIfPresent(captureDir);
  if (!manifest) {
    console.error(`ERROR: no capture for ${sha} — run --prepare ${ref} first.`);
    process.exit(1);
  }
  if (manifest.sha !== sha) {
    console.error(
      `ERROR: capture at ${captureDir}/manifest.json records sha ` +
        `${manifest.sha}, expected ${sha}. Re-run --prepare ${ref} --rebuild.`,
    );
    process.exit(1);
  }
  // Every captured file must still hash to what --prepare wrote from the
  // freshly built dist. A capture that was edited, truncated or partially
  // deleted after the fact is not evidence of anything.
  const expectedFiles = manifest.files ?? {};
  const listed = [
    ...manifest.routes,
    ...manifest.guardRoutes,
    ...manifest.stylesheets.map((href) => href.replace(/^\//, "")),
  ];
  const tampered = listed.filter((rel) => {
    const path = join(captureDir, rel);
    return (
      !(rel in expectedFiles) ||
      !existsSync(path) ||
      sha256File(path) !== expectedFiles[rel]
    );
  });
  if (tampered.length > 0) {
    console.error(
      `ERROR: ${tampered.length} captured file(s) under ${captureDir}/ no ` +
        `longer match the checksums --prepare recorded:`,
    );
    for (const rel of tampered) console.error(`   - ${rel}`);
    console.error(`Re-run --prepare ${ref} --rebuild.`);
    process.exit(1);
  }
  return manifest;
}

function sha256File(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

/**
 * Re-derives a manifest's guard routes from its worktree for the live side
 * of verifyGuardRouteSet's four-way comparison. A capture's worktree can
 * outlive the capture itself only so long — `git worktree prune`, a cache
 * wipe, or a rebase that moved the branch the worktree was checked out
 * from can all invalidate it — so this checks before trusting it: if the
 * worktree path is gone, exit by name rather than let deriveGuardRoutes
 * throw a raw ENOENT; if it's present, re-verify its HEAD and cleanliness
 * against the SHA the capture claims (the same check --prepare ran before
 * and after building) before re-deriving from its content.
 */
function deriveGuardRoutesForManifest(manifest: Manifest): Route[] {
  if (!existsSync(manifest.worktreePath)) {
    console.error(
      `ERROR: worktree for ${manifest.sha} is gone; re-run --prepare ` +
        `${manifest.ref} --rebuild.`,
    );
    process.exit(1);
  }
  verifyWorktree(manifest.worktreePath, manifest.sha, "at compare");
  return deriveGuardRoutes(manifest.worktreePath);
}

/**
 * Finding 3: assert the base manifest's guard routes, the candidate
 * manifest's guard routes, and the guard routes derived live from each
 * worktree's own content are all the same set of exactly 10 — reporting
 * any drift by name and refusing to compare rather than silently going
 * 9/9 green. A route present on one side and absent on another is a
 * failure here, not a skip.
 */
function verifyGuardRouteSet(base: Manifest, candidate: Manifest) {
  const sets: Array<{ label: string; routes: string[] }> = [
    { label: "base manifest", routes: [...base.guardRoutes].sort() },
    { label: "candidate manifest", routes: [...candidate.guardRoutes].sort() },
    {
      label: "base worktree (live)",
      routes: deriveGuardRoutesForManifest(base)
        .map((r) => r.route)
        .sort(),
    },
    {
      label: "candidate worktree (live)",
      routes: deriveGuardRoutesForManifest(candidate)
        .map((r) => r.route)
        .sort(),
    },
  ];

  let ok = true;
  for (const s of sets) {
    if (s.routes.length !== EXPECTED_GUARD_ROUTE_COUNT) {
      console.error(
        `ERROR: ${s.label} has ${s.routes.length} kitaru guard route(s), ` +
          `expected ${EXPECTED_GUARD_ROUTE_COUNT}: ${s.routes.join(", ") || "(none)"}`,
      );
      ok = false;
    }
  }

  const union = sets.reduce(
    (acc, s) => unionRoutes(acc, s.routes),
    [] as string[],
  );
  for (const route of union) {
    const missingFrom = sets
      .filter((s) => !s.routes.includes(route))
      .map((s) => s.label);
    if (missingFrom.length > 0) {
      console.error(
        `ERROR: kitaru guard route ${route} is missing from: ${missingFrom.join(", ")}`,
      );
      ok = false;
    }
  }

  if (!ok) {
    console.error(
      "\nKitaru guard route set drifted from the expected 10 — refusing to " +
        "compare. A route was removed, drafted, or added on one side; " +
        "resolve that before trusting any of the numbers below.",
    );
    process.exit(1);
  }
}

/**
 * Compares one set of routes between two captures, printing a mark per
 * route. Each route first passes through normalisedPairForRoute, which
 * enforces the two findings-2 allowances (the CSS rule relocation, the
 * CookieConsent uid shift) before anything is byte-compared — a route whose
 * only differences are those two accepted items shows green here, anything
 * else fails with the specific mismatch printed.
 */
function compareRouteSet(
  routes: string[],
  baseDir: string,
  candidateDir: string,
  vsRegime: VsRegime,
  heading?: string,
): { passed: number; failed: number; skipped: number; uidShifts: Set<string> } {
  if (heading) console.log(heading);
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  const uidShifts = new Set<string>();

  for (const route of routes) {
    const basePath = join(baseDir, route);
    const candidatePath = join(candidateDir, route);

    const baseExists = existsSync(basePath);
    const candidateExists = existsSync(candidatePath);
    if (!baseExists || !candidateExists) {
      console.log(
        `❌ ${route}: missing (base: ${baseExists}, candidate: ${candidateExists})`,
      );
      skipped += 1;
      continue;
    }

    const pair = normalisedPairForRoute(
      routeKind(route),
      baseDir,
      candidateDir,
      readFileSync(basePath, "utf8"),
      readFileSync(candidatePath, "utf8"),
      vsRegime,
    );

    if (pair.cssMessage) {
      console.log(`❌ ${route}: FAIL (CSS)`);
      console.log(pair.cssMessage);
      failed += 1;
      continue;
    }
    if (pair.uidMessage) {
      console.log(`❌ ${route}: FAIL (ISLAND-UID)`);
      console.log(pair.uidMessage);
      failed += 1;
      continue;
    }
    if (pair.uidShift) {
      uidShifts.add(`${pair.uidShift.from} → ${pair.uidShift.to}`);
    }

    if (pair.base === pair.candidate) {
      console.log(`✅ ${route}`);
      passed += 1;
      continue;
    }

    const classification = classifyFailure(pair.base, pair.candidate);
    console.log(`❌ ${route}: FAIL (${classification})`);
    printFirstDifference(pair.base, pair.candidate);
    failed += 1;
  }
  return { passed, failed, skipped, uidShifts };
}

/**
 * Compares the CSS bundles the given routes link, by base name (the hash
 * moves with content, so the name is the identity and the content is the
 * check). Reported separately from route parity: a `global` bundle change
 * is a site-wide edit to explain, not one of the 28 routes regressing.
 *
 * The `_slug_` bundle (under whichever key kind applies) is exempt from the
 * byte compare: finding 2's accepted delta moves 20 rules out of it on
 * purpose (per-route checkRouteCss verifies exactly that move), so
 * byte-comparing it here would just re-report the same accepted change as
 * a false failure. `keyKind`, when passed, overrides every route's own
 * kind for this call — used for the 10 kitaru guard routes, so their
 * bundles are keyed `guard:<base name>` and reported under `heading`
 * instead of folding into (or colliding with) the parity routes' table.
 *
 * Returns the number of failing bundles.
 */
function compareStylesheets(
  routes: Route[],
  baseDir: string,
  candidateDir: string,
  options: { keyKind?: string; heading?: string } = {},
): number {
  const { keyKind, heading = "\nStylesheets referenced by these routes:" } =
    options;
  const base = collectStylesheets(baseDir, routes, keyKind);
  const candidate = collectStylesheets(candidateDir, routes, keyKind);
  const names = [...new Set([...base.keys(), ...candidate.keys()])].sort();

  let failed = 0;
  console.log(heading);
  for (const name of names) {
    const bHref = base.get(name);
    const aHref = candidate.get(name);
    if (!bHref || !aHref) {
      console.log(
        `❌ ${name}.css: ${bHref ? "no longer referenced" : "newly referenced"} (base: ${bHref ?? "—"}, candidate: ${aHref ?? "—"})`,
      );
      failed += 1;
      continue;
    }
    const bPath = join(baseDir, bHref.replace(/^\//, ""));
    const aPath = join(candidateDir, aHref.replace(/^\//, ""));
    if (!existsSync(bPath) || !existsSync(aPath)) {
      console.log(
        `❌ ${name}.css: missing file (base copy: ${existsSync(bPath)}, candidate copy: ${existsSync(aPath)})`,
      );
      failed += 1;
      continue;
    }

    if (name.endsWith(":_slug_")) {
      console.log(
        `✅ ${name}.css: content covered by the per-route CSS rule check ` +
          "above (finding 2's accepted delta), not byte-compared here",
      );
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

function requireRefs(
  baseRef: string | undefined,
  candidateRef: string | undefined,
): { baseRef: string; candidateRef: string } {
  if (!baseRef || !candidateRef) {
    console.error(
      "ERROR: --base <ref> and --candidate <ref> are both required.",
    );
    process.exit(1);
  }
  return { baseRef, candidateRef };
}

function runCompare(
  baseRefArg: string | undefined,
  candidateRefArg: string | undefined,
) {
  const { baseRef, candidateRef } = requireRefs(baseRefArg, candidateRefArg);
  const baseSha = resolveSha(baseRef);
  const candidateSha = resolveSha(candidateRef);

  if (baseSha === candidateSha) {
    console.error(
      `ERROR: --base ${baseRef} and --candidate ${candidateRef} both resolve ` +
        `to ${baseSha} — comparing a build against itself proves nothing. ` +
        "Pass two different commits.",
    );
    process.exit(1);
  }

  const base = loadCapture(baseSha, baseRef);
  const candidate = loadCapture(candidateSha, candidateRef);

  console.log(
    `Base:      ${baseRef} → ${baseSha} (built ${base.builtAt})\n` +
      `Candidate: ${candidateRef} → ${candidateSha} (built ${candidate.builtAt})\n`,
  );

  for (const [label, manifest] of [
    ["base", base],
    ["candidate", candidate],
  ] as const) {
    if (manifest.routes.length !== EXPECTED_ROUTE_COUNT) {
      console.error(
        `ERROR: ${label} capture has ${manifest.routes.length} routes, ` +
          `expected ${EXPECTED_ROUTE_COUNT}. Re-run --prepare for it.`,
      );
      process.exit(1);
    }
  }

  verifyGuardRouteSet(base, candidate);

  const baseDir = join(CAPTURES_DIR, baseSha);
  const candidateDir = join(CAPTURES_DIR, candidateSha);

  const vsRegime: VsRegime = slugBundlesIdentical(
    baseDir,
    candidateDir,
    toRouteObjs(base.routes),
    toRouteObjs(candidate.routes),
  )
    ? "identical"
    : "relocation";

  console.log(
    vsRegime === "identical"
      ? "Relocation regime: identical — base and candidate share the same " +
          "compare:_slug_.css bundle content, so no relocation occurred; " +
          "/vs/* routes must match base exactly, same as /compare/*."
      : "Relocation regime: relocation — base and candidate's " +
          "compare:_slug_.css bundles differ; checking the accepted " +
          "relocation (ACCEPTED_VS_EXTRA_RULES — see its docblock to " +
          "re-derive):",
  );

  if (vsRegime === "relocation") {
    verifyAcceptedRulesAreRelocated(baseDir, base);

    console.log(
      "Accepted delta (PR #284; encoded as ACCEPTED_VS_EXTRA_RULES in this " +
        "script — see its docblock to re-derive):",
    );
    console.log(
      `  ${ACCEPTED_VS_EXTRA_RULES.length} cid-scoped rule(s) relocated from the shared ` +
        "compare:_slug_.css bundle into an inline <style> block on every " +
        "page (net zero on /compare/*, which already linked the bundle; " +
        "net +" +
        `${ACCEPTED_VS_EXTRA_RULES.length} on /vs/*, which never did):`,
    );
    for (const rule of ACCEPTED_VS_EXTRA_RULES) {
      console.log(`    - ${rule.selector}`);
    }
  }
  console.log(
    "  Plus: the CookieConsent astro-island's uid, on every page (one " +
      "island per page here) — reported below once observed.\n",
  );

  const routes = unionRoutes(base.routes, candidate.routes);
  const tally = compareRouteSet(routes, baseDir, candidateDir, vsRegime);

  const guardRoutes = unionRoutes(base.guardRoutes, candidate.guardRoutes);
  const guard = compareRouteSet(
    guardRoutes,
    baseDir,
    candidateDir,
    vsRegime,
    "\nKitaru guard routes (must be untouched — same dispatcher, same bundle):",
  );

  const styleFailures = compareStylesheets(
    toRouteObjs(routes),
    baseDir,
    candidateDir,
  );

  const guardStyleFailures = compareStylesheets(
    toRouteObjs(guardRoutes),
    baseDir,
    candidateDir,
    {
      keyKind: "guard",
      heading: "\nKitaru guard stylesheets (must be untouched):",
    },
  );

  const uidShifts = [
    ...new Set([...tally.uidShifts, ...guard.uidShifts]),
  ].sort();
  console.log(
    `\nObserved CookieConsent uid shift: ${
      uidShifts.length === 0
        ? "none"
        : uidShifts.length === 1
          ? uidShifts[0]
          : `${uidShifts.length} distinct shifts (expected exactly 1): ${uidShifts.join(", ")}`
    }`,
  );

  console.log(
    `\n${tally.passed} passed, ${tally.failed} failed, ${tally.skipped} skipped-missing (of ${routes.length} routes); ` +
      `${guard.passed}/${guard.passed + guard.failed + guard.skipped} kitaru guard routes unchanged; ` +
      `${styleFailures} stylesheet(s) changed; ` +
      `${guardStyleFailures} kitaru guard stylesheet(s) changed.`,
  );
  const bad =
    tally.failed +
    tally.skipped +
    guard.failed +
    guard.skipped +
    styleFailures +
    guardStyleFailures +
    (uidShifts.length > 1 ? 1 : 0);
  if (bad > 0) process.exit(1);
}

function runDiff(
  routeArg: string | undefined,
  baseRefArg: string | undefined,
  candidateRefArg: string | undefined,
) {
  if (!routeArg) {
    console.error(
      "ERROR: --diff requires a route, e.g. --diff compare/zenml-vs-mlflow.html " +
        "--base <ref> --candidate <ref>",
    );
    process.exit(1);
  }
  const { baseRef, candidateRef } = requireRefs(baseRefArg, candidateRefArg);
  const baseSha = resolveSha(baseRef);
  const candidateSha = resolveSha(candidateRef);
  const base = loadCapture(baseSha, baseRef);
  const candidate = loadCapture(candidateSha, candidateRef);

  const routes = unionRoutes(base.routes, candidate.routes);
  const route = routes.find(
    (r) =>
      r === routeArg ||
      r.replace(/^(compare|vs)\//, "").replace(/\.html$/, "") === routeArg,
  );
  if (!route) {
    console.error(
      `ERROR: "${routeArg}" doesn't match any of the ${routes.length} known routes. ` +
        'Pass either the full route (e.g. "compare/zenml-vs-mlflow.html") or the slug (e.g. "zenml-vs-mlflow").',
    );
    process.exit(1);
  }

  const baseDir = join(CAPTURES_DIR, baseSha);
  const candidateDir = join(CAPTURES_DIR, candidateSha);
  const basePath = join(baseDir, route);
  const candidatePath = join(candidateDir, route);
  if (!existsSync(basePath) || !existsSync(candidatePath)) {
    console.error(
      `ERROR: missing file for ${route} (base: ${existsSync(basePath)}, candidate: ${existsSync(candidatePath)}).`,
    );
    process.exit(1);
  }

  const vsRegime: VsRegime = slugBundlesIdentical(
    baseDir,
    candidateDir,
    toRouteObjs(base.routes),
    toRouteObjs(candidate.routes),
  )
    ? "identical"
    : "relocation";
  console.log(`Relocation regime: ${vsRegime}\n`);

  const pair = normalisedPairForRoute(
    routeKind(route),
    baseDir,
    candidateDir,
    readFileSync(basePath, "utf8"),
    readFileSync(candidatePath, "utf8"),
    vsRegime,
  );
  if (pair.cssMessage) {
    console.log(
      "CSS rule mismatch (outside the accepted delta) — diffing content anyway:",
    );
    console.log(pair.cssMessage);
  }
  if (pair.uidMessage) {
    console.log(
      "astro-island uid mismatch (outside the accepted delta) — diffing content anyway:",
    );
    console.log(pair.uidMessage);
  }
  const baseHtml = pair.base;
  const candidateHtml = pair.candidate;

  const diffDir = join(CACHE_DIR, "diff");
  mkdirSync(diffDir, { recursive: true });
  const slug = route.replace(/^(compare|vs)\//, "").replace(/\.html$/, "");
  const baseOut = join(diffDir, `${slug}-base.html`);
  const candidateOut = join(diffDir, `${slug}-candidate.html`);
  writeFileSync(baseOut, baseHtml);
  writeFileSync(candidateOut, candidateHtml);

  const result = spawnSync("diff", ["-u", baseOut, candidateOut], {
    stdio: "inherit",
  });
  if (result.error) {
    console.log(
      `(no \`diff\` on PATH) compare manually: ${baseOut} ${candidateOut}`,
    );
  }
}

function argValue(args: string[], flag: string): string | undefined {
  const i = args.indexOf(flag);
  return i === -1 ? undefined : args[i + 1];
}

function main() {
  const args = process.argv.slice(2);

  if (args[0] === "--prepare") {
    runPrepare(args[1], args.includes("--rebuild"));
    return;
  }

  if (args[0] === "--diff") {
    runDiff(args[1], argValue(args, "--base"), argValue(args, "--candidate"));
    return;
  }

  if (args.includes("--base") || args.includes("--candidate")) {
    runCompare(argValue(args, "--base"), argValue(args, "--candidate"));
    return;
  }

  console.error(
    "Usage:\n" +
      "  pnpm exec tsx scripts/migrations/compare-blocks/parity.ts --prepare <ref> [--rebuild]\n" +
      "  pnpm exec tsx scripts/migrations/compare-blocks/parity.ts --base <ref> --candidate <ref>\n" +
      "  pnpm exec tsx scripts/migrations/compare-blocks/parity.ts --diff <route> --base <ref> --candidate <ref>",
  );
  process.exit(1);
}

main();
