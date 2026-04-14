---
title: "Machine Learning Workflows in Production"
slug: "zalando-zalandos-ml-platform-machine-learning-workflows-in-production"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "metadata-store"
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
  - "ab-testing"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "retraining"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Zalando"
companySlug: "zalando"
platformName: "Zalando's ML platform"
contentType: "video"
summary: "Zalando built a comprehensive machine learning platform to support over 50 teams deploying ML pipelines at scale, serving 50 million active customers. The platform centers on ZFlow, an in-house Python DSL that generates AWS CloudFormation templates for orchestrating ML pipelines via AWS Step Functions, integrated with tools like SageMaker for training, Databricks for big data processing, and a custom JupyterHub installation called DataLab for experimentation. The system addresses the gap between rapid experimentation and production-grade deployment by providing infrastructure-as-code workflows, automated CI/CD through an internal continuous delivery platform built on Backstage, and centralized observability for tracking pipeline executions, model versions, and debugging. The platform has been adopted by over 30 teams since its initial development in 2019, supporting use cases ranging from personalized recommendations and search to outfit generation and demand forecasting."
link: "https://www.youtube.com/watch?v=CO4Gqd95j6k"
year: 2022
seo:
  title: "Zalando: Machine Learning Workflows in Production - ZenML MLOps Database"
  description: "Zalando built a comprehensive machine learning platform to support over 50 teams deploying ML pipelines at scale, serving 50 million active customers. The platform centers on ZFlow, an in-house Python DSL that generates AWS CloudFormation templates for orchestrating ML pipelines via AWS Step Functions, integrated with tools like SageMaker for training, Databricks for big data processing, and a custom JupyterHub installation called DataLab for experimentation. The system addresses the gap between rapid experimentation and production-grade deployment by providing infrastructure-as-code workflows, automated CI/CD through an internal continuous delivery platform built on Backstage, and centralized observability for tracking pipeline executions, model versions, and debugging. The platform has been adopted by over 30 teams since its initial development in 2019, supporting use cases ranging from personalized recommendations and search to outfit generation and demand forecasting."
  canonical: "https://www.zenml.io/mlops-database/zalando-zalandos-ml-platform-machine-learning-workflows-in-production"
  ogTitle: "Zalando: Machine Learning Workflows in Production - ZenML MLOps Database"
  ogDescription: "Zalando built a comprehensive machine learning platform to support over 50 teams deploying ML pipelines at scale, serving 50 million active customers. The platform centers on ZFlow, an in-house Python DSL that generates AWS CloudFormation templates for orchestrating ML pipelines via AWS Step Functions, integrated with tools like SageMaker for training, Databricks for big data processing, and a custom JupyterHub installation called DataLab for experimentation. The system addresses the gap between rapid experimentation and production-grade deployment by providing infrastructure-as-code workflows, automated CI/CD through an internal continuous delivery platform built on Backstage, and centralized observability for tracking pipeline executions, model versions, and debugging. The platform has been adopted by over 30 teams since its initial development in 2019, supporting use cases ranging from personalized recommendations and search to outfit generation and demand forecasting."
mlops:
  source: "sqlite"
  entryId: 77
  sourceUrl: "https://www.youtube.com/watch?v=CO4Gqd95j6k"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061147"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Zalando faced the classic challenge of bridging the gap between machine learning experimentation and production deployment at enterprise scale. With approximately 50 million active customers generating terabytes of data daily and more than 50 machine learning teams across the organization, the company needed a standardized approach to ML workflows that could satisfy fundamentally different requirements across the ML lifecycle.

The experimentation phase demanded speed and quick iteration, allowing applied scientists and analysts to test hypotheses rapidly without lengthy infrastructure setup. Data scientists needed immediate access to common data sources, high-performance computing resources including GPUs, and interactive environments for iterative development. Meanwhile, production systems required the ability to handle big data processing at scale, dynamic scaling to accommodate traffic spikes during events like Cyber Week, strict compliance with GDPR and data protection regulations, reproducibility for debugging and auditing, and robust security with access controls. The company enforced a four-eyes principle requiring two-person code review for all production deployments.

Before building their current platform, teams were manually writing AWS CloudFormation templates for infrastructure provisioning, which proved extremely painful and error-prone. There was no standardized way to orchestrate multi-stage ML pipelines that combined data processing, model training, and inference. Teams lacked visibility into pipeline executions and struggled with debugging failures across distributed systems. The organization needed tooling that could abstract away infrastructure complexity while still providing flexibility for diverse ML use cases including recommendations, search ranking, outfit generation, size and fit prediction, and demand forecasting.

## Architecture & Design

Zalando's ML platform architecture is built around several integrated layers that span from experimentation through production deployment and monitoring. The foundation rests on AWS as the strategic cloud provider, with custom tooling bridging different services and open-source projects.

At the experimentation layer, DataLab serves as the primary environment for applied scientists and data analysts. This is a custom installation of JupyterHub that provides approximately 500 frequent users with browser-based access to Jupyter notebooks. DataLab comes with batteries-included dependencies and direct access to Zalando's common data sources, enabling users to start new environments in under a minute. For high-performance computing workloads, Zalando operates both a custom on-premises data center running open-source Slurm software with several Nvidia GPU cards for research teams, and provides access to cloud-based GPU instances from AWS for DataLab users who need accelerated compute.

The production pipeline layer centers on ZFlow, Zalando's internally developed Python library that provides a domain-specific language for describing ML pipelines. ZFlow operates as an abstraction layer on top of AWS Cloud Development Kit (CDK), allowing engineers and data scientists to define their pipeline structure, stages, and dependencies in concise Python code rather than verbose CloudFormation YAML. When a ZFlow script executes, it generates a complete CloudFormation template that describes all required AWS resources including data processing jobs, training tasks, inference endpoints, IAM roles, and permissions.

Pipeline orchestration is handled by AWS Step Functions, which executes state machines generated from ZFlow definitions. Each pipeline typically consists of several standard stages: configuration management, data preprocessing and cleanup, model training, and inference (either batch or online). Step Functions coordinates execution across different services, calling out to Databricks for big data processing using Spark clusters, SageMaker for model training (potentially on GPU instances), and Lambda functions for lightweight compute tasks. The architecture supports both linear pipeline flows and more complex directed acyclic graphs with parallel execution branches, such as training country-specific models simultaneously.

Data flows through Amazon S3 as the central storage layer. A typical pipeline might have a Databricks job write processed data to an S3 bucket, which a subsequent SageMaker training job then reads. This S3-centric approach provides the integration point between different processing engines.

The deployment and operations layer involves several components. GitHub Enterprise manages all code with version control and enforces the four-eyes principle through pull request workflows. Zalando's internal Continuous Delivery Platform (CDP) automatically picks up code pushed to GitHub and orchestrates deployment to AWS. CDP provides a UI built on top of Backstage, Spotify's open-source developer portal framework. For ML-specific observability, Zalando built a custom Backstage plugin that provides project-centric views of ML workflows, allowing teams to group experiments and production pipelines, visualize pipeline structure, track individual executions, and monitor how variables and metrics change over time.

Pipeline execution events are captured and stored in a custom database that records the structure of each pipeline, individual steps, and all events including errors and stack traces. This database feeds the observability UI and enables debugging of failed runs.

## Technical Implementation

The technology stack reflects strategic choices made in the 2018-2019 timeframe when Zalando first developed ZFlow, though the platform continues to evolve. The core constraint was a strategic bet on AWS as the cloud provider, which influenced many downstream technology decisions.

Code management uses GitHub Enterprise, which provides version control, collaboration features like pull requests and code reviews, and integration with the deployment pipeline. The four-eyes compliance requirement is implemented through GitHub's review workflows.

For cloud infrastructure, AWS serves as the foundation. Specific AWS services in the stack include CloudFormation for infrastructure-as-code provisioning, Step Functions for workflow orchestration, SageMaker for model training and deployment, Lambda for serverless compute, S3 for object storage, and various IAM services for security and access control.

Big data processing runs on Databricks, which provides managed Spark clusters. This strategic choice reflects Databricks' maturity as a platform supporting both experimentation and production big data workloads. Databricks jobs can be invoked from Step Functions state machines, with data exchange happening through S3.

ZFlow itself is written as a Python library that provides a domain-specific language on top of AWS CDK. Engineers and data scientists write Python scripts that define pipeline stages, with each stage corresponding to specific compute tasks. The library is distributed internally through a private Python package repository (not publicly available on PyPI despite the package name existing there). ZFlow scripts can be written and executed either locally on developer machines or from within DataLab notebook environments.

The continuous delivery platform (CDP) is built on Backstage and developed by a dedicated internal team separate from the ML platform team. It provides automated deployment pipelines that take code from GitHub and deploy it to AWS, with a user-friendly interface for monitoring deployments and debugging issues.

For ML-specific observability, the team built a custom Backstage plugin that interfaces with the pipeline execution database. This plugin renders pipeline visualizations, execution timelines, and metric tracking in a project-centric view.

DataLab runs as a managed JupyterHub installation, customized with Zalando-specific integrations for data access and authentication. Users can select instance types including GPU-backed instances for high-performance workloads, with GPU usage attributed to team-specific AWS accounts for cost tracking.

More recently, Zalando has integrated MLflow for experiment tracking during the experimentation phase, complementing the existing ZFlow infrastructure. The team has also implemented a model registry, though this was a relatively recent addition as of 2022.

Language choice centers on Python throughout the stack, reflecting its dominance in the data science and ML ecosystem. While Databricks notebooks support Scala and some team members use it for specific workloads, Python remains the primary language for ML pipeline definitions and model development. The ZFlow DSL is intentionally Python-based because all internal users—both software engineers and applied scientists—have Python familiarity.

## Scale & Performance

Zalando's ML platform operates at significant enterprise scale across multiple dimensions. The company serves approximately 50 million active customers, generating terabytes of data daily that flows through ML pipelines. Internally, the technology organization comprises a few thousand people organized into a few hundred tech teams, with more than 50 of these teams actively working on machine learning projects.

The DataLab JupyterHub installation supports about 500 frequent users, predominantly applied scientists and analysts. These users can spin up new notebook environments in under one minute through a browser interface.

ZFlow has been adopted by over 30 teams for production ML pipeline deployment since its initial development in 2019. While the exact number of deployed models and CloudFormation stacks wasn't specified, with 30+ teams each likely running multiple pipelines and models, the platform manages deployments across dozens to potentially hundreds of distinct CloudFormation stacks. Each team maintains its own repositories and AWS accounts for production workloads, reducing inter-team dependencies and enabling independent scaling.

The architecture is designed to handle dynamic scaling, which is particularly critical during high-traffic retail events. Cyber Friday and Cyber Week see dramatically higher user volumes compared to normal periods, and the ML systems serving recommendations, search, and other customer-facing features must scale accordingly. The serverless nature of Step Functions orchestration helps here, as the orchestration layer itself scales automatically and incurs minimal cost. The more expensive components are the individual processing stages—Spark clusters in Databricks, SageMaker training jobs, and inference endpoints—which can be scaled up or down based on demand.

Cost attribution operates at the team and AWS account level. Inexpensive shared services like DataLab (excluding GPU instances) are centrally managed and provided free to internal teams. When teams use expensive resources like GPUs or run production workloads, these are provisioned in team-specific AWS accounts, making costs visible and attributable. AWS provides detailed cost reporting by service within each account, enabling teams to understand spending patterns.

Step Functions orchestration itself is described as "very cheap" compared to the compute-intensive stages it coordinates. Most pipeline costs come from data processing (Databricks Spark clusters), model training (potentially on SageMaker GPU instances), and serving infrastructure rather than orchestration overhead.

The platform supports ML use cases spanning the customer journey. When customers open Zalando's website, they immediately see personalized recommendations generated by ML models trained on historical sales data from that customer and similar users. Search functionality is powered by ML ranking models. Outfit generation algorithms use machine learning, potentially including computer vision, to suggest complementary clothing items. Size and fit prediction leverages computer vision to analyze customer photos and recommend appropriate sizes. Demand forecasting models predict sales volumes to optimize inventory ordering. This diversity of use cases demonstrates the platform's flexibility across different ML problem types.

## Trade-offs & Lessons

Zalando made several deliberate trade-offs in building their ML platform, with timing playing a crucial role in technology selection. ZFlow and the Step Functions-based architecture were developed in 2018-2019, when many now-popular ML pipeline tools were either immature or non-existent. MLflow Pipelines, for example, didn't exist; Kubeflow was less mature; SageMaker Pipelines hadn't launched. This timing context is important for understanding why Zalando built custom tooling rather than adopting off-the-shelf solutions.

The decision to build ZFlow in-house rather than use existing orchestration tools like Airflow offers several advantages but also maintenance burdens. On the positive side, ZFlow integrates deeply with Zalando's internal tooling, particularly the CDP deployment platform and Backstage-based observability. The team can rapidly respond to customer needs and implement ML-specific features that generic workflow engines wouldn't prioritize. ZFlow abstracts away CloudFormation complexity effectively—data scientists can define pipelines without understanding the underlying AWS resources being provisioned. The serverless Step Functions orchestration requires no cluster management and scales automatically, unlike Airflow which requires maintaining dedicated compute resources.

However, this custom approach means Zalando must maintain ZFlow internally, fix bugs, add features, and keep pace with AWS service changes. The tool is not open-sourced (despite some expressed interest), which limits external contributions and community development. Teams must learn a Zalando-specific DSL rather than transferring skills from widely-used tools like Airflow. The presenter acknowledged that if starting today, the decision might differ given the maturity of alternatives like MLflow and evolved SageMaker capabilities, though ZFlow still provides value through tight internal integration and features unavailable in off-the-shelf tools.

The strategic AWS lock-in is another significant trade-off. While AWS provides a comprehensive service ecosystem and Zalando has deep AWS expertise, this dependency means the platform is not cloud-agnostic. Migrating to Google Cloud or Azure would require substantial rearchitecture. The bet on AWS was strategic and made sense given Zalando's scale and the maturity of AWS ML services, but it does create vendor dependency.

Organizational structure around the platform reflects important lessons about scaling ML operations. Each team maintains separate repositories and AWS accounts for their projects, reducing dependencies and enabling independent deployment cadences. This decentralization supports Zalando's goal of flexibility and team autonomy. Cost transparency is achieved by attributing expensive resources to team-specific accounts while centralizing inexpensive shared services, balancing cost control with user convenience.

The platform team's evolution demonstrates learning about support models. Starting as a pure engineering team building infrastructure, they expanded to include consulting roles helping teams adopt ZFlow and debug pipelines. This hybrid model provides both platform development and hands-on support, though it requires engineers with broad skills spanning AWS services, orchestration, ML concepts, and debugging distributed systems.

One notable lesson is the value of Backstage as a foundation for developer portals. Rather than building UIs from scratch, Zalando leveraged Spotify's open-source framework to create both the CDP deployment platform and the ML observability plugin. This approach saved substantial development effort while providing a consistent user experience across tooling.

The presenter emphasized that technology choices should be periodically reevaluated as the ecosystem evolves. What made sense in 2019 might not be optimal in 2022 or beyond. The team actively monitors developments in MLflow, Kubeflow, SageMaker Pipelines, and other tools, though they're currently satisfied with ZFlow given its installed base (30+ teams) and internal integration benefits. The calculus involves weighing switching costs against potential benefits of more standardized tooling.

Hiring practices reflect the full-stack philosophy. Zalando doesn't have formal "MLOps Engineer" titles, instead hiring software engineers with flexibility to learn new domains. The presenter himself moved between roles three times within Zalando, starting in game development, moving to data governance and GDPR, then to ML infrastructure. For junior roles, basic Python data science skills, familiarity with Jupyter notebooks, and some cloud experimentation are sufficient. SQL knowledge is useful but not required. For senior roles, prior experience deploying ML pipelines (with any tooling) and AWS expertise provide advantages.

A key insight for practitioners is the importance of reducing lead time—the duration from initial idea to working production system. The platform team actively works on streamlining this journey, removing inefficiencies, and improving observability to accelerate debugging. Features like cloud-first development (moving even CloudFormation template generation to the cloud) reflect this ongoing optimization.

The presenter noted that both software engineers and data scientists successfully use ZFlow after training, with roughly equal representation in internal training sessions. For simple pipelines, the abstraction successfully hides AWS complexity. For non-standard or complex pipelines, software engineering backgrounds help with debugging, but data scientists are capable of managing standard deployments. This democratization enables more team members to deploy ML systems without requiring specialized MLOps expertise for every project.

Regarding automation, teams can implement automated model retraining within ZFlow pipelines using branching logic, parallel execution, and scheduled triggers. The platform supports A/B testing infrastructure (though developed by a separate team) for comparing model performance. The level of automation varies by use case—some teams implement full retraining pipelines while others find manual processes sufficient.

Overall, Zalando's approach demonstrates that building custom ML platform tooling can provide significant value when off-the-shelf solutions don't meet specific needs, though it requires ongoing investment in maintenance and evolution. The combination of internal development for core differentiation (ZFlow, observability) with adoption of mature open-source tools (Backstage, JupyterHub, Databricks) and cloud services (AWS) provides a pragmatic path to supporting ML at scale.
