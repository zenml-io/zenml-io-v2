---
title: "LangSmith vs Arize vs Kitaru: Which Is Best for Testing AI Agents?"
slug: "langsmith-vs-arize"
draft: false
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "evaluation"
  - "discovery"
date: "2026-09-22T11:46:43.978Z"
readingTime: "21 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/langsmith-vs-arize/e4ff037f/langsmith-vs-arize-cover.avif"
  alt: "Kitaru comparison card for LangSmith vs Arize vs Kitaru, which is better to test AI agents, showing the Kitaru, LangSmith, and Arize logos"
featuredImage:
  url: "https://assets.zenml.io/content/blog/langsmith-vs-arize/e4ff037f/langsmith-vs-arize-cover.avif"
  alt: "Kitaru comparison card for LangSmith vs Arize vs Kitaru, which is better to test AI agents, showing the Kitaru, LangSmith, and Arize logos"
seo:
  title: "LangSmith vs Arize vs Kitaru: Testing AI Agents - ZenML Blog"
  description: "LangSmith vs Arize AX vs Kitaru compared on turning traces into test cases, testing agent changes, catching regressions, evaluators, and pricing."
  canonical: "https://www.zenml.io/blog/langsmith-vs-arize"
  ogImage: "https://assets.zenml.io/content/blog/langsmith-vs-arize/78aca7a4/langsmith-vs-arize-cover.jpg"
---

Most agent teams already have traces. What they usually lack is a way to test whether the next model swap, prompt edit, or tool change breaks what already works.

LangSmith and Arize AX both grew out of observability and both now sell evaluation on top. Kitaru takes a different route. It imports recorded sessions and re-runs your agent’s real code against them.

All three can turn production runs into test cases, run experiments, and compare results. However, they differ in what they test.

In this LangSmith vs Arize vs Kitaru comparison, we’ll compare how these tools turn traces into test cases, test agent changes, catch regressions, and run evaluators. Then we’ll cover pricing and where each fits.

**👀 Note:** Arize Phoenix is Arize’s open-source, local-first observability and evaluation platform, and it already includes datasets, experiments, evaluators, and prompt iteration. Arize AX is the commercial managed platform and adds production-focused capabilities such as Signal, full-agent experiments, Agent-as-a-Judge, managed agents, and enterprise controls. We compare Arize AX here because those managed production features are the closest comparison for agent testing.

## LangSmith vs Arize vs Kitaru: Key Takeaways

- **[Kitaru](https://www.zenml.io/product/kitaru):** An open-source replay and evaluation tool for AI agents. It imports traces from the tool you already use, turns selected sessions into versioned cohorts, and re-executes your agent code against them with a model, prompt, or tool change. It is the strongest of the three at production-derived regression testing, and the weakest at being a monitoring dashboard, because it is not one.
- **[LangSmith](https://www.langchain.com/langsmith):** LangSmith is an observability and evaluation platform. It’s one of the most mature evaluation toolkits with tracing, datasets, experiments, human review, and automation rules. Its test loop runs your target function against dataset rows and compares the results across experiments.
- **[Arize AX](https://arize.com/):** It combines trace analysis, experiments, human review, and several evaluator modes. Arize supports LLM and code evaluators plus Agent-as-a-Judge, an agentic harness that can inspect trace context at runtime. As of September 2026, Arize describes Agent-as-a-Judge as a closed Enterprise beta, with Claude Code supported as the harness.

## What Problems are These Tools Actually Solving?

The three tools overlap in features and can help you test agents. But each solves a different problem.

### Kitaru

![Kitaru homepage: better, faster, cheaper agents tested on production data, with a terminal showing the wrap, import, interview, and experiment steps](https://assets.zenml.io/content/blog/langsmith-vs-arize/dce1e17d/image1.avif)

With Kitaru, you can see whether a change will break what already works in production.

A production run becomes a session. You can record it live through a framework adapter or import it from a trace provider. You then group selected sessions into a versioned cohort, attach evaluators, and replay them against a candidate change. The output compares a baseline score and a changed score for each real case, side by side.

Replay is the key difference. Kitaru starts the agent from the top and reruns its real code. A tool policy decides what happens when the agent calls a tool. The usual regression setup returns a recorded result for a matching historical call and fails if the new path asks for something the recording cannot answer.

Kitaru stays focused on this testing loop. It doesn't try to replace your observability tool. It assumes you already have an observability tool, and uses traces from that tool as regression cases.

### LangSmith

![LangSmith homepage describing the agent engineering platform for observing, evaluating, and deploying agents, with a build, test, deploy, and monitor loop](https://assets.zenml.io/content/blog/langsmith-vs-arize/e5d52a54/image2.avif)

LangSmith, from the team behind LangChain, helps you see what the agent does and decide how to score it.

Overall, the tool combines tracing with datasets, experiments, online and offline evals, annotation queues, and deployment tooling. It is framework-agnostic despite its LangChain roots.

For testing, LangSmith's unit is a dataset example. Each example contains inputs, optional reference outputs, and metadata. This setup works for prompt, chain, and agent regression tests. However, it is built around inputs and outputs, so it scores multi-step tool behavior by inspecting the trace, not by replaying a production run against its recorded tool state.

### Arize AX

![Arize AX homepage: continuous improvement for agents, turn production behavior into better agents](https://assets.zenml.io/content/blog/langsmith-vs-arize/d7bfea71/image3.avif)

Arize AX covers the part where you have an agent running in production and need to keep improving it.

It combines OpenTelemetry-based tracing with datasets, experiments, labeling queues, evaluator workflows, prompt tools, and newer agent-specific features like Agent-as-a-Judge.

Arize AX now supports agent experiments, or full-agent experimentation. A curated dataset can be run through the complete agent system, including tools, retrieval, routing, models, and application logic, and AX compares the resulting outputs, traces, evaluator results, latency, trajectories, and tool behavior across runs.

The test still depends on the environment behind that endpoint. If the agent calls a search service, database, or payment tool, Arize AX doesn't automatically replace those calls with historical results.

Let’s now compare LangSmith vs Arize vs Kitaru in an orderly fashion.

## Comparing LangSmith, Arize, and Kitaru Features

A short version first. The table below summarizes the three tools across key features:

| **Feature** | **Kitaru** | **LangSmith** | **Arize AX** |
|---|---|---|---|
| **Production traces to test cases** | Imports traces or records sessions with an adapter; sessions are frozen into immutable cohort versions | Runs and threads added to datasets manually, via automation rules, or from annotation queues; datasets auto-version | Datasets built from failing spans in the UI, via Alyx, from CSV, or in code; annotations become ground-truth datasets |
| **Testing model, prompt, and agent changes** | Replays the agent's real code against recorded sessions with a model, prompt, param, or code-version override; tool calls answered by policy | `evaluate()` runs a target function over dataset rows; variants are separate experiments | Code experiments with a task function, playground experiments, or remote agent experiments against a hosted endpoint |
| **Comparing improvements and regressions** | Baseline and replay scored by the same evaluators on the same cohort; per-session improved/regressed; failed replays fail the run | Compare view for two or more experiments; red/green per row against a source experiment; diff mode for two | Side-by-side table and charting views; diff mode against a baseline; latency, tokens, and cost alongside scores |
| **Defining and running evaluators** | Versioned Python evaluators that read a full session; ten deterministic built-ins; typed jev judge for yes/no, choice, and score questions; custom LLM judges use the same contract | Code, LLM-as-judge (reference-free or reference-based), human annotation queues, pairwise; online and offline | LLM judge, deterministic code, agent-as-a-judge (Claude Code harness), remote HTTP evaluators; human labeling queues |

### Feature 1. Turning Production Traces Into Reusable Test Cases

Agent test suites should start from production. Synthetic examples often miss the cases users actually hit. So the first question is how each tool turns a production run into something you can test again later.

#### Kitaru

![Kitaru experiment run screen for a refund policy gate fix showing baseline-v1, 3 of 3 sessions passed, wall clock, replay count, and per-evaluation results](https://assets.zenml.io/content/blog/langsmith-vs-arize/c0fe7b87/image4.avif)

Kitaru keeps the whole recorded session as the test case, not just an extracted input and output.

To record a session, you can either use our native adapters or import traces from a tool you already use.

We currently support adapters for PydanticAI, LangGraph, OpenAI Agents SDK, Mastra, and Vercel AI SDK. Plus, built-in importers cover Langfuse, LangSmith, Braintrust, Logfire, Arize Phoenix, and Kitaru’s native JSONL format.

However, those traces still need runnable agent code before Kitaru can replay them.

So once you’re done importing, group selected sessions into cohorts, an immutable list of session IDs. Then, whenever you add a new production failure, it’ll automatically create a new version instead of changing the old one.

Let’s say a run reports that 12 of 14 sessions improved; that cohort version will always contain those same 14 sessions.

On top of that, Kitaru also includes investigations for human review. A coding assistant can do the monotonous work of organizing sessions, drafting review questions that you can annotate to give more context, and pointing you to specific nodes or payload fields, while you judge each session and attach annotations to the exact node or character range that caused failure.

#### LangSmith

![LangSmith dataset examples view with three selected examples being added to a test split through the Add to Split dialog](https://assets.zenml.io/content/blog/langsmith-vs-arize/ae7c18a4/image5.avif)

[Source](https://docs.langchain.com/langsmith/manage-datasets-in-application)

LangSmith stores test cases as dataset examples with inputs, optional reference outputs, and metadata.

You can add production runs from the UI, create examples through the SDK, or use automation rules to push matching production traffic into a dataset. That last option is useful if you want a steady flow of failures, low-score runs, or sampled traffic feeding your test set.

Threads can work as examples too, up to 100 at a time. The full conversation becomes the input without a reference output. Programmatically, you list runs and call `create_examples()`.

Datasets create new versions automatically when examples change. You can tag a version and point CI at a specific one. LangSmith’s Splits feature lets you separate regression cases from training data.

What LangSmith does not capture is the original run as an executable unit. The trace can stay linked for inspection, but the next experiment runs your target function again with the dataset input.

#### Arize AX

![Arize AX annotation configs list showing reusable review schemas with categorical values, creators, and creation dates](https://assets.zenml.io/content/blog/langsmith-vs-arize/a3fc4915/image6.avif)

[Source](https://arize.com/docs/ax/evaluate/human-review)

Arize AX documents four main ways to load data into a dataset: from CSV, from trace spans, programmatically in code, or through synthetic generation. Alyx can help create datasets from spans or generate synthetic examples. Human annotations can then provide ground-truth labels for those examples.

The first three are the simplest; human annotation is the strongest. Annotation configs define reusable categorical, numeric, or freeform review schemas, with a direction to optimize. Labeling queues then send spans to subject-matter experts in a focused interface, and completed annotations flow into ground-truth datasets.

Those parts are pretty useful when support, compliance, or operations teams need to judge agent behavior without spending their day inside a trace viewer.

**Bottom line:** Kitaru wins this one. All three can get production runs into a test set, and LangSmith can do it continuously on a filter and a sampling rate. However, only Kitaru keeps the full session, tool results included, and freezes it into an immutable cohort version for later comparisons.

### Feature 2. Testing Model, Prompt, and Agent Changes

You have the cases. Now you want to know what happens to them under a cheaper model, a new prompt, or a code change. This is where the products stop looking similar.

#### Kitaru

![Kitaru jobs table listing replay jobs with completed and failed statuses, durations, and an agent process exit error](https://assets.zenml.io/content/blog/langsmith-vs-arize/271e87dd/image7.avif)

A Kitaru replay starts the agent from the beginning. You can change the model, system prompt, user input, model parameters, or the agent version that runs the code.

The tool policy controls what happens when the agent calls a tool during replay:

- `history` returns a recorded result for a matching tool name and arguments
- `static` returns a value you define
- `passthrough` calls the live tool
- `llm` asks a model to generate the tool result

If a `history` lookup misses, `on_miss` decides what happens next. `fail` stops the replay without calling the tool, `error_result` returns a controlled tool error and continues, `passthrough` executes live.

When you set no policy, the server default is `passthrough`, which is risky for tools with side effects. For regression tests, the safe pattern is history with on_miss="fail". If the candidate agent asks for a tool call that was never recorded, the replay stops.

That gives Kitaru a useful test pattern. First replay the session unchanged, then fork one variable.

If the unchanged run does not reproduce closely enough, you know the recording or runtime still contains an uncontrolled state.

However, there are a few downsides: replay requires a supported adapter or a registered run command, streaming is not recorded live, and a replay can drift hard from the recording if you make too many changes.

#### LangSmith

![LangSmith prompt playground running a toxic-query classifier prompt against dataset examples with reference outputs and outputs side by side](https://assets.zenml.io/content/blog/langsmith-vs-arize/4de88915/image8.avif)

[Source](https://docs.langchain.com/langsmith/prompt-engineering-concepts)

LangSmith tests a change by running an experiment. `evaluate()` takes a target function, dataset, evaluators, experiment name, and concurrency setting.

To test a new model or prompt, you run another experiment with the changed target or configuration. Meanwhile, LangSmith stores the outputs, scores, and traces for each example, and the comparison view lines them up in a readable format.

This is the standard application-variant model, and it fits prompts, chains, and single-step classifiers. For agents, the gap is tool state. The target function runs fresh, and LangSmith does not hold recorded tool results as fixtures.

So if your agent calls a database or a payment API, those calls behave however your test environment is set up. You can mock tools yourself, and LangGraph checkpointing can restore thread state, but those controls live in your test harness.

LangSmith can run the same input through a changed agent and score the result. It does not replay one production session with the model changed and its historical tool results held fixed.

#### Arize AX

![Arize AX experiment flow diagram: dataset examples feed run tasks such as an app template, eval template, model change, or retrieval strategy, then an evaluator produces a score](https://assets.zenml.io/content/blog/langsmith-vs-arize/bbd9367a/image9.avif)

[Source](https://arize.com/docs/ax/improve/remote-agent-experiments)

Arize AX gives you three main experiment paths:

- **Code experiment:** `client.experiments.run()` runs a task function and evaluators over a dataset.
- **Prompt playground:** In the UI, you load a dataset, edit the prompt, run it, and save the result as an experiment.
- **Agent experiments/full-agent experiments:** Run a dataset against a registered agent endpoint to test the complete agent system and compare resulting outputs, traces, evaluator results, latency, token usage, and tool-call paths across variants.

Remote agent experiments are the closest thing in Arize AX to what Kitaru does. They exercise the real deployed agent with its own routing and tool selection.

However, there's no recorded history to answer a tool call from, no `on_miss` policy, and no way to fork one production session with a single override.

So while Arize AX can run your deployed agent against a dataset, it does not reconstruct the historical tool environment from one trace.

**Bottom line:** Kitaru has the edge. It adds the missing control over recorded tool results, which matters when you want to test a change without repeating side effects. LangSmith and Arize AX can both run real application code, and both are simpler to set up. But neither can hold the world constant while you change the agent.

### Feature 3. Comparing Improvements and Regressions

Averages are useful until one refund case quietly turns red. What matters is seeing, per case, what improved, what regressed, and why.

#### Kitaru

In Kitaru, an experiment stores the change, tool policy, and evaluator selection. An experiment run adds a cohort version and agent version, then creates one replay per session.

With baseline evaluation enabled, the same evaluators score the original sessions and their replays. That gives you a per-session baseline and candidate result side by side.

Scores aggregate by evaluation type. Numeric scores aggregate as metrics, booleans become pass rates, categorical values can be compared as transitions, and free-text results get read. Failed replays fail the run, so missing cases do not quietly shrink the denominator.

Kitaru's dashboard has a comparison screen that puts a baseline session and its replay side by side, so you can see the before and after for each case: evaluator results, tool calls and their results, the final output, timing, and cost and token use. Its experiment views are still lighter than LangSmith or Arize AX. For deeper analysis across a whole cohort, you can also read the same evaluation rows through the CLI, Python client, or a coding assistant.

#### LangSmith

![LangSmith experiment comparison view with diff mode highlighting output changes between two experiments and per-row correctness and conciseness scores](https://assets.zenml.io/content/blog/langsmith-vs-arize/afb36f9d/image10.avif)

[Source](https://docs.langchain.com/langsmith/evaluation-types)

LangSmith's comparison view has the most controls of the three. You can compare two or more experiments, choose a source experiment, and inspect score changes row by row.

Column headers count the better and worse runs, and a click filters to only the regressions or only the improvements for that metric. Opening a row shows scores, inputs, outputs, and reference outputs. For exactly two experiments, a diff mode highlights structural changes in JSON or YAML outputs.

Pairwise evaluators add another angle. Instead of scoring each output independently, they compare two experiment outputs for the same example and return a preference or score.

The limit, replaying a production run with model or tool swapped, still applies. You are comparing fresh runs of dataset inputs, not a replay against recorded tool history.

So the comparison tells you that variant B scored lower on example 17. It cannot tell you that the production session behind example 17 called the refund tool twice and the replay called it once, because there was no replay.

#### Arize AX

![Arize AX compare experiments table showing two prompt experiments side by side with hallucination, human versus AI, and rhyme quality evaluator labels](https://assets.zenml.io/content/blog/langsmith-vs-arize/cc4ef493/image11.avif)

[Source](https://arize.com/docs/ax/develop/datasets-and-experiments/compare-experiments)

Arize AX's experiment comparison shows outputs, evaluator results, and metadata side by side. You can use a table view for individual runs or charts to compare score distributions across experiments.

Diff mode lets you select a baseline experiment and compare other runs against it, and a diff output mode highlights insertions, deletions, and changes. Latency, token usage, and cost sit beside the quality scores. That helps when the whole point of the change was to spend less.

For remote agent experiments, the same comparison tools apply. And because traces are linked, you can open any row and inspect the tool calls and orchestration path.

LangSmith exposes a first-class pairwise evaluator workflow for comparing experiment outputs. Arize AX’s current evaluator documentation instead emphasizes reusable LLM/code evaluators and baseline diff/side-by-side experiment comparison.

**Bottom line:** A tie between Kitaru and LangSmith, for different reasons. LangSmith gives you the better day-to-day comparison experience with filters, per-row changes, and pairwise evaluation. Kitaru gives you a stricter baseline-versus-replay test when the exact production session matters.

### Feature 4. Defining and Running Quality Evaluations

Everything above depends on the evaluators. If they are wrong, the regression report is wrong too. So the last question is how each tool defines quality and how much of the toolkit you get out of the box.

#### Kitaru

![Kitaru cohort sessions view for reviewed-v1 listing three completed sessions with refund policy gate results of violation or compliant](https://assets.zenml.io/content/blog/langsmith-vs-arize/10787c07/image12.avif)

A Kitaru evaluator is versioned Python code that reads the full session. It can return numeric, boolean, or categorical results, plus an optional `passed` verdict and explanation.

Kitaru also ships ten deterministic evaluators that register at server startup: five descriptive bundles for session diagnostics, trajectory signals, tool health, timing, and LLM-call signals, and five rule-based checks for output contracts, resource budgets, tool policy, model policy, and workflow conformance. These do not call a model, and the descriptive five leave the verdict unset, because a slow span or a repeated call is not by itself a judgment about quality. A hand-written LLM judge follows the same evaluator contract by calling a model inside `evaluate`.

Kitaru now also ships a typed model judge, added in September 2026 as a separate package. It runs on TypeSafe's jev model. You write yes/no, choice, or score questions in JSON against the recorded session (the request, the tool calls with their results, and the final answer, plus the system prompt and model messages if you ask for them), and Kitaru stores one evaluation result per question with the raw probability, the threshold that produced the verdict, and the exact question wording. Answers that do not clear your threshold are held rather than forced into pass or fail. The package stays separate from the core evaluators because session content leaves your deployment for TypeSafe's hosted API, so you install it and add a key deliberately.

Because evaluator versions stay attached to stored evaluations, you can tell exactly which scorer produced a result. You can also compare evaluator output against human-reviewed sessions before using it as a release gate.

Kitaru also ties evaluation to human review via investigations. Your verdicts and pinned annotations become the check for a new evaluator before turning it into a release gate.

What Kitaru does not have is a large judge catalog. The ten deterministic built-ins and the jev judge will get you a long way at the start, but there is no hub of pre-built LLM judges to browse, pairwise eval product, or online-eval system that scores live traffic as it lands, and no assignment queue with multiple blind reviewers. Past the built-ins, you write the evaluator logic in Python yourself.

#### LangSmith

![LangSmith online evaluator editor with run filters, a sampling rate, an LLM-as-judge prompt, and a sample run's input and output](https://assets.zenml.io/content/blog/langsmith-vs-arize/249617ba/image13.avif)

[Source](https://docs.langchain.com/langsmith/online-evaluations-llm-as-judge)

LangSmith supports code evaluators, LLM-as-judge, human review, and pairwise evaluation, across both offline experiments and production traffic.

Annotation queues can carry rubrics, reserve work so reviewers do not collide, and hide other reviewers' scores. Automation rules can also run evaluators against production traffic or route selected traces into review and dataset workflows.

For many teams, this is the easiest stack to grow from a few manual checks into a repeatable production scoring system.

LangSmith’s offline regression workflow is dataset-based, but its evaluation capabilities are broader than output-level scoring. It supports LLM-as-judge, code, composite, summary, and pairwise evaluators, as well as online evaluation over production traces and multi-turn conversations. The main difference from Kitaru here is recorded-world replay, rather than access to trace-level evaluation.

#### Arize AX

![Arize AX evaluator hub listing LLM-as-a-judge evaluators with type, maintainer, usage, and version counts](https://assets.zenml.io/content/blog/langsmith-vs-arize/b08bb147/image14.avif)

[Source](https://arize.com/blog/new-in-arize-ax-january-2026-updates/)

Arize AX supports LLM judges, code evaluators, Agent-as-a-Judge, human labeling queues, and remote evaluators.

Some custom code-evaluator features in AX are Enterprise-only, while remote evaluators run on your infrastructure and are best for logic you cannot or will not ship to a vendor.

Human labels can also feed Arize's eval-to-human-feedback workflow, so you can compare machine scores with expert judgment. That is the same idea as Kitaru's validate-against-verdicts step, delivered as a product feature.

Agent-as-a-Judge is the most unusual option here. It uses a Claude Code setup that can inspect trace context before returning a verdict. That makes it an interesting one for agents, especially those agent failures where one output field is not enough evidence.

**Bottom line:** LangSmith wins the most complete evaluator toolkit, including code, judge, human, and pairwise evaluators running online and offline. Arize AX is a close second for agent-specific review. Kitaru's evaluators read the most (a full session, not a row) and version the most strictly. Its ten deterministic built-ins and the jev judge cover the early ground, but beyond those you build the catalog yourself.

## LangSmith vs Arize vs Kitaru: Pricing

All three have a free entry point, but they meter different things:

### Kitaru

Kitaru is open-source, free to self-host under the Apache 2.0 license. It includes unlimited imports and recording, plus cohorts, evaluators, experiment runs, and replay on your own workers.

If you’d like to use managed hosting, Kitaru offers two generous plans:

- **Cloud:** $39 per month (14-day free trial); 3 agents, 2 seats, 90-day session retention
- **Enterprise:** Custom; Unlimited agents, custom seats and retention, SSO (SAML / OIDC), audit logs, and remote worker pools.

![Kitaru pricing tiers: free open source, Cloud at 39 dollars per month with a 14-day trial, and custom Enterprise](https://assets.zenml.io/content/blog/langsmith-vs-arize/808b1b21/image15.avif)

### LangSmith

LangSmith offers a generous free plan for solo users, plus two paid plans:

- **Plus:** $39 per seat per month
- **Enterprise:** Custom pricing

![LangSmith pricing tiers: Developer free for one seat, Plus at 39 dollars per seat per month, and custom Enterprise](https://assets.zenml.io/content/blog/langsmith-vs-arize/eaa3b9e3/image16.avif)

### Arize AX

Arize AX pricing is span-based, with unlimited users and evals on the free tier, and two paid tiers:

- **AX Pro:** $50 per month
- **AX Enterprise:** Custom pricing

![Arize AX pricing tiers: AX Free, AX Pro at 50 dollars per month, and custom AX Enterprise with span, ingestion, and retention limits](https://assets.zenml.io/content/blog/langsmith-vs-arize/c4b89db2/image17.avif)

**Note:** Arize Phoenix remains free and open source for teams that want to stay local.

## Final Recommendation: Which One Should You Choose?

The right choice depends on what you already use and what you need to test.

- **Choose LangSmith** if you build on LangChain or LangGraph, or if you want one product for traces, datasets, experiments, human review, and a deep evaluator toolkit. If you are weighing it against other tracing platforms, our [LangSmith alternatives](https://www.zenml.io/blog/langsmith-alternatives) guide and the [Langfuse vs LangSmith](https://www.zenml.io/blog/langfuse-vs-langsmith) comparison cover that ground.
- **Choose Arize AX** if you are already on OpenTelemetry or Phoenix, want unlimited seats for reviewers, or need trace analysis alongside experiments and labeling. For the open-source side, see [Langfuse vs Phoenix](https://www.zenml.io/blog/langfuse-vs-phoenix).
- **Choose Kitaru** if your agent is already in production, its traces already live somewhere, and the decision in front of you is a model swap, a prompt rewrite, or a tool change that you can't afford to test on live traffic.

Kitaru can replay a recorded session with one change while returning historical tool results. For a refund agent or a document-to-record pipeline, that is the test you want.

We're biased on the last point, so here's the trade-off in full. Kitaru isn't an observability dashboard. It has no alerting, no prompt playground, and no online evaluators, and its comparison UI has none of the regression filters or charting views the other two have.

What it has is the mechanism the other two do not. It freezes real sessions into immutable cohorts, replays them against your code, and holds the world constant with a tool policy while you change the agent.

If that is the test you are missing, [import the traces you care about](https://docs.zenml.io/kitaru/import-your-traces/import-your-traces) from LangSmith or Phoenix into Kitaru, freeze them into a cohort, and replay that cohort with the model swapped.

**[Try Kitaru with the free hosted version](https://cloud.kitaru.ai/).**
