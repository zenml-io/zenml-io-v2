---
title: "Scaling Training Data Storage for Next-Generation Recommender Systems with User Sequences"
slug: "scaling-training-data-storage-for-next-generation-recommender-systems-with-user-sequences"
draft: false
llmopsTags:
  - "content-moderation"
  - "embeddings"
  - "pytorch"
  - "redis"
  - "databases"
  - "open-source"
  - "scalability"
  - "meta"
industryTags: "tech"
company: "Meta"
summary: "Meta faced an exabyte-scale training data storage challenge as their recommender systems pivoted to learning from user sequences—raw user interaction histories that are 100x larger than traditional features. This growth accelerated storage costs to 10% of Meta's power budget and forced continuous downsampling of valuable training data. To address this, Meta built Sequence Storage, a normalized data architecture that splits training data into separate tables to eliminate duplication, combined with extensive infrastructure optimizations including offloaded SSTable compaction, native multi-scan APIs in RocksDB, and schema-aware filtering. The result was a 5x improvement in storage server efficiency, enabling scaling from 2K to 80K events per user sequence (40x improvement) while supporting 30+ production models across various product groups."
link: "https://www.youtube.com/watch?v=ZyAoUSmbntI"
year: 2023
seo:
  title: "Meta: Scaling Training Data Storage for Next-Generation Recommender Systems with User Sequences - ZenML LLMOps Database"
  description: "Meta faced an exabyte-scale training data storage challenge as their recommender systems pivoted to learning from user sequences—raw user interaction histories that are 100x larger than traditional features. This growth accelerated storage costs to 10% of Meta's power budget and forced continuous downsampling of valuable training data. To address this, Meta built Sequence Storage, a normalized data architecture that splits training data into separate tables to eliminate duplication, combined with extensive infrastructure optimizations including offloaded SSTable compaction, native multi-scan APIs in RocksDB, and schema-aware filtering. The result was a 5x improvement in storage server efficiency, enabling scaling from 2K to 80K events per user sequence (40x improvement) while supporting 30+ production models across various product groups."
  canonical: "https://www.zenml.io/llmops-database/scaling-training-data-storage-for-next-generation-recommender-systems-with-user-sequences"
  ogTitle: "Meta: Scaling Training Data Storage for Next-Generation Recommender Systems with User Sequences - ZenML LLMOps Database"
  ogDescription: "Meta faced an exabyte-scale training data storage challenge as their recommender systems pivoted to learning from user sequences—raw user interaction histories that are 100x larger than traditional features. This growth accelerated storage costs to 10% of Meta's power budget and forced continuous downsampling of valuable training data. To address this, Meta built Sequence Storage, a normalized data architecture that splits training data into separate tables to eliminate duplication, combined with extensive infrastructure optimizations including offloaded SSTable compaction, native multi-scan APIs in RocksDB, and schema-aware filtering. The result was a 5x improvement in storage server efficiency, enabling scaling from 2K to 80K events per user sequence (40x improvement) while supporting 30+ production models across various product groups."
notion:
  pageId: "389f8dff-2538-80a3-944f-e2024a218bd5"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-24T13:55:00.000Z"
  lastEditedTime: "2026-06-24T13:55:00.000Z"
  publishedAt: "2026-06-29T15:14:49Z"
---

Meta's Sequence Storage project represents a significant infrastructure innovation in managing training data for production recommender systems at unprecedented scale. Presented by Weidong Liu and Sarang Mashti, this case study illustrates how the shift to user sequence-based features fundamentally disrupted Meta's existing training data infrastructure and required full-stack rearchitecture to remain cost-effective.

## Context and Problem Statement

Meta's recommender systems serve both advertisement and organic content recommendations across their platforms. Over the past three years, Meta pivoted their modeling approach from traditional dense and sparse features to learning from user sequences. User sequences consist of raw history of user interactions spanning months to years, encoding richer user behaviors, content understanding data, and contextual information. This paradigm shift proved highly effective—Meta published multiple research papers demonstrating steady and significant model quality improvements as user sequence length grew longer.

However, this modeling advancement created an existential infrastructure challenge. User sequences are 100x or more larger than traditional features, making them the single dominant driving factor of training data storage starting from 2023. Despite Meta's previous investments in training storage optimizations—including columnar compression, row reordering, column reordering, and model-aware placement—the growth rate actually accelerated. By the time of this presentation, training data had reached tens of exabytes stored across more than 10 data centers, consuming 10% of Meta's total power budget.

The scale created multiple operational challenges beyond just cost. Data center capacity constraints forced continuous downsampling, meaning valuable training samples were discarded upfront. Training samples could often only be retained for one month, causing loss of longer-term knowledge like seasonality patterns. Experimenting with new data formats required processing and generating huge volumes of data, making iteration both time-consuming and expensive.

## Solution Architecture: Data Normalization for Training

Meta's solution to the data duplication problem drew inspiration from relational database normalization principles. The fundamental insight was that their previous data model relied on fully self-contained training rows, where each row stored a complete snapshot of all features used at inference time. This made training sample reconstruction trivial—just read the row—but created massive duplication since ML features between temporally adjacent training rows rarely changed and were often identical.

The Sequence Storage system splits training data into two tables. The training table contains training rows with lightweight references (user sequence IDs) to the user sequence table, and remains on the existing warehouse backed by warm storage HDD. The user sequence table stores the actual sequence data indexed by user sequence ID and is moved to ZippyDB, Meta's widely-used distributed key-value store designed for point lookups. A specialized connector in the training preprocessor performs joins between the training table and user sequence table to reconstruct training samples on-the-fly during training.

This normalization eliminated massive data duplication, but introduced a critical trade-off: more complex training sample reconstruction requiring joins at training time. The entire solution would only be cost-effective if these joins could be heavily optimized.

## Initial Performance Challenges

The first version of Sequence Storage integrated into Meta's training pipeline proved disappointing—it was as costly or more costly than the original approach of storing everything in a single table. In retrospect, this made sense because ZippyDB had been optimized for OLTP-like workloads, not AI training workloads with very different access patterns. The training preprocessor also now had a more complex operation to perform. Both the client side (training preprocessor) and storage server side required extensive optimization work.

## Storage Server Optimizations

Meta identified three major sources of inefficiency on the storage server side that limited read throughput: high read amplification, high read latency due to index joins, and data over-fetching. Their aggressive goal was to reduce the cost per gigabyte per second of training throughput.

The read amplification problem stemmed from how data was initially populated into ZippyDB. Row-by-row insertions triggered frequent background compactions in RocksDB (the underlying storage engine), which consumed substantial flash bandwidth and CPU resources. These resources competed with read serving capacity. Additionally, row-by-row insertions resulted in a deep log-structured merge tree where each read had to touch multiple SSTable files across multiple levels, creating 10x read amplification on average. Meta tackled this with an offloaded SSTable compaction and optimization approach. They introduced a new API in ZippyDB that allows directly loading pre-generated SSTables from external sources, completely bypassing the expensive memtable and write-ahead log paths. They made their query engines (Spark and Presto) recognize SSTable files, enabling data pipelines to periodically compact, optimize, and index data outside of ZippyDB servers. Once optimized SSTables were generated, they were loaded into ZippyDB servers to replace older ones. This resulted in a single-level log-structured merge tree optimized for reads, achieving essentially one IO per read.

The read latency problem arose because RocksDB didn't support native multi-scan operations, forcing ZippyDB to execute scans serially. When querying for batches of user sequences, total latency was the sum of all individual scans, creating GPU QPS regression risks as training had to wait longer for data fetching. Meta implemented a native multi-scan API in RocksDB that first analyzes adjacent scan ranges to identify IO coalescing opportunities—combining multiple scans hitting adjacent disk blocks into single scans. After identifying coalesced ranges, the system issues IOs in parallel against these ranges. This reduced storage media IOPS and improved query latency such that total latency was now determined by the single slowest scan rather than the sum of all scans.

The data over-fetching problem occurred because RocksDB and ZippyDB traditionally treat keys and values as opaque blobs without schema awareness. User sequences are fundamentally time series of events (conceptually a list of structs where each event has multiple attributes). Most models only need interested events within certain time ranges and subsets of event attributes, not all attributes. Without leveraging this knowledge, the entire sequence had to be fetched back to GPU and filtered there, increasing network throughput requirements and adding significant CPU and latency overhead on the GPU side. Meta made the ZippyDB query engine schema-aware so it could deserialize user sequence key-values on demand. They implemented feature projection to filter out uninterested event attributes after decoding, and length truncation to keep only events within specific time ranges relevant to specific training samples. These optimizations combined reduced data fetched from ZippyDB to approximately one-third of the original volume.

## Production Impact and Results

The cumulative effect of these optimizations was dramatic. Storage servers became roughly 5x more efficient than at the start of the project. Each storage server could now support more than 1 gigabyte per second read throughput, up from 200 megabytes per second initially. This significantly reduced the overall cost of the system. Meta was able to scale user sequence length from 2K events to 80K events—nearly a 40x improvement—without significant cost increases. As of the presentation, Sequence Storage was in production serving over 30 models across various product groups at Meta.

## Critical Assessment and Tradeoffs

This case study illustrates several important principles and tradeoffs in production ML systems at scale. The normalization approach fundamentally trades storage cost for computational complexity at training time. While data duplication is eliminated, the system now requires complex distributed joins during training. This is only viable because Meta invested heavily in optimizing both the storage layer and the training preprocessor—a "full-stack innovation" as the presenters emphasize.

The solution is highly tailored to Meta's specific access patterns and infrastructure. The effectiveness depends on significant data duplication actually existing in the training data, which may not be true for all ML workloads. The optimization work required deep integration across multiple systems (RocksDB, ZippyDB, Spark, Presto, training preprocessors), which may not be feasible for organizations without Meta's engineering resources.

The claim of 5x efficiency improvement is impressive but comes with caveats. The baseline was an initial implementation of Sequence Storage that was already performing poorly, not necessarily the original single-table approach. The comparison is also specific to throughput per storage server, and the total cost accounting would need to factor in the additional complexity in training preprocessors and the operational overhead of managing a more complex data architecture.

The schema-aware filtering optimization (reducing fetched data to one-third) is particularly clever and applicable beyond this specific use case, but requires that models actually access only subsets of the data. If models need full sequences, this optimization provides no benefit.

## Future Directions

Meta outlined two major investment areas for Sequence Storage going forward. First is scaling sequence length to capture lifetime user history—a 10x increase from the current 80K events. This will introduce new challenges in cost, reliability, and latency requiring techniques like smarter encodings and tiering strategies. Second is generalizing Sequence Storage beyond user sequences to handle other normalized features like item features, content features, and embeddings. The North Star is a canonical storage system for all normalized training data at Meta, suggesting ambitions to make this the standard infrastructure pattern.

## Broader LLMOps Implications

While this case study focuses on recommender systems rather than large language models specifically, the infrastructure patterns are highly relevant to LLMOps. Training data management at scale, optimizing data pipelines for GPU utilization, managing the tradeoff between storage and compute, and the need for schema-aware data systems are all common challenges across modern ML production systems. The emphasis on normalization to handle feature duplication is particularly relevant as LLM training contexts and prompt templates often contain significant redundancy. The architecture of separating frequently-duplicated context from unique query components mirrors patterns emerging in LLM serving systems with prefix caching and KV cache optimization.
