---
title: "Griffin extensible MLOps platform to split monolithic Lore into modular workflows, orchestration, features, and framework-agnostic training"
slug: "instacart-griffin-griffin-extensible-mlops-platform-to-split-monolithic-lore-into-modular-workflows-orchestration-featur"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "airflow"
  - "dask"
  - "databricks"
  - "docker"
  - "mlflow"
  - "sagemaker"
  - "spark"
  - "data-ingestion"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Instacart"
companySlug: "instacart"
platformName: "Griffin"
contentType: "blog"
summary: "Instacart built Griffin, an extensible MLOps platform, to address the bottlenecks of their monolithic machine learning framework Lore as they scaled from a handful to hundreds of ML applications. Griffin adopts a hybrid architecture combining third-party solutions like AWS, Snowflake, Databricks, Ray, and Airflow with in-house abstraction layers to provide unified access across four foundational components: MLCLI for workflow development, Workflow Manager for pipeline orchestration, Feature Marketplace for data management, and a framework-agnostic training and inference platform. This microservice-based approach enabled Instacart to triple their ML applications in one year while supporting over 1 billion products, 600,000+ shoppers, and millions of customers across 70,000+ stores."
link: "https://www.instacart.com/company/tech-innovation/griffin-how-instacarts-ml-platform-tripled-ml-applications-in-a-year"
year: 2022
seo:
  title: "Instacart: Griffin extensible MLOps platform to split monolithic Lore into modular workflows, orchestration, features, and framework-agnostic training - ZenML MLOps Database"
  description: "Instacart built Griffin, an extensible MLOps platform, to address the bottlenecks of their monolithic machine learning framework Lore as they scaled from a handful to hundreds of ML applications. Griffin adopts a hybrid architecture combining third-party solutions like AWS, Snowflake, Databricks, Ray, and Airflow with in-house abstraction layers to provide unified access across four foundational components: MLCLI for workflow development, Workflow Manager for pipeline orchestration, Feature Marketplace for data management, and a framework-agnostic training and inference platform. This microservice-based approach enabled Instacart to triple their ML applications in one year while supporting over 1 billion products, 600,000+ shoppers, and millions of customers across 70,000+ stores."
  canonical: "https://www.zenml.io/mlops-database/instacart-griffin-griffin-extensible-mlops-platform-to-split-monolithic-lore-into-modular-workflows-orchestration-featur"
  ogTitle: "Instacart: Griffin extensible MLOps platform to split monolithic Lore into modular workflows, orchestration, features, and framework-agnostic training - ZenML MLOps Database"
  ogDescription: "Instacart built Griffin, an extensible MLOps platform, to address the bottlenecks of their monolithic machine learning framework Lore as they scaled from a handful to hundreds of ML applications. Griffin adopts a hybrid architecture combining third-party solutions like AWS, Snowflake, Databricks, Ray, and Airflow with in-house abstraction layers to provide unified access across four foundational components: MLCLI for workflow development, Workflow Manager for pipeline orchestration, Feature Marketplace for data management, and a framework-agnostic training and inference platform. This microservice-based approach enabled Instacart to triple their ML applications in one year while supporting over 1 billion products, 600,000+ shoppers, and millions of customers across 70,000+ stores."
mlops:
  source: "sqlite"
  entryId: 137
  sourceUrl: "https://www.instacart.com/company/tech-innovation/griffin-how-instacarts-ml-platform-tripled-ml-applications-in-a-year"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061789"
  lastUpdated: "2026-04-14T19:55:24.444206"
---

## Problem Context

Instacart's machine learning infrastructure evolved from humble beginnings with Lore, an open-source framework developed in 2016, to Griffin, a comprehensive MLOps platform designed to handle the company's hyper-growth. The scale of Instacart's ML challenges is substantial: the platform helps customers navigate a catalog of over 1 billion products, supports more than 600,000 shoppers delivering to millions of customers, enables 800+ retailers across 70,000+ stores in 5,500+ cities, and connects 5,000+ brand partners to potential customers. Each of these use cases requires multiple machine learning models that must integrate seamlessly to power end-to-end experiences.

The original Lore framework abstracted away connections to data sources like Postgres and Snowflake, managed development environments for Python applications, supported modeling using open-source frameworks including Keras, Scikit-learn, and XGBoost, and integrated simple feature engineering. While Lore successfully enabled rapid deployment of ML applications when Instacart had only a few models in production, it became a critical bottleneck as the company scaled. The monolithic architecture meant that accommodating new features required refactoring Lore's core design, creating friction and slowing down the pace of innovation. The increasing number, diversity, and complexity of machine learning applications demanded a fundamentally different architectural approach.

The core challenges that motivated Griffin's development included the need for fast iteration on machine learning models, effortless management of product releases, and close tracking of production applications. The platform needed to support not just current scale but anticipated growth to potentially thousands of machine learning applications across diverse teams with varied requirements.

## Architecture and Design

Griffin adopts a hybrid solution philosophy for MLOps, combining third-party commercial and open-source solutions with in-house abstraction layers to provide unified access. This architectural decision was deliberate: rather than building everything from scratch like Netflix and Facebook, or adopting purely third-party tools like Shopify and Spotify, Instacart chose a middle path that allows them to leverage specialized solutions while maintaining flexibility and control through abstraction layers.

The platform is built on microservice architecture with four foundational components that work together to support the complete ML lifecycle:

**MLCLI** serves as the in-house machine learning interface for developing applications and managing model lifecycle. This command-line tool enables machine learning engineers to customize tasks like training, evaluation, and inference within containerized environments, particularly Docker. The containerization strategy eliminates issues caused by differences in execution environments and provides a unified interface across diverse applications. MLEs use MLCLI to generate ML workflow code from base templates, test code using Notebooks, deploy ML workflows for feature engineering and continuous training, and host trained models as endpoints for inference.

**Workflow Manager and ML Launcher** handle the orchestration and scheduling of machine learning pipelines. The Workflow Manager leverages Apache Airflow to schedule containers but critically abstracts away Airflow runtime details from MLEs through the ML Launcher component. ML Launcher integrates multiple compute backends including AWS Sagemaker, Databricks, and Snowflake to perform container runs, enabling the platform to meet unique hardware requirements for ML workloads such as GPUs, instances with large memory, and disks with high IO throughput. This design choice allows the platform to scale easily to hundreds of DAGs (Directed Acyclic Graphs) with thousands of tasks in a short period. MLEs define each workflow step as an independent command in a Docker runtime, construct and deploy the workflow, and all new workflows are automatically synchronized, scheduled, and executed for continuous training.

**Feature Marketplace** positions data at the center of the MLOps platform, managing the complete feature lifecycle from computation to serving. The FM system uses platforms including Snowflake, Spark, and Flink to support both real-time and batch feature engineering. It provides feature computation management, feature storage, feature versioning, feature discoverability, eliminates offline/online feature drift, and enables feature sharing across teams. Following the hybrid solution approach, Feature Marketplace integrates multiple storage backends including Scylla, Redis, and S3, balancing latency requirements against storage costs for serving features at scale. The architecture includes Feature Definitions (FD) as a standard YAML schema for defining features, an FM backend service (a microservice managing CRUD operations on feature pipelines), a Feature Store providing consistent access to features, and an FM UI for feature discovery along with RPC services for feature consumption.

**Training and Inference Platform** provides framework-agnostic support for open-source frameworks including Tensorflow, PyTorch, Sklearn, XGBoost, FastText, and Faiss. To support this diversity while ensuring reliable model deployment in production, the platform standardizes package management, metadata management, and code management. The platform includes an ML Training Abstraction (a Python package defining classes for training management) and supports custom model networks and Docker runtimes. MLEs tune hyperparameters by scheduling multiple runs and tracking metrics and metadata in MLFlow, then deploy the best-performing model version to the inference service using Twirp (an RPC framework) and AWS ECS (a managed container orchestration service).

## Technical Implementation

The technical stack reveals Instacart's pragmatic approach to building MLOps infrastructure. Rather than committing to a single vendor or building everything in-house, they assembled a carefully curated combination of technologies:

For data management and storage, Griffin integrates Snowflake for data warehousing, Scylla and Redis for low-latency feature serving, and S3 for artifact and model storage. The multi-database approach for the Feature Store represents a deliberate trade-off between latency and cost, allowing the team to optimize storage choices based on access patterns and performance requirements.

For workflow orchestration, the platform builds on Apache Airflow while abstracting away its complexity through the ML Launcher component. This allows MLEs to focus on defining their pipeline logic without becoming Airflow experts. The containerization strategy centers on Docker, providing consistent runtime environments and simplifying troubleshooting.

For compute infrastructure, Griffin integrates AWS Sagemaker for managed ML training and inference, Databricks for Spark-based workloads, and AWS ECS for container orchestration. This multi-cloud and multi-platform approach provides flexibility to match compute resources to workload characteristics.

For feature engineering, the platform combines Snowflake for batch processing, Spark for distributed computation, and Flink for stream processing. This enables both batch and real-time feature computation paths, addressing different latency and freshness requirements across various ML applications.

For experiment tracking and model metadata, the platform adopts MLFlow, a widely-used open-source platform. This provides MLEs with familiar tooling for tracking experiments, comparing model performance, and managing the model development lifecycle.

For model serving, Griffin uses Twirp as an RPC framework, providing a lightweight alternative to gRPC for model inference endpoints. The use of AWS ECS for hosting these endpoints provides managed container orchestration without the operational overhead of running Kubernetes.

The platform's support for diverse ML frameworks (Tensorflow, PyTorch, Sklearn, XGBoost, FastText, Faiss) through the framework-agnostic design demonstrates the commitment to flexibility. Rather than forcing teams to standardize on a single framework, Griffin provides abstractions that accommodate different modeling approaches while maintaining consistency in deployment and operations.

## Scale and Performance

The impact of Griffin on Instacart's ML capabilities is quantified by a key metric: the platform enabled the company to triple the number of ML applications in one year. This represents a dramatic acceleration in ML adoption across the organization, moving from a constrained environment where Lore was a bottleneck to a self-service platform where diverse teams can rapidly develop and deploy models.

The platform operates at significant scale, supporting ML applications that serve over 1 billion products in Instacart's catalog, coordinate more than 600,000 shoppers, serve millions of customers, operate across 70,000+ stores in 5,500+ cities, and connect 5,000+ brand partners to customers. While the article doesn't provide specific latency or throughput numbers for individual services, the architecture's emphasis on balancing latency and storage costs in the Feature Store, combined with the use of Redis and Scylla for low-latency serving, indicates that real-time inference is a critical requirement.

The Workflow Manager's ability to scale to hundreds of DAGs with thousands of tasks demonstrates the platform's capacity to handle complex, multi-step ML pipelines across numerous applications. This represents a substantial increase in orchestration capacity compared to the earlier Lore framework.

The Feature Marketplace's integration of multiple storage backends (Scylla, Redis, S3) suggests sophisticated optimization around different access patterns. Redis likely serves the hottest features requiring millisecond latency, Scylla provides a middle tier for moderately frequent access with sub-second latency, and S3 handles bulk storage of historical feature values and less frequently accessed data.

## Trade-offs and Lessons Learned

Instacart's team extracted several valuable insights from their experience building Griffin, providing guidance for other organizations facing similar MLOps challenges.

**Buy versus Build** emerged as a critical decision framework. The team found that leveraging existing commercial and non-commercial third-party solutions enabled them to support a quickly-growing feature set and avoid reinventing the wheel. However, they emphasized the importance of careful integration: the abstraction layers needed to be designed such that switching between solutions would incur minimal migration overhead. This represents a pragmatic middle ground between the "build everything" approach of companies like Netflix and Facebook, and the "buy everything" approach that can lead to vendor lock-in and inflexibility.

**Flexibility as a design principle** proved essential for driving adoption. Supporting custom ML applications increased usage among diverse teams at Instacart. The platform generates code from standardized templates but provides the ability to override defaults, and allows MLEs to integrate legacy systems until they have bandwidth for migration. The adoption of Docker runtimes to ensure consistent running environments for custom applications was highlighted as particularly valuable, simplifying the reproduction of user experiences and enabling faster troubleshooting.

**Incremental progress over perfection** kept the platform development on track. Regular onboarding sessions streamlined feedback and kept the platform design simple. The team scheduled regular hands-on codelabs to onboard MLEs onto new features and gather early feedback for improvement. This approach encouraged collaboration and prevented engineers from spending years building the "perfect" platform without delivering incremental value. The emphasis on regular user engagement and iterative improvement reflects lessons learned from product development applied to platform engineering.

**Extensibility enabling rapid growth** emerged as perhaps the most important architectural principle. The team found that extensible and reusable foundational components enabled several key capabilities: self-service infrastructure for accommodating feature requests from growing numbers of MLEs, a modular codebase for adapting to the fast-changing MLOps landscape, a simple interface for smooth onboarding, and a production-ready system capable of scaling to millions of Instacart users. The microservice architecture was central to achieving this extensibility, allowing different components to evolve independently.

The containerization strategy, while adding some operational complexity, paid dividends in consistency and troubleshooting. By ensuring that code runs in identical environments from development through production, the platform eliminated an entire class of "works on my machine" problems that plague ML deployments.

The hybrid approach to tooling represents a sophisticated trade-off. By combining third-party solutions with in-house abstractions, Instacart gains the benefits of specialized tools and active open-source communities while maintaining the flexibility to swap out components as the landscape evolves. The abstraction layers also provide a consistent interface for MLEs, reducing cognitive load and onboarding friction despite the underlying complexity of multiple integrated systems.

The Feature Marketplace's multi-backend storage strategy exemplifies the platform's willingness to embrace complexity where it delivers value. Rather than choosing a single storage solution, the team implemented a tiered approach that optimizes for different access patterns and cost constraints. This requires more sophisticated infrastructure management but delivers better performance and cost efficiency at scale.

The decision to make the platform framework-agnostic rather than standardizing on specific ML frameworks reflects Instacart's recognition that different problems benefit from different tools. While framework standardization would simplify platform development, it would constrain MLEs and potentially force suboptimal modeling choices. The abstraction layers in Griffin provide consistency in deployment and operations without limiting modeling approaches.
