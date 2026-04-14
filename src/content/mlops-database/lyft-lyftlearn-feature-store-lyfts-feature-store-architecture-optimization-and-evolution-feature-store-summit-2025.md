---
title: "Lyft’s Feature Store: Architecture, Optimization, and Evolution (Feature Store Summit 2025)"
slug: "lyft-lyftlearn-feature-store-lyfts-feature-store-architecture-optimization-and-evolution-feature-store-summit-2025"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "airflow"
  - "dbt"
  - "docker"
  - "kubernetes"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Lyft"
companySlug: "lyft"
platformName: "LyftLearn + Feature Store"
contentType: "video"
summary: "Lyft built a homegrown feature store that serves as core infrastructure for their ML platform, centralizing feature engineering and serving features at massive scale across dozens of ML use cases including driver-rider matching, pricing, fraud detection, and marketing. The platform operates as a \"platform of platforms\" supporting batch features (via Spark SQL and Airflow), streaming features (via Flink and Kafka), and on-demand features, all backed by AWS data stores (DynamoDB with Redis cache, later Valkey, plus OpenSearch for embeddings). Over the past year, through extensive optimization efforts focused on efficiency and developer experience, they achieved a 33% reduction in P95 latency, grew batch features by 12% despite aggressive deprecation efforts, saw a 25% increase in distinct production callers, and now serve over a trillion feature retrieval calls annually at scale."
link: "https://www.youtube.com/watch?v=918ph1fIfvs"
year: 2025
seo:
  title: "Lyft: Lyft’s Feature Store: Architecture, Optimization, and Evolution (Feature Store Summit 2025) - ZenML MLOps Database"
  description: "Lyft built a homegrown feature store that serves as core infrastructure for their ML platform, centralizing feature engineering and serving features at massive scale across dozens of ML use cases including driver-rider matching, pricing, fraud detection, and marketing. The platform operates as a \"platform of platforms\" supporting batch features (via Spark SQL and Airflow), streaming features (via Flink and Kafka), and on-demand features, all backed by AWS data stores (DynamoDB with Redis cache, later Valkey, plus OpenSearch for embeddings). Over the past year, through extensive optimization efforts focused on efficiency and developer experience, they achieved a 33% reduction in P95 latency, grew batch features by 12% despite aggressive deprecation efforts, saw a 25% increase in distinct production callers, and now serve over a trillion feature retrieval calls annually at scale."
  canonical: "https://www.zenml.io/mlops-database/lyft-lyftlearn-feature-store-lyfts-feature-store-architecture-optimization-and-evolution-feature-store-summit-2025"
  ogTitle: "Lyft: Lyft’s Feature Store: Architecture, Optimization, and Evolution (Feature Store Summit 2025) - ZenML MLOps Database"
  ogDescription: "Lyft built a homegrown feature store that serves as core infrastructure for their ML platform, centralizing feature engineering and serving features at massive scale across dozens of ML use cases including driver-rider matching, pricing, fraud detection, and marketing. The platform operates as a \"platform of platforms\" supporting batch features (via Spark SQL and Airflow), streaming features (via Flink and Kafka), and on-demand features, all backed by AWS data stores (DynamoDB with Redis cache, later Valkey, plus OpenSearch for embeddings). Over the past year, through extensive optimization efforts focused on efficiency and developer experience, they achieved a 33% reduction in P95 latency, grew batch features by 12% despite aggressive deprecation efforts, saw a 25% increase in distinct production callers, and now serve over a trillion feature retrieval calls annually at scale."
mlops:
  source: "sqlite"
  entryId: 168
  sourceUrl: "https://www.youtube.com/watch?v=918ph1fIfvs"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.616073"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Lyft faced the classic challenge of scaling machine learning across a rapidly growing ride-sharing platform with dozens of diverse ML use cases. Teams across the organization—from fulfillment (driver-rider matching), orchestration (incentive programs), pricing, fraud detection, to marketing—all needed consistent, reliable access to features for both training and inference. The pain points were typical of companies scaling ML: duplicated feature engineering work, inconsistent feature definitions across models, difficulty discovering existing features, challenges maintaining feature freshness, and the operational burden of managing features across different paradigms (batch, streaming, real-time).

The organization needed a centralized system that could support diverse personas including software engineers focused on service development and ML modelers/data scientists designing models. These personas often overlap or collaborate closely, and most shared strong SQL skills with a desire for rapid iteration. Without a unified feature platform, teams would rebuild similar features independently, waste engineering effort, struggle with feature versioning and lineage, and face operational challenges maintaining features in production at Lyft's scale.

## Architecture & Design

Lyft's feature store architecture is described as a "platform of platforms" with three primary feature generation paradigms working in concert:

**Batch Features Architecture**: This represents the largest feature family by volume at Lyft. The workflow begins with customers who have existing Hive data tables and want to design features from them. Users create configuration files in a dedicated repository containing Spark SQL definitions and JSON configuration files. A Python service cron job reads these configuration files and automatically generates Airflow DAGs. These generated DAGs come with built-in capabilities including feature discovery integration, data quality checks, and dual output generation for both offline and online data. The offline data gets stored back in Hive tables similar to the source tables, while online data is sent to DS Features (Data Science Features), their centralized wrapper over AWS data stores.

**DS Features Storage Layer**: This is the core online feature serving infrastructure. DynamoDB serves as the primary backing store, with a write-through cache layer originally implemented in Redis (later migrated to Valkey) to provide lower latency retrievals. More recently, they integrated OpenSearch specifically for embeddings features, recognizing the growing importance of vector search capabilities for LLM and AI applications.

**Streaming Features Architecture**: Flink applications read analytic events sourced through Kafka topics, perform transformations on the streaming data, and send results to an internal Beam application. This Beam application handles final transformations before sending data to DS Features via API calls for storage and later retrieval. The streaming team has grown significantly with nearly 100 Flink applications now running across the company.

**On-Demand Features**: For cases requiring ad-hoc operations, customers can perform CRUD operations directly from their service code. This enables real-time features where services can write and read features on-demand without pre-computation.

**Data Retrieval**: Customers interact with the feature store through SDKs available in Golang and Python—the two most prevalent languages across Lyft's engineering organization. These SDKs allow services to make get or batch get API calls to DS Features, which in turn queries the appropriate AWS data stores based on feature metadata and returns results in a developer-friendly format. The SDKs abstract away the complexity of determining which backing store to query and handle serialization/deserialization.

**Feature Discovery Integration**: All features registered in the system automatically have their metadata tagged in Amundsen, Lyft's data discovery platform. This enables engineers to search for existing features, understand their definitions, prevent duplicated work, and increase collaboration across teams.

## Technical Implementation

**Core Technology Stack**:
- **Orchestration**: Migrated through two hops from a homegrown orchestration platform called "Flight" to Astronomer (managed Airflow)
- **Compute Engine**: Spark SQL as the primary query engine for batch features, with earlier support for HiveQL and Redshift deprecated due to limited usage and high support burden
- **Streaming**: Apache Flink for stream processing, Kafka for event streaming, Apache Beam for final transformations
- **Storage**: AWS DynamoDB (primary), Redis/Valkey (caching layer), OpenSearch (embeddings), Hive (offline storage)
- **Infrastructure**: EKS (Elastic Kubernetes Service) for hosting DS Features service pods
- **Languages**: Golang and Python SDKs for feature retrieval
- **Development Tools**: Custom CLI called "Kite" for local Airflow development and testing

**Developer Experience Design**: Lyft made deliberate choices to optimize for their developer personas. Recognizing that most users were proficient in SQL and wanted quick iteration, they centered the batch feature workflow around Spark SQL definitions. A typical feature definition involves writing SQL queries that aggregate against specific entity types (like users) to create features (like ride counts), paired with JSON configuration files that specify metadata including:
- Run-to-run carryover logic
- Data listeners and dependencies
- Ownership information for support and debugging
- Urgency tiering for prioritization
- Explicit feature naming conventions

**Local Development with Kite**: A critical innovation was their homegrown solution called Kite for local Airflow development. Engineers can validate features, test SQL queries, test generated DAGs, and even execute backfills against historical dates—all locally before ever merging to production. This dramatically improves the prototyping experience and gives developers confidence before productionizing features.

**Staging Environment**: After Lyft invested in making staging a more reliable environment across the company, the feature store team unlocked staging counterparts for both DS Features and the entire batch generation process. This enables end-to-end integration testing in non-production environments, allowing teams to test business logic changes against staging data before production deployment—particularly important for urgent and sensitive features.

**Standardization and Abstractions**: The team developed abstractions making it easier to develop in Golang (a growing language of choice at Lyft) and revamped the offline SDK used by Python engineers to standardize capabilities and normalize common activities into more monitorable states.

## Scale & Performance

The numbers presented demonstrate truly massive scale:

**Volume Metrics**:
- Aggregate feature retrieval activity exceeded **one trillion calls** (conservative extrapolation for the year)
- **12% growth in batch feature count** over the past year despite aggressive deprecation efforts that removed hundreds of unused features
- **25% increase in distinct production service callers** over the past year—representing unique production services making significant feature retrievals, not individual developers
- Nearly **100 Flink streaming applications** running across the company

**Performance Improvements**:
- **33% reduction in P95 latency** over the past year through systematic optimization efforts
- These latency savings compound downstream as they pass through customers' entire call stacks before reaching end users

**Optimization Strategies for Data Retrieval**:

The team focused relentlessly on improving latencies and success rates, addressing challenges inherent in depending on AWS data stores:

- **AWS Data Store Challenges**: DynamoDB and other AWS data stores can experience transient failures, unpredictable minute-long spikes, and very high P999 tail latencies. AWS provides no official SLAs for latencies—no P95 guarantees, only observable average performance. This meant Lyft had to optimize defensively.

- **Network Efficiency**: Upgraded cache versions and data store configurations, removed unnecessary fields in retrieval code to speed decision-making, and streamlined network calls to be as lean as possible.

- **Pod Right-Sizing**: A non-obvious optimization involved right-sizing DS Features EKS pods. Each pod must connect to every Redis node, so doubling pods doubles connections. At scale, excessive connections can cause stability problems. Finding the right pod count balanced performance with connection overhead.

- **Retry and Timeout Policies**: Improved retry and timeout configurations both within customer services and DS Features itself. Premature timeouts create compounding failure cascades—when a customer service times out calling DS Features, which itself might be doing retries, failures can multiply. Careful tuning of these policies drove up success rates.

- **Cache TTL Optimization**: Increased internal cache TTL as much as possible for both metadata (used for feature retrieval decisions) and feature values themselves, while balancing against cost. While theoretically they could cache everything permanently, the cost would be prohibitive. They found optimal trade-offs between cost and latency improvements.

**Data Quality and Observability**: The team executed on an organization-wide data contracts initiative to enforce expectations on freshness, ownership, and quality—increasingly critical as data volumes grow and teams need to know which data to trust. Better monitoring was established for DAG failures, streaming application failures, and failed tasks, coupled with ownership tracking that makes debugging faster and enables confident deprecation of unused features.

## Trade-offs & Lessons

**Strategic Technology Choices**:

The team made several pragmatic decisions that shaped their platform evolution:

- **Query Engine Consolidation**: They deprecated support for HiveQL and Redshift despite having some users because these niche use cases consumed disproportionate support bandwidth. Their most important teams by product-market fit and usage volume predominantly used Spark, so focusing support there created better outcomes for the majority while simplifying the platform.

- **Homegrown vs. Vendor**: About 18 months ago, they spent nearly a month with three engineers doing deep discovery to evaluate whether to vendorize their solution. Through extensive customer interviews, code analysis, and metadata deep-dives, they concluded their homegrown solution was justified. Running in-house allows them to operate leaner and make faster iterations tailored to Lyft's specific needs.

- **Orchestration Migration Pain**: Migrating through two different orchestration platforms (from homegrown "Flight" to Astronomer) represents significant technical debt paydown but also substantial engineering investment. This speaks to the challenges of early platform decisions and the cost of course-correction at scale.

**Feature Evolution Philosophy**:

Lyft is witnessing a shift from predominantly batch features toward streaming and embeddings. However, rather than rushing to build cutting-edge capabilities, they deliberately focused on "foundational work" to ensure the current ecosystem optimizes for healthy features and healthy data. The reasoning: with the volume of features and calls becoming so significant, they needed strong observability and transparency foundations before making major paradigm shifts toward heavy streaming, LLMs, and AI products. This reflects maturity in recognizing that technical debt in observability compounds dramatically at scale.

**The AI Revolution and Transparency**: The team explicitly noted that the "AI revolution is coming with a lot of pitfalls that people weren't anticipating on transparency" and wanted to keep that in the forefront before getting ambitious with next-generation work. This suggests awareness that feature stores for LLMs and embeddings need even stronger governance than traditional ML.

**Organizational Insights**:

- **Diverse Personas**: Supporting both software engineers and ML modelers (who sometimes overlap in single individuals) requires careful API and workflow design. Their choice to center on SQL reflects understanding their users deeply.

- **Justifying Platform Value**: The discovery phase where they researched customer impact, conducted interviews, and analyzed usage patterns was crucial for justifying the platform's existence and securing resources. When things break, the impact becomes visceral and clear. Running lean as a homegrown solution makes resource justification easier.

- **Deprecation as Feature**: Aggressive feature deprecation (removing hundreds of features) while still achieving 12% growth demonstrates healthy platform hygiene. Many organizations struggle to remove unused features; Lyft's ownership tracking and observability made this possible.

**Operational Lessons**:

The latency optimization work yielded valuable insights applicable beyond Lyft:

- Connection pooling and pod scaling have non-linear relationships with stability that aren't obvious until you hit scale
- AWS managed services provide convenience but require defensive programming against lack of SLA guarantees
- Cache TTL tuning requires careful cost-benefit analysis rather than default configurations
- Timeout and retry policies must be considered holistically across service boundaries to avoid cascading failures

**Growth Trajectory**: The 25% year-over-year growth in distinct production callers and trillion-scale call volumes, despite the maturity of Lyft as a company, indicates that feature stores remain central to ML operations even in established organizations. The platform continues expanding its surface area with OpenSearch integration for embeddings and growing investment in streaming infrastructure, positioning for the next wave of AI applications while maintaining stability of existing critical systems.
