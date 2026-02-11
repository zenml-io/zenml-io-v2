---
title: "Building a Production-Grade Email AI Assistant Using RAG and Multi-Stage Retrieval"
slug: "building-a-production-grade-email-ai-assistant-using-rag-and-multi-stage-retrieval"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6799e9c46618a47e929592d3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:58:54.324Z"
  createdOn: "2025-01-29T08:41:40.136Z"
llmopsTags:
  - "question-answering"
  - "summarization"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "reranking"
  - "system-prompts"
  - "chunking"
  - "pinecone"
  - "elasticsearch"
  - "fastapi"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "Shortwave"
summary: "Shortwave built an AI email assistant that helps users interact with their email history as a knowledge base. They implemented a sophisticated Retrieval Augmented Generation (RAG) system with a four-step process: tool selection, data retrieval, question answering, and post-processing. The system combines multiple AI technologies including LLMs, embeddings, vector search, and cross-encoder models to provide context-aware responses within 3-5 seconds, while handling complex infrastructure challenges around prompt engineering, context windows, and data retrieval."
link: "https://www.shortwave.com/blog/deep-dive-into-worlds-smartest-email-ai/"
year: 2023
seo:
  title: "Shortwave: Building a Production-Grade Email AI Assistant Using RAG and Multi-Stage Retrieval - ZenML LLMOps Database"
  description: "Shortwave built an AI email assistant that helps users interact with their email history as a knowledge base. They implemented a sophisticated Retrieval Augmented Generation (RAG) system with a four-step process: tool selection, data retrieval, question answering, and post-processing. The system combines multiple AI technologies including LLMs, embeddings, vector search, and cross-encoder models to provide context-aware responses within 3-5 seconds, while handling complex infrastructure challenges around prompt engineering, context windows, and data retrieval."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-grade-email-ai-assistant-using-rag-and-multi-stage-retrieval"
  ogTitle: "Shortwave: Building a Production-Grade Email AI Assistant Using RAG and Multi-Stage Retrieval - ZenML LLMOps Database"
  ogDescription: "Shortwave built an AI email assistant that helps users interact with their email history as a knowledge base. They implemented a sophisticated Retrieval Augmented Generation (RAG) system with a four-step process: tool selection, data retrieval, question answering, and post-processing. The system combines multiple AI technologies including LLMs, embeddings, vector search, and cross-encoder models to provide context-aware responses within 3-5 seconds, while handling complex infrastructure challenges around prompt engineering, context windows, and data retrieval."
---

## Overview

Shortwave is an email application company that built an AI assistant designed to function as an "executive assistant that lives in your inbox." The project began in late 2022 when the team first experimented with GPT-3 for email summarization and recognized the potential for LLMs to transform how users interact with their email data. Rather than building a simple summarization feature, Shortwave aimed to create a comprehensive AI assistant capable of answering nearly any question about a user's email history, composing emails in the user's voice, and integrating with calendar and other data sources.

The core technical challenge was building a production system that could reason about user questions, retrieve relevant information from heterogeneous data sources, and generate high-quality responses within acceptable latency constraints. This case study provides a detailed look at their architecture and the various LLMOps considerations they encountered.

## Architectural Philosophy and Design Decisions

Shortwave made several key architectural decisions that shaped their production system. First, they deliberately avoided long chains of LLM calls with reasoning broken into multiple stages. Their experience showed that such chains introduced data loss and errors at each step, leading to degraded response quality. Instead, they opted for a design where a single LLM call with a large prompt generates the final answer, relying on the reasoning capabilities of advanced models like GPT-4 and large context windows.

This design philosophy required them to be extremely thoughtful about what data to include in the prompt. With infinite context windows and instantaneous data loading, they could theoretically include everything, but real-world constraints forced them to develop intelligent selection and prioritization mechanisms.

To manage complexity and enable modular development, they introduced a "Tool" abstraction. Each tool is responsible for sourcing a specific type of data (calendar, email history, current thread, draft, etc.) and deciding internally what specific content to add to the final prompt. This modular approach allowed different team members to work on different tools independently and made the system easier to reason about and test.

## Four-Step Processing Pipeline

The AI assistant processes questions through four main steps:

**Tool Selection**: When a user asks a question, it first goes to GPT-4 to determine which tools are needed to answer the question. This step requires advanced reasoning to differentiate between general knowledge questions (which need no tools) and personalized questions requiring specific data sources. The tool selection prompt includes substantial context about the current app state, available tools, and conversation history. Zero, one, or multiple tools can be selected depending on the query.

**Tool Data Retrieval**: Once tools are selected, they execute in parallel to retrieve their data. Each tool is different in complexity—some are simple custom instructions while others involve complex distributed systems. The most sophisticated tool is their EmailHistory/AI Search system, which incorporates multiple AI and non-AI technologies. Tools can make their own LLM calls, run vector DB queries, execute models on their GPU cluster, and access full-text search infrastructure.

**Question Answering**: With all retrieved data in hand, they construct a prompt containing the original question, all context from tools, and specialized instructions for formatting and source citation. This goes to GPT-4 to generate the final answer. Token allocation tradeoffs between different tools are managed through heuristics when the retrieved content exceeds prompt limits.

**Post-Processing**: The LLM output is converted to rich text, source citations are added, and actionable suggestions are presented to users through a clean UI.

## AI Search: The Core RAG System

The EmailHistory tool, marketed as "AI Search," is the most complex and differentiated component of their system. Its job is to find emails relevant to answering a question from across a user's entire email history and rank them by usefulness for prompt inclusion.

The AI Search system combines multiple technologies: LLMs, embeddings, vector databases (Pinecone), full-text search (ElasticSearch), metadata-based search, cross-encoder models, and rule-based heuristics. This hybrid approach is notable as it doesn't rely solely on vector search but combines multiple retrieval strategies.

**Query Reformulation**: Before searching, they use an LLM to rewrite ambiguous queries that depend on context. For example, in a conversation about Phoenix flights, a follow-up question like "What about Jonny?" would be reformulated to "When does Jonny land in Phoenix?" This step considers chat history, the current thread, and any drafts visible on screen.

**Feature Extraction and Traditional Search**: They run many parallel calls to a fast LLM to extract structured features from the reformulated query: date ranges, names, keywords, email addresses, labels, etc. Each extracted feature includes a confidence score. These features power traditional full-text and metadata-based searches through their existing search infrastructure. The independence of these extraction calls enables modularity for testing and iteration.

**Embedding-Based Vector Search**: At email ingestion time, they embed emails using an open-source model (Instructor) running on their own GPU-accelerated servers. Embeddings are stored in Pinecone, namespaced per user (a key reason they chose Pinecone). At query time, the reformulated query is embedded and used for semantic similarity search. This finds conceptually similar emails even without keyword overlap. When possible, they use extracted features (like date ranges) to scope the semantic search to relevant subsets.

**Fast Heuristic Re-ranking**: The combined results from traditional and vector search often number in the thousands—far too many for a prompt. The first re-ranking phase uses fast heuristics based on semantic similarity scores and extracted features. Key techniques include:

- Gaussian filters to boost emails within extracted date ranges while tolerating some variance based on confidence scores
- Boosting emails mentioning extracted names, email addresses, or labels
- Applying recency bias for queries that emphasize recent events
- De-prioritizing promotional and update emails in favor of high-value correspondence

As ranking proceeds, they load full email contents in batches, chunking them into length-capped fragments for the next stage.

**Cross-Encoder Re-ranking**: Their most sophisticated ranking technique uses MS Marco MiniLM, an open-source cross-encoder model running on their own GPUs. This model is slower but more accurate than the heuristics, so they only process top-ranked fragments from the previous step. The cross-encoder scores each fragment's relevance to the question, and they re-apply heuristics to address inconsistencies and factor in metadata compatibility. The final ordered list of fragments goes to the question-answering step.

## Infrastructure and Performance

Shortwave reports end-to-end latency of 3-5 seconds for most questions despite the complex pipeline involving multiple LLM calls, vector DB lookups, ElasticSearch queries, and ML model inference. They achieve this through heavy use of concurrency, streaming, and pipelining. They also emphasize that they "throw a huge amount of compute at the problem" with beefy servers and clusters of high-end GPUs.

Their infrastructure includes:
- Self-hosted GPU clusters for running embedding models (Instructor) and cross-encoder models (MS Marco MiniLM) with better performance, security, and cost than API calls
- Pinecone as their vector database with per-user namespacing
- ElasticSearch for traditional full-text search
- GPT-4 for tool selection, query reformulation, feature extraction, and final answer generation

## Notable LLMOps Patterns

Several LLMOps patterns emerge from this case study:

**Hybrid Retrieval**: Rather than relying solely on vector search (as many simpler RAG implementations do), Shortwave combines multiple retrieval strategies. This recognizes that different query types benefit from different search approaches, and metadata-based constraints often provide important filtering that pure semantic search misses.

**Multi-Stage Re-ranking**: They implement a cascade of increasingly expensive ranking methods, from fast heuristics to GPU-accelerated cross-encoders. This pattern is common in production search systems and allows processing large candidate sets efficiently.

**Self-Hosted ML Models**: By running embedding and cross-encoder models on their own infrastructure, they gain control over latency, costs, and data security—important considerations for a product handling sensitive email data.

**Modular Tool Architecture**: Their abstraction makes it easier to add new capabilities, test individual components, and reason about system behavior. Each tool encapsulates its own complexity.

**Context-Aware Query Processing**: The query reformulation step is crucial for handling real conversational interactions where follow-up questions depend on prior context.

## Caveats and Considerations

The blog post is primarily a product marketing piece, so claims about performance and quality should be taken with appropriate skepticism. The "3-5 seconds" latency claim and characterizations like "world's smartest email AI" are marketing assertions without independent verification.

The system's reliance on GPT-4 for multiple steps means costs could be significant at scale, though specific economics aren't discussed. The choice to consolidate reasoning into a single large prompt rather than chains is interesting but may not generalize to all use cases—their specific context (answering questions about email) may favor this approach more than other applications.

The case study represents their "v1" implementation as of late 2023, and they note the system continues to evolve. The architectural patterns and technical approaches described provide valuable insights for teams building similar production RAG systems, even as specific implementation details may have changed since publication.