---
title: "Feature Store platform for batch, streaming, and on-demand ML features at scale using Spark SQL, Airflow, DynamoDB, ValKey, and Flink"
slug: "lyft-lyftlearn-feature-store-feature-store-platform-for-batch-streaming-and-on-demand-ml-features-at-scale-using-spark-s"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "flyte"
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
contentType: "blog"
summary: "Lyft's Feature Store serves as a centralized infrastructure platform managing machine learning features at massive scale across 60+ production use cases within the rideshare company. The platform operates as a \"platform of platforms\" supporting batch, streaming, and on-demand feature workflows through an architecture built on Spark SQL, Airflow orchestration, DynamoDB storage with ValKey caching, and Apache Flink streaming pipelines. After five years of evolution, the system achieved remarkable results including a 33% reduction in P95 latency, 12% year-over-year growth in batch features, 25% increase in distinct service callers, and over a trillion additional read/write operations, all while prioritizing developer experience through simple SQL-based interfaces and comprehensive metadata governance."
link: "https://eng.lyft.com/lyfts-feature-store-architecture-optimization-and-evolution-7835f8962b99"
year: 2026
seo:
  title: "Lyft: Feature Store platform for batch, streaming, and on-demand ML features at scale using Spark SQL, Airflow, DynamoDB, ValKey, and Flink - ZenML MLOps Database"
  description: "Lyft's Feature Store serves as a centralized infrastructure platform managing machine learning features at massive scale across 60+ production use cases within the rideshare company. The platform operates as a \"platform of platforms\" supporting batch, streaming, and on-demand feature workflows through an architecture built on Spark SQL, Airflow orchestration, DynamoDB storage with ValKey caching, and Apache Flink streaming pipelines. After five years of evolution, the system achieved remarkable results including a 33% reduction in P95 latency, 12% year-over-year growth in batch features, 25% increase in distinct service callers, and over a trillion additional read/write operations, all while prioritizing developer experience through simple SQL-based interfaces and comprehensive metadata governance."
  canonical: "https://www.zenml.io/mlops-database/lyft-lyftlearn-feature-store-feature-store-platform-for-batch-streaming-and-on-demand-ml-features-at-scale-using-spark-s"
  ogTitle: "Lyft: Feature Store platform for batch, streaming, and on-demand ML features at scale using Spark SQL, Airflow, DynamoDB, ValKey, and Flink - ZenML MLOps Database"
  ogDescription: "Lyft's Feature Store serves as a centralized infrastructure platform managing machine learning features at massive scale across 60+ production use cases within the rideshare company. The platform operates as a \"platform of platforms\" supporting batch, streaming, and on-demand feature workflows through an architecture built on Spark SQL, Airflow orchestration, DynamoDB storage with ValKey caching, and Apache Flink streaming pipelines. After five years of evolution, the system achieved remarkable results including a 33% reduction in P95 latency, 12% year-over-year growth in batch features, 25% increase in distinct service callers, and over a trillion additional read/write operations, all while prioritizing developer experience through simple SQL-based interfaces and comprehensive metadata governance."
mlops:
  source: "sqlite"
  entryId: 164
  sourceUrl: "https://eng.lyft.com/lyfts-feature-store-architecture-optimization-and-evolution-7835f8962b99"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.615846"
  lastUpdated: "2026-04-14T19:55:36.814991"
---

## Problem Context

Lyft's Feature Store addresses fundamental challenges in managing machine learning features across a large-scale rideshare platform where data-driven decision making pervades the entire technology stack. The core pain points that motivated this infrastructure investment include the need to centralize feature engineering efforts to prevent duplication, guarantee uniformity across diverse models and workflows, and provide both low-latency online serving for real-time inference and high-throughput batch processing for model training. 

The platform serves two primary personas: software engineers who drive service activity and ML modelers who design features and models. These users needed a system that simplified the entire feature lifecycle from creation and storage to retrieval and monitoring, without requiring deep expertise in distributed systems or complex infrastructure. The challenge was particularly acute given Lyft's scale—supporting 60+ distinct production use cases ranging from ETA prediction and dynamic pricing to fraud detection and driver-rider matching.

Beyond technical scalability, Lyft faced organizational challenges around feature discoverability, versioning, lineage tracking, and governance. Without centralized infrastructure, teams were duplicating feature engineering work, struggling to maintain consistency between training and serving environments, and lacking visibility into feature quality and freshness. The Feature Store needed to solve these operational challenges while supporting both established batch workflows and emerging real-time streaming requirements.

## Architecture and Design

Lyft's Feature Store is architected as a "platform of platforms" that integrates three distinct feature pipelines: batch, streaming, and on-demand features. This modular design allows each pipeline to optimize for its specific latency and throughput characteristics while maintaining unified metadata and strongly consistent reads across all access patterns.

### Batch Feature Pipeline

The batch feature pipeline represents the most widely used family of features at Lyft. Features are defined through Spark SQL queries against existing Hive data tables, with configuration metadata specified in simple JSON files. The JSON configuration captures essential metadata including ownership details, urgency tiering, run-to-run carryover/rollup logic, and explicit feature naming and data typing.

A Python cron service continuously reads these configurations and automatically generates production-ready Airflow DAGs hosted on Astronomer's managed platform. These generated DAGs orchestrate the complete feature lifecycle by executing the Spark SQL query to compute feature data, storing results to both offline and online data paths, running integrated data quality checks, and tagging metadata for feature discovery in Amundsen.

The dual-path storage architecture separates concerns between training and serving workloads. The offline data path stores feature data in Hive tables for historical analysis and model training, providing the large-scale batch access patterns that ML training workflows require. The online data path translates and sends processed features to the low-latency serving layer, optimized for real-time point lookups during inference.

### Online Serving Layer

The online serving infrastructure, called `dsfeatures` (data science features), provides ultra-low-latency feature retrieval for real-time inference workloads. The architecture implements a multi-tiered caching strategy over persistent storage to balance latency, consistency, and cost.

DynamoDB serves as the primary persistent backing store for all online features. The schema uses various metadata fields as the primary key with a Global Secondary Index (GSI) specifically designed for GDPR deletion efficiency, demonstrating how regulatory requirements influence technical design decisions.

A ValKey write-through LRU cache sits on top of DynamoDB, caching the most frequently accessed feature metadata and values with generous TTL settings. This caching layer is critical for achieving the ultra-low latencies that real-time serving demands, particularly given that AWS datastore latencies are unpredictable and P999 tail latencies fall outside typical SLAs.

For embedding features, which require specialized indexing and retrieval capabilities, the architecture integrates OpenSearch as a parallel serving path. This integration reflects the growing importance of embeddings for ML applications and the need for vector similarity search beyond traditional key-value lookups.

The `dsfeatures` service exposes full CRUD operations through dedicated SDKs: `go-lyft-features` for Golang services and `lyft-dsp-features` for Python applications. These SDKs standardize customer interactions with feature data, making access patterns more monitorable, accessible, and understandable. Customers primarily use `Get` and `BatchGet` operations for feature retrieval, while internal Airflow DAGs and streaming pipelines use write operations to populate and update feature values.

### Streaming Feature Pipeline

The streaming pipeline addresses use cases requiring data recency beyond what daily batch processing can provide. This multi-stage architecture processes features in real time using Apache Flink as the core computation engine.

Streaming applications read analytic events from Kafka topics or occasionally Kinesis streams, performing necessary transformations including manual metadata creation and value formatting. These Flink applications sink feature payloads to `spfeaturesingest`—the "Streaming Platform feature ingest" Flink application—which handles serialization/deserialization and invokes write API calls against `dsfeatures` to make features available for online retrieval.

To reduce friction in building streaming features, Lyft developed a `RealtimeMLPipeline` interface that abstracts common patterns in Flink application development. This investment reflects growing internal demand for streaming features and acknowledges that streaming infrastructure historically required deeper specialized expertise than batch processing.

### Integration and Governance

Feature discoverability is addressed through automatic integration with Amundsen, Lyft's central data discovery platform. Generated DAGs automatically tag feature metadata within Amundsen, allowing users to search for existing features and preventing duplication of engineering effort.

The platform implements versioning and lineage tracking through configuration metadata. Versioning allows developers to monitor changes over time and ensure correct versions are used for specific models. When SQL queries or business logic undergo changes, version bumps are expected, creating an audit trail. Lineage tracking provides insights into feature origin and transformation, enhancing transparency and accountability.

Data contracts are being actively implemented across the organization, enforcing explicit expectations regarding feature freshness, ownership, and quality. This initiative is crucial for maintaining trust as data generation scales and more teams depend on shared features.

## Technical Implementation

### Infrastructure and Tooling Stack

The technical stack reflects pragmatic choices that balance developer productivity, operational maturity, and organizational capabilities:

**Orchestration**: Lyft completed a multi-hop migration from in-house Flyte to fully-managed Astronomer-hosted Airflow. This decision offloaded ETL platform stability concerns to external engineers, allowing Lyft's orchestration team to invest in higher-priority internal initiatives. The tradeoffs of this migration are documented in a separate article comparing Flyte and Airflow at Lyft.

**Compute**: Spark serves as the primary processing engine for batch features, chosen because Lyft's core personas (software engineers and ML modelers) are proficient in SQL and value quick iteration. Apache Flink handles streaming computation, selected for its stateful stream processing capabilities and mature Kafka integration.

**Storage**: The storage layer uses AWS-managed services including DynamoDB for online key-value storage, Hive for offline batch storage, and OpenSearch for embedding retrieval. This managed service approach trades some control for reduced operational burden.

**Caching**: ValKey (an open-source Redis fork) replaced ElastiCache as the caching technology, representing a modernization to the latest cache solutions while maintaining Redis protocol compatibility.

**Container Orchestration**: The `dsfeatures` service runs on EKS (Elastic Kubernetes Service), with careful pod rightsizing to minimize the aggregate number of Redis connections, which historically caused networking issues.

**SDKs and APIs**: Two primary SDKs serve different language ecosystems—`go-lyft-features` for Golang services and `lyft-dsp-features` for Python applications. An additional offline-data Python SDK was developed to normalize customer activity patterns and improve observability.

### Developer Experience Tooling

Developer experience receives significant investment, recognizing that platform adoption depends on minimizing friction:

**Kyte Integration**: Lyft integrated with Kyte, a homegrown solution for Airflow local development, providing a custom CLI that enables feature validation, SQL testing with immediate feedback, local DAG execution, and confident backfilling of historical dates. This dramatically accelerates the feature prototyping cycle.

**Configuration Simplicity**: The decision to use simple JSON configuration files paired with Spark SQL queries reflects a deliberate choice to meet developers where they are, rather than forcing adoption of complex domain-specific languages or frameworks.

**Staging Environments**: The platform now supports reliable staging capabilities, boosting confidence in releasing urgent or sensitive features through easier prototyping and end-to-end testing in non-production environments.

### Query Engine Rationalization

In applying the Pareto principle, Lyft made the strategic decision to remove compatibility for alternative query engines like HiveQL and Redshift. This consolidation reduced support burden for niche use cases, allowing the team to invest more deeply in core use cases that drive the most value. While this reduced flexibility for some users, it significantly simplified the platform's maintenance surface and improved reliability for the primary use cases.

## Scale and Performance

### Quantitative Growth Metrics

The Feature Store operates at truly massive scale, with concrete metrics demonstrating both platform maturity and expanding adoption:

**Latency Improvements**: Recent optimizations reduced standard P95 latency during read operations by a full third. This improvement had tangible downstream effects, evidenced by increased customer SREs and significant reductions in customer support threads in internal Slack channels.

**Feature Growth**: Batch features, the largest family by volume, grew over 12% year-over-year despite active feature deprecation efforts. This growth alongside deprecation strongly suggests high user satisfaction and deepening partnerships with platform consumers.

**Service Expansion**: The number of distinct production service callers increased by almost 25% over the last year. Since each distinct caller represents a fundamentally unique use case—either a separate service or new functionality within an existing service—this validates the company's increasing appetite for feature usage.

**Request Volume**: Aggregate read/write activity on the platform increased by over one trillion operations in raw count based on conservative extrapolation. This serves as a powerful reminder of the enormous and continuously growing scale at which the platform operates.

**Use Case Breadth**: The platform supports 60+ distinct production use cases spanning critical functions including ETA prediction, dynamic pricing, fraud detection, driver-rider matching, and emerging AI/LLM applications.

### Performance Optimization Strategies

The optimization strategy focused on transparency in data generation and reliability in data retrieval:

**Generation Transparency**: Improved monitoring of failed DAGs and tasks, coupled with strong ownership tracking, made debugging faulty features significantly easier. This enabled confident deprecation of unused or incorrectly used features, reducing wasted Spark compute resources and Astronomer task scheduling overhead.

**Retrieval Reliability**: Given that AWS datastores are the primary source of unpredictable transient failures and high P999 tail latencies, the strategy focused on being as lean as possible to minimize disruption. Specific optimizations included cache modernization to ValKey, payload optimization removing unnecessary fields from retrieval code paths, EKS pod rightsizing to reduce Redis connection counts, hardened retry and timeout policies in both customer services and SDKs, and increased cache TTL values carefully balanced against storage costs.

These targeted improvements demonstrate sophisticated understanding of where bottlenecks actually occur in production systems—often in the interaction patterns and caching strategies rather than in compute resources alone.

## Trade-offs and Lessons Learned

### Orchestration Platform Migration

The migration from Flyte to Astronomer-hosted Airflow represents a significant architectural trade-off. While Flyte offered certain advantages for workflow orchestration, Lyft chose to offload infrastructure management to a vendor, accepting reduced control in exchange for operational simplicity. This decision reflects organizational maturity in recognizing which components provide competitive differentiation versus which are better consumed as managed services. The explicit documentation of this trade-off in a separate article demonstrates commitment to knowledge sharing.

### Query Engine Consolidation

Removing support for HiveQL and Redshift query engines exemplifies the difficult but necessary decisions required to maintain platform focus. While this reduced flexibility for edge cases, it allowed deeper investment in the primary Spark SQL path that served the majority of users. This application of the Pareto principle—optimizing for the 80% of use cases that drive 80% of value—is a crucial lesson for platform teams facing finite resources.

### Caching Strategy Complexity

The multi-tiered caching architecture with ValKey over DynamoDB represents a pragmatic response to AWS datastore latency unpredictability. Rather than expecting consistent performance from the backing store, the architecture assumes high P999 tail latencies and uses aggressive caching with generous TTLs. The careful balancing of TTL against storage cost demonstrates the economic trade-offs inherent in low-latency serving. The explicit mention that latency is generally not part of AWS DynamoDB SLAs is a valuable reminder that vendor SLAs may not cover the metrics most critical to your use case.

### Developer Experience Investment

The significant investment in developer experience tooling—Kyte integration, SDKs in multiple languages, simple configuration interfaces, staging environments—reflects hard-won understanding that platform success depends on adoption, and adoption depends on friction reduction. The choice to support SQL as the primary interface rather than forcing adoption of more sophisticated frameworks demonstrates respect for existing user skills and workflows.

### Streaming Abstraction Timing

The relatively recent development of the `RealtimeMLPipeline` abstraction for Flink applications suggests that Lyft initially underestimated the complexity barrier for streaming feature development. The significant staffing investment now being directed to the Stream Compute team indicates recognition that streaming will become increasingly important, particularly for emerging AI/LLM applications requiring low-latency context.

### Metadata and Governance Evolution

The active implementation of data contracts reflects learning that implicit expectations around feature quality, freshness, and ownership don't scale. As the platform grew to 60+ use cases with 25% year-over-year growth in service callers, explicit contracts became necessary to maintain trust. The inclusion of GDPR-optimized indexing in the DynamoDB schema demonstrates that regulatory requirements must be considered during initial architectural design rather than retrofitted later.

### Standardization Benefits

The development of standardized SDKs for both Golang and Python, along with normalization of access patterns, made customer activity "more monitorable, accessible, and understandable." This lesson emphasizes that observability isn't just about instrumenting your own systems—it's about standardizing how customers interact with those systems so their patterns become visible and debuggable.

### Feature Discovery as First-Class Concern

The automatic integration with Amundsen for feature discovery acknowledges that technical capability alone is insufficient—users must be able to find and understand existing features to prevent duplication. Making discovery a first-class concern in the generated DAG workflow rather than an afterthought demonstrates architectural maturity.

The Feature Store's evolution over five years, from initial implementation to the sophisticated platform described here, illustrates the iterative nature of infrastructure development. The explicit acknowledgment of this evolution—with references to earlier blog posts and conference presentations—provides valuable longitudinal perspective on how production ML infrastructure matures in response to scale, organizational growth, and emerging use cases.
