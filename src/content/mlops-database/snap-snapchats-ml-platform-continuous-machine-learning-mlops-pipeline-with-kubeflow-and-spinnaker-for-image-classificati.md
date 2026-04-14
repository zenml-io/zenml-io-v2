---
title: "Continuous machine learning MLOps pipeline with Kubeflow and Spinnaker for image classification, detection, segmentation, and retrieval"
slug: "snap-snapchats-ml-platform-continuous-machine-learning-mlops-pipeline-with-kubeflow-and-spinnaker-for-image-classificati"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
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
contentType: "slides"
summary: "Snapchat built a production-grade MLOps platform to power their Scan feature, which uses machine learning models for image classification, object detection, semantic segmentation, and content-based retrieval to unlock augmented reality lenses. The team implemented a comprehensive continuous machine learning system combining Kubeflow for ML pipeline orchestration and Spinnaker for continuous delivery, following a seven-stage maturity progression from notebook decomposition through automated monitoring. This infrastructure enables versioning, testing, automation, reproducibility, and monitoring across the entire ML lifecycle, treating ML systems as the combination of model plus code plus data, with specialized pipelines for data ETL, feature management, and model serving."
link: "https://raw.githack.com/sbueringer/kubecon-slides/master/slides/2020-kubecon-na/MLOps%20at%20Snapchat%20Continuous%20Machine%20Learning%20with%20Kubeflow%20%26%20Spinnaker%20-%20Kevin%20Dela%20Rosa%2C%20Snap%20Inc.%20-KevinDelaRosa_MLOps_Kubecon2020.pdf"
year: 2020
seo:
  title: "Snap: Continuous machine learning MLOps pipeline with Kubeflow and Spinnaker for image classification, detection, segmentation, and retrieval - ZenML MLOps Database"
  description: "Snapchat built a production-grade MLOps platform to power their Scan feature, which uses machine learning models for image classification, object detection, semantic segmentation, and content-based retrieval to unlock augmented reality lenses. The team implemented a comprehensive continuous machine learning system combining Kubeflow for ML pipeline orchestration and Spinnaker for continuous delivery, following a seven-stage maturity progression from notebook decomposition through automated monitoring. This infrastructure enables versioning, testing, automation, reproducibility, and monitoring across the entire ML lifecycle, treating ML systems as the combination of model plus code plus data, with specialized pipelines for data ETL, feature management, and model serving."
  canonical: "https://www.zenml.io/mlops-database/snap-snapchats-ml-platform-continuous-machine-learning-mlops-pipeline-with-kubeflow-and-spinnaker-for-image-classificati"
  ogTitle: "Snap: Continuous machine learning MLOps pipeline with Kubeflow and Spinnaker for image classification, detection, segmentation, and retrieval - ZenML MLOps Database"
  ogDescription: "Snapchat built a production-grade MLOps platform to power their Scan feature, which uses machine learning models for image classification, object detection, semantic segmentation, and content-based retrieval to unlock augmented reality lenses. The team implemented a comprehensive continuous machine learning system combining Kubeflow for ML pipeline orchestration and Spinnaker for continuous delivery, following a seven-stage maturity progression from notebook decomposition through automated monitoring. This infrastructure enables versioning, testing, automation, reproducibility, and monitoring across the entire ML lifecycle, treating ML systems as the combination of model plus code plus data, with specialized pipelines for data ETL, feature management, and model serving."
mlops:
  source: "sqlite"
  entryId: 112
  sourceUrl: "https://raw.githack.com/sbueringer/kubecon-slides/master/slides/2020-kubecon-na/MLOps%20at%20Snapchat%20Continuous%20Machine%20Learning%20with%20Kubeflow%20%26%20Spinnaker%20-%20Kevin%20Dela%20Rosa%2C%20Snap%20Inc.%20-KevinDelaRosa_MLOps_Kubecon2020.pdf"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061527"
  lastUpdated: "2026-04-14T19:55:11.872338"
---

## Problem Context

Snapchat's Scan feature represents a critical product capability that enables users to discover augmented reality lenses through computer vision. Traditional lens discovery mechanisms like Snapcodes, Lens Links, and Lens Explorer required manual user action, but Scan democratized discovery by allowing users to point their camera at the world and automatically trigger relevant lenses through marker images and scan triggers. This functionality required deploying multiple machine learning models into production, including image classification, object detection, semantic segmentation, content-based information retrieval, nearest neighbor search, and ranking models.

The challenge facing Snapchat's ML team was building production-grade infrastructure to support this diverse portfolio of models. Like many organizations, they started with Jupyter notebooks—a common pattern for ML experimentation but one that creates significant obstacles when moving to production. Monolithic notebooks lack versioning, testing, reproducibility, and automation capabilities essential for reliable production systems. The team needed to evolve beyond ad-hoc experimentation toward a mature MLOps practice that could handle the unique characteristics of ML systems, where the artifact is not just code but the combination of model, code, and data. This introduces complexity beyond traditional DevOps, as data changes over time and requires specialized infrastructure like data pipelines, ETL processes, feature stores, and ML-specific orchestration.

## Architecture & Design

Snapchat's MLOps architecture follows the maturity model outlined in Google Cloud's MLOps framework, implementing continuous delivery and automation pipelines specifically designed for machine learning workloads. The system architecture integrates several key components working in concert to enable what they term "Continuous Machine Learning."

The foundation rests on containerized components deployed to Kubernetes. The ML pipeline layer uses Kubeflow, which provides the graph-based workflow orchestration necessary to connect discrete containerized steps. A Kubeflow pipeline represents a directed acyclic graph describing the ML workflow, with components representing individual steps that launch one or more Kubernetes pods. Each component functions like a software function with defined inputs (parameters), outputs (return values), and a body (the Docker image that executes the logic). Data flows between components through serialized artifacts—strings and files passed as parameters, where a parent component's return value becomes the input to child components.

The delivery and deployment layer leverages Spinnaker, Netflix's continuous delivery platform, to orchestrate both ML pipeline deployments and model server deployments. Spinnaker pipelines consist of stages—atomic actions like Deploy, Run Job, Manual Judgement, Rollback, Wait, and Resize Server Group. This separation of concerns proves critical: Spinnaker manages the operational deployment of infrastructure and pipelines, while Kubeflow handles the ML-specific workflow orchestration.

The overall data flow progresses through several phases. Training data enters through data validation components, feeds into feature engineering, proceeds to model training, then through model validation and evaluation before deployment. The continuous integration system builds Docker images and compiles Kubeflow pipeline YAML specifications, publishing these artifacts to a registry. The continuous deployment system picks up these artifacts and orchestrates their deployment. When new models are produced, they trigger separate deployment pipelines that handle canary deployments, manual approval gates, and production rollouts.

## Technical Implementation

The technical stack centers on Kubernetes as the foundational compute platform, with Kubeflow and Spinnaker providing the orchestration layers. The implementation follows a seven-stage maturity progression, each building on the previous to add capabilities.

**Stage One: Notebook Decomposition and Containerization** involves breaking monolithic Jupyter notebooks into modular, containerized programs. Each logical unit of work—data preprocessing, feature engineering, model training, evaluation—becomes a separate containerized application stored in source control. This containerization captures environment dependencies and package requirements, ensuring reproducibility across different execution environments.

**Stage Two: Kubeflow ML Pipeline Automation** connects these Docker images into automated workflows. A typical pipeline includes components for data validation, feature generation, model training, model validation, and model evaluation, executed as a directed graph. Kubeflow manages the orchestration, handles data passing between components, and stores metadata about pipeline runs including parameters, hyperparameters, and training configurations.

**Stage Three: Continuous Integration** automates building, testing, and publishing. The CI system compiles code into Docker images, runs unit tests on individual components, executes integration tests on complete ML pipelines, and publishes artifacts including Docker images, Kubeflow component specifications, pipeline YAML files, and Kubernetes configuration manifests.

**Stage Four: Continuous Delivery of ML Pipelines** uses Spinnaker to deploy the training infrastructure itself. A typical Spinnaker pipeline for ML pipeline deployment includes a configuration stage, a smoke test, a "Run Job" stage that submits the Kubeflow pipeline and waits for completion, and a final stage that triggers the model deployment pipeline. The artifacts consumed include the ML pipeline KFP YAML and pipeline parameters stored in Kubernetes ConfigMaps.

**Stage Five: Continuous Training** introduces scheduled or event-driven pipeline execution. The system can trigger complete retraining on a cron schedule (daily, weekly, monthly) or react to the availability of new training data, ensuring models stay current as user behavior evolves.

**Stage Six: Continuous Delivery of Model Serving** deploys trained models to production. Spinnaker orchestrates this process, triggered by the availability of new model artifacts or changes to serving configuration. A deployment pipeline typically includes canary deployment stages that expose the new model to a small percentage of traffic, manual approval gates for human validation, and full production rollouts. The system maintains the ability to rollback to previous model versions if issues arise.

**Stage Seven: Monitoring** instruments the entire system with telemetry. Beyond standard server metrics like latency, traffic volume, errors, and saturation (the "four golden signals"), the team monitors ML-specific metrics including unexpected changes in prediction distributions, data drift, and model performance on holdout validation sets. These signals can indicate changes in user behavior or degraded model quality.

## Scale & Performance

While the presentation focuses on architecture and process rather than detailed performance metrics, several aspects of scale emerge from the content. The system supports multiple model types simultaneously—image classification, object detection, semantic segmentation, content-based information retrieval, nearest neighbor search, and ranking models—all serving the single Scan feature. This suggests a multi-model serving architecture capable of coordinating inference across different model types.

The maturity model progression implies growing operational scale. Moving from manual notebook execution to fully automated continuous training and deployment suggests the team needed to support rapid iteration and frequent model updates. The inclusion of canary deployments and manual approval gates indicates the serving infrastructure handles significant production traffic where model quality directly impacts user experience.

The monitoring emphasis on prediction distribution changes suggests the system processes sufficient volume to detect statistical shifts in model behavior. The ability to detect "unexpected data/prediction changes" requires baseline metrics established over meaningful traffic samples.

## Trade-offs & Lessons

Snapchat's journey reveals several important insights for organizations building MLOps infrastructure. The incremental maturity model acknowledges a fundamental truth: organizations cannot jump directly to full automation. The team explicitly states "Everybody has to start somewhere" and describes the journey as an "incremental process" where "level of automation will increase as your system matures." This pragmatic approach recognizes that building production ML infrastructure requires iterative refinement rather than big-bang transformation.

The architectural choice to combine Kubeflow and Spinnaker represents a deliberate separation of concerns. Kubeflow handles ML-specific orchestration—managing the complex dependencies between data validation, feature engineering, training, and evaluation—while Spinnaker manages operational deployment concerns like canary rollouts, approval gates, and rollbacks. This layering allows each tool to operate in its area of strength rather than forcing a single tool to handle both ML workflows and operational deployments.

The emphasis on "MLOps = DevOps + ML" highlights critical differences from traditional software delivery. The team identifies three special considerations: ML artifacts encompass model plus code plus data (not just code), data changes over time creating drift and requiring retraining, and ML systems require unique infrastructure components like data pipelines, ETL processes, feature stores, and ML-specific pipeline orchestration. These differences justify specialized tooling rather than attempting to force ML workflows into traditional CI/CD systems.

The five core MLOps principles—versioning, testing, automation, reproducibility, and monitoring—permeate every stage of the maturity model. Versioning applies not just to code but to Docker images, pipeline specifications, model artifacts, training configurations, and hyperparameters. Testing extends beyond unit tests to include data validation, model evaluation, and integration testing of complete ML pipelines. Automation encompasses the entire workflow from data ingestion through model deployment. Reproducibility requires capturing environment dependencies, pipeline parameters, and execution metadata. Monitoring must track both operational metrics and ML-specific signals like prediction drift.

The staged progression reveals dependencies between capabilities. Continuous delivery of models requires continuous integration of ML pipelines. Continuous training requires automated ML pipelines. Each stage builds essential foundations for subsequent capabilities. Organizations attempting to skip stages risk building on unstable foundations.

The architecture's handling of artifacts and data passing between pipeline components demonstrates important design patterns. By serializing data as strings and files passed between components, the system maintains loose coupling while enabling complex workflows. Parent component outputs become child component inputs, creating clear data lineage and enabling reproducibility.

The inclusion of manual approval gates in the model deployment pipeline, even in a highly automated system, recognizes that full automation isn't always appropriate for high-impact decisions. Human judgment still plays a role in validating models before production exposure, particularly for features with direct user impact like Scan.

The monitoring approach distinguishes between server health metrics and model health metrics. Unexpected prediction changes can signal either legitimate shifts in user behavior requiring model updates or problematic model behavior requiring rollback. This nuance requires ML-specific monitoring rather than relying solely on traditional operational metrics.

For practitioners building similar systems, Snapchat's experience suggests several actionable insights. Start with containerization and source control before attempting pipeline automation. Invest in data validation and model evaluation as first-class pipeline components rather than afterthoughts. Use specialized orchestration tools designed for ML workflows rather than adapting general-purpose workflow engines. Separate ML pipeline orchestration from operational deployment orchestration. Build monitoring that captures ML-specific signals, not just infrastructure metrics. Progress through maturity stages incrementally rather than attempting full automation immediately.

The presentation's reference to industry frameworks and resources—ml-ops.org principles, Google Cloud's MLOps guidance, the CDF MLOps SIG—indicates the team drew on emerging community practices rather than building in isolation. This community-oriented approach helps avoid reinventing solved problems while contributing patterns that others can adopt.
