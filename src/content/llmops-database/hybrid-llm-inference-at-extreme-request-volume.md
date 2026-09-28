---
title: "Hybrid LLM Inference at Extreme Request Volume"
slug: "hybrid-llm-inference-at-extreme-request-volume"
draft: false
llmopsTags:
  - "realtime-application"
  - "unstructured-data"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "evals"
  - "error-handling"
  - "kubernetes"
  - "vllm"
  - "api-gateway"
  - "monitoring"
  - "scaling"
  - "load-balancing"
  - "reliability"
  - "scalability"
  - "databricks"
  - "amazon-aws"
industryTags: "tech"
company: "Grammarly"
summary: "Grammarly operates an ambient grammatical error correction (GEC) system that analyzes users’ writing continuously and must return suggestions with near-instantaneous latency. To support approximately 40 million daily active users and roughly 100 billion LLM requests per week, the company consolidated several smaller models into a larger model, moved serving from ECS to Kubernetes on Amazon EKS, adopted vLLM with continuous batching, and applied quantization and speculative decoding. It then combined internal serving with Databricks Foundation Model API deployments, validating the external service through shadow traffic, a hardened high-throughput gateway, and production A/B testing. The resulting hybrid architecture provides redundancy and elasticity, although it adds operational complexity and leaves the company dependent on careful vendor evaluation, traffic failover, and ongoing cost and quality monitoring."
link: "https://blog.superhuman.com/scaling-gec-inference/"
year: 2026
seo:
  title: "Grammarly: Hybrid LLM Inference at Extreme Request Volume - ZenML LLMOps Database"
  description: "Grammarly operates an ambient grammatical error correction (GEC) system that analyzes users’ writing continuously and must return suggestions with near-instantaneous latency. To support approximately 40 million daily active users and roughly 100 billion LLM requests per week, the company consolidated several smaller models into a larger model, moved serving from ECS to Kubernetes on Amazon EKS, adopted vLLM with continuous batching, and applied quantization and speculative decoding. It then combined internal serving with Databricks Foundation Model API deployments, validating the external service through shadow traffic, a hardened high-throughput gateway, and production A/B testing. The resulting hybrid architecture provides redundancy and elasticity, although it adds operational complexity and leaves the company dependent on careful vendor evaluation, traffic failover, and ongoing cost and quality monitoring."
  canonical: "https://www.zenml.io/llmops-database/hybrid-llm-inference-at-extreme-request-volume"
  ogTitle: "Grammarly: Hybrid LLM Inference at Extreme Request Volume - ZenML LLMOps Database"
  ogDescription: "Grammarly operates an ambient grammatical error correction (GEC) system that analyzes users’ writing continuously and must return suggestions with near-instantaneous latency. To support approximately 40 million daily active users and roughly 100 billion LLM requests per week, the company consolidated several smaller models into a larger model, moved serving from ECS to Kubernetes on Amazon EKS, adopted vLLM with continuous batching, and applied quantization and speculative decoding. It then combined internal serving with Databricks Foundation Model API deployments, validating the external service through shadow traffic, a hardened high-throughput gateway, and production A/B testing. The resulting hybrid architecture provides redundancy and elasticity, although it adds operational complexity and leaves the company dependent on careful vendor evaluation, traffic failover, and ongoing cost and quality monitoring."
notion:
  pageId: "3e2f8dff-2538-8008-b366-fa8dca9b5fda"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-21T14:42:00.000Z"
  lastEditedTime: "2026-09-21T14:42:00.000Z"
  publishedAt: "2026-09-28T08:26:15Z"
---

## Overview

Grammarly’s grammatical error correction (GEC) capability is an always-on production ML service rather than a feature that users explicitly invoke. It continuously analyzes writing and presents possible corrections as red underlines, so latency directly affects the writing experience: a slow system can interrupt the user’s workflow. The case describes a system serving approximately 40 million daily active users and roughly 100 billion LLM requests per week. To meet that demand, Grammarly evolved from a collection of specialized models to a larger consolidated model and then adopted a hybrid serving strategy that combines internally managed infrastructure with Databricks Foundation Model API deployments.

The main result is not a single infrastructure replacement but an operating model for resilience. High-volume models are served through the external platform, while specialized, experimental, or lower-volume models remain on internal infrastructure. This provides alternative capacity and a path to shift traffic when one environment encounters a capacity, autoscaling, or quality problem. The approach also introduces additional complexity, reduced direct control over part of the serving stack, and the need for rigorous vendor and cost evaluation. The article reports that the hybrid system powers production traffic, but it does not provide detailed before-and-after latency, correctness, availability, or cost figures, so the scale and architectural lessons are better supported than any precise claim of quantitative improvement.

## Problem and production requirements

GEC differs from many generative AI applications because inference is ambient. Users do not submit a prompt and wait for a response; the service runs continually as they type. Suggestions therefore need to appear almost instantaneously. At the same time, the system must absorb traffic spikes, operate despite GPU shortages and changing cloud capacity, and control serving costs at very high request volume. These requirements make capacity planning, scheduling, autoscaling, failover, and regression detection central LLMOps concerns.

The original GEC pipeline used several small, specialized models, generally ranging from tens to hundreds of millions of parameters. That design allowed individual components to be optimized for separate correction objectives, but it created coordination problems. Different models could propose incompatible edits to the same sentence, requiring another model to choose among suggestions. For example, one model might correct “You have an issues” by changing “issues” to “issue,” while another might remove “an.” Applying both naively could produce an incorrect result. The additional arbitration logic increased system complexity and operational overhead.

## Model and serving architecture

Grammarly consolidated the pipeline into a single model with more than one billion parameters. A larger model could have increased GPU memory use and reduced per-machine throughput, so the consolidation was paired with serving and infrastructure optimization. The source reports that, in practice, the larger-model design was cost-competitive and in some cases more efficient than the former multi-model system when supported by the new infrastructure, although it does not provide the numerical benchmark behind that conclusion.

The company moved from Amazon Elastic Container Service to Kubernetes through Amazon EKS. Under the earlier arrangement, each service used a dedicated pool of GPU instances and a particular instance type. Kubernetes allowed different instance types, including types from different instance families, to participate in the same workload. This gave the team more flexibility to use available AWS capacity for a computationally heavier model. The benefit was therefore not simply container orchestration; it was improved placement and capacity flexibility across heterogeneous GPU resources.

For model serving, the team selected vLLM after considering extensions to its internal inference framework and other open-source alternatives. The stated reason was serving efficiency, particularly the ability to pack more concurrent requests onto existing GPUs through continuous batching. vLLM also supported a broad range of model architectures, which preserved flexibility during experimentation. The serving layer additionally used 8-bit weight storage through quantization to improve throughput without an observed impact on output quality, as reported in the source. Speculative decoding reduced latency by allowing tokens to be predicted and verified in groups. Together, these techniques addressed throughput, memory utilization, and response-time constraints, but they were applied in the context of a particular model and workload rather than presented as universally beneficial settings.

## Introducing a managed inference provider

As request volume grew, Grammarly deliberately diversified where inference ran. The motivation was to obtain additional elasticity, redundancy, and multi-region resilience while reducing the amount of internal effort spent on capacity planning, performance tuning, and autoscaling. The organization also had a broader goal of bringing data ingestion, processing, training, and inference closer together on a unified data platform, reducing data silos and maintenance burdens.

The external option was not treated as a plug-and-play replacement. Managed serving could reduce operational burden, but it also meant less direct visibility and control over the tuning of a core production path. The team was uncertain whether an external platform could meet the combined requirements for real-time latency, suggestion correctness, and manageable cost. It therefore evaluated Databricks using its Foundation Model API against the existing internal inference engine and real production traffic patterns.

## Evaluation and deployment process

The evaluation began with shadow traffic. Duplicate production requests were sent to the external system while the internal service continued to generate the user-visible response. This allowed the team to examine stability and scale without exposing customers to an unvalidated serving path. Shadowing is particularly useful for an ambient feature because it separates infrastructure observation from user-facing risk, although it cannot fully reproduce the effects of live traffic routing, production feedback, or provider-side autoscaling decisions.

Before an A/B test, Grammarly expanded and hardened its internal LLM gateway or proxy. The gateway handled authentication and traffic routing across providers and had to scale from approximately 1,000 requests per second to approximately 100,000 requests per second—almost a 100-fold increase. This illustrates that a provider migration can move the bottleneck rather than remove it: routing, authentication, observability, request duplication, and failover infrastructure must themselves be designed for production scale.

The A/B test used internal serving as a control and exposed a small percentage of traffic to the candidate systems. The principal evaluation dimensions were latency, suggestion correctness, and cost. During testing, an upstream, silent image-serving update temporarily degraded output quality, while autoscaling edge cases produced latency spikes. Because traffic was introduced gradually and could be redirected, Grammarly was able to shift requests back to internal systems while investigating. The incidents also led to changes in autoscaling heuristics and deployment guardrails in collaboration with Databricks. Thus, the experiment evaluated operational behavior and the vendor’s ability to diagnose problems, not merely benchmarked model responses.

Cost required a longer observation window than latency or correctness. The team measured a full week of production-like traffic and compared total weekly cost with request and token volumes to derive normalized cost-per-token figures. This accounted for burst traffic, autoscaling behavior, and idle capacity, which can be missed by short load tests. The reported process is a sounder basis for economic comparison than a nominal per-token price alone, but the source does not disclose the resulting prices or the final cost differential.

## Hybrid production design

After testing, Grammarly assigned the highest-volume models to Databricks and retained highly specialized, experimental, or lower-volume models on internal infrastructure. This division reflects different operational needs: the external platform supplies scale and managed capacity for predictable high-volume workloads, while the internal stack preserves control and visibility for models that are changing rapidly or have unusual requirements.

The two environments also provide a form of redundancy. If demand spikes or capacity becomes constrained in one system, traffic can be shifted to the other, subject to compatibility and available headroom. The team gradually moved production traffic over several weeks and monitored for regressions before committing most traffic. This staged rollout, combined with shadowing, A/B testing, and failback capability, reduced the blast radius of infrastructure and quality problems.

## Results and tradeoffs

The case demonstrates that large-scale LLMOps is as much an orchestration and reliability problem as a model-selection problem. Kubernetes enabled more flexible GPU utilization; vLLM and continuous batching improved serving efficiency; quantization and speculative decoding targeted throughput and latency; and the gateway, traffic-splitting controls, and deployment guardrails enabled controlled experimentation. The hybrid architecture then combined the operational strengths of a managed provider with the control of internal infrastructure.

The tradeoff is persistent multi-system complexity. Grammarly must operate and observe both internal and external paths, maintain routing and authentication, compare costs over realistic traffic patterns, and preserve a safe fallback when provider behavior changes. External dependencies can introduce silent updates or autoscaling behavior that is difficult to control directly. The case therefore supports a balanced conclusion: managed inference can be valuable at extreme scale, but only when treated as an experimentally validated component with explicit quality, latency, cost, and failover requirements.

The broader lessons are to define workload-specific benchmarks before selecting a provider, test with real or production-like traffic rather than relying on vendor claims, assess the provider’s operational response as well as its technology, and avoid assuming that “build versus buy” is the only architectural choice. For this GEC workload, “build and buy” produced a more resilient arrangement, but the benefit depended on the substantial LLMOps work required to make routing, monitoring, evaluation, and rollback reliable.
