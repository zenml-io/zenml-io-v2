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
  LABS_DOORS,
  LABS_FEATURE_PANELS,
  LABS_HERO,
  LABS_HERO_VISUAL,
  LABS_HOME_SEO,
  LABS_HOW_IT_WORKS,
  LABS_LOGO_GRID,
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
      LABS_HERO_VISUAL.label,
    ),
    joinMarkdownSections(
      "## Main CTA",
      markdownCtaList([LABS_HERO.cta]),
      LABS_HERO.install ? `Install Kitaru: \`${LABS_HERO.install.cmd}\`` : "",
    ),
    joinMarkdownSections(
      `## ${LABS_HOW_IT_WORKS.headline}`,
      LABS_HOW_IT_WORKS.intro,
      ...LABS_HOW_IT_WORKS.steps.map((step, i) =>
        joinMarkdownSections(
          `### ${i + 1}. ${step.title}`,
          step.body,
          step.detail?.kind === "prompt" ? `\`${step.detail.text}\`` : "",
        ),
      ),
      markdownLink(LABS_HOW_IT_WORKS.link.label, LABS_HOW_IT_WORKS.link.href),
    ),
    joinMarkdownSections(
      `## ${LABS_DOORS.headline}`,
      ...LABS_DOORS.doors.map((door) =>
        joinMarkdownSections(
          `### ${door.name}`,
          door.leadLine,
          door.body,
          `CTA: ${markdownLink(door.cta.label, door.cta.href)}`,
        ),
      ),
    ),
    joinMarkdownSections(
      `## ${LABS_LOGO_GRID.headline}`,
      LABS_LOGO_GRID.logos.map((logo) => logo.name).join(", "),
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
