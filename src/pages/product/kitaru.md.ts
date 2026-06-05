import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownPreamble,
  markdownResponse,
} from "../../lib/agentMarkdown";
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
      `Install: \`${PRODUCT_KITARU_MARKDOWN.installCmd}\``,
    ),
    joinMarkdownSections(
      "## Main CTAs",
      markdownCtaList(PRODUCT_KITARU_MARKDOWN.ctas),
    ),
    joinMarkdownSections(
      "## Runtime primitives",
      ...PRODUCT_KITARU_MARKDOWN.primitives.map((primitive) =>
        joinMarkdownSections(`### ${primitive.name}`, primitive.body),
      ),
    ),
    joinMarkdownSections(
      "## Deployment targets",
      "Run the same agent flow locally, then move it to production infrastructure while keeping execution state and artifacts in your own cloud storage.",
      markdownBulletList(PRODUCT_KITARU_MARKDOWN.deploymentTargets),
    ),
    joinMarkdownSections(
      "## Concrete failure story",
      "A normal Kubernetes restart can bring a pod back. It cannot, by itself, know that an agent already ran for 11 hours and should resume from the last completed checkpoint instead of restarting from hour 1. Kitaru stores checkpoints and artifacts so the resumed run can continue from completed work instead of starting from the top.",
    ),
  );

  return markdownResponse(markdown);
}
