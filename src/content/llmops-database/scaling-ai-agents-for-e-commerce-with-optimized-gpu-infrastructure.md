---
title: "Scaling AI Agents for E-commerce with Optimized GPU Infrastructure"
slug: "scaling-ai-agents-for-e-commerce-with-optimized-gpu-infrastructure"
draft: false
llmopsTags:
  - "content-moderation"
  - "classification"
  - "fine-tuning"
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "model-optimization"
  - "kubernetes"
  - "vllm"
  - "triton"
  - "pytorch"
  - "fastapi"
  - "monitoring"
  - "scaling"
  - "orchestration"
  - "google-gcp"
  - "nvidia"
industryTags: "e-commerce"
company: "Flipkart / Baseten"
summary: "This case study presents how Flipkart, India's leading e-commerce platform serving 500 million customers, optimized their AI-powered catalog enrichment system using Google Cloud's AI Hypercomputer architecture, specifically the G4 instances with NVIDIA RTX 6,000 GPUs. The problem involved scaling image and video synthesis workloads for catalog enrichment while managing GPU resource constraints and costs. By implementing multi-layer optimizations including enhanced parallelism, custom media pipeline architecture, P2P network acceleration, and GPU virtualization through MIG configurations, Flipkart achieved a 50% reduction in both latency and costs while increasing throughput. Separately, Baseten, an inference platform running on Google Cloud, demonstrated how their infrastructure optimizations helped customers achieve 2.5x improvement in token throughput and 4x improvement in time-to-first-token for various AI agent use cases including voice agents, coding agents, and research agents."
link: "https://www.youtube.com/watch?v=f2rcT0vTcSE&list=PLFZU5nT4APFA&index=8"
year: 2026
seo:
  title: "Flipkart / Baseten: Scaling AI Agents for E-commerce with Optimized GPU Infrastructure - ZenML LLMOps Database"
  description: "This case study presents how Flipkart, India's leading e-commerce platform serving 500 million customers, optimized their AI-powered catalog enrichment system using Google Cloud's AI Hypercomputer architecture, specifically the G4 instances with NVIDIA RTX 6,000 GPUs. The problem involved scaling image and video synthesis workloads for catalog enrichment while managing GPU resource constraints and costs. By implementing multi-layer optimizations including enhanced parallelism, custom media pipeline architecture, P2P network acceleration, and GPU virtualization through MIG configurations, Flipkart achieved a 50% reduction in both latency and costs while increasing throughput. Separately, Baseten, an inference platform running on Google Cloud, demonstrated how their infrastructure optimizations helped customers achieve 2.5x improvement in token throughput and 4x improvement in time-to-first-token for various AI agent use cases including voice agents, coding agents, and research agents."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-agents-for-e-commerce-with-optimized-gpu-infrastructure"
  ogTitle: "Flipkart / Baseten: Scaling AI Agents for E-commerce with Optimized GPU Infrastructure - ZenML LLMOps Database"
  ogDescription: "This case study presents how Flipkart, India's leading e-commerce platform serving 500 million customers, optimized their AI-powered catalog enrichment system using Google Cloud's AI Hypercomputer architecture, specifically the G4 instances with NVIDIA RTX 6,000 GPUs. The problem involved scaling image and video synthesis workloads for catalog enrichment while managing GPU resource constraints and costs. By implementing multi-layer optimizations including enhanced parallelism, custom media pipeline architecture, P2P network acceleration, and GPU virtualization through MIG configurations, Flipkart achieved a 50% reduction in both latency and costs while increasing throughput. Separately, Baseten, an inference platform running on Google Cloud, demonstrated how their infrastructure optimizations helped customers achieve 2.5x improvement in token throughput and 4x improvement in time-to-first-token for various AI agent use cases including voice agents, coding agents, and research agents."
notion:
  pageId: "398f8dff-2538-80fe-9d29-dcdb712699d6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T11:47:00.000Z"
  lastEditedTime: "2026-07-09T11:47:00.000Z"
  publishedAt: "2026-07-09T14:27:04Z"
---

## Overview

This case study provides a comprehensive look at how two organizations are addressing the operational challenges of running AI agents and generative AI models at production scale. The primary focus is on Flipkart, India's largest e-commerce platform with a 50% market share, 500 million customers, and 200 million active users. Flipkart's challenge centered on scaling their AI-powered catalog enrichment system that generates millions of images and videos weekly to enhance product listings. The secondary case involves Baseten, an inference platform that provides model serving infrastructure on top of Google Cloud, showcasing how they help customers deploy and optimize production AI systems.

## Business Context and Problem Statement

Flipkart's e-commerce platform operates at massive scale with 50 million daily active customers querying 150 million catalog items across multiple categories. The quality and richness of product catalog presentations directly impacts customer conversion rates and shopping experiences. The business need emerged around catalog enrichment where sellers upload basic product images and require AI-generated enhanced visualizations showing products in realistic contexts, worn by models, or displayed in various environments and poses.

The technical challenge was multifaceted. First, the computational intensity of image and video synthesis models placed enormous demands on GPU resources. Second, acquiring sufficient GPU capacity in a constrained market environment while maintaining cost efficiency for a retail business model presented significant obstacles. Third, the system needed to generate millions of AI-enhanced images and videos weekly while maintaining acceptable latency for the seller experience. The workloads were characterized by being memory-intensive, requiring substantial compute resources, and needing to process both short inference requests and longer video synthesis tasks.

## AI Agent Architecture and Characteristics

The presentation establishes a framework for understanding AI agents in production that applies to both case studies. AI agents are defined as services that can run autonomously with reasoning capabilities, execute tasks using tools and data, and must meet the same operational requirements as any production service including compliance, CI/CD integration, security guardrails, cost optimization, elastic scalability, and proper security controls.

The catalog enrichment agent at Flipkart exemplifies this architecture. When a seller uploads a product image with a text prompt requesting specific visualizations, the agent must parse the user input and build an execution plan. It then executes a sequence of actions by calling different endpoints, which may include LLM calls for code generation and queries to multiple data sources. Finally, the agent orchestrates these executions and presents results back to the user in a meaningful format.

The complexity of this workflow involves varying task durations. Some operations are long-running executions calling reasoning models and multiple servers, while others are short LLM calls for specific functions like code generation. This variability introduces significant operational challenges around resource allocation and performance optimization. The presentation identifies six key characteristics of AI agents that inform infrastructure requirements: they must be treated as untrusted workloads, they exhibit bursty traffic patterns, many are latency-sensitive, some involve long-running tasks, they often have idle cycles, and complex agents can be very memory-hungry.

## Technical Implementation Details

### Image and Video Synthesis Architecture

Flipkart's catalog enrichment system leverages diffusion transformer models for both image and video generation. The technical pipeline begins with a VAE encoder and text encoder processing the input image and prompt. This encoded data flows through a diffusion transformer model that iterates approximately four times to generate the desired output. The compressed output is then decoded through a VAE decoder to produce the final video frames, typically generating five-second videos at 720p resolution.

For image synthesis, sellers provide a single product image, such as a shirt, and the system generates multiple variations showing virtual models wearing the item in different environments, poses, and contexts. The output might show the model walking on a street, standing in a house, or in various natural poses. All of this is generated by AI with only the original product image as input. For video synthesis, the system takes two keyframes showing a model at the start and end of a sequence and generates all intermediate frames, creating smooth motion sequences that show how garments move and flow when worn. This gives potential customers a realistic view of how products look in motion.

### Multi-Layer Optimization Strategy

Flipkart implemented a comprehensive three-layer optimization strategy to address their performance and cost challenges. At the application layer, they increased parallelism for the efficient transformer components and implemented overlap sequencing for the VAE encoder and decoder processes. This allowed different stages of the pipeline to execute concurrently rather than sequentially, dramatically reducing overall latency.

At the compilation and architectural layer, they performed surgical optimizations around the media pipeline by leveraging the dedicated media engine within the GPU hardware. All pre-processing and post-processing operations were moved into the GPU's media engine, eliminating the overhead of CPU-to-GPU communication for these tasks. Since the media engine resides within the GPU, all data movement happens internally, significantly reducing latency. This is a sophisticated optimization that requires deep understanding of the hardware architecture but delivers substantial performance benefits.

The attention mechanism optimization involved replacing their initial FlashAttention implementation with Sage Attention, which proved faster for their specific workloads. They also performed extensive kernel tuning on both Blackwell and Triton kernels. Kernel tuning is noted as particularly tricky since it requires deep understanding of the workload characteristics, and incorrect configuration parameters can actually degrade performance rather than improve it. This highlights the expertise required for production-grade LLM operations.

### Infrastructure-Level Enhancements

At the infrastructure layer, Flipkart leveraged Google Cloud's G4 instances powered by NVIDIA RTX 6,000 GPUs. A critical enhancement was enabling P2P peer-to-peer network acceleration, which significantly improved GPU-to-GPU communication. For four-GPU VM configurations, they observed 2x improvement in collective communication performance, while eight-GPU configurations showed 2.2x performance improvements. Enabling this capability required only setting an environment variable, with the complexity handled by the underlying infrastructure, demonstrating the value of well-designed platform abstractions.

The P2P enhancements translated to concrete performance gains in production workloads. For Llama 70B models, they observed up to 2.7x throughput improvements when P2P was enabled. For latency-sensitive applications, they achieved up to 41% reduction in inter-token latency, a critical metric for generative tasks. These performance improvements were achieved without significant engineering effort, simply by leveraging capabilities built into the infrastructure.

### GPU Virtualization and Resource Optimization

Flipkart also implemented GPU virtualization through NVIDIA's Multi-Instance GPU technology. Rather than dedicating entire eight-GPU nodes to single workloads and sequencing subsequent tasks, they partitioned GPUs into smaller instances matched to specific workload requirements. This approach allowed them to run two, four, or even eight different model instances concurrently on hardware that previously served only one model at a time.

The virtualization strategy addressed a critical inefficiency where GPUs would sit idle waiting for sequential workloads. By running multiple models in parallel with proper isolation guarantees from NVIDIA's ring-fencing technology, they dramatically improved GPU utilization and reduced costs. The ability to rightsize compute resources to match workload requirements rather than always consuming full nodes represented a fundamental shift in their operational efficiency. This approach is particularly relevant in environments where GPU capacity is constrained and expensive.

## Baseten Infrastructure Platform

Baseten provides a complementary perspective on operationalizing AI models at scale. As a platform for training, optimizing, and serving models in production, they run on top of Google Cloud's GPU infrastructure and provide additional capabilities for model deployment, performance tuning, auto-failovers, multi-region fallbacks, and efficient serving. Their customer base includes companies building production AI applications like Cursor, Abridge, and OpenEvidence.

### Agent Use Case Patterns

Baseten identified three primary patterns of AI agents in production across their customer base. Real-time voice agents prioritize latency above all else, where every millisecond and network hop accumulates into noticeable user experience degradation. This was demonstrated in the YouTube and NFL Sunday example referenced in the presentation. Coding agents behave like baristas handling multiple concurrent orders, requiring high throughput across thousands of developers with multiple requests per user per session. Research agents involve multi-agent orchestration across multimodal capabilities with multiple tool calls chained together, where reliability and fluidity across tool invocations become paramount.

A critical observation from Baseten is that customers building production agent experiences with proprietary data consistently find value in fine-tuning their own models. While this was previously difficult, the barrier to entry has decreased significantly, making it a worthwhile consideration for organizations with unique data and use cases. This represents an important trend in production LLM operations where organizations move beyond generic foundation models to specialized, fine-tuned versions optimized for their specific domains.

### Cold Start Optimization

One of Baseten's key innovations addresses the cold start problem when deploying models to GPUs. Model weights typically range from tens to hundreds of gigabytes, and the process of loading these from storage, traversing the network, and loading onto GPU memory can take tens of seconds to multiple minutes. This latency is unacceptable for production systems requiring rapid scaling or failover.

Baseten built what they call a delivery distribution network, conceptually similar to content delivery networks for web assets but operating at the scale and characteristics of model weights. This system streams model images and weights onto GPUs, achieving 2-3x improvements in cold start scenarios for their customers. This optimization becomes critical when scaling systems elastically or recovering from failures. The ability to rapidly deploy models enables more dynamic resource allocation and better response to traffic patterns.

### Multi-Region and High Availability Architecture

Baseten provides abstractions on top of Google Cloud that handle production operational complexity. For example, they support active-active deployments where multiple model versions run in different regions simultaneously. When one model version experiences issues, the system automatically falls back to alternative regions without end-user downtime. This capability is particularly valuable for A/B testing different model versions while maintaining reliability guarantees.

The platform handles heterogeneous serving requirements across different modalities including LLMs, diffusion models, and voice models. Their model performance team works directly with customers to optimize models for specific benchmarks, whether latency requirements or model quality metrics. This approach recognizes that one serving strategy does not fit all model types and use cases. Different models have different computational characteristics, memory requirements, and performance profiles that require tailored optimization approaches.

### Performance Results

Baseten customers building on Google Cloud infrastructure achieved impressive results. One example, Gebbia building research agents, saw 2.5x improvement in tokens per second throughput and 4x improvement in time-to-first-token. These metrics directly impact user experience quality and system scalability. The cost optimizations achieved through efficient serving and infrastructure utilization represent significant operational savings at scale. These results demonstrate that careful attention to inference optimization and infrastructure configuration can deliver substantial business value.

## Infrastructure Foundation: AI Hypercomputer Architecture

The underlying foundation enabling both case studies is Google Cloud's AI Hypercomputer architecture, structured in three layers. The bottom layer consists of purpose-built hardware including TPUs, GPUs across multiple generations from Hopper to Blackwell to Vera Rubin, AI-optimized networking throughout the datacenter, and specialized storage solutions for GPU workloads. Google's long-standing partnership with NVIDIA provides access to the full range of GPU offerings.

The middle layer provides open software frameworks with mature, scalable platforms like Google Kubernetes Engine. Native integrations with industry-leading frameworks such as vLLM for inference and gVisor for agent sandboxing allow developers to focus on business logic rather than integration complexity. This layer also includes support for agent sandboxes with managed warm pool support, default zero-trust security posture, and easy-to-use Python APIs. These capabilities enable creating up to 300 sandboxes per second per GKE cluster with subsecond time-to-first-instruction latency, which is critical for agent workloads that need to execute code safely.

The top layer offers flexible consumption models including Dynamic Workload Scheduler that maximizes cost-per-performance while enabling elastic scaling. This layer allows organizations to adapt resource consumption to workload patterns rather than maintaining static allocations. The three-layer architecture provides a comprehensive framework for addressing the full spectrum of LLMOps challenges from hardware through orchestration to resource management.

## G4 Instance Capabilities

The G4 instance type powered by NVIDIA RTX 6,000 GPUs represents what Google characterizes as their Swiss Army knife infrastructure product due to its versatility. The RTX 6,000 is positioned as one of the most versatile accelerators on the market, with G4 offering generous memory, local SSDs, and network bandwidth configurations across a diverse range of sizes from small to large deployments.

For larger models requiring multi-GPU configurations, the P2P peer-to-peer network acceleration significantly improves GPU-to-GPU communication. The RTX 6,000 also features upgraded video encoder cores, providing substantial performance improvements for workloads involving video encoding and decoding operations. This is particularly relevant for Flipkart's video synthesis use cases.

Google Cloud was the first to market with GPU support on their G4 product through partnership with NVIDIA, enabling fractional GPU shapes. This capability allows organizations to standardize on a single accelerator type while rightsizing compute to match specific use cases. The higher-performance CPUs selected for G4 systems also contribute to performance improvements even for fractional GPU configurations. This fractional GPU capability addresses a common challenge in production AI operations where workloads don't necessarily require full GPU capacity but benefit from GPU acceleration.

## Production Operational Considerations

Both case studies emphasize the importance of treating AI agents as untrusted workloads requiring proper security controls, governance, and auditability. The bursty traffic patterns, latency sensitivity, long-running tasks, idle cycles, and memory-intensive nature of agent workloads introduce distinct operational challenges compared to traditional services.

The need to scale elastically in environments where GPU capacity is constrained requires sophisticated resource management and optimization. Organizations cannot simply throw more hardware at the problem but must extract maximum efficiency from available resources. The combination of application-level optimizations, compilation and kernel tuning, and infrastructure enhancements represents a holistic approach to production LLM operations.

Security considerations for agents are particularly important since they often execute code or make decisions autonomously. The zero-trust security posture, sandboxing capabilities, and proper access controls become essential components of the production architecture. Both organizations emphasized that agents must meet the same compliance, security, and operational standards as traditional services despite their autonomous nature.

## Results and Business Impact

Flipkart achieved remarkable outcomes through their optimization efforts. The 50% reduction in latency directly improved the seller experience when generating catalog enrichments, enabling faster turnaround for listing creation and updates. The simultaneous 50% cost reduction delivered significant operational savings given their scale of millions of weekly generations. Increased throughput enabled them to process more catalog items and support business growth without proportional infrastructure cost increases. Additionally, they achieved 60% of new catalog experiences with zero human touch, demonstrating the effectiveness of their automated enrichment pipeline.

Baseten's infrastructure optimizations enabled their customers to achieve production-grade performance with 2-3x improvements in cold start times, 2.5x improvements in token throughput for some workloads, and 4x improvements in time-to-first-token latency. These performance gains translate directly to better user experiences and lower infrastructure costs at scale. For applications like real-time voice agents where every millisecond matters, these improvements make the difference between acceptable and unacceptable user experiences.

## Critical Success Factors

Several factors emerge as critical to the success of these implementations. First, the willingness to optimize across the entire stack from application logic through compilation and kernel tuning to infrastructure configuration. Organizations that treat the infrastructure as a black box miss significant optimization opportunities. Flipkart's work on kernel tuning, media pipeline optimization, and attention mechanism selection demonstrates the value of this comprehensive approach.

Second, the importance of understanding workload characteristics and matching compute configurations to specific requirements rather than applying one-size-fits-all approaches. The use of MIG virtualization to rightsize GPU allocations and the careful selection of instance types based on workload profiles shows sophisticated operational maturity.

Third, leveraging platform capabilities like GPU virtualization and P2P networking that provide substantial benefits with minimal integration effort. The fact that P2P acceleration required only an environment variable change yet delivered 2x+ performance improvements illustrates the importance of understanding and utilizing available platform features.

The collaboration between infrastructure providers, platform companies like Baseten, and end customers like Flipkart demonstrates the value of partnership in addressing production AI challenges. The shared expertise in model optimization, kernel tuning, and infrastructure configuration enabled outcomes that individual organizations would struggle to achieve independently.

## Future Directions

Baseten indicated several areas of ongoing investment including extending context windows in fine-tuned models through research into KV cache compression techniques. This addresses a common limitation in production LLM systems where context length constraints can limit application capabilities. They plan to apply the delivery distribution network primitives to enable ephemeral agent use cases with rapid startup times, supporting more dynamic and flexible agent deployments.

Their focus on building primitives that co-locate agent workloads near GPUs reflects the continuing priority on latency and throughput optimization. By minimizing network hops and data movement between components, they aim to further reduce latency in agent execution pipelines.

The broader trend toward agentic AI systems with increasing complexity and autonomy will continue driving requirements for sophisticated production infrastructure and operational practices. The patterns established in these case studies around multi-layer optimization, infrastructure efficiency, and operational reliability will likely inform future LLMOps practices across the industry. As agents become more prevalent in production systems, the operational patterns and optimization techniques demonstrated here will become increasingly important for organizations deploying AI at scale.
