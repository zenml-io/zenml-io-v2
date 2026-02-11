---
title: "Advanced Embedding-Based Retrieval for Personalized Content Discovery"
slug: "advanced-embedding-based-retrieval-for-personalized-content-discovery"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a9aa67c3973e8758e0c5a3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:00:10.321Z"
  createdOn: "2025-02-10T07:27:35.203Z"
llmopsTags:
  - "content-moderation"
  - "classification"
  - "structured-output"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "pytorch"
  - "fastapi"
  - "microsoft-azure"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest enhanced their homefeed recommendation system through several advancements in embedding-based retrieval. They implemented sophisticated feature crossing techniques using MaskNet and DHEN frameworks, adopted pre-trained ID embeddings with careful overfitting mitigation, upgraded their serving corpus with time-decay mechanisms, and introduced multi-embedding retrieval and conditional retrieval approaches. These improvements led to significant gains in user engagement metrics, with increases ranging from 0.1% to 1.2% across various metrics including engaged sessions, saves, and clicks."
link: "https://medium.com/pinterest-engineering/advancements-in-embedding-based-retrieval-at-pinterest-homefeed-d7d7971a409e"
year: 2024
seo:
  title: "Pinterest: Advanced Embedding-Based Retrieval for Personalized Content Discovery - ZenML LLMOps Database"
  description: "Pinterest enhanced their homefeed recommendation system through several advancements in embedding-based retrieval. They implemented sophisticated feature crossing techniques using MaskNet and DHEN frameworks, adopted pre-trained ID embeddings with careful overfitting mitigation, upgraded their serving corpus with time-decay mechanisms, and introduced multi-embedding retrieval and conditional retrieval approaches. These improvements led to significant gains in user engagement metrics, with increases ranging from 0.1% to 1.2% across various metrics including engaged sessions, saves, and clicks."
  canonical: "https://www.zenml.io/llmops-database/advanced-embedding-based-retrieval-for-personalized-content-discovery"
  ogTitle: "Pinterest: Advanced Embedding-Based Retrieval for Personalized Content Discovery - ZenML LLMOps Database"
  ogDescription: "Pinterest enhanced their homefeed recommendation system through several advancements in embedding-based retrieval. They implemented sophisticated feature crossing techniques using MaskNet and DHEN frameworks, adopted pre-trained ID embeddings with careful overfitting mitigation, upgraded their serving corpus with time-decay mechanisms, and introduced multi-embedding retrieval and conditional retrieval approaches. These improvements led to significant gains in user engagement metrics, with increases ranging from 0.1% to 1.2% across various metrics including engaged sessions, saves, and clicks."
---

## Overview

Pinterest's engineering team published a detailed technical blog post describing their advancements in embedding-based retrieval (also known as Learned Retrieval) for their Homefeed recommendation system. This case study represents a significant production ML system that serves personalized content recommendations to Pinterest's large user base, demonstrating how sophisticated machine learning techniques can be deployed at scale to improve user engagement metrics.

The Homefeed is Pinterest's primary content discovery surface, where users encounter personalized Pins based on their interests and engagement history. The embedding-based retrieval system serves as a critical candidate generator, responsible for retrieving highly personalized, engaging, and diverse content that fulfills various user intents and enables multiple actionability such as Pin saving and shopping. This work represents a substantial engineering effort across multiple teams at Pinterest, including Homefeed Candidate Generation, ATG Applied Science, Homefeed Relevance, and Pinner Curation & Growth.

## Technical Architecture: Two-Tower Models

The core of Pinterest's retrieval system is built on a two-tower model architecture. This is a common pattern in large-scale recommendation systems where one tower encodes user representations and another tower encodes item (Pin) representations. The key advantage of this architecture is computational efficiency: the Pin tower can be computed offline and cached, while the user tower only needs to be computed once per Homefeed request. This separation allows Pinterest to scale up to more complex model structures within each tower without impacting serving latency.

The system takes various input features including pre-trained embedding features, categorical features, and numerical features. All features are converted to dense representations through embedding layers or Multi-layer Perceptron (MLP) layers before being processed by the model.

## Feature Crossing Innovations

A major theme of this work is the importance of feature crossing for improving recommendation quality. Feature crossing allows the model to learn interactions between different features, providing richer context than individual features alone. Pinterest implemented several sophisticated feature crossing techniques:

### MaskNet Integration

Pinterest's first major improvement was upgrading their model with MaskNet for bitwise feature crossing. Their implementation diverges from the original MaskNet paper: after embedding layer normalization and concatenation, their MaskNet block performs a Hadamard product of the input embedding with a projection of itself via a two-layer MLP, followed by another two-layer MLP to refine the representation. They parallelize four such blocks with a bottleneck-style MLP. This architecture simplifies the model while providing extensive feature crossing capability within each tower. The result was a 0.15-0.35% improvement in engaged sessions (defined as continuous interaction sessions longer than 60 seconds) across Pinterest.

### DHEN Framework Scaling

Building on the MaskNet success, Pinterest further scaled their architecture using the DHEN (Deep and Hierarchical Ensemble Network) framework, which ensembles multiple different feature crossing layers in both serial and parallel configurations. Their implementation juxtaposes an MLP layer with the parallel mask net and appends another layer combining an MLP with a transformer encoder. The transformer layer enhances field-wise interaction through attention applied at the field level, complementing the bit-level dot-product based feature crossing in MaskNet. This additional scaling brought another 0.1-0.2% improvement in engaged sessions, along with greater than 1% improvement in homefeed saves and clicks.

## Pre-trained ID Embeddings

ID embeddings are a powerful technique for memorizing user engagement patterns in recommendation systems, but they are prone to overfitting. Pinterest addressed this by pre-training large-scale user and Pin ID embeddings using contrastive learning on sampled negatives over a cross-surface large window dataset without positive engagement downsampling. This approach provides good ID coverage and rich semantics tailored for Pinterest's recommendation tasks.

The team uses the torchrec library (PyTorch's recommendation systems library) to implement and share the large Pin ID table across GPUs during training. For serving, they deploy CPU model artifacts due to the relatively loose latency requirements for offline inference.

Interestingly, directly fine-tuning the pre-trained embeddings did not perform well online due to severe overfitting. Pinterest mitigated this through several techniques: first, they fixed the embedding table and applied aggressive dropout with a probability of 0.5 on top of the ID embeddings, which led to 0.6-1.2% increases in homefeed repins and clicks. They also discovered that using the latest pre-trained ID embedding was not optimal if there was overlap between the co-training window and the model training window. By choosing the latest ID embedding without overlap, they achieved an additional 0.25-0.35% increase in homefeed repins.

## Serving Corpus Optimization

Beyond model improvements, Pinterest also renovated their serving corpus, which defines the upper limit of retrieval performance. Their initial corpus setup individualized Pins based on their canonical image signature and included Pins with the most accumulated engagements over 90 days.

To better capture trending content on Pinterest, they switched from direct summation of engagements to a time-decayed summation. They also identified and fixed a discrepancy in image signature granularity between training data and serving corpus. The serving corpus operates on a coarser granularity to deduplicate similar content and reduce indexing size, but this caused statistical feature drift. By implementing dedicated image signature remapping logic combined with time decay heuristics, they achieved 0.1-0.2% improvement in engaged sessions without any modeling changes.

## Multi-Embedding Retrieval

Recognizing that Homefeed users often enter with diverse intents that cannot be adequately represented by a single embedding, Pinterest developed a multi-embedding retrieval approach. After extensive experimentation, they found that a differentiable clustering module modified from Capsule Networks outperformed alternatives like multi-head attention and pre-clustering based methods.

Their implementation uses maxmin initialization to speed up clustering convergence and enforces single-assignment routing where each history item can only contribute to one cluster's embedding, enhancing diversification. Each cluster embedding is combined with other user features to generate multiple embeddings per user.

At serving time, they keep only the first K embeddings (determined by user history length) and run Approximate Nearest Neighbor (ANN) search. The maxmin initialization ensures that the first K embeddings are generally the most representative. Results are combined in a round-robin fashion before passing to ranking and blending layers. This technique improves system diversity and increases user save actions.

## Conditional Retrieval

Pinterest's interest feed candidate generator provides diversity through token-based search according to users' followed and inferred interests. However, these candidates tend to have lower engagement rates due to lack of fine-grained personalization. Pinterest utilized conditional retrieval, a two-tower model with conditional input, to boost personalization.

During training, they feed the target Pin's interest ID as a condition input to the user tower. During serving, they feed users' followed and inferred interests as the conditional input. The model follows an early-fusion paradigm where the conditional interest input is fed at the same layer as other features. The model can condition its output to produce highly relevant results even for long-tail interests. They further equipped ANN search with interest filters to guarantee high relevance between query interests and retrieved candidates.

## Production Considerations and Lessons Learned

Several important production ML lessons emerge from this case study. First, the separation of concerns in the two-tower architecture enables independent scaling of model complexity without impacting serving latency. Second, the importance of alignment between training and serving environments is highlighted by the image signature granularity mismatch issue. Third, careful temporal considerations are crucial when using pre-trained embeddings to avoid overfitting from overlapping training windows. Finally, aggressive regularization techniques like dropout can be essential when incorporating powerful but potentially overfitting components like ID embeddings.

The work represents a comprehensive approach to improving embedding-based retrieval through multiple complementary techniques: model architecture improvements (MaskNet, DHEN, transformers), training methodology improvements (pre-trained ID embeddings with contrastive learning), serving infrastructure improvements (corpus updates, image signature alignment), and novel retrieval paradigms (multi-embedding, conditional retrieval). Each improvement was validated through online experiments measuring engaged sessions, repins, and clicks, demonstrating Pinterest's commitment to rigorous A/B testing in production.

This case study is particularly notable for its focus on the full ML pipeline from training to serving, with careful attention to issues like overfitting, train-serve skew, and the trade-offs between model complexity and serving constraints. The use of established libraries like torchrec and references to recent academic work (published in RecSys 2024) shows a commitment to both leveraging existing tools and contributing back to the research community.