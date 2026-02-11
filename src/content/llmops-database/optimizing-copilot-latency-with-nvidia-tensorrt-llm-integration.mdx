---
title: "Optimizing Copilot Latency with NVIDIA TensorRT-LLM Integration"
slug: "optimizing-copilot-latency-with-nvidia-tensorrt-llm-integration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67bc37f6707288e3beecaa7e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:01:30.957Z"
  createdOn: "2025-02-24T09:12:22.506Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "realtime-application"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "triton"
  - "pytorch"
  - "nvidia"
  - "microsoft-azure"
industryTags: "tech"
company: "Moveworks"
summary: "Moveworks addressed latency challenges in their enterprise Copilot by implementing NVIDIA's TensorRT-LLM optimization engine. The integration resulted in significant performance improvements, including a 2.3x increase in token processing speed (from 19 to 44 tokens per second), a reduction in average request latency from 3.4 to 1.5 seconds, and nearly 3x faster time to first token. These optimizations enabled more natural conversations and improved resource utilization in production."
link: "https://www.moveworks.com/us/en/resources/blog/moveworks-achieves-low-latency-with-nvidia-tensorrt-llm"
year: 2024
seo:
  title: "Moveworks: Optimizing Copilot Latency with NVIDIA TensorRT-LLM Integration - ZenML LLMOps Database"
  description: "Moveworks addressed latency challenges in their enterprise Copilot by implementing NVIDIA's TensorRT-LLM optimization engine. The integration resulted in significant performance improvements, including a 2.3x increase in token processing speed (from 19 to 44 tokens per second), a reduction in average request latency from 3.4 to 1.5 seconds, and nearly 3x faster time to first token. These optimizations enabled more natural conversations and improved resource utilization in production."
  canonical: "https://www.zenml.io/llmops-database/optimizing-copilot-latency-with-nvidia-tensorrt-llm-integration"
  ogTitle: "Moveworks: Optimizing Copilot Latency with NVIDIA TensorRT-LLM Integration - ZenML LLMOps Database"
  ogDescription: "Moveworks addressed latency challenges in their enterprise Copilot by implementing NVIDIA's TensorRT-LLM optimization engine. The integration resulted in significant performance improvements, including a 2.3x increase in token processing speed (from 19 to 44 tokens per second), a reduction in average request latency from 3.4 to 1.5 seconds, and nearly 3x faster time to first token. These optimizations enabled more natural conversations and improved resource utilization in production."
---

## Overview

Moveworks, an enterprise AI platform company focused on employee support and productivity solutions, published a technical blog post detailing their approach to reducing LLM inference latency in their "next-gen Copilot" product. The case study focuses specifically on their integration of NVIDIA's TensorRT-LLM engine to optimize large language model inference performance in their production environment. This represents a practical example of LLMOps in action, where a company must balance model capability with the operational requirements of serving real users at scale.

The Moveworks Copilot is an AI-powered conversational assistant designed to provide employee support across various enterprise functions including IT, HR, Finance, and more. As with many production LLM systems, the company faced the challenge of managing inference latency while maintaining the conversational quality that users expect from modern AI assistants.

## The Problem: Latency in Production LLM Systems

The core challenge Moveworks addressed was the inherent latency that comes with deploying large language models in production. Even sophisticated LLMs can suffer from processing delays that create frustrating lags, disrupting conversational flow and hindering productivity. This is a common challenge in LLMOps—the models that provide the best quality outputs are often the largest and slowest to run.

Moveworks identified two critical dimensions where latency impacts their product:

First, natural conversations require minimal delay between user input and AI response. Every millisecond of latency detracts from the conversational experience, potentially making the AI feel "clunky" rather than like a responsive colleague. This is particularly important for enterprise tools where user adoption depends on the experience being competitive with what users expect from consumer AI products.

Second, from an operational efficiency standpoint, lower latency enables higher throughput on existing infrastructure. This means the company can handle more concurrent conversations without costly horizontal scaling, directly impacting the economics of running LLMs at scale. This is a crucial LLMOps consideration—inference costs are often the largest ongoing expense for production LLM systems.

## The Solution: NVIDIA TensorRT-LLM Integration

Moveworks integrated NVIDIA's TensorRT-LLM engine into their inference pipeline. TensorRT-LLM is a specialized library designed to optimize LLM inference on NVIDIA GPUs, providing a collection of techniques to accelerate model execution without changing the model architecture or requiring retraining.

The key optimizations leveraged include:

**Optimized CUDA Kernels**: TensorRT-LLM provides custom-built CUDA kernels specifically designed for LLM operations. These kernels outperform the native implementations found in frameworks like Hugging Face Transformers by being more tightly optimized for the specific computational patterns found in transformer models.

**Multi-GPU Model Parallelism**: The engine enables tensor parallelism, allowing a single LLM to be distributed across multiple GPUs while maintaining low latency. This is essential for deploying state-of-the-art models that may exceed the memory capacity of a single GPU. Importantly, the approach maintains the low latency critical for production systems, which is often a challenge with naive model parallelism approaches.

**Flash-Decoding with Multi-Block Mode**: This technique fragments attention operations into smaller tasks that can be processed in parallel on GPUs. The benefit is reduced memory usage and processing time, which is especially valuable for longer-form conversations where attention computation becomes increasingly expensive.

**SmoothQuant**: This quantization technique reduces model size by converting weights and activations to smaller numerical formats. Quantization is a well-established technique in LLMOps for reducing model size and inference cost, though it can come with quality tradeoffs that need to be carefully evaluated.

**Additional Optimizations**: Moveworks also leveraged int8_kv_cache for efficient storage of intermediate key-value cache results, use_gpt_attention_plugin for attention operations tailored to NVIDIA GPUs, and use_gemm_plugin for accelerated matrix multiplication.

The integration was facilitated by TensorRT-LLM's Python API, which Moveworks notes allowed for quick customization and seamless integration with their existing LLM models. This is an important practical consideration—the migration path from standard Hugging Face models to optimized inference is relatively straightforward.

## Benchmark Results and Performance Improvements

Moveworks provides concrete benchmark data comparing their Copilot's performance with and without TensorRT-LLM optimizations. It's worth noting that these benchmarks are self-reported by the company in a marketing context (a blog post about their technology), so they should be considered with appropriate skepticism. However, the improvements are consistent with what NVIDIA claims for TensorRT-LLM in their own documentation.

**Token Throughput**: The system achieved 44 tokens per second with TensorRT-LLM compared to 19 tokens per second with native Hugging Face implementations—a 2.32x improvement. Higher throughput means more work can be done per unit of compute time.

**Average Request Latency**: Response times dropped from 3.4 seconds to 1.5 seconds—a 2.35x improvement. For conversational AI, this difference is significant, moving from a noticeably laggy experience to something approaching natural conversation speed.

**Time to First Token**: This metric improved from 0.8 seconds to 0.3 seconds—a 2.7x improvement. Time to first token is particularly important for streaming applications where users see output as it's generated. A faster first token creates the perception of near-instantaneous response, even if the full response takes time to complete.

These improvements translate to practical benefits: handling surges in demand without performance degradation, enhanced individual conversation quality, and optimized resource utilization that reduces infrastructure costs.

## LLMOps Considerations and Observations

This case study illustrates several important LLMOps principles and practices:

**Inference Optimization as a Core Competency**: For companies running LLMs at scale, optimizing inference is not optional—it directly impacts user experience and operational economics. Moveworks' investment in TensorRT-LLM integration demonstrates that competitive production LLM systems require more than just choosing a good model; they require deliberate effort to optimize the inference pipeline.

**Hardware-Software Co-optimization**: The optimizations described are specifically designed for NVIDIA GPUs. This highlights a broader trend in LLMOps where achieving peak performance requires tight coupling between model optimization techniques and the underlying hardware. Companies must make strategic choices about their GPU infrastructure and the corresponding software stack.

**Streaming and Time-to-First-Token**: The emphasis on time-to-first-token reflects the importance of streaming in production LLM applications. Modern conversational AI systems typically stream responses rather than waiting for complete generation, and optimizing for this pattern requires different considerations than batch processing.

**Quantization Tradeoffs**: The use of SmoothQuant and int8_kv_cache represents deliberate quality-performance tradeoffs. While the blog doesn't discuss quality impact, any quantization approach requires careful validation to ensure model outputs remain acceptable for the use case.

**Scalability Without Horizontal Scaling**: Moveworks emphasizes that lower latency allows them to handle more load on existing infrastructure. This is an important consideration for LLMOps cost management—vertical optimization through inference improvements can be more cost-effective than simply adding more servers.

## Critical Assessment

While the case study provides valuable technical details, several caveats should be considered:

The benchmarks are self-reported in a promotional context. Independent validation would strengthen the claims, though the improvements are consistent with NVIDIA's own performance claims for TensorRT-LLM.

The blog does not discuss any quality impact from the optimizations. Quantization and other optimizations can sometimes affect model output quality, and a complete assessment would include this dimension.

Specific model sizes, architectures, and GPU configurations used in benchmarks are not disclosed, making it difficult to fully contextualize the results.

The integration complexity and any challenges encountered are not discussed, which would be valuable for practitioners considering similar optimizations.

Despite these limitations, the case study provides a useful example of production LLM optimization practices and the concrete performance improvements achievable through systematic inference optimization.