/**
 * check-motion.ts
 *
 * Enforces the motion / island-hydration budget from DESIGN.md's "Motion and
 * atmosphere" section against the built site.
 *
 * Run via: pnpm check:motion (after pnpm build — it reads dist/client)
 * Exits with code 1 (failing CI) if any non-grandfathered page violates budget.
 *
 * Why `astro check` can't catch this:
 * `astro check` type-checks component props and templates against their
 * declared types. It has no notion of a *budget* summed across everything a
 * page renders, and no visibility into which `client:` directive an island
 * actually ships with once Astro resolves, hydrates, and bundles it — that
 * information only exists in the built HTML. This is the same reason
 * check-surface-coverage.ts and check-registry.ts exist as separate scripts
 * rather than `astro check` rules.
 *
 * What it checks, per built page (every *.html under dist/client, walked
 * recursively):
 *
 *   1. HYDRATION BUDGET — count <astro-island> tags whose `client=` attribute
 *      is "load" or "visible" (the site-wide consent banner is exempt).
 *      Budget: max 3 per page. `client="media"` and `client="idle"` are
 *      unlimited.
 *   2. AMBIENT BUDGET — of the islands counted above, count those whose
 *      component-url matches an entry in AMBIENT_COMPONENTS (today:
 *      KitaruGrain — a shader/grain backdrop). Budget: max 1 per page.
 *      An ambient instance that only hydrates on `client:media` or
 *      `client:idle` does not count toward either budget.
 *   3. ALLOWLIST — GRANDFATHERED maps a page path to a { date, reason } pair.
 *      A grandfathered page still has its counts computed and printed, but
 *      as an informational line rather than a failing violation.
 *
 * How it works, step by step:
 *   1. Recursively walk dist/client and collect every *.html file.
 *   2. Read each file once and run a regex pass to pull out every
 *      <astro-island ...> opening tag (the build emits these as single-line
 *      attribute lists, so a non-greedy `[^>]*` capture is sufficient — no
 *      HTML parser needed).
 *   3. For each tag, pull its `client="..."` and `component-url="..."`
 *      attributes with two more regexes run against just that tag's text.
 *   4. Classify: an island counts toward the hydration budget when its
 *      client strategy is load/visible and it is not the consent banner;
 *      it additionally counts toward the ambient budget when it also
 *      matches an ambient component name.
 *   5. Compare both per-page counts against their budgets. Over budget on a
 *      grandfathered page is reported as informational; anywhere else it is
 *      a violation.
 *   6. Print a summary; exit 0 if there are zero violations (grandfathered
 *      pages included), exit 1 otherwise.
 *
 * NOT IMPLEMENTED:
 *   SSR-embedded ambient instances rendered *inside* another island (e.g. an
 *   ambient component mounted as a plain child of a parent component, never
 *   emitted as its own <astro-island> wrapper) are not counted here.
 *   Counting those needs a stable per-instance marker in the render output
 *   that does not currently exist; the island-level count implemented here
 *   is the enforceable floor without one.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const DIST_DIR = join(ROOT, "dist/client");

const HYDRATION_BUDGET = 3;
const AMBIENT_BUDGET = 1;

/** Ambient/atmospheric components: shader backdrops, grain fields, glow washes. */
const AMBIENT_COMPONENTS = ["KitaruGrain"];

/** Site-wide chrome exempt from the hydration budget. */
const EXEMPT_COMPONENTS = ["CookieConsent"];

/**
 * Pages that were already over budget when this check was introduced. A page
 * lands here only by an explicit reviewed ruling, never by default — see the
 * Fix: message below.
 */
const GRANDFATHERED: Record<string, { date: string; reason: string }> = {
  "product/kitaru.html": {
    date: "2026-08-24",
    reason:
      "ambient grain across four sections predates the policy; single-section reduction is a separate reviewed change",
  },
};

/** Matches one <astro-island ...> opening tag; attributes are single-line. */
const ASTRO_ISLAND_TAG_RE = /<astro-island\b[^>]*>/g;
const CLIENT_ATTR_RE = /\bclient="([^"]*)"/;
const COMPONENT_URL_ATTR_RE = /\bcomponent-url="([^"]*)"/;

/** Recursively collect *.html files under a directory. */
function collectHtmlFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectHtmlFiles(full));
    } else if (entry.name.endsWith(".html")) {
      results.push(full);
    }
  }
  return results;
}

interface PageCounts {
  hydration: number;
  ambient: number;
}

/** Count hydration- and ambient-budget islands in one page's raw HTML. */
function countPage(html: string): PageCounts {
  let hydration = 0;
  let ambient = 0;

  for (const [tag] of html.matchAll(ASTRO_ISLAND_TAG_RE)) {
    const client = tag.match(CLIENT_ATTR_RE)?.[1];
    if (client !== "load" && client !== "visible") continue;

    const componentUrl = tag.match(COMPONENT_URL_ATTR_RE)?.[1] ?? "";
    if (EXEMPT_COMPONENTS.some((name) => componentUrl.includes(name))) {
      continue;
    }

    hydration += 1;

    if (AMBIENT_COMPONENTS.some((name) => componentUrl.includes(name))) {
      ambient += 1;
    }
  }

  return { hydration, ambient };
}

function check(): void {
  const distStat = statSync(DIST_DIR, { throwIfNoEntry: false });
  if (!distStat?.isDirectory()) {
    console.error(
      `ERROR: ${DIST_DIR} not found. Run \`pnpm build\` before \`pnpm check:motion\`.`,
    );
    process.exit(1);
  }

  const violations: string[] = [];
  const informational: string[] = [];
  let pagesChecked = 0;

  for (const file of collectHtmlFiles(DIST_DIR)) {
    pagesChecked += 1;
    const relPath = relative(DIST_DIR, file);
    const { hydration, ambient } = countPage(readFileSync(file, "utf8"));

    const overHydration = hydration > HYDRATION_BUDGET;
    const overAmbient = ambient > AMBIENT_BUDGET;
    if (!overHydration && !overAmbient) continue;

    const parts: string[] = [];
    if (overHydration) {
      parts.push(
        `${hydration} load/visible island(s) mounted (budget ${HYDRATION_BUDGET})`,
      );
    }
    if (overAmbient) {
      parts.push(
        `${ambient} always-on ambient island(s) mounted (budget ${AMBIENT_BUDGET})`,
      );
    }

    const grandfathered = GRANDFATHERED[relPath];
    if (grandfathered) {
      informational.push(
        `  ${relPath} — ${parts.join("; ")}\n` +
          `    grandfathered ${grandfathered.date}: ${grandfathered.reason}`,
      );
    } else {
      violations.push(`  ${relPath} — ${parts.join("; ")}`);
    }
  }

  const printInformational = (log: (s: string) => void) => {
    if (informational.length === 0) return;
    log("\n  grandfathered (informational, not failing):\n");
    for (const line of informational) {
      log(line);
    }
  };

  if (violations.length === 0) {
    console.log(
      `✓ motion check passed — ${pagesChecked} pages checked, 0 violations` +
        (informational.length > 0
          ? `, ${informational.length} grandfathered`
          : ""),
    );
    printInformational(console.log);
    process.exit(0);
  }

  console.error("\n✗ motion violations found:\n");
  for (const v of violations) {
    console.error(v);
  }
  printInformational(console.error);
  console.error(
    "\nThe motion budget exists so a page's animation and hydration cost stays a deliberate " +
      'choice, not an accumulation. See DESIGN.md\'s "Motion and atmosphere" section for the ' +
      "full policy. Reduce load/visible island mounts (move some to client:media / client:idle, " +
      "or remove the mount), or reduce always-on ambient sections to one, before this ships. New " +
      "pages are never added to GRANDFATHERED without an explicit reviewed ruling — grandfathering " +
      "is for pages that predate this check, not a way to land new violations.\n",
  );
  process.exit(1);
}

check();
