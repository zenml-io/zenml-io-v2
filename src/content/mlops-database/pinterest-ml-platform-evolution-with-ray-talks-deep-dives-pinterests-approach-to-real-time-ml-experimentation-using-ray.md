---
title: "Pinterest’s Approach to Real-Time ML Experimentation Using Ray (YouTube)"
slug: "pinterest-ml-platform-evolution-with-ray-talks-deep-dives-pinterests-approach-to-real-time-ml-experimentation-using-ray"
draft: false
mlopsTags:
  - "data-versioning"
  - "experiment-tracking"
  - "pipeline-orchestration"
  - "iceberg"
  - "ray"
  - "spark"
  - "data-prep"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "training"
industryTags: "media-entertainment"
company: "Pinterest"
companySlug: "pinterest"
platformName: "ML platform evolution with Ray (talks + deep dives)"
contentType: "video"
summary: "Pinterest's ML engineering team developed a \"Fast ML Stack\" using Ray to dramatically accelerate their ML experimentation and iteration velocity in the competitive attention economy. The core innovation involves replacing slow batch-based Spark workflows with Ray's heterogeneous clusters and streaming data processing paradigms, enabling on-the-fly data transformations during training rather than pre-materializing datasets. This architectural shift reduced time-to-experiment from weeks to days (downstream rewards experimentation dropped from 6 weeks to 2 days), eliminated over $350K in annual compute and storage costs, and unlocked previously infeasible ML techniques like multi-day board revisitation labels. The solution combines Ray Data workflows with intelligent Iceberg-based partitioning to enable fast feature backfills, in-trainer sampling, and last-mile label aggregation for complex recommendation systems."
link: "https://www.youtube.com/watch?v=bxkQiaUdtJU"
year: 2023
seo:
  title: "Pinterest: Pinterest’s Approach to Real-Time ML Experimentation Using Ray (YouTube) - ZenML MLOps Database"
  description: "Pinterest's ML engineering team developed a \"Fast ML Stack\" using Ray to dramatically accelerate their ML experimentation and iteration velocity in the competitive attention economy. The core innovation involves replacing slow batch-based Spark workflows with Ray's heterogeneous clusters and streaming data processing paradigms, enabling on-the-fly data transformations during training rather than pre-materializing datasets. This architectural shift reduced time-to-experiment from weeks to days (downstream rewards experimentation dropped from 6 weeks to 2 days), eliminated over $350K in annual compute and storage costs, and unlocked previously infeasible ML techniques like multi-day board revisitation labels. The solution combines Ray Data workflows with intelligent Iceberg-based partitioning to enable fast feature backfills, in-trainer sampling, and last-mile label aggregation for complex recommendation systems."
  canonical: "https://www.zenml.io/mlops-database/pinterest-ml-platform-evolution-with-ray-talks-deep-dives-pinterests-approach-to-real-time-ml-experimentation-using-ray"
  ogTitle: "Pinterest: Pinterest’s Approach to Real-Time ML Experimentation Using Ray (YouTube) - ZenML MLOps Database"
  ogDescription: "Pinterest's ML engineering team developed a \"Fast ML Stack\" using Ray to dramatically accelerate their ML experimentation and iteration velocity in the competitive attention economy. The core innovation involves replacing slow batch-based Spark workflows with Ray's heterogeneous clusters and streaming data processing paradigms, enabling on-the-fly data transformations during training rather than pre-materializing datasets. This architectural shift reduced time-to-experiment from weeks to days (downstream rewards experimentation dropped from 6 weeks to 2 days), eliminated over $350K in annual compute and storage costs, and unlocked previously infeasible ML techniques like multi-day board revisitation labels. The solution combines Ray Data workflows with intelligent Iceberg-based partitioning to enable fast feature backfills, in-trainer sampling, and last-mile label aggregation for complex recommendation systems."
mlops:
  source: "sqlite"
  entryId: 189
  sourceUrl: "https://www.youtube.com/watch?v=bxkQiaUdtJU"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.617409"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Pinterest operates in the intensely competitive attention economy, competing directly with platforms like TikTok and Snapchat for user engagement. The company discovered that ML productivity and iteration velocity are critical competitive differentiators alongside model quality and computational resources. A revealing case study from late 2023 illustrated this dynamic: Pinterest shipped a new technique that significantly increased user engagement and time spent on the platform, but early the following year, Snapchat implemented the same technique, immediately eroding Pinterest's engagement gains. This experience underscored that the attention economy functions as an arms race where speed of innovation matters as much as innovation itself.

The primary bottleneck Pinterest identified was the ML data layer—specifically, the generation of training datasets required to experiment with new techniques. Common operations like adding sequence features, exploring sampling strategies, and computing future rewards required extensive waiting times due to forward logging delays and computationally expensive Spark jobs. These batch-based data generation workflows created multi-day or multi-week delays before teams could even begin training models, severely limiting experimentation velocity. The combination of long wait times and high costs created a significant drag on ML productivity, preventing Pinterest from rapidly iterating on ideas that could drive competitive advantage.

## Architecture & Design

Pinterest's Fast ML Stack represents a paradigm shift from batch data processing to streaming data transformations at training time. The architecture is built on two foundational innovations that work synergistically:

**Ray Heterogeneous Clusters for Last-Mile Processing**: The team developed Ray Data workflows using map_batches and Ray user-defined functions (UDFs) to handle common data operations. Rather than pre-materializing transformed datasets through Spark jobs, these transformations occur dynamically during the training process itself. Ray's heterogeneous cluster capability is crucial here—it allows Pinterest to allocate arbitrary numbers of CPU nodes alongside GPU training nodes to maximize GPU utilization while handling complex CPU-bound data transformations. This architecture prevents GPU bottlenecks that would occur if sampling or feature engineering logic ran exclusively on the training machine's CPUs.

**Intelligent Partitioning with Iceberg**: Pinterest standardized their data storage on Iceberg-based partitioning with user ID bucketing. This approach collocates all data belonging to a particular user in the same bucket across different tables, creating predictable data access patterns. When performing joins on user ID—a common operation for feature backfills—the system only needs to join matching user buckets rather than performing expensive all-to-all comparisons across entire tables. Ray CPU clusters can load corresponding buckets from multiple tables and perform joins as in-memory CPU operations without materializing intermediate results.

The overall data flow works as follows: unsampled training data is stored in Iceberg-partitioned tables. During training, Ray Data loaders read from these tables using the intelligent partitioning to perform efficient on-the-fly joins for feature backfills. User-defined sampling logic, feature engineering, and label aggregation operations are applied as streaming transformations via Ray UDFs before examples reach the model. This eliminates the need to generate, store, and manage multiple materialized dataset variations.

## Technical Implementation

The implementation centers on three key Ray-based capabilities that replaced previous Spark workflows:

**In-Trainer Sampling**: Previously, exploring different sampling strategies required generating completely separate materialized datasets via Spark jobs, each taking days to produce and consuming significant S3 storage. The team moved sampling logic into the training job itself as Ray UDFs. For example, when experimenting with adding new action heads (downloads and screenshots) to Pinterest's multi-task learning model, the old approach would have required generating four separate datasets—one control, one with all download examples, one with all screenshot examples, and one with both. With Ray-based in-trainer sampling, a single unsampled dataset serves all four experiments, with sampling configuration specified at training time alongside other hyperparameters.

The team addressed observability challenges inherent in this approach by logging row IDs and boolean sampling masks during training. Post-hoc, these can be joined with the original unsampled data to reconstruct exactly what data entered each training run. The cost analysis revealed that while per-model training costs increased slightly due to additional CPU work, the elimination of batch compute jobs and storage costs yielded over $350K in annual savings (the breakeven point would be 750+ models per year, but Pinterest trains far fewer models with alternative sampling strategies).

**In-Trainer Label Aggregation (DRB2)**: For downstream rewards—labels that capture long-term user behavior after initial pin recommendations—Pinterest developed a sequence-based data format called DRB2 (Downstream Rewards Batch 2). DRB2 captures each user's single-day actions as aligned sequences including pin IDs, surfaces traversed, action types, action durations, and pin types. These sequences are stored in the training data, and Ray UDFs derive labels on-the-fly using vectorized boolean masking operations.

For example, to derive a "shopping long-click" label (requiring the user to be in a rabbit hole, click out from Pinterest for more than 45 seconds on a shopping pin), the framework: locates the user's position in the sequence using pin ID and request ID; uses the surface sequence to identify rabbit hole segments; applies the action sequence to find clicks; filters by action duration for 45+ second clicks; and uses pin type sequence to identify shopping pins. The intersection of these boolean masks produces the final label.

This framework is highly parameterizable, allowing ML engineers to define any downstream reward label in a single line of code. The team optimized performance through extensive vectorization and code compilation, achieving net-zero additional training cost despite performing complex label computations during data loading. The previous Spark-based approach required repeated self-joins on logged impression data, followed by expensive aggregation jobs whose results were joined back to training data—a workflow that was slow, expensive, and difficult to modify.

**In-Trainer Feature Backfills**: The intelligent Iceberg partitioning enables fast on-the-fly joins for feature backfills. Consider joining a 1000-column training table with a 5-column user feature table. In Spark, this requires comparing all files to all files, materializing a 1005-column intermediate table, and waiting for full materialization before training begins. With Ray and user ID bucketing, the system loads only matching user buckets from both tables into Ray CPU workers and performs the join in memory, allowing training to begin immediately without materializing the joined dataset.

## Scale & Performance

The performance improvements Pinterest achieved are substantial across multiple dimensions:

**Development Velocity**: The most dramatic improvement came in downstream rewards experimentation, where time-to-online-experiment dropped from 6 weeks to 2 days. ML engineers can now start an experiment on Monday, have a model online Tuesday, and receive initial performance feedback by Friday—a workflow that previously took multiple weeks during which the baseline model might have already changed. Sampling iterations that previously took "few days" per variation now complete in "few hours."

**Cost Savings**: The in-trainer sampling approach eliminated annual batch compute costs and S3 storage costs that would have exceeded $350K per year. While per-model training costs increased slightly due to additional CPU processing, the total cost remained favorable because Pinterest trains fewer than 750 models per year with alternative sampling configurations—well below the breakeven threshold.

**Feature Backfills**: Join operations for feature backfills no longer require materializing intermediate tables, and wait times decreased significantly through the combination of intelligent partitioning and Ray's ability to perform joins as CPU operations during data loading.

**Multi-Day Label Aggregation**: The team successfully productionized multi-day board revisitation labels, which require 2-3 days of user sequence data because that's the average time users take to revisit pins they've saved. This was previously infeasible due to the cost of merging multi-day DRB2 sequences and joining them to training data in Spark. Using the full Ray stack—in-trainer bucket joins for multi-day sequences, last-mile label aggregation for deriving labels, and in-trainer sampling for final dataset composition—Pinterest unlocked optimization for business objectives that were previously impossible despite being highly valuable.

## Trade-offs & Lessons

**What Worked Well**: The paradigm shift from batch to streaming delivered transformative results. Ray's heterogeneous clusters proved to be the critical enabler, allowing arbitrary scaling of CPU resources alongside GPU nodes to prevent bottlenecks. The team described finding Ray as "finding a hammer and then finding a bunch of nails"—once they validated the approach with sampling, they systematically identified all data workloads causing velocity delays and migrated them to Ray.

The intelligent Iceberg partitioning was equally crucial, creating predictable data access patterns that enabled efficient on-the-fly joins. The combination of these two techniques unlocked capabilities beyond just faster iteration—it enabled entirely new ML techniques like multi-day board revisitation labels that were previously economically or technically infeasible.

ML engineer productivity increased substantially because the team could work in familiar Python and pandas rather than PySpark. This reduced the barrier to implementing complex data transformations and made the codebase more accessible to the broader ML engineering team.

**Challenges and Limitations**: Observability emerged as a significant challenge when moving from materialized datasets to on-the-fly transformations. When datasets are generated via batch jobs, teams can query the resulting tables to understand exactly what data entered training. With streaming transformations, the data never persists, creating a blind spot. Pinterest addressed this by logging row IDs and sampling masks during training, then joining post-hoc with source data to reconstruct what was used—a pragmatic workaround but not as seamless as querying a materialized table.

The cost model requires careful analysis. While Pinterest's use case strongly favors in-trainer processing due to training relatively few models with alternative data configurations, teams that train many hundreds of models with varied data might hit a threshold where batch preprocessing becomes more economical again. The breakeven point for in-trainer sampling is around 750 models per year under Pinterest's cost structure.

Migration effort from Spark to Ray required reimplementing data transformation logic, though the team noted this was made easier by working in familiar Python rather than PySpark. They ran A/A experiments to validate that Ray-based workflows produced equivalent model performance to Spark-based workflows before fully migrating.

**Key Insights for Practitioners**: The most important lesson is that ML productivity bottlenecks often lie in data generation rather than model training or serving. Pinterest's competitive experience—where engagement gains were quickly eroded when competitors implemented the same techniques—demonstrates that iteration velocity can be as strategically important as model quality.

Ray's heterogeneous cluster capability specifically unlocks streaming data paradigms that would otherwise bottleneck on CPU resources. Simply moving data transformations to training time without the ability to scale CPU resources independently would likely degrade throughput unacceptably.

Intelligent data partitioning schemes like user ID bucketing create enormous leverage for downstream optimizations. The predictable access patterns enable efficient joins and data loading that would be prohibitively expensive with arbitrary data layouts.

The sequence-based DRB2 format for capturing user actions represents an elegant solution for labels that require complex aggregations over user behavior. By storing aligned sequences and deriving labels via vectorized operations, Pinterest created a flexible, performant framework for experimentation with future rewards and long-term optimization objectives.

Finally, the team's systematic approach—identifying all velocity bottlenecks, validating the Ray-based approach on one use case, then migrating additional workloads—provides a model for infrastructure evolution. Rather than attempting a big-bang migration, they iteratively expanded Ray adoption as they proved out the value proposition.
