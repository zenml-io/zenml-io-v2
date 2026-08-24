/**
 * check-registry.ts
 *
 * Enforces that the template registry and the component tree agree.
 *
 * Run via: pnpm check:registry
 * Exits with code 1 (failing CI) if any violations are found.
 *
 * Why this exists: the registry is only useful if it cannot silently disagree
 * with the tree. A hand-maintained index that drifts is worse than no index,
 * because people trust it (DECISIONS #93). This script is what makes it
 * trustworthy — it is the same mechanism as check:surface, which exists for the
 * same reason: `astro check` does not catch this class of problem.
 *
 * What it checks:
 *   1. Every .astro/.tsx file under src/components/templates/ AND
 *      src/components/system/ has a registry entry whose componentPath
 *      points at it — same rule check:surface/check:alt use for their own
 *      grep-based gates: a file with no entry is invisible to the registry,
 *      so it fails loud instead of drifting silently. A `.tsx` file paired
 *      with a same-named `.astro` sibling (the Astro/Preact twin pattern,
 *      #248) is exempt: it is the twin of the `.astro` primitive's own
 *      entry, not a separate registered unit.
 *   2. Every entry with a componentPath points at a file that exists.
 *   3. No duplicate ids.
 *   4. Any `contentShape` present has a sane range: minItems >= 0,
 *      maxItems >= minItems.
 *   5. Collection-bound template families (blog-cards, integrations-wall,
 *      testimonials, logo-cloud, comparison-table, feature-grid) declare a
 *      `contentShape` once they are built (componentPath set). This is a
 *      forward gate — every entry in these families is still `componentPath:
 *      null` today, so it does not fail yet, but a family build in a later
 *      wave cannot land a real component without also filling in its budgets.
 *
 * What it reports but does not fail on:
 *   - Adoption count per template, counted from real imports. Zero adoption is a
 *     legitimate state for a template that has just landed, so it is information
 *     rather than a violation.
 *
 * NOT YET IMPLEMENTED — contrast:
 *   DECISIONS #93 also calls for failing when a token is used on a surface it
 *   fails 4.5:1 against. That needs a declared list of which token pairs actually
 *   co-occur; deriving it statically from class strings guesses, and a contrast
 *   check that guesses gives false confidence, which is worse than not having
 *   one. Left out deliberately rather than shipped weak. See #247.
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

import { familyOf, TEMPLATE_REGISTRY, statusOf } from "../src/lib/templates/registry.ts";

const ROOT = resolve(process.cwd());
const TEMPLATES_DIR = join(ROOT, "src/components/templates");
const SYSTEM_DIR = join(ROOT, "src/components/system");

/**
 * Families whose templates are bound to a content collection (as opposed to
 * hand-authored props) and therefore need a documented `contentShape` once
 * built — an unbounded collection is exactly the case a layout can silently
 * break under.
 */
const COLLECTION_BOUND_FAMILIES = new Set([
  "blog-cards",
  "integrations-wall",
  "testimonials",
  "logo-cloud",
  "comparison-table",
  "feature-grid",
]);

/** Recursively collect component files under a directory. */
function collectComponents(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectComponents(full));
    } else if (entry.name.endsWith(".astro") || entry.name.endsWith(".tsx")) {
      results.push(full);
    }
  }
  return results;
}

/**
 * True for a `.tsx` file that has a same-directory, same-basename `.astro`
 * sibling — the Astro/Preact twin pattern (#248, e.g. `SectionIntro.astro` /
 * `SectionIntro.tsx`). That `.tsx` is the twin of the `.astro` primitive's
 * own registry entry, not a separate registered unit, so it is exempt from
 * check 1 rather than needing its own `id`.
 */
function isPairedTwin(file: string): boolean {
  if (!file.endsWith(".tsx")) return false;
  return existsSync(`${file.slice(0, -".tsx".length)}.astro`);
}

/** Any `from "..."` specifier. The path is resolved properly rather than matched by name. */
const IMPORT_SPECIFIER_RE = /from\s+["']([^"']+)["']/g;

/**
 * Count files that import a given component, excluding the component itself.
 *
 * Resolves each relative specifier against the importing file's directory and
 * compares real paths. Two earlier shortcuts were wrong and are worth naming so
 * nobody reintroduces them:
 *
 *   - Matching on basename collides. `ComparisonTable.astro` exists at both
 *     `src/components/sections/` and `src/components/compare/kitaru/`, and
 *     `ArtifactLineage.astro` exists four times. Name matching would credit one
 *     template with another's call sites.
 *   - Requiring an explicit extension undercounts. Only `ContactForm.tsx` is
 *     imported with its extension; every other island in this repo is imported
 *     extensionless, so an extension-required match reports 0 for a component
 *     used everywhere — the precise false signal this tool exists to prevent.
 *
 * Counts importing FILES, not import statements.
 */
function countAdoption(componentPath: string): number {
  const target = resolve(ROOT, componentPath);
  const searchRoots = [join(ROOT, "src/pages"), join(ROOT, "src/components"), join(ROOT, "src/layouts")];

  let count = 0;
  for (const root of searchRoots) {
    if (!existsSync(root)) continue;
    for (const file of collectComponents(root)) {
      if (file === target) continue;
      const source = readFileSync(file, "utf8");
      for (const [, specifier] of source.matchAll(IMPORT_SPECIFIER_RE)) {
        // Bare specifiers are packages, never local components.
        if (!specifier.startsWith(".")) continue;
        const resolved = resolve(dirname(file), specifier);
        if (resolved === target || `${resolved}.astro` === target || `${resolved}.tsx` === target) {
          count += 1;
          break;
        }
      }
    }
  }
  return count;
}

function check(): void {
  const violations: string[] = [];

  // 3. Duplicate ids
  const seen = new Set<string>();
  for (const entry of TEMPLATE_REGISTRY) {
    if (seen.has(entry.id)) {
      violations.push(`  duplicate id in registry: ${entry.id}`);
    }
    seen.add(entry.id);
  }

  // 2. Entries pointing at files that do not exist
  const registeredPaths = new Set<string>();
  for (const entry of TEMPLATE_REGISTRY) {
    if (!entry.componentPath) continue;
    registeredPaths.add(entry.componentPath);
    if (!existsSync(join(ROOT, entry.componentPath))) {
      violations.push(
        `  ${entry.id} — componentPath does not exist: ${entry.componentPath}\n` +
          `    Either the file moved, or this entry should be componentPath: null.`,
      );
    }
  }

  // 1. Files with no entry (templates/ and system/ — see docblock)
  for (const file of [
    ...collectComponents(TEMPLATES_DIR),
    ...collectComponents(SYSTEM_DIR),
  ]) {
    if (isPairedTwin(file)) continue;
    const rel = relative(ROOT, file);
    if (!registeredPaths.has(rel)) {
      violations.push(
        `  ${rel} — component has no registry entry\n` +
          `    Add one to src/lib/templates/registry.ts before this ships.`,
      );
    }
  }

  // 4. contentShape ranges must be sane
  for (const entry of TEMPLATE_REGISTRY) {
    const shape = entry.contentShape;
    if (!shape) continue;
    if (shape.minItems !== undefined && shape.minItems < 0) {
      violations.push(`  ${entry.id} — contentShape.minItems is negative: ${shape.minItems}`);
    }
    if (
      shape.minItems !== undefined &&
      shape.maxItems !== undefined &&
      shape.maxItems < shape.minItems
    ) {
      violations.push(
        `  ${entry.id} — contentShape.maxItems (${shape.maxItems}) is less than minItems (${shape.minItems})`,
      );
    }
  }

  // 5. Collection-bound template families need contentShape once built (forward gate)
  for (const entry of TEMPLATE_REGISTRY) {
    if (entry.kind !== "template") continue;
    if (!COLLECTION_BOUND_FAMILIES.has(familyOf(entry.id))) continue;
    if (!entry.componentPath) continue; // not built yet — the gate does not apply
    if (!entry.contentShape) {
      violations.push(
        `  ${entry.id} — collection-bound family "${familyOf(entry.id)}" is built but has no contentShape\n` +
          `    Add minItems/maxItems and the overflow behaviour before this ships.`,
      );
    }
  }

  const built = TEMPLATE_REGISTRY.filter((e) => statusOf(e) === "built");
  const planned = TEMPLATE_REGISTRY.length - built.length;

  if (violations.length === 0) {
    console.log(
      `✓ registry check passed — ${TEMPLATE_REGISTRY.length} entries (${built.length} built, ${planned} planned), no orphans, no duplicates`,
    );
    if (built.length > 0) {
      console.log("\n  adoption:");
      for (const entry of built) {
        const count = countAdoption(entry.componentPath!);
        const flag = count === 0 ? "  ← not adopted yet" : "";
        console.log(`    ${entry.id.padEnd(36)} ${String(count).padStart(3)} file(s)${flag}`);
      }
    }
    process.exit(0);
  }

  console.error("\n✗ registry violations found:\n");
  for (const v of violations) {
    console.error(v);
  }
  console.error(
    "\nThe registry is the code-side source of truth for the template system.",
  );
  console.error("A template that is not in it is invisible to the styleguide and to adoption counts.\n");
  process.exit(1);
}

check();
