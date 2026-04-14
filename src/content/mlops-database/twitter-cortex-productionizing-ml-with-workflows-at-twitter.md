---
title: "Productionizing ML with workflows at Twitter"
slug: "twitter-cortex-productionizing-ml-with-workflows-at-twitter"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "airflow"
  - "docker"
  - "spark"
  - "terraform"
  - "deployment"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Twitter"
companySlug: "twitter"
platformName: "Cortex"
contentType: "blog"
summary: "Twitter's Cortex team built ML Workflows, a productionized machine learning pipeline orchestration system based on Apache Airflow, to address the challenges of manually managed ML pipelines that were reducing model retraining frequency and experimentation velocity. The system integrates Airflow with Twitter's internal infrastructure including Kerberos authentication, Aurora job scheduling, DeepBird (their TensorFlow-based ML framework), and custom operators for hyperparameter tuning and model deployment. After adoption, the Timelines Quality team reduced their model retraining cycle from four weeks to one week with measurable improvements in timeline quality, while multiple teams gained the ability to automate hyperparameter tuning experiments that previously required manual coordination."
link: "https://blog.x.com/engineering/en_us/topics/insights/2018/ml-workflows"
year: 2018
seo:
  title: "Twitter: Productionizing ML with workflows at Twitter - ZenML MLOps Database"
  description: "Twitter's Cortex team built ML Workflows, a productionized machine learning pipeline orchestration system based on Apache Airflow, to address the challenges of manually managed ML pipelines that were reducing model retraining frequency and experimentation velocity. The system integrates Airflow with Twitter's internal infrastructure including Kerberos authentication, Aurora job scheduling, DeepBird (their TensorFlow-based ML framework), and custom operators for hyperparameter tuning and model deployment. After adoption, the Timelines Quality team reduced their model retraining cycle from four weeks to one week with measurable improvements in timeline quality, while multiple teams gained the ability to automate hyperparameter tuning experiments that previously required manual coordination."
  canonical: "https://www.zenml.io/mlops-database/twitter-cortex-productionizing-ml-with-workflows-at-twitter"
  ogTitle: "Twitter: Productionizing ML with workflows at Twitter - ZenML MLOps Database"
  ogDescription: "Twitter's Cortex team built ML Workflows, a productionized machine learning pipeline orchestration system based on Apache Airflow, to address the challenges of manually managed ML pipelines that were reducing model retraining frequency and experimentation velocity. The system integrates Airflow with Twitter's internal infrastructure including Kerberos authentication, Aurora job scheduling, DeepBird (their TensorFlow-based ML framework), and custom operators for hyperparameter tuning and model deployment. After adoption, the Timelines Quality team reduced their model retraining cycle from four weeks to one week with measurable improvements in timeline quality, while multiple teams gained the ability to automate hyperparameter tuning experiments that previously required manual coordination."
mlops:
  source: "sqlite"
  entryId: 52
  sourceUrl: "https://blog.x.com/engineering/en_us/topics/insights/2018/ml-workflows"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060867"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Twitter faced significant operational challenges with their machine learning pipelines before developing ML Workflows. ML models were being trained and deployed through ad-hoc scripts and manual command execution, creating a maintenance burden that directly impacted model quality and engineering productivity. Engineers had to manually trigger each step of the pipeline—data extraction, transformation, loading, training, validation, and serving—and actively monitor these processes to ensure completion and remediate failures.

This manual approach created two critical bottlenecks. First, it reduced the frequency of model retraining by introducing unnecessary overhead and frequent errors. Each full pipeline run required active engineering supervision to trigger subsequent steps and fix data or script issues. Second, it severely constrained experimentation velocity. Hyperparameter tuning, for instance, required engineers to manually trigger multiple pipeline runs, manage their execution, and record results—a tedious process that slowed iteration cycles and reduced the number of experiments teams could conduct.

The Cortex team, responsible for providing machine learning platform technologies and expertise across Twitter, recognized that these operational inefficiencies were preventing teams from focusing on what mattered most: modeling, experimentation, and improving user experiences. The goal was clear: automate pipeline orchestration, reduce maintenance costs, improve engineering productivity, and accelerate experimentation.

## Architecture & Design

ML Workflows is built on Apache Airflow, which Twitter chose after evaluating several alternatives including Luigi, Azkaban, and their internal Aurora Workflows orchestration engine. While Aurora Workflows was already integrated into Twitter's continuous deployment infrastructure for coordinating test and release stages, Airflow offered several compelling advantages: a fully-fledged web UI with fine-grained workflow control, dynamic parameter passing between operators via XComs, an API well-suited for tasks of varying complexity, support for arbitrary Python code execution with custom plugins, and an active open-source community with adoption at major tech companies.

The architecture follows a distributed worker model using Celery for orchestration. Twitter configured Celery to work with their cloud containers and by default uses a SQLAlchemy broker that exploits Airflow's MySQL database as a message queue. This design decision allows users to set up scalable Airflow workers without maintaining separate Redis or RabbitMQ services, though teams can switch to alternative message brokers if needed.

Twitter implemented a self-service deployment model where individual teams can stand up their own Airflow instances. Each instance differs only in Aurora configuration and DAG population, specified through a simple JSON file containing variables like the owning service account, allowed groups, backing database, Kerberos principal credentials, and DAG folder locations. At startup, a custom CLI command generates the appropriate Aurora configurations to launch scheduler, web server, and worker instances.

The data flow in ML Workflows follows the standard Airflow DAG paradigm, but Twitter extended it significantly to support machine learning use cases. Operators form directed acyclic graphs representing end-to-end ML pipelines, with custom type checking ensuring compatibility between operators. XComs facilitate parameter passing between tasks, enabling dynamic workflows that can adapt based on intermediate results.

## Technical Implementation

Twitter made substantial modifications to integrate Airflow into their infrastructure. For authentication and authorization, they leveraged Flask-Login's framework by creating a custom LoginManager child class. At initialization, this class verifies principal names with Kerberos, sets up before and after-request filters driving the GSSAPI process, and queries LDAP groups for authenticated users. This enables group-based DAG-level access control, allowing Airflow to integrate seamlessly with Twitter's existing authentication infrastructure.

For observability, Twitter bridged the gap between Airflow's statsd-based StatsClient and their Finagle-based StatsReceiver from the twitter/util library. The models differ fundamentally: util/stats requires metric registration for future collection, while statsd emits metrics that are handled on the backend. Twitter built a bridge that recognizes and registers new metrics as they appear, providing API compatibility with StatsClient. This allows injection of the bridge object into Airflow at startup, enabling Twitter's visualization system to collect metrics and provide templated dashboards for self-service clients.

Twitter developed extensive custom operators to support ML workloads. Aurora operators form the foundation, allowing users to run code in Twitter's Aurora job scheduling system. DeepBird operators—built around Twitter's core TensorFlow-based ML framework—enable end-to-end model training and deployment, including running training processes, launching prediction services with trained models, and executing load tests on those services. Hyperparameter tuning operators work in conjunction with DAG constructor classes to support automated experimentation across arbitrary DAGs. Utility operators handle common tasks like launching CI jobs, managing HDFS files, creating and monitoring JIRA tickets, and sending information to model metadata stores.

To prevent runtime failures due to incompatible arguments between operators, Twitter implemented a type checking system that verifies input and output data types of all operators in a DAG, covering both regular arguments and XCom values. All operators declare their types using Python decorators. For example, if operator Foo outputs an integer XCom value but operator Bar expects a string, the type checker raises an error during DAG construction rather than at runtime.

Twitter elevated DAG constructors to first-class citizens in ML Workflows. Users often needed to run the same operations with different parameter values, leading to the pattern of wrapping DAGs in constructor classes that expose configurable parameters. Twitter developed a DAG constructor base class allowing users to declare parameter lists, along with a UI for ad-hoc DAG instance creation with different parameter sets. When users create new DAGs through the UI, Python files are generated and placed in Airflow's DAG_FOLDER for automatic loading. To persist these instances on stateless cloud containers, configuration is stored in the Airflow database, enabling automatic recreation when schedulers and workers restart.

Twitter also built a custom Airflow administrator UI plugin as a Flask view added to the Airflow webserver. This view loads a JavaScript bundle—a React-based single-page application—that provides user interfaces for features like hyperparameter tuning and DAG constructors, calling Flask endpoints to fetch data and invoke functionality.

## Scale & Performance

The Timelines Quality team provides the most concrete performance example. Before ML Workflows, they retrained and deployed models on a four-week cycle. After adoption, they reduced this interval to one week—a 4x improvement in retraining frequency. The team ran online experiments comparing the impact of more frequent retraining, finding positive results indicating that shorter intervals improved timeline quality and ranking for users.

While the document doesn't provide detailed throughput or latency metrics, it indicates that ML Workflows had been adopted by several internal teams by 2018, with plans for broad adoption across Twitter by year-end. The Abuse and Safety team applied hyperparameter tuning to tweet-based models, automatically running multiple experiments to find improved model configurations based on offline metrics.

The self-service model enables teams to scale their Airflow deployments independently based on their needs, with distributed workers via Celery providing horizontal scalability. The use of Airflow's MySQL database as a Celery message queue suggests moderate scale requirements where this approach remains viable, though teams can opt for dedicated message brokers like Redis or RabbitMQ for higher throughput scenarios.

## Trade-offs & Lessons

Twitter's decision to build on Airflow rather than develop a custom solution or extend Aurora Workflows demonstrates a pragmatic approach to platform building. By leveraging open-source software, they gained a mature web UI, strong community support, and battle-tested orchestration capabilities. However, this choice required significant integration work to make Airflow production-ready within Twitter's infrastructure, including custom authentication, metrics integration, and extensive operator development.

The self-service deployment model offers important trade-offs. Each team maintaining their own Airflow instance provides isolation, simpler permission management through single service accounts, and complete control over DAGs and configurations. However, this creates operational overhead for teams and potential duplication of effort. Twitter acknowledged this in their future work section, noting plans to offer a more centralized managed Airflow solution to reduce maintenance costs while maintaining the benefits of isolation.

The type checking system for operators represents a valuable lesson in fail-fast engineering. By catching type mismatches during DAG construction rather than at runtime, Twitter prevents costly failures during pipeline execution when engineers might be asleep or unavailable. This is particularly important for long-running ML training pipelines where failures late in execution waste significant compute resources and time.

Twitter's pattern of making DAG constructors first-class citizens addresses a common ML workflow challenge: the need to run similar pipelines with different parameters for experimentation. Rather than forcing users to create multiple similar DAG definitions or develop ad-hoc solutions, Twitter standardized this pattern with proper tooling and UI support. This demonstrates how identifying common user patterns and elevating them to platform features can significantly improve developer experience.

The hyperparameter tuning implementation showcases sophisticated workflow composition. By building HyperparameterTuner on top of DagConstructor and leveraging Airflow's subdag capabilities, Twitter created a system where users can convert existing workflows into hyperparameter tuning experiments with minimal code changes. The workflow_result convention—requiring users to push metrics as XCom values—provides a clean interface between the tuning infrastructure and user-defined experiments.

Twitter's integration philosophy of reusing existing components and open-source technologies proved successful. Rather than building everything from scratch, they focused engineering effort on integration work, custom operators for Twitter-specific systems like Aurora and DeepBird, and ML-specific features like hyperparameter tuning. This allowed them to deliver value quickly while maintaining flexibility to extend the system as needs evolved.

The document reveals ongoing challenges in their future work section. Production hardening remained a priority, indicating that reliability and robustness required continued investment beyond the initial implementation. The goal to integrate more advanced hyperparameter search techniques like Bayesian optimization suggests that their initial random search and grid search implementations, while useful, had limitations for complex model optimization problems.

The impact on engineering culture is noteworthy. By providing shared operators and utility functions, Twitter created a growing library of reusable components that teams could leverage to build workflows faster. This network effect—where each team's contributions benefit others—is a powerful outcome of platform engineering. The adoption of common patterns like DAG constructors across teams indicates successful standardization that reduces cognitive load and makes workflows more maintainable.

Twitter's experience demonstrates that successful ML platform building requires more than just deploying open-source tools. The extensive customization for authentication, authorization, metrics, custom operators, type checking, and DAG management transformed Airflow from a general-purpose workflow orchestrator into an ML-specific platform that fit Twitter's infrastructure and development practices. The measured impact—4x faster retraining cycles with demonstrated quality improvements—validates the significant engineering investment required to build production ML infrastructure.
