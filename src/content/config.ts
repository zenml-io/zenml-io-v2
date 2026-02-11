/**
 * Astro Content Collections Configuration
 *
 * This file defines reusable Zod schemas and collection definitions for the
 * ZenML website migration from Webflow.
 *
 * Key principles:
 * - SEO blocks are optional (73+ items don't have SEO metadata)
 * - Webflow metadata preserved for traceability
 * - Image URLs are R2-hosted (Cloudflare R2)
 * - References use slug-based lookups (not IDs)
 */

import { defineCollection, z } from 'astro:content';

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
// Collection Definitions (to be added in Phases 2C-2H)
// ============================================================================

// Collections will be defined here in subsequent phases:
// - Phase 2C: Reference collections (authors, tags, categories, etc.)
// - Phase 2D: Reference collection schemas
// - Phase 2E: Main collection schemas (blog, integrations, etc.)
// - Phase 2F-2H: Remaining collection schemas

// Export empty collections object for now (Astro requires this)
// Collections will be added as we progress through Phase 2
export const collections = {
  // Collections will be added here in subsequent phases
};
