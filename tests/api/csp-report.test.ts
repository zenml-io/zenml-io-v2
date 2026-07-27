import type { APIContext } from "astro";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "../../src/pages/api/csp-report";

function makeContext(body: string): APIContext {
  return {
    request: new Request("https://www.zenml.io/api/csp-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }),
  } as unknown as APIContext;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("/api/csp-report", () => {
  it("accepts a report and strips the document query from its log", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const response = await POST(
      makeContext(
        JSON.stringify({
          "csp-report": {
            "document-uri": "https://www.zenml.io/product/kitaru?private=value",
            "violated-directive": "script-src",
            "effective-directive": "script-src-elem",
          },
        }),
      ),
    );

    expect(response.status).toBe(204);
    expect(log).toHaveBeenCalledWith("[csp-report]", {
      documentUri: "https://www.zenml.io/product/kitaru",
      violatedDirective: "script-src",
      effectiveDirective: "script-src-elem",
    });
  });

  it("accepts malformed reports without raising a Worker error", async () => {
    const response = await POST(makeContext("{not-json"));
    expect(response.status).toBe(204);
  });

  it("rejects GET with a JSON 405 response", async () => {
    const response = GET();
    expect(response.status).toBe(405);
    expect(response.headers.get("content-type")).toBe("application/json");
  });
});
