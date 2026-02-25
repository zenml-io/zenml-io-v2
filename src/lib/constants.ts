/** Canonical site URL (always use www) */
export const SITE_URL = "https://www.zenml.io";

/** Production hostnames — used for hostname-gating analytics and consent scripts.
 *  Includes both www (canonical) and apex (during DNS cutover / direct access). */
export const PROD_HOSTNAMES = ["www.zenml.io", "zenml.io"] as const;

/** Check whether a hostname is a production domain (not a preview deploy). */
export function isProdHostname(hostname: string): boolean {
  return (PROD_HOSTNAMES as readonly string[]).includes(hostname);
}

/** Default SEO description */
export const DEFAULT_DESCRIPTION =
  "ZenML — Build portable, production-ready MLOps pipelines.";

/** Asset base URL (R2 bucket via custom domain for HTTP/2 multiplexing) */
export const ASSET_BASE_URL = "https://assets.zenml.io";

/** Webflow site ID used in R2 asset paths */
const WEBFLOW_SITE_ID = "64a817a2e7e2208272d1ce30";

/** Pre-built base for Webflow-migrated assets: ASSET_BASE_URL/webflow/<siteId> */
export const R2_WEBFLOW_BASE = `${ASSET_BASE_URL}/webflow/${WEBFLOW_SITE_ID}`;

/**
 * Default Open Graph image URL — used when a page doesn't specify its own.
 * Blog posts override this with their mainImage.
 */
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";
