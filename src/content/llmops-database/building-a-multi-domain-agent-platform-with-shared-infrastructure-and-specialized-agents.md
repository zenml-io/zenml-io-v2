---
title: "Building a Multi-Domain Agent Platform with Shared Infrastructure and Specialized Agents"
slug: "building-a-multi-domain-agent-platform-with-shared-infrastructure-and-specialized-agents"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "memory"
  - "latency-optimization"
  - "cost-optimization"
  - "harness-engineering"
  - "evals"
  - "fastapi"
  - "monitoring"
  - "orchestration"
  - "cicd"
  - "scalability"
  - "reliability"
  - "guardrails"
  - "documentation"
  - "google-gcp"
industryTags: "tech"
company: "DoorDash"
summary: "DoorDash built Ask DoorDash, a conversational AI assistant that handles over two million conversations across multiple domains (Restaurant, Grocery, and Reservations). The platform separates domain-specific agent behavior from shared execution infrastructure, enabling rapid development—adding the third domain took one week versus two months for the initial launch. The shared evaluation harness and rollout controls allowed the team to evaluate and deploy new LLM releases within one week, achieving a 35% reduction in p50 turn latency followed by another 40% reduction in a subsequent upgrade, all without quality degradation. The architecture balances centralized capabilities like orchestration, memory, model access, tracing, and evaluation with domain-owned components like instructions, skills, tools, and evaluation criteria."
link: "https://careersatdoordash.com/blog/building-ask-doordash-part-four-a-platform-for-building_and_evolving_agents/"
year: 2026
seo:
  title: "DoorDash: Building a Multi-Domain Agent Platform with Shared Infrastructure and Specialized Agents - ZenML LLMOps Database"
  description: "DoorDash built Ask DoorDash, a conversational AI assistant that handles over two million conversations across multiple domains (Restaurant, Grocery, and Reservations). The platform separates domain-specific agent behavior from shared execution infrastructure, enabling rapid development—adding the third domain took one week versus two months for the initial launch. The shared evaluation harness and rollout controls allowed the team to evaluate and deploy new LLM releases within one week, achieving a 35% reduction in p50 turn latency followed by another 40% reduction in a subsequent upgrade, all without quality degradation. The architecture balances centralized capabilities like orchestration, memory, model access, tracing, and evaluation with domain-owned components like instructions, skills, tools, and evaluation criteria."
  canonical: "https://www.zenml.io/llmops-database/building-a-multi-domain-agent-platform-with-shared-infrastructure-and-specialized-agents"
  ogTitle: "DoorDash: Building a Multi-Domain Agent Platform with Shared Infrastructure and Specialized Agents - ZenML LLMOps Database"
  ogDescription: "DoorDash built Ask DoorDash, a conversational AI assistant that handles over two million conversations across multiple domains (Restaurant, Grocery, and Reservations). The platform separates domain-specific agent behavior from shared execution infrastructure, enabling rapid development—adding the third domain took one week versus two months for the initial launch. The shared evaluation harness and rollout controls allowed the team to evaluate and deploy new LLM releases within one week, achieving a 35% reduction in p50 turn latency followed by another 40% reduction in a subsequent upgrade, all without quality degradation. The architecture balances centralized capabilities like orchestration, memory, model access, tracing, and evaluation with domain-owned components like instructions, skills, tools, and evaluation criteria."
notion:
  pageId: "3aaf8dff-2538-80fe-9735-dccaa62f39b2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:00:00.000Z"
  lastEditedTime: "2026-07-27T12:00:00.000Z"
  publishedAt: "2026-07-27T12:05:24Z"
---

## Overview

DoorDash built Ask DoorDash as a production conversational AI system that has handled over two million conversations across multiple business domains. This case study is particularly valuable for understanding how to build scalable, multi-domain agent platforms that balance standardization with domain flexibility. The approach represents a mature LLMOps implementation where multiple specialized agents operate on shared infrastructure, enabling rapid iteration and deployment of new capabilities while maintaining quality and performance standards.

The platform was designed around a fundamental architectural decision: what should be shared across all agents versus what should remain domain-specific. DoorDash chose to centralize capabilities that would create reliability or operational problems if implemented separately—orchestration, memory, model access, tracing, evaluation infrastructure, and rollout controls. Domain teams retained ownership of the instructions, skills, tools, evaluation criteria, and model choices that define their agent behavior. This division proved effective in practice: the initial Restaurant and Grocery domains took roughly two months to launch, while adding Reservations as the third domain took only one week, representing a 10x improvement in development velocity.

## Adoption of Industry Standards

A notable aspect of DoorDash's approach is their willingness to adopt industry standards rather than building everything from scratch. They adopted Agent2Agent (A2A) for agent-to-agent communication and Google's Agent Development Kit (ADK) as the framework for building and running agents. While the authors acknowledge that these standards sometimes limited design choices, they provided shared contracts across teams and eliminated the need to develop proprietary equivalents. This pragmatic approach to standardization is worth noting—the team built custom solutions only for recurring problems without suitable standards, while accepting the constraints that come with adopting existing frameworks.

## Multi-Agent Architecture and Orchestration

The core architectural pattern separates a single conversational experience into specialized domain agents coordinated by a central orchestrator. Each request enters through a Gateway that handles authentication, assembles context, and translates between the client's HTTP/streaming interfaces and the platform's A2A protocol. The Gateway then passes requests to the Orchestrator, which routes each conversational turn to the appropriate domain agent while maintaining continuity as conversations shift between domains.

This multi-agent approach solved a real problem that emerged when they tried a single-agent architecture: Restaurant, Grocery, and Reservations have different tools, policies, and evaluation criteria. Combining them made testing difficult and forced every domain onto the same release cycle. However, routing through an orchestrator adds latency and input tokens on every turn. To address this, DoorDash implemented a "pinning" mechanism where follow-up turns are sent directly to the previously selected domain agent, avoiding the orchestrator call. If the conversation changes direction and moves out of scope, the domain agent recognizes this and returns control to the orchestrator, which reroutes within the same turn invisibly to the user. This optimization demonstrates the kind of practical engineering tradeoff required in production agent systems.

## Gateway for Streaming and Client Abstraction

The Gateway component addresses a mismatch between traditional API patterns and agent behavior. DoorDash's existing client gateways were built for APIs that return complete responses quickly, but agents work differently—the first text may be ready while tools are still being called, and final responses may combine prose with interactive UI elements like store or item cards. The Gateway handles this translation by converting client HTTP requests into A2A requests and using the Vercel AI SDK to send text updates and widget payloads to clients over Server-Sent Events (SSE). This allows clients to render updates as they arrive, providing responsive user experiences.

While building and operating the Gateway required investment, it concentrated work that would otherwise be duplicated across every DoorDash client application. Agents can evolve behind a stable client contract without requiring coordinated client releases, and new domain agents automatically inherit the existing authentication and streaming infrastructure. This is a key LLMOps pattern: investing in abstraction layers that insulate downstream systems from the complexity and rapid evolution of agent implementations.

## Skills System for Context Management

As individual domain agents gained capabilities, DoorDash encountered the same context management problem within domains that they had solved across domains through specialization. New features added instructions and tools to every turn, even when unused, increasing input token costs and potentially confusing agents with overlapping or conflicting instructions. The solution was a skills system that allows agents to dynamically load only relevant instructions and tools for each turn.

For example, a Restaurant agent conversation might begin with finding a Thai restaurant and then shift to browsing a menu and adding items to cart. Both requests stay with the Restaurant agent, but the first loads the search-discovery skill while the second loads the cart-ordering skill. This dynamic loading introduces a selection problem—the system must recognize when a capability is needed without loading unrelated context too often. DoorDash evaluates skill selection as part of agent behavior, treating it as a quality concern rather than just a technical optimization.

The quantitative impact is significant. Measuring only base and skill instruction tokens (excluding conversation history, user messages, tool schemas, and tool results), the Restaurant agent's median skill-scoped turn used approximately 20,000 tokens compared to ~42,000 tokens with all skills loaded (a 50%+ reduction), while the Grocery agent showed approximately 10,000 tokens versus ~25,000 tokens (a 60% reduction). This demonstrates how context window management becomes critical at scale, directly impacting both cost and model performance.

## Model Context Protocol for Service Integration

Ask DoorDash needs access to numerous DoorDash services for searching stores and items, reading menus, managing carts, and acting on users' behalf. The underlying APIs were designed for deterministic application code, not LLMs making runtime decisions. Exposing APIs directly would force models to interpret low-level interfaces, while encoding all permissions and business rules only in prompts would add context without guaranteeing enforcement.

DoorDash built a shared Model Context Protocol (MCP) layer between agents and internal APIs. Each MCP tool exposes a focused operation with inputs and outputs designed for the model to understand. The model chooses which tool to call, but deterministic code validates each request and enforces permissions and business rules before reaching the underlying service. This creates a clear separation of concerns: prompts help the model choose the right operation (advisory guidance), while tool code determines what can actually execute (enforced boundary).

Tool design requires careful balance. Tools that are too broad present too many choices; tools that are too narrow create long call chains. The shared MCP server now provides more than 60 tools across public and internal agent workflows. New agents select needed tools from this library, and improvements to validation, telemetry, or service integration benefit every agent. This represents mature LLMOps practice: treating the interface between LLMs and deterministic systems as a critical architectural boundary with explicit validation and enforcement mechanisms.

## Production Infrastructure: Tracing, Model Access, and State Management

While ADK provided basic agent-building components (instructions, tools, callbacks, sessions, model wiring), production operation at DoorDash required distributed tracing, model access abstraction, durable state management, and rollout controls. Rather than having each domain team implement these independently, DoorDash built reusable modules on top of ADK for capabilities that should work consistently across agents.

Distributed tracing is enabled through configuration, with the shared SDK propagating trace IDs through A2A calls, MCP tools, and downstream DoorDash services. Engineers can follow a single request across the Orchestrator, domain agents, and tool calls rather than reconstructing behavior from separate logs. The same trace data supports both debugging and evaluation. The platform team estimates that providing tracing through shared infrastructure saves approximately one month of observability work for each new agent launch—a significant efficiency gain.

Model access follows similar principles. Domain teams choose which models their agents use, while the platform standardizes how those models are invoked, traced, and protected by fallback behavior. Teams can evaluate and adopt new models without rewriting provider-specific integrations. This common path enabled the rapid model upgrades mentioned in the introduction: within one week of a new LLM's release, they evaluated and deployed it, cutting p50 turn latency by 35% with no quality score degradation, followed by another 40% reduction from a subsequent model upgrade. This demonstrates how platform investment pays off in operational agility—the ability to respond quickly to new model releases and optimize latency without compromising quality.

State management proved critical based on earlier DoorDash agent experiments in 2025, which showed how quickly experiences break down when state is unreliable. Ask DoorDash uses three forms of state with different lifecycles and access patterns: session state tracks the active conversation and completed work within it; memory preserves information useful in later conversations (like user preferences); and artifacts hold structured outputs that agents create and update (shopping lists, interactive cards). Earlier projects implemented these independently, duplicating persistence work and making reliability depend on each team's choices. DoorDash centralized them in Managed Agent Services, which provides ADK-compatible APIs. Domain agents use consistent interfaces without operating their own stateful systems, though each domain still decides what information to save and retrieve.

## Evaluation and Rollout Controls

The shared evaluation harness and rollout controls are essential platform capabilities, though this document provides less detail than the dedicated evaluation deep dive (Part Three of the series). What's clear is that these components give teams quality signals as they move changes into production. The centralized nature is critical because regressions in shared code can affect multiple agents—every shared change must pass common quality checks and release safeguards. The rapid model upgrade timeline (evaluation and deployment within one week of release) suggests a mature evaluation pipeline with automated quality assessment.

## Platform Boundaries and Tradeoffs

DoorDash explicitly addresses the risks of centralization. Shared infrastructure increases blast radius—defects can affect several agents, and premature abstraction can force different products into the same shape. Their stated principle is to standardize a capability only after multiple domains need it and separate implementations would create reliability or operational problems. This is a critical LLMOps lesson: not everything should be centralized, and the decision should be driven by operational necessity rather than architectural preference.

The platform approach proved its value with the Reservations launch. The team reused the production path already serving Restaurant and Grocery, launching Reservations support in one week versus two months for initial domains—roughly 10x faster. Domain teams retain ownership of agent behavior and quality criteria, while platform improvements to the evaluation harness, MCP tools, tracing, model access, and rollout controls reach every agent automatically.

## Critical Assessment

This case study represents mature LLMOps thinking but comes directly from DoorDash and naturally emphasizes successes. Several areas warrant balanced consideration:

The 10x improvement in launch velocity (one week for Reservations versus two months for initial domains) is impressive but likely reflects both platform maturity and learning effects. The initial two-month timeline included building the platform itself, so subsequent domains would naturally be faster regardless of platform quality. Still, one week to production for a new domain is genuinely fast.

The latency improvements (35% reduction followed by 40% reduction) from model upgrades are presented as platform wins, but the text doesn't clarify whether these came from switching providers (e.g., OpenAI to Anthropic), newer model versions from the same provider, or different model sizes. The platform enabled rapid evaluation and deployment, but the latency gains likely came primarily from model providers rather than DoorDash engineering.

The skills system shows impressive token reductions (50%+ for Restaurant, 60% for Grocery), but the measurements exclude conversation history, tool schemas, and tool results—the complete token counts per turn aren't provided. In long conversations with extensive history and multiple tool calls, the instruction token savings might represent a smaller percentage of total costs. Still, 50-60% reduction in instruction tokens is meaningful.

The text mentions that A2A and ADK "sometimes limited our design choices" but doesn't elaborate on what those limitations were or what alternatives they might have preferred. This is an honest admission that adopting standards involves tradeoffs, but evaluating those tradeoffs requires more detail.

The two million conversations figure lacks context about success rates, user satisfaction, or business impact. High conversation volume doesn't necessarily indicate high quality or business value, though the fact that the system remains in production and is expanding to new domains suggests reasonable product-market fit.

## Conclusion

This case study demonstrates sophisticated LLMOps practices for multi-domain agent systems. The separation of shared platform capabilities from domain-specific agent behavior is a valuable architectural pattern that balances efficiency with flexibility. The quantitative results—10x faster domain launches, rapid model upgrades with significant latency improvements, and 50-60% instruction token reductions through skills—suggest genuine operational maturity, even accounting for the promotional nature of the source material. The explicit discussion of tradeoffs (when to centralize versus when to keep domain-specific, the latency costs of orchestration, the skill selection problem) adds credibility and practical value. For organizations building multi-domain agent platforms, this represents a well-reasoned approach to the fundamental LLMOps challenge of operating LLM-based systems reliably at scale.
