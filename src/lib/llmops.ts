/**
 * LLMOps Database domain layer — single source of truth for filtering, sorting,
 * related entries, and taxonomy counts.
 *
 * Mirrors src/lib/blog.ts pattern. All LLMOps listing pages and detail pages
 * import from here to avoid duplicated logic.
 */
import type { CollectionEntry } from "astro:content";
import { getCollection, getEntry } from "astro:content";
import {
  buildRelatedIndex as buildRelatedIndexGeneric,
  type RelatedIndex as GenericRelatedIndex,
  getRelatedFromIndex as getRelatedFromIndexGeneric,
  type RelatedIndexConfig,
  type TaxonomyCount,
} from "./relatedIndex";

export type { TaxonomyCount };

export type LLMOpsEntry = CollectionEntry<"llmops-database">;

let nonDraftCountPromise: Promise<number> | undefined;

export function getNonDraftLlmopsDatabaseCount(): Promise<number> {
  nonDraftCountPromise ??= getCollection(
    "llmops-database",
    ({ data }) => !data.draft,
  ).then((entries) => entries.length);

  return nonDraftCountPromise;
}

// ---------------------------------------------------------------------------
// Filtering & sorting
// ---------------------------------------------------------------------------

/** All published entries, sorted by year descending then title A-Z. */
export async function getAllPublishedEntries(): Promise<LLMOpsEntry[]> {
  const entries = await getCollection(
    "llmops-database",
    ({ data }) => !data.draft,
  );
  return sortByYearDesc(entries);
}

export function sortByYearDesc(entries: LLMOpsEntry[]): LLMOpsEntry[] {
  return [...entries].sort((a, b) => {
    const yearDiff = (b.data.year ?? 0) - (a.data.year ?? 0);
    if (yearDiff !== 0) return yearDiff;
    return a.data.title.localeCompare(b.data.title);
  });
}

export type LLMOpsProvenance = {
  webflow?: {
    lastPublished?: string;
    lastUpdated?: string;
    createdOn?: string;
  };
  notion?: {
    publishedAt?: string;
    lastEditedTime?: string;
    createdTime?: string;
  };
};

/**
 * Derive the date an entry was *added* to the LLMOps DB.
 *
 * Prefers creation timestamps so edits never re-float an entry.
 * Distinct from the floating chain in rss.xml.ts: a feed wants
 * "recently touched", a reference library wants "recently added".
 */
export function deriveAddedDate(data: LLMOpsProvenance): Date | null {
  const candidates = [
    data.notion?.createdTime,
    data.webflow?.createdOn,
    data.notion?.publishedAt,
    data.webflow?.lastPublished,
    data.notion?.lastEditedTime,
    data.webflow?.lastUpdated,
  ];
  for (const raw of candidates) {
    if (!raw) continue;
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Related entries (by shared tags, industry, company)
// ---------------------------------------------------------------------------

/**
 * Pre-computed inverted indexes for O(N) related-entry lookups.
 * Build once via `buildRelatedIndex()`, then call `getRelatedFromIndex()` per entry.
 *
 * The index build + top-k lookup is shared with `mlops.ts` via
 * `./relatedIndex` — both database libs scored an identical +3 tag / +2
 * industry / +1 company shape independently of each other. This file
 * supplies only the field accessors for `LLMOpsEntry`.
 */
export type RelatedIndex = GenericRelatedIndex<LLMOpsEntry>;

const RELATED_CONFIG: RelatedIndexConfig<LLMOpsEntry> = {
  slug: (e) => e.data.slug,
  tags: (e) => e.data.llmopsTags,
  industry: (e) => e.data.industryTags,
  company: (e) => e.data.company,
};

/** Build inverted indexes from all entries — call once in getStaticPaths. */
export function buildRelatedIndex(entries: LLMOpsEntry[]): RelatedIndex {
  return buildRelatedIndexGeneric(entries, RELATED_CONFIG);
}

/** Look up related entries using pre-built index — O(candidates) not O(N). */
export function getRelatedFromIndex(
  index: RelatedIndex,
  current: LLMOpsEntry,
  limit = 3,
): LLMOpsEntry[] {
  return getRelatedFromIndexGeneric(index, current, RELATED_CONFIG, limit);
}

// ---------------------------------------------------------------------------
// Taxonomy counts
// ---------------------------------------------------------------------------

export async function getLLMOpsTagCounts(
  entries: LLMOpsEntry[],
): Promise<TaxonomyCount[]> {
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

export async function getIndustryTagCounts(
  entries: LLMOpsEntry[],
): Promise<TaxonomyCount[]> {
  const countMap = new Map<string, number>();
  for (const e of entries) {
    if (e.data.industryTags) {
      countMap.set(
        e.data.industryTags,
        (countMap.get(e.data.industryTags) || 0) + 1,
      );
    }
  }

  const result: TaxonomyCount[] = [];
  for (const [slug, count] of countMap) {
    const tag = await getEntry("industry-tags", slug);
    if (tag) result.push({ slug, name: tag.data.name, count });
  }
  return result.sort((a, b) => b.count - a.count);
}
