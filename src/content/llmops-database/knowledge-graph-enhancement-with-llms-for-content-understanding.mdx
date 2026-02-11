---
title: "Knowledge Graph Enhancement with LLMs for Content Understanding"
slug: "knowledge-graph-enhancement-with-llms-for-content-understanding"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67fbc7a29b1d7d210e86d533"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-01T11:07:45.646Z"
  lastUpdated: "2025-11-26T11:34:56.029Z"
  createdOn: "2025-04-13T14:18:10.555Z"
llmopsTags:
  - "content-moderation"
  - "classification"
  - "structured-output"
  - "data-integration"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "embeddings"
  - "fastapi"
  - "postgresql"
  - "monitoring"
  - "scaling"
  - "orchestration"
  - "microsoft-azure"
industryTags: "media-entertainment"
company: "Netflix"
summary: "Netflix has developed a sophisticated knowledge graph system for entertainment content that helps understand relationships between movies, actors, and other entities. While initially focused on traditional entity matching techniques, they are now incorporating LLMs to enhance their graph by inferring new relationships and entity types from unstructured data. The system uses Metaflow for orchestration and supports both traditional and LLM-based approaches, allowing for flexible model deployment while maintaining production stability."
link: "https://www.youtube.com/watch?v=1HE2jdfrYgc"
year: 2025
seo:
  title: "Netflix: Knowledge Graph Enhancement with LLMs for Content Understanding - ZenML LLMOps Database"
  description: "Netflix has developed a sophisticated knowledge graph system for entertainment content that helps understand relationships between movies, actors, and other entities. While initially focused on traditional entity matching techniques, they are now incorporating LLMs to enhance their graph by inferring new relationships and entity types from unstructured data. The system uses Metaflow for orchestration and supports both traditional and LLM-based approaches, allowing for flexible model deployment while maintaining production stability."
  canonical: "https://www.zenml.io/llmops-database/knowledge-graph-enhancement-with-llms-for-content-understanding"
  ogTitle: "Netflix: Knowledge Graph Enhancement with LLMs for Content Understanding - ZenML LLMOps Database"
  ogDescription: "Netflix has developed a sophisticated knowledge graph system for entertainment content that helps understand relationships between movies, actors, and other entities. While initially focused on traditional entity matching techniques, they are now incorporating LLMs to enhance their graph by inferring new relationships and entity types from unstructured data. The system uses Metaflow for orchestration and supports both traditional and LLM-based approaches, allowing for flexible model deployment while maintaining production stability."
---

## Overview

This case study comes from a Metaflow Meetup presentation where a Netflix engineer discussed the infrastructure behind building and maintaining a large-scale Knowledge Graph for entertainment data. While the primary focus of the talk was on the traditional ML infrastructure for entity matching at scale, the presentation also touched on emerging work using LLMs for entity type inference and relationship extraction. This represents an interesting hybrid case where a mature ML infrastructure system is being augmented with generative AI capabilities.

Netflix's Knowledge Graph is a critical piece of infrastructure used across multiple teams and platforms within the company. It connects various entities in the entertainment domain—actors, movies, countries, books, semantic concepts—and captures the complex relationships between them. The graph serves multiple use cases including content similarity analysis, search enhancement, recommendations, and predictive analytics.

## The Core Problem: Entity Matching at Scale

Before diving into the LLM aspects, it's important to understand the foundational challenge. When building a Knowledge Graph from multiple data sources, entity matching becomes a critical step. The team needs to determine when two records from different sources refer to the same entity (like a movie) versus different entities that happen to be similar.

The presentation highlighted just how tricky this can be in the entertainment domain. For example, "Knives Out" and "Knives Out 2" share the same director, similar actors, and similar themes, but are fundamentally different movies. Similarly, movies with common names like "Mother" exist in multiple countries and languages every year, requiring precise matching to avoid errors.

The scale of the problem is substantial. With millions of entities, even with good candidate pair generation, the team ends up with billions of pairs that need to be evaluated. The approach they took was to model this as a pairwise classification problem, extracting metadata from each entity pair and running it through classification models.

## Infrastructure and Metaflow Pipeline

The team extensively leverages Metaflow, an ML infrastructure framework originally developed at Netflix, to build and operate these systems. Key architectural decisions include:

**Parallel Processing Architecture**: The system is designed for massive parallelization. Data is partitioned across multiple nodes, each handling matching independently. Results are written out in parallel with no shuffle or gather phase, eliminating bottlenecks. The team can scale horizontally by simply adding more machines.

**Fast Data Layer**: A surprising early win came from using Netflix's fast data layer with Apache Arrow for parsing large JSON metadata blobs. This alone provided a 10x speedup over traditional approaches, which is significant when processing billions of pairs.

**Within-Node Parallelization**: Beyond distributing across nodes, the system also parallelizes feature computation within each node using Metaflow dataframes, splitting work across multiple cores and sharing memory for additional speedups.

**Operational Tooling**: The Metaflow UI provides visibility into pipeline execution, helping identify skewed tasks (e.g., a movie with an unusually large filmography causing one task to run slowly). Failed instances can be restarted locally with additional debugging logs, which the presenter noted was a significant improvement over their previous PySpark-based system.

## LLM Integration for Entity Type and Relationship Inference

The more LLMOps-relevant portion of the talk focused on emerging work using LLMs for inferring entity types and relationships. This represents a newer, work-in-progress initiative that augments the traditional ML approaches.

**Use Case**: The team is exploring using LLMs to derive information that may not be explicitly available in the data but can be inferred from context and the model's world knowledge. Examples include:
- What is a movie based on (real life story, book, etc.)
- What's the main subject of a movie
- What sequel relationships exist
- What franchise a movie belongs to

This information is valuable for building richer embeddings and establishing new semantic relationships in the graph.

**Technical Approach**: The system uses a combination of:
- **Elaborate Ontology Prompts**: Graph structure definitions are provided as prompts to guide the LLM
- **Unstructured Document Input**: Available data about entities is fed to the model
- **In-Context Learning**: Examples are provided to help the model understand the expected output format
- **RAG (Retrieval-Augmented Generation)**: The pipeline includes a RAG process to query relevant information for entity type and relationship extraction

The presenter noted that LLMs are "getting much better" at converting unstructured documents to structured data and extracting graph structures, suggesting this is an area of active improvement.

**Pipeline Architecture**: The LLM-based extraction pipeline follows this structure:
- Input graph data is processed through an ETL layer
- Nodes requiring inference are channeled to a RAG module for querying
- An extraction module handles entity type and relationship extraction
- Multiple models can be tried, including rule-based NLP or LLM approaches
- The extraction module is implemented as a Metaflow job for flexibility

**Why Metaflow for LLM Jobs**: The same benefits that made Metaflow valuable for traditional ML apply to the LLM workloads:
- Flexibility to swap different models
- Resource tuning based on model complexity (rule-based vs. complex neural nets)
- Configurability for trying different models on different entity types
- Consistent operational patterns with the rest of the infrastructure

## Production Operations and Team Workflows

A significant portion of the discussion focused on how Metaflow enables safe production operations, which is highly relevant to LLMOps practices:

**Branch and Namespace Management**: The team uses Metaflow's project versioning and branching features extensively. This ensures:
- Production models are isolated from experimental work
- New engineers can deploy and test models without affecting production
- Different versions can be used for different entities without confusion
- Development branches can run in parallel with production

When asked about this, the presenter explained that a developer can take the same training pipeline, deploy it in their personal namespace, and their deployment won't accidentally overwrite production. The production branch is only updated through controlled merges.

**Resource Management**: The presenter acknowledged that while steps have fixed resource allocations by default, developers have the freedom to change resources for their jobs. This operates on a "freedom and responsibility" model where developers are trusted to use good judgment. When asked if resource limits could be set to prevent expensive accidental runs, the answer was that it's possible but relies on developer judgment.

**Debugging Distributed Systems**: The ability to restart failed instances locally with additional debugging logs was highlighted as a major operational improvement. This is particularly valuable when dealing with data quality issues from various licensed content sources.

## Key Takeaways and Observations

The presentation illustrates a practical approach to integrating LLM capabilities into an existing ML infrastructure:

- **Incremental Integration**: Rather than rebuilding systems around LLMs, the team is adding LLM-based extraction as a new capability alongside existing ML approaches
- **Shared Infrastructure Patterns**: The same Metaflow-based operational patterns that work for traditional ML are being applied to LLM workloads
- **RAG for Domain Knowledge**: Using RAG to augment LLM outputs with domain-specific entity information
- **Flexibility in Model Selection**: The architecture allows trying different models (rule-based, traditional NLP, LLMs) for different use cases

It's worth noting that the LLM work was described as "work in progress" and "ongoing," suggesting this is relatively early-stage compared to the mature entity matching infrastructure. The presenter was careful to frame this as exploratory work with "some success" rather than a fully proven production system.

The case study demonstrates how teams with strong ML infrastructure foundations can extend those patterns to LLM use cases, rather than treating LLMs as a completely separate operational domain. The emphasis on operability, debugging, resource management, and safe production deployment practices applies equally to both traditional ML and emerging LLM workloads.