---
title: "Building Production-Ready SQL and Charting Agents with RAG Integration"
slug: "building-production-ready-sql-and-charting-agents-with-rag-integration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "674f218058fb62e1ced88bf7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:46:17.417Z"
  createdOn: "2024-12-03T15:19:28.940Z"
llmopsTags:
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "visualization"
  - "structured-output"
  - "rag"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "system-prompts"
  - "postgresql"
  - "fastapi"
  - "langchain"
  - "elasticsearch"
  - "redis"
  - "openai"
industryTags: "tech"
company: "Numbers Station"
summary: "Numbers Station addresses the challenge of overwhelming data team requests in enterprises by developing an AI-powered self-service analytics platform. Their solution combines LLM agents with RAG and a comprehensive knowledge layer to enable accurate SQL query generation, chart creation, and multi-agent workflows. The platform demonstrated significant improvements in real-world benchmarks compared to vanilla LLM approaches, reducing setup time from weeks to hours while maintaining high accuracy through contextual knowledge integration."
link: "https://www.youtube.com/watch?v=tYgoXQPHtlw"
seo:
  title: "Numbers Station: Building Production-Ready SQL and Charting Agents with RAG Integration - ZenML LLMOps Database"
  description: "Numbers Station addresses the challenge of overwhelming data team requests in enterprises by developing an AI-powered self-service analytics platform. Their solution combines LLM agents with RAG and a comprehensive knowledge layer to enable accurate SQL query generation, chart creation, and multi-agent workflows. The platform demonstrated significant improvements in real-world benchmarks compared to vanilla LLM approaches, reducing setup time from weeks to hours while maintaining high accuracy through contextual knowledge integration."
  canonical: "https://www.zenml.io/llmops-database/building-production-ready-sql-and-charting-agents-with-rag-integration"
  ogTitle: "Numbers Station: Building Production-Ready SQL and Charting Agents with RAG Integration - ZenML LLMOps Database"
  ogDescription: "Numbers Station addresses the challenge of overwhelming data team requests in enterprises by developing an AI-powered self-service analytics platform. Their solution combines LLM agents with RAG and a comprehensive knowledge layer to enable accurate SQL query generation, chart creation, and multi-agent workflows. The platform demonstrated significant improvements in real-world benchmarks compared to vanilla LLM approaches, reducing setup time from weeks to hours while maintaining high accuracy through contextual knowledge integration."
---

## Overview

Numbers Station is a company founded by Stanford PhD graduates, including co-founder and chief scientist Ines, who previously worked on representation learning for structured data and knowledge graph embeddings under Chris Ré. The company's mission is to bring AI to structured data, specifically focusing on the "last mile" problem of deploying LLMs in production for enterprise analytics use cases.

The core problem they address is self-service analytics in enterprises. Over the past decade, companies have invested heavily in modern data stacks (ETL pipelines, improved storage and compute), but this has created complexity that overwhelms data teams with support requests from data consumers. These requests include finding dashboards, understanding field definitions, and writing SQL queries—leaving data teams stuck in support functions rather than strategic data projects.

A key insight from the presentation is that the rise of LLMs has actually exacerbated this problem. End users have seen impressive demos of LLMs writing SQL and generating charts, raising expectations significantly. However, very few of these "magical demos" have made it into production, creating a gap between user expectations and reality. Numbers Station positions itself as solving this production deployment challenge.

## Technical Architecture

### The Knowledge Layer

The foundation of Numbers Station's approach is what they call the "unified knowledge layer." This is arguably the most critical component of their production system, as it enables accurate, business-contextualized responses. The knowledge layer is built by:

- Connecting to tools in the modern data stack (data warehouses, dashboarding tools, data catalogs)
- Ingesting unstructured knowledge sources (Slack channels, message history)
- Automatically extracting and organizing metadata including tables, columns, metrics, and dimension definitions

The speaker emphasizes that building this knowledge layer involves significant "data wrangling work" that isn't "fancy AI work" but is essential for production accuracy. For example, a metric definition like "active customers" might have a specific business rule (e.g., filtering where "closed is not zero") that an LLM cannot guess without context.

### RAG Implementation

The knowledge layer is accessed through Retrieval Augmented Generation (RAG). The speaker explains that feeding all organizational context into prompts is impractical due to context window limitations and the sheer volume of enterprise data. Instead, they:

- Store knowledge in indexes (text-based or embedding-based)
- Run similarity searches when users ask questions
- Retrieve top-K relevant results
- Include these results in the prompt to ground model responses

This approach allows the SQL agent to use business-specific definitions rather than making up calculations, which was identified as a key accuracy problem with vanilla LLM approaches.

### Evolution from Prompting to Agentic Systems

The presentation walks through the evolution of their approach, which is instructive for understanding production LLM deployment:

**Stage 1: Basic Prompting** - Starting with few-shot or zero-shot prompting, sending natural language questions and schema to an LLM API. This approach requires users to copy-paste generated SQL into their own executor, providing no automation.

**Stage 2: Manual Control Flow with Tools** - Adding execution tools in a pipeline where the model generates SQL and then executes it against the data warehouse. However, this "manual control flow" is brittle—if a query fails to compile, the system gets stuck unless extensive edge cases are coded.

**Stage 3: Agentic Systems** - The key shift is making the control flow non-deterministic and LLM-directed. Using tool calling, the LLM decides what actions to take next. If a query fails, the agent can read the error message, correct the query, and retry. This self-correction capability is crucial for production reliability.

### Agent Implementation Details

The speaker provides a simplified implementation outline for their SQL agent:

- **Prompt**: Sets the LLM's role and responsibilities (e.g., "write and execute SQL queries to answer questions")
- **Tool Registration**: Registering available tools like SQL execution and RAG search
- **Decision Component**: The LLM determines when to stop based on whether it generated a tool call or a final response—there's no hardcoded logic telling it to stop

The agentic design means the sequence of operations is determined by the LLM at runtime, providing flexibility to handle diverse user requests and error conditions.

### Multi-Agent Architecture

For handling diverse request types (SQL queries, chart generation, dashboard search, email search), Numbers Station implements a hierarchical multi-agent system. Key architectural decisions include:

- A **planner agent** at the top that decomposes user tasks into subtasks and routes to specialized agents
- **Specialized sub-agents** for different capabilities (SQL agent, charting agent, report search agent, messaging agent)
- **Shared conversation history** across agents, enabling seamless handoffs (e.g., SQL agent writes a query, charting agent visualizes the results)
- The user only interacts with the planner, but gains access to all sub-agent capabilities

The speaker notes they've considered scalability—with a dozen agents, the hierarchical approach works well, but with 50+ agents, they'd need multiple hierarchy levels to reduce routing complexity.

## Production Considerations

### Permissioning and Governance

A critical production concern raised in Q&A is data access control. Numbers Station's approach is pragmatic: they don't rebuild access control internally but instead respect the governance already in place in source systems. When a user authenticates, their permissions flow through to what data and tools they can access.

### Bridging the Expectation Gap

The speaker acknowledges the disconnect between user expectations (shaped by impressive demos) and production reality. Their solution is the knowledge layer—grounding responses in verified business logic. Importantly, they've built the system to express uncertainty, saying "I don't know" rather than providing potentially incorrect answers. This confidence calibration is essential for non-technical end users who can't verify SQL correctness themselves.

### Setup and Training

The onboarding process has evolved significantly. A year prior, setup required weeks of manual customer work. They've reduced this to approximately three hours of admin training where users provide feedback that gets injected back into the system. The long-term goal is full automation of this setup process. The feedback loop helps tune the system to how specific organizations phrase questions and use terminology.

### Performance Optimizations

The speaker mentions building their own agent framework with optimizations for routing—if a routing decision doesn't require a model call, they skip it. This reduces latency and cost, addressing scalability concerns raised about multi-agent systems where complexity can drive up costs even as per-token prices decrease.

### Accuracy Results

The presentation claims "huge improvements" on real customer benchmarks compared to vanilla prompting approaches. The speaker emphasizes that real-world SQL benchmarks are more challenging than public academic benchmarks, and the combination of the knowledge layer (for context) and agentic retry mechanisms (for error correction) drives these improvements.

## Customer Example

Vouch, an insurtech company, is mentioned as a customer example. They experienced rapid business growth that overwhelmed their data team with requests. Numbers Station helped them implement self-service analytics through a chat interface, allowing end users to get answers without burdening the data team.

## Critical Assessment

While the presentation provides valuable technical depth, several aspects warrant balanced consideration:

- The claimed accuracy improvements are not quantified with specific metrics
- The "couple of hours" setup time still requires human involvement, suggesting the system isn't fully automated for enterprise deployment
- The hierarchical agent architecture's scalability beyond ~15 agents is acknowledged as uncertain
- The approach is demonstrated for analytics-focused use cases; generalization to other domains isn't addressed

Nevertheless, the technical approach demonstrates mature thinking about production LLM deployment, particularly around grounding responses in organizational knowledge, handling errors gracefully through agentic retry loops, and respecting existing enterprise governance structures rather than rebuilding them.