---
title: "Building Real-time Machine Learning Foundations at Lyft"
slug: "lyft-lyftlearn-feature-store-building-real-time-machine-learning-foundations-at-lyft"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "docker"
  - "kubernetes"
  - "deployment"
  - "feature-engineering"
  - "retraining"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Lyft"
companySlug: "lyft"
platformName: "LyftLearn + Feature Store"
contentType: "blog"
summary: "Lyft's LyftLearn platform in early 2022 supported real-time inference but lacked first-class streaming data support across training, monitoring, and other critical ML systems, creating weeks or months of engineering effort for teams wanting to use streaming data in their models. To address this gap in their real-time marketplace business, Lyft launched the \"Real-time Machine Learning with Streaming\" initiative, building foundations around three core capabilities: real-time features, real-time learning, and event-driven decisions. The team created a unified RealtimeMLPipeline interface that enabled ML developers to write streaming code once and run it seamlessly across notebook prototyping environments and production Flink clusters, reducing development time from weeks to days. This abstraction layer handled the complexity of stateful distributed streaming by providing uniform behavior across environments, using an Analytics Event Abstraction to read from S3 in development and Kinesis in production, while spawning ad-hoc Flink clusters alongside Jupyter notebooks for rapid iteration."
link: "https://eng.lyft.com/building-real-time-machine-learning-foundations-at-lyft-6dd99b385a4e"
year: 2023
seo:
  title: "Lyft: Building Real-time Machine Learning Foundations at Lyft - ZenML MLOps Database"
  description: "Lyft's LyftLearn platform in early 2022 supported real-time inference but lacked first-class streaming data support across training, monitoring, and other critical ML systems, creating weeks or months of engineering effort for teams wanting to use streaming data in their models. To address this gap in their real-time marketplace business, Lyft launched the \"Real-time Machine Learning with Streaming\" initiative, building foundations around three core capabilities: real-time features, real-time learning, and event-driven decisions. The team created a unified RealtimeMLPipeline interface that enabled ML developers to write streaming code once and run it seamlessly across notebook prototyping environments and production Flink clusters, reducing development time from weeks to days. This abstraction layer handled the complexity of stateful distributed streaming by providing uniform behavior across environments, using an Analytics Event Abstraction to read from S3 in development and Kinesis in production, while spawning ad-hoc Flink clusters alongside Jupyter notebooks for rapid iteration."
  canonical: "https://www.zenml.io/mlops-database/lyft-lyftlearn-feature-store-building-real-time-machine-learning-foundations-at-lyft"
  ogTitle: "Lyft: Building Real-time Machine Learning Foundations at Lyft - ZenML MLOps Database"
  ogDescription: "Lyft's LyftLearn platform in early 2022 supported real-time inference but lacked first-class streaming data support across training, monitoring, and other critical ML systems, creating weeks or months of engineering effort for teams wanting to use streaming data in their models. To address this gap in their real-time marketplace business, Lyft launched the \"Real-time Machine Learning with Streaming\" initiative, building foundations around three core capabilities: real-time features, real-time learning, and event-driven decisions. The team created a unified RealtimeMLPipeline interface that enabled ML developers to write streaming code once and run it seamlessly across notebook prototyping environments and production Flink clusters, reducing development time from weeks to days. This abstraction layer handled the complexity of stateful distributed streaming by providing uniform behavior across environments, using an Analytics Event Abstraction to read from S3 in development and Kinesis in production, while spawning ad-hoc Flink clusters alongside Jupyter notebooks for rapid iteration."
mlops:
  source: "sqlite"
  entryId: 167
  sourceUrl: "https://eng.lyft.com/building-real-time-machine-learning-foundations-at-lyft-6dd99b385a4e"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.616030"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

By early 2022, Lyft had built a comprehensive Machine Learning platform called LyftLearn that included model serving, training infrastructure on Kubernetes, feature serving, CI/CD pipelines, and model monitoring systems. Despite these capabilities, the platform had a significant gap: streaming data was not supported as a first-class citizen across many of the platform's core systems including training, complex monitoring, and other ML lifecycle components.

While the platform supported real-time inference and input feature validation, teams wanting to incorporate streaming data into their ML workflows faced substantial friction. Building streaming-enabled ML applications required laborious engineering efforts that could take weeks or months to complete. This created a critical bottleneck because Lyft operates as a real-time marketplace where many teams recognized the value of enhancing their machine learning models with real-time signals to better serve customers.

The fundamental tension was clear: substantial appetite existed among hundreds of ML developers at Lyft to build real-time ML systems, but the platform lacked the foundational abstractions and tooling to make this efficient. Each team implementing streaming had to reinvent solutions and navigate the complexity of stateful distributed systems independently. This motivated the "Real-time Machine Learning with Streaming" initiative aimed at democratizing streaming ML capabilities across the organization.

## Architecture & Design

The architecture centers on a unified abstraction called `RealtimeMLPipeline` that provides a common interface for defining all real-time ML applications. This design philosophy mirrors Lyft's earlier work with LyftLearn Serving, where creating uniform training and serving environments through shared Docker images eliminated subtle runtime bugs and improved development velocity.

The team identified three core capabilities that real-time ML applications could leverage with streaming data:

- **Real-time Features**: Computing features using real-time streaming data, enabling models to react to the most current signals in Lyft's marketplace
- **Real-time Learning**: Training models with real-time streaming data to continuously adapt to changing patterns
- **Event Driven Decisions**: Making operational decisions such as retraining models, triggering alerts, or executing inference calls based on streaming data events

The Event Driven Decisions capability proved particularly valuable as a general-purpose abstraction. Shortly after implementation, another team used it to build a Real-time Anomaly Detection product, and Lyft's Mapping team leveraged it to rebuild traffic infrastructure by aggregating data per geohash and applying models. This demonstrated the utility of the abstractions for building higher-order capabilities.

A critical architectural component is the Analytics Event Abstraction layer, which enables the same `RealtimeMLPipeline` code to run uniformly across development and production environments. This abstraction intelligently switches data sources based on the execution environment: reading from warehoused data in S3 via FileSystem connectors when running in non-production environments (notebooks, local testing) and from real-time data streams via Kinesis in production.

The development workflow architecture includes an ad-hoc Flink cluster that spawns alongside Jupyter notebooks in the prototyping environment. This cluster runs the identical version of Flink via PyFlink as the production cluster, ensuring behavioral consistency. In staging and production, pipelines execute against multi-tenant production-grade Flink clusters at scale, with computed features written to Kafka which delivers them to Lyft's Feature Storage infrastructure.

The design achieves uniform behavior of complex distributed systems across two operationally distinct environments: a Kubernetes-based hosted Jupyter environment consuming event data from S3, and a Kubernetes-based production environment consuming from Kafka and Kinesis. This uniformity across the ML lifecycle enables significantly faster iteration on real-time applications.

## Technical Implementation

The technical implementation revolves around Apache Flink as the core streaming engine, accessed through PyFlink to provide a Python-native development experience for ML engineers. Lyft runs a fork of the open-source Flink project, which proved essential for making necessary customizations without waiting for upstream contributions.

The `RealtimeMLPipeline` interface is implemented as a Python object that requires minimal metadata to construct. For example, defining a real-time feature requires specifying a feature name and version, a SQL query to compute it, entity information, and a sink configuration. The code example in the source demonstrates computing `driver_accept_proportion_10m`, which calculates the proportion of notifications a driver accepts per ten-minute tumbling window using SQL operations on streaming data.

Developers write SQL queries using Flink's SQL API with temporal operations like `TUMBLE` for windowing. The pipeline object handles serialization and can be loaded across different environments. Execution is as simple as calling `pipe.run()`, with the environment automatically determining whether to use local file system outputs or production Kafka sinks.

The team made several concrete modifications to their Flink fork to support the platform's requirements:

- Added FileConnector support to read warehoused data from S3 for development environments
- Modified the order in which files are read from FileSystemConnector to better simulate streaming behavior
- Forked apache-flink-libraries to inject Java extensions supporting S3 and Hive connectivity
- Exposed the Flink UI in the prototyping environment for debugging and monitoring
- Instrumented additional statistics to diagnose issues in distributed streaming jobs
- Unpinned numpy dependencies in PyFlink to resolve compatibility issues

The infrastructure runs on Kubernetes for both development and production environments. The Jupyter-based prototyping environment includes security restrictions that prevented direct access to streaming data, which the team solved by simulating streaming with warehoused data through the Analytics Event Abstraction.

An important early investment was revamping the release process for Lyft's Flink fork to enable faster iteration and releases. This allowed the team to quickly tune the project and implement necessary changes without being blocked by upstream processes.

Data flow follows this pattern: streaming events arrive via Kinesis in production, get processed by Flink jobs running on Kubernetes task managers, with results written to Kafka topics. The Feature Storage infrastructure then consumes from Kafka to make features available for model serving. In development, the same logical flow occurs but with S3 as the data source and local file system as the sink.

## Scale & Performance

The initiative achieved dramatic improvements in development velocity. Before the real-time ML capabilities were built, developing streaming ML applications required multiple weeks of engineering effort. After the platform matured, a LyftLearn engineer could launch a new real-time ML application in just a few days—representing an order of magnitude improvement in time-to-production.

The platform serves hundreds of ML developers at Lyft across multiple engineering pillars including Rider, Driver, Marketplace, Mapping, and Safety teams. The engagement model evolved from intensive collaboration in the Alpha phase with two initial use cases—rapidly retraining a secondary model to correct ETA model bias and computing Safety Features per driver—to a self-service model where partner teams primarily follow documentation and tutorials.

The platform runs on multi-tenant production-grade Flink clusters at scale, though specific metrics on throughput, requests per second, or data volumes are not disclosed in the source material. The system handles production workloads across Lyft's real-time marketplace, processing streaming data to compute features, train models, and make event-driven decisions.

The Alpha use cases demonstrated through simulation and offline analysis that incorporating real-time data into ML models could enhance performance metrics, providing the business justification for broader rollout. The success of early adopters, including ETA and Traffic teams, Market Signals, and Trust and Safety teams, created momentum that generated a pipeline of customers from almost all engineering pillars at the company.

## Trade-offs & Lessons

The team encountered substantial technical challenges that revealed important trade-offs in building streaming ML platforms. Ensuring uniform behavior across environments proved far trickier for streaming applications than for traditional serving infrastructure. The fundamental reason: streaming systems are almost always stateful and distributed, which exponentially increases software development complexity.

The steep learning curve for streaming abstractions affected not just data scientists and software engineers, but even experienced LyftLearn engineers. Concepts in streaming are often non-intuitive, requiring the team to package interfaces to be as straightforward as possible while maintaining necessary flexibility. This design tension between simplicity and power required careful balancing.

The ephemeral nature of streaming data made back-testing challenging compared to batch processing where data persists. Security limitations preventing direct streaming data access in notebook environments required the creative solution of simulating streaming with warehoused data. Debugging stateful and distributed streaming jobs proved significantly more difficult than traditional code, with opacity caused by multiple processes comprising a single application—JVM, Python kernel, notebook pod, job manager pod, task manager pods, and others all interacting.

The team distilled key lessons for developing and scaling complex capabilities within organizations:

**Capability Validation**: Start by identifying and validating the need for capabilities through customer conversations. Ensure each new platform capability addresses an actual immediate problem rather than theoretical future needs. If demand isn't immediate, design for extensibility rather than immediate development.

**Alpha User Strategy**: Maintain customer focus early by working with multiple alpha users per capability. One alpha customer is insufficient—aim for at least two, preferably three. Close collaboration with these customers drives system evolution and validates design decisions.

**Interface Design Philosophy**: Strive for flexible yet simple interfaces upfront to avoid limitations as requirements emerge. The `RealtimeMLPipeline` interface succeeded because it abstracted complexity while remaining extensible for diverse use cases from feature computation to anomaly detection.

**Onboarding Investment**: Simplify onboarding with quick-to-setup prototyping environments and comprehensive documentation. This enables people to tinker and learn independently while providing rapid validation that the system works as intended.

**Scalable Adoption Model**: Platform success depends on scalable onboarding that doesn't require intensive hand-holding. Invest heavily in documentation as the foundation, then evangelize capabilities by pointing interested teams to the combination of documentation and prototyping environments. The evolution from intensive collaboration to self-service demonstrated this principle in action.

**Forking Strategy**: Running a fork of open-source Flink rather than depending entirely on upstream proved crucial. While the actual changes were relatively small, the ability to iterate quickly on customizations without waiting for upstream acceptance was imperative to progress. The investment in an efficient fork release process paid dividends.

The project succeeded in building abstractions that enabled higher-order abstractions—the real-time anomaly detection product and traffic infrastructure rebuilding demonstrated that the foundational platform was general enough to support unanticipated use cases. This emergence of new capabilities built on the platform validated the architectural approach and interface design.

Patience proved essential as the team gained expertise in operating and extending Flink over time. The complexity of stateful distributed systems cannot be rushed, but systematic investment in tooling, documentation, and developer experience eventually enabled democratization of streaming ML capabilities across hundreds of developers at Lyft.
