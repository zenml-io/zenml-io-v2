/**
 * /schedule-a-demo — Cal.com reschedule variant.
 *
 * Route: /schedule-a-demo
 * Uses the "discovery-call-reschedule" Cal.com link.
 */

import type { CalEmbedConfig } from "./formTypes";
import type { SEOProps } from "./seo";

export const SCHEDULE_A_DEMO_SEO: SEOProps = {
  title: "Schedule a Demo | ZenML Labs",
  description:
    "Bring one agent and a week of traces. Our AI engineer shows you which evals you are missing. Running pipelines too? See how ZenML orchestrates them.",
  ogTitle: "Schedule a Demo",
  ogDescription:
    "Bring one agent and a week of traces. Our AI engineer shows you which evals you are missing. Running pipelines too? See how ZenML orchestrates them.",
};

export const SCHEDULE_A_DEMO_HERO = {
  headline: "Book a Personalized Demo Today",
  deck: "Pick a time. Bring one agent and a week of traces, or the pipelines you run with ZenML, and we will walk through them with you.",
};

export const SCHEDULE_A_DEMO_CAL: CalEmbedConfig = {
  namespace: "discovery-call-reschedule",
  calLink: "zenml/discovery-call-reschedule",
  elementId: "my-cal-inline-discovery-call-reschedule",
  layout: "month_view",
};
