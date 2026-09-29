import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export interface Section { heading: string; text: string }
export interface Entry {
  slug: string; title: string; company: string | null; industry: string | null;
  summary: string; link: string | null; publishedAt: Date; sections: Section[];
}

const HEADING = /^##\s+(.+?)\s*$/;

export function splitSections(body: string): Section[] {
  const sections: Section[] = [];
  for (const line of body.split("\n")) {
    const m = HEADING.exec(line);
    if (m) sections.push({ heading: m[1], text: "" });
    else if (sections.length > 0) sections[sections.length - 1].text += `${line}\n`;
  }
  return sections.map((s) => ({ ...s, text: s.text.trim() })).filter((s) => s.text.length > 0);
}

export function parseEntry(slug: string, raw: string, industryNames: ReadonlyMap<string, string>): Entry | null {
  const { data, content } = matter(raw);
  const publishedAt = data.notion?.publishedAt ? new Date(data.notion.publishedAt) : null;
  if (data.draft === true || !publishedAt || Number.isNaN(publishedAt.getTime())) return null;
  const sections = splitSections(content);
  if (sections.length === 0) return null;
  const industrySlug: string | null = data.industryTags ?? null;
  return {
    slug, title: data.title, company: data.company ?? null,
    industry: industrySlug ? (industryNames.get(industrySlug) ?? industrySlug) : null,
    summary: data.summary ?? "", link: data.link ?? null, publishedAt, sections,
  };
}

const mdFiles = (dir: string) => readdirSync(dir).filter((f) => f.endsWith(".md"));

export function loadEntries(root = process.cwd()): Entry[] {
  const industryDir = join(root, "src/content/industry-tags");
  const industryNames = new Map(
    mdFiles(industryDir).map((f) => {
      const { data } = matter(readFileSync(join(industryDir, f), "utf8"));
      return [data.slug ?? f.replace(/\.md$/, ""), data.name] as [string, string];
    }),
  );
  const dir = join(root, "src/content/llmops-database");
  return mdFiles(dir).flatMap((f) => {
    const e = parseEntry(f.replace(/\.md$/, ""), readFileSync(join(dir, f), "utf8"), industryNames);
    return e ? [e] : [];
  });
}
