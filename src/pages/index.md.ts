import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownLink,
  markdownPreamble,
  markdownResponse,
} from "../lib/agentMarkdown";
import { FAQ } from "../lib/homepage";
import {
  HOMEPAGE_UNIFIED_FINAL_CTA,
  HOMEPAGE_UNIFIED_HERO,
  HOMEPAGE_UNIFIED_SEO,
  HOMEPAGE_UNIFIED_VALUES,
  HOMEPAGE_UNIFIED_WORKSPACES,
} from "../lib/homepage-unified";
import { htmlToPlainText } from "../lib/text";

export const prerender = true;

function renderWorkspace(
  workspace: (typeof HOMEPAGE_UNIFIED_WORKSPACES.items)[number],
): string {
  return joinMarkdownSections(
    `### ${workspace.name}`,
    workspace.tagline,
    workspace.body,
    markdownBulletList(workspace.bullets),
    `CTA: ${markdownLink(workspace.cta.label, workspace.cta.href)}`,
  );
}

function renderValues(): string {
  return joinMarkdownSections(
    `## ${HOMEPAGE_UNIFIED_VALUES.headline}`,
    ...HOMEPAGE_UNIFIED_VALUES.items.map((item) =>
      joinMarkdownSections(`### ${item.name}`, item.body),
    ),
  );
}

function renderFaq(): string {
  return joinMarkdownSections(
    `## ${FAQ.headline}`,
    FAQ.subheadline,
    FAQ.items
      .map((item) =>
        joinMarkdownSections(
          `### ${item.question}`,
          htmlToPlainText(item.answer),
        ),
      )
      .join("\n\n"),
    `${markdownLink(FAQ.slackCta.label, FAQ.slackCta.href)}`,
  );
}

export function GET(): Response {
  const markdown = joinMarkdownSections(
    markdownPreamble({
      title: HOMEPAGE_UNIFIED_SEO.title,
      description: HOMEPAGE_UNIFIED_SEO.description,
      canonicalPath: "/",
    }),
    joinMarkdownSections(
      "## Summary",
      `${HOMEPAGE_UNIFIED_HERO.subtitleLead} ${HOMEPAGE_UNIFIED_HERO.subtitle}`,
      "ZenML presents one platform for two related workloads: reproducible ML pipelines in the ZenML workspace, and production AI agents in the Kitaru workspace.",
    ),
    joinMarkdownSections(
      "## Main CTAs",
      markdownCtaList([
        ...HOMEPAGE_UNIFIED_HERO.productCtas,
        HOMEPAGE_UNIFIED_HERO.secondaryCta,
        HOMEPAGE_UNIFIED_FINAL_CTA.primaryCta,
        HOMEPAGE_UNIFIED_FINAL_CTA.secondaryCta,
      ]),
    ),
    joinMarkdownSections(
      `## ${HOMEPAGE_UNIFIED_WORKSPACES.headline}`,
      HOMEPAGE_UNIFIED_WORKSPACES.note,
      HOMEPAGE_UNIFIED_WORKSPACES.items.map(renderWorkspace).join("\n\n"),
    ),
    renderValues(),
    joinMarkdownSections(
      "## Key product links",
      markdownBulletList([
        `${markdownLink("ZenML product page", "/product/zenml")} — ML pipelines and MLOps orchestration.`,
        `${markdownLink("Kitaru product page", "/product/kitaru")} — durable Python agents with record, replay, and improvement workflows.`,
        `${markdownLink("Pricing", "/pricing")} — unified plans for ML, agent, or both workloads.`,
        `${markdownLink("Documentation", "/docs")} — product docs, tutorials, and setup guides.`,
      ]),
    ),
    renderFaq(),
    joinMarkdownSections(
      `## ${HOMEPAGE_UNIFIED_FINAL_CTA.headline}`,
      HOMEPAGE_UNIFIED_FINAL_CTA.body,
      markdownCtaList([
        HOMEPAGE_UNIFIED_FINAL_CTA.primaryCta,
        HOMEPAGE_UNIFIED_FINAL_CTA.secondaryCta,
      ]),
    ),
  );

  return markdownResponse(markdown);
}
