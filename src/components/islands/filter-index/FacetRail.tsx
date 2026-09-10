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
 *
 * `skin="labs"` (blog cutover) renders a different shape entirely: an
 * accordion rail (`LabsFacetRail` below) — one hairline-separated disclosure
 * row per group (Sort by / Category / Tags, plus one group per extra
 * single-select facet), each opening a panel that holds the same option
 * lists. `skin="default"` (every other consumer) renders
 * `DefaultFacetRail`, a copy of the original always-expanded (colours now sage after the purple pass)
 * layout — the two are separate components so the default output can never
 * drift while the accordion evolves.
 */

import { useState } from "preact/hooks";
import { ChevronIcon, FOCUS_RING, SearchIcon } from "./icons";
import { handleFacetListKeyDown } from "./keyboard";
import {
  LABS_ACCORDION_GROUP,
  LABS_ACCORDION_PANEL,
  LABS_ACCORDION_TRIGGER,
  LABS_ACCORDION_TRIGGER_LABEL,
  LABS_ACCORDION_TRIGGER_VALUE,
  LABS_FACET_ROW_COUNT_LANE,
  LABS_FACET_SEARCH_INPUT,
  LABS_FACET_SHOW_ALL,
  LABS_FACET_SHOW_FEWER,
  LABS_RAIL_HEADING,
  LABS_TAG_MODE_FIELDSET,
  LABS_TAG_MODE_LABEL,
  labsFacetRowClass,
  labsSortRowClass,
} from "./labsSkin";
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
 * Selected/hover treatment for the single-select facet, in sage/cream tokens
 * (the ramps live on `:root` in global.css since the blog cutover, so they
 * resolve on the database pages too). "zenml" is the LLMOps/MLOps database
 * pages' tone (font-medium), "primary" the Integrations sidebar's
 * (font-semibold); both read the same sage steps since the purple pass and
 * differ only in weight.
 */
export type SingleFacetTone = "zenml" | "primary";

const SINGLE_TONE_SELECTED: Record<SingleFacetTone, string> = {
  zenml: "bg-(--color-sage-100) font-medium text-(--color-sage-900)",
  primary: "bg-(--color-sage-100) font-semibold text-(--color-sage-900)",
};

const SINGLE_TONE_COUNT: Record<SingleFacetTone, string> = {
  zenml: "text-(--color-cream-600)",
  primary: "text-(--color-cream-600)",
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
  /** "labs" skin only (DESIGN.md "Tag facet extras"): the
   * Match-all/Match-any toggle renders inside the Tag facet block instead
   * of the top controls row. Optional so non-tag multi facets (none exist
   * today, but the type stays honest) don't require it. */
  tagMode?: "and" | "or";
  onSetTagMode?: (mode: "and" | "or") => void;
}

/** "labs" skin only: the accordion rail's "Sort by" group. Kept decoupled
 * from `SortMode` (useFilterState.ts) — a plain string value/options list —
 * so FacetRail doesn't need to import the filter-state hook's types. */
export interface SortFacetState {
  /** Radio-style option list, in display order. `short` is the quiet
   * collapsed-row summary (e.g. "Newest"); falls back to `label`. */
  options: { value: string; label: string; short?: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

export interface FacetRailProps<T> {
  idPrefix: string;
  scope: "desktop" | "mobile";
  single?: SingleFacetState<T>;
  multi?: MultiFacetState<T>;
  /** "labs" skin only — see `SortFacetState`. Ignored by the default skin,
   * which keeps its own toolbar `<select>` for sort. */
  sort?: SortFacetState;
  /**
   * "labs" skin only: additional single-select facets (the MLOps database's
   * "Content type"), one accordion group each, after the primary single
   * facet's group. The default skin ignores them — it has no consumer that
   * declares any.
   */
  extraSingles?: SingleFacetState<T>[];
  /** Class-only re-skin for the blog cutover (labsSkin.ts). Default keeps
   * every other consumer's classes verbatim. */
  skin?: "default" | "labs";
}

export function FacetRail<T>(props: FacetRailProps<T>) {
  if (props.skin === "labs") {
    return (
      <LabsFacetRail
        idPrefix={props.idPrefix}
        scope={props.scope}
        single={props.single}
        extraSingles={props.extraSingles}
        multi={props.multi}
        sort={props.sort}
      />
    );
  }
  return (
    <DefaultFacetRail
      idPrefix={props.idPrefix}
      scope={props.scope}
      single={props.single}
      multi={props.multi}
    />
  );
}

/**
 * Default skin — /llmops-database, /mlops-database, /integrations. Renders
 * every facet always expanded, exactly as before the accordion rail landed.
 */
function DefaultFacetRail<T>({
  idPrefix,
  scope,
  single,
  multi,
}: {
  idPrefix: string;
  scope: "desktop" | "mobile";
  single?: SingleFacetState<T>;
  multi?: MultiFacetState<T>;
}) {
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
              class="w-full rounded-md border border-gray-200 py-1.5 pl-8 pr-3 text-sm placeholder-gray-400 focus:border-(--color-sage-400) focus:outline-none focus:ring-1 focus:ring-(--color-sage-400)"
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
                class={`mt-2 text-xs font-medium text-(--color-sage-700) hover:text-(--color-sage-900) ${FOCUS_RING}`}
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

/**
 * Labs skin — /blog. A quiet accordion: a "Filter and sort" heading, then
 * one hairline-separated disclosure row per group. A group with an active
 * selection opens itself on first render; otherwise every group starts
 * collapsed except Category on the desktop rail, which opens by default so
 * the sidebar isn't empty on first paint (the mobile drawer only appears
 * after the visitor opens it, so it doesn't need that exception). Open/
 * closed state lives only in this component — nothing persists across a
 * reload.
 */
function LabsFacetRail<T>({
  idPrefix,
  scope,
  single,
  extraSingles,
  multi,
  sort,
}: {
  idPrefix: string;
  scope: "desktop" | "mobile";
  single?: SingleFacetState<T>;
  extraSingles?: SingleFacetState<T>[];
  multi?: MultiFacetState<T>;
  sort?: SortFacetState;
}) {
  const tagSearchId = `${idPrefix}-tag-search-${scope}`;
  const sortPanelId = `${idPrefix}-facet-sort-panel-${scope}`;
  const singlePanelId = `${idPrefix}-facet-single-panel-${scope}`;
  const multiPanelId = `${idPrefix}-facet-multi-panel-${scope}`;

  const [sortOpen, setSortOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(
    () => !!single?.selected || scope === "desktop",
  );
  const [tagsOpen, setTagsOpen] = useState(
    () => (multi?.selected.length ?? 0) > 0,
  );

  const selectedCategoryName = single?.config.options.find(
    (opt) => opt.slug === single.selected,
  )?.name;
  const selectedSortOption = sort?.options.find(
    (opt) => opt.value === sort.selected,
  );

  return (
    <div>
      <h2 class={LABS_RAIL_HEADING}>Filter and sort</h2>

      {sort && (
        <div class={LABS_ACCORDION_GROUP}>
          <button
            type="button"
            aria-expanded={sortOpen}
            id={`${sortPanelId}-trigger`}
            aria-controls={sortPanelId}
            onClick={() => setSortOpen((open) => !open)}
            class={`${LABS_ACCORDION_TRIGGER} cursor-pointer ${FOCUS_RING}`}
          >
            <span class={LABS_ACCORDION_TRIGGER_LABEL}>Sort by</span>
            {!sortOpen && selectedSortOption && (
              <span class={LABS_ACCORDION_TRIGGER_VALUE}>
                {selectedSortOption.short ?? selectedSortOption.label}
              </span>
            )}
            <ChevronIcon
              class="h-4 w-4 text-(--color-cream-700)"
              open={sortOpen}
            />
          </button>
          <section
            id={sortPanelId}
            aria-labelledby={`${sortPanelId}-trigger`}
            class={LABS_ACCORDION_PANEL}
            hidden={!sortOpen}
          >
            {sortOpen && (
              <ul
                class="flex flex-col gap-px"
                onKeyDown={handleFacetListKeyDown}
              >
                {sort.options.map((opt) => {
                  const isSelected = sort.selected === opt.value;
                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        onClick={() => sort.onSelect(opt.value)}
                        aria-pressed={isSelected}
                        class={`${labsSortRowClass(isSelected)} cursor-pointer ${FOCUS_RING}`}
                      >
                        <span class="truncate">{opt.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}

      {single && (
        <div class={LABS_ACCORDION_GROUP}>
          <button
            type="button"
            aria-expanded={categoryOpen}
            id={`${singlePanelId}-trigger`}
            aria-controls={singlePanelId}
            onClick={() => setCategoryOpen((open) => !open)}
            class={`${LABS_ACCORDION_TRIGGER} cursor-pointer ${FOCUS_RING}`}
          >
            <span class={LABS_ACCORDION_TRIGGER_LABEL}>
              {single.config.label}
            </span>
            {!categoryOpen && selectedCategoryName && (
              <span class={LABS_ACCORDION_TRIGGER_VALUE}>
                {selectedCategoryName}
              </span>
            )}
            <ChevronIcon
              class="h-4 w-4 text-(--color-cream-700)"
              open={categoryOpen}
            />
          </button>
          <section
            id={singlePanelId}
            aria-labelledby={`${singlePanelId}-trigger`}
            class={LABS_ACCORDION_PANEL}
            hidden={!categoryOpen}
          >
            {categoryOpen && (
              <ul
                class="flex flex-col gap-px"
                onKeyDown={handleFacetListKeyDown}
              >
                {single.config.options.map((opt) => {
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
                        class={`${labsFacetRowClass({ selected: isSelected, hasCount: count > 0 })} cursor-pointer disabled:cursor-default ${FOCUS_RING}`}
                      >
                        <span class="truncate">{opt.name}</span>
                        <span class={LABS_FACET_ROW_COUNT_LANE}>
                          {formatCount(count)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}

      {extraSingles?.map((facet) => (
        <LabsExtraSingleGroup
          key={facet.config.urlParam}
          idPrefix={idPrefix}
          scope={scope}
          facet={facet}
        />
      ))}

      {multi && (
        <div class={LABS_ACCORDION_GROUP}>
          <button
            type="button"
            aria-expanded={tagsOpen}
            id={`${multiPanelId}-trigger`}
            aria-controls={multiPanelId}
            onClick={() => setTagsOpen((open) => !open)}
            class={`${LABS_ACCORDION_TRIGGER} cursor-pointer ${FOCUS_RING}`}
          >
            <span class={LABS_ACCORDION_TRIGGER_LABEL}>
              {multi.config.label}
            </span>
            {!tagsOpen && multi.selected.length > 0 && (
              <span class={LABS_ACCORDION_TRIGGER_VALUE}>
                {multi.selected.length} selected
              </span>
            )}
            <ChevronIcon
              class="h-4 w-4 text-(--color-cream-700)"
              open={tagsOpen}
            />
          </button>
          <section
            id={multiPanelId}
            aria-labelledby={`${multiPanelId}-trigger`}
            class={LABS_ACCORDION_PANEL}
            hidden={!tagsOpen}
          >
            {tagsOpen && (
              <>
                {multi.tagMode && multi.onSetTagMode && (
                  <fieldset
                    class={`${LABS_TAG_MODE_FIELDSET} mb-2.5`}
                    aria-label="Tag match mode"
                  >
                    <legend class="sr-only">Tag match mode</legend>
                    <label class={LABS_TAG_MODE_LABEL(multi.tagMode === "and")}>
                      <input
                        type="radio"
                        name={`${idPrefix}-tag-mode-${scope}`}
                        value="and"
                        checked={multi.tagMode === "and"}
                        onChange={() => multi.onSetTagMode?.("and")}
                        class="sr-only"
                      />
                      Match all
                    </label>
                    <label class={LABS_TAG_MODE_LABEL(multi.tagMode === "or")}>
                      <input
                        type="radio"
                        name={`${idPrefix}-tag-mode-${scope}`}
                        value="or"
                        checked={multi.tagMode === "or"}
                        onChange={() => multi.onSetTagMode?.("or")}
                        class="sr-only"
                      />
                      Match any
                    </label>
                  </fieldset>
                )}

                <div class="relative mb-2">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
                    <SearchIcon />
                  </div>
                  <label for={tagSearchId} class="sr-only">
                    {multi.config.searchAriaLabel ??
                      `Search ${multi.config.label}`}
                  </label>
                  <input
                    id={tagSearchId}
                    type="search"
                    value={multi.search}
                    onInput={(e) =>
                      multi.onSearchChange((e.target as HTMLInputElement).value)
                    }
                    placeholder={
                      multi.config.searchPlaceholder ?? "Search tags..."
                    }
                    class={LABS_FACET_SEARCH_INPUT}
                  />
                </div>

                <ul
                  class="flex flex-col gap-px"
                  onKeyDown={handleFacetListKeyDown}
                >
                  {multi.visibleOptions.map((opt) => {
                    const count = multi.counts.get(opt.slug) || 0;
                    const isSelected = multi.selected.includes(opt.slug);
                    return (
                      <li key={opt.slug}>
                        <button
                          type="button"
                          onClick={() => multi.onToggle(opt.slug)}
                          aria-pressed={isSelected}
                          class={`${labsFacetRowClass({ selected: isSelected, hasCount: count > 0 })} cursor-pointer ${FOCUS_RING}`}
                        >
                          <span class="truncate">{opt.name}</span>
                          <span class={LABS_FACET_ROW_COUNT_LANE}>
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
                      class={`${LABS_FACET_SHOW_ALL} cursor-pointer ${FOCUS_RING}`}
                    >
                      Show all {formatCount(multi.config.options.length)}{" "}
                      {multi.config.itemNounPlural ?? "tags"}
                    </button>
                  )}
                {multi.showAll && !multi.search && (
                  <button
                    type="button"
                    onClick={multi.onShowFewer}
                    class={`${LABS_FACET_SHOW_FEWER} cursor-pointer ${FOCUS_RING}`}
                  >
                    Show fewer
                  </button>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

/**
 * "labs" skin only: one accordion group for an extra single-select facet.
 * Its own component so each group owns its open/closed state (a group is
 * collapsed by default and shows the selected value's name while closed) —
 * the same shape the primary single facet's group has, minus that group's
 * "open on desktop" exception, since these sit below it.
 */
function LabsExtraSingleGroup<T>({
  idPrefix,
  scope,
  facet,
}: {
  idPrefix: string;
  scope: "desktop" | "mobile";
  facet: SingleFacetState<T>;
}) {
  const panelId = `${idPrefix}-facet-${facet.config.urlParam}-panel-${scope}`;
  const [open, setOpen] = useState(() => !!facet.selected);

  const selectedName = facet.config.options.find(
    (opt) => opt.slug === facet.selected,
  )?.name;

  return (
    <div class={LABS_ACCORDION_GROUP}>
      <button
        type="button"
        aria-expanded={open}
        id={`${panelId}-trigger`}
        aria-controls={panelId}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        class={`${LABS_ACCORDION_TRIGGER} cursor-pointer ${FOCUS_RING}`}
      >
        <span class={LABS_ACCORDION_TRIGGER_LABEL}>{facet.config.label}</span>
        {!open && selectedName && (
          <span class={LABS_ACCORDION_TRIGGER_VALUE}>{selectedName}</span>
        )}
        <ChevronIcon class="h-4 w-4 text-(--color-cream-700)" open={open} />
      </button>
      <section
        id={panelId}
        aria-labelledby={`${panelId}-trigger`}
        class={LABS_ACCORDION_PANEL}
        hidden={!open}
      >
        {open && (
          <ul class="flex flex-col gap-px" onKeyDown={handleFacetListKeyDown}>
            {facet.config.options.map((opt) => {
              const count = facet.counts.get(opt.slug) || 0;
              const isSelected = facet.selected === opt.slug;
              const isDisabled = count === 0 && !isSelected;
              return (
                <li key={opt.slug}>
                  <button
                    type="button"
                    onClick={() => facet.onSelect(opt.slug)}
                    aria-pressed={isSelected}
                    disabled={isDisabled}
                    class={`${labsFacetRowClass({ selected: isSelected, hasCount: count > 0 })} cursor-pointer disabled:cursor-default ${FOCUS_RING}`}
                  >
                    <span class="truncate">{opt.name}</span>
                    <span class={LABS_FACET_ROW_COUNT_LANE}>
                      {formatCount(count)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
