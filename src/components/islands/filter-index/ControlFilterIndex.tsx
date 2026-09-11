/**
 * ControlFilterIndex — the "toggle visibility of already-rendered markup"
 * flavor of FilterIndex. /integrations has 60+ cards rendered by an Astro
 * component (`labs.integration-card`), and an Astro component can't be
 * rendered inside a Preact island, so re-implementing the card in TSX would
 * risk silently losing its styling (the exact Wave-1 "scoped-cid classes die
 * across component boundaries" trap). Instead, the grid keeps rendering
 * server-side and is passed in as the default slot (`children`); this
 * component owns only the facet rail + search box, and flips `display` on
 * the rendered cards by a shared `data-slug` attribute — the same mechanism
 * the vanilla filter script used, just driven by the shared rail's state
 * instead of one `data-filter` click handler.
 *
 * `skin="labs"` (the integrations cutover) re-skins the shell onto the same
 * class strings `DataFilterIndex`'s labs branch uses (labsSkin.ts) and
 * swaps the page-owned empty-state element for the shared
 * `FilterEmptyState` block, fed by the engine's constraint/drop-one
 * analysis. The search box stays inside the desktop aside on this skin (the
 * hydration probe's `#integrations-search-desktop` selector), rather than
 * moving to a toolbar as the blog's does. Behaviour is identical on both
 * skins; `skin="default"` renders exactly what it always did.
 */
import type { ComponentChildren } from "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { LABS_BUTTON_BASE } from "../../labs/labsButtonStyles";
import { FilterEmptyState } from "../shared/FilterEmptyState";
import type { SingleFacetTone } from "./FacetRail";
import { FacetRail } from "./FacetRail";
import { CloseIcon, FilterIcon, FOCUS_RING, SearchIcon } from "./icons";
import {
  LABS_MOBILE_FILTERS_COUNT,
  LABS_MOBILE_FILTERS_TRIGGER,
  LABS_RAIL_STICKY,
  LABS_SEARCH_ICON,
  LABS_SEARCH_INPUT,
  LABS_SEARCH_WRAP,
} from "./labsSkin";
import { ResultsCount } from "./ResultsCount";
import type { SingleFacetConfig } from "./types";
import { useFilterState } from "./useFilterState";

export interface ControlFilterIndexProps<T> {
  idPrefix: string;
  items: T[];
  getSlug: (item: T) => string;
  getSearchText: (item: T) => string;
  singleFacet: SingleFacetConfig<T>;
  singleTone?: SingleFacetTone;
  /** Noun for the result count / status line. Default "entries". */
  resultNounPlural?: string;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  /** Attribute (no leading "data-") the rendered cards carry their slug in. */
  slugAttr?: string;
  /** CSS selector for the empty-state element inside `children`. */
  emptyStateSelector?: string;
  /** Rail heading on the labs skin. Default "Filter and sort" (FacetRail). */
  railHeading?: string;
  /** Class-only re-skin (labsSkin.ts). Default keeps today's classes. */
  skin?: "default" | "labs";
  children: ComponentChildren;
}

export function ControlFilterIndex<T>({
  idPrefix,
  items,
  getSlug,
  getSearchText,
  singleFacet,
  singleTone,
  resultNounPlural = "entries",
  searchPlaceholder,
  searchAriaLabel,
  slugAttr = "data-slug",
  emptyStateSelector = "#empty-state",
  railHeading,
  skin = "default",
  children,
}: ControlFilterIndexProps<T>) {
  const labs = skin === "labs";
  const state = useFilterState<T>({
    idPrefix,
    items,
    getSlug,
    getTitle: getSlug,
    search: {
      mode: "substring",
      getSearchText,
      placeholder: searchPlaceholder,
      ariaLabel: searchAriaLabel,
    },
    singleFacet,
    resultNounPlural,
  });

  const gridRef = useRef<HTMLDivElement | null>(null);

  const matchedSlugs = useMemo(
    () => new Set(state.filtered.map(getSlug)),
    [state.filtered, getSlug],
  );

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>(`[${slugAttr}]`);
    let visibleCount = 0;
    cards.forEach((card) => {
      const slug = card.getAttribute(slugAttr) ?? "";
      const show = matchedSlugs.has(slug);
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });
    const emptyEl = root.querySelector<HTMLElement>(emptyStateSelector);
    if (emptyEl) emptyEl.classList.toggle("hidden", visibleCount > 0);
  }, [matchedSlugs, slugAttr, emptyStateSelector]);

  const drawerId = `${idPrefix}-filters-drawer`;
  const drawerTitleId = `${idPrefix}-filters-drawer-title`;

  const renderFacets = (scope: "desktop" | "mobile") => (
    <FacetRail
      idPrefix={idPrefix}
      scope={scope}
      skin={skin}
      heading={railHeading}
      single={{
        config: singleFacet,
        counts: state.singleCounts,
        selected: state.selectedSingle,
        onSelect: state.selectSingle,
        tone: singleTone,
      }}
    />
  );

  // Rendered once per scope (desktop sidebar, mobile controls row) — each
  // needs its own id, the same way FacetRail scopes its own ids, so the two
  // <input>s don't collide.
  const renderSearchBox = (scope: "desktop" | "mobile") => {
    const searchId = `${idPrefix}-search-${scope}`;
    return (
      <div class={labs ? LABS_SEARCH_WRAP : "relative flex-1"}>
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {labs ? <SearchIcon class={LABS_SEARCH_ICON} /> : <SearchIcon />}
        </div>
        <label for={searchId} class="sr-only">
          {searchAriaLabel ?? "Search"}
        </label>
        <input
          id={searchId}
          type="search"
          value={state.query}
          onInput={(e) =>
            state.handleQueryChange((e.target as HTMLInputElement).value)
          }
          placeholder={searchPlaceholder ?? "Search..."}
          class={
            labs
              ? LABS_SEARCH_INPUT
              : "w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-(--color-sage-400) focus:outline-none focus:ring-1 focus:ring-(--color-sage-400)"
          }
        />
      </div>
    );
  };

  return (
    <div
      class={
        labs
          ? "flex flex-col gap-10 lg:flex-row lg:gap-(--rail-gap)"
          : "flex flex-col gap-8 lg:flex-row lg:gap-12"
      }
    >
      {/* Mobile controls row: filter trigger + search */}
      <div class="flex items-center gap-3 lg:hidden">
        <button
          ref={state.mobileFiltersButtonRef}
          type="button"
          aria-expanded={state.mobileDrawerOpen}
          aria-controls={drawerId}
          onClick={() => state.setMobileDrawerOpen(true)}
          class={
            labs
              ? `${LABS_MOBILE_FILTERS_TRIGGER} ${FOCUS_RING}`
              : `inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 ${FOCUS_RING}`
          }
        >
          <FilterIcon />
          Filters
          {state.selectedSingle && (
            <span
              class={
                labs
                  ? LABS_MOBILE_FILTERS_COUNT
                  : "ml-1 rounded-full bg-(--color-sage-100) px-1.5 py-0.5 text-xs font-semibold text-(--color-sage-900)"
              }
            >
              1
            </span>
          )}
        </button>
        {renderSearchBox("mobile")}
      </div>

      {/* Desktop sidebar */}
      <aside
        class={
          labs
            ? "hidden lg:block lg:w-(--rail-width) lg:shrink-0"
            : "hidden lg:block lg:w-56 lg:shrink-0"
        }
      >
        <div
          class={labs ? LABS_RAIL_STICKY : "sticky top-24 flex flex-col gap-4"}
        >
          {/* The labs rail (`LABS_RAIL_STICKY`) carries no flex gap because the
              data flavour keeps its search in the toolbar; this flavour is the
              one that stacks search over the rail, so it owns the gap. */}
          {labs ? (
            <div class="mb-8">{renderSearchBox("desktop")}</div>
          ) : (
            renderSearchBox("desktop")
          )}
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
        class={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform ${
          labs ? "bg-(--color-card)" : "bg-white shadow-xl"
        } transition-transform duration-200 lg:hidden ${
          state.mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div class="flex h-full flex-col">
          <div
            class={
              labs
                ? "flex items-center justify-between border-b border-(--color-border) px-4 py-3"
                : "flex items-center justify-between border-b border-gray-200 px-4 py-3"
            }
          >
            <h2
              id={drawerTitleId}
              class={
                labs
                  ? "font-display text-[19px] text-(--color-cream-900)"
                  : "font-semibold text-gray-900"
              }
            >
              Filters
            </h2>
            <button
              ref={state.drawerCloseRef}
              type="button"
              onClick={() => state.setMobileDrawerOpen(false)}
              class={
                labs
                  ? `rounded-full border border-(--color-border) p-1.5 text-(--color-cream-700) transition-colors hover:border-(--color-sage-400) ${FOCUS_RING}`
                  : `rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 ${FOCUS_RING}`
              }
              aria-label="Close filters"
            >
              <CloseIcon />
            </button>
          </div>
          <div class="flex-1 overflow-y-auto px-4 py-4">
            {renderFacets("mobile")}
          </div>
          <div
            class={
              labs
                ? "border-t border-(--color-border) px-4 py-3"
                : "border-t border-gray-200 px-4 py-3"
            }
          >
            <button
              type="button"
              onClick={() => state.setMobileDrawerOpen(false)}
              class={
                labs
                  ? `${LABS_BUTTON_BASE} w-full bg-(--color-sage-800) text-(--color-sage-50) hover:bg-(--color-sage-900) ${FOCUS_RING}`
                  : `w-full rounded-lg bg-(--color-sage-900) px-4 py-2.5 text-sm font-medium text-(--color-cream-50) hover:bg-(--color-sage-800) ${FOCUS_RING}`
              }
            >
              {labs
                ? `See ${state.filtered.length.toLocaleString("en-US")} results`
                : `Show ${state.filtered.length} results`}
            </button>
          </div>
        </div>
      </div>

      {/* Card grid — server-rendered markup, unchanged; only visibility is controlled here */}
      <div class="min-w-0 flex-1">
        {/* Results count — same visible polite live region as DataFilterIndex (#249 contract) */}
        <ResultsCount
          shown={state.filtered.length}
          total={items.length}
          noun={resultNounPlural}
          statusText={state.resultsStatusText}
          skin={skin}
          filtersState={
            labs
              ? state.hasActiveFilters
                ? `${state.activeConstraints.length} filters`
                : "no filters applied"
              : undefined
          }
        />
        {labs && state.filtered.length === 0 && (
          <FilterEmptyState
            selectedTagsCount={state.selectedMulti.length}
            hasIndustry={!!state.selectedSingle}
            query={state.query}
            isAndMode={state.tagMode === "and"}
            popularTags={[]}
            tagLabel={(slug) => slug}
            onSwitchToOrMode={() => state.setTagMode("or")}
            onClearTags={state.clearMulti}
            onClearIndustry={state.clearSingle}
            onClearQuery={() => state.handleQueryChange("")}
            onClearAll={state.clearAll}
            onSelectPopularTag={(slug) => {
              state.clearAll();
              state.toggleMulti(slug);
            }}
            constraints={state.activeConstraints}
            suggestions={state.dropOneSuggestions.map((suggestion) => ({
              label: suggestion.label,
              count: suggestion.count,
              onApply: suggestion.apply,
            }))}
            skin={skin}
          />
        )}
        <div ref={gridRef}>{children}</div>
      </div>
    </div>
  );
}
