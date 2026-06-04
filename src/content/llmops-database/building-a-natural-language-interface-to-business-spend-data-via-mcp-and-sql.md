---
title: "Building a Natural Language Interface to Business Spend Data via MCP and SQL"
slug: "building-a-natural-language-interface-to-business-spend-data-via-mcp-and-sql"
draft: false
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "structured-output"
  - "prompt-engineering"
  - "mcp"
  - "agent-based"
  - "error-handling"
  - "sqlite"
  - "fastapi"
  - "open-source"
  - "documentation"
  - "security"
  - "anthropic"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built an open-source Model Context Protocol (MCP) server that enables natural language querying of business spend data through their developer API. The system evolved from directly feeding API responses to an LLM into a more scalable SQL-based approach using an in-memory SQLite database. By implementing a lightweight ETL pipeline that transforms REST API JSON responses into queryable SQL tables, they overcame scaling limitations including context window constraints, miscalculations, and high token usage. The solution successfully handles tens of thousands of spend events, allowing users to analyze business spending patterns, identify cost savings, and navigate organizational hierarchies through conversational queries in Claude Desktop, though reliability and API latency challenges remain for very large datasets."
link: "https://builders.ramp.com/post/ramp-mcp"
year: 2025
seo:
  title: "Ramp: Building a Natural Language Interface to Business Spend Data via MCP and SQL - ZenML LLMOps Database"
  description: "Ramp built an open-source Model Context Protocol (MCP) server that enables natural language querying of business spend data through their developer API. The system evolved from directly feeding API responses to an LLM into a more scalable SQL-based approach using an in-memory SQLite database. By implementing a lightweight ETL pipeline that transforms REST API JSON responses into queryable SQL tables, they overcame scaling limitations including context window constraints, miscalculations, and high token usage. The solution successfully handles tens of thousands of spend events, allowing users to analyze business spending patterns, identify cost savings, and navigate organizational hierarchies through conversational queries in Claude Desktop, though reliability and API latency challenges remain for very large datasets."
  canonical: "https://www.zenml.io/llmops-database/building-a-natural-language-interface-to-business-spend-data-via-mcp-and-sql"
  ogTitle: "Ramp: Building a Natural Language Interface to Business Spend Data via MCP and SQL - ZenML LLMOps Database"
  ogDescription: "Ramp built an open-source Model Context Protocol (MCP) server that enables natural language querying of business spend data through their developer API. The system evolved from directly feeding API responses to an LLM into a more scalable SQL-based approach using an in-memory SQLite database. By implementing a lightweight ETL pipeline that transforms REST API JSON responses into queryable SQL tables, they overcame scaling limitations including context window constraints, miscalculations, and high token usage. The solution successfully handles tens of thousands of spend events, allowing users to analyze business spending patterns, identify cost savings, and navigate organizational hierarchies through conversational queries in Claude Desktop, though reliability and API latency challenges remain for very large datasets."
notion:
  pageId: "375f8dff-2538-8075-bf9f-e88edb723577"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-04T08:05:00.000Z"
  lastEditedTime: "2026-06-04T08:05:00.000Z"
  publishedAt: "2026-06-04T08:36:52Z"
---

## Overview

Ramp, a business spend management platform, developed an open-source Model Context Protocol (MCP) server to enable natural language access to business financial data through their developer API. The case study, published in March 2025, represents a practical exploration of how MCP—an open-source standard developed by Anthropic—can transform structured business data into conversational interfaces. The project demonstrates both the potential and current limitations of building production-ready agentic AI systems, particularly around reliability, scalability, and security considerations when deploying LLMs against real business data.

The fundamental problem Ramp sought to address was providing intuitive natural language access to complex business spending data that traditionally required either direct API manipulation or custom dashboard development. Their solution evolved through multiple iterations, ultimately settling on a SQL-based paradigm that dramatically improved scalability and cost-effectiveness compared to their initial approach.

## Technical Architecture and Implementation

The Ramp MCP server leverages the FastMCP Python framework to create an interface between Anthropic's Claude and Ramp's developer API. The architecture follows MCP's tool-based paradigm, where "tools" function similarly to HTTP endpoints that the LLM can invoke through an MCP client. In their implementation, tools are defined using Python decorators with type hints that automatically generate schemas describing available functions, their parameters, and expected inputs.

The initial prototype took a straightforward approach by directly exposing API endpoints as MCP tools. When a user asked a question about their business spending, Claude would call the appropriate Ramp API endpoints, receive JSON responses, and attempt to analyze the data directly within its context window. This approach worked adequately for small demo businesses but quickly revealed fundamental scaling limitations when confronted with real-world data volumes.

## The Scaling Crisis and SQL Pivot

The team encountered several critical issues with the initial direct-API approach. Miscalculations became common as Claude attempted to perform mathematical operations on large datasets within its context window. The context window itself became a bottleneck—attempting to load hundreds or thousands of transactions as raw JSON quickly exhausted available tokens. Input size limits on API calls created additional constraints, and the high input token usage made the solution economically impractical for anything beyond trivial datasets.

Their initial workaround involved implementing a pagination tool to chunk API responses into smaller pieces, but this approach fundamentally failed to scale beyond a few hundred transactions. The breakthrough came from an interesting source—they asked Claude itself what data format it would prefer. Claude indicated a preference for "predictable data formats that enabled server-side functions," which the team correctly interpreted as pointing toward SQL.

This insight proved transformative. SQL databases offer structured, predictable data formats with powerful server-side computational capabilities through aggregate functions, window functions, and complex joins. Most critically, SQL allows the LLM to query exactly the data it needs rather than loading entire datasets into context and filtering them manually. This architectural shift reduced token usage so dramatically that the solution began working even with the free tier of Claude.

## ETL Pipeline and Data Transformation

To implement the SQL interface, Ramp built a lightweight in-memory ETL (Extract, Transform, Load) pipeline. The pipeline extracts data from Ramp's RESTful APIs, transforms the nested JSON structures into flat relational tables, and loads them into an in-memory SQLite database. Everything except the developer API calls runs locally, providing both performance benefits and reducing external dependencies.

The transformation logic handles the impedance mismatch between JSON and SQL through pragmatic flattening. Nested objects are flattened into columns with hierarchical names (e.g., `user.cardholder_first_name` becomes `user_cardholder_first_name`). Type inference determines appropriate SQL column types based on observed values. Missing keys are set to NULL, and lists are cast to text representations—simple heuristics that work well enough for analytical queries while avoiding complex schema management.

For more demanding reporting use cases involving large data volumes and complex queries that risked timeouts, the team added integration with an OLAP-powered API developed by Ramp's data platform team. This specialized endpoint provides pre-optimized access to spend data specifically designed for analytical workloads, offloading computational burden from the primary transactional APIs.

## MCP Tool Design

The final tool architecture exposes three categories of functionality to the LLM. First, several "load" tools (like `load_transactions`) pull specific types of data from the Ramp API. Second, a `process_data` tool transforms API responses and loads them into SQLite tables—though the authors acknowledge this could be eliminated to reduce roundtrips. Third, an `execute_query` tool allows Claude to run arbitrary SQL queries against the in-memory database directly.

This design enables Claude to orchestrate its own data access patterns. It can load as little or as much data as needed for a specific question, run aggregate or window functions to understand patterns, and iteratively refine queries based on intermediate results. The SQL interface effectively delegates computational work to the database engine where it belongs, while the LLM focuses on understanding user intent and constructing appropriate queries.

## Performance Outcomes and Limitations

The SQL-based architecture delivered dramatic scalability improvements. Claude went from struggling with a few hundred data points to accurately analyzing tens of thousands of spend events. The reduced token usage not only improved performance but also made the solution economically viable for broader deployment. However, new bottlenecks emerged—API latency for extracting data from Ramp's services became the primary constraint as tool calls began timing out under heavy load.

The authors candidly acknowledge several limitations in the current implementation. Reliability remains occasionally problematic—the LLM sometimes selects incorrect tools or uses them incorrectly even when given identical prompts across separate conversations. API latency becomes prohibitive for very large businesses with substantial data volumes. Numerous optimization opportunities remain unexplored, including concurrent API requests, asynchronous data fetching, smart caching strategies, and potentially migrating from SQLite to DuckDB for better analytical performance.

## Production Readiness Considerations

The case study demonstrates realistic thinking about production deployment challenges. The authors emphasize that building truly reliable agentic AI requires "a great deal of complex technical work beyond what MCP currently offers." Write operations present particular reliability concerns—the team explicitly states they need to develop a comprehensive safety framework before releasing tools that can perform actions on behalf of users as an agentic LLM.

Security considerations receive appropriate attention. The authors recognize that MCP and similar technologies introduce information security risks when LLMs can access and understand large volumes of sensitive data. Their mitigations include implementing audit logging for all API access, supporting OAuth with granular scope selection, and allowing administrators to constrain which tools are available to the MCP client. They emphasize the principle of least privilege—providing only the minimum necessary access for each use case.

The audit logging implementation appears thoughtful, tracking API access patterns that would enable security teams to identify anomalous behavior or unauthorized data access. The OAuth integration with selective scope availability provides defense-in-depth by limiting the blast radius of potential compromises or LLM misbehavior.

## LLM Capabilities Assessment

An interesting observation from the case study is the assertion that "LLMs are significantly better at SQL than at math." This finding aligns with broader industry observations about LLM capabilities—they excel at pattern matching and generating structured code but struggle with precise numerical computation. The team's architectural pivot from asking Claude to perform calculations directly to having it generate SQL queries that databases execute represents sound engineering practice: using each component for its strengths.

The SQL interface also provides better observability and debuggability. When Claude generates a SQL query, that query is visible, inspectable, and can be logged or modified if necessary. In contrast, when Claude performs calculations internally, the intermediate steps are opaque and difficult to verify or debug. This transparency benefit extends beyond development into production operations where understanding why a system produced a particular answer becomes critical.

## Prompt Engineering and Tool Selection

The case study touches on but doesn't deeply explore prompt engineering challenges. The authors note that "prompt engineering may alleviate some of" the reliability issues around incorrect tool selection or usage, but they observe that Claude still occasionally makes mistakes even with identical prompts. This suggests that current prompt engineering techniques provide incomplete solutions to reliability challenges in agentic systems.

The non-deterministic nature of LLM behavior—producing different results from identical prompts—represents a fundamental challenge for production systems that expect consistent behavior. Traditional software engineering practices assume deterministic computation where identical inputs produce identical outputs. LLM-based systems violate this assumption, requiring new approaches to testing, validation, and quality assurance.

## Open Source Strategy and Ecosystem

Ramp released their MCP server as open source at github.com/ramp-public/ramp-mcp, contributing to the growing MCP ecosystem. The case study positions this work within a broader community of engineers building MCP servers for various data sources and applications. The authors encourage adoption, suggesting developers should "give it a try" and warning potential holdouts to "miss out at your own peril"—marketing language that should be taken with appropriate skepticism.

The open-source release strategy provides several benefits beyond altruism. It positions Ramp as a thought leader in the LLM tooling space, potentially attracts engineering talent interested in cutting-edge AI applications, and creates opportunities for community contributions that improve the codebase. It also allows potential customers to evaluate Ramp's technical capabilities before committing to their platform.

## Critical Assessment

The case study presents an honest, technically grounded exploration of building with MCP and LLMs. The authors acknowledge limitations forthrightly rather than overselling capabilities—a refreshing contrast to much AI hype. Their iterative development approach, particularly the willingness to ask Claude what data format it preferred and act on that feedback, demonstrates pragmatic engineering.

However, some claims deserve scrutiny. The characterization of results as "mind-blowing" when asking for spend overviews represents marketing hyperbole rather than technical assessment. The actual capabilities demonstrated—generating spend reports and identifying patterns—while useful, are evolutionary improvements over existing business intelligence tools rather than revolutionary breakthroughs.

The reliability concerns the authors acknowledge are significant. Non-deterministic tool selection, occasional miscalculations, and sensitivity to prompt variations make this system poorly suited for autonomous operation without human oversight. The current state appears more appropriate for interactive analytical sessions where users can verify results than for automated reporting or decision-making workflows.

The security mitigations, while better than nothing, may prove insufficient for highly regulated environments. Audit logging provides accountability after the fact but doesn't prevent unauthorized access in real-time. OAuth scoping helps but depends on correctly configuring scopes for each use case—a complex governance challenge in organizations with diverse access requirements.

## LLMOps Implications

From an LLMOps perspective, this case study illustrates several important patterns and challenges. The architecture demonstrates tool-based LLM integration where the LLM orchestrates calls to specialized functions rather than attempting to handle all functionality internally. This separation of concerns—LLM for understanding and orchestration, traditional code for computation and data access—represents a mature approach to LLM system design.

The evolution from direct API access to SQL-mediated access highlights the importance of interface design when building LLM applications. The interface an LLM interacts with dramatically affects capability, scalability, and cost. Finding the right abstraction level—not too high-level that flexibility is lost, not too low-level that the LLM drowns in details—requires experimentation and iteration.

The case study also illustrates the tension between flexibility and reliability in agentic systems. Giving Claude broad access to query arbitrary data provides tremendous flexibility but introduces reliability challenges. More constrained systems with narrower capabilities might achieve higher reliability at the cost of reduced flexibility—a tradeoff that different use cases will resolve differently.

Token economics emerge as a critical operational consideration. The initial architecture's high token usage made it economically impractical even before scalability limits were reached. The SQL pivot addressed both scalability and cost simultaneously—a reminder that LLMOps must consider operational costs as a first-class constraint rather than an afterthought.

The audit logging and security considerations demonstrate the additional operational requirements LLM systems introduce. Traditional applications access data through deterministic code paths that can be audited through code review. LLM-based systems generate dynamic data access patterns that require runtime monitoring and logging to maintain security and compliance.

## Future Directions

The authors identify several optimization opportunities including concurrent requests, asynchronous data fetching, smart caching, and potentially migrating to DuckDB. These represent standard database performance optimizations applied to an LLM context. The larger question is whether these optimizations can achieve the reliability and performance required for production-grade autonomous operation or whether the fundamental approach needs additional architectural evolution.

The planned safety framework for write operations will be particularly interesting. Allowing LLMs to modify data or trigger business actions raises the stakes dramatically beyond read-only analytical use cases. Effective safety frameworks will likely need to include human-in-the-loop approval for sensitive operations, dry-run modes that preview changes before execution, and sophisticated validation logic that prevents obviously incorrect operations.

The MCP ecosystem itself is "early" as the authors acknowledge, with many limitations to overcome. As the standard matures and more MCP servers and clients become available, integration patterns and best practices will emerge. Ramp's early experimentation positions them to influence these emerging patterns while learning what works in production contexts.
