/**
 * registryCheck.ts
 *
 * The filesystem-free half of `scripts/check-registry.ts`'s validation: the
 * checks that only need the registry array itself, not the component tree on
 * disk. Split out so it can be exercised directly against synthetic bad
 * registries in tests — `scripts/check-registry.ts` only ever ran these
 * checks against the one real, valid `TEMPLATE_REGISTRY`, so a rejection
 * branch could silently stop firing and nothing would notice.
 *
 * Covers checks 3–5 from the script's docblock:
 *   3. No duplicate ids.
 *   4. Any `contentShape` present has a sane range: both bounds are
 *      non-negative integers, and maxItems >= minItems when both are set.
 *   5. Entries flagged `collectionBound: true` (see `TemplateEntry` in
 *      `registry.ts`) declare a complete `contentShape` once they are built
 *      (componentPath set): minItems, maxItems, and a non-empty `overflow`
 *      rule. This is a forward gate — every flagged entry is still
 *      `componentPath: null` today, so it does not fail yet, but a build in
 *      a later wave cannot land a real component without also filling in its
 *      budgets. Keyed on the flag itself, not a family-name list — an
 *      earlier version matched on family name and the list silently stopped
 *      matching any real registry entry, making the gate permanently
 *      vacuous without failing or warning.
 *
 * Checks 1–2 (orphan files, missing componentPath targets) stay inline in
 * the script because they read the component tree — this module never
 * touches the filesystem.
 */

import type { TemplateEntry } from "./registry";

/**
 * Runs checks 3–5 against a registry array and returns the violation
 * messages (empty array if the registry is clean). Pure — no filesystem, no
 * process exit — so it can run against both the real registry and synthetic
 * bad ones in tests.
 */
export function findRegistryShapeViolations(
  registry: readonly TemplateEntry[],
): string[] {
  const violations: string[] = [];

  // 3. Duplicate ids
  const seen = new Set<string>();
  for (const entry of registry) {
    if (seen.has(entry.id)) {
      violations.push(`  duplicate id in registry: ${entry.id}`);
    }
    seen.add(entry.id);
  }

  // 4. contentShape ranges must be sane — both bounds real, non-negative
  // integers, and maxItems >= minItems when both are set.
  for (const entry of registry) {
    const shape = entry.contentShape;
    if (!shape) continue;
    // The two bounds get identical scrutiny, each independently of whether
    // the other is present — a negative maxItems is wrong whether or not
    // minItems happens to be set.
    for (const [field, value] of [
      ["minItems", shape.minItems],
      ["maxItems", shape.maxItems],
    ] as const) {
      if (value === undefined) continue;
      if (!Number.isInteger(value)) {
        violations.push(
          `  ${entry.id} — contentShape.${field} is not an integer: ${value}`,
        );
      }
      if (value < 0) {
        violations.push(
          `  ${entry.id} — contentShape.${field} is negative: ${value}`,
        );
      }
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

  // 5. collectionBound entries need a complete contentShape once built
  // (forward gate). An entry with no contentShape at all keeps the original
  // single violation; an entry that has one but leaves pieces out (including
  // `contentShape: {}`) is flagged per missing piece, so the rejection names
  // exactly what is missing instead of just "no contentShape".
  for (const entry of registry) {
    if (!entry.collectionBound) continue;
    if (!entry.componentPath) continue; // not built yet — the gate does not apply
    const shape = entry.contentShape;
    if (!shape) {
      violations.push(
        `  ${entry.id} — collectionBound but has no contentShape\n` +
          `    Add minItems/maxItems and the overflow behaviour before this ships.`,
      );
      continue;
    }
    if (shape.minItems === undefined) {
      violations.push(
        `  ${entry.id} — collectionBound contentShape is missing minItems`,
      );
    }
    if (shape.maxItems === undefined) {
      violations.push(
        `  ${entry.id} — collectionBound contentShape is missing maxItems`,
      );
    }
    if (shape.overflow === undefined || shape.overflow.trim().length === 0) {
      violations.push(
        `  ${entry.id} — collectionBound contentShape is missing a non-empty overflow rule`,
      );
    }
  }

  return violations;
}
