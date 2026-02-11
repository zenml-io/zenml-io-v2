---
title: "Multi-Agent RAG System for Enterprise Data Discovery"
slug: "multi-agent-rag-system-for-enterprise-data-discovery"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "681b124db56e7923a4e8ff3d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:07:31.712Z"
  createdOn: "2025-05-07T07:57:01.677Z"
llmopsTags:
  - "data-analysis"
  - "data-integration"
  - "question-answering"
  - "structured-output"
  - "rag"
  - "multi-agent-systems"
  - "semantic-search"
  - "embeddings"
  - "prompt-engineering"
  - "fastapi"
  - "elasticsearch"
  - "databases"
  - "orchestration"
  - "microsoft-azure"
industryTags: "tech"
company: "Wix"
summary: "Wix developed an AI-powered data discovery system called Anna to address the challenges of finding relevant data across their data mesh architecture. The system combines multiple specialized AI agents with Retrieval-Augmented Generation (RAG) to translate natural language queries into structured data queries. Using semantic search with Vespa for vector storage and an innovative approach of matching business questions to business questions, they achieved 83% accuracy in data discovery, significantly improving data accessibility across the organization."
link: "https://www.wix.engineering/post/solving-data-discovery-at-scale-how-wix-uses-rag-and-multi-agent-systems-to-find-the-right-data-fas"
year: 2024
seo:
  title: "Wix: Multi-Agent RAG System for Enterprise Data Discovery - ZenML LLMOps Database"
  description: "Wix developed an AI-powered data discovery system called Anna to address the challenges of finding relevant data across their data mesh architecture. The system combines multiple specialized AI agents with Retrieval-Augmented Generation (RAG) to translate natural language queries into structured data queries. Using semantic search with Vespa for vector storage and an innovative approach of matching business questions to business questions, they achieved 83% accuracy in data discovery, significantly improving data accessibility across the organization."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-rag-system-for-enterprise-data-discovery"
  ogTitle: "Wix: Multi-Agent RAG System for Enterprise Data Discovery - ZenML LLMOps Database"
  ogDescription: "Wix developed an AI-powered data discovery system called Anna to address the challenges of finding relevant data across their data mesh architecture. The system combines multiple specialized AI agents with Retrieval-Augmented Generation (RAG) to translate natural language queries into structured data queries. Using semantic search with Vespa for vector storage and an innovative approach of matching business questions to business questions, they achieved 83% accuracy in data discovery, significantly improving data accessibility across the organization."
---

## Overview

Wix, a cloud-based web development platform serving over 200 million users worldwide, developed an AI-powered data discovery system called "Anna" to address the challenges of navigating their complex data mesh architecture. The case study illustrates how a multi-agent LLM system combined with Retrieval-Augmented Generation (RAG) can transform enterprise data accessibility, allowing non-technical users to query complex data structures using natural language.

The fundamental problem Wix faced stemmed from their adoption of a data mesh approach, where data ownership is distributed across multiple domains (Wix Stores, Customer Care, Wix Restaurants, etc.). Each domain operates semi-autonomously with its own developers, data teams, and governance standards. While this architecture enhances scalability and domain autonomy, it creates significant challenges for data discovery. Users struggled to navigate hundreds of tables with thousands of dimensions and metrics, often not knowing which domain held the relevant data they needed.

## Technical Architecture and Components

### Semantic Layer and Data Playground

Before implementing AI solutions, Wix developed "Data Playground" (DPG), a wizard-based data exploration tool built on their internal semantic layer. This semantic layer encodes relationships between data assets—tables, entities, and dimensions—enabling accurate translation of structured business questions into executable SQL queries. The system uses Trino as the underlying query engine for SQL execution.

To reduce complexity in SQL generation, Wix integrated Cube as the semantic engine. Cube translates structured payloads into optimized SQL queries, allowing the AI agents to focus on business logic and intent resolution rather than low-level SQL construction. This separation of concerns enhances system modularity and maintainability.

### Multi-Agent System Design

Anna is designed as a multi-agent system that mimics how a human analyst would approach data discovery problems. The philosophy behind this architecture is that the assistant should be able to ask clarification questions, divide problems into smaller parts, search and explore, and sometimes return multiple possibilities. Each agent has a specialized role:

**Root Agent**: The entry point that identifies user intent and determines whether the query relates to Wix data or general information. Critically, it handles ambiguity resolution by requesting clarification when users use vague terms. For instance, when a user asks "how many users registered recently?", the agent prompts for clarification on what "recently" means before proceeding.

**Question Validation Agent**: Ensures the question pertains to one of Wix's supported entities and verifies it fits supported question types. Invalid questions are explained back through the Root Agent to inform the user why their query cannot be processed.

**Question Divider Agent**: Handles complex queries by decomposing them into simpler sub-questions. For example, "How many users are from the US and use Google Chrome?" becomes two separate inquiries that can be processed independently, improving accuracy and efficiency.

**Question Generator Agent**: Responsible for creating embedding questions that populate the vector database. This agent generates questions for thousands of dimensions and metrics, adhering to defined instructions that optimize similarity search performance.

**Data Playground Agent**: Takes the narrowed subset of dimensions from semantic search and determines the best match for the user's question. It generates structured API payloads based on Data Playground's API definition and handles cases where multiple interpretations exist by creating multiple queries.

**Data Playground Retry Agent**: A resilience mechanism that handles validation errors from the Data Playground service. When structured query creation fails, this agent receives the error message and failed payload, attempts correction, and retries the query creation.

### RAG Implementation with Vespa

The RAG implementation uses Vespa as the semantic vector database. The embedding pipeline runs hourly through an Airflow DAG, ensuring that new dimensions and tables are indexed as the semantic layer evolves. This operational pattern reflects production-grade LLMOps practices where data freshness is critical for system accuracy.

The search mechanism uses similarity search where a user's question is vectorized in real-time and compared against the pre-computed embeddings in Vespa. Success is defined as the correct dimension or metric appearing within the top-k results returned, with the specific rank within those results being less important than inclusion.

### Embedding Strategy Evolution

The case study reveals an important lesson in embedding strategy. Initial attempts embedded metadata at the table level (descriptions and tags), but this proved ineffective due to the large number of tables per entity and inadequate column-level metadata. Embedding individual dimensions showed improvement but still struggled with variations across domains.

The breakthrough came from a conceptual shift: instead of matching user questions to raw metadata, Wix moved to matching business questions to business questions. For each dimension and metric, they used generative AI to create a set of representative questions that the data could answer. This question-to-question matching approach achieved an 83% success rate, a significant improvement that demonstrates how the framing of the embedding content can dramatically impact retrieval quality.

This approach also helps users who are uncertain which domain their question relates to. The semantic search can identify relevant dimensions across multiple domains and suggest appropriate datasets even when users lack knowledge of the exact data source they need.

## Production Challenges and Limitations

The case study is notably candid about the challenges encountered in production:

**Incorrect Dimension Selection**: When no perfect match exists for a user's question, the AI may retrieve semantically similar but irrelevant dimensions. The text provides an illustrative example where a question about sites creating logos retrieved ten unrelated "logo creation" dimensions. The LLM, being optimized to please, would select an unrelated dimension, potentially leading users to incorrect conclusions if they didn't carefully review the query representation.

**Lack of Memory**: The system does not retain context across interactions, meaning users may receive different results for the same question over time. This inconsistency can erode user trust and makes validation difficult. The team acknowledges this as a known limitation and includes addressing it in their future roadmap.

**Managing Agent Responses**: Ensuring the system doesn't provide premature or partial answers is challenging. When the assistant cannot confidently find relevant data for all parts of a question, ideally it should pause or request clarification. However, LLMs optimized for helpfulness tend to produce answers regardless, potentially generating responses that are technically correct for part of a question but misleading overall. Despite training efforts, enforcing consistent behavior around incomplete results remains difficult.

## Operational Infrastructure

The system relies on several key operational components:

- **Airflow DAGs**: Orchestrate the hourly embedding pipeline that keeps the Vespa vector database synchronized with the evolving semantic layer
- **Vespa**: Serves as the production vector database for semantic search
- **Cube**: Handles SQL generation, abstracting this complexity from the agent layer
- **Trino**: The underlying query engine for executing generated SQL
- **Data Playground API**: The interface through which structured queries are created and executed

## Results and Future Directions

User feedback has been described as "overwhelmingly positive," with natural language queries reducing barriers to data exploration. However, the case study appropriately qualifies these results by acknowledging the ongoing challenges that remain unsolved.

The roadmap includes expanding support for additional question types, refining the embedding strategy further, and improving personalization based on user behavior. Addressing the memory limitation is explicitly mentioned as a future priority.

## Assessment

This case study represents a realistic and technically detailed account of implementing a multi-agent LLM system for enterprise data discovery. The transparency about challenges—particularly around dimension selection accuracy, lack of memory, and agent response management—adds credibility and provides valuable lessons for practitioners. The evolution of the embedding strategy from metadata-based to question-to-question matching demonstrates the iterative nature of building effective RAG systems in production environments.