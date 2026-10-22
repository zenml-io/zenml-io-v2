/**
 * Underwriting benchmark report: 12 models as one insurance underwriting
 * agent on Snorkel AI's public cases. Reads the whitelisted public export in
 * src/data/benchmarks/underwriting.json.
 */

import underwriting from "../../data/benchmarks/underwriting.json";
import { cents, interval, pct, pointInterval, points } from "./format";
import type { BenchmarkReport, ReportTable, TableCell } from "./types";

type Row = (typeof underwriting.results.first_prompt_all_cases)[number];

export function buildUnderwriting(): BenchmarkReport {
  const u = underwriting;
  const models = new Map(u.models.map((m) => [m.key, m]));
  const name = (key: string) => {
    const model = models.get(key);
    return model ? `${model.name}${model.priceUnverified ? " †" : ""}` : key;
  };
  const plainName = (key: string) =>
    models.get(key)?.name ??
    models.get(key.replace("claude-", "").replace("-5-5", "-5.5"))?.name ??
    key;
  const weights = (key: string) => models.get(key)?.weights ?? "";
  const byAccuracy = (rows: Row[]) =>
    [...rows].sort(
      (a, b) =>
        b.accuracy - a.accuracy ||
        a.costPerCorrectCents - b.costPerCorrectCents,
    );
  const find = (rows: Row[], key: string) => rows.find((r) => r.model === key);

  const R = u.results;
  const shared = byAccuracy(R.shared_rewritten_prompt_held_out);
  const first = byAccuracy(R.first_prompt_all_cases);
  const firstHeld = R.first_prompt_held_out;
  // The top group: every model within the measured run-to-run noise of the best score.
  const tied = shared.filter(
    (r) => (shared[0].accuracy - r.accuracy) * 100 <= u.noise.sizePoints,
  );
  const topTie = Math.min(...tied.map((r) => r.accuracy));
  const priceFoot = `† Open-weight model on a commercial inference provider; price from list prices on ${u.priceDate}, unverified. Closed models use the vendor's list price on the same date. Cost per correct decision counts only the agent's model calls, not the simulated underwriter or the judges.`;

  const sharedTable: ReportTable = {
    title: "One shared prompt, held-out cases",
    caption: `Sonnet 5.5's rewritten prompt, unchanged, on every model. ${u.dataset.heldOut} held-out cases the rewrite never saw. Highlighted rows are within the ${u.noise.sizePoints}-point run-to-run noise of the top score.`,
    columns: [
      { label: "Model" },
      { label: "Weights" },
      { label: "Correct", align: "right" },
      { label: "Accuracy", align: "right" },
      { label: "95% CI", align: "right" },
      { label: "Cost per correct", align: "right" },
      { label: "vs. first prompt (points)", align: "right" },
    ],
    rows: shared.map((r) => ({
      highlight: r.accuracy >= topTie,
      cells: [
        { text: name(r.model) },
        { text: weights(r.model), muted: true },
        { text: `${r.correct} / ${r.n}` },
        { text: pct(r.accuracy) },
        { text: interval(r.ci95), muted: true },
        { text: cents(r.costPerCorrectCents) },
        {
          text: r.paired
            ? `${points(r.paired.deltaPoints)} ${pointInterval(r.paired.ci95Points)}`
            : "",
        },
      ],
    })),
    footnote: priceFoot,
  };

  const firstTable: ReportTable = {
    title: "First prompt, all cases",
    caption: `One system prompt written once, the same for every model, default settings, all ${u.dataset.keptCases} cases. The leaderboard most teams would stop at.`,
    columns: [
      { label: "Model" },
      { label: "Weights" },
      { label: "Correct", align: "right" },
      { label: "Accuracy", align: "right" },
      { label: "95% CI", align: "right" },
      { label: "Cost per correct", align: "right" },
      { label: "Model calls per case", align: "right" },
    ],
    rows: first.map((r) => ({
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
    footnote: priceFoot,
  };

  const tuned = R.per_model_rewritten_prompt_held_out;
  const promptTable: ReportTable = {
    title: "Does tuning each model's own prompt help?",
    caption:
      "Held-out accuracy for the models whose own rewritten prompt improved their learning score.",
    columns: [
      { label: "Model" },
      { label: "First prompt", align: "right" },
      { label: "Own rewritten prompt", align: "right" },
      { label: "Shared prompt", align: "right" },
    ],
    rows: byAccuracy(tuned).map((r) => ({
      cells: [
        { text: name(r.model) },
        { text: pct(find(firstHeld, r.model)?.accuracy ?? Number.NaN) },
        { text: pct(r.accuracy) },
        {
          text: pct(
            find(R.shared_rewritten_prompt_held_out, r.model)?.accuracy ??
              Number.NaN,
          ),
        },
      ],
    })),
  };

  const effortModels = [
    ...new Set(
      [
        ...R.effort_high_held_out,
        ...R.effort_medium_held_out,
        ...R.effort_low_held_out,
      ].map((r) => r.model),
    ),
  ];
  const effortCell = (rows: Row[], key: string): TableCell => {
    const r = find(rows, key);
    return r?.paired
      ? { text: `${pct(r.accuracy)} (${points(r.paired.deltaPoints)})` }
      : { text: "not run", muted: true };
  };
  const effortTable: ReportTable = {
    title: "Reasoning effort",
    caption:
      "First prompt, held-out cases. In brackets: the change in points against the same model at its default effort.",
    columns: [
      { label: "Model" },
      { label: "Default", align: "right" },
      { label: "Low", align: "right" },
      { label: "Medium", align: "right" },
      { label: "High", align: "right" },
    ],
    rows: effortModels.map((key) => ({
      cells: [
        { text: name(key) },
        { text: pct(find(firstHeld, key)?.accuracy ?? Number.NaN) },
        effortCell(R.effort_low_held_out, key),
        effortCell(R.effort_medium_held_out, key),
        effortCell(R.effort_high_held_out, key),
      ],
    })),
  };

  const types = u.dataset.types.map((t) => t.type);
  const heat = (correct: number, n: number): 0 | 1 | 2 | 3 => {
    const miss = 1 - correct / n;
    return miss === 0 ? 0 : miss < 0.1 ? 1 : miss < 0.25 ? 2 : 3;
  };
  const typeTable = (
    condition: keyof typeof u.perType,
    order: Row[],
    title: string,
    caption: string,
  ): ReportTable => ({
    title,
    caption,
    columns: [
      { label: "Model" },
      ...types.map((t) => ({ label: t, align: "right" as const })),
    ],
    rows: order.map((r) => {
      const perModel = u.perType[condition][
        r.model as keyof (typeof u.perType)[typeof condition]
      ] as Record<string, { n: number; correct: number }> | undefined;
      return {
        cells: [
          { text: name(r.model) },
          ...types.map((t) => {
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
    footnote: "Darker cells missed more cases of that type.",
  });

  const failureLabels: Record<string, string> = {
    wrong_decision: "Wrong decision",
    final_answer_asks_for_information: "Ended on a question",
    empty_final_answer: "Empty final answer",
    step_limit: "Ran out of steps",
    turn_limit: "Ran out of turns",
    empty_reply: "Stopped replying",
    unreadable_tool_call: "Unreadable tool call",
  };
  const failureTable: ReportTable = {
    title: "How the wrong answers went wrong",
    caption: `First prompt, all ${u.dataset.keptCases} cases. Unreadable tool calls overlap the other columns: the agent got an error and could carry on.`,
    columns: [
      { label: "Model" },
      ...u.failures.map((f) => ({
        label: failureLabels[f.category] ?? f.category,
        align: "right" as const,
      })),
    ],
    rows: first.map((r) => ({
      cells: [
        { text: name(r.model) },
        ...u.failures.map((f) => {
          const count = f.counts[r.model as keyof typeof f.counts] ?? 0;
          return count ? { text: String(count) } : { text: "0", muted: true };
        }),
      ],
    })),
  };

  const screen = u.stepScreen;
  const screenTable: ReportTable = {
    title: "Step-level screen vs. full runs",
    caption: `250 recorded Sonnet 5.5 model calls resent to each candidate. "Same tool" is how often a candidate's next step picks Sonnet's tool; Sonnet matches its own recording ${pct(screen.rows[0].sameTool)} of the time. The full-run column is each model's first-prompt accuracy on all ${u.dataset.keptCases} cases, paired against Sonnet.`,
    columns: [
      { label: "Candidate" },
      { label: "Same tool as Sonnet", align: "right" },
      { label: "Full run vs. Sonnet (points, 95% CI)", align: "right" },
    ],
    rows: screen.rows
      .filter((r) => r.fullRun)
      .sort((a, b) => b.sameTool - a.sameTool)
      .map((r) => ({
        highlight: r.model === screen.cheapestHolder,
        cells: [
          { text: name(r.model) },
          { text: pct(r.sameTool) },
          {
            text: r.fullRun
              ? `${points(r.fullRun.deltaPoints)} ${pointInterval(r.fullRun.ci95Points)}`
              : "",
          },
        ],
      })),
    footnote: `Highlighted: ${plainName(screen.cheapestHolder)}, the cheapest model that held quality in full runs (${screen.holdsDefinition}). The screen ranked it ${screen.rankOfCheapestHolder}th of 11.`,
  };

  const replayTable: ReportTable = {
    title: "Full replays in Kitaru",
    caption:
      "48 cases recorded with Sonnet 5.5 and the first prompt, replayed end to end with each candidate swapped in, paired on the same cases.",
    columns: [
      { label: "Swap Sonnet 5.5 for" },
      { label: "Correct", align: "right" },
      { label: "Sonnet, same cases", align: "right" },
      { label: "Difference (points, 95% CI)", align: "right" },
    ],
    rows: u.fullReplay.rows.map((r) => ({
      cells: [
        { text: name(r.model) },
        { text: `${r.correct} / ${r.n}` },
        { text: `${r.referenceCorrect} / ${r.n}` },
        { text: `${points(r.deltaPoints)} ${pointInterval(r.ci95Points)}` },
      ],
    })),
    footnote: `Claude Haiku 5.5 has n = 47: one baseline case did not record cleanly. Spend for these replays: $${u.fullReplay.spendUsd.toFixed(2)}.`,
  };

  const haiku = find(R.shared_rewritten_prompt_held_out, "haiku-5.5");
  const opus = find(R.shared_rewritten_prompt_held_out, "opus-5.5");
  const sonnetTuned = find(R.per_model_rewritten_prompt_held_out, "sonnet-5.5");
  const lifted = R.shared_rewritten_prompt_held_out.filter(
    (r) => r.model !== "sonnet-5.5" && (r.paired?.deltaPoints ?? 0) > 0,
  ).length;
  const firstCosts = first.map((r) => r.costPerCorrectCents);
  const spread = Math.round(Math.max(...firstCosts) / Math.min(...firstCosts));
  const humanRates = u.grading.humanAgreement.map((h) => h.rate * 100);
  const fmtDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });

  return {
    slug: "underwriting",
    group: "agents",
    date: u.meta.run_dates.shared_prompt_run,
    card: {
      domain: "Insurance underwriting",
      data: "Public data · Snorkel AI",
      finding: `Under the first prompt the leaderboard looked clear. After one prompt rewrite, ${tied.length} of ${u.models.length} models scored between ${pct(topTie)} and ${pct(shared[0].accuracy)}, and Claude Haiku 5.5 cost ${cents(haiku?.costPerCorrectCents ?? 0)} per correct decision against Opus 5.5's ${cents(opus?.costPerCorrectCents ?? 0)}.`,
      stats: [
        { value: String(u.models.length), label: "models" },
        { value: String(u.dataset.keptCases), label: "cases" },
        {
          value: cents(haiku?.costPerCorrectCents ?? 0),
          label: "per correct decision, Haiku 5.5",
        },
      ],
    },
    postSlug: "there-is-no-best-model-for-your-agent",
    title: "Which model should an underwriting agent run on?",
    eyebrow: "Benchmark · Insurance underwriting",
    deck: `${u.models.length} models run the same insurance underwriting agent on ${u.dataset.keptCases} public cases. We measured what each correct decision costs, and how much of the gap between models is the prompt.`,
    seoTitle:
      "Underwriting agent benchmark: 12 models, cost per correct decision",
    seoDescription: `12 models on ${u.dataset.keptCases} public Snorkel AI underwriting cases. With one rewritten prompt, 9 of 12 tied at the top, and Claude Haiku 5.5 cost ${cents(haiku?.costPerCorrectCents ?? 0)} per correct decision. Full results, intervals and method.`,
    facts: [
      { label: "Status", value: "Complete" },
      {
        label: "Run",
        value: `${fmtDate(u.meta.run_dates.first_run)} to ${fmtDate(u.meta.run_dates.shared_prompt_run)}`,
      },
      {
        label: "Models",
        value: `${u.models.length} (${u.models.filter((m) => m.weights === "open").length} open-weight)`,
      },
      {
        label: "Cases",
        value: `${u.dataset.keptCases} (${u.dataset.heldOut} held out)`,
      },
      { label: "Data", value: `Snorkel AI, ${u.dataset.license}` },
      { label: "Spend", value: `$${u.meta.spendUsd.toFixed(2)}` },
    ],
    findings: [
      `Under the first prompt, accuracy ran from ${pct(first.at(-1)?.accuracy ?? 0)} to ${pct(first[0].accuracy)} and cost per correct decision varied ${spread}× from cheapest to most expensive. Most of that gap was prompt fit, not underwriting knowledge.`,
      `One rewritten prompt, shared unchanged, lifted ${lifted} of the 11 other models. ${tied.length} of ${u.models.length} then scored between ${pct(topTie)} and ${pct(shared[0].accuracy)}, within the ${u.noise.sizePoints}-point run-to-run noise of each other.`,
      `With accuracy tied, the choice is cost: Claude Haiku 5.5 got ${haiku?.correct} / ${haiku?.n} right at ${cents(haiku?.costPerCorrectCents ?? 0)} per correct decision, against Claude Opus 5.5's ${opus?.correct} / ${opus?.n} at ${cents(opus?.costPerCorrectCents ?? 0)}.`,
      `The prompt beat every model swap: Sonnet 5.5 went from ${pct(find(firstHeld, "sonnet-5.5")?.accuracy ?? 0)} to ${pct(sonnetTuned?.accuracy ?? 0)} on its own rewritten prompt, while running it twice with nothing changed moved it ${u.noise.sizePoints} points.`,
      `A cheap step-level screen ruled out clear failures but ranked the cheapest model that held quality ${screen.rankOfCheapestHolder}th of 11. Full runs decided.`,
    ],
    sections: [
      {
        id: "results",
        title: "Results",
        intro:
          "Read the shared-prompt table first: it compares models under the best prompt we found, which is the fair comparison. The first-prompt table shows how different the picture looks before that.",
        tables: [sharedTable, firstTable, promptTable, effortTable],
      },
      {
        id: "by-type",
        title: "By question type",
        intro:
          "The agent answers six kinds of underwriting question. Under the first prompt, policy limits and product recommendations separated the field; the shared prompt closed most of those gaps.",
        tables: [
          typeTable(
            "first_prompt_all_cases",
            first,
            "First prompt, all cases",
            `Correct answers per question type, all ${u.dataset.keptCases} cases.`,
          ),
          typeTable(
            "shared_rewritten_prompt_held_out",
            shared,
            "Shared prompt, held-out cases",
            `Correct answers per question type, ${u.dataset.heldOut} held-out cases.`,
          ),
        ],
      },
      {
        id: "failures",
        title: "Failures",
        intro:
          "Some models failed on the conversation, not the underwriting: they put their final answer on a question, sent tool calls that couldn't be parsed, or ran out of steps.",
        tables: [failureTable],
      },
      {
        id: "replays",
        title: "Testing a swap with Kitaru",
        intro:
          "Most teams don't run a benchmark; they ask whether one swap is safe. We tested that path from the Sonnet 5.5 agent with the first prompt: a cheap step-level screen first, then full replays.",
        tables: [screenTable, replayTable],
      },
    ],
    method: [
      {
        term: "Dataset",
        detail: `${u.dataset.source} (${u.dataset.license}), plus ${u.dataset.otherSources.join(" and ")}. ${u.dataset.droppedReason} ${u.dataset.keptCases} of ${u.dataset.totalCases} cases kept.`,
      },
      {
        term: "Split",
        detail: `${u.dataset.learning} learning cases and ${u.dataset.heldOut} held-out cases, stratified by question type. Prompt tuning only saw the learning cases; every tuned, shared-prompt, effort and repeat result is on the held-out cases.`,
      },
      {
        term: "Agent",
        detail: `Six tools over the insurer's rebuilt database and guidelines: ${u.setup.tools.join(", ")}. ${u.setup.limits}`,
      },
      { term: "Underwriter", detail: u.setup.userSimulator },
      {
        term: "Grading",
        detail: `Two judges (${u.grading.judges.map(plainName).join(" and ")}) compare each final answer with the reference. ${u.grading.tieBreak} Each judge agrees with Snorkel's human labels ${Math.min(...humanRates).toFixed(1)}% to ${Math.max(...humanRates).toFixed(1)}% of the time (n = ${u.grading.humanAgreement.map((h) => h.n).join(", ")}). Re-grading the three judges' own answers with other judges moved them ${u.grading.selfGrading.map((s) => points(s.deltaPoints)).join(", ")} points.`,
      },
      {
        term: "Noise",
        detail: `${u.noise.method} It moved ${u.noise.sizePoints} points ${pointInterval(u.noise.ci95Points)}. ${u.noise.ciMethod} ${u.noise.resamples} resamples. ${u.noise.tieThreshold}`,
      },
      {
        term: "Prompt rewriting",
        detail: `${u.setup.promptRewriting.method} ${u.setup.promptRewriting.leakageCheck} What changed: ${u.setup.promptRewriting.whatChanged}`,
      },
      {
        term: "Memorization",
        detail: `${u.memorization.method} ${u.memorization.summary}`,
      },
      {
        term: "Cost",
        detail: `Cost per correct decision = the agent's model-call cost over all cases, divided by correct answers, at list prices on ${fmtDate(u.priceDate)}. Failed and timed-out cases stay in the count as wrong.`,
      },
    ],
    limitations: u.limitations,
    datasets: u.dataset.urls.map((href) => ({
      name: `Snorkel AI: ${href.split("/").at(-1)?.replace(/-/g, " ")}`,
      href,
      license: u.dataset.license,
      description: `Multi-turn conversations between an underwriter and an AI assistant about small-business applications. We kept ${u.dataset.keptCases} of the ${u.dataset.totalCases} cases (see Method).`,
      huggingFace: href.replace("https://huggingface.co/datasets/", ""),
    })),
    sources: [
      {
        label: "Snorkel's own underwriting leaderboard (accuracy only)",
        href: "https://snorkel.ai/leaderboard/snorkel-underwrite/",
      },
    ],
  };
}
