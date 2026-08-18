// code-tokens — shared renderer for token-level code syntax highlighting
// (kw/fn/str/var/op/dec/cmt spans), styled by the `.code-syntax` rules in
// kitaru-compat.css. Used by the code-rendering islands (OneImport,
// Importers) so they keep the site's existing highlighted-code look
// instead of the redesign's flat single-color code lines.

import type { ComponentChildren } from "preact";
import { Fragment } from "preact";

export type CodeToken =
  | string
  | { kw: string }
  | { fn: string }
  | { str: string }
  | { var: string }
  | { op: string }
  | { dec: string }
  | { cmt: string };

export type CodeLine = CodeToken[];

function renderToken(tok: CodeToken, key: number): ComponentChildren {
  if (typeof tok === "string") return tok;
  const entry = Object.entries(tok)[0];
  if (!entry) return null;
  const [cls, text] = entry;
  return (
    <span key={key} className={cls}>
      {text}
    </span>
  );
}

/** Renders an array of tokenized code lines, joined by literal newlines. */
export function renderCodeLines(lines: CodeLine[]): ComponentChildren {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line.map((tok, j) => renderToken(tok, j))}
      {i < lines.length - 1 ? "\n" : null}
    </Fragment>
  ));
}
