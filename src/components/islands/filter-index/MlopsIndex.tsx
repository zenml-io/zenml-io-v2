/**
 * MLOps Database filter island — thin FilterIndex config on top of the
 * shared `DataFilterIndex` engine (#249, replaces the standalone
 * `MLOpsFilter.tsx`). See `LlmopsIndex.tsx` for why this per-domain wrapper
 * exists instead of configuring FilterIndex from the `.astro` page.
 */
import { DataFilterIndex } from "./DataFilterIndex";
import { FOCUS_RING } from "./icons";
import type { FilterOption } from "./types";

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
  pageSize = 24,
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
        placeholder: "Search by title, company, platform, or summary...",
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
        label: "MLOps Topics",
        urlParam: "tags",
        options: tags,
        getValues: (item) => item.mlopsTags,
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
            href={`/mlops-database/${item.slug}`}
            class={`font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2 ${FOCUS_RING}`}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            {item.title}
          </a>

          <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span class="font-medium text-gray-700">{item.company}</span>
            {item.platformName !== item.company && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{item.platformName}</span>
              </>
            )}
            <span aria-hidden="true">&middot;</span>
            <span class="capitalize">{item.contentType}</span>
            {item.year && (
              <>
                <span aria-hidden="true">&middot;</span>
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
                    ctx.selectSingle(item.industryTags);
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

          {item.mlopsTags.length > 0 && (
            <div class="mt-auto flex flex-wrap gap-1 pt-3">
              {item.mlopsTags.slice(0, 3).map((tagSlug) => {
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
              {item.mlopsTags.length > 3 && (
                <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  +{item.mlopsTags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
}
