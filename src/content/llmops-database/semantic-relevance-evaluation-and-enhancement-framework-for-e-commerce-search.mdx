---
title: "Semantic Relevance Evaluation and Enhancement Framework for E-commerce Search"
slug: "semantic-relevance-evaluation-and-enhancement-framework-for-e-commerce-search"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "697245afb87f4587f099fcaf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-01-22T15:47:31.448Z"
  createdOn: "2026-01-22T15:43:43.155Z"
llmopsTags:
  - "classification"
  - "structured-output"
  - "high-stakes-application"
  - "prompt-engineering"
  - "few-shot"
  - "fine-tuning"
  - "embeddings"
  - "semantic-search"
  - "knowledge-distillation"
  - "human-in-the-loop"
  - "model-optimization"
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "vllm"
  - "pytorch"
  - "langchain"
  - "monitoring"
  - "openai"
industryTags: "e-commerce"
company: "Etsy"
summary: "Etsy's Search Relevance team developed a comprehensive Semantic Relevance Evaluation and Enhancement Framework to address the limitations of engagement-based search models that favored popular listings over semantically relevant ones. The solution employs a three-tier cascaded distillation approach: starting with human-curated \"golden\" labels, scaling with an LLM annotator (o3 model) to generate training data, fine-tuning a teacher model (Qwen 3 VL 4B) for efficient large-scale evaluation, and distilling to a lightweight BERT-based student model for real-time production inference. The framework integrates semantic relevance signals into search through filtering, feature enrichment, loss weighting, and relevance boosting. Between August and October 2025, the percentage of fully relevant listings increased from 58% to 62%, demonstrating measurable improvements in aligning search results with buyer intent while addressing the cold-start problem for smaller sellers."
link: "https://www.etsy.com/codeascraft/how-etsy-uses-llms-to-improve-search-relevance"
year: 2025
seo:
  title: "Etsy: Semantic Relevance Evaluation and Enhancement Framework for E-commerce Search - ZenML LLMOps Database"
  description: "Etsy's Search Relevance team developed a comprehensive Semantic Relevance Evaluation and Enhancement Framework to address the limitations of engagement-based search models that favored popular listings over semantically relevant ones. The solution employs a three-tier cascaded distillation approach: starting with human-curated \"golden\" labels, scaling with an LLM annotator (o3 model) to generate training data, fine-tuning a teacher model (Qwen 3 VL 4B) for efficient large-scale evaluation, and distilling to a lightweight BERT-based student model for real-time production inference. The framework integrates semantic relevance signals into search through filtering, feature enrichment, loss weighting, and relevance boosting. Between August and October 2025, the percentage of fully relevant listings increased from 58% to 62%, demonstrating measurable improvements in aligning search results with buyer intent while addressing the cold-start problem for smaller sellers."
  canonical: "https://www.zenml.io/llmops-database/semantic-relevance-evaluation-and-enhancement-framework-for-e-commerce-search"
  ogTitle: "Etsy: Semantic Relevance Evaluation and Enhancement Framework for E-commerce Search - ZenML LLMOps Database"
  ogDescription: "Etsy's Search Relevance team developed a comprehensive Semantic Relevance Evaluation and Enhancement Framework to address the limitations of engagement-based search models that favored popular listings over semantically relevant ones. The solution employs a three-tier cascaded distillation approach: starting with human-curated \"golden\" labels, scaling with an LLM annotator (o3 model) to generate training data, fine-tuning a teacher model (Qwen 3 VL 4B) for efficient large-scale evaluation, and distilling to a lightweight BERT-based student model for real-time production inference. The framework integrates semantic relevance signals into search through filtering, feature enrichment, loss weighting, and relevance boosting. Between August and October 2025, the percentage of fully relevant listings increased from 58% to 62%, demonstrating measurable improvements in aligning search results with buyer intent while addressing the cold-start problem for smaller sellers."
---

## Overview

Etsy's Search Relevance team faced a fundamental challenge common to e-commerce platforms: traditional search models heavily relied on engagement signals (clicks, add-to-carts, purchases) as proxies for relevance, which introduced inherent bias toward popular listings regardless of their actual semantic match to user queries. This case study presents a sophisticated production LLM system that addresses this limitation through a comprehensive Semantic Relevance Evaluation and Enhancement Framework. The implementation demonstrates mature LLMOps practices including human-AI alignment, multi-tier model distillation, cost-effective scaling strategies, and production integration with real-time latency constraints.

## Problem Context and Business Motivation

The core problem Etsy identified was that engagement-based signals, while objective and measurable, perpetuate popularity bias where already-popular listings continue to receive more clicks even when they may not represent the best semantic match for specific queries. This creates a negative feedback loop that disadvantages smaller or newer sellers whose products may be highly relevant but lack visibility. The business case is compelling: 89% of Etsy sellers are businesses of one, making fair search opportunities critical to the marketplace's value proposition. The team sought to complement engagement signals with semantic relevance that captures how well a listing aligns with buyer intent as expressed in their query.

## Relevance Taxonomy and Human-Centered Foundation

The framework begins with a carefully designed relevance taxonomy based on user research, defining three categories: Relevant (listing matches all parts of the query, accounting for meaning and proper nouns), Partially Relevant (listing matches part of the query or is thematically related but not a complete match), and Irrelevant (no meaningful connection where presence would make search feel broken). This taxonomy reflects an important LLMOps principle: before deploying LLMs at scale, establish clear human-defined ground truth.

Etsy maintains detailed, evolving relevance labeling guidelines that are continuously refined through user research and annotation feedback. The team explicitly acknowledges that relevance is contextual and shifts over time, citing the example of "face masks" having completely different intent pre-2020 (costume/fashion) versus post-2020 (protective equipment). This recognition of concept drift and the need for ongoing guideline maintenance represents mature thinking about production ML systems.

## Data Strategy: Human-Anchored, LLM-Scaled

The data strategy represents a pragmatic approach to the LLM-as-a-judge paradigm. Rather than directly using off-the-shelf LLMs for evaluation (which faces domain shift challenges and unfavorable performance-cost tradeoffs), Etsy implements a validation-then-scale approach where humans define what good looks like and LLMs amplify that definition.

Query-listing pairs are sampled using both random stratified sampling for broad coverage and targeted sampling for challenging cases. Pairs are labeled by two Etsy admins with ongoing review processes for tie-breaking and guideline refinement. Quality control includes tracking metrics like row-level disagreement rates to identify when annotators differ on the same pair. This golden dataset serves as the anchor for the entire system.

To scale beyond manual annotation, Etsy employs a sophisticated prompting strategy using the o3 model (referenced as a very capable reasoning model) implemented in LangGraph. The prompt incorporates comprehensive query and listing features including title, images, text description, attributes, variations, and extracted entities. The use of few-shot chain-of-thought (CoT) prompting demonstrates awareness of techniques that improve LLM reasoning quality. Additionally, self-consistency sampling is applied where multiple inference runs are performed and results are aggregated to improve reliability. This LLM annotator is validated against human golden labels before being used to generate large-scale training data, ensuring alignment is verified rather than assumed.

## Three-Tier Cascaded Distillation Architecture

The modeling pipeline demonstrates sophisticated understanding of the accuracy-latency-cost tradeoffs inherent in production LLM systems. The three-tier architecture includes:

The **LLM annotator** (o3 model) serves as the most accurate but cost-intensive foundation, aligned closely with human golden labels. While it provides the highest quality judgments, it's too expensive for recurring large-scale inference or real-time serving.

The **teacher model** employs supervised fine-tuning (SFT) on a smaller LLM (Qwen 3 VL 4B) using training data generated by the LLM annotator. This represents a classic distillation approach where a smaller model learns to approximate a larger teacher. The teacher model preserves human alignment while enabling annotation of millions of query-listing pairs daily, making it suitable for recurring evaluation and monitoring at reasonable cost. Etsy uses vLLM for high-throughput inference, explicitly calling out their ability to process millions of pairs daily at very low cost while maintaining statistical power for A/B test evaluation.

The **student model** uses a BERT-based two-tower architecture optimized for real-time inference with less than 10ms additional latency. This lightweight model is distilled from the teacher, aligning its outputs with teacher predictions so it can judge relevance nearly as accurately while being fast enough for production serving. The two-tower architecture is a common pattern for search and recommendation systems where query and listing are encoded separately, enabling efficient similarity computation.

All three models are evaluated against the same golden dataset using multi-class Macro F1 scores and individual class F1 metrics, ensuring traceable performance and consistent alignment with human judgment throughout the distillation chain. The case study provides specific performance data showing the tradeoffs between the models, though exact numbers aren't detailed in the text.

## Production Integration and Real-Time Applications

The student model's integration into Etsy's real-time search stack demonstrates practical LLMOps implementation across multiple integration points. The model influences search results through filtering (removing listings predicted as irrelevant before downstream ranking), feature enrichment (contributing predicted relevance scores as features for ranking models), loss weighting (adjusting training weights of the ranking model based on predicted relevance), and relevance boosting (promoting highly relevant listings using heuristic rules among final results). This multi-point integration reflects sophisticated understanding that LLM signals can enhance systems in multiple ways rather than simply replacing existing components.

## Evaluation and Monitoring Infrastructure

For offline evaluation, the teacher model measures how well the search system surfaces relevant listings. Each day, Etsy samples search requests and performs offline inference, aggregating predicted relevance labels into summary metrics reviewed regularly by the team. This enables detection of unexpected trends like sudden relevance declines, allowing quick diagnosis and remediation. The use of daily monitoring with automated metrics demonstrates mature MLOps practices.

For A/B testing, relevance metrics are computed separately for control and treatment variants with sufficient sampling to ensure statistical power. These metrics inform rollout decisions, ensuring changes affect semantic relevance in neutral to positive ways. This integration of semantic relevance into experimentation frameworks shows how LLM-generated signals can become first-class citizens in product development processes.

## Business Impact and Results

Between August and October 2025, the percentage of fully relevant listings increased from 58% to 62%, representing a 4 percentage point absolute improvement. The text provides concrete examples such as "fall decor" searches now surfacing seasonal decor items while deprioritizing loosely related clothing that previously appeared. While this represents meaningful progress, the team acknowledges the complexity remains: in online experiments, they often observe engagement metrics decline even as semantic relevance improves, a pattern noted by other e-commerce platforms. This candid acknowledgment of tradeoffs reflects honest assessment rather than purely promotional content.

## Critical Assessment and Tradeoffs

The framework demonstrates mature LLMOps practices but also reveals inherent tensions. The three-tier architecture provides flexibility across different use cases (evaluation, monitoring, real-time serving) but adds operational complexity in maintaining multiple models. The team explicitly plans to explore simplification by finding better performance-efficiency tradeoffs and potentially merging model tiers.

The observation that semantic relevance improvements don't always correlate with engagement metric improvements is particularly significant. This suggests that optimizing purely for semantic relevance may sometimes surface listings that are technically more relevant but less likely to convert, possibly because users have learned to navigate current search patterns or because engagement captures additional signals beyond semantic match (like price, availability, merchant quality). The team's hypothesis that uniform relevance treatments don't account for contextual variation, with plans to explore adaptive strategies by query type, represents thoughtful iteration rather than declaring victory.

The reliance on o3 as the foundation LLM annotator, while enabling strong performance, creates vendor dependency and potential cost concerns at scale. The text doesn't address contingency plans if o3 pricing changes or availability issues arise, though the distillation strategy does provide some insulation by moving most volume to self-hosted models.

## Future Directions and Ongoing Work

Etsy outlines several areas for continued development. They plan to better understand relevance-engagement dynamics through adaptive strategies that tailor adjustments by query type rather than applying uniform treatments. They're exploring finer-grained relevance labels inspired by Amazon's ESCI framework, potentially introducing subcategories like complements and substitutes for improved evaluation precision.

For annotation efficiency, they're investigating using LLMs for cases where self-consistency is high (likely indicating easier judgments that align well with human labels), focusing human effort on complex cases where disagreement occurs. This represents intelligent hybrid approaches that leverage both human and LLM strengths.

They plan to simplify the multi-stage model stack by exploring better performance-efficiency tradeoffs and potentially merging tiers. Finally, they see strong potential to enhance semantic relevance further upstream in the retrieval layer, as current application starts at post-retrieval filtering.

## LLMOps Lessons and Best Practices

This case study exemplifies several LLMOps best practices worth highlighting. The human-first approach where LLMs amplify rather than replace human judgment ensures domain alignment and provides trustworthy ground truth for evaluation. The validation-then-scale pattern where the LLM annotator is validated against golden labels before large-scale deployment prevents compounding errors from misaligned models.

The cascaded distillation strategy demonstrates sophisticated understanding of when to use different models based on accuracy, latency, and cost requirements. The integration of LLM signals at multiple points in the search stack (filtering, features, loss weighting, boosting) shows flexibility in how models can influence production systems. The daily monitoring and A/B test integration of semantic relevance metrics demonstrates that LLM-generated signals can become first-class citizens in product development and operations.

The acknowledgment of tradeoffs, tensions, and areas for improvement reflects mature thinking about production ML systems rather than overselling capabilities. The explicit discussion of concept drift (face masks example) and maintenance of evolving guidelines shows awareness that LLM systems require ongoing curation to remain aligned with changing user contexts.

## Technical Infrastructure and Tooling

The case study mentions several specific tools and frameworks: LangGraph for implementing the o3-based LLM annotator with structured prompt flows, vLLM for high-throughput inference enabling millions of daily predictions at low cost, and BERT-based two-tower models for real-time serving. The use of few-shot chain-of-thought prompting and self-consistency sampling demonstrates familiarity with modern prompting techniques that improve reliability. The supervised fine-tuning of Qwen 3 VL 4B shows capability in fine-tuning open-weight models for specific domains.

## Broader Implications for E-commerce Search

This work represents a significant shift in how e-commerce platforms can think about search optimization. By moving beyond pure engagement optimization to incorporate semantic relevance, platforms can potentially address cold-start problems for new sellers and reduce popularity bias that entrenches established listings. The framework provides a template for other marketplaces facing similar challenges, demonstrating that LLMs can evaluate search quality at scale when properly aligned with human judgment.

However, the tension between semantic relevance and engagement metrics highlights fundamental questions about what search systems should optimize for. If semantically relevant results don't always drive engagement, it suggests either that users have adapted to current search patterns in ways that don't reflect their true intent, or that engagement captures legitimate signals beyond semantic match. The adaptive, query-type-specific approaches Etsy plans to explore may help resolve these tensions by recognizing that different queries have different optimization objectives.