import { describe, expect, it } from "vitest";
import { markdownToHtml } from "../../src/lib/projectBody";

describe("markdownToHtml", () => {
  it("returns an empty string for empty input", () => {
    expect(markdownToHtml("")).toBe("");
  });

  it("converts ### and #### headings", () => {
    expect(markdownToHtml("### What It Does")).toBe("<h3>What It Does</h3>");
    expect(markdownToHtml("#### Stack")).toBe("<h4>Stack</h4>");
  });

  it("does not convert #, ## or ##### headings", () => {
    expect(markdownToHtml("## Nope")).toBe("<p>## Nope</p>");
    expect(markdownToHtml("##### Nope")).toBe("<p>##### Nope</p>");
  });

  it("wraps a plain text block in a paragraph", () => {
    expect(markdownToHtml("Some prose.")).toBe("<p>Some prose.</p>");
  });

  it("keeps line breaks inside a single paragraph block", () => {
    expect(markdownToHtml("one\ntwo")).toBe("<p>one\ntwo</p>");
  });

  it("passes blocks that already start with < through untouched", () => {
    const html = "<ul>\n<li>Alpha</li>\n</ul>";
    expect(markdownToHtml(html)).toBe(html);
  });

  it("splits blank-line-separated blocks and drops empty ones", () => {
    expect(markdownToHtml("First.\n\n\n\nSecond.")).toBe(
      "<p>First.</p>\n<p>Second.</p>",
    );
  });

  it("joins headings, paragraphs and raw HTML in source order", () => {
    const md = ["### Heading", "", "Prose line.", "", "<p>Raw.</p>"].join("\n");
    expect(markdownToHtml(md)).toBe(
      "<h3>Heading</h3>\n<p>Prose line.</p>\n<p>Raw.</p>",
    );
  });

  it("leaves Markdown list syntax as paragraph text", () => {
    // The converter has no list handling, and one published project relies on
    // that: its dash list renders as a paragraph of literal dashes.
    expect(markdownToHtml("- one\n- two")).toBe("<p>- one\n- two</p>");
  });
});
