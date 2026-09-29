import { describe, expect, it } from "vitest";
import { parseEntry, splitSections } from "../../scripts/newsletter/entries";

const industries = new Map([["legal", "Legal"]]);
const raw = (
  fm: string,
  body = "## Overview\n\nHarvey built it.\n\n## Results and tradeoffs\n\nQuality rose from 53% to 87%.\n",
) => `---\n${fm}\n---\n${body}`;
const base = `title: "Multi-Agent Review"
slug: "harvey-review"
company: "Harvey"
industryTags: "legal"
summary: "Harvey rebuilt its review system."
link: "https://www.harvey.ai/blog/x"
notion:
  publishedAt: "2026-09-28T08:25:58Z"`;

describe("splitSections", () => {
  it("splits on level-2 headings and trims text", () => {
    expect(
      splitSections(
        "intro\n## Overview\n\nA.\n\n### Detail\nB.\n## Results  \nC.",
      ),
    ).toEqual([
      { heading: "Overview", text: "A.\n\n### Detail\nB." },
      { heading: "Results", text: "C." },
    ]);
  });
  it("drops headings with no text", () => {
    expect(splitSections("## Empty\n\n## Real\nX")).toEqual([
      { heading: "Real", text: "X" },
    ]);
  });
});

describe("parseEntry", () => {
  it("parses a native entry", () => {
    const e = parseEntry("harvey-review", raw(base), industries);
    expect(e).toMatchObject({
      slug: "harvey-review",
      company: "Harvey",
      industry: "Legal",
      link: "https://www.harvey.ai/blog/x",
    });
    expect(e?.publishedAt?.toISOString()).toBe("2026-09-28T08:25:58.000Z");
    expect(e?.sections.map((s) => s.heading)).toEqual([
      "Overview",
      "Results and tradeoffs",
    ]);
  });
  it("skips drafts, unreadable publishedAt dates, and entries without sections", () => {
    expect(parseEntry("x", raw(`${base}\ndraft: true`), industries)).toBeNull();
    expect(
      parseEntry(
        "x",
        raw(base.replace("2026-09-28T08:25:58Z", "soon")),
        industries,
      ),
    ).toBeNull();
    expect(
      parseEntry("x", raw(base, "No headings at all."), industries),
    ).toBeNull();
  });
  it("keeps a migrated entry without publishedAt, with its year", () => {
    const e = parseEntry(
      "x",
      raw(`${base.replace(/notion:[\s\S]*/, "")}year: 2023`),
      industries,
    );
    expect(e).toMatchObject({ publishedAt: null, year: 2023 });
  });
  it("tolerates a missing link and unknown industry", () => {
    const e = parseEntry(
      "x",
      raw(base.replace(/link:.*\n/, "").replace('"legal"', '"space"')),
      industries,
    );
    expect(e?.link).toBeNull();
    expect(e?.industry).toBe("space");
  });
});
