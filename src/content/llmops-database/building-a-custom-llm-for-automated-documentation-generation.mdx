---
title: "Building a Custom LLM for Automated Documentation Generation"
slug: "building-a-custom-llm-for-automated-documentation-generation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3aa3980f147a5291c3fd"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:36:25.063Z"
  createdOn: "2024-11-21T13:50:27.140Z"
llmopsTags:
  - "cost-optimization"
  - "data-integration"
  - "databricks"
  - "devops"
  - "document-processing"
  - "documentation"
  - "fine-tuning"
  - "latency-optimization"
  - "model-optimization"
  - "monitoring"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "Databricks"
summary: "Databricks developed an AI-generated documentation feature for automatically documenting tables and columns in Unity Catalog. After initially using SaaS LLMs that faced challenges with quality, performance, and cost, they built a custom fine-tuned 7B parameter model in just one month with two engineers and less than $1,000 in compute costs. The bespoke model achieved better quality than cheaper SaaS alternatives, 10x cost reduction, and higher throughput, now powering 80% of table metadata updates on their platform."
link: "https://www.databricks.com/blog/creating-bespoke-llm-ai-generated-documentation"
year: 2023
seo:
  title: "Databricks: Building a Custom LLM for Automated Documentation Generation - ZenML LLMOps Database"
  description: "Databricks developed an AI-generated documentation feature for automatically documenting tables and columns in Unity Catalog. After initially using SaaS LLMs that faced challenges with quality, performance, and cost, they built a custom fine-tuned 7B parameter model in just one month with two engineers and less than $1,000 in compute costs. The bespoke model achieved better quality than cheaper SaaS alternatives, 10x cost reduction, and higher throughput, now powering 80% of table metadata updates on their platform."
  canonical: "https://www.zenml.io/llmops-database/building-a-custom-llm-for-automated-documentation-generation"
  ogTitle: "Databricks: Building a Custom LLM for Automated Documentation Generation - ZenML LLMOps Database"
  ogDescription: "Databricks developed an AI-generated documentation feature for automatically documenting tables and columns in Unity Catalog. After initially using SaaS LLMs that faced challenges with quality, performance, and cost, they built a custom fine-tuned 7B parameter model in just one month with two engineers and less than $1,000 in compute costs. The bespoke model achieved better quality than cheaper SaaS alternatives, 10x cost reduction, and higher throughput, now powering 80% of table metadata updates on their platform."
---

## Summary

Databricks developed an AI-generated documentation feature that uses large language models to automatically create descriptions for tables and columns in Unity Catalog, their unified data governance solution. What began as a hackathon prototype using commercial SaaS LLMs evolved into a production system powered by a custom fine-tuned model. The case study provides a practical example of transitioning from third-party LLM APIs to a bespoke, internally-managed model, demonstrating the tradeoffs and benefits of this approach for enterprise-scale LLM deployment.

The feature has achieved significant adoption, with the company reporting that more than 80% of table metadata updates on Databricks are now AI-assisted. This represents a compelling use case where LLMs address a genuine pain point—the lack of documentation for data assets—which creates challenges for both human data discovery and AI-powered data intelligence capabilities.

## The Problem: Challenges with SaaS LLMs in Production

The initial prototype relied on off-the-shelf SaaS-based LLMs, which presented three interconnected challenges as the team moved toward production deployment:

**Quality Control Issues**: While the team could measure quality through acceptance rates, they had limited ability to improve outcomes beyond basic prompt engineering. More concerning was the observation of quality degradation over time without any changes to their own codebase—suggesting that the SaaS provider's model updates sometimes adversely affected performance on their specific task. This lack of control and predictability is a significant operational risk for production systems.

**Throughput Limitations**: The API quota constraints became problematic at enterprise scale. With tens of thousands of organizations as customers, where individual organizations might have millions of tables, the limited throughput made it impractical to generate documentation at scale within acceptable timeframes.

**Cost Concerns**: The economics of using SaaS LLMs at their required scale were unfavorable, potentially requiring the company to charge customers for a feature they wanted to include as part of the platform.

These challenges are emblematic of issues many organizations face when moving LLM applications from proof-of-concept to production, making this case study broadly applicable.

## The Solution: Fine-Tuning a Bespoke Model

The team took an applied machine learning approach to build a custom solution. This involved establishing a proper ML lifecycle with training data, evaluation mechanisms, model training and selection, production monitoring, and iterative improvement processes.

### Training Data Generation

The training dataset was constructed from two sources without using any customer data—an important consideration for privacy and governance:

- **North American Industry Classification System (NAICS) codes**: A public dataset used by federal statistical agencies for classifying business establishments
- **Databricks internal use case taxonomy curation datasets**: Internal datasets created by solution architects demonstrating best practice architectures

Using these sources, the team synthesized CREATE TABLE statements representing diverse table schemas and generated sample responses (table descriptions and column comments) using another LLM. This synthetic data generation approach yielded approximately 3,600 training examples—a relatively modest dataset that proved sufficient for the task.

### Evaluation Framework

Before production deployment, the team needed a way to compare their fine-tuned model against the SaaS baseline. They implemented a double-blind evaluation framework with the following characteristics:

- Four internal evaluators rated table descriptions
- A test set of 62 unseen tables was used
- Evaluators compared outputs from two models presented in randomized order
- The framework tracked inter-evaluator agreement
- Results were aggregated into comparison reports

The team notes that having an evaluation dataset of tens to hundreds of data points serves as a sufficient initial milestone for this type of task. This pragmatic approach to evaluation—rather than attempting to build massive benchmarks—enabled rapid iteration while still providing actionable quality signals.

### Model Selection

The team evaluated models based on license compatibility with commercial use, text generation quality, and inference speed. Their candidates included MPT-7B, Llama2-7B, and larger variants like MPT-30B and Llama-2-13B.

Ultimately, they selected MPT-7B for several reasons:

- No discernible quality difference between MPT-7B and Llama-2-7B fine-tuned models for this specific task
- The smaller 7B models met the quality bar after fine-tuning, performing significantly better than cheaper SaaS options and roughly equivalent to more expensive versions
- No measurable benefit from larger models was observed that would justify increased serving costs
- Latency for smaller models was substantially better while maintaining comparable quality
- The smaller model could be served on A10 GPUs, which offered better availability for horizontal scaling

The total fine-tuning time on 3,600 examples was approximately 15 minutes, demonstrating the efficiency of modern fine-tuning approaches for task-specific customization.

### Prompt Optimization Through Fine-Tuning

An important finding was that fine-tuned models could operate with significantly smaller prompts. General-purpose SaaS LLMs require detailed prompts with explicit instructions about input format and expected output structure. Fine-tuned models can bake these instructions into the model weights themselves. The team achieved a greater than 50% reduction in input tokens with no impact on performance—a substantial efficiency gain given that inference costs scale with token count.

## Production Architecture

The deployment leveraged several components of the Databricks platform:

**Databricks LLM Fine-tuning**: Provided simple infrastructure for model fine-tuning. Training data was prepared in JSON format, and fine-tuning could be initiated with a single CLI command.

**Unity Catalog for Model Registry**: Models used in production are registered in Unity Catalog, providing governance for both data and models. The end-to-end lineage feature enables traceability from models back to their training datasets.

**Delta Sharing for Model Distribution**: Used to distribute the model across all production regions globally, enabling faster serving closer to users.

**Optimized LLM Serving**: Once models are registered in Unity Catalog, they can be served using Databricks' optimized LLM serving infrastructure, which provides throughput and latency improvements compared to traditional serving approaches. The service offers provisioned throughput with hourly billing, consistent latencies, uptime SLAs, and autoscaling capabilities.

## Results and Cost Analysis

The project achieved its goals across all three dimensions:

**Quality**: The fine-tuned model was significantly better than cheaper SaaS options and roughly equivalent to more expensive versions, as validated through the human evaluation framework.

**Performance**: The smaller model fits on A10 GPUs, enabling horizontal scaling for increased throughput. The abundance and lower cost of A10s compared to larger GPUs provided better availability and faster scale-up/scale-down for handling demand fluctuations.

**Cost**: The entire fine-tuning compute cost for the project (including extensive experimentation) was less than $1,000, with individual fine-tuning runs costing only a few dollars. Production inference costs achieved a 10x reduction compared to SaaS alternatives.

The cost savings are attributed to several factors: smaller, task-specific models require fewer parameters than general-purpose models; shorter prompts reduce token costs; smaller models fit on cheaper, more available GPUs; and aggressive autoscaling reduces idle capacity costs.

## Key Takeaways for LLMOps

This case study illustrates several important principles for production LLM systems:

**Task-specific fine-tuning can outperform general-purpose models**: For narrow, well-defined tasks, smaller fine-tuned models can match or exceed the quality of larger general-purpose models while dramatically reducing costs and improving latency.

**Synthetic data can be sufficient for fine-tuning**: The team generated effective training data without accessing customer data, using public datasets and internal examples combined with LLM-generated responses.

**Simple evaluation frameworks enable iteration**: A modest evaluation dataset with human raters provided actionable quality signals for model comparison without requiring massive benchmark construction.

**Model selection should consider the full operational picture**: The choice of MPT-7B over larger models was driven by operational considerations (GPU availability, scaling characteristics) as much as raw quality metrics.

**The LLM landscape requires continuous iteration**: The team explicitly notes that the best model today won't be the best model tomorrow, emphasizing the importance of efficient evaluation and training pipelines that enable ongoing model updates.

The model is now deployed in production on AWS and Google Cloud regions, powering the majority of data annotations on the Databricks platform. It's worth noting that while this case study presents compelling results, it comes from Databricks itself—a company that sells LLM fine-tuning and serving infrastructure. The claimed benefits should be considered in that context, though the technical approach and lessons learned appear broadly applicable to other organizations facing similar challenges with SaaS LLM limitations.