---
title: "Griffin 2.0 ML Training Platform: unified Kubernetes/Ray training with standardized runtimes and model lineage metadata"
slug: "instacart-griffin-20-griffin-20-ml-training-platform-unified-kubernetesray-training-with-standardized-runtimes-and-model"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "pipeline-orchestration"
  - "airflow"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "data-ingestion"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "monitoring"
  - "training"
industryTags: "e-commerce"
company: "Instacart"
companySlug: "instacart"
platformName: "Griffin 2.0"
contentType: "blog"
summary: "Instacart built Griffin 2.0's ML Training Platform (MLTP) to address fragmentation and scalability challenges from their first-generation platform. Griffin 1.0 required machine learning engineers to navigate multiple disparate systems, used various training backend platforms that created maintenance overhead, lacked standardized ML runtimes, relied solely on vertical scaling, and had poor model lineage tracking. Griffin 2.0 consolidates all training workloads onto a unified Kubernetes platform with Ray for distributed computation, provides a centralized web interface and REST API layer, implements standard ML runtimes for common frameworks, and establishes a comprehensive metadata store covering model architecture, offline features, workflow runs, and the model registry. The platform enables MLEs to seamlessly create and manage training workloads from prototyping through production while supporting distributed training, batch inference, and LLM fine-tuning."
link: "https://www.instacart.com/company/tech-innovation/unveiling-the-core-of-instacarts-griffin-2-0-a-deep-dive-into-the-machine-learning-training-platform"
year: 2023
seo:
  title: "Instacart: Griffin 2.0 ML Training Platform: unified Kubernetes/Ray training with standardized runtimes and model lineage metadata - ZenML MLOps Database"
  description: "Instacart built Griffin 2.0's ML Training Platform (MLTP) to address fragmentation and scalability challenges from their first-generation platform. Griffin 1.0 required machine learning engineers to navigate multiple disparate systems, used various training backend platforms that created maintenance overhead, lacked standardized ML runtimes, relied solely on vertical scaling, and had poor model lineage tracking. Griffin 2.0 consolidates all training workloads onto a unified Kubernetes platform with Ray for distributed computation, provides a centralized web interface and REST API layer, implements standard ML runtimes for common frameworks, and establishes a comprehensive metadata store covering model architecture, offline features, workflow runs, and the model registry. The platform enables MLEs to seamlessly create and manage training workloads from prototyping through production while supporting distributed training, batch inference, and LLM fine-tuning."
  canonical: "https://www.zenml.io/mlops-database/instacart-griffin-20-griffin-20-ml-training-platform-unified-kubernetesray-training-with-standardized-runtimes-and-model"
  ogTitle: "Instacart: Griffin 2.0 ML Training Platform: unified Kubernetes/Ray training with standardized runtimes and model lineage metadata - ZenML MLOps Database"
  ogDescription: "Instacart built Griffin 2.0's ML Training Platform (MLTP) to address fragmentation and scalability challenges from their first-generation platform. Griffin 1.0 required machine learning engineers to navigate multiple disparate systems, used various training backend platforms that created maintenance overhead, lacked standardized ML runtimes, relied solely on vertical scaling, and had poor model lineage tracking. Griffin 2.0 consolidates all training workloads onto a unified Kubernetes platform with Ray for distributed computation, provides a centralized web interface and REST API layer, implements standard ML runtimes for common frameworks, and establishes a comprehensive metadata store covering model architecture, offline features, workflow runs, and the model registry. The platform enables MLEs to seamlessly create and manage training workloads from prototyping through production while supporting distributed training, batch inference, and LLM fine-tuning."
mlops:
  source: "sqlite"
  entryId: 206
  sourceUrl: "https://www.instacart.com/company/tech-innovation/unveiling-the-core-of-instacarts-griffin-2-0-a-deep-dive-into-the-machine-learning-training-platform"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.617979"
  lastUpdated: "2026-04-14T19:55:59.460475"
---

## Problem Context

Instacart's Griffin 1.0 platform, while representing their first unified ML platform, exhibited several critical limitations that hindered machine learning engineering productivity and operational efficiency. Machine learning engineers faced significant friction navigating multiple disparate systems to obtain comprehensive information about their training workloads. The platform incorporated various training backend platforms, creating substantial maintenance overhead for the infrastructure team. Without standardized approaches for modeling frameworks and package versions, MLEs encountered persistent maintenance challenges and inconsistencies across projects. The reliance on vertical scaling alone proved insufficient for handling increasing training data volumes and evolving model architectures. Perhaps most critically, Griffin 1.0 lacked effective model lineage information, making it extraordinarily difficult for users to understand and manage the complete model lifecycle from training through deployment.

These challenges became increasingly acute as Instacart's ML use cases expanded while the ML infrastructure team remained limited in size. The organization needed a platform that could scale efficiently, reduce cognitive overhead for machine learning engineers, and provide comprehensive visibility into the entire model development lifecycle. The team recognized that addressing these pain points required fundamental architectural changes rather than incremental improvements to the existing system.

## Architecture & Design

Griffin 2.0's ML Training Platform is architected around four major building blocks that work together to provide centralized service management with distributed computation capabilities.

### Metadata Store

The metadata store serves as the foundational data layer, implementing a series of carefully designed data models to manage all aspects of the model lifecycle. The **Model Store** specifies raw, untrained model architectures that serve as input for training jobs. The **Offline Feature Store** contains metadata for features residing in offline storage that will be utilized during training. **Workflow Run** entities represent specific training job requests submitted to the workflow services, capturing the complete execution context. The **Model Registry** maintains comprehensive information about models generated by training jobs, serving as the authoritative source for post-training processes including evaluation, batch inference, and real-time inference.

This centralized metadata architecture enables robust model lineage tracking, allowing the platform to trace relationships between model architectures and workflow runs, training datasets and workflow runs, workflow runs and the model registry, and workflow runs and their associated output metadata URLs pointing to Datadog logs, MLFlow metrics, Ray dashboards, and other monitoring tools. This interconnected metadata graph dramatically simplifies the training-to-post-training workflow and enables reproducibility for debugging and knowledge sharing.

### API Layer

The platform exposes a comprehensive REST API server that provides programmatic access to all metadata store capabilities. The `/api/training/models/` endpoints enable creation and retrieval of model architectures from the Model Store. The `/api/registry/models/` endpoints handle generation, storage, and retrieval of trained models from the Model Registry during post-training processes. Feature-related operations use `/api/features/` for indexing and retrieving offline features, while `/api/training/dataset/` handles training dataset generation and retrieval. Workflow management occurs through `/api/workflows` endpoints that create, retrieve, and terminate training jobs tracked in Workflow Run entities.

This unified API surface provides consistency across all stages of the model lifecycle, whether users are prototyping from laptops, working in Jupyter servers, submitting production workflows through the Griffin UI, or orchestrating training through existing Airflow pipelines using Griffin task operators and sensor operators.

### Workflow Orchestrator

The workflow orchestrator comprises two tightly integrated components. The **MLTP API service** empowers users to customize training jobs with detailed specifications including worker count, CPU and GPU unit allocations, memory requirements, SSD attachment configurations, and runtime selection, all while completely abstracting away Kubernetes operational complexity. The Griffin UI provides an intuitive interface for workflow creation and resource specification, particularly for creating Ray clusters. When users initiate workflows, the MLTP API service communicates with the ISC backend worker to generate appropriate Kubernetes resources.

The second component combines **ISC (Instacart Software Center) with Kubernetes** as the underlying orchestration platform. Kubernetes was deliberately chosen to consolidate previously fragmented training backend methods into a single unified platform. The team collaborated closely with Instacart's core infrastructure team, who built and managed ISC—a comprehensive suite of tools for creating, validating, and deploying software company-wide. By integrating Ray and Kubernetes within ISC, the team enabled company-wide adoption while leveraging existing build and deploy features.

When the ISC worker receives workflow requests from the MLTP service, it establishes a unique Kubernetes namespace for each workflow definition, ensuring resource isolation while sharing identical environment variables and authorization settings. The worker then generates RayCluster and RayJob Custom Resource Definitions (CRDs), initializes them, provides endpoints for Ray dashboard URLs, continuously monitors container status, and manages cluster lifespan.

### Standard ML Runtimes

Through surveying training applications implemented across the organization, the team discovered that the majority of code wasn't focused on core model development. Applications shared substantial commonalities including parallel executors for feature transformations, batch inference pipelines, and distributed GPU workers for parallelizing training batches. Optimizing these components consumed significant MLE time, requiring them to learn various frameworks and APIs while navigating debugging complexity.

To address this, Griffin 2.0 provides standardized ML runtimes with structured and configurable input parameters. These runtimes offer predefined approaches covering the majority of use cases for building different model types at Instacart, whether decision trees or neural networks. The platform leverages Ray APIs to implement various components of the training pipeline, with most building blocks shared across different standard runtimes for various ML frameworks. These runtimes are designed for effortless scalability, allowing users to initially test in Ray local mode before seamlessly scaling workflows to remote distributed environments without code changes.

## Technical Implementation

The platform is built on a modern cloud-native technology stack centered on Kubernetes and Ray. Kubernetes serves as the universal orchestration platform, replacing the fragmented backend platforms from Griffin 1.0. This consolidation required a one-time migration effort for existing training jobs but delivered substantial long-term benefits including consistent abstractions, enhanced metadata management, and distributed computation capabilities.

Ray provides the distributed computing framework that enables horizontal scalability without imposing excessive complexity on machine learning engineers. The platform uses Ray's APIs extensively to implement training pipeline components including data loading, feature transformation, model training, and batch inference. Ray's ability to operate in both local mode for development and distributed mode for production proves particularly valuable, allowing seamless transitions between experimentation and production deployment.

The Instacart Software Center (ISC) integration provides critical infrastructure capabilities including resource management, deployment automation, and monitoring. ISC handles the translation from high-level workflow specifications to concrete Kubernetes resources, managing the creation and lifecycle of RayCluster and RayJob CRDs. Each workflow receives its own isolated Kubernetes namespace, providing resource isolation while maintaining consistent environment configurations and authorization policies.

MLFlow integration provides experiment tracking and metrics visualization, automatically capturing training metrics that are surfaced through the centralized UI. Datadog integration handles comprehensive logging, with all workflow logs accessible through the metadata store's lineage tracking. The platform provides direct links from workflow runs to their associated Datadog logs, MLFlow experiments, and Ray dashboards, creating a unified observability experience.

The training workflow follows a well-defined execution path. Users begin by customizing inputs, organizing features, experimenting with model architectures, selecting models from the Model Store, choosing training datasets, and configuring training parameters. When ready to launch, they can either use the Griffin UI or invoke Python SDKs that interact with the workflow APIs. The workflow services translate these requests into appropriate Kubernetes resources—either simple single-container jobs for basic workloads or complex multi-node Ray clusters for distributed training. After training completes, results including MLFlow metrics and Datadog logs are visualized, while model weights and artifacts are stored in the Model Registry for downstream consumption.

## Scale & Performance

While the article doesn't provide specific throughput or latency numbers, it describes the platform's ability to support horizontal scaling through Ray, addressing limitations of Griffin 1.0's vertical scaling approach. The platform handles distributed training across multiple GPU workers, enabling parallelization of training batches. The Ray cluster configuration allows users to specify worker counts, CPU/GPU units, memory allocations, and SSD attachments, providing fine-grained control over computational resources.

The platform serves the entire Instacart ML organization across diverse domains including Ads ML and Fulfillment ML, suggesting significant scale in terms of model variety and user base. The unified Kubernetes platform consolidates what were previously multiple backend platforms, indicating substantial workload consolidation. The ability to support use cases ranging from decision trees to neural networks to large language model fine-tuning demonstrates broad applicability across different model types and computational requirements.

## Trade-offs & Lessons Learned

The Griffin 2.0 journey yielded several valuable insights for building next-generation ML training infrastructure.

**Unified Solutions for Scale**: With a growing number of ML use cases and a limited ML infrastructure team, Instacart chose unification over flexibility as the primary scaling strategy. Consolidating onto Kubernetes as the single orchestration platform required a one-time migration effort that created short-term friction. However, this investment delivered substantial long-term dividends through consistent training job abstractions, simplified maintenance, and the ability to roll out improvements like distributed computation and enhanced metadata management to all users simultaneously. This represents a classic platform engineering trade-off—accepting migration costs to reduce operational fragmentation.

**Balancing Flexibility and Standardization**: The team explicitly recognized the tension between providing a highly flexible platform capable of accommodating diverse ML applications and offering standardization that accelerates development velocity. Their resolution involved providing standard ML runtimes for common use cases while maintaining underlying flexibility through direct API access. The standard runtimes handle the majority of scenarios—feature transformation, batch inference, distributed training—while allowing advanced users to work directly with Ray APIs when needed. This tiered approach maximizes accessibility for typical use cases while preserving power-user capabilities.

**Considering the Bigger Picture**: The redesign process extended beyond training in isolation to encompass model serving and feature engineering. Close collaboration with stakeholders from other Griffin 2.0 projects enabled co-design of data models for training jobs, ensuring seamless integration into the end-to-end workflow. This holistic approach prevented the creation of integration challenges that would emerge later, reducing friction in deployment workflows and metadata management. The decision to establish comprehensive lineage tracking from the outset—connecting model architectures, training datasets, workflow runs, model registry entries, and observability tools—exemplifies this systems-thinking approach.

**Infrastructure Partnership**: The collaboration with Instacart's core infrastructure team proved essential. Rather than building orchestration capabilities from scratch, the ML platform team leveraged ISC's existing build, deploy, and validation infrastructure. This partnership accelerated development while ensuring consistency with broader organizational infrastructure patterns. The integration required careful coordination but avoided duplicating infrastructure capabilities and ensured the ML platform benefited from ongoing ISC improvements.

The transition from Griffin 1.0 to 2.0 demonstrates a willingness to undertake significant refactoring when incremental improvements prove insufficient. Rather than patching individual pain points, the team addressed fundamental architectural limitations through comprehensive redesign. This approach required substantial upfront investment and coordination across multiple teams including Cloud Foundation, Build & Deploy, Developer Productivity, and various ML teams, but positioned the platform to support Instacart's ML needs for years to come.
