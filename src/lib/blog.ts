/**
 * Blog domain layer — single source of truth for filtering, sorting,
 * prev/next navigation, related posts, and taxonomy counts.
 *
 * All blog listing pages and the detail page import from here to avoid
 * duplicated logic and ensure consistent "discovery" exclusion rules.
 */
import type { CollectionEntry } from "astro:content";
import { getCollection, getEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

// ---------------------------------------------------------------------------
// Filtering & sorting
// ---------------------------------------------------------------------------

/** Posts visible in the main blog feed (excludes drafts + discovery-tagged). */
export async function getMainFeedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection(
    "blog",
    ({ data }) => !data.draft && !data.tags.includes("discovery"),
  );
  return sortByDateDesc(posts);
}

/** All published posts (including discovery) — for detail pages, prev/next, etc. */
export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return sortByDateDesc(posts);
}

export function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

// ---------------------------------------------------------------------------
// Prev / Next navigation
// ---------------------------------------------------------------------------

export function getPrevNext(
  sortedPosts: BlogPost[],
  currentSlug: string,
): { prev?: BlogPost; next?: BlogPost } {
  const idx = sortedPosts.findIndex((p) => p.data.slug === currentSlug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? sortedPosts[idx - 1] : undefined,           // newer
    next: idx < sortedPosts.length - 1 ? sortedPosts[idx + 1] : undefined, // older
  };
}

// ---------------------------------------------------------------------------
// Related posts (by shared tags and/or category)
// ---------------------------------------------------------------------------

export function getRelatedPosts(
  allPosts: BlogPost[],
  current: BlogPost,
  limit = 3,
): BlogPost[] {
  const currentTags = new Set(current.data.tags);
  const currentCategory = current.data.category;

  const scored = allPosts
    .filter((p) => p.data.slug !== current.data.slug)
    .map((p) => {
      let score = 0;
      // +3 per shared tag
      for (const tag of p.data.tags) {
        if (currentTags.has(tag)) score += 3;
      }
      // +2 for same category
      if (currentCategory && p.data.category === currentCategory) score += 2;
      return { post: p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime());

  return scored.slice(0, limit).map(({ post }) => post);
}

// ---------------------------------------------------------------------------
// Taxonomy counts
// ---------------------------------------------------------------------------

export type TaxonomyCount = { slug: string; name: string; count: number };

export async function getCategoryCounts(posts: BlogPost[]): Promise<TaxonomyCount[]> {
  const countMap = new Map<string, number>();
  for (const p of posts) {
    if (p.data.category) {
      countMap.set(p.data.category, (countMap.get(p.data.category) || 0) + 1);
    }
  }

  // Bulk fetch all categories once, then look up by slug
  const allCategories = await getCollection("categories");
  const catMap = new Map(allCategories.map((c) => [c.data.slug, c.data.name]));

  const result: TaxonomyCount[] = [];
  for (const [slug, count] of countMap) {
    const name = catMap.get(slug);
    if (name) result.push({ slug, name, count });
  }
  return result.sort((a, b) => b.count - a.count);
}

export async function getTagCounts(posts: BlogPost[]): Promise<TaxonomyCount[]> {
  const countMap = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.data.tags) {
      countMap.set(tag, (countMap.get(tag) || 0) + 1);
    }
  }

  // Bulk fetch all tags once, then look up by slug
  const allTags = await getCollection("tags");
  const tagMap = new Map(allTags.map((t) => [t.data.slug, t.data.name]));

  const result: TaxonomyCount[] = [];
  for (const [slug, count] of countMap) {
    const name = tagMap.get(slug);
    if (name) result.push({ slug, name, count });
  }
  return result.sort((a, b) => b.count - a.count);
}

// ---------------------------------------------------------------------------
// Author resolution helper
// ---------------------------------------------------------------------------

export interface ResolvedAuthor {
  name: string;
  slug: string;
  avatar?: { url: string; alt?: string; width?: number; height?: number };
  bio?: string;
}

export async function resolveAuthor(authorSlug?: string): Promise<ResolvedAuthor | undefined> {
  if (!authorSlug) return undefined;
  const entry = await getEntry("authors", authorSlug);
  if (!entry) return undefined;
  return {
    name: entry.data.name,
    slug: entry.data.slug,
    avatar: entry.data.avatar,
    bio: entry.data.bio,
  };
}

// ---------------------------------------------------------------------------
// Pagination math
// ---------------------------------------------------------------------------

export const PAGE_SIZE = 12;

/**
 * Number of grid posts on page 1 (featured post is shown separately above).
 * Shared between blog/index.astro and blog/page/[page].astro to keep
 * pagination offsets consistent.
 */
export const PAGE_1_GRID_COUNT = PAGE_SIZE;

export function getPaginationItems(
  currentPage: number,
  totalPages: number,
  maxVisible = 7,
): Array<number | "ellipsis"> {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: Array<number | "ellipsis"> = [1];
  const half = Math.floor((maxVisible - 2) / 2); // slots around current (excluding 1 and last)

  let start = Math.max(2, currentPage - half);
  let end = Math.min(totalPages - 1, currentPage + half);

  // Adjust if near edges
  if (currentPage - half <= 2) end = Math.min(totalPages - 1, maxVisible - 2);
  if (currentPage + half >= totalPages - 1) start = Math.max(2, totalPages - maxVisible + 3);

  if (start > 2) items.push("ellipsis");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < totalPages - 1) items.push("ellipsis");
  items.push(totalPages);

  return items;
}

/** Returns the href for a given blog page number. */
export function blogPageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

// ---------------------------------------------------------------------------
// Blog search index (used by /blog/search-index.json endpoint)
// ---------------------------------------------------------------------------

export interface BlogSearchEntry {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
}

/** Build the search index payload for all given posts. */
export async function buildBlogSearchIndex(posts: BlogPost[]): Promise<BlogSearchEntry[]> {
  const allCategories = await getCollection("categories");
  const catMap = new Map(allCategories.map((c) => [c.data.slug, c.data.name]));

  return posts.map((p) => ({
    title: p.data.title,
    slug: p.data.slug,
    excerpt: p.data.seo?.description || "",
    date: p.data.date.toISOString(),
    category: catMap.get(p.data.category || "") || "",
  }));
}
