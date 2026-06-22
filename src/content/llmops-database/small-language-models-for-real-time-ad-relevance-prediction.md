---
title: "Small Language Models for Real-Time Ad Relevance Prediction"
slug: "small-language-models-for-real-time-ad-relevance-prediction"
draft: false
llmopsTags:
  - "classification"
  - "structured-output"
  - "embeddings"
  - "fine-tuning"
  - "semantic-search"
  - "model-optimization"
  - "knowledge-distillation"
  - "latency-optimization"
  - "pytorch"
  - "open-source"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash addressed the challenge of serving relevant sponsored search results by implementing a two-stage LLM and SLM approach for query-item relevance prediction. The problem was that keyword-based retrieval systems were returning irrelevant ads that hurt user experience and revenue. The solution involved fine-tuning a large language model on 700,000 human-labeled query-item pairs to generate relevance labels offline at scale, then training a compact DistilBERT-based small language model to perform low-latency online predictions. The production SLM uses a bi-encoder architecture with 64-dimensional embeddings and achieves 97% validation accuracy, resulting in a 5.2% relative gain in Precision@2 compared to the previous gradient boosted decision tree model."
link: "https://careersatdoordash.com/blog/small-language-models-to-serve-more-relevant-doordash-search-ads/"
year: 2026
seo:
  title: "Doordash: Small Language Models for Real-Time Ad Relevance Prediction - ZenML LLMOps Database"
  description: "DoorDash addressed the challenge of serving relevant sponsored search results by implementing a two-stage LLM and SLM approach for query-item relevance prediction. The problem was that keyword-based retrieval systems were returning irrelevant ads that hurt user experience and revenue. The solution involved fine-tuning a large language model on 700,000 human-labeled query-item pairs to generate relevance labels offline at scale, then training a compact DistilBERT-based small language model to perform low-latency online predictions. The production SLM uses a bi-encoder architecture with 64-dimensional embeddings and achieves 97% validation accuracy, resulting in a 5.2% relative gain in Precision@2 compared to the previous gradient boosted decision tree model."
  canonical: "https://www.zenml.io/llmops-database/small-language-models-for-real-time-ad-relevance-prediction"
  ogTitle: "Doordash: Small Language Models for Real-Time Ad Relevance Prediction - ZenML LLMOps Database"
  ogDescription: "DoorDash addressed the challenge of serving relevant sponsored search results by implementing a two-stage LLM and SLM approach for query-item relevance prediction. The problem was that keyword-based retrieval systems were returning irrelevant ads that hurt user experience and revenue. The solution involved fine-tuning a large language model on 700,000 human-labeled query-item pairs to generate relevance labels offline at scale, then training a compact DistilBERT-based small language model to perform low-latency online predictions. The production SLM uses a bi-encoder architecture with 64-dimensional embeddings and achieves 97% validation accuracy, resulting in a 5.2% relative gain in Precision@2 compared to the previous gradient boosted decision tree model."
notion:
  pageId: "384f8dff-2538-800d-8805-f6b90dedb02f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-19T11:04:00.000Z"
  lastEditedTime: "2026-06-19T11:04:00.000Z"
  publishedAt: "2026-06-22T14:46:04Z"
---

## Overview

DoorDash's case study presents a sophisticated production implementation of language models for real-time ad relevance prediction in their search platform. The company operates in the local commerce space where users search for items with specific intent, and the challenge is to serve sponsored results that genuinely match that intent rather than simply keyword matches. The case illustrates a practical approach to using large language models for offline supervision generation while deploying compact small language models for low-latency online inference—a pattern that addresses one of the most common LLMOps challenges: balancing model quality with serving constraints.

The fundamental problem DoorDash faced was that their keyword-based retrieval system, optimized for recall, would surface irrelevant sponsored items simply because of overlapping keywords. For example, a search for "salt" would return "Pringles Salt & Vinegar Potato Crisps Chips" as a result. While ranking models could optimize for personalization, they couldn't solve the core relevance problem—if a user has historically bought many chips, personalization would actually amplify the poor relevance match. This created a clear need for a dedicated relevance prediction task that operates independently of personalization and focuses on the semantic match between query and item.

## Problem Framing and Task Definition

A key strength of this implementation is how DoorDash framed the relevance prediction problem. They defined it as a user-agnostic, query-item matching task operating at high granularity. This explicitly contrasts with personalization, which relies on user purchase history and behavioral signals. The principle is that certain results are objectively irrelevant for all users—showing milk for a "chips" query is simply wrong regardless of user preferences. By isolating relevance at the query-item level, the team could reason more clearly about what the model should learn and how to apply explicit constraints.

The relevance labeling schema uses a three-level ordinal scale: 0 for irrelevant items that are completely disconnected from search intent, 1 for moderately relevant items that might be acceptable substitutes or secondary intent matches but lack specific attributes, and 2 for highly relevant items that precisely satisfy the search mission. This nuanced approach preserves partial matches rather than forcing everything into a binary relevant/irrelevant classification. The 0-1-2 scale gives the model a more sophisticated understanding of relevance degrees, which translates to more precise scoring at serving time. The relevance model acts as a gate in the ad serving pipeline—filtering out label 0 items to keep the auction fair while ensuring label 2 items are considered for prominent ad slots.

## Teacher-Student Architecture for Scalable Supervision

The core LLMOps innovation in this case study is the teacher-student pattern that separates offline label generation from online inference. Training a strong relevance model requires labeled examples of query-item pairs, but human labeling doesn't scale across a large and constantly changing catalog. Search systems face far too many query-item combinations to rely solely on manual annotation. DoorDash's solution was to use an LLM as a teacher model for generating supervision at scale.

The process began with human annotators labeling approximately 700,000 query-item pairs to create detailed guidelines and ground truth data. This human-labeled dataset was then used to fine-tune a closed-source LLM (the text doesn't specify which one, though mentions of GPT models for evaluation suggests it could be an OpenAI model) for the relevance prediction task. The fine-tuned LLM teacher achieved 86% accuracy on the three-class 0-1-2 classification task, with strongest agreement on clear positives and negatives. When combining moderately relevant and highly relevant items into a single positive class, the two-class accuracy reached approximately 91%, which is particularly important since filtering irrelevant items from the search funnel is the primary concern.

Once trained, this fine-tuned LLM was used to generate relevance labels offline for query-item pairs extracted from six months of real production traffic. This batch process runs offline without serving latency constraints, allowing the system to generate high-quality labels consistently at scale across millions of pairs—mirroring the judgment a human rater would make but at volumes that would be impractical to produce manually. The teacher model's role is purely to create scalable supervision; it never runs in the production serving path.

## Small Language Model for Production Inference

The production inference engine is a small language model based on DistilBERT, a compact BERT variant optimized for efficiency. The SLM is trained on the relevance labels generated offline by the fine-tuned LLM teacher, learning to reproduce those judgments in a form suitable for latency-constrained production serving. This architectural separation allows the system to benefit from stronger relevance judgments during training while maintaining strict latency requirements at inference time.

DoorDash chose a bi-encoder architecture specifically for its latency characteristics. In this design, the query and item are processed through two independent BERT-based encoder towers that each produce a dense vector representation. Critically, these embeddings are computed through an offline cron job and cached in a key-value store. During online serving, the system simply fetches these pre-computed embeddings and uses a bilinear layer to compute the relevance score. This separation of embedding generation from scoring is a common LLMOps pattern for reducing online latency—the heavy neural network computation happens offline, while online serving only performs lightweight operations.

The team conducted extensive architecture exploration to identify the right production configuration. They evaluated several BERT-based encoder backbones including DistilBERT, DeBERTa, RoBERTa, ALBERT, TinyBERT, and E5. They also explored different pooling strategies such as CLS pooling and mean pooling to understand quality-latency tradeoffs. Embedding dimensionality was another critical design consideration given strict serving latency constraints. The team explored compact representations that could preserve relevance quality while keeping online scoring efficient.

For dimensionality reduction, they evaluated two approaches: a direct linear projection layer on top of the encoder output and Matryoshka training, which is designed to produce embeddings that remain useful at smaller dimensionalities. Ultimately, they selected the direct linear projection approach because it provided the best balance of simplicity, efficiency, and production readiness for their use case. Through experimentation, they determined that 64-dimensional embeddings struck the optimal balance between relevance quality, dimensionality reduction, and serving latency.

The final production model configuration uses a DistilBERT bi-encoder with shared encoder weights for the query and item towers, CLS pooling, 64-dimensional embeddings, and an online bilinear layer for low-latency relevance scoring. The shared encoder weights are an interesting design choice—using the same encoder for both queries and items rather than separate encoders reduces model size and can improve generalization when the semantic space is similar.

## Training Infrastructure and Techniques

DoorDash trained these models using a distributed data parallel framework across multiple GPUs, which allowed them to scale training efficiently over their large relevance dataset. They used the AdamW optimizer, a variant of Adam with decoupled weight decay that often performs better for transformer models. Initially, they used cross-entropy loss, which is standard for classification tasks. However, they also evaluated the CORAL (COnsistent RAnk Logits) framework, an ordinal regression method that better reflects the ordered structure of the 0-1-2 relevance labels. Ordinal regression is particularly appropriate here because the labels have a natural ordering—2 is better than 1, which is better than 0—and the distance between labels matters semantically.

The final production checkpoint was selected based on validation accuracy, with the best-performing model reaching 97% accuracy. This is notably higher than the 86% achieved by the LLM teacher on the same task, which might seem counterintuitive at first. However, this is explained by the fact that the SLM is trained on a much larger dataset of LLM-generated labels rather than only the 700,000 human-labeled examples. The student model benefits from millions of consistent teacher labels, even if those labels aren't perfectly accurate. This also highlights a potential concern—the student model could be learning to reproduce the teacher's errors at scale, though the strong online A/B test results suggest this isn't a major issue in practice.

## Integration into the Serving Pipeline

The relevance model's placement in the overall ad serving pipeline required careful consideration to preserve system performance and reliability. DoorDash runs relevance scoring and quality scoring (which predicts click and conversion probability) in parallel since neither depends on the other's output. This parallel execution keeps the latency impact of adding the relevance layer close to zero—a critical LLMOps consideration for production systems with strict latency budgets.

The relevance filter is applied before the auction, which is an important sequencing decision. The auction determines which ad wins placement and what price is paid, so it should operate over a candidate set that has already been filtered for relevance. This prevents well-funded campaigns targeting irrelevant inventory from winning simply by bidding aggressively—irrelevant items are removed before the auction begins. This design choice reflects a business decision that relevance should be non-negotiable, not something that can be overcome with higher bids.

## Evaluation and Results

DoorDash assesses relevance using metrics such as Precision@2 and NDCG@10 (Normalized Discounted Cumulative Gain at position 10). Interestingly, they leverage fine-tuned GPT models to provide scalable and consistent measurement of result quality—using language models for evaluation is itself an emerging LLMOps pattern. The new SLM-based relevance model achieved a 5.2% relative gain in Precision@2 over the incumbent gradient boosted decision tree production model during online A/B testing.

While this improvement is meaningful, it's worth noting that the case study doesn't provide comprehensive metrics on other dimensions such as revenue impact, user engagement changes, or computational costs compared to the previous system. The focus on Precision@2 suggests improvement in serving more relevant ads at the top positions, but we don't see metrics on recall, false positive rates, or the percentage of queries affected. The case study also doesn't discuss failure modes, edge cases, or situations where the model struggles.

## Critical Assessment and LLMOps Considerations

From an LLMOps perspective, this case study demonstrates several mature practices. The teacher-student pattern is a pragmatic solution to the quality-latency tradeoff that dominates many production ML systems. By separating the "thinking" (offline label generation) from the "serving" (online inference), DoorDash can use sophisticated models for supervision while maintaining low latency in production. The bi-encoder architecture with pre-computed embeddings is another smart design choice that moves expensive computation offline.

However, there are some aspects that warrant careful consideration. The reliance on a closed-source LLM for the teacher model creates a dependency on external providers and potential reproducibility concerns. The team mentions exploring migration to fine-tuned open-source alternatives as future work, which would provide more control and transparency. There's also limited discussion of model monitoring and maintenance—how do they detect when the relevance model degrades? How often do they retrain? How do they handle catalog changes or seasonal variations in search behavior?

The 700,000 human-labeled examples represent a significant investment in data quality, but the case study doesn't discuss inter-annotator agreement, label quality control, or how they handle disagreements. The three-level labeling schema is intuitive, but borderline cases between levels 1 and 2 could be challenging even for human raters. The fact that the LLM teacher achieves 91% accuracy on the binary task but only 86% on the three-class task suggests the moderate relevance category is indeed harder to distinguish.

Another consideration is the potential for feedback loops. The relevance model filters what ads get shown, which affects what user behavior data gets collected, which could eventually influence future model training. The case study doesn't discuss how they guard against such feedback loops or ensure the model continues to explore the full space of potentially relevant items.

The evaluation using fine-tuned GPT models is innovative but also introduces its own questions—how do they ensure these evaluation models are unbiased? How do they validate that automated evaluation aligns with human judgment? Using LLMs to evaluate other LLMs is a common practice but requires careful calibration to avoid circular reasoning.

## Production Deployment Patterns

The case study exemplifies several important LLMOps deployment patterns. The use of cached embeddings in a key-value store is a standard approach for reducing online latency in embedding-based systems. The parallel execution of independent scoring models demonstrates good system design that minimizes latency overhead. The placement of the relevance filter before the auction shows thoughtful integration with business logic.

The distributed data parallel training across multiple GPUs indicates the team has the infrastructure to train models at scale, though they don't specify training time, computational costs, or how frequently models are retrained. The selection of DistilBERT over larger BERT variants shows appropriate prioritization of efficiency for the production use case—DistilBERT is specifically designed to retain most of BERT's performance while being significantly smaller and faster.

The exploration of multiple architectures (DistilBERT, DeBERTa, RoBERTa, ALBERT, TinyBERT, E5) and dimensionality reduction techniques demonstrates rigorous experimentation to find the right quality-latency tradeoff. This kind of systematic evaluation is essential for production ML but often omitted from case studies that focus only on the final solution.

## Future Directions and Open Questions

DoorDash mentions exploring migration to fine-tuned open-source alternatives for the teacher model, which would address some of the dependency concerns. Other potential future directions might include continual learning approaches to keep the model updated with changing catalogs and search patterns, multi-task learning to jointly optimize relevance with other objectives, or more sophisticated handling of the moderate relevance category.

The case study would benefit from more discussion of operational aspects such as model monitoring, A/B testing methodology, rollback procedures, and how they handle model updates in production. There's also opportunity for deeper analysis of failure modes and edge cases where the model struggles, which would provide valuable insights for others implementing similar systems.

Overall, this case study presents a technically sound and production-ready approach to using language models for relevance prediction in a latency-constrained environment. The teacher-student pattern, bi-encoder architecture, and careful attention to serving constraints demonstrate mature LLMOps practices. While some details about monitoring, maintenance, and failure modes are missing, the core technical approach is well-designed and addresses real business needs in DoorDash's ad serving platform.
