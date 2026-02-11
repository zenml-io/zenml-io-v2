---
title: "Large Language Models for Search Relevance via Knowledge Distillation"
slug: "large-language-models-for-search-relevance-via-knowledge-distillation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67f394957596baf90dc18126"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:05:45.198Z"
  createdOn: "2025-04-07T09:02:13.918Z"
llmopsTags:
  - "multi-modality"
  - "classification"
  - "caption-generation"
  - "knowledge-distillation"
  - "embeddings"
  - "fine-tuning"
  - "semantic-search"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "pytorch"
  - "wandb"
  - "meta"
  - "hugging-face"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest tackled the challenge of improving search relevance by implementing a large language model-based system. They developed a cross-encoder LLM teacher model trained on human-annotated data, which was then distilled into a lightweight student model for production deployment. The system processes rich Pin metadata including titles, descriptions, and synthetic image captions to predict relevance scores. The implementation resulted in a 2.18% improvement in search feed relevance (nDCG@20) and over 1.5% increase in search fulfillment rates globally, while successfully generalizing across multiple languages despite being trained primarily on US data."
link: "https://medium.com/pinterest-engineering/improving-pinterest-search-relevance-using-large-language-models-4cd938d4e892"
year: 2024
seo:
  title: "Pinterest: Large Language Models for Search Relevance via Knowledge Distillation - ZenML LLMOps Database"
  description: "Pinterest tackled the challenge of improving search relevance by implementing a large language model-based system. They developed a cross-encoder LLM teacher model trained on human-annotated data, which was then distilled into a lightweight student model for production deployment. The system processes rich Pin metadata including titles, descriptions, and synthetic image captions to predict relevance scores. The implementation resulted in a 2.18% improvement in search feed relevance (nDCG@20) and over 1.5% increase in search fulfillment rates globally, while successfully generalizing across multiple languages despite being trained primarily on US data."
  canonical: "https://www.zenml.io/llmops-database/large-language-models-for-search-relevance-via-knowledge-distillation"
  ogTitle: "Pinterest: Large Language Models for Search Relevance via Knowledge Distillation - ZenML LLMOps Database"
  ogDescription: "Pinterest tackled the challenge of improving search relevance by implementing a large language model-based system. They developed a cross-encoder LLM teacher model trained on human-annotated data, which was then distilled into a lightweight student model for production deployment. The system processes rich Pin metadata including titles, descriptions, and synthetic image captions to predict relevance scores. The implementation resulted in a 2.18% improvement in search feed relevance (nDCG@20) and over 1.5% increase in search fulfillment rates globally, while successfully generalizing across multiple languages despite being trained primarily on US data."
---

## Overview

Pinterest, a visual discovery platform where users search for inspiring content, developed a sophisticated LLM-based search relevance system to improve how well search results match user queries. This case study provides an excellent example of how to deploy large language models in production at scale, addressing the fundamental tension between model quality and serving constraints. The work was published in April 2025 and represents a mature production system with extensive offline experimentation and online A/B testing validation.

The core problem Pinterest faced was that search relevance—measuring how well search results align with a query—is critical for user satisfaction, but achieving high-quality relevance predictions requires sophisticated language understanding. Traditional engagement-based signals can be noisy and may not reflect genuine relevance. Pinterest uses a 5-level relevance scale ranging from "irrelevant" (score 1) to "highly relevant" (score 5), with clear guidelines distinguishing between levels based on how well a Pin serves the user's information needs.

## Technical Architecture and LLMOps Approach

### Teacher-Student Architecture for Production Serving

The fundamental LLMOps challenge Pinterest solved was making powerful but computationally expensive LLMs viable for real-time search serving. Their solution employs a teacher-student architecture that separates model quality from serving constraints:

The **teacher model** is a cross-encoder LLM (specifically Llama-3-8B in their best configuration) that directly processes the query and Pin text together to predict relevance. This architecture, while highly accurate, requires running inference for every query-Pin pair, making it infeasible for real-time serving where latency and cost are critical constraints.

The **student model** is a lightweight feed-forward network that uses pre-computed embeddings and features rather than processing raw text at inference time. This model uses query-level features (query interest features, shopping interest features, SearchSAGE query embeddings), Pin-level features (PinSAGE embeddings, visual embeddings, SearchSAGE Pin embeddings), and query-Pin interaction features (BM25 scores, text match scores, historical engagement rates).

The key insight is that the expensive teacher model runs in batch processing on logged data to generate training labels, while the efficient student model handles real-time serving. This decoupling allows Pinterest to benefit from LLM quality without incurring LLM-level latency in production.

### Knowledge Distillation and Semi-Supervised Learning Pipeline

The data pipeline is central to this system's success. Pinterest uses the LLM teacher model to generate 5-scale relevance labels on a "daily logged large search engagement and impression dataset with billions of rows." This approach combines knowledge distillation with semi-supervised learning in several important ways:

First, it dramatically expands the training data beyond what human annotation can provide. The offline experiments show clear improvements when training on 10x, 50x, and 100x the amount of labeled data, demonstrating that the distillation approach effectively leverages unlabeled data.

Second, it enables multilingual generalization. By using a multilingual LLM teacher (such as mDeBERTa-V3-base or XLM-RoBERTa-large), the system successfully generalizes from human-labeled data focused on US queries to unseen languages and countries. The online results demonstrate this with search fulfillment rate increases of +1.7% in the US, +2.4% in France, +2.5% in Mexico, and +2.4% in Japan—all despite training primarily on US annotated data.

Third, it handles seasonality and concept drift. Pinterest Search experiences seasonal trends, and new concepts constantly emerge. The daily batch labeling process using the teacher model allows the system to adapt to new content without requiring continuous human annotation.

### Model Selection and Training Techniques

Pinterest conducted thorough offline experiments comparing different base language models for the teacher. The models evaluated included multilingual BERT-base, T5-base, mDeBERTa-V3-base, XLM-RoBERTa-large, and Llama-3-8B. Performance scaled with model sophistication and size, with Llama-3-8B achieving 49.0% accuracy on 5-scale prediction compared to 40.9% for multilingual BERT-base (a 12.5% relative improvement) and 36.6% for a baseline using only SearchSAGE embeddings (a 19.7% relative improvement).

For training larger models like Llama, Pinterest employed several efficiency techniques that are crucial for practical LLMOps:

- **qLoRA (Quantized Low-Rank Adaptation)**: Loading quantized model weights and applying LoRA for fine-tuning, significantly reducing memory requirements
- **Gradient checkpointing**: Trading computation for memory by recomputing intermediate activations during backpropagation
- **Mixed precision training**: Using lower-precision arithmetic where possible to improve throughput and reduce memory usage

These techniques made it feasible to fine-tune an 8B parameter model on their in-house search relevance training data.

### Rich Text Feature Engineering

A notable aspect of the system is the careful engineering of text features to represent Pins, which are multimedia entities. The features include:

- **Pin titles and descriptions**: User-created metadata from Pin creation
- **Synthetic image captions**: Generated using BLIP (Bootstrapping Language-Image Pre-training), an off-the-shelf image captioning model—this allows visual content to be represented textually for the language model
- **High-engagement query tokens**: Queries that historically drove high engagement with a Pin, providing a form of behavioral signal encoded as text
- **User-curated board titles**: Titles of boards where users saved the Pin, offering collaborative filtering-style signals
- **Link titles and descriptions**: Metadata from linked external webpages

Ablation experiments showed that each text feature contributes incrementally to model performance, with the full feature set achieving 56.6% accuracy compared to 48.9% with only Pin titles and descriptions.

## Evaluation Strategy

Pinterest's evaluation approach demonstrates mature LLMOps practices. The offline evaluation uses 5-scale accuracy and AUROC metrics at different binarization thresholds (3, 4, and 5), with emphasis on identifying highly relevant content since that's most important for ranking.

For online evaluation, Pinterest employed multiple complementary approaches:

- **Human relevance evaluations**: Human annotators assessed search feeds with and without the new model, measuring nDCG@20 (Normalized Discounted Cumulative Gain at position 20). The system achieved +2.18% improvement on this metric.
- **Cross-language human evaluations**: Precision@8 measurements across different countries (US, France, Mexico, Japan) validated multilingual generalization.
- **User-triggered A/B experiments**: The search fulfillment rate—the proportion of search sessions resulting in high-significance user actions—was the primary business metric. Global improvements exceeded 1.5%.

## Production Considerations and Future Directions

The architecture reflects several important production considerations. The student model uses pre-computed embeddings (SearchSAGE, PinSAGE, visual embeddings) that can be indexed and retrieved efficiently, avoiding expensive embedding computation at query time. The relevance scores from the student model are combined with engagement predictions to determine final ranking, showing how relevance fits into a broader ranking system.

Pinterest notes future work directions including servable LLMs (suggesting interest in moving beyond pure distillation to direct LLM serving), vision-and-language multimodal models (VLMs) that could eliminate the need for synthetic image captions, and active learning strategies for dynamically improving training data quality.

## Critical Assessment

This case study represents a well-executed and thoroughly validated LLMOps deployment. The claims are backed by concrete metrics from both offline experiments and online A/B tests. The teacher-student architecture is a proven approach for deploying LLM quality at scale, and Pinterest provides good detail on the technical choices involved.

One limitation of the case study is that specific details about serving infrastructure, latency numbers, and cost considerations are not provided—the paper focuses on model quality rather than operational metrics. Additionally, while the improvements are statistically significant, the magnitudes (1-2% improvements) are relatively modest, though this is typical for mature production systems where incremental gains are hard-won.

The approach of using synthetic image captions (BLIP) to make visual content accessible to language models is pragmatic but introduces potential error cascading—if the caption generator makes mistakes, those propagate to relevance predictions. The future direction of using VLMs suggests Pinterest recognizes this limitation.

Overall, this case study provides valuable insights into production LLM deployment patterns, particularly the teacher-student distillation approach, multilingual generalization through semi-supervised learning, and the comprehensive evaluation strategy combining offline metrics, human evaluation, and business metrics.