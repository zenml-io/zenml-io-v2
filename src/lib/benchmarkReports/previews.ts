/**
 * The small chart each benchmark shows on the /benchmarks hub: one metric,
 * three to six bars, read straight from that benchmark's public data file.
 * Values are the published ones; only the bar lengths are derived from them.
 */

import decisionAgents from "../../data/benchmarks/decision-agents.json";
import mlTrainingOps from "../../data/benchmarks/ml-training-ops.json";
import servingInfra from "../../data/benchmarks/serving-infra.json";
import sglang from "../../data/benchmarks/sglang-vs-vllm.json";
import swapbench from "../../data/benchmarks/swapbench.json";
import underwriting from "../../data/benchmarks/underwriting.json";
import { cents, pct } from "./format";
import type { BenchmarkPreview } from "./types";

function underwritingPreview(): BenchmarkPreview {
  const rows = underwriting.results.shared_rewritten_prompt_held_out;
  const top = Math.max(...rows.map((r) => r.accuracy));
  const tied = rows
    .filter((r) => (top - r.accuracy) * 100 <= underwriting.noise.sizePoints)
    .sort((a, b) => a.costPerCorrectCents - b.costPerCorrectCents);
  const name = (key: string) =>
    underwriting.models.find((m) => m.key === key)?.name ?? key;
  const shown = [...tied.slice(0, 3), tied[tied.length - 1]];
  return {
    metric: `Cost per correct decision, the ${tied.length} models tied at the top`,
    better: "lower",
    rows: shown.map((r, i) => ({
      label: name(r.model),
      value: r.costPerCorrectCents,
      display: cents(r.costPerCorrectCents),
      emphasis: i === 0,
    })),
  };
}

function swapbenchPreview(): BenchmarkPreview {
  const label: Record<string, string> = {
    "next-step agreement (5-pt threshold)": "Next-step agreement",
    "replay-60": "Full replay, 60 scenarios",
    "replay-260": "Full replay, 260 scenarios",
  };
  const decidable = swapbench.verifierTally[0].decidable;
  return {
    metric: `Right verdicts out of ${decidable} decidable swaps`,
    better: "higher",
    max: decidable,
    rows: swapbench.verifierTally.map((t) => ({
      label: label[t.check] ?? t.check,
      value: t.correct,
      display: `${t.correct} right, ${t.falseSafe + t.falseUnsafe} wrong`,
      emphasis:
        t.falseSafe + t.falseUnsafe === 0 &&
        t.correct ===
          Math.max(...swapbench.verifierTally.map((x) => x.correct)),
    })),
  };
}

function decisionAgentsPreview(): BenchmarkPreview {
  const domains = [
    ["claims:base", "Health appeals"],
    ["bva:base", "Veterans' appeals"],
    ["de_kr:base", "German health suits"],
  ] as const;
  const short = (key: string) => (key === "moe" ? "MoE" : "dense");
  return {
    metric: "Accuracy against real outcomes, two open models",
    better: "higher",
    max: 1,
    rows: domains.flatMap(([key, domain]) =>
      decisionAgents.results[key].map((r) => ({
        label: `${domain}, ${short(r.model)}`,
        value: r.accuracy,
        display: pct(r.accuracy),
      })),
    ),
  };
}

function servingInfraPreview(): BenchmarkPreview {
  const pick = (config: string) =>
    servingInfra.results.find(
      (r) =>
        r.harness === "mini-swe-agent" &&
        r.agents === 32 &&
        r.benchmark.startsWith("terminal") &&
        r.config === config,
    );
  const rows = [
    ["defaults", "H100"],
    ["h200", "H200"],
    ["b200", "B200"],
  ].flatMap(([config, gpu]) => {
    const r = pick(config);
    return r
      ? [{ label: gpu, value: r.accuracy, display: pct(r.accuracy) }]
      : [];
  });
  return {
    metric: "Terminal-Bench solve rate by GPU, mini-swe-agent at 32 agents",
    better: "higher",
    max: 1,
    rows: rows.map((r) => ({ ...r, emphasis: r.label === "B200" })),
  };
}

function sglangPreview(): BenchmarkPreview {
  const top = Math.max(...sglang.settings.map((s) => s.requests_completed));
  return {
    metric: "Requests completed on the same replayed traffic, one H100",
    better: "higher",
    rows: sglang.settings.map((s) => ({
      label: s.name.replace(/^stock /, "Stock "),
      value: s.requests_completed,
      display: String(s.requests_completed),
      emphasis: s.requests_completed === top,
    })),
  };
}

function mlTrainingOpsPreview(): BenchmarkPreview {
  const rows = mlTrainingOps.results["hard set (8 tasks)"].filter(
    (r) =>
      r.agents === 24 &&
      r.harness === "terminus-2" &&
      (r.config === "defaults" || r.config === "h200"),
  );
  return {
    metric: "Hard-set solve rate, terminus-2 at 24 agents",
    better: "higher",
    max: 1,
    rows: rows.map((r) => ({
      label: r.gpu,
      value: r.accuracy,
      display: `${r.correct} / ${r.n}`,
      emphasis: r.gpu === "H200",
    })),
  };
}

export const BENCHMARK_PREVIEWS: Record<string, BenchmarkPreview> = {
  underwriting: underwritingPreview(),
  swapbench: swapbenchPreview(),
  "decision-agents": decisionAgentsPreview(),
  "serving-infra": servingInfraPreview(),
  "sglang-vs-vllm": sglangPreview(),
  "ml-training-ops": mlTrainingOpsPreview(),
};
