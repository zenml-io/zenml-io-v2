/**
 * Shared class strings for EmptyState.astro and EmptyState.tsx (#248).
 *
 * Plain TS, no framework import, so both the Astro primitive and its Preact
 * twin can pull from the same source instead of hand-copying class strings
 * into two files that then drift apart.
 *
 * The container/heading/description classes reproduce the current
 * LLMOpsFilter empty state (`src/components/islands/LLMOpsFilter.tsx`,
 * `renderEmptyState`) literally, so a future migration of that island onto
 * this primitive is pixel-identical. The action classes reproduce
 * `Button.astro`'s `secondary`/`ghost`/`primary` variants — never import the
 * .astro Button into a Preact island, so the classes are copied here instead.
 */
import type { CtaProps } from "../../lib/section";

export const EMPTY_STATE_CONTAINER =
  "flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 py-16 text-center";
export const EMPTY_STATE_INNER = "mx-auto max-w-md px-4";
export const EMPTY_STATE_HEADING = "text-lg font-medium text-gray-700";
export const EMPTY_STATE_DESCRIPTION = "mt-2 text-sm text-gray-500";
export const EMPTY_STATE_ACTION_WRAP = "mt-4 flex justify-center";

/**
 * Reserved height when `reserveHeight` is true and a call site doesn't pass
 * its own `minHeightClass`. Each surface's populated grid is a different
 * height, so this is only a fallback — real consumers should pass their own.
 */
export const EMPTY_STATE_DEFAULT_MIN_HEIGHT = "min-h-[20rem]";

const ACTION_BASE =
  "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-300 cursor-pointer px-3.5 py-2 text-sm gap-1.5";

/** `CtaProps.weight` → Button.astro's variant classes, reproduced verbatim. */
const ACTION_WEIGHT_CLASSES: Record<NonNullable<CtaProps["weight"]>, string> = {
  solid:
    "bg-zenml-500 text-white border border-zenml-600 shadow-button hover:bg-zenml-700 focus:shadow-focus-primary",
  outline:
    "bg-white text-gray-700 border border-gray-300 shadow-button hover:bg-gray-50 focus:shadow-focus-gray",
  ghost: "text-zenml-500 hover:text-zenml-600 hover:bg-zenml-25",
};

/** Default weight is "outline" — a recovery action reads as secondary, never primary, chrome. */
export function emptyStateActionClasses(
  weight: CtaProps["weight"] = "outline",
): string {
  return [ACTION_BASE, ACTION_WEIGHT_CLASSES[weight]].join(" ");
}

export function emptyStateContainerClasses(
  reserveHeight: boolean,
  minHeightClass: string | undefined,
  className: string | undefined,
): string {
  return [
    EMPTY_STATE_CONTAINER,
    reserveHeight ? (minHeightClass ?? EMPTY_STATE_DEFAULT_MIN_HEIGHT) : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
