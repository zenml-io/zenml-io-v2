/**
 * SwapBench report: is it safe to swap the model behind a production
 * customer-service agent, and which checks can tell? Reads the whitelisted
 * public export in src/data/benchmarks/swapbench.json. Hosted-provider rows,
 * the threshold sweep and values copied from write-ups are not in that file.
 */

import swapbench from "../../data/benchmarks/swapbench.json";
import {
  cents,
  interval,
  longDate,
  pct,
  pointInterval,
  points,
} from "./format";
import type { BenchmarkReport, ReportTable, TableCell } from "./types";

type ResultRow = (typeof swapbench.results.fintech)[number] & {
  deltaVsIncumbent?: number;
  deltaCi95?: number[];
  harmDelta?: number;
  truth?: string;
};
/** The two fields of a check result the verdict cell reads. */
type CheckResult = { verdict: string | null; score: string | null };

const DOMAINS = { fintech: "Bank", retail: "Retail" } as const;

const TRUTH: Record<string, string> = {
  REGRESSED: "Regressed",
  "NON-INFERIOR": "Holds",
  AMBIGUOUS: "Unclear",
};

const VERDICT: Record<string, string> = {
  SAFE: "Safe",
  UNSAFE: "Unsafe",
  "NOT ENOUGH EVIDENCE": "Not enough evidence",
};

/** A check's verdict, marked against the hidden-set truth. */
function verdictCell(result: CheckResult | null): TableCell {
  if (!result?.verdict) return { text: "", muted: true };
  const verdict = VERDICT[result.verdict] ?? result.verdict;
  switch (result.score) {
    case "correct":
      return { text: `${verdict} ✓` };
    case "false_safe":
      return { text: `${verdict} ✗ false safe`, level: 3 };
    case "false_unsafe":
      return { text: `${verdict} ✗ false alarm`, level: 2 };
    default:
      return { text: verdict, muted: true };
  }
}

const shortName = (name: string) => name.replace(/ \(self-hosted vLLM\)$/, "");

export function buildSwapbench(): BenchmarkReport {
  const s = swapbench;
  const fintech = s.results.fintech as ResultRow[];
  const retail = s.results.retail as ResultRow[];
  const find = (rows: ResultRow[], key: string) => {
    const row = rows.find((r) => r.model === key);
    if (!row) throw new Error(`SwapBench: no ${key} row`);
    return row;
  };
  const tally = (check: string) => {
    const row = s.verifierTally.find((t) => t.check.startsWith(check));
    if (!row) throw new Error(`SwapBench: no ${check} tally`);
    return row;
  };
  const nextStep = tally("next-step");
  const replay60 = tally("replay-60");
  const replay260 = tally("replay-260");
  const checkFor = (domain: string, key: string) => {
    const check = s.checks.find((c) => c.domain === domain && c.model === key);
    if (!check) throw new Error(`SwapBench: no ${domain} ${key} check`);
    return check;
  };

  const fp8Retail = checkFor("retail", "qwen27b-fp8");
  const fp8RetailRow = find(retail, "qwen27b-fp8");
  const stock = find(fintech, "qwen27b-bf16");
  const guards = find(fintech, "qwen27b-guards");
  const fixed = find(fintech, "qwen27b-fixed");
  const rft = find(fintech, "qwen27b-rft");
  const poolFixed = s.poolFix.find((r) => r.model === "qwen27b-fixed");
  const hermes = find(retail, "qwen27b-hermes");
  const incumbentFintech = find(fintech, "gpt-5");
  const incumbentRetail = find(retail, "haiku-5.5");
  const perDomain = s.dataset.perDomain;
  const hidden = perDomain["hidden (test)"];

  const tallyTable: ReportTable = {
    title: "How often each check got the verdict right",
    caption: `${nextStep.n} candidate swaps; ${nextStep.decidable} have a clear answer on the hidden set (${nextStep.regressed} regressed, ${nextStep.nonInferior} hold) and ${nextStep.ambiguous} are too close to call, so they are not scored.`,
    columns: [
      { label: "Check" },
      { label: "Right verdicts", align: "right" },
      { label: "Called a regression safe", align: "right" },
      { label: "Called a safe swap unsafe", align: "right" },
      { label: "Not enough evidence", align: "right" },
    ],
    rows: [
      ["Next-step agreement", nextStep],
      [`Full replay, ${perDomain["visible (train)"]} scenarios`, replay60],
      [
        `Full replay, ${perDomain["visible (train)"] + perDomain.pool} scenarios`,
        replay260,
      ],
    ].map(([label, t]) => {
      const row = t as typeof nextStep;
      return {
        cells: [
          { text: label as string },
          { text: `${row.correct} of ${row.decidable}` },
          {
            text: `${row.falseSafe} of ${row.regressed}`,
            level: row.falseSafe ? 3 : 0,
          },
          {
            text: `${row.falseUnsafe} of ${row.nonInferior}`,
            level: row.falseUnsafe ? 2 : 0,
          },
          { text: String(row.notEnoughEvidence) },
        ],
      };
    }),
    footnote:
      "A full replay can say it has not seen enough evidence; next-step agreement always gives a verdict.",
  };

  const verdictTable: ReportTable = {
    title: "Every swap, every check",
    caption: `Truth is the paired success difference against the incumbent on the ${hidden} hidden scenarios, twice each, with a 5-point margin; a swap whose harmful actions rise also counts as regressed. Next-step agreement compares the candidate's next tool call with the incumbent's recorded one, against the incumbent's agreement with itself.`,
    columns: [
      { label: "Swap" },
      { label: "Domain" },
      { label: "Truth (points, 95% CI)", align: "right" },
      { label: "Next-step agreement", align: "right" },
      { label: "Next-step verdict" },
      { label: "Replay, 60" },
      { label: "Replay, 260" },
    ],
    rows: s.checks.map((c) => ({
      cells: [
        { text: shortName(c.name) },
        { text: DOMAINS[c.domain as keyof typeof DOMAINS], muted: true },
        {
          text: `${TRUTH[c.truth] ?? c.truth} ${points(c.truthDelta * 100)} ${pointInterval(c.truthCi95.map((x) => x * 100))}`,
        },
        c.nextStep?.agreement != null
          ? {
              text: `${pct(c.nextStep.agreement)} vs ${pct(c.nextStep.incumbent_self_agreement ?? 0)}`,
            }
          : { text: "same model", muted: true },
        verdictCell(c.nextStep),
        verdictCell(c.replay60),
        verdictCell(c.replay260),
      ],
    })),
    footnote:
      "✓ matches the truth. ✗ false safe: a regression called safe. ✗ false alarm: a swap that holds called unsafe. Swaps with unclear truth are not marked.",
  };

  const resultsTable = (
    rows: ResultRow[],
    incumbent: ResultRow,
    domain: string,
  ): ReportTable => ({
    title: `${domain}: full conversations on the hidden set`,
    caption: `${hidden} hidden scenarios, twice each, against stateful tools and a simulated customer. Graded by the tools' end state; ${incumbent.name} is the incumbent.`,
    columns: [
      { label: "Model" },
      { label: "Resolved", align: "right" },
      { label: "Success", align: "right" },
      { label: "95% CI", align: "right" },
      { label: `vs. ${incumbent.name} (points, 95% CI)`, align: "right" },
      { label: "Harmful actions per conversation", align: "right" },
      { label: "Cost per resolved", align: "right" },
      { label: "Truth" },
    ],
    rows: [
      incumbent,
      ...rows
        .filter((r) => r !== incumbent)
        .sort((a, b) => (b.deltaVsIncumbent ?? 0) - (a.deltaVsIncumbent ?? 0)),
    ].map((r) => ({
      highlight: r === incumbent,
      cells: [
        { text: shortName(r.name) },
        { text: `${r.correct} / ${r.n}` },
        { text: pct(r.success) },
        { text: interval(r.ci95), muted: true },
        r.deltaVsIncumbent != null && r.deltaCi95
          ? {
              text: `${points(r.deltaVsIncumbent * 100)} ${pointInterval(r.deltaCi95.map((x) => x * 100))}`,
            }
          : { text: "incumbent", muted: true },
        { text: r.harmPerConversation.toFixed(3) },
        r.costPerCorrectCents != null
          ? { text: cents(r.costPerCorrectCents) }
          : { text: "self-hosted", muted: true },
        { text: r.truth ? (TRUTH[r.truth] ?? r.truth) : "", muted: !r.truth },
      ],
    })),
    footnote:
      "Self-hosted models ran on our own vLLM servers, so they have no token price. API costs use list prices pinned on the run dates and leave out the simulated customer.",
  });

  const poolTable: ReportTable = {
    title: "The fix, confirmed on scenarios nobody looked at",
    caption: `The policy clarification was found on the hidden set, so it was re-tested on ${perDomain.pool} pool scenarios that were never inspected.`,
    columns: [
      { label: "Model" },
      { label: "Resolved", align: "right" },
      { label: "Success", align: "right" },
      {
        label: `vs. ${incumbentFintech.name} (points, 95% CI)`,
        align: "right",
      },
      { label: "Harmful actions", align: "right" },
    ],
    rows: s.poolFix.map((r) => {
      const delta = "deltaVsIncumbent" in r ? r.deltaVsIncumbent : undefined;
      const ci = "deltaCi95" in r ? r.deltaCi95 : undefined;
      return {
        cells: [
          { text: shortName(r.name) },
          { text: `${r.correct} / ${r.n}` },
          { text: pct(r.success) },
          delta != null && ci
            ? {
                text: `${points(delta * 100)} ${pointInterval(ci.map((x) => x * 100))}`,
              }
            : { text: "incumbent", muted: true },
          { text: String(r.harmfulActionsTotal) },
        ],
      };
    }),
    footnote:
      "The fixed agent ran each pool scenario twice, so it has twice as many conversations.",
  };

  const failureModels = ["gpt-6-luna", "qwen27b-bf16", "qwen27b-fp8"];
  const bankFailures = s.failures.filter((f) =>
    failureModels.some((m) => m in f.counts),
  );
  const failureTable: ReportTable = {
    title: "Where bank conversations went wrong",
    caption: `Bank conversations ${incumbentFintech.name} resolved and the candidate did not, classified at the first decision that went wrong.`,
    columns: [
      { label: "First wrong decision" },
      ...failureModels.map((m) => ({
        label: shortName(find(fintech, m).name),
        align: "right" as const,
      })),
    ],
    rows: bankFailures.map((f) => ({
      cells: [
        {
          text: (
            f.category.charAt(0).toUpperCase() + f.category.slice(1)
          ).replace("the gold", "the correct resolution"),
        },
        ...failureModels.map((m) => {
          const count =
            (f.counts as Record<string, number | undefined>)[m] ?? 0;
          return count ? { text: String(count) } : { text: "0", muted: true };
        }),
      ],
    })),
    footnote:
      "Most lost conversations were needless handoffs: the agent offered a transfer to a person, the customer accepted, and the right resolution had none.",
  };

  const allCandidates = s.checks.length;
  const flipped = s.checks.filter(
    (c) => c.nextStep?.score === "false_safe",
  ).length;

  return {
    slug: "swapbench",
    name: "SwapBench",
    tags: ["Model swap", "Customer service", "Kitaru replay"],
    industry: "customer-service",
    date: "2026-10-15",
    card: {
      domain: "Customer-service agents",
      data: "Synthetic scenarios · tau2-bench",
      finding: `Next-step agreement called ${nextStep.falseSafe} of ${nextStep.regressed} regressed swaps safe. A full replay on ${perDomain["visible (train)"] + perDomain.pool} scenarios made no wrong call: ${replay260.correct} right verdicts, and it said so when it did not have enough evidence.`,
      stats: [
        { value: String(allCandidates), label: "candidate swaps" },
        {
          value: s.dataset.totalScenarios.toLocaleString("en-US"),
          label: "scenarios",
        },
        {
          value: `${flipped} of ${nextStep.regressed}`,
          label: "regressions next-step agreement called safe",
        },
      ],
    },
    title: "Is it safe to swap the model behind your agent?",
    eyebrow: "Benchmark · SwapBench",
    deck: `${allCandidates} model swaps behind two customer-service agents, a bank and a store. We ran each swap on hidden scenarios to learn the truth, then asked which cheaper checks would have caught the regressions.`,
    seoTitle: "SwapBench: which checks can tell if a model swap is safe?",
    seoDescription: `${allCandidates} model swaps behind bank and retail support agents, scored against hidden-set truth. Next-step agreement called ${nextStep.falseSafe} of ${nextStep.regressed} regressions safe; a 260-scenario replay made no wrong call. Results, intervals and method.`,
    facts: [
      { label: "Status", value: "Complete" },
      { label: "Run", value: "October 13 to 15, 2026" },
      { label: "Domains", value: "Bank and retail support" },
      {
        label: "Swaps",
        value: `${allCandidates} (${nextStep.decidable} with a clear answer)`,
      },
      {
        label: "Scenarios",
        value: `${s.dataset.totalScenarios.toLocaleString("en-US")} (${hidden} hidden per domain)`,
      },
      {
        label: "Agent tokens",
        value: `$${s.meta.recordedAgentTokenCostUsd.toFixed(2)}`,
      },
    ],
    findings: [
      `Next-step agreement, the cheap check, called ${nextStep.falseSafe} of ${nextStep.regressed} regressed swaps safe and called both swaps that hold (${nextStep.falseUnsafe} of ${nextStep.nonInferior}) unsafe. It got ${nextStep.correct} of ${nextStep.decidable} verdicts right.`,
      `A full replay on ${perDomain["visible (train)"] + perDomain.pool} scenarios never called a regression safe or a good swap unsafe. It got ${replay260.correct} verdicts right and said "not enough evidence" on the other ${replay260.notEnoughEvidence}.`,
      `Imitating the incumbent is not the same as doing the job: on retail, self-hosted Qwen3.8-27B FP8 matched ${fp8Retail.nextStep?.tool_steps_agreeing} of ${fp8Retail.nextStep?.tool_steps} of the incumbent's next tool calls, yet resolved ${Math.abs((fp8RetailRow.deltaVsIncumbent ?? 0) * 100).toFixed(1)} points fewer hidden conversations.`,
      `A three-line policy clarification turned the regressed self-hosted Qwen3.8-27B (${points((stock.deltaVsIncumbent ?? 0) * 100)} points) into a bank agent that holds (${points((fixed.deltaVsIncumbent ?? 0) * 100)} ${pointInterval((fixed.deltaCi95 ?? []).map((x) => x * 100))}), confirmed on ${perDomain.pool} scenarios nobody had looked at (${points(((poolFixed && "deltaVsIncumbent" in poolFixed ? poolFixed.deltaVsIncumbent : 0) ?? 0) * 100)}). Tool guardrails alone left it at ${points((guards.deltaVsIncumbent ?? 0) * 100)}.`,
      `The same weights behind vLLM's generic tool parser resolved ${hermes.correct} of ${hermes.n} retail conversations, with no errors raised. How the endpoint is configured is a swap risk of its own.`,
      `Fine-tuning Qwen3.8-27B on its own successful bank conversations did not change success (${points((rft.deltaVsIncumbent ?? 0) * 100)} against ${points((stock.deltaVsIncumbent ?? 0) * 100)} before); output tokens per conversation fell from ${Math.round(stock.outputTokensPerCase).toLocaleString("en-US")} to ${Math.round(rft.outputTokensPerCase).toLocaleString("en-US")}.`,
    ],
    sections: [
      {
        id: "checks",
        title: "Which checks can tell",
        intro:
          "Each swap was first run for real on hidden scenarios to learn whether it regressed. Then each check gave its verdict without seeing that answer.",
        tables: [tallyTable, verdictTable],
      },
      {
        id: "results",
        title: "Results",
        intro: `The ground truth: every candidate against the incumbent, ${incumbentFintech.name} for the bank and ${incumbentRetail.name} for retail.`,
        tables: [
          resultsTable(fintech, incumbentFintech, "Bank"),
          resultsTable(retail, incumbentRetail, "Retail"),
        ],
      },
      {
        id: "fix",
        title: "Fixing a regressed swap",
        intro:
          "Stock Qwen3.8-27B regressed as a bank agent, mostly by handing customers to a person when it didn't need to. Guardrails in the tools didn't help; three lines of policy did.",
        tables: [poolTable, failureTable],
      },
    ],
    method: [
      {
        term: "Scenarios",
        detail: `Two generated domains with ground truth by construction: a fictional bank with 7 tools and a written policy, and a store built on tau2-bench's retail world (15 tools). Each domain has ${perDomain["visible (train)"]} visible, ${perDomain.pool} pool and ${hidden} hidden scenarios. The hidden sets are not released.`,
      },
      {
        term: "Agents",
        detail: `${incumbentFintech.name} is the bank incumbent and ${incumbentRetail.name} the retail incumbent. Candidates include closed API models and self-hosted open models on vLLM, plus variants of one model: quantized, with thinking off, with guardrails, fine-tuned, and behind a different tool parser.`,
      },
      {
        term: "Customer",
        detail:
          "Claude Haiku 5.5 plays the customer from each scenario's instructions in every run. Money-moving tool calls are recorded, never executed.",
      },
      {
        term: "Grading",
        detail:
          "No LLM judge. A conversation passes if the tools' final state equals the state after the correct calls. A harmful action is a successful write that matches no correct write.",
      },
      {
        term: "Truth",
        detail:
          "A swap regressed if its paired success difference is 5 points or more below the incumbent, or harmful actions rise; it holds if the lower end of its 95% interval is above −5 points and harm doesn't rise; otherwise the truth is unclear and the swap is not scored.",
      },
      {
        term: "Checks",
        detail: `Next-step agreement: the candidate sees each recorded step of the incumbent's visible conversations and picks its next action; safe if its agreement is within 5 points of the incumbent's agreement with itself. Full replay: whole conversations on ${perDomain["visible (train)"]} or ${perDomain["visible (train)"] + perDomain.pool} scenarios with the same 5-point gate, which can also answer "not enough evidence".`,
      },
      {
        term: "Noise",
        detail: `Paired cluster bootstrap over scenarios, ${s.noise.resamples.toLocaleString("en-US")} resamples. The retail incumbent re-run against itself moved ${points(s.noise.rerunDelta * 100)} points ${pointInterval(s.noise.rerunCi95.map((x) => x * 100))} on ${s.noise.nScenarios} scenarios.`,
      },
      {
        term: "Scenario review",
        detail: `A separate Claude agent with no access to the generators or grader reviewed ${s.reviewer.reviewed} hidden scenarios: ${s.reviewer.pass} pass, ${s.reviewer.minor} minor issues, ${s.reviewer.fail} fail. All ${s.reviewer.fail} failures are one retail kind (cancel an already-delivered order, ${s.dataset.flawedRetailKind.count} of ${s.dataset.flawedRetailKind.of} hidden retail scenarios), kept so published numbers stay comparable.`,
      },
      {
        term: "Cost",
        detail: `Agent token cost at list prices pinned on the run dates, recorded on every conversation: $${s.meta.recordedAgentTokenCostUsd.toFixed(2)} in total. It leaves out the simulated customer and GPU time for the self-hosted models. Run dates: ${longDate("2026-10-13")} to ${longDate("2026-10-15")}.`,
      },
    ],
    limitations: s.limitations,
    datasets: [
      {
        name: "tau2-bench (Sierra Research)",
        href: "https://github.com/sierra-research/tau2-bench",
        license: "MIT",
        description:
          "The open harness the agents ran in, and the retail world (catalogue, users and orders) the retail scenarios were generated on. SwapBench's own scenario sets are not released yet.",
      },
    ],
    sources: [],
  };
}
