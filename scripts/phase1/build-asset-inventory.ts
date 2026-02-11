#!/usr/bin/env tsx
/**
 * Phase 1E: Asset Discovery
 *
 * Builds a comprehensive inventory of all Webflow-hosted assets by scanning:
 * 1. CMS JSON exports (image fields + rich text HTML)
 * 2. Static HTML snapshots
 * 3. SEO baseline (OG images, favicons)
 * 4. Webflow code export (images, fonts, CSS url() refs)
 *
 * Webflow hosts assets on two CDN patterns:
 * - Newer: cdn.prod.website-files.com/65264f6bf54e751c3a776db1/...
 * - Older: uploads-ssl.webflow.com/65264f6bf54e751c3a776db1/...
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/build-asset-inventory.ts --run-id=2026-02-11T0626Z
 *
 * Options:
 *   --run-id     Run ID to use (required)
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { existsSync } from 'node:fs';

interface Asset {
  url: string;
  normalizedUrl: string;
  sources: string[];
  firstSeenAt: string;
}

interface AssetInventory {
  exportedAt: string;
  siteId: string;
  stats: {
    totalAssets: number;
    fromCMS: number;
    fromStaticPages: number;
    fromSEO: number;
    fromCodeExport: number;
  };
  assets: Asset[];
}

// URL patterns for Webflow-hosted assets
// Changed pattern to allow parentheses in filenames: [^\s"'<>]+ instead of [^\s"')]+
// This fixes truncation of URLs like "image (1).png" or "CleanShot 2025-09-19 at 11.32.26 (1).png"
const ASSET_URL_PATTERNS = [
  /https?:\/\/cdn\.prod\.website-files\.com\/65264f6bf54e751c3a776db1\/[^\s"'<>]+/g,
  /https?:\/\/uploads-ssl\.webflow\.com\/65264f6bf54e751c3a776db1\/[^\s"'<>]+/g,
  /https?:\/\/d3e54v103j8qbb\.cloudfront\.net\/[^\s"'<>]+/g  // Legacy CloudFront CDN
];

class AssetInventoryBuilder {
  private assets = new Map<string, Asset>();
  private stats = {
    totalAssets: 0,
    fromCMS: 0,
    fromStaticPages: 0,
    fromSEO: 0,
    fromCodeExport: 0
  };
  private logBuffer: string[] = [];

  constructor(
    private runId: string,
    private runDir: string
  ) {}

  private log(message: string): void {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${message}`;
    console.log(logLine);
    this.logBuffer.push(logLine);
  }

  private normalizeUrl(url: string): string {
    // Strip fragments, keep query strings
    return url.split('#')[0];
  }

  private addAsset(url: string, source: string): void {
    const normalized = this.normalizeUrl(url);

    if (this.assets.has(normalized)) {
      const asset = this.assets.get(normalized)!;
      if (!asset.sources.includes(source)) {
        asset.sources.push(source);
      }
    } else {
      this.assets.set(normalized, {
        url: normalized,
        normalizedUrl: normalized,
        sources: [source],
        firstSeenAt: new Date().toISOString()
      });
    }
  }

  private extractUrlsFromText(text: string): string[] {
    const urls: string[] = [];
    for (const pattern of ASSET_URL_PATTERNS) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        urls.push(match[0]);
      }
    }
    return urls;
  }

  private extractUrlsFromObject(obj: any, path: string = ''): string[] {
    const urls: string[] = [];

    if (typeof obj === 'string') {
      // Extract from strings (could be HTML, URLs, etc.)
      urls.push(...this.extractUrlsFromText(obj));
    } else if (typeof obj === 'object' && obj !== null) {
      // Handle image field objects: { fileId, url, alt }
      if (obj.url && typeof obj.url === 'string') {
        urls.push(...this.extractUrlsFromText(obj.url));
      }

      // Recursively scan all object properties
      for (const [key, value] of Object.entries(obj)) {
        urls.push(...this.extractUrlsFromObject(value, `${path}.${key}`));
      }
    } else if (Array.isArray(obj)) {
      // Scan arrays
      for (let i = 0; i < obj.length; i++) {
        urls.push(...this.extractUrlsFromObject(obj[i], `${path}[${i}]`));
      }
    }

    return urls;
  }

  async scanCMSExports(): Promise<void> {
    this.log('\n📦 Scanning CMS exports...');

    const cmsDir = join(this.runDir, 'webflow', 'items');
    if (!existsSync(cmsDir)) {
      this.log('   ⚠️  CMS directory not found, skipping');
      return;
    }

    const collections = await readdir(cmsDir);
    let cmsAssetCount = 0;

    for (const collectionSlug of collections) {
      const liveFile = join(cmsDir, collectionSlug, 'live.json');
      const stagedFile = join(cmsDir, collectionSlug, 'staged.json');

      for (const file of [liveFile, stagedFile]) {
        if (!existsSync(file)) continue;

        const data = JSON.parse(await readFile(file, 'utf-8'));
        const urls = this.extractUrlsFromObject(data);

        for (const url of urls) {
          this.addAsset(url, `cms:${collectionSlug}`);
          cmsAssetCount++;
        }
      }
    }

    this.stats.fromCMS = cmsAssetCount;
    this.log(`   ✓ Found ${cmsAssetCount} asset references in CMS`);
  }

  async scanStaticPages(): Promise<void> {
    this.log('\n📄 Scanning static page HTML...');

    const pagesDir = join(this.runDir, 'pages');
    if (!existsSync(pagesDir)) {
      this.log('   ⚠️  Pages directory not found, skipping');
      return;
    }

    let pageAssetCount = 0;

    // Scan published pages
    const publishedDir = join(pagesDir, 'published');
    if (existsSync(publishedDir)) {
      const files = await readdir(publishedDir);
      for (const file of files) {
        if (!file.endsWith('.html')) continue;

        const html = await readFile(join(publishedDir, file), 'utf-8');
        const urls = this.extractUrlsFromText(html);

        for (const url of urls) {
          this.addAsset(url, `page:published:${file}`);
          pageAssetCount++;
        }
      }
    }

    // Scan draft pages
    const draftsDir = join(pagesDir, 'drafts');
    if (existsSync(draftsDir)) {
      const files = await readdir(draftsDir);
      for (const file of files) {
        if (!file.endsWith('.html')) continue;

        const html = await readFile(join(draftsDir, file), 'utf-8');
        const urls = this.extractUrlsFromText(html);

        for (const url of urls) {
          this.addAsset(url, `page:draft:${file}`);
          pageAssetCount++;
        }
      }
    }

    this.stats.fromStaticPages = pageAssetCount;
    this.log(`   ✓ Found ${pageAssetCount} asset references in static pages`);
  }

  async scanSEOBaseline(): Promise<void> {
    this.log('\n🔍 Scanning SEO baseline...');

    const seoFile = join(this.runDir, 'seo', 'baseline.json');
    if (!existsSync(seoFile)) {
      this.log('   ⚠️  SEO baseline not found, skipping');
      return;
    }

    const data = JSON.parse(await readFile(seoFile, 'utf-8'));
    let seoAssetCount = 0;

    const results = data.results || [];
    for (const entry of results) {
      // Extract OG images, Twitter images, favicons
      const fields = [
        entry.ogImage,
        entry.twitterImage,
        entry.canonical
      ];

      for (const field of fields) {
        if (field && typeof field === 'string') {
          const urls = this.extractUrlsFromText(field);
          for (const url of urls) {
            this.addAsset(url, `seo:${entry.url}`);
            seoAssetCount++;
          }
        }
      }
    }

    this.stats.fromSEO = seoAssetCount;
    this.log(`   ✓ Found ${seoAssetCount} asset references in SEO baseline`);
  }

  async scanCodeExport(): Promise<void> {
    this.log('\n📦 Scanning Webflow code export...');

    const codeExportDir = join(process.cwd(), 'design', 'webflow-export', 'extracted');
    if (!existsSync(codeExportDir)) {
      this.log('   ⚠️  Code export directory not found, skipping');
      return;
    }

    let codeAssetCount = 0;

    // Scan images directory
    const imagesDir = join(codeExportDir, 'images');
    if (existsSync(imagesDir)) {
      const scanDir = async (dir: string): Promise<void> => {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = join(dir, entry.name);
          if (entry.isDirectory()) {
            await scanDir(fullPath);
          } else if (entry.isFile()) {
            // Read file and extract URLs (for HTML/CSS files)
            if (entry.name.endsWith('.html') || entry.name.endsWith('.css')) {
              const content = await readFile(fullPath, 'utf-8');
              const urls = this.extractUrlsFromText(content);
              for (const url of urls) {
                this.addAsset(url, `code-export:${entry.name}`);
                codeAssetCount++;
              }
            }
          }
        }
      };

      await scanDir(imagesDir);
    }

    // Scan CSS files for url() references
    const cssDir = join(codeExportDir, 'css');
    if (existsSync(cssDir)) {
      const files = await readdir(cssDir);
      for (const file of files) {
        if (!file.endsWith('.css')) continue;

        const css = await readFile(join(cssDir, file), 'utf-8');
        const urls = this.extractUrlsFromText(css);

        for (const url of urls) {
          this.addAsset(url, `code-export:css:${file}`);
          codeAssetCount++;
        }
      }
    }

    this.stats.fromCodeExport = codeAssetCount;
    this.log(`   ✓ Found ${codeAssetCount} asset references in code export`);
  }

  async saveInventory(): Promise<void> {
    this.stats.totalAssets = this.assets.size;

    const inventory: AssetInventory = {
      exportedAt: new Date().toISOString(),
      siteId: '64a817a2e7e2208272d1ce30',
      stats: this.stats,
      assets: Array.from(this.assets.values())
    };

    const inventoryPath = join(this.runDir, 'assets', 'inventory.json');
    await writeFile(inventoryPath, JSON.stringify(inventory, null, 2) + '\n', 'utf-8');
    this.log(`\n💾 Saved asset inventory: ${inventoryPath}`);

    // Save log
    const logPath = join(this.runDir, 'assets', 'discovery.log');
    await writeFile(logPath, this.logBuffer.join('\n') + '\n', 'utf-8');
    this.log(`💾 Saved log: ${logPath}`);
  }

  async run(): Promise<void> {
    this.log('🚀 Starting asset discovery');
    this.log(`   Run ID: ${this.runId}`);

    await this.scanCMSExports();
    await this.scanStaticPages();
    await this.scanSEOBaseline();
    await this.scanCodeExport();
    await this.saveInventory();

    this.log('');
    this.log('✅ Asset discovery complete!');
    this.log(`   Total unique assets: ${this.stats.totalAssets}`);
    this.log(`   From CMS: ${this.stats.fromCMS}`);
    this.log(`   From static pages: ${this.stats.fromStaticPages}`);
    this.log(`   From SEO: ${this.stats.fromSEO}`);
    this.log(`   From code export: ${this.stats.fromCodeExport}`);
  }
}

// CLI
async function main() {
  const { values } = parseArgs({
    options: {
      'run-id': { type: 'string' }
    }
  });

  const runId = values['run-id'];
  if (!runId) {
    console.error('❌ --run-id is required');
    console.error('   Example: pnpm exec tsx scripts/phase1/build-asset-inventory.ts --run-id=2026-02-11T0626Z');
    process.exit(1);
  }

  const runDir = join(
    process.cwd(),
    'design',
    'migration',
    'phase1',
    'runs',
    runId
  );

  const builder = new AssetInventoryBuilder(runId, runDir);
  await builder.run();
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
