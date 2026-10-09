---
title: "Production Multi-Agent Advertising Platform"
slug: "production-multi-agent-advertising-platform"
draft: false
llmopsTags:
  - "content-moderation"
  - "classification"
  - "structured-output"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "error-handling"
  - "fallback-strategies"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "evals"
  - "monitoring"
  - "orchestration"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "google-gcp"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify Ads built Ads AI, a production multi-agent platform that helps advertisers generate ad scripts and resolve audience targeting from natural-language campaign briefs. The platform uses Vertex AI through an internal LLM gateway, Google ADK Java, shared session state, domain-specific tools, deterministic validation, moderation gates, and trace-based evaluation. Spotify reports that more than 70% of ads use AI tools and that approximately 20,000 creatives have been generated for more than 7,000 advertisers, although audience recommendation remains in pilot and the presentation does not provide independent quality, revenue, latency, or cost comparisons."
link: "https://www.infoq.com/presentations/spotify-multi-agent-ai-architecture"
year: 2026
seo:
  title: "Spotify: Production Multi-Agent Advertising Platform - ZenML LLMOps Database"
  description: "Spotify Ads built Ads AI, a production multi-agent platform that helps advertisers generate ad scripts and resolve audience targeting from natural-language campaign briefs. The platform uses Vertex AI through an internal LLM gateway, Google ADK Java, shared session state, domain-specific tools, deterministic validation, moderation gates, and trace-based evaluation. Spotify reports that more than 70% of ads use AI tools and that approximately 20,000 creatives have been generated for more than 7,000 advertisers, although audience recommendation remains in pilot and the presentation does not provide independent quality, revenue, latency, or cost comparisons."
  canonical: "https://www.zenml.io/llmops-database/production-multi-agent-advertising-platform"
  ogTitle: "Spotify: Production Multi-Agent Advertising Platform - ZenML LLMOps Database"
  ogDescription: "Spotify Ads built Ads AI, a production multi-agent platform that helps advertisers generate ad scripts and resolve audience targeting from natural-language campaign briefs. The platform uses Vertex AI through an internal LLM gateway, Google ADK Java, shared session state, domain-specific tools, deterministic validation, moderation gates, and trace-based evaluation. Spotify reports that more than 70% of ads use AI tools and that approximately 20,000 creatives have been generated for more than 7,000 advertisers, although audience recommendation remains in pilot and the presentation does not provide independent quality, revenue, latency, or cost comparisons."
notion:
  pageId: "3f4f8dff-2538-80f0-a2a5-eec45ad53763"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:45:00.000Z"
  lastEditedTime: "2026-10-09T08:46:00.000Z"
  publishedAt: "2026-10-09T08:52:37Z"
---

## Overview

Spotify Ads built Ads AI as a production platform for advertising workflows rather than as a research demonstration. The system allows an advertiser to describe a campaign in natural language and uses LLM-powered components to interpret intent, generate advertising copy or audio scripts, and, in a pilot, recommend audience targeting. The platform is intended to preserve campaign context across objectives, targeting, budget, creative, and performance signals so that generated creative can be more closely aligned with the full campaign rather than only with the final creative-entry form.

The reported scale is material but should be treated as a company-reported operational claim rather than an independently validated outcome: since launch, more than 70% of ads reportedly use AI tools, with about 20,000 creatives generated for more than 7,000 advertisers. The source does not provide comparative conversion improvements, quality scores, failure rates, latency targets, or cost savings. It does, however, describe a fairly complete LLMOps approach: bounded agent responsibilities, platform ownership, tool and data grounding, deterministic safety checks, production tracing, offline and live evaluation, and explicit controls for token and operational cost.

## Problem and Use Case

Traditional campaign creation separates objectives, audience targeting, scheduling, and creative production into different steps. As a result, the creative-generation stage may see only a small subset of the signals collected earlier in the workflow. Ads AI is designed to connect those signals. An advertiser can provide a brand, message, campaign goal, category, call to action, audience description, geography, and other requirements. The system extracts semantic intent from that input and produces discrete outputs such as a generated creative and a recommended audience.

The use case includes audio-ad script generation. An advertiser can request multiple script generations and select an appropriate result. Other intended inputs include resolved audience segments, locale, demographic and geographic attributes, delivery goals, and historical campaign performance. The platform also anticipates a closed loop in which click-through rate, completion, conversion, and other performance signals inform later targeting and creative decisions. The source describes this as an architectural direction and capability, not as evidence that a fully automated optimization loop has already been validated in production.

## Architecture and Ownership

The system exposes a gRPC service boundary that manages client requests and sessions. Client applications create a session with the agent system, after which the request passes through an orchestration layer and into specialized agents. Google ADK provides the shared runtime context, execution primitives, session state, and orchestration behavior. The LLM runtime is accessed through an internal gateway using Vertex AI and Spotify’s GCP platform.

A central organizational rule is “one agent, one package, one owner.” Each agent is packaged with its dependencies, ownership metadata, monitoring information, service and dependency-injection scaffolding, and LLM configuration. Bazel visibility rules enforce which packages may import which other agents at compile time. This makes agent boundaries partly enforceable in the software supply chain rather than relying only on documentation or developer discipline. Monitoring metadata includes dashboards and PagerDuty alerting, while shared platform components provide metrics, traceability, and access to Spotify Ads APIs.

The architecture separates agent implementations from common orchestration and safety capabilities. Individual teams own their agents and tools, while the shared platform manages the runtime loop, tool context, tracing, metrics, and common guardrail behavior. The described production decomposition includes an ad-script generation agent, an ad-script guardrail agent, and an audience resolver that is currently in pilot. The generation and guardrail agents can run in parallel when their work is independent, while the audience resolver handles geographic targeting, demographics, interests, and exclusions.

## Agent Boundaries and Deterministic Logic

Spotify’s main design principle is that agents should own semantic interpretation and reasoning, while ordinary application code should own deterministic computation, catalogs, and business rules. An LLM can interpret phrases such as “technology leaders” or “Gen Z sneaker buyers,” but it should not be trusted to invent supported age ranges, IDs, catalog values, or geographic mappings. Those values should be resolved through authoritative tools and validated in code.

The initial implementation used a monolithic agent with a large instruction set and responsibility for script generation, guardrails, audience resolution, search, validation, JSON structure, tone, and locale. Although it functioned, it became brittle as instructions changed. Failures were difficult to localize, and behavior could shift as the prompt grew. The team decomposed the system into agents with narrower responsibilities and aligned those boundaries with domain ownership teams. This follows a single-responsibility principle, but it also introduces orchestration overhead, additional model calls, and more complex failure handling.

The production examples illustrate why deterministic validation remains necessary. An input such as “women 21-plus in Nashville” led an agent to emit an unsupported 21-to-99 range instead of one of the platform’s enumerated age brackets. Another input about parents of teenagers was interpreted as targeting the teenagers themselves. Generic geographic phrases such as “the South” and “the Midwest” also required country context to avoid ambiguous resolution. Spotify addressed these classes of errors by enumerating supported values, adding persona-specific logic, passing country information through tool context, and applying business validation after model output.

## Tools, Grounding, and Guardrails

The platform grounds LLM decisions through tools that access Spotify Ads APIs and related authoritative data. Tools are not treated merely as thin wrappers around endpoints. They are designed around the intent of the agent using them, so two agents can expose different tools over the same underlying API when they need different search or resolution behavior. Tool descriptions and schemas are considered part of prompt engineering: they explain to the model what a tool does, what inputs are expected, and how its result should be interpreted.

Tool schemas also provide an opportunity for schema-level grounding. For example, country context can be threaded through a shared ToolContext so geographic phrases are resolved within the correct domain. Tool failures are expected and should return structured, model-readable errors rather than generic internal-server responses. This gives the agent a chance to recover, request clarification, or exit gracefully. Tool composition is a tradeoff: combining several API operations can simplify an agent’s decision-making, but each additional tool invocation can increase latency and cost.

Safety is implemented through multiple layers. The ad-script guardrail agent performs policy and brand-safety checks, while a separate moderation classifier can reject unsuitable requests before expensive LLM generation begins. This early gate is particularly important because running moderation after generation can waste tokens when the generated result will not be shown. The source also emphasizes that deterministic policy checks and business validation should remain outside the model wherever feasible; an LLM judge or guardrail can detect semantic issues, but it should not be the only prevention mechanism.

## Workflow Patterns and Operational Tradeoffs

Google ADK-based prototypes provide reusable patterns for different workflow shapes. Basic agents are simple to test and reason about, but their prompts become overloaded as tools accumulate. Sequential pipelines pass output through shared session state and are easy to extend, but add latency and allow an upstream failure to poison downstream stages. Conditional routers select a specialized agent based on classification, but the router becomes a failure point and may over-classify ambiguous intent.

Fan-out and fan-in allow independent work, such as generation and guardrail checks, to execute in parallel before a later review step. This reduces waiting compared with purely sequential execution but increases concurrent token consumption and means each parallel branch lacks the other branch’s intermediate context. Generator-critic loops support iterative refinement, but every iteration adds a full model round trip. The platform therefore uses maximum-iteration limits to prevent runaway token usage and non-converging workflows.

These patterns make the orchestration layer a production concern rather than an implementation detail. Agent count, parallelism, retries, routing, shared state, and exit conditions affect user-visible latency, reliability, and inference spend. The source’s guidance is pragmatic: use parallelism only when dependencies permit it, avoid assigning too many tools to a single agent, and use deterministic code or existing internal classifiers before invoking an LLM.

## Observability and Evaluation

Spotify treats tracing as a prerequisite for meaningful evaluation. Unit tests can verify ordinary functions, and integration tests with mocked models can verify pipeline wiring and gRPC behavior, but neither adequately tests nondeterministic model behavior. Production traces capture the output as well as the path taken to produce it: agent duration, tool calls, moderation steps, latency, raw inputs and outputs in custom GenAI spans, and other runtime metrics.

The platform uses Google ADK metrics integration and can export telemetry through OpenTelemetry for monitoring and Grafana dashboards. Braintrust is also identified as a third-party interface for inspecting agent calls and evaluation data. Standardized GenAI tracing conventions are valuable here because they make agent workflows more inspectable and enable production traces to be replayed for testing rather than relying entirely on synthetic examples.

Evaluation is described at three levels. Tool-trajectory evaluation checks whether the agent took the appropriate steps and called the right tools. Deterministic checks validate schemas, required fields, geographic IDs, age brackets, null handling, and other business constraints. LLM-as-judge evaluation assesses semantic properties such as tone, brand fit, and coherence. The presentation characterizes judges as detection mechanisms rather than prevention mechanisms: when a judge identifies a recurring failure, the preferred response is to convert that finding into a deterministic assertion or other cheaper test.

Tracing is intended for every production call, while live evaluation is sampled rather than necessarily applied to all traffic because evaluators add cost. New agents can receive a higher live-evaluation sample and be sampled less heavily after confidence improves. Offline evaluations are run by developers during iteration, with a broader nightly suite. The team intentionally avoids making every merge build invoke LLM evaluations, thereby avoiding a potentially expensive CI gate; this improves cost control but means evaluation feedback is not necessarily synchronous with code review.

## Results, Limitations, and Assessment

The platform demonstrates an end-to-end production pattern for applying LLMs to advertising operations: natural-language intent extraction, specialized generation and resolution agents, API-grounded tools, shared campaign context, deterministic validation, moderation gates, structured observability, and sampled online evaluation. The reported adoption and creative counts suggest substantial operational use, and the system appears to have progressed beyond isolated experimentation into real campaign workflows involving real advertisers and audiences.

There are important qualifications. Audience recommendation is identified as a pilot, and the source does not quantify how often agents fail, how much human review is required, or whether AI-generated ads outperform manually created ads. Multi-agent decomposition improves ownership and failure isolation but can increase model calls, token consumption, latency, and coordination complexity. Parallel execution can spend more tokens, sequential execution can amplify failures, and critic loops can multiply cost. Shared session state and closed-loop performance feedback also create data-governance and attribution concerns that are not detailed in the source.

Overall, the strongest LLMOps lesson is not simply the use of multiple agents. It is the combination of narrow responsibilities with enforceable ownership, authoritative tools, deterministic gates, trace-first evaluation, and explicit cost controls. Spotify’s own early failure with a monolithic agent reinforces that production reliability comes from constraining where the model is allowed to reason, making its actions observable, and continuously converting discovered model failures into ordinary software checks.
