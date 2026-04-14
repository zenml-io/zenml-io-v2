---
title: "LyftLearn: ML Model Training Infrastructure built on Kubernetes"
slug: "lyft-lyftlearn-lyftlearn-ml-model-training-infrastructure-built-on-kubernetes"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "databricks"
  - "docker"
  - "flyte"
  - "kubernetes"
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
industryTags: "automotive"
company: "Lyft"
companySlug: "lyft"
platformName: "LyftLearn"
contentType: "blog"
summary: "Lyft built LyftLearn, a Kubernetes-based ML model training infrastructure, to address the challenge of supporting diverse ML use cases across dozens of teams building hundreds of models weekly. The platform enables fast iteration through containerized environments that spin up in seconds, supports unrestricted choice of modeling libraries and versions (sklearn, LightGBM, XGBoost, PyTorch, TensorFlow), and provides a layered architecture accessible via API, CLI, and GUI. LyftLearn handles the complete model lifecycle from development in hosted Jupyter or R-studio notebooks through training and batch predictions, leveraging Kubernetes for compute orchestration, AWS EFS for intermediate storage, and integrating with Lyft's data warehouse for training data while providing cost visibility and self-serve capabilities for distributed training and hyperparameter tuning."
link: "https://eng.lyft.com/lyftlearn-ml-model-training-infrastructure-built-on-kubernetes-aef8218842bb"
year: 2021
seo:
  title: "Lyft: LyftLearn: ML Model Training Infrastructure built on Kubernetes - ZenML MLOps Database"
  description: "Lyft built LyftLearn, a Kubernetes-based ML model training infrastructure, to address the challenge of supporting diverse ML use cases across dozens of teams building hundreds of models weekly. The platform enables fast iteration through containerized environments that spin up in seconds, supports unrestricted choice of modeling libraries and versions (sklearn, LightGBM, XGBoost, PyTorch, TensorFlow), and provides a layered architecture accessible via API, CLI, and GUI. LyftLearn handles the complete model lifecycle from development in hosted Jupyter or R-studio notebooks through training and batch predictions, leveraging Kubernetes for compute orchestration, AWS EFS for intermediate storage, and integrating with Lyft's data warehouse for training data while providing cost visibility and self-serve capabilities for distributed training and hyperparameter tuning."
  canonical: "https://www.zenml.io/mlops-database/lyft-lyftlearn-lyftlearn-ml-model-training-infrastructure-built-on-kubernetes"
  ogTitle: "Lyft: LyftLearn: ML Model Training Infrastructure built on Kubernetes - ZenML MLOps Database"
  ogDescription: "Lyft built LyftLearn, a Kubernetes-based ML model training infrastructure, to address the challenge of supporting diverse ML use cases across dozens of teams building hundreds of models weekly. The platform enables fast iteration through containerized environments that spin up in seconds, supports unrestricted choice of modeling libraries and versions (sklearn, LightGBM, XGBoost, PyTorch, TensorFlow), and provides a layered architecture accessible via API, CLI, and GUI. LyftLearn handles the complete model lifecycle from development in hosted Jupyter or R-studio notebooks through training and batch predictions, leveraging Kubernetes for compute orchestration, AWS EFS for intermediate storage, and integrating with Lyft's data warehouse for training data while providing cost visibility and self-serve capabilities for distributed training and hyperparameter tuning."
mlops:
  source: "sqlite"
  entryId: 88
  sourceUrl: "https://eng.lyft.com/lyftlearn-ml-model-training-infrastructure-built-on-kubernetes-aef8218842bb"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061268"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Lyft faced significant challenges in operationalizing machine learning across diverse use cases spanning dispatch, pricing, fraud detection, and support systems. Each team employed different modeling techniques and libraries, creating a fragmented landscape that made it difficult to standardize infrastructure. The organization needed a unified platform that could support the unique requirements of ML development while maintaining flexibility for teams to choose their preferred tools and approaches.

The core pain points motivating LyftLearn's development centered on several critical needs. ML practitioners required fast iteration cycles to quickly evaluate different approaches and zoom in on promising solutions, distinguishing ML development from traditional software engineering workflows. Teams needed freedom to select from diverse modeling libraries including sklearn, LightGBM, XGBoost, PyTorch, and TensorFlow, each at different versions, without platform restrictions. The organization lacked unified capabilities for parallelizing model training, tracking historical training runs, visualizing performance metrics, scheduling periodic retraining, and deploying trained models for serving.

Additionally, Lyft needed to manage infrastructure costs effectively, as ML training represented a substantial portion of overall compute spending. Without visibility into per-run costs, teams couldn't make informed decisions about whether training expenses justified expected business impact. The wide adoption of ML across Lyft demanded a self-serve system that didn't require complex onboarding, even for advanced scenarios like distributed training and hyperparameter tuning.

## Architecture & Design

LyftLearn follows a layered architecture organized around five major components: Model Development, Training and Batch Prediction, User Dashboard, Image Build, and the underlying Data & Compute infrastructure.

### Model Development Layer

The model development workflow supports multiple entry points based on user preferences. Users can develop models in hosted Jupyter notebook environments, hosted R-studio environments, or locally in their preferred editors. For hosted environments, users navigate to the LyftLearn homepage to select hardware configurations including the number of GPU or CPU cores and memory requirements, along with a base image tailored to their modeling needs.

The platform provides an extensive selection of base images covering common modeling techniques used across Lyft. Teams can also create custom images to meet specialized requirements. Once users select their configuration and base image, the notebook environment spins up on the underlying Kubernetes cluster within seconds, enabling the fast iteration cycles critical to effective ML development.

Within the development environment, users can install additional dependencies and connect their remote environment to Git repositories for version tracking. When satisfied with their model code, users invoke the "Save Model" function, which creates a new container consisting of the model code and additional dependencies overlaid on the base image. Users must specify a version during this save operation, typically using the SHA of the corresponding Git commit to track code changes over time.

To optimize costs, LyftLearn implements auto-save and auto-termination for notebooks that remain idle for several hours. Because environment spin-up takes only seconds, this aggressive resource management doesn't degrade user experience while significantly reducing waste from abandoned or forgotten sessions.

For users preferring local development, LyftLearn provides a CLI that allows specifying model code and dependencies before saving the model, maintaining flexibility across development workflows.

### Training and Batch Prediction Infrastructure

Once a model container is saved, users can execute training jobs using that container through programmatic access via the LyftLearn API or through manual configuration using CLI or GUI interfaces. This layered-cake approach ensures different user personas can interact with the platform in their preferred manner.

Model containers accept hyperparameters and configuration parameters, enabling parallel execution of training jobs across different parameter sets. A common pattern involves training separate models for each granular geography where Lyft operates by passing geographical region as a configuration parameter. The model code queries different training data based on the region parameter and trains region-specific models, all from the same container.

Training jobs execute as Kubernetes jobs on the underlying cluster and support scheduling for periodic retraining at regular frequencies. LyftLearn supports parallelization through three mechanisms: Flyte for workflow orchestration, Spark for distributed data processing, and Fugue for abstracting execution engines.

The platform accommodates two distinct deployment patterns for trained models. For point predictions, models deploy as services called by other online systems for individual predictions, such as pricing models invoked for every ride request in the Lyft app. For batch predictions, models run on scheduled intervals against large data batches, exemplified by incentives models that execute weekly to determine passenger incentives. LyftLearn handles the scheduling and parallelization for batch prediction workloads, while a separate system manages point prediction serving.

### User Dashboard and Visibility

The GUI provides comprehensive visibility into all models, their versions, and historical training and batch prediction runs. For each execution, users can access corresponding logs and model performance metrics, enabling debugging and performance analysis. Users can deploy models to the production serving layer and manage the complete lifecycle through the dashboard interface.

Cost visibility represents a critical design principle embedded throughout the platform. Users can see exactly what each training run costs, empowering teams to make data-driven decisions about whether computational expenses align with expected business impact.

### Image Build System

The Image Build component serves as a wrapper over Docker's image build functionality, enabling teams to create custom base images or extend existing ones with team-specific libraries. This capability supports the platform's principle of unrestricted modeling library choice. Teams typically establish their own base images that include commonly used dependencies, which then serve as the foundation for all models developed by that team.

### Data and Compute Foundation

The underlying infrastructure consists of several integrated components that enable the user-facing functionality:

**Kubernetes Cluster**: A dedicated LyftLearn Kubernetes cluster forms the computational backbone, hosting notebooks, training jobs, and batch prediction workloads. The cluster is specifically optimized for interactive development and long-running jobs. Kubernetes was selected for two primary reasons: it enables packaging model code and dependencies as containers, allowing teams to use different modeling techniques and versions without conflicts, and it provides rapid environment provisioning, with new LyftLearn environments starting in seconds to support fast iteration cycles.

**Storage Systems**: AWS Elastic File System (EFS) mounts as a Kubernetes volume for each user, providing intermediate storage for data files generated during development and training. Training data originates from Lyft's data warehouse and is queried using Hive, Presto, or Spark depending on the specific use case and data characteristics. Model metadata including ownership information, past runs, and metrics is stored in AWS RDS Aurora for reliable, queryable persistence. Base images and model containers reside in AWS Elastic Container Registry (ECR), providing secure, scalable container storage.

## Technical Implementation

LyftLearn's technical implementation centers on containerization and Kubernetes orchestration as core architectural patterns. By packaging model code and dependencies as Docker containers, the platform eliminates version conflicts and enables teams to maintain independent technology stacks. Each saved model becomes an immutable container artifact stored in ECR, versioned according to user-specified identifiers.

The platform integrates Flyte, Spark, and Fugue to support different parallelization patterns. Flyte provides workflow orchestration capabilities for complex multi-step training pipelines. Spark enables distributed data processing for large-scale feature engineering and training jobs. Fugue abstracts execution engines, allowing users to write code once and execute on different backends.

The integration with Lyft's existing data infrastructure enables seamless access to training data through Hive, Presto, and Spark interfaces. This integration removes friction from the data access layer, allowing practitioners to focus on modeling rather than data engineering plumbing.

AWS services form the foundation of the storage and compute infrastructure. EFS provides shared file storage accessible across Kubernetes pods. RDS Aurora offers managed relational database services for metadata persistence. ECR serves as the container registry, integrating naturally with the Kubernetes-based execution environment.

The notebook environment leverages Kubernetes' rapid pod provisioning capabilities to deliver sub-minute spin-up times. This responsiveness directly supports the fast iteration design principle, allowing practitioners to quickly experiment with different approaches without waiting for environment setup.

## Scale & Performance

LyftLearn demonstrates significant adoption and scale across Lyft's engineering organization. The platform serves dozens of teams who collectively build hundreds of models every week, indicating substantial production usage. This volume represents a diverse range of ML applications spanning dispatch optimization, dynamic pricing, fraud detection, customer support automation, and other business-critical functions.

The notebook environment spin-up time of "only a few seconds" represents a critical performance characteristic enabling fast iteration. This rapid provisioning allows practitioners to context-switch efficiently and experiment with different approaches without computational overhead introducing friction into the development process.

The auto-termination policy for idle notebooks triggers after "a few hours" of inactivity, balancing cost optimization against user convenience. The combination of aggressive resource reclamation and fast spin-up times enables cost savings without degrading user experience.

The platform supports parallel execution of training jobs across different parameter sets, geography-based segmentation, and hyperparameter combinations. This parallelization capability enables teams to train multiple models simultaneously rather than sequentially, significantly reducing time-to-production for new models.

## Trade-offs & Lessons

LyftLearn's architecture reflects several thoughtful trade-offs that balance flexibility, usability, and operational efficiency.

The decision to standardize on Kubernetes as the computational substrate represents a significant architectural commitment. While Kubernetes provides excellent container orchestration and rapid provisioning, it introduces operational complexity and requires dedicated platform expertise to manage effectively. Lyft determined this trade-off worthwhile given the benefits of containerization and fast environment spin-up, but organizations without existing Kubernetes expertise might face a steeper adoption curve.

The layered-cake approach of supporting API, CLI, and GUI access patterns increases development and maintenance burden but delivers significant usability benefits. By meeting users where they are rather than forcing a single interaction model, LyftLearn maximizes adoption across diverse user personas from data scientists to ML engineers to business analysts.

The choice to support unrestricted modeling libraries and versions through containerization enables maximum flexibility but shifts dependency management complexity to users and teams. Rather than maintaining a single blessed environment, teams manage their own base images and dependencies. This approach scales well across diverse use cases but requires users to have basic container literacy and understand dependency management.

The integration of three different parallelization mechanisms (Flyte, Spark, Fugue) provides users with options suited to different workload patterns but increases the surface area of technologies the platform team must support. This complexity seems justified given the diversity of ML use cases across Lyft's business.

The aggressive auto-termination policy for idle notebooks demonstrates a cost-optimization strategy that relies on rapid environment provisioning to maintain usability. This approach only works because Kubernetes enables sub-minute spin-up times; without that performance characteristic, aggressive termination would frustrate users.

The separation of point prediction serving into a dedicated system outside LyftLearn reflects an important architectural boundary. Training and batch prediction workloads have fundamentally different performance characteristics than low-latency point predictions, and trying to serve both patterns from a single platform would introduce unnecessary complexity.

The platform's emphasis on cost visibility represents a mature approach to infrastructure management. By exposing training costs to users, LyftLearn enables data-driven decision-making about computational resource usage and aligns incentives between platform users and infrastructure costs.

Key insights for practitioners building similar platforms include the importance of rapid iteration cycles in ML development, the value of containerization for supporting diverse technology stacks, the effectiveness of auto-termination paired with fast provisioning for cost management, and the benefits of layered access patterns for maximizing adoption across different user personas. The platform demonstrates that investing in self-serve capabilities and reducing onboarding friction pays dividends in adoption and productivity.
