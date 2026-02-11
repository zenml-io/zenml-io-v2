---
title: "LLM-Enhanced Search and Discovery for Grocery E-commerce"
slug: "llm-enhanced-search-and-discovery-for-grocery-e-commerce"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "687e2b02c5a82659989dfc19"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:15:26.808Z"
  createdOn: "2025-07-21T11:56:50.458Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "question-answering"
  - "structured-output"
  - "prompt-engineering"
  - "few-shot"
  - "model-optimization"
  - "knowledge-distillation"
  - "chunking"
  - "system-prompts"
  - "cache"
  - "fastapi"
  - "llama-index"
  - "meta"
industryTags: "e-commerce"
company: "Instacart"
summary: "Instacart's search and machine learning team implemented LLMs to transform their search and discovery capabilities in grocery e-commerce, addressing challenges with tail queries and product discovery. They used LLMs to enhance query understanding models, including query-to-category classification and query rewrites, by combining LLM world knowledge with Instacart-specific domain knowledge and user behavior data. The hybrid approach involved batch pre-computing results for head/torso queries while using real-time inference for tail queries, resulting in significant improvements: 18 percentage point increase in precision and 70 percentage point increase in recall for tail queries, along with substantial reductions in zero-result queries and enhanced user engagement with discovery-oriented content."
link: "https://www.youtube.com/watch?v=PjaVHm_3Ljg"
year: 2025
seo:
  title: "Instacart: LLM-Enhanced Search and Discovery for Grocery E-commerce - ZenML LLMOps Database"
  description: "Instacart's search and machine learning team implemented LLMs to transform their search and discovery capabilities in grocery e-commerce, addressing challenges with tail queries and product discovery. They used LLMs to enhance query understanding models, including query-to-category classification and query rewrites, by combining LLM world knowledge with Instacart-specific domain knowledge and user behavior data. The hybrid approach involved batch pre-computing results for head/torso queries while using real-time inference for tail queries, resulting in significant improvements: 18 percentage point increase in precision and 70 percentage point increase in recall for tail queries, along with substantial reductions in zero-result queries and enhanced user engagement with discovery-oriented content."
  canonical: "https://www.zenml.io/llmops-database/llm-enhanced-search-and-discovery-for-grocery-e-commerce"
  ogTitle: "Instacart: LLM-Enhanced Search and Discovery for Grocery E-commerce - ZenML LLMOps Database"
  ogDescription: "Instacart's search and machine learning team implemented LLMs to transform their search and discovery capabilities in grocery e-commerce, addressing challenges with tail queries and product discovery. They used LLMs to enhance query understanding models, including query-to-category classification and query rewrites, by combining LLM world knowledge with Instacart-specific domain knowledge and user behavior data. The hybrid approach involved batch pre-computing results for head/torso queries while using real-time inference for tail queries, resulting in significant improvements: 18 percentage point increase in precision and 70 percentage point increase in recall for tail queries, along with substantial reductions in zero-result queries and enhanced user engagement with discovery-oriented content."
---

## Case Study Overview

Instacart, the leading online grocery platform in North America, implemented a comprehensive LLM-enhanced search system to address fundamental challenges in grocery e-commerce search and discovery. The initiative was led by their search and machine learning team to solve critical problems with conventional search engines, particularly around tail queries and new product discovery. The company's mission to create a world where everyone has access to food they love while having more time to enjoy it together directly influenced their approach to improving search functionality for their users who typically come with long shopping lists containing both restocking items and new product explorations.

The implementation represents a sophisticated example of LLMOps in production, where traditional machine learning models were augmented with LLM capabilities rather than completely replaced. This hybrid approach demonstrates practical considerations around latency, cost, and accuracy that are central to successful LLMOps implementations in high-traffic e-commerce environments.

## Technical Architecture and Implementation

### Query Understanding Module Enhancement

The core of Instacart's LLM implementation focused on enhancing their query understanding module, which serves as the most upstream component of their search stack. This module contains multiple interconnected models including query normalization, query tagging, query classification, and category classification. The team specifically targeted two critical models for LLM enhancement: the query-to-category classifier and the query rewrite model.

The query-to-category classifier represented a particularly complex multilabel classification problem, mapping user queries to categories within Instacart's taxonomy of approximately 10,000 labels, with 6,000 being commonly used. Traditional approaches included FastText-based neural networks for semantic relationships and NPMI statistical co-occurrence models as fallbacks. While these worked adequately for head and torso queries, they suffered from poor coverage for tail queries due to insufficient engagement data. Even more sophisticated BERT-based models showed limited improvement relative to their increased latency costs.

### LLM Integration Strategy

The initial LLM approach involved feeding queries and taxonomy information directly to the LLM for category prediction. While the raw output appeared sensible during manual review, online A/B testing revealed significant misalignment with actual user behavior. A critical example was the "protein" query, where LLMs suggested protein-rich foods like chicken and tofu, while Instacart users were actually seeking protein supplements, shakes, and bars. This highlighted a fundamental challenge in LLMOps: the gap between general world knowledge and domain-specific user behavior patterns.

To address this misalignment, the team implemented a hybrid approach that combined LLM capabilities with Instacart-specific domain knowledge. They provided the top K converting categories for each query as additional context to the LLM, effectively constraining the problem space and incorporating user behavior patterns into the generation process. This approach transformed the task from open-ended generation to informed selection and ranking, significantly improving both precision and practical utility.

### Production Serving Architecture

The production implementation demonstrates sophisticated LLMOps considerations around latency and cost optimization. Given Instacart's query distribution pattern with a "fat head and torso set of queries" and a long tail, the team implemented a dual-serving strategy. For head and torso queries, they pre-computed LLM outputs in batch mode and cached the results, enabling low-latency serving through simple cache lookups. For the true long tail queries, they maintained fallbacks to existing traditional models while exploring replacement with distilled Llama models for improved performance.

This architecture represents a practical approach to LLMOps that balances the benefits of LLM capabilities with the operational requirements of a high-traffic production system. The batch pre-computation strategy addresses both cost concerns and latency requirements while ensuring coverage across the query spectrum.

### Query Rewrite Model Enhancement

The query rewrite functionality proved particularly valuable for handling catalog heterogeneity across different retailers. Some retailers have extensive catalogs while others are more limited, making query rewrites essential for ensuring users receive relevant results even when exact matches aren't available. The traditional engagement-data-trained models performed reasonably for popular queries but struggled with tail queries due to data sparsity.

The LLM-enhanced rewrite model generated multiple types of rewrites: substitutes, broader categories, and synonymous alternatives. For example, for "avocado oil," the system could suggest "olive oil" as a substitute, "healthy cooking oil" as a broader category, and "avocado extract" as a synonymous alternative. The implementation showed that simply upgrading to better LLM models improved performance significantly, and the online impact included substantial reductions in zero-result queries, directly improving user experience and business metrics.

### Discovery-Oriented Content Generation

Beyond query understanding, Instacart implemented LLMs for generating discovery-oriented content to address user feedback about search being a "dead end" after finding desired products. Users wanted experiences similar to physical grocery stores where discovering related products (like finding pasta sauce when shopping for pasta) happens naturally through spatial arrangement.

The LLM-generated discovery content included two main types: substitute items for queries with limited exact results, and complementary items for queries with abundant exact results. For queries like "swordfish" with few exact matches, the system would suggest seafood alternatives and meaty fish options. For popular queries like "sushi," it would display Asian cooking ingredients and Japanese drinks at the bottom of search results pages.

### Domain Knowledge Integration Challenges

A critical learning from the implementation was the importance of aligning LLM generation with business-specific user behavior rather than relying solely on general world knowledge. The team discovered that successful LLM deployment required extensive domain knowledge integration. They augmented prompts with various types of Instacart-specific metadata including top converting categories, query understanding annotations (brands, dietary attributes), and subsequent user query patterns.

This domain knowledge integration proved essential for achieving meaningful business impact. The difference between generic LLM responses and domain-informed responses was substantial enough to affect user engagement and revenue metrics significantly.

## Evaluation and Quality Assurance

The case study reveals important insights about LLM evaluation in production environments. The team found that evaluation was "far more important and far more difficult than anticipated." They implemented LLM-as-a-judge approaches for content evaluation, focusing on two key aspects: ensuring generated content wasn't hallucinated and verifying adherence to product requirements.

The evaluation framework needed to address both technical correctness and business alignment, representing a common challenge in LLMOps where traditional ML evaluation metrics may not capture the full value or risk profile of LLM outputs in business contexts.

## Business Impact and Results

The implementation demonstrated significant quantifiable improvements across multiple metrics. For tail queries, the enhanced query-to-category classifier achieved an 18 percentage point improvement in precision and a 70 percentage point improvement in recall. The query rewrite model substantially reduced zero-result queries, directly impacting user experience and conversion rates.

The discovery-oriented content generation showed improvements in both engagement and revenue per search, indicating successful achievement of the dual goals of user satisfaction and business value. These results validate the hybrid approach of combining LLM capabilities with domain-specific knowledge and traditional ML techniques.

## System Integration and Model Consolidation

An interesting strategic insight from the implementation involves the potential for model consolidation. The team noted that managing multiple separate models for different aspects of query understanding creates system complexity. They identified an opportunity to consolidate these into a single LLM or SLM (Small Language Model) to improve consistency and reduce operational overhead.

This consolidation approach would also enable more sophisticated context passing, such as understanding complete user missions (like detecting recipe ingredient shopping) rather than processing queries in isolation. This represents an evolution toward more holistic, context-aware search understanding.

## Lessons Learned and Future Directions

The case study provides several important lessons for LLMOps practitioners. First, the critical importance of domain knowledge integration - general LLM capabilities alone are insufficient for specialized business contexts. Second, the value of hybrid approaches that combine LLM strengths with existing system capabilities rather than complete replacements. Third, the complexity of evaluation in production LLM systems extends far beyond traditional ML metrics to include business alignment and user behavior considerations.

The team's experience with their "Ask Instacart" natural language query system provided additional validation of these principles, emphasizing the need for robust automated evaluation pipelines and careful context passing to downstream systems.

The implementation represents a mature approach to LLMOps that balances innovation with practical operational requirements, demonstrating how large-scale e-commerce platforms can successfully integrate LLM capabilities while maintaining performance, cost, and reliability requirements.