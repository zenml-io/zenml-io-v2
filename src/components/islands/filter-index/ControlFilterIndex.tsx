/**
 * ControlFilterIndex — the "toggle visibility of already-rendered markup"
 * flavor of FilterIndex. /integrations has 60+ cards whose visual design
 * (gradient hover, image tile, etc.) lives in `IntegrationCard.astro`'s
 * scoped `<style>` — an Astro component can't be rendered inside a Preact
 * island, so re-implementing the card in TSX would risk silently losing
 * that styling (the exact Wave-1 "scoped-cid classes die across component
 * boundaries" trap). Instead, the grid keeps rendering server-side and is
 * passed in as the default slot (`children`); this component owns only the
 * facet rail + search box, and flips `display` on the rendered cards by a shared
 * `data-slug` attribute — the same mechanism the vanilla filter script
 * used, just driven by the shared rail's state instead of one `data-filter`
 * click handler.
 */
import type { ComponentChildren } from "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";
import type { SingleFacetTone } from "./FacetRail";
import { FacetRail } from "./FacetRail";
import { CloseIcon, FilterIcon, FOCUS_RING, SearchIcon } from "./icons";
import type { SingleFacetConfig } from "./types";
import { useFilterState } from "./useFilterState";

export interface ControlFilterIndexProps<T> {
  idPrefix: string;
  items: T[];
  getSlug: (item: T) => string;
  getSearchText: (item: T) => string;
  singleFacet: SingleFacetConfig<T>;
  singleTone?: SingleFacetTone;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  /** Attribute (no leading "data-") the rendered cards carry their slug in. */
  slugAttr?: string;
  /** CSS selector for the empty-state element inside `children`. */
  emptyStateSelector?: string;
  children: ComponentChildren;
}

export function ControlFilterIndex<T>({
  idPrefix,
  items,
  getSlug,
  getSearchText,
  singleFacet,
  singleTone,
  searchPlaceholder,
  searchAriaLabel,
  slugAttr = "data-slug",
  emptyStateSelector = "#empty-state",
  children,
}: ControlFilterIndexProps<T>) {
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
      <div class="relative flex-1">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
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
          class="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
    );
  };

  return (
    <div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
      {/* Mobile controls row: filter trigger + search */}
      <div class="flex items-center gap-3 lg:hidden">
        <button
          ref={state.mobileFiltersButtonRef}
          type="button"
          aria-expanded={state.mobileDrawerOpen}
          aria-controls={drawerId}
          onClick={() => state.setMobileDrawerOpen(true)}
          class={`inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 ${FOCUS_RING}`}
        >
          <FilterIcon />
          Filters
          {state.selectedSingle && (
            <span class="ml-1 rounded-full bg-primary-100 px-1.5 py-0.5 text-xs font-semibold text-primary-700">
              1
            </span>
          )}
        </button>
        {renderSearchBox("mobile")}
      </div>

      {/* Desktop sidebar */}
      <aside class="hidden lg:block lg:w-56 lg:shrink-0">
        <div class="sticky top-24 flex flex-col gap-4">
          {renderSearchBox("desktop")}
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

      {/* Card grid — server-rendered markup, unchanged; only visibility is controlled here */}
      <div ref={gridRef} class="flex-1">
        {children}
      </div>
    </div>
  );
}
