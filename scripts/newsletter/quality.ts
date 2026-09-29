import { choice, score } from "@typesafe-ai/sdk";
import type { Entry } from "./entries";
import { blurbText, sectionFor, type Written } from "./write";

// Pinned so a moving model alias can't shift the thresholds below. Re-check the thresholds before changing the version.
export const JEV_MODEL = "jev-1.13.0";
// Thresholds checked against a hand-labelled sample of 30 recent entries (Sep 2026).
export const WORTH_FLOOR = 0.5;
export const SUPPORT_CONFIDENCE_MIN = 0.8;
export const TONE_MAX = 0.75;

export interface JevLike {
  // biome-ignore lint/suspicious/noExplicitAny: answers are typed per question by the SDK; we read known fields.
  systemOne(req: { model: string; state: unknown; questions: Record<string, unknown> }): Promise<{ answers: Record<string, any> }>;
}
export interface WorthVerdict { slug: string; production: number; specificity: number; worth: number; keep: boolean }
export interface SentenceVerdict { text: string; section: string; relation: string; confidence: number; pass: boolean }
export interface BlurbVerdict { pass: boolean; sentences: SentenceVerdict[]; tone: number; reasons: string[] }

const PRODUCTION: [string, string, ...string[]] = ["The case describes plans, a prototype, or a pilot; nothing runs for real users yet",
  "The system is deployed for real users, but the case reports no outcomes",
  "The system is deployed and the case reports qualitative outcomes (faster, better) without figures",
  "The system is deployed and the case reports measured results with figures"];
const SPECIFICITY: [string, string, ...string[]] = ["The case names no techniques or components; it speaks only in general terms",
  "The case names tools or vendors but does not explain how they are used",
  "The case describes the approach: the steps or components and how they connect",
  "The case explains the architecture and the trade-offs or failure modes the team dealt with"];
const TONE: [string, string, ...string[]] = ["Plain, specific wording with no promotional adjectives",
  "Mostly specific, with one or two marketing adjectives",
  "Hype-driven: superlatives or vague claims such as revolutionary or game-changing"];

/**
 * Jev Score is 0-indexed. Confirmed against the live jev-1.13.0 API: a top-level text scored 3 of levels 0-3, a bottom-level text 0.
 */
export const normaliseScore = (s: number, levels: number) => s / (levels - 1);

export function decideWorth(slug: string, a: { production: number; specificity: number }): WorthVerdict {
  const worth = 0.5 * a.production + 0.5 * a.specificity;
  return { slug, ...a, worth, keep: worth >= WORTH_FLOOR };
}

export async function judgeWorth(jev: JevLike, entry: Entry): Promise<WorthVerdict> {
  const { answers } = await jev.systemOne({
    model: JEV_MODEL,
    state: { title: entry.title, company: entry.company, summary: entry.summary },
    questions: {
      production: score("How much evidence of production use does the case study in `summary` give?", PRODUCTION),
      specificity: score("How technically specific is the case study in `summary`?", SPECIFICITY),
    },
  });
  return decideWorth(entry.slug, {
    production: normaliseScore(answers.production.score, PRODUCTION.length),
    specificity: normaliseScore(answers.specificity.score, SPECIFICITY.length),
  });
}

export function decideBlurb(sentences: SentenceVerdict[], tone: number): BlurbVerdict {
  const reasons = sentences.flatMap((s, i) => (s.pass ? [] : [`sentence ${i + 1}: ${s.relation} at confidence ${s.confidence.toFixed(2)} (need ${SUPPORT_CONFIDENCE_MIN})`]));
  if (tone > TONE_MAX) reasons.push(`tone too promotional (${tone.toFixed(2)})`);
  return { pass: reasons.length === 0, sentences, tone, reasons };
}

export async function judgeBlurb(jev: JevLike, entry: Entry, w: Written): Promise<BlurbVerdict> {
  const sentenceChecks = w.sentences.map(async (s): Promise<SentenceVerdict> => {
    const section = sectionFor(entry, s.section);
    if (!section) return { ...s, relation: "unknown_section", confidence: 0, pass: false };
    const { answers } = await jev.systemOne({
      model: JEV_MODEL,
      state: { sentence: s.text, section: section.text },
      questions: { relation: choice("How does `section` relate to the claims made in `sentence`?", {
        supports: "`section` states or directly implies every claim in `sentence`, including any figures",
        contradicts: "`section` states something that conflicts with a claim in `sentence`",
        says_nothing: "`section` does not address at least one claim in `sentence`",
      }) },
    });
    const { choice: relation, confidence } = answers.relation;
    return { ...s, relation, confidence, pass: relation === "supports" && confidence >= SUPPORT_CONFIDENCE_MIN };
  });
  const toneCheck = jev.systemOne({ model: JEV_MODEL, state: { blurb: blurbText(w) },
    questions: { tone: score("How promotional is the wording of `blurb`?", TONE) } });
  const [sentences, { answers }] = await Promise.all([Promise.all(sentenceChecks), toneCheck]);
  return decideBlurb(sentences, normaliseScore(answers.tone.score, TONE.length));
}

const MIN_FALLBACK_WORDS = 8;
/** First sentence of the summary, extended past boundaries that leave a fragment (e.g. "U.S."). */
export function fallbackBlurb(entry: Entry): string {
  const text = entry.summary.trim();
  for (const m of text.matchAll(/[.!?](?=\s+[A-Z“"]|$)/g)) {
    const candidate = text.slice(0, (m.index ?? 0) + 1);
    if (candidate.split(/\s+/).length >= MIN_FALLBACK_WORDS) return candidate;
  }
  return text;
}
