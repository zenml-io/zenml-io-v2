/**
 * HubEntryPagination — client-side pagination for a research-database tag
 * or industry hub whose entry count can run well past one page (#256,
 * D6/#53).
 *
 * `HubPagination` (the blog term hubs) can afford to server-render every
 * matching post and only toggle `hidden`, because a busy blog tag tops out
 * around a hundred posts. A database tag can carry well over a thousand
 * entries — shipping them all server-side is exactly what blew the pre-
 * cutover `/llmops-tags/prompt-engineering` past several megabytes of HTML
 * (issue #53). So only page 1 is server-rendered (the `containerId` `<ul>`,
 * exactly `pageSize` `<li>`s, built by `TermHubEntryIndex`'s `entries`
 * arrangement); every later page is fetched once from the same JSON index
 * the filterable databases use (`/llmops-index.json` / `/mlops-index.json`),
 * filtered and sorted client-side, and rendered into a second `<ul>` this
 * island owns. The two lists are mutually exclusive — whichever page is
 * active is shown, the SSR list hides for every page past the first.
 *
 * Sort order MUST match the server-rendered page 1: `title.localeCompare`
 * ascending, the same comparator `[slug].astro` sorts `allEntries` with. If
 * one changes, change the other — otherwise page 2 onward reads out of
 * sequence with page 1.
 */
import { useEffect, useRef, useState } from "preact/hooks";
import {
  DATABASE_ROW_CHIPS_VISIBLE,
  DATABASES,
  type DatabaseKey,
} from "../../lib/databases";
import { EntryRow, type EntryRowProps } from "../labs/EntryRow";
import { Pagination } from "./filter-index/Pagination";
import { writeFilterStateToUrl } from "./filter-index/urlState";

/** The one shape both /llmops-index.json and /mlops-index.json satisfy for the fields this island reads. */
interface IndexRecord {
  slug: string;
  title: string;
  company?: string | null;
  platformName?: string | null;
  contentType?: string | null;
  summary?: string | null;
  llmopsTags?: string[];
  mlopsTags?: string[];
  industryTags?: string | null;
  year?: number | null;
}

export interface HubEntryPaginationFilter {
  field: "llmopsTags" | "mlopsTags" | "industryTags";
  value: string;
}

export interface HubEntryPaginationProps {
  /** id of the page-1 `<ul>` this island hides for every other page. */
  containerId: string;
  totalItems: number;
  pageSize: number;
  dataUrl: "/llmops-index.json" | "/mlops-index.json";
  filter: HubEntryPaginationFilter;
  database: DatabaseKey;
  /** Tag slug → display name, for the fetched pages' chip labels. */
  tagNames: Record<string, string>;
  /** Industry slug → display name, for the fetched pages' meta line. */
  industryNames: Record<string, string>;
}

function initialPage(totalPages: number): number {
  if (typeof window === "undefined") return 1;
  const params = new URLSearchParams(window.location.search);
  const raw = Number.parseInt(params.get("page") || "1", 10);
  if (!Number.isFinite(raw)) return 1;
  return Math.min(Math.max(1, raw), totalPages);
}

function matchesFilter(
  record: IndexRecord,
  filter: HubEntryPaginationFilter,
): boolean {
  if (filter.field === "industryTags") {
    return record.industryTags === filter.value;
  }
  const tags = record[filter.field] ?? [];
  return tags.includes(filter.value);
}

function toRowProps(
  record: IndexRecord,
  database: DatabaseKey,
  filter: HubEntryPaginationFilter,
  tagNames: Record<string, string>,
  industryNames: Record<string, string>,
): EntryRowProps {
  const copy = DATABASES[database];
  const allTags =
    (database === "llmops" ? record.llmopsTags : record.mlopsTags) ?? [];
  // A tag hub's own tag is implied by the page, so the server-rendered page 1
  // shows only each entry's sibling tags — the fetched pages must match.
  const tagSlugs =
    filter.field === "industryTags"
      ? allTags
      : allTags.filter((slug) => slug !== filter.value);

  return {
    href: `${copy.entryBase}/${record.slug}`,
    title: record.title,
    meta: {
      company: record.company ?? undefined,
      platformName: record.platformName ?? undefined,
      contentType: record.contentType ?? undefined,
      year: record.year ?? undefined,
      industry: record.industryTags
        ? { label: industryNames[record.industryTags] ?? record.industryTags }
        : undefined,
    },
    summary: record.summary ?? undefined,
    chips: tagSlugs.slice(0, DATABASE_ROW_CHIPS_VISIBLE).map((slug) => ({
      label: tagNames[slug] ?? slug,
      href: `${copy.tagHubBase}/${slug}`,
    })),
    chipOverflowCount: Math.max(
      0,
      tagSlugs.length - DATABASE_ROW_CHIPS_VISIBLE,
    ),
    headingLevel: 3,
  };
}

export function HubEntryPagination({
  containerId,
  totalItems,
  pageSize,
  dataUrl,
  filter,
  database,
  tagNames,
  industryNames,
}: HubEntryPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  // Page 1 is what the server rendered (SSR has no `window`, so it can only
  // ever assume page 1 — see `initialPage`). Starting state here at the same
  // value keeps the first client render byte-for-byte identical to the SSR
  // markup; `Pagination`'s page-window (the "..." ellipsis logic) renders a
  // different number of buttons for page 1 vs. page 2+, so seeding state
  // straight from the URL would hydrate onto a DOM tree that never existed
  // server-side. The mount effect below corrects to the real `?page=` value
  // immediately after hydration, as an ordinary client-side update instead.
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [rows, setRows] = useState<IndexRecord[]>([]);
  const cacheRef = useRef<IndexRecord[] | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      const urlPage = initialPage(totalPages);
      if (urlPage !== page) {
        setPage(urlPage);
        return;
      }
    }

    writeFilterStateToUrl({ page: "page" }, "", {
      q: "",
      single: "",
      multi: [],
      page,
      tagMode: "and",
      sort: "",
    });

    const ssrList = document.getElementById(containerId);
    if (ssrList) ssrList.hidden = page !== 1;

    if (page === 1) {
      setStatus("idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    async function load() {
      try {
        let records = cacheRef.current;
        if (!records) {
          const response = await fetch(dataUrl);
          if (!response.ok) throw new Error(String(response.status));
          records = (await response.json()) as IndexRecord[];
          cacheRef.current = records;
        }
        if (cancelled) return;

        const filtered = records
          .filter((record) => matchesFilter(record, filter))
          .sort((a, b) => a.title.localeCompare(b.title));
        const start = (page - 1) * pageSize;
        setRows(filtered.slice(start, start + pageSize));
        setStatus("idle");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page, containerId, dataUrl, filter.field, filter.value, pageSize]);

  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div class="flex flex-col gap-8">
      <div aria-live="polite" class="sr-only">
        {`Showing ${start}–${end} of ${totalItems}`}
      </div>

      {page > 1 && status === "loading" && (
        <p class="text-[13px] text-(--color-cream-700)">Loading page {page}…</p>
      )}

      {page > 1 && status === "error" && (
        <p class="text-[13px] text-(--color-cream-700)">
          Couldn't load this page.{" "}
          <a
            href={`?page=${page}`}
            class="text-(--color-sage-700) hover:text-(--color-sage-800)"
          >
            Reload
          </a>
        </p>
      )}

      {page > 1 && status === "idle" && rows.length > 0 && (
        <ul id={`${containerId}-fetched`} class="flex flex-col list-none">
          {rows.map((record) => (
            <li key={record.slug}>
              <EntryRow
                {...toRowProps(
                  record,
                  database,
                  filter,
                  tagNames,
                  industryNames,
                )}
              />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        skin="labs"
      />
    </div>
  );
}
