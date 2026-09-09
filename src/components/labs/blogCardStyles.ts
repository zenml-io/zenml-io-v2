/**
 * blogCardStyles — the one copy of `labs.blog-card`'s class strings
 * (the approved blog design, DESIGN.md), shared by the Astro (`BlogCard.astro`) and Preact
 * (`BlogCard.tsx`) twins so the two markups cannot drift apart. Both
 * render the same chrome-less card: 16:9 media, meta row (category +
 * reading time), title, excerpt, byline — every slot but title collapses
 * when absent.
 *
 * Category/title/media-border read the `--blog-accent-*` custom properties
 * (global.css) instead of a hardcoded sage step, so a card carrying its own
 * `data-product="kitaru"` root re-points to the orange ramp without a
 * second copy of these strings — see BLOG_CARD_PRODUCT_PILL below.
 */

export const BLOG_CARD_ARTICLE = "group flex cursor-pointer flex-col gap-4";

export const BLOG_CARD_MEDIA_LINK =
  "block aspect-video overflow-clip rounded-[6px] border border-(--color-border) transition-colors duration-200 ease-out group-hover:border-(--blog-accent-400)";

export const BLOG_CARD_MEDIA_IMAGE =
  "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

export const BLOG_CARD_META_ROW = "flex items-center justify-between gap-3";

/** "Kitaru" badge shown next to the category on a Kitaru post's card or masthead. */
export const BLOG_CARD_PRODUCT_PILL =
  "inline-flex items-center rounded-full bg-(--blog-accent-100) px-2.5 py-0.5 text-[13px] leading-4 font-medium text-(--blog-accent-700)";

/**
 * Same pill, as a link — used when the post's category is itself "kitaru":
 * the pill doubles as the category link (dedupe, no separate "Kitaru"
 * category token next to it), so it gets the category link's hover
 * treatment on top of the pill shape.
 */
export const BLOG_CARD_PRODUCT_PILL_LINK = `${BLOG_CARD_PRODUCT_PILL} hover:text-(--blog-accent-800)`;

export const BLOG_CARD_CATEGORY =
  "text-[12px] font-medium text-(--blog-accent-700) hover:text-(--blog-accent-800)";

export const BLOG_CARD_CATEGORY_STATIC =
  "text-[12px] font-medium text-(--blog-accent-700)";

export const BLOG_CARD_READING_TIME = "text-[12px] text-(--color-cream-700)";

export const BLOG_CARD_TITLE =
  "font-display line-clamp-2 text-[20px] leading-[26px] text-(--color-cream-800) transition-colors duration-200 ease-out group-hover:text-(--blog-accent-800)";

export const BLOG_CARD_EXCERPT =
  "line-clamp-2 text-[15px] leading-[23px] text-(--color-cream-700)";

export const BLOG_CARD_BYLINE = "flex items-center gap-2.5 pt-1";

export const BLOG_CARD_AVATAR = "h-6 w-6 shrink-0 rounded-full object-cover";

export const BLOG_CARD_AVATAR_PLACEHOLDER =
  "h-6 w-6 shrink-0 rounded-full border border-(--color-border) bg-(--color-cream-200)";

export const BLOG_CARD_AUTHOR_NAME =
  "font-sans text-[13px] font-medium text-(--color-cream-700) hover:text-(--color-sage-800)";

export const BLOG_CARD_AUTHOR_NAME_STATIC =
  "font-sans text-[13px] font-medium text-(--color-cream-700)";
