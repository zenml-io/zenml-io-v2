---
title: "Enhancing E-commerce Search with LLM-Powered Semantic Retrieval"
slug: "enhancing-e-commerce-search-with-llm-powered-semantic-retrieval"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3eb6a25e267a4a500393"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:07:59.157Z"
  createdOn: "2024-11-21T14:07:50.598Z"
llmopsTags:
  - "cache"
  - "cost-optimization"
  - "data-integration"
  - "elasticsearch"
  - "embeddings"
  - "fallback-strategies"
  - "latency-optimization"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
industryTags: "e-commerce"
company: "Picnic"
summary: "Picnic, an e-commerce grocery delivery company, implemented LLM-enhanced search retrieval to improve product and recipe discovery across multiple languages and regions. They used GPT-3.5-turbo for prompt-based product description generation and OpenAI's text-embedding-3-small model for embedding generation, combined with OpenSearch for efficient retrieval. The system employs precomputation and caching strategies to maintain low latency while serving millions of customers across different countries."
link: "https://blog.picnic.nl/enhancing-search-retrieval-with-large-language-models-llms-7c3748b26d72"
year: 2024
seo:
  title: "Picnic: Enhancing E-commerce Search with LLM-Powered Semantic Retrieval - ZenML LLMOps Database"
  description: "Picnic, an e-commerce grocery delivery company, implemented LLM-enhanced search retrieval to improve product and recipe discovery across multiple languages and regions. They used GPT-3.5-turbo for prompt-based product description generation and OpenAI's text-embedding-3-small model for embedding generation, combined with OpenSearch for efficient retrieval. The system employs precomputation and caching strategies to maintain low latency while serving millions of customers across different countries."
  canonical: "https://www.zenml.io/llmops-database/enhancing-e-commerce-search-with-llm-powered-semantic-retrieval"
  ogTitle: "Picnic: Enhancing E-commerce Search with LLM-Powered Semantic Retrieval - ZenML LLMOps Database"
  ogDescription: "Picnic, an e-commerce grocery delivery company, implemented LLM-enhanced search retrieval to improve product and recipe discovery across multiple languages and regions. They used GPT-3.5-turbo for prompt-based product description generation and OpenAI's text-embedding-3-small model for embedding generation, combined with OpenSearch for efficient retrieval. The system employs precomputation and caching strategies to maintain low latency while serving millions of customers across different countries."
---

## Overview

Picnic is a European grocery delivery company operating across the Netherlands, Germany, and France, delivering groceries ordered through a mobile application directly to customers' doorsteps. The company faces a significant challenge: accommodating tens of thousands of products in a mobile interface while serving customers with diverse languages, cultural preferences, and culinary expectations. With millions of unique search terms being used by customers, developing a search system that delivers accurate, fast results became a prime candidate for LLM-enhanced solutions.

The case study illustrates a practical application of LLMs not for generative content creation, but for enhancing an existing machine learning task—specifically, search retrieval. This represents an increasingly common pattern in LLMOps where large language models are used to augment traditional systems rather than replace them entirely.

## The Problem Space

The search retrieval challenge at Picnic is multifaceted. Users exhibit a wide variety of behaviors that make simple lookup-based search insufficient:

- Spelling mistakes and typos (e.g., "jogurt" instead of "yogurt")
- Double whitespaces and random characters from typing accidents
- Ambiguous queries where user intent differs from literal meaning
- Multilingual complexities where the same term (e.g., "fromage") should yield different results for Dutch customers searching for French cheeses versus French customers expecting standard cheese results
- The need to understand context—for example, recognizing that a customer searching for "ice" might actually want ice-making utilities rather than blocks of ice

These challenges are compounded by rising customer expectations. As users become accustomed to interacting with advanced language models in their daily lives, they expect similar sophistication from e-commerce search experiences.

## Technical Architecture and LLM Integration

### Core Approach: Prompt-Based Product Description Generation

At the heart of Picnic's solution is a technique they call "prompt-based product description generation." This approach transforms search terms into rich descriptions that can be semantically compared against their entire product and recipe catalog. The fundamental insight is that converting a raw search query into a contextual description allows for better semantic matching with product information.

For example, a search query like "daughter's birthday party" can be transformed by the LLM into a description of products typically associated with such an event, enabling retrieval of relevant items that might not contain those exact keywords.

### Model Selection

Picnic chose OpenAI's GPT-3.5-turbo for the prompt generation task, noting that it performs comparably to GPT-4-turbo while being significantly faster. This is a pragmatic production decision—choosing the model that provides sufficient quality while meeting latency and cost requirements. For embeddings, they use OpenAI's text-embedding-3-small model, which produces 1536-dimensional vectors. The choice of the smaller embedding model was driven by a practical constraint: OpenSearch has a maximum dimensionality limit of 1536 for efficient retrieval, which aligns exactly with the output size of text-embedding-3-small.

### Precomputation Strategy

One of the most critical LLMOps decisions in this case study is the precomputation approach. Rather than calling LLM APIs at query time—which would introduce unacceptable latency for a search-as-you-type experience—Picnic precomputes embeddings for both search terms and product/recipe content.

The rationale is compelling: by analyzing historical search data, they can identify and precompute embeddings for approximately 99% of search terms that customers use. This eliminates the need for real-time LLM inference in the vast majority of cases, allowing the system to deliver results in milliseconds rather than the seconds that typical LLM responses require.

This approach reflects a mature understanding of LLMOps trade-offs. While it requires upfront computational investment and ongoing maintenance as the product catalog changes, it enables a user experience that would be impossible with synchronous LLM calls.

### Infrastructure: OpenSearch Integration

The system uses OpenSearch as the core retrieval engine. The architecture employs two indexes:
- One for storing search term prompts and their corresponding embeddings
- One for embedding-based retrieval of products and recipes

This separation allows for efficient matching of incoming queries against precomputed search term embeddings, followed by semantic retrieval of relevant products using vector similarity.

### Caching and Reliability

Beyond precomputation, Picnic implements additional caching mechanisms throughout the system. This serves multiple purposes:
- Minimizing computational demands and costs
- Reducing energy consumption (aligning with environmental responsibility goals)
- Ensuring 24/7 service uptime by managing third-party API dependencies (i.e., OpenAI)

The emphasis on managing third-party dependencies through caching is a crucial LLMOps consideration. When your production system depends on external API calls, you must have strategies to handle outages, rate limits, and latency spikes gracefully.

### Quality Assurance and Sanity Checks

The pipeline includes numerous sanity checks, such as verifying that embeddings are consistent and of the appropriate length. The case study explicitly acknowledges that outputs from language models can vary with updates and model iterations—a critical observation for production systems. These checks help maintain system integrity as underlying models evolve.

## Evaluation and Deployment Strategy

### Offline Optimization

The development process begins with extensive offline optimization, where the team experiments with:
- Search parameters
- LLM configurations (prompts, dimension sizes)
- Different models

This phase is conducted without affecting the production environment, allowing for safe experimentation. However, the team acknowledges a limitation: offline evaluation relies on historical search results, and the ground truth derived from past behavior may not perfectly reflect optimal outcomes. They recommend using offline evaluation primarily for initial parameter tuning.

### Online A/B Testing

Following offline optimization, new features undergo controlled A/B testing with real users. This phase collects data on how actual customers interact with the enhanced search compared to the existing system. The case study emphasizes that this iterative approach ensures changes move in the right direction incrementally.

The metrics they focus on include:
- Conversion rates (users finding what they search for)
- Click-through rates (measuring result relevance)
- Overall customer satisfaction

### Scaling and Continuous Improvement

Once A/B testing validates a feature, it's scaled across the entire user base with careful monitoring to manage increased load and maintain system stability. The scaling phase also generates more data, enabling further refinements and personalization.

The team notes that initial A/B tests are just the beginning—there are "millions of ways to configure search results" including ranking changes, mixing recipes with articles, and hybrid approaches combining literal search with LLM-based semantic search.

## Production Considerations and Trade-offs

Several aspects of this case study highlight mature LLMOps thinking:

**Latency vs. Capability Trade-off**: Rather than accepting LLM latency limitations, Picnic architecturally avoided them through precomputation. They acknowledge that a future iteration could "fully unleash the power of LLMs" with a redesigned user interface that accommodates slower response times, but for now they prioritize speed.

**Cost Management**: The team explicitly mentions that "prompting and embedding millions of search terms is resource-intensive" with associated API costs. The precomputation strategy helps control these costs by doing the work upfront rather than per-query.

**Model Selection Pragmatism**: Choosing GPT-3.5-turbo over GPT-4-turbo based on equivalent performance for their use case demonstrates practical model selection rather than defaulting to the most powerful option.

**Dependency Management**: The emphasis on caching to handle third-party dependencies reflects real-world concerns about relying on external APIs for critical production systems.

## Limitations and Balanced Assessment

While the case study presents a thoughtful approach to LLM-enhanced search, it's worth noting some limitations:

- Specific quantitative results are not provided—improvements in conversion rates, click-through rates, or customer satisfaction are mentioned as goals but no before/after metrics are shared
- The case study is authored by the team implementing the solution, so it naturally presents the approach favorably
- The handling of the ~1% of search terms not covered by precomputation is not detailed—it's unclear whether these fall back to traditional search or involve real-time LLM calls
- Long-term maintenance requirements for keeping precomputed embeddings synchronized with catalog changes are not discussed

Overall, this case study represents a practical, production-focused application of LLMs to enhance search retrieval, with particular emphasis on meeting latency requirements through precomputation and managing external API dependencies through caching.