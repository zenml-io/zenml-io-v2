/**
 * Astro API route: CSP violation report sink.
 *
 * Route: POST /api/csp-report
 *
 * Browsers POST here when a Content-Security-Policy-Report-Only violation
 * occurs. We accept the report, log a redacted summary, and return 204.
 */
import type { APIContext } from "astro";

export const prerender = false;

const SAFE_CSP_KEYWORDS = new Set([
  "eval",
  "inline",
  "wasm-eval",
  "trusted-types-policy",
  "trusted-types-sink",
  "self",
]);

function sanitizeCspResource(value: unknown): string {
  if (typeof value !== "string" || value.length === 0) {
    return "";
  }

  if (SAFE_CSP_KEYWORDS.has(value)) {
    return value;
  }

  try {
    const url = new URL(value);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return `${url.origin}${url.pathname}`;
    }

    return url.protocol;
  } catch {
    return "(unparseable)";
  }
}

export async function POST(context: APIContext): Promise<Response> {
  try {
    const body = (await context.request.json()) as Record<string, unknown>;
    const report =
      (body?.["csp-report"] as Record<string, unknown>) ?? body ?? {};

    // Log only non-PII fields for debugging
    const documentUri = sanitizeCspResource(report["document-uri"]);
    const violatedDirective = String(report["violated-directive"] ?? "");
    const effectiveDirective = String(report["effective-directive"] ?? "");
    const blockedResource = sanitizeCspResource(report["blocked-uri"]);

    console.log("[csp-report]", {
      documentUri,
      violatedDirective,
      effectiveDirective,
      blockedResource,
    });
  } catch {
    // Malformed payload — silently accept to avoid 4xx noise
  }

  return new Response(null, { status: 204 });
}

export function GET(): Response {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
