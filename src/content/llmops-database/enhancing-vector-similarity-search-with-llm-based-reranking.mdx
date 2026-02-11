---
title: "Enhancing Vector Similarity Search with LLM-Based Reranking"
slug: "enhancing-vector-similarity-search-with-llm-based-reranking"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3de582ee3455382927c7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:36:22.523Z"
  createdOn: "2024-11-21T14:04:21.988Z"
llmopsTags:
  - "data-analysis"
  - "databases"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "rag"
  - "reliability"
  - "reranking"
  - "scalability"
  - "semantic-search"
  - "structured-output"
  - "vector-search"
industryTags: "tech"
company: "Grab"
summary: "Grab experimented with combining vector similarity search and LLMs to improve search result relevance. The approach uses vector similarity search (using FAISS and OpenAI embeddings) for initial candidate retrieval, followed by LLM-based reranking of results using GPT-4. Testing on synthetic datasets showed superior performance for complex queries involving constraints and negations compared to traditional vector search alone, though with comparable results for simpler queries."
link: "https://engineering.grab.com/llm-assisted-vector-similarity-search"
year: 2024
seo:
  title: "Grab: Enhancing Vector Similarity Search with LLM-Based Reranking - ZenML LLMOps Database"
  description: "Grab experimented with combining vector similarity search and LLMs to improve search result relevance. The approach uses vector similarity search (using FAISS and OpenAI embeddings) for initial candidate retrieval, followed by LLM-based reranking of results using GPT-4. Testing on synthetic datasets showed superior performance for complex queries involving constraints and negations compared to traditional vector search alone, though with comparable results for simpler queries."
  canonical: "https://www.zenml.io/llmops-database/enhancing-vector-similarity-search-with-llm-based-reranking"
  ogTitle: "Grab: Enhancing Vector Similarity Search with LLM-Based Reranking - ZenML LLMOps Database"
  ogDescription: "Grab experimented with combining vector similarity search and LLMs to improve search result relevance. The approach uses vector similarity search (using FAISS and OpenAI embeddings) for initial candidate retrieval, followed by LLM-based reranking of results using GPT-4. Testing on synthetic datasets showed superior performance for complex queries involving constraints and negations compared to traditional vector search alone, though with comparable results for simpler queries."
---

## Overview

Grab, Southeast Asia's leading superapp platform providing ride-hailing, food delivery, and financial services across eight countries, published this technical case study describing their experimentation with LLM-assisted vector similarity search. The work addresses a fundamental limitation in traditional vector similarity search: while effective for straightforward semantic matching, vector search often fails when queries involve negations, complex constraints, or nuanced contextual requirements. The team developed a two-stage approach that leverages vector search for efficient candidate retrieval followed by LLM-based re-ranking to improve result relevance.

## The Problem with Traditional Vector Similarity Search

The case study begins by establishing the context around vector similarity search, which has become a cornerstone technology in modern information retrieval and particularly in Retrieval Augmented Generation (RAG) systems. Vector search enables finding semantically similar content by comparing embeddings in high-dimensional space, but it has inherent limitations when dealing with linguistic nuances.

The authors highlight a critical example: from a pure vector similarity perspective, "I like fishing" and "I do not like fishing" may appear quite close to each other in embedding space, despite having opposite meanings. This limitation becomes problematic when users formulate queries with negations, exclusions, or complex contextual requirements that simple embedding similarity cannot capture.

## Proposed Two-Stage Solution

The solution architecture follows a straightforward two-step process designed to combine the strengths of both vector search and LLM reasoning:

The first stage uses vector similarity search to efficiently shortlist potential matches (typically 10-50 results) from the dataset. This leverages the computational efficiency of approximate nearest neighbor algorithms to quickly narrow the search space from potentially thousands of records to a manageable subset.

The second stage feeds the shortlisted results into an LLM, which re-ranks them based on their contextual relevance to the original query. The LLM's natural language understanding capabilities allow it to interpret query intent, handle negations, and evaluate semantic relevance in ways that pure vector similarity cannot.

## Technical Implementation Details

The experimental setup provides insight into the specific technologies employed. For vector similarity search, the team used Facebook AI Similarity Search (FAISS), a library developed by Meta that offers efficient similarity search and clustering of dense vectors. FAISS is well-known in the industry for its performance on large-scale approximate nearest neighbor search tasks.

For generating vector embeddings, they utilized OpenAI's text-embedding-ada-002 model, which has become a popular choice for semantic search applications due to its balance of quality and cost-effectiveness. The LLM component used for re-ranking was GPT-4o, OpenAI's multimodal model that offers strong natural language understanding capabilities.

The implementation was built as a Python script, with the LLM receiving the shortlist of 15 candidates along with the original query and descriptive instructions in the prompt to identify the top three most relevant matches.

## Experimental Evaluation

The evaluation was conducted on two small synthetic datasets generated using GPT-4o, each containing 100 records in CSV format. The Food dataset contained dish titles and descriptions, while the Tourist spots dataset included names, cities, countries, and descriptions of Asian tourist destinations. It's worth noting that using synthetic data generated by the same model family used for re-ranking could potentially introduce some bias, though this is a reasonable approach for initial experimentation.

The experiments compared raw vector search (returning top 3 matches directly) against the LLM-assisted approach (shortlisting 15 candidates via FAISS, then using GPT-4o to select top 3).

The results demonstrated clear patterns. For simple, straightforward queries like "Japanese food" or "beautiful mountains" where keywords and concepts directly aligned with database content, both approaches performed comparably. This suggests that the additional computational cost of LLM re-ranking may not always be justified for basic retrieval scenarios.

However, for complex queries involving negations or nuanced requirements, the LLM-assisted approach showed significant advantages. The "food with no fish or shrimp" example is particularly illustrative: raw vector search returned Tempura, Ceviche, and Sushi (all seafood dishes) because the query mentions "fish" and "shrimp," while the LLM correctly interpreted the negation and returned chicken dishes that appropriately excluded the specified ingredients.

Similarly, for the "exposure to wildlife" query, the LLM demonstrated better conceptual reasoning by identifying a panda breeding research center as relevant to wildlife exposure, while vector search returned less relevant results like Merlion Park (a statue) and Manila Bay (known for sunsets).

## Production Deployment and Scale

The case study notes that beyond the small-scale experiments, Grab has deployed this solution internally for larger datasets, specifically mentioning datasets with over 4,500 rows stored in relational databases. This indicates the approach has moved beyond experimentation into practical production use within the organization.

The focus on structured data in relational databases is a relevant constraint noted by the authors, as this differs from unstructured document retrieval scenarios more commonly discussed in RAG literature.

## Operational Considerations and Limitations

The authors acknowledge several important limitations and operational considerations that are relevant for anyone considering similar approaches in production:

First, the experiments were limited in scale—only 100 data points per dataset with a limited number of queries. While they report similar enhancements on larger internal datasets, comprehensive benchmarking at scale is not presented.

Second, the effectiveness of the approach may depend on data quality, complexity, and specific use case patterns. This is an honest acknowledgment that results may vary across different domains and datasets.

Third, and perhaps most critically for production deployments, the authors note that the additional latency introduced by the LLM query must be considered for real-world applications. Vector similarity search is typically very fast (milliseconds), while LLM inference can add hundreds of milliseconds or more to query latency, potentially impacting user experience in interactive applications.

The suggestion for future work—varying the shortlist size and observing impacts on search relevance—highlights an important hyperparameter that would need tuning in production deployments. A larger shortlist increases the chance of including relevant results for the LLM to find, but also increases token costs and potentially confuses the model with too many options.

## Balanced Assessment

This case study presents a practical approach to a real limitation in vector similarity search, and the solution is technically sound and well-reasoned. The combination of efficient approximate search for candidate generation with LLM-based re-ranking for quality improvement is a pattern that has emerged across the industry.

However, some caveats should be noted. The experiments used synthetic data generated by GPT-4o, the same model family used for re-ranking, which could potentially bias results favorably. The scale of experiments (100 records) is quite small, and while larger internal deployments are mentioned, detailed performance metrics are not provided. The latency and cost implications of adding an LLM call to every search query are significant operational concerns that are acknowledged but not quantified.

The approach is most valuable in scenarios where query complexity is high and result quality is more important than response latency. For high-throughput, latency-sensitive applications, the raw vector search may still be preferable, with the LLM-assisted approach reserved for more complex queries or as an optional enhancement.

Overall, this case study provides useful insights into a practical LLMOps pattern that combines traditional ML infrastructure (vector databases, embeddings) with LLM capabilities to improve system quality, while being reasonably transparent about the trade-offs involved.