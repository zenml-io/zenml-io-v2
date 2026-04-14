---
title: "Unified ML platform with PyTorch SDK and Kubernetes training orchestration using Ray for faster iteration"
slug: "pinterest-ml-platform-evolution-with-ray-talks-deep-dives-unified-ml-platform-with-pytorch-sdk-and-kubernetes-training-o"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "docker"
  - "kubernetes"
  - "ray"
  - "spark"
  - "triton"
  - "wandb"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Pinterest"
companySlug: "pinterest"
platformName: "ML platform evolution with Ray (talks + deep dives)"
contentType: "video"
summary: "Pinterest's ML Foundations team developed a unified machine learning platform to address fragmentation and inefficiency that arose from teams building siloed solutions across different frameworks and stacks. The platform centers on two core components: MLM (Pinterest ML Engine), a standardized PyTorch-based SDK that provides state-of-the-art ML capabilities, and TCP (Training Compute Platform), a Kubernetes-based orchestration layer for managing ML workloads. To optimize both model and data iteration cycles, they integrated Ray for distributed computing, enabling disaggregation of CPU and GPU resources and allowing ML engineers to iterate entirely in Python without chaining complex DAGs across Spark and Airflow. This unified approach reduced sampling experiment time from 7 days to 15 hours, achieved 10x improvement in label assignment iteration velocity, and organically grew to support 100% of Pinterest's offline ML workloads running on thousands of GPUs serving hundreds of millions of QPS."
link: "https://www.youtube.com/watch?v=-MX8aYAbUO4"
year: 2025
seo:
  title: "Pinterest: Unified ML platform with PyTorch SDK and Kubernetes training orchestration using Ray for faster iteration - ZenML MLOps Database"
  description: "Pinterest's ML Foundations team developed a unified machine learning platform to address fragmentation and inefficiency that arose from teams building siloed solutions across different frameworks and stacks. The platform centers on two core components: MLM (Pinterest ML Engine), a standardized PyTorch-based SDK that provides state-of-the-art ML capabilities, and TCP (Training Compute Platform), a Kubernetes-based orchestration layer for managing ML workloads. To optimize both model and data iteration cycles, they integrated Ray for distributed computing, enabling disaggregation of CPU and GPU resources and allowing ML engineers to iterate entirely in Python without chaining complex DAGs across Spark and Airflow. This unified approach reduced sampling experiment time from 7 days to 15 hours, achieved 10x improvement in label assignment iteration velocity, and organically grew to support 100% of Pinterest's offline ML workloads running on thousands of GPUs serving hundreds of millions of QPS."
  canonical: "https://www.zenml.io/mlops-database/pinterest-ml-platform-evolution-with-ray-talks-deep-dives-unified-ml-platform-with-pytorch-sdk-and-kubernetes-training-o"
  ogTitle: "Pinterest: Unified ML platform with PyTorch SDK and Kubernetes training orchestration using Ray for faster iteration - ZenML MLOps Database"
  ogDescription: "Pinterest's ML Foundations team developed a unified machine learning platform to address fragmentation and inefficiency that arose from teams building siloed solutions across different frameworks and stacks. The platform centers on two core components: MLM (Pinterest ML Engine), a standardized PyTorch-based SDK that provides state-of-the-art ML capabilities, and TCP (Training Compute Platform), a Kubernetes-based orchestration layer for managing ML workloads. To optimize both model and data iteration cycles, they integrated Ray for distributed computing, enabling disaggregation of CPU and GPU resources and allowing ML engineers to iterate entirely in Python without chaining complex DAGs across Spark and Airflow. This unified approach reduced sampling experiment time from 7 days to 15 hours, achieved 10x improvement in label assignment iteration velocity, and organically grew to support 100% of Pinterest's offline ML workloads running on thousands of GPUs serving hundreds of millions of QPS."
mlops:
  source: "sqlite"
  entryId: 191
  sourceUrl: "https://www.youtube.com/watch?v=-MX8aYAbUO4"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.617481"
  lastUpdated: "2026-04-14T19:55:55.649152"
---

## Problem Context

Pinterest's ML platform evolution was driven by significant pain points that emerged between 2020-2021 as ML development occurred in silos across different surface teams. Each team evolved independent solutions without standardization, supporting multiple deep learning frameworks including both TensorFlow and PyTorch with no version restrictions. Teams created bespoke data loaders and training loops, resulting in fragmented tooling and an increasingly complex ecosystem where different ML stacks made it difficult to replicate wins and advancements across teams.

This fragmentation created substantial inefficiencies through duplicate engineering efforts and became a critical bottleneck for ML productivity and innovation. ML engineers spent excessive time understanding multiple frameworks (Spark, PyTorch, Airflow, sometimes Scala) and waiting for long feedback loops. When iterating on data sets with different sampling strategies, engineers had to materialize entire datasets through Spark jobs before training could begin, requiring jobs to be scheduled into Spark clusters and chained via Airflow before seeing any results.

Pinterest's ML workloads operate at substantial scale across two primary categories. Recommendation models power surfaces like home feed (surfacing 20 most relevant pins from 40 billion pins), search, and related pins, with models containing 100 million+ dense parameters and over a billion sparse and dense parameters. These models have seen compute requirements grow by more than 100x in the last two years as larger models delivered better engagement and revenue gains. Content understanding models extract signals and embedding representations from pins as they're indexed, powering downstream applications through object detection and trust and safety systems. The platform serves hundreds of millions of queries per second across these use cases.

## Architecture & Design

Pinterest's unified ML platform architecture consists of several integrated layers designed to accelerate both model and data iteration cycles. The platform is built around two fundamental components that work together to support the complete ML lifecycle.

**MLM (Pinterest ML Engine)** serves as the full-stack ML development framework sitting at the SDK layer. It provides a standardized interface where clients implement trainer logic using native PyTorch with full flexibility over model architecture and training loops. The critical architectural decision was centralizing on a single framework (PyTorch) and even controlling the version across all teams. This standardization allows platform engineers to handle software and hardware upgrades while ML engineers focus purely on modeling work.

MLM integrates with industry-standard tools including Weights & Biases for experiment tracking and model management, Ray for distributed data processing, and provides over 150 pre-built model architectures and loss functions. The framework supports advanced techniques including distributed training, mixed precision training, GPU serving, and quantization as built-in capabilities available to all users. Fault-tolerant training leverages Weights & Biases as the checkpoint manager.

**TCP (Training Compute Platform)** operates as the container orchestration layer built on top of Pinterest's native Kubernetes-based PinCompute platform. It manages the lifecycle of ML jobs through an API server and TCP console that interfaces with Kubernetes. The architecture abstracts low-level Kubernetes concepts through a Python SDK that provides factory functions for constructing jobs using high-level abstractions. TCP acts as a lightweight scheduler while persisting job information to a database for access beyond job lifetime.

All training datasets are stored as Spark files, and the platform runs on AWS hardware across a combination of GPU instances including A26 and A100 GPUs depending on use case requirements. Recommendation models typically train on 7 to 120 days of training data, requiring heavy data preprocessing capabilities.

**Serving Infrastructure** operates through two parallel stacks. A C++-based inference engine handles 99% of inference use cases including recommendation systems and object detection, serving hundreds of millions of QPS with online latency requirements. A parallel Nvidia Triton/NAVER-based architecture supports generative AI use cases. Content understanding models run batch inference without strict latency constraints given their compute-intensive nature.

**Ray Integration** was introduced as a distributed compute engine to address the critical challenge of disaggregating GPU and CPU compute within single workloads. This architectural choice enables independent scaling of CPU and GPU resources, solving the problem where complex data preprocessing transformations couldn't be handled by the limited CPUs available on GPU machines. In this paradigm, ML engineers write data preprocessing functions as Python UDFs that run in a Ray cluster, with prepared batches shipped over the network to GPUs. Ray also supports batch inference workloads that are bound by data loading requirements.

The platform distinguishes between two essential iteration patterns that ML engineers need for innovation. Model iteration involves keeping datasets fixed while experimenting with hyperparameter tuning and different model architectures. Data iteration keeps models fixed while experimenting with different sampling strategies, importance weighting for certain row types, and feature backfilling approaches.

## Technical Implementation

The platform is built entirely on PyTorch (100% of workloads) with MLM as the abstraction layer on top. This represents a deliberate consolidation from supporting multiple frameworks and versions to a single standardized stack. The decision to centralize on PyTorch enables any improvements or advancements to propagate easily across all teams under the unified infrastructure.

MLM provides compatibility with other ML platform tooling to support hyperparameter tuning workflows. The integration with Weights & Biases goes beyond experiment tracking to include model management and checkpoint management for fault-tolerant training. Data processing optimization uses Ray's distributed data loaders, allowing complex transformations to execute efficiently separate from GPU training workloads.

TCP's Python SDK abstracts Kubernetes complexity, allowing ML engineers to launch jobs without understanding container orchestration details. The controller manages job lifecycles and interfaces with Kubernetes, while metrics including GPU utilization and profiling data export to offline Hive tables for analysis. This observability infrastructure enables breaking down costs by models and trainers, identifying opportunity sizing by use case, and making informed decisions about optimal instance selections.

The data processing pipeline evolved significantly with Ray integration. Previously, ML engineers would chain Spark jobs via Airflow to materialize training datasets, then run downstream Spark jobs implementing sampling logic, persisting results to S3 before training workloads could consume them. Engineers often hacked data loaders to implement Python UDFs for simple transformations, but this approach failed for complex transformations due to CPU limitations on GPU machines.

With Ray, the architecture enables a single-language workflow where ML engineers express data preprocessing as Python UDFs running in a Ray cluster with independently scaled CPU resources. Prepared batches stream to GPUs over the network, eliminating the need to persist intermediate datasets. This approach supports treating dataset configurations as hyperparameters, enabling hyperparameter tuning over data configurations just like model hyperparameters.

The platform runs on AWS hardware infrastructure, with all ML jobs deployed through the Kubernetes-based orchestration layer. Training workloads execute on GPU instances (A26, A100) while preprocessing and batch inference can leverage CPU-optimized instances through Ray. All logs, metrics, and training observability data persist to enable efficiency analysis and cost optimization efforts.

## Scale & Performance

Pinterest's ML platform operates at substantial scale across multiple dimensions. The platform powers hundreds of ML applications running on thousands of GPUs, serving hundreds of millions of queries per second in production. The home feed recommendation system alone must surface the top 20 most relevant pins from a corpus of 40 billion pins for each user request.

Recommendation models have grown significantly in the last two years, with FLOPS increasing by more than 100x as Pinterest discovered that larger models deliver better engagement and revenue gains. These models contain 100 million+ dense parameters and over a billion sparse and dense parameters. Training data requirements vary by use case, with models consuming anywhere from 7 days to 120 days worth of training data. These workloads typically run on A26 or A100 GPUs with heavy data preprocessing requirements.

Content understanding models extract signals and embedding representations from pins as they're indexed into Pinterest's system. These compute-intensive models run batch inference without strict latency constraints, allowing for more flexible resource allocation.

The platform achieved 100% organic adoption across Pinterest's offline ML workloads, with all training and development workflows now running on MLM and TCP. This represents complete migration from the previous fragmented state where teams used different frameworks and versions.

Data iteration improvements delivered concrete velocity gains. Sampling experiments that previously took an average of 7 days now complete in 15 hours, representing a dramatic reduction in feedback loop time. Label assignment iteration workflows saw 10x improvement in development velocity. These gains stem from eliminating the need to materialize intermediate datasets and chain DAGs across Spark and Airflow.

Cost efficiency improved through multiple mechanisms. The disaggregation of CPU and GPU compute via Ray enables right-sizing of resources for different workload phases. Eliminating intermediate dataset persistence reduces storage costs. Training observability metrics enable breaking down costs by models and trainers, allowing teams to identify optimization opportunities by use case and make data-driven decisions about instance selection.

The platform's observability infrastructure exports GPU utilization metrics, profiling data, and comprehensive training metrics to offline Hive tables. This enables slicing and dicing data to inform efficiency efforts and capacity planning decisions.

## Trade-offs & Lessons

The Pinterest ML platform evolution reveals several critical insights about building unified ML infrastructure at scale. The most fundamental lesson centers on the value of platform consolidation and standardization, even when it requires teams to migrate from comfortable existing solutions.

**Standardization as an Enabler**: The decision to centralize on a single framework (PyTorch) and even control the version represented a significant constraint on teams, but this constraint became a powerful enabler. By offloading software and hardware upgrades to platform engineers, ML engineers could focus exclusively on modeling work. Any improvements made to the unified stack automatically propagated across all teams, creating a multiplier effect for platform engineering investments. The team observed that the prototype-to-widespread-adoption cycle became substantially shorter under the unified platform.

**Organic Adoption Validates Design**: The growth to 100% adoption of MLM and TCP happened organically rather than through mandates, suggesting the platform successfully addressed real pain points. When given the choice, teams migrated because the unified platform delivered tangible value. This organic adoption pattern provides validation that the platform design aligned with actual ML engineer needs rather than imposing theoretical best practices.

**Developer Experience Drives Productivity**: The ability to iterate entirely in Python without jumping across multiple frameworks (Spark, PyTorch, Airflow, Scala) fundamentally changed ML engineer productivity. Removing the cognitive overhead of context-switching between languages and frameworks allowed engineers to focus on the actual ML experimentation. The reduction in sampling experiment time from 7 days to 15 hours demonstrates how developer experience directly impacts innovation velocity.

**Data Iteration Equals Model Iteration**: A key insight was recognizing that data iteration deserves equal platform investment as model iteration. Many ML platforms focus heavily on model training and serving while treating data preprocessing as a secondary concern. Pinterest found that bottlenecks existed on both the model and data sides of the ML lifecycle, requiring co-designed solutions. The introduction of Ray specifically to address data iteration challenges reflects this balanced perspective.

**Disaggregation Creates Flexibility**: The ability to independently scale CPU and GPU resources for a single ML workload solved a critical problem where data preprocessing couldn't keep pace with GPU training. This architectural pattern of disaggregating compute types within a single logical job enables more efficient resource utilization than monolithic approaches. The trade-off involves network overhead for shipping prepared batches to GPUs, but this cost proved worthwhile given the flexibility gained.

**Observability Enables Optimization**: The decision to export comprehensive metrics (GPU utilization, profiling data, cost breakdowns by model and trainer) to offline tables for analysis created a foundation for continuous efficiency improvement. This observability infrastructure allows the platform team to identify optimization opportunities through data rather than intuition, supporting evidence-based decisions about instance selection and resource allocation.

**Hyperparameter Tuning for Data**: Treating data configurations as hyperparameters that can be searched using the same HPT infrastructure as model hyperparameters represents an elegant unification. This approach allows ML engineers to optimize both model and data aspects using familiar tooling and mental models.

**Open Source Integration**: Leveraging open source frameworks like Ray, PyTorch, and Weights & Biases rather than building everything custom allowed Pinterest to move quickly and benefit from community innovations. The platform team focused on integration and providing a coherent experience rather than reinventing distributed computing or experiment tracking from scratch.

The evolution from siloed development to a unified platform required significant investment in standardization and consolidation, but the returns materialized through reduced duplicate effort, faster iteration cycles, and the ability to scale best practices across hundreds of ML applications. The key insight is that platform consolidation creates value not just through technical efficiency but by enabling knowledge sharing and rapid adoption of innovations across teams.
