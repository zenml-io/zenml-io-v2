---
title: "Inside Uber: Scaling Model Training with Ray | Ray Summit 2025"
slug: "uber-michelangelo-modernization-ray-on-kubernetes-inside-uber-scaling-model-training-with-ray-ray-summit-2025"
draft: false
mlopsTags:
  - "compute-management"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "horovod"
  - "kubernetes"
  - "ray"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo modernization + Ray on Kubernetes"
contentType: "video"
summary: "Uber's Michelangelo AI platform team addresses the challenge of scaling deep learning model training as models grow beyond single GPU memory constraints. Their solution centers on Ray as a unified distributed training orchestration layer running on Kubernetes, supporting both on-premise and multi-cloud environments. By combining Ray with DeepSpeed Zero for model parallelism, upgrading hardware from RTX 5000 to A100/H100/B200 GPUs with optimized networking (NVLink, RDMA), and implementing framework optimizations like multi-hash embeddings, mixed precision training, and flash attention, they achieved 10x throughput improvements. The platform serves approximately 2,000 Ray pipelines daily (60% GPU-based) across all Uber applications including rides, Eats, fraud detection, and dynamic pricing, with a federated control plane that handles resource scheduling, elastic sharing, and organizational-aware resource allocation across clusters."
link: "https://www.youtube.com/watch?v=xhn6NVJZgp4"
year: 2025
seo:
  title: "Uber: Inside Uber: Scaling Model Training with Ray | Ray Summit 2025 - ZenML MLOps Database"
  description: "Uber's Michelangelo AI platform team addresses the challenge of scaling deep learning model training as models grow beyond single GPU memory constraints. Their solution centers on Ray as a unified distributed training orchestration layer running on Kubernetes, supporting both on-premise and multi-cloud environments. By combining Ray with DeepSpeed Zero for model parallelism, upgrading hardware from RTX 5000 to A100/H100/B200 GPUs with optimized networking (NVLink, RDMA), and implementing framework optimizations like multi-hash embeddings, mixed precision training, and flash attention, they achieved 10x throughput improvements. The platform serves approximately 2,000 Ray pipelines daily (60% GPU-based) across all Uber applications including rides, Eats, fraud detection, and dynamic pricing, with a federated control plane that handles resource scheduling, elastic sharing, and organizational-aware resource allocation across clusters."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-modernization-ray-on-kubernetes-inside-uber-scaling-model-training-with-ray-ray-summit-2025"
  ogTitle: "Uber: Inside Uber: Scaling Model Training with Ray | Ray Summit 2025 - ZenML MLOps Database"
  ogDescription: "Uber's Michelangelo AI platform team addresses the challenge of scaling deep learning model training as models grow beyond single GPU memory constraints. Their solution centers on Ray as a unified distributed training orchestration layer running on Kubernetes, supporting both on-premise and multi-cloud environments. By combining Ray with DeepSpeed Zero for model parallelism, upgrading hardware from RTX 5000 to A100/H100/B200 GPUs with optimized networking (NVLink, RDMA), and implementing framework optimizations like multi-hash embeddings, mixed precision training, and flash attention, they achieved 10x throughput improvements. The platform serves approximately 2,000 Ray pipelines daily (60% GPU-based) across all Uber applications including rides, Eats, fraud detection, and dynamic pricing, with a federated control plane that handles resource scheduling, elastic sharing, and organizational-aware resource allocation across clusters."
mlops:
  source: "sqlite"
  entryId: 179
  sourceUrl: "https://www.youtube.com/watch?v=xhn6NVJZgp4"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.616895"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Uber's Michelangelo platform (also referred to as "Micron Zero") serves as the centralized ML training and serving infrastructure for all of Uber's production applications, including rides, Eats, destination search, ETA estimation, dynamic pricing, fraud detection, personalization, feed ranking, semantic search, promotions, and customer support. As these use cases evolved, the platform team faced several critical challenges that motivated their infrastructure work:

The primary challenge was model size growth outpacing GPU memory capacity. Over the past few years, Uber's core ML models have grown progressively larger, eventually exceeding what could fit in single GPU memory. This forced an evolution from pure data parallelism to model parallelism approaches. The team needed to enable training of models larger than any single GPU could hold while maintaining training efficiency and reliability.

Training times were becoming prohibitively long for large models, sometimes exceeding 24 hours (P99 latency). This created operational challenges around checkpointing, fault tolerance, and resource efficiency. The platform needed to support incremental training approaches to handle these long-running jobs.

Uber's infrastructure spans both on-premise data centers and multiple cloud providers. This hybrid and multi-cloud reality introduced complexity around data movement, resource federation, cluster management, and scheduling. Users shouldn't need to understand where their jobs run or how data gets synchronized across environments.

Resource utilization and allocation presented organizational challenges. Different teams have different budgets and resource pools, but allowing resources to sit idle when teams aren't fully utilizing them would be wasteful at Uber's scale. The platform needed intelligent resource sharing while respecting organizational boundaries and priorities.

Finally, the user base consists primarily of data scientists and ML engineers who shouldn't need to become experts in distributed systems, Kubernetes, Ray internals, or cloud infrastructure. The platform needed to abstract away complexity while still providing powerful capabilities and clear error messages for debugging.

## Architecture & Design

The Michelangelo training platform follows a layered architecture with clear separation of concerns:

At the **data layer**, the platform uses HDFS for on-premise storage and Cloud File Systems (CFS) for cloud environments. Data pipelines generate tables that are consumed by data processing jobs (running on Spark or Ray) which perform feature engineering, table joins, and produce Parquet files. These Parquet files are then distributed to different cloud vendors and used as input for training jobs. The team uses Ray Data for data loading, which provides compatibility across different cloud storage systems (S3, GCS) through specialized plugins.

The **compute layer** is built entirely on Kubernetes, providing a consistent abstraction across on-premise and cloud environments. This Kubernetes foundation enables the multi-cloud federation strategy.

The **distributed training layer** centers on Ray as the core orchestration module. Ray sits between the compute infrastructure and the ML frameworks, providing unified distributed execution. On top of Ray, the platform supports multiple deep learning frameworks including PyTorch and TensorFlow, along with distributed training accelerators like DeepSpeed, Horovod, PyTorch DDP (Distributed Data Parallel), and PyTorch FSDP (Fully Sharded Data Parallel). For GPU workloads, they leverage CUDA.

The **control plane architecture** follows a Kubernetes-native pattern with custom resource definitions (CRDs). The platform consists of two main services: an API server that exposes gRPC APIs for client consumption, and a controller manager that handles reconciliation logic. All ML artifacts including pipelines, jobs, clusters, and resource pools are modeled as CRDs, allowing native Kubernetes API usage.

The control plane includes several specialized controllers:

The **job controller** manages the complete lifecycle of training jobs, including submission, monitoring, error handling, retries, and transparent job migration if clusters fail. It watches job CRDs and coordinates with the scheduler.

The **scheduler** performs intelligent placement decisions, finding suitable clusters based on resource requirements, GPU types, data locality, and organizational policies. It maintains a near-realtime view of cluster health and available capacity provided by the cluster controller.

The **cluster controller** continuously monitors the health of underlying clusters across data centers and cloud providers, tracking maintenance windows, upgrades, and availability. This health snapshot feeds into scheduling decisions.

Resource pools are organized hierarchically matching Uber's organizational structure, with each pool potentially owned by different teams. The scheduler is organization-aware and respects pool ownership while enabling elastic resource sharing when pools are underutilized.

For job execution, the platform uses the KubeRay operator as a "local operator" that spins up actual Ray pods within clusters, while Uber's custom "global operator" handles federation, discovery, and lifecycle management from the user perspective.

The platform supports dynamic port allocation for multi-tenancy, implementing a custom discovery protocol where the Ray operator tracks which ports come up and exposes this information back on the CRD for client consumption. This same mechanism enables exposing services like Jupyter notebooks running inside Ray clusters directly to users.

## Technical Implementation

The technical stack has evolved significantly over the past two years, particularly for core ML models as opposed to the LLM fine-tuning work they shared previously.

**Distributed Training Evolution:**

The platform evolved from pure data parallelism to model parallelism using DeepSpeed Zero (Zero Redundancy Optimizer). DeepSpeed Zero shards model parameters, gradients, and optimizer states across GPUs, placing only a portion on each GPU. This eliminates memory redundancy and allows the cluster to train models much larger than single GPU memory. The implementation is similar to PyTorch FSDP, which uses the same underlying approach. This transition was essential as models grew beyond what RTX 5000-based GPUs (similar to L4) could handle.

**Hardware Upgrades:**

The compute infrastructure underwent significant hardware evolution. Legacy RTX 5000-based GPUs were upgraded to A100 and H100 GPUs, which unlocked advanced features like low precision training and substantially improved overall efficiency. In 2025, the team onboarded B200 GPUs and enabled RDMA (Remote Direct Memory Access), providing direct GPU-to-GPU communication across nodes for improved cross-node bandwidth.

Job provisioning strategy was optimized to pack instances within single hosts before scaling out to multiple hosts. This matters because intra-host GPU communication uses NVLink (very high bandwidth), while cross-host communication uses networking (much slower). This packing strategy yielded measurable improvements.

**Framework-Level Optimizations:**

The team implemented three major framework optimizations to support larger models:

Multi-hash embeddings reduce embedding lookup time without compromising model accuracy. This addresses the challenge of large embedding layers in recommendation and ranking models.

Mixed precision training puts most computations into lower precision tensors (like FP16 or BF16) to accelerate training speed while maintaining numerical stability. Not everything runs in low precision; the mixed approach balances speed with stability.

Flash attention implements kernel fusion optimization. GPU cards have small but extremely fast on-chip memory (SRAM) and larger but slower high-bandwidth memory (HBM). Normally tensors are copied from HBM to SRAM for computation, then copied back to HBM. Flash attention fuses all attention operations into a single kernel, eliminating repeated memory copies and significantly improving efficiency.

The combination of hardware upgrades and framework optimizations delivered **10x throughput improvement** over the baseline RTX 5000 hardware.

**Multi-Cloud Data Movement:**

The platform implements a global routing strategy that checks data synchronization status between on-premise data centers and cloud vendors before scheduling GPU jobs. An HDFS abstraction layer works across both environments, and APIs handle data copying when needed. For example, if data exists on-premise but the job needs to run in the cloud, the system calls synchronization APIs to copy data before launching the job.

**Resource Management Implementation:**

Resource pools are modeled as CRDs and monitor all pod events to track both demand (jobs waiting) and current usage. Based on this, the system calculates "entitlement" for each pool. When a pool has many waiting jobs, it gradually receives more entitlement to accept borrowed capacity from underutilized pools. A custom admission controller enforces these entitlement policies.

This elastic resource sharing system was originally built for Uber's previous Peloton scheduler and is already open source. When migrating to Kubernetes, the team ported this dynamic scheduling capability since Kubernetes doesn't natively provide it.

**Lifecycle Management:**

The platform implements soft deletes for job history, never hard-deleting CRDs. When jobs complete, they're marked as immutable and moved to external storage, remaining indexed forever for auditing, debugging, and compliance. A custom termination protocol allows clients to initiate job termination, with the controller propagating termination signals down to running pods and providing status back to the client.

**Error Handling and Observability:**

The job controller actively monitors lifecycle events and detects common errors like scheduling failures, container startup issues, and out-of-memory (OOM) errors by examining container exit codes. These are propagated back to users with clear messages, enabling fast iteration without requiring users to dig through Kubernetes logs or Ray internals.

The platform integrates with third-party monitoring vendors for metrics collection, though the team didn't specify which vendors they use.

## Scale & Performance

The platform operates at substantial scale serving all of Uber's ML training needs:

Approximately **2,000 Ray pipelines run per day**, with **60% being GPU-related workloads** and the remainder being CPU-based jobs (likely data processing with Ray on CPUs).

For GPU jobs specifically:
- **Average job duration: ~3 hours**
- **P90 duration: ~5 hours**  
- **P99 duration: more than one day**

These long tail latencies at P99 highlight why incremental training and robust checkpointing became critical requirements.

The throughput improvement is quantified: the combination of hardware upgrades (RTX 5000 → A100/H100/B200) plus software optimizations (DeepSpeed, mixed precision, flash attention, multi-hash embeddings) yielded **10x throughput gains** over the baseline.

The platform serves diverse use cases across Uber including latency-sensitive applications like real-time ETA estimation and dynamic pricing, as well as batch workloads like fraud detection and personalization.

Infrastructure spans on-premise data centers plus multiple cloud providers (not specified which ones, but references to S3 and GCS suggest AWS and GCP at minimum).

## Trade-offs & Lessons Learned

**Scaling Laws Drive Vertical Integration:**

The team's key learning is that scaling laws highlight the need for deep vertical optimization across the entire stack—model architecture, framework optimizations, hardware choices, and infrastructure. Performance gains don't come from any single layer but from co-optimization across all layers. This requires platform teams to work closely with hardware vendors, framework developers, and model developers rather than treating these as separate concerns.

**Abstraction vs. Control:**

The platform makes a deliberate choice to abstract complexity from end users (data scientists and ML engineers) while still providing power users access to lower-level controls when needed. The CRD-based architecture and gRPC APIs provide programmatic access for those who need it, while CLI and notebook interfaces serve casual users. This balance appears to work well for Uber's diverse user base.

**Federation Complexity:**

Multi-cloud federation introduces significant complexity around data synchronization, cluster management, secret management, and resource scheduling. However, Ray and Kubernetes provide sufficient abstraction that the job controller doesn't need to deeply integrate with each cloud vendor's proprietary APIs. The team explicitly notes keeping the tech stack simple by relying on Ray and Kubernetes compatibility across clouds.

**Resource Efficiency at Scale:**

At Uber's scale, resource utilization efficiency is paramount. The elastic resource sharing system addresses the challenge of maintaining high utilization while respecting organizational boundaries. This appears to be a solved problem for the team, with the open-source Peloton scheduler work being successfully ported to the Kubernetes world.

**Hardware Topology Matters:**

The realization that packing jobs within hosts (using NVLink) before scaling out (using network) had measurable impact underscores that hardware topology awareness remains important even with high-level abstractions like Ray. The platform's scheduling strategy explicitly considers this.

**Preemption vs. Fault Tolerance:**

The platform handles preemption explicitly through policies (e.g., production jobs preempt dev jobs) but acknowledged they don't yet fully leverage Ray's built-in fault tolerance and mid-job checkpointing capabilities. This is planned for future work, suggesting the current approach prioritizes scheduling-level preemption over framework-level resilience.

**RDMA and Advanced Networking:**

The investment in RDMA for B200 GPUs shows the team continues pushing on cross-node communication bottlenecks. This aligns with the earlier insight about hardware topology—as model parallelism becomes necessary, cross-GPU communication bandwidth becomes critical.

**Immutable History for Compliance:**

The decision to implement soft deletes and maintain immutable job history reflects the operational maturity and compliance requirements of running ML at Uber's scale. This isn't a technical ML requirement but an organizational and regulatory one that platform teams must address.

**Client Library Open Source:**

The team mentioned their Michelangelo client library is being open sourced with early access for adopters. This suggests Uber sees value in ecosystem building and potentially standardizing some of their patterns, though details weren't provided in the talk.

The overall impression is of a mature, battle-tested platform that has evolved through real production pain points rather than being over-architected upfront. The team's willingness to port proven designs (like the Peloton scheduler) while adopting industry-standard tools (Ray, Kubernetes) shows pragmatic engineering judgment.
