---
title: "Ray at Scale: Apple's Approach to Elastic GPU Management | Ray Summit 2025"
slug: "apple-elastic-gpu-management-talk-ray-at-scale-apples-approach-to-elastic-gpu-management-ray-summit-2025"
draft: false
mlopsTags:
  - "compute-management"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "kubeflow"
  - "kubernetes"
  - "ray"
  - "deployment"
  - "serving"
  - "training"
industryTags: "tech"
company: "Apple"
companySlug: "apple"
platformName: "elastic GPU management (talk)"
contentType: "video"
summary: "Apple presented their approach to elastic GPU management for Ray-based ML workloads running on Kubernetes, addressing challenges of resource fragmentation, low GPU utilization, and multi-tenant quota management across diverse teams. Their solution integrates Ray with Apache Yunicorn, a Kubernetes resource scheduler, to provide sophisticated queue management with guaranteed and maximum capacity quotas, resource preemption, gang scheduling, and bin packing mechanisms. By implementing multi-level scheduling, maintaining shared GPU pools with elastic queues, and enabling workload preemption to reclaim over-allocated resources, Apple achieved high GPU utilization while maintaining fairness across organizational teams and supporting diverse workload patterns including batch inference, model training, real-time serving, and interactive notebooks."
link: "https://www.youtube.com/watch?v=ZCRZQVt-r3g"
year: 2025
seo:
  title: "Apple: Ray at Scale: Apple's Approach to Elastic GPU Management | Ray Summit 2025 - ZenML MLOps Database"
  description: "Apple presented their approach to elastic GPU management for Ray-based ML workloads running on Kubernetes, addressing challenges of resource fragmentation, low GPU utilization, and multi-tenant quota management across diverse teams. Their solution integrates Ray with Apache Yunicorn, a Kubernetes resource scheduler, to provide sophisticated queue management with guaranteed and maximum capacity quotas, resource preemption, gang scheduling, and bin packing mechanisms. By implementing multi-level scheduling, maintaining shared GPU pools with elastic queues, and enabling workload preemption to reclaim over-allocated resources, Apple achieved high GPU utilization while maintaining fairness across organizational teams and supporting diverse workload patterns including batch inference, model training, real-time serving, and interactive notebooks."
  canonical: "https://www.zenml.io/mlops-database/apple-elastic-gpu-management-talk-ray-at-scale-apples-approach-to-elastic-gpu-management-ray-summit-2025"
  ogTitle: "Apple: Ray at Scale: Apple's Approach to Elastic GPU Management | Ray Summit 2025 - ZenML MLOps Database"
  ogDescription: "Apple presented their approach to elastic GPU management for Ray-based ML workloads running on Kubernetes, addressing challenges of resource fragmentation, low GPU utilization, and multi-tenant quota management across diverse teams. Their solution integrates Ray with Apache Yunicorn, a Kubernetes resource scheduler, to provide sophisticated queue management with guaranteed and maximum capacity quotas, resource preemption, gang scheduling, and bin packing mechanisms. By implementing multi-level scheduling, maintaining shared GPU pools with elastic queues, and enabling workload preemption to reclaim over-allocated resources, Apple achieved high GPU utilization while maintaining fairness across organizational teams and supporting diverse workload patterns including batch inference, model training, real-time serving, and interactive notebooks."
mlops:
  source: "sqlite"
  entryId: 197
  sourceUrl: "https://www.youtube.com/watch?v=ZCRZQVt-r3g"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.617683"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Apple's Ray platform serves diverse ML workloads across multiple organizational teams, creating significant challenges in GPU resource management and multi-tenancy. The engineering team encountered several critical pain points that motivated their infrastructure investments.

Resource fragmentation emerged as a severe problem where cluster-wide GPU utilization appeared reasonable but incoming workloads couldn't obtain resources because available GPUs were scattered across nodes without sufficient contiguous capacity for new requests. This resulted in wasted GPU hours despite apparent availability.

GPU utilization versus user experience presented a fundamental tension. With high demand for expensive GPU resources, infrastructure teams needed to maximize utilization, but ML practitioners expected fast job startup times and guaranteed capacity for production workloads. Teams were complaining about insufficient GPU availability while at the same time GPUs sat idle due to fragmentation and poor allocation.

Resource sizing complexity overwhelmed users who needed to select from numerous infrastructure options including node types with varying GPU card counts, GPU memory configurations, SRAM versus DRAM choices, intra-GPU and inter-GPU connectivity characteristics, network congestion across geographic regions, and overall regional capacity. These decisions were far too granular for ML practitioners focused on model development rather than infrastructure optimization.

Multi-tenant quota management proved extremely difficult using native Kubernetes mechanisms. With diverse GPU instance types and multiple organizational teams competing for limited resources, traditional namespace-based isolation created its own problems. The team initially tried node-specific queues and node-specific clusters to give users better control over instance selection, but this approach backfired spectacularly, resulting in even more fragmentation and lower overall utilization than before.

Autoscaling challenges multiplied as workloads scaled. While Ray provides native autoscaling support for both batch and real-time workloads, several operational issues emerged. Very large workloads raised questions about whether to remain within single geographic regions or span multiple regions, with the latter introducing data transfer costs. Many stateful workloads could tolerate upscaling but failed when downscaled, leading teams to disable downscaling entirely and accept lower utilization. Fast autoscaling during upscaling exposed infrastructure readiness issues around certificate management, service initialization, and IP address availability.

## Architecture & Design

Apple's Ray platform architecture centers on a Kubernetes-based infrastructure integrating Ray with Apache Yunicorn for sophisticated resource scheduling and multi-tenancy support. The platform supports three primary user interaction patterns that accommodate different stages of ML workflow development.

Interactive notebooks enable early iteration where practitioners can experiment as if working on their laptop, using Ray's unified computing API that seamlessly transitions from local development to data center scale. This interactive mode allows quick experimentation before committing to full-scale workloads.

Mature SDKs provide programmatic job submission and model deployment capabilities for production workloads. These APIs maintain consistency with the notebook experience, allowing users to migrate workloads with minimal code changes.

Portal-based interfaces support UX-driven model deployment and comprehensive observability, which the team emphasizes as critically important for productionized workloads. These portals provide visibility into resource utilization, job status, and system health across the platform.

The core scheduling architecture implements multi-level scheduling where node-level scheduling handles multiple instance types and can fall back on different resource configurations when primary requests cannot be satisfied. This approach replaced their failed experiment with node-specific queues, instead providing flexibility while abstracting complexity from users through standard compute options conceptualized as small, medium, and large tiers. While not optimizing every individual case, this approach successfully covers approximately 80% of use cases.

Ray's autoscaler component continuously monitors worker metrics and patches Kubernetes Custom Resource Definitions (CRDs) based on observed demand. Apache Yunicorn watches these CRD modifications and queues up pods and workloads based on additional resource needs detected by the autoscaler. During downscaling, Yunicorn reconciles resources and bin packs workloads together to maximize node utilization.

The integration between Ray and Yunicorn operates through simple label-based configuration. Users specify an application ID and queue name as Kubernetes labels on their Ray cluster or job definition. The Kuberay operator creates a Yunicorn job along with the Ray cluster head and workers. Yunicorn recognizes all workers belonging to the application through these labels and applies queue-level policies, quotas, and scheduling constraints.

Yunicorn's queue hierarchy maps to organizational structure, allowing management at different layers from large business units down to individual teams or users. Each queue defines guaranteed capacity (resources always available even during peak contention) and maximum capacity (the limit when other teams' resources are idle). This dual-capacity model enables elastic resource sharing across a large shared GPU pool while providing predictable guaranteed allocations.

Resource fairness policies operate across queues to ensure no team is completely starved during peak hours. The bin packing mechanism operates in two phases: scheduling-phase bin packing concentrates pod placement to increase node density before allocating to additional nodes, and post-scheduling bin packing (implemented using Karpenter) periodically scans pod distributions and consolidates workloads to free nodes for scaling down or to create contiguous capacity for large GPU requests.

## Technical Implementation

The platform runs on Kubernetes with Ray as the compute framework and Apache Yunicorn as the resource scheduler. The Yunicorn integration with Kuberay has been contributed upstream to the community and will be available in an upcoming Kuberay release, making these capabilities accessible to the broader Ray ecosystem.

Enabling Yunicorn for Ray clusters requires setting a batch scheduler flag to specify "yunicorn" in the configuration, assuming Yunicorn is already installed in the cluster. Per-cluster customization uses Kubernetes labels to define the application ID and target queue name.

Yunicorn queue configuration defines multiple queues with guaranteed and maximum GPU quotas along with additional features. Queues can be configured as either dynamic or static based on operational needs. Access control lists (ACLs) restrict queue access to appropriate teams. Queue hierarchy allows nested organizational structures for more sophisticated resource management.

The team explored using modified GPU drivers to expose different GPU types as distinct Kubernetes resource types rather than treating all GPUs as a single homogeneous resource. This capability enables differential management of expensive high-end GPU instances versus more economical options, allowing administrators to steer teams toward cost-effective resources when high-end instances aren't necessary.

Gang scheduling, a critical feature for distributed training workloads, is enabled per-application through a simple label configuration setting "ray.io/gang-scheduling-enabled: true" on the custom resource. This instructs Yunicorn to reserve all required resources before scheduling any pods, preventing partial allocation scenarios where some workers start while others remain pending, which would waste resources without making progress.

Observability infrastructure tracks guaranteed GPU quota, maximum GPU quota, and current utilization per queue through metrics dashboards. These visualizations help administrators understand GPU distribution patterns across queues and make informed decisions about reshuffling allocations as organizational priorities shift. The metrics are particularly valuable for tracking different GPU types separately when using the modified driver approach.

Checkpointing infrastructure required standardization through platform-provided APIs to make autoscaling with downscaling viable for stateful workloads. By offering consistent checkpointing interfaces across use cases, the platform enables workloads to tolerate worker eviction during resource rebalancing.

Headroom management maintains a pool of pre-initialized nodes to address fast autoscaling challenges. When workloads rapidly scale up, these ready nodes can immediately accept pods without waiting for node initialization, certificate provisioning, or network configuration. This approach trades some idle capacity for improved autoscaling responsiveness and reliability.

## Scale & Performance

The platform manages multiple Ray clusters across different queues serving numerous organizational teams within Apple. In one demonstrated scenario, the system managed five queues where a single queue initially consumed over 400 GPUs when other queues were idle. As additional queues submitted workloads and resources became constrained, Yunicorn's preemption mechanism reallocated GPUs across all five queues until each received exactly its guaranteed capacity.

The guaranteed and maximum capacity model enables significant oversubscription of the GPU pool. Multiple queues with overlapping maximum capacities can sum to more than 100% of cluster resources, allowing idle GPU hours to be utilized by teams with pending work. When contention occurs, preemption reallocates resources to honor guaranteed allocations.

The bin packing mechanisms substantially reduced resource fragmentation. By concentrating workloads onto fewer nodes during both initial scheduling and post-scheduling consolidation, the platform maximizes the number of nodes with complete GPU availability for large requests while minimizing partially-utilized nodes.

Autoscaling operates for both batch workloads and real-time serving deployments. The platform observed behavior similar to Meta's LLaMA training where batch sizes needed to grow during training, demonstrating the importance of elastic resource scaling for large workloads whose requirements vary across their lifetime.

Geographic distribution considerations affect very large workloads that could span multiple regions. While multi-region deployment increases available capacity, it introduces data transfer costs that must be evaluated against the benefits of faster resource acquisition.

## Trade-offs & Lessons

The node-specific queue experiment represents a critical lesson in infrastructure design. The team attempted to address resource selection complexity by creating dedicated queues and clusters for specific node types, giving users more control over infrastructure choices. This intuitive approach failed dramatically, creating even more fragmentation and reducing utilization below previous levels. The team backed out of this design and pivoted to the multi-level scheduling approach with abstracted compute tiers.

Autoscaling reliability required resolving multiple interdependent challenges. Stateful workloads failing during downscaling led to disabling downscaling entirely, reducing utilization. Solving this required investment in standardized checkpointing APIs across the platform. Fast upscaling exposed infrastructure initialization issues that required maintaining headroom capacity. Each solution introduced its own trade-offs between utilization efficiency and operational reliability.

Balancing GPU utilization improvement with good user experience emerged as a fundamental tension without a single correct answer. The optimal balance depends on organizational priorities, service level objectives, and cost sensitivity. Apple's approach accepts some efficiency loss (headroom capacity, guaranteed allocations that may go unused) in exchange for predictable performance and reduced operational friction.

The guaranteed versus maximum capacity model provides an elegant framework for multi-tenant resource sharing that users find straightforward to understand. This simplicity in the contract between platform and users has proven valuable for operational clarity and allows teams to design their workload submission strategies around predictable resource availability.

Preemption policies consider multiple factors including application priority, task priority, and task runtime when selecting which workloads to evict during resource rebalancing. This sophisticated approach ensures that preemption decisions account for workload importance and avoid evicting long-running tasks near completion when possible.

The integration with Yunicorn simplifies Ray operations by hiding infrastructure resource complexity from the application layer. Ray focuses on distributed computing concerns while Yunicorn handles resource management, scheduling, and multi-tenancy. This separation of concerns has proven effective for building a mature, multi-tenant platform.

The standardization to small, medium, and large compute tiers successfully addresses user choice overload while covering the majority of use cases. This abstraction allows the platform team to optimize infrastructure utilization behind the scenes without requiring ML practitioners to become infrastructure experts.

Gang scheduling prevents wasteful partial allocations in distributed training scenarios where all workers must be present for any progress to occur. Enabling this feature per-application provides flexibility for workloads that benefit from this guarantee while allowing other workloads to potentially start faster with incremental resource allocation.

The upstream contribution of Yunicorn integration to the Kuberay project demonstrates Apple's commitment to community benefit and ensures that other organizations can leverage these sophisticated resource management capabilities without reimplementing the integration layer.
