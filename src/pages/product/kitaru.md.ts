import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownPreamble,
  markdownResponse,
} from "../../lib/agentMarkdown";
import { KITARU_INSTALL_CMD } from "../../lib/kitaru-landing";
import {
  PRODUCT_KITARU_MARKDOWN,
  PRODUCT_KITARU_SEO,
} from "../../lib/productKitaru";

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
      "## The five acts",
      ...PRODUCT_KITARU_MARKDOWN.journey.map((step) => {
        const body = step.body.replace(
          `\`${PRODUCT_KITARU_MARKDOWN.installCmd}\``,
          `\`${KITARU_INSTALL_CMD}\``,
        );
        return joinMarkdownSections(`### ${step.name}`, body);
      }),
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
  );

  return markdownResponse(markdown);
}
