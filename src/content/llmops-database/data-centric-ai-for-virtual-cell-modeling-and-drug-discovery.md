---
title: "Data-Centric AI for Virtual Cell Modeling and Drug Discovery"
slug: "data-centric-ai-for-virtual-cell-modeling-and-drug-discovery"
draft: false
llmopsTags:
  - "healthcare"
  - "data-analysis"
  - "embeddings"
  - "model-optimization"
  - "pytorch"
  - "open-source"
industryTags: "healthcare"
company: "Xaira"
summary: "Xaira Therapeutics developed X-Cell, a foundation model for predicting cellular responses to gene expression changes, to enable AI-driven drug discovery. The team encountered a fundamental scaling limitation where test loss flatlined at 1.5B parameters despite continued training loss improvements, indicating an information bottleneck in existing datasets like CELLxGENE. To overcome this, they invested tens of millions in generating X-Atlas, a causally-structured dataset using CRISPR-based experiments that systematically perturb individual genes across millions of parallel tests. This 30x increase in information-rich data enabled continued scaling past 3.1B parameters, allowed the model to beat linear baselines that had previously outperformed other virtual cell models, and demonstrated generalization to real lab experiments in human cells."
link: "https://www.latent.space/p/xaira"
year: 2026
seo:
  title: "Xaira: Data-Centric AI for Virtual Cell Modeling and Drug Discovery - ZenML LLMOps Database"
  description: "Xaira Therapeutics developed X-Cell, a foundation model for predicting cellular responses to gene expression changes, to enable AI-driven drug discovery. The team encountered a fundamental scaling limitation where test loss flatlined at 1.5B parameters despite continued training loss improvements, indicating an information bottleneck in existing datasets like CELLxGENE. To overcome this, they invested tens of millions in generating X-Atlas, a causally-structured dataset using CRISPR-based experiments that systematically perturb individual genes across millions of parallel tests. This 30x increase in information-rich data enabled continued scaling past 3.1B parameters, allowed the model to beat linear baselines that had previously outperformed other virtual cell models, and demonstrated generalization to real lab experiments in human cells."
  canonical: "https://www.zenml.io/llmops-database/data-centric-ai-for-virtual-cell-modeling-and-drug-discovery"
  ogTitle: "Xaira: Data-Centric AI for Virtual Cell Modeling and Drug Discovery - ZenML LLMOps Database"
  ogDescription: "Xaira Therapeutics developed X-Cell, a foundation model for predicting cellular responses to gene expression changes, to enable AI-driven drug discovery. The team encountered a fundamental scaling limitation where test loss flatlined at 1.5B parameters despite continued training loss improvements, indicating an information bottleneck in existing datasets like CELLxGENE. To overcome this, they invested tens of millions in generating X-Atlas, a causally-structured dataset using CRISPR-based experiments that systematically perturb individual genes across millions of parallel tests. This 30x increase in information-rich data enabled continued scaling past 3.1B parameters, allowed the model to beat linear baselines that had previously outperformed other virtual cell models, and demonstrated generalization to real lab experiments in human cells."
notion:
  pageId: "3a5f8dff-2538-804a-b597-e3c3415186ed"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-22T07:15:00.000Z"
  lastEditedTime: "2026-07-22T07:15:00.000Z"
  publishedAt: "2026-07-22T07:40:20Z"
---

## Overview

Xaira Therapeutics represents a compelling case study in the production deployment of large-scale AI models for biological discovery, specifically in the domain of virtual cell modeling and drug discovery. The company developed X-Cell, a foundation model trained on their proprietary X-Atlas dataset, to predict how cells will respond to genetic perturbations. This case study is particularly valuable from an LLMOps perspective because it illuminates critical challenges around data quality versus quantity, scaling limitations, and the substantial infrastructure investments required to operationalize AI models in specialized scientific domains.

The core insight driving Xaira's approach, articulated by Chief AI Scientist Bo Wang and Chief Discovery Officer Ci Chu, is that information-rich data—not merely large volumes of data—is the bottleneck for model performance in biological applications. This represents a departure from the "scale at all costs" paradigm common in general-purpose LLMs and offers important lessons for deploying models in production environments where domain-specific knowledge and causal reasoning are paramount.

## The Scaling Wall and Information Bottleneck

From a production ML perspective, Xaira encountered a critical scaling limitation that fundamentally shaped their LLMOps strategy. When training models on CELLxGENE, a public database containing 168 million cells with RNA expression profiles across 20,000-30,000 genes (approximately 4 trillion data points), they observed a phenomenon that should concern any team deploying large models: test loss flatlined after 1.5 billion parameters while training loss continued to decrease. This divergence is a classic signal that the model has extracted all available information from the training data and is now simply memorizing rather than learning generalizable patterns.

The 3.1 billion parameter model fell off the expected scaling trend entirely, indicating that neither additional parameters nor additional compute would improve performance past this wall. This is a fundamentally different problem than what most LLMOps practitioners encounter with general-purpose language models, where data is typically abundant (if not always high-quality). For Xaira, the limitation wasn't data volume in the traditional sense—CELLxGENE is massive—but rather the information content and causal structure of that data.

This discovery led to a strategic decision with massive operational implications: Xaira would need to generate their own dataset through laboratory experiments rather than rely solely on public data sources. The estimated investment for data collection experiments and infrastructure was in the tens of millions of dollars, with additional millions for compute, headcount, and research. Notably, the budget structure resembles a reinforcement learning rollout budget rather than a traditional data-rich pre-training approach, reflecting the active, experimental nature of the data generation process.

## Causal Data Generation: X-Atlas

The fundamental insight behind X-Atlas is that observational data (like CELLxGENE) can describe correlations between cell types and cell states but cannot reliably predict causal relationships. Gene expression changes are highly correlated, making it difficult or impossible to determine causality from observational data alone. If gene A, B, and C all change together in certain cell states, does A cause B and C? Does B cause A and C? Is there a cascade where B causes A which causes C?

To address this, Xaira's team conducted systematic CRISPR-based perturbation experiments that "turn the dial down" on individual genes one at a time. By observing what happens to all other genes when a single gene is perturbed, they can map upstream and downstream causal relationships. These experiments run millions of tests in parallel, generating the raw data for X-Atlas. This is fundamentally causal data: interventional rather than merely observational.

The result was approximately 30x more information-rich data compared to their previous dataset. This wasn't simply 30x more cells or 30x more measurements—it was 30x more information in the technical sense, capturing causal structure that enables predictive modeling rather than just descriptive modeling. From an LLMOps perspective, this represents a massive investment in the "Ops" side of the equation: laboratory automation, experimental design, quality control, data pipelines, and infrastructure to manage the resulting data.

## Model Architecture and Training Decisions

Xaira made several important architectural decisions in developing X-Cell. Notably, the team abandoned autoregressive modeling in favor of diffusion models. While the source text doesn't provide detailed reasoning, this choice is significant from an LLMOps standpoint. Diffusion models have different training dynamics, inference characteristics, and deployment requirements compared to autoregressive transformers. They typically require multiple forward passes during inference (the denoising process), which has implications for latency, throughput, and compute costs in production.

The model builds on scGPT, an influential foundation model for single-cell genomics that Bo Wang developed in his academic work. Starting from an existing foundation model rather than training from scratch is a pragmatic LLMOps decision that reduces time-to-deployment and leverages established architectural patterns. However, it also creates dependencies and potential technical debt if scGPT's design choices don't align perfectly with Xaira's objectives.

The team also incorporated what they describe as a "kitchen-sink of priors"—domain knowledge and inductive biases built into the model. This raises important questions about the relative contributions of data quality, model architecture, and domain priors to overall performance. From a production perspective, heavy reliance on hand-crafted priors can make models brittle and difficult to maintain as scientific understanding evolves, but it can also dramatically improve performance and sample efficiency in data-limited domains.

## Evaluation and Validation

A critical aspect of any production ML system is evaluation, and Xaira's approach offers important lessons. The key benchmark was beating the linear baseline that had previously outperformed other virtual cell models. This is a sobering reminder that in specialized domains, simple baselines can be surprisingly strong, and that deploying complex deep learning models is only justified if they meaningfully outperform simpler alternatives.

More importantly, X-Cell demonstrated generalization to real lab experiments in real human cells. This is the gold standard for validation in scientific ML applications: the model's predictions must hold up when tested in independent wet lab experiments, not just on held-out test sets from the same distribution. This represents a form of deployment validation that goes beyond typical ML metrics—the model is being validated against physical reality, not just statistical holdout sets.

This validation approach has significant implications for LLMOps. It means that model updates and improvements must be validated through expensive, time-consuming laboratory experiments before being deployed for actual drug discovery work. This creates a much longer feedback loop than typical software deployments and requires close collaboration between ML engineers, biologists, and laboratory personnel.

## Infrastructure and Resource Requirements

The infrastructure requirements for X-Cell are substantial and multi-faceted. On the data generation side, Xaira needed to build or access high-throughput CRISPR screening capabilities that can run millions of perturbation experiments in parallel. This requires sophisticated laboratory automation, robotics, and quality control systems. The raw experimental data must then be processed through bioinformatics pipelines to extract gene expression profiles, align them with perturbation conditions, and structure them for model training.

On the compute side, training foundation models at the 3+ billion parameter scale requires significant GPU resources, though likely less than state-of-the-art language models given the smaller vocabulary space and domain specificity. The diffusion model architecture may have different compute profiles than autoregressive models, potentially requiring more memory for parallel denoising steps during inference.

The estimated budget of "tens of millions" for data generation infrastructure and "a few million" for compute, headcount, and research suggests a data-centric investment strategy. This is radically different from most LLMOps deployments, which typically spend far more on compute and engineering than on data acquisition. It reflects the fundamental insight that in this domain, the bottleneck is information, not compute.

## Production Deployment and Use Cases

While the source text doesn't provide extensive details on how X-Cell is deployed in production, we can infer several operational characteristics. The model is being used for drug discovery, which likely means it's deployed in an interactive or batch prediction mode where researchers can query: "What will happen to this cell type if we modulate this gene?" or "What's the least invasive way to achieve this expression profile change?"

The model must integrate with existing drug discovery workflows, which means it needs APIs or interfaces that allow chemists and biologists to interact with it without deep ML expertise. There's likely a need for uncertainty quantification and interpretability tools, since researchers need to understand not just what the model predicts but how confident it is and why it made that prediction.

The validation requirement—that predictions must generalize to real lab experiments—creates an interesting production deployment pattern. Unlike typical ML systems where the model can be deployed and monitored purely through software metrics, X-Cell's true performance can only be assessed through costly wet lab experiments. This means that the feedback loop for model improvement is much slower and more expensive than in typical LLMOps scenarios.

## Organizational and Cultural Considerations

The promotions of Ci Chu to Chief Discovery Officer and Bo Wang to Chief AI Scientist underscore how central Xaira considers this data-centric AI strategy to their business model. This represents significant organizational alignment between AI development and core business objectives—a level of integration that's often missing in companies that treat AI as a separate innovation team rather than a core capability.

Bo Wang's dual role in academia and industry offers interesting insights into LLMOps talent strategy. He shared advantages of academic versus industry leadership, suggesting that Xaira benefits from maintaining strong ties to academic research. This creates pathways for recruiting top talent, staying current with rapidly evolving AI techniques, and publishing research that establishes thought leadership. However, it also creates potential challenges around intellectual property, focus, and the different pace and priorities of academic versus commercial work.

The team's ability to "keep up with the breakneck pace of AI innovation" while executing on a multi-year, multi-million dollar data generation project requires careful resource allocation and strategic prioritization. They must balance the need to incorporate new techniques (like their shift from autoregressive to diffusion models) with the need for stability and reproducibility in a production drug discovery environment.

## Critical Assessment and Balanced Perspective

While the case study presents impressive technical achievements, several aspects warrant careful consideration from an LLMOps perspective. First, the claim of achieving 30x more "information" is difficult to assess without more specific metrics. Information content is notoriously difficult to quantify, and it's unclear whether this represents a rigorous information-theoretic calculation or a more qualitative assessment. The actual improvement in model performance metrics (beyond "beating the linear baseline") isn't fully detailed.

Second, the massive investment in data generation—tens of millions of dollars—represents a significant risk and a barrier to entry that few organizations can match. This raises questions about the generalizability and reproducibility of this approach. If achieving state-of-the-art performance requires generating proprietary datasets at this scale, it fundamentally changes the economics and accessibility of AI-driven drug discovery.

Third, the "kitchen-sink of priors" approach, while pragmatic, makes it difficult to disentangle the contributions of data quality, architectural choices, and domain knowledge to overall performance. From an MLOps perspective, this creates challenges for iterative improvement: if you modify the model architecture or training approach, how do you know whether performance changes are due to your intervention or subtle interactions with the hand-crafted priors?

Fourth, the validation approach—demonstrating generalization to real lab experiments—is gold standard but also expensive and slow. This creates challenges for rapid iteration and A/B testing that are standard in other LLMOps domains. The deployment feedback loop is measured in weeks or months (the time to design, run, and analyze validation experiments) rather than hours or days.

Finally, the comparison to RL rollout budgets is telling. In reinforcement learning, data generation typically involves running simulations or interactions with an environment, which can be expensive but is ultimately a compute problem. For Xaira, data generation involves physical laboratory experiments, which have fundamental throughput limitations and costs that can't be overcome purely with better software or more GPUs. This creates a fundamentally different scaling dynamic than most LLMOps practitioners encounter.

## Broader Implications for LLMOps

The Xaira case study offers several important lessons for LLMOps practitioners, particularly those working in specialized domains:

**Information Quality Versus Quantity**: The distinction between data volume and information content is critical. When test loss flatlines while training loss continues to drop, adding more compute or parameters won't help—you need better data. This suggests that LLMOps teams should invest in understanding the information-theoretic properties of their datasets, not just their size.

**Causal Structure Matters**: For predictive tasks (as opposed to purely descriptive ones), observational data may not be sufficient. Building systems that can generate or access causal, interventional data can be a competitive advantage, though it comes with significant operational complexity.

**Domain-Specific Bottlenecks**: The bottlenecks in deploying models for drug discovery (data generation, wet lab validation) are radically different from those in deploying models for web search or recommendation (latency, throughput, user engagement). LLMOps strategies must be tailored to domain-specific constraints.

**Validation Beyond Metrics**: Statistical performance on held-out test sets is necessary but not sufficient. In high-stakes domains, models must be validated against ground truth in the real world, which requires building processes and partnerships that extend beyond traditional ML engineering.

**Long-Term Investment Horizon**: The multi-year timeline and tens-of-millions budget for data infrastructure represents a fundamentally different investment profile than typical ML projects. This requires executive buy-in and organizational structures that support long-term R&D rather than expecting rapid ROI.

In conclusion, Xaira Therapeutics' development of X-Cell represents an ambitious and technically sophisticated approach to deploying AI in drug discovery. The focus on causal, information-rich data rather than simply scaling compute or parameters offers important lessons for LLMOps practitioners. However, the massive resource requirements, slow validation feedback loops, and reliance on proprietary data also highlight significant challenges in operationalizing AI for specialized scientific domains. The success of this approach will ultimately be measured not just in model performance metrics but in actual drugs discovered and brought to market—a validation timeline that may take years to unfold.
