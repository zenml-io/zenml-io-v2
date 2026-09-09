/** Inline SVG icons + focus-ring class shared across the FilterIndex family. */

// Sage/cream tokens resolve on every route: the ramps live on `:root` in
// global.css (hoisted in the blog cutover), not only under `[data-app="labs"]`.
export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-sage-400) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)";

export function SearchIcon({
  class: className = "h-4 w-4 text-gray-400",
}: {
  class?: string;
} = {}) {
  return (
    <svg
      aria-hidden="true"
      class={className}
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

export function ChevronIcon({
  class: className = "h-4 w-4",
  open = false,
}: {
  class?: string;
  open?: boolean;
} = {}) {
  return (
    <svg
      aria-hidden="true"
      class={`${className} shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <path d="M4 6l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
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
