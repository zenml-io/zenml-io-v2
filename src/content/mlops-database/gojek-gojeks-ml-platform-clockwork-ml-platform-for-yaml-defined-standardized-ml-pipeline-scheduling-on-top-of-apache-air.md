---
title: "Clockwork ML platform for YAML-defined, standardized ML pipeline scheduling on top of Apache Airflow"
slug: "gojek-gojeks-ml-platform-clockwork-ml-platform-for-yaml-defined-standardized-ml-pipeline-scheduling-on-top-of-apache-air"
draft: false
mlopsTags:
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "data-ingestion"
  - "feature-engineering"
  - "retraining"
  - "training"
industryTags: "automotive"
company: "Gojek"
companySlug: "gojek"
platformName: "Gojek's ML platform"
contentType: "blog"
summary: "Gojek built Clockwork, an internal ML platform component that wraps Apache Airflow to simplify pipeline scheduling and automation for data scientists. The system addresses the pain points of repetitive ML workflows—data ingestion, feature engineering, model retraining, and metrics computation—while reducing the complexity and learning curve associated with directly using Airflow, Kubernetes, and Docker. Clockwork provides YAML-based pipeline definitions, a web UI for authoring, standardized data sharing between tasks, simplified runtime configuration, and the ability to keep pipeline definitions alongside business logic code rather than in centralized repositories. The platform became one of Gojek's most successful ML Platform products, with many users migrating from direct Airflow usage and previously intimidated users now adopting it for scheduling and automation."
link: "https://www.gojek.io/blog/reliable-ml-pipelines-with-clockwork"
year: 2020
seo:
  title: "Gojek: Clockwork ML platform for YAML-defined, standardized ML pipeline scheduling on top of Apache Airflow - ZenML MLOps Database"
  description: "Gojek built Clockwork, an internal ML platform component that wraps Apache Airflow to simplify pipeline scheduling and automation for data scientists. The system addresses the pain points of repetitive ML workflows—data ingestion, feature engineering, model retraining, and metrics computation—while reducing the complexity and learning curve associated with directly using Airflow, Kubernetes, and Docker. Clockwork provides YAML-based pipeline definitions, a web UI for authoring, standardized data sharing between tasks, simplified runtime configuration, and the ability to keep pipeline definitions alongside business logic code rather than in centralized repositories. The platform became one of Gojek's most successful ML Platform products, with many users migrating from direct Airflow usage and previously intimidated users now adopting it for scheduling and automation."
  canonical: "https://www.zenml.io/mlops-database/gojek-gojeks-ml-platform-clockwork-ml-platform-for-yaml-defined-standardized-ml-pipeline-scheduling-on-top-of-apache-air"
  ogTitle: "Gojek: Clockwork ML platform for YAML-defined, standardized ML pipeline scheduling on top of Apache Airflow - ZenML MLOps Database"
  ogDescription: "Gojek built Clockwork, an internal ML platform component that wraps Apache Airflow to simplify pipeline scheduling and automation for data scientists. The system addresses the pain points of repetitive ML workflows—data ingestion, feature engineering, model retraining, and metrics computation—while reducing the complexity and learning curve associated with directly using Airflow, Kubernetes, and Docker. Clockwork provides YAML-based pipeline definitions, a web UI for authoring, standardized data sharing between tasks, simplified runtime configuration, and the ability to keep pipeline definitions alongside business logic code rather than in centralized repositories. The platform became one of Gojek's most successful ML Platform products, with many users migrating from direct Airflow usage and previously intimidated users now adopting it for scheduling and automation."
mlops:
  source: "sqlite"
  entryId: 66
  sourceUrl: "https://www.gojek.io/blog/reliable-ml-pipelines-with-clockwork"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061025"
  lastUpdated: "2026-04-14T19:54:53.578869"
---

## Problem Context

Gojek's data science teams faced significant operational challenges around the repetitive nature of ML workflows. Data scientists needed to regularly ingest new data, transform it into useful features, retrain models, and compute metrics for reporting. These workflows typically involved multiple dependent steps executed on a regular schedule, making them tedious and error-prone when managed manually or through basic cron jobs.

While Apache Airflow provided a foundation for building and scheduling processing pipelines, direct usage presented several pain points for data science teams. The steep learning curve was particularly problematic—data scientists had to learn the intricacies of Airflow operators, Kubernetes configurations, and Docker containerization just to schedule their workflows. Airflow's task-centric model didn't provide clear patterns for data sharing between pipeline steps, leading each user to reinvent their own approaches. Testing was another major challenge, as it wasn't straightforward to validate Airflow DAGs locally without submitting them to the Airflow scheduler, which pushed teams toward the dangerous practice of testing in production.

Organizational friction compounded these technical challenges. Initially, Gojek maintained Airflow DAGs in a single centralized repository, which created coordination overhead. Code changes required synchronization across multiple repositories—one for the actual business logic and another for the DAG definitions and parameters. This led to frequent merge conflicts and slowed down development velocity. The coupling between pipeline definitions and scheduling made it difficult for teams to iterate independently on their ML workflows.

## Architecture & Design

Clockwork is architected as a layered abstraction on top of Apache Airflow, consisting of four primary components that work together to provide a simplified pipeline authoring and execution experience.

The **Clockwork UI** serves as the front-end interface, providing a web-based editor built on top of Git for authoring Clockwork YAML configurations. This removes the need for data scientists to manually edit configuration files or understand Git workflows deeply.

The **Clockwork CLI** acts as the translation layer, converting YAML pipeline definitions into native Airflow DAGs. This abstraction is critical—it allows the platform team to change underlying implementations without affecting user-facing interfaces.

The **Clockwork scheduler** operates as a CI pipeline triggered by Git changes. When configuration files are pushed to the Clockwork repository, the scheduler invokes the CLI to process both scheduler specs and referenced pipeline specs, generating the corresponding Airflow DAGs.

The **Clockwork Airflow operator and Docker images** provide the runtime execution environment. Rather than using Airflow's diverse operator ecosystem, Clockwork standardizes on a custom operator that works with pre-defined Docker images. These images have the capability to retrieve user code from Git repositories, ensuring that the latest business logic is executed.

Clockwork introduces a two-file configuration model that separates concerns between scheduling and pipeline logic. The **scheduler spec** resides in a central Clockwork repository and contains scheduling metadata—start dates, cron expressions for repeat intervals, retry policies, and alerting configurations. This spec references a **pipeline spec** via URI, which can live in the same repository as the business logic code. This separation allows data science teams to maintain their pipeline definitions alongside their code while centralizing scheduling governance.

Pipeline specs define the computational graph through a task dependency model. Each task can specify its own Docker image, resource requirements (CPU, memory, disk), working directory (typically a Git repository reference), environment variables, and the command to execute. Tasks declare dependencies through a "dependsOn" field, which Clockwork uses to construct the Airflow DAG automatically.

The platform standardizes on Docker as the execution abstraction rather than exposing Airflow's operator diversity. Every task runs in a container with specified resources on Kubernetes. This standardization enables local testing—data scientists can use the Clockwork CLI to run their pipelines locally using Docker before deploying to production.

## Technical Implementation

Clockwork builds on a technology stack centered around Apache Airflow, Kubernetes, Docker, and Git. The choice of Airflow provides access to its rich monitoring dashboard, job execution history, pipeline retry capabilities, and remote worker execution model. However, rather than exposing Airflow's full complexity, Clockwork constrains the interface to a YAML-based configuration model.

The scheduler spec demonstrates the configuration approach, using YAML to specify pipeline references, scheduling parameters, and alerting. A typical scheduler spec includes an apiVersion field (v2 in the examples), a list of scheduledPipelines with references to pipeline spec URIs (using HTTPS URLs to internal Git repositories), start dates, cron schedule expressions, retry counts, and alert configurations. Alerting integrates with Slack, supporting notifications for failure, retry, and success states with configurable recipient lists that can include both individual email addresses and Slack channels.

Pipeline specs provide granular control over execution environments. The top-level configuration includes a pipeline name, default Docker image, default resource allocations (CPU cores, memory in GB, disk in GB), default working directory (typically a Git repository with source URL and branch reference), and default environment variables. These defaults can be overridden at the task level, providing flexibility while maintaining sensible conventions.

The task definition model supports both simple and complex use cases. For straightforward single-step pipelines—a common pattern for replacing cron jobs—users can reference a Python file or Jupyter notebook directly from Git. Advanced users can specify custom Docker images they've built themselves. For multi-step pipelines, tasks are defined as a list with unique names, optional image overrides, commands to execute, dependency declarations, resource specifications, and task-specific variables and working directories.

Environment variable handling demonstrates Clockwork's pragmatic approach to configuration management. Variables can be specified with explicit values directly in the YAML, or defined with empty values to indicate they should be retrieved from Airflow's variable store at runtime. This allows sensitive credentials and environment-specific configuration to be managed centrally while keeping pipeline definitions portable.

The CI-based scheduler implementation ensures that all pipeline changes go through version control. When a scheduler spec is pushed to the Clockwork repository, the CI system triggers Clockwork to process both the scheduler spec and any referenced pipeline specs, generating Airflow DAGs and deploying them to the Airflow environment. This GitOps-style approach provides audit trails and enables rollback capabilities.

Resource allocation happens at the task level with explicit CPU, memory, and disk specifications. The examples show resource requests ranging from lightweight tasks with 2 CPU cores and 4GB memory to resource-intensive workloads requiring 8 CPU cores and 120GB memory. This granularity allows efficient resource utilization—different steps in a pipeline can request appropriate resources rather than being constrained by a single pod specification.

Working directory management through Git references solves the code deployment challenge elegantly. Instead of baking code into Docker images or using separate artifact storage, Clockwork's Docker images clone the specified Git repository at the specified branch or commit reference when the container starts. This ensures tasks always execute against the intended code version while simplifying the deployment process.

## Scale & Performance

While the article doesn't provide specific quantitative metrics about throughput, data volumes, or number of pipelines, it does indicate significant adoption and impact. Clockwork is described as "one of our most successful ML Platform products," with many users migrating from direct Airflow usage and previously intimidated users starting to use the platform for scheduling and automation.

The platform's design choices suggest it handles substantial scale at Gojek. The use of Kubernetes for task execution provides horizontal scalability—resource-intensive jobs can be distributed across the cluster. Airflow's remote worker execution model enables parallel processing of independent pipeline tasks. The separation of scheduler and execution layers allows these components to scale independently.

The resource specifications in the examples—tasks requesting up to 8 CPU cores, 120GB of memory, and 80GB of disk—indicate that Clockwork handles computationally intensive ML workloads including training jobs, large-scale data transformations, and feature engineering pipelines.

The scheduler spec's support for cron expressions like "*/5 * * * *" (every 5 minutes) suggests the platform handles frequently executing pipelines. The retry mechanism and comprehensive alerting indicate a production-grade system designed for reliability at scale.

## Trade-offs & Lessons

Clockwork's design reflects several thoughtful trade-offs between flexibility and simplicity. By standardizing on Docker instead of Airflow's diverse operator ecosystem, the platform sacrifices some of Airflow's flexibility in exchange for dramatically improved testability and reduced learning curve. This trade-off proved successful—the standardization enabled local testing via the Clockwork CLI, addressing one of the major pain points that previously forced teams to test in production.

The two-file configuration model (scheduler spec and pipeline spec) balances centralized governance with team autonomy. Scheduling parameters live in a central repository where platform teams can enforce policies and maintain visibility, while pipeline definitions reside alongside business logic where data science teams can iterate quickly. This solved the merge conflict problem and reduced cross-repository synchronization overhead, though it does introduce some indirection—users need to understand the relationship between these two configuration files.

The abstraction strategy demonstrates forward-thinking architecture. By hiding Airflow behind the Clockwork interface, Gojek positioned themselves to swap backend implementations without disrupting users. The article explicitly mentions considering Kubeflow Pipelines as a replacement for Airflow to better isolate and scale resources in Kubernetes, making execution safer and cheaper. The fact that users won't need to change their workflows during this migration validates the abstraction layer's design.

The platform's approach to single-step pipelines shows understanding of user needs. Rather than forcing every workflow into a complex multi-step DAG model, Clockwork recognizes that many users simply want an improved cron replacement with retry logic, alerting, and containerization. Supporting both simple and complex use cases broadened adoption.

The choice to provide both YAML configuration and a Web UI demonstrates pragmatic user experience design. Power users can work directly with YAML in their preferred editors and version control workflows, while less technical users can leverage the Web UI to generate configurations without learning YAML syntax.

Resource specification at the task level rather than pipeline level reflects real-world ML workflow characteristics. Different pipeline stages have vastly different resource requirements—data extraction might be lightweight while model training is compute-intensive. Task-level granularity enables efficient resource utilization and cost optimization.

The Git-based working directory approach elegantly solves code deployment but introduces dependency on Git availability and network performance. Every task execution requires cloning the specified repository, which could become a bottleneck for pipelines with many short-duration tasks or in environments with poor Git server performance.

The platform's success stemmed from deeply understanding data scientist workflows and removing friction systematically. By addressing the specific pain points of Airflow's learning curve, testing difficulty, and configuration management, Clockwork lowered the barrier to pipeline automation and scheduling. The migration of existing Airflow users and adoption by previously intimidated users indicates that the abstraction layer hit the right level—simplified enough to be approachable while powerful enough to handle real production workloads.

Looking forward, the consideration of Kubeflow Pipelines demonstrates both the value of the abstraction layer and the ongoing evolution of the ML infrastructure landscape. The ability to evaluate new backends without disrupting users is a key benefit of the layered architecture approach.
