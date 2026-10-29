import {
  joinMarkdownSections,
  markdownCtaList,
  markdownPreamble,
  markdownResponse,
} from "../../lib/agentMarkdown";
import { FAQ_ITEMS, KITARU_INSTALL_CMD } from "../../lib/kitaru-landing";
import {
  PRODUCT_KITARU_MARKDOWN,
  PRODUCT_KITARU_SEO,
} from "../../lib/productKitaru";
import { htmlToPlainText } from "../../lib/text";

export const prerender = true;

export function GET(): Response {
  const markdown = joinMarkdownSections(
    markdownPreamble({
      title: PRODUCT_KITARU_MARKDOWN.title,
      description: PRODUCT_KITARU_SEO.description,
      canonicalPath: "/product/kitaru",
    }),
    joinMarkdownSections(
      "## Summary",
      ...PRODUCT_KITARU_MARKDOWN.summary,
      `Install: \`${KITARU_INSTALL_CMD}\``,
    ),
    joinMarkdownSections(
      "## Main CTAs",
      markdownCtaList(PRODUCT_KITARU_MARKDOWN.ctas),
    ),
    joinMarkdownSections(
      "## How it works",
      ...PRODUCT_KITARU_MARKDOWN.steps.map((step, i) =>
        joinMarkdownSections(`### ${i + 1}. ${step.name}`, step.body),
      ),
    ),
    joinMarkdownSections(
      "## FAQ",
      ...FAQ_ITEMS.map((item) =>
        joinMarkdownSections(
          `### ${item.question}`,
          htmlToPlainText(item.answer),
        ),
      ),
    ),
  );

  return markdownResponse(markdown);
}
