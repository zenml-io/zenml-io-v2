---
title: "Reddit’s ML Evolution: Scaling with Ray and KubeRay | Ray Summit 2024"
slug: "reddit-ml-evolution-scaling-with-ray-and-kuberay-reddits-ml-evolution-scaling-with-ray-and-kuberay-ray-summit-2024"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "model-serving"
  - "monitoring"
  - "notebooks"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "airflow"
  - "databricks"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "spark"
  - "terraform"
  - "deployment"
  - "hyperparameter-tuning"
  - "serving"
  - "training"
industryTags: "tech"
company: "Reddit"
companySlug: "reddit"
platformName: "ML Evolution: Scaling with Ray and KubeRay"
contentType: "video"
summary: "Reddit migrated their ML platform called Gazette from a Kubeflow-based architecture to Ray and KubeRay to address fundamental limitations around orchestration complexity, developer experience, and distributed compute. The transition was motivated by Kubeflow's orchestration-first design creating issues with multiple orchestration layers, poor code-sharing abstractions requiring nearly 150 lines for simple components, and additional operational burden for distributed training. By building on Ray's framework-first approach with dynamic runtime environments, simplified job specifications, and integrated distributed compute, Reddit achieved dramatic improvements: training time for large recommendation models decreased by nearly an order of magnitude at significantly lower costs, their safety team could train five to ten more models per month, and researchers fine-tuned hundreds of LLMs in days. For serving, adopting Ray Serve with dynamic batching and vLLM integration increased throughput by 10x at 10x lower cost for asynchronous text classification workloads, while enabling in-house hosting of complex media understanding models that saved hundreds of thousands of dollars annually."
link: "https://www.youtube.com/watch?v=XwrGk0SM6ls"
year: 2024
seo:
  title: "Reddit: Reddit’s ML Evolution: Scaling with Ray and KubeRay | Ray Summit 2024 - ZenML MLOps Database"
  description: "Reddit migrated their ML platform called Gazette from a Kubeflow-based architecture to Ray and KubeRay to address fundamental limitations around orchestration complexity, developer experience, and distributed compute. The transition was motivated by Kubeflow's orchestration-first design creating issues with multiple orchestration layers, poor code-sharing abstractions requiring nearly 150 lines for simple components, and additional operational burden for distributed training. By building on Ray's framework-first approach with dynamic runtime environments, simplified job specifications, and integrated distributed compute, Reddit achieved dramatic improvements: training time for large recommendation models decreased by nearly an order of magnitude at significantly lower costs, their safety team could train five to ten more models per month, and researchers fine-tuned hundreds of LLMs in days. For serving, adopting Ray Serve with dynamic batching and vLLM integration increased throughput by 10x at 10x lower cost for asynchronous text classification workloads, while enabling in-house hosting of complex media understanding models that saved hundreds of thousands of dollars annually."
  canonical: "https://www.zenml.io/mlops-database/reddit-ml-evolution-scaling-with-ray-and-kuberay-reddits-ml-evolution-scaling-with-ray-and-kuberay-ray-summit-2024"
  ogTitle: "Reddit: Reddit’s ML Evolution: Scaling with Ray and KubeRay | Ray Summit 2024 - ZenML MLOps Database"
  ogDescription: "Reddit migrated their ML platform called Gazette from a Kubeflow-based architecture to Ray and KubeRay to address fundamental limitations around orchestration complexity, developer experience, and distributed compute. The transition was motivated by Kubeflow's orchestration-first design creating issues with multiple orchestration layers, poor code-sharing abstractions requiring nearly 150 lines for simple components, and additional operational burden for distributed training. By building on Ray's framework-first approach with dynamic runtime environments, simplified job specifications, and integrated distributed compute, Reddit achieved dramatic improvements: training time for large recommendation models decreased by nearly an order of magnitude at significantly lower costs, their safety team could train five to ten more models per month, and researchers fine-tuned hundreds of LLMs in days. For serving, adopting Ray Serve with dynamic batching and vLLM integration increased throughput by 10x at 10x lower cost for asynchronous text classification workloads, while enabling in-house hosting of complex media understanding models that saved hundreds of thousands of dollars annually."
mlops:
  source: "sqlite"
  entryId: 221
  sourceUrl: "https://www.youtube.com/watch?v=XwrGk0SM6ls"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.618999"
  lastUpdated: "2026-04-14 12:21:23"
---

## Problem Context

Reddit faced significant challenges with their ML platform infrastructure as machine learning matured across the organization. Their original platform, called Gazette, was built on top of Kubeflow, but several fundamental issues emerged at scale that motivated a complete architectural reimagining.

The orchestration-first nature of Kubeflow created cascading complexity issues. Since Airflow served as Reddit's primary workflow orchestration engine for data analytics and ML, and Kubeflow pipelines also functioned as an orchestrator, teams ended up with workflows spanning multiple orchestration systems. In the worst cases, this resulted in Airflow orchestrating Kubeflow pipelines which themselves orchestrated containerized components, introducing significant incidental complexity. While best practices could theoretically prevent these anti-patterns, the platform team found it nearly impossible to enforce these mechanically across dozens of teams in a self-service environment.

Code sharing abstractions in Kubeflow v1 proved extremely cumbersome. The primitive unit was a pipeline that orchestrated containerized components, meaning code sharing happened at the component level. Building even simple components like date math required users to implement component logic with argument parsing, write YAML configuration, and implement a Dockerfile, totaling nearly 150 lines of code. This high barrier made simple operations prohibitively expensive in terms of developer time.

As distributed compute became increasingly important for training, hyperparameter tuning, and batch inference, Kubeflow's approach required layering additional components like the training operator and KServe on top of pipelines. This meant more infrastructure components to maintain, more configuration complexity, and suboptimal abstractions that the platform team had to work around.

The developer experience suffered fundamentally from Kubeflow's container-centric design. The typical development loop required writing component and pipeline code with associated Dockerfiles, building and pushing all component images, then iterating through the pipeline with resource provisioning and image pulls for each component. Any bug or experimental iteration sent developers back to the beginning of this lengthy cycle. When building an ML platform on a system that is primarily a container orchestrator, avoiding containers during development proved extremely difficult.

## Architecture & Design

Reddit's new architecture centers on open-source Ray running on Kubernetes via KubeRay, deployed across non-production and production Google Kubernetes Engine (GKE) clusters managed by Reddit's core infrastructure platform team. The design philosophy shifted from orchestration-first to framework-first, treating Ray jobs as primitives rather than pipelines.

The infrastructure provisioning model starts with team onboarding to the training platform, where teams provision what Reddit calls a "Ray environment." This environment represents a bag of infrastructure components including GCP resources like projects, BigQuery datasets, Cloud Storage buckets, and service accounts, along with Kubernetes resources like namespaces and service accounts, plus configuration for Reddit's internal networking.

A key architectural abstraction is the "Ray node class," which bundles specific resource configurations. Rather than allowing users to specify arbitrary resource mixes, the platform team provides predefined node classes centered around GPU types and counts, with appropriate CPU and RAM allocations. This constraint significantly improved utilization and efficiency, particularly helpful when users lack deep expertise in resource planning.

For development and experimentation, Reddit created "Ray Workspaces"—semi-long-running Ray clusters with persistent volume mounts. These workspaces provide JupyterLab access running on the head node via Reddit's internal network, and support remote job submissions from local machines. The "semi-long-running" designation reflects the use of Ray's autoscaler to spin down worker nodes automatically after periods of inactivity, reducing resource waste while maintaining quick access for active development.

The production architecture separates concerns differently, running completely ephemeral Ray clusters where each job execution spins up a dedicated cluster that tears down upon completion. This approach provides better isolation and resource management for production workloads compared to the shared workspace model used in development.

A custom control plane orchestrates production Ray job executions, consisting of a lightweight API server and a custom Gazette Ray job Kubernetes controller. This controller orchestrates the KubeRay RayJob resource alongside other required infrastructure components, particularly Prometheus pod monitors for ingesting metrics into Reddit's observability system. The architecture integrates with Airflow through a custom operator that communicates with the control plane API server, which then creates Gazette Ray job resources managed by the controller.

Docker images use a multi-layered approach. The platform team provides pre-built base images for workspaces, then leverages Ray's dynamic runtime environments to install job dependencies at runtime, completely avoiding Docker builds during the development loop. For production, jobs are versioned, built, and released via git tags in a Ray jobs monorepo, with CI/CD abstractions provided by the platform team for building and publishing job images with baked-in dependencies.

For serving, Reddit uses Ray Serve deployed on the same KubeRay infrastructure. The serving architecture leverages vLLM as a service wrapper for LLM deployments, with model handlers defining custom inference logic. Services use tensor parallel inference across multiple GPUs on single nodes configured through Ray Serve placement group bundles.

## Technical Implementation

The core technology stack centers on open-source Ray and KubeRay running on Google Kubernetes Engine clusters. Reddit maintains separate non-production and production GKE clusters, with infrastructure managed by their core platform team.

Reddit formalized their approach through the "Ray job spec," an opinionated structure that all workloads must conform to for platform execution. The spec requires three core components: a Python script serving as the job entry point, a pyproject.toml and poetry.lock file specifying the job environment using Poetry for dependency management, and three basic configuration files specifying image building, Ray cluster provisioning, and job execution parameters.

While minimizing Docker exposure for developers, the platform provides escape hatches for edge cases requiring custom Dockerfiles, such as jobs needing additional system dependencies. These custom Dockerfiles must use supported base images provided by the platform team.

Code sharing follows a three-tier model. Project libraries represent shared code at the project level used by multiple jobs within a single Ray project, treated as local modules without versioning or publishing for rapid iteration. Shared libraries are code shared across different Ray projects, versioned and packaged as private Python packages installed via Poetry alongside external dependencies. The Gazette Ray SDK, owned by the ML platform team, provides platform-level integrations like functions to determine execution environment (non-prod vs prod), enabling single-codebase development with environment-specific behavior through control flow logic.

The CLI tooling provides the primary developer interface. For cluster management, users can create, delete, update, and describe Ray workspace clusters. Utility commands abstract access to head nodes running on Kubernetes for development tasks. The workspace creation command allows configuration of Ray and Python versions, head node resources, and worker node class selection with worker counts.

A critical innovation is the Ray job submit wrapper command that bridges development and production workflows. When a user runs this command locally pointing to their job, it starts a background process proxying the remote Ray cluster, parses job dependencies to build a dynamic runtime environment, extracts entry point arguments and environment variables from configuration, and constructs and executes a ray job submit command against the user's workspace cluster. This ensures development execution uses the same source of truth as production.

Production deployment follows a GitOps model where users tag releases in the Ray jobs monorepo, triggering CI/CD pipelines that build images with baked-in dependencies and publish both images and configuration. The custom Airflow operator provides an extremely simple API—users specify only the job's project name and version, with support for tilde version ranges allowing minor and patch releases without re-releasing Airflow DAGs. Dynamic overrides for job and cluster configuration are supported but optional.

For serving workloads, the ML serving team provides a vLLM-based service wrapper that ML engineers use to define model handlers with custom arguments. Handlers can be developed interactively against the same Ray workspaces used for training development. New model servers deploy through simple configuration changes rather than code deployments.

Debugging tools include access to the Ray dashboard via Reddit's internal network, the Ray debugger, test timeline, cProfile, and TensorBoard profiler. The platform prevents non-interactive tasks from scheduling on head nodes to preserve JupyterLab performance.

## Scale & Performance

The migration to Ray delivered substantial quantitative improvements across multiple dimensions. For large recommendation system models, moving to distributed training on Ray reduced training time by nearly an order of magnitude while simultaneously achieving significantly lower costs, though specific numbers weren't disclosed.

Throughput improvements were dramatic. The safety team, enabled by the improved developer experience, increased their model training cadence by five to ten models per month. An ML research-focused team fine-tuned hundreds of LLMs in just a few days, a task that would have been prohibitively slow with the previous Kubeflow-based infrastructure.

For serving workloads, the results were even more striking. Moving larger asynchronous text classification use cases to Ray Serve with GPUs and dynamic batching increased throughput by almost 10x while reducing costs by 10x. This dramatic efficiency improvement came from better GPU utilization through dynamic request batching.

Hosting large complex media understanding models in-house on Ray Serve infrastructure saved hundreds of thousands of dollars per year compared to external API costs. The exact figure wasn't specified, but the in-house deployment proved substantially more economical while providing equivalent functionality.

During Reddit's most recent "Snoose Week" hackathon, the LLM playground API built on Ray Serve handled approximately 400,000 requests, demonstrating both the reliability of the infrastructure and the accessibility of the developer experience for experimentation.

Fine-tuning smaller open-source models on Ray infrastructure consistently outperformed out-of-the-box large third-party foundation models, creating significant value through better model quality at lower cost compared to commercial API services.

Ray node classes center around GPU types and counts. While specific configurations weren't fully detailed, examples included node classes defined by GPU type (like specific NVIDIA GPU models) with appropriate CPU and RAM bundles, designed to match common workload requirements.

## Trade-offs & Lessons

Reddit's experience reveals several important lessons about building ML platforms on Ray versus Kubeflow. The framework-first approach proved fundamentally better aligned with ML workflows than orchestration-first systems, particularly when integrating with existing workflow orchestration tools like Airflow. Making the primitive unit a job rather than a pipeline dramatically simplified integration patterns and eliminated the complexity of orchestrating orchestrators.

The dynamic runtime environment approach, while avoiding Docker during development, represents a trade-off. Development uses runtime dependency installation while production bakes dependencies into images. This creates some risk of environment drift, though using the same source of truth (Poetry lockfiles) in both contexts mitigates this concern. The team found this trade-off worthwhile for the dramatic improvement in development velocity.

Constraining users through Ray node classes rather than allowing arbitrary resource specification proved highly beneficial for utilization and efficiency. When users lack deep expertise in resource planning, guided constraints produce better outcomes than complete flexibility. This represents a thoughtful balance between flexibility and operational efficiency.

The semi-long-running workspace model with autoscaling strikes a balance between instant availability and resource efficiency. Workers scale down after inactivity, reducing waste, while head nodes remain available for quick iteration. The team noted plans to potentially bring some of the ephemeral production workflow into the development path for job queuing scenarios.

Debugging distributed workloads emerged as the sharpest change for users migrating from Kubeflow. Distributed execution is inherently harder to reason about regardless of framework. Reddit's approach combined exposing Ray's debugging tools with education, but acknowledged this remains an ongoing challenge rather than a solved problem. Multiple user requests for GPUs on head nodes for local iteration before transitioning to distributed mode indicate users still seek escape hatches from distributed complexity.

The team identified several areas needing further investment. Multi-tenancy improvements are needed, particularly around virtual quotas for shared GPU pools. Job queuing with priority, preemption, and gang scheduling would improve scheduling under resource constraints and boost utilization. Support for heterogeneous clusters with multiple worker node groups would enable more flexible cluster shapes—currently users can only configure one worker node group.

For serving, Reddit deliberately chose not to adopt KServe despite using KubeRay, determining it unnecessary for their current maturity level. They lack multi-node distributed serving use cases that would justify the additional complexity. However, they're monitoring improvements in Ray Serve's reliability on KubeRay as this evolves.

The decision to meet users where they are by providing Airflow integration rather than forcing workflow changes proved valuable. Even with superior technology, adoption depends on minimizing disruption to existing workflows.

Code organization into project libraries (local modules), shared libraries (versioned packages), and platform SDK represents a practical tiered approach to code reuse that balances iteration speed with proper versioning where needed.

The experience validates that building on actively developed open-source projects with demonstrated scale at other companies reduces risk. Ray's active development team and proven track record at other organizations gave Reddit confidence in the investment, which has been borne out by results.

Load balancing and resource utilization in Ray Serve with vLLM and placement groups worked well for Reddit's relatively low-scale, evergreen serving use cases, though they anticipate challenges may emerge as scale increases. The combination of dynamic batching, tensor parallelism via vLLM, and Ray Serve's deployment model proved highly effective for current needs.

Overall, Reddit's migration demonstrates that choosing infrastructure aligned with the fundamental shape of ML workflows—distributed compute over container orchestration—can unlock order-of-magnitude improvements in both developer productivity and computational efficiency. The investment in developer experience through simplified abstractions, minimal configuration, and local-feeling workflows paid substantial dividends in team velocity and experimentation throughput.
