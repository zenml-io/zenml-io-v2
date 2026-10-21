import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownLink,
  markdownPreamble,
  markdownResponse,
} from "../lib/agentMarkdown";
import {
  LABS_CHOICES,
  LABS_CLOSE,
  LABS_FANOUT,
  LABS_FEATURE_PANELS,
  LABS_HERO,
  LABS_HOME_SEO,
  LABS_LOGO_GRID,
  LABS_STANCE,
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
      `## ${LABS_STANCE.headlineLines.join(" ")}`,
      markdownBulletList(
        LABS_STANCE.rows.map((row) => `${row.source} ${row.verdict}`),
      ),
      LABS_STANCE.deck,
    ),
    joinMarkdownSections(
      `## ${LABS_FANOUT.headline}`,
      LABS_FANOUT.deck,
      `${LABS_FANOUT.call.label}: ${LABS_FANOUT.call.input} ${LABS_FANOUT.call.recordedLabel} \`${LABS_FANOUT.call.recorded}\`.`,
      markdownBulletList(
        LABS_FANOUT.lanes.map(
          (lane) => `${lane.model} (${lane.detail}): ${lane.outcome}`,
        ),
      ),
      LABS_FANOUT.caption,
    ),
    joinMarkdownSections(
      `## ${LABS_CHOICES.headline}`,
      LABS_CHOICES.deck,
      markdownBulletList(
        LABS_CHOICES.cards.map((card) => `${card.goal}: ${card.rule}`),
      ),
      markdownBulletList(
        LABS_CHOICES.principles.map((item) => `${item.title}: ${item.detail}`),
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
