---
title: "Swapping your agent's model? Test whole tasks, not steps"
slug: "you-cant-pick-your-agents-next-model-from-a-diff"
draft: true
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "evaluation"
  - "llm"
date: "2026-10-21T09:40:00.000Z"
readingTime: "6 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/you-cant-pick-your-agents-next-model-from-a-diff/549dbe49/you-cant-pick-your-agents-next-model-from-a-diff-cover.avif"
  alt: "Kitaru blog cover for Swapping your agent's model? Test whole tasks, not steps"
seo:
  title: "Swapping your agent's model? Test whole tasks, not steps - ZenML Blog"
  description: "We tested 11 models on recorded agent traffic. Checking single steps made a good shortlist, but in 3 of 4 agents it missed the cheapest model that held quality."
  canonical: "https://www.zenml.io/blog/you-cant-pick-your-agents-next-model-from-a-diff"
  ogImage: "https://assets.zenml.io/content/blog/you-cant-pick-your-agents-next-model-from-a-diff/5654c634/you-cant-pick-your-agents-next-model-from-a-diff-cover.jpg"
---

Sooner or later, someone asks whether your agent could run on a cheaper model.

The cheapest way to answer is a step check. Take calls your agent already made, send the same inputs to a candidate model, and count how often it does what your current model did. Same tool? Same arguments? It's cheap and fast, because nothing runs end to end.

We wanted to know how far that gets you. So we recorded four finance and insurance agents running on Claude Sonnet 5.5, replayed their calls against 11 other models, and then checked every answer the hard way: each model running the whole tasks itself.

The short version: **a step check is good at ruling models out, and bad at picking the winner.** It reliably narrows the field to a shortlist that contains a good swap. It does not reliably tell you which one that is, and it hides the cheapest model that actually holds quality.

## What we tested

The four agents:

- **Bank support tickets**, a conversational agent built on [tau2-bench](https://github.com/sierra-research/tau2-bench)
- **Invoice extraction**
- **Insurance claims triage**
- **KYC document checks**

For each one, we sampled 250 recorded model calls and replayed them against 11 candidates: Claude Opus 5.5 and Haiku 5.5, GPT-6 Luna, GPT-6.1 Sol, DeepSeek V4.1 Flash, DeepSeek V4 Pro, GLM 5.3, GLM 5.3 Flash, gpt-oss-120b, Qwen3.8 27B, and MiniMax-M3. Sonnet 5.5 replayed its own calls as a reference.

We scored each step two ways: **tool choice** (same tool as Sonnet) and **exact agreement** (same tool and arguments, or the same text answer).

Ground truth came from full runs. Every candidate ran the same tasks end to end (100, 91, 74, and 86 tasks per use case), graded deterministically, and paired against Sonnet on the same tasks with a bootstrap 95% interval. We say a model **holds** if its task success is at most 5 points below Sonnet's.

## Narrowing works

Rank the candidates by how often they pick the same tool as Sonnet, keep the top three, and you always keep a good option. In every use case, at least two of the top three held task success in full runs. In three of the four, all three did.

That's the part of a step check you can rely on. It's cheap, and it throws out models that are clearly wrong for the job. On invoice extraction, gpt-oss-120b picked Sonnet's tool on only 32% of calls and finished 33 points below it in full runs.

<figure>
  <img src="https://assets.zenml.io/content/blog/you-cant-pick-your-agents-next-model-from-a-diff/c44ecb9d/invoice-step-agreement-vs-outcome.avif" alt="Scatter plot for invoice extraction with one dot per candidate model, step agreement with Claude Sonnet 5.5 on the horizontal axis and full-run task success relative to Sonnet on the vertical axis. gpt-oss-120b sits far left at 32% agreement and 33 points below Sonnet. The three models with the highest step agreement, Opus 5.5, GPT-6.1 Sol and Haiku 5.5, all hold quality, and GPT-6 Luna, ranked 10th by agreement, also holds and is the cheapest model that does." />
  <figcaption>Invoice extraction, one dot per candidate model. Left to right: how often it picks the same tool as Sonnet 5.5 on recorded calls. Bottom to top: task success against Sonnet 5.5 in full runs.</figcaption>
</figure>

## Picking doesn't

The natural next step is to let the step check make the call: "any model within 10 points of the closest match on tool choice is comparable, now take the cheapest." We checked that rule against the full runs for all 44 candidate–use case pairs.

It was right 35 times out of 44. Of the nine misses, four were models it called comparable that lose in full runs, including Qwen3.8 27B on bank support (11 points below Sonnet) and Haiku 5.5 on KYC checks (8 points below). The other five were models it ruled out that actually hold.

The single "cheapest" picks were worse than that rate suggests. In the three use cases where the rule named a new model, every pick landed right at the edge of acceptable: GPT-6 Luna on bank support (−5.0 points) and on KYC (−4.7), and DeepSeek V4 Pro on claims triage (−5.4). A rule that keeps landing on the boundary isn't telling you much.

Across use cases, step metrics track task success only moderately. The rank correlation between tool-choice agreement and full-run success averages 0.54 within a use case; for exact step agreement, 0.63. With 11 candidates per use case, treat both as rough.

## Tool choice can't see conversations

Bank support makes the gap obvious. Every model picks the same tool as Sonnet 85% to 99% of the time. Full-run success ranges from 51% to 64%.

In a conversation, the tool is often the easy part. The difference is in what the agent says, what it asks for, and when it decides to act. A step check scores each turn in isolation, against inputs the candidate never produced itself, so it can't see any of that.

In conversations, exact agreement doesn't rescue it either. Replayed against its own recorded support traffic, Sonnet 5.5 produced exactly the same step only about half the time (48% and 51% in two separate replays). If the current model matches itself half the time, a mismatch doesn't mean much.

<figure>
  <img src="https://assets.zenml.io/content/blog/you-cant-pick-your-agents-next-model-from-a-diff/88121123/support-tool-choice-vs-success.avif" alt="Two dot strips for bank support with one dot per candidate model. On the first, how often each model picks the same tool as Claude Sonnet 5.5, all 11 models fall between 85% and 99%. On the second, full-run task success, they spread from 51% to 64%, around Sonnet's own 62%." />
  <figcaption>Bank support: every candidate picks Sonnet 5.5's tool almost every time, but full-run task success varies from 51% to 64%.</figcaption>
</figure>

## The cheapest model that holds takes a different path

This was the finding that changed how we think about model swaps.

GPT-6 Luna was the cheapest model that held quality in three of the four use cases: bank support, invoice extraction, and KYC checks. Per successful task, it cost about $0.002 on bank support against Sonnet's $0.17, and under a tenth of a cent on invoices and KYC against Sonnet's roughly two cents.

By tool choice, it ranked 6th, 10th, and 7th. It would never have made a top-three shortlist. The cheapest-pick rule above did land on it for bank support and KYC; on invoices, it stuck with Sonnet.

Luna gets to the right outcome by different steps. It asks in a different order, words things differently, and calls tools at different points. A step check counts every one of those as a disagreement. Only running the whole task shows that the end state is still correct.

<figure>
  <img src="https://assets.zenml.io/content/blog/you-cant-pick-your-agents-next-model-from-a-diff/19a78229/cheapest-holder-rank.avif" alt="Chart with one row per use case ranking 11 candidate models by tool-choice agreement with Claude Sonnet 5.5, with the top three shaded as the shortlist. The cheapest model that holds quality ranks 6th on bank support, 10th on invoice extraction and 7th on KYC checks, each time GPT-6 Luna, and 3rd on claims triage, Haiku 5.5. GPT-6 Luna costs $0.0017 per successful task on bank support against $0.17 for Sonnet, $0.00059 against $0.022 on invoices, and $0.00057 against $0.019 on KYC checks." />
  <figcaption>Each row ranks the 11 candidates by how often they pick the same tool as Sonnet 5.5. The dark dot is the cheapest model that holds quality in full runs, with its cost per successful task.</figcaption>
</figure>

## How we're building this into Kitaru

[Kitaru](https://kitaru.ai) is built on the idea that agent traces should be something you can run, not just read. The new model-swap workflow follows what this data says: use cheap evidence to narrow, and expensive evidence to decide.

1. **Narrow with step replay.** Replay recorded calls from your own agent against candidate models. This filters out models that clearly don't fit, quickly and cheaply.
2. **Review the disagreements.** Where a candidate does something different from your current model, a person decides whether it's equivalent or wrong. That is where a model like Luna should surface instead of being ranked out. We haven't yet measured how often reviewers catch these cases.
3. **Confirm finalists with a full replay.** Run your actual agent code, end to end, on the same sessions with each finalist, and score the results with your evaluators next to the current model's baseline.

The third step is the one that decides. The first two make it affordable.

## How we ran it, and what to keep in mind

- **Synthetic tasks.** All four agents run in simulated environments with deterministic graders. They are modeled on real workflows, not taken from production.
- **Possible authorship bias.** Claude models wrote the environments and tasks, and the recorded traffic comes from Claude Sonnet 5.5. That could favor Claude models.
- **Two Sonnet runs.** For invoice extraction, claims triage and KYC checks, the calls we replayed came from a separate Sonnet 5.5 recording run, not from the full runs we compare against. Both used the same model and settings, but they are different samples.
- **One run per task.** Confidence intervals are wide, often 5 to 12 points either side. Several "holds" verdicts, including Luna on bank support, sit right on the 5-point line.
- **Few models per use case.** Rank correlations over 11 candidates are rough estimates.
- **Step judging.** In this study an LLM judge, not a person, labeled step disagreements. Human review is part of the workflow we describe, but we didn't test it here.

## Try it

The model-swap workflow is in review for an upcoming Kitaru release. The last step works today: [replay your agent with a model override](https://docs.zenml.io/kitaru/guides/replay-and-overrides), and use [tool policies](https://docs.zenml.io/kitaru/guides/tool-policies) to decide whether each tool call gets the recorded result, a fixed result, or the live tool. That matters when a finalist takes a path the recording never saw.

Kitaru is open source: the docs are at [docs.zenml.io/kitaru](https://docs.zenml.io/kitaru) and the code is on [GitHub](https://github.com/zenml-io/kitaru).

If you're already weighing a cheaper model for an agent in production, we'd like to hear how you're making the call today.
