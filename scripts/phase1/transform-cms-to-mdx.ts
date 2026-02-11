#!/usr/bin/env -S pnpm exec tsx
/**
 * Phase 1H: HTML → MDX transformation
 *
 * Converts CMS rich text fields to MDX with:
 * - Asset URL rewriting (Webflow CDN → R2)
 * - SEO metadata merging from baseline crawl
 * - Reference resolution (IDs → slugs)
 * - Draft detection (staged-only items)
 * - Webflow ID preservation for traceability
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/transform-cms-to-mdx.ts --run-id=2026-02-11T0626Z
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { parseArgs } from "util";
import * as cheerio from "cheerio";
import type { Element, AnyNode } from "domhandler";

// ============================================================================
// Configuration
// ============================================================================

const SITE_ID = "64a817a2e7e2208272d1ce30";
const SITE_URL = "https://www.zenml.io";

// Collection-specific rich text field configuration
const COLLECTION_RICH_TEXT_FIELDS: Record<string, string[]> = {
  blog: ["post-body"], // HTML
  "llmops-database": ["body", "body-fallback-for-manual-entries"], // Markdown!
  integrations: [
    "features-with-zenml",
    "tool-features",
    "code-example",
    "code-explanation",
    "video-embed",
  ], // HTML
  compare: [
    "highlight-zenml-bullet-points",
    "highlight-competitor-bullet-points",
    "comparison-table",
    "zenml-code",
    "competitor-code",
    "cta-bullet-points",
  ], // HTML
  team: ["bullet-points"], // HTML
  projects: ["pipelines", "stack", "details"], // HTML
  "old-projects": ["content"], // HTML
};

// ============================================================================
// Types
// ============================================================================

interface WebflowItem {
  id: string;
  cmsLocaleId: string;
  lastPublished?: string;
  lastUpdated?: string;
  createdOn: string;
  isArchived: boolean;
  isDraft: boolean;
  fieldData: Record<string, unknown>;
}

interface SEOData {
  url: string;
  canonical?: string;
  title?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

interface ReferenceMapEntry {
  id: string;
  slug: string;
  name: string;
  collectionSlug: string;
}

interface TransformResult {
  itemId: string;
  slug: string;
  collectionSlug: string;
  status: "success" | "failed";
  outputPath?: string;
  warnings: string[];
  error?: string;
}

interface TransformManifest {
  runId: string;
  transformedAt: string;
  stats: {
    totalItems: number;
    success: number;
    failed: number;
    totalWarnings: number;
  };
  results: TransformResult[];
}

// ============================================================================
// Main Class
// ============================================================================

class CMSTransformer {
  private runDir: string;
  private runId: string;
  private urlMap: Record<string, string> = {};
  private seoBaseline: Map<string, SEOData> = new Map();
  private referenceMap: Map<string, ReferenceMapEntry> = new Map();
  private manifest: TransformManifest;

  constructor(runId: string) {
    this.runId = runId;
    this.runDir = join(
      process.cwd(),
      "design/migration/phase1/runs",
      runId
    );

    this.manifest = {
      runId,
      transformedAt: new Date().toISOString(),
      stats: { totalItems: 0, success: 0, failed: 0, totalWarnings: 0 },
      results: [],
    };
  }

  /**
   * Main entry point
   */
  async run() {
    this.log("🔄 Starting HTML → MDX transformation");
    this.log(`   Run ID: ${this.runId}`);
    this.log("");

    // Load dependencies
    this.loadURLMap();
    this.loadSEOBaseline();
    this.loadReferenceMap();

    // Get list of collections to process
    const collections = this.getCollectionsToProcess();
    this.log(`📦 Processing ${collections.length} collections`);
    this.log("");

    // Process each collection
    for (const collectionSlug of collections) {
      await this.processCollection(collectionSlug);
    }

    // Save manifest
    this.saveManifest();

    // Summary
    this.log("");
    this.log("✅ Transformation complete!");
    this.log(`   Total items: ${this.manifest.stats.totalItems}`);
    this.log(`   Success: ${this.manifest.stats.success}`);
    this.log(`   Failed: ${this.manifest.stats.failed}`);
    this.log(`   Total warnings: ${this.manifest.stats.totalWarnings}`);
  }

  /**
   * Load URL rewrite map
   */
  private loadURLMap() {
    const urlMapPath = join(this.runDir, "r2/url-map.json");
    this.log(`📖 Loading URL map from ${urlMapPath}`);
    this.urlMap = JSON.parse(readFileSync(urlMapPath, "utf-8"));
    this.log(`   ✓ Loaded ${Object.keys(this.urlMap).length} URL mappings`);
  }

  /**
   * Load SEO baseline for metadata merging
   */
  private loadSEOBaseline() {
    const seoPath = join(this.runDir, "seo/baseline.json");
    this.log(`📖 Loading SEO baseline from ${seoPath}`);

    const data = JSON.parse(readFileSync(seoPath, "utf-8"));
    for (const result of data.results as SEOData[]) {
      // Normalize URL for lookup (strip trailing slash, lowercase)
      const normalizedUrl = result.url.replace(/\/$/, "").toLowerCase();
      this.seoBaseline.set(normalizedUrl, result);
    }
    this.log(`   ✓ Loaded ${this.seoBaseline.size} SEO entries`);
  }

  /**
   * Load reference map for ID → slug resolution
   */
  private loadReferenceMap() {
    const refMapPath = join(this.runDir, "webflow/reference-map.json");
    this.log(`📖 Loading reference map from ${refMapPath}`);

    const data = JSON.parse(readFileSync(refMapPath, "utf-8")) as Record<
      string,
      Omit<ReferenceMapEntry, "id">
    >;

    // The reference map is already keyed by ID
    for (const [id, entry] of Object.entries(data)) {
      this.referenceMap.set(id, { id, ...entry });
    }
    this.log(`   ✓ Loaded ${this.referenceMap.size} reference mappings`);
  }

  /**
   * Get list of collections that need processing
   */
  private getCollectionsToProcess(): string[] {
    return Object.keys(COLLECTION_RICH_TEXT_FIELDS);
  }

  /**
   * Process a single collection
   */
  private async processCollection(collectionSlug: string) {
    this.log(`\n📂 Processing collection: ${collectionSlug}`);

    // Load live and staged items
    const liveItems = this.loadItems(collectionSlug, "live");
    const stagedItems = this.loadItems(collectionSlug, "staged");

    // Determine drafts (staged-only items)
    const liveIds = new Set(liveItems.map((item) => item.id));
    const drafts = stagedItems.filter((item) => !liveIds.has(item.id));

    this.log(
      `   Live items: ${liveItems.length}, Drafts: ${drafts.length}`
    );

    // Create output directory
    const outputDir = join(
      this.runDir,
      "transform/collections",
      collectionSlug
    );
    mkdirSync(outputDir, { recursive: true });

    // Process live items
    for (const item of liveItems) {
      await this.transformItem(item, collectionSlug, outputDir, false);
    }

    // Process draft items
    for (const item of drafts) {
      await this.transformItem(item, collectionSlug, outputDir, true);
    }
  }

  /**
   * Load items from live or staged export
   */
  private loadItems(
    collectionSlug: string,
    source: "live" | "staged"
  ): WebflowItem[] {
    const itemsPath = join(
      this.runDir,
      `webflow/items/${collectionSlug}/${source}.json`
    );

    try {
      const data = JSON.parse(readFileSync(itemsPath, "utf-8"));
      return data.items || [];
    } catch (error) {
      this.log(`   ⚠️  Could not load ${source} items: ${error}`);
      return [];
    }
  }

  /**
   * Transform a single item to MDX
   */
  private async transformItem(
    item: WebflowItem,
    collectionSlug: string,
    outputDir: string,
    isDraft: boolean
  ) {
    this.manifest.stats.totalItems++;

    const warnings: string[] = [];
    const slug = item.fieldData.slug as string;
    const name = item.fieldData.name as string;

    try {
      // Get rich text fields for this collection
      const richTextFields =
        COLLECTION_RICH_TEXT_FIELDS[collectionSlug] || [];

      // Convert rich text fields to MDX
      let bodyContent = "";
      for (const fieldName of richTextFields) {
        const fieldValue = item.fieldData[fieldName];
        if (fieldValue && typeof fieldValue === "string") {
          // Check if this is Markdown or HTML
          const isMarkdown = collectionSlug === "llmops-database";

          if (isMarkdown) {
            // Light cleanup only for Markdown
            bodyContent += this.cleanupMarkdown(fieldValue, warnings);
          } else {
            // Full HTML → MDX conversion
            bodyContent += this.convertHTMLToMDX(fieldValue, warnings);
          }
        }
      }

      // Get SEO metadata
      const seoData = this.getSEOData(collectionSlug, slug);

      // Generate frontmatter
      const frontmatter = this.generateFrontmatter(
        item,
        collectionSlug,
        isDraft,
        seoData,
        warnings
      );

      // Combine frontmatter + body
      const mdxContent = `---\n${frontmatter}\n---\n\n${bodyContent}`;

      // Write MDX file (filename = slug only, no Webflow ID)
      // IMPORTANT: Astro derives entry slug from FILENAME, not frontmatter
      const filename = `${slug}.mdx`;
      const outputPath = join(outputDir, filename);
      writeFileSync(outputPath, mdxContent, "utf-8");

      // Track success
      this.manifest.results.push({
        itemId: item.id,
        slug,
        collectionSlug,
        status: "success",
        outputPath,
        warnings,
      });
      this.manifest.stats.success++;
      this.manifest.stats.totalWarnings += warnings.length;

      if (warnings.length > 0) {
        this.log(
          `   ⚠️  ${name} (${slug}): ${warnings.length} warnings`
        );
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : String(error);
      this.log(`   ❌ Failed to transform ${name} (${slug}): ${errorMsg}`);

      this.manifest.results.push({
        itemId: item.id,
        slug,
        collectionSlug,
        status: "failed",
        warnings,
        error: errorMsg,
      });
      this.manifest.stats.failed++;
    }
  }

  /**
   * Generate frontmatter YAML
   */
  private generateFrontmatter(
    item: WebflowItem,
    collectionSlug: string,
    isDraft: boolean,
    seoData: SEOData | null,
    warnings: string[]
  ): string {
    const lines: string[] = [];

    // Basic fields
    const name = item.fieldData.name as string;
    const slug = item.fieldData.slug as string;

    lines.push(`title: "${this.escapeYAML(name)}"`);
    lines.push(`slug: "${slug}"`);
    lines.push(`draft: ${isDraft}`);

    // Webflow metadata
    lines.push(`webflow:`);
    lines.push(`  siteId: "${SITE_ID}"`);
    // Only include collectionId if not null (avoid string "null")
    if (item.cmsLocaleId) {
      lines.push(`  collectionId: "${item.cmsLocaleId}"`);
    }
    lines.push(`  itemId: "${item.id}"`);
    lines.push(`  exportedAt: "${this.manifest.transformedAt}"`);
    lines.push(
      `  source: "${isDraft ? "staged-only" : "live"}"`
    );
    if (item.lastPublished) {
      lines.push(`  lastPublished: "${item.lastPublished}"`);
    }
    if (item.lastUpdated) {
      lines.push(`  lastUpdated: "${item.lastUpdated}"`);
    }
    lines.push(`  createdOn: "${item.createdOn}"`);

    // Collection-specific fields with reference resolution
    this.addCollectionSpecificFields(
      lines,
      item,
      collectionSlug,
      warnings
    );

    // SEO metadata
    if (seoData) {
      lines.push(`seo:`);
      if (seoData.title) {
        lines.push(`  title: "${this.escapeYAML(seoData.title)}"`);
      }
      if (seoData.metaDescription) {
        lines.push(
          `  description: "${this.escapeYAML(seoData.metaDescription)}"`
        );
      }
      if (seoData.canonical) {
        lines.push(`  canonical: "${seoData.canonical}"`);
      }
      if (seoData.ogImage) {
        const rewrittenOgImage = this.rewriteURL(seoData.ogImage);
        lines.push(`  ogImage: "${rewrittenOgImage}"`);
      }
      if (seoData.ogTitle) {
        lines.push(`  ogTitle: "${this.escapeYAML(seoData.ogTitle)}"`);
      }
      if (seoData.ogDescription) {
        lines.push(
          `  ogDescription: "${this.escapeYAML(seoData.ogDescription)}"`
        );
      }
    } else {
      warnings.push("No SEO metadata found in baseline");
    }

    return lines.join("\n");
  }

  /**
   * Add collection-specific fields to frontmatter
   */
  private addCollectionSpecificFields(
    lines: string[],
    item: WebflowItem,
    collectionSlug: string,
    warnings: string[]
  ) {
    const fd = item.fieldData;

    // Blog-specific fields
    if (collectionSlug === "blog") {
      if (fd.author && typeof fd.author === "string") {
        const authorRef = this.referenceMap.get(fd.author);
        if (authorRef) {
          lines.push(`author: "${authorRef.slug}"`);
        } else {
          warnings.push(`Could not resolve author ID: ${fd.author}`);
        }
      }

      if (fd.category && typeof fd.category === "string") {
        const categoryRef = this.referenceMap.get(fd.category);
        if (categoryRef) {
          lines.push(`category: "${categoryRef.slug}"`);
        } else {
          warnings.push(`Could not resolve category ID: ${fd.category}`);
        }
      }

      if (Array.isArray(fd.tags)) {
        const tagSlugs = fd.tags
          .map((tagId) => {
            const ref = this.referenceMap.get(tagId);
            if (!ref) {
              warnings.push(`Could not resolve tag ID: ${tagId}`);
            }
            return ref?.slug;
          })
          .filter(Boolean);

        if (tagSlugs.length > 0) {
          lines.push(`tags:`);
          tagSlugs.forEach((slug) => lines.push(`  - "${slug}"`));
        }
      }

      if (fd.date) {
        lines.push(`date: "${fd.date}"`);
      }

      if (fd["reading-time"]) {
        lines.push(`readingTime: ${fd["reading-time"]}`);
      }

      if (fd.featured) {
        lines.push(`featured: ${fd.featured}`);
      }

      if (fd["main-image"] && typeof fd["main-image"] === "object") {
        const mainImage = fd["main-image"] as { url?: string; alt?: string };
        if (mainImage.url) {
          const rewrittenUrl = this.rewriteURL(mainImage.url);
          lines.push(`mainImage:`);
          lines.push(`  url: "${rewrittenUrl}"`);
          if (mainImage.alt) {
            lines.push(`  alt: "${this.escapeYAML(mainImage.alt)}"`);
          }
        }
      }
    }

    // LLMOps-specific fields
    if (collectionSlug === "llmops-database") {
      // FIX: Webflow uses "tags" not "llmops-tags"
      if (Array.isArray(fd["tags"])) {
        const tagSlugs = fd["tags"]
          .map((tagId) => {
            const ref = this.referenceMap.get(tagId);
            if (!ref) {
              warnings.push(`Could not resolve llmops-tag ID: ${tagId}`);
            }
            return ref?.slug;
          })
          .filter(Boolean);

        if (tagSlugs.length > 0) {
          lines.push(`llmopsTags:`);
          tagSlugs.forEach((slug) => lines.push(`  - "${slug}"`));
        }
      }

      // FIX: Webflow uses "industry" as a single ID (not array like tags)
      if (typeof fd["industry"] === "string" && fd["industry"]) {
        const ref = this.referenceMap.get(fd["industry"]);
        if (ref) {
          lines.push(`industryTags: "${ref.slug}"`);
        } else {
          warnings.push(`Could not resolve industry-tag ID: ${fd["industry"]}`);
        }
      }

      // Other LLMOps fields
      if (fd.company) {
        lines.push(`company: "${this.escapeYAML(String(fd.company))}"`);
      }
      if (fd.summary) {
        lines.push(`summary: "${this.escapeYAML(String(fd.summary))}"`);
      }
      if (fd.link) {
        lines.push(`link: "${fd.link}"`);
      }
      if (fd.year) {
        lines.push(`year: ${fd.year}`);
      }
    }

    // Integrations-specific fields
    if (collectionSlug === "integrations") {
      if (fd["integration-type-2"] && typeof fd["integration-type-2"] === "string") {
        const typeRef = this.referenceMap.get(fd["integration-type-2"]);
        if (typeRef) {
          lines.push(`integrationType: "${typeRef.slug}"`);
        } else {
          warnings.push(`Could not resolve integration-type ID: ${fd["integration-type-2"]}`);
        }
      }

      if (fd["integration-logo"] && typeof fd["integration-logo"] === "object") {
        const logo = fd["integration-logo"] as { url?: string; alt?: string };
        if (logo.url) {
          const rewrittenUrl = this.rewriteURL(logo.url);
          lines.push(`logo:`);
          lines.push(`  url: "${rewrittenUrl}"`);
          if (logo.alt) {
            lines.push(`  alt: "${this.escapeYAML(logo.alt)}"`);
          }
        }
      }

      if (fd["short-description"]) {
        lines.push(`shortDescription: "${this.escapeYAML(String(fd["short-description"]))}"`);
      }

      if (fd["docs-url"]) {
        lines.push(`docsUrl: "${fd["docs-url"]}"`);
      }

      if (fd["github-url"]) {
        lines.push(`githubUrl: "${fd["github-url"]}"`);
      }

      if (fd["main-image"] && typeof fd["main-image"] === "object") {
        const mainImage = fd["main-image"] as { url?: string; alt?: string };
        if (mainImage.url) {
          const rewrittenUrl = this.rewriteURL(mainImage.url);
          lines.push(`mainImage:`);
          lines.push(`  url: "${rewrittenUrl}"`);
          if (mainImage.alt) {
            lines.push(`  alt: "${this.escapeYAML(mainImage.alt)}"`);
          }
        }
      }

      if (Array.isArray(fd["related-blog-posts"])) {
        const blogPostSlugs = fd["related-blog-posts"]
          .map((postId) => {
            const ref = this.referenceMap.get(postId);
            if (!ref) {
              warnings.push(`Could not resolve related-blog-post ID: ${postId}`);
            }
            return ref?.slug;
          })
          .filter(Boolean);

        if (blogPostSlugs.length > 0) {
          lines.push(`relatedBlogPosts:`);
          blogPostSlugs.forEach((slug) => lines.push(`  - "${slug}"`));
        }
      }
    }

    // Compare (VS pages) specific fields
    if (collectionSlug === "compare") {
      if (fd["tool-name"]) {
        lines.push(`toolName: "${this.escapeYAML(String(fd["tool-name"]))}"`);
      }

      if (fd["tool-icon"] && typeof fd["tool-icon"] === "object") {
        const icon = fd["tool-icon"] as { url?: string; alt?: string };
        if (icon.url) {
          const rewrittenUrl = this.rewriteURL(icon.url);
          lines.push(`toolIcon:`);
          lines.push(`  url: "${rewrittenUrl}"`);
          if (icon.alt) {
            lines.push(`  alt: "${this.escapeYAML(icon.alt)}"`);
          }
        }
      }

      if (fd.category && typeof fd.category === "string") {
        const categoryRef = this.referenceMap.get(fd.category);
        if (categoryRef) {
          lines.push(`category: "${categoryRef.slug}"`);
        } else {
          warnings.push(`Could not resolve category ID: ${fd.category}`);
        }
      }

      if (fd["integration-type"] && typeof fd["integration-type"] === "string") {
        const typeRef = this.referenceMap.get(fd["integration-type"]);
        if (typeRef) {
          lines.push(`integrationType: "${typeRef.slug}"`);
        } else {
          warnings.push(`Could not resolve integration-type ID: ${fd["integration-type"]}`);
        }
      }

      if (Array.isArray(fd["advantages-2"])) {
        const advantageSlugs = fd["advantages-2"]
          .map((advId) => {
            const ref = this.referenceMap.get(advId);
            if (!ref) {
              warnings.push(`Could not resolve advantage ID: ${advId}`);
            }
            return ref?.slug;
          })
          .filter(Boolean);

        if (advantageSlugs.length > 0) {
          lines.push(`advantages:`);
          advantageSlugs.forEach((slug) => lines.push(`  - "${slug}"`));
        }
      }

      if (fd["quote-2"] && typeof fd["quote-2"] === "string") {
        const quoteRef = this.referenceMap.get(fd["quote-2"]);
        if (quoteRef) {
          lines.push(`quote: "${quoteRef.slug}"`);
        } else {
          warnings.push(`Could not resolve quote ID: ${fd["quote-2"]}`);
        }
      }

      if (fd.headline) {
        lines.push(`headline: "${this.escapeYAML(String(fd.headline))}"`);
      }

      if (fd["hero-text"]) {
        lines.push(`heroText: "${this.escapeYAML(String(fd["hero-text"]))}"`);
      }

      if (fd["cta-headline"]) {
        lines.push(`ctaHeadline: "${this.escapeYAML(String(fd["cta-headline"]))}"`);
      }

      if (fd["learn-more-url"]) {
        lines.push(`learnMoreUrl: "${fd["learn-more-url"]}"`);
      }

      if (fd["seo-description"]) {
        lines.push(`seoDescription: "${this.escapeYAML(String(fd["seo-description"]))}"`);
      }

      if (fd["open-graph-image"] && typeof fd["open-graph-image"] === "object") {
        const ogImage = fd["open-graph-image"] as { url?: string; alt?: string };
        if (ogImage.url) {
          const rewrittenUrl = this.rewriteURL(ogImage.url);
          lines.push(`openGraphImage:`);
          lines.push(`  url: "${rewrittenUrl}"`);
          if (ogImage.alt) {
            lines.push(`  alt: "${this.escapeYAML(ogImage.alt)}"`);
          }
        }
      }
    }

    // Team-specific fields
    if (collectionSlug === "team") {
      if (fd.position) {
        lines.push(`position: "${this.escapeYAML(String(fd.position))}"`);
      }

      if (fd.photo && typeof fd.photo === "object") {
        const photo = fd.photo as { url?: string; alt?: string };
        if (photo.url) {
          const rewrittenUrl = this.rewriteURL(photo.url);
          lines.push(`photo:`);
          lines.push(`  url: "${rewrittenUrl}"`);
          if (photo.alt) {
            lines.push(`  alt: "${this.escapeYAML(photo.alt)}"`);
          }
        }
      }

      if (fd.email) {
        lines.push(`email: "${fd.email}"`);
      }

      if (fd.linkedin) {
        lines.push(`linkedin: "${fd.linkedin}"`);
      }

      if (fd.order !== undefined) {
        lines.push(`order: ${fd.order}`);
      }
    }

    // Projects-specific fields
    if (collectionSlug === "projects") {
      if (fd.description) {
        lines.push(`description: "${this.escapeYAML(String(fd.description))}"`);
      }

      if (fd["github-url"]) {
        lines.push(`githubUrl: "${fd["github-url"]}"`);
      }

      if (fd["main-image-link"]) {
        lines.push(`mainImageLink: "${fd["main-image-link"]}"`);
      }

      if (fd["preview-image"] && typeof fd["preview-image"] === "object") {
        const previewImage = fd["preview-image"] as { url?: string; alt?: string };
        if (previewImage.url) {
          const rewrittenUrl = this.rewriteURL(previewImage.url);
          lines.push(`previewImage:`);
          lines.push(`  url: "${rewrittenUrl}"`);
          if (previewImage.alt) {
            lines.push(`  alt: "${this.escapeYAML(previewImage.alt)}"`);
          }
        }
      }

      if (Array.isArray(fd.tags)) {
        const tagSlugs = fd.tags
          .map((tagId) => {
            const ref = this.referenceMap.get(tagId);
            if (!ref) {
              warnings.push(`Could not resolve project-tag ID: ${tagId}`);
            }
            return ref?.slug;
          })
          .filter(Boolean);

        if (tagSlugs.length > 0) {
          lines.push(`tags:`);
          tagSlugs.forEach((slug) => lines.push(`  - "${slug}"`));
        }
      }

      if (Array.isArray(fd.tools)) {
        const toolSlugs = fd.tools
          .map((toolId) => {
            const ref = this.referenceMap.get(toolId);
            if (!ref) {
              warnings.push(`Could not resolve tool ID: ${toolId}`);
            }
            return ref?.slug;
          })
          .filter(Boolean);

        if (toolSlugs.length > 0) {
          lines.push(`tools:`);
          toolSlugs.forEach((slug) => lines.push(`  - "${slug}"`));
        }
      }

      if (fd["created-at"]) {
        lines.push(`createdAt: "${fd["created-at"]}"`);
      }

      if (fd["updated-at"]) {
        lines.push(`updatedAt: "${fd["updated-at"]}"`);
      }

      if (fd["project-id"]) {
        lines.push(`projectId: "${fd["project-id"]}"`);
      }
    }

    // Old-projects-specific fields
    if (collectionSlug === "old-projects") {
      if (fd.date) {
        lines.push(`date: "${fd.date}"`);
      }

      if (fd["original-date"]) {
        lines.push(`originalDate: "${fd["original-date"]}"`);
      }

      if (fd.category && typeof fd.category === "string") {
        const categoryRef = this.referenceMap.get(fd.category);
        if (categoryRef) {
          lines.push(`category: "${categoryRef.slug}"`);
        } else {
          warnings.push(`Could not resolve category ID: ${fd.category}`);
        }
      }

      if (Array.isArray(fd.tags)) {
        const tagSlugs = fd.tags
          .map((tagId) => {
            const ref = this.referenceMap.get(tagId);
            if (!ref) {
              warnings.push(`Could not resolve project-category tag ID: ${tagId}`);
            }
            return ref?.slug;
          })
          .filter(Boolean);

        if (tagSlugs.length > 0) {
          lines.push(`tags:`);
          tagSlugs.forEach((slug) => lines.push(`  - "${slug}"`));
        }
      }

      if (fd.image && typeof fd.image === "object") {
        const image = fd.image as { url?: string; alt?: string };
        if (image.url) {
          const rewrittenUrl = this.rewriteURL(image.url);
          lines.push(`image:`);
          lines.push(`  url: "${rewrittenUrl}"`);
          if (image.alt) {
            lines.push(`  alt: "${this.escapeYAML(image.alt)}"`);
          }
        }
      }

      if (fd.description) {
        lines.push(`description: "${this.escapeYAML(String(fd.description))}"`);
      }

      if (fd["seo-title"]) {
        lines.push(`seoTitle: "${this.escapeYAML(String(fd["seo-title"]))}"`);
      }

      if (fd["seo-description"]) {
        lines.push(`seoDescription: "${this.escapeYAML(String(fd["seo-description"]))}"`);
      }

      if (fd["reading-time"]) {
        lines.push(`readingTime: ${fd["reading-time"]}`);
      }

      if (fd["is-featured"]) {
        lines.push(`isFeatured: ${fd["is-featured"]}`);
      }
    }
  }

  /**
   * Get SEO data for an item
   */
  private getSEOData(
    collectionSlug: string,
    slug: string
  ): SEOData | null {
    // Construct expected URL based on collection
    let expectedUrl = `${SITE_URL}`;

    if (collectionSlug === "blog") {
      expectedUrl += `/blog/${slug}`;
    } else if (collectionSlug === "llmops-database") {
      expectedUrl += `/llmops-database/${slug}`;
    } else if (collectionSlug === "compare") {
      expectedUrl += `/compare/${slug}`;
    } else if (collectionSlug === "integrations") {
      expectedUrl += `/integrations/${slug}`;
    } else if (collectionSlug === "team") {
      expectedUrl += `/team/${slug}`;
    } else if (collectionSlug === "projects") {
      expectedUrl += `/projects/${slug}`;
    }

    const normalizedUrl = expectedUrl.toLowerCase();
    return this.seoBaseline.get(normalizedUrl) || null;
  }

  /**
   * Convert HTML to MDX
   */
  private convertHTMLToMDX(html: string, warnings: string[]): string {
    const $ = cheerio.load(html, {
      xmlMode: false,
    });

    let mdx = "";

    // Process top-level elements
    $("body > *").each((i, elem) => {
      mdx += this.convertElement($, elem, warnings) + "\n\n";
    });

    return mdx.trim();
  }

  /**
   * Convert a single HTML element to MDX
   */
  private convertElement(
    $: cheerio.CheerioAPI,
    elem: Element,
    warnings: string[]
  ): string {
    const $elem = $(elem);
    const tagName = elem.type === "tag" ? elem.name : "";

    // Headings
    if (tagName.match(/^h[1-6]$/)) {
      const level = tagName[1];
      const text = $elem.text().trim();
      return `${"#".repeat(Number(level))} ${text}`;
    }

    // Paragraphs
    if (tagName === "p") {
      return this.processInlineContent($, $elem, warnings);
    }

    // Code blocks (Webflow pattern: <pre><code fs-codehighlight-element="code">)
    if (tagName === "pre") {
      const code = $elem.find('code[fs-codehighlight-element="code"]');
      if (code.length > 0) {
        const language =
          code.attr("fs-codehighlight-language") || "";
        const codeText = code.text();
        return `\`\`\`${language}\n${codeText}\n\`\`\``;
      }
      // Fallback: preserve as-is
      return $.html($elem);
    }

    // Figures (images with captions)
    if (
      tagName === "figure" &&
      $elem.hasClass("w-richtext-figure-type-image")
    ) {
      const img = $elem.find("img");
      const figcaption = $elem.find("figcaption");

      if (img.length > 0) {
        const src = this.rewriteURL(img.attr("src") || "");
        const alt = img.attr("alt") || "";
        const caption = figcaption.text().trim();

        let mdx = "<figure>\n";
        mdx += `  <img src="${src}" alt="${this.escapeHTML(alt)}" />\n`;
        if (caption) {
          mdx += `  <figcaption>${this.escapeHTML(caption)}</figcaption>\n`;
        }
        mdx += "</figure>";
        return mdx;
      }
    }

    // Tables (preserve as HTML)
    if (tagName === "table" || $elem.attr("data-rt-embed-type") === "true") {
      // Rewrite URLs in the HTML
      $elem.find("img").each((i, img) => {
        const $img = $(img);
        const src = $img.attr("src");
        if (src) {
          $img.attr("src", this.rewriteURL(src));
        }
      });

      return $.html($elem);
    }

    // Lists
    if (tagName === "ul" || tagName === "ol") {
      return $.html($elem); // Preserve HTML for now
    }

    // Blockquotes
    if (tagName === "blockquote") {
      const text = $elem.text().trim();
      return `> ${text}`;
    }

    // Iframes and embeds (preserve as-is)
    if (tagName === "iframe" || tagName === "video") {
      return $.html($elem);
    }

    // Divs and other containers
    if (tagName === "div") {
      // If it contains special embeds, preserve as HTML
      if ($elem.attr("data-rt-embed-type")) {
        return $.html($elem);
      }

      // Otherwise, process children
      let content = "";
      $elem.children().each((i, child) => {
        content += this.convertElement($, child, warnings) + "\n";
      });
      return content.trim();
    }

    // Fallback: preserve as HTML
    warnings.push(`Unknown element type: ${tagName}`);
    return $.html($elem);
  }

  /**
   * Process inline content (links, code, strong, em, etc.)
   */
  private processInlineContent(
    $: cheerio.CheerioAPI,
    $elem: cheerio.Cheerio<Element>,
    warnings: string[]
  ): string {
    let text = "";

    $elem.contents().each((i, node) => {
      if (node.type === "text") {
        text += node.data || "";
      } else if (node.type === "tag") {
        const $node = $(node);
        const tagName = node.name;

        if (tagName === "a") {
          const href = this.rewriteURL($node.attr("href") || "");
          const linkText = $node.text();
          text += `[${linkText}](${href})`;
        } else if (tagName === "code") {
          text += `\`${$node.text()}\``;
        } else if (tagName === "strong") {
          text += `**${$node.text()}**`;
        } else if (tagName === "em") {
          text += `*${$node.text()}*`;
        } else if (tagName === "img") {
          const src = this.rewriteURL($node.attr("src") || "");
          const alt = $node.attr("alt") || "";
          text += `![${alt}](${src})`;
        } else {
          // Fallback: just get text
          text += $node.text();
        }
      }
    });

    return text;
  }

  /**
   * Cleanup Markdown content (for LLMOps database)
   */
  private cleanupMarkdown(markdown: string, warnings: string[]): string {
    // Rewrite asset URLs in Markdown
    let cleaned = markdown;

    // Match Markdown images: ![alt](url)
    cleaned = cleaned.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, alt, url) => {
        const rewritten = this.rewriteURL(url);
        return `![${alt}](${rewritten})`;
      }
    );

    // Match Markdown links: [text](url)
    cleaned = cleaned.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, text, url) => {
        const rewritten = this.rewriteURL(url);
        return `[${text}](${rewritten})`;
      }
    );

    // Match HTML img tags in Markdown: <img src="url" ...>
    cleaned = cleaned.replace(
      /<img\s+([^>]*\s+)?src="([^"]+)"([^>]*)>/gi,
      (match, before, url, after) => {
        const rewritten = this.rewriteURL(url);
        return `<img ${before || ""}src="${rewritten}"${after}>`;
      }
    );

    return cleaned;
  }

  /**
   * Rewrite URL using URL map if it's a Webflow CDN URL
   */
  private rewriteURL(url: string): string {
    if (!url) return url;

    // Check if it's a Webflow CDN URL
    if (
      url.includes("cdn.prod.website-files.com") ||
      url.includes("uploads-ssl.webflow.com") ||
      url.includes("d3e54v103j8qbb.cloudfront.net")
    ) {
      // Look up in URL map
      const rewritten = this.urlMap[url];
      if (rewritten) {
        return rewritten;
      } else {
        // Warn if not found (might be a new asset not in the map)
        this.log(`   ⚠️  URL not found in map: ${url}`);
      }
    }

    return url;
  }

  /**
   * Escape YAML string values
   */
  private escapeYAML(str: string): string {
    return str.replace(/"/g, '\\"');
  }

  /**
   * Escape HTML attribute values
   */
  private escapeHTML(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Save transform manifest
   */
  private saveManifest() {
    const manifestPath = join(
      this.runDir,
      "transform/transform-manifest.json"
    );
    writeFileSync(
      manifestPath,
      JSON.stringify(this.manifest, null, 2),
      "utf-8"
    );
    this.log(`\n💾 Saved manifest to ${manifestPath}`);
  }

  /**
   * Log helper
   */
  private log(message: string) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }
}

// ============================================================================
// CLI Entry Point
// ============================================================================

async function main() {
  const { values } = parseArgs({
    options: {
      "run-id": { type: "string" },
    },
  });

  const runId = values["run-id"];
  if (!runId) {
    console.error("Error: --run-id is required");
    console.error(
      "Usage: pnpm exec tsx scripts/phase1/transform-cms-to-mdx.ts --run-id=2026-02-11T0626Z"
    );
    process.exit(1);
  }

  const transformer = new CMSTransformer(runId);
  await transformer.run();
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
