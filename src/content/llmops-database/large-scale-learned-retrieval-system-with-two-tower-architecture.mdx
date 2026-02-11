---
title: "Large-Scale Learned Retrieval System with Two-Tower Architecture"
slug: "large-scale-learned-retrieval-system-with-two-tower-architecture"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a0e77c785d7f9a70ea0324"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:26.844Z"
  createdOn: "2025-02-03T15:57:48.568Z"
llmopsTags:
  - "content-moderation"
  - "realtime-application"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "latency-optimization"
  - "monitoring"
  - "databases"
  - "microservices"
  - "cicd"
  - "scaling"
  - "reliability"
  - "scalability"
  - "microsoft-azure"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest developed and deployed a large-scale learned retrieval system using a two-tower architecture to improve content recommendations for over 500 million monthly active users. The system replaced traditional heuristic approaches with an embedding-based retrieval system learned from user engagement data. The implementation includes automatic retraining capabilities and careful version synchronization between model artifacts. The system achieved significant success, becoming one of the top-performing candidate generators with the highest user coverage and ranking among the top three in save rates."
link: "https://medium.com/pinterest-engineering/establishing-a-large-scale-learned-retrieval-system-at-pinterest-eb0eaf7b92c5"
year: 2024
seo:
  title: "Pinterest: Large-Scale Learned Retrieval System with Two-Tower Architecture - ZenML LLMOps Database"
  description: "Pinterest developed and deployed a large-scale learned retrieval system using a two-tower architecture to improve content recommendations for over 500 million monthly active users. The system replaced traditional heuristic approaches with an embedding-based retrieval system learned from user engagement data. The implementation includes automatic retraining capabilities and careful version synchronization between model artifacts. The system achieved significant success, becoming one of the top-performing candidate generators with the highest user coverage and ranking among the top three in save rates."
  canonical: "https://www.zenml.io/llmops-database/large-scale-learned-retrieval-system-with-two-tower-architecture"
  ogTitle: "Pinterest: Large-Scale Learned Retrieval System with Two-Tower Architecture - ZenML LLMOps Database"
  ogDescription: "Pinterest developed and deployed a large-scale learned retrieval system using a two-tower architecture to improve content recommendations for over 500 million monthly active users. The system replaced traditional heuristic approaches with an embedding-based retrieval system learned from user engagement data. The implementation includes automatic retraining capabilities and careful version synchronization between model artifacts. The system achieved significant success, becoming one of the top-performing candidate generators with the highest user coverage and ranking among the top three in save rates."
---

## Summary

Pinterest, a visual discovery platform serving over 500 million monthly active users (MAUs), undertook a significant effort to modernize their recommendation system's retrieval stage. Previously, their retrieval approaches relied heavily on heuristic methods such as Pin-Board graph relationships or user-followed interests. This case study documents their transition to a learned, embedding-based retrieval system that leverages machine learning models trained purely on logged user engagement events to power personalized content recommendations at scale.

The system was deployed for both the homefeed (the primary content discovery surface) and notifications, representing a substantial production ML operation. This is a strong example of ML systems engineering at scale rather than traditional LLM-based generative AI, but it shares many operational patterns with LLMOps, particularly around embedding management, model serving, versioning, and continuous retraining pipelines.

## Architecture Overview

Pinterest's recommendation system follows a multi-stage funnel design that is common in large-scale recommendation systems. The funnel starts with candidate generation (retrieval) from billions of pins, narrows down to thousands of candidates through a pre-ranking or "light-weight scoring" (LWS) model, and finally applies a full ranking model to generate personalized feeds.

The ranking model at Pinterest is described as a "powerful transformer-based model" learned from raw user engagement sequences with mixed device serving. It excels at capturing both long-term and short-term user engagement patterns. However, the retrieval stage historically lagged behind, relying on heuristic approaches rather than learned representations.

## Two-Tower Model Architecture

The core of the learned retrieval system is a two-tower neural network architecture, which is widely adopted in industry for retrieval tasks. This architecture separates the model into two components:

- **User Tower**: Encodes user-side information including long-term engagement history (via PinnerSage), user profile data, context features, and real-time user sequences (modeled with sequence transformers). This enables the model to capture both stable user preferences and instant user intentions.

- **Item Tower**: Encodes item (Pin) features to generate item embeddings that represent the content in the same embedding space as user embeddings.

The two-tower design enables efficient online serving because user and item embeddings can be computed independently. At serving time, personalized retrieval is achieved through nearest neighbor search between the user embedding and pre-computed item embeddings.

## Training Methodology

The model is trained as an extreme multi-class classification problem. Since computing a softmax over the entire corpus of billions of items is computationally infeasible, Pinterest employs in-batch negative sampling as a memory-efficient alternative. The training objective optimizes the probability of retrieving the correct item given the user context.

An important operational consideration is addressing popularity bias in the training data. Since items are sampled from training sets that reflect natural popularity distributions, Pinterest applies logit correction based on estimated item probabilities. This sampling bias correction helps ensure the model doesn't simply learn to recommend popular items but instead captures true user-item relevance.

## System Design for Production Serving

Given the scale of serving 500+ million MAUs, the system design required careful engineering. The architecture is split into two main components:

**Online Serving**: User embeddings are computed at request time, allowing the system to leverage the most up-to-date user features for personalized retrieval. This ensures that recent user actions immediately influence recommendations.

**Offline Indexing**: Millions of item embeddings are pre-computed and pushed to Pinterest's in-house ANN (Approximate Nearest Neighbor) serving system called Manas. The Manas system is based on HNSW (Hierarchical Navigable Small World graphs), a state-of-the-art algorithm for efficient approximate nearest neighbor search.

## Auto-Retraining Infrastructure

A critical aspect of production ML systems is model freshness. Pinterest established an automated retraining workflow to periodically refresh models with recent data, ensuring the system captures evolving user preferences and content trends.

However, the two-tower architecture introduces a unique operational challenge: the two model artifacts (user tower and item tower) are deployed to separate services. This creates a version synchronization problem. If the user embedding model is updated before the item index is rebuilt (or vice versa), the embedding spaces will be mismatched, causing a drastic drop in candidate quality.

Pinterest's solution involves attaching model version metadata to each ANN search service host. This metadata contains a mapping from model name to the latest model version and is generated alongside the index. At serving time, the homefeed backend first retrieves the version metadata from its assigned ANN service host and uses the corresponding model version to compute user embeddings.

This approach ensures "anytime" model version synchronization—even during index rollouts when some ANN hosts may have version N while others have version N+1, the system correctly matches user embeddings to the appropriate item embedding space. Additionally, Pinterest maintains the latest N versions of the user tower model to support rollback capability, ensuring they can compute appropriate user embeddings even if the ANN service is rolled back to a previous build.

## Results and Impact

The homefeed at Pinterest is described as "probably the most complicated system" with over 20 candidate generators in production using different retrieval strategies. The learned retrieval candidate generator specifically focuses on driving user engagement.

Key outcomes reported include:
- Top user coverage among candidate generators
- Top three save rates
- Successfully enabled deprecation of two other candidate generators
- "Huge overall site engagement wins"

While these results are self-reported and lack specific quantitative metrics, the fact that the system allowed deprecation of existing infrastructure suggests meaningful improvements in both effectiveness and system consolidation.

## Operational Patterns and Lessons

Several operational patterns emerge from this case study that are relevant to anyone building production ML systems:

**Separation of concerns in serving**: By splitting online (user embedding) and offline (item indexing) components, the system achieves efficiency while maintaining personalization. The user tower can leverage real-time features while item embeddings can be pre-computed and indexed for fast retrieval.

**Version synchronization as a first-class concern**: In systems with multiple interdependent model artifacts, version management becomes critical. Pinterest's metadata-based approach provides a robust solution that handles partial rollouts and rollbacks gracefully.

**Continuous retraining with validation**: The auto-retraining workflow includes model performance validation before deployment, ensuring model quality is maintained over time.

**Bias correction in training**: Addressing sampling bias is essential for retrieval systems to avoid the "popular item" trap and provide genuinely personalized recommendations.

## Limitations and Considerations

While this case study provides valuable insights, readers should note some limitations:

- Specific quantitative improvements are not disclosed, making it difficult to assess the magnitude of gains
- The system focuses on engagement-driven retrieval, which may not account for other important considerations like content diversity or user wellbeing
- Infrastructure details about the Manas ANN system are referenced but not fully explained in this document
- The case study is authored by Pinterest engineers, so it naturally presents the project favorably

Despite these limitations, this case study offers a solid example of how to operationalize embedding-based retrieval at massive scale, with particular attention to the often-overlooked challenges of model versioning and synchronization in distributed ML systems.