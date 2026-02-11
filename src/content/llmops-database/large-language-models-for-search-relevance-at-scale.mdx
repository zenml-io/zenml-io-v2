---
title: "Large Language Models for Search Relevance at Scale"
slug: "large-language-models-for-search-relevance-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "687e01b05481701f6e8da455"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:16:17.362Z"
  createdOn: "2025-07-21T09:00:32.030Z"
llmopsTags:
  - "content-moderation"
  - "classification"
  - "multi-modality"
  - "structured-output"
  - "caption-generation"
  - "fine-tuning"
  - "embeddings"
  - "semantic-search"
  - "knowledge-distillation"
  - "reranking"
  - "multi-agent-systems"
  - "cache"
  - "fastapi"
  - "pytorch"
  - "tensorflow"
  - "meta"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest's search relevance team integrated large language models into their search pipeline to improve semantic relevance prediction for over 6 billion monthly searches across 45 languages and 100+ countries. They developed a cross-encoder teacher model using fine-tuned open-source LLMs that achieved 12-20% performance improvements over existing models, then used knowledge distillation to create a production-ready bi-encoder student model that could scale efficiently. The solution incorporated visual language model captions, user engagement signals, and multilingual capabilities, ultimately improving search relevance metrics internationally while producing reusable semantic embeddings for other Pinterest surfaces."
link: "https://www.youtube.com/watch?v=XdAWgO11zuk"
year: 2025
seo:
  title: "Pinterest: Large Language Models for Search Relevance at Scale - ZenML LLMOps Database"
  description: "Pinterest's search relevance team integrated large language models into their search pipeline to improve semantic relevance prediction for over 6 billion monthly searches across 45 languages and 100+ countries. They developed a cross-encoder teacher model using fine-tuned open-source LLMs that achieved 12-20% performance improvements over existing models, then used knowledge distillation to create a production-ready bi-encoder student model that could scale efficiently. The solution incorporated visual language model captions, user engagement signals, and multilingual capabilities, ultimately improving search relevance metrics internationally while producing reusable semantic embeddings for other Pinterest surfaces."
  canonical: "https://www.zenml.io/llmops-database/large-language-models-for-search-relevance-at-scale"
  ogTitle: "Pinterest: Large Language Models for Search Relevance at Scale - ZenML LLMOps Database"
  ogDescription: "Pinterest's search relevance team integrated large language models into their search pipeline to improve semantic relevance prediction for over 6 billion monthly searches across 45 languages and 100+ countries. They developed a cross-encoder teacher model using fine-tuned open-source LLMs that achieved 12-20% performance improvements over existing models, then used knowledge distillation to create a production-ready bi-encoder student model that could scale efficiently. The solution incorporated visual language model captions, user engagement signals, and multilingual capabilities, ultimately improving search relevance metrics internationally while producing reusable semantic embeddings for other Pinterest surfaces."
---

## Pinterest's Large Language Model Integration for Search Relevance

This case study presents Pinterest's comprehensive approach to integrating large language models into their search infrastructure, demonstrating a sophisticated production deployment that handles massive scale while maintaining performance and cost efficiency. Pinterest operates as a visual discovery platform where users search for inspiration across diverse topics including recipes, home decor, travel, and fashion, processing over 6 billion searches monthly across billions of pins in more than 45 languages and 100+ countries.

### Technical Architecture and Model Design

Pinterest's search relevance system follows a traditional recommendation pipeline with query understanding, retrieval, ranking, and blending stages. The LLM integration specifically targets the semantic relevance modeling component during the re-ranking stage. Their core innovation involves a two-tier architecture consisting of a sophisticated teacher model and a production-optimized student model.

The teacher model employs a cross-encoder architecture that concatenates search queries and pin text representations, feeding them jointly into a large language model to capture rich interactions between query and content. This approach contrasts with bi-encoder methods where query and document embeddings are computed separately. The cross-encoder outputs embeddings that feed into multilayer perceptron layers producing five-dimensional vectors corresponding to relevance levels ranging from most relevant to most irrelevant.

Pinterest experimented extensively with different open-source language models, finding that larger and more advanced models consistently improved performance. Their results demonstrated that an 8-billion parameter Llama model achieved 12% improvement over multilingual BERT-based approaches and 20% improvement over their previous SearchSage embedding model. This experimentation process highlights the importance of systematic model evaluation in production LLM deployments.

### Content Representation and Feature Engineering

A critical aspect of Pinterest's approach involves building comprehensive text representations for each pin. Beyond traditional metadata like titles and descriptions, they incorporate several innovative features that demonstrate thoughtful integration of multimodal and user behavior signals. Visual language model-generated synthetic image captions provide direct extraction of visual information, enabling the text-based relevance models to understand image content without requiring multimodal architectures.

User engagement signals serve as powerful content annotations, including board titles from user-curated collections where pins have been saved and historical search queries that led to high engagement with specific pins. These user action-based features function as crowdsourced annotations that help models understand content semantics from actual usage patterns rather than just metadata.

Ablation studies revealed the value of each feature component, with vision-generated captions providing a solid baseline and sequential addition of other text features yielding consistent performance improvements. The user action-based features proved particularly valuable, demonstrating how implicit user feedback can enhance content understanding in production systems.

### Knowledge Distillation for Production Scaling

The production deployment strategy centers on knowledge distillation to address the fundamental tension between model performance and computational efficiency. While the cross-encoder teacher model provides superior relevance prediction, its computational requirements make direct deployment prohibitively expensive at Pinterest's scale.

The student model employs a bi-encoder architecture where pin and query representations are computed separately, enabling significant optimization opportunities. Pin embeddings are computed entirely offline and cached, with re-computation only occurring when pin features meaningfully change. This approach leverages the fact that Pinterest's content is relatively stable compared to the query stream.

Query embeddings are computed in real-time but benefit from Pinterest's search query patterns. Search queries tend to be short, limiting tokenization overhead, and exhibit high repetition rates enabling an 85% cache hit rate. The bi-encoder architecture allows these optimizations while the distillation process transfers much of the cross-encoder's semantic understanding to the more efficient student model.

The training process for the student model demonstrates sophisticated semi-supervised learning techniques. While the teacher model trains on limited human-annotated data, the student model leverages daily search logs to generate training data at massive scale. This approach scales training data approximately 100x across different domains, languages, and countries where the multilingual teacher model produces reliable labels.

### Multilingual and Global Deployment

Pinterest's global reach necessitated careful attention to multilingual capabilities and cross-cultural transfer learning. Their use of multilingual language models enabled knowledge transfer from predominantly US-based human annotation data to international markets. Online results demonstrated relevance improvements in Germany and France despite training primarily on US data, highlighting the cross-lingual transfer capabilities of modern language models.

The multilingual approach involved using the same model architecture across all languages rather than developing language-specific models. This decision simplified deployment and maintenance while leveraging the inherent multilingual capabilities of foundation models. The success of this approach suggests that well-designed multilingual LLM systems can achieve broad international coverage without extensive localization efforts.

### Production Results and Performance

The deployment achieved measurable improvements across multiple metrics including NDCG (Normalized Discounted Cumulative Gain) and precision at 8, with gains observed not only in the US but also internationally. Search fulfillment metrics, measuring user engagement with search results, also improved across non-US markets, validating the cross-lingual transfer effectiveness.

Beyond direct search relevance improvements, the system generated valuable semantic representations as a byproduct. The pin and query embeddings produced by the distilled model proved useful across other Pinterest surfaces including related pins and home feed recommendations. This demonstrates how thoughtfully designed LLM systems can provide multi-purpose value beyond their primary objective.

### Operational Considerations and Lessons Learned

Pinterest's experience highlights several key operational insights for production LLM deployment. The knowledge distillation approach proved essential for achieving the cost-performance balance required at web scale, with the bi-encoder student model enabling efficient serving while retaining much of the teacher model's semantic understanding.

The integration of multiple signal types, particularly vision-generated captions and user behavior signals, demonstrates the value of comprehensive feature engineering in LLM applications. Rather than relying solely on raw text, Pinterest's approach shows how auxiliary signals can significantly enhance model performance.

The multilingual deployment success suggests that well-designed foundation model approaches can achieve broad coverage without extensive per-market customization, though this likely depends on having sufficient multilingual capability in the base models and thoughtful architecture design.

The case study also illustrates the importance of systematic experimentation with different foundation models, as performance varied significantly across model choices and sizes. This reinforces the need for thorough evaluation processes when selecting base models for production applications.

Overall, Pinterest's LLM integration represents a sophisticated production deployment that addresses real-world constraints while achieving meaningful performance improvements. Their two-tier architecture, comprehensive feature engineering, and careful attention to multilingual deployment provide valuable insights for organizations seeking to deploy LLMs at scale in recommendation and search systems.