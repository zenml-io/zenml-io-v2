/**
 * Breadcrumb domain layer.
 *
 * `Breadcrumb.astro`'s one prop list drives both the visual crumb trail and
 * its BreadcrumbList JSON-LD (#248) — but an `.astro` file can't render
 * under this repo's vitest setup, so the structured-data half of that
 * contract lives here as a pure function instead, where it's directly
 * unit-testable.
 */
import { absoluteUrl } from "./seo";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current page — it renders as text, never a link. */
  href?: string;
}

/** Builds the BreadcrumbList JSON-LD object for a crumb trail. */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      // Matches BlogLayout's convention: the current page (last item) has no `item` URL.
      ...(i < items.length - 1 && item.href
        ? { item: absoluteUrl(item.href) }
        : {}),
    })),
  };
}
