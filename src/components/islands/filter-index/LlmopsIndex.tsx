/**
 * LLMOps Database filter island — thin FilterIndex config on top of the
 * shared `DataFilterIndex` engine (#249, replaces the standalone
 * `LLMOpsFilter.tsx`). Astro can't pass function props across the island
 * hydration boundary, so this file exists to hold the LLMOps-specific
 * closures (card rendering, search text, sort, facet extractors) in real
 * code rather than serialized JSON — the FilterIndex shell itself takes
 * only functions, never data that has to round-trip through props.astro.
 */
import { DataFilterIndex } from "./DataFilterIndex";
import { FOCUS_RING } from "./icons";
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
  pageSize = 24,
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
      search={{
        mode: "pagefind",
        pagefindBasePath: "/llmops-database/",
        pagefindDebugLabel: "[LLMOps]",
        getSearchText: (item) =>
          [item.title, item.company, item.summary].filter(Boolean).join(" "),
        scoreRelevance,
        placeholder: "Search by title, company, or summary...",
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
      renderItem={(item, ctx) => (
        <div
          key={item.slug}
          class="group flex flex-col rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
        >
          <a
            href={`/llmops-database/${item.slug}`}
            class={`font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2 ${FOCUS_RING}`}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            {item.title}
          </a>

          <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            {item.company && (
              <span class="font-medium text-gray-700">{item.company}</span>
            )}
            {item.year && (
              <>
                {item.company && <span aria-hidden="true">&middot;</span>}
                <span>{item.year}</span>
              </>
            )}
            {item.industryTags && (
              <>
                <span aria-hidden="true">&middot;</span>
                <button
                  type="button"
                  class={`rounded-full bg-zenml-50 px-2 py-0.5 text-zenml-700 transition-colors hover:bg-zenml-100 ${FOCUS_RING}`}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    ctx.selectSingle(item.industryTags as string);
                  }}
                  aria-label={`Filter by ${industryMap.get(item.industryTags) || item.industryTags}`}
                >
                  {industryMap.get(item.industryTags) || item.industryTags}
                </button>
              </>
            )}
          </div>

          {item.summary && (
            <p class="mt-2 text-sm text-gray-600 line-clamp-2">
              {item.summary}
            </p>
          )}

          {item.llmopsTags.length > 0 && (
            <div class="mt-auto flex flex-wrap gap-1 pt-3">
              {item.llmopsTags.slice(0, 3).map((tagSlug) => {
                const isSelected = ctx.isTagSelected(tagSlug);
                return (
                  <button
                    key={tagSlug}
                    type="button"
                    data-tag-chip
                    aria-pressed={isSelected}
                    aria-label={
                      isSelected
                        ? `Remove filter ${tagMap.get(tagSlug) || tagSlug}`
                        : `Filter by ${tagMap.get(tagSlug) || tagSlug}`
                    }
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      ctx.toggleTag(tagSlug);
                    }}
                    class={`rounded-full px-2 py-0.5 text-xs transition-colors ${FOCUS_RING} ${
                      isSelected
                        ? "bg-primary-600 text-white"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {tagMap.get(tagSlug) || tagSlug}
                  </button>
                );
              })}
              {item.llmopsTags.length > 3 && (
                <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  +{item.llmopsTags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
}
