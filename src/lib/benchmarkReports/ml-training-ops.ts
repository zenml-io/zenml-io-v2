/**
 * ML-training-operations benchmark report: a self-hosted 27B model fixing
 * injected faults in training jobs under different GPU, load and serving
 * settings. A stopped study: frontier agents solved nearly every task. Reads
 * the whitelisted public export in src/data/benchmarks/ml-training-ops.json,
 * which keeps only the self-hosted runs (vendor-API results are not cleared).
 */

import mlops from "../../data/benchmarks/ml-training-ops.json";
import { cents, longDate, pointInterval, points } from "./format";
import type { BenchmarkReport, ReportTable, TableCell } from "./types";

type Row = (typeof mlops.results)["hard set (8 tasks)"][number];

const HARNESSES = ["terminus-2", "mini-swe-agent"] as const;

/** Hard-set setups in display order; `change` is the paired-comparison key. */
const HARD_SETUPS = [
  {
    config: "defaults",
    agents: 24,
    change: null,
    label: "H100, 24 agents (baseline)",
  },
  {
    config: "defaults",
    agents: 8,
    change: "defaults c8",
    label: "8 agents instead of 24",
  },
  {
    config: "h200",
    agents: 24,
    change: "h200 c24",
    label: "H200 instead of H100",
  },
  {
    config: "defaults-2x-time",
    agents: 24,
    change: "defaults-2x-time c24",
    label: "Time limit doubled to 60 min",
  },
  {
    config: "max-out-4k",
    agents: 24,
    change: "max-out-4k c24",
    label: "Output capped at 4,096 tokens",
  },
  {
    config: "max-out-8k",
    agents: 24,
    change: "max-out-8k c24",
    label: "Output capped at 8,192 tokens",
  },
  {
    config: "max-out-16k",
    agents: 24,
    change: "max-out-16k c24",
    label: "Output capped at 16,384 tokens",
  },
  {
    config: "no-thinking",
    agents: 24,
    change: "no-thinking c24",
    label: "Reasoning off",
  },
  {
    config: "moe-a3b",
    agents: 24,
    change: "moe-a3b c24",
    label: "MoE model (Qwen3.6-35B-A3B)",
  },
] as const;

export function buildMlTrainingOps(): BenchmarkReport {
  const m = mlops;
  const hard = m.results["hard set (8 tasks)"];
  const v2 = m.results["v2 set (4 tasks)"];
  const pilot = m.results["v1 pilot (6 tasks)"];

  const row = (rows: Row[], harness: string, config: string, agents: number) =>
    rows.find(
      (r) =>
        r.harness === harness && r.config === config && r.agents === agents,
    );
  const paired = (harness: string, change: string) =>
    m.paired.find((c) => c.harness === harness && c.change === change);
  const solved = (r?: Row) =>
    r ? `${r.correct} / ${r.n}${r.runs === 1 ? " *" : ""}` : "";
  const delta = (harness: string, change: string | null): TableCell => {
    if (!change) return { text: "baseline", muted: true };
    const c = paired(harness, change);
    return c
      ? { text: `${points(c.deltaPoints)} ${pointInterval(c.ci95Points)}` }
      : { text: "" };
  };
  const significant = (harness: string, change: string) => {
    const c = paired(harness, change);
    return c ? c.ci95Points[0] > 0 || c.ci95Points[1] < 0 : false;
  };
  const singleRunFoot =
    "* One run of 3 attempts per task (24 trials); every other row pools two runs (48 trials). Differences are paired against the baseline over the same 8 tasks; a 95% interval that includes 0 is no difference.";

  const hardTable: ReportTable = {
    title: "Hard set: what moves the solve rate",
    caption:
      "Qwen3.8-27B on 8 training-operations tasks, 3 attempts per task per run, each setup compared with the same model on one H100 serving 24 agents at once.",
    columns: [
      { label: "Setup" },
      { label: "terminus-2 solved", align: "right" },
      { label: "vs. baseline (points)", align: "right" },
      { label: "mini-swe-agent solved", align: "right" },
      { label: "vs. baseline (points)", align: "right" },
    ],
    rows: HARD_SETUPS.map((s) => ({
      highlight:
        s.change !== null &&
        HARNESSES.every(
          (h) =>
            significant(h, s.change) &&
            (paired(h, s.change)?.deltaPoints ?? 0) > 0,
        ),
      cells: [
        { text: s.label },
        { text: solved(row(hard, "terminus-2", s.config, s.agents)) },
        delta("terminus-2", s.change),
        { text: solved(row(hard, "mini-swe-agent", s.config, s.agents)) },
        delta("mini-swe-agent", s.change),
      ],
    })),
    footnote: `${singleRunFoot} Highlighted: setups that helped with both harnesses beyond noise.`,
  };

  const v2Table: ReportTable = {
    title: "Harder v2 tasks: H100 vs. H200",
    caption:
      "4 tasks (3 new plus one from the hard set), 6 attempts per task, one run per GPU, 24 agents at once.",
    columns: [
      { label: "Harness" },
      { label: "H100 solved", align: "right" },
      { label: "H200 solved", align: "right" },
      { label: "Difference (points, 95% CI)", align: "right" },
    ],
    rows: HARNESSES.map((h) => {
      const c = paired(h, "h200 c24 (v2 set)");
      return {
        cells: [
          { text: h },
          { text: solved(row(v2, h, "defaults", 24)).replace(" *", "") },
          { text: solved(row(v2, h, "h200", 24)).replace(" *", "") },
          {
            text: c
              ? `${points(c.deltaPoints)} ${pointInterval(c.ci95Points)}`
              : "",
          },
        ],
      };
    }),
    footnote: "Paired over 4 tasks, so the intervals are wide.",
  };

  const costTable: ReportTable = {
    title: "GPU cost per solved task",
    caption:
      "Hard set. GPU time for the whole run at the list hourly price, divided by solved trials. Sandbox cost is left out (it was estimated, not billed per run).",
    columns: [
      { label: "Setup" },
      { label: "GPU", align: "right" },
      { label: "terminus-2", align: "right" },
      { label: "mini-swe-agent", align: "right" },
    ],
    rows: HARD_SETUPS.map((s) => {
      const t = row(hard, "terminus-2", s.config, s.agents);
      const n = row(hard, "mini-swe-agent", s.config, s.agents);
      return {
        cells: [
          { text: s.label },
          { text: t?.gpu ?? n?.gpu ?? "", muted: true },
          { text: t ? cents(t.gpuCostPerSolveCents) : "" },
          { text: n ? cents(n.gpuCostPerSolveCents) : "" },
        ],
      };
    }),
  };

  const families = m.dataset.types
    .map((t) => t.type)
    .filter((t) => /^[A-D]\. /.test(t));
  const heat = (correct: number, n: number): 0 | 1 | 2 | 3 => {
    const miss = 1 - correct / n;
    return miss === 0 ? 0 : miss < 0.25 ? 1 : miss < 0.5 ? 2 : 3;
  };
  const familyTable = (harness: (typeof HARNESSES)[number]): ReportTable => ({
    title: `By task family, ${harness}`,
    caption:
      "Hard set, 2 tasks per family. Solved trials per family and setup.",
    columns: [
      { label: "Setup" },
      ...families.map((f) => ({ label: f, align: "right" as const })),
    ],
    rows: HARD_SETUPS.map((s) => {
      const entry = m.perType[harness].find(
        (p) => p.config === s.config && p.agents === s.agents,
      );
      const types = entry?.types as
        | Record<string, { n: number; correct: number }>
        | undefined;
      return {
        cells: [
          { text: s.label },
          ...families.map((f): TableCell => {
            const cell = types?.[f];
            return cell
              ? {
                  text: `${cell.correct} / ${cell.n}`,
                  level: heat(cell.correct, cell.n),
                }
              : { text: "", muted: true };
          }),
        ],
      };
    }),
    footnote: "Darker cells missed more trials in that family.",
  });

  const failureLabels: Record<string, string> = {
    timeout: "Hit the time limit",
    "finished wrong": "Finished, test failed",
    "agent exited with error": "Harness exited with an error",
    "other error (SandboxLikelyOutOfMemoryError)": "Sandbox ran out of memory",
  };
  const failureTable: ReportTable = {
    title: "How the unsolved trials ended",
    caption:
      "Every self-hosted run, all task sets. Unsolved trials by how they ended.",
    columns: [
      { label: "Model" },
      ...m.failures.map((f) => ({
        label: failureLabels[f.category] ?? f.category,
        align: "right" as const,
      })),
    ],
    rows: m.models.map((model) => ({
      cells: [
        { text: model.name },
        ...m.failures.map((f) => {
          const count = f.counts[model.id as keyof typeof f.counts] ?? 0;
          return count ? { text: String(count) } : { text: "0", muted: true };
        }),
      ],
    })),
  };

  const t2Base = row(hard, "terminus-2", "defaults", 24);
  const t2Cap8 = row(hard, "terminus-2", "max-out-8k", 24);
  const t2CheapestH100 = hard
    .filter(
      (r) =>
        r.harness === "terminus-2" &&
        r.gpu === "H100" &&
        r.model === "Qwen/Qwen3.8-27B",
    )
    .sort((a, b) => a.gpuCostPerSolveCents - b.gpuCostPerSolveCents)[0];
  const h200 = (h: string) => paired(h, "h200 c24");
  const fewer = paired("mini-swe-agent", "defaults c8");
  const fewerT2 = paired("terminus-2", "defaults c8");
  const cap8 = paired("mini-swe-agent", "max-out-8k c24");
  const v2t = (gpu: string) =>
    row(v2, "terminus-2", gpu === "H100" ? "defaults" : "h200", 24);
  const pilotAllSolved = pilot.every((r) => r.correct === r.n);
  const pilotTrials = pilot[0]?.n ?? 0;
  const timeouts =
    m.failures.find((f) => f.category === "timeout")?.counts[
      "Qwen/Qwen3.8-27B"
    ] ?? 0;
  const unsolved27b = m.failures.reduce(
    (sum, f) =>
      sum + (f.counts["Qwen/Qwen3.8-27B" as keyof typeof f.counts] ?? 0),
    0,
  );
  const typeCount = (prefix: string) =>
    m.dataset.types
      .filter((t) => t.type.startsWith(prefix))
      .reduce((sum, t) => sum + t.count, 0);

  return {
    slug: "ml-training-ops",
    group: "infrastructure",
    date: m.meta.runEnd,
    card: {
      headline: {
        value: `${points(h200("terminus-2")?.deltaPoints ?? 0)} pts`,
        label: "solve rate from an H200 (terminus-2)",
      },
      domain: "ML training operations",
      data: "Own tasks · stopped study",
      finding: `On a self-hosted 27B model, an H200 instead of an H100 raised the solve rate by ${points(h200("terminus-2")?.deltaPoints ?? 0)} points with terminus-2. We stopped the study because frontier agents solved nearly every task.`,
      stats: [
        { value: String(m.dataset.totalCases), label: "tasks built" },
        {
          value: points(h200("terminus-2")?.deltaPoints ?? 0),
          label: "points from an H200 (terminus-2)",
        },
        {
          value: `${v2t("H100")?.correct} → ${v2t("H200")?.correct}`,
          label: `of ${v2t("H100")?.n} solved on harder tasks`,
        },
      ],
    },
    title: "Can a self-hosted agent run ML training operations?",
    eyebrow: "Benchmark · Serving infrastructure",
    deck: `A self-hosted 27B model fixes injected faults in training jobs: distributed runs, checkpoints, out-of-memory errors, stragglers and scheduling quotas. We measured how GPU, load and serving settings change how many it solves. The study is stopped.`,
    seoTitle:
      "ML training operations agent benchmark: GPU and serving settings",
    seoDescription: `A self-hosted Qwen3.8-27B agent on ${m.dataset.totalCases} ML training-operations tasks: an H200 raised its solve rate by ${points(h200("terminus-2")?.deltaPoints ?? 0)} points, fewer agents per GPU and an output cap helped too. A stopped study, with full results and method.`,
    facts: [
      {
        label: "Status",
        value: "Stopped: frontier agents saturated the tasks",
      },
      {
        label: "Run",
        value: `${longDate(m.meta.runStart)} to ${longDate(m.meta.runEnd)}`,
      },
      {
        label: "Tasks",
        value: `${m.dataset.totalCases}, built for this study`,
      },
      { label: "Model", value: "Qwen3.8-27B, self-hosted on vLLM" },
      { label: "Harnesses", value: HARNESSES.join(", ") },
      { label: "Grading", value: "Deterministic test per task" },
    ],
    findings: [
      "We stopped building harder tasks: across five rounds, frontier coding agents on vendor APIs solved nearly every task, so the set no longer tells strong agents apart. Their results are not published here. What stands is the self-hosted result below.",
      `On the 8-task hard set, an H200 instead of an H100 at 24 agents raised Qwen3.8-27B's solve rate by ${points(h200("terminus-2")?.deltaPoints ?? 0)} points with terminus-2 and ${points(h200("mini-swe-agent")?.deltaPoints ?? 0)} with mini-swe-agent, both with intervals above zero.`,
      `On the harder v2 tasks the GPU mattered more: terminus-2 solved ${v2t("H100")?.correct} of ${v2t("H100")?.n} trials on the H100 and ${v2t("H200")?.correct} of ${v2t("H200")?.n} on the H200.`,
      `Fewer agents per GPU helped mini-swe-agent: 8 instead of 24 raised its solve rate by ${points(fewer?.deltaPoints ?? 0)} points ${pointInterval(fewer?.ci95Points ?? [0, 0])}, while terminus-2's ${points(fewerT2?.deltaPoints ?? 0)} ${pointInterval(fewerT2?.ci95Points ?? [0, 0])} was within noise. Capping output at 8,192 tokens per call raised it by ${points(cap8?.deltaPoints ?? 0)} ${pointInterval(cap8?.ci95Points ?? [0, 0])}${t2CheapestH100 === t2Cap8 ? `, and gave terminus-2 its lowest GPU cost per solve on an H100: ${cents(t2Cap8?.gpuCostPerSolveCents ?? 0)} against ${cents(t2Base?.gpuCostPerSolveCents ?? 0)} at defaults` : ""}.`,
      `Most unsolved trials ran out of time: ${timeouts} of Qwen3.8-27B's ${unsolved27b} unsolved trials hit the time limit. Identical runs differed by up to 7 solves out of 24, so single-run differences are rough.`,
    ],
    sections: [
      {
        id: "results",
        title: "Results",
        intro: pilotAllSolved
          ? `On the 6-task pilot every setup solved ${pilotTrials} of ${pilotTrials} trials, so the pilot showed no serving effect. The tables below are the hard and v2 sets, where it did.`
          : undefined,
        tables: [hardTable, v2Table, costTable],
      },
      {
        id: "by-family",
        title: "By task family",
        intro:
          "The hard set has two tasks in each of four families: distributed jobs, diagnosis from telemetry, checkpointing and recovery, and resource limits and scheduling.",
        tables: [familyTable("terminus-2"), familyTable("mini-swe-agent")],
      },
      {
        id: "failures",
        title: "Failures",
        tables: [failureTable],
      },
    ],
    method: [
      {
        term: "Tasks",
        detail: `${m.dataset.source} ${m.dataset.totalCases} tasks in five rounds: a ${typeCount("v1")}-task pilot, an 8-task hard set (families A to D), a 4-task v2 set, ${typeCount("v3")} v3 tasks and ${typeCount("real-system")} tasks on a real training stack (torchtitan, 2 GPUs). The self-hosted model ran the pilot, hard and v2 sets.`,
      },
      {
        term: "Agent",
        detail: `Qwen3.8-27B (and, once per harness, Qwen3.6-35B-A3B in FP8) served by vLLM 0.31.0 on our own GPUs with a ${m.limits.self_hosted_context_tokens.toLocaleString("en-US")}-token context. Two open harnesses drive it: terminus-2 (a tmux session) and mini-swe-agent (bash). Each trial runs in its own sandbox.`,
      },
      {
        term: "Limits",
        detail: `${m.limits.agent_time_limit_s["hard/v2/v3"] / 60} minutes per trial on the hard and v2 sets (${m.limits.agent_time_limit_s.v1 / 60} on the pilot; ${m.limits.agent_time_limit_s["defaults-2x-time"] / 60} in the doubled-time setup).`,
      },
      {
        term: "Grading",
        detail: `A deterministic test per task recomputes the result, injects faults and checks hidden seeds (and golden loss curves on the torchtitan tasks). No model grades. Every task was checked both ways: the reference fix passes and doing nothing fails; three hard-set tasks were also checked with a partial fix that fails. Timeouts, harness errors and setup failures count as unsolved.`,
      },
      {
        term: "Noise",
        detail: `Every self-hosted hard-set setup ran twice, 3 attempts per task each, except the 4,096 and 16,384-token caps and the MoE model. Identical runs differed by up to 7 solves out of 24 (mini-swe-agent with reasoning off: 8 and 15); the H100 baseline repeated at 17 and 17 (terminus-2) and 14 and 17 (mini-swe-agent). Differences are paired over tasks with a bootstrap (${m.noise.resamples.toLocaleString("en-US")} resamples); a 95% interval that includes 0 is no difference.`,
      },
      {
        term: "Cost",
        detail:
          "GPU cost per solved task = GPU time for the whole run at the list hourly price (H100 or H200), divided by solved trials. Sandbox cost is not included.",
      },
    ],
    limitations: [
      ...m.limitations.filter((l) => !l.startsWith("Sandbox cost")),
      "The v3 and torchtitan tasks were only run with frontier agents on vendor APIs; those results are not published here.",
      "Cost per solve counts GPU time only; the sandbox cost was estimated and is left out.",
    ],
    datasets: [],
    sources: [
      {
        label: "vLLM, the serving engine",
        href: "https://github.com/vllm-project/vllm",
      },
      {
        label: "mini-swe-agent",
        href: "https://github.com/SWE-agent/mini-swe-agent",
      },
      {
        label: "torchtitan, the training stack in the real-system tasks",
        href: "https://github.com/pytorch/torchtitan",
      },
    ],
  };
}
