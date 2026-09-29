/**
 * heroJobPlan.ts — the rules behind the homepage hero's job box (the
 * HeroJob island): which conversation a job gets, and the plan and first
 * week that the visitor's answers fill in.
 *
 * Rule-based on purpose. Intent comes from keyword prefixes matched
 * case-insensitively at the start of a word ("fail" matches "failed", "rag"
 * does not match "storage"); when several intents match, the first in
 * INTENT_ORDER wins. A job that names both agents and models gets the agents
 * conversation but asks for both traces and runs. Every string lives in
 * LABS_HERO_JOB (labs-home.ts); this module only picks and fills.
 */
import type {
  HeroJobContent,
  HeroJobFlow,
  HeroJobIntent,
  HeroJobOption,
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

export function classifyHeroJob(job: string): HeroJobIntent {
  return INTENT_ORDER.find((intent) => matchesIntent(job, intent)) ?? "general";
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

export interface HeroJobOutcome {
  plan: readonly string[];
  week: readonly { day: string; text: string }[];
  needs: string;
}

/**
 * The plan, first week and "needs" line for a finished conversation. `peer`
 * is a company from the case studies shown for the visitor's use case; when
 * present, the flow's `peerStep` bullet is phrased as following that team.
 */
export function heroJobOutcome(
  job: string,
  intent: HeroJobIntent,
  answers: HeroJobAnswers,
  content: HeroJobContent,
  peer?: string,
): HeroJobOutcome {
  const flow = content.flows[intent];
  const vars: Record<string, string> = { ...flow.vars };
  for (const answer of answers) Object.assign(vars, answer?.vars);

  const plan = flow.plan.map((template, i) => {
    const step = fillTemplate(template, vars);
    return peer && i === flow.peerStep
      ? fillTemplate(content.reply.peerTemplate, { peer, step })
      : capitalize(step);
  });

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
 * left out, the parameter omitted when there are none).
 */
export function heroJobSignupHref(
  baseHref: string,
  job: string,
  flow?: HeroJobFlow,
  answers: HeroJobAnswers = [],
): string {
  const pairs = answers.flatMap((answer, i) => {
    const question = flow?.questions[i];
    return answer && question ? [`${question.id}:${answer.value}`] : [];
  });
  const query = [`job=${encodeURIComponent(job.trim())}`];
  if (pairs.length)
    query.push(`answers=${encodeURIComponent(pairs.join(","))}`);
  return `${baseHref}?${query.join("&")}`;
}
