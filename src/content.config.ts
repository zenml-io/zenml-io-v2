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
 * Creates a slug reference schema with validation
 * Used for relationships between collections (e.g., blog -> author)
 *
 * @param collectionName - Name of the referenced collection (for error messages)
 * @returns Zod schema that validates slug format
 */
export function slugReference(collectionName: string) {
  return z.string().describe(`Slug reference to ${collectionName} collection`);
}

/**
 * Creates an array of slug references
 * Used for many-to-many relationships (e.g., blog -> tags)
 *
 * @param collectionName - Name of the referenced collection
 * @returns Zod schema that validates array of slugs
 */
export function slugReferenceArray(collectionName: string) {
  return z.array(slugReference(collectionName)).default([]);
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
  author: slugReference('authors'),
  category: slugReference('categories'),
  tags: slugReferenceArray('tags'),
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
  integrationType: slugReference('integration-types'),
  logo: imageSchema.optional(),
  shortDescription: z.string().optional(),
  docsUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  mainImage: imageSchema.optional(),
  relatedBlogPosts: z.array(z.string()).default([]), // slug references to blog

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
  llmopsTags: slugReferenceArray('llmops-tags'),
  // Note: industryTags field does NOT exist in actual output
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
  integrationType: slugReference('integration-types').optional(),
  advantages: slugReferenceArray('advantages'),
  quote: slugReference('quotes').optional(),
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
  tags: slugReferenceArray('project-tags'),
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
    loader: glob({ pattern: '**/*.mdx', base: './src/content/authors' }),
    schema: authorSchema,
  }),
  categories: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/categories' }),
    schema: categorySchema,
  }),
  tags: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/tags' }),
    schema: tagSchema,
  }),
  'llmops-tags': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/llmops-tags' }),
    schema: llmopsTagSchema,
  }),
  'industry-tags': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/industry-tags' }),
    schema: industryTagSchema,
  }),
  'project-tags': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/project-tags' }),
    schema: projectTagSchema,
  }),
  'product-categories': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/product-categories' }),
    schema: productCategorySchema,
  }),
  'integration-types': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/integration-types' }),
    schema: integrationTypeSchema,
  }),
  advantages: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/advantages' }),
    schema: advantageSchema,
  }),
  quotes: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/quotes' }),
    schema: quoteSchema,
  }),

  // Main collection loaders will be added in Phase 2F after copying MDX files to src/content/
  // Schemas are defined above: blog, integrations, llmops-database, compare, team, projects, old-projects
};
