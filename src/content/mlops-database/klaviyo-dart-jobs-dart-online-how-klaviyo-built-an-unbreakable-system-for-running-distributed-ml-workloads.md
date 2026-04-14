---
title: "How Klaviyo Built an Unbreakable System for Running Distributed ML Workloads"
slug: "klaviyo-dart-jobs-dart-online-how-klaviyo-built-an-unbreakable-system-for-running-distributed-ml-workloads"
draft: false
mlopsTags:
  - "compute-management"
  - "model-serving"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "docker"
  - "kubernetes"
  - "ray"
  - "terraform"
  - "data-prep"
  - "deployment"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "tech"
company: "Klaviyo"
companySlug: "klaviyo"
platformName: "DART Jobs / DART Online"
contentType: "blog"
summary: "Klaviyo built DART (DAtascience RunTime) Jobs API to solve the challenges of running distributed machine learning workloads at scale, replacing manual EC2 provisioning with an automated system that manages the entire job lifecycle. The platform leverages Ray for distributed computing on top of Kubernetes, providing on-demand auto-scaling clusters for model training, batch inference, and data processing across both development and production environments. The architecture uses a multi-cluster Kubernetes setup with a central MySQL database as the source of truth, a FastAPI-based REST API server for job submission, and a sync service with sophisticated state machine logic to reconcile desired and observed infrastructure states, ensuring consistent execution whether jobs are run locally by data scientists or automatically in production pipelines."
link: "https://klaviyo.tech/how-klaviyo-built-an-unbreakable-system-for-running-distributed-ml-workloads-f6ea35567458"
year: 2025
seo:
  title: "Klaviyo: How Klaviyo Built an Unbreakable System for Running Distributed ML Workloads - ZenML MLOps Database"
  description: "Klaviyo built DART (DAtascience RunTime) Jobs API to solve the challenges of running distributed machine learning workloads at scale, replacing manual EC2 provisioning with an automated system that manages the entire job lifecycle. The platform leverages Ray for distributed computing on top of Kubernetes, providing on-demand auto-scaling clusters for model training, batch inference, and data processing across both development and production environments. The architecture uses a multi-cluster Kubernetes setup with a central MySQL database as the source of truth, a FastAPI-based REST API server for job submission, and a sync service with sophisticated state machine logic to reconcile desired and observed infrastructure states, ensuring consistent execution whether jobs are run locally by data scientists or automatically in production pipelines."
  canonical: "https://www.zenml.io/mlops-database/klaviyo-dart-jobs-dart-online-how-klaviyo-built-an-unbreakable-system-for-running-distributed-ml-workloads"
  ogTitle: "Klaviyo: How Klaviyo Built an Unbreakable System for Running Distributed ML Workloads - ZenML MLOps Database"
  ogDescription: "Klaviyo built DART (DAtascience RunTime) Jobs API to solve the challenges of running distributed machine learning workloads at scale, replacing manual EC2 provisioning with an automated system that manages the entire job lifecycle. The platform leverages Ray for distributed computing on top of Kubernetes, providing on-demand auto-scaling clusters for model training, batch inference, and data processing across both development and production environments. The architecture uses a multi-cluster Kubernetes setup with a central MySQL database as the source of truth, a FastAPI-based REST API server for job submission, and a sync service with sophisticated state machine logic to reconcile desired and observed infrastructure states, ensuring consistent execution whether jobs are run locally by data scientists or automatically in production pipelines."
mlops:
  source: "sqlite"
  entryId: 214
  sourceUrl: "https://klaviyo.tech/how-klaviyo-built-an-unbreakable-system-for-running-distributed-ml-workloads-f6ea35567458"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.618268"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Klaviyo's machine learning lifecycle spans large-scale analytics, model training, inference, and evaluation, all requiring substantial on-demand compute resources. Before DART Jobs, the common pattern involved spinning up individual large EC2 instances for each workload, which created multiple friction points for the ML platform team and data scientists.

The previous approach suffered from several critical pain points. Iteration speed was hampered by manual provisioning and teardown of infrastructure for every job run, slowing down experimentation and development cycles. Resource utilization was inefficient because teams had to allocate compute capacity upfront, even for workloads with intermittent or variable resource needs, leading to wasted infrastructure spend. Job management was inconsistent, with custom logic built into each workflow to handle logging, monitoring, and cleanup, creating maintenance burden and reducing reliability. Perhaps most problematically, development and production jobs used entirely different workflows and infrastructure, making it difficult to promote code from experimentation to production and creating potential for environment-specific bugs.

The challenge intensified as Klaviyo scaled to a four-cluster Kubernetes architecture. Without proper tooling, API requests would be distributed randomly across clusters, meaning follow-up actions like stopping or inspecting a job would only have a one-in-four chance of reaching the cluster that actually owned the job. This necessitated a coordination mechanism that could maintain consistency across distributed infrastructure while keeping the user interface simple and reliable.

## Architecture & Design

DART Jobs implements a layered architecture with clear separation of concerns across three primary components: the API server, a central database, and the sync service. This design cleanly decouples user interaction from infrastructure orchestration, enabling horizontal scaling and fault tolerance.

The **DART Jobs API Server** is built with FastAPI and provides a concise set of REST endpoints for job submission, querying, and control. The API layer remains stateless and predictable, handling only validation, persistence, and metric emission. When a user submits a job, the API server validates the payload, records the job definition in the database, and emits metrics for submission volume, latency, and error tracking. Each route is namespace-scoped to enforce workload separation between development and production environments, ensuring requests only affect resources within the intended context.

The **central MySQL database** serves as the single source of truth for all job definitions and states. This architectural decision deliberately makes the database, not Kubernetes, the authoritative record. Each job record captures comprehensive information including the unique job ID, the complete user specification, and dual-state tracking through `resource_state` (for the infrastructure supporting the RayJob) and `job_state` (for the RayJob execution itself). This database-centric approach separates concerns: the API server is responsible only for validating requests and writing records, while the sync service reads those records, observes the real state in Kubernetes, and writes state updates back.

The **DART Jobs Sync Service** runs within each Kubernetes cluster and performs the actual orchestration. Each cluster operates its own sync service instance that continuously reads the database for updates relevant to jobs in its environment. When a user submits or modifies a job, the API server writes the change to the database, and the appropriate sync service detects it and performs the action locally. This design decouples coordination from execution—the database provides the blueprint while each cluster reconciles its own jobs independently.

The sync service operates through a continuous reconciliation loop that wakes every few hundred milliseconds. Each cycle follows a precise sequence: query all active jobs from the database for the assigned cluster, observe the real-time status of pods and resources in Kubernetes, reconcile desired state from the database with observed state from Kubernetes using state machine logic, atomically write the new state and updated resource specs back to the database, then repeat. This reconciliation pattern ensures eventual consistency while allowing the system to recover gracefully from transient failures.

The sync service manages interactions with several subcomponents. The **state machine** processes the current job state and proposes valid next states based on observations. Custom **Kubernetes API clients** handle resource creation, inspection, and deletion, with specialized clients for RayJobs, RayClusters, and SecurityGroupPolicies. The **Ray API client** communicates directly with Ray cluster dashboard services to gracefully stop running jobs via HTTP requests, since Kubernetes can only tear down infrastructure but cannot instruct Ray to cleanly shut down workloads.

## Technical Implementation

At the core of DART Jobs is Ray, an open-source framework for scaling Python and AI applications. Ray was selected for several technical reasons: its Pythonic API makes it simple to parallelize existing code with minimal changes, turning local functions into distributed ones; unified resource management that handles allocation automatically and scales from laptops to multi-node cloud clusters; support for diverse AI/ML workloads including data processing, model training, hyperparameter tuning, and serving while remaining general-purpose; and built-in resilience that abstracts distributed computing complexity like networking, scheduling, and fault tolerance.

When a job is submitted to DART Jobs, an auto-scaling Ray cluster is automatically provisioned on customizable Kubernetes resources, and a Ray job is submitted on top. This provides consistency regardless of whether the job is invoked from local development or production, and whether it's for research or production use—the code runs on an isolated, remote cluster with appropriate resource access.

The Python client for DART Jobs uses Pydantic models to define all input and output schemas, ensuring type safety and validation. When a job is submitted, the client automatically determines the runtime environment (development or production), captures user context for resource attribution and filtering, validates inputs and resolves defaults, packages and uploads local code to S3 for accessibility to all Ray workers, and communicates with the API server with retries and structured error handling.

For rapid local iteration, Klaviyo integrates DART Jobs with klaviyocli, a command-line tool that wraps the Python client. Developers can submit jobs, monitor progress, stop jobs, and view historical runs directly from the terminal. Klaviyocli adds conveniences like verifying VPN connectivity and ensuring AWS authentication before delegating execution to the underlying Python client.

Resource isolation is implemented through dedicated node pools, with strict separation between development and production environments. Jobs submitted from local development are automatically placed in a separate namespace from production jobs, ensuring experimentation cannot interfere with live workloads or access production infrastructure. This isolation is critical for large, compute-intensive jobs from data scientists, preventing them from consuming cluster resources used by customer-facing services.

The state machine implementation follows a directed acyclic graph (DAG) model where each state explicitly defines valid forward transitions. Jobs progress through combinations of `resource_state` and `job_state`, with the state machine enforcing that only legal combinations exist. For example, a job at (`READY`, `RUNNING`) can transition forward but never backward to states like `SUCCEEDED` reverting to `WAITING`. The validation accepts any future state rather than just immediate neighbors, making the system robust to fast-moving jobs or sync service delays.

Specific state implementations encapsulate complex logic into focused components. The `CREATING_WAITING` state ensures all infrastructure dependencies are ready before expensive compute work begins, checking and creating SecurityGroupPolicies for network access and waiting for health confirmation before proceeding to create the RayJob. The `TERMINATING_STOPPING` state handles cleanup by gracefully stopping the RayJob, then systematically deleting the RayCluster and associated resources to prevent orphaned infrastructure.

A three-tier timeout system provides safety nets against stuck jobs. The global job timeout tracks total elapsed time since creation and forces termination if exceeded (e.g., 24 hours). State-specific timeouts allow granular control, with different durations for states like `CREATING_WAITING` (60 seconds to detect stuck resource creation) versus `TERMINATING_STOPPING` (10 minutes for slow cleanup). Resource TTL determines how long completed job clusters remain available for debugging before cleanup.

Concurrency control uses a two-layer locking system. Standard database transactions with exclusive row-level locks (pessimistic locking) ensure consistency for database interactions. Since state processing can take considerable time (e.g., provisioning Kubernetes resources), optimistic locking verifies records haven't changed during operation by comparing against initial state before committing updates.

The Kubernetes client hierarchy includes specialized components: `KubernetesRayJobClient` manages RayJob lifecycle, `KubernetesRayClusterClient` orchestrates cluster operations, and `SecurityGroupAssignmentClient` handles network isolation. Each exposes simple interfaces like `create()`, `get()`, and `delete()`, translating messy infrastructure information into actionable data for the state machine—for example, distinguishing between a pod that's Pending because it's initializing versus stuck with an ImagePullBackOff error.

## Scale & Performance

DART Jobs operates across Klaviyo's four-cluster Kubernetes architecture, with network load balancing distributing traffic for improved reliability and capacity. Each cluster runs its own sync service instance that processes jobs every few hundred milliseconds, enabling rapid response to state changes while maintaining system stability.

The platform handles workloads ranging from local experiments to production pipelines, running model training and retraining, batch inference, forecasting models supporting production systems, data processing workflows requiring reproducibility, and exploratory experiments where flexibility matters most. The system's design allows independent scaling of development and production environments, ensuring large research jobs never impact customer-facing performance.

While specific throughput numbers aren't provided in the source, the architecture's sync service loop timing (hundreds of milliseconds per reconciliation cycle) indicates the system can detect and respond to state changes rapidly. The multi-cluster setup with independent sync services enables horizontal scaling without cross-cluster complexity.

Job lifecycle management includes automatic provisioning of auto-scaling Ray clusters with customizable Kubernetes resources. Teams can choose CPU/GPU mixes appropriate for their workloads, and clusters scale on demand rather than requiring pre-allocated capacity. This on-demand model addresses the original pain point of wasted resources from upfront allocation.

The system maintains comprehensive logging and monitoring through metrics emitted at the API layer for submission volume, latency, and errors. State transitions are tracked in the database, providing audit trails and debugging capability. Completed jobs have their resources preserved for a configurable TTL period, allowing post-mortem analysis before cleanup.

## Trade-offs & Lessons

The decision to use the database as the source of truth rather than Kubernetes represents a fundamental architectural choice with clear trade-offs. This approach provides consistency across the distributed system and enables the decoupling of coordination from execution, but it introduces database dependency as a potential bottleneck or failure point. The team addressed this through careful transaction design and the two-layer locking mechanism to prevent race conditions between the API server and sync services.

The reconciliation loop pattern, polling every few hundred milliseconds, trades some immediacy for simplicity and reliability. Event-driven architectures might respond faster to state changes, but the polling approach avoids complexity around event delivery guarantees and makes the system easier to reason about and debug. The hundreds-of-milliseconds cadence provides acceptable responsiveness while keeping sync service overhead manageable.

Choosing REST over alternatives like gRPC reflects prioritization of simplicity and ecosystem fit. REST provides clear contracts, built-in OpenAPI documentation, straightforward observability, and natural integration with Klaviyo's existing HTTP-based infrastructure. While gRPC might offer performance advantages for high-frequency interactions, the request patterns for job submission and management don't require sub-millisecond latencies.

The state machine implementation as a directed acyclic graph with forward-only transitions provides strong guarantees about job lifecycle progression. This prevents impossible state combinations and makes debugging easier, but it requires careful upfront design of the state space. The team addressed edge cases like sync service downtime by accepting any future state rather than only immediate neighbors, allowing jobs to skip intermediate states if they progress while the sync service is unavailable.

Resource isolation through dedicated node pools and namespace separation comes with infrastructure overhead—maintaining separate capacity for development and production reduces overall cluster efficiency compared to shared resource pools. However, this trade-off is clearly worthwhile for preventing experimentation from impacting customer-facing workloads and maintaining production reliability guarantees.

The three-tier timeout system (global, state-specific, resource TTL) demonstrates sophisticated thinking about failure modes in distributed systems. Jobs can get stuck for multiple reasons—pod scheduling failures, network partitions, hung initializations—and having multiple timeout layers ensures no job remains in limbo indefinitely. The different timeout durations for different states show attention to the actual time requirements of various operations, avoiding both premature termination and indefinite hangs.

Building custom Kubernetes and Ray API clients rather than using raw APIs directly adds abstraction but provides crucial translation between infrastructure reality and state machine logic. These clients hide complexity like distinguishing different pod Pending states and expose clean interfaces that make state transition logic easier to implement and test.

The integration with klaviyocli for local development represents thoughtful developer experience design. Providing both a Python client library for programmatic use and a CLI wrapper for interactive development reduces friction for different workflows. The CLI's verification of VPN connectivity and AWS authentication prevents common failure modes that would otherwise surface as confusing errors deeper in the job submission flow.

The consistency between development and production execution—using the same client, same infrastructure patterns, and same remote cluster execution—directly addresses one of the original pain points. This dramatically simplifies promotion from experiment to production, eliminating entire classes of environment-specific bugs. The trade-off is that even simple local experiments run on remote infrastructure, which has cost implications, but the operational benefits clearly outweigh this for Klaviyo's use cases.

The platform's proven versatility across model training, batch inference, forecasting, data processing, and exploratory experiments demonstrates that the general-purpose design goal was achieved. Rather than building specialized systems for different ML workload types, DART Jobs provides a unified interface that handles the common infrastructure concerns while remaining flexible enough for diverse use cases.

Ray Serve is mentioned as a separate system at Klaviyo for model serving, indicating a conscious decision to separate batch/training workloads (DART Jobs) from online inference (Ray Serve). This separation allows each system to optimize for its specific requirements—DART Jobs for on-demand distributed compute with job-oriented lifecycle management, Ray Serve for low-latency, high-throughput inference. Both build on Ray as a common foundation, showing how the framework can support multiple specialized platforms within an organization.
