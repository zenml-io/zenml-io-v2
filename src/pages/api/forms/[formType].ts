/**
 * Astro API route: form submission handler.
 *
 * Route: POST /api/forms/:formType
 *
 * Validates input, sends identify + track calls to Segment's HTTP API
 * (fire-and-forget via waitUntil), and returns success to the user.
 * Segment routes form data to CRM destinations (Attio, Apollo).
 */

import type { Runtime } from "@astrojs/cloudflare";
import type { APIContext } from "astro";
import {
  FORM_RULES,
  type FormType,
  validateForm,
} from "../../../lib/formValidation";

export const prerender = false;

const VALID_FORM_TYPES = new Set<FormType>(
  Object.keys(FORM_RULES) as FormType[],
);

/** Non-content fields omitted from submission metadata logs. */
const EXCLUDED_FIELDS = new Set(["cf-turnstile-response", "privacy"]);

/** Per-form trait fields sent in the identify call. */
const IDENTIFY_TRAITS: Record<FormType, string[]> = {
  "demo-request": ["fullName", "email", "company"],
  whitepaper: ["fullName", "email"],
  "brick-manual": ["fullName", "email"],
  "startup-academic": ["fullName", "email", "company"],
};

/** Per-form fields allowed in the Segment track payload. */
const TRACK_PROPERTIES: Record<FormType, string[]> = {
  "demo-request": ["fullName", "email", "company", "jobTitle"],
  whitepaper: ["fullName", "email", "company", "jobTitle"],
  "brick-manual": ["fullName", "email"],
  "startup-academic": ["fullName", "email", "linkedin", "company", "role"],
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
      Authorization: `Basic ${btoa(`${writeKey}:`)}`,
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

  const typedFormType = formType as FormType;

  // Validate required fields using shared client/server rules
  const validation = validateForm(typedFormType, data);
  if (!validation.valid) {
    return jsonResponse({ success: false, errors: validation.errors }, 422);
  }

  // Access Cloudflare runtime for env vars and waitUntil
  const runtime = (context.locals as Runtime).runtime;
  const env = runtime.env as Record<string, string | undefined>;

  // Verify Turnstile token (required when secret key is configured)
  const turnstileToken = data["cf-turnstile-response"];
  const turnstileSecret = env.TURNSTILE_SECRET_KEY;

  if (turnstileSecret) {
    if (!turnstileToken) {
      return jsonResponse(
        { success: false, error: "Bot verification is required" },
        403,
      );
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
      return jsonResponse(
        { success: false, error: "Bot verification failed. Please try again." },
        403,
      );
    }
  }

  // Server-side privacy consent enforcement (GDPR requirement).
  const privacyValue = (data.privacy ?? "").trim().toLowerCase();
  if (!/^(on|true|1)$/.test(privacyValue)) {
    return jsonResponse(
      {
        success: false,
        errors: { privacy: "You must agree to the privacy policy" },
      },
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
    const traitFields = IDENTIFY_TRAITS[typedFormType] ?? [];
    const traits: Record<string, string> = {};
    for (const field of traitFields) {
      const val = (data[field] ?? "").trim();
      if (val) traits[field === "fullName" ? "name" : field] = val;
    }

    // Build properties for track from the fields explicitly supported by this form.
    const properties: Record<string, string> = { formType };
    for (const field of TRACK_PROPERTIES[typedFormType]) {
      const val = (data[field] ?? "").trim();
      if (val) properties[field] = val;
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
