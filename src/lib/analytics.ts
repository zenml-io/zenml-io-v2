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

export const DEFAULT_SURFACE: Surface = "ml";
