/**
 * Cloudflare Pages Function: form submission handler.
 *
 * Route: POST /api/forms/:formType
 *
 * For the POC, this validates input and returns success.
 * Post-launch: wire to Attio CRM + optional Brevo transactional email.
 */

interface Env {
  TURNSTILE_SECRET_KEY?: string;
}

type FormType = "demo-request" | "whitepaper" | "startup-application";

const VALID_FORM_TYPES = new Set<FormType>([
  "demo-request",
  "whitepaper",
  "startup-application",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+/;

/** Per-form required field rules (mirrors src/lib/formValidation.ts). */
const REQUIRED_FIELDS: Record<FormType, Record<string, { pattern?: RegExp; message: string }>> = {
  "demo-request": {
    fullName: { message: "Full name is required" },
    email: { pattern: EMAIL_RE, message: "Valid work email is required" },
  },
  whitepaper: {
    fullName: { message: "Full name is required" },
    email: { pattern: EMAIL_RE, message: "Valid work email is required" },
  },
  "startup-application": {
    fullName: { message: "Full name is required" },
    email: { pattern: EMAIL_RE, message: "Valid email is required" },
    linkedin: { pattern: URL_RE, message: "LinkedIn URL is required" },
    company: { message: "Organization name is required" },
    role: { message: "Please select a role" },
  },
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const formType = context.params.formType as string;

  if (!VALID_FORM_TYPES.has(formType as FormType)) {
    return jsonResponse({ success: false, error: "Unknown form type" }, 400);
  }

  // Parse FormData body
  let formData: FormData;
  try {
    formData = await context.request.formData();
  } catch {
    return jsonResponse({ success: false, error: "Invalid form data" }, 400);
  }

  // Extract fields as plain object
  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") data[key] = value;
  }

  // Validate required fields
  const rules = REQUIRED_FIELDS[formType as FormType];
  const errors: Record<string, string> = {};

  for (const [field, rule] of Object.entries(rules)) {
    const val = (data[field] ?? "").trim();
    if (!val) {
      errors[field] = rule.message;
    } else if (rule.pattern && !rule.pattern.test(val)) {
      errors[field] = rule.message;
    }
  }

  if (Object.keys(errors).length > 0) {
    return jsonResponse({ success: false, errors }, 422);
  }

  // Optional: Verify Turnstile token
  const turnstileToken = data["cf-turnstile-response"];
  const turnstileSecret = context.env.TURNSTILE_SECRET_KEY;

  if (turnstileSecret && turnstileToken) {
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      },
    );
    const result = await verifyResponse.json<{ success: boolean }>();
    if (!result.success) {
      return jsonResponse({ success: false, error: "Bot verification failed" }, 403);
    }
  }

  // Server-side privacy consent enforcement (GDPR requirement).
  // All lead forms require explicit privacy policy agreement.
  const privacyValue = (data.privacy ?? "").trim().toLowerCase();
  if (!/^(on|true|1)$/.test(privacyValue)) {
    return jsonResponse(
      { success: false, errors: { privacy: "You must agree to the privacy policy" } },
      422,
    );
  }

  // POC: Log submission metadata (no PII) and return success
  // Post-launch: Forward to Attio CRM API here
  console.log(`[form:${formType}] submission received`, {
    fields: Object.keys(data).filter((k) => !["cf-turnstile-response", "privacy"].includes(k)),
  });

  return jsonResponse({ success: true, formType });
};

// Reject non-POST methods
export const onRequestGet: PagesFunction = async () => {
  return jsonResponse({ error: "Method not allowed" }, 405);
};
