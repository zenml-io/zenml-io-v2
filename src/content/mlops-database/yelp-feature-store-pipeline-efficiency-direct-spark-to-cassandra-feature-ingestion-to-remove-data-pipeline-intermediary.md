---
title: "Direct Spark-to-Cassandra feature ingestion to remove Data Pipeline intermediary and cut ML infrastructure costs"
slug: "yelp-feature-store-pipeline-efficiency-direct-spark-to-cassandra-feature-ingestion-to-remove-data-pipeline-intermediary"
draft: false
mlopsTags:
  - "feature-store"
  - "pipeline-orchestration"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "feature-engineering"
industryTags: "media-entertainment"
company: "Yelp"
companySlug: "yelp"
platformName: "Feature Store / Pipeline Efficiency"
contentType: "blog"
summary: "Yelp's ML platform team optimized their feature store infrastructure by implementing direct ingestion from Spark to Cassandra, eliminating a multi-step pipeline that previously required routing through their Data Pipeline system. The legacy approach involved five separate steps including Avro schema registration, Data Pipeline publication, and Cassandra Sink connections, creating operational complexity and cost overhead. By building a first-class integration using the open-source Spark Cassandra Connector with custom rate-limiting, concurrency controls, and distributed locks via Zookeeper, Yelp achieved 30% ML infrastructure cost savings by eliminating the Data Pipeline intermediary and Sink connectors, while also improving developer velocity by 25% through simplified feature publishing workflows and better visibility into data availability."
link: "https://engineeringblog.yelp.com/2024/09/boosting-ml-pipeline-efficiency-direct-cassandra-ingestion-from-spark.html"
year: 2024
seo:
  title: "Yelp: Direct Spark-to-Cassandra feature ingestion to remove Data Pipeline intermediary and cut ML infrastructure costs - ZenML MLOps Database"
  description: "Yelp's ML platform team optimized their feature store infrastructure by implementing direct ingestion from Spark to Cassandra, eliminating a multi-step pipeline that previously required routing through their Data Pipeline system. The legacy approach involved five separate steps including Avro schema registration, Data Pipeline publication, and Cassandra Sink connections, creating operational complexity and cost overhead. By building a first-class integration using the open-source Spark Cassandra Connector with custom rate-limiting, concurrency controls, and distributed locks via Zookeeper, Yelp achieved 30% ML infrastructure cost savings by eliminating the Data Pipeline intermediary and Sink connectors, while also improving developer velocity by 25% through simplified feature publishing workflows and better visibility into data availability."
  canonical: "https://www.zenml.io/mlops-database/yelp-feature-store-pipeline-efficiency-direct-spark-to-cassandra-feature-ingestion-to-remove-data-pipeline-intermediary"
  ogTitle: "Yelp: Direct Spark-to-Cassandra feature ingestion to remove Data Pipeline intermediary and cut ML infrastructure costs - ZenML MLOps Database"
  ogDescription: "Yelp's ML platform team optimized their feature store infrastructure by implementing direct ingestion from Spark to Cassandra, eliminating a multi-step pipeline that previously required routing through their Data Pipeline system. The legacy approach involved five separate steps including Avro schema registration, Data Pipeline publication, and Cassandra Sink connections, creating operational complexity and cost overhead. By building a first-class integration using the open-source Spark Cassandra Connector with custom rate-limiting, concurrency controls, and distributed locks via Zookeeper, Yelp achieved 30% ML infrastructure cost savings by eliminating the Data Pipeline intermediary and Sink connectors, while also improving developer velocity by 25% through simplified feature publishing workflows and better visibility into data availability."
mlops:
  source: "sqlite"
  entryId: 216
  sourceUrl: "https://engineeringblog.yelp.com/2024/09/boosting-ml-pipeline-efficiency-direct-cassandra-ingestion-from-spark.html"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.618345"
  lastUpdated: "2026-04-14T19:56:04.655628"
---

## Problem Context

Yelp's ML platform powers critical business capabilities including search, advertising, and review systems through a centralized Feature Store architecture. This Feature Store serves as a unified abstraction layer over both historical data (stored in their Data Lake) and real-time data (stored in Cassandra or NrtSearch), enabling ML models to access features consistently across training and inference environments. The dual-mode requirement exists because models train on historical data but serve predictions in real-time production systems.

The original architecture for syncing features from the historical store to the online Cassandra store created significant operational friction. Engineers needed to execute five distinct steps to publish features: creating a Sync job that reads from Data Lake and republishes to Data Pipeline, defining and registering Avro schemas for Data Pipeline compatibility, scheduling the Spark job in Tron (Yelp's centralized scheduler), making schema changes in Cassandra through strict governance processes, and finally creating Cassandra Sink connections to push data from Data Pipeline into Cassandra. This complexity introduced multiple pain points including data duplication costs in the Data Pipeline layer, coordination overhead across five separate configuration steps, and poor visibility into when features became available since the Cassandra Sink Connector relied on eventual consistency semantics.

The fundamental architectural challenge was that Yelp's internal Spark ETL framework—a PySpark wrapper—lacked direct integration with online datastores, forcing all writes through the Data Pipeline intermediary. This indirection created unnecessary cost and operational complexity that the platform team sought to eliminate.

## Architecture & Design

The redesigned architecture elevates Cassandra to a first-class citizen within Yelp's Spark ETL framework, enabling direct data flow from Spark jobs to Cassandra tables without intermediate systems. The Feature Store maintains its role as an abstraction over historical (Data Lake) and real-time (Cassandra/NrtSearch) stores, but the sync mechanism between these layers becomes dramatically simpler.

In the new design, Sync jobs read features directly from the Data Lake and write them straight to Cassandra using Spark dataframes. The data flow is linear: Data Lake → Spark job → Cassandra, eliminating the previous Data Lake → Spark → Data Pipeline → Cassandra Sink → Cassandra pathway. This architectural simplification removes two entire infrastructure components (Data Pipeline and Sink connectors) from the feature publishing workflow.

A critical design decision involved protecting Cassandra production clusters from being overwhelmed by Spark workloads. The team considered spinning up dedicated Cassandra datacenters for Spark operations but rejected this approach for two reasons: the additional infrastructure cost of running separate Cassandra clusters, and the fact that Spark workloads are write-heavy, meaning data replication across datacenters would still create load on production nodes without providing isolation benefits.

Instead, the architecture implements multiple protective mechanisms directly in the Spark layer. These controls work together to prevent any single Spark job or combination of concurrent jobs from degrading Cassandra's ability to serve live user traffic. The design philosophy emphasizes rate-limiting at the Spark side rather than relying solely on Cassandra's backpressure mechanisms, creating predictable, controlled ingestion patterns.

## Technical Implementation

The foundation of the direct integration is the open-source Spark Cassandra Connector, which provides bidirectional data movement: ingesting Spark dataframes to Cassandra tables and extracting Cassandra data into Spark dataframes. On top of this connector, Yelp built several custom protective mechanisms to ensure production safety.

**Batching Strategy**: The team disabled batch mode for Cassandra writes after discovering that Spark dataframes could be partitioned by columns that don't correspond to Cassandra partition keys. Enabling batching without re-partitioning would cause individual requests to span multiple Cassandra partitions, creating inefficient cross-partition operations. Rather than incur the overhead of re-partitioning Spark dataframes to align with Cassandra partition keys, the team kept batching disabled, accepting single-row writes as the safer default.

**Concurrency Controls**: The implementation limits concurrent writers to Cassandra to avoid saturating Cassandra's Native Transport Request (NTR) queue. This prevents Spark from overwhelming the coordination layer that handles CQL protocol requests. By constraining concurrency at the Spark side, the system lets Cassandra's own backpressure mechanisms operate in their designed range rather than forcing them into pathological edge cases.

**Static Rate-Limiting**: A major challenge was the absence of adaptive rate control in the Spark Cassandra Connector (tracked as JIRA issue SPARKC-594). The connector provides only static rate-limiting configurations defined per executor core (Spark task), specifically `spark.cassandra.output.throughputMBPerSec` and `spark.cassandra.output.concurrent.writes`. These per-task settings become problematic in two scenarios: when a Spark job launches with many cores/executors creating massive parallelism, or when multiple Spark jobs simultaneously access the same Cassandra cluster.

To address this, Yelp implemented job-level rate-limiting independent of the number of executors or cores. With Spark's Dynamic Resource Allocation (DRA) enabled, determining exact resource counts is challenging, so they compute the maximum possible executor cores as: **max.executor.cores = min(max.executors × max.cores, max.spark.partitions)**. This formula bounds the theoretical maximum parallelism, allowing conservative rate limit calculations that protect Cassandra regardless of how DRA scales the job.

**Distributed Concurrency Control**: To limit the number of concurrent Spark jobs accessing any given Cassandra cluster, the team implemented distributed locks using Zookeeper as the coordination service. The semaphore-based locking mechanism makes the maximum concurrent job count configurable, allowing different limits for different Cassandra clusters based on their capacity. Lock contention time is configurable so jobs can wait for semaphore availability rather than failing immediately.

The lock acquisition timing is strategically positioned just before initiating the Spark job itself, not at job submission time. This prevents a scenario where Spark resources are allocated and allocated but remain idle while waiting for a Cassandra semaphore, which would waste cluster resources. The semaphore maximum count is proportional to each Cassandra cluster's computational capacity, creating a self-tuning system where larger clusters accept more concurrent ingest jobs.

**Schema Management**: While Avro schema registration was previously a hard requirement for Data Pipeline publication, it becomes optional in the direct ingestion model. Schemas can still be defined for early data validation and verification purposes, but are no longer mandatory for the data movement itself. Cassandra schema changes remain governed by Yelp's strict controls, but the reduced steps mean fewer moving parts overall.

## Scale & Performance

The performance and cost improvements from direct ingestion are substantial and well-quantified. Yelp reports **30% ML infrastructure cost savings** across the feature publishing workflow. This breaks down into specific cost component changes:

**Spark computational costs**: Jobs now run longer but consume dramatically fewer executors. The rate-limiting mechanisms constrain parallelism, trading completion time for resource efficiency. The net effect is lower total compute cost despite longer wall-clock duration.

**Data Pipeline costs**: Completely eliminated. The intermediate storage and processing layer is no longer needed, removing both storage costs for duplicated feature data and the computational overhead of ingesting and serving that data through the pipeline.

**Sink Connection costs**: Completely eliminated. The Cassandra Sink connectors that previously pulled data from Data Pipeline and wrote to Cassandra are removed, along with their operational overhead.

**Cassandra I/O costs**: Remain essentially unchanged. The same volume of data ultimately gets written to Cassandra, so disk I/O and storage costs are comparable. The difference is that writes now arrive in a more controlled, rate-limited pattern rather than in eventual-consistency bursts from the Sink connector.

Beyond infrastructure costs, the team measured a **25% improvement in engineering effectiveness** for feature publishing workflows. This efficiency gain comes from eliminating three of the five original steps (Data Pipeline publication, Avro schema registration as a hard requirement, and Sink connection creation), reducing coordination overhead and potential failure modes.

**Developer visibility** improved qualitatively though no specific metrics are provided. The eventual consistency model of the Cassandra Sink Connector made it difficult to determine precisely when features became available for reads. With direct ingestion, data availability is deterministic: features are readable immediately when the Spark job completes successfully. This tighter coupling between job completion and data availability simplifies debugging and reduces uncertainty in downstream workflows.

## Trade-offs & Lessons

The direct ingestion approach makes several deliberate trade-offs that practitioners should understand. The most significant is **longer job execution time in exchange for lower resource consumption**. By aggressively rate-limiting and constraining concurrency to protect Cassandra, Spark jobs complete more slowly than they theoretically could. This is an intentional choice that prioritizes the reliability of production serving systems over batch job throughput. The cost savings validate this trade-off, but teams with stricter SLAs on data freshness might need different balance points.

The decision to **disable batching** represents another trade-off between simplicity and potential optimization. Batching could improve write efficiency if Spark dataframes were repartitioned to align with Cassandra partition keys, but the team judged the complexity and computational overhead of that repartitioning as not worth the potential gains. This suggests that for their workload characteristics—likely wide tables with many partition keys—single-row writes are acceptable. Teams with different data models might benefit from exploring the repartitioning approach.

**Lack of adaptive rate-limiting** emerges as a significant limitation. The team explicitly notes that adaptive rate control in the Spark Cassandra Connector (JIRA SPARKC-594) would improve developer experience. Static rate limits require conservative settings to handle worst-case scenarios, which means jobs often run slower than they safely could. An adaptive system that monitors Cassandra metrics and adjusts ingestion rate dynamically would optimize the trade-off between job speed and cluster safety. This represents a clear area for future improvement.

The **Zookeeper-based semaphore** approach for limiting concurrent jobs is operationally simple but somewhat coarse-grained. It works well when job patterns are relatively predictable, but doesn't account for varying job sizes or resource requirements. A more sophisticated scheduler that considers job characteristics could pack work more efficiently, but would add complexity. The current approach represents pragmatic engineering—solving the immediate problem with proven infrastructure (Zookeeper) rather than building novel scheduling systems.

The team identifies **Spark Bulk Analytics** as a promising future direction. The current implementation uses Cassandra's Native Transport Request layer, which has inherent coordination overhead and request queue limits. Bulk Analytics would bypass these limits and theoretically achieve throughput approaching hardware maximums (disk I/O limits). This suggests the current implementation is still leaving performance on the table, but chose proven approaches over bleeding-edge optimizations for the initial deployment.

**Schema governance** remains a pain point, though reduced. Cassandra schema changes still require following strict processes at Yelp, meaning adding new feature columns involves coordination. The direct ingestion approach doesn't eliminate this step, though it does remove several others. Teams adopting similar architectures should consider whether schemaless approaches or more flexible schema evolution would further reduce friction.

The **rejection of dedicated Cassandra datacenters** for Spark workloads is an important architectural lesson. It's tempting to solve interference problems through isolation, but the team correctly identified that write-heavy workloads with cross-datacenter replication don't benefit from dedicated clusters. The writes still propagate everywhere, so the isolation is illusory. This insight saves significant infrastructure cost while forcing the team to build better rate-limiting, which ultimately creates a more robust system.

Overall, the case study demonstrates how removing indirection from data pipelines can yield substantial benefits when done carefully. The 30% cost reduction and 25% efficiency improvement validate the approach, but success required sophisticated protective mechanisms. Teams considering similar optimizations should recognize that eliminating intermediate systems requires moving their reliability mechanisms elsewhere—in this case, into the Spark layer with rate-limiting, concurrency controls, and distributed locking. The trade-off of longer job times for lower costs and better developer experience proves worthwhile for Yelp's use case, but requires operational maturity to implement safely.
