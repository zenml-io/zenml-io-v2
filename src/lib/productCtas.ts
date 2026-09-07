import type { BrandedCtaLink, ProductBrand } from "./marketingPageTypes";
import { KITARU_LINKS } from "./productKitaru";
import { ZENML_LINKS } from "./productZenml";

/**
 * One signup button per sub-product — separate cloud apps (Aug 2026).
 * Callers supply the surface-specific labels; hrefs come from the canonical
 * link constants and analytics events are `${prefix}-ZenML` / `${prefix}-Kitaru`.
 */
export function productSignupCtas(
  labels: Record<ProductBrand, string>,
  analyticsPrefix: string,
): readonly BrandedCtaLink[] {
  return [
    {
      ...ZENML_LINKS.signup,
      brand: "zenml",
      label: labels.zenml,
      analytics: `${analyticsPrefix}-ZenML`,
    },
    {
      ...KITARU_LINKS.signup,
      brand: "kitaru",
      label: labels.kitaru,
      analytics: `${analyticsPrefix}-Kitaru`,
    },
  ];
}

/** Kitaru buttons get the shared `.kitaru-brand-vars` override (global.css) so they render orange. */
export function brandButtonClass(brand: ProductBrand): string | undefined {
  return brand === "kitaru" ? "kitaru-brand-vars" : undefined;
}
