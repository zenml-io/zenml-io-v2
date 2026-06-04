/**
 * check-alt-coverage.ts
 *
 * Enforces that every rendered <img> with a real `src` has non-empty alt text,
 * unless it is explicitly marked decorative (aria-hidden="true" or
 * role="presentation").
 *
 * Run via: pnpm check:alt
 * Exits with code 1 (failing CI) if any violations are found.
 *
 * Why this exists: missing alt text is an SEO and accessibility regression, and
 * it silently slips in two ways — Webflow-exported markdown bodies that carry
 * raw <img alt="">, and new .astro components written without an alt. Neither
 * is caught by `astro check`. This script closes that gap by statically scanning
 * source the same way `check:surface` does for layout props.
 *
 * What counts as OK:
 *   - alt="text" / alt='text' / alt={expr} with a non-empty value, OR
 *   - the image is explicitly decorative (aria-hidden="true" / role="presentation").
 *
 * What is intentionally NOT flagged:
 *   - <img> with no src (or empty src) — a srcless placeholder is dead markup,
 *     not an image to describe (Webflow export left many of these in tables).
 *   - <img> inside fenced code blocks (```...```) — those are code examples.
 *   - content marked `draft: true`, and the `old-projects/` collection, which
 *     has no public route — neither ships to a crawlable page.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(process.cwd());

/** Recursively collect files with any of the given extensions under a dir. */
function collectFiles(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full, exts));
    } else if (entry.isFile() && exts.some((e) => entry.name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

/** Line numbers (1-based) that sit inside a ```fenced code block```. */
function codeFenceLines(lines: string[]): Set<number> {
  const inFence = new Set<number>();
  let open = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith("```")) {
      open = !open;
      inFence.add(i + 1); // the fence marker line itself is "code"
      continue;
    }
    if (open) inFence.add(i + 1);
  }
  return inFence;
}

/** Does the tag have a real (non-empty) src? Accepts src="..." and src={...}. */
function hasRealSrc(tag: string): boolean {
  const q = /\bsrc=(["'])(.*?)\1/is.exec(tag);
  if (q) return q[2].trim() !== "";
  const expr = /\bsrc=\{([\s\S]*?)\}/i.exec(tag);
  if (expr) return expr[1].trim().replace(/[`"' ]/g, "") !== "";
  return false;
}

/** Does the tag have a non-empty alt? Accepts alt="...", alt='...', alt={expr}. */
function hasGoodAlt(tag: string): boolean {
  const q = /\balt=(["'])(.*?)\1/is.exec(tag);
  if (q) return q[2].trim() !== "";
  const expr = /\balt=\{([\s\S]*?)\}/i.exec(tag);
  if (expr) return expr[1].trim().replace(/[`"' ]/g, "") !== "";
  return false;
}

/** Explicitly marked decorative → empty/absent alt is acceptable. */
function isDecorative(tag: string): boolean {
  const t = tag.replace(/'/g, '"');
  return /aria-hidden="true"/i.test(t) || /role="presentation"/i.test(t);
}

const IMG_TAG_RE = /<img\b[\s\S]*?>/gi;

function check(): void {
  const files = [
    ...collectFiles(join(ROOT, "src", "content"), [".md", ".mdx"]),
    ...collectFiles(join(ROOT, "src", "components"), [".astro"]),
    ...collectFiles(join(ROOT, "src", "pages"), [".astro"]),
  ];

  const violations: string[] = [];

  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const isContent = file.includes(`${join("src", "content")}`);

    if (isContent) {
      // Skip drafts and the route-less old-projects collection — they never
      // render to a public, crawlable page.
      if (/^draft:\s*true\b/m.test(src)) continue;
      if (file.includes(`${join("content", "old-projects")}`)) continue;
    }

    const lines = src.split("\n");
    const fenceLines = isContent ? codeFenceLines(lines) : new Set<number>();

    IMG_TAG_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = IMG_TAG_RE.exec(src)) !== null) {
      const tag = match[0];
      const line = src.slice(0, match.index).split("\n").length;
      if (fenceLines.has(line)) continue; // code example, not a real image
      if (!hasRealSrc(tag)) continue; // srcless placeholder, nothing to describe
      if (isDecorative(tag)) continue;
      if (hasGoodAlt(tag)) continue;
      violations.push(`  ${relative(ROOT, file)}:${line} — <img> missing alt text`);
    }
  }

  if (violations.length === 0) {
    console.log(
      "✓ alt coverage check passed — every rendered <img> with a src has alt text or is marked decorative",
    );
    process.exit(0);
  }

  console.error("\n✗ alt coverage violations found:\n");
  for (const v of violations) console.error(v);
  console.error(
    '\nFix: add descriptive alt="..." to each image, or mark it decorative with' +
      ' aria-hidden="true" if it conveys no information (e.g. a background tile or' +
      " an icon already labelled by adjacent text).\n",
  );
  process.exit(1);
}

check();
