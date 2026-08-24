/**
 * Shared spacing lookup tables for the layout primitive set (issue #248).
 *
 * Tailwind scans literal class strings, not runtime-composed ones, so every
 * `SpaceStep` -> `gap-space-*` utility mapping the primitives need lives here
 * as a static table instead of a template string like `` `gap-space-${step}` ``.
 * `Stack`, `Inline`, `Grid` and their Preact twins all import `gapClasses`
 * instead of each keeping their own copy, so the mapping can't drift between
 * a primitive and its twin.
 */
import type { Breakpoint, SpaceStep } from "../../../lib/section";

/** A fixed step, or per-breakpoint overrides layered on top of the primitive's own default. */
export type ResponsiveSpace =
  | SpaceStep
  | Partial<Record<Breakpoint, SpaceStep>>;

/** Ascending breakpoint order — also the order responsive classes are emitted in. */
export const BREAKPOINTS: readonly Breakpoint[] = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];

const GAP_BASE: Record<SpaceStep, string> = {
  xxs: "gap-space-xxs",
  xs: "gap-space-xs",
  sm: "gap-space-sm",
  md: "gap-space-md",
  lg: "gap-space-lg",
  xl: "gap-space-xl",
  xxl: "gap-space-xxl",
};

const GAP_AT: Record<Breakpoint, Record<SpaceStep, string>> = {
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
 * Resolves a `ResponsiveSpace` prop to `gap-space-*` classes.
 *
 * A plain `SpaceStep` maps straight to its base class. A responsive object
 * has no `base` key of its own (the type only carries breakpoint keys), so
 * `fallback` — the primitive's own default step — always supplies the
 * unprefixed class, and each breakpoint key present in the object layers a
 * `{bp}:gap-space-{step}` override on top, mobile-first.
 */
export function gapClasses(
  space: ResponsiveSpace | undefined,
  fallback: SpaceStep,
): string {
  if (space === undefined) return GAP_BASE[fallback];
  if (typeof space === "string") return GAP_BASE[space];

  const classes = [GAP_BASE[fallback]];
  for (const bp of BREAKPOINTS) {
    const step = space[bp];
    if (step) classes.push(GAP_AT[bp][step]);
  }
  return classes.join(" ");
}
