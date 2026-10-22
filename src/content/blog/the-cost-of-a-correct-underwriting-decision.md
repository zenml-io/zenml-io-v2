---
title: "The Cost of a Correct Underwriting Decision"
slug: "the-cost-of-a-correct-underwriting-decision"
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
  title: "The Cost of a Correct Underwriting Decision - ZenML Blog"
  description: "We ran 12 models as an underwriting copilot on 252 commercial insurance cases. An open-weight model tied the top model for a third less, and cost per correct decision varied 40x."
  canonical: "https://www.zenml.io/blog/the-cost-of-a-correct-underwriting-decision"
---

An underwriting copilot is judged on one thing: did it reach the right decision? Is this bakery in appetite for workers' comp? Does this contractor qualify as a small business? Which other lines should we offer this landlord? The price that matters is not tokens per second or cost per call. It is what you pay for each decision that comes out right.

So we measured that. We ran 12 models as the same underwriting copilot on 252 commercial insurance cases and counted correct decisions and dollars.

The short version:

- **The top is a tie, and an open-weight model is in it.** DeepSeek V4 Pro got 97.6% of cases right, Claude Opus 5.5 got 97.2%, and the difference is noise. DeepSeek costs about a third less per correct decision.
- **Price is not quality.** The most expensive model per correct decision ranked third. A mid-priced model was clearly worse than the top, not "almost as good."
- **Cost per correct decision varied about 40x**, from 0.19¢ to 8.25¢.
- **Models fail on specific kinds of questions**, and some failures come from how a model drives the conversation, not from what it knows.
- **Then we fixed the prompt, and most of the gaps closed.** On cases held out from tuning, one prompt tuned for Sonnet 5.5 lifted ten of eleven other models; nine landed within about two points of each other at 97.6–99.4%. Claude Haiku 5.5 reached 98.8% at 0.38¢ per correct decision, about thirteen times cheaper than Opus 5.5. Fix the harness before you switch models.

## The task

We used Snorkel AI's public multi-turn insurance underwriting datasets (Apache-2.0). An underwriter at a fictional insurer asks a copilot about a small business applying for a policy, and the copilot has to work it out with the insurer's own data:

- **Appetite checks:** is this business in appetite for a given line of business?
- **Product recommendations:** which of our other lines should we offer?
- **Small-business eligibility:** does it meet the size standard for its industry?
- **Policy limits** and **deductibles:** what do the guidelines say for this business?
- **Business classification:** which NAICS code applies?

The copilot gets six tools: list the tables, describe them, read their schemas and data dictionaries, run read-only SQL against the insurer's database, and read the underwriting guidelines. The database holds 2022 NAICS codes and Census concordances, the SBA size standards, and the insurer's appetite guide. The underwriter is simulated by a separate model that knows the company's application details but not the answer. The copilot has to ask for what it needs.

Every model got the same system prompt, tools, and limits (30 model calls, 12 underwriter turns), and every case ran once per model.

## The results

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

Cost covers every model call the copilot made on a case, at list prices. "Wrong" includes cases that ran out of steps or turns. Differences against Opus are paired: same 252 cases, bootstrap 95% interval.

The last two columns are the ones to bring to a budget meeting. At 10,000 decisions, Opus costs about $511 and gets 278 wrong. DeepSeek V4 Pro costs about $347 and gets 238 wrong. GLM 5.3 Flash costs about $90 and gets 754 wrong. GPT-6 Luna costs $17 and gets 1,349 wrong. Which row is right for you depends on what a wrong decision costs downstream, and in underwriting that is rarely zero.

## Price is not quality

GLM 5.3 is the most expensive model per correct decision here, not because its tokens are expensive but because it uses a lot of them: about 46,000 tokens and 11 model calls per case. Opus is the opposite. It is among the priciest models per token here, but it finishes a case in 6.5 calls and about 25,000 tokens, so per correct decision it costs less than GLM 5.3 and only somewhat more than Sonnet.

That is why cost per call is the wrong number to compare. A model that is cheap per call but takes twice the steps, or gets more cases wrong, is not cheap per decision.

## Where models get it wrong

Averages hide a lot. By question type:

- **Policy limits** separate the field most. The guideline has to be applied to the company's numbers. DeepSeek V4 Pro and Sonnet 5.5 got 94% right; GLM 5.3, GLM 5.3 Flash, and MiniMax-M3 got 65%; DeepSeek V4.1 Flash got 53%. There are only 17 such cases, so treat the size of the gap loosely.
- **Product recommendations** (which other lines are in appetite) are where Sonnet 5.5 (78%), MiniMax-M3 (75%), and Qwen3.8 27B (67%) lost most of their points.
- **Appetite checks and classification** are close to solved for the top models.

If your copilot mostly answers one kind of question, the overall ranking is the wrong one to read. Read the row for your question type.

## Some failures are about the agent loop

Three models lost points for reasons that have little to do with underwriting knowledge:

- **GPT-6.1 Sol** often ended a case by writing its final answer marker on a question back to the underwriter ("FINAL ANSWER: could you share the NAICS code?"). That counts as a wrong decision, and it is why Sol got only 71% of appetite checks right while doing well elsewhere.
- **gpt-oss-120b** produced tool calls whose arguments were not valid JSON 28 times.
- **Qwen3.8 27B** ran out of its 30-call budget on 17 cases.

Each would look different with a different prompt or harness. That is part of the result, not noise to be removed: in production you deploy the model together with the loop around it, and a model that doesn't fit your loop fails your cases.

## Then we tuned the prompt

Every model above ran with the same system prompt, written once. That is how many teams compare models, and it is also a weak spot: a prompt that works for one model can trip up another. So we gave each model its own prompt.

We split the 252 cases into 84 for learning and 168 held out, stratified by question type. For each model, Claude Opus 5.5 read that model's failures on the learning cases and rewrote its system prompt with general instructions. A rewrite was kept only if it scored better on the learning cases, and any rewrite that copied facts from the cases (codes, numbers, company names) was rejected. The best prompt then ran once on the 168 held-out cases, which the tuning never saw. To know how much a score moves on its own, we also ran Sonnet 5.5 again with the original prompt.

| Model | Original | Tuned prompt | Change (points, 95% CI) | Cost per correct decision |
|---|---|---|---|---|
| Claude Sonnet 5.5 | 89.3% | 99.4% | +10.1 [+5.4, +15.5] | 4.11¢ → 2.73¢ |
| DeepSeek V4 Pro (open) | 97.0% | 98.2% | +1.2 [−1.8, +4.2] | 3.56¢ → 3.12¢ |
| Claude Opus 5.5 | 97.0% | 98.2% | +1.2 [−1.2, +3.6] | 5.26¢ → 4.31¢ |
| GPT-6.1 Sol | 82.1% | 97.6% | +15.5 [+9.5, +21.4] | 2.01¢ → 1.11¢ |
| Claude Haiku 5.5 | 85.7% | 97.6% | +12.0 [+6.6, +18.0] | 0.52¢ → 0.38¢ |
| GLM 5.3 Flash (open) | 91.7% | 97.6% | +6.0 [+1.8, +10.8] | 0.98¢ → 0.72¢ |
| gpt-oss-120b (open) | 56.0% | 76.2% | +20.2 [+10.1, +29.8] | 0.98¢ → 1.48¢ |

Held-out cases only. Sonnet 5.5 run again with the original prompt moved +2.4 points [−3.6, +8.3], so differences of a few points are noise. GPT-6 Luna was not tuned, because no rewrite improved on its 78 of 84 learning cases.

Three things stand out:

- **Most of the first ranking was about the prompt.** Tuned, six models sit within about two points of each other, inside the noise. A model that struggled with our original prompt was often a model that needed different instructions, not a weaker model.
- **The cheapest model that reaches the top tier is Claude Haiku 5.5**, at 0.38¢ per correct decision: about eleven times cheaper than tuned Opus 5.5 and seven times cheaper than tuned Sonnet 5.5.
- **For the model you already run, tuning beats switching.** Sonnet 5.5 gained ten points and became a third cheaper per correct decision, more than any model swap in the first run. Changing effort settings moved less: high reasoning effort helped GPT-6.1 Sol by about nine points, and lowering Sonnet 5.5's effort cost it seventeen.

The rewrites did not teach the models underwriting. They fixed how the copilot runs the conversation: ask which line of business the application is for before recommending others, classify the business from the database when there is no code and treat it as settled, commit to one answer instead of hedging, never end the case on a question, and answer only what was asked. The two judges agreed more often on tuned answers, so the answers became clearer, not easier to grade.

## One prompt for everyone

Does each model need its own prompt? We took the prompt tuned for Sonnet 5.5, unchanged, and ran it on the other eleven models' held-out cases.

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

One good prompt lifted nearly everyone. Ten of the eleven other models gained, and nine now sit between 97.6% and 99.4%, within noise of each other. Giving each model its own tuned prompt added nothing measurable on top; for gpt-oss-120b, a prompt tuned on its own failures did worse than the shared one.

With accuracy a near tie, the decision becomes cost and constraints. Claude Haiku 5.5 (98.8% at 0.38¢) and GLM 5.3 Flash (99.4% at 0.92¢, open weights) lead; Opus 5.5 costs about thirteen times as much as Haiku per correct decision for no measurable gain. Two models did not catch up: GPT-6 Luna and Qwen3.8 27B.

## Did the models just memorize the answers?

The datasets are public, so a model trained on them could know the answers. We checked by asking every model 24 cases with no tools and no data: just the company profile and the question. These were cases where the answer can't be reasoned out, because it depends on the insurer's synthetic appetite table.

No model named the right set of other products for any case (0 of 72 answers across models). On appetite checks, models were right 41 of 216 times, nearly all on lodging and lessor businesses that the guidelines decline for fire risk, which a model can reason its way to. We saw no sign of memorization.

## How you'd pick the swap without running a benchmark

Most teams don't have a benchmark for their own agent. They have an agent in production and a question: could it run on something cheaper or better? So we also tried answering that the way a team would, starting from Sonnet 5.5 as today's model.

**Step one: a cheap screen.** With [Kitaru](/product/kitaru), we took Sonnet's recorded cases and replayed 250 individual model calls against the other 11 models, comparing each model's next step with Sonnet's. That cost about $16 and needs no environment, no simulated user, and no grader.

The screen ranked the models usefully: the three it put closest to Sonnet all held Sonnet's accuracy in the full runs. But underwriting steps vary a lot from run to run. Sonnet, replayed against its own recording, picked the same tool only 58% of the time, and no candidate came close to that. So the screen could not tell a better model from a different one, and it put the cheapest model that holds quality near the bottom. A step diff narrows the field. It does not pick the winner. (We've changed Kitaru's model-swap report to say exactly that: it now names finalists for a full replay instead of crowning a "cheapest" model when nothing is comparable.)

**Step two: full replays of the finalists.** We recorded 48 cases with Sonnet in Kitaru and replayed them end to end with four candidates swapped in, graded by the same correctness check:

| Swap Sonnet 5.5 for… | Correct | Sonnet on the same cases | Difference (points, 95% CI) | Cost per correct decision |
|---|---|---|---|---|
| DeepSeek V4 Pro | 47/48 | 43/48 | +8.3 [+2.1, +16.7] | 3.67¢ vs 4.21¢ |
| GLM 5.3 | 45/48 | 43/48 | +4.2 [−6.2, +14.6] | 8.46¢ |
| GPT-6 Luna | 41/48 | 43/48 | −4.2 [−16.7, +8.3] | 0.19¢ |
| Claude Haiku 5.5 | 39/47 | 42/47 | −6.4 [−19.1, +6.4] | 0.47¢ |

For about $10, that gives a decision: DeepSeek V4 Pro is better and cheaper, and it is the only swap whose interval clears zero. The other three are too close to call on 48 cases, which is itself the useful answer: before switching to a model that is 20x cheaper, replay more cases.

## Caveats

- One run per case per model. Differences under about 3 points are inside the noise.
- The insurer's environment is a reconstruction from the published traces. We kept the 252 of 380 cases where a rule-based check re-derives the reference answer from that environment, so every scored case is answerable from data the copilot can see.
- The underwriter is simulated, and grading is done by two LLM judges with a third breaking ties. On Snorkel's own labeled traces, the judges agree with the human labels 87–90% of the time.
- Three of the judges (GPT-6 Luna, Claude Haiku 5.5, and GPT-6.1 Sol) are also among the models tested. Re-grading their answers with judges other than themselves moved their scores by less than 2 points, in both directions, so we see no sign of a model favoring its own answers.
- The first table uses one shared prompt for every model; the tuning section shows how much that matters. Tuning was one run per model, at most two rounds, with one optimizer and 84 learning cases; four models from the first table (GLM 5.3, DeepSeek V4.1 Flash, MiniMax-M3, Qwen3.8 27B) were not tuned.
- Prices are list prices. Open-weight models ran on one commercial inference provider; prices and latency vary across providers.

## What to take from this

If you run an underwriting copilot, or any agent whose output is a decision, four things carry over:

1. **Measure cost per correct decision, not cost per call.** Steps and errors move the number more than token prices do.
2. **Fix the harness before you switch models.** Tune the prompt on cases you then hold out, and compare models only under that prompt. Here one good prompt did as much for every model as tuning each one separately.
3. **Read results per question type.** The model that wins overall can lose on the questions your team actually asks.
4. **Screen cheaply, then decide with full runs.** Step-level replays are good at ruling out models that clearly fail, but they rank a cheap model that reaches the right answer by another route too low to trust as a cut-off. Only end-to-end replays, graded on outcomes, tell you which one to ship.

If you want to run this against your own agent, [Kitaru](/product/kitaru) records your agent's runs, screens candidate models on them, and replays the finalists end to end with your evaluators.
