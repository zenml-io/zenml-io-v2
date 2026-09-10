/**
 * labsButtonStyles — the pill class strings behind the Labs shell's one CTA
 * look. `LabsButton.astro` and the `CookieConsent` Preact island both render
 * real pill buttons (an <a> and a <button> respectively), so the class
 * strings live here once and both sides import them — an Astro/TSX twin
 * pair sharing one source instead of two hand-kept copies.
 */

export type LabsButtonTone = "dark" | "sage" | "orange" | "ghost";

/** The shared pill shape + type treatment, tone-independent. */
export const BASE_PILL_CLASSES =
  "inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-[26px] font-label text-[13px] uppercase tracking-[0.05em] transition-colors duration-200 ease-out";

/** Per-tone colour classes, layered on top of `BASE_PILL_CLASSES`. */
export const TONE_CLASSES: Record<LabsButtonTone, string> = {
  dark: "bg-(--color-cream-900) text-(--color-cream-50) hover:bg-(--color-sage-800)",
  sage: "bg-(--color-sage-400) text-(--color-cream-800) hover:bg-(--color-sage-500)",
  orange:
    "bg-(--color-orange-600) text-(--color-cream-50) hover:bg-(--color-orange-700)",
  ghost:
    "border border-(--color-cream-600) text-(--color-cream-800) hover:bg-(--color-cream-100)",
};
