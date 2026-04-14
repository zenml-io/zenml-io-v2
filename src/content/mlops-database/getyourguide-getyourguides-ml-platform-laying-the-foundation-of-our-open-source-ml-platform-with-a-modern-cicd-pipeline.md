---
title: "Laying the Foundation of our Open Source ML Platform with a Modern CI/CD Pipeline"
slug: "getyourguide-getyourguides-ml-platform-laying-the-foundation-of-our-open-source-ml-platform-with-a-modern-cicd-pipeline"
draft: false
mlopsTags:
  - "data-versioning"
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "docker"
  - "mlflow"
  - "spark"
  - "deployment"
  - "model-evaluation"
  - "retraining"
  - "training"
industryTags: "other"
company: "GetYourGuide"
companySlug: "getyourguide"
platformName: "GetYourGuide's ML platform"
contentType: "blog"
summary: "GetYourGuide's Recommendation and Relevance team built a modern CI/CD pipeline to serve as the foundation for their open-source ML platform, addressing significant pain points in their model deployment workflow. Prior to this work, the team struggled with disconnected training code and model artifacts, lack of visibility into model metrics, manual error-prone setup for new projects, and no centralized dashboard for tracking production models. The solution leveraged Jinja for templating, pre-commit for automated checks, Drone CI for continuous integration, Databricks for distributed training, MLflow for model registry and experiment tracking, Apache Airflow for workflow orchestration, and Docker containers for reproducibility. This platform foundation enabled the team to standardize software engineering best practices across all ML services, achieve reproducible training runs, automatically log metrics and artifacts, maintain clear lineage between code and models, and accelerate iteration cycles for deploying new models to production."
link: "https://www.getyourguide.careers/posts/laying-the-foundation-of-our-open-source-ml-platform-with-a-modern-ci-cd-pipeline"
year: 2021
seo:
  title: "GetYourGuide: Laying the Foundation of our Open Source ML Platform with a Modern CI/CD Pipeline - ZenML MLOps Database"
  description: "GetYourGuide's Recommendation and Relevance team built a modern CI/CD pipeline to serve as the foundation for their open-source ML platform, addressing significant pain points in their model deployment workflow. Prior to this work, the team struggled with disconnected training code and model artifacts, lack of visibility into model metrics, manual error-prone setup for new projects, and no centralized dashboard for tracking production models. The solution leveraged Jinja for templating, pre-commit for automated checks, Drone CI for continuous integration, Databricks for distributed training, MLflow for model registry and experiment tracking, Apache Airflow for workflow orchestration, and Docker containers for reproducibility. This platform foundation enabled the team to standardize software engineering best practices across all ML services, achieve reproducible training runs, automatically log metrics and artifacts, maintain clear lineage between code and models, and accelerate iteration cycles for deploying new models to production."
  canonical: "https://www.zenml.io/mlops-database/getyourguide-getyourguides-ml-platform-laying-the-foundation-of-our-open-source-ml-platform-with-a-modern-cicd-pipeline"
  ogTitle: "GetYourGuide: Laying the Foundation of our Open Source ML Platform with a Modern CI/CD Pipeline - ZenML MLOps Database"
  ogDescription: "GetYourGuide's Recommendation and Relevance team built a modern CI/CD pipeline to serve as the foundation for their open-source ML platform, addressing significant pain points in their model deployment workflow. Prior to this work, the team struggled with disconnected training code and model artifacts, lack of visibility into model metrics, manual error-prone setup for new projects, and no centralized dashboard for tracking production models. The solution leveraged Jinja for templating, pre-commit for automated checks, Drone CI for continuous integration, Databricks for distributed training, MLflow for model registry and experiment tracking, Apache Airflow for workflow orchestration, and Docker containers for reproducibility. This platform foundation enabled the team to standardize software engineering best practices across all ML services, achieve reproducible training runs, automatically log metrics and artifacts, maintain clear lineage between code and models, and accelerate iteration cycles for deploying new models to production."
mlops:
  source: "sqlite"
  entryId: 121
  sourceUrl: "https://www.getyourguide.careers/posts/laying-the-foundation-of-our-open-source-ml-platform-with-a-modern-ci-cd-pipeline"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061621"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

GetYourGuide's Data Products team, which builds recommender systems to help customers find and book travel activities, faced significant MLOps challenges as their machine learning services matured. Since the team's inception in 2016, model complexity and reach had grown substantially, but the deployment and productionalization processes had not kept pace with this evolution.

The core pain points centered around several interconnected issues. First, there was no straightforward link between the training code stored in GitHub and the resulting output models and predictions. The team followed a workflow where Python code was wrapped into packages, built as wheels, sent to S3, and then installed on Databricks clusters before running training jobs. While functional, this process created significant friction when trying to understand which exact code version produced a specific model in production.

Training metrics and logs were scattered and difficult to access. Data scientists had to manually dig through job logs to find relevant information about model performance, which substantially slowed iteration cycles. When teams wanted to build on existing models or debug production issues, reconstructing the training context proved time-consuming and error-prone.

The onboarding experience for new ML projects was particularly problematic. Each new service required manually copying configuration and deployment steps from other repositories and refactoring them for the new use case. This copy-paste approach was both time-intensive and prone to introducing errors, as there was no standardized template or bootstrapping process.

Perhaps most critically, the organization lacked visibility into what models were actually running in production at any given time. With constant experimentation and iteration happening across multiple teams, there was no centralized dashboard or registry showing the full landscape of deployed models. This made it difficult to maintain production systems, coordinate changes, and ensure consistency across the ML platform.

The team identified five core requirements that any solution needed to address: following software engineering best practices including code reviews, automated tests, and consistent style; training with full production datasets in environments where production data was accessible; reproducing past training runs with the exact environment and settings; saving and accessing metrics and output models systematically; and enabling quick deployment of new model versions with rollback capabilities in case of incidents.

## Architecture & Design

The platform foundation was designed in two complementary stages: establishing software engineering principles through templating and tooling, then adding machine learning-specific capabilities for model management and reproducibility.

The overall workflow begins with a standardized project template that automatically provisions the necessary infrastructure components. When a data scientist initiates a new ML service, the template creates GitHub repositories, configures Drone CI testing pipelines, and sets up required infrastructure in Amazon Web Services. This bootstrapping eliminates the manual setup overhead that previously slowed new project starts.

The data flow follows a clear path from code commit through training to deployment. When developers push code to GitHub, automated checks verify code quality, style conformance, and test coverage. Pre-commit hooks run git checks to ensure standards are met before commits are even created. When code passes these gates, it can trigger training workflows through special keywords in commit messages.

For model training, the architecture separates lightweight CI tasks from compute-intensive ML workloads. Drone CI handles standard software engineering checks but delegates actual model training to Databricks, which provides access to powerful compute instances and production data. This separation acknowledges the fundamental difference between traditional software deployment and ML model training, which may require hours of computation on large datasets.

The platform uses Docker containers as the packaging mechanism for reproducibility. When a training run is triggered, Drone builds a Docker image containing all dependencies and the specific code version, then triggers a Databricks job that uses this image. This ensures that the exact environment can be recreated for any past training run.

MLflow serves as the central model registry and experiment tracking system. During training on Databricks, models automatically log metrics, parameters, artifacts, and the git hash of the training code to MLflow. This creates a complete lineage trail from code version through training configuration to resulting model artifacts.

Apache Airflow orchestrates the higher-level workflows, including scheduled model retraining and batch prediction jobs. Airflow can trigger training runs, then use the latest model registered in MLflow for inference tasks. This creates a closed loop where models are continuously updated and deployed without manual intervention.

The S3 storage layer provides persistence for model artifacts, predictions, and intermediate datasets. Models logged to MLflow can be downloaded locally for inspection or loaded directly for inference in production batch jobs.

## Technical Implementation

The implementation leverages a carefully selected stack of open-source tools, each addressing specific platform requirements.

**Templating and Bootstrapping**: Jinja templates define the structure of new ML service repositories. These templates were developed in collaboration with GetYourGuide's Developer Enablement team to encode best practices from both traditional software engineering and ML-specific needs. The templates include pre-configured directory structures, dependency management files, test frameworks, and CI/CD pipeline definitions.

**Continuous Integration**: Drone CI serves as the continuous integration platform. The Drone pipeline configuration includes multiple stages. Initial stages run pre-commit hooks to verify code formatting and style compliance. Subsequent stages execute credential scanning to prevent accidental secret commits, run style checks, perform type checking, and execute unit tests. A critical Drone feature is the ability to build Docker images containing all ML dependencies and trigger downstream Databricks jobs based on commit message keywords.

**Pre-commit Framework**: The pre-commit framework provides git hook scripts that run automatically before commits are finalized. These hooks enforce code quality standards at the earliest possible point in the development workflow, catching issues before they enter the codebase. This includes style formatting, basic lint checks, and other lightweight validations that can run quickly on developer machines.

**Model Training Infrastructure**: Databricks provides the compute environment for actual model training. Jobs in Databricks can access production data, run for multiple hours, and use powerful instance types with GPUs or high memory as needed. The Databricks jobs are triggered programmatically from Drone CI and use the Docker images built in the CI pipeline, ensuring environment consistency.

**Model Registry and Experiment Tracking**: MLflow serves as both the model registry and experiment tracking system. The platform uses several key MLflow features. The tracking API logs metrics, parameters, and artifacts during training runs. The model registry provides versioning for production models, with each version tagged with metadata including the git hash of the training code, training date, and performance metrics. The MLflow UI provides dashboards showing all models in production and allowing drill-down into specific versions to examine metrics, parameters, and logged artifacts. The artifact storage in MLflow preserves not just the final model but also intermediate outputs, training plots, feature importance visualizations, and other debugging artifacts that help understand model behavior.

**Workflow Orchestration**: Apache Airflow orchestrates both training and inference workflows. Airflow DAGs schedule regular model retraining, trigger batch prediction jobs using the latest models from MLflow, and manage dependencies between data preparation, training, and inference steps. The integration between Airflow and MLflow allows Airflow to automatically use the most recently trained model version without hardcoded version numbers.

**Containerization**: Docker containers provide the packaging mechanism that ensures reproducibility. Each training run uses a specific Docker image that bundles the exact versions of Python, ML frameworks (such as scikit-learn, TensorFlow, or PyTorch), and all other dependencies. This containerization approach provides flexibility in framework choices while maintaining reproducibility guarantees. Different projects can use different frameworks or dependency versions without conflicts.

**Storage and Artifacts**: Amazon S3 provides object storage for model artifacts, predictions, and datasets. The previous workflow already used S3 for storing wheel files and model outputs, and the new platform continues leveraging S3 but with better organization and metadata linking artifacts to their source code and training configurations.

## Scale & Performance

While the article does not provide extensive quantitative metrics around scale, several indicators suggest the platform operates at meaningful production scale. The Data Products team has been building models since 2016, and the article mentions "all our models" and "all the models being used" in plural, indicating multiple production services running simultaneously.

The platform is designed to handle training runs that require hours of computation time on powerful machines, suggesting models trained on substantial datasets. The architecture explicitly supports access to full production datasets during training, which for a travel booking platform like GetYourGuide likely encompasses significant volumes of user interaction data, booking history, and activity metadata.

The team emphasizes the need to "reach customers faster through innovations" and assess "many ideas" with "multiple iterations," suggesting a high velocity of experimentation and model development. The platform's design prioritizes reducing iteration time and enabling quick deployment of new model versions, which implies frequent model updates to production.

The Databricks infrastructure provides access to scalable compute resources, including the ability to use powerful instance types. This flexibility suggests the platform supports diverse model types, from lightweight recommendation models to more complex deep learning approaches requiring GPU acceleration.

## Trade-offs & Lessons

The platform design reflects several important architectural trade-offs that offer lessons for teams building similar ML infrastructure.

**Separation of CI and Training**: A key decision was separating lightweight continuous integration checks from compute-intensive model training. Traditional software CI/CD can build, test, and deploy in a single pipeline, but ML workflows require access to production data and substantial compute that doesn't fit within typical CI environments. GetYourGuide's solution uses Drone CI for standard software checks but delegates training to Databricks, triggering the handoff through special commit message keywords. This hybrid approach maintains fast feedback for code quality issues while enabling long-running training jobs with appropriate resources.

**Open Source Tool Integration**: Rather than building custom infrastructure from scratch, the team composed their platform from open-source tools. This approach reduced development time and leveraged mature, well-supported software. However, it required careful integration work to connect Drone CI, Databricks, MLflow, and Airflow into a cohesive workflow. The benefit is that each component can be upgraded or replaced independently as the ecosystem evolves.

**Template-Based Standardization**: Creating a Jinja template for new ML services trades initial template development effort for reduced ongoing friction. Each new project gets consistent structure, tooling, and best practices automatically, eliminating error-prone copying and refactoring. The trade-off is that templates can become rigid, potentially limiting flexibility for unusual use cases. GetYourGuide mitigated this through Docker containerization, which allows different projects to use different frameworks and dependencies despite sharing the same overall workflow structure.

**Docker for Reproducibility**: Using Docker containers to capture the exact training environment ensures reproducibility but adds complexity to the workflow. Building Docker images takes time and increases the artifacts that must be managed. However, the team judged this overhead worthwhile for the guarantee that any past training run can be exactly reproduced, which is critical for debugging production issues and understanding model behavior changes over time.

**MLflow as Central Registry**: Centralizing model metadata, metrics, and artifacts in MLflow addressed the visibility problem but required discipline to ensure all training code properly logs information. The platform enforces this through the standardized template and workflow, making MLflow logging a default rather than an optional add-on. This architectural choice provides tremendous value for model governance, lineage tracking, and collaboration across teams.

**Airflow for Orchestration**: Continuing to use Apache Airflow for orchestration built on existing infrastructure and team expertise rather than introducing a new orchestration tool. This pragmatic choice minimized the learning curve and integration work. However, it means the platform inherits any limitations of Airflow, such as its scheduling model and backfill capabilities.

**What Worked Well**: The article emphasizes that the platform successfully achieved its core goals. Teams can now quickly spin up new ML services without manual setup overhead. Training runs automatically record metrics and artifacts, providing visibility that was previously missing. The git hash linkage between code and models enables easy reproduction of past runs and clear lineage tracking. The engineering best practices built into the template (pre-commit hooks, automated tests, style checking) raised the quality bar across all ML projects.

**Lessons for Practitioners**: Several insights emerge for teams building similar platforms. Start with a clear understanding of what makes ML workflows different from traditional software (data access, compute requirements, long-running jobs). Build on open-source tools rather than reinventing core capabilities, but invest in integration work to create seamless workflows. Standardize through templates and tooling rather than documentation alone, making the right thing the easy thing. Separate concerns appropriately, using different tools for different workflow stages rather than forcing everything through a single system. Invest in reproducibility infrastructure early, as debugging production ML systems without reproducible training is extremely difficult. Finally, provide visibility into the full model lifecycle through centralized registries and dashboards, as ML systems are opaque without proper instrumentation.
