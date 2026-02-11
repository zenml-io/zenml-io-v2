/**
 * /schedule-a-demo — Cal.com reschedule variant.
 *
 * Route: /schedule-a-demo
 * Uses the "discovery-call-reschedule" Cal.com link.
 */

import type { SEOProps } from "./seo";
import type { CalEmbedConfig } from "./formTypes";

export const SCHEDULE_A_DEMO_SEO: SEOProps = {
  title: "Schedule a Demo | ZenML",
  description:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
  ogTitle: "Schedule a Demo",
  ogDescription:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
};

export const SCHEDULE_A_DEMO_HERO = {
  headline: "Book a Personalized Demo Today",
  deck: "Select a time that works for you and discover all the ZenML benefits firsthand.",
};

export const SCHEDULE_A_DEMO_CAL: CalEmbedConfig = {
  namespace: "discovery-call-reschedule",
  calLink: "zenml/discovery-call-reschedule",
  elementId: "my-cal-inline-discovery-call-reschedule",
  layout: "month_view",
};
