/**
 * MLOps Database filter island — thin FilterIndex config on top of the
 * shared `DataFilterIndex` engine (#249, replaces the standalone
 * `MLOpsFilter.tsx`). See `LlmopsIndex.tsx` for why this per-domain wrapper
 * exists instead of configuring FilterIndex from the `.astro` page.
 */
import {
  DATABASE_PAGE_SIZE,
  DATABASE_ROW_CHIPS_VISIBLE,
} from "../../../lib/databases";
import { EntryRow } from "../../labs/EntryRow";
import { DataFilterIndex } from "./DataFilterIndex";
import type { FilterOption } from "./types";

/**
 * The `contentType` values the collection actually carries, in the order the
 * rail lists them. A second single-select facet (`?type=`) — the one axis
 * the MLOps database has and the LLMOps one does not.
 */
const CONTENT_TYPES: FilterOption[] = [
  { slug: "blog", name: "Blog" },
  { slug: "video", name: "Video" },
  { slug: "paper", name: "Paper" },
  { slug: "slides", name: "Slides" },
  { slug: "podcast", name: "Podcast" },
  { slug: "transcript", name: "Transcript" },
];

export interface MLOpsIndexItem {
  slug: string;
  title: string;
  company: string;
  companySlug: string;
  platformName: string;
  contentType: string;
  summary: string;
  mlopsTags: string[];
  industryTags: string;
  year: number | null;
  addedAt: number | null;
  link: string;
}

export interface MlopsIndexProps {
  tags: FilterOption[];
  industries: FilterOption[];
  /**
   * Non-draft entries in the collection, counted at build time — the search
   * box names the total before `/mlops-index.json` has been fetched. See
   * `LlmopsIndex.tsx`.
   */
  entryCount: number;
  pageSize?: number;
}

function compareNewest(a: MLOpsIndexItem, b: MLOpsIndexItem): number {
  const yearDiff = (b.year ?? 0) - (a.year ?? 0);
  if (yearDiff !== 0) return yearDiff;
  const addedDiff = (b.addedAt ?? 0) - (a.addedAt ?? 0);
  if (addedDiff !== 0) return addedDiff;
  return a.title.localeCompare(b.title);
}

function scoreRelevance(item: MLOpsIndexItem, q: string): number {
  const lower = q.toLowerCase();
  let score = 0;
  if (item.title.toLowerCase().includes(lower)) score += 10;
  if (item.company.toLowerCase().includes(lower)) score += 5;
  if (item.platformName.toLowerCase().includes(lower)) score += 5;
  if (item.contentType.toLowerCase().includes(lower)) score += 3;
  if (item.summary.toLowerCase().includes(lower)) score += 1;
  return score;
}

export default function MlopsIndex({
  tags,
  industries,
  entryCount,
  pageSize = DATABASE_PAGE_SIZE,
}: MlopsIndexProps) {
  const tagMap = new Map(tags.map((t) => [t.slug, t.name]));
  const industryMap = new Map(industries.map((i) => [i.slug, i.name]));

  return (
    <DataFilterIndex<MLOpsIndexItem>
      idPrefix="mlops"
      pageSize={pageSize}
      dataUrl="/mlops-index.json"
      getSlug={(item) => item.slug}
      getTitle={(item) => item.title}
      loadingLabel="Loading MLOps database..."
      skin="labs"
      gridClassName="flex flex-col"
      search={{
        mode: "pagefind",
        pagefindBasePath: "/mlops-database/",
        pagefindDebugLabel: "[MLOps]",
        getSearchText: (item) =>
          [
            item.title,
            item.company,
            item.platformName,
            item.contentType,
            item.summary,
          ]
            .filter(Boolean)
            .join(" "),
        scoreRelevance,
        placeholder: `Search ${entryCount.toLocaleString("en-US")} entries`,
        ariaLabel: "Search",
      }}
      sort={{ compareNewest }}
      singleFacet={{
        label: "Industry",
        urlParam: "industry",
        options: industries,
        getValue: (item) => item.industryTags,
      }}
      extraSingleFacets={[
        {
          label: "Content type",
          urlParam: "type",
          options: CONTENT_TYPES,
          getValue: (item) => item.contentType,
        },
      ]}
      multiFacet={{
        label: "MLOps topics",
        urlParam: "tags",
        options: tags,
        getValues: (item) => item.mlopsTags,
        searchPlaceholder: "Search tags...",
        searchAriaLabel: "Search MLOps topics",
        itemNounPlural: "tags",
      }}
      renderItem={(item, ctx) => {
        const shownTags = item.mlopsTags.slice(0, DATABASE_ROW_CHIPS_VISIBLE);
        const industrySlug = item.industryTags;
        return (
          <EntryRow
            key={item.slug}
            href={`/mlops-database/${item.slug}`}
            title={item.title}
            meta={{
              company: item.company,
              platformName: item.platformName,
              contentType: item.contentType,
              year: item.year,
              industry: industrySlug
                ? { label: industryMap.get(industrySlug) ?? industrySlug }
                : null,
            }}
            summary={item.summary}
            chips={shownTags.map((slug) => ({
              label: tagMap.get(slug) ?? slug,
              slug,
            }))}
            chipOverflowCount={item.mlopsTags.length - shownTags.length}
            chipPressed={ctx.isTagSelected}
            onChipToggle={ctx.toggleTag}
            onIndustrySelect={
              industrySlug ? () => ctx.selectSingle(industrySlug) : undefined
            }
          />
        );
      }}
    />
  );
}
