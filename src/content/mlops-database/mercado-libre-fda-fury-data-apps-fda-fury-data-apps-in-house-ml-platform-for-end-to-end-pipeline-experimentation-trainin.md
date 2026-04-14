---
title: "FDA (Fury Data Apps) in-house ML platform for end-to-end pipeline, experimentation, training, online and batch serving, and monitoring"
slug: "mercado-libre-fda-fury-data-apps-fda-fury-data-apps-in-house-ml-platform-for-end-to-end-pipeline-experimentation-trainin"
draft: false
mlopsTags:
  - "compute-management"
  - "data-versioning"
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "docker"
  - "kubernetes"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Mercado Libre"
companySlug: "mercado-libre"
platformName: "FDA (Fury Data Apps)"
contentType: "blog"
summary: "Mercado Libre built FDA (Fury Data Apps), an in-house machine learning platform embedded within their Fury PaaS infrastructure to support over 500 users including data scientists, analysts, and ML engineers. The platform addresses the challenge of democratizing ML across the organization while standardizing best practices through a complete pipeline covering experimentation, ETL, training, serving (both online and batch), automation, and monitoring. FDA enables end-to-end ML development with more than 1500 active laboratories for experimentation, 8000 ETL tasks per week, 250 models trained weekly, and over 50 apps serving predictions, achieving greater than 10% penetration across the IT organization."
link: "https://medium.com/mercadolibre-tech/why-and-when-to-build-a-machine-learning-platform-part-2-66eae56c4b35"
year: 2021
seo:
  title: "Mercado Libre: FDA (Fury Data Apps) in-house ML platform for end-to-end pipeline, experimentation, training, online and batch serving, and monitoring - ZenML MLOps Database"
  description: "Mercado Libre built FDA (Fury Data Apps), an in-house machine learning platform embedded within their Fury PaaS infrastructure to support over 500 users including data scientists, analysts, and ML engineers. The platform addresses the challenge of democratizing ML across the organization while standardizing best practices through a complete pipeline covering experimentation, ETL, training, serving (both online and batch), automation, and monitoring. FDA enables end-to-end ML development with more than 1500 active laboratories for experimentation, 8000 ETL tasks per week, 250 models trained weekly, and over 50 apps serving predictions, achieving greater than 10% penetration across the IT organization."
  canonical: "https://www.zenml.io/mlops-database/mercado-libre-fda-fury-data-apps-fda-fury-data-apps-in-house-ml-platform-for-end-to-end-pipeline-experimentation-trainin"
  ogTitle: "Mercado Libre: FDA (Fury Data Apps) in-house ML platform for end-to-end pipeline, experimentation, training, online and batch serving, and monitoring - ZenML MLOps Database"
  ogDescription: "Mercado Libre built FDA (Fury Data Apps), an in-house machine learning platform embedded within their Fury PaaS infrastructure to support over 500 users including data scientists, analysts, and ML engineers. The platform addresses the challenge of democratizing ML across the organization while standardizing best practices through a complete pipeline covering experimentation, ETL, training, serving (both online and batch), automation, and monitoring. FDA enables end-to-end ML development with more than 1500 active laboratories for experimentation, 8000 ETL tasks per week, 250 models trained weekly, and over 50 apps serving predictions, achieving greater than 10% penetration across the IT organization."
mlops:
  source: "sqlite"
  entryId: 92
  sourceUrl: "https://medium.com/mercadolibre-tech/why-and-when-to-build-a-machine-learning-platform-part-2-66eae56c4b35"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061311"
  lastUpdated: "2026-04-14T19:55:03.659604"
---

## Problem Context

MercadoLibre faced several fundamental challenges in scaling machine learning across their organization. With data scientists and developers distributed across multiple teams, the company struggled with siloed workflows, duplicated infrastructure work, and inconsistent practices for developing and deploying ML models. Each team was independently solving similar problems around data access, model training infrastructure, deployment, and monitoring, leading to wasted effort and difficulty sharing knowledge. The lack of standardization made it challenging for non-experts to leverage machine learning, creating barriers to entry that limited the organization's ability to scale data-driven solutions. Additionally, teams lacked the infrastructure necessary to ensure reproducibility, trace model lineage, and maintain production-ready ML systems.

The core motivation for building FDA stemmed from five key objectives identified by an interdisciplinary council of developers, cloud architects, and data scientists: democratizing machine learning by flattening the learning curve for non-experts, promoting best practices and creating synergy across teams to prevent silos, sharing knowledge through a common library, supporting data-driven solutions at scale, and delivering fast access to ML capabilities for everyone. These drivers became the foundation for all design and implementation decisions throughout the platform's development.

## Architecture & Design

FDA (Fury Data Apps) is architecturally embedded within Fury, MercadoLibre's existing Platform-as-a-Service tool for building, deploying, monitoring, and managing services in a cloud-agnostic manner. This embedding strategy allowed the ML platform team to leverage existing infrastructure for basic service management, monitoring, and deployment while focusing on ML-specific capabilities.

The platform conceptualizes machine learning as a process with distinct, interconnected stages that form a complete pipeline. The team designed a high-level abstraction of the ML workflow with the explicit goal of creating a cycle flexible enough to cover most ML project use cases while providing standardized solutions at each step. The core pipeline architecture consists of five primary stages: Experiment, ETL, Train, Predict, and Automate, with Monitor as a cross-cutting concern.

### Experiment Stage - Laboratories

The experimentation foundation of FDA consists of hosted Jupyter notebook environments called "Laboratories" (Labs). Each Lab represents a safe, personal workspace designed specifically for data science work. When a user creates a Lab, infrastructure is automatically provisioned behind the scenes using the user's personal token for authentication and authorization. Labs operate with preset time frames to prevent resource waste while allowing extensions when needed for longer-running work.

The Labs provide several architectural advantages. Data source access is built directly into a custom library, eliminating the need for users to configure connections to databases, APIs, or file systems. Each new FDA Lab automatically creates a dedicated GitHub repository, enabling version control and reproducibility from the start of experimentation. The platform offers multiple preset "flavors" of compute configurations combining different levels of processing power, RAM, and storage, simplifying infrastructure selection for users who might otherwise be overwhelmed by cloud configuration options. These flavors include GPU processing capabilities to handle the high volume and variety of data, particularly image processing workloads.

### ETL Stage

The ETL (Extract Transform Load) stage represents the first step in the production pipeline, focusing on data engineering work required to obtain, prepare, and present data to models. In FDA's architecture, ETL processes are versioned artifacts built from code stored in GitHub combined with user-defined version identifiers. This versioning approach provides reproducibility by allowing users to trace any result set back to its original execution and source code.

The key architectural decision here involves treating ETL outputs (typically datasets) as first-class versioned artifacts. Each ETL execution produces data that can be explicitly referenced by downstream pipeline stages, creating clear lineage from raw data through transformation to model consumption.

### Train Stage

The Training stage extends the versioning and lineage concept to model development. When creating a model, users specify an identifier/version, code location, and critically, the ETL version that provides the training dataset. This architectural binding between ETL and Training stages ensures that datasets are automatically available in the training scope without manual data movement or complex authorization configuration.

This design enables experimentation by allowing multiple training pipeline runs to reference a single ETL version, making it efficient to test different models on the same dataset. The output of the training process is a trained model artifact that is stored and made available for serving.

### Predict Stage

The prediction architecture splits into two distinct patterns: online serving and batch predictions.

For online serving, FDA leverages "Osobuco," a zero-configuration toolkit providing minimal boilerplate for deploying and serving trained models. Models are deployed as web services with dedicated metering, auditing, and autoscaling capabilities inherited from the underlying Fury platform. The deployment creates what the team calls an "MPI" (Model Programming Interface) - a REST API endpoint (specifically a `/predict` endpoint) that provides programmatic access to model inferences. To create an MPI, users need only specify code location in GitHub and select a pre-existing Training version, which maintains the lineage chain through the ETL version.

For batch predictions, FDA provides a specialized module addressing offline scoring use cases. Users specify an ETL version for input data and a Training version (model) to apply to it. The output is similar to an ETL artifact but maintains relationships to both the Training and ETL versions, preserving complete lineage for reproducibility.

### Automation Stage

The automation layer sits atop the core ETL-Training-Predict flow, enabling scheduled execution of pipeline stages. Users can configure time-based triggers for ETL and/or Training executions using timer rule expressions. Each automated run creates an execution record with a timestamp, supporting use cases like periodic report generation, model retraining, and data updates.

### Monitor Stage

The monitoring architecture separates concerns between general service monitoring (handled by Fury's existing capabilities for uptime, service health, and observability) and ML-specific monitoring requirements. The dedicated monitoring team built custom capabilities integrated tightly with FDA including:

The collection layer implements unobtrusive, scalable capture of model inputs and outputs for both online and batch serving. The platform provides interfaces for collecting ground-truth data correlated to model outputs, enabling performance tracking and business impact measurement. Users can persist general metadata and assets related to modeling assumptions and training properties for use during monitoring.

The monitoring framework includes a custom low-level package for implementing data checks and tests (called "Monitors"), designed to integrate with existing tools and libraries. A service runs these Monitors periodically with configurable alerting via email or real-time alarms to on-duty teams. Programmatic access to collected data supports analysis, experimentation, and development of new monitoring capabilities.

## Technical Implementation

FDA is built on Python as the primary language for data science workflows. The platform provides access to data sources through a custom open-source library that includes utilities for reading and writing different file types. This library is distributed through MercadoLibre's own shared PyPI repository, enabling teams to contribute and share utilities.

The infrastructure leverages GitHub extensively for version control, with automatic repository creation for each new FDA project. Code artifacts are stored in GitHub and referenced via version identifiers throughout the pipeline, creating an auditable trail from experimentation through production.

The underlying Fury PaaS provides cloud-agnostic infrastructure management, handling the complexity of deployment, scaling, and service management. This abstraction allows data scientists to work without needing deep cloud infrastructure knowledge, regardless of the deployment's complexity.

For compute resources, FDA offers configurable flavors of processing, RAM, and storage, including GPU capabilities. The platform provisions infrastructure dynamically based on user selections, with safety mechanisms like preset time limits on Labs to prevent resource waste.

The Osobuco toolkit specifically handles model serving, providing the boilerplate necessary to transform trained models into production REST APIs. This zero-configuration approach minimizes the deployment friction between training a model and making it available for inference.

## Scale & Performance

FDA demonstrates substantial operational scale across multiple dimensions:

The platform supports over 500 active users, representing more than 10% penetration of MercadoLibre's IT organization. These users include analysts, data scientists, machine learning engineers, and data engineers working across diverse teams and use cases.

For experimentation, FDA hosts more than 1500 active laboratories at any given time, providing distributed compute resources for data exploration and model development.

The ETL infrastructure processes significant data engineering workloads, with over 8000 ETL tasks launched per week. This throughput indicates substantial data preparation activity across the organization.

Model training operates at a pace of more than 250 models trained per week, suggesting active experimentation and production model development.

For production serving, FDA powers over 50 applications delivering predictions, with an additional 25 apps having dedicated monitoring configured.

The monitoring infrastructure collects model inputs, outputs, and ground-truth data at scale, though specific volume metrics are not provided in the source.

## Trade-offs & Lessons

### What Worked Well

The embedding strategy of building FDA within the existing Fury PaaS proved highly effective. By leveraging Fury's mature infrastructure for general service management, the FDA team could focus on ML-specific capabilities rather than rebuilding foundational DevOps tooling. This architectural decision accelerated development and provided immediate access to proven capabilities for monitoring, autoscaling, and deployment.

The versioning and lineage approach creates clear reproducibility throughout the pipeline. By requiring explicit version identifiers and maintaining relationships between ETL, Training, and Predict stages, the platform ensures that users can trace any prediction back through the model to the training data and its transformation logic. This design decision pays dividends in debugging, auditing, and understanding model behavior.

The separation of online and batch serving addresses distinct use case requirements without forcing users into a one-size-fits-all architecture. Recognizing that some scenarios need real-time API access while others require bulk scoring allows each pattern to be optimized appropriately.

The preset infrastructure "flavors" effectively democratize access to compute resources by simplifying what could be overwhelming configuration decisions. Rather than requiring users to understand cloud instance types, memory configurations, and storage options, the platform presents curated choices that cover common scenarios.

Automatic GitHub repository creation for each FDA project embeds version control as a default practice rather than an optional add-on, promoting reproducibility and collaboration from the start.

### Challenges and Ongoing Work

The platform faces the classic tension between following industry best practices suggested by benchmarks and responding to specific user requests that may diverge from market standards. As the team describes it, they're on the "slope of enlightenment" moving toward the "plateau of productivity" in Gartner's Hype Cycle terminology. This maturity phase requires balancing standardization with flexibility.

Supporting over 600 data scientists working on more than 500 experiments while maintaining 30+ productive services creates operational overhead. The platform must serve both exploratory workloads (which may be ephemeral and experimental) and production systems (which require stability and reliability). These different usage patterns strain infrastructure differently and require distinct support approaches.

The monitoring roadmap indicates that current capabilities, while functional, still require manual implementation of specific checks and tests. The team is working toward higher-level ML monitoring capabilities including automatic detection of data drift, concept drift, model stagnation, and outliers. This evolution from low-level building blocks to automated intelligence represents a common maturity path for ML platforms.

The integration of scalable machine learning pipeline features while merging software release process standards applicable to ML projects represents ongoing architectural work. This challenge reflects the broader industry struggle to adapt traditional software engineering practices to the iterative, experimental nature of machine learning development.

### Key Insights for Practitioners

Building an ML platform incrementally on top of existing PaaS infrastructure can dramatically accelerate time to value compared to building everything from scratch. MercadoLibre's decision to embed FDA in Fury allowed them to focus resources on ML-specific problems.

Versioning and lineage should be architectural first principles, not afterthoughts. By making version identifiers required at each pipeline stage and maintaining explicit relationships between stages, reproducibility becomes automatic rather than aspirational.

Democratization requires intentional abstraction. The preset infrastructure flavors, automatic repository creation, and zero-configuration model serving reduce barriers to entry without sacrificing capability for advanced users.

Separating concerns between general service monitoring and ML-specific monitoring allows each to be addressed with appropriate tools and expertise. Trying to force ML monitoring requirements into traditional DevOps observability frameworks often results in gaps.

Supporting both experimentation and production use cases on the same platform creates tensions that require careful architectural choices. Personal Labs with time limits serve experimentation well, while versioned, automated pipelines serve production requirements.

The platform's five core objectives (democratization, best practices, knowledge sharing, scale, and fast delivery) provide a clear decision-making framework. When evaluating new features or capabilities, the team can assess alignment with these goals, preventing feature creep and maintaining architectural coherence.
