---
title: "Centralized ML orchestration with Kubeflow Pipelines on EKS to automate Data Engine workflows for faster model iteration"
slug: "aurora-auroras-data-engine-centralized-ml-orchestration-with-kubeflow-pipelines-on-eks-to-automate-data-engine-workflows"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "labeling"
  - "metadata-store"
  - "model-registry"
  - "pipeline-orchestration"
  - "docker"
  - "kubeflow"
  - "kubernetes"
  - "mlflow"
  - "sagemaker"
  - "terraform"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "model-evaluation"
  - "monitoring"
  - "retraining"
  - "training"
industryTags: "automotive"
company: "Aurora"
companySlug: "aurora"
platformName: "Aurora's Data Engine"
contentType: "blog"
summary: "Aurora Innovation built a centralized ML orchestration layer to accelerate the development and deployment of machine learning models for their autonomous vehicle technology. The company faced significant bottlenecks in their Data Engine lifecycle, where manual processes, lack of automation, poor experiment tracking, and disconnected subsystems were slowing down the iteration speed from new data to production models. By implementing a three-layer architecture centered on Kubeflow Pipelines running on Amazon EKS, Aurora created an automated, declarative workflow system that drastically reduced manual effort during experimentation, enabled continuous integration and deployment of datasets and models within two weeks of new data availability, and allowed their autonomy model developers to iterate on ideas much more quickly while catching bugs and regressions that would have been difficult to detect manually."
link: "https://mlops.community/auroras-data-engine-how-we-accelerate-machine-learning-model-workflows/"
year: 2023
seo:
  title: "Aurora: Centralized ML orchestration with Kubeflow Pipelines on EKS to automate Data Engine workflows for faster model iteration - ZenML MLOps Database"
  description: "Aurora Innovation built a centralized ML orchestration layer to accelerate the development and deployment of machine learning models for their autonomous vehicle technology. The company faced significant bottlenecks in their Data Engine lifecycle, where manual processes, lack of automation, poor experiment tracking, and disconnected subsystems were slowing down the iteration speed from new data to production models. By implementing a three-layer architecture centered on Kubeflow Pipelines running on Amazon EKS, Aurora created an automated, declarative workflow system that drastically reduced manual effort during experimentation, enabled continuous integration and deployment of datasets and models within two weeks of new data availability, and allowed their autonomy model developers to iterate on ideas much more quickly while catching bugs and regressions that would have been difficult to detect manually."
  canonical: "https://www.zenml.io/mlops-database/aurora-auroras-data-engine-centralized-ml-orchestration-with-kubeflow-pipelines-on-eks-to-automate-data-engine-workflows"
  ogTitle: "Aurora: Centralized ML orchestration with Kubeflow Pipelines on EKS to automate Data Engine workflows for faster model iteration - ZenML MLOps Database"
  ogDescription: "Aurora Innovation built a centralized ML orchestration layer to accelerate the development and deployment of machine learning models for their autonomous vehicle technology. The company faced significant bottlenecks in their Data Engine lifecycle, where manual processes, lack of automation, poor experiment tracking, and disconnected subsystems were slowing down the iteration speed from new data to production models. By implementing a three-layer architecture centered on Kubeflow Pipelines running on Amazon EKS, Aurora created an automated, declarative workflow system that drastically reduced manual effort during experimentation, enabled continuous integration and deployment of datasets and models within two weeks of new data availability, and allowed their autonomy model developers to iterate on ideas much more quickly while catching bugs and regressions that would have been difficult to detect manually."
mlops:
  source: "sqlite"
  entryId: 151
  sourceUrl: "https://mlops.community/auroras-data-engine-how-we-accelerate-machine-learning-model-workflows/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061946"
  lastUpdated: "2026-04-14T19:55:32.485516"
---

## Problem Context

Aurora Innovation's autonomous vehicle development relies fundamentally on machine learning models that power everything from perception to motion planning. These models exist within what Aurora calls the "Data Engine" lifecycle—a continuous process that starts with identifying required data types (such as sensor data of emergency vehicles in various situations), progresses through data mining and labeling to create training datasets, trains models, conducts subsystem and system-level evaluations, and feeds results back for the next iteration. The efficiency and speed of this lifecycle directly determines Aurora's ability to quickly and safely develop, deploy, and continuously improve their self-driving technology.

The model development workflow for autonomous vehicles presents unique challenges compared to other ML applications. Aurora's autonomy stack comprises multiple interconnected ML models for perception, motion planning, and other functions, where changes to a single model can cascade and affect others. This creates a complex web of dependencies with feedback loops involving external ML tooling, internal tools, and systems written in both C++ and Python. Writing automatable declarative workflows in this environment proved extraordinarily challenging.

Through discussions with model developers, Aurora identified several critical pain points that were throttling ML experimentation and production velocity. The process of going from new data to a production-ready model was highly manual and required significant engineering effort. Running model-specific integration tests on code changes was manual and time-consuming. Launching multiple experiments in parallel was labor-intensive due to lack of experiment tracking and traceability. There was no mechanism to integrate multiple subsystems into unified workflows, and no single interface allowed developers to visualize and debug the entire lifecycle in one place. Bottlenecks at any stage could delay continuous deployment of new data, models, and software to their vehicles, creating an urgent need for optimization.

## Architecture & Design

Aurora designed their solution as a three-layer architecture to separate concerns and enable independent scaling of different aspects of the ML workflow:

The **Build layer** handles creation of Docker images and other build artifacts, supported by Aurora's Developer Experience team using Buildkite as the build orchestration system. This layer ensures consistent, reproducible build environments across the organization.

The **ML orchestration layer** sits at the heart of the system, orchestrating and tracking the entire ML workflow lifecycle. This layer serves as the central nervous system connecting all the pieces of the model development workflow. It provides capabilities for continuous delivery of datasets and models, continuous integration with automated health monitoring tests, on-demand integration tests for validating changes, integrated tooling for parallel experimentation, and automated testing for periodic compute stack upgrades covering CUDA, cuDNN, TensorRT, PyTorch, and other compute libraries.

The **Compute layer** executes various workloads including data processing, training, exporting, and evaluation. This layer leverages both external systems like AWS Sagemaker for distributed model training and internal systems like Aurora's Batch API (their internal supercomputer) for distributed compute jobs such as dataset generation and metrics evaluation.

The architecture was designed according to several key principles. Automatability enables quickly building new pipelines and passing data between steps. Reusability allows teams to leverage existing declarative components and pipelines across different models and teams. Scalability ensures the system can grow with data volume, model count, experiment count, and user count, while allowing different workloads to scale independently. Security considerations led to streamlined roles and policies for each layer to minimize attack surface. Maintainability was addressed by keeping the infrastructure declarative and manageable by a lean cross-organization team. Extensibility allows integration of domain-specific tooling and libraries. Reproducibility comes from structured tracking of metadata and experiments. Traceability enables lineage tracking of artifacts and release reporting. Usability provides self-service capabilities for onboarding and debugging.

## Technical Implementation

Aurora selected Kubeflow Pipelines as the foundation for their ML orchestration layer. Kubeflow provides a rich set of foundations including a user interface, metadata tracking capabilities, and common ML tooling, while allowing Aurora to extend it with domain-specific vertical features like their internal metrics and visualization systems. The infrastructure team's existing expertise in running production Kubernetes clusters made standing up a Kubeflow cluster relatively straightforward.

The Kubeflow installation runs on Amazon EKS (Elastic Kubernetes Service) clusters. Aurora uses Terraform to manage permissions and resources provided by AWS Managed Services. The team customized the Kubeflow Kubernetes manifests for their enterprise environment to handle user login and group management, with each model development team receiving a separate namespace in Kubeflow for isolation and organization. Experiment metadata is automatically tracked and logged within the Kubeflow UI, facilitating easier experimentation and comparison across runs.

Aurora's pipelines use a set of common utilities, Bazel macros, and launch scripts. A typical pipeline definition for one of their models includes several key files: a BUILD file containing Bazel targets for the pipeline and Docker images; a launch.py file providing the command line interface for pushing Docker images and launching pipelines with specific parameters; a pipeline.py file containing the pipeline definition and factory function that resembles a standard Kubeflow pipeline but uses Aurora-specific components; a pipeline_test.py file with pipeline-specific unit tests; and a smoke_test.sh script for integration testing.

Users can invoke pipelines from their workstation command line, through pull request commands (preconfigured commands that run on code changes), or as part of CI/CD processes. For example, the command `/kubeflow train --model [model name] --training_type [core, deploy, integration]` kicks off a model training workflow when run on a pull request. A complete executed pipeline covers the entire development workflow including dataset generation, quality reporting, model training, model exporting, model deployment, evaluation, and landing.

To ensure the new pipelines could integrate seamlessly into existing workflows without forcing teams to adopt new processes, Aurora built foundational utilities with common data structures, components, and libraries. They prioritized reusing existing integrations between pipelines whenever possible, as building any sort of integration (internal or external) is time-consuming. All components and pipelines are created with factory methods that allow overriding of compile-time parameters like Docker images, and are compiled at execution time. This ensures components and pipelines are always up-to-date with other dependencies and code in the monorepo.

Aurora developed several common components used across different model workflows and teams. The Sagemaker component launches distributed model training on Sagemaker using a wrapper over the open-source Sagemaker component. A Slack component sends notifications to channels or users, primarily used as an exit handler for every pipeline. A GitHub component integrates with common functions like creating pull requests and commenting on PRs, allowing connection of workflow parts not yet integrated into Kubeflow. The Batch API component launches distributed compute jobs like dataset generation and metrics evaluation on Aurora's internal batch platform. A Tensorboard component launches Tensorboard instances for specific training jobs within Kubeflow.

Aurora provides two use case-specific methods for creating new components that come with pre-integrated Aurora libraries: as a Python function with a helper Python wrapper, or as a binary with a helper Bazel macro. This flexibility allows teams to work in the paradigm that best suits their specific needs while maintaining consistency across the platform.

## Scale & Performance

While Aurora doesn't provide extensive quantitative metrics in this case study, they do share several important performance outcomes. The centralized ML orchestration system has enabled continuous delivery of datasets and models within two weeks of new data availability, with metrics fed back into the Data Engine for the next iteration. This represents a significant acceleration of their previously manual processes.

The majority of Aurora's autonomy model developers now use the centralized ML orchestration system for their development and production workflows. Users typically launch at least one pipeline per day, indicating substantial daily usage across the organization. The system supports multiple launch mechanisms: CLI for quick experimentation from workstations, pull request commands that have become one of the most popular methods for running integration tests and launching core experimentation and production deployments, automated CI tests for monitoring workflow health, and automated CD runs for end-to-end deployment workflows on newly labeled data.

The system has drastically cut down time spent on production and deployment of models on new data, reduced manual effort during experimentation, and accelerated model development workflows by saving time during dataset generation, training, and evaluation. Critically, the automated testing has caught numerous bugs and regressions in dataset quality and model performance that would have been very difficult and time-consuming to find and debug manually.

## Trade-offs & Lessons

Aurora's implementation journey offers several valuable lessons for practitioners building similar ML orchestration systems. The team made a deliberate choice to start small rather than attempting to build the entire system at once. They began by establishing a small but critical training workflow and onboarding a few users from one core model development team. After iterating on this initial pilot workflow with real users, they expanded to cover end-to-end ML model landing workflows. This incremental approach allowed them to validate their design decisions early and build momentum through demonstrated value.

The team composition proved critical to success. Aurora assembled a small virtual cross-organization team with expertise spanning machine learning, distributed systems, and infrastructure. This diverse skill set was essential given the highly interdependent nature of the work, which touched on ML algorithms, distributed computing, Kubernetes infrastructure, and developer tooling.

Driving adoption required careful attention to user needs and clear demonstration of value. Aurora worked closely with model development teams during each phase of development, ensuring code maintainability and encouraging workflow consolidation where possible. The project gained momentum once the first pipeline was operational and engineers could see tangible benefits to their work. Aurora invested in adoption enablement through code labs, internal deep dives, and office hours to increase awareness. They also designed integration points that met users where they were, like the Kubeflow-specific pull request command on GitHub and Buildkite integration for CI/CD scheduling, which made it easy for developers to run integration tests and experiment without learning team-specific workflows.

The choice of Kubeflow Pipelines as the orchestration foundation proved well-suited to Aurora's needs. Kubeflow provided essential foundations without being overly prescriptive, allowing Aurora to extend it with their domain-specific requirements. The existing organizational expertise in Kubernetes operations reduced the friction of adopting Kubeflow, which runs on Kubernetes. However, Aurora still needed to customize the Kubeflow manifests for their enterprise environment, particularly around user management and multi-tenancy through namespaces.

Aurora's emphasis on reusability and standardization paid dividends. By creating common components, utilities, and libraries, they avoided the trap of maintaining multiple bespoke, brittle workflows for different teams. The dashboard tracking pipeline usage across different use cases proved valuable for proactively identifying opportunities for pipeline consolidation or deprecation, helping manage technical debt.

The factory method pattern for components and pipelines, with compile-time parameterization and execution-time compilation, ensured consistency with the monorepo while providing flexibility. This approach prevents drift between pipeline definitions and the underlying code and dependencies.

Aurora's integration strategy balanced pragmatism with automation. The GitHub component that can create PRs and add comments allowed them to bridge parts of the workflow not yet fully integrated into Kubeflow, providing incremental value while working toward full automation. This demonstrates that MLOps platforms don't need to be perfect before delivering value—they can evolve alongside the organization's needs.

The architectural separation into build, orchestration, and compute layers enabled independent scaling and evolution of each concern. Different teams could own different layers aligned with their expertise (Developer Experience owning build, ML Operations owning orchestration, infrastructure owning compute resources), while the standardized interfaces between layers prevented tight coupling.

For autonomous vehicle development specifically, the ability to handle complex feedback loops and model interdependencies was paramount. The system needed to accommodate the reality that changes to one perception model might affect motion planning models downstream, requiring end-to-end integration testing and careful coordination. The automated integration testing on pull requests proved particularly valuable in this context, catching issues that would be expensive to discover later in the development cycle.

The two-week cycle time for continuous delivery of datasets and models represents a significant achievement for AV development, where the volume and complexity of sensor data creates substantial data engineering challenges. While Aurora doesn't detail the specific techniques used to achieve this cadence, it suggests effective automation of data processing, labeling workflows, training orchestration, and deployment processes.

Overall, Aurora's experience demonstrates that building an effective ML orchestration platform requires balancing multiple concerns: technical architecture that separates concerns while enabling integration, incremental rollout that builds user confidence through demonstrated value, careful attention to developer experience and existing workflows, and organizational alignment through cross-functional teams. The platform's success ultimately derives not just from selecting the right technologies, but from the thoughtful implementation approach that prioritized user needs, maintainability, and extensibility.
