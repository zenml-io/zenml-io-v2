/**
 * Decision agents benchmark report: two self-hosted open models deciding
 * real public appeals and lawsuits (California health appeals, US veterans'
 * appeals, German health-insurance suits). Reads the whitelisted public
 * export in src/data/benchmarks/decision-agents.json.
 *
 * Accuracy counts a session that never decided as wrong. The export notes
 * that earlier prose used decided sessions only, which reverses the German
 * dense-vs-MoE order, so both figures are shown and no model is ranked
 * above the other there. The German keyword baseline is left out: it does
 * not reproduce to one value.
 */

import data from "../../data/benchmarks/decision-agents.json";
import { interval, longDate, pct, pointInterval, points } from "./format";
import type { BenchmarkReport, ReportTable, TableCell } from "./types";

type Domain = "claims" | "bva" | "de_kr";
type ModelKey = "dense" | "moe";
type Row = (typeof data.results)["claims:base"][number];

const DOMAINS: readonly Domain[] = ["claims", "bva", "de_kr"];
const DOMAIN_NAME: Record<Domain, string> = {
  claims: "US health appeals",
  bva: "US veterans' appeals",
  de_kr: "German health-insurance suits",
};
const MODEL_NAME: Record<ModelKey, string> = {
  dense: "Qwen3.8-27B (dense)",
  moe: "Qwen3.6-35B-A3B (MoE)",
};

/** "96/117" → "96 / 117" */
const fraction = (s: string) => s.replace("/", " / ");
const count = (x: number) => x.toLocaleString("en-US");

export function buildDecisionAgents(): BenchmarkReport {
  const d = data;
  const R = d.results;
  const base = (domain: Domain) => R[`${domain}:base`] as Row[];
  const row = (domain: Domain, model: ModelKey) =>
    base(domain).find((r) => r.model === model) as Row;
  const cases = DOMAINS.reduce((sum, dom) => sum + d.dataset.cases[dom], 0);

  const resultsTable: ReportTable = {
    title: "Accuracy against the real outcome",
    caption:
      "Each case run twice per model. A session that never submitted a decision within 12 turns counts as wrong; the last column scores only the sessions that decided.",
    columns: [
      { label: "Domain and model" },
      { label: "Correct", align: "right" },
      { label: "Accuracy", align: "right" },
      { label: "95% CI", align: "right" },
      { label: "No decision", align: "right" },
      { label: "Accuracy of decided", align: "right" },
    ],
    rows: DOMAINS.flatMap((dom) =>
      (["dense", "moe"] as const).map((model) => {
        const r = row(dom, model);
        return {
          cells: [
            { text: `${DOMAIN_NAME[dom]} · ${MODEL_NAME[model]}` },
            { text: `${r.correct} / ${r.n}` },
            { text: pct(r.accuracy) },
            { text: interval(r.ci95), muted: true },
            { text: `${r.noDecision} / ${r.n}` },
            { text: pct(r.accuracyOfDecided) },
          ],
        };
      }),
    ),
    footnote:
      "On German suits the two ways of counting rank the models in opposite order, so we don't rank them there.",
  };

  const B = d.baselines;
  const baselineTable: ReportTable = {
    title: "Compared with no AI at all",
    caption:
      "A lookup that predicts the majority outcome of past decisions for the same treatment or condition, and always predicting the more common outcome.",
    columns: [
      { label: "Domain" },
      { label: "Past-decision lookup", align: "right" },
      { label: "Always the common outcome", align: "right" },
      { label: MODEL_NAME.dense, align: "right" },
      { label: MODEL_NAME.moe, align: "right" },
    ],
    rows: [
      {
        cells: [
          { text: DOMAIN_NAME.claims },
          { text: pct(B.claims.correct / B.claims.n) },
          { text: pct(B.claimsMajority.correct / B.claimsMajority.n) },
          { text: pct(row("claims", "dense").accuracy) },
          { text: pct(row("claims", "moe").accuracy) },
        ],
      },
      {
        cells: [
          { text: DOMAIN_NAME.bva },
          { text: pct(B.bva.correct / B.bva.n) },
          { text: pct(B.bvaMajority.correct / B.bvaMajority.n) },
          { text: pct(row("bva", "dense").accuracy) },
          { text: pct(row("bva", "moe").accuracy) },
        ],
      },
      {
        cells: [
          { text: DOMAIN_NAME.de_kr },
          { text: "not reproducible", muted: true },
          { text: pct(B.deKrMajority.correct / B.deKrMajority.n) },
          { text: pct(row("de_kr", "dense").accuracy) },
          { text: pct(row("de_kr", "moe").accuracy) },
        ],
      },
    ],
    footnote: `On US health appeals, paired by case, the agents beat the lookup by ${points(B.claimsAgentVsLookup.dense.diff)} points ${pointInterval(B.claimsAgentVsLookup.dense.ci95)} (dense) and ${points(B.claimsAgentVsLookup.moe.diff)} ${pointInterval(B.claimsAgentVsLookup.moe.ci95)} (MoE): both intervals include zero. The German lookup's score depends on word order in the code, so we leave it out.`,
  };

  const truthTable: ReportTable = {
    title: "Which way the mistakes went",
    caption:
      "Correct answers split by the real outcome. Low scores on the claimant-wins column mean the agent denied what the reviewer, Board or court granted.",
    columns: [
      { label: "Domain and model" },
      {
        label: "Claimant won (overturned, granted, suit allowed)",
        align: "right",
      },
      {
        label: "Claimant lost (upheld, denied, suit dismissed)",
        align: "right",
      },
    ],
    rows: DOMAINS.flatMap((dom) =>
      (["dense", "moe"] as const).map((model) => {
        const types = d.perType[`${dom}:base`][model] as Record<
          string,
          { n: number; correct: number }
        >;
        const won =
          dom === "bva" ? types["truth=grant"] : types["truth=overturn"];
        const lost =
          dom === "bva" ? types["truth=deny"] : types["truth=uphold"];
        const cell = (x: { n: number; correct: number }): TableCell => ({
          text: `${x.correct} / ${x.n} (${pct(x.correct / x.n)})`,
        });
        return {
          cells: [
            { text: `${DOMAIN_NAME[dom]} · ${MODEL_NAME[model]}` },
            cell(won),
            cell(lost),
          ],
        };
      }),
    ),
  };

  const failureTable: ReportTable = {
    title: "How the sessions went wrong",
    caption: "Both attempts, all sessions.",
    columns: [
      { label: "Domain and model" },
      { label: "Never decided", align: "right" },
      { label: "Wrong, sided with insurer or agency", align: "right" },
      { label: "Wrong, sided with claimant", align: "right" },
    ],
    rows: DOMAINS.flatMap((dom) =>
      (["dense", "moe"] as const).map((model) => {
        const r = row(dom, model);
        return {
          cells: [
            { text: `${DOMAIN_NAME[dom]} · ${MODEL_NAME[model]}` },
            { text: String(r.noDecision) },
            { text: String(r.wrongForInsurer) },
            { text: String(r.wrongForClaimant) },
          ],
        };
      }),
    ),
  };

  const normal = R["claims:normal_run_attempt0"][0];
  const conditions = [
    { key: "claims:normal_run_attempt0", label: "Normal run" },
    { key: "claims:cost_pressure", label: "Cost-pressure paragraph" },
    { key: "claims:tool_faults", label: "Precedent tools fail half the time" },
    { key: "claims:blind", label: "Precedents without their outcome" },
    { key: "claims:sim_tools", label: "Precedent tools simulated by an LLM" },
  ] as const;
  const experimentTable: ReportTable = {
    title: "One change at a time",
    caption: `US health appeals, ${MODEL_NAME.dense}, one attempt per case. Wrongful denials: denials of cases the reviewer overturned, among sessions that decided. Decisions changed: against the normal run on the same cases; an unchanged rerun changes ${pct(normal.changedVsNormal?.rate ?? 0)}.`,
    columns: [
      { label: "Condition" },
      { label: "Accuracy", align: "right" },
      { label: "No decision", align: "right" },
      { label: "Wrongful denials", align: "right" },
      { label: "Decisions changed", align: "right" },
      { label: "Cited a precedent that doesn't exist", align: "right" },
    ],
    rows: conditions.map(({ key, label }) => {
      const r = R[key][0] as Row & {
        wrongfulDenials?: { n: number; denied: number; rate: number };
        changedVsNormal?: { pairs: number; differ: number; rate: number };
      };
      const isNormal = key === "claims:normal_run_attempt0";
      return {
        highlight: isNormal,
        cells: [
          { text: label },
          { text: pct(r.accuracy) },
          { text: `${r.noDecision} / ${r.n}` },
          {
            text: r.wrongfulDenials
              ? `${r.wrongfulDenials.denied} / ${r.wrongfulDenials.n} (${pct(r.wrongfulDenials.rate)})`
              : "",
          },
          isNormal
            ? { text: "reference", muted: true }
            : {
                text: r.changedVsNormal
                  ? `${r.changedVsNormal.differ} / ${r.changedVsNormal.pairs} (${pct(r.changedVsNormal.rate)})`
                  : "",
              },
          {
            text: `${r.inventedCitations.sessions} / ${r.inventedCitations.decided}`,
          },
        ],
      };
    }),
    footnote: `The cost-pressure paragraph raised wrongful denials by ${points(d.costPressure.diffPoints)} points ${pointInterval(d.costPressure.ci95Points)} on ${d.costPressure.cases} cases. Sessions made ${normal.toolCallsPerCase.toFixed(2)} tool calls on average in the normal run and ${R["claims:tool_faults"][0].toolCallsPerCase.toFixed(2)} with failing tools, not counting the final submit.`,
  };

  const F = d.flips as Record<
    Domain,
    Record<
      "rerun_dense" | "rerun_moe" | "model_change",
      { pairs: number; differ: number; rate: number }
    >
  >;
  const flip = (x: {
    pairs: number;
    differ: number;
    rate: number;
  }): TableCell => ({
    text: `${x.differ} / ${x.pairs} (${pct(x.rate)})`,
  });
  const flipTable: ReportTable = {
    title: "Same case, different decision",
    caption:
      "Pairs of sessions on the same case where both decided. Rerun: the same model run again with nothing changed. Model change: dense against MoE.",
    columns: [
      { label: "Domain" },
      { label: `Rerun, ${MODEL_NAME.dense}`, align: "right" },
      { label: `Rerun, ${MODEL_NAME.moe}`, align: "right" },
      { label: "Model change", align: "right" },
    ],
    rows: DOMAINS.map((dom) => ({
      cells: [
        { text: DOMAIN_NAME[dom] },
        flip(F[dom].rerun_dense),
        flip(F[dom].rerun_moe),
        flip(F[dom].model_change),
      ],
    })),
  };

  const P = d.replay as Record<
    Domain,
    Record<
      "rerun_dense" | "rerun_moe" | "model_change",
      {
        pairs: number;
        identical: number;
        found: number;
        fully: number;
        fullyCount: number;
      }
    >
  >;
  const PAIR_NAME = {
    rerun_dense: `Rerun, ${MODEL_NAME.dense}`,
    rerun_moe: `Rerun, ${MODEL_NAME.moe}`,
    model_change: "Model change",
  } as const;
  const replayTable: ReportTable = {
    title: "Could a recording answer the next run?",
    caption:
      "For each pair, how many of the second run's tool calls (same tool, same arguments) the first run had already made, and how often all of them were.",
    columns: [
      { label: "Domain and pair" },
      { label: "Identical call sequence", align: "right" },
      { label: "Calls already recorded", align: "right" },
      { label: "Fully answerable", align: "right" },
    ],
    rows: DOMAINS.flatMap((dom) =>
      (["rerun_dense", "rerun_moe", "model_change"] as const).map((pair) => {
        const x = P[dom][pair];
        return {
          cells: [
            { text: `${DOMAIN_NAME[dom]} · ${PAIR_NAME[pair]}` },
            { text: pct(x.identical) },
            { text: pct(x.found) },
            { text: `${x.fullyCount} / ${x.pairs} (${pct(x.fully)})` },
          ],
        };
      }),
    ),
  };

  type Signal = { catches_wrong: string; flags_right: string };
  const S = d.signals as Record<Domain, Record<string, Signal | string>>;
  const SIGNALS = [
    ["not_high_confidence", "Agent not highly confident"],
    ["other_model_disagrees", "The other model disagrees"],
    ["rerun_disagrees", "A rerun disagrees"],
    ["llm_judge_says_incorrect", "An LLM judge says it's wrong"],
  ] as const;
  const signalTable: ReportTable = {
    title: "Which cheap signals catch wrong decisions?",
    caption:
      "A signal flags a decided session for human review. Catches: flagged wrong decisions out of all wrong ones. Flags right: correct decisions it would also send to review. The LLM judge is the dense model and is scored only where it gave a usable verdict.",
    columns: [
      { label: "Domain and signal" },
      { label: "Catches wrong decisions", align: "right" },
      { label: "Also flags right decisions", align: "right" },
    ],
    rows: DOMAINS.flatMap((dom) =>
      SIGNALS.map(([key, label]) => {
        const s = S[dom][key] as Signal;
        return {
          cells: [
            { text: `${DOMAIN_NAME[dom]} · ${label}` },
            { text: fraction(s.catches_wrong) },
            { text: fraction(s.flags_right), muted: true },
          ],
        };
      }),
    ),
  };

  const claimsSignals = S.claims as Record<string, Signal>;
  const deSignals = S.de_kr as Record<string, Signal>;
  const allRates = (key: "rerun_dense" | "rerun_moe" | "model_change") =>
    DOMAINS.map((dom) => F[dom][key].rate);
  const rerunRates = [...allRates("rerun_dense"), ...allRates("rerun_moe")];
  const changeRates = allRates("model_change");
  const replayPairs = DOMAINS.flatMap((dom) => Object.values(P[dom]));
  const costPressure = R["claims:cost_pressure"][0] as Row & {
    wrongfulDenials: { rate: number };
  };
  const simTools = R["claims:sim_tools"][0] as Row & {
    changedVsNormal: { rate: number };
  };
  const normalDenials = (normal as Row & { wrongfulDenials: { rate: number } })
    .wrongfulDenials;
  const lookup = B.claims.correct / B.claims.n;

  const plain = (s: string) =>
    s
      .replace(/^claims covers/, "The US health appeals set covers")
      .replace(/\(bva\)/g, "(veterans' appeals)")
      .replace(/\(de_kr\)/g, "(German suits)")
      .replace(/^The bva test set/, "The veterans' appeals set")
      .replace(
        /^The claims experiment conditions/,
        "The single-change experiments on health appeals",
      )
      .replace(/ CIs/g, " intervals")
      .replace(/^claims and bva:/, "US cases:")
      .replace(/ de_kr: /, " German cases: ")
      .replace("(claims: e.g.", "(health appeals: e.g.")
      .replace("; bva: e.g.", "; veterans' appeals: e.g.")
      .replace(
        "(claims 0 dropped, bva 6 dropped)",
        "(0 health appeals and 6 veterans' appeals dropped)",
      );

  return {
    slug: "decision-agents",
    name: "Appeals Decisions",
    tags: ["Reliability", "Open models", "Public data"],
    group: "agents",
    date: d.meta.end,
    card: {
      headline: {
        value: `${pct(Math.min(...rerunRates))}–${pct(Math.max(...rerunRates))}`,
        label: "of decisions flipped on a rerun",
      },
      domain: "Appeals and benefits decisions",
      data: "Public decisions · 3 domains",
      finding: `Against real outcomes, accuracy ran from ${pct(Math.min(...DOMAINS.flatMap((dom) => base(dom).map((r) => r.accuracy))))} to ${pct(Math.max(...DOMAINS.flatMap((dom) => base(dom).map((r) => r.accuracy))))}. Run again with nothing changed, the agents flipped ${pct(Math.min(...rerunRates))} to ${pct(Math.max(...rerunRates))} of their decisions.`,
      stats: [
        { value: String(d.models.length), label: "self-hosted open models" },
        { value: count(cases), label: "real cases" },
        { value: String(DOMAINS.length), label: "domains, two countries" },
      ],
    },
    title: "Can an agent decide real appeals?",
    eyebrow: "Benchmark · Appeals Decisions",
    deck: `Two self-hosted open models decide ${count(cases)} real US health appeals, US veterans' appeals and German health-insurance suits, with tools to read the case and search past decisions. We scored them against what the reviewer, Board or court actually decided, and checked how stable and replayable those decisions are.`,
    seoTitle: "Decision agents benchmark: real appeals, rerun flips and replay",
    seoDescription: `Two open models decide ${count(cases)} real health appeals, veterans' appeals and German insurance suits. Accuracy against real outcomes, how often reruns flip a decision, and which cheap signals catch wrong ones.`,
    facts: [
      { label: "Status", value: "Complete" },
      {
        label: "Run",
        value: `${longDate(d.meta.start)} to ${longDate(d.meta.end)}`,
      },
      { label: "Models", value: `${d.models.length} open-weight, self-hosted` },
      {
        label: "Cases",
        value: `${count(cases)} across ${DOMAINS.length} domains`,
      },
      { label: "Data", value: "Public decisions (US, Germany)" },
      { label: "Grading", value: "Real outcome, exact match" },
    ],
    findings: [
      `Counting a session that never decided as wrong, accuracy was ${pct(row("claims", "dense").accuracy)} and ${pct(row("claims", "moe").accuracy)} on US health appeals, ${pct(row("bva", "dense").accuracy)} and ${pct(row("bva", "moe").accuracy)} on veterans' appeals, and ${pct(row("de_kr", "dense").accuracy)} and ${pct(row("de_kr", "moe").accuracy)} on German suits (dense, then MoE).`,
      `On US health appeals the agents barely beat a no-AI lookup of how past cases for the same treatment went (${pct(lookup)}): the paired gaps were ${points(B.claimsAgentVsLookup.dense.diff)} and ${points(B.claimsAgentVsLookup.moe.diff)} points, both with intervals that include zero.`,
      `With nothing changed, a rerun flipped ${pct(Math.min(...rerunRates))} to ${pct(Math.max(...rerunRates))} of decisions, depending on domain and model. Swapping the model flipped ${pct(Math.min(...changeRates))} to ${pct(Math.max(...changeRates))}.`,
      `Recordings only partly answer the next run: ${pct(Math.min(...replayPairs.map((x) => x.found)))} to ${pct(Math.max(...replayPairs.map((x) => x.found)))} of a rerun's or swapped model's tool calls were already recorded, but only ${pct(Math.min(...replayPairs.map((x) => x.fully)))} to ${pct(Math.max(...replayPairs.map((x) => x.fully)))} of runs were fully answerable from the recording.`,
      `On US health appeals, flagging every decision not made with high confidence caught ${fraction(claimsSignals.not_high_confidence.catches_wrong)} wrong decisions, while an LLM judge caught ${fraction(claimsSignals.llm_judge_says_incorrect.catches_wrong)}. On German suits, confidence caught only ${fraction(deSignals.not_high_confidence.catches_wrong)}.`,
      `One added paragraph about cost raised wrongful denials on health appeals from ${pct(normalDenials.rate)} to ${pct(costPressure.wrongfulDenials.rate)}. Answering the precedent tools with an LLM instead of the real database changed ${pct(simTools.changedVsNormal.rate)} of decisions, and ${simTools.inventedCitations.sessions} of ${simTools.inventedCitations.decided} decisions cited precedents that don't exist.`,
    ],
    sections: [
      {
        id: "results",
        title: "Results",
        intro:
          "Each agent reads a case file, searches a library of past decisions in the same domain, and submits a decision with a confidence level and the precedents it relied on.",
        tables: [resultsTable, baselineTable, truthTable, failureTable],
      },
      {
        id: "experiments",
        title: "Changing one thing",
        intro:
          "On US health appeals we changed one thing at a time against the same cases: a line of cost pressure in the prompt, failing tools, precedents with their outcomes hidden, and tools answered by a model instead of the database.",
        tables: [experimentTable],
      },
      {
        id: "stability",
        title: "Stability and replay",
        intro:
          "A decision agent you can't rerun and get the same answer from is hard to audit. We measured how often decisions flip, and how much of a run a recording of the previous one could answer.",
        tables: [flipTable, replayTable],
      },
      {
        id: "signals",
        title: "Catching wrong decisions",
        tables: [signalTable],
      },
    ],
    method: [
      {
        term: "Cases",
        detail: `US health appeals: ${d.dataset.cases.claims} California Independent Medical Review decisions from 2024 to 2026 (${d.dataset.labels.claims.overturn} overturned, ${d.dataset.labels.claims.uphold} upheld). Veterans' appeals: ${d.dataset.cases.bva} single-issue Board of Veterans' Appeals decisions (${d.dataset.labels.bva.grant} granted, ${d.dataset.labels.bva.deny} denied). German suits: ${d.dataset.cases.de_kr} first-instance social court judgments on health insurance (${d.dataset.labels.de_kr.overturn} allowed, ${d.dataset.labels.de_kr.uphold} dismissed).`,
      },
      {
        term: "Precedent library",
        detail: `The agent can search past decisions it is not tested on: ${count(d.dataset.library.claims)} earlier health appeals, ${count(d.dataset.library.bva)} veterans' decisions and ${count(d.dataset.library.de_kr)} German judgments.`,
      },
      {
        term: "Case files",
        detail: plain(`${d.setup.rewriting} ${d.setup.leakageCheck}`),
      },
      {
        term: "Models",
        detail: `${d.models.map((m) => m.name).join(" and ")}, both open-weight models from ${d.models[0].vendor}, served on our own GPUs (one H100 per model) at temperature ${d.setup.limits.temperature}, with up to ${d.setup.limits.max_model_turns} model turns per session.`,
      },
      {
        term: "Grading",
        detail:
          "Exact match with the real decision of the reviewer, Board or court. No model grades the agents; an LLM judge was only tested as a way to flag wrong decisions.",
      },
      {
        term: "Noise",
        detail: `${d.noise.method} Intervals are bootstrap over cases (${count(d.noise.resamples)} resamples), keeping all of a case's sessions together.`,
      },
      {
        term: "Cost",
        detail:
          "Not reported: the GPU time of these self-hosted runs was not logged per run, so there is no honest cost per decision.",
      },
    ],
    limitations: d.limitations.map(plain),
    datasets: [
      {
        name: "California DMHC Independent Medical Review determinations",
        href: "https://data.chhs.ca.gov/dataset/independent-medical-review-imr-determinations-trend",
        description: `California's open data on independent reviews of health-plan denials. We used ${d.dataset.cases.claims} decisions from 2024 to 2026 as test cases and earlier ones as the precedent library.`,
      },
      {
        name: "BVA AMA-era structured index",
        href: "https://huggingface.co/datasets/williamTLmiller/BVA-AMA-Era-170KStructured",
        license: "CC-BY-NC-4.0",
        description:
          "A research index of Board of Veterans' Appeals decisions, used to pick case IDs and library labels.",
        huggingFace: "williamTLmiller/BVA-AMA-Era-170KStructured",
      },
      {
        name: "Board of Veterans' Appeals decisions",
        href: "https://www.bva.va.gov/",
        license: "Public domain",
        description:
          "The official decision texts; test labels come from each decision's ORDER section.",
      },
      {
        name: "Open Legal Data: German court decisions",
        href: "https://de.openlegaldata.io",
        description: `First-instance social court judgments on health insurance; labels come from each judgment's operative part. We kept ${count(d.dataset.totalCases.de_kr)} clearly labelled judgments: ${d.dataset.cases.de_kr} as test cases, the rest as the library.`,
      },
    ],
    sources: [],
  };
}
