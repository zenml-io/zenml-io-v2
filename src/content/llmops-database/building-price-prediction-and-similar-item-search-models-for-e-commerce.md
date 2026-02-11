---
title: "Building Price Prediction and Similar Item Search Models for E-commerce"
slug: "building-price-prediction-and-similar-item-search-models-for-e-commerce"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3baaa6afe867c6811558"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:38:31.857Z"
  createdOn: "2024-11-21T13:54:50.511Z"
llmopsTags:
  - "data-analysis"
  - "databases"
  - "embeddings"
  - "knowledge-distillation"
  - "microsoft-azure"
  - "model-optimization"
  - "pytorch"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "structured-output"
industryTags: "e-commerce"
company: "eBay"
summary: "eBay developed a hybrid system for pricing recommendations and similar item search in their marketplace, specifically focusing on sports trading cards. They combined semantic similarity models with direct price prediction approaches, using transformer-based architectures to create embeddings that balance both price accuracy and item similarity. The system helps sellers price their items accurately by finding similar items that have sold recently, while maintaining semantic relevance."
link: "https://www.youtube.com/watch?v=4eq3EKI4vtc"
year: 2024
seo:
  title: "eBay: Building Price Prediction and Similar Item Search Models for E-commerce - ZenML LLMOps Database"
  description: "eBay developed a hybrid system for pricing recommendations and similar item search in their marketplace, specifically focusing on sports trading cards. They combined semantic similarity models with direct price prediction approaches, using transformer-based architectures to create embeddings that balance both price accuracy and item similarity. The system helps sellers price their items accurately by finding similar items that have sold recently, while maintaining semantic relevance."
  canonical: "https://www.zenml.io/llmops-database/building-price-prediction-and-similar-item-search-models-for-e-commerce"
  ogTitle: "eBay: Building Price Prediction and Similar Item Search Models for E-commerce - ZenML LLMOps Database"
  ogDescription: "eBay developed a hybrid system for pricing recommendations and similar item search in their marketplace, specifically focusing on sports trading cards. They combined semantic similarity models with direct price prediction approaches, using transformer-based architectures to create embeddings that balance both price accuracy and item similarity. The system helps sellers price their items accurately by finding similar items that have sold recently, while maintaining semantic relevance."
---

## Overview

This case study comes from eBay's Israel research team, presented by a researcher who previously worked at Nice (a tech company) about six years prior. The presentation focuses on eBay's approach to product pricing assistance, specifically helping sellers determine appropriate prices for their items using machine learning and embedding-based retrieval systems. eBay operates at massive scale with approximately 2 billion listings, over 130 million active buyers, and 190 different marketplace sites worldwide. The Israeli research teams focus heavily on production-ready solutions working alongside product teams, while also maintaining capacity for more experimental research.

## The Problem

When sellers want to list items on eBay, they encounter a listing creation form where they must specify various details including title, item specifics, and crucially, a price. Pricing is particularly challenging for several reasons:

- Sellers often list second-hand items (e.g., items that have been sitting in a closet for years)
- Even new products may have unclear market values
- The domain is filled with specialized terminology, abbreviations, and slang that make text search ineffective

The presentation specifically uses sports trading cards as the primary example, which represents a massive market in the United States. Sports card pricing is extremely nuanced - factors like autographs, rarity (e.g., only one copy printed), condition, grading, and specific player/year combinations can dramatically affect value. Traditional keyword search fails because collectors use abbreviated terms, slang, and domain-specific terminology that don't match well with standard text retrieval.

## Technical Approach: Embedding-Based Retrieval

Rather than using generative LLMs, eBay's solution relies on dense vector embeddings and retrieval systems. The core pipeline works as follows:

The system takes a product title, passes it through an embedding model to generate a dense vector representation, stores all historically-sold items as vectors in a vector database, and when a seller creates a new listing, performs a k-nearest neighbors (KNN) search to find similar previously-sold products. These similar items are then shown to sellers as pricing guidance, either as a specific recommended price or as examples of comparable sales.

The key advantage of dense embeddings over traditional text search is handling domain-specific variations. For example, in sports cards, "RC" means "Rookie Card" - a semantic embedding model can learn these equivalences while keyword search fails. Similarly, "signed" and "auto" (for autograph) represent the same concept.

## Training the Embedding Model

The team uses BERT-based transformer models (specifically encoder-only architectures) for generating embeddings. A critical insight from their experience is that off-the-shelf embedding models trained on general text perform significantly worse than domain-specific models trained on eBay's data. When you have the GPU resources and sufficient training data, custom training yields substantially better results.

### Generating Training Data

The training approach uses contrastive learning with pairs of similar items. To generate positive pairs (items that should have similar embeddings), the team leverages user behavior data:

- They analyze user search sessions on eBay
- They look for queries with at least 6 words (indicating specific intent)
- When users click on multiple items from the same search, those items are treated as similar
- Additional validation rules ensure similarity: similar prices, matching structured data (e.g., same player name)

### Negative Sampling Strategy

For negative examples (items that should have dissimilar embeddings), they use in-batch negatives - a common technique where other items in the training batch serve as negatives. With batch sizes of 64, each positive pair gets 63 implicit negative examples "for free." This approach is computationally efficient and generally effective since random items are unlikely to be similar.

However, the team found that "soft negatives" (random negatives) aren't sufficient for learning fine-grained distinctions. They implemented hard negative mining: finding items that appear similar but have different prices. For example, cards featuring the same player from the same team but with different grades or conditions. This forces the model to learn the nuanced attributes that actually affect pricing.

## The Semantic Similarity vs. Pricing Accuracy Trade-off

A central finding of this work is a fundamental tension between semantic similarity and pricing accuracy. The team experimented with two distinct approaches:

**Approach 1: Semantic Similarity (Siamese Networks)**
Training the model purely on semantic similarity using contrastive learning. This produces embeddings where semantically similar items cluster together. However, when evaluated, they found cases where very similar items had vastly different prices because the model missed pricing-relevant nuances. For example, "lot of 12" boxes versus "lot of 3" boxes - semantically similar, but 4x different quantity significantly affects price.

**Approach 2: Title-to-Price Prediction**
Training a transformer model to directly predict the sale price from the title text, then extracting embeddings from the CLS token of the final layer. This produces embeddings that cluster items by price regardless of semantic content. While this improved pricing accuracy (Mean Absolute Error of $29 vs $38 for semantic similarity), it created a trust problem: the model might recommend pricing a LeBron James card based on a Stephen Curry card simply because they happened to sell at similar prices - visually and semantically completely different items that would confuse sellers.

### Quantitative Evaluation

The team conducted rigorous evaluation on thousands of test samples:
- Title-to-Price approach: MAE of $29
- Semantic Similarity approach: MAE of $38
- However, semantic similarity had far fewer errors in identifying the correct player, maintaining user trust

## Multi-Task Learning Solution

To address this trade-off, the team developed a multi-task learning architecture that trains on both objectives simultaneously:

- Shared weights across the network
- Alternating between semantic similarity and price prediction during training
- A hyperparameter (alpha) controls the relative emphasis on each objective
- This allows choosing a model position along the trade-off curve based on business requirements

The experiments showed a clear continuum: as alpha shifts toward price prediction, MAE decreases but semantic matching errors (wrong player identification) increase. Conversely, emphasizing semantic similarity improves matching accuracy but hurts price predictions.

## Production Considerations and Business Impact

The system is designed for production deployment with several practical considerations:

- The embedding model must efficiently encode millions of historical listings
- KNN search requires efficient vector database infrastructure
- The multi-task learning approach allows business stakeholders to choose the appropriate trade-off point based on user trust requirements

eBay's goal is explicitly not manipulation or profit optimization for the platform - they emphasize the system purely provides data-driven guidance to help sellers make informed pricing decisions based on comparable historical sales.

## Key Takeaways

The presentation offers several actionable insights for practitioners building similar retrieval systems:

- Off-the-shelf embedding models often underperform compared to domain-trained models when you have sufficient data and compute resources
- User behavior data (searches and clicks) provides valuable signal for generating training pairs
- Hard negative mining significantly improves model sensitivity to pricing-relevant features
- There's often an inherent trade-off between semantic retrieval quality and downstream task performance (pricing accuracy)
- Multi-task learning provides a principled way to navigate this trade-off and select a model appropriate for specific business needs
- Trust and explainability matter: showing users semantically similar items, even if slightly less accurate for pricing, may be preferable to showing irrelevant items that happen to have similar prices

This case study demonstrates sophisticated application of embedding-based retrieval in a production e-commerce context, highlighting the practical engineering and modeling decisions required to balance multiple competing objectives.