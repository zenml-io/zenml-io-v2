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
  /** Plausible event name — rendered as data-analytics attribute for click tracking. */
  analytics?: string;
  /** Button style when rendered as a button (defaults to "primary"). */
  variant?: "primary" | "secondary";
}

export type ProductBrand = "zenml" | "kitaru";

/** A CTA tied to one sub-product; `brand` selects the button colour. */
export interface BrandedCtaLink extends CtaLink {
  brand: ProductBrand;
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
  /** Stable identifier (also used for analytics + DOM ids). */
  id: string;
  /** Uppercase plan name shown as the card eyebrow. */
  eyebrow: string;
  /** Neutral deployment badge beside the eyebrow ("Self-hosted" / "SaaS" / …). */
  pill?: string;
  /** Emphasized badge above the card ("Recommended"). */
  topBadge?: string;
  subtitle: string;
  price: string;
  priceSuffix?: string;
  /** Static limits sentence. */
  limitsLine: string;
  /** Label above the feature list ("Includes" / "Everything in Open Source, plus"). */
  includesLabel: string;
  /** Feature bullet list. */
  features: string[];
  cta: CtaLink;
  ctaVariant?: "primary" | "secondary";
  /** Visually emphasized card (brand border + tint + shadow). */
  highlighted?: boolean;
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
  /** Section heading above the table. */
  heading: string;
  /** Optional sub-line under the heading. */
  subheading?: string;
  columnHeaders: string[];
  sections: PricingCompareSection[];
  ctaButtons: CtaLink[];
}
