---
title: "Building a Self-Repairing Single-Agent Data Analyst"
slug: "building-a-self-repairing-single-agent-data-analyst"
draft: false
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "visualization"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "prompt-engineering"
  - "system-prompts"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "databricks"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Databricks"
summary: "Databricks redesigned its Genie Spaces data-analysis agent after finding that a supervisor coordinating multiple SQL sub-agents lost context, duplicated work, increased token usage, and could produce inconsistent answers. The production architecture instead uses one agent with composable SQL and response tools, allowing it to retain results across investigative steps, state definitions and assumptions, maintain a flexible checklist of hypotheses, generate visualization-oriented queries, and recover from SQL errors using actionable feedback. Databricks reports that this design reduced latency and cost while improving answer quality, consistency, and the agent's ability to complete complex data questions, although the discussion provides no quantitative benchmarks or independent evaluation results."
link: "https://www.youtube.com/watch?v=Zp9e7d2YsGc"
year: 2026
seo:
  title: "Databricks: Building a Self-Repairing Single-Agent Data Analyst - ZenML LLMOps Database"
  description: "Databricks redesigned its Genie Spaces data-analysis agent after finding that a supervisor coordinating multiple SQL sub-agents lost context, duplicated work, increased token usage, and could produce inconsistent answers. The production architecture instead uses one agent with composable SQL and response tools, allowing it to retain results across investigative steps, state definitions and assumptions, maintain a flexible checklist of hypotheses, generate visualization-oriented queries, and recover from SQL errors using actionable feedback. Databricks reports that this design reduced latency and cost while improving answer quality, consistency, and the agent's ability to complete complex data questions, although the discussion provides no quantitative benchmarks or independent evaluation results."
  canonical: "https://www.zenml.io/llmops-database/building-a-self-repairing-single-agent-data-analyst"
  ogTitle: "Databricks: Building a Self-Repairing Single-Agent Data Analyst - ZenML LLMOps Database"
  ogDescription: "Databricks redesigned its Genie Spaces data-analysis agent after finding that a supervisor coordinating multiple SQL sub-agents lost context, duplicated work, increased token usage, and could produce inconsistent answers. The production architecture instead uses one agent with composable SQL and response tools, allowing it to retain results across investigative steps, state definitions and assumptions, maintain a flexible checklist of hypotheses, generate visualization-oriented queries, and recover from SQL errors using actionable feedback. Databricks reports that this design reduced latency and cost while improving answer quality, consistency, and the agent's ability to complete complex data questions, although the discussion provides no quantitative benchmarks or independent evaluation results."
notion:
  pageId: "3f4f8dff-2538-80f3-9783-d4cc42153e3b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:38:00.000Z"
  lastEditedTime: "2026-10-09T08:38:00.000Z"
  publishedAt: "2026-10-11T09:45:51Z"
---

## Overview

Databricks built Genie Spaces as a production data-analysis agent for developers and business users who want to ask questions about data in natural language and receive business-oriented answers. The system translates questions into SQL research steps, interprets the results, and produces a final response that can include concise tables or visualizations. The central architectural lesson is that a single agent with small, composable tools was more effective than an initial supervisor-and-sub-agent design for questions whose steps have strong dependencies.

The earlier design decomposed a question into separate SQL-oriented sub-agents. For a question such as whether a customer is among the company's best customers, one sub-agent might validate the customer's identity, another might calculate comparative performance, and another might assess loyalty status. In practice, the agents did not reliably share all relevant context. If the requested customer did not exist under the exact name supplied, every downstream agent could repeat the same discovery work or attempt analysis against an empty result. Databricks replaced this with a single agentic loop that sees the result of every tool call, can revise its approach, and can use the accumulated evidence to form one coherent answer.

## Problem and Initial Architecture

The initial Genie architecture used a supervisor agent to coordinate specialized SQL execution agents. This resembles a conventional multi-agent decomposition: a planner assigns subtasks and independent workers return natural-language results. The approach offers conceptual separation and could be useful where tasks are genuinely independent, but it introduced an information-transfer boundary between related investigative steps. A fact discovered by one sub-agent, such as a canonical customer name, had to be explicitly summarized and passed to another model before it could be used.

That boundary created several production risks. Important context could be lost or paraphrased incorrectly, and each sub-agent could independently select definitions or assumptions. The architecture also spent additional model calls and output tokens on directing one agent to communicate with another. For complex analysis, such as investigating why revenue fell in a particular month, the accumulated loss of context could lead to inconsistent reasoning or unsupported conclusions. Databricks therefore treated the ability to maintain shared state across dependent steps as more important than maximizing decomposition.

## Single-Agent Tool Architecture

The revised design starts with a basic agent that has a small set of tools, most importantly tools for executing SQL and producing a response. The agent executes SQL consecutively and receives the result of each statement in the same working context. It can first search for an exact customer name, inspect an empty result, try an alternate representation, and discover that “Nick Bruce” is stored as “Nicholas Bruce.” Only after establishing the relevant entity does it proceed to calculate financial metrics or compare the customer with others.

This pattern makes intermediate findings first-class state rather than prose that must be handed between agents. It also allows the model to decide that additional discovery queries are necessary before analysis begins. The design is intended to exploit the capabilities of foundation models from Anthropic and OpenAI, which are trained to operate in iterative tool-use loops and connect observations across calls. The presentation characterizes tools as generally deterministic, structured, faster, and focused on one action, while sub-agents are model-driven, slower, and more likely to accept or return unstructured natural language. That distinction is useful operationally, although the actual reliability of a tool still depends on query generation, database behavior, result shaping, and execution controls.

A further benefit is that the same agent handles both research and presentation. After finding the evidence needed for an answer, Genie can execute additional SQL designed to support a coherent visualization or readable result rather than treating visualization as an incidental output of another reporting component. This provides more control over the relationship between the analysis, the selected data, and the final presentation.

## Managing Definitions and Long Context

A basic loop can still degrade as its context grows. More SQL calls may provide broader investigation, but they also create more opportunities for the model to apply slightly different definitions in different queries. For example, terms such as engagement, shared chat, or a change in customer lifetime value may have multiple reasonable interpretations. If the model silently chooses different interpretations across a long investigation, the final report can be internally inconsistent even when every individual query is syntactically valid.

Genie addresses this by asking the agent to state important definitions and assumptions explicitly before or during the analysis. A user can inspect the operational meaning assigned to a business term and decide whether it is appropriate. The explicit specification also gives the model a clearer target for SQL generation. This is a trust and quality mechanism rather than a guarantee of correctness: a stated definition can still be wrong, incomplete, or unsupported by the available data, so users and downstream evaluation should continue to validate it.

## Flexible Planning with Checklists

The system also uses a checklist to retain the planning benefits of a planner agent without returning to rigid multi-agent orchestration. At the beginning of a complex investigation, Genie proposes hypotheses or analytical relationships to examine. For a suspected revenue spike or a decline in gold-tier customer lifetime value, relevant dimensions might include time, geography, customer segment, demographics, or interactions among those dimensions.

The checklist is deliberately mutable. Completed tasks are marked as investigated, unsupported assumptions can be canceled, newly discovered patterns can add new tasks, and gaps in the data can be recorded for further exploration. This combines structure with adaptive execution. A fixed plan could force the model to spend SQL calls on an invalid premise, while an entirely unstructured loop could drift or overlook important angles. The checklist is therefore an explicit control state that helps the model remain on track while preserving the ability to revise its investigation as evidence changes.

## Error Handling and Progressive Disclosure

Databricks treats production errors as opportunities to guide the agent rather than merely as failures to report. SQL can fail because of syntax mistakes, incompatible join columns, or queries that exceed execution time because the model underestimated table size. Instead of returning only a generic failure, the tool result should explain the operational cause and provide a targeted suggestion, such as selecting fewer rows or changing the join strategy. The agent can then make a concrete correction within the same execution loop.

This approach avoids placing every possible SQL rule and database-specific exception in the system prompt. Such a prompt would be expensive and difficult to maintain, and most guidance would be irrelevant to any individual task. Actionable error messages implement progressive disclosure: domain expertise is revealed only when the corresponding failure occurs. This can reduce token consumption while making feedback more relevant. The same principle applies to successful calls. If a result is truncated to 50 rows, the tool output can explicitly say that additional rows were omitted. That signal helps the agent understand that it needs aggregation, filtering, pagination, or a narrower query rather than assuming the displayed sample is complete.

## Production Outcomes and Tradeoffs

Databricks states that the single-agent architecture reduced latency and cost and improved output quality for Genie users. It also describes better handling of difficult questions because the agent can define terms, execute and inspect successive SQL statements, revise its checklist, and self-repair before producing a final response. These are plausible benefits of eliminating redundant agent-to-agent communication and retaining shared context, but the available account does not provide numerical latency, cost, accuracy, failure-rate, or user-satisfaction measurements. The claims should therefore be treated as reported engineering outcomes rather than independently verified benchmark results.

The architecture has tradeoffs. A single long-running agent can accumulate context, make many database calls, and consume substantial resources if guardrails are weak. It may also be harder to isolate responsibilities or parallelize truly independent work than in a multi-agent design. Mutable checklists and self-repair can lead to open-ended investigation unless execution time, query count, token usage, and database-cost limits are enforced. Explicit definitions improve transparency but do not by themselves ensure semantic correctness. In a production deployment, these mechanisms would ideally be paired with SQL validation, permissions and data-access controls, query timeouts, result-size limits, trace logging, regression tests, and evaluation sets covering entity resolution, metric definitions, incomplete data, visualization suitability, and recovery from representative database errors.

Overall, Genie Spaces illustrates an LLMOps pattern for analytical agents: begin with one model-driven loop and deterministic tools, preserve shared execution state, expose assumptions, maintain an adaptive plan, and turn runtime failures into precise feedback. The design favors a smaller number of capable components over premature sub-agent decomposition, while leaving room to add specialized tools when production evidence demonstrates that a separate component provides value without creating harmful context boundaries.
