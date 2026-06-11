---
title: "Unified Consumer Memory Platform for Personalization at Scale"
slug: "unified-consumer-memory-platform-for-personalization-at-scale"
draft: false
llmopsTags:
  - "content-moderation"
  - "classification"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "memory"
  - "few-shot"
  - "pytorch"
  - "fastapi"
  - "pinecone"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash developed a unified consumer memory platform to address the limitations of purely engagement-based personalization models that couldn't capture semantic understanding of consumer preferences across their multi-vertical marketplace. The solution uses LLMs to systematically extract semantic understanding from behavioral signals (orders, searches, browsing) and transforms them into structured memory blocks containing natural language descriptions of consumer preferences. These memory blocks are then encoded into multiple representations—dense embeddings for semantic similarity and a heterogeneous context graph for relational reasoning—that serve both traditional ML ranking/retrieval models and LLM-driven experiences. The platform operates at daily/weekly batch cadences with versioned components and manifests, enabling A/B testing, rollbacks, and lineage tracking while supporting use cases like personalized collections and enhanced ranking models that go beyond simple engagement patterns."
link: "https://careersatdoordash.com/blog/doordash-unified-consumer-memory-for-personalization-at-scale/"
year: 2026
seo:
  title: "Doordash: Unified Consumer Memory Platform for Personalization at Scale - ZenML LLMOps Database"
  description: "DoorDash developed a unified consumer memory platform to address the limitations of purely engagement-based personalization models that couldn't capture semantic understanding of consumer preferences across their multi-vertical marketplace. The solution uses LLMs to systematically extract semantic understanding from behavioral signals (orders, searches, browsing) and transforms them into structured memory blocks containing natural language descriptions of consumer preferences. These memory blocks are then encoded into multiple representations—dense embeddings for semantic similarity and a heterogeneous context graph for relational reasoning—that serve both traditional ML ranking/retrieval models and LLM-driven experiences. The platform operates at daily/weekly batch cadences with versioned components and manifests, enabling A/B testing, rollbacks, and lineage tracking while supporting use cases like personalized collections and enhanced ranking models that go beyond simple engagement patterns."
  canonical: "https://www.zenml.io/llmops-database/unified-consumer-memory-platform-for-personalization-at-scale"
  ogTitle: "Doordash: Unified Consumer Memory Platform for Personalization at Scale - ZenML LLMOps Database"
  ogDescription: "DoorDash developed a unified consumer memory platform to address the limitations of purely engagement-based personalization models that couldn't capture semantic understanding of consumer preferences across their multi-vertical marketplace. The solution uses LLMs to systematically extract semantic understanding from behavioral signals (orders, searches, browsing) and transforms them into structured memory blocks containing natural language descriptions of consumer preferences. These memory blocks are then encoded into multiple representations—dense embeddings for semantic similarity and a heterogeneous context graph for relational reasoning—that serve both traditional ML ranking/retrieval models and LLM-driven experiences. The platform operates at daily/weekly batch cadences with versioned components and manifests, enabling A/B testing, rollbacks, and lineage tracking while supporting use cases like personalized collections and enhanced ranking models that go beyond simple engagement patterns."
notion:
  pageId: "37cf8dff-2538-8034-b1ca-fdf3ab812d98"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T11:37:00.000Z"
  lastEditedTime: "2026-06-11T12:34:00.000Z"
  publishedAt: "2026-06-11T12:37:30Z"
---

## Overview

DoorDash's unified consumer memory platform represents a sophisticated production LLM system designed to bridge the gap between traditional engagement-based machine learning models and emerging LLM-driven personalization experiences. Operating across DoorDash's multi-vertical marketplace spanning restaurants, groceries, convenience stores, and retail, the system addresses a fundamental challenge: traditional deep learning models excel at capturing statistical patterns in behavioral data but lack semantic understanding that can be communicated to LLMs or used for compositional reasoning about consumer preferences.

The platform treats behavioral data not merely as a feature engineering problem but as a semantic extraction problem, using LLMs to systematically convert raw signals into interpretable, versioned memory blocks that can be consumed by both traditional ML systems (via embeddings and graph features) and generative AI experiences (via natural language context). This dual-use architecture ensures that semantic understanding of consumers—their dietary habits, brand preferences, price sensitivity, and shopping patterns—is extracted once and made available consistently across all personalization surfaces.

## Problem Statement and Motivation

DoorDash faced several interconnected challenges with their existing personalization infrastructure. Collaborative filtering and engagement-based models excel at patterns like "users who bought X also bought Y" but struggle with semantic nuances. A consumer purchasing organic kale and almond milk likely has broader plant-forward, health-conscious preferences that should influence recommendations across categories they haven't yet explored, but engagement models operating on item-level signals cannot make these semantic inferences.

Embedding-based user representations from two-tower models capture latent patterns effectively through dense vectors, but these representations are opaque—useful for similarity search but not inspectable and crucially not interpretable by LLMs that reason in natural language rather than learned representations. As DoorDash invested in AI experiences powered by LLMs, this disconnect became increasingly problematic. It wasn't feasible for every surface and model to independently extract consumer understanding from raw behavioral data, creating redundant processing and inconsistent representations.

The team needed a shared, semantic, language-native understanding of consumers that would work for both traditional ML systems requiring fixed-shape tensors and sparse features compatible with existing architectures, and LLM-driven systems requiring natural language context for reasoning.

## Architecture: Three Memory Layers

The memory system maintains three complementary memory types operating at different timescales and optimized for different purposes. The **long-term memory engine** turns raw behavioral signals—orders, searches, browsing patterns, support interactions—into durable, interpretable memory for each consumer by generating versioned memory blocks. These persist and are assembled into a single long-term memory manifest for downstream consumption.

**In-session context** captures real-time signals about current intent including cart contents, active searches, browsing patterns, items viewed and rejected, and time spent in categories. This layer carries high recency weight where current behavior overrides or supplements historical patterns, providing signals about immediate intent that may differ from longer-term preferences.

**Explicit context and memory** captures preferences that consumers explicitly state rather than having them inferred from behavior. When consumers mention brand preferences or substitution rules during support sessions, these are captured as explicit preferences. Unlike behavioral inferences that update gradually through patterns, explicit preferences are more stable and require deliberate modification.

These layers aren't static silos but feature a graduation process where in-session patterns that recur across multiple sessions become candidates for promotion into long-term memory. A consumer consistently browsing Mexican restaurants every Thursday would eventually graduate from session context to long-term memory. The consolidation pipeline validates, deduplicates, and merges incoming signals before promoting them, preventing noise or misinterpreted interactions from corrupting the long-term profile while ensuring one-off behaviors naturally decay.

## LLM-Based Memory Generation

The long-term memory engine uses LLMs to synthesize behavioral patterns into semantic memories as natural language descriptions grounded in catalog data. Examples include statements like "Strong affinity for organic produce; prefers premium brands in fresh categories; price-conscious on packaged goods" or "High loyalty to 3-4 specific stores; explores new merchants for South East Asian dishes." Unlike static tagging systems relying on fixed categories, these memories capture nuance and serve both ML models through embedding conversion and LLM systems via direct natural language reasoning.

Memory generation operates offline via batch processing at daily or weekly cadence. This design choice is intentional—LLM-based memory generation is compute-intensive and real-time generation would create unacceptable latency. Additionally, long-term memory captures durable preferences fundamentally unsuited to minute-by-minute updates. The batch approach allows concentration of compute resources on meaningful changes rather than redundant reprocessing.

Memory is organized into **memory blocks**, which are modular, domain-specific groupings that each capture different dimensions of consumer understanding. Each block contains multiple **components**—atomic units with strict schemas that can be versioned and updated independently. Example blocks include Dietary Preference (with components for narrative, type, strictness capturing dietary and cuisine preferences), Dining Patterns (cuisine preferences, behavior, food types), Item Brand (brand narrative, brand ID, keywords for brand-level affinities per entity), Item Taxonomy (taxonomy narrative, substitute signals, support signals, keywords for category-level preferences), Store Preferences (primary stores, loyalty type, reorder tendency), and Cross Channel Patterns (complementary behaviors, substitution patterns, seasonal trends).

Each narrative is a statement grounded in behavioral evidence. Brand and taxonomy blocks also carry extracted keywords and substitute signals using both approved and disapproved substitution patterns. This richness enables the downstream encoding pipeline by providing sufficient structured semantic content to build both dense representations and graph structures.

## Versioning and Lineage Management

Components are defined with strict Pydantic schemas and versioned independently, carrying full lineage including model ID, generation timestamp, prompt hash, and response hash. Memory assembly is controlled via manifests that specify which component versions to use. This manifest-based approach decouples generation from consumption—DoorDash can deploy manifest version 3a to 10% of consumers and version 3b to 90% with independent metrics, reverting if quality degrades. The system can reconstruct any consumer's memory as of any historical date, enabling sophisticated A/B testing and debugging.

This versioning infrastructure proved essential for production operations. When model changes produce unexpected downstream behavior, teams can trace through manifests to components to source signals to discover prompts that identify root causes. The ability to rollback specific component versions without affecting the entire system provides operational safety critical for production LLM deployments.

## Encoding for ML Models

While memory blocks successfully convert raw behavior into semantic intent, they aren't ML-ready out of the box. Each consumer has dozens of preferences across brands, taxonomies, substitute rules, and lifestyle signals—far beyond what can be represented as a single embedding or small set of scalar features. The challenge is mapping these semantics cleanly onto the catalog while supporting both training and online inference with fixed-shape tensors and sparse features compatible with existing model architectures.

DoorDash addresses this through two complementary encoding approaches designed to capture different aspects of the semantic information.

### Dense Embeddings from Memories

The first approach treats all memory text as semantic signals and embeds them into continuous vector space using asymmetric embedding models. The key insight is that if consumer memories and item descriptions embed closely in semantic space, the consumer likely prefers that item. Memory embeddings act like high-level query expansion where "plant-forward, organic, premium fresh brands" retrieves items matching those semantics even if the consumer hasn't purchased them before.

The asymmetric design maps the consumer (query side) and item (document side) into a shared space. Each memory block uses a block-specific retrieval instruction prepended to consumer text, such as "Given a consumer's shopping preferences and brand affinities, retrieve items that match their preferences." Items are embedded without instruction prefixes on the document side. This asymmetry allows the model to learn that consumer profiles should retrieve relevant items rather than just matching similar profiles.

Rather than embedding each component independently and pooling, the system concatenates all components within a block into single labeled text before embedding. This eliminates a pooling step and lets the model attend across all signals within a block jointly, capturing interactions between different preference dimensions.

For low-latency feature fetching, a semantic two-tower model projects high-dimensional embedding features into task-aligned lower-dimensional subspace. The consumer tower combines consumer block embeddings, brand embeddings, and taxonomy embeddings as input, while the item tower concatenates item name, description, and category embeddings. These embeddings serve as input features to multi-task ranking models where they complement existing engagement-based signals rather than replacing them.

### Memory Context Graph

Dense embeddings capture semantic similarity but don't explicitly capture relational structure between entities. A consumer who prefers organic produce and a brand known for organic snacks share a latent connection through "organic," but this relationship is implicit in embeddings and can be lost during aggregation.

The context graph makes these connections explicit through a heterogeneous graph where consumers, brands, taxonomies, and semantic concepts are explicit nodes connected by typed edges. Consumer preference edges link to brand and taxonomy nodes, while keyword nodes extracted from memories form a semantic layer bridging entities and enabling multi-hop reasoning from consumer preferences to items they haven't purchased.

The graph enables reasoning about relationships like "prefers X which implies Y," "merchant carries preferred brands," or "keywords connect to multiple taxonomies." Even if a consumer has never purchased a specific category, the graph can connect them through shared attributes and keywords that propagate preference signals. This relational structure captures information orthogonal to dense embeddings—not just semantic similarity but explicit connections and implications.

## Production Infrastructure and Scaling

Operating across DoorDash's full consumer base spanning multiple verticals requires generation, encoding, and serving of memory within daily batch windows. Memory generation runs on cadences varying by block type—blocks capturing quickly changing signals like dining patterns run more frequently than stable signals like dietary preferences. Rather than uniformly reprocessing the entire consumer population on every run, the system uses selective recomputation where components are only regenerated when underlying source signals have materially changed.

This selective approach is justified by the nature of long-term memory. Most consumers' durable preferences remain stable week-over-week, and regenerating unchanged components would waste LLM compute without improving quality. Computation concentrates on active consumers with meaningful new behavioral signals, dramatically reducing costs while maintaining freshness.

Embedding generation for all block types occurs via batch inference on GPU clusters. Item-level blocks have the highest cardinality since each consumer has per-entity preference records across all brands and categories with which they engage. The context graph is rebuilt on batch cadence from memory block manifests, running downstream of embedding generation and sharing feature inputs where possible to avoid redundant computation.

All encodings—both dense embeddings and graph embeddings—are published to the ML feature store for consumption by ranking and retrieval models at inference time. This is a deliberate design choice keeping serving from precomputed encodings rather than on-demand generation, ensuring inference latency remains independent of memory representation complexity. Online systems fetch features from the store without triggering LLM calls or embedding computations in the critical path.

## Production Use Cases

The unified memory platform serves multiple production personalization surfaces. For **personalized collections**, DoorDash shows store and item collections through themed carousels like "Snack Time" or "Quick Dinner Ideas." Traditionally these used attribute-based definitions identical for every consumer. Now an LLM reads consumer memory blocks offline and generates personalized carousel titles and search keywords tailored to individual profiles—for example "hydration, but make it zero sugar" for sugar-aware consumers—along with search terms tuned to specific brand and format preferences. Online, these generated search terms drive embedding-based retrieval to fetch candidate items from the catalog, which are then ranked by existing models.

For **ranking models**, consumer memory enriches ranking with signals beyond engagement-based patterns and learned embeddings. When consumers search for "snacks," the ranking system leverages memory blocks including brand affinities and category preferences. Memory embeddings act as semantic query expansion where "plant-forward, organic, premium brands" pulls relevant items even for broad or ambiguous queries. This proves particularly valuable for consumers with thin engagement histories, new users, or those who have only ordered across a single vertical where traditional engagement signals are insufficient.

## Critical Learnings and Balanced Assessment

DoorDash identifies several critical learnings from deploying this system at scale. Memory blocks emerged as more than just context for LLMs—they function as a **semantic matching primitive** for ML models broadly. Many personalization problems including item retrieval, substitution, and cross-category recommendation are fundamentally about aligning consumer intent with catalog semantics. Memory blocks express that intent in forms that can be embedded, graphed, and tokenized.

The team emphasizes that **extraction and encoding must be decoupled**. Memory generation and encoding evolve at different rates—LLM improvements affect memory quality while embedding model and graph architecture improvements affect encoding quality. These are independent axes of improvement happening on different timelines requiring different evaluation criteria. Keeping them as independent stages connected by versioned manifests allows each to be upgraded, rolled back, and A/B tested without touching the other.

The **multiple encoding approach** proved superior to any single representation. No single encoding captures everything—the combination of dense embeddings for semantic similarity and graphs for structural reasoning captures more signal than either alone. This redundancy is a feature not a bug, with different encodings serving different downstream needs.

The team makes clear that **versioning and lineage are non-negotiable** for production LLM systems. Every component carrying full lineage including model ID, prompt hash, response hash, and generation timestamp proved essential for debugging and operational safety. The ability to reconstruct historical states enables proper evaluation and root cause analysis when issues emerge.

From a critical perspective, while DoorDash presents impressive technical architecture, several limitations and tradeoffs deserve consideration. The batch processing approach with daily or weekly cadence means the system cannot capture rapid preference changes or respond to same-day behavioral shifts. The team acknowledges this is acceptable for long-term memory but it represents a real limitation for time-sensitive personalization.

The compute costs of LLM-based memory generation at scale across millions of consumers aren't discussed in detail, though selective recomputation suggests they're significant enough to warrant optimization. The text doesn't provide quantitative evaluation results comparing memory-enhanced models against baselines, making it difficult to assess actual performance improvements beyond conceptual benefits.

The reliance on LLMs for memory extraction introduces potential quality and consistency challenges. While versioning helps manage this, the system inherits all limitations of the underlying LLMs including potential biases, hallucinations, or inconsistent extraction quality across different behavioral patterns. The text doesn't detail evaluation processes for memory quality or how they detect and handle extraction errors.

## Future Directions

Looking forward, DoorDash envisions several evolution paths. The **north star is personalized Small Language Models with memory-in-the-loop**—a closed-loop system where memory retrieval feeds a personalized SLM generating recommendations with explanations, and user feedback (clicks, rejections, substitutions) flows back as reinforcement signal improving both model and memory over time. Memory would become not just context but part of the optimization loop.

Currently the platform uses entirely **token-level memory**—explicit, inspectable text injected into prompts. While this provides interpretability and works with any foundation model, the team sees potential for complementary approaches. **Parametric memory** would encode knowledge directly into model weights (e.g., LoRA adapters generated from memory blocks) offering potentially better performance but slower updates and less interpretability. **Latent memory** would maintain continuous hidden states across interactions enabling models to internalize context without explicit retrieval. As techniques mature, they expect evolution toward a hybrid combining token-level for inspectable high-frequency updates and parametric for stable personalization signals.

The team also explores **temporal graph dynamics** where the current static weekly snapshot evolves toward incremental updates. New behavioral signals would add or strengthen edges without full reconstruction, enabling the graph to reflect preference changes within days rather than weeks, addressing some latency limitations of the current batch architecture.

## LLMOps Implications

This case study exemplifies several important LLMOps patterns for production LLM systems. The separation of batch LLM processing from online serving through precomputed features demonstrates how to manage compute-intensive LLM operations while maintaining low-latency user experiences. The versioning and manifest system provides a template for managing evolving LLM outputs with proper lineage tracking and rollback capabilities.

The multi-encoding approach shows how LLM outputs can be transformed into multiple representations serving different downstream needs—both traditional ML models and LLM-driven experiences. This bridges the gap between existing ML infrastructure and emerging LLM capabilities without requiring wholesale replacement of proven systems.

The selective recomputation strategy demonstrates cost management for LLM operations at scale, concentrating compute on consumers with meaningful signal changes rather than uniform reprocessing. This represents practical operational thinking essential for sustainable LLM deployment at scale across millions of users.
