import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { CATEGORY_ORDER, HUB_CARDS } from "../../src/lib/features";

/**
 * Pins the features hub against the feature-page collection: the seven hub
 * cards cover CATEGORY_ORDER exactly once each, every card links to a
 * published feature page, and every feature page's hub.category is one of
 * the ordered categories. A restyle of the hub grid must not move any of
 * these facts.
 */
const FEATURE_PAGES_DIR = join(process.cwd(), "src/content/feature-pages");

interface FeaturePageFrontmatter {
  slug: string;
  draft?: boolean;
  hub: { title: string; category: string };
}

const featurePages = readdirSync(FEATURE_PAGES_DIR)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const { data } = matter(
      readFileSync(join(FEATURE_PAGES_DIR, file), "utf8"),
    );
    return data as FeaturePageFrontmatter;
  })
  .filter((page) => !page.draft);

describe("features hub cards", () => {
  it("has exactly one card per CATEGORY_ORDER entry, in that order", () => {
    expect(HUB_CARDS.map((card) => card.category)).toEqual([...CATEGORY_ORDER]);
  });

  it("links every card to a published feature page", () => {
    const slugs = new Set(featurePages.map((page) => page.slug));
    for (const card of HUB_CARDS) {
      expect(slugs.has(card.slug), `no feature page for ${card.slug}`).toBe(
        true,
      );
    }
  });

  it("covers twelve published feature pages whose categories are all in CATEGORY_ORDER", () => {
    expect(featurePages).toHaveLength(12);
    const categories = new Set<string>(CATEGORY_ORDER);
    for (const page of featurePages) {
      expect(
        categories.has(page.hub.category),
        `${page.slug} has category ${page.hub.category}`,
      ).toBe(true);
    }
  });
});
