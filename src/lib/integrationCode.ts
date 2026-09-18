/**
 * Integration body markup helpers — the small amount of parsing the
 * integration detail page needs to render CMS-exported HTML fields on the
 * Labs shell.
 *
 * The `codeExampleHtml` field of an integration is a string of
 * `<div data-rt-embed-type='true'><pre><code class="language-X">…</code></pre></div>`
 * blocks (never Shiki-highlighted, entities HTML-escaped, every block opening
 * with a newline), occasionally interleaved with a paragraph of prose that
 * introduces the next block. `extractCodeBlocks` pulls the code out in order
 * so the page can highlight it at build time; `replaceCodeBlocks` puts the
 * finished panes back where they came from, so that interleaved prose keeps
 * its place instead of being dropped.
 *
 * `featuresWithZenmlHtml` / `toolFeaturesHtml` are `<ul>` strings that the
 * export followed with an empty zero-width-joiner paragraph and decorated
 * with empty `id=""` attributes; `stripEmptyParagraphs` removes both so the
 * markup entering `.prose` is a plain list.
 *
 * Consumer: src/pages/integrations/[slug].astro.
 */

export interface IntegrationCodeBlock {
  /** Shiki language id: "python", "bash", or "text" when unknown. */
  language: string;
  /** Entity-decoded source, one leading newline and trailing space removed. */
  code: string;
}

/** `<pre>` wrapping a `<code>`, with whatever attributes the export left on either. */
const CODE_BLOCK_RE =
  /<pre\b[^>]*>\s*<code\b([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/g;

const LANGUAGE_CLASS_RE = /class\s*=\s*["']language-([A-Za-z0-9_+-]+)["']/;

/** Only the two languages the page's highlighter loads; `shell` is bash. */
const LANGUAGE_MAP: Record<string, string> = {
  bash: "bash",
  shell: "bash",
  python: "python",
};

/** The export escapes these five entities (plus the non-breaking space). */
function decodeEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function blockLanguage(codeAttributes: string): string {
  const match = LANGUAGE_CLASS_RE.exec(codeAttributes);
  if (!match) return "text";
  return LANGUAGE_MAP[match[1].toLowerCase()] ?? "text";
}

/** Every `<pre><code>` block of a `codeExampleHtml` string, in document order. */
export function extractCodeBlocks(html: string): IntegrationCodeBlock[] {
  const blocks: IntegrationCodeBlock[] = [];
  for (const match of html.matchAll(CODE_BLOCK_RE)) {
    blocks.push({
      language: blockLanguage(match[1]),
      code: decodeEntities(match[2]).replace(/^\n/, "").trimEnd(),
    });
  }
  return blocks;
}

/**
 * Swaps each `<pre><code>` block for the finished pane at the same index,
 * leaving every other byte of the field (the embed wrappers, and the prose
 * paragraphs four integrations use to introduce a block) where it was.
 * A block with no pane at its index is left untouched.
 */
export function replaceCodeBlocks(
  html: string,
  panes: readonly string[],
): string {
  let index = 0;
  return html.replace(CODE_BLOCK_RE, (whole) => {
    const pane = panes[index];
    index += 1;
    return pane ?? whole;
  });
}

/**
 * The code-pane chrome `rehypeCodePane` emits for a fenced block, as a
 * string — the Markdown collections get it from the rehype plugin, this page
 * builds it by hand because its code lives in a frontmatter field rather
 * than in the body. `src/scripts/code-copy.ts` wires the button either way.
 */
export function codePaneHtml(highlightedPre: string, language: string): string {
  return `<figure class="code-pane" data-language="${language}"><div class="code-pane__bar"><span>${language}</span><button type="button" class="code-pane__copy" aria-label="Copy code">Copy</button></div><div class="code-pane__scroll">${highlightedPre}</div></figure>`;
}

/** `<p>` holding nothing but whitespace or a zero-width joiner. */
const EMPTY_PARAGRAPH_RE = /<p\b[^>]*>(?:\s|&zwj;|‍|&nbsp;)*<\/p>/g;

/**
 * Markup hygiene for the CMS-exported list fields: drops the empty
 * zero-width-joiner paragraphs the export left after each list and the
 * empty `id=""` attributes it stamped on the list elements. The data on
 * disk is untouched — this runs at render time only.
 */
export function stripEmptyParagraphs(html: string): string {
  return html.replace(EMPTY_PARAGRAPH_RE, "").replace(/\s+id=""/g, "");
}
