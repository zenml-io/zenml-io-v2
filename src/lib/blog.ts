/**
 * Blog domain layer — single source of truth for filtering, sorting,
 * prev/next navigation, related posts, and taxonomy counts.
 *
 * All blog listing pages and the detail page import from here to avoid
 * duplicated logic and ensure consistent "discovery" exclusion rules.
 */
import type { CollectionEntry } from "astro:content";
import { getCollection, getEntry } from "astro:content";
import type { CtaLink } from "./marketingPageTypes";

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
    prev: idx > 0 ? sortedPosts[idx - 1] : undefined, // newer
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
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.data.date.getTime() - a.post.data.date.getTime(),
    );

  return scored.slice(0, limit).map(({ post }) => post);
}

// ---------------------------------------------------------------------------
// Taxonomy counts
// ---------------------------------------------------------------------------

export type { TaxonomyCount } from "./relatedIndex";

import type { TaxonomyCount } from "./relatedIndex";

export async function getCategoryCounts(
  posts: BlogPost[],
): Promise<TaxonomyCount[]> {
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

export async function getTagCounts(
  posts: BlogPost[],
): Promise<TaxonomyCount[]> {
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

export async function resolveAuthor(
  authorSlug?: string,
): Promise<ResolvedAuthor | undefined> {
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
// Pagination
// ---------------------------------------------------------------------------

/** The FilterIndex island's page size on /blog (#249). */
export const PAGE_SIZE = 12;

// ---------------------------------------------------------------------------
// Blog search index (used by /blog/search-index.json endpoint)
// ---------------------------------------------------------------------------

export interface BlogSearchEntry {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  /** Category display name — kept for BlogSearch.tsx's Cmd+K result rows. */
  category: string;
  /** Category slug — added for the blog index's FilterIndex single facet (#249). */
  categorySlug: string;
  /** Tag slugs — added for the blog index's FilterIndex multi facet (#249). */
  tags: string[];
  readingTime?: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  authorName?: string;
  authorSlug?: string;
  authorAvatar?: { url: string; alt?: string };
}

/**
 * Build the search index payload for all given posts. Also the item source
 * for the blog index's FilterIndex island (#249) — not just BlogSearch.tsx's
 * Cmd+K — so it carries everything BlogCard needs to render a full card, not
 * just search-result fields.
 */
export async function buildBlogSearchIndex(
  posts: BlogPost[],
): Promise<BlogSearchEntry[]> {
  const allCategories = await getCollection("categories");
  const catMap = new Map(allCategories.map((c) => [c.data.slug, c.data.name]));

  const authorCache = new Map<string, ResolvedAuthor | undefined>();
  async function resolveAuthorCached(slug?: string) {
    if (!slug) return undefined;
    if (!authorCache.has(slug))
      authorCache.set(slug, await resolveAuthor(slug));
    return authorCache.get(slug);
  }

  return Promise.all(
    posts.map(async (p) => {
      const author = await resolveAuthorCached(p.data.author);
      return {
        title: p.data.title,
        slug: p.data.slug,
        excerpt: p.data.seo?.description || "",
        date: p.data.date.toISOString(),
        category: catMap.get(p.data.category || "") || "",
        categorySlug: p.data.category || "",
        tags: p.data.tags,
        readingTime: p.data.readingTime,
        image: p.data.mainImage,
        authorName: author?.name,
        authorSlug: author?.slug,
        authorAvatar: author?.avatar,
      };
    }),
  );
}

// ---------------------------------------------------------------------------
// Blog CTAs — sidebar + bottom banner
// ---------------------------------------------------------------------------

export const BLOG_SIDEBAR_CTA = {
  headline: "See ZenML in action",
  bullets: [
    "Open-source foundation, no vendor lock-in",
    "Works with any infrastructure",
    "Secure, metadata-only tracking",
  ],
  cta: {
    label: "Book a demo",
    href: "/book-your-demo",
    analytics: "Blog-Sidebar-Book-Demo",
  } as CtaLink,
} as const;

export const BLOG_FINAL_CTA = {
  headline: "Start deploying AI workflows in production today",
  body: "Enterprise-grade AI platform trusted by thousands of companies in production",
  primaryCta: {
    label: "Book a demo",
    href: "/book-your-demo",
    analytics: "Blog-CTA-Book-Demo",
  } as CtaLink,
  secondaryCta: {
    label: "Read Docs",
    href: "/docs",
    analytics: "Blog-CTA-Read-Docs",
  } as CtaLink,
} as const;
