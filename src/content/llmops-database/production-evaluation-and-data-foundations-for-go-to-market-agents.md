---
title: "Production Evaluation and Data Foundations for Go-to-Market Agents"
slug: "production-evaluation-and-data-foundations-for-go-to-market-agents"
draft: false
llmopsTags:
  - "data-analysis"
  - "data-integration"
  - "classification"
  - "question-answering"
  - "unstructured-data"
  - "agent-based"
  - "evals"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "langchain"
  - "postgresql"
  - "databases"
  - "monitoring"
  - "guardrails"
  - "scalability"
  - "reliability"
industryTags: "tech"
company: "Clay"
summary: "Clay operates AI agents for go-to-market research, lead discovery, workflow construction, and data analysis at substantial production scale. Claygent performs public-web and first-party-data research, while Sculptor builds and orchestrates workflows and can use Clay’s company and contact database for prospecting. As usage grew to more than 300 million Claygent runs per month and over 100,000 weekly Sculptor messages, Clay replaced comparatively weak early evaluations with a layered evaluation program spanning deterministic checks, structured assertions, LLM judges, multi-turn tests, online behavioral metrics, and human review. The company is also consolidating traces and operational data in a data lake with shared tools, CLI and API access, isolated development compute, and agent-oriented guardrails, aiming to create a feedback loop in which production evidence improves agents and their evaluation suites. The approach improves the organization’s ability to change prompts and agent behavior safely, although production drift, judge bias, evaluation noise, and the operational complexity of long-running agents remain unresolved risks."
link: "https://www.youtube.com/watch?v=Uny6LpmjraI"
year: 2023
seo:
  title: "Clay: Production Evaluation and Data Foundations for Go-to-Market Agents - ZenML LLMOps Database"
  description: "Clay operates AI agents for go-to-market research, lead discovery, workflow construction, and data analysis at substantial production scale. Claygent performs public-web and first-party-data research, while Sculptor builds and orchestrates workflows and can use Clay’s company and contact database for prospecting. As usage grew to more than 300 million Claygent runs per month and over 100,000 weekly Sculptor messages, Clay replaced comparatively weak early evaluations with a layered evaluation program spanning deterministic checks, structured assertions, LLM judges, multi-turn tests, online behavioral metrics, and human review. The company is also consolidating traces and operational data in a data lake with shared tools, CLI and API access, isolated development compute, and agent-oriented guardrails, aiming to create a feedback loop in which production evidence improves agents and their evaluation suites. The approach improves the organization’s ability to change prompts and agent behavior safely, although production drift, judge bias, evaluation noise, and the operational complexity of long-running agents remain unresolved risks."
  canonical: "https://www.zenml.io/llmops-database/production-evaluation-and-data-foundations-for-go-to-market-agents"
  ogTitle: "Clay: Production Evaluation and Data Foundations for Go-to-Market Agents - ZenML LLMOps Database"
  ogDescription: "Clay operates AI agents for go-to-market research, lead discovery, workflow construction, and data analysis at substantial production scale. Claygent performs public-web and first-party-data research, while Sculptor builds and orchestrates workflows and can use Clay’s company and contact database for prospecting. As usage grew to more than 300 million Claygent runs per month and over 100,000 weekly Sculptor messages, Clay replaced comparatively weak early evaluations with a layered evaluation program spanning deterministic checks, structured assertions, LLM judges, multi-turn tests, online behavioral metrics, and human review. The company is also consolidating traces and operational data in a data lake with shared tools, CLI and API access, isolated development compute, and agent-oriented guardrails, aiming to create a feedback loop in which production evidence improves agents and their evaluation suites. The approach improves the organization’s ability to change prompts and agent behavior safely, although production drift, judge bias, evaluation noise, and the operational complexity of long-running agents remain unresolved risks."
notion:
  pageId: "3ccf8dff-2538-8064-ae3b-e5fe706f6b56"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-30T21:01:00.000Z"
  lastEditedTime: "2026-08-30T21:01:00.000Z"
  publishedAt: "2026-09-04T08:05:42Z"
---

## Overview

Clay is deploying agentic features as core product interfaces for go-to-market work rather than treating them as isolated demonstrations. Claygent, launched in 2023, researches companies and prospects through the public web and can search customer-provided first-party datasets. Sculptor is a go-to-market engineering agent that helps users build, orchestrate, and analyze workflows inside Clay; its search capabilities can use Clay’s companies and contacts database to identify leads. The production challenge is not simply generating a plausible answer: the agents must complete tool-using, sometimes long-running workflows reliably while operating at a volume that makes manual inspection of every interaction impossible.

Clay reports more than 300 million Claygent runs per month and more than 100,000 messages to Sculptor each week. These figures indicate meaningful production adoption, but they are usage measures rather than independent evidence of task accuracy, business impact, or customer satisfaction. At this scale, Clay has invested in a common evaluation and data platform that lets developers modify prompts and agent behavior with greater confidence, while using production signals to update offline tests. The design combines cheap local checks with production-like CI and staging tests, online monitoring, human analysis, and a data foundation intended to support future self-improving development loops.

## Problem and Production Context

Clay’s agents perform tasks with many possible valid outputs and many possible failure paths. A research agent may need to search the web, inspect internal data, and synthesize findings. Sculptor may need to interpret a natural-language request, select tools, generate a workflow or query, and move the user from chat into other product surfaces. Search and workflow construction can fail even when the generated text sounds reasonable: the agent might use the wrong data source, omit a required tool call, produce a brittle query, get stuck in a conversation, or spend excessive time and compute.

Early evaluations for Clay’s agentic products were described as inadequate. That became a material constraint as the agents reached billions of runs in aggregate and Sculptor began completing end-to-end tasks. A developer changing a prompt needs evidence that an improvement on one example has not degraded unrelated production use cases. Manual trace review is useful for discovering issues, but cannot by itself provide coverage at Claygent’s or Sculptor’s reported volume. Clay therefore treats evaluation as a prerequisite for enabling both human developers and coding agents such as Claude, Codex, or Devin to make changes.

## Agent and Tool Architecture

Claygent combines web research, first-party-data access, and high-volume execution. Sculptor provides a more general interaction layer for building and analyzing go-to-market workflows. Clay is making product capabilities available through a command-line interface and public API in addition to its web UI. The stated goal is that actions available in the UI should also be accessible to agents through the CLI and API.

A notable architectural choice is to give internal agents and external agents the same tools. Sculptor uses the same tool surface exposed through Clay’s CLI and API. This creates a shared failure domain: when an agent invokes a tool incorrectly or a tool produces an undesirable trajectory, the issue can potentially be fixed in the tool, the agent harness, or both. It also allows user behavior and agent traces to provide feedback about the usability of the public interface. This is a useful product flywheel, but it means tool contracts, permissions, rate limits, and backward compatibility become part of the agent reliability problem.

Clay is also moving toward a data-lake architecture that brings first-party and third-party data into a common platform. The design treats agents as first-class users of that platform and adds up-front guardrails, safe shadow builds, and separation between development and serving compute. Agents can build data models and deploy them on S3 without directly destabilizing production serving systems. Athena is used for large-scale data work, while the unified foundation is intended to reduce the need for agents to coordinate across traces in LangChain, analytics in Snowflake, operational data in Postgres, and first-party data in ClickHouse.

## Evaluation System

Clay’s evaluation philosophy uses several layers rather than a single accuracy score. Local evaluations are designed to be inexpensive and fast enough for command-line development. They write results to persistent, versioned storage using LangChain, so changes made locally remain available for comparison and regression analysis. CI and staging evaluations are intended to be close to the production harness, including production-like execution behavior, while local development intentionally omits some production components such as observability and sandbox or virtual-file-system facilities. This separation helps maintain developer velocity, but it also creates a risk that local results will not fully predict production behavior.

For deterministic, offline behavior, Clay uses golden examples where exact or near-exact outputs are appropriate. Goldens work well for simple query-language cases, but they can be too rigid for complex structured outputs: harmless changes such as keyword ordering or node ordering can cause false failures. Clay is consequently moving toward structured checks that inspect only the output properties that matter. This reduces noisy failures and makes tests less likely to be ignored, although it requires carefully defining which properties are semantically important.

The suite also includes trajectory and tool assertions. For example, an agent answering a pricing question should be checked for actually reading the relevant pricing scale rather than merely producing a superficially plausible answer. These assertions evaluate the path and tool use, not only the final text. They are particularly important for agents whose correctness depends on grounding an answer in a required source or completing a prescribed workflow.

For nondeterministic offline evaluation, Clay uses LLM-as-a-judge techniques. These can assess outputs that do not have one canonical answer, but the company recognizes that judge models have their own biases. Optimizing exclusively against one judge or a small evaluation set can cause overfitting: prompts may learn the judge’s preferences or memorize the narrow examples rather than generalize to production requests.

Multi-turn behavior is tested with deterministic scripted user turns and, in some cases, simulated users. The simulated-user approach can use examples from past traces and drive an interaction toward a conclusion, but Clay found it too noisy and costly to maintain because the simulated user becomes another agent requiring management and evaluation. During development, deterministic multi-turn tests were considered more useful. This is a pragmatic tradeoff: scripted conversations provide reproducibility and lower maintenance, but may cover fewer unexpected interaction patterns.

## Online Monitoring and Learning Loops

Clay evaluates live behavior using objective product metrics such as latency and cost, as well as measures of whether users move from chat into other parts of the product, become stuck, or abandon the interaction. It also uses online evaluators for signals such as user satisfaction or NPS-like feedback and for detecting when users correct, challenge, or redirect the agent. These behavioral signals are valuable because they expose failures that curated test cases may miss, although they are indirect proxies: a user’s correction can reflect a product misunderstanding, a preference, or a genuine factual error.

Production traces are bulk-analyzed with LangChain capabilities, and humans manually review selected traces. Customer-support tickets supply high-signal examples of problems encountered by real users. Clay also maintains human-annotated goldens to detect judge drift, uses chains and use-case classifiers, and tags production requests so that offline evaluations represent the actual distribution of workloads. The intended direction is a closed loop: observe production behavior, classify and annotate failures, add representative cases to offline suites, make a change, and re-run the relevant evaluation layers before release.

## Results and Tradeoffs

The clearest reported result is organizational and operational rather than a measured improvement in model accuracy. Evaluation moved from a weak early state to a comprehensive framework considered necessary for safely developing long-running agents at scale. Shared harnesses allow new product areas to bring their own test cases and evaluators while reusing common infrastructure. The CLI approach also makes evaluation accessible during normal development instead of requiring a separate experiment setup.

The system remains a work in progress. Clay explicitly identifies evaluation drift and production drift as unsolved problems. Data drift occurs when real customer tasks differ from the scenarios used during internal testing. Judge drift occurs when model behavior or evaluator preferences change, or when optimization overfits a particular LLM judge. A small or static test set can similarly encourage prompt overfitting. Long-running agent tasks add latency, cost, state-management, and failure-recovery concerns that simple final-answer tests will not capture.

The data-lake investment is intended to make these feedback loops scalable by giving agents access to traces, customer signals, and operational data in one place and by allowing large datasets to be analyzed through isolated compute. The claimed future state is a self-iterating platform in which agents reason over accumulated data and help build improved models, tools, and workflows. That ambition should be assessed cautiously: centralizing data and exposing it to agents can improve iteration speed, but it also increases the importance of access control, data quality, privacy, reproducibility, cost governance, and safeguards against agents deploying incorrect data models. Within the evidence available, Clay’s strongest LLMOps contribution is its layered, production-connected evaluation discipline and its effort to align internal and external agent tooling, rather than a demonstrated benchmark improvement or guaranteed autonomous optimization.
