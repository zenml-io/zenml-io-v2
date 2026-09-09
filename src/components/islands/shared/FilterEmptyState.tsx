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
 */
import { cn } from "../../../lib/utils";
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
  /** Class-only re-skin for the blog cutover. Default keeps every other
   * consumer (LLMOps/MLOps/Integrations) byte-identical. */
  skin?: "default" | "labs";
}

const LABS_CONTAINER =
  "block rounded-[12px] border border-(--color-border) bg-(--color-card) py-16 text-center";
const LABS_HEADING = "font-display text-[18px] text-(--color-cream-800)";
const LABS_DESCRIPTION =
  "mt-1.5 font-sans text-[14px] text-(--color-cream-700)";
const LABS_ACTION =
  "rounded-[6px] border border-(--color-border) px-3 py-1.5 font-sans text-[13px] font-medium text-(--color-cream-800) hover:border-(--color-sage-400)";
const LABS_ACTION_QUIET =
  "font-sans text-[13px] font-medium text-(--color-cream-700) underline hover:text-(--color-cream-900)";
const LABS_POPULAR_HEADING =
  "mb-2 font-label text-[11px] uppercase tracking-[0.06em] text-(--color-cream-600)";
const LABS_POPULAR_CHIP =
  "rounded-full border border-(--color-border) px-2.5 py-1 font-label text-[12px] text-(--color-cream-700) hover:border-(--color-sage-400)";

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
  skin = "default",
}: FilterEmptyStateProps) {
  const hasTags = selectedTagsCount > 0;
  const hasQuery = !!query;
  const labs = skin === "labs";

  return (
    <div
      role="status"
      class={
        labs
          ? LABS_CONTAINER
          : "block rounded-lg border border-gray-200 bg-gray-50 py-16 text-center"
      }
    >
      <div class={EMPTY_STATE_INNER}>
        <p class={labs ? LABS_HEADING : EMPTY_STATE_HEADING}>
          No entries match your filters
        </p>
        <p class={labs ? LABS_DESCRIPTION : EMPTY_STATE_DESCRIPTION}>
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
                labs
                  ? LABS_ACTION
                  : "rounded-md border border-(--color-sage-200) bg-(--color-sage-100) px-3 py-1.5 text-sm font-medium text-(--color-sage-900) hover:bg-(--color-sage-200)",
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
                labs
                  ? LABS_ACTION
                  : "rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100",
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
                labs
                  ? LABS_ACTION
                  : "rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100",
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
                labs
                  ? LABS_ACTION
                  : "rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100",
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
              labs
                ? LABS_ACTION_QUIET
                : "text-sm font-medium text-gray-500 underline hover:text-gray-700",
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
            <p
              class={
                labs
                  ? LABS_POPULAR_HEADING
                  : "mb-2 text-xs font-medium text-gray-400"
              }
            >
              Popular tags to explore:
            </p>
            <div class="flex flex-wrap justify-center gap-1.5">
              {popularTags.slice(0, 6).map((slug) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => onSelectPopularTag(slug)}
                  class={cn(
                    labs
                      ? LABS_POPULAR_CHIP
                      : "rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100",
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
