#!/usr/bin/env tsx
/**
 * Phase 1G: Upload to R2 + URL Mapping
 *
 * Uploads all downloaded Webflow assets to Cloudflare R2 and generates
 * a URL mapping for content transformation.
 *
 * Features:
 * - Stable R2 keys: webflow/{siteId}/{sha256-prefix}/{filename}
 * - Resume support: skip already-uploaded objects
 * - Content-Type preservation for web serving
 * - URL map generation: old Webflow URL → new R2 URL
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/upload-to-r2.ts --run-id=2026-02-11T0626Z
 *
 * Options:
 *   --run-id       Run ID to use (required)
 *   --bucket       R2 bucket name (default: zenml-assets)
 *   --concurrency  Number of parallel uploads (default: 5)
 *   --r2-domain    R2 public domain (default: pub-{hash}.r2.dev)
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { parseArgs } from 'node:util';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

interface ManifestEntry {
  originalUrl: string;
  localPath: string;
  size: number;
  sha256: string;
  contentType: string;
  status: 'success' | 'failed';
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

interface UploadEntry {
  originalUrl: string;
  r2Key: string;
  r2Url: string;
  localPath: string;
  size: number;
  sha256: string;
  contentType: string;
  status: 'success' | 'failed' | 'skipped';
  failureReason?: string;
  uploadedAt?: string;
}

interface UploadManifest {
  runId: string;
  bucket: string;
  r2Domain: string;
  startedAt: string;
  completedAt?: string;
  stats: {
    total: number;
    success: number;
    failed: number;
    skipped: number;
  };
  entries: UploadEntry[];
}

interface UrlMap {
  [originalUrl: string]: string;  // new R2 URL
}

class R2Uploader {
  private manifest: UploadManifest;
  private urlMap: UrlMap = {};
  private manifestPath: string;
  private urlMapPath: string;
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
    private bucket: string,
    private r2Domain: string,
    private siteId: string,
    private concurrency: number = 5
  ) {
    const r2Dir = join(runDir, 'r2');
    this.manifestPath = join(r2Dir, 'upload-manifest.json');
    this.urlMapPath = join(r2Dir, 'url-map.json');

    this.manifest = {
      runId,
      bucket,
      r2Domain,
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

  private getR2Key(originalUrl: string, filename: string): string {
    const hash = this.sha256(originalUrl);
    const prefix = hash.substring(0, 8);
    return `webflow/${this.siteId}/${prefix}/${filename}`;
  }

  private getR2Url(r2Key: string): string {
    return `https://${this.r2Domain}/${r2Key}`;
  }

  private async loadExistingManifest(): Promise<void> {
    if (!existsSync(this.manifestPath)) {
      return;
    }

    try {
      const data = await readFile(this.manifestPath, 'utf-8');
      this.manifest = JSON.parse(data);
      this.stats = this.manifest.stats;

      // Rebuild URL map from existing entries
      for (const entry of this.manifest.entries) {
        if (entry.status === 'success') {
          this.urlMap[entry.originalUrl] = entry.r2Url;
        }
      }

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

  private async saveUrlMap(): Promise<void> {
    await writeFile(
      this.urlMapPath,
      JSON.stringify(this.urlMap, null, 2) + '\n',
      'utf-8'
    );
  }

  private async checkIfExists(r2Key: string): Promise<boolean> {
    try {
      const { stdout } = await execAsync(
        `pnpm exec wrangler r2 object get ${this.bucket}/${r2Key} --pipe 2>/dev/null | wc -c`,
        { maxBuffer: 1024 * 1024 }
      );
      const size = parseInt(stdout.trim(), 10);
      return size > 0;
    } catch (error) {
      return false;
    }
  }

  private async uploadFile(
    localPath: string,
    r2Key: string,
    contentType: string
  ): Promise<boolean> {
    try {
      const contentTypeFlag = contentType ? `--content-type="${contentType}"` : '';
      await execAsync(
        `pnpm exec wrangler r2 object put ${this.bucket}/${r2Key} --file="${localPath}" ${contentTypeFlag}`,
        { maxBuffer: 10 * 1024 * 1024 }  // 10MB buffer for large files
      );
      return true;
    } catch (error) {
      this.log(`   ❌ Upload failed: ${error}`);
      return false;
    }
  }

  private async processAsset(entry: ManifestEntry): Promise<UploadEntry> {
    const filename = entry.localPath.split('/').pop()!;
    const r2Key = this.getR2Key(entry.originalUrl, filename);
    const r2Url = this.getR2Url(r2Key);

    // Check if already uploaded
    const existingEntry = this.manifest.entries.find(e => e.originalUrl === entry.originalUrl);

    if (existingEntry && existingEntry.status === 'success') {
      // Verify object exists in R2
      const exists = await this.checkIfExists(r2Key);
      if (exists) {
        this.stats.skipped++;
        this.urlMap[entry.originalUrl] = r2Url;
        return existingEntry;
      }
    }

    // Upload to R2
    const success = await this.uploadFile(entry.localPath, r2Key, entry.contentType);

    if (!success) {
      this.stats.failed++;
      return {
        originalUrl: entry.originalUrl,
        r2Key,
        r2Url,
        localPath: entry.localPath,
        size: entry.size,
        sha256: entry.sha256,
        contentType: entry.contentType,
        status: 'failed',
        failureReason: 'Upload to R2 failed'
      };
    }

    this.stats.success++;
    this.urlMap[entry.originalUrl] = r2Url;

    return {
      originalUrl: entry.originalUrl,
      r2Key,
      r2Url,
      localPath: entry.localPath,
      size: entry.size,
      sha256: entry.sha256,
      contentType: entry.contentType,
      status: 'success',
      uploadedAt: new Date().toISOString()
    };
  }

  private async processAssetBatch(entries: ManifestEntry[]): Promise<void> {
    const promises = entries.map(entry => this.processAsset(entry));
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

    // Save manifest and URL map after each batch
    await this.saveManifest();
    await this.saveUrlMap();
  }

  async run(): Promise<void> {
    this.log('🚀 Starting R2 upload');
    this.log(`   Run ID: ${this.runId}`);
    this.log(`   Bucket: ${this.bucket}`);
    this.log(`   R2 Domain: ${this.r2Domain}`);
    this.log(`   Concurrency: ${this.concurrency}`);

    // Load download manifest
    const downloadManifestPath = join(this.runDir, 'assets', 'download-manifest.json');
    if (!existsSync(downloadManifestPath)) {
      throw new Error(`Download manifest not found: ${downloadManifestPath}`);
    }

    const downloadData = await readFile(downloadManifestPath, 'utf-8');
    const downloadManifest: DownloadManifest = JSON.parse(downloadData);

    // Get successful downloads only
    const successfulAssets = downloadManifest.entries.filter(e => e.status === 'success');
    this.stats.total = successfulAssets.length;

    this.log(`   Total assets to upload: ${this.stats.total}`);
    this.log('');

    // Create R2 directory
    const r2Dir = join(this.runDir, 'r2');
    await mkdir(r2Dir, { recursive: true });

    // Load existing manifest if present
    await this.loadExistingManifest();

    // Process in batches for concurrency control
    const batchSize = this.concurrency;
    const batches: ManifestEntry[][] = [];

    for (let i = 0; i < successfulAssets.length; i += batchSize) {
      batches.push(successfulAssets.slice(i, i + batchSize));
    }

    this.log(`📦 Processing ${batches.length} batches of ${batchSize} assets each`);
    this.log('');

    let batchNumber = 0;
    for (const batch of batches) {
      batchNumber++;
      this.log(`📤 Batch ${batchNumber}/${batches.length}`);

      await this.processAssetBatch(batch);

      const progress = ((batchNumber / batches.length) * 100).toFixed(1);
      this.log(`   Progress: ${progress}% (${this.stats.success + this.stats.failed + this.stats.skipped}/${this.stats.total})`);
      this.log('');
    }

    // Final save
    this.manifest.completedAt = new Date().toISOString();
    await this.saveManifest();
    await this.saveUrlMap();

    // Save log
    const logPath = join(this.runDir, 'r2', 'upload.log');
    await writeFile(logPath, this.logBuffer.join('\n') + '\n', 'utf-8');

    this.log('');
    this.log('✅ R2 upload complete!');
    this.log(`   Total: ${this.stats.total}`);
    this.log(`   Success: ${this.stats.success}`);
    this.log(`   Skipped: ${this.stats.skipped}`);
    this.log(`   Failed: ${this.stats.failed}`);

    if (this.stats.failed > 0) {
      const failedEntries = this.manifest.entries.filter(e => e.status === 'failed');
      this.log('');
      this.log('❌ Failed uploads:');
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
    this.log(`🗺️  URL map entries: ${Object.keys(this.urlMap).length}`);
  }
}

// CLI
async function main() {
  const { values } = parseArgs({
    options: {
      'run-id': { type: 'string' },
      'bucket': { type: 'string', default: 'zenml-assets' },
      'r2-domain': { type: 'string', default: 'pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev' },
      'concurrency': { type: 'string', default: '5' }
    }
  });

  const runId = values['run-id'];
  if (!runId) {
    console.error('❌ --run-id is required');
    console.error('   Example: pnpm exec tsx scripts/phase1/upload-to-r2.ts --run-id=2026-02-11T0626Z');
    process.exit(1);
  }

  const bucket = values['bucket'] || 'zenml-assets';
  const r2Domain = values['r2-domain'] || 'pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev';
  const concurrency = parseInt(values['concurrency'] || '5', 10);
  const siteId = '64a817a2e7e2208272d1ce30';

  const runDir = join(
    process.cwd(),
    'design',
    'migration',
    'phase1',
    'runs',
    runId
  );

  const uploader = new R2Uploader(runId, runDir, bucket, r2Domain, siteId, concurrency);
  await uploader.run();
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
