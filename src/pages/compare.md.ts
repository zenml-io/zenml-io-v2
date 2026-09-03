import {
  joinMarkdownSections,
  markdownPreamble,
  markdownResponse,
  markdownTable,
} from "../lib/agentMarkdown";
import {
  type CompareCard,
  getKitaruCompareCards,
  getZenmlCompareCards,
} from "../lib/compareHub";
import { absoluteUrl } from "../lib/seo";

export const prerender = true;

export async function GET(): Promise<Response> {
  const [zenmlCards, kitaruCards] = await Promise.all([
    getZenmlCompareCards(),
    getKitaruCompareCards(),
  ]);
  const toRow = (card: CompareCard) => [
    card.title,
    card.meta,
    card.blurb,
    absoluteUrl(card.href),
  ];

  const markdown = joinMarkdownSections(
    markdownPreamble({
      title: "Compare: ZenML and Kitaru vs. alternatives",
      description:
        "Side-by-side comparisons of ZenML for AI orchestration and Kitaru for agent replay against other tools and platforms.",
      canonicalPath: "/compare",
    }),
    joinMarkdownSections(
      "## Summary",
      "ZenML is for AI workflow orchestration. Kitaru is for replaying and regression-testing agents. This hub points readers and agents to the detailed comparison pages for each product area.",
      "This first Markdown mirror summarizes the compare hub only. It does not create Markdown mirrors for every comparison detail page.",
    ),
    joinMarkdownSections(
      "## AI orchestration comparisons: ZenML vs. orchestrators, durable execution engines and agent frameworks",
      markdownTable(
        ["Comparison", "Competitor or category", "Short description", "URL"],
        zenmlCards.map(toRow),
      ),
    ),
    joinMarkdownSections(
      "## Agent replay comparisons: Kitaru vs. agent frameworks and SDKs",
      markdownTable(
        ["Comparison", "Competitor", "Short description", "URL"],
        kitaruCards.map(toRow),
      ),
    ),
  );

  return markdownResponse(markdown);
}
