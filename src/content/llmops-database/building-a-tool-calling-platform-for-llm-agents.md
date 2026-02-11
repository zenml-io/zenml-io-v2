---
title: "Building a Tool Calling Platform for LLM Agents"
slug: "building-a-tool-calling-platform-for-llm-agents"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bb086ea1a4e2e82437c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:40:20.346Z"
  createdOn: "2024-11-21T13:54:56.327Z"
llmopsTags:
  - "amazon-aws"
  - "api-gateway"
  - "cicd"
  - "compliance"
  - "continuous-deployment"
  - "continuous-integration"
  - "cost-optimization"
  - "devops"
  - "error-handling"
  - "guardrails"
  - "latency-optimization"
  - "load-balancing"
  - "microservices"
  - "microsoft-azure"
  - "multi-agent-systems"
  - "orchestration"
  - "realtime-application"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "serverless"
  - "structured-output"
industryTags: "tech"
company: "Arcade AI"
summary: "Arcade AI developed a comprehensive tool calling platform to address key challenges in LLM agent deployments. The platform provides a dedicated runtime for tools separate from orchestration, handles authentication and authorization for agent actions, and enables scalable tool management. It includes three main components: a Tool SDK for easy tool development, an engine for serving APIs, and an actor system for tool execution, making it easier to deploy and manage LLM-powered tools in production."
link: "https://www.youtube.com/watch?v=mmW_1ok3JW0"
year: 2024
seo:
  title: "Arcade AI: Building a Tool Calling Platform for LLM Agents - ZenML LLMOps Database"
  description: "Arcade AI developed a comprehensive tool calling platform to address key challenges in LLM agent deployments. The platform provides a dedicated runtime for tools separate from orchestration, handles authentication and authorization for agent actions, and enables scalable tool management. It includes three main components: a Tool SDK for easy tool development, an engine for serving APIs, and an actor system for tool execution, making it easier to deploy and manage LLM-powered tools in production."
  canonical: "https://www.zenml.io/llmops-database/building-a-tool-calling-platform-for-llm-agents"
  ogTitle: "Arcade AI: Building a Tool Calling Platform for LLM Agents - ZenML LLMOps Database"
  ogDescription: "Arcade AI developed a comprehensive tool calling platform to address key challenges in LLM agent deployments. The platform provides a dedicated runtime for tools separate from orchestration, handles authentication and authorization for agent actions, and enables scalable tool management. It includes three main components: a Tool SDK for easy tool development, an engine for serving APIs, and an actor system for tool execution, making it easier to deploy and manage LLM-powered tools in production."
---

## Overview

This case study is based on a conference presentation by Sam Partee, founder of Arcade AI, discussing the challenges and solutions around building production-ready AI agents with robust tool calling capabilities. The talk represents approximately a year and a half of learning while building the Arcade AI platform, offering practical insights into what limits current agent systems from being truly useful in production environments.

The core thesis of the presentation is provocative but well-argued: an agent is not truly an agent unless it can call tools. Without tool calling, what many call "agents" are essentially "Fancy Search" systems trading precision for generality. More critically, agents will never reach their potential until they can act *as* users rather than just *for* users, meaning they need proper authentication and authorization mechanisms rather than simple API key-based access.

## The Problem Space

Sam begins by posing several motivating questions that frame the current state of LLMOps for tool-using agents:

- Can you scale the tools called by agents separately from the agents themselves?
- Why is API key-based authentication so pervasive in the LLM space?
- Why isn't there a CI/CD equivalent for agents?
- Why is "vibe checking" still the primary method for validating agent behavior?
- Why can't ChatGPT send an email for me?

The last question is perhaps the most telling. It encapsulates the gap between what users expect AI agents to do and what they can actually accomplish in production systems. The observation that most tools in the current ecosystem are simple HTTPS requests to services protected by API keys (Google Search, Serper, Firecrawl, etc.) returning text highlights a fundamental limitation in what agents can accomplish.

## Technical Deep Dive: What is a Tool?

Sam provides a minimal but rigorous definition of an LLM tool that cuts through the complexity often associated with the term:

- A set of M inputs, each with V values
- A set of Y potential outputs (all typed)
- A description of the function and when it should be used
- A method of execution

Importantly, he clarifies a common source of confusion: "tool calling" in current parlance really means *parameter prediction*, not execution. Execution is entirely the developer's responsibility, either within an orchestration framework or manually after receiving predicted parameters. Even "parallel tool calling" doesn't mean parallel execution—it simply means multiple parameter sets are returned that *could* be executed concurrently because they have no shared state.

This distinction matters for LLMOps because it reveals a gap in the tooling landscape. The LLM predicts what should happen, but the execution infrastructure is often ad-hoc and poorly managed.

## The Agent Stack and Tool Orchestration

Sam presents what he calls the "hierarchy of needs" for agents, building from foundational to advanced capabilities:

- Prompt orchestration (inputs to LLMs)
- Retrieval and search (Vector databases, RAG)
- Agent orchestration (LangChain, LlamaIndex, CrewAI)
- Tool calling
- Tool orchestration (managing, selecting, and executing tools)
- Authentication/Authorization (enabling agents to act as users)

A key insight from his experience at Redis is that retrieval and search use cases go into production far more frequently than tool calling use cases. This suggests tool calling is still nascent and underserved from an infrastructure perspective.

The concept of "tool orchestration" as distinct from agent orchestration is particularly valuable. When agents need to work with hundreds or thousands of tools, several problems emerge:

- Context window limitations (most models degrade at ~20 tools)
- Need for dynamic tool selection based on context
- Diverse execution requirements (some tools need GPUs, different environments)
- Failure handling and retries

These are fundamentally different concerns from orchestrating agents themselves, yet current frameworks often conflate them.

## The Case for Separating Tool Execution from Orchestration

One of the most technically substantive arguments in the presentation is that tool execution must be separated from agent orchestration. The reasons are practical and stem from real production experience:

Python's Global Interpreter Lock (GIL) means that orchestration frameworks like LangChain or LlamaIndex, which are typically Python-based, can only handle tools as concurrent HTTP requests. Anything computationally intensive—even text processing from web scraping or BM25 search—will lock the GIL and cause performance issues. Sam references actual LangChain GitHub issues where users complained about unexplained slowdowns caused by GIL contention.

Beyond performance, separation enables:

- Running tools on specialized infrastructure (e.g., Modal with GPUs for image generation)
- Scaling tools independently of agents
- Easier maintenance and testing
- More diverse tool capabilities

The architecture Sam advocates treats tools as first-class software components: "Tools are code—they need to be packaged like code, versioned like code, tested like code." Current practices treat tools as "sub-packages of a sub-package of a repo," which is inadequate for production reliability.

## Arcade AI's Architecture

Arcade AI is described as a "tool calling platform" with three main components:

**Tool SDK**: An opinionated Python SDK for defining tools. It uses a cookie-cutter approach (`arcade new`) to create properly structured Python packages. Key design decisions include requiring explicit parameter annotations rather than parsing docstrings—a lesson learned from the inconsistency of Python docstring formats across different parsers.

**Engine**: Middleware that serves tools to LLMs through three layered APIs:
- Auth API: Generic OAuth handling that stores and retrieves tokens for any provider
- Tools API: Management and execution of authenticated tools
- LLM API: OpenAI-compatible endpoint that automatically injects and handles tools

The LLM API adds new `tool_choice` parameters (`execute` and `generate`) that extend the standard OpenAI interface.

**Actor**: A worker API for tool execution. The `arcade dev` CLI command spins up an actor with installed tool packages, similar to `yarn dev` for web development. This enables rapid iteration on custom tools.

## Authentication and Authorization

The auth system is perhaps the most differentiated aspect of Arcade. Rather than using bot tokens or service accounts, Arcade enables agents to act *as* the user through proper OAuth flows. The API requires only a unique user ID (UUID)—Arcade doesn't need to know who the user is, just needs a consistent identifier to associate tokens with.

This design has several implications for LLMOps:

- Token storage can be ephemeral or persistent within the customer's VPC
- Enables SOC 2 compliance since the pattern matches what security teams already expect
- Supports pre-authorization for anticipated actions
- Works with any OAuth provider

The practical benefit is that instead of rolling custom OAuth implementations for each integration (like LangChain's Gmail toolkit), a single Arcade API call handles authorization for any supported provider.

## Evaluation and CI/CD

The SDK includes a tool-calling-specific evaluation framework with "critics" and "rubrics" designed for CI/CD integration. The goal is to answer questions like:

- How does a new model release affect my tool calling capability?
- How do prompt changes affect what's currently in production?
- Does my agent still work correctly after dependencies update?

Arcade runs nightly CI/CD with fake OAuth accounts against all their integrations to catch breaking changes from upstream providers. This is a practical necessity given how frequently third-party APIs change behavior.

## Demonstrations and Practical Results

The talk includes a demo from a community member named Sergio showing Twilio and Notion integrations. The agent sends a text message through Twilio and creates Notion documents—actions that require authenticated access that ChatGPT cannot perform natively.

While the demo is impressive, it's worth noting that Arcade AI is still relatively early-stage. The presentation is as much about vision and architecture as proven results at scale.

## Deployment Model

Arcade can be deployed as:
- Arcade's managed cloud (Arcade handles security responsibilities)
- Self-hosted within customer VPC (customer handles runtime security)

The engine is a closed-source binary distributed as a Docker container. Core tools and SDKs are open source. Single-developer use is free; production/team use requires payment.

The team uses Modal for hosting their own Slack bot integration, citing approximately four lines of code for deployment. This aligns with their philosophy of enabling easy scaling of tool execution.

## Critical Assessment

The presentation makes compelling arguments about gaps in the current LLMOps landscape for agent tool calling. The separation of concerns between orchestration and tool execution is well-reasoned and addresses real production pain points.

However, some caveats are worth noting:

- The platform is still maturing; many features are described as aspirational or in development
- The claim that agents "will never" fulfill their potential without proper auth is strong—useful but somewhat hyperbolic
- Adoption of a new tool platform requires buy-in from the ecosystem; Arcade's success depends on developer adoption
- The closed-source engine creates vendor dependencies despite the open-source SDK

The architecture and philosophy are sound for the problems described. Whether Arcade AI achieves the "gold standard" status the presenter hopes for remains to be seen, but the technical approach addresses genuine production challenges that current orchestration frameworks leave unaddressed.