#!/usr/bin/env -S pnpm exec tsx
/**
 * Phase 1I: Redirect export + normalization
 *
 * Processes Webflow redirect CSV export to:
 * - Normalize to JSON format
 * - Detect and flatten redirect chains (multi-hop → single-hop)
 * - Validate redirect targets
 * - Generate Cloudflare Pages _redirects format
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/export-redirects.ts --run-id=2026-02-11T0626Z
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { parseArgs } from "util";

// ============================================================================
// Types
// ============================================================================

interface RedirectRule {
  source: string;
  target: string;
  statusCode: number; // 301 for permanent redirects
  originalTarget?: string; // if flattened from a chain
  chainLength?: number; // if part of a chain
}

interface RedirectManifest {
  runId: string;
  exportedAt: string;
  stats: {
    total: number;
    internal: number;
    external: number;
    flattened: number;
  };
  warnings: string[];
  rules: RedirectRule[];
}

// ============================================================================
// Main Class
// ============================================================================

class RedirectProcessor {
  private runDir: string;
  private runId: string;
  private manifest: RedirectManifest;
  private redirectMap: Map<string, string> = new Map();

  constructor(runId: string) {
    this.runId = runId;
    this.runDir = join(
      process.cwd(),
      "design/migration/phase1/runs",
      runId
    );

    this.manifest = {
      runId,
      exportedAt: new Date().toISOString(),
      stats: { total: 0, internal: 0, external: 0, flattened: 0 },
      warnings: [],
      rules: [],
    };
  }

  /**
   * Main entry point
   */
  async run() {
    this.log("🔄 Starting redirect export + normalization");
    this.log(`   Run ID: ${this.runId}`);
    this.log("");

    // Load Webflow redirect CSV
    const csvPath = join(process.cwd(), "design/zenml-website-2026-02-10.csv");
    this.log(`📖 Loading Webflow redirects from ${csvPath}`);

    const rawRules = this.parseCSV(csvPath);
    this.log(`   ✓ Loaded ${rawRules.length} redirect rules`);

    // Build redirect map
    for (const rule of rawRules) {
      this.redirectMap.set(rule.source, rule.target);
    }

    // Flatten redirect chains
    this.log("");
    this.log("🔗 Detecting and flattening redirect chains");

    const flattenedRules = this.flattenChains(rawRules);
    this.log(`   ✓ Flattened ${this.manifest.stats.flattened} redirect chains`);

    // Classify redirects
    this.classifyRedirects(flattenedRules);

    // Create output directory
    const redirectsDir = join(this.runDir, "redirects");
    mkdirSync(redirectsDir, { recursive: true });

    // Save normalized JSON
    this.saveJSON(flattenedRules, redirectsDir);

    // Generate Cloudflare Pages _redirects format
    this.generateCloudflareRedirects(flattenedRules, redirectsDir);

    // Summary
    this.log("");
    this.log("✅ Redirect export complete!");
    this.log(`   Total rules: ${this.manifest.stats.total}`);
    this.log(`   Internal: ${this.manifest.stats.internal}`);
    this.log(`   External: ${this.manifest.stats.external}`);
    this.log(`   Flattened chains: ${this.manifest.stats.flattened}`);

    if (this.manifest.warnings.length > 0) {
      this.log("");
      this.log(`⚠️  ${this.manifest.warnings.length} warnings:`);
      this.manifest.warnings.forEach((warning) => {
        this.log(`   - ${warning}`);
      });
    }
  }

  /**
   * Parse Webflow redirect CSV
   */
  private parseCSV(csvPath: string): RedirectRule[] {
    const content = readFileSync(csvPath, "utf-8");
    const lines = content.trim().split("\n");

    // Skip header row
    const rules: RedirectRule[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [source, target] = line.split(",").map((s) => s.trim());
      if (!source || !target) {
        this.manifest.warnings.push(`Invalid CSV line ${i + 1}: ${line}`);
        continue;
      }

      rules.push({
        source,
        target,
        statusCode: 301, // All Webflow redirects are permanent (301)
      });
    }

    return rules;
  }

  /**
   * Flatten redirect chains (A → B → C becomes A → C, B → C)
   */
  private flattenChains(rules: RedirectRule[]): RedirectRule[] {
    const flattened: RedirectRule[] = [];

    for (const rule of rules) {
      const finalTarget = this.resolveChain(rule.source, rule.target);

      if (finalTarget !== rule.target) {
        // This was part of a chain
        this.manifest.stats.flattened++;
        flattened.push({
          source: rule.source,
          target: finalTarget,
          statusCode: 301,
          originalTarget: rule.target,
          chainLength: this.getChainLength(rule.source),
        });

        this.log(
          `   🔗 Flattened: ${rule.source} → ${rule.target} → ... → ${finalTarget}`
        );
      } else {
        // Not part of a chain, keep as-is
        flattened.push(rule);
      }
    }

    return flattened;
  }

  /**
   * Resolve a redirect chain to its final target
   */
  private resolveChain(
    original: string,
    current: string,
    visited: Set<string> = new Set()
  ): string {
    // Prevent infinite loops
    if (visited.has(current)) {
      this.manifest.warnings.push(
        `Circular redirect detected: ${original} → ${current}`
      );
      return current;
    }

    visited.add(current);

    // Check if current target is also a source (chain continues)
    const next = this.redirectMap.get(current);
    if (next) {
      return this.resolveChain(original, next, visited);
    }

    // End of chain
    return current;
  }

  /**
   * Get the length of a redirect chain
   */
  private getChainLength(source: string): number {
    let length = 0;
    let current = source;
    const visited = new Set<string>();

    while (this.redirectMap.has(current)) {
      if (visited.has(current)) break; // Circular
      visited.add(current);
      current = this.redirectMap.get(current)!;
      length++;
    }

    return length;
  }

  /**
   * Classify redirects as internal or external
   */
  private classifyRedirects(rules: RedirectRule[]) {
    for (const rule of rules) {
      this.manifest.stats.total++;

      // Check if target is external
      if (
        rule.target.startsWith("http://") ||
        rule.target.startsWith("https://")
      ) {
        this.manifest.stats.external++;

        // Check for Webflow-hosted assets that need migration
        if (
          rule.target.includes("cdn.prod.website-files.com") ||
          rule.target.includes("uploads-ssl.webflow.com") ||
          rule.target.includes("d3e54v103j8qbb.cloudfront.net")
        ) {
          this.manifest.warnings.push(
            `Webflow-hosted asset in redirect: ${rule.source} → ${rule.target} (needs migration to R2)`
          );
        }
      } else {
        this.manifest.stats.internal++;
      }

      this.manifest.rules.push(rule);
    }
  }

  /**
   * Save normalized JSON
   */
  private saveJSON(rules: RedirectRule[], outputDir: string) {
    const jsonPath = join(outputDir, "webflow-redirects.json");

    const output = {
      ...this.manifest,
      rules: rules.map((r) => ({
        source: r.source,
        target: r.target,
        statusCode: r.statusCode,
        ...(r.originalTarget && { originalTarget: r.originalTarget }),
        ...(r.chainLength && { chainLength: r.chainLength }),
      })),
    };

    writeFileSync(jsonPath, JSON.stringify(output, null, 2), "utf-8");
    this.log(`\n💾 Saved normalized JSON to ${jsonPath}`);
  }

  /**
   * Generate Cloudflare Pages _redirects format
   */
  private generateCloudflareRedirects(
    rules: RedirectRule[],
    outputDir: string
  ) {
    const redirectsPath = join(outputDir, "_redirects.webflow");

    const lines: string[] = [
      "# Webflow Redirects",
      "# Generated by Phase 1I: export-redirects.ts",
      `# Export date: ${this.manifest.exportedAt}`,
      `# Total rules: ${this.manifest.stats.total}`,
      "",
    ];

    // Sort rules: internal first, then external
    const sortedRules = [...rules].sort((a, b) => {
      const aExternal = a.target.startsWith("http");
      const bExternal = b.target.startsWith("http");

      if (aExternal && !bExternal) return 1;
      if (!aExternal && bExternal) return -1;
      return 0;
    });

    // Add internal redirects
    lines.push("# Internal redirects");
    for (const rule of sortedRules) {
      if (rule.target.startsWith("http")) continue;

      let line = `${rule.source} ${rule.target} ${rule.statusCode}`;
      if (rule.chainLength && rule.chainLength > 1) {
        line += ` # Flattened from ${rule.chainLength}-hop chain`;
      }
      lines.push(line);
    }

    // Add external redirects
    const externalRules = sortedRules.filter((r) =>
      r.target.startsWith("http")
    );
    if (externalRules.length > 0) {
      lines.push("");
      lines.push("# External redirects");
      for (const rule of externalRules) {
        let line = `${rule.source} ${rule.target} ${rule.statusCode}`;
        if (rule.chainLength && rule.chainLength > 1) {
          line += ` # Flattened from ${rule.chainLength}-hop chain`;
        }
        lines.push(line);
      }
    }

    writeFileSync(redirectsPath, lines.join("\n") + "\n", "utf-8");
    this.log(`💾 Saved Cloudflare Pages redirects to ${redirectsPath}`);
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
      "Usage: pnpm exec tsx scripts/phase1/export-redirects.ts --run-id=2026-02-11T0626Z"
    );
    process.exit(1);
  }

  const processor = new RedirectProcessor(runId);
  await processor.run();
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
