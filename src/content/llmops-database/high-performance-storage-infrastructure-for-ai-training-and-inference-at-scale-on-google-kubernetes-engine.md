---
title: "High-Performance Storage Infrastructure for AI Training and Inference at Scale on Google Kubernetes Engine"
slug: "high-performance-storage-infrastructure-for-ai-training-and-inference-at-scale-on-google-kubernetes-engine"
draft: false
llmopsTags:
  - "content-moderation"
  - "chatbot"
  - "realtime-application"
  - "reinforcement-learning"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "scaling"
  - "orchestration"
  - "devops"
  - "vllm"
  - "pytorch"
  - "cache"
  - "fastapi"
  - "google-gcp"
  - "nvidia"
  - "meta"
  - "hugging-face"
industryTags: "tech"
company: "Clickhouse / Character"
summary: "Character AI and Clickhouse addressed critical storage bottlenecks in their AI and database workloads running on Google Kubernetes Engine (GKE). Character AI needed petabyte-scale data access for training with thousands of parallel workers and fast model loading for autoscaling inference services. Clickhouse required high-performance storage for their cloud-based OLAP database to maintain performance parity with on-premises architectures while achieving cloud scalability. Both companies leveraged GKE's storage solutions including Google Cloud Storage (GCS) with Fuse drivers, managed Lustre, Hyperdisk, and local SSD caching. Character AI achieved 60% faster model loading times using run.ai Model Streamer, while Clickhouse's distributed cache architecture delivered near-parity performance with shared-nothing architectures while maintaining cloud scalability. The solutions enabled 50% TCO savings through improved GPU utilization, 170x performance improvements with storage profiles, and sub-second data access for inference workloads."
link: "https://youtu.be/Qy3rDOW_TZ4"
year: 2026
seo:
  title: "Clickhouse / Character: High-Performance Storage Infrastructure for AI Training and Inference at Scale on Google Kubernetes Engine - ZenML LLMOps Database"
  description: "Character AI and Clickhouse addressed critical storage bottlenecks in their AI and database workloads running on Google Kubernetes Engine (GKE). Character AI needed petabyte-scale data access for training with thousands of parallel workers and fast model loading for autoscaling inference services. Clickhouse required high-performance storage for their cloud-based OLAP database to maintain performance parity with on-premises architectures while achieving cloud scalability. Both companies leveraged GKE's storage solutions including Google Cloud Storage (GCS) with Fuse drivers, managed Lustre, Hyperdisk, and local SSD caching. Character AI achieved 60% faster model loading times using run.ai Model Streamer, while Clickhouse's distributed cache architecture delivered near-parity performance with shared-nothing architectures while maintaining cloud scalability. The solutions enabled 50% TCO savings through improved GPU utilization, 170x performance improvements with storage profiles, and sub-second data access for inference workloads."
  canonical: "https://www.zenml.io/llmops-database/high-performance-storage-infrastructure-for-ai-training-and-inference-at-scale-on-google-kubernetes-engine"
  ogTitle: "Clickhouse / Character: High-Performance Storage Infrastructure for AI Training and Inference at Scale on Google Kubernetes Engine - ZenML LLMOps Database"
  ogDescription: "Character AI and Clickhouse addressed critical storage bottlenecks in their AI and database workloads running on Google Kubernetes Engine (GKE). Character AI needed petabyte-scale data access for training with thousands of parallel workers and fast model loading for autoscaling inference services. Clickhouse required high-performance storage for their cloud-based OLAP database to maintain performance parity with on-premises architectures while achieving cloud scalability. Both companies leveraged GKE's storage solutions including Google Cloud Storage (GCS) with Fuse drivers, managed Lustre, Hyperdisk, and local SSD caching. Character AI achieved 60% faster model loading times using run.ai Model Streamer, while Clickhouse's distributed cache architecture delivered near-parity performance with shared-nothing architectures while maintaining cloud scalability. The solutions enabled 50% TCO savings through improved GPU utilization, 170x performance improvements with storage profiles, and sub-second data access for inference workloads."
notion:
  pageId: "398f8dff-2538-80a1-8256-ea51c35fbc51"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T11:49:00.000Z"
  lastEditedTime: "2026-07-09T15:19:00.000Z"
  publishedAt: "2026-07-23T09:00:05Z"
---

## Overview

This case study presents two detailed production deployments of LLM infrastructure at scale, featuring Character AI and Clickhouse, both running on Google Kubernetes Engine. The presentation was delivered by Jason Messer from Google's GKE storage team, along with practitioners from both companies. Character AI operates an interactive entertainment platform serving over 20 million users who spend up to 90 minutes daily on the platform, requiring massive-scale inference and training infrastructure. Clickhouse delivers a cloud-based OLAP database requiring high-performance storage that balances the scalability benefits of cloud object storage with the performance characteristics of traditional shared-nothing architectures.

The fundamental challenge addressed across both use cases centers on storage as a critical bottleneck for AI workloads in production. As models scale and context windows expand from thousands to millions of tokens, the data plane becomes as important as the compute layer. Expensive GPU and TPU accelerators sitting idle while waiting for data represent wasted investment, making storage optimization crucial for total cost of ownership and operational efficiency.

## The Storage Evolution: Data 1.0 to 3.0

The presentation frames storage challenges through three evolutionary stages. Data 1.0 focused on availability and reliability as organizations moved from stateless to stateful workloads on Kubernetes, solved through highly available control planes using StatefulSets and regional persistent disk solutions. Data 2.0 brought massive storage needs for AI training, requiring orders of magnitude higher throughput than traditional enterprise databases. Storage became a bottleneck as model training scaled, requiring new capabilities like managed Lustre and GCS Fuse with rapid cache to keep accelerators fully utilized and reduce total cost of ownership.

Data 3.0, the current frontier, involves context windows expanding to hundreds of thousands or millions of tokens, agentic sessions lasting hours or days, and post-training activities like reinforcement learning requiring high-speed weight transfers between trainers and samplers. This stage demands KV cache offloading, storage tiering, and prefix-aware routing to maximize tokens per second throughput while minimizing time to first token latency.

## Clickhouse Cloud Architecture and Challenges

Clickhouse Cloud represents a managed offering of the open-source Clickhouse OLAP database, architected with native separation of compute and storage using a proprietary shared merge tree table engine. All Clickhouse instances run on GKE, with thousands of services in production on Google Cloud Platform. The architecture leverages GKE's optimized utilization features for bin packing pods, reducing node count and achieving cost savings.

The storage layer uses GCS as the primary persistent store for its high performance and scalability. Additionally, the architecture incorporates GKE persistent volumes for metadata storage and NVMe disks for caching hot data to reach performance parity with traditional architectures. Each customer workload deploys in its own namespace for tenant isolation, consisting of Clickhouse Keepers for coordination and Clickhouse Servers as compute nodes that execute queries.

Recent migrations to Google's Axion ARM instances have yielded approximately 40% faster query performance at 15% lower cost compared to standard instances, demonstrating the infrastructure's ability to leverage emerging compute options for performance and cost optimization.

## The Distributed Cache Solution

Clickhouse faced several critical challenges with their initial local cache approach. When pods restarted, locally attached NVMe disks would be wiped, requiring cache repopulation and causing performance penalties as subsequent queries needed to fetch data from object storage. The company's idling feature, which scales down compute when no queries are running to avoid charges, similarly resulted in cache loss. Local caches also caused data duplication when queries ran across multiple pods, and during rolling upgrades, new pods lacked access to warm caches, resulting in slower initial performance.

The solution involved architecting a distributed cache system following the principle that in a shared-everything architecture, even cache should be shared. The distributed cache is itself implemented as another Clickhouse instance serving data ultimately persisted in GCS. Instead of reading from local NVMe caches, customer instances now communicate with the distributed cache. To minimize network penalties, the cache is deployed in each availability zone where customer queries exist, using consistent hashing to ensure the same instance always reaches the same cache location and prevent data duplication.

Security and isolation are maintained through mutual TLS and hash-based partitioning to ensure tenant isolation and prevent data intermingling. The architecture typically deploys around six cache servers with two per availability zone, with multiple servers sharing one cache through consistent hashing, maintaining read and write-through caching patterns.

The performance results are striking. Using a shared-nothing self-managed architecture with data stored on local SSDs as a baseline, Clickhouse Cloud with local filesystem cache showed performance penalties on cold queries requiring object storage fetches, though subsequent hot queries matched shared-nothing performance due to local NVMe caches. With distributed cache, the first data fetch from object storage still incurs the cold query penalty, but subsequent queries achieve near-parity with shared-nothing architecture. Critically, when different nodes query the same data, they no longer need to access object storage, eliminating redundant fetches and data duplication while maintaining high performance.

## Character AI Training and Inference Infrastructure

Character AI's infrastructure requirements center on two primary challenges: providing high-throughput access to massive training datasets without data duplication across clusters, and ensuring inference services can load models and access data quickly while scaling dynamically. Large training jobs require petabyte-scale datasets with parallel access from thousands of workers, along with fast checkpoint storage and recovery.

The solution leverages GCS Fuse mounted directly from GCS into deployment YAMLs using the Container Storage Interface driver, maintaining a single source of truth for data. This eliminates the need to duplicate data across clusters while providing the necessary access patterns. For inference, the heavy reliance on autoscaling makes fast startup times and reliable model access critical. Initial attempts at downloading models encountered network issues, and slow storage access caused deployment latency and slower application startup.

By combining GCS Fuse with caching and local storage, Character AI achieved consistent access to model artifacts without network issues, reduced startup times, and simplified model distribution across clusters. The architecture uses multiple GKE clusters with separate training and inference node pools, leveraging GCS with local SSD cache layers. This design allows large distributed training jobs to scale without storage bottlenecks while enabling high-throughput data access without operational overhead.

## Key Learnings and Best Practices

Character AI's experience yielded several important insights for production LLM operations. Object storage works extremely well for AI workloads when the data plane is designed for high parallel throughput. The combination of GCS Fuse with local SSD provides the best results, as training jobs repeatedly read the same datasets and local cache dramatically reduces repeated object storage reads. Maximizing local SSD cache layer usage achieves near-disk performance even when backed by object storage.

AI training workloads generate massive parallel reads, and without proper tuning, Fuse can become a bottleneck. Data structure matters significantly, as too many small files hurt performance. Datasets should be structured for sequential or shard-based access using formats like Parquet. Training data and checkpoints should be separated because they exhibit fundamentally different access patterns. Training datasets involve heavily repeated workloads while checkpoints require large periodic writes, and mixing them causes performance issues. Character AI uses separate buckets for datasets, checkpoints, and model artifacts to optimize for these distinct patterns.

Recent experiments with run.ai Model Streamer using GCS buckets demonstrated substantial improvements. Testing on a small model that took three minutes to download from Hugging Face showed a 60% improvement when using Model Streamer, validating the approach for production deployment.

## Google Cloud Storage Solutions and Optimizations

The broader GKE storage ecosystem provides a range of solutions optimized for different AI workload stages. Google Cloud Storage was enhanced with rapid cache and rapid buckets to meet demanding throughput and latency requirements, fully integrated with GKE through CSI drivers. Google managed Lustre, developed in partnership with DDN, now delivers up to 10 terabytes per second of throughput, representing a 10x increase over the previous year. The new dynamic tier provides low-latency performance required for intense AI workloads like training and checkpointing.

Measurements show that managed Lustre boosts GPU utilization by up to 54% compared to other storage offerings, representing significant cost savings through more fully utilized accelerators not waiting for data. AI training jobs run 10 times faster with managed Lustre, changing execution time from minutes to seconds in many scenarios.

For block storage, Hyperdisk provides performance, capacity, efficiency, and protection at exabyte scale, supporting mission-critical databases requiring low latency and high IOPS. Storage pools intelligently manage storage utilization as a shared resource across GKE clusters, adjusting automatically as capacity grows or shrinks. Hyperdisk Exit pools deliver the highest performance and capacity block storage per cluster of any hyperscaler.

The challenge of multiple block storage options across persistent disk and Hyperdisk variants led to the introduction of dynamic volumes, a single storage class that automatically chooses the best block storage option and works seamlessly with custom compute classes. Users simply specify desired throughput and IOPS, and the system handles provisioning. Volume attributes classes support dynamic updates to throughput and IOPS on the fly without downtime, allowing workloads to be rightsized based on lifecycle demands without recreating disks or rescheduling pods.

## GCS Rapid and Storage Profiles

GCS Rapid represents a fundamental shift in AI infrastructure, bringing the power of Colossus, Google Cloud's high-speed data layer, to customers through a specialized AI storage subsystem. It provides industry-leading durability, massively distributed scale, and ultra-low latency with frequent I/O for the most performance-sensitive workloads. The solution is optimized out of the box for popular AI frameworks including JAX and PyTorch.

GCS Rapid comes in two variants: GCS Rapid Cache and GCS Rapid Bucket. Rapid Cache, formerly called Anywhere Cache, is generally available and provides up to terabytes per second of throughput, supporting 20 million requests per second with submillisecond latencies. It accelerates bandwidth for bursty workloads like model loading for inference, delivering aggregate read throughput of 2.5 terabytes per second with no code changes. The ingest-on-write feature provides up to 2.2 times faster checkpoint restore times.

The complexity of numerous mount options and configuration parameters for optimal performance led to the development of storage profiles. These profiles automatically configure storage access based on workload type, whether serving, training, or checkpointing. A real customer scenario demonstrated the impact: a poorly configured GCS Fuse setup that would have taken approximately 39 hours to load the Qwen 3 model due to disabled file cache, multiple small files causing random reads, and excessive shards being downloaded individually. Using storage profiles, this was reduced to around 14 minutes, representing a 170x performance improvement.

The storage profiles feature provides pre-installed profiles for training, inference, and checkpointing workloads. Using a profile requires only a one-line change pointing persistent volumes and claims to the profile storage class. The feature scans persistent volumes to check bucket characteristics and inform recommendations, with annotations showing object counts and data sizes. Rapid cache configuration is handled automatically, eliminating manual tuning steps while applying best practices optimized for specific AI/ML workload types.

## Model Loading and Run.AI Model Streamer

Model loading represents a critical bottleneck in inference latency, particularly for autoscaling deployments. The run.ai Model Streamer, developed in partnership with NVIDIA, provides simple commands to accelerate model loading from GCS when using vLLM or SGLang directly. The solution is fully integrated with GCS authorization and authentication and supports both GPUs and TPUs.

Performance comparisons with a popular model repository showed dramatic improvements. Loading Llama 3 70B took approximately 164 seconds with only 0.8 GB per second throughput using the traditional approach. With run.ai Model Streamer and distributed streaming enabled, the same model loaded in only 15 seconds, achieving 8.8 GB per second download speed. This represents the fastest way to load models into GPU or TPU memory while remaining simple to implement.

Unlike other solutions that use the CSI driver interface, Model Streamer integrates directly at the application layer with vLLM and SGLang. Vertex AI has adopted GCS-provided run.ai Model Streamer for Llama models, and when bundled with their own optimizations, has achieved 50% improvement in end-to-end model load time. This demonstrates the production readiness and real-world impact of the solution at scale.

## KV Caching and Future Directions

Long context lengths represent the Data 3.0 frontier, with context windows increasing from tens of thousands to millions of tokens. These contexts either need to be cached or regenerated for each request, making efficient KV caching critical for production economics. The goal is lowering time to first token and improving tokens per second throughput by making these data operations highly available and accessible.

Analysis shows that large KV caches shared between accelerators with substantial capacity can result in 50% TCO savings and 60% reduction in GPU hours for workloads like Llama 3 70B inference on A3 Mega nodes, assuming a 95% cache hit ratio. These gains are substantial and represent meaningful cost optimization for production deployments.

KV caching works by recognizing that common input prompts or system prompts typically produce similar outputs. By caching these outputs rather than recomputing them for each request, significant accelerator utilization can be saved. However, full context lengths no longer fit in high-bandwidth memory, requiring offloading to second-tier storage including RAM disks, local SSDs, or object storage.

GPU benchmarks demonstrate that tiered storage with RAM, local SSD, and GCS or Lustre can substantially improve both time to first token and tokens per second throughput. Offloading to CPU RAM alone provided 44% time to first token reduction, while offloading to local SSD yielded 69% throughput improvement for large prompt lengths. Google is working closely with partners like LLMCache to develop and optimize these solutions for production workloads.

## Production Readiness and Scale

The solutions presented have been battle-tested at massive scale. Some deployments involve over 40,000-node GKE clusters while maintaining data availability and performance. This scale validation by large production customers demonstrates that the infrastructure can support real-world enterprise and AI workloads without compromising on performance or reliability.

The evolution from questioning whether stateful workloads on Kubernetes were viable to running thousands of production database and AI services represents a significant maturation of the ecosystem. Recent surveys show databases remain the top workload on Kubernetes, with analytics workloads a close second. AI/ML workloads are rising rapidly and driving innovative features, while approximately 40% of streaming, messaging, and real-time processing workloads run on Kubernetes to facilitate AI/ML data pipelines.

The focus on minimizing total cost of ownership while providing tunable performance has driven much of the innovation. Solutions like Hyperdisk, GCS Rapid, managed Lustre, and storage profiles aim to make storage "boring and easy to configure," often transparently based on the workload itself. This usability focus, combined with performance optimization, positions the platform for continued growth as AI workloads continue scaling in complexity and size.

The case studies from Character AI and Clickhouse demonstrate that production LLM operations require sophisticated storage infrastructure that goes far beyond simple object storage. The combination of intelligent caching, tiered storage, automatic optimization through profiles, and integration with model loading and serving frameworks represents a comprehensive approach to eliminating storage as a bottleneck. The measurable results in terms of cost savings, performance improvements, and GPU utilization validate the investment in these infrastructure layers as essential for economically viable large-scale AI deployments.
