/**
 * heroJobProof.ts — the case studies the homepage hero's job box shows
 * right after a visitor picks a use case ("Teams doing this in
 * production:"). Picked at BUILD time from the LLMOps and MLOps research
 * databases, so the island receives a small precomputed map (a few rows per
 * use-case chip) instead of the databases.
 *
 * Each use-case chip value maps to one matcher: the database to read, the
 * tags an entry must carry (any of them; none required when omitted) and a
 * pattern its title must match. When fewer than MIN_ROWS titles match, the
 * first sentence of the summary is searched too. Newest first, one row per
 * company, only entries that name a company. No match, no proof line: the
 * island simply skips it. Nothing is ever made up.
 *
 * Given the stack picker's tools, each row also lists the tools its entry is
 * tagged with, and up to MAX_EXTRA further rows that add a tool the first
 * three lack are kept, so the island can put teams that used the visitor's
 * stack first (preferCases in heroJobPlan.ts). buildHeroJobStack ranks the
 * picker's tools by how many entries carry their tags.
 */
import type { HeroJobTool, HeroJobToolGroup } from "./labs-home";

export interface HeroJobCaseStudy {
  source: "llmops" | "mlops";
  company: string;
  takeaway: string;
  href: string;
  /** Stack-picker tool values this entry is tagged with; omitted when none. */
  tools?: readonly string[];
}

/** The fields the picker reads from either database's entries. */
export interface HeroJobProofEntry {
  source: "llmops" | "mlops";
  slug: string;
  title: string;
  company?: string;
  summary?: string;
  year?: number;
  tags: readonly string[];
}

interface ProofMatcher {
  source: "llmops" | "mlops";
  tags?: readonly string[];
  pattern: RegExp;
}

/** Keyed by the `value` of each flow's use-case option in LABS_HERO_JOB. */
export const HERO_JOB_PROOF_MATCHERS: Readonly<Record<string, ProofMatcher>> = {
  // agents
  support: {
    source: "llmops",
    tags: ["customer-support", "chatbot"],
    pattern: /\bsupport\b|customer service|contact cent|help ?desk/i,
  },
  rag: {
    source: "llmops",
    tags: ["rag", "semantic-search", "question-answering"],
    pattern: /\bsearch\b|\bRAG\b|retrieval|knowledge/i,
  },
  coding: {
    source: "llmops",
    tags: ["code-generation"],
    pattern: /\bcod(?:e|ing)\b|developer/i,
  },
  docs: {
    source: "llmops",
    tags: ["document-processing"],
    pattern: /\bdocuments?\b|contract|invoice|claims?\b|\bPDF/i,
  },
  // ML
  fraud: { source: "mlops", pattern: /fraud|\brisk\b|credit/i },
  recs: { source: "mlops", pattern: /recommend|personali[sz]/i },
  forecasting: { source: "mlops", pattern: /forecast|demand predict/i },
  vision: {
    source: "mlops",
    pattern: /computer vision|\bimage|\bvideo|\bcamera/i,
  },
  // reliability
  training: {
    source: "mlops",
    tags: ["pipeline-orchestration"],
    pattern: /training pipeline|\bpipelines?\b/i,
  },
  data: {
    source: "mlops",
    tags: ["feature-store", "data-ingestion", "feature-engineering"],
    pattern: /feature (?:store|platform|pipeline)|data pipeline/i,
  },
  inference: {
    source: "mlops",
    tags: ["model-serving", "serving"],
    pattern: /batch inference|\binference\b/i,
  },
  // cost
  llm: {
    source: "llmops",
    tags: ["cost-optimization"],
    pattern: /\bcost|cheaper|saving/i,
  },
  train: {
    source: "mlops",
    tags: ["compute-management", "training"],
    pattern: /\bcost|\bGPU|efficien/i,
  },
  serve: {
    source: "llmops",
    tags: ["cost-optimization"],
    pattern:
      /\b(?:inference|serving)\b.*\bcost|\bcost.*\b(?:inference|serving)\b/i,
  },
  // general
  agents: {
    source: "llmops",
    tags: ["monitoring", "evals"],
    pattern: /\bevaluat|\bmonitor|observab/i,
  },
  models: {
    source: "mlops",
    tags: ["monitoring"],
    pattern: /\bmonitor/i,
  },
};

const MAX_ROWS = 3;
const MAX_EXTRA = 2;
const MIN_ROWS = 2;
const TAKEAWAY_MAX = 100;

function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?=\s|$)/s);
  return (match ? match[0] : text).trim();
}

/**
 * The row's one-liner: the entry's title (the databases title every entry
 * by its outcome, and the summaries open by re-introducing the company),
 * cut at a word boundary.
 */
export function takeawayFrom(title: string): string {
  const line = title.trim().replace(/[.!?]$/, "");
  if (line.length <= TAKEAWAY_MAX) return line;
  const cut = line.slice(0, TAKEAWAY_MAX);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

/** "Digital Ocean" and "DigitalOcean" are one company. */
function companyKey(company: string): string {
  return company.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Some summaries only say the source had nothing to summarise. */
const EMPTY_SUMMARY = /^(?:unfortunately|the provided source)/i;

/** The tool values whose tags an entry carries. */
function toolsOf(
  entry: HeroJobProofEntry,
  tools: readonly HeroJobTool[],
): string[] {
  return tools
    .filter((tool) => tool.tags?.some((tag) => entry.tags.includes(tag)))
    .map((tool) => tool.value);
}

function pick(
  entries: readonly HeroJobProofEntry[],
  matcher: ProofMatcher,
  tools: readonly HeroJobTool[],
): HeroJobCaseStudy[] {
  const candidates = entries
    .filter(
      (e) =>
        e.source === matcher.source &&
        e.company &&
        e.summary &&
        !EMPTY_SUMMARY.test(e.summary) &&
        (!matcher.tags || e.tags.some((t) => matcher.tags?.includes(t))),
    )
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  const byTitle = candidates.filter((e) => matcher.pattern.test(e.title));
  const pool =
    byTitle.length >= MIN_ROWS
      ? byTitle
      : [
          ...byTitle,
          ...candidates.filter(
            (e) =>
              !byTitle.includes(e) &&
              matcher.pattern.test(firstSentence(e.summary ?? "")),
          ),
        ];

  const seen = new Set<string>();
  const covered = new Set<string>();
  const rows: HeroJobCaseStudy[] = [];
  let extra = 0;
  for (const e of pool) {
    const company = e.company as string;
    if (seen.has(companyKey(company))) continue;
    const used = toolsOf(e, tools);
    // Past the first three, keep a row only for a tool not yet covered.
    if (rows.length >= MAX_ROWS) {
      if (!used.some((t) => !covered.has(t))) continue;
      extra += 1;
    }
    seen.add(companyKey(company));
    for (const t of used) covered.add(t);
    rows.push({
      source: e.source,
      company,
      takeaway: takeawayFrom(e.title),
      href: `/${e.source}-database/${e.slug}`,
      ...(used.length ? { tools: used } : {}),
    });
    if (extra === MAX_EXTRA || (!tools.length && rows.length === MAX_ROWS))
      break;
  }
  return rows;
}

/** `{ useCaseValue: rows }` for every matcher with at least one real match. */
export function buildHeroJobProof(
  entries: readonly HeroJobProofEntry[],
  tools: readonly HeroJobTool[] = [],
): Record<string, HeroJobCaseStudy[]> {
  const proof: Record<string, HeroJobCaseStudy[]> = {};
  for (const [key, matcher] of Object.entries(HERO_JOB_PROOF_MATCHERS)) {
    const rows = pick(entries, matcher, tools);
    if (rows.length) proof[key] = rows;
  }
  return proof;
}

const STACK_PER_GROUP = 10;

/**
 * The stack picker's tools to show, as values in display order: per group
 * (in the order the groups first appear in `tools`), the tagged tools that
 * at least one entry carries, most used first, then the hand-written ones
 * (no tags), at most STACK_PER_GROUP per group. A group the data does not
 * cover falls back to its hand-written tools alone.
 */
export function buildHeroJobStack(
  entries: readonly HeroJobProofEntry[],
  tools: readonly HeroJobTool[],
): string[] {
  const uses = new Map<string, number>();
  for (const e of entries)
    for (const value of toolsOf(e, tools))
      uses.set(value, (uses.get(value) ?? 0) + 1);

  const groups = [...new Set(tools.map((t) => t.group))] as HeroJobToolGroup[];
  return groups.flatMap((group) => {
    const inGroup = tools.filter((t) => t.group === group);
    const handWritten = inGroup.filter((t) => !t.tags?.length);
    const ranked = inGroup
      .filter((t) => (uses.get(t.value) ?? 0) > 0)
      .sort((a, b) => (uses.get(b.value) ?? 0) - (uses.get(a.value) ?? 0))
      .slice(0, Math.max(0, STACK_PER_GROUP - handWritten.length));
    return [...ranked, ...handWritten].map((t) => t.value);
  });
}
