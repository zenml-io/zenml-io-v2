---
title: "CPU-Based Deployment of Large MoE Models Using Intel Xeon 6 Processors"
slug: "cpu-based-deployment-of-large-moe-models-using-intel-xeon-6-processors"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68762a493267ac488bbd392a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:14:38.807Z"
  createdOn: "2025-07-15T10:15:37.070Z"
llmopsTags:
  - "code-generation"
  - "question-answering"
  - "chatbot"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "pytorch"
  - "docker"
  - "open-source"
  - "monitoring"
  - "meta"
  - "hugging-face"
industryTags: "tech"
company: "Lmsys"
summary: "Intel PyTorch Team collaborated with the SGLang project to develop a cost-effective CPU-only deployment solution for large Mixture of Experts (MoE) models like DeepSeek R1, addressing the challenge of high memory requirements that typically necessitate multiple expensive AI accelerators. Their solution leverages Intel Xeon 6 processors with Advanced Matrix Extensions (AMX) and implements highly optimized kernels for attention mechanisms and MoE computations, achieving 6-14x speedup in time-to-first-token (TTFT) and 2-4x speedup in time-per-output-token (TPOT) compared to llama.cpp, while supporting multiple quantization formats including BF16, INT8, and FP8."
link: "https://lmsys.org/blog/2025-07-14-intel-xeon-optimization/"
year: 2025
seo:
  title: "Lmsys: CPU-Based Deployment of Large MoE Models Using Intel Xeon 6 Processors - ZenML LLMOps Database"
  description: "Intel PyTorch Team collaborated with the SGLang project to develop a cost-effective CPU-only deployment solution for large Mixture of Experts (MoE) models like DeepSeek R1, addressing the challenge of high memory requirements that typically necessitate multiple expensive AI accelerators. Their solution leverages Intel Xeon 6 processors with Advanced Matrix Extensions (AMX) and implements highly optimized kernels for attention mechanisms and MoE computations, achieving 6-14x speedup in time-to-first-token (TTFT) and 2-4x speedup in time-per-output-token (TPOT) compared to llama.cpp, while supporting multiple quantization formats including BF16, INT8, and FP8."
  canonical: "https://www.zenml.io/llmops-database/cpu-based-deployment-of-large-moe-models-using-intel-xeon-6-processors"
  ogTitle: "Lmsys: CPU-Based Deployment of Large MoE Models Using Intel Xeon 6 Processors - ZenML LLMOps Database"
  ogDescription: "Intel PyTorch Team collaborated with the SGLang project to develop a cost-effective CPU-only deployment solution for large Mixture of Experts (MoE) models like DeepSeek R1, addressing the challenge of high memory requirements that typically necessitate multiple expensive AI accelerators. Their solution leverages Intel Xeon 6 processors with Advanced Matrix Extensions (AMX) and implements highly optimized kernels for attention mechanisms and MoE computations, achieving 6-14x speedup in time-to-first-token (TTFT) and 2-4x speedup in time-per-output-token (TPOT) compared to llama.cpp, while supporting multiple quantization formats including BF16, INT8, and FP8."
---

## Overview

This case study represents a significant collaboration between Intel PyTorch Team and the SGLang project (developed by Lmsys) to address one of the most pressing challenges in modern LLMOps: the cost-effective deployment of large Mixture of Experts (MoE) models in production environments. The primary focus was on DeepSeek R1, a massive 671B parameter model that typically requires 8x to 16x high-end AI accelerators for deployment, making it prohibitively expensive for many organizations.

The solution developed provides a CPU-only deployment approach using Intel's 6th generation Xeon Scalable Processors, offering a fractional cost alternative while maintaining competitive performance. This work addresses a critical gap in the LLMOps ecosystem where the deployment costs of large language models often exceed the reach of smaller organizations and research institutions.

## Technical Architecture and Implementation

### SGLang Integration and CPU Backend Development

The collaboration resulted in native CPU backend support for SGLang, Intel's serving framework for large language models. This integration required substantial engineering effort to optimize the entire inference pipeline for CPU architectures. The team implemented support for multiple quantization formats including BF16, INT8, and FP8 for both dense Feed-Forward Networks (FFNs) and sparse FFNs used in MoE architectures.

The CPU backend leverages Intel's Advanced Matrix Extensions (AMX), a specialized instruction set designed for accelerating matrix operations commonly found in deep learning workloads. This hardware acceleration proves crucial for achieving competitive performance on CPU-only deployments, as matrix multiplications constitute the computational bottleneck in transformer inference.

### Attention Mechanism Optimization

The implementation tackles two critical components of the attention mechanism: Extend Attention for the prefill phase and Decode Attention for the generation phase. The team adapted the FlashAttention algorithm specifically for CPU architectures, carefully mapping GPU-optimized kernels to CPU intrinsics.

For the prefill phase, they implemented a sophisticated approach that divides the query sequence into prefix and extend components. The prefix represents historical sequences where attention forms a rectangular pattern, while the extend component handles newly added prompts with triangular attention patterns. This optimization reduces redundant computation and improves cache efficiency.

The decode attention implementation addresses the inherent parallelization challenges when query sequence length reduces to one during generation. They implemented FlashDecoding algorithm that chunks the key-value sequence into multiple splits, increasing parallelism opportunities. This approach proves particularly important for maintaining throughput during the generation phase.

### Multi-head Latent Attention (MLA) Specialization

DeepSeek R1 employs Multi-head Latent Attention, a novel attention mechanism that shares tensor storage between keys and values. The team implemented several critical optimizations specifically for MLA on CPU architectures. Their "Load Once Pack Twice" strategy exploits the shared storage by fetching key-value caches through lookup tables with prefetching, then simultaneously packing data into two thread-local buffers with different formats required for matrix operations.

The head folding optimization takes advantage of MLA's weight absorption in the decode phase, which reduces the number of attention heads to one for both keys and values. This allows folding the head dimension into matrix multiplication operations, increasing computational intensity and improving hardware utilization.

These MLA-specific optimizations demonstrate the importance of model-aware deployment strategies in LLMOps, where understanding the architectural nuances of specific models enables significant performance improvements.

### Mixture of Experts (MoE) Optimization

The MoE implementation represents one of the most challenging aspects of the deployment, as these layers contribute the majority of model weights in DeepSeek R1. The team moved beyond naive sequential expert processing to implement sophisticated batching and sorting strategies that improve computational efficiency.

Their approach involves sorting activation indices by expert assignment and chunking them into blocks for parallel processing. This strategy, borrowed from GPU implementations, required careful adaptation for CPU architectures with different memory hierarchies and parallelization patterns.

The SiLU fusion optimization demonstrates advanced kernel-level engineering, where they implemented custom GEMM kernels that operate on concatenated weight matrices, allowing fusion of the SiLU activation function with matrix multiplication. This eliminates additional memory operations and improves computational efficiency.

For quantized inference, they implemented dynamic quantization fusion that combines BF16 to UINT8 conversion with activation fetching. This approach requires sophisticated handling of different quantization formats, as AVX512-VNNI only supports unsigned-signed integer combinations, necessitating compensation factors for proper mathematical equivalence.

### Advanced Quantization Support

The FP8 implementation presents particular challenges as existing x86 platforms lack native FP8 support. The team developed an emulation approach that converts FP8 weights to BF16 format for computation while maintaining the memory footprint advantages of FP8 storage.

Their vectorized conversion approach required careful trade-offs between accuracy and performance. They implemented optimizations that skip certain edge case handling (NaN checks and denormal number processing) to achieve acceptable conversion speeds, reducing conversion overhead by approximately 50%.

The weight-only quantization (WOQ) aware cache blocking strategy demonstrates sophisticated memory hierarchy optimization. They implemented a zigzag pattern for accessing weight blocks, ensuring that expensive data type conversions occur only once per block while maintaining data locality in L2 cache.

## Performance Engineering and Optimization

### Memory Bandwidth Optimization

The team achieved 85% memory bandwidth efficiency with their highly optimized MoE kernels, translating to 1.45TB/s effective memory bandwidth on Multiplexed Rank Dual Inline Memory Modules (MRDIMMs). This efficiency level approaches theoretical hardware limits and demonstrates the effectiveness of their optimization strategies.

Memory bandwidth optimization required careful attention to data layout, prefetching strategies, and cache hierarchy utilization. Their implementation demonstrates how CPU-based inference can achieve competitive performance through sophisticated software optimization, even when competing against specialized AI accelerators.

### Multi-NUMA Parallelism

The multi-NUMA implementation addresses the challenges of modern server architectures where memory access patterns significantly impact performance. They mapped GPU-style tensor parallelism to multi-NUMA CPU configurations, ensuring that processors primarily access local memory while minimizing expensive remote memory operations.

Their custom communication primitives, implemented through shared memory approaches, avoid the overhead of traditional distributed computing frameworks. This implementation achieves communication overhead of merely 3% of end-to-end execution time, demonstrating the effectiveness of NUMA-aware deployment strategies.

## Production Deployment Considerations

### Performance Characteristics

The benchmarking results demonstrate significant improvements over existing CPU-based inference solutions. Compared to llama.cpp, a popular CPU inference framework, their implementation achieves 6-14x speedup in time-to-first-token (TTFT) and 2-4x speedup in time-per-output-token (TPOT) across various model sizes.

The TTFT improvements prove particularly significant for interactive applications where user experience depends on response latency. The smaller improvements in TPOT reflect the memory bandwidth-bound nature of the generation phase, where computational optimizations provide diminishing returns compared to memory access optimizations.

### Scalability and Resource Management

The implementation supports models ranging from 3B to 671B parameters, demonstrating scalability across different deployment scenarios. For smaller models like Llama-3.2-3B, single-socket deployment proves optimal, while larger models benefit from dual-socket configurations with careful NUMA topology management.

The tensor parallelism implementation enables horizontal scaling across multiple CPU sockets, providing a cost-effective alternative to GPU-based scaling. This approach proves particularly valuable for organizations with existing CPU infrastructure who want to deploy large language models without significant hardware investments.

## Limitations and Production Considerations

### Current Constraints

The implementation currently requires Intel AMX support, limiting compatibility to recent Intel processor generations. This hardware dependency represents a significant constraint for organizations with existing CPU infrastructure based on older architectures.

Python overhead remains a bottleneck for low-concurrency scenarios, with the team exploring graph mode compilation through torch.compile to address this limitation. The preliminary results indicate potential for additional 10% improvements in TPOT, though this optimization remains in development.

### Future Development Directions

The team identifies several areas for future enhancement, including data parallel MLA implementation that could reduce duplicate key-value cache access across different ranks. This optimization, already implemented in GPU deployments, could provide additional performance improvements for CPU-based inference.

The exploration of GPU/CPU hybrid execution patterns, inspired by KTransformers, represents an interesting direction for cost-optimized deployment. This approach could leverage CPU resources for MoE computations while utilizing GPU acceleration for attention mechanisms, potentially providing optimal cost-performance trade-offs.

## Industry Impact and Adoption

### Cost-Effectiveness Analysis

The primary value proposition lies in democratizing access to large language model deployment. By providing CPU-only deployment options, the solution enables organizations to deploy sophisticated models without investing in expensive AI accelerator hardware. This cost reduction could significantly impact the adoption of large language models across various industries and use cases.

The fractional cost claim requires careful evaluation in production contexts, as total cost of ownership includes factors beyond hardware acquisition costs, such as operational expenses, maintenance, and performance trade-offs. However, the demonstrated performance improvements suggest that CPU-based deployment could be viable for many production scenarios.

### Open Source Integration

The full upstream integration into SGLang's main branch demonstrates commitment to open-source collaboration and community adoption. This integration ensures that the optimizations remain accessible to the broader community and receive ongoing maintenance and development support.

The extensive documentation and installation guides provided indicate a mature approach to production deployment, with clear instructions for various model configurations and deployment scenarios. This level of documentation proves crucial for adoption in production environments where reliability and reproducibility are paramount.

## Technical Assessment

### Engineering Quality

The implementation demonstrates sophisticated understanding of both hardware architecture and software optimization principles. The attention to detail in areas such as cache blocking, vectorization, and memory hierarchy optimization suggests high-quality engineering suitable for production deployment.

The comprehensive benchmarking approach, including fair comparisons with existing solutions and detailed performance breakdowns, provides confidence in the reported improvements. The team's acknowledgment of limitations and ongoing development areas demonstrates realistic assessment of the solution's current state.

### Production Readiness

While the implementation shows promising results, several factors require consideration for production deployment. The hardware dependency on Intel AMX limits deployment flexibility, and the ongoing development of optimizations like graph mode compilation suggests that the solution continues to evolve.

The comprehensive testing across multiple model sizes and configurations indicates readiness for experimental production deployment, particularly for organizations with compatible hardware infrastructure and tolerance for emerging technologies. However, organizations should carefully evaluate their specific performance requirements and deployment constraints before committing to CPU-only deployment strategies.