---
title: "Braintrust vs Langfuse vs Kitaru: Comparing Observability, Evals, and Agent Replay"
slug: "braintrust-vs-langfuse"
draft: false
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "evaluation"
  - "discovery"
date: "2026-09-16T11:42:07.318Z"
readingTime: "18 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/braintrust-vs-langfuse/3b392998/braintrust-vs-langfuse-cover.avif"
  alt: "Braintrust vs Langfuse vs Kitaru, comparing observability, evals, and agent replay"
seo:
  title: "Braintrust vs Langfuse vs Kitaru: Observability, Evals, Replay - ZenML Blog"
  description: "Braintrust vs Langfuse vs Kitaru compared across trace readability, agent replay, human review, CI regression gating, and pricing. See which fits your stack."
  canonical: "https://www.zenml.io/blog/braintrust-vs-langfuse"
  ogImage: "https://assets.zenml.io/content/blog/braintrust-vs-langfuse/e690ce22/braintrust-vs-langfuse-cover.jpg"
---

If your agent has been in production for a while, you probably already have thousands of traces just sitting somewhere.

Both Braintrust and Langfuse cover the observability half, helping you inspect those traces, score them, and turn them into datasets. [Kitaru](https://www.zenml.io/product/kitaru), which we built at ZenML, covers the other half. It imports those same traces and re-executes the agent against them.

So honestly, comparing them isn't a like-for-like comparison. Braintrust and Langfuse compete with each other on observability. We compared [Langfuse against LangSmith](https://www.zenml.io/blog/langfuse-vs-langsmith) on that axis before. Kitaru sits next to both and helps you test how a prompt, model, or tool change would affect past production runs.

This Braintrust vs Langfuse vs Kitaru guide compares all three across trace reading, agent replay, human review, CI regression testing, and then on price.

## Braintrust vs Langfuse vs Kitaru: Key Takeaways

- **[Kitaru](https://www.zenml.io/product/kitaru):** Replay-based evals for when you already have an agent in production and want to test changes against real past runs. It imports traces from Langfuse and Braintrust, re-runs your real agent code, answers every tool call from the recording, and forks one change at a time.
- **[Braintrust](https://www.braintrust.dev/):** Best when evaluation, trace review, and dataset curation need to live in one product. It has strong trace views, human-review workflows, custom review views, playgrounds, and the shortest path from production logs to eval datasets and CI.
- **[Langfuse](https://langfuse.com/):** An open-source trace store, with trace and session views, annotation queues, datasets, experiments, and CI support. Langfuse supports session inspection, playground reruns, and experiments that execute your full agent through a task function. Reproducing historical tool responses requires a test setup you supply.

## What Problems are These Tools Actually Solving?

Braintrust and Langfuse both start from the same place: observation. You instrument an application, capture every model and tool call, inspect failures, add scores, and promote useful runs into datasets.

The gap they share is the step after the dataset. Dataset rows provide test inputs, optional expected outputs, and metadata; the task function supplies the agent code. Reproducing historical tool responses additionally requires stubs, fixtures, or another mechanism that supplies those responses during execution.

For example, in a normal dataset, if the original agent called `lookup_policy`, `get_order` and `refund_payment`, it does not automatically make those tools return the same historical results when the candidate agent runs again.

That is the job Kitaru took. And the [mechanism](https://docs.zenml.io/kitaru/core-concepts/replay) is pretty specific. A replay in Kitaru starts the agent from the beginning. The recording answers each tool call by matching the tool name and its arguments, and therefore a refund is never issued twice. Then you fork with exactly one override and read the diff.

Kitaru, however, needs an agent it can launch, wrapped in one of its adapters for PydanticAI, LangGraph, the OpenAI Agents SDK, Mastra, or the Vercel AI SDK. It also treats Langfuse and Braintrust as import sources rather than replacements. If you only need to watch production, the other two are the better tools. If you need to test a change against production, keep reading.

## Comparing Braintrust, Langfuse, and Kitaru Features

The short version first:

| **Feature** | **Kitaru** | **Braintrust** | **Langfuse** |
|---|---|---|---|
| **Trace readability** | Session of typed nodes you can point at; not a trace explorer | Spans, Thread, and Timeline views with multiple field renderers | Trace trees, agent graphs, sessions, and formatted or JSON views |
| **Agent replay** | Re-runs real agent code against controlled recorded tool history | Can re-run prompts and execute agent code in evals, but not against a recorded tool world | Can re-run generations and execute app logic in experiments, but not against a recorded tool world |
| **Human review** | Assistant-authored investigation, answers pinned to evidence | Review queues, blind and multi-reviewer scoring, custom views | Built-in annotation queues for domain experts, with keyboard shortcuts and optional custom interfaces via API |
| **CI gating** | Immutable cohort replayed in CI, pass/fail in the evaluator | Dataset-based evals, GitHub Action, gate via reporter | Datasets plus experiment runner, gate via `RegressionError` |

Now let's compare Braintrust vs Langfuse vs Kitaru feature-by-feature:

### Feature 1. Trace Readability and Session Views

#### Kitaru

![Kitaru sessions list for a returns-resolver agent, showing imported sessions with status, version, cost, and an evaluator column marking each session authorized or unauthorized](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/2782df0f/image10.avif)

Kitaru's main unit is a session, one complete end-to-end agent run. It records model calls, tool calls, subagent calls, and other captured spans in an ordered node tree typed as `llm_call`, `tool_call`, `subagent_call`, or `span`, each with inputs, outputs, tokens, and cost.

That typing is what makes a session pointable. An annotation can address a node, a JSON path inside a payload, or a character range inside a string. A `tool_call` node also carries the replay key used to match the same call later.

With the August 2026 update, Kitaru now also bundles a dashboard. It has a session inspector in which every displayed item can be annotated, plus a timeline view, and a diff view that highlights only the text that changed between a session and its replay.

Now for concessions, Kitaru has no full-text search across runs, no cost dashboard, no alerting, and no prompt playground. Its importers pull Langfuse and Braintrust exports into sessions. The Braintrust importer warns you when a UI export omits span identity and hierarchy. Langfuse stays your system of record. Kitaru holds the runnable copy.

#### Braintrust

![Braintrust trace viewer with the Spans, Thread, and Timeline tabs, showing a customer support conversation as chronological messages and tool calls beside the selected span's details](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/c1ac430c/image13.avif)

Braintrust gives you three useful ways to read a trace:

- The Spans view is a nested call graph that shows which function called which.
- The Thread view, as in the above image, removes the hierarchy and displays messages, tool calls, and scores in chronological order, which you'd want for a multi-turn agent.
- The Timeline view scales each span's bar by duration or token-related metrics.

Selecting a span exposes its inputs, outputs, metadata, and review controls, and every field toggles between Pretty, JSON, YAML, and Tree renderings. You can also search within one span or the whole trace.

If the default view is still too technical for you, Braintrust can generate a custom React view through Loop and save it for the project.

Of the three, Braintrust is the most complete reader. It gives you enough ways to move from a high-level conversation to the raw details without leaving a trace.

However, Braintrust also supports custom annotation views so you can review support conversations differently from code generation. That admits the default views do not cover that case. The Raw tab is one click away, and for a long agent run with large tool payloads it is still where the detail lives.

#### Langfuse

![Langfuse session view grouping several traces of a QA chatbot conversation, each with Pretty and JSON toggles and per-trace evaluation scores](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/3662338f/image3.avif)

[Source](https://langfuse.com/docs/observability/features/sessions)

Langfuse groups traces into a session by a shared `sessionId`. The session view lets you replay the entire interaction in the reading sense, end to end. Each trace is a tree of observations with a formatted mode and a JSON mode.

The formatted mode is only as readable as what you send it. Or put another way, its trace tree and agent graph work best when the instrumentation is clean.

Langfuse's own best-practices page recommends that you set stable observation names and reviewer-friendly input and output fields. Raw function payloads belong in metadata if they would make the main view hard to read.

**Winner:** Braintrust offers the strongest default experience for reading a single run. Kitaru's session model is more useful once that trace becomes a replay case.

### Feature 2. Agent Replay and Tool-Call Overrides

#### Kitaru

![Kitaru session timeline with the Replay session dialog open, offering a prompt to paste into a coding agent to set up the replay](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/b5bc0082/image6.avif)

Replay in Kitaru means the real code runs again from the top. There is no partial or mid-run cut point. Your agent recomputes its own side in full.

Under the recommended `history` policy, Kitaru looks for a recorded tool call with matching name and arguments and returns the old result. A [tool policy](https://docs.zenml.io/kitaru/guides/tool-policies) decides, up front, what happens when a changed agent calls a tool that was never recorded.

Suppose your agent calls `refund_payment(order=4821)`, the history policy can return the recorded refund result without contacting the payment provider again.

If the candidate generates a call that was not recorded, Kitaru makes the choice explicit with the `on_miss` setting having three values:

- `fail` stops the replay without executing the tool,
- `error_result` returns a controlled tool error and continues
- `passthrough` executes the live tool, which the docs reserve for calls that are safe to repeat.

You can also pin a `static` result for one tool, or route a specific safe tool to pass through while everything else stays on history. Moreover, Kitaru can override a model, system or user prompt, and model parameters. For that, we recommend validating an unchanged replay first, that'd be your faithful baseline. Then you fork with exactly one override, so any difference is easier to explain.

#### Braintrust

![Braintrust playground comparing a base task on GPT-4 Turbo against a comparison task on Claude 3.7 Sonnet for the same prompt, with both outputs side by side](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/5e966c39/image11.avif)

Braintrust can re-run part or all of an evaluation workload. You can replay the exact sequence of decisions, tool calls, and outputs that led to the failure. That is reading the trace, not re-executing it. Re-execution is available through SDK experiments, CI jobs, and playgrounds connected to prompts or custom agent code.

From a trace, you can re-run a prompt or send logged prompts and inputs into a playground. There you can swap the prompt or edit instructions, and the LLM call runs again.

For custom agent code, Braintrust offers remote evals on your infrastructure and isolated cloud sandboxes. Sandboxes are currently in public preview and require Pro or Enterprise.

The test environment makes a huge difference where the code runs matters. Braintrust executes the task against dataset inputs and whatever services your task uses. It does not take one production trace and automatically serves the recorded result for each historical tool call. If you need that behavior, you have to build the mocks or fixtures yourself.

#### Langfuse

![Langfuse playground running the same prompt across three windows on gpt-4.1, o4-mini, and gpt-4o, with each model's output below it](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/510c678c/image9.avif)

[Source](https://langfuse.com/docs/prompt-management/features/playground)

Langfuse has the same shape. A generation opens in the [playground](https://langfuse.com/docs/prompt-management/features/playground), where you can change the prompt and model and test prompts relying on tools in real-time by mocking tool responses.

Only tool observations in OpenAI ChatML format can be opened this way. [UI experiments](https://langfuse.com/docs/evaluation/experiments/experiments-via-ui) run a prompt over a dataset one model call at a time. And for full agent logic, the SDK experiment runner accepts a task function. The runner executes the task function you provide. Your implementation determines whether tools call live services, mocks, fixtures, or test environments. So technically, Langfuse is not limited to one model call when you use experiments.

However, the experiment runner does not reconstruct the external state from a single trace. Your task decides what tools or services it calls. If you want every historical tool call to return its old value, you need to provide that test setup yourself.

**Winner:** Kitaru. This is the one axis where the difference is in kind, not degree, because Kitaru is built around replaying a historical agent run against controlled recorded tool history. Braintrust and Langfuse can execute agent code in evals, but that's it.

### Feature 3. Human Review and Domain-Expert Annotation

#### Kitaru

![Kitaru review page with an issue_refund node selected, showing a reviewer question about a $280 refund issued without human approval, an answer box, and Acceptable, Problematic, and Uncertain session verdict buttons](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/24757a07/image2.avif)

Kitaru's bet is that human judgment should enter once, against evidence, and then get reused. Unlike Braintrust or Langfuse, we made sure it's not a separate labeling process.

An Investigation groups sessions that need judgment. Then your coding assistant works over Kitaru's MCP server, whether Claude Code, Codex, or Cursor, to sample 15 to 30 sessions, organize the evidence, and draft questions per session with highlights pointing at the exact node, payload path, or text range, before finally returning a review link into Kitaru's dashboard.

On that page, the reviewer reads the evidence and answers the questions in a text box. The answer becomes an annotation attached to exact evidence. The reviewer can also give the session a verdict of acceptable, problematic, or uncertain, or add a manual annotation.

Annotations live next to evaluator results for the same sessions. That gives you a practical way to check if both the human and machine columns agree, and ways to calibrate an evaluator, Kitaru's versioned scoring function, before it runs alone.

Kitaru, however, has less review-workflow depth. As in, it does not have the same queue-management and review-ops features as Braintrust or Langfuse. Its review system is built around curated investigations that feed evaluators and cohorts.

#### Braintrust

![Braintrust trace tree listing two user reviews of the same span, with a human review panel scoring response quality as Bad and a free-text failure reason](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/1019e26b/image7.avif)

[Source](https://www.braintrust.dev/docs/annotate/human-review/multiple-reviewers)

Braintrust has the most review-operations tooling of the three. You can configure human scores, assign rows to reviewers, add comments and expected values, and manage flagged work through table or Kanban views. Since June 2026, you can even score the same span with automatic averaging, and Braintrust added blind reviews in September 2026.

Custom views are useful when the raw trace isn't exactly the thing for the person doing the review. Loop, Braintrust's AI assistant, can generate a React view that surfaces only the fields that matter, like the user conversation, retrieved documents, a tool decision, and a few review controls. Those controls can write feedback back to the trace, turning a custom view into a purpose-built annotation surface.

Though there is a cap on use, unlimited human review scorers are only available on Pro and Enterprise plans; Starter gets one per project.

#### Langfuse

![Langfuse traces table with rows selected by checkbox, the bulk action used to add traces to an annotation queue](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/f9233f0a/image12.avif)

[Source](https://langfuse.com/docs/evaluation/evaluation-methods/annotation-queues)

Langfuse's [annotation queues](https://langfuse.com/docs/evaluation/evaluation-methods/annotation-queues) allow you to add scores and comments to traces, observations or sessions. Items are queued in bulk or one at a time, and each queue carries one or more score configs, can be assigned to users, and supports comments and corrected outputs.

The review flow is keyboard-driven. You can move between items, select categorical scores, edit fields, and complete the current item without reaching for the mouse every time.

Langfuse also exposes queue operations through its API. That is useful if you want Langfuse to hold the review state but present your domain experts with a separate UI.

**Winner:** Kitaru. The axis is domain-expert annotation, and Kitaru is the only one of the three where the reviewer starts from a question rather than a trace. They get the question, the evidence it points at, and a text box, and the answer lands as an annotation pinned to that evidence, beside the evaluator's score for the same session. Braintrust has more review-ops machinery, with assignment, Kanban, and blind or multi-reviewer scoring, and Langfuse's queues are keyboard-fast. Both, though, put the reviewer in front of the trace by default, and both point you at a generated custom view or a UI of your own once the reviewer is not an engineer.

### Feature 4. CI/CD Regression Gating and Suite Growth

#### Kitaru

Kitaru turns selected production sessions into an immutable cohort version. Version 1 keeps the same membership forever. If you add a new failure or remove a stale case, you create another version.

An [experiment](https://docs.zenml.io/kitaru/core-concepts/experiments) holds the change (override, tool policy, evaluator list), and an experiment run then pairs it with one cohort version and one agent version.

![Kitaru experiment run results for refund-authority-guardrail-v2, reporting 4 of 5 sessions passed on one evaluator and 5 of 5 on the other, with experiment configuration and agent diff below](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/b72711ad/image4.avif)

For context, `--wait` blocks until the run settles and exits nonzero if it fails, and `--evaluate-baselines` scores the originals too, so every replay reports next to its baseline.

Each evaluator result can carry a `passed` verdict along with a score or explanation. Kitaru does not impose one global quality threshold on the experiment. Your evaluator defines what counts as a pass, and your CI job can use the resulting aggregate to decide whether the candidate should move forward.

Suite growth is explicit. When production reveals a new case worth keeping, add that session to a new cohort version. The test population changes only when you choose to change it.

#### Braintrust

Braintrust's loop is the most productized. It makes the production-to-dataset path very short.

From Logs, you can select useful traces and add them to a dataset. The dataset row can carry input, expected output, metadata, tags, and a link back to its origin.

From there, Braintrust experiments run your task and scorers against the dataset. In GitHub Actions, `braintrustdata/eval-action` runs the evals and automatically posts a comment with results to the pull request. Blocking a merge is possible too but not automatic. So in practice, `bt eval` exits nonzero on an exception, and a custom reporter can decide whether the job should fail based on the full run result.

That makes Braintrust strong when your regression suite is a curated dataset of cases and the task knows how to execute them.

#### Langfuse

Langfuse also connects production traces to datasets and datasets to experiments. The SDK experiment runner executes your task, applies item-level or run-level evaluators, and stores the result as a dataset run.

[CI](https://langfuse.com/docs/evaluation/experiments/experiments-ci-cd) runs through `langfuse/experiment-action`, which posts a PR comment. It fails the job when your script raises a `RegressionError` against your defined threshold, and `should_fail_on_regression` defaults to true. It is a working gate that you wire yourself.

Langfuse also lets CI pin a dataset version timestamp for repeatable runs. That gives you a stable test set even while the live dataset continues to change.

**Winner:** A tie between Braintrust and Kitaru. Braintrust has the shortest path from a production log to a dataset row to a PR comment, and that is most of what a CI gate is for teams whose regression suite is a curated dataset. Kitaru has the stronger regression case itself, because an immutable cohort version replays the full agent against the recorded tool history, and the suite changes only when you cut a new version. Pick by the shape of your regression case. Langfuse gets you there too, but the gate is a script you own.

## Braintrust vs Langfuse vs Kitaru: Pricing

### Kitaru

Kitaru offers a free, open-source tier with unlimited import and recording, cohorts, evaluators, and experiment runs. Replays execute on your own workers, so replay compute is your model spend.

Other than that, it has two hosted tiers, starting at:

- **Cloud:** $39 per month (14-day trial); Three agents, two seats, 90-day session retention, the hosted dashboard, and replays and experiment runs included.
- **Enterprise:** Custom; Unlimited agents, SSO (SAML and OIDC), audit logs, and remote worker pools.

![Kitaru pricing with a free open-source tier, a $39 per month Cloud plan with a 14-day trial, and custom Enterprise pricing](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/b5862dab/image1.avif)

### Braintrust

Braintrust offers a quick entry point with a free Starter plan. You get $10 in model credits, 1 GB processed data, 10k scores, 14-day retention, one human review score per project. Then after, you can choose to stay on the same plan and pay overages, or move to a paid tier:

- **Pro:** $249 per month
- **Enterprise:** Custom pricing

**Note:** Agents resend accumulated context on every turn, so processed gigabytes climb faster than trace counts suggest.

![Braintrust pricing with a $0 Starter plan, a $249 per month Pro plan, and custom Enterprise pricing, each listing model credits, processed data, scores, and retention](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/b2e2362d/image5.avif)

### Langfuse

Langfuse offers a free entry point for hobby projects and POCs. The free plan includes 50k units per month, 30 days of data access, and two users. On top of that, it has a three-tiered, unit-based cloud pricing:

- **Core:** $29 per month
- **Pro:** $199 per month
- **Enterprise:** $2,499 per month

![Langfuse pricing with a free Hobby plan, Core at $29 per month, Pro at $199 per month, and Enterprise at $2,499 per month](https://assets.zenml.io/content/blog/braintrust-vs-langfuse/696e259b/image8.avif)

## Final Recommendation: Which One Should You Choose?

**Choose Langfuse if** you want an open-source trace store you can self-host for free, your reviewers can live with annotation queues, or you are willing to build them a UI, and your CI gate can be a script you own.

**Choose Braintrust if** review throughput is the bottleneck. Nothing else here is as finished, from review queues and blind or multi-reviewer scoring to one-click datasets from logs and a PR-commenting GitHub Action. Loop also lets non-engineers build datasets and scorers by describing them in plain language.

**Choose Kitaru if** your hardest question starts after you have already read the trace. Keep Braintrust or Langfuse as the trace store. Import the cases that matter, prove the unchanged replay first, then run the candidate against the same recorded tool history. It is also the pick when the people judging the agent are domain experts rather than engineers, since they answer a question against its evidence instead of reading a trace.

Kitaru, yet, does not replace production observability dashboards, alerting, or prompt management. It has no reason to. Braintrust and Langfuse can score what your agent did; Kitaru can re-run it against the world it saw.

If you have an agent in production, traces in one of those stores, and a model or prompt change you are nervous to ship on Friday afternoon, [try Kitaru with the free hosted version](https://cloud.kitaru.ai/).
