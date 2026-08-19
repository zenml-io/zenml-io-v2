---
title: "Building Agent-First Data Infrastructure with Comprehensive Evaluation Frameworks"
slug: "building-agent-first-data-infrastructure-with-comprehensive-evaluation-frameworks"
draft: false
llmopsTags:
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "code-generation"
  - "question-answering"
  - "prompt-engineering"
  - "evals"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "system-prompts"
  - "fastapi"
  - "postgresql"
  - "docker"
  - "kubernetes"
  - "cicd"
  - "api-gateway"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "openai"
  - "meta"
  - "databricks"
  - "hugging-face"
industryTags: "tech"
company: "Bauplan"
summary: "Bauplan, a data infrastructure company built for agents as first-class users, developed a comprehensive evaluation framework for LLM coding agents working on data engineering tasks. The company created 700 evaluation tasks derived from real-world customer usage patterns, significantly more than competing frameworks from Supabase (20+ tasks) and Snowflake (100 tasks). By leveraging their Git-for-data architecture that enables deterministic verification of agent actions through API-first design and branch immutability, Bauplan optimized agent performance through automated skill improvement using the DSPy optimizer. Results showed that optimized skills improved performance across all models, and surprisingly, open-source models like DeepSeek could achieve results comparable to frontier models like Claude Opus at one-third the cost when working with properly designed agent-first infrastructure."
link: "https://www.youtube.com/watch?v=3JvR0Wb3XWg"
year: 2026
seo:
  title: "Bauplan: Building Agent-First Data Infrastructure with Comprehensive Evaluation Frameworks - ZenML LLMOps Database"
  description: "Bauplan, a data infrastructure company built for agents as first-class users, developed a comprehensive evaluation framework for LLM coding agents working on data engineering tasks. The company created 700 evaluation tasks derived from real-world customer usage patterns, significantly more than competing frameworks from Supabase (20+ tasks) and Snowflake (100 tasks). By leveraging their Git-for-data architecture that enables deterministic verification of agent actions through API-first design and branch immutability, Bauplan optimized agent performance through automated skill improvement using the DSPy optimizer. Results showed that optimized skills improved performance across all models, and surprisingly, open-source models like DeepSeek could achieve results comparable to frontier models like Claude Opus at one-third the cost when working with properly designed agent-first infrastructure."
  canonical: "https://www.zenml.io/llmops-database/building-agent-first-data-infrastructure-with-comprehensive-evaluation-frameworks"
  ogTitle: "Bauplan: Building Agent-First Data Infrastructure with Comprehensive Evaluation Frameworks - ZenML LLMOps Database"
  ogDescription: "Bauplan, a data infrastructure company built for agents as first-class users, developed a comprehensive evaluation framework for LLM coding agents working on data engineering tasks. The company created 700 evaluation tasks derived from real-world customer usage patterns, significantly more than competing frameworks from Supabase (20+ tasks) and Snowflake (100 tasks). By leveraging their Git-for-data architecture that enables deterministic verification of agent actions through API-first design and branch immutability, Bauplan optimized agent performance through automated skill improvement using the DSPy optimizer. Results showed that optimized skills improved performance across all models, and surprisingly, open-source models like DeepSeek could achieve results comparable to frontier models like Claude Opus at one-third the cost when working with properly designed agent-first infrastructure."
notion:
  pageId: "3c1f8dff-2538-80cb-92cc-ff7d38a651a2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:00:00.000Z"
  lastEditedTime: "2026-08-19T09:00:00.000Z"
  publishedAt: "2026-08-19T09:15:28Z"
---

## Overview

Bauplan represents a novel approach to data infrastructure that positions agents as first-class users rather than treating AI capabilities as an afterthought. The company's core thesis is that the emergence of agentic workflows represents a fundamental discontinuity in the data infrastructure market, similar to how cloud computing created opportunities for Snowflake and Databricks over legacy players like Teradata and Informatica. The presentation focuses on their systematic approach to building and evaluating LLM-based coding agents for data engineering tasks, culminating in a comprehensive open-source evaluation framework and methodology.

The typical Bauplan customer workflow involves humans prompting coding agents to perform complex data operations including data ingestion from data lakes into Iceberg tables, building transformations for downstream models, executing business queries, and maintaining data pipelines. A key architectural feature is their Git-for-data implementation that allows branching terabyte and petabyte-scale data lakes in hundreds of milliseconds. This enables agents to work on isolated branches without impacting production systems, with human review occurring before changes are merged back to production through a data equivalent of pull requests.

## Agent-First Infrastructure Design

Bauplan's infrastructure philosophy centers on enabling agents to write to production data safely rather than restricting them to read-only operations. The company argues that meaningful automation and productivity gains from AI require agents to have write access, with the challenge being how to enable this safely. Their branching mechanism is reportedly 100 times faster than Snowflake's zero-copy clone (100 milliseconds versus 10 seconds) and 200 times faster than Databricks. This performance difference becomes critical in agentic workflows where frequent branching is expected rather than occasional.

The API surface area optimization is another key differentiator. Bauplan claims their entire API surface requires approximately 50 times fewer tokens to express compared to legacy lakehouses like Databricks. This token efficiency stems from designing the API specifically for programmatic access rather than adapting human-oriented interfaces. The flat pricing model based on memory requirements rather than consumption-based pricing reflects their belief that consumption-based models become punitive in agentic scenarios where usage patterns differ significantly from human-driven workloads.

## The Evaluation Challenge

The presentation identifies three main components in an agentic setup for data engineering: the local setup including the IDE and user prompts with general system prompts and specific skills, the coding agent comprising both the harness (like Codeium, Copilot, Aider, or OpenHands) and the underlying LLM, and the lakehouse infrastructure. Bauplan argues that while they've optimized the infrastructure component, most customers have limited control over the LLM itself beyond choosing which model to use, leaving the local setup particularly the skills and prompts as the primary leverage point for optimization.

The challenge becomes measuring performance effectively to enable optimization. The company critiques existing evaluation frameworks from major players. Supabase's evaluation with approximately 20 tasks is criticized as too simple, with prompts like "Add a description text column to the products table" that most modern coding agents solve perfectly, yielding non-discriminative results where most models score 100 percent. Snowflake's data engineering benchmark errs in the opposite direction with 100 tasks that are DBT and SQL-only, ignoring critical data lifecycle stages like ingestion and data quality issues. More problematically, Snowflake's prompts average 6,000 tokens and 120 lines, providing such detailed specifications that writing the SQL manually becomes faster than crafting the prompt. This level of micromanagement doesn't reflect realistic agent usage patterns.

## Scaling Task Creation and Verification

Bauplan's approach to scaling evaluation task creation leverages their production system processing over 4.5 million jobs. They extract realistic tasks by anonymizing customer traces and generalizing patterns, supplemented by their team's data engineering experience and mining Reddit and Medium for trending data engineering topics. This yielded 700 tasks covering the full data lifecycle including ingestion, transformation, querying, and maintenance across both SQL and Python.

The more challenging aspect is scaling verification functions. Simple yes/no questions allow deterministic checking, but most data engineering tasks require complex verification. The naive approach of using LLM-as-judge runs into reliability problems where models claim to have completed tasks they didn't actually execute. Bauplan encountered real examples where a model reported task completion but verification showed no actual changes were made.

The breakthrough comes from leveraging the Git-for-data architecture. Because Bauplan's declarative pipeline definition creates an isomorphism between the DAG structure and the actual changes in the data lake, code can be analyzed to deterministically predict the exact branch changes required. For a pipeline that drops and recreates a table, imports new tables, creates additional tables, and performs a final merge, the expected state changes can be enumerated programmatically. This enables verification scripts that deterministically check branch creation, data quality constraints like null checks, confirmation that main branch wasn't touched (critical for read-only tasks), and other specific state requirements. This approach provides 100 times better verification safety and trust compared to parsing terminal output with regex or LLM-as-judge approaches.

## Optimization Methodology

With scaled tasks and deterministic verification in place, Bauplan implements an optimization loop to improve agent skills. The methodology treats system prompts and skills as textual hyperparameters that can be optimized. The workflow involves running coding agents with current Claude skills against evaluation tasks, scoring results through verification functions, feeding scores to the DSPy optimizer from Berkeley, having the optimizer improve the skills based on errors, and iterating until reaching a performance plateau where skills cannot improve further.

The entire optimization framework is released as open source, designed to work with Bauplan but architected so other systems can use it by instantiating different classes for their specific APIs. This represents Bauplan's contribution to the broader community for advancing evaluation practices in agent-based systems.

## Performance Results and Model Comparisons

The evaluation compared multiple harness and LLM combinations across two dimensions: task completion score using their verification functions and cost per task. Each agent was tested both without skills (requiring the agent to discover Bauplan functionality independently) and with optimized skills. Several key findings emerged from testing hundreds of tasks.

Skills proved universally beneficial, with all models performing better when provided Bauplan-specific optimized skills compared to working naked without guidance. However, the magnitude of benefit varied by model size. Larger frontier models demonstrated better ability to figure things out independently, while smaller models benefited more dramatically from explicit skill guidance. Most surprisingly, open-source models like DeepSeek and local Qwen achieved performance indistinguishable from Claude Opus at approximately one-third the token cost. Bauplan emphasizes they have no financial interest in promoting specific models, making this finding particularly credible as an independent assessment.

The company attributes this cost-performance efficiency to their agent-first platform design with simplified APIs, API-first architecture, and git-based data management that reduces the cognitive load on models. When infrastructure is purpose-built for agents rather than adapted from human-oriented systems, smaller and cheaper models can achieve results previously requiring frontier models.

## Production Deployment Considerations

Regarding production deployment practices, Bauplan confirms that agents do write to production data in customer environments, but with safeguards. The review process currently involves humans reviewing agent work before merging branches to production. However, the company acknowledges this may evolve as models improve, potentially enabling automated review by judge models for low-priority jobs while maintaining human review for high-priority changes.

The merge conflict handling uses a no-UID-conflict rule where branches cannot merge if they modify the same table with the same unique identifier, preventing unintentional overwrites. Telemetry shows data conflicts occur in only 0.01 percent of merges despite hundreds of thousands of weekly branches, and detected conflicts consistently represented genuine issues that required human intervention, validating the safety mechanism.

The branching model is zero-copy at the physical parquet layer, meaning materialized tables pay only for storage differences, and merges don't duplicate data, maintaining efficiency at scale. This architectural choice proves critical for agent workflows that may create numerous experimental branches.

## Practical Implications and Open Questions

Bauplan positions their work as addressing the broader industry question of optimizing agentic setups in an era where token costs are less subsidized and ROI scrutiny increases. By providing methodology for principled decision-making about model selection, skill optimization, and infrastructure design, they offer a framework applicable beyond their specific product.

The open-source release of their evaluation framework, optimization code, and detailed methodology in blog posts and academic papers represents an attempt to elevate industry practices around agent evaluation. The code is designed to be adaptable to other systems beyond Bauplan, though the presenters note that infrastructures lacking separation of compute and storage, branching capabilities, or API-first design will face challenges implementing equivalent deterministic verification.

The presentation raises important questions about the future of agent supervision, the timeline for fully automated deployments, and optimal organizational structures for incorporating agent workflows. Bauplan's infrastructure-neutral stance on model choice and commitment to supporting customer flexibility reflects a platform approach rather than attempting to lock customers into specific AI vendors.

## Critical Assessment

While the presentation makes compelling technical arguments, several claims warrant scrutiny. The 50x token efficiency claim for API surface area lacks detailed methodology for how APIs were compared. The comparison might conflate API design philosophy differences with token requirements in ways that don't reflect real-world usage patterns where APIs are abstracted through SDKs and libraries.

The criticisms of Supabase and Snowflake evaluations, while highlighting real limitations, may not fully acknowledge different design goals. Snowflake's detailed prompts might reflect enterprise scenarios where precision and avoiding side effects justify verbose specifications. Supabase's simpler tasks might target different complexity tiers appropriate for their user base.

The claim that open-source models match Claude Opus performance deserves careful interpretation. Performance equivalence on Bauplan-specific tasks doesn't necessarily generalize to other domains or data engineering scenarios. The infrastructure optimization that enables this efficiency might not transfer to environments with different architectural constraints. Additionally, the evaluation focused specifically on data engineering tasks within Bauplan's ecosystem, which may not represent the full spectrum of coding agent challenges.

The production deployment model where humans currently review all agent work before merging suggests current agent reliability remains insufficient for fully automated deployment despite high evaluation scores. This gap between evaluation performance and production readiness indicates that even comprehensive benchmarks may not capture all real-world complexity and risk.

The open-source release of evaluation frameworks is genuinely valuable for the community, though Bauplan's competitive advantage in infrastructure design means others adopting the methodology may not achieve equivalent results without similar architectural investments in branching performance, API design, and deterministic state verification capabilities.
