/**
 * Copy and data for the terminal-first sections of /product/kitaru
 * (Workshop-shaped landing, Sep 2026 exploration).
 *
 *   FirstRun      → what the first five minutes look like, as a terminal
 *                   transcript plus three outcome blocks
 *   Compatibility → frameworks, trace sources, coding agents
 *   Cloud         → what the hosted server adds on top of the local install
 *
 * Numbers reuse the landing's canonical example (the returns agent: 1,824
 * sessions imported, the "dropped the hazmat flag" cohort, 90 → 4 failing).
 */

import {
  KITARU_CLOUD_PRICE,
  KITARU_INSTALL_CMD,
  KITARU_LINKS,
  KITARU_TRIAL_DAYS,
} from "./productKitaru";

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
  { kind: "out", text: "✓ Logged in to http://localhost:8000" },
  { kind: "blank", text: "" },
  { kind: "note", text: "# in your agent's repo" },
  { kind: "cmd", text: `> ${FIRST_RUN.prompt}` },
  { kind: "blank", text: "" },
  {
    kind: "agent",
    text: "Found a Langfuse export at ./traces.jsonl. Importing.",
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
    text: "Opened three of them for you to read. Is this the behavior you'd fix?",
  },
  { kind: "cmd", text: "> yes, that's a bug" },
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

export const COMPATIBILITY = {
  eyebrow: "Works with your stack",
  headline: "Bring the agent, the traces, and the editor you already have.",
  rows: [
    {
      label: "Agent frameworks",
      note: "One-line wrapper, records every run",
      items: [
        "PydanticAI",
        "LangGraph",
        "LangChain agents",
        "Deep Agents",
        "OpenAI Agents SDK",
        "Mastra",
        "Vercel AI SDK",
      ],
      more: {
        label: "Any other: build an adapter with the skill",
        href: "https://docs.zenml.io/kitaru/adapters/custom",
      },
    },
    {
      label: "Trace sources",
      note: "Import what you already collect",
      items: [
        "Langfuse",
        "LangSmith",
        "Braintrust",
        "Logfire",
        "Arize Phoenix",
        "OpenTelemetry",
        "JSONL",
      ],
      more: {
        label: "Any other: write a one-page importer",
        href: "https://docs.zenml.io/kitaru/import-your-traces/custom-importer",
      },
    },
    {
      label: "Coding agents",
      note: "Skills and MCP server, installed for you",
      items: ["Claude Code", "Codex", "Cursor", "Windsurf", "Any MCP client"],
      more: {
        label: "Setup details",
        href: "https://docs.zenml.io/kitaru/agent-native/setup",
      },
    },
  ],
  footnote:
    "Python and TypeScript SDKs talk to the same server. Self-hosted by design: the server runs on your infrastructure and no user code executes on it.",
} as const;

export const CLOUD = {
  eyebrow: "ZenML Pro",
  headline: "Same loop, managed for your team.",
  lede: "The local install is the whole product. ZenML Pro adds the parts that only matter once more than one person is looking at the same agent.",
  items: [
    {
      title: "One server for the team",
      body: "Sessions, cohorts, and experiments in one place, with the frontend review links the skill hands you.",
    },
    {
      title: "Workers in your VPC",
      body: "Replays and imports still run on your machines with your credentials. Only metadata leaves.",
    },
    {
      title: "SSO, roles, audit",
      body: "The same control plane as ZenML: SOC 2 and ISO 27001, BYOK, multi-region.",
    },
  ],
  price: `${KITARU_CLOUD_PRICE} a month, flat`,
  trial: `${KITARU_TRIAL_DAYS}-day full-access trial, no card`,
  cta: { label: "Try ZenML Pro free", href: KITARU_LINKS.signup.href },
  secondary: { label: "See pricing", href: "/pricing" },
} as const;
