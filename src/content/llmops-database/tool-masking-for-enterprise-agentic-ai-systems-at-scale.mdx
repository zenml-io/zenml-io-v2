---
title: "Tool Masking for Enterprise Agentic AI Systems at Scale"
slug: "tool-masking-for-enterprise-agentic-ai-systems-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69284e48786b92cfdf550a80"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:29:47.888Z"
  createdOn: "2025-11-27T13:12:40.914Z"
llmopsTags:
  - "customer-support"
  - "poc"
  - "high-stakes-application"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "cost-optimization"
  - "latency-optimization"
  - "token-optimization"
  - "mcp"
  - "api-gateway"
  - "reliability"
  - "scalability"
  - "documentation"
  - "anthropic"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "tech"
company: "Databook"
summary: "Databook, which automates sales processes for large tech companies like Microsoft, Salesforce, and AWS, faced challenges running reliable agentic AI workflows at enterprise scale. The primary problem was that connecting services through Model Context Protocol (MCP) exposed entire APIs to LLMs, polluting execution with irrelevant data, increasing tokens and costs, and reducing reliability through \"choice entropy.\" Their solution involved implementing \"tool masks\"—a configuration layer between agents and tool handlers that filters and reshapes input/output schemas, customizes tool interfaces per agent context, and enables prompt engineering of tools themselves. This approach resulted in cleaner, faster, more reliable agents with reduced costs, better self-correction capabilities, and the ability to rapidly adapt to customer requirements without code deployments."
link: "https://www.youtube.com/watch?v=55YwbrTrruU"
year: 2025
seo:
  title: "Databook: Tool Masking for Enterprise Agentic AI Systems at Scale - ZenML LLMOps Database"
  description: "Databook, which automates sales processes for large tech companies like Microsoft, Salesforce, and AWS, faced challenges running reliable agentic AI workflows at enterprise scale. The primary problem was that connecting services through Model Context Protocol (MCP) exposed entire APIs to LLMs, polluting execution with irrelevant data, increasing tokens and costs, and reducing reliability through \"choice entropy.\" Their solution involved implementing \"tool masks\"—a configuration layer between agents and tool handlers that filters and reshapes input/output schemas, customizes tool interfaces per agent context, and enables prompt engineering of tools themselves. This approach resulted in cleaner, faster, more reliable agents with reduced costs, better self-correction capabilities, and the ability to rapidly adapt to customer requirements without code deployments."
  canonical: "https://www.zenml.io/llmops-database/tool-masking-for-enterprise-agentic-ai-systems-at-scale"
  ogTitle: "Databook: Tool Masking for Enterprise Agentic AI Systems at Scale - ZenML LLMOps Database"
  ogDescription: "Databook, which automates sales processes for large tech companies like Microsoft, Salesforce, and AWS, faced challenges running reliable agentic AI workflows at enterprise scale. The primary problem was that connecting services through Model Context Protocol (MCP) exposed entire APIs to LLMs, polluting execution with irrelevant data, increasing tokens and costs, and reducing reliability through \"choice entropy.\" Their solution involved implementing \"tool masks\"—a configuration layer between agents and tool handlers that filters and reshapes input/output schemas, customizes tool interfaces per agent context, and enables prompt engineering of tools themselves. This approach resulted in cleaner, faster, more reliable agents with reduced costs, better self-correction capabilities, and the ability to rapidly adapt to customer requirements without code deployments."
---

## Overview and Context

Databook serves large technology companies including Microsoft, Salesforce, and AWS by automating sales force workflows through AI agents. The company's head of applied AI, Frank, presented their approach to managing production agentic systems at enterprise scale. Their work involves creating presentations, running intelligence flows, and assisting with sales operations, which has taught them critical lessons about how agentic frameworks need to function when deployed at scale for major enterprises.

The presentation focuses on a specific LLMOps challenge they've solved: the "tooling layer" problem in production AI agent systems. When building long-running production workflows for large tech companies, Databook needed to ensure these systems work reliably, produce consistent results at volume, maintain quality, and optimize costs simultaneously.

## The Core Problem: MCP and Tool Surface Pollution

While Frank acknowledges that Model Context Protocol (MCP) is valuable and has helped connect many services to their agents more easily, he identifies a critical limitation. MCP excels at standardizing connections across services and is gaining wide adoption, but it doesn't filter the tool surface that gets exposed to agents. When any service is connected through MCP, it typically exposes the entire API or service surface to the LLM without any filtering or optimization.

This creates several problems in production environments. First, agents work best with clean, focused inputs and clear expectations for outputs—when these conditions are met, consistency, accuracy, quality, speed, and cost all improve. However, MCP's approach of fully exposing APIs "pollutes" LLM execution with information the agent doesn't need. The input objects provided often aren't tuned to the specific context or agent being used.

Frank uses the example of Yahoo Finance API to illustrate the scale of this problem. A typical stock quote request returns approximately 100 different fields of data. When an agent receives this much information and tries to combine it with outputs from other parallel tool calls, several issues arise: the prompt becomes bloated with irrelevant data, unnecessary tokens are processed, and accuracy demonstrably degrades. He references multiple articles documenting how this information overload degrades quality in LLM systems.

## The Concept of Choice Entropy

A key concept Frank introduces is "choice entropy"—the idea that providing more choices to a model creates more opportunities for it to misfire, accidentally use wrong fields, or misunderstand parts of the prompt. This isn't just about outputs; the input schema presents an even more critical challenge. Using Yahoo Finance again as an example, the API allows selection of numerous variations: profile data, financial data, income history, and many other options. All this variability represents information the LLM must accurately provide to reach a proper outcome.

Without properly reshaping these schemas to avoid conflicts with other tools, LLM execution becomes less reliable. The remote control analogy Frank uses is particularly apt: while a typical remote comes with many buttons and customization options, what you actually want to surface to an agent is the simplest possible interface that achieves the desired outcome. The goal is to minimize unnecessary tokens, exclude unrelated information, and reduce choice entropy to improve reliability.

## The Solution: Tool Masking Architecture

Databook's solution involves introducing a "tool masking" layer between agents and the underlying tool handlers. This architecture has three primary components:

At the bottom layer sits the tool handler—what MCP exposes or what the service itself exposes. This contains the full raw surface of the tool, including complete API input and output objects. This layer remains constant and could be MCP-based or not.

On top of this handler, they run masks. These masks define the interface that goes to the agent and handle translation to the underlying handler. What makes this particularly powerful is that these masks become part of what agent editors, agent builders, and prompt engineers actually edit. Instead of only editing the agent's prompt and context, they also engineer the mask of the tool itself.

This represents an evolution from traditional prompt engineering to what Frank calls "context engineering"—where context engineering includes engineering the surface of the tools themselves. The bottom tool layer stays constant (the exposed API with all its objects), but they can apply one or multiple masks for different contexts and different agents, because this improves how each specific agent runs.

## Practical Implementation and Benefits

The masking approach provides several concrete advantages in production environments. First, it allows exposing a single API in multiple ways. For the Yahoo Finance example, they might create a "get revenue" tool that uses the finance API but only returns revenue for a specific company. Another mask might create a stock ticker response for just a few days or months. Yet another might focus solely on margin profiles.

This flexibility means the prompt engineer building the actual agent can define exactly what gets surfaced, making it as efficient as possible for that specific agent while ensuring the agent receives exactly what it needs. Values can be hardcoded into the mask—for instance, always requesting revenue and certain other fields—so the AI doesn't need to provide these parameters when calling the tool. The agent might only need to specify a company ID and receive the necessary output.

Importantly, this configuration lives in the prompt layer rather than requiring full code deployments. This enables much more nimble adaptation to customer requirements or changing situations, allowing faster shipping of cleaner, leaner, more robust agents that are both faster and more reliable.

Frank provides a concrete code example showing how a stock price tool might be masked. The tool is given a name and description, with the handler passing only specific objects needed for the API to function. The output is highly structured—just symbol, market price, and currency—formatted consistently so it can be directly integrated into prompts or presented as a clean object.

On the input side, they simplified to requiring only a symbol. Critically, they also add validation templates that allow tools to respond with error types that help AI agents self-correct when making wrong calls. If a symbol doesn't fit the expected format, the tool can immediately return a custom error message without calling the underlying API, allowing the agent to self-correct and recall the tool properly without receiving generic 404 or 500 errors. This gives engineers more influence over self-correcting behavior.

## Tool Masks as Prompt Engineering

A central thesis of Frank's presentation is that "tools are prompts" and that the engineering of tools is generally overlooked. In situations where agents use between 10 and 25 tools plus larger prompts, it becomes highly likely that tool descriptions will contain words or phrases conflicting with other tools. He gives the example of using the word "notes" in multiple contexts: for agent memory, for footnotes, and for another specific tool. These tools start conflicting with each other, which might work fine when tools are used separately but creates problems when they come together in a single agent.

With the masking approach, changing a few prompts on top of tools solves these conflicts without requiring deployment changes or ensuring consistency across infrastructure. Tool naming matters significantly. The input and output surfaces of tools add tokens and complexity that should be managed. The framing and phrasing of tool errors really matter—properly phrased error responses enable agents to self-correct and ensure processes stay on track, rather than resulting in unrecoverable errors requiring user intervention.

Frank also discusses where tool usage instructions should live. Many people put descriptions of "how to use this tool" in the main agent prompt. Anthropic evangelizes putting more of this description in the tool description itself. However, this creates a challenge: if a tool is used in many agentic contexts, you might want different usage patterns in different agents (like "always call this tool when" or "call this other tool first"). These descriptions are only useful when the other referenced tool is present.

Tool masks solve this by making tool descriptions variable—the same tool can show up with slightly different descriptions in different agent contexts. This requires having a proper way to edit the prompt engineering that comes with tools, which is exactly what masks enable.

## Design Patterns for Tool Masking

Databook employs several design patterns when implementing tool masks in production:

**Schema Shrinking** involves limiting parameters to what's actually relevant for the agent's task. This means constraining the types being used and making arrays or enums smaller. The principle is clear: less choice leads to better agent performance.

**Role Scoping** means having different masks for different agents. They distinguish between agents used in exploratory mode versus those bound to specific rails that need to reach particular outcomes. Presenting tools differently based on agent type significantly improves performance.

**Capability Gating** addresses how to split tools into single-purpose variants and ensure certain tools are only usable at specific stages. A good example is authorization: some tools can only be called after user authorization, even though they run on similar APIs. By presenting the same surface in two different tool sets—one with authorization hardcoded and passed through, another allowing public queries—they can safely shield off specific API parts while still presenting a coherent interface.

**Default Arguments** follow the schema-shrinking principle: the more defaults they can include in arguments, the more they ensure underlying APIs receive correct values while hiding non-essential parameters from the LLM.

**System-Provided Arguments** leverage the broader session context where agents run. The context contains information about the session, tenant, region, user, and previously gathered information. This information is provided by the system directly into the underlying API call or MCP-exposed input object, meaning the LLM doesn't have to provide it. When LLMs don't have to provide information, they make fewer mistakes.

## Enterprise Considerations and Reliability

Frank makes a crucial distinction between experimental/exploratory AI work and enterprise production systems. When reading about agents online, 80% of content focuses on proof-of-concepts or new tricks. The fundamental difference with enterprise work is that it must be reliable across thousands of executions, produce similar expected results consistently, and successfully automate processes without falling apart.

This enterprise focus explains their emphasis on versioning. They version their tool masks because anything an agent anchors behavior on needs to be locked in. If you're depending on someone else's surface that dynamically updates through MCP without versioning capability, you're in a fragile situation when building for large enterprises. When creating a 20-step process where step seven involves a tool call that might change or has variance, you're introducing potential breakage points in the larger process.

For exploratory processes trying to find information in dynamic environments, Frank suggests the opposite approach—embrace variability. But for Databook's work automating processes for larger companies, variability is generally the enemy, and staying on top of what happened is critical for reliable behavior.

## Critical Assessment and Trade-offs

While Frank's presentation makes a compelling case for tool masking, there are some considerations and trade-offs worth noting. The approach adds an additional layer of abstraction and configuration that teams must maintain. Each mask represents another piece of configuration to version, test, and manage. For organizations with many agents and tools, this could result in a combinatorial explosion of masks that need maintenance.

The presentation doesn't deeply address how Databook handles mask versioning alongside agent versions and tool versions—managing three layers of versioning could become complex. There's also limited discussion of how they prevent mask proliferation or establish best practices for when to create new masks versus modifying existing ones.

The talk emphasizes benefits around reliability and cost but provides limited quantitative data on actual improvements achieved. While the logical arguments are sound (fewer tokens should reduce costs, less choice entropy should improve reliability), concrete metrics would strengthen the case.

Frank's assertion that MCP "pollutes" LLM execution might be somewhat harsh—MCP's design choice to expose full APIs represents a trade-off prioritizing simplicity and standardization over optimization. The masking approach essentially re-introduces the optimization layer that MCP abstracted away, which is necessary for production but does add complexity.

## Conclusion and Production Implications

This case study illustrates sophisticated LLMOps practices for production agentic systems at enterprise scale. The tool masking pattern addresses real challenges that emerge when moving from experimental AI to production automation: managing complexity, ensuring reliability, optimizing costs, and enabling rapid iteration.

The approach demonstrates mature thinking about the layers involved in production AI systems: the raw tool layer (APIs, MCP connections), the optimization layer (masks), and the agent layer (prompts, context). By making the optimization layer explicit and editable by prompt engineers, Databook enables a form of context engineering that goes beyond traditional prompt engineering.

The emphasis on self-correction through custom error messages, system-provided arguments to reduce LLM decision points, and careful management of tool descriptions to avoid conflicts all represent battle-tested patterns for production reliability. The ability to adapt quickly through configuration rather than code deployments addresses a real operational concern in enterprise environments.

For practitioners building production agentic systems, this case study offers valuable patterns: treat tools as part of the prompt surface to be engineered, minimize choice entropy wherever possible, version everything that agents depend on, design error messages to enable self-correction, and maintain clear separation between exploratory and production-automation use cases. The tool masking pattern may not be necessary for all use cases, but for enterprise-scale agent systems requiring high reliability, it represents a thoughtful approach to managing the complexity that emerges in production.