/**
 * Pagefind search adapter for FilterIndex. One factory, parameterized by the
 * route's base path (e.g. "/llmops-database/") — Pagefind itself is a single
 * build-time index shared across the whole site, but each database page
 * only wants results whose URL falls under its own route.
 */

export interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: Record<string, string>;
  }>;
}

export interface PagefindSearchResponse {
  results: PagefindResult[];
}

export interface PagefindInstance {
  search: (query: string) => Promise<PagefindSearchResponse>;
  debouncedSearch: (
    query: string,
    options?: Record<string, unknown>,
    debounceMs?: number,
  ) => Promise<PagefindSearchResponse | null>;
  init: () => void;
}

export interface PagefindAdapter {
  /** Lazy-load Pagefind. Resolves null if unavailable (dev mode). */
  getPagefind: () => Promise<PagefindInstance | null>;
  /** Extract the item slug from a Pagefind result URL under this route. */
  slugFromUrl: (url: string) => string | null;
}

/**
 * `basePath` must include the leading and trailing slash, e.g.
 * "/llmops-database/". `debugLabel` only affects the console.debug fallback
 * message (e.g. "[LLMOps]").
 */
export function createPagefindAdapter(
  basePath: string,
  debugLabel: string,
): PagefindAdapter {
  let pagefindPromise: Promise<PagefindInstance | null> | null = null;

  function getPagefind(): Promise<PagefindInstance | null> {
    if (pagefindPromise) return pagefindPromise;
    // Path stored in a variable so Rollup/Vite can't statically resolve it at
    // build time. The pagefind directory only exists after `pagefind --site
    // dist` runs post-build.
    const pagefindPath = "/pagefind/pagefind.js";
    pagefindPromise = import(/* @vite-ignore */ pagefindPath)
      .then((pf) => {
        pf.init();
        return pf as PagefindInstance;
      })
      .catch(() => {
        console.debug(
          `${debugLabel} Pagefind not available — using substring search`,
        );
        return null;
      });
    return pagefindPromise;
  }

  const escaped = basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const slugPattern = new RegExp(
    `^${escaped}([^/?#]+?)(?:\\.html)?/?(?:[?#].*)?$`,
  );

  function slugFromUrl(url: string): string | null {
    const match = url.match(slugPattern);
    return match?.[1] ?? null;
  }

  return { getPagefind, slugFromUrl };
}
