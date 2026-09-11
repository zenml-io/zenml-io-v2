/**
 * labs.blog-card — Preact twin of `BlogCard.astro`, for the one context an
 * Astro component can't render into: the `/blog` index's `DataFilterIndex`
 * island (`BlogIndex.tsx`'s `renderItem`). Same props, same markup, same
 * classes — pulled from `blogCardStyles.ts` so the two twins cannot drift.
 */
import type { BlogProduct } from "../../lib/blog";
import {
  BLOG_CARD_ARTICLE,
  BLOG_CARD_AUTHOR_NAME,
  BLOG_CARD_AUTHOR_NAME_STATIC,
  BLOG_CARD_AVATAR,
  BLOG_CARD_AVATAR_PLACEHOLDER,
  BLOG_CARD_BYLINE,
  BLOG_CARD_CATEGORY,
  BLOG_CARD_CATEGORY_STATIC,
  BLOG_CARD_EXCERPT,
  BLOG_CARD_FRAMED_ARTICLE,
  BLOG_CARD_FRAMED_MEDIA_LINK,
  BLOG_CARD_MEDIA_IMAGE,
  BLOG_CARD_MEDIA_LINK,
  BLOG_CARD_META_ROW,
  BLOG_CARD_PRODUCT_PILL,
  BLOG_CARD_PRODUCT_PILL_LINK,
  BLOG_CARD_READING_TIME,
  BLOG_CARD_TITLE,
} from "./blogCardStyles";

export interface BlogCardProps {
  variant?: "default" | "framed";
  href: string;
  title: string;
  excerpt?: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  authorName?: string;
  authorSlug?: string;
  authorAvatar?: { url: string; alt?: string };
  readingTime?: string;
  categoryName?: string;
  categorySlug?: string;
  /** Omit or "zenml" for the default (no pill, sage accent). "kitaru" adds the badge and scopes `--blog-accent-*` to orange for this card. */
  product?: BlogProduct;
}

export function BlogCard({
  variant = "default",
  href,
  title,
  excerpt,
  image,
  authorName,
  authorSlug,
  authorAvatar,
  readingTime,
  categoryName,
  categorySlug,
  product,
}: BlogCardProps) {
  const isKitaru = product === "kitaru";
  const showProductPill = isKitaru && variant !== "framed";
  // When the card's own category IS "kitaru", the pill doubles as the
  // category link (dedupe: no separate "Kitaru" category token beside it).
  // The card's root is an <article>, not an <a> — the title link
  // (after:absolute after:inset-0) is a sibling anchor, not a wrapper — so
  // a pill-as-link here never nests inside another anchor.
  const categoryIsKitaruPill = showProductPill && categorySlug === "kitaru";
  const showCategoryToken = !!categoryName && !categoryIsKitaruPill;
  return (
    <article
      class={`${variant === "framed" ? BLOG_CARD_FRAMED_ARTICLE : BLOG_CARD_ARTICLE} relative`}
      data-product={isKitaru ? "kitaru" : undefined}
    >
      {image && (
        <a
          href={href}
          class={
            variant === "framed"
              ? BLOG_CARD_FRAMED_MEDIA_LINK
              : BLOG_CARD_MEDIA_LINK
          }
        >
          <img
            src={image.url}
            alt={image.alt || title}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            class={BLOG_CARD_MEDIA_IMAGE}
          />
        </a>
      )}

      {(showCategoryToken || readingTime || showProductPill) && (
        <div class={BLOG_CARD_META_ROW}>
          <span class="inline-flex items-center gap-2">
            {showProductPill &&
              (categoryIsKitaruPill ? (
                <a href="/category/kitaru" class={BLOG_CARD_PRODUCT_PILL_LINK}>
                  Kitaru
                </a>
              ) : (
                <span class={BLOG_CARD_PRODUCT_PILL}>Kitaru</span>
              ))}
            {showCategoryToken &&
              (categorySlug ? (
                <a
                  href={`/category/${categorySlug}`}
                  class={BLOG_CARD_CATEGORY}
                >
                  {categoryName}
                </a>
              ) : (
                <span class={BLOG_CARD_CATEGORY_STATIC}>{categoryName}</span>
              ))}
          </span>
          {readingTime && (
            <span class={BLOG_CARD_READING_TIME}>{readingTime}</span>
          )}
        </div>
      )}

      <h3 class={BLOG_CARD_TITLE}>
        <a href={href} class="after:absolute after:inset-0">
          {title}
        </a>
      </h3>

      {excerpt && <p class={BLOG_CARD_EXCERPT}>{excerpt}</p>}

      {(authorAvatar || authorName) && (
        <div class={BLOG_CARD_BYLINE}>
          {authorAvatar ? (
            <img
              src={authorAvatar.url}
              alt={authorAvatar.alt || authorName || ""}
              class={BLOG_CARD_AVATAR}
              loading="lazy"
            />
          ) : (
            <span class={BLOG_CARD_AVATAR_PLACEHOLDER} aria-hidden="true" />
          )}
          {authorName &&
            (authorSlug ? (
              <a href={`/author/${authorSlug}`} class={BLOG_CARD_AUTHOR_NAME}>
                {authorName}
              </a>
            ) : (
              <span class={BLOG_CARD_AUTHOR_NAME_STATIC}>{authorName}</span>
            ))}
        </div>
      )}
    </article>
  );
}
