---
title: "Text-to-SQL System with Structured RAG and Comprehensive Evaluation"
slug: "text-to-sql-system-with-structured-rag-and-comprehensive-evaluation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b1ca076381fcebccf03e8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:48:47.876Z"
  createdOn: "2024-12-12T17:25:52.116Z"
llmopsTags:
  - "question-answering"
  - "structured-output"
  - "data-analysis"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "rag"
  - "vector-search"
  - "few-shot"
  - "prompt-engineering"
  - "semantic-search"
  - "error-handling"
  - "fastapi"
  - "postgresql"
  - "monitoring"
  - "cicd"
  - "langchain"
  - "chromadb"
  - "databricks"
  - "microsoft-azure"
  - "amazon-aws"
  - "google-gcp"
industryTags: "finance"
company: "ICE / NYSE"
summary: "ICE/NYSE developed a text-to-SQL application using structured RAG to enable business users to query financial data without needing SQL knowledge. The system leverages Databricks' Mosaic AI stack including Unity Catalog, Vector Search, Foundation Model APIs, and Model Serving. They implemented comprehensive evaluation methods using both syntactic and execution matching, achieving 77% syntactic accuracy and 96% execution match across approximately 50 queries. The system includes continuous improvement through feedback loops and few-shot learning from incorrect queries."
link: "https://www.databricks.com/blog/unlocking-financial-insights-nyse-ice"
year: 2024
seo:
  title: "ICE / NYSE: Text-to-SQL System with Structured RAG and Comprehensive Evaluation - ZenML LLMOps Database"
  description: "ICE/NYSE developed a text-to-SQL application using structured RAG to enable business users to query financial data without needing SQL knowledge. The system leverages Databricks' Mosaic AI stack including Unity Catalog, Vector Search, Foundation Model APIs, and Model Serving. They implemented comprehensive evaluation methods using both syntactic and execution matching, achieving 77% syntactic accuracy and 96% execution match across approximately 50 queries. The system includes continuous improvement through feedback loops and few-shot learning from incorrect queries."
  canonical: "https://www.zenml.io/llmops-database/text-to-sql-system-with-structured-rag-and-comprehensive-evaluation"
  ogTitle: "ICE / NYSE: Text-to-SQL System with Structured RAG and Comprehensive Evaluation - ZenML LLMOps Database"
  ogDescription: "ICE/NYSE developed a text-to-SQL application using structured RAG to enable business users to query financial data without needing SQL knowledge. The system leverages Databricks' Mosaic AI stack including Unity Catalog, Vector Search, Foundation Model APIs, and Model Serving. They implemented comprehensive evaluation methods using both syntactic and execution matching, achieving 77% syntactic accuracy and 96% execution match across approximately 50 queries. The system includes continuous improvement through feedback loops and few-shot learning from incorrect queries."
---

## Overview

Intercontinental Exchange (ICE) is a major global financial organization that operates exchanges, clearing houses, data services, and mortgage technology, including the New York Stock Exchange (NYSE), the largest stock exchange group in the world. In this case study, ICE partnered with Databricks to develop a text-to-SQL application that allows non-technical business users to extract insights from structured data assets using natural language queries—eliminating the need for users to understand database schemas, data models, or SQL syntax.

This represents a "structured RAG" approach, applying retrieval-augmented generation principles to structured tabular data rather than unstructured documents. The project was completed in approximately five weeks, demonstrating rapid development when using an integrated platform that handles data management, LLM access, and model deployment.

## Technical Architecture and RAG Implementation

The text-to-SQL system leverages the full Databricks Mosaic AI stack, implementing an end-to-end RAG lifecycle with multiple components working together:

### Vector Search for Context Retrieval

The system uses Databricks Vector Search to index table metadata and enable rapid retrieval of relevant context when processing user queries. Two metadata tables are central to the architecture:

- **table_definitions**: Stores comprehensive metadata about database tables including column names, column types, column descriptions/comments, and table descriptions. Table comments are defined using `COMMENT ON TABLE` and column comments via `ALTER TABLE` commands. The DDL statements are indexed via Vector Search to enable similarity-based retrieval of relevant table schemas.

- **sample_queries**: Contains pairs of natural language questions and their corresponding SQL queries, serving as examples for few-shot learning. This table is initialized with predefined question-SQL pairs and grows over time as the system learns from corrections.

### Dual Retriever Strategy

The system implements two specialized retrievers that can be configured via YAML:

- **ConfigRetriever**: Reads context from a YAML configuration file, allowing rapid experimentation with different table definitions and sample queries without creating actual tables and vector indexes. This lightweight approach accelerates testing and refinement during development.

- **VectorSearchRetriever**: The production retriever that reads from the metadata tables and uses Vector Search for efficient similarity-based retrieval. When a question is submitted, an embedding vector is generated and matched against the vector indexes to retrieve related table DDLs with column descriptions, sample data rows from Unity Catalog, and relevant example question-SQL pairs.

### Prompt Augmentation

The retrieved context is combined with the input question to create an augmented prompt that provides the LLM with rich contextual information. The prompt includes the user's question, relevant table DDLs with column descriptions, sample data for each related table, and example question-SQL pairs that are semantically similar to the current query. This augmented prompt is sent to an LLM (the case study mentions Llama 3.1-70B) via Foundation Model APIs, and regex is used to extract the SQL statement from the generated response.

## Evaluation Framework

A notable aspect of this LLMOps implementation is the comprehensive evaluation strategy adapted from the Spider benchmark, a widely recognized benchmark for text-to-SQL systems. The team implemented two complementary evaluation approaches:

### Syntactic Matching

This evaluates the structural correctness of generated SQL by computing F1 scores for component matching and accuracy scores for exact matching. Component matching evaluates individual SQL components (SELECT, WHERE, GROUP BY) separately, while exact matching requires all components to match the ground truth, regardless of order. The evaluation accounts for SQL flexibility—for example, `SELECT col2, col1` is considered equivalent to `SELECT col1, col2`.

The Spider evaluation framework also categorizes queries by difficulty level (easy, medium, hard, extra hard), which helps analyze model performance across different complexity levels. The evaluation dataset contained 48 queries: 0 easy, 36 medium, 7 hard, and 5 extra hard.

### Execution Matching

Beyond syntactic comparison, the system executes both ground truth and generated SQL queries on the same dataset and compares results based on row count, content (actual data values), and column types. This captures cases where syntactically different SQL statements produce identical results.

### Preprocessing Requirements

To ensure compatibility with the Spider evaluation framework, both ground truth and generated SQL statements undergo preprocessing to standardize formats. This includes handling table aliases (requiring the `as` keyword) and removing column aliases from SELECT clauses.

## Continuous Improvement Pipeline

A key LLMOps feature is the closed-loop system for continuous model improvement:

### Inference Table Monitoring

The system leverages Databricks Model Serving's Inference Table feature to continuously ingest all serving request inputs (user questions) and responses (LLM-generated answers). This centralized logging simplifies monitoring and enables detection of trends and patterns in LLM behavior.

### Ground Truth Creation Workflow

User questions are extracted from the inference table, exported as CSV files, and imported into Label Studio (an open-source labeling tool). Subject matter experts annotate these with ground truth SQL statements, which are then imported back to Databricks and merged with the inference table using the `databricks_requests_id` key.

### Few-Shot Learning Loop

When evaluation reveals incorrect LLM-generated queries, these are logged into the `sample_queries` table along with their ground truth SQL. The correct SQL for previously-failed queries then becomes available as context for future similar queries, enabling the model to learn from its mistakes. This creates a virtuous cycle where the system continuously adapts to changing user needs and query patterns.

## Model Serving and Deployment

The text-to-SQL application is implemented as a modular Python library where components like retrievers, LLM selection, and inference parameters are dynamically loaded from YAML configuration. The application is packaged as a Python wheel file, uploaded to a Unity Catalog Volume, and logged with the model as a dependency. This enables seamless deployment using Databricks Model Serving endpoints.

The modular design ensures the system remains adaptable and future-proof, ready to integrate with different LLMs or retrieval solutions as they become available.

## Results and Considerations

The collaboration between ICE and Databricks produced a text-to-SQL system achieving 77% syntactic accuracy and 96% execution match across approximately 50 queries in just five weeks of development. These are reasonable results for an enterprise text-to-SQL system, though it's worth noting the evaluation set is relatively small (around 50 queries).

The case study highlights two critical success factors: providing descriptive metadata for tables and columns (which improves the LLM's ability to generate accurate SQL), and preparing an evaluation set of question-response pairs to guide iterative development.

It should be noted that this case study is published by Databricks, so the positive framing around their platform capabilities should be considered in that context. However, the technical architecture described—particularly the dual-retriever approach, the comprehensive evaluation framework adapted from Spider, and the continuous improvement loop—represents sound LLMOps practices applicable across platforms.

The emphasis on using existing data infrastructure (no data movement required) and the importance of metadata quality are practical lessons for organizations considering similar text-to-SQL implementations. The 96% execution match rate is particularly notable, as it suggests the system is functionally correct in most cases even when syntactic matching is lower—a pragmatic outcome for business users who care about getting correct answers rather than syntactically identical SQL.