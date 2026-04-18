/**
 * MLOps Database domain layer — single source of truth for filtering, sorting,
 * related entries, dates, and taxonomy counts.
 */
import type { CollectionEntry } from "astro:content";
import { getCollection, getEntry } from "astro:content";

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

export interface MLOpsRelatedIndex {
  byTag: Map<string, Set<string>>;
  byIndustry: Map<string, Set<string>>;
  byCompany: Map<string, Set<string>>;
  entryMap: Map<string, MLOpsEntry>;
}

export function buildMLOpsRelatedIndex(
  entries: MLOpsEntry[],
): MLOpsRelatedIndex {
  const byTag = new Map<string, Set<string>>();
  const byIndustry = new Map<string, Set<string>>();
  const byCompany = new Map<string, Set<string>>();
  const entryMap = new Map<string, MLOpsEntry>();

  for (const entry of entries) {
    const slug = entry.data.slug;
    entryMap.set(slug, entry);

    for (const tag of entry.data.mlopsTags) {
      let set = byTag.get(tag);
      if (!set) {
        set = new Set();
        byTag.set(tag, set);
      }
      set.add(slug);
    }

    let industrySet = byIndustry.get(entry.data.industryTags);
    if (!industrySet) {
      industrySet = new Set();
      byIndustry.set(entry.data.industryTags, industrySet);
    }
    industrySet.add(slug);

    let companySet = byCompany.get(entry.data.company);
    if (!companySet) {
      companySet = new Set();
      byCompany.set(entry.data.company, companySet);
    }
    companySet.add(slug);
  }

  return { byTag, byIndustry, byCompany, entryMap };
}

export function getMLOpsRelatedFromIndex(
  index: MLOpsRelatedIndex,
  current: MLOpsEntry,
  limit = 3,
): MLOpsEntry[] {
  const currentSlug = current.data.slug;
  const scores = new Map<string, number>();

  for (const tag of current.data.mlopsTags) {
    const peers = index.byTag.get(tag);
    if (!peers) continue;
    for (const slug of peers) {
      if (slug !== currentSlug) scores.set(slug, (scores.get(slug) || 0) + 3);
    }
  }

  const industryPeers = index.byIndustry.get(current.data.industryTags);
  if (industryPeers) {
    for (const slug of industryPeers) {
      if (slug !== currentSlug) scores.set(slug, (scores.get(slug) || 0) + 2);
    }
  }

  const companyPeers = index.byCompany.get(current.data.company);
  if (companyPeers) {
    for (const slug of companyPeers) {
      if (slug !== currentSlug) scores.set(slug, (scores.get(slug) || 0) + 1);
    }
  }

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

  return topK
    .map(({ slug }) => index.entryMap.get(slug))
    .filter((entry): entry is MLOpsEntry => Boolean(entry));
}

// ---------------------------------------------------------------------------
// Taxonomy counts
// ---------------------------------------------------------------------------

export type TaxonomyCount = { slug: string; name: string; count: number };

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
