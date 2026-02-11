---
title: "User Foundation Models for Personalization at Scale"
slug: "user-foundation-models-for-personalization-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adca3141dbafaa53c631f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:46.932Z"
  createdOn: "2025-12-23T18:17:07.209Z"
llmopsTags:
  - "fraud-detection"
  - "content-moderation"
  - "classification"
  - "chatbot"
  - "high-stakes-application"
  - "structured-output"
  - "multi-modality"
  - "embeddings"
  - "fine-tuning"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "instruction-tuning"
  - "multi-agent-systems"
  - "cost-optimization"
  - "chunking"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "scaling"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "pytorch"
  - "tensorflow"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
industryTags: "tech"
company: "Grab"
summary: "Grab developed a custom foundation model to generate user embeddings that power personalization across its Southeast Asian superapp ecosystem. Traditional approaches relied on hundreds of manually engineered features that were task-specific and siloed, struggling to capture sequential user behavior effectively. Grab's solution involved building a transformer-based foundation model that jointly learns from both tabular data (user attributes, transaction history) and time-series clickstream data (user interactions and sequences). This model processes diverse data modalities including text, numerical values, IDs, and location data through specialized adapters, using unsupervised pre-training with masked language modeling and next-action prediction. The resulting embeddings serve as powerful, generalizable features for downstream applications including ad optimization, fraud detection, churn prediction, and recommendations across mobility, food delivery, and financial services, significantly improving personalization while reducing feature engineering effort."
link: "https://engineering.grab.com/user-foundation-models-for-grab"
year: 2025
seo:
  title: "Grab: User Foundation Models for Personalization at Scale - ZenML LLMOps Database"
  description: "Grab developed a custom foundation model to generate user embeddings that power personalization across its Southeast Asian superapp ecosystem. Traditional approaches relied on hundreds of manually engineered features that were task-specific and siloed, struggling to capture sequential user behavior effectively. Grab's solution involved building a transformer-based foundation model that jointly learns from both tabular data (user attributes, transaction history) and time-series clickstream data (user interactions and sequences). This model processes diverse data modalities including text, numerical values, IDs, and location data through specialized adapters, using unsupervised pre-training with masked language modeling and next-action prediction. The resulting embeddings serve as powerful, generalizable features for downstream applications including ad optimization, fraud detection, churn prediction, and recommendations across mobility, food delivery, and financial services, significantly improving personalization while reducing feature engineering effort."
  canonical: "https://www.zenml.io/llmops-database/user-foundation-models-for-personalization-at-scale"
  ogTitle: "Grab: User Foundation Models for Personalization at Scale - ZenML LLMOps Database"
  ogDescription: "Grab developed a custom foundation model to generate user embeddings that power personalization across its Southeast Asian superapp ecosystem. Traditional approaches relied on hundreds of manually engineered features that were task-specific and siloed, struggling to capture sequential user behavior effectively. Grab's solution involved building a transformer-based foundation model that jointly learns from both tabular data (user attributes, transaction history) and time-series clickstream data (user interactions and sequences). This model processes diverse data modalities including text, numerical values, IDs, and location data through specialized adapters, using unsupervised pre-training with masked language modeling and next-action prediction. The resulting embeddings serve as powerful, generalizable features for downstream applications including ad optimization, fraud detection, churn prediction, and recommendations across mobility, food delivery, and financial services, significantly improving personalization while reducing feature engineering effort."
---

## Overview

Grab, the Southeast Asian superapp operating across mobility, food delivery, and financial services in over 800 cities, embarked on building a custom user foundation model to power personalization at scale. The company recognized that traditional approaches to personalization—which relied on hundreds to thousands of manually engineered features specific to individual tasks—were insufficient for capturing the complexity of user behavior across their diverse ecosystem. These legacy features were siloed within teams, required substantial manual effort, and struggled to effectively model time-series patterns such as sequences of user interactions.

The foundation model project represents a significant shift from task-specific model development toward building a unified intelligence layer that understands the entire Grab ecosystem. By simultaneously learning from user interactions (clickstream data) and tabular data (transaction records, user attributes), the model generates embeddings that serve as high-quality input features for numerous downstream recommender models and prediction tasks. This approach enables superior personalization across advertising, dual app prediction, fraud detection, churn probability estimation, and various recommendation scenarios.

## The Business Context and Data Challenges

Grab operates as a "superapp," which fundamentally distinguishes its data landscape from more focused platforms. Unlike a video recommendation service that primarily deals with watch history and video content, or social media platforms centered around posts and images, Grab generates an extraordinarily diverse data trail as users transition between ordering food, booking rides, utilizing courier services, accessing financial products, and more. This diversity manifests across multiple dimensions:

The platform must understand not just users but also merchant-partners and driver-partners, each with their own distinctive data signatures. The data encompasses multiple modalities including text (search queries like "chicken rice" or "fresh milk," restaurant reviews), numerical values (order prices, ride fares, delivery distances, waiting times, usage frequency), categorical IDs (user_id, merchant_id, driver_id representing entities in vocabularies of hundreds of millions), and location data (pickup/dropoff coordinates, geohashes representing malls versus residential areas, delivery addresses).

A critical insight driving the architecture is that these modalities interact in complex ways that reveal user context and intent. For example, a user might book a ride to a shopping mall (involving user_id, driver_id, and location data), then two hours later from that same location search for "Japanese food" (text data) before browsing restaurant profiles (merchant_ids) and placing an order with a specific price (numerical data). Traditional siloed models would treat the ride and food search as independent events, missing the valuable signal that the dropoff location provides context for subsequent search behavior.

The foundation model exists in two essential data forms: tabular data that captures long-term user profiles and attributes (age, saved locations, average monthly spending, most frequently used service), and time-series clickstream data that reflects immediate intent and decision-making patterns (what users view, click, consider, transact, and the duration between events). Both data types are critical for comprehensive user understanding, yet they have fundamentally different characteristics—tabular data is order-agnostic while time-series data is inherently sequential.

## Architecture: A Custom Transformer for Multimodal Learning

Grab's architecture needed to address four fundamental challenges: jointly training on tabular and time-series data with different ordering properties, handling diverse data modalities with specialized encoding requirements, generalizing beyond single tasks to power multiple downstream applications, and scaling to massive entity vocabularies containing hundreds of millions of unique users, merchants, and drivers.

The solution centers on a transformer architecture with several custom innovations. The tokenization strategy defines a universal token structure as key-value pairs. For tabular data, the key is the column name (e.g., "online_hours") and the value is the user's attribute (e.g., "4"). For time-series data, the key is the event type (e.g., "view_merchant") and the value is the specific entity involved (e.g., "merchant_id_114"). This common language allows the model to process both data types within a unified framework.

To preserve the distinct nature of each data source while using this common token format, the model employs custom positional embeddings and attention masks. These components instruct the transformer to treat key-value pairs from tabular data as an unordered set while treating tokens from time-series data as an ordered sequence. This design allows the model to benefit from both structures simultaneously without imposing artificial ordering on tabular features or losing sequential information from clickstream data.

The diversity of modalities is handled through an adapter-based design where each adapter acts as a specialized "expert" encoder for a specific modality, transforming its unique data format into a unified high-dimensional vector space. For text modalities, adapters can be initialized with pre-trained language models to leverage existing knowledge. For ID data like user, merchant, or driver identifiers, dedicated embedding layers are initialized. For complex data like location coordinates or numerical values (which existing LLMs often struggle to model effectively), custom adapters are designed from scratch.

After each token passes through its corresponding modality adapter, an alignment layer projects all resulting vectors into the same representation space. This step is critical for enabling the model to compare and combine insights from different data types—for instance, understanding relationships between a text search query and a location pin representing a specific food center. The aligned vectors then feed into the main transformer model for joint learning.

This modular adapter approach provides significant advantages for production LLM operations: it's highly scalable and future-proof, enabling easy incorporation of new modalities like images or audio, and individual components can be upgraded as more advanced architectures become available without rebuilding the entire system.

## Pre-Training Strategy: Unsupervised Learning for Ecosystem-Wide Understanding

A critical LLMOps decision involved choosing between semi-supervised and unsupervised pre-training approaches. Many industry recommender models use semi-supervised learning, training on specific objectives like predicting the next movie a user will watch or whether they'll click an ad. While this works well for platforms with homogeneous primary tasks, it fundamentally misaligns with superapp requirements.

Grab needs to power diverse downstream use cases including food recommendations, ad targeting, transport optimization, fraud detection, and churn prediction. Training solely on one objective would create biased embeddings limiting utility for other tasks. Furthermore, focusing on a single vertical like Food would ignore rich signals from user activity in Transport, GrabMart, and Financial Services, preventing holistic user understanding.

The team concluded that unsupervised pre-training was the most effective path forward, allowing them to leverage the full breadth of available data to learn universal representations of the entire Grab ecosystem without constraint to single predictive tasks. This approach directly addresses a key LLMOps challenge: building foundation models that generalize across multiple downstream applications rather than optimizing narrowly for one metric.

The pre-training combines masked language modeling (reconstructing randomly masked tokens) with next-action prediction. On a superapp, user journeys are inherently unpredictable—a user might finish a ride and immediately search for food, or transition from browsing groceries to sending a package. The next action could belong to any service vertical (mobility, deliveries, financial services).

To capture this complexity, the model performs dual prediction mirroring the key-value token structure: it predicts the type of the next action (e.g., "click_restaurant," "book_ride," "search_mart") and the value associated with that action (the specific restaurant ID, destination coordinates, or search query text). This dual-prediction task forces the model to learn intricate patterns of user behavior across the entire platform.

Handling predictions where output could be any modality requires modality-specific reconstruction heads. Each head is designed for a particular data type with tailored loss functions: cross-entropy for categorical IDs, mean squared error for numerical values, and appropriate losses for text and location data.

## Scaling Challenge: The ID Reconstruction Problem

A significant production challenge stems from the massive scale of categorical ID vocabularies. With hundreds of millions of unique merchants, users, and drivers, a standard cross-entropy loss would require prediction layers with enormous output dimensions. For example, a vocabulary of 100 million IDs with 768-dimension embeddings would create a prediction head with nearly 80 billion parameters, making the model computationally intractable.

The solution employs hierarchical classification, a technique particularly relevant for LLMOps at scale. Instead of predicting from a single flat list of millions of IDs, the model first classifies IDs into smaller meaningful groups based on attributes (city, cuisine type, service area), followed by second-stage prediction within the much smaller subgroup. This dramatically reduces computational complexity while maintaining the ability to learn meaningful representations for enormous entity vocabularies—a practical consideration essential for deploying foundation models in production environments with constrained resources.

## Dual-Embedding Strategy: Long-Term and Short-Term Representations

The architecture deliberately produces two complementary types of user embeddings, addressing a common requirement in production recommendation systems. The long-term embedding captures persistent habits, established preferences, and overall user persona. This representation is the learned vector for a given user_id stored within the specialized User ID adapter. As the model trains on countless sequences from a user's history, the adapter distills consistent behaviors into a single stable vector that effectively serves as the user's "long-term memory" on the platform.

The short-term embedding captures immediate context and current mission. To generate this, a sequence of the user's most recent interactions processes through the model's adapters and main transformer block. A Sequence Aggregation Module then condenses the transformer's output into a single vector, creating a snapshot of recent intent that reflects up-to-date activities and immediate goals.

This dual-embedding approach provides downstream models with both stability (long-term patterns unlikely to change rapidly) and responsiveness (short-term context reflecting current sessions), a balance that proves valuable across different use cases. Fraud detection might weight long-term patterns more heavily, while session-based food recommendations might emphasize short-term intent signals.

## Production Infrastructure: Ray Framework for Training and Inference

Building and deploying a foundation model at this magnitude introduces substantial LLMOps challenges extending beyond model architecture. The practical success hinges on solving two distinct scalability problems: massive-scale training involving terabytes of diverse multimodal data requiring distributed computing frameworks, and high-throughput inference necessitating regeneration of embeddings for millions of active users daily.

Grab built upon the Ray framework, an open-source standard for scalable computing, enabling management of both training and inference within a unified ecosystem. The core architectural principle involves decoupling CPU-intensive preprocessing from GPU-intensive neural network computation. Both training and inference pipelines share a fundamental workflow: complex CPU-intensive data preprocessing (tokenization) followed by GPU-intensive model computation.

A naive approach bundling these tasks would force expensive GPU resources to sit idle during CPU data preparation. By using Ray's ability to manage heterogeneous hardware, the team created distinct, independently scalable pools of CPU and GPU workers. This enables an assembly-line-style process where data is first ingested by CPU workers for parallelized tokenization, then resulting tensors stream directly to GPU workers for model computation. This separation achieves near-optimal GPU utilization, dramatically reducing costs and accelerating processing times.

For training, this pipeline efficiently processes terabytes of raw data with CPU workers handling complex key-value tokenization at scale while ensuring GPU workers receive consistent training batches. This robust setup significantly reduces end-to-end training time, enabling faster experimentation and iteration cycles—critical for maintaining development velocity in production ML environments.

For daily inference, the same efficient architecture generates fresh embeddings for millions of users using Ray Data for distributed batch inference. The process orchestrates CPU workers for tokenization and GPU workers for model application in a batch-oriented approach that processes thousands of users' data simultaneously, maximizing throughput. This scalable inference setup ensures dozens of downstream systems always have fresh, high-quality embeddings, enabling timely personalized experiences.

## Embeddings as a Product: LLMOps at Scale

The foundation model represents a shift toward "embeddings as a product," a stable, reliable, and powerful basis for any AI-driven application at Grab. This productization philosophy exemplifies mature LLMOps practice where foundation models serve as infrastructure components rather than one-off research projects. Initial embeddings for users, driver-partners, and merchant-partners have already proven value across multiple downstream applications including ad optimization, dual app prediction, fraud detection, and churn probability estimation.

The generality of this model is its core strength from an LLMOps perspective. By pre-training on diverse data sources from across the platform—ranging from deep vertical-specific interactions to broader behavioral signals—it captures rich interconnected signals that task-specific models invariably miss. A user's choice of transport becomes a powerful signal informing food recommendations; a merchant's location helps predict ride demand. This foundational approach fundamentally accelerates AI development across the organization: teams build new models on top of high-quality pre-trained embeddings rather than starting from scratch, significantly reducing development time and improving performance.

The vision extends to becoming the central provider for all fundamental entities within the ecosystem, including Locations, Bookings, Marketplace items, and more. Achieving this requires continuous improvement across several dimensions: unifying and enriching datasets by merging distinct powerful data sources into a single cohesive training corpus representing user activity holistically across all services; evolving the model architecture through ongoing research to enhance learning capabilities and predictive power; and improving scale and efficiency to handle growing data volumes and complexity.

## Critical Assessment and LLMOps Considerations

While this case study presents an impressive technical achievement, several considerations warrant balanced evaluation. The document is written by the engineering team and naturally emphasizes successes while providing limited quantitative evidence of improvement. Specific metrics comparing the foundation model embeddings against traditional manually engineered features across downstream tasks would strengthen claims of superior performance. The case study mentions that key areas "already heavily benefit" from the foundation model but doesn't provide concrete numbers for lift in metrics like click-through rates, conversion rates, or fraud detection accuracy.

The computational costs of this approach—both for training terabytes of data on distributed GPU clusters and for daily inference generating millions of embeddings—are not discussed. For organizations considering similar approaches, understanding the cost-benefit tradeoff is essential. The Ray-based infrastructure clearly addresses efficiency concerns, but the absolute resource requirements and operational costs remain unspecified.

The modular adapter-based design and hierarchical classification approach to handling massive ID vocabularies represent genuine innovations addressing practical LLMOps challenges at scale. However, the maintainability burden of managing modality-specific adapters, alignment layers, and reconstruction heads across ongoing model iterations should not be underestimated. As new modalities are added and existing components upgraded, version compatibility and deployment coordination become increasingly complex.

The unsupervised pre-training strategy is well-justified given the superapp context, but it also means the model's performance depends heavily on the quality and representativeness of the pre-training corpus. The case study mentions ongoing work to "unify and enrich datasets" and create "a comprehensive, low-noise view of user behavior," suggesting data quality challenges remain active concerns. In production LLM systems, data quality issues in foundation model training can propagate to all downstream applications, making this a critical operational consideration.

The dual-embedding strategy providing both long-term and short-term representations is elegant, but downstream teams must understand when to use which embedding type, how to combine them, and how to handle edge cases like new users with no long-term history. The operational complexity of managing two embedding types for each user, ensuring they're updated at appropriate intervals, and serving them reliably to dozens of downstream systems requires sophisticated MLOps infrastructure.

Overall, this case study illustrates a sophisticated and thoughtful approach to building foundation models for a complex multi-sided marketplace platform. The technical innovations around multimodal learning, efficient scaling infrastructure, and embeddings-as-a-product philosophy represent valuable contributions to LLMOps practice, particularly for organizations operating in similarly complex domains with diverse data modalities and use cases. However, the true test of success will be sustained performance improvements across downstream applications, operational reliability at scale, and cost-effectiveness compared to alternative approaches—dimensions that would benefit from more detailed quantitative disclosure in future updates.