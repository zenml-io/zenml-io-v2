/**
 * blog-covers-16x9.ts — point every blog post at its 16:9 cover.
 *
 * One-off migration for the blog cutover: the blog cards and the post hero
 * moved from 3:2 to 16:9, and every post got a new cover rendered at that
 * ratio and uploaded to R2 (AVIF for the page, JPEG for the Open Graph card,
 * because social platforms do not render AVIF previews).
 *
 * Input: a JSON-lines file, one object per post —
 *   { "slug": "<post slug>", "ok": true, "urls": { "avif": "https://…avif", "jpg": "https://…jpg" } }
 * Lines with ok:false are skipped and listed. The file is produced by the
 * cover pipeline and is not committed.
 *
 * For each ok line the script rewrites the post's frontmatter in place:
 *   - mainImage.url → the AVIF (alt text is kept; a post without mainImage
 *     gets a block with a descriptive alt built from its title)
 *   - seo.ogImage → the JPEG (a post without a seo block gets one)
 * Nothing else in the file is touched; the body is byte-identical.
 *
 * Usage:
 *   pnpm exec tsx scripts/migrations/blog-covers-16x9.ts --results <path> [--dry-run]
 *   pnpm exec tsx scripts/migrations/blog-covers-16x9.ts --check
 *     --check reports posts whose mainImage.url or seo.ogImage is not a
 *     content/blog/<slug>/ cover key (i.e. still on an old image).
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const BLOG_DIR = join(ROOT, "src/content/blog");

interface ResultLine {
  slug: string;
  ok: boolean;
  urls?: { avif: string; jpg: string };
  error?: string;
}

function parseArgs(argv: string[]) {
  const flags = new Set(argv.filter((a) => a.startsWith("--") && !a.includes("=")));
  const idx = argv.indexOf("--results");
  const results = idx >= 0 ? argv[idx + 1] : undefined;
  return { results, dryRun: flags.has("--dry-run"), check: flags.has("--check") };
}

function splitFrontmatter(src: string): { fm: string[]; body: string } | null {
  if (!src.startsWith("---\n")) return null;
  const end = src.indexOf("\n---", 4);
  if (end < 0) return null;
  const fm = src.slice(4, end).split("\n");
  const body = src.slice(end); // keeps the closing "---" and everything after
  return { fm, body };
}

function yamlString(s: string): string {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function readTitle(fm: string[]): string {
  const line = fm.find((l) => l.startsWith("title:"));
  if (!line) return "";
  const raw = line.slice("title:".length).trim();
  return raw.replace(/^"(.*)"$/s, "$1").replace(/\\"/g, '"');
}

function isKitaru(fm: string[]): boolean {
  const cat = fm.find((l) => l.startsWith("category:"));
  if (cat && /kitaru/i.test(cat)) return true;
  const tagStart = fm.findIndex((l) => l.startsWith("tags:"));
  if (tagStart < 0) return false;
  for (let i = tagStart + 1; i < fm.length && fm[i].startsWith("  - "); i++) {
    if (/"kitaru"/.test(fm[i])) return true;
  }
  return false;
}

/** Index of the first line after a top-level block that starts at `start`. */
function blockEnd(fm: string[], start: number): number {
  let i = start + 1;
  while (i < fm.length && (fm[i].startsWith("  ") || fm[i].trim() === "")) i++;
  return i;
}

function rewrite(fm: string[], urls: { avif: string; jpg: string }): string[] {
  const out = [...fm];

  // mainImage.url
  const mi = out.findIndex((l) => l.startsWith("mainImage:"));
  if (mi >= 0) {
    const end = blockEnd(out, mi);
    const urlIdx = out.findIndex((l, i) => i > mi && i < end && l.startsWith("  url:"));
    if (urlIdx >= 0) out[urlIdx] = `  url: ${yamlString(urls.avif)}`;
    else out.splice(mi + 1, 0, `  url: ${yamlString(urls.avif)}`);
  } else {
    const brand = isKitaru(out) ? "Kitaru" : "ZenML";
    const alt = `${brand} blog cover for ${readTitle(out)}`;
    const block = ["mainImage:", `  url: ${yamlString(urls.avif)}`, `  alt: ${yamlString(alt)}`];
    const seo = out.findIndex((l) => l.startsWith("seo:"));
    if (seo >= 0) out.splice(seo, 0, ...block);
    else out.push(...block);
  }

  // seo.ogImage
  const seo = out.findIndex((l) => l.startsWith("seo:"));
  if (seo >= 0) {
    const end = blockEnd(out, seo);
    const ogIdx = out.findIndex((l, i) => i > seo && i < end && l.startsWith("  ogImage:"));
    if (ogIdx >= 0) out[ogIdx] = `  ogImage: ${yamlString(urls.jpg)}`;
    else out.splice(end, 0, `  ogImage: ${yamlString(urls.jpg)}`);
  } else {
    out.push("seo:", `  ogImage: ${yamlString(urls.jpg)}`);
  }
  return out;
}

function check(): number {
  let bad = 0;
  for (const file of readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"))) {
    const src = readFileSync(join(BLOG_DIR, file), "utf8");
    const parts = splitFrontmatter(src);
    if (!parts) continue;
    const slug = file.replace(/\.md$/, "");
    const expect = `/content/blog/${slug}/`;
    const mi = parts.fm.findIndex((l) => l.startsWith("mainImage:"));
    const url = mi >= 0 ? parts.fm.slice(mi + 1, blockEnd(parts.fm, mi)).find((l) => l.startsWith("  url:")) : undefined;
    const seo = parts.fm.findIndex((l) => l.startsWith("seo:"));
    const og = seo >= 0 ? parts.fm.slice(seo + 1, blockEnd(parts.fm, seo)).find((l) => l.startsWith("  ogImage:")) : undefined;
    const problems: string[] = [];
    if (!url || !url.includes(expect) || !url.includes(".avif")) problems.push("mainImage.url");
    if (!og || !og.includes(expect) || !og.includes(".jpg")) problems.push("seo.ogImage");
    if (problems.length) {
      bad++;
      console.log(`${slug}: ${problems.join(", ")}`);
    }
  }
  console.log(bad === 0 ? "check: every post points at its 16:9 cover" : `check: ${bad} post(s) still on an old image`);
  return bad === 0 ? 0 : 1;
}

function main(): number {
  const { results, dryRun, check: doCheck } = parseArgs(process.argv.slice(2));
  if (doCheck) return check();
  if (!results) {
    console.error("usage: blog-covers-16x9.ts --results <results.jsonl> [--dry-run] | --check");
    return 2;
  }
  const lines = readFileSync(resolve(results), "utf8")
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l) as ResultLine);

  // Last line per slug wins (re-runs append).
  const bySlug = new Map<string, ResultLine>();
  for (const line of lines) bySlug.set(line.slug, line);

  let changed = 0;
  let unchanged = 0;
  const skipped: string[] = [];
  const missing: string[] = [];
  for (const [slug, line] of bySlug) {
    if (!line.ok || !line.urls) {
      skipped.push(`${slug}: ${line.error ?? "not ok"}`);
      continue;
    }
    if (!line.urls.avif.endsWith(".avif") || !line.urls.jpg.endsWith(".jpg")) {
      skipped.push(`${slug}: unexpected url extensions`);
      continue;
    }
    const path = join(BLOG_DIR, `${slug}.md`);
    let src: string;
    try {
      src = readFileSync(path, "utf8");
    } catch {
      missing.push(slug);
      continue;
    }
    const parts = splitFrontmatter(src);
    if (!parts) {
      skipped.push(`${slug}: no frontmatter`);
      continue;
    }
    const next = `---\n${rewrite(parts.fm, line.urls).join("\n")}${parts.body}`;
    if (next === src) {
      unchanged++;
      continue;
    }
    changed++;
    if (!dryRun) writeFileSync(path, next);
  }

  console.log(`${dryRun ? "[dry-run] " : ""}changed ${changed}, unchanged ${unchanged}, skipped ${skipped.length}, missing post ${missing.length}`);
  for (const s of skipped) console.log(`  skipped ${s}`);
  for (const m of missing) console.log(`  no post file for ${m}`);
  return 0;
}

process.exit(main());
