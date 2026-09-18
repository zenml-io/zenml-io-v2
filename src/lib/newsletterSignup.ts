/**
 * /newsletter-signup — dedicated newsletter subscription page.
 *
 * Route: /newsletter-signup
 * Single centred column: headline + Brevo form, no illustration.
 */

import type { SEOProps } from "./seo";

export const NEWSLETTER_SIGNUP_SEO: SEOProps = {
  title: "Join the ZenML Newsletter: Exclusive MLOps Insights & Updates",
  description:
    "Subscribe to receive cutting-edge MLOps insights and the latest ZenML updates straight to your inbox. Stay ahead with exclusive content, news, and industry trends tailored for machine learning professionals.",
  ogTitle: "Join the ZenML Newsletter: Exclusive MLOps Insights & Updates",
  ogDescription:
    "Subscribe to receive cutting-edge MLOps insights and the latest ZenML updates straight to your inbox. Stay ahead with exclusive content, news, and industry trends tailored for machine learning professionals.",
};

export const NEWSLETTER_SIGNUP_CONTENT = {
  headline: "Get the most out of MLOps & LLMOps",
  body: "Subscribe to the ZenML newsletter and receive regular product updates, tutorials, examples, and more",
  privacyHtml:
    'We care about your data in our <a href="/privacy-policy" class="text-(--color-sage-800) underline">privacy policy</a>.',
};
