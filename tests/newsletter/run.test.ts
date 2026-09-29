import { describe, expect, it } from "vitest";
import type { BrevoApi, NewCampaign } from "../../scripts/newsletter/brevo";
import type { Entry } from "../../scripts/newsletter/entries";
import type { CampaignSummary } from "../../scripts/newsletter/history";
import type { JevLike } from "../../scripts/newsletter/quality";
import { type RunDeps, runNewsletter } from "../../scripts/newsletter/run";
import { type Writer, WriterOutputError } from "../../scripts/newsletter/write";

const now = new Date("2026-10-05T16:00:00Z"); // Monday → Tue 6 Oct 07:00Z
const entry = (slug: string, day: number, industry: string): Entry => ({
  slug,
  title: `T ${slug}`,
  company: slug,
  industry,
  summary: `${slug} summary sentence with enough words to pass. More.`,
  link: null,
  publishedAt: new Date(Date.UTC(2026, 9, day)),
  sections: [
    { heading: "Overview", text: "o" },
    { heading: "Results", text: "r" },
  ],
});
const entries = ["a", "b", "c", "d", "e"].map((s, i) =>
  entry(s, 4 - i, `ind-${s}`),
);

function fakes(
  campaigns: CampaignSummary[] = [],
  opts: {
    thin?: string[];
    unsupported?: string[];
    throwFor?: string;
    writerDown?: boolean;
    sendTestFails?: boolean;
    jevDownAfterWorth?: boolean;
  } = {},
) {
  const created: NewCampaign[] = [];
  const tests: number[] = [];
  const reports: string[] = [];
  const scheduled: { id: number; at: Date }[] = [];
  const brevo: BrevoApi = {
    listCampaigns: async () => campaigns,
    createCampaign: async (c) => {
      created.push(c);
      return 100 + created.length;
    },
    sendTest: async (id) => {
      if (opts.sendTestFails) throw new Error("sendTest failed");
      tests.push(id);
    },
    scheduleCampaign: async (id, at) => {
      scheduled.push({ id, at });
    },
    sendReport: async (subject) => {
      reports.push(subject);
    },
  };
  const writer: Writer = {
    write: async (e) => {
      if (opts.writerDown) throw new Error("401 invalid api key");
      if (e.slug === opts.throwFor) throw new WriterOutputError("bad JSON");
      return {
        hook: "a hook",
        sentences: [
          { text: `${e.slug} built it.`, section: "Overview" },
          { text: "It worked.", section: "Results" },
        ],
      };
    },
  };
  const jev: JevLike = {
    async systemOne(req) {
      const st = req.state as Record<string, string>;
      if ("summary" in st) {
        const thin = opts.thin?.some((s) => st.summary.startsWith(s));
        return {
          answers: {
            production: { score: thin ? 0 : 3 },
            specificity: { score: thin ? 0 : 3 },
            vendorPitch: { noul: 0 },
          },
        };
      }
      if (opts.jevDownAfterWorth && ("sentence" in st || "blurb" in st))
        throw new Error("jev down");
      if ("sentence" in st) {
        const bad = opts.unsupported?.some((s) => st.sentence.startsWith(s));
        return {
          answers: {
            relation: {
              choice: bad ? "says_nothing" : "supports",
              confidence: 0.95,
            },
          },
        };
      }
      return { answers: { tone: { score: 0 } } };
    },
  };
  const deps = (mode: RunDeps["mode"] = "schedule", es = entries): RunDeps => ({
    now,
    mode,
    entries: es,
    brevo,
    writer,
    jev,
    isLive: async () => true,
    log: () => {},
  });
  return { deps, created, tests, reports, scheduled };
}

describe("runNewsletter", () => {
  it("schedules issue #1 for the next slot, sends a test and a report", async () => {
    const f = fakes();
    const { outcome } = await runNewsletter(f.deps());
    expect(outcome.kind).toBe("scheduled");
    expect(f.created[0]).not.toHaveProperty("scheduledAt");
    expect(f.scheduled).toEqual([
      { id: 101, at: new Date("2026-10-06T07:00:00.000Z") },
    ]);
    expect(f.created[0].name).toBe("In Production #1 — Tue 6 Oct 2026");
    expect(f.created[0].subject).toBe("In Production #1: a's a hook");
    expect(f.tests).toEqual([101]);
    expect(f.reports).toHaveLength(1);
  });
  it("does nothing when an issue is already scheduled for the slot (double run)", async () => {
    const f = fakes([
      {
        id: 7,
        name: "In Production #1 — x",
        status: "queued",
        scheduledAt: "2026-10-06T07:00:00Z",
        htmlContent: "",
      },
    ]);
    expect((await runNewsletter(f.deps())).outcome.kind).toBe(
      "already-scheduled",
    );
    expect(f.created).toHaveLength(0);
    expect(f.reports).toHaveLength(0);
  });
  it("test-only leaves a draft; dry-run touches no Brevo writes", async () => {
    const t = fakes();
    await runNewsletter(t.deps("test-only"));
    expect(t.created).toHaveLength(1);
    expect(t.tests).toEqual([101]);
    expect(t.scheduled).toHaveLength(0);
    const d = fakes();
    const { html } = await runNewsletter(d.deps("dry-run"));
    expect(d.created).toHaveLength(0);
    expect(d.tests).toHaveLength(0);
    expect(d.reports).toHaveLength(0);
    expect(d.scheduled).toHaveLength(0);
    expect(html).toContain("In Production");
  });
  it("drops thin entries and skips the issue when fewer than 4 remain", async () => {
    const f = fakes([], { thin: ["b", "c"] });
    const { outcome } = await runNewsletter(f.deps());
    expect(outcome).toMatchObject({ kind: "skipped" });
    expect(f.reports).toEqual(["In Production: issue skipped"]);
  });
  it("rewrites once, then falls back to the summary's first sentence", async () => {
    const f = fakes([], { unsupported: ["a built"] });
    const { outcome } = await runNewsletter(f.deps());
    const a =
      outcome.kind === "scheduled"
        ? outcome.items.find((i) => i.slug === "a")
        : undefined;
    expect(a?.fallback).toBe(true);
  });
  it("still schedules when the writer throws for one entry, using the fallback blurb", async () => {
    const f = fakes([], { throwFor: "a" });
    const { outcome } = await runNewsletter(f.deps());
    expect(outcome.kind).toBe("scheduled");
    const a =
      outcome.kind === "scheduled"
        ? outcome.items.find((i) => i.slug === "a")
        : undefined;
    expect(a?.fallback).toBe(true);
    expect(f.created[0].subject).toBe("In Production #1: T a");
  });
  it("never schedules when the preview send fails, so a re-run can retry", async () => {
    const f = fakes([], { sendTestFails: true });
    await expect(runNewsletter(f.deps())).rejects.toThrow("sendTest failed");
    expect(f.created).toHaveLength(1);
    expect(f.created[0]).not.toHaveProperty("scheduledAt");
    expect(f.scheduled).toHaveLength(0);
    expect(f.reports).toHaveLength(0);
  });
  it("fails before touching Brevo when the writer API is down", async () => {
    const f = fakes([], { writerDown: true });
    await expect(runNewsletter(f.deps())).rejects.toThrow("401 invalid api key");
    expect(f.created).toHaveLength(0);
    expect(f.tests).toHaveLength(0);
    expect(f.scheduled).toHaveLength(0);
    expect(f.reports).toHaveLength(0);
  });
  it("fails before touching Brevo when Jev goes down after the worth gate", async () => {
    const f = fakes([], { jevDownAfterWorth: true });
    await expect(runNewsletter(f.deps())).rejects.toThrow("jev down");
    expect(f.created).toHaveLength(0);
    expect(f.tests).toHaveLength(0);
    expect(f.reports).toHaveLength(0);
  });
  it("test-only also stops when the slot is already scheduled", async () => {
    const f = fakes([
      {
        id: 7,
        name: "In Production #1 — x",
        status: "queued",
        scheduledAt: "2026-10-06T07:00:00Z",
        htmlContent: "",
      },
    ]);
    expect((await runNewsletter(f.deps("test-only"))).outcome.kind).toBe(
      "already-scheduled",
    );
    expect(f.created).toHaveLength(0);
    expect(f.tests).toHaveLength(0);
    expect(f.reports).toHaveLength(0);
  });
});
