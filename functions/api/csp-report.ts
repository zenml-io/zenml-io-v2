/**
 * Cloudflare Pages Function: CSP violation report sink.
 *
 * Route: POST /api/csp-report
 *
 * Browsers POST here when a Content-Security-Policy-Report-Only violation
 * occurs. We accept the report, log a redacted summary, and return 204.
 */

interface Env {}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<Record<string, unknown>>();
    const report =
      (body?.["csp-report"] as Record<string, unknown>) ?? body ?? {};

    // Log only non-PII fields for debugging
    const documentUri = String(report["document-uri"] ?? "").split("?")[0];
    const violatedDirective = String(report["violated-directive"] ?? "");
    const effectiveDirective = String(report["effective-directive"] ?? "");

    console.log("[csp-report]", {
      documentUri,
      violatedDirective,
      effectiveDirective,
    });
  } catch {
    // Malformed payload — silently accept to avoid 4xx noise
  }

  return new Response(null, { status: 204 });
};

// Reject non-POST methods
export const onRequestGet: PagesFunction = async () =>
  new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
