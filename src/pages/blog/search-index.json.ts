/**
 * Blog search JSON endpoint.
 *
 * Pre-rendered at build time to /blog/search-index.json.
 * Consumed by the BlogSearch Preact island on demand (lazy-fetched on focus).
 */
import type { APIRoute } from "astro";
import { getMainFeedPosts, buildBlogSearchIndex } from "../../lib/blog";

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getMainFeedPosts();
  const index = await buildBlogSearchIndex(posts);

  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
