/**
 * heroJobProof.ts — the case studies behind the homepage hero's eval plan
 * (HeroJob). Picked at BUILD time from the LLMOps and MLOps research
 * databases into a small pool (served as /hero-job-cases.json), so the
 * island never loads the databases and never shows an entry that isn't in
 * them.
 *
 * Every answer option has a matcher; an entry scores for an option when its
 * title (strongest) or summary matches the option's pattern, plus a little
 * when it also carries one of the option's tags. Tags alone never qualify an
 * entry. The pool keeps the best POOL_PER_KEY entries per option and per
 * path, and POOL_PER_FAILURE entries per failure mode ("Seen at"); the
 * island sums the option scores for the visitor's answers to rank "Systems
 * like yours" (pickSimilar in heroJobPlan.ts).
 *
 * "What they ran into" is quoted from the entry's own summary: the first
 * sentence that names a challenge, skipped when it holds a digit so a
 * report never carries a figure. Only entries that name a real company.
 */
import type { HeroJobPath } from "./labs-home";

/** The fields read from either database's entries. */
export interface HeroJobProofEntry {
  source: "llmops" | "mlops";
  slug: string;
  title: string;
  company?: string;
  summary?: string;
  year?: number;
  tags: readonly string[];
}

export interface HeroJobCase {
  source: "llmops" | "mlops";
  company: string;
  title: string;
  href: string;
  /** A sentence from the entry's summary naming what the team ran into. */
  ranInto?: string;
  /** Score per `path:<path>` and per `<question>:<value>` key; zeros omitted. */
  score: Readonly<Record<string, number>>;
}

export interface HeroJobCasePool {
  cases: readonly HeroJobCase[];
  /** Failure id → indexes into `cases`, best first. */
  seen: Readonly<Record<string, readonly number[]>>;
}

interface Matcher {
  pattern: RegExp;
  tags?: readonly string[];
}

interface PathMatcher extends Matcher {
  sources: readonly HeroJobProofEntry["source"][];
  /** The lowest path score an entry needs; a summary-only mention is weakest. */
  minScore: number;
}

const POOL_PER_KEY = 8;
const POOL_PER_FAILURE = 3;
const RAN_INTO_MAX = 220;

const TITLE_HIT = 3;
const SUMMARY_HIT = 1.5;
const TAG_HIT = 1;

/** Who a report can be about. */
export const HERO_JOB_PATH_MATCHERS: Readonly<
  Record<HeroJobPath, PathMatcher>
> = {
  agent: {
    sources: ["llmops"],
    pattern:
      /\bagent|assistant|chatbot|copilot|\bRAG\b|retrieval|\bLLM|question[- ]answering|voice bot/i,
    tags: ["agent-based", "chatbot", "rag", "customer-support"],
    minScore: SUMMARY_HIT,
  },
  finetune: {
    sources: ["llmops", "mlops"],
    pattern:
      /fine[- ]?tun|distill|\bLoRA|\bQLoRA|\bSFT\b|supervised fine|post[- ]train|instruction[- ]tun|\bRLHF|\bDPO\b|continued pre[- ]?train/i,
    tags: ["fine-tuning", "instruction-tuning", "knowledge-distillation"],
    // In the title, or in the summary and tagged: a passing mention of
    // fine-tuning doesn't make a fine-tuning case study.
    minScore: SUMMARY_HIT + TAG_HIT,
  },
};

/** Keyed `<question id>:<option value>`, matching LABS_HERO_JOB's questions. */
export const HERO_JOB_ANSWER_MATCHERS: Readonly<Record<string, Matcher>> = {
  // agent
  "modality:text": {
    pattern:
      /\bchat|assistant|customer support|customer service|question[- ]answering|\bsearch\b|copilot|\bemail/i,
    tags: ["chatbot", "customer-support", "question-answering"],
  },
  "modality:voice": {
    pattern:
      /\bvoice|speech|call cent|phone call|\baudio|spoken|transcri|contact cent/i,
    tags: ["speech-recognition"],
  },
  "modality:documents": {
    pattern:
      /\bdocuments?\b|contract|invoice|\bPDF|\bclaims?\b|\bforms?\b|legal|paperwork|medical records/i,
    tags: ["document-processing", "unstructured-data"],
  },
  "modality:code": {
    pattern:
      /\bcode\b|\bcoding|developer|software engineer|pull request|\bIDE\b|programming/i,
    tags: ["code-generation", "code-interpretation"],
  },
  "interaction:single": {
    pattern:
      /classif|extraction|\bextract|summari[sz]|tagging|categori[sz]|moderation/i,
    tags: ["classification", "summarization", "content-moderation"],
  },
  "interaction:multi": {
    pattern: /conversation|chatbot|\bchat\b|multi[- ]turn|dialog/i,
    tags: ["chatbot"],
  },
  "interaction:tools": {
    pattern:
      /\bagent|tool (?:use|call|calling)|function calling|multi[- ]step|\bMCP\b|workflow automation/i,
    tags: ["agent-based", "multi-agent-systems", "mcp"],
  },
  "output:text": {
    pattern:
      /answer|response generation|\bsummar|drafting|writing|content generation/i,
  },
  "output:structured": {
    pattern:
      /structured (?:output|data)|extraction|\bJSON\b|schema|classif|entity|text[- ]to[- ]SQL/i,
    tags: ["structured-output", "classification"],
  },
  "output:actions": {
    pattern:
      /automat|take actions|execut(?:e|ing) (?:actions|tasks)|transaction|booking|ticket resolution|workflow/i,
    tags: ["agent-based"],
  },
  "risk:facts": {
    pattern: /hallucinat|accura|factual|grounded|citation|reliab/i,
    tags: ["rag"],
  },
  "risk:unsafe": {
    pattern: /guardrail|safety|moderation|toxic|brand|compliance|policy/i,
    tags: ["guardrails", "content-moderation"],
  },
  "risk:act": {
    pattern:
      /human[- ]in[- ]the[- ]loop|approval|high[- ]stakes|payment|refund|transaction/i,
    tags: ["high-stakes-application", "human-in-the-loop"],
  },
  "risk:privacy": {
    pattern:
      /privacy|\bPII\b|sensitive data|security|HIPAA|GDPR|confidential|access control/i,
    tags: ["security"],
  },
  "risk:regress": {
    pattern: /evaluation|\bevals?\b|regression|testing|quality assurance/i,
    tags: ["evals"],
  },
  "risk:cost": {
    pattern: /\bcost|latency|token usage|cheaper|efficien/i,
    tags: ["cost-optimization", "latency-optimization", "token-optimization"],
  },
  // finetune
  "goal:cost": {
    pattern:
      /smaller model|small language model|distill|\bcost|latency|cheaper|on[- ]device|efficien/i,
    tags: ["knowledge-distillation", "model-optimization", "cost-optimization"],
  },
  "goal:quality": {
    pattern:
      /domain[- ]specific|domain adaptation|accura|quality|speciali[sz]ed|medical|legal|financial/i,
  },
  "goal:format": {
    pattern: /format|structured output|style|\btone\b|consisten|\bJSON\b/i,
    tags: ["structured-output"],
  },
  "goal:private": {
    pattern:
      /open[- ]source|open[- ]weight|on[- ]prem|self[- ]host|privacy|sovereign|in[- ]house|Llama|Mistral/i,
    tags: ["open-source"],
  },
  "data:logs": {
    pattern:
      /production data|\blogs\b|user feedback|user interactions|historical data|real[- ]world data|traces/i,
  },
  "data:labels": {
    pattern:
      /annotat|labell?ed|labell?ing|human[- ](?:reviewed|curated|written)|expert/i,
  },
  "data:synthetic": {
    pattern: /synthetic|generated (?:data|examples)|teacher model|distill/i,
    tags: ["knowledge-distillation"],
  },
  "data:docs": {
    pattern:
      /\bdocuments|documentation|corpus|knowledge base|manuals|internal data/i,
  },
  "training:lora": {
    pattern: /\bLoRA|\bQLoRA|adapter|\bPEFT|parameter[- ]efficient/i,
  },
  "training:full": {
    pattern:
      /full fine[- ]?tun|full[- ]parameter|continued pre[- ]?train|pre[- ]?train(?:ed|ing) (?:a|their|our) own|from scratch/i,
  },
  "training:api": {
    pattern:
      /fine[- ]tuning API|OpenAI fine|Bedrock|Vertex AI|Azure OpenAI|managed (?:fine|training)|SageMaker/i,
  },
  "training:pref": {
    pattern:
      /\bRLHF|\bDPO\b|preference (?:data|optimi|tuning)|reinforcement learning|reward model|\bGRPO|\bPPO\b/i,
    tags: ["rlhf", "reinforcement-learning"],
  },
};

/** Keyed by failure id in HERO_JOB_FAILURES (heroJobAdvice.ts). */
export const HERO_JOB_FAILURE_MATCHERS: Readonly<Record<string, Matcher>> = {
  // agent
  ungrounded: {
    pattern:
      /hallucinat|groundedness|factual (?:accuracy|consistency)|fabricat/i,
  },
  retrieval: {
    pattern:
      /retrieval (?:accuracy|quality|precision|recall)|chunking|re-?rank|irrelevant (?:results|documents)/i,
  },
  context: {
    pattern:
      /multi[- ]turn|conversation (?:history|context|memory)|context (?:loss|window)|long conversations/i,
  },
  trajectory: {
    pattern:
      /tool (?:calls?|use|selection|calling)|function calling|trajector|agent loops?/i,
  },
  actions: {
    pattern:
      /irreversib|unauthori[sz]ed action|human approval|approval (?:step|workflow|gate)|require[sd]? (?:human )?confirmation/i,
  },
  schema: {
    pattern:
      /structured output|JSON (?:schema|output|mode)|schema (?:validation|compliance)|malformed|extraction accuracy/i,
  },
  asr: {
    pattern: /speech[- ]to[- ]text|transcription|speech recognition|\bASR\b/i,
  },
  code: {
    pattern: /code generation|generated code|unit tests?|sandbox|code review/i,
  },
  layout: {
    pattern:
      /\bOCR\b|scanned|table extraction|document (?:parsing|layout|understanding)|long documents/i,
  },
  policy: {
    pattern:
      /prompt injection|jailbreak|content moderation|off[- ]topic|toxic|brand (?:safety|voice)|red[- ]team/i,
  },
  leak: {
    pattern:
      /\bPII\b|data leak|access control|permissions|multi[- ]tenant|data isolation/i,
  },
  regress: {
    pattern:
      /regression|evaluation (?:framework|pipeline|suite)|offline eval|golden (?:set|dataset)|continuous evaluation/i,
  },
  cost: {
    pattern:
      /cost (?:optimi[sz]ation|reduction|control)|token (?:usage|costs?|budget)|latency/i,
  },
  // finetune
  cheap: {
    pattern:
      /smaller model|small language model|cost[- ](?:effective|efficient)|cost reduction|cheaper/i,
  },
  slices: {
    pattern:
      /across (?:languages|segments|categories)|multilingual|long[- ]tail|edge cases|per[- ](?:segment|category|language)/i,
  },
  format: {
    pattern:
      /structured output|output format|consistent (?:format|style|tone)|brand voice|style guide/i,
  },
  serving: {
    pattern:
      /quanti[sz]|\bvLLM|inference (?:optimi|engine|server)|on[- ]prem|self[- ]host/i,
  },
  leakage: {
    pattern:
      /contaminat|data leakage|train(?:ing)?[- /](?:test|eval) (?:split|overlap)|held[- ]out|overfit/i,
  },
  teacher: {
    pattern: /synthetic (?:data|training data|examples|dataset)|teacher model/i,
  },
  logs: {
    pattern:
      /fine[- ]tun\w* on (?:production|user|real|historical)|user feedback|implicit feedback|production (?:logs|traces)/i,
  },
  labels: {
    pattern: /annotat|labell?ing|labell?ers|human (?:labels|raters|reviewers)/i,
  },
  stale: {
    pattern: /out[- ]of[- ]date|outdated|stale|knowledge cutoff|freshness/i,
  },
  reward: {
    pattern:
      /reward (?:model|hacking)|\bRLHF|\bDPO\b|preference (?:data|optimi|tuning)/i,
  },
  baseline: {
    pattern:
      /baseline model|(?:compared|comparison) (?:to|with|against) (?:the )?(?:base|baseline|larger|general[- ]purpose)|outperform\w* (?:the )?(?:base|larger|general)/i,
  },
  forgetting: {
    pattern: /catastrophic forgetting|forgetting|general capabilit/i,
  },
};

/** Summaries that only say the source had nothing to summarise. */
const EMPTY_SUMMARY = /^(?:unfortunately|the provided source)/i;
/** Collective or anonymous "companies" a report can't name as a team. */
const NOT_A_COMPANY =
  /^(?:various|multiple|several|unknown|n\/a|none|panel|industry|generic)\b/i;
/**
 * Companies the homepage doesn't name: other AI engineering agents and
 * eval, observability or ML platforms that compete with ZenML Labs.
 */
const COMPETITOR =
  /^(?:devin|cognition|langchain|langsmith|arize|braintrust|langfuse|weights\s*(?:&|and)\s*biases|w&b|humanloop|galileo|patronus|comet|databricks|mlflow|airtrain|predibase|openpipe)\b/i;
/** Sentences that frame the write-up or the fix rather than the problem. */
const FRAMING =
  /^(?:this (?:case study|article|talk|presentation|post|session)|to (?:address|solve|tackle)|the solution|in response)/i;
const CHALLENGE =
  /challeng|struggl|faced|problem|issue|bottleneck|difficult|pain point|limitation|fail|hallucinat|inconsisten|unreliab/i;

function companyKey(company: string): string {
  return company.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function sentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * The first summary sentence that names a challenge, without digits, at
 * most RAN_INTO_MAX characters; undefined when there is none.
 */
export function ranIntoFrom(summary: string): string | undefined {
  return sentences(summary).find(
    (s) =>
      CHALLENGE.test(s) &&
      !FRAMING.test(s) &&
      !/\d/.test(s) &&
      s.length <= RAN_INTO_MAX,
  );
}

function score(entry: HeroJobProofEntry, matcher: Matcher): number {
  const inTitle = matcher.pattern.test(entry.title);
  const inSummary = matcher.pattern.test(entry.summary ?? "");
  if (!inTitle && !inSummary) return 0;
  const tagged = matcher.tags?.some((t) => entry.tags.includes(t)) ?? false;
  return (
    (inTitle ? TITLE_HIT : 0) +
    (inSummary ? SUMMARY_HIT : 0) +
    (tagged ? TAG_HIT : 0)
  );
}

function usable(entry: HeroJobProofEntry): boolean {
  return Boolean(
    entry.company?.trim() &&
      !NOT_A_COMPANY.test(entry.company.trim()) &&
      !COMPETITOR.test(entry.company.trim()) &&
      entry.summary &&
      !EMPTY_SUMMARY.test(entry.summary),
  );
}

interface Scored {
  entry: HeroJobProofEntry;
  score: Record<string, number>;
}

function top(
  scored: readonly Scored[],
  key: string,
  limit: number,
  pathKey?: string,
): Scored[] {
  return scored
    .filter((s) => (s.score[key] ?? 0) > 0)
    .sort(
      (a, b) =>
        (b.score[key] ?? 0) - (a.score[key] ?? 0) ||
        (pathKey ? (b.score[pathKey] ?? 0) - (a.score[pathKey] ?? 0) : 0) ||
        (b.entry.year ?? 0) - (a.entry.year ?? 0) ||
        a.entry.slug.localeCompare(b.entry.slug),
    )
    .slice(0, limit);
}

/**
 * The pool the island ranks from. `answerKeys` maps each path to the
 * `<question>:<value>` keys its questions offer; `failures` maps each
 * failure id to its path.
 */
export function buildHeroJobCasePool(
  entries: readonly HeroJobProofEntry[],
  answerKeys: Readonly<Record<HeroJobPath, readonly string[]>>,
  failures: readonly { id: string; path: HeroJobPath }[],
): HeroJobCasePool {
  const paths = Object.keys(answerKeys) as HeroJobPath[];
  const scored: Scored[] = [];
  for (const entry of entries) {
    if (!usable(entry)) continue;
    const s: Record<string, number> = {};
    for (const path of paths) {
      const matcher = HERO_JOB_PATH_MATCHERS[path];
      if (!matcher.sources.includes(entry.source)) continue;
      const pathScore = score(entry, matcher);
      if (pathScore < matcher.minScore) continue;
      s[`path:${path}`] = pathScore;
      for (const key of answerKeys[path]) {
        const answer = HERO_JOB_ANSWER_MATCHERS[key];
        const value = answer ? score(entry, answer) : 0;
        if (value) s[key] = value;
      }
      for (const failure of failures) {
        if (failure.path !== path) continue;
        const matcher = HERO_JOB_FAILURE_MATCHERS[failure.id];
        const value = matcher ? score(entry, matcher) : 0;
        if (value) s[`failure:${failure.id}`] = value;
      }
    }
    if (Object.keys(s).length) scored.push({ entry, score: s });
  }

  const kept = new Map<string, Scored>();
  const keep = (rows: readonly Scored[]) => {
    for (const row of rows) kept.set(row.entry.slug, row);
  };
  for (const path of paths) {
    const pathKey = `path:${path}`;
    keep(top(scored, pathKey, POOL_PER_KEY));
    for (const key of answerKeys[path])
      keep(top(scored, key, POOL_PER_KEY, pathKey));
  }
  const seenRows = new Map<string, Scored[]>();
  for (const failure of failures) {
    const rows: Scored[] = [];
    const companies = new Set<string>();
    for (const row of top(
      scored,
      `failure:${failure.id}`,
      Number.POSITIVE_INFINITY,
      `path:${failure.path}`,
    )) {
      const key = companyKey(row.entry.company ?? "");
      if (companies.has(key)) continue;
      companies.add(key);
      rows.push(row);
      if (rows.length === POOL_PER_FAILURE) break;
    }
    keep(rows);
    seenRows.set(failure.id, rows);
  }

  const ordered = [...kept.values()];
  const index = new Map(ordered.map((row, i) => [row.entry.slug, i]));
  const cases: HeroJobCase[] = ordered.map(({ entry, score: s }) => {
    const ranInto = ranIntoFrom(entry.summary ?? "");
    const caseScore = Object.fromEntries(
      Object.entries(s).filter(([key]) => !key.startsWith("failure:")),
    );
    return {
      source: entry.source,
      company: (entry.company ?? "").trim(),
      title: entry.title,
      href: `/${entry.source}-database/${entry.slug}`,
      ...(ranInto ? { ranInto } : {}),
      score: caseScore,
    };
  });
  const seen: Record<string, number[]> = {};
  for (const [id, rows] of seenRows) {
    const at = rows.flatMap((row) => {
      const i = index.get(row.entry.slug);
      return i === undefined ? [] : [i];
    });
    if (at.length) seen[id] = at;
  }
  return { cases, seen };
}
