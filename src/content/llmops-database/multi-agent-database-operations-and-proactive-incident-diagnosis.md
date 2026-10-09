---
title: "Multi-Agent Database Operations and Proactive Incident Diagnosis"
slug: "multi-agent-database-operations-and-proactive-incident-diagnosis"
draft: false
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "realtime-application"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "memory"
  - "human-in-the-loop"
  - "fallback-strategies"
  - "latency-optimization"
  - "system-prompts"
  - "mcp"
  - "token-optimization"
  - "monitoring"
  - "databases"
  - "open-source"
  - "security"
  - "guardrails"
  - "cache"
  - "reliability"
  - "orchestration"
  - "amazon-aws"
industryTags: "hr"
company: "CornerStone On Demand"
summary: "CornerStone On Demand built Orion AI to reduce the manual effort involved in diagnosing database incidents, managing database lifecycles, and coordinating DataOps and SRE workflows. The production system uses Amazon Bedrock, Strands Agents, specialized domain agents, hybrid keyword and semantic routing, MCP and API-based tool integrations, retrieval-augmented generation, memory controls, guardrails, and AWS observability services. According to the AWS-published case study, diagnosis time fell from approximately 45 minutes to 10 minutes, manual lifecycle work was reduced from more than 10 steps to one interaction, SRE-to-data-team reporting became real time, and redundant alerts decreased by a median of 65%; these results are vendor-reported and the text does not provide independent validation, workload volume, error rates, or cost data."
link: "https://aws.amazon.com/blogs/machine-learning/how-cornerstone-ondemand-cut-database-diagnosis-by-78-with-amazon-bedrock/"
year: 2026
seo:
  title: "CornerStone On Demand: Multi-Agent Database Operations and Proactive Incident Diagnosis - ZenML LLMOps Database"
  description: "CornerStone On Demand built Orion AI to reduce the manual effort involved in diagnosing database incidents, managing database lifecycles, and coordinating DataOps and SRE workflows. The production system uses Amazon Bedrock, Strands Agents, specialized domain agents, hybrid keyword and semantic routing, MCP and API-based tool integrations, retrieval-augmented generation, memory controls, guardrails, and AWS observability services. According to the AWS-published case study, diagnosis time fell from approximately 45 minutes to 10 minutes, manual lifecycle work was reduced from more than 10 steps to one interaction, SRE-to-data-team reporting became real time, and redundant alerts decreased by a median of 65%; these results are vendor-reported and the text does not provide independent validation, workload volume, error rates, or cost data."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-database-operations-and-proactive-incident-diagnosis"
  ogTitle: "CornerStone On Demand: Multi-Agent Database Operations and Proactive Incident Diagnosis - ZenML LLMOps Database"
  ogDescription: "CornerStone On Demand built Orion AI to reduce the manual effort involved in diagnosing database incidents, managing database lifecycles, and coordinating DataOps and SRE workflows. The production system uses Amazon Bedrock, Strands Agents, specialized domain agents, hybrid keyword and semantic routing, MCP and API-based tool integrations, retrieval-augmented generation, memory controls, guardrails, and AWS observability services. According to the AWS-published case study, diagnosis time fell from approximately 45 minutes to 10 minutes, manual lifecycle work was reduced from more than 10 steps to one interaction, SRE-to-data-team reporting became real time, and redundant alerts decreased by a median of 65%; these results are vendor-reported and the text does not provide independent validation, workload volume, error rates, or cost data."
notion:
  pageId: "3f4f8dff-2538-80a6-aec0-ea4527e8e2cb"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:42:00.000Z"
  lastEditedTime: "2026-10-09T08:42:00.000Z"
  publishedAt: "2026-10-09T08:53:17Z"
---

## Overview

CornerStone On Demand, a global workforce-readiness software provider serving 140 million users across 186 countries, applied generative AI to an internal Enterprise DataOps problem rather than to an end-user content workflow. Its engineers previously spent up to approximately 45 minutes investigating each database incident, navigating system views, logs, APIs, and handoffs between teams. Database lifecycle activities also involved more than 10 manual steps, while periodic reporting and duplicate alerts created operational delay and noise.

The resulting system, Orion AI, is a production-oriented multi-agent application for database operations. A coordinating agent routes requests to narrowly scoped specialist agents that inspect live infrastructure, retrieve approved runbook knowledge, perform diagnostics, recommend remediation, and create or populate Jira work items. The AWS case study reports diagnosis time decreasing from 45 minutes to 10 minutes, a 70% reduction in manual lifecycle steps, elimination of the stated 15-minute reporting lag, and a median 65% reduction in redundant alerts. These outcomes should be treated as claims from an AWS and customer-authored success story: the source does not disclose baseline incident volumes, evaluation methodology, false-positive or false-negative rates, operating costs, or independent verification.

## Problem and production context

Before Orion AI, database performance investigations required engineers to connect to an affected SQL Server instance, query system views for blocking chains and wait types, examine long-running queries, cross-reference logs, and form a root-cause hypothesis. The workflow crossed multiple tools and teams. A separate database lifecycle process required repeated connection setup, cross-system queries, validation, status communication, and handoff. The SRE and data teams also operated with a 15-minute reporting lag, and overlapping alerts made it harder to identify important signals.

This is a consequential production setting. Incorrect or stale advice can lead to unnecessary escalations, missed incidents, or disruptive database actions. Orion AI therefore does not appear to be designed as an unrestricted autonomous operator. The system is intended to automate investigation and coordination while retaining approval gates for destructive actions and asking engineers to validate reported findings.

## Architecture and orchestration

Orion AI uses a hub-and-spoke topology deployed as containerized services on Amazon Elastic Container Service. The hub is a Strands Agents `Agent` instance acting as a meta-orchestrator, also described as the TaskExecutor. It has routing and control-flow tools rather than a broad collection of operational tools. Its responsibilities include finding relevant agents, calling those agents, emitting plan steps, and emitting confirmation gates. Specialist agents are loaded lazily through a decorator-based registry and run with their own model configuration, localized system prompts, and domain-specific tools.

The system contains 13 domain-specific agents. Examples include infrastructure monitoring, database diagnostics, session blocking analysis, real-time SQL diagnostics, lifecycle management, customer analytics, knowledge retrieval, notification routing, compound query decomposition, Availability Group listener resolution, and model connection warm-up. The three SQL Server agents divide the investigation by operational responsibility. One surfaces blocking chains, wait types, and long-running queries and translates the findings into business impact. Another investigates multi-step blocking relationships to identify a root blocker and prioritize possible responses. A third reads live blocking and high-CPU data through CornerStone On Demand's DATAOPS API, answering what is true at the current moment.

This domain decomposition is an LLMOps design choice. Instead of giving one model every tool and every operational responsibility, each agent receives a narrower context and tool surface. The stated rationale is improved tool selection and less context bloat. It may also make ownership and testing more manageable, although the source does not report comparative accuracy or latency measurements against a single-agent baseline.

## Models, routing, and retrieval

Amazon Bedrock supplies managed access to foundation models for the agents. Strands Agents provides the orchestration abstractions, including the `Agent` class, `BedrockModel` wrapper, tool-calling loops, and `MCPClient` connectivity. Tools are ordinary Python functions decorated with `@tool`; type hints and docstrings are used to derive the tool specification, reducing the need to maintain a separate schema.

Request routing uses a hybrid strategy. Approximately 80% of queries use an in-memory keyword fast path that the source says resolves in under one millisecond. Requests that are ambiguous or cannot be reliably matched by keywords fall back to semantic search using Amazon Titan Text Embeddings V2. When direct tool invocation is not appropriate, Amazon Bedrock Knowledge Bases provides retrieval-augmented generation over operational documentation. This is intended to ground responses in approved procedures rather than relying only on model-generated knowledge.

The combination of deterministic routing for predictable requests and semantic routing for ambiguous ones is a practical latency and reliability tradeoff. It limits unnecessary model-mediated routing for common intents while preserving a meaning-based fallback. However, the case study does not state how routing accuracy was measured, how frequently the semantic fallback is used, or how incorrect agent selection is detected and corrected. Those would be important production evaluation signals for a comparable implementation.

## Tool integration and data access

The agents connect to operational data through both the Model Context Protocol and direct service integrations. Shared tools, including real-time SQL diagnostics, are exposed through a Portal-Tools MCP server. A Strands tool function communicates with the MCP server over streamable HTTP, and the server reaches SQL Server and the DATAOPS API. Jira integration uses the same general MCP pattern through external Atlassian MCP tools.

Other systems use direct SDK or REST calls when a shared MCP interface is unnecessary. The source specifically identifies metrics and dashboards, on-call schedules, and Bedrock Knowledge Bases accessed through the AWS SDK for Python, or Boto3. This split allows shared capabilities to be centralized while keeping simpler integrations lightweight. Connections use TLS, and MCP tokens and REST authorization credentials are supplied per request rather than embedded in agent code, which is a relevant secret-management and deployment practice.

In the operational workflow, Orion AI can investigate an incident, identify a likely root cause, recommend a fix, and create a populated Jira ticket assigned to the appropriate on-call engineer. The reported user experience collapses a multi-step handoff into one interaction, but the text still expects engineers to validate findings and does not claim that every remediation is executed autonomously.

## Memory and freshness controls

Orion AI uses three context tiers. Short-term, same-session context is stored in Amazon DynamoDB alongside a rolling conversation summary generated asynchronously by Amazon Nova 2 Lite. Cross-session memory is provided through Amazon Bedrock AgentCore memory and is namespaced by user ID. On task completion, the system calls `create_event` to trigger extraction, summarization, and consolidation. A third, ephemeral inter-agent memory acts as a scratchpad for passing findings between sub-agent steps within a single task.

A central memory manager retrieves from the tiers in parallel, with separate timeouts and token allocations. The stated hard limit is 500 milliseconds and a 4,000-token budget, supported by a least-recently-used cache. The most important freshness control is that requests about current system state bypass conversational memory and query live tools directly. This prevents an old conversation summary or recalled incident from being treated as current database truth. It is a strong example of separating contextual convenience from authoritative operational state.

The design also introduces operational concerns that would need continuing monitoring: memory extraction quality, cross-session data isolation, token-budget pressure, cache invalidation, and the risk that summaries omit important technical details. The source identifies encryption at rest for DynamoDB and user-based namespacing for AgentCore memory, but it does not provide retention periods, deletion workflows, access-audit results, or quantitative tests of memory leakage.

## Safety, governance, and observability

Because database operations can be disruptive, Orion AI uses custom controls in addition to generic content filtering. Prompt-level constraints discourage dangerous recommendations, such as terminating critical database processes, and favor non-disruptive methods. A human-in-the-loop confirmation gate pauses destructive actions until the user confirms within five minutes; if the timeout expires, the default is denial.

Additional controls cover input length limits, prompt-injection and SQL-injection blocking, output sanitization, secret and personally identifiable information redaction, rate limiting, role-based access control, and per-request cost tracking. Routing-level protection prevents operational questions from being answered from memory and forces live tool execution for current-state requests. These controls address different failure modes, but the source does not describe their test suites, bypass rates, policy versioning, or how permissions are mapped to individual tools. Those details would be necessary to establish whether the safeguards are effective in a regulated or highly critical production environment.

Amazon CloudWatch supplies metrics and structured logs for routing confidence, latency, and agent invocation activity. AWS X-Ray traces distributed calls across agent executions, allowing teams to inspect an end-to-end request path. Together, these services provide the basic observability needed to debug multi-agent workflows, attribute latency, and identify failing integrations. A mature operating model would also normally track tool-call success, escalation rates, grounded-answer quality, confirmation frequency, remediation outcomes, and model or prompt regressions; the case study only explicitly reports the AWS observability components and the headline operational results.

## Results and tradeoffs

The reported before-and-after results are substantial: diagnosis time decreased from 45 minutes to 10 minutes, manual lifecycle work changed from more than 10 steps to one interaction, SRE-to-data-team reporting changed from a 15-minute lag to instantaneous visibility, and redundant alerts fell by a median of 65%. A three-person team reportedly delivered the system in six months. These figures suggest that the largest benefit came from orchestrating existing data and operational tools, not from asking a model to replace database telemetry or engineering judgment.

The principal tradeoff is architectural complexity. Thirteen agents, multiple model calls, MCP and REST integrations, memory tiers, routing logic, confirmation gates, and distributed tracing create more components to deploy and debug than a conventional automation script. Model behavior can also vary, and a routing error can send a request to the wrong specialist. Narrow agent boundaries, live-data bypasses, explicit approvals, and traceability mitigate these risks, but they do not remove the need for regression tests, access reviews, incident response, and ongoing evaluation.

CornerStone On Demand selected ECS because the managed AgentCore runtime was not available when the project began and was evaluating a future migration as capabilities matured. This highlights a practical LLMOps consideration: teams may need to deploy on stable, available infrastructure while preserving interfaces that permit later migration. Overall, Orion AI is a credible example of production GenAI used as a governed coordination and investigation layer for DataOps. Its strongest reusable patterns are domain-scoped agents, hybrid routing, live-state retrieval, explicit human approval for disruptive actions, and end-to-end operational observability; its published evidence remains limited to the reported metrics and architecture description.
