/**
 * Compare hub data — the normalised card lists behind /compare and its
 * Markdown mirror (/compare.md).
 *
 * Three content collections feed two product sections. Kitaru is one
 * collection (`compare-kitaru`). ZenML merges two: `compare-zenml` (the
 * agent-era MDX pages, listed first in their `order`) and `compare` (the
 * Webflow-era platforms, alphabetical). Normalising here means the grid and
 * the Markdown table never have to know which collection a row came from.
 */
import { getCollection } from "astro:content";
import { formatCategoryLabel } from "./compareDefaults";

export interface CompareCard {
  href: string;
  /** Card heading, e.g. "ZenML vs. Temporal". */
  title: string;
  /** Competitor or tool name: logo alt text and the fallback initial. */
  name: string;
  logo?: string;
  /** Second column of the Markdown table: competitor name or category. */
  meta: string;
  /** Short description for the Markdown table. */
  blurb: string;
  /** Secondary line on the card, if any. */
  sub?: { text: string; kind: "subtitle" | "category" };
}

export async function getKitaruCompareCards(): Promise<CompareCard[]> {
  const items = await getCollection(
    "compare-kitaru",
    ({ data }) => !data.draft,
  );
  return items
    .sort((a, b) => a.data.order - b.data.order)
    .map((item) => ({
      href: `/compare/${item.id}`,
      title: `Kitaru vs. ${item.data.competitor}`,
      name: item.data.competitor,
      logo: item.data.competitorLogo,
      meta: item.data.competitor,
      blurb: item.data.cardSubtitle,
      sub: { text: item.data.cardSubtitle, kind: "subtitle" },
    }));
}

export async function getZenmlCompareCards(): Promise<CompareCard[]> {
  const [mdxItems, legacyItems] = await Promise.all([
    getCollection("compare-zenml", ({ data }) => !data.draft),
    getCollection("compare", ({ data }) => !data.draft),
  ]);
  const mdx: CompareCard[] = mdxItems
    .sort((a, b) => a.data.order - b.data.order)
    .map((item) => ({
      href: `/compare/${item.id}`,
      title: `ZenML vs. ${item.data.competitor}`,
      name: item.data.competitor,
      logo: item.data.competitorLogo,
      meta: item.data.competitor,
      blurb: item.data.cardSubtitle,
      sub: { text: item.data.cardSubtitle, kind: "subtitle" },
    }));
  const legacy: CompareCard[] = legacyItems
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((item) => {
      const category = item.data.category
        ? formatCategoryLabel(item.data.category)
        : undefined;
      return {
        href: `/compare/${item.data.slug}`,
        title: item.data.title,
        name: item.data.toolName || item.data.title,
        logo: item.data.toolIcon?.url,
        meta: category ?? "MLOps",
        blurb:
          item.data.seoDescription ??
          item.data.heroText ??
          "ZenML comparison page.",
        sub: category ? { text: category, kind: "category" } : undefined,
      };
    });
  return [...mdx, ...legacy];
}
