import { campaignUrl } from "./brevo";
import type { BlurbVerdict, WorthVerdict } from "./quality";
import { escapeHtml } from "./render";
import { formatIssueDate } from "./schedule";

export interface ReportItem { slug: string; title: string; worth: WorthVerdict; blurb: BlurbVerdict | null; fallback: boolean }
export type RunOutcome =
  | { kind: "scheduled" | "test-only" | "dry-run"; issueNumber: number; sendAt: Date; campaignId: number | null; items: ReportItem[]; removed: WorthVerdict[] }
  | { kind: "skipped"; reason: string; removed: WorthVerdict[] }
  | { kind: "already-scheduled"; campaignId: number };

const pct = (n: number) => n.toFixed(2);
const worthLine = (w: WorthVerdict) => `production ${pct(w.production)} · specificity ${pct(w.specificity)} · vendor pitch ${pct(w.vendorPitch)} → worth ${pct(w.worth)}`;
const removedList = (removed: WorthVerdict[]) => removed.length === 0 ? "" :
  `<h3>Removed by the quality gate (${removed.length})</h3><ul>${removed.map((w) => `<li>${escapeHtml(w.slug)}: ${worthLine(w)}</li>`).join("")}</ul>`;

export function renderReport(o: RunOutcome): { subject: string; html: string } | null {
  if (o.kind === "already-scheduled") return null;
  if (o.kind === "skipped") {
    return { subject: "In Production: issue skipped", html: `<p>No issue was scheduled: ${escapeHtml(o.reason)}.</p>${removedList(o.removed)}` };
  }
  const when = `${formatIssueDate(o.sendAt)} 09:00`;
  const verb = { scheduled: "scheduled for", "test-only": "drafted (not scheduled) for", "dry-run": "dry run for" }[o.kind];
  const link = o.campaignId === null ? "" : `<p><a href="${campaignUrl(o.campaignId)}">Open in Brevo to cancel or edit</a> before ${when} Amsterdam time.</p>`;
  const items = o.items.map((it) => `<li><strong>${escapeHtml(it.title)}</strong>${it.fallback ? " — ⚠ fallback summary" : ""}<br>${worthLine(it.worth)}${
    it.blurb ? `<br>faithfulness: ${it.blurb.sentences.map((s) => `${s.relation} ${pct(s.confidence)}`).join(", ")} · tone ${pct(it.blurb.tone)}` : ""}</li>`).join("");
  return { subject: `In Production #${o.issueNumber} ${verb} ${when}`, html: `${link}<ol>${items}</ol>${removedList(o.removed)}` };
}
