/**
 * Analytics surface taxonomy for the unified ZenML × Kitaru site.
 *
 * Each page is one of three surfaces per MERGE_PLAN D3:
 *   - "ml":      ZenML-side pages (homepage, /features/*, integrations, MLOps content)
 *   - "agent":   Kitaru-side pages (/product/kitaru, /compare/kitaru-vs-*, future Kitaru blog)
 *   - "unified": cross-product pages (/pricing, /compare index, /get-started, /pro post-Phase 7)
 *
 * Used by Plausible's pageview custom prop `surface` (one dashboard, filterable)
 * and passed as a property on Segment page events (one workspace; D4 superseded
 * — the two-write-key plan was dropped after audit, the routes that needed the
 * Kitaru key turned out to be dead code).
 *
 * BaseLayout/MinimalLayout stamp `<html data-surface={surface}>`. Client-side
 * scripts (PlausibleBridge, Segment loader) read it from the DOM.
 */

export type Surface = "ml" | "agent" | "unified";

/**
 * Stable Plausible goals used by the research-database surfaces. Keep this
 * small catalog beside the shared analytics taxonomy so maintainers do not
 * have to discover tracked conversion events by searching rendered markup.
 */
export const DATABASE_PLAUSIBLE_GOALS = {
  closeSignupZenml: "Database-Close-Signup-ZenML",
  entrySource: "Database-Entry-Source",
} as const;
