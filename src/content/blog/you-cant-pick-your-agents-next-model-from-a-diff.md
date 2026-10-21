---
title: "You Can't Pick Your Agent's Next Model From a Diff"
slug: "you-cant-pick-your-agents-next-model-from-a-diff"
draft: true
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "evaluation"
  - "llm"
date: "2026-10-21T00:00:00.000Z"
readingTime: "6 mins"
seo:
  title: "You Can't Pick Your Agent's Next Model From a Diff - ZenML Blog"
  description: "We replayed recorded agent traffic against 11 models. Step agreement narrowed the field well but picked badly. Only full replays found the best swap."
  canonical: "https://www.zenml.io/blog/you-cant-pick-your-agents-next-model-from-a-diff"
---

Sooner or later, someone asks whether your agent could run on a cheaper model.

The cheapest way to answer is a diff. Take calls your agent already made, send the same inputs to a candidate model, and count how often it does what your current model did. Same tool? Same arguments? It's cheap and fast, because nothing runs end to end.

We wanted to know how far that gets you. So we recorded four finance and insurance agents running on Claude Sonnet 5.5, replayed their calls against 11 other models, and then checked every answer the hard way: each model running the whole tasks itself.

The short version: **a step-level diff is a good filter and a bad picker.** It reliably narrows the field to a shortlist that contains a good swap. It does not reliably tell you which one that is, and it hides the cheapest model that actually holds quality.

## What we tested

The four agents:

- **Bank support tickets**, a conversational agent built on tau2-bench
- **Invoice extraction**
- **Insurance claims triage**
- **KYC document checks**

For each one, we sampled 250 recorded model calls and replayed them against 12 models: Claude Opus 5.5, Sonnet 5.5, and Haiku 5.5, GPT-6 Luna, GPT-6.1 Sol, DeepSeek V4.1 Flash, DeepSeek V4 Pro, GLM 5.3, GLM 5.3 Flash, gpt-oss-120b, Qwen3.8 27B, and MiniMax-M3.

Ground truth came from full runs. Every candidate ran the same tasks end to end (100, 91, 74, and 86 tasks per use case), graded deterministically, and paired against Sonnet on the same tasks with a bootstrap 95% interval. We say a model **holds** if its task success is at most 5 points below Sonnet's.

## Narrowing works

Rank the candidates by how often they pick the same tool as Sonnet, keep the top three, and you always keep a good option. In every use case, at least two of the top three held task success in full runs. In three of the four, all three did.

That's the part of the diff you can rely on. It's cheap, and it throws out models that are clearly wrong for the job. On invoice extraction, gpt-oss-120b picked Sonnet's tool on only 32% of calls and finished 33 points below it in full runs.

<!-- CHART 1: "Step agreement vs. what actually happened"
Small multiples, one panel per use case (use_cases.<uc>, label from .label).
x: rows[].tool_choice (as %), for every row where reference == false.
y: rows[].full.delta (as percentage points vs Sonnet 5.5), with vertical error bars from rows[].full.lo to rows[].full.hi.
Color: "holds" if full.delta >= -0.05, "loses" otherwise. Horizontal dashed line at -5 points.
Label the top 3 by tool_choice (finalists.top3) and annotate gpt-6-luna.
Strip the "@<host>" suffix from model names in labels. Caption: "Each dot is one candidate model. Left to right: step agreement with Sonnet 5.5. Bottom to top: task success vs Sonnet in full runs." -->

## Picking doesn't

The natural next step is to let the diff make the call: "any model within 10 points of the closest match is comparable, now take the cheapest." We checked that rule against the full runs for all 44 candidate–use case pairs.

It was right 35 times out of 44. Of the nine misses, four were models it called comparable that lose in full runs, including Qwen3.8 27B on bank support (11 points below Sonnet) and Haiku 5.5 on KYC checks (8 points below). The other five were models it ruled out that actually hold.

The single "cheapest" picks were worse than that rate suggests. In the three use cases where the rule named a new model, every pick landed right at the edge of acceptable: GPT-6 Luna on bank support (−5.0 points) and on KYC (−4.7), and DeepSeek V4 Pro on claims triage (−5.4). A rule that keeps landing on the boundary isn't telling you much.

Across use cases, step metrics track task success only moderately. The rank correlation between tool-choice agreement and full-run success averages 0.54 within a use case; for exact step agreement, 0.63. With 11 candidates per use case, treat both as rough.

## Tool choice can't see conversations

Bank support makes the gap obvious. Every model picks the same tool as Sonnet 85% to 99% of the time. Full-run success ranges from 51% to 64%.

In a conversation, the tool is often the easy part. The difference is in what the agent says, what it asks for, and when it decides to act. A per-step diff scores each turn in isolation, against inputs the candidate never produced itself, so it can't see any of that.

Exact agreement doesn't rescue it either. Replayed against its own recorded support traffic, Sonnet 5.5 produced exactly the same step only 48% of the time.

<!-- CHART 2: "Bank support: tool choice is saturated, outcomes are not"
Two horizontal dot strips on a shared 0-100% axis, one row each, one dot per model in use_cases.support.rows (reference == false):
row 1 "Same tool as Sonnet": rows[].tool_choice (range 85% to 99%);
row 2 "Task success, full run": rows[].full.success (range 51% to 64%).
Add a marker for Sonnet's own full-run success: use_cases.support.incumbent.success (62%).
Optionally connect each model's two dots with a faint line to show ranks reshuffling. -->

## The cheapest model that holds takes a different path

This was the finding that changed how we think about model swaps.

GPT-6 Luna was the cheapest model that held quality in three of the four use cases: bank support, invoice extraction, and KYC checks. Per successful task, it cost about $0.002 on bank support against Sonnet's $0.17, and under a tenth of a cent on invoices and KYC against Sonnet's roughly two cents.

By step agreement, it ranked 6th, 10th, and 7th. It would never have made a top-three shortlist.

Luna gets to the right outcome by different steps. It asks in a different order, words things differently, and calls tools at different points. A diff counts every one of those as a disagreement. Only running the whole task shows that the end state is still correct.

<!-- CHART 3: "Where the cheapest model that holds ranks by step agreement"
One row per use case. Plot the 11 candidates as a ranked strip ordered by rows[].tool_choice (rank 1 = left).
Shade ranks 1-3 as "shortlist" (finalists.top3). Highlight finalists.cheapest_holder at finalists.cheapest_holder_rank
(support: gpt-6-luna, 6; invoice_extraction: gpt-6-luna, 10; claims_triage: haiku-5.5, 3; kyc_checks: gpt-6-luna, 7).
Tooltip / annotation: cheapest holder's full.cost_per_success vs incumbent.cost_per_success. -->

## How we're building this into Kitaru

[Kitaru](https://kitaru.ai) is built on the idea that agent traces should be something you can run, not just read. The new model-swap workflow follows what this data says: use cheap evidence to narrow, and expensive evidence to decide.

1. **Narrow with step replay.** Replay recorded calls from your own agent against candidate models. This filters out models that clearly don't fit, quickly and cheaply.
2. **Review the disagreements.** Where a candidate does something different from your current model, a person decides whether it's equivalent or wrong. That is where a model like Luna should surface instead of being ranked out. We haven't yet measured how often reviewers catch these cases.
3. **Confirm finalists with a full replay.** Run your actual agent code, end to end, on the same sessions with each finalist, and score the results with your evaluators next to the current model's baseline.

The third step is the one that decides. The first two make it affordable.

## How we ran it, and what to keep in mind

- **Synthetic tasks.** All four agents run in simulated environments with deterministic graders. They are modeled on real workflows, not taken from production.
- **Possible authorship bias.** Claude models wrote the environments and tasks, and the recorded traffic comes from Claude Sonnet 5.5. That could favor Claude models.
- **One run per task.** Confidence intervals are wide, often 5 to 10 points either side. Several "holds" verdicts, including Luna on bank support, sit right on the 5-point line.
- **Few models per use case.** Rank correlations over 11 candidates are rough estimates.
- **Step judging.** In this study an LLM judge, not a person, labeled step disagreements. Human review is part of the workflow we describe, but we didn't test it here.

## Try it

<!-- TODO: confirm how full replay handles tool calls that leave the recorded path (simulated tools vs. recorded history). TODO: confirm availability wording, docs link, and CLI for the model-swap workflow before publishing. Do not describe it as generally available until it ships. -->

The model-swap workflow is coming to Kitaru. Kitaru is open source: the docs are at [docs.zenml.io/kitaru](https://docs.zenml.io/kitaru) and the code is on [GitHub](https://github.com/zenml-io/kitaru).

If you're already weighing a cheaper model for an agent in production, we'd like to hear how you're making the call today.
