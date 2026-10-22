---
title: "37 Changes to One Underwriting Agent, Measured"
slug: "37-changes-to-one-underwriting-agent-measured"
draft: true
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "evaluation"
  - "llm"
date: "2026-10-21T00:00:00.000Z"
readingTime: "12 mins"
seo:
  title: "37 Changes to One Underwriting Agent, Measured - ZenML Blog"
  description: "We tested 37 changes to an insurance underwriting agent on 252 cases: model swaps, prompt rewrites, effort settings. Some helped, one cost 17 points, and the best was a cheap closed model with a better prompt."
  canonical: "https://www.zenml.io/blog/37-changes-to-one-underwriting-agent-measured"
---

Every agent in production keeps changing. A new model comes out, someone edits the system prompt, someone lowers the reasoning effort to save money. Most of these changes ship on a hunch and a few spot checks, and the team finds out what they did from production.

We wanted to know what those changes actually do. So we took one agent, an insurance underwriting agent, and tested 37 changes to it on 252 cases before shipping any of them: 11 model swaps, 8 effort settings, 7 tuned prompts, and one shared prompt across 11 models. For each, we measured what it did to correct decisions and to the cost of each one.

The short version, starting from an agent on Claude Sonnet 5.5:

- **The change most teams reach for first wasn't the best one.** Swapping to a stronger model gained about 8 points. Rewriting the prompt gained 10 and made each correct decision a third cheaper.
- **The best change was a cheap closed model with a better prompt.** Claude Haiku 5.5 with the rewritten prompt got 98.8% right at 0.38¢ per correct decision, about a thirteenth of Claude Opus 5.5's cost, with no measurable loss.
- **One cost-saving change was a disaster.** Lowering Sonnet's reasoning effort cost it 17 points.
- **Changing nothing moved the score 2.4 points.** We ran the same agent twice. Any difference smaller than that is a tie.
- **Changes interact.** Before the prompt fix, the evidence said switch models. After it, the same evidence said keep the model family and drop a tier.

## The agent

We used Snorkel AI's public multi-turn insurance underwriting datasets (Apache-2.0). An underwriter at a fictional insurer asks an agent about a small business applying for a policy:

- **Appetite checks:** is this business in appetite for a given line of business?
- **Product recommendations:** which of our other lines should we offer?
- **Small-business eligibility:** does it meet the size standard for its industry?
- **Policy limits** and **deductibles:** what do the guidelines say for this business?
- **Business classification:** which NAICS code applies?

The agent has six tools over the insurer's database and underwriting guidelines (NAICS codes, SBA size standards, the insurer's appetite guide) and talks to a simulated underwriter who knows the application but not the answer. It has to ask for what it needs, within 30 model calls and 12 underwriter turns.

These cases stand in for what a team would pull from its own production traces: real questions, with a known right answer for each.

## How we tested a change

A change is only worth shipping if you can tell its effect from noise, so every test followed the same rules:

- **Same cases, paired.** Each change ran on the same cases as the agent it was compared with, and we report the paired difference with a bootstrap 95% interval.
- **Held-out cases for anything tuned.** Prompts were tuned on 84 cases and judged on the other 168, which the tuning never saw.
- **Cost per correct decision, not cost per call.** Every model call on a case, at list prices, divided by the cases the agent got right.
- **Results by question type.** An average can hide a change that helps one kind of question and breaks another.
- **A measured noise floor.** We ran the unchanged Sonnet agent a second time. It moved +2.4 points [−3.6, +8.3].

All the numbers below are on the 168 held-out cases unless stated.

## The scorecard

Here is what the most relevant changes did, starting from the agent we had: Sonnet 5.5 with the prompt we wrote once, at 89.3% correct and 4.11¢ per correct decision.

| Change | Correct | vs today (points, 95% CI) | Cost per correct decision |
|---|---|---|---|
| Nothing (same agent, run again) | 91.7% | +2.4 [−3.6, +8.3] | 3.91¢ |
| Swap to Claude Opus 5.5 | 97.0% | +7.7 | 5.26¢ |
| Swap to DeepSeek V4 Pro (open) | 97.0% | +7.7 | 3.56¢ |
| Swap to GLM 5.3 Flash (open) | 91.7% | +2.4 | 0.98¢ |
| Swap to Claude Haiku 5.5 | 85.7% | −3.6 | 0.52¢ |
| Lower effort to medium | 81.5% | −7.7 [−14.9, −0.6] | 3.33¢ |
| Lower effort to low | 72.6% | −16.7 [−24.4, −8.9] | 3.47¢ |
| Rewrite the prompt | 99.4% | +10.1 [+5.4, +14.9] | 2.73¢ |
| Rewrite the prompt, then swap to Claude Haiku 5.5 | 98.8% | +9.5 | 0.38¢ |
| Rewrite the prompt, then swap to GLM 5.3 Flash (open) | 99.4% | +10.1 | 0.92¢ |
| Rewrite the prompt, then swap to Claude Opus 5.5 | 97.6% | +8.3 | 5.12¢ |

Model swaps are compared on the same cases but in separate runs, so their intervals are wider than the paired ones shown.

Read down the cost column and the story is plain. Lowering effort saved about a sixth of the cost per correct decision and threw away up to 17 points. The model swap with the best accuracy made each decision more expensive. The prompt rewrite did better than any swap, and once it was in place, the cheapest model that kept up cost a seventh as much as Sonnet.

## Change one: swap the model

This is the comparison most teams run: every model on the same prompt, written once. On all 252 cases:

| Model | Correct | Cost per correct decision |
|---|---|---|
| DeepSeek V4 Pro (open) | 97.6% | 3.55¢ |
| Claude Opus 5.5 | 97.2% | 5.26¢ |
| GLM 5.3 (open) | 94.8% | 8.25¢ |
| GLM 5.3 Flash (open) | 92.5% | 0.97¢ |
| DeepSeek V4.1 Flash (open) | 91.3% | 2.10¢ |
| Claude Sonnet 5.5 | 88.9% | 4.06¢ |
| Claude Haiku 5.5 | 87.3% | 0.50¢ |
| GPT-6 Luna | 86.5% | 0.19¢ |
| MiniMax-M3 (open) | 86.5% | 1.75¢ |
| Qwen3.8 27B (open) | 84.1% | 3.71¢ |
| GPT-6.1 Sol | 83.7% | 2.01¢ |
| gpt-oss-120b (open) | 59.5% | 0.99¢ |

On its own, this table makes a confident recommendation: move to Opus or DeepSeek V4 Pro, and treat Haiku as clearly worse. It also shows that price per token is not price per decision. GLM 5.3 is the most expensive model here per correct decision because it uses about 46,000 tokens and 11 calls per case, while Opus, pricey per token, finishes in 6.5 calls.

But the failures behind the lower scores were mostly not about underwriting. GPT-6.1 Sol often put its final-answer marker on a question back to the underwriter ("FINAL ANSWER: could you share the NAICS code?"), which is why it got only 71% of appetite checks right. Sonnet, MiniMax-M3, and Qwen3.8 27B lost most of their points on product recommendations, often recommending lines before asking which one the application was for. These are failures of how the agent runs the conversation, and they suggested a different change.

## Change two: rewrite the prompt

For each model, Claude Opus 5.5 read that model's failures on the 84 learning cases and rewrote the system prompt with general instructions. A rewrite was kept only if it did better on the learning cases, and any rewrite that copied case facts (codes, numbers, company names) was rejected. The rewrites cost under a dollar in total; any prompt optimizer, or a strong model and an afternoon, would do the same.

What changed was conversation discipline, not underwriting knowledge: ask which line of business the application is for before recommending others, classify the business from the database and treat that as settled, commit to one answer, never end the case on a question, and answer only what was asked.

Then we took the prompt rewritten for Sonnet and ran it, unchanged, on the other eleven models:

| Model | Original prompt | Rewritten prompt | Change (points, 95% CI) | Cost per correct decision |
|---|---|---|---|---|
| GLM 5.3 Flash (open) | 91.7% | 99.4% | +7.7 [+3.6, +12.5] | 0.92¢ |
| Claude Sonnet 5.5 | 89.3% | 99.4% | +10.1 [+5.4, +14.9] | 2.73¢ |
| Claude Haiku 5.5 | 85.7% | 98.8% | +13.1 [+8.3, +18.5] | 0.38¢ |
| DeepSeek V4 Pro (open) | 97.0% | 98.8% | +1.8 [−0.6, +4.8] | 3.27¢ |
| GPT-6.1 Sol | 82.1% | 98.2% | +16.1 [+10.1, +22.0] | 1.78¢ |
| DeepSeek V4.1 Flash (open) | 91.7% | 98.2% | +6.5 [+2.4, +11.3] | 1.81¢ |
| GLM 5.3 (open) | 94.6% | 98.2% | +3.6 [+0.6, +6.5] | 7.37¢ |
| Claude Opus 5.5 | 97.0% | 97.6% | +0.6 [−3.0, +4.2] | 5.12¢ |
| MiniMax-M3 (open) | 84.5% | 96.4% | +11.9 [+6.5, +17.3] | 1.82¢ |
| GPT-6 Luna | 83.9% | 90.5% | +6.5 [+0.6, +12.5] | 0.19¢ |
| gpt-oss-120b (open) | 56.0% | 86.9% | +31.0 [+22.0, +39.9] | 1.15¢ |
| Qwen3.8 27B (open) | 83.3% | 82.7% | −0.6 [−7.7, +6.5] | 5.33¢ |

Ten of the eleven gained, and nine now sit between 97.6% and 99.4%, within noise of each other. Giving each model its own tuned prompt added nothing measurable on top. Two models stayed behind, GPT-6 Luna and Qwen3.8 27B, and those are real gaps a prompt didn't close.

## Change three: turn the effort dial

Effort is the change teams make to save money, and it behaved differently on every model:

- **Sonnet 5.5:** medium effort cost 7.7 points, low effort 16.7.
- **Opus 5.5:** low effort cost 3.6 points [−7.1, 0.0] and saved about a fifth per correct decision.
- **GPT-6.1 Sol:** high effort gained 9.5 points [+4.2, +14.9], less than the prompt rewrite's 16.1.
- **Claude Haiku 5.5** and **GPT-6 Luna:** high effort changed nothing measurable and cost more.

The same knob helped one model, did nothing for two, and badly hurt another. You can't carry an effort setting from one model to the next on faith.

## Changes interact

Most teams test one change at a time against today's agent. Here the order mattered.

We also ran the test the way a team without a benchmark would: record the Sonnet agent's runs in [Kitaru](/product/kitaru), screen all eleven candidates cheaply, then replay the finalists end to end. The screen replayed 250 single model calls against each candidate for about $16; it ruled out clear failures but ranked the cheapest good model near the bottom, because Sonnet itself only repeated its own next step 58% of the time. The full replays of 48 recorded cases, about $10, said one thing clearly:

| Swap Sonnet 5.5 for… | Correct | Sonnet on the same cases | Difference (points, 95% CI) | Cost per correct decision |
|---|---|---|---|---|
| DeepSeek V4 Pro | 47/48 | 43/48 | +8.3 [+2.1, +16.7] | 3.67¢ vs 4.21¢ |
| GLM 5.3 | 45/48 | 43/48 | +4.2 [−6.2, +14.6] | 8.46¢ |
| GPT-6 Luna | 41/48 | 43/48 | −4.2 [−16.7, +8.3] | 0.19¢ |
| Claude Haiku 5.5 | 39/47 | 42/47 | −6.4 [−19.1, +6.4] | 0.47¢ |

Under the original prompt, the right call was to switch to DeepSeek V4 Pro. Under the rewritten prompt, Sonnet reached 99.4% on its own, and Haiku matched it at a seventh of the cost. Same agent, same cases, opposite advice. So the useful test is not "which model?" but "which model with which prompt?", run together on the same cases.

## Checking the results

A change is only as believable as the measurement behind it:

- **Grading.** Two LLM judges, with a third breaking ties, agree with Snorkel's human labels 87–90% of the time. Three of the judges are also candidates; re-grading their answers with other judges moved their scores by under 2 points, in both directions. The judges also agreed with each other more often after the prompt rewrite, so the answers got clearer, not easier to grade.
- **Memorization.** The datasets are public, so we asked every model 24 cases with no tools or data. No model named the right set of other products for any case (0 of 72 answers), and the appetite checks they got right were ones a model can reason out.
- **Answerable cases.** The insurer's environment is a reconstruction from the published traces. We kept the 252 of 380 cases where a rule-based check re-derives the reference answer from it.

## Caveats

- One run per case per change. Differences under about 3 points are inside the noise.
- The underwriter is simulated, and grading is done by LLM judges.
- Prompt tuning was at most two rounds per model, with one optimizer and 84 learning cases. The shared prompt was tuned on a Claude model, which may favor Claude models slightly; it still lifted open-weight and OpenAI models by up to 31 points.
- Prices are list prices. Open-weight models ran on one commercial inference provider; prices and latency vary across providers.
- This is one agent and one domain. The specific winners won't carry over to yours. The way the changes behaved, and how often the obvious one wasn't the best, probably will.

## What to take from this

1. **Test the change, not the model.** A model, a prompt, and an effort setting are all changes to the same agent, and each one can help or hurt. Test them together on the same cases.
2. **Measure cost per correct decision.** Steps and errors move it more than token prices do, and it is the number that tells you whether a cheaper model is actually cheaper.
3. **Know your noise.** Run the unchanged agent twice. Here that alone moved 2.4 points, and anything inside it is a tie.
4. **Read results by question type.** The change that wins on average can lose on the questions your team asks most.
5. **Screen cheaply, then decide with full replays.** Step-level replays rule out clear failures. Only end-to-end replays, graded on outcomes, tell you what to ship.

## Run it on your own agent

This is what [Kitaru](/product/kitaru) is for: knowing what a change does to your agent before you ship it. It turns your agent's traces into test cases, imports from Langfuse, LangSmith, Logfire, Braintrust, MLflow, or Phoenix, replays them against any model, prompt, or setting from any vendor or open model, and reports what got better, what broke, and what each correct answer costs. It's open source and runs on your own machine.

It works from Claude Code, Codex, and Cursor. Install the Kitaru skills and give your coding agent something like:

```text
Import our last 300 production traces from Langfuse into Kitaru. Find the failures and the hard cases.
Then test three changes on them: Claude Haiku 5.5, our current model with a rewritten system prompt,
and Haiku with that prompt. Report correct answers and cost per correct answer by task type, and call
anything within run-to-run noise a tie.
```

[Start free](https://cloud.zenml.io/signup?product=kitaru)
