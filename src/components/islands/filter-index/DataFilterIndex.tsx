/**
 * DataFilterIndex — the "fetch (or receive) a data array, render it as a
 * card grid" flavor of FilterIndex. This is what the LLMOps and MLOps
 * database pages use: it owns the facet rail, search box, sort, pagination,
 * URL state, mobile drawer, and empty state; the caller only supplies data
 * shape + a card renderer.
 *
 * Contract (registry `filterable-index.shell` / `filterable-index.zero-results`):
 * facet rail everywhere, no horizontal facet bar; 375px collapses the rail
 * behind one "Filters" trigger (drawer); zero-results replaces the RESULT
 * REGION only — header, chip strip, and facet rail stay in place.
 */
import type { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { FilterEmptyState } from "../shared/FilterEmptyState";
import { FacetRail } from "./FacetRail";
import { CloseIcon, FilterIcon, FOCUS_RING, SearchIcon } from "./icons";
import {
  LABS_MOBILE_FILTERS_COUNT,
  LABS_MOBILE_FILTERS_TRIGGER,
  LABS_RAIL_STICKY,
  LABS_SEARCH_ICON,
  LABS_SEARCH_INPUT,
  LABS_SEARCH_KBD,
  LABS_SEARCH_WRAP,
} from "./labsSkin";
import { Pagination } from "./Pagination";
import { ResultsCount } from "./ResultsCount";
import type { MultiFacetConfig, SingleFacetConfig } from "./types";
import {
  type SearchConfig,
  type SortConfig,
  useFilterState,
} from "./useFilterState";

// "labs" skin only: the accordion rail's Sort by panel replaces the
// toolbar <select> (FacetRail's SortFacetState). `short` is the quiet
// collapsed-row summary text; the panel itself still shows the full label.
const LABS_SORT_OPTIONS: { value: string; label: string; short: string }[] = [
  { value: "newest", label: "Newest first", short: "Newest" },
  { value: "az", label: "A – Z", short: "A – Z" },
  { value: "relevance", label: "Relevance", short: "Relevance" },
];

export interface DataFilterIndexProps<T> {
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
  loadingLabel: string;
  renderItem: (
    item: T,
    ctx: {
      isTagSelected: (slug: string) => boolean;
      toggleTag: (slug: string) => void;
      selectSingle: (slug: string) => void;
    },
  ) => ComponentChildren;
  gridClassName?: string;
  /** Class-only re-skin for the blog cutover (labsSkin.ts). Default keeps
   * /llmops-database, /mlops-database and /integrations on their existing
   * layout; only the site-wide purple→sage colour pass touched their colours.
   * "labs" also adds the Cmd/Ctrl+K shortcut that focuses the search input
   * (blog only — the approved blog design (DESIGN.md)) and moves the tag match-mode toggle
   * into the Tag facet block instead of the top controls row. */
  skin?: "default" | "labs";
}

export function DataFilterIndex<T>({
  idPrefix,
  pageSize,
  dataUrl,
  items,
  getSlug,
  getTitle,
  search,
  sort,
  singleFacet,
  multiFacet,
  resultNounPlural = "entries",
  loadingLabel,
  renderItem,
  gridClassName = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
  skin = "default",
}: DataFilterIndexProps<T>) {
  const labs = skin === "labs";
  const state = useFilterState<T>({
    idPrefix,
    pageSize,
    dataUrl,
    items,
    getSlug,
    getTitle,
    search,
    sort,
    singleFacet,
    multiFacet,
    resultNounPlural,
  });

  const drawerId = `${idPrefix}-filters-drawer`;
  const drawerTitleId = `${idPrefix}-filters-drawer-title`;
  const searchId = `${idPrefix}-search`;
  const sortId = `${idPrefix}-sort`;

  const itemCtx = {
    isTagSelected: (slug: string) => state.selectedMulti.includes(slug),
    toggleTag: state.toggleMulti,
    selectSingle: state.selectSingle,
  };

  const renderFacets = (scope: "desktop" | "mobile") => (
    <FacetRail
      idPrefix={idPrefix}
      scope={scope}
      skin={skin}
      single={
        singleFacet && {
          config: singleFacet,
          counts: state.singleCounts,
          selected: state.selectedSingle,
          onSelect: state.selectSingle,
        }
      }
      multi={
        multiFacet && {
          config: multiFacet,
          counts: state.multiCounts,
          selected: state.selectedMulti,
          onToggle: state.toggleMulti,
          visibleOptions: state.visibleMultiOptions,
          showAll: state.showAllMulti,
          onShowAll: () => setShowAllTrue(),
          onShowFewer: () => state.setShowAllMulti(false),
          search: state.multiSearch,
          onSearchChange: (value: string) => {
            state.setMultiSearch(value);
            state.setShowAllMulti(true);
          },
          ...(labs && {
            tagMode: state.tagMode,
            onSetTagMode: state.setTagMode,
          }),
        }
      }
      sort={
        labs && sort
          ? {
              options: LABS_SORT_OPTIONS,
              selected: state.sortMode,
              onSelect: (value: string) =>
                state.setSortMode(value as typeof state.sortMode),
            }
          : undefined
      }
    />
  );

  function setShowAllTrue() {
    state.setShowAllMulti(true);
  }

  const tagMap = new Map(
    (multiFacet?.options ?? []).map((t) => [t.slug, t.name]),
  );
  const singleMap = new Map(
    (singleFacet?.options ?? []).map((i) => [i.slug, i.name]),
  );

  // "labs" skin only: Cmd/Ctrl+K focuses the search input (DESIGN.md
  // §2 — the blog page's own search box, not a separate dropdown island).
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!labs || search.mode === "none") return;
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [labs, search.mode]);

  if (state.loading) {
    return (
      <output class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-(--color-sage-600)" />
          <p class="mt-4 text-sm text-gray-500">{loadingLabel}</p>
        </div>
      </output>
    );
  }

  if (state.error) {
    return (
      <div
        class="rounded-lg border border-red-200 bg-red-50 p-6 text-center"
        role="alert"
      >
        <p class="text-sm text-red-700">Failed to load data: {state.error}</p>
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

  return (
    <div
      class={
        labs
          ? "flex flex-col gap-(--rail-gap) lg:flex-row"
          : "flex flex-col gap-8 lg:flex-row"
      }
    >
      {/* Desktop sidebar */}
      <aside
        class={
          labs
            ? "hidden lg:block lg:w-(--rail-width) lg:shrink-0"
            : "hidden lg:block lg:w-64 lg:shrink-0"
        }
      >
        <div
          class={
            labs
              ? LABS_RAIL_STICKY
              : "sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
          }
        >
          {renderFacets("desktop")}
        </div>
      </aside>

      {/* Mobile drawer backdrop */}
      {state.mobileDrawerOpen && (
        <button
          type="button"
          class="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => state.setMobileDrawerOpen(false)}
          aria-label="Close filters"
        />
      )}

      {/* Mobile drawer */}
      <div
        ref={state.drawerRef}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={drawerTitleId}
        aria-hidden={!state.mobileDrawerOpen}
        class={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform bg-white shadow-xl transition-transform duration-200 lg:hidden ${
          state.mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div class="flex h-full flex-col">
          <div class="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h2 id={drawerTitleId} class="font-semibold text-gray-900">
              Filters
            </h2>
            <button
              ref={state.drawerCloseRef}
              type="button"
              onClick={() => state.setMobileDrawerOpen(false)}
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
              onClick={() => state.setMobileDrawerOpen(false)}
              class={`w-full rounded-lg bg-(--color-sage-900) px-4 py-2.5 text-sm font-medium text-(--color-cream-50) hover:bg-(--color-sage-800) ${FOCUS_RING}`}
            >
              Show {state.filtered.length} results
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div class="min-w-0 flex-1">
        {/* Search + controls row */}
        <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            ref={state.mobileFiltersButtonRef}
            type="button"
            aria-expanded={state.mobileDrawerOpen}
            aria-controls={drawerId}
            onClick={() => state.setMobileDrawerOpen(true)}
            class={
              labs
                ? `${LABS_MOBILE_FILTERS_TRIGGER} ${FOCUS_RING}`
                : `inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden ${FOCUS_RING}`
            }
          >
            <FilterIcon />
            Filters
            {(state.selectedMulti.length > 0 || state.selectedSingle) && (
              <span
                class={
                  labs
                    ? LABS_MOBILE_FILTERS_COUNT
                    : "ml-1 rounded-full bg-(--color-sage-100) px-1.5 py-0.5 text-xs font-semibold text-(--color-sage-900)"
                }
              >
                {state.selectedMulti.length + (state.selectedSingle ? 1 : 0)}
              </span>
            )}
          </button>

          {search.mode !== "none" && (
            <div class={labs ? LABS_SEARCH_WRAP : "relative flex-1"}>
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {labs ? (
                  <SearchIcon class={LABS_SEARCH_ICON} />
                ) : (
                  <SearchIcon />
                )}
              </div>
              <label for={searchId} class="sr-only">
                {search.ariaLabel ?? "Search"}
              </label>
              <input
                ref={labs ? searchInputRef : undefined}
                id={searchId}
                type="search"
                value={state.query}
                onInput={(e) =>
                  state.handleQueryChange((e.target as HTMLInputElement).value)
                }
                placeholder={search.placeholder ?? "Search..."}
                class={
                  labs
                    ? LABS_SEARCH_INPUT
                    : "w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-(--color-sage-400) focus:outline-none focus:ring-1 focus:ring-(--color-sage-400)"
                }
              />
              {labs && (
                <span class={LABS_SEARCH_KBD} aria-hidden="true">
                  ⌘K
                </span>
              )}
            </div>
          )}

          {multiFacet && !labs && (
            <fieldset
              class="flex items-center gap-1 rounded-lg border border-gray-300 p-1"
              aria-label="Tag match mode"
            >
              <legend class="sr-only">Tag match mode</legend>
              <label
                class={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-(--color-sage-400) ${
                  state.tagMode === "and"
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name={`${idPrefix}-tag-mode`}
                  value="and"
                  checked={state.tagMode === "and"}
                  onChange={() => state.setTagMode("and")}
                  class="sr-only"
                />
                Match All
              </label>
              <label
                class={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-(--color-sage-400) ${
                  state.tagMode === "or"
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name={`${idPrefix}-tag-mode`}
                  value="or"
                  checked={state.tagMode === "or"}
                  onChange={() => state.setTagMode("or")}
                  class="sr-only"
                />
                Match Any
              </label>
            </fieldset>
          )}

          {/* "labs" skin: sort moved into the accordion rail's "Sort by"
              group (FacetRail) — the toolbar keeps only search + filters
              trigger here. */}
          {sort && !labs && (
            <div class="sm:w-40">
              <label for={sortId} class="sr-only">
                Sort
              </label>
              <select
                id={sortId}
                value={state.sortMode}
                onChange={(e) =>
                  state.setSortMode(
                    (e.target as HTMLSelectElement)
                      .value as typeof state.sortMode,
                  )
                }
                class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 transition-colors focus:border-(--color-sage-400) focus:outline-none focus:ring-1 focus:ring-(--color-sage-400)"
              >
                <option value="newest">Newest first</option>
                <option value="az">A &ndash; Z</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>
          )}
        </div>

        {/* Active filter pills */}
        {state.hasActiveFilters && (
          <div class="mb-4 flex flex-wrap items-center gap-2">
            {state.selectedMulti.map((slug) => (
              <button
                key={slug}
                type="button"
                class={
                  labs
                    ? `inline-flex items-center gap-1 rounded-full border border-(--color-sage-400) bg-(--color-sage-50) px-2.5 py-1 text-[12px] text-(--color-sage-800) transition-colors hover:bg-(--color-sage-100) ${FOCUS_RING}`
                    : `inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 ${FOCUS_RING}`
                }
                onClick={() => state.toggleMulti(slug)}
                aria-label={`Remove tag ${tagMap.get(slug) || slug}`}
              >
                {tagMap.get(slug) || slug}
                <CloseIcon />
              </button>
            ))}
            {state.selectedSingle && (
              <button
                type="button"
                class={
                  labs
                    ? `inline-flex items-center gap-1 rounded-full border border-(--color-sage-400) bg-(--color-sage-50) px-2.5 py-1 text-[12px] text-(--color-sage-800) transition-colors hover:bg-(--color-sage-100) ${FOCUS_RING}`
                    : `inline-flex items-center gap-1 rounded-full bg-(--color-sage-100) px-2.5 py-1 text-xs font-medium text-(--color-sage-900) transition-colors hover:bg-(--color-sage-200) ${FOCUS_RING}`
                }
                onClick={() => state.selectSingle(state.selectedSingle)}
                aria-label={`Remove ${(singleFacet?.label ?? "filter").toLowerCase()} ${singleMap.get(state.selectedSingle) || state.selectedSingle}`}
              >
                {singleMap.get(state.selectedSingle) || state.selectedSingle}
                <CloseIcon />
              </button>
            )}
            <button
              type="button"
              class={
                labs
                  ? `text-[12px] text-(--color-cream-700) underline hover:text-(--color-cream-900) ${FOCUS_RING}`
                  : `text-xs font-medium text-gray-500 underline hover:text-gray-700 ${FOCUS_RING}`
              }
              onClick={state.clearAll}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Popular tags strip */}
        {!state.hasActiveFilters && state.popularMulti.length > 0 && (
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span
              class={
                labs
                  ? "text-[11px] text-(--color-cream-600)"
                  : "text-xs font-medium text-gray-400"
              }
            >
              Popular:
            </span>
            {state.popularMulti.map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => state.toggleMulti(slug)}
                class={
                  labs
                    ? `rounded-full border border-(--color-border) px-2.5 py-1 text-[12px] text-(--color-cream-700) transition-colors hover:border-(--color-sage-400) ${FOCUS_RING}`
                    : `rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 ${FOCUS_RING}`
                }
              >
                {tagMap.get(slug) || slug}
              </button>
            ))}
          </div>
        )}

        {/* Results count — live region for screen readers */}
        <ResultsCount
          shown={state.filtered.length}
          total={state.items.length}
          noun={resultNounPlural}
          statusText={state.resultsStatusText}
          skin={skin}
          filtersState={
            labs
              ? state.hasActiveFilters
                ? `${state.selectedMulti.length + (state.selectedSingle ? 1 : 0) + (state.query ? 1 : 0)} filters`
                : "no filters applied"
              : undefined
          }
        />

        {/* Results grid */}
        {state.paged.length === 0 ? (
          <FilterEmptyState
            selectedTagsCount={state.selectedMulti.length}
            hasIndustry={!!state.selectedSingle}
            query={state.query}
            isAndMode={state.tagMode === "and"}
            popularTags={state.popularMulti}
            tagLabel={(slug) => tagMap.get(slug) || slug}
            onSwitchToOrMode={() => state.setTagMode("or")}
            onClearTags={state.clearMulti}
            onClearIndustry={state.clearSingle}
            onClearQuery={() => state.handleQueryChange("")}
            onClearAll={state.clearAll}
            onSelectPopularTag={(slug) => {
              state.clearAll();
              state.toggleMulti(slug);
            }}
            skin={skin}
          />
        ) : (
          <div class={gridClassName}>
            {state.paged.map((item) => renderItem(item, itemCtx))}
          </div>
        )}

        <Pagination
          page={state.page}
          totalPages={state.totalPages}
          onChange={state.setPage}
          skin={skin}
        />
      </div>
    </div>
  );
}
