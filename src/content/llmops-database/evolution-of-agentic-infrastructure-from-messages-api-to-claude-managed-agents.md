---
title: "Evolution of Agentic Infrastructure: From Messages API to Claude Managed Agents"
slug: "evolution-of-agentic-infrastructure-from-messages-api-to-claude-managed-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "memory"
  - "harness-engineering"
  - "latency-optimization"
  - "evals"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "security"
  - "guardrails"
  - "scalability"
  - "reliability"
  - "anthropic"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic's Applied AI team presents their journey building production-grade agent infrastructure, addressing the core challenge that as AI model capabilities rapidly improve, the infrastructure for deploying agents (harnesses) becomes the limiting factor. The presentation traces the evolution from the basic Messages API (tokens in/out) through the Claude Agent SDK (packaged agentic loop with tools) to Claude Managed Agents, a fully managed service that handles production infrastructure including hosting, session management, sandboxing, credentials, and observability. The solution demonstrates significant improvements including 60% faster time-to-first-token for median use cases and over 90% improvements for P95 cases, while enabling developers to focus on domain-specific customization rather than infrastructure maintenance."
link: "https://www.youtube.com/watch?v=K0X9QDRkIdg"
year: 2026
seo:
  title: "Anthropic: Evolution of Agentic Infrastructure: From Messages API to Claude Managed Agents - ZenML LLMOps Database"
  description: "Anthropic's Applied AI team presents their journey building production-grade agent infrastructure, addressing the core challenge that as AI model capabilities rapidly improve, the infrastructure for deploying agents (harnesses) becomes the limiting factor. The presentation traces the evolution from the basic Messages API (tokens in/out) through the Claude Agent SDK (packaged agentic loop with tools) to Claude Managed Agents, a fully managed service that handles production infrastructure including hosting, session management, sandboxing, credentials, and observability. The solution demonstrates significant improvements including 60% faster time-to-first-token for median use cases and over 90% improvements for P95 cases, while enabling developers to focus on domain-specific customization rather than infrastructure maintenance."
  canonical: "https://www.zenml.io/llmops-database/evolution-of-agentic-infrastructure-from-messages-api-to-claude-managed-agents"
  ogTitle: "Anthropic: Evolution of Agentic Infrastructure: From Messages API to Claude Managed Agents - ZenML LLMOps Database"
  ogDescription: "Anthropic's Applied AI team presents their journey building production-grade agent infrastructure, addressing the core challenge that as AI model capabilities rapidly improve, the infrastructure for deploying agents (harnesses) becomes the limiting factor. The presentation traces the evolution from the basic Messages API (tokens in/out) through the Claude Agent SDK (packaged agentic loop with tools) to Claude Managed Agents, a fully managed service that handles production infrastructure including hosting, session management, sandboxing, credentials, and observability. The solution demonstrates significant improvements including 60% faster time-to-first-token for median use cases and over 90% improvements for P95 cases, while enabling developers to focus on domain-specific customization rather than infrastructure maintenance."
notion:
  pageId: "3bcf8dff-2538-80cb-95d6-d2aa7af58dc8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-14T06:38:00.000Z"
  lastEditedTime: "2026-08-14T06:39:00.000Z"
  publishedAt: "2026-08-14T06:54:04Z"
---

## Overview

Anthropic's Applied AI team, which operates at the intersection of product, research, and go-to-market functions, presents a comprehensive view of how they've evolved their infrastructure for deploying LLM-based agents in production over three years. The presentation by Gagan and Isabella from the technical staff provides insights into both the architectural decisions driving Claude Managed Agents and the practical lessons learned from deploying these systems with enterprise customers.

The fundamental thesis driving this work is that AI model capabilities are accelerating rapidly—from the original transformer architecture through scaling laws to modern releases—and that each model generation brings capabilities the previous generation lacked. This creates a critical challenge: as task complexity grows from simple Q&A to delegated tasks to agents owning entire outcomes, the infrastructure (what they call "agentic surfaces") must evolve correspondingly. The team argues that harnesses, which are the orchestration layers around models, encode assumptions about what models cannot do on their own, and these assumptions go stale as models improve, making the harness itself the limiting factor in what products can achieve.

## Evolution of Agentic Surfaces

The presentation traces three generations of agentic infrastructure at Anthropic. The first generation, launched alongside Claude 3, was the Messages API—a simple tokens-in, tokens-out interface. As task complexity grew, customers needed models to fetch information and manage context over longer executions, leading to what they call the "agentic loop." This loop, which calls Claude, runs tools, and manages context, had to be built manually from scratch by every customer, creating significant pain points.

Beyond the agentic loop itself, production deployments required extensive infrastructure: session management to track agent state, observability to understand what was happening under the hood, credential management to access sensitive systems securely, hosting infrastructure that could scale, and sandboxing to execute code safely. Teams spent significant engineering effort on these concerns rather than on their core product differentiation.

The second generation addressed the agentic loop problem through the Claude Agent SDK, which packaged the harness from Claude Code with a built-in agentic loop, file system access, tools, and sandboxing capabilities. Products would embed the SDK and get primitives for session management and observability, but still needed to handle credentials, hosting infrastructure, and scaling manually. The SDK reduced but didn't eliminate the infrastructure burden.

The third generation, Claude Managed Agents, represents a fundamental shift: Anthropic runs the entire production infrastructure stack, including the agentic loop ("brain"), sandbox execution environment ("hands"), credentials, session management, observability, and hosting. Developers own only their product, task definition, context, and domain knowledge. This separation of concerns allows teams to focus on what makes their agent valuable for their specific use case rather than on infrastructure plumbing.

## Engineering Principles and Architecture

A core architectural decision underpinning Claude Managed Agents is the decoupling of the "brain" (agent loop and reasoning) from the "hands" (tool execution environment). Initially, the team placed both in the same container for simplicity, but this created several limitations. The agent couldn't start reasoning until the container was fully set up, creating latency. If any component failed, the entire agent failed. Reliability suffered.

By separating these concerns, multiple benefits emerged. The brain can start reasoning immediately while the container spins up in parallel, dramatically improving latency—they report 60% faster time-to-first-token for median cases and over 90% improvements for P95 cases. If the sandbox dies, the brain can spin up a new one and retry. If the brain dies, it can read from the durable session log and resume exactly where it left off. The hands can run anywhere, including in customer virtual private clouds for security-conscious deployments.

This architecture is built around three core primitives. The **agent** defines what the agent does: the model, prompts, tools, and skills specific to the use case. The **environment** defines where the agent runs: the container configuration, networking policies, and allowed hosts. When you combine an agent with an environment, you get a **session**: a durable resource persisted in the cloud capturing every interaction with the agent. Sessions enable observability, long-running instances, and reliability through persistent state.

Sessions can exist in four states: idle (waiting on user input), running (actively executing), rescheduling (encountered an error and retrying), or terminated (unrecoverable failure). This state machine provides a mechanism for recovery from transient failures, which is critical for production reliability when serving many users over long time horizons.

## Context Engineering and Memory

Context engineering is identified as one of the key differentiators between effective and ineffective agents, particularly as models gain larger context windows. Traditional harness implementations conflate the context window with the session, meaning if Claude discards portions of context, it cannot recover them later in the current run. 

Claude Managed Agents takes a different approach: everything is logged to a durable session log resource. The harness can read slices of this context from the session log into the current window as needed. If Claude edits or discards portions during execution, it can recover by re-reading from the persistent log. This architectural decision enables more sophisticated context management strategies and allows agents to work on longer-horizon tasks without losing important information.

The session log serves multiple purposes beyond context recovery. It provides complete observability—every user message, model response, tool execution, and result is captured in a play-by-play trace that can be surfaced in UIs or used for debugging. It also enables memory and self-improvement through a feature they call "dreaming."

Dreaming is a periodic batch process that takes session logs (transcripts from daily agent executions) and the current memory state, then uses the model to extract new insights and organized structures that update the memory. This allows agents to self-improve over time, learning from past executions. The team envisions memory evolving from user-specific (remembering things about individual users) to organizational-scale (storing team runbooks and institutional knowledge).

## Practical Lessons from Production Deployments

The team shares four key lessons from deploying agents with enterprise customers. First, credential management is critical. Many customers asked how to prevent agents from reading environment files containing security tokens. The separation of brain from hands provides partial protection, but they went further by introducing "vaults" that store credentials securely and decrypt them only at tool execution runtime. The model never sees security tokens directly.

Second, latency matters enormously. The decoupling architecture not only improves reliability but significantly reduces time-to-first-token because model reasoning isn't blocked on container setup. For tasks that don't require tool execution, container setup can be skipped entirely, further improving latency.

Third, session logs are the foundation for both observability and improvement. The same trace data that allows users to understand what happened enables memory updates and self-improvement through dreaming. This dual use of the same underlying data is an elegant architectural decision.

Fourth, security for tool execution is non-negotiable for enterprise deployments. The team built "self-hosted sandboxes" that allow the hands to run in customer virtual private clouds, giving customers complete control over the execution environment while the brain still runs in Anthropic's cloud. They also introduced "MCP tunnels" that let MCP servers run within private networks, making only outbound calls to the agent loop rather than being exposed over the public internet.

## Demonstration: SRE Investigator Agent

The presentation includes a live demonstration building a site reliability engineering agent from scratch to investigate production incidents. The scenario involves a dashboard showing P99 latency spiking 10x over baseline, creating an incident requiring investigation through logs and metrics to identify root cause.

The implementation demonstrates the three primitives in action. The agent definition specifies the SRE Investigator name, Claude Opus 4.8 as the model, a system prompt with instructions, and tools including standard capabilities like bash, grep, and blob access, plus MCP tooling to connect to the monitoring dashboard for pulling deploys and metrics. The environment definition creates an SRE sandbox running on Anthropic cloud with networking limited to only the MCP server. Files like application logs are uploaded and made available to the agent.

These components are combined into a session that kicks off in the Anthropic cloud. The agent uses the sandbox to grep application logs, pulls metrics via MCP tools, finds recent deploys, isolates when the incident started, examines code diffs, and synthesizes all information to determine root cause. All of this happens with production-grade infrastructure including session management, observability, and the ability to handle multiple concurrent sessions for different users.

The observability dashboard shows the exact event trace and session logs for each execution, including which tools were used and what results they returned. This level of visibility is essential for debugging agent behavior and understanding decision-making processes.

## Harness Evolution and Model Capability

A recurring theme throughout the presentation is that harnesses encode assumptions about model limitations, and these assumptions must be constantly questioned as models improve. The team provides a concrete example: when Sonnet 4.5 was released, it exhibited "context anxiety," becoming anxious as it approached context window limits and wrapping up tasks prematurely even when room remained. The harness was modified to include context resets to accommodate this behavior.

However, when Opus 4.5 launched, this behavior disappeared entirely. The harness fixes became dead weight, adding latency and causing issues with cache being discarded incorrectly. The lesson: when models move and harnesses don't, the harness degrades agent performance. This creates significant maintenance burden for teams trying to keep up with Claude's evolution.

The solution is designing harnesses for tomorrow's model capabilities, not today's limitations. Harnesses must be agile, making it easy to iterate individual components as capabilities emerge while keeping overall architecture stable. Claude Managed Agents is built as a small set of independent, replaceable components that can be swapped out individually without redesigning the entire system.

This design philosophy also addresses the reality that agents are becoming increasingly asynchronous and tackling more complex, long-running tasks. To support this, the harness needs sophisticated context engineering, secure sandboxes for taking action, reliability to run for hours or days, and the ability to parallelize workflows across complex problems.

## Advanced Features and Future Directions

Beyond the foundational capabilities, the team is experimenting with several frontier features. Scheduled deployments allow agents to run on timers. Multi-agent orchestration enables coordination across multiple specialized agents. The dreaming and memory systems mentioned earlier represent a path toward self-improving agents that get better with use.

One particularly interesting feature is "outcomes," which allows developers to define success criteria for agents. You specify a rubric indicating what successful task completion looks like and define failure cases. A separate grader agent runs alongside the main agent loop, evaluating whether the task was completed successfully against the defined criteria. If not, the agent keeps trying until it reaches the success criteria. This moves toward a world where agents understand what success means for a task and have mechanisms to iteratively improve their attempts, unlocking new categories of complex tasks that weren't reliably achievable previously.

The team explicitly positions Claude Managed Agents as an effort to close the gap between what products offer (often with static harnesses) and what models can actually do. As models evolve along exponential capability curves, harnesses increasingly become the limiting factor. By providing a production-ready foundation that evolves with model capabilities, Anthropic aims to let products get closer to what models can achieve today rather than being constrained by infrastructure built for yesterday's limitations.

## Critical Assessment

While the presentation makes compelling technical arguments, it's important to note this is Anthropic promoting their own managed service. The claimed performance improvements (60-90% latency reductions) and architectural benefits are presented without detailed benchmarking methodology or comparison to specific alternatives. Teams should validate these claims against their own use cases.

The managed service approach trades control for convenience. While Anthropic handles infrastructure concerns, developers give up some flexibility in how the agentic loop works and must accept Anthropic's architectural decisions. For teams with sophisticated internal LLMOps capabilities or unusual requirements, a fully managed solution may be more limiting than building custom infrastructure. The presentation acknowledges this tension by offering self-hosted sandbox options, but the core agent loop remains Anthropic-controlled.

The emphasis on harnesses evolving with models is valid but also somewhat self-serving—it creates lock-in to Anthropic's managed service rather than customers building their own infrastructure that might work across multiple model providers. Teams should consider whether betting on Anthropic's continued harness evolution is strategically sound versus maintaining provider-agnostic orchestration layers.

That said, the architectural patterns described—decoupling reasoning from execution, using durable session logs for both observability and context recovery, treating sessions as first-class resources with state machines—represent thoughtful LLMOps engineering regardless of whether one uses Claude Managed Agents specifically. The lessons about credential isolation, latency optimization, and context engineering apply broadly to production agent deployments.

The demonstration, while impressive, is relatively simple and doesn't showcase the truly long-running, multi-day agent executions mentioned in the presentation. Real-world validation of reliability over extended time horizons with production workloads would strengthen the claims. Similarly, the memory and dreaming features are described conceptually but not demonstrated in practice, making it difficult to assess their actual effectiveness.

Overall, this represents a sophisticated approach to productizing LLM-based agents that addresses real pain points in production deployments. The architectural decisions show deep understanding of the challenges in running agents at scale. However, teams should carefully evaluate whether the convenience of a managed service outweighs the loss of control and potential vendor lock-in for their specific context.
