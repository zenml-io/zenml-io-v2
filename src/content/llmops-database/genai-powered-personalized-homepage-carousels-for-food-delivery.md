---
title: "GenAI-Powered Personalized Homepage Carousels for Food Delivery"
slug: "genai-powered-personalized-homepage-carousels-for-food-delivery"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693057aa933565e19b42187b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:31:10.824Z"
  createdOn: "2025-12-03T15:30:50.076Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "content-moderation"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "few-shot"
  - "reranking"
  - "fine-tuning"
  - "pytorch"
  - "fastapi"
  - "monitoring"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash developed a GenAI-powered system to create personalized store carousels on their homepage, addressing limitations in their previous heuristic-based content system that featured only 300 curated carousels with insufficient diversity and overly broad categories. The new system leverages LLMs to analyze comprehensive consumer profiles and generate unique carousel titles with metadata for each user, then uses embedding-based retrieval to populate carousels with relevant stores and dishes. Early A/B tests in San Francisco and Manhattan showed double-digit improvements in click rates, improved conversion rates and homepage relevance metrics, and increased merchant discovery, particularly benefiting small and mid-sized businesses."
link: "https://careersatdoordash.com/blog/doordashs-next-generation-homepage-genai/"
year: 2025
seo:
  title: "Doordash: GenAI-Powered Personalized Homepage Carousels for Food Delivery - ZenML LLMOps Database"
  description: "DoorDash developed a GenAI-powered system to create personalized store carousels on their homepage, addressing limitations in their previous heuristic-based content system that featured only 300 curated carousels with insufficient diversity and overly broad categories. The new system leverages LLMs to analyze comprehensive consumer profiles and generate unique carousel titles with metadata for each user, then uses embedding-based retrieval to populate carousels with relevant stores and dishes. Early A/B tests in San Francisco and Manhattan showed double-digit improvements in click rates, improved conversion rates and homepage relevance metrics, and increased merchant discovery, particularly benefiting small and mid-sized businesses."
  canonical: "https://www.zenml.io/llmops-database/genai-powered-personalized-homepage-carousels-for-food-delivery"
  ogTitle: "Doordash: GenAI-Powered Personalized Homepage Carousels for Food Delivery - ZenML LLMOps Database"
  ogDescription: "DoorDash developed a GenAI-powered system to create personalized store carousels on their homepage, addressing limitations in their previous heuristic-based content system that featured only 300 curated carousels with insufficient diversity and overly broad categories. The new system leverages LLMs to analyze comprehensive consumer profiles and generate unique carousel titles with metadata for each user, then uses embedding-based retrieval to populate carousels with relevant stores and dishes. Early A/B tests in San Francisco and Manhattan showed double-digit improvements in click rates, improved conversion rates and homepage relevance metrics, and increased merchant discovery, particularly benefiting small and mid-sized businesses."
---

## Overview

DoorDash implemented a production-scale GenAI system to transform their homepage experience through personalized carousel generation. This case study represents a sophisticated application of LLMs in a high-traffic e-commerce environment where the homepage serves as the primary entry point for millions of users globally. The system replaced a heuristic-based approach that relied on approximately 300 manually curated carousels with a dynamic, LLM-powered pipeline capable of generating virtually unlimited personalized content for each user.

The original system was built around a food knowledge graph (FKG) that organized content into categories like "breakfast burritos," "salads," and "baked goods." While functional, this approach suffered from three critical limitations: insufficient concept diversity to capture the full spectrum of customer preferences, overly broad and impersonal carousel concepts, and relevance issues stemming from suboptimal knowledge graph tagging that caused stores to be matched incorrectly or omitted entirely. These limitations motivated the development of the GenAI-based solution.

## Architecture and Pipeline Design

The production system follows a five-stage pipeline architecture designed with two primary considerations: scalability to handle millions of users globally, and cost-effectiveness given the expense of external LLM API calls. The pipeline stages include carousel generation, carousel embedding generation, content moderation, store/item retrieval, and store ranking.

The bulk content generation approach uses Spark jobs to generate prompts and calls LLMs through batch requests, which is a cost-effective strategy for processing large volumes of users. This batch-oriented architecture reflects a practical tradeoff between freshness and cost—the system doesn't generate carousels in real-time for each user visit but rather pre-generates them in bulk processing runs.

## Carousel Generation with LLMs

The carousel generation stage takes consumer profiles and part-of-day information as inputs and uses LLMs to generate carousel titles and associated metadata. Consumer profiles capture a user's unique cuisine, taste, and dish preferences based on order history and platform interactions. The prompt engineering process governs several critical considerations:

Personalized relevance is paramount—if a user frequently orders Italian food, the system generates titles like "Classic Italian flavors" or "Oven-baked pizzas." The LLMs incorporate contextual awareness through day partitioning, ensuring breakfast-themed carousels appear in the morning while avoiding inappropriate suggestions like "Steakhouse favorites" during breakfast hours.

The system seeks to balance topic specificity—avoiding carousel titles that are too niche (like "Basil popcorn chicken") while also preventing overly broad titles (like simply "Pasta") that might be less engaging. Title diversity is enforced to prevent repetition across multiple carousels for the same user. The prompts also include instructions to exclude unwanted topics such as specific brand names, appetizers and side dishes as primary carousel themes, and food items not typically served by DoorDash restaurant partners.

DoorDash optimizes their prompts through continuous feedback from internal user panels who score carousels based on criteria including repetition frequency, specificity, diversity, and relevance. This iterative prompt refinement process represents a practical approach to LLMOps where human feedback directly shapes the production prompts.

## Metadata Expansion Strategy

A key innovation in this system addresses a common challenge in retrieval-augmented generation: converting brief carousel titles into effective retrieval queries. The brevity of titles like "Hearty wraps" makes them difficult to convert into useful embeddings for retrieval without additional context.

DoorDash solves this by having the LLM generate auxiliary metadata for each carousel that aligns with merchant profile fields. These merchant profiles include comprehensive information about food types, cuisine categories, and dietary options. The metadata generation integrates personalization by deriving information from consumer preferences and order history. This means the same carousel title—"Hearty wraps"—might map to different metadata depending on the user's profile. For a user with Indian cuisine preferences, the metadata might include "cuisine_type: Northern Indian" and "food_type: paneer wrap, chicken tikka wrap, vegetable wrap." For a user with American food preferences, the same title would map to "cuisine_type: American" and "food_type: chicken wrap, buffalo chicken wrap, chicken Caesar wrap."

This metadata expansion transforms generic titles into personalized, context-rich queries that significantly improve retrieval relevance. The approach demonstrates a sophisticated understanding of how to bridge LLM-generated content with embedding-based retrieval systems.

## Content Moderation at Scale

As with any production LLM application, content moderation is critical to prevent inappropriate content from reaching users. Manual review is infeasible when generating millions of unique carousel titles, so DoorDash employs an "LLM-as-jury" approach to scale the review process.

The moderation system prompts three different LLMs with review criteria covering violations of DoorDash policies, insensitive or offensive content, unappetizing descriptions, and conceptually incoherent titles. The three LLMs independently evaluate each title, and their decisions are subjected to a veto process—if any single juror LLM flags a title as problematic, it is automatically blocked. This conservative approach achieves 95% recall on detecting problematic titles.

The multi-LLM jury design with veto power represents a practical safety mechanism that trades some false positives (blocking acceptable content) for high confidence in preventing inappropriate content from reaching users. This reflects the appropriate risk tolerance for a consumer-facing application where brand safety is paramount.

## Embedding-Based Retrieval

After carousel titles and metadata are generated, they are concatenated into text and converted into embeddings using LLM text embedding models. Similarly, merchant profiles and dish profiles are formatted as JSON and embedded using the same model to ensure semantic compatibility.

The retrieval system performs two k-nearest neighbor (KNN) queries: first to identify stores with the highest cosine similarity within the user's delivery radius, and second to find the dish with the highest similarity to the carousel query within each selected store. The dish retrieval determines which image to display for each store in the carousel, aligning visual presentation with the carousel theme.

Notably, DoorDash performs exact KNN search on GPU rather than approximate nearest neighbor search. Pre-generated masks for different scenarios (such as deliverable stores for different geolocations or items within each store) and document embeddings are stored in GPU memory. For each query with a corresponding geolocation, the system performs matrix multiplication to calculate cosine similarity between the query embedding and unmasked document embeddings, then selects the top K results. This enables low-latency online retrieval despite the computational cost of exact search.

The choice of exact KNN on GPU reflects an interesting tradeoff—accepting higher infrastructure costs for GPUs in exchange for better retrieval quality and low latency. This suggests that for DoorDash's use case, the business value of improved relevance justifies the additional computational expense.

## Ranking and Presentation

Once candidate stores are retrieved, DoorDash leverages their existing carousel serving framework and store ranking models. The existing ranker is optimized for engagement signals like click-through rate and conversion rate, ensuring that the new GenAI carousels respect the same quality standards and guardrails that power the rest of the homepage.

However, the existing ranker hasn't been trained on the new embedding similarity scores that indicate retrieval relevance. To address this cold-start problem, DoorDash implements a block re-ranking approach. The ranked list from the baseline model is partitioned into blocks of size K, and within each block, stores are reordered by a weighted blend of the ranker model score and the embedding similarity score.

The scoring function is multiplicative: FinalScore(s) = R(s)^α · S(s)^β, where R(s) is the engagement-based ranker score, S(s) is the similarity score between store and carousel, and α and β are tunable weight exponents. The multiplicative design ensures that stores only rise to the top if they perform well on both engagement and relevance dimensions, balancing these competing objectives.

This blocked re-ranking design provides a flexible baseline for experimentation and an incremental path toward a fully learned ranker that could eventually incorporate embedding similarity as a native feature. The approach demonstrates practical LLMOps thinking—bridging new GenAI capabilities with existing production systems rather than requiring a complete rebuild.

## Evaluation Strategy

DoorDash employed a multi-faceted evaluation strategy during system development, combining offline evaluations with online A/B testing. The offline evaluations addressed two distinct aspects:

For carousel-user relevance, which is inherently subjective, DoorDash created a panel of internal users who scored carousels based on criteria including repetition frequency, specificity, diversity, and relevance. This internal feedback loop enabled iterative prompt refinement, representing a practical approach to incorporating human judgment in LLM system development.

For carousel-store relevance, which can be evaluated more objectively, DoorDash used third-party labelers to score the relevance of stores fetched for each carousel based on predefined criteria. The team monitored precision@K metrics, achieving improvement from 68% to 85% precision@10 through refinements to prompts and retrieval strategies.

The combination of internal user panels for subjective quality assessment and third-party labelers for objective relevance evaluation represents a thoughtful evaluation design that addresses different aspects of system quality with appropriate methods.

## Production Results and Business Impact

For online evaluation, DoorDash launched the new content system in two major submarkets: San Francisco and Manhattan. These markets likely represent high-volume, diverse customer bases that provide meaningful signals about system performance.

The A/B tests showed double-digit improvements in click rates, along with improvements in conversion rates and homepage relevance metrics. The results indicate that the homepage is becoming "more sticky" with fewer consumers bouncing off, suggesting the personalized carousels are successfully engaging users and keeping them on the platform.

Beyond immediate engagement metrics, the system is driving greater exploration and merchant discovery by exposing customers to more cuisines and new merchants. This isn't just improving customer experience—it's driving merchant trials and generating volume for small and mid-sized businesses, which has important marketplace health implications for DoorDash's platform ecosystem.

While the case study reports positive results, it's worth noting that the specific magnitude of improvements (beyond "double-digit click rate improvement") isn't disclosed. The case study doesn't discuss any negative results, challenges in the rollout, or segments where the system may not have performed as well. This is typical of company blog posts but means we should view the claims with appropriate skepticism about whether these results will generalize to all markets and user segments.

## Operational Considerations and Tradeoffs

The system architecture reflects several practical tradeoffs in production LLMOps. The batch processing approach using Spark jobs and batch LLM API calls optimizes for cost over real-time personalization. This means carousels are pre-generated rather than created on-demand for each homepage visit, which trades some freshness for significant cost savings at scale.

The exact KNN search on GPU represents the opposite tradeoff—accepting higher infrastructure costs for better quality and lower latency. This suggests DoorDash views the retrieval quality as business-critical enough to justify the GPU expense.

The multi-LLM moderation approach with veto power prioritizes safety over efficiency, running three separate LLM inferences for each piece of content and blocking anything flagged by any single model. This conservative approach makes sense for a consumer-facing brand but does increase moderation costs.

The blocked re-ranking approach represents a pragmatic middle ground between completely replacing the existing ranking system and ignoring the new relevance signals from embeddings. This incremental approach reduces implementation risk and provides a path to iterate toward a more sophisticated solution.

## Future Directions

DoorDash outlines two main areas for future enhancement. First, they plan to expand carousel scope beyond taste preferences to include other dimensions such as affordability, speed, and non-restaurant shopping including groceries. This expansion would leverage the same GenAI infrastructure for broader use cases.

Second, they plan to fine-tune their LLMs with DoorDash-specific data to incorporate proprietary knowledge that off-the-shelf models lack. This includes co-purchase patterns, regional customer preferences, and store performance on the platform. The goal is to integrate this DoorDash-specific knowledge with the world knowledge that pre-trained LLMs already possess.

The fine-tuning direction is particularly interesting from an LLMOps perspective—it represents a natural evolution from prompt engineering with general-purpose models toward more customized models that encode domain-specific knowledge. However, the case study doesn't discuss the challenges of maintaining fine-tuned models, including training data pipelines, model versioning, and the operational overhead of managing custom models alongside vendor-provided APIs.

## Critical Assessment

This case study represents a sophisticated production deployment of LLMs for personalized content generation at scale. The technical approach is sound, combining prompt engineering, embedding-based retrieval, GPU-accelerated search, and hybrid ranking in a cohesive pipeline. The evaluation methodology appropriately combines subjective quality assessment, objective relevance metrics, and online A/B testing.

However, as a company blog post, the case study naturally emphasizes successes while glossing over challenges and limitations. We don't learn about failure modes, edge cases, the cost structure of the system, how often carousels are regenerated, or whether there were any markets or user segments where the system didn't perform well. The claim of "double-digit click rate improvement" is positive but vague—a 10% improvement and a 90% improvement would both qualify.

The system's reliance on external LLM APIs introduces vendor dependencies and ongoing costs that aren't discussed in detail. The batch processing approach, while cost-effective, means the system can't respond to very recent user behavior—there's an inherent staleness based on how frequently carousels are regenerated.

The case study also doesn't discuss monitoring and observability for the production system—how do they detect when LLM outputs degrade, when embeddings drift, or when retrieval quality decreases? These operational concerns are critical for maintaining production LLM systems but aren't covered.

Despite these limitations in disclosure, the case study provides valuable insights into practical LLMOps at scale for a major e-commerce platform. The architecture demonstrates thoughtful integration of multiple components—LLM generation, embedding models, retrieval systems, and ranking models—into a cohesive production system that delivers measurable business value.