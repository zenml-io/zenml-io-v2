/**
 * /book-your-demo — primary demo booking page (Cal.com inline embed).
 *
 * Route: /book-your-demo
 * This is the P0 conversion page linked from nav, footer, and CTAs site-wide.
 */

import type { SEOProps } from "./seo";
import type { CalEmbedConfig } from "./formTypes";

export const BOOK_YOUR_DEMO_SEO: SEOProps = {
  title: "Signup for Demo",
  description:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
  ogTitle: "Signup for Demo",
  ogDescription:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
};

export const BOOK_YOUR_DEMO_HERO = {
  headline: "Book a Personalized Demo Today",
  deck: "Select a time that works for you and discover all the ZenML benefits firsthand.",
};

export const BOOK_YOUR_DEMO_CAL: CalEmbedConfig = {
  namespace: "discovery-call",
  calLink: "zenml/discovery-call",
  elementId: "my-cal-inline-discovery-call",
  layout: "month_view",
};
