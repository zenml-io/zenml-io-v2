---
title: "Scaling AI Infrastructure: Managing Data Movement and Placement on Meta's Global Backbone Network"
slug: "scaling-ai-infrastructure-managing-data-movement-and-placement-on-meta-s-global-backbone-network"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "682726fd82608ed305a1ebe7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:08:42.263Z"
  createdOn: "2025-05-16T11:52:29.927Z"
llmopsTags:
  - "realtime-application"
  - "high-stakes-application"
  - "latency-optimization"
  - "cost-optimization"
  - "load-balancing"
  - "scaling"
  - "cache"
  - "reliability"
  - "scalability"
  - "meta"
industryTags: "tech"
company: "Meta"
summary: "Meta faced significant challenges when AI workload demands on their global backbone network grew over 100% year-over-year starting in 2022. The case study explores how Meta adapted their infrastructure to handle AI-specific challenges around data replication, placement, and freshness requirements across their network of 25 data centers and 85 points of presence. They implemented solutions including optimizing data placement strategies, improving caching mechanisms, and working across compute, storage, and network teams to \"bend the demand curve\" while expanding network capacity to meet AI workload needs."
link: "https://www.youtube.com/watch?v=oeFp-AW_BIA"
year: 2022
seo:
  title: "Meta: Scaling AI Infrastructure: Managing Data Movement and Placement on Meta's Global Backbone Network - ZenML LLMOps Database"
  description: "Meta faced significant challenges when AI workload demands on their global backbone network grew over 100% year-over-year starting in 2022. The case study explores how Meta adapted their infrastructure to handle AI-specific challenges around data replication, placement, and freshness requirements across their network of 25 data centers and 85 points of presence. They implemented solutions including optimizing data placement strategies, improving caching mechanisms, and working across compute, storage, and network teams to \"bend the demand curve\" while expanding network capacity to meet AI workload needs."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-infrastructure-managing-data-movement-and-placement-on-meta-s-global-backbone-network"
  ogTitle: "Meta: Scaling AI Infrastructure: Managing Data Movement and Placement on Meta's Global Backbone Network - ZenML LLMOps Database"
  ogDescription: "Meta faced significant challenges when AI workload demands on their global backbone network grew over 100% year-over-year starting in 2022. The case study explores how Meta adapted their infrastructure to handle AI-specific challenges around data replication, placement, and freshness requirements across their network of 25 data centers and 85 points of presence. They implemented solutions including optimizing data placement strategies, improving caching mechanisms, and working across compute, storage, and network teams to \"bend the demand curve\" while expanding network capacity to meet AI workload needs."
---

## Overview

This case study comes from a presentation by two Meta network engineers (Jnana and Abhishek Gopalan) discussing how AI workloads have transformed the requirements for Meta's global backbone network infrastructure. The presentation provides valuable insights into the often-overlooked infrastructure challenges that arise when running AI and LLM workloads at hyperscale. While not directly about LLMOps in the narrow sense of model development and deployment pipelines, it offers crucial context about the underlying infrastructure that makes production AI systems possible at companies like Meta.

Meta operates one of the largest backbone networks in the world, connecting over 25 data centers and 85 points of presence through millions of miles of fiber in both terrestrial and subsea routes. This infrastructure enables their social products (Facebook, WhatsApp, Instagram) to deliver real-time experiences globally. The backbone capacity has grown over 30% year-over-year for the last five years, yet even this growth rate has been challenged by AI demands.

## The AI Transition and Its Impact

The presentation marks 2022 as a critical inflection point. Prior to this, GPU demand from product groups was limited and requested in small cluster sizes. Most AI-related traffic stayed within a single data center or at most within a data center region. The infrastructure team had focused primarily on one stage of the AI lifecycle: reading from storage to feed into GPUs.

However, starting in 2022, the landscape changed dramatically. GPU demand from product groups grew over 100% year-over-year, and requests came for much larger cluster sizes. More significantly, the team observed "higher than anticipated uptick in growth in traffic on the backbone" that they were not prepared for. They had missed several critical elements of the AI lifecycle that would generate significant cross-region traffic.

The presentation includes a chart showing two curves: AI-driven traffic and non-AI traffic on the backbone over several years. These curves started at parity but diverged significantly, with AI-driven needs growing not only in volume but also in rate of growth. Critically, AI-driven traffic patterns are described as "quite volatile and hard to predict because of how dynamic the landscape is and which models kind of drive different needs."

## The AI Data Lifecycle Through a Network Lens

A key contribution of this presentation is articulating the complete AI data lifecycle as it impacts network infrastructure:

**Data Ingestion**: New data is constantly generated by users and machines. Given the global nature of data collection, data consistency becomes critical. This is the initial stage where data arrives in Meta's infrastructure.

**Data Preparation and Placement**: This stage involves deciding which data to place where, ensuring data protection for reliability, and managing data freshness. The team must determine how many copies of data are needed, including primary copies, secondary copies, warm copies, and cold storage copies.

**Data Replication**: This is where the backbone impact becomes most significant. While data replication existed pre-AI, AI workloads compound this need substantially. Data must move from regions where it's collected (green regions in their diagram) to regions where training jobs run (orange regions), and then to regions from which AI traffic is served (purple regions).

**Data Flow to Compute Clusters**: Only after managing the earlier stages does data actually flow to the GPU clusters where AI training occurs. Even during training, the backbone is used for operations like checkpointing to ensure reliability if clusters or regions go down.

**Model Serving/Inference**: After models are trained, they must be served to users. The presenters note this is "somewhat modest on the backbone" today but is "a fast growing space" they're watching closely.

## Key Challenges for AI on the Backbone

The presentation identifies several unique challenges that AI brings to backbone infrastructure:

**Data Freshness Requirements**: AI workloads often require very fresh data, which drives cross-region reads. The presenters showed that networking costs for shuttling fresh data across regions was "starting to exceed compute costs" even before AI projections were factored in. Without intentional management, this would lead to "exponential growth" in backbone demand.

**Over-Replication at Planetary Scale**: AI requires data to be replicated many times across regions, increasing complexity due to high requirements for data freshness, the number of times data must be moved, and the sheer volume (exabytes of data).

**Data Placement Complexity**: Collocating data and AI training optimally is described as "a very complex problem." Demand signals from product groups are volatile as AI needs constantly evolve. Supply constraints come from construction delays, geopolitical and regulatory environments, and market availability. The optimization problem involves dozens of product groups with different demand flavors, multiple dozens of physical sites with multiple buildings each, and a dozen hardware SKUs—leading to "millions of variables and millions of constraints."

**Hardware Heterogeneity Issues**: AI workloads are "less spongeable" and don't work as well with hardware heterogeneity. For example, A100 versus H100 servers have different preferences for network, hardware, and products. This makes migration more complex when upstream demand and supply signals change.

## Solutions Implemented

The Meta team describes their approach in terms of "bending the demand curve" and "expanding the supply curve."

**Cross-Stack Optimization**: A key learning was that addressing AI infrastructure challenges "really takes a holistic view of working across the stack"—not just backbone or even network, but working with compute, data, and storage teams. For the fresh data challenge specifically, they worked with storage teams to implement more caching and better data placement strategies, reducing cross-region reads to just two-thirds of what they would otherwise be.

**Better Observability**: The team is building "better instrumentation and observability of how data flows" to understand which data sets are actually useful. Sometimes data is shuttled across regions but doesn't get used or waits unnecessarily.

**Differentiated Quality of Service**: They operate "a differentiated class of service network on the backbone with different QoS guarantees for different workloads." Not all AI workloads need the same latency guarantees, and recognizing this allows for more efficient backbone utilization.

**Temporal Optimization**: They tap into "temporal opportunities on the backbone"—the ebbs and flows of network usage—to schedule workloads that can harness available capacity.

**Supply Expansion**: Complementing demand management, they're expanding supply by "buying space and power, procuring fiber, and ensuring network infrastructure is ready for demand." They design the backbone "to allow for more flexible demand patterns as well as allow for more workload optionality" to serve potential spikes or changes.

## Important Caveats and Observations

It's worth noting that this presentation is focused on infrastructure rather than the LLMOps practices of model development, evaluation, and deployment. However, it provides essential context for understanding the hidden complexity behind running AI at scale. Many LLMOps discussions focus on the model development pipeline while overlooking the massive infrastructure requirements.

The presenters acknowledge that the "impact of large clusters and GenAI is yet to be learned" and that they "haven't yet fully flushed out what that means on the backbone." This suggests that even Meta, with its extensive infrastructure, is still learning how to best support the largest generative AI workloads.

The presentation is fundamentally honest about Meta's initial miscalculation—they expected AI traffic to stay local but were "caught off-guard" by cross-region requirements. This kind of candid admission is valuable for other organizations planning their AI infrastructure.

The focus on inference/serving as a "fast growing space" that is currently "modest on the backbone" suggests that as LLM inference becomes more widespread, backbone requirements will continue to evolve. This has implications for any organization planning to serve LLMs at scale.

## Implications for LLMOps Practitioners

While this case study is from a hyperscaler perspective, it offers lessons applicable to LLMOps at various scales:

- The complete AI/LLM lifecycle involves far more than just training and inference; data movement and placement are critical considerations that impact costs and performance
- Data freshness requirements for AI models can drive unexpected infrastructure costs
- Hardware heterogeneity creates real challenges for AI workloads, requiring careful capacity planning
- Cross-functional collaboration (network, storage, compute teams) is essential for optimizing AI infrastructure
- Observability and instrumentation of data flows is necessary to identify optimization opportunities
- Different AI workloads have different service requirements, and recognizing this enables more efficient resource utilization