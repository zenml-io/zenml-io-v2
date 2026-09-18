/**
 * LLMOps Database filter island — thin FilterIndex config on top of the
 * shared `DataFilterIndex` engine (#249, replaces the standalone
 * `LLMOpsFilter.tsx`). Astro can't pass function props across the island
 * hydration boundary, so this file exists to hold the LLMOps-specific
 * closures (card rendering, search text, sort, facet extractors) in real
 * code rather than serialized JSON — the FilterIndex shell itself takes
 * only functions, never data that has to round-trip through props.astro.
 */
import {
  DATABASE_PAGE_SIZE,
  DATABASE_ROW_CHIPS_VISIBLE,
} from "../../../lib/databases";
import { EntryRow } from "../../labs/EntryRow";
import { DataFilterIndex } from "./DataFilterIndex";
import type { FilterOption } from "./types";

export interface LLMOpsIndexItem {
  slug: string;
  title: string;
  company: string | null;
  summary: string | null;
  llmopsTags: string[];
  industryTags: string | null;
  year: number | null;
  addedAt: number | null;
  link: string | null;
}

export interface LlmopsIndexProps {
  tags: FilterOption[];
  industries: FilterOption[];
  /**
   * Non-draft entries in the collection, counted at build time. The island
   * only learns the real total once `/llmops-index.json` has been fetched,
   * so the search box gets the number from the page instead of rendering a
   * placeholder that changes under the reader.
   */
  entryCount: number;
  pageSize?: number;
}

function compareNewest(a: LLMOpsIndexItem, b: LLMOpsIndexItem): number {
  // Source-material year first so a 2025 write-up always outranks a 2022
  // one, regardless of import order. Within the same year, newer additions
  // to the DB float up; title A-Z is the final tiebreaker.
  const yearDiff = (b.year ?? 0) - (a.year ?? 0);
  if (yearDiff !== 0) return yearDiff;
  const addedDiff = (b.addedAt ?? 0) - (a.addedAt ?? 0);
  if (addedDiff !== 0) return addedDiff;
  return a.title.localeCompare(b.title);
}

function scoreRelevance(item: LLMOpsIndexItem, q: string): number {
  const lower = q.toLowerCase();
  let score = 0;
  if (item.title.toLowerCase().includes(lower)) score += 10;
  if (item.company?.toLowerCase().includes(lower)) score += 5;
  return score;
}

export default function LlmopsIndex({
  tags,
  industries,
  entryCount,
  pageSize = DATABASE_PAGE_SIZE,
}: LlmopsIndexProps) {
  const tagMap = new Map(tags.map((t) => [t.slug, t.name]));
  const industryMap = new Map(industries.map((i) => [i.slug, i.name]));

  return (
    <DataFilterIndex<LLMOpsIndexItem>
      idPrefix="llmops"
      pageSize={pageSize}
      dataUrl="/llmops-index.json"
      getSlug={(item) => item.slug}
      getTitle={(item) => item.title}
      loadingLabel="Loading LLMOps database..."
      skin="labs"
      gridClassName="flex flex-col"
      search={{
        mode: "pagefind",
        pagefindBasePath: "/llmops-database/",
        pagefindDebugLabel: "[LLMOps]",
        getSearchText: (item) =>
          [item.title, item.company, item.summary].filter(Boolean).join(" "),
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
      multiFacet={{
        label: "Technologies",
        urlParam: "tags",
        options: tags,
        getValues: (item) => item.llmopsTags,
        searchPlaceholder: "Search tags...",
        searchAriaLabel: "Search technologies",
        itemNounPlural: "tags",
      }}
      renderItem={(item, ctx) => {
        const shownTags = item.llmopsTags.slice(0, DATABASE_ROW_CHIPS_VISIBLE);
        const industrySlug = item.industryTags;
        return (
          <EntryRow
            key={item.slug}
            href={`/llmops-database/${item.slug}`}
            title={item.title}
            meta={{
              company: item.company,
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
            chipOverflowCount={item.llmopsTags.length - shownTags.length}
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
