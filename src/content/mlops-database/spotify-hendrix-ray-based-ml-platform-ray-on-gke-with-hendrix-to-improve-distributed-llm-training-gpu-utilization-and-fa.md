---
title: "Ray on GKE with Hendrix to improve distributed LLM training GPU utilization and fair H100 scheduling"
slug: "spotify-hendrix-ray-based-ml-platform-ray-on-gke-with-hendrix-to-improve-distributed-llm-training-gpu-utilization-and-fa"
draft: false
mlopsTags:
  - "compute-management"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "ray"
  - "terraform"
  - "hyperparameter-tuning"
  - "training"
industryTags: "media-entertainment"
company: "Spotify"
companySlug: "spotify"
platformName: "Hendrix + Ray-based ML platform"
contentType: "video"
summary: "Spotify addressed GPU underutilization and over-provisioning challenges in their ML platform by leveraging Ray on Google Kubernetes Engine (GKE) with specialized infrastructure optimizations. The platform, called Hendrix, provides ML practitioners with abstracted access to distributed LLM training capabilities while the infrastructure team implemented GKE features including high-bandwidth networking with NCCL Fast Socket, compact VM placement, GCS Fuse for storage optimization and checkpointing, and Kueue with Dynamic Workload Scheduler for intelligent job queuing and GPU allocation. This approach enabled efficient resource sharing across teams, improved GPU utilization through ephemeral Ray clusters, and provided fair-share access to expensive H100 GPUs while reducing complexity for end users through YAML-based configuration abstractions."
link: "https://www.youtube.com/watch?v=2l1lVBdmNIQ"
year: 2024
seo:
  title: "Spotify: Ray on GKE with Hendrix to improve distributed LLM training GPU utilization and fair H100 scheduling - ZenML MLOps Database"
  description: "Spotify addressed GPU underutilization and over-provisioning challenges in their ML platform by leveraging Ray on Google Kubernetes Engine (GKE) with specialized infrastructure optimizations. The platform, called Hendrix, provides ML practitioners with abstracted access to distributed LLM training capabilities while the infrastructure team implemented GKE features including high-bandwidth networking with NCCL Fast Socket, compact VM placement, GCS Fuse for storage optimization and checkpointing, and Kueue with Dynamic Workload Scheduler for intelligent job queuing and GPU allocation. This approach enabled efficient resource sharing across teams, improved GPU utilization through ephemeral Ray clusters, and provided fair-share access to expensive H100 GPUs while reducing complexity for end users through YAML-based configuration abstractions."
  canonical: "https://www.zenml.io/mlops-database/spotify-hendrix-ray-based-ml-platform-ray-on-gke-with-hendrix-to-improve-distributed-llm-training-gpu-utilization-and-fa"
  ogTitle: "Spotify: Ray on GKE with Hendrix to improve distributed LLM training GPU utilization and fair H100 scheduling - ZenML MLOps Database"
  ogDescription: "Spotify addressed GPU underutilization and over-provisioning challenges in their ML platform by leveraging Ray on Google Kubernetes Engine (GKE) with specialized infrastructure optimizations. The platform, called Hendrix, provides ML practitioners with abstracted access to distributed LLM training capabilities while the infrastructure team implemented GKE features including high-bandwidth networking with NCCL Fast Socket, compact VM placement, GCS Fuse for storage optimization and checkpointing, and Kueue with Dynamic Workload Scheduler for intelligent job queuing and GPU allocation. This approach enabled efficient resource sharing across teams, improved GPU utilization through ephemeral Ray clusters, and provided fair-share access to expensive H100 GPUs while reducing complexity for end users through YAML-based configuration abstractions."
mlops:
  source: "sqlite"
  entryId: 184
  sourceUrl: "https://www.youtube.com/watch?v=2l1lVBdmNIQ"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.617056"
  lastUpdated: "2026-04-14T19:55:49.606834"
---

## Problem Context

Spotify faced critical challenges around GPU resource management as teams increasingly adopted generative AI and large language model use cases. The core problems centered on GPU underutilization and over-provisioning, which translated directly into wasted compute spend on expensive accelerators. Teams frequently encountered GPU scarcity issues where requested resources were unavailable, leading to stockout errors and delayed workloads. The platform team recognized that limited GPU inventory combined with high demand from multiple teams created contention and unfair resource allocation patterns.

The underlying technical challenges included several dimensions. Single GPU instances often lacked sufficient memory or compute capacity for modern LLM training workloads, forcing teams to consider distributed training approaches. Moving to larger or more powerful GPU configurations came with significant cost implications that required careful optimization. The platform needed to ensure that expensive GPU resources like H100s were not sitting idle while also preventing any single team from monopolizing shared resources. Additionally, ML practitioners who wanted to focus on model development were being forced to deal with low-level infrastructure concerns around Kubernetes objects, networking configurations, and resource scheduling.

## Architecture and Design

Spotify's ML platform, called Hendrix, provides an end-to-end framework that supports practitioners through the complete machine learning lifecycle. The architecture spans from feature management through workflows, compute provisioning, and model serving. The compute layer, which is the focus of this implementation, is built entirely on Google Kubernetes Engine and leverages Ray for distributed training orchestration.

The platform introduces a critical abstraction layer called "Hendrix config" that sits between users and the underlying Kubernetes infrastructure. Rather than requiring ML practitioners to write and maintain raw Kubernetes YAML files for Ray cluster custom resources, Hendrix config provides a simplified configuration interface. Users submit Hendrix-specific YAML files that express their compute requirements at a higher level of abstraction. The platform team then translates these configurations into proper Ray cluster custom resource definitions, applies necessary GKE features and optimizations, and provisions the infrastructure automatically.

On the infrastructure side, the platform maintains several key components within GKE clusters. This includes the KubeRay operator for managing Ray cluster lifecycle, Kueue for workload queuing and prioritization, and integration with Google Cloud's Dynamic Workload Scheduler for GPU capacity management. The architecture separates user-facing abstractions (shown in green in their diagrams) from the underlying infrastructure components, creating clear boundaries between what practitioners need to understand versus what the platform team manages.

For job execution, the system supports ephemeral Ray clusters where a Ray job custom resource creates a cluster, executes the workload, and then tears down the cluster automatically. This pattern enables better resource densification and prevents teams from holding onto GPU allocations longer than necessary. Each user namespace contains a local queue managed by Kueue, while a cluster-level queue provides global scheduling coordination across teams.

## Technical Implementation

The infrastructure is built on Google Kubernetes Engine using A3 High machine types with H100 GPUs. These machines provide substantial specifications optimized for distributed AI workloads. Spotify is also evaluating A3 Mega configurations for future deployment. The platform leverages several specific GKE features through relatively simple infrastructure-as-code configurations, typically requiring just a few lines of Terraform to enable powerful capabilities.

For network optimization, the platform utilizes GKE's high-bandwidth interconnect that delivers 1000 Gbps for intra-node communication and 200 Gbps per NIC for inter-node communication, totaling 800 Gbps with four NICs. This high-speed networking is essential for distributed training workloads where multiple GPUs must synchronize gradients and share data continuously. The team enabled NCCL Fast Socket, which is a transport layer plugin for NVIDIA's NCCL (NVIDIA Collective Communications Library) that significantly improves collective communication performance on Google Cloud. Enabling this feature requires only two lines in their Terraform node pool configuration, abstracting the complexity from end users.

The platform also leverages compact placement policies from GKE, which physically co-locate VMs closer together in Google's data centers. This reduces network latency between nodes participating in distributed training jobs, improving overall training performance. Like NCCL Fast Socket, this is enabled through simple Terraform configuration that the platform team maintains.

For storage optimization, Spotify implemented GCS Fuse, which allows Ray clusters to mount Google Cloud Storage buckets as local file systems with POSIX-like semantics. This addresses a critical pain point in long-running training jobs where cluster failures could waste hours or days of GPU compute. With GCS Fuse, teams can checkpoint model states to cloud storage during training. If a Ray cluster goes down, the job can resume from the last checkpoint rather than starting over. The feature also enables caching to local SSDs attached to GPU instances, improving data loading performance for multi-epoch training runs. Users enable GCS Fuse simply by adding a configuration flag to their Hendrix YAML files.

For scheduling and resource allocation, the platform integrates Kueue, an upstream Kubernetes project for workload queuing. Users enable "queue provisioning" in their job configurations by setting a boolean flag. When enabled, the platform creates a Ray job custom resource and submits it to Kueue in the appropriate namespace. Kueue manages both namespace-level local queues and cluster-level global queues, providing governance around job prioritization and resource allocation. The system admits jobs when required resources become available, enabling efficient bin-packing of ephemeral Ray clusters onto available GPU capacity.

Spotify also uses Google Cloud's Dynamic Workload Scheduler (DWS) to handle GPU capacity obtainability challenges. DWS allows the platform to dynamically request GPU resources and have them allocated when available, supporting both "flex mode" where jobs execute as soon as resources are ready (potentially within minutes or hours) and "calendar mode" where jobs are scheduled for specific start times. This integration with Kueue creates a complete solution where workloads queue until DWS provisions the necessary GPU capacity, at which point Kueue admits the job for execution.

The platform team handles all infrastructure configuration through infrastructure-as-code while providing simple YAML-based interfaces to end users. This separation of concerns allows data scientists and ML engineers to focus on model development rather than Kubernetes cluster management.

## Scale and Performance

The platform operates on GKE clusters equipped with A3 High instances featuring H100 GPUs. The networking infrastructure provides impressive bandwidth specifications: intra-node communication achieves 1000 Gbps throughput, while inter-node communication delivers 800 Gbps total (200 Gbps per NIC across four NICs). These numbers are critical for distributed training workloads where gradient synchronization and parameter server communication patterns can easily become bottlenecks.

Performance improvements from specific features have been substantial. GKE's container image pre-loading (secondary boot disk) feature has demonstrated up to 29x improvements in cold start times for container images in the 15-20 GB range. This is particularly important given that base images with PyTorch and CUDA libraries often exceed tens of gigabytes, making traditional container distribution mechanisms slow and inefficient.

GCS Fuse with local SSD caching provides significant data loading performance gains, especially for multi-epoch training where the same data is accessed repeatedly. By caching data to underutilized local SSDs attached to GPU instances, subsequent epochs after the first can achieve much higher throughput than relying solely on network-attached storage.

The combination of Kueue and DWS has improved overall GPU utilization across the platform by reducing idle time and enabling better resource sharing among teams. The ephemeral cluster pattern prevents teams from reserving GPU capacity indefinitely when not actively training, allowing other teams fair access to limited resources.

## Trade-offs and Lessons

A central insight from Spotify's implementation is the critical importance of abstraction layers in ML platforms. The team repeatedly emphasized that "complexity is the enemy" and invested heavily in the Hendrix config abstraction to shield ML practitioners from low-level Kubernetes and infrastructure concerns. While the platform team maintains sophisticated infrastructure code involving Ray custom resources, Kueue configurations, and GKE feature enablement, end users interact only with simplified YAML configurations. This division of responsibilities allows the platform team to leverage advanced capabilities while keeping the user experience approachable.

The choice of ephemeral Ray clusters over long-running persistent clusters represents a significant architectural decision. This pattern enables better resource densification and fairer sharing but requires robust job queuing and quick cluster provisioning to avoid frustrating users with wait times. The combination of Kueue for intelligent scheduling and GKE's container image pre-loading for fast cold starts makes this pattern practical.

GCS Fuse adoption reflects a pragmatic choice to standardize on object storage rather than block storage solutions. The team noted they previously maintained an internal storage solution but migrated to GCS Fuse for its simplicity and GKE integration. They acknowledged being relatively early adopters and that issues may emerge as usage scales, but initial experience has been positive. The POSIX compliance question was raised, indicating some awareness of potential limitations, though no significant problems have materialized yet. They remain open to alternatives like Hyperdisk ML if requirements change.

The network optimization features (NCCL Fast Socket, compact placement, high-bandwidth interconnect) all share a common characteristic: they provide substantial performance benefits through simple configuration changes. The platform team enables these features with minimal Terraform code, and users benefit automatically without needing to understand the underlying mechanisms. This demonstrates the value of managed Kubernetes services like GKE that can integrate deep optimizations into simple APIs.

The GPU obtainability challenge remains an ongoing concern. While Kueue and DWS provide better tools for managing scarce GPU resources, the fundamental supply constraint persists. The platform team made strategic decisions around compute classes and prioritization schemes to allocate resources fairly, but stockout scenarios still occur regularly. The flex mode scheduling helps by allowing jobs to execute whenever capacity becomes available rather than failing immediately, but this requires users to accept uncertain start times.

Spotify currently allocates whole GPUs rather than fractional GPU resources, though fractional allocation is on the roadmap for future consideration. This represents a potential optimization for workloads that don't require full GPU capacity, though it introduces additional complexity around isolation and scheduling.

The partnership between Spotify and Google Cloud illustrates the value of close collaboration between platform teams and infrastructure providers. Spotify benefits from GKE features specifically designed for AI/ML workloads, while Google gains insights from real-world implementations that inform product development. The responsiveness and openness to collaboration that Spotify mentioned suggests this relationship accelerates innovation on both sides.

An important lesson is the speed of evolution in generative AI and LLM spaces. The team noted that "everything happens too quickly" in this domain, requiring platform teams to remain flexible and continuously evaluate new tools and approaches. What works today may need reevaluation as model architectures, training techniques, and infrastructure capabilities advance rapidly.

The platform successfully addresses the original problems of GPU underutilization and over-provisioning by combining multiple strategies: ephemeral clusters prevent resource hoarding, Kueue enables fair sharing and prioritization, DWS improves obtainability, and network/storage optimizations ensure that allocated GPUs deliver maximum performance. The abstraction layer ensures that these sophisticated capabilities remain accessible to practitioners who want to focus on ML problems rather than infrastructure complexity.
