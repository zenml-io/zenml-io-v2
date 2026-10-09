---
title: "Wake-Sleep Memory for Long-Horizon Legal Agents"
slug: "wake-sleep-memory-for-long-horizon-legal-agents"
draft: false
llmopsTags:
  - "document-processing"
  - "high-stakes-application"
  - "unstructured-data"
  - "agent-based"
  - "memory"
  - "cost-optimization"
  - "token-optimization"
  - "evals"
industryTags: "legal"
company: "Harvey"
summary: "Harvey evaluated a wake-sleep architecture for improving long-horizon legal agents on complex Corporate M&A and Capital Markets work. During the online wake phase, an agent completed benchmark tasks and produced deliverables and execution traces; during the offline sleep phase, LLM-based reviewers analyzed graded runs, generated and merged reusable checklist items and practice notes, and filtered overly specific lessons with a Jev-based commit gate before storing them in agent memory. Across 196 Legal Agent Benchmark tasks and 10 learning cycles, the memory-enabled agent increased all-pass performance from 2.9% to 15.7%, improved rubric-level pass rates on both familiar and new matters, and generalized beyond the training distribution. However, the learned guidance caused approximately 2.5 times more tool calls and increased latency and cost; retrieving only task-relevant lessons reportedly halved per-task cost while preserving rubric pass rates. The results are promising but remain benchmark-based and do not by themselves establish performance, safety, or reliability in live legal practice."
link: "https://x.com/nikogrupen/status/2108226990792900876"
year: 2026
seo:
  title: "Harvey: Wake-Sleep Memory for Long-Horizon Legal Agents - ZenML LLMOps Database"
  description: "Harvey evaluated a wake-sleep architecture for improving long-horizon legal agents on complex Corporate M&A and Capital Markets work. During the online wake phase, an agent completed benchmark tasks and produced deliverables and execution traces; during the offline sleep phase, LLM-based reviewers analyzed graded runs, generated and merged reusable checklist items and practice notes, and filtered overly specific lessons with a Jev-based commit gate before storing them in agent memory. Across 196 Legal Agent Benchmark tasks and 10 learning cycles, the memory-enabled agent increased all-pass performance from 2.9% to 15.7%, improved rubric-level pass rates on both familiar and new matters, and generalized beyond the training distribution. However, the learned guidance caused approximately 2.5 times more tool calls and increased latency and cost; retrieving only task-relevant lessons reportedly halved per-task cost while preserving rubric pass rates. The results are promising but remain benchmark-based and do not by themselves establish performance, safety, or reliability in live legal practice."
  canonical: "https://www.zenml.io/llmops-database/wake-sleep-memory-for-long-horizon-legal-agents"
  ogTitle: "Harvey: Wake-Sleep Memory for Long-Horizon Legal Agents - ZenML LLMOps Database"
  ogDescription: "Harvey evaluated a wake-sleep architecture for improving long-horizon legal agents on complex Corporate M&A and Capital Markets work. During the online wake phase, an agent completed benchmark tasks and produced deliverables and execution traces; during the offline sleep phase, LLM-based reviewers analyzed graded runs, generated and merged reusable checklist items and practice notes, and filtered overly specific lessons with a Jev-based commit gate before storing them in agent memory. Across 196 Legal Agent Benchmark tasks and 10 learning cycles, the memory-enabled agent increased all-pass performance from 2.9% to 15.7%, improved rubric-level pass rates on both familiar and new matters, and generalized beyond the training distribution. However, the learned guidance caused approximately 2.5 times more tool calls and increased latency and cost; retrieving only task-relevant lessons reportedly halved per-task cost while preserving rubric pass rates. The results are promising but remain benchmark-based and do not by themselves establish performance, safety, or reliability in live legal practice."
notion:
  pageId: "3f4f8dff-2538-8051-b20a-c1ef06cf03c6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:39:00.000Z"
  lastEditedTime: "2026-10-09T08:39:00.000Z"
  publishedAt: "2026-10-09T08:53:39Z"
---

## Overview

Harvey explored a hybrid online-offline learning loop for long-horizon legal agents. The central problem is that a capable agent may complete a single matter with a lengthy trajectory of document searches, analyses, calculations, drafting, and revisions, yet fail to retain the general practices that would improve its next matter. The proposed wake-sleep system separates execution from improvement: the agent performs legal knowledge work online in a wake phase, while offline LLM-based processes inspect its traces and graded deliverables, extract reusable lessons, and inject approved lessons into later runs.

The reported experiment used Harvey’s Legal Agent Benchmark (LAB), covering synthetic Corporate M&A and Capital Markets matters. Over 10 wake-sleep cycles, the memory-enabled agent reached a 15.7% all-pass rate compared with 2.9% for a vanilla agent without memory or internalized context. It also improved rubric-level performance on both familiar and substantially different held-out matters. These findings support the value of persistent textual context and offline curation, but the evidence is an evaluation study rather than proof of a production deployment. The source does not provide live-customer outcomes, independent replication, statistical significance details, judge calibration information, or a complete accounting of the increased inference and review costs.

## Problem and Use Case

Long-horizon legal work requires more than retrieving passages from a document collection. The benchmark agent receives instructions and a folder of documents from a synthetic client matter, then must read and search across the material, conduct analyses, and produce an issues list, memorandum, or marked-up draft. Quality depends on details such as checking calculations, explaining alternative interpretations, expressing contractual time terms clearly, and ensuring that the final deliverable satisfies a rubric.

A stateless or vanilla agent can repeat avoidable errors across matters. Conversely, simply placing every past note in the context window would increase token consumption and could overwhelm the agent with irrelevant or contradictory guidance. Harvey’s design treats successful and unsuccessful work as material for an evolving operational memory. The intended lesson is not a client-specific fact, such as a party name or purchase price, but a transferable checklist item or practice note that can influence future legal analysis and drafting.

## Wake-Sleep Architecture

Each cycle begins with the wake phase. The agent executes a set of LAB training tasks and leaves behind an execution trace, tool calls, intermediate work, and final deliverables. Its activities include document reading and search, running analyses, writing, and editing. The agent does not receive the evaluation results during the rollout, which separates task execution from subsequent critique.

The outputs are then graded by dual LLM judges against expert-curated rubrics, following the standard LAB configuration described in the source. The rubric verdicts become supervision for the sleep phase. A review model receives the trajectory, deliverables, and criterion-level grading for each training run. It proposes candidate lessons describing what a high-quality deliverable should contain or how a portion of the work should be performed.

Lessons have two main forms. Checklist items specify content that should appear in a deliverable, while practice notes describe a method or behavior for carrying out the work. The review model merges overlapping candidates, revises existing lessons, removes some lessons, and, from the second cycle onward, assesses which existing lessons appear to have helped. The resulting memory is organized by work type—analysis, drafting, and review—with an additional group for general learnings.

A simplified representation of the intended loop is:

```text
roll out tasks -> grade deliverables -> propose lessons
      -> merge and revise -> commit general lessons -> store and reuse
```

This is primarily non-parametric optimization. The system changes textual context and memory rather than updating the underlying model weights. The article notes that similar ideas could eventually be combined with parametric learning or post-training, but the reported experiment does not describe such weight updates.

## Memory Governance and Overfitting Controls

The main reliability risk in automatically generated memory is that the system may mistake a one-off detail for a general rule. A lesson derived from one synthetic matter could accidentally encode a client name, transaction value, document-specific fact, or an overly narrow procedure. Such contamination could make future outputs less accurate or expose inappropriate matter-specific information.

Harvey uses a Jev-based commit gate to address this risk. Jev evaluates whether a proposed lesson contains client-specific detail, is too narrow, or is supported by only a single training task. Lessons rejected by the gate are sent to a review queue and are not added to the active memory. Approved lessons are stored as text and made available during later wake phases. This creates a form of memory quality-control pipeline, although the source does not specify Jev’s model configuration, thresholds, false-rejection rate, false-acceptance rate, or the extent of human review.

The memory evolves rather than remaining fixed. The first sleep cycle added 122 lessons, mostly content checklists. Across later cycles, the system refined these into behavioral and tactical guidance, while pruning lessons judged unhelpful or overly specific. One example concerns deadlines and time calculations: an initial rule required contractual time terms to be stated as durations and future deadlines to include arithmetic; later cycles expanded the rule to account for weekends and conflicting windows across documents. This illustrates how repeated offline review can turn a broad instruction into a more detailed operational procedure, but it also highlights a potential failure mode: incremental additions could make lessons unwieldy, internally inconsistent, or overly prescriptive without stronger versioning and regression controls.

## Evaluation and Results

The experiment ran 10 wake-sleep cycles over 196 LAB tasks: 110 training tasks and 86 validation tasks. The reported agent model was GPT-6 Luna. Performance was compared with a vanilla no-memory agent across the tasks. Held-out matters were divided into familiar matters, which resembled the training distribution in document types and instructions, and new matters, which were described as fundamentally different from tasks encountered during wake-sleep training.

The wake-sleep agent achieved a 15.7% all-pass rate, compared with 2.9% for the vanilla baseline. At the rubric level, it completed more than 10% additional criteria per task on familiar matters and nearly 5% additional criteria per task on new matters relative to the baseline. The largest gains occurred during the initial cycles, when the agent acquired its first set of legal-work practices. The improvement on new matters is particularly relevant because it suggests that at least some stored guidance represented transferable work habits rather than memorization of training cases.

The reported metrics should nevertheless be interpreted carefully. The tasks were synthetic benchmark matters, and the comparison is against a no-memory configuration rather than every plausible alternative, such as a manually authored playbook, retrieval over prior traces, or a carefully engineered prompt. Dual LLM judges and expert rubrics provide a more structured evaluation than unscored free-form generation, but model-based grading can still introduce bias or correlated errors. The article also does not report confidence intervals, per-task distributions, judge agreement, or whether gains persist after memory growth beyond the 10 evaluated cycles.

## Runtime Behavior, Cost, and Retrieval

The learned lessons changed how the agent worked, not merely what it wrote. With memory, the agent made approximately 2.5 times more tool calls per task, especially calls used to run code, check calculations, and draft or edit deliverables. The number of document reading and search calls was approximately unchanged, indicating that the initial benefits were concentrated in post-research analysis and writing rather than retrieval. More verification can improve thoroughness, but it also increases latency and inference expense. For legal workflows, this tradeoff may be acceptable for high-value matters, but it could be prohibitive for high-volume or time-sensitive work.

To reduce this overhead, Harvey evaluated lesson retrieval. Instead of injecting the full memory bank, Jev judged which lessons were relevant and likely to help with the current task, and only a fixed set of selected lessons was placed in the agent’s context. The source reports that this approach halved cost per task while maintaining the rubric criteria pass rate. This is an important LLMOps optimization: persistent memory can be separated from active context, with relevance filtering controlling prompt size and reducing distraction. The claim is based on the described held-out evaluation; the source does not give absolute token counts, retrieval precision and recall, or results under adversarially ambiguous tasks.

## Production LLMOps Assessment

The architecture maps naturally to a production LLMOps pipeline. Online execution produces traces and deliverables; an asynchronous offline process evaluates outcomes, summarizes failures, proposes memory updates, applies governance checks, and versions the resulting context. The next online request consumes either the full approved memory or a retrieved subset. This separation can keep user-facing latency independent of some offline processing, while allowing organizations to schedule review and memory maintenance as background jobs.

A production implementation would need strong controls around matter isolation, access permissions, retention, auditability, and rollback. The article focuses on synthetic benchmark tasks and does not describe how confidential client information would be prevented from entering lessons, how memories would be scoped by client or workspace, or how a reviewer would approve changes before they affect live legal work. The Jev commit gate is a useful defense against narrow or client-specific lessons, but it should not be treated as a complete privacy or correctness mechanism. Memory updates would benefit from immutable versions, provenance linking each lesson to its supporting tasks and rubric outcomes, automated regression suites, and explicit rollback when a new lesson reduces performance.

The system also depends on the quality of its evaluators. LLM judges, review models, and Jev are all potential sources of hallucination, grading drift, or systematic blind spots. A robust deployment would monitor lesson acceptance and rejection rates, judge disagreement, rubric performance by matter type, cost and latency per task, tool-call patterns, and incidents involving unsupported legal conclusions. Human legal review remains important, particularly because higher benchmark rubric scores do not establish that an output is legally correct, ethically compliant, or suitable for filing or client advice.

Overall, Harvey’s wake-sleep experiment presents a credible pattern for improving verifiable knowledge-intensive agents through offline memory curation. Its strongest contribution is the explicit lifecycle connecting traces, evaluation, lesson synthesis, commit gating, storage, retrieval, and subsequent execution. The reported gains are substantial within LAB, and generalization to new matters is encouraging. The principal limitations are the benchmark setting, reliance on LLM-based evaluation and governance, and the cost and latency introduced by more extensive checking. For production adoption, the approach should be treated as an evaluated context-management and agent-improvement strategy requiring ongoing monitoring, human oversight, and independent validation rather than as evidence that a legal agent can safely learn autonomously.
