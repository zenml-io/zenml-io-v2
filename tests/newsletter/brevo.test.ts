import { describe, expect, it } from "vitest";
import { createBrevoApi, LIST_ID } from "../../scripts/newsletter/brevo";

function fakeFetch(responses: unknown[]) {
  const calls: { url: string; init: RequestInit }[] = [];
  const f = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(responses.shift() ?? {}), {
      status: 201,
    });
  }) as unknown as typeof fetch;
  return { f, calls };
}

describe("createBrevoApi", () => {
  it("creates a draft campaign for the LLMOps list with the ZenML sender", async () => {
    const { f, calls } = fakeFetch([{ id: 42 }]);
    const id = await createBrevoApi("k", f).createCampaign({
      name: "In Production #1 — x",
      subject: "s",
      previewText: "p",
      htmlContent: "<p>",
    });
    expect(id).toBe(42);
    const body = JSON.parse(String(calls[0].init.body));
    expect(calls[0].url).toBe("https://api.brevo.com/v3/emailCampaigns");
    expect((calls[0].init.headers as Record<string, string>)["api-key"]).toBe(
      "k",
    );
    expect(body).toMatchObject({
      sender: { name: "ZenML", email: "hello@zenml.io" },
      replyTo: "hello@zenml.io",
      recipients: { listIds: [LIST_ID] },
    });
    expect(body).not.toHaveProperty("scheduledAt");
  });
  it("schedules an existing campaign with a PUT carrying scheduledAt", async () => {
    const { f, calls } = fakeFetch([]);
    await createBrevoApi("k", f).scheduleCampaign(42, new Date("2026-10-06T07:00:00Z"));
    expect(calls[0].url).toBe("https://api.brevo.com/v3/emailCampaigns/42");
    expect(calls[0].init.method).toBe("PUT");
    expect(JSON.parse(String(calls[0].init.body))).toEqual({
      scheduledAt: "2026-10-06T07:00:00.000Z",
    });
  });
  it("throws with the response body on a non-2xx", async () => {
    const f = (async () =>
      new Response("bad key", { status: 401 })) as unknown as typeof fetch;
    await expect(createBrevoApi("k", f).sendTest(1, ["a@b.c"])).rejects.toThrow(
      /401.*bad key/,
    );
  });
  it("pages through campaigns and keeps htmlContent from the list response", async () => {
    const full = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `c${i}`,
      status: "sent",
      htmlContent: "<p>x</p>",
    }));
    const { f, calls } = fakeFetch([
      { campaigns: full },
      {
        campaigns: [
          {
            id: 200,
            name: "last",
            status: "queued",
            scheduledAt: "2026-10-06T07:00:00Z",
            htmlContent: "<p>y</p>",
          },
        ],
      },
    ]);
    const out = await createBrevoApi("k", f).listCampaigns();
    expect(out).toHaveLength(101);
    expect(out[100]).toMatchObject({
      id: 200,
      scheduledAt: "2026-10-06T07:00:00Z",
      htmlContent: "<p>y</p>",
    });
    expect(calls[1].url).toContain("offset=100");
    expect(calls).toHaveLength(3);
  });
  it("keeps paging when the server caps pages below the limit, using count", async () => {
    const page = (from: number) => ({
      count: 120,
      campaigns: Array.from({ length: 50 }, (_, i) => ({
        id: from + i,
        name: `c${from + i}`,
        status: "sent",
        htmlContent: "h",
      })),
    });
    const { f, calls } = fakeFetch([
      page(0),
      page(50),
      { count: 120, campaigns: page(100).campaigns.slice(0, 20) },
    ]);
    const out = await createBrevoApi("k", f).listCampaigns();
    expect(out).toHaveLength(120);
    expect(calls.map((x) => x.url.match(/offset=(\d+)/)?.[1])).toEqual([
      "0",
      "50",
      "100",
    ]);
  });
});
