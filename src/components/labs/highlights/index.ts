/**
 * Highlight figures for the feature-tabs block, keyed by `<product>/<slug>`.
 * A tab that names a `figure` renders the matching inline SVG instead of an
 * `<img>`; tabs without one keep their raster image. Add a figure here and
 * reference its id from the product's tab content.
 */
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import ZenmlCaching from "./zenml/caching.astro";
import ZenmlGovernance from "./zenml/governance.astro";
import ZenmlInfrastructure from "./zenml/infrastructure.astro";
import ZenmlOrchestration from "./zenml/orchestration.astro";
import ZenmlVersioning from "./zenml/versioning.astro";

export const HIGHLIGHT_FIGURES = {
  "zenml/orchestration": ZenmlOrchestration,
  "zenml/versioning": ZenmlVersioning,
  "zenml/infrastructure": ZenmlInfrastructure,
  "zenml/caching": ZenmlCaching,
  "zenml/governance": ZenmlGovernance,
} satisfies Record<string, AstroComponentFactory>;

export type HighlightFigureId = keyof typeof HIGHLIGHT_FIGURES;
