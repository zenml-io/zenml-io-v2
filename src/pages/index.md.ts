import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownLink,
  markdownPreamble,
  markdownResponse,
} from "../lib/agentMarkdown";
import {
  LABS_DOORS,
  LABS_HERO,
  LABS_HERO_DEMO,
  LABS_HOME_BENCHMARKS,
  LABS_HOME_CLOSE,
  LABS_HOME_SEO,
  LABS_LOGO_GRID,
  LABS_ONBOARDING,
  LABS_STACK_LAYER,
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
      LABS_HERO_DEMO.label,
      markdownLink(LABS_HERO_DEMO.link.label, LABS_HERO_DEMO.link.href),
    ),
    joinMarkdownSections(
      "## Main CTA",
      markdownCtaList(
        LABS_HERO.secondaryCta
          ? [LABS_HERO.cta, LABS_HERO.secondaryCta]
          : [LABS_HERO.cta],
      ),
      LABS_HERO.install ? `Install Kitaru: \`${LABS_HERO.install.cmd}\`` : "",
    ),
    joinMarkdownSections(
      `## ${LABS_ONBOARDING.headline}`,
      LABS_ONBOARDING.deck,
      markdownBulletList(
        LABS_ONBOARDING.steps.map((step) => `${step.title}: ${step.body}`),
      ),
    ),
    joinMarkdownSections(
      `## ${LABS_HOME_BENCHMARKS.headline}`,
      LABS_HOME_BENCHMARKS.deck,
      markdownLink(
        LABS_HOME_BENCHMARKS.link.label,
        LABS_HOME_BENCHMARKS.link.href,
      ),
    ),
    joinMarkdownSections(
      `## ${LABS_STACK_LAYER.headline}`,
      LABS_STACK_LAYER.deck,
      LABS_STACK_LAYER.connect.title,
      markdownBulletList(
        LABS_STACK_LAYER.columns.map(
          (column) =>
            `${column.title}: ${column.marks.map((mark) => mark.name).join(", ")}`,
        ),
      ),
      LABS_STACK_LAYER.deploy.title,
      markdownBulletList(
        LABS_STACK_LAYER.deploy.options.map(
          (option) => `${option.name}: ${option.caption}`,
        ),
      ),
      LABS_STACK_LAYER.deploy.badges.join(", "),
      markdownLink(LABS_STACK_LAYER.link.label, LABS_STACK_LAYER.link.href),
    ),
    joinMarkdownSections(
      `## ${LABS_LOGO_GRID.headline}`,
      LABS_LOGO_GRID.logos.map((logo) => logo.name).join(", "),
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
      `## ${LABS_HOME_CLOSE.headlineLines.join(" ")}`,
      LABS_HOME_CLOSE.deck,
      markdownCtaList([LABS_HOME_CLOSE.cta]),
    ),
  );

  return markdownResponse(markdown);
}
