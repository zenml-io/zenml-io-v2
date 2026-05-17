/**
 * Analytics surface taxonomy for the unified ZenML × Kitaru site.
 *
 * Each page is one of three surfaces per MERGE_PLAN D3:
 *   - "ml":      ZenML-side pages (homepage, /features/*, integrations, MLOps content)
 *   - "agent":   Kitaru-side pages (/product/kitaru, /compare/kitaru-vs-*, future Kitaru blog)
 *   - "unified": cross-product pages (/pricing, /compare index, /get-started, /pro post-Phase 7)
 *
 * The surface drives:
 *   - Plausible's pageview custom prop `surface` (one dashboard, filterable)
 *   - Segment write-key selection (two warehouses, see D4)
 *
 * BaseLayout/MinimalLayout stamp `<html data-surface={surface}>`. Client-side
 * scripts (PlausibleBridge, Segment loader) read it from the DOM.
 */

export type Surface = "ml" | "agent" | "unified";

export const DEFAULT_SURFACE: Surface = "ml";

/** Segment write keys per D4 — read by the Segment loader in consentConfig.ts. */
export const SEGMENT_WRITE_KEYS = {
  ml: "Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT",
  unified: "Q9Gsmet5Uo67D8HIEk4pj5vUOalWu4iT",
  agent: "MMarT0XoV4LJH8wR7wpmkTbF7txc9Bsg",
} as const satisfies Record<Surface, string>;
