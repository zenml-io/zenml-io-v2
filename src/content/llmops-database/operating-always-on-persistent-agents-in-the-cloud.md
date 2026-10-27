---
title: "Operating Always-On Persistent Agents in the Cloud"
slug: "operating-always-on-persistent-agents-in-the-cloud"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "summarization"
  - "multi-modality"
  - "realtime-application"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "memory"
  - "mcp"
  - "prompt-engineering"
  - "system-prompts"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "human-in-the-loop"
  - "evals"
  - "monitoring"
  - "databases"
  - "security"
  - "reliability"
  - "scalability"
  - "orchestration"
  - "open-source"
industryTags: "tech"
company: "Stanford (CS146S)"
summary: "Stanford CS146S presents an architecture for turning a short-lived tool-calling LLM harness into an always-on agent that can operate for hours, days, or potentially weeks. The design separates a durable server-side agent loop from a suspendable Linux sandbox, persists conversations and memories, accepts event-driven triggers, delegates work to sub-agents, and uses workflow orchestration, dynamic tool discovery, prompt caching, compaction, and automated review. The approach improves continuity, scalability, and autonomy, but the material identifies substantial unresolved risks around prompt injection, irreversible actions, memory quality, long-running evaluation, security, notification fatigue, and the reliability of claims that model-based command review is safer than human approval."
link: "https://youtu.be/L1OBRtfPS34"
year: 2026
seo:
  title: "Stanford (CS146S): Operating Always-On Persistent Agents in the Cloud - ZenML LLMOps Database"
  description: "Stanford CS146S presents an architecture for turning a short-lived tool-calling LLM harness into an always-on agent that can operate for hours, days, or potentially weeks. The design separates a durable server-side agent loop from a suspendable Linux sandbox, persists conversations and memories, accepts event-driven triggers, delegates work to sub-agents, and uses workflow orchestration, dynamic tool discovery, prompt caching, compaction, and automated review. The approach improves continuity, scalability, and autonomy, but the material identifies substantial unresolved risks around prompt injection, irreversible actions, memory quality, long-running evaluation, security, notification fatigue, and the reliability of claims that model-based command review is safer than human approval."
  canonical: "https://www.zenml.io/llmops-database/operating-always-on-persistent-agents-in-the-cloud"
  ogTitle: "Stanford (CS146S): Operating Always-On Persistent Agents in the Cloud - ZenML LLMOps Database"
  ogDescription: "Stanford CS146S presents an architecture for turning a short-lived tool-calling LLM harness into an always-on agent that can operate for hours, days, or potentially weeks. The design separates a durable server-side agent loop from a suspendable Linux sandbox, persists conversations and memories, accepts event-driven triggers, delegates work to sub-agents, and uses workflow orchestration, dynamic tool discovery, prompt caching, compaction, and automated review. The approach improves continuity, scalability, and autonomy, but the material identifies substantial unresolved risks around prompt injection, irreversible actions, memory quality, long-running evaluation, security, notification fatigue, and the reliability of claims that model-based command review is safer than human approval."
notion:
  pageId: "3f8f8dff-2538-8156-ae51-f1cdcc1ec380"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-13T11:47:00.000Z"
  lastEditedTime: "2026-10-13T11:47:00.000Z"
  publishedAt: "2026-10-22T13:36:17Z"
---

## Overview

Stanford CS146S describes a production-oriented architecture for persistent, proactive agents associated with work at SpaceX and with a Grokbot-style product. The central problem is that a conventional terminal harness—an LLM calling tools in a loop—stops when the user's laptop closes, has limited continuity, and requires the user to supervise every command. The proposed solution moves the agent loop to a server, gives the agent access to a separately managed Linux computer, persists state, and lets events such as messages, email, meetings, or scheduled routines wake the agent. This makes the agent behave more like a colleague that can work asynchronously than like a chatbot that waits for every prompt.

The architecture is a credible collection of established distributed-systems and LLMOps patterns rather than a demonstrated product benchmark. It addresses availability, state management, context limits, cost, tool selection, and safety, but the presentation does not provide quantitative reliability, latency, cost, or task-success results. Claims that automated model review is generally better than human command approval should therefore be treated as an engineering hypothesis requiring domain-specific evaluation, not as a proven security result.

## Problem and Operating Model

The initial harness consists of a model, tools, and a repeated agent loop. It can edit files, execute shell commands, browse, and perform other actions, but it is tied to a live process and a user's active supervision. An always-on design must instead survive client disconnects, crashes, restarts, long idle periods, and work that spans multiple sessions. It must also determine when to notify the user: reporting every intermediate step creates alert fatigue, while suppressing an important failure or approval request creates operational risk.

The intended interaction model is asynchronous. A user can send instructions through a client, but background routines, Slack messages, email, phone calls, meeting participation, or other events can also create work. A router assigns priority, deduplicates related inputs, batches rapid messages when appropriate, and decides whether a result warrants notifying the user. Direct user instructions can interrupt lower-priority work, while background tasks are queued or resumed according to policy.

## Architecture and Infrastructure

The design uses a thin-client, thick-server split. Clients communicate through a small interface, described as a single send-to-user tool, while the server hosts the more complex capabilities: shell execution, file access, service connectors, cloud-agent calls, screen recording, demonstrations, and other tools. A mobile app, desktop application, email integration, or Slack integration can therefore reuse the same server-side agent protocol while rendering responses in a client-specific way. The client may present an approval form, authentication flow, payment interaction, or rich status display without changing the core agent loop.

The server maintains the agent's conversation and durable state. A separate Linux computer is provisioned for actions that need a filesystem, browser, desktop, or general-purpose execution environment. The computer is described as running in a Firecracker virtual machine. Its state can be snapshotted, suspended, restarted, and restored, which supports resource sharing and reduces the need to keep every agent computer running continuously. Multiple agents can receive separate virtual desktops or browser environments. Keeping the agent loop on the server, rather than inside the virtual machine, allows the VM to be rebuilt or patched independently—for example, after a critical operating-system update—without destroying the application's orchestration state.

The architecture distinguishes a job queue from a durable workflow. A queue may require replaying earlier steps after a worker crash; a durable workflow records progress so a retry can resume at the failed step. Temporal is cited as the open-source workflow system used for this purpose. Each helper or sub-agent can also be modeled as a durable workflow, allowing expensive or failure-prone tasks such as video processing, browser work, or shell operations to continue without bloating the main conversation.

## Memory, Tools, and Context Engineering

Persistent behavior depends on storing more than the immediate chat. The system can maintain user preferences, dated work logs, scratchpad notes, reusable skills, routines, and other files. Skills encode procedures in markdown, while routines resemble scheduled prompts or cron jobs. This file-oriented approach gives the model a searchable external memory: it can use shell commands such as grep to retrieve relevant historical information instead of placing every past interaction in the active context window. The approach is simple and inspectable, but it also makes memory quality dependent on correct writing, retrieval, updating, and deletion policies.

The main agent acts as an orchestrator and delegates narrow tasks to sub-agents with fresh working context. A helper returns a result rather than exposing every intermediate tool call to the main conversation, reducing context growth and making the product appear to have more than the model's nominal context limit. The system also favors a progressively more expensive retrieval ladder: use current conversation context first, then a plugin, MCP server, or API, then web search, then browser interaction, then general desktop or shell access, and only finally ask the user. This can reduce unnecessary tool calls and interruptions, although fallback behavior and failure handling need explicit tests.

Dynamic context or tool search limits the tool definitions inserted into each model request. Rather than placing every connector schema in the prompt, the agent initially sees tool names and discovers detailed tools when needed. This preserves context for task reasoning and can lower token usage. The design also recommends stable system prompts, stable tool ordering, concise schemas, descriptive errors, and avoiding unnecessary tool changes during a turn. These practices support prompt caching: repeated prefixes remain cached while only new messages incur uncached processing. Cache misses are treated as an operational defect because they increase cost and can reduce throughput in long-running agents.

Long conversations require compaction. When a context approaches its limit, the system summarizes it into durable facts, dated logs, and temporary working notes. User preferences that must apply on every turn are kept in a core layer; transient details are allowed to expire; other information remains available in files. Compaction is inherently lossy, so the quality of the summarization algorithm and the selection of facts are key reliability concerns. Performing compaction while the provider's prompt-cache window is still warm is presented as a cost optimization, but it does not remove the need to evaluate whether important details survive.

## Safety and Governance

The system uses a separate model for automated review of commands, especially shell operations, and requires stronger safeguards for irreversible actions such as sending email or Slack messages. It can keep passwords outside the model conversation and request user confirmation for two-factor authentication, CAPTCHAs, payments, or other sensitive steps. Browser interaction can use HTML or the accessibility tree before resorting to screenshots and pixel clicks, reducing token use and improving targeting.

The largest unresolved threat is untrusted input. Email content, webhooks, group chats, and web pages may contain prompt injection, and must not automatically be treated as trusted user instructions. Isolation in a separate VM limits some host impact but does not by itself protect accounts, connected services, confidential files, or downstream recipients. Automated review may reduce the fatigue associated with approving hundreds of commands, but the source provides no controlled comparison, error rates, threat model, or evidence that a reviewer model is safer across workloads. Production deployments would need least-privilege credentials, action allowlists, audit logs, rate limits, approval policies, secret isolation, sandbox escape testing, and adversarial evaluations.

## Evaluation and Tradeoffs

The proposed development flywheel turns agent failures into evaluations. A failure may lead to a harness change, prompt correction, tool fix, inference adjustment, or model-training example. Short-cycle engineering iterations measure whether the fix works, while longer-cycle supervised fine-tuning and reinforcement learning improve instruction following, tool selection, browser interaction, multi-agent behavior, and use of the harness. This is an appropriate LLMOps pattern because it connects production incidents to regression tests rather than relying only on anecdotal demonstrations.

However, persistent agents make evaluation harder. A task running for weeks may span model releases, changing tools, mutable external systems, and evolving memory. A model update can invalidate an in-progress workflow or make a previously safe behavior unreliable. Long-horizon evaluations therefore need checkpointing, replayable environments, versioned prompts and tools, workflow-level success criteria, interruption tests, cost accounting, and explicit policies for model upgrades during active runs. The material identifies these problems but does not report measured task-completion, failure, safety, or cost metrics.

The main benefits are continuity after disconnects, asynchronous execution, reusable memory and skills, scalable client integrations, isolation from a user's personal computer, and better use of model context through delegation and caching. The costs include infrastructure complexity, VM and workflow operations, token and cache-management overhead, difficult memory correctness, broader security exposure, and potentially opaque behavior. The overall design is a strong reference architecture for experimenting with production agents, but its real-world value depends on disciplined evaluation and governance rather than on autonomy alone.

## Results and Outlook

The reported result is an architectural transition from supervised, short-lived coding agents to persistent cloud agents capable of background work, event-driven activation, computer use, and multi-step durable execution. No numerical performance results are supplied, and the anticipated ability to run agents for weeks or months is framed as a direction rather than an established outcome. Future work identified by the design includes better memory representations, learning skills on the job, improved notification heuristics, stronger security, more efficient inference, and evaluation methods for long-running agents. These areas are central LLMOps concerns because they determine whether an impressive demonstration can become a dependable production system.
