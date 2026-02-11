/**
 * /signup-for-demo — identical to /book-a-demo (same form, different route).
 *
 * Route: /signup-for-demo
 * Shares field definitions and fallback CTA from bookADemo module.
 */

import type { SEOProps } from "./seo";
import { BOOK_A_DEMO_FIELDS, BOOK_A_DEMO_FALLBACK_CTA } from "./bookADemo";

export const SIGNUP_FOR_DEMO_SEO: SEOProps = {
  title: "Signup for Demo | ZenML",
  description:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
  ogTitle: "Signup for Demo",
  ogDescription:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
};

export const SIGNUP_FOR_DEMO_HERO = {
  headline: "Sign Up for a Demo",
  deck: "Fill in the form and we will contact you to schedule a personalized demo of ZenML.",
};

export { BOOK_A_DEMO_FIELDS as SIGNUP_FOR_DEMO_FIELDS };
export { BOOK_A_DEMO_FALLBACK_CTA as SIGNUP_FOR_DEMO_FALLBACK_CTA };
