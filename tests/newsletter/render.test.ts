import { describe, expect, it } from "vitest";
import {
  type Issue,
  type IssueItem,
  LOGO_URL,
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
  it("never uses orange", () => {
    const html = renderEmail(issue(1)).toUpperCase();
    for (const c of ["#EB7119", "#B65916", "#995000"])
      expect(html).not.toContain(c);
  });
  it("uses the uploaded logo", () => {
    expect(LOGO_URL).toMatch(
      /\/content\/newsletter\/91369c28\/zenml-labs-lockup-cream-2x\.png$/,
    );
    expect(renderEmail(issue(1))).toContain(`<img src="${LOGO_URL}"`);
  });
  it("credits ZenML Labs and links both products in the footer", () => {
    const html = renderEmail(issue(1));
    const text = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
    expect(text).toContain(
      "In Production is made by ZenML Labs. We build ZenML for ML workflows and Kitaru for replay-based evals of AI agents.",
    );
    expect(html).toContain('href="https://www.zenml.io/product/kitaru"');
    expect(html).toContain('href="https://www.zenml.io"');
  });
  it("prints the postal address in the legal footer", () => {
    expect(renderEmail(issue(1))).toContain(
      "ZenML GmbH · Schellingstrasse 36, 80799 Munich, Germany",
    );
  });
});
