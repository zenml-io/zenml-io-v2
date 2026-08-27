/**
 * The project detail body converter.
 *
 * Project bodies are a mix of raw HTML blocks and a couple of Markdown
 * heading/paragraph conventions, so they are converted with this deliberately
 * small pass rather than the site's remark pipeline. It handles `###`/`####`
 * headings, wraps bare text blocks in `<p>`, and passes any block that already
 * starts with `<` straight through.
 *
 * It does NOT handle list syntax: a body that writes a Markdown list in a text
 * block renders as a paragraph of literal `-` lines. That is the published
 * output for one project, so the omission is load-bearing — swapping this for
 * a full Markdown parser changes what that page shows.
 */

/** Minimal markdown-to-HTML for the details section (headings + paragraphs). */
export function markdownToHtml(md: string): string {
  if (!md) return "";
  return (
    md
      // Convert ### headings
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      // Convert #### headings
      .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
      // Wrap plain text paragraphs (lines not starting with < or empty)
      .split("\n\n")
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return "";
        // Already HTML (starts with < tag)
        if (trimmed.startsWith("<")) return trimmed;
        return `<p>${trimmed}</p>`;
      })
      .filter(Boolean)
      .join("\n")
  );
}
