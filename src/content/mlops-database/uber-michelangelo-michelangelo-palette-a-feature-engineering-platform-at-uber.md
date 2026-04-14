---
title: "Michelangelo Palette: A Feature Engineering Platform at Uber"
slug: "uber-michelangelo-michelangelo-palette-a-feature-engineering-platform-at-uber"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "feast"
  - "spark"
  - "tecton"
  - "data-ingestion"
  - "deployment"
  - "feature-engineering"
  - "monitoring"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo"
contentType: "transcript"
summary: "Uber built Michelangelo Palette, a feature engineering platform that addresses the challenge of creating, managing, and serving machine learning features consistently across offline training and online serving environments. The platform consists of a centralized feature store organized by entities and feature groups, with dual storage using Hive for offline/historical data and Cassandra for low-latency online retrieval. Palette enables three patterns for feature creation: batch features via Hive/Spark queries, near-real-time features via Flink streaming SQL, and external \"bring your own\" features from microservices. The system guarantees training-serving consistency through automatic data synchronization between stores and a Transformer framework that executes identical feature transformation logic in both offline Spark pipelines and online serving environments, achieving single-digit millisecond P99 latencies while joining billions of rows during training."
link: "https://www.infoq.com/presentations/michelangelo-palette-uber/"
year: 2019
seo:
  title: "Uber: Michelangelo Palette: A Feature Engineering Platform at Uber - ZenML MLOps Database"
  description: "Uber built Michelangelo Palette, a feature engineering platform that addresses the challenge of creating, managing, and serving machine learning features consistently across offline training and online serving environments. The platform consists of a centralized feature store organized by entities and feature groups, with dual storage using Hive for offline/historical data and Cassandra for low-latency online retrieval. Palette enables three patterns for feature creation: batch features via Hive/Spark queries, near-real-time features via Flink streaming SQL, and external \"bring your own\" features from microservices. The system guarantees training-serving consistency through automatic data synchronization between stores and a Transformer framework that executes identical feature transformation logic in both offline Spark pipelines and online serving environments, achieving single-digit millisecond P99 latencies while joining billions of rows during training."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-michelangelo-palette-a-feature-engineering-platform-at-uber"
  ogTitle: "Uber: Michelangelo Palette: A Feature Engineering Platform at Uber - ZenML MLOps Database"
  ogDescription: "Uber built Michelangelo Palette, a feature engineering platform that addresses the challenge of creating, managing, and serving machine learning features consistently across offline training and online serving environments. The platform consists of a centralized feature store organized by entities and feature groups, with dual storage using Hive for offline/historical data and Cassandra for low-latency online retrieval. Palette enables three patterns for feature creation: batch features via Hive/Spark queries, near-real-time features via Flink streaming SQL, and external \"bring your own\" features from microservices. The system guarantees training-serving consistency through automatic data synchronization between stores and a Transformer framework that executes identical feature transformation logic in both offline Spark pipelines and online serving environments, achieving single-digit millisecond P99 latencies while joining billions of rows during training."
mlops:
  source: "sqlite"
  entryId: 11
  sourceUrl: "https://www.infoq.com/presentations/michelangelo-palette-uber/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060436"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Uber identified feature engineering as one of the biggest bottlenecks in productionizing machine learning models across the company. The presentation uses Uber Eats ETA prediction as a motivating example, illustrating how data scientists need features like order size, restaurant busyness, typical restaurant preparation times, and regional traffic conditions to build accurate models.

The platform team identified four critical pain points that Palette aims to solve. First, data scientists struggle to discover and start with good features amid abundant but scattered data across the organization. Second, even when features work in experimental offline models, making them work at production scale and in real-time environments with low latency requirements proves extremely difficult. Third, the offline-online divide creates training-serving skew, where features used during model training differ from those available during real-time inference, leading to bugs that are notoriously hard to debug. Fourth, the industry shift toward real-time features based on the latest state of the world requires working with unfamiliar technologies like Kafka streams and microservices rather than traditional SQL and data warehouse tables that data scientists know well.

Beyond individual pain points, Uber observed massive feature redundancy across teams. The same features, like "trips a driver took daily," would be reimplemented by ten different teams, wasting engineering resources and creating inconsistencies where different models operated on different versions of conceptually identical data. This fragmentation undermined model quality and made cross-team collaboration nearly impossible.

## Architecture & Design

Michelangelo Palette is built as a subsystem within Uber's broader Michelangelo ML platform, which provides end-to-end ML workflow capabilities including data management, model training across heterogeneous tools, deployment to batch/online/mobile environments, and drift detection for features and model performance.

The feature store itself uses a hierarchical organization scheme. At the top level, features are organized by entities such as riders, drivers, restaurants, and trips. The second level introduces feature groups, which are logical collections of related features typically originating from the same pipeline or job. The third level is the individual feature name representing a specific data attribute. The fourth critical element is the join key, which is metadata telling the feature store how to look up a feature - for example, using restaurant_id to retrieve restaurant-related features. Features are uniquely identified using a Palette expression syntax combining these elements.

The implementation follows a dual-store lambda-style architecture designed to serve both offline training and online serving workloads. The offline data system uses Hive, Uber's data warehouse, which stores daily snapshots of features designed for bulk retrieval by training jobs. This system is optimized for time-aware queries, allowing training pipelines to retrieve feature values as they existed at specific historical points in time, which is essential for creating proper training datasets that avoid data leakage. The system handles joins across billions of rows with significant engineering investment in scalability optimizations.

The online store pairs with the offline system using Cassandra, a key-value store chosen for low-latency serving. Unlike the offline store's historical snapshots, the online store maintains only the latest known values of features, serving them in single-digit millisecond P99 latencies. The architecture achieves training-serving consistency through automatic bidirectional data synchronization: features ingested into the offline store automatically copy to the online store, while real-time features ingested into the online store get ETL'd back to the offline store, making them available for training with backfill support where possible.

The Transformer framework extends Apache Spark's Transformer-Estimator pattern to work across both offline and online environments. Transformers represent individual stages in the feature engineering pipeline, taking input records and modifying, adding, or removing fields. Offline transformers leverage standard Spark DataFrames, while online transformers implement a score_instance function that operates on simple map-based inputs and outputs rather than DataFrames. Consistency between online and offline behavior is guaranteed by defining transformation logic as user-defined functions (UDFs) that are registered and used identically in both the Spark map function and the online score_instance function.

## Technical Implementation

Palette provides three distinct patterns for creating features, each targeting different data source types and latency requirements. The batch feature pattern leverages Uber's existing data warehouse infrastructure. Users write Hive SQL queries or custom Spark jobs, provide minimal metadata to the Palette feature store, and the system automatically productionizes the pipeline. Behind the scenes, Palette integrates with Uber's workflow infrastructure called Piper to create scheduled jobs, automatically configure alerts and monitoring, and handle on-call notifications for data outages. The resulting features are ingested into the offline store via Palette APIs and automatically synchronized to the online Cassandra store for serving.

The near-real-time feature pattern uses Flink, Uber's stream processing infrastructure, as a first-class citizen. Users can write Flink SQL queries that operate on Kafka topics, perform streaming aggregations or transformations, and produce features into the store. The example in the presentation shows aggregating minute-level data from a Kafka topic into five-minute aggregates for restaurant busyness. Uber's Flink infrastructure offers a service model where jobs can be created on demand through Palette without users writing custom Flink applications. Features from this pattern are first ingested into the online Cassandra store, then automatically ETL'd to the offline Hive store with backfill support leveraging Flink's capabilities to make streaming features available for historical training.

The third pattern, "bring your own features," addresses edge cases where neither warehouse tables nor Kafka streams contain the needed data. This unmanaged mode allows users to register features in the store that point to external endpoints like microservices. Users provide service endpoint information and use a small DSL to extract features from RPC results. The traffic conditions example in the presentation shows registering a feature that queries an external traffic service. The critical caveat is that users are responsible for managing both online and offline data availability themselves, including logging RPC results and ETL'ing them into custom stores to make data available for training.

The Transformer framework supports several specialized transformer types for feature consumption. Palette feature retrieval transformers fetch features from the store using the expression syntax. DSL transformers enable feature manipulation using domain-specific language, such as converting latitude/longitude coordinates into geohash region identifiers. Feature imputation estimators handle missing values by computing statistics from training datasets, such as using average prep time across all restaurants when a specific restaurant lacks historical data. Standard ML transformers for string indexing, one-hot encoding, and model inference stages integrate seamlessly with Palette-specific transformers in the unified pipeline.

The implementation uses code generation to optimize online serving performance. Pipeline specifications written in the transformer DSL are compiled into Java bytecode, avoiding runtime parsing overhead for every query. This compilation step is crucial for achieving the single-digit millisecond latencies required for real-time serving.

Development tooling leverages Spark's MLreadable and MLwritable interfaces for pipeline serialization and deserialization. Users author pipelines interactively in IPython notebooks provided by Uber, describing sequences of Palette retrievals, DSL transformations, and standard Spark ML stages. The system supports uploading both trained models for serving and training specifications for automated retraining. Behind the scenes, Uber's workflow infrastructure performs optimizations to make pipelines scalable and production-ready with built-in reliability and monitoring.

## Scale & Performance

The presentation emphasizes several scale-related achievements, though specific numeric metrics are limited. The offline feature join system handles billions of rows during training, requiring significant engineering investment in scalability optimizations. The team specifically mentions optimizing the time-aware join operation, which retrieves feature values as they existed at historical points in time, across massive datasets.

For online serving, the platform achieves single-digit millisecond P99 latencies despite features being scattered across multiple storage systems. This performance relies on extensive parallelism and caching optimizations in the feature retrieval layer. The system successfully handles the complexity of fetching and joining features from distributed Cassandra clusters while maintaining these strict latency requirements.

The platform's design supports heterogeneous ML workloads across Uber, including supervised learning, unsupervised learning, and deep learning models using various frameworks including TensorFlow. TensorFlow models integrate through the transformer framework, allowing TensorFlow-specific feature engineering like embedding encoding to coexist with Palette transformations in unified pipelines.

## Trade-offs & Lessons

The presentation reveals several important design trade-offs and insights from building a production feature platform at scale. The team explicitly frames training-serving consistency as "controlled inconsistency" rather than strict consistency. The offline store retrieves features as they existed at specific historical points in time, while the online store serves current values. This temporal difference is intentional and critical for preventing data leakage in training, representing a fundamental design decision rather than a limitation.

The choice to support multiple feature creation patterns reflects pragmatism about diverse data sources and team capabilities within a large organization. Rather than forcing all features through a single ingestion path, Palette accommodates batch warehouse queries, streaming Flink jobs, and external service endpoints. This flexibility comes at the cost of increased system complexity and the challenge of ensuring consistent behavior across patterns, but enables broader adoption across teams with different technical constraints.

The decision to leverage existing Uber infrastructure rather than build everything from scratch emerges as a key architectural principle. The platform uses Hive for warehousing, Flink for streaming, Cassandra for key-value storage, Piper for workflow orchestration, and Spark for transformation execution. Each system has matured in its optimal role, and Palette acts as an integration layer that makes these technologies accessible through a unified feature engineering interface. This approach trades some degree of control for faster development and better operational support by relying on infrastructure teams already running these systems at scale.

The feature sharing problem proves more complex than pure technology can solve. While Palette provides centralized storage and discovery, actual cross-team feature reuse requires building trust through tooling that shows data distribution, anomalies, reliability metrics, and feature quality indicators. The team's work on automatic feature selection tools helps by surfacing features correlated with labels, enabling discovery of relevant features built by other teams. Feature proliferation and redundancy remain challenges addressed through code review processes and emerging tools to detect duplicate or highly correlated features, though these mechanisms are acknowledged as imperfect.

The transformer framework's design makes an explicit trade-off between flexibility and complexity. Extending Spark's transformer pattern to work in both batch and online contexts requires careful engineering to ensure consistency, but provides powerful expressiveness for complex feature engineering chains. The example of looking up restaurant location, converting to geohash region ID, then querying regional busyness demonstrates multi-hop feature dependencies that would be difficult to express in simpler systems.

The presentation acknowledges that different parts of the ML lifecycle have different feature engineering needs. Palette's transformers focus on feature retrieval, feature manipulation, and imputation, while model-specific transformations like categorical encoding and decision threshold calibration are handled by standard Spark ML transformers. This separation of concerns allows Palette to focus on the feature platform problem while integrating naturally with existing ML workflows.

The "bring your own features" pattern represents an intentional escape hatch for cases that don't fit the managed patterns. By allowing unmanaged features with user responsibility for data availability, Palette avoids becoming a bottleneck for edge cases while still providing value through centralized registration, serving integration, and consistent access patterns. This design accepts that some features will be harder to maintain in exchange for not blocking teams with unique requirements.

The Q&A section reveals ongoing challenges around feature discovery and trust. While teams do share features, adoption hasn't reached the desired level. The team identifies tooling gaps around feature quality visibility as a primary barrier, reinforcing that feature platforms require investment beyond storage and retrieval infrastructure. Building automated feature selection tools that demonstrate feature-label correlation helps build confidence in using features created by other teams.

The decision to expose multiple APIs (Hive SQL, Flink SQL, Spark transformers, DSL) through a unified Python interface in IPython notebooks reflects a focus on user experience over API purity. Different stages of the feature lifecycle use different technologies, and Palette aims to provide consistent naming and concepts across these APIs rather than forcing everything through a single abstraction that would be suboptimal for some use cases.
