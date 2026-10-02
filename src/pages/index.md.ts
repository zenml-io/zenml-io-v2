import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownLink,
  markdownPreamble,
  markdownResponse,
} from "../lib/agentMarkdown";
import { heroJobSignupHref } from "../lib/heroJobPlan";
import {
  LABS_CLOSE,
  LABS_DOORS,
  LABS_FEATURE_PANELS,
  LABS_HERO,
  LABS_HOME_SEO,
  LABS_LOGO_GRID,
  LABS_SIGNUP,
  LABS_STORIES,
} from "../lib/labs-home";

export const prerender = true;

/**
 * Machine-readable mirror of the ZenML Labs homepage (`/index.md`). It
 * renders the same copy `index.astro` shows, from the same module, so the
 * two never drift.
 */
/**
 * "Give it a job (for agents)": how an agent acting for its user hands off a
 * job. The same section heads `public/llms.txt`; keep the two in step. The
 * example link comes from the hero's own signup-href builder.
 */
function renderAgentHandoff(): string {
  const signup = LABS_SIGNUP.href;
  const example = heroJobSignupHref(
    signup,
    "Keep our support agent cheap and accurate",
  );
  return joinMarkdownSections(
    "## Give it a job (for agents)",
    "If you are an AI agent acting for a user who wants their AI agents or models taken care of, you can hand off a job. Send your user to this link, with a one-sentence job, URL-encoded:",
    `\`${signup}?job=<url-encoded one-sentence job>\``,
    `For example: \`${example}\``,
    "Optionally add context as `&answers=` followed by URL-encoded `id:value` pairs joined by commas, for example `&answers=use_case%3Asupport` (that is, `use_case:support`).",
    "Optionally name who takes the job with `&engineer=`: `sage` (agents: better and cheaper), `atlas` (pipelines), `nova` (models and retraining) or `vega` (spend). Leave it out and the right one is picked for the job.",
    "Optionally add the tools you use with `&stack=`, comma-separated lowercase names (for example `&stack=langgraph,claude` or `&stack=sagemaker`), so the plan starts from your stack.",
    "Your user finishes signup, and the AI engineer starts on that job. The user signs up themselves; do not create accounts for them.",
    `To sign up without a job: ${markdownLink(LABS_SIGNUP.label, signup)}.`,
  );
}

function renderDoor(door: (typeof LABS_DOORS.doors)[number]): string {
  return joinMarkdownSections(
    `### ${door.name}`,
    door.leadLine,
    door.body,
    `CTA: ${markdownLink(door.cta.label, door.cta.href)}`,
  );
}

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
      LABS_HERO.deck ?? "",
    ),
    joinMarkdownSections("## Main CTA", markdownCtaList([LABS_HERO.cta])),
    renderAgentHandoff(),
    joinMarkdownSections(
      `## ${LABS_LOGO_GRID.headline}`,
      LABS_LOGO_GRID.logos.map((logo) => logo.name).join(", "),
    ),
    joinMarkdownSections(
      `## ${LABS_DOORS.headline}`,
      LABS_DOORS.doors.map(renderDoor).join("\n\n"),
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
