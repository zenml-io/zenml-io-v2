---
title: "Distributed ML Training with KubeRay at Robinhood | Ray Summit 2025"
slug: "robinhood-distributed-ml-training-with-kuberay-distributed-ml-training-with-kuberay-at-robinhood-ray-summit-2025"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "feature-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "notebooks"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "sagemaker"
  - "deployment"
  - "hyperparameter-tuning"
  - "training"
industryTags: "tech"
company: "Robinhood"
companySlug: "robinhood"
platformName: "Distributed ML Training with KubeRay"
contentType: "video"
summary: "Robinhood's AI Infrastructure team built a distributed ML training platform using Ray and KubeRay to overcome the limitations of single-node training for their machine learning engineers and data scientists. The previous platform, called King's Cross, was constrained by job duration limits for security reasons, single-node resource constraints that prevented training on larger datasets, and GPU availability issues for high-end instances. By adopting Ray for distributed computing and KubeRay for Kubernetes-native orchestration, Robinhood created an ephemeral cluster-per-job architecture that preserved existing developer workflows while enabling multi-node training. The solution integrated with their existing infrastructure including their custom Archetype framework, monorepo-based dependency management, and namespace-level access controls. Key outcomes included a seven-fold increase in trainable dataset sizes and more predictable GPU wait times by distributing workloads across smaller, more readily available GPU instances rather than competing for scarce large-instance nodes."
link: "https://www.youtube.com/watch?v=fUwAyH3VfWs"
year: 2025
seo:
  title: "Robinhood: Distributed ML Training with KubeRay at Robinhood | Ray Summit 2025 - ZenML MLOps Database"
  description: "Robinhood's AI Infrastructure team built a distributed ML training platform using Ray and KubeRay to overcome the limitations of single-node training for their machine learning engineers and data scientists. The previous platform, called King's Cross, was constrained by job duration limits for security reasons, single-node resource constraints that prevented training on larger datasets, and GPU availability issues for high-end instances. By adopting Ray for distributed computing and KubeRay for Kubernetes-native orchestration, Robinhood created an ephemeral cluster-per-job architecture that preserved existing developer workflows while enabling multi-node training. The solution integrated with their existing infrastructure including their custom Archetype framework, monorepo-based dependency management, and namespace-level access controls. Key outcomes included a seven-fold increase in trainable dataset sizes and more predictable GPU wait times by distributing workloads across smaller, more readily available GPU instances rather than competing for scarce large-instance nodes."
  canonical: "https://www.zenml.io/mlops-database/robinhood-distributed-ml-training-with-kuberay-distributed-ml-training-with-kuberay-at-robinhood-ray-summit-2025"
  ogTitle: "Robinhood: Distributed ML Training with KubeRay at Robinhood | Ray Summit 2025 - ZenML MLOps Database"
  ogDescription: "Robinhood's AI Infrastructure team built a distributed ML training platform using Ray and KubeRay to overcome the limitations of single-node training for their machine learning engineers and data scientists. The previous platform, called King's Cross, was constrained by job duration limits for security reasons, single-node resource constraints that prevented training on larger datasets, and GPU availability issues for high-end instances. By adopting Ray for distributed computing and KubeRay for Kubernetes-native orchestration, Robinhood created an ephemeral cluster-per-job architecture that preserved existing developer workflows while enabling multi-node training. The solution integrated with their existing infrastructure including their custom Archetype framework, monorepo-based dependency management, and namespace-level access controls. Key outcomes included a seven-fold increase in trainable dataset sizes and more predictable GPU wait times by distributing workloads across smaller, more readily available GPU instances rather than competing for scarce large-instance nodes."
mlops:
  source: "sqlite"
  entryId: 228
  sourceUrl: "https://www.youtube.com/watch?v=fUwAyH3VfWs"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.619277"
  lastUpdated: "2026-04-14 12:21:23"
---

## Problem Context

Robinhood's AI Infrastructure team faced several critical limitations with their single-node ML training platform that motivated the shift to distributed training infrastructure. The team manages the complete ML lifecycle for data scientists and ML engineers, including notebooks for exploratory data analysis, the King's Cross model training platform, model serving, and an online feature store.

The primary modeling frameworks at Robinhood are XGBoost for gradient boosted decision tree models and PyTorch for all deep learning use cases. As a financial services firm, security is paramount, with strict requirements around least privilege access to personal and financial data, no local data access, and full auditability of training jobs and model artifacts. ML use cases span fraud detection, cross-selling across Robinhood's expanding product suite, and various credit card-related applications.

The single-node training architecture encountered three major categories of limitations that drove the need for distributed training:

**Job Duration Constraints**: For security purposes, Robinhood limits how long ad hoc development jobs can run. When coupled with single-pod (and therefore single-node) execution, this severely restricted the size of models and datasets that could be used for training. It also created challenges for complex workflows like hyperparameter optimization that require extended execution times.

**Job Size Limitations**: Some training jobs required amounts of GPU and memory that could not fit onto a single node. The shift from tree-based models to deep learning architectures exacerbated this issue, as deep learning workloads benefit significantly from data parallelism across multiple GPUs. This created heavy contention for GPU resources among users, and the mismatch between the mix of CPU, memory, and GPU that users needed versus what was available on individual nodes led to low utilization rates.

**Resource Availability Issues**: The most capable nodes with large GPUs on recent architectures proved difficult to scale on demand, leading to frequent insufficient capacity errors when trying to meet developer demand. Reserving more of these nodes would incur high fixed costs and worsen GPU utilization problems. Many workloads could run on smaller GPU nodes if distributed across multiple machines, but the single-node constraint prevented this. Additionally, Robinhood faces regional constraints on GPU access, limiting their ability to seek capacity in other regions.

## Architecture & Design

The distributed training platform architecture builds on Robinhood's existing King's Cross platform while introducing Ray clusters orchestrated through KubeRay on Kubernetes. The overall architecture preserves the three high-level stages of the previous system: local development and code packaging, deployment to cloud compute with access to GPUs and data in the corporate VPC, and monitoring through Grafana and MLflow.

**Core Components**: The King's Cross server acts as the central orchestration point, receiving job submission requests and translating them into Kubernetes API calls. It integrates with Robinhood's custom Archetype framework, an abstraction layer built on Kubernetes that wraps native Kubernetes resources. KubeRay provides custom resources (RayCluster and RayJob) that automate the lifecycle management of Ray clusters through the KubeRay operator.

**Ephemeral Cluster-Per-Job Architecture**: A critical design decision was choosing ephemeral clusters created per job rather than long-running shared clusters. This architecture addresses several concerns. It eliminates noisy neighbor problems where bursty resource utilization from one job affects others, which is especially important during initial development when users are still estimating resource requirements. It aligns with Robinhood's namespace-level access control model, where teams manage access at the namespace level through IAM roles tied to service accounts. Since Ray clusters are namespace-scoped in Kubernetes, creating separate clusters per job allows pods to mount service accounts with permissions scoped precisely to what that specific training job needs, maintaining the least privilege principle. It also eliminates idle cluster costs, trading the cold start overhead for cost efficiency. The cold start time proved relatively insignificant compared to typical training job durations.

**Job Submission Flow**: Users submit jobs through three interfaces depending on the use case: a CLI for ad hoc development, Databricks notebooks for interactive work, and an Airflow operator for productionized jobs. All three methods use consistent parameters specifying the image, GPU type and count, CPU, memory, and job-specific arguments. This consistency preserves the familiar developer experience from the single-node platform.

**Code Distribution Strategy**: The platform supports two flows for distributing job code to Ray clusters. For development, optimizing for velocity, users upload job artifacts to S3 using the King's Cross CLI. An init container running on all pods in the Ray cluster downloads the code from S3. This avoids requiring code review, build pipelines, and image creation for rapid iteration. For production, code is committed to Git, goes through code review, and automated builds create container images layering the training job code on top of the Ray base image along with framework-specific pip dependencies. These images are pulled to every pod in the Ray cluster.

**Dependency Management**: Rather than dynamically installing dependencies at runtime, Robinhood pre-installs pip dependencies in container images. This approach stems from their monorepo structure, ensuring package versions are compatible with other first-party libraries bundled into the ML training platform. It provides consistency between development and production environments, aligns with Robinhood's policy against dynamically downloading and installing packages on production pods, and improves startup performance by minimizing time to pod readiness when scaling up new nodes.

**Integration with Archetype Framework**: The platform wraps the Kubernetes native job that submits work to the Ray cluster within an Archetype component. Archetype consists of Application and Component custom resources that abstract common configurations. At the Application level, configurations include the image hash (code version), sidecars like Envoy or telemetry agents, alerting levels, and ownership metadata. At the Component level, configurations specify init containers, resource requests per container, and entry point commands. Controllers watch these custom resources and create appropriate native Kubernetes resources (deployments for servers, jobs for training workloads). The Archetype framework provides a Deploy Dashboard UI where users see application status, current version, last deployment time, and centralized links to monitoring and logs without interacting directly with kubectl.

**Job Execution Flow**: When a user requests a distributed training job, the King's Cross server creates both an Archetype-wrapped Kubernetes native job and a RayCluster custom resource. The KubeRay operator translates the RayCluster into head node and worker node pods. The Archetype-wrapped Kubernetes job looks for the Kubernetes service backed by the Ray cluster's head node pod, then submits a job creation request to that service using the Ray Jobs API through Python SDK code packaged in a container image. This job continuously polls the status and logs of the submitted training job, streaming logs that appear on the Deploy Dashboard. When the training job completes, the Kubernetes native job exits, making its completion status visible as the training job status on the Deploy Dashboard.

**Resource Management**: The King's Cross server passes through user-specified information including user roles and permissions to different data sources, node class for scheduling, resource requests for CPU, GPU, and memory, and job-specific arguments. It assigns job images from centralized images maintained by the AI Infrastructure team with pre-installed dependencies.

**Garbage Collection**: A separate garbage collector component periodically polls the Kubernetes API server for all Ray clusters and their associated Kubernetes jobs, deleting those whose training jobs have completed (indicated by the Kubernetes native job status). This design keeps the King's Cross server stateless.

**Environment Isolation**: The King's Cross server can create Ray clusters and associated Kubernetes jobs in two completely isolated Kubernetes environments, separating production flows from development flows that run non-code-reviewed code.

## Technical Implementation

**Infrastructure Stack**: The platform runs entirely on Kubernetes, leveraging Robinhood's existing Kubernetes infrastructure and integrations around observability, networking, and autoscaling. Ray provides the distributed computing framework, with KubeRay handling Kubernetes-native orchestration. The core modeling frameworks remain XGBoost and PyTorch.

**Custom Resources and Controllers**: KubeRay provides RayCluster and RayJob custom resources. RayCluster translates into head node pods and optional worker node pods via the KubeRay operator. RayJob creates both a RayCluster and a Kubernetes native job that submits work to that cluster. Robinhood chose to create these resources separately rather than using RayJob directly to integrate with their Archetype framework.

**Archetype Framework Integration**: Robinhood's custom Archetype framework abstracts Kubernetes complexity through Application and Component custom resources. Controllers watch these and create underlying Kubernetes resources. The framework provides the Deploy Dashboard UI for status visibility, monitoring links, and automated deployments when new images are built upon code landing. For production jobs, users make a single job submission request, and subsequent code commits automatically update running production jobs.

**Job Submission Mechanism**: The platform uses the Ray Jobs API rather than Ray Client. The Ray Jobs API is accessed through Python SDK code packaged in a container image and run in the Kubernetes native job. This job receives the head node address from the King's Cross server and user job arguments, then submits the request to the Ray cluster service and continuously polls for status and logs.

**Code Distribution**: Two paths exist for getting code onto Ray cluster pods. Development flow uses S3 upload via the King's Cross CLI, with init containers downloading code from S3 onto all cluster pods. Production flow uses container images built automatically from committed code, layering training code and dependencies on Ray base images. Alternative approaches like mounting from ConfigMaps (not scalable) or using the working_dir field in Ray Jobs API were considered but not pursued in favor of the battle-tested init container method.

**Image Building**: The AI Infrastructure team takes the Ray base image and rebuilds critical aspects using a different container building framework to meet Robinhood's requirements. Centralized job images with pre-installed dependencies are maintained, with mechanisms for developers to request new dependencies and trigger image rebuilds for new use cases.

**Access Control**: Access is managed at the team and namespace level. Teams needing access to specific S3 paths have IAM roles with scoped permissions tied to service accounts in the namespace running the workload. Namespaces serve as permission boundaries. Pods in Ray clusters mount service accounts from the same namespace with permissions scoped to only what the training job needs. The ephemeral cluster-per-job architecture prevents permission boundary violations that would occur with shared clusters serving multiple teams.

**Monitoring and Observability**: The platform integrates with existing Robinhood observability infrastructure. Training jobs write metrics to MLflow, with logs and artifacts written to blob storage. The Deploy Dashboard provides centralized access to monitoring links and logs. The Kubernetes native job that submits work to Ray continuously polls and streams logs from the distributed training job, making them visible through standard logging integrations.

**Job Lifecycle Management**: Jobs move through packaging (local code upload or image build), submission (King's Cross server creates RayCluster and Kubernetes job), execution (Ray cluster runs distributed training), and cleanup (garbage collector deletes completed clusters and jobs). The King's Cross server remains stateless, with garbage collection handled separately.

## Scale & Performance

**GPU Resources**: At peak usage, the platform manages approximately 100 GPUs across all users. Individual training jobs typically use GPUs in the tens, not hundreds, representing the current scale of Robinhood's distributed training workloads.

**Team Size**: The distributed training platform was built and is maintained by a two-person team (the presenters), part of a larger 10-person AI Infrastructure team that manages the complete ML development lifecycle including notebooks, training, serving, and feature stores.

**Dataset Scale Improvements**: Existing training jobs previously limited by single-node constraints achieved a seven-fold increase in trainable dataset size after migrating to distributed training. The team believes substantially larger increases are achievable with further scaling.

**Wait Time Improvements**: The platform reduced wait times for GPU resources by enabling jobs to run on multiple smaller GPU instances rather than competing for scarce large-instance nodes. Smaller instances autoscale more readily, leading to more predictable wait times. Instead of waiting for other users' jobs to complete in a queue, scaling up nodes becomes the primary wait factor.

**Cold Start Overhead**: The ephemeral cluster-per-job architecture incurs cold start costs for pod creation and scheduling, but this overhead proved relatively insignificant compared to typical training job durations, making the trade-off favorable given the security, access control, and cost benefits.

**Startup Performance**: Pre-installing pip dependencies in images rather than installing at runtime minimizes pod readiness time, important when scaling up new nodes for on-demand clusters. This optimization reduces the time to actually start running training logic.

## Trade-offs & Lessons

**Ephemeral vs. Long-Running Clusters**: The decision to create clusters per job rather than maintaining shared long-running clusters represents a deliberate trade-off. Ephemeral clusters incur cold start overhead but provide superior isolation, align with namespace-based access control, eliminate noisy neighbor issues, and avoid idle cluster costs. For Robinhood's use case with security requirements and relatively long-running training jobs, the cold start penalty is acceptable. Organizations with shorter jobs or less stringent access control requirements might favor shared clusters.

**Code Distribution Strategy**: Supporting two different code distribution paths (S3 for development, container images for production) adds complexity but optimizes for different priorities. Development prioritizes velocity, avoiding build pipelines for rapid iteration. Production prioritizes reproducibility and security through immutable images. This dual approach acknowledges that developer experience during experimentation differs from production requirements.

**Pre-installed vs. Dynamic Dependencies**: Pre-installing dependencies in images rather than dynamic installation addresses multiple concerns: compatibility with monorepo first-party libraries, consistency between development and production, compliance with security policies against dynamic downloads, and startup performance. The trade-off is reduced flexibility for ad hoc dependency experimentation, mitigated by providing mechanisms to request new dependencies and rebuild images. Organizations without monorepos or strict security policies might favor dynamic installation for greater flexibility.

**Ray Jobs API vs. Ray Client**: The team chose the Ray Jobs API over Ray Client based on documentation noting architectural limitations with Ray Client. This decision favors the officially recommended approach despite Ray Client being mentioned in other companies' implementations. They wrapped the Jobs API in Python code packaged in containers rather than using the CLI for better code readability.

**Archetype Integration Complexity**: Integrating with Robinhood's custom Archetype framework required creating Ray clusters and Kubernetes jobs separately rather than using KubeRay's RayJob custom resource. This adds orchestration complexity but provides critical benefits: visibility in the Deploy Dashboard, automatic deployments on code commits for production jobs, and consistency with existing developer workflows. The lesson is that integrating distributed training into existing platform abstractions requires careful design but pays dividends in developer experience.

**Open Source vs. Vendored Solutions**: Robinhood chose open-source KubeRay over vendored solutions to maintain full control over cluster lifecycle and infrastructure configurations. With existing observability and GPU management infrastructure to augment KubeRay, they didn't require vendor-provided capabilities. This works when in-house expertise exists but requires accepting maintenance responsibilities.

**Preserving Developer Experience**: A critical success factor was preserving the familiar job submission interface (CLI, Databricks notebooks, Airflow operator) and parameters from the single-node platform. This minimized workflow disruption for data scientists and ML engineers transitioning to distributed training. Platform teams should consider how new capabilities can be introduced with minimal changes to established workflows.

**Namespace-Scoped Access Control**: Using Kubernetes namespaces as permission boundaries and Ray clusters being namespace-scoped creates natural alignment for access control. This architectural characteristic influenced the cluster-per-job decision and demonstrates how infrastructure primitives can guide platform design choices.

**Garbage Collection as Separate Service**: Implementing garbage collection as a separate component keeps the King's Cross server stateless, following good distributed systems design principles. This separation of concerns improves reliability and maintainability.

**Development vs. Production Isolation**: Creating Ray clusters in completely isolated Kubernetes environments for development (non-code-reviewed) versus production workloads provides defense in depth for security. This isolation pattern is particularly important in financial services environments.
