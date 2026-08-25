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
import { FilterEmptyState } from "../shared/FilterEmptyState";
import { FacetRail } from "./FacetRail";
import { CloseIcon, FilterIcon, FOCUS_RING, SearchIcon } from "./icons";
import { Pagination } from "./Pagination";
import type { MultiFacetConfig, SingleFacetConfig } from "./types";
import {
  type SearchConfig,
  type SortConfig,
  useFilterState,
} from "./useFilterState";

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
  loadingLabel,
  renderItem,
  gridClassName = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
}: DataFilterIndexProps<T>) {
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
        }
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

  if (state.loading) {
    return (
      <output class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600" />
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
    <div class="flex flex-col gap-8 lg:flex-row">
      {/* Desktop sidebar */}
      <aside class="hidden lg:block lg:w-64 lg:shrink-0">
        <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
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
              class={`w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 ${FOCUS_RING}`}
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
            class={`inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden ${FOCUS_RING}`}
          >
            <FilterIcon />
            Filters
            {(state.selectedMulti.length > 0 || state.selectedSingle) && (
              <span class="ml-1 rounded-full bg-primary-100 px-1.5 py-0.5 text-xs font-semibold text-primary-700">
                {state.selectedMulti.length + (state.selectedSingle ? 1 : 0)}
              </span>
            )}
          </button>

          {search.mode !== "none" && (
            <div class="relative flex-1">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
              </div>
              <label for={searchId} class="sr-only">
                {search.ariaLabel ?? "Search"}
              </label>
              <input
                id={searchId}
                type="search"
                value={state.query}
                onInput={(e) =>
                  state.handleQueryChange((e.target as HTMLInputElement).value)
                }
                placeholder={search.placeholder ?? "Search..."}
                class="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              />
            </div>
          )}

          {multiFacet && (
            <fieldset
              class="flex items-center gap-1 rounded-lg border border-gray-300 p-1"
              aria-label="Tag match mode"
            >
              <legend class="sr-only">Tag match mode</legend>
              <label
                class={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-600 ${
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
                class={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-600 ${
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

          {sort && (
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
                class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
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
                class={`inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 ${FOCUS_RING}`}
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
                class={`inline-flex items-center gap-1 rounded-full bg-zenml-50 px-2.5 py-1 text-xs font-medium text-zenml-700 transition-colors hover:bg-zenml-100 ${FOCUS_RING}`}
                onClick={() => state.selectSingle(state.selectedSingle)}
                aria-label={`Remove ${(singleFacet?.label ?? "filter").toLowerCase()} ${singleMap.get(state.selectedSingle) || state.selectedSingle}`}
              >
                {singleMap.get(state.selectedSingle) || state.selectedSingle}
                <CloseIcon />
              </button>
            )}
            <button
              type="button"
              class={`text-xs font-medium text-gray-500 underline hover:text-gray-700 ${FOCUS_RING}`}
              onClick={state.clearAll}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Popular tags strip */}
        {!state.hasActiveFilters && state.popularMulti.length > 0 && (
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="text-xs font-medium text-gray-400">Popular:</span>
            {state.popularMulti.map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => state.toggleMulti(slug)}
                class={`rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 ${FOCUS_RING}`}
              >
                {tagMap.get(slug) || slug}
              </button>
            ))}
          </div>
        )}

        {/* Results count — live region for screen readers */}
        <output
          class="mb-4 block text-sm text-gray-500"
          aria-live="polite"
          aria-atomic="true"
        >
          <span aria-hidden="true">
            {state.filtered.length === state.items.length
              ? `${state.items.length.toLocaleString("en-US")} entries`
              : `${state.filtered.length.toLocaleString("en-US")} of ${state.items.length.toLocaleString("en-US")} entries`}
          </span>
          <span class="sr-only">{state.resultsStatusText}</span>
        </output>

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
        />
      </div>
    </div>
  );
}
