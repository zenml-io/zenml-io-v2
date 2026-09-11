/**
 * rehypeCodePane — wraps every fenced code block's Shiki `<pre>` in the
 * blog cutover's code-pane chrome (the approved blog design, DESIGN.md): a header bar with the
 * language label + copy button, and a scrollable body that holds the `<pre>`
 * so the copy control can sit outside the scroll region.
 *
 * Runs after Shiki (Astro applies `markdown.rehypePlugins` after syntax
 * highlighting), so it matches on the `astro-code` class Shiki's transformer
 * stamps onto every highlighted `<pre>` and reads the language back off the
 * `dataLanguage` hast property it also sets there.
 *
 * `src/scripts/code-copy.ts` wires the button; this plugin only emits the
 * static markup.
 */
import { visit } from "unist-util-visit";

/**
 * Minimal local hast shape — the repo has no `hast`/`@types/hast` dependency
 * (only `@types/mdast`, for the remark stage), so this stays untyped rather
 * than adding a new package for one file.
 */
interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}
type Root = HastNode;
type Element = HastNode;

function getClassString(node: Element): string {
  const value = node.properties?.class;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(String).join(" ");
  return "";
}

/**
 * These three rehype plugins now run for every long-form `.prose` collection
 * rendered in the Labs shell — the blog, and the two research databases
 * (LLMOps, MLOps) — since their entries share the same code-pane chrome and
 * table frame, styled under `[data-app="labs"] .prose` and wired (copy
 * button) by their layouts. The MDX compare collections stay excluded: they
 * render through their own dispatcher and never mount this scope.
 */
export function isProseCollectionFile(file: {
  path?: string;
  history?: string[];
}): boolean {
  const p = file.path ?? file.history?.[0] ?? "";
  return (
    p.includes("/src/content/blog/") ||
    p.includes("/src/content/llmops-database/") ||
    p.includes("/src/content/mlops-database/")
  );
}

export function rehypeCodePane() {
  return (tree: Root, file: { path?: string; history?: string[] }) => {
    if (!isProseCollectionFile(file)) return;
    // unist-util-visit's generics are keyed to the real `hast`/`mdast` Node
    // unions; this plugin walks a deliberately minimal local shape instead
    // (see HastNode above), so the visitor callback's node/parent types are
    // asserted here rather than inferred.
    // biome-ignore lint/suspicious/noExplicitAny: see comment above
    visit(tree as any, "element", (nodeIn: unknown, index, parentIn) => {
      const node = nodeIn as Element;
      const parent = parentIn as Element | undefined;
      if (
        node.tagName !== "pre" ||
        !parent ||
        !parent.children ||
        index === undefined ||
        !getClassString(node).split(/\s+/).includes("astro-code")
      ) {
        return;
      }

      const language =
        typeof node.properties?.dataLanguage === "string"
          ? node.properties.dataLanguage
          : "text";

      const figure: Element = {
        type: "element",
        tagName: "figure",
        properties: { class: "code-pane", "data-language": language },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { class: "code-pane__bar" },
            children: [
              {
                type: "element",
                tagName: "span",
                properties: {},
                children: [{ type: "text", value: language }],
              },
              {
                type: "element",
                tagName: "button",
                properties: {
                  type: "button",
                  class: "code-pane__copy",
                  "aria-label": "Copy code",
                },
                children: [{ type: "text", value: "Copy" }],
              },
            ],
          },
          {
            type: "element",
            tagName: "div",
            properties: { class: "code-pane__scroll" },
            children: [node],
          },
        ],
      };

      parent.children[index] = figure;
    });
  };
}
