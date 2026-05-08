/**
 * Remark plugin that adds a default language to fenced code blocks
 * that have no language specified. Runs before Shiki so that syntax
 * highlighting works on Webflow-migrated content where language
 * identifiers were stripped.
 */

import type { Code, Root } from "mdast";
import { visit } from "unist-util-visit";

export function remarkDefaultLang(defaultLang = "python") {
  return () => (tree: Root) => {
    visit(tree, "code", (node: Code) => {
      if (!node.lang) {
        node.lang = defaultLang;
      }
    });
  };
}
