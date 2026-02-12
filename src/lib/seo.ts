/**
 * SEO utilities — centralizes meta tag resolution for all page templates.
 *
 * This module defines the stable SEOProps interface (Phase 3→4 handoff contract)
 * and provides helper functions for canonical URL generation and OG/Twitter
 * meta resolution with sensible fallbacks.
 */

import { SITE_URL, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from "./constants";

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
export function resolveSeo(
  props: SEOProps,
  pathname: string,
): ResolvedSEO {
  const description = props.description || DEFAULT_DESCRIPTION;
  const canonical = buildCanonical(pathname, props.canonical);
  const rawOgImage = props.ogImage || DEFAULT_OG_IMAGE || undefined;
  // OG images must be absolute URLs for social media crawlers
  const ogImage = rawOgImage?.startsWith("/")
    ? `${SITE_URL}${rawOgImage}`
    : rawOgImage;
  const twitterCard = props.twitterCard ?? (ogImage ? "summary_large_image" : "summary");

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
