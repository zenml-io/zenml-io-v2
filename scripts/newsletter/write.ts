import type OpenAI from "openai";
import type { Entry, Section } from "./entries";

export interface BlurbSentence { text: string; section: string }
export interface Written { sentences: BlurbSentence[]; hook: string | null }
export interface Writer { write(entry: Entry, o: { withHook: boolean; feedback?: string }): Promise<Written> }

/** The model answered, but not with usable JSON. API and network errors are not wrapped in this. */
export class WriterOutputError extends Error {}

export const WRITER_MODEL = "gpt-6-luna";
const MAX_WORDS = 55;

const SYSTEM = `You write two-sentence blurbs for "In Production", a newsletter of real-world LLMOps case studies. Readers are engineers who want to know what a team built and what they learned, so they can borrow the idea.
Rules:
- Exactly 2 sentences. Aim for at most 45 words in total (about 40 is ideal). Sentence 1: at most 20 words. Sentence 2: at most 25 words. Count before you answer.
- Sentence 1: what was built, technically. Name the architecture, technique or concrete moving parts (e.g. which components call which, what is retrieved, what is checked, where it runs). Take it from the section that describes the system or architecture, not the overview, when there is one.
- Technical sentences are easy to get wrong. Name at most three components, and describe how they connect (order, routing, data flow) only as the named section states it. Do not infer a step or a link the section does not spell out.
- Sentence 2: the most interesting technical detail, design trade-off, failure mode or lesson: something another engineering team could learn or reuse. Only state a trade-off, cause or lesson if the named section says so; otherwise use its most concrete stated technical detail.
- Mention the company at most once in the whole blurb, and never as the first words of a sentence (that includes the possessive, e.g. "Acme's agents ..."). Start with the system or technique instead. Spend the words on the system, not on who built it.
- Leave out user or customer counts, employee numbers, adoption figures, business outcomes, revenue or cost savings, and benchmark or evaluation scores. Only include a number when the number itself is the technical point (e.g. a threshold, a timeout, a tier count).
- Be specific: use the actual technique and component names the section gives. Avoid vague platform words ("platform", "governed", "enterprise-grade", "at scale", "end-to-end", "seamless", "leverages AI", "AI-powered") unless the same sentence says concretely what they mean.
- Each sentence may use facts from ONE section only, the section you name for it. Never combine facts from two sections in one sentence.
- Say one thing per sentence. Leave out extra detail rather than adding a clause. Do not add context, causes or claims the named section does not state.
- Copy figures exactly as the source states them. Do not calculate differences, round, or convert units.
- Keep any qualifier attached to its claim (e.g. "on its internal benchmark", "reportedly").
- Plain words. No hype adjectives ("revolutionary", "cutting-edge", "game-changing").
- For each sentence, give the exact heading of the one section it draws on.`;
const HOOK_RULE = `\n- Also write "hook": 3 to 7 plain words naming the technical idea, for an email subject line. No company name and no metric.`;
const EXAMPLE = (withHook: boolean) => `\n\nIllustrative only, about a made-up company: never reuse its words, names or numbers.
1. "A camera feeds each teapot to a small vision model, then Acme Kettle Co.'s rules engine picks its bin." (section: Sorting architecture)
2. "Glossy glaze fooled the model under workshop lights, so the team added a polarising filter instead of retraining." (section: Lessons learned)${withHook ? '\nhook: "Vision model plus rules sorts teapots"' : ""}`;

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
