/**
 * Shared Tailwind class lookup tables for the layout primitive set (#248
 * Wave 1) — Stack, Inline, Split, Bleed, Grid.
 *
 * Tailwind's build-time scanner only picks up class names that appear as
 * complete literal strings somewhere in a scanned source file. A class
 * assembled from a prop value at render time (`` `gap-space-${step}` ``, or
 * a breakpoint prefix concatenated onto a utility) never appears as one
 * token in the file text, so it silently produces no CSS. Every table below
 * spells out each class the primitives can possibly emit, so the primitive
 * components only ever *select* a finished string, never build one.
 *
 * Astro and Preact twins both import from here so their emitted class lists
 * cannot drift apart.
 */
import type { Breakpoint, SpaceStep } from "../../../lib/section";

export const BREAKPOINTS: readonly Breakpoint[] = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];

/** Unprefixed `gap-space-*` utility for each spacing step. */
export const GAP: Record<SpaceStep, string> = {
  xxs: "gap-space-xxs",
  xs: "gap-space-xs",
  sm: "gap-space-sm",
  md: "gap-space-md",
  lg: "gap-space-lg",
  xl: "gap-space-xl",
  xxl: "gap-space-xxl",
};

/** Breakpoint-prefixed `{bp}:gap-space-*` utility for each spacing step. */
export const GAP_AT: Record<Breakpoint, Record<SpaceStep, string>> = {
  sm: {
    xxs: "sm:gap-space-xxs",
    xs: "sm:gap-space-xs",
    sm: "sm:gap-space-sm",
    md: "sm:gap-space-md",
    lg: "sm:gap-space-lg",
    xl: "sm:gap-space-xl",
    xxl: "sm:gap-space-xxl",
  },
  md: {
    xxs: "md:gap-space-xxs",
    xs: "md:gap-space-xs",
    sm: "md:gap-space-sm",
    md: "md:gap-space-md",
    lg: "md:gap-space-lg",
    xl: "md:gap-space-xl",
    xxl: "md:gap-space-xxl",
  },
  lg: {
    xxs: "lg:gap-space-xxs",
    xs: "lg:gap-space-xs",
    sm: "lg:gap-space-sm",
    md: "lg:gap-space-md",
    lg: "lg:gap-space-lg",
    xl: "lg:gap-space-xl",
    xxl: "lg:gap-space-xxl",
  },
  xl: {
    xxs: "xl:gap-space-xxs",
    xs: "xl:gap-space-xs",
    sm: "xl:gap-space-sm",
    md: "xl:gap-space-md",
    lg: "xl:gap-space-lg",
    xl: "xl:gap-space-xl",
    xxl: "xl:gap-space-xxl",
  },
  "2xl": {
    xxs: "2xl:gap-space-xxs",
    xs: "2xl:gap-space-xs",
    sm: "2xl:gap-space-sm",
    md: "2xl:gap-space-md",
    lg: "2xl:gap-space-lg",
    xl: "2xl:gap-space-xl",
    xxl: "2xl:gap-space-xxl",
  },
};

/**
 * Resolves a `space` prop to a class string. A bare `SpaceStep` maps to the
 * unprefixed utility. A per-breakpoint object layers breakpoint-prefixed
 * overrides on top of `fallback` (the family default) — `Breakpoint` has no
 * "base" member, so the unprefixed step always comes from `fallback`, never
 * from the object.
 */
export function resolveSpace(
  space: SpaceStep | Partial<Record<Breakpoint, SpaceStep>> | undefined,
  fallback: SpaceStep,
): string {
  if (space === undefined) return GAP[fallback];
  if (typeof space === "string") return GAP[space];
  const classes = [GAP[fallback]];
  for (const bp of BREAKPOINTS) {
    const step = space[bp];
    if (step) classes.push(GAP_AT[bp][step]);
  }
  return classes.join(" ");
}

/** `order-1` at and above a given breakpoint. */
export const ORDER_1_AT: Record<Breakpoint, string> = {
  sm: "sm:order-1",
  md: "md:order-1",
  lg: "lg:order-1",
  xl: "xl:order-1",
  "2xl": "2xl:order-1",
};

/** `order-2` at and above a given breakpoint. */
export const ORDER_2_AT: Record<Breakpoint, string> = {
  sm: "sm:order-2",
  md: "md:order-2",
  lg: "lg:order-2",
  xl: "xl:order-2",
  "2xl": "2xl:order-2",
};

/** `flex-row` at and above a given breakpoint (Inline's `collapseBelow`). */
export const FLEX_ROW_AT: Record<Breakpoint, string> = {
  sm: "sm:flex-row",
  md: "md:flex-row",
  lg: "lg:flex-row",
  xl: "xl:flex-row",
  "2xl": "2xl:flex-row",
};

/**
 * `{bp}:[&>*]:w-auto` — releases the forced full-width children Inline's
 * `collapseBelow` applies while stacked, at and above the given breakpoint.
 */
export const CHILDREN_AUTO_WIDTH_AT: Record<Breakpoint, string> = {
  sm: "sm:[&>*]:w-auto",
  md: "md:[&>*]:w-auto",
  lg: "lg:[&>*]:w-auto",
  xl: "xl:[&>*]:w-auto",
  "2xl": "2xl:[&>*]:w-auto",
};

/**
 * Undoes Bleed's width/margin overrides at and above the given breakpoint —
 * shared by both `to` modes, since `w-auto`/`mx-0` cancels whichever one
 * was applied below that breakpoint.
 */
export const BLEED_RESET_AT: Record<Breakpoint, string> = {
  sm: "sm:w-auto sm:mx-0",
  md: "md:w-auto md:mx-0",
  lg: "lg:w-auto lg:mx-0",
  xl: "xl:w-auto xl:mx-0",
  "2xl": "2xl:w-auto 2xl:mx-0",
};

/** Split's `ratio` (prose share) as a two-column `grid-template-columns`. */
export type SplitRatio = "1/2" | "2/5" | "3/5";

export const RATIO_COLS: Record<SplitRatio, string> = {
  "1/2": "grid-cols-[1fr_1fr]",
  "2/5": "grid-cols-[2fr_3fr]",
  "3/5": "grid-cols-[3fr_2fr]",
};

/** Breakpoint-prefixed version of `RATIO_COLS`, for Split's `collapseBelow`. */
export const RATIO_COLS_AT: Record<Breakpoint, Record<SplitRatio, string>> = {
  sm: {
    "1/2": "sm:grid-cols-[1fr_1fr]",
    "2/5": "sm:grid-cols-[2fr_3fr]",
    "3/5": "sm:grid-cols-[3fr_2fr]",
  },
  md: {
    "1/2": "md:grid-cols-[1fr_1fr]",
    "2/5": "md:grid-cols-[2fr_3fr]",
    "3/5": "md:grid-cols-[3fr_2fr]",
  },
  lg: {
    "1/2": "lg:grid-cols-[1fr_1fr]",
    "2/5": "lg:grid-cols-[2fr_3fr]",
    "3/5": "lg:grid-cols-[3fr_2fr]",
  },
  xl: {
    "1/2": "xl:grid-cols-[1fr_1fr]",
    "2/5": "xl:grid-cols-[2fr_3fr]",
    "3/5": "xl:grid-cols-[3fr_2fr]",
  },
  "2xl": {
    "1/2": "2xl:grid-cols-[1fr_1fr]",
    "2/5": "2xl:grid-cols-[2fr_3fr]",
    "3/5": "2xl:grid-cols-[3fr_2fr]",
  },
};

/**
 * Grid's `cols` counts, 1–12 (the range already in use elsewhere in this
 * codebase — see `grid-cols-12` on the LLMOps/MLOps filter layouts).
 * `repeat(auto-fit, minmax())` is banned by the contract; every column
 * count a Grid can render must be one of these explicit literals.
 */
export const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

/** Breakpoint-prefixed version of `GRID_COLS`. */
export const GRID_COLS_AT: Record<Breakpoint, Record<number, string>> = {
  sm: {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
    7: "sm:grid-cols-7",
    8: "sm:grid-cols-8",
    9: "sm:grid-cols-9",
    10: "sm:grid-cols-10",
    11: "sm:grid-cols-11",
    12: "sm:grid-cols-12",
  },
  md: {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    7: "md:grid-cols-7",
    8: "md:grid-cols-8",
    9: "md:grid-cols-9",
    10: "md:grid-cols-10",
    11: "md:grid-cols-11",
    12: "md:grid-cols-12",
  },
  lg: {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
    7: "lg:grid-cols-7",
    8: "lg:grid-cols-8",
    9: "lg:grid-cols-9",
    10: "lg:grid-cols-10",
    11: "lg:grid-cols-11",
    12: "lg:grid-cols-12",
  },
  xl: {
    1: "xl:grid-cols-1",
    2: "xl:grid-cols-2",
    3: "xl:grid-cols-3",
    4: "xl:grid-cols-4",
    5: "xl:grid-cols-5",
    6: "xl:grid-cols-6",
    7: "xl:grid-cols-7",
    8: "xl:grid-cols-8",
    9: "xl:grid-cols-9",
    10: "xl:grid-cols-10",
    11: "xl:grid-cols-11",
    12: "xl:grid-cols-12",
  },
  "2xl": {
    1: "2xl:grid-cols-1",
    2: "2xl:grid-cols-2",
    3: "2xl:grid-cols-3",
    4: "2xl:grid-cols-4",
    5: "2xl:grid-cols-5",
    6: "2xl:grid-cols-6",
    7: "2xl:grid-cols-7",
    8: "2xl:grid-cols-8",
    9: "2xl:grid-cols-9",
    10: "2xl:grid-cols-10",
    11: "2xl:grid-cols-11",
    12: "2xl:grid-cols-12",
  },
};

export type GridColsProp = Partial<Record<Breakpoint | "base", number>>;

/** Resolves Grid's `cols` prop to a class string. Silently drops any count outside 1–12. */
export function resolveGridCols(cols: GridColsProp): string {
  const classes: string[] = [];
  if (cols.base && GRID_COLS[cols.base]) classes.push(GRID_COLS[cols.base]);
  for (const bp of BREAKPOINTS) {
    const n = cols[bp];
    if (n && GRID_COLS_AT[bp][n]) classes.push(GRID_COLS_AT[bp][n]);
  }
  return classes.join(" ");
}
