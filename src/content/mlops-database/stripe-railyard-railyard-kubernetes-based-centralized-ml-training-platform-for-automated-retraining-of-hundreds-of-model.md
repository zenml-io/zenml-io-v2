---
title: "Railyard: Kubernetes-based centralized ML training platform for automated retraining of hundreds of models daily"
slug: "stripe-railyard-railyard-kubernetes-based-centralized-ml-training-platform-for-automated-retraining-of-hundreds-of-model"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "pipeline-orchestration"
  - "airflow"
  - "dask"
  - "docker"
  - "kubernetes"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "training"
industryTags: "finance"
company: "Stripe"
companySlug: "stripe"
platformName: "Railyard"
contentType: "blog"
summary: "Stripe built Railyard, a centralized machine learning training platform powered by Kubernetes, to address the challenge of scaling from ad-hoc model training on shared EC2 instances to automatically training hundreds of models daily across multiple teams. The system provides a JSON API and job manager that abstracts infrastructure complexity, allowing data scientists to focus on model development rather than operations. After 18 months in production, Railyard has trained nearly 100,000 models across diverse use cases including fraud detection, billing optimization, time series forecasting, and deep learning, with models automatically retraining on daily cadences using the platform's flexible Python workflow interface and multi-instance-type Kubernetes cluster."
link: "https://stripe.com/blog/railyard-training-models"
year: 2019
seo:
  title: "Stripe: Railyard: Kubernetes-based centralized ML training platform for automated retraining of hundreds of models daily - ZenML MLOps Database"
  description: "Stripe built Railyard, a centralized machine learning training platform powered by Kubernetes, to address the challenge of scaling from ad-hoc model training on shared EC2 instances to automatically training hundreds of models daily across multiple teams. The system provides a JSON API and job manager that abstracts infrastructure complexity, allowing data scientists to focus on model development rather than operations. After 18 months in production, Railyard has trained nearly 100,000 models across diverse use cases including fraud detection, billing optimization, time series forecasting, and deep learning, with models automatically retraining on daily cadences using the platform's flexible Python workflow interface and multi-instance-type Kubernetes cluster."
  canonical: "https://www.zenml.io/mlops-database/stripe-railyard-railyard-kubernetes-based-centralized-ml-training-platform-for-automated-retraining-of-hundreds-of-model"
  ogTitle: "Stripe: Railyard: Kubernetes-based centralized ML training platform for automated retraining of hundreds of models daily - ZenML MLOps Database"
  ogDescription: "Stripe built Railyard, a centralized machine learning training platform powered by Kubernetes, to address the challenge of scaling from ad-hoc model training on shared EC2 instances to automatically training hundreds of models daily across multiple teams. The system provides a JSON API and job manager that abstracts infrastructure complexity, allowing data scientists to focus on model development rather than operations. After 18 months in production, Railyard has trained nearly 100,000 models across diverse use cases including fraud detection, billing optimization, time series forecasting, and deep learning, with models automatically retraining on daily cadences using the platform's flexible Python workflow interface and multi-instance-type Kubernetes cluster."
mlops:
  source: "sqlite"
  entryId: 80
  sourceUrl: "https://stripe.com/blog/railyard-training-models"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061177"
  lastUpdated: "2026-04-14T19:54:58.794596"
---

## Problem Context

Stripe's machine learning infrastructure serves millions of businesses worldwide, scoring hundreds of millions of predictions across many models powered by billions of data points. As the company scaled, several critical challenges emerged around model training infrastructure. In the early days, engineers and data scientists would SSH into EC2 instances and manually launch Python processes to train models. While this approach worked initially, it created significant pain points as the organization grew.

The core challenges facing Stripe's Machine Learning Infrastructure team included scaling from ad-hoc Python processes on shared EC2 instances to automatically training hundreds of models per day, building an interface generic enough to support multiple training libraries and frameworks while remaining expressive, determining what metrics and metadata to track for each model run, deciding where training jobs should be executed, and scaling different compute resource needs (CPU, GPU, memory) for different model types. Machine learning at Stripe powers critical systems like Radar for fraud blocking and Billing for retry optimization, making reliable training infrastructure essential for business operations.

The fundamental design goal was enabling data scientists to think less about how their machine learning jobs run on infrastructure and instead focus on their core inquiry. Teams needed stable and fast ML pipelines to continuously update and train new models in response to a rapidly changing world, without requiring each team to operate their own infrastructure. This motivated the development of Railyard, a centralized API and job manager for training models in a scalable and maintainable way.

## Architecture & Design

Railyard's architecture consists of several integrated components working together to provide a complete model training platform. At its core, Railyard is a Scala service that provides a JSON API and manages job history, state, and provenance in a Postgres database. The service coordinates with a Kubernetes cluster to execute training jobs, and the cluster provides multiple instance types with different compute resources to match workload requirements.

The data flow begins when Railyard receives an API request specifying everything needed to train a model, including data sources, feature names, labels, filters, and model parameters. The system then executes the matching training job with logs streamed to S3 for inspection. A given job runs through multiple steps: fetching training and holdout data, training the model, and serializing the trained model and evaluation data to S3. Training results are persisted in Postgres and exposed back through the Railyard API.

Python code for model training is packaged using Subpar, a Google library that creates standalone executables including all dependencies in one package. This executable is bundled into a Docker container, deployed to AWS Elastic Container Registry, and executed as a Kubernetes job. The use of Subpar with Bazel's build system allows Stripe to reliably package Python requirements and source code into a single .par file for execution, leveraging Bazel's speed, correctness, and flexibility in their multi-language environment.

The Kubernetes cluster itself provides the foundation for scaling and resource management. Railyard exerts fine-grained control over how Kubernetes distributes jobs across the cluster through tolerations and affinities. For each request, the system examines the requested compute resource and sets both a Kubernetes Toleration and Affinity to specify the node type. This effectively tells the cluster which nodes jobs should run on (affinity) and which nodes should be reserved for specific tasks (toleration). The Kubernetes resource scheduler then intelligently distributes jobs to nodes based on these parameters and per-job CPU and memory requirements.

The architecture supports mixed workloads across different instance types. Most jobs default to high-CPU instances, data-intensive jobs run on high-memory instances, and specialized training jobs like deep learning run on GPU instances. For high-memory or GPU training jobs, resource limits are set so each job gets an entire node to itself, with jobs queued if all nodes are occupied. Jobs with less intensive requirements are scheduled to run in parallel on shared nodes.

## Technical Implementation

The Railyard API was designed after extensive iteration with internal customers to understand diverse use cases. The team explored two extremes on the design spectrum: a custom DSL encoding scikit-learn components directly in the API, and allowing users to write their own Python classes with defined input/output interfaces. They ultimately converged on a middle ground where the API exposes fields for changing data sources, filters, feature names, labels, and training parameters, while core training logic lives entirely in Python.

The JSON API includes several key sections. The data section specifies features with their source (S3, SQL), paths to Parquet files, date columns, and filters using predicates like GtEq, LtEq, Gt, and IsIn to narrow datasets. Holdout sampling can be configured with functions like DATE_RANGE to split holdout data into separate datasets. The train section specifies the Python workflow name, classifier features, labels, and custom parameters for hyperparameters. A top-level compute_resource field allows specifying CPU, GPU, or memory-optimized instances.

The Python workflow interface provides framework-agnostic extensibility. All workflows inherit from StripeMLWorkflow class and implement a train method that receives training and holdout dataframes. The interface supports extensive customization including preprocessing data before the train function, defining custom data fetching implementations, specifying how training/holdout data should be scored, and running arbitrary Python code. Some deep learning models use custom data fetching code to stream batches of training data during training.

Stripe initially supported only scikit-learn but has since added XGBoost, PyTorch, and FastText support. The framework-agnostic design presents an API contract where Railyard passes data in, users pass trained models back out, and Railyard handles scoring and serialization. This design proved crucial as the ML landscape changes rapidly and the team needed to avoid picking winners or constraining users to specific libraries.

The containerization approach bundles Python executables with Subpar into Docker images. A Bazel par_binary definition specifies an entrypoint, sources, data, and dependencies. The resulting .par file is packaged into a Dockerfile along with third-party dependencies like the CUDA runtime for GPU support. After building, images are deployed to AWS Elastic Container Registry for the Kubernetes cluster to fetch and run.

Integration with broader data infrastructure happens through multiple mechanisms. Teams can call the Railyard API from any service, scheduler, or task runner. The platform is used with Airflow task definitions as part of larger graphs of data jobs, enabling automated retraining cycles. Radar's fraud model, built on hundreds of distinct ML models, has a dedicated service that trains and deploys all models on a daily cadence using Railyard.

## Scale & Performance

After 18 months in production, Railyard has demonstrated significant scale. The platform has trained nearly 100,000 models on Kubernetes, with hundreds of new models being trained each day. The system serves multiple teams across Stripe who have converged on it as their common training environment after training tens of thousands of models on this architecture.

The infrastructure scores hundreds of millions of predictions across many machine learning models, with these models powered by billions of data points. Some fraud models automatically retrain on regular basis, and Stripe is steadily moving more models onto automated retraining cycles. The diversity of workloads is substantial: in any given day the platform might train thousands of time series forecasts, long-running word embedding models, or fraud models working with hundreds of gigabytes of data.

The Kubernetes cluster's flexibility enables rapid scaling both up and out. The team can easily scale cluster volume when needing to train more models or quickly add new instance types when requiring additional compute resources. When memory requirements of running jobs outgrew CPU-optimized instance types, they started training on memory-optimized instances the next day. When observing backlogs of jobs, they can immediately expand the cluster to process the queue.

Resource management happens through per-job CPU and memory requirements that ensure workloads don't experience resource starvation due to neighboring jobs. Memory-intensive workflows remain challenging even with various instance sizes and managed cluster capabilities, as some jobs still run out of memory and are killed. This is a trade-off of providing flexibility in Python workflows where modelers are free to write memory-intensive code.

The operational metrics tracked provide visibility across the training infrastructure. The team stores high-level success and failure metrics that can be examined by team, project, or individual machine performing training. Fine-grained metrics for each training step include data loading, model training, model serialization, and evaluation data persistence. This comprehensive metrics approach has shifted the team from reactive ("My model didn't train, can you help?") to proactive ("Hey, I notice your model didn't train, here's what happened") support.

## Trade-offs & Lessons

The Railyard team identified several critical insights after a year and a half of production operation. Building a generic API not tied to any single machine learning framework proved essential. Teams extended Railyard in unanticipated ways, moving beyond the initial focus on classifiers to applications like time series forecasting and word2vec style embeddings. The decision to avoid a DSL-based approach and instead provide flexibility through custom_params and Python workflows was validated by user adoption patterns.

The fully managed Kubernetes cluster reduced operational burden significantly across the organization. By interacting directly with the Kubernetes API while having the cluster operated entirely by another team, the ML Infrastructure team could leverage domain knowledge to keep the cluster reliable while focusing on ML-specific concerns. This arrangement proved to be a force multiplier, as managing and operating the cluster themselves would have required more engineers and taken significantly longer to ship.

On API design, providing a free-form custom_params field accepting any valid JSON proved very important. The team learned they cannot anticipate every parameter ML engineers or data scientists need for all model types, so validation on most of the API request while allowing flexibility in hyperparameters struck the right balance. Not providing a DSL was validated as the right choice, as users typically only need to change dates, data sources, or hyperparameters when retraining, and no requests came for more DSL-like features.

The interface design philosophy emphasized that users should not need to think about model serialization or persistence. Reducing cognitive burden gives data scientists and ML engineers more time for creativity and focus on modeling and feature engineering rather than operational concerns. Teams start adopting Railyard with just an API specification and a workflow defining a train method, with extensive customization available but not required.

Memory-intensive workflows remain a challenging problem. Even with various instance sizes and managed clusters, jobs sometimes run out of memory and are killed. This is a downside to providing flexibility in Python workflows, as modelers can write memory-intensive code. Kubernetes allows proactive killing of jobs consuming too many resources, but this results in failed training jobs. The team is exploring solutions including smart retry behavior to automatically reschedule failed jobs on higher-capacity instances and moving to distributed libraries like dask-ml.

The choice of Subpar for packaging Python code proved excellent. Managing Python dependencies is tricky when bundling them as executables for shipment to different instances. Subpar's compatibility with Bazel and over a year of reliable production operation validated this choice, though the team noted they might consider Facebook's XARs if building from scratch again.

Centrally tracking model state and ownership fundamentally changed how the team operates. Moving from asking "Did you save the output of your job anywhere so we can look at?" to "What's your job ID? We'll figure the rest out" improved debugging and observability. Observing aggregate metrics and tracking overall performance of training jobs across the cluster enables proactive support rather than reactive troubleshooting.

The instance flexibility provided by Kubernetes proved crucial for supporting diverse workloads. The ability to quickly add new instance types and expand the cluster are equally important for scalability. Teams have very different machine learning workloads requiring different resources, from thousands of time series forecasts to long-running word embeddings to fraud models with hundreds of gigabytes of data.

Building an API for model training enabled using it everywhere in the organization. Teams call the API from any service, scheduler, or task runner. Integration with Airflow for automated retraining cycles demonstrates how a well-designed API becomes infrastructure that other systems can build upon, creating compound value across the ML ecosystem.
