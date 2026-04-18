---
title: "Federated Kubernetes Resource Management for ML Workloads with Ray: Migration from Mesos to Improve Training Speed and GPU Utilization"
slug: "uber-michelangelo-modernization-ray-on-kubernetes-federated-kubernetes-resource-management-for-ml-workloads-with-ray-mig"
draft: false
mlopsTags:
  - "compute-management"
  - "metadata-store"
  - "pipeline-orchestration"
  - "docker"
  - "kubernetes"
  - "ray"
  - "spark"
  - "data-prep"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo modernization + Ray on Kubernetes"
contentType: "blog"
summary: "Uber migrated its machine learning workloads from Apache Mesos-based infrastructure to Kubernetes in early 2024 to address pain points around manual resource management, inefficient utilization, inflexible capacity planning, and tight infrastructure coupling. The company built a federated resource management architecture with a global control plane on Kubernetes that abstracts away cluster complexity, automatically schedules jobs across distributed compute resources using filtering and scoring plugins, and intelligently routes workloads based on organizational ownership hierarchies. The migration resulted in 1.5 to 4 times improvement in training speed and better GPU resource utilization across zones and clusters, providing additional capacity for training workloads."
link: "https://www.uber.com/blog/ubers-journey-to-ray-on-kubernetes-ray-setup/"
year: 2025
seo:
  title: "Uber: Federated Kubernetes Resource Management for ML Workloads with Ray: Migration from Mesos to Improve Training Speed and GPU Utilization - ZenML MLOps Database"
  description: "Uber migrated its machine learning workloads from Apache Mesos-based infrastructure to Kubernetes in early 2024 to address pain points around manual resource management, inefficient utilization, inflexible capacity planning, and tight infrastructure coupling. The company built a federated resource management architecture with a global control plane on Kubernetes that abstracts away cluster complexity, automatically schedules jobs across distributed compute resources using filtering and scoring plugins, and intelligently routes workloads based on organizational ownership hierarchies. The migration resulted in 1.5 to 4 times improvement in training speed and better GPU resource utilization across zones and clusters, providing additional capacity for training workloads."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-modernization-ray-on-kubernetes-federated-kubernetes-resource-management-for-ml-workloads-with-ray-mig"
  ogTitle: "Uber: Federated Kubernetes Resource Management for ML Workloads with Ray: Migration from Mesos to Improve Training Speed and GPU Utilization - ZenML MLOps Database"
  ogDescription: "Uber migrated its machine learning workloads from Apache Mesos-based infrastructure to Kubernetes in early 2024 to address pain points around manual resource management, inefficient utilization, inflexible capacity planning, and tight infrastructure coupling. The company built a federated resource management architecture with a global control plane on Kubernetes that abstracts away cluster complexity, automatically schedules jobs across distributed compute resources using filtering and scoring plugins, and intelligently routes workloads based on organizational ownership hierarchies. The migration resulted in 1.5 to 4 times improvement in training speed and better GPU resource utilization across zones and clusters, providing additional capacity for training workloads."
mlops:
  source: "sqlite"
  entryId: 177
  sourceUrl: "https://www.uber.com/blog/ubers-journey-to-ray-on-kubernetes-ray-setup/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.616829"
  lastUpdated: "2026-04-14T19:55:42.982925"
---

## Problem Context

Uber's machine learning platform faced several fundamental challenges that motivated a comprehensive infrastructure modernization. The company's ML workloads are dominated by data-intensive processing steps in model training pipelines, where data volume directly correlates with model quality. These workloads traditionally ran as distributed batch jobs orchestrated through MADLJ (Michelangelo Deep Learning Jobs service), executing both Apache Spark-based ETL jobs and Ray-based training jobs.

The legacy system on Apache Mesos and Peloton created substantial friction for ML engineers. Resource management required manual awareness of compute fleet heterogeneity, including determining appropriate regions, zones, clusters, GPU availability, and specific GPU SKUs. Engineers had to identify clusters with sufficient available resources and encode these decisions as static configurations in their codebase. This represented what Uber viewed as a leaky abstraction that forced ML practitioners to become infrastructure experts.

Beyond the user experience issues, the platform suffered from systemic inefficiencies. Static cluster specifications caused uneven load distribution across the compute fleet, with some clusters oversubscribed while others sat underutilized. Capacity planning became problematic as experimentation patterns created bursty demand that was difficult to forecast. The tight coupling between compute and data services made infrastructure migrations challenging, requiring alterations to hard-coded configurations throughout the system. Additionally, the underlying Mesos foundation was becoming outdated, forcing custom integrations for newer technologies while the industry converged on Kubernetes as the standard orchestration platform.

## Architecture and Design

Uber designed a layered federated resource management architecture consisting of three primary layers: the user application layer where ML pipelines interact with declarative APIs, a global control plane running on Kubernetes, and local control planes comprising the actual compute clusters where jobs execute.

### Global Control Plane

The global control plane implements a standard Kubernetes architecture with an API server and controller manager. The API server exposes custom resources representing ML artifacts, particularly a Job CRD that encapsulates job specifications. A job controller watches these job requests and orchestrates the entire lifecycle from cluster selection through termination.

The cluster management subsystem represents underlying compute clusters as custom resources in the API server, encoding properties like region, zone, and supported hardware types. A dedicated cluster controller performs periodic health checks and maintains a cached view of resource pools across all clusters, which the job scheduler consumes for placement decisions.

Job execution follows a state machine pattern implemented through Kubernetes reconciliation loops. When users create job requests, the job controller adds them to a job queue representing pending work. The job scheduler dequeues jobs and assigns them to appropriate local clusters through a two-phase process: filtering plugins eliminate resource pools that don't match job affinities (such as GPU requirements or data locality constraints), then scoring plugins rank the remaining candidates based on factors like current load and dominant resource availability.

### Job Routing and Organizational Awareness

Uber implemented sophisticated organizational routing using their uOwn asset management system, which organizes engineering assets into a tree structure representing ownership hierarchies. Every job belongs to a project with a uOwn identifier, and every resource pool has an owner team identifier. The scheduler matches workloads to resource pools following a preference hierarchy: first attempting pools owned by the project's team, then pools owned by parent organizations in the uOwn tree, and finally falling back to centrally-managed shared pools.

This approach enables budget-aware resource allocation where organizations with dedicated compute budgets receive priority access to their provisioned resources while maintaining the abstraction benefits of the federated system. The resource pool information is maintained as an in-memory cache updated asynchronously by the cluster controller, removing fetch operations from the hot path of scheduling.

### Error Handling and Reliability

The platform implements comprehensive readiness checks to ensure Ray clusters are fully operational before accepting work. This includes querying worker status by connecting to the head node and verifying that all requested workers have successfully joined the cluster. When provisioning fails, the system provides actionable error messages, such as identifying invalid affinities or insufficient resources in the assigned pool.

The job controller monitors Ray worker pods for abnormal exits by assigning special labels and watching pods with those selectors. When containers exit with non-zero codes, the system captures termination reasons and exposes them to users through a pod error array in the job status. This enables users to quickly identify and resolve issues like out-of-memory errors without extensive debugging.

### Lifecycle Management

Uber models Ray clusters as ephemeral resources provisioned specifically for individual jobs, particularly important given the expensive and constrained nature of GPU resources. The job controller tracks jobs through completion and ensures resource cleanup through multiple termination pathways: client-initiated termination when processing completes, user-initiated kills via command-line utilities that capture operator identity and rationale, and automatic idle detection for erroneously-behaving clients.

Termination processing follows the reconciliation pattern, with a TerminationSpec in the job configuration triggering transition to a "Killing" state. Cleanup deletes the local job CRD, which cascades through owner references to remove all associated pods.

### Service Discovery

Within Uber's infrastructure running hundreds of concurrent Ray clusters, reliable discovery mechanisms are essential. The platform extends the Ray CRD with status fields exposing head node IP addresses and client ports. Production batch jobs query the global API server to retrieve connection information for their designated Ray clusters. This approach accommodates Uber's infrastructure constraints around host networking and dynamic port assignment.

## Technical Implementation

### Local Control Plane Integration

The local control planes consist of Kubernetes clusters managed by Uber's Compute team with well-defined contracts for job submission, monitoring, logging, and resource sharing. The open-source Ray operator is installed on every compute cluster that executes jobs.

A critical implementation challenge arose from Uber's reliance on host networking and dynamic port assignment rather than Kubernetes cluster IP allocation. Since the Ray operator uses Kubernetes services for worker-to-head discovery, Uber invented a custom discovery mechanism using init containers. These init containers query the API server for head node information and write it to a shared mount that the Ray worker container reads during startup, enabling workers to connect to the head node and form functional clusters.

### Idle Detection System

To maximize utilization of expensive GPU resources, Uber implemented an idle detection system as a sidecar container running in Ray head pods. This sidecar queries the metrics database to retrieve cluster utilization metrics and detects both processing idleness and extended periods without client connections. When idle conditions are met, the sidecar sends termination requests to the global API server to release resources for other workloads.

### Migration Execution

The migration from Mesos to Kubernetes involved a year-long program launched in 2023 with workstreams organized by project tier, resource requirements, technical dependencies, and data dependencies. Uber retained certain custom abstractions from their Peloton implementation—such as resource pools and elastic resource sharing—and adapted them to operate on Kubernetes. This pragmatic approach allowed them to preserve battle-tested practices while leveraging Kubernetes' industry-standard orchestration capabilities and native support for frameworks like Spark and Ray.

## Scale and Performance

Uber's ML platform operates at substantial scale, running several hundred Ray clusters simultaneously to support production batch workloads. The migration to Kubernetes delivered significant performance improvements, with training speed increasing by 1.5 to 4 times across workloads. The improved job placement and container management system enabled better GPU resource utilization across zones and clusters, effectively creating additional capacity without provisioning new hardware.

By the beginning of 2024, Uber successfully migrated all ML projects to the Ray on Kubernetes stack and deprecated the legacy Peloton-based infrastructure. The federated resource management approach processes job scheduling decisions using in-memory cached representations of resource pools updated asynchronously, ensuring scheduling operations remain off the hot path.

## Trade-offs and Lessons Learned

Uber's approach reflects a pragmatic balance between adopting industry-standard tools and preserving internally-developed capabilities that address specific operational needs. Rather than adopting Kubernetes wholesale, they maintained custom abstractions for resource pools and organizational routing that align with their budget structures and asset management systems.

The federated architecture successfully abstracts infrastructure complexity from ML engineers while maintaining fine-grained control over resource allocation. The organizational routing based on uOwn hierarchies ensures teams receive priority access to their dedicated resources without sacrificing the benefits of a unified resource view. This design accommodates both established projects with provisioned resources and experimental efforts that leverage shared pools.

The custom service discovery mechanism demonstrates how infrastructure constraints—in this case, host networking requirements—necessitate adapting open-source components that assume standard Kubernetes networking models. This represents a common challenge when operating at scale with specialized infrastructure requirements.

Idle detection through sidecar containers and pod monitoring exemplifies defensive resource management essential for expensive, scarce resources like GPUs. The system handles multiple termination scenarios, from clean client shutdowns to crash recovery, ensuring resources don't remain allocated to defunct workloads.

The migration strategy of organizing workstreams by project characteristics rather than attempting a big-bang cutover reflects operational maturity. The year-long timeline allowed for careful validation and iterative refinement while maintaining production stability.

Key insights for practitioners include the importance of maintaining abstraction boundaries that let ML engineers focus on model development rather than infrastructure details, the value of organizational awareness in resource scheduling for budget accountability, the necessity of robust error handling and actionable diagnostics to enable user self-service, and the criticality of lifecycle management and idle detection for expensive resources. The successful migration demonstrates that transitioning from legacy orchestration platforms to Kubernetes can deliver substantial performance improvements when accompanied by thoughtful architecture that addresses organization-specific constraints and requirements.
