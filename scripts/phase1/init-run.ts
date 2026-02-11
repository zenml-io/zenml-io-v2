#!/usr/bin/env tsx
/**
 * Phase 1A: Initialize migration run
 *
 * Creates a timestamped run folder and metadata file.
 * This is the starting point for all Phase 1 export/transform operations.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

interface RunMetadata {
  runId: string;
  createdAt: string;
  gitCommitSha: string;
  config: {
    siteUrl: string;
    webflowSiteId: string;
    r2Bucket: string;
    assetBaseUrl: string;
  };
}

async function initRun(): Promise<void> {
  // Generate runId as UTC timestamp (ISO 8601 basic format)
  const now = new Date();
  const runId = now.toISOString().replace(/[:.]/g, '').slice(0, 15) + 'Z';

  console.log(`🚀 Initializing Phase 1 run: ${runId}`);

  // Get current git commit SHA
  const gitSha = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();

  // Create run directory structure
  const baseDir = join(process.cwd(), 'design', 'migration', 'phase1', 'runs', runId);
  const subdirs = [
    'seo',
    'webflow/schemas',
    'webflow/items',
    'pages/published',
    'pages/drafts',
    'assets/download',
    'r2',
    'transform/collections',
    'redirects',
    'animations'
  ];

  console.log(`📁 Creating run directory: ${baseDir}`);
  await mkdir(baseDir, { recursive: true });

  for (const subdir of subdirs) {
    const path = join(baseDir, subdir);
    await mkdir(path, { recursive: true });
  }

  // Create run metadata
  const metadata: RunMetadata = {
    runId,
    createdAt: now.toISOString(),
    gitCommitSha: gitSha,
    config: {
      siteUrl: process.env.SITE_URL || 'https://www.zenml.io',
      webflowSiteId: process.env.WEBFLOW_SITE_ID || '64a817a2e7e2208272d1ce30',
      r2Bucket: process.env.R2_BUCKET || 'zenml-assets',
      assetBaseUrl: process.env.ASSET_BASE_URL || 'https://pub-PLACEHOLDER.r2.dev'
    }
  };

  // Write run.json
  const runJsonPath = join(baseDir, 'run.json');
  await writeFile(runJsonPath, JSON.stringify(metadata, null, 2) + '\n', 'utf-8');

  console.log(`✅ Run initialized successfully`);
  console.log(`   Run ID: ${runId}`);
  console.log(`   Git SHA: ${gitSha.slice(0, 8)}`);
  console.log(`   Base dir: ${baseDir}`);
  console.log(`   Metadata: ${runJsonPath}`);
  console.log();
  console.log(`📝 Next steps:`);
  console.log(`   1. Run SEO baseline crawl (Phase 1B)`);
  console.log(`   2. Export Webflow CMS data (Phase 1C)`);
  console.log();
  console.log(`💡 Pass --run-id=${runId} to subsequent scripts`);
}

// Execute
initRun().catch((error) => {
  console.error('❌ Failed to initialize run:', error);
  process.exit(1);
});
