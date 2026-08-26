/**
 * useFilterState — the shared state engine behind every FilterIndex
 * instance: fetch-or-provided items, a pluggable search adapter (Pagefind /
 * substring / none), single + multi facet counting, optional sort,
 * optional pagination, URL state sync, and the mobile-drawer a11y wiring
 * (escape-to-close, focus restore, inert background, scroll lock).
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
import type { MultiFacetConfig, SingleFacetConfig, TagMode } from "./types";
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
  multiFacet?: MultiFacetConfig<T>;
  /** Noun for the result count / status line. Default "entries". */
  resultNounPlural?: string;
}

function matchesSubstring(searchText: string | undefined, q: string): boolean {
  if (!q) return true;
  return (searchText ?? "").includes(q.toLowerCase());
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
    multiFacet,
    resultNounPlural = "entries",
  } = options;

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
    }),
    [search.mode, singleFacet, multiFacet, pageSize, sort],
  );

  const defaultSort: SortMode = sort?.defaultValue ?? "newest";
  const sortValues: SortMode[] = ["newest", "az", "relevance"];

  const initial = useMemo(
    () => parseFilterStateFromUrl(urlKeys, sortValues, defaultSort),
    [],
  );

  const [query, setQuery] = useState(initial.q);
  const [selectedMulti, setSelectedMulti] = useState<string[]>(initial.multi);
  const [selectedSingle, setSelectedSingle] = useState(initial.single);
  const [page, setPage] = useState(initial.page);
  const [tagMode, setTagMode] = useState<TagMode>(initial.tagMode);
  const [sortMode, setSortMode] = useState<SortMode>(
    (initial.sort as SortMode) || defaultSort,
  );

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
      return matchesMulti(item);
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
      return matchesSingle(item);
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
          matchesSingle(item),
      );
    } else {
      matched = items.filter(
        (item) =>
          matchesQuery(item) && matchesMulti(item) && matchesSingle(item),
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
    writeFilterStateToUrl(urlKeys, defaultSort, {
      q: query,
      single: selectedSingle,
      multi: selectedMulti,
      page: safePage,
      tagMode,
      sort: sortMode,
    });
  }, [
    urlKeys,
    defaultSort,
    query,
    selectedSingle,
    selectedMulti,
    safePage,
    tagMode,
    sortMode,
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
    setTagMode("and");
    setSortMode(defaultSort);
    setPage(1);
  }, [defaultSort]);

  const hasActiveFilters =
    !!query || selectedMulti.length > 0 || !!selectedSingle;

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
    clearMulti,
    clearSingle,
    tagMode,
    setTagMode: (mode: TagMode) => {
      setTagMode(mode);
      resetPage();
    },
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
    clearAll,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    mobileFiltersButtonRef,
    drawerRef,
    drawerCloseRef,
    idPrefix,
  };
}
