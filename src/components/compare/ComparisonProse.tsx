import type { ComponentChildren, JSX } from "preact";
import { TABLE_SCROLL_HINT_TEXT } from "../../lib/rehypeTableScroll";
import "../../styles/labs-code-pane.css";

type ProseProps = { children?: ComponentChildren; id?: string };
type PreProps = JSX.IntrinsicElements["pre"] & {
  "data-language"?: string;
};

/** Keep Markdown typography on Markdown nodes, outside the Labs sections. */
export const comparisonProse = {
  p: ({ children }: ProseProps) => (
    <div class="comparison-prose prose scroll-reveal-section">
      <p class="reveal-child">{children}</p>
    </div>
  ),
  h2: ({ children, id }: ProseProps) => (
    <div class="comparison-prose prose scroll-reveal-section">
      <h2 id={id} class="reveal-child">
        {children}
      </h2>
    </div>
  ),
  h3: ({ children, id }: ProseProps) => (
    <div class="comparison-prose prose scroll-reveal-section">
      <h3 id={id} class="reveal-child">
        {children}
      </h3>
    </div>
  ),
  ul: ({ children }: ProseProps) => (
    <div class="comparison-prose prose scroll-reveal-section">
      <ul class="reveal-child">{children}</ul>
    </div>
  ),
  ol: ({ children }: ProseProps) => (
    <div class="comparison-prose prose scroll-reveal-section">
      <ol class="reveal-child">{children}</ol>
    </div>
  ),
  pre: (props: PreProps) => (
    <div class="comparison-fenced-code scroll-reveal-section">
      <figure
        class="labs-code-pane code-pane reveal-child"
        data-language={props["data-language"]}
      >
        <div class="code-pane__bar">
          <span>{props["data-language"] || "Code"}</span>
          <button type="button" class="code-pane__copy" aria-label="Copy code">
            Copy
          </button>
        </div>
        <div class="code-pane__scroll">
          <pre {...props} />
        </div>
      </figure>
    </div>
  ),
  table: ({ children }: ProseProps) => (
    <div class="comparison-markdown-table scroll-reveal-section">
      <section
        class="comparison-markdown-table__frame reveal-child"
        aria-label="Comparison details"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users must be able to scroll the table region.
        tabIndex={0}
      >
        <table>{children}</table>
      </section>
      <p class="table-scroll__hint" aria-hidden="true">
        <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {TABLE_SCROLL_HINT_TEXT}
      </p>
    </div>
  ),
};
