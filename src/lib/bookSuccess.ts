/**
 * /book-success — thank-you page with link to /success-calendar.
 *
 * Route: /book-success (noindex)
 */

import type { SEOProps } from "./seo";
import type { SuccessPageData } from "./formTypes";

export const BOOK_SUCCESS_SEO: SEOProps = {
  title: "Demo Booked | ZenML",
  description:
    "Thank you for booking a demo. We look forward to speaking with you soon.",
  noindex: true,
};

export const BOOK_SUCCESS_DATA: SuccessPageData = {
  headline: "Your demo is booked!",
  body: "We look forward to speaking with you soon. You'll receive a calendar invite with meeting details shortly.",
  showCheckIcon: true,
  primaryCta: { label: "Back to Home", href: "/" },
};
