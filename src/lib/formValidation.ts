/**
 * Shared form validation rules.
 *
 * Used by both the Preact ContactForm island (client-side) and
 * the Cloudflare Pages Function (server-side).
 */

export type FormType =
  | "demo-request"
  | "whitepaper"
  | "brick-manual"
  | "startup-academic";

interface FieldRule {
  required?: boolean;
  pattern?: RegExp;
  maxLength?: number;
  disallowedPattern?: RegExp;
  message: string;
  invalidMessage?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+/;
// biome-ignore lint/suspicious/noControlCharactersInRegex: Plain-text CRM fields must reject ASCII control characters.
const UNSAFE_PLAIN_TEXT_RE = /[<>\u0000-\u001f\u007f]/;

const FULL_NAME_RULE: FieldRule = {
  required: true,
  maxLength: 100,
  disallowedPattern: UNSAFE_PLAIN_TEXT_RE,
  message: "Full name is required",
  invalidMessage:
    "Full name must be 100 characters or fewer and cannot contain HTML or line breaks",
};

const OPTIONAL_COMPANY_RULE: FieldRule = {
  maxLength: 200,
  disallowedPattern: UNSAFE_PLAIN_TEXT_RE,
  message: "Company or organization name is invalid",
  invalidMessage:
    "Company or organization name must be 200 characters or fewer and cannot contain HTML or line breaks",
};

/** Per-form field validation rules. */
export const FORM_RULES: Record<FormType, Record<string, FieldRule>> = {
  "demo-request": {
    fullName: FULL_NAME_RULE,
    email: {
      required: true,
      pattern: EMAIL_RE,
      message: "Valid work email is required",
    },
    company: OPTIONAL_COMPANY_RULE,
  },
  whitepaper: {
    fullName: FULL_NAME_RULE,
    email: {
      required: true,
      pattern: EMAIL_RE,
      message: "Valid work email is required",
    },
    company: OPTIONAL_COMPANY_RULE,
  },
  "brick-manual": {
    fullName: FULL_NAME_RULE,
    email: {
      required: true,
      pattern: EMAIL_RE,
      message: "Valid email is required",
    },
  },
  "startup-academic": {
    fullName: FULL_NAME_RULE,
    email: {
      required: true,
      pattern: EMAIL_RE,
      message: "Valid email is required",
    },
    linkedin: {
      required: true,
      pattern: URL_RE,
      message: "LinkedIn URL is required",
    },
    company: {
      ...OPTIONAL_COMPANY_RULE,
      required: true,
      message: "Organization name is required",
    },
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
    const rawValue = data[field] ?? "";
    const value = rawValue.trim();
    if (rule.required && !value) {
      errors[field] = rule.message;
    } else if (
      value &&
      ((rule.maxLength !== undefined && rawValue.length > rule.maxLength) ||
        rule.disallowedPattern?.test(rawValue))
    ) {
      errors[field] = rule.invalidMessage ?? rule.message;
    } else if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
