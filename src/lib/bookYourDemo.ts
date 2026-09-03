/**
 * /book-your-demo — primary demo booking page with two-column layout.
 *
 * Route: /book-your-demo
 * This is the P0 conversion page linked from nav, footer, and CTAs site-wide.
 * Left column: marketing copy + stats + customer logos.
 * Right column: ContactForm (demo-request) + privacy note.
 * Below: testimonial + minimal footer.
 */

import { R2_WEBFLOW_BASE } from "./constants";
import type { CalEmbedConfig, PlaceholderField } from "./formTypes";
import type { SEOProps } from "./seo";

const R2 = R2_WEBFLOW_BASE;

export const BOOK_YOUR_DEMO_SEO: SEOProps = {
  title: "Signup for Demo",
  description:
    "Schedule a live demo and see how ZenML orchestrates your AI workflows and Kitaru diagnoses your agents.",
  ogTitle: "Signup for Demo",
  ogDescription:
    "Schedule a live demo and see how ZenML orchestrates your AI workflows and Kitaru diagnoses your agents.",
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
  {
    value: "78%",
    label: "Faster time-to-market for models and agents in production",
  },
  {
    value: "65%",
    label: "Reduced engineering overhead on orchestration infrastructure",
  },
  {
    value: "3x",
    label: "More workflows running in production environments",
  },
  { value: "1,000+", label: "ML and AI teams trust ZenML worldwide" },
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
  /** Heading shown after form submits and calendar appears. Keep in sync with the inline script in book-your-demo.astro. */
  calHeadline: "Pick a time that works for you",
  calDeck: "Select a 30-minute slot for your personalized walkthrough.",
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
    name: "company",
    label: "Company or Project Name",
    type: "text",
    required: true,
    placeholder: "Company / Project",
  },
  {
    name: "privacy",
    label: "Privacy agreement",
    type: "checkbox",
    required: true,
    placeholder:
      'You agree to our <a href="/privacy-policy" class="text-zenml-500 underline">privacy policy</a>.',
  },
];

// ---------------------------------------------------------------------------
// Cal.com embed (shown inline after form submission)
// ---------------------------------------------------------------------------

export const BOOK_YOUR_DEMO_CAL: CalEmbedConfig = {
  namespace: "discovery-call",
  calLink: "zenml/discovery-call",
  elementId: "cal-inline-book-your-demo",
  layout: "month_view",
};

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

// ---------------------------------------------------------------------------
// Kitaru co-brand variant — /book-your-demo/kitaru
// ---------------------------------------------------------------------------
// Reached from the Kitaru landing CTAs (/product/kitaru). Reuses the same
// form, fields, Cal.com link, customer logos, and testimonial as the ZenML
// page; only the hero copy, SEO, and co-brand credibility line differ. The
// orange brand colour is handled in BookingExperience.astro, not here.

export const BOOK_KITARU_DEMO_SEO: SEOProps = {
  title: "Book a Kitaru demo",
  description:
    "See Kitaru in action — the open-source durable runtime for Python agents. Record every step, replay with overrides, and ship updates with confidence. 30 minutes with the ZenML team.",
  // ogTitle / ogDescription intentionally omitted — resolveSeo() falls back to title / description.
};

export const BOOK_KITARU_DEMO_HERO = {
  headlinePrefix: "See ",
  headlineHighlight: "Kitaru",
  headlineSuffix: " in action",
  deck: "Get a personalized walkthrough of Kitaru: record, replay, and improve your Python agents with durable checkpoints, wait/resume, and versioned deployments on your own cloud. 30 minutes with our team.",
};

/** Co-brand credibility line shown above the customer logos on the Kitaru page. */
export const BOOK_KITARU_DEMO_PROOF =
  "Built by the ZenML team, trusted by 1,000+ teams running AI workflows and agents in production.";
