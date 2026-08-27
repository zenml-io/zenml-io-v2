/**
 * audit.ts — PR3 comparison-consolidation audit.
 *
 * Measured what the old MlopsCompare template extracted from each of the 25
 * `/compare/zenml-vs-*` entry bodies and which fallbacks each entry engaged,
 * and wrote AUDIT.md as committed, reviewable evidence for the consolidation.
 *
 * IT HAS ALREADY RUN, AND ITS SUBJECT IS GONE. The conversion materialised
 * those values into `blocks[]` and blanked the bodies, and MlopsCompare.astro
 * was deleted. This file is a record of how the 25 entries were read, not a
 * live path: run it now and it reports that there is nothing left to measure.
 * AUDIT.md describes the tree at the commit it names — do not regenerate it.
 *
 * The three body-extraction expressions were copied character-for-character
 * from MlopsCompare.astro so the audit could not disagree with the template.
 *
 * Extraction mirrors the template's precedence: an explicit frontmatter field
 * (`featureTableHtml`, `codeComparison`, and — at the OBJECT level, not the
 * field level — `finalCta`) short-circuits the corresponding body regex,
 * exactly as in MlopsCompare. Today no entry sets any of them, so every
 * extraction is body-sourced; but the whole point of PR3 is to materialise
 * these fields, so the audit tracks the source rather than assuming it.
 *
 * Frontmatter is read raw via gray-matter, while the template consumes
 * Zod-parsed `item.data`, so schema defaults are invisible here. Two of them
 * change behaviour and are modelled explicitly rather than read:
 * `finalCta.bullets` defaults to `[]` (so `finalCta:` written without
 * `bullets:` renders none, discarding the body's), and
 * `valueSections[].imageSide` defaults to `"right"` (irrelevant while the
 * template overrides it with an `i % 2` alternation). `codeComparison`'s two
 * language fields default to `"python"`, which this script applies itself.
 *
 * Modes:
 *   (no argument)     Regenerate the report in memory and diff it against
 *                     AUDIT.md on disk (ignoring the pinned commit line, so a
 *                     commit that changes nothing measured doesn't turn the
 *                     gate red). Exit 0 if current, exit 1 with the first
 *                     differing line if stale.
 *   --write           (Re)write AUDIT.md.
 *   --verify-dist     Cross-check the rendered pages: for each entry, confirm
 *                     the final-CTA bullets in `dist/client/compare/<slug>.html`
 *                     really come from where the regex says (body-extracted vs
 *                     category-default), including a negative check that the
 *                     `<ul id="">` entries' authored bullets do NOT render.
 *                     Requires a fresh `pnpm build`.
 *
 * Bodies are read via gray-matter's `content`; the template reads Astro's
 * `item.body`. The two can disagree by one leading newline after the closing
 * frontmatter delimiter. None of the three extraction regexes is anchored at
 * start-of-string, so hit counts are unaffected — but the leftover-bytes
 * column could in principle drift by one byte against an Astro-side
 * measurement. `--verify-dist` is the ground-truth check.
 *
 * This script is deliberately NOT added to `package.json`'s `lint` script or
 * `biome.json`'s `includes` list — both enumerate scripts individually, and
 * `scripts/migrations/split-project-bodies.ts` follows the same convention.
 * Note that also means `pnpm exec biome check <this file>` is a silent no-op
 * (Biome only processes paths in `biome.json`'s `files.includes` allowlist):
 * to actually lint/format it, point `--config-path` at a config without that
 * allowlist. It was formatted that way when authored. Types are kept trivial
 * — `tsconfig.check.json` excludes `scripts/`, so `astro check` never sees
 * this file.
 *
 * Usage:
 *   pnpm exec tsx scripts/migrations/compare-blocks/audit.ts
 *   pnpm exec tsx scripts/migrations/compare-blocks/audit.ts --write
 *   pnpm exec tsx scripts/migrations/compare-blocks/audit.ts --verify-dist
 */

import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { getCategoryDefaults } from "../../../src/lib/compareDefaults.ts";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../../..");
const CONTENT_DIR = path.join(ROOT, "src/content/compare");
const DIST_COMPARE_DIR = path.join(ROOT, "dist/client/compare");
const REPORT_PATH = path.join(SCRIPT_DIR, "AUDIT.md");

/** GENERIC is a stable module-level object, so identity against the no-category call labels the fallthrough without duplicating the lookup table. */
const GENERIC_DEFAULTS = getCategoryDefaults(undefined);

type Source = "frontmatter" | "body" | "none";
type BulletSource = "frontmatter" | "body" | "category-default";

interface CompareEntry {
  slug: string;
  filename: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

interface ExtractionResult {
  slug: string;
  tableSource: Source;
  codeSource: Source;
  codeLanguages: [string, string] | null;
  bulletSource: BulletSource;
  bulletCount: number;
  /** The bullet texts the template will actually render, per its precedence. */
  renderedBullets: string[];
  /** Bullet texts inside a trailing `<ul id="">` block the regex does NOT match (dvc/kserve quirk). */
  unmatchedUlIdBullets: string[];
  hasTrailingUlId: boolean;
  heroPrimaryCta: "explicit" | "fallback";
  heroSecondaryCta: "explicit" | "fallback";
  valueSections: "explicit" | "fallback";
  strategyCtaHeadline: "explicit" | "fallback";
  finalCta: "explicit" | "fallback";
  relatedBlogSlugs: "explicit" | "fallback";
  quote: "explicit" | "fallback";
  headlineOutcome: "ctaHeadline" | "finalCta.headline" | "category-default";
  seo: "present" | "missing";
  category: string | undefined;
  defaultsLabel: string;
  leftoverBodyBytes: number;
  leftoverBodyPreview: string | null;
}

function readCompareEntries(): CompareEntry[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8"),
      );
      return {
        slug: (data.slug as string) || filename.replace(".md", ""),
        filename,
        frontmatter: data as Record<string, unknown>,
        body: content,
      };
    })
    .filter((entry) => !entry.frontmatter.draft)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function extractAndAudit(entry: CompareEntry): ExtractionResult {
  const fm = entry.frontmatter;
  const rawBody = entry.body || "";
  const defaults = getCategoryDefaults(fm.category as string | undefined);

  // Table — frontmatter featureTableHtml short-circuits the body regex
  // (MlopsCompare.astro line ~138).
  let tableSource: Source = "none";
  let tableMatchStr: string | null = null;
  if (fm.featureTableHtml) {
    tableSource = "frontmatter";
  } else if (rawBody) {
    const tableMatch = rawBody.match(
      /(?:<div[^>]*>\s*)?<table[\s\S]*?<\/table>\s*(?:<\/div>)?/i,
    );
    if (tableMatch) {
      tableSource = "body";
      tableMatchStr = tableMatch[0];
    }
  }

  // Code pair — frontmatter codeComparison short-circuits (line ~151). The
  // template consumes only the first two fences.
  let codeSource: Source = "none";
  let codeLanguages: [string, string] | null = null;
  let usedCodeMatches: string[] = [];
  if (fm.codeComparison) {
    codeSource = "frontmatter";
    const cc = fm.codeComparison as Record<string, string>;
    codeLanguages = [cc.zenmlLanguage || "python", cc.toolLanguage || "python"];
  } else if (rawBody) {
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    const matches = [...rawBody.matchAll(codeBlockRegex)];
    if (matches.length >= 2) {
      codeSource = "body";
      codeLanguages = [matches[0][1] || "python", matches[1][1] || "python"];
      usedCodeMatches = [matches[0][0], matches[1][0]];
    }
  }

  // CTA bullets. The template's precedence is subtler than "frontmatter
  // bullets win": `finalCta.bullets` seeds `ctaBullets` (line ~168), but the
  // rendered value is `finalCta.bullets` where
  // `finalCta = item.data.finalCta || {…body-or-default bullets…}` (line ~190).
  // So an entry that sets `finalCta` AT ALL takes its bullets from that object
  // and the body extraction is discarded — and Zod defaults `bullets` to `[]`
  // (content.config.ts `compareFinalCtaSchema`), so `finalCta:` without
  // `bullets:` renders NO bullets. That is exactly the shape PR3 materialises,
  // so the audit models the object-level short-circuit, not the field-level one.
  const fmFinalCta = fm.finalCta as
    | { bullets?: string[]; headline?: string }
    | undefined;
  let bulletSource: BulletSource = "category-default";
  let renderedBullets: string[] = defaults.finalCta.bullets;
  let ulMatchStr: string | null = null;
  let bodyBullets: string[] = [];
  if (rawBody) {
    const ulMatch = rawBody.match(/<ul>\s*(<li>[\s\S]*?)<\/ul>\s*$/);
    if (ulMatch) {
      const liMatches = [...ulMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/g)];
      if (liMatches.length > 0) {
        bodyBullets = liMatches.map((m) => m[1].trim());
        ulMatchStr = ulMatch[0];
      }
    }
  }
  if (fmFinalCta) {
    bulletSource = "frontmatter";
    renderedBullets = fmFinalCta.bullets ?? [];
  } else if (bodyBullets.length > 0) {
    bulletSource = "body";
    renderedBullets = bodyBullets;
  }

  // Diagnostic only (not a template expression): a trailing <ul id=""> block
  // the bare-<ul> regex refuses — dvc and kserve. Those authored bullets never
  // render; the category default renders instead. Latent bug, preserved.
  let unmatchedUlIdBullets: string[] = [];
  const ulIdMatch = rawBody.match(/<ul[^>]*id="[^"]*"[^>]*>[\s\S]*?<\/ul>\s*$/);
  if (bulletSource !== "body" && ulIdMatch) {
    unmatchedUlIdBullets = [
      ...ulIdMatch[0].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g),
    ].map((m) => stripTags(m[1]).trim());
  }

  // Leftover: the body minus the regions the template actually consumed from it.
  let leftoverBody = rawBody;
  if (tableMatchStr) leftoverBody = leftoverBody.replace(tableMatchStr, "");
  for (const m of usedCodeMatches) leftoverBody = leftoverBody.replace(m, "");
  if (ulMatchStr) leftoverBody = leftoverBody.replace(ulMatchStr, "");
  leftoverBody = leftoverBody.trim();
  const leftoverBodyBytes = Buffer.byteLength(leftoverBody, "utf-8");
  const leftoverBodyPreview =
    leftoverBodyBytes > 0 && leftoverBodyBytes <= 40
      ? JSON.stringify(leftoverBody)
      : null;

  // Final-CTA headline precedence (MlopsCompare.astro line ~303):
  // item.data.ctaHeadline || finalCta.headline, where finalCta itself falls
  // back to the category default when not set in frontmatter.
  let headlineOutcome: ExtractionResult["headlineOutcome"] = "category-default";
  if (fm.ctaHeadline) headlineOutcome = "ctaHeadline";
  else if ((fm.finalCta as { headline?: string } | undefined)?.headline)
    headlineOutcome = "finalCta.headline";

  return {
    slug: entry.slug,
    tableSource,
    codeSource,
    codeLanguages,
    bulletSource,
    bulletCount: renderedBullets.length,
    renderedBullets,
    unmatchedUlIdBullets,
    hasTrailingUlId: unmatchedUlIdBullets.length > 0,
    heroPrimaryCta: fm.heroPrimaryCta ? "explicit" : "fallback",
    heroSecondaryCta: fm.heroSecondaryCta ? "explicit" : "fallback",
    valueSections: fm.valueSections ? "explicit" : "fallback",
    strategyCtaHeadline: fm.strategyCtaHeadline ? "explicit" : "fallback",
    finalCta: fm.finalCta ? "explicit" : "fallback",
    // The template's condition is `relatedBlogSlugs && …length > 0`, so an
    // empty array takes the dynamic recent-posts branch, not the pinned one.
    relatedBlogSlugs:
      Array.isArray(fm.relatedBlogSlugs) && fm.relatedBlogSlugs.length > 0
        ? "explicit"
        : "fallback",
    quote: fm.quote ? "explicit" : "fallback",
    headlineOutcome,
    seo: fm.seo ? "present" : "missing",
    category: fm.category as string | undefined,
    defaultsLabel:
      defaults === GENERIC_DEFAULTS ? "GENERIC" : String(fm.category),
    leftoverBodyBytes,
    leftoverBodyPreview,
  };
}

const SHA_PLACEHOLDER = "[unpinned]";
const SHA_LINE_RE = /^\*\*Generated from commit:\*\* .*$/m;

function generateReport(results: ExtractionResult[], sha: string): string {
  const n = results.length;
  const tableHits = results.filter((r) => r.tableSource === "body").length;
  const codeHits = results.filter((r) => r.codeSource === "body").length;
  const bulletHits = results.filter((r) => r.bulletSource === "body").length;
  const noUl = results.filter(
    (r) => r.bulletSource === "category-default" && !r.hasTrailingUlId,
  );
  const ulIdQuirk = results.filter(
    (r) => r.bulletSource === "category-default" && r.hasTrailingUlId,
  );
  const seoMissing = results.filter((r) => r.seo === "missing");
  const noQuote = results.filter((r) => r.quote === "fallback");
  const generic = results.filter((r) => r.defaultsLabel === "GENERIC");

  const lines: string[] = [];
  lines.push("# Compare-page extraction audit");
  lines.push("");
  lines.push(`**Generated from commit:** ${sha}`);
  lines.push("");
  lines.push(
    "**Regenerate with:** `pnpm exec tsx scripts/migrations/compare-blocks/audit.ts --write`",
  );
  lines.push("");
  lines.push("## Totals");
  lines.push("");
  lines.push("| Metric | Count |");
  lines.push("|--------|-------|");
  lines.push(`| Entries audited | ${n} |`);
  lines.push(`| Table extracted from body | ${tableHits}/${n} |`);
  lines.push(`| Code pair extracted from body | ${codeHits}/${n} |`);
  lines.push(`| CTA bullets extracted from body | ${bulletHits}/${n} |`);
  lines.push(
    `| CTA-bullet misses, no trailing \`<ul>\` at all | ${noUl.length} (${noUl.map((r) => r.slug).join(", ") || "—"}) |`,
  );
  lines.push(
    `| CTA-bullet misses, trailing \`<ul id="">\` quirk | ${ulIdQuirk.length} (${ulIdQuirk.map((r) => r.slug).join(", ") || "—"}) |`,
  );
  lines.push(
    `| Entries needing seo materialisation | ${seoMissing.length} (${seoMissing.map((r) => r.slug).join(", ") || "—"}) |`,
  );
  lines.push(
    `| Entries with no quote (no testimonial renders) | ${noQuote.length} |`,
  );
  lines.push(
    `| Entries falling through to GENERIC defaults | ${generic.length} |`,
  );
  lines.push("");
  lines.push("## Per-entry breakdown");
  lines.push("");
  lines.push(
    "| Slug | Table | Code (langs) | CTA bullets | Headline | SEO | Quote | Hero 1°/2° | Value sections | Strategy HL | Final CTA | Blog rail | Category → defaults | Leftover bytes |",
  );
  lines.push(
    "|------|-------|--------------|-------------|----------|-----|-------|------------|----------------|-------------|-----------|-----------|---------------------|----------------|",
  );

  for (const r of results) {
    const table = r.tableSource === "body" ? "✓ body" : r.tableSource;
    const code =
      r.codeSource === "body" && r.codeLanguages
        ? `✓ body (${r.codeLanguages[0]}, ${r.codeLanguages[1]})`
        : r.codeSource;
    const bullets =
      r.bulletSource === "body"
        ? `✓ body (${r.bulletCount})`
        : r.hasTrailingUlId
          ? `✗ default (\`<ul id="">\` quirk)`
          : "✗ default";
    const ef = (v: "explicit" | "fallback") => (v === "explicit" ? "E" : "F");
    const row = [
      r.slug,
      table,
      code,
      bullets,
      r.headlineOutcome,
      r.seo === "present" ? "✓" : "✗",
      r.quote === "explicit" ? "✓" : "✗",
      `${ef(r.heroPrimaryCta)}/${ef(r.heroSecondaryCta)}`,
      ef(r.valueSections),
      ef(r.strategyCtaHeadline),
      ef(r.finalCta),
      ef(r.relatedBlogSlugs),
      `${r.category || "(none)"} → ${r.defaultsLabel}`,
      r.leftoverBodyPreview
        ? `${r.leftoverBodyBytes} ${r.leftoverBodyPreview}`
        : String(r.leftoverBodyBytes),
    ];
    lines.push(`| ${row.join(" | ")} |`);
  }

  lines.push("");
  lines.push("### Legend");
  lines.push("");
  lines.push(
    "- **E / F** — the frontmatter field is set Explicitly / the template's Fallback engages (hero CTAs, value sections, strategy headline, final CTA, blog rail = `relatedBlogSlugs`).",
  );
  lines.push(
    "- **Headline** — which side of `ctaHeadline || finalCta.headline` the rendered final-CTA headline comes from; `category-default` when neither frontmatter field is set.",
  );
  lines.push(
    "- **SEO** — whether the entry has any `seo:` block. Every entry that has one currently carries description, canonical and ogImage, so presence equals completeness for today's data.",
  );
  lines.push(
    "- **Leftover bytes** — bytes remaining (after trim) once the body regions the template consumes are removed; leftovers of ≤ 40 bytes are printed through `JSON.stringify` so invisible characters are visible.",
  );
  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push(
    '- **`<ul id="">` quirk**: the bullet regex demands a bare `<ul>`, so the two entries whose trailing list is `<ul id="">` (dvc, kserve) never render their authored bullets — the category default renders instead. A latent bug the consolidation must preserve byte-for-byte.',
  );
  lines.push(
    "- **imageSide**: when `valueSections` falls back to category defaults, the template overrides each section's `imageSide` with an `i % 2` alternation. The stored `imageSide` values in `compareDefaults.ts` are unused — and consistent with the alternation in all four default sets — so a renderer honouring the stored values is byte-safe today but silently fragile if those defaults are ever edited.",
  );
  lines.push(
    "- **Code languages** default to `python` when a fence has no language tag. The template consumes only the first two fences.",
  );
  lines.push(
    "- **Body source**: bodies are read via gray-matter here, `item.body` in Astro; the extraction regexes are insensitive to the one-newline difference that can exist between the two (see docblock), and `--verify-dist` cross-checks against the rendered pages.",
  );
  lines.push("");
  return lines.join("\n");
}

/** Lowercase, tag-stripped, entity-decoded, whitespace-collapsed form for substring checks against rendered HTML. */
function canonical(text: string): string {
  return stripTags(text)
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .toLowerCase()
    .replace(/[^a-z0-9'"&]+/g, " ")
    .trim();
}

function runVerifyDist(results: ExtractionResult[]): void {
  if (!fs.existsSync(DIST_COMPARE_DIR)) {
    console.error(
      `ERROR: ${DIST_COMPARE_DIR} not found. Run \`pnpm build\` before --verify-dist.`,
    );
    process.exit(1);
  }

  let failures = 0;
  for (const r of results) {
    const pagePath = path.join(DIST_COMPARE_DIR, `${r.slug}.html`);
    if (!fs.existsSync(pagePath)) {
      console.log(`❌ ${r.slug}: ${pagePath} missing from dist`);
      failures += 1;
      continue;
    }
    const page = canonical(fs.readFileSync(pagePath, "utf-8"));

    const missing = r.renderedBullets.filter(
      (b) => !page.includes(canonical(b)),
    );
    const leaked = r.unmatchedUlIdBullets.filter((b) =>
      page.includes(canonical(b)),
    );

    if (missing.length === 0 && leaked.length === 0) {
      console.log(`✅ ${r.slug}: bullets rendered from ${r.bulletSource}`);
      continue;
    }
    failures += 1;
    console.log(`❌ ${r.slug}:`);
    for (const b of missing) {
      console.log(
        `      expected (${r.bulletSource}) bullet not rendered: "${b.slice(0, 120)}"`,
      );
    }
    for (const b of leaked) {
      console.log(
        `      unmatched <ul id=""> bullet unexpectedly rendered: "${b.slice(0, 120)}"`,
      );
    }
  }

  console.log(
    `\n${results.length - failures}/${results.length} entries verified against dist.`,
  );
  if (failures > 0) process.exit(1);
}

function printFirstDifference(cached: string, fresh: string): void {
  const a = cached.split("\n");
  const b = fresh.split("\n");
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    if (a[i] !== b[i]) {
      console.error(`   first differing line ${i + 1}:`);
      console.error(`   on disk: ${(a[i] ?? "<EOF>").slice(0, 200)}`);
      console.error(`   fresh:   ${(b[i] ?? "<EOF>").slice(0, 200)}`);
      return;
    }
  }
}

function main(): void {
  const args = process.argv.slice(2);
  const mode = args[0] ?? "verify";
  if (!["verify", "--write", "--verify-dist"].includes(mode)) {
    console.error(
      "Usage: pnpm exec tsx scripts/migrations/compare-blocks/audit.ts [--write | --verify-dist]",
    );
    process.exit(1);
  }

  const entries = readCompareEntries();

  // The conversion blanked the bodies this script measures, so from that point
  // on it can only report zeros. AUDIT.md is the pre-conversion record and is
  // meant to stay exactly as it was — say so rather than reporting it stale.
  if (entries.every((e) => e.body.trim().length === 0)) {
    console.log(
      "· The conversion has run: all 25 bodies are empty, so there is nothing left to measure.\n" +
        `  ${REPORT_PATH} is the pre-conversion record and should not be regenerated.\n` +
        "  Read it at the commit it names, or check out a commit before the conversion to re-derive it.",
    );
    return;
  }

  const results = entries.map(extractAndAudit);
  const sha = execSync("git rev-parse HEAD", {
    cwd: ROOT,
    encoding: "utf-8",
  }).trim();
  const report = generateReport(results, sha);

  if (mode === "--write") {
    fs.writeFileSync(REPORT_PATH, `${report}\n`, "utf-8");
    console.log(`✓ Wrote ${REPORT_PATH}`);
    return;
  }

  if (mode === "--verify-dist") {
    runVerifyDist(results);
    return;
  }

  // Verify mode. The pinned commit line is excluded from the staleness check:
  // a commit that changes nothing measured must not turn the gate red.
  if (!fs.existsSync(REPORT_PATH)) {
    console.error(`✗ Report not found at ${REPORT_PATH} — run --write first.`);
    process.exit(1);
  }
  const cached = fs
    .readFileSync(REPORT_PATH, "utf-8")
    .replace(SHA_LINE_RE, SHA_PLACEHOLDER)
    .trim();
  const fresh = report.replace(SHA_LINE_RE, SHA_PLACEHOLDER).trim();
  if (cached === fresh) {
    console.log("✓ Report is current");
    return;
  }
  console.error(
    "✗ Report is stale. Run: pnpm exec tsx scripts/migrations/compare-blocks/audit.ts --write",
  );
  printFirstDifference(cached, fresh);
  process.exit(1);
}

main();
