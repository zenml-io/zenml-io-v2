/**
 * Shared button class-string constants (#248).
 *
 * Plain TS, no framework import, so a Preact island — which can never
 * import the `.astro` `Button` component — can still render byte-identical
 * button chrome. `emptyStateStyles.ts` builds its recovery-action classes
 * from these (`ACTION_BASE` = `BUTTON_BASE_CLASSES` + `BUTTON_SIZE_CLASSES.sm`;
 * `solid`/`outline`/`ghost` weights map onto `primary`/`secondary`/`ghost`
 * variants) instead of hand-copying `Button.astro`'s strings a second time.
 */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "overDark"
  | "secondaryGray";
export type ButtonSize = "sm" | "md" | "lg";

export const BUTTON_BASE_CLASSES =
  "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-300 cursor-pointer";

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-(--color-sage-700) text-(--color-cream-50) border border-(--color-sage-800) shadow-button hover:bg-(--color-sage-800) focus:shadow-focus-primary",
  secondary:
    "bg-white text-gray-700 border border-gray-300 shadow-button hover:bg-gray-50 focus:shadow-focus-gray",
  ghost:
    "text-(--color-sage-800) hover:text-foreground hover:bg-(--color-sage-100)",
  overDark:
    "bg-gray-900 text-white border border-gray-700 shadow-button hover:bg-gray-800",
  secondaryGray:
    "bg-transparent text-white border border-white/30 shadow-button hover:bg-white/10",
};

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-5 py-3 text-base gap-2",
};
