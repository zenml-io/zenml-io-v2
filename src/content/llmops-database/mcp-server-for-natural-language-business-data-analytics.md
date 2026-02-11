---
title: "MCP Server for Natural Language Business Data Analytics"
slug: "mcp-server-for-natural-language-business-data-analytics"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68762982b4cfcc1bf0b198b1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:13:47.076Z"
  createdOn: "2025-07-15T10:12:18.803Z"
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "structured-output"
  - "prompt-engineering"
  - "agent-based"
  - "sqlite"
  - "fastapi"
  - "open-source"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built an open-source Model Context Protocol (MCP) server that enables natural language interaction with business financial data by creating a SQL interface over their developer API. The solution evolved from direct API querying to an in-memory SQLite database approach to handle scaling challenges, allowing Claude to analyze tens of thousands of spend events through natural language queries. While demonstrating strong potential for business intelligence applications, the implementation reveals both the promise and current limitations of agentic AI systems in production environments."
link: "https://builders.ramp.com/post/ramp-mcp"
year: 2025
seo:
  title: "Ramp: MCP Server for Natural Language Business Data Analytics - ZenML LLMOps Database"
  description: "Ramp built an open-source Model Context Protocol (MCP) server that enables natural language interaction with business financial data by creating a SQL interface over their developer API. The solution evolved from direct API querying to an in-memory SQLite database approach to handle scaling challenges, allowing Claude to analyze tens of thousands of spend events through natural language queries. While demonstrating strong potential for business intelligence applications, the implementation reveals both the promise and current limitations of agentic AI systems in production environments."
  canonical: "https://www.zenml.io/llmops-database/mcp-server-for-natural-language-business-data-analytics"
  ogTitle: "Ramp: MCP Server for Natural Language Business Data Analytics - ZenML LLMOps Database"
  ogDescription: "Ramp built an open-source Model Context Protocol (MCP) server that enables natural language interaction with business financial data by creating a SQL interface over their developer API. The solution evolved from direct API querying to an in-memory SQLite database approach to handle scaling challenges, allowing Claude to analyze tens of thousands of spend events through natural language queries. While demonstrating strong potential for business intelligence applications, the implementation reveals both the promise and current limitations of agentic AI systems in production environments."
---

## Overview

Ramp, a financial technology company focused on business expense management, developed an innovative approach to making their business data accessible through natural language queries by building a Model Context Protocol (MCP) server. This case study demonstrates a practical implementation of LLMOps principles, showing how to bridge the gap between structured business APIs and conversational AI interfaces. The project represents an interesting exploration of how modern LLMs can be integrated into production systems to democratize data access within organizations.

The core challenge Ramp addressed was transforming their existing RESTful developer API into a conversational interface that could handle complex business intelligence queries. Rather than building a traditional dashboard or requiring users to learn API endpoints, they leveraged Anthropic's Model Context Protocol to create a natural language interface that could understand queries like "give me a detailed overview of my business's spend in the past year" and return meaningful analytical results.

## Technical Architecture and Implementation

The implementation demonstrates sophisticated technical decision-making in the face of real-world constraints. Ramp's engineering team built their solution using FastMCP, a Python framework that simplifies the creation of MCP servers. The architecture follows a familiar pattern similar to Flask applications, with decorators defining tools that function as endpoints the LLM can access. This design choice reflects a pragmatic approach to LLMOps, leveraging existing development patterns while introducing AI capabilities.

The initial implementation took a straightforward approach, directly exposing Ramp's API endpoints as MCP tools. This allowed Claude Desktop to generate visualizations and perform simple analyses on spend data. However, this approach quickly revealed scalability limitations that are common in production LLM systems. The team encountered issues with miscalculations, context window limitations, input size constraints, and high token usage costs - all critical considerations in LLMOps deployments.

The evolution of their solution demonstrates important lessons about optimizing LLM interactions for production use. When faced with scaling challenges beyond a few hundred transactions, the team initially implemented pagination to chunk responses. However, this approach proved insufficient for meaningful scale. The breakthrough came when they directly consulted Claude about preferred data formats, receiving feedback that predictable, structured data enabling server-side functions would be optimal. This led to the crucial insight that SQL would be the ideal interface.

## SQL Interface and Data Transformation

The decision to implement a SQL interface represents a sophisticated understanding of LLM capabilities and limitations. The team recognized that LLMs perform significantly better at SQL generation than at mathematical calculations, which is a key insight for LLMOps practitioners. This architectural choice allowed Claude to load minimal raw data into its context window while delegating computational work to the database engine.

The technical implementation involved building a lightweight in-memory ETL pipeline that pulls data from Ramp's APIs, transforms it, and loads it into an in-memory SQLite database. The transformation process flattens JSON responses from the RESTful API into SQL rows, with intelligent type inference based on value types. The team made pragmatic decisions about handling missing data (setting as NULL) and complex types (casting lists to text), demonstrating the kind of practical trade-offs necessary in production LLM systems.

For example, a JSON response containing nested user information and transaction data gets flattened into a tabular format that's easily queryable via SQL. This transformation enables the LLM to perform complex analytical operations without requiring large amounts of context or complex in-memory calculations.

To address reporting use cases involving large datasets and complex queries that could lead to timeouts, the team integrated with an OLAP-powered API built by their data platform team. This integration shows how LLMOps solutions often need to leverage existing enterprise infrastructure and optimize for specific use cases.

## Tool Design and LLM Interface

The final tool architecture exposes three main categories of functionality to the LLM: load tools for pulling data from the Ramp API, a process_data tool for transforming and loading data into SQLite, and an execute_query tool for running SQL queries against the in-memory database. This design reflects best practices in LLMOps tool design, providing clear separation of concerns while maintaining flexibility for the LLM to orchestrate complex workflows.

The impact of this architectural change was dramatic - Claude went from struggling with a few hundred data points to accurately analyzing tens of thousands of spend events. This improvement demonstrates the importance of choosing the right abstraction layer when building LLM-powered systems. The SQL interface allowed the LLM to leverage its strong SQL generation capabilities while minimizing token usage and computational overhead.

## Production Challenges and Limitations

The case study provides valuable insights into the real-world challenges of deploying LLM-powered systems in production environments. The team encountered API latency issues that became the primary bottleneck as tool calls began timing out. This highlights a common challenge in LLMOps where the integration of multiple systems can create complex performance dependencies.

The authors are transparent about ongoing limitations, including occasional reliability issues and performance challenges for very large businesses with substantial data volumes. They identify several potential optimizations including concurrent requests, asynchronous data pulling, smart caching, and alternative database technologies like DuckDB. However, they acknowledge that building truly scalable and reliable agentic AI systems requires significant additional technical work beyond what MCP currently offers.

Particularly notable is their caution around write operations, recognizing that write tools can be particularly unreliable in current LLM systems. This demonstrates mature thinking about the gradual rollout of AI capabilities in production environments, prioritizing safety and reliability over feature completeness.

## Security and Governance Considerations

The implementation includes thoughtful consideration of security and governance challenges that are crucial in LLMOps deployments. The team implemented audit logging and OAuth scope restrictions to limit the MCP client's access to data. This approach reflects the principle of least privilege, which becomes even more important when LLMs have the ability to access and understand large amounts of business data.

The audit logging capability provides visibility into how the LLM is accessing and using business data, which is essential for both security and compliance purposes. The team also acknowledges that LLMs may not always select the correct tools or may use them incorrectly, even with identical prompts across separate conversations. This recognition of LLM limitations and the need for monitoring and safeguards is a mark of mature LLMOps thinking.

## Business Impact and Use Cases

The resulting system enables several valuable business use cases including creating curated views of spend data, identifying potential cost savings, and helping users navigate business hierarchies. The natural language interface democratizes access to business intelligence, allowing users to ask complex questions without requiring technical expertise in API usage or SQL query construction.

The team notes that the system can surface insights that hadn't been previously considered, suggesting that the conversational interface may enable new types of analytical workflows. This represents a key value proposition of LLMOps implementations - not just automating existing processes, but enabling new capabilities that weren't previously feasible.

## Broader Implications for LLMOps

This case study illustrates several important principles for LLMOps practitioners. The importance of iterating on the interface design based on LLM capabilities, the value of leveraging existing enterprise infrastructure, and the need for careful consideration of security and reliability constraints in production deployments. The team's approach of starting with a simple implementation and evolving based on real-world constraints demonstrates effective LLMOps methodology.

The open-source nature of their solution also reflects a broader trend in the LLMOps community toward sharing implementations and building on common protocols like MCP. This collaborative approach can accelerate the development of production-ready LLM systems across different organizations and use cases.

The case study concludes with encouragement for others to experiment with MCP technologies, while acknowledging that the technology is still early stage with many limitations to overcome. This balanced perspective reflects the current state of LLMOps - significant potential coupled with real challenges that require careful engineering and gradual rollout strategies.