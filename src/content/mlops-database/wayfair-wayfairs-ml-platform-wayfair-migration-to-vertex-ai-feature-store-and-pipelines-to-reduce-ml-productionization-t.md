---
title: "Wayfair migration to Vertex AI Feature Store and Pipelines to reduce ML productionization time and automate tuning"
slug: "wayfair-wayfairs-ml-platform-wayfair-migration-to-vertex-ai-feature-store-and-pipelines-to-reduce-ml-productionization-t"
draft: false
mlopsTags:
  - "compute-management"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "terraform"
  - "vertex-ai"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Wayfair"
companySlug: "wayfair"
platformName: "Wayfair's ML platform"
contentType: "blog"
summary: "Wayfair migrated their ML infrastructure to Google Cloud's Vertex AI platform to address the fragmentation and operational overhead of their legacy ML systems. Prior to this transformation, each data science team built their own unique model productionization processes on unstable infrastructure, lacking centralized capabilities like a feature store. By adopting Vertex AI Feature Store and Vertex AI Pipelines, and building custom CI/CD pipelines and a shared Python library called wf-vertex, Wayfair reduced model productionization time from over three months to approximately four weeks, with plans to further reduce this to two weeks. The platform enables data scientists to work more autonomously, supporting both batch and online serving with managed infrastructure while maintaining model quality through automated hyperparameter tuning."
link: "https://www.aboutwayfair.com/careers/tech-blog/how-wayfair-is-reaching-mlops-excellence-with-vertex-ai"
year: 2023
seo:
  title: "Wayfair: Wayfair migration to Vertex AI Feature Store and Pipelines to reduce ML productionization time and automate tuning - ZenML MLOps Database"
  description: "Wayfair migrated their ML infrastructure to Google Cloud's Vertex AI platform to address the fragmentation and operational overhead of their legacy ML systems. Prior to this transformation, each data science team built their own unique model productionization processes on unstable infrastructure, lacking centralized capabilities like a feature store. By adopting Vertex AI Feature Store and Vertex AI Pipelines, and building custom CI/CD pipelines and a shared Python library called wf-vertex, Wayfair reduced model productionization time from over three months to approximately four weeks, with plans to further reduce this to two weeks. The platform enables data scientists to work more autonomously, supporting both batch and online serving with managed infrastructure while maintaining model quality through automated hyperparameter tuning."
  canonical: "https://www.zenml.io/mlops-database/wayfair-wayfairs-ml-platform-wayfair-migration-to-vertex-ai-feature-store-and-pipelines-to-reduce-ml-productionization-t"
  ogTitle: "Wayfair: Wayfair migration to Vertex AI Feature Store and Pipelines to reduce ML productionization time and automate tuning - ZenML MLOps Database"
  ogDescription: "Wayfair migrated their ML infrastructure to Google Cloud's Vertex AI platform to address the fragmentation and operational overhead of their legacy ML systems. Prior to this transformation, each data science team built their own unique model productionization processes on unstable infrastructure, lacking centralized capabilities like a feature store. By adopting Vertex AI Feature Store and Vertex AI Pipelines, and building custom CI/CD pipelines and a shared Python library called wf-vertex, Wayfair reduced model productionization time from over three months to approximately four weeks, with plans to further reduce this to two weeks. The platform enables data scientists to work more autonomously, supporting both batch and online serving with managed infrastructure while maintaining model quality through automated hyperparameter tuning."
mlops:
  source: "sqlite"
  entryId: 134
  sourceUrl: "https://www.aboutwayfair.com/careers/tech-blog/how-wayfair-is-reaching-mlops-excellence-with-vertex-ai"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061759"
  lastUpdated: "2026-04-14T19:55:22.647534"
---

## Problem Context

Wayfair faced significant MLOps challenges as they migrated to Google Cloud between 2019-2021. Their legacy infrastructure suffered from fundamental structural problems that impeded data science productivity and model reliability. Each data science team operated in isolation, building bespoke model productionization processes on infrastructure components that struggled with stability and generated substantial operational overhead. This fragmentation meant teams were reinventing the wheel repeatedly, with no standardization across the organization.

The absence of a centralized feature store created particular pain points. Feature engineering work was duplicated across teams, and there was no consistent way to ensure feature consistency between training and serving environments. Data scientists lacked autonomy to productionize models independently, requiring extensive engineering support for even basic deployment tasks. The workflow orchestration technology available at Wayfair was severely limiting, slowing down the entire ML lifecycle. Models for both batch and online serving required custom infrastructure work for each deployment, and continuous monitoring of data and models in production was difficult to achieve systematically.

Beyond technical limitations, the organizational impact was substantial. Data scientists spent disproportionate time on infrastructure concerns rather than model development and improvement. The lack of reliable, automated processes for model training, evaluation, and validation meant that getting models to production was a multi-month endeavor. This situation was fundamentally incompatible with Wayfair's MLOps vision of enabling data scientist autonomy while maintaining collaboration across teams with access to reliable, automated infrastructure.

## Architecture & Design

Wayfair's Vertex AI-based MLOps platform centers on several key architectural components that work together to create an end-to-end ML lifecycle management system. The architecture leverages Google Cloud's native services while adding Wayfair-specific abstractions and tooling.

**Vertex AI Feature Store** forms the foundation of the platform, providing centralized feature management that serves all ML projects across Wayfair. The Feature Store enables data scientists to retrieve features for model training with minimal code, and critically, it provides feature serving for both batch and online inference through a single line of code. The service automatically manages performance optimization for both batch and online request patterns, abstracting away infrastructure complexity that previously required custom engineering.

**Vertex AI Pipelines**, built on Kubeflow, orchestrate the entire ML workflow from data processing through model training, evaluation, and deployment. The pipeline architecture supports complex workflows including parallel execution of training jobs and sophisticated hyperparameter tuning patterns. Wayfair designed mechanisms to work around current Kubeflow limitations, particularly around combining outputs from parallel pipeline components. They implemented runtime parameter definitions that enable parallel execution via Kubeflow's parallel-for operator, followed by aggregation steps that select optimal models from candidates trained simultaneously.

**CI/CD Pipeline Infrastructure** connects GitHub Enterprise repositories to automated build and deployment processes. When changes are pushed to pipeline code repositories, Buildkite automatically triggers builds that include unit tests, integration tests, code linting, and documentation generation. The build process produces two critical artifacts: Docker images stored in Google Cloud Artifact Registry, and compiled Kubeflow templates stored in versioned Google Cloud Storage buckets. This ensures all components needed for pipeline execution are properly versioned and secured.

**Scheduling Infrastructure** decouples pipeline execution from pipeline definition through a Cloud Function-based architecture. A dedicated Cloud Function with appropriate permissions listens to a Pub/Sub topic for messages with a defined schema indicating which pipeline to run and with which parameters. Simple cron jobs running on Google Kubernetes Engine publish these messages according to configured schedules. This design creates a secure, decoupled environment using fully-managed Google Cloud services.

**Abstraction Layer** sits atop these components in the form of the wf-vertex shared Python library. This library encapsulates common patterns and provides helper methods that simplify interaction with Vertex AI services. It standardizes how teams interact with the Feature Store, Pipelines, and Artifact Registry, establishing documented best practices for common tasks like hyperparameter tuning and pipeline execution.

The data flow through this architecture follows a typical ML lifecycle pattern: features are registered and managed in the Feature Store, pipeline code is developed and versioned in GitHub, CI/CD processes build and deploy pipeline artifacts, scheduled or manual triggers initiate pipeline runs that pull features from the Feature Store for training, trained models are evaluated potentially in parallel with different hyperparameters, and the best-performing model is selected for deployment to batch or online serving endpoints.

## Technical Implementation

Wayfair's implementation leverages a comprehensive stack of Google Cloud services integrated with their existing enterprise tooling. The technical foundation rests on **Google Cloud Platform** as the primary infrastructure provider, with workloads running across multiple managed services.

**Version Control and Code Management** utilizes GitHub Enterprise as the central repository for all Vertex AI Pipeline code. These repositories contain both Kubeflow pipeline definitions written in Python and Docker image specifications that define the runtime environment for pipeline components. The choice to maintain Kubeflow code alongside Docker definitions in the same repositories ensures consistency between pipeline logic and execution environment.

**Build and CI/CD Automation** runs on **Buildkite**, which Wayfair uses as their continuous integration platform. Build pipelines automatically trigger on code changes, executing comprehensive test suites including unit tests for individual components and integration tests that validate end-to-end pipeline functionality. Code quality gates include linting checks and automated documentation generation. The build process culminates in artifact publishing, pushing Docker images to **Google Cloud Artifact Registry** and compiled Kubeflow templates to **Google Cloud Storage buckets** with full versioning support.

**Pipeline Orchestration** relies on **Kubeflow Pipelines** as implemented in Vertex AI. Wayfair's data scientists write pipeline definitions using the Kubeflow SDK, which compiles to YAML specifications that Vertex AI executes. To enable hyperparameter tuning at scale, Wayfair engineered a solution that leverages Kubeflow's parallel-for operator to train multiple model variants simultaneously with different hyperparameter configurations. This required custom component development to aggregate results from parallel executions, as native Kubeflow support for combining parallel outputs was not yet available.

**Scheduling Infrastructure** combines three Google Cloud services in a message-driven architecture. **Google Kubernetes Engine (GKE)** hosts simple cron jobs that trigger on defined schedules. Rather than executing pipelines directly, these cron jobs publish messages to a **Pub/Sub** topic with a standardized schema specifying pipeline identifiers and runtime parameters. A **Cloud Function** subscribes to this topic and possesses the necessary permissions to initiate Vertex AI Pipeline runs based on incoming messages. This decoupling provides security isolation and leverages fully-managed infrastructure.

**Feature Store Integration** enables models to access features through the Vertex AI Feature Store API. Data scientists use Python SDK methods to read features during training, and the same feature definitions serve online and batch inference through Vertex AI's serving infrastructure. The Feature Store handles performance optimization automatically, managing caching and query optimization for both access patterns.

**Shared Library Development** produced the **wf-vertex** Python library, which wraps common Vertex AI operations in simplified interfaces. A key method, `run_pipeline`, abstracts the complexity of publishing correctly-formatted messages to the Pub/Sub topic for pipeline execution. Data scientists call this method without needing to understand the underlying security or infrastructure configuration. The library includes documented examples and best practices that standardize how teams approach common MLOps tasks.

**Hyperparameter Tuning Optimization** represents a significant technical achievement. Wayfair's implementation enables parallel hyperparameter search across multiple configurations, dramatically compressing tuning cycles. The mechanism defines parameter ranges at runtime, spawns parallel training jobs via Kubeflow's parallel-for construct, and aggregates results to identify the optimal configuration based on accuracy or other metrics. This pattern became a documented best practice in the wf-vertex library.

The technology choices reflect a deliberate balance between Google Cloud managed services and Wayfair's existing enterprise tooling. By integrating GitHub Enterprise and Buildkite with Google Cloud services, Wayfair maintained continuity with developer workflows while adopting cloud-native infrastructure for ML workloads. The use of managed services like Cloud Functions, Pub/Sub, and GKE for scheduling infrastructure minimizes operational burden while providing the flexibility to implement Wayfair-specific patterns.

## Scale & Performance

The case study provides several concrete metrics demonstrating the impact of Wayfair's Vertex AI adoption, primarily focused on productivity improvements and time-to-production reductions.

**Hyperparameter Tuning Performance** shows the most dramatic improvement. Prior to implementing the parallel hyperparameter tuning pattern in Vertex AI Pipelines, data scientists required approximately two weeks to complete hyperparameter optimization for models. The new architecture, which trains multiple model variants simultaneously using Kubeflow's parallel-for operator, reduced this time to under one hour. This represents a roughly 300x speedup in hyperparameter search, fundamentally changing how quickly teams can iterate on model development.

**Model Productionization Timeline** improved significantly through the combination of CI/CD automation, the wf-vertex shared library, and Vertex AI's managed infrastructure. Before adopting Vertex AI, taking a model from development to production required more than three months of effort. This timeline included building custom productionization processes, configuring infrastructure, and implementing monitoring. With Vertex AI Feature Store, Pipelines, and the supporting tooling, this timeline compressed to approximately four weeks. As of the article's publication in February 2023, Wayfair projected further reduction to two weeks by the end of 2022 (likely meaning end of 2023 given publication timing) as teams gained more expertise with the platform and the shared library matured.

**Feature Access Efficiency** improved through the Feature Store's single line of code interface for both training and serving. While specific query latencies or throughput numbers are not provided, the automatic performance management for batch and online requests eliminated the need for custom optimization work that previously consumed engineering time. The Feature Store's ability to serve features consistently across training and inference environments also reduces a common source of model performance degradation.

**Development Velocity** accelerated as the wf-vertex library matured and best practices became established. Teams developing new ML models or migrating existing models to Vertex AI benefit from documented patterns, example code, and helper methods that abstract infrastructure complexity. The shared library approach means each team doesn't need to independently discover optimal implementation patterns.

The case study indicates that Wayfair was serving multiple models in production on Vertex AI as of early 2023, with plans to eventually migrate 100% of batch models to the platform. While specific numbers of models, features, or serving request volumes are not disclosed, the organizational commitment to full migration suggests the platform successfully handles Wayfair's production-scale requirements. The mention of supporting "a diverse set of requirements across the organization" for the Data Science Customer Interaction & Optimizations team indicates the platform serves multiple use cases with varying characteristics.

## Trade-offs & Lessons

Wayfair's journey to Vertex AI reveals several important insights about MLOps platform adoption and the practical trade-offs involved in modernizing ML infrastructure.

**Incremental Adoption Strategy** proved essential. Rather than attempting to migrate all ML workloads simultaneously, Wayfair began with a proof of concept focused specifically on Vertex AI Feature Store. This initial POC validated that data scientists could easily retrieve features and serve models with minimal code, building confidence before expanding scope. Only after Feature Store success did they tackle Vertex AI Pipelines, which addressed their workflow orchestration pain points. This phased approach reduced risk and allowed teams to build expertise incrementally while delivering value at each stage.

**Abstraction Layer Necessity** emerged as a critical success factor. While Vertex AI provides comprehensive capabilities, Wayfair found that building the wf-vertex shared library significantly improved adoption. The library serves multiple purposes: it simplifies common operations like pipeline execution, establishes documented best practices that prevent teams from solving the same problems repeatedly, and provides Wayfair-specific patterns like the hyperparameter tuning mechanism. This abstraction layer represents additional engineering investment but dramatically lowered the barrier to entry for data scientists. The trade-off is maintaining this library as Vertex AI evolves, but the productivity gains justify this ongoing cost.

**Kubeflow Limitations Required Workarounds** particularly around combining outputs from parallel pipeline components. At the time of implementation, Kubeflow did not natively support aggregating results from parallel executions. Wayfair engineered a custom solution using runtime parameter definitions and the parallel-for operator, followed by aggregation components. While this pattern works effectively for their hyperparameter tuning use case, it represents additional complexity that wouldn't be necessary with native support. This highlights a common trade-off with adopting relatively new platforms—teams must sometimes build workarounds for missing capabilities while benefiting from the platform's other strengths.

**Scheduling Architecture Choices** reflect deliberate security and maintainability decisions. The decoupled architecture using Pub/Sub, Cloud Functions, and GKE cron jobs is more complex than directly triggering pipelines from schedulers. However, this design provides better security isolation, leverages fully-managed infrastructure, and creates clear separation between scheduling logic and execution permissions. The trade-off is additional components to maintain, but Wayfair deemed this worthwhile for the operational benefits.

**Integration with Existing Tooling** shaped implementation decisions. By maintaining GitHub Enterprise for version control and Buildkite for CI/CD rather than adopting Google Cloud alternatives, Wayfair preserved existing developer workflows and expertise. This reduced the learning curve for teams adopting Vertex AI, as they continued using familiar development tools. The trade-off is managing integration between these systems and Google Cloud services, but maintaining developer productivity during migration outweighed the complexity cost.

**Autonomy vs. Standardization Balance** appears carefully managed. The platform aims to give data scientists autonomy to productionize models without engineering dependencies, but achieves this through standardized patterns in the wf-vertex library and opinionated CI/CD pipelines. This represents a conscious choice to enable autonomy within guardrails rather than complete freedom. Teams gain independence for their ML work while following organizational best practices, reducing fragmentation without imposing rigid constraints.

**Managed Services Adoption** eliminated operational overhead that plagued their legacy infrastructure. By leveraging Vertex AI's managed Feature Store, pipeline execution, and serving infrastructure, Wayfair offloaded stability concerns and performance optimization to Google. The trade-off is reduced control and potential vendor lock-in, but the case study suggests operational reliability improvements justified this dependency.

**Future Direction Signals** reveal ongoing maturation. Wayfair's roadmap includes Vertex AI Model Registry, ML Metadata, AutoML capabilities, and automated data and model monitoring. The fact these weren't included in initial adoption suggests a pragmatic approach focused on solving immediate pain points (feature management and workflow orchestration) before expanding to additional capabilities. This staged roadmap prevents overwhelming teams while building toward comprehensive MLOps coverage.

**Key Practitioner Insights** emerge from Wayfair's experience. First, building shared libraries and abstractions significantly accelerates platform adoption across teams. Second, proof-of-concept validation of specific platform components before full commitment reduces migration risk. Third, integrating new platforms with existing developer tooling smooths adoption curves. Fourth, working around current platform limitations can be worthwhile when other benefits are substantial, particularly when platform providers are actively developing missing capabilities. Finally, focusing initial efforts on centralized capabilities like feature stores that benefit multiple teams creates broad organizational value quickly.
