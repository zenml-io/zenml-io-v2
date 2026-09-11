import type { CollectionEntry } from "astro:content";
import type { CompareSwitcherGroup } from "./labsComparison";

export function buildZenmlComparisonGroups(
  categories: CollectionEntry<"vs-pages">[],
  blocks: CollectionEntry<"compare">[],
  mdx: CollectionEntry<"compare-zenml">[],
): CompareSwitcherGroup[] {
  return [
    {
      label: "Competitors",
      options: [
        ...blocks.map((entry) => {
          const label =
            entry.data.toolName ||
            entry.data.title.replace(/^ZenML vs\.?\s*/i, "");
          return {
            href: `/compare/${entry.data.slug}`,
            label,
            mark: entry.data.toolIcon
              ? {
                  url: entry.data.toolIcon.url,
                  alt: entry.data.toolIcon.alt || label,
                }
              : undefined,
          };
        }),
        ...mdx.map((entry) => ({
          href: `/compare/${entry.id}`,
          label: entry.data.competitor,
          mark: entry.data.competitorLogo
            ? {
                url: entry.data.competitorLogo,
                alt: entry.data.competitor,
              }
            : undefined,
        })),
      ].sort((a, b) => a.label.localeCompare(b.label)),
    },
    {
      label: "Categories",
      options: categories
        .map((entry) => ({
          href: `/vs/${entry.data.slug}`,
          label: entry.data.hero.compareCategory,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  ];
}

export function buildKitaruComparisonGroups(
  entries: CollectionEntry<"compare-kitaru">[],
): CompareSwitcherGroup[] {
  return [
    {
      label: "Competitors",
      options: entries
        .map((entry) => ({
          href: `/compare/${entry.id}`,
          label: entry.data.competitor,
          mark: entry.data.competitorLogo
            ? {
                url: entry.data.competitorLogo,
                alt: entry.data.competitor,
              }
            : undefined,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  ];
}
