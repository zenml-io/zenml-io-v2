/**
 * Migration script: Populate structured frontmatter fields from Webflow JSON.
 *
 * Reads the raw Webflow integrations export and injects new frontmatter fields
 * (overviewTitle, overviewDescription, featuresWithZenmlHtml, toolFeaturesHtml,
 * codeExampleHtml, additionalResources, documentationLinkText, githubLinkText,
 * compareSlug, isUpdatedToNewFormat) into existing src/content/integrations/*.md files.
 *
 * Usage:
 *   pnpm exec tsx scripts/phase6/migrate-integration-fields.ts [--dry-run]
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

// ─── Configuration ─────────────────────────────────────────────────
// design/ is gitignored — in worktree setups, read from the main repo
const MAIN_REPO = process.env.MAIN_REPO || join(process.cwd(), '..', 'zenml-io-v2');
const WEBFLOW_JSON_RELATIVE = 'design/migration/phase1/runs/2026-02-11T0626Z/webflow/items/integrations/live.json';
const WEBFLOW_JSON = existsSync(join(process.cwd(), WEBFLOW_JSON_RELATIVE))
  ? join(process.cwd(), WEBFLOW_JSON_RELATIVE)
  : join(MAIN_REPO, WEBFLOW_JSON_RELATIVE);
const CONTENT_DIR = join(process.cwd(), 'src/content/integrations');
const COMPARE_DIR = join(process.cwd(), 'src/content/compare');
const DRY_RUN = process.argv.includes('--dry-run');

// ─── Types ─────────────────────────────────────────────────────────
interface WebflowFieldData {
  slug: string;
  name: string;
  title?: string;
  description?: string;
  'features-with-zenml'?: string;
  'tool-features'?: string;
  'code-example'?: string;
  'documentation-link-text'?: string;
  'github-link-text'?: string;
  'additional-resource-link-text'?: string;
  'additional-resource-link-url'?: string;
  'additional-resource-2-link-text'?: string;
  'additional-resource-2-link-url'?: string;
  'is-updated-to-the-new-format'?: boolean;
  [key: string]: unknown;
}

interface WebflowItem {
  id: string;
  fieldData: WebflowFieldData;
}

interface AdditionalResource {
  label: string;
  href: string;
}

// ─── Helpers ───────────────────────────────────────────────────────

/** Build a set of compare slugs from the compare content directory */
function loadCompareSlugs(): Set<string> {
  if (!existsSync(COMPARE_DIR)) return new Set();
  return new Set(
    readdirSync(COMPARE_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => basename(f, '.md'))
  );
}

/** Try to find a compare slug for an integration name */
function findCompareSlug(integrationName: string, compareSlugs: Set<string>): string | undefined {
  const normalized = integrationName.toLowerCase().replace(/\s+/g, '-');
  // Try common patterns
  const candidates = [
    `zenml-vs-${normalized}`,
    `zenml-vs-${normalized.replace('apache-', '')}`,  // "Apache Airflow" -> "airflow"
    `zenml-vs-${normalized.replace('aws-', '')}`,      // "AWS SageMaker" -> "sagemaker"
  ];
  for (const candidate of candidates) {
    if (compareSlugs.has(candidate)) return candidate;
  }
  return undefined;
}

/** Escape a string for safe YAML inclusion (double-quoted scalar) */
function yamlQuote(s: string): string {
  // Replace backslashes first, then quotes, then newlines
  return '"' + s
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '') + '"';
}

/** Split a .md file into frontmatter (without delimiters) and body */
function splitFrontmatter(content: string): { frontmatter: string; body: string } | null {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;
  return { frontmatter: match[1], body: match[2] };
}

/** Build the new YAML fields to insert before the closing --- */
function buildNewFields(fd: WebflowFieldData, compareSlugs: Set<string>): string {
  const lines: string[] = [];

  // overviewTitle (Webflow "title" field — marketing title, distinct from name)
  if (fd.title) {
    lines.push(`overviewTitle: ${yamlQuote(fd.title)}`);
  }

  // overviewDescription
  if (fd.description) {
    lines.push(`overviewDescription: ${yamlQuote(fd.description)}`);
  }

  // featuresWithZenmlHtml
  if (fd['features-with-zenml']) {
    lines.push(`featuresWithZenmlHtml: ${yamlQuote(fd['features-with-zenml'])}`);
  }

  // toolFeaturesHtml
  if (fd['tool-features']) {
    lines.push(`toolFeaturesHtml: ${yamlQuote(fd['tool-features'])}`);
  }

  // codeExampleHtml
  if (fd['code-example']) {
    lines.push(`codeExampleHtml: ${yamlQuote(fd['code-example'])}`);
  }

  // documentationLinkText
  if (fd['documentation-link-text']) {
    lines.push(`documentationLinkText: ${yamlQuote(fd['documentation-link-text'])}`);
  }

  // githubLinkText
  if (fd['github-link-text']) {
    lines.push(`githubLinkText: ${yamlQuote(fd['github-link-text'])}`);
  }

  // additionalResources array
  const resources: AdditionalResource[] = [];
  if (fd['additional-resource-link-text'] && fd['additional-resource-link-url']) {
    resources.push({
      label: fd['additional-resource-link-text'],
      href: fd['additional-resource-link-url'],
    });
  }
  if (fd['additional-resource-2-link-text'] && fd['additional-resource-2-link-url']) {
    resources.push({
      label: fd['additional-resource-2-link-text'],
      href: fd['additional-resource-2-link-url'],
    });
  }
  if (resources.length > 0) {
    lines.push('additionalResources:');
    for (const r of resources) {
      lines.push(`  - label: ${yamlQuote(r.label)}`);
      lines.push(`    href: ${yamlQuote(r.href)}`);
    }
  }

  // compareSlug — try to match integration name to a compare page
  const compareSlug = findCompareSlug(fd.name, compareSlugs);
  if (compareSlug) {
    lines.push(`compareSlug: ${yamlQuote(compareSlug)}`);
  }

  // isUpdatedToNewFormat
  if (fd['is-updated-to-the-new-format'] != null) {
    lines.push(`isUpdatedToNewFormat: ${fd['is-updated-to-the-new-format']}`);
  }

  return lines.join('\n');
}

// ─── Main ──────────────────────────────────────────────────────────

function main() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Reading Webflow JSON: ${WEBFLOW_JSON}`);

  const raw = readFileSync(WEBFLOW_JSON, 'utf-8');
  const parsed = JSON.parse(raw);
  const items: WebflowItem[] = Array.isArray(parsed) ? parsed : (parsed.items ?? []);

  console.log(`Found ${items.length} Webflow integration items`);

  const compareSlugs = loadCompareSlugs();
  console.log(`Found ${compareSlugs.size} compare page slugs`);

  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const item of items) {
    const slug = item.fieldData.slug;
    const mdPath = join(CONTENT_DIR, `${slug}.md`);

    if (!existsSync(mdPath)) {
      console.warn(`  SKIP: No .md file for slug "${slug}"`);
      notFound++;
      continue;
    }

    const content = readFileSync(mdPath, 'utf-8');
    const parts = splitFrontmatter(content);
    if (!parts) {
      console.warn(`  SKIP: Could not parse frontmatter for "${slug}"`);
      skipped++;
      continue;
    }

    // Check if already migrated (has overviewTitle)
    if (parts.frontmatter.includes('overviewTitle:')) {
      console.log(`  SKIP: "${slug}" already has structured fields`);
      skipped++;
      continue;
    }

    const newFields = buildNewFields(item.fieldData, compareSlugs);
    if (!newFields) {
      console.log(`  SKIP: "${slug}" has no new fields to add`);
      skipped++;
      continue;
    }

    const newContent = `---\n${parts.frontmatter}\n${newFields}\n---\n${parts.body}`;

    if (DRY_RUN) {
      console.log(`  DRY: Would update "${slug}" (+${newFields.split('\n').length} lines)`);
    } else {
      writeFileSync(mdPath, newContent, 'utf-8');
      console.log(`  UPDATED: "${slug}" (+${newFields.split('\n').length} lines)`);
    }
    updated++;
  }

  console.log(`\nSummary: ${updated} updated, ${skipped} skipped, ${notFound} not found`);
}

main();
