---
title: "AI Agent Optimization: Using Claude to Systematically Improve Memory Extraction Quality"
slug: "ai-agent-optimization-using-claude-to-systematically-improve-memory-extraction-quality"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "few-shot"
  - "system-prompts"
  - "langchain"
  - "pytorch"
  - "open-source"
  - "fastapi"
  - "anthropic"
  - "memory"
industryTags: "tech"
company: "Lerim"
summary: "Lerim, an open-source memory system for coding agents, faced challenges with memory extraction quality and accuracy. The solution involved using Claude Code (Opus 4.6) in an AutoResearch pattern to systematically optimize Lerim's prompts, DSPy signatures, tool descriptions, and schema definitions through automated experiments with comprehensive evaluation harnesses. Over two optimization rounds comprising 24 experiments, the system achieved a 41% improvement in composite quality score, with the single biggest win coming from a one-line code change (switching from dspy.Predict to dspy.ChainOfThought). The experiments revealed that schema-level changes outperformed prompt engineering, that positive guidance beats restrictive rules, and that component-level optimizations cascade into end-to-end improvements across the entire system."
link: "https://kargarisaac.medium.com/one-line-of-code-41-better-memory-when-one-ai-agent-optimizes-another-da2396bc501b"
year: 2026
seo:
  title: "Lerim: AI Agent Optimization: Using Claude to Systematically Improve Memory Extraction Quality - ZenML LLMOps Database"
  description: "Lerim, an open-source memory system for coding agents, faced challenges with memory extraction quality and accuracy. The solution involved using Claude Code (Opus 4.6) in an AutoResearch pattern to systematically optimize Lerim's prompts, DSPy signatures, tool descriptions, and schema definitions through automated experiments with comprehensive evaluation harnesses. Over two optimization rounds comprising 24 experiments, the system achieved a 41% improvement in composite quality score, with the single biggest win coming from a one-line code change (switching from dspy.Predict to dspy.ChainOfThought). The experiments revealed that schema-level changes outperformed prompt engineering, that positive guidance beats restrictive rules, and that component-level optimizations cascade into end-to-end improvements across the entire system."
  canonical: "https://www.zenml.io/llmops-database/ai-agent-optimization-using-claude-to-systematically-improve-memory-extraction-quality"
  ogTitle: "Lerim: AI Agent Optimization: Using Claude to Systematically Improve Memory Extraction Quality - ZenML LLMOps Database"
  ogDescription: "Lerim, an open-source memory system for coding agents, faced challenges with memory extraction quality and accuracy. The solution involved using Claude Code (Opus 4.6) in an AutoResearch pattern to systematically optimize Lerim's prompts, DSPy signatures, tool descriptions, and schema definitions through automated experiments with comprehensive evaluation harnesses. Over two optimization rounds comprising 24 experiments, the system achieved a 41% improvement in composite quality score, with the single biggest win coming from a one-line code change (switching from dspy.Predict to dspy.ChainOfThought). The experiments revealed that schema-level changes outperformed prompt engineering, that positive guidance beats restrictive rules, and that component-level optimizations cascade into end-to-end improvements across the entire system."
notion:
  pageId: "33ef8dff-2538-80b5-9c02-df3152e2ad33"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-10T07:07:00.000Z"
  lastEditedTime: "2026-04-10T07:07:00.000Z"
  publishedAt: "2026-04-14T08:51:01Z"
---

## Overview

This case study documents a sophisticated meta-optimization experiment where one AI agent (Claude Code with Opus 4.6) systematically optimized another AI agent system (Lerim's memory extraction pipeline running on MiniMax M2.5). The experiment, conducted in March-April 2026, demonstrates advanced LLMOps practices including automated evaluation harnesses, multi-dimensional quality metrics, systematic experimentation with keep/revert discipline, and the surprising effectiveness of cross-model optimization.

Lerim is an open-source system designed to solve a fundamental problem in coding agent workflows: session memory persistence. Coding agents like Claude and Cursor forget architectural decisions, debugging workarounds, and learned patterns between sessions. Lerim watches coding sessions, extracts actionable memories (decisions and learnings), and makes those memories available across all future sessions with any agent. Under the hood, it operates as an agentic system with multiple tools managing memory extraction, deduplication, search, and maintenance in the background.

The challenge the developer faced was uncertainty about the quality of memory extraction and deduplication accuracy. While the system functioned, there was no systematic understanding of where improvements could be made or what changes would actually move quality metrics. This led to the core experiment: could an AI agent autonomously improve another AI agent's performance through systematic optimization?

## Technical Architecture and Optimization Surface

Lerim's architecture presented multiple optimization surfaces across several layers. The extraction pipeline used DSPy signatures with docstrings that instructed the extraction LLM. System prompts guided the overall agent behavior. Tool descriptions influenced which tools the agent selected during operation. Pydantic schema field descriptions shaped the output format and structure. Post-extraction filters gated quality by rejecting candidates that didn't meet certain thresholds.

The evaluation framework operated at two distinct levels. Component-level evaluation tested each dimension independently against golden test cases, running in approximately 15 minutes per experiment. This fast feedback loop enabled the optimization process. End-to-end lifecycle evaluation ran sequential syncs of three sessions followed by a maintenance cycle, testing how memories accumulated over time, how deduplication worked across sessions, and whether maintenance decisions actually improved the memory store. This slower evaluation (approximately 7 minutes) validated that component-level gains translated to real-world improvements.

The composite evaluation metric combined multiple dimensions. Extraction quality measured whether each extracted memory was atomic and actionable. Search relevance evaluated whether the right memories surfaced for given queries. Deduplication accuracy assessed whether the system correctly identified duplicate memories versus genuinely new information. Maintain precision measured whether the maintenance cycle correctly preserved valuable memories while removing obsolete ones. The composite score weighted these dimensions to produce a single optimization target.

## The AutoResearch Pattern: Agent Optimizing Agent

The optimization approach adapted Andrej Karpathy's AutoResearch pattern, but instead of an AI agent optimizing a training script, this implementation had Claude Code optimizing Lerim's agents, prompts, and tools. The setup followed a three-component pattern that maintained clear separation of concerns and prevented the optimizer from gaming the evaluation.

The first component was program.md, which contained human-written directives specifying which files Claude Code could modify, what the evaluation metric measured, and what constraints to follow. A critical constraint was "don't overfit to the golden cases" - the optimizer needed to find generalizable improvements, not just memorize test cases.

The second component was the modifiable code itself: Lerim's prompts, tool descriptions, DSPy signatures, schema definitions, and the entire evaluation harness. Claude Code had full edit access to these components and could experiment freely.

The third component was the immutable evaluator, which Claude Code could not modify. This evaluator ran Lerim's full pipeline against 15 golden test cases (later expanded to 327 cases in Round 2) and produced the composite quality score. The immutability was critical - it prevented the optimizer from simply rewriting the evaluation to make its changes look better.

Each optimization loop ran approximately 30 minutes. Claude Code would modify a prompt or signature, the evaluator would run Lerim's full pipeline against the golden cases, scores would be computed, and Claude Code would decide whether the change improved the system. The keep/revert discipline was essential: changes that improved the score were kept, changes that hurt or showed no improvement were immediately reverted. This prevented the accumulation of noise and ensured the codebase only improved.

Notably, this represents cross-model optimization: Claude Opus 4.6 optimizing a system running on MiniMax M2.5. The optimizer and the optimized are different models from different companies, which means improvements represent genuine capability gains rather than self-reinforcing biases that might emerge from a model optimizing itself.

## Round 1: Component-Level Optimization Results

Round 1 consisted of 14 experiments run over 4.5 hours. Seven experiments were kept and seven were discarded. The composite quality score improved from baseline to a final score representing a 41% overall improvement. Different dimensions showed varying levels of improvement.

Extraction quality improved modestly, indicating the base extraction was already reasonably good. Search relevance showed moderate improvement. The most dramatic improvement came in deduplication accuracy, which jumped from 0.28 to 0.72. Before optimization, the agent classified most candidates as "add" even when nearly identical memories already existed in the store. After optimization, the system correctly identified duplicates and appropriately updated existing memories instead of creating redundant entries. Maintain precision remained relatively stable, starting high and maintaining that level.

However, the deduplication accuracy metric showed high volatility across experiments, sometimes swinging between 0.17 and 0.72 even with identical code. This variance stemmed from LLM non-determinism in the classification step. The optimization didn't eliminate variance but shifted the entire distribution upward so even "bad" runs performed better than the old baseline.

## The Most Impactful Change: One Line of Code

The single biggest win came from Experiment 010, which changed one line: `dspy.Predict(MemoryExtractSignature)` became `dspy.ChainOfThought(MemoryExtractSignature)`. This single import swap gave the extraction LLM a reasoning scratchpad before producing structured output. The result was better-quality candidates with more consistent titles and richer bodies. This single change accounted for nearly half the total improvement across all metrics.

What makes this particularly remarkable is that Claude Code discovered this independently. It read the DSPy extraction pipeline code, noticed it was using bare `Predict`, hypothesized that `ChainOfThought` would improve reasoning quality for a complex extraction task, made the change, and confirmed the improvement through evaluation. This demonstrates the AI agent genuinely understanding the design tradeoff rather than randomly trying changes.

## Key Lessons from Successful Experiments

Several patterns emerged from the successful experiments that have broader implications for LLMOps practice. Schema field descriptions consistently outperformed prompt-level changes in impact. The `MemoryCandidate` Pydantic model's `title` field initially had a minimal four-word description: "Short memory title." Claude Code changed this to describe the expected format explicitly: start with a verb or noun phrase, maximum 10 words, self-contained. The LLM immediately began producing more consistent, descriptive titles. This improvement cascaded into better deduplication accuracy because title matching improved. The lesson here is that the 20 words controlling output format in the schema had more impact than 50 lines of prompt engineering. The LLM's output specification matters more than its instruction.

Explicit thresholds consistently beat vague language. The original sync prompt used language like "top_similarity very high" for no_op classification. Claude Code replaced this with concrete numerical thresholds: 0.7 for no_op classification, 0.4 for the update/add boundary. Classification consistency improved immediately. LLMs handle concrete criteria better than interpreting subjective descriptors.

Component-level changes cascade through the entire system in non-obvious ways. The ChainOfThought change for extraction improved extraction quality directly, which produced better candidates, which made deduplication easier to perform accurately, which improved deduplication accuracy. A single upstream change rippled through multiple downstream metrics. Understanding these second-order effects is precisely why comprehensive evaluation harnesses are essential in LLMOps.

## Failed Experiments and Negative Results

Half the experiments failed, and these failures provided valuable lessons. ChainOfThought applied to summarization actually hurt performance. While it worked brilliantly for extraction, applying the same technique to summarization disrupted the existing cascade. Tool description changes affected multiple flows unpredictably - changing a tool description to optimize one use case degraded performance in other contexts where that tool was used.

Restrictive extraction rules consistently backfired. Attempts to add "don't extract X" rules or skip lists reduced recall without improving precision. The LLM became overly cautious and started missing real decisions. This pattern repeated across experiments: negative guidance ("don't do X") performed worse than positive guidance ("good examples look like Y").

Body format guidance changes modified output enough to break fuzzy matching logic elsewhere in the system. This highlights the brittleness that can emerge in agentic systems - changes that seem local can have global effects through subtle format shifts.

The experiment log of failed changes proved as valuable as the kept changes. Each failure narrowed the search space. "Don't change tool descriptions in isolation" became knowledge that prevented future mistakes and wasted experiments.

## End-to-End Validation

After component-level optimization, running the full lifecycle evaluation on both original and optimized code verified that gains held up end-to-end. Extraction quality improved, search relevance improved, and deduplication accuracy improved - all consistent with component-level measurements.

The biggest surprise came from maintenance quality, which improved by 29% even though the maintenance prompt itself was never directly optimized. This demonstrates cascade effects at the system level: better extraction quality from ChainOfThought produced higher-quality memories, which the maintain judge scored more favorably. Component-level optimization in one part of the pipeline cascaded into end-to-end improvement in a completely different part of the system that was never directly touched.

## Round 2: Optimizing for the Right Thing

After achieving 41% improvement and seven successful experiments, the developer compared Lerim's actual output to Claude Code's native `~/.claude/` memory files and discovered a quality gap. Claude Code's memory store contained 15 curated files, each atomic, actionable, and context-independent - things like "user prefers tabs," "always explain before coding," "never drop Codex support." Every memory would meaningfully change how an agent behaves in future sessions.

Lerim, despite its improved scores, had 50+ active memories. Many were research dumps ("7 trace format investigation notes"), code-derivable facts ("the CTE uses ROW_NUMBER() OVER PARTITION BY repo_path"), or implementation details just describing what the code does. The system scored well on evaluation but produced memories of limited practical value.

The realization was that the evaluation was measuring the wrong thing. The metrics rewarded recall (did you find everything?) but didn't adequately penalize over-extraction (did you extract garbage?). A system that extracts everything scores well on completeness but produces memories no agent would actually use.

## Round 2: Evaluation Recalibration

The developer recalibrated the evaluation framework substantially. A new quality_alignment dimension was added to the judge, specifically measuring whether each memory was atomic, actionable, context-independent, and structured with WHY + HOW TO APPLY sections. The composite score reweighting made precision (25%) and quality_alignment (25%) account for half the total score, while completeness dropped to just 15%.

A much larger golden dataset was built: 327 cases across 20 categories. This included 70 negative cases where the correct answer is zero memories (sessions with no extractable decisions), and 50 mixed cases with 1-2 real decisions buried in implementation noise. This tests the system's ability to discriminate signal from noise, not just extract everything it sees.

A tiered evaluation strategy emerged: 30-case fast evaluation (~15 minutes) for each experiment's quick feedback, with full 327-case evaluation (~4 hours) run at checkpoints to catch overfitting. This balanced optimization speed with generalization validation.

## Round 2: Results and Lessons

Round 2 ran 10 experiments with 3 kept and 7 discarded. Extraction quality improved from 0.819 to 0.847, a 3.4% gain. The improvements were smaller than Round 1 but targeted at what actually matters: the quality of extracted memories rather than just the quantity.

The successful changes included adding quality criteria directly into the extraction signature. A "QUALITY BAR" section in the DSPy signature - specifying atomic, actionable, context-independent, structured, durable - gave the extraction LLM a clear standard to evaluate against. This is positive guidance: "here's what good looks like."

Body structure specification helped: changing the schema's body field description from "Include WHY, alternatives, context" to "Lead with rule/fact, then WHY, then HOW TO APPLY" produced more structured, actionable memory bodies. This reinforces the Round 1 lesson that the LLM's output specification matters more than its instruction. Adding one good positive example with the WHY/HOW TO APPLY structure reinforced the pattern without causing regression.

## The Universal Failure Pattern: Restrictive Rules

Across five separate experiments spanning both rounds, restrictive rules consistently backfired. Every attempt to add "avoid extracting" lists, "skip if" conditions, "don't extract code snippets," negative examples, or "exclude X" rules resulted in regression. The pattern is unambiguous and has clear implications for LLMOps practice.

The lesson crystallized: tell the LLM what good looks like, never tell it what to avoid. Negative examples, skip lists, and "don't do X" directives reduce recall without improving precision. The LLM becomes cautious and starts missing real decisions. Positive guidance consistently outperforms negative constraints.

One particularly instructive failure: softening the "default to no_op when uncertain" rule to "only no_op when same specific facts" crashed maintain performance from 1.000 to 0.667. This was the first time maintain quality ever regressed. The conservative deduplication default prevents memory store flooding. Weakening it proved catastrophic. This highlights that some defaults serve as critical guardrails even if they seem overly conservative.

Sync agent changes proved dangerous. Modifying dedup classification language in the sync agent's signature affected extraction quality even though the change targeted deduplication. The sync agent controls the entire flow - touching it has unpredictable second-order effects across the system.

## The AutoResearch Skill: Generalizing the Pattern

After two rounds, the developer packaged the entire optimization pattern into a reusable Claude Code skill. Running `/autoresearch 100` starts the optimization loop autonomously - the agent reads program.md for the objective, iterates through hypothesize-edit-eval-keep/revert cycles, and logs everything.

The key architectural insight is separating the method from the objective. The skill encodes the AutoResearch pattern (how to optimize) while program.md encodes the objective (what to optimize). Changing the objective while running the same skill enables different optimization targets. Round 1 optimized for pipeline quality. Round 2 optimized for extraction precision. Same skill, different program.md, different results.

## Diminishing Returns and Optimization Ceilings

Round 1 achieved 41% improvement by finding low-hanging fruit - the extraction pipeline was using a basic `Predict` call instead of `ChainOfThought`. Round 2 squeezed out 3.4% gains by teaching the LLM what quality looks like through better specifications. The diminishing returns suggest the prompt and configuration are approaching their ceiling for MiniMax M2.5.

This has important implications for LLMOps: there's a limit to how much optimization can improve a given model's performance on a given task. At some point, further improvement requires either better models, architectural changes, or fundamentally different approaches rather than continued prompt tuning.

## Post-Experiment Refactoring

A week after writing the initial report, the developer rebuilt substantial portions of the system. The experiment's numbers remained valid and the lessons held, but writing the detailed case study forced a comparison between Lerim's extracted memories and Claude Code's native memory store. Even after 41% improvement, the output still didn't match the quality of memories the developer actually wanted in sessions. The experiment had taught how to optimize but hadn't captured what good truly looked like at a level the judge could reliably measure.

The judge was completely rebuilt as a DSPy-native, two-layer metric. The original composite score weighted extraction/search/dedup/maintain against golden cases. The new metric became simpler and more honest: a deterministic layer (25%) checks structure, format, and content heuristics, while an LLM judge layer (75%) scores quality (split into worth_keeping, type_correct, well_structured), recall, and precision.

The memory architecture moved to version 2: flat directory with a four-type schema. The original decisions/learnings split was eliminated. Memories now live in a flat directory with frontmatter type fields of user, feedback, project, or reference. The split had been an artifact of early thinking about "what kinds of things coding agents should remember" rather than a distinction the extractor could reliably make. Collapsing it simplified deduplication, eliminated a class of misclassifications, and let the judge focus on content quality instead of directory placement.

The extraction and summarization pipelines were deleted as separate components. Both are now handled by the agent itself via its tools rather than separate pipeline stages. The developer is working on more careful agent and tool design with plans for another round of experiments.

## Broader LLMOps Implications

This case study demonstrates several advanced LLMOps practices with broader applicability. Cross-model optimization works: one model can effectively optimize another model's performance through systematic experimentation. The fact that Claude Opus 4.6 could improve a MiniMax M2.5-based system suggests this approach generalizes across model families.

The 50% failure rate in experiments is normal and valuable. Each failure narrowed the search space and prevented future mistakes. In production LLMOps, failed experiments should be logged and analyzed as carefully as successful ones.

Evaluation harnesses are essential for complex agentic systems. Without comprehensive multi-dimensional evaluation, it's impossible to understand second-order effects where changes in one component cascade through the entire system. Component-level and end-to-end evaluation serve different purposes and both are necessary.

The hierarchy of impact for LLM configuration appears to be: architectural changes (ChainOfThought vs Predict) > schema specifications > concrete thresholds > prompt engineering > negative constraints. This suggests where LLMOps teams should focus optimization effort.

The developer's willingness to rebuild the system after discovering evaluation misalignment demonstrates important LLMOps maturity: optimizing for the wrong metric produces systems that score well but fail in practice. Getting the evaluation right matters more than optimization speed.

This case study represents sophisticated meta-level LLMOps: using AI agents to improve AI agents through systematic experimentation, comprehensive evaluation, and disciplined iteration. The approach, tooling, and lessons learned provide a template for optimizing other agentic systems in production.
