import type { CtaLink } from "./marketingPageTypes";
import { absoluteUrl } from "./seo";
import { normalizeText } from "./text";

export interface MarkdownPagePreamble {
  title: string;
  description: string;
  canonicalPath: string;
}

export function markdownResponse(body: string): Response {
  return new Response(`${body.trim()}\n`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

export function markdownPreamble(page: MarkdownPagePreamble): string {
  return joinMarkdownSections(
    `# ${page.title}`,
    `Canonical HTML URL: ${absoluteUrl(page.canonicalPath)}`,
    page.description,
    "Note: this is a repo-owned Markdown mirror for agents and readers. It omits visual-only UI, decorative media, navigation, analytics, and other browser chrome.",
  );
}

export function markdownLink(label: string, href: string): string {
  return `[${escapeMarkdownText(label)}](${absoluteUrl(href)})`;
}

export function markdownCtaList(ctas: readonly CtaLink[]): string {
  return ctas.map((cta) => `- ${markdownLink(cta.label, cta.href)}`).join("\n");
}

export function indentedMarkdownBulletList(items: readonly string[]): string {
  return markdownBulletList(items).replace(/^/gm, "  ");
}

export function markdownBulletList(items: readonly string[]): string {
  return items.map((item) => `- ${normalizeText(item)}`).join("\n");
}

export function markdownTable(
  headers: readonly string[],
  rows: readonly (readonly string[])[],
): string {
  const escapedHeaders = headers.map(escapeMarkdownTableCell);
  const divider = escapedHeaders.map(() => "---");
  const escapedRows = rows.map((row) => row.map(escapeMarkdownTableCell));
  return [escapedHeaders, divider, ...escapedRows]
    .map((row) => `| ${row.join(" | ")} |`)
    .join("\n");
}

export function yesNo(value: boolean | string): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return value;
}

export function joinMarkdownSections(...sections: readonly string[]): string {
  return sections
    .map((section) => section.trim())
    .filter(Boolean)
    .join("\n\n");
}

export function escapeMarkdownTableCell(value: string): string {
  return normalizeText(value).replace(/\|/g, "\\|").replace(/\n/g, "<br>");
}

export function escapeMarkdownText(value: string): string {
  return normalizeText(value).replace(/([\\[\]])/g, "\\$1");
}
