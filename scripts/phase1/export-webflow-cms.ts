#!/usr/bin/env tsx
/**
 * Phase 1C: Webflow CMS Export (live + staged)
 *
 * Exports all 17 non-empty collections via Webflow API v2:
 * - Collection metadata + schemas
 * - Live items (/items/live) = published
 * - Staged items (/items) = includes drafts
 * - Computes draft status (staged-only → draft: true)
 * - Builds reference resolution map (itemId → slug)
 *
 * Usage:
 *   pnpm exec tsx scripts/phase1/export-webflow-cms.ts --run-id=2026-02-11T0626Z
 *
 * Options:
 *   --run-id     Run ID to use (required)
 *   --site-id    Webflow site ID (default: from .env)
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

interface WebflowCollection {
  id: string;
  slug: string;
  displayName: string;
  singularName: string;
  lastUpdated: string;
  createdOn: string;
}

interface WebflowField {
  id: string;
  slug: string;
  displayName: string;
  type: string;
  isRequired: boolean;
  isEditable: boolean;
}

interface WebflowItem {
  id: string;
  fieldData: Record<string, any>;
  slug?: string;
  name?: string;
  lastPublished?: string;
  lastUpdated?: string;
  isDraft?: boolean;
  isArchived?: boolean;
}

interface CollectionExport {
  collectionId: string;
  slug: string;
  displayName: string;
  liveCount: number;
  stagedCount: number;
  draftCount: number;
  exportedAt: string;
}

interface ReferenceMapEntry {
  slug: string;
  name: string;
  collectionSlug: string;
}

interface ExportStats {
  collections: number;
  totalLiveItems: number;
  totalStagedItems: number;
  totalDrafts: number;
  startTime: string;
  endTime: string | null;
  duration: number | null;
}

class WebflowCMSExporter {
  private collections: WebflowCollection[] = [];
  private schemas: Record<string, WebflowField[]> = {};
  private exports: CollectionExport[] = [];
  private referenceMap: Record<string, ReferenceMapEntry> = {};
  private stats: ExportStats;
  private logBuffer: string[] = [];

  constructor(
    private runId: string,
    private siteId: string,
    private apiToken: string
  ) {
    this.stats = {
      collections: 0,
      totalLiveItems: 0,
      totalStagedItems: 0,
      totalDrafts: 0,
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

  private inferFieldType(value: any): string {
    if (value === null || value === undefined) return 'unknown';
    if (typeof value === 'string') return 'PlainText';
    if (typeof value === 'number') return 'Number';
    if (typeof value === 'boolean') return 'Bool';
    if (Array.isArray(value)) return 'MultiReference';
    if (typeof value === 'object') {
      if (value.fileId || value.url) return 'ImageRef';
      if (value.id) return 'ItemRef';
      return 'RichText';
    }
    return 'unknown';
  }

  private async apiRequest<T>(
    endpoint: string,
    options: { method?: string; retries?: number } = {}
  ): Promise<T> {
    const { method = 'GET', retries = 5 } = options;
    const url = `https://api.webflow.com/v2${endpoint}`;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'accept-version': '2.0.0'
          }
        });

        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get('retry-after');
          const waitSeconds = retryAfter ? parseInt(retryAfter, 10) : 60;
          this.log(`⏱️  Rate limited. Waiting ${waitSeconds}s...`);
          await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));
          continue;
        }

        // Handle server errors with exponential backoff
        if (response.status >= 500) {
          const backoff = Math.min(2 ** attempt, 30);
          this.log(`⚠️  Server error ${response.status}. Retry ${attempt}/${retries} in ${backoff}s...`);
          await new Promise(resolve => setTimeout(resolve, backoff * 1000));
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json() as T;
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }
        const backoff = Math.min(2 ** attempt, 30);
        this.log(`⚠️  Request failed: ${error}. Retry ${attempt}/${retries} in ${backoff}s...`);
        await new Promise(resolve => setTimeout(resolve, backoff * 1000));
      }
    }

    throw new Error('Max retries exceeded');
  }

  private async fetchCollections(): Promise<void> {
    this.log('📡 Fetching collections list...');

    interface CollectionsResponse {
      collections: (WebflowCollection & { fields?: WebflowField[] })[];
    }

    const response = await this.apiRequest<CollectionsResponse>(
      `/sites/${this.siteId}/collections`
    );

    this.collections = response.collections;

    // Extract fields if they're included in the collection response
    for (const collection of response.collections) {
      if (collection.fields) {
        this.schemas[collection.id] = collection.fields;
      }
    }

    this.log(`✅ Found ${this.collections.length} collections`);
  }

  private async fetchCollectionDetails(collectionId: string): Promise<WebflowField[] | null> {
    // Fetch collection details which includes the fields array
    // See: https://developers.webflow.com/data/reference/cms/collections/list
    try {
      interface CollectionDetailResponse {
        id: string;
        displayName: string;
        slug: string;
        singularName: string;
        fields: WebflowField[];
      }

      const response = await this.apiRequest<CollectionDetailResponse>(
        `/collections/${collectionId}`,
        { retries: 2 }
      );

      return response.fields || null;
    } catch (error) {
      this.log(`   ⚠️  Could not fetch collection details: ${error}`);
      return null;
    }
  }

  private async fetchItems(
    collectionId: string,
    endpoint: 'items' | 'items/live'
  ): Promise<WebflowItem[]> {
    const items: WebflowItem[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      interface ItemsResponse {
        items: WebflowItem[];
        pagination: {
          limit: number;
          offset: number;
          total: number;
        };
      }

      const response = await this.apiRequest<ItemsResponse>(
        `/collections/${collectionId}/${endpoint}?limit=${limit}&offset=${offset}`
      );

      items.push(...response.items);

      const { total } = response.pagination;
      offset += limit;

      if (offset >= total) {
        break;
      }

      this.log(`   Fetched ${items.length}/${total} items...`);
    }

    return items;
  }

  private async exportCollection(collection: WebflowCollection): Promise<void> {
    this.log(`\n📦 Exporting collection: ${collection.displayName} (${collection.slug})`);

    // Fetch schema if not already populated
    if (!this.schemas[collection.id]) {
      this.log(`   Fetching collection details for schema...`);
      const fields = await this.fetchCollectionDetails(collection.id);
      if (fields) {
        this.schemas[collection.id] = fields;
        this.log(`   ✓ Got ${fields.length} fields from API`);
      } else {
        this.log(`   ⚠️  Could not fetch fields, will infer schema from items`);
      }
    }

    // Fetch live items
    this.log(`   Fetching live items...`);
    const liveItems = await this.fetchItems(collection.id, 'items/live');
    this.log(`   ✓ ${liveItems.length} live items`);

    // Fetch staged items
    this.log(`   Fetching staged items...`);
    const stagedItems = await this.fetchItems(collection.id, 'items');
    this.log(`   ✓ ${stagedItems.length} staged items`);

    // Compute draft status
    const liveIds = new Set(liveItems.map(item => item.id));
    const stagedIds = new Set(stagedItems.map(item => item.id));
    const draftIds = Array.from(stagedIds).filter(id => !liveIds.has(id));
    const draftCount = draftIds.length;

    this.log(`   ℹ️  ${draftCount} draft items (staged-only)`);

    // Infer schema from items if not available from API
    if (!this.schemas[collection.id] && stagedItems.length > 0) {
      this.log(`   Inferring schema from items...`);
      const inferredFields: WebflowField[] = [];
      const sampleItem = stagedItems[0];

      // Infer from fieldData keys
      for (const [key, value] of Object.entries(sampleItem.fieldData)) {
        inferredFields.push({
          id: key,
          slug: key,
          displayName: key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          type: this.inferFieldType(value),
          isRequired: false,
          isEditable: true
        });
      }

      this.schemas[collection.id] = inferredFields;
      this.log(`   ✓ Inferred ${inferredFields.length} fields`);
    }

    // Build reference map entries
    for (const item of stagedItems) {
      const slug = item.slug || item.fieldData.slug || item.id;
      const name = item.name || item.fieldData.name || slug;
      this.referenceMap[item.id] = {
        slug,
        name,
        collectionSlug: collection.slug
      };
    }

    // Save live items
    const liveDir = join(
      process.cwd(),
      'design',
      'migration',
      'phase1',
      'runs',
      this.runId,
      'webflow',
      'items',
      collection.slug
    );
    await mkdir(liveDir, { recursive: true });

    const livePath = join(liveDir, 'live.json');
    await writeFile(
      livePath,
      JSON.stringify({ items: liveItems }, null, 2) + '\n',
      'utf-8'
    );
    this.log(`   💾 Saved: ${livePath}`);

    // Save staged items
    const stagedPath = join(liveDir, 'staged.json');
    await writeFile(
      stagedPath,
      JSON.stringify({ items: stagedItems }, null, 2) + '\n',
      'utf-8'
    );
    this.log(`   💾 Saved: ${stagedPath}`);

    // Track export
    this.exports.push({
      collectionId: collection.id,
      slug: collection.slug,
      displayName: collection.displayName,
      liveCount: liveItems.length,
      stagedCount: stagedItems.length,
      draftCount: draftCount,
      exportedAt: new Date().toISOString()
    });

    this.stats.totalLiveItems += liveItems.length;
    this.stats.totalStagedItems += stagedItems.length;
    this.stats.totalDrafts += draftIds.length;
  }

  private async saveManifests(): Promise<void> {
    const baseDir = join(
      process.cwd(),
      'design',
      'migration',
      'phase1',
      'runs',
      this.runId,
      'webflow'
    );

    // Save collections.json
    const collectionsPath = join(baseDir, 'collections.json');
    await writeFile(
      collectionsPath,
      JSON.stringify(
        {
          siteId: this.siteId,
          exportedAt: new Date().toISOString(),
          stats: this.stats,
          collections: this.exports
        },
        null,
        2
      ) + '\n',
      'utf-8'
    );
    this.log(`💾 Saved collections manifest: ${collectionsPath}`);

    // Save schemas
    const schemasDir = join(baseDir, 'schemas');
    await mkdir(schemasDir, { recursive: true });

    const schemasPath = join(schemasDir, 'collections.schema.json');
    await writeFile(
      schemasPath,
      JSON.stringify(this.schemas, null, 2) + '\n',
      'utf-8'
    );
    this.log(`💾 Saved schemas: ${schemasPath}`);

    // Save reference map
    const refMapPath = join(baseDir, 'reference-map.json');
    await writeFile(
      refMapPath,
      JSON.stringify(this.referenceMap, null, 2) + '\n',
      'utf-8'
    );
    this.log(`💾 Saved reference map: ${refMapPath} (${Object.keys(this.referenceMap).length} items)`);

    // Save log
    const logPath = join(baseDir, 'export.log');
    await writeFile(logPath, this.logBuffer.join('\n') + '\n', 'utf-8');
    this.log(`💾 Saved log: ${logPath}`);
  }

  async run(): Promise<void> {
    try {
      this.log('🚀 Starting Webflow CMS export');
      this.log(`   Site ID: ${this.siteId}`);
      this.log(`   Run ID: ${this.runId}`);

      // Fetch collections list
      await this.fetchCollections();

      // Export each collection
      this.stats.collections = this.collections.length;
      for (const collection of this.collections) {
        await this.exportCollection(collection);
      }

      // Finalize stats
      this.stats.endTime = new Date().toISOString();
      this.stats.duration = Date.now() - new Date(this.stats.startTime).getTime();

      // Save manifests
      await this.saveManifests();

      // Summary
      this.log('');
      this.log('✅ Export complete!');
      this.log(`   Collections: ${this.stats.collections}`);
      this.log(`   Total live items: ${this.stats.totalLiveItems}`);
      this.log(`   Total staged items: ${this.stats.totalStagedItems}`);
      this.log(`   Total drafts: ${this.stats.totalDrafts}`);
      this.log(`   Duration: ${Math.round(this.stats.duration! / 1000)}s`);

      // Validation warnings
      if (this.stats.collections < 17) {
        this.log('');
        this.log(`⚠️  WARNING: Expected 17 collections but got ${this.stats.collections}`);
      }

      if (this.stats.totalStagedItems < 2300) {
        this.log('');
        this.log(`⚠️  WARNING: Expected ~2,340 items but got ${this.stats.totalStagedItems}`);
      }

    } catch (error) {
      this.log(`❌ Export failed: ${error}`);
      throw error;
    }
  }
}

// CLI
async function main() {
  const { values } = parseArgs({
    options: {
      'run-id': { type: 'string' },
      'site-id': { type: 'string' }
    }
  });

  const runId = values['run-id'];
  if (!runId) {
    console.error('❌ --run-id is required');
    console.error('   Example: pnpm exec tsx scripts/phase1/export-webflow-cms.ts --run-id=2026-02-11T0626Z');
    process.exit(1);
  }

  // Load .env
  const envPath = join(process.cwd(), '.env');
  const envContent = await readFile(envPath, 'utf-8');
  const env: Record<string, string> = {};
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match) {
      env[match[1]] = match[2];
    }
  }

  const siteId = values['site-id'] || env.WEBFLOW_SITE_ID;
  const apiToken = env.WEBFLOW_TOKEN;

  if (!siteId) {
    console.error('❌ --site-id or WEBFLOW_SITE_ID env var required');
    process.exit(1);
  }

  if (!apiToken) {
    console.error('❌ WEBFLOW_TOKEN env var required');
    process.exit(1);
  }

  const exporter = new WebflowCMSExporter(runId, siteId, apiToken);
  await exporter.run();
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
