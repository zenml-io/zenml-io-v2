/**
 * Copy and data for the terminal-first sections of /product/kitaru
 * (Workshop-shaped landing, Sep 2026 exploration).
 *
 *   FirstRun      → what the first five minutes look like, as a terminal
 *                   transcript plus a strip of outcomes
 *
 * Numbers reuse the landing's canonical example (the returns agent: 1,824
 * sessions imported, 412 model calls compared across four models).
 */

import { KITARU_INSTALL_CMD } from "./productKitaru";

export type TerminalLine = {
  text: string;
  /** cmd = typed by you, out = program output, agent = the coding agent talking, note = comment */
  kind: "cmd" | "out" | "agent" | "note" | "blank" | "win";
};

export const FIRST_RUN = {
  eyebrow: "The first five minutes",
  headline: "Install, then ask your coding agent which model to run.",
  lede: "One command on your laptop. One sentence to Claude Code, Codex, or Cursor. The skill imports your traces, prices a dry run, resends your real calls to the models you pick, and walks you through what changed.",
  prompt: "Use kitaru-model-swap to find a better model for this agent.",
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
    text: "Imported 1,824 sessions from Langfuse. Sampled 412 model calls, tool definitions included.",
  },
  {
    kind: "agent",
    text: "Comparing gpt-5-mini, an open model on your provider, and a local Ollama model. Today's gpt-5 runs too, as the noise floor.",
  },
  {
    kind: "agent",
    text: "Dry run: 1,648 calls, about $2.10. Cap spend at $5 and go?",
  },
  { kind: "cmd", text: "> yes" },
  { kind: "blank", text: "" },
  { kind: "out", text: "               same tool  per call" },
  { kind: "out", text: "gpt-5 (today)     94%     $0.031" },
  { kind: "out", text: "gpt-5-mini        91%     $0.008" },
  { kind: "out", text: "open model        89%     $0.004" },
  { kind: "out", text: "local (Ollama)    71%     $0" },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "Best mix: final answers on the open model, lookups on gpt-5-mini, escalations stay on gpt-5.",
  },
  {
    kind: "win",
    text: "68% cheaper per call · 23 differences for you to review",
  },
];

export const FIRST_RUN_OUTCOMES = [
  {
    stat: "1,824",
    label: "sessions imported",
  },
  {
    stat: "412",
    label: "real calls, resent",
  },
  {
    stat: "4",
    label: "models compared",
  },
  {
    stat: "23",
    label: "differences to review",
  },
] as const;
