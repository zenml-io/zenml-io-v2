---
title: "DARWIN: Data Science and Artificial Intelligence Workbench at LinkedIn"
slug: "linkedin-pro-ml-darwin-data-science-and-artificial-intelligence-workbench-at-linkedin"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "metadata-store"
  - "notebooks"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "databricks"
  - "dbt"
  - "docker"
  - "kubernetes"
  - "spark"
  - "terraform"
  - "data-ingestion"
  - "data-prep"
  - "data-validation"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "monitoring"
  - "training"
industryTags: "media-entertainment"
company: "LinkedIn"
companySlug: "linkedin"
platformName: "Pro-ML"
contentType: "blog"
summary: "LinkedIn built DARWIN (Data Science and Artificial Intelligence Workbench at LinkedIn) to address the fragmentation and inefficiency caused by data scientists and AI engineers using scattered tooling across their workflows. Before DARWIN, users struggled with context switching between multiple tools, difficulty in collaboration, knowledge fragmentation, and compliance overhead. DARWIN provides a unified, hosted platform built on JupyterHub, Kubernetes, and Docker that serves as a single window to all data engines at LinkedIn, supporting exploratory data analysis, collaboration, code development, scheduling, and integration with ML frameworks. Since launch, the platform has been adopted by over 1400 active users across data science, AI, SRE, trust, and business analyst teams, with user growth exceeding 70% in a single year."
link: "https://engineering.linkedin.com/blog/2022/darwin--data-science-and-artificial-intelligence-workbench-at-li"
year: 2022
seo:
  title: "LinkedIn: DARWIN: Data Science and Artificial Intelligence Workbench at LinkedIn - ZenML MLOps Database"
  description: "LinkedIn built DARWIN (Data Science and Artificial Intelligence Workbench at LinkedIn) to address the fragmentation and inefficiency caused by data scientists and AI engineers using scattered tooling across their workflows. Before DARWIN, users struggled with context switching between multiple tools, difficulty in collaboration, knowledge fragmentation, and compliance overhead. DARWIN provides a unified, hosted platform built on JupyterHub, Kubernetes, and Docker that serves as a single window to all data engines at LinkedIn, supporting exploratory data analysis, collaboration, code development, scheduling, and integration with ML frameworks. Since launch, the platform has been adopted by over 1400 active users across data science, AI, SRE, trust, and business analyst teams, with user growth exceeding 70% in a single year."
  canonical: "https://www.zenml.io/mlops-database/linkedin-pro-ml-darwin-data-science-and-artificial-intelligence-workbench-at-linkedin"
  ogTitle: "LinkedIn: DARWIN: Data Science and Artificial Intelligence Workbench at LinkedIn - ZenML MLOps Database"
  ogDescription: "LinkedIn built DARWIN (Data Science and Artificial Intelligence Workbench at LinkedIn) to address the fragmentation and inefficiency caused by data scientists and AI engineers using scattered tooling across their workflows. Before DARWIN, users struggled with context switching between multiple tools, difficulty in collaboration, knowledge fragmentation, and compliance overhead. DARWIN provides a unified, hosted platform built on JupyterHub, Kubernetes, and Docker that serves as a single window to all data engines at LinkedIn, supporting exploratory data analysis, collaboration, code development, scheduling, and integration with ML frameworks. Since launch, the platform has been adopted by over 1400 active users across data science, AI, SRE, trust, and business analyst teams, with user growth exceeding 70% in a single year."
mlops:
  source: "sqlite"
  entryId: 42
  sourceUrl: "https://engineering.linkedin.com/blog/2022/darwin--data-science-and-artificial-intelligence-workbench-at-li"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060766"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

LinkedIn generates massive amounts of data at exabyte scale, which data scientists, AI engineers, and analysts use to power products ranging from job recommendations to personalized feeds. However, before DARWIN, these teams faced significant productivity challenges due to fragmented tooling and poor developer experience.

The core problems fell into two major categories. First, developer experience suffered from constant context switching across multiple tools, making collaboration difficult and hampering productivity. Data scientists had to move between Jupyter notebooks for exploration, SQL tools like Alation and Aqua Data Studio for queries, Tableau for visualization, Azkaban for scheduling, Git for version control, and various ML frameworks for model training. Second, fragmentation in tooling based on historical usage and personal preferences led to knowledge silos, lack of discoverability of prior work, difficulty sharing results with stakeholders, and escalating overhead to ensure each tool complied with LinkedIn's privacy and security policies, especially when tools ran locally on user machines.

LinkedIn identified multiple user personas that needed support: expert data scientists and AI engineers, citizen data scientists and business analysts, product managers, metrics developers using LinkedIn's Unified Metrics Platform (UMP), and data developers. Each persona had workflows spanning data exploration and transformation, data visualization and evaluation, and productionization—often using completely different toolsets. The goal was to unify these scattered experiences into a single platform that could serve as the foundation for the entire data science and AI development lifecycle.

## Architecture & Design

DARWIN's architecture is built around several key design principles: leveraging open source technologies, providing horizontal scalability with resource isolation, enabling extensibility through a "Bring Your Own Application" (BYOA) model, and maintaining strict governance and compliance with LinkedIn's security policies.

The platform architecture consists of several interconnected layers. At the foundation, DARWIN uses Kubernetes for orchestration, providing horizontal scalability and isolated user environments. JupyterHub sits on top of Kubernetes, managing concurrent user environments and server lifecycles, with pluggable authentication integrated with LinkedIn's auth stack. JupyterHub's Kubernetes spawner launches independent user servers, giving each user their own isolated environment that can be culled on inactivity.

A critical architectural decision was modeling all knowledge artifacts as "resources" in DARWIN. Every top-level artifact—notebooks, SQL workbooks, outputs, markdown files, reports, articles, projects—is modeled as a resource with its own type. Resources can be linked hierarchically, and common operations like CRUD, storage, collaboration features, search, and versioning are provided uniformly across all resource types. This abstraction allows new resource types to be added seamlessly by focusing only on frontend and unique functionality while inheriting common capabilities.

The architecture separates resource metadata from storage through two key services. The Platform Service manages DARWIN resource metadata, serves as the entry point for authentication and authorization, manages launching user containers via JupyterHub, and maps resources to file blobs by interacting with the Storage Service. Platform Service also stores DARWIN resource metadata in DataHub for centralized metadata management and establishing relationships with other metadata entities. The Storage Service abstracts content storage as file blobs in a persistent backend store, with a client-side DARWIN storage library handling transfers from user containers. For Jupyter notebooks, this integrates through a custom implementation of the Notebook Contents API.

DARWIN provides unified access to multiple data platforms across LinkedIn. Users can query data through Spark (using Python, R, Scala, or Spark SQL), Trino, MySQL, and soon Pinot. The platform also provides direct HDFS access, useful for frameworks like TensorFlow. This multi-engine support makes DARWIN a single window to all data platforms at LinkedIn, regardless of where data is stored.

The frontend heavily uses React.js, building React-based JupyterLab extensions to support most features. React's performance, vibrant community, and rich plugin support made it the framework of choice. The frontend provides resource browsing, CRUD operations, execution environment switching, and a user workspace view that consolidates all user artifacts.

## Technical Implementation

Docker serves dual purposes in DARWIN's implementation. First, it packages and isolates user notebook containers launched on Kubernetes. Second, and more importantly, Docker enables true platform democratization through the BYOA model. Partner teams build custom Docker images on top of base DARWIN images, encapsulating their apps or libraries. An independent Docker registry serves as an app marketplace for DARWIN, allowing teams to extend the platform without requiring core platform changes.

This extensibility has enabled multiple use cases from LinkedIn teams. The Abuse Incident Response and Prevention (AIRP) team built an on-call dashboard with custom frontend. The Greykite forecasting library was integrated, providing end-to-end forecasting including input data visualization, model configuration, time-series cross-validation, and forecast visualization through the Jupyter interface. Teams can package different libraries and applications due to Docker's environment isolation, focusing on app code and deployment while the platform handles scaling, site reliability, compliance, governance, and discovery.

Language support spans Python, SQL, R, and Scala for Spark, covering all languages used by LinkedIn's data scientists and AI engineers. Intellisense capabilities—code completion, documentation help, and function signatures—are implemented across these languages. SQL autocomplete specifically leverages a backing data catalog built from metadata stored in DataHub.

SQL workbooks were built specifically for citizen data scientists and business analysts comfortable with SQL but not requiring complex model development. SQL workbooks provide a SQL editor with results displayed in tabular format, supporting spreadsheet operations like searching, filtering, sorting, and pivoting. Future plans include built-in visualizations, report publishing, and data catalog views with dataset profiles.

Scheduling of notebooks and workbooks addresses the productionization need for repeatable analysis with continuously generated data. DARWIN's scheduling integrates with Azkaban and supports parameterization, allowing users to specify parameters that can be used in code during scheduled execution.

Integration with other LinkedIn tools creates a unified experience. DARWIN integrated with Frame (LinkedIn's internal feature management tool for ML applications) and TensorFlow to serve expert data scientists and AI engineers. Active work is underway for tight integration with LinkedIn's Pro-ML (productive machine learning) framework. For metrics developers, DARWIN integrated with internal tools providing error validation, metric template building, testing, reviewing, and code submission all within DARWIN. The Greykite framework for forecasting, anomaly detection, and root cause analysis also leverages DARWIN's customization capabilities.

Governance and compliance are deeply embedded. DARWIN maintains audit trails for every operation, encrypts execution results, and stores them securely to prevent leaks. Fine-grained access control prevents unauthorized access to DARWIN resources. By default, any user can view others' code (without results) to enable learning and discovery, but data visibility requires explicit sharing by resource owners to authorized users, with all shares tracked in security audits.

## Scale & Performance

DARWIN has achieved significant adoption since launch, serving over 1400 active users across diverse organizations including Data Science, Artificial Intelligence, SRE, Trust, Business Analysts, and key product teams. The user base grew by over 70% in a single year, demonstrating strong organic adoption.

The platform manages data at exabyte scale, reflecting LinkedIn's overall data infrastructure. DARWIN connects to multiple query engines handling this massive data volume, with Spark, Trino, MySQL, and soon Pinot providing access to datasets across LinkedIn's entire data ecosystem.

The Kubernetes-based architecture provides horizontal scalability to accommodate growing user numbers. User environments are isolated, giving each user dedicated resources without interference. JupyterHub manages server lifecycles efficiently, culling inactive servers to optimize resource utilization while maintaining performance for active users.

The separation of resource metadata from storage, combined with the resource abstraction model, enables DARWIN to scale as a knowledge repository. Resources can be searched, discovered, and shared efficiently even as the number of artifacts grows. DataHub integration for centralized metadata management provides additional scalability for search and discovery features.

## Trade-offs & Lessons

LinkedIn made several strategic architectural decisions that shaped DARWIN's success. The choice to build on established open source technologies—JupyterHub, Kubernetes, Docker—rather than building from scratch allowed the team to focus on differentiating features rather than infrastructure foundations. This accelerated time to market and provided battle-tested foundations for scale, security, and reliability.

The resource abstraction model proved highly valuable, enabling uniform treatment of different artifact types while allowing specialized functionality. This architecture made it easy to add new resource types without reimplementing common capabilities like storage, versioning, sharing, and search. The separation of metadata from storage through Platform Service and Storage Service provided architectural flexibility to evolve each layer independently.

The BYOA model through Docker democratized the platform, allowing partner teams to extend DARWIN independently without bottlenecking on the core platform team. This created a multiplicative effect where DARWIN's value grew beyond what the core team could build alone. The Docker registry as an app marketplace provided discoverability and governance for extensions.

Forming a product user council representing different organizations proved essential for adoption. This council served as the voice of the customer, helping prioritize features and providing feedback before releases. Co-creating with users rather than building in isolation ensured DARWIN addressed real needs and achieved product-market fit within LinkedIn.

The integration strategy balanced building core capabilities in DARWIN with integrating existing tools. Rather than replacing all existing tools immediately, DARWIN integrated with Frame, Pro-ML, UMP tooling, and others to create unified experiences. This pragmatic approach recognized the value in existing tools while reducing fragmentation through a single entry point.

Security and governance were architectural requirements from day one rather than afterthoughts. Audit trails, encryption, fine-grained access control, and the default model of sharing code without results balanced collaboration with data protection. Building compliance into the foundation avoided the overhead of retrofitting security that plagued the previous fragmented tooling landscape.

The platform still has areas for growth. Publishing dashboards and apps, built-in visualizations, project workspaces with Git integration for version control, and enhanced exploratory data analysis leveraging DataHub are all on the roadmap. The vision to eventually open source DARWIN suggests confidence that the architecture and approach have broader applicability beyond LinkedIn.

Key lessons for practitioners building similar platforms include: leverage open source foundations to accelerate development; provide extensibility mechanisms so users and partner teams can build on your platform; model artifacts uniformly while allowing specialization; separate concerns architecturally (metadata vs storage, authentication vs execution); integrate with existing tools rather than forcing full replacement; form user councils to ensure product direction aligns with real needs; and build security and governance into foundations rather than layering them on later. DARWIN demonstrates that a unified ML platform can successfully serve diverse personas from expert data scientists to business analysts when designed with extensibility, governance, and user experience as core principles.
