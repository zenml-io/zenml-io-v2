---
title: "Inside Meta's AI optimization platform for engineers across the company"
slug: "meta-fblearner-inside-metas-ai-optimization-platform-for-engineers-across-the-company"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "mlflow"
  - "ray"
  - "sagemaker"
  - "ab-testing"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "shadow-deployment"
  - "training"
industryTags: "media-entertainment"
company: "Meta"
companySlug: "meta"
platformName: "FBLearner"
contentType: "blog"
summary: "Meta built Looper, an end-to-end AI optimization platform designed to enable software engineers without machine learning backgrounds to deploy and manage AI-driven product optimizations at scale. The platform addresses the challenge of embedding AI into existing products by providing declarative APIs for optimization, personalization, and feedback collection that abstract away the complexities of the full ML lifecycle. Looper supports both supervised and reinforcement learning for diverse use cases including ranking, personalization, prefetching, and value estimation. As of 2022, the platform hosts 700 AI models serving 90+ product teams, generating 4 million predictions per second with only 15 percent of adopting teams having dedicated AI engineers, demonstrating successful democratization of ML capabilities across Meta's engineering organization."
link: "https://ai.meta.com/blog/looper-meta-ai-optimization-platform-for-engineers/"
year: 2022
seo:
  title: "Meta: Inside Meta's AI optimization platform for engineers across the company - ZenML MLOps Database"
  description: "Meta built Looper, an end-to-end AI optimization platform designed to enable software engineers without machine learning backgrounds to deploy and manage AI-driven product optimizations at scale. The platform addresses the challenge of embedding AI into existing products by providing declarative APIs for optimization, personalization, and feedback collection that abstract away the complexities of the full ML lifecycle. Looper supports both supervised and reinforcement learning for diverse use cases including ranking, personalization, prefetching, and value estimation. As of 2022, the platform hosts 700 AI models serving 90+ product teams, generating 4 million predictions per second with only 15 percent of adopting teams having dedicated AI engineers, demonstrating successful democratization of ML capabilities across Meta's engineering organization."
  canonical: "https://www.zenml.io/mlops-database/meta-fblearner-inside-metas-ai-optimization-platform-for-engineers-across-the-company"
  ogTitle: "Meta: Inside Meta's AI optimization platform for engineers across the company - ZenML MLOps Database"
  ogDescription: "Meta built Looper, an end-to-end AI optimization platform designed to enable software engineers without machine learning backgrounds to deploy and manage AI-driven product optimizations at scale. The platform addresses the challenge of embedding AI into existing products by providing declarative APIs for optimization, personalization, and feedback collection that abstract away the complexities of the full ML lifecycle. Looper supports both supervised and reinforcement learning for diverse use cases including ranking, personalization, prefetching, and value estimation. As of 2022, the platform hosts 700 AI models serving 90+ product teams, generating 4 million predictions per second with only 15 percent of adopting teams having dedicated AI engineers, demonstrating successful democratization of ML capabilities across Meta's engineering organization."
mlops:
  source: "sqlite"
  entryId: 5
  sourceUrl: "https://ai.meta.com/blog/looper-meta-ai-optimization-platform-for-engineers/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060372"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Meta faced a critical challenge in scaling AI capabilities across its engineering organization: while AI-driven optimization often outperforms hand-crafted heuristics for product decisions, deploying and maintaining ML models required specialized expertise that most product teams lacked. The company needed to enable billions of users to receive personalized experiences across diverse services without requiring every engineering team to rebuild their products around complex ML infrastructure.

Several specific pain points motivated the creation of Looper. Product teams needed to accommodate software engineers without machine learning backgrounds while still enabling sophisticated AI-driven optimizations. The system had to optimize for diverse product goals that didn't always map cleanly to standard machine learning loss functions—metrics like user engagement, resource efficiency, or long-term retention couldn't always be reduced to simple supervised learning tasks. Engineers needed mechanisms to distinguish causal connections from spurious correlations in observational data. The platform also had to scale efficiently to train, host, and monitor potentially hundreds of models simultaneously while operating on real-time inference rather than batch processing.

Traditional heavyweight AI platforms designed for vision, speech, and NLP workloads favored offline batch inference and required significant infrastructure investment per model. Meta needed something different: a platform for moderate-sized models that could be retrained and deployed quickly in large numbers on shared infrastructure, with fast onboarding, robust deployment, and low-effort maintenance. The metadata patterns in product data changed rapidly, necessitating regular retraining on fresh data, and different products had very different metadata schemas often sourced from multiple systems.

## Architecture and Design

Looper is architected as a declarative end-to-end AI platform that abstracts the full machine learning lifecycle behind high-level APIs. The declarative approach means product engineers only need to specify what functionality they want, and the platform automatically fills in the implementation details. This design choice fundamentally distinguishes Looper from imperative ML platforms where engineers must explicitly configure pipelines and infrastructure.

At the core of Looper's architecture is the "strategy blueprint" abstraction, which combines configurations for features, labels, models, and decision policies into a single cohesive unit. Blueprints maintain multiple versions of these joint configurations, capturing compatibility relationships between versions and enabling coding-free management of the entire smart strategy lifecycle. This abstraction supports comprehensive optimization across the full stack and enables vertical optimization of black-box product metrics that may not have closed-form mathematical definitions.

The platform separates application code from platform code, allowing product teams to focus on their domain-specific logic while Looper handles the undifferentiated heavy lifting of ML infrastructure. This separation enables the platform to leverage existing horizontal AI frameworks—specifically PyTorch for model training and inference, and Ax for adaptive experimentation and Bayesian optimization. Models are interchangeable within the platform, allowing automatic selection of model types based on the task definition.

Looper supports a comprehensive range of machine learning tasks including classification, estimation, value prediction, sequence prediction, ranking, and planning. It accommodates both supervised learning (where each decision can be checked and used as a training example) and reinforcement learning (for optimizing long-term cumulative objectives). The platform interprets user-interaction and system-interaction metadata flexibly as either labels for supervised learning or rewards for reinforcement learning depending on the use case.

A critical architectural component is the experiment optimization system, which enables A/B testing across many different model types and decision rules. This includes contextual bandits for modeling prediction uncertainty across multiple objectives, and reinforcement learning policies for long-term optimization. The platform extends the traditional notion of "end-to-end" ML systems into the software layer itself, allowing optimization of not just model parameters but also feature selection, model architecture choices, and the multiobjective tradeoffs between model quality and computational resource consumption.

AutoML tooling is deeply integrated into the architecture, automatically selecting models and hyperparameters to balance competing concerns like model quality, model size, and inference latency. Product developers define the decision space, and the platform handles model type selection and hyperparameter tuning based on that specification.

The platform includes comprehensive monitoring and evaluation infrastructure integrated with Meta's broader monitoring systems. Models are trained and evaluated on live data without user impact through shadow deployment. Newly trained models undergo canary testing on shadow traffic—they're evaluated on sampled subsets of logged features and observations with offline quality metrics (such as mean squared error for regression tasks) computed before promotion to production. This prevents degradation when deploying updated models.

## Technical Implementation

Looper builds on Meta's existing horizontal AI infrastructure rather than creating parallel systems. PyTorch serves as the primary framework for model training and inference, providing flexibility in model architecture while maintaining compatibility with Meta's broader ML ecosystem. The Ax platform, Meta's open-source adaptive experimentation framework, powers the Bayesian optimization and hyperparameter tuning capabilities.

The platform operates with real-time inference rather than batch processing, a critical implementation choice driven by product requirements. While offline batch inference might be acceptable for heavyweight models in vision or NLP, Looper's use cases demand immediate responses to user actions and system events. This real-time constraint influenced infrastructure choices around serving latency, model complexity, and resource allocation.

Data pipelines are automatically generated based on blueprint configurations rather than requiring engineers to write custom database queries and ETL code. The platform handles logging infrastructure, capturing both features used for inference and outcomes observed after decisions are made. This logged data feeds back into training pipelines for model refinement.

The implementation prioritizes moderate data sizes and model complexity, deliberately targeting a different part of the complexity spectrum than platforms designed for frontier models. This focus allows optimization for fast iteration cycles—adopters report configuring initial models in just a couple of days and launching refined products within months.

Monitoring and alerting systems detect unforeseen side effects by tracking both model performance metrics and product impact metrics. The platform provides access to Meta's broader monitoring infrastructure, allowing teams to observe how models behave in production and identify issues before they significantly impact users.

The system maintains model registries tracking multiple versions of blueprints along with their compatibility relationships. This versioning enables safe rollbacks, gradual rollouts, and experimentation with model updates without disrupting production services.

## Scale and Performance

Looper operates at substantial scale serving Meta's diverse product portfolio. As of the 2022 publication, the platform hosts 700 AI models deployed by over 90 product teams across the company. These models generate 4 million predictions per second, demonstrating the platform's capacity for high-throughput real-time inference.

The scale of adoption is particularly notable given that only 15 percent of the teams using Looper include dedicated AI engineers. This means 85 percent of adopting teams successfully deploy production ML systems without specialized ML expertise, validating the platform's democratization goals.

Application use cases span five categories with varying adoption levels. Personalized experiences represent the most common use case, where products tailor interfaces and content based on user engagement history. Ranking applications order candidate items to optimize user utility, such as personalizing content feeds. Prefetching and precomputing workloads predict likelihood of resource usage to optimize caching strategies. Notification and prompt systems target messages to users most likely to find them valuable. Value estimation tasks predict continuous variables like latency or memory usage for query planning.

The platform manages 690 deployed models (the slight discrepancy from 700 total models likely reflects models in development or canary testing). These models handle diverse inference loads across different product contexts, with shared infrastructure supporting the full portfolio rather than dedicated resources per model.

Performance metrics around onboarding and time-to-production demonstrate efficiency gains from platform automation. Teams configure initial models in approximately two days, begin collecting training data immediately, and launch refined products within months. This represents a dramatic acceleration compared to building bespoke ML infrastructure for each use case.

Resource consumption analysis across active Looper use cases shows meaningful efficiency gains, though specific percentage improvements aren't quantified in the source material. The platform's AutoML capabilities optimize the multiobjective tradeoff between model quality and computational resource usage, automatically balancing accuracy against serving costs.

## Trade-offs and Lessons

Looper's design reflects deliberate trade-offs that illuminate important lessons for building ML platforms at scale. The platform explicitly targets moderate-sized models with moderate data complexity rather than attempting to serve all possible ML workloads. This focused scope enables optimizations and abstractions that wouldn't work for frontier models requiring massive compute resources or highly specialized infrastructure. The trade-off is intentional: by not trying to be all things to all users, Looper achieves superior developer experience and operational efficiency for its target use cases.

The declarative API represents a significant usability versus control trade-off. Engineers gain rapid deployment and minimal configuration burden but sacrifice fine-grained control over infrastructure and implementation details. For teams without ML expertise, this trade-off strongly favors the declarative approach—they value working AI functionality over customization they lack expertise to leverage. For experienced ML engineers, the platform still provides productivity benefits by automating repetitive tasks like database queries, pipeline setup, and monitoring configuration, though they may occasionally desire more control than the abstractions provide.

Real-time inference requirements drove important architectural decisions with inherent trade-offs. Real-time serving enables immediate personalization and responsiveness to user actions but constrains model complexity and increases infrastructure costs compared to batch processing. The platform addresses this through careful optimization of model size and inference latency, using AutoML to find efficient points in the quality-speed tradeoff space.

The strategy blueprint abstraction demonstrates the value of co-optimizing features, models, and decision policies as unified configurations rather than treating them as independent concerns. This holistic approach captures compatibility relationships and enables more comprehensive optimization, but requires more sophisticated platform machinery to manage versions and dependencies. The investment in this abstraction paid off through reduced coordination overhead and cleaner lifecycle management.

Integration with existing horizontal platforms (PyTorch, Ax) rather than building custom alternatives represents a pragmatic architectural choice. Looper benefits from ongoing improvements to these foundational tools and maintains compatibility with Meta's broader ML ecosystem, but depends on their capabilities and limitations. This integration strategy reduced development effort and improved interoperability while accepting some constraints on customization.

The emphasis on causal inference and product impact evaluation addresses a critical challenge in production ML: optimizing for metrics that matter rather than proxy objectives. By extending optimization into the software layer and supporting long-term cumulative objectives through reinforcement learning, Looper helps teams optimize for actual business outcomes. However, this requires more sophisticated experimentation infrastructure and longer evaluation cycles compared to simple offline metrics.

Shadow deployment and canary testing before production rollout reflect hard-won lessons about model degradation risks. The automated quality checks prevent silent failures where updated models perform worse than their predecessors, but add operational complexity and deployment latency. Teams accept this overhead as necessary insurance against production incidents.

The platform's success with teams lacking ML expertise validates the democratization hypothesis: sufficiently well-designed abstractions can enable sophisticated AI capabilities without requiring deep technical knowledge. However, this doesn't eliminate the need for ML expertise at the platform level—Looper's team must deeply understand ML systems to build abstractions that hide complexity appropriately. The lesson is that centralized expertise can serve many teams through good platform design.

Product teams particularly value the comprehensive support for impact evaluation through causal inference and resource overhead measurement. This suggests that in production settings, understanding and optimizing for real-world impact matters more than achieving marginal improvements in offline model metrics. Platforms should invest heavily in evaluation and experimentation infrastructure, not just training and serving.

The spectrum of AI expertise across adopting teams—from complete beginners to experienced engineers—demonstrates that a well-designed platform can serve heterogeneous user populations. Beginners need easy onboarding and high-level abstractions, while experts value automation of repetitive work. Looper accommodates both by layering abstractions appropriately and automating undifferentiated infrastructure work that even experts would rather avoid.

Fast iteration cycles emerge as critical for adoption and success. Teams that can configure models in days and launch products in months maintain momentum and build confidence in AI approaches. Platforms that require months of upfront investment create barriers to experimentation and learning. The lesson is to optimize for time-to-first-value even if it means accepting some technical debt or suboptimal initial configurations that can be refined later.

The separation of application and platform code enables sustainable scaling by preventing proliferation of bespoke infrastructure. Without clear boundaries, each team might build custom solutions that become maintenance burdens. The platform approach concentrates expertise and spreads maintenance costs across all users, creating economies of scale in infrastructure investment.
