---
title: "Operating Identity-Aware Digital Employees at Enterprise Scale"
slug: "operating-identity-aware-digital-employees-at-enterprise-scale"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "realtime-application"
  - "mcp"
  - "human-in-the-loop"
  - "cost-optimization"
  - "error-handling"
  - "latency-optimization"
  - "harness-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "kubernetes"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
industryTags: "finance"
company: "China Merchants Bank"
summary: "China Merchants Bank describes an enterprise platform for operating more than 20,000 digital employee agents, 200 domain experts, and over 10,000 registered skills across employee-facing workflows. The approach treats agents as persistent production services rather than isolated model-and-tool demos: channel adapters normalize events, a harness and runtime manage context and state, Kubernetes and microVM-based sandboxes isolate execution, and an MCP gateway governs access to enterprise capabilities. Identity separation, role-based permissions, approvals, tracing, cost accounting, recovery checkpoints, and audit records are intended to make agent behavior observable and controllable. The presentation reports the scale and design of the platform, but does not provide independent task-quality, reliability, latency, or return-on-investment measurements, so the operational benefits should be understood as an architecture and engineering account rather than a quantified outcome study."
link: "https://www.youtube.com/watch?v=KRuU_nhoMH0"
year: 2026
seo:
  title: "China Merchants Bank: Operating Identity-Aware Digital Employees at Enterprise Scale - ZenML LLMOps Database"
  description: "China Merchants Bank describes an enterprise platform for operating more than 20,000 digital employee agents, 200 domain experts, and over 10,000 registered skills across employee-facing workflows. The approach treats agents as persistent production services rather than isolated model-and-tool demos: channel adapters normalize events, a harness and runtime manage context and state, Kubernetes and microVM-based sandboxes isolate execution, and an MCP gateway governs access to enterprise capabilities. Identity separation, role-based permissions, approvals, tracing, cost accounting, recovery checkpoints, and audit records are intended to make agent behavior observable and controllable. The presentation reports the scale and design of the platform, but does not provide independent task-quality, reliability, latency, or return-on-investment measurements, so the operational benefits should be understood as an architecture and engineering account rather than a quantified outcome study."
  canonical: "https://www.zenml.io/llmops-database/operating-identity-aware-digital-employees-at-enterprise-scale"
  ogTitle: "China Merchants Bank: Operating Identity-Aware Digital Employees at Enterprise Scale - ZenML LLMOps Database"
  ogDescription: "China Merchants Bank describes an enterprise platform for operating more than 20,000 digital employee agents, 200 domain experts, and over 10,000 registered skills across employee-facing workflows. The approach treats agents as persistent production services rather than isolated model-and-tool demos: channel adapters normalize events, a harness and runtime manage context and state, Kubernetes and microVM-based sandboxes isolate execution, and an MCP gateway governs access to enterprise capabilities. Identity separation, role-based permissions, approvals, tracing, cost accounting, recovery checkpoints, and audit records are intended to make agent behavior observable and controllable. The presentation reports the scale and design of the platform, but does not provide independent task-quality, reliability, latency, or return-on-investment measurements, so the operational benefits should be understood as an architecture and engineering account rather than a quantified outcome study."
notion:
  pageId: "3e9f8dff-2538-8005-b6a4-eb5bc0828ea9"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:18:00.000Z"
  lastEditedTime: "2026-09-28T08:18:00.000Z"
  publishedAt: "2026-09-28T08:24:34Z"
---

## Overview

China Merchants Bank presents a production operating model for digital employees: persistent, identity-aware agent services that can receive work through multiple channels, maintain state, use enterprise tools, and provide evidence of what they did. The stated environment contains more than 20,000 digital employee agents, approximately 200 domain experts, more than 10,000 employees served, and over 10,000 registered skills. At this scale, the central problem is not whether a language model can select a tool. It is whether the organization can safely manage a large population of agents with distinct identities, permissions, state, cost profiles, and accountability requirements.

The proposed solution places a control plane around the model loop. A harness defines how an agent reasons and acts, while a runtime keeps it available across tasks, channels, failures, and long-running sessions. Channel adapters convert chat, email, voice, instant messaging, webhooks, and scheduled jobs into normalized task events without erasing their different delivery and latency semantics. Execution takes place in isolated sandboxes, while an MCP gateway exposes governed enterprise capabilities. The platform records traces, policy decisions, tool calls, approvals, costs, retries, checkpoints, and outcomes so that a business task can be investigated after completion.

## Production Problem

A basic agent consists of a model that plans, calls a tool, observes the result, and repeats until it produces an answer. That loop is useful for prototyping but leaves important production questions unanswered. The bank’s operating model asks who the agent is, what it is allowed to do, what state it carries, how much each action costs, how an action can be restricted or revoked, and how the organization can reconstruct events later.

The presentation distinguishes the identity of a digital employee from the identity of a human employee. Agents should not share human credentials because model-driven behavior can produce unintended operations. Instead, each digital employee has a persistent identity, a defined role, an accountability boundary, and policy-controlled access. This makes the agent a service principal with operational ownership rather than an anonymous session attached to whoever initiated a request.

The scale described also creates coordination and governance challenges. More agents create more identities and concurrent work; more domain experts and skills increase the action space; and more employees and channels create more permission boundaries. The bank therefore treats observability, security, cost, and audit as shared platform capabilities inherited by every digital employee rather than features implemented independently in each agent.

## Architecture

The architecture separates the agent into several operational layers. The model runtime may be supplied by different coding or agent runtimes, while a reusable harness provides abstractions that can work across them. The harness describes agent behavior during a task, including planning and tool use. The runtime manages availability, persistence, scheduling, failures, channel continuity, and execution resources. Agent templates define the model, harness, runtime, and resource profile used to instantiate a digital employee.

Tasks arrive as events. Chat and interactive webhooks may require low latency and synchronized state; email and instant messaging can be asynchronous and resume after a long gap; voice requires interaction handling; and webhooks require verification and safe retry behavior because the same event may be delivered more than once. Channel-specific adapters preserve these semantics and normalize inputs into a common task model. The same digital employee can therefore maintain one identity, state, and policy across channels instead of becoming a collection of disconnected channel-specific agents.

The tool layer is organized into browser tools, sandbox tools, MCP-based enterprise tools, and AI search tools. Browser tools support web interaction, sandbox tools support isolated code and file execution, and AI search provides grounded retrieval. Business integrations are moved behind MCP-based interfaces. The goal is to expose a stable tool contract to the model while hiding differences in enterprise protocols, authentication systems, schemas, and token lifecycles.

Tool descriptions are treated as part of reliability engineering. The platform favors explicit interfaces and REST-like schemas over vague descriptions because incomplete or ambiguous tool contracts can produce unpredictable model behavior. High-risk, broad-scope, or materially expensive actions can pause for human approval. The control plane stores the request, response, latency, errors, retries, and approval state, making tool execution more than an opaque function call.

## Sandboxing and Enterprise Access

Each agent receives a private cloud sandbox for execution. The sandbox limits compute, storage, and network access and can support code, browser automation, files, and temporary effects without giving the agent unrestricted access to production infrastructure. Kubernetes manages platform concerns such as authentication, scheduling, lifecycle, and resource policy, while microVM isolation supplies a stronger boundary around workload execution. The design also aims to support stateful workloads within a Kubernetes-managed environment.

Execution state is shared selectively rather than by exposing one worker’s environment to another. A worker can save state to a controlled snapshot store; a later worker can restore that state, consume the next task, and save a new layer. Runtime, network, and permission boundaries remain private to each step, while snapshots, artifacts, context metadata, models, and tools are exchanged through controlled services. This supports long-running and multi-agent work while limiting direct access between agent environments.

The MCP gateway forms a second containment boundary. The sandbox contains execution, while the gateway contains enterprise access. A request can be authenticated, matched to relevant capabilities, checked against identity and role scope, evaluated for risk and budget, routed to an appropriate MCP server, and subjected to approval and rate limits. The gateway can aggregate many MCP servers or reduce a large set of low-level operations into a smaller number of governed tools that are easier for the model to use.

This pattern addresses common enterprise integration problems: inconsistent API protocols and schemas, fragmented authentication, credential lifecycle management, and excessive tool definitions in the model context. It does not eliminate those problems; it centralizes them in a control point where they can be registered, versioned, monitored, and governed. That centralization also introduces a dependency and potential bottleneck, so gateway availability, policy correctness, and latency become important operational concerns even though they are not quantified in the case description.

## Observability, Security, and Audit

For conventional stateless applications, logs, metrics, traces, and the final state may provide sufficient operational visibility. Agent systems require a richer execution record because behavior emerges across multiple model turns, tool calls, state transitions, delegated tasks, and recoveries. The proposed unit of observation is the business task rather than an isolated function span.

A task record links the initiating person and channel, the applicable policy context, the agent identity, template and state, model invocations, inputs, latency, token or resource consumption, tool calls, scopes, approval decisions, final outcome, failure state, and recovery point. Trace IDs connect the full execution; agent IDs attribute behavior to a specific digital employee; policy versions explain why an action was allowed, denied, or paused; and cost records connect consumption to the resulting business outcome. Nested spans can distinguish inference time from tool time, data-access time, MCP latency, delegated work, retries, and parallel execution, supporting diagnosis and performance tuning.

Security is described as a maturity path. An initial environment might rely on shared credentials and limited audit data. A stronger foundation introduces unique identities, delegation records, and security logs. Further maturity adds identity governance, contextual access, and real-time monitoring, while an adaptive stage can use continuous authentication, risk-based checks, and automatic revocation. The presentation positions this as a progression rather than a requirement that every use case begin at the most advanced stage.

The audit chain is intended to preserve cause and effect. It records who initiated a task, which channel and agent were involved, which role and policy version applied, what execution scope was granted, which tools and parameters were used, what approvals occurred, what external systems returned or changed, and how the agent’s model turns, retries, states, and checkpoints evolved. Such records could support incident investigation, compliance review, recovery, and attribution, although the material does not specify retention periods, evidence immutability, regulatory mappings, or independent audit results.

## Cost and Evaluation Considerations

The platform treats cost as a fleet-level control problem. Consumption can accumulate across users, sessions, turns, requests, tokens, model prices, and internally measured GPU usage. China Merchants Bank reports using self-hosted GPUs rather than cloud GPUs, but self-hosting does not make inference free: capacity, energy, scheduling, model operations, and token consumption still need accounting.

The proposed cost levers are to increase adoption and productivity, reduce turns and tokens required for a successful outcome, and route tasks to models with an appropriate quality and unit-cost profile. The important metric is cost per successful business outcome rather than cost per request or cost per token. A cheap execution that fails to complete the task is not necessarily efficient. The bank describes internal benchmarks showing that model performance varies by task category, but it does not provide benchmark datasets, accuracy or completion figures, latency distributions, baseline comparisons, or cost savings. Consequently, the architecture supports evaluation and optimization, but the available evidence does not establish quantitative superiority.

## Results and Tradeoffs

The principal reported result is operational scale: a platform model intended to support tens of thousands of digital employees, hundreds of domain experts, thousands of skills, and more than ten thousand employees. The design provides a coherent explanation for how that scale might be governed through identity separation, normalized events, persistent state, sandbox isolation, MCP-based capability control, human approval, detailed tracing, cost attribution, and audit chains.

The approach favors control and accountability over the simplicity of a single general-purpose agent. It can add latency through approvals, gateway routing, policy checks, sandbox provisioning, and state restoration. It also increases platform complexity: Kubernetes, microVMs, snapshot storage, identity systems, MCP registries, observability pipelines, policy engines, and model-routing logic all require ownership and reliability engineering. Strict boundaries may reduce the agent’s freedom to improvise, but that constraint is intentional in a financial environment where unauthorized side effects can be more damaging than an incomplete answer.

The longer-term vision is an agent mesh in which human employees and specialized digital employees collaborate under shared context and control. Domain agents may contribute compliance, product, operations, data, risk, or customer expertise while retaining separate identities and roles. Humans remain responsible for consequential decisions, while agents contribute knowledge and governed execution. The case therefore demonstrates a production-oriented control model and a large-scale operating direction, while leaving open the empirical questions that would determine effectiveness in practice: task success rates, false approvals or denials, incident frequency, recovery reliability, end-to-end latency, and the financial return of the platform.
