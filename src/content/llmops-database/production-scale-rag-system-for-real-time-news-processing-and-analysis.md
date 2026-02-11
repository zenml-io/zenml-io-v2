---
title: "Production-Scale RAG System for Real-Time News Processing and Analysis"
slug: "production-scale-rag-system-for-real-time-news-processing-and-analysis"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bc08fbadaf8381d75e3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:45:36.953Z"
  createdOn: "2024-11-21T13:55:12.853Z"
llmopsTags:
  - "chunking"
  - "cost-optimization"
  - "devops"
  - "document-processing"
  - "embeddings"
  - "latency-optimization"
  - "microservices"
  - "open-source"
  - "orchestration"
  - "rag"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "translation"
  - "unstructured-data"
  - "vector-search"
industryTags: "media-entertainment"
company: "Emergent Methods"
summary: "Emergent Methods built a production-scale RAG system processing over 1 million news articles daily, using a microservices architecture to deliver real-time news analysis and context engineering. The system combines multiple open-source tools including Quadrant for vector search, VLM for GPU optimization, and their own Flow.app for orchestration, addressing challenges in news freshness, multilingual processing, and hallucination prevention while maintaining low latency and high availability."
link: "https://www.youtube.com/watch?v=0ORi9QJlud0"
year: 2023
seo:
  title: "Emergent Methods: Production-Scale RAG System for Real-Time News Processing and Analysis - ZenML LLMOps Database"
  description: "Emergent Methods built a production-scale RAG system processing over 1 million news articles daily, using a microservices architecture to deliver real-time news analysis and context engineering. The system combines multiple open-source tools including Quadrant for vector search, VLM for GPU optimization, and their own Flow.app for orchestration, addressing challenges in news freshness, multilingual processing, and hallucination prevention while maintaining low latency and high availability."
  canonical: "https://www.zenml.io/llmops-database/production-scale-rag-system-for-real-time-news-processing-and-analysis"
  ogTitle: "Emergent Methods: Production-Scale RAG System for Real-Time News Processing and Analysis - ZenML LLMOps Database"
  ogDescription: "Emergent Methods built a production-scale RAG system processing over 1 million news articles daily, using a microservices architecture to deliver real-time news analysis and context engineering. The system combines multiple open-source tools including Quadrant for vector search, VLM for GPU optimization, and their own Flow.app for orchestration, addressing challenges in news freshness, multilingual processing, and hallucination prevention while maintaining low latency and high availability."
---

## Overview

Emergent Methods, founded by Robert (a scientist turned entrepreneur), has built a production-grade system for processing and contextualizing news at scale. The company's flagship product, Ask News (asknews.app), adaptively models over 1 million news articles per day, providing users with timely, diverse, and accurately sourced news information. This case study, presented in a discussion format between Robert and the host Demetrios, offers deep insights into the technical architecture and operational considerations of running LLMs in production for real-time news processing.

The core problem Emergent Methods addresses is the inadequacy of general-purpose LLMs for delivering accurate, timely news. As demonstrated in the presentation, ChatGPT Plus with Bing search takes considerable time to find articles and often returns outdated information—in one example, returning a 25-day-old article when asked for current news on Gaza. Robert characterizes this as "borderline dangerous," particularly for sensitive topics requiring accuracy and recency.

## The Case for Context Engineering

Emergent Methods coined the term "Context Engineering" to describe their approach to news processing. The traditional NLP pipeline before the advent of capable LLMs like LLaMA 2 involved chunking text into 512-token segments, running them through translation models, using DistilBART for summarization, performing sentence extraction, and maybe adding text classification for sentiment. While functional, this approach was rigid and couldn't adapt to evolving product requirements.

The new paradigm enables reading full articles, extracting rich context, flexible output generation, translation, summarization, and custom extraction—all configurable through prompt modifications rather than pipeline rewrites. This flexibility is crucial for a production system where requirements evolve based on user feedback and new use cases.

Robert emphasizes that enforcing journalistic standards requires dedicated resources. When covering global events, users deserve perspectives from multiple regions and languages—for Gaza coverage, understanding what Egypt, France, and Algeria are saying matters. This requires parsing a massive volume of articles to avoid outdated, stale reporting and minimize hallucination, which has particularly high costs in news contexts.

## Data Sourcing and Scale

Emergent Methods sources their news from NewsGrabber (newscatcher-ai.com), which provides access to 50,000 different sources. They process news in 5-minute buckets, continuously ingesting and enriching the latest articles. This scale—over 1 million articles daily—demands careful attention to throughput, latency, and resource management.

## Technical Architecture

### Microservices Philosophy

A central theme throughout the presentation is the commitment to microservices architecture with single responsibility principle. Rather than using all-in-one solutions that sacrifice performance for convenience, Emergent Methods orchestrates purpose-built components that can be independently scaled, updated, or replaced. This modularity positions them to adapt as the rapidly evolving LLM ecosystem produces better alternatives.

### Vector Database: Qdrant

Qdrant serves as the vector database for semantic search and forms a cornerstone of their architecture. Robert highlights several Qdrant features critical to their use case:

- **Batch Upserts**: With the volume of articles being processed, minimizing client connections and networking overhead through batch operations is essential.

- **Efficient Filtering**: Timestamp filtering is crucial for news applications. When users ask about events from the last 24 hours, the system cannot be searching through month-old articles. Qdrant's range filters enable efficient time-based filtering in the metadata.

- **Keyword Filtering**: Opens up product opportunities for more targeted searches.

- **Sparse Vector Support**: Emergent Methods immediately adopted sparse vectors when Qdrant added support. They use SPLADE (Sparse Lexical and Expansion) as an alternative to BM25, leveraging its BERT-based architecture that understands which words are less important to the search (articles, prepositions) while maintaining some semantic awareness. Combined with dense embeddings, this enables hybrid search with superior retrieval quality.

- **On-Premise Deployment**: Perhaps the most valuable aspect for Emergent Methods is deploying Qdrant within the same Kubernetes cluster as other services. This eliminates network latency concerns, noisy neighbor problems from cloud providers, and ensures high privacy with data isolation from the external world.

- **Distributed Deployment and Deep Storage**: For a news archival mission where the database continuously grows, having a solution that scales with data growth is essential.

### LLM Inference: vLLM

For on-premise LLM inference, Emergent Methods uses vLLM, praising its focus on continuous batching and PagedAttention. While Robert admits the GPU memory management internals are "above his pay grade," the practical benefit is dramatically increased throughput—essential when processing millions of articles.

### Embeddings: Text Embedding Inference (TEI)

Rather than letting the vector database handle embeddings (which some solutions offer for convenience), Emergent Methods uses Hugging Face's Text Embedding Inference as a dedicated microservice. This follows their single responsibility principle: the database should store and search vectors, not generate them. TEI also provides dynamic batching, valuable when dealing with heterogeneous text lengths. This isolation allows independent resource allocation and scaling.

### Orchestration: FlowDapt

FlowDapt is Emergent Methods' own open-source orchestration framework, developed over two years and recently publicly released. It runs the Ask News production system and addresses several challenges specific to ML workloads:

- **Parallelized Compute**: Supports Ray or Dask as execution backends, enabling vanilla Python code to scale across clusters without code changes.

- **Automatic Resource Management**: Handles GPU allocation, including assigning multiple tasks to a single GPU for heterogeneous workloads.

- **Local Development Parity**: Ensures what developers see on their laptops matches cluster behavior—critical when debugging systems spanning 10-100 servers.

- **Cluster-Wide Data Sharing**: Provides easy methods for getting and putting values across tasks, with options for in-memory or persisted state.

- **Scheduling**: Supports different workflow frequencies and triggers for real-time processing.

- **Kubernetes-Style Configuration**: Uses familiar resource-oriented patterns and includes flowctl (analogous to kubectl) for operations.

### Retrieval Optimization: HyDE

The presentation discusses the challenge that user queries are not semantically equivalent to embedded documents. One approach they explore is HyDE (Hypothetical Document Embedding), where the LLM generates a fake article based on the user's question. This synthetic document is then embedded and used for search, bringing the query representation closer to the document space.

However, Robert notes limitations: computational cost and the fact that the generated content is based on the LLM's training data, not current information. For handling ambiguous follow-up questions (like "why did they change the rules?"), they use prompt engineering to generate explicit, unambiguous queries based on conversation history.

The overarching goal is staying in a single parameter space—keeping search embeddings as close as possible to document embeddings for optimal retrieval.

## Hybrid Model Strategy

The architecture employs both proprietary remote models (like OpenAI's offerings) and on-premise LLMs through vLLM. This hybrid approach balances cost, latency, and capability:

- Remote models provide access to cutting-edge capabilities without infrastructure investment
- On-premise models reduce costs for high-volume operations and provide lower-latency reasoning

Robert acknowledges advantages and disadvantages to each approach without prescribing a universal solution.

## Production Considerations

### Latency Optimization

In production environments handling high traffic volumes with simultaneous requests hitting multiple services, latency becomes critical. Beyond the network-level optimization of co-locating services in Kubernetes, the application layer uses asynchronous programming. While some services are written in Go for performance, ML-focused endpoints use FastAPI with Pydantic v2.0 (which runs on Rust), providing the benefits of highly parallelized environments with strong guarantees around immutability and atomicity.

### Data Freshness and Updates

A key discussion point addresses keeping vector databases current. For news, this involves timestamp-based filtering during retrieval and careful metadata management during ingestion. For other use cases like HR policy documents that update quarterly, Robert suggests maintaining clean databases by removing outdated information rather than accumulating document versions that could confuse retrieval.

### Future Capabilities: Recommendations

Emergent Methods plans to leverage Qdrant's recommendation system to let users personalize their news experience. By allowing users to indicate what they like and don't like, the system can outsource recommendation logic to Qdrant, building user profiles that suggest relevant stories without custom recommendation engineering.

## Startup Advantage Perspective

Robert closes with observations on why startups are well-positioned in the current LLM landscape. Best practices remain unestablished because the technological paradigm is underexplored—no one fully knows the limits. Meanwhile, incumbents face resistance to change, legacy product maintenance, and market expectations that constrain experimentation. Startups can build everything around reasoning engines, embracing modularity and adaptability. While perhaps opinionated, this perspective reflects the approach Emergent Methods has taken: building flexible, composable systems that can evolve with rapidly advancing technology.

## Product Demonstration

The discussion includes a live walkthrough of asknews.app, demonstrating features like filtering by sentiment (positive news), region (Europe, Americas), and category (sports, finance). The interface shows source citations, coverage trends, and where stories are in their coverage cycle. User accounts enable starring stories for tracking ongoing narratives, with personalized recommendations as a planned enhancement.