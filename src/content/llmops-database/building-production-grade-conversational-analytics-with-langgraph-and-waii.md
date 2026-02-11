---
title: "Building Production-Grade Conversational Analytics with LangGraph and Waii"
slug: "building-production-grade-conversational-analytics-with-langgraph-and-waii"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f414ba0bdd6540ca56eb4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:34:26.128Z"
  createdOn: "2024-11-21T14:18:51.907Z"
llmopsTags:
  - "data-analysis"
  - "multi-agent-systems"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "semantic-search"
  - "visualization"
industryTags: "tech"
company: "Waii"
summary: "The case study demonstrates how to build production-ready conversational analytics applications by integrating LangGraph's multi-agent framework with Waii's advanced text-to-SQL capabilities. The solution tackles complex database operations through sophisticated join handling, knowledge graph construction, and agentic flows, enabling natural language interactions with complex data structures while maintaining high accuracy and scalability."
link: "https://blog.waii.ai/complex-sql-joins-with-langgraph-and-waii-9e3b093b2942"
year: 2024
seo:
  title: "Waii: Building Production-Grade Conversational Analytics with LangGraph and Waii - ZenML LLMOps Database"
  description: "The case study demonstrates how to build production-ready conversational analytics applications by integrating LangGraph's multi-agent framework with Waii's advanced text-to-SQL capabilities. The solution tackles complex database operations through sophisticated join handling, knowledge graph construction, and agentic flows, enabling natural language interactions with complex data structures while maintaining high accuracy and scalability."
  canonical: "https://www.zenml.io/llmops-database/building-production-grade-conversational-analytics-with-langgraph-and-waii"
  ogTitle: "Waii: Building Production-Grade Conversational Analytics with LangGraph and Waii - ZenML LLMOps Database"
  ogDescription: "The case study demonstrates how to build production-ready conversational analytics applications by integrating LangGraph's multi-agent framework with Waii's advanced text-to-SQL capabilities. The solution tackles complex database operations through sophisticated join handling, knowledge graph construction, and agentic flows, enabling natural language interactions with complex data structures while maintaining high accuracy and scalability."
---

## Overview

This case study presents Waii's approach to building conversational analytics applications by combining their text-to-SQL capabilities with LangGraph, a framework for building stateful multi-agent applications. The article, published in October 2024, serves both as a technical deep-dive into handling complex SQL joins and as a demonstration of how to integrate Waii's API into production LLM applications. It's worth noting that this content originates from Waii's own blog, so the claims about accuracy and capabilities should be viewed with appropriate skepticism as they represent vendor marketing material rather than independent validation.

The core problem addressed is the difficulty of translating natural language queries into accurate SQL, particularly when dealing with complex database schemas that require sophisticated join operations. Many text-to-SQL solutions struggle with multi-table joins, and this case study claims to demonstrate Waii's differentiated approach to solving this challenge.

## Technical Architecture

The solution architecture combines two main components: Waii's text-to-SQL engine and LangGraph's orchestration framework. The LangGraph application is structured as a state machine with multiple nodes handling different aspects of the conversational analytics workflow.

The workflow consists of several key nodes:

- **Question Classifier**: Uses an LLM (OpenAI's ChatGPT) to determine whether a user's question relates to database information, visualization needs, or general queries. This node retrieves database catalog information from Waii and uses it as context for classification.

- **SQL Generator**: Calls Waii's Query.generate API to translate natural language into SQL. This is where the complex join handling occurs.

- **SQL Executor**: Executes the generated SQL against the database through Waii's Query.run API, which also injects security constraints before execution.

- **Result Classifier**: Another LLM-based classifier that determines whether results should be presented as data or visualizations.

- **Chart Generator**: Uses Waii's Chart.generate_chart API to create visualizations from query results.

- **Insight Generator**: A fallback path using OpenAI directly for general questions not requiring database access.

- **Result Synthesizer**: Combines all outputs into a coherent response for the user.

The state management is handled through a Pydantic BaseModel that tracks the database description, query, generated SQL, data results, chart specifications, insights, responses, errors, and path decisions across the workflow.

## Complex Join Handling

The article's primary technical contribution is explaining Waii's approach to handling complex database joins. The example query provided is notably sophisticated, spanning 14 tables with various join types and semantics. The example creates a director performance dashboard combining data from movies, TV series, genres, keywords, awards, and actor collaborations.

Key join capabilities demonstrated include:

- **Bridge Table Joins**: Handling many-to-many relationships through intermediate tables (e.g., movies_directors_bridge, tv_series_actors_bridge)
- **Dimension Table Joins**: Enriching data with descriptive information from lookup tables
- **Complex Join Chains**: Connecting distant entities through multiple intermediate tables
- **Full Outer Joins**: Combining data sources where records may not exist in both
- **Left Joins for Optional Data**: Including data that might not exist for all entities

The generated SQL uses Common Table Expressions (CTEs) extensively, with named subqueries like director_movie_count, director_tv_count, combined_counts, ranked_directors, and various aggregation CTEs. This demonstrates that the system generates production-quality SQL rather than simple single-table queries.

## Knowledge Graph Construction

A key differentiator claimed by Waii is their automatic construction of a knowledge graph representing database relationships. This graph incorporates multiple data sources:

- Schema information and constraints (primary keys, foreign keys)
- Predictions based on analyzing column names and data patterns
- Join graphs extracted and ranked from query history
- Database documentation
- Relationships defined in data catalogs
- Feedback from system usage over time

The knowledge graph is described as continuously updated and refined with schema changes, new queries, and user feedback. This represents a form of continuous learning that could improve text-to-SQL accuracy over time, though no quantitative evidence is provided in the article.

## Agentic Flows for Query Construction

Waii employs a sequence of specialized "agentic flows" for query construction:

- **Table Selection**: Analyzing the user's request to identify relevant tables, using semantic understanding and knowledge of common join relationships to find tables that might not be directly mentioned in the user's input.

- **Join Graph Analysis**: Proposing and evaluating potential join paths between selected tables, scoring alignment with previously seen joins and semantic understanding of relationships.

- **Join Condition Evaluation/Refinement**: A separate check ensuring outer joins and join conditions are correctly applied, including proper handling of "on" vs "where" clause conditions.

- **Query Construction**: Building the SQL query based on the chosen join graph and conditions.

- **Compilation and Optimization**: Ensuring syntactic correctness, performance optimization, and enforcement of operational constraints (e.g., max output rows, max input partitions).

## Production Considerations

The implementation includes several production-relevant features. Security constraints are enforced at the execution layer, with code injection to limit row/column access based on user-level policies. The workflow includes error handling with a loop that can rewrite input and regenerate required objects on exceptions. State is maintained across interactions to allow follow-up questions and iterative analysis.

The code sample provided uses environment variables for configuration (WAII_URL, WAII_API_KEY, DB_CONNECTION), following standard practices for secrets management. The application maintains a continuous loop for interactive use, with exception handling that restarts the workflow on errors.

## Critical Assessment

While the technical architecture presented is sound and the example query is genuinely impressive in its complexity, several caveats apply. The article provides no quantitative benchmarks comparing Waii's accuracy to other text-to-SQL solutions. Claims about "high-accuracy joins" and "scalable table selection for large databases" are not substantiated with metrics. The knowledge graph construction process, while interesting conceptually, lacks detail on how predictions are made or how feedback is incorporated.

The example focuses on a single successful case rather than discussing failure modes, edge cases, or the types of queries where the system might struggle. The claim that users without specialized technical skills can perform complex data analysis should be viewed cautiously, as even correct SQL results require domain knowledge to interpret meaningfully.

The integration with LangGraph is relatively straightforward, primarily using Waii as an API service rather than demonstrating deep integration with LangGraph's more advanced features like checkpointing, human-in-the-loop workflows, or parallel execution.

## Potential Use Cases

The article identifies several industry applications including business intelligence for executives, healthcare research database exploration, financial market analysis, e-commerce customer behavior analysis, and educational administration insights. These represent reasonable applications of conversational analytics, though actual implementations would require significant additional work beyond what's shown in the code sample.

## Conclusion

This case study demonstrates a practical approach to building production conversational analytics applications using LLMs and specialized text-to-SQL services. The combination of LangGraph for workflow orchestration and Waii for SQL generation represents a sensible architectural pattern. However, teams considering similar implementations should conduct their own evaluations of text-to-SQL accuracy, particularly for their specific database schemas and query patterns, rather than relying solely on vendor claims.