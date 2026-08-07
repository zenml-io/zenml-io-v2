---
title: "Building a Production-Ready Slack Agent with Conversational Memory and Context Engineering"
slug: "building-a-production-ready-slack-agent-with-conversational-memory-and-context-engineering"
draft: false
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "document-processing"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "prompt-engineering"
  - "agent-based"
  - "mcp"
  - "memory"
  - "error-handling"
  - "chunking"
  - "postgresql"
  - "docker"
  - "microservices"
  - "open-source"
  - "documentation"
  - "reliability"
  - "scalability"
  - "anthropic"
industryTags: "tech"
company: "Tiger Data"
summary: "Tiger Data built Eon, a production Slack assistant that provides instant answers from institutional knowledge, achieving 50% daily adoption within 6 weeks. The project addressed three core challenges: building conversational memory using TimescaleDB's time-series capabilities to understand threaded Slack discussions, providing focused context through custom MCP (Model Context Protocol) servers for GitHub, Linear, and documentation rather than broad API wrappers, and ensuring reliability through durable event processing with automatic retries and bounded concurrency. The entire system was open-sourced as composable components, demonstrating that production AI agents require structured memory, focused tools, and robust infrastructure rather than exotic technology."
link: "https://www.tigerdata.com/blog/we-built-production-agent-open-sourced-everything-we-learned"
year: 2025
seo:
  title: "Tiger Data: Building a Production-Ready Slack Agent with Conversational Memory and Context Engineering - ZenML LLMOps Database"
  description: "Tiger Data built Eon, a production Slack assistant that provides instant answers from institutional knowledge, achieving 50% daily adoption within 6 weeks. The project addressed three core challenges: building conversational memory using TimescaleDB's time-series capabilities to understand threaded Slack discussions, providing focused context through custom MCP (Model Context Protocol) servers for GitHub, Linear, and documentation rather than broad API wrappers, and ensuring reliability through durable event processing with automatic retries and bounded concurrency. The entire system was open-sourced as composable components, demonstrating that production AI agents require structured memory, focused tools, and robust infrastructure rather than exotic technology."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-ready-slack-agent-with-conversational-memory-and-context-engineering"
  ogTitle: "Tiger Data: Building a Production-Ready Slack Agent with Conversational Memory and Context Engineering - ZenML LLMOps Database"
  ogDescription: "Tiger Data built Eon, a production Slack assistant that provides instant answers from institutional knowledge, achieving 50% daily adoption within 6 weeks. The project addressed three core challenges: building conversational memory using TimescaleDB's time-series capabilities to understand threaded Slack discussions, providing focused context through custom MCP (Model Context Protocol) servers for GitHub, Linear, and documentation rather than broad API wrappers, and ensuring reliability through durable event processing with automatic retries and bounded concurrency. The entire system was open-sourced as composable components, demonstrating that production AI agents require structured memory, focused tools, and robust infrastructure rather than exotic technology."
notion:
  pageId: "3b5f8dff-2538-808e-93dc-c9b20f3e1bdb"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T13:13:00.000Z"
  lastEditedTime: "2026-08-07T13:13:00.000Z"
  publishedAt: "2026-08-07T13:23:11Z"
---

## Overview

Tiger Data, a database company specializing in TimescaleDB and PostgreSQL solutions, built Eon as both an internal productivity tool and a learning exercise in production AI agent development. The case study describes how they constructed a Slack-native assistant that converts institutional knowledge into instant answers, with the agent being adopted by nearly 50% of their fully remote company within six weeks of deployment. The initiative was explicitly designed to understand what AI agents truly need to operate reliably in production environments before building database infrastructure specifically for agentic workloads.

The blog post, published on October 30, 2025, is notably transparent about both successes and design trade-offs. Tiger Data positioned Slack as an ideal testing ground because it serves as the central collaboration hub for their remote team and because chat interfaces have become the default interaction model for LLMs through tools like ChatGPT and Claude Desktop. The company released all components as open-source projects, providing a reference implementation and modular libraries that can be used independently or together.

While the text contains marketing elements promoting Tiger Data's products, it provides substantial technical detail about production LLMOps challenges and solutions. The authors acknowledge that "errors happen" and that "unexpected things occur frequently" when working with non-deterministic systems, offering a more realistic perspective than many vendor case studies.

## Challenge 1: Conversational Memory and Time-Series Architecture

The first major production challenge involved building conversational memory that could follow threaded Slack discussions. When Slack sends an `app_mention` event to notify the bot, that event contains only the single message mentioning the bot—no thread context or conversation history. Users could theoretically include all necessary background in every question, but this would create a poor user experience and break the illusion of conversing with a knowledgeable teammate.

Tiger Data's insight was recognizing that conversation is fundamentally time-series data. Each Slack message has a timestamp, sender, channel identifier, and parent message reference. These events unfold sequentially with temporal relationships that determine meaning and context. This reframing allowed them to leverage TimescaleDB, their time-series database built on PostgreSQL, as the natural storage layer for conversational memory.

They built a real-time ingestion system that captures every message, reaction, edit, and update from Slack, storing all events in TimescaleDB. The system can also backfill years of historical data from Slack exports. This architecture provides several advantages: queries use standard SQL rather than rate-limited Slack APIs, the data model naturally represents temporal relationships, and TimescaleDB's time-series optimizations improve query performance for retrieving conversation threads.

This conversational memory implementation was open-sourced as `tiger-slack`, described as a "production-ready system for Slack ingestion and conversational memory storage in TimescaleDB." The architecture demonstrates how time-series databases can serve agent memory needs when conversations are conceptualized as temporal event streams rather than static documents.

## Challenge 2: Context Engineering Through Focused MCP Servers

After establishing conversational memory, Eon needed access to broader institutional knowledge beyond Slack: GitHub pull requests and issues, Linear task tracking, and technical documentation. Tiger Data adopted the Model Context Protocol (MCP), an emerging standard for connecting agents to external tools and data sources, to provide this context in a modular and composable way.

The case study highlights a critical insight about production LLMOps: not all tool implementations are equally effective, even when they expose the same underlying data. Official MCP servers exist for GitHub and Linear, but these are designed as general-purpose assistants that expose dozens of tools across every available API endpoint. While this flexibility suits broad conversational assistants, it creates problems for focused production agents. Exposing too many tools increases token consumption, raises cognitive load for the language model during tool selection, and increases error rates.

Simply filtering down the available tools doesn't solve the problem. The official MCP servers are wrappers around APIs that are themselves wrappers around database schemas. Retrieving needed information often requires multiple sequential tool calls and stitching together results—something an LLM can theoretically do, but unreliably and at high token cost. This represents a broader challenge in LLMOps: API-first design doesn't always align with the needs of agent-based systems.

Tiger Data's solution was building custom MCP servers with tools designed around what users actually ask for rather than API endpoints. These tools provide "just enough high-quality context" for the agent to execute tasks effectively. This approach is explicitly described as "context engineering at work."

For example, their `tiger-linear-mcp-server` provides a `get_issues` tool with a simple interface accepting user ID, project ID, and updated-after timestamp. Under the hood, this makes numerous calls to the Linear API: fetching the filtered issue set, then for each issue retrieving comments, attachments, label details, project details, state, team information, and user details. The implementation caches everything to avoid duplicate requests and projects it into a clean object shape with no duplication.

An LLM could theoretically assemble this same sequence using the official Linear MCP server, but the custom approach is faster, more reliable, and far more token-efficient. The design philosophy prioritizes single-call tools that directly provide needed information over multi-step tool composition by the LLM.

For GitHub, they built focused read-only tools for searching pull requests, retrieving issue discussions, and summarizing commit history—no repository management or CI/CD controls. For documentation, they built a semantic search engine over PostgreSQL, TimescaleDB, and Tiger Cloud documentation powered by pgvector (PostgreSQL's vector similarity search extension). This documentation server includes "expertly written auto-discovered prompt templates" with knowledge about common tasks like schema design. Unlike static prompt libraries requiring manual copying, the agent automatically selects appropriate templates. The documentation MCP server is publicly available at `mcp.tigerdata.com/docs` for anyone to add to Claude Desktop or similar tools.

This modular design allows components to evolve independently. Tiger Data reports improving their documentation search three times and adding new GitHub query patterns based on user questions, all without modifying Eon's core logic. The architecture demonstrates how separating context provisioning from agent logic improves maintainability and enables experimentation.

All custom MCP servers were open-sourced: `tiger-gh-mcp-server` for GitHub, `tiger-linear-mcp-server` for Linear, and `tiger-docs-mcp-server` for documentation search. This represents a significant contribution to the emerging MCP ecosystem and provides concrete examples of context engineering for production agents.

## Challenge 3: Production Reliability and Durable Event Processing

The third major challenge involved ensuring reliability when nearly half the company depends on the agent for answers. The case study emphasizes that production systems "can't just work most of the time" and that "every question matters." This section provides detailed technical insight into production LLMOps infrastructure, an area often glossed over in case studies focused on model performance.

Tiger Data notes that most Slack bot tutorials show how to respond to events but not how to handle production realities: crashes mid-conversation, external API failures, and load spikes when many users ask questions simultaneously. Drawing on their expertise as a database company, they built production infrastructure with four core capabilities.

**Durable event processing** ensures no events are lost even when the bot crashes. Each Slack event is written to PostgreSQL before processing begins. If the bot crashes, events remain in the queue for later processing. Workers claim events using row-level locking, allowing multiple bot instances to run concurrently without processing the same event multiple times. This architecture pattern is well-established in distributed systems but represents sophisticated infrastructure for an agent application.

**Automatic retries** handle transient failures without manual intervention. Events that fail processing remain in the queue and are automatically retried up to three times with ten-minute delays between attempts. This delay gives transient issues (like temporary API outages) time to resolve. The case study claims this approach means "virtually every user question gets answered," demonstrating how retry logic significantly improves reliability metrics in production.

**Bounded concurrency** prevents resource exhaustion during traffic spikes. Fixed-size worker pools process events as quickly as possible, queuing excess events in PostgreSQL until workers become available. This design ensures the system degrades gracefully under load rather than crashing—a critical consideration for user-facing applications.

**Millisecond latency** addresses the tension between durable queuing and user experience. Workers poll the queue table to claim events, which naturally handles retries and recovery but introduces polling latency. Rather than making users wait for the next poll cycle, they implemented asynchronous signaling to "poke" a random worker immediately when new events arrive. This combines the durability of queue-based processing with the responsiveness of event-driven systems.

The result is explicitly described as a Slack agent that "feels instant to users but is built like production infrastructure: durable, observable, and horizontally scalable." This infrastructure was open-sourced as `tiger-agents-for-work`, a library handling all production mechanics so developers can focus on agent logic rather than implementing durable queues and retry mechanisms from scratch.

## System Architecture and Implementation

The reference implementation, `tiger-eon`, is described as "a lightly edited version of the Slack agent we deployed internally." It serves as both a functioning product and a blueprint for assembling the modular components. The architecture is surprisingly straightforward:

- Slack `app_mention` events flow into the `tiger-agents-for-work` event queue
- Workers claim events and invoke the Eon agent
- Eon decides what information it needs and calls appropriate MCP servers (Slack history, GitHub PRs, documentation, etc.)
- MCP servers query their respective data sources and return structured results
- Eon synthesizes information and responds in Slack

The system runs as stateless services coordinated through Tiger Data's cloud database platform. This stateless design simplifies horizontal scaling and failure recovery.

A key design principle was making Eon "easy to customize without writing code." The entire setup is driven by configuration files rather than Python modules requiring modification. Adding a new data source means adding an MCP server to `mcp_config.json`. Changing how Eon introduces itself means editing a Jinja2 template. Swapping Claude for a different LLM means changing a CLI argument or environment variable.

Tiger Data provides an interactive setup script that walks through the entire deployment process, prompting for API tokens, generating configuration files, and spinning up everything using Docker Compose backed by a database on their Free Plan. They claim the time from `git clone` to a working agent answering questions is approximately 10 minutes.

However, when deeper customization is needed—specialized tool selection, custom business logic, or prefetching context from internal systems—`tiger-agents-for-work` functions as a library, not just a CLI. Developers can subclass the base agent and override methods for full programmatic control while the framework handles production infrastructure (durable queues, retries, concurrency).

This design balances ease of initial deployment with flexibility for advanced customization, addressing a common tension in LLMOps tooling between "quick start" and "production ready."

## LLMOps Insights and Production Lessons

Several broader LLMOps insights emerge from this case study:

**Memory as time-series data**: Conceptualizing conversational memory as temporal event streams rather than static documents enables leveraging time-series database capabilities. This architectural choice provides natural support for conversation threading, temporal queries (e.g., "what was discussed last week about X?"), and efficient historical backfills.

**Context engineering over API wrapping**: The distinction between API-first tool design and task-first tool design is significant. Tools designed around what users actually ask for, even when they require more complex backend logic, reduce token costs and improve reliability compared to exposing granular API operations that require multi-step composition by the LLM.

**Production infrastructure matters**: The case study emphasizes that durable event processing, automatic retries, bounded concurrency, and careful latency management are essential for production agent deployments. These infrastructure concerns are orthogonal to model selection or prompt engineering but equally important for user satisfaction and operational reliability.

**Modular architecture enables iteration**: Separating conversational memory, context provisioning, and agent logic into independent components allowed Tiger Data to improve documentation search three times and evolve GitHub query patterns without touching core agent code. This modularity reduces coupling and accelerates experimentation.

**Configuration-driven deployment**: Making customization possible through configuration files rather than code modification lowers the barrier to adoption and experimentation while maintaining flexibility for advanced users who need programmatic control.

## Critical Assessment

While the case study provides valuable technical detail, several caveats warrant consideration:

**Scale and complexity**: Tiger Data is a fully remote company where approximately 50% adopted Eon, suggesting a user base likely measured in dozens rather than thousands. The system's performance characteristics at significantly larger scale remain undemonstrated. Additionally, the knowledge sources (Slack, GitHub, Linear, documentation) are relatively structured compared to broader enterprise knowledge management scenarios.

**Vendor alignment**: The architecture heavily leverages Tiger Data's own products (TimescaleDB, Tiger Cloud) and PostgreSQL ecosystem tools. While this demonstrates genuine production usage of their platform, it also means the design is optimized for this specific technology stack. Organizations using different databases would need to adapt the conversational memory and event processing components.

**LLM provider dependency**: The case study mentions Claude and describes the system as "surprisingly simple" at its core, but doesn't detail prompt engineering approaches, handling of different Claude versions, fallback strategies for API failures, or cost optimization techniques beyond context engineering. The agent's robustness to LLM API changes or the feasibility of switching providers isn't thoroughly addressed.

**MCP ecosystem maturity**: The Model Context Protocol is relatively new (popularized by Anthropic in late 2024). Building production systems on emerging standards carries adoption risk, though Tiger Data mitigates this by open-sourcing their implementations and maintaining control over their tool interfaces.

**Evaluation methodology**: The case study claims 50% adoption and describes responses as feeling "instant," but doesn't provide quantitative metrics on answer quality, accuracy rates, user satisfaction scores, or comparison benchmarks. The success criteria appear primarily qualitative and adoption-focused rather than performance-measured.

**Context engineering tradeoffs**: While custom MCP servers reduce token costs and improve reliability, they also require more initial development effort and ongoing maintenance compared to using official API wrappers. Organizations must weigh these tradeoffs based on their specific usage patterns and resource availability.

## Open Source Contributions

A significant aspect of this initiative is the open-source release of all components:

- `tiger-eon`: Complete reference implementation
- `tiger-agents-for-work`: Production Slack agent framework with durable event processing, retries, and bounded concurrency
- `tiger-slack`: Real-time Slack ingestion and conversational memory storage in TimescaleDB
- `tiger-docs-mcp-server`: Semantic search over PostgreSQL/TimescaleDB documentation (also publicly hosted at mcp.tigerdata.com/docs)
- `tiger-gh-mcp-server`: Focused GitHub tools for PR and issue retrieval
- `tiger-linear-mcp-server`: Focused Linear tools for task tracking

Each repository reportedly includes Docker container support and setup instructions. The modular design allows using components independently or together. This contribution to the LLMOps and MCP ecosystems provides concrete, production-tested implementations of patterns that are often only described theoretically.

## Strategic Context

The case study positions this work as "the first project from our team, marking the beginning of a larger journey" toward building "more agentic capabilities and infrastructure" and making it "easier for developers to build AI applications all on Postgres." This framing reveals that Eon serves dual purposes: an internal productivity tool and a demonstration of TimescaleDB/PostgreSQL for agent workloads.

The closing statement—"Agents are coming online, and with Tiger Data, they finally have the database built for them"—clearly positions this as strategic marketing for Tiger Data's database products in the emerging agent infrastructure market. However, unlike many vendor case studies that simply assert product capabilities, Tiger Data built and deployed a real system, experienced genuine production challenges, and released the solutions as open source.

The case study represents a valuable contribution to LLMOps knowledge despite its promotional framing, particularly in the areas of conversational memory architecture, context engineering for production agents, and durable event processing infrastructure for agent applications.
