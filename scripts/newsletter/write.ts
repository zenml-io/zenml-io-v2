import type OpenAI from "openai";
import type { Entry, Section } from "./entries";

export interface BlurbSentence { text: string; section: string }
export interface Written { sentences: BlurbSentence[]; hook: string | null }
export interface Writer { write(entry: Entry, o: { withHook: boolean; feedback?: string }): Promise<Written> }

/** The model answered, but not with usable JSON. API and network errors are not wrapped in this. */
export class WriterOutputError extends Error {}

export const WRITER_MODEL = "gpt-6-luna";
const MAX_WORDS = 55;

const SYSTEM = `You write two-sentence blurbs for "In Production", a newsletter of real-world LLMOps case studies.
Rules:
- Exactly 2 sentences. Hard cap: at most 45 words in total (aim for about 40). Sentence 1: at most 20 words. Sentence 2: at most 25 words. Count before you answer.
- Sentence 1: what the company built. Sentence 2: the concrete result or technique.
- Each sentence may use facts from ONE section only, the section you name for it. Never combine facts from two sections in one sentence. If a result lives in a different section from the overview, name that section for sentence 2 and use only what that section says.
- Say one thing per sentence: one system, one result. Leave out extra detail rather than adding a clause. Do not add context, causes or claims the named section does not state.
- Copy figures exactly as the source states them. Do not calculate differences, round, or convert units.
- Keep any qualifier attached to its claim (e.g. "on its internal benchmark", "reportedly").
- Plain words. No hype adjectives ("revolutionary", "cutting-edge", "game-changing").
- For each sentence, give the exact heading of the one section it draws on.
Example (35 words):
1. "Harvey built a multi-agent system that reviews contracts against a legal playbook." (Overview)
2. "On its internal benchmark, redline quality rose from 53% to 87%." (Results and tradeoffs)`;
const HOOK_RULE = `\n- Also write "hook": 3 to 7 plain words summarising the case for an email subject line, without the company name.`;

export function buildWriterPrompt(entry: Entry, o: { withHook: boolean; feedback?: string }) {
  const body = entry.sections.map((s) => `## ${s.heading}\n\n${s.text}`).join("\n\n");
  const feedback = o.feedback ? `\n\nA previous attempt was rejected: ${o.feedback}\nFix that problem.` : "";
  return {
    system: SYSTEM + (o.withHook ? HOOK_RULE : ""),
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
