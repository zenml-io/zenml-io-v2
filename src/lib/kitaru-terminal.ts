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
  kind: "cmd" | "out" | "agent" | "note" | "blank" | "win";
};

export const FIRST_RUN = {
  eyebrow: "The first five minutes",
  headline: "Install, then let your coding agent do the investigation.",
  lede: "One command on your laptop. One sentence to Claude Code, Codex, or Cursor. The skill finds what repeats in your real runs, fixes it, and shows where you can save cost without losing quality.",
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
  { kind: "agent", text: "Suggested improvement: same cohort, cheaper model." },
  { kind: "out", text: "gpt-5        4 / 90 fail    $0.31 per session" },
  { kind: "out", text: "gpt-5-mini   4 / 90 fail    $0.09 per session" },
  { kind: "win", text: "same quality, a third of the cost" },
];

export const FIRST_RUN_OUTCOMES = [
  {
    stat: "1,824",
    label: "sessions imported",
    body: "Your production history, from Langfuse or a one-line wrapper, becomes the test suite.",
  },
  {
    stat: "20 read",
    label: "not 1,824",
    body: "The skill reads a handful, says what repeats, and pins it to the trace. You judge.",
  },
  {
    stat: "90 → 4",
    label: "failing after the fix",
    body: "Your real code runs again against the recorded world with one thing changed.",
  },
  {
    stat: "3×",
    label: "cheaper, same quality",
    body: "Swap the model on the same cohort. The saving is proven before it ships.",
  },
] as const;
