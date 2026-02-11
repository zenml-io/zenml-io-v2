---
title: "Building a Hybrid Cloud AI Infrastructure for Large-Scale ML Inference"
slug: "building-a-hybrid-cloud-ai-infrastructure-for-large-scale-ml-inference"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67bc2a5d704137d1e2e03da0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:01:19.401Z"
  createdOn: "2025-02-24T08:14:21.247Z"
llmopsTags:
  - "content-moderation"
  - "translation"
  - "speech-recognition"
  - "code-generation"
  - "chatbot"
  - "multi-modality"
  - "realtime-application"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "kubernetes"
  - "vllm"
  - "triton"
  - "fastapi"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "postgresql"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "devops"
  - "microsoft-azure"
industryTags: "media-entertainment"
company: "Roblox"
summary: "Roblox underwent a three-phase transformation of their AI infrastructure to support rapidly growing ML inference needs across 250+ production models. They built a comprehensive ML platform using Kubeflow, implemented a custom feature store, and developed an ML gateway with vLLM for efficient large language model operations. The system now processes 1.5 billion tokens weekly for their AI Assistant, handles 1 billion daily personalization requests, and manages tens of thousands of CPUs and over a thousand GPUs across hybrid cloud infrastructure."
link: "https://corp.roblox.com/newsroom/2024/09/running-ai-inference-at-scale-in-the-hybrid-cloud"
year: 2024
seo:
  title: "Roblox: Building a Hybrid Cloud AI Infrastructure for Large-Scale ML Inference - ZenML LLMOps Database"
  description: "Roblox underwent a three-phase transformation of their AI infrastructure to support rapidly growing ML inference needs across 250+ production models. They built a comprehensive ML platform using Kubeflow, implemented a custom feature store, and developed an ML gateway with vLLM for efficient large language model operations. The system now processes 1.5 billion tokens weekly for their AI Assistant, handles 1 billion daily personalization requests, and manages tens of thousands of CPUs and over a thousand GPUs across hybrid cloud infrastructure."
  canonical: "https://www.zenml.io/llmops-database/building-a-hybrid-cloud-ai-infrastructure-for-large-scale-ml-inference"
  ogTitle: "Roblox: Building a Hybrid Cloud AI Infrastructure for Large-Scale ML Inference - ZenML LLMOps Database"
  ogDescription: "Roblox underwent a three-phase transformation of their AI infrastructure to support rapidly growing ML inference needs across 250+ production models. They built a comprehensive ML platform using Kubeflow, implemented a custom feature store, and developed an ML gateway with vLLM for efficient large language model operations. The system now processes 1.5 billion tokens weekly for their AI Assistant, handles 1 billion daily personalization requests, and manages tens of thousands of CPUs and over a thousand GPUs across hybrid cloud infrastructure."
---

## Overview

Roblox, the global gaming platform with approximately 79.5 million daily active users (as of June 2024), has undertaken a comprehensive multi-year journey to build and scale their AI and ML infrastructure. This case study details their evolution from fragmented, team-specific ML solutions to a centralized, production-grade LLMOps platform capable of handling massive inference workloads across their hybrid cloud infrastructure.

The company's AI applications span virtually every user interaction on the platform, from personalization and search recommendations to safety moderation, real-time chat translation, and generative AI tools for creators. This breadth of use cases, combined with the scale of their user base, presented significant challenges that required a systematic approach to infrastructure development.

## The Starting Point and Problem Statement

In late 2021, Roblox faced a fragmented AI landscape where individual engineering teams were building their own mini-platforms and selecting disparate frameworks. Teams developing critical components such as the avatar Marketplace, homepage, and search were each building custom feature engineering solutions rather than leveraging a centralized feature store. Each team was independently tackling inference scaling challenges and developing their own optimizations without core platform support. This fragmented approach created inefficiencies, duplicated effort, and made it difficult to scale AI capabilities across the organization.

By early 2023, the company supported fewer than 50 ML inference pipelines. The rapid emergence of generative AI potential accelerated the need for a unified, scalable infrastructure. Today, their infrastructure supports approximately 250 ML pipelines, running on tens of thousands of CPUs and more than a thousand GPUs across two data centers and hybrid cloud infrastructure.

## Phase One: Building the Foundation

The first phase focused on establishing core ML infrastructure primitives. Roblox adopted Kubeflow early as it provided packaging of core building blocks for ML including notebooks, pipelines, offline experimentation, and model serving. They also adopted a third-party feature store solution to get started.

To improve developer experience, they developed a Python library that reduced the complexities of deploying models to production. This library enabled engineers to easily convert Jupyter notebook code into Kubeflow pipelines by snapshotting the runtime environment and source code without needing to build Docker images. It also handled compute resource selection with priorities, notification setup, and authentication.

Their feature store simplified defining new features while promoting sharing of more than 900 features across over 100 feature services. This allowed teams to create and deploy new models more quickly as the feature collection grew.

For model serving, they developed a model registry integrated with their library, allowing engineers to upload and download models that are tagged and automatically versioned to facilitate traceability, rollbacks, and A/B testing. As an example of their testing rigor, their personalization models are trained and deployed daily with approximately 20 A/B tests running in parallel at any given time.

For the serving platform, they chose KServe with Triton Inference Server as the underlying runtime due to its strong performance and support for multiple ML frameworks using both GPUs and CPUs. Models go through extensive testing before release including offline experiments, shadow testing, and A/B testing. After release, models are continuously monitored for both operational metrics (like inference latency) and accuracy. Human moderators also evaluate reported disagreements in inferences to ensure critical decisions are correct and to improve training datasets.

## Phase Two: Preparing to Scale Inference

The second phase, spanning much of 2023, focused on optimizing performance and efficiency of ML training and inference infrastructure. A key development was expanding distributed training systems to enable training on large datasets and running models with billions of parameters across multiple worker nodes.

The team recognized that their existing setup for offline inference, designed for real-time sequential input/output, would not support their growth trajectory. It did not easily support task parallelism or multistage processing, nor was it resource-efficient enough for their scale. Engineers were required to write their own data chunking and error-handling logic, which became increasingly time-consuming.

To address these challenges, they added support for Ray, an open-source compute framework for scaling batch inference workloads. By building a Ray-based distributed task pipeline for batch inference, they achieved optimized resource utilization, multistage processing, robust task parallelism, and greater fault tolerance. The Ray Data library allows engineers to define pipelines with streaming execution in just a few lines of code, improving developer velocity and efficiency.

As inference needs grew, they moved all CPU inference to their own data centers for more direct control over latency and privacy settings. They process approximately 1 billion personalization requests daily for their users. This on-premises approach improved efficiency and enabled better optimization of where inference runs and workload distribution to reduce compute resources required.

A significant infrastructure investment was developing a custom feature store built on top of the open-source Feast project. Existing third-party solutions did not meet their requirements for high throughput, low latency, cost-efficiency, and rapid iterations. Their custom feature store provides a domain-specific language for defining transformations for both batch and streaming features. They adopted Flink as the stream processing engine for real-time features critical for models needing the freshest information. The feature store now ingests approximately 30 billion records and serves approximately 70 billion records per day with a P99 latency of 50ms, supporting more than 100 feature services.

The growing demand for semantic understanding through NLP, computer vision, and recommendation systems drove the need for embeddings. This motivated building out a vector database to efficiently store and retrieve vectors as high-dimensional points, enabling fast nearest neighbor lookups for capabilities such as multimodal search and content violation detection.

To find efficiencies of scale and help engineers succeed more quickly, they established a ground truth team that helps engineers design dataset production pipelines, train and validate data using human evaluators, and deliver high-quality data. This standardized the process of building data pipelines and validating datasets.

## Phase Three: Operationalizing Massive LLM Inference

The third and current phase represents Roblox's direct LLMOps implementation. With the launch of Roblox Assistant, their generative AI tool for creators, the number of tokens processed increased to 1.5 billion per week. Additional features like real-time AI chat translation and their voice safety model significantly increased demand for inference capacity.

Two core projects form the foundation of this phase: an ML gateway and an LLMOps platform built around vLLM.

The unified ML gateway centralizes access to all large models, both open source and internally developed, across CPUs and GPUs in the cloud and on-premises. On the backend, the gateway provides a common API interface, user-friendly configuration options, and efficient resource sharing between all deployed models. Key features include centralized throttling by token count for generative AI workloads, latency-aware load balancing between regions, centralized API key management for security, comprehensive usage tracking with potential for entitlements implementation, and integration with monitoring tools for improved observability.

For LLM inference specifically, Roblox adopted vLLM as their primary inference engine. Since moving to vLLM, they have seen almost 2x improvement in both latency and throughput, currently serving approximately 4 billion tokens per week. Notably, Roblox is an active contributor to the open-source vLLM project, spearheading the development of multimodal support that enables the engine to handle not just text but also images and potentially other data types. They have also implemented speculative decoding techniques to further improve inference performance.

## Open Source Commitment and Contributions

Roblox emphasizes their commitment to open-source technologies, with much of their technical stack built on open-source projects including Kubeflow, Ray, Feast, Flink, KServe, Triton Inference Server, and vLLM. They have begun contributing back to the community by open-sourcing their voice safety classifier and working toward making their ML gateway open source. They have also open-sourced a PII classifier for AI-powered detection in chat.

## Results and Metrics

The case study presents several concrete metrics demonstrating their infrastructure scale:

- Approximately 250 ML pipelines in production (up from fewer than 50 in early 2023)
- Tens of thousands of CPUs and more than a thousand GPUs across two data centers and hybrid cloud
- Approximately 4 billion tokens per week served through vLLM
- 1.5 billion tokens per week for Roblox Assistant alone
- 1 billion personalization requests processed daily
- 30 billion records ingested and 70 billion records served daily by feature store with 50ms P99 latency
- 900+ features shared across 100+ feature services
- Nearly 2x improvement in latency and throughput after vLLM adoption
- 8% of UGC avatar bodies produced using Avatar Auto Setup (as of August 2024)

## Critical Assessment

While the case study presents an impressive technical journey, it is worth noting that this is a first-party account that naturally emphasizes successes. The metrics are substantial and specific, which lends credibility, but the challenges and failures encountered along the way are not detailed. The cost implications of this infrastructure are not discussed, though the emphasis on efficiency gains suggests this is a significant consideration.

The three-phase approach demonstrates thoughtful long-term planning rather than reactive scaling. The combination of on-premises infrastructure for CPU inference with hybrid cloud for GPU workloads shows pragmatic decision-making around cost, latency, and privacy. Their active contribution to open-source projects like vLLM, rather than just consumption, suggests genuine technical depth and community engagement. However, the full complexity and potential trade-offs of operating such a large-scale ML infrastructure are naturally not fully captured in a promotional engineering blog post.