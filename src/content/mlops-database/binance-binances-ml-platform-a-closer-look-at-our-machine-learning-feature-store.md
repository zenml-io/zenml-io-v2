---
title: "A Closer Look at Our Machine Learning Feature Store"
slug: "binance-binances-ml-platform-a-closer-look-at-our-machine-learning-feature-store"
draft: false
mlopsTags:
  - "data-versioning"
  - "feature-store"
  - "model-serving"
  - "feast"
  - "sagemaker"
  - "spark"
  - "tecton"
  - "data-prep"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "finance"
company: "Binance"
companySlug: "binance"
platformName: "Binance's ML platform"
contentType: "blog"
summary: "Binance built a centralized machine learning feature store to address critical challenges in their ML pipeline, including feature pipeline sprawl, training-serving skew, and redundant feature engineering work. The implementation leverages AWS SageMaker Feature Store with both online and offline storage, serving features for model training and real-time inference across multiple teams. By centralizing feature management through a custom Python SDK, they reduced batch ingestion time from three hours to ten minutes for 100 million users, achieved 30ms p99 latency for their account takeover detection model with 55 features, and significantly minimized training-serving skew while enabling feature reuse across different models and teams."
link: "https://www.binance.com/en/blog/all/a-closer-look-at-our-machine-learning-feature-store-3411614684128221181"
year: 2022
seo:
  title: "Binance: A Closer Look at Our Machine Learning Feature Store - ZenML MLOps Database"
  description: "Binance built a centralized machine learning feature store to address critical challenges in their ML pipeline, including feature pipeline sprawl, training-serving skew, and redundant feature engineering work. The implementation leverages AWS SageMaker Feature Store with both online and offline storage, serving features for model training and real-time inference across multiple teams. By centralizing feature management through a custom Python SDK, they reduced batch ingestion time from three hours to ten minutes for 100 million users, achieved 30ms p99 latency for their account takeover detection model with 55 features, and significantly minimized training-serving skew while enabling feature reuse across different models and teams."
  canonical: "https://www.zenml.io/mlops-database/binance-binances-ml-platform-a-closer-look-at-our-machine-learning-feature-store"
  ogTitle: "Binance: A Closer Look at Our Machine Learning Feature Store - ZenML MLOps Database"
  ogDescription: "Binance built a centralized machine learning feature store to address critical challenges in their ML pipeline, including feature pipeline sprawl, training-serving skew, and redundant feature engineering work. The implementation leverages AWS SageMaker Feature Store with both online and offline storage, serving features for model training and real-time inference across multiple teams. By centralizing feature management through a custom Python SDK, they reduced batch ingestion time from three hours to ten minutes for 100 million users, achieved 30ms p99 latency for their account takeover detection model with 55 features, and significantly minimized training-serving skew while enabling feature reuse across different models and teams."
mlops:
  source: "sqlite"
  entryId: 144
  sourceUrl: "https://www.binance.com/en/blog/all/a-closer-look-at-our-machine-learning-feature-store-3411614684128221181"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061861"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Binance faced several critical challenges in their machine learning infrastructure that motivated the development of a centralized feature store. The primary pain points emerged from operating ML pipelines at scale for the world's largest cryptocurrency exchange, where accurate and consistent predictions are essential for use cases like account takeover (ATO) detection and fraud prevention.

Before implementing the feature store, Binance's ML pipeline suffered from what they describe as "feature pipeline sprawl." In their previous architecture, the model training and inference service components operated independently without visibility into which features already existed and could be reused. This architectural deficiency forced teams to duplicate the entire feature engineering process for each new model, creating redundant pipelines and duplicate features across the organization. As the business grew and more users joined the platform, maintaining this sprawl became increasingly expensive and unmanageable.

The duplication problem created a vicious cycle of inefficiency. Data scientists had to restart the lengthy and tedious feature engineering process entirely from scratch for each new model they developed. This not only wasted engineering resources but also significantly extended the time required to run ML experiments and deploy new models to production.

Perhaps more critically, the reimplementation of feature logic across multiple pipelines introduced severe training-serving skew. This skew represents a discrepancy between the data used during model training and the data encountered during inference in production. Such inconsistencies lead to inaccurate predictions and unpredictable model behavior that becomes extremely difficult to troubleshoot once deployed. Before the feature store, data scientists relied on manual sanity checks to verify feature consistency between training and serving environments—a time-consuming process that diverted attention from higher-priority tasks like thoughtful modeling and insightful feature engineering.

The team needed a solution that would enable feature reuse across teams and models, dramatically shorten experiment cycles, and eliminate the training-serving skew that undermined prediction accuracy. These requirements drove the decision to implement a centralized feature store as the foundational component of their ML infrastructure.

## Architecture & Design

Binance's feature store architecture follows the standard dual-store pattern implemented by major cloud providers and enterprise feature store solutions. The system functions as a central hub that serves both phases of the ML pipeline: model training and inference service. Instead of features flowing through multiple independent pipelines, all feature engineering processes—including transformation and aggregation—are performed once and stored centrally for reuse.

The architecture consists of two distinct storage layers, each optimized for different access patterns and use cases:

**Online Feature Store**: This component stores the most recent copy of features and is designed specifically for real-time inference scenarios. The online store must deliver features with low millisecond latency to support production serving requirements. Performance in this layer is measured primarily by latency metrics, with the actual speed depending on payload size. For context, Binance's account takeover detection model utilizes eight feature groups containing 55 features in total, and the online store delivers these features with approximately 30ms p99 latency.

**Offline Feature Store**: This component functions as an append-only storage system that maintains all historical feature values, enabling time-travel capabilities that help prevent data leakage during model training. Data in the offline store is persisted in Parquet format with time-partitioning to maximize read efficiency during batch operations. Performance for the offline store is measured by throughput rather than latency, as it serves batch prediction workloads and model training jobs that process large volumes of historical data.

A critical architectural decision ensures feature consistency between the online and offline stores. When a feature group is configured for both online and offline usage, the system automatically and internally copies data to the offline store while features are being ingested into the online store. This design guarantees that training and inference use identical feature definitions and transformations, effectively eliminating the training-serving skew problem.

The feature store sits between upstream data sources and downstream consumers. Data scientists interact with the feature store through a custom-built Python SDK that provides intuitive interfaces for searching, discovering, and reusing features. This SDK abstracts away the complexity of the underlying infrastructure, allowing data scientists to define features and build models without concerning themselves with the tedious data engineering processes happening in the backend.

The architecture also includes a store layer that funnels features into the centralized database. This layer implements intelligent ingestion logic that optimizes for efficiency and cost, only processing features that have actually changed rather than blindly updating all features on every pipeline run.

## Technical Implementation

Binance selected AWS SageMaker Feature Store as their underlying platform, though they note that developers could choose from various enterprise options including Google Vertex AI (Feast), Azure (Feathr), Iguazio, or Tecton, or even open-source alternatives depending on the organization's tech stack.

The implementation leverages AWS SageMaker's dual-store architecture:

**Online Store Technical Details**: Built on a low-latency database optimized for single-record lookups, the online store maintains only the current state of each feature. The underlying storage technology is optimized for point queries with predictable latency characteristics. Binance has validated that their ATO model, which requires retrieving 55 features across eight feature groups, consistently achieves 30ms at the 99th percentile latency.

**Offline Store Technical Details**: Implemented as an S3-backed data store, the offline store uses Parquet columnar format for efficient analytical queries. Time-partitioning enables the system to efficiently query historical feature values at specific points in time, which is essential for creating point-in-time correct training datasets that avoid data leakage. The append-only nature of the store maintains a complete audit trail of all feature value changes over time.

The custom Python SDK provides the primary interface for data scientists. This SDK simplifies common operations like feature discovery, feature group creation, and feature retrieval for both training and inference. The code interface hides substantial complexity—what might require dozens of lines of data engineering code is reduced to simple import statements and method calls.

The ingestion pipeline incorporates sophisticated optimization logic. Rather than treating all features uniformly, the system implements two key best practices:

**Conditional Ingestion**: The pipeline only ingests features that have changed since the last ingestion cycle. This optimization dramatically reduces the volume of data written to the feature store and helps stay within API throttling limits. For example, with a hypothetical 10K TPS throttling limit for PutRecord operations on the online feature store, attempting to ingest features for 100 million users simultaneously would be impossible and would take approximately 2.7 hours at maximum throughput.

**Logical Feature Group Separation**: Features are divided into two logical groups based on update frequency—active user operations and inactive features. This separation recognizes that when features are combined in a single logical feature group, a large portion may be inactive (unchanged since the last ingestion), while only a subset represents active user operations. By separating these into distinct feature groups, the ingestion process can skip updating inactive features entirely.

These optimizations delivered dramatic performance improvements. For inactive features serving 100 million users on an hourly batch pipeline, the team reduced ingestion volume by 95%. Even for active features, they achieved a 20% reduction in data requiring ingestion. The combined effect reduced the batch ingestion pipeline processing time from three hours to just ten minutes for 100 million users' worth of features.

## Scale & Performance

Binance operates their feature store at impressive scale, reflecting the demands of the world's largest cryptocurrency exchange. The concrete performance metrics and scale characteristics demonstrate the production-readiness of their implementation:

**User Scale**: The system serves features for 100 million users, processing updates on an hourly basis for batch pipelines while also supporting real-time feature updates for online serving.

**Latency Performance**: The online feature store delivers 30ms p99 latency for the account takeover detection model, which requires retrieving 55 features organized across eight feature groups. This latency is low enough to support real-time fraud detection and risk assessment without introducing noticeable delays in user-facing operations.

**Throughput Optimization**: Through intelligent ingestion strategies, the team reduced batch processing time from approximately three hours to ten minutes—an 18x improvement. This optimization came from two sources: a 95% reduction in data volume for inactive features and a 20% reduction for active features.

**Throttling Considerations**: The team operates within AWS SageMaker's PutRecord API limits, which they reference as approximately 10K TPS in their example scenarios. Managing ingestion patterns to stay within these limits while processing 100 million user records required the sophisticated conditional update logic they implemented.

**Feature Complexity**: Production models like the ATO detector use eight feature groups containing 55 total features, demonstrating the system's ability to efficiently serve multi-group feature sets with low latency.

**Storage Efficiency**: The offline store uses Parquet format with time-partitioning, enabling efficient queries over historical data without requiring full table scans. This design supports both model training workloads that need large historical datasets and point-in-time queries that require specific feature values at particular timestamps.

## Trade-offs & Lessons

Binance's feature store implementation reveals several important lessons and trade-offs that practitioners should consider when building similar systems.

**The Value of Centralization**: The transition from distributed, duplicated feature pipelines to a centralized feature store delivered transformational benefits. Feature reuse became practical, eliminating redundant engineering work. Training-serving consistency became guaranteed rather than manually verified. Experiment velocity increased as data scientists could leverage existing features rather than rebuilding everything from scratch. However, this centralization also creates a critical dependency—the feature store becomes a single point of failure that must be operated with high reliability.

**Platform Selection**: Binance chose AWS SageMaker Feature Store, which provided the dual online/offline architecture they needed without requiring them to build and operate the underlying storage infrastructure. This build-versus-buy decision favored leveraging a managed service, allowing the team to focus on feature engineering and ML development rather than database operations. The trade-off is vendor lock-in and dependency on AWS's API limits and pricing model. They acknowledge that other teams might choose Google Vertex AI (Feast), Azure (Feathr), open-source Feast, or other alternatives based on existing tech stack and requirements.

**Optimization is Essential at Scale**: Operating at 100 million users revealed that naive implementation patterns don't scale. The initial approach of updating all features for all users on every pipeline run was fundamentally incompatible with API throttling limits and would have required nearly three hours per batch. The optimization strategies—conditional updates and logical group separation—were not optional nice-to-haves but essential requirements for operating at scale. Teams building feature stores should plan for these optimizations from the start rather than treating them as future enhancements.

**The Inactive Feature Insight**: The observation that most features for most users are inactive most of the time led to the 95% reduction in ingestion volume. This insight is likely applicable to many other domains beyond cryptocurrency—in most systems, the majority of entities are inactive at any given time. Designing ingestion pipelines to exploit this skewed distribution delivers massive efficiency gains.

**Abstraction Enables Productivity**: The custom Python SDK that "hides a lot of complexity" represents a key investment in developer experience. By providing simple, intuitive interfaces for feature discovery and retrieval, the team enabled data scientists to work at a higher level of abstraction. The trade-off is the effort required to build and maintain the SDK, but the productivity gains for the data science team clearly justify this investment.

**Training-Serving Skew as a Primary Concern**: Binance's emphasis on eliminating training-serving skew through guaranteed consistency between online and offline stores reflects hard-won experience. The manual sanity checking process they used previously was clearly painful enough to motivate architectural changes. The lesson for practitioners is that training-serving skew should be treated as a first-class architectural requirement, not something to address through testing and validation.

**Time-Travel and Data Leakage Prevention**: The offline store's append-only design with time-travel capabilities specifically addresses data leakage concerns. This design choice reflects sophisticated understanding of ML training pitfalls—without point-in-time correctness, it's easy to accidentally use future information during training, creating models that perform well in backtests but fail in production. The trade-off is increased storage costs from maintaining full history, but the correctness benefits make this worthwhile.

The overall implementation demonstrates mature MLOps thinking, with architectural decisions driven by real production requirements at scale rather than theoretical best practices. The concrete performance improvements—18x faster batch processing, elimination of manual consistency checking, 30ms inference latency—validate the approach and provide useful benchmarks for other organizations building similar systems.
