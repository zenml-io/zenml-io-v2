---
title: "End-to-end ML platform with declarative feature store, MLflow CI/CD, and SageMaker centralized prediction service"
slug: "wix-wixs-ml-platform-end-to-end-ml-platform-with-declarative-feature-store-mlflow-cicd-and-sagemaker-centralized-predict"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "databricks"
  - "mlflow"
  - "sagemaker"
  - "spark"
  - "data-ingestion"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "tech"
company: "Wix"
companySlug: "wix"
platformName: "Wix's ML platform"
contentType: "video"
summary: "Wix built a comprehensive ML platform to address the challenge of supporting diverse production models across their organization of approximately 25 data scientists working on use cases ranging from premium prediction and churn modeling to computer vision and recommendation systems. The platform provides an end-to-end workflow encompassing feature management through a custom feature store, model training and CI/CD via MLflow, and model serving through AWS SageMaker with a centralized prediction service. The system's cornerstone is the feature store, which implements declarative feature engineering to ensure training-serving consistency and enable feature reuse across projects, while the CI/CD pipeline provides reproducible model training and one-click deployment capabilities that allow data scientists to manage the entire model lifecycle with minimal engineering intervention."
link: "https://www.youtube.com/watch?v=E8839ENL-WY"
year: 2020
seo:
  title: "Wix: End-to-end ML platform with declarative feature store, MLflow CI/CD, and SageMaker centralized prediction service - ZenML MLOps Database"
  description: "Wix built a comprehensive ML platform to address the challenge of supporting diverse production models across their organization of approximately 25 data scientists working on use cases ranging from premium prediction and churn modeling to computer vision and recommendation systems. The platform provides an end-to-end workflow encompassing feature management through a custom feature store, model training and CI/CD via MLflow, and model serving through AWS SageMaker with a centralized prediction service. The system's cornerstone is the feature store, which implements declarative feature engineering to ensure training-serving consistency and enable feature reuse across projects, while the CI/CD pipeline provides reproducible model training and one-click deployment capabilities that allow data scientists to manage the entire model lifecycle with minimal engineering intervention."
  canonical: "https://www.zenml.io/mlops-database/wix-wixs-ml-platform-end-to-end-ml-platform-with-declarative-feature-store-mlflow-cicd-and-sagemaker-centralized-predict"
  ogTitle: "Wix: End-to-end ML platform with declarative feature store, MLflow CI/CD, and SageMaker centralized prediction service - ZenML MLOps Database"
  ogDescription: "Wix built a comprehensive ML platform to address the challenge of supporting diverse production models across their organization of approximately 25 data scientists working on use cases ranging from premium prediction and churn modeling to computer vision and recommendation systems. The platform provides an end-to-end workflow encompassing feature management through a custom feature store, model training and CI/CD via MLflow, and model serving through AWS SageMaker with a centralized prediction service. The system's cornerstone is the feature store, which implements declarative feature engineering to ensure training-serving consistency and enable feature reuse across projects, while the CI/CD pipeline provides reproducible model training and one-click deployment capabilities that allow data scientists to manage the entire model lifecycle with minimal engineering intervention."
mlops:
  source: "sqlite"
  entryId: 105
  sourceUrl: "https://www.youtube.com/watch?v=E8839ENL-WY"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061444"
  lastUpdated: "2026-04-14T19:55:07.895530"
---

## Problem Context

Wix's Data Science Group, comprising approximately 25 data scientists and 10 machine learning engineers spread across Tel Aviv and two locations in Ukraine, faced fundamental infrastructure challenges as they scaled their ML capabilities. The organization maintains a diverse portfolio of production models spanning premium prediction, churn modeling, support article recommendation, logo beauty ranking, template semantic search, and computer vision applications for e-commerce product photography. This breadth created several critical pain points.

The fundamental challenge centered on the reality that building ML-based systems is inherently complex. As depicted in the well-known Google paper "Hidden Technical Debt in Machine Learning Systems," only a small fraction of real-world ML systems comprises actual ML code—the required surrounding infrastructure is vast and complex. For Wix, with their wide range of model types including classification, regression, ranking, recommendation, and deep learning, each requiring specific training resources, tailored feature extraction processes, and different deployment methodologies, the organization could not afford to reimplement every infrastructure component for each model.

Feature engineering presented particularly acute problems. When projects like premium prediction or churn required new model iterations, teams often started from scratch. SQL queries generating datasets were either non-existent, lost in time, or non-reproducible because underlying tables or schemas had changed. This lack of feature reusability meant that similar features—such as user engagement metrics like "number of site publishes in the last month"—were repeatedly reimplemented across different projects rather than shared.

The training-serving skew problem loomed large. Models trained on analytical data using SQL from data warehouses needed to extract features in production from real-time APIs using general-purpose programming languages. For a model using 50 features, this discrepancy required engineers to reverse-engineer thousands of lines of SQL, understand which production APIs to call, and rebuild feature logic exactly as data scientists had modeled it. Any feature changes required integration effort from engineers, killing velocity on both sides.

The platform vision crystallized around two core objectives: building a single platform addressing the entire end-to-end ML workflow from data management through training, evaluation, deployment, serving, and monitoring; and critically, enabling data scientists to deploy, maintain, and monitor models in production with minimal engineering effort. The aspirational goal was for data scientists to take models from inception to production without the platform engineering team's involvement.

## Architecture & Design

The Wix ML platform architecture follows a logical flow through five major components, with the feature store serving as the foundational element.

**Feature Store Architecture**

The feature store implements what Wix calls "declarative feature engineering" with a pre-configured set of feature families supported both offline and online for users and sites. Features divide into event-based and non-event-based categories. Event-based features capture user interactions from clickstream data—clicks, publishes, logins—while non-event-based features extract site content characteristics like component counts or dominant language.

The system supports three primary feature families. Aggregation features compute averages, counts, and durations over time windows. Categorical features extract specific fields from user interaction events such as registration country code or device family. Site content features, the most challenging as non-event-based data, derive characteristics from site structure itself.

Feature definitions use Protocol Buffers for portability across the training and serving boundary. Each feature definition specifies the feature name, measure type, list of events it's based on, and the entity identifier (user or site). The critical conceptual innovation is the "prediction point"—a point-in-time reference that acts as a time machine. For training, this prevents target leakage by ensuring features reflect only information available at the historical prediction time. For serving, it represents the current moment.

The feature store has distinct offline and online implementations. The offline store generates batch datasets for training by producing Spark SQL that queries the data warehouse layer. The online store provides real-time feature extraction during serving through a specialized architecture addressing the fundamental challenge that clickstream events stored as Parquet files on S3, partitioned by business unit and date, don't support fast per-user access required for low-latency serving.

The online feature extraction system implements a three-tier caching strategy. Daily batch pivoting processes aggregate user history from Parquet files into Apache HBase, a key-value store that provides user-level partitioning. When the system detects an active user, a warm-up flow loads that user's history from HBase into Redis, a much faster cache, completing in seconds. Finally, real-time event streams continuously update Redis cache values, providing genuine real-time data freshness. This design assumes the number of currently active users is a small fraction of all registered users (150-160 million total), making the cache size manageable.

**Model Build and CI/CD Pipeline**

The CI/CD system builds on MLflow as its foundation, specifically leveraging MLflow Projects for packaging and MLflow's model serialization capabilities. Data scientists structure model repositories following conventions: a model.py file must include a class inheriting from a base WixModel interface that implements three required methods.

The schema method describes the model's interface—which input features it expects and which output prediction fields it produces. This is where the platform's "killer feature" manifests: data scientists simply list feature names they created in the feature store, and the platform automatically extracts these features during serving. The get_training_data method fetches training data and returns it as a Pandas DataFrame, which the system stores for reproducibility and as a baseline for concept drift detection. The fit method handles model training.

The build process is orchestrated through an MLproject YAML file, analogous to a pom.xml or setup.py, defining build and test entry points. The core build_model function orchestrates the pipeline: fetch and store training data, fit the model, register the schema associating it with the build ID, and log the model to MLflow. MLflow handles serialization completely, abstracting away pickle operations from data scientists.

The CI system ensures all production candidate models train centrally rather than on local machines or ad-hoc remote systems, providing visibility and reproducibility. Using MLflow CLI conventions, data scientists can run the same build and test commands locally and in CI, guaranteeing identical behavior.

**Model Deployment and Serving**

The continuous delivery component deploys models to AWS SageMaker, the managed hosting solution. This choice provides several benefits: MLflow plays nicely with SageMaker enabling one-click deployment, auto-scaling policies based on throughput and latency, access to ML-optimized hardware types, and integration with CloudWatch metrics.

Above SageMaker sits the custom Prediction Service, a centralized gateway acting as the API layer for all ML models managed by the platform. This architectural decision provides multiple critical capabilities. It translates between the developer world—typed Protocol Buffers, gRPC and REST endpoints—and the data scientist domain of Pandas DataFrames. The service invokes the model's predict function while abstracting feature extraction entirely from model code. This is crucial: features shouldn't be extracted within the model on SageMaker; the platform handles feature extraction.

The centralized prediction service tracks health metrics using a standardized collection system enriched with SageMaker CloudWatch data, automatically generating dashboards showing requests per minute, median response time, CPU, disk, memory, and throughput. It performs the online feature extraction by calling the real-time feature store component. Finally, it standardizes feature and prediction logging for automatic dashboards and alerts tracking training-serving skew, concept drift, and model-specific metrics.

**Management Console**

An in-house management console serves as the central control plane where data scientists manage features, datasets, models, and deployments. The console displays model build history with associated git commits, provides deployment UI for selecting SageMaker instance types and initial instance counts, and presents the automatically generated health dashboards for each deployed model.

## Technical Implementation

The technology stack reflects pragmatic choices balancing managed services with custom components where needed.

**Core Technologies**

MLflow serves as the abstraction layer for the model repository (backed by S3) and CI orchestration. AWS SageMaker provides managed model hosting. Apache Spark generates training datasets through SQL queries against the data warehouse. Apache HBase serves as the offline key-value store for pivoted user history. Redis provides low-latency caching for active users. Apache Storm handles real-time stream processing for cache updates, though the team notes this as a legacy system with alternatives under consideration.

Protocol Buffers define feature specifications and model APIs, providing schema evolution and cross-language compatibility. The prediction service exposes both gRPC and REST endpoints, aligning with Wix's API-first philosophy where all APIs are modeled in Protocol Buffers.

The data layer relies on existing data platform infrastructure: clickstream events stored as Parquet files on S3 partitioned by business unit and date. This partitioning scheme optimizes for typical analytical queries but creates challenges for per-user serving queries, driving the need for the HBase/Redis caching architecture.

**Feature Store Implementation Details**

The offline feature store generates Spark SQL dynamically based on feature definitions. For a feature like "count of site publishes in last 30 days," the system translates the declarative specification—entity (user), events (edit/publish), measure (count aggregation), time window (prediction_point - 30 days to prediction_point)—into a Spark SQL query joining appropriate event tables with time filters.

The online feature store's three-tier architecture handles different access patterns and latency requirements. The daily batch pivoting from Parquet to HBase runs as a long-running Spark job taking hours. The warm-up flow loading user history from HBase to Redis completes in seconds when a user becomes active. Real-time updates to Redis happen in milliseconds as events stream in.

This architecture particularly optimizes for event-based features, which account for over 90% of features in the store. The pivoting process aggregates all relevant clickstream history per user, pre-computing intermediate aggregations where possible to accelerate serving-time calculations.

**Model Repository Structure**

Each model repository follows a standard structure with model.py containing the WixModel subclass implementation, an MLproject YAML defining entry points, and a production directory containing code dependencies that deploy to SageMaker alongside the model. This convention-over-configuration approach reduces boilerplate and ensures consistency across projects.

The schema registration process during build time is critical for automatic feature extraction. When a model registers its schema declaring required features by name, the platform creates the mapping between model ID and feature specifications. At serving time, the prediction service retrieves this schema, identifies which features to extract, calls the appropriate feature store APIs, assembles the feature vector, and passes it to the model—all transparently.

**Integration Points**

The platform integrates with Wix's existing data catalog for event discovery. When data scientists create features in the feature store UI, they select from cataloged events with associated metadata, filters, and schemas. This integration ensures features reference canonical event definitions rather than ad-hoc queries.

Git integration triggers CI builds on pushes. The console displays which git commit triggered each build and which commit the model was based on, supporting debugging and rollback scenarios. Deployment can also be triggered via API for programmatic workflows.

## Scale & Performance

While the presentation doesn't provide exhaustive performance metrics, several scale indicators emerge. The Data Science Group comprises approximately 25 data scientists and 10 ML engineers, managing models across premium prediction, churn, recommendation, ranking, and computer vision use cases. The user base spans 150-160 million registered users, though only a small fraction are active at any given time—a key assumption enabling the Redis caching strategy.

The support organization alone maintains approximately 10,000 support articles and employs around 1,000 support agents, indicating the scale of the recommendation system. The logo maker product generates logos ranked by ML models specifically trained on Wix-generated logo data from crowdsourcing and designers.

The feature store contains features primarily (>90%) based on clickstream events, with aggregations and categorical features dominating. The daily batch pivoting process to HBase runs for hours processing complete user histories. The warm-up flow loading a single user's history from HBase to Redis completes in seconds. Real-time cache updates happen in milliseconds as events stream through the Apache Storm pipeline.

SageMaker deployments support various instance types from ML compute-optimized to large instances, with one example showing a model deployed on two ML.t2.large instances. Auto-scaling policies adjust instance counts based on requests per minute, latency, and hardware utilization metrics surfaced through CloudWatch.

The health dashboards display requests per minute, median response time (presumably targeting sub-second latencies for synchronous predictions), and resource utilization metrics. The centralized prediction service tracks these metrics across all deployed models, providing standardized observability.

## Trade-offs & Lessons Learned

The team explicitly shares three hard-won lessons that offer valuable insights for practitioners building similar platforms.

**Software Engineering Practices Don't Always Align with ML Workflows**

The team fell into what they describe as a "naive notion" around build-on-commit workflows. Traditional CI/CD assumes builds should happen automatically on code commits, but ML training processes don't fit this model well. Data scientists require much more control: checking parameters, running multiple builds in parallel for experimentation, and debugging failed builds. The MLflow Projects approach with explicit build commands provides this control while maintaining reproducibility, but it required rethinking standard CI/CD assumptions.

**Online-Offline Data Parity is an Engineering Challenge**

Bridging the training-serving gap when features aren't based on simple point-in-time snapshots emerged as one of the platform's main focus areas. Event-based features with aggregations over time windows require fundamentally different implementations for batch Spark SQL versus real-time extraction from caches and streams. The three-tier HBase/Redis/Storm architecture solves this but adds significant complexity. The team notes this remains a particularly hard problem engineering-wise and consumed substantial development effort.

For non-event-based features, particularly site content features, the challenge intensifies. These features don't benefit from the event stream architecture and require different extraction strategies offline and online, creating additional maintenance burden.

**Model Monitoring Remains Non-Trivial**

The team emphasizes that deploying models to production often results in disappointment—performance falls well below test set expectations. Diagnosing why requires sophisticated monitoring. Is a specific feature misbehaving? Do production features have different statistical properties than training data (concept drift)? Are there data quality issues in upstream APIs?

Building good visualization and detection mechanisms for these failure modes proved challenging. The standardized logging of features and predictions enables building drift detection by comparing production feature distributions against the stored training data baseline. However, operationalizing this at scale across diverse model types remains an ongoing focus area rather than a solved problem.

**Architecture Decisions and Their Trade-offs**

The choice of AWS SageMaker as the serving platform brings significant benefits—managed infrastructure, auto-scaling, ML-optimized hardware, CloudWatch integration—but also couples the platform to AWS. The team explicitly chose managed services over building custom Kubernetes-based serving infrastructure, trading flexibility for reduced operational overhead. For their scale and team size, this appears well-justified.

The Protocol Buffers decision for feature definitions and APIs creates some friction (data scientists must learn protobuf schemas) but pays dividends in the training-serving consistency problem. The strongly-typed interface between systems prevents drift and enables the automatic feature extraction mechanism.

The centralized prediction service creates a potential single point of failure and scaling bottleneck, but the benefits—API standardization, automatic monitoring, transparent feature extraction—outweigh these risks for Wix's use cases. The service itself can scale horizontally as needed.

**Platform Adoption and Usability**

The platform's success metric is elegantly stated: if a data scientist can take a model from inception to production without the ML platform engineering team knowing about it, the team succeeded. This requires ruthless focus on developer experience—conventions over configuration, sensible defaults, clear error messages, and minimal ceremony.

The declarative feature store interface exemplifies this philosophy. Data scientists interact through a UI selecting event types, measures, and time windows rather than writing SQL or Python feature extraction code. The feature simply works both offline and online. When features need to change, data scientists control this entirely through the schema method listing feature names—no coordination with engineers required.

This approach's limitation is that feature families must be predefined and implemented by the platform team. Novel feature types outside the supported families require platform engineering work before data scientists can use them. The team mitigated this by starting with the most common patterns (event aggregations and categoricals covering >90% of use cases) and incrementally adding support for new families like site content features based on demand.

The lessons learned at Wix resonate with broader ML platform community experiences: ML workflows don't fit traditional software engineering paradigms perfectly, training-serving consistency requires substantial engineering investment, and monitoring production models remains an unsolved frontier requiring continuous innovation.
