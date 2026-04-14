/**
 * MLOps Database JSON index endpoint.
 *
 * Generates a thin JSON index at /mlops-index.json for client-side filtering.
 * Only includes structured metadata, not rendered body content.
 */

import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { deriveMLOpsAddedDate } from "../lib/mlops";

export const prerender = true;

export const GET: APIRoute = async () => {
  const entries = await getCollection(
    "mlops-database",
    ({ data }) => !data.draft,
  );

  const index = entries.map((entry) => ({
    slug: entry.data.slug,
    title: entry.data.title,
    company: entry.data.company,
    companySlug: entry.data.companySlug,
    platformName: entry.data.platformName,
    summary: entry.data.summary,
    mlopsTags: entry.data.mlopsTags,
    industryTags: entry.data.industryTags,
    contentType: entry.data.contentType,
    year: entry.data.year || null,
    addedAt: deriveMLOpsAddedDate(entry.data)?.getTime() ?? null,
    link: entry.data.link,
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
