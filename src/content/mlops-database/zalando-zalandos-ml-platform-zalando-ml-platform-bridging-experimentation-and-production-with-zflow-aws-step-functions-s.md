---
title: "Zalando ML platform bridging experimentation and production with zflow, AWS Step Functions, SageMaker, and model governance portal"
slug: "zalando-zalandos-ml-platform-zalando-ml-platform-bridging-experimentation-and-production-with-zflow-aws-step-functions-s"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "notebooks"
  - "pipeline-orchestration"
  - "databricks"
  - "docker"
  - "mlflow"
  - "sagemaker"
  - "spark"
  - "terraform"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "hyperparameter-tuning"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Zalando"
companySlug: "zalando"
platformName: "Zalando's ML platform"
contentType: "blog"
summary: "Zalando built a comprehensive machine learning platform to serve 46 million customers with recommender systems, size recommendations, and demand forecasting across their fashion e-commerce business. The platform addresses the challenge of bridging experimentation and production by providing hosted JupyterHub (Datalab) for exploration, Databricks for large-scale Spark processing, GPU-equipped HPC clusters for intensive workloads, and a custom Python DSL called zflow that generates AWS Step Functions workflows orchestrating SageMaker training, batch inference, and real-time endpoints. This infrastructure is complemented by a Backstage-based ML portal for pipeline tracking and model cards, supported by distributed teams across over a hundred product groups with central platform teams providing tooling, consulting, and best practices dissemination."
link: "https://engineering.zalando.com/posts/2022/04/zalando-machine-learning-platform.html"
year: 2022
seo:
  title: "Zalando: Zalando ML platform bridging experimentation and production with zflow, AWS Step Functions, SageMaker, and model governance portal - ZenML MLOps Database"
  description: "Zalando built a comprehensive machine learning platform to serve 46 million customers with recommender systems, size recommendations, and demand forecasting across their fashion e-commerce business. The platform addresses the challenge of bridging experimentation and production by providing hosted JupyterHub (Datalab) for exploration, Databricks for large-scale Spark processing, GPU-equipped HPC clusters for intensive workloads, and a custom Python DSL called zflow that generates AWS Step Functions workflows orchestrating SageMaker training, batch inference, and real-time endpoints. This infrastructure is complemented by a Backstage-based ML portal for pipeline tracking and model cards, supported by distributed teams across over a hundred product groups with central platform teams providing tooling, consulting, and best practices dissemination."
  canonical: "https://www.zenml.io/mlops-database/zalando-zalandos-ml-platform-zalando-ml-platform-bridging-experimentation-and-production-with-zflow-aws-step-functions-s"
  ogTitle: "Zalando: Zalando ML platform bridging experimentation and production with zflow, AWS Step Functions, SageMaker, and model governance portal - ZenML MLOps Database"
  ogDescription: "Zalando built a comprehensive machine learning platform to serve 46 million customers with recommender systems, size recommendations, and demand forecasting across their fashion e-commerce business. The platform addresses the challenge of bridging experimentation and production by providing hosted JupyterHub (Datalab) for exploration, Databricks for large-scale Spark processing, GPU-equipped HPC clusters for intensive workloads, and a custom Python DSL called zflow that generates AWS Step Functions workflows orchestrating SageMaker training, batch inference, and real-time endpoints. This infrastructure is complemented by a Backstage-based ML portal for pipeline tracking and model cards, supported by distributed teams across over a hundred product groups with central platform teams providing tooling, consulting, and best practices dissemination."
mlops:
  source: "sqlite"
  entryId: 76
  sourceUrl: "https://engineering.zalando.com/posts/2022/04/zalando-machine-learning-platform.html"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061136"
  lastUpdated: "2026-04-14T19:54:57.073747"
---

## Problem Context

Zalando operates at massive scale, serving 46 million customers across their fashion e-commerce platform. Machine learning is fundamental to their business operations, powering recommender systems that help customers find clothing items, size recommendation algorithms to reduce returns, and demand forecasting systems to maintain inventory during high-traffic periods like Black Friday. As the business grew and ML use cases proliferated, Zalando faced the classic MLOps challenge of scaling experimentation and production deployment across a large organization.

The central problem articulated in the case study is the frequently discussed gap between experimentation and production, colloquially described as moving from notebook to production pipeline. Jupyter notebooks excel at creative exploration and rapid prototyping but fail to meet production requirements including secure access to large datasets, reproducibility, high performance, scalability, comprehensive documentation, and observability through logging, monitoring, and debugging. Beyond technical requirements, Zalando needed to enforce software engineering best practices such as version control in git, code quality standards, and multi-person code review processes.

The organizational dimension added complexity. With ML expertise distributed across over a hundred product teams working in specific business domains, Zalando needed infrastructure that could be operated by applied scientists and software engineers without deep DevOps expertise, while still providing the flexibility to integrate diverse data sources and computational resources. The platform needed to abstract away infrastructure complexity while remaining extensible for company-specific needs.

## Architecture & Design

Zalando's ML platform architecture is organized around distinct phases of the machine learning lifecycle, with purpose-built tooling for experimentation, pipeline orchestration, and production deployment.

### Experimentation Layer

The experimentation layer provides three primary environments for different computational needs. Datalab, Zalando's internal name for their hosted JupyterHub installation, serves as the primary environment for interactive exploration. Accessible via web browser, it provides pre-configured access to multiple data sources including S3, BigQuery, and MicroStrategy, along with web-based shell access and common data science libraries. The key architectural decision here was to centralize authentication and data source configuration so practitioners can begin experimenting in under a minute without laptop setup.

For big data workloads that exceed Datalab's capabilities, Zalando provides access to Databricks, leveraging Apache Spark for distributed data processing. Databricks serves dual purposes, supporting both interactive experimentation through notebooks and production-scale data processing jobs on Spark clusters. This represents an architectural choice to use a well-known third-party platform rather than building custom Spark orchestration.

For computationally intensive workloads, particularly computer vision and large model training, applied scientists access a high-performance computing cluster equipped with powerful GPU nodes via SSH. This provides the raw computational power needed for deep learning workloads while maintaining a simple access pattern.

### Pipeline Orchestration Layer

The production pipeline architecture centers on AWS Step Functions as the orchestration engine, a decision made in early 2019. Step Functions workflows are state machines that coordinate calls to various AWS services including Lambda, S3, and Amazon SageMaker, as well as external services like Databricks. This enables pipelines to handle the full ML lifecycle from data processing through training, batch inference, and real-time endpoint deployment.

The core architectural insight was to treat pipelines as infrastructure-as-code using AWS CloudFormation templates. CloudFormation allows developers to specify all required AWS resources in text files (JSON or YAML), which are then deployed to create Lambda functions, security policies, Step Functions workflows, and other resources. This approach provides reproducibility and version control but introduced a usability challenge.

To address CloudFormation's verbosity and difficulty of manual editing, Zalando created zflow, a Python-based domain-specific language for building ML pipelines. zflow provides a higher-level abstraction where pipelines are Python objects with stages attached. The tool offers custom functions for ML-specific tasks like training jobs, batch transforms, and hyperparameter tuning, along with flow control for conditional and parallel execution. Critically, zflow code uses Python type hints, enabling early error detection beyond simple syntax validation.

The data flow follows this pattern: a pipeline script written in zflow DSL generates a CloudFormation template via AWS CDK when executed. The template is committed to git, then Zalando's Continuous Delivery Platform (CDP) deploys it to AWS CloudFormation, which provisions all specified resources including the Step Functions state machine. The pipeline can then be triggered via scheduler, manual console execution, or programmatic API calls.

### Observability and Monitoring Layer

A custom web portal built on Backstage, an open-source platform for developer portals, provides unified visibility into pipeline execution. The ML portal tracks pipeline runs in real-time, visualizes how metrics evolve across multiple training runs, and displays model cards for models created by pipelines. This observability layer is integrated into Zalando's broader developer portal, creating a single pane of glass for ML practitioners to monitor their production systems.

## Technical Implementation

The technical stack is heavily AWS-centric with selective integration of best-of-breed third-party tools. AWS Step Functions serves as the workflow orchestration engine, coordinating calls to Amazon SageMaker for model training and inference workloads. SageMaker handles both batch processing jobs and real-time inference through managed endpoints. Data processing leverages Databricks jobs, accessing Spark clusters for distributed computation.

The zflow tool represents significant custom engineering investment. Written in Python, it functions as a compiler that transforms high-level pipeline descriptions into CloudFormation templates. Under the hood, zflow uses AWS CDK (Cloud Development Kit) to generate these templates. The architecture of zflow itself uses a builder pattern, as evidenced by the code example showing PipelineBuilder and StackBuilder objects. Stages are added to pipelines using a fluent interface with method chaining, and pipelines are grouped into stacks representing collections of CloudFormation resources.

A representative zflow pipeline begins by defining stages using functions like databricks_job for data processing, training_job for model training, and batch_transform_job for batch inference. These stages are added to a PipelineBuilder in the desired execution order. The pipeline is then added to a StackBuilder, and calling stack.generate outputs the CloudFormation template file. This declarative approach with type hints provides compile-time validation that catches errors before deployment.

The deployment pipeline follows standard GitOps practices. Generated CloudFormation templates are committed to git repositories, triggering Zalando's Continuous Delivery Platform to deploy changes to AWS. This creates an audit trail and enables rollback capabilities while enforcing code review requirements.

Data access patterns are unified through pre-configuration in Datalab and Databricks. Multiple data sources including S3 object storage, BigQuery data warehouse, and MicroStrategy business intelligence platform are accessible without manual client configuration. This suggests centralized IAM role management and credential injection, though specific authentication mechanisms are not detailed in the source.

The Backstage-based portal represents another custom integration, extending the open-source platform with ML-specific functionality. Real-time pipeline execution monitoring, metric visualization across runs, and model card display are custom features developed on top of Backstage's plugin architecture.

## Scale & Performance

While the case study is notably sparse on specific performance metrics, it provides several scale indicators. Zalando serves 46 million customers, suggesting the platform handles recommendation and inference workloads at massive scale. The article mentions that zflow has been used to create "hundreds of pipelines" since its creation around 2019, indicating substantial adoption across the organization.

The organizational scale is more clearly articulated. ML expertise is distributed across over a hundred product teams, each with dedicated software engineers and applied scientists. This suggests the platform supports potentially hundreds of ML practitioners working on diverse use cases from recommender systems to demand forecasting to size recommendations.

The architecture supports workloads ranging from interactive notebook exploration in Datalab to large-scale Spark jobs in Databricks to GPU-intensive deep learning training on the HPC cluster. This range indicates the platform must handle workloads spanning several orders of magnitude in computational requirements and data volumes.

Real-time inference is explicitly mentioned through SageMaker endpoints, though specific latency targets or throughput numbers are not provided. Batch processing is also supported through batch transform jobs, suggesting a mix of latency-sensitive and throughput-oriented workloads.

The platform's maturity is indicated by its evolution over several years. The Step Functions decision was made in early 2019, and zflow has seen production use for at least three years by the time of the 2022 publication. This suggests the architecture has proven robust enough to avoid major overhauls while remaining extensible through incremental improvements.

## Trade-offs & Lessons

The AWS-centric architecture represents a clear strategic trade-off. By standardizing on AWS services, Zalando gains tight integration between Step Functions, SageMaker, Lambda, and other services while accepting vendor lock-in. This decision was explicitly driven by Zalando already using AWS as its main cloud provider, making integration easier than building cloud-agnostic abstractions. The flexibility provided by AWS service integrations outweighed portability concerns for their use case.

The creation of zflow demonstrates a classic build-versus-buy decision. Rather than adopting existing workflow orchestration tools like Airflow, Kubeflow Pipelines, or Metaflow, Zalando built a custom DSL. This provided several advantages: tight integration with AWS services, ability to incorporate company-specific requirements quickly, and abstraction tailored to their ML practitioners' needs. The downside is ongoing maintenance burden and the need for internal documentation and training. The article suggests this trade-off was worthwhile, noting that zflow "takes full advantage of AWS" while allowing quick response to specific needs.

The type-hinted Python DSL approach offers stronger guarantees than raw YAML or JSON configuration. By catching errors at script execution time rather than deployment or runtime, zflow reduces the iteration cycle for pipeline development. This represents a lesson about the value of programmatic pipeline definition over purely declarative approaches, though it requires ML practitioners to be comfortable with Python coding.

The organizational structure reveals important lessons about MLOps at scale. Rather than centralizing all ML development in a single platform team, Zalando distributed expertise across product teams while providing central teams for tool development, consulting, and infrastructure operations. This hybrid model allows domain-specific customization while sharing tooling and best practices. The separate ML consulting team offering trainings, architectural advice, and pair programming addresses the reality that not all practitioners have equal MLOps expertise.

The multi-environment approach to experimentation acknowledges that no single tool fits all use cases. JupyterHub suffices for exploratory analysis, Databricks handles big data processing, and the HPC cluster tackles GPU-intensive workloads. This heterogeneity introduces operational complexity but matches tool capabilities to workload requirements. A lesson here is that attempting to force all workloads into a single environment often creates more problems than it solves.

The Backstage-based portal demonstrates the value of building on extensible open-source platforms rather than creating custom UIs from scratch. By extending Backstage with ML-specific plugins, Zalando gets a professional developer portal framework while customizing for their specific needs. This represents a balanced approach between buying off-the-shelf solutions and building everything internally.

The emphasis on software engineering practices like git-based workflows, code review by at least two people, and infrastructure-as-code suggests a mature perspective on ML operationalization. Treating ML pipelines as software rather than scripts or notebooks is essential for production reliability, though it imposes more overhead on practitioners during initial development.

One implicit lesson is the importance of reducing time to experimentation. The emphasis on Datalab being "ready to start experimenting in less than a minute" through pre-configured data access highlights that practitioner productivity depends heavily on removing friction from common workflows. Infrastructure setup time is pure waste from an experimentation perspective.

The case study acknowledges ongoing challenges, mentioning that teams continue tackling "difficult problems in the space of machine learning and MLOps, such as reducing the time needed to validate and implement new ideas at scale and improving model observability." This honest assessment suggests that despite building substantial platform capabilities, MLOps remains an active area of investment rather than a solved problem. Specifically, the gap between experimentation and production, while addressed by zflow and the pipeline architecture, still requires ongoing attention.

The annual internal conference, reading groups, and expert talks indicate investment in community building and knowledge sharing. This organizational structure lesson suggests that technology alone is insufficient—cultivating practitioner communities accelerates adoption and surfaces best practices that can be codified into tooling improvements.

Overall, Zalando's platform represents a pragmatic, evolution-over-revolution approach to MLOps. By building on AWS foundations, creating targeted abstractions where third-party tools were insufficient, and organizing around distributed teams with central support, they've created a platform that serves diverse ML use cases at scale while remaining extensible for future needs.
