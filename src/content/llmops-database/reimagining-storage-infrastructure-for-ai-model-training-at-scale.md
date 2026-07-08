---
title: "Reimagining Storage Infrastructure for AI Model Training at Scale"
slug: "reimagining-storage-infrastructure-for-ai-model-training-at-scale"
draft: false
llmopsTags:
  - "poc"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "cache"
  - "pytorch"
  - "kubernetes"
  - "monitoring"
  - "scalability"
  - "meta"
industryTags: "tech"
company: "Meta"
summary: "Meta redesigned its entire storage infrastructure to address critical performance bottlenecks in training large language models and frontier AI systems. The problem centered on GPU stalls caused by storage latency, which resulted in 20% idle time costing tens of millions of dollars per hour in large data centers, while also slowing research velocity as model iteration cycles compressed from 104 weeks to 4 weeks. The solution involved building a new object storage architecture with collapsed metadata layers, client-side SDK logic, distributed caching mechanisms including read plan caches and hard object caches on GPU hosts, and a tiered global caching system enabling on-demand data hydration across regions. This new architecture achieved 80-90% cache hit rates, reduced data ingestion latencies by 90%, and eliminated the need for researchers to manually copy datasets across regions before starting training jobs."
link: "https://www.youtube.com/watch?v=xc_BxLsijWA"
year: 2026
seo:
  title: "Meta: Reimagining Storage Infrastructure for AI Model Training at Scale - ZenML LLMOps Database"
  description: "Meta redesigned its entire storage infrastructure to address critical performance bottlenecks in training large language models and frontier AI systems. The problem centered on GPU stalls caused by storage latency, which resulted in 20% idle time costing tens of millions of dollars per hour in large data centers, while also slowing research velocity as model iteration cycles compressed from 104 weeks to 4 weeks. The solution involved building a new object storage architecture with collapsed metadata layers, client-side SDK logic, distributed caching mechanisms including read plan caches and hard object caches on GPU hosts, and a tiered global caching system enabling on-demand data hydration across regions. This new architecture achieved 80-90% cache hit rates, reduced data ingestion latencies by 90%, and eliminated the need for researchers to manually copy datasets across regions before starting training jobs."
  canonical: "https://www.zenml.io/llmops-database/reimagining-storage-infrastructure-for-ai-model-training-at-scale"
  ogTitle: "Meta: Reimagining Storage Infrastructure for AI Model Training at Scale - ZenML LLMOps Database"
  ogDescription: "Meta redesigned its entire storage infrastructure to address critical performance bottlenecks in training large language models and frontier AI systems. The problem centered on GPU stalls caused by storage latency, which resulted in 20% idle time costing tens of millions of dollars per hour in large data centers, while also slowing research velocity as model iteration cycles compressed from 104 weeks to 4 weeks. The solution involved building a new object storage architecture with collapsed metadata layers, client-side SDK logic, distributed caching mechanisms including read plan caches and hard object caches on GPU hosts, and a tiered global caching system enabling on-demand data hydration across regions. This new architecture achieved 80-90% cache hit rates, reduced data ingestion latencies by 90%, and eliminated the need for researchers to manually copy datasets across regions before starting training jobs."
notion:
  pageId: "397f8dff-2538-80c8-a4fb-f19898ad2938"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:00:00.000Z"
  lastEditedTime: "2026-07-08T20:00:00.000Z"
  publishedAt: "2026-07-08T20:10:26Z"
---

## Overview

Meta has undertaken a comprehensive redesign of its storage infrastructure to support the production training of large language models and other frontier AI systems. This case study represents a multi-year journey from 2024 through 2026, during which Meta systematically addressed storage bottlenecks that were directly impacting both the cost efficiency of GPU utilization and the velocity of AI research. The work was driven by concrete observations that GPUs were spending approximately 20% of their time stalled waiting for data, translating to tens of millions of dollars lost per hour in data centers containing hundreds of thousands of GPUs.

The presentation covers two major problem areas that Meta tackled: maximizing GPU utilization to reduce operational costs, and maximizing research velocity to enable faster iteration on models. The context for this work is particularly important given the explosive growth in AI workloads. Meta observed a 10 order of magnitude increase in the amount of data used to train frontier models over the past decade, a shift from text-only to multimodal data including audio and video, and an increasing proportion of AI-generated content alongside human-generated training data. Additionally, the cadence of model releases accelerated dramatically, with major model upgrades moving from a 104-week cycle in 2020-2022 to approximately 4 weeks by 2026.

## Technical Architecture Evolution

Meta's storage infrastructure is built on a foundation called Tectonic, which serves as a horizontally scalable block layer consisting of HDDs, TLC flash, and other storage technologies. Over the years, Meta has progressively optimized different layers of this stack. In 2024, the focus was on improving the file API to support Llama workloads. In 2025, Meta deployed one of the largest production deployments of QLC flash technology globally. The current work in 2026 centers on optimizing the object API path on top of the block layer to support upcoming models.

The legacy blob storage architecture that served Meta's family of applications like Facebook and Instagram proved inadequate for AI workloads. In the traditional system, when a client sent a get request, it would arrive at an API server that needed to translate a blob name to a storage address through a series of metadata lookups, some regional and some global. This translation was an order-n operation with multiple layers that had evolved organically over time, each with its own dependencies for managing state and metadata. While this worked well for consumer applications, it became a non-starter for AI workloads requiring millisecond access to data on flash storage.

Beyond latency, the design constraints had fundamentally shifted. The traditional architecture was highly optimized for availability and durability, with both data and metadata replicated globally by default to handle scenarios like entire regions going down. For AI workloads, this design choice hurt rather than helped performance. Similarly, while the legacy system was optimized for dollar-per-byte cost efficiency using hard drives with various tiers, AI workloads demanded high operations per second necessitating flash, and the cost of storage became negligible relative to GPU costs. However, power efficiency became critical for AI, as data centers face power constraints where every kilowatt spent on storage is a kilowatt unavailable for GPUs. The consistency semantics also differed, with AI datasets typically being write-once-read-many and benefiting from relaxed consistency, unlike traditional workloads.

## New Storage Architecture for AI

Meta's redesigned architecture incorporated three major changes. First, they collapsed the distributed metadata spread across different services into a single flat unified schema, achieving order-one lookup to map a blob name to a storage address, a step function improvement over the legacy system. Second, they eliminated the proxy in the data plane and pushed logic onto a client-side SDK. With this design, when a client sends a get request, the SDK intercepts it and translates it to a get read plan request to the API server. The server returns a read plan response containing the storage address, enabling the client to stream bytes directly from storage nodes. This approach improves throughput, reduces latency, and enhances power efficiency. Third, the architecture is now deployed regionally with data and metadata collocated in the same region as the GPUs, though the stack is lean enough to be deployed regionally or globally as needed.

## Handling Bursty Workloads

AI model training creates particularly challenging workload patterns for storage systems. Each GPU functions as a data processing core continuously reading data from storage, processing it, and periodically checkpointing state back to storage. The challenge stems from two factors: this operation happens in parallel across hundreds to thousands of GPUs, and these GPUs typically synchronize among themselves before performing operations like data loading or checkpoint writing. The combination of massive parallelism and synchronized reads and writes results in bursty traffic patterns that demand high operations per second, with IO patterns varying significantly across different workloads.

To understand the impact of latency on GPU utilization, consider the typical pattern where CPU cores on GPU machines prefetch the data needed next while GPUs process the previous batch. As long as prefetching time remains within the GPU processing time, GPUs never stall. However, when storage latency spikes and prefetching takes longer, GPUs stall. Because GPUs synchronize with each other, even if most GPUs are ready, they all wait for the slowest one, multiplying the impact of any latency spike across the entire cluster. The key insight is that predictable latencies from storage matter all the way up to peak performance for AI workloads.

To address bursty reads and writes, Meta introduced two new components. The read plan cache is a distributed in-memory store that maintains mappings of blob names to storage addresses. It can serve very high queries per second with low latency, effectively absorbing traffic spikes. The second component is a hard object cache that leverages underutilized memory on GPU hosts. Meta observed that memory on GPU hosts is not always fully utilized, so they carved out a small portion to repurpose as a distributed peer-to-peer hard object cache. In production, this typically achieves about 80% cache hit rates across different workloads. The combination of these mechanisms effectively handles bursty reads in the read path.

Meta notes that while these major architectural changes got them 80-90% of the way to their performance goals, the final 10% required numerous additional optimizations across the stack, though the presentation acknowledges this list is not exhaustive.

## Maximizing Research Velocity

Beyond raw performance, Meta focused on removing friction from researcher workflows. The typical workflow for a Meta researcher involves creating datasets from different sources and persisting them in blob storage, picking a region to run a training job on, copying datasets to that target region, running the job, analyzing outputs, tweaking parameters, and iterating. The problems that slow researchers down are having to manually select target regions and having to copy datasets across regions, which can take hours to days depending on dataset size, during which researchers are blocked waiting for storage.

This workflow emerged because GPUs are scarce and Meta operates many clusters spread globally rather than in a single region. For performance reasons, it's optimal to have data and metadata collocated in the same region as GPUs. In practice, however, Meta observed that this level of performance matters most for large-scale pre-training jobs spanning weeks to months. The vast majority of jobs finish within hours to a day, and for these workloads, iteration speed matters more than maximum storage performance.

Meta's solution exploits the write-once-read-many nature of these datasets. The ideal researcher experience is ingesting data once and consuming it anywhere regardless of regional boundaries. Meta borrowed concepts from operating system design, thinking of storage as a disk in a planet-scale computer. Just as an OS transparently hydrates data from disk to page cache to various CPU caches up to L1 cache when a process accesses a file, Meta built a similar tiered caching solution for global data access.

The solution leverages the global blob storage stack along with resources on GPU host memory and NVMe to build this tiered cache. Researchers ingest data once into global blob storage, which becomes the permanent source of truth, analogous to disk in the OS model. Within a specific region, memory on the GPU host serves as the L1 tier, NVMe as the L2 tier, and regional blob storage backed by flash as the L3 tier. When a job tries to access data remotely, the data loader and client-side SDK transparently hydrate data from global blob storage through the L3 tier all the way up to GPU memory.

While this approach might seem to undo some of the latency optimizations previously discussed, Meta mitigates this through two types of prefetching. Data loader prefetch involves the data loader prefetching next batches while the GPU processes the previous batch. Background prefetch has the data loader look ahead to identify data needed over the next few minutes and issue proactive prefetch requests. These mechanisms effectively hide latencies and maintain high GPU utilization.

The results showed approximately 90% reduction in ingestion times across the board. In production, Meta continues to support both the on-demand hydration technique and the traditional approach of copying datasets before job start, though on-demand hydration is increasingly becoming the default going forward.

## Future Directions

Meta identifies several areas of ongoing and future work. Scaling storage to network limits is critical as each GPU generation increases network interconnect capabilities. The transition from GB200 to GB300 sees network capacity nearly double while CPU resources remain constant, requiring storage systems to fully utilize the network on the newest GPUs. Checkpoint optimization represents the other half of the story beyond data loading, as growing data volumes lead to larger and more frequent checkpoints requiring further stack optimizations. Finally, while all the discussed work focused on training workloads, inference workloads present the next major challenge Meta is addressing.

## Critical Assessment

This case study provides valuable insights into the infrastructure challenges of running large language models and frontier AI systems in production. The quantification of GPU stall time and its financial impact provides concrete motivation for the investment in storage infrastructure. The architectural decisions show a thoughtful reconsideration of fundamental tradeoffs when workload characteristics change dramatically.

However, several aspects deserve scrutiny. The presentation comes from Meta engineers and naturally emphasizes successful outcomes without dwelling on challenges, failed approaches, or ongoing problems. The 80% cache hit rate figure, while impressive, means 20% of requests still go to slower tiers, and it's unclear how performance varies across different workload types or what happens during cache invalidation scenarios. The claim of 90% reduction in ingestion times is presented without detailed methodology, baseline conditions, or discussion of workloads where the improvement might be less dramatic.

The regional deployment model with on-demand hydration presents an interesting tradeoff. While it clearly improves researcher velocity by eliminating manual data copying, the latency of accessing data across regions could still impact performance for certain workload types. The use of prefetching to hide this latency is clever but depends on predictable access patterns, which may not hold for all training scenarios or during early exploratory phases of research.

The power efficiency angle is compelling given data center constraints, though the presentation doesn't quantify the power savings achieved. Similarly, while eliminating the proxy in the data plane and pushing logic to client-side SDKs improves performance, it likely increases complexity for developers and may create challenges for debugging, versioning, and managing client compatibility across a large organization.

The evolution from file API optimization in 2024, to QLC deployment in 2025, to object API optimization in 2026 suggests an incremental, pragmatic approach to infrastructure evolution rather than a single big-bang rewrite. This is likely the right approach for a production system at Meta's scale, though it also means that legacy systems and design decisions continue to constrain the solution space.

Overall, this represents a sophisticated approach to LLMOps infrastructure that addresses real production challenges at scale. The focus on both cost efficiency through GPU utilization and research velocity through improved developer experience shows a mature understanding of the full lifecycle of AI model development. The specific techniques around tiered caching, metadata optimization, and client-side prefetching provide concrete patterns that other organizations building LLMOps infrastructure can learn from, though the scale of Meta's deployment may make some approaches impractical for smaller organizations.
