---
title: "Mission-Critical LLM Inference Platform Architecture"
slug: "mission-critical-llm-inference-platform-architecture"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "678d71138387d6d1de7d61e4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:55:57.560Z"
  createdOn: "2025-01-19T21:39:31.331Z"
llmopsTags:
  - "high-stakes-application"
  - "healthcare"
  - "realtime-application"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "chunking"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "load-balancing"
  - "microservices"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "reliability"
  - "scalability"
  - "vllm"
  - "triton"
  - "pytorch"
  - "fastapi"
  - "nvidia"
  - "microsoft-azure"
  - "amazon-aws"
  - "google-gcp"
industryTags: "tech"
company: "Baseten"
summary: "Baseten has built a production-grade LLM inference platform focusing on three key pillars: model-level performance optimization, horizontal scaling across regions and clouds, and enabling complex multi-model workflows. The platform supports various frameworks including SGLang and TensorRT-LLM, and has been successfully deployed by foundation model companies and enterprises requiring strict latency, compliance, and reliability requirements. A key differentiator is their ability to handle mission-critical inference workloads with sub-400ms latency for complex use cases like AI phone calls."
link: "https://www.youtube.com/watch?v=KjH7Gl0_pq0"
year: 2025
seo:
  title: "Baseten: Mission-Critical LLM Inference Platform Architecture - ZenML LLMOps Database"
  description: "Baseten has built a production-grade LLM inference platform focusing on three key pillars: model-level performance optimization, horizontal scaling across regions and clouds, and enabling complex multi-model workflows. The platform supports various frameworks including SGLang and TensorRT-LLM, and has been successfully deployed by foundation model companies and enterprises requiring strict latency, compliance, and reliability requirements. A key differentiator is their ability to handle mission-critical inference workloads with sub-400ms latency for complex use cases like AI phone calls."
  canonical: "https://www.zenml.io/llmops-database/mission-critical-llm-inference-platform-architecture"
  ogTitle: "Baseten: Mission-Critical LLM Inference Platform Architecture - ZenML LLMOps Database"
  ogDescription: "Baseten has built a production-grade LLM inference platform focusing on three key pillars: model-level performance optimization, horizontal scaling across regions and clouds, and enabling complex multi-model workflows. The platform supports various frameworks including SGLang and TensorRT-LLM, and has been successfully deployed by foundation model companies and enterprises requiring strict latency, compliance, and reliability requirements. A key differentiator is their ability to handle mission-critical inference workloads with sub-400ms latency for complex use cases like AI phone calls."
---

## Overview

This case study is derived from a podcast conversation featuring Amir (co-founder of Baseten) and Ying (lead software engineer on the model performance team at Baseten), discussing their approach to production LLM inference. Baseten positions itself as a dedicated inference platform for mission-critical workloads, distinguishing itself from shared inference endpoints offered by competitors. The conversation provides deep insights into what it takes to run LLMs in production at scale, with particular focus on serving the massive DeepSeek V3 model and their adoption of SGLang as a serving framework.

## The DeepSeek V3 Challenge

DeepSeek V3 represents one of the most challenging models to serve in production. At 671 billion parameters using a Mixture of Experts (MoE) architecture, it pushes the boundaries of what's possible with current hardware. The model was released with FP8 quantization, which was a first for models of this scale—typically models are released in BF16 format.

The hardware requirements are substantial. Even with FP8 precision, the model requires approximately 671GB just for weights, plus additional memory for KV cache. This makes it impossible to run on standard H100 nodes (which have 640GB across 8 cards). Baseten opted for H200 GPUs or multi-node H100 configurations to serve this model. The sheer size creates operational challenges beyond just memory—loading times are extremely long, making debugging and performance benchmarking time-consuming affairs (though "not complicated, just slow" as one engineer noted).

A key technical challenge was supporting the blockwise FP8 kernel that DeepSeek V3 uses. At the time of deployment, even TensorRT-LLM didn't support this, requiring custom kernel implementation using Triton or other tools. This FP8 training approach pioneered by DeepSeek (building on earlier work by Llama/01.ai) is seen as a game-changer that will likely become more common in future model releases.

## SGLang as the Serving Framework

Baseten has invested significantly in SGLang as a serving framework, particularly for models like DeepSeek V3. The framework originated in 2023 as a frontend language for LLM programming but evolved into a full inference engine by mid-2024. The appeal of SGLang comes from its combination of performance (competitive with or better than vLLM) and developer-friendly architecture that makes customization and feature development easier than TensorRT-LLM.

Key SGLang optimizations relevant to production serving include:

**Radix Attention (Prefix Caching)**: SGLang pioneered prefix caching using a block size of 1 (compared to 32 in other frameworks), which increases cache hit rates. This is particularly valuable for Baseten's dedicated inference model where customers have finite sets of prompt prefixes (like system prompts) that are repeatedly used.

**MLA (Multi-Latent Attention)**: SGLang was one of the first frameworks to support this attention variant introduced in DeepSeek V2, along with DP attention optimizations for DeepSeek V3.

**Constrained Decoding with FSM**: SGLang supports structured output generation using finite state machines through integration with libraries like Outlines and XGrammar. The "jump forward" technique allows skipping token-by-token decoding when the output must follow certain rules, though this is disabled by default due to complexity of maintaining compatibility with other optimizations.

The choice between frameworks ultimately depends on use case: TensorRT-LLM offers best-in-class latency for latency-sensitive scenarios, SGLang provides excellent performance with easier customization, and vLLM has strong community support. Importantly, the SGLang team noted that NVIDIA's TensorRT-LLM team has promised to modularize their codebase so frameworks like SGLang can pick and choose components.

## Baseten's Three Pillars for Mission-Critical Inference

Amir articulated a framework for understanding what it takes to run mission-critical inference workloads, emphasizing that each pillar is necessary but not sufficient on its own:

**Pillar 1: Model-Level Performance**
This encompasses optimizations at the single-model, single-GPU level. The serving framework matters here, but so do techniques like speculative decoding (with draft models or Medusa heads). Critically, the framework supporting speculative decoding is just the beginning—teams must also train or fine-tune draft models using appropriate data to achieve high acceptance rates. Baseten implements speculative decoding with techniques that guarantee unchanged output (unlike quantization).

**Pillar 2: Horizontal Scaling Infrastructure**
When a single model replica can't handle traffic, horizontal scaling becomes essential—and this is fundamentally an infrastructure problem, not an ML problem. Standard Kubernetes autoscaling doesn't work for mission-critical inference workflows; Baseten has rebuilt many infrastructure components from scratch. Beyond single-cluster scaling, they've built multi-region and multi-cloud capabilities, allowing a single model to have replicas across different regions and cloud providers (e.g., 50 replicas in GCP East, 80 in AWS West, some in Oracle London). This addresses capacity limits within single regions and provides latency optimization for geographically distributed users.

**Pillar 3: Developer Experience and Workflow Enablement**
Baseten developed "Truss Chains" to enable multi-step, multi-model inference workflows with minimal latency. The example given was Bland AI's phone call application, which requires: speech-to-text transcription, multiple LLM calls for response generation, and text-to-speech synthesis. Orchestrating these as separate API calls introduces unacceptable network latency. With Truss Chains, models run independently with their own autoscaling but stream data directly between steps, achieving sub-400ms end-to-end latency for realistic AI phone calls.

## Dedicated vs. Shared Inference

Baseten explicitly differentiates from providers offering shared inference endpoints for popular open-source models. Their customers typically have:

- Custom models (fine-tuned or even pre-trained by foundation model companies)
- Strict latency and time-to-first-token requirements
- Need for P95/P99 latency guarantees without noisy neighbor problems
- Security and compliance requirements (HIPAA, SOC)
- Geographic requirements for compliance or latency reasons
- Bring-your-own-cloud scenarios where they manage inference on customer's committed cloud resources

Pricing is consumption-based (resources used) rather than per-token, reflecting their dedicated infrastructure model. They explicitly do not quantize models behind customers' backs—any quantization is done in conjunction with customer engineering teams with proper evaluation.

## Customer Patterns and Use Cases

Interest in DeepSeek V3 is notably coming from customers migrating from Claude, citing: rate limiting, price concerns, latency requirements, desire for model control (avoiding surprise model changes behind an API), and other factors. This differs from the pattern of upgrading from smaller open-source models.

Healthcare represents a significant vertical, with examples including fine-tuned Whisper models for medical transcription (understanding medical jargon) and document extraction models trained with human-in-the-loop data. The question of whether these specialized fine-tuned models will become obsolete with better reasoning models remains open, but Amir noted that demand for fine-tuning hasn't decreased.

## KV Cache-Aware Load Balancing

Beyond SGLang's radix attention, Baseten built additional infrastructure for KV cache-aware load balancing. When routing requests across dozens of replicas, rather than random assignment, they consider the state of KV cache in each replica to maximize cache hits. This is combined with other factors like queue depth and replica location for latency optimization.

## Technical Infrastructure Details

Baseten's Truss framework (open-source model packaging and deployment) has evolved significantly over 4-5 years. Originally designed with the principle "easy things should be easy, hard things should be possible," they initially struggled with the "hard things" use cases. Supporting foundation model companies as customers required deeper integrations than simple "two functions and voila" deployment. Truss supports multiple frameworks (TensorRT-LLM, vLLM, SGLang) and includes custom implementations where necessary—for example, they built their own version of Triton Inference Server for performance and reliability reasons.

The multi-cloud capability deserves emphasis: customers increasingly have committed resources across multiple cloud providers. Rather than expecting each to build their own multi-cloud inference orchestration, Baseten provides unified management with optional overflow to Baseten's own cloud when committed resources are exhausted.

## Community and Ecosystem Notes

The podcast highlighted interesting ecosystem dynamics: SGLang's creators (Lianmin Zheng and Ying Sheng) are XAI members of technical staff, explaining Grok's use of SGLang. XGrammar (for constrained decoding) was created by collaborators from the same academic network (Shanghai Jiaotong University) as the SGLang creators. SGLang grew from 2,000 to 7,000+ GitHub stars since mid-2024, with bi-weekly community meetings and published roadmaps.

The MoE architecture trend is notable: while American labs like Meta have focused on dense models (Llama 405B), Chinese labs have pushed MoE architectures. DeepSeek V3's success may accelerate MoE optimization work across the ecosystem, though training MoE models remains challenging (Meta reportedly tried and failed to release an MoE version of Llama).