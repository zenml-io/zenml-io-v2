/**
 * LLMOps Database client-side filter island — "Research Hub" layout.
 *
 * Fetches /llmops-index.json on mount and provides:
 * - Left sidebar with faceted industry + technology navigation (desktop)
 * - Slide-out drawer for facets (mobile)
 * - Text search (title, company, summary)
 * - Multi-select llmops-tag filter with AND/OR toggle
 * - Single-select industry filter
 * - Sort (newest, A-Z, relevance)
 * - Clickable tag chips on cards
 * - Popular tags strip
 * - Enhanced empty states with contextual recovery
 * - Paginated results grid
 * - URL state sync for shareability
 */
import { useEffect, useMemo, useState, useCallback, useRef } from "preact/hooks";

// ── Types ──────────────────────────────────────────────────────────

export interface LLMOpsIndexItem {
  slug: string;
  title: string;
  company: string | null;
  summary: string | null;
  llmopsTags: string[];
  industryTags: string | null;
  year: number | null;
  link: string | null;
}

interface ProcessedItem extends LLMOpsIndexItem {
  searchText: string;
}

export interface FilterOption {
  slug: string;
  name: string;
}

export interface LLMOpsFilterProps {
  tags: FilterOption[];
  industries: FilterOption[];
  pageSize?: number;
}

type TagMode = "and" | "or";
type SortMode = "newest" | "az" | "relevance";
type FacetScope = "desktop" | "mobile";

// ── Stable IDs ────────────────────────────────────────────────────

const MOBILE_DRAWER_ID = "llmops-filters-drawer";
const MOBILE_DRAWER_TITLE_ID = "llmops-filters-drawer-title";

// ── Pagefind Adapter ──────────────────────────────────────────────

interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: Record<string, string>;
  }>;
}

interface PagefindSearchResponse {
  results: PagefindResult[];
}

interface PagefindInstance {
  search: (query: string) => Promise<PagefindSearchResponse>;
  debouncedSearch: (
    query: string,
    options?: Record<string, unknown>,
    debounceMs?: number,
  ) => Promise<PagefindSearchResponse | null>;
  init: () => void;
}

/** Lazy-load Pagefind. Returns null if unavailable (dev mode). */
let pagefindPromise: Promise<PagefindInstance | null> | null = null;

function getPagefind(): Promise<PagefindInstance | null> {
  if (pagefindPromise) return pagefindPromise;
  // Path stored in a variable so Rollup/Vite can't statically resolve it at build time.
  // The pagefind directory only exists after `pagefind --site dist` runs post-build.
  const pagefindPath = "/pagefind/pagefind.js";
  pagefindPromise = import(/* @vite-ignore */ pagefindPath)
    .then((pf) => {
      pf.init();
      return pf as PagefindInstance;
    })
    .catch(() => {
      console.debug("[LLMOps] Pagefind not available — using substring search");
      return null;
    });
  return pagefindPromise;
}

/** Extract slug from a Pagefind result URL like "/llmops-database/my-slug" */
function slugFromUrl(url: string): string {
  return url.replace(/^\/llmops-database\//, "").replace(/\.html$/, "").replace(/\/$/, "");
}

// ── URL State ──────────────────────────────────────────────────────

interface FilterState {
  q: string;
  tags: string[];
  industry: string;
  page: number;
  tagMode: TagMode;
  sort: SortMode;
}

function parseStateFromUrl(): FilterState {
  if (typeof window === "undefined") return { q: "", tags: [], industry: "", page: 1, tagMode: "and", sort: "newest" };
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") || "",
    tags: params.get("tags")?.split(",").filter(Boolean) || [],
    industry: params.get("industry") || "",
    page: Math.max(1, parseInt(params.get("page") || "1", 10) || 1),
    tagMode: (params.get("tagMode") === "or" ? "or" : "and") as TagMode,
    sort: (["newest", "az", "relevance"].includes(params.get("sort") || "") ? params.get("sort") : "newest") as SortMode,
  };
}

function writeStateToUrl(state: FilterState): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.tags.length) params.set("tags", state.tags.join(","));
  if (state.industry) params.set("industry", state.industry);
  if (state.page > 1) params.set("page", String(state.page));
  if (state.tagMode !== "and") params.set("tagMode", state.tagMode);
  if (state.sort !== "newest") params.set("sort", state.sort);
  const search = params.toString();
  const url = window.location.pathname + (search ? `?${search}` : "");
  window.history.replaceState(null, "", url);
}

// ── Filter Logic ───────────────────────────────────────────────────

function matchesQuery(item: ProcessedItem, q: string): boolean {
  if (!q) return true;
  return item.searchText.includes(q.toLowerCase());
}

function matchesTags(item: LLMOpsIndexItem, selected: string[], mode: TagMode): boolean {
  if (!selected.length) return true;
  return mode === "and"
    ? selected.every((tag) => item.llmopsTags.includes(tag))
    : selected.some((tag) => item.llmopsTags.includes(tag));
}

function matchesIndustry(item: LLMOpsIndexItem, industry: string): boolean {
  if (!industry) return true;
  return item.industryTags === industry;
}

function scoreRelevance(item: ProcessedItem, q: string): number {
  if (!q) return 0;
  const lower = q.toLowerCase();
  let score = 0;
  if (item.title.toLowerCase().includes(lower)) score += 10;
  if (item.company?.toLowerCase().includes(lower)) score += 5;
  return score;
}

// ── Sort Logic ────────────────────────────────────────────────────

function sortItems(items: ProcessedItem[], sort: SortMode, q: string): ProcessedItem[] {
  const sorted = [...items];
  switch (sort) {
    case "newest":
      sorted.sort((a, b) => {
        const yearDiff = (b.year ?? 0) - (a.year ?? 0);
        if (yearDiff !== 0) return yearDiff;
        return a.title.localeCompare(b.title);
      });
      break;
    case "az":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "relevance":
      if (q) {
        sorted.sort((a, b) => {
          const scoreDiff = scoreRelevance(b, q) - scoreRelevance(a, q);
          if (scoreDiff !== 0) return scoreDiff;
          return (b.year ?? 0) - (a.year ?? 0);
        });
      }
      // When no query, keep original order (newest)
      break;
  }
  return sorted;
}

// ── Keyboard Helpers ──────────────────────────────────────────────

/** Arrow-key navigation within a facet list (ul > li > button). */
function handleFacetListKeyDown(e: KeyboardEvent): void {
  const { key } = e;
  if (key !== "ArrowDown" && key !== "ArrowUp" && key !== "Home" && key !== "End") return;

  const list = e.currentTarget as HTMLElement;
  const buttons = [...list.querySelectorAll<HTMLButtonElement>("button:not([disabled])")];
  if (!buttons.length) return;

  const idx = buttons.indexOf(document.activeElement as HTMLButtonElement);
  if (idx === -1) return;

  e.preventDefault();
  let next: number;
  switch (key) {
    case "ArrowDown": next = (idx + 1) % buttons.length; break;
    case "ArrowUp": next = (idx - 1 + buttons.length) % buttons.length; break;
    case "Home": next = 0; break;
    case "End": next = buttons.length - 1; break;
    default: return;
  }
  buttons[next].focus();
}

// ── SVG Icons ─────────────────────────────────────────────────────

function ChevronIcon({ class: c }: { class?: string }) {
  return (
    <svg class={c || "h-4 w-4"} viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7.5 5L12.5 10L7.5 15" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.67">
      <circle cx="9" cy="9" r="6" />
      <path d="M13.5 13.5L17 17" stroke-linecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg class="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 9L9 3M3 3l6 6" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <path d="M3 5h14M5 10h10M7 15h6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 3H3v10h10v-3M9 2h5v5M14 2L7 9" />
    </svg>
  );
}

// ── Focus ring class (DRY) ────────────────────────────────────────

const FOCUS_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1";

// ── Component ──────────────────────────────────────────────────────

export default function LLMOpsFilter({ tags, industries, pageSize = 24 }: LLMOpsFilterProps) {
  const [items, setItems] = useState<ProcessedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const initial = useMemo(parseStateFromUrl, []);
  const [query, setQuery] = useState(initial.q);
  const [selectedTags, setSelectedTags] = useState<string[]>(initial.tags);
  const [selectedIndustry, setSelectedIndustry] = useState(initial.industry);
  const [page, setPage] = useState(initial.page);
  const [tagMode, setTagMode] = useState<TagMode>(initial.tagMode);
  const [sort, setSort] = useState<SortMode>(initial.sort);

  // Sidebar state
  const [showAllTags, setShowAllTags] = useState(false);
  const [sidebarTagSearch, setSidebarTagSearch] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Pagefind state: relevance-ranked slugs when a query is active
  const [pagefindSlugs, setPagefindSlugs] = useState<string[] | null>(null);
  const [pagefindAvailable, setPagefindAvailable] = useState(false);
  const pagefindSearchId = useRef(0);

  // Mobile drawer refs for focus management
  const mobileFiltersButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null);

  // Lookup maps
  const tagMap = useMemo(() => new Map(tags.map((t) => [t.slug, t.name])), [tags]);
  const industryMap = useMemo(() => new Map(industries.map((i) => [i.slug, i.name])), [industries]);

  // Fetch data
  useEffect(() => {
    fetch("/llmops-index.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: LLMOpsIndexItem[]) => {
        const processed = data.map((item) => ({
          ...item,
          searchText: [item.title, item.company, item.summary].filter(Boolean).join(" ").toLowerCase(),
        }));
        setItems(processed);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Pre-warm Pagefind (non-blocking)
    getPagefind().then((pf) => { if (pf) setPagefindAvailable(true); });
  }, []);

  // Pagefind search: query changes → debounced full-text search → relevance-ranked slugs
  useEffect(() => {
    const searchId = ++pagefindSearchId.current;

    if (!query) {
      setPagefindSlugs(null);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      const pf = await getPagefind();
      if (!pf || cancelled || searchId !== pagefindSearchId.current) return;

      const response = await pf.search(query);
      if (cancelled || searchId !== pagefindSearchId.current) return;

      // Resolve all result data to get URLs → slugs in relevance order
      const dataPromises = response.results.map((r) => r.data());
      const results = await Promise.all(dataPromises);
      if (cancelled || searchId !== pagefindSearchId.current) return;

      const slugs = results.map((d) => slugFromUrl(d.url));
      setPagefindSlugs(slugs);
    }, 200);

    return () => { cancelled = true; clearTimeout(timer); };
  }, [query]);

  // Close mobile drawer on escape + restore focus
  useEffect(() => {
    if (!mobileDrawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileDrawerOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileDrawerOpen]);

  // Focus management: focus close button on open, restore on close
  useEffect(() => {
    if (mobileDrawerOpen) {
      // Focus the close button after the drawer animates in
      requestAnimationFrame(() => { drawerCloseRef.current?.focus(); });
    } else {
      // Restore focus to the filter button when drawer closes
      mobileFiltersButtonRef.current?.focus();
    }
  }, [mobileDrawerOpen]);

  // Set inert on drawer when closed to prevent background tabbing
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    // @ts-expect-error inert not in all typings yet
    el.inert = !mobileDrawerOpen;
  }, [mobileDrawerOpen]);

  // For faster Pagefind lookups in facet computation
  const pagefindSlugSet = useMemo(
    () => (pagefindSlugs ? new Set(pagefindSlugs) : null),
    [pagefindSlugs],
  );

  // Contextual facet counts: tag counts filter by query + industry only
  const tagCounts = useMemo(() => {
    const usePagefind = pagefindAvailable && query && pagefindSlugSet !== null;
    const base = items.filter((item) => {
      if (usePagefind && !pagefindSlugSet!.has(item.slug)) return false;
      if (!usePagefind && !matchesQuery(item, query)) return false;
      return matchesIndustry(item, selectedIndustry);
    });
    const counts = new Map<string, number>();
    for (const item of base) {
      for (const tag of item.llmopsTags) {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      }
    }
    return counts;
  }, [items, query, selectedIndustry, pagefindAvailable, pagefindSlugSet]);

  // Contextual facet counts: industry counts filter by query + tags only
  const industryCounts = useMemo(() => {
    const usePagefind = pagefindAvailable && query && pagefindSlugSet !== null;
    const base = items.filter((item) => {
      if (usePagefind && !pagefindSlugSet!.has(item.slug)) return false;
      if (!usePagefind && !matchesQuery(item, query)) return false;
      return matchesTags(item, selectedTags, tagMode);
    });
    const counts = new Map<string, number>();
    for (const item of base) {
      if (item.industryTags) {
        counts.set(item.industryTags, (counts.get(item.industryTags) || 0) + 1);
      }
    }
    return counts;
  }, [items, query, selectedTags, tagMode, pagefindAvailable, pagefindSlugSet]);

  // Filter + sort + paginate
  // When Pagefind is available and a query is active, use Pagefind's relevance-ranked
  // slugs as the primary result set; apply tag/industry filters on top.
  // When Pagefind is unavailable (dev mode), fall back to substring matchesQuery().
  const filtered = useMemo(() => {
    const usePagefindResults = pagefindAvailable && query && pagefindSlugs !== null;

    let matched: ProcessedItem[];
    if (usePagefindResults) {
      // Build a set of Pagefind-matched slugs for fast lookup
      const pfSlugSet = new Set(pagefindSlugs);
      // Filter items to those Pagefind found, then apply tag/industry filters
      matched = items.filter(
        (item) =>
          pfSlugSet.has(item.slug) &&
          matchesTags(item, selectedTags, tagMode) &&
          matchesIndustry(item, selectedIndustry),
      );
    } else {
      // Fallback: substring search (dev mode or no Pagefind)
      matched = items.filter(
        (item) =>
          matchesQuery(item, query) &&
          matchesTags(item, selectedTags, tagMode) &&
          matchesIndustry(item, selectedIndustry),
      );
    }

    // Sort — for relevance with Pagefind, preserve Pagefind's ordering
    if (usePagefindResults && sort === "relevance") {
      const slugOrder = new Map(pagefindSlugs!.map((s, i) => [s, i]));
      matched.sort((a, b) => (slugOrder.get(a.slug) ?? 9999) - (slugOrder.get(b.slug) ?? 9999));
    } else {
      matched = sortItems(matched, sort, query);
    }

    return matched;
  }, [items, query, selectedTags, selectedIndustry, tagMode, sort, pagefindSlugs, pagefindAvailable]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  // Popular tags: top 10 by total count (not contextual)
  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const tag of item.llmopsTags) {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([slug]) => slug);
  }, [items]);

  // Screen-reader status text (used in aria-live region)
  const resultsStatusText = useMemo(() => {
    if (filtered.length === 0) return "No entries match your filters.";
    const start = (safePage - 1) * pageSize + 1;
    const end = Math.min(safePage * pageSize, filtered.length);
    return `Showing ${start} to ${end} of ${filtered.length} entries. Page ${safePage} of ${totalPages}.`;
  }, [filtered.length, safePage, totalPages, pageSize]);

  // Sync URL
  useEffect(() => {
    writeStateToUrl({ q: query, tags: selectedTags, industry: selectedIndustry, page: safePage, tagMode, sort });
  }, [query, selectedTags, selectedIndustry, safePage, tagMode, sort]);

  // Helpers
  const resetPage = useCallback(() => setPage(1), []);

  const handleQueryChange = (e: Event) => {
    const newQuery = (e.target as HTMLInputElement).value;
    setQuery(newQuery);
    // Auto-switch to relevance sort when user starts typing (if Pagefind available)
    if (newQuery && pagefindAvailable && sort !== "relevance") setSort("relevance");
    // Revert to newest when query is cleared
    if (!newQuery && sort === "relevance") setSort("newest");
    resetPage();
  };

  const toggleTag = (slug: string) => {
    setSelectedTags((prev) => (prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug]));
    resetPage();
  };

  const selectIndustry = (slug: string) => {
    setSelectedIndustry((prev) => (prev === slug ? "" : slug));
    resetPage();
  };

  const clearAll = () => {
    setQuery("");
    setSelectedTags([]);
    setSelectedIndustry("");
    setTagMode("and");
    setSort("newest");
    setPage(1);
  };

  const hasActiveFilters = query || selectedTags.length > 0 || selectedIndustry;

  // Tags to show in sidebar (with search + expand)
  const sidebarTags = useMemo(() => {
    // Sort tags by contextual count descending
    const sorted = [...tags].sort((a, b) => (tagCounts.get(b.slug) || 0) - (tagCounts.get(a.slug) || 0));

    if (sidebarTagSearch) {
      const lower = sidebarTagSearch.toLowerCase();
      return sorted.filter((t) => t.name.toLowerCase().includes(lower));
    }
    if (showAllTags) return sorted;
    return sorted.slice(0, 10);
  }, [tags, tagCounts, sidebarTagSearch, showAllTags]);

  // ── Sidebar facets (scoped IDs to avoid duplicates in desktop + mobile) ──

  const renderFacets = (scope: FacetScope) => {
    const tagSearchId = `llmops-tag-search-${scope}`;

    return (
      <div class="space-y-6">
        {/* Industry facet */}
        <div>
          <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Industry</h3>
          <ul class="space-y-1" onKeyDown={handleFacetListKeyDown}>
            {industries.map((ind) => {
              const count = industryCounts.get(ind.slug) || 0;
              const isSelected = selectedIndustry === ind.slug;
              return (
                <li key={ind.slug}>
                  <button
                    type="button"
                    onClick={() => selectIndustry(ind.slug)}
                    aria-pressed={isSelected}
                    class={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${FOCUS_RING} ${
                      isSelected
                        ? "bg-purple-50 font-medium text-purple-700"
                        : count > 0
                          ? "text-gray-700 hover:bg-gray-50"
                          : "text-gray-400"
                    }`}
                    disabled={count === 0 && !isSelected}
                  >
                    <span class="truncate">{ind.name}</span>
                    <span class={`ml-2 text-xs tabular-nums ${isSelected ? "text-purple-500" : "text-gray-400"}`}>
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Technology facet */}
        <div>
          <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Technologies</h3>

          {/* Tag search within sidebar */}
          <div class="relative mb-2">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
              <SearchIcon />
            </div>
            <label for={tagSearchId} class="sr-only">Search technologies</label>
            <input
              id={tagSearchId}
              type="search"
              value={sidebarTagSearch}
              onInput={(e) => { setSidebarTagSearch((e.target as HTMLInputElement).value); setShowAllTags(true); }}
              placeholder="Search tags..."
              class={`w-full rounded-md border border-gray-200 py-1.5 pl-8 pr-3 text-sm placeholder-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600`}
            />
          </div>

          <ul class="space-y-0.5" onKeyDown={handleFacetListKeyDown}>
            {sidebarTags.map((tag) => {
              const count = tagCounts.get(tag.slug) || 0;
              const isSelected = selectedTags.includes(tag.slug);
              return (
                <li key={tag.slug}>
                  <button
                    type="button"
                    onClick={() => toggleTag(tag.slug)}
                    aria-pressed={isSelected}
                    class={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${FOCUS_RING} ${
                      isSelected
                        ? "bg-blue-50 font-medium text-blue-700"
                        : count > 0
                          ? "text-gray-700 hover:bg-gray-50"
                          : "text-gray-400"
                    }`}
                  >
                    <span class="truncate">{tag.name}</span>
                    <span class={`ml-2 text-xs tabular-nums ${isSelected ? "text-blue-500" : "text-gray-400"}`}>
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {!sidebarTagSearch && !showAllTags && tags.length > 10 && (
            <button
              type="button"
              onClick={() => setShowAllTags(true)}
              aria-expanded={false}
              class={`mt-2 text-xs font-medium text-primary-600 hover:text-primary-700 ${FOCUS_RING}`}
            >
              Show all {tags.length} tags
            </button>
          )}
          {showAllTags && !sidebarTagSearch && (
            <button
              type="button"
              onClick={() => setShowAllTags(false)}
              class={`mt-2 text-xs font-medium text-gray-500 hover:text-gray-700 ${FOCUS_RING}`}
            >
              Show fewer
            </button>
          )}
        </div>
      </div>
    );
  };

  // ── Enhanced empty state ────────────────────────────────────────

  const renderEmptyState = () => {
    const hasTags = selectedTags.length > 0;
    const hasIndustry = !!selectedIndustry;
    const hasQuery = !!query;
    const isAndMode = tagMode === "and";

    return (
      <div class="rounded-lg border border-gray-200 bg-gray-50 py-16 text-center" role="status">
        <div class="mx-auto max-w-md px-4">
          <p class="text-lg font-medium text-gray-700">No entries match your filters</p>
          <p class="mt-2 text-sm text-gray-500">
            {hasTags && hasIndustry && hasQuery
              ? "Try removing some filters to broaden your search."
              : hasTags && isAndMode && selectedTags.length > 1
                ? "These tags don't overlap. Try switching to \"Match Any\" mode."
                : hasQuery
                  ? `No results for "${query}". Try different search terms.`
                  : "Try adjusting your filter selections."}
          </p>
          <div class="mt-4 flex flex-wrap items-center justify-center gap-2">
            {hasTags && isAndMode && selectedTags.length > 1 && (
              <button
                type="button"
                class={`rounded-md border border-primary-200 bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700 hover:bg-primary-100 ${FOCUS_RING}`}
                onClick={() => { setTagMode("or"); resetPage(); }}
              >
                Switch to Match Any
              </button>
            )}
            {hasTags && (
              <button
                type="button"
                class={`rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 ${FOCUS_RING}`}
                onClick={() => { setSelectedTags([]); resetPage(); }}
              >
                Clear tags
              </button>
            )}
            {hasIndustry && (
              <button
                type="button"
                class={`rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 ${FOCUS_RING}`}
                onClick={() => { setSelectedIndustry(""); resetPage(); }}
              >
                Clear industry
              </button>
            )}
            {hasQuery && (
              <button
                type="button"
                class={`rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 ${FOCUS_RING}`}
                onClick={() => { setQuery(""); resetPage(); }}
              >
                Clear search
              </button>
            )}
            <button
              type="button"
              class={`text-sm font-medium text-gray-500 underline hover:text-gray-700 ${FOCUS_RING}`}
              onClick={clearAll}
            >
              Clear all
            </button>
          </div>

          {/* Suggest popular tags */}
          {popularTags.length > 0 && (
            <div class="mt-6">
              <p class="mb-2 text-xs font-medium text-gray-400">Popular tags to explore:</p>
              <div class="flex flex-wrap justify-center gap-1.5">
                {popularTags.slice(0, 6).map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => { clearAll(); toggleTag(slug); }}
                    class={`rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 ${FOCUS_RING}`}
                  >
                    {tagMap.get(slug) || slug}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── Loading / Error states ───────────────────────────────────────

  if (loading) {
    return (
      <div class="flex items-center justify-center py-20" role="status">
        <div class="text-center">
          <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600" />
          <p class="mt-4 text-sm text-gray-500">Loading LLMOps database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div class="rounded-lg border border-red-200 bg-red-50 p-6 text-center" role="alert">
        <p class="text-sm text-red-700">Failed to load data: {error}</p>
        <button
          type="button"
          class={`mt-3 text-sm font-medium text-red-600 underline hover:text-red-700 ${FOCUS_RING}`}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────

  return (
    <div class="flex flex-col gap-8 lg:flex-row">
      {/* Desktop sidebar */}
      <aside class="hidden lg:block lg:w-64 lg:shrink-0">
        <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          {renderFacets("desktop")}
        </div>
      </aside>

      {/* Mobile drawer backdrop */}
      {mobileDrawerOpen && (
        <div
          class="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        id={MOBILE_DRAWER_ID}
        role="dialog"
        aria-modal="true"
        aria-labelledby={MOBILE_DRAWER_TITLE_ID}
        aria-hidden={!mobileDrawerOpen}
        class={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform bg-white shadow-xl transition-transform duration-200 lg:hidden ${
          mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h2 id={MOBILE_DRAWER_TITLE_ID} class="font-semibold text-gray-900">Filters</h2>
            <button
              ref={drawerCloseRef}
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              class={`rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 ${FOCUS_RING}`}
              aria-label="Close filters"
            >
              <CloseIcon />
            </button>
          </div>
          <div class="flex-1 overflow-y-auto px-4 py-4">
            {renderFacets("mobile")}
          </div>
          <div class="border-t border-gray-200 px-4 py-3">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              class={`w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 ${FOCUS_RING}`}
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div class="min-w-0 flex-1">
        {/* Search + controls row */}
        <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Mobile filter button */}
          <button
            ref={mobileFiltersButtonRef}
            type="button"
            aria-expanded={mobileDrawerOpen}
            aria-controls={MOBILE_DRAWER_ID}
            onClick={() => setMobileDrawerOpen(true)}
            class={`inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden ${FOCUS_RING}`}
          >
            <FilterIcon />
            Filters
            {(selectedTags.length > 0 || selectedIndustry) && (
              <span class="ml-1 rounded-full bg-primary-100 px-1.5 py-0.5 text-xs font-semibold text-primary-700">
                {selectedTags.length + (selectedIndustry ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Search input */}
          <div class="relative flex-1">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </div>
            <label for="llmops-search" class="sr-only">Search</label>
            <input
              id="llmops-search"
              type="search"
              value={query}
              onInput={handleQueryChange}
              placeholder="Search by title, company, or summary..."
              class="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          {/* AND/OR toggle — native radio inputs for accessibility */}
          <fieldset class="flex items-center gap-1 rounded-lg border border-gray-300 p-1" aria-label="Tag match mode">
            <legend class="sr-only">Tag match mode</legend>
            <label
              class={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-600 ${
                tagMode === "and" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="tagMode"
                value="and"
                checked={tagMode === "and"}
                onChange={() => { setTagMode("and"); resetPage(); }}
                class="sr-only"
              />
              Match All
            </label>
            <label
              class={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-600 ${
                tagMode === "or" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="tagMode"
                value="or"
                checked={tagMode === "or"}
                onChange={() => { setTagMode("or"); resetPage(); }}
                class="sr-only"
              />
              Match Any
            </label>
          </fieldset>

          {/* Sort dropdown */}
          <div class="sm:w-40">
            <label for="llmops-sort" class="sr-only">Sort</label>
            <select
              id="llmops-sort"
              value={sort}
              onChange={(e) => { setSort((e.target as HTMLSelectElement).value as SortMode); resetPage(); }}
              class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            >
              <option value="newest">Newest first</option>
              <option value="az">A &ndash; Z</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>
        </div>

        {/* Active filter pills */}
        {hasActiveFilters && (
          <div class="mb-4 flex flex-wrap items-center gap-2">
            {selectedTags.map((slug) => (
              <button
                key={slug}
                type="button"
                class={`inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 ${FOCUS_RING}`}
                onClick={() => toggleTag(slug)}
                aria-label={`Remove tag ${tagMap.get(slug) || slug}`}
              >
                {tagMap.get(slug) || slug}
                <CloseIcon />
              </button>
            ))}
            {selectedIndustry && (
              <button
                type="button"
                class={`inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 transition-colors hover:bg-purple-100 ${FOCUS_RING}`}
                onClick={() => selectIndustry(selectedIndustry)}
                aria-label={`Remove industry ${industryMap.get(selectedIndustry) || selectedIndustry}`}
              >
                {industryMap.get(selectedIndustry) || selectedIndustry}
                <CloseIcon />
              </button>
            )}
            <button
              type="button"
              class={`text-xs font-medium text-gray-500 underline hover:text-gray-700 ${FOCUS_RING}`}
              onClick={clearAll}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Popular tags strip */}
        {!hasActiveFilters && popularTags.length > 0 && (
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="text-xs font-medium text-gray-400">Popular:</span>
            {popularTags.map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => toggleTag(slug)}
                class={`rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 ${FOCUS_RING}`}
              >
                {tagMap.get(slug) || slug}
              </button>
            ))}
          </div>
        )}

        {/* Results count — live region for screen readers */}
        <div class="mb-4 text-sm text-gray-500" role="status" aria-live="polite" aria-atomic="true">
          <span aria-hidden="true">
            {filtered.length === items.length
              ? `${items.length} entries`
              : `${filtered.length} of ${items.length} entries`}
          </span>
          <span class="sr-only">{resultsStatusText}</span>
        </div>

        {/* Results grid */}
        {paged.length === 0 ? (
          renderEmptyState()
        ) : (
          <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {paged.map((item) => (
              <div
                key={item.slug}
                class="group flex cursor-pointer flex-col rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                onClick={() => { window.location.href = `/llmops-database/${item.slug}`; }}
              >
                <a
                  href={`/llmops-database/${item.slug}`}
                  class={`font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2 ${FOCUS_RING}`}
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                >
                  {item.title}
                </a>

                <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  {item.company && <span class="font-medium text-gray-700">{item.company}</span>}
                  {item.year && (
                    <>
                      {item.company && <span aria-hidden="true">&middot;</span>}
                      <span>{item.year}</span>
                    </>
                  )}
                  {item.industryTags && (
                    <>
                      <span aria-hidden="true">&middot;</span>
                      <button
                        type="button"
                        class={`rounded-full bg-purple-50 px-2 py-0.5 text-purple-700 transition-colors hover:bg-purple-100 ${FOCUS_RING}`}
                        onClick={(e: MouseEvent) => { e.stopPropagation(); selectIndustry(item.industryTags!); }}
                        aria-label={`Filter by ${industryMap.get(item.industryTags) || item.industryTags}`}
                      >
                        {industryMap.get(item.industryTags) || item.industryTags}
                      </button>
                    </>
                  )}
                </div>

                {item.summary && (
                  <p class="mt-2 text-sm text-gray-600 line-clamp-2">{item.summary}</p>
                )}

                {item.llmopsTags.length > 0 && (
                  <div class="mt-auto flex flex-wrap gap-1 pt-3">
                    {item.llmopsTags.slice(0, 3).map((tagSlug) => {
                      const isSelected = selectedTags.includes(tagSlug);
                      return (
                        <button
                          key={tagSlug}
                          type="button"
                          data-tag-chip
                          aria-pressed={isSelected}
                          aria-label={isSelected ? `Remove filter ${tagMap.get(tagSlug) || tagSlug}` : `Filter by ${tagMap.get(tagSlug) || tagSlug}`}
                          onClick={(e: MouseEvent) => { e.stopPropagation(); toggleTag(tagSlug); }}
                          class={`rounded-full px-2 py-0.5 text-xs transition-colors ${FOCUS_RING} ${
                            isSelected
                              ? "bg-primary-600 text-white"
                              : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          }`}
                        >
                          {tagMap.get(tagSlug) || tagSlug}
                        </button>
                      );
                    })}
                    {item.llmopsTags.length > 3 && (
                      <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                        +{item.llmopsTags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav class="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              class={`rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS_RING}`}
              aria-label="Previous page"
            >
              Previous
            </button>

            {(() => {
              const pages: (number | "...")[] = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                if (safePage > 3) pages.push("...");
                const start = Math.max(2, safePage - 1);
                const end = Math.min(totalPages - 1, safePage + 1);
                for (let i = start; i <= end; i++) pages.push(i);
                if (safePage < totalPages - 2) pages.push("...");
                pages.push(totalPages);
              }
              return pages.map((p, i) =>
                p === "..." ? (
                  <span key={`e${i}`} class="px-1 text-gray-400" aria-hidden="true">&hellip;</span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    aria-label={`Page ${p}`}
                    aria-current={p === safePage ? "page" : undefined}
                    class={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${FOCUS_RING} ${
                      p === safePage
                        ? "bg-primary-600 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ),
              );
            })()}

            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              class={`rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS_RING}`}
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
