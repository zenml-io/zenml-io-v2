---
title: "Machine Learning at Monzo in 2020"
slug: "monzo-monzos-ml-stack-machine-learning-at-monzo-in-2020"
draft: false
mlopsTags:
  - "feature-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "dbt"
  - "spark"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "finance"
company: "Monzo"
companySlug: "monzo"
platformName: "Monzo's ML stack"
contentType: "blog"
summary: "Monzo, a UK-based digital bank, built an end-to-end machine learning infrastructure spanning both analytics and production systems to tackle problems ranging from NLP-powered customer support to financial crime detection. Their three-person Machine Learning Squad operates at the intersection of Google Cloud Platform for model training and batch inference and AWS for live microservice-based serving, building systems that handle text classification for chat routing, transactional fraud detection, and help article search. The team takes a pragmatic, impact-focused approach, measuring success by business metrics rather than offline model performance, and has built reusable infrastructure including a feature store bridging BigQuery and Cassandra, standardized data processing pipelines, and Python microservices deployed in AWS that leverage diverse ML frameworks including PyTorch, scikit-learn, and Hugging Face transformers."
link: "https://medium.com/data-monzo/machine-learning-at-monzo-d83a7d1a71e1"
year: 2020
seo:
  title: "Monzo: Machine Learning at Monzo in 2020 - ZenML MLOps Database"
  description: "Monzo, a UK-based digital bank, built an end-to-end machine learning infrastructure spanning both analytics and production systems to tackle problems ranging from NLP-powered customer support to financial crime detection. Their three-person Machine Learning Squad operates at the intersection of Google Cloud Platform for model training and batch inference and AWS for live microservice-based serving, building systems that handle text classification for chat routing, transactional fraud detection, and help article search. The team takes a pragmatic, impact-focused approach, measuring success by business metrics rather than offline model performance, and has built reusable infrastructure including a feature store bridging BigQuery and Cassandra, standardized data processing pipelines, and Python microservices deployed in AWS that leverage diverse ML frameworks including PyTorch, scikit-learn, and Hugging Face transformers."
  canonical: "https://www.zenml.io/mlops-database/monzo-monzos-ml-stack-machine-learning-at-monzo-in-2020"
  ogTitle: "Monzo: Machine Learning at Monzo in 2020 - ZenML MLOps Database"
  ogDescription: "Monzo, a UK-based digital bank, built an end-to-end machine learning infrastructure spanning both analytics and production systems to tackle problems ranging from NLP-powered customer support to financial crime detection. Their three-person Machine Learning Squad operates at the intersection of Google Cloud Platform for model training and batch inference and AWS for live microservice-based serving, building systems that handle text classification for chat routing, transactional fraud detection, and help article search. The team takes a pragmatic, impact-focused approach, measuring success by business metrics rather than offline model performance, and has built reusable infrastructure including a feature store bridging BigQuery and Cassandra, standardized data processing pipelines, and Python microservices deployed in AWS that leverage diverse ML frameworks including PyTorch, scikit-learn, and Hugging Face transformers."
mlops:
  source: "sqlite"
  entryId: 117
  sourceUrl: "https://medium.com/data-monzo/machine-learning-at-monzo-d83a7d1a71e1"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061578"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Monzo, a digital bank operating primarily through mobile applications, faces unique machine learning challenges that span customer-facing product features, operational efficiency, and regulatory requirements. As a company that runs most of its customer support through in-app chat and processes all banking transactions digitally, Monzo generates massive volumes of text, transactional, and behavioral data that create opportunities for ML-powered improvements. The Machine Learning Squad was established to tackle problems where ML was being introduced for the first time, rather than optimizing existing systems, with a focus on delivering measurable business impact across domains like customer support automation, financial crime detection, and personalized banking features.

The team operates within a broader Data Science discipline of over 30 people, structured into three areas: Analytics (behavioral analysis, experiments, and enabling data-driven decisions), Core Banking (credit scoring, lending products, financial crime analytics), and Data Platform & Machine Learning (systems building and infrastructure). The Machine Learning Squad specifically sits at the "build" end of the Type A/Type B data science spectrum, focusing on production systems rather than pure analysis. As of late 2020, the squad consisted of only three people with "Machine Learning" in their titles, though they frequently collaborate with and embed within other engineering squads and have data scientists from other teams embed with them on projects.

The primary pain points that motivated their ML infrastructure development include the need to process and understand unstructured text from customer support conversations at scale, detect increasingly sophisticated financial crime patterns in transactional data, route customer queries efficiently to appropriate support agents, and surface intelligent features like help article search and trending spending insights. The team needed to build systems that could operate reliably in a regulated banking environment while maintaining the speed and agility of a technology startup.

## Architecture & Design

Monzo's machine learning architecture represents a hybrid approach spanning two major cloud platforms, each serving distinct purposes in the ML lifecycle. The core banking infrastructure lives in AWS, built primarily as Go microservices using Cassandra as the data store. Meanwhile, the analytics infrastructure resides in Google Cloud Platform, centered around BigQuery as the data warehouse. Machine learning systems bridge these two environments, leveraging the strengths of each platform for different stages of the ML lifecycle.

The data flow architecture follows a clear separation of concerns: training and batch inference occur entirely within the GCP analytics stack, while live inference happens through microservices deployed in AWS. For model development and training, the team writes Python jobs submitted to GCP AI Platform, pulling data from BigQuery for feature engineering and model training. They use data build tool (dbt) to orchestrate SQL-based data transformations and Airflow for workflow orchestration. Once models are trained and validated, they are packaged into Python microservices and deployed to AWS for real-time serving alongside the Go-based banking infrastructure.

A critical architectural component is their custom-built feature store, which acts as a bridge between the analytics and production environments. This feature store connects BigQuery (where historical features are computed and stored) with Cassandra (where low-latency feature retrieval is needed for real-time inference). The design allows data scientists to develop features using familiar SQL and Python tools in BigQuery, while ensuring those same features are available with appropriate latency characteristics when models are serving production traffic in AWS.

The team has deliberately avoided building monolithic, end-to-end ML pipelines that process raw data through to trained models. Instead, they've architected their systems around reusable, composable components. As their understanding of different data sources has matured, they've created standardized data processing pipelines that serve as shared infrastructure. For example, they built a `create-text-dataset` pipeline that handles all data munging needed to create supervised text classification datasets, which can be reused across different NLP problems. Training pipelines are then written separately, consuming the outputs of these standardized data processors.

The monitoring and observability architecture leverages existing Monzo infrastructure rather than building ML-specific tooling. Models are monitored using Grafana for system metrics and Looker for business metrics and data quality checks. This decision keeps the ML stack consistent with broader Engineering and Analytics practices at Monzo, reducing cognitive overhead and making it easier for non-ML engineers to understand and debug production ML systems.

## Technical Implementation

The technology stack reflects pragmatic choices that balance ML-specific needs with organizational standards. For model development and training, the team uses Python extensively, running jobs on GCP AI Platform for compute resources. They maintain an agnostic view toward ML libraries, having shipped production systems using scikit-learn for traditional ML algorithms, PyTorch for deep learning, gensim for word embeddings, and Hugging Face transformers for large language models. They were early adopters of the transformers library given their focus on PyTorch for deep learning workloads. More recently, they've experimented with the autogluon library for automated machine learning.

The serving infrastructure consists of Python microservices deployed in AWS, running alongside Monzo's Go-based banking platform. While the primary backend language at Monzo is Go, the ML team made a deliberate decision to serve models from Python services, allowing them to use the rich ecosystem of Python ML libraries and avoiding the overhead of model conversion or reimplementation. Importantly, everyone on the ML team has learned at least some Go, which has proven valuable for understanding the broader system architecture, debugging integration issues, and moving faster when working with backend engineering teams.

For data infrastructure, the team is heavily invested in BigQuery and SQL. They use dbt for defining data transformations and managing dependencies between different data assets. Airflow orchestrates both data pipeline execution and model training workflows. The SQL-first approach to feature engineering allows data scientists and analysts to collaborate more easily and ensures that feature definitions are transparent and version-controlled.

The feature store implementation bridges two databases: BigQuery for historical feature computation and batch serving, and Cassandra for online feature serving with the low latency required for real-time inference. While the specific implementation details aren't elaborated in the source material, this architecture allows the same feature definitions to be used for both training (where batch access to historical features is needed) and serving (where individual feature lookups must happen in milliseconds).

The team has made specific choices about what tools NOT to extensively use in production. Jupyter notebooks and Google Colab are explicitly limited to exploratory work, not production pipelines. This constraint forces a discipline where exploratory insights must be codified into proper pipeline code before moving to production, reducing the risk of notebooks becoming undocumented, unreproducible pipeline steps.

## Scale & Performance

While the source material doesn't provide extensive quantitative metrics about scale, several indicators suggest significant operational scope. Monzo runs the majority of its customer support through in-app chat, generating substantial volumes of text data that feed NLP systems for query routing, intent classification, and help article search. The team has deployed multiple production classifiers handling these workloads.

The Data Science discipline at Monzo had grown to over 30 people by 2020, indicating the scale of data operations and the breadth of analytics and ML use cases being tackled. The Machine Learning Squad itself remained deliberately small at three people (with active hiring to expand), taking an approach of high impact per person through systematic engineering and reusable infrastructure.

The banking context provides inherent scale challenges: every transaction generates data, every customer interaction through the app creates behavioral logs, and identity verification processes produce image and video data. The team explicitly mentions working with log data about app usage, customer support agent actions, and rule engine decisions, suggesting substantial data volumes flowing through their systems.

Quarterly planning cycles suggest a cadence of delivering multiple production systems per year. In 2020 alone, the team shipped NLP and task routing systems, fraud detection models, a feature store, multiple classification systems, and initiated collaborations with financial crime teams on transactional data analysis. This delivery velocity with a three-person team indicates mature development practices and effective infrastructure leverage.

## Trade-offs & Lessons

One of the most significant architectural decisions was running a hybrid multi-cloud setup, with training in GCP and serving in AWS. This introduces complexity around data movement, authentication, and maintaining consistency between environments. However, the trade-off has been accepted because each platform serves its purpose well: GCP provides a superior analytics experience with BigQuery and AI Platform, while AWS hosts the core banking infrastructure where models must ultimately serve predictions. The feature store acts as the critical bridge, ensuring features computed in one environment are available in the other.

The decision to serve models from Python microservices rather than Go services represents another important trade-off. While this creates a language boundary in the serving infrastructure (most Monzo backend services are Go), it allows the ML team to leverage Python's rich ML ecosystem and iterate faster on model implementations. The team mitigated the downsides by having everyone learn some Go, ensuring they could understand and work with the broader infrastructure.

The team's approach to avoiding end-to-end ML pipelines and instead building composable, reusable data processing components reflects hard-won lessons about maintainability and iteration speed. By separating data processing from model training, they avoid rebuilding data pipelines for every new model. The `create-text-dataset` pipeline exemplifies this: it's a shared asset that handles all text classification dataset creation, allowing new NLP projects to start faster and benefit from accumulated wisdom about data quality and preprocessing.

Limiting notebooks to exploratory work only is a disciplined choice that many ML teams struggle with. Monzo has explicitly drawn this line to prevent the common anti-pattern of production systems depending on manually-run notebooks, which creates reproducibility and reliability issues. This requires additional upfront work to convert exploratory code into proper pipelines, but pays dividends in production reliability.

The team's focus on business metrics rather than offline model metrics represents a mature MLOps perspective. They explicitly state that impact is measured in business terms, not model accuracy or other offline metrics. This drives behavior toward solving the right problems and getting to viable models quickly rather than pursuing marginal gains in model performance that may not translate to business value. Their use of two document types—proposals for scoping new problems and analyses for deciding next steps after experiments—codifies this impact-focused approach.

The quarterly planning approach of "changing gears" between exploration and iteration provides a useful model for balancing competing priorities. Some quarters focus on building foundational capabilities (like the feature store), while others focus on deploying models in new problem domains. This prevents the team from getting stuck purely in infrastructure work or purely in model development, maintaining momentum on both fronts.

Leveraging existing Monzo infrastructure for ML monitoring (Grafana and Looker) rather than adopting ML-specific tools like MLflow or Weights & Biases represents a pragmatic trade-off. While specialized ML tools might offer more ML-specific features, using organization-standard tools reduces operational overhead, makes ML systems more transparent to non-ML engineers, and avoids introducing yet another tool that must be learned and maintained. The team only deviates from standard infrastructure when they have use cases that absolutely cannot be solved by existing tools.

The small team size (three people) embedded across multiple problem domains means individuals must be generalists who can work across the full ML stack, from data processing to model training to production serving. This creates hiring challenges (finding people with or willing to develop this breadth) but results in high autonomy and low coordination overhead. The practice of embedding with other squads or having others embed with the ML team provides flexibility to scale capacity on specific projects without permanently expanding headcount.

Perhaps the most important lesson is the team's explicit focus on "introducing machine learning for the first time" rather than "squeezing more out of existing systems." This greenfield-focused approach maximizes impact when the team is small, targeting problems where even a simple ML solution represents a significant improvement over no ML at all. As the team grows, they acknowledge this will shift toward more iterative optimization of existing models.
