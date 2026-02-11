---
title: "Scaling Data Infrastructure for AI Features and RAG"
slug: "scaling-data-infrastructure-for-ai-features-and-rag"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3e3d84614374660a2ade"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:37:48.318Z"
  createdOn: "2024-11-21T14:05:49.808Z"
llmopsTags:
  - "aws"
  - "data-cleaning"
  - "data-integration"
  - "databases"
  - "embeddings"
  - "kubernetes"
  - "microsoft"
  - "monitoring"
  - "postgresql"
  - "rag"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "unstructured-data"
  - "vector-search"
industryTags: "tech"
company: "Notion"
summary: "Notion faced challenges with rapidly growing data volume (10x in 3 years) and needed to support new AI features. They built a scalable data lake infrastructure using Apache Hudi, Kafka, Debezium CDC, and Spark to handle their update-heavy workload, reducing costs by over a million dollars and improving data freshness from days to minutes/hours. This infrastructure became crucial for successfully rolling out Notion AI features and their Search and AI Embedding RAG infrastructure."
link: "https://www.notion.so/blog/building-and-scaling-notions-data-lake"
year: 2024
seo:
  title: "Notion: Scaling Data Infrastructure for AI Features and RAG - ZenML LLMOps Database"
  description: "Notion faced challenges with rapidly growing data volume (10x in 3 years) and needed to support new AI features. They built a scalable data lake infrastructure using Apache Hudi, Kafka, Debezium CDC, and Spark to handle their update-heavy workload, reducing costs by over a million dollars and improving data freshness from days to minutes/hours. This infrastructure became crucial for successfully rolling out Notion AI features and their Search and AI Embedding RAG infrastructure."
  canonical: "https://www.zenml.io/llmops-database/scaling-data-infrastructure-for-ai-features-and-rag"
  ogTitle: "Notion: Scaling Data Infrastructure for AI Features and RAG - ZenML LLMOps Database"
  ogDescription: "Notion faced challenges with rapidly growing data volume (10x in 3 years) and needed to support new AI features. They built a scalable data lake infrastructure using Apache Hudi, Kafka, Debezium CDC, and Spark to handle their update-heavy workload, reducing costs by over a million dollars and improving data freshness from days to minutes/hours. This infrastructure became crucial for successfully rolling out Notion AI features and their Search and AI Embedding RAG infrastructure."
---

## Overview

Notion, the popular productivity and collaboration platform, undertook a significant data infrastructure overhaul between 2022 and 2024 to support their rapidly growing data needs and, critically, to enable their AI features. This case study provides valuable insights into the foundational data infrastructure work required to deploy LLM-based features at scale, even though it focuses primarily on the data engineering aspects rather than the LLM components themselves.

The core problem Notion faced was that their data had expanded 10x over three years, with a doubling rate of 6-12 months. By 2021, they had grown from 20 billion block rows in Postgres to over 200 billion blocks—representing hundreds of terabytes of data even when compressed. Their existing data warehouse architecture using Fivetran and Snowflake was buckling under the pressure, particularly due to Notion's unique update-heavy workload where 90% of database operations were updates rather than inserts. This is significant because most data warehouses are optimized for insert-heavy workloads.

## The AI Connection

While this case study is primarily about data infrastructure, the explicit motivation was enabling AI features. The team notes that the data lake was essential for "the successful rollout of Notion AI features in 2023 and 2024" and mentions that detailed posts on their "Search and AI Embedding RAG Infra built on top of the data lake" would follow. This positions the data lake as the critical foundation for LLMOps workloads.

The specific AI-related use cases mentioned include:

- Notion AI features (launched 2023-2024)
- Search functionality with embeddings
- RAG (Retrieval Augmented Generation) infrastructure
- Vector database integration for AI embeddings
- Denormalized views of block data for AI and Search products

One particularly interesting technical challenge was the need to construct permission data for blocks. In Notion's data model, a block's permission isn't statically stored—it must be computed on-the-fly via expensive tree traversal computation, walking up from a block through its parents to the workspace root. With hundreds of billions of blocks with varying ancestor depths, this computation would simply time out in Snowflake. This kind of denormalized permission data is essential for AI features that need to respect user access controls when returning results.

## Technical Architecture

Notion's in-house data lake architecture consists of several key components working together:

**Data Ingestion Pipeline:** The system uses Debezium CDC (Change Data Capture) connectors to publish incrementally changed Postgres data to Kafka. They set up one Debezium CDC connector per Postgres host, deployed in an AWS EKS cluster. Rather than maintaining 480 Kafka topics per table (one per shard), they configured one Kafka topic per Postgres table with all connectors writing to the same topic, significantly reducing operational overhead.

**Data Lake Storage:** Apache Hudi is used to write CDC events from Kafka to S3. The team evaluated three options—Apache Hudi, Apache Iceberg, and Databricks Delta Lake—and chose Hudi for its excellent performance with update-heavy workloads and native integration with Debezium CDC messages. At the time of evaluation (2022), neither Iceberg nor Delta Lake were optimized for update-heavy workloads, and Iceberg lacked out-of-box Debezium message understanding.

**Processing Engine:** Spark serves as the main data processing engine, with PySpark used for most lighter use cases and Scala Spark for high-performance, heavy data processing. Spark was chosen for several reasons: its wide range of built-in functions and UDFs beyond SQL, its ability to handle complex data processing logic like tree traversal and block data denormalization, distributed processing of large-scale data with fine-grained control over partitioning and resource allocation, and its open-source cost-efficiency benefits.

**Downstream Systems:** The architecture positions S3 as the central data repository with downstream systems including Snowflake (for analytics), ElasticSearch (for search), Vector Database (for AI embeddings), and Key-Value stores for product-facing needs.

## Key Design Decisions

The team made several important architectural decisions that are relevant to organizations building similar AI/ML infrastructure:

**Incremental Ingestion over Full Snapshots:** They opted for a hybrid approach where normal operations use incremental ingestion of changed data (providing freshness in minutes to hours), while full Postgres snapshots are used only for initial bootstrapping of new tables. The incremental approach proved to be faster and half the cost of full snapshots.

**Raw Data Ingestion Before Processing:** By ingesting raw Postgres data to S3 without on-the-fly processing, they established a single source of truth and simplified debugging across the entire pipeline. Transformation, denormalization, and enrichment happen after data lands in S3, with only highly cleaned and business-critical data flowing to downstream systems.

**Hudi Configuration Optimization:** For their update-heavy workload, they used COPY_ON_WRITE Hudi table type with UPSERT operation. To minimize write amplification, they partitioned data using the same Postgres shard scheme (480 partitions), sorted data based on last updated time (event_lsn) based on the observation that more recent blocks are more likely to be updated, and used bloom filter indexing.

## Performance Tuning for Scale

The team implemented several optimizations to handle Notion's massive scale:

For Spark data processing, they differentiated handling of large and small shards—small shards have their entire data loaded into Spark task container memory for fast processing, while large shards that exceed memory capacity are managed through disk reshuffling. They also utilized multi-threading and parallel processing to speed up processing of the 480 shards.

The Hudi Deltastreamer setup achieved data freshness of just a few minutes for most tables and up to two hours for the largest block table. This is a significant improvement over the previous architecture which had end-to-end ingestion times exceeding a full day.

## Results and LLMOps Implications

The infrastructure investment yielded significant returns:

- Net savings of over a million dollars in 2022, with proportionally higher savings in 2023 and 2024
- End-to-end ingestion time reduced from more than a day to minutes for small tables and a couple of hours for large ones
- Re-syncs can be completed within 24 hours without overloading live databases
- The infrastructure enabled the successful rollout of Notion AI features in 2023 and 2024

For LLMOps practitioners, this case study illustrates an important but often overlooked aspect of deploying LLMs in production: the foundational data infrastructure required to support AI features at scale. Key takeaways include:

- RAG systems require robust data pipelines that can handle complex denormalization (like permission data) with freshness guarantees
- Update-heavy workloads common in productivity applications require careful selection of data lake technologies (Hudi vs Iceberg vs Delta Lake)
- Permission and access control data must flow through to AI systems, requiring expensive tree traversal computations that data warehouses may not handle well
- The time from raw data to AI-ready embeddings needs to be minimized for good user experience
- Vector databases and embedding infrastructure sit downstream of the data lake in the overall architecture

It's worth noting that while Notion presents this as a success story, the case study focuses on infrastructure rather than LLM-specific challenges like prompt engineering, model selection, evaluation, or hallucination management. The "Search and AI Embedding RAG Infra" details promised in the post would presumably cover more LLMOps-specific concerns. Nevertheless, this provides valuable insight into the data engineering foundation required for enterprise-scale AI features.