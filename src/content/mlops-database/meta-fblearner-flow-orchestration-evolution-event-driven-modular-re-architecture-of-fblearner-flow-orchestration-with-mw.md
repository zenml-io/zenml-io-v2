---
title: "Event-driven, modular re-architecture of FBLearner Flow orchestration with MWFS to remove DB bottlenecks and enable scalable execution"
slug: "meta-fblearner-flow-orchestration-evolution-event-driven-modular-re-architecture-of-fblearner-flow-orchestration-with-mw"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "docker"
  - "kubernetes"
  - "training"
industryTags: "media-entertainment"
company: "Meta"
companySlug: "meta"
platformName: "FBLearner Flow + orchestration evolution"
contentType: "blog"
summary: "Meta faced critical orchestration challenges with their legacy FBLearner Flow system, which served over 1100 teams running mission-critical ML training workloads. The monolithic architecture tightly coupled workflow orchestration with execution environments, created database scalability bottlenecks (1.7TB database limiting growth), introduced significant execution overhead (33% for short-running tasks), and prevented flexible integration with diverse compute resources like GPU clusters. To address these limitations, Meta's AI Infrastructure and Serverless teams partnered to build Meta Workflow Service (MWFS), a modular, event-driven orchestration engine built on serverless principles with clear separation of concerns. The re-architecture leveraged Action Service for asynchronous execution across multiple schedulers, Event Router for pub/sub observability, and a horizontally scalable SQL-backed core that enabled zero-downtime migration of all production workflows while supporting complex features like parent-child workflows, failure propagation, and workflow revival."
link: "https://atscaleconference.com/evolution-of-ai-training-orchestration-with-serverless-ecosystem/"
year: 2024
seo:
  title: "Meta: Event-driven, modular re-architecture of FBLearner Flow orchestration with MWFS to remove DB bottlenecks and enable scalable execution - ZenML MLOps Database"
  description: "Meta faced critical orchestration challenges with their legacy FBLearner Flow system, which served over 1100 teams running mission-critical ML training workloads. The monolithic architecture tightly coupled workflow orchestration with execution environments, created database scalability bottlenecks (1.7TB database limiting growth), introduced significant execution overhead (33% for short-running tasks), and prevented flexible integration with diverse compute resources like GPU clusters. To address these limitations, Meta's AI Infrastructure and Serverless teams partnered to build Meta Workflow Service (MWFS), a modular, event-driven orchestration engine built on serverless principles with clear separation of concerns. The re-architecture leveraged Action Service for asynchronous execution across multiple schedulers, Event Router for pub/sub observability, and a horizontally scalable SQL-backed core that enabled zero-downtime migration of all production workflows while supporting complex features like parent-child workflows, failure propagation, and workflow revival."
  canonical: "https://www.zenml.io/mlops-database/meta-fblearner-flow-orchestration-evolution-event-driven-modular-re-architecture-of-fblearner-flow-orchestration-with-mw"
  ogTitle: "Meta: Event-driven, modular re-architecture of FBLearner Flow orchestration with MWFS to remove DB bottlenecks and enable scalable execution - ZenML MLOps Database"
  ogDescription: "Meta faced critical orchestration challenges with their legacy FBLearner Flow system, which served over 1100 teams running mission-critical ML training workloads. The monolithic architecture tightly coupled workflow orchestration with execution environments, created database scalability bottlenecks (1.7TB database limiting growth), introduced significant execution overhead (33% for short-running tasks), and prevented flexible integration with diverse compute resources like GPU clusters. To address these limitations, Meta's AI Infrastructure and Serverless teams partnered to build Meta Workflow Service (MWFS), a modular, event-driven orchestration engine built on serverless principles with clear separation of concerns. The re-architecture leveraged Action Service for asynchronous execution across multiple schedulers, Event Router for pub/sub observability, and a horizontally scalable SQL-backed core that enabled zero-downtime migration of all production workflows while supporting complex features like parent-child workflows, failure propagation, and workflow revival."
mlops:
  source: "sqlite"
  entryId: 154
  sourceUrl: "https://atscaleconference.com/evolution-of-ai-training-orchestration-with-serverless-ecosystem/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.612596"
  lastUpdated: "2026-04-14T19:55:33.607822"
---

## Problem Context

Meta's AI Infrastructure faced a critical inflection point with their existing orchestration platform, FBLearner Flow, which served as the ML pipeline authoring SDK and orchestration framework for nearly all mission-critical offline and recurring ML training workloads across more than 1100 teams at Meta. The system had evolved into a monolithic architecture that created several severe pain points limiting Meta's ability to scale AI workloads and innovate on ML infrastructure.

The most pressing challenge was the lack of architectural clarity—FBLearner Flow mixed numerous concepts across every layer of the stack, creating substantial confusion about whether it was a generalized workflow engine, an end-to-end ML platform, or some hybrid. This architectural ambiguity prevented the team from focusing on ML-specific innovation and made it difficult for other framework builders to leverage the system effectively.

The tight coupling between job scheduling and execution environments presented another major obstacle. Previously, jobs responsible for running operators had to be scheduled through Chronos, a scheduler tightly coupled to its execution environment. To incorporate alternative execution environments optimized for GPU workloads, teams were forced to use wrapper Chronos jobs, which introduced multiple drawbacks. Each Chronos job required provisioning dedicated containers, contributing to increased execution latency. According to Meta's data analysis, for operators running less than 5 minutes, the overhead introduced by Flow runtime accounted for approximately one-third of the entire execution time. The wrapper pattern also created complexity across the stack—UI layers had to implement abstractions to identify wrapper jobs and specialize them for log fetching and DAG views, while resource accounting systems needed specialization to identify wrapper jobs and attribute costs across schedulers. This architecture also decreased overall reliability due to additional dependencies.

The database architecture created severe scalability constraints. Flow maintained source-of-truth metadata and runtime status in a single sharded database serving workflow management, UI, and observability datasets. This monolithic approach imposed hard limits on workflow size and operator count, restricting patterns that customers required. Notably, one framework from Reality Labs needed support for up to 20,000 operators in a single pipeline, which FBLearner Flow could not accommodate. The database size had grown to approximately 1.7TB, well above normal operational parameters, which impacted both reliability and query performance. More critically, there was minimal room to scale vertically, meaning the system would not sustain expected workload growth in coming years.

The SDK design presented testing and reliability challenges. FBLearner Flow lacked an explicit DAG representation from the SDK layer—it had to execute user Python code to construct a DAG as an in-memory Python structure. This meant there was no user-friendly mechanism for writing unit tests for workflows, forcing teams to rely heavily on integration tests with their associated overhead and complexity.

AI framework builders who wanted UI and high-level features not provided by underlying orchestration had to build directly on top of Flow, inheriting all its limitations and unnecessary features. This manifested in slow build times due to dependency bloat, architectural problems, and performance issues stemming from accumulated technical debt. The lack of modularity prevented innovation at individual layers of the stack.

## Architecture & Design

Meta's solution involved re-architecting FBLearner Flow by building on top of Meta Workflow Service (MWFS), a new orchestration engine developed through collaboration between AI Infrastructure and Serverless teams. The design philosophy centered on creating clear separation of concerns through a collection of loosely coupled services that together form a serverless ecosystem powerful enough to handle all AI use cases while remaining flexible enough to eventually consolidate the majority of workflow systems across Meta.

The architecture consists of several key components working together:

**Meta Workflow Service (MWFS)** serves as the core orchestration service and initial point of contact for clients defining and launching workflows. It tracks both workflow state and workflow events, determining and invoking code for the next steps in workflow execution. The service is horizontally scalable, built on SQL databases, and uses FOQS (Facebook's distributed queue) for queuing. All workflows are scoped to a shard, enabling seamless horizontal scaling. MWFS has implicit dependencies on fundamental services including Shard Manager, Configerator, and Tupperware.

**Event Router** serves as the core service for event management, allowing developers to easily connect event sources (such as blob stores or SQL databases) to event handlers like Lambda functions. It implements a pub/sub pattern using simple YAML configuration files to define mappings between events and handlers. Event Router provides filtering and transformation capabilities for events, enabling flexibility in event processing. Throughout a workflow's lifecycle, MWFS continuously publishes detailed events—workflow_start, node_start, node_end, failure reasons, and more—that subscribers can consume.

**Action Service** handles triggering and polling status of asynchronous functions across various execution runtimes within Meta. Unlike traditional RPC systems where clients wait for responses, Action Service allows clients to send requests and immediately proceed with other tasks. Action Service processes requests asynchronously and notifies clients upon completion through callbacks. This enables clients to delegate workloads without blocking, enhancing overall system efficiency and scalability. The service also provides automatic retry capabilities, making it easier to build fault-tolerant applications. Action Service acts as a critical abstraction layer preventing tight coupling between the orchestrator and diverse execution platforms.

**Timer Service** manages all recurring and scheduled events within the ecosystem.

The workflow model in MWFS represents workflows as collections of nodes with their relationships (edges). Currently the system supports DAG (directed acyclic graph) structures only, though support for loops and conditionals is planned. Workflows can be either ephemeral (one-shot workflows that start immediately after creation) or non-ephemeral (workflow definitions uploaded once and instantiated many times).

Nodes within workflows follow strict state transitions: PENDING → READY → RUNNING → FINISHING → FINISHED. This state machine allows MWFS to maintain high concurrency while preserving correctness guarantees. The system enforces in-order execution of nodes at each stage.

Two key components drive workflow execution: **NodeDecider** and **NodeExecutor**. The NodeDecider manages and coordinates workflow execution, deciding which task node should execute next based on workflow instance state and workflow definition. It handles workflow orchestration by analyzing completion status of previous nodes, respects task dependencies by waiting until dependencies are satisfied before scheduling nodes, implements error handling and retries according to tenant retry policies, and operates within shard scope to support scalability through idempotent operations.

The NodeExecutor focuses on behavior within individual nodes, with specialized implementations for different node types. **TaskExecutor** launches tasks with specified input parameters, timeout, and retry policy via Action Service, receiving results through callbacks and marking nodes as failed if launch fails or Action Service reports failure. **WorkflowNodeExecutor** launches sub-workflows with given parameters or from workflow definitions, marking the node as failed if sub-workflow creation fails or the sub-workflow finishes in failed state. **WaitExecutor** pauses for specified intervals or external events, ending immediately when signals are received or time elapses. **PassExecutor** defines dummy nodes that succeed instantly with no output, commonly used when triggering multiple concurrent actions before proceeding. Future expansions include MapNodeExecutor, LoopExecutor, and additional node types.

Failure policies provide adaptability at the node level, enabling users to configure whether workflows continue, cancel, or fail after node failures through policies like ContinueProcessing, BlockDependents, and CancelDependents. The RetryWorkflow feature allows users to revive unsuccessful workflows without complete rewrites and reruns.

The architecture specifically addresses the original pain points through its design. Multiple execution environments integrate through Action Service without tight coupling—the orchestrator doesn't need to know implementation details of schedulers handling CPU batch jobs, GPU training clusters, or Thrift services. The event-driven model through Event Router enables flexible observability where AI metadata stores, client-facing UIs, and logging systems all subscribe to relevant events without requiring orchestrator modifications. The SQL-backed sharded architecture with horizontal scaling eliminates the database bottleneck that plagued the monolithic Flow database.

## Technical Implementation

The implementation leveraged several Meta-internal platforms and services as building blocks. MWFS is built on SQL databases for persistence, using Meta's sharding infrastructure (Shard Manager) for horizontal scaling. FOQS, Facebook's distributed queue system, handles queuing within each shard. Tupperware, Meta's container orchestration platform, manages service deployment. Configerator provides configuration management across the infrastructure.

The transition from pull-based to push-based execution monitoring represented a significant technical improvement. Initially, Action Service frequently polled multiple execution platforms for job status updates, wasting compute resources and introducing latency between job completion and notification. By integrating execution platforms with Event Router as publishers, the system shifted to a push paradigm where execution environments publish completion events and the orchestrator responds to trigger subsequent nodes. Action Service handles these events through callback APIs, maintaining the same interface as the pull-based architecture while eliminating polling overhead.

The system implements sophisticated monitoring for reliability and availability. In-house mechanisms detect delays between node transitions, identify stuck workflows, and prevent hot shard issues. The event stream through Event Router enables real-time observability into workflow progression, critical for AI researchers who need to analyze results midway through training to decide whether to continue experiments or restart with new parameters.

The implementation carefully handles Python code execution. Unlike the legacy Flow system that had to execute user Python code to construct DAGs as in-memory Python structures, the new architecture separates workflow definition from execution, though specific details of the SDK implementation aren't fully elaborated in the source.

For safe production onboarding, the team implemented comprehensive shadowing infrastructure. They introduced a Shadow Service that integrated with Action Service like any other execution environment. The client library was modified to create duplicate requests—production requests went to the existing orchestrator while shadow requests forwarded to MWFS. Shadow requests included a no-op flag enabling MWFS to differentiate and forward nodes to the Shadow Service for appropriate handling.

The Shadow Service implemented sophisticated logic depending on request type. For execute requests, it returned responses from corresponding production requests, handling race conditions where shadow requests arrived before production requests. For status requests, the Shadow Service polled corresponding execution systems. Cancel requests presented the greatest challenge since they could impact production jobs—the team addressed this by recording cancellation intent from the production orchestration engine and results in a separate database, querying this for shadow orchestrator operations while handling race conditions.

An offline monitoring system pulled and compared artifacts from legacy and new scheduler databases, focusing on three primary dimensions: workflow execution end state, job/node execution end state, and running time for workflows and jobs. This enabled verification that MWFS experienced node execution in the same order with throughput, latency, and error metrics that weren't degraded compared to the legacy system.

## Scale & Performance

The scale of Meta's workflow orchestration challenge is substantial. FBLearner Flow served over 1100 teams across Meta, making any downtime a significant risk for revenue and productivity. The legacy system's database had grown to approximately 1.7TB, well beyond typical operational parameters, creating performance and reliability concerns.

Performance improvements from the re-architecture were significant and measurable. In the legacy system, for operators running less than 5 minutes, Flow runtime overhead represented approximately one-third of total execution time. By eliminating container provisioning requirements for certain operations and converting Chronos job logic into direct Thrift API calls via Action Service, the team substantially reduced end-to-end model training time.

The move from pull-based to push-based execution monitoring eliminated polling overhead across the system. Previously, Action Service continuously polled multiple execution platforms for status updates, consuming compute resources and introducing latency. The push-based model using Event Router as the pub/sub backbone removed this waste while reducing the time between job completion and orchestrator notification.

The architecture supports complex workflows with up to 20,000 operators, addressing the Reality Labs use case that the legacy Flow system couldn't accommodate. The horizontally scalable design with workflow-per-shard scoping eliminates the database scalability ceiling that limited the monolithic system.

The migration achieved zero downtime despite serving 1100+ teams in production. All production workflows transitioned to the new system through careful shadowing and monitoring without service interruptions. This represents a significant operational achievement given the scale and criticality of the workloads involved.

## Trade-offs & Lessons

The journey from monolithic to modular architecture revealed several key insights for practitioners building ML orchestration platforms at scale.

The most fundamental lesson involved the importance of separation of concerns. Meta's initial attempt at unifying workflow systems sought to leverage existing components like DAG and FOQS, creating a consumer to offload AI workloads to dedicated ML execution runtimes with continuous polling. However, as feature requests emerged—parent-child workflows, failure propagation, lifecycle event notifications, workflow revival and repair, recurring workflows, scheduled waits—it became clear that retrofitting these into an inflexible system was impractical. The team took a step back to think in terms of "Legos"—basic building blocks with discrete responsibilities that together create an ecosystem adaptable to the ever-changing AI space.

This modular, building-block approach proved essential for enabling rapid iteration. The flexibility of Event Router with multiple subscribers allowed supporting various subsystems including client-facing UIs, AI metadata stores for cross-experiment result collection, and operational logging systems. The abstraction layer provided by Action Service enabled quick optimization and support for existing use cases while allowing future extensibility to new execution environments without orchestrator modifications.

The shadowing approach for safe production migration demonstrates the value of investing in sophisticated testing infrastructure. Rather than attempting a risky cutover, the team built Shadow Service with intelligent handling of different request types, race condition management, and separate databases for tracking cancellation intent. The offline monitoring system comparing artifacts between legacy and new schedulers provided confidence in correctness before committing to the migration. This investment in migration safety infrastructure enabled zero-downtime transition despite the scale and criticality of workloads.

The push-based event model proved superior to polling for workflow orchestration at scale. The transition from Action Service polling execution platforms to execution platforms publishing to Event Router eliminated wasted compute while reducing latency. This architectural pattern—making systems event publishers that push state changes rather than having orchestrators poll—scales better and provides more flexibility for multiple subscribers to consume events as needed.

The team learned that tight coupling between orchestration and execution creates cascading complexity. The wrapper pattern required for integrating GPU schedulers with Chronos created problems across the stack—specialized UI logic, specialized resource accounting, degraded reliability from additional dependencies. Breaking this coupling through Action Service as an abstraction layer eliminated these issues and enabled clean integration with diverse execution environments.

Database architecture choices have profound scaling implications. The monolithic 1.7TB database in legacy Flow created a hard ceiling on growth. The horizontally scalable, sharded design in MWFS with workflow-per-shard scoping eliminated this constraint. For practitioners building workflow systems, investing in scalable data architecture from the start prevents painful migrations later.

The success of this re-architecture has enabled Meta to pursue broader workflow consolidation. Following successful AI Infrastructure onboarding with zero downtime, Data Warehouse committed to migrating all workflows to MWFS by 2025. Multiple parallel evaluation streams are exploring merging Enterprise workflows, Async Workflows, DAG, and CWS within MWFS in coming years, realizing the vision of a unified workflow platform across Meta.

The approach demonstrates that sometimes the right solution involves building new infrastructure rather than extending legacy systems. Meta had created over a dozen workflow solutions over a decade, each built for specific domain needs with tightly coupled execution and orchestration layers. Rather than attempting to retrofit one of these existing systems, building MWFS from serverless principles with clear abstractions created a more sustainable foundation for future growth and consolidation.
