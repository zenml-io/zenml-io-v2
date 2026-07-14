/**
 * Shared form validation rules.
 *
 * Used by both the Preact ContactForm island (client-side) and
 * the Cloudflare Pages Function (server-side).
 */

import { JOB_TITLE_OPTIONS, STARTUP_ROLE_OPTIONS } from "./formConstants";

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
  allowedValues?: readonly string[];
  validate?: (value: string) => boolean;
  message: string;
  invalidMessage?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// biome-ignore lint/suspicious/noControlCharactersInRegex: Plain-text CRM fields must reject ASCII control characters.
const UNSAFE_PLAIN_TEXT_RE = /[<>\u0000-\u001f\u007f]/;
const JOB_TITLE_VALUES = JOB_TITLE_OPTIONS.map(({ value }) => value);
const STARTUP_ROLE_VALUES = STARTUP_ROLE_OPTIONS.map(({ value }) => value);

function isLinkedInProfileUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    const isLinkedInHost =
      hostname === "linkedin.com" ||
      hostname === "www.linkedin.com" ||
      /^[a-z]{2,3}\.linkedin\.com$/.test(hostname);
    const pathParts = url.pathname.split("/").filter(Boolean);

    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      isLinkedInHost &&
      pathParts[0] === "in" &&
      Boolean(pathParts[1])
    );
  } catch {
    return false;
  }
}

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
    jobTitle: {
      allowedValues: JOB_TITLE_VALUES,
      message: "Please select a valid job title",
    },
  },
  whitepaper: {
    fullName: FULL_NAME_RULE,
    email: {
      required: true,
      pattern: EMAIL_RE,
      message: "Valid work email is required",
    },
    company: OPTIONAL_COMPANY_RULE,
    jobTitle: {
      allowedValues: JOB_TITLE_VALUES,
      message: "Please select a valid job title",
    },
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
      maxLength: 500,
      disallowedPattern: UNSAFE_PLAIN_TEXT_RE,
      validate: isLinkedInProfileUrl,
      message: "LinkedIn URL is required",
      invalidMessage: "Valid LinkedIn profile URL is required",
    },
    company: {
      ...OPTIONAL_COMPANY_RULE,
      required: true,
      message: "Organization name is required",
    },
    role: {
      required: true,
      allowedValues: STARTUP_ROLE_VALUES,
      message: "Please select a role",
      invalidMessage: "Please select a valid role",
    },
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
    } else if (
      value &&
      ((rule.allowedValues && !rule.allowedValues.includes(value)) ||
        (rule.validate && !rule.validate(value)))
    ) {
      errors[field] = rule.invalidMessage ?? rule.message;
    } else if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
