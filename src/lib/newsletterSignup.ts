/**
 * /newsletter-signup — dedicated newsletter subscription page.
 *
 * Route: /newsletter-signup
 * Two-column layout: left = headline + Brevo form, right = illustration.
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
    'We care about your data in our <a href="/privacy-policy" class="text-zenml-500 underline">privacy policy</a>.',
  image: {
    url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/24ca24f7/65df440a6d555dbf511d93be_hero_process-min.png",
    alt: "ZenML MLOps workflow illustration",
  },
};
