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
  it("logs the blocked HTTP resource without its query or fragment", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const response = await POST(
      makeContext(
        JSON.stringify({
          "csp-report": {
            "document-uri": "https://www.zenml.io/product/kitaru?private=value",
            "violated-directive": "script-src",
            "effective-directive": "script-src-elem",
            "blocked-uri":
              "https://cdn.example.com/scripts/app.js?token=secret#fragment",
          },
        }),
      ),
    );

    expect(response.status).toBe(204);
    expect(log).toHaveBeenCalledWith("[csp-report]", {
      documentUri: "https://www.zenml.io/product/kitaru",
      violatedDirective: "script-src",
      effectiveDirective: "script-src-elem",
      blockedResource: "https://cdn.example.com/scripts/app.js",
    });
    expect(JSON.stringify(log.mock.calls)).not.toContain("secret");
  });

  it.each([
    ["data:text/javascript,alert('secret')", "data:"],
    ["blob:https://www.zenml.io/private-identifier", "blob:"],
    ["data", "data:"],
    ["blob", "blob:"],
  ])("logs only the scheme for %s resources", async (blockedUri, expected) => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await POST(
      makeContext(
        JSON.stringify({
          "csp-report": {
            "blocked-uri": blockedUri,
          },
        }),
      ),
    );

    expect(log).toHaveBeenCalledWith(
      "[csp-report]",
      expect.objectContaining({ blockedResource: expected }),
    );
    expect(JSON.stringify(log.mock.calls)).not.toContain("private-identifier");
    expect(JSON.stringify(log.mock.calls)).not.toContain("alert");
  });

  it("does not log an attacker-controlled custom URL scheme", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await POST(
      makeContext(
        JSON.stringify({
          "csp-report": {
            "blocked-uri": "private-sentinel-scheme:payload",
          },
        }),
      ),
    );

    expect(log).toHaveBeenCalledWith(
      "[csp-report]",
      expect.objectContaining({ blockedResource: "(other-scheme)" }),
    );
    expect(JSON.stringify(log.mock.calls)).not.toContain("private-sentinel");
  });

  it.each([
    "eval",
    "inline",
    "wasm-eval",
    "trusted-types-policy",
    "trusted-types-sink",
    "self",
  ])("preserves the safe CSP keyword %s", async (blockedUri) => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await POST(
      makeContext(
        JSON.stringify({
          "csp-report": {
            "blocked-uri": blockedUri,
          },
        }),
      ),
    );

    expect(log).toHaveBeenCalledWith(
      "[csp-report]",
      expect.objectContaining({ blockedResource: blockedUri }),
    );
  });

  it("logs an empty blocked resource when the field is missing", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await POST(makeContext(JSON.stringify({ "csp-report": {} })));

    expect(log).toHaveBeenCalledWith(
      "[csp-report]",
      expect.objectContaining({ blockedResource: "" }),
    );
  });

  it("logs a fixed marker for an unparseable blocked resource", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await POST(
      makeContext(
        JSON.stringify({
          "csp-report": {
            "blocked-uri": "not a valid URL?token=secret",
          },
        }),
      ),
    );

    expect(log).toHaveBeenCalledWith(
      "[csp-report]",
      expect.objectContaining({ blockedResource: "(unparseable)" }),
    );
    expect(JSON.stringify(log.mock.calls)).not.toContain("secret");
  });

  it("does not string-coerce array values into logged paths", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await POST(
      makeContext(
        JSON.stringify({
          "csp-report": {
            "blocked-uri": ["https://cdn.example.com/", "private-secret-value"],
          },
        }),
      ),
    );

    expect(log).toHaveBeenCalledWith(
      "[csp-report]",
      expect.objectContaining({ blockedResource: "" }),
    );
    expect(JSON.stringify(log.mock.calls)).not.toContain(
      "private-secret-value",
    );
  });

  it("removes fragments from the logged document URI", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await POST(
      makeContext(
        JSON.stringify({
          "csp-report": {
            "document-uri":
              "https://www.zenml.io/product/kitaru#private-fragment",
          },
        }),
      ),
    );

    expect(log).toHaveBeenCalledWith(
      "[csp-report]",
      expect.objectContaining({
        documentUri: "https://www.zenml.io/product/kitaru",
      }),
    );
    expect(JSON.stringify(log.mock.calls)).not.toContain("private-fragment");
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
