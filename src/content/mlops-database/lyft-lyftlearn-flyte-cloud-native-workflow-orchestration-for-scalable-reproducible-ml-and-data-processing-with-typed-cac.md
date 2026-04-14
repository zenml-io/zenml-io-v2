---
title: "Flyte cloud-native workflow orchestration for scalable, reproducible ML and data processing with typed, cached executions"
slug: "lyft-lyftlearn-flyte-cloud-native-workflow-orchestration-for-scalable-reproducible-ml-and-data-processing-with-typed-cac"
draft: false
mlopsTags:
  - "data-versioning"
  - "experiment-tracking"
  - "metadata-store"
  - "pipeline-orchestration"
  - "docker"
  - "flyte"
  - "kubernetes"
  - "sagemaker"
  - "spark"
  - "data-prep"
  - "deployment"
  - "model-evaluation"
  - "training"
industryTags: "automotive"
company: "Lyft"
companySlug: "lyft"
platformName: "LyftLearn"
contentType: "blog"
summary: "Lyft built Flyte, a cloud-native workflow orchestration platform designed to address the operational burden of managing large-scale machine learning and data processing at scale. The platform abstracts away infrastructure complexity, allowing data scientists and ML engineers to focus on business logic rather than cluster management while enabling workflow sharing and reuse across teams. After three years in production, Flyte manages over 7,000 unique workflows across multiple teams including Pricing, ETA, Mapping, and Self-Driving, executing over 100,000 workflow runs monthly that spawn 1 million tasks and 10 million containers. The system provides versioned, reproducible, containerized execution with strong typing, data lineage tracking, intelligent caching, and support for heterogeneous compute backends including Spark, Kubernetes, and third-party services."
link: "https://eng.lyft.com/introducing-flyte-cloud-native-machine-learning-and-data-processing-platform-fb2bb3046a59"
year: 2020
seo:
  title: "Lyft: Flyte cloud-native workflow orchestration for scalable, reproducible ML and data processing with typed, cached executions - ZenML MLOps Database"
  description: "Lyft built Flyte, a cloud-native workflow orchestration platform designed to address the operational burden of managing large-scale machine learning and data processing at scale. The platform abstracts away infrastructure complexity, allowing data scientists and ML engineers to focus on business logic rather than cluster management while enabling workflow sharing and reuse across teams. After three years in production, Flyte manages over 7,000 unique workflows across multiple teams including Pricing, ETA, Mapping, and Self-Driving, executing over 100,000 workflow runs monthly that spawn 1 million tasks and 10 million containers. The system provides versioned, reproducible, containerized execution with strong typing, data lineage tracking, intelligent caching, and support for heterogeneous compute backends including Spark, Kubernetes, and third-party services."
  canonical: "https://www.zenml.io/mlops-database/lyft-lyftlearn-flyte-cloud-native-workflow-orchestration-for-scalable-reproducible-ml-and-data-processing-with-typed-cac"
  ogTitle: "Lyft: Flyte cloud-native workflow orchestration for scalable, reproducible ML and data processing with typed, cached executions - ZenML MLOps Database"
  ogDescription: "Lyft built Flyte, a cloud-native workflow orchestration platform designed to address the operational burden of managing large-scale machine learning and data processing at scale. The platform abstracts away infrastructure complexity, allowing data scientists and ML engineers to focus on business logic rather than cluster management while enabling workflow sharing and reuse across teams. After three years in production, Flyte manages over 7,000 unique workflows across multiple teams including Pricing, ETA, Mapping, and Self-Driving, executing over 100,000 workflow runs monthly that spawn 1 million tasks and 10 million containers. The system provides versioned, reproducible, containerized execution with strong typing, data lineage tracking, intelligent caching, and support for heterogeneous compute backends including Spark, Kubernetes, and third-party services."
mlops:
  source: "sqlite"
  entryId: 90
  sourceUrl: "https://eng.lyft.com/introducing-flyte-cloud-native-machine-learning-and-data-processing-platform-fb2bb3046a59"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061286"
  lastUpdated: "2026-04-14T19:55:02.866690"
---

## Problem Context

Lyft identified a fundamental tension in their machine learning and data processing operations: as data became a primary business asset, the need to execute large-scale compute jobs intensified, but the operational overhead of managing this infrastructure created significant friction. Product teams were forced to spend valuable engineering time scaling, monitoring, and managing their own compute clusters rather than focusing on innovation and business logic. This burden slowed iteration cycles and ultimately hindered product development velocity.

Beyond infrastructure management, Lyft faced challenges around workflow complexity and collaboration. Modern ML and data workflows often have intricate data dependencies spanning multiple processing stages, from raw data preparation through model training to validation and deployment. Without platform-level abstraction, dependency management became increasingly difficult to maintain as workflows grew more sophisticated. Perhaps most critically, the lack of a shared platform prevented teams from reusing components and collaborating effectively. The same problems were being solved repeatedly across different teams, leading to duplicated effort and inconsistent solutions. As the boundaries between traditional data engineering and machine learning engineering continued to blur, this lack of standardization became even more problematic.

The teams at Lyft needed a solution that would make reliable, scalable, orchestrated compute a solved problem while simultaneously enabling workflow sharing and component reuse across the organization. This motivation led to the development of Flyte, which entered production service over three years before this announcement and became the de-facto platform for critical teams including Pricing, Locations, Estimated Time of Arrivals (ETA), Mapping, and the Self-Driving (L5) division.

## Architecture & Design

Flyte is architected as a cloud-native, multi-tenant, serverless platform built on Kubernetes. The high-level architecture separates concerns between the control plane (which manages workflow orchestration and metadata) and the execution plane (which runs containerized tasks). This separation allows Flyte to provide a hosted service model where users can work in isolated repositories and deploy without affecting other tenants on the platform.

The platform introduces several key abstractions that form the foundation of its design. At the lowest level are **Tasks**, which represent individual units of work. Tasks are strongly typed with explicit input and output parameters, and each task is bound to a container image that encapsulates all its dependencies. This containerization ensures that every execution is reproducible and isolated from other workloads. Tasks can represent anything from simple Python functions to complex distributed computations on Spark clusters or remote executions on external systems.

**Workflows** compose multiple tasks together using a Python-based domain-specific language (DSL). The DSL allows developers to express data dependencies between tasks declaratively, with Flyte handling the orchestration, scheduling, and data passing between steps automatically. Workflows themselves are strongly typed, accepting parameters that can be varied across executions without code changes.

The platform implements comprehensive **versioning and immutability** at every level. Each task, workflow, and execution is immutable, with changes explicitly captured as new versions. This design choice enables several powerful capabilities: easy rollback to previous versions, experiment tracking across iterations, and safe sharing of components across teams without fear of breaking changes.

**Data lineage and caching** are first-class features in Flyte's architecture. Because all tasks declare typed inputs and outputs, the platform can automatically track how data flows through workflows and build a complete lineage graph. The caching mechanism leverages this type information combined with task signatures to determine when previously computed results can be reused. If a task is invoked with the same inputs and the same code version, Flyte can skip execution and return the cached output, significantly reducing computation time and cost for iterative workflows.

The architecture supports **heterogeneous execution backends** through a plugin system. Task execution is abstracted behind interfaces that can be implemented for different compute environments. This allows a single workflow to seamlessly combine Spark jobs for data preparation, Python containers for model training, and queries against external systems like Hive or BigQuery. The plugin architecture comes in two flavors: FlyteKit extensions for rapid service integrations, and backend plugins for fine-grained control over execution semantics including management of Kubernetes Custom Resource Definitions (CRDs) and integrations with external platforms like Amazon SageMaker and Qubole.

## Technical Implementation

Flyte's implementation centers on Kubernetes as the underlying orchestration layer. The platform leverages Kubernetes for container scheduling, resource management, and pod lifecycle management. This cloud-native foundation allows Flyte to scale horizontally and take advantage of modern container orchestration capabilities.

Developers interact with Flyte primarily through **FlyteKit**, a Python SDK that provides the DSL for defining tasks and workflows. The example provided in the announcement demonstrates a typical machine learning pipeline built with FlyteKit for training an XGBoost model on the Pima Indians diabetes dataset. The pipeline consists of four distinct tasks: data preparation and train/test splits, model training, model validation and scoring, and metrics computation.

The code shows how tasks are decorated with `@inputs` and `@outputs` decorators to declare strong typing. For example, a data preparation task might be declared with typed parameters for the dataset path, test split ratio, and random seed, with outputs being the training and test datasets. The XGBoost training task would then consume the training dataset and produce a trained model object. Tasks can also be marked as `@cacheable`, instructing Flyte to reuse previous execution results when appropriate.

Workflows are constructed by instantiating tasks and wiring their inputs and outputs together. The Python DSL makes these data dependencies explicit while remaining readable and maintainable. The workflow definition specifies how data flows from one task to the next, with Flyte handling the actual data transfer, serialization, and deserialization automatically.

Under the hood, when a workflow is registered with Flyte, the platform performs several operations. It builds and pushes container images containing the user's code and dependencies, stores the workflow definition and task metadata in its catalog, and versions everything immutably. During execution, Flyte schedules containers on Kubernetes based on the workflow DAG, manages data passing between tasks through its intermediate data store, and tracks execution state and outputs.

The platform supports heterogeneous task types through its plugin architecture. A Spark task, for instance, uses the Spark-on-Kubernetes operator to launch distributed Spark jobs as Kubernetes resources. The backend plugin creates the appropriate SparkApplication CRD, monitors its progress, and integrates the results back into the workflow execution. Similarly, integrations with external systems like Amazon SageMaker allow tasks to offload training to managed services while maintaining the same unified workflow interface.

## Scale & Performance

The scale at which Flyte operates at Lyft is substantial and demonstrates the platform's production readiness. At the time of the announcement, Flyte was managing over **7,000 unique workflows** across the organization. These workflows collectively execute more than **100,000 times every month**, generating approximately **1 million individual task executions** and spawning **10 million containers** monthly.

This scale represents real production workloads across critical business domains. The Pricing team uses Flyte for complex pricing optimization workflows, the ETA team for arrival time prediction pipelines, the Mapping team for geospatial data processing, and perhaps most notably, the Level 5 Self-Driving division for autonomous vehicle machine learning workflows. The fact that Flyte became the de-facto platform for these mission-critical systems speaks to its reliability and performance characteristics.

The caching mechanism provides significant performance benefits in iterative development scenarios. For workflows involving hyperparameter optimization or repeated experimentation, tasks that haven't changed between runs can be skipped entirely, with their outputs retrieved from cache. This can dramatically reduce both execution time and infrastructure costs, particularly for expensive operations like large-scale data preparation or feature engineering steps that often remain constant while model training code evolves.

The multi-tenant architecture allows teams to scale independently without interfering with other platform users. Each team works in isolated repositories with their own containerized dependencies, and the platform handles resource allocation and scheduling across all tenants. This isolation prevents noisy neighbor problems while still enabling efficient resource utilization across the shared infrastructure.

## Trade-offs & Lessons

Flyte represents a sophisticated approach to workflow orchestration that makes several important architectural trade-offs. The decision to build on Kubernetes as the foundation provides powerful benefits in terms of scalability and cloud-native integration, but it also means that organizations must have Kubernetes expertise and infrastructure to operate Flyte. This is a reasonable trade-off for companies like Lyft that have already invested in Kubernetes, but it represents a barrier to entry for smaller organizations.

The strong typing system throughout Flyte is one of its most distinctive features and provides clear benefits for data lineage, caching, and workflow parameterization. However, this requires developers to be explicit about their data contracts, which can feel like additional overhead compared to more loosely typed workflow systems. The Flyte team clearly believes this trade-off is worthwhile, and the ability to cache task outputs and track data lineage automatically justifies the upfront investment in type declarations.

The immutability and versioning design is a powerful choice that enables reproducibility and safe sharing across teams. Every change creates a new version rather than modifying existing entities in place. This approach prevents subtle bugs from version conflicts and makes rollback trivial, but it also means that the platform must manage a growing catalog of versions over time. The benefits for production ML systems, where reproducibility is critical, clearly outweigh the storage overhead.

The plugin architecture demonstrates thoughtful extensibility design. By providing two levels of extensibility (FlyteKit extensions for simple integrations and backend plugins for complex execution semantics), Flyte accommodates both rapid integration of new services and deep customization when needed. This flexibility allows teams to integrate single-point solutions and best-of-breed tools into their workflows rather than forcing everything into a one-size-fits-all model. The examples of integrating Spark, Amazon SageMaker, and Qubole show how this extensibility enables heterogeneous workflows that match the reality of production ML systems.

The Python-based DSL strikes a balance between expressiveness and accessibility. By using Python rather than YAML or a proprietary configuration language, Flyte makes workflows programmable and testable while remaining familiar to data scientists and ML engineers. The DSL is declarative enough to enable Flyte to optimize execution but imperative enough that developers can express complex logic naturally.

One notable insight from Flyte's design is the recognition that workflow orchestration must handle heterogeneity as a first-class concern. Modern ML pipelines rarely consist of homogeneous steps; they typically combine data processing in Spark, model training in Python or TensorFlow, validation queries against data warehouses, and deployment to various serving systems. Flyte's architecture explicitly supports this heterogeneity rather than fighting against it.

The multi-tenant, serverless model addresses a key organizational challenge: how to provide powerful orchestration capabilities without requiring every team to become infrastructure experts. By hosting Flyte as a shared platform, Lyft enables teams to deploy and scale workflows without managing clusters or worrying about operational concerns. This democratization of ML infrastructure is essential for scaling ML across large organizations.

After three years in production serving thousands of workflows and millions of executions, Flyte has demonstrated that a well-architected workflow orchestration platform can become foundational infrastructure for ML-driven organizations. The decision to open source Flyte reflects both confidence in the design and recognition that workflow orchestration is not a competitive differentiator but rather shared infrastructure that benefits from community contribution and standardization.
