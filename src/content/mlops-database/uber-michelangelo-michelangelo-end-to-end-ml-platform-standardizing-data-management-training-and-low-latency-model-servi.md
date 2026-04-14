---
title: "Michelangelo end-to-end ML platform standardizing data management, training, and low-latency model serving across teams"
slug: "uber-michelangelo-michelangelo-end-to-end-ml-platform-standardizing-data-management-training-and-low-latency-model-servi"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "dask"
  - "databricks"
  - "horovod"
  - "ray"
  - "spark"
  - "ab-testing"
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
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo"
contentType: "blog"
summary: "Uber built Michelangelo, an end-to-end ML-as-a-service platform, to address the fragmentation and scaling challenges they faced when deploying machine learning models across their organization. Before Michelangelo, data scientists used disparate tools with no standardized path to production, no scalable training infrastructure beyond desktop machines, and bespoke one-off serving systems built by separate engineering teams. Michelangelo standardizes the complete ML workflow from data management through training, evaluation, deployment, prediction, and monitoring, supporting both traditional ML and deep learning. Launched in 2015 and in production for about a year by 2017, the platform has become the de-facto system for ML at Uber, serving dozens of teams across multiple data centers with models handling over 250,000 predictions per second at sub-10ms P95 latency, with a shared feature store containing approximately 10,000 features used across the company."
link: "https://www.uber.com/en-NL/blog/michelangelo-machine-learning-platform/"
year: 2017
seo:
  title: "Uber: Michelangelo end-to-end ML platform standardizing data management, training, and low-latency model serving across teams - ZenML MLOps Database"
  description: "Uber built Michelangelo, an end-to-end ML-as-a-service platform, to address the fragmentation and scaling challenges they faced when deploying machine learning models across their organization. Before Michelangelo, data scientists used disparate tools with no standardized path to production, no scalable training infrastructure beyond desktop machines, and bespoke one-off serving systems built by separate engineering teams. Michelangelo standardizes the complete ML workflow from data management through training, evaluation, deployment, prediction, and monitoring, supporting both traditional ML and deep learning. Launched in 2015 and in production for about a year by 2017, the platform has become the de-facto system for ML at Uber, serving dozens of teams across multiple data centers with models handling over 250,000 predictions per second at sub-10ms P95 latency, with a shared feature store containing approximately 10,000 features used across the company."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-michelangelo-end-to-end-ml-platform-standardizing-data-management-training-and-low-latency-model-servi"
  ogTitle: "Uber: Michelangelo end-to-end ML platform standardizing data management, training, and low-latency model serving across teams - ZenML MLOps Database"
  ogDescription: "Uber built Michelangelo, an end-to-end ML-as-a-service platform, to address the fragmentation and scaling challenges they faced when deploying machine learning models across their organization. Before Michelangelo, data scientists used disparate tools with no standardized path to production, no scalable training infrastructure beyond desktop machines, and bespoke one-off serving systems built by separate engineering teams. Michelangelo standardizes the complete ML workflow from data management through training, evaluation, deployment, prediction, and monitoring, supporting both traditional ML and deep learning. Launched in 2015 and in production for about a year by 2017, the platform has become the de-facto system for ML at Uber, serving dozens of teams across multiple data centers with models handling over 250,000 predictions per second at sub-10ms P95 latency, with a shared feature store containing approximately 10,000 features used across the company."
mlops:
  source: "sqlite"
  entryId: 9
  sourceUrl: "https://www.uber.com/en-NL/blog/michelangelo-machine-learning-platform/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060417"
  lastUpdated: "2026-04-14T19:54:32.489311"
---

## Problem Context

Before building Michelangelo in mid-2015, Uber faced significant challenges in operationalizing machine learning at scale. Data scientists worked with fragmented tooling including R, scikit-learn, and custom algorithms, while separate engineering teams built bespoke one-off systems to deploy these models into production. This fragmentation severely limited ML's impact at Uber to what small teams could accomplish quickly with mostly open source tools.

The specific pain points that motivated Michelangelo's development included the absence of reliable, uniform, and reproducible pipelines for creating and managing training and prediction data at scale. Training was constrained to datasets that could fit on data scientists' desktop machines, with no standard location to store training experiment results and no easy mechanism to compare experiments against each other. Most critically, there was no established production deployment path—each project required engineering teams to create custom serving containers specific to that use case. Uber was beginning to observe many of the ML anti-patterns documented in the seminal paper by Scully et al. on hidden technical debt in machine learning systems.

Michelangelo was designed to address these gaps by standardizing workflows and tools across teams through an end-to-end system that enables users company-wide to build and operate machine learning systems at scale. The initial focus addressed scalable model training and production deployment, followed by improved systems for managing and sharing feature pipelines, with more recent work concentrating on developer productivity to accelerate the path from idea to first production model and subsequent fast iterations.

## Architecture & Design

Michelangelo's architecture is built atop Uber's existing data and compute infrastructure, providing a comprehensive platform that covers the six-step ML workflow: manage data, train models, evaluate models, deploy models, make predictions, and monitor predictions. The system architecture blends mature open source components with custom in-house systems, preferring to fork and customize open source solutions while contributing back improvements.

### Core Infrastructure Components

The platform leverages Uber's data lake storing all transactional and logged data in HDFS, Kafka brokers aggregating logged messages from all Uber services, a Samza streaming compute engine, managed Cassandra clusters, and Uber's internal service provisioning and deployment tools. The primary open source components include HDFS, Spark, Samza, Cassandra, MLLib, XGBoost, and TensorFlow.

### Data Management Architecture

Data management is divided between offline and online pipelines. Offline pipelines feed batch model training and batch prediction jobs, while online pipelines support low-latency online predictions and future online learning systems. Uber's transactional and log data flows into the HDFS data lake, accessible via Spark and Hive SQL compute jobs.

For offline feature generation, the platform provides containers and scheduling to run regular jobs computing features that can remain private to a project or be published to the shared Feature Store. Batch jobs run on schedules or triggers and integrate with data quality monitoring tools to quickly detect regressions in pipelines due to local or upstream code or data issues.

For online serving, models deployed to production cannot access HDFS data, and computing features directly from production databases backing Uber's services is often impractical. Instead, features needed for online models are precomputed and stored in Cassandra for low-latency reads at prediction time. The system supports two approaches: batch precompute, where historical features are bulk-loaded from HDFS into Cassandra on regular intervals (suitable for features updated every few hours or daily), and near-real-time compute, where relevant metrics are published to Kafka and Samza-based streaming jobs generate aggregate features at low latency, writing them to Cassandra for serving while logging back to HDFS for future training. To avoid cold starts, a backfill tool generates training data by running batch jobs against historical logs.

### Feature Store

A critical architectural component is the centralized Feature Store, which allows teams across Uber to create and manage canonical features for their teams and share with others. The Feature Store requires minimal extra metadata beyond what's needed for private features—owner, description, SLA—and makes features easy to consume both online and offline by referencing simple canonical names in model configurations. The system automatically handles joining correct HDFS datasets for model training or batch prediction and fetching appropriate values from Cassandra for online predictions. By 2017, approximately 10,000 features existed in the Feature Store with new ones added continuously, automatically calculated and updated daily.

### Domain-Specific Language for Features

Michelangelo includes a DSL (domain-specific language) implemented as a subset of Scala for selecting, transforming, and combining features. This pure functional language provides commonly used functions plus the ability for teams to add custom user-defined functions. Accessor functions fetch feature values from the current context (data pipeline for offline models or current request from client for online models) or from the Feature Store. Critically, DSL expressions are part of the model configuration and the same expressions apply at both training and prediction time, guaranteeing consistency in the final feature vectors sent to models.

### Model Repository

The platform stores every trained model as a versioned object in Cassandra, capturing comprehensive metadata including who trained the model, start and end times of the training job, full model configuration (features used, hyper-parameter values), references to training and test datasets, feature distribution and relative importance, model accuracy metrics, standard charts and graphs for each model type (ROC curve, PR curve, confusion matrix for binary classifiers), full learned parameters, and summary statistics for model visualization. This information is accessible through both a web UI and programmatic API for inspecting individual models and comparing multiple models.

## Technical Implementation

### Training Infrastructure

The platform supports offline, large-scale distributed training of decision trees, linear and logistic models, unsupervised models (k-means), time series models, and deep neural networks. Training scales to handle billions of samples and down to small datasets for quick iterations. A model configuration specifies model type, hyper-parameters, data source reference, feature DSL expressions, and compute resource requirements (number of machines, memory, GPU usage). Training jobs run on YARN or Mesos clusters.

After training completes, performance metrics are computed and combined into a model evaluation report. The original configuration, learned parameters, and evaluation report are saved to the model repository. The platform supports hyper-parameter search for all model types and partitioned models, where training data is automatically partitioned based on user configuration and one model is trained per partition, with fallback to parent models when needed (for example, training one model per city with fallback to country-level models when city-level accuracy is insufficient).

Training jobs are configured and managed through a web UI or API, often via Jupyter notebooks. Many teams use the API and workflow tools to schedule regular model retraining.

### Deployment Modes

Michelangelo supports three deployment modes through end-to-end management via UI or API:

**Offline deployment** deploys models to offline containers running in Spark jobs to generate batch predictions either on demand or on repeating schedules.

**Online deployment** deploys models to online prediction service clusters containing hundreds of machines behind a load balancer, where clients send individual or batched prediction requests as network RPC calls.

**Library deployment** (planned at time of writing) deploys models to serving containers embedded as libraries in other services, invoked via Java API.

In all cases, required model artifacts (metadata files, model parameter files, compiled DSL expressions) are packaged in ZIP archives and copied to relevant hosts across Uber's data centers using standard code deployment infrastructure. Prediction containers automatically load new models from disk and begin handling prediction requests.

### Prediction Serving

Once deployed and loaded, models make predictions based on feature data from data pipelines or directly from client services. Raw features are passed through compiled DSL expressions which modify features and/or fetch additional features from the Feature Store. The final feature vector is constructed and passed to the model for scoring. For online models, predictions return to the client service over the network. For offline models, predictions are written to Hive for consumption by downstream batch jobs or direct SQL-based access.

Multiple models can be deployed simultaneously to a given serving container, enabling safe transitions from old to new models and side-by-side A/B testing. At serving time, models are identified by UUID and optional tag (alias) specified during deployment. For online models, client services send feature vectors with model UUID or tag; for tags, the container uses the most recently deployed model to that tag. For batch models, all deployed models score each batch dataset, with prediction records containing model UUID and optional tag for filtering.

### Monitoring Infrastructure

The platform automatically logs and optionally holds back a percentage of predictions, later joining them to observed outcomes (labels) generated by the data pipeline. This generates ongoing, live measurements of model accuracy. For regression models, the system publishes R-squared/coefficient of determination, root mean square logarithmic error (RMSLE), root mean square error (RMSE), and mean absolute error metrics to Uber's time series monitoring systems, enabling users to analyze charts over time and set threshold alerts.

### Visualization and Analysis Tools

For decision tree models, sophisticated visualization tools let users browse individual trees to see their relative importance to the overall model, split points, feature importance per tree, and data distribution at each split. Users can specify feature values and the visualization depicts triggered paths down decision trees, prediction per tree, and overall model prediction.

Feature reports show each feature in order of importance with partial dependence plots and distribution histograms. Selecting two features enables understanding feature interactions through two-way partial dependence diagrams.

## Scale & Performance

By 2017, after approximately one year in production, Michelangelo had become the de-facto system for machine learning at Uber with dozens of teams building and deploying models. The platform is deployed across several Uber data centers, leverages specialized hardware, and serves predictions for the highest loaded online services at the company.

### Performance Metrics

Online serving latency depends on model type and complexity and whether the model requires features from the Cassandra feature store. For models not requiring Cassandra features, typical P95 latency is less than 5 milliseconds. For models requiring Cassandra features, typical P95 latency is less than 10 milliseconds. The highest traffic models serve more than 250,000 predictions per second.

The Feature Store contains approximately 10,000 features used to accelerate machine learning projects, with teams continuously adding new ones. Features are automatically calculated and updated daily.

### Scalability Approach

Since machine learning models are stateless and share nothing, they are trivially scaled out in both online and offline serving modes. For online models, additional hosts can be added to the prediction service cluster with the load balancer spreading load. For offline predictions, additional Spark executors can be added with Spark managing parallelism.

## Use Case: UberEATS Estimated Time of Delivery

UberEATS exemplifies Michelangelo's practical application, running several models covering meal delivery time predictions, search rankings, search autocomplete, and restaurant rankings. The delivery time models predict preparation and delivery duration before order issuance and at each delivery process stage.

Predicting meal estimated time of delivery (ETD) involves complex multi-stage processes: restaurants acknowledge orders, prepare meals depending on order complexity and restaurant busyness, Uber delivery-partners are dispatched when meals near completion, partners navigate to restaurants, find parking, retrieve food, drive to customer locations considering route and traffic, find parking again, and walk to customer doors. The goal is predicting total duration of this complex process and recalculating predictions at every step.

UberEATS data scientists use gradient boosted decision tree regression models on Michelangelo for end-to-end delivery time prediction. Features include request information (time of day, delivery location), historical features (average meal prep time over the last seven days), and near-real-time calculated features (average meal prep time over the last hour). Models are deployed across Uber's data centers to Michelangelo model serving containers and invoked via network requests by UberEATS microservices. Predictions display to customers prior to ordering from restaurants and as meals are prepared and delivered.

## Trade-offs & Lessons

### What Worked Well

The centralized Feature Store proved highly valuable, enabling feature sharing across teams and reducing duplicate work while increasing data quality. The standardization of workflows and tools across the organization successfully democratized machine learning, making it accessible to many teams rather than limited to a few specialists.

The unified offline and online data pipelines with guaranteed consistency between training and serving environments addressed a critical challenge in production ML systems. The same batch pipelines and near-real-time compute systems generate features for both training and serving, eliminating training-serving skew.

The comprehensive model repository with versioning, metadata tracking, and visualization tools provided the observability and comparison capabilities needed for iterative model development at scale. The ability to track who trained models, when, with what configuration, and with what results enabled effective collaboration and reproducibility.

The platform's support for multiple deployment modes and model versioning through UUIDs and tags enabled safe production transitions and A/B testing without requiring client code changes when model signatures remained consistent.

### Architectural Choices and Trade-offs

Michelangelo made pragmatic choices about when to use open source versus building custom solutions. The team preferred mature open source components where suitable (HDFS, Spark, Cassandra, XGBoost, TensorFlow) while building custom systems for unique use cases like the Feature Store and DSL for feature transformations.

The DSL approach for feature selection and transformation represents an interesting trade-off: it adds a custom language for users to learn but guarantees consistency between training and serving through shared configuration. This addresses a common source of production ML failures.

The decision to support both batch precompute and near-real-time compute for online features provides flexibility at the cost of system complexity. Different use cases have different freshness requirements, and supporting both patterns accommodates these varying needs while maintaining consistency guarantees.

### Future Directions and Lessons

The article identifies several areas for continued development, revealing both successful patterns and remaining challenges. AutoML represents recognition that even with good platform support, identifying optimal model configurations, features, and hyper-parameters remains time-consuming. The platform had already addressed components of this (Feature Store, unified pipelines, hyper-parameter search) but planned to accelerate data scientist productivity further through automated configuration search.

Model visualization received explicit mention as needing more work, especially for deep learning. While tree-based model visualization tools provided value, understanding and debugging complex models remained challenging and important for both data scientists and end users trusting results.

Online learning was identified as critical for models operating in the dynamic physical world environment. Though teams regularly retrained models in Michelangelo, a full platform solution required easily updateable model types, faster training and evaluation architecture, automated validation and deployment, and sophisticated monitoring and alerting. Early results suggested substantial potential gains from proper online learning support.

Distributed deep learning received attention as an increasing number of Uber's ML systems implemented deep learning technologies. The user workflow for defining and iterating on deep learning models differed sufficiently from standard workflows to need unique platform support, with different data volumes and hardware requirements (GPUs) motivating further investment in distributed learning and flexible resource management.

### Key Insights for Practitioners

The Michelangelo case study demonstrates that successful ML platforms require more than just training and serving infrastructure. Data management, particularly feature engineering and consistency between training and serving, represents a substantial portion of the value and complexity. The Feature Store pattern—a centralized, curated repository of features with automatic offline and online serving—proved highly valuable for reducing duplicate work and improving quality.

Comprehensive model repository capabilities including versioning, metadata tracking, and visualization tools enable the iterative exploration process fundamental to effective machine learning. Tracking hundreds of models that don't make it to production guides engineers toward optimal configurations.

Standardization through platform abstractions democratizes ML access across organizations while maintaining consistency and quality. The same DSL expressions, the same data pipelines, and the same deployment infrastructure across teams reduce fragmentation and accelerate development.

Monitoring and evaluation must be built into the platform from the beginning rather than bolted on later. Automatically logging predictions, joining them to observed outcomes, and publishing accuracy metrics to monitoring systems enables teams to detect when models degrade in production.
