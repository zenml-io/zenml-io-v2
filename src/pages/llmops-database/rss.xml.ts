/**
 * LLMOps Database RSS Feed — /llmops-database/rss.xml
 *
 * Generates RSS 2.0 matching the feed Webflow auto-generated.
 * LLMOps has no top-level `date` field — timestamps come from
 * webflow.lastPublished → lastUpdated → createdOn (all optional strings).
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_URL } from "../../lib/constants";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Derive a Date from the webflow metadata fallback chain. */
function derivePubDate(
  webflow?: { lastPublished?: string; lastUpdated?: string; createdOn?: string }
): Date | null {
  const raw =
    webflow?.lastPublished ?? webflow?.lastUpdated ?? webflow?.createdOn;
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

export const GET: APIRoute = async () => {
  const entries = await getCollection(
    "llmops-database",
    ({ data }) => !data.draft
  );

  // Derive pubDate for sorting + feed
  const withDates = entries.map((entry) => ({
    entry,
    pubDate: derivePubDate(entry.data.webflow),
  }));

  // Sort by date desc, stable tie-break on slug
  withDates.sort((a, b) => {
    const ta = a.pubDate?.getTime() ?? 0;
    const tb = b.pubDate?.getTime() ?? 0;
    if (tb !== ta) return tb - ta;
    return a.entry.id.localeCompare(b.entry.id);
  });

  const feedUrl = `${SITE_URL}/llmops-database/rss.xml`;
  const now = new Date().toUTCString();

  const items = withDates
    .map(({ entry, pubDate }) => {
      const link = `${SITE_URL}/llmops-database/${entry.id}`;
      const description =
        entry.data.seo?.description ?? entry.data.summary ?? entry.data.title;
      const pubDateTag = pubDate
        ? `\n      <pubDate>${pubDate.toUTCString()}</pubDate>`
        : "";

      return `    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${escapeXml(description)}</description>${pubDateTag}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LLMOps Database RSS Feed</title>
    <link>${SITE_URL}/llmops-database</link>
    <description>New entries in the ZenML LLMOps Database</description>
    <language>en</language>
    <pubDate>${now}</pubDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
