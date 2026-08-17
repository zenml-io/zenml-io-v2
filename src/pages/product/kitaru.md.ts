import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownPreamble,
  markdownResponse,
} from "../../lib/agentMarkdown";
import { FAQ_ITEMS } from "../../lib/kitaru-landing";
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
      `Install: \`${PRODUCT_KITARU_MARKDOWN.installCmd}\``,
    ),
    joinMarkdownSections(
      "## Main CTAs",
      markdownCtaList(PRODUCT_KITARU_MARKDOWN.ctas),
    ),
    joinMarkdownSections(
      "## The five acts",
      ...PRODUCT_KITARU_MARKDOWN.journey.map((step) =>
        joinMarkdownSections(`### ${step.name}`, step.body),
      ),
    ),
    joinMarkdownSections(
      "## The object model",
      ...PRODUCT_KITARU_MARKDOWN.primitives.map((primitive) =>
        joinMarkdownSections(`### ${primitive.name}`, primitive.body),
      ),
    ),
    joinMarkdownSections(
      "## Where it runs",
      "Creation and execution happen on your machine, next to your code; the server holds the data model and the screens. The worker polls outward, so the server never opens a connection into your network.",
      markdownBulletList(PRODUCT_KITARU_MARKDOWN.deploymentTargets),
    ),
    joinMarkdownSections(
      "## Honest limits",
      "Stated plainly, because they decide whether Kitaru fits your setup today.",
      ...PRODUCT_KITARU_MARKDOWN.limits.map((limit) =>
        joinMarkdownSections(`### ${limit.name}`, limit.body),
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
