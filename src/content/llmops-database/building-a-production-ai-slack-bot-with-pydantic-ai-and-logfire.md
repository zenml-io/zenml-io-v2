---
title: "Building a Production AI Slack Bot with Pydantic AI and Logfire"
slug: "building-a-production-ai-slack-bot-with-pydantic-ai-and-logfire"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "error-handling"
  - "latency-optimization"
  - "mcp"
  - "system-prompts"
  - "postgresql"
  - "fastapi"
  - "langchain"
  - "monitoring"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Tiger Data"
summary: "Tiger Data, a fully remote company, faced challenges with information overload as all company communications occurred on Slack, making it difficult for employees to gain context on ongoing discussions. They built Tiger Agent for Work, a production AI Slack bot capable of handling thousands of concurrent conversations with its own memory and context. Using Pydantic AI for LLM orchestration and MCP server integration, and Logfire for distributed tracing and observability, they deployed a solution that achieved daily usage by more than half the company within 6 weeks. The approach reduced debugging time through comprehensive \"Agent Run\" visualizations and enabled seamless LLM provider switching while maintaining production-grade reliability."
link: "https://pydantic.dev/articles/tiger-data-ai-slack-bot-pydantic-logfire"
year: 2025
seo:
  title: "Tiger Data: Building a Production AI Slack Bot with Pydantic AI and Logfire - ZenML LLMOps Database"
  description: "Tiger Data, a fully remote company, faced challenges with information overload as all company communications occurred on Slack, making it difficult for employees to gain context on ongoing discussions. They built Tiger Agent for Work, a production AI Slack bot capable of handling thousands of concurrent conversations with its own memory and context. Using Pydantic AI for LLM orchestration and MCP server integration, and Logfire for distributed tracing and observability, they deployed a solution that achieved daily usage by more than half the company within 6 weeks. The approach reduced debugging time through comprehensive \"Agent Run\" visualizations and enabled seamless LLM provider switching while maintaining production-grade reliability."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-ai-slack-bot-with-pydantic-ai-and-logfire"
  ogTitle: "Tiger Data: Building a Production AI Slack Bot with Pydantic AI and Logfire - ZenML LLMOps Database"
  ogDescription: "Tiger Data, a fully remote company, faced challenges with information overload as all company communications occurred on Slack, making it difficult for employees to gain context on ongoing discussions. They built Tiger Agent for Work, a production AI Slack bot capable of handling thousands of concurrent conversations with its own memory and context. Using Pydantic AI for LLM orchestration and MCP server integration, and Logfire for distributed tracing and observability, they deployed a solution that achieved daily usage by more than half the company within 6 weeks. The approach reduced debugging time through comprehensive \"Agent Run\" visualizations and enabled seamless LLM provider switching while maintaining production-grade reliability."
notion:
  pageId: "35af8dff-2538-803b-a4ad-db4310b3f247"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-08T12:50:00.000Z"
  lastEditedTime: "2026-05-08T12:50:00.000Z"
  publishedAt: "2026-05-10T06:01:55Z"
---

## Overview

Tiger Data built Tiger Agent for Work, a production-grade AI Slack bot designed to address information overload in their fully remote organization. As a company with employees distributed across global time zones, all company communications, decision-making, and project discussions occurred on Slack. This created a significant challenge: beyond a certain company size, it became nearly impossible for employees to catch up on conversations and gain necessary context. The solution they developed handles thousands of concurrent conversations with its own memory and context management, achieving adoption by more than half the company within just 6 weeks of deployment.

The case study is particularly valuable from an LLMOps perspective because it demonstrates the practical challenges of building production AI agents and the architectural decisions required to deploy them at scale. Tiger Data evaluated multiple options, including building their own LLM library from scratch, before selecting Pydantic AI for LLM abstraction and orchestration, and Pydantic Logfire for observability and distributed tracing.

## Technical Architecture and Production Challenges

The case study emphasizes that building a production AI agent involves far more than simply making LLM API calls. The actual LLM call represents only a small fraction of the overall system complexity. A production-ready agent requires robust tool integrations, retry logic, provider switching capabilities, comprehensive debugging infrastructure, and detailed logging mechanisms. Without a framework to handle these concerns, organizations face writing thousands of lines of scaffolding code before addressing the actual business problem.

Tiger Agent integrates eight different MCP (Model Context Protocol) servers to provide the agent with comprehensive access to company information and tools. These servers include Slack search functionality, customer documentation, Salesforce cases, GitHub repositories, Linear tickets, meeting transcripts, user memory, and progress reports. Each server provides specific tools the agent can invoke to answer questions about Tiger Data's products and customer issues. Without a proper framework, implementing these integrations would require writing protocol handlers, format converters, and retry logic for every individual server—a substantial amount of infrastructure code unrelated to the core Slack agent functionality.

## Pydantic AI for LLM Orchestration

Tiger Data selected Pydantic AI specifically because it handles tedious integration work while avoiding vendor lock-in and maintaining architectural flexibility. The framework provides abstraction without being overly opinionated about overall application structure.

The MCP server integration demonstrates the efficiency gained through Pydantic AI. Adding a new server to Tiger Agent requires only a few lines in the `mcp_config.json` configuration file, specifying the server name and URL endpoint. The framework then automatically loads the configuration, establishes connections to servers, fetches tool definitions, and translates them for whichever LLM provider is currently in use. The agent initialization code simply loads MCP servers, augments them as needed, creates toolsets from the server definitions, and passes them to the Pydantic AI Agent constructor along with the model specification and system prompt. This abstraction eliminated the need for custom protocol handling, format conversion, or retry logic for each integration.

Tiger Data had prior positive experience with Pydantic AI from their text-to-SQL implementation in their pgai Python library, where the framework enabled provider and model switching through CLI arguments or environment variables rather than requiring separate implementations for Anthropic, OpenAI, and Cohere. The library approach rather than framework approach gave them the flexibility they needed.

One particularly compelling integration is the Logfire MCP server, which allows querying all tracing data using SQL. Connecting this to Claude Code requires just a single command line instruction. This enables developers to click a "Fix with AI" button when encountering error spans in Logfire, which generates commands for Claude Code to attempt automatic fixes. Developers can also ask broader analytical questions like requesting error counts by service for specific environments over the last 24 hours, with the system querying tracing data via SQL and providing insights.

Automatic retry handling represents another significant production reliability feature. MCP servers inevitably fail due to network issues, rate limits, or service disruptions. Pydantic AI implements automatic retry logic for tool calls by default, eliminating the need for manual retry implementation throughout the codebase.

## Model Provider Flexibility

The ability to switch LLM providers easily proved critical for Tiger Data's production deployment. Different LLMs exhibit varying behavior, uptime characteristics, reliability, context window sizes, costs, and proficiency in agentic tasks. The team found it challenging to "decide" on a single model without extensive testing in both development and production environments. Their deployment history illustrates this challenge: they started with a Claude model, switched to OpenAI's GPT-4o, then migrated back to Claude 3.5 Sonnet. Each provider switch required changing only a single environment variable—`MODEL_NAME=claude-sonnet-4.5` or `MODEL_NAME=gpt-4o`—with Pydantic AI automatically translating between provider APIs.

This abstraction layer delivered substantial value both for development efficiency and operational resilience. It saved significant engineering time by eliminating the need to reimplement provider-specific API calling patterns for each model company. More importantly for production operations, it enabled seamless provider switching when a model becomes temporarily unavailable—the case study specifically references Claude API availability issues as an example where this capability proved valuable.

## Framework Opinionation and Architectural Fit

While acknowledging that every library carries some degree of opinionation, Tiger Data found Pydantic AI's opinions acceptable and sensible for their use case. Tiger Agent operates on a PostgreSQL-backed work queue architecture with atomic event claiming and horizontal scaling capabilities. Pydantic AI integrated cleanly into this architecture because it doesn't impose a different event model or force architectural decisions. The team characterizes it more as a library for LLM and agent functionality rather than an opinionated framework dictating the entire project structure, which aligned well with their existing infrastructure.

## Distributed Tracing and Observability Requirements

Tiger Data initially attempted to build their agent without any tracing infrastructure, which they describe as "a very bad idea." The complexity of reasoning about agent behavior in production AI systems makes comprehensive observability essential rather than optional.

Agentic systems present numerous failure modes that are extremely difficult to diagnose without detailed tracing. The model might fail to call a tool when it should, pass incorrect or poorly formatted arguments to tools, encounter tool bugs or receive malformed responses, or call inappropriate tools that confuse its reasoning process. From the end user's perspective, without tracing, only the final output is visible—all intermediate steps remain opaque. Even extensive logging in application code cannot capture what happens inside the agentic framework itself. With at least nine services potentially contributing to any given request, viewing their logs together in chronological order becomes a herculean manual task.

The team aptly describes debugging an agentic system without tracing as equivalent to finding bugs without a debugger or console logs—technically possible but extraordinarily inefficient and frustrating.

Recognizing the need for distributed tracing, Tiger Data initially experimented with Jaeger, which technically functioned but provided a poor developer experience. They then evaluated Pydantic Logfire because of its strong integration with Pydantic AI, and the immediately superior interface convinced them to adopt it as their observability platform.

## Logfire Observability Implementation

Observability for AI agents presents unique challenges compared to traditional applications. Engineers need visibility into LLM decision-making, tool invocation patterns, tool arguments and responses, and the overall reasoning flow. Pydantic Logfire treats this information as structured data rather than unstructured log messages, enabling far more powerful analysis and debugging.

Instrumentation setup proved remarkably straightforward. Tiger Data instrumented their database layer using psycopg, their AI framework with pydantic_ai, MCP connections, and HTTP requests via httpx with just a few configuration lines. They configured Logfire with service name and version information, then called the appropriate instrument functions for each integration point. Additional granular tracing for specific functions required only adding `@logfire.instrument` decorators. The total setup time was less than one hour.

The resulting traces capture comprehensive information about agent execution. When Tiger Agent responds to a Slack mention, Pydantic Logfire automatically records each tool call with its arguments, response payload, and latency measurements. For LLM calls specifically, it captures the system prompt, user prompt, all tool interactions throughout the reasoning process, and the final response—what Pydantic AI refers to as the "Agent Run" visualization.

The team describes this Agent Run capability as "quite a magical experience" because it makes the entire LLM and tool workflow extremely readable and understandable, significantly improving traceability and observability. Crucially, this happens automatically because Pydantic AI includes built-in instrumentation for Pydantic Logfire—no custom integration code required. Tiger Data had previously written custom tooling attempting to create a similar visualization, which they characterize as "hacky" and inadequate. They emphasize that anyone who has built even slightly complex agentic workflows will immediately appreciate the value of observing this granular execution flow.

## SQL-Based Debugging and Analysis

Logfire's use of SQL for querying trace data represents a significant advantage over custom query languages employed by other tracing tools. To find all agent runs that invoked their documentation search tools, Tiger Data wrote a straightforward SQL query filtering for spans named 'agent run' where the pydantic_ai.all_messages attribute contains references to either the postgres docs or tiger docs semantic search tools. This approach leverages engineers' existing SQL knowledge rather than requiring them to learn proprietary query syntaxes. The traces are stored as rows with JSONB attributes, enabling sophisticated queries using familiar database operations.

## Pydantic AI and Logfire Integration Benefits

The integration between Pydantic AI and Logfire creates significant synergy beyond what either tool provides independently. Pydantic AI includes first-class Logfire support, meaning all LLM calls, tool invocations, and MCP server interactions are automatically instrumented without additional code. Tiger Data didn't need to write custom code to log tool calls or capture LLM responses—calling `logfire.instrument_pydantic_ai()` enabled comprehensive automatic instrumentation.

The complete workflow demonstrates this integration's power. When a Slack mention event arrives, the agent loads MCP servers from configuration, creates a Pydantic AI agent with those servers as toolsets, executes the agent with the user's prompt, and returns a response. Throughout this process, Pydantic AI handles LLM invocation, manages tool calling, and retries failures, while Logfire automatically captures every step without manual instrumentation requirements. This tight integration enables remarkably concise implementation code while maintaining comprehensive observability.

## Production Architecture Characteristics

While the case study focuses primarily on the Pydantic AI and Logfire tooling, it reveals several production architecture patterns. The PostgreSQL-backed work queue with atomic event claiming supports horizontal scaling, enabling the system to handle thousands of concurrent conversations reliably. The use of Jinja2 templates for dynamic prompts suggests sophisticated prompt management beyond simple string formatting. The system's ability to handle thousands of concurrent conversations with memory and context management indicates substantial state management infrastructure, though the case study doesn't detail these implementation specifics.

## Open Source Availability and Documentation

Tiger Data open-sourced Tiger Agent for Work on GitHub, providing full integration examples, MCP server configuration details, the PostgreSQL-backed work queue implementation for horizontal scaling, and Jinja2 templates for dynamic prompt construction. This transparency enables others to learn from their production implementation patterns.

## Critical Assessment and Considerations

While this case study provides valuable technical insights, it's important to note that it appears as a guest post on Pydantic's website, which naturally creates potential bias toward presenting Pydantic AI and Logfire in a positive light. The case study doesn't discuss challenges encountered with these tools, limitations discovered during implementation, or tradeoffs made by choosing this particular stack.

The claim of "more than half of the company uses it daily" within 6 weeks is impressive but lacks context about company size, what constitutes "daily use," and how usage is measured. Without baseline metrics for how employees previously accessed information or quantitative improvements in productivity or time savings, it's difficult to assess the actual business impact beyond adoption rates.

The case study mentions evaluating "quite a few options (including building our own LLM library)" but provides minimal detail about what alternatives were considered, what specific evaluation criteria were used, or what shortcomings in other tools led to their rejection. This makes it challenging to understand whether Pydantic AI and Logfire represent the best choice for similar use cases or whether Tiger Data's specific requirements made them particularly well-suited.

The technical implementation details focus heavily on configuration and integration patterns but reveal less about performance characteristics, cost implications of running this system at scale, error rates in production, or how they handle edge cases and failure modes. The automatic retry logic is mentioned as a benefit, but there's no discussion of retry strategies, backoff policies, or how they prevent retry storms.

The model switching capability is presented as a major advantage, and while the ability to change providers via environment variables is indeed valuable, the case study doesn't address whether switching providers required prompt engineering adjustments, whether tool calling reliability varied across providers, or how they validated that responses maintained quality across different models.

The observability implementation appears straightforward, but production observability typically involves considerations around data retention, query performance at scale, cost of storing detailed traces, and whether comprehensive instrumentation creates performance overhead. These practical concerns aren't addressed in the case study.

Despite these limitations in critical assessment, the case study does provide genuine value in demonstrating production patterns for AI agent deployment, particularly around the importance of distributed tracing for debugging complex agentic systems, the operational benefits of provider abstraction, and the efficiency gains from framework-based tool integration versus building everything from scratch. The emphasis on observability as essential rather than optional for production AI systems represents an important lesson for organizations building similar capabilities.
