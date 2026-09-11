import { beforeEach, describe, expect, it, vi } from "vitest";

const { getCollectionMock, getEntryMock } = vi.hoisted(() => ({
  getCollectionMock: vi.fn(),
  getEntryMock: vi.fn(),
}));

vi.mock("astro:content", () => ({
  getCollection: getCollectionMock,
  getEntry: getEntryMock,
}));

import {
  deriveMLOpsAddedDate,
  getMLOpsIndustryTagCounts,
  getMLOpsTagCounts,
  type MLOpsEntry,
} from "../../src/lib/mlops";

function fakeEntry(input: {
  slug: string;
  mlopsTags?: string[];
  industryTags: string;
}): MLOpsEntry {
  return {
    data: {
      slug: input.slug,
      title: input.slug,
      mlopsTags: input.mlopsTags ?? [],
      industryTags: input.industryTags,
      draft: false,
    },
  } as unknown as MLOpsEntry;
}

function mockTerms(known: Record<string, string>) {
  getEntryMock.mockImplementation(async (_collection: string, slug: string) =>
    slug in known ? { data: { slug, name: known[slug] } } : undefined,
  );
}

describe("mlops taxonomy counts", () => {
  beforeEach(() => {
    getCollectionMock.mockReset();
    getEntryMock.mockReset();
  });

  it("sorts by count desc, then name A-Z on ties", async () => {
    mockTerms({ serving: "Serving", training: "Training", spark: "Spark" });
    const counts = await getMLOpsTagCounts([
      fakeEntry({
        slug: "a",
        mlopsTags: ["training", "serving"],
        industryTags: "tech",
      }),
      fakeEntry({ slug: "b", mlopsTags: ["spark"], industryTags: "tech" }),
    ]);
    expect(counts.map((t) => [t.slug, t.count])).toEqual([
      ["serving", 1],
      ["spark", 1],
      ["training", 1],
    ]);
  });

  it("counts the required industry on every entry", async () => {
    mockTerms({ tech: "Tech", finance: "Finance" });
    const counts = await getMLOpsIndustryTagCounts([
      fakeEntry({ slug: "a", industryTags: "finance" }),
      fakeEntry({ slug: "b", industryTags: "tech" }),
      fakeEntry({ slug: "c", industryTags: "finance" }),
    ]);
    expect(counts.map((t) => [t.slug, t.name, t.count])).toEqual([
      ["finance", "Finance", 2],
      ["tech", "Tech", 1],
    ]);
  });

  it("drops a slug that resolves to no taxonomy entry", async () => {
    mockTerms({ tech: "Tech" });
    const counts = await getMLOpsIndustryTagCounts([
      fakeEntry({ slug: "a", industryTags: "ghost" }),
      fakeEntry({ slug: "b", industryTags: "tech" }),
    ]);
    expect(counts.map((t) => t.slug)).toEqual(["tech"]);
  });
});

describe("deriveMLOpsAddedDate", () => {
  it("prefers createdAt, then lastUpdated, then exportedAt", () => {
    expect(
      deriveMLOpsAddedDate({
        mlops: {
          lastUpdated: "2025-02-01T00:00:00Z",
          exportedAt: "2025-03-01T00:00:00Z",
        },
      })?.toISOString(),
    ).toBe("2025-02-01T00:00:00.000Z");
    expect(
      deriveMLOpsAddedDate({
        mlops: { exportedAt: "2025-03-01T00:00:00Z" },
      })?.toISOString(),
    ).toBe("2025-03-01T00:00:00.000Z");
  });

  it("returns null without provenance", () => {
    expect(deriveMLOpsAddedDate({})).toBeNull();
    expect(deriveMLOpsAddedDate({ mlops: {} })).toBeNull();
  });
});
