---
title: "Building a Food Delivery Product Knowledge Graph with LLMs"
slug: "building-a-food-delivery-product-knowledge-graph-with-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67d7faeb87bed21c0e1288a5"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:38:46.688Z"
  createdOn: "2025-03-17T10:35:23.818Z"
llmopsTags:
  - "data-integration"
  - "structured-output"
  - "data-analysis"
  - "semantic-search"
  - "embeddings"
  - "prompt-engineering"
  - "databases"
  - "openai"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash leveraged LLMs to transform their retail catalog management by implementing three key systems: an automated brand extraction pipeline that identifies and deduplicates new brands at scale; an organic product labeling system combining string matching with LLM reasoning to improve personalization; and a generalized attribute extraction process using LLMs with RAG to accelerate annotation for entity resolution across merchants. These innovations significantly improved product discoverability and personalization while reducing the manual effort that previously caused long turnaround times and high costs."
link: "https://doordash.engineering/2024/04/23/building-doordashs-product-knowledge-graph-with-large-language-models/"
seo:
  title: "Doordash: Building a Food Delivery Product Knowledge Graph with LLMs - ZenML LLMOps Database"
  description: "DoorDash leveraged LLMs to transform their retail catalog management by implementing three key systems: an automated brand extraction pipeline that identifies and deduplicates new brands at scale; an organic product labeling system combining string matching with LLM reasoning to improve personalization; and a generalized attribute extraction process using LLMs with RAG to accelerate annotation for entity resolution across merchants. These innovations significantly improved product discoverability and personalization while reducing the manual effort that previously caused long turnaround times and high costs."
  canonical: "https://www.zenml.io/llmops-database/building-a-food-delivery-product-knowledge-graph-with-llms"
  ogTitle: "Doordash: Building a Food Delivery Product Knowledge Graph with LLMs - ZenML LLMOps Database"
  ogDescription: "DoorDash leveraged LLMs to transform their retail catalog management by implementing three key systems: an automated brand extraction pipeline that identifies and deduplicates new brands at scale; an organic product labeling system combining string matching with LLM reasoning to improve personalization; and a generalized attribute extraction process using LLMs with RAG to accelerate annotation for entity resolution across merchants. These innovations significantly improved product discoverability and personalization while reducing the manual effort that previously caused long turnaround times and high costs."
---

## Overview

Doordash, one of the largest food delivery and local commerce platforms in the United States, has undertaken an initiative to build a product knowledge graph using large language models. This case study represents an interesting intersection of knowledge graph technology and modern LLM capabilities applied to the complex domain of food and restaurant product catalogs.

The fundamental challenge Doordash faces is managing an enormous and highly heterogeneous product catalog. Unlike traditional e-commerce platforms that deal with standardized products (such as electronics or books with consistent naming conventions), Doordash must handle millions of menu items from hundreds of thousands of restaurants and merchants. Each restaurant describes their products differently, uses varying terminology, and may have inconsistent formatting. A "cheeseburger" at one restaurant might be listed as "Classic Cheeseburger," "Cheese Burger Deluxe," or "1/4 lb Beef Burger with Cheese" at others. This heterogeneity creates significant challenges for search, recommendations, and overall product understanding.

## The Knowledge Graph Approach

Knowledge graphs provide a structured way to represent entities and their relationships. For Doordash, a product knowledge graph would enable them to understand that various menu items are fundamentally the same dish, what ingredients they contain, what cuisines they belong to, dietary restrictions they may satisfy (vegetarian, gluten-free, halal, etc.), and how products relate to one another. This structured understanding is essential for powering features like search (understanding user intent and matching it to relevant products), recommendations (suggesting similar items or complementary dishes), and personalization (learning user preferences at a semantic level rather than just item level).

## LLM Integration for Knowledge Graph Construction

The application of large language models to knowledge graph construction represents a significant evolution from traditional approaches. Historically, building knowledge graphs required extensive manual curation, rule-based systems, or traditional NLP techniques that often struggled with the nuances and variability of natural language product descriptions. LLMs bring several key capabilities to this task.

First, LLMs excel at entity extraction and normalization. They can read unstructured menu item descriptions and extract structured information such as the base dish type, ingredients, preparation methods, portion sizes, and other attributes. The contextual understanding of LLMs allows them to handle the wide variety of ways merchants describe similar products.

Second, LLMs can perform relationship inference. They can understand that a "Caesar Salad with Grilled Chicken" is related to both "Caesar Salad" and "Grilled Chicken" dishes, enabling rich graph connections. This semantic understanding goes beyond simple keyword matching.

Third, LLMs provide classification capabilities. They can categorize products into cuisines, dish types, dietary categories, and other taxonomies with high accuracy, even when dealing with ambiguous or incomplete product descriptions.

## Production Considerations and LLMOps Challenges

Deploying LLMs for knowledge graph construction at Doordash's scale presents numerous operational challenges that fall squarely in the LLMOps domain. The scale of the product catalog means that any LLM-based processing must be highly efficient and cost-effective. Processing millions of menu items through LLM inference represents significant computational cost, requiring careful optimization of prompts, batching strategies, and potentially the use of smaller, fine-tuned models for high-volume tasks.

Quality assurance and evaluation present another significant challenge. Knowledge graphs require high accuracy to be useful, and LLMs can produce hallucinations or errors. Doordash would need robust evaluation frameworks to measure the accuracy of extracted entities, relationships, and classifications. This likely involves a combination of automated metrics and human evaluation, with ongoing monitoring of quality in production.

The dynamic nature of restaurant menus adds complexity to the LLMOps pipeline. Menus change frequently, with new items added, prices updated, and seasonal offerings rotated. The knowledge graph construction system must handle incremental updates efficiently, determining when existing entities need to be updated versus when new entities should be created.

Latency requirements also factor into the system design. While initial knowledge graph construction might be done in batch, there are likely use cases where near-real-time processing is needed, such as when a new merchant onboards the platform or significantly updates their menu. This requires a tiered approach to LLM inference with different latency and cost tradeoffs.

## Integration with Downstream Systems

The product knowledge graph serves as a foundational data asset that powers multiple downstream applications. Search systems can leverage the graph to understand query intent and match it to relevant products based on semantic similarity rather than just keyword matching. Recommendation engines can use graph relationships to suggest similar dishes or complementary items. Personalization systems can build user preference models at the concept level (e.g., "user prefers spicy food" rather than just "user ordered these specific items").

This integration requires careful API design and data access patterns. The knowledge graph needs to be queryable with low latency for real-time applications while also supporting batch access for model training and analytics.

## Monitoring and Continuous Improvement

Operating an LLM-powered knowledge graph in production requires comprehensive monitoring. This includes tracking LLM inference latency and throughput, monitoring extraction accuracy over time, detecting drift in product catalog characteristics that might require prompt adjustments or model updates, and measuring downstream impact on search and recommendation quality.

The system likely includes feedback loops where user behavior (clicks, orders, searches) provides implicit signals about knowledge graph quality. If users consistently search for terms that aren't well-represented in the graph, or if recommendations based on graph relationships underperform, these signals can drive improvements.

## Broader Implications

This case study illustrates how LLMs are being applied not just for generating text or powering chatbots, but for structured data extraction and knowledge representation at scale. The combination of LLMs and knowledge graphs represents a powerful pattern where LLMs handle the unstructured-to-structured transformation while graphs provide the organizational framework for reasoning and retrieval.

It should be noted that the available information on this case study is limited, and specific details about the implementation, model choices, accuracy metrics, and business impact are not fully documented in the source text. The analysis above represents a reasonable inference of the approaches and challenges based on the stated goal of building a product knowledge graph with LLMs, combined with general knowledge of such systems and Doordash's business domain. Organizations considering similar approaches should conduct their own evaluation of the techniques and tools appropriate for their specific use case.