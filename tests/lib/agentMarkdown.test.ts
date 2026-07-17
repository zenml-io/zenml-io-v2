import { describe, expect, it } from "vitest";
import {
  escapeMarkdownText,
  indentedMarkdownBulletList,
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownLink,
  markdownPreamble,
  markdownResponse,
  markdownTable,
  yesNo,
} from "../../src/lib/agentMarkdown";

describe("agent Markdown helpers", () => {
  it("returns trimmed Markdown with one trailing newline and the Markdown content type", async () => {
    const response = markdownResponse("\n\nHello agents\n\n");

    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(await response.text()).toBe("Hello agents\n");
  });

  it("builds the standard page preamble", () => {
    const preamble = markdownPreamble({
      title: "Kitaru",
      description: "Durable agents for production.",
      canonicalPath: "/product/kitaru",
    });

    expect(preamble).toContain("# Kitaru");
    expect(preamble).toContain(
      "Canonical HTML URL: https://www.zenml.io/product/kitaru",
    );
    expect(preamble).toContain("Durable agents for production.");
    expect(preamble).toContain("repo-owned Markdown mirror");
  });

  it("escapes link labels and expands root-relative hrefs", () => {
    expect(markdownLink("Docs [beta]", "/docs")).toBe(
      "[Docs \\[beta\\]](https://www.zenml.io/docs)",
    );
  });

  it("renders CTA links as Markdown bullets", () => {
    expect(
      markdownCtaList([
        { label: "Book demo", href: "/book-your-demo" },
        { label: "Docs", href: "https://docs.zenml.io" },
      ]),
    ).toBe(
      "- [Book demo](https://www.zenml.io/book-your-demo)\n- [Docs](https://docs.zenml.io)",
    );
  });

  it("normalizes bullet text whitespace", () => {
    expect(markdownBulletList([" First   item ", " Second\titem "])).toBe(
      "- First item\n- Second item",
    );
  });

  it("indents each bullet-list line by two spaces", () => {
    expect(indentedMarkdownBulletList(["One", "Two"])).toBe("  - One\n  - Two");
  });

  it("renders Markdown tables with dividers and escaped cells", () => {
    expect(markdownTable(["Name", "Notes"], [["A|B", "Line 1\nLine 2"]])).toBe(
      "| Name | Notes |\n| --- | --- |\n| A\\|B | Line 1<br>Line 2 |",
    );
  });

  it("joins non-empty trimmed sections with blank lines", () => {
    expect(joinMarkdownSections("  First  ", "", "\nSecond\n")).toBe(
      "First\n\nSecond",
    );
  });

  it("escapes backslashes and square brackets", () => {
    expect(escapeMarkdownText("C:\\tmp [draft]")).toBe("C:\\\\tmp \\[draft\\]");
  });

  it("formats booleans as yes/no while leaving strings unchanged", () => {
    expect(yesNo(true)).toBe("Yes");
    expect(yesNo(false)).toBe("No");
    expect(yesNo("Sometimes")).toBe("Sometimes");
  });
});
