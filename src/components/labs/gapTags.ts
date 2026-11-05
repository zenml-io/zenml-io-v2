/**
 * The tag colours for the two kinds of gap on the homepage's gap report:
 * Wrong (an eval that passes what the team would fail) on the red tint,
 * Missing (a behavior nothing checks) as a cream outline. Shared by
 * labs.gap-report-visual and labs.onboarding-steps.
 */
export const GAP_TAG = {
  wrong: "bg-destructive/10 text-destructive",
  missing: "border border-(--color-cream-400) text-(--color-cream-800)",
} as const;

/** The tag's shape and type, so the hero and the onboarding report draw it the same. */
export const GAP_TAG_BASE =
  "shrink-0 rounded-full px-2.5 py-0.5 font-sans text-[12px] leading-4 font-medium";
