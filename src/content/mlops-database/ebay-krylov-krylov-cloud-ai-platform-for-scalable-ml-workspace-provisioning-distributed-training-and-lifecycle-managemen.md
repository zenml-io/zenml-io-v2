---
title: "Krylov cloud AI platform for scalable ML workspace provisioning, distributed training, and lifecycle management"
slug: "ebay-krylov-krylov-cloud-ai-platform-for-scalable-ml-workspace-provisioning-distributed-training-and-lifecycle-managemen"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "notebooks"
  - "pipeline-orchestration"
  - "docker"
  - "feast"
  - "kubernetes"
  - "mlflow"
  - "data-ingestion"
  - "data-prep"
  - "data-validation"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "model-validation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "eBay"
companySlug: "ebay"
platformName: "Krylov"
contentType: "blog"
summary: "eBay built Krylov, a modern cloud-based AI platform, to address the productivity challenges data scientists faced when building and deploying machine learning models at scale. Before Krylov, data scientists needed weeks or months to procure infrastructure, manage data movement, and install frameworks before becoming productive. Krylov provides on-demand access to AI workspaces with popular frameworks like TensorFlow and PyTorch, distributed training capabilities, automated ML workflows, and model lifecycle management through a unified platform. The transformation reduced workspace provisioning time from days to under a minute, model deployment cycles from months to days, and enabled thousands of model training experiments per month across diverse use cases including computer vision, NLP, recommendations, and personalization, powering features like image search across 1.4 billion listings."
link: "https://innovation.ebayinc.com/stories/ebays-transformation-to-a-modern-ai-platform/"
year: 2019
seo:
  title: "eBay: Krylov cloud AI platform for scalable ML workspace provisioning, distributed training, and lifecycle management - ZenML MLOps Database"
  description: "eBay built Krylov, a modern cloud-based AI platform, to address the productivity challenges data scientists faced when building and deploying machine learning models at scale. Before Krylov, data scientists needed weeks or months to procure infrastructure, manage data movement, and install frameworks before becoming productive. Krylov provides on-demand access to AI workspaces with popular frameworks like TensorFlow and PyTorch, distributed training capabilities, automated ML workflows, and model lifecycle management through a unified platform. The transformation reduced workspace provisioning time from days to under a minute, model deployment cycles from months to days, and enabled thousands of model training experiments per month across diverse use cases including computer vision, NLP, recommendations, and personalization, powering features like image search across 1.4 billion listings."
  canonical: "https://www.zenml.io/mlops-database/ebay-krylov-krylov-cloud-ai-platform-for-scalable-ml-workspace-provisioning-distributed-training-and-lifecycle-managemen"
  ogTitle: "eBay: Krylov cloud AI platform for scalable ML workspace provisioning, distributed training, and lifecycle management - ZenML MLOps Database"
  ogDescription: "eBay built Krylov, a modern cloud-based AI platform, to address the productivity challenges data scientists faced when building and deploying machine learning models at scale. Before Krylov, data scientists needed weeks or months to procure infrastructure, manage data movement, and install frameworks before becoming productive. Krylov provides on-demand access to AI workspaces with popular frameworks like TensorFlow and PyTorch, distributed training capabilities, automated ML workflows, and model lifecycle management through a unified platform. The transformation reduced workspace provisioning time from days to under a minute, model deployment cycles from months to days, and enabled thousands of model training experiments per month across diverse use cases including computer vision, NLP, recommendations, and personalization, powering features like image search across 1.4 billion listings."
mlops:
  source: "sqlite"
  entryId: 37
  sourceUrl: "https://innovation.ebayinc.com/stories/ebays-transformation-to-a-modern-ai-platform/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060709"
  lastUpdated: "2026-04-14T19:54:42.002317"
---

## Problem Context

eBay faced significant productivity challenges in their AI and machine learning operations before the development of Krylov. Data scientists building models encountered substantial friction throughout the ML lifecycle, requiring weeks or sometimes months to become productive. The core pain points included the need to procure and manage infrastructure manually, move data to compute resources, install and configure software frameworks, and troubleshoot environment issues. These productivity overheads created significant delays in bringing AI-powered features to market.

A critical technical limitation was the inability to scale model training across nodes for large datasets. This constraint became particularly problematic as eBay needed to train sophisticated models on massive inventories—1.4 billion listings and over half a billion images. The fragmented approach also meant that different teams across various geographies were building their own frameworks and platforms for specific needs, creating silos and duplicated effort.

The business impact was substantial. Time to deployment for new AI features could take months, limiting eBay's ability to innovate quickly in areas like image search, machine translation for cross-border trade (which represents 59% of international revenue), personalized recommendations, and seller price guidance. The platform needed to support a diverse set of AI use cases spanning computer vision, natural language processing, merchandising recommendations, buyer personalization, risk management, trust systems, and shipping estimates.

## Architecture & Design

Krylov was designed as a scalable, multi-tenant, cloud-based AI platform built from the ground up to support the complete end-to-end AI model lifecycle. The architecture encompasses several key components organized around the ML workflow.

The foundation consists of an AI training cluster providing secure and performant access to data with powerful compute resources including GPUs, high-memory configurations, and high-core CPU systems. eBay designed and built specialized servers specifically to manage the vast data volumes flowing through the system, enabling data scientists and engineers to accelerate feature production.

The training platform layer provides both automated training workflows and interactive workspaces. This includes software development kits and clients supporting multiple programming languages—Python, Java, and Scala—as well as REST APIs. Data scientists can access popular frameworks including TensorFlow, PyTorch, Caffe, H2O, Scikit-learn, math libraries, and Jupyter notebooks. The platform supports both distributed training for large datasets and parallel hyperparameter tuning experiments.

AI model lifecycle management represents a critical architectural component. This encompasses model experiment management capabilities that allow data scientists to record, compare, and visualize experiments. A model management service tracks models across their lifecycle, while deployment services handle the transition from experimentation to production. The AI Hub provides a web-based user interface for managing the entire lifecycle through a unified experience.

The model serving platform creates a feedback loop connecting deployed models to the experimentation framework and monitoring systems. Models can be deployed as services supporting both individualized and common inference patterns. The platform integrates operational monitoring alongside model performance tracking to ensure production systems maintain quality.

Data lifecycle abstraction spans the complete modeling, deployment, and inferencing workflow. This includes data discovery capabilities, data preparation tools, a feature store for feature management and serving, and feedback loops to improve models over time. The abstraction allows data scientists to focus on model development rather than data engineering complexity.

The AI Hub interface visualizes the entire workflow, showing model training experiments within AI projects, enabling collaboration between team members, providing metric comparisons between different experiments, and visualizing ML workflow directed acyclic graphs (DAGs) where users can inspect task status, attach logs and assets, specify configurations, and view deployment status.

## Technical Implementation

The platform was built with four key architectural tenets to address eBay's diverse AI use cases and operational patterns. First, support for heterogeneous software frameworks ensures data scientists can use TensorFlow, PyTorch, Caffe, notebooks, or any framework of choice without platform constraints. Second, heterogeneous hardware architecture provides flexibility to leverage GPUs for deep learning workloads or high-memory CPU configurations for other use cases. Third, the system was built for scale from the beginning, anticipating the needs of eBay's massive inventory and user base. Fourth, the platform embraced open source technologies and was developed in an open source manner, fostering collaboration and avoiding vendor lock-in.

The development approach itself was innovative. eBay established the Unified AI Initiative Core Team (ICT) bringing together three distinct groups. The AI platform team served as the provider, owner, and builder of the platform. AI platform dependencies teams covered hardware, compute, network, storage, and data services. AI domain teams represented internal customers including AI research and engineering groups focused on ads, computer vision, NLP, risk, trust, and marketing.

This collaborative model extended to an internal open source approach where researchers and engineers from domain teams contributed code or embedded themselves into the platform development team. Some existing frameworks and platforms built by individual teams were absorbed into the unified platform when they solved specific problems effectively. eBay also instituted a Machine Learning Engineering Fellowship program allowing any engineer to embed with the AI platform team similar to an internship, helping build platform features while learning ML concepts and technologies from senior domain experts.

The implementation followed a phased strategy spanning multiple years. Early phases focused on building the AI training cluster with data access and compute capabilities. Subsequent phases added the training platform with automatable workflows and interactive workspaces. Model lifecycle management came next, followed by the model serving platform and feedback loops. Throughout development, the team provided previews and alpha/beta access to ICT teams for early testing and feedback.

Concrete examples of Krylov in action include training BERT models for language understanding and ResNet models for computer vision at scale on the 1.4 billion listing inventory. AI researchers used the platform to train neural machine translation models critical for cross-border trade, deep and wide models for recommendations, and computer vision models powering image search functionality.

## Scale & Performance

The performance improvements delivered by Krylov are substantial and measurable. Workspace provisioning time decreased from days to under one minute—data scientists can now spin up an AI workspace with their chosen software frameworks and compute configurations in less than 60 seconds. This represents a transformation in developer velocity.

Model deployment cycles improved from months to days. The ability to automate model training and deploy models through individualized or common inference platforms dramatically accelerated time to market. Development time for new features reduced from weeks to hours thanks to the specialized servers eBay designed for managing massive data volumes.

In 2019 alone, data scientists used Krylov to run thousands of model training experiments per month. These experiments spanned the full range of AI use cases across the organization. The platform operates at massive scale, supporting training on datasets drawn from 1.4 billion listings and over half a billion images. For image search specifically, computer vision algorithms process this enormous image corpus in milliseconds to surface relevant listings that are visually similar to user-provided photos.

The distributed training capabilities enable scaling model training across multiple nodes, a critical requirement for deep learning models on large datasets. Parallel hyperparameter tuning allows data scientists to explore the parameter space efficiently, resulting in marked improvements in model accuracy. The platform's ability to handle both batch and real-time data from eBay's vast repositories ensures models can be trained on fresh, relevant data.

Cross-border trade powered by machine translation technology represents a significant business impact, contributing 59% of eBay's international revenue. The improvements in time to market and model precision enabled by Krylov directly support this business outcome.

## Trade-offs & Lessons

The multi-year transformation to build Krylov required breaking down silos and unifying teams across functions and geographies around a common vision. This organizational transformation proved as important as the technical implementation. The Unified AI Initiative Core Team model brought together platform builders, infrastructure providers, and internal customers to ensure the platform met real needs rather than theoretical requirements.

The internal open source development model and ML Engineering Fellowship program created valuable feedback mechanisms beyond just code contributions. Having engineers and researchers from domain teams who were closer to actual AI lifecycle problems provided critical input that shaped platform evolution. This approach also scaled up skills across the organization, creating a community of ML-literate engineers.

The decision to support heterogeneous frameworks and hardware architectures was a key trade-off. While this added complexity to platform development, it avoided forcing data scientists into constrained technology choices and enabled teams to use best-in-class tools for their specific use cases. This flexibility proved essential for supporting the diverse range of AI applications from computer vision to NLP to recommendations.

The phased rollout strategy with preview, alpha, and beta access allowed for iterative refinement based on real usage patterns. This collaborative engagement with the AI community as both builders and users of the platform ensured the result was shaped by actual needs rather than assumptions.

The emphasis on open source technologies provides flexibility and avoids vendor lock-in, though it likely required more internal engineering investment than adopting a commercial platform. For an organization of eBay's scale with unique requirements, this trade-off appears justified given the control and customization it enables.

A key lesson highlighted is that AI platform development is an evolutionary journey with no final destination. The team recognizes that customer needs change and new opportunities emerge, requiring continuous platform evolution. The extensible architecture built into Krylov positions eBay to adapt as the state of the art in AI advances.

The discovery phase emphasis on understanding pain points, showing empathy for data scientists and researchers, and researching industry approaches proved valuable. This human-centered design process ensured the platform solved real problems rather than building technology for its own sake.

The integration of the entire ML lifecycle—from data discovery through training, experiment management, deployment, serving, and feedback loops—into a unified platform represents a holistic approach that avoids the tool sprawl and integration challenges many organizations face. However, building such a comprehensive platform required significant investment and coordination across multiple teams over several years.
