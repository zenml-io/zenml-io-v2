/**
 * Blog index filter island — thin FilterIndex config on top of the shared
 * `DataFilterIndex` engine (#249). Fetches `/blog/search-index.json` (now
 * also the FilterIndex item source, not just BlogSearch.tsx's Cmd+K data —
 * see `buildBlogSearchIndex` in `src/lib/blog.ts`) and renders the same
 * card design `BlogCard.astro`'s "grid" variant uses. `BlogCard` itself is
 * an Astro component and can't be rendered inside a Preact island (same
 * constraint as `IntegrationCard` — see `ControlFilterIndex`'s TSDoc), so
 * this file carries a Preact port of its "grid" variant markup; it has no
 * scoped `<style>` to lose (all utility classes), so the port is low-risk.
 */
import { DataFilterIndex } from "./DataFilterIndex";
import { FOCUS_RING } from "./icons";
import type { FilterOption } from "./types";

export interface BlogIndexItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTime?: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  authorName?: string;
  authorSlug?: string;
  authorAvatar?: { url: string; alt?: string };
}

export interface BlogIndexProps {
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

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function BlogIndex({
  categories,
  tags,
  pageSize = 12,
}: BlogIndexProps) {
  return (
    <DataFilterIndex<BlogIndexItem>
      idPrefix="blog"
      pageSize={pageSize}
      dataUrl="/blog/search-index.json"
      getSlug={(item) => item.slug}
      getTitle={(item) => item.title}
      loadingLabel="Loading posts..."
      search={{
        mode: "substring",
        getSearchText: (item) =>
          [item.title, item.excerpt].filter(Boolean).join(" "),
        scoreRelevance,
        placeholder: "Search posts...",
        ariaLabel: "Search",
      }}
      sort={{ compareNewest }}
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
        <article
          key={item.slug}
          class="group flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          {item.image && (
            <a
              href={`/blog/${item.slug}`}
              class="block aspect-[3/2] overflow-hidden border-b border-gray-200"
            >
              <img
                src={item.image.url}
                alt={item.image.alt || item.title}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          )}
          <div class="flex flex-1 flex-col p-6">
            {item.category && (
              <div class="mb-2">
                <a
                  href={`/category/${item.categorySlug}`}
                  class={`inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary-100 ${FOCUS_RING}`}
                  style="mix-blend-mode:multiply"
                >
                  {item.category}
                </a>
              </div>
            )}
            <h2 class="mb-2 line-clamp-2 text-lg font-semibold leading-snug text-gray-900">
              <a
                href={`/blog/${item.slug}`}
                class={`transition-colors hover:text-primary-600 ${FOCUS_RING}`}
              >
                {item.title}
              </a>
            </h2>
            {item.excerpt && (
              <p class="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
                {item.excerpt}
              </p>
            )}
            <div class="mt-auto pt-2">
              {(item.authorAvatar || item.authorName) && (
                <div class="flex items-center gap-2">
                  {item.authorAvatar && (
                    <img
                      src={item.authorAvatar.url}
                      alt={item.authorAvatar.alt || item.authorName || ""}
                      class="h-6 w-6 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                  {item.authorName &&
                    (item.authorSlug ? (
                      <a
                        href={`/author/${item.authorSlug}`}
                        class={`text-sm font-medium text-gray-700 hover:text-primary-600 ${FOCUS_RING}`}
                      >
                        {item.authorName}
                      </a>
                    ) : (
                      <span class="text-sm font-medium text-gray-700">
                        {item.authorName}
                      </span>
                    ))}
                </div>
              )}
              <div class="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                <span>{formatDate(item.date)}</span>
                {item.readingTime && <span aria-hidden="true">&middot;</span>}
                {item.readingTime && <span>{item.readingTime}</span>}
              </div>
            </div>
          </div>
        </article>
      )}
    />
  );
}
