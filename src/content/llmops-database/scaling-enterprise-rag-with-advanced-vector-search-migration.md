---
title: "Scaling Enterprise RAG with Advanced Vector Search Migration"
slug: "scaling-enterprise-rag-with-advanced-vector-search-migration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "674f1f18ed9107058fe008c7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:47:13.146Z"
  createdOn: "2024-12-03T15:09:12.269Z"
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "unstructured-data"
  - "data-integration"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "kubernetes"
  - "elasticsearch"
  - "postgresql"
  - "microsoft-azure"
industryTags: "tech"
company: "Danswer"
summary: "Danswer, an enterprise search solution, migrated their core search infrastructure to Vespa to overcome limitations in their previous vector database setup. The migration enabled them to better handle team-specific terminology, implement custom boost and decay functions, and support multiple vector embeddings per document while maintaining performance at scale. The solution improved search accuracy and resource efficiency for their RAG-based enterprise search product."
link: "https://blog.vespa.ai/why-danswer-users-vespa/"
year: 2024
seo:
  title: "Danswer: Scaling Enterprise RAG with Advanced Vector Search Migration - ZenML LLMOps Database"
  description: "Danswer, an enterprise search solution, migrated their core search infrastructure to Vespa to overcome limitations in their previous vector database setup. The migration enabled them to better handle team-specific terminology, implement custom boost and decay functions, and support multiple vector embeddings per document while maintaining performance at scale. The solution improved search accuracy and resource efficiency for their RAG-based enterprise search product."
  canonical: "https://www.zenml.io/llmops-database/scaling-enterprise-rag-with-advanced-vector-search-migration"
  ogTitle: "Danswer: Scaling Enterprise RAG with Advanced Vector Search Migration - ZenML LLMOps Database"
  ogDescription: "Danswer, an enterprise search solution, migrated their core search infrastructure to Vespa to overcome limitations in their previous vector database setup. The migration enabled them to better handle team-specific terminology, implement custom boost and decay functions, and support multiple vector embeddings per document while maintaining performance at scale. The solution improved search accuracy and resource efficiency for their RAG-based enterprise search product."
---

## Overview

Danswer is an open-source enterprise search platform that connects disparate knowledge sources within organizations—including Google Drive, Slack, Salesforce, and other enterprise tools—and makes this information accessible through a unified search and chat interface powered by GenAI. The company's core value proposition centers on making Large Language Models more intelligent by providing them with relevant organizational context through Retrieval Augmented Generation (RAG). This case study documents their decision to migrate from their previous vector database infrastructure to Vespa, a more capable search engine, to meet the demands of enterprise-scale deployments.

## The Problem: Scaling RAG for Enterprise

As Danswer scaled to serve enterprise customers with millions of documents, they encountered significant limitations with their previous search infrastructure. Their original architecture used a vector-only search approach, which proved insufficient for handling the nuances of enterprise search queries. A critical discovery was that team-specific terminology—internal project names, product codenames, and organizational jargon—could not be adequately captured by deep learning embedding models alone. Terms like internal project names had no general English representation that embedding models could meaningfully encode, leading to poor search results for queries containing such terminology.

To address this, Danswer initially added a separate keyword search component alongside their vector search. However, this dual-system approach created new problems around weighting and normalization. When vector similarity scores and keyword relevance scores come from completely separate systems, combining them into a unified ranking becomes problematic. The lack of a coherent normalization strategy across search types degraded the overall search quality.

## Technical Challenges and Solutions

### Hybrid Search with Proper Normalization

One of the key technical requirements was the ability to combine vector-based semantic search with traditional keyword search in a meaningful way. Vespa's architecture allows for easy normalization across multiple search types within a single query execution, enabling Danswer to finally achieve the search accuracy they needed. This hybrid approach means that queries benefit from both the semantic understanding of embeddings and the precision of exact keyword matching, with proper score normalization ensuring that results from both approaches are fairly ranked together.

### Time-Based Decay Functions

Enterprise document collections often suffer from version control issues—multiple versions of the same document may exist with conflicting information, and outdated documents aren't always properly archived or deleted. Danswer's users requested the ability to apply time-based decay to document relevance, so that documents that haven't been touched or read for extended periods would be ranked lower. This requirement translated to needing flexible document ranking functions that could incorporate a "time last touched" attribute and apply decay calculations based on the difference between that timestamp and the current query time.

Vespa's ranking expression language proved to be one of the most flexible options available for implementing such custom ranking functions. The platform even provided documentation and examples for this exact use case, significantly simplifying the implementation. This flexibility in ranking expressions is a key differentiator for production RAG systems where relevance needs to account for factors beyond just semantic similarity.

### Multi-Pass Indexing with Multiple Vector Embeddings

To capture both overarching document context and specific details, Danswer implemented a multi-pass indexing approach. Each document is split into different sections for processing, with each pass using a different context window size. This creates multiple vector embeddings per document—one representing the broader context and others representing specific chunks or sections.

According to the case study, Vespa is the only hybrid search engine capable of storing and querying multiple vector embeddings for a single document without requiring document duplication. This optimization is particularly important for Danswer's deployment model. Since Danswer is primarily a self-hosted solution (chosen by enterprises for data security reasons), reducing resource requirements is crucial. The ability to avoid duplicating documents for every chunk and every context size significantly reduces the compute and storage resources needed to serve the document index. This efficiency enables more organizations to deploy Danswer even without access to powerful servers or large cloud computing budgets.

## Technology Selection Process

As an open-source project themselves, Danswer limited their evaluation to self-hosted search engine options. Their previous stack consisted of two separate search engines—one for vector search and one for keyword search—both relatively new players in the space. While these newer solutions were surprisingly stable, they were designed primarily for ease of initial setup rather than advanced functionality.

Danswer attempted workarounds for their limitations, such as applying time decay as a post-processing step after initial search. However, these approaches suffered accuracy degradation once document scales exceeded several million, as the initial retrieval step couldn't account for all ranking factors.

The evaluation narrowed to four established projects: OpenSearch, Elasticsearch, Weaviate, and Vespa. Vespa was selected based on several factors:

- **Advanced NLP capabilities**: Support for multiple vectors per document, late interaction models like ColBERT, various nearest neighbor implementations, and other cutting-edge retrieval techniques. The team anticipated needing the latest techniques and wanted a platform at the forefront of search innovation.

- **Permissive licensing**: Vespa's entire codebase is Apache 2.0 licensed, allowing unrestricted use including commercial software development—essential for Danswer's business model.

- **Proven scale**: Vespa was built for internet-scale data, having previously powered Yahoo's search infrastructure. With some customers requiring indexing of tens of millions of documents, this proven scalability provided confidence that the platform wouldn't become a bottleneck.

## Deployment Considerations and Challenges

The case study honestly acknowledges that Vespa is developer-facing software with a learning curve. The flexibility that enables advanced features comes with inherent complexity in configuration, deployment, and query/indexing options. This makes it less suitable for rapid prototyping but more appropriate for production systems requiring fine-grained control.

Danswer notes they are still in the process of fully understanding Vespa's multi-node Kubernetes deployments for their self-hosted installations. For their managed cloud offering (Danswer Cloud), they are migrating from self-managed Vespa on AWS to Vespa Cloud, a managed service where infrastructure complexity is handled by the Vespa team. This dual deployment strategy—self-hosted for security-conscious enterprises and managed cloud for others—represents a common pattern in enterprise LLM applications.

## LLMOps Implications

This case study highlights several important considerations for production RAG systems:

- **Search quality directly impacts LLM output quality**: The entire value proposition of RAG depends on retrieving genuinely relevant context. Poor retrieval means the LLM receives irrelevant or outdated information, degrading the quality of generated responses regardless of how capable the language model is.

- **Enterprise data has unique characteristics**: Internal terminology, document versioning issues, and the need for recency signals all require search capabilities beyond basic vector similarity. Production RAG systems must account for these real-world data quality issues.

- **Resource efficiency matters for deployment flexibility**: Self-hosted deployments require careful attention to resource consumption. Architectural decisions like multi-vector document storage can significantly impact whether a solution is viable for organizations with limited infrastructure.

- **Scalability must be proven, not assumed**: As document collections grow into the millions, many search solutions that work well at smaller scales begin to show limitations. Selecting infrastructure with proven internet-scale performance provides confidence for long-term growth.

The migration from a simpler but limited search stack to Vespa represents a common pattern in LLMOps: initial implementations optimize for speed-to-market, but production requirements eventually demand more sophisticated infrastructure. The willingness to "rip out the core" of their previous stack demonstrates the importance of search quality to their product's success.