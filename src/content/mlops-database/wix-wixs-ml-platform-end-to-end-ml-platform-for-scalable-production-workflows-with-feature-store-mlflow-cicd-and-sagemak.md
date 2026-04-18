---
title: "End-to-end ML platform for scalable production workflows with feature store, MLflow CI/CD, and SageMaker deployment"
slug: "wix-wixs-ml-platform-end-to-end-ml-platform-for-scalable-production-workflows-with-feature-store-mlflow-cicd-and-sagemak"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "docker"
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
contentType: "slides"
summary: "Wix built a comprehensive ML platform in 2020 to address the challenges of building production ML systems at scale across approximately 25 data scientists and 10 data engineers. The platform provides an end-to-end workflow covering data management, model training and evaluation, deployment, serving, and monitoring, enabling data scientists to build and deploy models with minimal engineering effort. Central to the architecture is a feature store that ensures reproducible training datasets and eliminates training-serving skew, combined with MLflow-based CI/CD pipelines for experiment tracking and standardized deployment to AWS SageMaker. The platform supports diverse use cases including churn and premium prediction, spam classification, template search, image super-resolution, and support article recommendation."
link: "https://www.slideshare.net/RanRomano/wixs-ml-platform"
year: 2020
seo:
  title: "Wix: End-to-end ML platform for scalable production workflows with feature store, MLflow CI/CD, and SageMaker deployment - ZenML MLOps Database"
  description: "Wix built a comprehensive ML platform in 2020 to address the challenges of building production ML systems at scale across approximately 25 data scientists and 10 data engineers. The platform provides an end-to-end workflow covering data management, model training and evaluation, deployment, serving, and monitoring, enabling data scientists to build and deploy models with minimal engineering effort. Central to the architecture is a feature store that ensures reproducible training datasets and eliminates training-serving skew, combined with MLflow-based CI/CD pipelines for experiment tracking and standardized deployment to AWS SageMaker. The platform supports diverse use cases including churn and premium prediction, spam classification, template search, image super-resolution, and support article recommendation."
  canonical: "https://www.zenml.io/mlops-database/wix-wixs-ml-platform-end-to-end-ml-platform-for-scalable-production-workflows-with-feature-store-mlflow-cicd-and-sagemak"
  ogTitle: "Wix: End-to-end ML platform for scalable production workflows with feature store, MLflow CI/CD, and SageMaker deployment - ZenML MLOps Database"
  ogDescription: "Wix built a comprehensive ML platform in 2020 to address the challenges of building production ML systems at scale across approximately 25 data scientists and 10 data engineers. The platform provides an end-to-end workflow covering data management, model training and evaluation, deployment, serving, and monitoring, enabling data scientists to build and deploy models with minimal engineering effort. Central to the architecture is a feature store that ensures reproducible training datasets and eliminates training-serving skew, combined with MLflow-based CI/CD pipelines for experiment tracking and standardized deployment to AWS SageMaker. The platform supports diverse use cases including churn and premium prediction, spam classification, template search, image super-resolution, and support article recommendation."
mlops:
  source: "sqlite"
  entryId: 107
  sourceUrl: "https://www.slideshare.net/RanRomano/wixs-ml-platform"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061466"
  lastUpdated: "2026-04-14T19:55:09.124465"
---

## Problem Context

Wix faced the fundamental challenge that building machine learning systems is hard, with ML code representing only a small fraction of a real-world ML system as highlighted by the seminal Google paper on technical debt in machine learning systems. With approximately 25 data scientists, 10 data engineers, and 20 data curators working across diverse use cases—ranging from predictive modeling for churn and premium forecasting to computer vision tasks like super-resolution and object segmentation to NLP applications like semantic template search and support article recommendations—the organization needed a unified approach to ML operations.

The pain points were multifaceted. Data scientists were creating ad-hoc SQL scripts for each model that would be lost with each iteration, making datasets non-reproducible. Features that could be reused across different models were instead being recreated independently, leading to duplicated effort and inconsistent implementations. The training-serving skew problem was particularly acute: training datasets were generated using SQL queries against analytical data stores, while production serving required extracting features from production APIs using general-purpose programming languages like Python. This dual implementation approach was error-prone and created systematic mismatches between offline and online features.

The motivation was clear: allow data scientists and analysts at Wix to build, deploy, maintain, and monitor ML models in production with minimal engineering efforts through a single platform providing an end-to-end ML workflow covering data management, training and evaluation, deployment, serving predictions, and monitoring features and predictions.

## Architecture & Design

The Wix ML platform architecture centers around three core pillars: a standardized model interface, an MLflow-based CI/CD system, and a comprehensive feature store with online and offline components.

The model interface provides the foundation through a base class that all models inherit from. This `BaseWixModel` class defines four key methods: `schema()` which details the interface of the model including input features and output prediction fields; `get_training_data()` which fetches training data as a pandas DataFrame; `fit()` which handles model training; and `predict()` which is invoked in production by the prediction service. This abstraction cleanly separates build-time concerns from production inference concerns while providing a consistent contract across all models.

The feature store architecture addresses both offline training and online serving requirements. For training, the system implements a "time machine" concept where datasets are generated based on feature definitions for specific users or sites at specific prediction points in time. This prevents target leakage by ensuring that only data available before the prediction point is used for feature computation. The system operates on clickstream events stored as Parquet files on S3, partitioned by business unit and date for efficient querying.

For online serving, the feature store implements a three-step approach. First, a daily build process pivots and aggregates all users' history to a key-value store. Second, a warmup phase loads active users from the KV store into an in-memory cache. Third, a real-time update stream continuously updates the cache from live user events, ensuring that features reflect the most current user behavior. This architecture provides low-latency feature access for production predictions while maintaining consistency with offline training features through a single feature definition that generates both SQL for training and Python code for serving.

The deployment architecture leverages AWS SageMaker for model hosting. Models built and tracked in MLflow can be deployed to SageMaker with "one click" deployment. The platform automatically configures auto-scaling for deployed models, provides access to various ML-optimized hardware types, and streams CloudWatch metrics to templated Grafana dashboards customized for each model, providing out-of-the-box observability.

## Technical Implementation

The platform heavily leverages MLflow as the backbone for experiment tracking, model management, and deployment. Models are packaged as MLflow Projects, which provide a format for packaging data science code in a reusable and reproducible way. Each ML project includes a `MLproject` file specifying entry points (build and test), a conda environment file for dependency management, and the model code itself.

The build process is standardized through a `build_model()` function that orchestrates the complete training workflow within an MLflow run context. This function fetches and stores training data, calls the model's fit method, registers the model schema, and logs the model to MLflow using the `pyfunc` flavor. The conda environment file ensures reproducible dependencies across local development and CI environments. Build commands like `mlflow run --entry-point build .` and `mlflow run --entry-point test .` work identically in both local and CI contexts.

The feature store implements declarative feature engineering through a preconfigured set of feature families at the site and user level. These families are supported both for training and serving and include event-based features (aggregations like sum, average, count, duration over clickstream events, and categorical features extracted from specific event fields) and non-event-based features (such as site content features based on site structure and content). Each feature is defined once but can generate both SQL queries for offline training data preparation and Python code for online feature extraction.

Feature definitions specify the aggregation type, event filters, time windows, and field mappings. For example, "count publish site over the last month" specifies counting specific events within a sliding time window, while "days since site was last saved" computes a recency metric. These definitions are declaratively specified in configuration and automatically translated into appropriate query logic for both SQL and Python contexts.

Models declare which features they require through their schema definition, marking features as `auto_extracted=True` when they should be automatically fetched by the serving infrastructure. This schema-driven approach enables automatic documentation generation, client code generation, and schema validation, ensuring that the serving infrastructure always provides exactly the features a model expects.

The serving infrastructure uses Python as the runtime language, with models deployed as SageMaker endpoints. The feature extraction service maintains an in-memory cache of active users' aggregated features, continuously updated from both daily batch processing and real-time event streams. When a prediction request arrives, the service automatically extracts all required features marked for auto-extraction in the model schema, assembles them into the expected DataFrame format, and invokes the model's predict method.

## Scale & Performance

While the presentation doesn't provide extensive quantitative metrics on throughput or latency, it reveals meaningful scale indicators about the organization and platform usage. The data science organization comprises approximately 25 data scientists, 10 data engineers, and 20 data curators—a substantial team working across a diverse portfolio of ML applications.

The use cases span multiple domains and model types. Predictive modeling includes churn prediction and premium forecasting, which are critical business metrics for a SaaS platform like Wix. Classification tasks include spam detection and phishing detection to protect users. Ranking systems include logo beauty ranking to help users select high-quality design assets. Computer vision applications include super-resolution, object and portrait segmentation, and auto-enhancement for image processing. NLP and information retrieval applications include semantic template search and support article recommendation.

The clickstream data infrastructure stores events as Parquet files on S3 with partitioning by business unit and date, suggesting substantial data volumes that benefit from columnar storage and partition pruning. The feature store's daily build process aggregates history for all users, indicating the system operates at a scale where pre-aggregation and caching strategies are necessary for acceptable serving latency.

The deployment to AWS SageMaker with auto-scaling capabilities suggests the platform handles variable prediction loads that require elastic compute resources. The provision of multiple ML-optimized hardware types indicates support for diverse model architectures with different computational profiles, from lightweight decision trees to resource-intensive deep learning models.

## Trade-offs & Lessons

The presentation concludes with three key lessons learned that offer valuable insights for practitioners building ML platforms.

**Software engineering practices don't always play well with ML.** This observation reflects a fundamental tension in ML systems. Traditional software engineering emphasizes determinism, explicit interfaces, and clear separation of concerns, while ML introduces stochasticity, implicit patterns learned from data, and tight coupling between data and code. Wix's approach addresses this through standardization—the base model interface, MLflow project structure, and schema-driven feature extraction provide enough structure to apply engineering discipline while remaining flexible enough to accommodate diverse ML approaches.

**Data management for online models is very challenging.** This lesson directly motivated the feature store investment. The training-serving skew problem required solving the dual implementation challenge where the same feature logic needed to execute efficiently in both SQL for batch training and Python for real-time serving. Wix's solution of declarative feature definitions that generate both implementations is elegant but requires substantial upfront platform investment. The three-stage serving architecture (daily build, warmup, real-time updates) balances freshness, latency, and consistency but adds operational complexity.

**Have a good way of monitoring model KPIs in production.** The automatic provisioning of Grafana dashboards for each deployed model reflects this lesson. Without automated observability, teams struggle to detect model degradation, data drift, or serving issues. The integration with CloudWatch metrics and templated dashboards makes monitoring a default rather than an afterthought, reducing the time to detect and diagnose production issues.

The platform's design makes several notable trade-offs. The base model interface provides useful abstraction but constrains how data scientists can structure their code. The declarative feature engineering approach eliminates training-serving skew for supported feature types but may not accommodate all feature engineering patterns data scientists want to express. The MLflow-based CI/CD provides excellent reproducibility but adds overhead for experimentation compared to running notebooks interactively. The AWS SageMaker deployment provides robust infrastructure but couples the platform to a specific cloud provider.

The feature store architecture makes a clear bet on pre-aggregation and caching rather than on-demand feature computation. This choice optimizes for prediction latency at the cost of feature staleness (bounded by the real-time update lag) and infrastructure complexity. For Wix's use cases—primarily user behavior modeling and content analysis—this trade-off makes sense, but the architecture might be less suitable for use cases requiring features computed from the absolute latest data or features with high cardinality that don't cache well.

Overall, the Wix ML platform represents a thoughtful, comprehensive approach to MLOps that addresses real organizational pain points through standardization, automation, and careful architectural design. The emphasis on reproducibility through MLflow Projects, the elimination of training-serving skew through the feature store, and the automated deployment and monitoring infrastructure enable data scientists to focus on model development rather than operational concerns.
