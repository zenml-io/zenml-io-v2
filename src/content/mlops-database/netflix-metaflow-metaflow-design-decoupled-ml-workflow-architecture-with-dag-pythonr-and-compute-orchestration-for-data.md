---
title: "Metaflow design: decoupled ML workflow architecture with DAG Python/R and compute orchestration for data scientist productivity"
slug: "netflix-metaflow-metaflow-design-decoupled-ml-workflow-architecture-with-dag-pythonr-and-compute-orchestration-for-data"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "metadata-store"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "airflow"
  - "dask"
  - "docker"
  - "kubernetes"
  - "metaflow"
  - "sagemaker"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "training"
industryTags: "media-entertainment"
company: "Netflix"
companySlug: "netflix"
platformName: "Metaflow"
contentType: "transcript"
summary: "Netflix built Metaflow, an open-source ML framework designed to increase data scientist productivity by decoupling the workflow architecture, job scheduling, and compute layers that are traditionally tightly coupled in ML systems. The framework addresses the challenge that data scientists care deeply about their modeling tools and code but not about infrastructure details like Kubernetes APIs, Docker containers, or data warehouse specifics. Metaflow allows data scientists to write idiomatic Python or R code organized as directed acyclic graphs (DAGs), with simple decorators to specify compute requirements, while the framework handles packaging, orchestration, state management, and integration with production schedulers like AWS Step Functions and Netflix's internal Meson scheduler. The approach has enabled Netflix to support diverse ML use cases ranging from recommendation systems to content production optimization and fraud detection, all while maintaining backward compatibility and abstracting away infrastructure complexity from end users."
link: "https://www.infoq.com/presentations/designing-ml-systems-netflix/"
year: 2021
seo:
  title: "Netflix: Metaflow design: decoupled ML workflow architecture with DAG Python/R and compute orchestration for data scientist productivity - ZenML MLOps Database"
  description: "Netflix built Metaflow, an open-source ML framework designed to increase data scientist productivity by decoupling the workflow architecture, job scheduling, and compute layers that are traditionally tightly coupled in ML systems. The framework addresses the challenge that data scientists care deeply about their modeling tools and code but not about infrastructure details like Kubernetes APIs, Docker containers, or data warehouse specifics. Metaflow allows data scientists to write idiomatic Python or R code organized as directed acyclic graphs (DAGs), with simple decorators to specify compute requirements, while the framework handles packaging, orchestration, state management, and integration with production schedulers like AWS Step Functions and Netflix's internal Meson scheduler. The approach has enabled Netflix to support diverse ML use cases ranging from recommendation systems to content production optimization and fraud detection, all while maintaining backward compatibility and abstracting away infrastructure complexity from end users."
  canonical: "https://www.zenml.io/mlops-database/netflix-metaflow-metaflow-design-decoupled-ml-workflow-architecture-with-dag-pythonr-and-compute-orchestration-for-data"
  ogTitle: "Netflix: Metaflow design: decoupled ML workflow architecture with DAG Python/R and compute orchestration for data scientist productivity - ZenML MLOps Database"
  ogDescription: "Netflix built Metaflow, an open-source ML framework designed to increase data scientist productivity by decoupling the workflow architecture, job scheduling, and compute layers that are traditionally tightly coupled in ML systems. The framework addresses the challenge that data scientists care deeply about their modeling tools and code but not about infrastructure details like Kubernetes APIs, Docker containers, or data warehouse specifics. Metaflow allows data scientists to write idiomatic Python or R code organized as directed acyclic graphs (DAGs), with simple decorators to specify compute requirements, while the framework handles packaging, orchestration, state management, and integration with production schedulers like AWS Step Functions and Netflix's internal Meson scheduler. The approach has enabled Netflix to support diverse ML use cases ranging from recommendation systems to content production optimization and fraud detection, all while maintaining backward compatibility and abstracting away infrastructure complexity from end users."
mlops:
  source: "sqlite"
  entryId: 26
  sourceUrl: "https://www.infoq.com/presentations/designing-ml-systems-netflix/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060592"
  lastUpdated: "2026-04-14T19:54:39.536067"
---

## Problem Context

Netflix's ML infrastructure team faced a fundamental challenge in supporting an extraordinarily diverse set of machine learning use cases across the organization. While Netflix is known publicly for its recommendation systems that personalize every element of the user interface, the company's ML investments span far beyond recommendations into content valuation, payment fraud detection, service abuse prevention, content production efficiency (including automated QA of raw footage and shoot scheduling optimization), advertising to non-members, and streaming quality optimization to prevent rebuffers.

The core tension the team identified was between what data scientists care about versus what requires significant engineering effort. Data scientists have strong opinions about their modeling tools at the top of the stack—whether to use TensorFlow or PyTorch, their preferred IDE, and their feature engineering approaches. However, they have little interest in the lower-level infrastructure concerns: they don't care whether their GPU comes from a Kubernetes cluster or a server rack, as long as they have quick and easy access to it. Similarly, they don't care if data is stored in Parquet or ORC format, as long as they can reliably and efficiently query it.

The problem is that while off-the-shelf tooling exists for the high-level layers of the ML stack, significant effort is still required to set up and maintain the foundational layers. Setting up data warehouses with proper access patterns, maintaining Kubernetes clusters, orchestrating compute across heterogeneous resources—these are details that data scientists ideally shouldn't need to engage with, but which traditionally required their attention due to tight coupling in existing ML systems.

Many existing ML systems require tight coupling between the architecture layer (what code executes), the job scheduler layer (how code executes), and the compute layer (where code executes). This coupling was often necessitated by infrastructure limitations that predated cloud computing. Users might have to specify their code using custom domain-specific languages (DSLs) that limit their flexibility, and these DSLs might be tightly bound to specific schedulers that are in turn coupled with particular compute environments. While this tight coupling may be justified for domain-specific use cases like high-performance computing, Netflix needed infrastructure that could support hundreds of different use cases ranging from natural language processing to classical statistics without imposing artificial constraints.

## Architecture & Design

Netflix's solution was Metaflow, a framework built on the principle of unbundling the traditionally coupled layers of ML infrastructure. The architecture separates three distinct concerns:

**Architecture Layer**: This is where users define what code needs to execute. Data scientists can structure their workflows as directed acyclic graphs (DAGs) of steps, with each step being arbitrary Python or R code. The DAG concept serves primarily as a conceptual organizing tool, helping data scientists visualize and structure their work without dictating implementation details.

**Job Scheduler Layer**: This layer dictates how the code will be executed. The scheduler's sole responsibility is to execute steps in topological order, ensuring that a step finishes successfully before its successors are executed. Critically, the scheduler doesn't need to understand what code is being executed—it just needs to understand the graph structure.

**Compute Layer**: This layer handles where code executes, whether on a local laptop, cloud instances with specific resource configurations, or specialized secure environments.

The programming model in Metaflow is deliberately simple and idiomatic. Data scientists annotate Python or R functions with a `@step` decorator to define nodes in their workflow graph. Edges are specified using `self.next()` method calls to indicate transitions between steps. Within these steps, users can write arbitrary Python code using any library from the Python ecosystem without constraints imposed by the framework.

A key architectural feature is automatic state management. When a step produces data (stored in instance variables), Metaflow automatically handles the transfer of that state to downstream steps. This includes handling parallel execution scenarios where a single step fans out to multiple parallel branches—each branch receives a copy of the state, and join steps receive all concurrent versions of variables produced by parallel branches. This eliminates the need for users to explicitly manage data serialization, transfer, and deserialization.

The framework provides a decorator-based system for specifying compute requirements. A `@resources` decorator allows users to declare that a particular step needs specific hardware (like four GPUs or 200GB of RAM). Metaflow handles the packaging of code, data movement, interaction with the underlying compute layer (like Kubernetes APIs), and streaming of logs back to the user's console. Netflix also built custom decorators for internal systems—for example, an `@archer` decorator that executes steps in Netflix's secure media processing environment called Archer, which provides access to raw TV show and movie footage.

## Technical Implementation

Metaflow is implemented as an open-source Python framework (with an R package as well, given Netflix's significant R user base). The implementation spans several key technical components:

**Data Warehouse Integration**: The framework integrates with data warehouses built on Amazon S3 (which Netflix uses), Google Cloud Storage, Azure Blob Store, and distributed file systems like HDFS. Users can query these systems without worrying about the underlying storage format or access patterns.

**Compute Orchestration**: Metaflow supports multiple compute backends. For local development, it includes a built-in scheduler that can execute workflows on a laptop or cloud instance. This local scheduler is fully functional and can handle workflows with tens of thousands of tasks, but deliberately lacks production features like alerting and monitoring—it's designed for development and testing.

**Production Scheduler Integration**: Rather than building yet another production-grade DAG scheduler, Netflix took a compiler approach. Metaflow can compile user-defined workflows into representations that existing production schedulers understand. The open-source version includes integration with AWS Step Functions, a managed, highly available service that scales to thousands of tasks per workflow and thousands of concurrent workflows with zero operational burden. Users deploy to Step Functions with a single command: `python flow.py step-functions create`. Metaflow handles all the compilation and API integration behind the scenes.

Netflix internally uses an integration with Meson, Netflix's proprietary production scheduler, where most production ML pipelines execute. The Meson integration isn't open source, but it works on the same principle—Metaflow abstracts the scheduler API from users.

**Code Packaging and Containerization**: When steps are marked to execute on remote compute, Metaflow automatically packages the user's code without requiring users to write Dockerfiles or understand container orchestration. The framework handles dependency management and environment replication.

**State Management**: Metaflow implements a datastore that tracks all workflow executions, assigning each a unique ID. This enables users to inspect the state of any execution at any point in time. The system handles serialization and deserialization of Python objects across step boundaries, including managing parallel branches where state needs to be duplicated or merged.

**Backward Compatibility Layer**: A critical architectural decision was providing strong backward compatibility guarantees for the user-facing API. When underlying infrastructure evolves—for example, when Kubernetes APIs change or when Netflix migrated their Meson scheduler from one SDK version to another—users don't need to modify their Metaflow code. The framework evolves its internal integrations while maintaining a stable interface, eliminating migration pain for users.

## Scale & Performance

While the presentation doesn't provide extensive quantitative metrics, several scale indicators emerge:

The local scheduler that ships with Metaflow can handle workflows with tens of thousands of tasks, making it suitable for substantial development workloads before requiring production schedulers.

AWS Step Functions, the default production scheduler in the open-source version, scales to thousands of tasks within a single workflow and can handle thousands of concurrently running workflows. This provides substantial headroom for enterprise-scale ML operations.

Netflix uses Metaflow to support hundreds of different ML use cases across the organization, from recommendation systems (which personalize every UI element for every user) to content production workflows processing raw video footage. The diversity of use cases suggests the framework processes workloads ranging from small-scale statistical analyses to massive-scale parallel data processing.

The framework supports arbitrary resource specifications through the `@resources` decorator—users can request instances with specific GPU counts or hundreds of gigabytes of RAM. The presentation gives an example of a user requesting 200GB of RAM, with Metaflow transparently provisioning appropriate compute and making it feel to the user as if their laptop was "swapped out" for a more powerful machine.

## Trade-offs & Lessons

**Human-Centric Design Philosophy**: The primary lesson Netflix emphasizes is that problems are solved by humans, not tools. Tooling should be built with human centricity, keeping end users at the center of design decisions. Users should focus on the details of their ML work rather than the details of compute and scheduling infrastructure beneath them.

**Value of Decoupling**: For Netflix's use cases spanning diverse ML applications, decoupling the architecture, job scheduler, and compute layers proved to be the right approach. This stands in contrast to tightly coupled systems that may be optimized for specific domains. The trade-off is that domain-specific optimizations may be harder to achieve, but the flexibility gained enables supporting hundreds of heterogeneous use cases with a single framework.

**Compiler Pattern for Scheduler Integration**: Rather than building a new production scheduler or forcing users to learn existing scheduler APIs, the compiler pattern—translating Metaflow's workflow representation into scheduler-specific formats—proved highly effective. This approach provides several benefits: it leverages existing, battle-tested scheduling infrastructure; it allows switching schedulers without user code changes; and it enables the framework to evolve its integrations independently of user code.

**Language Choice and Ecosystem Access**: Supporting idiomatic Python and R without restrictions was critical for adoption. Data scientists can use any library from these rich ecosystems without framework-imposed limitations. This contrasts with systems that require custom DSLs or restrict library usage, which would have been non-starters for Netflix's user base.

**Managed Services Over Self-Hosted**: The choice to integrate with AWS Step Functions (a managed service) rather than self-hosted solutions like Airflow reduces operational burden. Step Functions integrates naturally with other AWS services (CloudWatch for logs, built-in alerting), providing production features without additional engineering effort. The trade-off is potential vendor lock-in, though Metaflow's architecture makes scheduler swapping feasible.

**State Management Abstraction**: Automatically handling state transfer between steps, including the complexity of parallel branches and joins, removes significant cognitive load from users. The alternative—requiring users to explicitly serialize, transfer, and deserialize data—would force them to think about plumbing rather than logic. The trade-off is that Metaflow needs to handle serialization of arbitrary Python objects, which can be complex.

**Backward Compatibility as a Contract**: Providing strong backward compatibility guarantees proved essential for enterprise adoption. When Netflix's internal Meson scheduler migrated SDK versions, Metaflow users experienced zero disruption because the framework absorbed the migration complexity. This demonstrates that treating the user-facing API as a stable contract, even as underlying infrastructure churns, is critical for production ML systems.

**Testing in Production-Like Environments**: The built-in local scheduler that can execute remote compute steps (like those marked with `@resources`) provides a smooth development experience. Users can test workflows that require GPUs or large memory without explicitly deploying to production infrastructure, reducing the development iteration cycle.

**Open Source Strategy**: Netflix open-sourced Metaflow and provides cloud sandboxes where users can try AWS integrations without setting up infrastructure. This lowers adoption barriers and builds community. The presentation mentions that all discussed work is available on GitHub, demonstrating Netflix's commitment to sharing their ML infrastructure innovations with the broader community.

**Progressive Disclosure of Complexity**: Users start with simple Python functions organized in a DAG. As needs evolve, they progressively add decorators for compute requirements, specialized environments, or other capabilities. The framework never forces users to engage with complexity they don't need, but capabilities are available when required. This progressive disclosure pattern makes the learning curve manageable while supporting sophisticated use cases.
