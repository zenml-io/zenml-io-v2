---
title: "The Magic of Merlin - Shopify's new machine learning platform"
slug: "shopify-merlin-the-magic-of-merlin-shopifys-new-machine-learning-platform"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "docker"
  - "kubernetes"
  - "ray"
  - "spark"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Shopify"
companySlug: "shopify"
platformName: "Merlin"
contentType: "video"
summary: "Shopify built Merlin, a new machine learning platform designed to address the challenge of supporting diverse ML use cases—from fraud detection to product categorization—with often conflicting requirements across internal and external applications. Built on an open-source stack centered around Ray for distributed computing and deployed on Kubernetes, Merlin provides scalable infrastructure, fast iteration cycles, and flexibility for data scientists to use any libraries they need. The platform introduces \"Merlin Workspaces\" (Ray clusters on Kubernetes) that enable users to prototype in Jupyter notebooks and then seamlessly move to production through Airflow orchestration, with the product categorization model serving as a successful early validation of the platform's capabilities at handling complex, large-scale ML workflows."
link: "https://shopify.engineering/merlin-shopify-machine-learning-platform"
year: 2022
seo:
  title: "Shopify: The Magic of Merlin - Shopify's new machine learning platform - ZenML MLOps Database"
  description: "Shopify built Merlin, a new machine learning platform designed to address the challenge of supporting diverse ML use cases—from fraud detection to product categorization—with often conflicting requirements across internal and external applications. Built on an open-source stack centered around Ray for distributed computing and deployed on Kubernetes, Merlin provides scalable infrastructure, fast iteration cycles, and flexibility for data scientists to use any libraries they need. The platform introduces \"Merlin Workspaces\" (Ray clusters on Kubernetes) that enable users to prototype in Jupyter notebooks and then seamlessly move to production through Airflow orchestration, with the product categorization model serving as a successful early validation of the platform's capabilities at handling complex, large-scale ML workflows."
  canonical: "https://www.zenml.io/mlops-database/shopify-merlin-the-magic-of-merlin-shopifys-new-machine-learning-platform"
  ogTitle: "Shopify: The Magic of Merlin - Shopify's new machine learning platform - ZenML MLOps Database"
  ogDescription: "Shopify built Merlin, a new machine learning platform designed to address the challenge of supporting diverse ML use cases—from fraud detection to product categorization—with often conflicting requirements across internal and external applications. Built on an open-source stack centered around Ray for distributed computing and deployed on Kubernetes, Merlin provides scalable infrastructure, fast iteration cycles, and flexibility for data scientists to use any libraries they need. The platform introduces \"Merlin Workspaces\" (Ray clusters on Kubernetes) that enable users to prototype in Jupyter notebooks and then seamlessly move to production through Airflow orchestration, with the product categorization model serving as a successful early validation of the platform's capabilities at handling complex, large-scale ML workflows."
mlops:
  source: "sqlite"
  entryId: 147
  sourceUrl: "https://shopify.engineering/merlin-shopify-machine-learning-platform"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061891"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Shopify faced significant challenges in scaling their machine learning capabilities across a diverse set of use cases. The company needed to support both internal applications like fraud detection and revenue predictions, as well as external merchant and buyer-facing features such as product categorization and recommendation systems. Each use case came with different and often conflicting requirements around inputs, data types, dependencies, and integrations. The existing ML infrastructure couldn't adequately handle this heterogeneity while providing the agility needed for long-term growth.

The core pain points that motivated building Merlin included the need for robust scalable infrastructure, the desire to minimize the gap between prototyping and production to enable fast iterations, and the requirement for flexibility so data scientists could use the best tools for each specific job. The machine learning platform team recognized that data scientists were spending too much time on infrastructure concerns rather than focusing on model development and innovation. They needed a consolidated platform that could abstract away infrastructure complexity while still providing the power and customization options that sophisticated ML workflows demand.

## Architecture & Design

Merlin's architecture is built around several key components that work together to provide an end-to-end ML platform. At the highest level, the platform separates data processing from model training and inference. Large-scale data modeling and feature engineering happen in other parts of Shopify's data platform using tools like Spark, with the resulting data and features stored in either Shopify's data lake or Pano, their feature store. Merlin then consumes these features and datasets as inputs for ML tasks including preprocessing, training, and batch inference.

The central architectural concept is the Merlin Workspace, which provides dedicated environments for each use case. These workspaces are actually Ray clusters deployed on Kubernetes, designed to be short-lived for batch jobs since processing only happens for defined periods. Each workspace can be customized with its own tasks, dependencies, and resource requirements, enabling distributed computing and horizontal scalability. Behind this abstraction, Shopify built the Merlin API as a consolidated service that allows on-demand creation of Merlin Workspaces, abstracting away all infrastructure-related logic like deployment of Ray clusters, creation of ingress, and service account management.

Users interact with Merlin through multiple interfaces depending on their workflow stage. For prototyping, they use Shopify's centrally hosted JupyterHub environment, connecting to their Merlin Workspaces via the Ray Client API. For production workloads, they orchestrate jobs through Airflow or Oozie using declarative YAML templates or DAGs (Directed Acyclic Graphs). The architecture ensures that code written during prototyping can run in production with minimal changes, dramatically reducing the friction in the ML development lifecycle.

Data flow through the system follows a clear pattern: features and datasets from Pano or the data lake flow into Merlin Workspaces where preprocessing, training, or batch inference occurs. The distributed computation within a workspace is handled by Ray, which parallelizes work across multiple CPUs, GPUs, and machines. Results and trained models flow back out to storage systems or downstream applications. Each workspace operates in a dedicated Kubernetes namespace with isolated resources, ensuring that different ML use cases don't interfere with each other.

## Technical Implementation

Merlin is built entirely on open-source technologies, a deliberate choice that allows Shopify to both contribute to and benefit from the broader ML community while maintaining agility to evolve the platform. The core technology is Ray, an open-source framework providing a universal API for building distributed systems and tools for parallelizing ML workflows. Ray's ecosystem includes distributed versions of scikit-learn, XGBoost, TensorFlow, PyTorch, and other popular ML libraries, which proved essential for Shopify's diverse use cases.

The platform runs on Kubernetes for container orchestration and resource management. Shopify uses the Ray Kubernetes Operator to manage deployments and autoscaling of Ray clusters. Each Merlin Project is packaged as a Docker container with a dedicated virtual environment (using Conda or pyenv), which isolates code and dependencies. This containerization strategy allows users to specify exactly which system-level packages and Python libraries they need, with CI/CD pipelines automatically building custom Docker images when users push their code.

The Merlin Project structure is straightforward: a config.yml file specifies dependencies and ML libraries, while a src folder contains all use-case-specific code. When users create a Merlin Workspace, they send a payload to the Merlin API that defines resource requirements. For example, the product categorization model uses 20 Ray workers, each with 10 CPUs, 30GB of memory, and one NVIDIA Tesla T4 GPU, with the ability to scale up to 30 workers. The API then spins up a Ray cluster using the pre-built Docker image in a dedicated Kubernetes namespace.

From a development workflow perspective, Shopify integrated several Ray capabilities. Ray Train handles distributed deep learning for TensorFlow and PyTorch models. Ray Tune provides experiment execution and hyperparameter tuning. The Ray Client API enables remote connections from Jupyter notebooks to Ray clusters, allowing data scientists to run distributed code from their notebook environment. The platform also integrates with Shopify's existing monitoring stack: each Merlin Workspace gets a dedicated Datadog dashboard for monitoring computation load and resource usage, while logs flow to Splunk for debugging.

For orchestration, Merlin integrates with Airflow, allowing users to define DAGs that create a Merlin Workspace, execute training or inference jobs on it, and then tear down the workspace to return resources to the Kubernetes cluster. This ephemeral workspace model optimizes resource utilization while maintaining isolation between different ML workloads.

## Scale & Performance

The product categorization model provides concrete insights into Merlin's scale and performance characteristics. This complex use case requires large-scale computation with multi-step workflows for both training and batch prediction. The training workflow uses distributed TensorFlow across multiple GPU workers, with the specific configuration mentioned earlier: 20 Ray workers with one Tesla T4 GPU each, scalable to 30 workers. Each worker has substantial resources—10 CPUs and 30GB of memory—indicating the computational intensity of the workload.

The batch inference pipeline for product categorization is a multi-step process that leverages Ray ActorPool to distribute each step across the cluster. By using the available CPU count from `ray.available_resources()["CPU"]`, the system automatically scales the number of actors to match cluster capacity. The platform creates a pool of predictor actors, each loading the model and performing predictions on dataset partitions in parallel.

While specific throughput numbers aren't provided in the source material, the architecture clearly supports horizontal scaling. The ability to define resource requirements per workspace and scale from initial worker counts to higher limits demonstrates that the platform can adapt to varying computational demands. The ephemeral nature of workspaces—spinning up for batch jobs and then shutting down—indicates a focus on efficient resource utilization rather than maintaining always-on infrastructure.

The platform's design also reveals performance considerations around the prototype-to-production workflow. By enabling data scientists to connect to remote Ray clusters even during prototyping, Merlin allows running code at scale from the earliest development stages. This means performance testing and optimization can happen throughout the development cycle rather than becoming a surprise issue during production deployment.

## Trade-offs & Lessons

Shopify's choice to build Merlin on open-source technologies represents a significant trade-off decision. While this provides access to cutting-edge capabilities and allows contribution back to the community, it also means depending on rapidly evolving projects. Ray, as noted in the case study, has short release cycles with the Ray team continuously adding new features. This creates both opportunities and challenges—Shopify can adopt new capabilities like Ray Train, Ray Tune, and the Ray Kubernetes Operator, but must also manage the complexity of keeping up with a fast-moving dependency.

The ephemeral workspace model shows a clear preference for resource efficiency over always-available infrastructure. By designing Merlin Workspaces to be short-lived and specifically oriented toward batch jobs, Shopify optimizes for their current use cases (training and batch inference) while acknowledging that real-time serving will require different architectural patterns. This pragmatic phasing approach—focusing the first iteration on training and batch inference, with online inference planned for future milestones—demonstrates an incremental build strategy that delivers value quickly while planning for evolution.

The integration of Ray Train with existing TensorFlow code illustrates a key insight: the migration path to distributed training was relatively simple with few code changes required. The core training logic remained unchanged, with developers only needing to wrap their code and add Ray-specific configuration. This low friction adoption pattern proved crucial for onboarding the complex product categorization model early in Merlin's lifecycle. However, the case study also hints at ongoing optimization work—the team notes plans to migrate from Ray ActorPool to Ray Dataset Pipelines for batch inference, recognizing that the current approach has dependencies on the number and size of data partitions that could be improved.

The decision to provide a Docker-based project structure with configurable dependencies offers maximum flexibility but also pushes complexity to users. Each team must define their own config.yml with dependencies and manage their own src code structure. This trade-off favors flexibility and customization over standardization and simplification. The platform provides abstractions for infrastructure concerns but maintains developer control over the ML stack.

Integration with existing Shopify infrastructure—Pano for features, Spark for data processing, Airflow for orchestration, Datadog for monitoring, Splunk for logging—demonstrates a pragmatic approach of building Merlin as a component within a broader ecosystem rather than trying to replace everything. This integration strategy reduces friction for adoption and leverages existing investments, but also means Merlin must maintain compatibility with multiple systems and can't optimize end-to-end as a fully integrated solution might.

The emphasis on minimizing the gap between prototyping and production through the Jupyter notebook integration with remote Ray clusters represents a sophisticated understanding of data scientist workflows. By allowing the same code to run locally during early development and on distributed clusters as scale demands increase, Merlin removes a common friction point where prototypes need to be completely rewritten for production. The Ray Client API makes this possible with `ray.init()` seamlessly connecting to either local or remote clusters.

Looking at the roadmap, Shopify's planned additions reveal gaps in the current platform. The intention to add model registry and experiment tracking indicates these capabilities aren't yet mature in Merlin. The plan for online inference acknowledges that the current batch-oriented architecture doesn't serve real-time use cases. The addition of ML-specific monitoring suggests current observability focuses on infrastructure metrics rather than model performance metrics like accuracy drift or data quality issues.

The successful early onboarding of the product categorization model proved valuable for platform validation. By choosing a complex use case with large-scale computation requirements and sophisticated ML logic, Shopify stress-tested Merlin early and likely uncovered issues that simpler use cases wouldn't have revealed. This "start with a hard problem" approach to platform validation demonstrates engineering maturity and helps ensure the platform can actually handle production workloads at scale.
