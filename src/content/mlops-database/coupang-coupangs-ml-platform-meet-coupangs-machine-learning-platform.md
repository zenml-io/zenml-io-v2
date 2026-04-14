---
title: "Meet Coupang's Machine Learning Platform"
slug: "coupang-coupangs-ml-platform-meet-coupangs-machine-learning-platform"
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
  - "docker"
  - "feast"
  - "kubernetes"
  - "sagemaker"
  - "seldon"
  - "tf-serving"
  - "triton"
  - "ab-testing"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "model-validation"
  - "retraining"
  - "serving"
  - "shadow-deployment"
  - "training"
industryTags: "e-commerce"
company: "Coupang"
companySlug: "coupang"
platformName: "Coupang's ML platform"
contentType: "blog"
summary: "Coupang, a major e-commerce and consumer services company, built a comprehensive ML platform to address the challenges of scaling machine learning development across diverse business units including search, pricing, logistics, recommendations, and streaming. The platform provides batteries-included services including managed Jupyter notebooks, pipeline SDKs, a Feast-based feature store, framework-agnostic model training on Kubernetes with multi-GPU distributed training support, Seldon-based model serving with canary deployment capabilities, and comprehensive monitoring infrastructure. Operating on a hybrid on-prem and AWS setup, the platform has successfully supported over 100,000 workflow runs across 600+ ML projects in its first year, reducing model deployment time from weeks to days while enabling distributed training speedups of 10x on A100 GPUs for BERT models and supporting production deployment of real-time price forecasting systems."
link: "https://www.coupang.jobs/en/life-at-coupang/engineering-blog/meet-coupang-s-machine-learning-platform/"
year: 2023
seo:
  title: "Coupang: Meet Coupang's Machine Learning Platform - ZenML MLOps Database"
  description: "Coupang, a major e-commerce and consumer services company, built a comprehensive ML platform to address the challenges of scaling machine learning development across diverse business units including search, pricing, logistics, recommendations, and streaming. The platform provides batteries-included services including managed Jupyter notebooks, pipeline SDKs, a Feast-based feature store, framework-agnostic model training on Kubernetes with multi-GPU distributed training support, Seldon-based model serving with canary deployment capabilities, and comprehensive monitoring infrastructure. Operating on a hybrid on-prem and AWS setup, the platform has successfully supported over 100,000 workflow runs across 600+ ML projects in its first year, reducing model deployment time from weeks to days while enabling distributed training speedups of 10x on A100 GPUs for BERT models and supporting production deployment of real-time price forecasting systems."
  canonical: "https://www.zenml.io/mlops-database/coupang-coupangs-ml-platform-meet-coupangs-machine-learning-platform"
  ogTitle: "Coupang: Meet Coupang's Machine Learning Platform - ZenML MLOps Database"
  ogDescription: "Coupang, a major e-commerce and consumer services company, built a comprehensive ML platform to address the challenges of scaling machine learning development across diverse business units including search, pricing, logistics, recommendations, and streaming. The platform provides batteries-included services including managed Jupyter notebooks, pipeline SDKs, a Feast-based feature store, framework-agnostic model training on Kubernetes with multi-GPU distributed training support, Seldon-based model serving with canary deployment capabilities, and comprehensive monitoring infrastructure. Operating on a hybrid on-prem and AWS setup, the platform has successfully supported over 100,000 workflow runs across 600+ ML projects in its first year, reducing model deployment time from weeks to days while enabling distributed training speedups of 10x on A100 GPUs for BERT models and supporting production deployment of real-time price forecasting systems."
mlops:
  source: "sqlite"
  entryId: 153
  sourceUrl: "https://www.coupang.jobs/en/life-at-coupang/engineering-blog/meet-coupang-s-machine-learning-platform/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061969"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Coupang faces ML challenges across a remarkably diverse set of business domains spanning e-commerce, food delivery (Coupang Eats), video streaming (Coupang Play), payments (Coupang Pay), and grocery delivery. Machine learning impacts every aspect of the customer experience including product catalog management, search functionality, pricing optimization, robotics in fulfillment centers, inventory management, and last-mile delivery logistics. ML teams work across natural language processing for understanding search queries and product listings, computer vision for product categorization and ad matching, recommendation systems for product search and video content ranking, and forecasting for supply chain optimization across millions of products.

Before building their centralized ML platform, teams at Coupang faced several critical bottlenecks that prevented ML from scaling effectively. Authoring and training models required hours of non-trivial setup work writing boilerplate code for data preparation, feature engineering, and trainer implementation. Scaling training through distributed strategies or leveraging GPUs demanded deep engineering expertise, resulting in duplicated infrastructure work across teams. Deploying models to serve real-time traffic took weeks of effort as teams replicated logic for model benchmarking, auto-scaling, security configurations, and rollback mechanisms. These barriers prevented product groups from adopting ML at the scale demanded by Coupang's business growth and expansion into new markets.

The platform team identified three core motivations driving their work. First, they needed to dramatically reduce time to production, enabling teams to move from idea to deployed model in days rather than weeks. Second, they needed to incorporate CI/CD practices into ML development to manage the technical debt that accumulates rapidly in machine learning systems. Third, they needed to scale ML compute efficiently in response to surging demand for GPUs for deep learning training, storage for increasingly large datasets, and network bandwidth for distributed training workloads, while managing cloud costs across a large fleet of models.

## Architecture & Design

The Coupang ML Platform provides an end-to-end set of lifecycle services that ML teams can compose independently to build their pipelines. The architecture follows a modular design where each service can be used standalone or integrated into larger workflows.

At the foundation, the platform provides hosted containerized Jupyter notebooks for exploration and iteration. These notebooks can be launched with custom or standard containers on either CPU or GPU hardware. The platform team maintains a set of standard Docker containers pre-loaded with popular ML libraries including TensorFlow, PyTorch, Scikit-learn, Huggingface Transformers, and others. This containerization approach solves dependency complexity issues and enables repeatable pipeline execution across development and production environments.

For pipeline orchestration, the platform provides Python SDKs covering data fetching, feature store interactions, model training, and inference operations. These SDKs abstract away infrastructure complexity while maintaining flexibility for diverse use cases.

The feature store architecture sits at the heart of feature management and is built on top of the open-source Feast project. The design supports both offline and online modes to handle different access patterns. The offline feature store enables feature sharing across teams and provides training data for model development. Coupang is systematically onboarding fundamental features like customer insights that can be consumed by multiple downstream teams, reducing duplicate feature engineering work. The online feature store serves low-latency feature requests during inference, functioning both as a real-time feature generator and as a prediction response cache for compute-intensive models that benefit from caching.

The training infrastructure takes a framework-agnostic approach built on Kubernetes. User-written pipelines are containerized and launched on Kubernetes clusters where a batch scheduler handles job placement on desired hardware configurations. Users configure jobs to run on specific CPU or GPU types available in the cluster, enabling optimization between compute speed and hardware cost. The scheduler follows an all-or-nothing resource allocation strategy to avoid resource fragmentation. For large model training, the stack supports distributed data parallel and fully sharded data parallel strategies. This distributed training capability has proven crucial for training transformer-based models at scale.

The inference architecture leverages the Seldon platform running on Kubernetes. Seldon provides integrations with specialized serving libraries including TensorFlow Serving and NVIDIA Triton while also supporting custom Python wrappers. This flexibility allows the platform to support diverse model frameworks, runtimes, and hardware targets including both CPU and GPU serving. Each model deploys as a standalone service with autoscaling capabilities, providing isolation between models and enabling integration with standard CI/CD tooling. The deployment pipeline includes multiple validation tests checking model size constraints and training-prediction skew before entering a canary phase. Successful canary results trigger gradual rollout to full production traffic.

The platform operates on a hybrid infrastructure model combining on-premise data centers with AWS cloud resources. The on-premise setup provides customization options and access to powerful GPU clusters at lower operational costs compared to cloud alternatives. The AWS setup provides elastic scaling when on-premise resources reach capacity. This hybrid approach balances cost efficiency with the ability to handle demand spikes.

## Technical Implementation

The technical stack makes deliberate choices to balance flexibility with standardization. For notebook environments, the platform team maintains integration-tested prepackaged containers with popular ML libraries to reduce setup friction. These containers undergo regular updates to incorporate new library versions and security patches.

The feature store implementation extends Feast, an open-source feature store originally developed by Gojek. Feast provides the core abstractions for feature definition, storage, and retrieval. Coupang's implementation adds integration layers connecting Feast to their internal data infrastructure and serving systems. The offline store connects to shared data storage systems where prepared features are materialized, while the online store provides a low-latency key-value interface for real-time feature lookup during model serving.

Training infrastructure runs on Kubernetes, taking advantage of the container orchestration capabilities for scheduling heterogeneous workloads across diverse hardware. The platform supports multiple GPU types in the cluster, allowing users to select hardware based on their workload characteristics. Training jobs benefit from high-bandwidth networking between nodes, essential for distributed training where gradient synchronization can become a bottleneck. The shared storage cluster uses high-performance file systems to store training datasets and model artifacts including checkpoints.

For distributed training, the platform provides tested configurations for both distributed data parallel (DDP) and fully sharded data parallel (FSDP) strategies. These strategies are particularly important for training large transformer models where model parameters may not fit in single GPU memory. The platform team benchmarks popular model architectures internally and shares best practices on trainer parameter tuning to help teams achieve efficient GPU utilization.

Model serving through Seldon provides a unified deployment interface across different serving backends. For TensorFlow models, teams can leverage TensorFlow Serving for optimized inference. For models requiring GPU acceleration or multi-framework support, NVIDIA Triton provides high-throughput serving. For models with custom preprocessing logic or non-standard frameworks, teams write Python wrappers that Seldon can containerize and serve. The deployment process integrates validation hooks where teams add custom checks for model correctness, and canary verification logic to ensure new model versions perform acceptably before full rollout.

For monitoring and observability, the platform collects metrics at multiple levels. Training cluster dashboards track resource utilization including GPU, CPU, and memory usage across the cluster. Individual workload monitoring shows GPU and CPU utilization for specific jobs, helping developers identify inefficient resource usage. Inference services track runtime metrics including memory consumption and prediction score distributions. Application logs and resource usage logs from clusters are aggregated and made queryable through dashboards. Alert systems notify teams of various conditions including stuck or idle training jobs, instance launch failures, and memory usage spikes.

The infrastructure teams managing the hybrid setup coordinate with cloud infrastructure engineers to provision and maintain compute and storage clusters. The on-premise data center provides dedicated training hardware including A100 GPUs for demanding deep learning workloads. Serving infrastructure runs on high I/O throughput machines distributed across multiple availability zones for fault tolerance, with autoscaling configured to handle traffic spikes.

## Scale & Performance

The platform has achieved significant scale in its first year of operation, supporting over 100,000 workflow runs across more than 600 ML projects. All major ML groups at Coupang utilize one or more platform services in their development workflows.

A concrete success story demonstrates the performance impact. ML developers working on search and recommendations implemented embedding-based retrieval using BERT models to augment classical term matching approaches. Multi-GPU distributed training on A100 GPUs provided a 10x speedup compared to training on older generation GPUs with previous training strategies. This dramatic acceleration enabled faster iteration on model architectures and hyperparameter tuning, directly improving search quality for customers. Following the success with BERT, teams are now experimenting with fine-tuning large language models for search quality improvements across different surfaces.

For inference workloads, the platform serves compute-intensive features like embeddings in real-time with low latency requirements through the online feature store caching layer. For very large models including LLMs and multimodal models, the team is investing in both batch and real-time GPU-based serving to achieve higher throughput compared to CPU-only serving.

The data science teams working on pricing models represent another scale success. These teams model various time series data for forecasting prices, demand, and page views across Coupang's product catalog. The entire suite of pricing models was migrated from a custom inference stack to the ML platform serving infrastructure. This migration eliminated the need for the data science team to maintain their own deployment cluster, allowing them to focus entirely on model development while the platform team handles infrastructure reliability and scaling.

The platform's design for flexible hardware selection has proven valuable for cost optimization. Teams can configure different GPU types for training versus batch inference, optimizing the tradeoff between speed and GPU costs. The scheduler's all-or-nothing allocation strategy prevents resource fragmentation that can reduce cluster utilization.

Storage and networking infrastructure scales to support the platform's workloads. The shared storage cluster handles training datasets and model artifacts, with high-performance file systems ensuring sufficient throughput for data-intensive training jobs. High-bandwidth networking between training nodes supports efficient distributed training where gradient synchronization can consume significant bandwidth for large models.

## Trade-offs & Lessons

The platform team made deliberate architectural choices that involved tradeoffs between flexibility and standardization. By providing standard containers with prepackaged libraries, they reduced setup complexity but required teams to occasionally work within version constraints. The team mitigates this through regular container updates and support for custom containers when standard images don't meet specific requirements.

The decision to build on Kubernetes for both training and serving provided consistency across the platform but required investment in Kubernetes expertise. This choice has paid dividends by enabling integration with the broader Kubernetes ecosystem and standard cloud-native tooling for monitoring, logging, and service mesh capabilities.

The hybrid on-premise and cloud infrastructure model introduces operational complexity requiring coordination between on-premise data center operations and cloud resource management. However, this complexity brings substantial cost savings through cheaper on-premise GPU access while maintaining cloud elasticity for demand spikes. The team found that many workloads run predictably enough to schedule on on-premise resources, with cloud serving as overflow capacity.

The framework-agnostic approach to training infrastructure provides flexibility for teams working with diverse ML frameworks ranging from PyTorch and TensorFlow to specialized tools like Prophet for forecasting and XGBoost for gradient boosting. This flexibility means the platform team cannot optimize deeply for any single framework but enables broader adoption across Coupang's diverse ML use cases.

Building the feature store on Feast provided a strong open-source foundation but required integration work to connect with Coupang's internal data systems. The investment in both offline and online feature stores addresses different use cases, with offline stores supporting training workflows and online stores enabling low-latency serving. The team's strategy of onboarding fundamental features like customer insights that benefit multiple teams demonstrates an understanding that feature stores provide maximum value through feature reuse.

The emphasis on CI/CD practices in ML deployment has proven crucial for managing technical debt. Validation tests, canary deployments, and gradual rollouts provide safety mechanisms that give teams confidence to iterate quickly. The isolation of models as separate services simplifies deployment but requires careful capacity planning to manage the proliferation of services.

The platform team's approach of benchmarking popular model architectures and sharing best practices addresses a common challenge in ML infrastructure: teams often lack expertise to efficiently configure distributed training. By providing tested configurations and guidance on trainer parameters, the platform reduces the barrier to leveraging advanced training techniques.

Developer adoption has been strong with teams building domain-specific toolkits on top of the platform for language modeling and AutoML. This pattern suggests the platform successfully provides useful primitives that teams can compose into higher-level abstractions. The traction in CI/CD best practices including online feature stores and monitoring indicates teams value production-ready capabilities beyond basic training and serving.

As teams experiment with increasingly large models including LLMs and multimodal models, the platform continues evolving to support new requirements around GPU-based serving, higher throughput inference, and efficient resource scheduling for massive models. The team's investment in monitoring and observability including planned data quality checks for anomaly detection and drift monitoring recognizes that production ML systems require ongoing vigilance.

The success stories demonstrate concrete business impact from the platform investment. Faster BERT training directly improved search quality, while migrating pricing models to platform serving freed data science teams from infrastructure management. These wins validate the platform's value proposition of reducing time to production and enabling teams to focus on model development rather than infrastructure.
