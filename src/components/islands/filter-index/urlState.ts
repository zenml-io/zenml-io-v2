/**
 * URL state sync, generic over which facets/controls a given FilterIndex
 * instance actually has. The LLMOps and MLOps database pages both resolve
 * to the exact param names/defaults the two legacy islands used (`q`,
 * `tags`, `industry`, `page`, `tagMode`, `sort`) — existing shared/bookmarked
 * filter URLs on those two routes keep working identically.
 *
 * `extras` carries any number of ADDITIONAL single-select facets, each with
 * its own param name (the MLOps database's "Content type" → `?type=`). An
 * instance that declares none writes and parses exactly the params it did
 * before the key existed.
 */
import type { TagMode } from "./types";

export interface FilterUrlKeys {
  /** Search query param. Omit (undefined) if this instance has no search box. */
  search?: string;
  /** Single-select facet param. Omit if this instance has no single facet. */
  single?: string;
  /** Multi-select facet param (comma-joined slugs). Omit if no multi facet. */
  multi?: string;
  /** AND/OR toggle param. Only meaningful alongside `multi`. */
  tagMode?: string;
  /** Page param. Omit if this instance has no pagination. */
  page?: string;
  /** Sort param. Omit if this instance has no sort control. */
  sort?: string;
  /**
   * Extra single-select facet params, in facet order (the MLOps database's
   * "Content type" → `["type"]`). Omit when the instance has no extra
   * facets — every other consumer resolves to exactly the params it had.
   */
  extras?: string[];
}

export interface FilterUrlState {
  q: string;
  single: string;
  multi: string[];
  page: number;
  tagMode: TagMode;
  sort: string;
  /**
   * One entry per param in `keys.extras` ("" when unset). Absent entirely
   * when the instance declares no extra facets, so a consumer without them
   * round-trips through parse/write unchanged.
   */
  extras?: Record<string, string>;
}

const EMPTY_STATE: FilterUrlState = {
  q: "",
  single: "",
  multi: [],
  page: 1,
  tagMode: "and",
  sort: "",
};

/** `{ type: "" }` for every declared extra param; `undefined` when none. */
function emptyExtras(keys: FilterUrlKeys): Record<string, string> | undefined {
  if (!keys.extras?.length) return undefined;
  return Object.fromEntries(keys.extras.map((key) => [key, ""]));
}

export function parseFilterStateFromUrl(
  keys: FilterUrlKeys,
  sortValues: string[],
  defaultSort: string,
): FilterUrlState {
  if (typeof window === "undefined")
    return { ...EMPTY_STATE, sort: defaultSort, extras: emptyExtras(keys) };

  const params = new URLSearchParams(window.location.search);

  return {
    q: keys.search ? params.get(keys.search) || "" : "",
    single: keys.single ? params.get(keys.single) || "" : "",
    multi: keys.multi
      ? params.get(keys.multi)?.split(",").filter(Boolean) || []
      : [],
    page: keys.page
      ? Math.max(1, parseInt(params.get(keys.page) || "1", 10) || 1)
      : 1,
    tagMode: (keys.tagMode && params.get(keys.tagMode) === "or"
      ? "or"
      : "and") as TagMode,
    sort:
      keys.sort && sortValues.includes(params.get(keys.sort) || "")
        ? (params.get(keys.sort) as string)
        : defaultSort,
    extras: keys.extras?.length
      ? Object.fromEntries(
          keys.extras.map((key) => [key, params.get(key) || ""]),
        )
      : undefined,
  };
}

export function writeFilterStateToUrl(
  keys: FilterUrlKeys,
  defaultSort: string,
  state: FilterUrlState,
): void {
  if (typeof window === "undefined") return;

  // Start from the current URL and touch only the filter-owned params —
  // anything else (?utm_source=..., ?ref=...) and the #hash must survive
  // the mount-time sync on marketing routes like /blog and /integrations.
  const params = new URLSearchParams(window.location.search);
  for (const [name, key] of Object.entries(keys)) {
    if (name === "extras") continue;
    if (typeof key === "string" && key) params.delete(key);
  }
  for (const key of keys.extras ?? []) params.delete(key);
  if (keys.search && state.q) params.set(keys.search, state.q);
  if (keys.multi && state.multi.length)
    params.set(keys.multi, state.multi.join(","));
  if (keys.single && state.single) params.set(keys.single, state.single);
  if (keys.page && state.page > 1) params.set(keys.page, String(state.page));
  if (keys.tagMode && state.tagMode !== "and")
    params.set(keys.tagMode, state.tagMode);
  if (keys.sort && state.sort !== defaultSort)
    params.set(keys.sort, state.sort);
  for (const key of keys.extras ?? []) {
    const value = state.extras?.[key];
    if (value) params.set(key, value);
  }

  const search = params.toString();
  const url =
    window.location.pathname +
    (search ? `?${search}` : "") +
    window.location.hash;
  window.history.replaceState(null, "", url);
}
