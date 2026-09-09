/**
 * HubPagination — 12/page client-side pagination for the blog term hubs
 * (`/tags/[slug]`, `/category/[slug]`, `/author/[slug]`; the three index
 * hubs currently fit in one page and mount nothing).
 *
 * The page server-renders EVERY post of the term (SEO — a crawler with JS
 * off still sees the full list) with `hidden` + `data-page="N"` on every
 * item beyond page 1 (see `TermHubEditorial`/`StackedList`'s own markers).
 * This island only toggles `hidden` on those pre-rendered nodes and reads/
 * writes `?page=N` — it never fetches or re-renders a row, so there is no
 * loading state and no hydration-mismatch risk.
 *
 * Reuses `Pagination.tsx` (`skin="labs"`) rather than a bespoke nav, so the
 * blog term hubs get the exact same pill/numeral chrome as `/blog`'s own
 * pagination for free.
 */
import { useEffect, useState } from "preact/hooks";
import { Pagination } from "./filter-index/Pagination";
import { writeFilterStateToUrl } from "./filter-index/urlState";

export interface HubPaginationProps {
  /** id of the `<ul>`/grid whose direct paginated items carry `data-page="N"`. */
  containerId: string;
  totalItems: number;
  pageSize?: number;
}

function initialPage(totalPages: number): number {
  if (typeof window === "undefined") return 1;
  const params = new URLSearchParams(window.location.search);
  const raw = Number.parseInt(params.get("page") || "1", 10);
  if (!Number.isFinite(raw)) return 1;
  return Math.min(Math.max(1, raw), totalPages);
}

export function HubPagination({
  containerId,
  totalItems,
  pageSize = 12,
}: HubPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [page, setPage] = useState(() => initialPage(totalPages));

  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;
    for (const el of root.querySelectorAll<HTMLElement>("[data-page]")) {
      el.hidden = Number(el.dataset.page) !== page;
    }
    writeFilterStateToUrl({ page: "page" }, "", {
      q: "",
      single: "",
      multi: [],
      page,
      tagMode: "and",
      sort: "",
    });
  }, [page, containerId]);

  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <>
      <div aria-live="polite" class="sr-only">
        {`Showing ${start}–${end} of ${totalItems}`}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        skin="labs"
      />
    </>
  );
}
