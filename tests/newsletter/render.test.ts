import { describe, expect, it } from "vitest";
import {
  type Issue,
  type IssueItem,
  PREHEADER,
  renderEmail,
} from "../../scripts/newsletter/render";

const item = (slug: string, extra: Partial<IssueItem> = {}): IssueItem => ({
  slug,
  title: `Title ${slug}`,
  company: "Harvey",
  industry: "Legal",
  addedOn: new Date("2026-09-28T08:00:00Z"),
  blurb: "Harvey did a thing. It went well.",
  sourceUrl: "https://www.harvey.ai/blog/x",
  fallback: false,
  ...extra,
});
const issue = (
  number: number,
  items = ["a", "b", "c", "d"].map((s) => item(s)),
): Issue => ({
  number,
  sendAt: new Date("2026-10-06T07:00:00Z"),
  subject: "s",
  items,
});

describe("renderEmail", () => {
  it("shows the intro on issue #1 only", () => {
    expect(renderEmail(issue(1))).toContain("You signed up");
    expect(renderEmail(issue(2))).not.toContain("You signed up");
  });
  it("links every title and CTA to our database page, and carries the preheader and date", () => {
    const html = renderEmail(issue(7));
    for (const s of ["a", "b", "c", "d"]) {
      expect(
        html.match(
          new RegExp(
            `href="https://www\\.zenml\\.io/llmops-database/${s}"`,
            "g",
          ),
        )?.length,
      ).toBe(2);
    }
    expect(html).toContain(PREHEADER);
    expect(html).toContain("#7 · Tue 6 Oct 2026");
    expect(html).toContain("Added 28 Sep");
  });
  it("escapes HTML-special characters and handles a missing source link", () => {
    const html = renderEmail(
      issue(2, [
        item("a", {
          company: "J&J MedTech / Takeda",
          title: "A <b> & B’s",
          sourceUrl: null,
        }),
      ]),
    );
    expect(html).toContain("J&amp;J MedTech / Takeda");
    expect(html).toContain("A &lt;b&gt; &amp; B’s");
    expect(html).not.toContain("Original");
  });
  it("labels video sources as talks and others as posts", () => {
    const html = renderEmail(
      issue(2, [
        item("a", { sourceUrl: "https://www.youtube.com/watch?v=1" }),
        item("b"),
      ]),
    );
    expect(html).toContain("Original talk (youtube.com)");
    expect(html).toContain("Original post (harvey.ai)");
  });
  it("drops malformed or non-http source links instead of throwing or linking them", () => {
    for (const bad of [
      "n/a",
      "",
      "harvey.ai/x",
      "javascript:alert(1)",
      "data:text/html,x",
    ]) {
      const html = renderEmail(issue(2, [item("a", { sourceUrl: bad })]));
      expect(html).not.toContain("Original");
      expect(html).not.toContain("javascript:");
    }
  });
  it("never uses the mid sage as a colour", () => {
    expect(renderEmail(issue(1)).toUpperCase()).not.toContain("#5D7545");
  });
});
