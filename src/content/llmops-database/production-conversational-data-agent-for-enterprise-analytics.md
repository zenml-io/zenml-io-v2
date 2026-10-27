---
title: "Production Conversational Data Agent for Enterprise Analytics"
slug: "production-conversational-data-agent-for-enterprise-analytics"
draft: false
llmopsTags:
  - "question-answering"
  - "chatbot"
  - "data-analysis"
  - "unstructured-data"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "reranking"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "agent-based"
  - "harness-engineering"
  - "evals"
  - "databases"
  - "reliability"
  - "scalability"
  - "openai"
  - "anthropic"
industryTags: "e-commerce"
company: "DoorDash"
summary: "DoorDash built Vera, an internal conversational data agent, to answer business questions across a fragmented ecosystem of more than 200,000 datasets and 10 institutional knowledge sources. Rather than relying on a general-purpose coding agent with basic connectors, Vera combines model-specific prompting, retrieval and ranking, a governed semantic data layer, SQL validation and execution, domain-specific skills, human-approved knowledge promotion, and continuous evaluation. DoorDash reports that its benchmark pass rate increased from 43% to 90% as the evaluation set expanded, while a controlled comparison using the same model found Vera outperforming Claude Code. The results are company-reported and subject to limitations including LLM-judge dependence, database timeouts, benchmark staleness, evaluation noise, and weaker evidence for difficult Tier 3 analytical questions."
link: "https://careersatdoordash.com/blog/inside-vera-doordashs-data-agent/"
year: 2026
seo:
  title: "DoorDash: Production Conversational Data Agent for Enterprise Analytics - ZenML LLMOps Database"
  description: "DoorDash built Vera, an internal conversational data agent, to answer business questions across a fragmented ecosystem of more than 200,000 datasets and 10 institutional knowledge sources. Rather than relying on a general-purpose coding agent with basic connectors, Vera combines model-specific prompting, retrieval and ranking, a governed semantic data layer, SQL validation and execution, domain-specific skills, human-approved knowledge promotion, and continuous evaluation. DoorDash reports that its benchmark pass rate increased from 43% to 90% as the evaluation set expanded, while a controlled comparison using the same model found Vera outperforming Claude Code. The results are company-reported and subject to limitations including LLM-judge dependence, database timeouts, benchmark staleness, evaluation noise, and weaker evidence for difficult Tier 3 analytical questions."
  canonical: "https://www.zenml.io/llmops-database/production-conversational-data-agent-for-enterprise-analytics"
  ogTitle: "DoorDash: Production Conversational Data Agent for Enterprise Analytics - ZenML LLMOps Database"
  ogDescription: "DoorDash built Vera, an internal conversational data agent, to answer business questions across a fragmented ecosystem of more than 200,000 datasets and 10 institutional knowledge sources. Rather than relying on a general-purpose coding agent with basic connectors, Vera combines model-specific prompting, retrieval and ranking, a governed semantic data layer, SQL validation and execution, domain-specific skills, human-approved knowledge promotion, and continuous evaluation. DoorDash reports that its benchmark pass rate increased from 43% to 90% as the evaluation set expanded, while a controlled comparison using the same model found Vera outperforming Claude Code. The results are company-reported and subject to limitations including LLM-judge dependence, database timeouts, benchmark staleness, evaluation noise, and weaker evidence for difficult Tier 3 analytical questions."
notion:
  pageId: "3e9f8dff-2538-8077-88a1-ec8f69aff7e4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:05:00.000Z"
  lastEditedTime: "2026-10-09T08:45:00.000Z"
  publishedAt: "2026-10-22T13:35:58Z"
---

## Overview

DoorDash developed Vera as an internal conversational data agent for employees who need reliable answers about orders, merchants, products, marketing, finance, and operations. The underlying problem was not simply that employees lacked access to a capable language model. DoorDash had a highly fragmented data environment containing more than 200,000 datasets, 350 petabytes of data, and 10 institutional knowledge sources, including repositories and wikis. General-purpose agents could interact with tools, but they often struggled to identify the correct modeled tables, understand organization-specific definitions, form valid joins, and distinguish authoritative information from less reliable sources.

Vera addresses this by putting a governed data and knowledge layer around frontier models. Its production harness performs parallel retrieval over human-authored knowledge and modeled tables, constrains the model to approved or verified sources, provides domain-specific skills and context, validates and executes model-generated SQL, and evaluates the resulting tool use and answer. DoorDash reports that the system’s benchmark pass rate rose from 43% to 90% while the evaluation set expanded substantially. However, this is an internal, company-reported result rather than an independently audited production study. The reported gains also combine model improvements with prompt, retrieval, data-modeling, evaluation, and execution changes, so the contribution of any individual component is not fully isolated.

## Problem and use case

The target questions range from straightforward metric retrieval to analysis that could influence business decisions. Examples include explaining a regional order-volume dip, tracking the pacing of a newly launched product, identifying merchants at risk of churning from marketing products, or displaying canceled orders by hour for a particular merchant over a 90-day period. These questions require more than retrieving a document: the system must resolve business terminology, select appropriate tables, infer join paths, apply the right filters and time windows, query large systems, and explain the result.

DoorDash characterizes the work with three broad difficulty tiers. Tier 1 covers descriptive questions such as metric pulls, trends, splits, and sanity checks. Tier 2 includes prioritization, targeting, opportunity sizing, and resource-allocation analyses. Tier 3 involves deeper interpretation and accountability, including causal analysis, experiment readouts, committed forecasts, and high-stakes decision support. The tiers overlap, but they provide a useful basis for allocating model reasoning effort and identifying where additional user confirmation or expert review is appropriate.

## Architecture and LLMOps design

Vera uses an agent harness rather than exposing a general model directly to SQL tools. The harness supplies business context, domain-specific skills, retrieval results, data-model constraints, and execution controls. Models author SQL and make tool calls, but runtime access to unmodeled or unverified sources is blocked at the harness level. This is an important production design choice: the system treats the semantic data layer and tool policy as part of the model’s effective capability, rather than assuming that a stronger model will discover the right data unaided.

Retrieval runs two searches in parallel. One searches human-authored knowledge, such as documentation and wiki material, while the other searches modeled tables and associated metadata. DoorDash uses a single embedding model across its knowledge stores. Core tables are indexed offline on a regular cadence; preprocessing removes boilerplate and filters low-signal queries. Usage patterns, table metadata, code references, and wiki pages contribute to learned join patterns and other semantic relationships. New tables can also be discovered agentically at inference time and through background processes, although the offline indexing strategy introduces a lag between data availability and Vera’s ability to use it.

Knowledge sources and skills carry provenance back to their source material. A change-detection process polls for source differences, and material changes create proposals that enter an approval queue. New join patterns and document embeddings are initially inactive and must meet an evaluation threshold before a domain owner promotes them. Domain owners may enable fully automated promotion for their area, creating a configurable tradeoff between freshness and governance. This approach reduces the risk that an unreviewed change silently alters answers, but it can delay useful data and requires ongoing ownership from subject-matter experts.

The production model described in the article is GPT 5.5, selected using a tradeoff among benchmark score, latency, tool steps, token usage, and provider characteristics rather than headline accuracy alone. DoorDash also compared frontier models from OpenAI and Anthropic and hosted an internal GLM 5.3 Flash instance through Modal endpoints as a coarse comparison. The GLM comparison was not optimized and experienced significant timeouts under heavy load, so it should not be interpreted as a neutral model-quality comparison. DoorDash reports that extended reasoning generally improved benchmark scores, but also increased latency, token consumption, tool calls, and the probability of database timeouts or partial results.

## Evaluation and continuous improvement

The evaluation corpus covers 19 vertical domains across sales, finance, product, and operations, with more than 1,900 contributed evaluations. Domain owners vet user-contributed evaluations before they count. Each evaluation is graded on tool selection, table selection, and overall answer correctness. When an unambiguous SQL-backed answer is unavailable, domain experts provide detailed rubrics. An LLM judge produces the component scores and a weighted aggregate, with a maximum score of 3.0.

The judging process itself required calibration. DoorDash found that the judge could over-penalize correct answers when equivalent tables were used rather than the exact expected table. Recalibration was intended to accept equivalent data sources, tolerate numerical imprecision where appropriate, and ignore minor formatting differences. This is a sensible quality-control step, but LLM-judge scores remain an indirect measure and can encode the assumptions of the rubric or judge model. The reported benchmark has an approximate run-to-run spread of four percentage points in pass rate, and DoorDash treats differences smaller than that as noise. A 100-question subset is used for some ablations, making small model-to-model differences especially difficult to interpret.

To scale evaluation authoring, Vera mines everyday work products such as Slack threads and Jira tickets. A frontier model drafts a proposed question, SQL query or rubric, and complexity rating. Domain owners then accept or reject the proposal. Near-duplicate questions are automatically identified with a similarity measure, and the source states that domain owners accept 95% of candidates remaining after deduplication. This pipeline uses an LLM to improve the LLM evaluation process, while retaining human review as a quality gate. It increases coverage without requiring experts to write every evaluation from scratch, although the quality and representativeness of mined work still depend on what gets documented in those systems.

## Comparative findings and workflow controls

A controlled comparison used the same Opus 4.8 model for Vera and Claude Code, with Claude Code given the SQL tools and the same skills used by Vera. Across 100 representative samples, Vera scored 2.60 out of 3.0 with a reported 73% pass rate, while Claude Code scored 2.16 with a 48% pass rate. DoorDash attributes the difference primarily to the data layer and harness: Claude Code struggled to query modeled tables effectively and draw correct inferences. Because this was an internal experiment and the sample was limited to 100 questions, the result is useful evidence for the harness hypothesis but not a universal comparison of the products or models.

The system also exposes an analysis flow for harder Tier 3 questions. Before executing queries, the model creates a plan covering timeframes, metrics, scope, and user constraints. The user can approve or adjust the plan, after which execution proceeds. DoorDash reports improved performance on these questions, but the observed pass rate varied from 64% to 100% across a small sample of 14 evaluations. That variance is a warning that the evidence for complex analytical reasoning is still immature and that broader expert-driven evaluation is needed.

## Results and tradeoffs

DoorDash reports that Vera’s overall pass rate rose from 43% to 90%, even as the evaluation set was expanded twice. The article argues that raw model intelligence has become a less important improvement vector than the surrounding harness, including retrieval, business context, data modeling, SQL validation, and execution. Frontier models reportedly landed within a few benchmark points of one another, while latency, tool trajectories, token use, and tail behavior separated them more meaningfully. Anthropic models in DoorDash’s harness had longer tail latency than OpenAI counterparts; one model used fewer tool steps but took longer per step, illustrating why step count alone is not a useful performance metric.

The main operational risks are cost, latency, data freshness, concurrency, and correctness. More reasoning can improve accuracy but increases token and wall-clock costs. Model-generated SQL can launch many concurrent heavy queries, and database timeouts are counted as failed runs rather than merely slow answers. Tail latency, rather than median latency, drives timeouts and partial responses. Offline indexing improves signal quality and governance but means newly available data may not be immediately usable. Tier 3 answers can still be superficially plausible, and a high aggregate score does not guarantee safe autonomous decision support.

Overall, Vera is a substantial example of production LLMOps in which the semantic layer, retrieval policy, evaluation lifecycle, and execution controls are treated as first-class system components. Its strongest lesson is that enterprise data-agent quality depends on governing and modeling the information environment around the LLM. The reported results support that design direction, while the benchmark’s internal nature, judge dependence, small higher-tier samples, possible staleness of relative-time evaluations, and exposure to database failures should be considered when generalizing the claims beyond DoorDash.
