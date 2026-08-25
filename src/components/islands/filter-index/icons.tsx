/** Inline SVG icons + focus-ring class shared across the FilterIndex family. */

export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1";

export function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      class="h-4 w-4 text-gray-400"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="1.67"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="M13.5 13.5L17 17" stroke-linecap="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      class="h-4 w-4"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M3 9L9 3M3 3l6 6" />
    </svg>
  );
}

export function FilterIcon() {
  return (
    <svg
      aria-hidden="true"
      class="h-4 w-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    >
      <path d="M3 5h14M5 10h10M7 15h6" />
    </svg>
  );
}
