---
title: "Multi-Agent Contract Playbook Review"
slug: "multi-agent-contract-playbook-review"
draft: false
llmopsTags:
  - "document-processing"
  - "classification"
  - "high-stakes-application"
  - "unstructured-data"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "memory"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "cache"
industryTags: "legal"
company: "Harvey"
summary: "Harvey rebuilt its contract playbook review system from a fixed sequence of prompts into an orchestrator-worker multi-agent architecture. The new system gives parallel rule-specific agents access to searchable, versioned document branches, shared deal context, and editing tools, while a lead agent reconciles conflicting changes and validates the complete review. On Harvey’s in-house benchmark, risk-classification performance increased from 59% to 77% and redline quality from 53% to 87%, although average latency rose from 2.6 to 3.8 minutes. Timeouts, targeted retries, concurrency controls, prompt caching, streaming, state persistence, and task-specific model selection were used to make the higher-quality workflow viable in production, but the reported results are vendor-generated and rely partly on LLM-judge scoring rather than an independently validated benchmark."
link: "https://www.harvey.ai/blog/rebuilding-playbook-review-as-a-multi-agent-system"
year: 2026
seo:
  title: "Harvey: Multi-Agent Contract Playbook Review - ZenML LLMOps Database"
  description: "Harvey rebuilt its contract playbook review system from a fixed sequence of prompts into an orchestrator-worker multi-agent architecture. The new system gives parallel rule-specific agents access to searchable, versioned document branches, shared deal context, and editing tools, while a lead agent reconciles conflicting changes and validates the complete review. On Harvey’s in-house benchmark, risk-classification performance increased from 59% to 77% and redline quality from 53% to 87%, although average latency rose from 2.6 to 3.8 minutes. Timeouts, targeted retries, concurrency controls, prompt caching, streaming, state persistence, and task-specific model selection were used to make the higher-quality workflow viable in production, but the reported results are vendor-generated and rely partly on LLM-judge scoring rather than an independently validated benchmark."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-contract-playbook-review"
  ogTitle: "Harvey: Multi-Agent Contract Playbook Review - ZenML LLMOps Database"
  ogDescription: "Harvey rebuilt its contract playbook review system from a fixed sequence of prompts into an orchestrator-worker multi-agent architecture. The new system gives parallel rule-specific agents access to searchable, versioned document branches, shared deal context, and editing tools, while a lead agent reconciles conflicting changes and validates the complete review. On Harvey’s in-house benchmark, risk-classification performance increased from 59% to 77% and redline quality from 53% to 87%, although average latency rose from 2.6 to 3.8 minutes. Timeouts, targeted retries, concurrency controls, prompt caching, streaming, state persistence, and task-specific model selection were used to make the higher-quality workflow viable in production, but the reported results are vendor-generated and rely partly on LLM-judge scoring rather than an independently validated benchmark."
notion:
  pageId: "3f4f8dff-2538-8086-b6f6-f4a63ee7448a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:40:00.000Z"
  lastEditedTime: "2026-10-09T08:40:00.000Z"
  publishedAt: "2026-10-09T08:53:26Z"
---

## Overview

Harvey, a legal AI company, rebuilt its production playbook review capability for contract negotiations. The use case is to compare a counterparty’s contract with an organization’s internal playbook, determine whether provisions match the preferred, acceptable, or unacceptable positions, identify risks, and propose precise redlines. This is a difficult LLM application because legal correctness depends on conditional language, interactions between clauses, negotiation posture, document-wide context, and the preference for the smallest effective edit rather than a wholesale rewrite.

The original implementation was a deterministic pipeline of model calls for classification, retrieval, summarization, and clause-level redlining. Harvey replaced it with an orchestrator-worker multi-agent system. A lead agent distributes playbook rules to parallel worker agents, each of which can search the contract, inspect referenced material, classify a rule, and propose edits. Workers operate on independent branches of a versioned document model, allowing their changes to be reconciled rather than overwriting one another. The orchestrator merges non-conflicting edits, resolves collisions, and performs a final review. Harvey reports substantially better internal evaluation results, especially for redline quality, at the cost of higher latency and significantly greater operational complexity.

## Problem and production requirements

Contract review is not simply a text-matching task. A playbook can define a standard position, acceptable fallback positions, unacceptable deviations, guidance for interpreting a rule, and whether a clause may be absent. A contract may express an equivalent position using different wording, distribute one concept across multiple sections, or use conditional logic that changes the practical effect of a provision. A rule concerning assignment rights, for example, may affect several sections and overlap with another rule that proposes an edit to the same sentence.

The desired answer also depends on deal context. Review behavior changes according to which party the customer represents, whether the contract is based on the customer’s template or the counterparty’s paper, the stage of the negotiation, prior rejected proposals, and deal-specific instructions. Some commercial judgments cannot safely be inferred from a playbook alone. Harvey therefore describes escalation to a human reviewer as part of the intended behavior when a provision requires judgment that the available context cannot resolve.

Scale creates another LLMOps constraint. Contracts and playbooks can be hundreds of pages long, while model quality may degrade as more tokens are placed in context. The system must therefore retrieve relevant material, follow cross-references, preserve document structure, and return useful results within a reasonable interactive time. The output also needs to be operationally usable: a redline should be correctly located, tracked, minimal, and consistent with the rest of the document.

## Initial pipeline architecture

The first system used a fixed sequence of carefully engineered prompts. Classification was performed as a waterfall. A model first checked whether a rule matched the standard position; rules that did not match proceeded to checks for acceptable and then unacceptable deviations. A separate retrieval step located supporting text, followed by a model call that generated a summary. Redlines were produced by another call that received a clause, a selected position, and the contract’s defined terms. Harvey diffed the generated revision against the original clause and represented the diff as a tracked change.

This design had useful operational properties. Its stages were predictable, relatively easy to debug, and cost-effective because each call had a constrained responsibility. However, the decomposition also created failure modes. Context from classification could be lost when later calls performed citation, summarization, or editing. Clause-scoped redlining could not reliably move language to another section, add a missing provision, or maintain consistency across related clauses. Independent rule evaluations could produce contradictory edits to the same text, leaving users to repair conflicts manually. Incremental prompt changes improved individual metrics, but Harvey concluded that the system’s architecture rather than only its prompts needed to change.

## Evaluation design

Because Harvey found no public benchmark covering the end-to-end workflow, it created an internal evaluation suite with its legal team. The dataset pairs contracts and playbooks across contract types and provisions. It measures risk classification and redline quality separately. Classification is treated mainly as a categorization task, while redline assessment considers whether an edit is legally sound, correctly placed, and minimal in both substance and style.

For redline evaluation, lawyers supplied rubrics describing the considerations a competent lawyer would apply to each example. Harvey then used a committee of three frontier models as LLM judges, with independent scores aggregated into a result. This provides a repeatable way to compare architectures, but it is not the same as independent human adjudication or an externally reproducible benchmark. LLM-judge scores can inherit rubric omissions, model biases, and agreement problems, so the reported improvements should be interpreted as internal comparative evidence rather than definitive proof of legal accuracy. The source also does not provide details such as dataset size, confidence intervals, judge calibration, error distributions, or production incident rates.

## Multi-agent architecture

Harvey compared three approaches: the original rule-based LLM workflow, a single agent, and an orchestrator with subagents. The fixed workflow had moderate quality, excellent latency, and low complexity. A single reviewer agent achieved excellent quality in Harvey’s testing but unacceptable latency. The orchestrator-worker system also achieved excellent quality, with good latency and high complexity, and was selected as the practical compromise.

The lead agent is prompted to behave like the senior lawyer responsible for the review. It can spawn up to dozens of rule-specific workers in parallel. Each worker reads its assigned rule, searches the contract and related material, determines whether the contract satisfies the playbook, selects the applicable standard or fallback position, and drafts suggested edits. Workers are agents rather than single-purpose functions: when a clause refers to an exhibit, they can retrieve and inspect that exhibit. Harvey assigns unique identifiers to document components so agents can cite and edit specific elements unambiguously. Each worker produces a short memo containing its classification, proposed changes, and rationale.

Parallel editing is isolated through branches of a versioned document model. Every worker receives a copy or branch and records tracked changes tagged with the rule that generated them. A reconciliation stage merges non-conflicting edits and identifies collisions. Conflicting changes are escalated to the lead agent, which must resolve them in a way that satisfies the relevant rules and then review the result as a whole. This is an important systems design choice: concurrency improves throughput, but versioning and deterministic merge semantics are needed to prevent lost updates and inconsistent document state.

The agents share the legal and commercial context supplied for the review, including represented party, paper type, negotiation posture, deal instructions, and attached precedent documents. State persists across the review, including classifications, selected positions, edit summaries, and reasoning. If a user changes a selected position, asks a follow-up question, or accepts some suggestions and requests reconsideration of others, Harvey can reuse relevant agent state instead of restarting the complete loop. This persistence supports interactive workflows, although the source does not describe retention controls, provenance guarantees, or how stale state is invalidated.

## Results and tradeoffs

On Harvey’s internal benchmark, risk classification improved from 59% to 77%, an 18 percentage-point increase. Redline rubric performance increased from 53% to 87%, a 34 percentage-point increase. Average latency increased from 2.6 to 3.8 minutes, a 47% relative increase. These results support the design decision to trade speed for higher-quality review, but they do not establish that the system can replace legal judgment. The benchmark is internally constructed, the redline metric uses model-based judging, and no information is provided about false negatives, severe errors, human acceptance rates, or outcomes on unseen customer documents.

The architecture also increases cost and failure surface. More agents mean more model calls, more input tokens, more coordination, and more opportunities for looping or inconsistent intermediate results. A single-agent prototype demonstrated quality but was too slow, while parallel workers reduced latency at the expense of orchestration, branching, merging, and conflict-resolution complexity. The resulting system is better viewed as decision support and first-pass automation than autonomous legal advice; human review remains necessary for ambiguous, high-impact, or commercially sensitive provisions.

## Production LLMOps controls

Harvey added several controls to turn the offline design into a more reliable service. Model- and phase-specific timeouts stop unusual clauses from consuming resources indefinitely. Failed work is retried selectively at the affected rule rather than restarting the entire review. Concurrency limits and exponential backoff reduce pressure on shared model infrastructure when a large playbook fans out into many workers.

Prompt design was also treated as a cost and performance concern. Since many workers inspect the same document, Harvey reorganized prompts to improve prefix-cache hits and reduce repeated input-processing cost. The source says this materially reduced model cost and improved latency, but does not quantify the savings. Streaming allows each completed rule result to appear as soon as its worker finishes, reducing time to first useful output and exposing progress while slower or retried rules continue. This improves perceived responsiveness even when total completion time remains several minutes.

Harvey reports that no single model performed best for every review subtask. It therefore selects models by phase according to measured quality, latency, and cost. A multi-model harness abstracts provider differences so models can be exchanged with less application-level change. This is a practical form of model routing and portability, but it adds evaluation and regression-management obligations: every provider or model change can alter tool use, formatting, legal reasoning, latency, and judge scores.

## What the system enables

The redesigned workflow makes background review possible when a contract arrives through email or a shared file system, allowing a draft review to be prepared before a lawyer begins work. Harvey also describes a future feedback loop in which accepted, edited, and rejected redlines inform team or account preferences. Historical contracts may provide precedent for interpreting future reviews, potentially improving consistency and personalization.

Those extensions introduce governance questions not answered in the source. Feedback must distinguish a deliberate legal decision from an accidental acceptance, and historical contracts may contain confidential or outdated positions. Secure access control, auditability, data retention, provenance for every citation and edit, and explicit escalation policies are especially important in legal deployments. Overall, this case is a strong example of production LLMOps moving beyond prompt sequencing: benchmark-driven architecture selection, agent state, parallel execution, versioned artifacts, conflict resolution, model routing, caching, streaming, and targeted reliability controls are all necessary to make a complex legal workflow usable. The reported gains are promising, but they should be validated with representative customer data and sustained human review before being treated as evidence of autonomous legal correctness.
