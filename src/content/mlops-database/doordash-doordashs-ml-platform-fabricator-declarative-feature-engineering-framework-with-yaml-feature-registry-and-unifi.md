---
title: "Fabricator declarative feature engineering framework with YAML feature registry and unified execution for ETL and online serving"
slug: "doordash-doordashs-ml-platform-fabricator-declarative-feature-engineering-framework-with-yaml-feature-registry-and-unifi"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "airflow"
  - "dagster"
  - "dask"
  - "dbt"
  - "great-expectations"
  - "ray"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "DoorDash"
companySlug: "doordash"
platformName: "DoorDash's ML platform"
contentType: "blog"
summary: "DoorDash built Fabricator, a declarative feature engineering framework, to address the complexity and slow development velocity of their legacy feature engineering workflow. Previously, data scientists had to work across multiple loosely coupled systems (Snowflake, Airflow, Redis, Spark) to manage ETL pipelines, write extensive SQL for training datasets, and coordinate with ML platform teams for productionalization. Fabricator provides a centralized YAML-based feature registry backed by Protobuf schemas, unified execution APIs that abstract storage and compute complexities, and automated infrastructure for orchestration and online serving. Since launch, the framework has enabled data scientists to create over 100 pipelines generating 500 unique features and 100+ billion daily feature values, with individual pipeline optimizations achieving up to 12x speedups and backfill times reduced from days to hours."
link: "https://doordash.engineering/2022/01/11/introducing-fabricator-a-declarative-feature-engineering-framework/"
year: 2022
seo:
  title: "DoorDash: Fabricator declarative feature engineering framework with YAML feature registry and unified execution for ETL and online serving - ZenML MLOps Database"
  description: "DoorDash built Fabricator, a declarative feature engineering framework, to address the complexity and slow development velocity of their legacy feature engineering workflow. Previously, data scientists had to work across multiple loosely coupled systems (Snowflake, Airflow, Redis, Spark) to manage ETL pipelines, write extensive SQL for training datasets, and coordinate with ML platform teams for productionalization. Fabricator provides a centralized YAML-based feature registry backed by Protobuf schemas, unified execution APIs that abstract storage and compute complexities, and automated infrastructure for orchestration and online serving. Since launch, the framework has enabled data scientists to create over 100 pipelines generating 500 unique features and 100+ billion daily feature values, with individual pipeline optimizations achieving up to 12x speedups and backfill times reduced from days to hours."
  canonical: "https://www.zenml.io/mlops-database/doordash-doordashs-ml-platform-fabricator-declarative-feature-engineering-framework-with-yaml-feature-registry-and-unifi"
  ogTitle: "DoorDash: Fabricator declarative feature engineering framework with YAML feature registry and unified execution for ETL and online serving - ZenML MLOps Database"
  ogDescription: "DoorDash built Fabricator, a declarative feature engineering framework, to address the complexity and slow development velocity of their legacy feature engineering workflow. Previously, data scientists had to work across multiple loosely coupled systems (Snowflake, Airflow, Redis, Spark) to manage ETL pipelines, write extensive SQL for training datasets, and coordinate with ML platform teams for productionalization. Fabricator provides a centralized YAML-based feature registry backed by Protobuf schemas, unified execution APIs that abstract storage and compute complexities, and automated infrastructure for orchestration and online serving. Since launch, the framework has enabled data scientists to create over 100 pipelines generating 500 unique features and 100+ billion daily feature values, with individual pipeline optimizations achieving up to 12x speedups and backfill times reduced from days to hours."
mlops:
  source: "sqlite"
  entryId: 97
  sourceUrl: "https://doordash.engineering/2022/01/11/introducing-fabricator-a-declarative-feature-engineering-framework/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061358"
  lastUpdated: "2026-04-14T19:55:04.924616"
---

## Problem Context

DoorDash faced significant challenges with their legacy feature engineering workflow despite having mature ML serving infrastructure. Their real-time prediction service (Sibyl) and Redis-based feature store handled serving effectively, but the development and iteration of features consumed the majority of data scientist time—approximately 70% was spent on feature and data engineering work.

The legacy workflow required data scientists to navigate multiple disconnected systems. They had to author and manage feature generation ETLs using Snowflake and Airflow, handwrite hundreds of lines of SQL joins to produce training datasets, and collaborate with the ML platform team to productionalize features for both offline and online serving. This fragmented approach created several critical pain points that hindered scalability.

The first major issue was too many touchpoints across the organization. Data scientists needed to work with data infrastructure teams to maintain ETLs, handwrite offline feature serving code, and partner with ML platform engineers to author online models. This multi-team coordination made model development velocity slow. The technical overhead of understanding each system deeply—Snowflake for data warehousing, Airflow for orchestration, Redis for feature serving, Spark for compute—made onboarding new team members particularly difficult.

Infrastructure evolution moved slowly because of the loosely coupled nature of systems with different organizational charters. Small changes could break the entire flow, and as DoorDash's data volumes grew with the company, systems became slower and more expensive to operate. The framework lacked the iterability needed to keep cost curves manageable at scale.

Perhaps most critically, there was no centralized management UI for features. Data scientists had no way to explore hundreds of features created by other team members, share them across teams, or observe their lifecycle. Each feature had to be discovered through code searches across multiple repositories to understand the full picture. Feature observability and monitoring were ad hoc processes, providing no systematic way to understand drift and quality degradation over time. These gaps in discoverability and observability further reduced development velocity for new features.

## Architecture & Design

Fabricator's architecture was inspired by open source solutions like Feast and internal platforms from other companies such as Uber's Palette and Airbnb's Zipline. The design philosophy centered on two core principles: building products rather than systems, and making it easy to do the right thing by providing simple defaults for common use cases while allowing advanced customization.

The platform consists of two primary planes. The data plane handles feature generation through a guided low-friction process, offline serving via abstract APIs to fetch features from underlying storage for training dataset enrichment, and online serving through seamless workflows to materialize features to the online feature store as soon as data is ready. The control plane provides feature management and discovery through an accessible UX to track the feature catalog, definitions, and lifecycle status, plus integrated feature observability to track usage statistics and drift for production features.

Fabricator delivers this design through three key architectural components. First, a central declarative feature registry allows users to define their entire workflow from generation to serving in a single location. Second, a unified execution environment provides high-level APIs to work across multiple storage and compute solutions without needing to understand implementation details. Third, automated and continuously deployed infrastructure reduces operational overhead to effectively zero for data scientists.

The declarative feature registry uses YAML as the definition language, backed by Protocol Buffers for schema definition. This provides backward and forward compatibility for definition objects. The framework achieves full descriptive power through three core concepts: sources, sinks, and features.

Sources describe the generative definition for feature sources, flexible enough to handle both real-time and batch features. A source definition declares the output storage format (supporting S3 and Snowflake for batch, Kafka for real-time), contains a compute spec that can be customized by type (Spark, Snowflake SQL, or Flink SQL), and includes a trigger spec to customize pipeline scheduling.

Sinks define materialization stores for online serving beyond the persistent storage layer. The framework currently supports Redis and Kafka as materialization targets. Features are the primary lifecycle objects, identified by name and connected to their generative source and materialization sinks. Features can include sampling specifications for materialization, allowing partial materialization to optimize costs and resources.

The feature registry is maintained as a repository of YAML definitions that updates the central registry as part of the product release CI/CD cycle. This enables changes to take effect within minutes of commits, dramatically accelerating the iteration cycle.

## Technical Implementation

Fabricator provides a unified execution environment through extensible Python wrappers around the YAML DSL called Contexts. These can be specialized for specific pipeline types. The base Context class accepts parameters for table name, storage type, schema, environment, indexes, and a name identifier. More specialized contexts like FeatureContext inherit from the base and add feature-specific functionality.

This Context abstraction serves three critical purposes. First, all Fabricator pipelines are authored to "run" a Context, meaning every YAML compute spec translates to an appropriate context and applies user code to it. This makes development and production environments work identically, eliminating the traditional gap between playground and production code. Second, Contexts hide infrastructure interactions, allowing data scientists to operate freely between multiple storage layers (Snowflake, S3) and compute layers (Spark, Snowflake SQL, Pandas) without understanding the underlying details. Third, existing definitions can be easily referenced programmatically—for example, FeatureContext.from_source('consumer_engagement_metrics') returns the fully formed Context for a previously defined YAML source.

The framework implements black box optimizations behind these Context APIs to handle technological nuances that aren't universally known across data science teams. For instance, when writing a Spark DataFrame to S3, the system must determine optimal data partitioning, whether partitions should run through a single reducer, and how to handle data skew or partition skew. Fabricator provides APIs like write_data_spark(context, df) that automatically identify the optimal number and type of partitions for the specific data characteristics.

For offline serving, Fabricator provides a simple get_features API that accepts a DataFrame and feature names, then infers the related Contexts and storage information to construct efficient joins. Since these joins are blackbox APIs, optimizations can be applied to all existing jobs simultaneously. The team achieved approximately 5x acceleration for multiple jobs by implementing key-based repartitioning for feature joins.

The framework integrates with DoorDash's existing infrastructure stack. It leverages Dagster for workflow orchestration, automatically constructing and updating DAGs and dependency management from the YAML definitions. Dagster creates date-partitioned slices of user DAGs that infer dependencies automatically and can concurrently backfill new pipelines for up to a year of data within hours. For feature discovery, the central registry connects to Amundsen internally, linking features and their source table information to core data systems to create a holistic data lineage graph.

Online serving automation materializes features to the Redis-based feature store within minutes of data availability in offline storage when a materialize spec is configured. The framework is beginning to leverage the YAML spec to configure observability details such as thresholds for feature defaults in production and data quality rules for output feature data using frameworks like Great Expectations and Deequ.

## Scale & Performance

Since launch, Fabricator has demonstrated significant adoption and impact on DoorDash's ML infrastructure. Data scientists have leveraged the framework to add more than 100 pipelines generating 500 unique features and over 100 billion daily feature values. The framework has helped double the number of feature pipelines supported within DoorDash.

Performance improvements have been substantial. Centralized changes such as array-native storage and Spark-based UDFs for embeddings scaled many embeddings pipelines by more than 12x in running time. Some jobs saw cumulative running times decrease from over 120 cluster hours per day to just a few hours per day. The combination of storage optimizations with higher throughput and faster UDF-based compute created multiplicative wins—for instance, 2x storage throughput combined with 6x faster compute yielded 12x overall improvements.

Offline serving optimizations provided approximately 5x acceleration for multiple jobs through key-based repartitioning for feature joins. These black box optimizations could be applied across all existing jobs simultaneously, amplifying the impact.

The automated orchestration layer transformed backfilling from a multi-day manual process to one that completes in hours. The team successfully backfilled more than 70 new jobs for up to one year of historical data, accelerating experiment timelines by multiple days in some cases. The date-partitioned execution approach in Dagster enables concurrent backfills that can process a full year of data within a few hours rather than the days previously required.

## Trade-offs & Lessons

The Fabricator team identified several key learnings from building and deploying the framework. The most powerful insight was that optimizations are multiplicative rather than additive. When a storage optimization with 2x higher throughput is combined with a UDF-based compute improvement that is 6x faster, the cumulative win is 12x rather than 8x. This multiplicative effect of black box optimizations brought cumulative running times for many jobs down from over 120 cluster hours to just a few hours per day.

Standardization accelerates development even when underlying processes don't change significantly. By packaging 80% of standard use cases behind a few simple configuration knobs, the framework dramatically reduced the cognitive load of decision-making. This made iterations significantly faster because data scientists could focus on their features rather than infrastructure details.

Parallelizable backfills provide a major boost to development velocity in ways that are often under-appreciated in ML data engineering. Previously, when a year of data backfill might take days to set up, data scientists would choose to work with small subsamples to iterate faster. Having that same data available in hours instead fundamentally changed iteration patterns and enabled better model development with more complete historical data.

The team made deliberate design choices around abstraction levels. By using Protocol Buffers as the schema definition layer, they achieved backward and forward compatibility for definition objects. The YAML-based declarative approach reduced boilerplate and domain-specific knowledge requirements, making onboarding smoother and development faster.

The unified execution environment through Contexts proved critical for eliminating the development-to-production translation problem that plagued the legacy workflow. By making development and production work identically, the framework removed a major source of bugs and iteration delays.

The framework's design intentionally focused on the 80% common use cases while leaving room for advanced customization with marginally more effort. This philosophy of "making it easy to do the right thing" proved effective—most data scientists could work entirely within the guided paths, while power users could still add custom logic when needed.

Looking forward, the team recognizes that ML data engineering is rapidly moving toward lambda architectures that combine batch and real-time processing. Fabricator was designed to natively operate between real-time and batch feature pipelines, and the future roadmap focuses on hybrid pipelines that bootstrap batch features with real-time incremental updates. The YAML definitions already support both paradigms, positioning the framework well for this evolution.

The centralized registry approach enabled multiple secondary benefits beyond the core feature engineering workflow. Integration with Amundsen for feature discovery, the ability to add data quality rules through Great Expectations and Deequ, and the potential for automated drift detection all became possible because of the centralized metadata. These network effects of centralization weren't initially obvious but proved highly valuable as the platform matured.

The framework demonstrates how thoughtful abstraction and automation can dramatically improve developer productivity in ML workflows. By hiding infrastructure complexity behind simple declarative definitions and providing intelligent defaults through black box optimizations, Fabricator reduced the time data scientists spend on feature engineering infrastructure from 70% of their time to a much smaller fraction, allowing them to focus on the actual feature logic and model development.
