---
title: "Building an AI-Native Growth Operations Platform"
slug: "building-an-ai-native-growth-operations-platform"
draft: false
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "classification"
  - "structured-output"
  - "unstructured-data"
  - "rag"
  - "embeddings"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "cost-optimization"
  - "latency-optimization"
  - "kubernetes"
  - "databases"
  - "scaling"
  - "orchestration"
  - "cicd"
  - "continuous-integration"
  - "guardrails"
  - "reliability"
  - "cache"
  - "databricks"
industryTags: "tech"
company: "Rippling"
summary: "Rippling developed an internal AI platform to help revenue operations, marketing, sales, finance, and other go-to-market teams turn warehouse data into operational decisions. The system evolved from deterministic retrieval tools that supplied curated data to agents, to text-to-SQL capabilities that let agents investigate questions across the company’s warehouse and generate campaign, account, and strategy recommendations. A web application and horizontally scalable backend run agent loops that may issue multiple SQL queries, validate generated SQL, retrieve bespoke aggregate datasets, and synthesize results. Rippling evaluates changes through engineering benchmarks, rubric-based evaluations, CI checks, and user feedback, while selectively using smaller decision models for classification workloads. The approach improves access to analytics and reduces the distance between insight and action, but requires continuing data engineering, warehouse optimization, guardrails, evaluation maintenance, and human validation."
link: "https://www.youtube.com/watch?v=bGMiRmXbRUs"
year: 2026
seo:
  title: "Rippling: Building an AI-Native Growth Operations Platform - ZenML LLMOps Database"
  description: "Rippling developed an internal AI platform to help revenue operations, marketing, sales, finance, and other go-to-market teams turn warehouse data into operational decisions. The system evolved from deterministic retrieval tools that supplied curated data to agents, to text-to-SQL capabilities that let agents investigate questions across the company’s warehouse and generate campaign, account, and strategy recommendations. A web application and horizontally scalable backend run agent loops that may issue multiple SQL queries, validate generated SQL, retrieve bespoke aggregate datasets, and synthesize results. Rippling evaluates changes through engineering benchmarks, rubric-based evaluations, CI checks, and user feedback, while selectively using smaller decision models for classification workloads. The approach improves access to analytics and reduces the distance between insight and action, but requires continuing data engineering, warehouse optimization, guardrails, evaluation maintenance, and human validation."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-native-growth-operations-platform"
  ogTitle: "Rippling: Building an AI-Native Growth Operations Platform - ZenML LLMOps Database"
  ogDescription: "Rippling developed an internal AI platform to help revenue operations, marketing, sales, finance, and other go-to-market teams turn warehouse data into operational decisions. The system evolved from deterministic retrieval tools that supplied curated data to agents, to text-to-SQL capabilities that let agents investigate questions across the company’s warehouse and generate campaign, account, and strategy recommendations. A web application and horizontally scalable backend run agent loops that may issue multiple SQL queries, validate generated SQL, retrieve bespoke aggregate datasets, and synthesize results. Rippling evaluates changes through engineering benchmarks, rubric-based evaluations, CI checks, and user feedback, while selectively using smaller decision models for classification workloads. The approach improves access to analytics and reduces the distance between insight and action, but requires continuing data engineering, warehouse optimization, guardrails, evaluation maintenance, and human validation."
notion:
  pageId: "3f4f8dff-2538-803a-a8fe-e98ba47a5a81"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:48:00.000Z"
  lastEditedTime: "2026-10-09T08:49:00.000Z"
  publishedAt: "2026-10-09T08:52:31Z"
---

## Overview

Rippling built an internal AI-native growth operations system for revenue operations, marketing, sales, finance, and related go-to-market teams. The objective was not simply to make reports conversational. It was to put analytics into the path of daily operations so that a user could ask what is working, investigate the underlying data, and receive recommendations or campaign material grounded in Rippling’s own business context. The system is intended to serve a large internal user base working across many product lines, segments, sales teams, personas, and communication sequences.

The platform evolved incrementally rather than replacing the existing data stack. Rippling retained its applications, enrichment providers, ingestion pipelines, warehouse, transformation jobs, and BI systems, then added retrieval and agent capabilities on top. Early implementations exposed deterministic retrieval tools backed by human-written SQL. Later versions allowed agents to generate SQL for exploratory questions. The resulting system can gather information from curated tables and a semantic layer, analyze it through an agent loop, and produce outputs such as campaign recommendations, account plans, market analysis, and email-copy suggestions. The claims described are primarily qualitative: the system increases the speed and accessibility of analysis, but it also introduces query cost, operational complexity, and the need for rigorous evaluation.

## Problem and Use Case

Rippling’s conventional analytics workflow followed a familiar enterprise pattern. Data arrived from product and business applications, website and email systems, external enrichment providers, and other data sources. ELT or ETL processes loaded and transformed that information in a warehouse, with SQL models and dependency graphs building tables such as qualified-lead datasets or other derived business metrics. BI tools then exposed reports and dashboards to sales and marketing users.

This architecture provided data but did not always make the data actionable. Users had to locate the appropriate report, understand its definitions, interpret the results, and agree that it represented the source of truth. Even apparently simple changes could require new warehouse transformations, additional joins, or analyst and data-engineering work. At Rippling’s scale, questions about email volume, conversion, audience segments, sequence titles, sales-team performance, and the number of touches in a sequence span many dimensions and product lines.

The internal AI system addresses this operational gap. A user can ask a business question in natural language and have an agent collect relevant evidence, summarize findings, and use the results in a downstream workflow. For example, an agent can analyze historical performance and related audience information before recommending copy for a new campaign. The intent is to let human sales and marketing professionals spend less time gathering and organizing information while retaining responsibility for the customer-facing work.

## Architecture and System Evolution

The first AI implementation used retrieval as a tool. A human-defined function represented a known business query, and deterministic application code executed the SQL and placed the resulting data into the agent’s context. This design constrained the data access path and reused existing warehouse logic. It also made the initial system closer to an AI-assisted application than an unconstrained conversational analytics product: the model could reason over retrieved results, but it did not independently invent the database query.

The next phase introduced text-to-SQL. Agents could translate a user’s question into SQL, execute a series of queries, inspect the returned data, and decide whether the evidence adequately answered the question. The user population included rev ops, marketing, sales, finance, and other internal teams rather than Rippling’s external customers or the engineering organization itself. The agent therefore had to handle both business-language ambiguity and a complex internal data model.

The system uses a web application connected to horizontally scalable backend services running in Rippling’s internal cloud infrastructure. Requests are processed through an interactive path, with backend pods handling application and agent workloads. The agent loop is probabilistic and may issue roughly five to twenty SQL queries for a question, depending on its complexity and familiarity. It then analyzes the results, forms a response, and performs a self-check about whether the question was answered. This is materially different from a cached BI dashboard: a dashboard can reuse a known query and cached result, whereas an agent may generate a new sequence of warehouse operations for every request.

Rippling also maintains curated skills, prompts, mappings, and relationships between warehouse tables. These structures function as a practical semantic layer, even though they are not described as a complete automated ontology. They give the agent information about the meaning of tables and fields, preferred retrieval paths, and relevant business concepts. Frequently requested datasets can receive dedicated tools backed by bespoke aggregated tables. Those tables are built through conventional data engineering, including joins and data pipelines, so the agent can use a reliable retrieval path instead of repeatedly reconstructing an expensive query.

## Query Safety and Data Engineering

The dynamic SQL workflow creates a new load profile for the warehouse. Traditional BI queries are generally known in advance, can be scheduled or batched, and may benefit from warehouse and BI-layer caching. An agent can generate inefficient or redundant queries and execute several of them during a single interaction. Rippling therefore had to add SQL validation and improve retrieval efficiency after deploying the text-to-SQL path.

SQLGlot was used to parse and inspect generated SQL. The described use is primarily query-level analysis rather than a full database cost-based optimizer: parsing helps the system examine the structure of a query before or around execution, while broader performance improvements came from observing common access patterns and preparing suitable data products. When a question or dataset became frequent enough to justify optimization, data engineers could create rolled-up dimensions or aggregate tables and expose those datasets through explicit agent skills and tools.

This is an important LLMOps boundary. The model may provide flexible language understanding and query composition, but humans still own the warehouse schema, data definitions, access paths, transformations, and decisions about which workloads deserve materialization. The team characterized this work as an evolution of the traditional data engineer and solution-architect role. A generic product may provide a conversational interface, but it cannot automatically know which business questions will remain relevant, which definitions are authoritative, or whether a query is exploratory or likely to become part of a standard operating procedure.

## Evaluation and Model Selection

Rippling treats evaluation as part of the engineering lifecycle. Internal benchmarks, rubrics, and workload-specific tests are run as part of continuous integration for AI workloads. These tests provide release confidence before changing a model, agent behavior, retrieval strategy, or other component. Evaluation is supplemented by real-user feedback, including thumbs-up and thumbs-down signals and reports from internal feedback channels. When benchmark results look strong but users report failures, the benchmark or rubric is treated as incomplete and is revised.

The system does not assume that one model or reasoning strategy is best for every task. A decision-model approach was tested for parts of the workflow. It performed well for structured classification, where free-form business data had to be mapped into defined dimensions. The reported benefits were improved speed and lower expected cost relative to a larger general-purpose language-model path, although no exact cost figures were provided. The same approach performed poorly for a heavier text-to-SQL reasoning task: answers became less accurate and the evaluation results declined, despite the model operating within the agent loop. This illustrates why model substitution should be governed by task-specific evaluation rather than by a general assumption that a smaller or specialized model is always preferable.

The practical release process combines offline and online evidence. Engineering benchmarks and rubrics are used before deployment, while user satisfaction and observed failures provide production validation. The ultimate standard is whether the system reaches the correct ground truth and whether users can rely on and act on the output. The available account does not provide numerical accuracy, latency, adoption, warehouse-cost, or evaluation-spend metrics, so the results should be understood as an operational description rather than a quantified performance claim.

## Production Guardrails and Human Responsibility

The system is designed to assist rather than fully replace go-to-market judgment. Agents can analyze customers, markets, campaign history, and performance data, but sales and marketing professionals continue to perform the human-facing work. In some workflows, AI drafts or recommends messaging; in others, experienced sales development representatives retain control over the final email. Guardrails are used to keep outputs within the relevant business and brand context, and the team reports that remaining issues are more often slight inaccuracies or unintended outputs than wholly fabricated answers.

Rippling is also moving toward a unified internal “super app” rather than maintaining many disconnected micro-applications. A single product team can own the agent, its data access, context, skills, evaluation suite, and user-feedback loop. This makes it easier to connect user requests to product improvements and to incorporate analysis into broader feature-management, collaboration, and go-to-market processes. It also concentrates operational responsibility: failures in retrieval, schema interpretation, model behavior, or permissions can affect many workflows in one system.

## Results and Tradeoffs

The principal result is a shift from passive analytics toward interactive, action-oriented analytics. Internal users can ask questions in natural language, have agents gather evidence from structured business data, and receive recommendations in the same operational context. The system extends existing data investments rather than discarding the warehouse and BI foundation, and it supports both deterministic retrieval for known use cases and flexible text-to-SQL exploration for less predictable questions.

The tradeoff is that flexibility increases infrastructure and governance requirements. Agent loops can generate multiple warehouse queries, some of which may be inefficient. Semantic mappings and curated skills need maintenance. Frequently used data often requires human-designed aggregate tables and explicit tools. Benchmarks must evolve with real user behavior, and model changes need regression testing because a strategy that works for classification may fail for multi-step reasoning. The case therefore demonstrates a production pattern in which LLMs add a natural-language and reasoning layer to established data systems, while conventional data engineering, query controls, evaluation, and human oversight remain essential to making that layer dependable.
