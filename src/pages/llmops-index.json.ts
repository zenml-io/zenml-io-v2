/**
 * LLMOps Database JSON index endpoint.
 *
 * Generates a thin JSON index at /llmops-index.json for client-side filtering.
 * Only includes structured metadata (no body content) to keep size reasonable.
 *
 * Target: <500KB for 1,453 entries (~300 bytes each).
 */

import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { deriveAddedDate } from "../lib/llmops";

// Ensure this is pre-rendered at build time
export const prerender = true;

export const GET: APIRoute = async () => {
  const entries = await getCollection(
    "llmops-database",
    ({ data }) => !data.draft,
  );

  const index = entries.map((entry) => ({
    slug: entry.data.slug,
    title: entry.data.title,
    company: entry.data.company || null,
    summary: entry.data.summary || null,
    llmopsTags: entry.data.llmopsTags,
    industryTags: entry.data.industryTags || null,
    year: entry.data.year || null,
    addedAt: deriveAddedDate(entry.data)?.getTime() ?? null,
    link: entry.data.link || null,
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
