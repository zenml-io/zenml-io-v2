---
title: "Ray on Kubernetes distributed multi-node multi-GPU XGBoost training for faster hyperparameter tuning with manual data sharding"
slug: "capital-one-distributed-model-training-with-ray-ray-on-kubernetes-distributed-multi-node-multi-gpu-xgboost-training-for"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "monitoring"
  - "pipeline-orchestration"
  - "dask"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "spark"
  - "data-prep"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "training"
industryTags: "tech"
company: "Capital One"
companySlug: "capital-one"
platformName: "Distributed Model Training with Ray"
contentType: "video"
summary: "Capital One's ML Compute Platform team built a distributed model training infrastructure using Ray on Kubernetes to address the challenges of managing multiple environments, tech stacks, and codebases across the ML development lifecycle. The solution enables data scientists to work with a single codebase that can scale horizontally across GPU resources without worrying about infrastructure details. By implementing multi-node, multi-GPU XGBoost training with Ray Tune on Kubernetes, they achieved a 3x reduction in average time per hyperparameter tuning trial, enabled larger hyperparameter search spaces, and eliminated the need for data downsampling and dimensionality reduction. The key technical breakthrough came from manually sharding data to avoid excessive network traffic between Ray worker pods, which proved far more efficient than Ray Data's automatic sharding approach in their multi-node setup."
link: "https://www.youtube.com/watch?v=hSmMDv3hvhI"
year: 2025
seo:
  title: "Capital One: Ray on Kubernetes distributed multi-node multi-GPU XGBoost training for faster hyperparameter tuning with manual data sharding - ZenML MLOps Database"
  description: "Capital One's ML Compute Platform team built a distributed model training infrastructure using Ray on Kubernetes to address the challenges of managing multiple environments, tech stacks, and codebases across the ML development lifecycle. The solution enables data scientists to work with a single codebase that can scale horizontally across GPU resources without worrying about infrastructure details. By implementing multi-node, multi-GPU XGBoost training with Ray Tune on Kubernetes, they achieved a 3x reduction in average time per hyperparameter tuning trial, enabled larger hyperparameter search spaces, and eliminated the need for data downsampling and dimensionality reduction. The key technical breakthrough came from manually sharding data to avoid excessive network traffic between Ray worker pods, which proved far more efficient than Ray Data's automatic sharding approach in their multi-node setup."
  canonical: "https://www.zenml.io/mlops-database/capital-one-distributed-model-training-with-ray-ray-on-kubernetes-distributed-multi-node-multi-gpu-xgboost-training-for"
  ogTitle: "Capital One: Ray on Kubernetes distributed multi-node multi-GPU XGBoost training for faster hyperparameter tuning with manual data sharding - ZenML MLOps Database"
  ogDescription: "Capital One's ML Compute Platform team built a distributed model training infrastructure using Ray on Kubernetes to address the challenges of managing multiple environments, tech stacks, and codebases across the ML development lifecycle. The solution enables data scientists to work with a single codebase that can scale horizontally across GPU resources without worrying about infrastructure details. By implementing multi-node, multi-GPU XGBoost training with Ray Tune on Kubernetes, they achieved a 3x reduction in average time per hyperparameter tuning trial, enabled larger hyperparameter search spaces, and eliminated the need for data downsampling and dimensionality reduction. The key technical breakthrough came from manually sharding data to avoid excessive network traffic between Ray worker pods, which proved far more efficient than Ray Data's automatic sharding approach in their multi-node setup."
mlops:
  source: "sqlite"
  entryId: 227
  sourceUrl: "https://www.youtube.com/watch?v=hSmMDv3hvhI"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.619244"
  lastUpdated: "2026-04-14T19:56:08.459800"
---

## Problem Context

Capital One faced significant MLOps challenges stemming from the traditional machine learning development lifecycle that required data scientists to navigate multiple environments with different tech stacks, regulations, and permissions. The pain points were substantial and multifaceted.

Data scientists had to manage separate environments for exploratory data analysis (EDA) and production model training, each requiring different tools and approaches. In the EDA environment, they worked with tools like Jupyter Lab, VS Code, NumPy, Apache Spark, and Dask to identify patterns and produce features. When transitioning to production model training, they needed additional tools including XGBoost, MLflow for pipeline repeatability, and PyTorch or TensorFlow depending on model type. This fragmentation resulted in data transaction overhead every time they developed or improved a model.

The infrastructure team operated in a reactive mode, with data scientists requesting support for new tools and frameworks without advance notice. This created friction and slowed innovation. Data scientists had to maintain awareness of which environment they were working in and develop different codebases targeting different environments, spending valuable time on infrastructure concerns rather than model development and performance optimization.

A critical technical challenge emerged around scaling strategies. The platform team constantly debated horizontal versus vertical scaling as data scientists submitted massive tasks without clear resource requirements. The economics were compelling - GPUs could triple the performance of CPUs but AWS GPU instances (like G4DN) cost less than twice the price of comparable CPU instances (M5), with the same processor count and memory but additional GPU acceleration. However, large GPU instances like A100s were scarce and expensive, requiring careful evaluation of whether the upfront cost delivered appropriate value.

## Architecture & Design

Capital One designed a distributed compute infrastructure centered on Ray running on Kubernetes, specifically leveraging the KubeRay operator to manage Ray clusters natively within their existing Kubernetes ecosystem. The architecture addresses both infrastructure management and scientific workflow needs.

The platform provides multiple client interfaces including IDE-as-a-service, SDKs, and APIs depending on the specific Kubernetes environment. From these Ray clients, users can create Ray clusters through the KubeRay operator, which works with the Kubernetes API server to provision Ray clusters consisting of Ray head pods and Ray worker pods. The tight integration with cloud providers through Kubernetes enables requesting different GPU types and compute resources for Ray workers and head pods. When these pods deploy to GPU-enabled worker nodes, all CUDA operations in Ray, PyTorch, and other frameworks are automatically enabled by default when the cluster comes up.

The workflow architecture for their primary use case involves an embedding research pipeline where, after generating training sequences and running pre-training inference, they test embedding efficacy for downstream predictive tasks. They incorporate embeddings as model input features into predictive models (specifically XGBoost) and evaluate the lift in predictive accuracy.

For hyperparameter optimization, they implemented a standard Ray Tune setup: data loads into a client process, a Ray Tuner is specified and receives the data, and a Ray Tune job launches. For each trial, they run k-fold cross validation (k=5), meaning each set of hyperparameters trains and evaluates an XGBoost model five times. Error metrics aggregate and report back to the tuner, which samples new hyperparameters to continue the search.

The single-node architecture initially spawned a local Ray cluster with head and worker processes all in the same pod, with each Ray worker having at most one GPU. A critical architectural feature was that all Ray workers had access to a shared object store in this single-node setup, making it inexpensive to load training data into memory in the client process and have each worker access it in a zero-copy fashion.

The multi-node Kubernetes architecture fundamentally changes the deployment model. The client sends a request to the KubeRay operator for a distributed Ray cluster. Once provisioned, the client connects via Ray and continues tuning operations normally. However, instead of processes within one pod, Ray head and workers are now individual pods distributed across the Kubernetes cluster. This enables drastically scaling resources available to each Ray worker - from one GPU in single-node to two, four, or eight GPUs per worker, plus significantly more memory and CPU cores.

Crucially, from Ray's perspective, each Ray worker pod is a worker node with its own object store memory, not a shared store. This architectural distinction proved essential for understanding data loading challenges.

## Technical Implementation

The infrastructure leverages several key technologies in a carefully integrated stack:

**Core Infrastructure**: Kubernetes serves as the foundation, chosen because it has become the de facto standard for distributed compute environments in the industry. Capital One had already built substantial in-house Kubernetes expertise to leverage. Kubernetes provides dynamic allocation and scaling of applications plus fine-grain compute resource management, capabilities developed over years.

**Ray and KubeRay**: Ray provides the universal framework for distributed computing tasks across AI and ML workstreams, with the promise that anything relating to Python can be distributed. KubeRay enables supporting distributed Ray workloads natively within Kubernetes, allowing the same Kubernetes environment to serve all purposes, autoscale Ray clusters during runtime, and leverage node autoscalers and other common Kubernetes ecosystem tools.

**ML Frameworks**: The implementation focused on XGBoost for predictive modeling, leveraging Ray's XGBoost Trainer class to perform multi-GPU XGBoost training within each Ray worker. This creates two levels of distribution: hyperparameter tuning trials distributed across workers running in parallel, and multi-GPU XGBoost training within each worker.

**Data Loading Approaches**: The team tested multiple data loading strategies, ultimately identifying manual sharding as superior to automatic sharding for their use case. The manual sharding implementation uses Ray's utility functions to determine at runtime how many GPUs are available and the rank/ID of each Ray actor running the train loop per worker function. Each distributed Ray actor reads a subset of files, loads the training set in parallel, and forms the dataset necessary for XGBoost training.

In contrast, the automatic sharding approach using Ray Data reads different chunks of data onto different Ray workers throughout the cluster. However, when each worker needs specific folds for cross-validation, it must collect data chunks from all other workers, creating fully connected network traffic patterns that proved highly inefficient.

**GPU Selection and Economics**: The platform supports dynamic GPU selection at runtime, sometimes using high-end A100 GPUs and other times exploring cheaper options like L4 GPUs. The specific example compared M5 instances (CPU) with G4DN instances featuring L4 GPUs, demonstrating that identical processor counts and memory configurations with added GPU capability cost less than double.

**Observability**: The team discovered that standard GPU utilization metrics were noisy and unintuitive. They adopted the "graphics engine active" metric instead, which measures the percentage of time within an interval (like one minute) that the GPU's graphics engine was active. This proved far more intuitive for understanding when tuning workloads were doing training versus other operations, making visible the individual XGBoost model fits during cross-validation.

## Scale & Performance

The performance improvements from migrating to multi-node, multi-GPU Ray on Kubernetes were substantial and directly addressed the scientific constraints that had limited research capabilities.

**Speed Improvements**: For apples-to-apples comparisons between single-node and multi-node setups, the team achieved a 3x reduction in average time per hyperparameter tuning trial. This translates directly to running three times as many trials in the same amount of time, unlocking the ability to search substantially larger hyperparameter spaces.

**Resource Scaling**: The benchmark configuration used eight concurrent trials (eight Ray workers), each with four GPUs. The multi-node setup allowed scaling from one GPU per worker in single-node configurations to two, four, or even eight GPUs per worker, with corresponding increases in memory and CPU cores.

**Memory Management**: Both the automatic and manual sharding approaches demonstrated very steady memory consumption throughout tuning jobs in the multi-node setup, contrasting sharply with the memory accumulation and frequent out-of-memory errors encountered when passing data through the tuner. This stability allowed the team to fine-tune Ray cluster resource specifications submitted to Kubernetes, provisioning leaner clusters that could be allocated more quickly.

**Network Traffic**: The performance divergence between data loading approaches was dramatic. Automatic sharding with Ray Data generated orders of magnitude more network traffic than manual sharding. This manifested as significant GPU idle time between cross-validation folds in the automatic sharding approach, despite similar actual XGBoost training times. The manual sharding approach performed direct reads from storage at each Ray actor, avoiding the network transmission overhead entirely.

**Dataset Scale**: For larger datasets that wouldn't fit into readily available GPUs like A10G or L40S, which previously required dimensionality reduction to fit in single-node setups, the multi-node approach enabled running full-scale data in under 15 minutes per hyperparameter tuning trial. This met their SLA requirements while eliminating the need for dimensionality reduction - particularly frustrating previously since the entire point of the experiments was measuring embedding lift in predictive models.

**Constraint Elimination**: The migration eliminated four major scientific constraints: the need to downsample training data, the requirement to reduce embedding dimensionality, limits on the number of trials due to slow training speed, and restrictions on hyperparameter search space size.

## Trade-offs & Lessons Learned

The Capital One team emphasized that this represents their ongoing journey, sharing learnings to help others adopting Ray at enterprise scale avoid similar challenges.

**Data Loading Strategy is Critical**: The most significant technical lesson involved understanding that data loading patterns suitable for single-node Ray become problematic in multi-node Kubernetes deployments. Passing data through the tuner (which effectively does a ray.put call) worked fine in single-node setups with a shared object store but caused serious issues in multi-node deployments. The data must serialize and transmit across the network to each Ray worker's object store, leading to both serialization issues (requiring pinned versions of protobuf and cloudpickle) and memory accumulation throughout tuning jobs.

**Avoid Network I/O Between Ray Workers**: Understanding when data will traverse the network versus staying local proved crucial for performance. Ray Data's automatic sharding, while convenient, created fully connected network patterns where every Ray worker needed to collect data from every other worker for cross-validation. Manual sharding, though more complex to implement, eliminated this overhead by having each Ray actor directly read from storage.

**Ray Data Introduces New Paradigms**: Ray Data incorporates schedulers and logic that differs substantially from familiar data processing tools like Pandas, Spark, or Dask. Simply transferring existing code patterns to Ray can create friction for data scientists and generate more infrastructure load than necessary. Organizations need to invest time understanding how Ray Data works rather than assuming familiar techniques will translate directly.

**Observability is Essential**: The team couldn't have navigated data loading decisions or understood their distributed workload behavior without proper observability. Standard GPU utilization metrics proved too noisy, requiring adoption of alternative metrics like "graphics engine active" from Nvidia's documentation and GitHub discussions.

**Kubernetes Foundation Enables Adoption**: For enterprises already running Kubernetes, Ray adoption becomes significantly more tractable. Everything else works the same way, and KubeRay integrates with existing Kubernetes patterns, autoscalers, and operational practices. Capital One's existing Kubernetes expertise provided substantial leverage.

**GPU Economics Favor Distribution**: The cost-performance trade-offs favored distributed GPU approaches over large single GPUs. While A100s are powerful, they're scarce and expensive. Distributing workloads across more readily available, less expensive GPU types (L4, L40S, A10G) with dynamic runtime selection provided better economics and availability.

**Single Codebase Vision Partially Achieved**: The platform successfully moved toward the goal of data scientists writing a single codebase that works across environments without worrying about infrastructure details. However, adopting Ray required some learning investment, particularly around data handling patterns that differ from traditional approaches.

**Reactive to Proactive Infrastructure**: By encapsulating requirements into one environment with Ray providing a universal framework, the infrastructure team moved away from reactive support for arbitrary tool requests toward a more proactive, standardized platform that still supports diverse workload needs.

The overall lesson emphasizes that while Ray on Kubernetes unlocked substantial scale and performance improvements for Capital One's ML workloads, success required careful attention to distributed systems concerns - particularly data movement patterns, observability, and understanding how Ray's abstractions behave in multi-node deployments versus single-node setups.
