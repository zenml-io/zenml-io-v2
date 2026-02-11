---
title: "Context Engineering for Production AI Agents at Scale"
slug: "context-engineering-for-production-ai-agents-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908954e1c52ba7bd28f81dd"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:51.558Z"
  createdOn: "2025-11-03T11:43:10.201Z"
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "visualization"
  - "poc"
  - "realtime-application"
  - "structured-output"
  - "multi-modality"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "token-optimization"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "system-prompts"
  - "mcp"
  - "evals"
  - "semantic-search"
  - "langchain"
  - "docker"
  - "monitoring"
  - "databases"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "fastapi"
  - "postgresql"
  - "sqlite"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "tech"
company: "Manus"
summary: "Manus, a general AI agent platform, addresses the challenge of context explosion in long-running autonomous agents that can accumulate hundreds of tool calls during typical tasks. The company developed a comprehensive context engineering framework encompassing five key dimensions: context offloading (to file systems and sandbox environments), context reduction (through compaction and summarization), context retrieval (using file-based search tools), context isolation (via multi-agent architectures), and context caching (for KV cache optimization). This approach has been refined through five major refactors since launch in March, with the system supporting typical tasks requiring around 50 tool calls while maintaining model performance and managing token costs effectively through their layered action space architecture."
link: "https://www.youtube.com/watch?v=6_BcCthVvb8"
year: 2025
seo:
  title: "Manus: Context Engineering for Production AI Agents at Scale - ZenML LLMOps Database"
  description: "Manus, a general AI agent platform, addresses the challenge of context explosion in long-running autonomous agents that can accumulate hundreds of tool calls during typical tasks. The company developed a comprehensive context engineering framework encompassing five key dimensions: context offloading (to file systems and sandbox environments), context reduction (through compaction and summarization), context retrieval (using file-based search tools), context isolation (via multi-agent architectures), and context caching (for KV cache optimization). This approach has been refined through five major refactors since launch in March, with the system supporting typical tasks requiring around 50 tool calls while maintaining model performance and managing token costs effectively through their layered action space architecture."
  canonical: "https://www.zenml.io/llmops-database/context-engineering-for-production-ai-agents-at-scale"
  ogTitle: "Manus: Context Engineering for Production AI Agents at Scale - ZenML LLMOps Database"
  ogDescription: "Manus, a general AI agent platform, addresses the challenge of context explosion in long-running autonomous agents that can accumulate hundreds of tool calls during typical tasks. The company developed a comprehensive context engineering framework encompassing five key dimensions: context offloading (to file systems and sandbox environments), context reduction (through compaction and summarization), context retrieval (using file-based search tools), context isolation (via multi-agent architectures), and context caching (for KV cache optimization). This approach has been refined through five major refactors since launch in March, with the system supporting typical tasks requiring around 50 tool calls while maintaining model performance and managing token costs effectively through their layered action space architecture."
---

## Overview

Manus is a production AI agent platform that runs as a general-purpose agent within a full virtual machine sandbox environment. The company was founded by Pete (co-founder and chief scientist) and launched in March, with operations based in Singapore. This case study, presented as a webinar collaboration between Manus and LangChain in late 2024, provides deep insights into how Manus approaches context engineering for production agents at scale. The central challenge they address is context explosion in autonomous agents—where typical tasks require around 50 tool calls and production agents can engage in conversations spanning hundreds of turns, leading to what the industry calls "context rot" where performance degrades as context grows.

## The Context Engineering Problem

The fundamental challenge Manus faces stems from the nature of agentic systems. Unlike simple chatbots, agents are bound to multiple tools and can call these tools autonomously in loops. Every tool call generates a tool observation that gets appended to the chat message history, creating unbounded growth in context. Anthropic has noted that production agents can span hundreds of conversational turns, and research from companies like Gradient shows that performance drops as context grows—creating a paradox where agents need lots of context but perform worse with it.

Pete from Manus emphasizes that context engineering represents the clearest practical boundary between application and model layers. The company deliberately avoids premature fine-tuning or post-training, having learned from previous startups that building specialized models too early caps innovation speed. They advocate trusting general models and context engineering as long as possible, noting that their biggest performance leaps came from simplifying architecture rather than adding complexity.

## Context Offloading Strategy

Manus implements context offloading at multiple levels. The most fundamental approach uses the file system extensively—taking token-heavy tool outputs (like web search results) and dumping them to the file system rather than keeping them in the message history. The agent receives only minimal information necessary to reference the full context if needed, such as a file path. This pattern is used across many production agent systems including Deepseek agents, Open Deep Research, Cloud Code, and various long-running agent implementations.

What makes Manus unique is their full virtual machine sandbox approach. Each Manus session runs inside a customized Linux environment, enabling sophisticated offloading strategies. Files created in the sandbox persist and can be accessed via standard Linux tools like grep, glob, cat, and less. This eliminates the need for vector databases or semantic search indexes for many use cases, as the file system itself becomes the persistence and retrieval layer.

The sandbox approach also enables what Manus calls their "layered action space"—a three-tier system for tool management:

- **Level 1: Function Calling** - A fixed set of atomic functions (around 10-20) including file operations, shell commands, web search, and browser operations. These use schema-safe constraint decoding and maintain KV cache efficiency.

- **Level 2: Sandbox Utilities** - Pre-installed command-line utilities within the Linux environment, including format converters, speech recognition tools, and crucially, an MCP CLI for calling Model Context Protocol tools. These don't pollute the function calling space and can be discovered via standard help commands.

- **Level 3: Packages and APIs** - The agent can write Python scripts to call pre-authorized APIs or custom packages for complex computations. Manus purchases API access on behalf of users, with keys pre-installed in the sandbox.

This layered approach offloads tool complexity from the model's context window while maintaining composability. From the model's perspective, all three levels still use standard function calls (primarily shell and file operations), so the interface remains simple and cache-friendly.

## Context Reduction: Compaction vs Summarization

Manus makes a crucial distinction between two types of context reduction: compaction and summarization. This represents one of their key innovations in production LLMOps.

**Compaction** is reversible reduction. Every tool call and result has two formats: full and compact. The compact version strips information that can be reconstructed from the file system or external state. For example, a file write operation might have path and content fields—but once the tool returns and the file exists, the compact format can drop the content field and keep only the path. The agent can simply read the file again if needed. Pete emphasizes that almost every action in Manus is naturally reversible if you can offload to the file system, with unique identifiers already present (file paths for file ops, URLs for browser ops, queries for search ops).

**Summarization** is irreversible reduction. It's used only when compaction no longer provides sufficient context savings. Before summarizing, Manus may offload key context parts to files, sometimes dumping the entire pre-summary context as a log file that can be retrieved via grep if needed. Critically, they use structured outputs rather than free-form summarization—defining a schema with specific fields (files modified, user goals, current state) that the model fills in. This ensures stable, iterable outputs and prevents information loss.

Manus tracks multiple context length thresholds: the model's hard limit (often 1M tokens), the pre-rot threshold where degradation begins (typically 128K-200K tokens), and the compaction trigger point. When approaching the pre-rot threshold, they trigger compaction first, typically compacting the oldest 50% of tool calls while keeping newer ones in full detail so the model has fresh few-shot examples of proper tool usage. Only when multiple compaction rounds yield minimal gains do they resort to summarization, and even then they preserve the last few tool calls in full detail to maintain behavioral continuity.

## Context Retrieval Architecture

Unlike some production agent systems that use vector databases and semantic search, Manus relies primarily on file-based retrieval using standard Linux tools like grep and glob. Pete explains this decision pragmatically: every Manus session starts fresh in a new sandbox, and users expect fast interaction. Building indexes on the fly is impractical. The approach works because they operate within a bounded environment (the sandbox) at human-scale data volumes, similar to how Cloud Code operates within a codebase.

However, Pete acknowledges this isn't universal—for integrating enterprise knowledge bases or long-term memory across sessions, vector indexes become necessary. The scale determines the approach. Manus does implement explicit knowledge management through a "knowledge" feature where users can instruct the agent to remember preferences (like "always deliver results in Excel format"). These require user confirmation before persisting, and the system tracks collective feedback patterns—for example, multiple users correcting font issues in data visualizations, which could inform future self-improvement.

## Context Isolation via Multi-Agent Architecture

Manus uses multi-agent architectures for context isolation but deliberately avoids role-based agent divisions (designer agent, programmer agent, etc.). Pete argues that human organizational structures exist due to human context limitations—constraints that don't necessarily apply to AI systems. Instead, Manus maintains a small set of functionally-specific agents:

- A general executor agent that handles most tasks
- A planner agent for task decomposition and planning
- A knowledge management agent that reviews conversations to identify information worth persisting
- Data/API registration agents for specific integration tasks

They implement two patterns for multi-agent communication, inspired by Go programming philosophy:

**By Communicating** - The classic sub-agent pattern where the main agent writes a prompt sent to a sub-agent whose context consists only of that instruction. This works for short, clear tasks where only the final output matters (like searching a codebase for a snippet). Cloud Code uses this pattern extensively with its task tool.

**By Sharing Memory/Context** - The sub-agent sees the entire previous context including tool usage history but has its own system prompt and action space. This suits complex scenarios like deep research where the final output depends on intermediate searches and notes. Rather than forcing the sub-agent to re-read everything from files (wasting latency and tokens), they share context directly.

Manus implements what they call "agent as tool"—from the model's perspective, calling an advanced search function might actually spawn a sub-agent workflow with a fixed output schema. They use constraint decoding to ensure sub-agents submit results matching schemas defined by the main agent, creating a map-reduce-like pattern. The shared sandbox filesystem enables efficient information passing between agents.

## Caching Strategy and Cost Management

KV cache management is critical to Manus's production architecture. Interestingly, Pete reveals they use frontier models (primarily Anthropic Claude, with some Gemini and OpenAI) rather than open-source models primarily due to caching infrastructure. At Manus's scale, with agents generating far more input tokens than output tokens, distributed KV cache becomes essential. Frontier providers offer solid global distributed caching infrastructure that's difficult to replicate with open-source deployments. When accounting for cache reuse, flagship models can actually be cheaper than self-hosted open-source alternatives.

Their layered action space design is explicitly optimized for cache efficiency. By keeping the function calling interface minimal and consistent (primarily shell and file operations), they maximize cache hit rates. New capabilities added as sandbox utilities or packages don't invalidate cached prompts since the core function signatures remain unchanged. Tool definitions sit at the front of context, so dynamic tool loading would reset KV cache—another reason for their static atomic function approach with capability expansion via sandbox and code.

## Evaluation Strategy

Manus employs a three-tier evaluation approach that has evolved significantly from their early reliance on academic benchmarks:

**User Ratings** - The gold standard. Every completed session requests 1-5 star feedback from users. Pete emphasizes this became their primary metric after discovering that high scores on benchmarks like GAIA didn't correlate with user satisfaction.

**Automated Tests with Verifiable Results** - Internal datasets with clear answers, including custom datasets focused on execution and transactional tasks rather than just reasoning. Their sandbox enables frequent environment resets for reproducible testing.

**Human Evaluation** - Extensive use of human evaluators (Pete mentions "a lot of interns") for subjective quality assessment, particularly for tasks like website generation and data visualization where aesthetic appeal matters and reward models are inadequate.

The company has refactored their entire agent architecture five times since launching in March—roughly every 1-2 months. They evaluate architecture changes by fixing the architecture and switching between weaker and stronger models. If an architecture gains significant performance from model upgrades, it's considered more future-proof. They also test internally with open-source models and early access to proprietary models to prepare for next-generation releases before they launch.

## Production Deployment Details

Manus runs each user session in an isolated, customized Linux VM. This provides strong isolation for multi-tenancy and enables the full range of sandbox utilities and file system operations. The system must handle both ephemeral session state and persistent user knowledge/preferences. Within sessions, Manus carefully tracks context growth and triggers compaction or summarization dynamically based on threshold monitoring.

For guardrails and safety, Manus implements outbound traffic inspection to prevent credential exfiltration, even in prompt injection scenarios. They sanitize data leaving the sandbox and require manual user confirmation for sensitive operations, both in the browser component (which persists login states) and the shell. Pete acknowledges this is challenging and they work closely with Anthropic and Google on model-level guardrails, progressively reducing confirmation frequency as model safety improves.

The system supports MCP (Model Context Protocol), which Pete identifies as a "big changer" that shifted Manus from a compact static action space to something infinitely extensible. This made RL-based post-training impractical since the action space isn't fixed—generating balanced rollouts and feedback becomes extremely difficult. As Pete puts it, supporting MCP while doing RL means "you are literally building a foundation model by yourself," duplicating effort that model providers already invest in.

## Technical Tradeoffs and Design Philosophy

Several key tradeoffs emerge from Manus's production experience:

**Compaction vs Summarization** - Compaction maintains reversibility but has diminishing returns after multiple rounds. Summarization provides better compression but loses information irreversibly. The solution is staged reduction: compaction first, only summarizing when gains from compaction become minimal.

**Function Calling vs Code** - Function calling provides schema safety via constraint decoding but pollutes context with too many tools. Code (via sandbox/Python) is composable and can chain multiple operations in one step, but lacks schema safety and constraint decoding. Manus uses both: atomic functions for core operations, code for complex computation and data processing.

**Multi-Agent Communication** - Sharing context between agents enables richer interaction but is expensive (larger prefills, no KV cache reuse across different system prompts). Isolated sub-agents are cheaper but require explicit information passing. The choice depends on whether the task needs full history or just instructions and results.

**Open Source vs Proprietary Models** - Despite being an application company, Manus finds proprietary models more cost-effective due to distributed caching infrastructure. They perform task-level and even subtask-level routing across Anthropic (best for coding), Gemini (best for multimodal), and OpenAI (best for complex math/reasoning).

Pete's overarching philosophy, emphasized multiple times, is to "build less and understand more" and "avoid context over-engineering." The biggest improvements came from simplification and trusting models more, not from adding clever tricks. Context engineering should make the model's job simpler, not harder. He recommends being firm about drawing the line between application and model responsibilities, with context engineering representing the clearest practical boundary.

## Lessons for LLMOps Practitioners

Several actionable insights emerge for teams building production agent systems:

- Leverage structured outputs (schemas) as contracts for agent-to-agent communication and for summarization to prevent information loss
- Distinguish between reversible (compaction) and irreversible (summarization) context reduction, using staged approaches
- Consider multi-level action spaces that offload complexity from function calling to sandbox environments or code execution
- Track multiple context thresholds (hard limit, pre-rot threshold, compaction trigger) rather than just the model's maximum
- Keep recent tool calls in full detail even after compaction/summarization to maintain few-shot learning and behavioral continuity
- Design agents functionally rather than by anthropomorphized roles (avoid "designer agent," "programmer agent" patterns)
- Use file systems extensively for context offloading and retrieval at human-scale data volumes
- Optimize architectures for cache efficiency by keeping core function interfaces stable while expanding capabilities elsewhere
- Evaluate architectures by testing across different model tiers, not just on static benchmarks
- Prioritize user feedback over benchmark scores for product-market fit validation

The case study provides a rare production-scale view of context engineering challenges and solutions, with Manus having battle-tested these approaches across thousands of user sessions since March 2024. The emphasis on simplification, staged reduction strategies, and careful boundary-drawing between application and model responsibilities offers valuable guidance for LLMOps practitioners building autonomous agent systems.