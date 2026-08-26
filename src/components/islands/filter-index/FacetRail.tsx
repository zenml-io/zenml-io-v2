/**
 * FacetRail — the vertical facet panel shared by every FilterIndex instance
 * (desktop sidebar + mobile drawer both render this, scoped by `scope` for
 * stable/unique element ids). Presentational only; all state lives in the
 * parent's filter-state hook.
 *
 * Contract (registry `filterable-index.shell`):
 * - Facet rail everywhere. No horizontal facet bar, no prop that creates one.
 * - Single-select facet: zero-result rows render disabled IN PLACE, never
 *   hidden — so the full option set stays visible and predictable.
 * - Multi-select facet: collapses to the first 10 by contextual count, with
 *   a "Show all N" / "Show fewer" toggle, plus an in-rail search box that
 *   filters the option list itself.
 * - Counts are comma-formatted and sit in a fixed-width right-aligned lane.
 * - `handleFacetListKeyDown` (arrow/home/end) wires every `<ul>` here.
 */

import { FOCUS_RING, SearchIcon } from "./icons";
import { handleFacetListKeyDown } from "./keyboard";
import type {
  FilterOption,
  MultiFacetConfig,
  SingleFacetConfig,
} from "./types";

/** Fixed-width, right-aligned lane for facet counts (comma-formatted). */
const COUNT_LANE = "ml-2 w-11 shrink-0 text-right text-xs tabular-nums";

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Selected/hover treatment for the single-select facet. "zenml" is the
 * LLMOps/MLOps database pages' look (bg-zenml-50 text-zenml-700,
 * font-medium); "primary" reproduces the Integrations sidebar's existing
 * primary-toned, font-semibold selected state so adopting the shared rail
 * doesn't reskin that page's palette.
 */
export type SingleFacetTone = "zenml" | "primary";

const SINGLE_TONE_SELECTED: Record<SingleFacetTone, string> = {
  zenml: "bg-zenml-50 font-medium text-zenml-700",
  primary: "bg-primary-50 font-semibold text-primary-700",
};

const SINGLE_TONE_COUNT: Record<SingleFacetTone, string> = {
  zenml: "text-zenml-500",
  primary: "text-primary-500",
};

export interface SingleFacetState<T> {
  config: SingleFacetConfig<T>;
  counts: Map<string, number>;
  selected: string;
  onSelect: (slug: string) => void;
  tone?: SingleFacetTone;
}

export interface MultiFacetState<T> {
  config: MultiFacetConfig<T>;
  counts: Map<string, number>;
  selected: string[];
  onToggle: (slug: string) => void;
  visibleOptions: FilterOption[];
  showAll: boolean;
  onShowAll: () => void;
  onShowFewer: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export interface FacetRailProps<T> {
  idPrefix: string;
  scope: "desktop" | "mobile";
  single?: SingleFacetState<T>;
  multi?: MultiFacetState<T>;
}

export function FacetRail<T>({
  idPrefix,
  scope,
  single,
  multi,
}: FacetRailProps<T>) {
  const tagSearchId = `${idPrefix}-tag-search-${scope}`;

  return (
    <div class="space-y-6">
      {single && (
        <div>
          <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {single.config.label}
          </h3>
          <ul class="space-y-1" onKeyDown={handleFacetListKeyDown}>
            {single.config.options.map((opt) => {
              const tone = single.tone ?? "zenml";
              const count = single.counts.get(opt.slug) || 0;
              const isSelected = single.selected === opt.slug;
              const isDisabled = count === 0 && !isSelected;
              return (
                <li key={opt.slug}>
                  <button
                    type="button"
                    onClick={() => single.onSelect(opt.slug)}
                    aria-pressed={isSelected}
                    disabled={isDisabled}
                    class={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${FOCUS_RING} ${
                      isSelected
                        ? SINGLE_TONE_SELECTED[tone]
                        : count > 0
                          ? "text-gray-700 hover:bg-gray-50"
                          : "text-gray-400"
                    }`}
                  >
                    <span class="truncate">{opt.name}</span>
                    <span
                      class={`${COUNT_LANE} ${isSelected ? SINGLE_TONE_COUNT[tone] : "text-gray-400"}`}
                    >
                      {formatCount(count)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {multi && (
        <div>
          <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {multi.config.label}
          </h3>

          <div class="relative mb-2">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
              <SearchIcon />
            </div>
            <label for={tagSearchId} class="sr-only">
              {multi.config.searchAriaLabel ?? `Search ${multi.config.label}`}
            </label>
            <input
              id={tagSearchId}
              type="search"
              value={multi.search}
              onInput={(e) =>
                multi.onSearchChange((e.target as HTMLInputElement).value)
              }
              placeholder={multi.config.searchPlaceholder ?? "Search tags..."}
              class="w-full rounded-md border border-gray-200 py-1.5 pl-8 pr-3 text-sm placeholder-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          <ul class="space-y-0.5" onKeyDown={handleFacetListKeyDown}>
            {multi.visibleOptions.map((opt) => {
              const count = multi.counts.get(opt.slug) || 0;
              const isSelected = multi.selected.includes(opt.slug);
              return (
                <li key={opt.slug}>
                  <button
                    type="button"
                    onClick={() => multi.onToggle(opt.slug)}
                    aria-pressed={isSelected}
                    class={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${FOCUS_RING} ${
                      isSelected
                        ? "bg-blue-50 font-medium text-blue-700"
                        : count > 0
                          ? "text-gray-700 hover:bg-gray-50"
                          : "text-gray-400"
                    }`}
                  >
                    <span class="truncate">{opt.name}</span>
                    <span
                      class={`${COUNT_LANE} ${isSelected ? "text-blue-500" : "text-gray-400"}`}
                    >
                      {formatCount(count)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {!multi.search &&
            !multi.showAll &&
            multi.config.options.length > 10 && (
              <button
                type="button"
                onClick={multi.onShowAll}
                aria-expanded={false}
                class={`mt-2 text-xs font-medium text-primary-600 hover:text-primary-700 ${FOCUS_RING}`}
              >
                Show all {formatCount(multi.config.options.length)}{" "}
                {multi.config.itemNounPlural ?? "tags"}
              </button>
            )}
          {multi.showAll && !multi.search && (
            <button
              type="button"
              onClick={multi.onShowFewer}
              class={`mt-2 text-xs font-medium text-gray-500 hover:text-gray-700 ${FOCUS_RING}`}
            >
              Show fewer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
