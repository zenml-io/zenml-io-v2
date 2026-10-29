/**
 * Every published benchmark report, newest first. A benchmark is listed here
 * only once its numbers are cleared for publication: its export's
 * `public_safety` items are stripped and nothing it marks as private or
 * disputed is shown.
 */

import { buildClaimsOverTime } from "./claims-over-time";
import { buildDecisionAgents } from "./decision-agents";
import { buildMlTrainingOps } from "./ml-training-ops";
import { buildServingInfra } from "./serving-infra";
import { buildSglangVsVllm } from "./sglang-vs-vllm";
import { buildSwapbench } from "./swapbench";
import { buildTau2Telecom } from "./tau2-telecom";
import type { BenchmarkIndustry, BenchmarkReport } from "./types";
import { buildUnderwriting } from "./underwriting";

export { BENCHMARK_PREVIEWS } from "./previews";
export type * from "./types";

export const BENCHMARK_REPORTS: readonly BenchmarkReport[] = [
  buildClaimsOverTime(),
  buildUnderwriting(),
  buildSwapbench(),
  buildDecisionAgents(),
  buildServingInfra(),
  buildSglangVsVllm(),
  buildMlTrainingOps(),
  buildTau2Telecom(),
].sort((a, b) => b.date.localeCompare(a.date));

/**
 * The hub's sections, one per industry, in page order. Insurance leads and
 * renders as the featured band: it is the industry we build for first.
 */
export const BENCHMARK_INDUSTRIES: readonly {
  id: BenchmarkIndustry;
  title: string;
  intro: string;
  featured?: true;
}[] = [
  {
    id: "insurance",
    title: "Insurance",
    intro:
      "Underwriting, claims and appeals agents on public insurance data: who keeps an agent improving, which model to run, what each correct decision costs, and how often a rerun changes the answer.",
    featured: true,
  },
  {
    id: "customer-service",
    title: "Customer service and telecom",
    intro:
      "Support agents that take actions for customers: whether a model swap is safe, and how to tell before it ships.",
  },
  {
    id: "infrastructure",
    title: "AI infrastructure",
    intro:
      "Self-hosted agents on GPUs, for any industry: how hardware, load and the serving engine change what gets solved and what it costs.",
  },
];
