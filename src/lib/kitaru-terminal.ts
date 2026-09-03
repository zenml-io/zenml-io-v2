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
  lede: "One command on your laptop. One sentence to Claude Code, Codex, or Cursor. Kitaru imports the runs your agent already made, and the skill walks the evidence with you.",
  prompt: "Use kitaru-investigation to investigate this agent.",
} as const;

export const TERMINAL: readonly TerminalLine[] = [
  { kind: "cmd", text: KITARU_INSTALL_CMD },
  { kind: "out", text: "✓ kitaru 0.24.0 installed" },
  { kind: "out", text: "✓ Skills installed for every coding agent found" },
  { kind: "out", text: "✓ Claude Code: MCP server 'kitaru'" },
  { kind: "out", text: "◆ Kitaru is installed. Next: kitaru login --local" },
  { kind: "cmd", text: "kitaru login --local" },
  { kind: "out", text: "✓ Local server running at http://localhost:8000" },
  { kind: "blank", text: "" },
  { kind: "note", text: "# in your agent's repo" },
  { kind: "cmd", text: `> ${FIRST_RUN.prompt}` },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "Found your Langfuse project. Importing every session, automatically.",
  },
  {
    kind: "out",
    text: "kitaru session import ./traces.jsonl --agent returns-agent",
  },
  { kind: "out", text: "1,824 sessions · 1,791 ready to replay · 33 partial" },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "Reviewed 20 sessions. One pattern repeats: the agent drops the hazmat flag when the customer mentions batteries. 9 of the 20; scanning all 1,824.",
  },
  {
    kind: "out",
    text: 'cohort "dropped-hazmat-flag" · 90 sessions · frozen v1',
  },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "Opened three of them in the Kitaru UI. Go read them and tell me if this is a real bug.",
  },
  { kind: "cmd", text: "> yes, it's real" },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "Drafted evaluator hazmat-flag-preserved. Replaying the 90 against your branch pr-311.",
  },
  {
    kind: "out",
    text: "kitaru experiment run start fix-validation --cohort dropped-hazmat-flag@v1",
  },
  { kind: "out", text: "v1      90 / 90 fail" },
  { kind: "out", text: "pr-311   4 / 90 fail      4 opened for you to read" },
];

export const FIRST_RUN_OUTCOMES = [
  {
    stat: "1,824",
    label: "sessions imported",
    title: "Your history becomes the test suite",
    body: "Import the traces you already have from Langfuse, LangSmith, Braintrust, Logfire, or Phoenix, or wrap the agent to record fresh runs. Every session is graded at import for replay readiness.",
  },
  {
    stat: "20 read",
    label: "not 1,824",
    title: "One finding, with the evidence",
    body: "The skill reads a handful of sessions, tells you what repeats, and pins it to exact trace locations. You judge. Your verdict becomes a frozen cohort and an evaluator.",
  },
  {
    stat: "90 → 4",
    label: "failing after the fix",
    title: "A replay you can put in CI",
    body: "Your real code runs again against the recorded world, with one thing changed. The cohort that caught the failure becomes the gate that keeps it caught.",
  },
] as const;
