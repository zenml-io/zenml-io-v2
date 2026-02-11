---
title: "Large Foundation Model for Unified Recommendation and Ranking at Scale"
slug: "large-foundation-model-for-unified-recommendation-and-ranking-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "687e016c459acab5f701f3b9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:15:21.776Z"
  createdOn: "2025-07-21T08:59:24.253Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "structured-output"
  - "realtime-application"
  - "fine-tuning"
  - "prompt-engineering"
  - "few-shot"
  - "model-optimization"
  - "knowledge-distillation"
  - "instruction-tuning"
  - "token-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "system-prompts"
  - "vllm"
  - "pytorch"
  - "fastapi"
  - "cache"
  - "monitoring"
  - "scaling"
  - "orchestration"
  - "microsoft-azure"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn developed a large foundation model called \"Brew XL\" with 150 billion parameters to unify all personalization and recommendation tasks across their platform, addressing the limitations of task-specific models that operate in silos. The solution involved training a massive language model on user interaction data through \"promptification\" techniques, then distilling it down to smaller, production-ready models (3B parameters) that could serve high-QPS recommendation systems with sub-second latency. The system demonstrated zero-shot capabilities for new tasks, improved performance on cold-start users, and achieved 7x latency reduction with 30x throughput improvement through optimization techniques including distillation, pruning, quantization, and sparsification."
link: "https://www.youtube.com/watch?v=U0S6CfzAY5c"
year: 2025
seo:
  title: "LinkedIn: Large Foundation Model for Unified Recommendation and Ranking at Scale - ZenML LLMOps Database"
  description: "LinkedIn developed a large foundation model called \"Brew XL\" with 150 billion parameters to unify all personalization and recommendation tasks across their platform, addressing the limitations of task-specific models that operate in silos. The solution involved training a massive language model on user interaction data through \"promptification\" techniques, then distilling it down to smaller, production-ready models (3B parameters) that could serve high-QPS recommendation systems with sub-second latency. The system demonstrated zero-shot capabilities for new tasks, improved performance on cold-start users, and achieved 7x latency reduction with 30x throughput improvement through optimization techniques including distillation, pruning, quantization, and sparsification."
  canonical: "https://www.zenml.io/llmops-database/large-foundation-model-for-unified-recommendation-and-ranking-at-scale"
  ogTitle: "LinkedIn: Large Foundation Model for Unified Recommendation and Ranking at Scale - ZenML LLMOps Database"
  ogDescription: "LinkedIn developed a large foundation model called \"Brew XL\" with 150 billion parameters to unify all personalization and recommendation tasks across their platform, addressing the limitations of task-specific models that operate in silos. The solution involved training a massive language model on user interaction data through \"promptification\" techniques, then distilling it down to smaller, production-ready models (3B parameters) that could serve high-QPS recommendation systems with sub-second latency. The system demonstrated zero-shot capabilities for new tasks, improved performance on cold-start users, and achieved 7x latency reduction with 30x throughput improvement through optimization techniques including distillation, pruning, quantization, and sparsification."
---

## Overview

LinkedIn developed a comprehensive LLMOps solution to address the fragmentation and inefficiencies of their existing recommendation systems. The company recognized that their traditional approach of building separate, task-specific models for different surfaces (feed recommendations, job matching, search, etc.) was time-consuming, resource-intensive, and prevented leveraging the most advanced architectures across all use cases. The initiative aimed to create a single, unified foundation model that could handle all personalization tasks on the LinkedIn platform while providing zero-shot capabilities for new applications.

The technical challenge was substantial: LinkedIn needed to process tens of thousands of queries per second (QPS) with sub-second latency requirements (400-500 milliseconds), while maintaining the quality and personalization that users expect from recommendation systems. The solution involved building what they called "Brew XL," a 150 billion parameter foundation model, and then creating a sophisticated production pipeline to distill and optimize it for real-world deployment.

## Technical Architecture and Model Development

The core innovation lies in what LinkedIn calls "promptification" - the process of converting all user interaction data, profiles, and contextual information into structured prompts that a language model can process. This approach transforms traditional recommendation problems into natural language tasks where the model receives instructions about what to recommend, information about the user's profile and interaction history, and then generates predictions about user preferences or behaviors.

The development pipeline follows a sophisticated multi-stage approach starting with open-source models as the foundation. The team implements "upcycling" techniques to control model size and balance throughput versus quality trade-offs. The training process involves continuous pre-training, fine-tuning, instruction fine-tuning, and alignment phases to create the large Brew XL model with 150 billion parameters.

One of the most critical insights from LinkedIn's experience is that the "go big then go small" approach is essential for success. They extensively tested whether smaller models could be trained directly from scratch but found that this approach consistently underperformed. The large model serves as a teacher that possesses the reasoning capacity and world knowledge necessary to handle complex personalization tasks, which can then be distilled into smaller, more efficient models.

## Model Distillation and Compression Strategy

The distillation process represents a significant LLMOps challenge and innovation. Rather than attempting to distill directly from the 150B parameter model to the final production size, LinkedIn implements a gradual, step-by-step distillation approach. They systematically reduce model size through intermediate steps - from 150B to 8B, then to 3B, and finally to 1B parameters. This gradual approach proves much more effective than aggressive single-step distillation, maintaining model quality while achieving the necessary size reductions.

The distillation process is complemented by gradual pruning techniques. Pruning involves reducing the number of attention heads in transformers, decreasing MLP layers, and optimizing the overall architecture based on the observation that transformer models contain significant redundancy. However, aggressive pruning early in the process leads to substantial performance degradation (up to 1% quality loss), so LinkedIn implements an iterative approach: small pruning steps followed by distillation, repeated multiple times to achieve the desired compression without quality loss.

## Quantization and Mixed Precision Optimization

LinkedIn implements sophisticated quantization strategies using FP8 precision for both model parameters and activations. However, they discovered that applying FP8 quantization uniformly across all layers significantly degrades model performance. Their solution involves mixed precision approaches where different components of the model operate at different precision levels based on their sensitivity to quantization effects.

A critical insight for recommendation systems is that the language model head - the final layer that produces probability distributions over potential recommendations - must remain in FP32 precision. Using lower precision (FP16, BF16, or FP8) in this component causes numerical instability and poor calibration, making it impossible to effectively distinguish between different recommended items. This finding highlights the importance of understanding domain-specific requirements when optimizing LLMs for production deployment.

## Attention Sparsification and Serving Optimizations

The attention mechanism, being the most computationally expensive component of transformers, receives particular attention in LinkedIn's optimization strategy. They implement sparsification techniques based on the insight that not every token needs to attend to every other token, especially in recommendation contexts where the task structure is well-understood.

For multi-item scoring scenarios, LinkedIn processes up to 500 candidate items simultaneously while preventing them from attending to each other through specialized attention masks. Items only attend to user profile information and interaction history, not to other candidate items. This approach requires custom kernel development in serving frameworks like SGLang and vLLM, demonstrating the level of systems engineering required for production LLM deployment.

The serving infrastructure must balance multiple constraints including maintaining KV cache efficiency, supporting high throughput requirements, and preserving the chronological ordering that proves most effective for recommendation tasks. While the team experimented with more sophisticated approaches like retrieval-augmented generation (RAG) to select relevant historical interactions, they found that chronological ordering combined with appropriate positive/negative sampling provides the best balance of effectiveness and serving efficiency.

## Performance Results and Generalization Capabilities

LinkedIn's results demonstrate significant improvements in several key areas. For cold-start users - those with limited interaction history - the foundation model approach shows increasing advantages as the number of user interactions decreases. This improvement stems from the model's ability to leverage world knowledge and patterns learned from the broader user base, addressing one of the most challenging problems in recommendation systems.

The zero-shot generalization capabilities prove particularly valuable for rapid feature deployment. The model demonstrates competitive or superior performance on four completely out-of-domain tasks that were never seen during training, matching or exceeding the performance of task-specific production models. This capability significantly reduces the time-to-market for new recommendation features, as teams can leverage the foundation model immediately rather than collecting data and training specialized models.

## Scaling Laws and Optimization Levers

LinkedIn's comprehensive experimentation reveals several scaling relationships that inform LLMOps decisions. Data scaling shows consistent performance improvements as more historical interaction data is incorporated, suggesting that longer retention periods and more comprehensive logging strategies can directly improve model quality.

Model size scaling experiments using Mixtral architectures demonstrate clear performance gains when moving from 7B to 8x22B parameters, reinforcing the importance of the large teacher model in their distillation pipeline. Perhaps most importantly for recommendation systems, context length emerges as a critical factor. Longer contexts allow the model to consider more user interaction history, leading to better personalization. However, they observe performance degradation at very long contexts, likely due to the base model's limited training on extended sequences rather than the information becoming less relevant.

## Production Engineering and Automation

The complexity of LinkedIn's LLMOps pipeline necessitates extensive automation to make the system manageable and enable rapid experimentation. Their automation framework handles everything from model training and evaluation to result aggregation and reporting. When researchers modify quantization parameters or other optimization settings, the entire pipeline executes automatically, with results populated into shared tracking systems.

This automation proves crucial for the iterative optimization process required to balance the multiple constraints of production deployment: model quality, inference latency, throughput requirements, and resource costs. The team leverages open-source tools like Lightning and various serving frameworks but invests heavily in integration and workflow automation to create a cohesive development environment.

## Challenges and Considerations

While LinkedIn presents impressive results, several challenges and limitations merit consideration. The approach requires substantial computational resources, both for training the large teacher models and for the extensive experimentation needed to optimize the distillation and serving pipeline. The 150 billion parameter teacher model represents a significant infrastructure investment that may not be accessible to all organizations.

The serving optimizations, while effective, require deep technical expertise and custom kernel development. The attention sparsification and mixed precision strategies are highly specialized and may not generalize easily to other domains or architectures. Additionally, the approach is specifically designed for LinkedIn's user engagement patterns and data characteristics, and the generalization to other platforms or recommendation domains remains to be demonstrated.

The cold-start improvements, while significant, are demonstrated within LinkedIn's ecosystem and user base. The effectiveness of the approach for entirely new domains or user populations outside the training distribution requires further validation. Similarly, the zero-shot capabilities are tested on tasks that, while not seen during training, remain within the general domain of professional networking and content recommendation.

LinkedIn's LLMOps implementation represents a sophisticated approach to productionizing large language models for recommendation systems, but it requires significant investment in infrastructure, expertise, and ongoing optimization to achieve the reported performance improvements.