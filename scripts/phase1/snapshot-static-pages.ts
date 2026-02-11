#!/usr/bin/env tsx
/**
 * Phase 1D: Static Page Extraction
 *
 * Fetches HTML snapshots of all published static pages from production
 * and copies draft pages from the Webflow export.
 *
 * Published pages are fetched from www.zenml.io. Draft pages are copied
 * from the Webflow code export directory.
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/snapshot-static-pages.ts --run-id=2026-02-11T0626Z
 *
 * Options:
 *   --run-id     Run ID to use (required)
 *   --site-url   Base site URL (default: https://www.zenml.io)
 */

import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { parseArgs } from 'node:util';
import { existsSync } from 'node:fs';

interface PageMetadata {
  path: string;
  url: string;
  status: 'published' | 'draft';
  fetchedAt?: string;
  statusCode?: number;
  contentLength?: number;
  error?: string;
}

interface PageIndex {
  siteUrl: string;
  exportedAt: string;
  stats: {
    publishedPages: number;
    draftPages: number;
    totalPages: number;
    successfulFetches: number;
    failedFetches: number;
  };
  pages: PageMetadata[];
}

// Static pages inventory from docs/webflow-inventory.md
const PUBLISHED_STATIC_PAGES = [
  // Main pages
  '/',
  '/pricing',
  '/pro',
  '/features',
  '/blog',
  '/integrations',
  '/projects',
  '/llmops-database',
  '/company',
  '/team',
  '/careers',

  // Legal pages
  '/privacy-policy',
  '/terms-of-service',
  '/imprint',
  '/cla',

  // Demo/signup pages
  '/book-a-demo',
  '/book-your-demo',
  '/schedule-a-demo',
  '/signup-for-demo',
  '/booked',
  '/book-success',
  '/book-a-demo-success',
  '/success-calendar',

  // Newsletter
  '/newsletter-signup',
  '/newsletter-success',

  // Comparison/tools
  '/compare',
  '/open-source-vs-pro',
  '/roi-calculator',
  '/live-demo',
  '/interactive-demo-mcp',

  // Other
  '/components',
  '/404',
  '/discussion',
  '/roadmap',
  '/meet',
  '/zenml-meet',
  '/slack-invite',
  '/slack',
  '/whitepaper-architecting-an-enterprise-grade-mlops-platform',
  '/deployments',
  '/get-started',
  '/startups-and-academics',
  '/case-studies',

  // Case study pages
  '/case-study/jetbrains',
  '/case-study/cross-screen-media',
  '/case-study/zuiver',
  '/case-study/brevo',
  '/case-study/adeo-leroy-merlin',

  // Feature detail pages
  '/features/iterate-at-warp-speed',
  '/features/limitless-scaling',
  '/features/auto-track-everything',
  '/features/backend-flexibility-zero-lock-in',
  '/features/shared-ml-building-blocks',
  '/features/streamline-cloud-expenses',
  '/features/security-guardrails-always',
  '/features/centralized-model-control-plane',
  '/features/organize-assets-into-projects',
  '/features/streamlined-pipeline-management',
  '/features/role-based-access-control-and-permissions',
  '/features/enterprise-grade-support-and-onboarding',

  // VS comparison pages (static)
  '/vs/zenml-vs-orchestrators',
  '/vs/zenml-vs-experiment-trackers',
  '/vs/zenml-vs-e2e-platforms',

  // Cloud features
  '/cloud-features/ml-models-control-plane'
];

const DRAFT_PAGES = [
  '/pricing-2025',
  '/pricing-with-oss',
  '/pricing-free',
  '/pricing-old',
  '/home-copy',
  '/home-tests',
  '/home-hamza-playground',
  '/test-hero',
  '/llmops-waitlist',
  '/ai-accelerator-program',
  '/book-a-demo-old-version',
  '/plans-old',
  '/case-study/rohlik'
];

class StaticPageSnapshotter {
  private pages: PageMetadata[] = [];
  private stats = {
    publishedPages: 0,
    draftPages: 0,
    totalPages: 0,
    successfulFetches: 0,
    failedFetches: 0
  };
  private logBuffer: string[] = [];

  constructor(
    private runId: string,
    private siteUrl: string,
    private runDir: string
  ) {}

  private log(message: string): void {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${message}`;
    console.log(logLine);
    this.logBuffer.push(logLine);
  }

  private async fetchPage(path: string): Promise<{ html: string; statusCode: number } | null> {
    const url = `${this.siteUrl}${path}`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'ZenML-Migration-Bot/1.0'
        }
      });

      if (!response.ok) {
        this.log(`   ⚠️  HTTP ${response.status} for ${path}`);
        return null;
      }

      const html = await response.text();
      return { html, statusCode: response.status };
    } catch (error) {
      this.log(`   ❌ Fetch failed for ${path}: ${error}`);
      return null;
    }
  }

  private pathToFilename(path: string): string {
    // Convert path to safe filename
    // / -> index.html
    // /pricing -> pricing.html
    // /case-study/jetbrains -> case-study_jetbrains.html
    if (path === '/') {
      return 'index.html';
    }
    return path.slice(1).replace(/\//g, '_') + '.html';
  }

  async fetchPublishedPages(): Promise<void> {
    this.log(`\n📡 Fetching ${PUBLISHED_STATIC_PAGES.length} published pages from ${this.siteUrl}...`);

    const publishedDir = join(this.runDir, 'pages', 'published');
    await mkdir(publishedDir, { recursive: true });

    for (const path of PUBLISHED_STATIC_PAGES) {
      this.log(`   Fetching ${path}...`);

      const result = await this.fetchPage(path);

      if (result) {
        // Save HTML
        const filename = this.pathToFilename(path);
        const filepath = join(publishedDir, filename);
        await writeFile(filepath, result.html, 'utf-8');

        // Record metadata
        this.pages.push({
          path,
          url: `${this.siteUrl}${path}`,
          status: 'published',
          fetchedAt: new Date().toISOString(),
          statusCode: result.statusCode,
          contentLength: result.html.length
        });

        this.stats.successfulFetches++;
        this.log(`   ✓ Saved ${filename} (${result.html.length} bytes)`);
      } else {
        // Record failure
        this.pages.push({
          path,
          url: `${this.siteUrl}${path}`,
          status: 'published',
          error: 'Fetch failed'
        });

        this.stats.failedFetches++;
      }

      // Rate limiting: small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.stats.publishedPages = PUBLISHED_STATIC_PAGES.length;
  }

  async copyDraftPages(): Promise<void> {
    this.log(`\n📄 Copying ${DRAFT_PAGES.length} draft pages from Webflow export...`);

    const webflowExportDir = join(process.cwd(), 'design', 'webflow-export', 'extracted');
    const draftsDir = join(this.runDir, 'pages', 'drafts');
    await mkdir(draftsDir, { recursive: true });

    if (!existsSync(webflowExportDir)) {
      this.log(`   ⚠️  Webflow export directory not found: ${webflowExportDir}`);
      this.log(`   Skipping draft pages (they will be captured in future runs)`);
      return;
    }

    for (const path of DRAFT_PAGES) {
      const filename = this.pathToFilename(path);
      const sourceFile = join(webflowExportDir, filename);

      if (existsSync(sourceFile)) {
        const destFile = join(draftsDir, filename);
        await copyFile(sourceFile, destFile);

        const stats = await readFile(sourceFile, 'utf-8');
        this.pages.push({
          path,
          url: `${this.siteUrl}${path}`,
          status: 'draft',
          contentLength: stats.length
        });

        this.log(`   ✓ Copied ${filename}`);
        this.stats.draftPages++;
      } else {
        this.log(`   ⚠️  Draft page not found in export: ${filename}`);
        this.pages.push({
          path,
          url: `${this.siteUrl}${path}`,
          status: 'draft',
          error: 'Not found in Webflow export'
        });
      }
    }
  }

  async savePageIndex(): Promise<void> {
    this.stats.totalPages = this.stats.publishedPages + this.stats.draftPages;

    const index: PageIndex = {
      siteUrl: this.siteUrl,
      exportedAt: new Date().toISOString(),
      stats: this.stats,
      pages: this.pages
    };

    const indexPath = join(this.runDir, 'pages', 'page-index.json');
    await writeFile(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf-8');
    this.log(`\n💾 Saved page index: ${indexPath}`);

    // Save log
    const logPath = join(this.runDir, 'pages', 'snapshot.log');
    await writeFile(logPath, this.logBuffer.join('\n') + '\n', 'utf-8');
    this.log(`💾 Saved log: ${logPath}`);
  }

  async run(): Promise<void> {
    this.log('🚀 Starting static page snapshot');
    this.log(`   Site URL: ${this.siteUrl}`);
    this.log(`   Run ID: ${this.runId}`);

    await this.fetchPublishedPages();
    await this.copyDraftPages();
    await this.savePageIndex();

    this.log('');
    this.log('✅ Snapshot complete!');
    this.log(`   Published pages: ${this.stats.publishedPages} (${this.stats.successfulFetches} successful, ${this.stats.failedFetches} failed)`);
    this.log(`   Draft pages: ${this.stats.draftPages}`);
    this.log(`   Total pages: ${this.stats.totalPages}`);
  }
}

// CLI
async function main() {
  const { values } = parseArgs({
    options: {
      'run-id': { type: 'string' },
      'site-url': { type: 'string' }
    }
  });

  const runId = values['run-id'];
  if (!runId) {
    console.error('❌ --run-id is required');
    console.error('   Example: pnpm exec tsx scripts/phase1/snapshot-static-pages.ts --run-id=2026-02-11T0626Z');
    process.exit(1);
  }

  const siteUrl = values['site-url'] || 'https://www.zenml.io';
  const runDir = join(
    process.cwd(),
    'design',
    'migration',
    'phase1',
    'runs',
    runId
  );

  const snapshotter = new StaticPageSnapshotter(runId, siteUrl, runDir);
  await snapshotter.run();
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
