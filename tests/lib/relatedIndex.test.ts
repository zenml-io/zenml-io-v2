import { describe, expect, it } from "vitest";
import {
  buildRelatedIndex,
  filterUsedTerms,
  getRelatedFromIndex,
  type RelatedIndexConfig,
} from "../../src/lib/relatedIndex";

interface FakeEntry {
  slug: string;
  tags: string[];
  industry?: string;
  company?: string;
}

const config: RelatedIndexConfig<FakeEntry> = {
  slug: (e) => e.slug,
  tags: (e) => e.tags,
  industry: (e) => e.industry,
  company: (e) => e.company,
};

function entry(
  slug: string,
  tags: string[],
  industry?: string,
  company?: string,
): FakeEntry {
  return { slug, tags, industry, company };
}

describe("buildRelatedIndex", () => {
  it("builds one inverted index per axis and an entry map by slug", () => {
    const a = entry("a", ["rag", "openai"], "finance", "Acme");
    const b = entry("b", ["rag"], "tech");
    const index = buildRelatedIndex([a, b], config);

    expect([...index.byTag.get("rag")!]).toEqual(["a", "b"]);
    expect([...index.byTag.get("openai")!]).toEqual(["a"]);
    expect([...index.byIndustry.get("finance")!]).toEqual(["a"]);
    expect([...index.byCompany.get("Acme")!]).toEqual(["a"]);
    expect(index.byCompany.has("undefined")).toBe(false);
    expect(index.entryMap.get("b")).toBe(b);
  });

  it("leaves an entry out of the industry/company indexes when it has none", () => {
    const index = buildRelatedIndex([entry("solo", ["rag"])], config);
    expect(index.byIndustry.size).toBe(0);
    expect(index.byCompany.size).toBe(0);
    expect(index.byTag.get("rag")?.has("solo")).toBe(true);
  });
});

describe("getRelatedFromIndex", () => {
  const current = entry("current", ["rag", "openai"], "finance", "Acme");
  // Scores against `current`: +3 per shared tag, +2 same industry, +1 same company.
  const twoTags = entry("two-tags", ["rag", "openai"], "tech"); // 6
  const tagAndIndustry = entry("tag-industry", ["rag"], "finance"); // 5
  const industryAndCompany = entry("ind-co", ["other"], "finance", "Acme"); // 3
  const companyOnly = entry("co", ["other"], "tech", "Acme"); // 1
  const unrelated = entry("none", ["other"], "tech", "Other");
  const all = [
    current,
    unrelated,
    companyOnly,
    industryAndCompany,
    tagAndIndustry,
    twoTags,
  ];

  it("scores +3 per shared tag, +2 same industry, +1 same company and ranks highest first", () => {
    const index = buildRelatedIndex(all, config);
    const related = getRelatedFromIndex(index, current, config, 10);
    expect(related.map((e) => e.slug)).toEqual([
      "two-tags",
      "tag-industry",
      "ind-co",
      "co",
    ]);
  });

  it("never returns the current entry and drops entries with no overlap", () => {
    const index = buildRelatedIndex(all, config);
    const slugs = getRelatedFromIndex(index, current, config, 10).map(
      (e) => e.slug,
    );
    expect(slugs).not.toContain("current");
    expect(slugs).not.toContain("none");
  });

  it("caps the result at `limit` (default 3) keeping the top scores", () => {
    const index = buildRelatedIndex(all, config);
    expect(
      getRelatedFromIndex(index, current, config).map((e) => e.slug),
    ).toEqual(["two-tags", "tag-industry", "ind-co"]);
    expect(
      getRelatedFromIndex(index, current, config, 1).map((e) => e.slug),
    ).toEqual(["two-tags"]);
  });

  it("returns an empty list when nothing shares a tag, industry or company", () => {
    const index = buildRelatedIndex([current, unrelated], config);
    expect(getRelatedFromIndex(index, current, config)).toEqual([]);
  });

  it("scores an entry with no industry or company on tags alone", () => {
    const bare = entry("bare", ["rag"]);
    const index = buildRelatedIndex([current, bare], config);
    expect(
      getRelatedFromIndex(index, current, config).map((e) => e.slug),
    ).toEqual(["bare"]);
  });
});

describe("filterUsedTerms", () => {
  it("drops zero-count terms and keeps the input order", () => {
    const terms = [
      { slug: "a", name: "A", count: 2 },
      { slug: "b", name: "B", count: 0 },
      { slug: "c", name: "C", count: 1 },
    ];
    expect(filterUsedTerms(terms).map((t) => t.slug)).toEqual(["a", "c"]);
  });

  it("does not mutate the input", () => {
    const terms = [{ slug: "b", name: "B", count: 0 }];
    filterUsedTerms(terms);
    expect(terms).toHaveLength(1);
  });
});
