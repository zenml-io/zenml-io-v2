import {
  indentedMarkdownBulletList,
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownLink,
  markdownPreamble,
  markdownResponse,
  markdownTable,
  yesNo,
} from "../lib/agentMarkdown";
import {
  PRICING_COMPARE,
  PRICING_COMPLIANCE,
  PRICING_FAQ_KITARU,
  PRICING_FAQ_SLACK_CTA,
  PRICING_FAQ_ZENML,
  PRICING_FINAL_CTA,
  PRICING_HERO,
  PRICING_PLANS,
  PRICING_PRO_INCLUSIONS,
  PRICING_SEO,
  PRICING_STARTUP_BANNER,
  PRICING_STATS,
} from "../lib/pricing";
import { htmlToPlainText } from "../lib/text";

export const prerender = true;

function renderPlan(plan: (typeof PRICING_PLANS)[number]): string {
  const limits = plan.limitsLine ? `\n- Limits: ${plan.limitsLine}` : "";
  const slider = plan.slider
    ? joinMarkdownSections(
        `- ${plan.slider.caption}:`,
        markdownTable(
          ["Executions", "Monthly price", "Projects", "Snapshots"],
          plan.slider.tiers.map((tier) => [
            tier.executions,
            tier.price,
            tier.projects,
            tier.snapshots,
          ]),
        ),
      )
    : "";

  return joinMarkdownSections(
    `### ${plan.eyebrow}`,
    plan.subtitle,
    `- Price: ${plan.price}${plan.priceSuffix ?? ""}${limits}`,
    slider,
    `- ${plan.includesLabel}:\n${indentedMarkdownBulletList(plan.features)}`,
    `- CTA: ${markdownLink(plan.cta.label, plan.cta.href)}`,
  );
}

function renderComparisonTables(): string {
  return joinMarkdownSections(
    `## ${PRICING_COMPARE.heading}`,
    PRICING_COMPARE.subheading ?? "",
    ...PRICING_COMPARE.sections.map((section) =>
      joinMarkdownSections(
        `### ${section.heading}`,
        markdownTable(
          ["Feature", ...PRICING_COMPARE.columnHeaders],
          section.rows.map((row) => [
            row.link ? markdownLink(row.feature, row.link) : row.feature,
            ...row.values.map(yesNo),
          ]),
        ),
      ),
    ),
  );
}

function renderProInclusions(): string {
  return joinMarkdownSections(
    `## ${PRICING_PRO_INCLUSIONS.headline}`,
    PRICING_PRO_INCLUSIONS.deck,
    ...PRICING_PRO_INCLUSIONS.cards.map((card) =>
      joinMarkdownSections(
        `### ${card.title}`,
        card.body,
        markdownBulletList(
          card.bullets.map((bullet) => `${bullet.title}: ${bullet.detail}`),
        ),
        `- Learn more: ${markdownLink(card.learn.label, card.learn.href)}`,
        `- CTA: ${markdownLink(card.cta.label, card.cta.href)}`,
      ),
    ),
    PRICING_PRO_INCLUSIONS.caption,
  );
}

function renderFaq(): string {
  return joinMarkdownSections(
    ...[PRICING_FAQ_KITARU, PRICING_FAQ_ZENML].flatMap((faq) => [
      `## ${faq.headline}`,
      ...faq.items.map(
        (item) => `### ${item.question}\n\n${htmlToPlainText(item.answer)}`,
      ),
    ]),
    `Still not clear? ${markdownLink(
      PRICING_FAQ_SLACK_CTA.label,
      PRICING_FAQ_SLACK_CTA.href,
    )}`,
  );
}

export function GET(): Response {
  const markdown = joinMarkdownSections(
    markdownPreamble({
      title: PRICING_HERO.headline,
      description: PRICING_SEO.description,
      canonicalPath: "/pricing",
    }),
    `## Summary\n\n${PRICING_HERO.deck}`,
    joinMarkdownSections(
      "## Main CTAs",
      markdownCtaList([
        PRICING_FINAL_CTA.primaryCta,
        PRICING_FINAL_CTA.secondaryCta,
        PRICING_STARTUP_BANNER.cta,
      ]),
    ),
    `## Plans\n\n${PRICING_PLANS.map(renderPlan).join("\n\n")}`,
    renderComparisonTables(),
    renderFaq(),
    renderProInclusions(),
    joinMarkdownSections(
      `## ${PRICING_STARTUP_BANNER.headline}`,
      PRICING_STARTUP_BANNER.body,
      markdownLink(
        PRICING_STARTUP_BANNER.cta.label,
        PRICING_STARTUP_BANNER.cta.href,
      ),
    ),
    joinMarkdownSections(
      `## ${PRICING_COMPLIANCE.headline}`,
      PRICING_COMPLIANCE.body,
      `### ${PRICING_COMPLIANCE.bannerHeadline}`,
      PRICING_COMPLIANCE.bannerBody,
      `Security badges: ${PRICING_COMPLIANCE.badges
        .map((badge) => badge.alt)
        .join(", ")}.`,
    ),
    joinMarkdownSections(
      `## ${PRICING_STATS.headline}`,
      PRICING_STATS.deck,
      markdownBulletList(
        PRICING_STATS.items.map((item) => `${item.value} ${item.label}`),
      ),
    ),
    joinMarkdownSections(
      `## ${PRICING_FINAL_CTA.headline}`,
      PRICING_FINAL_CTA.body,
      "### CTAs",
      markdownCtaList([
        PRICING_FINAL_CTA.primaryCta,
        PRICING_FINAL_CTA.secondaryCta,
      ]),
    ),
  );

  return markdownResponse(markdown);
}
