/**
 * convert.ts — PR3 comparison-consolidation conversion.
 *
 * Materialises, into each of the 25 `src/content/compare/*.md` entries'
 * frontmatter, the `blocks[]` array and `hero` object that reproduce EXACTLY
 * what `MlopsCompare.astro` renders today from the entry's flat fields and
 * body. This is additive only: the flat fields, the body, and `seo:` are left
 * untouched, so the existing template keeps rendering unchanged and the build
 * stays green at every commit. A later pass switches the render path and
 * removes the now-redundant flat fields; that is out of scope here.
 *
 * The two body-extraction regexes and the CTA-bullet regex pair below are
 * copied character-for-character from `MlopsCompare.astro` (same copy
 * `audit.ts` carries) — never re-implement them; if that file changes,
 * re-copy both places. `getCategoryDefaults` is imported from
 * `compareDefaults.ts`, not re-typed, so the copy can never drift.
 *
 * Render order materialised, per entry, into `blocks[]`:
 *   value, value, value, [quote], featureTable, codeComparison, strategyCta,
 *   showdown, blogRail, cta02
 * `quote` is omitted entirely when the entry has no `quote` frontmatter field
 * (MlopsCompare only renders VsTestimonial when `quoteEntry` exists). Every
 * other kind is unconditional: the template always renders
 * CompareStrategyCta and VsCta02, and `showdown`/`blogRail` carry only their
 * own chrome (eyebrow/headline) — the items inside those sections are
 * computed from the collection at render time, not stored here, so the
 * blocks are written regardless of whether the render-time item lists turn
 * out non-empty for a given entry.
 *
 * `imageSide` on the three value blocks is written as the RENDERED value —
 * index 0 "right", 1 "left", 2 "right" — never the value stored in
 * `compareDefaults.ts`'s `CompareValueSection.imageSide`. The template
 * overrides the stored value with `i % 2` at render time
 * (`imageSide={i % 2 === 0 ? "right" : "left"}`); the stored values happen to
 * agree with that alternation for all four category-default sets today,
 * which makes honouring the stored field byte-safe only by luck. Writing the
 * computed alternation instead removes that luck dependency.
 *
 * `blogRail.slugs` is never written, even though the schema allows it — the
 * rail renders the three most recently published posts dynamically, and
 * pinning today's three would freeze all 25 rails and let them rot silently.
 *
 * The `<ul id="">` quirk (dvc, kserve): the CTA-bullet regex demands a bare
 * `<ul>`, so those two entries' authored bullets never match and the
 * category-default bullets render instead. That is a latent bug in the
 * current template, not something this script fixes — the `cta02` block's
 * `bullets` field is materialised from whatever the regex actually produces,
 * preserving the bug byte-for-byte.
 *
 * Frontmatter is edited as TEXT (find the `seo:` line, splice new keys in
 * before it, or append at the end when there is none), not by re-serialising
 * with gray-matter/js-yaml's stringify — re-dumping would restyle every
 * quoted scalar across all 25 files and bury the real change in noise. This
 * mirrors `scripts/migrations/split-project-bodies.ts`.
 *
 * `tableHtml`, `zenmlCode` and `toolCode` are written as YAML literal block
 * scalars (`|`, chomping indicator chosen to match the string's exact
 * trailing-newline count — see `renderBlockScalar`) rather than double-quoted
 * one-liners, both for readability of a ~4KB table and because block code
 * must reproduce arbitrary internal blank lines and indentation exactly.
 * Every other string field uses a JSON-stringified (YAML double-quoted)
 * scalar, matching the convention `split-project-bodies.ts` already uses —
 * JSON's escaping is a valid subset of YAML double-quoted escaping for every
 * character these entries contain. Every written value is round-tripped
 * (re-parsed with gray-matter and deep-equal-checked against what this
 * script computed) before anything is written to disk; a mismatch on ANY
 * entry aborts the whole run with a non-zero exit and writes nothing for
 * that entry, so a quoting bug can never silently ship as wrong content.
 *
 * Idempotent: an entry that already has a top-level `blocks:` key is left
 * alone (reported as "already migrated") — running twice is a no-op.
 *
 * Modes:
 *   --dry-run (default)   Compute and round-trip-verify every entry; write
 *                          nothing. Reports what would change.
 *   --write                Same computation and verification, then writes
 *                          the 25 files whose entries were not already
 *                          migrated.
 *
 * This script is deliberately NOT added to `package.json`'s `lint` script or
 * `biome.json`'s `files.includes` allowlist — both enumerate scripts
 * individually, and `split-project-bodies.ts` follows the same convention.
 * That also means `pnpm exec biome check <this file>` is a silent no-op
 * (Biome only processes paths matched by `files.includes`): to actually
 * lint/format it, point `--config-path` at a config without that allowlist.
 * It was formatted that way when authored. Types are kept simple —
 * `tsconfig.check.json` excludes `scripts/`, so `astro check` never sees
 * this file.
 *
 * Usage:
 *   pnpm exec tsx scripts/migrations/compare-blocks/convert.ts
 *   pnpm exec tsx scripts/migrations/compare-blocks/convert.ts --dry-run
 *   pnpm exec tsx scripts/migrations/compare-blocks/convert.ts --write
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { getCategoryDefaults } from "../../../src/lib/compareDefaults.ts";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "../../..");
const CONTENT_DIR = path.join(ROOT, "src/content/compare");

// ---------------------------------------------------------------------------
// Types (kept simple — this file is outside astro check's scope)
// ---------------------------------------------------------------------------

interface Cta {
  label: string;
  href: string;
}

interface ImageRef {
  url: string;
  alt?: string;
}

type ValueBlock = {
  kind: "value";
  title: string;
  bullets: string[];
  image?: ImageRef;
  imageSide: "left" | "right";
};

type QuoteBlock = { kind: "quote"; quote: string };
type FeatureTableBlock = { kind: "featureTable"; tableHtml: string };
type CodeComparisonBlock = {
  kind: "codeComparison";
  zenmlCode: string;
  zenmlLanguage: string;
  toolCode: string;
  toolLanguage: string;
};
type StrategyCtaBlock = {
  kind: "strategyCta";
  headline: string;
  advantages: string[];
};
type ShowdownBlock = { kind: "showdown"; eyebrow: string; headline: string };
type BlogRailBlock = { kind: "blogRail"; eyebrow: string; headline: string };
type Cta02Block = {
  kind: "cta02";
  headline: string;
  bullets: string[];
  primaryCta: Cta;
  secondaryCta?: Cta;
  image?: ImageRef;
};

type Block =
  | ValueBlock
  | QuoteBlock
  | FeatureTableBlock
  | CodeComparisonBlock
  | StrategyCtaBlock
  | ShowdownBlock
  | BlogRailBlock
  | Cta02Block;

interface Hero {
  headline: string;
  deck?: string;
  primaryCta: Cta;
  secondaryCta: Cta;
}

interface Materialised {
  hero: Hero;
  blocks: Block[];
}

// ---------------------------------------------------------------------------
// Extraction — copied character-for-character from MlopsCompare.astro
// (see also audit.ts, which carries the same copy for its own purposes)
// ---------------------------------------------------------------------------

const TABLE_REGEX = /(?:<div[^>]*>\s*)?<table[\s\S]*?<\/table>\s*(?:<\/div>)?/i;
const CODE_FENCE_REGEX = /```(\w*)\n([\s\S]*?)```/g;
const TRAILING_UL_REGEX = /<ul>\s*(<li>[\s\S]*?)<\/ul>\s*$/;
const LI_REGEX = /<li>([\s\S]*?)<\/li>/g;

function extractTableHtml(body: string): string {
  const m = body.match(TABLE_REGEX);
  return m ? m[0] : "";
}

function extractCodePair(body: string): {
  zenmlCode: string;
  zenmlLanguage: string;
  toolCode: string;
  toolLanguage: string;
} | null {
  const matches = [...body.matchAll(CODE_FENCE_REGEX)];
  if (matches.length < 2) return null;
  return {
    zenmlLanguage: matches[0][1] || "python",
    zenmlCode: matches[0][2],
    toolLanguage: matches[1][1] || "python",
    toolCode: matches[1][2],
  };
}

/** Returns null when the trailing `<ul>…</ul>` regex doesn't match (the dvc/kserve `<ul id="">` quirk) — caller falls back to the category default, same as MlopsCompare. */
function extractCtaBullets(body: string): string[] | null {
  const ulMatch = body.match(TRAILING_UL_REGEX);
  if (!ulMatch) return null;
  const liMatches = [...ulMatch[1].matchAll(LI_REGEX)];
  return liMatches.map((m) => m[1].trim());
}

// ---------------------------------------------------------------------------
// Materialisation
// ---------------------------------------------------------------------------

/**
 * Frontmatter overrides MlopsCompare honours that this script does NOT
 * materialise. All four are unset on all 25 entries today, so the omission is
 * currently free — but the script is meant to be re-runnable, and silently
 * dropping one of these would produce blocks that render differently from the
 * entry they came from. Hard-fail instead.
 */
const UNHANDLED_OVERRIDES = [
  "finalCta",
  "heroPrimaryCta",
  "heroSecondaryCta",
  "relatedBlogSlugs",
] as const;

function assertNoUnhandledOverrides(slug: string, fm: Record<string, unknown>) {
  const present = UNHANDLED_OVERRIDES.filter((key) => fm[key] !== undefined);
  if (present.length > 0) {
    throw new Error(
      `${slug}: sets ${present.join(", ")}, which this script does not materialise. ` +
        "MlopsCompare honours these, so converting the entry as-is would change what it renders. " +
        "Extend materialise() to cover them before re-running.",
    );
  }
}

function materialise(fm: Record<string, unknown>, body: string): Materialised {
  const category = fm.category as string | undefined;
  const defaults = getCategoryDefaults(category);
  const title = fm.title as string;

  const hero: Hero = {
    headline: (fm.headline as string) || title,
    primaryCta: { label: "Book a demo", href: "/book-your-demo" },
    secondaryCta: { label: "Learn More", href: "#feature-comparison" },
  };
  if (fm.heroText) hero.deck = fm.heroText as string;

  const blocks: Block[] = [];

  const sourceValueSections =
    (fm.valueSections as typeof defaults.valueSections | undefined) ??
    defaults.valueSections;
  sourceValueSections.forEach((section, i) => {
    const block: ValueBlock = {
      kind: "value",
      title: section.title,
      bullets: section.bullets,
      imageSide: i % 2 === 0 ? "right" : "left",
    };
    if (section.image) block.image = section.image;
    blocks.push(block);
  });

  if (fm.quote) {
    blocks.push({ kind: "quote", quote: fm.quote as string });
  }

  const tableHtml = (fm.featureTableHtml as string) || extractTableHtml(body);
  if (tableHtml) {
    blocks.push({ kind: "featureTable", tableHtml });
  }

  const codePair =
    (fm.codeComparison as
      | {
          zenmlCode: string;
          zenmlLanguage?: string;
          toolCode: string;
          toolLanguage?: string;
        }
      | undefined) ?? extractCodePair(body);
  if (codePair?.zenmlCode && codePair.toolCode) {
    blocks.push({
      kind: "codeComparison",
      zenmlCode: codePair.zenmlCode,
      zenmlLanguage: codePair.zenmlLanguage || "python",
      toolCode: codePair.toolCode,
      toolLanguage: codePair.toolLanguage || "python",
    });
  }

  blocks.push({
    kind: "strategyCta",
    headline:
      (fm.strategyCtaHeadline as string) || defaults.strategyCtaHeadline,
    // `advantages` is a zod slugReferenceArray defaulting to [], so an entry
    // may legitimately omit the key — the raw frontmatter read yields undefined.
    advantages: (fm.advantages as string[] | undefined) ?? [],
  });

  blocks.push({
    kind: "showdown",
    eyebrow: defaults.showdownEyebrow,
    headline: defaults.showdownHeadline,
  });

  blocks.push({
    kind: "blogRail",
    eyebrow: "Expand Your Knowledge",
    headline: "Broaden Your MLOps Understanding with ZenML",
  });

  const bodyBullets = extractCtaBullets(body);
  const cta02: Cta02Block = {
    kind: "cta02",
    headline: (fm.ctaHeadline as string) || defaults.finalCta.headline,
    bullets:
      bodyBullets && bodyBullets.length > 0
        ? bodyBullets
        : defaults.finalCta.bullets,
    primaryCta: defaults.finalCta.primaryCta,
    secondaryCta: defaults.finalCta.secondaryCta,
    image: defaults.finalCta.image,
  };
  blocks.push(cta02);

  return { hero, blocks };
}

// ---------------------------------------------------------------------------
// YAML rendering
// ---------------------------------------------------------------------------

/** A YAML double-quoted scalar. JSON's escape rules are a subset of YAML's for these values (verified for quotes, backslashes, embedded newlines, tabs and non-ASCII during authoring). */
function yamlString(value: string): string {
  return JSON.stringify(value);
}

/**
 * A YAML literal block scalar that round-trips `value` EXACTLY, including
 * its trailing-newline count. The chomping indicator is chosen from that
 * count rather than always stripped/clipped, because `tableHtml` and the two
 * code fields must reproduce whatever the source regex actually captured:
 *   0 trailing "\n"  → strip ("-"): no indicator adds one back.
 *   1 trailing "\n"  → clip (no indicator): the normal case.
 *   2+ trailing "\n" → keep ("+"), with that many blank lines appended —
 *                      verified empirically against js-yaml (gray-matter's
 *                      engine): N trailing newlines needs N blank content
 *                      lines under "+", not N-1.
 * `indent` is the column of the key itself; content is indented `indent + 2`.
 */
function renderBlockScalar(key: string, value: string, indent: number): string {
  const pad = " ".repeat(indent);
  const contentPad = " ".repeat(indent + 2);
  const trailing = value.match(/\n*$/);
  const trailingCount = trailing ? trailing[0].length : 0;
  const core = value.slice(0, value.length - trailingCount);

  let indicator: string;
  let lines: string[];
  if (trailingCount === 0) {
    indicator = "-";
    lines = core.split("\n");
  } else if (trailingCount === 1) {
    indicator = "";
    lines = core.split("\n");
  } else {
    indicator = "+";
    lines = core.split("\n").concat(Array(trailingCount).fill(""));
  }

  // YAML needs an explicit indentation indicator when the first content line
  // is itself indented, or the parser cannot tell the block's indent from the
  // content's. The inputs here are arbitrary body-extracted HTML and code, so
  // do not assume they start flush left.
  const firstLine = lines.find((line) => line !== "");
  const needsIndicator = firstLine !== undefined && firstLine.startsWith(" ");
  const width = needsIndicator ? String(indent + 2) : "";

  const out = [`${pad}${key}: |${width}${indicator}`];
  for (const line of lines) {
    out.push(line === "" ? "" : `${contentPad}${line}`);
  }
  return out.join("\n");
}

function renderStringList(
  key: string,
  values: string[],
  indent: number,
): string {
  const pad = " ".repeat(indent);
  const itemPad = " ".repeat(indent + 2);
  if (values.length === 0) return `${pad}${key}: []`;
  const lines = [`${pad}${key}:`];
  for (const v of values) lines.push(`${itemPad}- ${yamlString(v)}`);
  return lines.join("\n");
}

function renderImage(key: string, image: ImageRef, indent: number): string {
  const pad = " ".repeat(indent);
  const fieldPad = " ".repeat(indent + 2);
  const lines = [`${pad}${key}:`, `${fieldPad}url: ${yamlString(image.url)}`];
  if (image.alt !== undefined)
    lines.push(`${fieldPad}alt: ${yamlString(image.alt)}`);
  return lines.join("\n");
}

function renderCta(key: string, cta: Cta, indent: number): string {
  const pad = " ".repeat(indent);
  const fieldPad = " ".repeat(indent + 2);
  return [
    `${pad}${key}:`,
    `${fieldPad}label: ${yamlString(cta.label)}`,
    `${fieldPad}href: ${yamlString(cta.href)}`,
  ].join("\n");
}

/** Renders one block's body (everything after `kind:`) at the block's own indent (the column `kind:` sits at). */
function renderBlockBody(block: Block, indent: number): string[] {
  const pad = " ".repeat(indent);
  const lines: string[] = [];
  switch (block.kind) {
    case "value":
      lines.push(`${pad}title: ${yamlString(block.title)}`);
      lines.push(renderStringList("bullets", block.bullets, indent));
      if (block.image) lines.push(renderImage("image", block.image, indent));
      lines.push(`${pad}imageSide: ${yamlString(block.imageSide)}`);
      break;
    case "quote":
      lines.push(`${pad}quote: ${yamlString(block.quote)}`);
      break;
    case "featureTable":
      lines.push(renderBlockScalar("tableHtml", block.tableHtml, indent));
      break;
    case "codeComparison":
      lines.push(renderBlockScalar("zenmlCode", block.zenmlCode, indent));
      lines.push(`${pad}zenmlLanguage: ${yamlString(block.zenmlLanguage)}`);
      lines.push(renderBlockScalar("toolCode", block.toolCode, indent));
      lines.push(`${pad}toolLanguage: ${yamlString(block.toolLanguage)}`);
      break;
    case "strategyCta":
      lines.push(`${pad}headline: ${yamlString(block.headline)}`);
      lines.push(renderStringList("advantages", block.advantages, indent));
      break;
    case "showdown":
      lines.push(`${pad}eyebrow: ${yamlString(block.eyebrow)}`);
      lines.push(`${pad}headline: ${yamlString(block.headline)}`);
      break;
    case "blogRail":
      lines.push(`${pad}eyebrow: ${yamlString(block.eyebrow)}`);
      lines.push(`${pad}headline: ${yamlString(block.headline)}`);
      break;
    case "cta02":
      lines.push(`${pad}headline: ${yamlString(block.headline)}`);
      lines.push(renderStringList("bullets", block.bullets, indent));
      lines.push(renderCta("primaryCta", block.primaryCta, indent));
      if (block.secondaryCta)
        lines.push(renderCta("secondaryCta", block.secondaryCta, indent));
      if (block.image) lines.push(renderImage("image", block.image, indent));
      break;
  }
  return lines;
}

function renderHero(hero: Hero): string {
  const lines = ["hero:", `  headline: ${yamlString(hero.headline)}`];
  if (hero.deck !== undefined) lines.push(`  deck: ${yamlString(hero.deck)}`);
  lines.push(renderCta("primaryCta", hero.primaryCta, 2));
  lines.push(renderCta("secondaryCta", hero.secondaryCta, 2));
  return `${lines.join("\n")}\n`;
}

function renderBlocks(blocks: Block[]): string {
  const lines = ["blocks:"];
  for (const block of blocks) {
    const [firstBodyLine, ...restBodyLines] = renderBlockBody(block, 4);
    // The list-item marker and `kind:` share the first content line; the rest
    // of that block's body lines are already indented to column 4.
    const kindLine = `  - kind: ${yamlString(block.kind)}`;
    lines.push(kindLine);
    if (firstBodyLine !== undefined)
      lines.push(firstBodyLine, ...restBodyLines);
  }
  return `${lines.join("\n")}\n`;
}

// ---------------------------------------------------------------------------
// Frontmatter text splicing (mirrors split-project-bodies.ts)
// ---------------------------------------------------------------------------

function splitFile(raw: string): { frontmatter: string; body: string } {
  if (!raw.startsWith("---\n")) {
    throw new Error("file does not open with a frontmatter delimiter");
  }
  const end = raw.indexOf("\n---\n", 3);
  if (end === -1) {
    throw new Error("file has no closing frontmatter delimiter");
  }
  return {
    frontmatter: raw.slice(4, end + 1),
    body: raw.slice(end + 5),
  };
}

/** Inserts the new keys before the top-level `seo:` block, or at the end when there is none. */
function insertKeys(frontmatter: string, added: string): string {
  if (!added) return frontmatter;
  const seoIdx = frontmatter.search(/^seo:$/m);
  if (seoIdx === -1) return frontmatter + added;
  return frontmatter.slice(0, seoIdx) + added + frontmatter.slice(seoIdx);
}

// ---------------------------------------------------------------------------
// Round-trip verification
// ---------------------------------------------------------------------------

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a as Record<string, unknown>);
    const bKeys = Object.keys(b as Record<string, unknown>);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((k) =>
      deepEqual(
        (a as Record<string, unknown>)[k],
        (b as Record<string, unknown>)[k],
      ),
    );
  }
  return false;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const write = args.includes("--write");
if (!write && !args.includes("--dry-run") && args.length > 0) {
  console.error(
    "Usage: pnpm exec tsx scripts/migrations/compare-blocks/convert.ts [--dry-run | --write]",
  );
  process.exit(1);
}

const files = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".md"))
  .sort();

let migrated = 0;
let alreadyDone = 0;
let failures = 0;

for (const filename of files) {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const slug = (parsed.data.slug as string) || filename.replace(/\.md$/, "");

  if (parsed.data.draft) {
    console.log(`↷ ${slug}: draft, skipped`);
    continue;
  }

  if (parsed.data.blocks !== undefined || parsed.data.hero !== undefined) {
    console.log(`↷ ${slug}: already migrated`);
    alreadyDone += 1;
    continue;
  }

  let frontmatter: string;
  let bodyText: string;
  try {
    ({ frontmatter, body: bodyText } = splitFile(raw));
  } catch (error) {
    console.error(`✗ ${slug}: ${(error as Error).message}`);
    failures += 1;
    continue;
  }

  if (bodyText.trim() !== parsed.content.trim()) {
    console.error(`✗ ${slug}: body extraction disagrees with gray-matter`);
    failures += 1;
    continue;
  }

  assertNoUnhandledOverrides(slug, parsed.data);
  const { hero, blocks } = materialise(parsed.data, parsed.content);

  const added = `${renderBlocks(blocks)}${renderHero(hero)}`;
  const nextFrontmatter = insertKeys(frontmatter, added);
  const next = `---\n${nextFrontmatter}---\n${bodyText}`;

  // Round-trip: re-parse the exact bytes about to be written and assert the
  // parsed-back blocks/hero equal what this script computed.
  const roundtrip = matter(next);
  const blocksOk = deepEqual(roundtrip.data.blocks, blocks);
  const heroOk = deepEqual(roundtrip.data.hero, hero);
  // The body is untouched — `next`'s body region is `bodyText` verbatim — so
  // this only guards against the frontmatter splice accidentally bleeding
  // into the body (e.g. a miscounted delimiter).
  const bodyOk = roundtrip.content === parsed.content;

  if (!blocksOk || !heroOk || !bodyOk) {
    console.error(
      `✗ ${slug}: round-trip mismatch (blocks=${blocksOk} hero=${heroOk} body=${bodyOk})`,
    );
    if (!blocksOk) {
      console.error(`   expected: ${JSON.stringify(blocks).slice(0, 300)}`);
      console.error(
        `   got:      ${JSON.stringify(roundtrip.data.blocks).slice(0, 300)}`,
      );
    }
    if (!heroOk) {
      console.error(`   expected: ${JSON.stringify(hero)}`);
      console.error(`   got:      ${JSON.stringify(roundtrip.data.hero)}`);
    }
    failures += 1;
    continue;
  }

  console.log(
    `✓ ${slug}: ${blocks.length} block(s) (${blocks.map((b) => b.kind).join(", ")}), hero materialised`,
  );
  migrated += 1;
  if (write) fs.writeFileSync(filePath, next, "utf-8");
}

console.log("");
if (failures > 0) {
  console.error(
    `${failures} entr${failures === 1 ? "y" : "ies"} failed round-trip verification — nothing was written for them.`,
  );
  process.exit(1);
}
console.log(
  `${migrated} entr${migrated === 1 ? "y" : "ies"} ${write ? "migrated" : "verified (dry run — nothing written)"}, ${alreadyDone} already migrated, ${files.length} file(s) total.`,
);
