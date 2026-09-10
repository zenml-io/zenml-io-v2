/**
 * entryRowStyles — the one copy of `labs.entry-row`'s class strings and of
 * the row's data shape, shared by the Astro twin (`EntryRow.astro`) and the
 * Preact twin (`EntryRow.tsx`) so the two markups cannot drift. Same
 * arrangement the `labs.blog-card` twins use (blogCardStyles.ts).
 *
 * Rows are separated by a `--color-border` hairline under each row, not by
 * whitespace. Hover and focus-within paint a light `--color-sage-50` wash
 * across the row, reveal a chevron centered on the row's right edge, and
 * draw a 1px underline under the title that sweeps each wrapped line left to
 * right in reading order (DESIGN.md "Entry rows, not cards"). The title link
 * is the row's one stretched link; everything interactive inside a row (the
 * tag chips and the industry token in the filter island) sits above it on
 * `relative z-10`.
 *
 * The meta line's token order and its middots are built once here
 * (`entryRowMetaTokens`) rather than in each twin, so a row rendered by the
 * island and the same row rendered on a hub read identically.
 */

import { capitalise } from "../../lib/databases";

export const ENTRY_ROW =
  "group relative flex cursor-pointer flex-col gap-3 border-b border-(--color-border) px-4 py-6 pr-12 transition-colors duration-200 ease-out hover:bg-(--color-sage-50) focus-within:bg-(--color-sage-50)";

/**
 * The heading element: the row's one text column, now that the chevron
 * lives outside the title row as an absolutely-positioned last child. Every
 * cosmetic title class (font, size, colour, the hover colour transition,
 * `line-clamp-3`) lives here, on the heading — never on the anchor inside
 * it. Putting any of that on the anchor forces its computed `display` off
 * `inline` (Chromium reports `flow-root` for a clamped element) or gives it
 * a second `transition-property` declaration that collides with the
 * underline's own, and either one breaks the anchor's line fragmentation
 * and with it the per-line underline sweep on `ENTRY_ROW_TITLE_LINK` below.
 * The anchor inherits font and colour from this heading — including through
 * the colour transition, frame by frame — without needing its own copy of
 * either.
 */
export const ENTRY_ROW_TITLE =
  "min-w-0 font-display line-clamp-3 text-[20px] leading-[26px] text-(--color-cream-900) transition-colors duration-200 ease-out group-hover:text-(--color-sage-800)";

/**
 * The stretched link inside the heading — the row's one full-row link
 * target, exactly as `labs.blog-card` stretches its own title link. Carries
 * only structural and interactive classes (the stretched overlay, the
 * underline background) and nothing that would set its own `display`, font,
 * colour or clamp: it must stay a plain `display: inline` element so the
 * default `box-decoration-break: slice` lays the underline's background
 * across each of the anchor's own line-fragment boxes, sweeping one wrapped
 * line at a time, in reading order, rather than drawing one bar under the
 * whole heading. `currentColor` in the gradient reads the anchor's own
 * inherited colour, which tracks `ENTRY_ROW_TITLE`'s hover transition on the
 * heading above it. The single arbitrary `[transition:…]` shorthand lists
 * both `color` and `background-size` deliberately, with no separate
 * `duration-*`/`ease-*` utility on this element: two utilities that each set
 * `transition-property` on the same element don't merge, the later one in
 * Tailwind's generated stylesheet replaces the other outright, so a second
 * `transition-colors` (or similar) added here later would silently disable
 * this underline's animation exactly as it did before this was written as
 * one declaration.
 */
export const ENTRY_ROW_TITLE_LINK =
  "after:absolute after:inset-0 after:content-[''] bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-position-[0_100%] bg-size-[0%_1px] [transition:color_200ms_cubic-bezier(0,0,0.2,1),background-size_500ms_cubic-bezier(0,0,0.2,1)] group-hover:bg-size-[100%_1px] group-focus-within:bg-size-[100%_1px]";

/** Centered on the row's right edge (the `pr-12` lane on `ENTRY_ROW`,
 * `right-4` matching the row's own `px-4`), visible only on hover/
 * focus-within — never a static affordance. */
export const ENTRY_ROW_CHEVRON =
  "pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-(--color-sage-700) opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100";
export const ENTRY_ROW_CHEVRON_VIEWBOX = "0 0 24 24";
export const ENTRY_ROW_CHEVRON_PATH = "M9 5l7 7-7 7";

export const ENTRY_ROW_META =
  "flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] leading-4 text-(--color-cream-700)";
export const ENTRY_ROW_META_STRONG = "font-medium text-(--color-cream-800)";
export const ENTRY_ROW_META_DOT = "text-(--color-cream-500)";
/** The industry token when it is a real filter control (island only). */
export const ENTRY_ROW_META_ACTION =
  "relative z-10 cursor-pointer rounded-[4px] hover:text-(--color-sage-800)";

export const ENTRY_ROW_SUMMARY =
  "line-clamp-2 max-w-[800px] text-[15px] leading-[23px] text-(--color-cream-700)";

export const ENTRY_ROW_CHIPS = "mt-2 flex flex-wrap items-center gap-1.5";

/**
 * The row's own small hexagon pill — a row lists several of these per
 * entry, so it stays deliberately smaller than the blog's `TERM_CHIP`
 * (`termChipStyles.ts`, one or two per post) rather than reusing it.
 */
export const ENTRY_ROW_CHIP =
  "inline-flex h-6 cursor-pointer items-center gap-1.5 rounded-full border border-(--color-border) px-2 text-[11px] leading-none font-medium text-(--color-cream-700) transition-colors duration-200 ease-out hover:border-(--color-sage-400) relative z-10";
/** Same pill, for a tag the island currently filters by. */
export const ENTRY_ROW_CHIP_SELECTED = `${ENTRY_ROW_CHIP} border-(--color-sage-400) bg-(--color-sage-100)`;
export const ENTRY_ROW_CHIP_OVERFLOW =
  "inline-flex h-6 items-center px-1 text-[11px] leading-none text-(--color-cream-600)";
/** 12:13.86 hexagon ratio, scaled down to match the smaller pill. */
export const ENTRY_ROW_CHIP_HEXAGON =
  "h-[10px] w-[8.66px] fill-(--color-sage-600)";

/** The record fields a row's meta line can carry, in reading order. */
export interface EntryRowMeta {
  company?: string | null;
  /** MLOps only; rendered only when it differs from the company. */
  platformName?: string | null;
  /** MLOps only; rendered capitalised. */
  contentType?: string | null;
  year?: number | null;
  industry?: { label: string } | null;
}

/**
 * One row's content. `EntryRow.astro` takes exactly this; `EntryRow.tsx`
 * takes it plus the island's three callbacks.
 */
export interface EntryRowItem {
  href: string;
  title: string;
  meta: EntryRowMeta;
  summary?: string | null;
  /**
   * Tag chips. The Astro twin renders an `<a>` when `href` is set; the
   * Preact twin renders a filter toggle when `slug` is set and the island
   * passed `onChipToggle`.
   */
  chips: readonly { label: string; href?: string; slug?: string }[];
  /** "+N" pill after the chips — the tags this row does not show. */
  chipOverflowCount?: number;
  /** 3 by default: a row sits under the band's h1, or under a hub section's h2. */
  headingLevel?: 2 | 3;
}

export type EntryRowMetaToken =
  | { kind: "text"; text: string; strong: boolean }
  | { kind: "industry"; text: string };

/**
 * company · platform (when it is not the company again) · content type ·
 * year · industry — only the tokens the entry actually has, so an absent
 * field takes its middot with it.
 */
export function entryRowMetaTokens(meta: EntryRowMeta): EntryRowMetaToken[] {
  const tokens: EntryRowMetaToken[] = [];
  if (meta.company)
    tokens.push({ kind: "text", text: meta.company, strong: true });
  if (meta.platformName && meta.platformName !== meta.company) {
    tokens.push({ kind: "text", text: meta.platformName, strong: false });
  }
  if (meta.contentType) {
    tokens.push({
      kind: "text",
      text: capitalise(meta.contentType),
      strong: false,
    });
  }
  if (meta.year)
    tokens.push({ kind: "text", text: String(meta.year), strong: false });
  if (meta.industry)
    tokens.push({ kind: "industry", text: meta.industry.label });
  return tokens;
}
