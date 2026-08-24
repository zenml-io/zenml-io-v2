/**
 * designRules.ts — build-time parser for DESIGN.md, backing the "Rules"
 * section of /styleguide (issue #266).
 *
 * DESIGN.md is prose the human edits directly; this module does not
 * paraphrase or summarize it. It extracts the document's own structure
 * (an `## ` heading, then a flat list of `- ` bullets under it) and, for
 * each bullet, quotes the bullet's own lead clause as the rule "name" and
 * the remainder as the "gist" — both verbatim substrings of the source
 * bullet, never rewritten. A bullet with a **bold** lead (the doc's own
 * convention for naming a rule) uses that as the name; a bullet without one
 * falls back to splitting on the first sentence boundary. This keeps the
 * Rules section honest: it cannot drift from DESIGN.md because it is
 * DESIGN.md, re-flowed for display.
 *
 * Only top-level `## ` sections and their direct `- ` bullets are read.
 * DESIGN.md has no nested sub-bullets today; if one is ever added it is
 * captured as a bullet's continuation text (indented lines are folded into
 * the bullet above them), not as a separate rule.
 */

export interface DesignRule {
  /** The bullet's own lead clause, quoted verbatim (markdown markers stripped). */
  name: string;
  /** The remainder of the bullet, quoted verbatim (markdown markers stripped). */
  gist: string;
}

export interface DesignSection {
  title: string;
  rules: DesignRule[];
}

/** Strip markdown emphasis/code markers for plain-text display. */
function stripMarkers(text: string): string {
  return text.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

/** True when `text` contains an odd number of backticks — an unsafe split point. */
function hasUnbalancedBacktick(text: string): boolean {
  return (text.match(/`/g)?.length ?? 0) % 2 === 1;
}

/**
 * Split one bullet's full text into a quoted name + gist.
 *
 * Tries, in order: a **bold** lead (the doc's own "rule name" convention);
 * the first ". "-delimited sentence; the first ": "-delimited clause. Any
 * candidate split that would cut a `code span` in half (odd backtick count
 * on either side) is rejected in favor of the next strategy, so an inline
 * code token in the lead clause (e.g. `` `letter-spacing: 0` ``) never comes
 * out truncated. If nothing splits cleanly, the whole bullet becomes the
 * name and the gist is empty — still a verbatim quote, just unsplit.
 */
function splitBullet(text: string): DesignRule {
  const bold = /^\*\*(.+?)\*\*\s*(.*)$/.exec(text);
  if (bold && !hasUnbalancedBacktick(bold[1])) {
    const name = stripMarkers(bold[1].replace(/[:.]$/, ""));
    const gistRaw = bold[2].replace(/^[:.—-]\s*/, "").trim();
    return { name, gist: stripMarkers(gistRaw) || name };
  }

  const sentence = /^(.*?\.)\s+(.+)$/.exec(text);
  if (sentence && !hasUnbalancedBacktick(sentence[1])) {
    return {
      name: stripMarkers(sentence[1].replace(/\.$/, "")),
      gist: stripMarkers(sentence[2]),
    };
  }

  const clause = /^(.*?:)\s+(.+)$/.exec(text);
  if (clause && !hasUnbalancedBacktick(clause[1])) {
    return {
      name: stripMarkers(clause[1].replace(/:$/, "")),
      gist: stripMarkers(clause[2]),
    };
  }

  return { name: stripMarkers(text), gist: "" };
}

/**
 * Parse DESIGN.md's `## ` sections into titled rule entries.
 *
 * Only `- ` top-level bullets count as rules; connecting prose paragraphs
 * (e.g. the sentence introducing a list) are read for line-tracking but
 * never rendered — the Rules section quotes bullets, not paragraphs, per
 * the "do not duplicate long prose" instruction.
 */
export function parseDesignRules(markdown: string): DesignSection[] {
  const lines = markdown.split("\n");
  const sections: DesignSection[] = [];
  let current: DesignSection | null = null;
  let bulletLines: string[] = [];

  const flushBullet = () => {
    if (bulletLines.length === 0 || !current) {
      bulletLines = [];
      return;
    }
    const text = bulletLines.join(" ").replace(/\s+/g, " ").trim();
    bulletLines = [];
    if (text) current.rules.push(splitBullet(text));
  };

  for (const line of lines) {
    const heading = /^##\s+(.+)$/.exec(line);
    if (heading) {
      flushBullet();
      current = { title: heading[1].trim(), rules: [] };
      sections.push(current);
      continue;
    }

    const bulletStart = /^-\s+(.*)$/.exec(line);
    if (bulletStart) {
      flushBullet();
      bulletLines = [bulletStart[1]];
      continue;
    }

    if (bulletLines.length > 0) {
      if (line.trim() === "") {
        flushBullet();
      } else if (/^\s{2,}\S/.test(line)) {
        bulletLines.push(line.trim());
      } else {
        flushBullet();
      }
    }
  }
  flushBullet();

  return sections.filter((section) => section.rules.length > 0);
}
