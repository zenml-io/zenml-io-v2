/**
 * /success-calendar — post-form-submission thank-you + Cal.com embed.
 *
 * Route: /success-calendar
 * noindex: true (success page, not a landing page)
 */

import type { SEOProps } from "./seo";
import type { CalEmbedConfig } from "./formTypes";

export const SUCCESS_CALENDAR_SEO: SEOProps = {
  title: "Success - Request a Call | ZenML",
  description:
    "Thank you for your request. Select a time slot to book your personalized ZenML demo.",
  noindex: true,
};

export const SUCCESS_CALENDAR_HERO = {
  headline: "Thank you! Now book your time slot here",
  deck: "We successfully received your request. Now you can select a time that suits you for the demo.",
};

export const SUCCESS_CALENDAR_CAL: CalEmbedConfig = {
  namespace: "discovery-call",
  calLink: "zenml/discovery-call",
  elementId: "my-cal-inline-success-calendar",
  layout: "month_view",
};
