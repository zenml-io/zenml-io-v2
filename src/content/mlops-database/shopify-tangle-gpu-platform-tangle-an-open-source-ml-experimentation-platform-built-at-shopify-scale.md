---
title: "Tangle: An open-source ML experimentation platform built at Shopify scale"
slug: "shopify-tangle-gpu-platform-tangle-an-open-source-ml-experimentation-platform-built-at-shopify-scale"
draft: false
mlopsTags:
  - "data-versioning"
  - "experiment-tracking"
  - "metadata-store"
  - "pipeline-orchestration"
  - "dbt"
  - "docker"
  - "kubernetes"
  - "spark"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "training"
industryTags: "e-commerce"
company: "Shopify"
companySlug: "shopify"
platformName: "Tangle / GPU Platform"
contentType: "blog"
summary: "Shopify built and open-sourced Tangle, an ML experimentation platform designed to solve chronic reproducibility, caching, and collaboration problems in machine learning development. The platform enables teams to build visual pipelines that integrate arbitrary code in any programming language, execute on any cloud provider, and automatically cache computations globally across team members. Deployed at Shopify scale to support Search & Discovery infrastructure processing millions of products across billions of queries, Tangle has saved over a year of compute time through content-based caching that reuses task executions even while they're still running. The platform makes every experiment automatically reproducible, eliminates manual dependency tracking, and allows non-engineers to create and run pipelines through a drag-and-drop visual interface without writing code or setting up development environments."
link: "https://shopify.engineering/tangle"
year: 2025
seo:
  title: "Shopify: Tangle: An open-source ML experimentation platform built at Shopify scale - ZenML MLOps Database"
  description: "Shopify built and open-sourced Tangle, an ML experimentation platform designed to solve chronic reproducibility, caching, and collaboration problems in machine learning development. The platform enables teams to build visual pipelines that integrate arbitrary code in any programming language, execute on any cloud provider, and automatically cache computations globally across team members. Deployed at Shopify scale to support Search & Discovery infrastructure processing millions of products across billions of queries, Tangle has saved over a year of compute time through content-based caching that reuses task executions even while they're still running. The platform makes every experiment automatically reproducible, eliminates manual dependency tracking, and allows non-engineers to create and run pipelines through a drag-and-drop visual interface without writing code or setting up development environments."
  canonical: "https://www.zenml.io/mlops-database/shopify-tangle-gpu-platform-tangle-an-open-source-ml-experimentation-platform-built-at-shopify-scale"
  ogTitle: "Shopify: Tangle: An open-source ML experimentation platform built at Shopify scale - ZenML MLOps Database"
  ogDescription: "Shopify built and open-sourced Tangle, an ML experimentation platform designed to solve chronic reproducibility, caching, and collaboration problems in machine learning development. The platform enables teams to build visual pipelines that integrate arbitrary code in any programming language, execute on any cloud provider, and automatically cache computations globally across team members. Deployed at Shopify scale to support Search & Discovery infrastructure processing millions of products across billions of queries, Tangle has saved over a year of compute time through content-based caching that reuses task executions even while they're still running. The platform makes every experiment automatically reproducible, eliminates manual dependency tracking, and allows non-engineers to create and run pipelines through a drag-and-drop visual interface without writing code or setting up development environments."
mlops:
  source: "sqlite"
  entryId: 208
  sourceUrl: "https://shopify.engineering/tangle"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.618045"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Shopify's ML teams, particularly Search & Discovery, faced six critical failure modes that severely hampered machine learning development velocity and reliability. Engineers had to manually remember custom queries written for each experiment, maintaining logs to track which query was used at which stage, leading to frequent mistakes and slowdowns. Notebooks accumulated without structure, creating organizational chaos. Hours-long data preparation tasks were repeatedly executed even when inputs hadn't changed, wasting both time and compute resources. Teams couldn't recreate old experimental results due to missing versioning and lineage tracking. Deployment processes took longer than model training itself. Perhaps most critically, there was no effective sharing mechanism—team members couldn't help each other or try variants of colleagues' experiments without extensive coordination.

The Search & Discovery team felt these pain points acutely given their scale requirements: ranking millions of products across billions of search queries. The conventional wisdom that 80% of ML development time is spent on data engineering rather than algorithms was proving true, but this friction was unacceptable at commerce scale. Existing platforms either focused narrowly on specialized data processing or ML training in isolation, but not both in flexible combination. The team needed a solution that could handle the entire experimental lifecycle—from data preparation through training, deployment, human evaluation, and metric calculation—all within a single coherent framework.

## Architecture & Design

Tangle implements a declarative architecture built around a clear conceptual hierarchy that mirrors familiar programming patterns. At the foundation sits the **Component**, which functions analogously to a function definition—a reusable specification containing metadata (name, description, annotations), an interface definition (inputs and outputs), and an implementation (either a templated command-line invocation of a containerized CLI program or a graph of interconnected tasks). Components are defined as plain-text YAML files, enabling them to be organized into searchable libraries, versioned independently, and safely loaded from any source including GitHub, web URLs, or cloud storage.

A **Task** represents a configured instance of a component with specified input arguments, conceptually similar to a function call in code. When a pipeline executes, each task produces an **Execution**—the actual runtime invocation that generates output artifacts. A **Graph** connects multiple tasks where outputs from one task flow as inputs to another, forming directed acyclic graphs (DAGs). Finally, a **Pipeline** is simply a root graph component whose implementation consists of interconnected tasks.

This declarative model provides significant advantages over code-centric approaches. Unlike Python packages that must be installed globally and often conflict, components can be versioned independently and referenced by exact content hash. Users can mix different component versions in the same pipeline for direct comparison experiments without encountering dependency conflicts—a capability impossible with traditional package management.

### Data Flow Architecture

Tangle components communicate exclusively through file paths rather than in-memory objects, enabling true distributed execution. The data flow follows a four-step pattern: the producer component writes output to a local path, the system automatically uploads the artifact to cloud storage (GCS, S3, or other backends), the consumer component reads from what appears to be a local path, and the system transparently retrieves the artifact from storage. The orchestrator replaces path placeholders with actual file locations at runtime, meaning components implement standard file I/O while storage location and transport remain completely abstracted.

### Content-Based Caching Innovation

Tangle's most distinctive architectural feature is its content-based caching system, which fundamentally differs from the lineage-based caching used by most ML platforms. Traditional lineage-based systems force re-execution of all downstream components whenever any upstream component changes. Tangle instead checks output content hashes—if an upstream component changes but produces identical outputs, downstream components automatically reuse cached results without re-execution. The real-world impact is dramatic: a 10-hour pipeline completes in 20 minutes when only one component changes but produces identical outputs.

The caching system operates globally across all users. When three data scientists submit experiments that share a preprocessing step, Tangle executes the preprocessing once and all three pipelines share the artifact. Remarkably, the system can reuse not only fully succeeded task executions but also still-running ones—if a teammate is already executing a long-running preprocessing task, your pipeline will automatically wait and reuse their results rather than duplicating the computation.

### Language-Agnostic Component Design

Components wrap arbitrary containerized CLI programs that require no awareness of Tangle. This design provides three critical advantages: language neutrality (components can be written in Python, JavaScript, C#, C++, Rust, Java, Go, R, Shell, or any language supporting CLI execution), distributed orchestration (components execute on different machines at different times without shared runtime requirements), and clear isolation (containers enable hermetic execution without state pollution between runs).

The system supports both traditional containerized components and inline script components for rapid prototyping. An inline component embeds code directly in the YAML specification, which Tangle then containerizes automatically. This eliminates the need to build and publish custom containers for simple transformations while maintaining the isolation benefits.

### Optional Type System Philosophy

Tangle implements an optional type system where types provide metadata for tooling but aren't enforced at runtime. Components specify their I/O types (String, Float, JsonObject, ApacheParquet, TensorflowModel), and type names can be arbitrary but should be used consistently within a team or organization. Crucially, the system treats all artifact data as opaque blobs or strings (or directories)—there is no centralized data validation. Consuming components validate their own inputs according to their requirements.

This design reflects deliberate trade-offs prioritizing openness, performance, security, and flexibility. Any user or team can declare specialized types without central coordination. The absence of runtime validation eliminates performance overhead. There are no parsing vulnerabilities from centralized validation code. Version compatibility is maintained without rigid schemas that would constrain evolution.

## Technical Implementation

### Execution Flow

When a user submits a pipeline, Tangle's orchestrator manages execution through a sophisticated state machine. Tasks begin in a queued state. The orchestrator checks dependencies, waiting for upstream tasks to complete and verifying input artifacts are available. Before launching execution, it calculates an execution cache key and searches for reusable executions—either succeeded or still running. On cache hit, the system reuses existing results. Otherwise, it launches the component container in the configured cloud cluster. Throughout execution, the orchestrator tracks container status, captures logs, and updates execution state. Upon completion, it stores output artifact metadata (size, hash, and small values) and signals downstream tasks that their dependencies are satisfied.

This orchestration happens automatically—users submit pipelines, the system handles scheduling and coordination, and users monitor results through the visual interface.

### Deployment Options

Tangle's platform-agnostic architecture enables deployment anywhere. At the time of open-sourcing, two primary deployment modes are fully supported. The local deployment uses Docker or Podman as the execution launcher, suitable for individual development and experimentation. The HuggingFace deployment leverages HuggingFace Jobs as the execution backend, providing immediate cloud execution without infrastructure setup.

The HuggingFace integration demonstrates Tangle's multi-tenant architecture capabilities. A shared multi-tenant instance maintains a central tenant database storing user IDs, access tokens, and orchestrator configurations, plus individual per-tenant SQLite databases in the main TangleML/tangle HuggingFace Space persistent storage. Each user's pipelines execute via that user's HuggingFace Jobs, with execution logs and output artifacts stored in the user's private HuggingFace Dataset repository (user/tangle_data). The UI provides clickable links to both artifacts and HuggingFace Jobs for complete transparency.

Users can also deploy single-tenant instances by duplicating the Tangle Space to their HuggingFace account and providing an HF token. These deployments store their database in the user's own HF Space persistent storage, providing complete control and data isolation. When cloned to an organization, this creates a single-tenant multi-user deployment where team members see each other's pipeline runs and benefit from organization-wide caching.

### Visual Editor and User Experience

Tangle renders pipelines as interactive directed acyclic graphs, eliminating the need to parse notebook code to understand data flows. The visual editor enables building pipelines through drag-and-drop: users add components from libraries, connect outputs to inputs by drawing edges, configure parameters inline through forms, and submit with one click. During execution, the interface provides real-time monitoring showing task execution status, artifacts and logs, which steps used cached results, and performance bottlenecks.

Every run is preserved with complete lineage, enabling rapid iteration without losing experiment history. Team members can clone any colleague's pipeline run, investigate issues, modify parameters, and resubmit—all tracked automatically without manual versioning.

## Scale & Performance

Tangle has been battle-tested at Shopify scale, powering production ML infrastructure for Search & Discovery and many other teams. The platform processes workloads involving millions of search queries and billions of products. Specific use cases include product ranking models across millions of SKUs, semantic search experimentation at query scale, recommendation system training, and real-time feature engineering pipelines.

The measured benefits quantify Tangle's impact on production operations. The team has accumulated over a year of compute time savings through intelligent caching. Data scientists now deploy new ranking models daily without requiring infrastructure team dependencies—a dramatic improvement in iteration velocity. Complete reproducibility means any experiment from six months prior can be recreated in two clicks with full artifact provenance, eliminating the common scenario of irreproducible results. Global caching eliminates thousands of redundant compute hours monthly, directly reducing cloud infrastructure costs. The shared component library accelerates development across teams and establishes consistent patterns that reduce onboarding time.

Specific performance characteristics highlight the caching system's effectiveness. The real-world example of a 10-hour pipeline completing in 20 minutes when only one component changes demonstrates how content-based caching outperforms lineage-based alternatives. The ability to reuse still-running executions means that when multiple team members submit similar experiments simultaneously, only the first actually executes while others automatically wait and share results.

## Trade-offs & Lessons

### Design Philosophy and Trade-offs

Tangle's architecture embodies deliberate trade-offs that reflect Shopify's specific requirements and broader philosophy about ML tooling. The choice to use file-based communication rather than in-memory passing prioritizes distributed execution and language neutrality over raw performance. This trade-off makes sense for Shopify's scale where experiments involve hours of computation—the overhead of serializing to/from storage is negligible compared to computation time, and the benefits of language interoperability and distributed execution are substantial.

The optional type system represents another conscious trade-off. By avoiding runtime type validation, Tangle sacrifices some safety for significant gains in flexibility, performance, and security. This reflects the reality that ML pipelines often deal with diverse, evolving data formats that rigid schemas would constrain. The approach trusts component authors to validate their inputs while allowing the ecosystem to evolve organically.

The decision to make components wrap arbitrary CLI programs rather than requiring framework-specific code is perhaps the most fundamental trade-off. This non-intrusive integration means users can incorporate existing code without modification and mix languages freely, but it also means Tangle can't provide some conveniences that tightly integrated frameworks offer. The team clearly valued reducing adoption friction and preserving existing investments over framework-specific optimizations.

### Key Insights for Practitioners

The Tangle case study offers several valuable lessons for organizations building ML infrastructure. The emphasis on automatic reproducibility without manual bookkeeping addresses a pervasive pain point—the observation that data scientists can't remember which notebook version they used or what parameters they changed at 2 a.m. is universally relatable. Making reproducibility automatic rather than requiring discipline is the only approach that scales.

The content-based caching innovation demonstrates that rethinking fundamental assumptions can yield dramatic improvements. Most orchestration systems use lineage-based caching because it's simpler to implement, but Tangle's content-based approach delivers order-of-magnitude speedups in common scenarios. The ability to reuse still-running executions is particularly clever—it transforms cache misses into cache hits when multiple users submit similar work simultaneously.

The platform-agnostic architecture reflects hard-won wisdom about avoiding vendor lock-in while maintaining flexibility. By separating the orchestration logic from execution backends, Tangle can run on Docker locally, HuggingFace Jobs, or any cloud provider without fundamental changes. This is especially valuable for organizations that may need to shift infrastructure providers or support multiple deployment environments.

The visual interface democratizes ML experimentation beyond engineers. The fact that product managers and analysts can create and run pipelines without writing code or setting up development environments significantly expands who can contribute to ML development. This addresses the common bottleneck where data scientists are overwhelmed with requests for simple metric calculations or experiment variants.

### Open-Source Strategy

Shopify's decision to open-source Tangle rather than keeping it proprietary reflects confidence that the platform's value comes from solving genuine problems rather than from secrecy. The approach invites collaboration from researchers and practitioners worldwide while extending Tangle's impact beyond Shopify's walls. This aligns with Shopify's stated commitment to making the web better through open-source contributions.

The planned features roadmap—direct support for major clouds (GCP already supported but needs documentation), expanded component library, and artifact visualization—suggests the team views this as the beginning rather than a finished product. The invitation for community involvement through GitHub stars, documentation, discussions, and contributions indicates genuine interest in collaborative development rather than just dumping code over the wall.

### Practical Considerations

For organizations considering Tangle adoption, several practical factors emerge. The system requires containerization infrastructure (Docker/Podman locally or cloud container orchestration), which may be a barrier for teams without existing container expertise. However, the inline component feature that automatically containerizes simple scripts reduces this barrier significantly.

The platform's storage requirements could become substantial since every execution's artifacts are preserved for caching and reproducibility. Organizations will need to plan for artifact lifecycle management and storage costs, though these costs are presumably offset by compute savings from caching.

The learning curve appears relatively gentle for users due to the visual interface, but creating effective component libraries requires understanding the componentization patterns and caching behavior. Organizations will likely need to invest in building institutional knowledge about how to decompose ML workflows into reusable components.

Overall, Tangle represents a thoughtful approach to ML experimentation infrastructure that prioritizes reproducibility, collaboration, and velocity without sacrificing flexibility. Its battle-testing at Shopify scale and open-source availability make it a compelling option for organizations facing similar challenges in ML development.
