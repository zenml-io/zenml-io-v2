import type OpenAI from "openai";
import type { Entry, Section } from "./entries";

export interface BlurbSentence { text: string; section: string }
export interface Written { sentences: BlurbSentence[]; hook: string | null }
export interface Writer { write(entry: Entry, o: { withHook: boolean; feedback?: string }): Promise<Written> }

/** The model answered, but not with usable JSON. API and network errors are not wrapped in this. */
export class WriterOutputError extends Error {}

export const WRITER_MODEL = "gpt-6-luna";
const MAX_WORDS = 55;

const SYSTEM = `You write two-sentence blurbs for "In Production", a newsletter of real-world LLMOps case studies. Readers are engineers who want to know what a team built and what they learned, so they can borrow the idea. Write as an engineer telling a colleague why a case is worth reading.
Rules:
- Exactly 2 sentences, one per "sentences" item. Aim for 50 to 55 words in total; never exceed 55. Use the space for concrete context, not padding. Count both sentences together before you answer. If the draft exceeds 55 words, drop a secondary detail rather than squeezing it into another clause. A shorter clear blurb is better than padding to reach 50.
- Pick one concrete detail that makes the case interesting: a problem, unexpected result, design choice, trade-off or failure mode. Give enough context to understand what the system does and why the detail matters. Start wherever best explains that case; do not force an architecture-then-lesson structure or repeat the title.
- Use active verbs, familiar words and varied sentence lengths. Explain what people or software do rather than naming abstract capabilities or listing components. Natural does not mean jokey or chatty; contractions are fine where they fit.
- Name only components needed to explain the detail. Describe how they connect (order, routing, data flow) only as the named section states it. Only state a trade-off, cause or lesson if that section says so; otherwise use its most concrete stated technical detail.
- Mention the company at most once in the whole blurb. It may start a sentence when that reads naturally.
- Leave out user or customer counts, employee numbers, adoption figures, business outcomes, revenue or cost savings, and benchmark or evaluation scores. Only include a number when the number itself is the technical point (e.g. a threshold, a timeout, a tier count). Delivery speeds and time-to-review, time-to-build or time-to-report figures are outcomes, not technical timeouts; omit them.
- Be specific: use the actual technique and component names the section gives. Avoid vague platform words ("platform", "governed", "enterprise-grade", "at scale", "end-to-end", "seamless", "leverages AI", "AI-powered") unless the same sentence says concretely what they mean.
- Each sentence may use facts from ONE section only, the section you name for it. Never combine facts from two sections in one sentence.
- Keep each sentence focused. Do not add context, causes or claims the named section does not state.
- Copy figures exactly as the source states them. Do not calculate differences, round, or convert units.
- Keep any qualifier attached to its claim (e.g. "on its internal benchmark", "reportedly").
- Plain words. No hype adjectives ("revolutionary", "cutting-edge", "game-changing"), rhetorical questions, em dashes, generic praise or invented first-person experience.
- For each sentence, give the exact heading of the one section it draws on.`;
const HOOK_RULE = `\n- Also write "hook": 3 to 7 plain words naming the technical idea, for an email subject line. No company name and no metric.`;
const EXAMPLE = (withHook: boolean) => `\n\nIllustrative only, about a made-up company: never reuse its words, names or numbers.
1. "Glossy teapots kept fooling the sorting model under workshop lights, so the team added a polarising filter rather than putting the model through another round of training." (section: Lessons learned)
2. "Acme Kettle Co. uses a small vision model to inspect each teapot, with a separate rules engine deciding which bin it goes into." (section: Sorting architecture)${withHook ? '\nhook: "Vision model plus rules sorts teapots"' : ""}`;

const HOOK_MIN_WORDS = 3;
const HOOK_MAX_WORDS = 8;
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const NAME_STOPWORDS = new Set(["the", "a", "an", "of", "and", "inc", "ltd", "llc", "gmbh", "co", "corp", "global", "group"]);
const hasWord = (text: string, term: string) => new RegExp(`(^|[^a-z0-9])${escapeRe(term)}([^a-z0-9]|$)`).test(text);

/** The subject hook if it is 3-8 words, has no digits and does not name the company; otherwise null (use the title subject). */
export function usableHook(hook: string | null | undefined, entry: Pick<Entry, "company">): string | null {
  const h = hook?.trim();
  if (!h) return null;
  const count = h.split(/\s+/).length;
  if (count < HOOK_MIN_WORDS || count > HOOK_MAX_WORDS || /\d/.test(h)) return null;
  const lower = h.toLowerCase();
  const parts = (entry.company ?? "").toLowerCase().split(/[/,]/).map((p) => p.trim()).filter(Boolean);
  const terms = parts.flatMap((p) => {
    const first = p.split(/\s+/)[0];
    return p.includes(" ") && !NAME_STOPWORDS.has(first) ? [p, first] : [p];
  });
  return terms.some((t) => hasWord(lower, t)) ? null : h;
}

/** Lower-case the hook's first character unless the first word is an acronym/proper-casing token.
 * Lower-case if: the first word is a single letter, OR the second character of the first word is lower-case.
 * Examples: "Code-defined agent factory" → "code-defined agent factory", "MCP playbooks" → "MCP playbooks" */
export function lowerCaseHookUnlessAcronym(hook: string): string {
  const firstWord = hook.split(/\s+/)[0];
  if (!firstWord) return hook;
  if (firstWord.length === 1 || (firstWord.length >= 2 && /[a-z]/.test(firstWord[1]))) {
    return hook[0]!.toLowerCase() + hook.slice(1);
  }
  return hook;
}

export function buildWriterPrompt(entry: Entry, o: { withHook: boolean; feedback?: string }) {
  const body = entry.sections.map((s) => `## ${s.heading}\n\n${s.text}`).join("\n\n");
  const feedback = o.feedback ? `\n\nA previous attempt was rejected: ${o.feedback}\nFix that problem.` : "";
  return {
    system: SYSTEM + (o.withHook ? HOOK_RULE : "") + EXAMPLE(o.withHook),
    user: `Company: ${entry.company ?? "unknown"}\nTitle: ${entry.title}\n\n${body}${feedback}`,
  };
}

export const sectionFor = (entry: Entry, heading: string): Section | undefined =>
  entry.sections.find((s) => s.heading === heading.trim());
export const blurbText = (w: Written) => w.sentences.map((s) => s.text.trim()).join(" ");
const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;

export function writtenProblems(entry: Entry, w: Written): string[] {
  const problems: string[] = [];
  if (w.sentences.length !== 2) problems.push(`expected 2 sentences, got ${w.sentences.length}`);
  w.sentences.forEach((s, i) => {
    if (!sectionFor(entry, s.section)) problems.push(`sentence ${i + 1} cites unknown section "${s.section}"`);
  });
  const words = wordCount(blurbText(w));
  if (words > MAX_WORDS) problems.push(`blurb is ${words} words; limit is ${MAX_WORDS}`);
  return problems;
}

const SCHEMA = {
  type: "object", additionalProperties: false, required: ["sentences", "hook"],
  properties: {
    sentences: { type: "array", items: { type: "object", additionalProperties: false, required: ["text", "section"],
      properties: { text: { type: "string" }, section: { type: "string" } } } },
    hook: { type: ["string", "null"] },
  },
} as const;

export function createOpenAIWriter(client: OpenAI): Writer {
  return {
    async write(entry, o) {
      const { system, user } = buildWriterPrompt(entry, o);
      const res = await client.responses.create({
        model: WRITER_MODEL,
        reasoning: { effort: "low" },
        input: [{ role: "system", content: system }, { role: "user", content: user }],
        text: { format: { type: "json_schema", name: "blurb", schema: SCHEMA, strict: true } },
      });
      if (!res.output_text) throw new WriterOutputError("the writer returned no output");
      try {
        return JSON.parse(res.output_text) as Written;
      } catch (err) {
        throw new WriterOutputError(`the writer returned invalid JSON: ${err instanceof Error ? err.message : String(err)}`);
      }
    },
  };
}
