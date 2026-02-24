/**
 * Astro API route: form submission handler.
 *
 * Route: POST /api/forms/:formType
 *
 * Validates input, sends identify + track calls to Segment's HTTP API
 * (fire-and-forget via waitUntil), and returns success to the user.
 * Segment routes form data to CRM destinations (Attio, Apollo).
 */
import type { APIContext } from "astro";
import type { Runtime } from "@astrojs/cloudflare";

export const prerender = false;

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

/** Fields excluded from the Segment track payload (sensitive or irrelevant for CRM). */
const EXCLUDED_FIELDS = new Set(["cf-turnstile-response", "privacy"]);

/** Per-form trait fields sent in the identify call. */
const IDENTIFY_TRAITS: Record<FormType, string[]> = {
  "demo-request": ["fullName", "email"],
  whitepaper: ["fullName", "email"],
  "startup-application": ["fullName", "email", "company"],
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Send a single call to Segment's HTTP Tracking API. */
async function segmentCall(
  endpoint: "identify" | "track",
  writeKey: string,
  body: Record<string, unknown>,
): Promise<void> {
  const resp = await fetch(`https://api.segment.io/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(writeKey + ":")}`,
    },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const text = await resp.text();
    console.error(`[segment:${endpoint}] ${resp.status}: ${text}`);
  }
}

export async function POST(context: APIContext): Promise<Response> {
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

  // Access Cloudflare runtime for env vars and waitUntil
  const runtime = (context.locals as Runtime).runtime;
  const env = runtime.env as Record<string, string | undefined>;

  // Verify Turnstile token (required when secret key is configured)
  const turnstileToken = data["cf-turnstile-response"];
  const turnstileSecret = env.TURNSTILE_SECRET_KEY;

  if (turnstileSecret) {
    if (!turnstileToken) {
      return jsonResponse({ success: false, error: "Bot verification is required" }, 403);
    }
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
    const result = (await verifyResponse.json()) as { success: boolean };
    if (!result.success) {
      return jsonResponse({ success: false, error: "Bot verification failed. Please try again." }, 403);
    }
  }

  // Server-side privacy consent enforcement (GDPR requirement).
  const privacyValue = (data.privacy ?? "").trim().toLowerCase();
  if (!/^(on|true|1)$/.test(privacyValue)) {
    return jsonResponse(
      { success: false, errors: { privacy: "You must agree to the privacy policy" } },
      422,
    );
  }

  // Log submission metadata (no PII)
  console.log(`[form:${formType}] submission received`, {
    fields: Object.keys(data).filter((k) => !EXCLUDED_FIELDS.has(k)),
  });

  // Send identify + track to Segment (fire-and-forget — don't block user response)
  const segmentKey = env.SEGMENT_FORMS_WRITE_KEY;
  if (segmentKey) {
    const email = data.email.trim();
    const referer = context.request.headers.get("referer") ?? "";
    const userAgent = context.request.headers.get("user-agent") ?? "";
    const segmentContext = { page: { url: referer }, userAgent };

    // Build traits for identify (name, email, company where available)
    const traitFields = IDENTIFY_TRAITS[formType as FormType] ?? [];
    const traits: Record<string, string> = {};
    for (const field of traitFields) {
      const val = (data[field] ?? "").trim();
      if (val) traits[field === "fullName" ? "name" : field] = val;
    }

    // Build properties for track (all validated fields minus excluded ones)
    const properties: Record<string, string> = { formType };
    for (const [key, val] of Object.entries(data)) {
      if (!EXCLUDED_FIELDS.has(key)) properties[key] = val;
    }

    const identifyCall = segmentCall("identify", segmentKey, {
      userId: email,
      traits,
      context: segmentContext,
    });
    const trackCall = segmentCall("track", segmentKey, {
      userId: email,
      event: "Form Submitted",
      properties,
      context: segmentContext,
    });

    runtime.ctx.waitUntil(Promise.all([identifyCall, trackCall]));
  }

  return jsonResponse({ success: true, formType });
}

export function GET(): Response {
  return jsonResponse({ error: "Method not allowed" }, 405);
}
