---
title: "JUDE: Large-Scale LLM-Based Embedding Generation for Job Recommendations"
slug: "jude-large-scale-llm-based-embedding-generation-for-job-recommendations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "685136e05e77cd3c1edd2732"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:11:37.349Z"
  createdOn: "2025-06-17T09:35:28.231Z"
llmopsTags:
  - "question-answering"
  - "classification"
  - "realtime-application"
  - "embeddings"
  - "fine-tuning"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "instruction-tuning"
  - "token-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "system-prompts"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "pytorch"
  - "fastapi"
  - "redis"
  - "cache"
  - "vllm"
  - "hugging-face"
  - "nvidia"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn developed JUDE (Job Understanding Data Expert), a production platform that leverages fine-tuned large language models to generate high-quality embeddings for job recommendations at scale. The system addresses the computational challenges of LLM deployment through a multi-component architecture including fine-tuned representation learning, real-time embedding generation, and comprehensive serving infrastructure. JUDE replaced standardized features in job recommendation models, resulting in +2.07% qualified applications, -5.13% dismiss-to-apply ratio, and +1.91% total job applications - representing the highest metric improvement from a single model change observed by the team."
link: "https://www.linkedin.com/blog/engineering/ai/jude-llm-based-representation-learning-for-linkedin-job-recommendations"
year: 2025
seo:
  title: "LinkedIn: JUDE: Large-Scale LLM-Based Embedding Generation for Job Recommendations - ZenML LLMOps Database"
  description: "LinkedIn developed JUDE (Job Understanding Data Expert), a production platform that leverages fine-tuned large language models to generate high-quality embeddings for job recommendations at scale. The system addresses the computational challenges of LLM deployment through a multi-component architecture including fine-tuned representation learning, real-time embedding generation, and comprehensive serving infrastructure. JUDE replaced standardized features in job recommendation models, resulting in +2.07% qualified applications, -5.13% dismiss-to-apply ratio, and +1.91% total job applications - representing the highest metric improvement from a single model change observed by the team."
  canonical: "https://www.zenml.io/llmops-database/jude-large-scale-llm-based-embedding-generation-for-job-recommendations"
  ogTitle: "LinkedIn: JUDE: Large-Scale LLM-Based Embedding Generation for Job Recommendations - ZenML LLMOps Database"
  ogDescription: "LinkedIn developed JUDE (Job Understanding Data Expert), a production platform that leverages fine-tuned large language models to generate high-quality embeddings for job recommendations at scale. The system addresses the computational challenges of LLM deployment through a multi-component architecture including fine-tuned representation learning, real-time embedding generation, and comprehensive serving infrastructure. JUDE replaced standardized features in job recommendation models, resulting in +2.07% qualified applications, -5.13% dismiss-to-apply ratio, and +1.91% total job applications - representing the highest metric improvement from a single model change observed by the team."
---

LinkedIn's JUDE (Job Understanding Data Expert) platform represents a comprehensive implementation of LLMOps at scale, addressing the production deployment challenges of large language models for job recommendation systems. The platform serves LinkedIn's massive user base of over 1 billion registered members and tens of millions of active job postings, demonstrating how to operationalize LLMs in high-stakes, real-time environments.

The fundamental challenge JUDE addresses is the need for high-quality semantic embeddings that can capture relationships between three core entities: job postings, member profiles, and member resumes. Traditional approaches relied on standardized features, smaller ML models, hard-to-maintain taxonomies, and rigid pipelines. JUDE transforms this by leveraging fine-tuned LLMs to generate dense vector representations that offer superior compression, performance, transfer learning capabilities, and interoperability across different frameworks.

## Architecture and System Design

JUDE implements a sophisticated three-component architecture that integrates state-of-the-art LLMs with both open-source and proprietary infrastructure. The platform consists of a fine-tuned representation learning pipeline, real-time embedding generation system, and comprehensive serving architecture designed for production-scale deployment.

The system leverages the PyTorch ecosystem and Hugging Face's Transformers library, providing flexibility in model selection and optimization. This design choice enables seamless integration with various pre-trained models that have licenses permissive for commercial use, while maintaining the ability to fine-tune with LinkedIn's proprietary data for domain-specific improvements.

A critical architectural decision involves the migration from Lambda to Kappa architecture, which delivers several operational benefits. This approach resolves time-travel issues by ensuring features reflect the same state of underlying data as when database changes occur. It also enables cost-efficient GPU inference through a nearline-first approach and simplifies maintenance by eliminating the need to monitor and recover failed scheduled inference jobs.

## Fine-Tuning Strategy and Technical Implementation

The fine-tuning approach addresses four key technical challenges: creating high-quality supervision signals, designing efficient model architectures, optimizing training performance, and balancing accuracy with computational requirements. LinkedIn's approach carefully differentiates between relevance-based and engagement-based labels for supervision, recognizing that each serves distinct purposes in training effective embeddings.

Relevance labels are semantically oriented, enforcing strict matching of role, location, and qualifications. These can be obtained through human annotation or foundation LLM evaluation with careful prompt engineering. While scarce, they provide high-quality supervision signals. Engagement labels, such as job applications, directly align with business metrics and user intent. Although potentially noisy, they provide larger-scale supervision signals reflecting real-world user behavior and marketplace dynamics.

The modeling architecture employs a two-tower design with a shared base LLM and specialized prompt templates for different input types. These templates act as soft task descriptors, guiding the model's attention to relevant aspects of each text type while maintaining parameter efficiency through weight sharing. Contrary to common misconceptions about decoder-only models being limited to text generation, LinkedIn conducted comprehensive experiments with both encoder-decoder architectures and state-of-the-art decoder-only models, exploring various pooling strategies for text embedding generation.

Training optimizations are crucial for handling 7B+ parameter models efficiently. The implementation employs LoRA fine-tuning applied to Query-Key-Value matrices in Transformer attention blocks for parameter efficiency. Flash attention 2 and custom CUDA kernels from Liger ensure efficient forward passes through LLMs on long texts. Bfloat16 mixed precision reduces memory usage and speeds up computation, while gradient accumulation across multiple forward passes enables effective large batch size training. Gradient checkpointing trades computation for memory by recomputing intermediate activations during backward passes. Multi-node multi-GPU distributed training on Nvidia H100 cards leverages optimizer state partitioning (ZeRO stage 1) from DeepSpeed, using AdamW optimizer with slanted triangular learning rate with warmup and cosine decay.

## Loss Engineering and Performance Optimization

The loss function engineering represents a sophisticated approach to maximizing embedding quality. The optimal architecture combines three complementary loss functions: binary cross-entropy loss for core classification tasks, contrastive InfoNCE loss commonly used for retrieval and semantic search, and VP-matrix loss providing robust outlier handling and effective utilization of weak convergence mechanisms in neural network functional space.

LinkedIn evaluated the performance trade-offs between two-tower architecture and cross-attention models. While cross-encoders demonstrated superior performance due to full Transformer attention computation between text inputs, they require significantly higher computational resources. To address this trade-off, the team implemented offline cross-encoder distillation for fine-tuning 7B decoder-only models, bridging 50% of the performance gap while maintaining efficiency benefits. These results align with Google Research's findings on dual encoder distillation.

## Real-Time Embedding Generation and Serving

The production deployment of JUDE requires sophisticated real-time embedding generation capabilities to meet user expectations for responsiveness. Job posters expect their postings to be indexed and recommended immediately after posting, while members expect instant reflection of profile or resume updates in their recommendations and search results.

The nearline inference system implements Kappa architecture with four logical subcomponents. Sources include separate Kafka/Brooklin streams for job postings, member profiles, and member resumes, each triggering embedding inference for their respective entities. Real-time processing pipelines in Samza handle each entity type with core functionalities including source feature extraction, prompt application, change detection to skip inference when text content hasn't changed meaningfully (reducing cost up to 3x), embedding inference via GRPC calls to LLM Model Serving clusters, and sink outputs to appropriate storage destinations.

The GPU model serving component hosts LLM models in Model Serving clusters, replicating across multiple Kubernetes deployment GPU pods for scalability. This microservice architecture exposes GRPC endpoints for embedding inference, maintaining latency under 300ms at p95 quantile for modern 7B LLMs, ensuring near real-time reflection of changes in jobs, member profiles, and resumes.

Output sinks support both online and offline use cases through dual storage approaches. Online storage utilizes Venice, a high-performance key-value store for real-time access during document ranking, while offline storage publishes generated embeddings to Kafka topics that are ETL'd to HDFS for model training, using time-aware joins in Spark to fetch embeddings at correct temporal points.

## Scaling Challenges and Optimizations

LinkedIn's platform scale presents significant computational challenges that required innovative solutions. The bootstrapping process addresses the need to generate embeddings for entities created before nearline inference initialization through on-demand batch inference systems. This leverages Flyte/Spark/K8S/Ray pipelines supporting initial bootstrapping of new embedding versions and targeted historical embedding generation by time window or entity subset.

Intelligent optimization strategies play crucial roles in managing computational costs. Hashing-based optimization tracks meaningful text changes and deduplicates inputs for LLM inference, reducing inference volume by approximately 6x compared to naive database change tracking. These optimizations are essential for maintaining cost-effectiveness while serving LinkedIn's massive user base.

## Production Impact and Business Results

The deployment of JUDE embeddings in production demonstrates significant business impact through measurable improvements in key metrics. The system replaced overlapping standardized features in both job recommendation and search L2 ranking models, resulting in +2.07% qualified applications, -5.13% dismiss-to-apply ratio, and +1.91% total job applications. This represents the highest metric improvement from a single model change observed by the team supporting talent initiatives during that period.

These results validate the approach of replacing traditional feature engineering with LLM-derived representations, demonstrating that the increased computational complexity of LLM-based systems can be justified through superior performance outcomes. The success also highlights the importance of comprehensive LLMOps infrastructure in enabling such improvements at scale.

## Future Directions and Lessons Learned

LinkedIn's future work focuses on enriching JUDE's semantic understanding by incorporating members' job-seeking activity data, leveraging recent advances in LLMs with long context capabilities to complement current profile and resume text representations with rich behavioral signals.

The JUDE implementation provides several key insights for LLMOps practitioners. First, the importance of architectural decisions in managing computational costs and operational complexity cannot be overstated. The migration from Lambda to Kappa architecture addresses fundamental operational challenges while enabling more efficient resource utilization. Second, the careful balance between different types of supervision signals (relevance vs. engagement) demonstrates the nuanced approach required for domain-specific fine-tuning. Third, the comprehensive optimization strategy, from model-level optimizations like LoRA and Flash attention to system-level optimizations like change detection and deduplication, illustrates the multi-layered approach necessary for production LLM deployment.

The success of JUDE underscores the critical importance of treating LLMOps as a comprehensive discipline encompassing not just model development but also infrastructure design, operational efficiency, and business alignment. The platform's ability to deliver substantial business impact while managing the complexities of large-scale LLM deployment provides a valuable blueprint for organizations seeking to operationalize LLMs in production environments.