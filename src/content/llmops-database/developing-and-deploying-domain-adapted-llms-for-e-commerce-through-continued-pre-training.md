---
title: "Developing and Deploying Domain-Adapted LLMs for E-commerce Through Continued Pre-training"
slug: "developing-and-deploying-domain-adapted-llms-for-e-commerce-through-continued-pre-training"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6790ab42875cdbf558a6d9db"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:56:18.427Z"
  createdOn: "2025-01-22T08:24:34.538Z"
llmopsTags:
  - "structured-output"
  - "multi-modality"
  - "unstructured-data"
  - "legacy-system-integration"
  - "fine-tuning"
  - "instruction-tuning"
  - "model-optimization"
  - "token-optimization"
  - "pytorch"
  - "triton"
  - "meta"
  - "nvidia"
industryTags: "e-commerce"
company: "eBay"
summary: "eBay tackled the challenge of incorporating LLMs into their e-commerce platform by developing e-Llama, a domain-adapted version of Llama 3.1. Through continued pre-training on a mix of e-commerce and general domain data, they created 8B and 70B parameter models that achieved 25% improvement in e-commerce tasks while maintaining strong general performance. The training was completed efficiently using 480 NVIDIA H100 GPUs and resulted in production-ready models aligned with human feedback and safety requirements."
link: "https://innovation.ebayinc.com/tech/features/scaling-large-language-models-for-e-commerce-the-development-of-a-llama-based-customized-llm-for-e-commerce/"
year: 2025
seo:
  title: "eBay: Developing and Deploying Domain-Adapted LLMs for E-commerce Through Continued Pre-training - ZenML LLMOps Database"
  description: "eBay tackled the challenge of incorporating LLMs into their e-commerce platform by developing e-Llama, a domain-adapted version of Llama 3.1. Through continued pre-training on a mix of e-commerce and general domain data, they created 8B and 70B parameter models that achieved 25% improvement in e-commerce tasks while maintaining strong general performance. The training was completed efficiently using 480 NVIDIA H100 GPUs and resulted in production-ready models aligned with human feedback and safety requirements."
  canonical: "https://www.zenml.io/llmops-database/developing-and-deploying-domain-adapted-llms-for-e-commerce-through-continued-pre-training"
  ogTitle: "eBay: Developing and Deploying Domain-Adapted LLMs for E-commerce Through Continued Pre-training - ZenML LLMOps Database"
  ogDescription: "eBay tackled the challenge of incorporating LLMs into their e-commerce platform by developing e-Llama, a domain-adapted version of Llama 3.1. Through continued pre-training on a mix of e-commerce and general domain data, they created 8B and 70B parameter models that achieved 25% improvement in e-commerce tasks while maintaining strong general performance. The training was completed efficiently using 480 NVIDIA H100 GPUs and resulted in production-ready models aligned with human feedback and safety requirements."
---

## Overview

eBay, one of the world's largest e-commerce marketplaces with billions of active listings and millions of active sellers across 190 global markets, has developed a hybrid approach to large language models (LLMs) that balances in-house development with adaptation of existing open-source models. This case study focuses on their "e-Llama" initiative, which involves continued pretraining of Meta's Llama 3.1 models to infuse e-commerce domain knowledge while retaining general capabilities.

The motivation for this work stems from several practical concerns that many enterprises face when deploying LLMs at scale. Third-party models like GPT-4 and Claude, while powerful, present significant challenges for a company of eBay's scale: considerable costs that make them impractical for high-volume use cases, data security risks from sending proprietary information to external services, and limited ability to fine-tune on proprietary data. These constraints drove eBay to invest in building in-house LLM capabilities.

## Strategic Approach to LLM Development

eBay has adopted a dual-track strategy for LLM development that is worth noting from an LLMOps perspective. On one track, they build e-commerce LLMs completely from scratch, including their "LiLiuM" family of models, which gives them complete control over licensing, data, architecture, and vocabulary. On the other track, they adapt existing third-party open models like Meta's Llama toward the e-commerce domain through continued pretraining on mixed data. This hybrid approach allows them to balance the speed advantages of leveraging existing pretrained models with the control benefits of proprietary development.

The case study specifically details the Llama-based track, resulting in 8-billion and 70-billion parameter "e-Llama" models. This approach allows eBay to move faster and unlock value without developing models entirely from scratch, while still customizing the models for their specific domain needs.

## Data Strategy and Catastrophic Forgetting Prevention

A critical challenge in continued pretraining is preventing "catastrophic forgetting" – the phenomenon where a model loses previously learned general knowledge when trained on domain-specific data. eBay addressed this through careful data curation and mixture strategies.

Their training data combines several sources. For general domain retention, they included a "replay" set of examples similar to what the original Llama models were trained on, drawn from curated publicly available and open-source datasets, along with smaller but higher-quality datasets. They also included 10% non-English language general domain data to enhance multilingual capabilities, which is particularly important given eBay's global marketplace spanning 190 markets.

For e-commerce domain knowledge, they utilized data from public listings and product reviews from the eBay website, which was thoroughly filtered and serialized for autoregressive language modeling. Additionally, they trained an e-commerce classifier to extract domain-specific examples from larger open-source datasets. This classifier-based extraction approach is an interesting technique for expanding domain-specific training data beyond what is directly available from proprietary sources.

The final data mixture used a 1:1 ratio of general-to-e-commerce data, which they determined through experimentation to provide the best balance between domain adaptation and general capability retention.

## Training Infrastructure and Distributed Computing

The infrastructure details provided offer valuable insights into the scale of compute required for training large models at the 70B parameter level. eBay used 60 nodes, each equipped with 8 NVIDIA H100 80GB GPUs, totaling 480 GPUs. Intra-node GPU communication used NVIDIA NVLink, while inter-node communication used InfiniBand – a standard high-performance computing configuration for distributed deep learning.

Training at this scale requires sophisticated parallelism strategies. eBay employed Megatron-LM as their training framework, which enabled 3D parallelism combining data parallelism (DP), tensor parallelism (TP), and pipeline parallelism (PP). They also used distributed optimizer states and Flash Attention 2 for memory and compute efficiency.

The training hyperparameters were determined through smaller-scale experiments before full-scale training. Key findings included using a maximum learning rate of 10% of the original Llama pretraining learning rate (a common practice in continued pretraining to avoid disrupting learned representations), cosine learning rate scheduling with warmup, a batch size of approximately 11.8 million tokens, and 85,000 total update steps. This configuration resulted in training on 1 trillion tokens total.

Training the 70B parameter model on 1 trillion tokens required approximately one month and 340,000 GPU-hours. eBay claims their setup was more efficient than what was reported for Llama 2 base model training, though direct comparisons are difficult given differences in model architecture and training objectives.

## Results and Performance Evaluation

The e-Llama models demonstrated significant improvements on domain-specific tasks while maintaining general capabilities. On e-commerce-specific benchmarks, the models showed approximately 25% improvement for English and about 30% improvement for non-English compared to the corresponding Llama 3.1 base models. This suggests the continued pretraining was particularly effective for multilingual e-commerce understanding, possibly due to the inclusion of non-English data in the training mixture.

Importantly, the large 70B e-Llama model showed only 1% degradation on general domain natural language understanding (NLU) benchmarks. This minimal regression indicates that the data mixing strategy and training hyperparameters successfully balanced domain adaptation with capability retention. The article does not provide specific details about what benchmarks were used, which limits the ability to fully evaluate these claims.

## Post-Training Alignment

After continued pretraining, eBay performed instruction tuning on the models, aligning them with human feedback. This post-training phase served multiple purposes: ensuring generated content is safe and contextually appropriate, teaching the models guardrails, and improving their ability to follow explicit instructions. This aligns with standard practices for preparing base models for production use cases.

The instruction tuning step is mentioned briefly without technical details, but it represents an important part of the LLMOps pipeline – the transition from a pretrained model optimized for next-token prediction to an assistant-style model that can be deployed for user-facing applications.

## Critical Assessment

While the case study presents compelling results, several aspects warrant consideration. The 25-30% improvement claims on e-commerce benchmarks are impressive but lack specific detail about benchmark composition and methodology. Without knowing what tasks and datasets comprise these benchmarks, it is difficult to assess the practical significance of these improvements.

The claimed 1% degradation on general NLU benchmarks is remarkably low for such extensive domain adaptation. This is a positive result if accurate, but more detailed breakdown of performance across different general capabilities would strengthen confidence in these claims.

The cost and time investment of 340,000 GPU-hours for the 70B model training is substantial and may not be feasible for many organizations. However, for a company of eBay's scale with billions of listings and potential AI applications across the platform, this investment could yield significant returns if the models enable cost savings compared to API-based third-party model usage.

The case study also mentions but does not detail the proprietary LiLiuM family of models trained from scratch, which would be interesting to compare against the Llama-based approach in terms of performance, cost, and flexibility.

## Implications for LLMOps Practice

This case study illustrates several important patterns for enterprise LLM deployment. First, the hybrid strategy of both building from scratch and adapting existing models provides flexibility – companies can use pretrained models for faster iteration while maintaining proprietary options for cases requiring more control. Second, continued pretraining with careful data mixing is a viable strategy for domain adaptation at scale, offering a middle ground between using general models and training from scratch. Third, infrastructure investment in high-performance computing clusters with modern GPUs and interconnects is necessary for training models at the 70B+ parameter scale within reasonable timeframes. Finally, the importance of post-training alignment through instruction tuning and human feedback remains critical for production deployment of base models.

The work demonstrates that large enterprises with sufficient data and compute resources can create competitive domain-specific LLMs by building on open foundation models, potentially reducing dependence on third-party API providers while maintaining or improving performance for their specific use cases.