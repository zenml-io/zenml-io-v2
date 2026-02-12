/**
 * Shared types for form / conversion pages.
 *
 * Used by CalEmbed, BrevoNewsletterForm, FormPlaceholder,
 * SuccessPanel, and all data modules in src/lib/.
 */

import type { CtaLink } from "./marketingPageTypes";

/** Cal.com inline embed configuration. */
export interface CalEmbedConfig {
  /** Cal.com namespace — e.g. "discovery-call" */
  namespace: string;
  /** Calendar link — e.g. "zenml/discovery-call" */
  calLink: string;
  /** DOM element id for the embed target */
  elementId: string;
  /** Layout style — defaults to "month_view" */
  layout?: "month_view";
}

/** Brevo (Sendinblue) newsletter form configuration. */
export interface BrevoFormConfig {
  /** sibforms.com POST URL */
  action: string;
  /** Brevo form ID (used for scoped DOM queries) */
  formId: string;
  /** Submit button label */
  submitLabel: string;
  /** Loading-state button label */
  loadingLabel: string;
}

/** A field definition for placeholder (disabled) forms. */
export interface PlaceholderField {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "select" | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

/** Configuration for the ContactForm Preact island. */
export interface ContactFormConfig {
  formType: "demo-request" | "whitepaper" | "startup-application";
  endpoint: string;
  fields: PlaceholderField[];
  submitLabel: string;
  loadingLabel: string;
  successMessage: string;
  successCta?: CtaLink;
  /** URL to reveal on whitepaper form success (PDF download) */
  successDownloadUrl?: string;
}

/** Data for the SuccessPanel component. */
export interface SuccessPageData {
  headline: string;
  body?: string;
  showCheckIcon?: boolean;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
}
