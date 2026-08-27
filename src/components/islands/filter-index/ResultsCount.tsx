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
}

export function ResultsCount({
  shown,
  total,
  noun,
  statusText,
}: ResultsCountProps) {
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
