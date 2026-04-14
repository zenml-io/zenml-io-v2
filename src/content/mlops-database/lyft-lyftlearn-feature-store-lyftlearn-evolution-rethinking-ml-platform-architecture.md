---
title: "LyftLearn Evolution: Rethinking ML Platform Architecture"
slug: "lyft-lyftlearn-feature-store-lyftlearn-evolution-rethinking-ml-platform-architecture"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "sagemaker"
  - "spark"
  - "terraform"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Lyft"
companySlug: "lyft"
platformName: "LyftLearn + Feature Store"
contentType: "blog"
summary: "Lyft evolved their ML platform LyftLearn from a fully Kubernetes-based architecture to a hybrid system that combines AWS SageMaker for offline training workloads with Kubernetes for online model serving. The original architecture running thousands of daily training jobs on Kubernetes suffered from operational complexity including eventually-consistent state management through background watchers, difficult cluster resource optimization, and significant development overhead for each new platform feature. By migrating the offline compute stack to SageMaker while retaining their battle-tested Kubernetes serving infrastructure, Lyft reduced compute costs by eliminating idle cluster resources, dramatically improved system reliability by delegating infrastructure management to AWS, and freed their platform team to focus on building ML capabilities rather than managing low-level infrastructure. The migration maintained complete backward compatibility, requiring zero changes to ML code across hundreds of users."
link: "https://eng.lyft.com/lyftlearn-evolution-rethinking-ml-platform-architecture-547de6c950e1"
year: 2025
seo:
  title: "Lyft: LyftLearn Evolution: Rethinking ML Platform Architecture - ZenML MLOps Database"
  description: "Lyft evolved their ML platform LyftLearn from a fully Kubernetes-based architecture to a hybrid system that combines AWS SageMaker for offline training workloads with Kubernetes for online model serving. The original architecture running thousands of daily training jobs on Kubernetes suffered from operational complexity including eventually-consistent state management through background watchers, difficult cluster resource optimization, and significant development overhead for each new platform feature. By migrating the offline compute stack to SageMaker while retaining their battle-tested Kubernetes serving infrastructure, Lyft reduced compute costs by eliminating idle cluster resources, dramatically improved system reliability by delegating infrastructure management to AWS, and freed their platform team to focus on building ML capabilities rather than managing low-level infrastructure. The migration maintained complete backward compatibility, requiring zero changes to ML code across hundreds of users."
  canonical: "https://www.zenml.io/mlops-database/lyft-lyftlearn-feature-store-lyftlearn-evolution-rethinking-ml-platform-architecture"
  ogTitle: "Lyft: LyftLearn Evolution: Rethinking ML Platform Architecture - ZenML MLOps Database"
  ogDescription: "Lyft evolved their ML platform LyftLearn from a fully Kubernetes-based architecture to a hybrid system that combines AWS SageMaker for offline training workloads with Kubernetes for online model serving. The original architecture running thousands of daily training jobs on Kubernetes suffered from operational complexity including eventually-consistent state management through background watchers, difficult cluster resource optimization, and significant development overhead for each new platform feature. By migrating the offline compute stack to SageMaker while retaining their battle-tested Kubernetes serving infrastructure, Lyft reduced compute costs by eliminating idle cluster resources, dramatically improved system reliability by delegating infrastructure management to AWS, and freed their platform team to focus on building ML capabilities rather than managing low-level infrastructure. The migration maintained complete backward compatibility, requiring zero changes to ML code across hundreds of users."
mlops:
  source: "sqlite"
  entryId: 165
  sourceUrl: "https://eng.lyft.com/lyftlearn-evolution-rethinking-ml-platform-architecture-547de6c950e1"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.615880"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Lyft's ML infrastructure powers critical business functions including dispatch, pricing optimization, fraud detection, and support automation. The platform serves thousands of production models making hundreds of millions of real-time predictions daily, supported by thousands of daily training jobs. As the company's scale grew, the operational complexity of their infrastructure became a significant bottleneck to future growth and innovation.

The original LyftLearn architecture ran entirely on Kubernetes for both offline training workloads (LyftLearn Compute) and online model serving (LyftLearn Serving). While this unified infrastructure approach initially provided benefits, the offline stack became increasingly difficult to operate as workload diversity and scale increased. The platform team identified three critical pain points that were consuming their engineering capacity:

**The Feature Tax**: Every new ML capability required building and maintaining custom Kubernetes orchestration logic. Adding distributed hyperparameter optimization using Katib/Vizier or distributed training with Kubeflow operators meant developing comprehensive Kubernetes resource management for each feature. This resulted in the team spending more time building infrastructure plumbing than actual platform capabilities.

**Managing Eventually-Consistent State**: To synchronize their platform database with Kubernetes cluster state, the team maintained a fleet of background watcher scripts that continuously monitored Kubernetes events. These watchers handled job status changes, container updates, ingress resource availability, EFS cleanup, spending tracking, analytics events, and stats publishing. The eventually-consistent nature of Kubernetes created operational complexity where training containers could succeed while Kubernetes marked jobs as failed due to sidecar issues, event streams would timeout or arrive out of order, and container statuses could transition unpredictably. Managing state consistency for thousands of daily jobs required considerable on-call attention and directly impacted development velocity.

**Cluster Management Complexity**: Optimizing resource utilization for heterogeneous ML workloads proved persistently challenging. ML jobs often have distinct phases with conflicting resource profiles—data processing tends to be memory-intensive while model training is CPU- or GPU-intensive. Users could request any CPU/memory combination (like 16 CPUs with 512GB RAM for preprocessing or 64 CPUs with 128GB RAM for training), which didn't map cleanly to fixed AWS instance types. This flexibility made cluster capacity planning and node utilization optimization difficult. Managing resource contention during bursts of highly parallel workloads and ensuring the cluster autoscaler could provision capacity quickly enough required continuous attention.

The fundamental challenge was clear: as the platform scaled, so did the operational investment required to manage low-level infrastructure, limiting the team's ability to innovate on actual ML platform capabilities.

## Architecture & Design

LyftLearn comprises three integrated products that together manage the complete ML lifecycle:

**LyftLearn Compute (Offline Stack)**: Handles model development and training workloads. ML practitioners use JupyterLab environments to prototype models, then run training jobs, batch processing, and hyperparameter optimization at scale. These workloads are elastic and on-demand—they spin up when needed, process large datasets, and terminate when complete.

**LyftLearn Serving (Online Stack)**: Powers production inference, serving millions of predictions per minute with millisecond latency. It provides online model serving with real-time ML capabilities, automated deployment and promotion workflows, and online validation to ensure model quality before production traffic.

**LyftLearn Observability**: Monitors model health and detects degradation across the platform, tracking performance drift, identifying anomalies, scoring model health, and monitoring model activity.

### Original Kubernetes Architecture

The original LyftLearn Compute architecture ran entirely on Kubernetes with several key components:

**LyftLearn Service** served as the backend API, receiving requests from three primary sources: the LyftLearn UI for ad-hoc jobs, Airflow DAGs for scheduled training and batch prediction pipelines, and CI/CD pipelines that registered models with their Docker images during deployments. It managed model configurations, job metadata, and coordinated with downstream services.

**K8s Orchestration Service** translated job requests into Kubernetes resources. When receiving a training job request, it would insert the job record in the LyftLearn database for watchers to track, construct the complete Kubernetes Job specification including containers, resource requests, environment variables, sidecars, and references to Docker images in AWS ECR, then submit the job to the Kubernetes cluster.

**Background Watchers** ran continuously to manage job lifecycle and infrastructure. The team maintained multiple worker scripts handling job status monitoring, container status tracking, ingress status management for notebook endpoints, job cleanup from Kubernetes, analytics event capture, EFS cleanup, spending tracking, and stats publishing.

Creating any job required assembling a complete set of Kubernetes resources: Pod specifications with init and sidecar containers for secrets and metrics, ConfigMaps for hyperparameters, Secrets for credentials, PersistentVolumeClaims for notebook storage, Services and Ingresses for network access, and RBAC policies including ServiceAccounts, Roles, and RoleBindings for cluster permissions.

This architecture delivered some genuine advantages. The unified infrastructure stack meant ML workloads ran on the same Kubernetes infrastructure as Lyft's production services, leveraging existing networking, observability tooling, security patterns, and operational processes. Jobs could launch in 30-45 seconds on existing cluster infrastructure with cached images, much faster than on-demand compute provisioning. The flexible resource specifications allowed precise allocation—engineers could request any CPU/memory combination their workload needed.

### Hybrid Architecture Design

The evaluation of managed services led to a strategic decision: adopt AWS SageMaker for LyftLearn Compute where operational complexity was highest, and retain Kubernetes for LyftLearn Serving where their existing solution was already highly reliable and efficient.

For the online serving stack, adopting SageMaker would have required fundamental re-architecture. Model deployment, promotion, and serving solutions were deeply integrated with Lyft's internal tooling. Observability relied on their standard monitoring infrastructure, not AWS CloudWatch. Client services communicated via Envoy, not SageMaker's specific invocation and authentication patterns. The existing Kubernetes-based serving stack was exceptionally reliable and efficient, performing well within required latency requirements.

For the offline compute stack, SageMaker addressed the core pain points directly. It offered out-of-the-box support for various job types, eliminating the need to build custom Kubernetes orchestration for new capabilities. Its native state management would eliminate the custom watcher system. Its elastic compute model would handle capacity automatically, removing complex cluster planning and autoscaling management. While SageMaker's per-instance costs were higher, the Total Cost of Ownership was clearly lower when accounting for eliminated idle compute, cluster administration overhead, and reduced infrastructure firefighting.

The resulting hybrid architecture features:

**LyftLearn Serving on Kubernetes**: A distributed architecture for real-time inference where dozens of ML teams deploy their own model serving services, each containing their team's models with custom prediction handlers and configurations, handling production predictions for specific use cases like pricing, fraud detection, dispatch, and ETA. The Model Registry Service coordinates model deployments across these services.

**LyftLearn Compute on SageMaker**: The SageMaker Manager Service orchestrates training, batch processing, hyperparameter optimization, and JupyterLab notebooks through AWS SDK calls. EventBridge and SQS provide event-driven state management, replacing the background watchers that plagued the original architecture.

Integration happens through the Model Registry and S3. Training jobs in SageMaker generate model binaries and save them to S3. The Model Registry tracks these artifacts, and model serving services pull them for deployment. Docker images flow from CI/CD through ECR to both platforms. The LyftLearn database maintains job metadata and model configurations across both stacks.

## Technical Implementation

The migration required solving complex systems engineering challenges while maintaining the core principle: replace the execution engine from Kubernetes to SageMaker while keeping ML workflows completely unchanged. The actual ML code—Python scripts that train models, process data, and run inference—had to work identically on both platforms with zero code changes.

### Environmental Parity and Compatibility Layer

The team built a comprehensive compatibility layer into cross-platform base Docker images to replicate Kubernetes runtime behavior:

**Credentials Management**: In Kubernetes, credentials from Lyft's internal secret management solution Confidant were automatically injected at pod creation. SageMaker has no equivalent mechanism. The team built a custom solution as part of the container entrypoint script that fetches credentials at job startup and exposes them exactly as Kubernetes did, ensuring user code worked identically on both platforms.

**Environment Variables**: SageMaker constrains the number of environment variables passed via its API. The team moved most environment setup to runtime, fetching additional configuration at job startup similar to their credential solution.

**Metrics Collection**: Kubernetes workloads sent StatsD metrics to sidecar containers. SageMaker has no sidecar support, so the team reconfigured the runtime and networking to connect directly to their metrics aggregation gateway while keeping the user-facing API unchanged.

**Hyperparameters**: In Kubernetes, hyperparameters were stored in ConfigMaps and mounted as files. SageMaker's API has much stricter size limits than Kubernetes, making direct parameter passing impossible for their use cases. The team developed a solution to upload hyperparameters to AWS S3 before each job and have SageMaker automatically download them to its standard input path, overcoming the API limitation while using SageMaker's native capabilities.

### Cross-Platform Base Images

The team developed new SageMaker-compatible base images to replace their old LyftLearn images with the critical requirement that these images must work across the entire hybrid platform—in SageMaker for training and batch processing, and in Kubernetes for serving. This meant the same Docker image that trained a model would also serve it, guaranteeing consistency. These base images serve as a foundation that teams extend with their own dependencies:

**LyftLearn image**: For traditional ML workloads
**LyftLearn Distributed image**: Adds Spark ecosystem integration for distributed processing
**LyftLearn DL image**: Adds GPU support and libraries for deep learning workloads

The Spark-compatible images presented the biggest challenge, needing to maintain full compatibility with existing Spark infrastructure including custom wrappers, executor configurations, and JAR dependencies, while running correctly in three distinct execution contexts: SageMaker Jobs, SageMaker Studio notebooks, and model serving in Kubernetes. These images detect their execution environment at runtime and adapt automatically, configuring different environment variables, using different users and permissions, and setting up Spark appropriately for each context while preserving an identical core runtime.

### Performance Optimization

**Startup Time Optimization**: In Kubernetes, notebooks, training, and processing jobs could start quickly because nodes were warm with significant cluster resources sitting idle. SageMaker provisions instances on-demand—no idle waste, but slower startup. For JupyterLab notebooks, the team adopted SOCI (Seekable Open Container Initiative) indexes, which enable lazy loading where SageMaker fetches only the filesystem layers needed immediately rather than pulling entire multi-gigabyte images. This cut notebook startup times by 40-50%. For training and batch processing jobs where SOCI wasn't available, they optimized Docker image sizes, which was sufficient for most workloads. For the most latency-sensitive workflows where some models retrain every 15 minutes, they adopted SageMaker's warm pools which keep instances alive between runs, achieving Kubernetes-like startup times with fully serverless infrastructure.

### Cross-Cluster Networking for Spark

Many ML practitioners rely heavily on interactive Spark experiences in JupyterLab notebooks. In Kubernetes this was simple with driver and executors in the same cluster. The new architecture required the Spark driver to run in a SageMaker Studio notebook while executors remained on their EKS Kubernetes cluster.

This hybrid model presented a major networking challenge. Spark client mode requires bidirectional communication: the driver in SageMaker must call the EKS API Server Endpoint to request executor pods, and executor pods must establish inbound connections directly back to the driver's SageMaker Instance ENI. Default SageMaker Studio networking blocked these critical inbound connections, breaking Spark's communication model. This was a fundamental blocker that could jeopardize the entire migration. The team partnered closely with AWS, which introduced networking changes to the Studio Domains in their account that enabled the required inbound traffic from their EKS cluster. Despite the cross-cluster setup, Spark performance remained identical to the original Kubernetes environment.

### Migration Rollout Strategy

The team rolled out changes repository by repository, running both infrastructures in parallel. The approach was systematic: build a comprehensive compatibility layer that made SageMaker feel like Kubernetes to ML code, validate each workflow type thoroughly, then migrate teams incrementally. Each repository required minimal changes—typically updating configuration files and workflow APIs—while actual ML code remained untouched.

## Scale & Performance

LyftLearn operates at significant scale across Lyft's ML operations:

**Production Scale**: The platform serves thousands of production models making hundreds of millions of real-time predictions per day. Online serving delivers millions of predictions per minute with millisecond latency requirements. The offline stack handles thousands of daily training jobs that keep ML models fresh and accurate.

**User Base**: The platform supports hundreds of data scientists and ML engineers across dozens of teams, each with their own model serving services handling predictions for specific use cases including pricing, fraud detection, dispatch optimization, and ETA prediction.

**Startup Performance**: The original Kubernetes architecture achieved job startup times of 30-45 seconds on existing cluster infrastructure with cached images. After migration, SOCI indexes reduced JupyterLab notebook startup times by 40-50%. For the most latency-sensitive workflows where models retrain every 15 minutes, SageMaker warm pools maintained Kubernetes-comparable startup performance.

**Cost Optimization**: The migration reduced ML training and batch processing compute costs by eliminating idle cluster resources and moving to on-demand provisioning. While SageMaker's per-instance costs were higher than running instances on Kubernetes, the Total Cost of Ownership was clearly lower when accounting for eliminated idle compute, reduced cluster administration overhead, and freed engineering capacity.

**Reliability Improvements**: System reliability improved significantly after migration, with infrastructure-related incidents becoming rare occurrences. The elimination of eventually-consistent state management through background watchers removed a major source of operational complexity and on-call burden.

## Trade-offs & Lessons

### What Worked Well

**Strategic Platform Decoupling**: The decision to treat offline compute and online serving as fundamentally different workloads with different operational characteristics proved correct. Offline workloads benefit from elastic, cost-efficient compute that scales to zero between jobs. Online model serving requires always-on infrastructure with strict latency guarantees and tight operational control. Recognizing these differences enabled the team to adopt different infrastructure strategies optimized for each use case.

**Compatibility Investment**: The cross-platform base images were the foundation of the migration's success. They enabled gradual, repository-by-repository migration with easy rollbacks. Most importantly, they guaranteed that the same Docker image for model training in SageMaker would serve it in Kubernetes, eliminating train-serve inconsistencies. The upfront investment in cross-platform compatibility paid dividends throughout the migration.

**Zero User Disruption**: The migration succeeded because the platform team absorbed all complexity. Users didn't rewrite ML code or learn SageMaker APIs—they continued their work while the platform team handled secrets management, networking, metrics collection, and environmental parity. This allowed the platform to evolve infrastructure while preserving user velocity and avoiding disruptions across hundreds of engineers.

### Key Challenges

**Environmental Parity Complexity**: Replicating the Kubernetes runtime environment in SageMaker required solving numerous technical challenges across credentials injection, environment variables, metrics collection, and hyperparameter management. Each difference between platforms required custom solutions built into the compatibility layer.

**Spark Networking**: The cross-cluster Spark architecture where drivers run in SageMaker while executors run in Kubernetes was nearly a showstopper. The networking requirements for bidirectional communication between SageMaker and EKS didn't work with default SageMaker Studio networking. Resolution required close partnership with AWS to modify networking configurations.

**Startup Time Trade-offs**: Moving from warm Kubernetes nodes to on-demand SageMaker provisioning initially increased startup times. This required multiple optimization strategies including SOCI indexes for notebooks, Docker image optimization for most workloads, and warm pools for latency-sensitive jobs that retrain frequently.

### Insights for Practitioners

**Build versus Buy is Pragmatic**: The team adopted SageMaker for training because managing custom batch compute infrastructure was consuming engineering capacity better spent on ML platform capabilities. They kept their serving infrastructure custom-built because it delivered the cost efficiency and control they needed. The decision wasn't ideological—it was about choosing the right tool for each specific workload.

**Abstract Complexity from Users**: The platform's job is to evolve infrastructure while preserving user velocity and avoiding disruptions, not to distribute migration work across teams. Forcing hundreds of users across dozens of teams to rewrite business-critical ML workflows would have made the migration untenable.

**Compatibility Enables Incremental Migration**: Building cross-platform base images that work in both SageMaker and Kubernetes enabled the gradual, low-risk migration approach. The same Docker image training a model and serving it eliminates an entire class of train-serve skew problems.

**Total Cost of Ownership Beyond Infrastructure Costs**: While SageMaker's per-instance costs were higher than Kubernetes, the TCO was clearly lower. Eliminating idle compute, cluster administration overhead, and constant infrastructure firefighting reduced operational burden and freed the platform team to focus on building ML capabilities rather than managing infrastructure. The best platform engineering isn't about the technology stack you run—it's about the complexity you hide and the velocity you unlock.
