import { ASSET_BASE_URL } from "../../src/lib/constants";
import { formatAddedDate, formatIssueDate } from "./schedule";

export interface IssueItem {
  slug: string;
  title: string;
  company: string | null;
  industry: string | null;
  addedOn: Date;
  blurb: string;
  sourceUrl: string | null;
  fallback: boolean;
}
export interface Issue {
  number: number;
  sendAt: Date;
  subject: string;
  items: IssueItem[];
}

export const PREHEADER = "Four real-world LLMOps case studies, every Tuesday and Thursday.";
export const LOGO_URL = `${ASSET_BASE_URL}/content/newsletter/zenml-labs-lockup-cream@2x.png`;
export const entryUrl = (slug: string) => `https://www.zenml.io/llmops-database/${slug}`;
/** Brevo merge tags; confirmed against Brevo docs in Task 8 step 1. */
export const BREVO_UNSUBSCRIBE = "{{ unsubscribe }}";

const C = {
  night: "#151E19",
  paper: "#FAF8F4",
  card: "#FFFEFC",
  line: "#E9E4DC",
  ink: "#413D37",
  inkSoft: "#645D54",
  muted: "#6E6055",
  sage800: "#3C4C38",
  sage400: "#BECAA6",
  sage50: "#F6F9F1",
  cream50: "#F5F7F4",
} as const;
const SANS = "'Rethink Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
const DISPLAY = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "'Courier New',ui-monospace,monospace";
const css = (o: Record<string, string>) =>
  Object.entries(o)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
const S = {
  label: (color: string) =>
    css({
      "font-family": MONO,
      "font-size": "11px",
      "letter-spacing": "0.14em",
      "text-transform": "uppercase",
      color,
    }),
  eyebrow: css({
    "border-top": `1px solid ${C.line}`,
    "padding-top": "24px",
    "font-family": MONO,
    "font-size": "11px",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: C.sage800,
  }),
  title: css({
    display: "block",
    "padding-top": "8px",
    "font-family": DISPLAY,
    "font-size": "21px",
    "line-height": "27px",
    "font-weight": "500",
    "letter-spacing": "-0.02em",
    color: C.night,
  }),
  blurb: css({
    margin: "10px 0 0",
    "font-family": SANS,
    "font-size": "16px",
    "line-height": "25px",
    color: C.ink,
  }),
  links: css({ margin: "14px 0 0", "font-family": SANS, "font-size": "14px" }),
  primary: css({ color: C.sage800, "font-weight": "600" }),
  secondary: css({ color: C.muted }),
  cardCell: (padding: string) =>
    css({
      background: C.card,
      "border-left": `1px solid ${C.line}`,
      "border-right": `1px solid ${C.line}`,
      padding,
    }),
} as const;

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeSourceUrl(url: string | null): URL | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed : null;
  } catch {
    return null;
  }
}

function sourceLabel(parsed: URL): string {
  const host = parsed.hostname.replace(/^www\./, "");
  const kind = /(^|\.)(youtube\.com|youtu\.be|vimeo\.com)$/.test(host) ? "talk" : "post";
  return `Original ${kind} (${host})`;
}

function renderItem(it: IssueItem, i: number, last: boolean): string {
  const eyebrow = [it.industry, it.company, `Added ${formatAddedDate(it.addedOn)}`]
    .filter(Boolean)
    .map((s) => escapeHtml(s as string))
    .join(" · ");
  const url = entryUrl(it.slug);
  const src = safeSourceUrl(it.sourceUrl);
  const source = src
    ? `<span style="color:${C.sage400};">&nbsp;·&nbsp;</span><a href="${escapeHtml(src.href)}" style="${S.secondary}">${escapeHtml(sourceLabel(src))}</a>`
    : "";
  return `<tr><td class="pad" style="${S.cardCell(i === 0 ? "24px 36px" : last ? "0 36px 28px" : "0 36px 24px")}">
  <div style="${S.eyebrow}">${eyebrow}</div>
  <a href="${url}" style="${S.title}">${escapeHtml(it.title)}</a>
  <p style="${S.blurb}">${escapeHtml(it.blurb)}</p>
  <p style="${S.links}"><a href="${url}" style="${S.primary}">Read the breakdown →</a>${source}</p>
</td></tr>`;
}

export function renderEmail(issue: Issue): string {
  const intro =
    issue.number === 1
      ? `<tr><td class="pad" style="${S.cardCell("24px 36px 8px")};font-family:${SANS};font-size:15px;line-height:23px;color:${C.inkSoft};">You signed up for new case studies from the ZenML LLMOps Database. This is the first issue: four fresh entries, twice a week. Each links to our full write-up, with the original source one click further.</td></tr>`
      : "";
  const items = issue.items
    .map((it, i) => renderItem(it, i, i === issue.items.length - 1))
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(issue.subject)}</title>
<style>a{text-decoration:none}@media (max-width:620px){.wrap{width:100%!important}.pad{padding-left:20px!important;padding-right:20px!important}}</style>
</head><body style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;">${PREHEADER}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper};"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;">
<tr><td class="pad" style="background:${C.night};padding:28px 36px;border-radius:6px 6px 0 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td valign="middle"><img src="${LOGO_URL}" width="165" height="26" alt="ZenML Labs" style="display:block;border:0;"></td>
    <td align="right" valign="middle" style="${S.label(C.sage400)}">#${issue.number} · ${formatIssueDate(issue.sendAt)}</td>
  </tr></table>
  <div style="border-top:1px solid ${C.sage800};margin-top:22px;padding-top:18px;${S.label(C.sage400)}">From the LLMOps Database</div>
  <div style="font-family:${DISPLAY};font-size:34px;font-weight:500;letter-spacing:-0.02em;color:${C.cream50};padding-top:6px;">In Production</div>
</td></tr>
${intro}
${items}
<tr><td class="pad" style="background:${C.sage50};border:1px solid ${C.line};border-top:none;padding:22px 36px;font-family:${SANS};font-size:15px;line-height:22px;color:${C.ink};">
  Want more? The database holds 2,100+ case studies, searchable by industry and technique.
  <div style="padding-top:14px;"><a href="https://www.zenml.io/llmops-database" style="display:inline-block;background:${C.night};color:${C.cream50};font-family:${MONO};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;padding:11px 18px;border-radius:999px;">Browse the database</a></div>
</td></tr>
<tr><td style="padding:22px 36px;text-align:center;font-family:${SANS};font-size:12px;line-height:19px;color:${C.muted};">
  In Production is sent by ZenML every Tuesday and Thursday.<br>
  You're getting this because you subscribed on zenml.io. <a href="${BREVO_UNSUBSCRIBE}" style="color:${C.muted};text-decoration:underline;">Unsubscribe</a>
</td></tr>
</table></td></tr></table></body></html>`;
}
