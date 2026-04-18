---
title: "End-to-end ML platform with MLflow-based CI and feature store for training-serving skew at production scale"
slug: "wix-wixs-ml-platform-end-to-end-ml-platform-with-mlflow-based-ci-and-feature-store-for-training-serving-skew-at-producti"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "mlflow"
  - "sagemaker"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "tech"
company: "Wix"
companySlug: "wix"
platformName: "Wix's ML platform"
contentType: "video"
summary: "Wix built an internal machine learning platform in 2020 to support their diverse portfolio of ML models serving over 150 million users, addressing the challenge of managing everything from basic regression and classification models to sophisticated recommendation systems and deep learning models at production scale. The platform provides end-to-end ML workflow coverage including data management, model training and experimentation, deployment, and serving with monitoring. Built on a hybrid architecture combining AWS managed services like SageMaker with open-source tools including Apache Spark and MLflow, the platform features two standout components: an MLflow-based CI system for creating reusable and reproducible experiments, and a feature store designed to solve the critical training-serving skew problem through declarative feature generation that facilitates feature reuse across teams."
link: "https://medium.com/wix-engineering/watch-introducing-mlflow-wixs-internal-machine-learning-platform-ad9227d85cac"
year: 2020
seo:
  title: "Wix: End-to-end ML platform with MLflow-based CI and feature store for training-serving skew at production scale - ZenML MLOps Database"
  description: "Wix built an internal machine learning platform in 2020 to support their diverse portfolio of ML models serving over 150 million users, addressing the challenge of managing everything from basic regression and classification models to sophisticated recommendation systems and deep learning models at production scale. The platform provides end-to-end ML workflow coverage including data management, model training and experimentation, deployment, and serving with monitoring. Built on a hybrid architecture combining AWS managed services like SageMaker with open-source tools including Apache Spark and MLflow, the platform features two standout components: an MLflow-based CI system for creating reusable and reproducible experiments, and a feature store designed to solve the critical training-serving skew problem through declarative feature generation that facilitates feature reuse across teams."
  canonical: "https://www.zenml.io/mlops-database/wix-wixs-ml-platform-end-to-end-ml-platform-with-mlflow-based-ci-and-feature-store-for-training-serving-skew-at-producti"
  ogTitle: "Wix: End-to-end ML platform with MLflow-based CI and feature store for training-serving skew at production scale - ZenML MLOps Database"
  ogDescription: "Wix built an internal machine learning platform in 2020 to support their diverse portfolio of ML models serving over 150 million users, addressing the challenge of managing everything from basic regression and classification models to sophisticated recommendation systems and deep learning models at production scale. The platform provides end-to-end ML workflow coverage including data management, model training and experimentation, deployment, and serving with monitoring. Built on a hybrid architecture combining AWS managed services like SageMaker with open-source tools including Apache Spark and MLflow, the platform features two standout components: an MLflow-based CI system for creating reusable and reproducible experiments, and a feature store designed to solve the critical training-serving skew problem through declarative feature generation that facilitates feature reuse across teams."
mlops:
  source: "sqlite"
  entryId: 106
  sourceUrl: "https://medium.com/wix-engineering/watch-introducing-mlflow-wixs-internal-machine-learning-platform-ad9227d85cac"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061454"
  lastUpdated: "2026-04-14T19:55:08.624578"
---

## Problem Context

Wix faced significant ML engineering challenges supporting their massive user base of over 150 million users with machine learning capabilities. The company needed to deploy and maintain a diverse range of models spanning the complexity spectrum, from basic regression and classification methods to sophisticated recommendation engines and deep learning-based models. This heterogeneity created substantial operational burden for their ML engineering team, who struggled to support the plethora of models running in production.

The core challenge was managing the complete machine learning lifecycle at scale without a unified platform. Teams lacked standardized approaches for experiment tracking, model deployment, and production monitoring. More critically, they faced one of the most notoriously difficult problems in production ML systems: training-serving skew, where features computed differently during training versus inference lead to model performance degradation. Without a centralized feature store and reusable feature definitions, teams were duplicating feature engineering work and risking inconsistencies between training and serving pipelines.

The organization needed an end-to-end ML platform that could standardize workflows, enable experiment reproducibility, facilitate feature reuse across teams, and provide production-grade serving infrastructure with monitoring capabilities.

## Architecture & Design

Wix's internal ML platform is architected around four core workflow stages that cover the complete machine learning lifecycle: data management, model training and experimentation, model deployment, and serving with monitoring. The platform takes a hybrid approach, combining AWS managed services with open-source tooling to balance operational overhead with flexibility.

The architecture leverages AWS SageMaker as a foundation for managed ML infrastructure, integrating it with Apache Spark for distributed data processing and MLflow as the central orchestration and tracking layer. This design allows Wix to benefit from AWS's managed infrastructure while maintaining flexibility through open-source components that can be customized to their specific needs.

Two components form the architectural centerpiece of the platform. The first is an MLflow-based CI system designed specifically for machine learning workflows. This component focuses on creating reusable and reproducible experiments, allowing data scientists to package their work in standardized formats that can be versioned, tracked, and deployed consistently. The MLflow integration provides experiment tracking through APIs and UI for logging and visualizing machine learning experiments, project packaging in standardized formats for code reuse, and model deployment tools that work across diverse serving platforms.

The second critical component is the feature store, which serves as a single, curated, discoverable source of truth for features across the organization. The feature store architecture enables declarative feature generation, where features are defined once and can be reused across multiple models and teams. This design fundamentally addresses the training-serving skew problem by ensuring features are computed identically during both training and inference. The declarative approach means data scientists specify what features they need rather than how to compute them in each context, with the feature store handling consistent computation across training and serving environments.

The platform's data flow begins with data management systems feeding into the feature store, where features are computed and stored. Model training draws from this curated feature repository, with experiments tracked and managed through the MLflow-based CI system. Once models are trained and validated, the deployment pipeline leverages MLflow's model packaging to push models to production serving infrastructure, which continues to use the same feature definitions from the feature store to ensure consistency.

## Technical Implementation

The platform's technical stack centers on MLflow as the primary orchestration and lifecycle management tool. MLflow provides three core capabilities that Wix leverages extensively: MLflow Tracking for experiment management with API and UI-based logging and visualization, MLflow Projects for standardized code packaging that enables reproducibility, and MLflow Models for deployment across heterogeneous serving platforms.

Apache Spark serves as the distributed data processing engine, handling large-scale data transformations and feature computation. The Spark integration allows the platform to process data at Wix's scale, performing the heavy lifting for feature engineering pipelines that feed the feature store.

AWS SageMaker provides managed infrastructure for model training and hosting, reducing operational overhead for the ML engineering team. By using SageMaker, Wix avoids managing the underlying compute infrastructure for training jobs and inference endpoints, allowing the team to focus on platform-level abstractions and workflow optimization.

The feature store implementation uses declarative feature definitions, likely stored as configuration or code that specifies feature computation logic. This declarative approach separates feature specification from feature computation, enabling the system to apply the same logic during both offline training and online serving. The feature store likely maintains both an offline store for batch feature computation used in training and an online store for low-latency feature serving during inference.

The ML CI system built on MLflow enforces standardized experiment workflows. Data scientists interact with MLflow APIs to log parameters, metrics, and artifacts during training. The CI system likely includes automated validation, testing, and promotion pipelines that move models from experimentation through staging to production environments. This standardization ensures that experiments are reproducible and that model deployment follows consistent patterns across teams.

## Scale & Performance

While the source material doesn't provide extensive quantitative metrics, several scale indicators emerge. Wix serves over 150 million users, implying that the ML platform must support high-throughput inference at consumer internet scale. The platform manages "many ML models" ranging from basic statistical models to sophisticated deep learning systems, indicating significant model diversity and deployment volume.

The platform architecture must handle the data volumes associated with feature computation for 150 million users, requiring distributed processing capabilities through Spark. The feature store needs to support both batch feature generation for model training on historical data and low-latency feature serving for real-time predictions.

The use of AWS SageMaker suggests the platform can scale training compute elastically, spinning up resources as needed for model training jobs. The MLflow-based tracking system must maintain experiment metadata, parameters, metrics, and artifacts for multiple teams running numerous experiments, requiring robust metadata storage and retrieval.

## Trade-offs & Lessons

Wix's platform design reflects several important architectural trade-offs. The hybrid approach of combining AWS managed services with open-source tools balances operational simplicity with customization flexibility. SageMaker reduces infrastructure management burden but creates some vendor lock-in, while MLflow and Spark provide flexibility and avoid complete AWS dependency.

The emphasis on building a feature store as a core platform component demonstrates recognition that training-serving skew is one of the most critical problems in production ML. By investing in centralized, declarative feature definitions, Wix trades upfront platform engineering effort for long-term consistency and reduced debugging time. This architectural decision suggests they learned that ad-hoc feature engineering creates more technical debt than the effort required to build proper feature infrastructure.

The MLflow-based CI system represents a bet on standardization and reproducibility over maximum flexibility. By enforcing standardized experiment tracking and model packaging, the platform may constrain some workflows but ensures that experiments can be reproduced, compared, and promoted to production systematically. This trade-off favors organizational scale and collaboration over individual data scientist freedom.

The declarative feature generation approach in the feature store trades some computational efficiency for correctness and reusability. Computing features through a centralized system may introduce overhead compared to bespoke feature code, but guarantees consistency between training and serving while enabling feature discovery and reuse across teams. This suggests Wix prioritized correctness and engineering efficiency over raw performance optimization.

The platform's focus on the complete ML lifecycle—from data management through serving and monitoring—indicates a lesson learned about the importance of end-to-end thinking. Rather than optimizing individual components in isolation, the platform treats ML as a workflow spanning multiple stages that must integrate seamlessly. This holistic approach likely emerged from experiencing pain points when teams had disparate tools for different lifecycle stages.

The choice to present this platform at meetups and share the architecture publicly suggests confidence in the approach and recognition that MLOps platform patterns are broadly applicable across organizations. The emphasis on both the technical architecture and the organizational challenges (supporting many teams with diverse models) indicates that Wix views the platform as solving social/organizational problems as much as technical ones.

Key insights for practitioners include the criticality of solving training-serving skew through proper feature store infrastructure, the value of standardized experiment tracking and model packaging for organizational scale, and the benefits of hybrid architectures that combine managed services with flexible open-source tools. The platform demonstrates that successful MLOps requires addressing the complete lifecycle rather than point solutions, and that investment in platform abstractions pays dividends when supporting diverse teams and model types at scale.
