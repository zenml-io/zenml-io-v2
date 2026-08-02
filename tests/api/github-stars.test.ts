import type { APIContext } from "astro";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "../../src/pages/api/github-stars";
import { env } from "../mocks/cloudflare-workers";

function makeContext(
  url = "https://www.zenml.io/api/github-stars",
): APIContext {
  return {
    url: new URL(url),
    locals: {
      cfContext: { waitUntil: vi.fn() },
    },
  } as unknown as APIContext;
}

beforeEach(() => {
  for (const key of Object.keys(env)) delete env[key];
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("GET /api/github-stars", () => {
  it("returns the safe fallback snapshot when GitHub is unavailable", async () => {
    vi.stubGlobal("caches", {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("upstream unavailable", { status: 503 })),
    );

    const response = await GET(makeContext());
    const payload = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toContain("s-maxage=600");
    expect(payload).toMatchObject({
      repo: "zenml-io/zenml",
      source: "fallback",
    });
    expect(payload.stars).toEqual(expect.any(Number));
    expect(payload.asOf).toEqual(expect.any(String));
  });

  it("uses the safe fallback without external I/O when explicitly requested", async () => {
    const fetchMock = vi.fn<typeof fetch>();
    const cacheMatch = vi.fn();
    const cachePut = vi.fn();
    vi.stubGlobal("caches", {
      default: {
        match: cacheMatch,
        put: cachePut,
      },
    });
    vi.stubGlobal("fetch", fetchMock);
    env.GITHUB_STARS_FORCE_FALLBACK = "true";

    const response = await GET(makeContext());
    const payload = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(response.headers.get("x-zenml-github-stars-mode")).toBe(
      "forced-fallback",
    );
    expect(payload).toMatchObject({
      repo: "zenml-io/zenml",
      source: "fallback",
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(cacheMatch).not.toHaveBeenCalled();
    expect(cachePut).not.toHaveBeenCalled();
  });

  it("uses the primary runtime token without exposing it in the response", async () => {
    const fetchMock = vi.fn<typeof fetch>(
      async (_input, _init) =>
        new Response(JSON.stringify({ stargazers_count: 12345 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
    );
    vi.stubGlobal("caches", {});
    vi.stubGlobal("fetch", fetchMock);

    env.GITHUB_TOKEN = "github-test-token";

    const response = await GET(makeContext());
    const responseText = await response.text();
    const requestHeaders = new Headers(fetchMock.mock.calls[0]?.[1]?.headers);

    expect(response.status).toBe(200);
    expect(JSON.parse(responseText)).toMatchObject({
      stars: 12345,
      source: "github",
    });
    expect(requestHeaders.get("authorization")).toBe(
      "Bearer github-test-token",
    );
    expect(responseText).not.toContain("github-test-token");
  });

  it("serves stale cache data while scheduling a background refresh", async () => {
    const staleSnapshot = {
      repo: "zenml-io/zenml",
      stars: 12000,
      formatted: "12,000",
      source: "github" as const,
      asOf: new Date(Date.now() - 31 * 60 * 1000).toISOString(),
    };
    const cacheMatch = vi.fn(
      async () =>
        new Response(JSON.stringify(staleSnapshot), {
          headers: { "Content-Type": "application/json" },
        }),
    );
    const cachePut = vi.fn(
      async (_request: Request, _response: Response): Promise<void> =>
        undefined,
    );
    vi.stubGlobal("caches", {
      default: {
        match: cacheMatch,
        put: cachePut,
      },
    });

    const fetchMock = vi.fn<typeof fetch>(
      async () =>
        new Response(JSON.stringify({ stargazers_count: 12345 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const waitUntilPromises: Promise<unknown>[] = [];
    const waitUntil = vi.fn((promise: Promise<unknown>) => {
      waitUntilPromises.push(promise);
    });
    const context = makeContext();
    context.locals.cfContext.waitUntil = waitUntil;

    const response = await GET(context);
    const payload = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      repo: "zenml-io/zenml",
      stars: 12000,
      formatted: "12,000",
      source: "cache",
      asOf: staleSnapshot.asOf,
    });
    expect(waitUntil).toHaveBeenCalledTimes(1);
    expect(waitUntilPromises).toHaveLength(1);
    expect(cachePut).not.toHaveBeenCalled();

    await Promise.all(waitUntilPromises);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(cachePut).toHaveBeenCalledTimes(1);
    const refreshedResponse = cachePut.mock.calls[0]?.[1];
    expect(refreshedResponse).toBeInstanceOf(Response);
    await expect(refreshedResponse?.clone().json()).resolves.toMatchObject({
      repo: "zenml-io/zenml",
      stars: 12345,
      formatted: "12,345",
      source: "github",
    });
  });
});
