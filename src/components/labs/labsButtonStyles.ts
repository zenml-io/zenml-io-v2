/**
 * labsButtonStyles — the one copy of `LabsButton.astro`'s class strings.
 *
 * Extracted so a Preact island can wear the same pill without duplicating
 * the strings (the labs empty state's "Clear all filters" button uses the
 * `ghost` tone). `LabsButton.astro` stays the only way an `.astro` call site
 * renders a pill; nothing else should hand-write these classes.
 */

export type LabsButtonTone = "dark" | "sage" | "orange" | "ghost";

export const LABS_BUTTON_BASE =
  "inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-[26px] font-label text-[13px] uppercase tracking-[0.05em] transition-colors duration-200 ease-out";

export const LABS_BUTTON_TONE_CLASSES: Record<LabsButtonTone, string> = {
  dark: "bg-(--color-cream-900) text-(--color-cream-50) hover:bg-(--color-sage-800)",
  sage: "bg-(--color-sage-400) text-(--color-cream-800) hover:bg-(--color-sage-500)",
  orange:
    "bg-(--color-orange-600) text-(--color-cream-50) hover:bg-(--color-orange-700)",
  ghost:
    "border border-(--color-cream-600) text-(--color-cream-800) hover:bg-(--color-cream-100)",
};

/** The full pill class string for one tone, plus optional extra classes. */
export function labsButtonClasses(
  tone: LabsButtonTone = "dark",
  className?: string,
): string {
  return [LABS_BUTTON_BASE, LABS_BUTTON_TONE_CLASSES[tone], className]
    .filter(Boolean)
    .join(" ");
}
