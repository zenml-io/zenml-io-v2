---
title: "Optimizing vLLM for High-Throughput Embedding Inference at Scale"
slug: "optimizing-vllm-for-high-throughput-embedding-inference-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "687636a179c00796695d4364"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:13:22.473Z"
  createdOn: "2025-07-15T11:08:17.161Z"
llmopsTags:
  - "fraud-detection"
  - "data-analysis"
  - "realtime-application"
  - "high-stakes-application"
  - "question-answering"
  - "embeddings"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "semantic-search"
  - "vllm"
  - "pytorch"
  - "kubernetes"
  - "microservices"
  - "api-gateway"
  - "scaling"
  - "monitoring"
  - "nvidia"
  - "amazon-aws"
industryTags: "tech"
company: "Snowflake"
summary: "Snowflake faced performance bottlenecks when scaling embedding models for their Cortex AI platform, which processes trillions of tokens monthly. Through profiling vLLM, they identified CPU-bound inefficiencies in tokenization and serialization that left GPUs underutilized. They implemented three key optimizations: encoding embedding vectors as little-endian bytes for faster serialization, disaggregating tokenization and inference into a pipeline, and running multiple model replicas on single GPUs. These improvements delivered 16x throughput gains for short sequences and 4.2x for long sequences, while reducing costs by 16x and achieving 3x throughput improvement in production."
link: "https://www.snowflake.com/en/engineering-blog/embedding-inference-arctic-16x-faster/"
year: 2025
seo:
  title: "Snowflake: Optimizing vLLM for High-Throughput Embedding Inference at Scale - ZenML LLMOps Database"
  description: "Snowflake faced performance bottlenecks when scaling embedding models for their Cortex AI platform, which processes trillions of tokens monthly. Through profiling vLLM, they identified CPU-bound inefficiencies in tokenization and serialization that left GPUs underutilized. They implemented three key optimizations: encoding embedding vectors as little-endian bytes for faster serialization, disaggregating tokenization and inference into a pipeline, and running multiple model replicas on single GPUs. These improvements delivered 16x throughput gains for short sequences and 4.2x for long sequences, while reducing costs by 16x and achieving 3x throughput improvement in production."
  canonical: "https://www.zenml.io/llmops-database/optimizing-vllm-for-high-throughput-embedding-inference-at-scale"
  ogTitle: "Snowflake: Optimizing vLLM for High-Throughput Embedding Inference at Scale - ZenML LLMOps Database"
  ogDescription: "Snowflake faced performance bottlenecks when scaling embedding models for their Cortex AI platform, which processes trillions of tokens monthly. Through profiling vLLM, they identified CPU-bound inefficiencies in tokenization and serialization that left GPUs underutilized. They implemented three key optimizations: encoding embedding vectors as little-endian bytes for faster serialization, disaggregating tokenization and inference into a pipeline, and running multiple model replicas on single GPUs. These improvements delivered 16x throughput gains for short sequences and 4.2x for long sequences, while reducing costs by 16x and achieving 3x throughput improvement in production."
---

This case study details Snowflake's comprehensive approach to optimizing embedding model inference at enterprise scale within their Cortex AI platform. Snowflake operates one of the largest AI inference workloads in the industry, processing trillions of tokens per month across both real-time and batch workloads to power semantic search, recommendations, and fraud detection capabilities. The company's Cortex AI suite includes agents, search, and analytics functions that rely heavily on embedding models to make data searchable and meaningful for real-time applications.

The technical challenge emerged when Snowflake benchmarked their embedding models using vLLM, a popular open-source inference framework. Despite expectations of high performance, they discovered significant bottlenecks that resulted in poor GPU utilization and suboptimal throughput. This presented a critical production challenge, as inefficient inference directly impacts both user experience and operational costs at Snowflake's scale of operation.

To diagnose the performance issues, Snowflake's engineering team conducted extensive profiling using Python runtime traces and flame graphs. Their analysis revealed that the actual GPU inference (embed() function) consumed only 10% of total compute time, while the remaining 90% was spent on CPU-bound tasks. This finding was particularly concerning because it indicated massive underutilization of expensive GPU resources, which directly translates to higher operational costs and reduced service capacity.

The profiling identified two primary bottlenecks in the existing vLLM implementation. First, tokenization overhead created significant delays because vLLM processed prompts sequentially - tokenizing input strings on CPU before launching GPU inference. This sequential processing meant GPUs remained idle during tokenization, creating "bubbles" in the GPU schedule that severely limited throughput. Second, data serialization became a major bottleneck when vLLM operated behind a gRPC frontend, which Snowflake uses to support multi-tenant serving, multiple programming languages, and dynamic model swapping for surging demand. The conversion of embedding outputs from Python List[float32] to Protobuf's repeated float format introduced substantial latency, likely due to Python's Global Interpreter Lock (GIL) and lack of SIMD vectorization in Python Protobuf.

To address these bottlenecks, Snowflake developed three key optimizations that collectively transformed their inference performance. The first optimization tackled the data serialization bottleneck by encoding embedding vectors as little-endian bytes rather than using standard Protobuf serialization. This approach leverages the fact that little-endian is the native endianness on most instruction set architectures, avoiding memory copy or byte-swapping steps. They further accelerated serialization by implementing vectorization through NumPy, which applies operations to entire arrays at once and leverages low-level optimizations and SIMD instructions while avoiding Python's per-element overhead.

The second optimization addressed the tokenization bottleneck by disaggregating tokenization and inference into a two-stage pipeline. Instead of sending raw text strings to vLLM, they implemented pretokenization where token IDs are passed directly to vLLM. This enables pipeline parallelism where tokenization and inference can run in parallel across different requests, even though they remain sequential within each individual request. This architectural change eliminated GPU idle time during tokenization, significantly improving overall throughput.

The third optimization targeted the persistent underutilization that remained even after improving tokenization and serialization. Embedding models typically have fewer parameters and shorter runtimes compared to autoregressive LLMs, which means a single instance often leaves GPU resources underused. Snowflake's solution involved running multiple replicas of the same model on a single GPU. These replicas serve inference requests concurrently, better utilizing available GPU resources that would otherwise be idle due to CPU and data-transfer bottlenecks.

The implementation of these optimizations in production required careful engineering to maintain system reliability and performance. Snowflake's production environment uses A10g GPUs for embedding inference, reserving more powerful GPUs like H200 for models with hundreds of billions of parameters due to industry-wide supply shortages. Their benchmarking focused on the snowflake-arctic-embed-m-v1.5 model, which is the most popular embedding model on their platform, using 512-token sequences to match typical customer usage patterns.

The results of these optimizations were substantial and measurable. In Snowflake's production Cortex AI environment, they achieved a 3x throughput improvement, delivering sustained throughput of 230,000 tokens per second. Each optimization contributed incrementally to this improvement, demonstrating the cumulative effect of addressing multiple bottlenecks simultaneously. More impressively, when extended to open-source benchmarking on H200 GPUs, the optimizations delivered 16x throughput gains for short sequences (50 tokens) and 4.2x gains for long sequences (512 tokens) compared to baseline vLLM performance.

The cost implications of these improvements are significant for enterprise-scale deployments. The 16x throughput improvement for short sequences translates directly to 16x cost reduction, as calculated based on AWS GPU instance pricing. This demonstrates that pushing embedding throughput on higher-end H200 GPUs can actually result in lower per-token costs than using supposedly more cost-efficient A10g GPUs, challenging conventional assumptions about price-performance optimization in AI inference.

From an LLMOps perspective, this case study illustrates several critical principles for production AI systems. First, it demonstrates the importance of comprehensive profiling and monitoring in identifying performance bottlenecks that may not be immediately apparent. The discovery that 90% of compute time was spent on CPU tasks rather than GPU inference could only be identified through systematic profiling. Second, it shows how architectural decisions around model serving can have profound impacts on system performance, as evidenced by the gRPC serialization bottleneck.

The case study also highlights the complexity of optimizing inference pipelines, where multiple components must work together efficiently. The solution required optimizations across serialization, tokenization, and GPU utilization, demonstrating that successful LLMOps often requires holistic system optimization rather than focusing on individual components. The disaggregation of tokenization and inference into a pipeline represents a sophisticated approach to parallel processing that maximizes resource utilization.

Snowflake's decision to open-source these improvements as part of Arctic Inference reflects a mature approach to LLMOps that recognizes the value of community collaboration in advancing inference optimization techniques. This contribution allows other organizations to benefit from these optimizations and potentially contribute further improvements, creating a positive feedback loop for the entire ecosystem.

The production deployment considerations are also noteworthy. Snowflake's use of gRPC for multi-tenant serving, support for multiple programming languages, and dynamic model swapping represents real-world requirements that many academic benchmarks don't address. The fact that these enterprise requirements initially created performance bottlenecks, but were then optimized while maintaining functionality, demonstrates the practical challenges of production LLMOps.

The case study also provides insights into resource allocation and capacity planning for large-scale AI systems. The ability to run multiple model replicas on a single GPU represents an important technique for maximizing hardware utilization, particularly relevant given the high cost and limited availability of AI-optimized hardware. This approach allows organizations to scale inference capacity without proportionally increasing hardware costs.

Overall, this case study represents a comprehensive example of production LLMOps engineering, demonstrating how systematic performance analysis, architectural optimization, and careful implementation can deliver substantial improvements in both performance and cost efficiency. The results show that significant gains are possible even with mature, widely-used frameworks like vLLM, provided that organizations invest in deep understanding of their specific use cases and performance characteristics. The open-source contribution of these improvements also demonstrates how successful LLMOps practices can benefit the broader AI community.