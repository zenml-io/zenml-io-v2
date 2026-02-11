/**
 * Phase 2I: Content Validation Gates
 *
 * Validates migrated content for issues that Zod schemas don't catch:
 * - Webflow CDN URL leakage
 * - Canonical URL format and routing
 * - Slug uniqueness and format
 * - Draft/source consistency
 *
 * Input: src/content/<collection>/*.mdx
 * Output: Console summary + optional JSON report
 */

import * as fs from "node:fs/promises";
import * as path from "node:path";
import matter from "gray-matter";

// ============================================================================
// Configuration
// ============================================================================

const CONTENT_DIR = "src/content";
const SITE_URL = "https://www.zenml.io";

/**
 * Expected collections (7 main + 10 reference)
 */
const EXPECTED_COLLECTIONS = [
  // Main collections
  "blog",
  "integrations",
  "llmops-database",
  "compare",
  "team",
  "projects",
  "old-projects",
  // Reference collections
  "authors",
  "categories",
  "tags",
  "llmops-tags",
  "industry-tags",
  "integration-types",
  "advantages",
  "quotes",
  "product-categories",
  "project-tags",
] as const;

/**
 * Route patterns for canonical validation (main collections only)
 */
const ROUTE_PATTERNS: Record<string, string> = {
  blog: "/blog",
  integrations: "/integrations",
  "llmops-database": "/llmops-database",
  compare: "/compare",
  team: "/team",
  projects: "/projects",
  // old-projects has no route (all drafts)
};

/**
 * Webflow CDN URL patterns to detect
 */
const WEBFLOW_CDN_PATTERNS = [
  "cdn.prod.website-files.com",
  "uploads-ssl.webflow.com",
  "d3e54v103j8qbb.cloudfront.net",
];

// ============================================================================
// Types
// ============================================================================

type Severity = "error" | "warning" | "info";

interface Finding {
  severity: Severity;
  code: string;
  collection: string;
  slug: string;
  file: string;
  message: string;
}

interface Entry {
  collection: string;
  filePath: string;
  fileSlug: string;
  data: Record<string, any>;
  body: string;
}

interface CollectionStats {
  collection: string;
  total: number;
  drafts: number;
  published: number;
  errors: number;
  warnings: number;
}

interface ValidationReport {
  timestamp: string;
  config: {
    siteUrl: string;
    collectionsChecked: string[];
    strict: boolean;
  };
  summary: {
    totalEntries: number;
    totalErrors: number;
    totalWarnings: number;
    collectionStats: CollectionStats[];
  };
  findings: Finding[];
}

// ============================================================================
// Content Validator
// ============================================================================

class ContentValidator {
  private findings: Finding[] = [];
  private entries: Entry[] = [];
  private collectionStats: Map<string, CollectionStats> = new Map();
  private strict: boolean;
  private targetCollection?: string;

  constructor(options: { strict?: boolean; collection?: string } = {}) {
    this.strict = options.strict || false;
    this.targetCollection = options.collection;
  }

  /**
   * Main validation workflow
   */
  async run(): Promise<number> {
    console.log("🔍 Phase 2I: Content Validation Gates\n");
    console.log(`Site URL: ${SITE_URL}`);
    console.log(`Strict mode: ${this.strict ? "ON" : "OFF"}`);
    if (this.targetCollection) {
      console.log(`Target collection: ${this.targetCollection}`);
    }
    console.log();

    try {
      // Step 1: Load all entries
      await this.loadEntries();

      // Step 2: Run validation rules
      await this.runValidations();

      // Step 3: Report results
      this.printReport();

      // Step 4: Exit with appropriate code
      const errorCount = this.findings.filter((f) => f.severity === "error").length;
      const warningCount = this.findings.filter((f) => f.severity === "warning").length;

      if (errorCount > 0) {
        console.log(`\n❌ Validation FAILED: ${errorCount} error(s)\n`);
        return 1;
      }

      if (warningCount > 0 && this.strict) {
        console.log(`\n⚠️  Validation FAILED (strict mode): ${warningCount} warning(s)\n`);
        return 1;
      }

      console.log("\n✅ Validation PASSED\n");
      return 0;
    } catch (error) {
      console.error("\n❌ Validation error:", error);
      return 1;
    }
  }

  /**
   * Load all MDX entries from src/content/
   */
  private async loadEntries(): Promise<void> {
    console.log("📂 Loading content entries...\n");

    const dirs = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
    const collectionDirs = dirs.filter((d) => d.isDirectory()).map((d) => d.name);

    for (const collection of collectionDirs) {
      // Skip if target collection specified and this isn't it
      if (this.targetCollection && collection !== this.targetCollection) {
        continue;
      }

      const collectionPath = path.join(CONTENT_DIR, collection);
      const files = await fs.readdir(collectionPath);
      const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

      const stats: CollectionStats = {
        collection,
        total: mdxFiles.length,
        drafts: 0,
        published: 0,
        errors: 0,
        warnings: 0,
      };

      for (const file of mdxFiles) {
        const filePath = path.join(collectionPath, file);
        const content = await fs.readFile(filePath, "utf-8");
        const { data, content: body } = matter(content);

        const fileSlug = path.basename(file, ".mdx");
        const isDraft = data.draft === true;

        if (isDraft) {
          stats.drafts++;
        } else {
          stats.published++;
        }

        this.entries.push({
          collection,
          filePath,
          fileSlug,
          data,
          body,
        });
      }

      this.collectionStats.set(collection, stats);
      console.log(`  ${collection}: ${mdxFiles.length} files`);
    }

    console.log(`\n✅ Loaded ${this.entries.length} entries from ${this.collectionStats.size} collections\n`);
  }

  /**
   * Run all validation rules
   */
  private async runValidations(): Promise<void> {
    console.log("🔎 Running validation rules...\n");

    // Group A: Collection integrity
    this.validateCollectionDirectories();

    // Group B: Slug correctness
    this.validateSlugFormat();
    this.validateSlugFrontmatterMatch();
    this.validateSlugUniqueness();

    // Group C: Draft/source consistency
    this.validateDraftSourceConsistency();
    this.validateOldProjectsDrafts();

    // Group D: Webflow CDN leakage
    this.validateWebflowCDNUrls();

    // Group E: Canonical URL policy
    this.validateCanonicalHost();
    this.validateCanonicalTrailingSlash();
    this.validateCanonicalRoutes();
    this.validateCanonicalQueryHash();

    console.log(`✅ Validation complete: ${this.findings.length} findings\n`);
  }

  // ============================================================================
  // Rule Group A: Collection Integrity
  // ============================================================================

  private validateCollectionDirectories(): void {
    const actualCollections = Array.from(this.collectionStats.keys());
    const expectedSet = new Set(EXPECTED_COLLECTIONS);
    const actualSet = new Set(actualCollections);

    // Check for unexpected directories
    for (const collection of actualCollections) {
      if (!expectedSet.has(collection as any)) {
        this.addFinding({
          severity: "warning",
          code: "UNKNOWN_COLLECTION",
          collection,
          slug: "",
          file: "",
          message: `Unexpected collection directory: ${collection}`,
        });
      }
    }

    // Check for missing directories
    for (const collection of EXPECTED_COLLECTIONS) {
      if (!actualSet.has(collection)) {
        this.addFinding({
          severity: "error",
          code: "MISSING_COLLECTION",
          collection,
          slug: "",
          file: "",
          message: `Expected collection directory missing: ${collection}`,
        });
      }
    }
  }

  // ============================================================================
  // Rule Group B: Slug Correctness & Uniqueness
  // ============================================================================

  private validateSlugFormat(): void {
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    for (const entry of this.entries) {
      const { data, collection, fileSlug, filePath } = entry;
      const slug = data.slug || fileSlug;

      if (!slugPattern.test(slug)) {
        const isDraft = data.draft === true;
        this.addFinding({
          severity: this.strict ? "error" : "warning",
          code: "INVALID_SLUG_FORMAT",
          collection,
          slug,
          file: filePath,
          message: `Invalid slug format: "${slug}" (expected: lowercase, digits, hyphens only)${isDraft ? " [DRAFT]" : ""}`,
        });
      }
    }
  }

  private validateSlugFrontmatterMatch(): void {
    for (const entry of this.entries) {
      const { data, collection, fileSlug, filePath } = entry;
      const frontmatterSlug = data.slug;

      if (frontmatterSlug && frontmatterSlug !== fileSlug) {
        const isDraft = data.draft === true;
        this.addFinding({
          severity: isDraft ? "warning" : "error",
          code: "SLUG_MISMATCH",
          collection,
          slug: fileSlug,
          file: filePath,
          message: `Frontmatter slug "${frontmatterSlug}" doesn't match filename slug "${fileSlug}"${isDraft ? " [DRAFT]" : ""}`,
        });
      }
    }
  }

  private validateSlugUniqueness(): void {
    const slugsByCollection = new Map<string, Map<string, string[]>>();

    // Build slug index
    for (const entry of this.entries) {
      const { collection, data, fileSlug, filePath } = entry;
      const slug = data.slug || fileSlug;

      if (!slugsByCollection.has(collection)) {
        slugsByCollection.set(collection, new Map());
      }

      const collectionSlugs = slugsByCollection.get(collection)!;
      if (!collectionSlugs.has(slug)) {
        collectionSlugs.set(slug, []);
      }
      collectionSlugs.get(slug)!.push(filePath);
    }

    // Check for duplicates
    for (const [collection, slugMap] of slugsByCollection) {
      for (const [slug, files] of slugMap) {
        if (files.length > 1) {
          this.addFinding({
            severity: "error",
            code: "DUPLICATE_SLUG",
            collection,
            slug,
            file: files.join(", "),
            message: `Duplicate slug "${slug}" in collection ${collection}: ${files.length} files`,
          });
        }
      }
    }
  }

  // ============================================================================
  // Rule Group C: Draft/Source Consistency
  // ============================================================================

  private validateDraftSourceConsistency(): void {
    for (const entry of this.entries) {
      const { data, collection, fileSlug, filePath } = entry;
      const isDraft = data.draft === true;
      const source = data.webflow?.source;

      if (!source) continue; // Skip if no webflow metadata

      const expectedSource = isDraft ? "staged-only" : "live";
      if (source !== expectedSource) {
        this.addFinding({
          severity: "warning",
          code: "DRAFT_SOURCE_MISMATCH",
          collection,
          slug: fileSlug,
          file: filePath,
          message: `Draft status (${isDraft}) doesn't match source (${source}). Expected: ${expectedSource}`,
        });
      }
    }
  }

  private validateOldProjectsDrafts(): void {
    for (const entry of this.entries) {
      if (entry.collection !== "old-projects") continue;

      const isDraft = entry.data.draft === true;
      if (!isDraft) {
        this.addFinding({
          severity: "error",
          code: "OLD_PROJECTS_NOT_DRAFT",
          collection: entry.collection,
          slug: entry.fileSlug,
          file: entry.filePath,
          message: "old-projects entry must have draft: true",
        });
      }
    }
  }

  // ============================================================================
  // Rule Group D: Webflow CDN Leakage Detection
  // ============================================================================

  private validateWebflowCDNUrls(): void {
    for (const entry of this.entries) {
      const { data, body, collection, fileSlug, filePath } = entry;
      const isDraft = data.draft === true;
      const isOldProjects = collection === "old-projects";

      // Check frontmatter (JSON stringified)
      const frontmatterStr = JSON.stringify(data);
      for (const pattern of WEBFLOW_CDN_PATTERNS) {
        if (frontmatterStr.includes(pattern)) {
          // Error for published content, warning for drafts/old-projects
          const severity = !isDraft && !isOldProjects ? "error" : "warning";
          this.addFinding({
            severity,
            code: "WEBFLOW_CDN_URL_FRONTMATTER",
            collection,
            slug: fileSlug,
            file: filePath,
            message: `Webflow CDN URL found in frontmatter: ${pattern}${isDraft ? " [DRAFT]" : ""}${isOldProjects ? " [OLD-PROJECTS]" : ""}`,
          });
        }
      }

      // Check body
      for (const pattern of WEBFLOW_CDN_PATTERNS) {
        if (body.includes(pattern)) {
          const severity = !isDraft && !isOldProjects ? "error" : "warning";
          this.addFinding({
            severity,
            code: "WEBFLOW_CDN_URL_BODY",
            collection,
            slug: fileSlug,
            file: filePath,
            message: `Webflow CDN URL found in body: ${pattern}${isDraft ? " [DRAFT]" : ""}${isOldProjects ? " [OLD-PROJECTS]" : ""}`,
          });
        }
      }
    }
  }

  // ============================================================================
  // Rule Group E: Canonical URL & Trailing Slash Policy
  // ============================================================================

  private validateCanonicalHost(): void {
    for (const entry of this.entries) {
      const { data, collection, fileSlug, filePath } = entry;
      const canonical = data.seo?.canonical;

      if (!canonical) continue;

      if (!canonical.startsWith(SITE_URL)) {
        const isDraft = data.draft === true;
        this.addFinding({
          severity: this.strict ? "error" : "warning",
          code: "CANONICAL_HOST_MISMATCH",
          collection,
          slug: fileSlug,
          file: filePath,
          message: `Canonical URL doesn't start with ${SITE_URL}: ${canonical}${isDraft ? " [DRAFT]" : ""}`,
        });
      }
    }
  }

  private validateCanonicalTrailingSlash(): void {
    for (const entry of this.entries) {
      const { data, collection, fileSlug, filePath } = entry;
      const canonical = data.seo?.canonical;

      if (!canonical) continue;

      const isDraft = data.draft === true;

      // Check for trailing slash (except root)
      if (canonical !== SITE_URL && canonical.endsWith("/")) {
        this.addFinding({
          severity: isDraft ? "warning" : "error",
          code: "CANONICAL_TRAILING_SLASH",
          collection,
          slug: fileSlug,
          file: filePath,
          message: `Canonical URL has trailing slash (trailingSlash: "never"): ${canonical}${isDraft ? " [DRAFT]" : ""}`,
        });
      }
    }
  }

  private validateCanonicalRoutes(): void {
    for (const entry of this.entries) {
      const { data, collection, fileSlug, filePath } = entry;
      const canonical = data.seo?.canonical;

      if (!canonical) continue;

      const routePattern = ROUTE_PATTERNS[collection];
      if (!routePattern) continue; // Skip collections without route patterns

      const expectedCanonical = `${SITE_URL}${routePattern}/${fileSlug}`;
      const isDraft = data.draft === true;
      const isOldProjects = collection === "old-projects";

      if (canonical !== expectedCanonical) {
        // Error for published main collections, warning for drafts/old-projects
        const severity = !isDraft && !isOldProjects ? "error" : "warning";
        this.addFinding({
          severity,
          code: "CANONICAL_ROUTE_MISMATCH",
          collection,
          slug: fileSlug,
          file: filePath,
          message: `Canonical URL doesn't match expected route. Expected: ${expectedCanonical}, Got: ${canonical}${isDraft ? " [DRAFT]" : ""}${isOldProjects ? " [OLD-PROJECTS]" : ""}`,
        });
      }
    }
  }

  private validateCanonicalQueryHash(): void {
    for (const entry of this.entries) {
      const { data, collection, fileSlug, filePath } = entry;
      const canonical = data.seo?.canonical;

      if (!canonical) continue;

      const isDraft = data.draft === true;

      if (canonical.includes("?") || canonical.includes("#")) {
        this.addFinding({
          severity: isDraft ? "warning" : "error",
          code: "CANONICAL_QUERY_HASH",
          collection,
          slug: fileSlug,
          file: filePath,
          message: `Canonical URL contains query or hash: ${canonical}${isDraft ? " [DRAFT]" : ""}`,
        });
      }
    }
  }

  // ============================================================================
  // Reporting
  // ============================================================================

  private addFinding(finding: Finding): void {
    this.findings.push(finding);

    // Update collection stats
    const stats = this.collectionStats.get(finding.collection);
    if (stats) {
      if (finding.severity === "error") {
        stats.errors++;
      } else if (finding.severity === "warning") {
        stats.warnings++;
      }
    }
  }

  private printReport(): void {
    console.log("\n" + "=".repeat(80));
    console.log("VALIDATION REPORT");
    console.log("=".repeat(80) + "\n");

    // Collection summary table
    console.log("📊 Collection Summary:\n");
    console.log(
      "Collection              Total  Drafts  Published  Errors  Warnings"
    );
    console.log("-".repeat(80));

    for (const [collection, stats] of this.collectionStats) {
      console.log(
        `${collection.padEnd(20)}  ${String(stats.total).padStart(5)}  ${String(stats.drafts).padStart(6)}  ${String(stats.published).padStart(9)}  ${String(stats.errors).padStart(6)}  ${String(stats.warnings).padStart(8)}`
      );
    }

    const totalErrors = this.findings.filter((f) => f.severity === "error").length;
    const totalWarnings = this.findings.filter((f) => f.severity === "warning").length;
    const totalEntries = this.entries.length;

    console.log("-".repeat(80));
    console.log(
      `Total: ${totalEntries} entries, ${totalErrors} errors, ${totalWarnings} warnings\n`
    );

    // Findings by severity
    if (this.findings.length > 0) {
      console.log("\n🔍 Findings:\n");

      // Errors first
      const errors = this.findings.filter((f) => f.severity === "error");
      if (errors.length > 0) {
        console.log(`❌ ERRORS (${errors.length}):\n`);
        for (const finding of errors) {
          console.log(`  [${finding.code}] ${finding.collection}/${finding.slug}`);
          console.log(`  └─ ${finding.message}`);
          if (finding.file) {
            console.log(`     File: ${finding.file}`);
          }
          console.log();
        }
      }

      // Warnings
      const warnings = this.findings.filter((f) => f.severity === "warning");
      if (warnings.length > 0) {
        console.log(`⚠️  WARNINGS (${warnings.length}):\n`);
        for (const finding of warnings) {
          console.log(`  [${finding.code}] ${finding.collection}/${finding.slug}`);
          console.log(`  └─ ${finding.message}`);
          if (finding.file) {
            console.log(`     File: ${finding.file}`);
          }
          console.log();
        }
      }
    } else {
      console.log("✅ No issues found!\n");
    }
  }
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  const strict = args.includes("--strict");
  const collectionArg = args.find((arg) => arg.startsWith("--collection="));
  const collection = collectionArg?.split("=")[1];

  const validator = new ContentValidator({ strict, collection });
  const exitCode = await validator.run();
  process.exit(exitCode);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
