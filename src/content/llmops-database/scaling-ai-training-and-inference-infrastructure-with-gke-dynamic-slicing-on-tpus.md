---
title: "Scaling AI Training and Inference Infrastructure with GKE Dynamic Slicing on TPUs"
slug: "scaling-ai-training-and-inference-infrastructure-with-gke-dynamic-slicing-on-tpus"
draft: false
llmopsTags:
  - "poc"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "kubernetes"
  - "orchestration"
  - "scaling"
  - "monitoring"
  - "devops"
  - "reliability"
  - "scalability"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic collaborated with Google Cloud to develop and deploy dynamic slicing capabilities on Google Kubernetes Engine (GKE) for TPU workloads, addressing critical infrastructure challenges in training and serving large language models at scale. The traditional rigid node pool configuration required exact topology matching, causing 10-30 minute delays for infrastructure provisioning and hours for failure recovery. Through dynamic slicing on GKE with TPU v6 and v7 generations, Anthropic achieved dramatic improvements: slice provisioning reduced from 10-30 minutes to 20-60 seconds, failure recovery dropped from hours to 2-5 minutes, and infrastructure visibility improved from weeks to instant. The solution decouples physical infrastructure creation from workload scheduling, enables sub-slicing for better resource utilization, supports incremental provisioning of partially healthy node pools, and provides hot-swapping capabilities for faster recovery from hardware failures."
link: "https://youtu.be/1fajBv4-bzM"
year: 2026
seo:
  title: "Anthropic: Scaling AI Training and Inference Infrastructure with GKE Dynamic Slicing on TPUs - ZenML LLMOps Database"
  description: "Anthropic collaborated with Google Cloud to develop and deploy dynamic slicing capabilities on Google Kubernetes Engine (GKE) for TPU workloads, addressing critical infrastructure challenges in training and serving large language models at scale. The traditional rigid node pool configuration required exact topology matching, causing 10-30 minute delays for infrastructure provisioning and hours for failure recovery. Through dynamic slicing on GKE with TPU v6 and v7 generations, Anthropic achieved dramatic improvements: slice provisioning reduced from 10-30 minutes to 20-60 seconds, failure recovery dropped from hours to 2-5 minutes, and infrastructure visibility improved from weeks to instant. The solution decouples physical infrastructure creation from workload scheduling, enables sub-slicing for better resource utilization, supports incremental provisioning of partially healthy node pools, and provides hot-swapping capabilities for faster recovery from hardware failures."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-training-and-inference-infrastructure-with-gke-dynamic-slicing-on-tpus"
  ogTitle: "Anthropic: Scaling AI Training and Inference Infrastructure with GKE Dynamic Slicing on TPUs - ZenML LLMOps Database"
  ogDescription: "Anthropic collaborated with Google Cloud to develop and deploy dynamic slicing capabilities on Google Kubernetes Engine (GKE) for TPU workloads, addressing critical infrastructure challenges in training and serving large language models at scale. The traditional rigid node pool configuration required exact topology matching, causing 10-30 minute delays for infrastructure provisioning and hours for failure recovery. Through dynamic slicing on GKE with TPU v6 and v7 generations, Anthropic achieved dramatic improvements: slice provisioning reduced from 10-30 minutes to 20-60 seconds, failure recovery dropped from hours to 2-5 minutes, and infrastructure visibility improved from weeks to instant. The solution decouples physical infrastructure creation from workload scheduling, enables sub-slicing for better resource utilization, supports incremental provisioning of partially healthy node pools, and provides hot-swapping capabilities for faster recovery from hardware failures."
notion:
  pageId: "398f8dff-2538-80b0-856c-f7d21f21d3ac"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T13:20:00.000Z"
  lastEditedTime: "2026-07-09T15:19:00.000Z"
  publishedAt: "2026-07-09T15:23:11Z"
---

## Overview

Anthropic, a leading AI safety company building frontier large language models, partnered with Google Cloud over a multi-year period (2024-2026) to co-develop sophisticated infrastructure capabilities for running AI workloads at scale on TPUs through Google Kubernetes Engine. This case study represents a significant evolution in how production AI workloads can be managed, particularly addressing the unique challenges of training and serving large language models that require massive amounts of specialized compute resources arranged in specific network topologies.

The collaboration is particularly noteworthy because it addresses real production challenges faced by a company operating at the frontier of AI capabilities. Anthropic's infrastructure requirements differ from many cloud-native companies in that they operate with fairly static capacity allocations rather than elastic auto-scaling, which creates unique challenges around maximizing utilization of expensive, pre-purchased TPU capacity.

## The Problem Space

The fundamental challenge Anthropic faced stemmed from the traditional TPU configuration model in GKE, which was extremely node pool centric. In this legacy model, the topology of TPU configurations had to match exactly with node pool configurations to schedule workloads. For example, if a training job required a 4x4x4 TPU topology (64 chips arranged in a three-dimensional mesh), an entire node pool with that exact topology had to be created before the workload could start.

This rigid coupling between infrastructure and workload scheduling created several critical problems. First, job startup times were extremely slow, typically ranging from 5-15 minutes but often exceeding 20 minutes for larger slices. The time required for infrastructure provisioning directly delayed the start of expensive training runs. Second, when hardware failures occurred, the recovery process was catastrophic in scope. A single VM failure in a 128-node pool would require tearing down and recreating the entire pool with 128 healthy nodes, a process that could take hours and wasted significant compute capacity.

Third, capacity utilization was suboptimal. If Anthropic had a 64-node TPU pool available but needed to run a small 4-VM job, the system would create an entirely new node pool rather than scheduling the small job onto the existing capacity. This prevented bin-packing of workloads and left large amounts of expensive TPU capacity idle. Fourth, the node pool creation process was all-or-nothing. If requesting a 16-VM node pool but only 15 healthy VMs were available, the entire node pool creation would fail rather than provisioning the available capacity.

Anthropic developed an internal process called "maximizer" to work around these limitations. This process would continuously attempt to provision capacity by deleting unhealthy node pools, attempting to consolidate smaller topologies into larger ones, and working its way down through progressively smaller topology sizes when full capacity wasn't available. While this automated some of the operational burden, it was still time-consuming, taking hours to fully optimize capacity allocation across their fleet.

## The Solution: GKE Dynamic Slicing

The solution centered on a paradigm shift in how TPU infrastructure is managed in GKE, enabled by a technology stack called dynamic slicing. The core innovation was decoupling physical infrastructure creation from workload scheduling, removing the overhead of rigid infrastructure management that previously tied infrastructure provisioning directly to each workload request.

Dynamic slicing builds on several foundational technologies. At the base layer is TPU All Capacity Mode, introduced with the Ironwood (V6) TPU generation. This represents raw dense reservation capacity where the physical TPU resources are acquired but not pre-configured into specific topologies. Above this sits Cluster Director, which provides topology awareness and comprehensive health visibility across both VM-level and TPU fabric-level infrastructure. Users can see all their capacity and understand the health status of their entire infrastructure in real-time. At the top of the stack, dynamic slicing itself uses these foundational capabilities to enable accelerated job startup, improved fleet utilization, and faster workload recovery.

The operational model fundamentally changes from the legacy approach. Instead of creating node pools on-demand with exact topologies matching each workload, users pre-create node pools based on the smallest failure domain of the TPU generation being used. For Ironwood TPUs, this is a 4x4x4 cube containing 16 VMs. This is a one-time setup activity where all acquired capacity is divided into these basic building block node pools.

When workloads are submitted with the dynamic slicing annotation, GKE intelligently forms the required slice at runtime. For workloads smaller than 16 VMs, the system can now sub-slice within a single node pool, scheduling multiple small workloads onto the same physical infrastructure and bin-packing for optimal utilization. This represents the first time multiple workloads could exist within a single TPU node pool. For workloads requiring more than 16 VMs, the dynamic slicing scheduler selects multiple healthy node pools and works with the underlying TPU infrastructure to form the network fabric, connecting them into a single Inter-Chip Interconnect (ICI) domain with the appropriate X, Y, and Z dimensional links and wrap-around connections.

The live demonstration showed a 2048-chip slice (512 VMs) being formed in just 41 seconds, a process that would have previously taken 15-20 minutes. The system selected the required 128 VMs across multiple node pools, created the slice custom resource, and the slice controller worked with the TPU OCS switch to establish the fabric connections dynamically at runtime.

## Incremental Provisioning and Health Visibility

A critical innovation is incremental provisioning, which addresses the previous all-or-nothing nature of node pool creation. With dynamic slicing, if requesting a 16-VM node pool but only 15 healthy VMs are currently available, the system provisions the node pool with the 15 available VMs. When the 16th VM becomes healthy after repair, it automatically joins the node pool without requiring manual intervention or node pool recreation.

This provides three major benefits. First, users get 100% access to their healthy TPU capacity immediately, rather than waiting for all capacity to be simultaneously healthy. Second, with sub-slicing capabilities, even individual VMs within partially provisioned pools can be utilized for single-VM workloads. Third, the operational toil of continuously attempting infrastructure creation is eliminated, as users simply create the node pool once and the system automatically incorporates capacity as it becomes available.

Cluster Director provides unprecedented visibility into infrastructure health, tracking both VM-level and TPU fabric-level status. The system can distinguish between VM failures and network link failures, enabling more intelligent decision-making about capacity utilization. For example, if two links fail in a 16x16 2D topology, the legacy system would have to assume the worst case that all hosts on both sides of the failed links were bad, removing eight hosts from availability. With Cluster Director's detailed health information, if it determines that only the links failed but all hosts are healthy, all hosts can continue to be utilized, just with reduced ICI bandwidth for that particular slice.

## Recovery and Hot Swapping

The recovery process represents a dramatic improvement over legacy behavior. When a VM failure occurs within a running slice, the old recovery model required tearing down the entire node pool and recreating all nodes, even the healthy ones. With dynamic slicing, the system can perform hot swapping. When a failure is detected in one cube (16 VMs), the system deforms the slice, swaps the failed cube for a healthy cube from the available pool, re-stitches the TPU fabric to incorporate the new cube, and reforms the slice. The pods running on the healthy cubes remain in place throughout this process, and only the affected pods need to restart and rejoin the slice after checkpoint restoration.

This hot swap capability provides approximately five times faster recovery compared to static node pool recovery. More importantly, it minimizes the blast radius of failures. Instead of taking down 128 VMs because one VM failed, only 16 VMs are affected during the swap operation. This dramatically reduces wasted compute and accelerates return to productive training or inference work.

## Anthropic's Custom Integration

Anthropic's implementation is particularly sophisticated because they developed their own custom scheduler rather than using the standard Kubernetes scheduler or the slice scheduler component that Google provides for general use. Their scheduler performs gang scheduling with topology awareness, understands how to score different jobs against each other for priority, and can bind pods directly without going through the default scheduler when latency requirements are critical.

Despite this custom approach, Anthropic can still leverage dynamic slicing because Google exposed the underlying slice custom resources (CRs) as a primitive that any scheduler can utilize. Anthropic introduced a component called "slice manager" that watches for pods bound by their custom scheduler and creates the appropriate slice CRs with the required partition IDs when a complete set of pods for a topology is ready to run. The slice controller then activates the slice by establishing the ICI domain, and Anthropic's workload can begin execution.

When workloads complete, Anthropic's slice manager deletes the slice CR, deforming the slice and returning the cubes to available status for other workloads. This tight integration allows them to maintain their custom scheduling logic while benefiting from Google's infrastructure innovations.

## Evolution Across TPU Generations

The case study traces Anthropic's journey through multiple TPU generations. In 2024 with V5P, they operated with hard slicing requiring specific node pool topologies, managed through their maximizer process. Later in 2024, they gained early access to sub-slicing within static node pools, allowing runtime carving of 16x16 slices into smaller topologies without node pool operations, saving 10-20 minutes per reconfiguration.

In 2025 with V6E, they gained access to restart-in-place capabilities, allowing node pools to remain intact when hosts failed and went to repair, with sub-slicing providing continued utilization of healthy portions until repaired hosts rejoined. They also gained stable hardware identifiers, critical for tracking assets through their burn-in testing and quality confidence processes. First-party availability of host coordinates as node labels eliminated a previous 10-minute custom process for mapping physical topology information needed by Jax for distributed training. This coordinate information also enabled them to visualize the actual data center rack layout, tracking exactly which hardware they had acquired and where unhealthy hosts were located.

In 2026 with V7X, the full dynamic slicing capabilities matured, bringing incremental provisioning, super-slicing (forming large topologies from multiple cubes dynamically), and hot swapping for rapid recovery. The V7X architecture itself represents a significant scaling improvement, with a single ICI domain supporting up to 9216 chips compared to V5P which required two pods connected over data center network to reach that scale.

## Quantified Impact

The results across these dimensions are substantial. Host provisioning time dropped from hours with the maximizer process to instant with incremental provisioning and Cluster Director, as capacity becomes visible and usable immediately upon availability. Slice creation time reduced from 10-30 minutes for node pool operations to 20-60 seconds with dynamic slicing. Infrastructure visibility improved from weeks (the time required to map capacity through trial-and-error node pool creation) to instant with Cluster Director's comprehensive topology and health information.

Recovery from failures dropped from hours to 2-5 minutes through hot swapping. Sub-slicing, which Anthropic co-developed starting in V5B and is now available as a first-party feature through slice CRs, provides dramatically improved resource utilization by allowing multiple workloads per node pool and enabling use of partially healthy capacity.

## LLMOps Considerations

From an LLMOps perspective, this case study demonstrates the critical importance of infrastructure orchestration for production AI workloads. Training frontier language models requires coordination of thousands or tens of thousands of accelerators in precise network topologies. Any inefficiency in infrastructure provisioning or failure recovery directly translates to wasted training time and increased cost at scales where minutes of delay can cost thousands of dollars.

The solution addresses several key LLMOps concerns. Observability is dramatically improved through Cluster Director's detailed health monitoring and the ability to visualize infrastructure status through slice CRs. Reliability is enhanced through faster failure recovery and reduced blast radius when failures occur. Resource utilization is optimized through sub-slicing and bin-packing capabilities. Operational efficiency is improved through elimination of manual intervention in capacity management and automated incorporation of healthy capacity.

The integration pattern, where infrastructure primitives are exposed at a level that allows custom schedulers to be built while still benefiting from platform innovations, is noteworthy for organizations with sophisticated requirements. Not every organization needs to build a custom scheduler like Anthropic, but the architecture demonstrates that platform capabilities can be layered in ways that don't force a one-size-fits-all approach.

It's important to note that while this case study presents impressive improvements, it represents capabilities developed specifically for Google Cloud's TPU infrastructure and may not directly translate to other accelerator platforms or cloud providers. The tight integration between GKE, the TPU control plane, and the physical TPU fabric is a significant engineering achievement but also represents vendor-specific technology. Organizations evaluating this approach should consider the implications of this tight coupling for their multi-cloud strategies and vendor relationships.

The case study also primarily addresses infrastructure concerns rather than higher-level LLMOps challenges like model evaluation, deployment strategies for serving, A/B testing, or prompt management. These remain important concerns that organizations must address separately, though having robust infrastructure is certainly a prerequisite for addressing those challenges effectively at scale.
