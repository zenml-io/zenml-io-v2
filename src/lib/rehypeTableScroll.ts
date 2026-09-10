/**
 * rehypeTableScroll — wraps every Markdown `<table>` in a
 * `<div class="table-scroll">` so a wide table scrolls inside its own region
 * instead of pushing the page body sideways (DESIGN.md, responsive contract:
 * wide tables scroll inside the section with an explicit min-width and a
 * visible affordance; the page never scrolls horizontally).
 *
 * The wrapper owns the frame (border, radius, overflow); the table keeps its
 * min-width so the scroll has something to scroll. Both sit inside a
 * `<div class="table-scroll-block">` alongside a `table-scroll__hint`
 * paragraph (arrow icon + "Scrolls horizontally" label, board 27 - Prose
 * FS5-0/FTC-0) that a container query in `global.css` shows only when that
 * block is too narrow for the table's min-width to fit — see the comment on
 * `.table-scroll__hint` there for why that's an approximation, not a real
 * overflow check. Styled under `[data-app="labs"] .prose` in `global.css`.
 * Runs on every long-form prose collection (see isProseCollectionFile).
 */
import { visit } from "unist-util-visit";
import { isProseCollectionFile } from "./rehypeCodePane";

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}

function scrollHintSvgNode(): HastNode {
  // Inline SVG source: <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
  //   <path d="M2 7h10M8 3l4 4-4 4" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  // </svg>
  // Written as hast nodes by hand (no svg-to-hast dependency for one static icon).
  return {
    type: "element",
    tagName: "svg",
    properties: {
      viewBox: "0 0 14 14",
      fill: "none",
      "aria-hidden": "true",
    },
    children: [
      {
        type: "element",
        tagName: "path",
        properties: {
          d: "M2 7h10M8 3l4 4-4 4",
          "stroke-width": "1.2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        },
        children: [],
      },
    ],
  };
}

/** The same frame as string markup, for raw-HTML tables (rehypeBlogRawHtml). */
export const TABLE_SCROLL_HINT_TEXT =
  "Scrolls horizontally · the page body never does";
export const TABLE_SCROLL_BLOCK_OPEN =
  '<div class="table-scroll-block"><div class="table-scroll">';
export const TABLE_SCROLL_BLOCK_CLOSE =
  '</div><p class="table-scroll__hint" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
  TABLE_SCROLL_HINT_TEXT +
  "</p></div>";

export function rehypeTableScroll() {
  return (tree: HastNode, file: { path?: string; history?: string[] }) => {
    // Every long-form prose collection (see isProseCollectionFile).
    if (!isProseCollectionFile(file)) return;
    // Same untyped walk as rehypeCodePane (no hast types in the repo).
    // biome-ignore lint/suspicious/noExplicitAny: see rehypeCodePane
    visit(tree as any, "element", (nodeIn: unknown, index, parentIn) => {
      const node = nodeIn as HastNode;
      const parent = parentIn as HastNode | undefined;
      if (
        node.tagName !== "table" ||
        !parent ||
        !parent.children ||
        index === undefined
      )
        return;
      if (
        parent.tagName === "div" &&
        parent.properties?.class === "table-scroll-block"
      )
        return;
      const scrollWrapper: HastNode = {
        type: "element",
        tagName: "div",
        properties: { class: "table-scroll" },
        children: [node],
      };
      const hint: HastNode = {
        type: "element",
        tagName: "p",
        properties: { class: "table-scroll__hint", "aria-hidden": "true" },
        children: [
          scrollHintSvgNode(),
          {
            type: "text",
            value: TABLE_SCROLL_HINT_TEXT,
          },
        ],
      };
      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { class: "table-scroll-block" },
        children: [scrollWrapper, hint],
      };
    });
  };
}
