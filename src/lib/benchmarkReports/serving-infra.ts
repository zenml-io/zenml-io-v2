/**
 * Serving-infrastructure benchmark report: one self-hosted open model behind
 * vLLM, run by four agent harnesses on Terminal-Bench 2.0 and GAIA while the
 * GPU, the load on it and the serving settings change. Reads the whitelisted
 * public export in src/data/benchmarks/serving-infra.json.
 *
 * Cost is GPU time only (run time × list price per GPU-hour). The export's
 * sandbox cost is an estimate that under-counts the bill, so it and every
 * figure built on it are left out.
 */

import infra from "../../data/benchmarks/serving-infra.json";
import {
  cents,
  interval,
  longDate,
  pct,
  pointInterval,
  points,
} from "./format";
import type { BenchmarkReport, ReportTable, TableCell } from "./types";

type Result = (typeof infra.results)[number];
type Paired = (typeof infra.paired.terminalBench)[number];

const CONFIG_LABELS: Record<string, string> = {
  defaults: "vLLM defaults",
  b200: "B200 instead of H100",
  h200: "H200 instead of H100",
  "h200-spec-mtp": "H200 with speculative decoding",
  "spec-mtp": "Speculative decoding (MTP)",
  "kv-fp8": "FP8 KV cache",
  "weights-fp8": "FP8 weights",
  "moe-a3b": "MoE model (3B active)",
  "no-prefix-cache": "Prefix caching off",
  "no-thinking": "Thinking off",
  "defaults-2x-time": "2× time limit",
  "defaults-4x-time": "4× time limit",
};

const FAILURE_LABELS: Record<string, string> = {
  "out of time, working": "Out of time, still working",
  "out of time, looping": "Out of time, looping",
  "finished wrong": "Finished wrong",
  "never started": "Never started",
  "looked up answer": "Looked up the answer",
  "other error": "Other error",
};

const TB = "terminal-bench-2.0";
const HARNESSES = ["terminus-2", "mini-swe-agent"] as const;

export function buildServingInfra(): BenchmarkReport {
  const d = infra;
  // Pre-registered effects are published in whole points.
  const whole = (x: number) => (x > 0 ? `+${x}` : String(x).replace("-", "−"));
  const config = (key: string) => CONFIG_LABELS[key] ?? key;
  const find = (harness: string, cfg: string, agents: number, benchmark = TB) =>
    d.results.find(
      (r) =>
        r.harness === harness &&
        r.config === cfg &&
        r.agents === agents &&
        r.benchmark === benchmark,
    );
  const must = (r: Result | undefined) => {
    if (!r) throw new Error("serving-infra: missing result row");
    return r;
  };
  const diff = (p: { diffPts: number; ci95Pts: number[] }) =>
    `${points(p.diffPts)} ${pointInterval(p.ci95Pts)}`;
  const excludesZero = (p: { ci95Pts: number[] }) =>
    p.ci95Pts[0] > 0 || p.ci95Pts[1] < 0;
  const changeLabel = (change: string) => {
    const [cfg, agents] = change.split(" ");
    return cfg === "defaults"
      ? `${agents.replace("c", "")} agents instead of 32`
      : config(cfg);
  };
  const resultCells = (r: Result): TableCell[] => [
    { text: `${r.correct} / ${r.n}` },
    { text: pct(r.accuracy) },
    { text: interval(r.ci95), muted: true },
    { text: cents(r.gpuCostPerSolvedCents) },
  ];
  const resultColumns = [
    { label: "Solved", align: "right" as const },
    { label: "Solve rate", align: "right" as const },
    { label: "95% CI", align: "right" as const },
    { label: "GPU cost per solved task", align: "right" as const },
  ];

  const pairedTable = (
    rows: Paired[],
    title: string,
    caption: string,
  ): ReportTable => ({
    title,
    caption,
    columns: [
      { label: "Change from one H100 with 32 agents" },
      { label: "terminus-2 (points, 95% CI)", align: "right" },
      { label: "mini-swe-agent (points, 95% CI)", align: "right" },
    ],
    rows: rows.map((p) => ({
      highlight: excludesZero(p.terminus2) && excludesZero(p.miniSweAgent),
      cells: [
        { text: changeLabel(p.change) },
        { text: diff(p.terminus2), muted: !excludesZero(p.terminus2) },
        { text: diff(p.miniSweAgent), muted: !excludesZero(p.miniSweAgent) },
      ],
    })),
    footnote:
      "Differences in solve rate, paired by task. Highlighted rows changed both harnesses with intervals that exclude zero; grey values have intervals that include it. Many comparisons were made, so a few intervals excluding zero are expected by chance.",
  });

  const loadLevels = [
    ...new Set(
      d.results
        .filter((r) => r.config === "defaults" && r.benchmark === TB)
        .map((r) => r.agents),
    ),
  ].sort((a, b) => a - b);
  const loadTable: ReportTable = {
    title: "Load: agents sharing one H100",
    caption: `vLLM defaults on one H100, Terminal-Bench (${d.dataset.keptCases[TB]} tasks). Every trial counts, including ones that never started.`,
    columns: [
      { label: "Harness" },
      { label: "Agents per GPU", align: "right" },
      ...resultColumns,
    ],
    rows: HARNESSES.flatMap((harness) =>
      loadLevels.flatMap((agents) => {
        const r = find(harness, "defaults", agents);
        return r
          ? [
              {
                cells: [
                  { text: harness },
                  { text: String(agents) },
                  ...resultCells(r),
                ],
              },
            ]
          : [];
      }),
    ),
  };

  const settingsOrder = [
    "defaults",
    "h200",
    "b200",
    "h200-spec-mtp",
    "spec-mtp",
    "kv-fp8",
    "weights-fp8",
    "moe-a3b",
    "no-prefix-cache",
    "no-thinking",
    "defaults-2x-time",
    "defaults-4x-time",
  ];
  const settingsTable: ReportTable = {
    title: "Hardware and serving settings at 32 agents",
    caption: `One change at a time from vLLM defaults on an H100, Terminal-Bench (${d.dataset.keptCases[TB]} tasks). Cells with more runs pool every run.`,
    columns: [
      { label: "Harness" },
      { label: "Setting" },
      { label: "GPU" },
      ...resultColumns,
    ],
    rows: HARNESSES.flatMap((harness) =>
      settingsOrder.flatMap((cfg) => {
        const r = find(harness, cfg, 32);
        return r
          ? [
              {
                highlight: cfg === "defaults",
                cells: [
                  { text: harness },
                  { text: config(cfg) },
                  { text: r.gpu, muted: true },
                  ...resultCells(r),
                ],
              },
            ]
          : [];
      }),
    ),
    footnote: `GPU cost per solved task = GPU run time while the agents ran (including tool waits and failed tasks, not server startup) × list price per GPU-hour, divided by solved tasks. List prices, October 2026: H100 $${d.gpuPricePerHourUsd.H100.toFixed(2)}, H200 $${d.gpuPricePerHourUsd.H200.toFixed(2)}, B200 $${d.gpuPricePerHourUsd.B200.toFixed(2)} per hour. Sandbox cost is not included: we only have an estimate of it.`,
  };

  const harnessRows = [
    "terminus-2",
    "mini-swe-agent",
    "opencode",
    "pi",
  ].flatMap((harness) =>
    [16, 32].flatMap((agents) => {
      const r = find(harness, "defaults", agents);
      return r
        ? [
            {
              cells: [
                { text: harness },
                { text: String(agents) },
                ...resultCells(r),
              ],
            },
          ]
        : [];
    }),
  );
  const harnessTable: ReportTable = {
    title: "Four agent harnesses, same server",
    caption:
      "vLLM defaults on one H100, Terminal-Bench. opencode and pi ran one 36-task run per cell, too few for firm claims.",
    columns: [
      { label: "Harness" },
      { label: "Agents per GPU", align: "right" },
      ...resultColumns,
    ],
    rows: harnessRows,
  };

  const gaiaRows = d.results
    .filter((r) => r.benchmark === "gaia")
    .sort(
      (a, b) =>
        a.harness.localeCompare(b.harness) ||
        a.gpu.localeCompare(b.gpu) ||
        a.agents - b.agents,
    );
  const gaiaTable: ReportTable = {
    title: "GAIA web research",
    caption: `${d.dataset.keptCases.gaia} GAIA tasks stratified by level, 10-minute limit, one run per cell.`,
    columns: [
      { label: "Harness" },
      { label: "GPU" },
      { label: "Agents per GPU", align: "right" },
      ...resultColumns,
    ],
    rows: gaiaRows.map((r) => ({
      cells: [
        { text: r.harness },
        { text: r.gpu, muted: true },
        { text: String(r.agents) },
        ...resultCells(r),
      ],
    })),
  };

  const failureKeys = Object.keys(FAILURE_LABELS);
  const failureTable: ReportTable = {
    title: "Why trials went unsolved as load rises",
    caption:
      "vLLM defaults on one H100, Terminal-Bench. Unsolved trials by cause; most hit the time limit while the agent was still issuing new actions.",
    columns: [
      { label: "Harness" },
      { label: "Agents per GPU", align: "right" },
      { label: "Unsolved", align: "right" },
      ...failureKeys.map((k) => ({
        label: FAILURE_LABELS[k],
        align: "right" as const,
      })),
    ],
    rows: HARNESSES.flatMap((harness) =>
      loadLevels.flatMap((agents) => {
        const r = find(harness, "defaults", agents);
        if (!r) return [];
        const failures = r.failures as Partial<Record<string, number>>;
        return [
          {
            cells: [
              { text: harness },
              { text: String(agents) },
              { text: String(r.n - r.correct) },
              ...failureKeys.map((k) =>
                failures[k]
                  ? { text: String(failures[k]) }
                  : { text: "0", muted: true },
              ),
            ],
          },
        ];
      }),
    ),
    footnote: d.failures
      .map(
        (f) => `${FAILURE_LABELS[f.category] ?? f.category}: ${f.definition}`,
      )
      .join(" "),
  };

  const preTable: ReportTable = {
    title: "Pre-registered tests",
    caption:
      "Four claims written down before the confirming runs; only runs recorded afterwards count. Effects in whole points, Holm-corrected for C1 to C3.",
    columns: [
      { label: "Claim" },
      { label: "Effect (points, 95% CI)", align: "right" },
      { label: "Verdict", align: "right" },
    ],
    rows: d.preregistered.map((t) => ({
      highlight: t.verdict === "confirmed",
      cells: [
        { text: t.claim },
        "effectPts" in t && t.effectPts !== undefined && t.ci95Pts
          ? {
              text: `${whole(t.effectPts)} [${t.ci95Pts.map(whole).join(", ").replace(/\+/g, "")}]`,
            }
          : { text: "correlation", muted: true },
        { text: t.verdict },
      ],
    })),
  };

  // Numbers for the findings, all read from the data.
  const tb = d.paired.terminalBench;
  const byChange = (change: string) => {
    const p = tb.find((x) => x.change === change);
    if (!p) throw new Error(`serving-infra: missing paired row ${change}`);
    return p;
  };
  const b200 = byChange("b200 c32 B200");
  const c64 = byChange("defaults c64 H100");
  const t8 = must(find("terminus-2", "defaults", 8));
  const t64 = must(find("terminus-2", "defaults", 64));
  const m32 = must(find("mini-swe-agent", "defaults", 32));
  const mB200 = must(find("mini-swe-agent", "b200", 32));
  const tB200 = must(find("terminus-2", "b200", 32));
  const t32 = must(find("terminus-2", "defaults", 32));
  const m32Failures = m32.failures as Partial<Record<string, number>>;
  const gaiaH200 = d.paired.gaia.find((x) => x.change === "h200 c32 H200");
  if (!gaiaH200) throw new Error("serving-infra: missing GAIA H200 row");
  const confirmed = d.preregistered.filter((t) => t.verdict === "confirmed");
  const trials = d.results.reduce((sum, r) => sum + r.n, 0);
  const conditions = new Set(
    d.results.map((r) => `${r.harness}|${r.config}|${r.agents}`),
  ).size;

  return {
    slug: "serving-infra",
    name: "GPU & Serving Settings",
    tags: ["Self-hosting", "GPUs", "Cost", "Coding agents"],
    industry: "infrastructure",
    date: d.meta.runDates.end,
    card: {
      domain: "Self-hosted coding and research agents",
      data: "Public benchmarks · Terminal-Bench, GAIA",
      finding: `Same model, same tasks: moving from an H100 to a B200 raised solve rates by ${points(b200.terminus2.diffPts)} and ${points(b200.miniSweAgent.diffPts)} points, and packing 64 agents on one H100 instead of 8 cut terminus-2 from ${pct(t8.accuracy)} to ${pct(t64.accuracy)}.`,
      stats: [
        { value: String(conditions), label: "configurations" },
        { value: trials.toLocaleString("en-US"), label: "trials" },
        {
          value: points(b200.miniSweAgent.diffPts),
          label: "points, B200 vs. H100",
        },
      ],
    },
    title: "Does the GPU change what a self-hosted agent solves?",
    eyebrow: "Benchmark · GPU & Serving Settings",
    deck: `One open model served with vLLM, four agent harnesses, ${d.dataset.keptCases[TB]} Terminal-Bench and ${d.dataset.keptCases.gaia} GAIA tasks. We changed the GPU, the number of agents sharing it and the serving settings, and counted solved tasks and GPU cost per solve.`,
    seoTitle: "Self-hosted agent benchmark: GPU, load and serving settings",
    seoDescription: `Qwen3.8-27B on vLLM, four agent harnesses, Terminal-Bench 2.0 and GAIA. A B200 instead of an H100 raised solve rates by ${points(b200.terminus2.diffPts)} to ${points(b200.miniSweAgent.diffPts)} points; more agents per GPU lowered them. Results, intervals and method.`,
    facts: [
      { label: "Status", value: "Complete" },
      { label: "Run", value: longDate(d.meta.runDates.end) },
      {
        label: "Models",
        value: "Qwen3.8-27B and Qwen3.6-35B-A3B, self-hosted",
      },
      {
        label: "Tasks",
        value: `${d.dataset.keptCases[TB]} Terminal-Bench, ${d.dataset.keptCases.gaia} GAIA`,
      },
      { label: "Trials", value: trials.toLocaleString("en-US") },
      { label: "GPUs", value: "H100, H200, B200" },
    ],
    findings: [
      `The GPU changed what the agent solved. At 32 agents, a B200 instead of an H100 raised terminus-2 from ${pct(t32.accuracy)} to ${pct(tB200.accuracy)} and mini-swe-agent from ${pct(m32.accuracy)} to ${pct(mB200.accuracy)}: paired differences of ${diff(b200.terminus2)} and ${diff(b200.miniSweAgent)} points.`,
      `Load cost solved tasks. On one H100, terminus-2 solved ${pct(t8.accuracy)} with 8 agents sharing the GPU and ${pct(t64.accuracy)} with 64; against 32 agents, going to 64 was ${diff(c64.terminus2)} points.`,
      `Most unsolved trials ran out of time, not ideas. At 32 agents on an H100, ${m32Failures["out of time, working"]} of mini-swe-agent's ${m32.n - m32.correct} unsolved Terminal-Bench trials hit the time limit while still issuing new actions.`,
      `The faster GPU cost more per hour but less per solved task: mini-swe-agent's GPU cost per solved task was ${cents(mB200.gpuCostPerSolvedCents)} on the B200 against ${cents(m32.gpuCostPerSolvedCents)} on the H100 at 32 agents.`,
      `The effect is not specific to coding: on GAIA, an H200 instead of an H100 changed terminus-2 by ${diff(gaiaH200.terminus2)} points and mini-swe-agent by ${diff(gaiaH200.miniSweAgent)}.`,
      `Of four pre-registered claims, ${confirmed.length === 1 ? "one" : String(confirmed.length)} held on fresh data: ${confirmed.map((t) => t.claim.replace(/^C\d+: /, "")).join("; ")}. The three claims that a setting affects one harness more than another were not confirmed.`,
    ],
    sections: [
      {
        id: "paired",
        title: "What each change did",
        intro:
          "The cleanest read: every change against the same baseline, one H100 shared by 32 agents, paired task by task.",
        tables: [
          pairedTable(
            tb,
            "Terminal-Bench",
            `${d.dataset.keptCases[TB]} tasks, each change paired with the baseline on the same tasks.`,
          ),
          pairedTable(
            d.paired.gaia,
            "GAIA",
            `${d.dataset.keptCases.gaia} tasks, one run per cell.`,
          ),
        ],
      },
      {
        id: "results",
        title: "Results",
        intro:
          "Solve rates with task-level 95% intervals, and what the GPU time cost per solved task.",
        tables: [loadTable, settingsTable, harnessTable, gaiaTable],
      },
      {
        id: "failures",
        title: "Failures",
        intro:
          "Each unsolved trial was classified from its trajectory. The clock dominated: agents that were still making progress ran out of time, and more so as the GPU got busier.",
        tables: [failureTable],
      },
      {
        id: "preregistered",
        title: "Pre-registered tests",
        intro:
          "Before the final runs we wrote down four claims and how we would test them, so the exploratory results above could be checked on fresh data.",
        tables: [preTable],
      },
    ],
    method: [
      {
        term: "Model and server",
        detail: `${d.models.map((m) => m.name).join(", ")}, served by us with vLLM 0.31.0. ${d.setup.conditionsNote}`,
      },
      {
        term: "Agents",
        detail: `Four harnesses run unchanged: terminus-2 (Harbor's own agent, driving a tmux session), mini-swe-agent (bash only, actions parsed from text), opencode and pi (native tool calls). ${d.setup.tools}`,
      },
      {
        term: "Tasks",
        detail: `${d.dataset.droppedReason} Terminal-Bench: ${d.dataset.keptCases[TB]} of ${d.dataset.totalCases[TB]} tasks; GAIA: ${d.dataset.keptCases.gaia} of ${d.dataset.totalCases.gaia}.`,
      },
      {
        term: "Limits",
        detail: `Terminal-Bench agents get each task's own time limit (600 to 1,200 seconds; 900 seconds for 32 of the ${d.dataset.keptCases[TB]} tasks), doubled or quadrupled in the extra-time settings; GAIA agents get 600 seconds. ${d.setup.limits.context_window_tokens.toLocaleString("en-US")}-token context, ${d.setup.limits.max_output_tokens_per_call.toLocaleString("en-US")} output tokens per call.`,
      },
      {
        term: "Grading",
        detail: `${d.grading.judges.map((j) => `${j.name}: ${j.rule}`).join("; ")}. ${d.grading.lookupRule}`,
      },
      {
        term: "Noise",
        detail: `Solve-rate intervals resample tasks with all their trials (${d.noise.resamples.toLocaleString("en-US")} resamples); differences are paired by task. Identical conditions differed by up to ${d.noise.maxSpreadPts} points between runs, and ${d.noise.rerunDisagreement} disagreed on pass or fail. A difference whose interval includes zero is treated as no difference.`,
      },
      {
        term: "Cost",
        detail: `GPU cost only: run time while the agents ran × list price per GPU-hour (H100 $${d.gpuPricePerHourUsd.H100.toFixed(2)}, H200 $${d.gpuPricePerHourUsd.H200.toFixed(2)}, B200 $${d.gpuPricePerHourUsd.B200.toFixed(2)}, October 2026), divided by solved tasks. Sandbox cost is left out because we only have an estimate of it, and the estimate under-counts the bill.`,
      },
      {
        term: "Excluded runs",
        detail: `${d.excludedRunCount} runs produced no trials at all (server deploy failures, killed processes, a bad task list) and are excluded. Every attempted trial is counted, including ones that crashed, timed out or never started.`,
      },
    ],
    limitations: d.limitations,
    datasets: [
      {
        name: "Terminal-Bench 2.0",
        href: "https://huggingface.co/datasets/harborframework/terminal-bench-2.0",
        license: "Apache-2.0",
        description: `Terminal tasks with deterministic tests, run through the Harbor framework. We used ${d.dataset.keptCases[TB]} of its ${d.dataset.totalCases[TB]} tasks (see Method).`,
        huggingFace: "harborframework/terminal-bench-2.0",
      },
      {
        name: "GAIA",
        href: "https://huggingface.co/datasets/gaia-benchmark/GAIA",
        description: `Web research questions with exact-match answers. Gated on Hugging Face: accept its terms there to browse it. We used ${d.dataset.keptCases.gaia} of its ${d.dataset.totalCases.gaia} tasks, stratified by level.`,
      },
    ],
    sources: [
      { label: "Terminal-Bench", href: "https://www.tbench.ai" },
      { label: "vLLM", href: "https://github.com/vllm-project/vllm" },
    ],
  };
}
