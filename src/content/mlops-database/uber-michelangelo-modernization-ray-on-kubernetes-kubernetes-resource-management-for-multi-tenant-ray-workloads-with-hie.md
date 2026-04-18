---
title: "Kubernetes resource management for multi-tenant Ray workloads with hierarchical pools, GPU scheduling, and fair admission control"
slug: "uber-michelangelo-modernization-ray-on-kubernetes-kubernetes-resource-management-for-multi-tenant-ray-workloads-with-hie"
draft: false
mlopsTags:
  - "compute-management"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubernetes"
  - "ray"
  - "terraform"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo modernization + Ray on Kubernetes"
contentType: "blog"
summary: "Uber built an advanced resource management system on top of Kubernetes to efficiently orchestrate Ray-based machine learning workloads at scale. The platform addresses challenges in running multi-tenant ML workloads by implementing elastic resource sharing through hierarchical resource pools, custom scheduling plugins for GPU workload placement, and support for heterogeneous clusters mixing CPU and GPU nodes. Key innovations include a custom admission controller using max-min fairness for dynamic resource allocation and preemption, specialized GPU filtering and SKU-based scheduling plugins to optimize expensive hardware utilization like NVIDIA H100 GPUs, and gang scheduling support for distributed training jobs. This architecture enables near 100% cluster utilization during peak demand periods while providing cost savings through intelligent resource sharing and ensuring critical production workloads receive guaranteed capacity."
link: "https://www.uber.com/blog/ubers-journey-to-ray-on-kubernetes-resource-management/"
year: 2025
seo:
  title: "Uber: Kubernetes resource management for multi-tenant Ray workloads with hierarchical pools, GPU scheduling, and fair admission control - ZenML MLOps Database"
  description: "Uber built an advanced resource management system on top of Kubernetes to efficiently orchestrate Ray-based machine learning workloads at scale. The platform addresses challenges in running multi-tenant ML workloads by implementing elastic resource sharing through hierarchical resource pools, custom scheduling plugins for GPU workload placement, and support for heterogeneous clusters mixing CPU and GPU nodes. Key innovations include a custom admission controller using max-min fairness for dynamic resource allocation and preemption, specialized GPU filtering and SKU-based scheduling plugins to optimize expensive hardware utilization like NVIDIA H100 GPUs, and gang scheduling support for distributed training jobs. This architecture enables near 100% cluster utilization during peak demand periods while providing cost savings through intelligent resource sharing and ensuring critical production workloads receive guaranteed capacity."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-modernization-ray-on-kubernetes-kubernetes-resource-management-for-multi-tenant-ray-workloads-with-hie"
  ogTitle: "Uber: Kubernetes resource management for multi-tenant Ray workloads with hierarchical pools, GPU scheduling, and fair admission control - ZenML MLOps Database"
  ogDescription: "Uber built an advanced resource management system on top of Kubernetes to efficiently orchestrate Ray-based machine learning workloads at scale. The platform addresses challenges in running multi-tenant ML workloads by implementing elastic resource sharing through hierarchical resource pools, custom scheduling plugins for GPU workload placement, and support for heterogeneous clusters mixing CPU and GPU nodes. Key innovations include a custom admission controller using max-min fairness for dynamic resource allocation and preemption, specialized GPU filtering and SKU-based scheduling plugins to optimize expensive hardware utilization like NVIDIA H100 GPUs, and gang scheduling support for distributed training jobs. This architecture enables near 100% cluster utilization during peak demand periods while providing cost savings through intelligent resource sharing and ensuring critical production workloads receive guaranteed capacity."
mlops:
  source: "sqlite"
  entryId: 176
  sourceUrl: "https://www.uber.com/blog/ubers-journey-to-ray-on-kubernetes-resource-management/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.616797"
  lastUpdated: "2026-04-14T19:55:41.932937"
---

## Problem Context

Uber needed to run large-scale Ray-based machine learning workloads on Kubernetes across multi-tenant environments, but discovered that Kubernetes' native resource management capabilities were insufficient for their needs. The core challenges included:

The organization required elastic resource sharing mechanisms that would allow teams to maximize cluster utilization while maintaining fairness guarantees. Without such capabilities, resources would sit idle in some resource pools while other teams faced capacity constraints, leading to suboptimal infrastructure usage and higher costs.

Uber also needed to support heterogeneous workloads with varying hardware requirements. Some ML training jobs required expensive, cutting-edge GPUs like NVIDIA H100s for specific use cases, while other workloads could run on standard CPU-only nodes or older GPU generations. The platform needed intelligent scheduling to ensure expensive hardware wasn't wasted on workloads that didn't require it.

Additionally, the team had built custom abstractions on top of their previous Peloton orchestrator that needed to be adapted to work on Kubernetes. This migration required maintaining feature parity while taking advantage of Kubernetes' ecosystem and standardization benefits.

The resource management challenges were particularly acute because ML training workloads have distinctive characteristics: they often require gang scheduling (all workers must start together), can benefit from heterogeneous cluster configurations (separating data loading on CPUs from training on GPUs), and have highly variable resource demands over time.

## Architecture & Design

The architecture extends Kubernetes with several custom components to enable elastic resource management, intelligent GPU scheduling, and heterogeneous cluster support.

### Resource Pool Management and Elastic Sharing

At the core of the system is a hierarchical resource pool abstraction implemented as Kubernetes Custom Resource Definitions (CRDs). Resource pools represent logical subsets of cluster resources allocated to different organizations and teams. These pools can contain child pools, creating organizational hierarchies that mirror team structures.

Each resource pool tracks multiple resource dimensions including CPUs, memory, disk size, and GPUs, with extensibility planned for additional dimensions like disk IO. Pods are assigned to resource pools through annotations containing the pool name, enabling efficient grouping and management.

The resource manager component continuously monitors all pod events to track demand and usage per resource pool. Demand is calculated as the sum of resource requests for pods waiting for admission, while usage represents resources consumed by already-admitted pods. Periodically, the system calculates total cluster capacity by summing the allocatable capacity of all nodes, excluding those marked with maintenance taints.

Entitlement calculation uses a max-min fairness algorithm that ensures each resource pool receives its fair share while enabling elastic borrowing. When a pool's demand exceeds its reservation and other pools have unused resources, it can borrow capacity. Critically, when resource owners need their capacity back, borrowed resources can be preempted.

### Custom Scheduling and Admission Control

The architecture introduces a custom scheduler called `kube-resource-manager-scheduler` that implements admission control. When pods are created, they're assigned this scheduler name and placed in a priority queue. The admission control process verifies that the pod's resource pool has sufficient entitlement before proceeding.

Once a pod passes admission control, its scheduler name changes to the default Kubernetes scheduler, which then handles node placement. This two-phase approach separates resource allocation decisions from physical placement decisions. Pods that pass admission but aren't placed within 25 minutes are killed to free up resources.

The priority queue orders pods based on the priority field in their pod spec, ensuring higher-priority workloads gain admission first during resource contention.

### Gang Scheduling Support

For distributed training workloads that require all instances to start simultaneously, the system implements gang scheduling through pod metadata. Pods belonging to the same gang are labeled with `gang-member: <gang-name>` and include an annotation `number-gang-members` indicating the total gang size.

The resource manager waits until all pods in a gang are created before running admission control on any of them. During admission, it ensures the entire gang's combined demand can be satisfied by the assigned entitlement before admitting any individual pod. This prevents deadlock scenarios where partial gangs consume resources without being able to complete.

### Preemption Mechanism

When a resource pool exceeds its newly calculated entitlement due to increased demand elsewhere, the system triggers preemption to bring usage in line with entitlement. Preemption is implemented using Kubernetes' eviction API.

Only pods marked with the annotation `preemptible: true` can be preempted. Non-preemptible pods cannot exceed their pool's reservation, providing guaranteed capacity for critical production workloads. Before evicting a pod, the system sets a pod condition that logs the reason for preemption, enabling observability and debugging.

### Heterogeneous Cluster Support

For mixed CPU/GPU clusters, the architecture includes specialized scheduling plugins. A GPU filter plugin prevents non-GPU pods from being scheduled on GPU-enabled nodes, ensuring expensive GPU hardware is reserved exclusively for workloads that need it.

Non-GPU pods are distributed across CPU nodes using a load-aware strategy that selects the least occupied nodes. For GPU workloads, the system employs a bin-packing strategy to minimize fragmentation and maximize GPU node utilization.

This design enables efficient heterogeneous training jobs where Ray Data loaders run on CPU-only nodes to handle data loading and shuffling, then feed prepared data to GPU-enabled training nodes. Ray's native support for node labeling integrates seamlessly with this Kubernetes infrastructure.

### SKU-Based GPU Scheduling

For managing special hardware like NVIDIA H100 GPUs, the architecture implements an SKU-based filtering mechanism through a custom scheduler plugin called `SpecialResourceExclusionFilter`. 

Each GPU node is labeled with its specific model name. A cluster-level ConfigMap stored in etcd maintains a list of supported special hardware, including real model names, aliases, and configurations. Both the scheduler and workload requestors have access to this ConfigMap.

When submitting workloads requiring specific GPU models, users include a `nodeSelector` in the pod spec matching the required model (e.g., `gpu-node-label-model: NVIDIA_H100_80GB_HBM3`). The default Kubernetes scheduler ensures these pods land on matching nodes.

For general GPU requests without model specifications, the `SpecialResourceExclusionFilter` plugin filters out nodes with special hardware during the scheduling filter phase. This ensures expensive, limited hardware remains available for workloads that explicitly require it.

### Metrics and Observability

The monitoring architecture uses a daemon agent on each node to collect container-level resource utilization metrics. The agent leverages cAdvisor as a library to gather metrics from Containerd, the container runtime managing pod lifecycles.

The daemon enhances metrics with Uber-specific labels, including Ray job IDs, enabling aggregation at the job level across head and worker containers. A central collector service gathers these enhanced metrics.

Containerd emits comprehensive metrics including CPU usage and throttling, memory consumption and OOM events, and GPU utilization data (memory usage, processing time) for GPU-accelerated workloads. These metrics are aggregated at the workload level and visualized in Grafana dashboards, providing visibility into resource consumption patterns and enabling optimization.

## Technical Implementation

The implementation builds on Kubernetes' extensibility mechanisms, including Custom Resource Definitions for resource pools, custom scheduler plugins for GPU filtering and SKU-based scheduling, and the scheduler extender pattern for admission control.

The `kube-resource-manager-scheduler` integrates with Kubernetes' scheduling framework, intercepting pod scheduling decisions before the default scheduler runs. The entitlement calculation and preemption logic run as separate controllers that watch pod and node events.

For container metrics collection, the daemon agent uses cAdvisor as a library rather than a standalone service, providing more control over metric enhancement and labeling. The integration with Containerd provides access to low-level container runtime metrics including GPU utilization when hardware and drivers support it.

The SKU-based filtering plugin implements the Kubernetes scheduler framework's Filter extension point, executing during the filter phase of the scheduling cycle. The ConfigMap-based configuration allows dynamic updates to supported GPU models without requiring scheduler restarts.

Ray integration leverages Ray's node labeling capabilities, where nodes are labeled as data processing nodes or GPU training nodes. Ray Data automatically uses labeled data processing nodes for loading and shuffling, while training tasks target GPU-labeled nodes.

## Scale & Performance

The elastic resource sharing approach enables clusters to maintain utilization rates approaching 100% during peak demand periods, a significant improvement over static resource allocation. The documentation shows cluster allocation and demand plots that closely track total cluster capacity, indicating minimal resource waste.

The 25-minute timeout for unadmitted pods ensures resources don't remain reserved indefinitely for workloads that can't be placed, maintaining cluster responsiveness.

Gang scheduling ensures distributed training jobs with multiple workers all start simultaneously, eliminating the coordination overhead and potential deadlocks that would occur with independent pod scheduling.

The heterogeneous cluster approach optimizes GPU utilization by offloading CPU-intensive data loading to dedicated CPU nodes, allowing GPU nodes to focus exclusively on training computations. This separation maximizes the value extracted from expensive GPU hardware.

For special hardware like NVIDIA H100 GPUs, the SKU-based filtering ensures these limited, expensive resources are used only by workloads that explicitly require them, preventing waste while maintaining availability for critical use cases.

## Trade-offs & Lessons

### Advantages of the Elastic Approach

The max-min fairness algorithm with elastic sharing provides three key benefits that justify the implementation complexity:

Higher resource utilization is achieved because no resources remain idle if other teams have demand. The ability to approach 100% utilization during peak periods represents substantial efficiency gains over static allocation.

Cost savings on infrastructure are significant. By dynamically sharing resources, teams need to purchase far fewer resources than if each maintained dedicated capacity for peak loads. The ability to borrow unused capacity from other pools reduces the infrastructure footprint required.

Flexible workload management allows teams to prioritize critical production workloads with guaranteed non-preemptible capacity while running experimental pipelines on preemptible capacity during low production demand. This flexibility optimizes both guaranteed and opportunistic resource usage.

### Implementation Complexity

The architecture requires significant custom development on top of Kubernetes. The custom scheduler, admission controller, preemption logic, and specialized GPU plugins represent substantial engineering investment beyond using vanilla Kubernetes.

The two-phase scheduling approach (custom admission control followed by default scheduler placement) adds complexity to the scheduling path. The 25-minute timeout for placement introduces a failure mode where pods can be admitted but then killed if placement fails, requiring workload retry logic.

### Preemption Considerations

The preemption mechanism provides essential flexibility but introduces workload interruption. Workloads running on preemptible capacity must handle being killed mid-execution, requiring checkpointing and resume capabilities to avoid wasting computation.

The distinction between preemptible and non-preemptible pods requires careful capacity planning. Non-preemptible pods cannot exceed reservations, so teams must accurately forecast guaranteed capacity needs versus opportunistic usage.

### GPU Scheduling Trade-offs

The bin-packing strategy for GPU workloads maximizes utilization and minimizes fragmentation but can create hotspots. Concentrating GPU workloads on fewer nodes leaves other GPU nodes idle initially, which could impact fault tolerance if a heavily-loaded node fails.

The SKU-based filtering for special hardware like H100 GPUs ensures expensive resources aren't wasted but requires explicit nodeSelector configuration in pod specs. This creates operational overhead and potential for misconfiguration where workloads that should use H100s don't specify the selector, or workloads that don't need H100s accidentally request them.

### Gang Scheduling Challenges

Gang scheduling prevents resource deadlocks for distributed training but requires all gang members to be created before any are admitted. This can increase time-to-schedule for large gangs and creates a coordination requirement where the gang size must be known upfront and encoded in pod metadata.

The system must wait for all gang pods to exist, which means failures in creating any gang member blocks the entire gang's admission. This introduces failure amplification where a single pod creation error prevents the entire distributed job from starting.

### Heterogeneous Cluster Benefits and Complexity

Running heterogeneous clusters with mixed CPU and GPU nodes optimizes cost by offloading non-GPU work to cheaper CPU nodes. The integration with Ray Data for automatic separation of data loading and training workloads provides elegant utilization improvements.

However, this approach requires careful workload configuration to specify which tasks should run where. The filter plugin logic must correctly distinguish GPU from non-GPU pods, and misconfiguration could result in GPU pods landing on CPU nodes or vice versa, degrading performance.

### Monitoring and Observability

The metrics collection architecture using cAdvisor integration provides comprehensive visibility into container resource usage, including GPU metrics when supported. The enhancement with Ray job IDs enables job-level aggregation across distributed workers.

The central collector pattern for gathering metrics from daemon agents introduces a single point of potential failure and requires capacity planning for the collector service itself as cluster scale grows.

### Future Considerations

The team mentions plans to potentially open-source the technologies described, which would benefit the broader Kubernetes and ML communities. The architecture's reliance on custom components creates maintenance burden as Kubernetes evolves, requiring ongoing adaptation to new Kubernetes versions.

The system demonstrates that extending Kubernetes for ML workload management is feasible but requires deep Kubernetes expertise and significant engineering investment. Organizations considering similar approaches should weigh the benefits of elastic resource sharing and specialized GPU scheduling against the complexity of maintaining custom scheduler plugins and admission controllers.
