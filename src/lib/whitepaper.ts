/**
 * /whitepaper-architecting-an-enterprise-grade-mlops-platform
 * — gated content landing page.
 *
 * Route: /whitepaper-architecting-an-enterprise-grade-mlops-platform
 * Two-column: left = marketing copy + image, right = form placeholder.
 */

import type { SEOProps } from "./seo";
import type { PlaceholderField } from "./formTypes";
import type { CtaLink } from "./marketingPageTypes";
import { JOB_TITLE_OPTIONS } from "./formConstants";

export const WHITEPAPER_SEO: SEOProps = {
  title: "Architecting an Enterprise-Grade MLOps Platform | ZenML Whitepaper",
  description:
    "Download our comprehensive guide to building enterprise MLOps platforms. Learn architecture patterns, best practices, and strategies for scaling ML infrastructure.",
  ogTitle: "Architecting an Enterprise-Grade MLOps Platform",
  ogDescription:
    "Download our comprehensive guide to building enterprise MLOps platforms. Learn architecture patterns, best practices, and strategies for scaling ML infrastructure.",
};

export const WHITEPAPER_CONTENT = {
  headline: "Architecting an Enterprise-Grade MLOps Platform",
  subheadline: "Is your ML platform more of a headache than a helper?",
  body: `Let's be honest, many are. It slows down iterations, hinders deployment, and ultimately costs you your competitive edge. This whitepaper provides a blueprint for building an enterprise-grade MLOps platform that <em>actually</em> works:<br><br><strong>Eliminate the Firefighting:</strong> Learn how to free your data scientists from infrastructure struggles so they can focus on innovation.<br><br><strong>Achieve a Unified Control Plane:</strong> Get complete visibility and management of your entire ML lifecycle, from experimentation to deployment.<br><br><strong>Build a Seamless, Integrated Ecosystem:</strong> Discover how to move beyond individual tools and create a platform that truly empowers your team.`,
  image: {
    url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/ac6a7d69/677e159006becfde35062714_Whitepaper MLOps Platform.pdf",
    previewUrl:
      "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/640aaaba/677dca3d6a4a17a9f9e3ec41_whitepaper00.png",
    alt: "Pages from the ZenML Whitepaper stacked one over another",
  },
  formHeadline: "Get the Whitepaper",
};

export const WHITEPAPER_FIELDS: PlaceholderField[] = [
  { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Full name" },
  { name: "email", label: "Work Email", type: "email", required: true, placeholder: "you@company.inc" },
  {
    name: "jobTitle",
    label: "Job Title (optional)",
    type: "select",
    options: JOB_TITLE_OPTIONS,
  },
  { name: "company", label: "Company (optional)", type: "text", placeholder: "Company" },
  {
    name: "privacy",
    label: "Privacy agreement",
    type: "checkbox",
    required: true,
    placeholder: 'You agree to our <a href="/privacy-policy" class="text-zenml-500 underline">privacy policy</a>.',
  },
];

export const WHITEPAPER_FALLBACK_CTA: CtaLink = {
  label: "Send Request",
  href: "/book-your-demo",
};
