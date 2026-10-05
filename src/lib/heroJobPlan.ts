/**
 * heroJobPlan.ts — the rules behind the homepage hero's job box (the
 * HeroJob island): which conversation a job gets, and the plan and first
 * week that the visitor's answers fill in.
 *
 * Rule-based on purpose. Intent comes from keyword prefixes matched
 * case-insensitively at the start of a word ("fail" matches "failed", "rag"
 * does not match "storage"); when several intents match, the first in
 * INTENT_ORDER wins. A job that names both agents and models gets the agents
 * conversation but asks for both traces and runs. The engineer picked in
 * the composer's menu biases an ambiguous job: one with no keyword gets the
 * engineer's intent, and one matching several intents gets the engineer's
 * when it is among them; a clear job keeps its own intent. The stack
 * tools picked with "@" skip the questions they answer (a tool's
 * `answers`), fill the flow's `stack` vars into the plan and week, and
 * put case studies that used them first. Every string lives in
 * LABS_HERO_JOB (labs-home.ts); this module only picks and fills.
 */
import type { HeroJobCaseStudy } from "./heroJobProof";
import type {
  HeroJobContent,
  HeroJobEngineer,
  HeroJobFlow,
  HeroJobIntent,
  HeroJobOption,
  HeroJobQuestion,
  HeroJobTool,
} from "./labs-home";

type MatchedIntent = Exclude<HeroJobIntent, "general">;

const INTENT_KEYWORDS: Record<MatchedIntent, readonly string[]> = {
  agents: ["agent", "llm", "prompt", "chatbot", "support", "assistant", "rag"],
  ml: [
    "model",
    "retrain",
    "drift",
    "fraud",
    "churn",
    "forecast",
    "classifier",
    "training",
  ],
  reliability: [
    "pipeline",
    "fail",
    "broken",
    "standup",
    "job",
    "dag",
    "orchestr",
  ],
  cost: ["cost", "cheap", "spend", "gpu", "token", "bill"],
};

const INTENT_ORDER: readonly MatchedIntent[] = [
  "agents",
  "ml",
  "reliability",
  "cost",
];

const INTENT_PATTERNS = Object.fromEntries(
  INTENT_ORDER.map((intent) => [
    intent,
    new RegExp(`\\b(?:${INTENT_KEYWORDS[intent].join("|")})`, "i"),
  ]),
) as Record<MatchedIntent, RegExp>;

function matchesIntent(job: string, intent: MatchedIntent): boolean {
  return INTENT_PATTERNS[intent].test(job);
}

export function classifyHeroJob(
  job: string,
  bias?: MatchedIntent,
): HeroJobIntent {
  const matched = INTENT_ORDER.filter((intent) => matchesIntent(job, intent));
  if (bias && (matched.length === 0 || matched.includes(bias))) return bias;
  return matched[0] ?? "general";
}

/** One slot per question answered so far; `null` means skipped. */
export type HeroJobAnswers = readonly (HeroJobOption | null)[];

/** Fill `{name}` placeholders; a var may itself hold placeholders. */
export function fillTemplate(
  template: string,
  vars: Readonly<Record<string, string>>,
): string {
  let out = template;
  for (let pass = 0; pass < 3 && out.includes("{"); pass += 1) {
    out = out.replace(
      /\{(\w+)\}/g,
      (match, name: string) => vars[name] ?? match,
    );
  }
  return out;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "A", "A and B", "A, B and C". */
export function joinNames(names: readonly string[]): string {
  if (names.length < 2) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/**
 * The option a picked tool implies for `question` (the first tool that
 * answers it), with the option's `stackVars` filled with the tool's name.
 */
export function impliedAnswer(
  question: HeroJobQuestion,
  stack: readonly HeroJobTool[],
): HeroJobOption | null {
  for (const tool of stack) {
    const value = tool.answers?.[question.id];
    const option = value && question.options.find((o) => o.value === value);
    if (!option) continue;
    if (!option.stackVars) return option;
    const extra = Object.fromEntries(
      Object.entries(option.stackVars).map(([k, v]) => [
        k,
        fillTemplate(v, { tool: tool.name }),
      ]),
    );
    return { ...option, vars: { ...option.vars, ...extra } };
  }
  return null;
}

/**
 * Answer every next question the stack already answers, so the engineer
 * never asks it. Returns the longer answers and the indexes filled this way
 * (the island shows neither the question nor the answer for those).
 */
export function answerImplied(
  flow: HeroJobFlow,
  answers: HeroJobAnswers,
  stack: readonly HeroJobTool[],
): { answers: HeroJobAnswers; implied: number[] } {
  const out = [...answers];
  const implied: number[] = [];
  while (out.length < flow.questions.length) {
    const option = impliedAnswer(flow.questions[out.length], stack);
    if (!option) break;
    implied.push(out.length);
    out.push(option);
  }
  return { answers: out, implied };
}

/**
 * The case studies to show: with no stack, the first three as built; with
 * one, those whose tools overlap it first (most overlap first, build order
 * kept otherwise), then the rest.
 */
export function preferCases(
  rows: readonly HeroJobCaseStudy[],
  stack: readonly HeroJobTool[],
  count = 3,
): HeroJobCaseStudy[] {
  const picked = new Set(stack.map((t) => t.value));
  const overlap = (row: HeroJobCaseStudy) =>
    row.tools?.filter((t) => picked.has(t)).length ?? 0;
  return rows
    .map((row, i) => ({ row, i, score: overlap(row) }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, count)
    .map(({ row }) => row);
}

export interface HeroJobOutcome {
  plan: readonly string[];
  week: readonly { day: string; text: string }[];
  needs: string;
}

/**
 * The plan, first week and "needs" line for a finished conversation.
 * `stack` is the tools picked with "@": when any is in the flow's `stack`
 * groups, its vars apply with `{tool}` as their names.
 */
export function heroJobOutcome(
  job: string,
  intent: HeroJobIntent,
  answers: HeroJobAnswers,
  content: HeroJobContent,
  stack: readonly HeroJobTool[] = [],
): HeroJobOutcome {
  const flow = content.flows[intent];
  const vars: Record<string, string> = { ...flow.vars };
  for (const answer of answers) Object.assign(vars, answer?.vars);
  const tools = flow.stack
    ? stack.filter((t) => flow.stack?.groups.includes(t.group))
    : [];
  if (flow.stack && tools.length) {
    const tool = joinNames(tools.map((t) => t.name));
    for (const [name, template] of Object.entries(flow.stack.vars))
      vars[name] = fillTemplate(template, { tool });
  }

  const plan = flow.plan.map((template) =>
    capitalize(fillTemplate(template, vars)),
  );

  const week = flow.week.map(({ day, text }) => ({
    day,
    text: capitalize(fillTemplate(text, vars)),
  }));

  const needs =
    intent === "agents" && matchesIntent(job, "ml")
      ? content.reply.needsBoth
      : vars.needs;

  return { plan, week, needs };
}

/** The job as quoted back: trimmed, trailing sentence punctuation dropped. */
export function displayJob(job: string): string {
  return job.trim().replace(/[.!?]+$/, "");
}

/**
 * The signup URL with the job carried along for the product to pick up,
 * plus the answers as `id:value` pairs joined by commas (skipped questions
 * left out, the parameter omitted when there are none), the engineer picked
 * in the composer as `engineer` (omitted for Auto or none) and the stack
 * tools as `stack`, values joined by commas (omitted when none).
 */
export function heroJobSignupHref(
  baseHref: string,
  job: string,
  {
    flow,
    answers = [],
    engineer,
    stack = [],
  }: {
    flow?: HeroJobFlow;
    answers?: HeroJobAnswers;
    engineer?: HeroJobEngineer;
    stack?: readonly HeroJobTool[];
  } = {},
): string {
  const pairs = answers.flatMap((answer, i) => {
    const question = flow?.questions[i];
    return answer && question ? [`${question.id}:${answer.value}`] : [];
  });
  const query = [`job=${encodeURIComponent(job.trim())}`];
  if (pairs.length)
    query.push(`answers=${encodeURIComponent(pairs.join(","))}`);
  if (engineer?.intent)
    query.push(`engineer=${encodeURIComponent(engineer.value)}`);
  if (stack.length)
    query.push(
      `stack=${stack.map((t) => encodeURIComponent(t.value)).join(",")}`,
    );
  return `${baseHref}?${query.join("&")}`;
}
