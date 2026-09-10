/**
 * Copy and shared numbers for the two research databases (LLMOps and
 * MLOps), so the index pages, the entry layout, the tag/industry hubs and
 * the hub indexes read one module rather than each retyping a route, a
 * label or a sentence.
 *
 * Every string here is a string those routes already shipped, or one this
 * cutover's rulings fixed. Nothing is derived at render time that could be
 * derived here.
 */

import { BLOG_CTA, type BlogCtaContent } from "./blog-cta";

export type DatabaseKey = "llmops" | "mlops";

export interface DatabaseCopy {
  /** Display name — page heading, breadcrumb root, hub crumb. */
  name: "LLMOps Database" | "MLOps Database";
  /** Band eyebrow above an entry's title. */
  eyebrow: "LLMOps database" | "MLOps database";
  /** The filterable index route. */
  indexHref: string;
  /** Entry detail prefix — an entry lives at `${entryBase}/${slug}`. */
  entryBase: string;
  /** The tag-hub INDEX route (the "all technologies" listing). */
  tagsHref: string;
  /** Plural label for this database's tag dimension. */
  tagsLabel: "Technologies" | "MLOps topics";
  /** Singular of the above, for sentences. */
  tagSingular: "technology" | "MLOps topic";
  /** Per-term tag-hub prefix — one term lives at `${tagHubBase}/${slug}`. Same route as `tagsHref`. */
  tagHubBase: "/llmops-tags" | "/mlops-tags";
  /** `<title>` of the index page. */
  seoTitle: string;
  /** The index page's deck (also its `<meta name="description">` on the pre-cutover page's PageHeader/SectionIntro). */
  description(count: number): string;
  /**
   * The index page's `<meta name="description">` exactly as it ships today.
   * Kept separate from `description` because the two sentences already
   * differ on both routes and this cutover changes no metadata.
   */
  seoDescription(count: number): string;
  /** Opening sentence of the index page's `<noscript>` fallback. */
  noscriptIntro: string;
}

export const DATABASES: Record<DatabaseKey, DatabaseCopy> = {
  llmops: {
    name: "LLMOps Database",
    eyebrow: "LLMOps database",
    indexHref: "/llmops-database",
    entryBase: "/llmops-database",
    tagsHref: "/llmops-tags",
    tagsLabel: "Technologies",
    tagSingular: "technology",
    tagHubBase: "/llmops-tags",
    seoTitle: "LLMOps Database - ZenML",
    description: (count) =>
      `Explore ${count} real-world LLMOps use cases, tools, and implementations. Filter by technology, industry, or search for specific topics.`,
    seoDescription: (count) =>
      `Explore ${count} real-world LLMOps use cases, tools, and implementations. Filter by technology, industry, and more.`,
    noscriptIntro:
      "JavaScript is required for the interactive filter. Browse by category instead:",
  },
  mlops: {
    name: "MLOps Database",
    eyebrow: "MLOps database",
    indexHref: "/mlops-database",
    entryBase: "/mlops-database",
    tagsHref: "/mlops-tags",
    tagsLabel: "MLOps topics",
    tagSingular: "MLOps topic",
    tagHubBase: "/mlops-tags",
    seoTitle: "MLOps Database - ZenML",
    description: (count) =>
      `Explore ${count} real-world MLOps case studies, platforms, and production ML systems. Filter by topic, industry, or search for specific companies and platforms.`,
    seoDescription: (count) =>
      `Explore ${count} real-world MLOps case studies, platforms, and production machine learning implementations. Filter by topic, industry, content type, and more.`,
    noscriptIntro:
      "JavaScript is required for the interactive filter. Browse by category instead:",
  },
};

/** Rows per page on the filterable index and on the tag hubs. */
export const DATABASE_PAGE_SIZE = 24;

/** Chips an entry's record shows before the "+N more" disclosure — roughly two rows. */
export const DATABASE_TAG_CHIPS_VISIBLE = 9;

/** Chips one index / hub row shows before the "+N" overflow pill. */
export const DATABASE_ROW_CHIPS_VISIBLE = 3;

/**
 * The closing band's copy on every database route. Headline and signup pill
 * are the blog's — same offer, same event — and only the newsletter card's
 * own two lines change.
 *
 * The card posts to BREVO_LLMOPS_CONFIG: there is no separate MLOps list in
 * this repo, so both databases subscribe to the LLMOps one. The visible copy
 * promises "both databases", which is what that list sends.
 */
export const DATABASE_CTA: BlogCtaContent = {
  headlineLines: BLOG_CTA.headlineLines,
  cta: { ...BLOG_CTA.cta, analytics: "Database-Close-Signup-ZenML" },
  newsletter: {
    ...BLOG_CTA.newsletter,
    title: "Get new entries in your inbox",
    deck: "New case studies from both databases, sent when we publish. No spam.",
  },
};

/** Comma-formatted, en-US — the one number format these routes use. */
export function formatCount(count: number): string {
  return count.toLocaleString("en-US");
}

/** "technology" → "Technology"; "MLOps topic" is already capitalised, so this is a no-op for it. */
export function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Singular of a plural noun, for the one-item case: "entries" → "entry",
 * "case studies" → "case study", "posts" → "post".
 */
function singularize(plural: string): string {
  if (plural.endsWith("ies")) return `${plural.slice(0, -3)}y`;
  return plural.endsWith("s") ? plural.slice(0, -1) : plural;
}

/** "1,095 LLMOps entries and 28 MLOps entries" — the industry hub's deck. */
export function industryHubDeck(llmops: number, mlops: number): string {
  const llmopsPart = `${formatCount(llmops)} LLMOps ${llmops === 1 ? "entry" : "entries"}`;
  const mlopsPart = `${formatCount(mlops)} MLOps ${mlops === 1 ? "entry" : "entries"}`;
  return `${llmopsPart} and ${mlopsPart}`;
}

/**
 * "1,688 entries with this tag" — a tag hub's deck. `noun` is the plural
 * noun of the thing being counted; a count of one takes its singular.
 */
export function entryCountDeck(count: number, noun: string): string {
  return `${formatCount(count)} ${count === 1 ? singularize(noun) : noun} with this tag`;
}
