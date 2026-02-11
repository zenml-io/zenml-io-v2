---
title: "RoBERTa for Large-Scale Merchant Classification"
slug: "roberta-for-large-scale-merchant-classification"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67d7f952ead5eea2656ba704"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:03:52.286Z"
  createdOn: "2025-03-17T10:28:34.790Z"
llmopsTags:
  - "classification"
  - "high-stakes-application"
  - "structured-output"
  - "regulatory-compliance"
  - "fine-tuning"
  - "prompt-engineering"
  - "model-optimization"
  - "token-optimization"
  - "latency-optimization"
  - "pytorch"
  - "monitoring"
  - "scaling"
  - "hugging-face"
  - "databricks"
  - "nvidia"
industryTags: "finance"
company: "Square"
summary: "Square developed and deployed a RoBERTa-based merchant classification system to accurately categorize millions of merchants across their platform. The system replaced unreliable self-selection methods with an ML approach that combines business names, self-selected information, and transaction data to achieve a 30% improvement in accuracy. The solution runs daily predictions at scale using distributed GPU infrastructure and has become central to Square's business metrics and strategic decision-making."
link: "https://developer.squareup.com/blog/roberta-model-for-merchant-categorization-at-square/"
year: 2025
seo:
  title: "Square: RoBERTa for Large-Scale Merchant Classification - ZenML LLMOps Database"
  description: "Square developed and deployed a RoBERTa-based merchant classification system to accurately categorize millions of merchants across their platform. The system replaced unreliable self-selection methods with an ML approach that combines business names, self-selected information, and transaction data to achieve a 30% improvement in accuracy. The solution runs daily predictions at scale using distributed GPU infrastructure and has become central to Square's business metrics and strategic decision-making."
  canonical: "https://www.zenml.io/llmops-database/roberta-for-large-scale-merchant-classification"
  ogTitle: "Square: RoBERTa for Large-Scale Merchant Classification - ZenML LLMOps Database"
  ogDescription: "Square developed and deployed a RoBERTa-based merchant classification system to accurately categorize millions of merchants across their platform. The system replaced unreliable self-selection methods with an ML approach that combines business names, self-selected information, and transaction data to achieve a 30% improvement in accuracy. The solution runs daily predictions at scale using distributed GPU infrastructure and has become central to Square's business metrics and strategic decision-making."
---

## Overview

Square, a major payment processing and business services company, developed a RoBERTa-based machine learning model to accurately categorize the types of businesses (merchants) that use their platform. This case study provides an excellent example of deploying a large language model for production classification tasks at scale, dealing with tens of millions of merchants requiring daily inference.

The core business problem was that Square's previous approach to merchant categorization—primarily relying on merchant self-selection during onboarding—was highly inaccurate. Merchants often rushed through onboarding, faced confusion with granular category options, or lacked clear definitions of what each category meant. This led to significant business challenges including misinformed product strategy, ineffective marketing targeting, incorrect product eligibility determinations, and potentially overpaying on interchange fees to card issuers.

## Technical Approach and Architecture

Square's solution leveraged the RoBERTa (Robustly Optimized BERT Pretraining Approach) architecture, specifically the `roberta-large` model from Hugging Face. While the blog post refers to this as utilizing "LLMs," it's worth noting that RoBERTa is technically a masked language model designed for understanding tasks rather than generation, making it well-suited for classification problems. The model was fine-tuned for multi-class sequence classification using the `AutoModelForSequenceClassification` class from Hugging Face Transformers.

### Data Preparation and Quality

A crucial differentiator in this approach was the emphasis on high-quality training data. The team assembled a dataset of over 20,000 merchants with manually reviewed ground truth labels, addressing a key weakness of previous ML approaches that had relied on inaccurate self-selected labels as training targets. This manual review process, while labor-intensive, established a reliable foundation for the model.

The data preprocessing pipeline included several thoughtful steps:

- **Removal of Auto-Created Services**: Square automatically generates catalog items for new merchants based on their self-selected category to help with onboarding. However, this creates noise when merchants select incorrect categories. The team removed auto-created services that weren't manually modified by merchants, taking the view that unmodified auto-created items likely don't represent actual business offerings.

- **Purchase Frequency Ranking**: Given token limits in transformer models, the team addressed the challenge of merchants with very large catalogs (potentially tens of thousands of items) by ranking catalog items by purchase frequency and truncating beyond the token threshold. This ensures the model focuses on the most representative items—what merchants actually sell most frequently.

- **Prompt Formatting**: The team applied prompt engineering principles to structure inputs in a clear, consistent format. An example input string combines multiple signals: "Business Name: Massage Flow | Item Names: Full Body Massage, Intense Hydration Massage, Hot Stone Massage, Deep Tissue Massage | Onboarding Business Category: health care and fitness | Onboarding Business Subcategory: massage therapist". This structured approach provides rich context while maintaining consistency.

### Model Training Infrastructure

Training was conducted on Databricks using GPU-based clusters with NVIDIA A10G GPUs. The team employed several memory optimization techniques essential for working with large models:

- **FP16 (Mixed Precision)**: Using 16-bit floating-point numbers instead of 32-bit reduces memory usage while maintaining acceptable precision for training.

- **Gradient Checkpointing**: Rather than storing all intermediate activations during forward passes, this technique recomputes them during backward passes, trading compute for memory.

The training configuration used the AdamW optimizer with a learning rate of 1e-05, linear learning rate scheduler with 5% warmup, batch size of 16, and 4 epochs. The team used the Hugging Face Trainer class for managing the training loop, a common pattern for production ML workflows using transformer models.

### Production Inference at Scale

One of the most operationally significant aspects of this case study is the daily inference pipeline that processes predictions for tens of millions of merchants. The team employed multiple techniques to make this feasible:

- **Multi-GPU Parallelism**: While training used a single A10G GPU, inference scaled horizontally by increasing the number of workers in the compute cluster, with each worker having its own GPU. This enabled parallel processing across the merchant base.

- **PySpark Integration**: The team used PySpark's distributed computing capabilities to parallelize inference across the cluster. They implemented a Pandas UDF (`@pandas_udf`) that wraps the Hugging Face classification pipeline, allowing batch predictions to be distributed across the Spark cluster.

- **Batch Size Optimization**: The team experimentally determined the optimal batch size (settling on 8 for inference) by testing various sizes on sample data to balance GPU utilization against memory constraints.

- **Incremental Predictions**: A practical optimization was implemented where sellers whose inputs (business name, services, activation info) remained unchanged from the previous day retained their existing predictions without re-running inference. This significantly reduced daily compute requirements by focusing only on merchants with updated information.

The inference code used Hugging Face's pipeline abstraction for text classification, making it straightforward to apply the trained model to new data: `classifier = pipeline('text-classification', model=model_path, truncation=True, padding=True, device=device, batch_size=batch_size)`.

### Output and Monitoring

The system produces two output tables serving different operational needs:

- **Historical Table**: Stores daily partitions of predictions, enabling troubleshooting, monitoring for model drift, and performance validation over time.

- **Latest Predictions Table**: Contains the most current predictions for immediate use by downstream stakeholders for business metrics and decision-making.

## Results and Business Impact

The model achieved approximately 30% absolute improvement in accuracy compared to existing methods. Performance varied by category, with some showing particularly strong gains: retail (38% improvement), home and repair (35%), and beauty and personal care (32%). Even categories with smaller improvements like food and drink (13%) still represented meaningful accuracy gains.

The model outputs now power Square's business metrics that require merchant category segmentation, influencing product strategy, go-to-market targeting, email campaigns, and other applications. The team indicates future work will explore using the model to reduce interchange fees associated with payment processing, an area with direct financial impact.

## Critical Assessment

While this case study demonstrates a well-executed production ML system, a few considerations are worth noting:

- The claim of using "LLMs" is somewhat generous—RoBERTa, while powerful, is a 2019-era model that's smaller than what's typically meant by "large language model" today. However, the production patterns and infrastructure decisions remain relevant regardless of model size.

- The 30% accuracy improvement is impressive, but the absolute accuracy figures aren't provided, making it difficult to assess overall system performance. A jump from 40% to 70% would have different implications than 65% to 95%.

- The emphasis on manually reviewed training data (20,000+ samples) highlights a common challenge in production ML: the need for quality labels often requires significant human effort that may not scale easily.

Overall, this case study provides valuable insights into deploying transformer-based classification models at scale, with practical solutions for data quality, memory optimization, distributed inference, and incremental processing that are broadly applicable to production LLM/ML systems.