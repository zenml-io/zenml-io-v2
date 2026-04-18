---
title: "Chronon feature platform for online-offline consistency with batch and streaming computation and low-latency KV serving"
slug: "airbnb-chronon-internal-dataai-app-platform-conversational-ai-platform-chronon-feature-platform-for-online-offline-consi"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "spark"
  - "data-ingestion"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "other"
company: "Airbnb"
companySlug: "airbnb"
platformName: "Chronon / Internal Data+AI App Platform / Conversational AI Platform"
contentType: "blog"
summary: "Airbnb built and open-sourced Chronon, a feature platform that addresses the core challenge of ML practitioners spending most of their time on data plumbing rather than modeling. Chronon solves the long-standing problem of online-offline feature consistency by allowing practitioners to define features once and use them for both offline model training and online inference, eliminating the need to either replicate features across environments or wait for logged data to accumulate. The platform handles batch and streaming computation, provides low-latency serving through a KV store, ensures point-in-time accuracy for training data, and offers observability tools to measure online-offline consistency, enabling teams at Airbnb and early adopter Stripe to accelerate model development while maintaining data integrity."
link: "https://medium.com/airbnb-engineering/chronon-airbnbs-ml-feature-platform-is-now-open-source-d9c4dba859e8"
year: 2024
seo:
  title: "Airbnb: Chronon feature platform for online-offline consistency with batch and streaming computation and low-latency KV serving - ZenML MLOps Database"
  description: "Airbnb built and open-sourced Chronon, a feature platform that addresses the core challenge of ML practitioners spending most of their time on data plumbing rather than modeling. Chronon solves the long-standing problem of online-offline feature consistency by allowing practitioners to define features once and use them for both offline model training and online inference, eliminating the need to either replicate features across environments or wait for logged data to accumulate. The platform handles batch and streaming computation, provides low-latency serving through a KV store, ensures point-in-time accuracy for training data, and offers observability tools to measure online-offline consistency, enabling teams at Airbnb and early adopter Stripe to accelerate model development while maintaining data integrity."
  canonical: "https://www.zenml.io/mlops-database/airbnb-chronon-internal-dataai-app-platform-conversational-ai-platform-chronon-feature-platform-for-online-offline-consi"
  ogTitle: "Airbnb: Chronon feature platform for online-offline consistency with batch and streaming computation and low-latency KV serving - ZenML MLOps Database"
  ogDescription: "Airbnb built and open-sourced Chronon, a feature platform that addresses the core challenge of ML practitioners spending most of their time on data plumbing rather than modeling. Chronon solves the long-standing problem of online-offline feature consistency by allowing practitioners to define features once and use them for both offline model training and online inference, eliminating the need to either replicate features across environments or wait for logged data to accumulate. The platform handles batch and streaming computation, provides low-latency serving through a KV store, ensures point-in-time accuracy for training data, and offers observability tools to measure online-offline consistency, enabling teams at Airbnb and early adopter Stripe to accelerate model development while maintaining data integrity."
mlops:
  source: "sqlite"
  entryId: 211
  sourceUrl: "https://medium.com/airbnb-engineering/chronon-airbnbs-ml-feature-platform-is-now-open-source-d9c4dba859e8"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.618145"
  lastUpdated: "2026-04-14T19:56:01.050393"
---

## Problem Context

Airbnb built Chronon to address a fundamental pain point in machine learning operations: ML practitioners were spending the majority of their time managing data pipelines and infrastructure rather than focusing on modeling and feature engineering. Before Chronon, teams faced a difficult choice between two problematic approaches, each with severe limitations.

The first approach, "replicate offline-online," involved training models using data warehouse resources and then attempting to reproduce those same features in the online serving environment. While this allowed practitioners to leverage the full power of the data warehouse with its comprehensive data sources and transformation capabilities, it created a critical problem: no clear path existed for serving features during online inference. This led to inconsistencies between training and serving features, as well as label leakage issues that severely degraded model performance in production.

The second approach, "log and wait," started with data already available in the online serving environment. Practitioners would log features, wait for sufficient data to accumulate in the data warehouse, then train models on those logs and serve using the same data sources. This guaranteed consistency and minimized leakage risk, but created unacceptable delays. Teams couldn't respond quickly to changing user behavior, as they had to wait for weeks or months of logged data before iterating on models.

The fundamental challenge was maintaining point-in-time accuracy and online-offline consistency while still enabling rapid iteration and leveraging the full breadth of available data sources. This is a classic MLOps problem that plagues organizations at scale, where the gap between batch and real-time systems creates operational overhead and model quality issues.

## Architecture & Design

Chronon's architecture centers around a declarative API that allows ML practitioners to define features once and automatically generates both offline batch computation pipelines and online streaming/serving infrastructure. The platform consists of several key components that work together to enable this unified approach.

The **Source** abstraction represents the entry point for data into Chronon. Sources can be either EventSources or EntitySources. EventSources point to both a batch table in the data warehouse (for historical data) and a streaming topic (for real-time updates). For example, a purchases log might have a batch table that updates daily and a Kafka-style topic that streams new purchase events. EntitySources point to snapshot tables that contain daily snapshots of entity data like user profiles. Each source includes a Query that specifies which fields to select and, critically for EventSources, identifies the timestamp column used for temporal accuracy.

The **GroupBy** API transforms raw source data into feature values by performing aggregations. For event data, GroupBys specify aggregation operations (SUM, COUNT, AVERAGE, LAST_K) over configurable time windows (such as 3, 14, or 30 days). The aggregations are keyed by entity identifiers like user_id. For entity data where the primary key matches the feature key, GroupBys can simply extract column values without aggregation. Each GroupBy specifies whether it should be available online, triggering Chronon to set up the necessary serving infrastructure.

The **Join** API combines multiple GroupBys into a unified feature set suitable for model training and inference. A Join has a "left" side, typically an event source representing the context where the model will run (such as checkout events), and "right parts" consisting of the various GroupBys to include. The left side's timestamp is crucial—it determines the point-in-time at which all features are computed, ensuring temporal consistency.

The data flow architecture operates in parallel offline and online paths. For offline computation, Chronon runs Spark jobs against the data warehouse to backfill historical feature values. These backfills use the timestamp from the left side of the Join to compute every feature value as-of that specific moment, ensuring window accuracy. For online computation, Chronon takes a hybrid approach: it runs daily batch jobs to upload computed feature values to a key-value store for serving, and for streaming features, it additionally runs streaming jobs that process real-time events and update the KV store with fresh values.

The streaming architecture is particularly sophisticated. For features with long time windows, Chronon doesn't rely solely on streaming computation. Instead, batch jobs "seed" the initial values and compress "the middle of the window," while streaming jobs provide accuracy at both the head and tail of the window by processing recent events. This hybrid approach balances computational efficiency with temporal precision.

Feature serving happens through a Fetch API that reads from the online KV store. Applications can fetch individual GroupBys or complete Joins, receiving a map of feature names to values. Chronon provides client libraries in Java and Scala, plus a Python CLI tool for testing. Some teams at Airbnb wrap these APIs in REST services for non-JVM environments like Ruby.

A unique aspect of Chronon's architecture is its **online-offline consistency measurement pipeline**. This system logs every online fetch request, including the keys, timestamp, and returned feature values. Chronon then runs those same keys and timestamps through the offline backfill pipeline and compares the backfilled values against what was actually served online, producing consistency metrics that help teams identify and debug discrepancies.

## Technical Implementation

Chronon is implemented primarily as a Scala library that generates execution plans for Apache Spark for batch computation. The declarative Python API allows practitioners to define features using familiar constructs, which Chronon compiles into optimized Spark jobs.

For batch processing, Chronon runs on top of the data warehouse, processing historical data through Spark. The system includes specialized algorithms for handling highly skewed datasets, a common problem when aggregating user behavior data where some users are extremely active. These skew-handling optimizations prevent out-of-memory errors and job failures that would otherwise occur with naive aggregation approaches. Chronon also bakes in computational efficiency optimizations directly into the backend, reducing both compute time and cost compared to hand-written feature pipelines.

The streaming infrastructure processes events from topics (likely Kafka-based, though the specific message queue isn't explicitly stated). Streaming jobs maintain state and update aggregations incrementally as new events arrive. These updates are written to the online KV store, keeping feature values fresh for serving. The specific KV store technology isn't detailed in the source, but it needs to support high-throughput writes from streaming jobs and low-latency reads for serving.

The Fetch API implementation provides Java and Scala clients that applications integrate directly. For a Join fetch, the client makes a request with a map of key-value pairs (such as `{"user_id": "123"}`) and receives back a map of feature name to feature value. The Python CLI tool (`run.py`) offers a convenient interface for debugging: `run.py --mode=fetch -k '{"user_id":123}' -n quickstart/training_set -t join`.

Point-in-time accuracy is achieved through careful timestamp handling in the Spark jobs. When backfilling features for training data, Chronon uses the timestamp from each row of the left-side source to compute window aggregations that reflect exactly what would have been known at that moment. This prevents label leakage and ensures that models train on the same feature distributions they'll encounter in production.

The platform includes observability tooling beyond just consistency measurement. The system captures metadata about feature definitions, usage patterns, and computation characteristics. This metadata enables future capabilities like automated feature discovery and intelligent optimization recommendations.

## Scale & Performance

While the source doesn't provide extensive quantitative metrics, it does indicate that Chronon operates at the scale required by Airbnb and Stripe, both large technology companies processing massive volumes of data and serving high-traffic applications.

The platform is described as "built for the scale of data processed by large companies," suggesting it handles production workloads involving potentially billions of events and millions of entities. The emphasis on skew handling and computational optimizations indicates the system deals with highly imbalanced data distributions where certain keys (popular users, items, or sessions) have orders of magnitude more events than others.

Latency for online feature serving is described as "low latency" through the Fetch API, though specific millisecond measurements aren't provided. The architecture's use of a KV store for serving, combined with pre-computed batch uploads and streaming updates, enables sub-second fetch latencies typical of real-time ML applications.

The system supports various window sizes ranging from three days to thirty days or longer in the examples provided. The LAST_K operation can maintain lists of the last ten values, indicating the system handles both scalar aggregations and more complex data structures.

Batch job frequency is daily for uploading features to the online store, which provides a reasonable balance between freshness and computational cost for features that don't require real-time updates. Streaming features receive continuous updates as events arrive.

The consistency measurement pipeline processes all online fetch request logs, comparing them against backfilled values, suggesting significant observability overhead that the platform absorbs without impacting serving latency.

## Trade-offs & Lessons Learned

Chronon represents a carefully considered set of trade-offs that reflect Airbnb's experience building ML systems at scale. The platform's design choices reveal important lessons for practitioners building similar infrastructure.

The hybrid batch-streaming approach for feature computation reflects a pragmatic understanding that pure streaming is neither necessary nor cost-effective for all features. By using batch jobs to seed values and handle the "middle" of long time windows while using streaming for head and tail accuracy, Chronon achieves a good balance between freshness, accuracy, and computational cost. This is more sophisticated than either pure batch or pure streaming approaches.

The decision to make the platform declarative rather than imperative reduces the cognitive load on ML practitioners. By defining features once and having Chronon handle the translation to both offline and online systems, teams avoid the error-prone process of manually maintaining parallel implementations. However, this abstraction necessarily constrains the types of transformations available. The API supports common aggregations (SUM, COUNT, AVERAGE, LAST_K) and windows, but more exotic transformations may require workarounds or extensions.

The emphasis on point-in-time accuracy as a first-class concern demonstrates maturity in understanding ML system failures. Many organizations discover temporal leakage problems only after deploying models to production and observing degraded performance. Chronon makes this correctness property automatic rather than requiring manual vigilance.

The consistency measurement pipeline is particularly notable. Rather than simply promising online-offline consistency, Chronon provides tooling to measure and verify it continuously. This moves consistency from a hopeful assertion to an observable metric that teams can monitor and alert on. However, this does require maintaining and processing logs of all fetch requests, adding operational overhead.

The platform's open-sourcing in partnership with Stripe as an early adopter and co-maintainer suggests confidence in the generalizability of the design. Stripe's involvement indicates the architecture isn't overly specific to Airbnb's infrastructure choices. This cross-company validation is valuable for potential adopters evaluating whether Chronon fits their needs.

Looking forward, the team identifies several areas for continued development. They acknowledge that despite existing optimizations, there are always further improvements possible in compute cost and iteration speed. The vision of integrating NLP for feature authoring—allowing practitioners to express feature ideas in natural language and generate code—represents an ambitious direction that would lower the technical barrier to feature engineering and enable new collaboration patterns between ML practitioners and domain experts.

The aspiration to detect and automatically respond to data drift by retraining, adding features, or modifying existing ones reflects a goal of moving beyond feature serving toward more comprehensive model lifecycle management. Similarly, the vision of the platform as an "intelligent agent" that helps practitioners by answering questions about feature effectiveness and recommending relevant data sources represents a significant expansion of scope.

The practical challenge for teams considering Chronon is evaluating the fit with their existing infrastructure. The platform requires Spark for batch processing, a streaming infrastructure for real-time features, and a KV store for serving. Organizations without these components would need to deploy them or adapt Chronon's architecture. The declarative API's expressiveness may also not cover all feature engineering patterns, requiring teams to assess whether their use cases fit within Chronon's paradigm.

Overall, Chronon represents a mature approach to feature platform architecture that embodies hard-won lessons from operating ML systems at scale. Its emphasis on correctness, observability, and practitioner productivity over raw performance reflects a sophisticated understanding of what actually matters for ML operations in production environments.
