/**
 * Shared client-side pagination nav for FilterIndex. Extracted verbatim from
 * the identical block both legacy filter islands carried — a Preact
 * component, not a reuse of `Pagination.astro` (that one renders server-side
 * `<a href>` links between static pages; this one drives client-side page
 * state with `<button>`s).
 */
import { FOCUS_RING } from "./icons";
import {
  LABS_PAGINATION_ARROW_PILL,
  LABS_PAGINATION_ELLIPSIS,
  LABS_PAGINATION_NAV,
  labsPageLabel,
  labsPaginationNumeralClass,
} from "./labsSkin";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Class-only re-skin for the blog cutover (labsSkin.ts): 36px round
   * zero-padded numerals, pill Prev/Next. */
  skin?: "default" | "labs";
}

export function Pagination({
  page,
  totalPages,
  onChange,
  skin = "default",
}: PaginationProps) {
  if (totalPages <= 1) return null;
  const labs = skin === "labs";

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  if (labs) {
    return (
      <nav class={LABS_PAGINATION_NAV} aria-label="Pagination">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(Math.max(1, page - 1))}
          class={`${LABS_PAGINATION_ARROW_PILL} ${FOCUS_RING}`}
          aria-label="Previous page"
        >
          <svg
            viewBox="0 0 14 14"
            class="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path
              d="M8.5 3L4.5 7l4 4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Prev
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`e${i}`}
              class={LABS_PAGINATION_ELLIPSIS}
              aria-hidden="true"
            >
              &hellip;
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              class={`${labsPaginationNumeralClass(p === page)} ${FOCUS_RING}`}
            >
              {labsPageLabel(p)}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          class={`${LABS_PAGINATION_ARROW_PILL} ${FOCUS_RING}`}
          aria-label="Next page"
        >
          Next
          <svg
            viewBox="0 0 14 14"
            class="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path
              d="M5.5 3l4 4-4 4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </nav>
    );
  }

  return (
    <nav
      class="mt-8 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(Math.max(1, page - 1))}
        class={`rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS_RING}`}
        aria-label="Previous page"
      >
        Previous
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} class="px-1 text-gray-400" aria-hidden="true">
            &hellip;
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            class={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${FOCUS_RING} ${
              p === page
                ? "bg-(--color-sage-900) text-(--color-cream-50) hover:bg-(--color-sage-800)"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        class={`rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS_RING}`}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
