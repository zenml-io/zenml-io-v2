---
title: "Rebuilding Query Understanding for E-Commerce Search with LLMs"
slug: "rebuilding-query-understanding-for-e-commerce-search-with-llms"
draft: false
llmopsTags:
  - "question-answering"
  - "classification"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "fine-tuning"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "model-optimization"
  - "knowledge-distillation"
  - "token-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "pytorch"
  - "cache"
  - "scaling"
  - "monitoring"
  - "meta"
  - "nvidia"
industryTags: "e-commerce"
company: "Instacart"
summary: "Instacart revamped their query understanding system to better handle the diverse and often imperfect search queries from millions of users. Traditional machine learning models struggled with long-tail queries, lacked labeled data, and required maintaining multiple specialized systems for different tasks. By adopting a layered LLM strategy combining retrieval-augmented generation (RAG), prompt engineering with guardrails, and fine-tuning smaller models, Instacart consolidated their query understanding pipeline into a unified system. This approach improved coverage from 50% to over 95% for query rewrites, achieved 96.4% precision for semantic role labeling on tail queries, and reduced user scroll depth by 6% while cutting complaints about poor search results by 50%."
link: "https://tech.instacart.com/building-the-intent-engine-how-instacart-is-revamping-query-understanding-with-llms-3ac8051ae7ac"
year: 2025
seo:
  title: "Instacart: Rebuilding Query Understanding for E-Commerce Search with LLMs - ZenML LLMOps Database"
  description: "Instacart revamped their query understanding system to better handle the diverse and often imperfect search queries from millions of users. Traditional machine learning models struggled with long-tail queries, lacked labeled data, and required maintaining multiple specialized systems for different tasks. By adopting a layered LLM strategy combining retrieval-augmented generation (RAG), prompt engineering with guardrails, and fine-tuning smaller models, Instacart consolidated their query understanding pipeline into a unified system. This approach improved coverage from 50% to over 95% for query rewrites, achieved 96.4% precision for semantic role labeling on tail queries, and reduced user scroll depth by 6% while cutting complaints about poor search results by 50%."
  canonical: "https://www.zenml.io/llmops-database/rebuilding-query-understanding-for-e-commerce-search-with-llms"
  ogTitle: "Instacart: Rebuilding Query Understanding for E-Commerce Search with LLMs - ZenML LLMOps Database"
  ogDescription: "Instacart revamped their query understanding system to better handle the diverse and often imperfect search queries from millions of users. Traditional machine learning models struggled with long-tail queries, lacked labeled data, and required maintaining multiple specialized systems for different tasks. By adopting a layered LLM strategy combining retrieval-augmented generation (RAG), prompt engineering with guardrails, and fine-tuning smaller models, Instacart consolidated their query understanding pipeline into a unified system. This approach improved coverage from 50% to over 95% for query rewrites, achieved 96.4% precision for semantic role labeling on tail queries, and reduced user scroll depth by 6% while cutting complaints about poor search results by 50%."
notion:
  pageId: "344f8dff-2538-8059-8eff-c297b0dc833b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-16T13:21:00.000Z"
  lastEditedTime: "2026-04-16T13:21:00.000Z"
  publishedAt: "2026-04-20T06:51:33Z"
---

## Overview

Instacart's case study describes their comprehensive transformation of query understanding (QU) for their e-commerce search platform using large language models. The company processes millions of search queries daily from users who often type imperfect phrases like "bread no gluten" or "x large zip lock," requiring sophisticated interpretation to deliver relevant results. This case study provides an extensive view into how Instacart moved from traditional machine learning approaches to a production LLM system, with detailed insights into their architectural decisions, optimization strategies, and the tradeoffs they navigated.

The project represents a strategic shift from building bespoke models to leveraging pre-trained foundation models, with the company framing their approach as "standing on the shoulder of giants." Their three-pronged strategy combines context engineering through RAG, post-processing guardrails to filter hallucinations, and fine-tuning to embed proprietary domain knowledge directly into model weights. This transformation addressed fundamental challenges in traditional query understanding while establishing a new foundation for real-time LLM inference at scale.

## Business Context and Problem Statement

Instacart's query understanding system serves as the "intent engine" powering search for their grocery delivery platform. The challenges they faced with traditional approaches were multifaceted and representative of common issues in production ML systems. Broad queries like "healthy food" or "frozen snacks" proved difficult to action because they span dozens of categories without specificity. The lack of labeled data created a particularly thorny problem—query understanding operates upstream of user actions, so the team relied on noisy pseudo-labels derived from user behavior where someone might search for "bread" but ultimately purchase bananas.

Long-tail queries presented perhaps the most significant challenge. Highly specific searches like "red hot chili pepper spice" or "2% reduced-fat ultra-pasteurized chocolate milk" suffered from data sparsity, as models trained on engagement data struggled with limited historical signals. The existing system architecture compounded these issues through complexity: multiple independent models handled individual QU tasks, with query classification using FastText for multi-label classification and query rewrites generated by a completely separate system mining user session behavior. This heterogeneity introduced inconsistencies, slowed development cycles, and made the overall system difficult to scale and evolve.

## Strategic Approach to LLM Integration

Instacart's strategy centered on leveraging the world knowledge and inference capabilities embedded in pre-trained LLMs while systematically adding Instacart-specific domain context. The team recognized that foundation models already understand relationships like "Italian parsley" being synonymous with "flat parsley" or "curly parsley" being a common substitute—knowledge that would require extensive manual engineering in traditional systems. This provided a powerful head start, but the real value came from making these generalist models into domain specialists.

The company articulated a clear hierarchy of effectiveness for incorporating domain knowledge: fine-tuning proved most effective, followed by context engineering through RAG, with basic prompting as the baseline. Each method progressively transforms a generalist model into a domain expert, though with different engineering tradeoffs. Their production system demonstrates all three approaches, applied strategically based on use case requirements, latency constraints, and cost considerations.

## Query Category Classification Implementation

The query category classification system illustrates their context engineering approach. Instacart's product catalog contains a vast hierarchical taxonomy organizing billions of items from broad departments like "Meat" down to specific sub-categories like "Beef Ribs > Short Ribs." Their legacy multi-class classification model would predict top-K categories from a flat list, outputting predictions like ("Dairy", 0.95) and ("Milk", 0.92) for a query like "butter milk." This approach suffered from noise in conversion-based training data and lacked contextual understanding for novel queries like "vegan roast."

The LLM-powered replacement implements a three-step process combining retrieval, LLM reasoning, and validation. First, they retrieve the top-K converted categories for each query as initial candidates. Second, an LLM re-ranks these candidates with injected Instacart-specific context about their product taxonomy and historical conversions. Finally, a post-processing guardrail computes semantic similarity scores between embeddings of the original query and the predicted category path, discarding any pair falling below their relevance threshold. This demonstrates a thoughtful balance between leveraging LLM capabilities and maintaining control through validation layers—a key pattern in production LLM systems.

## Query Rewrites with Specialized Prompts

For query rewrites, Instacart evolved from a simple initial approach to a sophisticated multi-model system. Their legacy system mined candidate rewrites from user session data but covered only 50% of search traffic and often failed to generate useful alternatives for product discovery. An initial LLM experiment with a simple prompt asking for "rewrites for recall enhancement" proved too ambiguous—for "1% milk," the model would return "one percent milk," technically correct but not useful for discovering alternative products.

This led to designing specialized prompts for three distinct rewrite types: substitutes, broader queries, and synonyms. Each type receives a dedicated prompt incorporating advanced prompt engineering techniques including specific instructions, chain-of-thought reasoning, and few-shot examples. Post-processing guardrails filter results for semantic relevance, ensuring logical and useful outputs. This structured approach increased coverage to over 95% with 90%+ precision across all three types. The team has since enhanced this with context engineering, injecting user engagement signals like top-converting product categories from subsequent searches in the same session to make rewrites more convertible, personalized, and session-aware.

## Hybrid Architecture for Semantic Role Labeling

The semantic role labeling system represents the most sophisticated production architecture in the case study, demonstrating how Instacart balances the power of large models with the practical constraints of real-time serving. SRL extracts structured concepts from queries—product, brand, and attributes—which are critical for search retrieval, ranking, ad targeting, and filters. The challenge stemmed from search traffic's power-law distribution: they can't pre-compute results for every possible query because the long tail of unique searches is effectively infinite, and offline LLM processing at scale is expensive.

Their solution is an elegant hybrid system where traffic routing depends simply on a cache hit. For high-frequency "head" queries, an offline RAG pipeline generates high-quality tags that populate a low-latency cache. For cache misses indicating long-tail queries, traffic routes to a fast, fine-tuned model trained on data generated by the offline pipeline. This architecture serves dual purposes: the offline "teacher" system both handles the bulk of traffic efficiently and generates the training curriculum for the real-time "student" model.

The offline system exemplifies their context engineering approach through sophisticated RAG. Consider the query "verdant machine"—without context, an LLM might assume it relates to machinery. The offline pipeline enriches prompts with crucial Instacart-specific context including historical conversion data showing top converted brands and categories, plus product catalog information with brand names ranked by embedding similarity scores. Armed with this context, the model correctly infers that "verdant machine" refers to a smoothie brand (the fictitious "MuchPure" in their example, with "Smoothie Juices" as the category). Post-processing guardrails validate tags against their catalog, ensuring quality before caching results and adding them to the training dataset.

## Fine-Tuning and Model Distillation

The real-time "student" model demonstrates Instacart's fine-tuning capabilities and represents a foundational capability they've built for future applications. They fine-tuned an open-source Llama-3-8B model using LoRA (Low-Rank Adaptation) on the high-quality dataset from their offline teacher pipeline. This distills the knowledge and nuanced context from the larger model into a smaller, more efficient one suitable for real-time inference.

The results validated their approach: the fine-tuned 8B model performs on par with the much larger frontier model it learned from, achieving similar F1-scores with actually higher precision (96.4% vs 95.4%), slightly lower recall (95% vs 96.2%), and equivalent F1 score (95.7% vs 95.8%). This demonstrates that model distillation through fine-tuning can capture the reasoning capabilities of larger models when trained on high-quality, context-enriched data. The case study emphasizes that this wasn't just a win for one project but established a blueprint for future LLM applications across their platform.

## Production Engineering and Optimization

Having a performant model represents only half the battle—serving it in production with latency targets in the low hundreds of milliseconds required significant engineering effort. Out-of-the-box latency with A100 GPUs was nearly 700ms, far above their requirements. They achieved their target through a series of optimizations that provide valuable insights into real-world LLM deployment challenges.

Adapter merging combined with hardware upgrades delivered the most significant improvement. By merging the LoRA adapter weights directly into the base model and upgrading to H100 GPUs, they reached their 300ms latency target. They explored quantization to FP8, which reduced latency by another 10% but introduced a slight drop in recall. After evaluating this tradeoff, they deployed the unquantized model prioritizing quality over the marginal latency improvement. For cost management, they implemented GPU autoscaling to run on fewer GPUs during off-peak hours, reducing operational costs without compromising performance during peak traffic.

The caching strategy proved crucial for overall system economics. Because only the bottom 2% of queries (cache misses on tail queries) required real-time LLM inference, the hybrid architecture kept costs manageable while delivering comprehensive coverage. This demonstrates a key principle in production LLM systems: carefully architecting when and where expensive model inference occurs can make the difference between a viable and an unviable production system.

## Production Impact and Validation

A/B testing confirmed meaningful improvements across multiple dimensions. For tail queries now receiving LLM-based semantic role labeling, they observed a 6% reduction in average scroll depth, meaning users find relevant items faster. This came with only marginal latency increases, validating that their optimization work maintained acceptable user experience. User complaints related to poor search results for tail queries dropped by 50%, a strong signal of improved search quality for these previously problematic queries.

The system now serves millions of cold-start queries weekly, demonstrating production scale. Query rewrite coverage expanded from 50% to over 95% with maintained precision above 90% across all three rewrite types. These metrics indicate that the LLM approach didn't just improve quality for edge cases but fundamentally expanded the capability of their query understanding system.

## Critical Assessment and Tradeoffs

While Instacart presents compelling results, several aspects warrant balanced consideration. The case study focuses heavily on their successes but provides limited discussion of failures or experiments that didn't work. For instance, they mention their initial simple prompting approach for query rewrites failed, but don't detail other dead ends they likely encountered. This is common in technical blog posts meant to showcase success, but practitioners should recognize that their path likely involved more trial and error than presented.

The cost discussion remains somewhat opaque. While they mention GPU autoscaling and managing costs, they don't provide specific numbers comparing their LLM-based system to the legacy approach. The claim that consolidating multiple models into a single LLM "reduces maintenance" is plausible but incomplete—the new system introduces different complexity in prompt engineering, guardrail development, and fine-tuning pipelines that may shift rather than eliminate maintenance burden.

Their hybrid architecture with caching for head queries and real-time inference for tail queries is elegant but introduces its own complexity. Managing cache invalidation when product catalogs change, ensuring consistency between the offline and online models, and monitoring for drift between the teacher and student models all represent ongoing operational challenges not fully explored in the case study.

The reliance on post-processing guardrails as a safety net raises questions about how often these guardrails reject LLM outputs and what happens when they do. If rejection rates are high, it suggests the base LLM approach may not be as robust as presented. If rejection rates are low, it raises questions about whether the guardrails provide meaningful value or represent unnecessary complexity.

## Key Learnings and LLMOps Principles

Instacart articulates several valuable principles from their experience. Their hierarchy of effectiveness—fine-tuning over context engineering over prompting—aligns with broader industry understanding but their concrete implementation provides a useful reference. The emphasis on domain context as "the defensible moat" rather than the model itself reflects an important strategic insight: foundation models are commodities, but proprietary data and domain knowledge create competitive advantage.

Their "start offline, go real-time strategically" approach demonstrates pragmatic thinking about proving value and managing costs before committing to expensive real-time infrastructure. The offline pipeline handled bulk traffic cost-effectively while generating training data for the student model, enabling them to build capabilities incrementally rather than requiring a complete system replacement upfront.

The point that "the model is only half the battle" resonates with production LLM experience broadly. Adapter merging for 30% latency reduction, smart caching so only 2% of queries need real-time inference, and GPU autoscaling for cost management represent the unglamorous but critical work that separates research experiments from production systems. These engineering details often receive less attention than model architecture but determine whether LLM applications actually ship.

## Technical Architecture Patterns

Several reusable patterns emerge from Instacart's implementation. The teacher-student architecture where an expensive offline model generates training data for a cheaper online model provides a template for managing the cost-quality tradeoff in LLM systems. The use of semantic similarity scores as validation guardrails demonstrates a practical approach to grounding LLM outputs in measurable criteria rather than relying solely on the model's internal representations.

Their approach to prompt engineering—moving from generic prompts to specialized prompts for different intent types, incorporating chain-of-thought reasoning and few-shot examples—shows a maturity curve that other teams implementing LLMs might expect to follow. The evolution from simple prompting to sophisticated context engineering through RAG to fine-tuning represents a natural progression as teams build expertise and identify where generic capabilities fall short.

The emphasis on retrieval-augmented generation throughout multiple use cases (category classification, query rewrites, semantic role labeling) highlights RAG as a fundamental pattern for productionizing LLMs in domains with proprietary data. Their implementation demonstrates that effective RAG requires not just retrieving relevant information but thoughtfully structuring how that information gets presented in prompts and validated in outputs.

## Future Directions and Broader Context

Instacart positions this work as foundational for future capabilities beyond single-query search. They envision building context-aware systems that understand entire user journeys, distinguishing between searches for "lasagna ingredients" (item search), "quick lasagna recipe" (content discovery), and "lasagna delivery near me" (restaurant search). This reflects a broader industry trend toward LLMs enabling more natural, intent-based interactions rather than keyword matching.

The fine-tuning infrastructure they've built represents reusable capability applicable to other problems across their platform. By establishing patterns for data generation, model training, optimization, and deployment, they've created a playbook for future LLM applications rather than a one-off solution. This institutional learning and capability building may ultimately prove more valuable than the specific query understanding improvements.

The case study illustrates how major technology companies are approaching LLM adoption: not as wholesale replacement of existing systems but as strategic enhancement of specific components where traditional approaches fall short. Their focus on long-tail queries and consolidation of heterogeneous systems addresses real pain points rather than pursuing LLM applications for their own sake. This pragmatic approach, combined with rigorous measurement through A/B testing, demonstrates mature MLOps practices adapted to the LLM era.
