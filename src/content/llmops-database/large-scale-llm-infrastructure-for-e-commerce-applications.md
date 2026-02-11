---
title: "Large-Scale LLM Infrastructure for E-commerce Applications"
slug: "large-scale-llm-infrastructure-for-e-commerce-applications"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad8b08cbf5155547643b5"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:19.676Z"
  createdOn: "2025-12-23T18:00:16.337Z"
llmopsTags:
  - "customer-support"
  - "content-moderation"
  - "translation"
  - "classification"
  - "summarization"
  - "data-cleaning"
  - "fine-tuning"
  - "prompt-engineering"
  - "rag"
  - "embeddings"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "knowledge-distillation"
  - "instruction-tuning"
  - "cost-optimization"
  - "chunking"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "orchestration"
  - "open-source"
  - "vllm"
  - "triton"
  - "pytorch"
  - "fastapi"
  - "spacy"
  - "langchain"
  - "hugging-face"
  - "nvidia"
  - "amazon-aws"
industryTags: "e-commerce"
company: "Coupang"
summary: "Coupang, a major e-commerce platform operating primarily in South Korea and Taiwan, faced challenges in scaling their ML infrastructure to support LLM applications across search, ads, catalog management, and recommendations. The company addressed GPU supply shortages and infrastructure limitations by building a hybrid multi-region architecture combining cloud and on-premises clusters, implementing model parallel training with DeepSpeed, and establishing GPU-based serving using Nvidia Triton and vLLM. This infrastructure enabled production applications including multilingual product understanding, weak label generation at scale, and unified product categorization, with teams using patterns ranging from in-context learning to supervised fine-tuning and continued pre-training depending on resource constraints and quality requirements."
link: "https://medium.com/coupang-engineering/accelerating-coupangs-ai-journey-with-llms-2817d55004d3"
year: 2024
seo:
  title: "Coupang: Large-Scale LLM Infrastructure for E-commerce Applications - ZenML LLMOps Database"
  description: "Coupang, a major e-commerce platform operating primarily in South Korea and Taiwan, faced challenges in scaling their ML infrastructure to support LLM applications across search, ads, catalog management, and recommendations. The company addressed GPU supply shortages and infrastructure limitations by building a hybrid multi-region architecture combining cloud and on-premises clusters, implementing model parallel training with DeepSpeed, and establishing GPU-based serving using Nvidia Triton and vLLM. This infrastructure enabled production applications including multilingual product understanding, weak label generation at scale, and unified product categorization, with teams using patterns ranging from in-context learning to supervised fine-tuning and continued pre-training depending on resource constraints and quality requirements."
  canonical: "https://www.zenml.io/llmops-database/large-scale-llm-infrastructure-for-e-commerce-applications"
  ogTitle: "Coupang: Large-Scale LLM Infrastructure for E-commerce Applications - ZenML LLMOps Database"
  ogDescription: "Coupang, a major e-commerce platform operating primarily in South Korea and Taiwan, faced challenges in scaling their ML infrastructure to support LLM applications across search, ads, catalog management, and recommendations. The company addressed GPU supply shortages and infrastructure limitations by building a hybrid multi-region architecture combining cloud and on-premises clusters, implementing model parallel training with DeepSpeed, and establishing GPU-based serving using Nvidia Triton and vLLM. This infrastructure enabled production applications including multilingual product understanding, weak label generation at scale, and unified product categorization, with teams using patterns ranging from in-context learning to supervised fine-tuning and continued pre-training depending on resource constraints and quality requirements."
---

## Overview

Coupang is a major e-commerce platform with significant presence in South Korea and Taiwan, operating across shopping, food delivery (eats), and entertainment (play) verticals. This case study describes their journey implementing LLMs in production across multiple use cases, focusing heavily on the infrastructure challenges and solutions they developed to support LLM operations at scale. The company faced unique challenges related to multilingual content (Korean, Mandarin, English), limited training data in these languages, and the computational demands of training and serving large models in a resource-constrained environment.

The case study presents a comprehensive view of their LLMOps journey, covering everything from model selection and training approaches to production deployment patterns. Importantly, Coupang's experience highlights practical tradeoffs between model quality, resource efficiency, and operational complexity that are common in production LLM deployments. Their approach emphasizes pragmatism over perfection, using open-source tools and experimenting with various techniques to find cost-effective solutions.

## Business Context and Applications

Before diving into the technical infrastructure, it's important to understand how Coupang uses LLMs across their business. The company had already established ML capabilities in three main areas: recommendation systems for personalization across feeds, search and ads; content understanding models for product catalog, user-generated content, and merchant data; and forecasting models for logistics, pricing, and delivery optimization. LLMs represented an evolution of these capabilities, particularly in content understanding where multilingual challenges were most acute.

The company deployed LLMs across three primary application areas. First, in image and language understanding, they used vision-language transformer models (particularly CLIP-based architectures) to jointly model product images with associated metadata, titles, descriptions, and queries. This approach yielded superior embeddings compared to learning separate representations, which were then used in ad retrieval, similarity search, and as features in recommendation models. Additional applications included translating product titles from Korean to Mandarin, improving image quality in shopping feeds, summarizing user reviews, and generating keywords for products and sellers.

Second, they used LLMs for generating weak labels at scale to address the challenge of obtaining human annotations, especially for multilingual content. LLMs could produce labels for text-based content at scale with quality approaching human annotators. After quality checks, these weak supervision labels were used for training various models, particularly valuable when bootstrapping models for new segments with limited high-quality labels. Internal experiments showed these weak labels enhanced relevance model quality and helped overcome label scarcity in under-resourced languages like Korean and Mandarin.

Third, for product categorization and attribute extraction, LLMs enabled a shift from managing multiple category-specific models (which created operational burden) to a single unified LLM-powered categorizer. The traditional approach of separate models per category was necessary because multi-class models produced noisy predictions for tail categories, but LLMs provided deeper understanding of product data (titles, descriptions, reviews, seller information) that enabled a unified approach with precision gains across most categories.

## Model Architecture Selection

Coupang's approach to model architecture reflects pragmatic choices balanced against their specific constraints. Rather than training foundation models from scratch, they adopted a strategy of taking open-source model architectures and fine-tuning them with domain-specific data. This approach allowed ML teams to leverage state-of-the-art pre-trained models and efficient architectures while saving both time and computational resources.

The primary consideration was multilingual performance, especially in CJK (Chinese, Japanese, Korean) languages. These languages present unique challenges including different spacing conventions, character-based rather than word-based structure, and larger vocabulary sizes. Each factor influences the tokenizer, which in turn affects language model quality. For language and NLP tasks, the most commonly used models were based on Qwen, LLAMA, T5, Phi, and Polyglot architectures. The company favored parameter sizes ranging from 3 billion to 20 billion parameters, finding this range struck a good balance between resource and compute efficiency and quality. This is notably smaller than the largest available models, reflecting realistic constraints around serving latency and infrastructure costs.

For image-text multimodal models, CLIP (Contrastive Language Image Pretraining) and TrOCR (Transformer-based OCR) were the preferred architectures for their efficiency and performance. The choice of multimodal models reflects the importance of visual product data in e-commerce and the prevalence of embedded text in product images.

## Patterns of LLM Usage

Coupang identified four primary patterns for using LLMs, arranged in increasing order of resource requirements and complexity. Understanding these patterns and their tradeoffs is central to their LLMOps approach.

In-context learning (ICL) remained one of the most popular methods for prototyping and evaluation. In this mode, a pre-trained LLM is provided with a prompt or context to guide answers for specific tasks without additional training. The same model can be reused for different tasks with different prompts. This approach is fast to set up and iterate, cheap since it involves no training, and versatile across multiple tasks. The case study notes this is particularly popular for prototyping and evaluating whether LLMs can address a particular problem before investing in more resource-intensive approaches.

Retrieval Augmented Generation (RAG) is mentioned as a technique where LLM-generated responses are grounded with facts fetched from external sources like knowledge bases, document corpora, or product catalogs. The case study notes that making the generation and retrieval components work seamlessly in real-time is nontrivial, leading to potential bottlenecks and errors. While RAG is acknowledged, the case study doesn't provide extensive detail on their RAG implementations, suggesting it may be less central to their current production use cases compared to other patterns.

Supervised fine-tuning (SFT) involves further training an existing base LLM on smaller datasets to improve performance on specific domains or tasks. A fine-tuned model on high-quality domain data often surpasses base LLM performance. This appears to be very popular at Coupang due to flexibility and resource efficiency, striking a balance between quality improvements and infrastructure costs.

Continued pre-training (CPT) refers to further pre-training of an existing base LLM on sizable datasets to improve generalized understanding without focusing on specific tasks. This is resource-intensive but often produces the best results on downstream tasks like attribute extraction. The case study suggests this is used more selectively when the quality improvements justify the computational investment.

The emphasis on in-context learning and supervised fine-tuning as the most popular patterns reflects practical constraints around GPU availability and operational complexity. These approaches allow teams to iterate quickly and achieve production-quality results without the massive computational investments required for continued pre-training or training from scratch.

## Development Lifecycle and Infrastructure

Coupang's LLM development lifecycle is structured into three phases, each with specific infrastructure requirements. This phased approach reflects the reality that development and production have different resource and capability needs.

The exploration phase focuses on small experiments to determine promising model architectures, sizes, and prompt templates. Developers use Apache Zeppelin notebooks for data preparation and processing, delegating tasks to underlying processing engines like Spark on Kubernetes. Model architecture and prompt template explorations occur on GPU or multi-GPU containerized Jupyter notebooks. This phase is about rapid iteration to narrow down options before committing significant compute resources.

During model training, based on the shortlisted candidates, developers use fine-tuning or pre-training depending on compute budget, dataset size, and model performance comparisons. They use Polyaxon for managing the ML training lifecycle on Kubernetes, with LLM training specifically using model parallel training on Kubernetes distributed training operator for PyTorch (PytorchJob). The case study emphasizes that there isn't any process difference from non-LLM model development here, suggesting their existing MLOps tooling adapted reasonably well to LLM workloads with the addition of model parallelism support.

The path to production reveals an interesting pragmatic approach. Rather than serving large LLMs directly in real-time, developers commonly use two strategies. First, distillation involves training a smaller model from the trained source LLM, with the smaller model used in real-time inference. Second, embeddings can be exported from LLMs and used in smaller models, a pattern particularly common in ranking problems. For extracting predictions at scale from source LLMs, batch and nearline inference on GPUs is the most popular approach. Developers use Ray combined with vLLM to write inference pipelines requiring both CPU and GPU processing. This approach acknowledges that while LLMs provide superior understanding and representation learning, serving them directly at scale for real-time e-commerce applications is often impractical, so distillation and embedding extraction provide a bridge to production.

The nearline inference pattern deserves special attention as it represents a middle ground between batch and real-time. Nearline inference combines the efficiency of batch inference (using small batches) with the responsiveness of being near real-time (within a certain time of event occurrence). For e-commerce applications with diverse content data streams (user and seller-generated content, orders), using LLMs in nearline inference mode helps teams support diverse downstream applications with a smaller resource footprint than full real-time serving would require.

## Infrastructure Challenges and Solutions

The case study identifies two key infrastructure challenges: resource efficiency and management due to GPU supply shortage and high costs, and capabilities for training and serving large models given that their existing stack wasn't equipped for distributed training (especially model parallel) and serving was entirely on CPUs.

### GPU Selection and Management

Coupang took a thoughtful approach to GPU selection, recognizing that different workloads have different requirements. LLMs are both compute and memory intensive, and device memory constraints play a crucial role in both training and serving. For training models with more than 1 billion parameters in mixed precision mode, they utilized A100-80GB GPUs. For testing and lightweight training, they could employ substantial quantities of A10G-24GB devices. The case study emphasizes conducting regular benchmarking with model-building teams to evaluate price-to-performance ratios of different GPUs for each model line. Given that each LLM family is available in multiple parameter sizes, using lower-performance devices for testing smaller versions proved highly cost-effective.

This tiered approach to GPU selection reflects mature infrastructure thinking, recognizing that the most expensive hardware isn't always necessary and that matching workload characteristics to appropriate hardware yields better overall economics. The emphasis on smaller model variants for testing also suggests good practices around development workflows that don't waste expensive resources on early-stage experimentation.

### Hybrid Multi-Region Architecture

To address GPU supply shortages, Coupang implemented a multi-region deployment strategy. By leveraging cloud service clusters across various regions in Asia-Pacific and the US, they ensured faster access to GPUs, mitigating wait times that could disrupt execution plans. Additionally, they built an on-premises cluster to provision a significant portion of their compute, especially higher-end Nvidia GPUs like A100s and H100s.

This hybrid arrangement proved instrumental in alleviating GPU shortages from cloud providers and reducing overall training costs. However, it also presented challenges around ensuring consistent infrastructure (storage and networking) and developer experience across environments. The case study doesn't detail how they addressed these consistency challenges, but the fact that they maintained this hybrid approach suggests the benefits outweighed the operational complexity.

The multi-region cloud strategy is particularly interesting as it reflects flexibility in infrastructure sourcing—being willing to deploy workloads wherever capacity is available rather than being constrained to a single region. This requires infrastructure-as-code practices and workload portability that many organizations struggle with.

### Training Frameworks and Model Parallelism

For LLM training, the inability to fit models into single GPU RAM necessitated going beyond simple data parallelism. Coupang supports several training frameworks implementing model sharding strategies, with DeepSpeed ZeRO being the most popular due to quick setup time and availability of trainer recipes for popular model architectures through Hugging Face Hub. Developers internally experiment and share recipes with smart defaults for hyperparameters including optimizer choice, gradient accumulation, and memory pinning.

The emphasis on shared recipes and smart defaults suggests good knowledge management practices around LLM training, helping teams avoid repeatedly solving the same problems. The popularity of DeepSpeed ZeRO likely reflects both its technical capabilities and the robust ecosystem support through Hugging Face, reducing the learning curve for teams adopting model parallel training.

### GPU Inference Infrastructure

Coupang built out three distinct inference modes, each addressing different latency and throughput requirements. For real-time model serving, the compute-intensive nature of LLMs required GPU support, but their existing serving stack wasn't equipped for GPUs. They selected Nvidia Triton for its containerized inference solution with features like dynamic batching, concurrent multi-model execution on GPUs, and compatibility with a broad range of backends. All real-time inference runs on Nvidia Triton on AWS EKS.

For batch inference, which plays a pivotal role in LLM explorations for generating responses on datasets post-training, they needed to handle both GPU and CPU processing. Text and image preprocessing can be distributed across CPU cores while primary model inference occurs on GPUs. After experimentation, they settled on Ray combined with vLLM for managing heterogeneous computing at scale. The case study specifically notes that vLLM provided approximately 20x throughput improvement in multiple workloads through their kernel implementations, highlighting the importance of optimization at the inference engine level.

Nearline inference, as mentioned earlier, provides a middle ground using small batches with near-real-time responsiveness. This mode appears particularly well-suited to e-commerce content processing where immediate response isn't required but results need to be available within reasonable time windows.

The distinct infrastructure for these three modes reflects mature thinking about serving requirements. Not all use cases need sub-second latency, and building specialized infrastructure for different latency/throughput profiles yields better resource efficiency than trying to serve everything through a single real-time serving layer.

## Optimization and Experimentation Culture

A notable theme throughout the case study is the emphasis on rapid experimentation and learning from the fast-changing LLM landscape. Coupang acknowledges that frequent model releases, new techniques, and performance benchmarks require keeping up through rapid experimentation.

They provide specific examples of wins from experimentation. The ~20x throughput improvement with vLLM's kernel implementations was discovered through experimentation. Similarly, experimenting with techniques like offloading model parameters to CPU helped create recipes for fine-tuning LLMs on more widely available GPUs with less RAM, unblocking developers from waiting for high-end GPU availability. Looking forward, they see significant opportunities with Nvidia H100s through FP8 quantization and Nvidia's Transformer Engine.

This culture of experimentation suggests that successful LLMOps isn't about finding a single optimal architecture but rather continuously evaluating new techniques and adapting approaches as the ecosystem evolves. The emphasis on creating and sharing recipes also suggests good knowledge management practices to propagate learnings across teams.

## Production Results and Impact

While the case study is somewhat light on specific quantitative metrics (which is common in public case studies from companies not selling these services), it indicates that LLMs have improved various production ML systems with promise in search and discovery, catalog management, operations, and ads quality. The specific mention of precision gains across most categories for product categorization and enhanced relevance model quality from weak labels suggests measurable quality improvements.

The expectation that more teams will adopt LLMs in coming quarters indicates that early results were sufficiently positive to justify continued investment and expansion. The fact that they're continuing to invest in infrastructure for training larger models and improving resource efficiency suggests they see LLMs as a long-term strategic capability rather than experimental technology.

## Critical Assessment and Considerations

While this case study provides valuable technical insights, readers should consider several factors. First, this is a self-published article by Coupang's engineering team, so it naturally emphasizes successes over failures or challenges that remain unsolved. The case study acknowledges infrastructure challenges but doesn't detail failed approaches or ongoing pain points in depth.

Second, Coupang's context is quite specific—a large e-commerce platform with significant engineering resources operating in markets (South Korea, Taiwan) where off-the-shelf English-focused models are insufficient. Organizations in different contexts (smaller scale, different languages, different latency requirements) might find different approaches more suitable.

Third, while the case study describes their infrastructure and approaches, it provides limited detail on model evaluation, quality assurance, monitoring, and other operational aspects of running LLMs in production. How do they evaluate whether a fine-tuned model is ready for production? How do they monitor for quality degradation? How do they handle model updates? These questions aren't addressed in detail.

Fourth, the emphasis on distillation and embedding extraction as paths to production reveals a pragmatic reality that large LLMs may be too expensive or slow to serve directly for many real-time use cases. This is an important consideration for organizations evaluating LLM adoption—the full model may not be what runs in production.

Finally, the case study focuses heavily on infrastructure and tooling but says less about organizational aspects like team structure, skill development, governance, and how they manage the complexity of multiple teams experimenting with LLMs. These softer aspects of LLMOps are often as important as the technical infrastructure.

## Conclusion and Broader Implications

Overall, this case study illustrates a mature, pragmatic approach to LLMOps at scale in a resource-constrained environment. Key themes include leveraging open-source tools rather than building everything from scratch, matching infrastructure to workload requirements rather than over-provisioning expensive resources, using simpler approaches (ICL, fine-tuning) where possible before moving to more complex ones, maintaining flexibility in infrastructure sourcing to work around supply constraints, and fostering experimentation culture to keep pace with ecosystem evolution.

The hybrid multi-region architecture, tiered GPU selection, and multiple inference modes all reflect sophisticated thinking about resource efficiency and cost management. The emphasis on distillation and embedding extraction as production paths acknowledges practical constraints around serving large models at e-commerce scale. The success with weaker supervision from LLM-generated labels suggests interesting opportunities for addressing data scarcity in specialized domains and under-resourced languages.

For organizations considering similar LLM deployments, Coupang's experience suggests starting with in-context learning and fine-tuning rather than attempting to train or continuously pre-train the largest possible models, investing in flexible infrastructure that can adapt to supply constraints and workload variation, building clear paths from experimentation to production that may involve distillation or embedding extraction rather than serving large models directly, and maintaining focus on practical wins and incremental improvements rather than trying to solve everything at once with the most sophisticated approaches.