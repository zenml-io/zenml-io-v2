/**
 * tau2-bench Telecom benchmark report. It leads with our own full Kitaru
 * replays: a GPT-5.2 support agent recorded on tau2-bench's 40 Telecom test
 * tasks (MIT), then every task replayed with seven other models, an
 * unchanged rerun (the noise bar) and one prompt rule. A secondary section
 * covers Exgentic's public recorded runs of five frontier models and a step
 * check on GPT-5.2's recorded calls. Reads the whitelisted public data in
 * src/data/benchmarks/tau2-telecom.json, built from both exports.
 *
 * No replay costs are shown: Kitaru's session cost is unreliable for models
 * it cannot price, and open-weight prices are unverified. Exgentic's dataset
 * declares no license, so its part shows aggregates only. The two parts use
 * different harnesses, simulators and task sets; their numbers are never
 * merged.
 */

import data from "../../data/benchmarks/tau2-telecom.json";
import {
  cents,
  interval,
  longDate,
  pct,
  pointInterval,
  points,
} from "./format";
import type { BenchmarkReport, ReportTable, TableCell } from "./types";

type Candidate = (typeof data.stepCheck.candidates)[number];
type Arm = (typeof data.replay.arms)[number];

const TYPE_NAME: Record<string, string> = {
  mms: "MMS",
  mobile_data: "Mobile data",
  no_service: "No service",
  mms_issue: "MMS",
  mobile_data_issue: "Mobile data",
  service_issue: "No service",
};

const count = (x: number) => x.toLocaleString("en-US");
const usd = (x: number) => `$${x.toFixed(4)}`;

export function buildTau2Telecom(): BenchmarkReport {
  const d = data;

  // --- Our full replays ---------------------------------------------------
  const rp = d.replay;
  const arm = (key: string) => rp.arms.find((a) => a.arm === key) as Arm;
  const baseline = arm("baseline_gpt-5.2_recorded");
  const rerun = arm("noise_gpt-5_2");
  const promptArm = arm("prompt-escalation-rule");
  const swaps = rp.arms
    .filter((a) => a.role === "swap")
    .sort((a, b) => b.accuracy - a.accuracy);
  const topSwap = swaps[0];
  const clearlyBetter = swaps.filter((a) => (a.paired?.ci95Points[0] ?? 0) > 0);
  const clearlyWorse = swaps.filter((a) => (a.paired?.ci95Points[1] ?? 0) < 0);
  const modelCount = swaps.length + 1;
  const vsBaseline = (a: Arm) =>
    a.paired
      ? `${points(a.paired.deltaPoints)} ${pointInterval(a.paired.ci95Points)}`
      : "reference";
  const svr = rp.stepVsReplay;
  const pairName = (key: string) => arm(key).name;
  const byStep = [...svr.pairs].sort(
    (a, b) => b.stepToolChoice - a.stepToolChoice,
  );
  const luna = arm("gpt-5_6-luna");
  const lunaUnsolved = luna.n - luna.correct;
  const mini = arm("gpt-5_4-mini");
  const corr = svr.spearman.toFixed(2).replace("-", "−");
  const replayTypes = rp.types.map((t) => t.type);
  const exgentic52 = d.recorded.find((r) => r.model === "gpt-5.2-2025-12-11");
  const models = new Map(d.models.map((m) => [m.id, m]));
  const name = (id: string) => models.get(id)?.name ?? id;
  const weights = (id: string) => models.get(id)?.weights ?? "";

  const recorded = [...d.recorded].sort(
    (a, b) =>
      b.accuracy - a.accuracy || a.costPerCorrectCents - b.costPerCorrectCents,
  );
  const totalRuns = d.recorded.reduce((sum, r) => sum + r.n, 0);
  const unsolved = d.recorded.reduce((sum, r) => sum + (r.n - r.correct), 0);
  const escalated = d.recorded.reduce((sum, r) => sum + r.escalatedUnsolved, 0);
  const unknownStatus = d.recorded.reduce((sum, r) => sum + r.unknownStatus, 0);

  const sc = d.stepCheck;
  const reference = sc.candidates.find((c) => c.reference) as Candidate;
  const candidates = sc.candidates.filter((c) => !c.reference);
  const pairedRuns = candidates[0]?.pairedToolChoice?.runs ?? 0;
  const fewerAnswered = sc.candidates.filter((c) => c.answered < c.callsSent);
  const fullyAnswered = sc.candidates.length - fewerAnswered.length;

  const heat = (correct: number, n: number): 0 | 1 | 2 | 3 => {
    const miss = 1 - correct / n;
    return miss === 0 ? 0 : miss < 0.15 ? 1 : miss < 0.4 ? 2 : 3;
  };
  const replayOrder = [baseline, rerun, promptArm, ...swaps];
  const replayTable: ReportTable = {
    title: "Tasks solved, full replays",
    caption: `Each arm ran all ${rp.tasks} test tasks once, end to end, with tau2's own grader. The difference is paired by task against the GPT-5.2 baseline. Highlighted rows are clearly ahead of it: their interval stays above zero.`,
    columns: [
      { label: "Arm" },
      { label: "Weights" },
      { label: "Solved", align: "right" },
      { label: "Success rate", align: "right" },
      { label: "95% CI", align: "right" },
      { label: "vs. GPT-5.2 baseline (points, 95% CI)", align: "right" },
      { label: "Tasks gained / lost", align: "right" },
    ],
    rows: replayOrder.map((a) => ({
      highlight: clearlyBetter.includes(a),
      cells: [
        { text: a.name },
        { text: a.weights, muted: true },
        { text: `${a.correct} / ${a.n}` },
        { text: pct(a.accuracy) },
        { text: interval(a.ci95), muted: true },
        { text: vsBaseline(a), muted: !a.paired },
        {
          text: a.paired ? `${a.paired.gained} / ${a.paired.lost}` : "",
          muted: true,
        },
      ],
    })),
    footnote:
      "The GPT-5.2 rerun changed nothing, so its gap from the baseline is pure run-to-run noise. Costs are not shown: Kitaru could not price the open-weight models, and their prices are unverified.",
  };

  const replayTypeTable: ReportTable = {
    title: "By issue type, full replays",
    caption: "Solved tasks per issue type, from the tau2 task id.",
    columns: [
      { label: "Arm" },
      ...replayTypes.map((t) => ({
        label: TYPE_NAME[t] ?? t,
        align: "right" as const,
      })),
    ],
    rows: replayOrder.map((a) => {
      const perArm = rp.perType[a.arm as keyof typeof rp.perType] as
        | Record<string, { n: number; correct: number }>
        | undefined;
      return {
        cells: [
          { text: a.name },
          ...replayTypes.map((t): TableCell => {
            const cell = perArm?.[t];
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
    footnote: "Darker cells missed more tasks of that type.",
  };

  const replayFailureTable: ReportTable = {
    title: "How unsolved tasks ended, full replays",
    caption:
      "From each episode's tool calls: whether the agent transferred the customer to a human, or ended with the phone or account still wrong.",
    columns: [
      { label: "Arm" },
      { label: "Unsolved", align: "right" },
      { label: "Handed to a human", align: "right" },
      { label: "Ended without a transfer", align: "right" },
    ],
    rows: replayOrder.map((a) => ({
      cells: [
        { text: a.name },
        { text: String(a.n - a.correct) },
        { text: String(a.escalatedUnsolved) },
        { text: String(a.endedUnsolved) },
      ],
    })),
    footnote: "No episode failed before grading in any arm.",
  };

  const screenTable: ReportTable = {
    title: "Step check vs. full replay",
    caption: `For the ${svr.spearmanN} models in both, how often each picked GPT-5.2's recorded tool in the step check, against how many tasks it solved in full replays. The step check used Exgentic's recordings, a different harness, so compare the order, not the numbers.`,
    columns: [
      { label: "Model" },
      { label: "Same tool as GPT-5.2 (step check)", align: "right" },
      { label: "Solved (full replay)", align: "right" },
      { label: "vs. GPT-5.2 baseline (points, 95% CI)", align: "right" },
    ],
    rows: byStep.map((x) => ({
      cells: [
        { text: pairName(x.arm) },
        { text: `${pct(x.stepToolChoice)} (n = ${x.stepCalls})` },
        { text: pct(x.replayAccuracy) },
        { text: `${points(x.deltaPoints)} ${pointInterval(x.ci95Points)}` },
      ],
    })),
    footnote: `Rank correlation between the two columns: ${corr} over ${svr.spearmanN} models, so the step check's order told us nothing about the replay order.`,
  };

  const recordedTable: ReportTable = {
    title: "Exgentic's recorded runs per model",
    caption: `Exgentic's tool-calling agent on tau2-bench Telecom, one run per task per model, ${count(totalRuns)} runs in all. Success is the benchmark's own verdict as recorded; nothing was re-run.`,
    columns: [
      { label: "Model" },
      { label: "Weights" },
      { label: "Solved", align: "right" },
      { label: "Success rate", align: "right" },
      { label: "95% CI", align: "right" },
      { label: "Cost per solved task", align: "right" },
      { label: "Model calls per run", align: "right" },
    ],
    rows: recorded.map((r) => ({
      cells: [
        { text: name(r.model) },
        { text: weights(r.model), muted: true },
        { text: `${r.correct} / ${r.n}` },
        { text: pct(r.accuracy) },
        { text: interval(r.ci95), muted: true },
        { text: cents(r.costPerCorrectCents) },
        { text: r.callsPerCase.toFixed(2) },
      ],
    })),
    footnote:
      "Cost per solved task is Exgentic's recorded agent cost over all of a model's runs, divided by the runs it solved. How that cost priced cached tokens is not documented, and the simulated user's cost is not included. The public data has no task identifier, so runs cannot be paired across models; compare the intervals, not the ranks.",
  };

  const failureTable: ReportTable = {
    title: "How unsolved recorded runs ended",
    caption: `Of ${unsolved} unsolved runs, ${escalated} ended with the agent transferring the customer to a human, on tasks the agent could have solved within its own tools. Both columns come from the recorded tool calls.`,
    columns: [
      { label: "Model" },
      { label: "Unsolved", align: "right" },
      { label: "Handed to a human", align: "right" },
      { label: "Ended without a transfer", align: "right" },
      { label: "Transfers in solved runs", align: "right" },
    ],
    rows: recorded.map((r) => ({
      cells: [
        { text: name(r.model) },
        { text: String(r.n - r.correct) },
        { text: String(r.escalatedUnsolved) },
        { text: String(r.endedUnsolved) },
        { text: String(r.transfersInSolved), muted: true },
      ],
    })),
    footnote:
      "A transfer in a solved run did not cost the task: the run still reached the right end state.",
  };

  const costTable: ReportTable = {
    title: "Unsolved recorded runs cost more",
    caption:
      "Mean recorded agent cost and model calls per run, solved against unsolved.",
    columns: [
      { label: "Model" },
      { label: "Cost, solved", align: "right" },
      { label: "Cost, unsolved", align: "right" },
      { label: "Calls, solved", align: "right" },
      { label: "Calls, unsolved", align: "right" },
    ],
    rows: recorded.map((r) => {
      const c = d.costSolvedVsUnsolved.find((x) => x.model === r.model);
      return {
        cells: [
          { text: name(r.model) },
          { text: c ? `${usd(c.costSolvedUsd)} (n = ${c.nSolved})` : "" },
          { text: c ? `${usd(c.costUnsolvedUsd)} (n = ${c.nUnsolved})` : "" },
          { text: c ? c.stepsSolved.toFixed(1) : "" },
          { text: c ? c.stepsUnsolved.toFixed(1) : "" },
        ],
      };
    }),
  };

  const types = d.dataset.types.map((t) => t.type);
  const typeTable: ReportTable = {
    title: "By issue type, recorded runs",
    caption:
      "Solved runs per issue type. The type is not a dataset field: it comes from matching the simulated customer's first messages against simple text rules, and the counts are small.",
    columns: [
      { label: "Model" },
      ...types.map((t) => ({
        label: TYPE_NAME[t] ?? t,
        align: "right" as const,
      })),
    ],
    rows: recorded.map((r) => {
      const perModel = d.perType[r.model as keyof typeof d.perType] as
        | Record<string, { n: number; correct: number }>
        | undefined;
      return {
        cells: [
          { text: name(r.model) },
          ...types.map((t): TableCell => {
            const cell = perModel?.[t];
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
    footnote: "Darker cells missed more runs of that type.",
  };

  const candidateName = (c: Candidate) =>
    c.reference ? `${name(c.model)} (its own repeat)` : name(c.model);
  const stepTable: ReportTable = {
    title: "Step check against GPT-5.2's recorded calls",
    caption: `${sc.sampledCalls} of GPT-5.2's ${count(sc.replayableCalls)} replayable recorded calls, from ${pairedRuns} of its runs, resent unchanged to GPT-5.2 itself and to seven newer models. "Same tool" counts the calls where GPT-5.2 had called a tool. The paired difference is against GPT-5.2's own repeat, resampled over recorded runs.`,
    columns: [
      { label: "Model" },
      { label: "Same tool", align: "right" },
      { label: "95% CI", align: "right" },
      { label: "vs. GPT-5.2's repeat (points, 95% CI)", align: "right" },
      { label: "Same reply exactly", align: "right" },
    ],
    rows: [
      reference,
      ...[...candidates].sort((a, b) => b.toolChoice.rate - a.toolChoice.rate),
    ].map((c) => ({
      highlight: c.reference,
      cells: [
        { text: candidateName(c) },
        {
          text: `${c.toolChoice.matched} / ${c.toolChoice.n} (${pct(c.toolChoice.rate)})`,
        },
        { text: interval(c.toolChoice.ci95), muted: true },
        {
          text: c.pairedToolChoice
            ? `${points(c.pairedToolChoice.deltaPoints)} ${pointInterval(c.pairedToolChoice.ci95Points)}`
            : "reference",
          muted: !c.pairedToolChoice,
        },
        { text: `${c.exact.matched} / ${c.exact.n} (${pct(c.exact.rate)})` },
      ],
    })),
    footnote: `The ${fewerAnswered.length} OpenAI models, GPT-5.2's repeat included, answered ${reference.answered} of the ${reference.callsSent} calls; the other ${fullyAnswered} answered all ${sc.sampledCalls}, so their rates use slightly more calls. The step check measures how close a reply is to GPT-5.2's recorded one, not whether it is right.`,
  };

  const headline = {
    value: `${topSwap.correct} / ${topSwap.n}`,
    label: `tasks solved by ${topSwap.name}`,
  };

  return {
    slug: "tau2-telecom",
    name: "tau2-bench Telecom",
    tags: ["Model swap", "Customer service", "Kitaru replay", "Public data"],
    group: "agents",
    date: rp.date,
    card: {
      domain: "Telecom support agents",
      data: `tau2-bench · ${rp.license}`,
      finding: `On ${rp.tasks} tau2-bench Telecom tasks, ${topSwap.name} solved ${topSwap.correct} against the GPT-5.2 baseline's ${baseline.correct}. Rerunning GPT-5.2 unchanged gained ${rerun.paired?.gained} tasks and lost ${rerun.paired?.lost}, so smaller gaps are noise.`,
      stats: [
        { value: String(modelCount), label: "models tested" },
        { value: String(rp.tasks), label: "tasks per arm" },
        headline,
      ],
      headline,
    },
    title: "Which model holds up as a telecom support agent?",
    eyebrow: "Benchmark · tau2-bench Telecom",
    deck: `We recorded a GPT-5.2 support agent on tau2-bench's ${rp.tasks} Telecom test tasks, then replayed every task in Kitaru with ${swaps.length} other models and one prompt rule. A second section looks at five frontier models in Exgentic's ${count(totalRuns)} public recorded runs.`,
    seoTitle: `tau2-bench Telecom: ${modelCount} models replayed on ${rp.tasks} support tasks`,
    seoDescription: `Full replays of a telecom support agent on tau2-bench's ${rp.tasks} test tasks: ${topSwap.name} solved ${topSwap.correct} against GPT-5.2's ${baseline.correct}, an unchanged rerun moved ${(rerun.paired?.gained ?? 0) + (rerun.paired?.lost ?? 0)} tasks, and a step check did not predict the order. Full results, intervals and method.`,
    facts: [
      { label: "Status", value: "Complete" },
      { label: "Replays", value: longDate(rp.date) },
      { label: "Tasks", value: `${rp.tasks} (tau2-bench Telecom test split)` },
      {
        label: "Arms",
        value: `${rp.arms.length}: ${modelCount} models, a rerun, a prompt rule`,
      },
      { label: "Grading", value: "tau2's own grader, no LLM judge" },
      { label: "Data", value: `tau2-bench, ${rp.license}` },
    ],
    findings: [
      `${clearlyBetter.map((a) => `${a.name} (${a.correct} / ${a.n})`).join(", ")} solved clearly more tasks than the GPT-5.2 baseline (${baseline.correct} / ${baseline.n}): their paired intervals stay above zero, led by ${topSwap.name} at ${vsBaseline(topSwap)} points. ${clearlyWorse.map((a) => `${a.name} (${a.correct} / ${a.n})`).join(" and ")} solved clearly fewer.`,
      `Rerunning GPT-5.2 with nothing changed solved the same ${rerun.correct} tasks in number but not the same tasks: it gained ${rerun.paired?.gained} and lost ${rerun.paired?.lost}. Its paired interval, ${pointInterval(rerun.paired?.ci95Points ?? [0, 0])} points, is the noise every swap is read against.`,
      `One prompt rule from the prompt audit (keep troubleshooting before transferring) moved GPT-5.2 to ${promptArm.correct} / ${promptArm.n}, ${vsBaseline(promptArm)} points, which can't be told apart from noise. Unsolved tasks still ended in a transfer ${promptArm.escalatedUnsolved} times, as in the baseline (${baseline.escalatedUnsolved}).`,
      `The two weakest models lost most of their tasks by handing the customer to a human: all ${lunaUnsolved} of ${luna.name}'s unsolved tasks ended in a transfer, and ${mini.escalatedUnsolved} of ${mini.name}'s ${mini.n - mini.correct}.`,
      `The cheap step check did not predict the replay order (rank correlation ${corr} over ${svr.spearmanN} models). ${pairName(byStep[0].arm)} matched GPT-5.2's tool most often (${pct(byStep[0].stepToolChoice)}) but solved ${pct(byStep[0].replayAccuracy)} of tasks; ${pairName(byStep[byStep.length - 1].arm)} matched least (${pct(byStep[byStep.length - 1].stepToolChoice)}) and solved ${pct(byStep[byStep.length - 1].replayAccuracy)}.`,
      `The two parts of this page use different agent harnesses, user simulators and task sets, so their numbers don't line up: GPT-5.2 solved ${pct(baseline.accuracy)} of the ${rp.tasks} test tasks in our replays and ${pct(exgentic52?.accuracy ?? 0)} of its ${exgentic52?.n} runs in Exgentic's recordings.`,
    ],
    sections: [
      {
        id: "results",
        title: "Results",
        intro: `Every arm is a full replay of the same ${rp.tasks} tasks in Kitaru: a fresh episode per task, with the model or the prompt changed and everything else held fixed.`,
        tables: [replayTable, replayTypeTable],
      },
      {
        id: "failures",
        title: "Failures",
        intro:
          "The agent can transfer a customer to a human when a request is outside its own actions. In these tasks it never needed to, yet that is how most unsolved tasks ended.",
        tables: [replayFailureTable],
      },
      {
        id: "step-check",
        title: "Did the step check predict it?",
        intro:
          "A cheap way to judge a swap is to resend recorded calls and compare the replies. We ran Kitaru's model-swap step check, which is still in development, on GPT-5.2's public recorded calls, then compared its order with the full replays.",
        tables: [screenTable],
      },
      {
        id: "public-recordings",
        title: "Exgentic's public recordings",
        intro: `Exgentic published ${count(totalRuns)} recorded tau2-bench Telecom runs of five frontier models in one tool-calling harness. We did not run these agents, and the dataset declares no license, so this part shows aggregate numbers only. Its harness, simulator and tasks differ from our replays.`,
        tables: [recordedTable, failureTable, stepTable, typeTable, costTable],
      },
    ],
    method: [
      {
        term: "Task",
        detail: `tau2-bench Telecom (${rp.version}), its ${rp.tasks}-task test split: a support agent helps a simulated customer fix a phone problem (MMS, mobile data or no service). The agent can look up accounts and bills, change the line and roaming, and message the customer; the simulated customer performs the device actions. Nothing was tuned on these tasks.`,
      },
      {
        term: "Agent and replays",
        detail: `Our agent runs inside tau2's own orchestrator, with tau2's telecom tools, and Kitaru records each episode as a session. The GPT-5.2 baseline was recorded live; every other arm is a Kitaru replay of those ${rp.tasks} sessions with the model or the prompt changed. A replay starts a fresh episode from the task, so it is a new full run, not a step check. ${rp.userSimulator}; at most ${rp.maxSteps} steps and ${rp.timeoutSeconds / 60} minutes per episode.`,
      },
      {
        term: "Prompt rule",
        detail: `One general rule appended to GPT-5.2's instructions: ${rp.promptRule} ${rp.promptRuleLeakage}`,
      },
      {
        term: "Grading",
        detail:
          "tau2's own grader checks the end state of the phone and the account; no LLM judge is involved. An episode with no graded outcome counts as unsolved; none occurred.",
      },
      {
        term: "Noise",
        detail: `GPT-5.2 replayed with nothing changed. Wilson score 95% intervals for single rates; paired differences against the baseline use a per-task bootstrap, ${count(rp.resamples)} resamples. A difference whose interval includes zero is reported as not distinguishable.`,
      },
      {
        term: "Public recordings",
        detail: `The runs are Exgentic's, published on Hugging Face as agent-llm-traces-v2. We did not run these agents. The published shards hold ${count(d.dataset.rowsAllShards)} rows (the dataset card says 10,057), ${count(d.dataset.telecomRowsAllHarnesses)} of them tau2-bench Telecom across four agent harnesses. We kept the tool-calling harness only, ${count(d.dataset.keptCases)} runs, so every model ran the same agent design with native tool calls. Nothing was dropped within it.`,
      },
      {
        term: "Public recordings: task",
        detail:
          "tau2-bench Telecom: a support agent helps a simulated customer fix a phone problem (MMS, mobile data or no service). The agent can look up accounts and bills, change the line and roaming, and message the customer; the simulated customer performs the device actions. The simulated customer's model and cost are not in the data.",
      },
      {
        term: "Public recordings: scoring",
        detail: `A run counts as solved when the dataset's success field is true, which is the benchmark's own evaluation as recorded. ${unknownStatus} runs have an "unknown" status while success is set; they are scored by the success field. Two GPT-5.2 runs carry another model's run label and are counted under the model their calls name.`,
      },
      {
        term: "Public recordings: cost",
        detail:
          "Cost per solved task uses each run's agent cost as Exgentic recorded it, summed over solved and unsolved runs and divided by the solved ones. The prices behind it and its treatment of cached tokens are not documented, and the simulated customer is excluded.",
      },
      {
        term: "Step check",
        detail: `${sc.sampledCalls} of GPT-5.2's ${count(sc.replayableCalls)} replayable recorded calls, sampled deterministically, were resent exactly as recorded (the conversation up to that step and the recorded tool list) to GPT-5.2 and to seven newer models, and each reply was compared with the recorded one, exactly, with no LLM judge. The recorded tool definitions carry no argument schemas, so every model saw tool names and descriptions only.`,
      },
      {
        term: "Step check intervals",
        detail: `Wilson score 95% intervals for single rates. Paired differences against GPT-5.2's repeat use a cluster bootstrap over the ${pairedRuns} recorded runs the sampled calls came from, ${count(sc.resamples)} resamples. A difference whose interval includes zero is reported as not distinguishable.`,
      },
    ],
    limitations: [
      ...rp.limitations,
      "In Exgentic's recordings, one run per task per model, with no repeats, so outcome noise was not measured there.",
      "The public data has no task identifier, so runs cannot be paired by task across models; only each model's own interval is shown.",
      "The step check measures similarity to GPT-5.2's recorded replies, not correctness: it cannot say which newer model would solve more tasks.",
      "Only GPT-5.2 could be reached for the step check, so step agreement could not be compared with recorded outcomes for the other four models.",
      "The recorded tool definitions have empty argument schemas, which affects every model in the step check, GPT-5.2's repeat included.",
      `The OpenAI models answered ${reference.answered} of the ${sc.sampledCalls} sampled calls and the others all ${sc.sampledCalls}, so their rates rest on slightly different call sets.`,
      "GPT-5.2's recorded settings (reasoning effort, temperature) are not in the data; the step check used provider defaults.",
      "Issue types come from text rules on the customer's first messages, not human labels.",
      "Recorded cost is Exgentic's figure, with undocumented prices and cached-token treatment, and without the simulated customer.",
      "The dataset declares no license, so this report shows aggregate numbers only.",
    ],
    datasets: [
      {
        name: "tau2-bench (Sierra Research)",
        href: rp.url,
        license: rp.license,
        description: `The benchmark our replays ran on: we used the Telecom domain's ${rp.tasks}-task test split, ${rp.version}.`,
      },
      {
        name: "Exgentic: agent-llm-traces-v2",
        href: d.dataset.url,
        description: `Public recorded agent runs across several benchmarks and harnesses, published by Exgentic. We used its ${count(d.dataset.keptCases)} tau2-bench Telecom runs from the tool-calling harness. The dataset declares no license, so we show aggregate numbers only.`,
      },
    ],
    sources: [],
  };
}
