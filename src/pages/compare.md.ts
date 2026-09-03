import { getCollection } from "astro:content";
import {
  joinMarkdownSections,
  markdownPreamble,
  markdownResponse,
  markdownTable,
} from "../lib/agentMarkdown";
import { absoluteUrl } from "../lib/seo";

export const prerender = true;

export async function GET(): Promise<Response> {
  const [mlopsItems, zenmlMdxItems, agentItems] = await Promise.all([
    getCollection("compare", ({ data }) => !data.draft).then((items) =>
      items.sort((a, b) => a.data.title.localeCompare(b.data.title)),
    ),
    getCollection("compare-zenml", ({ data }) => !data.draft).then((items) =>
      items.sort((a, b) => a.data.order - b.data.order),
    ),
    getCollection("compare-kitaru", ({ data }) => !data.draft).then((items) =>
      items.sort((a, b) => a.data.order - b.data.order),
    ),
  ]);

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
      "## AI orchestration comparisons: ZenML vs. other workflow orchestrators and platforms",
      markdownTable(
        ["Comparison", "Category", "Short description", "URL"],
        mlopsItems.map((item) => [
          item.data.title,
          item.data.category?.replace(/-/g, " ") ?? "MLOps",
          item.data.seoDescription ??
            item.data.heroText ??
            "ZenML comparison page.",
          absoluteUrl(`/compare/${item.data.slug}`),
        ]),
      ),
    ),
    joinMarkdownSections(
      "## AI orchestration comparisons: ZenML vs. durable execution engines and agent frameworks",
      markdownTable(
        ["Comparison", "Competitor", "Short description", "URL"],
        zenmlMdxItems.map((item) => [
          item.data.shortTitle ?? item.data.title,
          item.data.competitor,
          item.data.cardSubtitle,
          absoluteUrl(`/compare/${item.id}`),
        ]),
      ),
    ),
    joinMarkdownSections(
      "## Agent comparisons — Kitaru vs. other agent runtimes and workflow engines",
      markdownTable(
        ["Comparison", "Competitor", "Short description", "URL"],
        agentItems.map((item) => [
          item.data.shortTitle ?? item.data.title,
          item.data.competitor,
          item.data.cardSubtitle,
          absoluteUrl(`/compare/${item.id}`),
        ]),
      ),
    ),
  );

  return markdownResponse(markdown);
}
