/**
 * Two-tier navigation data — issue #65.
 *
 * Primary tier (brand-neutral, on every page):
 *   ZenML  Kitaru  ZenML Pro  Pricing  Case Studies  Blog
 *
 * Secondary tier (product subnav, appears only on product-context pages):
 *   ZenML  (surface=ml)   : Overview · Features · Integrations · Compare · OSS vs Pro · Docs
 *   Kitaru (surface=agent): Overview · Compare · Docs
 *
 * On surface=unified pages (homepage, /pricing, /compare, /blog, etc.) the
 * subnav is hidden — see Navigation.astro for the render rules.
 */
import type { Surface } from "./analytics";

/**
 * `productSurface` marks an entry as one of the three product anchors
 * (ZenML / Kitaru / ZenML Pro). The mobile drawer uses this to avoid
 * showing those entries twice (they're already in the context chip) and
 * the desktop subnav uses it to label the current product context.
 */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  productSurface?: ProductSurface;
}

export type ProductSurface = "ml" | "agent" | "pro";

// ---------------------------------------------------------------------------
// Primary tier (always shown)
// ---------------------------------------------------------------------------

export const NAV_PRIMARY: NavLink[] = [
  { label: "ZenML", href: "/product/zenml", productSurface: "ml" },
  { label: "Kitaru", href: "/product/kitaru", productSurface: "agent" },
  { label: "ZenML Pro", href: "/pro", productSurface: "pro" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];

/** Product anchors — derived view of NAV_PRIMARY, used by the mobile context
 * switcher. Single source of truth: edit NAV_PRIMARY only. */
export const PRODUCT_CONTEXTS = NAV_PRIMARY.filter(
  (link): link is NavLink & { productSurface: ProductSurface } =>
    link.productSurface !== undefined,
);

/** Resolve the active product context for a given surface, if any. */
export function getActiveContext(surface: Surface): (typeof PRODUCT_CONTEXTS)[number] | null {
  return (
    PRODUCT_CONTEXTS.find((c) => c.productSurface === surface) ?? null
  );
}

// ---------------------------------------------------------------------------
// Secondary tier (product subnav)
// ---------------------------------------------------------------------------

export const NAV_SUBNAVS: Record<"ml" | "agent", NavLink[]> = {
  ml: [
    { label: "Overview", href: "/product/zenml" },
    { label: "Features", href: "/features" },
    { label: "Integrations", href: "/integrations" },
    { label: "Compare", href: "/compare/zenml" },
    { label: "OSS vs Pro", href: "/open-source-vs-pro" },
    { label: "Docs", href: "https://docs.zenml.io", external: true },
  ],
  agent: [
    { label: "Overview", href: "/product/kitaru" },
    { label: "Compare", href: "/compare/kitaru" },
    { label: "Docs", href: "https://kitaru.ai/docs", external: true },
  ],
};

/** Return the subnav items for a given surface, or null when no subnav renders. */
export function getSubnavForSurface(surface: Surface): NavLink[] | null {
  if (surface === "ml") return NAV_SUBNAVS.ml;
  if (surface === "agent") return NAV_SUBNAVS.agent;
  return null;
}

// ---------------------------------------------------------------------------
// CTA buttons (right cluster on desktop, bottom on mobile)
// ---------------------------------------------------------------------------

export const NAV_CTAS: NavLink[] = [
  { label: "Read Docs", href: "/docs" },
  { label: "Book a demo", href: "/book-your-demo" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Check if a nav link matches the current path (exact or section prefix). */
export function isActivePath(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  if (currentPath === href) return true;
  if (currentPath.startsWith(`${href}/`)) return true;
  return false;
}

/** Tailwind classes for a product's brand accent — dot fill, text color, and
 * border color. Single source of truth for the sage-zenml / warm-orange /
 * purple-pro mapping used by the subnav title, mobile chip, picker entries,
 * and subnav active-state styling. */
export function productAccent(surface: ProductSurface): {
  dot: string;
  text: string;
  border: string;
} {
  if (surface === "agent") {
    return { dot: "bg-orange-500", text: "text-orange-500", border: "border-orange-500" };
  }
  if (surface === "pro") {
    return { dot: "bg-purple-500", text: "text-purple-500", border: "border-purple-500" };
  }
  return { dot: "bg-zenml-500", text: "text-zenml-500", border: "border-zenml-500" };
}
