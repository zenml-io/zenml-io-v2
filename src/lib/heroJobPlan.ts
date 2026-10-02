/**
 * heroJobPlan.ts — the rules behind the homepage hero's eval plan (the
 * HeroJob island): which path a typed description gets, which questions it
 * already answers, and how the report is composed from the visitor's
 * answers, the advice library (heroJobAdvice.ts) and the build-time case
 * pool (heroJobProof.ts).
 *
 * Rule-based on purpose, so every line of a report can be reviewed.
 * Keywords match case-insensitively at the start of a word ("tun" matches
 * "tuning", "rag" does not match "storage"). Every string lives in
 * LABS_HERO_JOB (labs-home.ts) or the advice library; this module only
 * picks and orders.
 */
import type {
  HeroJobAdvice,
  HeroJobCondition,
  HeroJobExample,
  HeroJobFailure,
} from "./heroJobAdvice";
import type { HeroJobCase, HeroJobCasePool } from "./heroJobProof";
import type { HeroJobContent, HeroJobPath, HeroJobQuestion } from "./labs-home";

/** Question id → the chosen option value. A skipped question has no key. */
export type HeroJobAnswers = Readonly<Record<string, string>>;

export const REPORT_FAILURES = 5;
export const REPORT_SIMILAR = 3;
export const REPORT_SEEN_AT = 2;
/** How many failure modes and evals everyone sees before the email gate. */
export const FREE_FAILURES = 2;
export const FREE_EVALS = 1;
/** A path score that needs a title hit: the case study is about this path. */
const STRONG_PATH = 3;

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function mentions(text: string, keywords: readonly string[]): boolean {
  if (!keywords.length) return false;
  return new RegExp(`\\b(?:${keywords.map(escapeRegExp).join("|")})`, "i").test(
    text,
  );
}

/** The path a typed description gets: fine-tuning when it says so, else agent. */
export function classifyHeroJobPath(
  text: string,
  content: HeroJobContent,
): HeroJobPath {
  return (
    content.pathOrder.find((path) =>
      mentions(text, content.paths[path].keywords ?? []),
    ) ?? "agent"
  );
}

/**
 * The answers a typed description already gives: for each question, the
 * option whose keywords it mentions, when exactly one option matches.
 */
export function impliedAnswers(
  text: string,
  questions: readonly HeroJobQuestion[],
): Record<string, string> {
  const answers: Record<string, string> = {};
  for (const question of questions) {
    const matched = question.options.filter((o) =>
      mentions(text, o.keywords ?? []),
    );
    const [only] = matched;
    if (only && matched.length === 1) answers[question.id] = only.value;
  }
  return answers;
}

export function holds(
  condition: HeroJobCondition | undefined,
  answers: HeroJobAnswers,
): boolean {
  if (!condition) return true;
  return Object.entries(condition).every(([id, values]) => {
    const answer = answers[id];
    return answer !== undefined && values.includes(answer);
  });
}

function priority(failure: HeroJobFailure, answers: HeroJobAnswers): number {
  return (failure.boosts ?? []).reduce(
    (sum, boost) => sum + (holds(boost.when, answers) ? boost.weight : 0),
    failure.base,
  );
}

/**
 * The failure modes a report leads with: the path's candidates whose `when`
 * holds, highest priority first (library order breaks ties), at most
 * REPORT_FAILURES. Each carries the eval that catches it.
 */
export function heroJobFailures(
  path: HeroJobPath,
  answers: HeroJobAnswers,
  library: readonly HeroJobFailure[],
): HeroJobFailure[] {
  return library
    .map((failure, order) => ({ failure, order }))
    .filter(
      ({ failure }) => failure.path === path && holds(failure.when, answers),
    )
    .sort(
      (a, b) =>
        priority(b.failure, answers) - priority(a.failure, answers) ||
        a.order - b.order,
    )
    .slice(0, REPORT_FAILURES)
    .map(({ failure }) => failure);
}

/** The eval's example closest to the answers. */
export function heroJobExample(
  failure: HeroJobFailure,
  answers: HeroJobAnswers,
): HeroJobExample {
  const closer = failure.eval.examples?.find((e) => holds(e.when, answers));
  return closer
    ? { input: closer.input, expect: closer.expect }
    : failure.eval.example;
}

export function heroJobAdvice(
  path: HeroJobPath,
  answers: HeroJobAnswers,
  library: readonly HeroJobAdvice[],
): HeroJobAdvice[] {
  return library.filter((a) => a.path === path && holds(a.when, answers));
}

function companyKey(company: string): string {
  return company.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * "Systems like yours": the pool's cases for the path, ranked by the sum of
 * their scores for the visitor's answers (each weighted by its question),
 * then by how clearly they are that kind of system; one per company. With
 * no answer that matches anything, the path's clearest cases.
 */
export function pickSimilar(
  pool: HeroJobCasePool,
  path: HeroJobPath,
  answers: HeroJobAnswers,
  questions: readonly HeroJobQuestion[],
): HeroJobCase[] {
  const pathKey = `path:${path}`;
  const rank = (c: HeroJobCase) =>
    questions.reduce((sum, q) => {
      const value = answers[q.id];
      return value === undefined
        ? sum
        : sum + q.weight * (c.score[`${q.id}:${value}`] ?? 0);
    }, 0);
  const picked: HeroJobCase[] = [];
  const companies = new Set<string>();
  const ranked = pool.cases
    .filter((c) => (c.score[pathKey] ?? 0) > 0)
    .map((c) => ({
      c,
      strong: (c.score[pathKey] ?? 0) >= STRONG_PATH ? 1 : 0,
      r: rank(c) + (c.score[pathKey] ?? 0),
    }))
    .sort(
      (a, b) =>
        b.strong - a.strong ||
        b.r - a.r ||
        (b.c.score[pathKey] ?? 0) - (a.c.score[pathKey] ?? 0),
    );
  for (const { c } of ranked) {
    const key = companyKey(c.company);
    if (companies.has(key)) continue;
    companies.add(key);
    picked.push(c);
    if (picked.length === REPORT_SIMILAR) break;
  }
  return picked;
}

/** The companies whose case studies mention a failure mode. */
export function seenAt(
  pool: HeroJobCasePool,
  failureId: string,
): HeroJobCase[] {
  return (pool.seen[failureId] ?? []).slice(0, REPORT_SEEN_AT).flatMap((i) => {
    const c = pool.cases[i];
    return c ? [c] : [];
  });
}

/** `id:value` pairs joined by commas, in question order. */
export function serializeAnswers(
  questions: readonly HeroJobQuestion[],
  answers: HeroJobAnswers,
): string {
  return questions
    .flatMap((q) => {
      const value = answers[q.id];
      return value === undefined ? [] : [`${q.id}:${value}`];
    })
    .join(",");
}

/**
 * The signup link every CTA points at: `?path=`, `&answers=` and, when the
 * visitor typed one, `&job=` (their description).
 */
export function heroJobSignupHref(
  base: string,
  path: HeroJobPath,
  options: {
    questions: readonly HeroJobQuestion[];
    answers?: HeroJobAnswers;
    job?: string;
  },
): string {
  const params = [`path=${path}`];
  const answers = serializeAnswers(options.questions, options.answers ?? {});
  if (answers) params.push(`answers=${encodeURIComponent(answers)}`);
  const job = options.job?.trim();
  if (job) params.push(`job=${encodeURIComponent(job)}`);
  return `${base}${base.includes("?") ? "&" : "?"}${params.join("&")}`;
}

/** Plain labels for the visitor's answers, for the report's "your system" line. */
export function answerLabels(
  questions: readonly HeroJobQuestion[],
  answers: HeroJobAnswers,
): string[] {
  return questions.flatMap((q) => {
    const option = q.options.find((o) => o.value === answers[q.id]);
    return option ? [option.label] : [];
  });
}

/** Fill `{name}` placeholders. */
export function fillTemplate(
  template: string,
  vars: Readonly<Record<string, string>>,
): string {
  return template.replace(
    /\{(\w+)\}/g,
    (match, name: string) => vars[name] ?? match,
  );
}
