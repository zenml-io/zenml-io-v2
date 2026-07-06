---
title: "AI Storage Blueprint at Scale: Optimizing Infrastructure for LLM Training and Inference"
slug: "ai-storage-blueprint-at-scale-optimizing-infrastructure-for-llm-training-and-inference"
draft: false
llmopsTags:
  - "latency-optimization"
  - "cost-optimization"
  - "cache"
  - "databases"
  - "meta"
industryTags: "tech"
company: "Meta"
summary: "Meta faced critical challenges in storage infrastructure that were causing GPU stalls and slowing AI research velocity as model sizes and training datasets grew exponentially. The legacy BLOB-storage architecture, designed for traditional web applications, introduced hundreds of milliseconds of latency through multiple metadata lookups and data proxies, which was incompatible with the millisecond-level performance requirements of AI workloads. Meta rebuilt their storage foundation from the ground up, unifying metadata schemas for O(1) lookups, eliminating data plane proxies, deploying regional storage colocated with GPUs, implementing distributed caching layers, and introducing a tiered cache architecture with on-demand hydration that reduced cross-region data ingestion times from hours to minutes. The result was a storage system that adds negligible overhead on top of the Tectonic layer, achieves 80% cache hit rates, maintains bounded latencies up to pMax, and dramatically accelerates research iteration speed."
link: "https://engineering.fb.com/2026/07/01/data-infrastructure/metas-ai-storage-blueprint-at-scale/"
year: 2026
seo:
  title: "Meta: AI Storage Blueprint at Scale: Optimizing Infrastructure for LLM Training and Inference - ZenML LLMOps Database"
  description: "Meta faced critical challenges in storage infrastructure that were causing GPU stalls and slowing AI research velocity as model sizes and training datasets grew exponentially. The legacy BLOB-storage architecture, designed for traditional web applications, introduced hundreds of milliseconds of latency through multiple metadata lookups and data proxies, which was incompatible with the millisecond-level performance requirements of AI workloads. Meta rebuilt their storage foundation from the ground up, unifying metadata schemas for O(1) lookups, eliminating data plane proxies, deploying regional storage colocated with GPUs, implementing distributed caching layers, and introducing a tiered cache architecture with on-demand hydration that reduced cross-region data ingestion times from hours to minutes. The result was a storage system that adds negligible overhead on top of the Tectonic layer, achieves 80% cache hit rates, maintains bounded latencies up to pMax, and dramatically accelerates research iteration speed."
  canonical: "https://www.zenml.io/llmops-database/ai-storage-blueprint-at-scale-optimizing-infrastructure-for-llm-training-and-inference"
  ogTitle: "Meta: AI Storage Blueprint at Scale: Optimizing Infrastructure for LLM Training and Inference - ZenML LLMOps Database"
  ogDescription: "Meta faced critical challenges in storage infrastructure that were causing GPU stalls and slowing AI research velocity as model sizes and training datasets grew exponentially. The legacy BLOB-storage architecture, designed for traditional web applications, introduced hundreds of milliseconds of latency through multiple metadata lookups and data proxies, which was incompatible with the millisecond-level performance requirements of AI workloads. Meta rebuilt their storage foundation from the ground up, unifying metadata schemas for O(1) lookups, eliminating data plane proxies, deploying regional storage colocated with GPUs, implementing distributed caching layers, and introducing a tiered cache architecture with on-demand hydration that reduced cross-region data ingestion times from hours to minutes. The result was a storage system that adds negligible overhead on top of the Tectonic layer, achieves 80% cache hit rates, maintains bounded latencies up to pMax, and dramatically accelerates research iteration speed."
notion:
  pageId: "395f8dff-2538-80bf-98ac-e75d6d8a8707"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-06T07:05:00.000Z"
  lastEditedTime: "2026-07-06T07:06:00.000Z"
  publishedAt: "2026-07-06T07:19:58Z"
---

## Overview

Meta's case study on AI storage infrastructure provides crucial insights into the production challenges of operating LLM training at hyperscale. The blog post, published in July 2026, addresses the fundamental tension between exponentially growing model capabilities and training dataset sizes versus the more modest improvements in storage and interconnect performance. Meta operates hundreds of exabyte-scale storage clusters serving all their products, including their Meta AI initiatives and specifically mentions training Llama models as a key use case. The authors explicitly state that storage bottlenecks are "one of the primary contributors to GPU stalls for AI workloads, directly impacting expenditures and time to market," making this a critical LLMOps concern.

The case study is particularly valuable because it moves beyond the typical focus on compute optimization to tackle what Meta identifies as two equally important challenges: maximizing GPU utilization through storage performance improvements and maximizing research velocity by reducing the operational burden of data management across geo-distributed GPU clusters. This dual focus reflects the real-world constraints of operating LLMs in production at scale.

## Technical Architecture Evolution

Meta's storage service exposes object storage, file systems, and block-device APIs built on top of Tectonic, their foundational horizontally scalable block layer. Tectonic is described as a regional, multi-tenant storage fabric providing high durability and availability through erasure-coding techniques, supporting tiering across media types (HDD and flash), and managing smart placement of hot, cold, and warm data. The BLOB-storage layers operating on top of Tectonic expose a global, infinitely scalable storage fabric with configurable durability and availability tradeoffs.

Initially, Meta trained Llama directly over the Tectonic block layer by exposing an NFS-like FileSystem interface, as discussed in their previous @Scale talk "Training Llama: A Storage Perspective." However, the modern training stack has been migrating to BLOB-storage interfaces, motivated by the need for unified access to massive data lakes and improved performance characteristics. This migration reflects broader industry trends and highlights the evolution of storage architectures specifically for LLM workloads.

## Understanding the GPU-Storage Bottleneck

The case study provides an excellent illustration of why storage latency matters for LLM training through a concrete example of two GPUs processing batches. Modern LLM training involves hundreds of thousands of GPUs iterating over vast datasets multiple times across epochs, with GPUs training in batches and periodically synchronizing state. The dataloader in each GPU host prefetches the next dataset batch while the GPU processes the current batch to maximize compute-I/O overlap. If storage fetch latency exceeds bounds on even a single GPU, it stalls that GPU, which then delays synchronization across all GPUs and extends overall step-completion time. This illustrates the critical importance of bounded pMax latencies rather than just good average performance.

Meta characterizes modern AI workloads as "data hungry" with fundamentally different characteristics than traditional web applications: bursty and sustained high throughput, predictable and bounded pMax latencies, and variable I/O patterns. The focus has shifted from optimizing for typical web traffic patterns to ensuring no GPU is ever waiting on storage.

## Legacy Architecture Limitations

The legacy BLOB-storage architecture evolved organically over years, adding layers upon layers in a service-oriented fashion. Many layers were stateful with their own metadata stores. For a typical getObject("/bucket/path") API call, the request would arrive at the API server, which would perform multiple metadata lookups across the namelayer, volumeslayer, and containerlayer before resolving the path to (blockId, offset, size) tuples. Some lookups could cross regions, and latencies commonly added up to hundreds of milliseconds—any single slow response was sufficient to create problems. After lookups, the API server would proxy data from Tectonic to the client.

Meta identifies that foundational assumptions dictating the original design tradeoffs had shifted. The legacy architecture was optimized for modest latency requirements, global replication by default for extreme durability even in face of region outages, cost per byte optimization on HDDs, and space-constrained datacenters. In contrast, AI workloads demand predictable bounded latencies up to pMax, very high availability but not necessarily global-by-default replication, flash storage for IOPS despite higher cost per byte (which is negligible relative to GPU computational cost), and operate in power-constrained rather than space-constrained environments where every kilowatt spent on storage is power not available for GPUs.

## Rebuilding the Foundation for LLM Workloads

Meta made three major design choices in rebuilding their storage foundation specifically for AI workloads. First, they unified the metadata schema by rewriting the metadata subsystem and collapsing metadata spread across different layers into one unified flat schema backed by ZippyDB. This enables O(1) lookup to resolve paths to storage addresses—a step-function improvement from the previous multi-layer approach.

Second, they eliminated the dataplane proxy and built a "fat client" SDK capable of streaming bytes directly from storage servers to clients. This addresses power-efficiency goals by reducing intermediate server hops and achieves higher throughput and lower latency by removing serialization points.

Third, they made the BLOB-storage stack lean with flexibility for regional or global deployment, then deployed regional BLOB-storage stacks colocated with GPUs in every AI region. This regional colocation fundamentally changes the latency profile and reduces cross-region dependencies.

In the new architecture, when the SDK receives a getObject("/bucket/path") call, it issues a getReadPlan("/bucket/path") request to the API server. The server performs O(1) lookup per chunk to map the path to (blockId, offset, size) tuples and returns the ReadPlanResult to the SDK. The SDK has Tectonic BlockClient embedded within it, enabling direct data streaming from these blocks. This rebuilt foundation adds zero overhead on top of Tectonic and stays within power footprint budgets by eliminating the proxy tier.

## Handling Spikes and Hot Spots in Training Workloads

During data and checkpoint loading, AI workloads access data concurrently across hundreds of GPUs. Subsets like model weights are often "hot," and events like GPU restarts trigger sharp traffic spikes. Meta employed two approaches adapted from existing solutions: distributed data caching and readplan metadata caching.

For distributed data caching, they leveraged spare memory on GPU hosts as a distributed cache for frequently and concurrently accessed data, reusing components from Meta's Owl subsystem. They integrated Owl peers directly into the BLOB-storage client SDK so all data access goes through this cache. In practice, they observe an average cache hit rate of 80% on the distributed data cache.

The readplan metadata cache stores the mapping from path to storage address in a distributed memory store similar to memcache, providing 1-2 millisecond access to metadata. These mechanisms absorb traffic spikes, reduce I/O requirements from storage, solve metadata hot shard problems, and improve p50 and p99 latencies by serving from memory.

## Protocol Optimizations for Production AI Workloads

Meta achieved the final 20% of performance improvements by identifying and fixing bottlenecks across the stack. They addressed laggard nodes (single slow storage nodes contributing to tail latencies) through hedged reads on the client side. For egress spikes during checkpoint events where clients create sharp traffic bursts causing congestion, timeouts, and retries that eventually stall GPUs, they built dynamic concurrency control on the client SDK to automatically tune parallelism based on application-level congestion signals.

These optimizations enabled the new BLOB-storage stack to serve AI workloads without causing GPU stalls while adding negligible overhead on top of Tectonic—a critical achievement for LLMOps at scale.

## Maximizing Research Velocity: The Data Ingestion Challenge

Beyond GPU utilization, Meta identified research velocity as equally critical to LLMOps success. GPUs are scarce and increasingly geo-distributed, while training workloads need data colocated with GPUs for performance. This creates significant operational overhead: researchers must ingest and move datasets across regions.

The typical training job submission workflow involved researchers curating data from various sources, persisting it in BLOB storage, picking a target region, submitting a data ingestion job to create a snapshot of training datasets in the target region in a file format optimized for data loading from the GPU host, waiting hours for ingestion to complete depending on dataset size, then finally submitting the training job. Tweaking datasets and iterating required repeating this process. Steps 2-4 could take hours, directly impacting research iteration speed.

While copying snapshots before starting jobs to colocate data with GPUs resulted in optimal performance for large-scale training jobs spanning weeks or months, the vast majority of jobs are much smaller. Researchers running these jobs would gladly trade occasional performance degradation for iteration speed. Meta needed a system where researchers could ingest data once and access it anywhere without thinking about regional boundaries, enabling iteration in minutes rather than hours.

## Tiered Cache Architecture with On-Demand Hydration

The write-once, read-many characteristic of training datasets led Meta to borrow ideas from operating system design: treating storage as a disk in a planet-scale computer with transparent data hydration across cache layers, analogous to how Linux hydrates data on-demand across page cache, L2, and L1 CPU caches.

The resulting architecture leverages various on-host and off-host storage resources as a tiered cache with global BLOB-storage fabric backed by HDDs as the ultimate source of truth. Specifically, memory and flash on the GPU host serve as L1 and L2 caches, regional BLOB-storage fabric backed by flash serves as L3 cache, and the dataloader continues accessing storage through the familiar BLOB-storage SDK.

To effectively hide latencies and simplify data lifecycle, Meta relies on three mechanisms. Dataloader prefetch fetches the next batch of datasets into memory while processing the current batch, surfacing as read operations at the BLOB-storage SDK level. Deep prefetch through an explicit prefetch() API allows the dataloader to trigger prefetch of data needed during the next few minutes in the background, triggering hydration from remote storage onto the local region L3 cache and prewarming the metadata cache. Automatic data lifecycle management holds data in the L3 regional disaggregated flash tier for a configured period to allow reuse across epochs, with support for custom eviction policies including TTL and LRU, and capacity/quota awareness.

## Production Impact and Adoption

Meta saw rapid adoption of the new data-loading paradigm as soon as production rollout started, though they continue supporting both old and new paradigms. The impact on ingestion times was dramatic: their chart showing ingestion times before and after rollout demonstrates a shift from hours-long ingestion to near-instantaneous access. This represents a fundamental shift in research workflow—researchers no longer wait hours for data ingestion before each iteration but can immediately begin training with on-demand hydration handling data movement transparently in the background.

Meta explicitly frames this as essential for the pace of modern LLM development: "In a world where new frontier models get released in weeks, this shift in the data-loading paradigm is a much-needed change to move even faster." This directly ties infrastructure improvements to competitive velocity in frontier model development.

## Critical LLMOps Insights and Tradeoffs

This case study offers several critical insights for LLMOps practitioners. First, storage infrastructure is not an afterthought but a first-class concern for LLM training at scale. The case study demonstrates that even with optimal compute infrastructure, storage bottlenecks directly translate to GPU stalls and wasted computational resources. For organizations investing heavily in GPU infrastructure, equivalent investment in storage architecture is essential to realize actual GPU utilization.

Second, the tradeoff space for infrastructure design shifts fundamentally with AI workloads compared to traditional applications. Meta's willingness to abandon global-by-default replication, invest in flash despite higher cost per byte, and prioritize power efficiency over space efficiency reflects how LLM workloads change infrastructure economics. The computational cost of storage becomes negligible relative to GPU costs, justifying investments that would be unjustifiable for traditional workloads.

Third, the distinction between large-scale production training and research iteration requires different infrastructure paradigms. While large multi-week training runs benefit from the performance optimization of full data colocation, the majority of smaller research jobs benefit more from reduced operational overhead through on-demand hydration. Supporting both paradigms simultaneously recognizes that LLMOps encompasses diverse workload patterns with different optimal tradeoffs.

Fourth, the importance of bounded tail latencies (pMax) rather than just average performance is critical for synchronized distributed training. A single slow storage response stalling a single GPU cascades to stall all synchronized GPUs, making worst-case performance the actual performance metric that matters. This requires rethinking traditional storage optimization focused on throughput and average latency.

Fifth, the integration of caching across multiple tiers (on-host memory, on-host flash, regional flash, global HDD) with intelligent prefetching and automatic lifecycle management demonstrates sophisticated data orchestration required for production LLM infrastructure. The 80% cache hit rate on distributed data cache shows the effectiveness of exploiting temporal and spatial locality in training workloads.

## Future Directions and Ongoing Challenges

Meta identifies several areas of ongoing work. They are working on scaling storage to network limits, supporting checkpointing without stalling GPUs at even higher scale, and tackling new challenges for inference workloads. The mention of inference workloads is particularly notable, as the case study focuses primarily on training—indicating that inference at scale presents different storage challenges that Meta is beginning to address.

The checkpoint management challenge is especially relevant for LLMOps: saving model state during training without stalling GPUs requires careful orchestration of write traffic and storage bandwidth. As model sizes continue growing, checkpoint sizes grow proportionally, making this an increasingly critical concern.

## Balanced Assessment

While Meta's case study provides valuable technical insights, several caveats warrant consideration. First, the solutions described are designed for hyperscale infrastructure—hundreds of exabyte-scale clusters and hundreds of thousands of GPUs. The specific architectural choices may not translate directly to organizations operating at smaller scales, where the engineering investment required to build custom storage stacks may not be justified.

Second, the case study is light on specific performance metrics beyond the 80% cache hit rate and visual chart of ingestion time improvements. More detailed quantitative analysis of GPU utilization improvements, specific latency percentiles, and throughput numbers would strengthen the technical assessment. The claim of "adding negligible overhead on top of Tectonic" is not quantified with specific measurements.

Third, the complexity of the solution is significant—requiring custom metadata systems backed by ZippyDB, integration with existing systems like Owl, sophisticated client SDKs with embedded block clients, and coordination across multiple cache tiers. This complexity brings operational overhead and potential failure modes that are not discussed in detail. Organizations considering similar approaches should carefully weigh the operational burden against performance benefits.

Fourth, the case study describes an evolution from one architecture to another but provides limited discussion of migration challenges, backwards compatibility considerations, or lessons learned from the transition. In production LLMOps, smooth migration paths are often as important as the ultimate architecture.

Finally, while the tiered cache architecture with on-demand hydration clearly provides benefits for research velocity, the performance tradeoffs are not fully quantified. The statement that researchers are "willing to trade off occasional performance degradation for iteration speed" suggests some training runs may experience suboptimal performance—understanding the magnitude and frequency of these degradations would be valuable for practitioners evaluating similar approaches.

Despite these limitations, the case study provides rare visibility into storage infrastructure challenges and solutions for production LLM training at massive scale, offering valuable insights for the broader LLMOps community about the infrastructure foundations required to support rapid frontier model development.
