/**
 * The tag colours for the two kinds of gap on the homepage's gap report:
 * Wrong (an eval that passes what the team would fail) on the orange tint,
 * Missing (a behavior nothing checks) as a cream outline. Shared by
 * labs.gap-report-visual, labs.onboarding-steps and labs.gap-kinds.
 */
export const GAP_TAG = {
  wrong: "bg-(--color-orange-50) text-(--color-orange-700)",
  missing: "border border-(--color-cream-400) text-(--color-cream-800)",
} as const;
