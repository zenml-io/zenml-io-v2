/**
 * SEO utilities — centralizes meta tag resolution for all page templates.
 *
 * This module defines the stable SEOProps interface (Phase 3→4 handoff contract)
 * and provides helper functions for canonical URL generation and OG/Twitter
 * meta resolution with sensible fallbacks.
 */

import {
  ASSET_BASE_URL,
  COMPARE_OG_PREFIX,
  type CompareOgBrand,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_URL,
} from "./constants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Props accepted by BaseLayout for SEO meta rendering */
export interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  noindex?: boolean;
}

/** Fully resolved SEO values — no optional fields, ready to render */
export interface ResolvedSEO {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string | undefined;
  twitterCard: "summary" | "summary_large_image";
  noindex: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build canonical URL from site URL + pathname.
 * Strips .html extension (Astro's build.format: "file" adds it to pathnames)
 * and trailing slashes to produce clean canonical URLs.
 */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
}

export function buildCanonical(pathname: string, override?: string): string {
  if (override) return override;

  // Root path stays as-is
  if (pathname === "/" || pathname === "/index.html") return SITE_URL;

  let clean = pathname;
  // Strip .html extension (build.format: "file" adds it to Astro.url.pathname)
  if (clean.endsWith(".html")) clean = clean.slice(0, -5);
  // Strip trailing slash to match trailingSlash: "never" config
  if (clean.endsWith("/")) clean = clean.slice(0, -1);

  return `${SITE_URL}${clean}`;
}

/**
 * URL of the auto-generated OG card for an MDX compare page.
 *
 * The card lives at a deterministic R2 key keyed on brand and slug (no
 * content hash) — uploaded by `scripts/og/generate-compare-og.ts`,
 * overwritten in place on regen. Each compare layout passes its own brand
 * and uses this as the fallback when the `.mdx` has no `ogImage:` override.
 */
export function compareOgUrl(brand: CompareOgBrand, slug: string): string {
  return `${ASSET_BASE_URL}/${COMPARE_OG_PREFIX[brand]}/${slug}.jpg`;
}

/**
 * Resolve partial SEOProps into fully populated ResolvedSEO values.
 *
 * Fallback chain:
 * - description → DEFAULT_DESCRIPTION
 * - canonical → buildCanonical(pathname)
 * - ogTitle → title
 * - ogDescription → description
 * - ogImage → DEFAULT_OG_IMAGE (if defined)
 * - twitterCard → summary_large_image (if ogImage exists), else summary
 * - noindex → false
 */
export function resolveSeo(props: SEOProps, pathname: string): ResolvedSEO {
  const description = props.description || DEFAULT_DESCRIPTION;
  const canonical = buildCanonical(pathname, props.canonical);
  const rawOgImage = props.ogImage || DEFAULT_OG_IMAGE || undefined;
  // OG images must be absolute URLs for social media crawlers
  const ogImage = rawOgImage?.startsWith("/")
    ? `${SITE_URL}${rawOgImage}`
    : rawOgImage;
  const twitterCard =
    props.twitterCard ?? (ogImage ? "summary_large_image" : "summary");

  return {
    title: props.title,
    description,
    canonical,
    ogTitle: props.ogTitle || props.title,
    ogDescription: props.ogDescription || description,
    ogImage,
    twitterCard,
    noindex: props.noindex ?? false,
  };
}
