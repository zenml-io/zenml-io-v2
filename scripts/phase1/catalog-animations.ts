#!/usr/bin/env -S pnpm exec tsx
/**
 * Phase 1J: Animation / interaction catalog
 *
 * Catalogs Webflow animations and custom scripts that need reimplementation:
 * - Scans HTML for data-w-id attributes (Webflow interactions)
 * - Parses custom code audit for page-specific scripts
 * - Classifies as "must-replicate" or "acceptable-downgrade"
 * - Generates JSON catalog and markdown notes
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/catalog-animations.ts --run-id=2026-02-11T0626Z
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { parseArgs } from "util";
import * as cheerio from "cheerio";

// ============================================================================
// Types
// ============================================================================

interface AnimationEntry {
  id: string;
  type: "webflow-interaction" | "custom-script" | "css-animation" | "third-party";
  location: string; // page or "site-wide"
  description: string;
  priority: "must-replicate" | "acceptable-downgrade" | "skip";
  implementation: string; // How to implement in Astro
  dataAttributes?: string[]; // e.g., ["data-w-id", "data-block"]
  selectors?: string[]; // CSS selectors used
  dependencies?: string[]; // e.g., ["jQuery", "IntersectionObserver"]
  notes?: string;
}

interface AnimationCatalog {
  runId: string;
  catalogedAt: string;
  stats: {
    total: number;
    mustReplicate: number;
    acceptableDowngrade: number;
    skip: number;
    webflowInteractions: number;
    customScripts: number;
    cssAnimations: number;
    thirdParty: number;
  };
  entries: AnimationEntry[];
}

// ============================================================================
// Main Class
// ============================================================================

class AnimationCatalogger {
  private runDir: string;
  private runId: string;
  private catalog: AnimationCatalog;

  constructor(runId: string) {
    this.runId = runId;
    this.runDir = join(
      process.cwd(),
      "design/migration/phase1/runs",
      runId
    );

    this.catalog = {
      runId,
      catalogedAt: new Date().toISOString(),
      stats: {
        total: 0,
        mustReplicate: 0,
        acceptableDowngrade: 0,
        skip: 0,
        webflowInteractions: 0,
        customScripts: 0,
        cssAnimations: 0,
        thirdParty: 0,
      },
      entries: [],
    };
  }

  /**
   * Main entry point
   */
  async run() {
    this.log("🎬 Starting animation / interaction catalog");
    this.log(`   Run ID: ${this.runId}`);
    this.log("");

    // Scan Webflow code export for data-w-id attributes
    this.log("📖 Scanning Webflow code export for interactions");
    await this.scanWebflowExport();

    // Add known custom scripts from audit
    this.log("");
    this.log("📖 Adding known custom scripts from audit");
    this.addCustomScripts();

    // Add CSS animations
    this.log("");
    this.log("📖 Adding CSS animations");
    this.addCSSAnimations();

    // Add third-party interactions
    this.log("");
    this.log("📖 Adding third-party interactions");
    this.addThirdPartyInteractions();

    // Create output directory
    const animationsDir = join(this.runDir, "animations");
    mkdirSync(animationsDir, { recursive: true });

    // Save catalog
    this.saveCatalog(animationsDir);

    // Generate markdown notes
    this.generateNotes(animationsDir);

    // Summary
    this.log("");
    this.log("✅ Animation catalog complete!");
    this.log(`   Total entries: ${this.catalog.stats.total}`);
    this.log(`   Must replicate: ${this.catalog.stats.mustReplicate}`);
    this.log(`   Acceptable downgrade: ${this.catalog.stats.acceptableDowngrade}`);
    this.log(`   Skip: ${this.catalog.stats.skip}`);
    this.log("");
    this.log(`   Webflow interactions: ${this.catalog.stats.webflowInteractions}`);
    this.log(`   Custom scripts: ${this.catalog.stats.customScripts}`);
    this.log(`   CSS animations: ${this.catalog.stats.cssAnimations}`);
    this.log(`   Third-party: ${this.catalog.stats.thirdParty}`);
  }

  /**
   * Scan Webflow code export for data-w-id attributes
   */
  private async scanWebflowExport() {
    const exportDir = join(process.cwd(), "design/webflow-export/extracted");

    // Get all HTML files
    const htmlFiles = readdirSync(exportDir).filter((f) => f.endsWith(".html"));

    const dataWIds = new Set<string>();
    let totalOccurrences = 0;

    for (const file of htmlFiles) {
      const filePath = join(exportDir, file);
      const html = readFileSync(filePath, "utf-8");
      const $ = cheerio.load(html);

      // Find all elements with data-w-id
      $("[data-w-id]").each((i, elem) => {
        const wId = $(elem).attr("data-w-id");
        if (wId) {
          dataWIds.add(wId);
          totalOccurrences++;
        }
      });
    }

    this.log(`   ✓ Found ${dataWIds.size} unique data-w-id values (${totalOccurrences} occurrences)`);

    // Add entry for Webflow interactions
    if (dataWIds.size > 0) {
      this.addEntry({
        id: "webflow-interactions",
        type: "webflow-interaction",
        location: "site-wide",
        description: `${dataWIds.size} unique Webflow interaction IDs found across the site. Most common use case: fade-in on scroll (opacity 0→1 transitions).`,
        priority: "must-replicate",
        implementation:
          "Replace with CSS animations (scroll-triggered via Intersection Observer) or lightweight JS library like AOS (Animate On Scroll). For simple fade-ins, use Tailwind's `opacity-0 transition-opacity duration-500` with IntersectionObserver to add `opacity-100` on scroll.",
        dataAttributes: ["data-w-id"],
        notes: `Common patterns observed: fade-in on scroll for feature cards, pricing cards, and content sections. Opacity starts at 0 via inline styles, Webflow JS adds classes to trigger fade-in. Most animations are simple opacity/transform transitions.`,
      });
    }
  }

  /**
   * Add known custom scripts from the custom code audit
   */
  private addCustomScripts() {
    // Homepage: Interactive code block highlighting
    this.addEntry({
      id: "homepage-code-highlighting",
      type: "custom-script",
      location: "/ (homepage)",
      description:
        "Interactive code block highlighting: Mouseover linking between feature blocks and code snippets. Disabled below 768px viewport width.",
      priority: "must-replicate",
      implementation:
        "Preact island component. Uses data-block attributes to link feature blocks to code snippets. On hover, adds 'highlight' class to matching code block. Simple opacity transitions.",
      dataAttributes: ["data-block"],
      selectors: [".feature-block", ".code-snippet"],
      dependencies: [],
      notes: "Breakpoint-gated at 768px. Self-contained interactive widget for the homepage hero.",
    });

    // Blog posts: TOC generator
    this.addEntry({
      id: "blog-toc",
      type: "custom-script",
      location: "/blog/[slug]",
      description:
        "Table of Contents generator: Dynamically creates TOC from h2 headings. Uses IntersectionObserver for scroll-spy highlighting of current section.",
      priority: "must-replicate",
      implementation:
        "Astro component or Preact island. Can generate TOC at build time from MDX headings (better for SSG). Use IntersectionObserver for scroll-spy highlighting of active section.",
      selectors: ["h2"],
      dependencies: ["IntersectionObserver"],
      notes: "Currently generates TOC client-side. For Astro, prefer build-time generation from MDX headings (zero JS at runtime).",
    });

    // Blog posts: highlight.js
    this.addEntry({
      id: "blog-syntax-highlighting",
      type: "third-party",
      location: "/blog/[slug]",
      description:
        "highlight.js for code syntax highlighting. Currently loaded site-wide (11.5.1) and initialized on blog posts.",
      priority: "acceptable-downgrade",
      implementation:
        "Replace with Shiki (built into Astro). Shiki does build-time syntax highlighting for MDX code blocks, resulting in zero runtime JS and better performance.",
      dependencies: ["highlight.js"],
      notes: "Astro has Shiki integration built-in. No need for highlight.js. Shiki produces static HTML with syntax highlighting at build time.",
    });

    // LLMOps database: Random style classes
    this.addEntry({
      id: "llmops-random-styles",
      type: "custom-script",
      location: "/llmops-database",
      description:
        "Random style class assignment: Applies style-1 through style-8 randomly to collection items. Uses MutationObserver to re-apply when Finsweet dynamically loads new items.",
      priority: "must-replicate",
      implementation:
        "Preact island or build-time assignment. For SSG, assign style classes at build time when generating static HTML. For client-side filtering, assign styles in the filter component.",
      dataAttributes: ["data-style"],
      dependencies: ["MutationObserver"],
      notes: "8 distinct color styles for tag pills. Can be assigned deterministically (hash-based) rather than randomly for consistency.",
    });

    // LLMOps database: Finsweet CMS filter
    this.addEntry({
      id: "llmops-filter",
      type: "third-party",
      location: "/llmops-database",
      description:
        "Finsweet CMS Filter: Tag-based filtering, search, and category selection for 1,453 LLMOps database items.",
      priority: "must-replicate",
      implementation:
        "Replace with Preact island + client-side filtering. With 1,453 items, consider paginated JSON + client-side filter or Pagefind for search. Load all items as JSON, filter client-side for instant results.",
      dataAttributes: ["fs_cmsfilter_list", "fs-cmsfilter-field"],
      dependencies: ["Finsweet CMS Filter"],
      notes: "Heavy-duty filtering with multiple dimensions (tags, industry, search). Replace with custom Preact solution for full control and better performance.",
    });

    // ROI calculator
    this.addEntry({
      id: "roi-calculator",
      type: "custom-script",
      location: "/roi-calculator",
      description:
        "ROI calculator logic: Three sliders (models, team size, cloud spend). Computes ZenML cost, infra savings, productivity gains, and ROI percentage. Dynamic tooltips and gradient progress bars.",
      priority: "must-replicate",
      implementation:
        "Preact island. Self-contained component with slider inputs, computation logic, and dynamic UI updates. No external dependencies.",
      selectors: ["input[type=range]", ".tooltip", ".progress-bar"],
      dependencies: [],
      notes: "Complex interactive calculator. Well-suited for Preact island with local state management.",
    });

    // Newsletter forms
    this.addEntry({
      id: "brevo-newsletter-form",
      type: "custom-script",
      location: "site-wide (footer), /newsletter-signup",
      description:
        "Brevo newsletter form handler: Custom fetch POST with loading state and thank-you message toggle.",
      priority: "must-replicate",
      implementation:
        "Preact island or Astro form component. POST to Brevo API endpoint. Handle loading state and success/error messages client-side.",
      selectors: ["form[data-brevo]", ".thank-you-message"],
      dependencies: [],
      notes: "Form ID: 65fd9132331e6d39b81aef11. Simple form with email input and submit handler.",
    });

    // Cal.com embeds
    this.addEntry({
      id: "calcom-embed",
      type: "third-party",
      location: "/book-your-demo, /schedule-a-demo",
      description:
        "Cal.com inline calendar embed for booking discovery calls. Namespace: discovery-call. Calendar: zenml/discovery-call.",
      priority: "must-replicate",
      implementation:
        "Use Cal.com's official embed script. Add on demo pages only. Load script asynchronously.",
      dataAttributes: ["data-cal-namespace", "data-cal-link"],
      dependencies: ["Cal.com embed.js"],
      notes: "Official Cal.com embed. Well-documented and straightforward to replicate.",
    });
  }

  /**
   * Add CSS animations
   */
  private addCSSAnimations() {
    // Marquee slider
    this.addEntry({
      id: "marquee-slider",
      type: "css-animation",
      location: "/ (homepage)",
      description:
        "Marquee/slider CSS animation for integrations logo slider. Uses @keyframes marquee-slide with 60s linear infinite loop.",
      priority: "must-replicate",
      implementation:
        "Pure CSS animation. Add @keyframes definition to component styles. No JS needed.",
      selectors: [".marquee-slider", ".logo-slider"],
      dependencies: [],
      notes: "Simple CSS-only infinite scroll animation. Easy to replicate.",
    });
  }

  /**
   * Add third-party interactions
   */
  private addThirdPartyInteractions() {
    // Cookie consent
    this.addEntry({
      id: "cookie-consent",
      type: "third-party",
      location: "site-wide",
      description:
        "Finsweet Cookie Consent banner with opt-in mode. Manages consent categories (essential, marketing, personalization, analytics). Gates Segment analytics script.",
      priority: "must-replicate",
      implementation:
        "Either keep Finsweet Cookie Consent or replace with lighter alternative (e.g., cookie-consent-banner npm package, or custom Preact island). Must integrate with analytics scripts to gate them behind consent.",
      dataAttributes: ["fs-cc-mode", "fs-cc-categories"],
      dependencies: ["Finsweet Cookie Consent"],
      notes: "Important for GDPR compliance. If replacing, ensure consent management is robust.",
    });
  }

  /**
   * Add entry to catalog
   */
  private addEntry(entry: AnimationEntry) {
    this.catalog.entries.push(entry);
    this.catalog.stats.total++;

    // Update stats
    if (entry.priority === "must-replicate") {
      this.catalog.stats.mustReplicate++;
    } else if (entry.priority === "acceptable-downgrade") {
      this.catalog.stats.acceptableDowngrade++;
    } else {
      this.catalog.stats.skip++;
    }

    if (entry.type === "webflow-interaction") {
      this.catalog.stats.webflowInteractions++;
    } else if (entry.type === "custom-script") {
      this.catalog.stats.customScripts++;
    } else if (entry.type === "css-animation") {
      this.catalog.stats.cssAnimations++;
    } else if (entry.type === "third-party") {
      this.catalog.stats.thirdParty++;
    }

    this.log(`   ✓ Cataloged: ${entry.id} (${entry.priority})`);
  }

  /**
   * Save JSON catalog
   */
  private saveCatalog(outputDir: string) {
    const catalogPath = join(outputDir, "catalog.json");
    writeFileSync(
      catalogPath,
      JSON.stringify(this.catalog, null, 2),
      "utf-8"
    );
    this.log(`\n💾 Saved catalog to ${catalogPath}`);
  }

  /**
   * Generate markdown notes
   */
  private generateNotes(outputDir: string) {
    const notesPath = join(outputDir, "notes.md");

    const lines: string[] = [
      "# Animation / Interaction Catalog — Implementation Notes",
      "",
      `**Run ID:** ${this.runId}`,
      `**Cataloged:** ${this.catalog.catalogedAt}`,
      "",
      "---",
      "",
      "## Summary",
      "",
      `This catalog documents ${this.catalog.stats.total} animations, interactions, and custom scripts that need to be reimplemented in Phase 3 (UI Implementation).`,
      "",
      `- **Must replicate:** ${this.catalog.stats.mustReplicate} (critical for UX parity)`,
      `- **Acceptable downgrade:** ${this.catalog.stats.acceptableDowngrade} (can replace with lighter alternative)`,
      `- **Skip:** ${this.catalog.stats.skip} (Webflow-specific, not needed)`,
      "",
      "---",
      "",
      "## Implementation Priority",
      "",
      "### Must Replicate",
      "",
    ];

    const mustReplicate = this.catalog.entries.filter(
      (e) => e.priority === "must-replicate"
    );
    for (const entry of mustReplicate) {
      lines.push(`#### ${entry.id}`);
      lines.push("");
      lines.push(`**Type:** ${entry.type}`);
      lines.push(`**Location:** ${entry.location}`);
      lines.push("");
      lines.push(`**Description:** ${entry.description}`);
      lines.push("");
      lines.push(`**Implementation:** ${entry.implementation}`);
      lines.push("");

      if (entry.dependencies && entry.dependencies.length > 0) {
        lines.push(`**Dependencies:** ${entry.dependencies.join(", ")}`);
        lines.push("");
      }

      if (entry.notes) {
        lines.push(`**Notes:** ${entry.notes}`);
        lines.push("");
      }

      lines.push("---");
      lines.push("");
    }

    // Acceptable downgrade
    const acceptableDowngrade = this.catalog.entries.filter(
      (e) => e.priority === "acceptable-downgrade"
    );
    if (acceptableDowngrade.length > 0) {
      lines.push("### Acceptable Downgrade / Replacement");
      lines.push("");

      for (const entry of acceptableDowngrade) {
        lines.push(`#### ${entry.id}`);
        lines.push("");
        lines.push(`**Type:** ${entry.type}`);
        lines.push(`**Location:** ${entry.location}`);
        lines.push("");
        lines.push(`**Description:** ${entry.description}`);
        lines.push("");
        lines.push(`**Implementation:** ${entry.implementation}`);
        lines.push("");

        if (entry.notes) {
          lines.push(`**Notes:** ${entry.notes}`);
          lines.push("");
        }

        lines.push("---");
        lines.push("");
      }
    }

    // Skip
    const skip = this.catalog.entries.filter((e) => e.priority === "skip");
    if (skip.length > 0) {
      lines.push("### Skip (Webflow-specific)");
      lines.push("");

      for (const entry of skip) {
        lines.push(`- **${entry.id}**: ${entry.description}`);
      }

      lines.push("");
    }

    writeFileSync(notesPath, lines.join("\n"), "utf-8");
    this.log(`💾 Saved implementation notes to ${notesPath}`);
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
      "Usage: pnpm exec tsx scripts/phase1/catalog-animations.ts --run-id=2026-02-11T0626Z"
    );
    process.exit(1);
  }

  const catalogger = new AnimationCatalogger(runId);
  await catalogger.run();
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
