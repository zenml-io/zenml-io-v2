---
title: "Beyond Interactive: Notebook Innovation at Netflix"
slug: "netflix-metaflow-beyond-interactive-notebook-innovation-at-netflix"
draft: false
mlopsTags:
  - "data-versioning"
  - "experiment-tracking"
  - "metadata-store"
  - "notebooks"
  - "pipeline-orchestration"
  - "dbt"
  - "docker"
  - "kubernetes"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "data-validation"
  - "training"
industryTags: "media-entertainment"
company: "Netflix"
companySlug: "netflix"
platformName: "Metaflow"
contentType: "blog"
summary: "Netflix transformed Jupyter notebooks from a niche data science tool into the most popular data access platform across the company, supporting 150,000+ daily jobs against a 100PB data warehouse processing over 1 trillion events. By building infrastructure around nteract, Papermill, and Commuter on top of their Titus container platform, Netflix enabled parameterized notebook templates, scheduled notebook execution, and seamless workflow deployment. This unified interface bridges traditional role boundaries between data scientists, data engineers, and analytics engineers, providing programmatic access to the entire Netflix Data Platform while abstracting away the complexity of containerized execution on AWS."
link: "https://netflixtechblog.com/beyond-interactive-notebook-innovation-at-netflix-591ee3221233"
year: 2018
seo:
  title: "Netflix: Beyond Interactive: Notebook Innovation at Netflix - ZenML MLOps Database"
  description: "Netflix transformed Jupyter notebooks from a niche data science tool into the most popular data access platform across the company, supporting 150,000+ daily jobs against a 100PB data warehouse processing over 1 trillion events. By building infrastructure around nteract, Papermill, and Commuter on top of their Titus container platform, Netflix enabled parameterized notebook templates, scheduled notebook execution, and seamless workflow deployment. This unified interface bridges traditional role boundaries between data scientists, data engineers, and analytics engineers, providing programmatic access to the entire Netflix Data Platform while abstracting away the complexity of containerized execution on AWS."
  canonical: "https://www.zenml.io/mlops-database/netflix-metaflow-beyond-interactive-notebook-innovation-at-netflix"
  ogTitle: "Netflix: Beyond Interactive: Notebook Innovation at Netflix - ZenML MLOps Database"
  ogDescription: "Netflix transformed Jupyter notebooks from a niche data science tool into the most popular data access platform across the company, supporting 150,000+ daily jobs against a 100PB data warehouse processing over 1 trillion events. By building infrastructure around nteract, Papermill, and Commuter on top of their Titus container platform, Netflix enabled parameterized notebook templates, scheduled notebook execution, and seamless workflow deployment. This unified interface bridges traditional role boundaries between data scientists, data engineers, and analytics engineers, providing programmatic access to the entire Netflix Data Platform while abstracting away the complexity of containerized execution on AWS."
mlops:
  source: "sqlite"
  entryId: 24
  sourceUrl: "https://netflixtechblog.com/beyond-interactive-notebook-innovation-at-netflix-591ee3221233"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060573"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Netflix operates one of the world's largest data platforms, processing over 1 trillion events daily through a streaming ingestion pipeline and maintaining a 100PB cloud-native data warehouse. This infrastructure supports more than 150,000 jobs per day spanning reporting, analysis, machine learning, and recommendation algorithms for 130 million members globally. The scale and diversity of data workloads created significant challenges for the platform team.

The fundamental problem was user diversity and tooling fragmentation. Netflix's data organization includes data scientists, data engineers, and analytics engineers, each traditionally relying on different tools and languages. Data engineers might work in Scala with IntelliJ, analytics engineers in SQL with Tableau, and data scientists in R with RStudio. This fragmentation meant the platform team had to support numerous tools while users struggled with workflow transitions. A data scientist might prototype in a notebook but then need to copy/paste code into separate files for production deployment, losing context and creating maintenance overhead.

Beneath this surface-level tool diversity, Netflix identified a common pattern across all roles and workflows: data exploration, data preparation, data validation, and productionalization. Each of these tasks shares a fundamental interaction model—run code, explore data, present results. The team realized they needed a unified abstraction layer that could span languages, tools, and use cases while minimizing the number of distinct systems to maintain. The goal was to make common tasks effortless for users while helping the platform scale efficiently.

## Architecture & Design

Netflix's notebook infrastructure consists of three fundamental architectural layers: storage, compute, and interface, all orchestrated through their Titus container management platform.

### Storage Architecture

The storage layer leverages Amazon S3 and EFS as virtual filesystems. Each user receives a home directory on EFS containing a personal workspace where all interactive notebook work occurs. The combination of workspace path and filename forms the notebook's namespace, such as `/efs/users/kylek/notebooks/MySparkJob.ipynb`. This convention prevents collisions and enables clear ownership identification.

The system distinguishes between development and production storage models. When users schedule a notebook for production execution, the scheduler copies the notebook from EFS to a common S3 directory. This S3 copy becomes the "source notebook" or source of truth. Each scheduled execution instantiates a new notebook from this source, which becomes an immutable "output notebook" containing code, execution results, logs, and metadata from that specific run. This design creates an audit trail where every execution is preserved as a complete historical record for troubleshooting and analysis.

To support collaboration without conflicts, Netflix developed Commuter, a lightweight service for viewing and sharing notebooks in read-only mode. Commuter surfaces Jupyter-compatible APIs for `/files` and `/api/contents`, enabling users to browse directories and view notebook contents without risking accidental overwrites or interfering with running jobs.

### Compute Architecture

All notebook execution runs on Docker containers managed by Titus, Netflix's container management platform built on AWS. When a user launches a notebook server, Titus provisions a container with configurable resources. The system provides sensible defaults that satisfy approximately 87.3% of execution patterns, with a simple interface for requesting additional compute or memory when needed.

Netflix maintains a unified execution environment through prepared container images with common libraries and multiple pre-installed kernels. These kernels dynamically pull the latest versions of Spark and current cluster configurations, reducing setup friction. The container orchestration layer automatically injects user security groups, roles, and identity information into the environment, abstracting away infrastructure complexity.

The architecture treats notebooks as first-class execution units. When Spark or Presto jobs execute from the scheduler, the source code is injected into a newly-created notebook and executed. This approach means every scheduled job—whether originally authored as a notebook or submitted as standalone code—produces a notebook artifact containing all related execution context.

### Interface Layer

Netflix chose nteract, a React-based notebook frontend, as their primary interface over the classic Jupyter UI. This decision aligned with their technology stack and design philosophy emphasizing simplicity and composability. The nteract interface provides inline cell toolbars, drag-and-drop cells, and a built-in data explorer that works across languages.

The platform integrates native support for parameterization through Papermill, enabling users to define notebooks as reusable templates. Parameters can be specified in code and values provided at runtime, supporting template-based workflows without custom tooling. This parameterization bridges the gap between interactive development and scheduled production execution.

## Technical Implementation

Netflix's notebook infrastructure is built on several key open source projects, extended with internal tooling:

### Core Technologies

**nteract** serves as the next-generation React-based UI, offering improvements over classic Jupyter including better data visualization through Data Explorer, which provides language-agnostic data exploration capabilities. This addresses a major pain point for non-Python users who previously lacked native visualization options.

**Papermill** enables notebook parameterization, execution, and analysis. It allows spawning multiple notebooks with different parameter sets for concurrent execution and provides capabilities for collecting and summarizing metrics across notebook collections. This library became foundational for Netflix's template and scheduling use cases.

**Commuter** provides the read-only notebook viewing service, implementing Jupyter-compatible content APIs while supporting both local filesystem and S3 storage backends. Its vertical scalability makes it suitable for organization-wide notebook sharing.

**Titus** manages the underlying container infrastructure, providing scalable container execution with cloud-native AWS integration. The same platform that powers Netflix streaming and recommendation systems now executes notebook workloads.

### Integration Approach

Netflix developed a Python library that consolidates access to Data Platform APIs, giving notebook users programmatic access to virtually the entire platform from a single interface. This library, combined with the pre-configured container images, means users can access data warehouses, job execution services like Genie (federated job execution), and Metacat (federated metastore) without manual configuration.

The kernel architecture leverages Jupyter's messaging protocol, which provides language-agnostic communication between the UI and computational engines. Netflix supports multiple default kernels including Python, R, and Scala, with each kernel configured to access platform services and current Spark cluster configurations.

### Workflow Model

The system treats notebooks as logical workflows composed of linear cell execution sequences. This enables mapping failures to specific cells and preserving complete execution context. When users are ready to productionalize interactive work, they can schedule the notebook directly rather than rewriting code in different formats. The scheduler executes notebooks with specified parameters, creating immutable output notebooks that serve as complete execution records including source code, parameters, runtime configuration, execution logs, and error messages.

## Scale & Performance

Netflix's notebook infrastructure operates at impressive scale:

- Over 1 trillion events processed daily through the streaming ingestion pipeline
- 100PB cloud-native data warehouse serving as the backend data source
- More than 150,000 jobs executed daily against this data
- Notebooks have become the most popular tool for data access across the company
- Default container resource configurations satisfy approximately 87.3% of execution patterns
- System supports 130 million Netflix members globally through data-driven personalization and recommendations

The adoption metrics are particularly striking. Within quarters of elevating notebooks from a niche tool to a first-class platform citizen in Q3 2017, notebooks achieved dominant usage across data scientists, data engineers, and analytics engineers. The organic adoption across all user types demonstrates the effectiveness of the unified interface approach.

The infrastructure scales both vertically and horizontally. Commuter provides vertical scalability for read-only notebook viewing. Titus enables horizontal scaling of notebook execution across AWS infrastructure. The separation of interactive workspace (EFS) from production execution (S3) allows independent scaling of development and production workloads.

## Trade-offs & Lessons

### What Worked Well

**Abstraction at the right level** proved highly successful. By identifying the common pattern of "run code, explore data, present results" beneath diverse tooling, Netflix found an abstraction that genuinely unified workflows without forcing users to abandon their preferred languages or approaches.

**Leveraging open source strategically** allowed Netflix to build on proven foundations rather than creating everything from scratch. The Jupyter ecosystem provided the messaging protocol, file format, and basic execution model. The team focused their engineering effort on integration, scaling, and workflow orchestration rather than reinventing notebook fundamentals.

**Treating notebooks as first-class execution artifacts** unlocked unexpected value. By making every scheduled job produce a notebook output—even jobs not originally authored as notebooks—Netflix created a consistent troubleshooting interface where all execution context is colocated.

**The immutable output notebook pattern** elegantly solves auditability and debugging challenges. Every execution preserves its complete context, making it trivial to understand what ran, with what parameters, producing what results, in what environment.

### Challenges and Evolution

**Multi-user collaboration** emerged as a pain point when users began sharing notebook URLs. Concurrent access caused accidental overwrites, prompting the development of Commuter for safe read-only sharing. This pattern—discovering needs through organic usage—shaped the infrastructure's evolution.

**Interface simplification** remains an ongoing challenge. Supporting all user types through a single interface requires constant attention to UX. The team explicitly calls out their 12-month roadmap focusing on reliability, visibility, and collaboration, with plans for automatic version control, native in-app scheduling, better Spark DataFrame visualization, and improved Scala kernel stability.

**Defaulting resource allocation** achieved 87.3% success, which is impressive but still leaves roughly 13% of cases requiring manual intervention. This balance between sensible defaults and configurability represents a pragmatic trade-off rather than a perfect solution.

### Key Insights for Practitioners

**Start with user workflows, not tools.** Netflix succeeded by analyzing common tasks across roles rather than trying to pick the "best" tool for each role. The commonalities—data exploration, preparation, validation, productionalization—proved more important than the differences.

**Embrace composability.** The architectural decision to use modular components (nteract, Papermill, Commuter, Titus) rather than a monolithic solution provides flexibility. Organizations can adopt pieces selectively, and Netflix can swap components as needs evolve.

**Make the transition to production seamless.** The biggest workflow friction often occurs when moving from development to production. By making notebooks schedulable without rewriting, Netflix eliminated a major source of context loss and maintenance burden.

**Create immutable execution records.** The output notebook pattern where every execution produces a complete artifact pays dividends for troubleshooting, auditing, and reproducibility. This is particularly valuable at scale where understanding failures becomes critical.

**Invest in the last mile.** Netflix didn't just deploy open source tools—they built integration layers (Python API library), prepared environments (container images with kernels and libraries), and thoughtful abstractions (workspace namespacing) that hide complexity. These investments in the "last mile" of user experience drive adoption.

**Design for organic discovery.** The platform team built infrastructure with general capabilities (parameterization, scheduling) and let users discover novel applications (troubleshooting scripts, data quality audits, stakeholder exploration templates). This emergent usage pattern validated the flexibility of their architecture.

The Netflix notebook infrastructure demonstrates that careful abstraction, strategic use of open source, and attention to workflow transitions can transform niche tools into organization-wide platforms. Their success shows that the right infrastructure can unify diverse user populations without sacrificing the flexibility that makes them productive.
