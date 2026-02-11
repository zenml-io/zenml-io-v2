/**
 * /book-a-demo-success — thank-you page with Cal.com embed.
 *
 * Route: /book-a-demo-success (noindex)
 * Similar to /success-calendar: shows thank-you copy + Cal.com widget.
 */

import type { SEOProps } from "./seo";
import type { CalEmbedConfig } from "./formTypes";

export const BOOK_A_DEMO_SUCCESS_SEO: SEOProps = {
  title: "Book a Demo Success | ZenML",
  description:
    "Thank you for your request. Select a time slot to book your personalized ZenML demo.",
  noindex: true,
};

export const BOOK_A_DEMO_SUCCESS_HERO = {
  headline: "Thank you! Now book your time slot here",
  deck: "We successfully received your request. Now you can select a time that suits you for the demo.",
};

export const BOOK_A_DEMO_SUCCESS_CAL: CalEmbedConfig = {
  namespace: "discovery-call",
  calLink: "zenml/discovery-call",
  elementId: "my-cal-inline-book-a-demo-success",
  layout: "month_view",
};
