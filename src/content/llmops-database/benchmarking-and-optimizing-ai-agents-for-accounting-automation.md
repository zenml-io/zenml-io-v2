---
title: "Benchmarking and Optimizing AI Agents for Accounting Automation"
slug: "benchmarking-and-optimizing-ai-agents-for-accounting-automation"
draft: false
llmopsTags:
  - "poc"
  - "agent-based"
  - "prompt-engineering"
  - "memory"
  - "harness-engineering"
  - "latency-optimization"
  - "evals"
  - "openai"
  - "anthropic"
  - "google-gcp"
industryTags: "finance"
company: "Ramp"
summary: "Ramp developed Stack, an AI-native suite of tools for automating accounting book-closing workflows, with an AI agent at its core that can handle complex tasks through chat or scheduled automation. To accelerate agent development and avoid overfitting to individual design partners, Ramp created a comprehensive accounting benchmark with 237 tasks across 8 synthetic business worlds covering diverse accounting complexities. Using this benchmark, they optimized their agent through skill ablation (removing unhelpful capabilities), context reduction (shrinking prompts by 64%), and memory system refinement, achieving a 4% improvement in task accuracy over frontier models like GPT 5.5 and Anthropic Opus 4.7, while maintaining competitive latency and delivering the highest Pass@1 rate on real accounting tasks."
link: "https://builders.ramp.com/post/stack-benchmarking"
year: 2026
seo:
  title: "Ramp: Benchmarking and Optimizing AI Agents for Accounting Automation - ZenML LLMOps Database"
  description: "Ramp developed Stack, an AI-native suite of tools for automating accounting book-closing workflows, with an AI agent at its core that can handle complex tasks through chat or scheduled automation. To accelerate agent development and avoid overfitting to individual design partners, Ramp created a comprehensive accounting benchmark with 237 tasks across 8 synthetic business worlds covering diverse accounting complexities. Using this benchmark, they optimized their agent through skill ablation (removing unhelpful capabilities), context reduction (shrinking prompts by 64%), and memory system refinement, achieving a 4% improvement in task accuracy over frontier models like GPT 5.5 and Anthropic Opus 4.7, while maintaining competitive latency and delivering the highest Pass@1 rate on real accounting tasks."
  canonical: "https://www.zenml.io/llmops-database/benchmarking-and-optimizing-ai-agents-for-accounting-automation"
  ogTitle: "Ramp: Benchmarking and Optimizing AI Agents for Accounting Automation - ZenML LLMOps Database"
  ogDescription: "Ramp developed Stack, an AI-native suite of tools for automating accounting book-closing workflows, with an AI agent at its core that can handle complex tasks through chat or scheduled automation. To accelerate agent development and avoid overfitting to individual design partners, Ramp created a comprehensive accounting benchmark with 237 tasks across 8 synthetic business worlds covering diverse accounting complexities. Using this benchmark, they optimized their agent through skill ablation (removing unhelpful capabilities), context reduction (shrinking prompts by 64%), and memory system refinement, achieving a 4% improvement in task accuracy over frontier models like GPT 5.5 and Anthropic Opus 4.7, while maintaining competitive latency and delivering the highest Pass@1 rate on real accounting tasks."
notion:
  pageId: "375f8dff-2538-805f-b0a5-c93200da8803"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-04T07:55:00.000Z"
  lastEditedTime: "2026-06-04T07:55:00.000Z"
  publishedAt: "2026-06-04T08:37:32Z"
---

## Overview

Ramp built Stack, an AI-native suite of accounting tools designed to automate the manual, time-intensive work associated with monthly book closing. At the heart of Stack is an optimized AI agent that accountants can interact with via chat or schedule for recurring tasks. This case study details Ramp's sophisticated approach to developing, benchmarking, and optimizing this production AI agent system, representing a mature example of LLMOps practices applied to domain-specific agentic workflows.

The problem Ramp set out to solve is deeply rooted in accounting operations: monthly book closing involves verifying transactions, reconciling accounts, investigating discrepancies, collecting documentation, preparing journal entries, and ensuring financial statement accuracy. Much of this work remains painfully manual, involving downloading reports from multiple systems, matching transactions individually, checking accruals, and explaining balance changes. Ramp's Stack aims to return time to accountants by automating these repetitive yet complex tasks through AI agents.

## The Challenge of Agent Development

Ramp faced a fundamental challenge in developing Stack: traditional product development approaches don't work well for agentic systems. Normally, early-stage product development relies on design partners who provide feedback as you iterate. However, for accounting agents, this approach has significant pitfalls. Accounting workflows vary dramatically across customers, making it easy to overfit the agent to a single design partner's specific environment. Additionally, the feedback loop is slow and imprecise—you change a prompt or tool, wait for users to encounter the same scenario again, and then try to infer whether the change helped. This makes systematic improvement difficult and risks building a product that works well for one customer but fails to generalize.

## Benchmark-Driven Development

To address these challenges, Ramp developed a comprehensive accounting benchmark that serves as the foundation for their agent development process. This benchmark functions analogously to offline datasets that machine learning engineers use for model training—it provides a static, reproducible snapshot of the world that enables rapid iteration and hill climbing before customer deployment. The benchmark allows Ramp to test the same agent against many business types and accounting tasks simultaneously, providing fast, comparable feedback when changing models, prompts, tools, skills, or memory systems. Even post-launch, the benchmark serves to catch regressions, identify improvement areas, and guide prioritization decisions.

The benchmark architecture consists of two primary components: **Worlds** and **Tasks**. A World represents a synthetic business with complete state, including the customer's accounting software (such as QuickBooks) and all files relevant to a book close. Tasks are specific accounting jobs to be completed within that world. For example, one representative task asks the agent to "Compare October 2024 to July 2024. Find the top 5 variances. Classify each as seasonal or unexpected, and explain the driver." To complete such a task, the agent might need to pull a profit and loss statement, inspect general ledger detail, read an inventory planning model, and compare outputs against an annual budget.

The benchmark includes eight distinct worlds spanning diverse accounting scenarios. These include a DTC eCommerce brand with multi-channel revenue and inventory COGS complexity, a B2B SaaS company with subscription revenue recognition and equity vesting, a mid-market logistics business with three-entity QuickBooks setup requiring intercompany reconciliation, a multi-location healthcare provider managing insurance accounts receivable across five payers, a construction company with percentage-of-completion revenue recognition, and a restaurant group with POS reconciliation across multiple locations. Across these eight worlds, the benchmark encompasses 237 tasks evaluated against 3,469 grading criteria written by real accountants.

A particularly sophisticated aspect of the benchmark is its inclusion of "roll-forward worlds"—synthetic businesses advanced to future time periods. These are used specifically to test whether the agent's memory system transfers process knowledge appropriately without contaminating future periods with stale data. This reflects a deep understanding that production accounting agents must handle recurring workflows where the process remains constant but the data changes each period.

Tasks in the benchmark fall into four categories representing the general sets of work done during book closes: reconciliation (tying two sources together and explaining discrepancies), data entry (posting transactions and journal entries), variance analysis (comparing actuals against budgets or prior periods), and schedules and accruals (building supporting schedules and calculating accruals). Each task is graded against multiple accountant-written criteria such as "identifies Total Revenue as a top-five variance" or "correctly classifies October marketing as unexpected." A task score is calculated as the fraction of grading criteria satisfied by the agent's response.

## Agent Architecture and Optimization

Stack combines several components: an agentic harness, tools, custom-built skills, and a memory system, all built on top of a foundation model (GPT 5.5 in the benchmarking analysis). Before creating the benchmark, Stack already had an initial system prompt, hand-written skills, and a memory system. The benchmark provided a rigorous way to decide what to keep, prune, or rewrite.

Through benchmarking, Ramp discovered two guiding principles: reduce unnecessary context bloat to improve model performance, and tune the harness against end-to-end task performance rather than narrow evaluations. These principles drove their optimization strategy.

### Skill Ablation and Optimization

One of the most important findings was that agent systems tend to accumulate too many skills, and those skills tend to become too long. Ramp treated this challenge like feature selection in machine learning. They removed all skills and ran separate benchmarks where the agent could load only one skill at a time, providing a marginal performance estimate for each skill. This ablation study revealed that not every skill helped—only two skills (anonymized as Skill A and Skill B) showed positive average impact, one was essentially neutral, and the rest were negative on average. Moreover, no single skill was uniformly best across all worlds, highlighting the importance of testing across diverse scenarios.

This empirical evidence allowed Ramp to prune their skill bundle rather than carrying every piece of context forward. When they combined the retained skills into a slim bundle, the aggregate effect was generally positive, showing a +2.3 percentage point improvement across the six standard worlds versus the no-skills baseline. However, the impact varied by world: the bundle helped meaningfully on some worlds (like world_4 and world_5), modestly on others (world_3), and was roughly flat or slightly negative on remaining worlds. This variation underscores why single-task or single-world testing would have produced misleading intuition.

Ramp also performed targeted skill optimization by shrinking their largest high-load skill—a custom spreadsheet skill for spreadsheet manipulation that loaded in many sessions at 14,000 characters. They discovered that roughly half of this content consisted of financial modeling guidance irrelevant to bookkeeping close work. By splitting the skill into two modules and moving specialized content to a separate, narrower module, they reduced the bookkeeping spreadsheet skill from 14,000 to 5,000 characters—a 64% reduction. In paired validation, the slim version performed comparably to the original (3.3 percentage points versus 3.7 percentage points improvement over baseline), while the full slim bundle reached 5.4 percentage points improvement. This demonstrates that shrinking context is not merely cleanup work but makes prompts easier to reason about while preserving essential behavior.

### Memory System Development

A critical component of the agentic experience is memory—users should not have to re-teach the agent the same company context every session. The challenge is determining which facts are safe to write down and reuse across periods. Ramp's first approach was overly optimistic: they gave a memory writer the prior task and correct answer, hoping the agent would infer the reusable playbook independently. This produced plausible summaries but did not reliably preserve the actual steps an accountant should take. The model could remember what happened but not always how to reproduce it.

Ramp evolved toward step-oriented memory. Instead of asking the writer to infer everything from task and answer alone, they used task trajectories and step-by-step guides to extract transferable elements: source-file mappings, schedule structures, general ledger account names, calculation methods, and validation checks. The memo is then injected into related future-period tasks, and the benchmark measures whether that handoff helps or hurts performance.

On roll-forward worlds, memory improved mean score from 56.0% to 61.5%, a significant 5.5 percentage point gain. The most successful memory strategies captured reusable processes without overfitting to old periods. One clean example involved a workers' compensation audit estimate task where the agent scored 0% without memory but 100% with memory. The memory captured the complete workflow: which general ledger accounts matter, which policy fields drive calculations, how to shape the estimate, and the final accounting treatment—a genuinely reusable workflow rather than just a previous answer.

However, memory could also hurt performance when it smuggled in the old task's fact pattern. In one Apex January AIA billing task, the no-memory agent scored 75% while the memory-enabled agent fell to 25%. The memory contained overly specific instructions tied to a prior change order that pushed the agent toward an obsolete reclassification recipe when the current period required different treatment. This failure mode led Ramp to refine their memory strategy: the goal is not "always write more memory" but to write memories that generalize by capturing stable account mappings, source-file conventions, workflow patterns, and explicit steps, while filtering out period-specific amounts, customer lists, file names, old contract terms, and one-off recipes.

## Model Comparison and Performance

Ramp conducted extensive benchmarking comparing Ramp Stack (GPT 5.5 with their skills and memory system) against frontier models running in a no-skill, no-memory harness. This approach isolates the performance impact of their skill and memory optimizations. They measured four key metrics: Pass@1 (single attempt fully satisfies all criteria), Pass@5 (at least one of five attempts succeeds), Pass^5 (all five attempts succeed, measuring consistency), and mean criteria accuracy (average fraction of grading criteria satisfied).

Ramp Stack achieved the highest performance across all agents, with 4% higher accuracy and 3% better Pass@1 compared to raw frontier models. Among frontier models without skills or memory, GPT 5.5 and Anthropic's Opus 4.6 and 4.7 performed fairly evenly with minor differences. Gemini models lagged significantly behind, with Gemini 3.5 Flash performing substantially worse than Gemini 3.1 Pro. One notable finding was the large performance gap between GPT 5.4 and GPT 5.5—nearly 19 percentage points in accuracy—suggesting a substantial capability jump between generations. In contrast, Opus 4.6 and 4.7 showed little to no difference on this benchmark.

Breaking down performance by task category revealed important patterns. Schedules and accruals proved materially harder than variance analysis for raw models, while reconciliation was relatively strong for the best models. Ramp Stack improved every category, with the largest absolute lifts on variance analysis and reconciliation. Ramp hypothesizes that reconciliation maps more naturally to general comparison tasks (compare systems, identify deltas, explain them), while schedules and accruals are more accounting-specific, procedural, and require longer-horizon context.

## Latency and Production Tradeoffs

Performance is only one dimension that matters for production agents—users also care deeply about latency. Ramp analyzed the tradeoff between accuracy and runtime, measuring runtime per task from trajectory timestamps to capture the end-to-end experience including model calls, tool use, file processing, and waiting during execution. Tasks proved fairly complex: the fastest model (GPT 5.4) took approximately 4 minutes per task, while the slowest (Gemini 3.5 Flash) exceeded 20 minutes per task.

Ramp Stack sits on the Pareto frontier with GPT 5.4, meaning it represents an optimal tradeoff point where improved performance can only be achieved by sacrificing speed. If speed is paramount and users are willing to trade performance, GPT 5.4 offers the fastest option. The remaining models (Opus 4.6, Opus 4.7, GPT 5.5, and Gemini 3.1 Pro) all require roughly 10 minutes per task while delivering lower performance than Ramp Stack. This positioning demonstrates that Ramp's optimizations not only improved accuracy but maintained competitive latency, a critical consideration for production deployment.

## Critical Assessment and Broader Implications

While Ramp's benchmark represents sophisticated LLMOps practice, several caveats warrant consideration. The benchmark uses synthetic businesses and accountant-written grading criteria, which may not fully capture the messiness and edge cases of real-world accounting data. The article doesn't discuss how well benchmark performance correlates with actual customer satisfaction or task completion rates in production. Additionally, as a company blog post, the article naturally emphasizes positive results while potentially underreporting challenges, failed approaches, or ongoing limitations.

The memory system results are particularly interesting but also reveal fragility. The 5.5 percentage point improvement on roll-forward worlds is meaningful, but the case where memory caused performance to drop from 75% to 25% highlights that memory systems can be brittle and context-dependent. The filtering strategy for what should be remembered versus forgotten remains somewhat heuristic rather than systematic.

The model comparison findings should be interpreted cautiously given that this represents a single domain (accounting) with specific task types. GPT 5.5's 19 percentage point improvement over GPT 5.4 is striking, but this may reflect accounting-specific reasoning improvements rather than general capability gains. Similarly, the relatively even performance between Opus models might not hold in other domains.

That said, Ramp's approach represents mature LLMOps thinking. The benchmark-driven development loop, systematic ablation studies, empirical skill optimization, and careful attention to latency-performance tradeoffs demonstrate engineering discipline often missing from agent development. The creation of roll-forward worlds specifically to test memory transfer shows sophisticated understanding of production requirements. The willingness to prune unhelpful skills rather than accumulating capabilities reflects data-driven decision-making.

The broader lesson Ramp emphasizes is that agent development needs the same discipline as machine learning development: a dataset hard enough to be meaningful, stable enough to compare runs, and detailed enough to explain why changes work. Once established, the benchmark transforms from a scoreboard into a product development engine, enabling rapid iteration and systematic improvement before customer exposure. This represents a significant maturation of LLMOps practices beyond ad-hoc testing and vibes-based development decisions, providing a replicable model for other teams building production agent systems.
