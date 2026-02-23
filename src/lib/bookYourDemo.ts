/**
 * /book-your-demo — primary demo booking page with two-column layout.
 *
 * Route: /book-your-demo
 * This is the P0 conversion page linked from nav, footer, and CTAs site-wide.
 * Left column: marketing copy + stats + customer logos.
 * Right column: ContactForm (demo-request) + privacy note.
 * Below: testimonial + minimal footer.
 */

import type { SEOProps } from "./seo";
import type { PlaceholderField } from "./formTypes";

const R2 =
  "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30";

export const BOOK_YOUR_DEMO_SEO: SEOProps = {
  title: "Signup for Demo",
  description:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
  ogTitle: "Signup for Demo",
  ogDescription:
    "Schedule a Live Demo to Unlock the True Potential of Your MLOps Journey and Supercharge Your Machine Learning Projects.",
};

// ---------------------------------------------------------------------------
// Left column — hero, stats, logos
// ---------------------------------------------------------------------------

export const BOOK_YOUR_DEMO_HERO = {
  headlinePrefix: "See the ",
  headlineHighlight: "AI Control Plane",
  headlineSuffix: " in action",
  deck: "Get a personalized walkthrough of ZenML: from pipelines to agents, local to Kubernetes. 30 minutes with our team.",
};

export const BOOK_YOUR_DEMO_STATS = [
  { value: "78%", label: "Faster time-to-market for ML models in production" },
  {
    value: "65%",
    label: "Reduced engineering overhead on MLOps infrastructure",
  },
  {
    value: "3x",
    label: "More workflows running in production environments",
  },
  { value: "1,000+", label: "ML teams trust ZenML worldwide" },
];

export const BOOK_YOUR_DEMO_LOGOS = [
  {
    name: "Airbus",
    src: `${R2}/6a2ae7e3/670e2f23d254a9be9e02e50f_airbus.svg`,
  },
  { name: "Brevo", src: "/images/logos/brevo.webp" },
  {
    name: "AXA",
    src: `${R2}/5f1b0e8a/670e2f23b0b89bea22ecee3c_axa-min.svg`,
  },
  {
    name: "Enel",
    src: `${R2}/4f6e5fe1/670e2f2349aab64d5e4eeeb3_enel-min.svg`,
  },
  {
    name: "Leroy Merlin",
    src: `${R2}/d28fbdf4/670e2f23e2b3ba3756fae38e_leroy_merlin_logo-min.svg`,
  },
];

// ---------------------------------------------------------------------------
// Right column — form
// ---------------------------------------------------------------------------

export const BOOK_YOUR_DEMO_FORM = {
  headline: "Book your demo",
  deck: "We'll follow up within 1 business day.",
};

export const BOOK_YOUR_DEMO_FIELDS: PlaceholderField[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Full name",
  },
  {
    name: "email",
    label: "Work Email",
    type: "email",
    required: true,
    placeholder: "you@company.inc",
  },
  {
    name: "companyProject",
    label: "Company or Project Name",
    type: "text",
    required: true,
    placeholder: "Company / Project",
  },
  {
    name: "users",
    label: "How many users are you planning to onboard to ZenML in the next 6 months?",
    type: "text",
    required: true,
    placeholder: "Users",
  },
];

// ---------------------------------------------------------------------------
// Testimonial
// ---------------------------------------------------------------------------

export const BOOK_YOUR_DEMO_TESTIMONIAL = {
  quote:
    "\u201cZenML enables teams to accelerate their time to market by bridging the gap between data scientists and engineers, while ensuring consistent implementation regardless of the underlying technology\u201d.",
  name: "Harold Gim\u00e9nez",
  position: "SPV R&D at HashiCorp",
  avatar: `${R2}/31a5f8ee/653297b0b924af52998661bf_harold.webp`,
};
