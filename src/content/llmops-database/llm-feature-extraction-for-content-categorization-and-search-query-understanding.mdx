---
title: "LLM Feature Extraction for Content Categorization and Search Query Understanding"
slug: "llm-feature-extraction-for-content-categorization-and-search-query-understanding"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ab8a8900b0868f5e164"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:41:08.779Z"
  createdOn: "2024-11-21T13:50:48.432Z"
llmopsTags:
  - "api-gateway"
  - "classification"
  - "content-moderation"
  - "cost-optimization"
  - "data-integration"
  - "embeddings"
  - "error-handling"
  - "fallback-strategies"
  - "few-shot"
  - "latency-optimization"
  - "monitoring"
  - "open-source"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "structured-output"
industryTags: "tech"
company: "Canva"
summary: "Canva implemented LLMs as a feature extraction method for two key use cases: search query categorization and content page categorization. By replacing traditional ML classifiers with LLM-based approaches, they achieved higher accuracy, reduced development time from weeks to days, and lowered operational costs from $100/month to under $5/month for query categorization. For content categorization, LLM embeddings outperformed traditional methods in terms of balance, completion, and coherence metrics while simplifying the feature extraction process."
link: "https://www.youtube.com/watch?v=jGWjP9gKx2o"
year: 2023
seo:
  title: "Canva: LLM Feature Extraction for Content Categorization and Search Query Understanding - ZenML LLMOps Database"
  description: "Canva implemented LLMs as a feature extraction method for two key use cases: search query categorization and content page categorization. By replacing traditional ML classifiers with LLM-based approaches, they achieved higher accuracy, reduced development time from weeks to days, and lowered operational costs from $100/month to under $5/month for query categorization. For content categorization, LLM embeddings outperformed traditional methods in terms of balance, completion, and coherence metrics while simplifying the feature extraction process."
  canonical: "https://www.zenml.io/llmops-database/llm-feature-extraction-for-content-categorization-and-search-query-understanding"
  ogTitle: "Canva: LLM Feature Extraction for Content Categorization and Search Query Understanding - ZenML LLMOps Database"
  ogDescription: "Canva implemented LLMs as a feature extraction method for two key use cases: search query categorization and content page categorization. By replacing traditional ML classifiers with LLM-based approaches, they achieved higher accuracy, reduced development time from weeks to days, and lowered operational costs from $100/month to under $5/month for query categorization. For content categorization, LLM embeddings outperformed traditional methods in terms of balance, completion, and coherence metrics while simplifying the feature extraction process."
---

## Overview

This case study comes from a conference presentation by Sheen, an engineering machine learning professional at Canva who works in the content and discovery area. Canva is an online design platform with the mission of enabling everyone to design everything. The presentation focuses on a less commonly discussed use of LLMs: using them as a middle layer for feature extraction rather than building applications directly on top of them. This approach was evaluated across two production use cases within Canva's content categorization systems.

The core thesis of the presentation is that LLMs can provide solutions with higher performance and accuracy, greater flexibility, and reduced cost when used as feature extraction methods for downstream tasks—a claim the speaker supports with concrete operational metrics from real production systems.

## Case Study 1: User Search Query Categorization

### Problem Context

Canva needed to understand user interests by categorizing aggregated search queries into their content's tree structure (information architecture). This involved a multi-step funneling process where classification models at each node of the tree structure would route queries to different content categories. The first layer required an intent classification system to categorize queries into different content types (templates, features, etc.).

### Traditional ML Approach

The conventional approach required a full model development cycle:

- Collection of large labeled datasets (tens of thousands of data points)
- Setting up training infrastructure
- Training a single-purpose text intent classifier
- Setting up deployment infrastructure
- Deploying the trained model for inference

This end-to-end process took approximately four weeks including data collection, exploration, model training, inference development, and deployment.

### LLM-Based Approach

The LLM approach dramatically simplified the workflow:

- Collect a handful of examples (under 10 examples)
- Design prompt structure to output predefined classes
- Use few-shot learning at inference time with the collected examples

This process eliminated the need for training and deployment infrastructure setup and required a much smaller annotated dataset.

### Operational Comparison

The presentation provided detailed operational metrics comparing both approaches:

- **Development Time**: Traditional classifier took 4 weeks; LLM API approach took 4-5 days
- **Operational Cost**: Traditional classifier cost approximately $100/month; LLM API cost roughly less than $5/month (a 95%+ reduction)
- **Scale**: The job runs weekly with hundreds of thousands of inputs
- **Accuracy**: The LLM API approach achieved higher accuracy than the single-purpose classifier using only few-shot learning without any fine-tuning

### Key Learnings from Case Study 1

The speaker shared several practical takeaways for production LLM deployments:

**When to Use LLM APIs:**
- Effective for straightforward tasks on text data
- Excellent for prototyping and speeding up first iteration launches
- Most effective when scale meets cost-saving thresholds

**Prompt Engineering Considerations:**
- Few-shot learning and prompt design can be sufficient to encode custom logic without fine-tuning
- Standardization of completion format is important (JSON format, structured prompts, finite answer sets)

**Error Mitigation:**
- LLM APIs have rate limits that must be handled through throttling and retry mechanisms
- Having fallback solutions is recommended to mitigate API downtime impact

**Fine-Tuning Insights:**
- Few-shot learning is good for rapid initial releases
- When scale increases or custom logic becomes complex, fine-tuning may be needed for performance and cost-effectiveness
- Small training datasets of roughly 50-100 data points per class were sufficient for acceptable performance

## Case Study 2: Content Page Categorization

### Problem Context

Canva has content pages with vastly different characteristics—from template collections with short-form metadata to informational articles with long-form text. The goal was to group pages together based on semantic similarity into topic clusters that align with their information architecture.

### Traditional NLP Approach

Due to the significant variation in text length and content structure across pages, the pre-LLM approach required multiple different text feature extraction methods:

- Keyword extraction using specialized Python libraries
- Text summarization using existing model architectures
- Key point extraction to normalize different page types to similar text forms
- Conversion to embedding space using open-source embeddings (sentence transformers, BERT)
- Clustering using these features

This fragmented approach required different frameworks and libraries, creating a scattered development process rather than a unified solution.

### LLM-Based Approach

The team experimented with different feature extraction methods combining open-source embeddings (sentence transformers, BERT embeddings) and LLM embeddings. They discovered that LLM embeddings on plain page text—without any text feature transformation—provided the best results.

### Evaluation Metrics

The team defined three specific metrics for evaluating content categorization performance:

- **Balance**: How evenly pages are grouped across all categories (avoiding concentration)
- **Completion**: Percentage of pages successfully grouped into relevant topics rather than left as outliers
- **Coherence**: Whether grouped pages are actually semantically related

### Results

LLM embeddings achieved superior performance across all metrics:

- Most balanced grouping among all methods tested
- 89% of pages grouped into relevant categories (highest completion rate)
- Highest coherence score among all feature extraction methods

### Operational Comparison

- **Development Time**: Traditional methods took about 2 weeks just for feature extraction; LLM embeddings approach took 3-5 days
- **Operational Cost**: Pre-LLM methods cost about $3/month; LLM embeddings cost about one-third of that

### Key Learnings from Case Study 2

**Feature Variations:**
- One foundational model can perform various text feature transformations (keyword extraction, summarization), significantly simplifying development
- Text feature extraction with LLMs can be non-deterministic depending on configuration—outputs may vary slightly even with identical inputs, though this wasn't problematic for the clustering use case

**Embeddings Insights:**
- LLM embeddings appear to represent text input better than other available text embeddings
- Format and length of text inputs don't significantly affect semantic understanding in LLM embedding space
- The team specifically used OpenAI's text-embedding-ada-002 model, which they found to be the most performant and cost-effective

**Future Considerations:**
- The team is considering open-source LLMs for text embeddings and feature extraction to potentially lower costs further at scale

## Scaling Considerations

When asked about handling millions of samples daily, the speaker offered two strategies:

**Aggregation and Preprocessing:** For the search query use case, despite having millions of queries per day, the team performs aggregation and preprocessing to reduce volume before LLM processing. This allows them to still benefit from LLM simplicity while managing costs.

**Open-Source LLMs:** For cases where aggregation isn't viable, the recommendation is to explore open-source LLMs deployed within organizational infrastructure. This involves more upfront setup but can eliminate ongoing API costs at scale.

## Production Operations Insights

The presentation offers several practical insights for running LLMs in production:

- Rate limiting is a real concern that must be handled with proper throttling and retry mechanisms
- Fallback solutions are important for API reliability
- Batch/scheduled processing (weekly in this case) is a viable pattern that allows cost-effective use of LLM APIs
- The "build vs. buy" decision tilts toward API usage for straightforward tasks but may shift toward fine-tuned or self-hosted models as scale increases
- Small annotated datasets (50-100 examples per class) can be sufficient for fine-tuning when needed

## Balanced Assessment

The case study presents compelling metrics for LLM adoption, though several caveats should be noted:

- The use cases described are relatively straightforward text classification and embedding tasks—more complex reasoning tasks may show different cost/benefit profiles
- The cost comparisons depend on specific scale parameters (hundreds of thousands of inputs weekly) that may not generalize
- The presentation comes from a practitioner's perspective sharing their specific experience, which may vary in other organizational contexts
- Long-term operational considerations like model drift, API changes, or vendor lock-in are not addressed

Overall, this case study provides valuable evidence that LLMs can serve as effective feature extraction tools for downstream ML tasks, offering faster development cycles and potentially lower costs compared to building single-purpose models, particularly for organizations already operating at scale with established ML infrastructure.