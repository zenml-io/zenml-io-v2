/**
 * /book-success — thank-you page with link to /success-calendar.
 *
 * Route: /book-success (noindex)
 */

import type { SEOProps } from "./seo";
import type { SuccessPageData } from "./formTypes";

export const BOOK_SUCCESS_SEO: SEOProps = {
  title: "Demo Request Received | ZenML",
  description:
    "Thank you for your demo request. Select a calendar slot to book your personalized ZenML demo.",
  noindex: true,
};

export const BOOK_SUCCESS_DATA: SuccessPageData = {
  headline: "Thank you!",
  body: 'We successfully received your request.<br>We will contact you as soon as possible to set a 30-minute intro call.<br>You can also <a href="/success-calendar" class="text-zenml-500 underline">select a calendar slot right now</a>.',
  showCheckIcon: true,
  primaryCta: { label: "Book a Time Slot", href: "/success-calendar" },
  secondaryCta: { label: "Back to Home", href: "/" },
};
