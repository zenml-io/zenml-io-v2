---
title: "LLM-Powered Relevance Assessment for Search Results"
slug: "llm-powered-relevance-assessment-for-search-results"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6942b7cb601e08343ba68271"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:36:42.579Z"
  createdOn: "2025-12-17T14:01:47.489Z"
llmopsTags:
  - "classification"
  - "question-answering"
  - "multi-modality"
  - "fine-tuning"
  - "embeddings"
  - "reranking"
  - "model-optimization"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "pytorch"
  - "tensorflow"
  - "spacy"
  - "meta"
  - "hugging-face"
  - "microsoft-azure"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest Search faced significant limitations in measuring search relevance due to the high cost and low availability of human annotations, which resulted in large minimum detectable effects (MDEs) that could only identify significant topline metric movements. To address this, they fine-tuned open-source multilingual LLMs on human-annotated data to predict relevance scores on a 5-level scale, then deployed these models to evaluate ranking results across A/B experiments. This approach reduced labeling costs dramatically, enabled stratified query sampling designs, and achieved an order of magnitude reduction in MDEs (from 1.3-1.5% down to ≤0.25%), while maintaining strong alignment with human labels (73.7% exact match, 91.7% within 1 point deviation) and enabling rapid evaluation of 150,000 rows within 30 minutes on a single GPU."
link: "https://medium.com/pinterest-engineering/llm-powered-relevance-assessment-for-pinterest-search-b846489e358d"
year: 2025
seo:
  title: "Pinterest: LLM-Powered Relevance Assessment for Search Results - ZenML LLMOps Database"
  description: "Pinterest Search faced significant limitations in measuring search relevance due to the high cost and low availability of human annotations, which resulted in large minimum detectable effects (MDEs) that could only identify significant topline metric movements. To address this, they fine-tuned open-source multilingual LLMs on human-annotated data to predict relevance scores on a 5-level scale, then deployed these models to evaluate ranking results across A/B experiments. This approach reduced labeling costs dramatically, enabled stratified query sampling designs, and achieved an order of magnitude reduction in MDEs (from 1.3-1.5% down to ≤0.25%), while maintaining strong alignment with human labels (73.7% exact match, 91.7% within 1 point deviation) and enabling rapid evaluation of 150,000 rows within 30 minutes on a single GPU."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-relevance-assessment-for-search-results"
  ogTitle: "Pinterest: LLM-Powered Relevance Assessment for Search Results - ZenML LLMOps Database"
  ogDescription: "Pinterest Search faced significant limitations in measuring search relevance due to the high cost and low availability of human annotations, which resulted in large minimum detectable effects (MDEs) that could only identify significant topline metric movements. To address this, they fine-tuned open-source multilingual LLMs on human-annotated data to predict relevance scores on a 5-level scale, then deployed these models to evaluate ranking results across A/B experiments. This approach reduced labeling costs dramatically, enabled stratified query sampling designs, and achieved an order of magnitude reduction in MDEs (from 1.3-1.5% down to ≤0.25%), while maintaining strong alignment with human labels (73.7% exact match, 91.7% within 1 point deviation) and enabling rapid evaluation of 150,000 rows within 30 minutes on a single GPU."
---

## Overview

Pinterest Search developed and deployed a production LLM-based system for assessing search relevance at scale, addressing critical bottlenecks in their measurement infrastructure. The case study demonstrates a mature LLMOps implementation that successfully replaced expensive human annotation with fine-tuned language models while maintaining measurement quality and significantly improving experimental sensitivity.

The business problem centered on search relevance measurement - ensuring that displayed content aligns with users' information needs rather than over-relying on past engagement patterns. Prior to this initiative, Pinterest tracked whole-page relevance in online A/B experiments using human annotations, but this approach suffered from severe limitations: low availability of labels, high marginal costs, and sampling designs constrained by these economic factors. The resulting minimum detectable effects (MDEs) ranged from 1.3% to 1.5%, which meant the team could only detect large topline metric movements and lacked the sensitivity to measure heterogeneous treatment effects or small but meaningful improvements.

## Technical Architecture and Model Selection

Pinterest adopted a cross-encoder architecture for their relevance prediction system, treating the problem as multiclass classification across five relevance levels: Highly Relevant (L5), Relevant (L4), Marginally Relevant (L3), Irrelevant (L2), and Highly Irrelevant (L1). The cross-encoder approach processes query-Pin pairs jointly, which is computationally more expensive than bi-encoder approaches but provides superior accuracy for the ranking evaluation task.

The team experimented with multiple open-source language models to identify the optimal balance between prediction quality and operational efficiency. Their evaluation included multilingual BERT-base, T5-base, mDeBERTa-V3-base, XLM-RoBERTa-large, and Llama-3-8B. The choice of multilingual models was strategic, driven by Pinterest's need to support search queries and Pins across multiple languages while leveraging cross-lingual transfer capabilities to maximize performance on non-English content.

After thorough evaluation, Pinterest selected XLM-RoBERTa-large as their production model. While Llama-3-8B offered slightly better accuracy, its inference time and cost increased by 6x compared to XLM-RoBERTa-large. The selected model proved to be lightweight yet high-quality, capable of processing 150,000 rows within 30 minutes on a single A10G GPU. This represents an excellent example of LLMOps pragmatism - choosing the model that meets quality requirements while optimizing for operational constraints rather than simply selecting the highest-performing model regardless of cost.

## Feature Engineering and Representation

A critical aspect of the system's success lies in comprehensive Pin representation for relevance assessment. Pinterest leveraged multiple textual features to create robust representations: Pin titles and descriptions, BLIP-generated image captions, linked page titles and descriptions, user-curated board titles where Pins have been saved, and highly-engaged query tokens associated with each Pin. This multi-faceted approach ensures the model has rich context for making relevance judgments, going beyond simple text matching to incorporate user behavior signals and visual content understanding through BLIP captions.

The training approach formalized relevance prediction as multiclass classification, minimizing pointwise cross-entropy loss during fine-tuning. The models were trained on human-annotated data, creating a foundation of ground truth that the LLMs could learn to replicate at scale. The final system generates 5-dimensional relevance scores and uses argmax selection to determine the predicted relevance label.

## Sampling Design and Statistical Methodology

One of the most significant LLMOps innovations in this case study involves the transformation of sampling methodology enabled by reduced labeling costs. Pinterest implemented a stratified query sampling design that fundamentally improved their measurement capabilities. The stratification leverages an in-house query-to-interest model based on DistilBERT combined with popularity segments measuring how many users issue each specific query.

Stratification serves two critical purposes: ensuring the sample population represents the whole population and achieving variance reduction when strata are relatively homogeneous. Prior to LLM labeling, stratified sampling with fine-grained strata was economically infeasible due to the large number of queries required. The shift to LLM-based labeling removed this constraint, enabling optimal allocation of sample units to strata.

The impact on experimental sensitivity proved dramatic. Pinterest quantified improvement using minimum detectable effect (MDE) analysis, which represents the smallest change in a metric that an experiment can reliably detect given sample size, statistical power (β=0.8), and significance level (α=0.05). The MDE reduction broke down into three components: increased sample size contributing 0.18x improvement, stratification providing 0.13x improvement, and using a stratified sampling estimator yielding 0.96x improvement. The combined effect reduced MDEs to ≤0.25%, representing approximately an order of magnitude improvement. Notably, variance reduction through stratification provided the vast majority of improvement, consistent with findings that most variance in relevance occurs across queries rather than within queries.

## Measurement Pipeline and Production Deployment

The production measurement pipeline operates on paired samples from control and treatment experiment groups in A/B tests. For each query, the system retains the top 25 search results and generates LLM-based relevance labels. Query-level metrics are computed using sDCG@25 (a variant of normalized discounted cumulative gain that assumes an infinite supply of highly relevant documents), then aggregated to derive topline experiment metrics.

The system also calculates heterogeneous effects by query popularity and query interest categories (beauty, women's fashion, art, etc.), using a Benjamini-Hochberg procedure to control false discovery rates when examining multiple segments. This capability to measure heterogeneous treatment effects represents a significant advancement over the previous human annotation approach, where sample size constraints prevented reliable segment-level analysis.

## Validation and Quality Assurance

Pinterest conducted rigorous validation to establish trust in LLM-generated labels before deploying the system for production experimentation. At the Pin level, LLM-generated labels achieved 73.7% exact match with human labels and 91.7% agreement within one relevance level. For query-level sDCG@25 metrics, the system demonstrated strong rank-based correlations with human annotations: Kendall's τ > 0.5 and Spearman's ρ > 0.65 across all query popularity segments (head, torso, tail, and single-occurrence queries).

The validation examined error distributions in detail, measuring the difference between sDCG@25 derived from LLM labels versus human labels. Overall error remained below 0.01, with 10th and 90th percentiles falling within [-0.1, 0.1]. The error distribution centered tightly around zero, indicating negligible magnitude and that average bias approaches zero as query set size grows. Critically, errors in paired differences (the key metric for A/B testing) showed even tighter concentration around zero with lighter tails, providing confidence that the system delivers reliable estimates for experimental assessment.

## Multilingual Performance

The multilingual capabilities represent both a strength and an area requiring balanced assessment. Pinterest validated performance on French and German markets, where the majority of training data was English but multilingual model architecture enabled cross-lingual transfer. Results showed Kendall's τ approximately 0.47 and Spearman's ρ approximately 0.61 for non-English queries - lower than English performance but still considered strong correlations in the literature.

Query-level metric error distributions for France and Germany markets remained tightly concentrated around zero, similar to US market results, with even smaller bias for paired differences. While the team acknowledges a performance gap with non-English queries and identifies improving multilingual capabilities as future work, the validation provided sufficient confidence to deploy the system for non-English markets. This decision reflects practical LLMOps judgment: the system performs well enough to provide value even while opportunities for improvement exist.

## Business Impact and Operational Benefits

The deployment achieved multiple operational improvements beyond just cost reduction. Labeling costs decreased significantly compared to human annotation, though specific figures aren't provided. Turnaround time for relevance evaluation improved dramatically, with the ability to process 150,000 labels in 30 minutes versus the weeks or months previously required for equivalent human annotation coverage. The order of magnitude reduction in MDEs fundamentally improved team velocity and the ability to ship new features, as experiments can now detect much smaller improvements that would have been invisible under the previous measurement regime.

The system enables measurement of heterogeneous treatment effects and segment-level analysis that was economically infeasible before, providing richer insights into how ranking changes affect different user populations. The stratified sampling design and larger sample sizes improve representativeness and statistical power simultaneously.

## Critical Assessment and Trade-offs

This case study demonstrates mature LLMOps thinking with clear-eyed acknowledgment of limitations. Pinterest doesn't oversell their system as perfect - they explicitly document the 73.7% exact match rate rather than cherry-picking only the best metrics, they acknowledge lower performance on non-English queries, and they identify concrete future work directions. The selection of XLM-RoBERTa-large over Llama-3-8B despite slightly lower accuracy shows appropriate optimization for operational constraints.

The validation methodology is comprehensive and appropriate for the use case. Rather than just showing model accuracy, Pinterest validates the specific metrics used in production (query-level sDCG@25 and paired differences) and examines error distributions in detail. The focus on paired difference errors is particularly important since A/B testing depends on relative comparisons rather than absolute accuracy.

However, there are considerations worth noting. First, the system produces labels that approximate human judgment rather than necessarily representing ground truth about relevance - the 73.7% exact match means over a quarter of labels differ from human annotators. For applications where individual label accuracy matters more than aggregate statistics, this might be insufficient. Second, the multilingual performance gap suggests the system works best for English content, with degraded but acceptable performance for other languages. Organizations with primarily non-English content might need additional investment in multilingual training data or model selection.

Third, while the case study demonstrates strong correlation on aggregate metrics and paired differences, it doesn't address potential systematic biases - for example, whether the LLM consistently over or under-estimates relevance for specific types of content or queries. The error distributions centering around zero provide some assurance, but more detailed bias analysis across content types would strengthen confidence.

## Future Directions

Pinterest identifies exploring Visual Language Models (VLMs) to better leverage raw images for relevance prediction as a key future direction, which could address limitations of relying solely on BLIP-generated captions. They also plan to improve multilingual capabilities to close the performance gap observed with non-English queries. These future work items demonstrate ongoing iteration rather than treating the current system as a finished product.

## Production LLMOps Lessons

This case study exemplifies several LLMOps best practices. The team started with a clear business problem (measurement bottleneck) rather than implementing LLMs for their own sake. They conducted thorough model evaluation across multiple candidates with explicit consideration of inference cost and latency, not just accuracy. They implemented comprehensive validation against human labels before production deployment, examining multiple correlation metrics and error distributions rather than relying on a single accuracy number.

The system design shows appropriate architectural choices for the use case - cross-encoders for accuracy in an offline evaluation context where latency requirements are less stringent than real-time serving. The inference infrastructure (single A10G GPU processing 150,000 rows in 30 minutes) demonstrates right-sizing compute resources for the workload. The integration with existing experimentation infrastructure (paired sampling, sDCG@25 metric, Benjamini-Hochberg procedure) shows how LLMs can enhance rather than replace existing measurement methodologies.

Perhaps most importantly, the case study demonstrates how reduced costs from LLM labeling enabled not just cost savings but a fundamental redesign of the sampling approach and metric quality improvements that weren't possible under the previous economic constraints. This represents the full value realization from LLMOps - using the technology not just as a drop-in replacement but as an enabler of better system design.