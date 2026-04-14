---
title: "Robusta: Declarative Aggregation Features for Faster Recommendation System Iteration at Scale"
slug: "snap-snapchats-ml-platform-robusta-declarative-aggregation-features-for-faster-recommendation-system-iteration-at-scale"
draft: false
mlopsTags:
  - "data-versioning"
  - "feature-store"
  - "pipeline-orchestration"
  - "databricks"
  - "iceberg"
  - "spark"
  - "data-prep"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Snap"
companySlug: "snap"
platformName: "Snapchat's ML platform"
contentType: "blog"
summary: "Snap built Robusta, an internal feature platform designed to accelerate feature engineering for recommendation systems by automating the creation and consumption of associative and commutative aggregation features. The platform addresses critical pain points including slow feature iteration cycles (weeks of waiting for feature logs), coordination overhead between ML and infrastructure engineers, and inability to share features across teams. Robusta enables near-realtime feature updates, supports both online serving and offline generation for fast experimentation, and processes billions of events per day using a lambda architecture with Spark streaming and batch jobs. The platform has enabled ML engineers to create features without touching production systems, with some models using over 80% aggregation features that can now be specified declaratively via YAML configs and computed efficiently at scale."
link: "https://eng.snap.com/speed-up-feature-engineering"
year: 2022
seo:
  title: "Snap: Robusta: Declarative Aggregation Features for Faster Recommendation System Iteration at Scale - ZenML MLOps Database"
  description: "Snap built Robusta, an internal feature platform designed to accelerate feature engineering for recommendation systems by automating the creation and consumption of associative and commutative aggregation features. The platform addresses critical pain points including slow feature iteration cycles (weeks of waiting for feature logs), coordination overhead between ML and infrastructure engineers, and inability to share features across teams. Robusta enables near-realtime feature updates, supports both online serving and offline generation for fast experimentation, and processes billions of events per day using a lambda architecture with Spark streaming and batch jobs. The platform has enabled ML engineers to create features without touching production systems, with some models using over 80% aggregation features that can now be specified declaratively via YAML configs and computed efficiently at scale."
  canonical: "https://www.zenml.io/mlops-database/snap-snapchats-ml-platform-robusta-declarative-aggregation-features-for-faster-recommendation-system-iteration-at-scale"
  ogTitle: "Snap: Robusta: Declarative Aggregation Features for Faster Recommendation System Iteration at Scale - ZenML MLOps Database"
  ogDescription: "Snap built Robusta, an internal feature platform designed to accelerate feature engineering for recommendation systems by automating the creation and consumption of associative and commutative aggregation features. The platform addresses critical pain points including slow feature iteration cycles (weeks of waiting for feature logs), coordination overhead between ML and infrastructure engineers, and inability to share features across teams. Robusta enables near-realtime feature updates, supports both online serving and offline generation for fast experimentation, and processes billions of events per day using a lambda architecture with Spark streaming and batch jobs. The platform has enabled ML engineers to create features without touching production systems, with some models using over 80% aggregation features that can now be specified declaratively via YAML configs and computed efficiently at scale."
mlops:
  source: "sqlite"
  entryId: 113
  sourceUrl: "https://eng.snap.com/speed-up-feature-engineering"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061536"
  lastUpdated: "2026-04-14T19:55:13.067758"
---

## Problem Context

Snap faced significant bottlenecks in their ML feature engineering workflows that were hampering the velocity of their recommendation systems development. Feature engineering remains crucial for recommendation systems even as deep learning has reduced its necessity in computer vision and NLP domains. The company identified three major pain points in their historical approach to feature development.

The traditional forward-fill process required ML engineers to implement and log features directly in critical service components, then wait weeks for feature logs before being able to train any model. This created a fundamental velocity problem where the turnaround time to determine whether a feature was useful became extremely long. ML engineers typically lacked familiarity with online serving components, making modifications risky. When infrastructure engineers were brought in to handle these changes, coordination overhead further slowed development.

Beyond velocity, Snap struggled with fragmentation and inequality across teams. Each team built their own infrastructure with overlapping functionalities, leading to duplicated effort and inability to share features between teams. Teams with more engineering resources could build sophisticated feature systems, while smaller teams lacked access to advanced capabilities. This organizational inefficiency motivated the need for a unified platform that could democratize access to advanced feature engineering capabilities across the company.

## Architecture and Design

Robusta is built around a fundamental architectural principle: leveraging associative and commutative aggregation operations. This design choice enables the system to perform large-scale aggregations efficiently by allowing arbitrary grouping of elements and order-independent processing. The platform focuses specifically on aggregation features because these account for over 80% of the signals in many of Snap's ML models, making them the highest-leverage target for automation.

The core data model uses three basic functions that parallel concepts from MapReduce and Apache Beam: map functions that process individual elements, combine functions that merge intermediate representations, and finalize functions that produce final feature values. This abstraction allows Robusta to express operations like count, sum, and approximate quantiles uniformly. For sparse signals like user-level sharing events, the system can store lists of rich contextual information that either feed directly into models or undergo processing in the finalization step.

The system architecture follows a lambda pattern with both streaming and batch components running on Dataproc Spark. The streaming component emits data with minute-level frequency to ensure freshness, while the batch component operates at hour and day granularities to ensure completeness. This dual-path approach balances the competing demands of low latency and high reliability.

Pre-aggregated data blocks are stored in Apache Iceberg tables, enabling high-throughput offline access for experimentation. For online serving, Robusta supports two deployment modes with flexibility to switch based on use case requirements. In one mode, pre-aggregated blocks for different granularities are written directly to the feature store and assembled at scoring time. In the alternative mode, features are pre-assembled offline before being pushed to serving infrastructure.

The sliding window implementation demonstrates sophisticated engineering to handle temporal aggregations efficiently. The system pre-computes and stores intermediate representations for a hierarchy of time ranges, then assembles these blocks on-demand to compute feature values for any sliding window at any point in time. For example, to calculate a 24-hour sliding window feature, the system combines pre-aggregated blocks at multiple granularities such as 5-minute, 1-hour, and 12-hour intervals. The timestamp is rounded down to align with the smallest granularity, and in the worst case with M-duration granularities over N consecutive levels, the system needs ((M-1) * N - 1) combine operations.

## Technical Implementation

Robusta's implementation centers on declarative feature specification through YAML configuration files. ML engineers define features without writing imperative code or touching production systems. Each configuration contains two main sections: a SQL statement for data transformations like column transformations, row filtering, and deduplication, and an aggregation definition that references columns from the SQL output.

The SQL query section transforms input data from predefined Spark data sources implemented by customer teams. The separate features aggregation section exists because different features often require different aggregation keys that are difficult to express in a single SQL statement. Each aggregation definition becomes a "base feature" that can produce multiple features with different time windows attached. For instance, a single base feature for "discover_snap_total_viewed_counts" might generate both six-hour and thirty-day window variants.

The group_by_selectors field provides semantic mapping between input column names and conceptual entities. This abstraction allows the system to pin data to semantic concepts like DOCUMENT_ID, ensuring that a "snap_id" in the input data maps correctly to lookup keys at serving time even if they have different names in different contexts. The primary_selector field designates which key should serve as the primary identifier for each base feature.

The aggregation pipeline implementation leverages Spark's Dataset API for data source integration. After loading data, Spark SQL applies the transformation query from the feature specification. The job then typically handles hundreds of aggregations simultaneously, executing the map and combine functions to produce representation blocks for various time intervals. These blocks can be assembled later to obtain final feature values.

For feature access, the system supports multiple scenarios. When features have high cache hit rates, such as ranking candidate features for Snap Discover channels that might be scored across many requests, it makes sense to assemble blocks offline and push final features to a key-value store or document index. For low cache hit rate scenarios or smaller scale use cases, the system queries intermediate representations directly from a key-value store and assembles them in the online serving path. The platform uses Aerospike as its key-value store for low-latency point lookups.

## Scale and Performance

Robusta operates at substantial scale, processing billions of events per day across the aggregation pipeline. Typical ML use cases involve thousands of aggregation features with varying properties including different sliding windows, aggregation keys (user ID, snap ID, or composite keys like user ID + discover channel + hour of day), and temporal granularities.

The platform supports near-realtime updates with minute-level granularity, meaning feature values can change every minute for most users as new engagement events arrive. This creates significant challenges for maintaining point-in-time correctness when generating features offline for training.

To illustrate the scale challenge, consider a naive approach to point-in-time feature lookup that would require storing feature values at every possible timestamp. With 100 million keys and one-minute granularity, this would require 100M × 60 × 24 × 30 = 4.32 trillion keys for just 30 days of history. Additionally, computing feature values for most of the 100 million keys each minute for sliding window aggregations would be computationally prohibitive.

## Offline Feature Generation and Point-in-Time Correctness

One of Robusta's most sophisticated capabilities is efficient offline feature generation that maintains point-in-time correctness. During online scoring, the system always fetches the latest available feature values from the feature store. To avoid online-offline data discrepancy during training, offline feature generation must reproduce exactly what was available at serving time for each historical impression.

The solution exploits the associative and commutative properties of the aggregations. Pre-aggregated statistics are partitioned by primary key and time bucket in Apache Iceberg. When generating features offline, input data includes the impression time, a feature version pointer logged during online feature fetching, lookup keys, and other metadata. The feature version pointer indicates the latest time bucket that had been ingested into the online database, allowing offline computation to match online behavior by limiting which time buckets are used.

The system breaks work into many parallelizable items sharded by primary key and impression time range. Each work item loads only the relevant shard and matching aggregation intervals from Iceberg. For example, to calculate 30-day counters with 12-hour and 1-hour granularities for impressions spanning May 31, the system loads twelve 12-hour blocks and twenty-four 1-hour blocks.

After loading, data goes into in-memory maps keyed by primary key, with an aggregator per feature per key to combine statistics. Since each impression requires looking up a range of aggregation intervals, the system uses a binary search tree to accelerate time range queries. After processing all Iceberg data, workers call the finalize method to extract feature values. This approach uses in-memory maps local to each shard and avoids recalculating final feature values repeatedly by working with intermediate blocks.

## Data Management and Join Optimization

Robusta implements a merge-on-read strategy for handling backfilled data rather than copy-on-write. This design choice better supports the feature experimentation workflow where backfilling is a high-frequency activity. When backfilling features, the system would need to touch all files, making full rewrites impractical. Since most backfills create brand-new columns rather than modifying existing data, merge-on-read doesn't increase the amount of data loaded at read time compared to pre-merged data. The main downside—smaller file counts—can be mitigated through periodic consolidation jobs or batching multiple backfills together. Merging data in memory during reads is relatively cheap given that all relevant data for a particular shard is already loaded.

The platform implements a bucketed join algorithm to efficiently combine offline-generated features with features from other sources before model training. The join typically involves impression data and logged features on the left-hand side (LHS) and offline-generated features on the right-hand side (RHS). Since RHS features are computed per partition on demand, this naturally fits bucketed joins.

Robusta enforces consistent user ID partitioning across both LHS and RHS to minimize data shuffling. At join time, each worker loads only the relevant join keys from the LHS for a single partition to compute user features. For non-user features that require different partitioning schemes, the system shuffles LHS lookup keys to align partitioning, computes features, then shuffles results back to match LHS user ID partitioning.

The output format leverages Parquet's columnar structure. Generated feature rows follow the exact same order as input data within each partition, and a custom Parquet writer directly appends generated columns to original LHS columns. This avoids loading all LHS columns into memory, reducing memory footprint and improving efficiency.

## Trade-offs and Lessons Learned

The decision to focus specifically on associative and commutative aggregations represents a deliberate trade-off. While this constraint limits the types of features Robusta can handle, it enables the mathematical properties that make efficient distributed computation and point-in-time correctness tractable. By targeting aggregation features that comprise over 80% of signals in many models, the team achieved high leverage despite not being a fully general-purpose feature platform.

The lambda architecture with both streaming and batch pipelines addresses the inherent tension between freshness and completeness. Streaming provides minute-level updates for near-realtime features, while batch ensures no data is lost and handles larger aggregation windows. This dual approach adds operational complexity but delivers both low latency and high reliability.

Supporting two modes for online serving—pre-assembled versus runtime assembly—provides valuable flexibility. Use cases with high cache hit rates benefit from pre-assembly and simpler serving logic, while low cache hit rate scenarios avoid wasting storage on features that rarely get reused. This mode switching capability suggests the team learned that one-size-fits-all approaches don't work well across Snap's diverse ML applications.

The custom Parquet writer for column appending demonstrates attention to memory efficiency at scale. Rather than loading all columns into memory and combining, the team leveraged the columnar format to append generated features directly. This kind of optimization becomes critical when processing large volumes of training data.

The platform's emphasis on declarative YAML-based feature definitions successfully eliminated the need for ML engineers to touch production systems or coordinate with infrastructure teams. This abstraction dramatically improved velocity by removing coordination overhead and reducing risk. The clear separation between SQL transformations and aggregation definitions acknowledges that complex feature specifications don't fit cleanly into pure SQL while maintaining a declarative interface.

Robusta's design was explicitly inspired by similar systems at other companies, particularly Airbnb's Zipline and Uber's Palette, demonstrating that the team learned from the broader industry rather than building in isolation. This willingness to adopt proven patterns rather than over-innovating likely accelerated development and reduced risk.

The platform has delivered significant business impact by enabling customer teams to access advanced functionalities like sparse ID list features, long aggregation windows, and near-realtime features that were previously unavailable to smaller teams. By democratizing access to sophisticated feature engineering capabilities, Robusta reduced inequality between teams with different resource levels.

Looking forward, Snap continues investing in enabling easy feature experimentation for feature types beyond aggregations, suggesting that while Robusta solved a major pain point, additional feature engineering challenges remain. The platform's success with aggregation features apparently validated the general approach of building unified platforms rather than letting each team build custom infrastructure.
