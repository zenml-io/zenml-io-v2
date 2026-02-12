/**
 * Astro Content Collections Configuration (v5 Content Layer API)
 *
 * This file defines content collections for the ZenML website migration from Webflow.
 *
 * Key changes in Astro v5:
 * - Config file moved from src/content/config.ts → src/content.config.ts
 * - Collections require explicit glob loaders (no automatic folder discovery)
 * - Enables flexible content sources beyond local files
 *
 * Key principles:
 * - SEO blocks are optional (73+ items don't have SEO metadata)
 * - Webflow metadata preserved for traceability
 * - Image URLs are R2-hosted (Cloudflare R2)
 * - References use slug-based lookups (not IDs)
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { readdirSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

// ============================================================================
// Reusable Schema Helpers
// ============================================================================

/**
 * Image schema for R2-hosted assets
 * Used for: blog mainImage, team photos, integration logos, etc.
 */
export const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

/**
 * SEO metadata schema
 * IMPORTANT: Optional at top level (73+ items don't have SEO data)
 * All fields inside are also optional for flexibility
 */
export const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical: z.string().url().optional(),
  ogImage: z.string().url().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
}).optional();

/**
 * Webflow metadata schema
 * Preserves traceability to original CMS
 *
 * Note on collectionId: In Phase 1 transform, some items had null collectionId
 * (cmsLocaleId was null). Phase 2A fixed this to omit the field entirely when null.
 */
export const webflowMetaSchema = z.object({
  siteId: z.string(),
  collectionId: z.string().optional(), // Omitted if null in Webflow export
  itemId: z.string(),
  exportedAt: z.string(),
  source: z.enum(['live', 'staged-only']),
  lastPublished: z.string().optional(),
  lastUpdated: z.string().optional(),
  createdOn: z.string().optional(),
});

/**
 * Base schema for all content items
 * Every collection includes these common fields
 */
export const baseContentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),
  webflow: webflowMetaSchema,
  seo: seoSchema,
});

// ============================================================================
// Reference Validation Helpers
// ============================================================================

/**
 * Get absolute path to src/content directory
 * Uses import.meta.url for robust path resolution
 */
function getContentDirAbs(): string {
  return fileURLToPath(new URL('./content', import.meta.url));
}

/**
 * Load slug Set from a collection directory by reading .md filenames
 * Fails fast if directory doesn't exist (better diagnostics than empty set)
 *
 * @param collectionDirName - Directory name under src/content/
 * @returns Set of slugs (filenames without .md extension)
 */
function loadSlugSetFromCollectionDir(collectionDirName: string): Set<string> {
  const contentDir = getContentDirAbs();
  const absDir = join(contentDir, collectionDirName);

  if (!existsSync(absDir)) {
    throw new Error(`Missing content directory: ${absDir}`);
  }

  return new Set(
    readdirSync(absDir)
      .filter((f) => extname(f) === '.md')
      .map((f) => basename(f, '.md'))
  );
}

/**
 * Reference collection slug lookup sets
 * Built at config evaluation time by reading filesystem
 */
const referenceSlugSets = {
  authors: loadSlugSetFromCollectionDir('authors'),
  categories: loadSlugSetFromCollectionDir('categories'),
  tags: loadSlugSetFromCollectionDir('tags'),
  'llmops-tags': loadSlugSetFromCollectionDir('llmops-tags'),
  'industry-tags': loadSlugSetFromCollectionDir('industry-tags'),
  'project-tags': loadSlugSetFromCollectionDir('project-tags'),
  'product-categories': loadSlugSetFromCollectionDir('product-categories'),
  'integration-types': loadSlugSetFromCollectionDir('integration-types'),
  advantages: loadSlugSetFromCollectionDir('advantages'),
  quotes: loadSlugSetFromCollectionDir('quotes'),
} as const;

/**
 * Creates a slug reference schema with validation
 * Used for relationships between collections (e.g., blog -> author)
 *
 * @param collectionName - Name of the referenced collection (for error messages)
 * @param validSlugs - Optional Set of valid slugs for runtime validation
 * @returns Zod schema that validates slug format and optionally checks existence
 */
export function slugReference(collectionName: string, validSlugs?: Set<string>) {
  const base = z.string().describe(`Slug reference to ${collectionName} collection`);

  if (!validSlugs) return base;

  return base.refine(
    (slug) => validSlugs.has(slug),
    (slug) => ({ message: `Invalid reference: "${slug}" not found in ${collectionName}` })
  );
}

/**
 * Creates an array of slug references
 * Used for many-to-many relationships (e.g., blog -> tags)
 *
 * @param collectionName - Name of the referenced collection
 * @param validSlugs - Optional Set of valid slugs for runtime validation
 * @returns Zod schema that validates array of slugs
 */
export function slugReferenceArray(collectionName: string, validSlugs?: Set<string>) {
  return z.array(slugReference(collectionName, validSlugs)).default([]);
}

// ============================================================================
// Reference Collection Schemas (Phase 2D)
// ============================================================================

/**
 * Authors schema
 * Used by: blog posts
 * Fields: name, slug, avatar, bio, email, linkedin
 */
const authorSchema = z.object({
  name: z.string(),
  slug: z.string(),
  avatar: imageSchema.optional(),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),
  webflow: webflowMetaSchema,
});

/**
 * Simple tag schema (used by multiple collections)
 * Just name + slug + webflow metadata
 */
const simpleTagSchema = z.object({
  name: z.string(),
  slug: z.string(),
  webflow: webflowMetaSchema,
});

/**
 * Categories schema (blog categories)
 * Used by: blog posts
 */
const categorySchema = simpleTagSchema;

/**
 * Tags schema (blog tags)
 * Used by: blog posts
 */
const tagSchema = simpleTagSchema;

/**
 * LLMOps Tags schema
 * Used by: llmops database items
 */
const llmopsTagSchema = simpleTagSchema;

/**
 * Industry Tags schema
 * Used by: llmops database items
 */
const industryTagSchema = simpleTagSchema;

/**
 * Project Tags schema
 * Used by: projects collection
 */
const projectTagSchema = simpleTagSchema;

/**
 * Product Categories schema
 * Used by: product/feature pages
 */
const productCategorySchema = simpleTagSchema;

/**
 * Integration Types schema
 * Used by: integrations collection
 * Fields: name, slug, icon (optional - extraction logic exists but no data)
 */
const integrationTypeSchema = z.object({
  name: z.string(),
  slug: z.string(),
  icon: imageSchema.optional(),
  webflow: webflowMetaSchema,
});

/**
 * Advantages schema
 * Used by: homepage, product pages
 * Fields: title, slug, content (text), image
 */
const advantageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  image: imageSchema.optional(),
  webflow: webflowMetaSchema,
});

/**
 * Quotes schema (customer testimonials)
 * Used by: homepage, case study pages
 * Fields: name, slug, text, author, position, avatar, companyLogo
 */
const quoteSchema = z.object({
  name: z.string(),
  slug: z.string(),
  text: z.string(),
  author: z.string(),
  position: z.string(),
  avatar: imageSchema.optional(),
  companyLogo: imageSchema.optional(),
  webflow: webflowMetaSchema,
});

// ============================================================================
// Main Collection Schemas (Phase 2E)
// ============================================================================

/**
 * Blog Posts schema
 * Route: /blog/<slug>
 * Count: 317 items
 * Fields: author, category, tags, date, readingTime, mainImage
 */
const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // Blog-specific fields
  author: slugReference('authors', referenceSlugSets.authors),
  category: slugReference('categories', referenceSlugSets.categories).optional(), // 8 posts have no category in Webflow
  tags: slugReferenceArray('tags', referenceSlugSets.tags),
  date: z.coerce.date(),
  readingTime: z.string().optional(),

  // Media
  mainImage: imageSchema.optional(),

  // SEO & Webflow
  seo: seoSchema,
  webflow: webflowMetaSchema,
});

/**
 * Integrations schema
 * Route: /integrations/<slug>
 * Count: 68 items
 *
 * DISCREPANCIES FROM PLAN:
 * - Field is "integrationType" (not "type")
 * - Field is "shortDescription" (not "description")
 * - Additional fields: docsUrl, githubUrl, mainImage, relatedBlogPosts
 */
const integrationSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // Integration-specific fields
  integrationType: slugReference('integration-types', referenceSlugSets['integration-types']),
  logo: imageSchema.optional(),
  shortDescription: z.string().optional(),
  docsUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  mainImage: imageSchema.optional(),
  relatedBlogPosts: slugReferenceArray('blog'),

  // SEO & Webflow
  seo: seoSchema,
  webflow: webflowMetaSchema,
});

/**
 * LLMOps Database schema
 * Route: /llmops-database/<slug>
 * Count: 1,453 items
 *
 * CRITICAL DISCREPANCIES FROM PLAN:
 * - Field is "llmopsTags" (not "tags")
 * - NO "industryTags" field exists in actual output!
 * - Phase 2A claimed to fix these field names but didn't
 * - Additional fields: company, summary, link, year
 */
const llmopsSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // LLMOps-specific fields (ACTUAL field names from transform)
  llmopsTags: slugReferenceArray('llmops-tags', referenceSlugSets['llmops-tags']),
  industryTags: slugReference('industry-tags', referenceSlugSets['industry-tags']).optional(),
  company: z.string().optional(),
  summary: z.string().optional(),
  link: z.string().url().optional(),
  year: z.number().optional(),

  // SEO & Webflow
  seo: seoSchema,
  webflow: webflowMetaSchema,
});

/**
 * Compare/VS Pages schema
 * Route: /compare/<slug>
 * Count: 17 items
 *
 * MAJOR DISCREPANCIES FROM PLAN:
 * - Field is "toolName" (not "competitor")
 * - Many additional fields for VS page rendering:
 *   toolIcon, category, integrationType, quote, headline, heroText,
 *   ctaHeadline, learnMoreUrl, seoDescription, openGraphImage
 */
const compareSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // VS page-specific fields
  toolName: z.string().optional(),
  toolIcon: imageSchema.optional(),
  category: z.string().optional(),
  integrationType: slugReference('integration-types', referenceSlugSets['integration-types']).optional(),
  advantages: slugReferenceArray('advantages', referenceSlugSets.advantages),
  quote: slugReference('quotes', referenceSlugSets.quotes).optional(),
  headline: z.string().optional(),
  heroText: z.string().optional(),
  ctaHeadline: z.string().optional(),
  learnMoreUrl: z.string().url().optional(),
  seoDescription: z.string().optional(),
  openGraphImage: imageSchema.optional(),

  // SEO & Webflow
  seo: seoSchema,
  webflow: webflowMetaSchema,
});

/**
 * Team Members schema
 * Route: /team/<slug>
 * Count: 22 items
 *
 * DISCREPANCY FROM PLAN:
 * - Additional field: order (number for display ordering)
 */
const teamSchema = z.object({
  title: z.string(), // Full name
  slug: z.string(),
  draft: z.boolean().default(false),

  // Team-specific fields
  position: z.string().optional(),
  photo: imageSchema.optional(),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),
  order: z.number().optional(), // Display order

  // Webflow metadata (no SEO for team pages)
  webflow: webflowMetaSchema,
});

/**
 * Projects schema
 * Route: /projects/<slug>
 * Count: 16 items
 *
 * DISCREPANCIES FROM PLAN:
 * - Field is "mainImageLink" (not "coverImage")
 * - Additional fields: tools, createdAt, updatedAt, projectId
 * - tags references project-tags (confirmed correct)
 */
const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(false),

  // Project-specific fields
  description: z.string().optional(),
  tags: slugReferenceArray('project-tags', referenceSlugSets['project-tags']),
  mainImageLink: z.string().url().optional(), // Note: NOT "coverImage"
  githubUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  tools: z.array(z.string()).default([]), // Tool names
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  projectId: z.string().optional(),

  // SEO & Webflow
  seo: seoSchema,
  webflow: webflowMetaSchema,
});

/**
 * Old Projects schema
 * Route: N/A (all drafts, not published)
 * Count: 11 items (all draft: true)
 *
 * COMPLETELY DIFFERENT SCHEMA from projects:
 * - Different field set entirely
 * - All items are staged-only drafts in Webflow
 * - Won't generate routes in Phase 3
 */
const oldProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  draft: z.boolean().default(true), // All old-projects are drafts

  // Old project-specific fields
  date: z.string().optional(),
  originalDate: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  image: imageSchema.optional(),
  description: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  readingTime: z.string().optional(),
  isFeatured: z.boolean().optional(),

  // SEO & Webflow
  seo: seoSchema,
  webflow: webflowMetaSchema,
});

// ============================================================================
// Feature Pages Schema (Phase 3H-3)
// ============================================================================

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().optional(),
});

const featureHubSchema = z.object({
  title: z.string(),
  summary: z.string().optional(),
  category: z.string(),
  badge: z.enum(['PRO']).optional(),
  order: z.number().optional(),
});

const featureHeroSchema = z.object({
  deck: z.string(),
  image: imageSchema.optional(),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
});

const valueBlockSchema = z.object({
  kind: z.literal('value'),
  title: z.string(),
  body: z.string().optional(),
  bullets: z.array(z.string()).optional(),
  image: imageSchema.optional(),
  imageSide: z.enum(['left', 'right']).optional(),
});

const complianceBannerBlockSchema = z.object({
  kind: z.literal('complianceBanner'),
  eyebrow: z.string().optional(),
  headline: z.string().optional(),
  body: z.string().optional(),
  badges: z.array(imageSchema).optional(),
});

const featureTestimonialSchema = z.object({
  quote: z.string(),
  name: z.string(),
  title: z.string().optional(),
  avatar: imageSchema.optional(),
  companyLogo: imageSchema.optional(),
});

/**
 * Feature Pages schema
 * Route: /features/<slug>
 * Count: 12 items
 *
 * Highly templated pages: hero → value blocks → testimonial → CTA.
 * Content is structured frontmatter (not markdown body).
 * The security page has an extra complianceBanner block.
 */
const featurePageSchema = baseContentSchema.extend({
  hub: featureHubSchema,
  hero: featureHeroSchema,
  blocks: z.array(z.discriminatedUnion('kind', [
    valueBlockSchema,
    complianceBannerBlockSchema,
  ])),
  testimonial: featureTestimonialSchema.optional(),
  showFinalCta: z.boolean().default(true),
});

// ============================================================================
// Case Studies Schema (Phase 3H-4)
// ============================================================================

const caseStudyHubSchema = z.object({
  cardTitle: z.string(),
  order: z.number().optional(),
  logos: z.array(imageSchema).default([]),
});

const caseStudySidebarSchema = z.object({
  company: z.string(),
  website: z.object({
    label: z.string(),
    href: z.string().url(),
  }).optional(),
  mlTeamSize: z.string().optional(),
  cloudProvider: z.string().optional(),
  industry: z.string().optional(),
  useCases: z.array(z.string()).default([]),
  pdfDownload: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
});

/**
 * Case Studies schema
 * Route: /case-study/<slug>
 * Count: 5 items
 *
 * Body-driven: long-form narrative in markdown body (like /compare/[slug]).
 * Structured frontmatter for hero, sidebar, and hub card chrome.
 */
const caseStudySchema = baseContentSchema.extend({
  hub: caseStudyHubSchema,
  hero: z.object({
    logos: z.array(imageSchema).default([]),
  }),
  sidebar: caseStudySidebarSchema,
});

// ============================================================================
// VS Category Pages Schema (Phase 3H-4)
// ============================================================================

const vsHeroSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  deck: z.string().optional(),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
  compareCategory: z.string(),
});

const vsIntroBlockSchema = z.object({
  kind: z.literal('intro'),
  body: z.string(),
});

const vsTestimonialBlockSchema = z.object({
  kind: z.literal('testimonial'),
  quote: z.string(),
  name: z.string(),
  title: z.string().optional(),
  avatar: imageSchema.optional(),
  companyLogo: imageSchema.optional(),
});

const vsRelatedCompareBlockSchema = z.object({
  kind: z.literal('relatedCompare'),
  eyebrow: z.string().optional(),
  headline: z.string().optional(),
});

const vsCta02BlockSchema = z.object({
  kind: z.literal('cta02'),
  headline: z.string(),
  bullets: z.array(z.string()).default([]),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
  image: imageSchema.optional(),
});

/**
 * VS Category Pages schema
 * Route: /vs/<slug>
 * Count: 3 items
 *
 * Block-driven: structured sections with discriminated union (like feature pages).
 * The relatedCompare block triggers dynamic lookup from the compare collection.
 */
const vsPageSchema = baseContentSchema.extend({
  hero: vsHeroSchema,
  blocks: z.array(z.discriminatedUnion('kind', [
    vsIntroBlockSchema,
    valueBlockSchema,
    vsTestimonialBlockSchema,
    vsRelatedCompareBlockSchema,
    vsCta02BlockSchema,
  ])),
});

// ============================================================================
// Collection Definitions (Astro v5 with glob loaders)
// ============================================================================

/**
 * Export all collections with glob loaders
 * Astro v5 requires explicit loader configuration for each collection
 *
 * NOTE: Main collection loaders are commented out until Phase 2F (Copy MDX files to src/content/)
 */
export const collections = {
  // Reference collections (Phase 2D)
  authors: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
    schema: authorSchema,
  }),
  categories: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
    schema: categorySchema,
  }),
  tags: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/tags' }),
    schema: tagSchema,
  }),
  'llmops-tags': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/llmops-tags' }),
    schema: llmopsTagSchema,
  }),
  'industry-tags': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/industry-tags' }),
    schema: industryTagSchema,
  }),
  'project-tags': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/project-tags' }),
    schema: projectTagSchema,
  }),
  'product-categories': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/product-categories' }),
    schema: productCategorySchema,
  }),
  'integration-types': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/integration-types' }),
    schema: integrationTypeSchema,
  }),
  advantages: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/advantages' }),
    schema: advantageSchema,
  }),
  quotes: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/quotes' }),
    schema: quoteSchema,
  }),

  // Main collection loaders (Phase 2F)
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: blogSchema,
  }),
  integrations: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/integrations' }),
    schema: integrationSchema,
  }),
  'llmops-database': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/llmops-database' }),
    schema: llmopsSchema,
  }),
  compare: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/compare' }),
    schema: compareSchema,
  }),
  team: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
    schema: teamSchema,
  }),
  projects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: projectSchema,
  }),
  'old-projects': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/old-projects' }),
    schema: oldProjectSchema,
  }),
  'feature-pages': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/feature-pages' }),
    schema: featurePageSchema,
  }),
  'case-studies': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
    schema: caseStudySchema,
  }),
  'vs-pages': defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/vs-pages' }),
    schema: vsPageSchema,
  }),
};
