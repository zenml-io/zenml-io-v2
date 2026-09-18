/**
 * labsSkin — the blog cutover's class-only re-skin of the shared FilterIndex
 * family (DataFilterIndex, FacetRail, Pagination, ResultsCount). One home
 * for every "labs" class string so the four components don't repeat them
 * inline; behaviour is untouched (see each component's own `skin` prop —
 * default keeps today's classes verbatim for /llmops-database,
 * /mlops-database and /integrations).
 */

export const LABS_SEARCH_WRAP = "relative flex-1";
export const LABS_SEARCH_ICON = "h-4 w-4 text-(--color-cream-600)";
export const LABS_SEARCH_INPUT =
  "w-full rounded-[10px] border border-(--color-border) bg-(--color-card) py-2.5 pl-11 pr-16 font-sans text-[15px] text-(--color-cream-900) placeholder-(--color-cream-600) transition-colors focus:border-(--color-sage-400) focus:outline-none";
export const LABS_SEARCH_KBD =
  "hidden sm:inline-flex pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-(--color-cream-600)";

export const LABS_MOBILE_FILTERS_TRIGGER =
  "inline-flex h-11 cursor-pointer items-center gap-2 rounded-[10px] border border-(--color-border) px-4 text-[12px] text-(--color-cream-800) transition-colors hover:border-(--color-sage-400) lg:hidden";
export const LABS_MOBILE_FILTERS_COUNT =
  "ml-1 rounded-full bg-(--color-sage-100) px-1.5 py-0.5 text-[11px] text-(--color-sage-800)";

export const LABS_TAG_MODE_FIELDSET =
  "flex h-9 items-center gap-1 rounded-[6px] border border-(--color-border) p-1";
export const LABS_TAG_MODE_LABEL = (active: boolean) =>
  `cursor-pointer rounded-[4px] px-2.5 py-1 text-[11px] transition-colors ${
    active
      ? "bg-(--color-cream-900) text-(--color-cream-50)"
      : "text-(--color-cream-700) hover:bg-(--color-cream-100)"
  }`;

export const LABS_RESULTS_COUNT_WRAP =
  "mb-4 flex flex-wrap items-baseline gap-2 pb-1";
export const LABS_RESULTS_COUNT_MAIN =
  "text-[12px] font-medium text-(--color-cream-800)";
export const LABS_RESULTS_COUNT_STATE = "text-[11px] text-(--color-cream-700)";

// Desktop sidebar's sticky wrapper. Default-skin keeps `top-24` (the
// site-wide `--nav-h`-derived offset used by /llmops-database,
// /mlops-database), but that clamps 12px under the floating Labs nav's
// bottom edge (108px desktop) — same 140px offset the blog post's TOC rail
// already sticks at (nav bottom 108px + 32px breathing room).
export const LABS_RAIL_STICKY =
  "sticky top-[140px] max-h-[calc(100vh-140px-2rem)] overflow-y-auto pr-2";

// Accordion rail (DESIGN.md restyle): a quiet stack of disclosure
// rows — a heading, then one hairline-separated row per facet group. No
// boxes or backgrounds at rest; a row only picks up a background once it is
// the active/selected option inside an open panel.
export const LABS_RAIL_HEADING =
  "mb-1 border-b border-(--color-border) pb-3 font-sans text-[18px] leading-6 text-(--color-cream-900)";

export const LABS_ACCORDION_GROUP = "border-b border-(--color-border)";
export const LABS_ACCORDION_TRIGGER =
  "flex w-full items-center gap-3 py-4 text-left font-sans text-[15px] leading-5 text-(--color-cream-900) transition-colors hover:text-(--color-sage-800)";
export const LABS_ACCORDION_TRIGGER_LABEL = "grow truncate";
export const LABS_ACCORDION_TRIGGER_VALUE =
  "shrink-0 truncate text-[14px] text-(--color-cream-600)";
export const LABS_ACCORDION_PANEL = "pb-4";

export const LABS_FACET_HEADER_WRAP =
  "mb-2.5 flex items-baseline gap-2 border-b border-(--color-border) pb-2.5";
export const LABS_FACET_HEADER_LABEL =
  "grow text-[12px] font-medium text-(--color-cream-800)";
export const LABS_FACET_HEADER_HINT = "text-[11px] text-(--color-cream-700)";

export const LABS_FACET_ROW_COUNT_LANE =
  "ml-2 w-11 shrink-0 text-right text-[11px] text-(--color-cream-600) tabular-nums";

export function labsFacetRowClass(opts: {
  selected: boolean;
  hasCount: boolean;
}): string {
  const base =
    "flex h-9 w-full items-center justify-between gap-2.5 rounded-[8px] px-2.5 font-sans text-[14px] transition-colors";
  if (opts.selected) {
    return `${base} bg-(--color-sage-100) text-(--color-sage-900)`;
  }
  if (opts.hasCount) {
    return `${base} text-(--color-cream-800) hover:bg-(--color-sage-50)`;
  }
  return `${base} text-(--color-cream-500)`;
}

export const LABS_FACET_SEARCH_INPUT =
  "w-full rounded-[6px] border border-(--color-border) py-1.5 pl-8 pr-3 font-sans text-[13px] text-(--color-cream-900) placeholder-(--color-cream-600) focus:border-(--color-sage-400) focus:outline-none";
export const LABS_FACET_SHOW_ALL =
  "mt-2 text-[11px] text-(--color-sage-700) hover:text-(--color-sage-800)";
export const LABS_FACET_SHOW_FEWER =
  "mt-2 text-[11px] text-(--color-cream-700) hover:text-(--color-cream-800)";

// Sort-by panel: a radio-style option list restyled to match the facet
// rows above (same selected/hover treatment, no counts lane).
export function labsSortRowClass(selected: boolean): string {
  const base =
    "flex h-9 w-full items-center justify-between gap-2.5 rounded-[8px] px-2.5 font-sans text-[14px] transition-colors";
  return selected
    ? `${base} bg-(--color-sage-100) text-(--color-sage-900)`
    : `${base} text-(--color-cream-800) hover:bg-(--color-sage-50)`;
}

export const LABS_PAGINATION_NAV =
  "mt-14 flex items-center justify-center gap-2";
// Sentence case, Rethink (2026-09-09 mid-run typography ruling names
// "pagination numerals and Prev/Next" explicitly — supersedes the drawn
// Nudica/uppercase treatment; Pagination.tsx already renders "Prev"/"Next"
// rather than uppercase labels, so this class fix just catches up the pill
// chrome to match).
export const LABS_PAGINATION_ARROW_PILL =
  "inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-(--color-border) px-3.5 text-[12px] font-medium text-(--color-cream-700) transition-colors hover:border-(--color-sage-400) disabled:cursor-not-allowed disabled:opacity-40";
export const LABS_PAGINATION_ELLIPSIS = "px-1 text-(--color-cream-500)";
export function labsPaginationNumeralClass(current: boolean): string {
  const base =
    "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border text-[13px] transition-colors";
  return current
    ? `${base} border-(--color-sage-600) bg-(--color-sage-100) font-medium text-(--color-sage-800)`
    : `${base} border-transparent text-(--color-cream-700) hover:border-(--color-sage-400)`;
}
export function labsPageLabel(page: number): string {
  return String(page).padStart(2, "0");
}
