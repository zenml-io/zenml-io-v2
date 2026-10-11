---
title: "Scaling a Production AI Agent for API Development"
slug: "scaling-a-production-ai-agent-for-api-development"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "question-answering"
  - "structured-output"
  - "realtime-application"
  - "legacy-system-integration"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "prompt-engineering"
  - "system-prompts"
  - "model-optimization"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "monitoring"
  - "databases"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "Postman"
summary: "Postman built Agent Mode to let developers use an AI agent across API testing, documentation, discovery, and implementation within a mature product used by a global developer community. The production challenge was less about model access than about translating interface-oriented product behavior into reliable agent actions while controlling tool sprawl, context quality, latency, throughput, data handling, and cost. Postman uses Amazon Bedrock for managed foundation-model inference, model flexibility, geographically scoped cross-Region routing, model-dependent zero-data-retention configuration, and tiered prompt caching. Its architecture dynamically selects relevant tools, provides schema-aware access to structured telemetry, constructs purpose-built context, retrieves feature-specific knowledge through RAG, and requires user approval for state-changing actions. The source reports improved behavior from larger or newer models and identifies approximately 40 visible tools as a point where tool-selection errors increased, but it does not provide independent outcome metrics such as accuracy, adoption, cost reduction, or latency improvements."
link: "https://aws.amazon.com/blogs/machine-learning/how-postman-runs-agent-mode-for-40-million-developers-on-amazon-bedrock/"
year: 2026
seo:
  title: "Postman: Scaling a Production AI Agent for API Development - ZenML LLMOps Database"
  description: "Postman built Agent Mode to let developers use an AI agent across API testing, documentation, discovery, and implementation within a mature product used by a global developer community. The production challenge was less about model access than about translating interface-oriented product behavior into reliable agent actions while controlling tool sprawl, context quality, latency, throughput, data handling, and cost. Postman uses Amazon Bedrock for managed foundation-model inference, model flexibility, geographically scoped cross-Region routing, model-dependent zero-data-retention configuration, and tiered prompt caching. Its architecture dynamically selects relevant tools, provides schema-aware access to structured telemetry, constructs purpose-built context, retrieves feature-specific knowledge through RAG, and requires user approval for state-changing actions. The source reports improved behavior from larger or newer models and identifies approximately 40 visible tools as a point where tool-selection errors increased, but it does not provide independent outcome metrics such as accuracy, adoption, cost reduction, or latency improvements."
  canonical: "https://www.zenml.io/llmops-database/scaling-a-production-ai-agent-for-api-development"
  ogTitle: "Postman: Scaling a Production AI Agent for API Development - ZenML LLMOps Database"
  ogDescription: "Postman built Agent Mode to let developers use an AI agent across API testing, documentation, discovery, and implementation within a mature product used by a global developer community. The production challenge was less about model access than about translating interface-oriented product behavior into reliable agent actions while controlling tool sprawl, context quality, latency, throughput, data handling, and cost. Postman uses Amazon Bedrock for managed foundation-model inference, model flexibility, geographically scoped cross-Region routing, model-dependent zero-data-retention configuration, and tiered prompt caching. Its architecture dynamically selects relevant tools, provides schema-aware access to structured telemetry, constructs purpose-built context, retrieves feature-specific knowledge through RAG, and requires user approval for state-changing actions. The source reports improved behavior from larger or newer models and identifies approximately 40 visible tools as a point where tool-selection errors increased, but it does not provide independent outcome metrics such as accuracy, adoption, cost reduction, or latency improvements."
notion:
  pageId: "3f6f8dff-2538-8095-9a5a-ed1395ccaca6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-11T09:43:00.000Z"
  lastEditedTime: "2026-10-11T09:43:00.000Z"
  publishedAt: "2026-10-11T09:45:53Z"
---

## Overview

Postman developed Agent Mode as an AI-native interface for API testing, documentation, discovery, and implementation. The use case is materially different from a demonstration agent: it must operate inside a mature product with 11 years of accumulated interface conventions, a large and specialized feature surface, user-generated data, bursty demand, and actions that can modify application state. Postman’s central production lesson is that model quality and prompt design were not the only, or even the primary, constraints. The more difficult work involved making the product’s data, tools, state, and documentation legible to an agent without overwhelming the model or allowing an unintended action.

Agent Mode runs on Amazon Bedrock and combines client-side and server-side tools, generic agent instructions, purpose-built context handlers, a RAG knowledge base, and foundation-model inference. The design uses dynamic tool scoping, schema-based reads, context budgeting, user approval for changes, Bedrock Guardrails for optional PII redaction, cross-Region inference profiles, model-dependent retention controls, and multi-tier prompt caching. These are credible production patterns, but the source is an AWS and Postman customer-story article rather than an independent evaluation. It reports architectural observations and qualitative or internal testing findings, not independently verifiable business or reliability metrics.

## Problem and product integration

Traditional Postman usage depends heavily on navigating the interface: opening sidebars, tabs, requests, collections, and other views. An agent does not naturally reason by navigating screens; it needs direct access to entities, state, capabilities, and relevant product knowledge. Existing APIs and client tools were sometimes coupled to interface state. For example, a tool might require a request tab to be open or might open a tab as a side effect. This forces the agent to imitate UI behavior instead of reasoning over the underlying application data.

Postman therefore worked to decouple agent actions from UI state. Agent Mode can send requests in the background without an open tab, although user approval remains required. This separation is an important reliability boundary: an action should represent an explicit application operation rather than an accidental consequence of where a user interface happens to be positioned. The implementation is still evolving, and the source does not claim that all interface coupling has been eliminated.

## Tool management and orchestration

Early versions favored highly atomic tools, such as opening a request, updating one field, or retrieving a particular metadata value. Atomic tools can provide precision and control, but complex workflows then require long sequences of model-mediated calls. Each action returns to the model before the next can begin, increasing interaction time and making a single user goal appear as many visible steps.

The larger problem was tool selection. Postman reports that tool-selection errors increased when the visible toolset exceeded approximately 40 tools. Failure modes included selecting a nonexistent tool, supplying incorrect arguments despite valid schemas, or choosing a semantically plausible but contextually wrong tool. Larger or newer models reduced these errors in Postman’s testing but did not eliminate them. This is an internal observation rather than a standardized benchmark, so it should not be generalized as a universal threshold.

The current design uses a root agent to query a vector database of tool embeddings and narrow a catalog of more than 170 tools to approximately 15 relevant tools for a request. A context-isolated sub-agent then receives only the selected tools. This treats the tool catalog as part of the prompt and context budget, rather than as an unlimited capability list. It also limits the consequences of irrelevant tool descriptions competing for the model’s attention. The approach introduces its own operational dependencies, including embedding quality, retrieval errors, tool metadata maintenance, and the need to test whether relevant tools are omitted.

## Schema-aware data access

For structured products such as the API Catalog, Postman consolidated many narrow read tools into a query tool that exposes the schemas of ClickHouse data. The agent can generate queries with joins, filters, aggregations, and ordering over fields such as service uptime, test results, request counts, error rates, and latency. This replaces a potentially unbounded collection of question-specific tools with a smaller interface backed by a well-modeled data system.

The tradeoff is that the system must constrain and validate generated queries appropriately. The source emphasizes the value of modeling the data once, but it does not describe query authorization, SQL validation, resource limits, injection defenses, or a formal query-evaluation process. Those controls would be important in a production implementation, especially where generated queries access sensitive telemetry or expensive analytical tables. The case nevertheless illustrates a useful pattern: structured read access can scale better than enumerating every possible analytical question as a separate tool.

## Context engineering and RAG

Postman found that incomplete context caused more failures than missing capabilities. The agent needs to know where the user is in the product, which entities are active, and what state has already been established. Serializing the existing rendering or transport data model was insufficient because those objects were designed for display and data transfer, not for reasoning. Postman built dedicated handlers for entity types that distill each object into the information needed for a workflow.

The system supplies two broad forms of context. Broad, shallow background context is gathered automatically and minified for the prompt. Deep, focused context is selected by the user and processed by a dedicated handler for the relevant entity. This separation helps avoid sending every available object and field on every turn. It also creates a maintenance responsibility: handlers must evolve as product entities and workflows change.

Open-ended user content, including request descriptions, OpenAPI specifications, and payloads, can consume the context window. Postman treats truncation and expansion as an explicit engineering problem and is exploring a filesystem-backed approach so handlers do not each need bespoke logic for managing large content. The source does not specify the truncation policy, retrieval recall, or evaluation methodology, so the effectiveness of this approach cannot be quantified from the case study.

Agent Mode also uses RAG for product knowledge. Postman’s surface includes protocols, mock servers, monitors, documentation, the API Network, governance, variables, helpers, code generation, settings, and collection runs. Encoding all of that in a static system prompt would be expensive and mostly irrelevant to an individual query. Postman initially seeded the knowledge base with concise feature-specific articles derived from its Learning Center. At runtime, the agent selects relevant articles using the incoming request and current context; selecting a mock server, for example, can cause related documentation to be injected. Shipping documentation alongside new product features helps keep retrieved knowledge aligned with product changes, although the article provides no measured retrieval or answer-quality results.

## Bedrock runtime and production controls

Amazon Bedrock supplies managed access to supported Anthropic Claude models through inference APIs. Postman can route high-volume, latency-sensitive work to a faster model and use a larger model for more complex reasoning. Changing among supported models is primarily a configuration change rather than a new serving integration. This provides flexibility for quality, throughput, and cost experiments, but model changes can alter tool-use behavior, prompt compatibility, token consumption, and safety characteristics. Production validation is therefore still required for each model and workload.

Traffic from a global developer community is described as variable and bursty. Postman uses Bedrock cross-Region inference profiles to route requests among permitted destination Regions. Geographic profiles constrain routing to a defined geography such as the United States or European Union, while global profiles can route worldwide for additional throughput when geographic restrictions are not required. The choice is made explicitly through the model identifier or inference-profile ARN, and IAM, service-control policies, quotas, and destination-Region support must all align. Geographic routing can help satisfy processing-boundary requirements, but it does not mean inference occurs inside Postman’s own AWS environment.

The article states that AWS does not use Bedrock prompts and completions to train AWS models or distribute them to third parties, and that Postman configured zero data retention with `data_retention_mode` set to `none` for supported Agent Mode models. These protections are model-dependent and should be checked against current Bedrock documentation for every deployed model. Postman also uses Amazon Bedrock Guardrails to redact personally identifiable information before it reaches the underlying LLM when enterprise administrators enable the relevant setting. Redaction can reduce exposure, but it may also remove information needed for a task; the source does not report redaction accuracy or residual privacy risk.

## Prompt caching, oversight, and operations

Agent requests repeatedly contain stable system instructions, agent behavior, core tool definitions, selected knowledge, and conversation context. Postman uses Bedrock prompt caching to avoid reprocessing unchanged prefixes. A relatively immutable core uses a one-hour cache checkpoint, while more variable context uses a five-minute checkpoint. The longer-lived checkpoint must precede the shorter-lived one. Cache effectiveness depends on model support, prefix stability, session behavior, and the balance between cache-write and cache-read costs. Postman can inspect `cacheReadInputTokens` and `cacheWriteInputTokens` and measure time to first token, but the source supplies no measured savings.

Human oversight is built into the action path. Agent Mode requires user approval before operations that modify application state, which limits the impact of an incorrect tool choice or generated argument. This does not replace testing, authorization, audit logging, monitoring, or rollback design. The source explicitly notes that production testing and monitoring remain necessary, but it does not describe detailed observability dashboards, offline evaluation sets, automated regression gates, failure recovery, or service-level objectives.

## Results and tradeoffs

The reported result is an architecture intended to move a broad product agent beyond a prototype: dynamic tool selection reduces visible tool sprawl; schema-based reads broaden analytical capability; context handlers make product state more useful to the model; RAG supplies feature-specific knowledge on demand; Bedrock provides managed inference, model choice, routing, retention options, and caching; and approval gates reduce the risk of unauthorized state changes. Postman’s internal testing found that tool-selection errors rose beyond roughly 40 visible tools and that newer or larger models reduced, but did not remove, tool hallucinations.

The evidence has important limits. Postman’s production scale is described as supporting 40 million developers, but the article does not state Agent Mode adoption, request volume, latency, error rates, cost per task, success rates, or customer-impact metrics. Its proprietary implementation is not available as a public repository, and the claims are presented in a vendor-associated case study. The most transferable conclusion is therefore methodological rather than quantitative: production agent quality depends on controlling the capability and context presented to the model, separating actions from interface state, and operating inference as a routing, privacy, cost, and caching problem rather than treating model selection alone as the solution.
