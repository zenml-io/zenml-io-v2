/**
 * featureIcons.ts — the ids of the isometric feature-grid marks, in one place
 * so the content schema and the panel type cannot drift.
 *
 * The markup for each id lives in `src/components/labs/icons.ts`; the panels
 * that consume them are `FeaturePanel` in `labs-home.ts` (the homepage grid)
 * and the `advantages` collection (the comparison strategy block).
 *
 * This module deliberately imports nothing: `src/content.config.ts` reads it
 * at config-eval time, so it must stay free of `astro:content` and of any
 * module that reaches it.
 */
export const FEATURE_ICON_IDS = [
  "pipeline",
  "layers",
  "open-box",
  "shield",
  "code",
  "registry",
  "hub",
  "people",
] as const;

export type FeatureIconId = (typeof FEATURE_ICON_IDS)[number];
