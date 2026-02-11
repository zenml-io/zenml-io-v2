/**
 * LLMOps Database client-side filter island.
 *
 * Fetches /llmops-index.json on mount and provides:
 * - Text search (title, company, summary)
 * - Multi-select llmops-tag filter (AND logic)
 * - Single-select industry filter
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

/** Pre-processed item with lowercased search text for fast filtering */
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

// ── URL State ──────────────────────────────────────────────────────

interface FilterState {
  q: string;
  tags: string[];
  industry: string;
  page: number;
}

function parseStateFromUrl(): FilterState {
  if (typeof window === "undefined") return { q: "", tags: [], industry: "", page: 1 };
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") || "",
    tags: params.get("tags")?.split(",").filter(Boolean) || [],
    industry: params.get("industry") || "",
    page: Math.max(1, parseInt(params.get("page") || "1", 10) || 1),
  };
}

function writeStateToUrl(state: FilterState): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.tags.length) params.set("tags", state.tags.join(","));
  if (state.industry) params.set("industry", state.industry);
  if (state.page > 1) params.set("page", String(state.page));
  const search = params.toString();
  const url = window.location.pathname + (search ? `?${search}` : "");
  window.history.replaceState(null, "", url);
}

// ── Filter Logic ───────────────────────────────────────────────────

function matchesQuery(item: ProcessedItem, q: string): boolean {
  if (!q) return true;
  return item.searchText.includes(q.toLowerCase());
}

function matchesTags(item: LLMOpsIndexItem, selected: string[]): boolean {
  if (!selected.length) return true;
  return selected.every((tag) => item.llmopsTags.includes(tag));
}

function matchesIndustry(item: LLMOpsIndexItem, industry: string): boolean {
  if (!industry) return true;
  return item.industryTags === industry;
}

// ── Component ──────────────────────────────────────────────────────

export default function LLMOpsFilter({ tags, industries, pageSize = 24 }: LLMOpsFilterProps) {
  const [items, setItems] = useState<ProcessedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state — initialized from URL
  const initial = useMemo(parseStateFromUrl, []);
  const [query, setQuery] = useState(initial.q);
  const [selectedTags, setSelectedTags] = useState<string[]>(initial.tags);
  const [selectedIndustry, setSelectedIndustry] = useState(initial.industry);
  const [page, setPage] = useState(initial.page);

  // Tag search within dropdown
  const [tagSearch, setTagSearch] = useState("");

  // Lookup maps for display names
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
  }, []);

  // Filter + paginate
  const filtered = useMemo(() => {
    return items.filter(
      (item) => matchesQuery(item, query) && matchesTags(item, selectedTags) && matchesIndustry(item, selectedIndustry),
    );
  }, [items, query, selectedTags, selectedIndustry]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  // Sync URL when filters change
  useEffect(() => {
    writeStateToUrl({ q: query, tags: selectedTags, industry: selectedIndustry, page: safePage });
  }, [query, selectedTags, selectedIndustry, safePage]);

  // Reset page when filters change
  const resetPage = useCallback(() => setPage(1), []);

  const handleQueryChange = (e: Event) => {
    setQuery((e.target as HTMLInputElement).value);
    resetPage();
  };

  const toggleTag = (slug: string) => {
    setSelectedTags((prev) => (prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug]));
    resetPage();
  };

  const handleIndustryChange = (e: Event) => {
    setSelectedIndustry((e.target as HTMLSelectElement).value);
    resetPage();
  };

  const clearAll = () => {
    setQuery("");
    setSelectedTags([]);
    setSelectedIndustry("");
    setPage(1);
  };

  // Filter the tag list for the dropdown search
  const filteredTags = useMemo(() => {
    if (!tagSearch) return tags;
    const lower = tagSearch.toLowerCase();
    return tags.filter((t) => t.name.toLowerCase().includes(lower) || t.slug.includes(lower));
  }, [tags, tagSearch]);

  const hasActiveFilters = query || selectedTags.length > 0 || selectedIndustry;

  // Ref for the tag dropdown details element
  const tagDetailsRef = useRef<HTMLDetailsElement>(null);

  // ── Loading / Error states ───────────────────────────────────────

  if (loading) {
    return (
      <div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600" />
          <p class="mt-4 text-sm text-gray-500">Loading LLMOps database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div class="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p class="text-sm text-red-700">Failed to load data: {error}</p>
        <button
          type="button"
          class="mt-3 text-sm font-medium text-red-600 underline hover:text-red-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────

  return (
    <div>
      {/* Filter controls */}
      <div class="mb-8 space-y-4">
        {/* Search + Industry row */}
        <div class="flex flex-col gap-4 sm:flex-row">
          {/* Text search */}
          <div class="flex-1">
            <label for="llmops-search" class="sr-only">Search</label>
            <input
              id="llmops-search"
              type="search"
              value={query}
              onInput={handleQueryChange}
              placeholder="Search by title, company, or summary..."
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          {/* Industry select */}
          <div class="sm:w-56">
            <label for="llmops-industry" class="sr-only">Industry</label>
            <select
              id="llmops-industry"
              value={selectedIndustry}
              onChange={handleIndustryChange}
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            >
              <option value="">All industries</option>
              {industries.map((ind) => (
                <option key={ind.slug} value={ind.slug}>
                  {ind.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tag multi-select dropdown */}
        <details ref={tagDetailsRef} class="relative">
          <summary class="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:border-gray-400 list-none [&::-webkit-details-marker]:hidden">
            <svg class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 7.5L10 12.5L15 7.5" />
            </svg>
            <span>
              {selectedTags.length > 0
                ? `${selectedTags.length} tag${selectedTags.length !== 1 ? "s" : ""} selected`
                : "Filter by tags..."}
            </span>
          </summary>

          <div class="absolute left-0 z-20 mt-1 w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-lg sm:w-96">
            {/* Tag search */}
            <div class="border-b border-gray-100 p-2">
              <input
                type="search"
                value={tagSearch}
                onInput={(e) => setTagSearch((e.target as HTMLInputElement).value)}
                placeholder="Search tags..."
                class="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm placeholder-gray-400 focus:border-primary-600 focus:outline-none"
              />
            </div>

            {/* Tag checkboxes */}
            <div class="max-h-60 overflow-y-auto p-2">
              {filteredTags.length === 0 ? (
                <p class="px-2 py-3 text-center text-sm text-gray-400">No matching tags</p>
              ) : (
                filteredTags.map((tag) => (
                  <label
                    key={tag.slug}
                    class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.slug)}
                      onChange={() => toggleTag(tag.slug)}
                      class="h-4 w-4 rounded border-gray-300 text-primary-600"
                    />
                    {tag.name}
                  </label>
                ))
              )}
            </div>

            {/* Selected count + clear */}
            {selectedTags.length > 0 && (
              <div class="flex items-center justify-between border-t border-gray-100 px-3 py-2">
                <span class="text-xs text-gray-500">{selectedTags.length} selected</span>
                <button
                  type="button"
                  class="text-xs font-medium text-primary-600 hover:text-primary-700"
                  onClick={() => { setSelectedTags([]); resetPage(); }}
                >
                  Clear tags
                </button>
              </div>
            )}
          </div>
        </details>

        {/* Selected tags pills + clear all */}
        {hasActiveFilters && (
          <div class="flex flex-wrap items-center gap-2">
            {selectedTags.map((slug) => (
              <button
                key={slug}
                type="button"
                class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                onClick={() => toggleTag(slug)}
                aria-label={`Remove tag ${tagMap.get(slug) || slug}`}
              >
                {tagMap.get(slug) || slug}
                <svg class="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9L9 3M3 3l6 6" />
                </svg>
              </button>
            ))}
            {selectedIndustry && (
              <span class="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                {industryMap.get(selectedIndustry) || selectedIndustry}
              </span>
            )}
            <button
              type="button"
              class="text-xs font-medium text-gray-500 underline hover:text-gray-700"
              onClick={clearAll}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div class="mb-4 text-sm text-gray-500">
        {filtered.length === items.length
          ? `${items.length} entries`
          : `${filtered.length} of ${items.length} entries`}
      </div>

      {/* Results grid */}
      {paged.length === 0 ? (
        <div class="rounded-lg border border-gray-200 bg-gray-50 py-16 text-center">
          <p class="text-gray-500">No entries match your filters.</p>
          {hasActiveFilters && (
            <button
              type="button"
              class="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
              onClick={clearAll}
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((item) => (
            <a
              key={item.slug}
              href={`/llmops-database/${item.slug}`}
              class="group flex flex-col rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <h3 class="font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2">
                {item.title}
              </h3>

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
                    <span class="rounded-full bg-purple-50 px-2 py-0.5 text-purple-700">
                      {industryMap.get(item.industryTags) || item.industryTags}
                    </span>
                  </>
                )}
              </div>

              {item.summary && (
                <p class="mt-2 text-sm text-gray-600 line-clamp-2">{item.summary}</p>
              )}

              {item.llmopsTags.length > 0 && (
                <div class="mt-auto flex flex-wrap gap-1 pt-3">
                  {item.llmopsTags.slice(0, 3).map((tagSlug) => (
                    <span
                      key={tagSlug}
                      class="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700"
                    >
                      {tagMap.get(tagSlug) || tagSlug}
                    </span>
                  ))}
                  {item.llmopsTags.length > 3 && (
                    <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      +{item.llmopsTags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </a>
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
            class="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {/* Page numbers — show up to 7 pages with ellipsis */}
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
                <span key={`e${i}`} class="px-1 text-gray-400">...</span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  class={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
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
            class="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
