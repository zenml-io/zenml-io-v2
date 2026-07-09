---
title: "Scaling Frontier AI Models on Google Cloud TPU Infrastructure"
slug: "scaling-frontier-ai-models-on-google-cloud-tpu-infrastructure"
draft: false
llmopsTags:
  - "poc"
  - "reinforcement-learning"
  - "fine-tuning"
  - "model-optimization"
  - "token-optimization"
  - "latency-optimization"
  - "kubernetes"
  - "pytorch"
  - "vllm"
  - "monitoring"
  - "orchestration"
  - "scaling"
  - "open-source"
  - "google-gcp"
  - "anthropic"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic, a leading AI research company building the Claude family of models, partnered with Google Cloud to scale their frontier model training and inference workloads on TPU infrastructure. The company faced challenges in maximizing availability and utilization of large-scale TPU clusters while managing hardware failures and topology reconfigurations. Through close collaboration with Google, Anthropic developed custom automation tools and co-designed new infrastructure features including dynamic slicing, incremental provisioning, and cube hot-swapping capabilities. These innovations enabled Anthropic to achieve high availability rates with 68% model FLOPs utilization and up to 97% goodput for pre-training at massive scale, while serving tens of millions of users worldwide with their Claude models."
link: "https://www.youtube.com/watch?v=LEPY14hF-Uk&list=PLFZU5nT4APFA&index=112"
year: 2026
seo:
  title: "Anthropic: Scaling Frontier AI Models on Google Cloud TPU Infrastructure - ZenML LLMOps Database"
  description: "Anthropic, a leading AI research company building the Claude family of models, partnered with Google Cloud to scale their frontier model training and inference workloads on TPU infrastructure. The company faced challenges in maximizing availability and utilization of large-scale TPU clusters while managing hardware failures and topology reconfigurations. Through close collaboration with Google, Anthropic developed custom automation tools and co-designed new infrastructure features including dynamic slicing, incremental provisioning, and cube hot-swapping capabilities. These innovations enabled Anthropic to achieve high availability rates with 68% model FLOPs utilization and up to 97% goodput for pre-training at massive scale, while serving tens of millions of users worldwide with their Claude models."
  canonical: "https://www.zenml.io/llmops-database/scaling-frontier-ai-models-on-google-cloud-tpu-infrastructure"
  ogTitle: "Anthropic: Scaling Frontier AI Models on Google Cloud TPU Infrastructure - ZenML LLMOps Database"
  ogDescription: "Anthropic, a leading AI research company building the Claude family of models, partnered with Google Cloud to scale their frontier model training and inference workloads on TPU infrastructure. The company faced challenges in maximizing availability and utilization of large-scale TPU clusters while managing hardware failures and topology reconfigurations. Through close collaboration with Google, Anthropic developed custom automation tools and co-designed new infrastructure features including dynamic slicing, incremental provisioning, and cube hot-swapping capabilities. These innovations enabled Anthropic to achieve high availability rates with 68% model FLOPs utilization and up to 97% goodput for pre-training at massive scale, while serving tens of millions of users worldwide with their Claude models."
notion:
  pageId: "398f8dff-2538-8040-8fcb-e20026be6823"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T14:03:00.000Z"
  lastEditedTime: "2026-07-09T14:03:00.000Z"
  publishedAt: "2026-07-09T14:24:18Z"
---

## Overview

This case study describes how Anthropic, one of the world's leading AI research companies, leverages Google Cloud's Tensor Processing Unit infrastructure to develop and deploy the Claude family of frontier models that serve tens of millions of users globally. The presentation features perspectives from both Google Cloud's TPU engineering leadership and Anthropic's infrastructure team, providing insights into the co-development of infrastructure features specifically designed for large-scale AI workloads. The collaboration demonstrates how production LLM infrastructure must address challenges across the entire model lifecycle including pre-training, post-training with reinforcement learning, and serving at scale.

## Anthropic's Infrastructure Requirements

Anthropic represents a unique customer segment as a large frontier model builder with specific infrastructure needs. Unlike smaller customers who provision compute on-demand, Anthropic commits to and manages large fixed footprints of TPU capacity. The infrastructure team's primary responsibility is ensuring highly available compute infrastructure for the rest of the company, including research teams and production serving workloads. This requires sophisticated orchestration to maximize utilization of expensive hardware while maintaining resilience to failures that could jeopardize multi-month training runs representing millions of dollars in investment.

The company uses Kubernetes and specifically Google Kubernetes Engine as their orchestration platform. They have also developed custom scheduling infrastructure tailored to their specific requirements around topology management and workload placement. This custom scheduler is critical because Anthropic needs fine-grained control over how their workloads map to the physical TPU topology, something that generic schedulers cannot adequately handle at frontier model scale.

## TPU Architecture and the Model Lifecycle

Google's TPU infrastructure is designed to excel across three distinct phases of the foundation model lifecycle. For pre-training, TPUs utilize a systolic array architecture that streams data across thousands of interconnected chips to perform matrix multiplications efficiently, removing on-chip data bottlenecks. The architecture also includes specialized sparse cores to accelerate embedding-heavy workloads and non-matrix multiplication operations. TPUs support low precision numerics including bfloat16, FP8, and with the eighth generation announced during this presentation, native FP4 support. These lower precision formats reduce computation and data footprint while lowering energy consumption without compromising model quality.

Within a single TPU pod, chips are interconnected through Google's proprietary ICI topology network in what they call an ICI domain, analogous to NVIDIA's NVLink GPU domain. The seventh generation TPUs have 9,216 chips interconnected with 1.2 terabits per second bidirectional bandwidth in a 3D torus topology. These pods consist of cubes of 64 chips connected to nearest neighbors through optical wraparound links, and these cubes are reconfigurable to connect into larger or smaller topologies based on workload needs. The eighth generation scales up to 9,600 interconnected chips in a single domain.

For workloads requiring even greater scale, Google supports a concept called slicing that allows jobs to span tens of thousands of chips across multiple ICI domains and the data center network. The architecture supports sophisticated parallelization strategies and compiler optimizations to enable multi-slice training. TPU customers consistently achieve high machine FLOPs utilization of up to 80%, and at massive scale the infrastructure maintains 68% model FLOPs utilization with up to 97% goodput for pre-training.

Post-training represents the phase where models learn critical capabilities like reasoning, coding, tool use, and safety alignment. Reinforcement learning in particular has driven massive model performance gains for frontier labs. TPUs enhance post-training performance through hardware and software co-design optimizations including support for agentic reinforcement learning, supervised fine-tuning, distillation, and popular reinforcement learning algorithms. The systolic array design, matrix multiplication units, sparse cores, large ICI domains, high-bandwidth memory, and low precision numeric support all contribute to maximum performance during this critical phase.

For inference, TPUs support popular open-source engines like vLLM and JetStream, offering competitive price performance. The architecture enables near-zero developer friction, allowing customers to retain the same vLLM interface while switching deployments to TPUs with minimal configuration changes. According to the presentation, customers can achieve over 2x better performance on TPUs versus comparable accelerators when using on-demand consumption modes. Key inference optimizations include continuous batching rather than waiting for full batches, quantization to reduce model size and memory requirements, KV cache quantization enabling larger batch sizes and longer context windows, and HBM page retention techniques that reduce memory fragmentation. These techniques can result in inference performance improvements of two to three times. Additional capabilities include disaggregated serving that independently scales the prefill and decode phases, achieving multiple times faster time-to-first-token and time-per-output-token compared to single-host interleaved serving.

## Evolution of Anthropic's TPU Infrastructure Management (2024-2026)

Anthropic's journey with TPU infrastructure began in 2024 when they received access to their first large fleet of TPU v5 capacity. This capacity was primarily non-elastic, requiring the development of custom automation to ensure high availability. The infrastructure team focused on both 2D and 3D topologies, and because they knew exactly how much capacity they had purchased, they needed sophisticated tools to maximize utilization.

### Hard Slicing and the Maximizer (2024)

Initially, Anthropic used what they call hard slicing, where they would provision TPU node pools in specific topologies through GKE. For example, they might request a 16x16 TPU v5 or a 4x4x4 TPU v5p topology. However, workload requirements change over time. A topology used for training might need to be reconfigured into smaller topologies for serving once the model is complete. For instance, converting a 16x16 into four 8x8 topologies, or a 4x4x4 into multiple 2x2x2 topologies.

With hard slicing, these reconfigurations required deleting and recreating node pools, which took 10-15 minutes and sometimes up to 30 minutes to provision the capacity back. This downtime directly impacted the availability metrics that the infrastructure team was responsible for delivering to the rest of the company.

To address this, Anthropic developed an internal component called the Maximizer in 2024. The Maximizer is an automation tool that attempts to provision as much TPU capacity as possible given the constraints of available healthy hardware. When examining a fleet of physically 16x16 TPU pods, the Maximizer would first identify and clean up unhealthy hosts or failed links. Then it would go through an iterative process attempting to provision larger topologies first, then progressively smaller ones to fill in gaps. It could also perform priority boosting operations to convert multiple smaller healthy topologies back into larger 16x16 configurations when beneficial. The system would run multiple times per day or week depending on hardware health, and could also react when previously unhealthy hosts were repaired and became available again.

### Soft Slicing (Late 2024)

Later in 2024, Anthropic co-developed a feature with Google called slicing, which fundamentally changed how they managed topologies. Instead of hard slicing that required node pool deletions and recreations, they could now keep a 16x16 node pool intact and slice it into different logical topologies at scheduling time through manipulation of JAX environment variables. This was a major win for availability because it eliminated the downtime associated with node pool reprovisioning. Anthropic's custom scheduler makes the decisions about which workloads to evict and how to reconfigure the topology based on internal demand, whether transitioning from inference jobs to research workloads or vice versa.

### New Features in 2025

The arrival of the v6 TPU family in 2025 brought additional first-party features that further improved availability. Restart-in-place capability allowed Anthropic to handle situations where a subset of hosts in a 16x16 pod went bad. Previously, this would require deleting the node pool and paying the provisioning time penalty again. With restart-in-place, they could keep the 16x16 configuration intact, send the failed host to repair, and continue using the topology through smaller slices. Once the host returned from repair, the full 16x16 could be used as a healthy slice again, significantly improving availability metrics.

Another 2025 feature was stable hardware identifiers. Previously, when deleting and recreating node pools, the same underlying hardware would be presented with different IDs. At Anthropic's scale, tracking which hosts are being seen for the first time versus which have returned from repair is valuable for building confidence in hardware reliability. They can implement burn-in procedures and make decisions about whether to dedicate hardware to research workloads or production training runs. This visibility extends to tracking the lifecycle of individual components. For example, if a host is repaired, they can see whether the compute tray remained the same while the TPU chip was replaced, and this information feeds into their internal hardware accounting ledger.

Fixed host coordinates also arrived in 2025, which was particularly important for the slicing capabilities. Previously, after ingesting a 16x16 topology for the first time, Anthropic had to run a specific program taking 10-20 minutes to map the topology into precise coordinates so their scheduler could place workloads. With fixed host coordinates as a first-party GKE feature, the partition tree for hosts is provided automatically as node labels, eliminating this extra infrastructure component and wait time.

These stable identifiers enabled Anthropic to build what they call a fleet hardware map, providing unprecedented visibility into the physical layout of their infrastructure within Google data centers. Previously, when using hard-sliced node pools, they couldn't determine which physical rack a particular topology belonged to. With the new capabilities, they can map out exactly which hardware they have and its physical location, including identifying hosts that have gone to repair or hosts they've never been able to provision. This level of visibility gives them very high confidence when scaling infrastructure operations.

### V7 Family and Dynamic Slicing (2026)

The v7 TPU family that rolled into production in early 2026 introduced even more sophisticated capabilities. Incremental provisioning allows Anthropic to request a topology like a 4x4x4 in a new mode where they receive the physical hardware topology even if it's not fully healthy yet because Google is still repairing some components. The hardware status is reflected through GKE node health status, and once repairs complete, it automatically becomes available as a fully healthy topology. This builds on previous features to further reduce the automation burden.

Dynamic slicing represents a major advancement in how Anthropic utilizes the large ICI domain in v7. The seventh generation provides a single ICI domain with up to 9,216 chips, and with dynamic slicing, cubes within this domain can be joined together at runtime to form arbitrary topologies. Anthropic's custom scheduler identifies when cubes are free and can be combined into the requested topology. They developed a new component called Slice Manager that watches for bound pods without slices and creates slice custom resources that control the ICI links. Anthropic specifies exactly which partition IDs to use and how cubes should be joined together. This level of control over the data center's ICI links is unprecedented. A Google internal component called Slice Controller observes the slice intent and physically controls the ICI fabric to form the requested domain. Once the slice becomes ready, the workload can begin. When the job completes, the slice is deleted and the constituent cubes become available again as spares for future use.

### Advanced Failure Handling

Cluster Directory, introduced with the v7 family, provides visibility into link failures versus host failures. Previously, when a link failed in a 16x16 topology, Anthropic had to assume the worst case scenario and make suboptimal use of the remaining capacity because they couldn't determine if it was a link failure or a host failure. With Cluster Directory providing precise visibility into failed components, they can make better decisions. If only a link has failed but hosts remain healthy, they can provision larger topologies than would otherwise be possible. For example, instead of being limited to an 8x8 as the largest topology after a failure, they might be able to use an 8x16 plus two 8x8 configurations, fully utilizing hosts even if not all ICI links are available.

ICI resilience routing is another v7 capability that improves fault tolerance at the chip level. When communication needs to happen between two chips and one of the links fails, traditional routing would fail and the workload would terminate. With what Google calls wild-first routing, the system can route around the failure using healthy links. The workload continues running albeit at lower performance, but doesn't need to stop or fail. This allows training to continue to the next checkpoint or even to completion depending on requirements, providing flexibility that wasn't previously available.

Cube hot-swap represents a particularly sophisticated failure recovery mechanism for large dynamic slices. Consider a scenario with four cubes joined as a dynamic super slice. If a host in one cube fails, traditional approaches would require tearing down the entire node pool, deleting all pods, and reprovisioning. With dynamic slicing and cube hot-swap, Anthropic's Slice Manager can delete the slice while keeping pods on healthy cubes running. It creates a new slice targeting a spare cube that is known to be healthy through Cluster Directory visibility, binds only new pods to the failed subset, and then restores from checkpoint. What might have been an hour of downtime becomes just a few minutes of recovery time.

## Infrastructure Comparison Across TPU Generations

The evolution across TPU generations reveals a dramatic improvement in failure handling and scale management. With v5, scaling beyond a single pod required joining two pods over a data center network using JAX's megascale functionality. If there was a failure, Anthropic had to replace an entire slice or half of it by recreating node pools, and the replacement would join as a new data center network peer.

With v6, the same megascale approach was used with inter-slice links over the data center network. Failures still required replacing a full 16x16 topology, and the spare capacity had to be an entire healthy node pool.

The v7 generation fundamentally changes this architecture. It provides a single ICI domain with 144 cubes and no data center network between them—everything is fully connected through ICI, providing the exceptional performance characteristics described earlier. When failures occur, Anthropic replaces only a single cube of 64 chips, and the spare cube they keep warm joins the same ICI domain without any data center network involvement. This represents a dramatic improvement in both operational efficiency and availability.

## Performance and Scale Achievements

The presentation emphasizes several key performance metrics achieved with TPU infrastructure. At the hardware level, TPUs deliver 20% more goodput compared to comparable accelerators at 128-chip scale, resulting in faster time to market for next-generation frontier models. The v7 family provides unprecedented bandwidth within the ICI domain, enabling both massive single-domain training and the flexibility to perform multi-slice jobs across multiple pods when required for frontier-scale workloads.

Anthropic has achieved high utilization rates with up to 80% machine FLOPs utilization during training, and at the infrastructure level maintains 68% model FLOPs utilization with 97% goodput for pre-training workloads. For inference, the combination of architectural optimizations and software techniques delivers over 2x better performance on TPUs compared to comparable accelerators.

## Broader Ecosystem and Flexibility

Beyond the raw performance and reliability features, Google has invested in making TPUs flexible and easy to adopt. The software stack is open and modular, built around the XLA compiler and distributed runtime including Pathways. TPUs support both JAX, which powers Google's Gemini models, and PyTorch natively. Workload orchestration is simplified through tools like GKE and Ray. For practitioners, Google provides solutions like MaxText for pre-training and post-training, and high-performance inference engines like vLLM and JetStream.

The broader AI Hypercomputer architecture that TPUs fit into offers orchestration and cluster management choices, flexible consumption models, and performance-optimized components across compute, storage, and networking. This architecture has made TPUs generally available through Google Cloud after serving as the foundation for Google's internal AI innovation since 2015.

## Critical Assessment and Observations

While the presentation demonstrates impressive technical capabilities and genuine production scale operations at Anthropic, several aspects warrant balanced consideration. The case study represents a close partnership where infrastructure features were co-developed specifically for Anthropic's needs. This level of collaboration and customization may not be representative of what typical customers experience. The custom scheduler that Anthropic built and the Slice Manager component represent significant engineering investment that smaller organizations would need to undertake to achieve similar levels of control and efficiency.

The presentation makes strong performance claims including 20% more goodput and 2x better inference performance compared to unnamed competitors. Without specific workload details, model architectures, and controlled comparisons, these figures should be interpreted as directional rather than universal benchmarks. Performance characteristics can vary significantly based on model architecture, batch sizes, sequence lengths, and optimization strategies.

That said, the operational details provided by Anthropic's infrastructure engineer are credible and specific. The evolution from hard slicing to soft slicing to dynamic slicing represents genuine progress in infrastructure maturity. The problems they describe around availability, hardware failures, topology reconfiguration, and the need for hardware visibility are real challenges at frontier model scale. The solutions they've developed in partnership with Google—particularly around cube hot-swap, incremental provisioning, and cluster directory—address legitimate operational pain points.

The emphasis on observability and hardware tracking is particularly noteworthy from an LLMOps perspective. The ability to build a fleet hardware map, track component lifecycles, and make informed decisions about hardware placement based on repair history demonstrates sophisticated infrastructure operations. This level of visibility becomes essential when hardware failures could jeopardize training runs representing millions of dollars of compute investment.

The progression from requiring custom automation like the Maximizer to having many of those capabilities become first-party features represents a healthy maturation of the platform. However, organizations should recognize that Anthropic still maintains significant custom infrastructure including their scheduler and Slice Manager. Successfully operating at this scale requires deep expertise and engineering resources.

Overall, this case study provides valuable insights into production LLM infrastructure at frontier scale, demonstrating how hardware architecture, orchestration software, and operational tooling must co-evolve to support the complete model lifecycle from pre-training through post-training to serving at massive scale. The specific technical details around failure recovery, topology management, and resource utilization offer practical lessons for organizations building production LLM infrastructure, even if the exact scale and level of customization may not be achievable for all practitioners.
