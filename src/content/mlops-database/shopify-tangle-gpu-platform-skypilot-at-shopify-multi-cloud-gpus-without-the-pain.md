---
title: "SkyPilot at Shopify: Multi-cloud GPUs without the pain"
slug: "shopify-tangle-gpu-platform-skypilot-at-shopify-multi-cloud-gpus-without-the-pain"
draft: false
mlopsTags:
  - "compute-management"
  - "metadata-store"
  - "pipeline-orchestration"
  - "kubeflow"
  - "kubernetes"
  - "terraform"
  - "hyperparameter-tuning"
  - "training"
industryTags: "e-commerce"
company: "Shopify"
companySlug: "shopify"
platformName: "Tangle / GPU Platform"
contentType: "blog"
summary: "Shopify built a multi-cloud GPU training platform using SkyPilot, an open-source framework that abstracts away cloud complexity while keeping engineers close to the infrastructure. The platform routes training workloads across multiple clouds—Nebius for H200 GPUs with InfiniBand interconnect and GCP for L4s and CPU workloads—using a custom policy plugin that handles automatic routing, cost tracking, fair scheduling via Kueue, and infrastructure injection. Engineers write a single YAML file specifying their resource needs, and the system automatically determines optimal placement, injects cloud-specific configurations like InfiniBand settings, manages shared caches for models and packages, and enforces organizational policies around quotas and cost attribution, enabling hundreds of ML training jobs without requiring cloud-specific expertise."
link: "https://shopify.engineering/skypilot"
year: 2026
seo:
  title: "Shopify: SkyPilot at Shopify: Multi-cloud GPUs without the pain - ZenML MLOps Database"
  description: "Shopify built a multi-cloud GPU training platform using SkyPilot, an open-source framework that abstracts away cloud complexity while keeping engineers close to the infrastructure. The platform routes training workloads across multiple clouds—Nebius for H200 GPUs with InfiniBand interconnect and GCP for L4s and CPU workloads—using a custom policy plugin that handles automatic routing, cost tracking, fair scheduling via Kueue, and infrastructure injection. Engineers write a single YAML file specifying their resource needs, and the system automatically determines optimal placement, injects cloud-specific configurations like InfiniBand settings, manages shared caches for models and packages, and enforces organizational policies around quotas and cost attribution, enabling hundreds of ML training jobs without requiring cloud-specific expertise."
  canonical: "https://www.zenml.io/mlops-database/shopify-tangle-gpu-platform-skypilot-at-shopify-multi-cloud-gpus-without-the-pain"
  ogTitle: "Shopify: SkyPilot at Shopify: Multi-cloud GPUs without the pain - ZenML MLOps Database"
  ogDescription: "Shopify built a multi-cloud GPU training platform using SkyPilot, an open-source framework that abstracts away cloud complexity while keeping engineers close to the infrastructure. The platform routes training workloads across multiple clouds—Nebius for H200 GPUs with InfiniBand interconnect and GCP for L4s and CPU workloads—using a custom policy plugin that handles automatic routing, cost tracking, fair scheduling via Kueue, and infrastructure injection. Engineers write a single YAML file specifying their resource needs, and the system automatically determines optimal placement, injects cloud-specific configurations like InfiniBand settings, manages shared caches for models and packages, and enforces organizational policies around quotas and cost attribution, enabling hundreds of ML training jobs without requiring cloud-specific expertise."
mlops:
  source: "sqlite"
  entryId: 209
  sourceUrl: "https://shopify.engineering/skypilot"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.618076"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Running machine learning workloads at scale requires dealing with GPU availability challenges that have become increasingly complex in modern cloud environments. Shopify faces several interconnected pain points in their ML infrastructure. GPUs are scarce resources, fragmented across multiple cloud providers, with each provider offering different GPU types (H200s, L4s) through distinct APIs and configuration systems. Engineers training models shouldn't need to become experts in three different cloud consoles just to access compute resources.

The organization needed to support ML work that touches nearly every aspect of Shopify's business, requiring substantial GPU capacity for training. The challenge wasn't just accessing GPUs but doing so in a way that provides clean development ergonomics, enables cost tracking across teams, ensures fair resource allocation, and adapts to the constantly shifting cloud landscape where pricing changes, new GPU generations appear, and availability fluctuates unpredictably.

Before implementing their SkyPilot-based solution, teams were left to figure out their own cloud setups, leading to fragmentation, duplicated effort, and inconsistent practices across the organization. The team needed an abstraction that would handle mundane infrastructure decisions without hiding the underlying complexity that engineers sometimes need to understand and control.

## Architecture & Design

Shopify's GPU platform architecture centers on persistent Kubernetes clusters running across multiple cloud providers, with SkyPilot functioning as an intelligent job launcher and scheduler rather than an infrastructure provisioner. The system doesn't dynamically create and destroy cloud resources; instead, it schedules jobs onto clusters that Shopify already manages, making routing decisions based on resource requirements specified in user YAML files.

The data architecture ensures that training datasets never leave Shopify's control. Storage is replicated across clouds, so when training runs on Nebius, data comes from volumes within that environment, and similarly for GCP. Jobs execute where the data already resides, eliminating cross-cloud data transfer concerns.

At the core of the platform is a custom SkyPilot plugin that hooks into SkyPilot's policy engine. This plugin intercepts every request before it reaches a cluster, enabling the platform to validate labels, route to different providers, and inject configurations transparently. The routing logic examines resource requirements and makes automatic placement decisions: H200 requests go to Nebius, L4 or CPU-only requests go to GCP, unless engineers explicitly override via the `force_provider_selection` flag.

The Nebius integration provides H200 GPUs with InfiniBand interconnect for high-performance distributed training. InfiniBand enables GPU-to-GPU communication that bypasses the CPU entirely, using RDMA (Remote Direct Memory Access) for direct GPU communication. GCP serves special workloads including L4 GPUs for development work and CPU-only data processing jobs.

Storage on Nebius follows a pay-as-you-grow model that scales from 200TB to 2PB with 80 GiB/s read bandwidth. The system automatically provisions disk space based on YAML requests and cleans up volumes after seven days of disuse, eliminating manual provisioning tickets and preventing orphaned volumes.

## Technical Implementation

The platform leverages several key open-source technologies working in concert. SkyPilot provides the foundational framework for declarative job definition and multi-cloud execution. Kubernetes serves as the underlying orchestration layer across all clouds. Kueue, a Kubernetes job scheduler, handles fair-share scheduling and quota management based on patterns recommended by the SkyPilot team.

Engineers define jobs in YAML files that specify resource requirements and organizational metadata. A typical job specification includes compute requirements (accelerators, memory, disk), execution commands (setup and run scripts), and Shopify-specific labels that drive platform behavior. The labels include:

`showback_cost_owner_ref` for cost attribution, which is mandatory and causes job rejection if omitted. This enforcement ensures complete visibility into GPU spending, allowing teams to see their costs in dashboards and self-correct without finance intervention.

`ml.shopify.io/quota-group` maps to Kueue queues that the platform team configures. Each team receives a quota, and when clusters reach capacity, Kueue ensures fair-share allocation without manual intervention.

`ml.shopify.io/priority-class` determines preemption behavior within Kueue's scheduling hierarchy: emergency, interactive, automated-low-priority, and lowest. Emergency jobs can preempt batch work, and interactive sessions schedule faster than automated pipelines.

`ml.shopify.io/dev` designates development environments, triggering special handling including automatic interactive priority, exemption from the GPU reaper service, and single-GPU limits.

The custom plugin handles cloud-specific configuration injection automatically. For H200 workloads requiring InfiniBand, the plugin detects the hardware requirement and injects necessary pod configurations including mounting `/dev/infiniband`, adding the `IPC_LOCK` capability for memory locking, and ensuring Docker images contain `libibverbs1`. Engineers never configure these details manually.

The platform automatically mounts shared caches to optimize startup times. `/mnt/uv-cache` caches Python packages and `/mnt/huggingface-cache` stores model weights. When one job downloads a large model like `llama-70b`, subsequent jobs access the cached version and start instantly.

A GPU reaper service monitors utilization, terminating jobs that run below 20% GPU utilization for extended periods. This catches runaway training jobs but exempts development environments where low utilization during debugging is expected.

## Scale & Performance

The infrastructure supports hundreds of ML training jobs across Shopify's organization. Storage scales from 200TB to 2PB on Nebius with 80 GiB/s read bandwidth, providing substantial capacity for training datasets and cached artifacts.

The H200 nodes on Nebius provide serious hardware for distributed training, with InfiniBand interconnect delivering the high-bandwidth, low-latency communication necessary for multi-GPU training at scale. The InfiniBand configuration enables GPU-to-GPU communication that bypasses CPU overhead entirely.

The shared cache system delivers significant performance improvements. The first download of a large model incurs full download time, but subsequent jobs requiring the same model start instantly by accessing cached weights. This optimization compounds across hundreds of jobs and numerous team members working with common models and dependencies.

Automatic volume cleanup after seven days of disuse prevents storage waste without requiring manual intervention. This policy balances the need to avoid reprovisioning frequently-used resources against the cost of maintaining unused volumes indefinitely.

Development environments receive sub-second scheduling for interactive work through Kueue's priority classes, while batch training jobs queue according to fair-share policies that prevent any single team from monopolizing cluster resources.

## Trade-offs & Lessons

The team made deliberate architectural choices that reflect their philosophy about platform engineering. They chose to keep engineers close to the metal rather than building an elaborate UI or API that abstracts everything away. Engineers write declarative YAML configs and understand the resources they're requesting, preserving the ability to debug jobs when things go wrong. The abstraction layer handles boring decisions—which cloud, what InfiniBand configuration, where data lives—so humans can focus on interesting modeling work.

This approach contrasts with heavyweight platforms that initially feel convenient but eventually become constraints. Those systems bound the ceiling of what's possible because abstractions can't anticipate every need. With YAML and a policy plugin, escape hatches remain accessible: add a label, override a default, or request a new policy. The system remains flexible as requirements evolve.

The mandatory cost attribution label (`showback_cost_owner_ref`) might seem annoying but delivers real organizational value. Every job must declare who owns the cost, and rejection for missing labels creates immediate feedback. This enforcement means Shopify actually knows where GPU spending goes, teams see their costs in dashboards, and self-correction happens naturally without finance teams chasing people.

The routing abstraction provides valuable agility in a shifting cloud landscape. When pricing changes, new GPU generations appear, or availability fluctuates, the platform team can adjust routing logic without requiring changes to user YAML files. If tomorrow Shopify adds a third cloud provider, most users won't notice because their job specifications remain identical.

The Nebius integration required upfront work to handle InfiniBand configuration automatically, but this investment paid off by eliminating recurring configuration burden across every engineer who needs H200s. The decision to inject these requirements transparently means engineers get correct InfiniBand setup without understanding low-level RDMA details.

The development environment pattern represents a pragmatic compromise. Full training jobs run with fair-share scheduling and utilization monitoring, but debugging requires different constraints. The single label `ml.shopify.io/dev: "true"` switches the system into a different mode: faster scheduling, no reaping, resource limits. This acknowledges that the same infrastructure serves different workflows with legitimately different requirements.

The choice to use Kueue for fair scheduling rather than building custom logic was clearly correct. Kueue solves a complex distributed systems problem that would have consumed substantial engineering time to replicate. The integration with SkyPilot follows recommended patterns, and Kueue's quota and priority mechanisms handle Shopify's multi-team fairness requirements elegantly.

The persistent cluster model, where SkyPilot schedules onto existing Kubernetes infrastructure rather than provisioning ephemeral resources, reflects Shopify's scale and operational maturity. This approach makes sense for an organization running hundreds of jobs continuously, though smaller teams might prefer SkyPilot's dynamic provisioning capabilities.

The platform demonstrates that multi-cloud GPU infrastructure doesn't require insane complexity. With the right abstractions—declarative configuration, policy-based routing, automatic configuration injection—engineers get access to heterogeneous GPU resources through a single consistent interface. The key is choosing where to abstract and where to remain transparent, keeping the system flexible enough to evolve with changing requirements and cloud offerings.
