---
title: "Multi-Agent Contract Playbook Review with Conflict-Aware Redlining"
slug: "multi-agent-contract-playbook-review-with-conflict-aware-redlining"
draft: false
llmopsTags:
  - "document-processing"
  - "classification"
  - "unstructured-data"
  - "high-stakes-application"
  - "structured-output"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "memory"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "orchestration"
  - "cache"
  - "reliability"
  - "scalability"
  - "guardrails"
industryTags: "legal"
company: "Harvey"
summary: "Harvey rebuilt its contract playbook review system from a sequential prompt pipeline into an orchestrator-worker multi-agent architecture. The system assigns individual playbook rules to parallel agents that can search and inspect a versioned document, classify risk, propose minimal tracked edits, and produce rationale, while a lead agent reconciles conflicting changes and validates the complete review. On Harvey's internal benchmark, risk-classification performance increased from 59% to 77% and redline-rubric performance from 53% to 87%, while average latency increased from 2.6 to 3.8 minutes. The reported results indicate a substantial quality improvement, but they are based on an in-house evaluation using legal-defined rubrics and LLM judges, so they should not be treated as independently validated production outcomes."
link: "https://www.harvey.ai/blog/rebuilding-playbook-review-as-a-multi-agent-system"
year: 2026
seo:
  title: "Harvey: Multi-Agent Contract Playbook Review with Conflict-Aware Redlining - ZenML LLMOps Database"
  description: "Harvey rebuilt its contract playbook review system from a sequential prompt pipeline into an orchestrator-worker multi-agent architecture. The system assigns individual playbook rules to parallel agents that can search and inspect a versioned document, classify risk, propose minimal tracked edits, and produce rationale, while a lead agent reconciles conflicting changes and validates the complete review. On Harvey's internal benchmark, risk-classification performance increased from 59% to 77% and redline-rubric performance from 53% to 87%, while average latency increased from 2.6 to 3.8 minutes. The reported results indicate a substantial quality improvement, but they are based on an in-house evaluation using legal-defined rubrics and LLM judges, so they should not be treated as independently validated production outcomes."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-contract-playbook-review-with-conflict-aware-redlining"
  ogTitle: "Harvey: Multi-Agent Contract Playbook Review with Conflict-Aware Redlining - ZenML LLMOps Database"
  ogDescription: "Harvey rebuilt its contract playbook review system from a sequential prompt pipeline into an orchestrator-worker multi-agent architecture. The system assigns individual playbook rules to parallel agents that can search and inspect a versioned document, classify risk, propose minimal tracked edits, and produce rationale, while a lead agent reconciles conflicting changes and validates the complete review. On Harvey's internal benchmark, risk-classification performance increased from 59% to 77% and redline-rubric performance from 53% to 87%, while average latency increased from 2.6 to 3.8 minutes. The reported results indicate a substantial quality improvement, but they are based on an in-house evaluation using legal-defined rubrics and LLM judges, so they should not be treated as independently validated production outcomes."
notion:
  pageId: "3e9f8dff-2538-80ed-9610-c407661df7aa"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:10:00.000Z"
  lastEditedTime: "2026-09-28T08:10:00.000Z"
  publishedAt: "2026-09-28T08:25:58Z"
---

## Overview

Harvey is a legal-technology company using large language models to assist lawyers with contract review. The case study concerns a production-oriented redesign of Playbook Review, a workflow that compares a counterparty contract with an organization’s internal playbook and recommends risk classifications, comments, and tracked redlines. The underlying task is not simple clause matching: a playbook can specify a preferred position, acceptable fallbacks, unacceptable deviations, guidance, and whether an absent clause is permissible. Contract language may express the same concept differently, span multiple sections, depend on defined terms or exhibits, and change meaning according to the deal context.

Harvey replaced an earlier fixed pipeline of model calls with an orchestrator-worker multi-agent system. A lead agent delegates individual playbook rules to parallel worker agents, which search the document, inspect related material, determine the relevant position, and draft proposed edits. Each worker operates on a branch of a versioned document representation. The lead agent then merges non-conflicting edits, resolves collisions, and performs a final review. Harvey reports improvements on its internal benchmark from 59% to 77% for risk classification and from 53% to 87% for redline quality, at the cost of increasing average latency from 2.6 to 3.8 minutes. These are meaningful reported gains, although the benchmark, rubrics, and judging process were developed by Harvey and its legal team rather than independently validated.

## Problem and Production Context

Contract review is a high-volume legal workflow in which a reviewer compares incoming paper with an organization’s negotiated standards. The reviewer must decide whether each provision matches the standard position, fits an acceptable deviation, or presents an unacceptable risk. They must also account for who drafted the contract, which party the lawyer represents, the negotiation stage, previous counterparty responses, deal-specific instructions, and sometimes the commercial importance of the counterparty. A clause that is acceptable in one context may require escalation in another.

The quality bar for generated changes is particularly demanding. Lawyers generally prefer the lightest-touch edit: if three words solve the issue, rewriting the entire clause creates unnecessary negotiation friction and review work. Changes may also need to move language, add a missing provision, preserve defined terms, or remain consistent with distant sections. Long contracts and playbooks create an additional LLMOps constraint because large prompts increase cost and can degrade response quality. The system therefore has to balance legal correctness, document-wide context, latency, cost, reliability, and human control rather than optimize only for textual similarity.

## Original LLM Workflow and Its Limitations

The original implementation was a predictable sequence of prompts orchestrated in application code. Classification used a waterfall: a model first checked the standard position, then evaluated acceptable deviations for rules that failed the first check, and finally checked unacceptable deviations. A retrieval step located supporting document text, followed by another model call that wrote the summary. Redlines were generated by a separate call that received one clause, one position, and relevant defined terms; Harvey diffed the generated revision against the original and converted that diff into a tracked change.

This decomposition offered clear responsibilities, relatively straightforward debugging, and favorable cost and latency characteristics. However, context was fragmented between classification, citation, and redline stages. The redline call was scoped to one clause and could not reliably move language elsewhere, add a missing clause, or coordinate changes across related sections. Independent rule evaluation also meant that two rules could propose contradictory edits to the same sentence. Incremental prompt changes improved individual metrics but did not fully address these architectural problems. The system could over-redline, miss risks, place suggestions incorrectly, or misunderstand the contract’s negotiation posture.

## Multi-Agent Architecture

Harvey first tested a single reviewer agent with access to the contract, playbook, and document-editing tools. The agent could iteratively search the document and revise it until it met its requirements. This prototype performed well on the benchmark but was too slow for the desired user experience. Harvey then introduced an orchestrator-worker pattern to parallelize work while retaining a coordinating decision-maker.

The orchestrator is prompted to act as the lead lawyer for the review. It can spawn up to dozens of rule-focused workers in parallel. Each worker is agentic rather than a single deterministic function: it reads the assigned rule, searches for relevant clauses, follows references to exhibits or other document components, interprets the contract against the playbook, selects a standard or fallback position, and drafts suggested edits. Harvey assigns unique identifiers to document components so agents can cite and edit precise elements without ambiguity. Each worker returns a concise memo describing its classification, proposed edits, and rationale.

The document state is isolated to prevent concurrent editing from corrupting results. Every worker receives a branch of a versioned document model, and every proposed change is recorded as a tracked edit associated with the rule that generated it. A reconciliation operation merges branches in a manner analogous to version control: non-conflicting changes are applied directly, while collisions are passed to the lead agent. The lead agent resolves overlapping edits, including cases in which multiple rules affect the same sentence, and then checks that the complete review contains classifications and corresponding edits where appropriate.

All agents receive shared deal context, including the represented party, whether the document is first-party or third-party paper, negotiation strictness, deal-specific instructions, and attached precedent documents. The system also persists agent state, including classifications, selected positions, edit summaries, and reasoning. This allows later user actions—such as asking a follow-up question, changing the chosen position, or accepting some suggestions and reconsidering others—to reuse relevant work instead of restarting the entire loop.

## Evaluation and Results

Because Harvey found no public benchmark covering the complete workflow, it created an internal evaluation suite with its legal team. The dataset pairs contracts and playbooks across contract types and provisions. Risk classification is treated primarily as a classification task. Redline evaluation is more subjective: legal reviewers define considerations for each example, including whether an edit is minimal, correctly placed, substantively sound, and stylistically appropriate.

Harvey used a committee of three frontier-model judges to score outputs independently against those rubrics and aggregate the votes. The reported comparison was:

- Risk classification increased from 59% to 77%, a gain of 18 percentage points.
- Redline-rubric performance increased from 53% to 87%, a gain of 34 percentage points.
- Average latency increased from 2.6 to 3.8 minutes, a 47% increase.

The comparison supports Harvey’s claim that the multi-agent design improved the measured quality of review while imposing a latency cost. It does not establish universal legal accuracy. The benchmark is internal, the rubric construction involves Harvey’s legal team, and LLM judges can introduce correlated evaluation errors or favor particular response styles. The source does not report error distributions, contract volumes, human acceptance rates, production incident rates, or results broken down by contract type. Consequently, the numbers are best interpreted as evidence of improvement within Harvey’s evaluation setup, not as an independently audited measure of lawyer-equivalent performance.

## Production LLMOps Controls

The redesign increased token usage and latency, especially for long contracts and playbooks with many rules. Harvey added operational controls to make the agent team more practical in production. Model- and phase-specific timeouts prevent an unproductive call from blocking an entire review, while targeted retries rerun only the affected rule. Concurrency limits and exponential backoff control fan-out when many workers are launched and reduce pressure on shared model infrastructure.

Prompt caching addresses repeated context. Multiple workers inspect much of the same document, so Harvey redesigned prompts to improve prefix-cache hits, reducing repeated model-input processing and reported model cost while also improving latency. Results are streamed as individual rules finish, allowing users to begin reviewing within seconds of the first completed subtask and exposing progress, retries, and unusually slow rules instead of hiding all work behind a single final response.

Harvey also uses task-specific model selection rather than assuming one model is optimal for every stage. Models are chosen according to measured quality, latency, and cost for the particular review subtask. A multi-model harness normalizes provider differences, making it easier to switch models as evaluations change. This is an important maintainability measure for a production LLM application, although the source does not identify the providers, models, serving infrastructure, or exact routing policy.

## Tradeoffs and Future Use Cases

The architecture trades additional complexity and inference cost for better document-wide reasoning, parallel execution, and conflict handling. Branching and reconciliation provide a useful analogue to software version control, but they also create engineering obligations around document identity, edit semantics, merge correctness, retries, and state persistence. Agentic behavior can improve coverage, yet it introduces nondeterminism and makes observability, reproducible evaluation, and failure diagnosis more important than in the original pipeline.

Harvey describes the resulting system as enabling background reviews when contracts arrive through email or shared file systems, with a reasoned first-pass draft ready for a lawyer. It also points toward personalization from accepted, edited, and rejected redlines, and toward using historical contracts as precedent. Those capabilities are presented as a direction for Contract Intelligence rather than as fully demonstrated results in this case study. They would require careful privacy, access-control, retention, provenance, and feedback-quality controls, particularly because legal documents can contain confidential information and because accepted edits are not automatically reliable training signals.

Overall, the case is a concrete example of LLMOps moving beyond prompt tuning. Harvey changed the task decomposition, introduced agent coordination and document-state management, built a domain-specific evaluation suite, and added controls for concurrency, caching, streaming, retries, and model portability. The reported quality gains are substantial, but the higher latency and internal evaluation methodology leave open important questions about generalization, human oversight, operational cost, and real-world legal outcomes. The design is therefore best viewed as a quality-oriented production architecture for lawyer-supervised review, not evidence that contract judgment can be delegated without review.
