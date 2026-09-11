/**
 * Blog index filter island — thin FilterIndex config on top of the shared
 * `DataFilterIndex` engine (#249), skinned "labs" (blog cutover,
 * the approved blog design (DESIGN.md)). The page passes the built search-index entries in as
 * `items` (`buildBlogSearchIndex` in `src/lib/blog.ts` — the same data
 * `/blog/search-index.json` serves), so the first page of post cards and
 * their `/blog/<slug>` links are in the server-rendered HTML — /blog is a
 * high-volume SEO surface and must not depend on a client fetch for its
 * crawlable content (guarded by a `check-dist-smoke.ts` assertion). Renders
 * `labs.blog-card`'s Preact twin (`BlogCard.tsx`) — an Astro component
 * can't render inside a Preact island (same constraint as
 * `src/components/labs/IntegrationCard.astro` — see `ControlFilterIndex`'s
 * TSDoc), so `BlogCard.tsx` and `BlogCard.astro` share every class string
 * via `blogCardStyles.ts` instead.
 */
import type { BlogProduct } from "../../../lib/blog";
import { BlogCard } from "../../labs/BlogCard";
import { DataFilterIndex } from "./DataFilterIndex";
import type { FilterOption } from "./types";

export interface BlogIndexItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categorySlug: string;
  tags: string[];
  /** Drives the Kitaru pill + orange accent on this item's card — see `isKitaruPost` in lib/blog.ts. */
  product: BlogProduct;
  readingTime?: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  authorName?: string;
  authorSlug?: string;
  authorAvatar?: { url: string; alt?: string };
}

export interface BlogIndexProps {
  items: BlogIndexItem[];
  categories: FilterOption[];
  tags: FilterOption[];
  pageSize?: number;
}

function compareNewest(a: BlogIndexItem, b: BlogIndexItem): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function scoreRelevance(item: BlogIndexItem, q: string): number {
  const lower = q.toLowerCase();
  let score = 0;
  if (item.title.toLowerCase().includes(lower)) score += 10;
  if (item.excerpt.toLowerCase().includes(lower)) score += 3;
  return score;
}

export default function BlogIndex({
  items,
  categories,
  tags,
  pageSize = 12,
}: BlogIndexProps) {
  return (
    <DataFilterIndex<BlogIndexItem>
      idPrefix="blog"
      pageSize={pageSize}
      items={items}
      resultNounPlural="posts"
      getSlug={(item) => item.slug}
      getTitle={(item) => item.title}
      loadingLabel="Loading posts..."
      search={{
        mode: "substring",
        getSearchText: (item) =>
          [item.title, item.excerpt].filter(Boolean).join(" "),
        scoreRelevance,
        placeholder: `Search ${items.length.toLocaleString("en-US")} posts`,
        ariaLabel: "Search",
      }}
      sort={{ compareNewest }}
      skin="labs"
      gridClassName="grid grid-cols-1 gap-12 sm:grid-cols-2"
      singleFacet={{
        label: "Category",
        urlParam: "category",
        options: categories,
        getValue: (item) => item.categorySlug || null,
      }}
      multiFacet={{
        label: "Tags",
        urlParam: "tags",
        options: tags,
        getValues: (item) => item.tags,
        searchPlaceholder: "Search tags...",
        searchAriaLabel: "Search tags",
        itemNounPlural: "tags",
      }}
      renderItem={(item) => (
        <BlogCard
          key={item.slug}
          href={`/blog/${item.slug}`}
          title={item.title}
          excerpt={item.excerpt}
          image={item.image}
          authorName={item.authorName}
          authorSlug={item.authorSlug}
          authorAvatar={item.authorAvatar}
          readingTime={item.readingTime}
          categoryName={item.category}
          categorySlug={item.categorySlug}
          product={item.product}
        />
      )}
    />
  );
}
