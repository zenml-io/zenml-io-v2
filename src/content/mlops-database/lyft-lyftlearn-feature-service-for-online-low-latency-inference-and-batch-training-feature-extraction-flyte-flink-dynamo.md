---
title: "Feature Service for Online Low-Latency Inference and Batch Training Feature Extraction (Flyte, Flink, DynamoDB, Redis)"
slug: "lyft-lyftlearn-feature-service-for-online-low-latency-inference-and-batch-training-feature-extraction-flyte-flink-dynamo"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "pipeline-orchestration"
  - "flyte"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Lyft"
companySlug: "lyft"
platformName: "LyftLearn"
contentType: "blog"
summary: "Lyft built a comprehensive Feature Service to solve the challenge of making machine learning features available for both model training and low-latency online inference, regardless of whether those features were computed via batch jobs on their data warehouse or via real-time event streams. The architecture uses SQL for feature definitions, Flyte for batch feature extraction and Flink for streaming features, DynamoDB as the primary feature store with Redis as a write-through cache, and Hive replication for training workloads. The system serves millions of requests per minute with single-digit millisecond latency and 99.99%+ availability, hosting thousands of features across numerous ML models including fraud detection, driver dispatch, pricing, and customer support while maintaining online-offline parity through shared feature definitions."
link: "https://eng.lyft.com/ml-feature-serving-infrastructure-at-lyft-d30bf2d3c32a"
year: 2021
seo:
  title: "Lyft: Feature Service for Online Low-Latency Inference and Batch Training Feature Extraction (Flyte, Flink, DynamoDB, Redis) - ZenML MLOps Database"
  description: "Lyft built a comprehensive Feature Service to solve the challenge of making machine learning features available for both model training and low-latency online inference, regardless of whether those features were computed via batch jobs on their data warehouse or via real-time event streams. The architecture uses SQL for feature definitions, Flyte for batch feature extraction and Flink for streaming features, DynamoDB as the primary feature store with Redis as a write-through cache, and Hive replication for training workloads. The system serves millions of requests per minute with single-digit millisecond latency and 99.99%+ availability, hosting thousands of features across numerous ML models including fraud detection, driver dispatch, pricing, and customer support while maintaining online-offline parity through shared feature definitions."
  canonical: "https://www.zenml.io/mlops-database/lyft-lyftlearn-feature-service-for-online-low-latency-inference-and-batch-training-feature-extraction-flyte-flink-dynamo"
  ogTitle: "Lyft: Feature Service for Online Low-Latency Inference and Batch Training Feature Extraction (Flyte, Flink, DynamoDB, Redis) - ZenML MLOps Database"
  ogDescription: "Lyft built a comprehensive Feature Service to solve the challenge of making machine learning features available for both model training and low-latency online inference, regardless of whether those features were computed via batch jobs on their data warehouse or via real-time event streams. The architecture uses SQL for feature definitions, Flyte for batch feature extraction and Flink for streaming features, DynamoDB as the primary feature store with Redis as a write-through cache, and Hive replication for training workloads. The system serves millions of requests per minute with single-digit millisecond latency and 99.99%+ availability, hosting thousands of features across numerous ML models including fraud detection, driver dispatch, pricing, and customer support while maintaining online-offline parity through shared feature definitions."
mlops:
  source: "sqlite"
  entryId: 87
  sourceUrl: "https://eng.lyft.com/ml-feature-serving-infrastructure-at-lyft-d30bf2d3c32a"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061258"
  lastUpdated: "2026-04-14T19:55:02.081264"
---

## Problem Context

Lyft's machine learning infrastructure faced a fundamental challenge that is common across the industry: features for ML models are computed through different mechanisms (batch jobs and real-time streams) but need to be accessed in multiple ways (batch queries for training and point lookups for online inference). This created a combinatorial problem where features computed via batch needed to be available both for historical training queries and for real-time serving, while features computed via streaming pipelines had the same dual-access requirement.

The motivating use cases at Lyft span the entire rider and driver experience. ML models power driver-passenger matching, ride pricing, coupon and incentive distribution, fraud detection, route planning, and automated support. Consider their example of a Cancels Model that predicts ride cancellation probability: this model needs the user's cancellation history over the past year (only available through batch computation on historical data in Hive) combined with the estimated price for the current ride (computed in real-time based on user actions flowing through Kafka). Both features must be available for training on historical data and for low-latency inference when a ride request occurs.

Without a unified feature serving infrastructure, teams would need to build and maintain separate pipelines for each combination of computation method and access pattern, leading to duplicated effort, inconsistent feature definitions between training and serving (the classic training-serving skew problem), and significant operational overhead.

## Architecture & Design

The Feature Service architecture comprises three core components that handle the complete lifecycle from definition through computation to retrieval.

**Feature Definitions** form the foundation of the system. Lyft chose SQL as the definition language due to its familiarity among their ML practitioners. Feature definitions can range from simple single-table queries to complex SQL spanning thousands of lines with intricate joins and transformations. Each SQL definition must designate one column as an entity ID (identifying business entities like drivers, passengers, or rides) with remaining columns representing features.

Features are organized into feature groups (also called entity types) for manageability when dealing with thousands of features. The versioning strategy is noteworthy: Lyft implements versioning at the individual feature level rather than at the group level. This granular approach enables faster iteration during model development since changing one feature doesn't require versioning the entire group. Features default to version 1 if no version is specified.

Beyond the SQL, feature metadata is captured in JSON format including the feature group, feature name, version, owner, data type, validation rules, and operational information such as which team to alert when feature generation breaks. This metadata-driven approach enables systematic validation and operational monitoring across the entire feature ecosystem.

**Feature Ingestion** handles the dual pathways of batch and streaming feature computation. For batch features, scheduled extraction jobs run on Flyte, Lyft's workflow orchestration platform. The frequency is configurable per feature, allowing different refresh rates based on feature requirements. These jobs execute the SQL definitions against Lyft's data warehouse and write results to the Feature Service.

For streaming features, custom Flink jobs leverage Lyft's in-house streaming technology to execute SQL queries over stream windows. These jobs process data from event streams like Kafka, running the same SQL-based feature definitions but against streaming data rather than batch warehouses, then writing computed features to the Feature Service.

**Feature Processing and Retrieval** implements the serving layer with careful attention to performance and consistency. The service exposes both gRPC and REST endpoints for writing and reading features. The write path includes validation against feature metadata before persisting to DynamoDB, where each row stores the most recent feature value for a particular feature. From DynamoDB, features replicate to both Hive (for training workloads) and Elasticsearch (for additional query capabilities).

The caching strategy uses Redis as a write-through cache for both feature values and feature metadata. This increases read throughput while maintaining consistency by updating cached values during writes. The architecture implements optimistic locking using DynamoDB conditional checks, ensuring that when multiple distributed callers attempt concurrent writes, the request with the latest timestamp wins.

The read path optimizes for low latency and high throughput by first checking Redis cache and falling back to DynamoDB only on cache misses. Reads happen via batch-get calls where clients request multiple feature values for given entities in a single request. The read path avoids locking to maximize throughput.

For training workloads that require large volumes of historical features (e.g., a year's worth of data), the system leverages the replicated Hive tables. Training processes query Hive directly to access historical feature values at scale without impacting the low-latency serving path.

## Technical Implementation

The technology stack reflects pragmatic choices balancing familiarity, performance, and operational maturity. SQL serves as the universal feature definition language, enabling ML practitioners to leverage existing skills while maintaining a declarative, version-controlled feature specification.

**Flyte** handles batch workflow orchestration, executing scheduled SQL queries against the data warehouse. Flyte's ability to manage complex dependencies and retries makes it suitable for production feature extraction pipelines that must run reliably at scale.

**Flink** powers the streaming feature computation path. Lyft uses custom Flink jobs integrated with their internal streaming infrastructure to apply SQL transformations to event streams. This approach unifies the feature definition language (SQL) across both batch and streaming computation modes.

**DynamoDB** serves as the primary online feature store, chosen for its low-latency point-lookup performance, managed scalability, and built-in support for conditional writes that enable the optimistic locking pattern. The schema stores the most recent feature value per feature, optimizing for the serving use case.

**Redis** provides write-through caching, reducing latency and increasing throughput for the high-volume read path. By caching both feature values and metadata, the system minimizes DynamoDB queries for frequently accessed features.

**Hive** serves as the historical feature repository for training. By replicating features from DynamoDB to Hive, the architecture separates training workloads (which need batch access to historical data) from serving workloads (which need point lookups of current values). This separation prevents training queries from impacting serving latency.

**Elasticsearch** provides additional indexing and query capabilities, though the article doesn't detail specific use cases. This suggests flexibility for more complex feature retrieval patterns beyond simple entity ID lookups.

The API layer supports both gRPC (for performance) and REST (for accessibility), allowing different clients to choose the appropriate protocol. The validation layer checks all writes against feature metadata, preventing invalid data from entering the system.

## Scale & Performance

The Feature Service demonstrates production-grade scale and reliability metrics that validate the architectural decisions. The system serves millions of requests per minute while maintaining single-digit millisecond latency, a critical requirement for real-time serving in applications like ride matching and pricing where every millisecond impacts user experience.

Availability reaches 99.99%+, translating to less than approximately 50 minutes of downtime per year. This high availability is essential given that the Feature Service sits in the critical path for core Lyft functionality like driver dispatch and fraud detection.

The platform hosts several thousand features across a large number of ML models. While exact feature and model counts aren't specified, the scale is significant enough to require the feature group abstraction for organizational purposes. The diversity of use cases—fraud detection, driver dispatch, location projections, growth platforms, pricing, and customer support—demonstrates horizontal adoption across Lyft's ML teams.

The system has been in production since Q4 2017, providing approximately three and a half years of battle-tested operation by the article's publication in March 2021. This longevity indicates architectural soundness and the ability to evolve with changing requirements.

## Trade-offs & Lessons

**Online-Offline Parity** represents a key architectural achievement and design philosophy. By defining features once in SQL and using those same definitions for both training and serving, the system eliminates a major source of training-serving skew. Both pipelines use identical validations and transformations, ensuring consistency. However, Lyft explicitly acknowledges an important trade-off: feature values are eventually consistent rather than strongly consistent between training and serving due to replication lag from DynamoDB to Hive. The team deemed this acceptable because replication delays fall within tolerable limits for their ML applications. This represents a pragmatic choice prioritizing system simplicity and performance over strict consistency.

**Versioning Granularity** at the feature level rather than feature group level demonstrates thoughtful design for developer velocity. During model development, features iterate frequently as data scientists experiment with different transformations and time windows. Feature-level versioning allows independent iteration without coordinating across all features in a group, reducing friction and enabling faster experimentation.

**SQL as the Feature Definition Language** leverages existing skills among ML practitioners rather than introducing a new DSL. The flexibility to write simple single-table queries or complex thousand-line transformations accommodates diverse feature engineering needs. This choice likely accelerated adoption since teams could apply familiar SQL skills rather than learning new abstractions.

**Write-Through Caching** with Redis represents a consistency-performance balance. Unlike write-behind caching (which could leave Redis stale), write-through caching ensures the cache updates during writes, maintaining consistency while still providing latency benefits for reads. The additional write latency is acceptable for feature updates (which happen on batch/streaming schedules) while maximizing performance for the high-volume read path.

**Optimistic Locking** via DynamoDB conditional checks handles the distributed nature of feature writers elegantly. Rather than implementing complex distributed locking, the system uses timestamps to resolve conflicts, allowing the most recent write to win. This approach trades occasional write rejections for better throughput and system simplicity.

**Separation of Training and Serving Storage** through DynamoDB-to-Hive replication prevents training workloads from impacting serving latency. Training queries scanning historical data could overwhelm a shared store, but by replicating to Hive, the architecture isolates these workloads. The trade-off is additional storage cost and replication complexity, which Lyft deemed worthwhile for workload isolation.

**Operational Metadata** including team ownership and alerting information embedded in feature definitions shows mature operational thinking. When feature generation breaks, the system knows which team to alert, reducing mean time to resolution and clarifying ownership boundaries in a large organization.

The architecture represents a successful example of building pragmatic MLOps infrastructure that solves real problems (training-serving consistency, dual batch/streaming computation, dual batch/point-lookup access) with proven technologies (SQL, DynamoDB, Redis, Hive, Flyte, Flink) rather than over-engineering. The multi-year production track record and broad adoption across Lyft teams validates the approach.
