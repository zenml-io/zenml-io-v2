#!/usr/bin/env tsx
/**
 * Phase 1B: SEO Baseline Crawl
 *
 * Crawls all public URLs from the production site and captures SEO metadata.
 * This becomes the acceptance test suite for Phase 6 parity testing.
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/crawl-seo-baseline.ts --run-id=2026-02-11T0626Z
 *
 * Options:
 *   --run-id         Run ID to use (required)
 *   --concurrency    Number of concurrent crawlers (default: 5)
 *   --timeout        Page load timeout in ms (default: 30000)
 *   --site-url       Site URL to crawl (default: https://www.zenml.io)
 */

import { chromium, type Browser, type Page } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

interface SeoMetadata {
  url: string;
  finalUrl: string;
  statusCode: number;
  canonical: string | null;
  title: string | null;
  metaDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogType: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  robotsMeta: string | null;
  h1: string | null;
  wordCount: number;
  hasTrailingSlash: boolean;
  redirectedFrom: string | null;
  crawledAt: string;
  error: string | null;
}

interface CrawlStats {
  total: number;
  success: number;
  failed: number;
  redirects: number;
  startTime: string;
  endTime: string | null;
  duration: number | null;
}

class SeoBaslineCrawler {
  private browser: Browser | null = null;
  private results: SeoMetadata[] = [];
  private stats: CrawlStats;
  private logBuffer: string[] = [];

  constructor(
    private runId: string,
    private siteUrl: string,
    private concurrency: number = 5,
    private timeout: number = 30000
  ) {
    this.stats = {
      total: 0,
      success: 0,
      failed: 0,
      redirects: 0,
      startTime: new Date().toISOString(),
      endTime: null,
      duration: null
    };
  }

  private log(message: string): void {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${message}`;
    console.log(logLine);
    this.logBuffer.push(logLine);
  }

  private async fetchSitemap(url: string): Promise<string[]> {
    this.log(`📡 Fetching sitemap from ${url}`);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const xml = await response.text();

      // Parse sitemap XML (handle both regular sitemaps and sitemap indexes)
      const urlMatches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
      const urls = Array.from(urlMatches, m => m[1].trim());

      this.log(`✅ Found ${urls.length} URLs in sitemap`);
      return urls;
    } catch (error) {
      this.log(`❌ Failed to fetch sitemap: ${error}`);
      throw error;
    }
  }

  private async crawlUrl(page: Page, url: string): Promise<SeoMetadata> {
    const startTime = Date.now();

    try {
      // Navigate to URL
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: this.timeout
      });

      if (!response) {
        throw new Error('No response received');
      }

      const finalUrl = page.url();
      const statusCode = response.status();
      const redirectedFrom = finalUrl !== url ? url : null;

      // Extract SEO metadata (using safer DOM queries)
      const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href')).catch(() => null);
      const title = await page.title().catch(() => null);

      // Meta tags
      const metaDescription = await page.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(() => null);
      const ogTitle = await page.$eval('meta[property="og:title"]', el => el.getAttribute('content')).catch(() => null);
      const ogDescription = await page.$eval('meta[property="og:description"]', el => el.getAttribute('content')).catch(() => null);
      const ogImage = await page.$eval('meta[property="og:image"]', el => el.getAttribute('content')).catch(() => null);
      const ogType = await page.$eval('meta[property="og:type"]', el => el.getAttribute('content')).catch(() => null);
      const twitterCard = await page.$eval('meta[name="twitter:card"]', el => el.getAttribute('content')).catch(() => null);
      const twitterTitle = await page.$eval('meta[name="twitter:title"]', el => el.getAttribute('content')).catch(() => null);
      const twitterDescription = await page.$eval('meta[name="twitter:description"]', el => el.getAttribute('content')).catch(() => null);
      const twitterImage = await page.$eval('meta[name="twitter:image"]', el => el.getAttribute('content')).catch(() => null);
      const robotsMeta = await page.$eval('meta[name="robots"]', el => el.getAttribute('content')).catch(() => null);

      // H1 and word count
      const h1 = await page.$eval('h1', el => el.textContent?.trim()).catch(() => null);
      const wordCount = await page.evaluate(() => {
        const text = document.body?.innerText || '';
        return text.split(/\s+/).filter(Boolean).length;
      }).catch(() => 0);

      const metadata = {
        canonical,
        title,
        metaDescription,
        ogTitle,
        ogDescription,
        ogImage,
        ogType,
        twitterCard,
        twitterTitle,
        twitterDescription,
        twitterImage,
        robotsMeta,
        h1,
        wordCount
      };

      const result: SeoMetadata = {
        url,
        finalUrl,
        statusCode,
        ...metadata,
        hasTrailingSlash: finalUrl.endsWith('/') && finalUrl !== finalUrl.replace(/\/$/, ''),
        redirectedFrom,
        crawledAt: new Date().toISOString(),
        error: null
      };

      const duration = Date.now() - startTime;
      this.log(`✓ ${url} (${statusCode}, ${duration}ms)`);
      this.stats.success++;
      if (redirectedFrom) this.stats.redirects++;

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.log(`✗ ${url} (${error}, ${duration}ms)`);
      this.stats.failed++;

      return {
        url,
        finalUrl: url,
        statusCode: 0,
        canonical: null,
        title: null,
        metaDescription: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
        ogType: null,
        twitterCard: null,
        twitterTitle: null,
        twitterDescription: null,
        twitterImage: null,
        robotsMeta: null,
        h1: null,
        wordCount: 0,
        hasTrailingSlash: false,
        redirectedFrom: null,
        crawledAt: new Date().toISOString(),
        error: String(error)
      };
    }
  }

  private async processBatch(urls: string[]): Promise<void> {
    const contexts = await Promise.all(
      Array.from({ length: this.concurrency }, () =>
        this.browser!.newContext()
      )
    );

    const pages = await Promise.all(
      contexts.map(ctx => ctx.newPage())
    );

    let index = 0;
    const process = async (page: Page) => {
      while (index < urls.length) {
        const url = urls[index++];
        const result = await this.crawlUrl(page, url);
        this.results.push(result);

        // Progress update every 50 URLs
        if (this.results.length % 50 === 0) {
          this.log(`📊 Progress: ${this.results.length}/${this.stats.total} URLs crawled`);
        }
      }
    };

    await Promise.all(pages.map(page => process(page)));

    // Cleanup
    await Promise.all(pages.map(page => page.close()));
    await Promise.all(contexts.map(ctx => ctx.close()));
  }

  private async saveResults(): Promise<void> {
    const baseDir = join(process.cwd(), 'design', 'migration', 'phase1', 'runs', this.runId, 'seo');

    // Save JSON (machine-readable)
    const jsonPath = join(baseDir, 'baseline.json');
    await writeFile(
      jsonPath,
      JSON.stringify({ stats: this.stats, results: this.results }, null, 2) + '\n',
      'utf-8'
    );
    this.log(`💾 Saved JSON: ${jsonPath}`);

    // Save CSV (human-readable for diffing)
    const csvPath = join(baseDir, 'baseline.csv');
    const headers = [
      'url', 'finalUrl', 'statusCode', 'canonical', 'title', 'metaDescription',
      'ogTitle', 'ogDescription', 'ogImage', 'h1', 'wordCount',
      'hasTrailingSlash', 'redirectedFrom', 'error'
    ];

    const escape = (val: any): string => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    };

    const csvLines = [
      headers.join(','),
      ...this.results.map(r =>
        headers.map(h => escape(r[h as keyof SeoMetadata])).join(',')
      )
    ];

    await writeFile(csvPath, csvLines.join('\n') + '\n', 'utf-8');
    this.log(`💾 Saved CSV: ${csvPath}`);

    // Save log
    const logPath = join(baseDir, 'crawl.log');
    await writeFile(logPath, this.logBuffer.join('\n') + '\n', 'utf-8');
    this.log(`💾 Saved log: ${logPath}`);
  }

  async run(): Promise<void> {
    try {
      this.log('🚀 Starting SEO baseline crawl');
      this.log(`   Site: ${this.siteUrl}`);
      this.log(`   Concurrency: ${this.concurrency}`);
      this.log(`   Timeout: ${this.timeout}ms`);
      this.log(`   Run ID: ${this.runId}`);

      // Fetch sitemap
      const sitemapUrl = `${this.siteUrl}/sitemap.xml`;
      const urls = await this.fetchSitemap(sitemapUrl);
      this.stats.total = urls.length;

      // Launch browser
      this.log('🌐 Launching browser...');
      this.browser = await chromium.launch({ headless: true });

      // Crawl all URLs
      this.log('🕷️  Starting crawl...');
      await this.processBatch(urls);

      // Finalize stats
      this.stats.endTime = new Date().toISOString();
      this.stats.duration = Date.now() - new Date(this.stats.startTime).getTime();

      // Save results
      await this.saveResults();

      // Summary
      this.log('');
      this.log('✅ Crawl complete!');
      this.log(`   Total URLs: ${this.stats.total}`);
      this.log(`   Success: ${this.stats.success}`);
      this.log(`   Failed: ${this.stats.failed}`);
      this.log(`   Redirects: ${this.stats.redirects}`);
      this.log(`   Duration: ${Math.round(this.stats.duration! / 1000)}s`);

      // Validation
      if (this.stats.total < 2000) {
        this.log('');
        this.log('⚠️  WARNING: Expected ~2,300+ URLs but got ' + this.stats.total);
        this.log('   This might indicate an incomplete sitemap.');
      }

      if (this.stats.failed > this.stats.total * 0.05) {
        this.log('');
        this.log(`⚠️  WARNING: High failure rate (${this.stats.failed}/${this.stats.total})`);
        this.log('   Check crawl.log for details.');
      }

    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// CLI
async function main() {
  const { values } = parseArgs({
    options: {
      'run-id': { type: 'string' },
      'concurrency': { type: 'string', default: '5' },
      'timeout': { type: 'string', default: '30000' },
      'site-url': { type: 'string', default: 'https://www.zenml.io' }
    }
  });

  const runId = values['run-id'];
  if (!runId) {
    console.error('❌ --run-id is required');
    console.error('   Example: pnpm exec tsx scripts/phase1/crawl-seo-baseline.ts --run-id=2026-02-11T0626Z');
    process.exit(1);
  }

  const crawler = new SeoBaslineCrawler(
    runId,
    values['site-url']!,
    parseInt(values.concurrency!, 10),
    parseInt(values.timeout!, 10)
  );

  await crawler.run();
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
