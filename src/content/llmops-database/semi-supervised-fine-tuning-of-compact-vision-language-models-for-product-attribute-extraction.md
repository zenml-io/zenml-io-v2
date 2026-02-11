---
title: "Semi-Supervised Fine-Tuning of Compact Vision-Language Models for Product Attribute Extraction"
slug: "semi-supervised-fine-tuning-of-compact-vision-language-models-for-product-attribute-extraction"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adb101934e1722917b531"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:47.186Z"
  createdOn: "2025-12-23T18:10:24.088Z"
llmopsTags:
  - "classification"
  - "structured-output"
  - "multi-modality"
  - "fine-tuning"
  - "few-shot"
  - "model-optimization"
  - "instruction-tuning"
  - "token-optimization"
  - "pytorch"
  - "open-source"
  - "google-gcp"
  - "openai"
industryTags: "e-commerce"
company: "Flipkart"
summary: "Flipkart faced the challenge of accurately extracting product attributes (like color, pattern, and material) from millions of product listings at scale. Manual labeling was expensive and error-prone, while using large Vision Language Model APIs was cost-prohibitive. The company developed a semi-supervised approach using compact VLMs (2-3 billion parameters) that combines Parameter-Efficient Fine-Tuning (PEFT) with Direct Preference Optimization (DPO) to leverage unlabeled data. The method starts with a small labeled dataset, generates multiple reasoning chains for unlabeled products using self-consistency, and then fine-tunes the model using DPO to favor preferred outputs. Results showed accuracy improvements from 75.1% to 85.7% on the Qwen2.5-VL-3B-Instruct model across twelve e-commerce verticals, demonstrating that compact models can effectively learn from unlabeled data to achieve production-grade performance."
link: "https://blog.flipkart.tech/the-future-of-e-commerce-how-ai-is-learning-to-describe-products-with-less-data-8dfbf05f83a1"
year: 2025
seo:
  title: "Flipkart: Semi-Supervised Fine-Tuning of Compact Vision-Language Models for Product Attribute Extraction - ZenML LLMOps Database"
  description: "Flipkart faced the challenge of accurately extracting product attributes (like color, pattern, and material) from millions of product listings at scale. Manual labeling was expensive and error-prone, while using large Vision Language Model APIs was cost-prohibitive. The company developed a semi-supervised approach using compact VLMs (2-3 billion parameters) that combines Parameter-Efficient Fine-Tuning (PEFT) with Direct Preference Optimization (DPO) to leverage unlabeled data. The method starts with a small labeled dataset, generates multiple reasoning chains for unlabeled products using self-consistency, and then fine-tunes the model using DPO to favor preferred outputs. Results showed accuracy improvements from 75.1% to 85.7% on the Qwen2.5-VL-3B-Instruct model across twelve e-commerce verticals, demonstrating that compact models can effectively learn from unlabeled data to achieve production-grade performance."
  canonical: "https://www.zenml.io/llmops-database/semi-supervised-fine-tuning-of-compact-vision-language-models-for-product-attribute-extraction"
  ogTitle: "Flipkart: Semi-Supervised Fine-Tuning of Compact Vision-Language Models for Product Attribute Extraction - ZenML LLMOps Database"
  ogDescription: "Flipkart faced the challenge of accurately extracting product attributes (like color, pattern, and material) from millions of product listings at scale. Manual labeling was expensive and error-prone, while using large Vision Language Model APIs was cost-prohibitive. The company developed a semi-supervised approach using compact VLMs (2-3 billion parameters) that combines Parameter-Efficient Fine-Tuning (PEFT) with Direct Preference Optimization (DPO) to leverage unlabeled data. The method starts with a small labeled dataset, generates multiple reasoning chains for unlabeled products using self-consistency, and then fine-tunes the model using DPO to favor preferred outputs. Results showed accuracy improvements from 75.1% to 85.7% on the Qwen2.5-VL-3B-Instruct model across twelve e-commerce verticals, demonstrating that compact models can effectively learn from unlabeled data to achieve production-grade performance."
---

## Overview

Flipkart, one of India's largest e-commerce platforms, published research at ICCV 2025 Workshop on Curated Data for Efficient Learning addressing a critical production challenge: extracting product attributes from millions of catalog items at scale. The case study presents a sophisticated approach to deploying Vision Language Models (VLMs) in production environments where labeled training data is scarce but unlabeled data is abundant. This work is particularly notable because it focuses on compact, production-ready models rather than relying on expensive API calls to large commercial models, making it a pragmatic example of LLMOps in a resource-constrained, high-throughput environment.

The fundamental business problem Flipkart addresses is the accurate cataloging of product attributes—features like color, pattern, material, and style—that are essential for search, recommendation systems, and customer experience. With millions of products across diverse verticals (sandals, sarees, suitcases, watches, and more), manual attribute extraction becomes prohibitively expensive and prone to human error. While large VLM APIs like GPT-4 Vision or Gemini could automate this process, the cost at Flipkart's scale would be astronomical, making such solutions impractical for production deployment. This creates the classic LLMOps challenge: how to build performant, cost-effective AI systems that operate at massive scale while maintaining quality.

## Technical Architecture and Model Selection

Flipkart's solution centers on using compact VLMs in the 2-3 billion parameter range, specifically models like Qwen2.5-VL-3B-Instruct. This choice reflects a key LLMOps principle: selecting models that balance performance with operational constraints. Smaller models offer several production advantages including faster inference times, lower computational costs, reduced memory footprint, and easier deployment at scale. However, these models typically have less inherent capability than their larger counterparts, which makes the fine-tuning strategy crucial for achieving production-grade performance.

The system architecture leverages multimodal input processing where multiple product images are combined with attribute metadata and passed to the VLM for prediction. This mirrors real-world e-commerce scenarios where products are typically photographed from multiple angles to give customers a comprehensive view. The model must learn to synthesize information across these different visual perspectives along with any textual context to make accurate attribute predictions.

## Training Strategy: Semi-Supervised Learning with Label-Efficient Fine-Tuning

The core innovation in Flipkart's approach lies in their semi-supervised training strategy that maximizes the use of unlabeled data. The training process unfolds in multiple stages, each carefully designed to address specific LLMOps challenges.

The initial phase involves supervised fine-tuning using Parameter-Efficient Fine-Tuning (PEFT) techniques. Rather than fine-tuning the entire model, which would be computationally expensive and risk catastrophic forgetting, they train only small adapter modules. This approach is particularly important in production settings where you need to maintain a base model that can potentially serve multiple tasks while customizing it for specific use cases. The initial labeled dataset is relatively small—just 10 labeled listings per vertical—which was created using a large multimodal model to generate ground truth labels. This bootstrapping approach is common in LLMOps where you might use a more expensive, capable model to create training data for a more efficient production model.

## Direct Preference Optimization for Self-Improvement

The most sophisticated aspect of the system is the use of Direct Preference Optimization (DPO) for leveraging unlabeled data. Traditional supervised learning requires explicit labels, which are expensive to obtain. Self-learning approaches where models train on their own predictions can lead to "model collapse" where errors compound over iterations. DPO offers a middle ground that has proven effective in production LLM deployments.

The DPO process works by having the model generate multiple reasoning chains for each unlabeled product. These reasoning chains represent the model "thinking out loud" before producing a final attribute prediction. Using a self-consistency mechanism, the system identifies the most frequently occurring answer across these multiple generations—this becomes the "preferred" output while the alternatives are labeled as "dis-preferred." The model is then fine-tuned to increase the probability of preferred reasoning chains while decreasing the probability of dis-preferred ones.

This approach is particularly clever from an LLMOps perspective because it creates a form of weak supervision from unlabeled data without requiring human annotation. The self-consistency mechanism acts as a proxy for correctness under the assumption that if a model consistently arrives at the same answer through different reasoning paths, that answer is more likely to be correct. This is a production-worthy heuristic that balances accuracy with scalability.

The DPO loss function directly optimizes the model to align with these preferences, which has been shown in the broader LLM literature to be more stable than alternatives like reinforcement learning from human feedback (RLHF). For a production system, stability during training is crucial—you need predictable, reproducible results without extensive hyperparameter tuning or the risk of training instability that could waste computational resources or produce degraded models.

## Iterative Self-Improvement and Production Deployment Considerations

The training process is iterative, meaning the model goes through multiple cycles of generating pseudo-labels and fine-tuning with DPO. Each iteration potentially improves the model's capability to extract attributes accurately. This iterative refinement approach is common in production ML systems where initial deployments may have moderate performance that improves over time as the system processes more data and learns from its predictions.

From an operational standpoint, this semi-supervised approach dramatically reduces the human annotation burden. Rather than requiring labeled data for every product, the system needs only a small seed dataset and can then leverage the vast amount of unlabeled catalog data that naturally exists in any e-commerce platform. This makes the solution economically viable at scale—a critical consideration for any production AI system.

## Performance Results and Production Validation

The empirical results demonstrate the effectiveness of the approach across real production scenarios. Starting from a baseline accuracy of 75.1% with the pre-trained Qwen2.5-VL-3B-Instruct model after initial supervised fine-tuning, the DPO-based approach achieved 85.7% accuracy—a substantial improvement of over 10 percentage points. This improvement was consistent across twelve different e-commerce verticals, suggesting the method generalizes well across different product types with varying visual and attribute characteristics.

Critically, the research showed that increasing the amount of unlabeled data led to steady accuracy improvements, indicating the approach scales well with data availability—exactly what you want in a production system where data continues to accumulate. The experiments also revealed that simpler self-learning approaches, where the model is retrained directly on its own high-confidence predictions, actually degraded performance for smaller models. This finding validates the choice of DPO over more naive semi-supervised approaches and highlights the importance of careful method selection in production LLMOps.

## Comparison with Alternatives and Critical Assessment

The paper positions this work against several alternatives that are relevant to production deployments. Using large VLM APIs directly would likely provide higher accuracy but at prohibitive cost and with potential latency issues given the need to make external API calls for millions of products. Training larger models in-house would require substantial computational infrastructure and longer inference times. The compact VLM approach with sophisticated fine-tuning represents a pragmatic middle ground.

However, we should note some limitations and considerations that any production deployment would need to address. The reported accuracy of 85.7%, while impressive given the constraints, still means roughly one in seven attribute predictions may be incorrect. Depending on the business context, this error rate might require human verification for certain high-value or sensitive products. The paper doesn't discuss false positive versus false negative rates, which matter differently for different attributes—being wrong about a product's color might have different business implications than being wrong about its material.

The iterative training process, while effective, adds complexity to the MLOps pipeline. You need to manage multiple training cycles, track performance across iterations, and determine when to stop iterating. The paper doesn't detail how many iterations were performed or how to determine optimal stopping points, which would be important operational considerations. Additionally, the self-consistency mechanism requires generating multiple outputs per input, which increases inference cost during the pseudo-labeling phase, though the authors note these are compact models suitable for real-time deployment.

## Broader LLMOps Implications and Production Readiness

This case study exemplifies several important LLMOps principles for production systems. First, it demonstrates the value of task-specific fine-tuning over relying solely on general-purpose model capabilities. While foundation models are powerful, production applications often benefit from specialization to particular domains and tasks. Second, it shows how to balance model capability with operational constraints—choosing smaller models and investing in better training strategies rather than simply using the largest available model.

The use of semi-supervised learning addresses a common production reality: labeled data is expensive while unlabeled data is plentiful. Finding ways to leverage unlabeled data effectively can be a competitive advantage for organizations deploying LLMs at scale. The Parameter-Efficient Fine-Tuning approach also reflects production best practices around model customization—you want to adapt models to specific tasks without the computational overhead and risks associated with full model fine-tuning.

From a deployment perspective, compact VLMs in the 2-3 billion parameter range are practical for production environments. They can run on reasonable GPU infrastructure, provide acceptable inference latency, and scale to handle high throughput. The multimodal nature of the task—combining multiple product images with metadata—is representative of real-world AI applications where information comes from multiple sources and modalities.

## Model Monitoring and Continuous Improvement

While not explicitly detailed in the paper, this system would require ongoing monitoring in production. Attribute extraction accuracy would need to be tracked across different product categories, with particular attention to new product types or categories that weren't well-represented in training data. The distribution of product types in an e-commerce catalog evolves over time—new fashion trends emerge, new product categories are added, and the visual characteristics of products change. A production system would need mechanisms to detect when performance degrades and trigger retraining or adaptation.

The semi-supervised nature of the approach actually provides a natural pathway for continuous improvement. As the catalog grows and evolves, the unlabeled data pool expands, providing material for ongoing DPO-based fine-tuning. New labeled data could be collected strategically for areas where the model shows low confidence or known errors, creating a virtuous cycle of improvement.

## Technical Infrastructure and Tooling

While the paper focuses on the algorithmic approach, deploying such a system in production would require substantial infrastructure. You need data pipelines to process product images and metadata, model serving infrastructure to handle inference at scale, systems for orchestrating the multi-stage training process, and monitoring dashboards to track performance. The choice of compact VLMs suggests Flipkart likely deploys these models on their own infrastructure rather than relying on third-party APIs, which gives them more control over latency, cost, and data privacy.

The Parameter-Efficient Fine-Tuning approach using adapters is consistent with modern LLMOps practices where base models might be shared across multiple tasks or continuously updated, while task-specific adapters provide customization. This modular approach to model deployment can simplify MLOps workflows and make it easier to experiment with different model versions or fine-tuning strategies.

## Conclusion and Production Value

Flipkart's approach to product attribute extraction using compact VLMs represents a sophisticated, production-oriented solution to a real business problem. By combining Parameter-Efficient Fine-Tuning, Direct Preference Optimization, and self-consistency mechanisms, they've created a system that can learn from limited labeled data while leveraging abundant unlabeled data. The substantial accuracy improvements and demonstrated scalability across multiple product categories suggest this is a viable production approach, not just an academic exercise.

The case study is valuable for the LLMOps community because it tackles the real constraints of production deployments: cost, latency, data availability, and scalability. Rather than assuming unlimited computational resources or perfectly labeled datasets, it works within realistic constraints and still achieves meaningful business value. The iterative self-improvement mechanism provides a pathway for the system to continue getting better over time, which is essential for long-lived production AI systems operating in evolving environments like e-commerce catalogs.