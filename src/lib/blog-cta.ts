/**
 * Copy for the /blog index's closing band (`BlogNewsletterCta.astro`): a
 * ZenML signup pill on the left, the newsletter signup card on the right.
 * Written in ZenML voice (ZenML tier, developers audience, landing-page
 * below-the-fold medium) for readers who just browsed the blog.
 *
 * `submitLabel` is read from BREVO_MAIN_CONFIG, never retyped — the Brevo
 * form contract (action, formId, labels) lives there.
 */
import { BREVO_MAIN_CONFIG } from "./formConstants";
import type { LabsCta } from "./labs-home";
import { ZENML_LINKS } from "./productZenml";

export interface BlogCtaNewsletterContent {
  title: string;
  deck: string;
  placeholder: string;
  /** Rendered with set:html — the only helper text this card carries, because consent needs it. */
  consentHtml: string;
  submitLabel: string;
}

export interface BlogCtaContent {
  /** Two lines, break kept deliberate — same contract as LabsBandContent. */
  headlineLines: readonly [string, string];
  cta: LabsCta;
  newsletter: BlogCtaNewsletterContent;
}

export const BLOG_CTA: BlogCtaContent = {
  headlineLines: ["AI orchestration,", "on the infra you choose"],
  cta: {
    label: "Start free",
    href: ZENML_LINKS.signup.href,
    analytics: "Blog-Close-Signup-ZenML",
  },
  newsletter: {
    title: "Get new posts by email",
    deck: "New posts and product updates, sent when we publish. No spam.",
    placeholder: "you@company.com",
    consentHtml:
      'By subscribing, you agree to our <a href="/privacy-policy" class="underline hover:text-(--color-cream-50)">privacy policy</a>.',
    submitLabel: BREVO_MAIN_CONFIG.submitLabel,
  },
};
