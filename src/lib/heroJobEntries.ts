/**
 * heroJobEntries.ts — build-time inputs of the homepage hero's eval plan:
 * both research databases' published entries in the shape heroJobProof.ts
 * reads, and the pool built from them. Used by `/` (the entry count in the
 * greeting) and `/hero-job-cases.json` (the pool the island fetches).
 */
import { HERO_JOB_FAILURES } from "./heroJobAdvice";
import {
  buildHeroJobCasePool,
  type HeroJobCasePool,
  type HeroJobProofEntry,
} from "./heroJobProof";
import { type HeroJobPath, LABS_HERO_JOB } from "./labs-home";
import { getAllPublishedEntries } from "./llmops";
import { getAllPublishedMLOpsEntries } from "./mlops";

export async function loadHeroJobEntries(): Promise<HeroJobProofEntry[]> {
  return [
    ...(await getAllPublishedEntries()).map(({ data }) => ({
      source: "llmops" as const,
      slug: data.slug,
      title: data.title,
      company: data.company,
      summary: data.summary,
      year: data.year,
      tags: data.llmopsTags,
    })),
    ...(await getAllPublishedMLOpsEntries()).map(({ data }) => ({
      source: "mlops" as const,
      slug: data.slug,
      title: data.title,
      company: data.company,
      summary: data.summary,
      year: data.year,
      tags: data.mlopsTags,
    })),
  ];
}

/** Every `<question>:<value>` key each path's questions offer. */
export function heroJobAnswerKeys(): Record<HeroJobPath, string[]> {
  const keys = (path: HeroJobPath) =>
    LABS_HERO_JOB.paths[path].questions.flatMap((q) =>
      q.options.map((o) => `${q.id}:${o.value}`),
    );
  return { agent: keys("agent"), finetune: keys("finetune") };
}

export async function loadHeroJobCasePool(): Promise<HeroJobCasePool> {
  return buildHeroJobCasePool(
    await loadHeroJobEntries(),
    heroJobAnswerKeys(),
    HERO_JOB_FAILURES,
  );
}
