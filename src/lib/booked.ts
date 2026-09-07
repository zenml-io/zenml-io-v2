/**
 * /booked — thank-you page after Cal.com booking completes.
 *
 * Route: /booked (noindex)
 */

import type { SuccessPageData } from "./formTypes";
import type { SEOProps } from "./seo";

export const BOOKED_SEO: SEOProps = {
  title: "Thank you for booking a demo!",
  description:
    "Thank you for scheduling a live demo. We'll show you how ZenML orchestrates your AI workflows and Kitaru diagnoses your agents.",
  noindex: true,
};

export const BOOKED_DATA: SuccessPageData = {
  headline: "Thank you for booking!",
  body: "You successfully booked a demo. We look forward to speaking with you soon!",
  showCheckIcon: true,
  primaryCta: { label: "Back to Home", href: "/" },
};
