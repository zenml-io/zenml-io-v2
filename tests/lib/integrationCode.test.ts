import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import {
  codePaneHtml,
  extractCodeBlocks,
  replaceCodeBlocks,
  stripEmptyParagraphs,
} from "../../src/lib/integrationCode";

/**
 * Pins the parsing the integration detail page does on CMS-exported
 * frontmatter: the code blocks it pulls out of `codeExampleHtml` to
 * highlight at build time, the pane chrome it wraps them in, and the markup
 * hygiene it applies to the two `<ul>` fields. Also a collection-wide guard
 * that nothing code-bearing is left behind by the extraction.
 */
const INTEGRATIONS_DIR = join(process.cwd(), "src/content/integrations");

interface IntegrationFrontmatter {
  slug: string;
  draft?: boolean;
  featuresWithZenmlHtml?: string;
  toolFeaturesHtml?: string;
  codeExampleHtml?: string;
}

const integrations = readdirSync(INTEGRATIONS_DIR)
  .filter((file) => file.endsWith(".md"))
  .map(
    (file) =>
      matter(readFileSync(join(INTEGRATIONS_DIR, file), "utf8"))
        .data as IntegrationFrontmatter,
  )
  .filter((entry) => !entry.draft);

const kubernetes = integrations.find((entry) => entry.slug === "kubernetes");
if (!kubernetes) throw new Error("kubernetes integration fixture missing");

describe("extractCodeBlocks", () => {
  it("pulls the kubernetes example's two blocks in order, with their languages", () => {
    const blocks = extractCodeBlocks(kubernetes.codeExampleHtml ?? "");
    expect(blocks).toHaveLength(2);
    expect(blocks.map((block) => block.language)).toEqual(["bash", "python"]);
    expect(blocks[0].code.split("\n")[0]).toBe(
      "# Step 1: Register a new Kubrnetes orchestrator",
    );
    expect(blocks[1].code.split("\n")[0]).toBe(
      "from zenml import step, pipeline",
    );
  });

  it("decodes the escaped entities the export left in the source", () => {
    const blocks = extractCodeBlocks(kubernetes.codeExampleHtml ?? "");
    expect(blocks[0].code).toContain(
      "zenml orchestrator register <ORCHESTRATOR_NAME> \\",
    );
    expect(blocks[0].code).not.toContain("&lt;");
  });

  it("strips one leading newline and the trailing whitespace only", () => {
    const blocks = extractCodeBlocks(
      '<pre><code class="language-python">\nprint(1)\n  </code></pre>',
    );
    expect(blocks[0].code).toBe("print(1)");
  });

  it("maps shell to bash and an unknown or missing language to text", () => {
    expect(
      extractCodeBlocks('<pre><code class="language-shell">ls</code></pre>')[0]
        .language,
    ).toBe("bash");
    expect(
      extractCodeBlocks('<pre><code class="language-ruby">x</code></pre>')[0]
        .language,
    ).toBe("text");
    expect(
      extractCodeBlocks(
        '<pre><code fs-codehighlight-element="code">x</code></pre>',
      )[0].language,
    ).toBe("text");
  });

  it("returns nothing for an empty field", () => {
    expect(extractCodeBlocks("")).toEqual([]);
  });
});

describe("replaceCodeBlocks", () => {
  it("puts each pane back where its block was and keeps the prose between blocks", () => {
    const html =
      "<div data-rt-embed-type='true'><pre><code class=\"language-bash\">\na\n</code></pre></div><p>Then this:</p><div data-rt-embed-type='true'><pre><code class=\"language-python\">\nb\n</code></pre></div>";
    expect(replaceCodeBlocks(html, ["[PANE-1]", "[PANE-2]"])).toBe(
      "<div data-rt-embed-type='true'>[PANE-1]</div><p>Then this:</p><div data-rt-embed-type='true'>[PANE-2]</div>",
    );
  });

  it("leaves a block untouched when no pane was built for it", () => {
    const html = '<pre><code class="language-bash">a</code></pre>';
    expect(replaceCodeBlocks(html, [])).toBe(html);
  });
});

describe("codePaneHtml", () => {
  it("emits the code-pane chrome rehypeCodePane produces for a fenced block", () => {
    expect(codePaneHtml("<pre>x</pre>", "bash")).toBe(
      '<figure class="code-pane" data-language="bash"><div class="code-pane__bar"><span>bash</span><button type="button" class="code-pane__copy" aria-label="Copy code">Copy</button></div><div class="code-pane__scroll"><pre>x</pre></div></figure>',
    );
  });
});

describe("stripEmptyParagraphs", () => {
  it("leaves the kubernetes feature list as one plain ul of four items", () => {
    const html = stripEmptyParagraphs(kubernetes.featuresWithZenmlHtml ?? "");
    expect(html.match(/<ul/g)).toHaveLength(1);
    expect(html.match(/<li/g)).toHaveLength(4);
    expect(html).not.toContain("<p");
    expect(html).not.toContain('id=""');
  });

  it("drops the zero-width-joiner paragraphs in every shape the export used", () => {
    expect(
      stripEmptyParagraphs('<ul><li>a</li></ul><p>‍</p><p id="">‍</p><p></p>'),
    ).toBe("<ul><li>a</li></ul>");
  });

  it("keeps a paragraph that carries real copy", () => {
    expect(stripEmptyParagraphs("<p>Real copy.</p>")).toBe("<p>Real copy.</p>");
  });
});

describe("the integrations collection's code fields", () => {
  const withCode = integrations.filter((entry) => entry.codeExampleHtml);

  it("carries a code example on 58 published integrations", () => {
    expect(withCode).toHaveLength(58);
  });

  it("leaves no code behind once every block is extracted", () => {
    for (const entry of withCode) {
      const remainder = replaceCodeBlocks(
        entry.codeExampleHtml ?? "",
        extractCodeBlocks(entry.codeExampleHtml ?? "").map(() => ""),
      );
      expect(remainder, entry.slug).not.toContain("<pre");
      expect(remainder, entry.slug).not.toContain("<code");
    }
  });

  it("wraps every block in the embed div, and only four entries interleave prose", () => {
    const withProse: string[] = [];
    for (const entry of withCode) {
      const remainder = stripEmptyParagraphs(
        replaceCodeBlocks(
          entry.codeExampleHtml ?? "",
          extractCodeBlocks(entry.codeExampleHtml ?? "").map(() => ""),
        ),
      ).replace(/<div data-rt-embed-type='true'><\/div>/g, "");
      if (remainder.trim()) withProse.push(entry.slug);
    }
    // The spec assumed the wrappers were the only non-code markup here.
    // These four introduce a block with a sentence, which the page keeps in
    // place (replaceCodeBlocks) rather than dropping.
    expect(withProse.sort()).toEqual([
      "amazon-s3",
      "bentoml",
      "discord",
      "lightning-ai",
    ]);
  });
});
