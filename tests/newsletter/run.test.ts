import { describe, expect, it } from "vitest";
import type { BrevoApi, NewCampaign } from "../../scripts/newsletter/brevo";
import type { Entry } from "../../scripts/newsletter/entries";
import type { CampaignSummary } from "../../scripts/newsletter/history";
import type { JevLike } from "../../scripts/newsletter/quality";
import {
  parseListId,
  type RunDeps,
  runNewsletter,
} from "../../scripts/newsletter/run";
import {
  usableHook,
  type Writer,
  WriterOutputError,
} from "../../scripts/newsletter/write";

const now = new Date("2026-10-05T16:00:00Z"); // Monday → Tue 6 Oct 07:00Z
const entry = (slug: string, day: number, industry: string): Entry => ({
  slug,
  title: `T ${slug}`,
  company: slug,
  industry,
  summary: `${slug} summary sentence with enough words to pass. More.`,
  link: null,
  publishedAt: new Date(Date.UTC(2026, 9, day)),
  year: null,
  sections: [
    { heading: "Overview", text: "o" },
    { heading: "Results", text: "r" },
  ],
});
const entries = ["a", "b", "c", "d", "e"].map((s, i) =>
  entry(s, 4 - i, `ind-${s}`),
);
const thursdayRun = new Date("2026-10-07T16:00:00Z"); // Wednesday → Thu 8 Oct 07:00Z, the archive issue
const archived = (slug: string, industry = `ind-${slug}`): Entry => ({
  ...entry(slug, 1, industry),
  publishedAt: null,
  year: 2023,
});
const archive = ["old1", "old2", "old3"].map((s) => archived(s));

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
        hook: "routes queries through cache",
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
    expect(f.created[0].subject).toBe(
      "In Production #1: a's routes queries through cache",
    );
    expect(f.tests).toEqual([101]);
    expect(f.reports).toHaveLength(1);
  });
  it("lowers the hook's first character unless it is an acronym in the subject", async () => {
    const f = fakes();
    const deps = f.deps();
    const base = deps.writer.write;
    deps.writer = {
      write: async (en, o) => ({
        ...(await base(en, o)),
        hook: "Code-defined agent factory",
      }),
    };
    const { outcome } = await runNewsletter(deps);
    expect(outcome.kind).toBe("scheduled");
    expect(f.created[0].subject).toBe(
      "In Production #1: a's code-defined agent factory",
    );
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
    await expect(runNewsletter(f.deps())).rejects.toThrow(
      "401 invalid api key",
    );
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

describe("widening and the archive item", () => {
  it("widens to 90 days before skipping", async () => {
    const f = fakes();
    // Three entries in the last 30 days, a fourth 80 days back (Jul 17).
    const far = { ...entry("far", 1, "ind-far"), publishedAt: new Date(Date.UTC(2026, 6, 17)) };
    const { outcome } = await runNewsletter(f.deps("dry-run", [...entries.slice(0, 3), far]));
    expect(outcome.kind).toBe("dry-run");
    expect(outcome.kind === "dry-run" && outcome.items.map((i) => i.slug)).toEqual(["a", "b", "c", "far"]);
    const tooFar = { ...far, publishedAt: new Date(Date.UTC(2026, 5, 30)) }; // 97 days back
    const skipped = await runNewsletter(fakes().deps("dry-run", [...entries.slice(0, 3), tooFar]));
    expect(skipped.outcome).toMatchObject({ kind: "skipped", reason: "only 3 eligible entries in the last 90 days" });
  });
  it("never adds an archive item on Tuesday", async () => {
    const f = fakes();
    const { outcome } = await runNewsletter(f.deps("dry-run", [...entries, ...archive]));
    expect(outcome.kind === "dry-run" && outcome.items.map((i) => i.slug)).toEqual(["a", "b", "c", "d"]);
  });
  it("on Thursday, fills the last slot from the archive and renders it as such", async () => {
    const f = fakes();
    const { outcome, html } = await runNewsletter({ ...f.deps("dry-run", [...entries, ...archive]), now: thursdayRun });
    if (outcome.kind !== "dry-run") throw new Error(outcome.kind);
    expect(outcome.items.slice(0, 3).map((i) => i.slug)).toEqual(["a", "b", "c"]);
    expect(outcome.items[3]).toMatchObject({ archive: true });
    expect(["old1", "old2", "old3"]).toContain(outcome.items[3].slug);
    expect(outcome.notes[0]).toMatch(/^From the archive: old\d, candidate 1 in the seeded order for 2026-10-08/);
    expect(html).toContain("From the archive");
    expect(html).toContain("2023");
  });
  it("picks the same archive entry on a re-run, and never one already sent", async () => {
    const run = async (campaigns: CampaignSummary[] = []) => {
      const { outcome } = await runNewsletter({ ...fakes(campaigns).deps("dry-run", [...entries, ...archive]), now: thursdayRun });
      return outcome.kind === "dry-run" ? outcome.items[3].slug : null;
    };
    const first = await run();
    expect(await run()).toBe(first);
    const sent: CampaignSummary = {
      id: 1, name: "In Production #1 — Tue 6 Oct 2026", status: "sent", scheduledAt: null,
      htmlContent: `<a href="https://www.zenml.io/llmops-database/${first}">x</a>`,
    };
    const second = await run([sent]);
    expect(second).not.toBe(first);
    expect(second).toMatch(/^old\d$/);
  });
  it("skips archive entries below the archive floor or sharing an industry with the recent picks", async () => {
    const f = fakes([], { thin: ["old1"] });
    const pool = [...entries, archived("old1"), archived("old2", "ind-a")];
    const { outcome } = await runNewsletter({ ...f.deps("dry-run", pool), now: thursdayRun });
    if (outcome.kind !== "dry-run") throw new Error(outcome.kind);
    expect(outcome.items.map((i) => i.slug)).toEqual(["a", "b", "c", "d"]);
    expect(outcome.notes).toEqual(["No archive entry qualified for this issue, so it carries four recent entries."]);
  });
  it("ships a Thursday issue from three recent entries plus the archive", async () => {
    const f = fakes();
    const { outcome } = await runNewsletter({ ...f.deps("dry-run", [...entries.slice(0, 3), ...archive]), now: thursdayRun });
    expect(outcome.kind === "dry-run" && outcome.items.length).toBe(4);
  });
});

describe("parseListId", () => {
  it("returns a positive integer", () => {
    expect(parseListId({ NEWSLETTER_LIST_ID: " 12 " })).toBe(12);
  });
  it.each([undefined, "", "0", "-3", "abc", "1.5"])("rejects %j", (v) => {
    expect(() => parseListId({ NEWSLETTER_LIST_ID: v })).toThrow(
      "NEWSLETTER_LIST_ID must be set to the Brevo list id",
    );
  });
});

describe("usableHook", () => {
  const e = { company: "OpenAI / Hertz Global / Databricks" };
  it("keeps a good hook", () => {
    expect(usableHook("  Vision model plus rules  ", e)).toBe(
      "Vision model plus rules",
    );
  });
  it.each([
    ["too long", "one two three four five six seven eight nine"],
    ["too short", "two words"],
    ["has digits", "Routing across 3 models"],
    ["names the company", "Databricks routes queries smartly"],
    ["names one word of a multi-part company", "How hertz caches results"],
    ["empty", "   "],
  ])("rejects a hook that is %s", (_n, hook) => {
    expect(usableHook(hook, e)).toBeNull();
  });
  it("does not reject common words of a company name", () => {
    expect(
      usableHook("Global retrieval with fallback", { company: "Hertz Global" }),
    ).not.toBeNull();
    expect(
      usableHook("Home grown routing layer", { company: "The Home Depot" }),
    ).not.toBeNull();
    expect(
      usableHook("America scale routing layer", { company: "Bank of America" }),
    ).not.toBeNull();
    expect(
      usableHook("Bank grade retrieval pipeline", {
        company: "Bank of America",
      }),
    ).toBeNull();
    expect(
      usableHook("The Home Depot style routing", { company: "The Home Depot" }),
    ).toBeNull();
  });
  it("falls back to the title subject in a run", async () => {
    const f = fakes();
    const deps = f.deps();
    const base = deps.writer.write;
    deps.writer = {
      write: async (en, o) => ({ ...(await base(en, o)), hook: "a 1 b c" }),
    };
    await runNewsletter(deps);
    expect(f.created[0].subject).toBe("In Production #1: T a");
  });
});
