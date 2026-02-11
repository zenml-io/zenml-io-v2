/**
 * /newsletter-success — post-subscription confirmation page.
 *
 * Route: /newsletter-success (noindex)
 */

import type { SEOProps } from "./seo";
import type { SuccessPageData } from "./formTypes";

export const NEWSLETTER_SUCCESS_SEO: SEOProps = {
  title: "ZenML - You've successfully subscribed to our newsletter",
  description:
    "Thank you for subscribing to the ZenML newsletter! You'll receive the latest MLOps insights, product updates, and technical guides directly in your inbox.",
  noindex: true,
};

export const NEWSLETTER_SUCCESS_DATA: SuccessPageData = {
  headline: "You're subscribed!",
  body: "Your subscription is confirmed.<br>Expect updates on releases, platform improvements, and practical insights from real production systems.",
  showCheckIcon: true,
  primaryCta: { label: "Back to Home", href: "/" },
  secondaryCta: { label: "Read the Blog", href: "/blog" },
};
