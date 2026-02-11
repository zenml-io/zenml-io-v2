---
title: "Fine-tuning and Scaling LLMs for Search Relevance Prediction"
slug: "fine-tuning-and-scaling-llms-for-search-relevance-prediction"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bcd8f1b68703dbb47c6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:39:24.930Z"
  createdOn: "2024-11-21T13:55:25.805Z"
llmopsTags:
  - "chunking"
  - "classification"
  - "cost-optimization"
  - "fine-tuning"
  - "knowledge-distillation"
  - "latency-optimization"
  - "meta"
  - "model-optimization"
  - "monitoring"
  - "open-source"
  - "prompt-engineering"
  - "rag"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "structured-output"
  - "token-optimization"
industryTags: "e-commerce"
company: "Faire"
summary: "Faire, an e-commerce marketplace, tackled the challenge of evaluating search relevance at scale by transitioning from manual human labeling to automated LLM-based assessment. They first implemented a GPT-based solution and later improved it using fine-tuned Llama models. Their best performing model, Llama3-8b, achieved a 28% improvement in relevance prediction accuracy compared to their previous GPT model, while significantly reducing costs through self-hosted inference that can handle 70 million predictions per day using 16 GPUs."
link: "https://craft.faire.com/fine-tuning-llama3-to-measure-semantic-relevance-in-search-86a7b13c24ea"
year: 2024
seo:
  title: "Faire: Fine-tuning and Scaling LLMs for Search Relevance Prediction - ZenML LLMOps Database"
  description: "Faire, an e-commerce marketplace, tackled the challenge of evaluating search relevance at scale by transitioning from manual human labeling to automated LLM-based assessment. They first implemented a GPT-based solution and later improved it using fine-tuned Llama models. Their best performing model, Llama3-8b, achieved a 28% improvement in relevance prediction accuracy compared to their previous GPT model, while significantly reducing costs through self-hosted inference that can handle 70 million predictions per day using 16 GPUs."
  canonical: "https://www.zenml.io/llmops-database/fine-tuning-and-scaling-llms-for-search-relevance-prediction"
  ogTitle: "Faire: Fine-tuning and Scaling LLMs for Search Relevance Prediction - ZenML LLMOps Database"
  ogDescription: "Faire, an e-commerce marketplace, tackled the challenge of evaluating search relevance at scale by transitioning from manual human labeling to automated LLM-based assessment. They first implemented a GPT-based solution and later improved it using fine-tuned Llama models. Their best performing model, Llama3-8b, achieved a 28% improvement in relevance prediction accuracy compared to their previous GPT model, while significantly reducing costs through self-hosted inference that can handle 70 million predictions per day using 16 GPUs."
---

## Overview

Faire is a global wholesale marketplace that connects hundreds of thousands of independent brands and retailers worldwide. Search functionality is critical to their platform, as it serves as the primary mechanism for retailers to discover and purchase products. The challenge they faced was that irrelevant search results not only frustrated users but also undermined trust in Faire's ability to match retailers with appropriate brands.

The core problem was measuring semantic relevance at scale. Traditional human labeling was expensive, slow (with a one-month delay between measurement and available labels), and couldn't keep up with the evolving search system—particularly as personalized retrieval sources increased the variation of query-product pairs shown to different retailers.

## Problem Definition and Relevance Framework

Before any modeling work began, the team established a clear definition of relevance using the ESCI framework from the Amazon KDD Cup 2022. This framework breaks down relevance into four tiers:

- **Exact (E)**: The item is relevant and satisfies all query specifications
- **Substitute (S)**: The item is somewhat relevant but can serve as a functional substitute
- **Complement (C)**: The item doesn't fulfill the query but could be used alongside an exact item
- **Irrelevant (I)**: The item is irrelevant or fails to fulfill a central aspect of the query

This multi-tiered approach provides flexibility for downstream applications—search engine optimization might only use exact matches for high precision, while retrieval and ranking systems might focus on removing irrelevant matches to prioritize broader recall.

The team developed labeling guidelines with decision trees to achieve over 90% agreement among human labelers and quality audits. This investment in clear problem definition and high-quality labeled data proved essential for model performance.

## Evolution of the Solution

### Phase 1: Human Labeling

The initial approach involved working with a data annotation vendor to label sample query-product pairs monthly. This established ground truth and allowed iteration on guidelines for edge cases. However, the process was expensive and had significant lag time, making relevance measurements less actionable.

### Phase 2: Fine-tuned GPT Model

The team framed the multi-class classification as a text completion problem, fine-tuning a leading GPT model to predict ESCI labels. The prompt concatenated search query text with product information (name, description, brand, category), and the model completed the text with one of the four relevance labels.

This approach achieved 0.56 Krippendorff's Alpha and could label approximately 300,000 query-product pairs per hour. While this enabled daily relevance measurement, costs remained a limiting factor for scaling to the tens of millions of predictions needed.

### Phase 3: Open-Source Llama Fine-tuning

The hypothesis was that semantic search relevance, despite its nuances, is a specific language understanding problem that may not require models with hundreds of billions of parameters. The team focused on Meta's Llama family due to its benchmark performance and commercial licensing.

## Technical Implementation Details

### Fine-tuning Approach

The fine-tuning centered on smaller base models: Llama2-7b, Llama2-13b, and Llama3-8b. A significant advantage was that these models fit into the memory of a single A100 GPU, enabling rapid prototyping and iteration.

Key technical decisions included:

- **Parameter Efficient Fine-Tuning (PEFT) with LoRA adapters**: The base model weights were frozen, and only about 4% of parameters were trainable. This reduced memory usage and dramatically accelerated training speed.
- **Batched training with padding**: Short sequences were padded with the end-of-sequence token, and cross-entropy loss was computed only for tokens in the completion text.
- **DeepSpeed integration**: Training used DeepSpeed on 8 A100 GPUs with data and tensor parallelization.
- **Gradient checkpointing**: This technique recomputes some nodes to reduce GPU memory consumption, trading speed for memory stability and reducing out-of-memory issues.

### Dataset Experiments

The team tested three dataset sizes: Small (11k samples), Medium (50k samples), and Large (250k samples). The existing production GPT model was fine-tuned on the Small dataset, while new Llama models were trained on Medium and Large datasets for two epochs. A hold-out dataset of approximately 5k records was used for evaluation.

Training time scaled with model size—the largest model (Llama2-13b) took about five hours to complete training on the Large dataset.

### Performance Results

The best-performing model, Llama3-8b trained on the Large dataset, achieved a 28% improvement in Krippendorff's Alpha compared to the existing production GPT model. Key findings included:

- Basic prompt engineering with zero-shot prediction was not performant for Faire's definition of semantic search relevance. The fine-tuned GPT model had nearly 2x accuracy compared to prompt engineering alone.
- Dataset size and composition were the most important factors in improving performance. Models trained on the Large dataset consistently outperformed those trained on smaller datasets.
- Performance differences between base models decreased with more training data. On the Medium dataset, fine-tuned GPT and Llama2-7b reached performance parity, while Llama3-8b improved by approximately 8%.
- Llama3-8b achieved similar performance to the larger Llama2-13b model, demonstrating efficiency gains in the newer architecture.

### Production Inference Setup

The selected Llama3-8b model is hosted on Faire's GPU cluster for batch predictions. The application requires scoring tens of millions of product-query pairs daily, demanding high throughput optimization:

- **8-bit quantization**: Reduced model precision to lower memory requirements and increase speed
- **Batched inference**: Maximized GPU utilization by processing multiple samples simultaneously
- **DeepSpeed serving**: Leveraged DeepSpeed's optimized inference capabilities
- **Horizontal scaling**: Distributed workload across 16 A100 GPUs

These optimizations enabled throughput of 70 million predictions per day during backfill operations, representing a substantial improvement in both cost and capability compared to the previous API-based GPT solution.

## Cost and Operational Benefits

A critical advantage of the self-hosted approach was leveraging existing GPUs procured for general deep learning development. This meant:

- No incremental costs for fine-tuning iterations
- Faster experimentation cycles for hyperparameter tuning
- Predictable infrastructure costs rather than per-API-call pricing
- Ability to scale throughput without proportional cost increases

## Current and Future Applications

The current use of relevance predictions is primarily offline, enabling:

- Offline retrieval analysis
- Measurement of personalization effects
- Quantifying experimental contributions to relevance
- Pareto frontier exploration between engagement and relevance in ranking

The team has identified several areas for future exploration:

- **Real-time deployment**: Would require low-cost, low-latency inference solutions, potentially through model distillation to smaller models
- **RAG integration**: To address missing domain context such as understanding brand product lines or styles
- **Multimodal LLMs**: Exploring models like LLaVA to incorporate rich image information beyond text-only context
- **Explainability**: Using LLMs to explain relevance judgments, which could help understand difficult search cases and potentially improve performance through chain-of-thought reasoning

## Key Takeaways for LLMOps

This case study demonstrates several important LLMOps principles:

- **Problem definition matters**: Even with powerful LLMs, clear definitions and high-quality labeled data are essential prerequisites
- **Fine-tuning outperforms prompt engineering for specialized tasks**: Basic prompt engineering could not capture Faire's nuanced definition of semantic relevance
- **Open-source models can exceed proprietary alternatives**: The fine-tuned Llama3-8b outperformed the fine-tuned GPT model by 28%
- **Efficient fine-tuning techniques enable iteration**: LoRA, gradient checkpointing, and parallelization made experimentation practical
- **Inference optimization is crucial for production scale**: Quantization, batching, optimized serving frameworks, and horizontal scaling were all necessary to achieve the required throughput
- **Self-hosted inference provides cost advantages at scale**: Using existing GPU infrastructure rather than API-based services significantly reduced costs for high-volume inference