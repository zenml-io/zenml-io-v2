import { describe, expect, it } from "vitest";
import {
  TEMPLATE_REGISTRY,
  type TemplateEntry,
} from "../../src/lib/templates/registry";
import { findRegistryShapeViolations } from "../../src/lib/templates/registryCheck";

/**
 * Minimal valid entry factory. `findRegistryShapeViolations` never touches
 * the filesystem, so `componentPath` here can point at a file that does not
 * exist on disk — only scripts/check-registry.ts's own checks 1–2 care.
 */
function makeEntry(overrides: Partial<TemplateEntry> = {}): TemplateEntry {
  return {
    id: "test.entry",
    kind: "template",
    componentPath: null,
    variantAxes: [],
    tones: ["default"],
    responsive: "reflow",
    island: false,
    paperPage: 1,
    ...overrides,
  };
}

describe("findRegistryShapeViolations", () => {
  it("finds no violations in the real registry", () => {
    expect(findRegistryShapeViolations(TEMPLATE_REGISTRY)).toEqual([]);
  });

  it("flags duplicate ids", () => {
    const violations = findRegistryShapeViolations([
      makeEntry({ id: "dup.one" }),
      makeEntry({ id: "dup.one" }),
    ]);

    expect(
      violations.some((v) => v.includes("duplicate id in registry: dup.one")),
    ).toBe(true);
  });

  it("flags a negative minItems", () => {
    const violations = findRegistryShapeViolations([
      makeEntry({ contentShape: { minItems: -1 } }),
    ]);

    expect(
      violations.some((v) => v.includes("contentShape.minItems is negative")),
    ).toBe(true);
  });

  it("flags a negative maxItems even without minItems present", () => {
    const violations = findRegistryShapeViolations([
      makeEntry({ contentShape: { maxItems: -3 } }),
    ]);

    expect(
      violations.some((v) => v.includes("contentShape.maxItems is negative")),
    ).toBe(true);
  });

  it("flags maxItems less than minItems", () => {
    const violations = findRegistryShapeViolations([
      makeEntry({ contentShape: { minItems: 5, maxItems: 2 } }),
    ]);

    expect(
      violations.some((v) =>
        v.includes("contentShape.maxItems (2) is less than minItems (5)"),
      ),
    ).toBe(true);
  });

  it("flags a non-integer bound", () => {
    const violations = findRegistryShapeViolations([
      makeEntry({ contentShape: { minItems: 1.5 } }),
    ]);

    expect(
      violations.some((v) =>
        v.includes("contentShape.minItems is not an integer"),
      ),
    ).toBe(true);
  });

  it("flags a built collectionBound entry with contentShape: {} for every missing piece", () => {
    const violations = findRegistryShapeViolations([
      makeEntry({
        collectionBound: true,
        componentPath: "src/components/templates/does-not-exist.astro",
        contentShape: {},
      }),
    ]);

    expect(violations.some((v) => v.includes("missing minItems"))).toBe(true);
    expect(violations.some((v) => v.includes("missing maxItems"))).toBe(true);
    expect(
      violations.some((v) => v.includes("missing a non-empty overflow rule")),
    ).toBe(true);
  });

  it("flags a whitespace-only overflow rule", () => {
    const violations = findRegistryShapeViolations([
      makeEntry({
        collectionBound: true,
        componentPath: "src/components/templates/does-not-exist.astro",
        contentShape: { minItems: 1, maxItems: 4, overflow: "   " },
      }),
    ]);

    expect(
      violations.some((v) => v.includes("missing a non-empty overflow rule")),
    ).toBe(true);
  });

  it("passes a built collectionBound entry with a complete contentShape", () => {
    const violations = findRegistryShapeViolations([
      makeEntry({
        collectionBound: true,
        componentPath: "src/components/templates/does-not-exist.astro",
        contentShape: {
          minItems: 1,
          maxItems: 4,
          overflow: "wraps to a second row",
        },
      }),
    ]);

    expect(violations).toEqual([]);
  });

  it("exempts an unbuilt collectionBound entry with no contentShape", () => {
    const violations = findRegistryShapeViolations([
      makeEntry({ collectionBound: true, componentPath: null }),
    ]);

    expect(violations).toEqual([]);
  });
});
