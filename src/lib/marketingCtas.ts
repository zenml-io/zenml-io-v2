/**
 * Canonical Free Trial CTA constants.
 *
 * Single source of truth for the site-wide "Start Free Trial" label and signup URL.
 * Imported by page data modules (homepage.ts, pricing.ts, etc.) to avoid
 * duplicating the exact string across 20+ files.
 */
import type { CtaLink } from "./marketingPageTypes";

export const FREE_TRIAL_LABEL = "Start Free Trial" as const;
export const FREE_TRIAL_HREF = "https://cloud.zenml.io/signup" as const;

export const FREE_TRIAL_CTA: Readonly<CtaLink> = {
  label: FREE_TRIAL_LABEL,
  href: FREE_TRIAL_HREF,
};
