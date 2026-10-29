---
title: "There Is No Best Model for Your Agent, Only the Best Version of Your Agent"
slug: "there-is-no-best-model-for-your-agent"
draft: true
author: "hamza-tahir"
category: "kitaru"
tags:
  - "kitaru"
  - "agents"
  - "evaluation"
  - "llm"
date: "2026-10-21T15:20:00.000Z"
readingTime: "10 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/there-is-no-best-model-for-your-agent/a6d47a0d/there-is-no-best-model-for-your-agent-cover.avif"
  alt: "Kitaru blog cover for There Is No Best Model for Your Agent"
seo:
  title: "There Is No Best Model for Your Agent - ZenML Blog"
  description: "We ranked 12 models on the same agent three ways and got three different answers. Which model is best depends on the prompt and settings around it, so test the whole change on your own cases before you ship it."
  canonical: "https://www.zenml.io/blog/there-is-no-best-model-for-your-agent"
  ogImage: "https://assets.zenml.io/content/blog/there-is-no-best-model-for-your-agent/3e4502eb/there-is-no-best-model-for-your-agent-cover.jpg"
---

Every team running an agent eventually asks the same question: which model should it use? A new release tops a leaderboard, a vendor cuts prices, someone posts that they switched and saved 80%. The question sounds like it has an answer.

We tried to find it for one agent, and got three different answers depending on how we asked. Under the prompt we wrote first, the leaderboard looked clear. After one prompt rewrite, eight of twelve models tied, and the cheapest of them cost a thirteenth as much per correct decision as the most expensive. And the replay that told us which model to switch to gave the opposite advice once the prompt was fixed.

A model's score in your agent isn't a property of the model. It's a property of the model plus the prompt, the reasoning effort, the tools, and the conversation design around it. Change one and the ranking moves. So the useful question is not "which model?" but "which version of my agent?", and the only way to answer it is to test the change on your own cases before you ship it.

## The agent we tested

We used Snorkel AI's public [multi-turn insurance underwriting datasets](https://huggingface.co/datasets/snorkelai/Multi-Turn-Insurance-Underwriting) (Apache-2.0): 252 cases where an underwriter asks an agent about a small business applying for a policy. Is it in appetite for this line? Which other lines should we offer? Does it qualify as a small business? What limits and deductibles apply? Which NAICS code fits?

The agent has six tools to interact with the insurer's database and guidelines and talks to a simulated underwriter who knows the application but not the answer. Every case has a known right answer, the way a team's own production cases would once have been reviewed. We counted what matters for a decision-making agent: correct decisions, and what each one costs.

## Answer one: the leaderboard

The first test is the one most teams run: every model on the same prompt, written once.

| Model | Correct | Cost per correct decision |
|---|---|---|
| DeepSeek V4 Pro (open) | 97.6% | 3.55¢ |
| Claude Opus 5.5 | 97.2% | 5.26¢ |
| GLM 5.3 (open) | 94.8% | 8.25¢ |
| GLM 5.3 Flash (open) | 92.5% | 0.97¢ |
| DeepSeek V4.1 Flash (open) | 91.3% | 2.10¢ |
| Claude Sonnet 5.5 | 88.9% | 4.06¢ |
| Claude Haiku 5.5 | 87.3% | 0.50¢ |
| GPT-6 Luna | 86.9% | 0.19¢ |
| MiniMax-M3 (open) | 86.5% | 1.75¢ |
| Qwen3.8 27B (open) | 84.1% | 3.71¢ |
| GPT-6.1 Sol | 83.7% | 2.01¢ |
| gpt-oss-120b (open) | 59.5% | 0.99¢ |

This reads like a verdict. Opus and DeepSeek V4 Pro at the top, Sonnet and Haiku clearly behind, a 40x spread in cost per correct decision. A team running Sonnet would switch.

But the failures behind the lower scores were mostly not about the task. GPT-6.1 Sol often put its final answer on a question back to the underwriter ("FINAL ANSWER: could you share the NAICS code?"). Sonnet and others recommended products before asking which line the application was for. These are failures of how each model fit our prompt and our conversation loop, and they are fixable without changing the model.

## Answer two: the same models, one better prompt

We split the cases into 84 for learning and 168 held out. A strong model read Sonnet's failures on the learning cases and rewrote the system prompt with general instructions: ask before recommending, commit to one answer, never end on a question. Rewrites that copied case facts were rejected. Then we ran that one prompt, unchanged, on every model, and scored the held-out cases the rewrite never saw.

| Model | First prompt | Rewritten prompt | Cost per correct decision |
|---|---|---|---|
| GLM 5.3 Flash (open) | 91.7% | 99.4% | 0.92¢ |
| Claude Sonnet 5.5 | 89.3% | 99.4% | 2.73¢ |
| Claude Haiku 5.5 | 85.7% | 98.8% | 0.38¢ |
| DeepSeek V4 Pro (open) | 97.0% | 98.8% | 3.27¢ |
| GPT-6.1 Sol | 82.1% | 98.2% | 1.78¢ |
| DeepSeek V4.1 Flash (open) | 91.7% | 98.2% | 1.81¢ |
| GLM 5.3 (open) | 94.6% | 98.2% | 7.37¢ |
| Claude Opus 5.5 | 97.0% | 97.6% | 5.12¢ |
| MiniMax-M3 (open) | 84.5% | 96.4% | 1.82¢ |
| GPT-6 Luna | 83.9% | 90.5% | 0.19¢ |
| gpt-oss-120b (open) | 56.0% | 86.9% | 1.15¢ |
| Qwen3.8 27B (open) | 83.3% | 82.7% | 5.33¢ |

Held-out cases only. Running the unchanged Sonnet agent twice moved its score 2.4 points, so differences of a few points are ties.

<figure>
<div class="not-prose my-6" role="img" aria-label="Held-out accuracy per model, first prompt to the one rewritten prompt: GLM 5.3 Flash 91.7% to 99.4%; Claude Sonnet 5.5 89.3% to 99.4%; Claude Haiku 5.5 85.7% to 98.8%; DeepSeek V4 Pro 97.0% to 98.8%; GPT-6.1 Sol 82.1% to 98.2%; DeepSeek V4.1 Flash 91.7% to 98.2%; GLM 5.3 94.6% to 98.2%; Claude Opus 5.5 97.0% to 97.6%; MiniMax-M3 84.5% to 96.4%; GPT-6 Luna 83.9% to 90.5%; gpt-oss-120b 56.0% to 86.9%; Qwen3.8 27B 83.3% to 82.7%.">
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>GLM 5.3 Flash</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 91.7%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 99.4%"></span></span></span><span class="tabular-nums">91.7% → 99.4%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>Claude Sonnet 5.5</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 89.3%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 99.4%"></span></span></span><span class="tabular-nums">89.3% → 99.4%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>Claude Haiku 5.5</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 85.7%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 98.8%"></span></span></span><span class="tabular-nums">85.7% → 98.8%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>DeepSeek V4 Pro</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 97.0%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 98.8%"></span></span></span><span class="tabular-nums">97.0% → 98.8%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>GPT-6.1 Sol</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 82.1%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 98.2%"></span></span></span><span class="tabular-nums">82.1% → 98.2%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>DeepSeek V4.1 Flash</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 91.7%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 98.2%"></span></span></span><span class="tabular-nums">91.7% → 98.2%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>GLM 5.3</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 94.6%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 98.2%"></span></span></span><span class="tabular-nums">94.6% → 98.2%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>Claude Opus 5.5</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 97.0%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 97.6%"></span></span></span><span class="tabular-nums">97.0% → 97.6%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>MiniMax-M3</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 84.5%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 96.4%"></span></span></span><span class="tabular-nums">84.5% → 96.4%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>GPT-6 Luna</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 83.9%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 90.5%"></span></span></span><span class="tabular-nums">83.9% → 90.5%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>gpt-oss-120b</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 56.0%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 86.9%"></span></span></span><span class="tabular-nums">56.0% → 86.9%</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>Qwen3.8 27B</span><span class="grid gap-[3px]"><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-400)" style="width: 83.3%"></span></span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-[7px] rounded-full bg-(--color-sage-700)" style="width: 82.7%"></span></span></span><span class="tabular-nums">83.3% → 82.7%</span></div>
</div>
<figcaption>Held-out accuracy on 168 cases. Light bar: the first prompt. Dark bar: the one rewritten prompt, unchanged across models. Sorted by the rewritten prompt.</figcaption>
</figure>

The leaderboard collapsed. Eight models now sit between 97.6% and 99.4%, within noise of each other, with MiniMax-M3 close behind at 96.4%. The models at the bottom of the first table weren't weaker; they needed different instructions. With accuracy a near tie, the choice became cost: Claude Haiku 5.5 got 98.8% at 0.38¢ per correct decision, about a thirteenth of Opus's cost. Three models stayed well behind, GPT-6 Luna, gpt-oss-120b and Qwen3.8 27B, and those are real gaps.

<figure>
<div class="not-prose my-6" role="img" aria-label="Cost per correct decision for the 8 models tied at the top under the rewritten prompt, lowest first: Claude Haiku 5.5 0.38¢ at 98.8%; GLM 5.3 Flash 0.92¢ at 99.4%; GPT-6.1 Sol 1.78¢ at 98.2%; DeepSeek V4.1 Flash 1.81¢ at 98.2%; Claude Sonnet 5.5 2.73¢ at 99.4%; DeepSeek V4 Pro 3.27¢ at 98.8%; Claude Opus 5.5 5.12¢ at 97.6%; GLM 5.3 7.37¢ at 98.2%.">
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>Claude Haiku 5.5</span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-2.5 rounded-full bg-(--color-sage-800)" style="width: 5.1%"></span></span><span class="tabular-nums">0.38¢</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>GLM 5.3 Flash</span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-2.5 rounded-full bg-(--color-sage-500)" style="width: 12.5%"></span></span><span class="tabular-nums">0.92¢</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>GPT-6.1 Sol</span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-2.5 rounded-full bg-(--color-sage-500)" style="width: 24.2%"></span></span><span class="tabular-nums">1.78¢</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>DeepSeek V4.1 Flash</span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-2.5 rounded-full bg-(--color-sage-500)" style="width: 24.5%"></span></span><span class="tabular-nums">1.81¢</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>Claude Sonnet 5.5</span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-2.5 rounded-full bg-(--color-sage-500)" style="width: 37.0%"></span></span><span class="tabular-nums">2.73¢</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>DeepSeek V4 Pro</span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-2.5 rounded-full bg-(--color-sage-500)" style="width: 44.3%"></span></span><span class="tabular-nums">3.27¢</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>Claude Opus 5.5</span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-2.5 rounded-full bg-(--color-sage-500)" style="width: 69.5%"></span></span><span class="tabular-nums">5.12¢</span></div>
<div class="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] items-center gap-3 py-1 font-sans text-[14px] leading-5 text-(--color-cream-900)"><span>GLM 5.3</span><span class="block rounded-full bg-(--color-sage-100)"><span class="block h-2.5 rounded-full bg-(--color-sage-500)" style="width: 100.0%"></span></span><span class="tabular-nums">7.37¢</span></div>
</div>
<figcaption>Cost per correct decision for the 8 models within run-to-run noise of the top score under the rewritten prompt (scores of 97.6 to 99.4 percent), lowest first. Lower is better.</figcaption>
</figure>

Notice what this did not show: that open models win, or that the most expensive model is worth it. The best version of this agent ran on a cheap closed model, and a different agent might land somewhere else entirely.

## Answer three: how to switch out models safely

Most teams don't run a benchmark. They have an agent in production and want to know whether a swap is safe. So we tested that path too, starting from the Sonnet agent with the first prompt.

With [Kitaru](/product/kitaru), we recorded 48 of its cases and replayed them end to end with four candidate models swapped in:

| Swap Sonnet 5.5 for… | Correct | Sonnet on the same cases | Difference (points, 95% CI) |
|---|---|---|---|
| DeepSeek V4 Pro | 47/48 | 43/48 | +8.3 [+2.1, +16.7] |
| GLM 5.3 | 45/48 | 43/48 | +4.2 [−6.2, +14.6] |
| GPT-6 Luna | 41/48 | 43/48 | −4.2 [−16.7, +8.3] |
| Claude Haiku 5.5 | 39/47 | 42/47 | −6.4 [−19.1, +6.4] |

The advice was clear: switch to DeepSeek V4 Pro, and don't touch Haiku. With the rewritten prompt, Sonnet reached 99.4% on its own and Haiku matched it at a seventh of the cost. Same agent, same cases, opposite advice, because the test changed the model and held everything else fixed.

## The other knobs behave the same way

Reasoning effort, the setting teams lower to save money, did something different on every model:

- Lowering Sonnet 5.5's effort to `low` cost it 17 points and saved about a sixth of the cost per correct decision.
- Raising GPT-6.1 Sol's effort gained it 9.5 points, less than the prompt rewrite's 16.
- Raising Claude Haiku 5.5's and GPT-6 Luna's effort changed nothing measurable and cost more.

The same knob helped one model, did nothing for two, and badly hurt another. So don't assume that a setting that works really well for one model will give you the same results or improvements for the next.

## What it takes to trust an answer

If the answer depends on the whole agent, you have to test the whole agent, and the test has to be good enough to tell a real change from a lucky run. Here that meant:

- **Your own cases, with known answers.** Including the hard ones and the failures, not just easy traffic.
- **Full runs, not single calls.** The failures that mattered, like ending on a question, only show up across a whole conversation. A cheap step-by-step comparison was useful for ruling out clear failures, but it ranked the cheapest good model near the bottom.
- **Cost per correct decision, not cost per call.** GLM 5.3 was the most expensive model here per correct decision, not because of its token price but because it took 11 calls and 46,000 tokens a case.
- **Results by question type.** A change that helps on average can break the questions your team asks most.
- **A measured noise floor.** The same agent run twice moved 2.4 points. Anything inside that is a tie.
- **Checked grading and held-out cases.** Our two LLM judges agree with Snorkel's human labels 87–90% of the time, re-grading the judges' own answers with other judges moved their scores under 2 points, prompts were scored on cases they were never tuned on, and a no-tools probe found no sign the models had memorized the public answers.

## Caveats

This is one agent in one domain, with one run per case, a simulated underwriter, LLM judges, and list prices; open-weight models ran on one commercial inference provider. We kept the 252 of 380 published cases whose answers a rule-based check could re-derive from the reconstructed environment. The shared prompt was rewritten for a Claude model and may favor Claude models slightly, though it lifted open-weight and OpenAI models by up to 31 points. The specific winners won't carry over to your agent. That's the point.

## Know what a change does before you ship it

Whatever you change next, a model, a prompt, an effort setting, a tool, test it as a change to your agent, on your own cases, before your users see it. Compare models under your best prompt, not your first one. Count cost per correct answer. Call anything within noise a tie.

That's what [Kitaru](/product/kitaru) is for. It turns your agent's traces into test cases, imported from Langfuse, LangSmith, Logfire, Braintrust, MLflow, or Phoenix, and replays them against any model, prompt, or setting, from any vendor or open model. It shows what got better, what broke, and what each correct answer costs. It's open source and runs on your own machine.

It works from Claude Code, Codex, and Cursor. Install the Kitaru skills and ask your coding agent something like:

```text
Import our last 300 production traces from Langfuse into Kitaru and find the failures and hard cases.
Then test three changes on them: a cheaper model, our current model with a rewritten system prompt,
and the cheaper model with that prompt. Report correct answers and cost per correct answer by task
type, and call anything within run-to-run noise a tie.
```

[Start free](https://cloud.zenml.io/signup?utm_source=zenml.io&utm_medium=blog&utm_campaign=signup&utm_content=there-is-no-best-model-for-your-agent)
