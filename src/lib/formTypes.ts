/**
 * Shared types for form / conversion pages.
 *
 * Used by CalEmbed, BrevoNewsletterForm, FormPlaceholder,
 * ConversionShell's `success` frame, and all data modules in src/lib/.
 */

import type { LabsCta } from "./labs-home";
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
  /** Brevo form ID (used to create unique input IDs) */
  formId: string;
  /** Submit button label */
  submitLabel: string;
}

interface PlaceholderFieldBase {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}

/**
 * A field definition for placeholder (disabled) forms. A select always
 * carries its options, so it can never fall through to `<input type="select">`.
 */
export type PlaceholderField =
  | (PlaceholderFieldBase & {
      type: "select";
      options: { value: string; label: string }[];
    })
  | (PlaceholderFieldBase & {
      type: "text" | "email" | "url" | "checkbox";
      options?: never;
    });

/** Configuration for the ContactForm Preact island. */
export interface ContactFormConfig {
  formType: "demo-request" | "whitepaper" | "brick-manual" | "startup-academic";
  endpoint: string;
  fields: PlaceholderField[];
  submitLabel: string;
  loadingLabel: string;
  successMessage: string;
  successCta?: CtaLink;
  /** URL to reveal on form success (PDF download) */
  successDownloadUrl?: string;
  /** Label for the download button (defaults to "Download Whitepaper") */
  successDownloadLabel?: string;
}

/** Data for the ConversionShell `success` frame. */
export interface SuccessPageData {
  headline: string;
  body?: string;
  primaryCta?: LabsCta;
  secondaryCta?: LabsCta;
}
