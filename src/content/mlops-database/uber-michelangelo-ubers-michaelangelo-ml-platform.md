---
title: "Uber’s Michaelangelo — ML Platform"
slug: "uber-michelangelo-ubers-michaelangelo-ml-platform"
draft: false
mlopsTags:
  - "data-versioning"
  - "experiment-tracking"
  - "feature-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo"
contentType: "blog"
summary: "Uber built Michelangelo as an end-to-end machine learning platform to address the technical debt and scalability challenges that emerged around 2015 when ML engineers were building one-off custom systems that couldn't scale across the organization. The platform was designed to cover the complete ML workflow from data management to model training and serving, eliminating the lack of reliable, uniform, and reproducible pipelines for creating and managing training and prediction data at scale. Michelangelo supports thousands of models in production spanning classical machine learning, time series forecasting, and deep learning, powering use cases from marketplace forecasting and customer support ticket classification to ETA calculations and natural language processing features in the driver app."
link: "https://medium.com/acing-ai/ubers-michaelangelo-ml-platform-77d03d8cbe57"
year: 2021
seo:
  title: "Uber: Uber’s Michaelangelo — ML Platform - ZenML MLOps Database"
  description: "Uber built Michelangelo as an end-to-end machine learning platform to address the technical debt and scalability challenges that emerged around 2015 when ML engineers were building one-off custom systems that couldn't scale across the organization. The platform was designed to cover the complete ML workflow from data management to model training and serving, eliminating the lack of reliable, uniform, and reproducible pipelines for creating and managing training and prediction data at scale. Michelangelo supports thousands of models in production spanning classical machine learning, time series forecasting, and deep learning, powering use cases from marketplace forecasting and customer support ticket classification to ETA calculations and natural language processing features in the driver app."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-ubers-michaelangelo-ml-platform"
  ogTitle: "Uber: Uber’s Michaelangelo — ML Platform - ZenML MLOps Database"
  ogDescription: "Uber built Michelangelo as an end-to-end machine learning platform to address the technical debt and scalability challenges that emerged around 2015 when ML engineers were building one-off custom systems that couldn't scale across the organization. The platform was designed to cover the complete ML workflow from data management to model training and serving, eliminating the lack of reliable, uniform, and reproducible pipelines for creating and managing training and prediction data at scale. Michelangelo supports thousands of models in production spanning classical machine learning, time series forecasting, and deep learning, powering use cases from marketplace forecasting and customer support ticket classification to ETA calculations and natural language processing features in the driver app."
mlops:
  source: "sqlite"
  entryId: 14
  sourceUrl: "https://medium.com/acing-ai/ubers-michaelangelo-ml-platform-77d03d8cbe57"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060467"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context: Technical Debt and Scaling Challenges

Around 2015, Uber faced significant challenges with machine learning infrastructure that exemplified what the research community calls "hidden technical debt in machine learning systems." ML engineers across the organization were building custom, one-off systems that integrated with ML models, but these systems created substantial technical debt and were fundamentally not scalable in a large engineering organization. This represented the ML equivalent of the classic software engineering problem: "But it works on my machine..."

The core issue was the absence of standardized infrastructure. There were no systems in place to build reliable, uniform, and reproducible pipelines for creating and managing training and prediction data at scale. Each team or engineer would create their own approach, leading to fragmented tooling, duplicated effort, and systems that couldn't be maintained or extended beyond their original creators. This lack of standardization made it increasingly difficult to operationalize machine learning across Uber's rapidly growing business needs.

The motivation for building Michelangelo emerged from recognizing that as Uber scaled, the company needed a centralized ML platform that could support the entire lifecycle of machine learning development and deployment. Without such a platform, the organization would continue to accumulate technical debt, struggle with reproducibility, and face barriers to productionizing models efficiently.

## Architecture & Design: End-to-End ML Workflow

Michelangelo was architected as a comprehensive, end-to-end machine learning platform designed to cover the complete ML workflow. The platform's name reflects its ambition to be a masterwork of ML infrastructure, supporting the full spectrum of activities from data preparation through model serving.

The platform is built on top of Uber's data lake of transactional and logged data, which serves as the foundation for all ML activities. This architectural decision ensures that Michelangelo has access to the rich data generated across Uber's operations, from rider requests and driver locations to payment transactions and support interactions.

The end-to-end design philosophy means that Michelangelo encompasses several key functional areas that span the ML lifecycle. The platform provides unified capabilities for data management, ensuring that training and prediction data can be created, versioned, and accessed in a consistent manner. It includes infrastructure for model training that supports multiple types of machine learning approaches, from traditional statistical models to modern deep learning architectures. The platform also handles model deployment and serving, managing the operational complexity of running thousands of models in production environments.

By building an integrated platform rather than a collection of disconnected tools, Michelangelo aims to provide standardization and reproducibility. A model trained by one team using the platform should be deployable and maintainable by another team, breaking down the silos that existed in the pre-platform era. This architectural approach also enables better governance, monitoring, and resource management across all ML workloads at Uber.

## Technical Implementation: Supporting Diverse ML Workloads

Michelangelo supports a diverse range of machine learning model types and use cases, reflecting the varied needs of Uber's business. The platform handles classical machine learning models, which are often used for structured prediction tasks like pricing optimization and demand forecasting. It supports time series forecasting models, which are critical for predicting marketplace dynamics, rider demand patterns, and supply availability across different geographic regions and time periods.

Deep learning capabilities are also built into the platform, enabling more sophisticated model architectures for use cases requiring complex pattern recognition. The platform supports natural language processing (NLP) models, which power features like Uber's One-Click Chat capability in the driver app, where drivers can quickly respond to common rider messages with suggested responses.

The platform's design emphasizes uniformity in how different model types are trained and deployed, even though the underlying algorithms and computational requirements may differ significantly. This abstraction allows data scientists to focus on model development rather than infrastructure concerns, while still benefiting from standardized pipelines for data access, experiment tracking, and production deployment.

Michelangelo integrates with Uber's broader data infrastructure, leveraging the data lake as the source of truth for all model inputs. This integration ensures that models can access consistent, high-quality data regardless of which team is building them or what use case they address. The platform likely includes standardized interfaces for data ingestion, feature engineering, and dataset creation, though specific implementation details are not fully elaborated in the source material.

## Scale & Performance: Production ML at Uber's Scale

The platform operates at significant scale, supporting thousands of models in production across Uber's global operations. This scale represents a massive operational challenge, as each model requires ongoing monitoring, updates, and maintenance to ensure it continues to perform effectively as business conditions change.

Michelangelo powers a wide range of critical business use cases that directly impact Uber's core services. Marketplace forecasting models predict supply and demand dynamics, helping Uber optimize pricing and driver incentives in real-time. These forecasts are essential for maintaining marketplace balance in hundreds of cities worldwide.

Customer support models help categorize and respond to support tickets, improving resolution times and customer satisfaction. ETA calculation models provide accurate estimated times of arrival for riders, one of the most visible and important features of the Uber experience. The accuracy and reliability of these predictions directly affect user trust and satisfaction.

The One-Click Chat feature demonstrates how NLP models deployed on Michelangelo can enhance the driver experience. By suggesting contextually appropriate responses to common rider messages, the platform reduces cognitive load for drivers and enables faster communication while maintaining safety by minimizing the need for manual typing.

The platform's ability to support this diverse portfolio of models, spanning different algorithms, update frequencies, and latency requirements, demonstrates the robustness of its architecture. Some models may need to make predictions in milliseconds for real-time use cases like ETA calculation, while others may run in batch mode for forecasting or analytics purposes.

## Trade-offs & Lessons: Building Centralized ML Infrastructure

The development of Michelangelo represents a strategic decision by Uber to invest in centralized ML infrastructure rather than allowing teams to continue building fragmented, custom solutions. This approach involves significant trade-offs that other organizations should consider when building similar platforms.

The primary advantage of the centralized platform approach is standardization and reduced technical debt. By providing a unified way to build, train, and deploy models, Michelangelo eliminates much of the duplicated effort and one-off tooling that plagued Uber's earlier ML efforts. This standardization makes it easier for teams to collaborate, share models, and maintain systems over time. New team members can be onboarded more quickly because they're learning a common platform rather than multiple custom systems.

The platform also enables better governance and resource management. With all models running through a common infrastructure, Uber can more easily monitor performance, track costs, ensure compliance with data policies, and allocate compute resources efficiently. This visibility is difficult to achieve when ML systems are fragmented across many custom implementations.

However, building and maintaining a centralized platform like Michelangelo requires substantial upfront investment and ongoing engineering effort. The platform team must support diverse use cases and model types while maintaining backward compatibility and reliability. This can create tension between the pace of platform development and the needs of individual ML teams who may want features or capabilities that aren't yet supported.

The decision to build on top of Uber's data lake is both a strength and a potential constraint. While it ensures access to comprehensive data, it also means that Michelangelo's performance and capabilities are tied to the data lake's architecture. Teams working with data that doesn't fit neatly into the data lake paradigm may face friction.

A key lesson from Uber's experience is the importance of recognizing technical debt early. By 2015, Uber had already identified the scaling problems with their ML infrastructure and committed to building a comprehensive solution. Organizations that wait too long to address ML infrastructure may find themselves with even more deeply entrenched technical debt that's harder to unwind.

The end-to-end approach taken by Michelangelo suggests that piecemeal solutions are insufficient for organizations operating at scale. While it might be tempting to solve individual problems (like model serving or experiment tracking) in isolation, the real value comes from integrating these capabilities into a cohesive platform that spans the entire ML lifecycle.

Michelangelo's support for thousands of production models demonstrates that with the right infrastructure, organizations can scale ML far beyond what's possible with manual, custom approaches. This scale enables broader adoption of ML across business functions and allows companies to extract more value from their data assets. However, achieving this scale requires disciplined platform engineering and a willingness to invest in infrastructure that may not deliver immediate business value but enables long-term ML velocity.
