---
title: "Ray-based ML platform modernization with unified compute layer and Ray control plane for multi-region workflows"
slug: "cloudkitchens-ray-powered-ml-platform-ray-based-ml-platform-modernization-with-unified-compute-layer-and-ray-control-pla"
draft: false
mlopsTags:
  - "compute-management"
  - "feature-store"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "argo"
  - "azure-ml"
  - "dask"
  - "databricks"
  - "iceberg"
  - "kubeflow"
  - "kubernetes"
  - "metaflow"
  - "ray"
  - "seldon"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "tech"
company: "CloudKitchens"
companySlug: "cloudkitchens"
platformName: "Ray-Powered ML Platform"
contentType: "video"
summary: "CloudKitchens (City Storage Systems) rebuilt their ML platform over five years, ultimately standardizing on Ray to address friction and complexity in their original architecture. The company operates delivery-only kitchen facilities globally and needed ML infrastructure that enabled rapid iteration by engineers and data scientists with varying backgrounds. Their original stack involved Kubernetes, Trino, Apache Flink, Seldon, and custom solutions that created high friction and required deep infrastructure expertise. After failed attempts with Kubeflow, Polyaxon, and Hopsworks due to Kubernetes compatibility issues, they successfully adopted Ray as a unified compute layer, complemented by Metaflow for workflow orchestration, Daft for distributed data processing, and a custom Ray control plane for multi-regional cluster management. The platform emphasizes developer velocity, cost efficiency, and abstraction of infrastructure complexity, with the ambitious goal of potentially replacing both Trino and Flink entirely with Ray-based solutions."
link: "https://www.youtube.com/watch?v=zaaKT0IyutQ"
year: 2024
seo:
  title: "CloudKitchens: Ray-based ML platform modernization with unified compute layer and Ray control plane for multi-region workflows - ZenML MLOps Database"
  description: "CloudKitchens (City Storage Systems) rebuilt their ML platform over five years, ultimately standardizing on Ray to address friction and complexity in their original architecture. The company operates delivery-only kitchen facilities globally and needed ML infrastructure that enabled rapid iteration by engineers and data scientists with varying backgrounds. Their original stack involved Kubernetes, Trino, Apache Flink, Seldon, and custom solutions that created high friction and required deep infrastructure expertise. After failed attempts with Kubeflow, Polyaxon, and Hopsworks due to Kubernetes compatibility issues, they successfully adopted Ray as a unified compute layer, complemented by Metaflow for workflow orchestration, Daft for distributed data processing, and a custom Ray control plane for multi-regional cluster management. The platform emphasizes developer velocity, cost efficiency, and abstraction of infrastructure complexity, with the ambitious goal of potentially replacing both Trino and Flink entirely with Ray-based solutions."
  canonical: "https://www.zenml.io/mlops-database/cloudkitchens-ray-powered-ml-platform-ray-based-ml-platform-modernization-with-unified-compute-layer-and-ray-control-pla"
  ogTitle: "CloudKitchens: Ray-based ML platform modernization with unified compute layer and Ray control plane for multi-region workflows - ZenML MLOps Database"
  ogDescription: "CloudKitchens (City Storage Systems) rebuilt their ML platform over five years, ultimately standardizing on Ray to address friction and complexity in their original architecture. The company operates delivery-only kitchen facilities globally and needed ML infrastructure that enabled rapid iteration by engineers and data scientists with varying backgrounds. Their original stack involved Kubernetes, Trino, Apache Flink, Seldon, and custom solutions that created high friction and required deep infrastructure expertise. After failed attempts with Kubeflow, Polyaxon, and Hopsworks due to Kubernetes compatibility issues, they successfully adopted Ray as a unified compute layer, complemented by Metaflow for workflow orchestration, Daft for distributed data processing, and a custom Ray control plane for multi-regional cluster management. The platform emphasizes developer velocity, cost efficiency, and abstraction of infrastructure complexity, with the ambitious goal of potentially replacing both Trino and Flink entirely with Ray-based solutions."
mlops:
  source: "sqlite"
  entryId: 219
  sourceUrl: "https://www.youtube.com/watch?v=zaaKT0IyutQ"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.618883"
  lastUpdated: "2026-04-14T19:56:04.835889"
---

## Problem Context

CloudKitchens (formally City Storage Systems) faced significant challenges with their original ML platform built over five years. The company operates delivery-only kitchen facilities worldwide and treats machine learning as a tool to help the business rather than an end in itself. Their vision is that ML should become a standard engineering competency accessible to engineers regardless of background, similar to QA or DevOps practices.

The initial platform suffered from several critical pain points. There were too many moving parts requiring specialized knowledge across Docker, Kubernetes, YAML, and custom resource definitions (CRDs). Data scientists with PhDs were being directed to documentation about Docker and Kubernetes just to deploy a model. The infrastructure team had built systems with theoretical purity in mind rather than practical velocity, requiring users to navigate monorepo-based release pipelines and conform to strict deployment patterns. High friction slowed down the core objective of getting things done quickly and efficiently.

The platform team identified three fundamental principles for the rebuild: time to completion (maximizing velocity for value creation), developer experience (making it fun and easy reduces friction), and cost efficiency (the "big O of real life" for startups that must optimize cash burn). Their existing stack violated all three principles through complexity, rigid opinions about "correct" deployment patterns, and operational overhead from maintaining multiple disparate systems.

## Architecture Evolution and Current Design

CloudKitchens' infrastructure journey reflects a philosophical commitment to Kubernetes that borders on dogmatic—they run nothing outside of Kubernetes and spent months debating operator patterns. This early investment paid dividends in Kubernetes expertise but created challenges when trying to adopt upstream open-source projects not designed for their specific Kubernetes patterns.

The evolution occurred across distinct phases:

**Years 1-2 (Foundation):** Google Cloud Platform as the cloud provider, heavy Kubernetes adoption, Trino as the primary data warehouse, Apache Hudi for storage format, Superset for visualization, and a monorepo architecture initially using Bazel (later abandoned for Python due to pain points).

**Year 3 (Expansion):** Introduction of notebooks, Seldon for model serving, and Apache Flink for stream processing. Notably, they actively avoided Apache Spark despite its ubiquity, viewing it as a "batch system" incompatible with their real-time focus. Data scientists ran Spark unofficially by piggybacking on other infrastructure, but it was never officially supported.

**2022 (Migration Year):** Dominated by a major migration from Google Cloud to Azure, including Argo workflow orchestration, a custom transpiler built on Kubeflow Pipelines to convert Python to YAML (because "nobody can understand YAML"), a custom-built feature store, addition of Nvidia GPUs, and Streamlit for interfaces.

**2023 (Exploration and Failure):** The team recognized the need for fundamental changes and attempted to deploy Kubeflow, Polyaxon, and Hopsworks. All three failed not due to the technologies themselves, but due to incompatibility with CloudKitchens' highly customized Kubernetes patterns. Ray was the only solution that successfully integrated with their existing infrastructure.

**2024 (Ray Consolidation):** The current architecture has standardized on Ray as the unified compute layer, added Metaflow for workflow abstraction, adopted Poetry for Python dependency management after abandoning Bazel, introduced Daft as the distributed data frame API, and migrated to Apache Iceberg for table format. The team is actively decommissioning old systems and controversially exploring whether Ray can replace both Trino and Apache Flink entirely.

## Technical Implementation Details

The current platform architecture consists of several sophisticated layers designed to abstract complexity while maintaining flexibility.

**Ray Infrastructure and Control Plane:**

The foundation is KubeRay, the Kubernetes operator for Ray, which serves as the default choice for Ray deployment on Kubernetes. However, the team built significant additional functionality on top through a custom Ray control plane service. This control plane handles cluster management and isolation, hiding YAML complexity from end users, providing simple cluster CRUD operations, enabling team-level isolation so teams can collaborate on data within dedicated clusters, and supporting multi-regional deployments to access specialized compute resources like specific GPU types unavailable in their primary region.

The data plane architecture includes a particularly clever Ray proxy component that handles authentication, authorization, and routing to the correct cluster. Users interact with a URL containing their project and team information rather than raw Ray cluster addresses. This abstraction enables future migration to ephemeral or serverless patterns without requiring users to change how they connect to Ray infrastructure. The ultimate goal is for users to submit Python code that "just works" without worrying about infrastructure details or Ray addresses.

**Data Processing with Daft:**

CloudKitchens made a deliberate bet on Daft, a very young open-source distributed data frame library, over more established options like Dask. The decision factors included Python-native API familiarity that reduced cognitive load compared to Spark's Java-based error traces, Rust implementation for performance (aligning with the trend of new database systems in Rust), built-in support for operations like joins that users requested immediately, Apache Arrow foundation enabling seamless interoperability with Ray Data, and an active, responsive community despite the project's youth.

Daft integrates with Trino as the SQL engine for reading from the data warehouse. The team views this combination as potentially capable of handling all batch and streaming data preparation without Apache Spark. This is a calculated risk—a "big bold bet" as the infrastructure lead described it—based on confidence in the team behind Daft and positive trajectory signals like AWS presentations at previous Ray Summits showing S3 cost reductions through Daft-based compactions.

**Metaflow Integration and Custom Plugins:**

Metaflow, the workflow framework open-sourced by Netflix, serves as the primary user-facing abstraction. Users write Python code locally, debug it, and when ready, submit it to Argo (the workflow engine) for durable execution on Kubernetes. Metaflow did not have out-of-the-box Ray support, so the CloudKitchens team built custom plugins.

The Ray plugin enables users to decorate Metaflow steps with a `@ray` decorator that automatically submits that step as a Ray job. The plugin packages the Metaflow code as a tarball, extracts it to a temporary directory, and executes `ray submit` while ensuring the decorated function respects Metaflow's execution semantics. The Poetry plugin reads `pyproject.toml` and `poetry.lock` files to extract dependencies and adds them using Metaflow's dependency management system. This integration allows users to write standard Python with familiar decorators while the platform handles distributed execution, dependency resolution, and cluster management transparently.

**Infrastructure Philosophy:**

The team follows a gateway pattern successfully used for Trino, where a smart proxy provides an entry point for platform logic. For Trino, they essentially built an internal AWS Athena equivalent where users submit SQL queries and the system handles cluster management invisibly, resulting in significantly lower costs (infrastructure plus people) compared to managed solutions like Snowflake.

For Ray, the control plane is not implemented as a Kubernetes operator but as actual software running on a distributed database. This architectural choice differs from their multi-regional operators pattern (used for systems like CockroachDB) and allows the control plane to determine submission targets before handing off local in-cluster responsibility to the KubeRay operator. The separation provides flexibility for future enhancements like ephemeral cluster creation based on URL parameters.

## Scale and Performance

The presentation did not provide extensive quantitative metrics, but several scale indicators emerged. The company operates delivery-only kitchen facilities globally across multiple regions, necessitating multi-regional infrastructure deployment. The Azure migration in 2022 represented a complete cloud platform shift, indicating substantial infrastructure scale. The addition of GPU support in 2022 and the need for multi-regional GPU access suggests ML workloads requiring specialized compute resources.

The cost optimization focus is explicit and paramount. The infrastructure lead emphasized that cost efficiency is the "big O of real life" for startups, and several architectural decisions were driven by cost considerations. Their internal Trino gateway implementation is described as "significantly cheaper" than alternatives like Snowflake when accounting for infrastructure plus personnel costs. The desire to replace both Trino and Flink with Ray stems partly from reducing operational footprint and associated costs of maintaining multiple systems.

Performance considerations influenced the choice of Daft over Ray Data when initial Ray Data implementations did not meet performance expectations for their workloads. The Rust implementation of Daft and its optimization for distributed operations aligned with their performance requirements.

## Trade-offs, Lessons Learned, and Key Insights

**Kubernetes Complexity as Double-Edged Sword:**

CloudKitchens' deep Kubernetes expertise enabled sophisticated patterns and operational excellence but created integration barriers. The failure to adopt Kubeflow, Polyaxon, and Hopsworks stemmed from incompatibility with their customized Kubernetes approach. The lesson here is that early opinionated architectural decisions create path dependencies that constrain future tooling choices. Their Kubernetes-everything philosophy required building custom integrations rather than leveraging turnkey solutions.

**The Value of Opinionated Platforms:**

The team explicitly shifted from being unopinionated ("we support many tools") to highly opinionated ("we provide specific tools we believe are best"). This reduces choice paralysis, enables deeper optimization of supported paths, and concentrates expertise rather than spreading it thin across disparate technologies. The infrastructure lead acknowledged that some might disagree with their choices, but limiting options increases velocity for the majority of users.

**Betting on Young Technologies:**

Choosing Daft represents a deliberate strategy of making "big bold bets" on promising but immature projects with strong teams. The calculus is that if the bet pays off, they gain competitive advantage through early adoption and community influence. The risk is investing in technologies that may not achieve production maturity or community traction. This approach requires confidence in technical evaluation and willingness to contribute back to or potentially fork if necessary.

**Abstracting Complexity vs. Enabling Power Users:**

The platform prioritizes making simple things very easy while keeping hard things possible. The Metaflow abstraction with Python decorators enables data scientists to write familiar code without understanding Ray internals. The Ray proxy and control plane hide cluster management complexity. However, the infrastructure remains accessible for power users who need fine-grained control. This balancing act requires thoughtful API design and layered abstractions.

**The Monorepo and Build System Journey:**

The early adoption of Bazel for Python in a monorepo context was explicitly regretted and reversed. The team strongly advises against Bazel for Python workloads based on their painful experience. The migration to Poetry demonstrates willingness to abandon mistakes rather than persisting with suboptimal tooling. The infrastructure lead noted that as an infrastructure team, not having to maintain "old mistakes or systems that we thought was a good idea and turned out not to be" is a positive sign of platform health.

**Controversial Consolidation Goals:**

The ambition to replace both Trino and Flink with Ray is acknowledged as controversial. Trino serves as the primary data warehouse query engine, and Flink handles stream processing—both are mature, proven systems. The motivation is reducing operational burden and the belief that Ray's unified compute model could subsume these workloads. The team acknowledges Ray cannot currently replace these systems but sees potential future convergence. This long-term vision requires careful migration planning and validation that Ray can match production requirements across diverse workload types.

**Velocity as the North Star:**

The platform exists to accelerate business value creation. Every architectural decision is evaluated against "time to done" as the primary metric. The infrastructure team views their role as raising velocity and removing friction rather than enforcing theoretical purity about deployment correctness. This pragmatic philosophy led to choices like the YAML-to-Python transpiler, the gateway pattern hiding cluster management, and the focus on developer experience making work "fun" to encourage adoption.

**ML as Engineering Competency:**

The vision that machine learning will become a standard engineering competency rather than a specialized discipline represents a particular philosophical stance. The infrastructure lead believes MLOps and DataOps will fade as distinct domains, with ML capabilities becoming expected skills for general engineers similar to QA or production operations. This belief shapes platform design decisions to make ML accessible to varying skill levels rather than optimizing solely for expert practitioners.

**Integration Over Invention:**

Where possible, the team leveraged existing open-source projects (Ray, Metaflow, Daft) rather than building from scratch. However, they were willing to build custom integrations (Ray and Poetry Metaflow plugins, Ray control plane) when necessary to bridge gaps. Notably, they mentioned that Auto Desk also independently built Metaflow-Ray integration, suggesting convergent evolution in the ecosystem. The team has not yet open-sourced their plugins but the existence of parallel efforts indicates potential for community contribution.

**Failure as Data:**

The explicit acknowledgment of failed attempts with Kubeflow, Polyaxon, and Hopsworks demonstrates a culture of treating implementation attempts as experiments yielding valuable data. The infrastructure lead took personal ownership of mistakes, creating psychological safety for innovation. This approach enables faster iteration through reduced fear of failure and honest assessment of what works versus what seemed like it should work in theory.
