---
title: "Production Agents: Real-world Implementations of LLM-powered Autonomous Systems"
slug: "production-agents-real-world-implementations-of-llm-powered-autonomous-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f405d061b34722152c059"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:41:59.864Z"
  createdOn: "2024-11-21T14:14:53.329Z"
llmopsTags:
  - "cache"
  - "chatbot"
  - "chunking"
  - "code-interpretation"
  - "cost-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "guardrails"
  - "human-in-the-loop"
  - "latency-optimization"
  - "monitoring"
  - "multi-agent-systems"
  - "openai"
  - "prompt-engineering"
  - "realtime-application"
  - "redis"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "structured-output"
industryTags: "tech"
company: "Various"
summary: "A panel discussion featuring three practitioners implementing LLM-powered agents in production: Sam's personal assistant with real-time feedback and router agents, Div's browser automation system Melton with reliability and monitoring features, and Devin's GitHub repository assistant that helps with code understanding and feature requests. Each presenter shared their architecture choices, testing strategies, and approaches to handling challenges like latency, reliability, and model selection in production environments."
link: "https://www.youtube.com/watch?v=k8GNCCs16F4&t=1317s"
year: 2023
seo:
  title: "Various: Production Agents: Real-world Implementations of LLM-powered Autonomous Systems - ZenML LLMOps Database"
  description: "A panel discussion featuring three practitioners implementing LLM-powered agents in production: Sam's personal assistant with real-time feedback and router agents, Div's browser automation system Melton with reliability and monitoring features, and Devin's GitHub repository assistant that helps with code understanding and feature requests. Each presenter shared their architecture choices, testing strategies, and approaches to handling challenges like latency, reliability, and model selection in production environments."
  canonical: "https://www.zenml.io/llmops-database/production-agents-real-world-implementations-of-llm-powered-autonomous-systems"
  ogTitle: "Various: Production Agents: Real-world Implementations of LLM-powered Autonomous Systems - ZenML LLMOps Database"
  ogDescription: "A panel discussion featuring three practitioners implementing LLM-powered agents in production: Sam's personal assistant with real-time feedback and router agents, Div's browser automation system Melton with reliability and monitoring features, and Devin's GitHub repository assistant that helps with code understanding and feature requests. Each presenter shared their architecture choices, testing strategies, and approaches to handling challenges like latency, reliability, and model selection in production environments."
---

## Overview

This case study captures insights from a LangChain-hosted webinar featuring three practitioners who have deployed LLM-powered agents in production settings. The discussion provides practical, battle-tested techniques for building reliable autonomous agents, addressing common challenges like context management, user experience, reliability, and cost optimization. The three presenters—Sam (personal assistant), Div (MultiOn browser automation), and Devin (GitHub code navigation bot)—each bring different perspectives on productionizing agents.

## Sam's Personal Assistant: Real-Time Feedback and Router Agents

Sam has been building a conversational personal assistant for approximately six months, with previous contributions to LangChain in areas like memory and vector stores. His agent uses a ReAct-style architecture (thought-action-action input-observation loops) primarily interacting with APIs rather than code generation.

### Real-Time User Feedback Integration

One of Sam's key innovations addresses the common "rabbit hole" problem where agents pursue unproductive paths while users watch helplessly. Rather than implementing a confirmation step at each action (as in AutoGPT), Sam created a real-time feedback mechanism that allows users to guide the agent mid-execution without disrupting flow.

The implementation uses a parallel WebSocket connection that allows users to send messages while the agent is running. These messages are written to a Redis store, and before each planning stage in the executor loop, the agent reads from this store to check for new user input. Any feedback is appended to the intermediate steps before the next planning phase. The prompt is modified to introduce the concept of "user feedback" as a special tool, instructing the agent to prioritize recent user input over past observations.

This approach feels more organic than forced confirmations—users can optionally intervene rather than being required to approve every step. Sam demonstrated an example where he redirected the agent from checking his calendar to checking text messages mid-execution, simply by typing feedback while the agent was working.

### Router Agent Architecture

Sam's second major technique involves heavy use of router agents to address the tool explosion problem. When agents have access to CRUD operations across many APIs, they quickly run out of context space and make poor tool selection decisions.

The solution involves defining "product flows"—specific user workflows that appear frequently—and creating template agents constrained to tools relevant for each flow. For example, a scheduling agent gets access to calendar retrieval, calendar creation, and user scheduling preferences. A "context on person" agent gets access to recent email search, contact search, and web search for researching individuals.

The implementation uses a conversational agent at the top level, with template names and descriptions exposed as tools. A fallback "dynamic agent" handles queries that don't match any template by using an LLM to predict relevant tools. When a specialized agent is triggered, it runs as a background task while the conversational agent returns an acknowledgment to the user.

Sam found that providing template-specific instructions (not just tool selection) significantly improved performance—the agent doesn't have to "reinvent the wheel" for common scenarios like scheduling meetings.

## Div's MultiOn: Browser Automation at Scale

Div (from MultiOn) presented a browser automation agent that can control any website through natural language commands. The system can order food on DoorDash, post on Twitter, navigate GitHub, and even modify AWS configurations—all through conversational instructions.

### Technical Architecture

MultiOn uses a custom DOM parser that compresses HTML into a highly efficient representation, achieving 90% website coverage in under 2K tokens. The parser is general-purpose and works across websites without customization, though approximately 5% of sites with unusual DOM structures may require adjustments.

The system incorporates multimodal elements through OCR for icons and images, which is particularly useful for food ordering apps where visual appeal influences decisions. Currently, the system is primarily text-based with OCR augmentation rather than fully vision-based.

### Reliability Challenges and Mitigations

Div explicitly contrasted MultiOn with AutoGPT, noting that AutoGPT "sucks" because it fails over 90% of the time, lacks practical use cases, and has zero personalization. MultiOn aims to address these production requirements.

Several reliability mechanisms are in place or planned:
- User interpretability through a text box showing current commands and responses
- User override capability to pause execution and provide custom commands
- A planned critic agent that evaluates each action for potential errors (though this adds latency)
- Authorization controls allowing users to specify which sites the agent can read from or write to
- Planning for evals and benchmarks to validate reliability on specific tasks before deployment

Div acknowledged the tension between accuracy (which benefits from critic agents and verification steps) and latency (which users expect to be "snappy"). Different use cases may warrant different architectural tradeoffs.

### Platform Integration

MultiOn demonstrated integration with ChatGPT's plugin ecosystem, allowing users to automate web tasks directly from ChatGPT. The system also works on mobile apps—a hackathon demo showed ordering food by analyzing a photo of ingredients using multimodal models, then triggering the browser agent running on a laptop or cloud server.

### Comparison to Adept

When asked about how MultiOn achieves similar results to Adept (which raised $350M and is training custom models), Div explained that Adept started too early and overinvested in data collection and custom architectures. GPT-4, being trained on the entire internet, provides sufficient capability for most tasks. The real challenge is building reliable systems around existing models, not training the best model from scratch.

## Devin's GitHub Code Navigation Bot

Devin focuses on using LLMs' code understanding capabilities for non-coding engineering tasks: customer support, documentation, triage, and communicating technical changes to non-technical stakeholders. The immediate application is a GitHub bot that helps with feature requests by navigating codebases and suggesting implementation approaches.

### The Problem Space

Large open-source projects face overwhelming maintenance overhead. LangChain itself had over 1,000 issues, 200 open pull requests, and nearly 50 new issues in 48 hours at the time of the discussion. Maintainers spend significant time giving contributors context and guidance rather than reviewing code. The goal is to accelerate contributions while reducing maintainer burden.

### Workflow-Focused Architecture

Following the same routing philosophy as Sam, Devin started with a single, well-defined workflow: "closed-end feature requests" that adapt existing repository structure without requiring extensive external information. The bot indexes repositories and responds to issues by finding relevant files and suggesting implementation approaches.

A key architectural concept Devin introduced is "checkpointing"—designing agents so that intermediate results are useful even if the full task can't be completed. If the agent can't figure out how to change code but has found relevant files, it posts those files. If it identifies relevant existing issues or appropriate code owners, it shares those. This ensures the agent provides value even when it can't complete end-to-end automation.

### Technical Implementation Details

The bot uses a planning agent that creates a task list, with each task potentially triggering a specialized execution agent. Currently, plans are fixed once created (avoiding the AutoGPT loop problem), though revisiting plans is a future goal, especially with human-in-the-loop capabilities.

A critical insight is that user requests are not search queries. The system must translate natural language feature requests into something that can effectively search a codebase. Devin addresses this through several techniques:

- **Hypothetical Document Embeddings (HyDE)**: Generating variations of user requests (formatted as Jira tickets, customer support tickets, related questions) and using those for semantic search
- **Synthetic documentation**: At index time, generating questions that might lead someone to each file and embedding those alongside the code
- **Reflections**: For code changes, generating higher-level observations that can be referenced back to original events
- **LLM-generated knowledge graphs**: Relating code elements through topics, components, file structure, PRs, commits, and abstract syntax trees

Devin emphasized that search for agents differs from search for humans—agents are more patient and can process more results, so iterating on queries is acceptable if the agent can effectively navigate information.

### Situating the Agent

An interesting prompt engineering insight: the "where" context (current directory, file list, repository summary) dramatically improves agent performance. Situating the agent in its environment helps both decision-making and synthetic data generation.

## Cross-Cutting Production Themes

### Model Selection

All presenters use a mix of GPT-3.5 and GPT-4, with clear patterns:
- GPT-4 for planning, reasoning, and synthesis (the "smart" tasks)
- GPT-3.5 for simpler execution tasks, routing, and high-volume operations
- Interest in fine-tuned open-source models for cost and latency optimization

Sam noted that 3.5 can sometimes substitute for 4 if you provide very specific, detailed instructions rather than relying on the model to reason.

### Speed and Latency

Multiple strategies address the speed challenge:
- Streaming all outputs to users via WebSocket for perceived responsiveness
- Caching LLM calls for similar requests
- Parallelizing multi-action execution
- Using smaller models where full GPT-4 reasoning isn't needed
- Selecting use cases where background execution is acceptable (Devin's GitHub bot benchmarks against human response time, not instant results)

### Testing Non-Deterministic Outputs

Testing remains challenging across all implementations:
- Integration tests over unit tests, focusing on side effects rather than exact outputs
- Mocking API responses and running against expected user inputs
- Testing at the appropriate level of consistency (e.g., verifying a calendar event was created at the right time, not that the event name matches exactly)
- Using publicly available data for validation (Devin cross-references found files against files from closed GitHub issues)
- Acknowledging the expense of testing with GPT-4 and the tension with development budgets

Div drew parallels to autonomous driving testing, suggesting that agent testing may eventually require simulation environments and automated evaluation infrastructure.

### The "Do Nothing" Principle

Multiple presenters emphasized that doing nothing is better than doing the wrong thing. If an agent can't handle a request, failing gracefully (or explicitly declining) maintains user trust and avoids creating additional confusion or work.