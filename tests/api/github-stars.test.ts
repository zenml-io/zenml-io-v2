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
});
