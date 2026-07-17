---
title: "Scaling AI Agents from Monolithic to Multi-Agent Architecture with DeepAgent"
slug: "scaling-ai-agents-from-monolithic-to-multi-agent-architecture-with-deepagent"
draft: false
llmopsTags:
  - "customer-support"
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "harness-engineering"
  - "semantic-search"
  - "error-handling"
  - "system-prompts"
  - "mcp"
  - "langchain"
  - "scaling"
  - "security"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Monday dot com"
summary: "Monday dot com evolved their AI assistant \"Sidekick\" from a simple react loop implementation (V1) through a problematic monolithic multi-agent system with over 200 tools (V2) to a sophisticated DeepAgent-based architecture (V3) designed to handle the complexity of multiple product divisions, entities, and contexts. The initial V2 architecture suffered from context pollution, confused LLMs, and rising costs due to too many tools and infinite contexts across different domains like Monday CRM, Monday Service, and Monday Marketing. By rebuilding Sidekick with DeepAgent, they implemented four core principles: three-tier tool discovery (base, context-specific, and deferred tools), delegation-first architecture with sub-agents and middleware pipelines, code execution in sandboxes to replace hundreds of specific tools, and self-healing capabilities. This resulted in a 94% recovery success rate and enabled complex use cases like dynamically finding office locations based on geographical constraints using custom Python code."
link: "https://www.youtube.com/watch?v=c2fLLS7np3Y"
year: 2026
seo:
  title: "Monday dot com: Scaling AI Agents from Monolithic to Multi-Agent Architecture with DeepAgent - ZenML LLMOps Database"
  description: "Monday dot com evolved their AI assistant \"Sidekick\" from a simple react loop implementation (V1) through a problematic monolithic multi-agent system with over 200 tools (V2) to a sophisticated DeepAgent-based architecture (V3) designed to handle the complexity of multiple product divisions, entities, and contexts. The initial V2 architecture suffered from context pollution, confused LLMs, and rising costs due to too many tools and infinite contexts across different domains like Monday CRM, Monday Service, and Monday Marketing. By rebuilding Sidekick with DeepAgent, they implemented four core principles: three-tier tool discovery (base, context-specific, and deferred tools), delegation-first architecture with sub-agents and middleware pipelines, code execution in sandboxes to replace hundreds of specific tools, and self-healing capabilities. This resulted in a 94% recovery success rate and enabled complex use cases like dynamically finding office locations based on geographical constraints using custom Python code."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-agents-from-monolithic-to-multi-agent-architecture-with-deepagent"
  ogTitle: "Monday dot com: Scaling AI Agents from Monolithic to Multi-Agent Architecture with DeepAgent - ZenML LLMOps Database"
  ogDescription: "Monday dot com evolved their AI assistant \"Sidekick\" from a simple react loop implementation (V1) through a problematic monolithic multi-agent system with over 200 tools (V2) to a sophisticated DeepAgent-based architecture (V3) designed to handle the complexity of multiple product divisions, entities, and contexts. The initial V2 architecture suffered from context pollution, confused LLMs, and rising costs due to too many tools and infinite contexts across different domains like Monday CRM, Monday Service, and Monday Marketing. By rebuilding Sidekick with DeepAgent, they implemented four core principles: three-tier tool discovery (base, context-specific, and deferred tools), delegation-first architecture with sub-agents and middleware pipelines, code execution in sandboxes to replace hundreds of specific tools, and self-healing capabilities. This resulted in a 94% recovery success rate and enabled complex use cases like dynamically finding office locations based on geographical constraints using custom Python code."
notion:
  pageId: "38ef8dff-2538-80e9-991a-d5e65e937a24"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-29T15:09:00.000Z"
  lastEditedTime: "2026-06-29T15:10:00.000Z"
  publishedAt: "2026-07-06T07:19:26Z"
---

## Overview

Monday dot com's case study presents a comprehensive journey of evolving their AI assistant called Sidekick through multiple architectural iterations to address real production challenges at enterprise scale. The presentation, delivered by Omri, a team manager at Monday dot com, chronicles the technical evolution from a basic reactive AI to a sophisticated DeepAgent-based system designed to handle the complexity of a multi-product, multi-domain work platform.

Monday dot com is positioned as an AI work platform helping teams scale their businesses, and they recently shifted their mission from simply helping companies manage work to actually doing the work for users. This includes having SDR agents that make phone calls to prospects, recruiting agents that interact with candidates, and various other domain-specific AI capabilities. The Sidekick AI assistant is designed to be an intelligence personal assistant that knows users' contacts, goals, active work, meetings, and can be trusted to accelerate and perform work on their behalf.

## The Evolution Through Three Versions

### Version 1: Simple React Loop

The first version of Sidekick, launched just a year before this presentation, was described candidly as "not great" but represented their initial attempt at bringing reactive AI to the Monday workspace. It was built on a simple react loop with a few tools and, while functional, lacked the sophistication needed for their growing ambitions and scale requirements.

### Version 2: The Monolithic Multi-Agent Disaster

The complexity of Monday dot com's product ecosystem became a major challenge as they developed V2. The company operates multiple product divisions including Monday CRM, Monday Service, and Monday Marketing, each with different needs, contexts, and terminology. Additionally, they have multiple entity types such as docs and boards, where each entity requires different tools and contexts depending on the domain. For example, opening a board in Monday Dev requires completely different tools and context than opening a doc in Monday CRM.

In their ambitious V2 attempt, they built a multi-agent architecture from scratch where each domain had its own MCP with its own tools, and each MCP could expose specific tools for particular contexts. They implemented dynamic prompting in Sidekick with context injection capabilities, allowing each domain to have its own tools. However, this architecture "exploded in our face" according to the presenter. The system ended up with one engine managing more than 200 tools with infinite contexts, leading to severe context pollution where the LLM became confused, costs rose dramatically, and the system became unmanageable. The realization was that the entire harness wasn't good enough, and they needed something entirely new.

### Version 3: DeepAgent-Based Architecture

After researching alternatives, Monday dot com chose DeepAgent as the foundation for rebuilding Sidekick. They selected DeepAgent based on several key characteristics: it was built for real work rather than just chat interfaces, it supported multi-step workflows with iteration planning, it provided better separation of concerns through sub-agents, it kept memory contextual rather than bloated, and critically, it supported a file system style with deep contact capabilities.

Their philosophy shifted from having a "chaotic swarm of hundreds of different special agents" to having "one smart orchestrator" with "one highly capable brain." They decided to trust the model's intelligence, handing off hard tasks like planning and memory management to the LLM itself, and building the system for progressive disclosure.

## Four Core Principles of the DeepAgent Implementation

### Principle 1: Three-Tier Tool Discovery

The three-tier classification system was their solution to the 200-tool prompt pollution problem. The system works as follows:

**Tier 1: Base Tools** - A small list of tools always exposed to the model, covering approximately 50-60% of use cases. These include common utilities like web search, image generation, web URL extraction, and knowledge base search across all of Monday. These are the most frequently used tools that form the foundation of most interactions.

**Tier 2: Context-Specific Tools** - Tools relevant to the specific entity, screen, or domain the user is currently viewing. If a user is in CRM looking at a doc, only tools relevant to that specific context are exposed, not the entire catalog. Examples include board activity tools and note-taking meeting tools when on note-taking screens. This tier dramatically reduces context pollution by limiting the tool surface area to what's immediately relevant.

**Tier 3: Deferred Tools** - A catalog of all remaining tools, each with a brief 20-word description. The agent can call a special "deferred tool activate" function when it needs one of these tools, which then brings that tool into the active context in real time. This approach reduces hallucination by keeping the context manageable while still making hundreds of tools available on-demand. The team noted that the next evolution would push these tool descriptions into a semantic database, allowing semantic search for specific tools rather than scanning through descriptions.

The presenter demonstrated this in action with a lunch menu example, where an agent understood a specific need, searched for the appropriate tool, activated it, and then used the create item tool.

### Principle 2: Delegation First

This principle splits into two major components: sub-agents and middleware pipelines.

**Sub-Agents** - These are specialized workers for common repetitive tasks. Monday dot com has implemented several sub-agents including presentation builders and web researchers. A critical feature is the ability to hand off work to another agent asynchronously, allowing the main agent to continue working while the sub-agent completes its task in parallel. This is described as crucial for their workflow because users are typically working on something and need to continue their work while other tasks execute in parallel. The demonstration showed a sub-agent building a complete presentation from scratch when asked to "tell me about yourself," utilizing a sandbox environment for execution.

**Middleware Pipelines** - To make delegation seamless, Sidekick depends heavily on middleware pipelines that separate concerns cleanly while remaining testable and composable, keeping the execution graph clean. Several middleware examples were provided:

- **Context Manager Middleware** - Injects user-specific information like identity, placement, timezone, and connected MCPs
- **Repairing Name Middleware** - Addresses the issue where LLMs sometimes become overconfident and invent tool names that don't exist, repairing or fixing these invented names to match actual available tools
- **Model Selection Middleware** - Allows users to choose which model they want to run Sidekick on, with real-time model switching capabilities

This middleware approach maintains clean separation of concerns while keeping the system flexible and maintainable at scale.

### Principle 3: Code Execution in Sandboxes

As Monday dot com scaled, they realized that building specific new tools for every possible use case was impractical. Instead of creating specialized sum or filter tools, they enabled the agent to write Python code and execute it inside a secure sandbox environment. They use LangChain sandbox for this purpose, which provides seamless integration with security guarantees. This single capability effectively replaced hundreds of potential specialized tools, as one secure sandbox can handle virtually any computational task the LLM can code.

The presenter described this as eliminating bloat and noted that when they pushed this to production, they saw incredibly creative use cases that blew their minds. One striking example involved a user wanting to find a new office for their company in London, specifically requiring that the office be no more than a 20-minute drive from Big Ben at a specific hour. Sidekick used Google APIs and mapping services, created an algorithm to define relevant offices around the location considering time-of-day traffic patterns, and solved a problem that would have been impossible without code generation. The presenter characterized this as "building an app" on the fly, representing a transformative capability beyond traditional chatbot interactions.

### Principle 4: Self-Healing Capabilities

LLMs are characterized as "super confident with themselves" and prone to hallucination. Rather than allowing failures in production, Monday dot com implemented self-correction mechanisms through healing middleware. Several examples of self-healing were described:

- **Variable Advisory Tool** - When Sidekick doesn't know how to do something and keeps trying different approaches unsuccessfully, middleware identifies the failure pattern and moves the task to a different model
- **Resource Scaling** - When out-of-memory errors occur from the LLM or harness, the system automatically scales up resources and retries
- **Retry Logic** - A straightforward but effective approach that solved numerous problems

The team reports achieving a 94% recovery success rate with these healing mechanisms implemented. The philosophy is that real-world enterprise workflows shouldn't fail frequently, so building robust self-correction into the system is essential for production reliability.

## Production Architecture and Operational Insights

The overall architecture represents a significant evolution from the chaotic V2 system. The new DeepAgent-based approach maintains a single orchestrator that intelligently manages tool discovery, delegates to specialized sub-agents when appropriate, leverages middleware for cross-cutting concerns, and can dynamically generate and execute code for novel tasks. The system is designed to handle the heterogeneous nature of Monday dot com's product suite, where different domains have fundamentally different needs, terminologies, and contexts.

The progressive disclosure approach ensures that the model never faces the overwhelming context pollution that plagued V2. By exposing only base tools, context-relevant tools, and on-demand deferred tools, the system maintains manageable context windows while still providing access to the full breadth of capabilities across the platform.

## Practical Recommendations and Takeaways

The presenter concluded with specific recommendations for teams building agent systems with DeepAgent:

**Use the Code Writing Tool** - Described as the "ultimate infinite scale tool," enabling code generation and sandbox execution eliminates the need for hundreds of specialized tools and provides unprecedented flexibility for solving novel problems.

**Prefer Delegation** - No single agent can handle everything effectively. Distributing work across specialized sub-agents maintains focus and improves reliability.

**Use Tool Discovery** - Rather than pushing long lists of tools to a single orchestrator agent, implement progressive disclosure through tiered discovery systems that expose tools only when relevant.

**Use Middleware** - Middleware provides clean separation of concerns, making systems more testable, maintainable, and composable while keeping execution logic clear.

**Just Use DeepAgent** - The presenter's final recommendation was simply to adopt DeepAgent as the framework, given the robustness and flexibility it provided for their use case.

## Critical Assessment

While this case study provides valuable technical insights into scaling AI agent systems in production, several caveats should be considered. The presentation was delivered at what appears to be a DeepAgent-focused conference or event, which may introduce promotional bias. The claimed 94% recovery success rate is impressive but lacks context about what constitutes success, what types of failures are excluded, or how this metric is measured in production.

The transition from V2 to V3 is presented as a complete success, but the presentation doesn't discuss the migration challenges, how they maintained service continuity during the rebuild, or what trade-offs were made in the new architecture. The code execution capability, while powerful, introduces significant security considerations that are mentioned only briefly through the reference to "secure sandbox" without detailing the security model, isolation mechanisms, or how they prevent malicious code execution.

The reliance on LLMs to write executable Python code also introduces reliability questions. While the self-healing mechanisms address some failure modes, code generation remains prone to logical errors, edge cases, and security vulnerabilities that may not be caught by automated retry logic. The presentation doesn't discuss how they validate generated code, what testing frameworks surround this capability, or how they handle code that produces incorrect results rather than outright failures.

The three-tier tool discovery system is elegant but raises questions about latency. Activating deferred tools in real-time adds overhead, and the presentation doesn't discuss how they optimize for common patterns or whether tool activation introduces noticeable delays in user interactions.

Overall, however, this represents a thoughtful and comprehensive approach to production LLMOps challenges, with the team demonstrating clear learning from their failures and a pragmatic approach to architectural evolution. The emphasis on progressive disclosure, clean separation of concerns through middleware, and self-healing mechanisms reflects mature thinking about enterprise AI systems. The specific metrics provided and detailed architectural decisions make this a valuable case study for organizations facing similar scaling challenges with multi-domain AI agent systems.
