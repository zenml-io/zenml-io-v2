import { describe, expect, it } from "vitest";
import {
  CARDS_BEFORE_BANNER,
  orderCaseStudies,
  siblingCaseStudies,
  splitAtBanner,
} from "../../src/lib/case-studies";

const entry = (slug: string, order?: number) => ({
  data: { slug, hub: { order } },
});

describe("orderCaseStudies", () => {
  it("sorts by hub order and leaves the input untouched", () => {
    const input = [entry("c", 3), entry("a", 1), entry("b", 2)];
    expect(orderCaseStudies(input).map((e) => e.data.slug)).toEqual([
      "a",
      "b",
      "c",
    ]);
    expect(input.map((e) => e.data.slug)).toEqual(["c", "a", "b"]);
  });

  it("sorts entries with no order to the end", () => {
    const ordered = orderCaseStudies([entry("none"), entry("first", 1)]);
    expect(ordered.map((e) => e.data.slug)).toEqual(["first", "none"]);
  });
});

describe("splitAtBanner", () => {
  it("puts a full row before the banner and the rest after", () => {
    const { before, after } = splitAtBanner([1, 2, 3, 4, 5]);
    expect(before).toEqual([1, 2, 3]);
    expect(after).toEqual([4, 5]);
  });

  it("keeps the banner between rows when there are fewer cards than a row", () => {
    expect(splitAtBanner([1, 2])).toEqual({ before: [1, 2], after: [] });
    expect(splitAtBanner([])).toEqual({ before: [], after: [] });
  });

  it("does not grow the first row past the banner as entries are added", () => {
    const { before, after } = splitAtBanner([1, 2, 3, 4, 5, 6, 7]);
    expect(before).toHaveLength(CARDS_BEFORE_BANNER);
    expect(after).toEqual([4, 5, 6, 7]);
  });
});

describe("siblingCaseStudies", () => {
  it("drops the current entry and returns the rest in hub order", () => {
    const all = [entry("c", 3), entry("a", 1), entry("b", 2)];
    expect(siblingCaseStudies(all, "b").map((e) => e.data.slug)).toEqual([
      "a",
      "c",
    ]);
  });

  it("returns nothing when the collection holds only that entry", () => {
    expect(siblingCaseStudies([entry("only", 1)], "only")).toEqual([]);
  });
});
