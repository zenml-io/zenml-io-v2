/**
 * /schedule-a-demo — Cal.com reschedule variant.
 *
 * Route: /schedule-a-demo
 * Uses the "discovery-call-reschedule" Cal.com link.
 */

import type { CalEmbedConfig } from "./formTypes";
import type { SEOProps } from "./seo";

export const SCHEDULE_A_DEMO_SEO: SEOProps = {
  title: "Schedule a Demo | ZenML",
  description:
    "Schedule a live demo and see how ZenML orchestrates your AI workflows and Kitaru diagnoses your agents.",
  ogTitle: "Schedule a Demo",
  ogDescription:
    "Schedule a live demo and see how ZenML orchestrates your AI workflows and Kitaru diagnoses your agents.",
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
