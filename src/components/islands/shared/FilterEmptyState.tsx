/**
 * FilterEmptyState — the "no entries match your filters" state shared by
 * LLMOpsFilter and MLOpsFilter (#248).
 *
 * Pure extraction, not an adoption of the system `EmptyState` primitive:
 * `EmptyState`'s contract caps a recovery surface at one `<a href>` action
 * (its own TSDoc says a second belongs on the caller's own markup instead).
 * This empty state has up to five stateful `<button onClick>` recovery
 * actions plus a "popular tags" suggestion-chip cloud — a multi-action
 * interactive menu, not a single navigational link — so it stays outside
 * that contract by design.
 *
 * LLMOpsFilter's and MLOpsFilter's empty-state blocks were byte-for-byte
 * identical (same JSX, same classes) with only the underlying filter state
 * differing, so this component holds the one copy of that JSX. The 4-way
 * description branching and the "Switch to Match Any" button's visibility
 * condition are computed here from the raw filter state, not passed in
 * pre-computed, so the actual selection LOGIC has one home too — not just
 * the markup shell.
 *
 * Two shapes, split into two components so the default output can never
 * drift while the labs one evolves: `skin="default"` (LLMOps/MLOps/
 * Integrations) is the original card with one recovery button per active
 * filter kind; `skin="labs"` (the blog and the research databases, D9) is a
 * left-aligned block of reserved height that names the active constraints
 * and offers each one back as a chip carrying the real number of entries
 * dropping it would return (`constraints` / `suggestions`, both computed by
 * the filter-state engine).
 */
import { cn } from "../../../lib/utils";
import {
  TERM_CHIP,
  TERM_CHIP_HEXAGON_PATH,
  TERM_CHIP_HEXAGON_VIEWBOX,
} from "../../blog/termChipStyles";
import { labsButtonClasses } from "../../labs/labsButtonStyles";
import {
  EMPTY_STATE_DESCRIPTION,
  EMPTY_STATE_HEADING,
  EMPTY_STATE_INNER,
} from "../../system/emptyStateStyles";

// Sage/cream tokens resolve on every route: the ramps live on `:root` in
// global.css (hoisted in the blog cutover), not only under `[data-app="labs"]`.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-sage-400) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)";

export interface FilterEmptyStateProps {
  /** `selectedTags.length` from the caller's filter state. */
  selectedTagsCount: number;
  /** Whether an industry filter is active. */
  hasIndustry: boolean;
  /** The current search query string (empty string = no query). */
  query: string;
  /** Whether the tag filter is in "Match All" (AND) mode. */
  isAndMode: boolean;
  /** Popular tag slugs to suggest; only the first 6 render. */
  popularTags: string[];
  /** Resolves a tag slug to its display name (`tagMap.get(slug) || slug`). */
  tagLabel: (slug: string) => string;
  /** Switches tag mode to "or" and resets pagination. */
  onSwitchToOrMode: () => void;
  /** Clears the selected tags and resets pagination. */
  onClearTags: () => void;
  /** Clears the selected industry and resets pagination. */
  onClearIndustry: () => void;
  /** Clears the search query and resets pagination. */
  onClearQuery: () => void;
  /** Clears every active filter. */
  onClearAll: () => void;
  /** Applies a suggested popular tag: clears all filters, then toggles the tag. */
  onSelectPopularTag: (slug: string) => void;
  /**
   * "labs" skin only: every active filter, named, in reading order. Drives
   * the heading's count and the description's list.
   */
  constraints?: { label: string }[];
  /**
   * "labs" skin only: "drop one constraint and these come back" offers,
   * each already carrying the real number of entries that query returns
   * (computed by the filter-state engine). Rendered as a chip strip.
   */
  suggestions?: { label: string; count: number; onApply: () => void }[];
  /** Class-only re-skin for the blog cutover. Default keeps every other
   * consumer (LLMOps/MLOps/Integrations) byte-identical. */
  skin?: "default" | "labs";
}

/** "A", "A and B", "A, B and C" — the constraint list in the description. */
function joinConstraints(labels: string[]): string {
  if (labels.length <= 1) return labels.join("");
  return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;
}

const LABS_POPULAR_HEADING =
  "mb-2 font-label text-[11px] uppercase tracking-[0.06em] text-(--color-cream-600)";
const LABS_POPULAR_CHIP =
  "rounded-full border border-(--color-border) px-2.5 py-1 font-label text-[12px] text-(--color-cream-700) hover:border-(--color-sage-400)";

// Labs zero-results block (D9): reserved height so the page doesn't jump as
// the last result disappears, left-aligned in the results column, no card
// box — the heading names how many constraints are active, the description
// names them, and the chip strip below offers each one back with the real
// count it would return.
const LABS_ZERO_CONTAINER = "min-h-[320px]";
const LABS_ZERO_HEADING =
  "font-display text-[20px] leading-7 text-(--color-cream-800)";
const LABS_ZERO_DESCRIPTION =
  "mt-1.5 font-sans text-[16px] leading-6 text-(--color-cream-700)";
const LABS_ZERO_SUGGESTIONS_LABEL =
  "mb-2 font-sans text-[13px] font-medium text-(--color-cream-700)";
const LABS_ZERO_SUGGESTION_COUNT = "text-(--color-cream-600) tabular-nums";

export function FilterEmptyState({
  selectedTagsCount,
  hasIndustry,
  query,
  isAndMode,
  popularTags,
  tagLabel,
  onSwitchToOrMode,
  onClearTags,
  onClearIndustry,
  onClearQuery,
  onClearAll,
  onSelectPopularTag,
  constraints,
  suggestions,
  skin = "default",
}: FilterEmptyStateProps) {
  const hasTags = selectedTagsCount > 0;
  const hasQuery = !!query;

  if (skin === "labs") {
    return (
      <LabsFilterEmptyState
        constraints={constraints ?? []}
        suggestions={suggestions ?? []}
        popularTags={popularTags}
        tagLabel={tagLabel}
        onClearAll={onClearAll}
        onSelectPopularTag={onSelectPopularTag}
      />
    );
  }

  return (
    <div
      role="status"
      class="block rounded-lg border border-gray-200 bg-gray-50 py-16 text-center"
    >
      <div class={EMPTY_STATE_INNER}>
        <p class={EMPTY_STATE_HEADING}>No entries match your filters</p>
        <p class={EMPTY_STATE_DESCRIPTION}>
          {hasTags && hasIndustry && hasQuery
            ? "Try removing some filters to broaden your search."
            : hasTags && isAndMode && selectedTagsCount > 1
              ? 'These tags don\'t overlap. Try switching to "Match Any" mode.'
              : hasQuery
                ? `No results for "${query}". Try different search terms.`
                : "Try adjusting your filter selections."}
        </p>
        <div class="mt-4 flex flex-wrap items-center justify-center gap-2">
          {hasTags && isAndMode && selectedTagsCount > 1 && (
            <button
              type="button"
              class={cn(
                "rounded-md border border-(--color-sage-200) bg-(--color-sage-100) px-3 py-1.5 text-sm font-medium text-(--color-sage-900) hover:bg-(--color-sage-200)",
                FOCUS_RING,
              )}
              onClick={onSwitchToOrMode}
            >
              Switch to Match Any
            </button>
          )}
          {hasTags && (
            <button
              type="button"
              class={cn(
                "rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100",
                FOCUS_RING,
              )}
              onClick={onClearTags}
            >
              Clear tags
            </button>
          )}
          {hasIndustry && (
            <button
              type="button"
              class={cn(
                "rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100",
                FOCUS_RING,
              )}
              onClick={onClearIndustry}
            >
              Clear industry
            </button>
          )}
          {hasQuery && (
            <button
              type="button"
              class={cn(
                "rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100",
                FOCUS_RING,
              )}
              onClick={onClearQuery}
            >
              Clear search
            </button>
          )}
          <button
            type="button"
            class={cn(
              "text-sm font-medium text-gray-500 underline hover:text-gray-700",
              FOCUS_RING,
            )}
            onClick={onClearAll}
          >
            Clear all
          </button>
        </div>

        {/* Suggest popular tags */}
        {popularTags.length > 0 && (
          <div class="mt-6">
            <p class="mb-2 text-xs font-medium text-gray-400">
              Popular tags to explore:
            </p>
            <div class="flex flex-wrap justify-center gap-1.5">
              {popularTags.slice(0, 6).map((slug) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => onSelectPopularTag(slug)}
                  class={cn(
                    "rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100",
                    FOCUS_RING,
                  )}
                >
                  {tagLabel(slug)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Labs skin (D9). No card box and no per-filter-kind button row: one
 * headline that counts the active constraints, one line that names them,
 * one ghost pill that clears everything, and — below — the "drop one" chips
 * the engine costed. `min-h-[320px]` reserves the block's height so the
 * results column doesn't jump as the last result disappears. When there is
 * nothing to drop (no active filters, or every offer would also return
 * nothing) the popular-tags strip takes that slot instead.
 */
function LabsFilterEmptyState({
  constraints,
  suggestions,
  popularTags,
  tagLabel,
  onClearAll,
  onSelectPopularTag,
}: {
  constraints: { label: string }[];
  suggestions: { label: string; count: number; onApply: () => void }[];
  popularTags: string[];
  tagLabel: (slug: string) => string;
  onClearAll: () => void;
  onSelectPopularTag: (slug: string) => void;
}) {
  const heading =
    constraints.length > 1
      ? `No entries match all ${constraints.length} filters.`
      : constraints.length === 1
        ? "No entries match this filter."
        : "No entries match your filters";
  const description =
    constraints.length > 0
      ? `${joinConstraints(constraints.map((constraint) => constraint.label))}. Drop one constraint below, or start from a broader facet.`
      : "Try adjusting your filter selections.";

  return (
    <div role="status" class={LABS_ZERO_CONTAINER}>
      <p class={LABS_ZERO_HEADING}>{heading}</p>
      <p class={LABS_ZERO_DESCRIPTION}>{description}</p>

      <div class="mt-4">
        <button
          type="button"
          onClick={onClearAll}
          class={cn(labsButtonClasses("ghost"), FOCUS_RING)}
        >
          Clear all filters
        </button>
      </div>

      {suggestions.length > 0 ? (
        <div class="mt-6">
          <p class={LABS_ZERO_SUGGESTIONS_LABEL}>
            Drop one and these come back
          </p>
          <div class="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.label}
                type="button"
                onClick={suggestion.onApply}
                class={cn(TERM_CHIP, FOCUS_RING)}
              >
                <svg
                  viewBox={TERM_CHIP_HEXAGON_VIEWBOX}
                  class="h-[14px] w-3 fill-(--color-sage-600)"
                  aria-hidden="true"
                >
                  <path d={TERM_CHIP_HEXAGON_PATH} />
                </svg>
                {suggestion.label}
                <span class="text-(--color-cream-500)" aria-hidden="true">
                  &middot;
                </span>
                <span class={LABS_ZERO_SUGGESTION_COUNT}>
                  {suggestion.count.toLocaleString("en-US")}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        popularTags.length > 0 && (
          <div class="mt-6">
            <p class={LABS_POPULAR_HEADING}>Popular tags to explore:</p>
            <div class="flex flex-wrap gap-1.5">
              {popularTags.slice(0, 6).map((slug) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => onSelectPopularTag(slug)}
                  class={cn(LABS_POPULAR_CHIP, FOCUS_RING)}
                >
                  {tagLabel(slug)}
                </button>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
