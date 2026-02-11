/**
 * Fix MDX compatibility issues in content files.
 *
 * Handles all remaining HTML→JSX issues that prevent MDX parsing:
 * 1. Strip inline <style> blocks (CSS { } breaks MDX)
 * 2. Remove data-rt-embed-type wrapper divs
 * 3. Self-close void HTML elements (<br> → <br />)
 * 4. Remove orphaned </div> tags
 * 5. Remove zero-width joiners and empty id="" attrs
 * 6. Escape stray < in prose text (<3, <->, etc.)
 * 7. Ensure blank line before block-level HTML
 * 8. Fix JSX-incompatible HTML attributes
 *
 * Usage: pnpm exec tsx scripts/phase1/fix-mdx-compat.ts [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");
const CONTENT_DIR = "src/content";
let filesProcessed = 0;
let filesModified = 0;

const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

/** Known safe HTML/JSX elements that should NOT be escaped in MDX content. */
const KNOWN_HTML_ELEMENTS = new Set([
  // Void elements
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
  // Block elements
  "div", "p", "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "dl", "dt", "dd",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup",
  "form", "fieldset", "legend", "select", "option", "optgroup", "textarea",
  "article", "aside", "details", "summary", "figure", "figcaption",
  "header", "footer", "main", "nav", "section",
  "blockquote", "pre", "code", "address",
  // Inline elements
  "a", "abbr", "b", "bdi", "bdo", "cite", "data", "dfn",
  "em", "i", "kbd", "mark", "q", "rp", "rt", "ruby",
  "s", "samp", "small", "span", "strong", "sub", "sup",
  "time", "u", "var",
  // Media
  "audio", "video", "picture", "canvas", "svg", "path", "circle", "rect",
  "line", "polyline", "polygon", "g", "defs", "use", "symbol", "text",
  "iframe", "object",
  // Other
  "button", "label", "output", "progress", "meter",
  "script", "noscript", "template", "slot",
  // JSX/Astro components (capitalized) — handled by keeping uppercase starts
]);

function processBody(body: string): string {
  // 0. Ensure blank line at start of body (MDX needs this after frontmatter)
  if (body.length > 0 && body[0] !== "\n") {
    body = "\n" + body;
  }

  // 1. Strip <style>...</style> blocks
  body = body.replace(/<style>[^]*?<\/style>/g, "");

  // 2. Remove ALL <div ...> opening tags and </div> closing tags (outside code blocks).
  // Webflow exports use many div wrappers (data-rt-embed-type, table-container,
  // responsive-table, table_component, zenml-code-block, etc.) that serve no purpose
  // in MDX and cause orphan tag errors. We strip all divs and preserve inner content.
  body = stripDivTags(body);

  // 3. Remove stray <meta> and <title> tags from embedded HTML
  body = body.replace(/<meta\s[^>]*\/?>/g, "");
  body = body.replace(/<title>[^]*?<\/title>/g, "");

  // 4c. Convert remaining <pre>/<code> blocks with zenml-code-* spans to fenced code blocks
  body = convertPreCodeBlocks(body);

  // 4d. Restructure <aside>...</aside> blocks for MDX compatibility.
  // MDX v2 requires blank lines between JSX tags and markdown content.
  body = restructureAsides(body);

  // 4d. Collapse multi-line <table>...</table> onto single lines.
  // MDX v2 treats HTML as JSX and requires block elements to be self-contained.
  // Multi-line tables confuse the parser's paragraph boundary detection.
  body = collapseMultiLineTables(body);

  // 5. Remove zero-width joiners
  body = body.replace(/\u200D/g, "");

  // 6. Remove empty id=""
  body = body.replace(/\s+id=""/g, "");

  // 7. Clean &nbsp;-only lines and &nbsp; before block elements
  body = body.replace(/^[\s]*(?:&nbsp;[\s]*)+$/gm, "");
  body = body.replace(/^(?:&nbsp;[\s]*)+(?=<(?:table|div|figure))/gm, "");

  // 8. Fix HTML attributes for JSX
  body = body.replace(/\bframeborder=/gi, "frameBorder=");
  body = body.replace(/\ballowfullscreen="true"/gi, "allowFullScreen={true}");
  // standalone allowfullscreen (no =)
  body = body.replace(/\ballowfullscreen(?=[\s>])/gi, "allowFullScreen");

  // 9. Self-close void elements (line by line, skip code blocks)
  const lines = body.split("\n");
  let inCode = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("```")) { inCode = !inCode; continue; }
    if (inCode) continue;

    // Simple scan for unclosed void elements
    lines[i] = fixVoidElements(lines[i]);

    // Escape < that aren't known HTML/JSX elements or closing tags.
    // MDX treats ALL < as JSX — unknown elements like <dataset_name> cause errors.
    lines[i] = escapeUnknownTags(lines[i]);

    // Escape { and } in prose text (MDX treats them as JSX expressions).
    // Keep {true} and {false} which are intentional JSX boolean attribute values.
    lines[i] = lines[i].replace(/\{(?!true\}|false\})/g, "&#123;");
    lines[i] = lines[i].replace(/\}(?<!\{true\}|\{false\})/g, "&#125;");
  }
  body = lines.join("\n");

  // 10. Ensure blank line before block-level HTML
  // Pattern: non-blank line immediately followed by <table or <div
  body = body.replace(/([^\n])\n(<(?:table|figure|details)[\s>])/g, "$1\n\n$2");

  return body;
}

/**
 * Escape `<` characters that start unknown (non-HTML) tag names.
 * Keeps known HTML elements, closing tags (/), comments (!), and entities (&).
 * Also keeps uppercase-starting names (could be JSX components like <Component>).
 */
function escapeUnknownTags(line: string): string {
  return line.replace(/<([a-zA-Z\/!&])/g, (match, firstChar, offset) => {
    // Keep /, !, & (closing tags, comments, entities)
    if (firstChar === "/" || firstChar === "!" || firstChar === "&") return match;

    // Keep uppercase starts (could be JSX components)
    if (firstChar >= "A" && firstChar <= "Z") return match;

    // Extract the full tag name
    const rest = line.slice(offset + 1);
    const nameMatch = rest.match(/^([a-zA-Z][a-zA-Z0-9]*)/);
    if (!nameMatch) return "&lt;" + firstChar;

    const tagName = nameMatch[1].toLowerCase();
    if (KNOWN_HTML_ELEMENTS.has(tagName)) return match;

    // Unknown tag — escape the <
    return "&lt;" + firstChar;
  });
}

/**
 * Convert <pre> blocks (with optional zenml-code-* <span> highlighting) to fenced code blocks.
 * Pattern: optional "    Language" label line, then <pre>...spans...</pre>
 * Strips all <span> tags, decodes HTML entities, wraps in ```lang\n...\n```
 */
function convertPreCodeBlocks(body: string): string {
  const lines = body.split("\n");
  const result: string[] = [];
  let inFencedCode = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith("```")) { inFencedCode = !inFencedCode; result.push(lines[i]); continue; }
    if (inFencedCode) { result.push(lines[i]); continue; }

    // Check for language label + <pre> pattern or standalone <pre>
    const trimmed = lines[i].trim();
    let lang = "";
    let preLineIdx = i;

    // Check if this is a language label line (indented text, next line has <pre>)
    if (/^\s{2,}\w+$/.test(lines[i]) && i + 1 < lines.length && lines[i + 1].trim().startsWith("<pre")) {
      lang = trimmed.toLowerCase();
      preLineIdx = i + 1;
    } else if (trimmed.startsWith("<pre")) {
      preLineIdx = i;
    } else {
      result.push(lines[i]);
      continue;
    }

    // Collect until </pre>
    let preContent = lines[preLineIdx];
    let j = preLineIdx;
    while (j < lines.length && !preContent.includes("</pre>")) {
      j++;
      if (j < lines.length) preContent += "\n" + lines[j];
    }

    // Strip <pre> and </pre> tags
    preContent = preContent.replace(/^\s*<pre[^>]*>\s*/, "").replace(/\s*<\/pre>\s*$/, "");
    // Strip <code> and </code> tags
    preContent = preContent.replace(/<\/?code[^>]*>/g, "");
    // Strip all <span> and </span> tags
    preContent = preContent.replace(/<\/?span[^>]*>/g, "");
    // Decode HTML entities
    preContent = preContent
      .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&").replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
    // Clean up leading/trailing blank lines
    preContent = preContent.replace(/^\n+/, "").replace(/\n+$/, "");

    result.push(`\`\`\`${lang}`);
    result.push(preContent);
    result.push("```");
    i = j;
  }

  return result.join("\n");
}

/**
 * Restructure <aside>...</aside> blocks so MDX can parse markdown inside.
 * MDX v2 requires blank lines between JSX opening/closing tags and content
 * for markdown to be parsed within JSX elements.
 * Converts: <aside>content with [links](url).</aside>
 * To:       <aside>\n\ncontent with [links](url).\n\n</aside>
 */
function restructureAsides(body: string): string {
  const lines = body.split("\n");
  const result: string[] = [];
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith("```")) { inCode = !inCode; result.push(lines[i]); continue; }
    if (inCode) { result.push(lines[i]); continue; }

    const trimmed = lines[i].trimStart();
    if (trimmed.startsWith("<aside")) {
      // Collect the full aside block
      let asideContent = lines[i];
      let j = i;

      // Find the closing </aside>
      while (j < lines.length && !asideContent.includes("</aside>")) {
        j++;
        if (j < lines.length) asideContent += "\n" + lines[j];
      }

      // Extract the inner content
      const openMatch = asideContent.match(/^(<aside[^>]*>)\s*/);
      const openTag = openMatch ? openMatch[1] : "<aside>";
      const afterOpen = asideContent.slice(asideContent.indexOf(">") + 1);
      const closeIdx = afterOpen.lastIndexOf("</aside>");
      if (closeIdx === -1) {
        // No closing tag found, push as-is
        result.push(lines[i]);
        continue;
      }
      const inner = afterOpen.slice(0, closeIdx).trim();

      // Restructure with blank lines for MDX markdown parsing
      result.push(openTag);
      result.push("");
      result.push(inner);
      result.push("");
      result.push("</aside>");
      i = j;
    } else {
      result.push(lines[i]);
    }
  }

  return result.join("\n");
}

/**
 * Strip all <div ...> opening tags and </div> closing tags from body,
 * respecting code blocks. Leaves inner content intact.
 */
function stripDivTags(body: string): string {
  const lines = body.split("\n");
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith("```")) { inCode = !inCode; continue; }
    if (inCode) continue;

    // Remove <div ...> opening tags (with any attributes)
    lines[i] = lines[i].replace(/<div\b[^>]*>/g, "");
    // Remove </div> closing tags
    lines[i] = lines[i].replace(/<\/div>/g, "");
  }

  // Remove now-empty lines left behind by div stripping
  return lines.join("\n").replace(/\n{3,}/g, "\n\n");
}

/**
 * Collapse multi-line <table>...</table> blocks into single lines.
 * MDX v2's JSX parser can't handle tables that span multiple lines because
 * it interprets line breaks as paragraph boundaries.
 * We scan for <table> (outside code blocks), find the matching </table>,
 * and join everything onto one line with whitespace normalized.
 */
function collapseMultiLineTables(body: string): string {
  const lines = body.split("\n");
  const result: string[] = [];
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith("```")) { inCode = !inCode; result.push(lines[i]); continue; }
    if (inCode) { result.push(lines[i]); continue; }

    // Check if this line starts a table (possibly with leading whitespace)
    const trimmed = lines[i].trimStart();
    if (trimmed.startsWith("<table")) {
      // Collect lines until we find </table>
      let tableContent = lines[i];
      let depth = 0;
      let j = i;

      // Simple scan: find the line containing the matching </table>
      while (j < lines.length) {
        const line = lines[j];
        // Count <table opens (not self-closing)
        const opens = (line.match(/<table[\s>]/g) || []).length;
        const closes = (line.match(/<\/table>/g) || []).length;
        depth += opens - closes;

        if (j > i) tableContent += " " + line;
        if (depth <= 0) break;
        j++;
      }

      // Normalize whitespace: collapse runs of whitespace, remove &nbsp; used as formatting
      tableContent = tableContent
        .replace(/&nbsp;/g, " ")  // &nbsp; → space
        .replace(/\s+/g, " ")     // collapse whitespace runs
        .trim();

      result.push(tableContent);
      i = j; // skip to after the table
    } else {
      result.push(lines[i]);
    }
  }

  return result.join("\n");
}

function fixVoidElements(line: string): string {
  let result = "";
  let pos = 0;
  while (pos < line.length) {
    const lt = line.indexOf("<", pos);
    if (lt === -1) { result += line.slice(pos); break; }
    result += line.slice(pos, lt);

    const gt = line.indexOf(">", lt);
    if (gt === -1) { result += line.slice(lt); break; }

    const inner = line.slice(lt + 1, gt);
    const nameMatch = inner.match(/^([a-zA-Z][a-zA-Z0-9]*)/);

    if (nameMatch && VOID_ELEMENTS.has(nameMatch[1].toLowerCase()) && !inner.trimEnd().endsWith("/")) {
      result += `<${inner} />`;
    } else {
      result += line.slice(lt, gt + 1);
    }
    pos = gt + 1;
  }
  return result;
}

function processFile(filePath: string): void {
  filesProcessed++;
  const content = readFileSync(filePath, "utf-8");

  const fmEnd = content.indexOf("\n---\n", 4);
  if (fmEnd === -1) return;

  const frontmatter = content.slice(0, fmEnd + 5);
  const body = content.slice(fmEnd + 5);
  const newBody = processBody(body);

  if (body !== newBody) {
    filesModified++;
    if (!DRY_RUN) {
      writeFileSync(filePath, frontmatter + newBody);
    }
    console.log(`  ${DRY_RUN ? "[DRY] " : ""}${filePath}`);
  }
}

function walk(dir: string): void {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (extname(entry) === ".mdx") processFile(full);
  }
}

console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Fixing MDX compat in ${CONTENT_DIR}...\n`);
walk(CONTENT_DIR);
console.log(`\nDone! ${filesModified}/${filesProcessed} files ${DRY_RUN ? "would be " : ""}modified.`);
