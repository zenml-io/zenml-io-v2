/**
 * /signup-for-demo — identical to /book-a-demo (same form, different route).
 *
 * Route: /signup-for-demo
 * Shares field definitions and fallback CTA from bookADemo module.
 */

import { BOOK_A_DEMO_FALLBACK_CTA, BOOK_A_DEMO_FIELDS } from "./bookADemo";
import type { SEOProps } from "./seo";

export const SIGNUP_FOR_DEMO_SEO: SEOProps = {
  title: "Signup for Demo | ZenML",
  description:
    "Schedule a live demo and see how ZenML orchestrates your AI workflows and Kitaru diagnoses your agents.",
  ogTitle: "Signup for Demo",
  ogDescription:
    "Schedule a live demo and see how ZenML orchestrates your AI workflows and Kitaru diagnoses your agents.",
};

export const SIGNUP_FOR_DEMO_HERO = {
  headline: "Sign Up for a Demo",
  deck: "Fill in the form and we will contact you to schedule a personalized demo of ZenML.",
};

export {
  BOOK_A_DEMO_FALLBACK_CTA as SIGNUP_FOR_DEMO_FALLBACK_CTA,
  BOOK_A_DEMO_FIELDS as SIGNUP_FOR_DEMO_FIELDS,
};
