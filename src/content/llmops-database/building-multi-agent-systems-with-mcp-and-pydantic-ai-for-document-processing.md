---
title: "Building Multi-Agent Systems with MCP and Pydantic AI for Document Processing"
slug: "building-multi-agent-systems-with-mcp-and-pydantic-ai-for-document-processing"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693be02ec7ca11e60a212b3b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:35:38.035Z"
  createdOn: "2025-12-12T09:28:14.958Z"
llmopsTags:
  - "document-processing"
  - "structured-output"
  - "data-analysis"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "agent-based"
  - "mcp"
  - "error-handling"
  - "token-optimization"
  - "evals"
  - "cost-optimization"
  - "latency-optimization"
  - "system-prompts"
  - "fastapi"
  - "databases"
  - "monitoring"
  - "documentation"
  - "security"
  - "guardrails"
  - "anthropic"
  - "databricks"
  - "google-gcp"
industryTags: "tech"
company: "Deepsense"
summary: "Deepsense AI built a multi-agent system for a customer who operates a document processing platform that handles various file types and data sources at scale. The problem was to create both an MCP (Model Context Protocol) server for the platform's internal capabilities and a demonstration multi-agent system that could structure data on demand from documents. Using Pydantic AI as the core agent framework and Anthropic's Claude models, the team developed a solution where users specify goals for document processing, and the system automatically extracts structured information into tables. The implementation involved creating custom MCP servers, integrating with Databricks MCP, and applying 10 key lessons learned around tool design, token optimization, model selection, observability, testing, and security. The result was a modular, scalable system that demonstrates practical patterns for building production-ready agentic applications."
link: "https://www.youtube.com/watch?v=742ii9eaVsA"
year: 2025
seo:
  title: "Deepsense: Building Multi-Agent Systems with MCP and Pydantic AI for Document Processing - ZenML LLMOps Database"
  description: "Deepsense AI built a multi-agent system for a customer who operates a document processing platform that handles various file types and data sources at scale. The problem was to create both an MCP (Model Context Protocol) server for the platform's internal capabilities and a demonstration multi-agent system that could structure data on demand from documents. Using Pydantic AI as the core agent framework and Anthropic's Claude models, the team developed a solution where users specify goals for document processing, and the system automatically extracts structured information into tables. The implementation involved creating custom MCP servers, integrating with Databricks MCP, and applying 10 key lessons learned around tool design, token optimization, model selection, observability, testing, and security. The result was a modular, scalable system that demonstrates practical patterns for building production-ready agentic applications."
  canonical: "https://www.zenml.io/llmops-database/building-multi-agent-systems-with-mcp-and-pydantic-ai-for-document-processing"
  ogTitle: "Deepsense: Building Multi-Agent Systems with MCP and Pydantic AI for Document Processing - ZenML LLMOps Database"
  ogDescription: "Deepsense AI built a multi-agent system for a customer who operates a document processing platform that handles various file types and data sources at scale. The problem was to create both an MCP (Model Context Protocol) server for the platform's internal capabilities and a demonstration multi-agent system that could structure data on demand from documents. Using Pydantic AI as the core agent framework and Anthropic's Claude models, the team developed a solution where users specify goals for document processing, and the system automatically extracts structured information into tables. The implementation involved creating custom MCP servers, integrating with Databricks MCP, and applying 10 key lessons learned around tool design, token optimization, model selection, observability, testing, and security. The result was a modular, scalable system that demonstrates practical patterns for building production-ready agentic applications."
---

## Overview

Deepsense AI, working as a consultant and development partner, built a comprehensive multi-agent system for a customer operating a large-scale document processing platform. The customer's platform processes documents into LLM-readable formats across hundreds of data sources including Confluence, Notion, Google Cloud Storage, and various file types like PDFs and Excel sheets. The project had dual objectives: first, to create an MCP (Model Context Protocol) server that would expose the platform's capabilities in a standardized way, and second, to build a multi-agent system that would showcase these capabilities while solving a real business problem—structuring data on demand from unstructured documents.

Max Perlane, a senior machine learning engineer at Deepsense AI, presented this case study with a notable degree of candor and self-awareness about both the promises and pitfalls of agentic systems. The presentation distinguishes itself by offering practical lessons learned rather than simply promoting the technology, and by acknowledging that while agents are "evolving" and "super interesting," traditional RAG systems remain "super useful" and will "continue to be core use case for projects." This balanced perspective provides valuable context for understanding when and how to apply agentic patterns in production.

## Technical Architecture and Framework Selection

The team selected Pydantic AI as their foundational framework for agent creation after evaluating multiple options. Pydantic AI offered several key capabilities that made it suitable for production use. The framework is model-agnostic, allowing the team to experiment with multiple providers and models before settling on Anthropic's Claude models. It provides native support for structured outputs through Pydantic models, which proved essential for the type safety and validation requirements of a production system. The framework also includes built-in support for tools via decorators, dependency injection for managing context and connections, streaming responses, multi-agent delegation patterns, and graph-based workflows for complex agent interactions.

At the time of the presentation, Pydantic AI was noted as being one of the most mature frameworks in the space, though the presenter acknowledged that competitors like OpenAI's Agents SDK and Google's ADK had caught up in terms of features. The decision to continue using Pydantic AI was influenced significantly by its associated observability and evaluation tools, specifically Logfire for observability and Pydantic Evals for testing, which provided a more complete ecosystem for production deployment.

The multi-agent system architecture incorporated several specialized agents with distinct responsibilities. A router agent handled initial user queries and delegated to specialist agents based on the nature of the request. The system included agents for understanding user intent, defining extraction schemas, processing documents through the platform's workflows, and answering questions about extracted data. This modular design allowed each agent to focus on specific capabilities while maintaining clear boundaries and tool access.

## MCP Implementation and Standardization

A significant portion of the project involved implementing and integrating Model Context Protocol (MCP) servers. MCP, introduced by Anthropic in November 2024, addresses a fundamental challenge in agentic systems: the proliferation of custom tool integrations. Before MCP, each agent required its own distinct tool implementations for external APIs like Google Calendar, vector databases, or data processing platforms. When API schemas changed, updates were needed across multiple tool implementations. Credential management became complex, and different protocols (REST API, GraphQL, etc.) required different integration approaches.

MCP standardizes how AI agents communicate with external tools and data sources by creating a single server that exposes all tools for a given service in a language-agnostic format built on JSON-RPC 2.0. This means one MCP server can be reused by multiple agents, and API providers can publish their own MCP servers for developers to use directly. The team implemented their MCP servers using FastMCP, a Python library that mirrors the developer experience of FastAPI. Creating an MCP tool involves decorating a function with `@mcp.tool()`, with the function signature and docstring automatically converted to the JSON-RPC format that LLMs consume.

For this project, the team both reused existing MCP servers (specifically Databricks MCP for table creation) and created custom MCP servers for their customer's document processing platform. The custom MCP exposed capabilities for creating new document processing workflows or reusing existing ones, allowing agents to trigger document processing jobs and retrieve results. The integration between MCP and Pydantic AI proved straightforward—Pydantic AI includes native MCP client support, allowing agents to consume MCP tools by simply pointing to an endpoint and adding the tool set.

## The Document Structuring Use Case

The primary use case demonstrated a practical workflow for extracting structured data from documents. A user begins by specifying their goal—for example, analyzing the strategic positioning of uranium production companies from PDF documents in an S3 bucket. The first agent in the workflow understands the user's intent and asks clarifying questions to fully grasp the topic and requirements. Based on this conversation, the system automatically generates a database schema tailored to the user's needs, with fields of appropriate types (strings, integers, floats, dates) to capture the relevant information.

Once the user accepts the generated schema or provides feedback to refine it, the system uses the Databricks MCP to create a Delta table with this schema. The system then processes the documents using the custom document processing platform MCP, either creating a new workflow or utilizing an existing one based on user preference. After processing, extracted data is loaded into the Delta table, and a summary of findings is generated. Users can review individual source records, see which documents contributed specific data points, and ask follow-up questions. The final conversational agent can answer questions either from the summary it generated or by executing SQL queries against the Delta table to retrieve specific information.

This workflow demonstrates several production LLMOps patterns: dynamic schema generation based on natural language requirements, integration with enterprise data platforms through standardized protocols, maintaining source provenance for extracted data, and providing both conversational and structured query interfaces to results.

## Ten Lessons Learned for Production Agentic Systems

The presentation's core value lies in ten practical lessons distilled from implementing this system, categorized into MCP tool creation, multi-agent system design, and universal principles.

**Lesson 1: Design APIs with an LLM-First Mindset**

The most critical aspect of tool design is recognizing that LLMs only see function signatures and docstrings when selecting and using tools. Unlike human developers who can read source code to understand poorly documented APIs, LLMs must work entirely from the JSON schema representation. A function with untyped parameters (returning generic `dict` objects) and minimal documentation will lead to wasted tokens, increased costs, hallucinations, and errors. The team learned to be extremely explicit with type annotations and comprehensive with docstrings, providing clear descriptions of expected inputs, outputs, and the tool's purpose. While this level of documentation might seem excessive to human developers accustomed to reading implementation code, it's essential for reliable LLM tool use.

**Lesson 2: Mind the Token Budget**

When building web APIs, returning large, unformatted JSON responses is merely inefficient. In LLM contexts, it can be catastrophic—potentially exceeding context limits, significantly increasing costs, and making it impossible for the LLM to extract correct information from the noise. The team learned to curate their JSON responses carefully, selecting only the fields actually needed for the agent's task. In some cases, they even compressed JSON structures into single strings—a controversial approach that won't work universally but can be effective for specific use cases where the LLM doesn't need to navigate complex nested structures.

**Lesson 3: Avoid Over and Under-Specifying Tools**

The team initially created separate tools for processing documents from different sources—S3, Google Drive, Azure Blob Storage, and others. This over-specification resulted in 16,000 tokens just to list the available tools, which exceeded the 10,000 token context limit of Claude Sonnet Free. By unifying these tools into a single function with a string literal parameter to specify the source type, they reduced token usage by 50% while maintaining full functionality. Pydantic AI could still correctly call the unified tool by selecting from the literal options. This lesson highlights the importance of finding the right abstraction level—specific enough to be clear, but unified enough to be efficient.

**Lesson 4: Filter and Limit Tools Per Agent**

Exposing all available tools to all agents creates security vulnerabilities and confusion. The team implemented tool filtering so each agent only had access to tools relevant to its specific responsibilities. For example, the chat-document agent that answered questions about extracted data only needed tools for getting document insights and executing SQL queries. Other tools for workflow creation, schema generation, or document processing were assigned to different specialized agents. This principle applies equally to native tools and MCP servers, where subsets of tools can be explicitly selected for each agent.

**Lesson 5: Select Proper Model for Proper Use Case**

The team used Claude 3.5 Sonnet (and would now use Claude 4.5) as their primary model for complex reasoning tasks. These models achieve excellent benchmark results and have good knowledge cutoffs, but come with significant costs and latency—1.8 seconds time to first token without reasoning, even longer with reasoning enabled. For conversational interactions that didn't require complex reasoning, they used Claude Haiku, which is much faster and cheaper while still capable enough for routine interactions. For use cases requiring even lower latency, they noted Gemini 2.0 Flash as an extremely quick alternative. This model selection strategy allows optimization of the cost-performance-latency tradeoff across different parts of the system rather than defaulting to the most capable (and expensive) model everywhere.

**Lesson 6: Observability Isn't Optional**

The team emphasized that observability is essential for debugging and improving agentic systems. They use Pydantic Logfire as their observability platform, which provides comprehensive tracing across the entire system. Logfire displays execution traces grouped and nested by operation, showing bottlenecks, input/output token counts, and costs. Drilling into individual traces reveals the model used, system prompts, user prompts, tools called, and actual outputs. Critically, Logfire doesn't just instrument Pydantic AI—it can instrument OpenAI calls, Anthropic calls, HTTP requests, MCP interactions, and SQL queries, providing end-to-end visibility across the entire stack. Enabling this comprehensive instrumentation requires just a single line calling `logfire.instrument()` for each component type, making it low-friction to adopt.

**Lesson 7: Testing Your Agents is Critical**

Prompt changes or model updates can significantly affect system performance, and detecting these regressions before production deployment is essential. The team uses Pydantic Evals, a component of Pydantic AI, to create test cases with inputs, expected outputs, and metadata for filtering. Custom evaluators score each test case—for example, returning 1.0 for exact matches, 0.8 for close matches, and 0.0 for failures. Beyond custom evaluators, Pydantic Evals includes pre-built evaluators like "LLM as judge," where an LLM evaluates whether outputs meet specified criteria such as being "grounded in the document" or "comprehensive in covering relevant information." Running evaluations produces tabular results showing pass rates across test suites, enabling systematic testing of agent capabilities before changes reach production.

**Lesson 8: Don't Trust Your Agent—Implement Robust Guardrails**

While structured outputs provide some validation, additional guardrails are often necessary. The team implemented validation that goes beyond schema compliance. For example, when an agent claimed to have saved insights to a database, they added validation to verify the insights actually exist in the database before proceeding. If validation fails, they raise a `ModelRetry` with feedback that goes back to the agent, which attempts the operation again using the feedback as guidance. This pattern of validate-then-retry creates more robust systems that can recover from agent errors rather than propagating them downstream.

**Lesson 9: Graph Approach Can Be Overkill**

Pydantic AI supports graph-based workflows where execution can branch and cycle based on conditions, similar to state machines. However, the team found that for their relatively linear workflow (with some feedback loops), the graph approach added unnecessary complexity. Graph implementations require defining nodes separately, specifying transitions, and managing state in ways that make the code harder to read compared to a linear flow with explicit conditional logic. The team recommends using linear flow when possible and reserving graph-based approaches for workflows with genuinely complex branching and cyclic patterns.

**Lesson 10: Security is Critical**

The team highlighted a security incident involving GitHub's MCP where a malicious issue in a public repository tricked an AI agent into injecting private repository data into a public pull request, leaking sensitive information. This illustrates the broader security challenges of agentic systems: agents with tool access can be manipulated through prompt injection or malicious inputs to take unintended actions. The presentation didn't cover all security considerations due to time constraints but directed interested parties to a detailed article co-authored with Kamil Ciemniewski on LLM security, and referenced other deep talks specifically on LLM security topics.

## Production Deployment Considerations

While the presentation focused heavily on development patterns, several production deployment considerations emerged. The use of Databricks as the data platform suggests enterprise-scale deployment, and the integration of comprehensive observability from the start indicates production readiness was a primary concern rather than an afterthought. The emphasis on token optimization and cost management throughout the lessons reflects real constraints faced in production systems where API costs can scale significantly with usage.

The modular architecture—with specialized agents, filtered tool access, and model selection by task—provides a template for scalable production deployments. The integration with existing enterprise data infrastructure (S3, Databricks, various data sources) through standardized protocols demonstrates how agentic systems can be embedded into existing data workflows rather than requiring wholesale architectural changes.

## Critical Assessment and Industry Implications

The presenter maintained a notably balanced perspective throughout, acknowledging both the potential and limitations of current agentic approaches. The self-deprecating humor about RAG being "super old, super boring" before immediately affirming its continued usefulness reflects a realistic assessment of the technology landscape. The admission that graph-based workflows added unnecessary complexity for their use case demonstrates willingness to question framework capabilities rather than using every available feature.

The emphasis on MCP as potentially becoming "the USB-C for AI integration" highlights an important industry trend toward standardization. However, the caveat that poorly designed MCP servers can "bloat context windows" and be "super expensive" with "agent reasoning destroyed" serves as an important warning. Standardization only provides value when the standards are well-implemented—poorly designed MCP servers may be worse than well-designed custom integrations.

The comparison table showing Pydantic AI, OpenAI Agents SDK, and Google ADK having converged on similar feature sets suggests the industry is coalescing around common patterns for agent development. This convergence is healthy for the ecosystem, as it means developers can transfer knowledge between frameworks and best practices can emerge across implementations.

## Key Takeaways for LLMOps Practitioners

This case study offers several valuable insights for teams building production LLM systems. First, the framework and tool selection matters less than might be expected—by the time this talk was given, major frameworks had converged on similar capabilities. The differentiators are ecosystem tools like observability and testing platforms, development ergonomics, and team familiarity rather than core agent orchestration features.

Second, the production challenges center on operational concerns: token efficiency, cost management, observability, testing, security, and appropriate tool design. These operational concerns should guide architectural decisions from the start rather than being addressed after initial development. Third, modular design with specialized components (agents with specific responsibilities, appropriate model selection per task, filtered tool access) provides the foundation for scalable, maintainable systems.

Fourth, standardization through protocols like MCP offers real benefits for code reuse and maintainability, but only when implementations follow LLM-first design principles. The JSON-RPC schema that MCP generates is only as good as the type annotations and documentation it's generated from. Finally, comprehensive testing and evaluation should be built into the development workflow, not treated as a separate phase, and observability needs to span the entire system including LLM calls, tool invocations, and data operations to enable effective debugging and optimization.