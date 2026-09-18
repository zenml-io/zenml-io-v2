/**
 * termChipStyles — the one copy of the blog's hexagon term-chip pill
 * (DESIGN.md tag chips / §6 sibling-term chips), shared by
 * `TermHubEditorial`'s sibling-term strip and `StackedList`'s per-row tag
 * chips so the two call sites can't drift. Same 36px hairline pill and
 * hexagon glyph `BlogLayout.astro`'s post tag row draws.
 *
 * Sentence case, Rethink (2026-09-09 mid-run typography ruling — "sibling-
 * term chips" is one of the enumerated items, supersedes the approved blog design (DESIGN.md)'
 * drawn Nudica/uppercase treatment).
 */

export const TERM_CHIP =
  "inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-(--color-border) px-3.5 text-[13px] font-medium text-(--color-cream-700) transition-colors duration-200 ease-out hover:border-(--color-sage-400)";

export const TERM_CHIP_OVERFLOW =
  "inline-flex h-9 items-center rounded-full bg-(--color-cream-100) px-3.5 text-[13px] font-medium text-(--color-cream-700)";

export const TERM_CHIP_HEXAGON_VIEWBOX = "0 0 12 13.86";
export const TERM_CHIP_HEXAGON_PATH =
  "M5 0.58 A2 2 0 0 1 7 0.58 L11 2.89 A2 2 0 0 1 12 4.62 L12 9.24 A2 2 0 0 1 11 10.97 L7 13.28 A2 2 0 0 1 5 13.28 L1 10.97 A2 2 0 0 1 0 9.24 L0 4.62 A2 2 0 0 1 1 2.89 Z";
