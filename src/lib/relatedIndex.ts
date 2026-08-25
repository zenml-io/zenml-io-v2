/**
 * Shared "related entries by tag/industry/company" scoring, factored out of
 * `llmops.ts` and `mlops.ts`, which declared the identical inverted-index
 * build + top-k lookup independently of each other (issue #249).
 *
 * `blog.ts`'s `getRelatedPosts` scores a different shape (tags + category,
 * no company axis, no pre-built index, date-desc tie-break instead of
 * title A-Z) and is not migrated onto this — merging it would change its
 * output, and this module only ever reproduces existing behavior byte for
 * byte.
 */

export type TaxonomyCount = { slug: string; name: string; count: number };

export interface RelatedIndex<TEntry> {
  byTag: Map<string, Set<string>>;
  byIndustry: Map<string, Set<string>>;
  byCompany: Map<string, Set<string>>;
  entryMap: Map<string, TEntry>;
}

/** Field accessors for one entry type — lets one implementation serve both LLMOps and MLOps entries. */
export interface RelatedIndexConfig<TEntry> {
  slug: (entry: TEntry) => string;
  tags: (entry: TEntry) => readonly string[];
  /** Undefined means "no industry" — the entry is simply absent from `byIndustry`. */
  industry: (entry: TEntry) => string | undefined;
  /** Undefined means "no company" — the entry is simply absent from `byCompany`. */
  company: (entry: TEntry) => string | undefined;
}

/** Build inverted indexes from all entries — call once in getStaticPaths. */
export function buildRelatedIndex<TEntry>(
  entries: readonly TEntry[],
  config: RelatedIndexConfig<TEntry>,
): RelatedIndex<TEntry> {
  const byTag = new Map<string, Set<string>>();
  const byIndustry = new Map<string, Set<string>>();
  const byCompany = new Map<string, Set<string>>();
  const entryMap = new Map<string, TEntry>();

  for (const entry of entries) {
    const slug = config.slug(entry);
    entryMap.set(slug, entry);

    for (const tag of config.tags(entry)) {
      let set = byTag.get(tag);
      if (!set) {
        set = new Set();
        byTag.set(tag, set);
      }
      set.add(slug);
    }

    const industry = config.industry(entry);
    if (industry) {
      let set = byIndustry.get(industry);
      if (!set) {
        set = new Set();
        byIndustry.set(industry, set);
      }
      set.add(slug);
    }

    const company = config.company(entry);
    if (company) {
      let set = byCompany.get(company);
      if (!set) {
        set = new Set();
        byCompany.set(company, set);
      }
      set.add(slug);
    }
  }

  return { byTag, byIndustry, byCompany, entryMap };
}

/**
 * Look up related entries using a pre-built index — O(candidates), not
 * O(N). Scoring: +3 per shared tag, +2 for the same industry, +1 for the
 * same company. Returns the top `limit` entries, highest score first.
 */
export function getRelatedFromIndex<TEntry>(
  index: RelatedIndex<TEntry>,
  current: TEntry,
  config: RelatedIndexConfig<TEntry>,
  limit = 3,
): TEntry[] {
  const currentSlug = config.slug(current);
  const scores = new Map<string, number>();

  for (const tag of config.tags(current)) {
    const peers = index.byTag.get(tag);
    if (peers) {
      for (const slug of peers) {
        if (slug !== currentSlug) scores.set(slug, (scores.get(slug) || 0) + 3);
      }
    }
  }

  const industry = config.industry(current);
  if (industry) {
    const peers = index.byIndustry.get(industry);
    if (peers) {
      for (const slug of peers) {
        if (slug !== currentSlug) scores.set(slug, (scores.get(slug) || 0) + 2);
      }
    }
  }

  const company = config.company(current);
  if (company) {
    const peers = index.byCompany.get(company);
    if (peers) {
      for (const slug of peers) {
        if (slug !== currentSlug) scores.set(slug, (scores.get(slug) || 0) + 1);
      }
    }
  }

  // Top-k selection: keep only the top `limit` entries without sorting everything.
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

  return topK.flatMap(({ slug }) => {
    const entry = index.entryMap.get(slug);
    return entry ? [entry] : [];
  });
}
