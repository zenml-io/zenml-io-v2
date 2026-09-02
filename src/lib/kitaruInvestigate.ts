/**
 * Copy for the free trace investigation funnel (mock, Sep 2026).
 *
 *   /kitaru/investigate  — intake page: drop a Langfuse export, get one
 *                          finding back. No Kitaru account needed.
 *   /claim/<token>       — where the outreach DM / email lands: the finding
 *                          with its evidence, then a signup handoff.
 *
 * Both pages are front-end mocks. The intake form never uploads anything
 * and the claim page renders a fixed sample investigation. See the GTM
 * motion doc ("Give us your traces") for the tickets this will wire into.
 */

import { KITARU_LINKS } from "./productKitaru";

export const INVESTIGATE_SEO = {
  title: "Free agent trace investigation | Kitaru",
  description:
    "Send Kitaru a Langfuse export. A background investigator reviews your real sessions and sends back one specific, surprising finding about your agent. No account needed.",
} as const;

export const INVESTIGATE_HERO = {
  eyebrow: "Free investigation",
  headline: "Give us your traces.",
  headlineAccent: "We'll find something you didn't know to ask about.",
  lede: "Export your agent's sessions from Langfuse and drop them here. A Kitaru investigator reviews them in the background and sends you one finding, with the sessions that prove it. No account, no setup.",
  turnaround: "One finding, usually within 24 hours",
} as const;

export const INVESTIGATE_STEPS = [
  {
    step: "01",
    title: "Export from Langfuse",
    body: "Traces, then Export, then JSONL. Any date range works. A few hundred sessions is plenty. Ten thousand is fine too.",
  },
  {
    step: "02",
    title: "Drop the file here",
    body: "Add the email you want the finding sent to. The file goes to an isolated investigation and nowhere else.",
  },
  {
    step: "03",
    title: "Read the finding",
    body: "You get one specific pattern, its scale across your sessions, and three example sessions to check it against. Claim the investigation to see everything.",
  },
] as const;

export const INVESTIGATE_FORM = {
  dropLabel: "Drop your Langfuse export here",
  dropHint: "JSONL or JSON, up to 200 MB",
  emailLabel: "Where should the finding go?",
  emailPlaceholder: "you@company.com",
  consentLabel:
    "I can share these traces. Kitaru may review them for this investigation and deletes them 30 days after delivery unless I claim the investigation.",
  submitLabel: "Start the investigation",
  mockNote: "Preview: nothing is uploaded from this page yet.",
  successEyebrow: "Investigation queued",
  successHeadline: "We've got it.",
  successBody:
    "An investigator is reviewing your sessions now. You'll get an email with one finding and a claim link. Reply to that email if you want it to look at something specific.",
  successNext: [
    "Import and readiness grading of every session",
    "Background review for recurring patterns",
    "One finding selected, with evidence, sent to your inbox",
  ],
} as const;

/** Anonymised findings from real investigations. Mocked for the preview. */
export const INVESTIGATE_FINDINGS = [
  {
    scale: "31% of sessions",
    finding:
      "The refunds agent calls lookup_order twice with the same order id.",
    detail:
      "The second call happens after the model re-reads the tool output. Same result, twice the latency, and it bills two tool calls.",
    agent: "Refunds agent, fintech",
  },
  {
    scale: "1 in 8 sessions",
    finding:
      "The intake agent writes a booking before the address check finishes.",
    detail:
      "The write and the validation run in the same turn. Eleven of the 88 affected bookings had an address the validator later rejected.",
    agent: "Booking agent, logistics",
  },
  {
    scale: "Every session after 14 Aug",
    finding:
      "Prompt version 12 dropped the instruction that stops the agent apologising twice.",
    detail:
      "Average reply length went up 41% and the closing sentence duplicated in 63% of sessions. Nothing in evals caught it because there was no eval for it.",
    agent: "Support copilot, SaaS",
  },
  {
    scale: "4% of sessions, 100% of escalations",
    finding: "Every human escalation starts with the same tool timing out.",
    detail:
      "The policy lookup tool times out after 8 seconds. The agent retries once, then escalates. The timeout is the whole escalation rate.",
    agent: "Claims agent, insurance",
  },
] as const;

export const INVESTIGATE_PRIVACY = {
  eyebrow: "Your traces",
  headline: "Reviewed for one purpose, then deleted.",
  items: [
    {
      title: "Isolated per investigation",
      body: "Your export goes to a single investigation context tied to your email. It's not used for anything else and never trains anything.",
    },
    {
      title: "Deleted after 30 days",
      body: "Unclaimed investigations and their traces are deleted 30 days after we send the finding. Claim it and the traces move into your own Kitaru workspace.",
    },
    {
      title: "Delete on request",
      body: 'Reply to the finding email with "delete" and the whole investigation, traces included, is gone within one business day.',
    },
  ],
} as const;

export const INVESTIGATE_FAQ = [
  {
    question: "What does the investigator look for?",
    answer:
      "Recurring patterns across your sessions that you didn't ask about: duplicate tool calls, writes that happen before their checks, prompt regressions, tool failures that correlate with escalations. It reviews the sessions the way an engineer would, then picks the one finding with the clearest evidence.",
  },
  {
    question: "Do I need a Kitaru account?",
    answer:
      "No. You get the finding by email. Claiming the investigation creates your account and opens the full session set, so you can ask the investigator follow-up questions and turn the finding into a regression test.",
  },
  {
    question: "Only Langfuse?",
    answer:
      "Langfuse exports work today. LangSmith, Braintrust, and OpenTelemetry exports import through the same path and are next. If you have something else, send it anyway and we'll tell you.",
  },
  {
    question: "What if there's nothing surprising in my traces?",
    answer:
      "Then we say so. We'd rather send \"your agent looks healthy, here's the one thing we'd watch\" than manufacture a finding.",
  },
] as const;

export const INVESTIGATE_CTA = {
  headline: "Already know what's broken?",
  body: "Skip the investigation and go straight to replay.",
  cta: { ...KITARU_LINKS.signup, label: "Sign up for Kitaru" },
} as const;

/* ---------------------------------------------------------------------- */
/* Claim page (sample investigation)                                       */
/* ---------------------------------------------------------------------- */

export const CLAIM_SEO = {
  title: "Your investigation is ready | Kitaru",
  description:
    "One finding from your agent's traces, with the sessions that prove it.",
  noindex: true,
} as const;

export const CLAIM_SAMPLE = {
  token: "demo",
  eyebrow: "Investigation ready",
  preparedFor: "@refunds_agent_dev",
  source: "Langfuse export, 12 Aug to 26 Aug",
  headline:
    "31% of your refund sessions call lookup_order twice with the same order id.",
  summary:
    "The agent reads the order, reasons about the refund, then calls lookup_order again with the identical argument before writing the refund. The second result is always the same as the first. This is the single largest source of latency in the cohort and doubles your tool spend on the affected sessions.",
  stats: [
    { value: "1,824", label: "sessions imported" },
    { value: "1,791", label: "ready to replay" },
    { value: "563", label: "sessions with the pattern" },
    { value: "+2.4s", label: "median added latency" },
  ],
  evidence: [
    {
      session: "ses_8f3a91c2",
      when: "14 Aug, 09:12",
      excerpt: [
        { kind: "tool", text: 'lookup_order(order_id="A-48213")' },
        {
          kind: "model",
          text: "The order is eligible. Let me confirm the order details before issuing the refund.",
        },
        { kind: "tool", text: 'lookup_order(order_id="A-48213")' },
        { kind: "note", text: "identical result, 2.1s" },
        {
          kind: "tool",
          text: 'issue_refund(order_id="A-48213", amount=39.00)',
        },
      ],
    },
    {
      session: "ses_4c1d77e0",
      when: "19 Aug, 16:40",
      excerpt: [
        { kind: "tool", text: 'lookup_order(order_id="A-50177")' },
        { kind: "model", text: "Checking the order once more to be safe." },
        { kind: "tool", text: 'lookup_order(order_id="A-50177")' },
        { kind: "note", text: "identical result, 2.8s" },
      ],
    },
    {
      session: "ses_2d5a08c4",
      when: "23 Aug, 11:03",
      excerpt: [
        { kind: "tool", text: 'lookup_order(order_id="A-51902")' },
        { kind: "tool", text: 'lookup_order(order_id="A-51902")' },
        { kind: "note", text: "back to back, no reasoning step between, 1.9s" },
      ],
    },
  ],
  hypothesis:
    'The system prompt says "always confirm order details before issuing a refund". The model treats the confirmation as a second lookup rather than a re-read of the first result. A one-line prompt change should remove it. Claim the investigation and replay the 563 sessions against that change to check.',
  claim: {
    label: "Claim this investigation",
    href: `${KITARU_LINKS.signup.href}?claim=demo`,
    note: "Creates your Kitaru account and opens all 1,824 sessions. Free.",
  },
  secondary: { label: "How this was found", href: "/kitaru/investigate" },
} as const;
