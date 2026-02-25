#!/usr/bin/env -S pnpm exec tsx
/**
 * Redirect Verification — validates the public/_redirects file.
 *
 * Checks:
 * 1. Syntax: each rule has exactly 3 parts (from, to, status)
 * 2. No duplicate source paths
 * 3. Internal destinations exist in dist/
 * 4. No redirect loops
 * 5. Status codes are valid (301 or 302)
 *
 * Usage:
 *   pnpm exec tsx scripts/phase4/verify-redirects.ts
 */

import { readFileSync, existsSync } from "fs";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const REDIRECTS_PATH = "public/_redirects";
const DIST_DIR = "dist";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RedirectRule {
  line: number;
  from: string;
  to: string;
  status: number;
  raw: string;
}

// ---------------------------------------------------------------------------
// Parse
// ---------------------------------------------------------------------------

function parseRedirects(content: string): RedirectRule[] {
  const rules: RedirectRule[] = [];

  content.split("\n").forEach((raw, idx) => {
    const lineNum = idx + 1;
    const trimmed = raw.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith("#")) return;

    const parts = trimmed.split(/\s+/);
    if (parts.length < 3) {
      console.error(`SYNTAX ERROR line ${lineNum}: expected 3 parts, got ${parts.length}: "${trimmed}"`);
      return;
    }

    rules.push({
      line: lineNum,
      from: parts[0],
      to: parts[1],
      status: parseInt(parts[2], 10),
      raw: trimmed,
    });
  });

  return rules;
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

function checkSyntax(rules: RedirectRule[]): number {
  let errors = 0;

  for (const rule of rules) {
    // From must start with /
    if (!rule.from.startsWith("/")) {
      console.error(`  Line ${rule.line}: 'from' must start with / → "${rule.from}"`);
      errors++;
    }

    // Status must be 301 or 302
    if (rule.status !== 301 && rule.status !== 302) {
      console.error(`  Line ${rule.line}: invalid status ${rule.status} → "${rule.raw}"`);
      errors++;
    }

    // To must be absolute URL or start with /
    if (!rule.to.startsWith("/") && !rule.to.startsWith("http")) {
      console.error(`  Line ${rule.line}: 'to' must be absolute URL or start with / → "${rule.to}"`);
      errors++;
    }
  }

  return errors;
}

function checkDuplicates(rules: RedirectRule[]): number {
  let errors = 0;
  const seen = new Map<string, number>();

  for (const rule of rules) {
    const prev = seen.get(rule.from);
    if (prev !== undefined) {
      console.error(`  Line ${rule.line}: duplicate source "${rule.from}" (first seen line ${prev})`);
      errors++;
    }
    seen.set(rule.from, rule.line);
  }

  return errors;
}

function internalToDistCandidates(to: string): string[] {
  const pathOnly = to.split(/[?#]/, 1)[0];

  if (pathOnly === "/") {
    return [`${DIST_DIR}/index.html`];
  }

  // If destination already looks like a file path (e.g. /sitemap-index.xml),
  // check for that exact file in dist/.
  const hasExtension = /\/[^/]+\.[a-z0-9]+$/i.test(pathOnly);
  if (hasExtension) {
    return [`${DIST_DIR}${pathOnly}`];
  }

  // Otherwise treat as an internal page route.
  const normalized = pathOnly.endsWith("/") ? pathOnly.slice(0, -1) : pathOnly;
  return [
    `${DIST_DIR}${normalized}.html`,
    `${DIST_DIR}${normalized}/index.html`,
  ];
}

function checkInternalDestinations(rules: RedirectRule[]): number {
  let warnings = 0;

  for (const rule of rules) {
    // Only check internal destinations (starting with /)
    if (!rule.to.startsWith("/")) continue;

    const candidates = internalToDistCandidates(rule.to);
    const found = candidates.some((candidate) => existsSync(candidate));

    if (!found) {
      console.warn(
        `  Line ${rule.line}: internal destination "${rule.to}" → no file at any of: ${candidates.join(", ")}`,
      );
      warnings++;
    }
  }

  return warnings;
}

function checkLoops(rules: RedirectRule[]): number {
  let errors = 0;
  const ruleMap = new Map(rules.map((r) => [r.from, r]));

  for (const rule of rules) {
    // Direct loop: A → A
    if (rule.from === rule.to) {
      console.error(`  Line ${rule.line}: direct loop → "${rule.from}" redirects to itself`);
      errors++;
      continue;
    }

    // Two-hop loop: A → B → A
    if (rule.to.startsWith("/")) {
      const dest = ruleMap.get(rule.to);
      if (dest && dest.to === rule.from) {
        console.error(`  Line ${rule.line}: two-hop loop → "${rule.from}" → "${rule.to}" → "${dest.to}"`);
        errors++;
      }
    }
  }

  return errors;
}

function checkChains(rules: RedirectRule[]): number {
  let warnings = 0;
  const ruleMap = new Map(rules.map((r) => [r.from, r]));

  for (const rule of rules) {
    if (!rule.to.startsWith("/")) continue;

    const dest = ruleMap.get(rule.to);
    if (dest) {
      console.warn(`  Line ${rule.line}: chain → "${rule.from}" → "${rule.to}" → "${dest.to}" (could flatten to "${rule.from}" → "${dest.to}")`);
      warnings++;
    }
  }

  return warnings;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!existsSync(REDIRECTS_PATH)) {
    console.error(`ERROR: ${REDIRECTS_PATH} not found`);
    process.exit(1);
  }

  const content = readFileSync(REDIRECTS_PATH, "utf-8");
  const rules = parseRedirects(content);

  console.log(`Loaded ${rules.length} redirect rules from ${REDIRECTS_PATH}`);
  console.log("---");

  let totalErrors = 0;
  let totalWarnings = 0;

  console.log("\n1. Syntax check:");
  const syntaxErrors = checkSyntax(rules);
  totalErrors += syntaxErrors;
  console.log(syntaxErrors === 0 ? "   ✅ All rules valid" : `   ❌ ${syntaxErrors} errors`);

  console.log("\n2. Duplicate check:");
  const dupErrors = checkDuplicates(rules);
  totalErrors += dupErrors;
  console.log(dupErrors === 0 ? "   ✅ No duplicates" : `   ❌ ${dupErrors} duplicates`);

  console.log("\n3. Internal destination check:");
  const destWarnings = checkInternalDestinations(rules);
  totalWarnings += destWarnings;
  console.log(destWarnings === 0 ? "   ✅ All internal destinations exist" : `   ⚠️  ${destWarnings} missing destinations`);

  console.log("\n4. Loop check:");
  const loopErrors = checkLoops(rules);
  totalErrors += loopErrors;
  console.log(loopErrors === 0 ? "   ✅ No loops" : `   ❌ ${loopErrors} loops`);

  console.log("\n5. Chain check:");
  const chainWarnings = checkChains(rules);
  totalWarnings += chainWarnings;
  console.log(chainWarnings === 0 ? "   ✅ No chains" : `   ⚠️  ${chainWarnings} chains (could be flattened)`);

  console.log("\n========== REDIRECT REPORT ==========");
  console.log(`Total rules:   ${rules.length}`);
  console.log(`Errors:        ${totalErrors}`);
  console.log(`Warnings:      ${totalWarnings}`);
  console.log(totalErrors === 0 ? "✅ PASS" : "❌ FAIL");

  // Summary: count internal vs external
  const internal = rules.filter((r) => r.to.startsWith("/"));
  const external = rules.filter((r) => !r.to.startsWith("/"));
  console.log(`\nBreakdown: ${internal.length} internal, ${external.length} external`);

  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
