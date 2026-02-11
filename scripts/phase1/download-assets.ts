#!/usr/bin/env tsx
/**
 * Phase 1F: Asset Download
 *
 * Downloads all Webflow-hosted assets from inventory.json with retry logic
 * and resume support.
 *
 * Features:
 * - Stable local paths: sha256(originalUrl) prefix + sanitized filename
 * - Manifest tracking: status, size, sha256, contentType per asset
 * - Retry logic: 429 → backoff, 404 → mark failed, transient → bounded retries
 * - Resume support: skip already-downloaded assets with matching checksums
 * - Parallel downloads with concurrency limit
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/download-assets.ts --run-id=2026-02-11T0626Z
 *
 * Options:
 *   --run-id       Run ID to use (required)
 *   --concurrency  Number of parallel downloads (default: 10)
 */

import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { parseArgs } from 'node:util';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

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

interface ManifestEntry {
  originalUrl: string;
  localPath: string;
  size: number;
  sha256: string;
  contentType: string;
  status: 'success' | 'failed' | 'pending';
  failureReason?: string;
  downloadedAt?: string;
}

interface DownloadManifest {
  runId: string;
  startedAt: string;
  completedAt?: string;
  stats: {
    total: number;
    success: number;
    failed: number;
    skipped: number;
  };
  entries: ManifestEntry[];
}

class AssetDownloader {
  private manifest: DownloadManifest;
  private manifestPath: string;
  private downloadDir: string;
  private logBuffer: string[] = [];
  private stats = {
    total: 0,
    success: 0,
    failed: 0,
    skipped: 0
  };

  constructor(
    private runId: string,
    private runDir: string,
    private concurrency: number = 10
  ) {
    this.downloadDir = join(runDir, 'assets', 'download');
    this.manifestPath = join(runDir, 'assets', 'download-manifest.json');

    this.manifest = {
      runId,
      startedAt: new Date().toISOString(),
      stats: this.stats,
      entries: []
    };
  }

  private log(message: string): void {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${message}`;
    console.log(logLine);
    this.logBuffer.push(logLine);
  }

  private sha256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
  }

  private sha256Buffer(buffer: Buffer): string {
    return createHash('sha256').update(buffer).digest('hex');
  }

  private sanitizeFilename(url: string): string {
    // Extract filename from URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    let filename = pathParts[pathParts.length - 1];

    // Decode URL-encoded characters
    filename = decodeURIComponent(filename);

    // Replace unsafe characters
    filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Ensure extension is present
    if (!extname(filename)) {
      filename += '.bin';
    }

    return filename;
  }

  private getLocalPath(url: string): string {
    const hash = this.sha256(url);
    const prefix = hash.substring(0, 8);
    const filename = this.sanitizeFilename(url);
    return join(this.downloadDir, prefix, filename);
  }

  private async loadExistingManifest(): Promise<void> {
    if (!existsSync(this.manifestPath)) {
      return;
    }

    try {
      const data = await readFile(this.manifestPath, 'utf-8');
      this.manifest = JSON.parse(data);
      this.stats = this.manifest.stats;
      this.log('✓ Loaded existing manifest with ' + this.manifest.entries.length + ' entries');
    } catch (error) {
      this.log(`⚠️  Could not load existing manifest: ${error}`);
    }
  }

  private async saveManifest(): Promise<void> {
    this.manifest.stats = this.stats;
    await writeFile(
      this.manifestPath,
      JSON.stringify(this.manifest, null, 2) + '\n',
      'utf-8'
    );
  }

  private async downloadAsset(
    url: string,
    retries: number = 3
  ): Promise<{ buffer: Buffer; contentType: string } | null> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'ZenML-Migration-Bot/1.0'
          }
        });

        if (response.status === 404) {
          throw new Error('Asset not found (404)');
        }

        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : 5000 * attempt;
          this.log(`   ⏳ Rate limited (429), waiting ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        const contentType = response.headers.get('content-type') || 'application/octet-stream';

        return { buffer, contentType };
      } catch (error) {
        lastError = error as Error;

        if (error instanceof Error && error.message.includes('404')) {
          // Don't retry 404s
          break;
        }

        if (attempt < retries) {
          const delay = 1000 * Math.pow(2, attempt - 1);
          this.log(`   ⚠️  Attempt ${attempt} failed, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    return null;
  }

  private async processAsset(asset: Asset): Promise<ManifestEntry> {
    const url = asset.normalizedUrl;
    const localPath = this.getLocalPath(url);

    // Check if already downloaded
    const existingEntry = this.manifest.entries.find(e => e.originalUrl === url);

    if (existingEntry && existingEntry.status === 'success') {
      // Verify file exists and checksum matches
      if (existsSync(localPath)) {
        try {
          const fileBuffer = await readFile(localPath);
          const fileHash = this.sha256Buffer(fileBuffer);

          if (fileHash === existingEntry.sha256) {
            this.stats.skipped++;
            return existingEntry;
          }
        } catch (error) {
          this.log(`   ⚠️  Could not verify ${localPath}: ${error}`);
        }
      }
    }

    // Download asset
    const result = await this.downloadAsset(url);

    if (!result) {
      this.stats.failed++;
      return {
        originalUrl: url,
        localPath,
        size: 0,
        sha256: '',
        contentType: '',
        status: 'failed',
        failureReason: 'Download failed after retries'
      };
    }

    const { buffer, contentType } = result;

    // Save to disk
    const dir = join(localPath, '..');
    await mkdir(dir, { recursive: true });
    await writeFile(localPath, buffer);

    // Calculate checksum
    const hash = this.sha256Buffer(buffer);

    this.stats.success++;

    return {
      originalUrl: url,
      localPath,
      size: buffer.length,
      sha256: hash,
      contentType,
      status: 'success',
      downloadedAt: new Date().toISOString()
    };
  }

  private async processAssetBatch(assets: Asset[]): Promise<void> {
    const promises = assets.map(asset => this.processAsset(asset));
    const results = await Promise.all(promises);

    // Update manifest
    for (const result of results) {
      const existingIndex = this.manifest.entries.findIndex(
        e => e.originalUrl === result.originalUrl
      );

      if (existingIndex >= 0) {
        this.manifest.entries[existingIndex] = result;
      } else {
        this.manifest.entries.push(result);
      }
    }

    // Save manifest after each batch
    await this.saveManifest();
  }

  async run(): Promise<void> {
    this.log('🚀 Starting asset download');
    this.log(`   Run ID: ${this.runId}`);
    this.log(`   Concurrency: ${this.concurrency}`);

    // Load inventory
    const inventoryPath = join(this.runDir, 'assets', 'inventory.json');
    if (!existsSync(inventoryPath)) {
      throw new Error(`Inventory not found: ${inventoryPath}`);
    }

    const inventoryData = await readFile(inventoryPath, 'utf-8');
    const inventory: AssetInventory = JSON.parse(inventoryData);
    const assets = inventory.assets;

    this.stats.total = assets.length;
    this.log(`   Total assets: ${this.stats.total}`);
    this.log('');

    // Load existing manifest if present
    await this.loadExistingManifest();

    // Create download directory
    await mkdir(this.downloadDir, { recursive: true });

    // Process in batches for concurrency control
    const batchSize = this.concurrency;
    const batches: Asset[][] = [];

    for (let i = 0; i < assets.length; i += batchSize) {
      batches.push(assets.slice(i, i + batchSize));
    }

    this.log(`📦 Processing ${batches.length} batches of ${batchSize} assets each`);
    this.log('');

    let batchNumber = 0;
    for (const batch of batches) {
      batchNumber++;
      this.log(`📥 Batch ${batchNumber}/${batches.length}`);

      await this.processAssetBatch(batch);

      const progress = ((batchNumber / batches.length) * 100).toFixed(1);
      this.log(`   Progress: ${progress}% (${this.stats.success + this.stats.failed + this.stats.skipped}/${this.stats.total})`);
      this.log('');
    }

    // Final save
    this.manifest.completedAt = new Date().toISOString();
    await this.saveManifest();

    // Save log
    const logPath = join(this.runDir, 'assets', 'download.log');
    await writeFile(logPath, this.logBuffer.join('\n') + '\n', 'utf-8');

    this.log('');
    this.log('✅ Asset download complete!');
    this.log(`   Total: ${this.stats.total}`);
    this.log(`   Success: ${this.stats.success}`);
    this.log(`   Skipped: ${this.stats.skipped}`);
    this.log(`   Failed: ${this.stats.failed}`);

    if (this.stats.failed > 0) {
      const failedEntries = this.manifest.entries.filter(e => e.status === 'failed');
      this.log('');
      this.log('❌ Failed downloads:');
      for (const entry of failedEntries.slice(0, 10)) {
        this.log(`   - ${entry.originalUrl}`);
        this.log(`     Reason: ${entry.failureReason}`);
      }
      if (failedEntries.length > 10) {
        this.log(`   ... and ${failedEntries.length - 10} more`);
      }
    }

    const successRate = ((this.stats.success / this.stats.total) * 100).toFixed(1);
    this.log('');
    this.log(`📊 Success rate: ${successRate}%`);
  }
}

// CLI
async function main() {
  const { values } = parseArgs({
    options: {
      'run-id': { type: 'string' },
      'concurrency': { type: 'string', default: '10' }
    }
  });

  const runId = values['run-id'];
  if (!runId) {
    console.error('❌ --run-id is required');
    console.error('   Example: pnpm exec tsx scripts/phase1/download-assets.ts --run-id=2026-02-11T0626Z');
    process.exit(1);
  }

  const concurrency = parseInt(values['concurrency'] || '10', 10);

  const runDir = join(
    process.cwd(),
    'design',
    'migration',
    'phase1',
    'runs',
    runId
  );

  const downloader = new AssetDownloader(runId, runDir, concurrency);
  await downloader.run();
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
