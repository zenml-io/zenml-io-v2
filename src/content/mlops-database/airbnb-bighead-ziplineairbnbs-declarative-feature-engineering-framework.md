---
title: "Zipline—Airbnb’s Declarative Feature Engineering Framework"
slug: "airbnb-bighead-ziplineairbnbs-declarative-feature-engineering-framework"
draft: false
mlopsTags:
  - "feature-store"
  - "metadata-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "dbt"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "other"
company: "Airbnb"
companySlug: "airbnb"
platformName: "Bighead"
contentType: "video"
summary: "Zipline is Airbnb's declarative feature engineering framework designed to eliminate the months-long iteration cycles that plague production machine learning workflows. Traditional approaches to feature engineering require either logging new features and waiting six months to accumulate training data, or manually replicating production logic in ETL pipelines with consistency risks and optimization challenges. Zipline addresses this by allowing data scientists to declare features in Python, automatically generating both the offline backfill pipelines for training data and the online serving infrastructure needed for inference. By treating features as declarative specifications rather than imperative code, Zipline reduces the time to production from months to days while ensuring point-in-time correctness and consistency between training and serving. The system handles structured data from diverse sources including event streams, database snapshots, and change data capture logs, using sophisticated temporal aggregation techniques built on Apache Spark for backfilling and Apache Flink for real-time streaming updates."
link: "https://www.youtube.com/watch?v=LjcKCm0G_OY"
year: 2019
seo:
  title: "Airbnb: Zipline—Airbnb’s Declarative Feature Engineering Framework - ZenML MLOps Database"
  description: "Zipline is Airbnb's declarative feature engineering framework designed to eliminate the months-long iteration cycles that plague production machine learning workflows. Traditional approaches to feature engineering require either logging new features and waiting six months to accumulate training data, or manually replicating production logic in ETL pipelines with consistency risks and optimization challenges. Zipline addresses this by allowing data scientists to declare features in Python, automatically generating both the offline backfill pipelines for training data and the online serving infrastructure needed for inference. By treating features as declarative specifications rather than imperative code, Zipline reduces the time to production from months to days while ensuring point-in-time correctness and consistency between training and serving. The system handles structured data from diverse sources including event streams, database snapshots, and change data capture logs, using sophisticated temporal aggregation techniques built on Apache Spark for backfilling and Apache Flink for real-time streaming updates."
  canonical: "https://www.zenml.io/mlops-database/airbnb-bighead-ziplineairbnbs-declarative-feature-engineering-framework"
  ogTitle: "Airbnb: Zipline—Airbnb’s Declarative Feature Engineering Framework - ZenML MLOps Database"
  ogDescription: "Zipline is Airbnb's declarative feature engineering framework designed to eliminate the months-long iteration cycles that plague production machine learning workflows. Traditional approaches to feature engineering require either logging new features and waiting six months to accumulate training data, or manually replicating production logic in ETL pipelines with consistency risks and optimization challenges. Zipline addresses this by allowing data scientists to declare features in Python, automatically generating both the offline backfill pipelines for training data and the online serving infrastructure needed for inference. By treating features as declarative specifications rather than imperative code, Zipline reduces the time to production from months to days while ensuring point-in-time correctness and consistency between training and serving. The system handles structured data from diverse sources including event streams, database snapshots, and change data capture logs, using sophisticated temporal aggregation techniques built on Apache Spark for backfilling and Apache Flink for real-time streaming updates."
mlops:
  source: "sqlite"
  entryId: 31
  sourceUrl: "https://www.youtube.com/watch?v=LjcKCm0G_OY"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060644"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Airbnb's ML Infrastructure team built Zipline to address a fundamental bottleneck in production machine learning: feature engineering consumes 60-70% of the effort required to deploy models, yet existing approaches force painful trade-offs between iteration speed, consistency, and engineering effort. The challenge stems from the reality that machine learning in production is less about sophisticated algorithms and more about data plumbing—Google's research showed that only 5% of ML system code is actual machine learning, with the remaining 95% being infrastructure glue code.

The team identified two common but problematic approaches to feature engineering. The "log and wait" approach requires teams to instrument logging for new features, then wait months (often six months to a year) to accumulate sufficient training data that captures seasonality and market variations. This ensures consistency between training and serving but makes iteration glacially slow—a single feature experiment might take half a year to validate. The alternative approach involves manually replicating production feature logic as offline ETL pipelines (manual backfills), which eliminates the waiting period but introduces severe challenges. Teams must maintain two separate codebases that generate the same features through different mechanisms, creating consistency risks that often go undetected until model performance degrades in production. These manual backfills are also extremely difficult to optimize, often taking weeks to months to compute over large historical datasets.

Beyond these workflow issues, feature engineering for production ML faces inherent technical complexity. Features must be computed from heterogeneous data sources including data lakes (S3/HDFS cataloged by Hive), streaming data (Kafka), live production databases, and external derived data. Different features require different accuracy guarantees—some need real-time accuracy (user's search history in the last five minutes), while others can use snapshot accuracy (video metadata updated daily). Computing point-in-time correct features for training requires temporal joins that aggregate and evolve data correctly as of specific historical timestamps, which is computationally expensive at scale. For serving, the system must support low-latency point lookups (under 10 milliseconds) while maintaining freshness guarantees that range from seconds to days depending on the use case.

## Architecture & Design

Zipline is part of Airbnb's broader Bighead ML platform and specifically addresses the feature engineering layer. The architecture consists of several interconnected components that handle the full lifecycle from feature definition to serving.

The workflow begins with data scientists writing declarative feature specifications in Python. These specifications define features as aggregations over data sources using a GroupBy abstraction. For example, defining "average rating of a restaurant in the last year" involves specifying an event source (pointing to a ratings table), projection and filter operations, the aggregation key (restaurant ID), and the window (one year). Zipline supports two primary source types: event sources (streams backed by Kafka and logs stored in Hive) and database sources (snapshot tables in the warehouse plus change data capture topics).

The feature computation architecture splits into offline backfilling for training and online serving for inference. For offline backfilling, Zipline implements a sophisticated temporal aggregating join algorithm on Apache Spark. This algorithm must solve the challenging problem of generating point-in-time correct feature values at every prediction timestamp in the training data without the intractable cost of time-traveling the entire data warehouse for each request. The key insight is fusing the join and aggregation operations while exploiting the mathematical properties of aggregation functions.

The backfill topology operates in three distinct Spark stages. First, the query log (containing user IDs and prediction timestamps) is grouped by key and broadcast to all workers, exploiting the observation that query logs are much smaller than raw event data. Second, workers streaming through raw events generate partial aggregates using a tree structure that updates only logarithmically many nodes per event rather than recomputing everything. Third, these partial aggregates are shuffled and collapsed to produce final feature values. This approach keeps memory bounded and achieves massive parallelism without requiring sorted data.

For online serving, Zipline maintains features as two separate components: batch-tail aggregates and streaming-head updates. The feature client reads both and combines them at query time. This separation is necessary because certain aggregation types lack reversibility (like max and approximate distinct count) and require periodic batch correction to prevent drift. The batch tail is precomputed and stored, while the streaming head is maintained by Apache Flink processing change data capture streams and Kafka topics in real-time.

The overall data flow connects production databases and service fleets (which generate event streams and change logs) to the data lake (S3/HDFS cataloged by Hive/Spark), then through Zipline's backfill and serving infrastructure to model serving systems and application servers. The feature client provides a consistent interface to models regardless of whether they're in training or production.

## Technical Implementation

Zipline is implemented primarily in Python for the user-facing API and uses Apache Spark for offline batch processing and Apache Flink for real-time streaming. The system specifically targets structured data—records in databases, Hive tables, and Kafka streams—rather than unstructured media like images or audio.

The mathematical foundation relies on abstract algebra concepts, specifically abelian groups. Aggregations like sum, count, and average form abelian groups with commutative and associative properties, enabling massive parallelism and reversibility. Reversibility is crucial: for windowed aggregations, when a time window slides forward, reversible operations can simply subtract what left the window and add what entered, computing the new aggregate in constant time. Non-reversible operations like max and min require a more sophisticated tree-based approach.

For non-reversible aggregations, Zipline employs a binary tree structure where each node represents the aggregation over consecutive elements. When a window slides, instead of recomputing over all elements (linear time), the algorithm only examines logarithmic nodes in the tree. This transforms the computational complexity from O(n²) to O(n log n) for computing a sliding window over a sequence, at the cost of 2x storage space—a worthwhile trade-off at scale. The tiling algorithm uses bit shift operations to recursively identify which logarithmic tiles cover any given range.

Reversibility becomes even more critical when handling database mutations. Change data capture produces inserts, updates, and deletes. A delete is simply a reversal operation, and an update decomposes into a delete followed by an insert. For reversible aggregations like count, this works seamlessly—if someone moves from California to Nevada, you decrement California's count and increment Nevada's. But non-reversible aggregations cannot handle this, necessitating batch correction where the full aggregate is periodically recomputed to fix drift.

The temporal aggregating join algorithm handles several additional complexities. It distinguishes event time (when something actually happened, like a user's birth year) from ingestion time (when Airbnb's systems first saw that data). The algorithm handles time skew between these two timelines and supports multi-way joins across many raw data sources simultaneously. When time skew guarantees exist, faster algorithms become available.

The serving architecture deliberately rejects both pure lambda (maintaining two separate code paths) and pure kappa (using only streaming) patterns. Lambda is rejected because it duplicates logic and creates consistency problems. Kappa is rejected because Spark, optimized for columnar batch data, cannot meet the freshness requirements for real-time features. Instead, Zipline uses a hybrid approach where batch and streaming components remain separated but coordinate through the feature client.

## Scale & Performance

The presentation emphasizes scale challenges without providing extensive quantitative metrics, but several concrete numbers emerge. Feature serving must achieve latency under 10 milliseconds for point lookups. Freshness requirements range from one second for real-time features to midnight (daily batch) for snapshot-accurate features. Training data typically spans at least six months to a year to capture seasonality, particularly important for businesses like Airbnb with strong seasonal patterns.

The optimization techniques yield dramatic improvements in computational complexity. For non-reversible windowed aggregations, the tree-based approach reduces per-window computation from linear (examining potentially millions of events) to logarithmic (examining about 20 nodes for a million-event window). The overall algorithm improvement goes from O(n²) to O(n log n), which becomes critical when backfilling over large historical datasets that previously took weeks to months.

The system handles multiple data source types at different scales. Event streams flow through Kafka and accumulate in data lakes. Database change data capture enables real-time feature freshness for dimension tables. The broadcast join optimization in the backfill topology exploits the size disparity between query logs and raw event data, with query logs being orders of magnitude smaller.

The broader impact centers on velocity: Zipline reduces time to production from months (six months for log-and-wait, weeks to months for manual backfills) down to days. This acceleration enables data scientists to work independently without requiring dedicated data engineers for each feature iteration, fundamentally changing the organizational dynamics around feature development.

## Trade-offs & Lessons

Zipline makes several deliberate architectural choices that reveal important lessons for practitioners building similar systems. The declarative API represents a fundamental philosophy shift—rather than telling the system how to compute features step by step, users declare what features they want and let Zipline generate the necessary infrastructure. This abstraction works because feature engineering follows recognizable patterns (aggregations over time windows) that can be systematically optimized.

The decision to focus exclusively on structured data reflects a pragmatic assessment of where the hardest problems lie. The team views unstructured data (images, audio, video) as a harder mathematical challenge but an easier systems challenge. Structured data presents more complex engineering problems around consistency, temporal correctness, and heterogeneous data sources while being mathematically more tractable.

The requirement for change data capture as a first-class citizen of the data warehouse is notable. Many organizations snapshot databases but don't capture the change log, which prevents real-time feature updates for dimensional data. Zipline requires this infrastructure investment, and the alternative—making service calls to production databases at feature serving time—creates unacceptable performance and operational risk.

The mathematical formalism around abelian groups and reversibility might seem academic but has immediate practical implications. Reversible aggregations enable efficient sliding window computation, support database mutations elegantly, and avoid the need for batch correction. Non-reversible aggregations require the tree structure overhead and periodic recomputation, creating operational complexity. This should influence feature design—when possible, data scientists should prefer reversible aggregations.

The separation of batch-tail and streaming-head in serving architecture acknowledges that perfect real-time consistency is unnecessary and expensive. Some features don't need sub-second freshness, and even real-time features can tolerate eventual consistency if the lag stays bounded. This pragmatic approach avoids the complexity of pure streaming systems while meeting actual business requirements.

The emphasis on point-in-time correctness for training data addresses a subtle but critical issue: features that leak information from the future create models that perform well in backtesting but fail in production. The temporal join algorithm ensures that training sees exactly what production serving would have provided at each historical timestamp, preventing this class of bugs.

Perhaps the most important lesson is about the 95% problem. The vast majority of work in production machine learning isn't the actual ML algorithm—it's data plumbing, consistency checking, and infrastructure. By making this plumbing reusable across use cases, Zipline transforms it from repeated per-project effort into a shared platform capability. The team explicitly measured that feature engineering represents 60-70% of the work to productionize models, making it the highest-leverage area for tooling investment.

The acknowledgment that consistency problems in manual backfills often go undetected until models degrade in production highlights a measurement gap. Even at Airbnb's scale and sophistication, teams hadn't built comprehensive consistency checking frameworks, suggesting this is a broadly underinvested area in the ML infrastructure landscape. Models will happily consume inconsistent data and produce inaccurate predictions without obvious failures, making consistency bugs particularly insidious.

The presentation concludes with promises of open-sourcing Zipline and publishing more detailed technical documentation, indicating Airbnb's intent to share these learnings more broadly with the community. The hand-wavy areas in the presentation—particularly around the exact topology details and time skew handling—are acknowledged as requiring fuller treatment in written form to be properly understood and reproduced.
