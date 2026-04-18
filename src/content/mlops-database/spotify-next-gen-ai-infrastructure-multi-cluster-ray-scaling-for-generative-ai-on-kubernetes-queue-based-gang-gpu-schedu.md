---
title: "Multi-cluster Ray scaling for generative AI on Kubernetes: queue-based gang GPU scheduling and Flyte orchestration in Hendrix"
slug: "spotify-next-gen-ai-infrastructure-multi-cluster-ray-scaling-for-generative-ai-on-kubernetes-queue-based-gang-gpu-schedu"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "terraform"
  - "deployment"
  - "hyperparameter-tuning"
  - "serving"
  - "training"
industryTags: "tech"
company: "Spotify"
companySlug: "spotify"
platformName: "Next-Gen AI Infrastructure"
contentType: "video"
summary: "Spotify evolved its ML platform Hendrix to support rapidly growing generative AI workloads by scaling from a single Kubernetes cluster to a multi-cluster architecture built on Ray and Google Kubernetes Engine. Starting from 80 teams and 100 Ray clusters per week in 2023, the platform grew 10x to serve 120 teams with 1,400 Ray clusters weekly across 4,500 nodes by 2024. The team addressed this explosive growth through infrastructure improvements including multi-cluster networking, queue-based gang scheduling for GPU workloads, and a custom Kubernetes webhook for platform logic, while simultaneously reducing user complexity through high-level YAML abstractions, integration with Spotify's Backstage developer portal, and seamless Flyte workflow orchestration."
link: "https://www.youtube.com/watch?v=4kw3EYBz1Gs"
year: 2024
seo:
  title: "Spotify: Multi-cluster Ray scaling for generative AI on Kubernetes: queue-based gang GPU scheduling and Flyte orchestration in Hendrix - ZenML MLOps Database"
  description: "Spotify evolved its ML platform Hendrix to support rapidly growing generative AI workloads by scaling from a single Kubernetes cluster to a multi-cluster architecture built on Ray and Google Kubernetes Engine. Starting from 80 teams and 100 Ray clusters per week in 2023, the platform grew 10x to serve 120 teams with 1,400 Ray clusters weekly across 4,500 nodes by 2024. The team addressed this explosive growth through infrastructure improvements including multi-cluster networking, queue-based gang scheduling for GPU workloads, and a custom Kubernetes webhook for platform logic, while simultaneously reducing user complexity through high-level YAML abstractions, integration with Spotify's Backstage developer portal, and seamless Flyte workflow orchestration."
  canonical: "https://www.zenml.io/mlops-database/spotify-next-gen-ai-infrastructure-multi-cluster-ray-scaling-for-generative-ai-on-kubernetes-queue-based-gang-gpu-schedu"
  ogTitle: "Spotify: Multi-cluster Ray scaling for generative AI on Kubernetes: queue-based gang GPU scheduling and Flyte orchestration in Hendrix - ZenML MLOps Database"
  ogDescription: "Spotify evolved its ML platform Hendrix to support rapidly growing generative AI workloads by scaling from a single Kubernetes cluster to a multi-cluster architecture built on Ray and Google Kubernetes Engine. Starting from 80 teams and 100 Ray clusters per week in 2023, the platform grew 10x to serve 120 teams with 1,400 Ray clusters weekly across 4,500 nodes by 2024. The team addressed this explosive growth through infrastructure improvements including multi-cluster networking, queue-based gang scheduling for GPU workloads, and a custom Kubernetes webhook for platform logic, while simultaneously reducing user complexity through high-level YAML abstractions, integration with Spotify's Backstage developer portal, and seamless Flyte workflow orchestration."
mlops:
  source: "sqlite"
  entryId: 224
  sourceUrl: "https://www.youtube.com/watch?v=4kw3EYBz1Gs"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.619140"
  lastUpdated: "2026-04-14T19:56:07.019025"
---

## Problem Context

Spotify's ML platform team faced a convergence of critical challenges as generative AI adoption accelerated across the organization. The platform Hendrix, originally built in 2018 on Kubeflow and GCP to support TensorFlow workloads, had evolved into a 2.0 version leveraging Ray on Google Kubernetes Engine by 2022. However, the emergence of generative AI use cases created unprecedented demand that strained the existing infrastructure.

The primary pain points included running out of IP addresses in their Kubernetes subnets to provision new Ray clusters, leading to clusters hanging indefinitely or producing cryptic "deadline exceeded" errors. Users faced slow network bandwidth as Ray clusters spanned hundreds or thousands of nodes with data traveling further between physically distant machines. The platform lacked efficient resource scheduling for expensive GPU hardware, resulting in partially provisioned clusters that held resources without using them effectively. Additionally, the team struggled with maintaining platform-specific business logic in client-side Python SDKs, forcing users to constantly upgrade their environments and deal with transient dependency issues.

From a broader perspective, the platform needed to support heterogeneous workloads with different resource requirements, provide storage capabilities for long-running distributed training jobs, enable LLM deployments with dedicated resources, and maintain fair resource sharing across multiple tenants. All of these challenges had to be solved while reducing complexity for end users and maintaining velocity for platform engineers.

## Architecture & Design

Hendrix operates as centrally managed, multi-tenant infrastructure where users interact primarily through a Python SDK and CLI. The core architecture consists of several layers working in concert to provide a seamless Ray-based ML platform.

At the foundation, the platform runs on Google Kubernetes Engine with a custom resource-based workflow. Users submit Kubernetes custom resource requests for Ray clusters through the Python SDK or CLI. These requests pass through a platform-managed mutating webhook that injects platform-specific logic and policies before forwarding to the KubeRay operator deployed from upstream. The KubeRay operator then creates and manages the actual Ray clusters.

The infrastructure evolved from a single 500-node Kubernetes cluster to three separate clusters serving distinct purposes. The original cluster handles interactive workloads and Jupyter notebook experimentation. A larger 4,000-node batch production cluster handles production Ray job submissions. A third test cluster enables validation of platform changes including node upgrades, KubeRay operator upgrades, and custom webhook modifications before rolling them to production users.

The multi-cluster architecture uses the SDK as a gateway, intelligently routing requests based on workload type. Interactive Ray cluster requests for experimentation default to the original cluster, while Ray job submissions route to the larger batch cluster. This separation provides isolation between workload types and optimizes resource utilization patterns.

Above the infrastructure layer sits the Hendrix config layer, which provides high-level abstractions over Ray custom resources. Users maintain YAML configuration files using these abstractions rather than directly manipulating Ray cluster and Ray job custom resources. The config layer performs validation and produces complete, valid lower-level custom resources that get applied to the GKE infrastructure.

For resource scheduling, the platform integrates Kueue (spelled with a K) to implement gang scheduling for batch workloads. Local queues map to individual namespaces for each team, feeding into a global cluster queue that performs all-or-nothing resource allocation. This prevents the problem of partially provisioned clusters holding resources without being able to execute work.

Storage integration leverages GCS Fuse (Google Cloud Storage Fuse) to mount GCS buckets as local filesystems within Ray clusters. This enables distributed model checkpointing for long-running training jobs and provides reliability by persisting intermediate results.

The platform integrates with Spotify's broader ML ecosystem including MLflow for experiment tracking and multiple Google Cloud storage flavors. For production workflows, the platform connects to Flyte workflow orchestration through an internal plugin that enables Flyte tasks running on a separate data GKE cluster to create Ray jobs on the ML GKE cluster.

Entry into the Hendrix platform occurs through Spotify's Backstage software catalog, an open-source developer portal. Users create a Hendrix ML component in Backstage which provisions the SDK, required libraries, and necessary infrastructure for both prototyping and production stages, bringing golden path best practices into a single consolidated interface.

## Technical Implementation

The platform implementation spans multiple technology layers with specific tooling choices throughout the stack. The entire infrastructure is managed declaratively using Terraform, which enabled the team to provision the second 4,000-node cluster by simply copying and updating configuration resources rather than manual provisioning.

Network optimization improvements were implemented in collaboration with Google support teams, all configured through Terraform. These include compact placement policies to colocate nodes in closer physical proximity, Google Virtual NIC (gVNIC) for improved I/O performance on virtual machines, and TCPx (formerly NIC Fast Socket) which provides optimization over NVIDIA's common low-level networking libraries like NCCL. These improvements directly address bandwidth bottlenecks in distributed training and data processing workloads spanning many nodes.

The custom Kubernetes mutating admission webhook was built using Kubebuilder, which provided scaffolding and boilerplate code. The webhook intercepts Ray cluster and Ray job custom resource requests, injecting platform-specific annotations, node pool assignments, hardware accelerator restrictions by namespace, and other policies before passing requests to the KubeRay operator. This architecture shift moved business logic from the client-side SDK to server-side enforcement, eliminating the need for users to constantly upgrade their local environments.

Queue-based scheduling uses Kueue integrated with Google's Dynamic Workload Scheduler (DWS) for GPU provisioning. The integration requires only adding specific annotations to Ray job custom resources, which the config layer handles automatically when users enable queue provisioning in their YAML configuration. Kueue handles the queuing and admission logic while DWS manages the actual GPU resource obtainability and provisioning.

The sidecar worker group pattern for LLM deployments creates Ray worker groups where the main container receives minimal resources while a sidecar container gets the bulk of requested resources. This provides resource isolation for dedicated LLM serving workloads within the multi-tenant environment.

Storage integration through GCS Fuse allows multiple teams to use mounted GCS buckets for distributed model checkpointing. Both head and worker nodes in a Ray cluster can access the mounted bucket as if it were local filesystem storage, simplifying checkpoint coordination in distributed training.

The Flyte integration uses an internal Spotify plugin (though open-source alternatives exist) that creates Ray job manifests and submits them to the ML GKE cluster from workflow tasks running in the separate data GKE cluster. Users decorate Flyte task functions with Ray job configurations, and the Flyte operator handles the lifecycle of creating the Ray cluster, executing the task, and cleaning up resources.

Platform observability centers on three Service Level Objectives (SLOs): percentage of Kubernetes clusters available for Ray cluster workloads (monitoring node capacity exhaustion), percentage of Ray clusters in ready state within a time window (detecting platform regressions), and time-to-ready for Ray clusters (planned for operationalization based on a contribution the team made to KubeRay earlier in 2024).

## Scale & Performance

The growth trajectory of Hendrix demonstrates the explosive adoption of Ray-based ML workloads at Spotify. Between Ray Summit 2023 and Ray Summit 2024, the platform grew from serving 80 teams to approximately 120 teams, representing a 50% increase in organizational adoption.

The most dramatic metric is Ray cluster volume, which increased from 100 Ray clusters per week to 1,400 Ray clusters per week—a 14x or approximately 10x order of magnitude increase in just one year. This volume increase directly precipitated the infrastructure scaling challenges the team addressed.

The Kubernetes footprint expanded from a single cluster with 500 nodes to three clusters totaling approximately 4,500 nodes. The primary batch production cluster alone provisions 4,000 nodes to handle Ray job submissions. This represents a 9x increase in raw node capacity, closely tracking the cluster volume growth.

The original cluster exhausted its IP address space, running out of node IPs to provision additional Ray clusters. This subnet exhaustion manifested as Ray clusters hanging indefinitely or producing deadline exceeded errors, directly impacting user experience and blocking work.

Network bandwidth improvements from compact placement, gVNIC, and TCPx provide measurable performance gains for distributed workloads, though specific throughput numbers were not disclosed. The optimizations specifically target scenarios where Ray clusters span hundreds or thousands of nodes, reducing data transfer latency between physically distant machines.

Gang scheduling through Kueue eliminates the cost of partially provisioned clusters holding GPU resources without being able to execute. Previously, requesting four GPUs might result in only two being allocated, leaving those two GPUs idle while waiting for the remaining resources. Gang scheduling ensures all-or-nothing allocation, improving GPU utilization efficiency across the multi-tenant environment.

The test cluster enables validation of changes before production rollout, preventing outages that would impact the 120 teams and 1,400+ weekly Ray clusters. The platform team continuously performs node upgrades, KubeRay operator version upgrades, and custom webhook modifications that all require pre-production testing.

Cost optimization efforts focused on logging represented a significant expense at this scale. Making logging optional or highly configurable for Ray clusters dramatically reduced costs given the volume of clusters being created and destroyed weekly.

## Trade-offs & Lessons

The Hendrix team's year of rapid scaling yielded several key insights for ML platform practitioners building on Ray and Kubernetes.

The decision to move business logic from client-side SDK to server-side webhook represented a significant architectural shift with clear benefits. While client-side logic is easier to develop initially, it creates ongoing toil for users who must constantly upgrade their environments and deal with transient dependency failures. Server-side enforcement through webhooks enables platform engineers to iterate independently without imposing upgrade burden on users. The Kubebuilder framework made this transition tractable by providing webhook scaffolding.

The multi-cluster architecture with intelligent routing through the SDK provided a pragmatic solution to IP exhaustion without requiring users to understand or manage cluster selection. The tradeoff is maintaining multiple Kubernetes clusters with their own operational overhead, but the separation of interactive versus batch workloads enables different optimization strategies and isolation patterns for each use case. Managing everything declaratively with Terraform made this scaling approach viable—the team could duplicate infrastructure configuration rather than manually provisioning new clusters.

The abstraction strategy through the Hendrix config layer exemplifies the principle of meeting users where they are in their ML journey. Power users can interact with lower-level Ray custom resources directly, but most users benefit from simpler YAML abstractions that hide infrastructure complexity. The config layer performs validation and generates complete custom resources, preventing common misconfigurations while maintaining expressiveness. This design proved extensible—the team added multiple worker groups, sidecar patterns, GCS Fuse integration, and Kueue provisioning without changing the fundamental abstraction model.

Gang scheduling through Kueue elegantly solved the GPU allocation problem by treating it as a queueing problem rather than inventing custom scheduling logic. The integration with Ray jobs through simple annotations kept the user-facing complexity minimal while providing powerful all-or-nothing resource guarantees. This approach acknowledges that expensive, limited hardware accelerators benefit from different scheduling semantics than general compute resources.

The integration with Spotify's Backstage developer portal demonstrates the importance of entry points and golden paths in platform adoption. Rather than requiring users to discover and assemble multiple tools, the Backstage component provides a single starting point that provisions everything needed for the ML journey. This consolidation addresses fragmentation in the broader ML tooling ecosystem.

The SLO approach to platform reliability provides concrete metrics for detecting regressions as the platform evolves. Monitoring cluster availability, Ray cluster ready state percentages, and time-to-ready creates objective measures that prevent degraded user experience during rapid iteration. The contribution to KubeRay to expose time-to-ready metrics demonstrates the team's commitment to measuring what matters rather than relying on anecdotal feedback.

The Flyte integration solved the organizational challenge of data workflows running on separate infrastructure from ML workloads. Rather than forcing teams to consolidate onto a single cluster type, the plugin architecture allows tasks in data pipelines to seamlessly create Ray jobs on ML-optimized infrastructure. This acknowledges real-world organizational boundaries while maintaining workflow cohesion.

Cost management emerged as a significant concern at scale, with logging representing substantial expense. Making logging configurable rather than mandatory for all Ray clusters reduced costs materially. Platform teams should consider the multiplicative cost impact of per-cluster configurations when operating at hundreds or thousands of clusters weekly.

The emphasis on reducing complexity appears repeatedly throughout the presentation—described as "complexity is the enemy in this era" from the Ray Summit keynote. Every feature addition considered how to minimize user-facing complexity even as underlying infrastructure grew more sophisticated. This design philosophy distinguishes platforms that scale adoption from those that remain tools for experts only.

Network optimizations through compact placement, gVNIC, and TCPx required collaboration with Google support but delivered measurable improvements for distributed workloads. Platform teams should not hesitate to engage with cloud provider support teams for infrastructure-level optimizations that cannot be achieved through application-layer changes alone.

The experimental sidecar pattern for LLM deployments acknowledges that not every feature needs full validation before release. Teams requested dedicated resources for LLM serving, and the platform team provided an experimental solution using sidecar containers for resource isolation. This approach enables innovation while managing risk through explicit experimental designation.

Overall, the Hendrix evolution demonstrates that ML platforms can maintain velocity and user experience while scaling infrastructure by orders of magnitude. The key lies in strategic complexity management—sophisticated infrastructure hidden behind simple interfaces, server-side enforcement of policies, declarative infrastructure management, and integration with existing developer workflows. Platform maintainability and user velocity need not be trade-offs when architecture intentionally separates concerns and provides the right abstractions at each layer.
