/**
 * Fix Webflow code blocks in MDX files.
 *
 * Converts Webflow-style embedded code blocks:
 *   <div data-rt-embed-type="true"><pre><code fs-codehighlight-element="code" class="language-python">
 *   ...code content...
 *   </code></pre></div>
 *
 * To standard markdown fenced code blocks:
 *   ```python
 *   ...code content...
 *   ```
 *
 * Also handles:
 * - HTML entities (&lt; &gt; &amp; &quot;) → literal characters
 * - Leading ‍ (zero-width joiner) characters from Webflow rich text
 * - Stripping empty id="" attributes from HTML elements
 * - Self-closing void HTML elements (<br> → <br />, <img ...> → <img ... />, etc.)
 * - Fixing non-standard HTML attributes for JSX compatibility
 *
 * Usage: pnpm exec tsx scripts/phase1/fix-code-blocks.ts [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");
const CONTENT_DIR = "src/content";

// Stats
let filesProcessed = 0;
let filesModified = 0;
let codeBlocksConverted = 0;

/**
 * Decode common HTML entities back to literal characters.
 * Safe to do inside fenced code blocks since markdown handles them literally.
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/**
 * Extract language from a class attribute like class="language-python".
 */
function extractLanguage(attrs: string): string {
  const match = attrs.match(/class="language-(\w+)"/);
  return match ? match[1] : "";
}

/**
 * Convert Webflow code blocks to fenced code blocks.
 *
 * Pattern variants we handle:
 * 1. <div data-rt-embed-type="true"><pre><code ...>CODE</code></pre></div>
 * 2. Multiline versions with newlines between tags
 * 3. Nested code blocks (rare but possible)
 */
function convertCodeBlocks(content: string): { content: string; count: number } {
  let count = 0;

  // Pattern: <div data-rt-embed-type="true"><pre><code [attrs]>CONTENT</code></pre></div>
  // This handles single-line and multi-line code blocks
  const pattern =
    /<div\s+data-rt-embed-type="true"\s*>\s*<pre>\s*<code(?:\s+[^>]*)?\s*(?:class="language-(\w+)")?[^>]*>\s*([\s\S]*?)\s*<\/code>\s*<\/pre>\s*<\/div>/g;

  const result = content.replace(pattern, (_match, langFromClass, codeContent) => {
    count++;

    // Try to get language from the captured class attribute or from the full match
    let lang = langFromClass || "";
    if (!lang) {
      // Try extracting from the full match
      const langMatch = _match.match(/class="language-(\w+)"/);
      lang = langMatch ? langMatch[1] : "";
    }

    // Decode HTML entities in the code content
    let code = decodeHtmlEntities(codeContent);

    // Remove leading/trailing blank lines
    code = code.replace(/^\n+/, "").replace(/\n+$/, "");

    // Replace tab characters with 4 spaces for consistency
    code = code.replace(/\t/g, "    ");

    return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
  });

  return { content: result, count };
}

/**
 * Escape stray `<` characters in prose text that aren't part of HTML/JSX tags.
 *
 * MDX treats ALL `<` as JSX tag openings. Prose text like `<3`, `<->`, `x < y`
 * will cause parse errors. We escape these to `&lt;` ONLY when they're not
 * part of legitimate HTML tags (like <div>, <a>, <img />, etc.)
 */
function escapeStrayAngleBrackets(content: string): string {
  const lines = content.split("\n");
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // Replace < that is NOT followed by:
    // - a valid tag name ([a-zA-Z] or / for closing tags or ! for comments)
    // - already escaped as &lt;
    // Pattern: < followed by something that can't start a tag name
    lines[i] = lines[i].replace(/<(?![a-zA-Z\/!])/g, "&lt;");
  }

  return lines.join("\n");
}

/**
 * HTML void elements that must be self-closing in JSX/MDX.
 * These cannot have children and must use <tag /> syntax.
 */
const VOID_ELEMENTS = [
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
];

/**
 * Self-close void HTML elements using a simple character-scanning approach.
 * Avoids catastrophic regex backtracking on long HTML lines.
 */
function selfCloseVoidElements(content: string, voidSet: Set<string>): string {
  const lines = content.split("\n");
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // Simple approach: find all < ... > in the line and check if the tag
    // is a void element that's not already self-closed
    let result = "";
    let pos = 0;
    while (pos < line.length) {
      const ltIdx = line.indexOf("<", pos);
      if (ltIdx === -1) {
        result += line.slice(pos);
        break;
      }
      result += line.slice(pos, ltIdx);

      const gtIdx = line.indexOf(">", ltIdx);
      if (gtIdx === -1) {
        result += line.slice(ltIdx);
        break;
      }

      const tagContent = line.slice(ltIdx + 1, gtIdx);
      // Extract tag name (first word after optional /)
      const tagNameMatch = tagContent.match(/^([a-zA-Z][a-zA-Z0-9]*)/);

      if (tagNameMatch && voidSet.has(tagNameMatch[1].toLowerCase())) {
        // Check if already self-closed
        if (tagContent.trimEnd().endsWith("/")) {
          result += line.slice(ltIdx, gtIdx + 1);
        } else {
          // Add self-closing slash
          result += `<${tagContent} />`;
        }
      } else {
        result += line.slice(ltIdx, gtIdx + 1);
      }
      pos = gtIdx + 1;
    }
    lines[i] = result;
  }

  return lines.join("\n");
}

/**
 * Clean up other Webflow-specific HTML artifacts that break MDX parsing.
 */
function cleanupWebflowArtifacts(content: string): string {
  // Remove zero-width joiner characters (‍ = \u200D) that Webflow adds
  // These appear as ‍ at the start of lines or inline
  content = content.replace(/\u200D/g, "");

  // Remove empty id="" attributes from HTML elements (very common in Webflow export)
  // e.g., <ul id=""> → <ul>
  content = content.replace(/\s+id=""/g, "");

  // Self-close void HTML elements for JSX compatibility
  // e.g., <br> → <br />, <img src="..." alt=""> → <img src="..." alt="" />
  // Self-close void HTML elements — use a simple string-based approach
  // to avoid catastrophic backtracking on long HTML lines.
  const voidSet = new Set(VOID_ELEMENTS.map(e => e.toLowerCase()));
  content = selfCloseVoidElements(content, voidSet);

  // Fix boolean HTML attributes that JSX requires a value for
  // e.g., allowfullscreen → allowFullScreen={true}
  // But only outside code blocks
  content = fixBooleanAttributes(content);

  // Fix frameborder="0" → frameBorder="0" (JSX camelCase)
  // And scrolling="no" → scrolling="no" (this one is fine as-is)
  content = content.replace(/\bframeborder=/gi, "frameBorder=");
  content = content.replace(/\ballowfullscreen="true"/gi, 'allowFullScreen={true}');
  content = content.replace(/\ballowfullscreen(?=[\s>\/])/gi, "allowFullScreen");

  // Strip inline <style> blocks — MDX can't handle CSS { } inside them.
  // We have global .prose CSS that covers these table styles.
  content = content.replace(/<style>[\s\S]*?<\/style>/g, "");

  // Clean up data-rt-embed-type wrapper divs.
  // These wrapped code blocks (already converted) and tables.
  // Remove the wrapper but keep the inner content.
  // Pattern: <div data-rt-embed-type="true"> ... </div>
  // We need to unwrap carefully — remove the opening/closing div tags.
  content = content.replace(/<div\s+data-rt-embed-type="true"\s*>/g, "");

  // Remove <div class="responsive-table" ...> and <div class="table_component"> wrappers
  content = content.replace(/<div\s+class="(?:responsive-table|table_component)"[^>]*>/g, "");

  // Clean up stray &nbsp; characters used for formatting in Webflow tables
  // Replace lines that are only &nbsp; with empty lines
  content = content.replace(/^[\s]*(?:&nbsp;\s*)+$/gm, "");

  // Remove &nbsp; at start of lines before block-level elements
  // MDX requires block elements like <table> to start at column 0 or be clearly block-level
  content = content.replace(/^[\s]*(?:&nbsp;\s*)+(<(?:table|div|figure|section|article|aside|header|footer|nav|main))/gm, "$1");

  // Remove orphaned closing </div> tags (leftover from wrapper removal)
  // Handle both single </div> and multiple </div></div> on one line
  content = content.replace(/^[\s]*(?:<\/div>[\s]*)+$/gm, "");

  // Ensure blank line before block-level HTML elements (MDX requirement)
  // MDX needs a blank line to transition from markdown to HTML block context
  const blockElements = ["table", "div", "figure", "section", "article", "details", "summary"];
  for (const el of blockElements) {
    // Pattern: a non-empty line followed immediately by <element...
    const re = new RegExp(`(\\S[^\\n]*\\n)(<${el}[\\s>])`, "g");
    content = content.replace(re, "$1\n$2");
  }

  // Remove empty wrapper divs (leftover after unwrapping)
  content = content.replace(/<div\s+data-rt-embed-type="true"\s*>\s*<\/div>/g, "");

  // Escape stray < in prose text (not inside code blocks or HTML tags)
  content = escapeStrayAngleBrackets(content);

  return content;
}

/**
 * Fix boolean HTML attributes for JSX compatibility.
 * In HTML, `allowfullscreen` is valid. In JSX, it must be `allowFullScreen` or `allowFullScreen={true}`.
 */
function fixBooleanAttributes(content: string): string {
  // Handle standalone boolean attributes (no ="...") by converting to JSX format
  // This is conservative — only fixes known attributes
  const boolAttrs: Record<string, string> = {
    "allowfullscreen": "allowFullScreen",
    "autoplay": "autoPlay",
    "autofocus": "autoFocus",
    "novalidate": "noValidate",
    "readonly": "readOnly",
  };

  for (const [html, jsx] of Object.entries(boolAttrs)) {
    // Match the attribute when it's standalone (not followed by =)
    // e.g., <iframe allowfullscreen> but NOT <iframe allowfullscreen="true">
    const pattern = new RegExp(`\\b${html}(?=\\s|>|\\/)(?!=)`, "gi");
    content = content.replace(pattern, jsx);
  }

  return content;
}

/**
 * Process a single MDX file.
 */
function processFile(filePath: string): boolean {
  const original = readFileSync(filePath, "utf-8");
  filesProcessed++;
  if (filesProcessed % 50 === 0) process.stderr.write(`  [${filesProcessed}]`);
  const startTime = Date.now();

  // Split frontmatter from content
  const fmMatch = original.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
  if (!fmMatch) return false;

  const [, frontmatter, body] = fmMatch;

  // Convert code blocks
  const { content: convertedBody, count } = convertCodeBlocks(body);

  // Clean up other artifacts
  const cleanedBody = cleanupWebflowArtifacts(convertedBody);

  const result = frontmatter + cleanedBody;

  const elapsed = Date.now() - startTime;
  if (elapsed > 2000) console.error(`  SLOW: ${filePath} took ${elapsed}ms`);
  if (result !== original) {
    codeBlocksConverted += count;
    filesModified++;

    if (!DRY_RUN) {
      writeFileSync(filePath, result);
    }

    if (count > 0) {
      console.log(`  ${DRY_RUN ? "[DRY RUN] " : ""}${filePath}: ${count} code block(s) converted`);
    } else {
      console.log(`  ${DRY_RUN ? "[DRY RUN] " : ""}${filePath}: cleaned up artifacts`);
    }
    return true;
  }

  return false;
}

/**
 * Walk directory recursively and process all .mdx files.
 */
function walkDir(dir: string): void {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (extname(entry) === ".mdx") {
      processFile(fullPath);
    }
  }
}

// Main
console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Fixing Webflow code blocks in ${CONTENT_DIR}...\n`);
walkDir(CONTENT_DIR);

console.log(`\nDone!`);
console.log(`  Files processed: ${filesProcessed}`);
console.log(`  Files modified: ${filesModified}`);
console.log(`  Code blocks converted: ${codeBlocksConverted}`);
if (DRY_RUN) {
  console.log("\n  (Dry run — no files were written. Remove --dry-run to apply.)");
}
