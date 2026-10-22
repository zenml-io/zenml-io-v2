---
title: "Building a Provider-Agnostic Agent Platform for Fintech Products"
slug: "building-a-provider-agnostic-agent-platform-for-fintech-products"
draft: false
llmopsTags:
  - "customer-support"
  - "document-processing"
  - "code-generation"
  - "chatbot"
  - "realtime-application"
  - "unstructured-data"
  - "mcp"
  - "human-in-the-loop"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "memory"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "databases"
  - "postgresql"
  - "monitoring"
  - "orchestration"
  - "security"
  - "reliability"
  - "scalability"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built Laminar, an in-house managed agent harness, to provide a common production platform for its growing portfolio of fintech agents, including support chat, invoice processing, coding, and long-horizon knowledge-work agents. The platform abstracts durable execution, model-provider interoperability, tool use, sandboxes, asynchronous interaction, human approvals, subagents, streaming, and agent-first observability while using Postgres, Temporal, and S3 as core infrastructure. Ramp reports that Laminar’s first version was built in six weeks and that, five months later, all of its agentic products ran on the platform, although the account provides no independent performance, reliability, cost, or quality metrics and emphasizes that ongoing engineering and on-call ownership remain necessary."
link: "https://builders.ramp.com/post/building-laminar"
year: 2026
seo:
  title: "Ramp: Building a Provider-Agnostic Agent Platform for Fintech Products - ZenML LLMOps Database"
  description: "Ramp built Laminar, an in-house managed agent harness, to provide a common production platform for its growing portfolio of fintech agents, including support chat, invoice processing, coding, and long-horizon knowledge-work agents. The platform abstracts durable execution, model-provider interoperability, tool use, sandboxes, asynchronous interaction, human approvals, subagents, streaming, and agent-first observability while using Postgres, Temporal, and S3 as core infrastructure. Ramp reports that Laminar’s first version was built in six weeks and that, five months later, all of its agentic products ran on the platform, although the account provides no independent performance, reliability, cost, or quality metrics and emphasizes that ongoing engineering and on-call ownership remain necessary."
  canonical: "https://www.zenml.io/llmops-database/building-a-provider-agnostic-agent-platform-for-fintech-products"
  ogTitle: "Ramp: Building a Provider-Agnostic Agent Platform for Fintech Products - ZenML LLMOps Database"
  ogDescription: "Ramp built Laminar, an in-house managed agent harness, to provide a common production platform for its growing portfolio of fintech agents, including support chat, invoice processing, coding, and long-horizon knowledge-work agents. The platform abstracts durable execution, model-provider interoperability, tool use, sandboxes, asynchronous interaction, human approvals, subagents, streaming, and agent-first observability while using Postgres, Temporal, and S3 as core infrastructure. Ramp reports that Laminar’s first version was built in six weeks and that, five months later, all of its agentic products ran on the platform, although the account provides no independent performance, reliability, cost, or quality metrics and emphasizes that ongoing engineering and on-call ownership remain necessary."
notion:
  pageId: "401f8dff-2538-81a5-b2af-c2b651691655"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-22T09:03:00.000Z"
  lastEditedTime: "2026-10-22T09:03:00.000Z"
  publishedAt: "2026-10-22T13:35:59Z"
---

## Overview

Ramp is a fintech company that has embedded LLM-based agents into customer-facing products and internal workflows. Its use cases include an interactive support assistant, invoice understanding and coding in Bill Pay, cloud-based coding agents, and longer-running collaborative agents for accounting and general knowledge work. As these applications accumulated, they were built on a mixture of model-provider SDKs, managed agent APIs, open-source coding agents, third-party platforms, and internally developed frameworks. Ramp concluded that this fragmented approach made the developer experience inconsistent and made it harder to deliver a coherent product experience.

Laminar is Ramp’s in-house agent harness: a shared runtime and platform for building, operating, and debugging agents in production. The platform was created around May 2026 and was designed to let product teams “build agents, not infrastructure.” Its central design goal is not merely to wrap an LLM call, but to operate the complete agent loop reliably across interactive and asynchronous workloads. Ramp reports that version one was built in six weeks and that, five months later, every agentic product at the company ran on Laminar. These are company-reported adoption and delivery claims; the source does not provide quantitative evidence for latency, cost reduction, availability, task success, or customer impact.

## Problem and use cases

Ramp’s agent portfolio spans substantially different operational requirements. “Ask Ramp” is an interactive support agent that performs first-line triage, answers product questions, calls tools to resolve issues, or directs users to relevant resources. The company says it outgrew a vendor solution because Ramp wanted tighter product integration and lower latency. This kind of workload prioritizes responsive streaming, safe tool execution, conversational state, and the ability to maintain a useful user experience when the model cannot directly resolve a request.

A second category consists of headless data-processing agents. In Bill Pay, the Contextual OCR agent processes uploaded invoices, using historical invoices and accounting data to extract and code line items. This is a non-interactive workflow in which the agent’s value depends on document handling, access to relevant business context, tool or system integration, and consistent execution without a user waiting synchronously for every model turn. The source does not specify extraction accuracy, coding accuracy, review rates, or the controls used for financial decisions, so those outcomes cannot be independently assessed from the account.

Laminar also supports coding agents that can manage Git repositories, edit files, and run tests inside a development sandbox. Finally, long-horizon agents such as Ramp Stack and Glass can coordinate subagents, automations, cloud browsers, and MCP connectors over tasks lasting minutes or hours. They can communicate through Slack, support multiplayer sessions, report progress, and react to new instructions while work is in progress. These use cases explain why a simple request-response chatbot abstraction would not have been sufficient.

## Platform architecture

Laminar treats an agent as a durable loop in which an LLM selects or invokes tools, receives results, updates state, and continues toward a goal. The harness provides the production services surrounding that loop. Its stated capabilities include secure conversation-history storage, session compaction, standard tool-calling interfaces, message queuing and steering, lifecycle hooks, durable execution, interoperability with multiple LLM APIs, code-execution sandboxes, tool search, synchronous and asynchronous subagents, token-level streaming, human-in-the-loop interactions, rich generative UI, multiplayer chat, and agent-oriented observability.

A particularly important architectural choice is the “sandbox-as-a-tool” model. An agent session is not tied to the lifetime of a provisioned sandbox. The agent definition, conversation history, and turn-level state are stored in a database independently of any virtualized computer. When computation or file manipulation is needed, the agent invokes a tool that runs commands in a sandbox. This decoupling allows infrastructure to be provisioned when required and avoids making the conversational or workflow state dependent on a particular worker remaining alive. It is especially relevant for coding and browser-enabled agents, but also establishes a general boundary between durable orchestration and disposable execution environments.

Laminar uses Postgres, Temporal, and S3 for persistence and workflow execution. Ramp describes these as deliberately “boring technology”: systems its engineers already know how to operate, scale, and repair. Temporal supplies a durable-workflow foundation for agent execution that must survive deployments and ephemeral failures, while Postgres and S3 provide conventional storage primitives. The text does not describe the exact schema, workflow topology, retry policies, or consistency guarantees, so the implementation should be understood at the architectural level rather than as a complete reference design.

The platform is cloud-first and runs on generic disposable workers rather than carefully maintained long-lived servers or sandboxes. This “cattle rather than pets” approach is intended to ensure that customer work continues independently of an end user’s laptop state. It also aligns with the long-running nature of Ramp’s agents: a session can remain open while workers are replaced, a user sends another message, a human approval is requested, or a subagent completes work.

## Interaction and orchestration model

Laminar makes non-blocking asynchronous agents the default. This supports human approval flows, in which an agent pauses for a person to authorize the next step; message queuing and steering, in which a user adds or changes instructions during an active run; and subagent interactions, in which one agent delegates work while the parent continues. The design is better suited to Slack and other clients where a user cannot be expected to keep a request open until completion. It also reflects a shift from short conversational turns toward workflows that may take minutes or hours.

Model and provider interoperability was a primary requirement. Ramp wanted to select models based on cost, latency, and performance rather than be locked to one provider’s managed agent API. Instead of building an abstraction layer over each provider’s separate managed-agent interface, it chose to own the harness and maintain common interfaces at the Laminar layer. This increases Ramp’s control and portability, but also transfers the burden of tracking changing model APIs, message formats, tool semantics, capabilities, and failure modes to its own platform team.

Tool use is treated as a first-class part of the runtime. The platform supports standard tool interfaces such as MCP, tool search, sandboxes, cloud browsers, automations, and lifecycle hooks that can synchronize other systems with session state. Streaming and rich generative UI support allow clients to observe partial progress, while queuing and steering prevent a long-running agent from becoming an unusable locked conversation. These features are operationally significant because they create more state transitions and integration points than a single synchronous model request.

## Observability and debugging

Ramp explicitly chose to own the observability layer because it considers inspection of traces, transcripts, and trajectories essential to improving agent behavior. The company highlights excess tool calls, wasted turns, bloated context, and unexpected errors as failure patterns that can materially degrade an agent. Laminar therefore includes a bespoke agent-first session debugging interface that gathers the information needed to understand a run in one place.

This approach treats observability as part of the product-development loop rather than as a generic infrastructure add-on. Developers can inspect what the agent saw, which tools it called, how the session progressed, and where unnecessary work or errors occurred. Session compaction is also part of the harness, addressing the practical need to control conversation growth during long-running tasks. However, the source does not specify formal evaluation datasets, automated quality gates, trace-derived service-level objectives, red-team procedures, or model-monitoring metrics. The described system is strong on operational introspection, but the account does not establish how agent quality is measured systematically across products.

## How it was built and governed

Laminar’s implementation was heavily accelerated by coding agents. Ramp says the initial codebase was generated entirely by agents from a long initial prompt, but it does not present this as autonomous software delivery. A small group of experienced engineers supplied architectural direction, reviewed changes, challenged generated implementations, and steered the code toward reusable patterns. Contributions from other engineers were accepted, but reviewed according to how well they fit the overall architecture rather than merely whether they solved one product team’s immediate problem.

This governance model is important for an agent-owned codebase. Generated code can make initial implementation inexpensive while increasing the risk of inconsistent abstractions, hidden special cases, and maintenance burden. Ramp attempted to control that risk through experienced ownership, centralized architectural review, and a preference for general building blocks over one-off product integrations. The reported six-week v1 timeline demonstrates rapid construction, but it should not be interpreted as evidence that an agent platform can be operated safely without substantial engineering judgment, security review, infrastructure support, and on-call capability.

## Results and tradeoffs

The principal reported result is organizational consolidation: after five months, all of Ramp’s agentic products were running on Laminar. The platform also gave product teams a common runtime for several agent archetypes and allowed Ramp to retain freedom to choose models and providers. Its shared capabilities can reduce duplicated infrastructure work, make asynchronous execution a default rather than a special case, and provide a consistent place to investigate agent trajectories.

The tradeoff is that Ramp now owns a broad and fast-changing systems problem. A provider-agnostic harness must absorb variation among model APIs and capabilities. Durable asynchronous execution requires careful state management, retries, idempotency, cancellation, and recovery behavior. Sandboxes and tool calls introduce security and isolation concerns, particularly when agents can manipulate files, repositories, browsers, financial documents, or business systems. Human approvals and message steering add further workflow complexity. The source mentions security and infrastructure partners but does not detail authorization, data-retention, sandbox-isolation, or compliance controls.

Building in-house can also create a platform maintenance obligation that is easy to underestimate. Ramp argues that improved coding-agent productivity made ownership comparatively inexpensive and that close collaboration with internal product teams can outpace external vendors. That may be true for a company with Ramp’s engineering resources and a large enough portfolio of agent workloads, but it is not automatically generalizable to smaller organizations. The company itself acknowledges that good engineers are still needed to keep the platform healthy, remain on call, and decide how new product requirements fit the broader architecture. Overall, Laminar is a credible example of consolidating production LLM workloads behind an internally owned, durable, provider-agnostic agent runtime, but the available account demonstrates adoption and architectural ambition more clearly than independently verifiable business or reliability outcomes.
