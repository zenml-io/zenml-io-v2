#!/usr/bin/env -S pnpm exec tsx
/**
 * Phase 1I: Auto-redirect generation
 *
 * Compares two runs (Run A and Run B) to detect:
 * - Slug changes: Same Webflow ID, different slug → redirect old → new
 * - Deletions: Item in Run A but not in Run B → redirect to collection listing
 *
 * This script is run BETWEEN migrations to capture content changes.
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/generate-auto-redirects.ts \
 *     --run-a=2026-02-11T0626Z \
 *     --run-b=2026-02-15T1000Z
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { parseArgs } from "util";

// ============================================================================
// Types
// ============================================================================

interface WebflowItem {
  id: string;
  fieldData: {
    slug?: string;
    name?: string;
  };
}

interface AutoRedirect {
  source: string;
  target: string;
  statusCode: number;
  reason: "slug-change" | "deletion";
  itemId: string;
  collectionSlug: string;
  oldSlug?: string;
  newSlug?: string;
}

interface AutoRedirectManifest {
  runA: string;
  runB: string;
  generatedAt: string;
  stats: {
    slugChanges: number;
    deletions: number;
    total: number;
  };
  redirects: AutoRedirect[];
}

// ============================================================================
// Collection URL Patterns
// ============================================================================

const COLLECTION_URL_PATTERNS: Record<string, string> = {
  blog: "/blog",
  "llmops-database": "/llmops-database",
  integrations: "/integrations",
  compare: "/compare",
  team: "/team",
  projects: "/projects",
  "old-projects": "/projects", // Redirect to new projects listing
};

// ============================================================================
// Main Class
// ============================================================================

class AutoRedirectGenerator {
  private runADir: string;
  private runBDir: string;
  private manifest: AutoRedirectManifest;

  constructor(runA: string, runB: string) {
    this.runADir = join(
      process.cwd(),
      "design/migration/phase1/runs",
      runA
    );
    this.runBDir = join(
      process.cwd(),
      "design/migration/phase1/runs",
      runB
    );

    this.manifest = {
      runA,
      runB,
      generatedAt: new Date().toISOString(),
      stats: { slugChanges: 0, deletions: 0, total: 0 },
      redirects: [],
    };
  }

  /**
   * Main entry point
   */
  async run() {
    this.log("🔄 Generating auto-redirects from content changes");
    this.log(`   Run A: ${this.manifest.runA}`);
    this.log(`   Run B: ${this.manifest.runB}`);
    this.log("");

    // Get list of collections to compare
    const collections = Object.keys(COLLECTION_URL_PATTERNS);

    for (const collectionSlug of collections) {
      this.log(`📂 Processing collection: ${collectionSlug}`);
      await this.compareCollection(collectionSlug);
    }

    // Save manifest
    this.saveManifest();

    // Summary
    this.log("");
    this.log("✅ Auto-redirect generation complete!");
    this.log(`   Slug changes: ${this.manifest.stats.slugChanges}`);
    this.log(`   Deletions: ${this.manifest.stats.deletions}`);
    this.log(`   Total auto-redirects: ${this.manifest.stats.total}`);
  }

  /**
   * Compare a collection between two runs
   */
  private async compareCollection(collectionSlug: string) {
    // Load Run A items
    const itemsA = this.loadItems(this.runADir, collectionSlug);
    if (itemsA.length === 0) {
      this.log(`   ⚠️  No items in Run A, skipping`);
      return;
    }

    // Load Run B items
    const itemsB = this.loadItems(this.runBDir, collectionSlug);
    if (itemsB.length === 0) {
      this.log(`   ⚠️  No items in Run B, skipping`);
      return;
    }

    // Build maps: itemId → item
    const mapA = new Map(itemsA.map((item) => [item.id, item]));
    const mapB = new Map(itemsB.map((item) => [item.id, item]));

    // Detect slug changes
    for (const [itemId, itemA] of mapA.entries()) {
      const itemB = mapB.get(itemId);

      if (itemB) {
        // Item exists in both runs - check for slug change
        const slugA = itemA.fieldData.slug;
        const slugB = itemB.fieldData.slug;

        if (slugA && slugB && slugA !== slugB) {
          // Slug changed!
          const urlPattern = COLLECTION_URL_PATTERNS[collectionSlug];
          const oldUrl = `${urlPattern}/${slugA}`;
          const newUrl = `${urlPattern}/${slugB}`;

          this.manifest.redirects.push({
            source: oldUrl,
            target: newUrl,
            statusCode: 301,
            reason: "slug-change",
            itemId,
            collectionSlug,
            oldSlug: slugA,
            newSlug: slugB,
          });

          this.manifest.stats.slugChanges++;
          this.manifest.stats.total++;

          this.log(`   🔀 Slug change: ${oldUrl} → ${newUrl}`);
        }
      } else {
        // Item was deleted in Run B
        const slugA = itemA.fieldData.slug;
        if (slugA) {
          const urlPattern = COLLECTION_URL_PATTERNS[collectionSlug];
          const oldUrl = `${urlPattern}/${slugA}`;
          const listingUrl = urlPattern; // Redirect to collection listing

          this.manifest.redirects.push({
            source: oldUrl,
            target: listingUrl,
            statusCode: 301,
            reason: "deletion",
            itemId,
            collectionSlug,
            oldSlug: slugA,
          });

          this.manifest.stats.deletions++;
          this.manifest.stats.total++;

          this.log(`   🗑️  Deletion: ${oldUrl} → ${listingUrl}`);
        }
      }
    }
  }

  /**
   * Load items from a run
   */
  private loadItems(runDir: string, collectionSlug: string): WebflowItem[] {
    const itemsPath = join(
      runDir,
      `webflow/items/${collectionSlug}/live.json`
    );

    try {
      const data = JSON.parse(readFileSync(itemsPath, "utf-8"));
      return data.items || [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Save auto-redirect manifest
   */
  private saveManifest() {
    const manifestPath = join(
      this.runBDir,
      "redirects/redirects.auto.json"
    );

    writeFileSync(
      manifestPath,
      JSON.stringify(this.manifest, null, 2),
      "utf-8"
    );

    this.log(`\n💾 Saved auto-redirects to ${manifestPath}`);

    // Also append to Cloudflare Pages format
    if (this.manifest.stats.total > 0) {
      const redirectsPath = join(
        this.runBDir,
        "redirects/_redirects.auto"
      );

      const lines: string[] = [
        "# Auto-generated redirects from content changes",
        `# Run A: ${this.manifest.runA}`,
        `# Run B: ${this.manifest.runB}`,
        `# Generated: ${this.manifest.generatedAt}`,
        "",
      ];

      // Slug changes
      const slugChanges = this.manifest.redirects.filter(
        (r) => r.reason === "slug-change"
      );
      if (slugChanges.length > 0) {
        lines.push("# Slug changes");
        for (const redirect of slugChanges) {
          lines.push(
            `${redirect.source} ${redirect.target} ${redirect.statusCode} # ${redirect.oldSlug} → ${redirect.newSlug}`
          );
        }
        lines.push("");
      }

      // Deletions
      const deletions = this.manifest.redirects.filter(
        (r) => r.reason === "deletion"
      );
      if (deletions.length > 0) {
        lines.push("# Deletions");
        for (const redirect of deletions) {
          lines.push(
            `${redirect.source} ${redirect.target} ${redirect.statusCode} # Item deleted`
          );
        }
      }

      writeFileSync(redirectsPath, lines.join("\n") + "\n", "utf-8");
      this.log(`💾 Saved Cloudflare Pages auto-redirects to ${redirectsPath}`);
    }
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
      "run-a": { type: "string" },
      "run-b": { type: "string" },
    },
  });

  const runA = values["run-a"];
  const runB = values["run-b"];

  if (!runA || !runB) {
    console.error("Error: --run-a and --run-b are required");
    console.error(
      "Usage: pnpm exec tsx scripts/phase1/generate-auto-redirects.ts --run-a=2026-02-11T0626Z --run-b=2026-02-15T1000Z"
    );
    process.exit(1);
  }

  const generator = new AutoRedirectGenerator(runA, runB);
  await generator.run();
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
