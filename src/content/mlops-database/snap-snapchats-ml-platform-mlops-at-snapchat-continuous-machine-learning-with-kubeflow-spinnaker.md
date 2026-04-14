---
title: "MLOps at Snapchat: Continuous Machine Learning with Kubeflow & Spinnaker"
slug: "snap-snapchats-ml-platform-mlops-at-snapchat-continuous-machine-learning-with-kubeflow-spinnaker"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "data-ingestion"
  - "data-prep"
  - "data-validation"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "model-validation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Snap"
companySlug: "snap"
platformName: "Snapchat's ML platform"
contentType: "video"
summary: "Snapchat's machine learning team automated their ML workflows for the Scan feature, which uses computer vision to recommend augmented reality lenses based on what the camera sees. The team evolved from experimental Jupyter notebooks to a production-grade continuous machine learning system by implementing a seven-step incremental approach that containerized components, automated ML pipelines with Kubeflow, established continuous integration using Jenkins and Drone, orchestrated deployments with Spinnaker, and implemented continuous training and model serving. This architecture enabled automated model retraining on data availability, reproducible deployments, comprehensive testing at component and pipeline levels, and continuous delivery of both ML pipelines and prediction services, ultimately supporting real-time contextual lens recommendations for Snapchat users."
link: "https://www.youtube.com/watch?v=Sovxz3m2sj0"
year: 2020
seo:
  title: "Snap: MLOps at Snapchat: Continuous Machine Learning with Kubeflow & Spinnaker - ZenML MLOps Database"
  description: "Snapchat's machine learning team automated their ML workflows for the Scan feature, which uses computer vision to recommend augmented reality lenses based on what the camera sees. The team evolved from experimental Jupyter notebooks to a production-grade continuous machine learning system by implementing a seven-step incremental approach that containerized components, automated ML pipelines with Kubeflow, established continuous integration using Jenkins and Drone, orchestrated deployments with Spinnaker, and implemented continuous training and model serving. This architecture enabled automated model retraining on data availability, reproducible deployments, comprehensive testing at component and pipeline levels, and continuous delivery of both ML pipelines and prediction services, ultimately supporting real-time contextual lens recommendations for Snapchat users."
  canonical: "https://www.zenml.io/mlops-database/snap-snapchats-ml-platform-mlops-at-snapchat-continuous-machine-learning-with-kubeflow-spinnaker"
  ogTitle: "Snap: MLOps at Snapchat: Continuous Machine Learning with Kubeflow & Spinnaker - ZenML MLOps Database"
  ogDescription: "Snapchat's machine learning team automated their ML workflows for the Scan feature, which uses computer vision to recommend augmented reality lenses based on what the camera sees. The team evolved from experimental Jupyter notebooks to a production-grade continuous machine learning system by implementing a seven-step incremental approach that containerized components, automated ML pipelines with Kubeflow, established continuous integration using Jenkins and Drone, orchestrated deployments with Spinnaker, and implemented continuous training and model serving. This architecture enabled automated model retraining on data availability, reproducible deployments, comprehensive testing at component and pipeline levels, and continuous delivery of both ML pipelines and prediction services, ultimately supporting real-time contextual lens recommendations for Snapchat users."
mlops:
  source: "sqlite"
  entryId: 111
  sourceUrl: "https://www.youtube.com/watch?v=Sovxz3m2sj0"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061516"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Snapchat's Scan feature enables users to discover augmented reality lenses by long-pressing the camera screen, triggering computer vision models that analyze what the camera sees and recommend contextually relevant lenses. For example, scanning a cocktail might surface drink-related lenses, while pointing at the sky could unlock an astronaut lens. The feature also supports marker-based lens unlocking, where physical posters or images can be scanned to trigger immersive 3D experiences.

The core ML challenge was building a production system that could automatically recommend and rank the most relevant lenses to show users in real-time. Like many ML teams, Snapchat started with experimental proof-of-concept code in Jupyter notebooks. The gap between these experimental notebooks and a production-grade automated ML deployment was substantial, requiring systematic approaches to testing, deployment, monitoring, and continuous model improvement.

The team needed to address several MLOps-specific challenges that distinguish machine learning systems from traditional software deployments. Machine learning involves not just code but the combination of code and data to produce model artifacts, meaning both code changes and data changes impact model performance and reproducibility. The ecosystem requires managing data pipelines including ETLs, data labeling workflows, feature stores, and highly customized ML pipelines. Rather than attempting a "big bang" transformation, the team adopted an incremental process to gradually increase automation as the system matured.

## Architecture & Design

The target architecture follows MLOps best practices and resembles reference architectures from cloud providers. The system comprises several interconnected components:

**Continuous Integration Infrastructure**: Jenkins and Drone handle building, testing, and packaging pipeline components. The CI system produces versioned artifacts including Docker images published to Google Cloud Registry (GCR), compiled Kubeflow pipeline specification YAMLs, and Kubernetes configurations for prediction service deployments.

**ML Pipeline Orchestration**: Kubeflow Pipelines automates the complete machine learning workflow. A typical pipeline graph includes data validation as the initial step, feature extraction from raw data or a feature store, model training components, model evaluation calculating metrics like accuracy, mean average precision, recall, and intersection over union, and finally model validation against held-out test data to verify minimum acceptable accuracy thresholds before model registration.

**Feature Store**: The architecture includes a feature store that feeds data into the ML pipeline, providing a centralized repository for feature engineering outputs that can be reused across different models and serving contexts.

**Model Registry**: Trained models are uploaded to a registry where they're versioned and tracked with metadata about each training run, enabling reproducibility and model lineage tracking.

**Continuous Delivery System**: Spinnaker orchestrates deployments of both ML pipelines and prediction services. The CD system handles rolling out new models, managing canary deployments, and providing rollback capabilities through its UI.

**Prediction Service**: The model server handles inference requests in production, serving recommendations for lens selection based on camera input. The service is deployed as Kubernetes pods with proper telemetry for monitoring.

**Monitoring Infrastructure**: The system tracks traditional server metrics (latency, traffic, errors, saturation) as well as model-specific performance indicators. When direct feedback on predictive accuracy is difficult to obtain, proxy metrics like click-through rates help detect model performance degradation.

Data flows through the system as follows: raw data enters through ETL pipelines, features are extracted and stored in the feature store, the ML pipeline consumes these features for training, trained models are validated and registered, Spinnaker deploys model servers with the latest validated models, and monitoring systems track both infrastructure health and model performance to trigger retraining when needed.

## Technical Implementation

The implementation centers on Kubeflow Pipelines running on Kubernetes infrastructure. In Kubeflow, a pipeline is a directed acyclic graph describing a complete ML workflow. Each component or step launches one or more Kubernetes pods and acts like a function with a name, parameters, return values, and a body consisting of Docker containers. Data passes between parent and child components via serialized artifacts.

The team's incremental implementation followed seven distinct steps:

**Step One - Containerization**: The team broke experimental Jupyter notebooks into modular, containerized programs stored in GitHub source control. This enabled version tracking of algorithm and transformation code, made unit testing easier due to modularity, and improved reproducibility through Docker containerization.

**Step Two - ML Pipeline Automation**: Kubeflow Pipelines automated the ML process with components for data validation, feature extraction, model training, evaluation, and validation. The system stores metadata about each run and model, tracks changes to the entire ML process via source control, enables comprehensive testing including data validation, model validation, and integration tests, and logs model performance metrics to detect degradation over time.

**Step Three - Continuous Integration**: Jenkins and Drone automate building code and running unit and integration tests at both component and pipeline levels. Release steps publish Docker images to GCR, compile versioned Kubeflow pipeline specification YAMLs, and version Kubernetes configurations for prediction service deployments.

**Step Four - Continuous Delivery for ML Pipelines**: Spinnaker orchestrates ML pipeline deployment with pipelines consisting of multiple stages. A typical deployment pipeline includes an initial configuration stage that accepts artifacts like the Kubeflow pipeline YAML and parameter configurations, optional smoke tests for non-exhaustive pipeline validation, a main "run ML pipeline" stage implemented as a Kubernetes job that submits the pipeline to Kubeflow, waits for completion, and parses outputs to produce Spinnaker artifacts, and finally a trigger to invoke the model server deployment pipeline if one exists. This enables automated deployments when CI releases new artifacts, repeatable deployments, and UI-based rollback capabilities.

**Step Five - Continuous Training**: The team configured Spinnaker to trigger ML pipeline deployment on schedules (daily, weekly, monthly) or upon new data availability using built-in mechanisms like cron jobs and Pub/Sub message triggering. This automates model retraining whenever fresh data becomes available.

**Step Six - Continuous Delivery for Model Servers**: A separate Spinnaker pipeline handles prediction service deployment, triggered by changes to server configuration via CI or availability of new model artifacts from the continuous training pipeline. The deployment follows traditional patterns with canary deployments, manual approval gates, and production rollout stages, ensuring reproducible model server deployments.

**Step Seven - Monitoring**: The team implemented telemetry covering standard server metrics (latency, traffic, errors, saturation) and model performance tracking. Given the difficulty of obtaining direct predictive accuracy feedback in production, they use proxy metrics like click-through rate shifts to detect when models or ML processes need adjustment.

The technology stack specifically includes Kubernetes as the orchestration platform, Kubeflow Pipelines for ML workflow automation, Spinnaker for continuous delivery, Jenkins and Drone for continuous integration, Docker for containerization, Google Cloud Registry for artifact storage, and Kubernetes-native monitoring for production observability.

## Scale & Performance

While the presentation doesn't provide extensive quantitative metrics, several scale indicators are mentioned. The Scan feature serves real-time inference for Snapchat users, requiring low-latency responses when users long-press the camera. The system supports multiple computer vision models for different scan contexts including drinks, sky scenes, and marker recognition.

The ML pipeline automation enables tracking metadata and performance metrics across all training runs, providing historical context for model performance trends. The continuous training capability allows retraining on various schedules from daily to monthly depending on data availability and use case requirements.

The monitoring infrastructure tracks click-through rates as a proxy metric for model quality, suggesting the system handles sufficient traffic volume to make these statistics meaningful. The use of canary deployments in the model serving pipeline indicates the team handles production traffic levels where gradual rollouts provide risk mitigation.

## Trade-offs & Lessons

The incremental seven-step approach represents a key lesson: rather than attempting to implement comprehensive MLOps infrastructure in one effort, the team gradually increased automation as systems matured. Each step builds on previous work while adding new capabilities, making the transformation manageable.

**What Worked Well**: The combination of Kubeflow Pipelines and Spinnaker proved effective for separating concerns between ML workflow orchestration and deployment automation. Kubeflow handles the ML-specific aspects of data validation, feature engineering, training, and evaluation, while Spinnaker manages the operational deployment concerns with capabilities like canary releases, rollbacks, and multi-stage pipelines. This separation allows ML engineers to focus on pipeline logic while leveraging battle-tested CD patterns.

Containerization as the foundational first step enabled everything that followed. By dockerizing components early, the team established reproducibility, testability, and portability that paid dividends throughout subsequent steps. The modular component design in Kubeflow also improved testability compared to monolithic notebook code.

The use of proxy metrics like click-through rates addresses a common challenge in production ML: obtaining ground truth labels for model accuracy is often impractical, so tracking business metrics that correlate with model quality provides actionable signals for detecting degradation.

**Challenges and Considerations**: The architecture has substantial complexity with many moving parts across CI/CD tooling (Jenkins, Drone, Spinnaker), ML-specific infrastructure (Kubeflow, feature stores, model registries), and underlying orchestration (Kubernetes). Teams adopting this approach need expertise spanning traditional software engineering, DevOps practices, and ML-specific concerns.

The presentation doesn't deeply explore data validation and feature store integration details, which are often challenging aspects of production ML systems. How data quality is monitored, how feature pipelines are versioned alongside models, and how feature stores handle online/offline consistency are critical considerations not fully addressed.

The monitoring discussion reveals an inherent challenge: without direct model performance feedback, teams must rely on proxy metrics. This introduces lag in detecting model degradation and requires careful selection of proxies that actually correlate with model quality. Click-through rates capture user engagement but may not reveal subtle accuracy problems.

**Key Insights for Practitioners**: The incremental approach is crucial—trying to implement everything at once leads to overwhelming complexity. Start with containerization and source control, then layer on automation progressively. Each step should provide tangible value before moving to the next.

Separating ML pipeline orchestration from deployment orchestration makes sense given their different concerns. Kubeflow excels at expressing ML workflows with data passing between components, while Spinnaker provides mature CD patterns for production deployment.

Reproducibility requires attention at multiple levels: Docker containers for consistent environments, version-controlled pipeline specifications for consistent workflows, metadata tracking for each run, and versioned model artifacts. The architecture addresses all these dimensions.

Testing must evolve beyond traditional unit tests to include ML-specific validations: data validation ensures input quality, model validation checks minimum accuracy thresholds, and integration tests verify the complete pipeline produces expected outputs. This comprehensive testing prevents broken models from reaching production.

The architecture embraces continuous training as a first-class concern rather than treating model updates as exceptional events. By automating retraining on schedules or data availability, the system ensures models stay fresh without manual intervention. This addresses model drift and concept drift proactively.

Finally, the system achieves "continuous machine learning" where experiments inform production systems, monitoring triggers improvements, and the cycle continues. This closed loop represents mature MLOps practice where the entire lifecycle is automated and reproducible.
