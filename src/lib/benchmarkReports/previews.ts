/**
 * The small chart each benchmark shows on the /benchmarks hub: one metric,
 * three to six bars, read straight from that benchmark's public data file.
 * Values are the published ones; only the bar lengths are derived from them.
 */

import claimsOverTime from "../../data/benchmarks/claims-over-time.json";
import decisionAgents from "../../data/benchmarks/decision-agents.json";
import mlTrainingOps from "../../data/benchmarks/ml-training-ops.json";
import servingInfra from "../../data/benchmarks/serving-infra.json";
import sglang from "../../data/benchmarks/sglang-vs-vllm.json";
import swapbench from "../../data/benchmarks/swapbench.json";
import tau2Telecom from "../../data/benchmarks/tau2-telecom.json";
import underwriting from "../../data/benchmarks/underwriting.json";
import { cents, pct, points } from "./format";
import { modelMark } from "./marks";
import type { BenchmarkPreview } from "./types";

function claimsOverTimePreview(): BenchmarkPreview {
  const { lines, runs } = claimsOverTime;
  const appeals =
    claimsOverTime.dataset.batches * claimsOverTime.dataset.batchSize;
  const name = (key: string) => lines.find((l) => l.key === key)?.name ?? key;
  // Each improver's gain over the copy nobody touched, paired appeal by appeal.
  const rows = runs.second.paired.all
    .filter((d) => d.b === "left_alone")
    .map((d) => ({
      label: name(d.a),
      value: d.delta,
      display: `${points(d.delta)} points`,
      emphasis: d.a === "pro",
    }));
  return {
    metric: `Gain over the agent left alone, ${appeals} appeals`,
    better: "higher",
    context:
      "Balanced accuracy, paired appeal by appeal. Codex's gain is within the noise.",
    rows,
  };
}

function underwritingPreview(): BenchmarkPreview {
  const rows = underwriting.results.shared_rewritten_prompt_held_out;
  const top = Math.max(...rows.map((r) => r.accuracy));
  const tied = rows
    .filter((r) => (top - r.accuracy) * 100 <= underwriting.noise.sizePoints)
    .sort((a, b) => a.costPerCorrectCents - b.costPerCorrectCents);
  const model = (key: string) => underwriting.models.find((m) => m.key === key);
  const row = (r: (typeof tied)[number], i: number) => {
    const m = model(r.model);
    return {
      label: m?.name ?? r.model,
      value: r.costPerCorrectCents,
      display: cents(r.costPerCorrectCents),
      emphasis: i === 0,
      mark: m && modelMark(m.name, m.weights),
    };
  };
  return {
    metric: `Cost per correct decision, models tied at the top`,
    better: "lower",
    // The card: the two cheapest of the tied models against the priciest one.
    rows: [...tied.slice(0, 2), tied[tied.length - 1]].map(row),
    // The report: every tied model, cheapest first.
    reportRows: tied.map(row),
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
  const row = (a: (typeof arms)[number]) => ({
    label: a.role === "baseline" ? "GPT-5.2 (baseline)" : a.name,
    value: a.correct,
    display: `${a.correct} / ${a.n}`,
    mark: modelMark(a.name, a.weights),
  });
  // Models whose paired interval against the baseline stays above zero.
  const clearlyBetter = swaps.filter((a) => (a.paired?.ci95Points[0] ?? 0) > 0);
  return {
    metric: `Tasks solved out of ${tasks}`,
    better: "higher",
    max: tasks,
    rows: rows.map((a, i) => ({ ...row(a), emphasis: i === 0 })),
    // The report: every model clearly ahead, against the baseline.
    reportRows: [
      ...clearlyBetter.map((a) => ({ ...row(a), emphasis: true })),
      ...(baseline ? [{ ...row(baseline), reference: true }] : []),
    ],
  };
}

export const BENCHMARK_PREVIEWS: Record<string, BenchmarkPreview> = {
  "claims-over-time": claimsOverTimePreview(),
  underwriting: underwritingPreview(),
  swapbench: swapbenchPreview(),
  "decision-agents": decisionAgentsPreview(),
  "serving-infra": servingInfraPreview(),
  "sglang-vs-vllm": sglangPreview(),
  "ml-training-ops": mlTrainingOpsPreview(),
  "tau2-telecom": tau2TelecomPreview(),
};
