---
title: "Dagger SQL stream processing integrated with Feast for scalable real-time feature engineering"
slug: "gojek-gojeks-ml-platform-dagger-sql-stream-processing-integrated-with-feast-for-scalable-real-time-feature-engineering"
draft: false
mlopsTags:
  - "feature-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "databricks"
  - "dbt"
  - "feast"
  - "kubernetes"
  - "spark"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Gojek"
companySlug: "gojek"
platformName: "Gojek's ML platform"
contentType: "video"
summary: "Gojek's data platform team built a feature engineering infrastructure using Dagger, an open-source SQL-first stream processing framework built on Apache Flink, integrated with Feast feature store to power real-time machine learning at scale. The system addresses critical challenges including training-serving skew, infrastructure complexity for data scientists, and the need for unified batch and streaming feature transformations. By 2022, the platform supported over 300 Dagger jobs processing more than 10 terabytes of data daily, with 50+ data scientists creating and managing feature engineering pipelines completely self-service without engineering intervention, powering over 200 real-time features across Gojek's machine learning applications."
link: "https://www.tecton.ai/apply/session-video-archive/feature-engineering-at-scale-with-dagger-and-feast/"
year: 2022
seo:
  title: "Gojek: Dagger SQL stream processing integrated with Feast for scalable real-time feature engineering - ZenML MLOps Database"
  description: "Gojek's data platform team built a feature engineering infrastructure using Dagger, an open-source SQL-first stream processing framework built on Apache Flink, integrated with Feast feature store to power real-time machine learning at scale. The system addresses critical challenges including training-serving skew, infrastructure complexity for data scientists, and the need for unified batch and streaming feature transformations. By 2022, the platform supported over 300 Dagger jobs processing more than 10 terabytes of data daily, with 50+ data scientists creating and managing feature engineering pipelines completely self-service without engineering intervention, powering over 200 real-time features across Gojek's machine learning applications."
  canonical: "https://www.zenml.io/mlops-database/gojek-gojeks-ml-platform-dagger-sql-stream-processing-integrated-with-feast-for-scalable-real-time-feature-engineering"
  ogTitle: "Gojek: Dagger SQL stream processing integrated with Feast for scalable real-time feature engineering - ZenML MLOps Database"
  ogDescription: "Gojek's data platform team built a feature engineering infrastructure using Dagger, an open-source SQL-first stream processing framework built on Apache Flink, integrated with Feast feature store to power real-time machine learning at scale. The system addresses critical challenges including training-serving skew, infrastructure complexity for data scientists, and the need for unified batch and streaming feature transformations. By 2022, the platform supported over 300 Dagger jobs processing more than 10 terabytes of data daily, with 50+ data scientists creating and managing feature engineering pipelines completely self-service without engineering intervention, powering over 200 real-time features across Gojek's machine learning applications."
mlops:
  source: "sqlite"
  entryId: 69
  sourceUrl: "https://www.tecton.ai/apply/session-video-archive/feature-engineering-at-scale-with-dagger-and-feast/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061055"
  lastUpdated: "2026-04-14T19:54:54.394819"
---

## Problem Context

Gojek faced several fundamental challenges in building a scalable feature engineering platform for their machine learning operations. The most critical issue was training-serving inconsistency, which occurred not just at the feature store level but earlier in the pipeline during feature transformation. Data scientists would write transformation logic for batch processing using tools like BigQuery, Snowflake, or Spark for model training, then need to reimplement the same logic using different systems like KSQL or Flink for real-time serving. This dual implementation created significant risk of subtle bugs and divergence between training and production features.

Beyond consistency issues, the team identified that data scientists fundamentally did not want to manage data pipelines and infrastructure. Their expertise and value lay in building better models, not in operating Kubernetes clusters, Flink deployments, or Spark infrastructure. Yet without proper tooling, scaling real-time feature engineering to hundreds of data scientists would require each to become skilled in managing complex distributed systems.

The organization also struggled with lack of standardization across feature engineering workflows. With hundreds of data scientists working independently, each developed their own approaches to feature transformation, creating silos and preventing reuse of common patterns. Real-time features particularly required specialized data engineering skills that created bottlenecks in the organization.

These challenges crystallized into clear platform requirements: unified processing for streaming and batch to eliminate training-serving skew, a completely self-service platform abstracting infrastructure complexity, elastic scaling without manual intervention, standardized and reusable transformation patterns, and most importantly, requiring no additional specialized skills beyond SQL for data scientists to create real-time features.

## Architecture & Design

The Gojek feature engineering architecture centers on Dagger as the transformation engine, integrated with Feast as the feature store and their internal tool Mullin for model training and deployment. The end-to-end data flow begins with raw data ingested into Kafka event streams. Dagger consumes from these streams, performs feature transformations and aggregations, then syncs computed features into Feast. Models pull features from Feast for both training and serving, with inference logs flowing back to Kafka for monitoring and auditing purposes.

Dagger's internal architecture consists of several key components working in concert. At the entry point, consumers pull data from multiple sources including both batch systems and streaming platforms. A deserialization layer handles converting various data formats (protobuf, Avro, JSON, etc.) into structured records that can be processed. The pre-processor stage allows hooking custom logic before core SQL execution, enabling use cases like data masking or initial enrichment.

The heart of Dagger is its SQL execution engine built on Apache Flink, which processes transformation logic defined in standard SQL. This provides access to Flink's stateful stream processing capabilities including windowing, aggregations, and joins, all while abstracting the underlying framework complexity from end users. A post-processor stage can interact with external data sources for enrichment, making asynchronous calls to APIs, caches, or object stores to augment streaming data with additional context.

Finally, the sink layer handles outputting transformed features to multiple destinations, with serialization support for various formats. The primary sink targets Feast for feature storage, but Dagger can simultaneously write to other systems including data warehouses, monitoring systems, or additional Kafka topics.

A critical architectural innovation is Dagger's hybrid data source capability, which allows simultaneous consumption from both batch and streaming sources in a single job. For example, a Dagger job can read historical data from Google Cloud Storage for the past year to 30 days ago, then seamlessly transition to reading the last 30 days from Kafka, then continue with real-time streaming. This unified processing eliminates the need to maintain separate batch and streaming transformation logic, directly addressing the training-serving consistency challenge.

## Technical Implementation

Dagger is fundamentally built on Apache Flink, leveraging its distributed stream processing engine while providing significant abstractions above it. The key technical decision was making the framework SQL-first, allowing data scientists to define transformations using standard SQL syntax rather than writing Java or Scala code against Flink APIs directly.

The SQL-first approach serves multiple purposes beyond ease of use. SQL queries have predictable termination and resource consumption characteristics, preventing data scientists from accidentally writing runaway custom code that monopolizes cluster resources. It also eliminates the need to learn new languages or frameworks, maintaining consistency with how data scientists already work with batch data in warehouses.

For the approximately 5-10% of use cases where SQL proves insufficient, Dagger provides extensibility through User-Defined Functions (UDFs). Data scientists can implement custom logic in Python or Java, register these as UDFs, then invoke them within SQL queries. Examples include geospatial transformations like converting latitude/longitude to geohash, or complex domain-specific calculations. Importantly, UDFs become part of a shared library that any data scientist can reuse, promoting standardization while maintaining flexibility.

Data masking capabilities leverage Dagger's transformer architecture to address a common challenge in ML operations: data scientists need production-quality data for local development and staging environments, but security and compliance requirements prevent copying sensitive production data. Dagger's hash transformer automatically encrypts PII and sensitive fields during data extraction, providing production data with identical statistical properties and throughput characteristics but with encrypted sensitive values. This allows safe use of production data across environments without compromising security.

The platform runs on Kubernetes for elastic infrastructure scaling. When a data scientist defines a new Dagger job through the self-service interface, the platform automatically provisions necessary Flink cluster resources, deploys the job, and configures monitoring and alerting. When jobs complete or are removed, resources scale back down automatically. This elasticity is critical for supporting 50+ data scientists creating jobs independently without central infrastructure team bottlenecks.

Dagger supports GitOps workflows where transformation jobs can be defined as YAML specifications and managed through Git version control. This allows feature transformations to be versioned alongside feature definitions in Feast, providing unified configuration management and change tracking across the feature engineering lifecycle.

The stream enrichment capability deserves particular attention for its technical implementation. Dagger can make asynchronous calls to external endpoints during stream processing, issuing lookups to REST APIs, Elasticsearch indices, object stores, or caches to fetch additional data that gets joined with streaming events. Configuration is declarative, specifying the external source, endpoint details, timeout parameters, and field mappings. This enables patterns like fetching customer profile data from Elasticsearch to enrich transaction events, or calling ML model endpoints for real-time inference.

## Scale & Performance

The production deployment at Gojek demonstrates substantial scale. The platform runs over 300 Dagger jobs dedicated to feature engineering, processing more than 10 terabytes of data daily. These jobs power over 200 real-time features used across Gojek's machine learning applications spanning fraud detection, dynamic pricing, recommendations, and other use cases.

Critically, more than 50 data scientists create and manage these Dagger jobs completely independently without requiring data engineering team intervention. This self-service operation represents a significant organizational scaling achievement, effectively decentralizing feature engineering while maintaining consistency and reliability.

The platform has been in production for several years, powering not just Gojek but also companies within their ecosystem including Midtrans, Mapan, and Moka. This multi-tenant production usage across multiple organizations validates the architecture's robustness and generalizability beyond a single company's specific requirements.

Following the decision to open source Dagger approximately eight months prior to the 2022 presentation, the project attracted over 200 contributors with 80% year-over-year growth, over 2,000 commits in the past year, and over 1,000 community members across GitHub and Slack. This external adoption and contribution indicates the broader applicability of the approach beyond Gojek's internal use cases.

## Trade-offs & Lessons

The SQL-first design philosophy emerged as a critical success factor in achieving data scientist adoption. Rather than introducing a new domain-specific language or requiring expertise in Flink programming, keeping SQL as the primary interface allowed data scientists to leverage existing skills. This dramatically reduced the learning curve and friction in platform adoption. The team found that SQL satisfies approximately 90-95% of feature engineering use cases, with UDF extensibility handling the remaining edge cases.

Achieving genuine self-service required going beyond just providing an API or CLI. Gojek built a complete web-based interface where data scientists can specify data sources, write transformation SQL, configure sinks, view logs, monitor job execution, and set up alerts all within a single interface. This comprehensive UX investment proved essential for removing all dependencies on the data platform team for routine feature engineering tasks.

The hybrid data source capability solving the training-serving consistency problem represents a key architectural insight. Rather than accepting the status quo of separate batch and streaming pipelines, recognizing that a single transformation definition could operate across both eliminates an entire class of bugs and maintenance burden. The ability to seamlessly transition from batch historical data to streaming data within a single job also dramatically simplifies backfilling scenarios.

Building on Kubernetes provided the elastic infrastructure foundation necessary for self-service operation at scale. Without automatic provisioning and deprovisioning of compute resources, supporting 50+ independent data scientists creating jobs would require either significant infrastructure team overhead or constraining usage through quotas and approval processes.

The decision to build on Apache Flink rather than Spark reflects a deliberate choice favoring true stream processing semantics over micro-batch approaches. Flink's stateful stream processing model with proper event time handling, watermarks, and exactly-once processing guarantees aligns better with real-time feature engineering requirements where low-latency and correctness are both critical.

Reliability and observability proved essential for building data scientist confidence in the platform. The comprehensive monitoring, logging, and alerting capabilities built into the self-service interface weren't just nice-to-have features but necessary trust-building mechanisms. Data scientists needed confidence that their production feature pipelines would maintain high uptime and that they could diagnose issues independently when problems occurred.

The stream enrichment pattern for real-time inference demonstrates creative reuse of the feature engineering infrastructure. Rather than requiring separate systems for serving predictions, Dagger jobs can call model endpoints, enrich streaming events with predictions, and publish results back to Kafka. This creates a unified event-driven architecture where prediction logs are available for downstream consumption by monitoring systems, analytics, and other use cases.

An important lesson around organizational change management emerged: reaching 300+ data scientists using the platform required not just good technology but the right incentives. The team focused on making the new approach strictly easier and faster than existing methods—writing SQL and getting a running job in minutes versus spinning up custom infrastructure and writing framework-specific code. The value proposition had to be immediately clear and compelling to drive organic adoption.

The broader context of Dagger as part of the Data Ops Foundation initiative reveals a holistic philosophy of building integrated experiences rather than point tools. Rather than thinking in terms of "we need a stream processor" or "we need a feature store," the team designed around user journeys across personas (data scientists, analytics engineers, data engineers) through a discover-understand-operate-apply framework. This experience-first approach led to better integrated tooling where components work together naturally.

Open sourcing after years of internal production use represents a conscious decision to build broader community and ecosystem. While many organizations keep internal platforms proprietary, Gojek chose to share Dagger openly, attracting external contributors who expand capabilities and validate approaches across different environments and use cases. This creates a positive feedback loop benefiting both the internal platform and the broader community.
