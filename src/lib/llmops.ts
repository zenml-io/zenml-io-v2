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

/**
 * Pre-computed inverted indexes for O(N) related-entry lookups.
 * Build once via `buildRelatedIndex()`, then call `getRelatedFromIndex()` per entry.
 */
export interface RelatedIndex {
  byTag: Map<string, Set<string>>;       // tag slug → set of entry slugs
  byIndustry: Map<string, Set<string>>;  // industry slug → set of entry slugs
  byCompany: Map<string, Set<string>>;   // company name → set of entry slugs
  entryMap: Map<string, LLMOpsEntry>;    // slug → entry (for lookup)
}

/** Build inverted indexes from all entries — call once in getStaticPaths. */
export function buildRelatedIndex(entries: LLMOpsEntry[]): RelatedIndex {
  const byTag = new Map<string, Set<string>>();
  const byIndustry = new Map<string, Set<string>>();
  const byCompany = new Map<string, Set<string>>();
  const entryMap = new Map<string, LLMOpsEntry>();

  for (const e of entries) {
    const slug = e.data.slug;
    entryMap.set(slug, e);

    for (const tag of e.data.llmopsTags) {
      let set = byTag.get(tag);
      if (!set) { set = new Set(); byTag.set(tag, set); }
      set.add(slug);
    }
    if (e.data.industryTags) {
      let set = byIndustry.get(e.data.industryTags);
      if (!set) { set = new Set(); byIndustry.set(e.data.industryTags, set); }
      set.add(slug);
    }
    if (e.data.company) {
      let set = byCompany.get(e.data.company);
      if (!set) { set = new Set(); byCompany.set(e.data.company, set); }
      set.add(slug);
    }
  }

  return { byTag, byIndustry, byCompany, entryMap };
}

/** Look up related entries using pre-built index — O(candidates) not O(N). */
export function getRelatedFromIndex(
  index: RelatedIndex,
  current: LLMOpsEntry,
  limit = 3,
): LLMOpsEntry[] {
  const currentSlug = current.data.slug;
  const scores = new Map<string, number>();

  // +3 per shared tag — only visit entries that share at least one tag
  for (const tag of current.data.llmopsTags) {
    const peers = index.byTag.get(tag);
    if (peers) {
      for (const slug of peers) {
        if (slug !== currentSlug) scores.set(slug, (scores.get(slug) || 0) + 3);
      }
    }
  }
  // +2 for same industry
  if (current.data.industryTags) {
    const peers = index.byIndustry.get(current.data.industryTags);
    if (peers) {
      for (const slug of peers) {
        if (slug !== currentSlug) scores.set(slug, (scores.get(slug) || 0) + 2);
      }
    }
  }
  // +1 for same company
  if (current.data.company) {
    const peers = index.byCompany.get(current.data.company);
    if (peers) {
      for (const slug of peers) {
        if (slug !== currentSlug) scores.set(slug, (scores.get(slug) || 0) + 1);
      }
    }
  }

  // Top-k selection: keep only the top `limit` entries without sorting everything
  const topK: { slug: string; score: number }[] = [];
  for (const [slug, score] of scores) {
    if (topK.length < limit) {
      topK.push({ slug, score });
      if (topK.length === limit) topK.sort((a, b) => b.score - a.score);
    } else if (score > topK[limit - 1].score) {
      topK[limit - 1] = { slug, score };
      topK.sort((a, b) => b.score - a.score);
    }
  }

  return topK.map(({ slug }) => index.entryMap.get(slug)!);
}

/** @deprecated Use buildRelatedIndex + getRelatedFromIndex for batch lookups. */
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
