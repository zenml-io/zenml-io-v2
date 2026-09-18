/**
 * The highlight-figure ids, as a plain TypeScript module with no `.astro`
 * import: content modules (`labs-product-zenml.ts`, `features.ts`) and the
 * tests that import them type against this file, so `tsc -p
 * tsconfig.tests.json` never has to resolve an Astro component. `index.ts`
 * maps every id here to its drawn figure and is typed against this list, so
 * the two cannot drift.
 */
export const HIGHLIGHT_FIGURE_IDS = [
  "zenml/orchestration",
  "zenml/versioning",
  "zenml/infrastructure",
  "zenml/caching",
  "zenml/governance",
] as const;

export type HighlightFigureId = (typeof HIGHLIGHT_FIGURE_IDS)[number];
