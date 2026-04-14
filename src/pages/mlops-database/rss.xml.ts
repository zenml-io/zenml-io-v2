/**
 * MLOps Database RSS Feed — /mlops-database/rss.xml
 *
 * Emits RSS 2.0 for newly/freshly exported MLOps database entries.
 */

import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { SITE_URL } from "../../lib/constants";
import type { MLOpsProvenance } from "../../lib/mlops";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function derivePubDate(data: MLOpsProvenance): Date | null {
  const candidates = [
    data.mlops?.lastUpdated,
    data.mlops?.exportedAt,
    data.mlops?.createdAt,
  ];

  for (const raw of candidates) {
    if (!raw) continue;
    const date = new Date(raw);
    if (!Number.isNaN(date.getTime())) return date;
  }

  return null;
}

export const GET: APIRoute = async () => {
  const entries = await getCollection(
    "mlops-database",
    ({ data }) => !data.draft,
  );

  const withDates = entries.map((entry) => ({
    entry,
    pubDate: derivePubDate(entry.data),
  }));

  withDates.sort((a, b) => {
    const ta = a.pubDate?.getTime() ?? 0;
    const tb = b.pubDate?.getTime() ?? 0;
    if (tb !== ta) return tb - ta;
    return a.entry.id.localeCompare(b.entry.id);
  });

  const feedUrl = `${SITE_URL}/mlops-database/rss.xml`;
  const now = new Date();
  const nowStr = now.toUTCString();
  const newestDate = withDates[0]?.pubDate ?? now;

  const items = withDates
    .map(({ entry, pubDate }) => {
      const slug = entry.data.slug ?? entry.id;
      const link = `${SITE_URL}/mlops-database/${slug}`;
      const description =
        entry.data.seo?.description ?? entry.data.summary ?? entry.data.title;
      const itemDate = (pubDate ?? now).toUTCString();

      return `    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${itemDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MLOps Database RSS Feed</title>
    <link>${SITE_URL}/mlops-database</link>
    <description>New entries in the ZenML MLOps Database</description>
    <language>en</language>
    <lastBuildDate>${nowStr}</lastBuildDate>
    <pubDate>${newestDate.toUTCString()}</pubDate>
    <generator>ZenML Astro Site</generator>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
