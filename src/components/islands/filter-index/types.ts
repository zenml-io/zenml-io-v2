/**
 * Shared type contracts for the FilterIndex island family (#249).
 *
 * A "facet" is one filterable dimension in the rail. There are exactly two
 * shapes in practice — a single-select facet (e.g. Industry, Integration
 * type) and a multi-select facet (e.g. Tags) — so the shell models exactly
 * those two roles rather than an open-ended facet array. `FilterEmptyState`
 * (kept as-is, see `../shared/FilterEmptyState`) has the same two-role
 * shape, which is what makes reusing it possible.
 */

export interface FilterOption {
  slug: string;
  name: string;
}

export type TagMode = "and" | "or";

/** A single-select facet: choosing one clears any other (e.g. Industry). */
export interface SingleFacetConfig<T> {
  /** Facet heading, e.g. "Industry" or "Type". */
  label: string;
  /** URL query param name for this facet's selected value. */
  urlParam: string;
  options: FilterOption[];
  getValue: (item: T) => string | null | undefined;
}

/** A multi-select facet: several values active at once (e.g. Tags). */
export interface MultiFacetConfig<T> {
  /** Facet heading, e.g. "Technologies" or "MLOps Topics". */
  label: string;
  /** URL query param name for the comma-joined selected slugs. */
  urlParam: string;
  options: FilterOption[];
  getValues: (item: T) => string[];
  /** Placeholder for the in-rail facet search box. Defaults to "Search tags...". */
  searchPlaceholder?: string;
  /** sr-only label for the in-rail facet search box. Defaults to `Search ${label}`. */
  searchAriaLabel?: string;
  /** Noun used in "Show all N ___" — e.g. "tags". Defaults to "tags". */
  itemNounPlural?: string;
}
