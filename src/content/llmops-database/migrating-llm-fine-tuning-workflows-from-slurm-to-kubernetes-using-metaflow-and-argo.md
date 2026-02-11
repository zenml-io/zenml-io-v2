---
title: "Migrating LLM Fine-tuning Workflows from Slurm to Kubernetes Using Metaflow and Argo"
slug: "migrating-llm-fine-tuning-workflows-from-slurm-to-kubernetes-using-metaflow-and-argo"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67929fd4ab50fc6ac98f2534"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:56:54.320Z"
  createdOn: "2025-01-23T20:00:20.802Z"
llmopsTags:
  - "high-stakes-application"
  - "code-interpretation"
  - "unstructured-data"
  - "fine-tuning"
  - "model-optimization"
  - "latency-optimization"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "cicd"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "fastapi"
  - "anthropic"
  - "microsoft-azure"
industryTags: "tech"
company: "Adept.ai"
summary: "Adept.ai, building an AI model for computer interaction, faced challenges with complex fine-tuning pipelines running on Slurm. They implemented a migration strategy to Kubernetes using Metaflow and Argo for workflow orchestration, while maintaining existing Slurm workloads through a hybrid approach. This allowed them to improve pipeline management, enable self-service capabilities for data scientists, and establish robust monitoring infrastructure, though complete migration to Kubernetes remains a work in progress."
link: "https://www.youtube.com/watch?v=zFarTo1nVfg"
year: 2023
seo:
  title: "Adept.ai: Migrating LLM Fine-tuning Workflows from Slurm to Kubernetes Using Metaflow and Argo - ZenML LLMOps Database"
  description: "Adept.ai, building an AI model for computer interaction, faced challenges with complex fine-tuning pipelines running on Slurm. They implemented a migration strategy to Kubernetes using Metaflow and Argo for workflow orchestration, while maintaining existing Slurm workloads through a hybrid approach. This allowed them to improve pipeline management, enable self-service capabilities for data scientists, and establish robust monitoring infrastructure, though complete migration to Kubernetes remains a work in progress."
  canonical: "https://www.zenml.io/llmops-database/migrating-llm-fine-tuning-workflows-from-slurm-to-kubernetes-using-metaflow-and-argo"
  ogTitle: "Adept.ai: Migrating LLM Fine-tuning Workflows from Slurm to Kubernetes Using Metaflow and Argo - ZenML LLMOps Database"
  ogDescription: "Adept.ai, building an AI model for computer interaction, faced challenges with complex fine-tuning pipelines running on Slurm. They implemented a migration strategy to Kubernetes using Metaflow and Argo for workflow orchestration, while maintaining existing Slurm workloads through a hybrid approach. This allowed them to improve pipeline management, enable self-service capabilities for data scientists, and establish robust monitoring infrastructure, though complete migration to Kubernetes remains a work in progress."
---

## Overview

Adept.ai is a company building machine learning models that can interact with everything on a user's computer—essentially creating AI agents capable of operating browsers, filling out spreadsheets, and performing complex computer-based tasks on behalf of users. This case study, presented by Rahul from Adept's infrastructure team, details how the company migrated their LLM fine-tuning and training pipelines from a Slurm-based system to a more modern orchestration approach using Metaflow with Argo Workflows on Kubernetes.

The presentation provides valuable insights into the real-world challenges of managing large-scale LLM training infrastructure, particularly around the tension between maintaining velocity for data scientists while modernizing the underlying infrastructure. It's worth noting that this is an ongoing migration rather than a completed project, which offers an honest look at the iterative nature of such infrastructure transitions.

## The Problem: Complex and Fragmented Training Infrastructure

Adept.ai started with Slurm as their training and fine-tuning infrastructure, which is a natural choice given Slurm's long history in high-performance computing (HPC) environments. Slurm is an open-source, fault-tolerant, and highly scalable cluster management and job scheduling system that predates modern AI workloads but fits them reasonably well. Cloud vendors typically offer either Slurm or Kubernetes clusters when providing large-scale GPU infrastructure (the presenter mentions scenarios with 200-300 nodes, each with 8 GPUs).

However, as the team grew and different people joined at different times, the codebase became increasingly complex:

- There were multiple entry points for different workflows (training, fine-tuning, nightly jobs)
- Config files were scattered across multiple locations with inconsistent loading patterns
- Some workflows had their own unique config structures and execution paths
- New team members faced a steep learning curve to understand the system
- The code had grown organically with different conventions from different contributors

An illustrative example from the presentation: one workflow might load a config with hyperparameters and call `slearn as batch`, while another workflow for nightly fine-tuning and evaluation had its own config, conditional logic for checking if nightly runs succeeded before triggering evaluation, and coordination with annotation partners for evaluation—all executed differently.

## The Solution: Metaflow + Argo on Kubernetes

The team investigated several workflow orchestration alternatives and ultimately chose Metaflow with Argo Workflows on Kubernetes for several key reasons:

- **Argo's Robustness**: Metaflow's integration with Argo Workflows was appealing because Argo is a battle-tested, Kubernetes-native workflow orchestration system. The alternative they considered had its own custom orchestration, which they were less comfortable with from a design and reliability perspective.
- **Developer Experience**: While most alternatives offered similar feature parity for Python-based pipeline creation and UI-based management, the team favored Metaflow's approach.
- **Kubernetes Standardization**: Many developers on the team were more familiar with Kubernetes than Slurm, and there are significantly more online resources and community support for Kubernetes-based tooling.

The team's goals extended beyond just workflow orchestration—they also wanted to support Dev boxes, CI/CD, and eventually gang-scheduled training directly on Kubernetes, making this a holistic containerization initiative.

## Implementation Challenges

The migration was not straightforward, and the presenter candidly discusses several challenges that took months to resolve:

### Challenge 1: Untangling Complex Code

The existing code was tightly coupled with specific config file locations and loading patterns. The team spent several sprints refactoring the code to identify logical steps that could be mapped to Metaflow's step-based workflow approach. They also had to ensure consistent config loading once Metaflow containerized the Python files and associated code. Python path and environment variable manipulation were required to help Metaflow's containerized code find the correct resources.

### Challenge 2: Maintaining Backward Compatibility with Slurm

A pragmatic decision was made to implement a hybrid approach rather than forcing a complete migration. The Metaflow flows serve as the orchestration layer, but each step SSHs into a bastion node on the Slurm cluster and runs the actual `srun` command for execution. This allows data scientists to continue working without interruption while the infrastructure team progressively migrates workloads to run natively on Kubernetes.

This hybrid approach is explicitly described as a "stop-gap measure"—the ultimate goal remains running fully containerized workloads on Kubernetes. This honest acknowledgment of technical debt and incremental migration is a valuable lesson for other teams facing similar challenges.

### Challenge 3: Containerization with Large Repositories

The code repository had grown to approximately 1 GB due to historical use of Git LFS for storing model versions and data. This made containerization slow and cumbersome, especially when data scientists wanted to run fine-tuning jobs on their local code changes (requiring commit, container build, and execution at that commit hash).

The team addressed this by:
- Removing data and dead code from the repository
- Implementing a GitOps approach where every commit triggers a container build
- Building containers on top of PyTorch/NVIDIA base images with all required dependencies
- Managing their own containerization rather than relying entirely on Metaflow's packaging system, due to legacy code constraints and the need to support multiple use cases (workflows, Dev boxes, CI/CD, training with gang scheduling)

### Challenge 4: Multi-User Access and Discoverability

To make the system accessible to multiple users, the team:
- Used Metaflow's decorator system to connect flows together
- Leveraged the Metaflow UI for job monitoring
- Created an internal Adept CLI that abstracts Metaflow commands and provides links to the underlying Slurm job logs (important during the hybrid phase)

## Production Workflows in Use

The presentation showcases several production workflows that demonstrate the practical application of this infrastructure:

### Fine-Tune and Eval Workflow

This is a primary use case where the DAG-based approach of Metaflow shines. The workflow:
- Sets up systems and loads configs
- Runs fine-tuning jobs (potentially taking 1-3 hours via sbatch commands)
- Freezes the model for evaluation
- Runs multiple parallel evaluation steps against different action types (reflecting different capabilities of the Adept agent—clicking, typing, navigating, etc.)
- Each step sends Slack notifications with status updates
- Provides links to experiment management platforms showing fine-tuning loss curves
- Joins results and reports them

This seemingly simple DAG masks significant complexity in providing observability to data scientists.

### Cron Jobs and Nightly Workflows

The system supports various scheduled jobs:
- Nightly fine-tuning and evaluation runs
- Nightly training jobs that spin up 32-node (240 GPU) training runs
- Different evaluation tasks for various interaction types

### Power User Patterns

Some data scientists discovered they could trigger new workflows programmatically from within their code. For example, when a training job completes, it can automatically launch an evaluation job by making requests to trigger Metaflow commands. This emergent use pattern demonstrates the flexibility of the system.

### CI/CD Integration

The team implemented CI/CD through CircleCI that:
- Checks out code and sets up Docker
- Builds containers (the "magic step" that creates deployment-ready images)
- On merge to main, deploys updated nightly workflows
- Uses `metaflow argo workflows create` to automatically update workflow definitions

This automation ensures that workflow updates are deployed consistently without manual intervention.

### Infrastructure Monitoring

Even while still on Slurm, the team uses Metaflow to orchestrate monitoring tasks:
- Tracking all running Slurm jobs
- Detecting long-running or zombie jobs
- Monitoring workflow completion status
- Running housekeeping tasks like cleaning up old completed workflows

## Results and Current State

The wins from this migration include:
- **Self-serve fine-tuning**: Users can launch fine-tuning jobs independently
- **Robust orchestration**: Argo Workflows provides battle-tested Kubernetes-native workflow execution
- **Automated infrastructure management**: Monitoring and housekeeping run as scheduled workflows
- **Nightly automation**: Regular training and evaluation runs happen without manual intervention

The work still in progress includes:
- Moving workloads to run directly on Kubernetes (not just orchestrating Slurm jobs)
- Full containerized fine-tuning and training on Kubernetes remains a challenge due to container sizes
- Expanding CI/CD for more automatic workflow recreation on code changes

## Desired Features and Future Work

The presenter mentions several features that would improve their setup:
- **Exception handling at the step level**: Currently exception handling exists at the job/workflow level, but step-level granularity would be useful
- **Queue management for flows**: When resources aren't available (e.g., requesting 32 nodes when fewer are available), jobs currently crash rather than queue
- **Dynamic workflow creation**: The ability to have one workflow programmatically create and launch another workflow with parameters

## Key Takeaways for LLMOps Practitioners

This case study offers several lessons for teams building LLM training infrastructure:

- **Hybrid approaches are valid**: Rather than forcing a complete migration, maintaining backward compatibility with existing systems while progressively moving to new infrastructure can maintain team velocity.
- **Containerization complexity is real**: Large ML codebases with historical artifacts require significant cleanup before containerization becomes practical.
- **GitOps for ML**: Building containers on every commit and managing workflow definitions through CI/CD brings software engineering best practices to ML infrastructure.
- **Observability matters**: Even with sophisticated orchestration, teams need Slack notifications, links to experiment tracking, and clear visibility into what's happening in underlying systems.
- **Infrastructure teams enable data science velocity**: The explicit goal of this work was increasing the velocity of data scientists building models, not just modernizing infrastructure for its own sake.

The honest discussion of challenges, compromises, and work in progress makes this a particularly valuable case study for teams considering similar migrations.