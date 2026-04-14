---
title: "ML Product Experiments at Scale"
slug: "yelp-yelps-ml-platform-ml-product-experiments-at-scale"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "model-serving"
  - "monitoring"
  - "ab-testing"
  - "deployment"
  - "model-evaluation"
  - "serving"
industryTags: "media-entertainment"
company: "Yelp"
companySlug: "yelp"
platformName: "Yelp's ML platform"
contentType: "video"
summary: "Yelp built Bunsen, a custom experimentation platform that enables the company to run over 700 concurrent experiments across all data, AI, and machine learning initiatives. The platform evolved from traditional digital product A/B testing to support complex ML-powered use cases, allowing data scientists to deploy experiments to large segmented customer populations with rollback capabilities. The development required advanced techniques, cross-functional collaboration between product, engineering, and ML teams, and a unique design approach to build robust experimentation workflows directly into production machine learning deployments."
link: "https://twimlai.com/conf/twimlcon/2021/session/ml-product-experiments-at-scale/"
year: 2021
seo:
  title: "Yelp: ML Product Experiments at Scale - ZenML MLOps Database"
  description: "Yelp built Bunsen, a custom experimentation platform that enables the company to run over 700 concurrent experiments across all data, AI, and machine learning initiatives. The platform evolved from traditional digital product A/B testing to support complex ML-powered use cases, allowing data scientists to deploy experiments to large segmented customer populations with rollback capabilities. The development required advanced techniques, cross-functional collaboration between product, engineering, and ML teams, and a unique design approach to build robust experimentation workflows directly into production machine learning deployments."
  canonical: "https://www.zenml.io/mlops-database/yelp-yelps-ml-platform-ml-product-experiments-at-scale"
  ogTitle: "Yelp: ML Product Experiments at Scale - ZenML MLOps Database"
  ogDescription: "Yelp built Bunsen, a custom experimentation platform that enables the company to run over 700 concurrent experiments across all data, AI, and machine learning initiatives. The platform evolved from traditional digital product A/B testing to support complex ML-powered use cases, allowing data scientists to deploy experiments to large segmented customer populations with rollback capabilities. The development required advanced techniques, cross-functional collaboration between product, engineering, and ML teams, and a unique design approach to build robust experimentation workflows directly into production machine learning deployments."
mlops:
  source: "sqlite"
  entryId: 102
  sourceUrl: "https://twimlai.com/conf/twimlcon/2021/session/ml-product-experiments-at-scale/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061409"
  lastUpdated: "2026-04-14 10:05:31"
---

## Problem Context

Yelp faced the fundamental challenge of scaling experimentation across a diverse technology landscape that included traditional product features, data-driven initiatives, and increasingly complex machine learning systems. The company needed a unified approach to experimentation that could serve the needs of data scientists, product managers, and engineers working on both conventional A/B tests and sophisticated ML-powered features. As Yelp's ML capabilities matured, the limitations of traditional digital product experimentation systems became apparent when attempting to validate ML models and features in production.

The core pain points that motivated building Bunsen centered around several key challenges. First, Yelp needed to support experimentation at significant scale, managing hundreds of concurrent experiments without creating conflicts or degrading the user experience. Second, the company required the ability to segment experiments intelligently across different parts of their customer population, recognizing that Yelp's diverse user base and business ecosystem demanded more sophisticated targeting than simple random assignment. Third, data scientists needed the flexibility to safely deploy ML experiments with confidence, including the critical ability to roll back experiments if they produced unexpected or negative results.

Perhaps most importantly, Yelp recognized that adapting a traditional A/B testing framework designed for product features to support ML experimentation required fundamentally different capabilities. ML experiments involve more complex metrics, longer feedback loops, potential model drift, and the need to evaluate statistical significance across multiple dimensions simultaneously. The intersection of product experimentation and ML deployment created unique requirements that existing tools couldn't adequately address.

## Architecture & Design

Bunsen represents Yelp's custom-built experimentation platform designed from the ground up to serve as the unified infrastructure for all data, AI, and ML experiments across the organization. The platform's architecture needed to accommodate both traditional product experiments and the more complex requirements of ML-powered features, creating a flexible foundation that could support diverse experimental paradigms.

The platform's design emphasizes several core architectural principles. It provides centralized experiment management and configuration, allowing teams across Yelp to define, launch, monitor, and analyze experiments through a consistent interface. This centralization ensures that experiments don't interfere with each other and that the platform can intelligently manage the allocation of users to different experimental conditions.

Segmentation capabilities form a crucial component of Bunsen's architecture. Rather than simple random assignment, the platform enables sophisticated targeting that allows experiments to be deployed to specific, often large, subsets of Yelp's customer population. This segmentation capability is particularly important for ML experiments where models may perform differently across user segments, geographic regions, or business contexts.

The rollback mechanism represents another critical architectural feature. Data scientists can configure experiments with monitoring criteria and trigger conditions that enable rapid rollback if an experiment begins producing negative outcomes. This safety mechanism is particularly vital for ML deployments where models might exhibit unexpected behavior in production that wasn't apparent during offline evaluation.

The platform integrates directly with Yelp's production ML deployment infrastructure, creating tight coupling between experimentation and serving. This integration allows ML models to be deployed as experimental variants, with the platform handling traffic routing, metrics collection, and statistical analysis automatically.

## Technical Implementation

While the source material doesn't provide extensive detail about specific frameworks and technologies, the description makes clear that Bunsen was custom-built rather than assembled from off-the-shelf tools. This decision reflects Yelp's assessment that existing experimentation platforms couldn't adequately support the unique requirements of ML experimentation at their scale.

The implementation required what the presentation describes as "advanced techniques" to bridge the gap between traditional A/B testing and ML experimentation. These techniques likely include sophisticated statistical methods for analyzing experiments with multiple metrics, handling the temporal dynamics of ML model performance, and managing the interaction effects between concurrent experiments.

The cross-functional nature of the implementation is explicitly emphasized. Building Bunsen required deep collaboration between product teams who understood user experience and business metrics, engineering teams responsible for infrastructure and reliability, and ML teams who brought expertise in model deployment and evaluation. This collaborative approach ensured that the platform could serve the practical needs of all stakeholders rather than optimizing for a single perspective.

The design approach is characterized as "unique," suggesting that Yelp developed novel solutions to problems that weren't adequately addressed in the existing literature or commercial tools. This innovation likely focused on the specific challenges of ML experimentation, such as handling the continuous nature of ML model updates, managing feature dependencies, and evaluating experiments where the treatment effect might vary significantly across different contexts.

## Scale & Performance

The most concrete metric provided in the source material is that Bunsen supports over 700 concurrent experiments at any given time. This represents significant scale in experimentation infrastructure, indicating that the platform must handle complex allocation logic, prevent experiment interactions, and manage statistical power across hundreds of simultaneous tests.

The scale encompasses "nearly all data experimentation at Yelp," suggesting that Bunsen serves as the de facto standard for experimentation across the entire organization. This breadth of adoption indicates that the platform successfully generalized beyond its initial use cases to serve diverse experimental needs.

The platform supports experiments deployed to "large but segmented parts of Yelp's customer population," indicating that individual experiments can involve substantial traffic volumes while still maintaining precise targeting. This combination of scale and segmentation sophistication suggests robust infrastructure capable of handling high-throughput decision-making for experiment assignment.

The successful operation of 700+ concurrent experiments implies that Bunsen effectively manages the statistical challenges of multiple testing, likely implementing sophisticated correction methods or hierarchical testing frameworks to maintain experimental validity while supporting this level of concurrency.

## Trade-offs & Lessons

The presentation explicitly focuses on "lessons learned and best practices for building robust experimentation workflows into production machine learning deployments," suggesting that Yelp's journey with Bunsen yielded significant insights for the broader ML community.

The decision to build a custom platform rather than adopt existing tools represents a significant trade-off. Custom development requires substantial engineering investment and ongoing maintenance, but Yelp clearly determined that the benefits of a purpose-built solution outweighed these costs. This suggests that organizations with similar scale and ML maturity might face a "build versus buy" decision where existing experimentation platforms fall short of ML-specific requirements.

The emphasis on cross-functional collaboration highlights an organizational lesson: effective ML experimentation infrastructure cannot be built in isolation by a single team. Product, engineering, and ML perspectives must all inform the design to create a platform that serves real-world needs. This collaborative requirement represents both a best practice and a potential organizational challenge for teams attempting similar initiatives.

The integration of rollback capabilities directly into the experimentation platform reflects a lesson about the risks of ML deployment. Unlike traditional product features where negative impacts might be immediately obvious, ML models can degrade in subtle ways that require systematic monitoring and rapid response capabilities. Building safety mechanisms into the experimentation layer itself, rather than treating them as separate concerns, likely proved essential for maintaining user trust and platform reliability.

The adaptation of A/B testing frameworks to ML use cases required "advanced techniques," suggesting that naive application of traditional experimentation methods to ML deployments is insufficient. Organizations embarking on similar efforts should expect to develop or adopt specialized methodologies that account for the unique characteristics of ML systems, including model updates, feature dependencies, and the potential for complex interaction effects.

The scale achieved by Bunsen—700+ concurrent experiments—demonstrates that with appropriate infrastructure, organizations can maintain experimental velocity even as their ML programs mature. This represents an important lesson about the relationship between experimentation infrastructure and organizational ML capability: investing in robust experimentation platforms can accelerate rather than constrain ML development.

The presentation's focus on "robust experimentation workflows" suggests that reliability and repeatability were key lessons. Ad hoc experimentation approaches might work for small-scale ML efforts but become untenable as organizations scale. Building systematic workflows that ensure experimental rigor while maintaining developer productivity likely emerged as a critical success factor.

Finally, the unified approach to all data experimentation—from simple product tests to complex ML deployments—suggests a lesson about platform strategy. Rather than maintaining separate systems for different types of experiments, consolidating on a single platform that can accommodate diverse use cases may provide significant benefits in terms of operational efficiency, knowledge sharing, and consistent experimental practices across the organization.
