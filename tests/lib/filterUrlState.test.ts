import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  type FilterUrlKeys,
  parseFilterStateFromUrl,
  writeFilterStateToUrl,
} from "../../src/components/islands/filter-index/urlState";

const KEYS: FilterUrlKeys = {
  search: "q",
  single: "category",
  multi: "tags",
  tagMode: "tagMode",
  page: "page",
  sort: "sort",
};

let currentUrl: URL;

function stubWindow(url: string) {
  currentUrl = new URL(url);
  vi.stubGlobal("window", {
    location: {
      get search() {
        return currentUrl.search;
      },
      get pathname() {
        return currentUrl.pathname;
      },
      get hash() {
        return currentUrl.hash;
      },
    },
    history: {
      replaceState(_data: unknown, _unused: string, next: string) {
        currentUrl = new URL(next, currentUrl);
      },
    },
  });
}

describe("writeFilterStateToUrl", () => {
  beforeEach(() => {
    stubWindow("https://www.zenml.io/blog");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("preserves params it does not own, and the hash", () => {
    stubWindow(
      "https://www.zenml.io/blog?utm_source=campaign&ref=partner#catalog",
    );

    writeFilterStateToUrl(KEYS, "newest", {
      q: "pipelines",
      single: "mlops",
      multi: ["a", "b"],
      page: 3,
      tagMode: "or",
      sort: "newest",
    });

    expect(currentUrl.searchParams.get("utm_source")).toBe("campaign");
    expect(currentUrl.searchParams.get("ref")).toBe("partner");
    expect(currentUrl.hash).toBe("#catalog");
    expect(currentUrl.searchParams.get("q")).toBe("pipelines");
    expect(currentUrl.searchParams.get("category")).toBe("mlops");
    expect(currentUrl.searchParams.get("tags")).toBe("a,b");
    expect(currentUrl.searchParams.get("page")).toBe("3");
    expect(currentUrl.searchParams.get("tagMode")).toBe("or");
  });

  it("round-trips through parse with an unknown param present", () => {
    stubWindow("https://www.zenml.io/blog?utm_source=campaign");

    const written = {
      q: "agents",
      single: "llmops",
      multi: ["evals"],
      page: 2,
      tagMode: "or" as const,
      sort: "az",
    };
    writeFilterStateToUrl(KEYS, "newest", written);

    const parsed = parseFilterStateFromUrl(KEYS, ["newest", "az"], "newest");
    expect(parsed).toEqual(written);
    expect(currentUrl.searchParams.get("utm_source")).toBe("campaign");
  });

  it("removes owned params at their defaults instead of leaving stale values", () => {
    stubWindow("https://www.zenml.io/blog?q=old&page=5&ref=partner");

    writeFilterStateToUrl(KEYS, "newest", {
      q: "",
      single: "",
      multi: [],
      page: 1,
      tagMode: "and",
      sort: "newest",
    });

    expect(currentUrl.search).toBe("?ref=partner");
  });

  it("drops the query entirely when nothing remains, keeping the path and hash", () => {
    stubWindow("https://www.zenml.io/integrations?type=orchestrator#catalog");

    writeFilterStateToUrl({ search: "q", single: "type" }, "newest", {
      q: "",
      single: "",
      multi: [],
      page: 1,
      tagMode: "and",
      sort: "newest",
    });

    expect(currentUrl.pathname).toBe("/integrations");
    expect(currentUrl.search).toBe("");
    expect(currentUrl.hash).toBe("#catalog");
  });
});
