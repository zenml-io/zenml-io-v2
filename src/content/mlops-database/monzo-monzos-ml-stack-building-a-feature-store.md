---
title: "Building a feature store"
slug: "monzo-monzos-ml-stack-building-a-feature-store"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "dbt"
  - "spark"
  - "data-validation"
  - "deployment"
  - "feature-engineering"
  - "serving"
industryTags: "finance"
company: "Monzo"
companySlug: "monzo"
platformName: "Monzo's ML stack"
contentType: "blog"
summary: "Monzo built a specialized feature store in 2020 to bridge the gap between their analytics and production infrastructure, specifically addressing the challenge of safely transferring slow-changing aggregated features from BigQuery to production services. Rather than building a comprehensive feature store addressing all common use cases, Monzo narrowed the scope to automating the journey of shipping features computed in their analytics stack (BigQuery) to their production key-value store (Cassandra), enabling Data Scientists to write SQL queries that are automatically validated, scheduled via Airflow, exported to Google Cloud Storage, and synced into Cassandra for real-time serving. This pragmatic approach allowed them to continue shipping tabular machine learning models without rebuilding analytics-computed features in production or querying BigQuery directly from services."
link: "https://nlathia.github.io/2020/12/Building-a-feature-store.html"
year: 2020
seo:
  title: "Monzo: Building a feature store - ZenML MLOps Database"
  description: "Monzo built a specialized feature store in 2020 to bridge the gap between their analytics and production infrastructure, specifically addressing the challenge of safely transferring slow-changing aggregated features from BigQuery to production services. Rather than building a comprehensive feature store addressing all common use cases, Monzo narrowed the scope to automating the journey of shipping features computed in their analytics stack (BigQuery) to their production key-value store (Cassandra), enabling Data Scientists to write SQL queries that are automatically validated, scheduled via Airflow, exported to Google Cloud Storage, and synced into Cassandra for real-time serving. This pragmatic approach allowed them to continue shipping tabular machine learning models without rebuilding analytics-computed features in production or querying BigQuery directly from services."
  canonical: "https://www.zenml.io/mlops-database/monzo-monzos-ml-stack-building-a-feature-store"
  ogTitle: "Monzo: Building a feature store - ZenML MLOps Database"
  ogDescription: "Monzo built a specialized feature store in 2020 to bridge the gap between their analytics and production infrastructure, specifically addressing the challenge of safely transferring slow-changing aggregated features from BigQuery to production services. Rather than building a comprehensive feature store addressing all common use cases, Monzo narrowed the scope to automating the journey of shipping features computed in their analytics stack (BigQuery) to their production key-value store (Cassandra), enabling Data Scientists to write SQL queries that are automatically validated, scheduled via Airflow, exported to Google Cloud Storage, and synced into Cassandra for real-time serving. This pragmatic approach allowed them to continue shipping tabular machine learning models without rebuilding analytics-computed features in production or querying BigQuery directly from services."
mlops:
  source: "sqlite"
  entryId: 118
  sourceUrl: "https://nlathia.github.io/2020/12/Building-a-feature-store.html"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061587"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Monzo faced a specific infrastructure challenge as they ramped up development and deployment of tabular machine learning models in 2020. While their earlier ML systems were NLP-heavy, the shift to tabular models exposed a critical gap between their analytics and production environments. The core problem was that many features useful for training models existed only in their analytics stack (BigQuery), where Data Scientists regularly wrote SQL queries to compute aggregations and statistics, but these features were not readily available in their production infrastructure (Cassandra).

The pain point manifested repeatedly: features like "a customer's 7-day average balance" were already computed in analytics tables through SQL queries, but when deploying models to production, engineers either had to query BigQuery directly from services and cache results, or rebuild these same feature computations in Go within the production environment. This pattern was sustainable for one or two models but became unsustainable as the team scaled up model deployment.

Monzo's production infrastructure was heavily built around Cassandra as a key-value store, with each microservice typically having its own keyspace. They already had feature-store-like patterns in place: services that fan out requests to aggregate features and cache them, and services that consume event streams to construct features about entities. However, these systems were organized around the services themselves rather than around a shared repository of reusable features. The team recognized they needed a bridge between BigQuery and Cassandra that could be reused rather than rebuilt for each new model deployment.

Critically, Monzo took a pragmatic approach to scoping the problem. Rather than trying to build a comprehensive feature store addressing the ten-plus problems that commercial feature store vendors tout (integrations, consistency, monitoring, versioning, metadata, training dataset creation, production serving, etc.), they focused narrowly on features that were: characterized by slow-changing values (aggregations like averages and counts that don't need microsecond accuracy), easy to implement in BigQuery SQL on historical data, and difficult or time-consuming to rebuild and backfill in production. This scoping decision was essential to keeping the project tractable for a small team.

## Architecture & Design

Monzo's feature store architecture creates an automated pipeline from analytics to production, with clear separation of concerns and multiple validation checkpoints. The system consists of several key components working together:

The data flow begins in BigQuery, where Data Scientists write SQL queries as they normally would for analytics work. These queries are tagged as "feature tables" and become part of the analytics pipeline. Feature tables must follow a specific schema convention: they must include a `subject_type` column defining the entity the feature describes (such as "user" or "sort code") and a corresponding `subject_id` column containing the actual identifier for that row. This schema constraint ensures that features are always tied to specific entities and can be properly indexed when moved to production.

The feature tables are scheduled and materialized alongside all other analytics tables using Airflow, running at varying frequencies—daily, hourly, or other intervals depending on requirements. Monzo uses dbt (data build tool) for their analytics workflows, so each query is written with associated tests to validate data quality at the SQL level.

A monitoring and sync orchestration layer sits between BigQuery and production. A cron job regularly checks whether feature tables should be synced into Cassandra based on two conditions: the table has been recreated since the last sync, and it passes data validation tests to ensure it doesn't contain garbage data. This dual-testing approach—once in dbt for SQL correctness and again before export for data validity—provides redundancy and flexibility in catching errors.

When a table qualifies for syncing, the system partitions it into batches and exports it as line-delimited JSON into Google Cloud Storage. This intermediate storage layer acts as a buffer between the analytics and production environments. From Cloud Storage, batches are read and written into Cassandra with a specific transformation: wide BigQuery tables (with potentially tens of features per user in columns) are converted into tall Cassandra tables (one row per user per feature). This schema transformation enables efficient querying for specific feature values by key.

The feature store is implemented as a Go service that wraps the Cassandra data and provides endpoints for other production services to query. Services can request all features for a given entity (e.g., all features for a specific user), and the responses include both feature values and metadata about when each feature was last updated in the store.

An important architectural decision was to write all syncs into a single Cassandra table rather than maintaining separate tables or using atomic swap mechanisms. This means partial updates are possible—if you query the feature store while a new batch is being written, you might receive a mixture of older and newer values. This trade-off prioritized simplicity and continuous availability over perfect consistency during updates.

## Technical Implementation

The technical stack is tightly integrated with Monzo's existing infrastructure choices, leveraging tools the team already understood and operated:

**Analytics Layer**: BigQuery serves as the source of truth for feature computation, with dbt orchestrating SQL transformations and providing testing frameworks. Data Scientists write standard SQL with schema conventions rather than learning new DSLs or APIs. Airflow handles scheduling, running feature table materialization alongside regular analytics workflows at appropriate frequencies.

**Storage and Export**: Google Cloud Storage acts as the intermediate buffer layer, holding line-delimited JSON exports of feature table batches. This design decouples the read operations on BigQuery from the write operations to Cassandra, allowing each side to proceed at its own pace and providing resilience if either system experiences issues.

**Production Layer**: The feature store service is written in Go, consistent with Monzo's microservice architecture. It explicitly defines schemas for feature tables rather than blindly ingesting data, providing type safety and validation. The service writes to and reads from Cassandra, which Monzo already uses extensively across production infrastructure.

**Testing and Validation**: The system implements a defense-in-depth approach to data quality. dbt tests validate SQL query correctness and output in the analytics environment. Before export, validation tests check that tables pass data quality thresholds. In staging environments, fake data enables testing functional changes to the feature store service before production deployment—an engineering practice that Monzo explicitly notes is less common in analytics teams but valuable for infrastructure code.

**Observability**: The feature store includes built-in logging for every feature value write, capturing what values were set and when. This logging proved to provide a free capability for point-in-time feature reconstruction—the ability to answer "what was the value of feature X for user Y on date Z?"—which is commonly listed as a requirement for feature stores to support training data generation. Monzo initially excluded this functionality as out of scope but gained it as a byproduct of good logging practices.

The implementation philosophy emphasized pragmatism over purity. Rather than building abstractions to handle all possible use cases, the team built specific functionality to solve their immediate need: safely moving slow-changing aggregations from BigQuery to Cassandra. This narrow scope kept the system maintainable by a small team.

## Scale & Performance

The article does not provide specific quantitative metrics about scale—no numbers for requests per second, feature volumes, model counts, or data sizes. This is notable and consistent with Monzo's framing of the system as purpose-built for their specific use case rather than as a general-purpose platform.

What the article does indicate about scale and performance:

**Feature Update Frequency**: Feature tables are materialized at varying cadences—daily, hourly, and potentially other intervals. This aligns with their focus on "slow-changing" features that don't require microsecond-level freshness. The acceptable staleness of feature values was a key scoping decision that simplified the architecture.

**Entity Types**: The system supports multiple subject types (users, sort codes, and presumably others), with the schema explicitly requiring entity type and ID specification. The transformation from wide tables to tall tables in Cassandra suggests individual features can be efficiently looked up by entity ID and feature name.

**Batch Processing**: The sync mechanism partitions tables into batches for export and loading, indicating the system handles table sizes that benefit from chunking. The line-delimited JSON export format is space-efficient and streamable.

**Query Patterns**: The feature store service supports retrieving all features for a given entity in a single request, suggesting applications typically need multiple features together rather than individual point lookups. Each response includes both values and last-updated metadata.

The lack of specific performance metrics suggests Monzo's feature store operates at a scale appropriate for their needs without being a primary bottleneck or showcase achievement. The emphasis throughout is on reliability, correctness, and safe bridging between environments rather than raw performance.

## Trade-offs & Lessons

Monzo's implementation reveals several important trade-offs and insights for practitioners building ML infrastructure:

**Scoping is Critical**: The most significant lesson is the value of narrow, problem-focused scoping. Monzo explicitly rejected the idea of building a comprehensive feature store addressing all possible use cases. Instead, they identified a specific, recurring pattern—moving slow-changing analytics features to production—and built tooling for exactly that. This kept the system maintainable by a small team and prevented it from becoming a sprawling platform that replaces existing, functioning systems. Neal Lathia emphasizes they had "no desire to migrate any of our existing systems to sit behind any kind of centralised feature store API."

**Consistency vs. Simplicity**: The feature store accepts partial updates during sync operations—queries during a batch write may return mixed old and new values. This trade-off prioritizes continuous availability and architectural simplicity over perfect consistency. For slow-changing features where staleness is acceptable, this is a reasonable choice that avoids complex transaction logic or dual-table swap mechanisms.

**Testing Philosophy**: The dual-testing approach—dbt tests in SQL and validation tests before export—provides defense in depth but also redundancy that might seem wasteful. Monzo explicitly values this redundancy because "the types of mistakes that you can make when writing SQL are very different from the types of mistakes you can make when writing Go." This challenges the common pitch that feature stores eliminate duplicate work; sometimes duplication provides valuable validation.

**Reuse vs. Correctness**: The article thoughtfully questions whether "code things only once" is always desirable. For critical use cases, building features twice (once in SQL for training, once in Go for production) enables reconciliation—if both implementations produce the same results, confidence in correctness increases. This suggests feature stores should be chosen based on actual pain points, not abstract principles about code reuse.

**Metadata and Discovery**: Monzo raises important skepticism about feature discovery and centralization. They note that once you have thousands of features, a central list becomes difficult to navigate, context about what features mean gets lost, and ensuring documentation stays synchronized with upstream data sources becomes challenging. Their feature store doesn't emphasize discovery or a rich metadata layer; it's primarily a data movement pipeline.

**Incremental Value**: The feature store gained capabilities like point-in-time feature reconstruction "for free" through good engineering practices (comprehensive logging) rather than explicit design. This suggests building infrastructure with good fundamentals—observability, testing, staging environments—can provide unexpected benefits as systems evolve.

**Analytics-Engineering Bridge**: Creating a staging environment with fake data required bridging cultural differences between engineering (where staging is common) and analytics (where it's less common) practices. This cultural integration is as important as the technical integration when building systems that span both domains.

**Production Philosophy**: Monzo's philosophy is additive rather than disruptive—they built a bridge between existing systems rather than replacing them. This makes the feature store easier to adopt incrementally and reduces risk. The feature store coexists with existing patterns like services that fan out requests or consume event streams to build features; it doesn't replace them.

The overarching lesson is pragmatism: understand the specific problem you're solving, scope ruthlessly to that problem, leverage existing infrastructure and practices, and build incrementally. Monzo's feature store succeeds not by being comprehensive but by being precisely tailored to one well-understood need.
