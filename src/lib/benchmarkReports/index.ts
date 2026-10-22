/**
 * Every published benchmark report, newest first. A benchmark is listed here
 * only once its numbers are cleared for publication: its export's
 * `public_safety` items are stripped and nothing it marks as private or
 * disputed is shown.
 */

import { buildDecisionAgents } from "./decision-agents";
import { buildMlTrainingOps } from "./ml-training-ops";
import { buildServingInfra } from "./serving-infra";
import { buildSglangVsVllm } from "./sglang-vs-vllm";
import { buildSwapbench } from "./swapbench";
import type { BenchmarkGroup, BenchmarkReport } from "./types";
import { buildUnderwriting } from "./underwriting";

export type * from "./types";

export const BENCHMARK_REPORTS: readonly BenchmarkReport[] = [
  buildUnderwriting(),
  buildSwapbench(),
  buildDecisionAgents(),
  buildServingInfra(),
  buildSglangVsVllm(),
  buildMlTrainingOps(),
].sort((a, b) => b.date.localeCompare(a.date));

export const BENCHMARK_GROUPS: readonly {
  id: BenchmarkGroup;
  title: string;
  intro: string;
}[] = [
  {
    id: "agents",
    title: "Agents and models",
    intro:
      "Models inside real agent work: which one to run, whether a swap is safe, and what each correct answer costs.",
  },
  {
    id: "infrastructure",
    title: "Serving infrastructure",
    intro:
      "Self-hosted agents on GPUs: how hardware, load and the serving engine change what gets solved and what it costs.",
  },
];
