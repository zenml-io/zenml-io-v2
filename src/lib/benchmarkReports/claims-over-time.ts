/**
 * Claims-over-time benchmark report: a claims agent improved batch by batch
 * by our AI engineer (through Kitaru) and by Codex, against a copy left
 * alone, on 800 real California appeals. Reads the public export in
 * src/data/benchmarks/claims-over-time.json.
 */

import c from "../../data/benchmarks/claims-over-time.json";
import { longDate, pointInterval, points } from "./format";
import type {
  BenchmarkReport,
  IntervalChart,
  LineChart,
  ReportTable,
} from "./types";

type Line = "pro" | "codex" | "left_alone";

export function buildClaimsOverTime(): BenchmarkReport {
  const run = c.runs.second;
  const first = c.runs.first;
  const LINES: Line[] = ["pro", "codex", "left_alone"];
  const name = (key: string) =>
    c.lines.find((line) => line.key === key)?.name ?? key;
  const p = (x: number) => `${x.toFixed(1)}%`;
  const range = ([lo, hi]: number[]) => `${p(lo)} to ${p(hi)}`;
  const pair = (a: Line, b: Line, set = run.paired.all) =>
    set.find((d) => d.a === a && d.b === b) ?? { delta: 0, ci95: [0, 0] };
  const proVsCodex = pair("pro", "codex");
  const proVsLeft = pair("pro", "left_alone");
  const codexVsLeft = pair("codex", "left_alone");
  const after = run.paired.afterSwitch;
  const switchAt = c.models.switchBeforeBatch;
  const batches = Array.from({ length: c.dataset.batches }, (_, i) => i + 1);
  const appeals = c.dataset.batches * c.dataset.batchSize;
  const undecided = run.undecidedBatches6to8;

  const batchTable: ReportTable = {
    title: "Balanced accuracy on each new batch",
    caption: `Each batch is ${c.dataset.batchSize} appeals none of the agents had seen, decided by the version each line had shipped so far. Batches 1 to ${switchAt - 1} ran on ${c.models.agentBefore}, batches ${switchAt} to ${c.dataset.batches} on ${c.models.agentAfter}.`,
    columns: [
      { label: "Batch" },
      { label: "Model" },
      ...LINES.map((key) => ({ label: name(key), align: "right" as const })),
    ],
    rows: [
      ...batches.map((b) => ({
        cells: [
          { text: String(b) },
          {
            text: b < switchAt ? c.models.agentBefore : c.models.agentAfter,
            muted: true,
          },
          ...LINES.map((key) => ({ text: p(run.batches[key][b - 1]) })),
        ],
      })),
      {
        cells: [
          { text: `Batches 1 to ${switchAt - 1}` },
          { text: c.models.agentBefore, muted: true },
          ...LINES.map((key) => ({ text: p(run.beforeSwitch[key]) })),
        ],
      },
      {
        cells: [
          { text: `Batches ${switchAt} to ${c.dataset.batches}` },
          { text: c.models.agentAfter, muted: true },
          ...LINES.map((key) => ({ text: p(run.afterSwitch[key]) })),
        ],
      },
      {
        highlight: true,
        cells: [
          { text: `All ${appeals} appeals` },
          { text: "95% CI below", muted: true },
          ...LINES.map((key) => ({
            text: `${p(run.overall[key].value)} (${range(run.overall[key].ci95)})`,
          })),
        ],
      },
    ],
    footnote:
      "Balanced accuracy is the average of accuracy on overturned and on upheld appeals; an appeal left undecided counts as wrong. Intervals are bootstrap over appeals.",
  };

  const errorTable: ReportTable = {
    title: "Which mistakes each line made",
    caption: `All ${appeals} appeals. A wrongful denial is a denial the agent upheld that the independent reviewer overturned.`,
    columns: [
      { label: "Line" },
      { label: "Wrongful denials", align: "right" },
      { label: "Wrongful approvals", align: "right" },
      { label: "Undecided", align: "right" },
      { label: "Undecided, batches 6 to 8", align: "right" },
      { label: "Accuracy", align: "right" },
    ],
    rows: LINES.map((key) => ({
      highlight: key === "pro",
      cells: [
        { text: name(key) },
        { text: String(run.errors[key].wrongfulDenials) },
        { text: String(run.errors[key].wrongfulApprovals) },
        { text: String(run.errors[key].undecided) },
        { text: `${undecided[key]} / 300` },
        { text: p(run.errors[key].accuracy) },
      ],
    })),
    footnote:
      "Both improved lines wrongly denied far fewer appeals than the untouched one and wrongly approved more. Balanced accuracy weighs the two mistakes equally.",
  };

  type Change = { change: string; shipped: boolean; score?: number[] };
  const verdict = (x: Change) =>
    x.score
      ? `${x.shipped ? "Shipped" : "Not shipped"} · ${x.score[0].toFixed(3)} vs ${x.score[1].toFixed(3)}`
      : "Tested, no change";
  const changeTable: ReportTable = {
    title: "What each improver changed",
    caption:
      "One proposed change per round. Scores are the approval rule's: average balanced accuracy over 3 runs on every held-out appeal so far, candidate against current version.",
    columns: [
      { label: "Round" },
      { label: name("pro") },
      { label: name("codex") },
    ],
    rows: run.changes.map((r) => ({
      cells: [
        { text: String(r.round) },
        { text: `${r.pro.change}. ${verdict(r.pro)}`, muted: !r.pro.shipped },
        {
          text: `${r.codex.change}. ${verdict(r.codex)}`,
          muted: !r.codex.shipped,
        },
      ],
    })),
    footnote:
      "Every change was a prompt instruction or a setting; neither improver changed the agent's code or tools. Round 8's changes were never scored on a new batch.",
  };

  const firstTable: ReportTable = {
    title: "The first run, before the fixes",
    caption:
      "The same appeals, batches and models. Approval used the revealed appeals the improver had studied, and our AI engineer had no instruction to count how every session ended. No line beat another by more than the noise.",
    columns: [
      { label: "Batch" },
      ...LINES.map((key) => ({ label: name(key), align: "right" as const })),
    ],
    rows: [
      ...batches.map((b) => ({
        cells: [
          { text: String(b) },
          ...LINES.map((key) => ({ text: p(first.batches[key][b - 1]) })),
        ],
      })),
      {
        cells: [
          { text: `All ${appeals} appeals` },
          ...LINES.map((key) => ({
            text: `${p(first.overall[key].value)} (${range(first.overall[key].ci95)})`,
          })),
        ],
      },
    ],
    footnote: `Paired over all ${appeals}: ${name("pro")} minus Codex ${points(pair("pro", "codex", first.paired.all).delta)} points ${pointInterval(pair("pro", "codex", first.paired.all).ci95)}; every interval includes zero.`,
  };

  const intervals: IntervalChart = {
    metric: `Paired difference in balanced accuracy, all ${appeals} appeals (points)`,
    better: "higher",
    rows: (
      [
        ["pro", "codex"],
        ["pro", "left_alone"],
        ["codex", "left_alone"],
      ] as const
    ).map(([a, b]) => {
      const d = pair(a, b);
      return {
        // Short names: the row label has about 13rem before it truncates.
        label: `${a === "pro" ? "AI engineer" : name(a)} vs ${b === "left_alone" ? "left alone" : name(b)}`,
        value: d.delta,
        low: d.ci95[0],
        high: d.ci95[1],
        display: `${points(d.delta)} ${pointInterval(d.ci95)}`,
        verdict: d.ci95[0] > 0 ? "ahead" : d.ci95[1] < 0 ? "behind" : "tie",
      };
    }),
  };

  const timeline: LineChart = {
    metric: "Balanced accuracy on each new batch of 100 appeals",
    better: "higher",
    xTitle: "Batch",
    xLabels: batches.map(String),
    y: { min: 60, max: 95, step: 5, unit: "%" },
    shade: {
      from: switchAt - 1,
      before: c.models.agentBefore,
      label: `Switch to ${c.models.agentAfter}`,
    },
    series: [
      { label: name("pro"), values: run.batches.pro, emphasis: true },
      { label: name("codex"), values: run.batches.codex },
    ],
  };

  return {
    slug: "claims-over-time",
    name: "Improving a Claims Agent",
    tags: ["Agent improvement", "Model switch", "Public data"],
    industry: "insurance",
    date: c.meta.end,
    card: {
      headline: {
        value: points(proVsCodex.delta),
        label: "points ahead of the Codex-improved agent",
      },
      domain: "Health insurance appeals",
      data: "Public decisions · California",
      finding: `After a switch to a cheaper open model, our AI engineer found why appeals were ending undecided and fixed it. Over ${appeals} real appeals its agent ended ${points(proVsCodex.delta)} points ahead of Codex's, which ended level with the agent nobody touched.`,
      stats: [
        { value: String(appeals), label: "real appeals, in 8 batches" },
        {
          value: points(proVsLeft.delta),
          label: "points over the untouched agent",
        },
        { value: points(proVsCodex.delta), label: "points over Codex" },
      ],
    },
    title: "Who keeps a claims agent improving, batch after batch?",
    eyebrow: "Benchmark · Improving a Claims Agent",
    deck: `A claims agent decides ${appeals} real California health appeals in eight batches, and switches to a cheaper open model halfway. After each batch, two improvers may change it: our AI engineer, working through Kitaru, and Codex, given the plain request a team would make, "improve my agent". A third copy is never touched.`,
    seoTitle: "Improving a claims agent over time: our AI engineer vs Codex",
    seoDescription: `Our AI engineer and Codex each improved a claims-review agent after every batch of real California health appeals. Over ${appeals} appeals and a switch to a cheaper open model, our AI engineer's agent ended ${points(proVsCodex.delta)} points ahead.`,
    facts: [
      { label: "Status", value: "Complete" },
      {
        label: "Run",
        value: `${longDate(c.meta.start)} to ${longDate(c.meta.end)}`,
      },
      { label: "Appeals", value: `${appeals} in ${c.dataset.batches} batches` },
      {
        label: "Agent model",
        value: `${c.models.agentBefore}, then ${c.models.agentAfter}`,
      },
      { label: "Improvers", value: `Both on ${c.models.improvers}` },
      { label: "Grading", value: "Real ruling, exact match" },
    ],
    findings: [
      `Over all ${appeals} appeals, the agent our AI engineer improved scored ${p(run.overall.pro.value)} balanced accuracy, against ${p(run.overall.codex.value)} for the one Codex improved and ${p(run.overall.left_alone.value)} for the one left alone. Compared appeal by appeal, it was ${points(proVsCodex.delta)} points ahead of Codex's ${pointInterval(proVsCodex.ci95)} and ${points(proVsLeft.delta)} ahead of the untouched agent ${pointInterval(proVsLeft.ci95)}.`,
      `Most of the gap opened after the switch to the open model, which on about 1 appeal in 10 ran out of tokens or model requests before it decided. Our AI engineer counted how every recorded session ended, found those stops and raised the limits. From batch 6 it left ${undecided.pro} of 300 appeals undecided, against ${undecided.codex} for Codex and ${undecided.left_alone} for the untouched agent.`,
      `Codex looked for the cause in the prompt. In four rounds it tested a prompt change, saw it score lower and sensibly shipped nothing, but it never raised the limits. Its agent ended level with the one nobody touched (${points(codexVsLeft.delta)} points, within the noise).`,
      `On the open model alone, batches ${switchAt} to ${c.dataset.batches}, the gap over Codex was ${points(after[0].delta)} points ${pointInterval(after[0].ci95)}. On the frontier model, batches 1 to ${switchAt - 1}, Codex's agent was slightly ahead (${p(run.beforeSwitch.codex)} against ${p(run.beforeSwitch.pro)}).`,
      "Approval on appeals no improver ever saw turned down three changes that looked good on the improvers' own tests: Codex's round 2 change and two of our AI engineer's. Without that check, a change fitted to the few known answers ships.",
      "The comparison is uneven on purpose. Codex got only the shared instructions, the way a team without this know-how would run it. Our AI engineer ran the way we run it: with Kitaru's recorded sessions, and an instruction to count how every session ended before choosing what to study. A first run without that instruction found no difference between the three agents; the rule is now built into the AI engineer.",
      `Improving is cheap; checking is not. Both improvers together cost $${run.spendUsd.improvers.toFixed(2)} over all eight rounds. Running the agents and checking each change cost about $${Math.round(run.spendUsd.openModelGpu + run.spendUsd.openAi - run.spendUsd.improvers)} in GPU time and API calls.`,
    ],
    sections: [
      {
        id: "results",
        title: "Score on each new batch",
        intro: `Every round, each agent decided a fresh batch of ${c.dataset.batchSize} appeals. Then ${c.dataset.revealedPerBatch} of those rulings were revealed to the improvers, and each had ${c.budget.minutes} minutes and ${c.budget.reruns} reruns to propose one change. A change shipped only if it scored at least as well as the current version on ${c.dataset.heldOutPerBatch} more appeals per batch that no improver ever saw.`,
        tables: [batchTable],
      },
      {
        id: "changes",
        title: "What changed, and what it cost in mistakes",
        tables: [changeTable, errorTable],
      },
      {
        id: "first-run",
        title: "The first run",
        intro:
          "We ran the same design once before. It showed no difference, and exposed two problems: approval scored changes on the appeals the improver had studied, and our AI engineer read the step that said to count every session's ending, then skipped it. We fixed both and ran again.",
        tables: [firstTable],
      },
    ],
    intervals,
    timeline,
    method: [
      {
        term: "Cases",
        detail: `California Independent Medical Review appeals from 2025 and 2026: a health plan denied a treatment, the patient appealed, and an independent reviewer upheld or overturned the denial. Of ${c.dataset.usableAppeals.toLocaleString("en-US")} usable appeals in filing order, each batch draws ${c.dataset.batchSize} at random from its own window of time.`,
      },
      {
        term: "The agent",
        detail: `It reads a facts-only case file, searches a library of ${c.dataset.library.toLocaleString("en-US")} earlier decisions (2016 to 2023), and submits a decision. It is the same claims agent as our Appeals Decisions benchmark.`,
      },
      {
        term: "Three lines",
        detail: `One copy is left alone. One is improved by our AI engineer, which reads the agent's recorded sessions and reruns it only through Kitaru experiments. One is improved by Codex, which reads the same recordings as files and reruns with a plain tool. Both improvers run on ${c.models.improvers}, with the same revealed rulings, budget (${c.budget.minutes} minutes, ${c.budget.reruns} reruns, ${c.budget.changes} change per round) and network.`,
      },
      {
        term: "Approval",
        detail: `A fixed rule decides what ships. The candidate and the current version each run 3 times on every held-out appeal so far (${c.dataset.heldOutPerBatch} per batch, never shown to an improver), and the candidate ships if its average is at least as good.`,
      },
      {
        term: "Model switch",
        detail: `Batches 1 to ${switchAt - 1} run the claims agent on ${c.models.agentBefore}. Before batch ${switchAt} every line switches to ${c.models.agentAfter}, a cheaper open model served on our own GPUs, to see whether the improvers notice what breaks.`,
      },
      {
        term: "Grading",
        detail:
          "Exact match with the independent reviewer's real ruling. No model grades the agent. The score is balanced accuracy, so an agent cannot win by approving everything.",
      },
      {
        term: "Noise",
        detail:
          "Differences are paired appeal by appeal, with 95% bootstrap intervals over appeals (2,000 draws). On batch 1, where all three lines ran the identical starting agent, they scored 78.7%, 82.1% and 79.4%: one batch of 100 swings by about 3 points with nothing changed.",
      },
      {
        term: "Cost",
        detail: `About $${Math.round(run.spendUsd.openModelGpu + run.spendUsd.openAi)} for the second run: $${run.spendUsd.openModelGpu.toFixed(2)} of GPU time for the open model, about $${run.spendUsd.openAi} of OpenAI usage by the frameworks' own estimates, $${run.spendUsd.improvers.toFixed(2)} of it for both improvers. The OpenAI figure leaves out our AI engineer's Kitaru experiments. ${c.meta.hours} from the first batch to the last audit.`,
      },
    ],
    limitations: c.limitations,
    datasets: [
      {
        name: "California DMHC Independent Medical Review determinations",
        href: c.dataset.url,
        description: `California's open data on independent reviews of health-plan denials. ${appeals} appeals from 2025 and 2026 as test cases, and earlier ones as the precedent library.`,
      },
    ],
    sources: [],
  };
}
