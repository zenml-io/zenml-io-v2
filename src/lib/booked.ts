/**
 * /booked — thank-you page after Cal.com booking completes.
 *
 * Route: /booked (noindex)
 */

import type { SEOProps } from "./seo";
import type { SuccessPageData } from "./formTypes";

export const BOOKED_SEO: SEOProps = {
  title: "Thank you for booking a demo!",
  description:
    "Thank you for Scheduling a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
  noindex: true,
};

export const BOOKED_DATA: SuccessPageData = {
  headline: "Thank you for booking!",
  body: "You successfully booked a demo. We look forward to speaking with you soon!",
  showCheckIcon: true,
  primaryCta: { label: "Back to Home", href: "/" },
};
