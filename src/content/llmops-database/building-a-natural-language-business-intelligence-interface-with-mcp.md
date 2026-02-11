---
title: "Building a Natural Language Business Intelligence Interface with MCP"
slug: "building-a-natural-language-business-intelligence-interface-with-mcp"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "690a131af1eb108361b481a2"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:26:01.019Z"
  createdOn: "2025-11-04T14:52:10.733Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "structured-output"
  - "visualization"
  - "data-integration"
  - "data-cleaning"
  - "prompt-engineering"
  - "mcp"
  - "agent-based"
  - "error-handling"
  - "token-optimization"
  - "a2a"
  - "sqlite"
  - "fastapi"
  - "api-gateway"
  - "open-source"
  - "security"
  - "documentation"
  - "anthropic"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built an MCP (Model Context Protocol) server to enable natural language querying of business spend data through their developer API. The initial prototype allowed Claude to generate visualizations and run analyses, but struggled with scale due to context window limitations and high token usage. By pivoting to a SQL-based approach using an in-memory SQLite database with a lightweight ETL pipeline, they enabled Claude to query tens of thousands of transactions efficiently. The solution includes load tools for API data extraction, data transformation capabilities, and query execution tools, allowing users to gain insights into business spend patterns through conversational queries while addressing security concerns through audit logging and OAuth scopes."
link: "https://engineering.ramp.com/post/ramp-mcp"
year: 2025
seo:
  title: "Ramp: Building a Natural Language Business Intelligence Interface with MCP - ZenML LLMOps Database"
  description: "Ramp built an MCP (Model Context Protocol) server to enable natural language querying of business spend data through their developer API. The initial prototype allowed Claude to generate visualizations and run analyses, but struggled with scale due to context window limitations and high token usage. By pivoting to a SQL-based approach using an in-memory SQLite database with a lightweight ETL pipeline, they enabled Claude to query tens of thousands of transactions efficiently. The solution includes load tools for API data extraction, data transformation capabilities, and query execution tools, allowing users to gain insights into business spend patterns through conversational queries while addressing security concerns through audit logging and OAuth scopes."
  canonical: "https://www.zenml.io/llmops-database/building-a-natural-language-business-intelligence-interface-with-mcp"
  ogTitle: "Ramp: Building a Natural Language Business Intelligence Interface with MCP - ZenML LLMOps Database"
  ogDescription: "Ramp built an MCP (Model Context Protocol) server to enable natural language querying of business spend data through their developer API. The initial prototype allowed Claude to generate visualizations and run analyses, but struggled with scale due to context window limitations and high token usage. By pivoting to a SQL-based approach using an in-memory SQLite database with a lightweight ETL pipeline, they enabled Claude to query tens of thousands of transactions efficiently. The solution includes load tools for API data extraction, data transformation capabilities, and query execution tools, allowing users to gain insights into business spend patterns through conversational queries while addressing security concerns through audit logging and OAuth scopes."
---

## Overview

Ramp, a business finance automation company, developed an open-source MCP (Model Context Protocol) server to enable natural language interaction with business spend data. The project demonstrates a practical exploration of how to productionize LLM-based data analysis capabilities while navigating real-world constraints around scale, reliability, and security. The case study is particularly valuable for understanding the architectural decisions required when building LLM-powered tools that need to handle large volumes of structured business data.

The core problem Ramp addressed was making their developer API accessible through natural language queries. Rather than requiring users to understand REST endpoints and data structures, they wanted to enable conversational queries like "give me a detailed overview of my business's spend in the past year." This represents a common production use case: bridging the gap between complex technical systems and intuitive user interaction through LLM capabilities.

## Technical Architecture and Implementation

Ramp leveraged Anthropic's Model Context Protocol (MCP), an open-source standard that enables applications to expose data and functionality to LLMs. MCP provides a standardized way for LLMs to access various data sources—databases, filesystems, external APIs, and more. The architecture uses FastMCP, a Python framework for building MCP servers, which provides a developer experience similar to Flask or FastAPI.

The initial implementation approach was straightforward: they built MCP tools that directly exposed Ramp's developer API endpoints to Claude. Each tool functioned like an HTTP endpoint that the LLM could call through an MCP client. The FastMCP framework automatically parses Python function signatures, including type hints and docstrings, to generate the tool schemas that the LLM uses to understand available capabilities. This meant that adding new data sources was as simple as defining a new Python function decorated with the MCP tool decorator.

In their early prototype, Claude Desktop served as the MCP client, allowing Claude to generate visualizations and perform analyses on spend data pulled from Ramp's APIs using natural language. As a proof of concept, they demonstrated the system issuing cards on demand for a company offsite, showing that write operations were technically feasible.

## Scaling Challenges and the SQL Pivot

The initial direct API approach worked well for small demo businesses but quickly encountered significant scaling issues when dealing with real-world data volumes. The team identified several critical bottlenecks: miscalculations by the LLM when processing large datasets, limited context windows that couldn't accommodate all the necessary data, input size limits preventing large API responses from being processed, and high input token usage making the solution expensive and slow.

Their first attempt at addressing these issues involved implementing simple pagination to chunk API responses into smaller parts. However, this approach failed to scale meaningfully beyond a few hundred transactions. The breakthrough came from an interesting source: asking Claude itself what data format it would prefer. Claude indicated a preference for "predictable data formats that enabled server-side functions"—essentially describing SQL.

This insight led to a fundamental architectural pivot. Instead of passing raw API responses directly to the LLM, they implemented a SQL-based paradigm that fundamentally changed how the system operated. SQL offered several critical advantages: structured and predictable data formats, built-in querying capabilities, and most importantly, the ability to perform server-side computations that minimized the amount of raw data loaded into the LLM's context window. This architectural change reduced token usage so significantly that the Ramp MCP server became compatible with the free version of Claude—a meaningful improvement in accessibility.

## ETL Pipeline and Data Transformation

To implement the SQL interface, Ramp built a lightweight in-memory ETL (Extract, Transform, Load) pipeline. This pipeline pulls data from Ramp's REST APIs, transforms JSON responses into relational tables, and loads them into an in-memory SQLite database. Everything except the Developer API calls runs locally on the user's machine, which has important implications for data privacy and security.

The transformation logic handles the impedance mismatch between JSON and relational data structures. The system flattens nested JSON objects and infers appropriate SQL column types based on value types. For simplicity, missing keys are set to NULL, and lists are cast to text. For example, a JSON object with nested user information gets flattened so that `user.cardholder_first_name` becomes a column named `user_cardholder_first_name`. While this flattening approach loses some of the hierarchical structure of JSON, it creates a queryable relational schema that LLMs can work with effectively.

The team also integrated with an OLAP-powered API built by Ramp's data platform team to handle reporting use cases. Reporting queries often involve large volumes of data and complex aggregations that can lead to timeouts when pulling from transactional APIs. The OLAP integration provides pre-optimized spend data specifically designed for analytical workloads, solving the timeout issues that plagued complex queries.

## Tool Design and LLM Interaction Patterns

The final system exposes three categories of tools to the LLM. Load tools (like `load_transactions`) pull data from the Ramp API into the local environment. A `process_data` tool transforms API responses and loads them into SQLite tables (though the authors note this step could potentially be eliminated to reduce roundtrips). An `execute_query` tool allows Claude to run SQL queries directly against the in-memory database.

This tool structure gives Claude significant flexibility in how it accesses and analyzes data. Rather than being forced to load entire datasets into context, Claude can now load as little or as much data as needed and use SQL's aggregate functions, window functions, and filtering capabilities to understand the data efficiently. The shift from direct API access to SQL dramatically improved scale—Claude went from struggling with a few hundred data points to accurately analyzing tens of thousands of spend events.

The case study makes an important observation about LLM capabilities: LLMs are significantly better at SQL than at performing mathematical calculations on raw data. This insight has broader implications for LLMOps practitioners. When designing systems that expose data to LLMs, the interface matters enormously. MCP's flexibility allows developers to create whatever interface works best for their data type, but it requires experimentation to discover the optimal data access strategy.

## Production Challenges and Limitations

Despite the system's successes, Ramp is candid about its limitations in a production context. Reliability issues occur occasionally—the system doesn't always work perfectly. API latency becomes problematic for very large businesses with substantial data volumes. After the SQL optimization, API data extraction latency became the primary bottleneck, with tool calls starting to timeout.

The team identifies several potential optimizations they haven't yet implemented: concurrent API requests, asynchronous data pulling, intelligent caching strategies, and potentially switching from SQLite to DuckDB (an OLAP-optimized database that might better handle analytical workloads). However, they acknowledge that building truly scalable and reliable agentic AI requires complex technical work beyond what MCP currently provides out of the box.

Write operations present particular reliability challenges. While their proof of concept demonstrated card issuance, they recognize that write tools are "particularly unreliable" in the current state of the technology. Before releasing tools that can perform actions in a business context on behalf of an agentic LLM, they plan to implement a comprehensive safety framework. This cautious approach reflects a mature understanding of the risks associated with autonomous agent actions in production financial systems.

## Security and Audit Considerations

Ramp demonstrates thoughtful attention to information security concerns that arise when deploying LLM-powered tools in production. MCP and similar technologies can introduce significant security risks because LLMs can pull and understand large amounts of data from any accessible source. This makes proper authentication and authorization critical.

Their security approach includes several layers. Authentication credentials like API keys must be properly secured. They follow the principle of least privilege, allowing users to select constrained sets of OAuth scopes and tools to make available to the MCP client. This means users can limit what data the system can access based on their specific needs and risk tolerance.

Audit logging provides visibility into what the system is actually doing. Ramp implemented comprehensive audit logs for their developer API, allowing organizations to track what data is being accessed and what actions are being performed. This is particularly important given another limitation the team identified: LLMs don't always select the correct tools or use them correctly. Even with careful prompt engineering, Claude occasionally made mistakes when given identical prompts across separate conversations. This inherent unpredictability means audit trails become essential for understanding system behavior and debugging issues.

## LLMOps Lessons and Broader Implications

This case study offers several valuable lessons for LLMOps practitioners. First, interface design is critical when exposing data to LLMs. The dramatic improvement from switching to SQL demonstrates that how data is presented matters as much as what data is available. Understanding LLM strengths and weaknesses—in this case, better SQL capabilities than arithmetic—should inform architectural decisions.

Second, context window management remains a fundamental constraint when building LLM-powered systems. The initial approach failed precisely because it tried to load too much raw data into context. The SQL approach succeeded by pushing computation to the database layer, minimizing context usage. This principle—do heavy computation outside the LLM and use the LLM primarily for query generation and interpretation—is broadly applicable.

Third, the path from prototype to production involves confronting reliability and scale challenges that aren't apparent in demos. Ramp's prototype worked impressively on small datasets but required fundamental architectural changes to handle real-world data volumes. This pattern is common in LLMOps: the gap between "works in demo" and "works in production" involves solving unglamorous problems around latency, cost, reliability, and scale.

Fourth, security and observability aren't afterthoughts but must be designed into LLM systems from the start. Audit logging, least-privilege access controls, and careful scope management are all essential when building systems that autonomously access business data. The inherent unpredictability of LLM behavior makes these safeguards even more critical than in traditional systems.

Finally, the case study demonstrates intellectual honesty about limitations. Rather than overselling the technology, Ramp clearly articulates where their system works well (read-only analytical queries on structured financial data) and where it struggles (write operations, very large businesses, reliability guarantees). This balanced perspective is valuable for practitioners evaluating whether similar approaches make sense for their use cases.

The architecture described—lightweight local ETL, in-memory database, tool-based LLM interaction, and careful security controls—provides a reasonable template for other organizations looking to build similar natural language data access capabilities. The specific technology choices (FastMCP, SQLite, Anthropic Claude) matter less than the underlying patterns: transform data into LLM-friendly formats, minimize context usage, leverage LLM strengths while compensating for weaknesses, and implement proper guardrails and observability.