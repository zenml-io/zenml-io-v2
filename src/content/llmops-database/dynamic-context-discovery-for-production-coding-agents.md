---
title: "Dynamic Context Discovery for Production Coding Agents"
slug: "dynamic-context-discovery-for-production-coding-agents"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "695e11ba7b3e23cf65e359e1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2026-01-07T07:57:41.784Z"
  createdOn: "2026-01-07T07:56:42.790Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "agent-based"
  - "prompt-engineering"
  - "token-optimization"
  - "mcp"
  - "semantic-search"
  - "multi-agent-systems"
  - "system-prompts"
  - "chunking"
  - "open-source"
industryTags: "tech"
company: "Cursor"
summary: "Cursor, a coding agent platform, developed a \"dynamic context discovery\" approach to optimize how their AI agents use context windows and token budgets when working on long-running software development tasks. Instead of loading all potentially relevant information upfront (static context), their system enables agents to dynamically pull only the necessary context as needed. They implemented five key techniques: converting long tool outputs to files, using chat history files during summarization, supporting the Agent Skills standard, selectively loading MCP tools (reducing tokens by 46.9%), and treating terminal sessions as files. This approach improves token efficiency and response quality by reducing context window bloat and preventing information overload for the underlying LLM."
link: "https://cursor.com/blog/dynamic-context-discovery"
year: 2026
seo:
  title: "Cursor: Dynamic Context Discovery for Production Coding Agents - ZenML LLMOps Database"
  description: "Cursor, a coding agent platform, developed a \"dynamic context discovery\" approach to optimize how their AI agents use context windows and token budgets when working on long-running software development tasks. Instead of loading all potentially relevant information upfront (static context), their system enables agents to dynamically pull only the necessary context as needed. They implemented five key techniques: converting long tool outputs to files, using chat history files during summarization, supporting the Agent Skills standard, selectively loading MCP tools (reducing tokens by 46.9%), and treating terminal sessions as files. This approach improves token efficiency and response quality by reducing context window bloat and preventing information overload for the underlying LLM."
  canonical: "https://www.zenml.io/llmops-database/dynamic-context-discovery-for-production-coding-agents"
  ogTitle: "Cursor: Dynamic Context Discovery for Production Coding Agents - ZenML LLMOps Database"
  ogDescription: "Cursor, a coding agent platform, developed a \"dynamic context discovery\" approach to optimize how their AI agents use context windows and token budgets when working on long-running software development tasks. Instead of loading all potentially relevant information upfront (static context), their system enables agents to dynamically pull only the necessary context as needed. They implemented five key techniques: converting long tool outputs to files, using chat history files during summarization, supporting the Agent Skills standard, selectively loading MCP tools (reducing tokens by 46.9%), and treating terminal sessions as files. This approach improves token efficiency and response quality by reducing context window bloat and preventing information overload for the underlying LLM."
---

## Overview

Cursor is a coding agent platform that has evolved sophisticated approaches to managing LLM context windows in production environments. Their January 2026 research blog post describes a pattern they call "dynamic context discovery," which addresses a fundamental challenge in deploying long-running AI agents: how to provide the right amount of context without overwhelming the model or wasting tokens. This case study is particularly relevant to LLMOps because it documents real production engineering decisions made while running frontier LLMs as coding agents at scale.

The core insight driving Cursor's approach is that as models have improved as agents, they perform better when given less static context upfront and more ability to pull relevant information dynamically. This represents a significant shift from earlier prompting strategies that emphasized comprehensive context injection. Cursor's "agent harness"—their term for the instructions and tools provided to the model—is optimized individually for each frontier model they support, but the dynamic context discovery patterns they describe apply across all models.

## The Problem: Context Window Management at Scale

When deploying LLMs as coding agents in production, several context-related challenges emerge that don't appear in simpler use cases. Tool calls can return massive JSON responses that bloat the context window. Chat histories accumulate over long sessions. Third-party integrations like MCP (Model Context Protocol) servers can inject hundreds or thousands of tokens describing tools that may never be used. Terminal outputs from long-running processes can contain enormous amounts of data, most of which is irrelevant to the current task.

The traditional approach of truncating long outputs leads to data loss, potentially discarding critical information. Meanwhile, injecting everything as static context creates several problems: wasted tokens on irrelevant information, confusion from contradictory or tangential data, and premature hitting of context limits that trigger lossy summarization. Cursor recognized that better context engineering could improve both efficiency and quality across all the models they support.

## Core Architecture: Files as a Universal Abstraction

Cursor's solution centers on using files as the primary abstraction for dynamic context discovery. Rather than injecting large amounts of data directly into the prompt, they write information to files and give the agent tools to selectively read what it needs. This mirrors how CLI-based coding agents naturally work with filesystem-based context, but extends the pattern more broadly.

The file-based approach provides several advantages from an LLMOps perspective. Files are a familiar abstraction that models understand well through their training data. They enable lazy loading—information exists and is discoverable, but doesn't consume tokens until accessed. They support partial reading through standard tools like `tail`, `head`, and `grep`. And they create a clean interface between the agent harness and various data sources without requiring model-specific customization.

Importantly, Cursor acknowledges uncertainty about whether files will remain the optimal interface long-term, but treats them as a pragmatic choice that's flexible enough to accommodate future developments. This reflects mature production thinking—choosing abstractions that are proven, well-understood, and easily modified rather than over-engineering for hypothetical future requirements.

## Implementation Details: Five Key Techniques

**Converting Long Tool Responses to Files:** For first-party tools like Cursor's file editing and codebase search, they maintain tight control over response formats to prevent bloat. But third-party tools—shell commands and MCP calls—can return arbitrarily large outputs. Instead of truncating these responses, Cursor writes them to temporary files and informs the agent of the file location. The agent can then use standard tools to inspect the output. A common pattern is calling `tail` first to check the end of the output (where error messages often appear), then reading more selectively if needed. This prevents unnecessary summarizations triggered by hitting context limits, while preserving all the information that might be needed.

**Chat History Files for Improved Summarization:** When an agent session runs long enough to fill the context window, Cursor performs a summarization step to compress the history and provide a fresh context window. However, summarization is inherently lossy—important details may be omitted or distorted. Cursor's solution is to write the complete chat history to a file before summarization. After the summary is generated, the agent has access to this history file. If the agent recognizes it's missing crucial details that were in the original context, it can search through the history file to recover them. This creates a two-tier memory system: the summary provides efficient compressed context, while the full history serves as a backup that can be queried when needed.

**Agent Skills Open Standard Support:** Cursor supports Agent Skills, which is described as an open standard for extending coding agents with specialized capabilities. Skills are essentially structured files that tell the agent how to perform domain-specific tasks. Each skill includes a name and description that can be included in static context, but the detailed instructions, examples, and bundled executables live in files. The agent performs dynamic context discovery using grep and Cursor's semantic search to find relevant skills when needed. This allows maintaining a large library of specialized capabilities without overwhelming the context window. The file-based nature of skills means agents can easily discover what tools, scripts, or procedures are available for particular tasks.

**Selective MCP Tool Loading:** The Model Context Protocol (MCP) enables access to secured resources behind OAuth—production logs, external design files, internal documentation, and other enterprise resources. However, MCP servers can expose many tools, each with lengthy descriptions. If multiple MCP servers are configured, the context bloat compounds significantly. Most tools go unused in any given session despite always being included in the prompt. Cursor's solution is to sync MCP tool descriptions to a folder structure. The agent receives only minimal static context—essentially tool names—and is prompted to look up full tool descriptions when a task requires them. In A/B testing focused on runs that actually called MCP tools, this approach reduced total agent tokens by 46.9%, a statistically significant result though with high variance depending on the number of configured MCP servers. Beyond token efficiency, this file-based approach enables better error handling. Previously, if an MCP server needed re-authentication, those tools would simply disappear from the agent's awareness, confusing users. Now the agent can detect the authentication status through the file metadata and proactively inform users to re-authenticate.

**Terminal Session Files:** Cursor's integrated terminal feature syncs all terminal session outputs to the local filesystem. This enables natural interactions like asking "why did my command fail?" without requiring users to manually copy-paste terminal output into the agent input. Since terminal histories can be extremely long—especially for long-running processes like development servers—the agent can use grep to extract only relevant portions. This provides the benefits that CLI-based coding agents naturally receive (prior shell output in context) but through dynamic discovery rather than static injection.

## Production Results and Tradeoffs

The most concrete quantitative result Cursor reports is the 46.9% token reduction for MCP tool usage, which has direct cost and latency implications at scale. Beyond this, they claim fewer unnecessary summarizations when using file-based tool outputs, and improved summarization quality through chat history references. The blog post emphasizes that dynamic context discovery is "far more token-efficient" and can "improve the agent's response quality by reducing the amount of potentially confusing or contradictory information in the context window."

However, it's important to note that these claims lack detailed evaluation metrics. The case study doesn't provide specific measurements of response quality improvements, task success rates, or user satisfaction. The A/B test for MCP tools focused on token reduction rather than quality metrics. While token efficiency is clearly valuable, the quality claims remain somewhat anecdotal from a rigorous LLMOps evaluation perspective.

There are also inherent tradeoffs to the dynamic discovery approach that the post doesn't deeply explore. Requiring agents to perform additional tool calls to discover context adds latency—each file read is another round trip. For tasks where most context is actually needed, static injection might be faster. The approach assumes models are capable enough to recognize what context they need and retrieve it appropriately, which may not hold for all model tiers or task types. There's also increased complexity in the agent harness—managing file lifecycle, handling concurrent access, and ensuring consistent file state all add operational overhead.

The blog post positions dynamic context discovery as successful specifically because "models have become better as agents," suggesting this pattern emerged from observing model capabilities rather than being imposed top-down. This is sound engineering practice—adapting the system to the strengths of the underlying technology—but it also means the approach may need revisiting as models continue to evolve.

## LLMOps Operational Considerations

From a production LLMOps perspective, Cursor's approach reflects several mature operational practices. They emphasize model-agnostic improvements that work across different frontier models in their harness, reducing the maintenance burden when models are updated or swapped. The file-based abstraction provides clean separation between the agent framework and specific model APIs, making the system more maintainable.

The system handles context limits gracefully through the summarization mechanism with history file backup, preventing hard failures when sessions run long. The MCP authentication status detection shows attention to production error handling—detecting degraded states and providing actionable information to users rather than silent failures.

The blog notes these improvements will be "live for all users in the coming weeks," indicating a staged rollout typical of production systems. The work involved multiple team members (Lukas Moller, Yash Gaitonde, Wilson Lin, Jason Ma, Devang Jhabakh, and Jediah Katz), suggesting non-trivial engineering effort across the stack.

However, the case study doesn't address several operational concerns that would be relevant in a complete LLMOps view. There's no discussion of monitoring and observability—how do they track when dynamic discovery fails or when agents make poor decisions about what context to retrieve? No mention of testing strategies for this behavior across different models and task types. Cost implications beyond token counts aren't explored—how does the latency from additional tool calls affect user experience and infrastructure costs? And there's no discussion of how they handle the filesystem implications at scale—storage management, cleanup policies, concurrent access patterns, or security considerations for sensitive data being written to files.

## Context Engineering as Competitive Advantage

A notable aspect of this case study is its focus on context engineering as a differentiator. Cursor explicitly states their agent harness is "optimized individually for every new frontier model we support," but frames dynamic context discovery as a layer above model-specific tuning. This suggests a strategic view where the models themselves (from providers like Anthropic, OpenAI, etc.) are commodities that Cursor wraps with sophisticated prompting, tools, and context management to create their product value.

The emphasis on token efficiency has clear business implications—lower token costs mean better margins or the ability to offer more generous usage tiers. The 46.9% reduction in MCP scenarios could represent substantial cost savings at scale. But more importantly, better context management potentially improves quality, which is harder to quantify but ultimately more important for user experience and retention.

The blog post reads partially as technical documentation and partially as thought leadership—establishing Cursor's expertise in agent engineering and potentially recruiting talent (they end with a hiring pitch). This is typical of tech company blog posts, but it means claims should be evaluated with appropriate skepticism. The techniques described are plausible and align with broader industry trends toward agentic workflows, but the specific results and quality improvements aren't independently verified.

## Broader Implications for LLM Agent Deployment

This case study illustrates several patterns likely to become standard in LLMOps for agent systems. The shift from static to dynamic context discovery parallels broader trends in software architecture toward lazy loading and just-in-time resource allocation. The recognition that better models enable simpler prompting strategies challenges the assumption that prompt engineering complexity should increase over time—sometimes better models enable simpler systems.

The file abstraction choice is interesting because it's deliberately low-tech. Cursor could have built custom protocols, structured data formats, or sophisticated caching layers. Instead they chose the filesystem—old, simple, universally understood. This reflects pragmatism about uncertainty: when the technology landscape is changing rapidly, conservative choices about abstractions can be wise.

The MCP integration approach shows how to adapt third-party protocols that weren't designed with token efficiency in mind. As the ecosystem around LLM agents matures, this kind of bridging work—taking protocols and tools built with different assumptions and adapting them to production agent constraints—will be increasingly important.

Overall, Cursor's dynamic context discovery represents thoughtful production engineering for LLM agents, balancing efficiency, quality, and operational complexity. While the specific claims would benefit from more rigorous evaluation and the approach has inherent tradeoffs, the patterns described provide valuable insights for anyone deploying long-running LLM agents in production environments.