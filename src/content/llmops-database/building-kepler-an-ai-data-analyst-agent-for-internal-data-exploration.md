---
title: "Building Kepler: An AI Data Analyst Agent for Internal Data Exploration"
slug: "building-kepler-an-ai-data-analyst-agent-for-internal-data-exploration"
draft: false
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "code-interpretation"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "agent-based"
  - "memory"
  - "evals"
  - "mcp"
  - "langchain"
  - "databases"
  - "cache"
  - "security"
  - "compliance"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI built Kepler, an internal AI-powered data analyst agent, to solve the problem of answering data questions across 600+ petabytes of data and 70,000 datasets. The agent uses LLMs with Model Context Protocol (MCP), automated code crawling, RAG-based retrieval, and semantic memory to provide contextualized answers to natural language queries. Kepler successfully handles table discovery, SQL generation, data analysis, and anomaly debugging, achieving high user satisfaction and adoption across 80% of the company, with users praising it as one of the most useful internal tools and describing it as \"the closest thing to AGI\" they've used."
link: "https://www.infoq.com/presentations/data-aware-ai-agents/"
year: 2026
seo:
  title: "OpenAI: Building Kepler: An AI Data Analyst Agent for Internal Data Exploration - ZenML LLMOps Database"
  description: "OpenAI built Kepler, an internal AI-powered data analyst agent, to solve the problem of answering data questions across 600+ petabytes of data and 70,000 datasets. The agent uses LLMs with Model Context Protocol (MCP), automated code crawling, RAG-based retrieval, and semantic memory to provide contextualized answers to natural language queries. Kepler successfully handles table discovery, SQL generation, data analysis, and anomaly debugging, achieving high user satisfaction and adoption across 80% of the company, with users praising it as one of the most useful internal tools and describing it as \"the closest thing to AGI\" they've used."
  canonical: "https://www.zenml.io/llmops-database/building-kepler-an-ai-data-analyst-agent-for-internal-data-exploration"
  ogTitle: "OpenAI: Building Kepler: An AI Data Analyst Agent for Internal Data Exploration - ZenML LLMOps Database"
  ogDescription: "OpenAI built Kepler, an internal AI-powered data analyst agent, to solve the problem of answering data questions across 600+ petabytes of data and 70,000 datasets. The agent uses LLMs with Model Context Protocol (MCP), automated code crawling, RAG-based retrieval, and semantic memory to provide contextualized answers to natural language queries. Kepler successfully handles table discovery, SQL generation, data analysis, and anomaly debugging, achieving high user satisfaction and adoption across 80% of the company, with users praising it as one of the most useful internal tools and describing it as \"the closest thing to AGI\" they've used."
notion:
  pageId: "389f8dff-2538-801b-ae3f-f40822fd73e3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-24T13:56:00.000Z"
  lastEditedTime: "2026-06-24T13:56:00.000Z"
  publishedAt: "2026-06-29T15:16:06Z"
---

## Overview

OpenAI developed Kepler, an internal AI data analyst agent, to address the challenge of making sense of massive amounts of data at scale. The company processes over 600 petabytes of data daily across approximately 70,000 datasets using 15 different data platform tools, with 80% of the company directly accessing the data platform. The fundamental problem was that simple data questions like "how many ChatGPT pro users do we have in Italy?" required extensive manual effort, involving consultations with multiple data scientists, engineers, code reviews, meetings, and Slack threads. As products evolved with more regions, plans, and features, questions became exponentially harder to answer despite fundamentally seeking similar information.

The core challenges included table discovery at scale (finding the right table among thousands of similarly named options), understanding nuanced differences between tables (encrypted vs. unencrypted IDs, fraud-adjusted columns, pre-filtered data), and writing complex SQL queries that could span 160+ lines. Missing a single nuance could lead to answers that were wrong by an order of magnitude, with potentially catastrophic business implications.

## Architecture and System Design

Kepler operates as a comprehensive service that leverages LLMs to produce AI-powered results across multiple interfaces. The system supports Slack agents for conversational queries, IDE integration through Cursor with MCP server connections, a web-based agent interface, and MCP platform connections for various workloads. The architecture consists of three main components: entry points (UI, Slack, local/remote MCP), preprocessed offline information (knowledgebases), and synchronous API calls to data warehouses and other data platform sources like Spark and Airflow.

The agent uses Model Context Protocol extensively, providing Kepler with a comprehensive toolbox that allows it to iteratively explore data, run queries, examine results, and adjust its approach based on feedback. This enables the agent to perform multi-step reasoning chains, such as searching for initial table information, checking schemas, running exploratory queries, adjusting thresholds when results aren't satisfactory, and repeating steps until arriving at the correct answer. The MCP framework proved essential because it allows the agent to recover from mistakes, such as selecting incorrect join keys, by going back and repeating steps with better information.

## Context Management Strategy

One of the most critical aspects of Kepler's success is its sophisticated approach to providing rich context to the LLM. The team recognized early that fitting all 70,000 tables with their schemas and query history into a model's context window was impossible, requiring extensive preprocessing and intelligent retrieval strategies.

For table metadata context, the system ingests table schema information (columns and types), query history, and lineage data. All of this gets embedded using the OpenAI embedding API and stored for live retrieval via both specific table search and semantic search when the agent answers questions. However, the team discovered that schemas alone were insufficient to understand the semantics and relationships between data, which is why query history and lineage became critical additions.

The breakthrough approach involved autogenerating rich descriptions through offline jobs that go beyond what exists in the data catalog. Daily parallel Codex tasks crawl the codebase to understand each table's purpose, downstream usage patterns, exact grain and primary keys, data freshness, and when to use alternative tables. This code crawling provides crucial context like understanding that a table contains only first-party ChatGPT traffic (not third-party) and is enriched by safety signals, or that certain fields might be null due to missing upstream signals. This prevents the model from making costly mistakes and enables it to distinguish between similar tables with important semantic differences.

The system also maintains lineage information extracted during the code crawling process, providing richer context than human-written documentation would typically contain. Since this is all refreshed periodically by offline jobs, the context stays fresh without manual maintenance burden.

## Company Knowledge Integration

Beyond table metadata, Kepler integrates broader company context through an internal knowledge service that ingests Slack threads, Notion docs, and Google Drive documents. These documents are stored in blob storage with metadata tracking content and source, then broken down into chunks and embedded using the OpenAI embedding API. A retrieval service performs RAG search with permissions checking and caching for efficient retrieval.

This company context proves invaluable for providing the "why" behind the "what" in data analysis. For instance, if there's a dip in weekly active users, the agent might find a Slack thread referencing an incident or outage, providing much richer analysis and understanding of the problem. The permissions checking ensures that users only see information they're authorized to access, maintaining security while providing comprehensive context.

## Memory Systems for Continuous Learning

Kepler implements a sophisticated memory system that enables the agent to continuously learn and improve through corrections and learnings. Memory is ingested similarly to table knowledge, with corrections submitted either manually by users or automatically by the agent, then embedded and retrieved at runtime when relevant. This addresses the gap where context alone might get 80-90% of the way to the right answer, but specific corrections are needed for nuanced cases that are hard to infer.

The memory system operates at three distinct scopes. User-level memories allow for individual customizations and protect potentially private information. Channel-level memories enable team-scoped learnings that benefit specific groups. Global memories capture general fixes that benefit everyone across the company. For example, if a feature rollout uses a particular string for stats and gates, that's a memory that helps find the right result but would be nearly impossible to infer from context alone.

The team is actively rolling out memory suggestions where Kepler can prompt to generate a memory that users can confirm and insert into the appropriate scope. Future plans include compacting memories when users generate duplicates, pruning memories that are accidental or not reusable through offline jobs, and enabling memory editing and resyncing through the UI. Users can actively contribute by editing memories, making the system increasingly collaborative and effective over time.

## Query Generation and Interactive Exploration

Kepler's query generation capabilities demonstrate sophisticated multi-step reasoning. When answering a question about New York taxi trips to find pickup-dropoff ZIP pairs with the most unreliability (biggest spread between typical and worst-case duration), the agent performs internal knowledge search, retrieves table schemas, writes exploratory queries with bucketing and percentile calculations, adjusts thresholds when results don't match expectations, runs additional queries with sorting and filtering, and iterates until arriving at the correct analysis with proper time zone handling and statistical measures.

The agent can also handle follow-up questions efficiently by maintaining context from previous responses. If a user asks a follow-up about specific pickup trends on a particular date, Kepler doesn't need to repeat the initial knowledge search because it already has context about the right table to use. This dramatically improves efficiency and user experience.

For debugging anomalies, Kepler demonstrates even more sophisticated reasoning. When investigating a spike in ChatGPT weekly active users, the agent identifies the right table to check the spike, references dashboards and Notion documents to confirm table correctness, runs queries slicing data by different dimensions (plan type, region) to identify what motivated the spike, generates and tests hypotheses (like duplication issues from over-logging), performs web searches to check timeline information from release notes and TechCrunch articles, and arrives at the conclusion that ImageGen launch caused the trend.

## Evaluation Infrastructure

The team implemented a comprehensive evaluation framework based on the principle that "evals are surprisingly often all you need." Evals consist of question-answer pairs where questions represent important metrics to get right, and expected SQL statements serve as manually curated correct answers. The system hits the agent query generation endpoint to produce generated SQL from natural language, runs both generated and expected queries, and feeds all results (generated query, generated results, expected SQL, expected results) into an OpenAI evals grader that performs model-based grading.

A key insight was that exact SQL text equality is not a good measure of whether an eval passed. The same date filter can be written multiple ways with identical meaning, so the team normalizes queries by converting everything into Abstract Syntax Tree (AST) representations. This helps overcome minor SQL syntax differences that don't affect semantics. When comparing result sets, the system allows wiggle room for differences that don't meaningfully impact the answer, such as float versus int distinctions that sometimes matter for precision but often don't.

The LLM-based reasoning for grading proves particularly valuable because it handles nuanced cases much better than rule-based systems. The grader provides informative responses explaining why results match or differ, and the exposure of chain-of-thought reasoning in evals helps with debugging failures. In one case, an eval was failing because the agent preferred a curated table over a raw table, and examining the chain of thought revealed it was because the agent thought the question was dashboarding-focused rather than raw data analysis.

## Security and Access Control

Data security receives serious attention throughout Kepler's design. The agent does not provide any extra authorization beyond what users already have, instead passing through authentication so that Kepler won't grant access to tables a user can't normally access. When users lack access, Kepler helpfully indicates which access group to join or suggests similar tables they do have access to.

For data security, users should only access data they have legitimate purposes to use. When ingesting internal knowledge, the system ingests pre-sanitized queries to prevent important IDs from accidentally leaking. For Slack agents where audiences are broader, the system redacts sensitive outputs by intercepting results and passing them to an internal anonymization service that detects PII.

However, reasonable use cases exist for seeing raw results, so the system links to an external UI where users with proper table permissions (meaning they could have run the queries themselves anyway) can view unredacted data after permissions checks. This applies to all artifacts the agent generates, maintaining security while enabling legitimate use cases.

## User Experience and Interface Design

Kepler streams its chain-of-thought as it answers questions, which serves as both an audit trail and helps users understand the assumptions that went into answers. This transparency builds trust and allows users to interrupt the agent if they see it veering off track, providing feedback that Kepler incorporates to produce different results. When Kepler runs queries that result in data, it links to those queries and provides reference IDs for accessing raw results.

The system supports multiple interaction modes including Slack-based conversational interfaces, web UI for more structured interactions, and IDE integration for developers. Meeting users where they are proved critical to success. OpenAI is a Slack-heavy company where people post analytics updates and ask data questions frequently, so starting with the Slack interface drove initial adoption by getting people to ping Kepler instead of posting general questions.

Kepler operates 24/7 without making users feel bad about asking questions at any hour. The agent maintains full context across follow-up conversations in threads, eliminating the need for users to repeat themselves. Users can also leverage workflows, which are custom shareable instructions for commonly repeatable processes like feature product analysis or data validation between dev and prod tables.

## Key Technical Learnings

The team learned several crucial lessons during development. Initially they assumed all questions were metrics questions requiring SQL generation and result reporting. User feedback revealed many questions can be answered purely by company context, documentation, or table information like access groups. This led to reworking the backend to handle these cases without running unnecessary noop queries like SELECT 1 or performing irrelevant table searches.

Providing too much information to the model, especially overlapping information, caused confusion. With many similar tool calls (some using service auth, others using user auth), the model struggled with subtle nuances. The team ratcheted down available tool calls for easier tool discovery. Counter-intuitively, overly specific instructions in prompts actually hurt results because of the diverse types of questions users ask. While similar general paths exist, there are many logical branches, and being overly prescriptive prevented the model from adapting to specific question types. The team changed prompting to be more general, providing rough direction while leaving GPT-5's reasoning to determine the exact path based on available context.

The quick feedback loop with users proved essential to initial success. Partnering with key teams, getting immediate feedback, and rapidly iterating based on that feedback enabled the team to discover and address issues that wouldn't have been apparent from internal testing alone.

## Results and User Adoption

Kepler achieved significant internal success with strong user adoption and satisfaction. Users describe Kepler as "the most useful bot" at the company, with some stating that writing SQL queries by hand is "a total waste of time" compared to using Kepler. The agent excels at sanity checking data and validating assumptions about datasets. One user's favorite quote described Kepler as "the closest thing to AGI" they've used, highlighting the perceived capability and usefulness of the system.

The agent has expanded from initial data scientist users who had the most context for validating correct answers, to users across go-to-market teams, finance and economics, API teams, and product teams working on Sora and ChatGPT. This broad adoption across 80% of the company demonstrates the versatility and value of the system beyond its initial target audience.

## Future Directions

The team plans to fine-tune a dedicated model specifically for Kepler use cases. They have accumulated extensive data on questions users ask and correct SQL that should be generated, which can be used to train a model that better handles SQL quirks and internal conventions. Building user trust remains a priority, so the team plans to add extra validation steps where Kepler can check itself the way a human would, such as comparing query results against numbers in dashboards to provide higher confidence in answer correctness.

The team continues to evolve memory management capabilities, including better visualization of existing memories, improved conflict resolution between memories at different scopes, and more sophisticated automated pruning of low-quality or redundant memories. The evaluation framework will continue to expand, potentially including memory-specific evals to ensure that inserted memories improve rather than degrade performance.

## LLMOps Maturity and Production Considerations

This case study demonstrates mature LLMOps practices across multiple dimensions. The extensive use of offline preprocessing to generate rich context through code crawling shows sophisticated thinking about how to overcome context window limitations while maintaining up-to-date information. The three-tier memory system with different scopes addresses the challenge of personalization versus shared learning in production AI systems.

The evaluation infrastructure using AST-based normalization and LLM grading represents a pragmatic approach to measuring quality in domains where exact matching is insufficient. The emphasis on chain-of-thought transparency, permission checking, PII redaction, and result linking demonstrates mature thinking about trust, security, and auditability in production AI systems.

The iterative development approach with tight user feedback loops, willingness to redesign based on real usage patterns rather than assumptions, and continuous refinement of prompting strategies and tool availability all exemplify effective LLMOps practices. The team's awareness of limitations (like the model getting confused with too much context or too-specific instructions) and willingness to adjust accordingly shows healthy operational maturity.
