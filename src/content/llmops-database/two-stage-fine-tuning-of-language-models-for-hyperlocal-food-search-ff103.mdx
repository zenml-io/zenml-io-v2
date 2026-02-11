---
title: "Two-Stage Fine-Tuning of Language Models for Hyperlocal Food Search"
slug: "two-stage-fine-tuning-of-language-models-for-hyperlocal-food-search-ff103"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3fd6a3bb095f0d3a3e18"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:34:30.229Z"
  createdOn: "2024-11-21T14:12:38.833Z"
llmopsTags:
  - "embeddings"
  - "fine-tuning"
  - "hugging-face"
  - "latency-optimization"
  - "model-optimization"
  - "monitoring"
  - "pytorch"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "unstructured-data"
industryTags: "e-commerce"
company: "Swiggy"
summary: "Swiggy, a major food delivery platform in India, implemented a novel two-stage fine-tuning approach for language models to improve search relevance in their hyperlocal food delivery service. They first performed unsupervised fine-tuning using historical search queries and order data, followed by supervised fine-tuning with manually curated query-item pairs. The solution leverages TSDAE and Multiple Negatives Ranking Loss approaches, achieving superior search relevance metrics compared to baseline models while meeting strict latency requirements of 100ms."
link: "https://bytes.swiggy.com/improving-search-relevance-in-hyperlocal-food-delivery-using-small-language-models-ecda2acc24e6"
year: 2024
seo:
  title: "Swiggy: Two-Stage Fine-Tuning of Language Models for Hyperlocal Food Search - ZenML LLMOps Database"
  description: "Swiggy, a major food delivery platform in India, implemented a novel two-stage fine-tuning approach for language models to improve search relevance in their hyperlocal food delivery service. They first performed unsupervised fine-tuning using historical search queries and order data, followed by supervised fine-tuning with manually curated query-item pairs. The solution leverages TSDAE and Multiple Negatives Ranking Loss approaches, achieving superior search relevance metrics compared to baseline models while meeting strict latency requirements of 100ms."
  canonical: "https://www.zenml.io/llmops-database/two-stage-fine-tuning-of-language-models-for-hyperlocal-food-search-ff103"
  ogTitle: "Swiggy: Two-Stage Fine-Tuning of Language Models for Hyperlocal Food Search - ZenML LLMOps Database"
  ogDescription: "Swiggy, a major food delivery platform in India, implemented a novel two-stage fine-tuning approach for language models to improve search relevance in their hyperlocal food delivery service. They first performed unsupervised fine-tuning using historical search queries and order data, followed by supervised fine-tuning with manually curated query-item pairs. The solution leverages TSDAE and Multiple Negatives Ranking Loss approaches, achieving superior search relevance metrics compared to baseline models while meeting strict latency requirements of 100ms."
---

## Overview

Swiggy is a major Indian food delivery platform operating across hundreds of thousands of restaurants and serving millions of food items. The case study describes their approach to improving search relevance for complex, multi-intent customer queries using small language models fine-tuned for their specific domain. This work was presented at the 7th Joint International Conference on Data Science & Management of Data (CODS COMAD 2024).

The core challenge Swiggy faced stems from the unique complexity of food search in India. Customer queries often combine multiple intents including dish preferences, dietary restrictions, time-of-day considerations, regional cuisine preferences, and preparation styles. Unlike simple string-matching scenarios (e.g., searching for "pizza"), complex queries like "healthy snacks for office time" or "gym protein rich dry snacks" require semantic understanding of the relationship between query intent and available food items. The hyperlocal nature of food delivery—where only restaurants within approximately 5km can serve a customer—adds another layer of complexity, as the available item catalog varies significantly by location.

## Technical Approach

### Model Selection and Latency Constraints

A critical LLMOps consideration in this case study is the explicit attention to latency constraints. Swiggy set a hard requirement of 100 milliseconds for real-time query embedding generation to support their existing CPU-based search infrastructure and handle production traffic levels. This constraint led them to evaluate "small" language models rather than larger alternatives. They specifically selected "all-mpnet-base-v2" and "all-MiniLM-L6-v2" from the HuggingFace repository as baseline models, choosing these for their balance of semantic search performance and inference speed.

The decision to use smaller models rather than larger LLMs for the core embedding task demonstrates a pragmatic production-oriented approach. While larger models might offer better quality, the latency and infrastructure requirements would not be feasible for Swiggy's real-time search use case.

### Two-Stage Fine-Tuning Pipeline

The methodology employs a two-stage fine-tuning approach that separates domain adaptation from task-specific learning:

**Stage 1: Unsupervised Domain Adaptation**

The first stage uses Transformers and Sequential Denoising AutoEncoder (TSDAE) for unsupervised fine-tuning on approximately 996,000 historical text documents. These documents are constructed from successful order histories, combining the search query that led to the order with the purchased item name and metadata from Swiggy's internal food intelligence taxonomy (including category, cuisine, and preparation style).

The TSDAE approach introduces noise by deleting and swapping tokens within sentences, then trains the model to reconstruct the original input from the noisy version. The authors note this is superior to Masked Language Modeling (MLM) because TSDAE uses the entire sentence vector for reconstruction rather than individual token embeddings, leading to better sentence-level representations.

This stage serves as domain adaptation, helping the model understand food-related vocabulary and the relationships between different food items based on actual user behavior. The qualitative analysis shows that after Stage 1, the model learns that "Fried rice" is more similar to "Noodles" than to "Rice bath," and "Roshogolla" is more similar to "Rajbhog" than to "Gulab jamun"—relationships that reflect how Indian consumers actually perceive and search for these items.

**Stage 2: Supervised Fine-Tuning**

The second stage involves supervised fine-tuning using over 300,000 manually curated query-item pairs. Swiggy leveraged their existing food intelligence database and augmented it using large language models to generate additional metadata including regional cuisine, main ingredient, preparation style, and preferred consumption time slots. This metadata enabled the creation of diverse query templates that customers might use.

Importantly, the authors note that all training samples underwent manual verification and editing. This human-in-the-loop approach ensures data quality despite the use of LLMs for augmentation—a responsible practice that acknowledges LLM outputs require validation.

The training uses Multiple Negatives Ranking Loss (MNR loss) with a Siamese-style architecture. Since only positive pairs are available (not explicit negatives), MNR loss treats the positive sample as a strict positive and randomly chosen samples within the batch as soft negatives.

### Incremental Training Pipeline

A notable LLMOps feature is the offline incremental training pipeline. This allows ongoing evaluation of search query performance, collection of underperforming queries, manual curation of correct relevant items, and feeding these back into Stage 2 training. This creates a continuous improvement loop that can adapt to changing user behavior and new food items over time.

## Evaluation and Results

The evaluation methodology is rigorous, using a test dataset of 5,000+ samples covering 5 international cuisines, 15 Indian regional cuisines, and 10+ dietary preferences. The test queries also include natural language variations like "Show me," "Find me," and "I am looking for."

Key metrics measured include Mean Average Precision (MAP), Precision@1, and Precision@5. The results were evaluated across two hyperlocal spaces with different item densities to assess model robustness.

The two-stage fine-tuned "all-mpnet-base-v2" outperformed all other variants in overall MAP and Precision@5. An important finding is that training directly with Stage 2 data (skipping Stage 1) improved Precision@1 but resulted in lower overall MAP. This suggests that Stage 1's domain adaptation helps similar items with different vocabulary appear closer in the embedding space, improving the overall quality of the retrieved list.

Qualitative examples demonstrate the model's capabilities: queries for "gym" retrieve "whey protein" items, "healthy bakery items" returns "multigrain loaf" and "keto and sugar free brownies," and "Karnataka famous sweets" retrieves regionally specific items like "Mysore Pak" and "Chandrahara."

The comparison with BM25 (a classical TF-IDF based approach) demonstrates the value of semantic embeddings for complex queries where direct term matching fails.

## Production Status and Limitations

It's important to note that at the time of publication (early 2024), this feature was described as being "in the experimental phase and is being tested with a small cohort." This honest assessment indicates the work represents a promising approach rather than a fully validated production system. The results should be interpreted as research findings that showed promise but required further validation at scale.

The case study focuses specifically on the retrieval component of search, meaning it addresses finding relevant items but not the full ranking and presentation pipeline. In a complete production system, retrieved items would likely pass through additional ranking stages before being displayed to users.

## Infrastructure Considerations

The system is designed to work with Swiggy's existing CPU-based search infrastructure, suggesting cost and operational considerations influenced the architecture decisions. The 100ms latency constraint for embedding generation implies real-time inference at query time rather than pre-computation, which is appropriate given the hyperlocal nature of the service where the available item catalog changes based on user location.

## Key LLMOps Takeaways

This case study illustrates several important LLMOps practices: setting explicit latency constraints that influence model selection, using domain-specific fine-tuning to adapt general-purpose models, combining unsupervised and supervised learning stages, implementing human-in-the-loop validation for LLM-generated training data, building incremental training pipelines for continuous improvement, and conducting rigorous evaluation across different operational scenarios (dense vs. sparse hyperlocal regions). The honest acknowledgment of experimental status and the focus on a specific component (retrieval) rather than claiming end-to-end success demonstrates mature engineering practices.