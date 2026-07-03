import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "../../src/pages/api/forms/[formType]";

type FormContext = Parameters<typeof POST>[0];
type RuntimeEnv = Record<string, string | undefined>;
type FetchCall = Parameters<typeof fetch>;

function fetchRequestInit(
  call: FetchCall | undefined,
): RequestInit | undefined {
  return call?.[1];
}

function formRequest(fields: Record<string, string>): Request {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) formData.set(key, value);
  return new Request("https://www.zenml.io/api/forms/demo-request", {
    method: "POST",
    body: formData,
    headers: {
      referer: "https://www.zenml.io/book-your-demo",
      "user-agent": "vitest",
    },
  });
}

function makeContext(options: {
  formType: string;
  request?: Request | { formData: () => Promise<FormData> };
  env?: RuntimeEnv;
  waitUntil?: (promise: Promise<unknown>) => void;
}): FormContext {
  return {
    params: { formType: options.formType },
    request: options.request ?? formRequest({}),
    locals: {
      runtime: {
        env: options.env ?? {},
        ctx: {
          waitUntil: options.waitUntil ?? vi.fn(),
        },
      },
    },
  } as unknown as FormContext;
}

async function responseJson(
  response: Response,
): Promise<Record<string, unknown>> {
  return (await response.json()) as Record<string, unknown>;
}

describe("form API route", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("returns 405 for GET requests", async () => {
    const response = GET();

    expect(response.status).toBe(405);
    await expect(responseJson(response)).resolves.toEqual({
      error: "Method not allowed",
    });
  });

  it("returns 400 for unknown form types", async () => {
    const response = await POST(makeContext({ formType: "unknown" }));

    expect(response.status).toBe(400);
    await expect(responseJson(response)).resolves.toMatchObject({
      success: false,
      error: "Unknown form type",
    });
  });

  it("returns 400 when form data parsing fails", async () => {
    const response = await POST(
      makeContext({
        formType: "demo-request",
        request: { formData: () => Promise.reject(new Error("bad body")) },
      }),
    );

    expect(response.status).toBe(400);
    await expect(responseJson(response)).resolves.toMatchObject({
      success: false,
      error: "Invalid form data",
    });
  });

  it("returns 422 with shared validation errors", async () => {
    const response = await POST(
      makeContext({
        formType: "demo-request",
        request: formRequest({ email: "not-an-email" }),
      }),
    );

    expect(response.status).toBe(422);
    await expect(responseJson(response)).resolves.toEqual({
      success: false,
      errors: {
        fullName: "Full name is required",
        email: "Valid work email is required",
      },
    });
  });

  it("requires a Turnstile token when a secret key is configured", async () => {
    const response = await POST(
      makeContext({
        formType: "demo-request",
        request: formRequest({
          fullName: "Ada Lovelace",
          email: "ada@example.com",
          privacy: "on",
        }),
        env: { TURNSTILE_SECRET_KEY: "secret" },
      }),
    );

    expect(response.status).toBe(403);
    await expect(responseJson(response)).resolves.toMatchObject({
      success: false,
      error: "Bot verification is required",
    });
  });

  it("rejects failed Turnstile verification", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>(async () => Response.json({ success: false })),
    );

    const response = await POST(
      makeContext({
        formType: "demo-request",
        request: formRequest({
          fullName: "Ada Lovelace",
          email: "ada@example.com",
          privacy: "on",
          "cf-turnstile-response": "token",
        }),
        env: { TURNSTILE_SECRET_KEY: "secret" },
      }),
    );

    expect(response.status).toBe(403);
    await expect(responseJson(response)).resolves.toMatchObject({
      success: false,
      error: "Bot verification failed. Please try again.",
    });
  });

  it("returns success after Turnstile verification passes", async () => {
    const waitUntil = vi.fn();
    const fetchMock = vi.fn<typeof fetch>(async () =>
      Response.json({ success: true }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      makeContext({
        formType: "demo-request",
        request: formRequest({
          fullName: "Ada Lovelace",
          email: "ada@example.com",
          privacy: "on",
          "cf-turnstile-response": "token",
        }),
        env: { TURNSTILE_SECRET_KEY: "secret" },
        waitUntil,
      }),
    );

    expect(response.status).toBe(200);
    await expect(responseJson(response)).resolves.toEqual({
      success: true,
      formType: "demo-request",
    });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: expect.any(URLSearchParams),
      }),
    );

    const verifyBody = fetchRequestInit(fetchMock.mock.calls[0])?.body;
    expect(verifyBody).toBeInstanceOf(URLSearchParams);
    expect((verifyBody as URLSearchParams).get("secret")).toBe("secret");
    expect((verifyBody as URLSearchParams).get("response")).toBe("token");
    expect(waitUntil).not.toHaveBeenCalled();
  });

  it("returns 422 when privacy consent is missing", async () => {
    const response = await POST(
      makeContext({
        formType: "demo-request",
        request: formRequest({
          fullName: "Ada Lovelace",
          email: "ada@example.com",
        }),
      }),
    );

    expect(response.status).toBe(422);
    await expect(responseJson(response)).resolves.toEqual({
      success: false,
      errors: { privacy: "You must agree to the privacy policy" },
    });
  });

  it("returns success without scheduling Segment calls when no Segment key exists", async () => {
    const waitUntil = vi.fn();
    const response = await POST(
      makeContext({
        formType: "demo-request",
        request: formRequest({
          fullName: "Ada Lovelace",
          email: "ada@example.com",
          privacy: "on",
        }),
        waitUntil,
      }),
    );

    expect(response.status).toBe(200);
    await expect(responseJson(response)).resolves.toEqual({
      success: true,
      formType: "demo-request",
    });
    expect(waitUntil).not.toHaveBeenCalled();
  });

  it("schedules Segment identify and track calls with safe track properties", async () => {
    const waitUntilPromises: Promise<unknown>[] = [];
    const waitUntil = vi.fn((promise: Promise<unknown>) => {
      waitUntilPromises.push(promise);
    });
    const fetchMock = vi.fn<typeof fetch>(
      async () => new Response("{}", { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      makeContext({
        formType: "demo-request",
        request: formRequest({
          fullName: "Ada Lovelace",
          email: "ada@example.com",
          company: "Analytical Engines Ltd",
          privacy: "on",
          "cf-turnstile-response": "token",
        }),
        env: { SEGMENT_FORMS_WRITE_KEY: "segment-key" },
        waitUntil,
      }),
    );

    expect(response.status).toBe(200);
    await expect(responseJson(response)).resolves.toEqual({
      success: true,
      formType: "demo-request",
    });
    expect(waitUntil).toHaveBeenCalledTimes(1);
    await Promise.all(waitUntilPromises);

    expect(fetchMock).toHaveBeenCalledTimes(2);

    const identifyCall = fetchMock.mock.calls.find(
      ([url]) => url === "https://api.segment.io/v1/identify",
    );
    const trackCall = fetchMock.mock.calls.find(
      ([url]) => url === "https://api.segment.io/v1/track",
    );

    expect(identifyCall).toBeDefined();
    expect(trackCall).toBeDefined();

    const identifyBody = JSON.parse(
      String(fetchRequestInit(identifyCall)?.body),
    ) as Record<string, unknown>;
    const trackBody = JSON.parse(String(fetchRequestInit(trackCall)?.body)) as {
      properties: Record<string, unknown>;
    };

    expect(identifyBody).toMatchObject({
      userId: "ada@example.com",
      traits: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        company: "Analytical Engines Ltd",
      },
    });
    expect(trackBody.properties).toMatchObject({
      formType: "demo-request",
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines Ltd",
    });
    expect(trackBody.properties).not.toHaveProperty("privacy");
    expect(trackBody.properties).not.toHaveProperty("cf-turnstile-response");
  });
});
