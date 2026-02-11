/**
 * /startups-and-academics — application form for startup/academic program.
 *
 * Route: /startups-and-academics
 * Unique field set (LinkedIn, org, role dropdown).
 */

import type { SEOProps } from "./seo";
import type { PlaceholderField } from "./formTypes";
import type { CtaLink } from "./marketingPageTypes";
import { STARTUP_ROLE_OPTIONS } from "./formConstants";

export const STARTUPS_SEO: SEOProps = {
  title: "ZenML for Startups and Academics",
  description:
    "Apply to join ZenML's startup and academic program for Pro access, expert guidance, and a network of innovative startups and researchers.",
  ogTitle: "ZenML for Startups and Academics",
  ogDescription:
    "Apply to join ZenML's startup and academic program for Pro access, expert guidance, and a network of innovative startups and researchers.",
};

export const STARTUPS_HERO = {
  eyebrow: "ZenML for Startups and Academics",
  headline: "Empowering Startups and Researchers in MLOps",
  deck: "Apply to join our program for ZenML Pro access, expert guidance, and a network of innovative startups and researchers.",
};

export const STARTUPS_FIELDS: PlaceholderField[] = [
  { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Full name" },
  {
    name: "email",
    label: "Company / Organization Email",
    type: "email",
    required: true,
    placeholder: "you@organization.edu",
  },
  {
    name: "linkedin",
    label: "LinkedIn Profile",
    type: "url",
    required: true,
    placeholder: "https://linkedin.com/in/…",
  },
  {
    name: "company",
    label: "Company / Organization",
    type: "text",
    required: true,
    placeholder: "Organization name",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: STARTUP_ROLE_OPTIONS,
  },
  {
    name: "privacy",
    label: "Privacy agreement",
    type: "checkbox",
    required: true,
    placeholder:
      'By sending this form you agree to our <a href="/privacy-policy" class="text-zenml-500 underline">privacy policy</a>.',
  },
];

export const STARTUPS_FALLBACK_CTA: CtaLink = {
  label: "Apply",
  href: "/book-your-demo",
};
