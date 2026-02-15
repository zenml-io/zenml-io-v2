/**
 * LLMOps Database domain layer — single source of truth for filtering, sorting,
 * related entries, and taxonomy counts.
 *
 * Mirrors src/lib/blog.ts pattern. All LLMOps listing pages and detail pages
 * import from here to avoid duplicated logic.
 */
import type { CollectionEntry } from "astro:content";
import { getCollection, getEntry } from "astro:content";

export type LLMOpsEntry = CollectionEntry<"llmops-database">;

// ---------------------------------------------------------------------------
// Filtering & sorting
// ---------------------------------------------------------------------------

/** All published entries, sorted by year descending then title A-Z. */
export async function getAllPublishedEntries(): Promise<LLMOpsEntry[]> {
  const entries = await getCollection("llmops-database", ({ data }) => !data.draft);
  return sortByYearDesc(entries);
}

export function sortByYearDesc(entries: LLMOpsEntry[]): LLMOpsEntry[] {
  return [...entries].sort((a, b) => {
    const yearDiff = (b.data.year ?? 0) - (a.data.year ?? 0);
    if (yearDiff !== 0) return yearDiff;
    return a.data.title.localeCompare(b.data.title);
  });
}

// ---------------------------------------------------------------------------
// Related entries (by shared tags, industry, company)
// ---------------------------------------------------------------------------

export function getRelatedEntries(
  allEntries: LLMOpsEntry[],
  current: LLMOpsEntry,
  limit = 3,
): LLMOpsEntry[] {
  const currentTags = new Set(current.data.llmopsTags);
  const currentIndustry = current.data.industryTags;
  const currentCompany = current.data.company;

  const scored = allEntries
    .filter((e) => e.data.slug !== current.data.slug)
    .map((e) => {
      let score = 0;
      // +3 per shared tag
      for (const tag of e.data.llmopsTags) {
        if (currentTags.has(tag)) score += 3;
      }
      // +2 for same industry
      if (currentIndustry && e.data.industryTags === currentIndustry) score += 2;
      // +1 for same company
      if (currentCompany && e.data.company === currentCompany) score += 1;
      return { entry: e, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.data.title.localeCompare(b.entry.data.title));

  return scored.slice(0, limit).map(({ entry }) => entry);
}

// ---------------------------------------------------------------------------
// Taxonomy counts
// ---------------------------------------------------------------------------

export type TaxonomyCount = { slug: string; name: string; count: number };

export async function getLLMOpsTagCounts(entries: LLMOpsEntry[]): Promise<TaxonomyCount[]> {
  const countMap = new Map<string, number>();
  for (const e of entries) {
    for (const tag of e.data.llmopsTags) {
      countMap.set(tag, (countMap.get(tag) || 0) + 1);
    }
  }

  const result: TaxonomyCount[] = [];
  for (const [slug, count] of countMap) {
    const tag = await getEntry("llmops-tags", slug);
    if (tag) result.push({ slug, name: tag.data.name, count });
  }
  return result.sort((a, b) => b.count - a.count);
}

export async function getIndustryTagCounts(entries: LLMOpsEntry[]): Promise<TaxonomyCount[]> {
  const countMap = new Map<string, number>();
  for (const e of entries) {
    if (e.data.industryTags) {
      countMap.set(e.data.industryTags, (countMap.get(e.data.industryTags) || 0) + 1);
    }
  }

  const result: TaxonomyCount[] = [];
  for (const [slug, count] of countMap) {
    const tag = await getEntry("industry-tags", slug);
    if (tag) result.push({ slug, name: tag.data.name, count });
  }
  return result.sort((a, b) => b.count - a.count);
}
