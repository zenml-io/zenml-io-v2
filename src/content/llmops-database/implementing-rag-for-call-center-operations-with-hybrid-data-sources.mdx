---
title: "Implementing RAG for Call Center Operations with Hybrid Data Sources"
slug: "implementing-rag-for-call-center-operations-with-hybrid-data-sources"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "682449bbf800b8f9bb90c03d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:08:08.485Z"
  createdOn: "2025-05-14T07:43:55.308Z"
llmopsTags:
  - "customer-support"
  - "unstructured-data"
  - "structured-output"
  - "regulatory-compliance"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "latency-optimization"
  - "databases"
  - "elasticsearch"
  - "monitoring"
  - "fastapi"
  - "microsoft-azure"
  - "openai"
industryTags: "finance"
company: "Manulife"
summary: "Manulife implemented a Retrieval Augmented Generation (RAG) system in their call center to help customer service representatives quickly access and utilize information from both structured and unstructured data sources. They developed an innovative approach combining document chunks and structured data embeddings, achieving an optimized response time of 7.33 seconds in production. The system successfully handles both policy documents and database information, using GPT-3.5 for answer generation with additional validation from Llama 3 or GPT-4."
link: "https://aclanthology.org/2025.naacl-industry.48.pdf"
year: 2024
seo:
  title: "Manulife: Implementing RAG for Call Center Operations with Hybrid Data Sources - ZenML LLMOps Database"
  description: "Manulife implemented a Retrieval Augmented Generation (RAG) system in their call center to help customer service representatives quickly access and utilize information from both structured and unstructured data sources. They developed an innovative approach combining document chunks and structured data embeddings, achieving an optimized response time of 7.33 seconds in production. The system successfully handles both policy documents and database information, using GPT-3.5 for answer generation with additional validation from Llama 3 or GPT-4."
  canonical: "https://www.zenml.io/llmops-database/implementing-rag-for-call-center-operations-with-hybrid-data-sources"
  ogTitle: "Manulife: Implementing RAG for Call Center Operations with Hybrid Data Sources - ZenML LLMOps Database"
  ogDescription: "Manulife implemented a Retrieval Augmented Generation (RAG) system in their call center to help customer service representatives quickly access and utilize information from both structured and unstructured data sources. They developed an innovative approach combining document chunks and structured data embeddings, achieving an optimized response time of 7.33 seconds in production. The system successfully handles both policy documents and database information, using GPT-3.5 for answer generation with additional validation from Llama 3 or GPT-4."
---

## Overview

This case study, published in the 2025 Proceedings of the NAACL conference (Industry Track), describes Manulife's implementation of a retrieval-augmented generation (RAG) system for a call center at a business unit of this large financial institution. The system addresses a common challenge in enterprise environments: customer service representatives (CSRs) need to quickly answer customer queries by looking up information across multiple heterogeneous data sources, including both structured databases and unstructured documents. The paper provides valuable insights into production-grade RAG deployment, particularly the novel approach to handling structured data through embeddings rather than traditional text-to-SQL methods.

The call center has been operational for decades, meaning the team had to work with legacy data systems and diverse data formats. This is a realistic constraint that many enterprises face when implementing LLM-based solutions. The production application has been running since May 2024, providing concrete evidence of the system's real-world viability.

## Data Sources and Ingestion Pipeline

The system consolidates data from three main sources:

- **General insurance policy documents** for US states (unstructured PDFs)
- **CSR notes** documenting previous customer interactions (unstructured)
- **Structured database** containing specific customer policy information

The unstructured documents (PDFs) are stored on Microsoft SharePoint and ingested into Azure Data Lake Storage (ADLS) upon updates. Structured data is ingested daily into Azure Synapse Lake for big data analysis. This separation of ingestion pipelines for different data types is a pragmatic approach that allows each data type to be processed according to its specific requirements and update frequencies.

For unstructured data, the team used a standard chunking approach: text is divided into 400-token segments with overlaps between chunks. These chunks are then vectorized into 1536-dimensional vectors using OpenAI's text-embedding-ada-002 model. The vectors are stored in an Azure AI Search index using the AI Search SDK.

## Innovative Structured Data Handling

Perhaps the most significant contribution of this case study is the approach to handling structured data. The paper explicitly critiques the common text-to-SQL approach, where an LLM translates natural language queries into SQL, noting that this method increases the number of LLM calls (adding cost and latency) and sometimes produces incorrect query translations.

Instead, the Manulife team implemented an innovative method:

- De-normalized multiple database tables and aggregated them by business concepts (examples given include "Comfort Keepers" and "Care Champions")
- Reduced from 50 million rows to 4.5 million rows through this processing
- Converted each row into a JSON string with table headers as keys and cell values as values
- Vectorized these JSON strings using the same embedding model as unstructured data
- Stored these vectors in a separate Azure AI Search index

This approach is clever because it treats structured data similarly to unstructured data at retrieval time, allowing semantic similarity search to find relevant records without requiring an intermediate SQL generation step. The trade-off is that this requires significant upfront data processing and business logic to properly group and aggregate the data by concepts that make semantic sense.

## Inference Pipeline

During inference, the system:

- Retrieves the top k relevant chunks from both the structured and unstructured indexes based on the input query
- Combines retrieved chunks into a prompt
- Uses GPT-3.5 to generate a grounded answer
- Employs an independent validation model (either Llama 3 or GPT-4) to assess the answer's quality with a confidence rating

The use of a separate validation model is a notable production practice. Having an independent model evaluate the primary model's output adds a layer of quality control that can help catch potential issues before they reach users. This dual-model approach reflects mature LLMOps thinking about reliability in production systems.

## Performance Optimization

The paper reports significant performance improvements over the system's lifetime. The initial launch had an average response time of 21.91 seconds, which was optimized down to 7.33 seconds. This approximately 66% reduction in latency is substantial for a call center application where CSRs need quick answers while customers are on the phone.

The paper attributes part of this low latency to the design decision to vectorize structured data rather than using text-to-SQL approaches, which would require additional LLM calls during inference. This is a good example of how architectural decisions made during system design can have lasting impacts on production performance.

## Monitoring and Quality Assurance

The production system includes monitoring capabilities that capture:

- Confidence ratings from the validation model
- Human feedback from CSRs using the system
- Response times

This combination of automated quality metrics (confidence ratings) and human feedback represents a reasonable monitoring strategy for LLM applications. The paper notes that the system has "consistently generated accurate, grounded answers without hallucinations since May 2024," though they also acknowledge occasional errors due to missing data or ambiguous contexts. These issues were addressed through updates to data pipelines and prompt revisions.

It's worth noting that the claim of "no hallucinations" should be interpreted carefully. The system is designed to ground answers in retrieved content, which naturally reduces hallucination risk, but the confidence in this claim likely depends on the monitoring and evaluation methodology used.

## Model Comparison

The paper mentions comparing various open-source and closed-source models for answer generation, which is valuable for model selection decisions. Using GPT-3.5 for primary generation and either GPT-4 or Llama 3 for validation suggests a cost-conscious architecture where the more expensive or capable models are used strategically rather than for all operations.

## Architecture Components

The overall architecture consists of four major components:

- **Ingestion and Indexing**: Handles data consolidation, chunking, vectorization, and storage
- **Inference**: Manages query processing, retrieval, and answer generation
- **Monitoring**: Captures quality metrics and feedback
- **User Interface**: Provides the front-end for CSR interaction

This modular architecture is appropriate for production systems, allowing different components to be updated or scaled independently.

## Critical Assessment

While this case study provides valuable insights, a few considerations deserve mention:

The paper is published by the team that built the system, so naturally emphasizes successes. The claim of consistent accuracy without hallucinations since May 2024 would benefit from more detailed evaluation methodology and metrics.

The structured data approach requires significant data engineering effort upfront—denormalizing and aggregating 50 million rows into 4.5 million rows grouped by business concepts requires substantial domain knowledge and engineering work. This investment may not be practical for all organizations.

The 7.33-second average response time, while improved from the initial 21.91 seconds, may still feel slow in some call center contexts where CSRs are expected to respond almost instantaneously. However, for complex queries that previously required manual lookups across multiple systems, this could represent a significant improvement.

Overall, this case study offers a realistic glimpse into enterprise RAG deployment, including the messy reality of working with mixed structured and unstructured data, legacy systems, and the need for ongoing optimization and monitoring.