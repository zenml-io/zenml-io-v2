---
title: "Migrating ML training from SageMaker to Ray on Kubernetes for faster iterations, terabyte-scale preprocessing, and lower costs"
slug: "coinbase-ml-training-evolution-from-sagemaker-to-ray-migrating-ml-training-from-sagemaker-to-ray-on-kubernetes-for-faste"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "ray"
  - "sagemaker"
  - "spark"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "retraining"
  - "serving"
  - "training"
industryTags: "tech"
company: "Coinbase"
companySlug: "coinbase"
platformName: "ML Training Evolution: From SageMaker to Ray"
contentType: "video"
summary: "Coinbase transformed their ML training infrastructure by migrating from AWS SageMaker to Ray, addressing critical challenges in iteration speed, scalability, and cost efficiency. The company's ML platform previously required up to two hours for a single code change iteration due to Docker image rebuilds for SageMaker, limited horizontal scaling capabilities for tabular data models, and expensive resource allocation with significant waste. By adopting Ray on Kubernetes with Ray Data for distributed preprocessing, they reduced iteration times from hours to seconds, scaled to process terabyte-level datasets with billions of rows using 70+ worker clusters, achieved 50x larger data processing capacity, and reduced instance costs by 20% while enabling resource sharing across jobs. The migration took three quarters and covered their entire ML training workload serving fraud detection, risk models, and recommendation systems."
link: "https://www.youtube.com/watch?v=LGP4pR2G40Q"
year: 2024
seo:
  title: "Coinbase: Migrating ML training from SageMaker to Ray on Kubernetes for faster iterations, terabyte-scale preprocessing, and lower costs - ZenML MLOps Database"
  description: "Coinbase transformed their ML training infrastructure by migrating from AWS SageMaker to Ray, addressing critical challenges in iteration speed, scalability, and cost efficiency. The company's ML platform previously required up to two hours for a single code change iteration due to Docker image rebuilds for SageMaker, limited horizontal scaling capabilities for tabular data models, and expensive resource allocation with significant waste. By adopting Ray on Kubernetes with Ray Data for distributed preprocessing, they reduced iteration times from hours to seconds, scaled to process terabyte-level datasets with billions of rows using 70+ worker clusters, achieved 50x larger data processing capacity, and reduced instance costs by 20% while enabling resource sharing across jobs. The migration took three quarters and covered their entire ML training workload serving fraud detection, risk models, and recommendation systems."
  canonical: "https://www.zenml.io/mlops-database/coinbase-ml-training-evolution-from-sagemaker-to-ray-migrating-ml-training-from-sagemaker-to-ray-on-kubernetes-for-faste"
  ogTitle: "Coinbase: Migrating ML training from SageMaker to Ray on Kubernetes for faster iterations, terabyte-scale preprocessing, and lower costs - ZenML MLOps Database"
  ogDescription: "Coinbase transformed their ML training infrastructure by migrating from AWS SageMaker to Ray, addressing critical challenges in iteration speed, scalability, and cost efficiency. The company's ML platform previously required up to two hours for a single code change iteration due to Docker image rebuilds for SageMaker, limited horizontal scaling capabilities for tabular data models, and expensive resource allocation with significant waste. By adopting Ray on Kubernetes with Ray Data for distributed preprocessing, they reduced iteration times from hours to seconds, scaled to process terabyte-level datasets with billions of rows using 70+ worker clusters, achieved 50x larger data processing capacity, and reduced instance costs by 20% while enabling resource sharing across jobs. The migration took three quarters and covered their entire ML training workload serving fraud detection, risk models, and recommendation systems."
mlops:
  source: "sqlite"
  entryId: 220
  sourceUrl: "https://www.youtube.com/watch?v=LGP4pR2G40Q"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.618923"
  lastUpdated: "2026-04-14T19:56:05.428863"
---

## Problem Context

Coinbase's ML platform faced several critical challenges that limited data scientist productivity and operational efficiency. The primary pain points centered around three areas: iteration velocity, scalability constraints, and resource inefficiency.

The iteration speed problem was severe. When using SageMaker-based infrastructure, a typical development cycle required machine learning engineers to create a pull request, build a complete Docker image, push it to Amazon ECR, and only then trigger a SageMaker training job. This process consumed up to two hours for a single code change, creating a frustrating development experience where engineers often chose to work on features rather than model improvements because the feedback loop was prohibitively slow. The root cause was SageMaker's requirement for pre-built Docker images that included everything: model artifacts, Python model code, functions, pip install lists, CUDA libraries, and Python versions. This meant that even minor logic changes required rebuilding and redistributing heavy container images.

Scalability presented another major constraint. Coinbase's ML workloads relied heavily on tree-based models for tabular data, but SageMaker training jobs operated on single instances, limiting vertical scaling to around half a terabyte of memory. Distributed training on SageMaker required using PySpark, which created a multi-step workflow: process data with PySpark, dump to S3, then pick up the data with PyTorch or other ML frameworks. This approach didn't support tree-based models and created operational complexity with intermediate storage requirements.

Cost efficiency was the third major concern. To handle larger datasets, the platform had been using P3.16xlarge instances with extensive GPU, CPU, and memory resources, but this created massive resource waste since many workloads only needed the memory capacity, not the computational resources. The inability to share resources across jobs and the need to spin up fresh instances for each training run further compounded inefficiencies.

## Architecture & Design

The redesigned platform architecture centered on Ray running on Kubernetes with several key components working together to address the original pain points.

The core infrastructure consists of long-running Ray clusters on Kubernetes rather than ephemeral instances. This architectural choice enabled caching via GCS (Global Control Store) and resource sharing across multiple jobs. The platform team maintains base Docker images with only essential components: Python version, CUDA libraries, and AWS CLI for S3 data movement. All model-specific code and dependencies are injected at runtime rather than baked into containers.

The data pipeline architecture underwent fundamental restructuring. Raw data originates from Snowflake or Databricks Spark processing, then flows into Ray through two primary mechanisms: S3 storage or Databricks data sharing protocol (an open-source database connector). Ray Data handles distributed preprocessing and last-mile transformations that previously occurred in single-instance SageMaker jobs. This preprocessing includes operations like one-hot encoding and feature transformations, all executed in a distributed manner across the Ray cluster using map_batch functions with vectorized pandas and numpy operations.

For model training, Coinbase rewrote their Easy Tensor package (originally built for recommendation systems) to support distributed execution on Ray. Training jobs execute as Ray tasks within worker nodes, with the flexibility to scale horizontally across dozens of workers. The platform supports both single-instance migrations (where existing code is wrapped in Ray remote decorators) and fully distributed rewrites that leverage Ray Data and Ray Train.

Model artifacts flow to MLflow, Coinbase's centralized model registry. MLflow serves as the control point for production deployment, requiring PR approval before any model can be served via Ray Serve. This architectural decision moved security controls from the training submission layer (where they previously gated PR-based Docker builds) to the deployment layer.

Hyperparameter optimization leverages Ray Tune's resource sharing capabilities. Unlike the previous architecture where each HPO trial read and preprocessed data independently, Ray Tune caches preprocessing results and shares them across trials, dramatically reducing redundant computation.

## Technical Implementation

The migration decomposed monolithic Docker images into modular components published to an internal PyPI repository. The base Ray cluster Docker images contain only Python, CUDA, and essential AWS tooling. Machine learning engineers package their model code as wheel files or zip archives that get uploaded at job submission time.

Job submission uses a YAML configuration file similar to Ray's native format but extended with custom fields. The configuration includes a `py_module_part` section where engineers specify either local wheel files (built from their development branch) or remote packages already checked into the master branch. An internal CLI wrapper processes these configurations and submits jobs to the Ray cluster.

The platform runs on Amazon EKS (Elastic Kubernetes Service) with an internal infrastructure layer that the company built on top. This layer includes DataDog agents for monitoring all EKS clusters. For autoscaling, since direct Kubernetes autoscaler access was restricted, the team implemented a workaround using DataDog metrics—specifically logical CPU and GPU utilization metrics from Ray—to drive HPA (Horizontal Pod Autoscaler) scaling decisions. The system includes job supervisor logic that prevents scaling down worker nodes while jobs are still running, protecting in-memory state.

For data connectivity, the team contributed to Ray open source by implementing `read_databricks_table` functionality using the data sharing protocol. This API accepts a Databricks profile and row count, then efficiently reads data by temporarily staging it in S3 and distributing reads across Ray workers. This capability became available in Ray 2.33 and enabled reading 200+ gigabytes in approximately 2 minutes, bypassing Databricks API limitations that capped data transfers at 100 gigabytes.

The platform provides multiple cluster configurations with different CPU-to-GPU ratios to match workload characteristics. CPU-intensive jobs can use clusters with higher CPU allocation, while GPU-heavy workloads get appropriate GPU resources. Clusters scale from baseline configurations to over 70 workers depending on demand.

Monitoring and observability includes job status notifications sent via email or Slack when training jobs change state, enabling fast iteration and debugging. The team uses MLflow for experiment tracking and model versioning, capturing all training runs regardless of whether they're exploratory experiments or scheduled production retraining jobs. Airflow orchestrates scheduled retraining workflows.

## Scale & Performance

The performance improvements were substantial across multiple dimensions. Iteration time dropped from two hours to seconds or minutes depending on whether code changes affected shared packages. For changes to main model logic only, results appear in approximately 5 seconds. When shared code changes require rebuilding wheel files, the cycle takes 2-5 minutes—still a 95%+ improvement over the previous workflow.

Data processing capabilities expanded dramatically. The platform now handles terabyte-scale tabular datasets with billions of rows, representing a 50x increase over the previous maximum dataset size. Last-mile data transformations that previously took 120 minutes now complete in 15 minutes thanks to Ray Data's distributed processing. Individual clusters scale to more than 70 workers for large jobs.

The data sharing integration with Databricks reads 200+ gigabytes in approximately 2 minutes, working around the 100-gigabyte API limitation through efficient S3-backed distributed reads.

Resource utilization and cost metrics showed significant improvement. Instance types shifted from expensive P3.16xlarge instances (with extensive GPU, CPU, and memory that went largely unused) to more appropriately sized G5.xlarge instances with single GPUs. This rightsizing, combined with resource sharing across jobs enabled by the long-running cluster architecture, reduced instance costs by 20%.

Model training volume increased substantially. According to MLflow tracking data, the number of training runs increased significantly after introducing Ray-based hyperparameter optimization. The capability to run HPO efficiently—something that was technically possible but prohibitively expensive with SageMaker—unlocked new experimentation workflows.

The platform serves approximately 10-15 ML engineers working on traditional ML models, covering use cases including login account takeover detection, fraud prevention, withdrawal risk assessment, wallet risk evaluation, notification optimization, asset recommendations, and chatbot/customer service applications powered by CBGPT (Coinbase's GPT-based tooling).

## Trade-offs & Lessons

The migration succeeded but required navigating several significant challenges and making conscious trade-offs.

**Ownership boundary redesign** was essential but complex. The previous model mixed ML platform and ML engineer responsibilities, with the platform team maintaining everything in the Docker image. The new model clearly separates concerns: the ML platform team maintains Ray clusters, base Docker images, and infrastructure, while ML engineers own their custom code, package dependencies, and version compatibility. This shifted responsibility for dependency management to the engineers who best understand their model requirements, but also required education and adjustment periods.

**Data transformation rewrites** consumed substantial engineering effort. Coinbase had hundreds of last-mile transformation functions that weren't implemented uniformly. The platform team rewrote most of them to work efficiently with Ray Data's map_batch operations using vectorized pandas and numpy code. This was labor-intensive but necessary for achieving the performance gains. The lesson here is that migrating to distributed data processing requires more than just changing infrastructure—it requires rethinking data transformation patterns.

**The Databricks bottleneck** illustrated the importance of integration points in distributed systems. When the team discovered they couldn't pass more than 100 gigabytes through the Databricks API despite needing terabyte-scale transfers, they had to build custom integration via data sharing. This contribution back to the Ray open source project became a forcing function for better architecture, eliminating the pattern of writing data to S3, processing, and potentially forgetting to clean up, which created storage waste.

**Testing and observability gaps** remain areas for improvement. Currently, testing happens at the job level rather than at the task and actor level. ML engineers who want to debug specific actors must wait for entire data preprocessing pipelines to complete, which can take 20+ minutes. The team identified this as a priority for future work.

**Migration strategy** proved critical to success. By supporting two migration paths—a simple wrapper approach using `ray.remote` for minimal changes, and a full rewrite for horizontal scaling—the team enabled teams to migrate at their own pace. Single-instance jobs migrated quickly, while teams needing distribution invested in more substantial rewrites. This pragmatic approach completed the full migration in three quarters.

**Autoscaling complexity** required creative solutions. The inability to directly access EKS autoscaling due to an internal infrastructure abstraction layer forced the team to build a custom solution using DataDog metrics and logical CPU/GPU utilization. This added complexity but also provided more fine-grained control over scaling behavior, particularly the critical job supervisor logic that prevents premature scale-down.

**Security and compliance** controls shifted from the training submission layer to the deployment layer. While this enabled faster iteration, it required establishing clear processes around MLflow as the deployment gate, ensuring that only approved models with proper PR review could reach production serving via Ray Serve.

The platform team benefited significantly from Ray community support, specifically acknowledging contributions from Richard Liaw, Clark Zinzow, Kai Zhang, Jiajun Yao, and Justin Yu who provided extensive guidance during the migration.

Looking forward, Coinbase plans to expand Ray's role with LLM fine-tuning support, improved CPU/GPU efficiency monitoring with guidance for ML engineers on fractional resource requests (e.g., 0.1 CPU instead of 1), further cluster scaling capabilities, and enhanced task/actor-level testing to reduce debugging iteration time.
