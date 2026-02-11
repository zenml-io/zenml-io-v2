---
title: "Enhancing E-commerce Search with LLMs at Scale"
slug: "enhancing-e-commerce-search-with-llms-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d1e64f46232845b5049"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:40:08.259Z"
  createdOn: "2024-11-21T14:01:02.286Z"
llmopsTags:
  - "cache"
  - "cost-optimization"
  - "elasticsearch"
  - "embeddings"
  - "guardrails"
  - "latency-optimization"
  - "monitoring"
  - "multi-modality"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "realtime-application"
  - "reliability"
  - "scaling"
  - "security"
  - "semantic-search"
  - "structured-output"
  - "system-prompts"
industryTags: "e-commerce"
company: "Instacart"
summary: "Instacart integrated LLMs into their search stack to improve query understanding, product attribute extraction, and complex intent handling across their massive grocery e-commerce platform. The solution addresses challenges with tail queries, product attribute tagging, and complex search intents while considering production concerns like latency, cost optimization, and evaluation metrics. The implementation combines offline and online LLM processing to enhance search relevance and enable new capabilities like personalized merchandising and improved product discovery."
link: "https://www.youtube.com/watch?v=q5LP1X3bhgc"
year: 2023
seo:
  title: "Instacart: Enhancing E-commerce Search with LLMs at Scale - ZenML LLMOps Database"
  description: "Instacart integrated LLMs into their search stack to improve query understanding, product attribute extraction, and complex intent handling across their massive grocery e-commerce platform. The solution addresses challenges with tail queries, product attribute tagging, and complex search intents while considering production concerns like latency, cost optimization, and evaluation metrics. The implementation combines offline and online LLM processing to enhance search relevance and enable new capabilities like personalized merchandising and improved product discovery."
  canonical: "https://www.zenml.io/llmops-database/enhancing-e-commerce-search-with-llms-at-scale"
  ogTitle: "Instacart: Enhancing E-commerce Search with LLMs at Scale - ZenML LLMOps Database"
  ogDescription: "Instacart integrated LLMs into their search stack to improve query understanding, product attribute extraction, and complex intent handling across their massive grocery e-commerce platform. The solution addresses challenges with tail queries, product attribute tagging, and complex search intents while considering production concerns like latency, cost optimization, and evaluation metrics. The implementation combines offline and online LLM processing to enhance search relevance and enable new capabilities like personalized merchandising and improved product discovery."
---

## Overview

This case study comes from a conference talk by Prakash Putta, a Staff Software Engineer at Instacart who leads the company's search team. Instacart is described as the North American leader in online grocery, specializing in pickup and delivery services. The company operates across 400 national, regional, and local retailer brands with over 8,000 stores across 14,000 cities in the US, handling over a billion products across diverse categories including traditional grocery, alcohol, beauty, and electronics.

The talk focuses on how Instacart has been integrating LLMs into their existing search stack to address specific challenges that traditional NLP models struggle with, particularly around query understanding, product attribute extraction, and handling complex user intents in the grocery e-commerce domain.

## The Problem Space

Instacart's search stack follows a typical modern architecture with four major components: query understanding, retrieval, ranking, and presentation. Query understanding predicts personalized user intent, retrieval fetches relevant products, ranking uses multi-stage approaches with different objectives, and presentation adapts to context and platform (iOS, web, etc.).

The speaker identified several key challenges that motivated the integration of LLMs:

**Tail Queries**: Instacart has approximately 20 million tail queries that traditional NLP models handle poorly due to limited training data. These queries have grown significantly since COVID-19 brought more users to the platform. The example given was "cuties" (a brand name for clementines that became synonymous with the product itself) - traditional keyword matching fails when the brand name isn't in product descriptions.

**Product Attribute Extraction**: Products have multiple attributes (cherry, non-dairy, almond milk, etc.) that are essential for personalization. With thousands of categories and hundreds of attributes per category, manual extraction by domain experts is costly, not scalable, and error-prone.

**Broad and Complex Intents**: Queries like "breakfast" can map to thousands of products without the keyword appearing in any product description. Understanding these concepts requires deep knowledge that's difficult to embed through traditional knowledge graphs. Even more challenging are complex intents like "breakfast ideas to lose weight" or "July 4th party ideas" where users come with specific tasks in mind.

## The LLM Solution Architecture

The speaker described a typical search + LLM integration architecture where a user query is embedded into a prompt, sent to an LLM service, and the resulting answers are fed into product retrieval before displaying results. This is presented as a simplified version of their actual implementation.

**Advantages of LLMs for Search** highlighted in the talk:

- Rich world knowledge that can provide expert-like answers for common concepts without building complex knowledge graphs
- Strong contextual and semantic understanding capabilities
- No out-of-domain concept issues since LLMs are trained on vast text corpora
- Dramatically faster development cycles - tasks that previously required separate NLP models (spell correction, entity linking, intent classification) can sometimes be accomplished through simple prompting

## Specific Use Cases

**Product Attribute Extraction**: LLMs excel at taking product information and descriptions and extracting concepts and attributes. The speaker notes this is faster, easier, and cheaper than human extraction, with better accuracy. They also mentioned using multimodal models like GPT-V to extract features from product images when text descriptions are incomplete - a common issue with retailer and third-party data sources.

**Merchandising and Content Generation**: Rather than requiring humans to manually create seasonal collections (like "Summer Grilling"), LLMs can generate the images, metadata, context, and product selections. This enables personalized collection creation at scale, which was previously impractical.

**Query Tagging**: Extracting attributes from queries helps improve search quality. The example given was "sugar cookie dough" where traditional models might not understand that "sugar cookie" is an attribute and "dough" is the actual product being searched for.

**Broad Intent Understanding**: For queries like "breakfast," LLMs can provide deep concept understanding and suggest sub-concepts (cereal, eggs, orange juice, yogurt) that can be used for query expansion.

**New Product Discovery**: LLMs can suggest interesting related queries based on basket context to encourage exploration, going beyond the "boring" suggestions derived from historical logs.

## Production Considerations and LLMOps Challenges

The speaker dedicated significant attention to practical production concerns, which is valuable from an LLMOps perspective:

**Cost and Latency**: LLM calls are expensive and slow. The speaker mentioned latencies in the "two digit to three digit milliseconds" range, which is significant for search applications.

**Query Eligibility**: Not all queries need LLM enhancement. Simple queries like "milk" work fine with traditional methods, while complex intents benefit from LLM augmentation. Understanding when to make LLM calls versus using traditional search is critical for production systems.

**Online vs. Offline Processing**: A key architectural decision is whether LLM processing needs to happen in real-time or can be done offline. Product attribute extraction, for example, can be processed offline and integrated into query understanding and ranking systems without latency impact and more cost-effectively. Even for online use cases, strategies like caching, parallelization (running LLM calls alongside other operations), and async calls are mentioned as important optimizations.

**Prompt Engineering**: Getting prompts right is described as "super important" since incorrect prompts lead to wrong results. The speaker acknowledged that one prompt doesn't work for all query types, and prompt testing at scale is essential to ensure new prompts don't degrade existing experiences.

**Content Moderation**: Ensuring LLMs don't provide inappropriate results (examples given: "how to make a bomb" or "unhealthy snacks") is described as one of the biggest issues to solve, particularly regarding brand and business protection.

**Mapping LLM Outputs to Catalog Products**: Translating rich LLM information back to actual purchasable products is identified as a hard problem.

## Challenges with LLM Integration

The speaker provided specific examples of where LLM integration can fail:

**Lack of Context in Interpreting Answers**: For "July 4th party ideas," LLMs might suggest "fireworks" which retrieves irrelevant products in a grocery context. For "cheese that goes with wine," suggesting "Gouda cheese" might retrieve shredded Gouda rather than the intended cheese block.

**Domain Knowledge Gaps**: The example of "variety chips" was given - users are looking for a product containing different chip varieties, but LLMs might interpret this as wanting to purchase different types of chips separately.

**Potential Solutions Discussed**: Fine-tuning prompts (which doesn't scale well due to cost and latency increases), or longer-term, fine-tuning custom LLM models on grocery domain data (described as costly and resource-intensive).

## Evaluation Approaches

The speaker discussed evaluation as a significant challenge:

**Online Metrics**: Increases in new product discovery or search conversion rate (percentage of searches that lead to purchases) indicate LLMs are understanding user intent effectively.

**Human Evaluation Replacement**: There's significant hope that human annotation tasks for search result evaluation could be moved to LLMs, making the process faster and cheaper. This could potentially be used in experimentation to understand feature launches' impact on search quality.

**ROI Measurement**: The speaker acknowledged this is challenging and depends heavily on the product use case. For some applications (improving NLP models with more data), ROI is straightforward. For complex online LLM integrations, it's harder to measure and sometimes requires taking "big bets" before fully understanding business metrics.

## Future Trends

The speaker outlined several directions for LLM integration in search:

- Personalized search using full user context passed to LLMs for hyper-personalized results
- Scalable personalized content generation (dynamic carousels like "Movie Night Essentials" for popcorn searches)
- Using LLMs for search result evaluation to replace or augment human raters, potentially enabling faster experimentation cycles

## Honest Assessment

While the speaker was enthusiastic about LLM potential, several important caveats were noted. Legal and IP constraints prevented sharing detailed technical implementations. The solutions presented appear to be a mix of production systems and exploratory work, with some areas still being actively developed. The challenges around domain knowledge gaps, evaluation, and ROI measurement suggest this is still an evolving practice rather than a fully mature solution. The speaker appropriately emphasized that successful LLM integration requires deep understanding of specific product use cases rather than blanket LLM adoption.