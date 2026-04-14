---
title: "How Spotify sped up ML research and prototyping with Ray (YouTube)"
slug: "spotify-hendrix-ray-based-ml-platform-how-spotify-sped-up-ml-research-and-prototyping-with-ray-youtube"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "airflow"
  - "dbt"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "ray"
  - "spark"
  - "terraform"
  - "ab-testing"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Spotify"
companySlug: "spotify"
platformName: "Hendrix + Ray-based ML platform"
contentType: "video"
summary: "Spotify's ML platform team introduced Ray to complement their existing TFX-based Kubeflow platform, addressing limitations in flexibility and research experimentation capabilities. The existing Kubeflow platform (internally called \"qflow\") worked well for standardized supervised learning on tabular data but struggled to support diverse ML practitioners working on non-standard problems like graph neural networks, reinforcement learning, and large-scale feature processing. By deploying Ray on managed GKE clusters with KubeRay and building a lightweight Python SDK and CLI, Spotify enabled research scientists and data scientists to prototype and productionize ML workflows using popular open-source libraries. Early proof-of-concept projects demonstrated significant impact: a GNN-based podcast recommendation system went from prototype to online testing in under 2.5 months, offline evaluation workflows achieved 6x speedups using Modin, and a daily batch prediction pipeline was productionized in just two weeks for A/B testing at MAU scale."
link: "https://www.youtube.com/watch?v=WgWInt6wZts"
year: 2023
seo:
  title: "Spotify: How Spotify sped up ML research and prototyping with Ray (YouTube) - ZenML MLOps Database"
  description: "Spotify's ML platform team introduced Ray to complement their existing TFX-based Kubeflow platform, addressing limitations in flexibility and research experimentation capabilities. The existing Kubeflow platform (internally called \"qflow\") worked well for standardized supervised learning on tabular data but struggled to support diverse ML practitioners working on non-standard problems like graph neural networks, reinforcement learning, and large-scale feature processing. By deploying Ray on managed GKE clusters with KubeRay and building a lightweight Python SDK and CLI, Spotify enabled research scientists and data scientists to prototype and productionize ML workflows using popular open-source libraries. Early proof-of-concept projects demonstrated significant impact: a GNN-based podcast recommendation system went from prototype to online testing in under 2.5 months, offline evaluation workflows achieved 6x speedups using Modin, and a daily batch prediction pipeline was productionized in just two weeks for A/B testing at MAU scale."
  canonical: "https://www.zenml.io/mlops-database/spotify-hendrix-ray-based-ml-platform-how-spotify-sped-up-ml-research-and-prototyping-with-ray-youtube"
  ogTitle: "Spotify: How Spotify sped up ML research and prototyping with Ray (YouTube) - ZenML MLOps Database"
  ogDescription: "Spotify's ML platform team introduced Ray to complement their existing TFX-based Kubeflow platform, addressing limitations in flexibility and research experimentation capabilities. The existing Kubeflow platform (internally called \"qflow\") worked well for standardized supervised learning on tabular data but struggled to support diverse ML practitioners working on non-standard problems like graph neural networks, reinforcement learning, and large-scale feature processing. By deploying Ray on managed GKE clusters with KubeRay and building a lightweight Python SDK and CLI, Spotify enabled research scientists and data scientists to prototype and productionize ML workflows using popular open-source libraries. Early proof-of-concept projects demonstrated significant impact: a GNN-based podcast recommendation system went from prototype to online testing in under 2.5 months, offline evaluation workflows achieved 6x speedups using Modin, and a daily batch prediction pipeline was productionized in just two weeks for A/B testing at MAU scale."
mlops:
  source: "sqlite"
  entryId: 183
  sourceUrl: "https://www.youtube.com/watch?v=WgWInt6wZts"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.617024"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Spotify's machine learning applications power critical product features including personalized content recommendations, search ranking optimization, and music discovery. The company's centralized ML platform team had built a successful production system called "qflow platform" based on TFX (TensorFlow Extended) and Kubeflow, which provided a standardized, opinionated framework for building ML pipelines with managed execution clusters.

While this TFX-based approach excelled at solving standardized supervised learning problems on tabular datasets, the platform team consistently heard feedback that it was difficult for ML research and model experimentation. Several pain points emerged as the number of ML practitioners and applications grew at Spotify:

**Inflexibility of TFX**: The component-based, opinionated framework was optimized for production ML systems but constrained exploratory research. The closed ecosystem made it difficult to integrate with popular open-source tools and state-of-the-art ML packages that researchers wanted to use.

**Long tail problem**: As ML applications diversified beyond standardized use cases, the platform struggled to provide tools for the breadth of problems teams needed to solve. Non-standard workflows like graph neural networks for podcast recommendations, reinforcement learning for radio stations, and large-scale A/B test segment analysis couldn't fit into the TFX paradigm.

**Developer experience for research**: The existing stack involved multiple complex layers including TFX DSL, Kubeflow, Kubernetes, and various GCP services. When things broke, researchers spent significant time debugging across these different layers rather than iterating on actual ML problems. The learning curve required researchers to understand Kubernetes, component execution logic, and distributed computing infrastructure.

**Need for diverse personas**: Modern ML systems require contributions from research scientists prototyping ideas, data engineers optimizing features, ML engineers productionizing models, data scientists analyzing A/B tests, and backend engineers serving models. The platform needed to accommodate all these personas with appropriate tools.

## Architecture & Design

Spotify's Ray platform implementation follows a hybrid, multi-tenant architecture designed to centralize infrastructure management while giving individual teams dedicated compute resources:

**Managed Ray Infrastructure Layer**: The foundation is KubeRay deployed on Google Kubernetes Engine (GKE) multi-zonal clusters. Each team receives their own dedicated Kubernetes namespace to host Ray clusters for running Ray applications. The platform team uses the open-source KubeRay operator to manage Ray clusters within each namespace. This approach provides resource isolation and granular authorization through Kubernetes RBAC, allowing teams to control Ray cluster CRDs without access to lower-level Kubernetes resources like the ray-system namespace or DaemonSets.

**Compute Infrastructure**: The GKE clusters are configured with multiple node pools featuring different GPU types including NVIDIA T4s and V100s, designed to scale to substantial sizes. A key optimization was enabling GCP's image streaming feature to minimize container startup times and provide fast scaling experiences when workers spin up.

**Spotify Ray SDK and CLI**: A deliberately thin Python SDK and command-line interface abstracts away Kubernetes complexity from data scientists and researchers. The CLI provides intuitive commands for cluster lifecycle management (create, list, describe, delete, scale) without requiring users to interact with kubectl or understand Kubernetes YAML. The SDK offers programmatic equivalents to CLI operations for users preferring Python-based workflows.

**Multi-tenant Design**: The architecture uses Kubernetes namespaces as the primary isolation boundary. Resource quotas are set at the namespace level with defaults for most teams, and mission-critical workloads can request elevated quotas with approval. This design centralizes infrastructure management and integrations while letting teams focus on business problems rather than infrastructure operations.

**Integration Points**: The platform is designed to integrate with Spotify's broader ML ecosystem including internal metadata systems, experiment tracking dashboards, feature stores, workflow orchestration and scheduling (via Apache Airflow integration), and internal data endpoints. A notable upcoming integration is with Flyte for scheduled workflow execution, where ephemeral Ray clusters are created for job duration and torn down afterward.

## Technical Implementation

**Infrastructure Foundation**: The deployment uses KubeRay to manage Ray clusters on multi-zonal GKE clusters within GCP. Each team's namespace can host dedicated Ray clusters configured through the KubeRay operator. The infrastructure leverages Kubernetes resource quotas for capacity management and RBAC for authorization controls.

**CLI and SDK Implementation**: Written entirely in Python, the tooling provides commands like `s-ray create cluster`, `s-ray list`, `s-ray describe cluster`, and `s-ray scale`. The create command supports flags like `--with-tutorials` that automatically spins up a Jupyter notebook server with pre-loaded tutorial notebooks demonstrating Ray capabilities. The describe command outputs human-readable information including head node IP, notebook server and dashboard URLs, head group configuration, worker group details with replica counts, and GPU/CPU resource allocations.

**Flexibility for Power Users**: While abstracting Kubernetes complexity for most users, the platform allows power users to drop down to YAML-level configuration for advanced scenarios requiring multiple worker groups or specific cluster requirements. Users can edit YAML files and pass them to the CLI for cluster creation.

**Container Image Strategy**: The platform provides base Ray images with added dependencies like OpenVSCode Server for development. Teams can create custom images by building on top of base images when they need specialized dependencies. Some teams with advanced requirements maintain their own base images and install Ray on top. The KubeRay compute templates feature allows pre-definition of worker type configurations stored as Kubernetes ConfigMaps for reuse.

**Resource Configuration**: Ray's unified API simplifies distributed computing resource configuration. Users specify CPU and GPU counts for their workloads without deep Kubernetes knowledge. Ray 2.0's scaling config enables distributed training across frameworks including XGBoost, TensorFlow, and PyTorch with consistent interfaces.

**Use Case Templates**: The platform roadmap includes use-case-specific setups with pre-installed dependencies, tailored compute templates for feature processing versus training versus evaluation workloads, and framework-specific tutorials for tools like HuggingFace, XGBoost, and TensorFlow.

## Scale & Performance

**Speedup Metrics from POC Projects**: Early proof-of-concept work demonstrated substantial performance improvements. One user accelerated their offline evaluation workflow by 6x using Modin and Ray's dataset library on large datasets with multiple models and metrics, completing the migration in just two days without prior Ray experience. The interactive development experience with distributed computing significantly sped up feedback loops for exploration and validation.

**Time to Production**: The business impact metrics highlight Ray's acceleration of research-to-production timelines. A graph neural network (GNN) implementation for podcast recommendations progressed from initial idea to online A/B testing in less than 2.5 months. A daily batch prediction workflow was productionized in only two weeks to support A/B testing at monthly active user (MAU) scale. These timelines represent significant improvements over the previous TFX-based approach for non-standard workflows.

**Infrastructure Scale**: The GKE clusters are configured to scale to "pretty decent size" with multiple node pools and GPU types. The multi-tenant architecture operates within a single GCP project, with namespace-level resource quotas controlling individual team consumption. GCP project-level quotas occasionally require support cases for increases, particularly for GPU resources.

**Framework Coverage**: The platform enables diverse ML frameworks including reinforcement learning (which unlocked performance bottlenecks in IO agent training), graph neural networks (establishing foundations for GNN prototyping standardization at Spotify), distributed XGBoost, TensorFlow, PyTorch, and large-scale feature processing with Modin pandas.

**Startup Performance**: The platform optimized for fast container image downloads using GCP's image streaming to minimize wait times when scaling worker counts or starting containers. This focus on startup latency improves the developer experience during interactive experimentation.

## Trade-offs & Lessons

**Platform Strategy Positioning**: Spotify made a deliberate strategic choice to position Ray as complementary rather than replacement infrastructure. Ray targets ML research and experimentation for non-standardized workflows that cannot fit the TFX paradigm, while TFX/Kubeflow continues serving standardized production ML workflows. This "parallel experiment" approach avoids destabilizing the existing platform or causing user confusion. For organizations at Spotify's scale (a public company with many ML teams), this cautious introduction allows learning while maintaining stability, whereas smaller startups might adopt more aggressive migration strategies.

**Infrastructure Management Model**: The team evaluated three deployment options and selected a hybrid approach where they provide centrally-managed multi-tenant infrastructure while individual teams only manage their Ray clusters. This balances control and customization against operational burden. Third-party managed services (like Anyscale's hosted offering) were rejected because Spotify needed extensive internal integrations and wanted control over service operations. Letting individual teams manage their own infrastructure was rejected because data scientists and researchers shouldn't need infrastructure expertise—they should focus on modeling and experimentation.

**Abstraction Leakage Challenges**: The team identified specific leaky abstraction problems. When users request resources that don't match available node pool configurations, clusters appear to be created but pods never get scheduled, requiring manual notification that provisioning failed. The team is actively seeking validation approaches to detect and reject incompatible resource requests upfront rather than letting users discover issues through silent failures.

**Resource Utilization and Cost Management**: The multi-tenant single-project architecture creates billing attribution challenges, making it appear the platform team has excessive spend. The roadmap includes implementing cost tracking and attribution by Kubernetes namespace using GCP features to give teams visibility into their Ray cluster expenses. Idle resource management is an ongoing challenge—users request substantial resources (like 300GB RAM) and leave clusters running over weekends at zero CPU utilization. Planned solutions include time-to-live (TTL) configurations for clusters with automatic extension capabilities, custom operators for housekeeping and garbage collection, push notifications nudging users about idle resources, and offloading cost pressure to technical procurement teams who can question spending. At Spotify, developer productivity typically takes priority over cost optimization, so resource GC features are roadmap items after achieving initial adoption rather than launch requirements.

**Simplification of ML Stack**: One of Ray's most valuable contributions is reducing debugging complexity. The TFX stack involved multiple layers (TFX DSL, Kubeflow, Kubernetes, GCP services) where errors could originate from custom code, Kubeflow pods, TFX components, or Dataflow workers. Ray applications are regular Python programs with unified APIs for distributed computing, eliminating the need to learn multiple frameworks, APIs, or Kubernetes concepts. This dramatically simplifies the debugging experience and lets users spend more time iterating on ML problems.

**Integration with Existing Infrastructure**: Rather than building an isolated platform, Spotify is systematically integrating Ray with their existing ML ecosystem including experiment tracking dashboards, metadata systems, feature stores, Airflow scheduling, and Flyte workflow orchestration. These integrations provide standardized Spotify ML platform experiences while leveraging Ray's flexibility. The Flyte integration creates ephemeral Ray clusters that exist only for workflow duration, improving resource efficiency.

**User Journey Segmentation**: The platform explicitly targets two user journeys: model prototyping and ad hoc experimentation for research scientists, data scientists, and ML engineers using user-friendly APIs and open-source libraries; and production paths for offline batch prediction for non-standard workflows that can be prototyped and productionized with Ray. This clear segmentation helps users understand when Ray is the appropriate tool versus continuing with TFX.

**Onboarding Experience**: The `--with-tutorials` flag that launches a Jupyter server with pre-loaded, executable tutorial notebooks provides a "slick" hello world experience with no coding required. Users run a single command, click a link, and execute cells to see distributed Python in action. This investment in first-run experience accelerates adoption among researchers unfamiliar with distributed computing frameworks.

**Validation and Business Impact**: The POC-driven approach with real Spotify problems (GNN embeddings for podcast recommendations, reinforcement learning for radio stations, Modin for A/B test user segment analysis) validated the platform design before full rollout. These projects demonstrated concrete business value and formed the foundation for managed Ray platform requirements. The team planned a Q4 2023 Spotify-wide release after completing initial integrations, showing a measured rollout timeline focused on learning and iteration.

**Data Processing Integration**: Spotify uses Apache Beam (via Scio, their Scala wrapper) on Google Dataflow for data ETL and Bigquery for data warehousing. The integration pattern has data engineers building feature datasets using these existing tools, then loading data into Ray for feature processing, data validation, training, and prediction. This pragmatic approach leverages existing investments rather than migrating all data processing to Ray, recognizing that different tools serve different organizational needs and skills.

**Model Serving Strategy**: Spotify continues using TensorFlow Serving and JVM-based backend services for model serving rather than adopting Ray Serve. However, the team expressed strong interest in Ray Serve for future use cases involving very large models that need distributed inference across multiple machines due to memory constraints. This selective adoption pattern shows thoughtful evaluation of where Ray adds value versus where existing solutions suffice.
