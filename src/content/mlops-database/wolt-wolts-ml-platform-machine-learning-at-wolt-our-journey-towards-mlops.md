---
title: "Machine learning at Wolt: our journey towards MLOps"
slug: "wolt-wolts-ml-platform-machine-learning-at-wolt-our-journey-towards-mlops"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "seldon"
  - "terraform"
  - "ab-testing"
  - "deployment"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "shadow-deployment"
  - "training"
industryTags: "e-commerce"
company: "Wolt"
companySlug: "wolt"
platformName: "Wolt's ML platform"
contentType: "blog"
summary: "Wolt, a food delivery logistics platform serving millions of customers and partnering with tens of thousands of venues and over a hundred thousand couriers, embarked on a journey to standardize their machine learning deployment practices. Previously, data scientists had to manually build APIs, create routes, add monitoring, and ensure scalability for each model deployment, resulting in duplicated effort and non-homogeneous infrastructure. The team spent nearly a year building a next-generation ML platform on Kubernetes using Seldon-Core as the deployment framework, combined with MLFlow for model registry and metadata tracking. This new infrastructure abstracts away complexity, provides out-of-the-box monitoring and logging, supports multiple ML frameworks (XGBoost, SKLearn, Triton, TensorFlow Serving, MLFlow Server), enables shadow deployments and A/B testing without additional code, and includes an automatic model update service that evaluates and deploys new model versions based on performance metrics."
link: "https://careers.wolt.com/en/blog/tech/machine-learning-at-wolt-our-journey-towards-mlops"
year: 2022
seo:
  title: "Wolt: Machine learning at Wolt: our journey towards MLOps - ZenML MLOps Database"
  description: "Wolt, a food delivery logistics platform serving millions of customers and partnering with tens of thousands of venues and over a hundred thousand couriers, embarked on a journey to standardize their machine learning deployment practices. Previously, data scientists had to manually build APIs, create routes, add monitoring, and ensure scalability for each model deployment, resulting in duplicated effort and non-homogeneous infrastructure. The team spent nearly a year building a next-generation ML platform on Kubernetes using Seldon-Core as the deployment framework, combined with MLFlow for model registry and metadata tracking. This new infrastructure abstracts away complexity, provides out-of-the-box monitoring and logging, supports multiple ML frameworks (XGBoost, SKLearn, Triton, TensorFlow Serving, MLFlow Server), enables shadow deployments and A/B testing without additional code, and includes an automatic model update service that evaluates and deploys new model versions based on performance metrics."
  canonical: "https://www.zenml.io/mlops-database/wolt-wolts-ml-platform-machine-learning-at-wolt-our-journey-towards-mlops"
  ogTitle: "Wolt: Machine learning at Wolt: our journey towards MLOps - ZenML MLOps Database"
  ogDescription: "Wolt, a food delivery logistics platform serving millions of customers and partnering with tens of thousands of venues and over a hundred thousand couriers, embarked on a journey to standardize their machine learning deployment practices. Previously, data scientists had to manually build APIs, create routes, add monitoring, and ensure scalability for each model deployment, resulting in duplicated effort and non-homogeneous infrastructure. The team spent nearly a year building a next-generation ML platform on Kubernetes using Seldon-Core as the deployment framework, combined with MLFlow for model registry and metadata tracking. This new infrastructure abstracts away complexity, provides out-of-the-box monitoring and logging, supports multiple ML frameworks (XGBoost, SKLearn, Triton, TensorFlow Serving, MLFlow Server), enables shadow deployments and A/B testing without additional code, and includes an automatic model update service that evaluates and deploys new model versions based on performance metrics."
mlops:
  source: "sqlite"
  entryId: 149
  sourceUrl: "https://careers.wolt.com/en/blog/tech/machine-learning-at-wolt-our-journey-towards-mlops"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061925"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Wolt operates a large-scale food delivery logistics platform, serving millions of customers while coordinating with tens of thousands of restaurant venues and more than a hundred thousand courier partners. Machine learning sits at the core of their business operations, powering critical predictions that directly impact user experience. These models estimate restaurant food preparation times, courier delivery times, and provide insights into key business metrics that help the platform scale sustainably.

Prior to their MLOps transformation, Wolt faced significant infrastructure challenges around model deployment. Each data scientist deployed models in their own way, creating a heterogeneous landscape that made it nearly impossible to provide centralized services or standardized tooling. When a data scientist wanted to put a model into production, they had to not only build the machine learning model itself but also construct the entire serving infrastructure around it. This meant writing custom APIs from scratch, defining all the necessary routes, implementing monitoring solutions for each individual model, configuring logging, and ensuring the deployment would be scalable and observable. This pattern repeated for every single model deployment, creating massive duplication of effort and inconsistent quality across deployments.

The Core ML and Data Engineering team at Wolt was established two years before this article to address these challenges. Their vision centered on making Wolt's data available across the company and ensuring data generates maximum value through machine learning and data products. The team recognized that without a standardized MLOps approach, they would continue to struggle with efficiency, reliability, and the ability to scale their machine learning capabilities alongside business growth.

## Architecture & Design

The new machine learning platform architecture comprises several interconnected components that work together to provide an end-to-end ML lifecycle management system. At its foundation, the platform runs on Kubernetes infrastructure, which provides the scalability and reliability needed for production deployments while offering flexibility for various workload types.

The **Model Training Pipeline** component consists of pipelines written in Python that train models using different feature sets. Wolt deployed additional infrastructure on top of Kubernetes specifically to allow data scientists to train models using shared computational resources, eliminating the need for individual teams to provision their own training infrastructure.

**MLFlow** serves as the central model registry and metadata store. This component tracks all experiments, stores model artifacts, maintains metadata about model versions, and provides a single source of truth for determining which model version is currently running in production. The MLFlow registry becomes the authoritative record that drives downstream automation and deployment decisions.

The **Automatic Update Service** represents a critical piece of automation in the platform. This service monitors MLFlow for new model versions and automatically triggers deployment workflows when updates are detected. The service evaluates new models based on predefined metrics and informs engineers when deployments complete successfully. The long-term vision for this service extends to fully automatic model retraining and deployment based on performance degradation detection or other engineer-defined criteria.

**Seldon-Core** provides the core deployment framework for real-time model inference. This open-source framework builds on top of Kubernetes while abstracting away much of its complexity from data scientists. Seldon-Core follows the V2 Data Plane inference API, which defines a predict/inference API that remains independent of specific ML frameworks or model servers. When a model gets deployed through Seldon-Core, it automatically creates both REST and gRPC endpoints, provisions the necessary Kubernetes resources, configures monitoring, and sets up logging—all without requiring the data scientist to write any infrastructure code.

The **Prediction Service** created with Seldon receives inference requests from various parts of the Wolt platform. It can handle requests in different formats and from different services, providing flexibility in how models integrate with the broader system architecture.

**Response Logging** captures all predictions made by deployed models, storing them for future analysis and model improvement. This logged data becomes invaluable for analyzing model behavior in production, identifying areas for improvement, and potentially creating training datasets for future model iterations.

The platform architecture also enables sophisticated deployment patterns including shadow mode deployments, A/B testing, and canary deployments without requiring data scientists to write additional code. These capabilities are built into the framework itself, allowing teams to experiment with new model versions while monitoring their behavior against production baselines before fully cutting over traffic.

## Technical Implementation

The technical stack centers on Kubernetes as the orchestration layer, with Seldon-Core version providing the ML-specific abstractions. The decision to use Seldon-Core came after extensive analysis and discussions with data scientists about their needs and preferences. Several factors drove this choice: Seldon-Core is open-source, allowing Wolt to contribute upstream fixes or features if needed; it builds naturally on Kubernetes primitives while hiding complexity; and it supports the V2 Data Plane inference API standard.

The platform takes an explicitly framework-agnostic approach, supporting most major ML frameworks including XGBoost, scikit-learn, Triton Inference Server, MLFlow Server, and TensorFlow Serving. This flexibility lets data scientists choose the best framework for their specific use case rather than forcing standardization on a single framework. While the team acknowledges they might focus on specific frameworks in the future for performance optimization, they valued preserving this choice during the initial platform build.

Models are stored on AWS S3, from which Seldon-Core loads them for serving. A basic deployment definition in Seldon-Core can be remarkably simple—engineers define a specification that references the model location on S3 and specifies the model type (such as a scikit-learn classifier), and Seldon-Core handles the rest. Once deployed, the specification automatically creates a deployment with REST and gRPC routes and monitoring configured out of the box.

MLFlow integration provides experiment tracking and model registry capabilities. Data scientists can track experiments during model development, register successful models to the MLFlow registry, and the automatic update service monitors this registry to trigger deployments when new versions become available.

The platform leverages Wolt's existing continuous integration patterns, making deployments standardized and consistent. This standardization proves particularly valuable for on-call engineers who need to understand what's happening with a model deployment without necessarily being familiar with the specific ML use case.

Monitoring spans both traditional software engineering metrics and ML-specific observability. The platform automatically tracks latency, error rates, and requests per second for each deployed model. Additionally, it captures and monitors the actual predictions being made, which enables powerful comparison capabilities. For example, when running a new model in shadow mode alongside the production model, teams can compare the predictions from both models to understand how behavior differs before making the new model live.

The training infrastructure deployment on top of Kubernetes allows data scientists to submit training jobs that run on shared cluster resources, providing better resource utilization and removing the need for data scientists to manage their own training infrastructure.

## Scale & Performance

While the article doesn't provide extensive quantitative metrics, it does establish the scale context for the platform. Wolt serves millions of customers across their platform and partners with tens of thousands of restaurant venues and more than a hundred thousand courier partners. Machine learning models operate in critical paths of the user experience, meaning they must handle substantial request volumes with acceptable latency.

The models predict restaurant preparation times and courier delivery times, which are time-sensitive predictions that need to be available in real-time as users interact with the platform. The infrastructure needs to scale elastically to handle varying demand patterns throughout the day and across different geographic markets.

The platform was built over the course of nearly a year, involving analysis of potential tools, extensive discussions with data scientists to understand requirements, and iterative deployment with consistent feedback loops. The team maintains a strong focus on ensuring the infrastructure can scale with business demand, which has been critical given Wolt's growth trajectory.

By standardizing deployments and providing common infrastructure, the platform aims to reduce the overhead and time needed for deploying models, with the expectation that this will result in more models reaching production. Prior to this platform, the manual work required for each deployment created a significant bottleneck that limited how many models could realistically be maintained.

## Trade-offs & Lessons

The Wolt team made several deliberate trade-offs in their platform design. They chose to prioritize real-time inference capabilities on Kubernetes, recognizing that while Kubernetes is powerful and capable, it's also complex. Rather than requiring data scientists to become Kubernetes experts, they invested in an abstraction layer (Seldon-Core) that provides the necessary capabilities while hiding infrastructure complexity.

The decision to remain ML framework-agnostic represents a trade-off between flexibility and potential performance optimization. By supporting multiple frameworks, they accommodate diverse use cases and let data scientists work with familiar tools. However, they acknowledge that focusing on specific frameworks could yield performance benefits, and they've left this door open for future optimization.

Choosing open-source tooling like Seldon-Core provided important flexibility—the ability to contribute upstream if needed—but also meant the team needed to invest time in understanding, deploying, and potentially maintaining these tools themselves rather than relying on a fully managed service.

The nearly year-long build process reflects the reality that building robust MLOps infrastructure takes significant time. The team emphasizes that establishing a consistent feedback loop throughout the process proved crucial. Regular check-ins ensured alignment across teams—from platform engineers to data scientists to data engineers—all of whom had different perspectives and needs.

A key lesson the team shares is staying close to your customer throughout the development process. For an ML platform team, the customers are internal data scientists and ML engineers. Understanding how to make their lives easier and smoother should drive prioritization decisions. The team also learned to be selective about communication—not everyone cares about behind-the-scenes technical details to the same degree, so understanding which details matter to different stakeholders helps maintain effective collaboration.

The team's future roadmap includes tighter integration with quality monitoring to detect data drift and enhanced experimentation capabilities that will make it easier for anyone to create experiments for testing ML models. They're also working on deploying model training infrastructure that will enable better integration with other services and help data scientists automate more of their workflows.

The standardization achieved through this platform directly addresses the original pain point of heterogeneous deployments. Instead of each data scientist reinventing the wheel for every model deployment, they can now focus on model development and improvement while the platform handles the operational complexity of serving, monitoring, and managing models in production. This shift represents a fundamental change in how the organization operates with machine learning, moving from a craft-based approach where each deployment was custom-built to an industrialized approach with consistent patterns and centralized capabilities.
