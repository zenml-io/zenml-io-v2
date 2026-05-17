/**
 * Segment HTTP API client for Kitaru-origin form submissions.
 *
 * Ported as-is from `kitaru/site/src/lib/segment.ts` per MERGE_PLAN D4/D5.
 * Uses the Kitaru Segment write key, distinct from the ZenML key that
 * `/api/forms/[formType].ts` uses. Two-key split preserves downstream
 * warehouse routing.
 */

export const SEGMENT_WRITE_KEY = "MMarT0XoV4LJH8wR7wpmkTbF7txc9Bsg";

/** Send a single call to Segment's HTTP Tracking API. */
export async function segmentCall(
  endpoint: "identify" | "track",
  body: Record<string, unknown>,
): Promise<void> {
  const resp = await fetch(`https://api.segment.io/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(SEGMENT_WRITE_KEY + ":")}`,
    },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const text = await resp.text();
    console.error(`[segment:${endpoint}] ${resp.status}: ${text}`);
  }
}
