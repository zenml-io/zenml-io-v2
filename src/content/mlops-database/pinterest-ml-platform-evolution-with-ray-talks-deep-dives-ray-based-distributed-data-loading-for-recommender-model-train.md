---
title: "Ray-based distributed data loading for recommender model training to remove data bottlenecks and improve throughput"
slug: "pinterest-ml-platform-evolution-with-ray-talks-deep-dives-ray-based-distributed-data-loading-for-recommender-model-train"
draft: false
mlopsTags:
  - "compute-management"
  - "pipeline-orchestration"
  - "dbt"
  - "kubernetes"
  - "ray"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "training"
industryTags: "media-entertainment"
company: "Pinterest"
companySlug: "pinterest"
platformName: "ML platform evolution with Ray (talks + deep dives)"
contentType: "video"
summary: "Pinterest's ML platform team tackled severe data loading bottlenecks in their recommender model training pipeline, which was processing hundreds of terabytes across 100,000+ files per job. Despite using A100/H100 GPUs, their home feed ranking model achieved only 880,000 examples per second, while benchmarking showed the model itself could handle 5 million examples per second when compute-bound. The team implemented a distributed data loading architecture using Ray to scale out CPU preprocessing across heterogeneous clusters, breaking free from fixed CPU-to-GPU ratios on single nodes. Through optimizations including sparse tensor formats, data compression, custom serialization, and moving expensive operations off GPU nodes, they achieved 400,000 examples per second—a 3.6x improvement over the initial Ray setup and 50% better than their optimized single-node PyTorch baseline, with demonstrated scalability to 32 CPU nodes for complex workloads."
link: "https://www.youtube.com/watch?v=yqVLRONwDJs"
year: 2024
seo:
  title: "Pinterest: Ray-based distributed data loading for recommender model training to remove data bottlenecks and improve throughput - ZenML MLOps Database"
  description: "Pinterest's ML platform team tackled severe data loading bottlenecks in their recommender model training pipeline, which was processing hundreds of terabytes across 100,000+ files per job. Despite using A100/H100 GPUs, their home feed ranking model achieved only 880,000 examples per second, while benchmarking showed the model itself could handle 5 million examples per second when compute-bound. The team implemented a distributed data loading architecture using Ray to scale out CPU preprocessing across heterogeneous clusters, breaking free from fixed CPU-to-GPU ratios on single nodes. Through optimizations including sparse tensor formats, data compression, custom serialization, and moving expensive operations off GPU nodes, they achieved 400,000 examples per second—a 3.6x improvement over the initial Ray setup and 50% better than their optimized single-node PyTorch baseline, with demonstrated scalability to 32 CPU nodes for complex workloads."
  canonical: "https://www.zenml.io/mlops-database/pinterest-ml-platform-evolution-with-ray-talks-deep-dives-ray-based-distributed-data-loading-for-recommender-model-train"
  ogTitle: "Pinterest: Ray-based distributed data loading for recommender model training to remove data bottlenecks and improve throughput - ZenML MLOps Database"
  ogDescription: "Pinterest's ML platform team tackled severe data loading bottlenecks in their recommender model training pipeline, which was processing hundreds of terabytes across 100,000+ files per job. Despite using A100/H100 GPUs, their home feed ranking model achieved only 880,000 examples per second, while benchmarking showed the model itself could handle 5 million examples per second when compute-bound. The team implemented a distributed data loading architecture using Ray to scale out CPU preprocessing across heterogeneous clusters, breaking free from fixed CPU-to-GPU ratios on single nodes. Through optimizations including sparse tensor formats, data compression, custom serialization, and moving expensive operations off GPU nodes, they achieved 400,000 examples per second—a 3.6x improvement over the initial Ray setup and 50% better than their optimized single-node PyTorch baseline, with demonstrated scalability to 32 CPU nodes for complex workloads."
mlops:
  source: "sqlite"
  entryId: 190
  sourceUrl: "https://www.youtube.com/watch?v=yqVLRONwDJs"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.617442"
  lastUpdated: "2026-04-14T19:55:53.676969"
---

## Problem Context

Pinterest's machine learning platform powers hundreds of ML applications running on thousands of GPUs, serving critical product surfaces including home feed recommendations, related pins, shopping, and search. Despite the industry focus on generative AI, recommender systems remain the "bread and butter" for Pinterest, directly impacting performance-based advertising revenue and core engagement metrics. The team faced a fundamental challenge: their recommender model training was severely bottlenecked by data loading rather than GPU compute.

The core problem manifested in their home feed ranking use case, where training throughput reached only 880,000 examples per second despite using high-end A100 or H100 GPUs. When they froze a single batch on GPU and eliminated the data loader from the equation, throughput jumped to 5 million examples per second—revealing a staggering 6x performance gap. This bottleneck had multiple root causes that distinguished recommender systems from generative AI workloads:

Recommender models are served at very low latencies for real-time product needs, making them significantly smaller and less compute-intensive than large language models. They are highly data-intensive with unfavorable data-to-compute ratios, consuming hundreds or thousands of features per example, including very large sequence features. Training datasets are massive—single jobs consume hundreds of terabytes spanning 100,000+ Parquet files from engagement logs. Cloud instances come with fixed CPU-to-GPU ratios, preventing arbitrary scaling of preprocessing capacity. The team needed to fundamentally rethink their data pipeline architecture to break through these constraints.

## Architecture & Design

Pinterest's ML training infrastructure is built on a unified compute platform called TCP (Training Compute Platform) that handles both user-submitted and scheduled workflow jobs through a shared API. The entire system runs on Kubernetes in AWS, supporting various GPU types with PyTorch as the primary framework wrapped in an internal abstraction called MLN. Training data is predominantly tabular, stored in Apache Parquet format backed by Hive and Iceberg.

The training pipeline architecture consists of several distinct stages that data flows through before reaching the model. File I/O reads from Parquet files in object storage, followed by user-defined functions executing CPU-based transformations in Python. Tensor conversion transforms data into PyTorch-native formats, then memory operations copy data into pinned memory and subsequently into GPU memory. GPU preprocessing applies final transformations before yielding batches to the model for forward and backward passes. The team identified that the "data loader" encompassed everything except the final forward/backward steps—and this massive gray area was their optimization target.

The breakthrough came from adopting Ray to build a distributed data loading architecture that breaks free from single-node CPU constraints. The final design uses heterogeneous Ray clusters where three or more CPU-only nodes (typically r7i instances) perform all file I/O and preprocessing, streaming batches over the network to GPU trainer nodes (p4d instances with A100s or H100s). Ray Data expresses the preprocessing pipeline with map-batch operations for filtering and downsampling, while Ray Core provides the distributed heterogeneous CPU-GPU runtime with built-in debugging and UI tools.

The key architectural insight is separating concerns: CPU nodes handle the data-intensive work at scale while GPU nodes focus purely on the training loop. This required moving expensive operations like batch formation, collation (PyTable to tensor dictionary conversion), and serialization entirely off the GPU process and into the Ray Data pipeline running on CPU nodes. The GPU process becomes a thin consumer that receives preprocessed batches, handles the final memory movement with proper pipelining, and executes model computation.

## Technical Implementation

The optimization journey proceeded through multiple phases, each addressing specific bottlenecks revealed through careful profiling and experimentation. Initial attempts focused on reducing data volume before tackling architectural changes.

**Sparse Tensor Optimization**: Pinterest's recommender models use hundreds of sequence features that are often mostly empty. The team adopted PyTorch's CSR (Compressed Sparse Row) format for sparse tensors, storing only non-empty slots during file I/O and preprocessing. The sparse representation is densified back to full tensors on GPU just before model consumption. This approach exploits GPU memory bandwidth advantages—even though densification adds work, GPUs perform this operation far faster than transferring full dense tensors across PCIe. The immediate impact was dramatic: throughput jumped from 880,000 to 1.6 million examples per second, a 100% improvement.

**Data Compression and Sorting**: The team applied application-specific optimizations by sorting Parquet records in optimal order for compression. Parquet's columnar format compresses significantly better when similar values are adjacent. This reduced storage footprint and file I/O bytes, compounding with the sparse tensor gains to push throughput to 2.6 million examples per second—another 30% improvement. However, this still fell far short of the 5 million examples per second theoretical maximum.

**Distributed Data Loading with Ray**: The team integrated Ray to scale out preprocessing across heterogeneous clusters. The initial Ray setup followed standard patterns: Ray Data pipelines on CPU nodes handled I/O and transformations, streaming to individual training processes through Ray Data iterators. However, the first implementation delivered only 1.1 million examples per second—worse than the single-node baseline. This failure revealed three critical issues: expensive CPU preprocessing still happened on GPU nodes within the data iterator, Ray Object Store transfers became bottlenecks due to data volume, and critical data movement components like GPU preloading and memory pinning were missing.

**Batch Formation Offloading**: The team implemented batching as Ray actors, moving this expensive full-copy operation from the GPU process into the Ray Data pipeline. This allowed batch formation to scale naturally with CPU nodes and eliminated GPU idle time waiting for batch preparation.

**Object Store Compression**: Ray's Object Store by default transfers data between nodes uncompressed, while the source Parquet files use zstd compression. This created massive data inflation during CPU-to-GPU transfers. The team patched Ray Core's Object Store layer in their open-source fork to apply zstd compression to all inter-node data transfers. This matched compression ratios between S3-to-CPU and CPU-to-GPU transfers, reducing bytes transferred by more than 10x and eliminating the Object Store bottleneck.

**Custom Serialized Batch Format**: The team introduced a custom serialization format that packs all tensor binaries into a single contiguous buffer. This addressed two problems simultaneously: it enabled moving the expensive collate operation (PyTable to tensor dictionary conversion) off GPU nodes and into CPU preprocessing, and it fixed overhead in the data movement funnel where each feature column incurred separate unpickling costs. With hundreds to thousands of features per batch, unpickling overhead alone exceeded 400 milliseconds—1.5x the forward pass time. The single-buffer approach reduced this to sub-20 milliseconds.

**GPU Memory Pipelining**: The final piece replicated PyTorch DataLoader's sophisticated memory movement pipelining. The implementation uses pinned (non-paged) memory to accelerate GPU memory copies, and a separate CPU thread with CUDA streams to preload the next batch into GPU memory while the model computes on the current batch. This ensures the GPU never waits for data transfer—the next batch is already resident when needed.

## Scale & Performance

Pinterest's production training workloads operate at substantial scale. Typical training jobs use 8 to 16 A100 or H100 GPUs, running anywhere from 20 to 300 hours depending on the use case. Single training jobs consume hundreds of terabytes of data spanning 100,000+ Parquet files. The home feed ranking model—their primary optimization target—uses hundreds to thousands of features with large sequence inputs.

The performance improvements through the optimization journey were dramatic and measurable:

**Baseline**: The original PyTorch setup with standard data loading achieved 880,000 examples per second. Benchmarking with a frozen batch on GPU revealed the model itself could process 5 million examples per second when compute-bound, exposing a 6x gap.

**Sparse Tensors**: Adopting CSR sparse tensor format for sequence features immediately doubled throughput to 1.6 million examples per second, a 100% improvement.

**Data Sorting**: Application-specific Parquet sorting for better compression added another 30%, reaching 2.6 million examples per second.

**Initial Ray Setup**: The first distributed architecture with three CPU nodes plus one GPU node actually regressed to 1.1 million examples per second—42% worse than the optimized single-node baseline.

**Final Ray Architecture**: After implementing all optimizations (batch offloading, Object Store compression, custom serialization, GPU pipelining), the system achieved 4 million examples per second with one p4d GPU node and three r7i CPU nodes. This represents a 3.6x improvement over the initial Ray setup and 50% better than the best single-node configuration.

**Scalability**: Recent experiments demonstrated good horizontal scalability, scaling to 32 CPU nodes for complex raw sequence feature processing while maintaining the 4 million examples per second target throughput.

The compression benefits were substantial throughout the pipeline: Parquet sorting improved on-disk compression ratios, sparse tensors reduced in-memory representation by storing only non-empty slots, and Object Store compression maintained 10x+ compression during network transfers, matching S3-to-CPU ratios.

The data movement funnel optimization proved critical: unpickling overhead dropped from 400+ milliseconds (1.5x the forward pass time) to under 20 milliseconds by using single-buffer serialization. GPU preloading eliminated all data transfer wait time, allowing continuous model computation.

## Trade-offs & Lessons

The Pinterest team's journey offers several valuable lessons for practitioners building data-intensive ML systems, particularly for recommender models and other high-throughput training workloads.

**Start with Single-Node Optimizations**: Before investing in distributed infrastructure, the team achieved a 2x improvement through sparse tensors and data compression. These changes were simpler to implement and maintain than distributed systems, and they compounded with later optimizations. The lesson: exhaust data reduction techniques before scaling out.

**Benchmark to Understand Bottlenecks**: The frozen-batch experiment was crucial—it definitively proved the model wasn't the bottleneck and quantified the available headroom (6x). Without this measurement, the team might have pursued GPU optimization instead of data loading. Rigorous profiling and controlled experiments guided the entire optimization strategy.

**Distributed Systems Add Complexity**: The initial Ray implementation performed worse than the single-node baseline, demonstrating that naïvely distributing workloads can introduce new bottlenecks. Ray's Object Store, designed for general-purpose distributed computing, wasn't optimized for the massive data volumes in ML training. The team needed deep understanding of both their workload and Ray internals to make it work.

**Full-Stack Optimization Matters**: Success required optimizations across every layer: storage format (Parquet sorting), data representation (sparse tensors), serialization (custom tensor buffers), network transfer (Object Store compression), memory management (pinned memory), and GPU operations (CUDA streams for preloading). No single optimization closed the gap—only the compounding effects of addressing every bottleneck achieved the 4.5x overall improvement.

**Custom Infrastructure Is Sometimes Necessary**: Pinterest maintained an open-source fork of Ray to add Object Store compression and other changes. They built custom serialization formats and Ray actors for batch formation. While this creates maintenance burden, it was essential for their specific requirements. The trade-off between using off-the-shelf tools versus customization depends on scale and performance requirements.

**Heterogeneous Clusters Break Resource Constraints**: The fixed CPU-to-GPU ratio on cloud instances was a fundamental limitation that no amount of single-node optimization could overcome. Ray's ability to mix CPU-only and GPU nodes in one cluster was the key architectural enabler. For data-intensive workloads, decoupling preprocessing from training resources is essential.

**Move Work to Where Resources Are Abundant**: The guiding principle was consistently moving operations off constrained resources (GPUs) to abundant ones (CPUs). Batch formation, collation, and serialization all moved from GPU processes to CPU nodes. Even when operations seemed small, their cumulative impact on GPU idle time was significant.

**Data Movement Is a First-Class Concern**: The team dedicated substantial effort to optimizing every data transfer: file I/O from S3, memory copies, network transfers between nodes, and PCIe transfers to GPU. For high-throughput training, data movement often dominates compute time. Compression, pipelining, and minimizing serialization overhead all proved critical.

**Generative AI Lessons Don't Always Transfer**: The team explicitly noted that recommender models have inverse characteristics from large language models—they're smaller, less compute-intensive, but far more data-intensive. Optimization strategies for LLM training (like focusing on compute kernels and model parallelism) don't apply. Practitioners should profile their specific workload rather than assuming industry trends apply.

The work represents a substantial engineering investment from multiple teams (ML training, ML platform, infrastructure), highlighting that production ML systems require deep collaboration across specialties. The 50% throughput improvement over their best single-node setup translates directly to reduced training time and cost at Pinterest's scale, where thousands of GPUs run continuously. For organizations running similar recommender workloads, the lessons about heterogeneous clusters, data movement optimization, and systematic bottleneck elimination offer a roadmap for achieving similar gains.
