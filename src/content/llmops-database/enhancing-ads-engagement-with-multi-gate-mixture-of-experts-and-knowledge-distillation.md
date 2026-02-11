---
title: "Enhancing Ads Engagement with Multi-gate Mixture-of-Experts and Knowledge Distillation"
slug: "enhancing-ads-engagement-with-multi-gate-mixture-of-experts-and-knowledge-distillation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "681b12cad4ecc34e92c7e3f1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:07:39.111Z"
  createdOn: "2025-05-07T07:59:06.883Z"
llmopsTags:
  - "classification"
  - "structured-output"
  - "model-optimization"
  - "knowledge-distillation"
  - "pytorch"
  - "tensorflow"
  - "microsoft-azure"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest improved their ads engagement modeling by implementing a Multi-gate Mixture-of-Experts (MMoE) architecture combined with knowledge distillation techniques. The system faced challenges with short data retention periods and computational efficiency, which they addressed through mixed precision inference and lightweight gate layers. The solution resulted in significant improvements in both offline accuracy and online metrics while achieving a 40% reduction in inference latency."
link: "https://medium.com/pinterest-engineering/multi-gate-mixture-of-experts-mmoe-model-architecture-and-knowledge-distillation-in-ads-08ec7f4aa857"
year: 2025
seo:
  title: "Pinterest: Enhancing Ads Engagement with Multi-gate Mixture-of-Experts and Knowledge Distillation - ZenML LLMOps Database"
  description: "Pinterest improved their ads engagement modeling by implementing a Multi-gate Mixture-of-Experts (MMoE) architecture combined with knowledge distillation techniques. The system faced challenges with short data retention periods and computational efficiency, which they addressed through mixed precision inference and lightweight gate layers. The solution resulted in significant improvements in both offline accuracy and online metrics while achieving a 40% reduction in inference latency."
  canonical: "https://www.zenml.io/llmops-database/enhancing-ads-engagement-with-multi-gate-mixture-of-experts-and-knowledge-distillation"
  ogTitle: "Pinterest: Enhancing Ads Engagement with Multi-gate Mixture-of-Experts and Knowledge Distillation - ZenML LLMOps Database"
  ogDescription: "Pinterest improved their ads engagement modeling by implementing a Multi-gate Mixture-of-Experts (MMoE) architecture combined with knowledge distillation techniques. The system faced challenges with short data retention periods and computational efficiency, which they addressed through mixed precision inference and lightweight gate layers. The solution resulted in significant improvements in both offline accuracy and online metrics while achieving a 40% reduction in inference latency."
---

## Summary

Pinterest's Ads Engagement Modeling team developed an advanced Multi-gate Mixture-of-Experts (MMoE) architecture combined with knowledge distillation techniques to improve their ads ranking and user engagement prediction systems. This case study represents a significant production ML engineering effort focused on making neural network models more efficient, scalable, and accurate in a web-scale advertising context. While this is not strictly an LLM-focused case study, it represents best practices in production ML systems that are directly applicable to LLMOps scenarios, particularly around model architecture optimization, inference efficiency, and knowledge transfer techniques.

## Problem Context

The Pinterest team faced two interconnected challenges in their ads engagement modeling pipeline. First, they encountered a common issue with DCNv2-style recommendation models: simply adding more layers and parameters did not yield proportional gains in prediction accuracy. This scaling limitation is a well-known challenge in deep learning systems, where model capacity increases do not automatically translate to improved performance. The team needed a more sophisticated approach to enable their models to learn complex patterns in user-ad engagement behavior.

Second, the team dealt with practical data retention constraints typical in large-scale production ML systems. Due to the massive volume of engagement data, Pinterest retains training data for relatively short periods (typically a few months to a year). This creates a significant problem when deploying new experimental models: the training data used by the current production model is no longer available, making fair comparisons between old and new models difficult. This "data drift" problem is common across production ML systems, including those involving large language models.

## MMoE Architecture Implementation

The Multi-gate Mixture-of-Experts architecture represents a modular approach to neural network design where multiple specialized sub-networks (called "experts") are combined through a gating mechanism. The core principle is that different experts can specialize in different aspects of the input data, and the gates learn to route inputs to the most relevant experts. This selective activation reduces computational overhead while improving model expressiveness.

Pinterest's team started from their existing shared-bottom DCNv2 architecture and experimented with various expert configurations. They tested multiple architectures including DCNv2, MaskNet, and FinalMLP, as well as simpler MLP-based experts. Interestingly, they found that adding MLP-based experts could further lift offline metrics even when combined with more sophisticated architectures. Through careful experimentation, they determined that DCNv2 offered the highest return on investment for their use case.

The gating mechanism is a critical component of MMoE. The team discovered that gate layers could be implemented with very simple architectures and small parameter counts while still achieving comparable performance to more sophisticated designs. This finding is particularly relevant for production deployments, as lightweight gates significantly reduce computational costs without sacrificing accuracy.

A key insight from this work is the importance of metrics-infrastructure cost tradeoffs. Rather than maximizing model complexity, the team carefully selected expert combinations that balanced performance improvements against serving costs. This practical approach to model design is essential for sustainable production ML systems.

## Infrastructure Cost Optimization

Deploying MMoE-style models introduces additional computational overhead due to the multiple expert networks. Pinterest addressed this through several techniques, most notably mixed precision inference. The team had previously developed and productionized mixed precision inference capabilities, which they could apply directly to the MMoE deployment. Their experiments verified that mixed precision inference had nearly zero impact on model offline performance.

The infrastructure benefits were substantial: mixed precision inference resulted in a 40% reduction in inference latency during benchmarking. This latency reduction translates directly to significant infrastructure cost savings at Pinterest's scale. The approach demonstrates how operational optimizations can make more complex architectures viable for production deployment.

The lightweight gate architecture also contributed to cost reduction. By keeping gating mechanisms simple, the team avoided the computational overhead that would have come from sophisticated gate designs, making the overall MMoE deployment more economically sustainable.

## Knowledge Distillation Strategy

The knowledge distillation component addresses the data retention challenge described earlier. When experimental models are ready for online testing, the training data from the production model may no longer be available. To mitigate this, the team distills knowledge from the production model to help new experimental models "learn" from data that has been deleted.

The implementation adds a distillation loss to the standard cross-entropy loss calculated from binary labels. This additional loss measures prediction differences between the experimental model and the production model. The team experimented with various loss functions and found that pairwise-style losses not only mitigated performance gaps from missing data but also boosted experimental model offline metrics further.

A critical operational finding relates to when distillation should be applied. The team discovered that distillation works well during batch training but causes significant overfitting when applied during incremental training. As a result, they removed the distillation loss during the incremental training stage. This distinction between batch and incremental training phases is an important consideration for production ML pipelines.

The team also identified that knowledge distillation helps in scenarios where no metric movement is expected, such as feature upgrades or computation graph improvements for latency reduction. In these cases, warm-starting from a production checkpoint may not be possible, and retraining the production model suffers from the same data availability issues. Knowledge distillation ensures that retrained models maintain on-par offline and online performance.

## Evaluation and Results

The evaluation compared the MMoE model with knowledge distillation against the baseline production model using DCNv2 architecture. Tests were conducted across different view types, specifically RelatedPins and Search interfaces. The team emphasizes that in their engagement ranking models, a 0.1% improvement in offline accuracy is considered significant given the scale of Pinterest's operations.

The results showed that the MMoE architecture with knowledge distillation increased both offline and online metrics very significantly, exceeding the 0.1% threshold that indicates meaningful improvement. While specific numbers are cited as Pinterest Internal Data from 2024, the qualitative assessment suggests substantial gains in ads matching quality and user experience.

## Production ML Best Practices

This case study illustrates several production ML best practices that are broadly applicable, including to LLMOps contexts. The careful consideration of infrastructure costs alongside model performance reflects the reality that production systems must be economically sustainable. The use of mixed precision inference demonstrates how hardware-level optimizations can enable more sophisticated models in production.

The knowledge distillation approach provides a template for handling data retention limitations that are common in production environments, whether dealing with recommendation models or large language models. The finding that distillation should be applied differently in batch versus incremental training stages highlights the importance of understanding training dynamics in production pipelines.

The experimentation methodology—testing multiple expert architectures and carefully evaluating ROI—exemplifies the iterative, empirical approach necessary for production ML development. Rather than assuming that more sophisticated architectures are always better, the team validated each component's contribution to the overall system.

## Limitations and Considerations

It's worth noting that this case study comes from Pinterest's engineering blog and naturally presents their work in a favorable light. While the results appear impressive, the specific metric improvements are referenced as internal data without detailed public disclosure. The claims about "significant" improvements should be evaluated in the context that Pinterest has strong incentives to present positive results.

Additionally, the multi-task learning capabilities of MMoE, while mentioned as a benefit, are not deeply explored in this particular case study. The focus remains primarily on the efficiency and knowledge transfer aspects rather than demonstrating complex multi-task scenarios.

Despite these caveats, the case study provides valuable insights into production-grade ML architecture decisions and operational optimizations that are relevant to practitioners working on similar scale systems, including those deploying and operating large language models in production environments.