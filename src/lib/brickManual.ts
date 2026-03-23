/**
 * /brick-manual — conference brick set build instructions (email-gated PDF).
 *
 * Route: /brick-manual
 * Flow: email capture → Segment lead → immediate PDF download link.
 */

import type { SEOProps } from "./seo";
import type { PlaceholderField } from "./formTypes";

export const BRICK_MANUAL_SEO: SEOProps = {
  title: "Get Your Build Instructions | ZenML",
  description:
    "Unlock the ZenML brick set build instructions — enter your email and download the PDF instantly.",
  ogTitle: "ZenML Brick Build Instructions",
  ogDescription:
    "Unlock the ZenML brick set build instructions — enter your email and download the PDF instantly.",
};

export const BRICK_MANUAL_HERO = {
  headline: "Get Your Build Instructions",
  deck: "You picked up a ZenML brick set — enter your email below to unlock the build instructions PDF.",
};

export const BRICK_MANUAL_FIELDS: PlaceholderField[] = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    required: true,
    placeholder: "Full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "you@company.com",
  },
  {
    name: "privacy",
    label: "Privacy agreement",
    type: "checkbox",
    required: true,
    placeholder:
      'I agree to the <a href="/privacy-policy" class="text-zenml-500 underline">privacy policy</a>.',
  },
];

export const BRICK_MANUAL_DOWNLOAD_URL =
  "https://assets.zenml.io/content/uploads/34ef391d/zenml-brick-instructions.pdf";
