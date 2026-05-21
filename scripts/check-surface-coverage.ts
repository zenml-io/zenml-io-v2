/**
 * check-surface-coverage.ts
 *
 * Enforces that every .astro page template that directly renders BaseLayout or
 * MinimalLayout passes an explicit `surface=` prop.
 *
 * Run via: pnpm check:surface
 * Exits with code 1 (failing CI) if any violations are found.
 *
 * Why this exists: `surface` is now a required prop on BaseLayout and
 * MinimalLayout, but Astro's TypeScript checker does not enforce required
 * props on .astro components at type-check time. This script closes the gap
 * by statically scanning the source tree at build time.
 *
 * How it works:
 *   1. Find all .astro files under src/pages/ and src/components/.
 *   2. For each file that imports BaseLayout or MinimalLayout directly,
 *      check that EVERY usage of <BaseLayout or <MinimalLayout in that file
 *      is followed (within the same JSX element) by a `surface=` attribute.
 *   3. Report violations and exit non-zero.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(process.cwd());

// Detect files that import the layout directly (rules out re-exports)
const IMPORT_RE = /import\s+(?:BaseLayout|MinimalLayout)\s+from/;

// Pattern: opening <BaseLayout or <MinimalLayout tag, capturing the props
// block until the closing >. Skips over quoted strings and {...} expressions
// so a `>` inside a prop value doesn't truncate the match (template literals
// with nested ${...} braces remain an edge case; none exist today).
const LAYOUT_OPEN_TAG_RE =
  /<(BaseLayout|MinimalLayout)\b((?:"[^"]*"|'[^']*'|\{[^{}]*\}|[^>])*?)>/gm;

/** Recursively collect all .astro files under a directory. */
function collectAstroFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectAstroFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".astro")) {
      results.push(full);
    }
  }
  return results;
}

function check(): void {
  const files = [
    ...collectAstroFiles(join(ROOT, "src", "pages")),
    ...collectAstroFiles(join(ROOT, "src", "components")),
  ];

  const violations: string[] = [];

  for (const file of files) {
    const src = readFileSync(file, "utf8");

    // Skip files that don't import BaseLayout/MinimalLayout directly.
    if (!IMPORT_RE.test(src)) continue;

    // Reset lastIndex before each exec loop
    LAYOUT_OPEN_TAG_RE.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = LAYOUT_OPEN_TAG_RE.exec(src)) !== null) {
      const tagContent = match[2]; // everything between <BaseLayout and >
      if (!tagContent.includes("surface=")) {
        const lineNumber = src.slice(0, match.index).split("\n").length;
        violations.push(
          `  ${relative(ROOT, file)}:${lineNumber} — <${match[1]}> missing surface= prop`,
        );
      }
    }
  }

  if (violations.length === 0) {
    console.log(
      "✓ surface coverage check passed — all BaseLayout/MinimalLayout usages have explicit surface= props",
    );
    process.exit(0);
  }

  console.error("\n✗ surface coverage violations found:\n");
  for (const v of violations) {
    console.error(v);
  }
  console.error(
    "\nFix: add surface=\"ml\" | surface=\"agent\" | surface=\"unified\" to each flagged usage.",
  );
  console.error(
    "See docs/two-workspaces-audit/SURFACE-AUDIT.md for the correct value per page.\n",
  );
  process.exit(1);
}

check();
