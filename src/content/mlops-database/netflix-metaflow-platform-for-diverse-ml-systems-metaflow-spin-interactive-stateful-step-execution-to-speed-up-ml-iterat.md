---
title: "Metaflow Spin: Interactive, stateful step execution to speed up ML iteration cycles"
slug: "netflix-metaflow-platform-for-diverse-ml-systems-metaflow-spin-interactive-stateful-step-execution-to-speed-up-ml-iterat"
draft: false
mlopsTags:
  - "data-versioning"
  - "experiment-tracking"
  - "metadata-store"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "argo"
  - "docker"
  - "kubernetes"
  - "metaflow"
  - "sagemaker"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "training"
industryTags: "media-entertainment"
company: "Netflix"
companySlug: "netflix"
platformName: "Metaflow + “platform for diverse ML systems”"
contentType: "blog"
summary: "Netflix introduced Metaflow Spin, a new development feature in Metaflow 2.19 that addresses the challenge of slow iterative development cycles in ML and AI workflows. ML development revolves around data and models that are computationally expensive to process, creating long iteration loops that hamper productivity. Spin enables developers to execute individual Metaflow steps instantly without tracking or versioning overhead, similar to running a single notebook cell, while maintaining access to state from previous steps. This approach combines the fast, interactive development experience of notebooks with Metaflow's production-ready workflow orchestration, allowing teams to iterate rapidly during development and seamlessly deploy to production orchestrators like Maestro, Argo, or Kubernetes with full scaling capabilities."
link: "https://netflixtechblog.com/supercharging-the-ml-and-ai-development-experience-at-netflix-b2d5b95c63eb"
year: 2025
seo:
  title: "Netflix: Metaflow Spin: Interactive, stateful step execution to speed up ML iteration cycles - ZenML MLOps Database"
  description: "Netflix introduced Metaflow Spin, a new development feature in Metaflow 2.19 that addresses the challenge of slow iterative development cycles in ML and AI workflows. ML development revolves around data and models that are computationally expensive to process, creating long iteration loops that hamper productivity. Spin enables developers to execute individual Metaflow steps instantly without tracking or versioning overhead, similar to running a single notebook cell, while maintaining access to state from previous steps. This approach combines the fast, interactive development experience of notebooks with Metaflow's production-ready workflow orchestration, allowing teams to iterate rapidly during development and seamlessly deploy to production orchestrators like Maestro, Argo, or Kubernetes with full scaling capabilities."
  canonical: "https://www.zenml.io/mlops-database/netflix-metaflow-platform-for-diverse-ml-systems-metaflow-spin-interactive-stateful-step-execution-to-speed-up-ml-iterat"
  ogTitle: "Netflix: Metaflow Spin: Interactive, stateful step execution to speed up ML iteration cycles - ZenML MLOps Database"
  ogDescription: "Netflix introduced Metaflow Spin, a new development feature in Metaflow 2.19 that addresses the challenge of slow iterative development cycles in ML and AI workflows. ML development revolves around data and models that are computationally expensive to process, creating long iteration loops that hamper productivity. Spin enables developers to execute individual Metaflow steps instantly without tracking or versioning overhead, similar to running a single notebook cell, while maintaining access to state from previous steps. This approach combines the fast, interactive development experience of notebooks with Metaflow's production-ready workflow orchestration, allowing teams to iterate rapidly during development and seamlessly deploy to production orchestrators like Maestro, Argo, or Kubernetes with full scaling capabilities."
mlops:
  source: "sqlite"
  entryId: 170
  sourceUrl: "https://netflixtechblog.com/supercharging-the-ml-and-ai-development-experience-at-netflix-b2d5b95c63eb"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.616583"
  lastUpdated: "2026-04-14T19:55:38.731349"
---

## Problem Context

Netflix identified fundamental friction in the ML and AI development workflow that distinguishes it from traditional software engineering. ML development revolves not just around code but around data and models, which are large, mutable, and computationally expensive to process. Iteration cycles involve long-running data transformations, model training, and stochastic processes that yield slightly different results from run to run. These characteristics make fast, stateful iteration critical to productive development.

The challenge Netflix faced was that while Metaflow's existing `resume` command allowed restarting execution from a selected step, it still restarted execution from that point onward, introducing latency between iterations. In contrast, notebooks like Jupyter allow near-instant feedback by letting users tweak and rerun individual cells while seamlessly reusing data from earlier cells held in memory. However, notebooks have their own problems: execution order can be non-deterministic due to out-of-order cell execution, state can be hidden and difficult to inspect, and results are harder to reproduce since state isn't automatically versioned and persisted.

Because ML and AI development is computationally intensive, stochastic, and data- and model-centric, tools that optimize iteration speed must treat state management as a first-class design concern. Any system aiming to improve the development experience must enable quick, incremental experimentation without losing continuity between iterations. This was the gap that motivated building Spin.

## Architecture & Design

Metaflow operates on a fundamental architectural principle: each `@step` serves as a checkpoint boundary. At the end of every step, Metaflow automatically persists all instance variables as artifacts, allowing execution to resume seamlessly from that point onward. This design can be understood through three complementary execution modes that form the core of Metaflow's architecture:

**Run mode** executes the entire flow from start to finish, creating a full versioned run with complete metadata and artifacts. This is analogous to running all cells in a notebook from top to bottom.

**Resume mode** restarts execution from a selected step onward, allowing developers to skip already-completed work when iterating. It still creates a full versioned run with metadata tracking. This is similar to running cells from a specific point downward in a notebook.

**Spin mode** (the new feature) quickly executes a single Metaflow step with all state carried over from the parent step, but skips tracking altogether. It's built for fast, throw-away iterations during development. This maps directly to executing a single notebook cell while reusing data from earlier cells held in memory.

The key architectural insight is that a `@step` can be viewed as similar to a notebook cell - it's the smallest unit of execution that updates state upon completion. However, it addresses notebook limitations through explicit design choices: execution order is explicit and deterministic, state is not hidden but explicitly stored as `self.` variables that can be discovered and inspected, and state is versioned and persisted for reproducibility.

Spin operates by executing a single step without creating metadata tracking overhead. By default, it doesn't persist artifacts, but users can add `--persist` to save results to a directory-specific location that can be easily cleaned up after testing. Results can be accessed through the Client API using `inspect_spin(".")` to examine the local directory.

The architecture integrates with the broader Metaflow ecosystem. The solid architecture shows Spin positioned as the innermost loop of model and business-logic development, complementing other Metaflow commands and features including configuration management and custom decorators. All these capabilities integrate seamlessly, following Metaflow's design philosophy of composability.

## Technical Implementation

Metaflow Spin was released in Metaflow 2.19 and can be installed simply via `pip install metaflow`. The implementation builds on Metaflow's existing artifact persistence system but adds a lightweight execution path that bypasses the normal metadata tracking and versioning overhead.

**Command-line interface**: The basic usage involves running `python flow.py spin <step_name>` to execute a specific step. For integration with production orchestrators, users can add environment specifications like `python flow.py --environment=pypi spin <step_name>`.

**IDE integration**: Netflix developed a simple metaflow-dev VS Code extension (compatible with Cursor) that maps keyboard shortcuts to commands - `Ctrl+Opt+R` for run and `Ctrl+Opt+S` for spin. The extension automatically saves the file and spins the step currently being edited, creating a seamless development experience.

**Artifact injection and control**: Spin supports advanced patterns through artifact manipulation. Users can override artifact values or inject arbitrary Python objects by specifying a Python module with an `ARTIFACTS` dictionary. For example:

```python
ARTIFACTS = {
    "model": "kmeans",
    "k": 15
}
```

Then pointing spin at the module: `spin train --artifacts-module artifacts.py`. This enables testing steps with different inputs without rerunning upstream steps.

**Programmatic API**: Spin can be used programmatically through the Runner API for automated testing:

```python
from metaflow import Runner
with Runner("flow.py").spin("train", persist=True) as spin:
    assert spin.task["model"].data == "kmeans"
```

**Visualization integration**: Spin integrates tightly with Metaflow Cards for creating dashboards and reports. The combination of Spin, Cards, and VSCode's built-in web view with the local card viewer enables rapid iteration on visual outputs. Developers can tweak visualization code and see results instantly without deploying separate services, databases, or data streams for observability.

**Production deployment**: Once flows are developed locally with Spin, they deploy seamlessly to production orchestrators including Maestro (Netflix's newly open-sourced workflow orchestrator that powers nearly every ML and AI system at Netflix), Argo Workflows, and can scale up on compute platforms such as AWS Batch, Titus (Netflix's container platform), and Kubernetes.

The technical implementation leverages Metaflow's existing infrastructure while adding a streamlined execution path. Maestro serves as the backbone orchestrator for Metaflow itself, handling production workloads at Netflix scale.

## Scale & Performance

While the blog post doesn't provide specific quantitative benchmarks for Spin's performance improvements, the architectural approach demonstrates clear performance advantages. By eliminating metadata tracking and versioning overhead, Spin provides near-instant execution of individual steps compared to the full run/resume cycle.

The blog post emphasizes that Metaflow with Maestro already powers "nearly every ML and AI system at Netflix," indicating enterprise-scale deployment across a major streaming platform serving hundreds of millions of subscribers globally. The fact that Maestro is described as "100x faster" in related posts (referenced in the content) suggests the underlying orchestration infrastructure operates at significant scale.

The performance advantage of Spin becomes most apparent in iterative workflows involving:

- Long-running data transformations that would be expensive to rerun
- Model training steps that can take significant compute time
- Stochastic processes where slight variations between runs are expected
- Large dataset loading operations that benefit from being loaded once and reused

The video demonstrations show near-instant feedback loops when using Spin to iterate on data preprocessing, model training, and visualization steps. This represents a substantial improvement over traditional run/resume cycles that would re-execute multiple steps and create full metadata artifacts.

The integration with AI coding agents like Claude Code demonstrates another performance dimension - agents can surface errors faster and fix them more quickly by testing individual steps in isolation rather than running entire workflows.

## Trade-offs & Lessons

**What worked well:**

Netflix's design philosophy around Spin reflects several successful architectural decisions. The conceptual mapping between Metaflow steps and notebook cells proved intuitive for ML practitioners while addressing notebook limitations. By making execution order explicit and deterministic, state visible through `self.` variables, and state versioned and persisted, Metaflow maintains notebook-like iteration speed while eliminating common notebook pitfalls like hidden state and out-of-order execution bugs.

The three-mode execution model (run, resume, spin) provides appropriate tools for different development phases. Developers can use Spin for rapid inner-loop iteration, Resume for mid-cycle refinement, and Run for final validation and production deployment. This graduated approach lets projects start small and simple, adding complexity only when necessary - a key Metaflow design philosophy.

The integration with IDE tooling through simple keyboard shortcuts dramatically reduces friction. Rather than context-switching to terminals and typing commands, developers can iterate with a single keystroke. The combination of VSCode/Cursor, the local card viewer, and Spin proved particularly powerful for developing visualizations and dashboards.

The artifact injection capability unlocks powerful testing patterns. Being able to override inputs or inject arbitrary Python objects makes unit testing individual steps straightforward, enabling quality assurance practices that are often difficult in notebook-based workflows.

**Key insights and lessons:**

Netflix emphasizes that there's no single magic feature that makes rapid ML development possible - it takes all parts of an ML/AI platform working together coherently. Spin is positioned explicitly as one component in a broader toolchain that includes configuration management, custom decorators, and integration with production orchestrators.

The composability principle proved critical. All Metaflow features integrate seamlessly with Spin, allowing domain-specific teams and platform providers to tailor workflows to their use cases while maintaining the rapid iteration benefits.

The design decision to skip tracking in Spin by default represents an important trade-off. While this eliminates overhead during development, users must be mindful about when to switch to Run or Resume to create versioned artifacts. However, the `--persist` option provides a middle ground for cases where temporary artifact inspection is needed.

**AI agent integration insights:**

An unexpected benefit emerged around AI coding agents. Teaching agents to use Spin accelerates their development loops and helps surface errors faster with better context. The blog notes that agents don't naturally understand what's slow or why speed matters, so they need explicit guidance to favor faster tools. A simple `CLAUDE.md` file with workflow instructions enabled Claude Code to effectively use Spin, even handling complex debugging scenarios like fixing undersampling issues in stratified data splits.

**Production readiness:**

A major lesson is that the development experience can remain notebook-like while producing production-ready, scalable workflows implemented as idiomatic Python projects. This bridges the notorious "notebook-to-production" gap that plagues many ML organizations. Teams can develop locally with Spin's instant feedback, then deploy the exact same code to production orchestrators with full scaling capabilities on platforms like AWS Batch or Kubernetes.

The integration with Metaflow Cards demonstrates that observability and reporting don't require separate infrastructure. Visual outputs developed during iteration automatically carry through to production, eliminating the need to deploy extra services, data streams, and databases.

**Community and ecosystem:**

Netflix's decision to open-source Metaflow in 2019 and continue investing in developer experience features like Spin has built a thriving ecosystem. The framework is adopted by many companies beyond Netflix, and the partnership with Outerbounds for feature development shows a mature open-source collaboration model. The friendly Metaflow Community Slack provides support channels that lower adoption barriers.
