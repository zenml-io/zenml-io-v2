/**
 * Phase 2C: Export Reference Collections
 *
 * Exports reference collections (authors, tags, categories, etc.) from Webflow
 * Phase 1 export as minimal MDX files for Astro Content Collections.
 *
 * Input: design/migration/phase1/runs/2026-02-11T0626Z/webflow/items/<collection>/live.json
 * Output: src/content/<collection>/<slug>.mdx
 */

import * as fs from "node:fs/promises";
import * as path from "node:path";

// ============================================================================
// Configuration
// ============================================================================

const RUN_ID = "2026-02-11T0626Z";
const BASE_INPUT_DIR = `design/migration/phase1/runs/${RUN_ID}/webflow/items`;
const BASE_OUTPUT_DIR = "src/content";
const URL_MAP_PATH = `design/migration/phase1/runs/${RUN_ID}/r2/url-map.json`;

/**
 * Reference collection configuration
 * Maps Webflow collection names to Astro collection directories and field extractors
 */
const REFERENCE_COLLECTIONS = [
  {
    webflowName: "author",
    astroDir: "authors",
    extractFields: (fd: any) => ({
      name: fd.name,
      slug: fd.slug,
      avatar: fd.avatar,
      bio: fd.bio || fd.about,
      email: fd.email,
      linkedin: fd.linkedin,
    }),
  },
  {
    webflowName: "category",
    astroDir: "categories",
    extractFields: (fd: any) => ({
      name: fd.name,
      slug: fd.slug,
    }),
  },
  {
    webflowName: "tags",
    astroDir: "tags",
    extractFields: (fd: any) => ({
      name: fd.name,
      slug: fd.slug,
    }),
  },
  {
    webflowName: "llmops-tags",
    astroDir: "llmops-tags",
    extractFields: (fd: any) => ({
      name: fd.name,
      slug: fd.slug,
    }),
  },
  {
    webflowName: "industry-tags",
    astroDir: "industry-tags",
    extractFields: (fd: any) => ({
      name: fd.name,
      slug: fd.slug,
    }),
  },
  {
    webflowName: "integration-type",
    astroDir: "integration-types",
    extractFields: (fd: any) => ({
      name: fd.name,
      slug: fd.slug,
      icon: fd["integration-icon"] || fd.icon,
    }),
  },
  {
    webflowName: "advantages",
    astroDir: "advantages",
    extractFields: (fd: any) => ({
      title: fd.name,
      slug: fd.slug,
      content: fd["advantage-text-2"] || fd["advantage-text"] || fd.content,
      image: fd["advantage-image"],
    }),
  },
  {
    webflowName: "quotes",
    astroDir: "quotes",
    extractFields: (fd: any) => ({
      name: fd.name,
      slug: fd.slug,
      text: fd["quote-text"],
      author: fd["quote-author"],
      position: fd["quote-author-position"],
      avatar: fd.avatar,
      companyLogo: fd["company-logo"] || fd["company-logo-color"],
    }),
  },
  {
    webflowName: "product-categories",
    astroDir: "product-categories",
    extractFields: (fd: any) => ({
      name: fd.name,
      slug: fd.slug,
    }),
  },
  {
    webflowName: "project-tags",
    astroDir: "project-tags",
    extractFields: (fd: any) => ({
      name: fd.name,
      slug: fd.slug,
    }),
  },
];

// ============================================================================
// Types
// ============================================================================

interface WebflowItem {
  id: string;
  cmsLocaleId: string | null;
  lastPublished?: string;
  lastUpdated?: string;
  createdOn?: string;
  isArchived: boolean;
  isDraft: boolean;
  fieldData: Record<string, any>;
}

interface WebflowExport {
  items: WebflowItem[];
}

interface Stats {
  collection: string;
  itemsProcessed: number;
  itemsSkipped: number;
  errors: string[];
}

// ============================================================================
// Main
// ============================================================================

class ReferenceExporter {
  private urlMap: Map<string, string>;
  private stats: Stats[] = [];

  constructor(urlMap: Map<string, string>) {
    this.urlMap = urlMap;
  }

  /**
   * Rewrite Webflow CDN URL to R2 URL
   */
  private rewriteURL(url: string | undefined): string | undefined {
    if (!url) return undefined;
    return this.urlMap.get(url) || url;
  }

  /**
   * Escape YAML special characters in strings
   */
  private escapeYAML(str: string): string {
    if (
      str.includes(":") ||
      str.includes('"') ||
      str.includes("\n") ||
      str.includes("'")
    ) {
      return str.replace(/"/g, '\\"');
    }
    return str;
  }

  /**
   * Generate frontmatter YAML for a reference item
   */
  private generateFrontmatter(
    item: WebflowItem,
    extractedFields: Record<string, any>
  ): string {
    const lines: string[] = [];

    // Add extracted fields (order matters for readability)
    for (const [key, value] of Object.entries(extractedFields)) {
      if (value === undefined || value === null) continue;

      // Handle image objects
      if (
        typeof value === "object" &&
        value !== null &&
        "url" in value &&
        !Array.isArray(value)
      ) {
        const rewrittenUrl = this.rewriteURL(value.url);
        if (rewrittenUrl) {
          lines.push(`${key}:`);
          lines.push(`  url: "${rewrittenUrl}"`);
          if (value.alt) {
            lines.push(`  alt: "${this.escapeYAML(value.alt)}"`);
          }
        }
        continue;
      }

      // Handle strings
      if (typeof value === "string") {
        lines.push(`${key}: "${this.escapeYAML(value)}"`);
        continue;
      }

      // Handle other primitives
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }

    // Add webflow metadata
    lines.push("webflow:");
    lines.push(`  siteId: "64a817a2e7e2208272d1ce30"`);
    lines.push(`  itemId: "${item.id}"`);
    lines.push(`  exportedAt: "${new Date().toISOString()}"`);

    const source = item.isDraft ? "staged-only" : "live";
    lines.push(`  source: "${source}"`);

    if (item.lastPublished) {
      lines.push(`  lastPublished: "${item.lastPublished}"`);
    }
    if (item.lastUpdated) {
      lines.push(`  lastUpdated: "${item.lastUpdated}"`);
    }
    if (item.createdOn) {
      lines.push(`  createdOn: "${item.createdOn}"`);
    }

    return lines.join("\n");
  }

  /**
   * Export a single reference collection
   */
  async exportCollection(config: (typeof REFERENCE_COLLECTIONS)[0]) {
    const stats: Stats = {
      collection: config.astroDir,
      itemsProcessed: 0,
      itemsSkipped: 0,
      errors: [],
    };

    console.log(`\n📦 Exporting ${config.webflowName} → ${config.astroDir}/`);

    try {
      // Read Webflow export
      const inputPath = path.join(
        BASE_INPUT_DIR,
        config.webflowName,
        "live.json"
      );
      const rawData = await fs.readFile(inputPath, "utf-8");
      const data: WebflowExport = JSON.parse(rawData);

      console.log(`   Found ${data.items.length} items`);

      // Create output directory
      const outputDir = path.join(BASE_OUTPUT_DIR, config.astroDir);
      await fs.mkdir(outputDir, { recursive: true });

      // Process each item
      for (const item of data.items) {
        try {
          // Skip archived items
          if (item.isArchived) {
            stats.itemsSkipped++;
            continue;
          }

          // Extract fields using config
          const extractedFields = config.extractFields(item.fieldData);

          // Ensure slug exists
          if (!extractedFields.slug) {
            stats.errors.push(
              `Item ${item.id} missing slug, skipping`
            );
            stats.itemsSkipped++;
            continue;
          }

          // Generate MDX content
          const frontmatter = this.generateFrontmatter(item, extractedFields);
          const mdxContent = `---\n${frontmatter}\n---\n`;

          // Write file
          const filename = `${extractedFields.slug}.mdx`;
          const outputPath = path.join(outputDir, filename);
          await fs.writeFile(outputPath, mdxContent, "utf-8");

          stats.itemsProcessed++;
        } catch (error) {
          stats.errors.push(
            `Item ${item.id}: ${error instanceof Error ? error.message : String(error)}`
          );
          stats.itemsSkipped++;
        }
      }

      console.log(
        `   ✅ Processed ${stats.itemsProcessed} items, skipped ${stats.itemsSkipped}`
      );
      if (stats.errors.length > 0) {
        console.log(`   ⚠️  ${stats.errors.length} errors:`);
        stats.errors.forEach((err) => console.log(`      - ${err}`));
      }
    } catch (error) {
      console.error(
        `   ❌ Failed to export collection: ${error instanceof Error ? error.message : String(error)}`
      );
      stats.errors.push(
        `Collection export failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    this.stats.push(stats);
  }

  /**
   * Export all reference collections
   */
  async exportAll() {
    console.log("🚀 Starting reference collection export...\n");
    console.log(`Input: ${BASE_INPUT_DIR}`);
    console.log(`Output: ${BASE_OUTPUT_DIR}`);

    for (const config of REFERENCE_COLLECTIONS) {
      await this.exportCollection(config);
    }

    // Print summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 EXPORT SUMMARY");
    console.log("=".repeat(60) + "\n");

    let totalProcessed = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    console.log("Collection".padEnd(25) + "Processed".padEnd(12) + "Skipped".padEnd(12) + "Errors");
    console.log("-".repeat(60));

    for (const stat of this.stats) {
      console.log(
        stat.collection.padEnd(25) +
          stat.itemsProcessed.toString().padEnd(12) +
          stat.itemsSkipped.toString().padEnd(12) +
          stat.errors.length.toString()
      );
      totalProcessed += stat.itemsProcessed;
      totalSkipped += stat.itemsSkipped;
      totalErrors += stat.errors.length;
    }

    console.log("-".repeat(60));
    console.log(
      "TOTAL".padEnd(25) +
        totalProcessed.toString().padEnd(12) +
        totalSkipped.toString().padEnd(12) +
        totalErrors.toString()
    );

    console.log("\n✨ Export complete!");
  }
}

// ============================================================================
// Entry Point
// ============================================================================

async function main() {
  try {
    // Load URL map
    console.log("📖 Loading R2 URL map...");
    const urlMapData = await fs.readFile(URL_MAP_PATH, "utf-8");
    const urlMapObj = JSON.parse(urlMapData);
    const urlMap = new Map<string, string>(Object.entries(urlMapObj));
    console.log(`   Loaded ${urlMap.size} URL mappings\n`);

    // Export all collections
    const exporter = new ReferenceExporter(urlMap);
    await exporter.exportAll();

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Export failed:");
    console.error(error);
    process.exit(1);
  }
}

main();
