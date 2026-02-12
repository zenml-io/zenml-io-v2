#!/usr/bin/env -S pnpm exec tsx
/**
 * SEO Parity Check — compares built dist/ HTML against Phase 1 baseline.
 *
 * For each URL in the baseline (2,151 pages), extracts SEO-critical fields
 * from the corresponding dist/ HTML file and reports matches/mismatches.
 *
 * Usage:
 *   pnpm exec tsx scripts/phase4/seo-parity-check.ts [--verbose]
 */

import { readFileSync, existsSync } from "fs";
import { load } from "cheerio";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BASELINE_PATH =
  "design/migration/phase1/runs/2026-02-11T0626Z/seo/baseline.json";
const DIST_DIR = "dist";
const SITE_URL = "https://www.zenml.io";
const VERBOSE = process.argv.includes("--verbose");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BaselineEntry {
  url: string;
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
  redirectedFrom: string | null;
}

interface ExtractedSeo {
  title: string | null;
  metaDescription: string | null;
  canonical: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  robotsMeta: string | null;
  h1: string | null;
}

type Comparison = "match" | "acceptable" | "mismatch" | "missing_file";

// ---------------------------------------------------------------------------
// URL → file path mapping
// ---------------------------------------------------------------------------

function urlToDistPath(url: string): string {
  const u = new URL(url);
  let pathname = u.pathname;

  // Strip trailing slash (except root)
  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  // Root → index.html, everything else → <path>.html
  if (pathname === "/") return `${DIST_DIR}/index.html`;
  return `${DIST_DIR}${pathname}.html`;
}

// ---------------------------------------------------------------------------
// HTML extraction
// ---------------------------------------------------------------------------

function extractSeo(html: string): ExtractedSeo {
  const $ = load(html);

  return {
    title: $("title").first().text() || null,
    metaDescription:
      $('meta[name="description"]').attr("content") || null,
    canonical: $('link[rel="canonical"]').attr("href") || null,
    ogTitle: $('meta[property="og:title"]').attr("content") || null,
    ogDescription:
      $('meta[property="og:description"]').attr("content") || null,
    ogImage: $('meta[property="og:image"]').attr("content") || null,
    twitterCard:
      $('meta[name="twitter:card"]').attr("content") || null,
    twitterTitle:
      $('meta[name="twitter:title"]').attr("content") || null,
    twitterDescription:
      $('meta[name="twitter:description"]').attr("content") || null,
    twitterImage:
      $('meta[name="twitter:image"]').attr("content") || null,
    robotsMeta: $('meta[name="robots"]').attr("content") || null,
    h1: $("h1").first().text()?.trim() || null,
  };
}

// ---------------------------------------------------------------------------
// Comparison logic
// ---------------------------------------------------------------------------

interface FieldResult {
  field: string;
  comparison: Comparison;
  baseline: string | null;
  actual: string | null;
  reason?: string;
}

function compareFields(
  baseline: BaselineEntry,
  actual: ExtractedSeo
): FieldResult[] {
  const results: FieldResult[] = [];

  function compare(
    field: string,
    baseVal: string | null,
    actualVal: string | null
  ) {
    // Both null → match
    if (baseVal === null && actualVal === null) {
      results.push({ field, comparison: "match", baseline: baseVal, actual: actualVal });
      return;
    }

    // Exact match
    if (baseVal === actualVal) {
      results.push({ field, comparison: "match", baseline: baseVal, actual: actualVal });
      return;
    }

    // --- Acceptable differences ---

    // Canonical: trailing slash normalization
    if (field === "canonical" && baseVal && actualVal) {
      const normBase = baseVal.replace(/\/$/, "");
      const normActual = actualVal.replace(/\/$/, "");
      if (normBase === normActual) {
        results.push({
          field,
          comparison: "acceptable",
          baseline: baseVal,
          actual: actualVal,
          reason: "trailing slash normalization",
        });
        return;
      }
    }

    // OG image: different URL but both present (content migrated from CDN to R2/local)
    if (field === "ogImage" && baseVal && actualVal) {
      results.push({
        field,
        comparison: "acceptable",
        baseline: baseVal,
        actual: actualVal,
        reason: "image URL changed (CDN → R2/local)",
      });
      return;
    }

    // Twitter fields: baseline null → actual present (improvement)
    if (
      field.startsWith("twitter") &&
      baseVal === null &&
      actualVal !== null
    ) {
      results.push({
        field,
        comparison: "acceptable",
        baseline: baseVal,
        actual: actualVal,
        reason: "new value added (improvement over baseline)",
      });
      return;
    }

    // Twitter image: different URL but both present
    if (field === "twitterImage" && baseVal && actualVal) {
      results.push({
        field,
        comparison: "acceptable",
        baseline: baseVal,
        actual: actualVal,
        reason: "image URL changed (CDN → R2/local)",
      });
      return;
    }

    // Robots meta: "noindex, follow" vs "noindex, nofollow" — both are noindex
    if (field === "robotsMeta") {
      const baseNoindex = baseVal?.includes("noindex");
      const actualNoindex = actualVal?.includes("noindex");
      if (baseNoindex === actualNoindex) {
        results.push({
          field,
          comparison: "acceptable",
          baseline: baseVal,
          actual: actualVal,
          reason: "noindex status matches (follow/nofollow difference)",
        });
        return;
      }
    }

    // Otherwise: mismatch
    results.push({
      field,
      comparison: baseVal === null && actualVal !== null ? "acceptable" : "mismatch",
      baseline: baseVal,
      actual: actualVal,
      reason:
        baseVal === null && actualVal !== null
          ? "new value added (not in baseline)"
          : undefined,
    });
  }

  compare("title", baseline.title, actual.title);
  compare("metaDescription", baseline.metaDescription, actual.metaDescription);
  compare("canonical", baseline.canonical, actual.canonical);
  compare("ogTitle", baseline.ogTitle, actual.ogTitle);
  compare("ogDescription", baseline.ogDescription, actual.ogDescription);
  compare("ogImage", baseline.ogImage, actual.ogImage);
  compare("twitterCard", baseline.twitterCard, actual.twitterCard);
  compare("twitterTitle", baseline.twitterTitle, actual.twitterTitle);
  compare("twitterDescription", baseline.twitterDescription, actual.twitterDescription);
  compare("twitterImage", baseline.twitterImage, actual.twitterImage);
  compare("robotsMeta", baseline.robotsMeta, actual.robotsMeta);
  compare("h1", baseline.h1, actual.h1);

  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf-8"));
  const entries: BaselineEntry[] = baseline.results;

  console.log(`Loaded ${entries.length} baseline URLs`);
  console.log(`Dist directory: ${DIST_DIR}`);
  console.log("---");

  const stats = {
    total: 0,
    filesFound: 0,
    filesMissing: 0,
    fields: { match: 0, acceptable: 0, mismatch: 0 },
  };

  const mismatches: { url: string; fields: FieldResult[] }[] = [];

  for (const entry of entries) {
    stats.total++;
    const filePath = urlToDistPath(entry.url);

    if (!existsSync(filePath)) {
      stats.filesMissing++;
      if (VERBOSE) {
        console.log(`MISSING: ${entry.url} → ${filePath}`);
      }
      continue;
    }

    stats.filesFound++;
    const html = readFileSync(filePath, "utf-8");
    const extracted = extractSeo(html);
    const fieldResults = compareFields(entry, extracted);

    const urlMismatches = fieldResults.filter(
      (f) => f.comparison === "mismatch"
    );
    const urlAcceptable = fieldResults.filter(
      (f) => f.comparison === "acceptable"
    );
    const urlMatches = fieldResults.filter((f) => f.comparison === "match");

    stats.fields.match += urlMatches.length;
    stats.fields.acceptable += urlAcceptable.length;
    stats.fields.mismatch += urlMismatches.length;

    if (urlMismatches.length > 0) {
      mismatches.push({ url: entry.url, fields: urlMismatches });
      if (VERBOSE) {
        console.log(`\nMISMATCH: ${entry.url}`);
        for (const f of urlMismatches) {
          console.log(
            `  ${f.field}: baseline="${f.baseline}" actual="${f.actual}"`
          );
        }
      }
    }
  }

  // --- Summary ---
  console.log("\n========== SEO PARITY REPORT ==========");
  console.log(`Total baseline URLs:    ${stats.total}`);
  console.log(`Files found in dist/:   ${stats.filesFound}`);
  console.log(`Files missing:          ${stats.filesMissing}`);
  console.log();
  console.log("Field-level comparison:");
  const totalFields =
    stats.fields.match + stats.fields.acceptable + stats.fields.mismatch;
  console.log(
    `  Exact matches:        ${stats.fields.match} (${pct(stats.fields.match, totalFields)})`
  );
  console.log(
    `  Acceptable diffs:     ${stats.fields.acceptable} (${pct(stats.fields.acceptable, totalFields)})`
  );
  console.log(
    `  Mismatches:           ${stats.fields.mismatch} (${pct(stats.fields.mismatch, totalFields)})`
  );

  if (mismatches.length > 0) {
    console.log(`\n--- Mismatched URLs (${mismatches.length}) ---`);
    // Group by field to show patterns
    const byField: Record<string, number> = {};
    for (const m of mismatches) {
      for (const f of m.fields) {
        byField[f.field] = (byField[f.field] || 0) + 1;
      }
    }
    console.log("\nMismatch breakdown by field:");
    for (const [field, count] of Object.entries(byField).sort(
      (a, b) => b[1] - a[1]
    )) {
      console.log(`  ${field}: ${count}`);
    }

    // Show first 10 mismatches as examples
    console.log("\nFirst 10 mismatched URLs:");
    for (const m of mismatches.slice(0, 10)) {
      console.log(`  ${m.url}`);
      for (const f of m.fields) {
        console.log(
          `    ${f.field}: baseline="${truncate(f.baseline)}" → actual="${truncate(f.actual)}"`
        );
      }
    }
  }

  const deviation = stats.fields.mismatch / (totalFields || 1);
  console.log(
    `\nOverall deviation: ${(deviation * 100).toFixed(2)}% (target: <5%)`
  );
  console.log(deviation < 0.05 ? "✅ PASS" : "⚠️  ABOVE TARGET");

  process.exit(mismatches.length > 0 ? 1 : 0);
}

function pct(n: number, total: number): string {
  return total === 0 ? "0%" : `${((n / total) * 100).toFixed(1)}%`;
}

function truncate(s: string | null, max = 60): string {
  if (s === null) return "null";
  return s.length > max ? s.slice(0, max) + "…" : s;
}

main();
