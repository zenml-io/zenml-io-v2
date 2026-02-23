/**
 * Shared types for marketing page data modules.
 *
 * Used by src/lib/pricing.ts, src/lib/pro.ts, src/lib/openSourceVsPro.ts, etc.
 * Centralizes CTA, FAQ, comparison table, and other common marketing patterns.
 */

/** A call-to-action button. */
export interface CtaLink {
  label: string;
  href: string;
  external?: boolean;
}

/** A standard hero section. */
export interface HeroData {
  eyebrow?: string;
  headline: string;
  deck?: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  image?: { url: string; alt: string };
}

/** A FAQ item (question + rich HTML answer). */
export interface FaqItem {
  question: string;
  answer: string; // HTML string
}

/** Full FAQ section data. */
export interface FaqData {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  items: FaqItem[];
  slackCta?: CtaLink;
}

/** A single row in a comparison table. */
export interface ComparisonRow {
  feature: string;
  description?: string;
  icon?: string; // inline SVG string for row icon
  columns: string[]; // values per column (e.g., ["Basic", "Advanced"])
}

/** Full comparison table data. */
export interface ComparisonTableData {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  columnHeaders: string[];
  headerColors?: string[]; // Tailwind text color classes per column header
  rows: ComparisonRow[];
}

/** A feature grid item (title + body). */
export interface FeatureGridItem {
  title: string;
  body: string;
}

/** A "subway map" card (icon category + pain quote + description). */
export interface SubwayMapCard {
  title: string;
  painQuote: string;
  body: string;
}

// ---------------------------------------------------------------------------
// Pricing page types
// ---------------------------------------------------------------------------

/** A single plan card on the pricing page. */
export interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  priceSuffix?: string;
  badge?: string;
  limits: { label: string; value: string }[];
  features: string[];
  featuresPrefix?: string;
  /** Features that should show a "COMING SOON" badge next to them. */
  comingSoon?: string[];
  cta: CtaLink;
  ctaVariant?: "primary" | "secondary";
  secondaryLink?: CtaLink;
}

/** A section grouping in a pricing comparison table. */
export interface PricingCompareSection {
  heading: string;
  rows: PricingCompareRow[];
}

/** A row in a pricing comparison table (values: true=✓, false=✗, string=text). */
export interface PricingCompareRow {
  feature: string;
  link?: string;
  values: (boolean | string)[];
}

/** Full pricing comparison table. */
export interface PricingCompareTableData {
  columnHeaders: string[];
  sections: PricingCompareSection[];
  ctaButtons: CtaLink[];
}

/** A tab on the pricing page (Self-Hosted or SaaS). */
export interface PricingTab {
  label: string;
  plans: PricingPlan[];
  infoBlock?: string;
  compareTable: PricingCompareTableData;
}
