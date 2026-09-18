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
  deriveAddedDate,
  getIndustryTagCounts,
  getLLMOpsTagCounts,
  type LLMOpsEntry,
  sortByYearDesc,
} from "../../src/lib/llmops";

function fakeEntry(input: {
  slug: string;
  title?: string;
  year?: number;
  llmopsTags?: string[];
  industryTags?: string;
  company?: string;
}): LLMOpsEntry {
  return {
    data: {
      slug: input.slug,
      title: input.title ?? input.slug,
      year: input.year,
      llmopsTags: input.llmopsTags ?? [],
      industryTags: input.industryTags,
      company: input.company,
      draft: false,
    },
  } as unknown as LLMOpsEntry;
}

/** `getEntry(collection, slug)` resolves to a term whose name is the slug in Title Case; unknown slugs resolve to undefined. */
function mockTerms(known: Record<string, string>) {
  getEntryMock.mockImplementation(async (_collection: string, slug: string) =>
    slug in known ? { data: { slug, name: known[slug] } } : undefined,
  );
}

describe("llmops taxonomy counts", () => {
  beforeEach(() => {
    getCollectionMock.mockReset();
    getEntryMock.mockReset();
  });

  it("counts tag occurrences across entries, resolves names and sorts by count desc", async () => {
    mockTerms({ rag: "RAG", openai: "OpenAI", agents: "Agents" });
    const counts = await getLLMOpsTagCounts([
      fakeEntry({ slug: "a", llmopsTags: ["rag", "openai"] }),
      fakeEntry({ slug: "b", llmopsTags: ["rag"] }),
      fakeEntry({ slug: "c", llmopsTags: ["rag", "agents"] }),
    ]);
    expect(counts.map((t) => [t.slug, t.name, t.count])).toEqual([
      ["rag", "RAG", 3],
      ["openai", "OpenAI", 1],
      ["agents", "Agents", 1],
    ]);
  });

  it("drops a tag slug that resolves to no taxonomy entry", async () => {
    mockTerms({ rag: "RAG" });
    const counts = await getLLMOpsTagCounts([
      fakeEntry({ slug: "a", llmopsTags: ["rag", "ghost"] }),
    ]);
    expect(counts.map((t) => t.slug)).toEqual(["rag"]);
  });

  it("counts industries and skips entries with no industry", async () => {
    mockTerms({ finance: "Finance", tech: "Tech" });
    const counts = await getIndustryTagCounts([
      fakeEntry({ slug: "a", industryTags: "tech" }),
      fakeEntry({ slug: "b", industryTags: "tech" }),
      fakeEntry({ slug: "c", industryTags: "finance" }),
      fakeEntry({ slug: "d" }),
    ]);
    expect(counts.map((t) => [t.slug, t.count])).toEqual([
      ["tech", 2],
      ["finance", 1],
    ]);
  });

  it("returns an empty list for no entries", async () => {
    expect(await getLLMOpsTagCounts([])).toEqual([]);
    expect(await getIndustryTagCounts([])).toEqual([]);
  });
});

describe("sortByYearDesc", () => {
  it("sorts newest year first, title A-Z within a year, and treats a missing year as oldest", () => {
    const sorted = sortByYearDesc([
      fakeEntry({ slug: "b-2024", title: "Beta", year: 2024 }),
      fakeEntry({ slug: "no-year", title: "Zulu" }),
      fakeEntry({ slug: "a-2024", title: "Alpha", year: 2024 }),
      fakeEntry({ slug: "x-2025", title: "Xray", year: 2025 }),
    ]);
    expect(sorted.map((e) => e.data.slug)).toEqual([
      "x-2025",
      "a-2024",
      "b-2024",
      "no-year",
    ]);
  });

  it("does not mutate the input array", () => {
    const input = [
      fakeEntry({ slug: "old", year: 2020 }),
      fakeEntry({ slug: "new", year: 2025 }),
    ];
    sortByYearDesc(input);
    expect(input.map((e) => e.data.slug)).toEqual(["old", "new"]);
  });
});

describe("deriveAddedDate", () => {
  it("prefers creation timestamps: notion.createdTime before webflow.createdOn", () => {
    expect(
      deriveAddedDate({
        notion: { createdTime: "2026-01-02T00:00:00Z" },
        webflow: { createdOn: "2025-01-02T00:00:00Z" },
      })?.toISOString(),
    ).toBe("2026-01-02T00:00:00.000Z");
  });

  it("falls through the chain past an unparseable value", () => {
    expect(
      deriveAddedDate({
        notion: { createdTime: "not a date" },
        webflow: { lastPublished: "2025-06-01T00:00:00Z" },
      })?.toISOString(),
    ).toBe("2025-06-01T00:00:00.000Z");
  });

  it("returns null when no provenance timestamp exists", () => {
    expect(deriveAddedDate({})).toBeNull();
  });
});
