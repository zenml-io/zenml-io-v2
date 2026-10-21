import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownLink,
  markdownPreamble,
  markdownResponse,
} from "../lib/agentMarkdown";
import {
  LABS_CLOSE,
  LABS_FEATURE_PANELS,
  LABS_HERO,
  LABS_HOME_SEO,
  LABS_LOGO_GRID,
  LABS_REASONS,
  LABS_STORIES,
} from "../lib/labs-home";

export const prerender = true;

/**
 * Machine-readable mirror of the ZenML Labs homepage (`/index.md`). It
 * renders the same copy `index.astro` shows, from the same module, so the
 * two never drift.
 */

export function GET(): Response {
  const markdown = joinMarkdownSections(
    markdownPreamble({
      title: LABS_HOME_SEO.title,
      description: LABS_HOME_SEO.description,
      canonicalPath: "/",
    }),
    joinMarkdownSections(
      "## Summary",
      LABS_HERO.headlineLines.join(" "),
      LABS_HERO.deck,
    ),
    joinMarkdownSections("## Main CTA", markdownCtaList([LABS_HERO.cta])),
    joinMarkdownSections(
      `## ${LABS_LOGO_GRID.headline}`,
      LABS_LOGO_GRID.logos.map((logo) => logo.name).join(", "),
    ),
    joinMarkdownSections(
      `## ${LABS_REASONS.headline}`,
      LABS_REASONS.deck,
      `The example agent run: ${LABS_REASONS.steps.join(" → ")}.`,
      markdownBulletList(
        LABS_REASONS.reasons.map(
          (reason) =>
            `${reason.label}: ${reason.outcome} (In the report: ${reason.reportLabel})`,
        ),
      ),
    ),
    joinMarkdownSections(
      "## What you get",
      ...LABS_FEATURE_PANELS.map((panel) =>
        joinMarkdownSections(`### ${panel.title}`, panel.body),
      ),
    ),
    joinMarkdownSections(
      LABS_STORIES.headline ? `## ${LABS_STORIES.headline}` : "",
      markdownBulletList(
        LABS_STORIES.cards.map((card) =>
          "href" in card ? markdownLink(card.title, card.href) : card.title,
        ),
      ),
      LABS_STORIES.allLink
        ? markdownLink(LABS_STORIES.allLink.label, LABS_STORIES.allLink.href)
        : "",
    ),
    joinMarkdownSections(
      `## ${LABS_CLOSE.headlineLines.join(" ")}`,
      LABS_CLOSE.deck,
      markdownCtaList([LABS_CLOSE.cta]),
    ),
  );

  return markdownResponse(markdown);
}
