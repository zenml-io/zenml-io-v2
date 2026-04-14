---
title: "Supporting Diverse ML Systems at Netflix"
slug: "netflix-metaflow-platform-for-diverse-ml-systems-supporting-diverse-ml-systems-at-netflix"
draft: false
mlopsTags:
  - "data-versioning"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "docker"
  - "iceberg"
  - "kubernetes"
  - "metaflow"
  - "ray"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Netflix"
companySlug: "netflix"
platformName: "Metaflow + “platform for diverse ML systems”"
contentType: "blog"
summary: "Netflix's Machine Learning Platform team has built a comprehensive MLOps ecosystem around Metaflow, an open-source ML infrastructure framework, to support hundreds of diverse ML projects across the organization. The platform addresses the challenge of moving ML projects from prototype to production by providing deep integrations with Netflix's production infrastructure including Titus (Kubernetes-based compute), Maestro (workflow orchestration), a Fast Data library for processing terabytes of data, and flexible deployment options through caching and hosting services. This integrated approach enables data scientists and ML engineers to build business-critical systems spanning content decision-making, media understanding, and knowledge graph construction while maintaining operational simplicity and allowing teams to build domain-specific libraries on top of a robust foundational layer."
link: "https://netflixtechblog.com/supporting-diverse-ml-systems-at-netflix-2d2e6b6d205d"
year: 2024
seo:
  title: "Netflix: Supporting Diverse ML Systems at Netflix - ZenML MLOps Database"
  description: "Netflix's Machine Learning Platform team has built a comprehensive MLOps ecosystem around Metaflow, an open-source ML infrastructure framework, to support hundreds of diverse ML projects across the organization. The platform addresses the challenge of moving ML projects from prototype to production by providing deep integrations with Netflix's production infrastructure including Titus (Kubernetes-based compute), Maestro (workflow orchestration), a Fast Data library for processing terabytes of data, and flexible deployment options through caching and hosting services. This integrated approach enables data scientists and ML engineers to build business-critical systems spanning content decision-making, media understanding, and knowledge graph construction while maintaining operational simplicity and allowing teams to build domain-specific libraries on top of a robust foundational layer."
  canonical: "https://www.zenml.io/mlops-database/netflix-metaflow-platform-for-diverse-ml-systems-supporting-diverse-ml-systems-at-netflix"
  ogTitle: "Netflix: Supporting Diverse ML Systems at Netflix - ZenML MLOps Database"
  ogDescription: "Netflix's Machine Learning Platform team has built a comprehensive MLOps ecosystem around Metaflow, an open-source ML infrastructure framework, to support hundreds of diverse ML projects across the organization. The platform addresses the challenge of moving ML projects from prototype to production by providing deep integrations with Netflix's production infrastructure including Titus (Kubernetes-based compute), Maestro (workflow orchestration), a Fast Data library for processing terabytes of data, and flexible deployment options through caching and hosting services. This integrated approach enables data scientists and ML engineers to build business-critical systems spanning content decision-making, media understanding, and knowledge graph construction while maintaining operational simplicity and allowing teams to build domain-specific libraries on top of a robust foundational layer."
mlops:
  source: "sqlite"
  entryId: 172
  sourceUrl: "https://netflixtechblog.com/supporting-diverse-ml-systems-at-netflix-2d2e6b6d205d"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.616662"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Netflix operates ML and AI systems across an extraordinarily diverse set of use cases, from infrastructure automation and content demand modeling to media understanding and personalization. The Machine Learning Platform team faces the fundamental challenge of supporting hundreds of Metaflow projects in production, each with unique requirements, without forcing all projects to follow a single rigid path from prototype to production. The core pain point is bridging the gap between human-friendly prototyping environments and production-grade systems that integrate with Netflix's engineering infrastructure.

Without proper integrations to production systems, ML projects risk being stuck at the prototyping stage or maintained as outliers outside centrally managed infrastructure, incurring unsustainable operational overhead. Data scientists need to work with massive data volumes (terabytes), deploy models at global scale with low latency, orchestrate complex dependencies between workflows, and integrate with both upstream and downstream systems. The platform must support vastly different deployment patterns, from batch processing to real-time APIs, while maintaining reproducibility and operational simplicity.

## Architecture & Design

Netflix's ML platform architecture is organized into distinct layers, each providing crucial integrations to production infrastructure:

### Data Layer: Fast Data Library

The Fast Data library provides high-performance access to Netflix's data warehouse, which is hosted on S3 and organized as Apache Iceberg tables. The library consists of two main interfaces working in concert:

The `Table` object handles interaction with the data warehouse, including parsing Iceberg and legacy Hive table metadata, resolving partitions, and discovering Parquet files for reading and writing. This abstraction shields ML engineers from the complexities of the underlying data lake organization.

The `MetaflowDataFrame` interface takes over once files are discovered, downloading data using Metaflow's high-throughput S3 client directly to process memory. This approach often outperforms reading from local files. The library uses Apache Arrow to decode Parquet and provide an in-memory representation of data accessible through multiple frameworks including Pandas, Polars, or Netflix's internal C++ libraries, all in a zero-copy fashion.

A critical design decision involves dependency management. Rather than depending on a specific PyArrow version (which would create unresolvable dependency graphs given Arrow's ubiquity), the Fast Data library relies only on the stable Arrow C data interface, similar to the nanoarrow approach. This produces a hermetically sealed library with no external dependencies, avoiding version conflicts.

### Compute Layer: Titus Integration

While open-source Metaflow supports AWS Batch or Kubernetes, Netflix uses Titus, their centralized container management platform. Titus is powered by Kubernetes under the hood but provides substantial enhancements focused on observability, security, scalability, and cost efficiency. The `@titus` decorator allows Metaflow tasks to benefit from these battle-hardened features automatically, without requiring deep technical knowledge from ML practitioners.

Supporting scalable compute requires packaging and rehydrating entire execution environments in remote pods reproducibly. Rather than forcing developers to manually manage Docker images, Metaflow provides integrated dependency management through `@conda` and `@pypi` decorators. The platform also supports Portable Execution Environments, allowing higher-order systems to compose and resolve dependencies at execution time rather than deploy time.

### Orchestration Layer: Maestro Integration

Maestro serves as the production workflow orchestrator providing scalability, high availability, and usability as the backbone for all Metaflow projects in production. A crucial but often overlooked feature is event-triggering, which allows teams to integrate their Metaflow flows with surrounding systems using a protocol shared across the organization.

Dependencies between Metaflow flows are triggered via `@trigger_on_finish`, while dependencies to external systems use `@trigger`. This event-driven architecture enables complex multi-team workflows where data pipelines, models, and external systems coordinate seamlessly. Metaflow namespaces enable rapid development without interfering with production deployments, while `@project` supports branched development and deployment with event isolation between branches.

### Deployment Layer: Multiple Paths to Production

Netflix provides two primary deployment patterns beyond batch processing:

**Cache-based deployment** supports use cases where predictions can be precomputed, guaranteeing the lowest possible latency and operationally simple high availability at global scale. While relying on Netflix's internal caching infrastructure, the pattern could be replicated using services like Amazon ElasticCache or DynamoDB. Metaflow jobs write large volumes of results to an online key-value store using `metaflow.Cache`, which applications then query through `metaflow.Hosting` APIs.

**Metaflow Hosting** provides an integrated model hosting service for deployments requiring APIs and real-time evaluation. It offers a simple decorator syntax to create RESTful endpoints on top of Netflix's microservice infrastructure. Key features include auto-scaling based on traffic, scale-to-zero capabilities for cost savings (particularly important for GPU-backed services), and integrated request logging, alerts, monitoring, and tracing. The service supports both synchronous and asynchronous queries, making it suitable for diverse use cases.

## Technical Implementation

The platform leverages a carefully selected technology stack:

**Data processing** combines Apache Spark for heavy ETL with Python-based last-mile processing. The Fast Data library integrates PyArrow for high-performance Parquet decoding, Pandas and Polars for dataframe operations, and custom C++ libraries for specialized operations. The Arrow C data interface ensures compatibility across library versions.

**Compute infrastructure** uses Titus (Kubernetes-based) with enhancements for production readiness. Dependency management relies on Conda and PyPI, with Portable Execution Environments enabling dynamic environment resolution. All compute tasks run in containerized environments with reproducible dependencies.

**Orchestration** through Maestro handles workflow scheduling and event-driven triggering. The system manages hundreds of production Metaflow flows with complex interdependencies, supporting both scheduled and event-triggered execution patterns.

**Deployment options** include direct data warehouse writes, cache-based serving through key-value stores, and real-time APIs through Metaflow Hosting. The hosting service integrates with Netflix's microservice infrastructure, providing production-grade reliability and observability.

**Extensions mechanism** allows all integrations to be implemented through Metaflow's extension system, publicly available but not yet part of the stable API. This enables Netflix to customize the platform while contributing improvements back to open-source Metaflow.

## Scale & Performance

The platform operates at substantial scale across multiple dimensions:

**Project scale**: Hundreds of Metaflow projects are deployed internally, supporting diverse use cases across the organization.

**Data volumes**: Individual use cases process terabytes of data. The Content Knowledge Graph example loads approximately one billion entity pairs for matching. Daily batch jobs handle massive volumes of aggregate computations.

**Global reach**: Systems support over 260 million subscribers spanning over 190 countries, requiring globally scalable deployment patterns.

**Model variety**: The content decision-making system alone encapsulates hundreds of advanced models with intricate business logic, processing massive amounts of data daily.

**Performance characteristics**: The Fast Data library's direct S3-to-memory approach often outperforms local file reading. Cache-based deployments guarantee the lowest possible latency for precomputable predictions. Metaflow Hosting provides auto-scaling based on traffic and can scale to zero when idle, optimizing cost for GPU-backed services.

**Team efficiency**: Despite managing systems of enormous complexity (illustrated by the content decision-making workflow with its numerous interconnected components), relatively small teams of engineers and data scientists operate these systems autonomously.

## Real-World Use Cases

The article details several production use cases demonstrating the platform's versatility:

**Content Knowledge Graph** processes approximately one billion title pairs through entity resolution. The workflow uses `metaflow.Table` to resolve input shards distributed across Metaflow tasks processing terabytes collectively. Each task loads data using `MetaflowDataFrame`, performs matching with Pandas, and populates output table shards before final commit.

**Model Explainability** represents a sophisticated higher-order training system. The "Explainer flow" is event-triggered by upstream flows and must access original models and their training environments while adding explainer-specific dependencies. The system uses portable environments to build composite environments at execution time, resolving dependencies immediately before use rather than at deploy time.

**Content Decision Making** runs one of the most business-critical systems, supporting decisions about what content Netflix should offer. The system comprises hundreds of advanced models and intricate business logic organized as interconnected ETL pipelines and Metaflow flows, all event-triggered through Maestro. The architecture uses `@trigger_on_finish` for dependencies between Metaflow flows and `@trigger` for external system dependencies. Metaflow namespaces and `@project` enable development isolation and branched deployment.

**Content Performance Visualization** demonstrates cache-based deployment. A daily scheduled Metaflow job computes aggregate quantities in parallel and writes results to a key-value store using `metaflow.Cache`. A Streamlit application provides interactive visualizations, sending messages to a Metaflow hosting service which performs lookups and computation, returning JSON responses in real-time.

**Media Feature Store (Amber)** illustrates asynchronous API patterns. Since precomputing all media features would be infeasible, Amber computes and caches features on-demand. When features are requested, Amber computes the dependency graph and sends asynchronous requests to Metaflow Hosting, which queues requests and triggers computations when resources become available. Responses are cached for later retrieval.

## Trade-offs & Lessons

Several key insights emerge from Netflix's approach:

**Extension over forking**: Rather than forking Metaflow for internal use, Netflix implements customizations through the extension mechanism. This allows them to contribute improvements to open-source while maintaining internal integrations. However, the extension API is not yet stable, representing a trade-off between flexibility and long-term API stability.

**Diversity over standardization**: The platform explicitly rejects forcing all projects down a single path from prototype to production. Instead, it provides a robust foundational layer with multiple deployment options, allowing teams to build domain-specific libraries on top. This approach scales better across hundreds of diverse use cases than rigid standardization would.

**Integration depth matters more than surface API**: While human-friendly APIs are valuable, the integrations to production systems (data, compute, orchestration, deployment) provide Metaflow's true value. Without these integrations, projects remain stuck at prototyping or become operational outliers.

**Dependency management complexity**: The team invested heavily in solving dependency issues, particularly around PyArrow. Their decision to use the Arrow C data interface rather than depending on specific PyArrow versions demonstrates deep technical sophistication in avoiding dependency hell. The Portable Execution Environments feature enables composition of execution environments at runtime, supporting higher-order workflows.

**Auto-scaling and cost optimization**: Metaflow Hosting's scale-to-zero capability proves particularly valuable for GPU-backed services, balancing cost against availability. The auto-scaling based on traffic provides production-grade reliability without over-provisioning resources.

**Event-driven architecture**: Event-triggering through Maestro enables complex multi-team coordination without tight coupling. This architectural pattern allows the content decision-making system to coordinate numerous interdependent components across team boundaries.

**Performance through specialization**: The Fast Data library's specialized approach (S3 direct-to-memory, Arrow zero-copy access, hermetically sealed C++ extensions) outperforms more generic solutions. This demonstrates the value of investing in performance-critical paths rather than relying solely on general-purpose tools.

**Operational simplicity through abstraction**: The `@titus` decorator encapsulates complex Kubernetes enhancements (observability, security, scalability, cost efficiency) behind a simple interface. This allows data scientists to benefit from production-grade infrastructure without becoming infrastructure experts.

## Future Directions

The team identifies several areas for continued investment:

**Versioning improvements**: Plans to enhance the artifact and model management layer, providing more options for versioning beyond what's currently available.

**Integration expansion**: Building more integrations with systems developed by sister teams at Netflix, particularly around model logging facilities to better support the feedback loop critical for training new models.

**Cross-language support**: Enabling Metaflow artifacts and models to integrate into non-Metaflow environments, particularly JVM-based edge services. This would bridge the gap between Python-based rapid iteration and the requirements of infrastructure serving member-facing requests.

**Pluggable architecture**: Developing integrations in a pluggable manner that allows other users to integrate with their own systems, making the platform more adaptable to different organizational contexts.

The article emphasizes that Netflix's appetite for applying ML to diverse use cases continues growing, requiring the platform to keep expanding its footprint while maintaining the delightful integrations and operational simplicity that enable small teams to build and maintain business-critical systems autonomously.
