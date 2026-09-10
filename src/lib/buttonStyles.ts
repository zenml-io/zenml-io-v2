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
  "inline-flex cursor-pointer items-center justify-center rounded-[10px] font-sans font-semibold transition-colors duration-200";

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "border border-(--color-sage-800) bg-(--color-sage-700) text-(--color-cream-50) hover:bg-(--color-sage-800) focus:outline-none focus:ring-1 focus:ring-(--color-sage-700)",
  secondary:
    "border border-(--color-border) bg-(--color-cream-50) text-(--color-cream-900) hover:border-(--color-sage-500) hover:bg-(--color-sage-100) focus:outline-none focus:ring-1 focus:ring-(--color-sage-700)",
  ghost:
    "text-(--color-sage-800) hover:text-foreground hover:bg-(--color-sage-100)",
  overDark:
    "border border-(--color-sage-700) bg-(--color-cream-900) text-(--color-cream-50) hover:bg-(--color-sage-800)",
  secondaryGray:
    "border border-(--color-sage-400) bg-transparent text-(--color-cream-50) hover:bg-(--color-sage-800)",
};

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-5 py-3 text-base gap-2",
};
