---
title: "Modernising ML Model Serving Platform with NVIDIA Triton Inference Server"
slug: "modernising-ml-model-serving-platform-with-nvidia-triton-inference-server"
draft: false
llmopsTags:
  - "poc"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "triton"
  - "onnx"
  - "pytorch"
  - "tensorflow"
  - "vllm"
  - "monitoring"
  - "microservices"
  - "scalability"
  - "api-gateway"
  - "nvidia"
  - "amazon-aws"
industryTags: "tech"
company: "Grab"
summary: "Grab's machine learning model serving platform, Catwalk, faced increasing technical debt, degraded performance, and rising costs as it struggled to maintain multiple inference engines for hundreds of production ML models. To address these challenges, Grab migrated to NVIDIA Triton Inference Server, developing a \"Triton manager\" component to enable seamless, zero-downtime migration with full backward compatibility. The migration resulted in significant improvements: over 50% of online deployments were successfully transitioned within 10 days, with some critical models achieving 50% improvements in tail latency, up to 90% cost reductions for certain models, and an average 20% decrease in infrastructure spend across migrated services."
link: "https://engineering.grab.com/modernising-grab-model-serving-platform"
year: 2025
seo:
  title: "Grab: Modernising ML Model Serving Platform with NVIDIA Triton Inference Server - ZenML LLMOps Database"
  description: "Grab's machine learning model serving platform, Catwalk, faced increasing technical debt, degraded performance, and rising costs as it struggled to maintain multiple inference engines for hundreds of production ML models. To address these challenges, Grab migrated to NVIDIA Triton Inference Server, developing a \"Triton manager\" component to enable seamless, zero-downtime migration with full backward compatibility. The migration resulted in significant improvements: over 50% of online deployments were successfully transitioned within 10 days, with some critical models achieving 50% improvements in tail latency, up to 90% cost reductions for certain models, and an average 20% decrease in infrastructure spend across migrated services."
  canonical: "https://www.zenml.io/llmops-database/modernising-ml-model-serving-platform-with-nvidia-triton-inference-server"
  ogTitle: "Grab: Modernising ML Model Serving Platform with NVIDIA Triton Inference Server - ZenML LLMOps Database"
  ogDescription: "Grab's machine learning model serving platform, Catwalk, faced increasing technical debt, degraded performance, and rising costs as it struggled to maintain multiple inference engines for hundreds of production ML models. To address these challenges, Grab migrated to NVIDIA Triton Inference Server, developing a \"Triton manager\" component to enable seamless, zero-downtime migration with full backward compatibility. The migration resulted in significant improvements: over 50% of online deployments were successfully transitioned within 10 days, with some critical models achieving 50% improvements in tail latency, up to 90% cost reductions for certain models, and an average 20% decrease in infrastructure spend across migrated services."
notion:
  pageId: "3b5f8dff-2538-8010-915f-e7e6a1a146f3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T13:19:00.000Z"
  lastEditedTime: "2026-08-07T13:19:00.000Z"
  publishedAt: "2026-08-07T13:22:24Z"
---

## Overview

Grab operates Catwalk, an enterprise-scale machine learning model serving platform that powers hundreds of production ML models across Southeast Asia's leading superapp. The platform serves critical business functions across deliveries, mobility, and digital financial services, handling inference requests for over 800 cities across eight countries. While this case study primarily focuses on traditional ML models (transformer-based models, XGBoost models) rather than large language models specifically, it provides valuable insights into production ML infrastructure challenges and solutions that are highly relevant to LLMOps practitioners managing inference workloads at scale.

The journey documented here centers on a fundamental challenge facing any production ML platform: maintaining performance, reliability, and cost-efficiency as model complexity grows and the technology landscape evolves. Grab faced mounting technical debt from supporting multiple inference engines (ONNX, PyTorch, TensorFlow, and vLLM), which led to degraded platform performance, increased latency, reduced throughput, and escalating costs. The solution involved migrating to NVIDIA Triton Inference Server and developing custom tooling to enable seamless adoption across the organization.

## Technical Context and Problem Statement

Catwalk's original architecture accommodated growth by progressively adding support for different ML frameworks. This incremental approach worked initially but became unsustainable over time. The platform accumulated significant technical debt from maintaining various inference engines, ensuring backward compatibility across versions, and managing deprecated legacy components like their original ONNX server. The consequences manifested as concrete production issues: latency increased, throughput decreased, and costs escalated to the point where larger models could no longer be served efficiently or cost-effectively using legacy infrastructure.

This situation represents a common challenge in production ML systems: the tension between supporting diverse model types and maintaining a cohesive, performant platform. Each additional inference engine added operational complexity, testing overhead, and potential points of failure. The team recognized that continuing on this trajectory would further compound technical debt and degrade user experience.

## Solution Architecture and Implementation

After evaluating industry-leading model serving platforms and studying best practices, Grab conducted an in-depth analysis of NVIDIA Triton Inference Server. The evaluation identified several key advantages: multi-framework support (ONNX, PyTorch, TensorFlow), a unified inference interface providing consistent API across frameworks, hardware optimization for both GPU and CPU environments (including specialized instances like AWS Inferentia), continuous upstream updates ensuring access to latest optimizations, and advanced inference features like dynamic batching and model ensembling.

The technical approach centered on consolidating multiple inference engines into a unified Triton-based solution, beginning with ONNX adoption as the first implementation phase. The critical innovation was developing the "Triton manager," a custom component designed to integrate Triton into Catwalk seamlessly while minimizing user disruption. The Triton manager consists of two major components: the Triton server manager and the Triton proxy.

The Triton server manager serves as the entry point for Catwalk's Triton deployment. It handles model lifecycle operations including downloading models from remote storage, running verification on model files, preparing per-model configurations based on user customizations, and launching the Triton server. Beyond initialization, it provides ongoing operational support through periodic health checks and observability metrics overlooking server status. This design encapsulates Triton-specific operations while presenting a familiar interface to existing Catwalk users.

The Triton proxy addresses one of the most critical migration challenges: maintaining backward compatibility with existing clients. It hosts endpoints that translate requests from the older API format and forwards them to the Triton server. This proxy layer eliminates the need for user code changes, which was essential for achieving rapid adoption across the organization. The conversion logic prioritizes performance, with extensive benchmarking conducted during development to validate and optimize efficiency, ensuring minimal overhead from the translation layer.

A special operational mode in the Triton server manager enables backward compatibility with the command-line interface of the existing ONNX runtime server, further smoothing the migration path for users familiar with the legacy system. This attention to developer experience represents thoughtful platform engineering, recognizing that technical superiority alone is insufficient for successful adoption in large organizations.

## Performance Optimization and Benchmarking

Grab conducted rigorous testing of Triton against their existing ONNX server under varying traffic levels. The benchmarking revealed that Triton could handle at least 5 times the traffic while maintaining excellent latency, with further performance enhancements available through features like batching and potential conversion to TensorRT for GPU-based deployments. Through profiling, the team identified that certain ONNX Runtime configuration parameters have outsized impact on throughput. One particularly valuable optimization was setting the intra-op thread count to match the number of physical CPU cores, which yielded significant performance gains without requiring model-by-model micro-optimization.

For transformer-based models in production, the improvements were dramatic. Some larger transformer models saw p90 latency decrease from 120ms to 20ms, while average latency stabilized at 4ms. Smaller XGBoost models maintained consistent average latency at 2ms across regions. These improvements weren't just about raw speed—they translated directly to better user experience and resource efficiency.

## Migration Strategy and Rollout

The migration strategy prioritized minimizing disruption through several key principles: maintaining API compatibility with existing systems, ensuring zero-downtime transitions, preserving all existing functionality while adding new capabilities, and minimizing disruption to downstream services and users. Rather than requiring individual teams to manage their own migrations, Grab managed the transition centrally within the platform team.

This centralized approach proved highly effective. Within just 10 days of Triton's availability, over 50% of online model deployments had successfully migrated. The team attributes this rapid adoption to rigorous testing for backward compatibility, which resulted in most users being unaware of the transition while benefiting from improved performance. This represents a notable achievement in platform engineering: delivering substantial improvements without imposing migration burden on users.

## Business Impact and Cost Optimization

The business impact extended beyond performance improvements to substantial cost reductions. An analysis of 11 production ML services that completed migration compared infrastructure spend over 14 days before and after cut-over. Despite staggered migration dates, the trend was consistent: average spend fell by approximately 20% across this cohort within 14 days. Some models achieved even more dramatic cost savings, with certain deployments realizing over 90% reductions due to Triton's advanced optimizations.

For models facing volatile request traffic, Triton's superior handling of traffic spikes proved particularly valuable. The platform demonstrated improved stability and reduced tail latency during demand surges, which is critical for user-facing services in Grab's production environment. One deployment showed over 90% reduction in required pods, indicating dramatic improvements in resource utilization.

## Technical Considerations and Balanced Assessment

While the results presented are impressive, it's important to consider the context and potential caveats. The case study is authored by Grab's engineering team and published on their tech blog, so it naturally emphasizes successes. The 5x throughput improvement and dramatic latency reductions represent best-case scenarios for specific models; not all models may see identical gains. The team acknowledges that higher tail latency remains an issue for larger models during request spikes, indicating that optimization work continues.

The initial Triton rollout deployed with limited capabilities to prioritize backward compatibility, meaning the full potential of Triton's advanced features (like dynamic batching) hasn't yet been realized across all deployments. The team is working on enabling these features through close collaboration with model owners, which will require additional effort and coordination. This phased approach is pragmatic but means the ultimate performance ceiling hasn't been reached.

From an LLMOps perspective, while this case study primarily discusses traditional ML models (transformers, XGBoost), the infrastructure patterns and challenges directly apply to serving large language models at scale. The mention of vLLM support in the original platform suggests Grab is serving LLMs, though the case study doesn't detail those specific deployments. Triton's support for frameworks like vLLM and its optimization capabilities make it increasingly relevant for LLM serving scenarios, particularly as organizations seek to consolidate diverse model types onto unified infrastructure.

## Platform Engineering Lessons

The Triton manager architecture represents thoughtful platform engineering that balances technical advancement with organizational pragmatism. By investing in backward compatibility layers and drop-in replacement capabilities, the platform team eliminated adoption friction. This approach acknowledges a key reality in large organizations: even exceptional performance improvements are often insufficient motivation for teams to migrate if the migration requires significant effort or introduces risk.

The decision to manage migrations centrally rather than distributing the burden across individual model owners demonstrates mature platform thinking. It concentrates expertise where it's most effective (the platform team) and allows model owners to focus on their domain-specific challenges rather than infrastructure concerns. This pattern is particularly relevant for LLMOps, where the complexity of serving large models can easily overwhelm teams without deep infrastructure expertise.

## Future Directions and Ongoing Work

Grab's platform team continues to evolve the Triton integration. They plan to enhance the Triton Manager to ensure backward compatibility with additional ML frameworks beyond ONNX, supporting the broader consolidation strategy. Work is underway to enable batching capabilities to address tail latency issues during traffic surges for larger models. As more models and applications migrate, the team expects absolute cost savings to scale proportionally beyond the initial 20% average reduction.

The team anticipates that model owners will leverage the improved performance and cost efficiency to either upgrade model sizes or handle higher queries per second (QPS), indicating that the infrastructure improvements enable business capability expansion rather than simply reducing costs. This represents a mature perspective on infrastructure investment: optimization creates capacity for growth, not just savings.

## Organizational and Operational Considerations

The case study highlights several operational excellence practices relevant to production ML systems. The platform provides observability through health checks and status monitoring, essential for maintaining reliability at scale. The phased rollout strategy (starting with ONNX, expanding to other frameworks) manages risk while delivering value incrementally. The close collaboration with model owners for optimization efforts balances centralized platform capabilities with domain-specific expertise.

The mention of serving over 800 cities across eight countries emphasizes the scale and geographic distribution challenges Grab faces. Performance and reliability improvements in this context have direct business impact on millions of daily users across deliveries, mobility, and financial services. The 50% tail latency improvement for critical systems translates to better user experience across these high-stakes applications.

## Relevance to LLMOps

While this case study focuses primarily on traditional ML models, the infrastructure patterns, migration strategies, and operational practices are directly applicable to LLMOps scenarios. Organizations serving LLMs at scale face similar challenges: managing diverse model types and frameworks, optimizing inference costs, ensuring reliability under variable load, and enabling smooth adoption of new capabilities. Triton's support for frameworks like vLLM and its optimization capabilities for large models make it increasingly relevant for LLM serving.

The emphasis on backward compatibility, zero-downtime migration, and minimal user disruption represents best practices for any ML platform evolution, particularly important when serving business-critical applications. The cost optimization achievements (20% average reduction, up to 90% for specific models) demonstrate the substantial economic value of infrastructure optimization, especially relevant given the high costs associated with serving large language models at scale.

The architectural pattern of building platform-specific management layers (the Triton manager) on top of open-source inference engines provides a blueprint for organizations seeking to adopt powerful tools like Triton while maintaining their existing developer experience and operational patterns. This approach balances leveraging community-maintained, cutting-edge technology with preserving organizational-specific requirements and workflows.
