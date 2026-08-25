/**
 * MLOps Database domain layer — single source of truth for filtering, sorting,
 * related entries, dates, and taxonomy counts.
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

export type MLOpsEntry = CollectionEntry<"mlops-database">;

// ---------------------------------------------------------------------------
// Filtering & sorting
// ---------------------------------------------------------------------------

/** All published MLOps entries, sorted by year descending then title A-Z. */
export async function getAllPublishedMLOpsEntries(): Promise<MLOpsEntry[]> {
  const entries = await getCollection(
    "mlops-database",
    ({ data }) => !data.draft,
  );
  return sortMLOpsByYearDesc(entries);
}

export function sortMLOpsByYearDesc(entries: MLOpsEntry[]): MLOpsEntry[] {
  return [...entries].sort((a, b) => {
    const yearDiff = (b.data.year ?? 0) - (a.data.year ?? 0);
    if (yearDiff !== 0) return yearDiff;
    return a.data.title.localeCompare(b.data.title);
  });
}

export type MLOpsProvenance = {
  mlops?: {
    createdAt?: string;
    lastUpdated?: string;
    exportedAt?: string;
  };
};

/**
 * Derive the date an entry was added to the MLOps DB.
 *
 * Prefer creation timestamps so exporter reruns do not re-float old entries.
 * RSS uses a separate freshness-oriented fallback chain.
 */
export function deriveMLOpsAddedDate(data: MLOpsProvenance): Date | null {
  const candidates = [
    data.mlops?.createdAt,
    data.mlops?.lastUpdated,
    data.mlops?.exportedAt,
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
 * The index build + top-k lookup is shared with `llmops.ts` via
 * `./relatedIndex` — both database libs scored an identical +3 tag / +2
 * industry / +1 company shape independently of each other. This file
 * supplies only the field accessors for `MLOpsEntry`.
 */
export type MLOpsRelatedIndex = GenericRelatedIndex<MLOpsEntry>;

const RELATED_CONFIG: RelatedIndexConfig<MLOpsEntry> = {
  slug: (e) => e.data.slug,
  tags: (e) => e.data.mlopsTags,
  industry: (e) => e.data.industryTags,
  company: (e) => e.data.company,
};

export function buildMLOpsRelatedIndex(
  entries: MLOpsEntry[],
): MLOpsRelatedIndex {
  return buildRelatedIndexGeneric(entries, RELATED_CONFIG);
}

export function getMLOpsRelatedFromIndex(
  index: MLOpsRelatedIndex,
  current: MLOpsEntry,
  limit = 3,
): MLOpsEntry[] {
  return getRelatedFromIndexGeneric(index, current, RELATED_CONFIG, limit);
}

// ---------------------------------------------------------------------------
// Taxonomy counts
// ---------------------------------------------------------------------------

export async function getMLOpsTagCounts(
  entries: MLOpsEntry[],
): Promise<TaxonomyCount[]> {
  const countMap = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.data.mlopsTags) {
      countMap.set(tag, (countMap.get(tag) || 0) + 1);
    }
  }

  const result: TaxonomyCount[] = [];
  for (const [slug, count] of countMap) {
    const tag = await getEntry("mlops-tags", slug);
    if (tag) result.push({ slug, name: tag.data.name, count });
  }

  return result.sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}

export async function getMLOpsIndustryTagCounts(
  entries: MLOpsEntry[],
): Promise<TaxonomyCount[]> {
  const countMap = new Map<string, number>();
  for (const entry of entries) {
    countMap.set(
      entry.data.industryTags,
      (countMap.get(entry.data.industryTags) || 0) + 1,
    );
  }

  const result: TaxonomyCount[] = [];
  for (const [slug, count] of countMap) {
    const tag = await getEntry("industry-tags", slug);
    if (tag) result.push({ slug, name: tag.data.name, count });
  }

  return result.sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}
