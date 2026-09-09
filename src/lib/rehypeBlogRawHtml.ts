/**
 * rehypeBlogRawHtml — normalises the raw HTML that the Webflow-era blog
 * posts carry inside their Markdown (tables, lists, spans with inline
 * `style="…"`). Astro applies the user rehype plugins BEFORE it parses raw
 * HTML (`rehype-raw` runs last in its markdown pipeline), so that markup
 * reaches us as `raw` string nodes, invisible to the element visitors in
 * `rehypeCodePane`/`rehypeTableScroll`. This pass works on those strings:
 *
 * 1. Off-brand presentation is removed from inline `style` attributes:
 *    colours, borders, font and text declarations, and any margin/padding
 *    given as a fixed length. Those are pre-rebrand values (`color: #444`,
 *    `border-bottom: 2px solid #007bff`, `line-height: 1.5`) that override the
 *    Labs prose rules; the `.prose` block owns presentation. Structural
 *    declarations are kept, because a lot of this markup is layout: 37 posts
 *    size a video embed with the percentage-padding aspect-ratio wrapper
 *    (`position: relative; padding-bottom: 56.25%; height: 0`), which is why
 *    percentage margins/paddings and position/size/display are left alone.
 * 2. Raw `<table>…</table>` blocks get the same scroll frame and hint that
 *    `rehypeTableScroll` gives Markdown tables, so every table on the blog
 *    shares one frame (border, radius, header row, hint under wide tables).
 *
 * Runs on the blog collection only (see isBlogMarkdownFile).
 */
import { visit } from "unist-util-visit";
import { isBlogMarkdownFile } from "./rehypeCodePane";
import {
  TABLE_SCROLL_BLOCK_CLOSE,
  TABLE_SCROLL_BLOCK_OPEN,
} from "./rehypeTableScroll";

interface RawNode {
  type: string;
  value?: string;
}

const STYLE_ATTR = /(\s+style\s*=\s*)("([^"]*)"|'([^']*)')/gi;

/** Presentation the `.prose` block owns — never a layout concern. */
const OFF_BRAND_PROPERTY =
  /^(color|background|background-[a-z-]+|border|border-[a-z-]+|outline|outline-[a-z-]+|font|font-[a-z-]+|line-height|letter-spacing|word-spacing|text-transform|text-decoration|text-decoration-[a-z-]+|text-shadow|box-shadow|list-style|list-style-[a-z-]+)$/;

/** A fixed-length margin/padding fights the prose rhythm; a percentage one is
 *  the aspect-ratio wrapper and must survive. */
const SPACING_PROPERTY = /^(margin|padding)(-[a-z]+)?$/;

function cleanDeclarations(css: string): string {
  return css
    .split(";")
    .map((decl) => decl.trim())
    .filter(Boolean)
    .filter((decl) => {
      const colon = decl.indexOf(":");
      if (colon === -1) return true;
      const prop = decl.slice(0, colon).trim().toLowerCase();
      const value = decl.slice(colon + 1);
      if (OFF_BRAND_PROPERTY.test(prop)) return false;
      if (SPACING_PROPERTY.test(prop) && !value.includes("%")) return false;
      return true;
    })
    .join("; ");
}
const TABLE_OPEN = /<table\b[^>]*>/gi;
const TABLE_CLOSE = /<\/table\s*>/gi;

export function normalizeBlogRawHtml(html: string): string {
  let out = html.replace(STYLE_ATTR, (_match, prefix, _quoted, dq, sq) => {
    const kept = cleanDeclarations(dq ?? sq ?? "");
    return kept ? `${prefix}"${kept}"` : "";
  });
  if (/<table\b/i.test(out) && !/table-scroll-block/.test(out)) {
    out = out
      .replace(TABLE_OPEN, (m) => `${TABLE_SCROLL_BLOCK_OPEN}${m}`)
      .replace(TABLE_CLOSE, (m) => `${m}${TABLE_SCROLL_BLOCK_CLOSE}`);
  }
  return out;
}

export function rehypeBlogRawHtml() {
  return (tree: RawNode, file: { path?: string; history?: string[] }) => {
    if (!isBlogMarkdownFile(file)) return;
    // biome-ignore lint/suspicious/noExplicitAny: same untyped walk as the sibling plugins
    visit(tree as any, "raw", (nodeIn: unknown) => {
      const node = nodeIn as RawNode;
      if (typeof node.value !== "string") return;
      const next = normalizeBlogRawHtml(node.value);
      if (next !== node.value) node.value = next;
    });
  };
}
