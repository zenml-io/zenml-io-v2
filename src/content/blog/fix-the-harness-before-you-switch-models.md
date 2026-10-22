---
title: "Fix the Harness Before You Switch Models"
slug: "fix-the-harness-before-you-switch-models"
draft: true
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "evaluation"
  - "llm"
date: "2026-10-21T00:00:00.000Z"
readingTime: "11 mins"
seo:
  title: "Fix the Harness Before You Switch Models - ZenML Blog"
  description: "We ran 12 models as an underwriting agent on 252 insurance cases. Under one prompt they spread from 60% to 98%. After one prompt rewrite, nine landed within two points, and the cheapest of them cost 13x less than the most expensive."
  canonical: "https://www.zenml.io/blog/fix-the-harness-before-you-switch-models"
---

When an agent underperforms or costs too much, the first question teams ask is which model to switch to. We tried to answer that for an underwriting agent: 12 models, 252 commercial insurance cases, one question per case, and a count of correct decisions and dollars.

The first answer looked clear. Then we rewrote the agent's prompt once, and most of it went away.

The short version:

- **Under one prompt written once, the models spread from 59.5% to 97.6% correct**, and cost per correct decision varied about 40x. That is the comparison most teams run.
- **One rewritten prompt lifted ten of the eleven other models.** On cases held out from tuning, nine landed between 97.6% and 99.4%, within noise of each other.
- **The cheapest model in that group, Claude Haiku 5.5, reached 98.8% at 0.38¢ per correct decision**, about thirteen times cheaper than Claude Opus 5.5 for no measurable loss.
- **The fixes were about conversation discipline, not underwriting knowledge**: ask before recommending, commit to one answer, never end on a question. Those failures only show up when you run the whole conversation.
- **The rewrite was the cheap part.** It took a strong model reading failures and cost cents. The work was the bench around it: real cases, full runs, grading we checked, and a measured noise floor.

## The task

We used Snorkel AI's public multi-turn insurance underwriting datasets (Apache-2.0). An underwriter at a fictional insurer asks an agent about a small business applying for a policy, and the agent has to work it out with the insurer's own data:

- **Appetite checks:** is this business in appetite for a given line of business?
- **Product recommendations:** which of our other lines should we offer?
- **Small-business eligibility:** does it meet the size standard for its industry?
- **Policy limits** and **deductibles:** what do the guidelines say for this business?
- **Business classification:** which NAICS code applies?

The agent gets six tools: list the tables, describe them, read their schemas and data dictionaries, run read-only SQL against the insurer's database, and read the underwriting guidelines. The database holds 2022 NAICS codes and Census concordances, the SBA size standards, and the insurer's appetite guide. The underwriter is simulated by a separate model that knows the company's application details but not the answer. The agent has to ask for what it needs.

We count what an underwriting team pays for: correct decisions. Cost per correct decision covers every model call the agent made on a case, at list prices, divided by the cases it got right.

## Round one: the comparison most teams run

Every model got the same system prompt, tools, and limits (30 model calls, 12 underwriter turns), and every case ran once per model.

| Model | Correct | vs Opus 5.5 (points, 95% CI) | Cost per correct decision | Cost per 10,000 decisions | Wrong per 10,000 |
|---|---|---|---|---|---|
| DeepSeek V4 Pro (open) | 97.6% | +0.4 [−2.0, +2.8] | 3.55¢ | $347 | 238 |
| Claude Opus 5.5 | 97.2% | reference | 5.26¢ | $511 | 278 |
| GLM 5.3 (open) | 94.8% | −2.4 | 8.25¢ | $783 | 516 |
| GLM 5.3 Flash (open) | 92.5% | −4.8 [−9.1, −1.2] | 0.97¢ | $90 | 754 |
| DeepSeek V4.1 Flash (open) | 91.3% | −6.0 | 2.10¢ | $192 | 873 |
| Claude Sonnet 5.5 | 88.9% | −8.3 [−12.7, −4.0] | 4.06¢ | $361 | 1,111 |
| Claude Haiku 5.5 | 87.3% | −9.9 | 0.50¢ | $44 | 1,270 |
| GPT-6 Luna | 86.5% | −10.7 | 0.19¢ | $17 | 1,349 |
| MiniMax-M3 (open) | 86.5% | −10.7 | 1.75¢ | $151 | 1,349 |
| Qwen3.8 27B (open) | 84.1% | −13.1 | 3.71¢ | $312 | 1,587 |
| GPT-6.1 Sol | 83.7% | −13.5 | 2.01¢ | $168 | 1,627 |
| gpt-oss-120b (open) | 59.5% | −37.7 | 0.99¢ | $59 | 4,048 |

"Wrong" includes cases that ran out of steps or turns. Differences against Opus are paired: same 252 cases, bootstrap 95% interval.

Read at face value, this table makes a confident recommendation. Opus or DeepSeek V4 Pro for quality; GLM 5.3 Flash if you can live with three times the errors; Haiku and Sonnet clearly behind. A team that runs Sonnet today would conclude it should switch.

Two things from this round hold up under everything that follows. Price per token is not price per decision: GLM 5.3 is the most expensive model per correct decision here because it uses about 46,000 tokens and 11 calls per case, while Opus, pricey per token, finishes in 6.5 calls. And averages hide where models fail, which is where the story turns.

## What the failures looked like

Many of the lost points had little to do with underwriting:

- **GPT-6.1 Sol** often ended a case by putting its final-answer marker on a question back to the underwriter ("FINAL ANSWER: could you share the NAICS code?"). That counts as a wrong decision, and it is why Sol got only 71% of appetite checks right while doing well elsewhere.
- **Product recommendations** (which other lines are in appetite) are where Sonnet 5.5 (78%), MiniMax-M3 (75%), and Qwen3.8 27B (67%) lost most of their points, often by recommending lines before asking which one the application was for.
- **gpt-oss-120b** produced tool calls whose arguments were not valid JSON 28 times, and **Qwen3.8 27B** ran out of its 30-call budget on 17 cases.

These are failures of the agent loop: how the model gathers information, when it stops, and how it commits to an answer. A model that doesn't fit your loop fails your cases, so this is real. But it is also something you can change without changing the model.

## Round two: fix the prompt

We split the 252 cases into 84 for learning and 168 held out, stratified by question type. For each model, Claude Opus 5.5 read that model's failures on the learning cases and rewrote its system prompt with general instructions. A rewrite was kept only if it scored better on the learning cases, and any rewrite that copied facts from the cases (codes, numbers, company names) was rejected. The best prompt then ran once on the 168 held-out cases, which the tuning never saw.

To know how much a score moves on its own, we also ran Sonnet 5.5 again with the original prompt. It moved +2.4 points [−3.6, +8.3]. Differences of a few points are noise.

| Model | Original | Tuned prompt | Change (points, 95% CI) | Cost per correct decision |
|---|---|---|---|---|
| Claude Sonnet 5.5 | 89.3% | 99.4% | +10.1 [+5.4, +15.5] | 4.11¢ → 2.73¢ |
| DeepSeek V4 Pro (open) | 97.0% | 98.2% | +1.2 [−1.8, +4.2] | 3.56¢ → 3.12¢ |
| Claude Opus 5.5 | 97.0% | 98.2% | +1.2 [−1.2, +3.6] | 5.26¢ → 4.31¢ |
| GPT-6.1 Sol | 82.1% | 97.6% | +15.5 [+9.5, +21.4] | 2.01¢ → 1.11¢ |
| Claude Haiku 5.5 | 85.7% | 97.6% | +12.0 [+6.6, +18.0] | 0.52¢ → 0.38¢ |
| GLM 5.3 Flash (open) | 91.7% | 97.6% | +6.0 [+1.8, +10.8] | 0.98¢ → 0.72¢ |
| gpt-oss-120b (open) | 56.0% | 76.2% | +20.2 [+10.1, +29.8] | 0.98¢ → 1.48¢ |

Held-out cases only. GPT-6 Luna was not tuned, because no rewrite improved on its 78 of 84 learning cases.

Sonnet 5.5, the model our hypothetical team was about to replace, gained ten points and became a third cheaper per correct decision. No model swap in round one did as much for it.

The rewrites did not teach the models underwriting. They fixed how the agent runs the conversation: ask which line of business the application is for before recommending others, classify the business from the database when there is no code and treat it as settled, commit to one answer instead of hedging, never end the case on a question, and answer only what was asked. The two judges agreed with each other more often on tuned answers, so the answers became clearer, not easier to grade.

Effort settings, the other knob teams reach for, moved less than the prompt. High reasoning effort helped GPT-6.1 Sol by about nine points; lowering Sonnet 5.5's effort cost it seventeen.

## Round three: one prompt for everyone

Does each model need its own prompt? We took the prompt tuned for Sonnet 5.5, unchanged, and ran it on the other eleven models' held-out cases. This is the comparison round one should have been.

| Model | Original | Shared prompt | Change (points, 95% CI) | Cost per correct decision |
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

Ten of the eleven other models gained, and nine now sit between 97.6% and 99.4%. Giving each model its own tuned prompt added nothing measurable on top; for gpt-oss-120b, a prompt tuned on its own failures did worse than the shared one.

So the round-one ranking was mostly a ranking of how well each model fit a prompt we wrote once. With a good prompt, accuracy is a near tie for nine models, and the decision becomes cost and constraints. Claude Haiku 5.5 (98.8% at 0.38¢) and GLM 5.3 Flash (99.4% at 0.92¢, open weights) lead. Opus 5.5 costs about thirteen times as much as Haiku per correct decision for no measurable gain. Two models stayed behind even with the better prompt, GPT-6 Luna and Qwen3.8 27B, and those are real model gaps.

## The rewrite was the cheap part

The optimizer here was a strong model reading failed conversations and rewriting the prompt, with two rules: keep a rewrite only if it scores better on the learning cases, and reject one that copies case facts. Across eight models that cost $0.89 in optimizer calls. The prompt everyone shared cost 8¢. A dedicated optimizer such as DSPy's GEPA would do the same job, probably better. Automatic prompt rewriting is a solved technique.

What made the rewrite worth anything was the bench around it:

- **Real cases with known answers**, split so the prompt was judged on cases it never saw.
- **Full conversations, not single calls.** The failures that mattered (ending on a question, recommending before asking) only appear across a whole run with a simulated underwriter.
- **Grading we checked.** Two LLM judges with a third breaking ties agree with Snorkel's human labels 87–90% of the time. Three judges are also candidates; re-grading their answers with other judges moved their scores by under 2 points, in both directions.
- **A measured noise floor**, from re-running Sonnet unchanged, so a three-point "win" is read as nothing.
- **A memorization check.** The datasets are public, so we asked every model 24 cases with no tools or data. No model named the right set of other products for any case (0 of 72 answers), and the appetite checks it got right were ones a model can reason out. We saw no sign of memorization.

Without those, an optimizer overfits to whatever you measure, and you can't tell a better prompt from a lucky run.

## Picking a swap in practice

Most teams don't have a benchmark for their own agent. They have an agent in production and a question. We tried answering it the way a team would, starting from Sonnet 5.5 under the original prompt.

**A cheap screen rules models out.** With [Kitaru](/product/kitaru), we took Sonnet's recorded cases and replayed 250 individual model calls against the other 11 models, comparing each model's next step with Sonnet's. That cost about $16 and needs no environment, simulated user, or grader. The three models it put closest to Sonnet all held Sonnet's accuracy in the full runs. But underwriting steps vary a lot: Sonnet, replayed against its own recording, picked the same tool only 58% of the time, and the screen put the cheapest model that holds quality near the bottom. A step diff narrows the field; it does not pick the winner.

**Full replays decide.** We recorded 48 cases with Sonnet in Kitaru and replayed them end to end with four candidates swapped in, graded by the same correctness check:

| Swap Sonnet 5.5 for… | Correct | Sonnet on the same cases | Difference (points, 95% CI) | Cost per correct decision |
|---|---|---|---|---|
| DeepSeek V4 Pro | 47/48 | 43/48 | +8.3 [+2.1, +16.7] | 3.67¢ vs 4.21¢ |
| GLM 5.3 | 45/48 | 43/48 | +4.2 [−6.2, +14.6] | 8.46¢ |
| GPT-6 Luna | 41/48 | 43/48 | −4.2 [−16.7, +8.3] | 0.19¢ |
| Claude Haiku 5.5 | 39/47 | 42/47 | −6.4 [−19.1, +6.4] | 0.47¢ |

Under the original prompt, that says switch to DeepSeek V4 Pro. Under the fixed prompt, Sonnet itself reaches 99.4% and Haiku matches it at a seventh of the cost. Same replays, opposite advice, depending on whether you fixed the harness first. Kitaru's replays take a prompt override alongside the model, so the right experiment is a grid: model and prompt together, not model alone.

## Caveats

- One run per case per model. Differences under about 3 points are inside the noise.
- The insurer's environment is a reconstruction from the published traces. We kept the 252 of 380 cases where a rule-based check re-derives the reference answer from that environment, so every scored case is answerable from data the agent can see.
- The underwriter is simulated, and grading is done by LLM judges.
- Tuning was one run per model, at most two rounds, with one optimizer and 84 learning cases. Four models (GLM 5.3, DeepSeek V4.1 Flash, MiniMax-M3, Qwen3.8 27B) were only tested with the shared prompt, not tuned on their own.
- The shared prompt was tuned for a Claude model, which may favor Claude models slightly. It still lifted open-weight and OpenAI models by up to 31 points.
- Prices are list prices. Open-weight models ran on one commercial inference provider; prices and latency vary across providers.

## What to take from this

If you run an agent whose output is a decision, five things carry over:

1. **Fix the harness before you switch models.** Read the failures first. If they are about how the agent runs the conversation, a prompt change will do more than a model change, for a fraction of the cost.
2. **Compare models under one good prompt.** A comparison under a prompt written once mostly ranks prompt fit. Tune on cases you then hold out, and measure the noise.
3. **Measure cost per correct decision, not cost per call.** Steps and errors move the number more than token prices do.
4. **Read results per question type, and count conversation-discipline failures on their own.** They are the cheapest failures to fix.
5. **Screen cheaply, then decide with full replays.** Step-level replays rule out models that clearly fail; only end-to-end replays, graded on outcomes, tell you what to ship.

Use whatever prompt optimizer you like. [Kitaru](/product/kitaru) is the bench around it: it records your agent's real runs, replays them end to end with a different model, prompt, or both, across any vendor or open model, and grades the results with your evaluators so you can tell an improvement from noise.
