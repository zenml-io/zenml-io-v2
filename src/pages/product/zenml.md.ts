import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownPreamble,
  markdownResponse,
} from "../../lib/agentMarkdown";
import {
  LABS_PRODUCT_ZENML_SEO,
  ZENML_CLOSE,
  ZENML_FEATURE_TABS,
  ZENML_HERO,
  ZENML_INTEGRATIONS,
  ZENML_STORIES,
  ZENML_VALUE_PROPS,
} from "../../lib/labs-product-zenml";

export const prerender = true;

/**
 * Machine-readable mirror of the ZenML product landing (`/product/zenml.md`).
 * It renders the same copy `zenml.astro` shows, from the same module, so the
 * two never drift.
 */
export function GET(): Response {
  const heroCtas = [
    ZENML_HERO.cta,
    ...(ZENML_HERO.secondaryCta ? [ZENML_HERO.secondaryCta] : []),
  ];
  const markdown = joinMarkdownSections(
    markdownPreamble({
      title: LABS_PRODUCT_ZENML_SEO.title,
      description: LABS_PRODUCT_ZENML_SEO.description,
      canonicalPath: "/product/zenml",
    }),
    joinMarkdownSections(
      "## Summary",
      ZENML_HERO.headlineLines.join(" "),
      ZENML_HERO.deck,
      ...(ZENML_HERO.install ? [`Install: \`${ZENML_HERO.install.cmd}\``] : []),
    ),
    joinMarkdownSections("## Main CTAs", markdownCtaList(heroCtas)),
    joinMarkdownSections(
      `## ${ZENML_FEATURE_TABS.headline}`,
      ...(ZENML_FEATURE_TABS.deck ? [ZENML_FEATURE_TABS.deck] : []),
      ...ZENML_FEATURE_TABS.tabs.map((tab) =>
        joinMarkdownSections(`### ${tab.title}`, tab.description),
      ),
    ),
    joinMarkdownSections(
      `## ${ZENML_VALUE_PROPS.headline}`,
      ...ZENML_VALUE_PROPS.items.map((item) =>
        joinMarkdownSections(`### ${item.title}`, item.body),
      ),
      markdownCtaList([ZENML_VALUE_PROPS.cta]),
    ),
    joinMarkdownSections(
      `## ${ZENML_INTEGRATIONS.headline}`,
      ...(ZENML_INTEGRATIONS.deck ? [ZENML_INTEGRATIONS.deck] : []),
      markdownCtaList([ZENML_INTEGRATIONS.cta]),
    ),
    joinMarkdownSections(
      ZENML_STORIES.headline ? `## ${ZENML_STORIES.headline}` : "",
      markdownBulletList(
        ZENML_STORIES.cards.map((card) =>
          "href" in card ? `[${card.title}](${card.href})` : card.title,
        ),
      ),
      markdownCtaList(ZENML_STORIES.allLink ? [ZENML_STORIES.allLink] : []),
    ),
    joinMarkdownSections(
      `## ${ZENML_CLOSE.headlineLines.join(" ")}`,
      ZENML_CLOSE.deck,
      markdownCtaList([ZENML_CLOSE.cta]),
    ),
  );

  return markdownResponse(markdown);
}
