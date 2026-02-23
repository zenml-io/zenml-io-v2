/**
 * Blog RSS Feed — /blog/rss.xml
 *
 * Generates RSS 2.0 matching the feed Webflow auto-generated.
 * Includes atom:link self-reference for feed readers.
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

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const feedUrl = `${SITE_URL}/blog/rss.xml`;
  const now = new Date().toUTCString();
  const newestDate = posts.length > 0
    ? new Date(posts[0].data.date).toUTCString()
    : now;

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.data.slug}`;
      const pubDate = new Date(post.data.date).toUTCString();
      const description =
        post.data.seo?.description ?? post.data.title;

      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ZenML Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Blog posts written by the ZenML Team</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <pubDate>${newestDate}</pubDate>
    <generator>ZenML Astro Site</generator>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
