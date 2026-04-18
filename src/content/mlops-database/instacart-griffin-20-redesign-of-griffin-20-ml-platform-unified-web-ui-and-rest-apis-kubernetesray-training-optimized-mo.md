---
title: "Redesign of Griffin 2.0 ML platform: unified web UI and REST APIs, Kubernetes+Ray training, optimized model registry and automated model/de"
slug: "instacart-griffin-20-redesign-of-griffin-20-ml-platform-unified-web-ui-and-rest-apis-kubernetesray-training-optimized-mo"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "airflow"
  - "dask"
  - "databricks"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "spark"
  - "terraform"
  - "ab-testing"
  - "data-ingestion"
  - "data-prep"
  - "data-validation"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Instacart"
companySlug: "instacart"
platformName: "Griffin 2.0"
contentType: "blog"
summary: "Instacart's Griffin 2.0 represents a comprehensive redesign of their ML platform to address critical limitations in the original version, which relied heavily on command-line tools and GitHub-based workflows that created a steep learning curve and fragmented user experience. The platform evolved from CLI-based interfaces to a unified web UI with REST APIs, migrated training infrastructure to Kubernetes and Ray for distributed computing capabilities, rebuilt the serving platform with optimized model registry and automated deployment, and enhanced their Feature Marketplace with data validation and improved storage patterns. This transformation enabled Instacart to support emerging use cases like distributed training and LLM fine-tuning while dramatically reducing the time required to deploy inference services and improving overall platform usability for machine learning engineers and data scientists."
link: "https://www.instacart.com/company/tech-innovation/introducing-griffin-2-0-instacarts-next-gen-ml-platform"
year: 2023
seo:
  title: "Instacart: Redesign of Griffin 2.0 ML platform: unified web UI and REST APIs, Kubernetes+Ray training, optimized model registry and automated model/de - ZenML MLOps Database"
  description: "Instacart's Griffin 2.0 represents a comprehensive redesign of their ML platform to address critical limitations in the original version, which relied heavily on command-line tools and GitHub-based workflows that created a steep learning curve and fragmented user experience. The platform evolved from CLI-based interfaces to a unified web UI with REST APIs, migrated training infrastructure to Kubernetes and Ray for distributed computing capabilities, rebuilt the serving platform with optimized model registry and automated deployment, and enhanced their Feature Marketplace with data validation and improved storage patterns. This transformation enabled Instacart to support emerging use cases like distributed training and LLM fine-tuning while dramatically reducing the time required to deploy inference services and improving overall platform usability for machine learning engineers and data scientists."
  canonical: "https://www.zenml.io/mlops-database/instacart-griffin-20-redesign-of-griffin-20-ml-platform-unified-web-ui-and-rest-apis-kubernetesray-training-optimized-mo"
  ogTitle: "Instacart: Redesign of Griffin 2.0 ML platform: unified web UI and REST APIs, Kubernetes+Ray training, optimized model registry and automated model/de - ZenML MLOps Database"
  ogDescription: "Instacart's Griffin 2.0 represents a comprehensive redesign of their ML platform to address critical limitations in the original version, which relied heavily on command-line tools and GitHub-based workflows that created a steep learning curve and fragmented user experience. The platform evolved from CLI-based interfaces to a unified web UI with REST APIs, migrated training infrastructure to Kubernetes and Ray for distributed computing capabilities, rebuilt the serving platform with optimized model registry and automated deployment, and enhanced their Feature Marketplace with data validation and improved storage patterns. This transformation enabled Instacart to support emerging use cases like distributed training and LLM fine-tuning while dramatically reducing the time required to deploy inference services and improving overall platform usability for machine learning engineers and data scientists."
mlops:
  source: "sqlite"
  entryId: 205
  sourceUrl: "https://www.instacart.com/company/tech-innovation/introducing-griffin-2-0-instacarts-next-gen-ml-platform"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.617946"
  lastUpdated: "2026-04-14T19:55:58.874593"
---

## Problem Context

Instacart's Griffin 1.0 ML platform successfully tripled the number of ML applications within a year, demonstrating strong adoption across the organization. However, as the platform matured, several fundamental limitations emerged that constrained further growth and created friction for ML teams.

The primary pain point centered on user experience complexity. Machine learning engineers required several days to weeks to become proficient with the in-house command-line tools despite extensive documentation and training sessions. The deployment process demanded knowledge of AWS ECS (Elastic Container Services) for launching inference services, introducing unnecessary operational complexity that fell outside the core expertise of data scientists and ML engineers. Performance optimization required tuning system parameters like Gunicorn thread counts, another area beyond typical ML practitioner domain knowledge.

The platform suffered from lack of standardization, with interactions heavily relying on GitHub Pull Requests. MLEs needed to customize multiple PRs for routine tasks including creating new projects, indexing features, setting up Airflow DAGs, and establishing real-time inference services through Terraform. This manual, PR-based workflow created bottlenecks and slowed iteration cycles.

Scalability constraints posed another critical challenge. Griffin 1.0's training platform only supported vertical scaling, making distributed training and LLM fine-tuning infeasible. The MLFlow-based backend for the model registry couldn't handle the required throughput of hundreds to thousands of queries per second effectively, creating performance bottlenecks as adoption increased.

The integration of various third-party vendor solutions created a fragmented user experience, forcing MLEs to context-switch between multiple platforms to get a comprehensive view of their workloads. This fragmentation extended to metadata management, where client-facing CLI tools initiated feature engineering and training workloads in a "fire-and-forget" manner, making it challenging to retrieve metadata later or manage training-serving lineage for seamless production transitions.

These limitations collectively motivated a comprehensive platform redesign focused on user-friendliness, unified experience, scalability, and support for emerging ML capabilities.

## Architecture & Design

Griffin 2.0's architecture centers on four major building blocks that work together through a unified API layer: the ML Training Platform, ML Serving Platform, Feature Marketplace, and a centralized web UI that ties everything together.

The **API Service** forms the foundation of the new architecture, replacing CLI and GitHub PR-based workflows with REST APIs. These APIs enable feature creation, training job submission, model registration, and inference service establishment. The Griffin UI leverages these APIs to provide seamless access to backend applications, while the Griffin SDK exposes many APIs for programmatic access, enabling automation from different clients including Instacart's in-house ML notebook environment, BentoML.

The **ML Training Platform** underwent fundamental architectural changes, migrating to Kubernetes as the unified backend for all training workloads. This consolidation simplified management of multiple third-party backends and created a consistent approach across training jobs. The platform leverages Ray for distributed computing capabilities, enabling horizontally scaled ML training that wasn't possible in Griffin 1.0. The platform provides configuration-based runtimes for TensorFlow and LightGBM, standardizing Python libraries and covering the complete workflow from data processing through feature transformation, training, evaluation, and batch inference.

The **ML Serving Platform** represents a complete reimagining of model deployment with four key components working in concert. The Model Registry stores model artifacts with significantly improved scalability compared to the MLFlow-based system in Griffin 1.0. The Control Plane facilitates easy model deployment via the UI, abstracting away the complexity of AWS ECS configuration. The Proxy component manages experiments between different model versions, enabling A/B testing and gradual rollouts. The Worker component executes the core inference pipeline including feature retrieval, preprocessing, and model inference. This architectural separation allows fine-tuning of service resources, latency optimization, request scaling, and reduced maintenance burden.

The **Feature Marketplace** provides centralized management of feature computation, ingestion, discoverability, access, and shareability. The platform supports both "Batch Feature Sources" using SQL queries and "Real Time features" supporting Flink SQL and Flink Scala code. The architecture implements data validation to catch errors in feature generation early in the pipeline, along with intelligent storage optimization and access patterns to ensure low-latency feature retrieval during both training and serving.

The **Griffin UI** serves as the unified control plane, providing MLEs and data scientists access to all systems from a single interface. The workflow begins with feature definition in the "Feature Sources" section, proceeds to "Workflows" for submitting training, evaluation, and scoring pipelines, provides detailed views of workflow execution history, exposes the Model Registry for version management, and enables "endpoint" creation for real-time ML services. The UI incorporates validation at different stages to identify errors before expensive computation begins, optimizing cost efficiency.

## Technical Implementation

Griffin 2.0's technical stack represents a strategic consolidation around industry-standard tools and cloud-native infrastructure, moving away from the heterogeneous backend systems of Griffin 1.0.

The platform standardized on **Kubernetes** as the universal compute substrate for ML training workloads, unifying what were previously multiple third-party backends. This Kubernetes foundation enables consistent resource management, scheduling, and monitoring across all training jobs.

**Ray** serves as the distributed computing framework, providing the horizontal scalability absent in Griffin 1.0. Ray's integration enables distributed training workloads and positions the platform to support LLM fine-tuning, which requires coordinating computation across multiple nodes. Instacart presented their Griffin ML Training Platform implementation at Ray Summit 2023, highlighting Ray as a critical enabling technology.

The containerization strategy continued from Griffin 1.0 but with enhanced automation. **Docker** provides consistent build environments throughout prototyping, training, and inference stages. However, the new architecture abstracts container management complexity behind the API layer, eliminating the need for MLEs to manually configure ECS services.

**Apache Flink** (supporting both Flink SQL and Flink Scala) powers real-time feature computation in the Feature Marketplace, complementing batch feature sources that use SQL queries. This dual-mode approach allows Griffin to support both streaming and batch feature engineering workflows.

The serving infrastructure leverages **AWS ECS** for container orchestration, but the Control Plane and automation abstracts this complexity from end users. The platform uses **Twirp** as the RPC framework for model serving, continuing from Griffin 1.0 but with enhanced automation around deployment.

**Airflow** remains the workflow orchestration engine for scheduling and managing ML pipelines, though the new architecture reduces the need for MLEs to manually configure Airflow DAGs through PRs. The UI-based workflow creation automatically generates appropriate Airflow configurations.

The model registry moved away from the MLFlow backend that couldn't scale to required throughput levels, though the specific replacement technology isn't detailed in the source. The new registry architecture supports hundreds to thousands of queries per second, addressing the bottleneck from Griffin 1.0.

Integration with external systems including **Datadog** for monitoring and observability remains, but these integrations are now accessible through the unified UI rather than requiring context-switching between platforms.

The Griffin SDK and REST API layer likely built on standard Python web frameworks, enabling programmatic access for automation while the web UI provides point-and-click interfaces for common workflows.

## Scale & Performance

While the source doesn't provide extensive quantitative metrics, several performance improvements and scale achievements are noted.

Griffin 1.0 successfully **tripled the number of ML applications within a year**, demonstrating strong platform adoption and impact on organizational ML velocity. This growth trajectory created the scalability pressures that motivated Griffin 2.0's architectural changes.

The model registry in Griffin 1.0 couldn't handle the required throughput of **hundreds to thousands of queries per second**, creating a clear bottleneck. Griffin 2.0's redesigned registry architecture specifically addresses this throughput requirement, though specific achieved QPS metrics aren't provided.

The ML Serving Platform achieved **substantial latency optimization for real-time inference**, though specific millisecond improvements aren't quantified. The architectural changes including resource fine-tuning, request scaling capabilities, and the optimized Worker component all contributed to these latency gains.

**Deployment time for inference services was drastically reduced** through automation and the Control Plane abstraction layer, moving from a manual multi-PR process to a few-click UI workflow. The exact time reduction isn't specified, but the shift from days-to-weeks of learning curve to streamlined deployment suggests order-of-magnitude improvements.

The platform now supports **distributed training** capabilities through Ray and Kubernetes that enable horizontal scaling, in contrast to Griffin 1.0's vertical-only scaling. This enables training of larger models and faster iteration cycles, though specific cluster sizes or training speedups aren't detailed.

The Feature Marketplace implements **intelligent storage optimization and access patterns to ensure low-latency access to features**, critical for both training data pipelines and real-time serving. The addition of data validation catches errors earlier in the pipeline, preventing wasted computation and improving cost efficiency, though specific cost savings aren't quantified.

The consolidation of multiple backend platforms and the shift from CLI to API-driven workflows reduced operational overhead for both the platform team and ML practitioners, though specific headcount or productivity metrics aren't provided.

## Trade-offs & Lessons Learned

Griffin's evolution from 1.0 to 2.0 reveals several important lessons about ML platform design and the trade-offs inherent in different architectural approaches.

**The CLI vs. UI trade-off** represents a fundamental lesson. Griffin 1.0's command-line and GitHub PR-based interfaces prioritized flexibility and version control but created a steep learning curve requiring days to weeks of onboarding. The shift to web UI and REST APIs in Griffin 2.0 dramatically improved usability and reduced time-to-productivity, though this potentially sacrifices some of the reproducibility and infrastructure-as-code benefits that PR-based workflows provide. The inclusion of the Griffin SDK provides a middle ground, enabling automation while maintaining the simplified UI for interactive use.

**Extensibility vs. standardization** emerged as a key tension. Griffin 1.0 emphasized extensibility and versatility, allowing MLEs to customize workflows through multiple PRs and integrate diverse backends. While this flexibility enabled diverse use cases, it created fragmentation and operational complexity. Griffin 2.0 shifts toward standardization with configuration-based runtimes for TensorFlow and LightGBM, opinionated workflows, and unified interfaces. This trade-off accepts some reduction in flexibility to gain consistency, reduced maintenance burden, and faster onboarding. The platform still maintains extensibility through its API layer and SDK, but channels it through more structured interfaces.

**Build vs. buy decisions** evolved between versions. Griffin 1.0 integrated various third-party vendor solutions including MLFlow for the model registry, multiple ML backends, and external monitoring tools. While this accelerated initial development, it created the fragmented user experience and scalability limitations that motivated the rebuild. Griffin 2.0 invested in building custom components like the redesigned model registry and serving platform control plane, accepting higher initial development cost for better integration, scalability, and user experience. However, the platform continues leveraging proven open-source tools like Ray, Kubernetes, and Flink rather than building everything from scratch.

**The importance of metadata management and lineage** emerged as a critical lesson. Griffin 1.0's "fire-and-forget" approach to workload execution made it difficult to retrieve metadata or manage training-serving lineage. Griffin 2.0's centralized data store for ML lifecycle metadata addresses this gap, enabling better debugging, reproducibility, and production transitions. This represents recognition that ML platforms must be systems of record, not just execution environments.

**Incremental vs. revolutionary change** played out in Griffin's evolution. Rather than attempting to fix Griffin 1.0 incrementally, Instacart committed to a comprehensive redesign addressing fundamental architectural limitations. This approach enabled clean-sheet thinking about user experience and scalability but required substantial engineering investment and likely a migration period where both versions coexisted. The blog post notes "ongoing work to refine Griffin 2.0" and "actively gathering feedback," suggesting the platform team understood that even after a major redesign, continuous iteration remains essential.

**The value of consolidation** emerges clearly from Griffin's journey. Unifying multiple third-party backends on Kubernetes, centralizing all functionality in one UI, and providing a single API layer all reduced cognitive overhead and context-switching costs. However, this consolidation required significant platform team investment to build integration layers and abstractions.

**Preparing for future capabilities** informed architectural choices. The distributed computing support through Ray, Kubernetes-based infrastructure, and redesigned serving platform positioned Griffin 2.0 for emerging use cases like LLM fine-tuning before these became critical requirements. This forward-looking approach accepts some additional current complexity for future flexibility, a trade-off that proved prescient given the ChatGPT-driven acceleration of LLM adoption mentioned in the conclusion.

The collaborative development involving Core Infrastructure, Ads Infrastructure, Data Engineering, and ML Foundations teams highlights that successful ML platforms require cross-functional collaboration, not just ML expertise. This organizational lesson suggests that platform teams need strong partnerships across infrastructure, data, and application domains.

Finally, the explicit focus on **cost optimization through validation** demonstrates mature platform thinking. By incorporating validation at multiple stages and preventing execution of jobs when errors are detected, Griffin 2.0 reduces wasted compute spend, a consideration that becomes critical at scale.
