import {
  LABS_RESULTS_COUNT_MAIN,
  LABS_RESULTS_COUNT_STATE,
  LABS_RESULTS_COUNT_WRAP,
} from "./labsSkin";

/**
 * ResultsCount — the visible result count + polite live region every
 * FilterIndex instance renders above its results (#249 contract). Shared
 * between `DataFilterIndex` and `ControlFilterIndex` so both flavors
 * announce filter changes identically to screen readers.
 */
export interface ResultsCountProps {
  shown: number;
  total: number;
  /** Plural noun for the count, e.g. "entries", "posts", "integrations". */
  noun: string;
  /** Full sentence for screen readers (`resultsStatusText` from useFilterState). */
  statusText: string;
  /** Class-only re-skin for the blog cutover (labsSkin.ts). */
  skin?: "default" | "labs";
  /** "labs" skin only: the visible "no filters applied" / "N filters" state
   * label (the approved blog design, DESIGN.md). */
  filtersState?: string;
}

export function ResultsCount({
  shown,
  total,
  noun,
  statusText,
  skin = "default",
  filtersState,
}: ResultsCountProps) {
  if (skin === "labs") {
    return (
      <output
        class={LABS_RESULTS_COUNT_WRAP}
        aria-live="polite"
        aria-atomic="true"
      >
        <span class={LABS_RESULTS_COUNT_MAIN} aria-hidden="true">
          {`${shown.toLocaleString("en-US")} of ${total.toLocaleString("en-US")} ${noun}`}
        </span>
        {filtersState && (
          <span class={LABS_RESULTS_COUNT_STATE} aria-hidden="true">
            {filtersState}
          </span>
        )}
        <span class="sr-only">{statusText}</span>
      </output>
    );
  }

  return (
    <output
      class="mb-4 block text-sm text-gray-500"
      aria-live="polite"
      aria-atomic="true"
    >
      <span aria-hidden="true">
        {shown === total
          ? `${total.toLocaleString("en-US")} ${noun}`
          : `${shown.toLocaleString("en-US")} of ${total.toLocaleString("en-US")} ${noun}`}
      </span>
      <span class="sr-only">{statusText}</span>
    </output>
  );
}
