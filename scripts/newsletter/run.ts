import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import OpenAI from "openai";
import { type BrevoApi, createBrevoApi, PREVIEW_RECIPIENTS } from "./brevo";
import { type Entry, loadEntries } from "./entries";
import { campaignForSlot, nextIssueNumber, sentSlugs } from "./history";
import { ARCHIVE_WORTH_FLOOR, type BlurbVerdict, fallbackBlurb, type JevLike, judgeBlurb, judgeWorth, type WorthVerdict } from "./quality";
import { entryUrl, type IssueItem, PREHEADER, renderEmail } from "./render";
import { type ReportItem, type RunOutcome, renderReport } from "./report";
import { formatIssueDate, isArchiveSlot, nextSendSlot } from "./schedule";
import { archiveOrder, buildArchivePool, buildPool, clashes, type DatedEntry, pickIssue } from "./select";
import { blurbText, createOpenAIWriter, lowerCaseHookUnlessAcronym, usableHook, type Writer, type Written, WriterOutputError, writtenProblems } from "./write";

export type Mode = "schedule" | "test-only" | "dry-run";
export interface RunDeps {
  now: Date;
  mode: Mode;
  entries: Entry[];
  brevo: BrevoApi;
  writer: Writer;
  jev: JevLike;
  isLive(url: string): Promise<boolean>;
  log(msg: string): void;
}

const ISSUE_SIZE = 4;
// Prefer recent entries; widen step by step before skipping an issue.
const WINDOWS = [30, 60, 90];
// Archive candidates judged per archive issue, at most. Caps the Jev calls when many candidates fall short.
const ARCHIVE_MAX_JUDGED = 24;
const JEV_CONCURRENCY = 8;
const WRITE_ATTEMPTS = 2;

async function mapLimit<T, R>(items: readonly T[], limit: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += limit) out.push(...(await Promise.all(items.slice(i, i + limit).map(fn))));
  return out;
}

async function pickLive(pool: DatedEntry[], isLive: RunDeps["isLive"]): Promise<DatedEntry[]> {
  let candidates = pool;
  for (;;) {
    const picks = pickIssue(candidates, ISSUE_SIZE);
    const checked = await Promise.all(picks.map(async (e) => ((await isLive(entryUrl(e.slug))) ? null : e.slug)));
    const dead = new Set(checked.filter((s): s is string => s !== null));
    if (dead.size === 0) return picks;
    candidates = candidates.filter((e) => !dead.has(e.slug));
  }
}

interface WrittenItem { blurb: string; hook: string | null; verdict: BlurbVerdict | null; fallback: boolean }

async function writeItem(d: RunDeps, e: Entry, withHook: boolean): Promise<WrittenItem> {
  let feedback: string | undefined;
  for (let attempt = 1; attempt <= WRITE_ATTEMPTS; attempt++) {
    let w: Written | null = null;
    try {
      w = await d.writer.write(e, { withHook, feedback });
    } catch (err) {
      // Only a bad answer earns a retry and the fallback. An OpenAI outage (bad key, 5xx, 429, network) rejects the run
      // before Brevo, so a broken key can't quietly produce all-fallback issues.
      if (!(err instanceof WriterOutputError)) throw err;
      feedback = `the writer failed: ${err.message}`;
    }
    if (w) {
      const problems = writtenProblems(e, w);
      // A Jev outage must reject here (not be swallowed) so the run fails before touching Brevo.
      const verdict = problems.length === 0 ? await judgeBlurb(d.jev, e, w) : null;
      if (verdict?.pass) {
        const hook = w.hook?.trim();
        return { blurb: blurbText(w), hook: hook ? hook : null, verdict, fallback: false };
      }
      feedback = [...problems, ...(verdict?.reasons ?? [])].join("; ");
    }
    d.log(`${e.slug}: attempt ${attempt} rejected (${feedback})`);
  }
  return { blurb: fallbackBlurb(e), hook: null, verdict: null, fallback: true };
}

interface ArchivePick { entry: Entry; verdict: WorthVerdict; note: string }

/**
 * Walk this slot's seeded archive order, skipping entries that share a company or industry with the recent picks.
 * Judge the rest in batches and take the first, in order, that clears ARCHIVE_WORTH_FLOOR and whose page is live.
 */
async function pickArchive(d: RunDeps, sendAt: Date, exclude: ReadonlySet<string>, recent: readonly Entry[]): Promise<ArchivePick | null> {
  const seed = sendAt.toISOString().slice(0, 10);
  const pool = buildArchivePool(d.entries, { now: d.now, recentWindowDays: WINDOWS.at(-1) as number, exclude });
  const ordered = archiveOrder(pool, seed).filter((e) => !clashes(e, recent)).slice(0, ARCHIVE_MAX_JUDGED);
  for (let i = 0; i < ordered.length; i += JEV_CONCURRENCY) {
    const batch = ordered.slice(i, i + JEV_CONCURRENCY);
    const verdicts = await Promise.all(batch.map((e) => judgeWorth(d.jev, e)));
    for (const [j, e] of batch.entries()) {
      if (verdicts[j].worth < ARCHIVE_WORTH_FLOOR || !(await d.isLive(entryUrl(e.slug)))) continue;
      const rank = i + j + 1;
      return { entry: e, verdict: verdicts[j], note: `From the archive: ${e.slug}, candidate ${rank} in the seeded order for ${seed} (${rank - 1} earlier candidates were below the archive floor of ${ARCHIVE_WORTH_FLOOR} or not live).` };
    }
  }
  return null;
}

async function sendReport(brevo: BrevoApi, outcome: RunOutcome) {
  const r = renderReport(outcome);
  if (r) await brevo.sendReport(r.subject, r.html, PREVIEW_RECIPIENTS);
}

export async function runNewsletter(d: RunDeps): Promise<{ outcome: RunOutcome; html: string | null }> {
  const sendAt = nextSendSlot(d.now);
  const campaigns = await d.brevo.listCampaigns();
  const existing = campaignForSlot(campaigns, sendAt);
  if (existing && d.mode !== "dry-run") return { outcome: { kind: "already-scheduled", campaignId: existing.id }, html: null };

  const exclude = sentSlugs(campaigns);
  const verdicts = new Map<string, WorthVerdict>();
  let recent: DatedEntry[] = [];
  for (const windowDays of WINDOWS) {
    const pool = buildPool(d.entries, { now: d.now, windowDays, exclude });
    const fresh = pool.filter((e) => !verdicts.has(e.slug));
    for (const v of await mapLimit(fresh, JEV_CONCURRENCY, (e) => judgeWorth(d.jev, e))) verdicts.set(v.slug, v);
    recent = await pickLive(pool.filter((e) => verdicts.get(e.slug)?.keep), d.isLive);
    if (recent.length === ISSUE_SIZE) break;
  }
  const removed = [...verdicts.values()].filter((v) => !v.keep);
  // On the archive day the last slot goes to an archive entry; with no archive pick the issue stays all-recent.
  // pickIssue's first n picks equal pickIssue(pool, n), so dropping the fourth recent pick keeps the newest three.
  const archiveDay = isArchiveSlot(sendAt);
  const archive = archiveDay && recent.length >= ISSUE_SIZE - 1
    ? await pickArchive(d, sendAt, exclude, recent.slice(0, ISSUE_SIZE - 1)) : null;
  const notes = archive ? [archive.note] : archiveDay ? ["No archive entry qualified for this issue, so it carries four recent entries."] : [];
  if (archive) verdicts.set(archive.entry.slug, archive.verdict);
  const picks: Entry[] = archive ? [...recent.slice(0, ISSUE_SIZE - 1), archive.entry] : recent;
  if (picks.length < ISSUE_SIZE) {
    const outcome: RunOutcome = { kind: "skipped", reason: `only ${picks.length} eligible entries in the last ${WINDOWS.at(-1)} days`, removed };
    if (d.mode !== "dry-run") await sendReport(d.brevo, outcome);
    return { outcome, html: null };
  }

  const written = await Promise.all(picks.map((e, i) => writeItem(d, e, i === 0)));
  const number = nextIssueNumber(campaigns);
  const lead = picks[0];
  const hook = usableHook(written[0].hook, lead);
  const subject = hook ? `In Production #${number}: ${lead.company ?? lead.title}'s ${lowerCaseHookUnlessAcronym(hook)}` : `In Production #${number}: ${lead.title}`;
  const items: IssueItem[] = picks.map((e, i) => ({
    slug: e.slug, title: e.title, company: e.company, industry: e.industry,
    origin: e === archive?.entry ? { kind: "archive", year: e.year } : { kind: "recent", addedOn: e.publishedAt as Date },
    blurb: written[i].blurb, sourceUrl: e.link, fallback: written[i].fallback,
  }));
  const html = renderEmail({ number, sendAt, subject, items });
  const reportItems: ReportItem[] = picks.map((e, i) => ({
    slug: e.slug, title: e.title, worth: verdicts.get(e.slug) as WorthVerdict, blurb: written[i].verdict, fallback: written[i].fallback,
    archive: e === archive?.entry,
  }));

  let campaignId: number | null = null;
  if (d.mode !== "dry-run") {
    campaignId = await d.brevo.createCampaign({
      name: `In Production #${number} — ${formatIssueDate(sendAt)}`, subject, previewText: PREHEADER, htmlContent: html,
    });
    // The campaign stays a draft until the preview has gone out. If sendTest fails, nothing is queued, the draft is not
    // counted, and a re-run tries again.
    await d.brevo.sendTest(campaignId, PREVIEW_RECIPIENTS);
    if (d.mode === "schedule") await d.brevo.scheduleCampaign(campaignId, sendAt);
  }
  const outcome: RunOutcome = { kind: d.mode === "schedule" ? "scheduled" : d.mode, issueNumber: number, sendAt, campaignId, items: reportItems, removed, notes };
  if (d.mode !== "dry-run") await sendReport(d.brevo, outcome);
  return { outcome, html };
}

const DRY_BREVO: BrevoApi = { listCampaigns: async () => [], createCampaign: async () => 0, sendTest: async () => {}, scheduleCampaign: async () => {}, sendReport: async () => {} };

/** The Brevo list id comes from the NEWSLETTER_LIST_ID repository variable, so no list id lives in source. */
export function parseListId(env: Record<string, string | undefined>): number {
  const raw = env.NEWSLETTER_LIST_ID?.trim() ?? "";
  const id = /^\d+$/.test(raw) ? Number(raw) : 0;
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error("NEWSLETTER_LIST_ID must be set to the Brevo list id");
  return id;
}

async function main() {
  const mode = (process.argv.find((a) => a.startsWith("--mode="))?.split("=")[1] ?? "dry-run") as Mode;
  if (!["schedule", "test-only", "dry-run"].includes(mode)) throw new Error(`unknown mode ${mode}`);
  const brevoKey = process.env.BREVO_API_KEY;
  if (mode !== "dry-run" && !brevoKey) throw new Error("BREVO_API_KEY is required");
  // Dry-run only lists campaigns when a key exists; every write method is a no-op in dry-run mode.
  const listId = mode === "dry-run" ? 0 : parseListId(process.env);
  const brevo = brevoKey ? createBrevoApi(brevoKey, listId) : DRY_BREVO;
  const { outcome, html } = await runNewsletter({
    now: new Date(), mode, entries: loadEntries(), brevo,
    writer: createOpenAIWriter(new OpenAI()), jev: new TypeSafeClient() as unknown as JevLike,
    isLive: async (url) => (await fetch(url, { method: "HEAD", redirect: "manual" })).status === 200,
    log: (m) => console.log(m),
  });
  console.log(JSON.stringify(outcome, null, 2));
  if (html) {
    const file = join(tmpdir(), `in-production-${Date.now()}.html`);
    writeFileSync(file, html);
    console.log(`Rendered issue: ${file}`);
  }
}

if (process.argv[1]?.endsWith("newsletter/run.ts")) main().catch((e) => { console.error(e); process.exit(1); });
