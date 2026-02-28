/**
 * Remark plugin that adds a default language to fenced code blocks
 * that have no language specified. Runs before Shiki so that syntax
 * highlighting works on Webflow-migrated content where language
 * identifiers were stripped.
 */
import { visit } from "unist-util-visit";
import type { Root, Code } from "mdast";

export function remarkDefaultLang(defaultLang = "python") {
  return () => (tree: Root) => {
    visit(tree, "code", (node: Code) => {
      if (!node.lang) {
        node.lang = defaultLang;
      }
    });
  };
}
