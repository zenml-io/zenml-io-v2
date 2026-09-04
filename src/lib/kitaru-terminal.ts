/**
 * Copy and data for the terminal-first sections of /product/kitaru
 * (Workshop-shaped landing, Sep 2026 exploration).
 *
 *   FirstRun      → what the first five minutes look like, as a terminal
 *                   transcript plus three outcome blocks
 *
 * Numbers reuse the landing's canonical example (the returns agent: 1,824
 * sessions imported, the "dropped the hazmat flag" cohort, 90 → 4 failing).
 */

import { KITARU_INSTALL_CMD } from "./productKitaru";

export type TerminalLine = {
  text: string;
  /** cmd = typed by you, out = program output, agent = the coding agent talking, note = comment */
  kind: "cmd" | "out" | "agent" | "note" | "blank";
};

export const FIRST_RUN = {
  eyebrow: "The first five minutes",
  headline: "Install, then let your coding agent do the investigation.",
  lede: "One command on your laptop. One sentence to Claude Code, Codex, or Cursor. The skill finds what repeats in your real runs and comes back with a PR and the numbers behind it.",
  prompt: "Use kitaru-investigation to investigate this agent.",
} as const;

export const TERMINAL: readonly TerminalLine[] = [
  { kind: "cmd", text: KITARU_INSTALL_CMD },
  {
    kind: "out",
    text: "✓ Kitaru installed. Skills and MCP wired into Claude Code.",
  },
  { kind: "cmd", text: "kitaru login --local" },
  { kind: "out", text: "✓ Local server at http://localhost:8000" },
  { kind: "blank", text: "" },
  { kind: "note", text: "# in your agent's repo" },
  { kind: "cmd", text: `> ${FIRST_RUN.prompt}` },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "Imported 1,824 sessions from Langfuse. 1,791 ready to replay.",
  },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "Read 20. One pattern repeats: the hazmat flag is dropped when the customer mentions batteries. 90 of 1,824.",
  },
  {
    kind: "out",
    text: 'cohort "dropped-hazmat-flag" · 90 sessions · frozen v1',
  },
  { kind: "blank", text: "" },
  { kind: "agent", text: "Three opened in the UI. Real bug?" },
  { kind: "cmd", text: "> yes" },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "Evaluator drafted. Replaying the 90 against your branch pr-311.",
  },
  { kind: "out", text: "v1       90 / 90 fail" },
  { kind: "out", text: "pr-311    4 / 90 fail" },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "PR #311 opened with the numbers. Also: gpt-5-mini matches gpt-5 here at a third of the cost.",
  },
];

export const FIRST_RUN_OUTCOMES = [
  {
    stat: "1,824",
    label: "sessions imported",
    title: "Your history becomes the test suite",
    body: "Import from Langfuse, LangSmith, Braintrust, Logfire or Phoenix, or wrap the agent. Every session is graded for replay readiness.",
  },
  {
    stat: "20 read",
    label: "not 1,824",
    title: "One finding, with the evidence",
    body: "The skill reads a handful, says what repeats, and pins it to the trace. You judge; your verdict becomes a cohort and an evaluator.",
  },
  {
    stat: "90 → 4",
    label: "failing after the fix",
    title: "A replay you can put in CI",
    body: "Your real code runs again against the recorded world with one thing changed. The cohort that caught it becomes the gate.",
  },
  {
    stat: "1 PR",
    label: "opened at the end",
    title: "A fix, a cheaper model, a caught regression",
    body: "Each answer comes with the sessions that prove it, and as a PR when it is a fix.",
  },
] as const;
