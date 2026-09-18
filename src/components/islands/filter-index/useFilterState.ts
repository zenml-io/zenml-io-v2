/**
 * useFilterState — the shared state engine behind every FilterIndex
 * instance: fetch-or-provided items, a pluggable search adapter (Pagefind /
 * substring / none), single + multi facet counting, any number of extra
 * single-select facets, optional sort, optional pagination, URL state sync,
 * the zero-results "drop one constraint" offers, and the mobile-drawer a11y
 * wiring (escape-to-close, focus restore, inert background, scroll lock).
 *
 * This is the "12-hook state block" both legacy filter islands carried
 * near-identically — one home for it now, generic over the item shape `T`.
 */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { createPagefindAdapter } from "./pagefind";
import type {
  FilterOption,
  MultiFacetConfig,
  SingleFacetConfig,
  TagMode,
} from "./types";
import {
  type FilterUrlKeys,
  parseFilterStateFromUrl,
  writeFilterStateToUrl,
} from "./urlState";

export type SortMode = "newest" | "az" | "relevance";

export interface SearchConfig<T> {
  mode: "pagefind" | "substring" | "none";
  /** Required when mode is "pagefind". e.g. "/llmops-database/". */
  pagefindBasePath?: string;
  /** Required when mode is "pagefind". e.g. "[LLMOps]". */
  pagefindDebugLabel?: string;
  getSearchText?: (item: T) => string;
  scoreRelevance?: (item: T, q: string) => number;
  placeholder?: string;
  ariaLabel?: string;
}

export interface SortConfig<T> {
  compareNewest: (a: T, b: T) => number;
  defaultValue?: SortMode;
}

export interface UseFilterStateOptions<T> {
  idPrefix: string;
  pageSize?: number;
  dataUrl?: string;
  items?: T[];
  getSlug: (item: T) => string;
  getTitle: (item: T) => string;
  search: SearchConfig<T>;
  sort?: SortConfig<T>;
  singleFacet?: SingleFacetConfig<T>;
  /**
   * Additional single-select facets beyond `singleFacet`, each with its own
   * URL param (the MLOps database's "Content type" → `?type=`). An instance
   * that passes none behaves exactly as it did before this existed.
   */
  extraSingleFacets?: SingleFacetConfig<T>[];
  multiFacet?: MultiFacetConfig<T>;
  /** Noun for the result count / status line. Default "entries". */
  resultNounPlural?: string;
}

/** One active filter, named for the zero-results copy. */
export interface FilterConstraint {
  /** Display name — a facet value's own name, or the query in quotes. */
  label: string;
}

/**
 * One "drop this constraint and results come back" offer: the same query
 * with exactly one constraint removed, and how many entries that returns.
 */
export interface DropOneSuggestion {
  label: string;
  count: number;
  apply: () => void;
}

function matchesSubstring(searchText: string | undefined, q: string): boolean {
  if (!q) return true;
  return (searchText ?? "").includes(q.toLowerCase());
}

/** A facet value's display name, falling back to the slug. */
function optionName(options: FilterOption[] | undefined, slug: string): string {
  return options?.find((option) => option.slug === slug)?.name ?? slug;
}

export function useFilterState<T>(options: UseFilterStateOptions<T>) {
  const {
    idPrefix,
    pageSize,
    dataUrl,
    items: providedItems,
    getSlug,
    getTitle,
    search,
    sort,
    singleFacet,
    extraSingleFacets,
    multiFacet,
    resultNounPlural = "entries",
  } = options;

  const extraFacets = extraSingleFacets ?? [];
  const extraParams = extraFacets.map((facet) => facet.urlParam);

  const isFetchMode = dataUrl !== undefined;

  const [items, setItems] = useState<T[]>(providedItems ?? []);
  const [loading, setLoading] = useState(isFetchMode);
  const [error, setError] = useState<string | null>(null);

  // Precompute search text once per item so substring matching is O(1) string search.
  const searchTextOf = useMemo(() => {
    const map = new WeakMap<object, string>();
    return (item: T): string => {
      if (typeof item !== "object" || item === null) {
        return search.getSearchText?.(item) ?? "";
      }
      const cached = map.get(item as object);
      if (cached !== undefined) return cached;
      const computed = (search.getSearchText?.(item) ?? "").toLowerCase();
      map.set(item as object, computed);
      return computed;
    };
  }, [search]);

  const urlKeys: FilterUrlKeys = useMemo(
    () => ({
      search: search.mode !== "none" ? "q" : undefined,
      single: singleFacet ? singleFacet.urlParam : undefined,
      multi: multiFacet ? multiFacet.urlParam : undefined,
      tagMode: multiFacet ? "tagMode" : undefined,
      page: pageSize !== undefined ? "page" : undefined,
      sort: sort ? "sort" : undefined,
      extras: extraParams.length ? extraParams : undefined,
    }),
    [search.mode, singleFacet, multiFacet, pageSize, sort, extraParams.join()],
  );

  const defaultSort: SortMode = sort?.defaultValue ?? "newest";
  const sortValues: SortMode[] = ["newest", "az", "relevance"];

  // SSR can never read a visitor's query string. Seed the client with that
  // exact empty state too, then apply URL filters in the mount effect below.
  // Otherwise /blog?q=<no-match> hydrates directly onto an empty result
  // region that did not exist in the server HTML.
  const initial = useMemo(
    () => ({
      q: "",
      single: "",
      multi: [],
      page: 1,
      tagMode: "and" as TagMode,
      sort: defaultSort,
      extras: extraParams.length
        ? Object.fromEntries(extraParams.map((key) => [key, ""]))
        : undefined,
    }),
    [defaultSort, extraParams.join()],
  );

  const [query, setQuery] = useState(initial.q);
  const [selectedMulti, setSelectedMulti] = useState<string[]>(initial.multi);
  const [selectedSingle, setSelectedSingle] = useState(initial.single);
  const [selectedExtra, setSelectedExtra] = useState<Record<string, string>>(
    initial.extras ?? {},
  );
  const [page, setPage] = useState(initial.page);
  const [tagMode, setTagMode] = useState<TagMode>(initial.tagMode);
  const [sortMode, setSortMode] = useState<SortMode>(
    (initial.sort as SortMode) || defaultSort,
  );
  const [urlStateReady, setUrlStateReady] = useState(false);
  const urlStateHydratedRef = useRef(false);

  const [showAllMulti, setShowAllMulti] = useState(false);
  const [multiSearch, setMultiSearch] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [pagefindSlugs, setPagefindSlugs] = useState<string[] | null>(null);
  const [pagefindAvailable, setPagefindAvailable] = useState(false);
  const pagefindSearchId = useRef(0);

  const mobileFiltersButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null);

  const pagefindAdapter = useMemo(
    () =>
      search.mode === "pagefind"
        ? createPagefindAdapter(
            search.pagefindBasePath ?? "/",
            search.pagefindDebugLabel ?? "[FilterIndex]",
          )
        : null,
    [search.mode, search.pagefindBasePath, search.pagefindDebugLabel],
  );

  // Correct deep links after the first client render so both sides of
  // hydration begin on the page-1 SSR state. The URL sync waits for this
  // effect; it must never erase a deep-linked query before reading it.
  useEffect(() => {
    if (urlStateHydratedRef.current) return;
    urlStateHydratedRef.current = true;
    const fromUrl = parseFilterStateFromUrl(urlKeys, sortValues, defaultSort);
    setQuery(fromUrl.q);
    setSelectedMulti(fromUrl.multi);
    setSelectedSingle(fromUrl.single);
    setSelectedExtra(fromUrl.extras ?? {});
    setPage(fromUrl.page);
    setTagMode(fromUrl.tagMode);
    setSortMode((fromUrl.sort as SortMode) || defaultSort);
    setUrlStateReady(true);
  }, [urlKeys, defaultSort]);

  // Fetch data (fetch mode only)
  useEffect(() => {
    if (!isFetchMode) return;
    fetch(dataUrl as string)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: T[]) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isFetchMode, dataUrl]);

  // Pre-warm Pagefind (non-blocking)
  useEffect(() => {
    if (!pagefindAdapter) return;
    pagefindAdapter.getPagefind().then((pf) => {
      if (pf) setPagefindAvailable(true);
    });
  }, [pagefindAdapter]);

  // Pagefind search: query changes -> debounced full-text search -> relevance-ranked slugs
  useEffect(() => {
    if (!pagefindAdapter) return;
    const searchId = ++pagefindSearchId.current;

    if (!query) {
      setPagefindSlugs(null);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      const pf = await pagefindAdapter.getPagefind();
      if (!pf || cancelled || searchId !== pagefindSearchId.current) return;

      const response = await pf.search(query);
      if (cancelled || searchId !== pagefindSearchId.current) return;

      const results = await Promise.all(response.results.map((r) => r.data()));
      if (cancelled || searchId !== pagefindSearchId.current) return;

      const slugs = results
        .map((d) => pagefindAdapter.slugFromUrl(d.url))
        .filter((slug): slug is string => Boolean(slug));
      setPagefindSlugs(slugs);
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pagefindAdapter, query]);

  // Mobile drawer a11y: escape-to-close, scroll lock, focus management, inert.
  useEffect(() => {
    if (!mobileDrawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileDrawerOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileDrawerOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  useEffect(() => {
    if (mobileDrawerOpen) {
      requestAnimationFrame(() => drawerCloseRef.current?.focus());
    } else {
      mobileFiltersButtonRef.current?.focus();
    }
  }, [mobileDrawerOpen]);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    el.inert = !mobileDrawerOpen;
  }, [mobileDrawerOpen]);

  const pagefindSlugSet = useMemo(
    () => (pagefindSlugs ? new Set(pagefindSlugs) : null),
    [pagefindSlugs],
  );

  const usePagefindActive =
    search.mode === "pagefind" &&
    pagefindAvailable &&
    !!query &&
    pagefindSlugSet !== null;

  const matchesQuery = useCallback(
    (item: T) => matchesSubstring(searchTextOf(item), query),
    [searchTextOf, query],
  );

  const matchesSingle = useCallback(
    (item: T) => {
      if (!singleFacet || !selectedSingle) return true;
      return singleFacet.getValue(item) === selectedSingle;
    },
    [singleFacet, selectedSingle],
  );

  const extraKey = extraParams.join();
  const matchesExtras = useCallback(
    (item: T, skipParam?: string) => {
      for (const facet of extraFacets) {
        if (facet.urlParam === skipParam) continue;
        const selected = selectedExtra[facet.urlParam];
        if (!selected) continue;
        if (facet.getValue(item) !== selected) return false;
      }
      return true;
    },
    [extraKey, selectedExtra],
  );

  const matchesMulti = useCallback(
    (item: T) => {
      if (!multiFacet || !selectedMulti.length) return true;
      const values = multiFacet.getValues(item);
      return tagMode === "and"
        ? selectedMulti.every((slug) => values.includes(slug))
        : selectedMulti.some((slug) => values.includes(slug));
    },
    [multiFacet, selectedMulti, tagMode],
  );

  // Contextual facet counts: single-facet counts filter by query + multi; multi-facet counts filter by query + single.
  const singleCounts = useMemo(() => {
    if (!singleFacet) return new Map<string, number>();
    const base = items.filter((item) => {
      if (
        usePagefindActive &&
        pagefindSlugSet &&
        !pagefindSlugSet.has(getSlug(item))
      )
        return false;
      if (!usePagefindActive && !matchesQuery(item)) return false;
      return matchesMulti(item) && matchesExtras(item);
    });
    const counts = new Map<string, number>();
    for (const item of base) {
      const value = singleFacet.getValue(item);
      if (value) counts.set(value, (counts.get(value) || 0) + 1);
    }
    return counts;
  }, [
    items,
    singleFacet,
    usePagefindActive,
    pagefindSlugSet,
    matchesQuery,
    matchesMulti,
    matchesExtras,
    getSlug,
  ]);

  const multiCounts = useMemo(() => {
    if (!multiFacet) return new Map<string, number>();
    const base = items.filter((item) => {
      if (
        usePagefindActive &&
        pagefindSlugSet &&
        !pagefindSlugSet.has(getSlug(item))
      )
        return false;
      if (!usePagefindActive && !matchesQuery(item)) return false;
      return matchesSingle(item) && matchesExtras(item);
    });
    const counts = new Map<string, number>();
    for (const item of base) {
      for (const value of multiFacet.getValues(item)) {
        counts.set(value, (counts.get(value) || 0) + 1);
      }
    }
    return counts;
  }, [
    items,
    multiFacet,
    usePagefindActive,
    pagefindSlugSet,
    matchesQuery,
    matchesSingle,
    matchesExtras,
    getSlug,
  ]);

  /**
   * Contextual counts for each extra facet, keyed by its URL param: filtered
   * by query + primary single + multi + every OTHER extra facet, exactly as
   * the primary single facet's own counts are.
   */
  const extraCounts = useMemo(() => {
    const result: Record<string, Map<string, number>> = {};
    for (const facet of extraFacets) {
      const base = items.filter((item) => {
        if (
          usePagefindActive &&
          pagefindSlugSet &&
          !pagefindSlugSet.has(getSlug(item))
        )
          return false;
        if (!usePagefindActive && !matchesQuery(item)) return false;
        return (
          matchesSingle(item) &&
          matchesMulti(item) &&
          matchesExtras(item, facet.urlParam)
        );
      });
      const counts = new Map<string, number>();
      for (const item of base) {
        const value = facet.getValue(item);
        if (value) counts.set(value, (counts.get(value) || 0) + 1);
      }
      result[facet.urlParam] = counts;
    }
    return result;
  }, [
    items,
    extraKey,
    usePagefindActive,
    pagefindSlugSet,
    matchesQuery,
    matchesSingle,
    matchesMulti,
    matchesExtras,
    getSlug,
  ]);

  // Filter + sort
  const filtered = useMemo(() => {
    let matched: T[];

    if (usePagefindActive) {
      const pfSlugSet = new Set(pagefindSlugs);
      matched = items.filter(
        (item) =>
          pfSlugSet.has(getSlug(item)) &&
          matchesMulti(item) &&
          matchesSingle(item) &&
          matchesExtras(item),
      );
    } else {
      matched = items.filter(
        (item) =>
          matchesQuery(item) &&
          matchesMulti(item) &&
          matchesSingle(item) &&
          matchesExtras(item),
      );
    }

    if (usePagefindActive && (!sort || sortMode === "relevance")) {
      const slugOrder = new Map((pagefindSlugs ?? []).map((s, i) => [s, i]));
      matched = [...matched].sort(
        (a, b) =>
          (slugOrder.get(getSlug(a)) ?? 9999) -
          (slugOrder.get(getSlug(b)) ?? 9999),
      );
    } else if (sort) {
      const sorted = [...matched];
      switch (sortMode) {
        case "newest":
          sorted.sort(sort.compareNewest);
          break;
        case "az":
          sorted.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
          break;
        case "relevance":
          if (query && search.scoreRelevance) {
            const score = search.scoreRelevance;
            sorted.sort((a, b) => score(b, query) - score(a, query));
          }
          break;
      }
      matched = sorted;
    }

    return matched;
  }, [
    items,
    usePagefindActive,
    pagefindSlugs,
    matchesQuery,
    matchesMulti,
    matchesSingle,
    matchesExtras,
    getSlug,
    getTitle,
    sort,
    sortMode,
    query,
    search.scoreRelevance,
  ]);

  const totalPages =
    pageSize !== undefined
      ? Math.max(1, Math.ceil(filtered.length / pageSize))
      : 1;
  const safePage = Math.min(page, totalPages);
  const paged =
    pageSize !== undefined
      ? filtered.slice((safePage - 1) * pageSize, safePage * pageSize)
      : filtered;

  // Popular multi-facet values: top 10 by total (uncontextual) count.
  const popularMulti = useMemo(() => {
    if (!multiFacet) return [];
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const value of multiFacet.getValues(item)) {
        counts.set(value, (counts.get(value) || 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([slug]) => slug);
  }, [items, multiFacet]);

  const resultsStatusText = useMemo(() => {
    if (filtered.length === 0)
      return `No ${resultNounPlural} match your filters.`;
    if (pageSize === undefined)
      return `Showing all ${filtered.length} ${resultNounPlural}.`;
    const start = (safePage - 1) * pageSize + 1;
    const end = Math.min(safePage * pageSize, filtered.length);
    return `Showing ${start} to ${end} of ${filtered.length} ${resultNounPlural}. Page ${safePage} of ${totalPages}.`;
  }, [filtered.length, safePage, totalPages, pageSize, resultNounPlural]);

  // Sync URL
  useEffect(() => {
    if (!urlStateReady) return;
    writeFilterStateToUrl(urlKeys, defaultSort, {
      q: query,
      single: selectedSingle,
      multi: selectedMulti,
      page: safePage,
      tagMode,
      sort: sortMode,
      extras: selectedExtra,
    });
  }, [
    urlKeys,
    defaultSort,
    query,
    selectedSingle,
    selectedExtra,
    selectedMulti,
    safePage,
    tagMode,
    sortMode,
    urlStateReady,
  ]);

  const resetPage = useCallback(() => setPage(1), []);

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (sort) {
        if (value && pagefindAvailable && sortMode !== "relevance")
          setSortMode("relevance");
        if (!value && sortMode === "relevance") setSortMode(defaultSort);
      }
      resetPage();
    },
    [sort, pagefindAvailable, sortMode, defaultSort, resetPage],
  );

  const toggleMulti = useCallback(
    (slug: string) => {
      setSelectedMulti((prev) =>
        prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug],
      );
      resetPage();
    },
    [resetPage],
  );

  const selectSingle = useCallback(
    (slug: string) => {
      setSelectedSingle((prev) => (prev === slug ? "" : slug));
      resetPage();
    },
    [resetPage],
  );

  const selectExtra = useCallback(
    (urlParam: string, slug: string) => {
      setSelectedExtra((prev) => ({
        ...prev,
        [urlParam]: prev[urlParam] === slug ? "" : slug,
      }));
      resetPage();
    },
    [resetPage],
  );

  const clearMulti = useCallback(() => {
    setSelectedMulti([]);
    resetPage();
  }, [resetPage]);

  const clearSingle = useCallback(() => {
    setSelectedSingle("");
    resetPage();
  }, [resetPage]);

  const clearAll = useCallback(() => {
    setQuery("");
    setSelectedMulti([]);
    setSelectedSingle("");
    setSelectedExtra((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, ""])),
    );
    setTagMode("and");
    setSortMode(defaultSort);
    setPage(1);
  }, [defaultSort]);

  const activeExtraCount = extraParams.filter(
    (param) => !!selectedExtra[param],
  ).length;

  const hasActiveFilters =
    !!query ||
    selectedMulti.length > 0 ||
    !!selectedSingle ||
    activeExtraCount > 0;

  const applyTagMode = useCallback(
    (mode: TagMode) => {
      setTagMode(mode);
      resetPage();
    },
    [resetPage],
  );

  /**
   * Every active filter, named, in reading order: single facet, extra
   * facets, tags, query. The zero-results copy lists these.
   */
  const activeConstraints: FilterConstraint[] = useMemo(() => {
    const list: FilterConstraint[] = [];
    if (singleFacet && selectedSingle)
      list.push({ label: optionName(singleFacet.options, selectedSingle) });
    for (const facet of extraFacets) {
      const value = selectedExtra[facet.urlParam];
      if (value) list.push({ label: optionName(facet.options, value) });
    }
    if (multiFacet)
      for (const slug of selectedMulti)
        list.push({ label: optionName(multiFacet.options, slug) });
    if (query) list.push({ label: `"${query}"` });
    return list;
  }, [
    singleFacet,
    selectedSingle,
    extraKey,
    selectedExtra,
    multiFacet,
    selectedMulti,
    query,
  ]);

  /**
   * "Drop one and these come back": for each active constraint, how many
   * entries the SAME query returns with just that constraint removed — plus
   * a "Match any" offer when two or more tags are ANDed. Zero-count offers
   * are omitted (an offer that also returns nothing is not a recovery), and
   * nothing is computed while there are results to show.
   */
  const dropOneSuggestions: DropOneSuggestion[] = useMemo(() => {
    if (filtered.length > 0 || !hasActiveFilters) return [];

    // Same query semantics the result list uses: the Pagefind slug set when
    // full-text search is live, plain substring otherwise.
    const itemMatchesQuery = (item: T) =>
      usePagefindActive && pagefindSlugSet
        ? pagefindSlugSet.has(getSlug(item))
        : matchesQuery(item);

    const countWithout = (drop: {
      query?: boolean;
      single?: boolean;
      extraParam?: string;
      tag?: string;
      tagModeOverride?: TagMode;
    }): number => {
      const tags = drop.tag
        ? selectedMulti.filter((slug) => slug !== drop.tag)
        : selectedMulti;
      const mode = drop.tagModeOverride ?? tagMode;
      return items.filter((item) => {
        if (!drop.query && query && !itemMatchesQuery(item)) return false;
        if (!drop.single && !matchesSingle(item)) return false;
        if (!matchesExtras(item, drop.extraParam)) return false;
        if (multiFacet && tags.length) {
          const values = multiFacet.getValues(item);
          const matched =
            mode === "and"
              ? tags.every((slug) => values.includes(slug))
              : tags.some((slug) => values.includes(slug));
          if (!matched) return false;
        }
        return true;
      }).length;
    };

    const suggestions: DropOneSuggestion[] = [];
    const offer = (label: string, count: number, apply: () => void) => {
      if (count > 0) suggestions.push({ label, count, apply });
    };

    if (singleFacet && selectedSingle)
      offer(
        `without ${optionName(singleFacet.options, selectedSingle)}`,
        countWithout({ single: true }),
        clearSingle,
      );
    for (const facet of extraFacets) {
      const value = selectedExtra[facet.urlParam];
      if (!value) continue;
      offer(
        `without ${optionName(facet.options, value)}`,
        countWithout({ extraParam: facet.urlParam }),
        () => selectExtra(facet.urlParam, value),
      );
    }
    if (multiFacet)
      for (const slug of selectedMulti)
        offer(
          `without ${optionName(multiFacet.options, slug)}`,
          countWithout({ tag: slug }),
          () => toggleMulti(slug),
        );
    if (query)
      offer(`without "${query}"`, countWithout({ query: true }), () =>
        handleQueryChange(""),
      );
    if (tagMode === "and" && selectedMulti.length > 1)
      offer("Match any", countWithout({ tagModeOverride: "or" }), () =>
        applyTagMode("or"),
      );

    return suggestions;
  }, [
    items,
    filtered.length,
    hasActiveFilters,
    query,
    selectedSingle,
    selectedExtra,
    selectedMulti,
    tagMode,
    usePagefindActive,
    pagefindSlugSet,
    matchesQuery,
    matchesSingle,
    matchesExtras,
    getSlug,
    singleFacet,
    multiFacet,
    extraKey,
    clearSingle,
    toggleMulti,
    handleQueryChange,
    selectExtra,
    applyTagMode,
  ]);

  const visibleMultiOptions = useMemo(() => {
    if (!multiFacet) return [];
    const sorted = [...multiFacet.options].sort(
      (a, b) => (multiCounts.get(b.slug) || 0) - (multiCounts.get(a.slug) || 0),
    );
    if (multiSearch) {
      const lower = multiSearch.toLowerCase();
      return sorted.filter((t) => t.name.toLowerCase().includes(lower));
    }
    if (showAllMulti) return sorted;
    return sorted.slice(0, 10);
  }, [multiFacet, multiCounts, multiSearch, showAllMulti]);

  return {
    items,
    loading,
    error,
    query,
    handleQueryChange,
    selectedMulti,
    toggleMulti,
    selectedSingle,
    selectSingle,
    selectedExtra,
    selectExtra,
    extraCounts,
    activeExtraCount,
    clearMulti,
    clearSingle,
    tagMode,
    setTagMode: applyTagMode,
    sortMode,
    setSortMode: (mode: SortMode) => {
      setSortMode(mode);
      resetPage();
    },
    page: safePage,
    setPage,
    totalPages,
    filtered,
    paged,
    singleCounts,
    multiCounts,
    popularMulti,
    visibleMultiOptions,
    showAllMulti,
    setShowAllMulti,
    multiSearch,
    setMultiSearch,
    resultsStatusText,
    hasActiveFilters,
    activeConstraints,
    dropOneSuggestions,
    clearAll,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    mobileFiltersButtonRef,
    drawerRef,
    drawerCloseRef,
    idPrefix,
  };
}
