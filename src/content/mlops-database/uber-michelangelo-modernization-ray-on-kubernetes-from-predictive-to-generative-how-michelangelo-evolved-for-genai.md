---
title: "From Predictive to Generative: How Michelangelo evolved for GenAI"
slug: "uber-michelangelo-modernization-ray-on-kubernetes-from-predictive-to-generative-how-michelangelo-evolved-for-genai"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "notebooks"
  - "pipeline-orchestration"
  - "databricks"
  - "docker"
  - "horovod"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "spark"
  - "terraform"
  - "triton"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo modernization + Ray on Kubernetes"
contentType: "blog"
summary: "Uber's Michelangelo platform evolved over eight years from a basic predictive ML system to a comprehensive GenAI-enabled platform supporting the company's entire machine learning lifecycle. Initially launched in 2016 to standardize ML workflows and eliminate bespoke pipelines, the platform progressed through three distinct phases: foundational predictive ML for tabular data (2016-2019), deep learning adoption with collaborative development workflows (2019-2023), and generative AI integration (2023-present). Today, Michelangelo manages approximately 400 active ML projects with over 5,000 models in production serving 10 million real-time predictions per second at peak, powering critical business functions across ETA prediction, rider-driver matching, fraud detection, and Eats ranking. The platform's evolution demonstrates how centralizing ML infrastructure with unified APIs, version-controlled model iteration, comprehensive quality frameworks, and modular plug-and-play architecture enables organizations to scale from tree-based models to large language models while maintaining developer productivity."
link: "https://www.uber.com/blog/from-predictive-to-generative-ai/"
year: 2024
seo:
  title: "Uber: From Predictive to Generative: How Michelangelo evolved for GenAI - ZenML MLOps Database"
  description: "Uber's Michelangelo platform evolved over eight years from a basic predictive ML system to a comprehensive GenAI-enabled platform supporting the company's entire machine learning lifecycle. Initially launched in 2016 to standardize ML workflows and eliminate bespoke pipelines, the platform progressed through three distinct phases: foundational predictive ML for tabular data (2016-2019), deep learning adoption with collaborative development workflows (2019-2023), and generative AI integration (2023-present). Today, Michelangelo manages approximately 400 active ML projects with over 5,000 models in production serving 10 million real-time predictions per second at peak, powering critical business functions across ETA prediction, rider-driver matching, fraud detection, and Eats ranking. The platform's evolution demonstrates how centralizing ML infrastructure with unified APIs, version-controlled model iteration, comprehensive quality frameworks, and modular plug-and-play architecture enables organizations to scale from tree-based models to large language models while maintaining developer productivity."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-modernization-ray-on-kubernetes-from-predictive-to-generative-how-michelangelo-evolved-for-genai"
  ogTitle: "Uber: From Predictive to Generative: How Michelangelo evolved for GenAI - ZenML MLOps Database"
  ogDescription: "Uber's Michelangelo platform evolved over eight years from a basic predictive ML system to a comprehensive GenAI-enabled platform supporting the company's entire machine learning lifecycle. Initially launched in 2016 to standardize ML workflows and eliminate bespoke pipelines, the platform progressed through three distinct phases: foundational predictive ML for tabular data (2016-2019), deep learning adoption with collaborative development workflows (2019-2023), and generative AI integration (2023-present). Today, Michelangelo manages approximately 400 active ML projects with over 5,000 models in production serving 10 million real-time predictions per second at peak, powering critical business functions across ETA prediction, rider-driver matching, fraud detection, and Eats ranking. The platform's evolution demonstrates how centralizing ML infrastructure with unified APIs, version-controlled model iteration, comprehensive quality frameworks, and modular plug-and-play architecture enables organizations to scale from tree-based models to large language models while maintaining developer productivity."
mlops:
  source: "sqlite"
  entryId: 178
  sourceUrl: "https://www.uber.com/blog/from-predictive-to-generative-ai/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.616863"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

When Uber began its machine learning journey in 2015, the company faced fundamental infrastructure challenges that plague many organizations scaling ML capabilities. Applied scientists developed models in Jupyter Notebooks while engineers built custom, bespoke pipelines to deploy those models to production. This approach lacked systematic support for building reliable and reproducible pipelines at scale, offered no centralized way to store or compare training experiment results, and provided no established path to production deployment without creating custom serving containers for each model.

As Uber's ML adoption accelerated and models became critical to business operations like ETA prediction, rider-driver matching, fraud detection, and Eats homefeed ranking, these fragmentation problems intensified. By 2019, different teams had built separate ML tools for subsets of the ML lifecycle including Data Science Workbench for managed Jupyter Notebooks, ML Explorer for workflow orchestration, and uFlow/uScorer specifically for risk team models. Launching a single ML project required constantly switching between semi-isolated tools built with different UI patterns and user flows, creating fragmented experiences and reduced productivity.

Additional challenges emerged as Uber attempted to adopt advanced techniques. The platform lacked comprehensive ML quality definitions and project tiering, meaning high-impact projects received the same resource allocation as exploratory work. There was insufficient support for deep learning models despite Uber's vast data suitable for DL training, forcing teams like Maps ETA and Rider incentives to invest months developing custom DL toolkits. Collaborative model development proved difficult without version control, branching, or code review processes for UI configuration changes or notebook edits.

## Architecture & Design

Michelangelo's architecture evolved significantly across its three major phases, ultimately converging on a modular, Kubernetes-based design with three distinct planes: control plane, offline data plane, and online data plane.

### Control Plane Architecture

The control plane adopts the Kubernetes Operator design pattern for modularization and extensibility. Michelangelo APIs follow Kubernetes API conventions and standardize operations on ML-related entities including Project, Pipeline, PipelineRun, Model, Revision, InferenceServer, and Deployment. By leveraging Kubernetes API machinery including API server, etcd, and controller manager, all Michelangelo APIs can be accessed consistently, enabling both UI and code-based mutations from a Git repository. This declarative API pattern proved crucial for supporting mutation by both UI and code in version-controlled repositories.

The control plane manages the lifecycle of all entities in the system and defines user-facing APIs. A job federation layer sits on top of compute clusters, abstracting region, zone, and cluster details for better job portability and cloud migration. This job federation layer leverages the Kubernetes operator design pattern and is implemented as a job CRD controller supporting both Spark and Ray jobs.

### Offline Data Plane

The offline data plane handles heavy lifting for big data processing including feature computation, model training and evaluation, and offline batch inference. ML pipelines are defined as directed acyclic graphs (DAGs) of steps, with support for intermediate checkpoints and resume capabilities between steps to avoid duplicate executions. Steps execute on frameworks like Ray or Spark depending on the workload characteristics.

### Online Data Plane

The online data plane manages RPC services and streaming processing jobs that serve online predictions, online feature access, and near-real-time feature computation. This separation enables Michelangelo to optimize for the distinct latency and throughput requirements of production serving versus batch training workloads.

### Key Platform Components

**Feature Store (Palette)**: Built to manage and share feature pipelines across teams, Palette supports both batch and near-real-time feature computation. The feature store currently hosts more than 20,000 features that teams can leverage out-of-box for building ML models. This shared feature infrastructure eliminates redundant feature engineering work and helps ensure consistency across models.

**Model Registry (Gallery)**: Michelangelo's model and ML metadata registry provides a comprehensive search API for all types of ML entities. Gallery serves as the central catalog tracking model lineage, versions, and associated metadata, enabling teams to discover and reuse models across the organization.

**ML Application Framework (MAF)**: Introduced as part of Project Canvas, MAF provides predefined but customizable ML workflow templates offering a code and configuration-driven approach to ML development, particularly tailored for intricate techniques like deep learning.

**ML Monorepo**: A centralized repository storing all ML development source of truth as code with robust version control capabilities. This enables systematic code review, branching, and collaboration that was previously impossible with scattered configurations.

**MA Studio**: The unified web UI tool covering the entire ML development lifecycle from feature preparation through deployment and monitoring. MA Studio provides simplified user flows in one place while maintaining full version control and code review processes for all changes, even those made through the UI.

## Technical Implementation

### Deep Learning Infrastructure

Michelangelo's transition to supporting deep learning as a first-class citizen required substantial infrastructure investments across the entire ML lifecycle.

**Feature Transformation**: Michelangelo 1.0 implemented a DSL for feature transformations like normalization and bucketization, bundled with models as Spark PipelineModels to eliminate training-serving skew. However, this approach couldn't run on GPU for low-latency DL serving. Michelangelo 2.0 implemented a DL-native transformation solution allowing users to transform features using Keras or PyTorch operators, with the transform graph combined with the model inference graph in TensorFlow or TorchScript for low-latency GPU serving.

**Distributed Training**: The platform supports both TensorFlow and PyTorch frameworks for large-scale distributed training by leveraging Horovod. Training transitioned from Spark-based execution to Ray-based trainers for better scalability and reliability. Hyperparameter tuning switched from an in-house solution to RayTune. Elastic Horovod enables dynamically scaling the number of workers throughout training, allowing jobs to continue with minimal interruption when machines come and go.

Resource-efficient incremental training allows DL models to train with additional datasets without starting from scratch, significantly improving resource efficiency for production retrains and increasing dataset coverage for better accuracy. Training pipelines in Canvas are declarative yet extensible, allowing users to plug in custom model code including estimators, optimizers, and loss functions.

**Model Serving**: Most tier-1 ML projects adopting DL are extremely sensitive to serving latency, such as maps ETA and Eats homefeed ranking. The platform needed to support both TensorFlow and PyTorch while abstracting framework details from users. Michelangelo 2.0 integrated Triton as the next-generation serving engine in the Online Prediction Service (OPS) as a Spark transformer. Triton, developed by Nvidia, supports multiple frameworks including TensorFlow, PyTorch, Python, and XGBoost, and is highly optimized for low-latency GPU serving.

**GPU Resource Management**: Uber manages more than 5,000 GPUs across on-premise data centers and cloud providers including OCI and GCP, spread across multiple regions, zones, and clusters. The compute clusters migrated from Peloton/Mesos to Kubernetes. To maximize resource utilization, Uber implemented elastic CPU and GPU resource sharing across teams, allowing opportunistic use of idle resources.

### Dependency Management and Environments

Canvas streamlined ML dependency management by leveraging Bazel and Docker builds. Each ML project has customized Docker images, with model training and serving code packaged into immutable Docker images for production model retraining and serving. Canvas provides consistent local development and remote production execution environments, enabling developers to test and debug models locally before running in remote production environments for faster iteration.

### Continuous Integration and Deployment

ML CI/CD provides continuous integration against the master branch and automates deployment to production for models landed to the master branch of the ML monorepo through various tests and validations. The modernized deployment stack includes safe and incremental zonal rollout, automatic rollback triggers, and production runtime validation.

### Quality Framework

The Model Excellence Score (MES) framework measures and monitors key dimensions and metrics at each stage of a model's lifecycle, including training model accuracy, prediction accuracy, model freshness, and prediction feature quality. MES leverages the same Service Level Agreement (SLA) concept used by SREs and DevOps professionals to manage microservice reliability. By integrating with SLA toolsets, MES establishes standards for measuring and ensuring ML model quality at Uber while tracking and visualizing compliance across the organization.

Uber introduced a well-defined four-tier ML project tiering scheme, with tier-1 representing the highest impact. Tier-1 projects consist of models serving critical functions within core trip and eater flows like ETA calculations, safety, and fraud detection. This tiering enables informed decisions about resource allocation for outage handling, resource investment, best practice enforcement, and compliance matters.

### Generative AI Extensions

For generative AI capabilities starting in 2023, Uber developed the Gen AI Gateway providing unified access to both external LLMs through third-party APIs and internally hosted open-source LLMs. The gateway implements logging and auditing, cost guardrails and attribution, safety and policy guardrails, and PII redaction identifying and categorizing personal data before sending inputs to external LLMs.

Michelangelo extended its capabilities to support full LLMOps including fine-tuning data preparation, prompt engineering, LLM fine-tuning and evaluation, deployment and serving, and production performance monitoring. The Model Catalog features pre-built LLMs accessible via third-party APIs (GPT-4, Google PaLM) or in-house hosted open-source models (Llama2). An LLM Evaluation Framework enables comparing approaches across in-house versus third-party with prompts versus fine-tuned models. The Prompt Engineering Toolkit allows creating and testing prompts, validating output, and saving prompt templates in a centralized repository with full version control.

For cost-effective LLM fine-tuning, Uber implemented a Ray-based trainer utilizing open-source LLMs from Hugging Face Hub and associated libraries like PEFT. Fine-tuned LLMs and metadata are stored in Uber's model repository accessible from inference infrastructure. Integration with Deepspeed enables model parallelism, eliminating GPU memory limitations and allowing training of larger models that previously couldn't fit on available GPUs. Elastic GPU resource management provisions Ray clusters on GPUs through the Michelangelo job controller, enabling training on the most powerful on-premises GPUs with future extension to cloud GPUs.

## Scale & Performance

Michelangelo operates at impressive scale across Uber's global operations. The platform currently manages approximately 400 active ML projects with over 20,000 model training jobs executed monthly. More than 5,000 models run in production, collectively serving 10 million real-time predictions per second at peak load.

The feature store (Palette) hosts more than 20,000 features available for teams to leverage when building models. This shared feature infrastructure represents substantial accumulated engineering effort and domain knowledge captured in reusable components.

Uber's platform serves a business operating in over 10,000 cities across more than 70 countries, facilitating 25 million trips daily with 137 million monthly active users. ML integration extends to virtually every facet of these operations, from fraud detection during login through ETA computation, price calculation, rider-driver matching, on-trip routing, payment fraud detection, and customer service chatbots.

Deep learning adoption accelerated significantly with platform support, growing from nearly zero to more than 60% of tier-1 projects adopting DL in production. For example, the DeepETA model contains more than 100 million parameters and was trained on more than one billion trips, demonstrating the scale of data and model complexity the platform supports.

GPU infrastructure scaled to more than 5,000 GPUs managed across on-premise data centers and multiple cloud providers including OCI and GCP, distributed across multiple regions, zones, and clusters. This GPU infrastructure supports both training workloads and low-latency serving for DL models in production.

## Trade-offs & Lessons

Uber's eight-year journey building and evolving Michelangelo yielded several critical insights for organizations building large-scale ML platforms.

**Centralization Versus Fragmentation**: Instituting a centralized ML platform rather than having individual product teams build their own ML infrastructure significantly enhances ML development efficiency in medium or large companies. The ideal organizational structure combines a centralized ML platform team with dedicated data scientists and ML engineers embedded within each product team. This balance provides shared infrastructure and best practices while maintaining domain expertise close to business problems.

**UI Versus Code-Driven Workflows**: Providing both UI-based and code/configuration-driven user flows in a unified manner proves crucial for seamless ML developer experience, especially in large organizations where preferences vary significantly across developer cohorts. MA Studio demonstrates this approach by offering intuitive UI for standard workflows while Canvas enables advanced users to write code for complex scenarios, with both approaches feeding into the same version-controlled infrastructure.

**Abstraction Levels**: The strategy of offering high-level abstraction layers with predefined workflow templates and configurations for most users while allowing advanced power users direct access to low-level infrastructure components to build customized pipelines and templates has proven effective. This tiered approach serves the long tail of use cases through self-service while enabling sophisticated customization for tier-1 projects requiring specialized workflows.

**Modular Architecture**: Designing platform architecture in a modular, plug-and-play manner allows rapid adoption of state-of-the-art technologies from open source, third-party vendors, or in-house development. This architectural principle enabled Michelangelo to evolve from Spark-based training to Ray-based training, from Neuropod to Triton for serving, and from Peloton/Mesos to Kubernetes for orchestration without requiring complete platform rewrites.

**Deep Learning Complexity**: While deep learning proves powerful for solving complex ML problems, the challenge lies in supporting large-scale DL infrastructure and maintaining model performance. Uber's experience shows that in several cases, XGBoost outperforms DL in both performance and cost, suggesting teams should apply DL only when its advantages align with specific requirements rather than adopting it universally.

**Project Tiering**: Not all ML projects are created equal, and having a clear ML tiering system effectively guides resource allocation and support. The four-tier scheme enables appropriate investment levels, with tier-1 projects receiving priority for platform features, support, and resources while tier-4 experimental projects maintain self-service access to platform capabilities.

**Quality Measurement**: Comprehensive ML quality measurement extending beyond offline metrics like AUC and RMSE to include online performance, data freshness, and model reproducibility provides essential visibility. The Model Excellence Score framework borrowing SLA concepts from traditional software engineering creates shared language and standards for assessing ML system health.

**Version Control for ML**: Applying software engineering best practices including version control, code review, CI/CD, and Docker containerization to ML development significantly improves collaboration and quality. The ML monorepo approach ensures all model code and configurations undergo review processes, drastically improving production ML application quality compared to scattered notebooks and UI configurations without version control.

**Migration Challenges**: Transitioning compute infrastructure from Peloton/Mesos to Kubernetes while maintaining service continuity demonstrates the operational complexity of evolving foundational platform components. The job federation layer abstracting cluster details proved essential for managing this transition without disrupting hundreds of active ML projects.

The evolution from predictive to generative AI required extending rather than replacing the platform architecture, validating the modular design decisions made earlier. The Gen AI Gateway and LLMOps capabilities built on existing Michelangelo foundations for model registry, serving infrastructure, and training pipelines, demonstrating how well-designed ML platforms can adapt to paradigm shifts in machine learning techniques.
