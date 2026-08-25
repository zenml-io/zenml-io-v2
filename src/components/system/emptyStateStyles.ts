/**
 * Shared class strings and renderer Props contract for EmptyState.astro and
 * EmptyState.tsx (#248).
 *
 * Plain TS, no framework import, so both the Astro primitive and its Preact
 * twin can pull from the same source instead of hand-copying class strings
 * (or a Props list) into two files that then drift apart.
 *
 * The container/heading/description classes reproduce the LLMOps/MLOps
 * filter empty state — since extracted to
 * `src/components/islands/shared/FilterEmptyState.tsx`, which imports the
 * heading/inner/description constants below (while staying outside the
 * EmptyState contract by design — see its TSDoc), so the two surfaces stay
 * pixel-identical (spacing via the equivalent named tokens).
 * The action classes build on
 * `../../lib/buttonStyles`'s shared constants — `solid`/`outline`/`ghost`
 * weights map onto Button.astro's `primary`/`secondary`/`ghost` variants —
 * rather than hand-copying those strings a second time (never import the
 * .astro Button into a Preact island).
 */
import {
  BUTTON_BASE_CLASSES,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_CLASSES,
} from "../../lib/buttonStyles";
import type { CtaProps, EmptyStateProps } from "../../lib/section";

export const EMPTY_STATE_CONTAINER =
  "flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 py-space-xl text-center";
export const EMPTY_STATE_INNER = "mx-auto max-w-md px-space-xs";
export const EMPTY_STATE_HEADING = "text-lg font-medium text-gray-700";
export const EMPTY_STATE_DESCRIPTION = "mt-space-xxs text-sm text-gray-500";
export const EMPTY_STATE_ACTION_WRAP = "mt-space-xs flex justify-center";

/**
 * Reserved height when `reserveHeight` is true and a call site doesn't pass
 * its own `minHeightClass`. Each surface's populated grid is a different
 * height, so this is only a fallback — real consumers should pass their own.
 */
export const EMPTY_STATE_DEFAULT_MIN_HEIGHT = "min-h-[20rem]";

const ACTION_BASE = `${BUTTON_BASE_CLASSES} ${BUTTON_SIZE_CLASSES.sm}`;

/** `CtaProps.weight` → Button.astro's variant classes. */
const ACTION_WEIGHT_CLASSES: Record<NonNullable<CtaProps["weight"]>, string> = {
  solid: BUTTON_VARIANT_CLASSES.primary,
  outline: BUTTON_VARIANT_CLASSES.secondary,
  ghost: BUTTON_VARIANT_CLASSES.ghost,
};

/** Default weight is "outline" — a recovery action reads as secondary, never primary, chrome. */
export function emptyStateActionClasses(
  weight: CtaProps["weight"] = "outline",
): string {
  return [ACTION_BASE, ACTION_WEIGHT_CLASSES[weight]].join(" ");
}

/**
 * Migration-parity escape hatch, mirroring SectionIntro's `classOverrides`
 * (#248): each key REPLACES the house default for that piece so a call site
 * whose empty state predates this primitive can reproduce its exact classes
 * (a dropdown row, a bare build-time `<p>`, a JS-toggled DOM node) instead of
 * inheriting the card-style default. New code must not pass this.
 */
export interface EmptyStateClassOverrides {
  container?: string;
  inner?: string;
  heading?: string;
}

/**
 * The twins' full renderer contract: the shared `EmptyStateProps` content
 * contract plus the layout-level props both renderers accept. Declared once
 * here — the same lockstep mechanism as the class strings above — so the two
 * files' Props cannot drift apart (they did once: `.astro` grew `id` and
 * `.tsx` silently didn't; `tests/lib/emptyStateParity.test.ts` guards the
 * pattern). `id` is layout-specific — a hook for a node a vanilla `<script>`
 * toggles by id (integrations) — and deliberately not part of the shared
 * `EmptyStateProps` content contract in `src/lib/section.ts`.
 */
export interface EmptyStateRendererProps extends EmptyStateProps {
  /** Tailwind min-height utility applied when reserveHeight is true (e.g. "min-h-[36rem]"). Ignored when reserveHeight is false. */
  minHeightClass?: string;
  class?: string;
  id?: string;
  classOverrides?: EmptyStateClassOverrides;
  /** Default "status". Pass null to render no role attribute at all. */
  role?: string | null;
}

/**
 * `classOverrides` clusters verified to recur identically across 3+
 * migrated call sites (#248 altitude review) — same rationale and
 * escape-hatch semantics as `SECTION_INTRO_PRESETS`. `bareList` is the
 * "no card, just a centered line" override shared by the `/tags/[slug]`,
 * `/category/[slug]`, and `/author/[slug]` empty states; each site keeps
 * its own `heading` text/copy inline and spreads this pair alongside it.
 */
export const EMPTY_STATE_PRESETS = {
  bareList: {
    container: "block",
    inner: "",
  },
} as const;

export function emptyStateContainerClasses(
  reserveHeight: boolean,
  minHeightClass: string | undefined,
  className: string | undefined,
  containerOverride?: string,
): string {
  return [
    containerOverride ?? EMPTY_STATE_CONTAINER,
    reserveHeight ? (minHeightClass ?? EMPTY_STATE_DEFAULT_MIN_HEIGHT) : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
