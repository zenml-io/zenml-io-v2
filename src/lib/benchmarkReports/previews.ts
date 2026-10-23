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
import tau2Telecom from "../../data/benchmarks/tau2-telecom.json";
import underwriting from "../../data/benchmarks/underwriting.json";
import type { ModelMark } from "../labs-home";
import { cents, pct } from "./format";
import type { BenchmarkPreview } from "./types";

/** A model's mark from its name and weights: a brand icon where one exists, else the open-weights glyph. */
function modelMark(name: string, weights: string): ModelMark | undefined {
  if (/^claude/i.test(name)) return "anthropic";
  if (/^gpt/i.test(name)) return "openai";
  if (/^deepseek/i.test(name)) return "deepseek";
  if (/^qwen/i.test(name)) return "qwen";
  if (/^glm/i.test(name)) return "zai";
  return weights === "open" ? "open" : undefined;
}

function underwritingPreview(): BenchmarkPreview {
  const rows = underwriting.results.shared_rewritten_prompt_held_out;
  const top = Math.max(...rows.map((r) => r.accuracy));
  const tied = rows
    .filter((r) => (top - r.accuracy) * 100 <= underwriting.noise.sizePoints)
    .sort((a, b) => a.costPerCorrectCents - b.costPerCorrectCents);
  const model = (key: string) => underwriting.models.find((m) => m.key === key);
  // The two cheapest of the tied models against the priciest one.
  const shown = [...tied.slice(0, 2), tied[tied.length - 1]];
  return {
    metric: `Cost per correct decision, models tied at the top`,
    context: `One shared prompt, ${underwriting.dataset.heldOut} held-out cases. The two cheapest and the priciest of the ${tied.length} models within noise of the top score.`,
    better: "lower",
    rows: shown.map((r, i) => {
      const m = model(r.model);
      return {
        label: m?.name ?? r.model,
        value: r.costPerCorrectCents,
        display: cents(r.costPerCorrectCents),
        emphasis: i === 0,
        mark: m && modelMark(m.name, m.weights),
      };
    }),
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
    metric: `Right verdicts out of ${decidable} swaps`,
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
  // One model across the three domains; the report has both models.
  const model = decisionAgents.models[0];
  return {
    metric: `Accuracy against real outcomes, ${model.name}`,
    better: "higher",
    max: 1,
    rows: domains.flatMap(([key, domain]) =>
      decisionAgents.results[key]
        .filter((r) => r.model === model.key)
        .map((r) => ({
          label: domain,
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
    metric: "Terminal-Bench solve rate by GPU",
    context: "mini-swe-agent with 32 agents on one GPU, same model and tasks.",
    better: "higher",
    max: 1,
    rows: rows.map((r) => ({ ...r, emphasis: r.label === "B200" })),
  };
}

function sglangPreview(): BenchmarkPreview {
  const top = Math.max(...sglang.settings.map((s) => s.requests_completed));
  return {
    metric: "Requests completed on the same traffic, one H100",
    context:
      "Replayed coding-agent traffic. The third bar is SGLang's best setting.",
    better: "higher",
    // Stock vLLM, stock SGLang, and SGLang's best setting.
    rows: [
      ...sglang.settings.filter((s) => s.name.startsWith("stock ")),
      sglang.settings
        .filter((s) => !s.name.startsWith("stock "))
        .reduce((best, s) =>
          s.requests_completed > best.requests_completed ? s : best,
        ),
    ].map((s) => ({
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
    metric: "Hard-set solve rate",
    context: "terminus-2 with 24 agents on one GPU, 8 tasks.",
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

function tau2TelecomPreview(): BenchmarkPreview {
  const { arms, tasks } = tau2Telecom.replay;
  const swaps = arms
    .filter((a) => a.role === "swap")
    .sort((a, b) => b.accuracy - a.accuracy);
  const baseline = arms.find((a) => a.role === "baseline");
  const rows = [swaps[0], baseline, swaps[swaps.length - 1]].flatMap((a) =>
    a ? [a] : [],
  );
  return {
    metric: `Tasks solved out of ${tasks}`,
    better: "higher",
    max: tasks,
    context: `Full Kitaru replays on tau2-bench Telecom's ${tasks} test tasks: the top model, the GPT-5.2 baseline and the lowest model.`,
    rows: rows.map((a, i) => ({
      label: a.role === "baseline" ? "GPT-5.2 (baseline)" : a.name,
      value: a.correct,
      display: `${a.correct} / ${a.n}`,
      emphasis: i === 0,
      mark: modelMark(a.name, a.weights),
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
  "tau2-telecom": tau2TelecomPreview(),
};
