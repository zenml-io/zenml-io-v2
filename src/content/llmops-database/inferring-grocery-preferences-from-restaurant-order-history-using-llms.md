---
title: "Inferring Grocery Preferences from Restaurant Order History Using LLMs"
slug: "inferring-grocery-preferences-from-restaurant-order-history-using-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68e379bb90174fa0f9a5c81e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:21:57.966Z"
  createdOn: "2025-10-06T08:11:39.082Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "data-analysis"
  - "prompt-engineering"
  - "semantic-search"
  - "evals"
  - "monitoring"
  - "scalability"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash faced the classic cold start problem when trying to recommend grocery and convenience items to customers who had never shopped in those verticals before. To address this, they developed an LLM-based solution that analyzes customers' restaurant order histories to infer underlying preferences about culinary tastes, lifestyle habits, and dietary patterns. The system translates these implicit signals into explicit, personalized grocery recommendations, successfully surfacing relevant items like hot pot soup base, potstickers, and burritos based on restaurant ordering behavior. The approach combines statistical analysis with LLM inference capabilities to leverage the models' semantic understanding and world knowledge, creating a scalable, evaluation-driven pipeline that delivers relevant recommendations from the first interaction."
link: "https://careersatdoordash.com/blog/doordash-llms-for-grocery-preferences-from-restaurant-orders/"
year: 2025
seo:
  title: "Doordash: Inferring Grocery Preferences from Restaurant Order History Using LLMs - ZenML LLMOps Database"
  description: "DoorDash faced the classic cold start problem when trying to recommend grocery and convenience items to customers who had never shopped in those verticals before. To address this, they developed an LLM-based solution that analyzes customers' restaurant order histories to infer underlying preferences about culinary tastes, lifestyle habits, and dietary patterns. The system translates these implicit signals into explicit, personalized grocery recommendations, successfully surfacing relevant items like hot pot soup base, potstickers, and burritos based on restaurant ordering behavior. The approach combines statistical analysis with LLM inference capabilities to leverage the models' semantic understanding and world knowledge, creating a scalable, evaluation-driven pipeline that delivers relevant recommendations from the first interaction."
  canonical: "https://www.zenml.io/llmops-database/inferring-grocery-preferences-from-restaurant-order-history-using-llms"
  ogTitle: "Doordash: Inferring Grocery Preferences from Restaurant Order History Using LLMs - ZenML LLMOps Database"
  ogDescription: "DoorDash faced the classic cold start problem when trying to recommend grocery and convenience items to customers who had never shopped in those verticals before. To address this, they developed an LLM-based solution that analyzes customers' restaurant order histories to infer underlying preferences about culinary tastes, lifestyle habits, and dietary patterns. The system translates these implicit signals into explicit, personalized grocery recommendations, successfully surfacing relevant items like hot pot soup base, potstickers, and burritos based on restaurant ordering behavior. The approach combines statistical analysis with LLM inference capabilities to leverage the models' semantic understanding and world knowledge, creating a scalable, evaluation-driven pipeline that delivers relevant recommendations from the first interaction."
---

## Overview

DoorDash developed an innovative LLM-based recommendation system to solve a challenging cold start problem in their grocery and convenience delivery vertical. The company operates across multiple merchant categories including restaurants, grocery stores, pet stores, and convenience shops. When customers who regularly order from restaurants attempt to shop for groceries for the first time on the platform, traditional recommendation systems struggle because they lack historical shopping data in that vertical. This case study demonstrates how DoorDash leveraged large language models in production to perform cross-domain inference, translating restaurant ordering patterns into grocery preferences.

The fundamental insight driving this approach is that restaurant order histories contain rich implicit signals about consumer preferences. What someone orders from restaurants reveals information about their culinary tastes, dietary restrictions, lifestyle choices, and consumption habits. However, extracting these implicit preferences and mapping them to relevant grocery items requires sophisticated semantic understanding and world knowledge—capabilities that traditional machine learning models struggle with but that modern LLMs excel at providing.

## The Cold Start Challenge

The cold start problem is one of the most persistent challenges in recommendation systems. When a user enters a new domain or category where they have no prior interaction history, standard collaborative filtering and content-based approaches have minimal data to work with. For DoorDash, this meant that customers with extensive restaurant ordering histories would receive generic, non-personalized grocery recommendations when they first browsed the grocery vertical.

This represents both a business challenge and a customer experience issue. Poor initial recommendations can lead to lower conversion rates, reduced customer satisfaction, and missed opportunities to establish shopping habits in new verticals. The challenge is particularly acute for a multi-vertical marketplace like DoorDash, where the company wants to encourage customers to use the platform for more categories beyond their initial use case.

Traditional approaches to cold start problems include using demographic information, applying popularity-based recommendations, or attempting to find similar users based on limited signals. However, these approaches fail to leverage the rich behavioral data that already exists in the restaurant vertical. DoorDash recognized that a customer who frequently orders sushi, ramen, and Korean BBQ likely has specific grocery preferences that differ from someone who primarily orders pizza and burgers—but extracting and operationalizing those insights requires understanding semantic relationships between restaurant dishes and grocery products.

## LLM-Based Solution Architecture

DoorDash's solution centers on using large language models to perform semantic inference across domains. The system takes restaurant order history as input and produces grocery and convenience item recommendations as output. This involves several key capabilities that LLMs bring to the table:

**Semantic Understanding**: LLMs can understand the meaning and context of restaurant dishes beyond simple keyword matching. For instance, if a customer frequently orders pho, pad thai, and dumplings, the model understands these are Asian cuisine items and can infer interest in related grocery products like rice noodles, fish sauce, soy sauce, and wonton wrappers.

**World Knowledge**: Pre-trained LLMs contain extensive knowledge about food, cooking, ingredients, and culinary traditions. This allows them to make connections that would require significant feature engineering in traditional ML systems. The models understand that someone who orders hot pot would likely be interested in hot pot soup base, that burrito enthusiasts might want tortillas and salsa, and that potsticker fans would appreciate dumpling wrappers and dipping sauces.

**Pattern Recognition**: By analyzing patterns across multiple restaurant orders, LLMs can identify consistent preferences, dietary restrictions, and lifestyle indicators. Someone who consistently orders vegetarian or vegan restaurant items will receive appropriate grocery recommendations. A customer with a pattern of ordering spicy foods will see recommendations that align with that preference.

The system combines statistical analysis with LLM inference. The statistical component likely handles aggregation of order histories, frequency analysis, and identification of significant patterns, while the LLM component interprets the semantic meaning of those patterns and generates relevant grocery recommendations. This hybrid approach balances the structured, quantitative insights from traditional analytics with the flexible, semantic reasoning capabilities of LLMs.

## Production Implementation Considerations

Deploying this system in production at DoorDash's scale presents several LLMOps challenges. The blog post mentions developing a "scalable, evaluation-driven pipeline," which suggests careful attention to operational concerns beyond just model performance.

**Scalability**: DoorDash serves millions of customers, each with potentially extensive restaurant order histories. Processing these histories through LLMs to generate recommendations requires efficient inference infrastructure. The system likely employs techniques such as batching requests, caching intermediate results, and potentially using smaller, more efficient models or distilled versions of larger models to handle the computational load. The challenge is particularly acute because recommendations need to be generated relatively quickly to provide a responsive user experience.

**Evaluation Framework**: The emphasis on being "evaluation-driven" indicates that DoorDash implemented robust metrics and testing procedures to validate the LLM outputs. Evaluating recommendation quality is inherently subjective, especially for cold start scenarios where ground truth is limited. The team likely developed both offline and online evaluation strategies, potentially including human evaluation of recommendation relevance, A/B testing with real customers, and proxy metrics like click-through rates and conversion rates for recommended items.

**Consistency and Reliability**: LLMs can produce variable outputs given the same input, which presents challenges for production recommendation systems where users expect consistent experiences. DoorDash likely implemented strategies to ensure stable recommendations, possibly through temperature tuning, deterministic sampling, or post-processing filters that ensure recommendations meet quality thresholds.

**Latency Requirements**: E-commerce applications typically have strict latency requirements. Generating personalized recommendations needs to happen quickly enough to not impact page load times or user experience. This may have influenced choices around model size, inference optimization, and potentially pre-computing recommendations for certain user segments or caching strategies.

## Cross-Domain Transfer Learning

One of the most sophisticated aspects of this use case is the cross-domain transfer problem. The system must understand not just individual restaurant items but how preferences in one domain (restaurants) map to products in another domain (groceries). This is more complex than standard recommendation tasks because the item spaces are fundamentally different.

A restaurant order for "chicken tikka masala" needs to be translated into grocery recommendations that might include basmati rice, garam masala, coconut milk, chicken breast, and naan bread. This requires the model to understand not just that the customer likes Indian food, but also to decompose dishes into ingredients and cooking components, then map those to available grocery products. The LLM's training on diverse text data about food, recipes, and cooking provides the knowledge base for making these connections.

The challenge is compounded by varying levels of cooking engagement. Some customers might want ready-to-eat or easy-to-prepare versions of their favorite restaurant items, while others might want raw ingredients for home cooking. The system needs to infer this from behavior patterns or potentially use signals like the types of items ordered from restaurants (more takeout vs. more ingredient-focused orders from specialty grocers if that data exists).

## Personalization at Scale

The case study provides a concrete example where the system recommended "hot pot soup base, potstickers, and burritos" based on the author's restaurant history—items they personally love and frequently purchase. This demonstrates successful personalization that goes beyond generic category matching. The system didn't just identify "Asian food" as a preference but specifically surfaced hot pot supplies and potstickers, indicating understanding of specific cuisine subtypes. Including burritos shows the model handles multiple preference categories simultaneously.

This level of personalization requires the LLM to process and synthesize information across potentially dozens or hundreds of restaurant orders, identify meaningful patterns while filtering out noise (occasional orders that don't represent core preferences), and generate recommendations that are both diverse enough to be interesting and focused enough to be relevant.

From an LLMOps perspective, maintaining this quality across millions of users with widely varying order histories represents a significant operational challenge. The system needs to handle edge cases like users with very limited order history, users with extremely diverse preferences, users with specific dietary restrictions, and users whose preferences change over time.

## Balancing Claims with Reality

While the case study presents an compelling use case, it's important to consider what information is not provided in this blog post excerpt. The text doesn't specify:

- Which LLM or models were used (proprietary vs. open source, model size, training approach)
- Specific performance metrics or quantitative results beyond the anecdotal example
- The actual improvement over baseline recommendation approaches
- Details about the evaluation methodology
- Information about failure modes or limitations of the approach
- Cost considerations for running LLM inference at scale
- How the system handles updates or maintains freshness as new products become available

The provided example of successful recommendations is anecdotal—while convincing, it represents a single case rather than systematic evaluation results. In production LLM applications, it's common to see cherry-picked examples that may not represent average performance. A more complete assessment would require information about precision and recall across diverse user segments, comparison with alternative approaches, and understanding of when the system performs well versus when it struggles.

Additionally, there are questions about potential biases in LLM-based recommendations. LLMs trained on internet data may have biases related to cuisine types, dietary patterns, or food cultures that could influence recommendations in ways that aren't always desirable. DoorDash would need to monitor for these issues and potentially implement safeguards.

## Broader LLMOps Implications

This case study illustrates several important principles for production LLM applications:

**Leveraging Pre-trained Knowledge**: Rather than trying to train a model from scratch to understand food relationships, DoorDash leveraged the world knowledge already embedded in pre-trained LLMs. This is a efficient approach that takes advantage of the expensive pre-training investments made by model developers.

**Hybrid Architectures**: The combination of statistical analysis and LLM inference represents a pragmatic approach that uses each technology for its strengths. Statistical methods handle structured data processing and pattern identification efficiently, while LLMs provide semantic reasoning and flexible inference.

**Evaluation-First Mindset**: The emphasis on building an "evaluation-driven pipeline" reflects mature LLMOps practices. Rather than deploying an LLM and hoping for good results, the team built evaluation infrastructure to systematically measure and improve performance.

**Practical Problem-Solving**: The use case addresses a real business problem (cold start) with measurable impact (enabling grocery recommendations for new shoppers). This practical focus is characteristic of successful production LLM applications as opposed to technology-first approaches that look for problems to solve.

**Cross-Domain Applications**: The ability to transfer knowledge across domains (restaurants to groceries) showcases one of LLMs' unique capabilities compared to traditional ML approaches, which typically require retraining for new domains.

The case study represents an innovative application of LLMs to a classical recommendation systems challenge, demonstrating how modern language models can be integrated into production systems to provide business value. However, the limited technical detail in this blog post excerpt means we can only speculate about many important implementation details and must be cautious about accepting all claims without more rigorous evidence.