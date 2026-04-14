---
title: "Evolution of ML Fact Store"
slug: "netflix-metaflow-evolution-of-ml-fact-store"
draft: false
mlopsTags:
  - "data-versioning"
  - "feature-store"
  - "monitoring"
  - "pipeline-orchestration"
  - "iceberg"
  - "spark"
  - "data-ingestion"
  - "feature-engineering"
  - "training"
industryTags: "media-entertainment"
company: "Netflix"
companySlug: "netflix"
platformName: "Metaflow"
contentType: "blog"
summary: "Netflix built Axion, a fact store designed to eliminate training-serving skew and accelerate offline ML experimentation by storing historical facts that can be used to regenerate features on demand. The motivation stemmed from the need to experiment rapidly with new feature encoders without waiting weeks for feature logging to collect sufficient training data. By storing historical facts and enabling on-demand feature regeneration using shared feature encoders, Axion reduced feature generation time from weeks to hours. The platform evolved from a complex normalized architecture to a simpler design combining Iceberg tables for bulk storage and EVCache for low-latency queries, achieving 3x-50x faster query performance for specific access patterns. The system now serves as the primary data source for all Netflix personalization ML models, with comprehensive data quality monitoring that has identified over 95% of data issues early and significantly improved pipeline stability."
link: "https://netflixtechblog.com/evolution-of-ml-fact-store-5941d3231762"
year: 2022
seo:
  title: "Netflix: Evolution of ML Fact Store - ZenML MLOps Database"
  description: "Netflix built Axion, a fact store designed to eliminate training-serving skew and accelerate offline ML experimentation by storing historical facts that can be used to regenerate features on demand. The motivation stemmed from the need to experiment rapidly with new feature encoders without waiting weeks for feature logging to collect sufficient training data. By storing historical facts and enabling on-demand feature regeneration using shared feature encoders, Axion reduced feature generation time from weeks to hours. The platform evolved from a complex normalized architecture to a simpler design combining Iceberg tables for bulk storage and EVCache for low-latency queries, achieving 3x-50x faster query performance for specific access patterns. The system now serves as the primary data source for all Netflix personalization ML models, with comprehensive data quality monitoring that has identified over 95% of data issues early and significantly improved pipeline stability."
  canonical: "https://www.zenml.io/mlops-database/netflix-metaflow-evolution-of-ml-fact-store"
  ogTitle: "Netflix: Evolution of ML Fact Store - ZenML MLOps Database"
  ogDescription: "Netflix built Axion, a fact store designed to eliminate training-serving skew and accelerate offline ML experimentation by storing historical facts that can be used to regenerate features on demand. The motivation stemmed from the need to experiment rapidly with new feature encoders without waiting weeks for feature logging to collect sufficient training data. By storing historical facts and enabling on-demand feature regeneration using shared feature encoders, Axion reduced feature generation time from weeks to hours. The platform evolved from a complex normalized architecture to a simpler design combining Iceberg tables for bulk storage and EVCache for low-latency queries, achieving 3x-50x faster query performance for specific access patterns. The system now serves as the primary data source for all Netflix personalization ML models, with comprehensive data quality monitoring that has identified over 95% of data issues early and significantly improved pipeline stability."
mlops:
  source: "sqlite"
  entryId: 27
  sourceUrl: "https://netflixtechblog.com/evolution-of-ml-fact-store-5941d3231762"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060602"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Netflix's personalization ML models require training on several weeks of historical data to generate high-quality recommendations. The core challenge Axion addresses is the time required to experiment with new or modified feature encoders. When ML researchers want to test a new feature, they face two options: feature logging or feature regeneration.

Feature logging involves deploying updated feature encoders to production compute applications and waiting for them to log feature values over time. Since models train on several weeks of data, this approach requires waiting weeks to collect sufficient training data before an experiment can be evaluated. This creates an unacceptable experimentation cycle time for a fast-moving ML organization.

The alternative approach is feature regeneration, which requires access to historical facts. If the raw facts that were available at inference time can be stored and replayed, features can be regenerated using updated feature encoders in hours rather than weeks. However, this introduces a critical requirement: temporal accuracy. The system must be able to regenerate the exact set of features that were generated for recommendations at a specific point in time to avoid training-serving skew.

Training-serving skew occurs when the features used during model training differ from those used during inference. This can happen due to differences in data availability, data transformations, or feature encoding logic between offline and online environments. Eliminating this skew is essential for ensuring that offline model performance translates to production performance.

## Architecture & Design

Axion's architecture consists of four primary components: the fact logging client, ETL pipelines, the query client, and data quality infrastructure. These components integrate with Netflix's broader ML platform, which includes compute applications, offline feature generators, and shared feature encoders.

### Data Flow and Component Interaction

The data flow begins with compute applications that generate recommendations for Netflix members. These applications fetch facts from various gRPC services across Netflix's infrastructure, including viewing history services and video metadata services. Facts represent data about members or videos at a specific moment in time—for example, which videos a member had watched or added to their My List, or metadata about video length.

After fetching facts and generating features using shared feature encoders, compute applications use Axion's fact logging client to asynchronously log these facts. The logging client collects all facts and metadata into a protobuf, compresses it, and sends it to the Keystone real-time stream processing platform. Keystone aggregates facts from different cloud regions into a single AWS region and outputs data to an Iceberg table.

Offline feature generators run as Spark applications that enable on-demand generation of features using new, existing, or updated feature encoders. These applications query historical facts from Axion and apply the same shared feature encoders used in production compute applications, ensuring no training-serving skew occurs.

### Storage Layer Evolution

The storage architecture evolved significantly over time. The initial approach normalized incoming data across multiple tables to optimize storage and theoretically improve query efficiency. However, this design proved inefficient at Netflix's scale. Joining several large tables at query time caused Spark shuffle issues that made queries fail or run extremely slowly.

The team pivoted to a denormalized approach, storing all facts and metadata in a single Iceberg table using nested Parquet format. While less storage-optimized than normalization, Parquet compression provided significant storage savings, and the denormalized structure made Spark queries succeed. However, query performance remained slow despite optimization attempts with bloom filters and predicate pushdown.

The core performance problem stemmed from query patterns. ML models require different subsets of Axion's data, with queries often filtering hundreds of millions of rows down to less than a million. Even with bloom filters, queries downloaded all data from S3 before filtering, creating massive inefficiency. Since label datasets were random, presorting data provided no benefit.

### Hybrid Storage Strategy

To address query performance limitations, Axion implemented a hybrid storage strategy combining Iceberg tables with EVCache, a key-value store. The system analyzes query patterns and stores facts and indices optimized for these patterns in EVCache. For queries by member ID, the system first queries an index to find keys for that member's facts, then queries those facts from EVCache in parallel.

This approach makes multiple calls to the key-value store for each row in the training set, but even accounting for these multiple calls, query performance improved by an order of magnitude. Depending on the use case, EVCache queries are 3x-50x faster than Iceberg queries. The trade-off is cost—EVCache is more expensive than Iceberg storage, so the amount of data stored must be limited. For queries requesting data not available in EVCache, the system falls back to querying Iceberg.

## Technical Implementation

### Infrastructure Choices

Axion leverages several key Netflix infrastructure components:

**Keystone** serves as the real-time stream processing platform. The team chose Keystone for its ease of use, reliability, scalability, and ability to aggregate facts from different cloud regions into a single AWS region. While concentrating all data in one region creates a single point of failure, the team determined this trade-off was worthwhile given the significant reduction in operational overhead for ETL pipelines.

Currently, all facts flow through a single Keystone stream configured to write to a single Iceberg table. The team plans to split this into multiple streams for horizontal scalability as data volumes grow.

**Iceberg** provides the foundation for bulk data storage. Iceberg tables store large volumes of denormalized data in nested Parquet format, providing a reliable and cost-effective storage layer for historical facts spanning weeks of data.

**EVCache** serves as the low-latency query layer. This distributed key-value store enables fast lookups for specific query patterns, particularly queries by member ID. The system stores both facts and indices in EVCache to support efficient parallel retrieval.

**Spark** powers both ETL pipelines and offline feature generation. Spark applications transform raw data from Keystone into the denormalized Iceberg format and enable ML researchers to regenerate features at scale using historical facts.

### Logging Client Evolution

The initial logging client design attempted premature optimization by deduplicating facts at logging time and applying different compression methods for each fact type to optimize storage and network I/O. While this reduced data volume, it limited the metadata available for query optimization and created complexity.

The team simplified the logging client to asynchronously collect all facts and metadata into a protobuf, compress it, and send it to Keystone. This simpler design removed complexity from the logging path and preserved maximum information for downstream optimization.

### Shared Feature Encoders

A critical design principle is the use of shared feature encoders between compute applications and offline feature generators. The same code generates features during online inference and offline training data preparation. Combined with the ability to access the same historical facts, this sharing ensures temporal accuracy and eliminates training-serving skew.

## Data Quality Infrastructure

Over years of operation, Netflix learned that comprehensive data quality checks are essential for Axion. Data corruption can significantly impact production model performance and A/B test results. For Axion to become the defacto fact store across Netflix, ML research teams needed to trust the data quality.

The team categorized data corruption along three dimensions:

- **Impact on values**: Was data missing? Did new values appear unintentionally? Were values replaced?
- **Spread of corruption**: Did corruption impact rows or columns? Single pipeline or multiple pipelines?
- **Source of corruption**: Was data corrupted outside Axion, by Axion components, or at rest?

### Three-Pronged Monitoring Approach

**Aggregations** leverage the predictability of data volume logged to Axion. Compute applications follow daily trends—some log consistently every hour, others log only during specific hours. The system aggregates counts on dimensions including total records, compute application, and fact counts. A rule-based approach validates counts are within certain thresholds of past trends and triggers alerts when counts vary outside these thresholds. This approach effectively detects missing or new data with row-level and pipeline-level impact, though it rarely catches column-level issues.

**Consistent sampling** samples a small percentage of data based on a predictable member ID hash and stores it in separate tables. By maintaining consistent sampling across different data stores and pipelines, the team can run canaries on smaller subsets and get quick results. Canary output is compared against production to detect unintended changes during new code deployments. The downside is that consistent sampling may miss rare issues if the corruption rate is significantly lower than the sampling rate. This approach effectively detects attribute-level impacts, columnar impact, and single pipeline issues.

**Random sampling** addresses gaps left by the other strategies. The system randomly queries subsets of both hot data (recently logged) and cold data (logged long ago) multiple times every hour. When these queries fail, it indicates either bad data or infrastructure issues. While characterized as an "I'm feeling lucky" strategy, random sampling provides value by catching issues that slip through other checks.

Random sampling also maintains quality for unused facts. A significant percentage of facts logged to Axion are not actively read by current pipelines, but these facts must remain high quality for future use. Pipelines randomly read unused facts and alert when queries don't produce expected output.

These three monitoring approaches, deployed over two years ago, have identified more than 95% of data issues early and significantly improved the stability of customer pipelines.

## Scale & Performance

While the article doesn't provide specific throughput numbers, it indicates that Axion handles query patterns involving hundreds of millions of rows, with filtering down to less than a million rows in extreme cases. The scale is substantial enough that Spark shuffle operations on joined tables caused failures, necessitating the architectural evolution.

The performance improvements from the hybrid storage strategy are quantified: EVCache queries are 3x-50x faster than Iceberg queries depending on the use case. The time to generate features for experimentation decreased from weeks (with feature logging) to hours (with on-demand regeneration using Axion).

The system supports all Netflix personalization ML models, which number in the tens based on references to the broader ML platform. Training datasets span several weeks of historical data, requiring substantial storage and query capacity.

## Trade-offs & Lessons

### Design Philosophy Evolution

The team's primary learning was to start with simple designs and avoid premature optimization that adds complexity. Early versions of the logging client optimized for storage by deduplicating facts and optimized for network I/O using compression, but these optimizations limited flexibility for query optimization. The team learned to pay storage, network, and compute costs initially, allowing the design to adapt as real customer use cases emerged.

When complexity is necessary, the team learned to concentrate it in the fewest components rather than spreading it across the system. The fact logging client should be simple with minimal business logic, while the query client can be functionality-rich where needed.

### Infrastructure Trade-offs

The decision to aggregate all data into a single AWS region through Keystone creates a single point of failure but significantly reduces operational overhead. This trade-off prioritizes operational simplicity over theoretical resilience, reflecting pragmatic engineering judgment about where to invest complexity.

The hybrid storage strategy with Iceberg and EVCache trades cost for performance. EVCache is more expensive than Iceberg, so data storage in EVCache must be limited. The team wants to optimize EVCache storage to enable storing more data, but current constraints require maintaining both storage tiers.

### Testing and Migration Lessons

The team learned they should have invested earlier in robust testing frameworks. Unit tests and integration tests were insufficient—scalability testing and performance testing proved essential for system stability. Without comprehensive performance testing, they encountered issues requiring weeks to clean up.

Running data migrations and pushing breaking API changes should happen as early as possible. As more customers adopted Axion, migrations and breaking changes became increasingly difficult to execute.

### Current Limitations

The current design doesn't serve all use cases well. Bandit algorithms present challenges because the design limits storing a map per row, creating limitations when compute applications need to log multiple values for the same key. This represents an area for future architectural evolution.

The split across a single Keystone stream and single Iceberg table limits horizontal scalability. Plans exist to split into multiple streams, but this represents technical debt from the initial design.

### Broader Impact

Axion has become the primary data source for all Netflix personalization ML models for offline feature generation. Its success in eliminating training-serving skew and reducing feature generation latencies has positioned it to become the defacto fact store for other ML use cases within Netflix beyond personalization.

The comprehensive data quality monitoring has built trust with ML research teams, which is essential for platform adoption. More than 95% early detection of data issues demonstrates the value of investing in monitoring infrastructure alongside core functionality.

This case study illustrates how ML platform components must evolve through real-world usage. Netflix's willingness to simplify complex designs, make pragmatic infrastructure trade-offs, and invest in data quality monitoring enabled Axion to scale from an initial prototype to a critical component of Netflix's ML infrastructure supporting all personalization models.
