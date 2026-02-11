/**
 * /book-a-demo — demo request placeholder form.
 *
 * Route: /book-a-demo
 * Renders form UI but doesn't submit. Primary CTA links to /book-your-demo.
 */

import type { SEOProps } from "./seo";
import type { PlaceholderField } from "./formTypes";
import type { CtaLink } from "./marketingPageTypes";
import { JOB_TITLE_OPTIONS } from "./formConstants";

export const BOOK_A_DEMO_SEO: SEOProps = {
  title: "Book a Demo | ZenML",
  description:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
  ogTitle: "Book a Demo",
  ogDescription:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
};

export const BOOK_A_DEMO_HERO = {
  headline: "Book a Demo",
  deck: "Fill in the form and we will contact you to schedule a personalized demo of ZenML.",
};

export const BOOK_A_DEMO_FIELDS: PlaceholderField[] = [
  { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Full name" },
  { name: "email", label: "Work Email", type: "email", required: true, placeholder: "you@company.inc" },
  {
    name: "jobTitle",
    label: "Job Title",
    type: "select",
    options: JOB_TITLE_OPTIONS,
  },
  {
    name: "privacy",
    label: "Privacy agreement",
    type: "checkbox",
    required: true,
    placeholder: 'You agree to our <a href="/privacy-policy" class="text-zenml-500 underline">privacy policy</a>.',
  },
];

export const BOOK_A_DEMO_FALLBACK_CTA: CtaLink = {
  label: "Book a Demo Now",
  href: "/book-your-demo",
};
