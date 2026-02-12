/**
 * Shared form validation rules.
 *
 * Used by both the Preact ContactForm island (client-side) and
 * the Cloudflare Pages Function (server-side).
 */

export type FormType = "demo-request" | "whitepaper" | "startup-application";

interface FieldRule {
  required?: boolean;
  pattern?: RegExp;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+/;

/** Per-form field validation rules. */
export const FORM_RULES: Record<FormType, Record<string, FieldRule>> = {
  "demo-request": {
    fullName: { required: true, message: "Full name is required" },
    email: { required: true, pattern: EMAIL_RE, message: "Valid work email is required" },
  },
  whitepaper: {
    fullName: { required: true, message: "Full name is required" },
    email: { required: true, pattern: EMAIL_RE, message: "Valid work email is required" },
  },
  "startup-application": {
    fullName: { required: true, message: "Full name is required" },
    email: { required: true, pattern: EMAIL_RE, message: "Valid email is required" },
    linkedin: { required: true, pattern: URL_RE, message: "LinkedIn URL is required" },
    company: { required: true, message: "Organization name is required" },
    role: { required: true, message: "Please select a role" },
  },
};

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/** Validate form data against rules for a given form type. */
export function validateForm(
  formType: FormType,
  data: Record<string, string>,
): ValidationResult {
  const rules = FORM_RULES[formType];
  if (!rules) return { valid: false, errors: { _form: "Unknown form type" } };

  const errors: Record<string, string> = {};

  for (const [field, rule] of Object.entries(rules)) {
    const value = (data[field] ?? "").trim();
    if (rule.required && !value) {
      errors[field] = rule.message;
    } else if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
