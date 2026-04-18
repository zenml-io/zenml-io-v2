---
title: "Real-time fraud ML pipeline with concept-drift handling and synchronized online/offline feature store"
slug: "binance-binances-ml-platform-real-time-fraud-ml-pipeline-with-concept-drift-handling-and-synchronized-onlineoffline-feat"
draft: false
mlopsTags:
  - "feature-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "databricks"
  - "spark"
  - "data-ingestion"
  - "deployment"
  - "feature-engineering"
  - "retraining"
  - "serving"
  - "training"
industryTags: "finance"
company: "Binance"
companySlug: "binance"
platformName: "Binance's ML platform"
contentType: "blog"
summary: "Binance's Risk AI team built a real-time end-to-end MLOps pipeline to combat fraud including account takeover, P2P scams, and stolen payment details in the cryptocurrency ecosystem. The architecture addresses two core challenges: accelerating time-to-market for ML models through efficient iteration, and managing concept drift as attackers continuously evolve their tactics. Their solution implements a layered architecture with six key components—computing layer, store layer, centralized database, model training, deployment, and monitoring—centered around an online/offline feature store that synchronizes every 10-15 minutes to prevent training-serving skew. The decoupled design separates stream and batch computing from feature ingestion, providing robustness against failures, independent scalability of components, and flexibility to adopt new technologies without disrupting existing infrastructure."
link: "https://www.binance.com/en/blog/tech/3820048062346322706"
year: 2022
seo:
  title: "Binance: Real-time fraud ML pipeline with concept-drift handling and synchronized online/offline feature store - ZenML MLOps Database"
  description: "Binance's Risk AI team built a real-time end-to-end MLOps pipeline to combat fraud including account takeover, P2P scams, and stolen payment details in the cryptocurrency ecosystem. The architecture addresses two core challenges: accelerating time-to-market for ML models through efficient iteration, and managing concept drift as attackers continuously evolve their tactics. Their solution implements a layered architecture with six key components—computing layer, store layer, centralized database, model training, deployment, and monitoring—centered around an online/offline feature store that synchronizes every 10-15 minutes to prevent training-serving skew. The decoupled design separates stream and batch computing from feature ingestion, providing robustness against failures, independent scalability of components, and flexibility to adopt new technologies without disrupting existing infrastructure."
  canonical: "https://www.zenml.io/mlops-database/binance-binances-ml-platform-real-time-fraud-ml-pipeline-with-concept-drift-handling-and-synchronized-onlineoffline-feat"
  ogTitle: "Binance: Real-time fraud ML pipeline with concept-drift handling and synchronized online/offline feature store - ZenML MLOps Database"
  ogDescription: "Binance's Risk AI team built a real-time end-to-end MLOps pipeline to combat fraud including account takeover, P2P scams, and stolen payment details in the cryptocurrency ecosystem. The architecture addresses two core challenges: accelerating time-to-market for ML models through efficient iteration, and managing concept drift as attackers continuously evolve their tactics. Their solution implements a layered architecture with six key components—computing layer, store layer, centralized database, model training, deployment, and monitoring—centered around an online/offline feature store that synchronizes every 10-15 minutes to prevent training-serving skew. The decoupled design separates stream and batch computing from feature ingestion, providing robustness against failures, independent scalability of components, and flexibility to adopt new technologies without disrupting existing infrastructure."
mlops:
  source: "sqlite"
  entryId: 143
  sourceUrl: "https://www.binance.com/en/blog/tech/3820048062346322706"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061849"
  lastUpdated: "2026-04-14T19:55:27.552961"
---

## Problem Context

Binance's Risk AI team faces the challenge of building machine learning services that can effectively combat sophisticated fraud scenarios in the cryptocurrency space, including account takeover fraud, peer-to-peer scams, and stolen payment details. These use cases present two fundamental MLOps challenges that motivated their comprehensive pipeline architecture.

The first challenge centers on velocity and iteration speed. Creating ML services is inherently iterative—data scientists continuously experiment to improve specific metrics, whether offline or online, with the ultimate objective of delivering business value. The team needed infrastructure that could shorten the time-to-market for ML models and enable rapid experimentation without sacrificing production reliability.

The second, more nuanced challenge relates to concept drift. Unlike traditional software systems where behavior is determined solely by code, ML services are fundamentally affected by the data they consume. In the fraud domain, this challenge is particularly acute because attackers are not static adversaries but adaptive humans who constantly evolve their attack vectors. As fraudsters change their tactics, the underlying data distribution shifts to reflect new attack patterns. The team needed mechanisms to ensure production models continuously incorporate the latest data patterns without manual intervention.

These challenges align with concepts outlined in Google's seminal paper on hidden technical debt in machine learning systems. Binance adopted MLOps principles, a framework initially proposed by Google in 2018, which emphasizes not just model performance but the infrastructure supporting production systems. This holistic approach enables the team to build ML services that are scalable, highly available, reliable, and maintainable.

## Architecture & Design

Binance's real-time end-to-end ML pipeline is architected as a standard operating procedure for real-time model development centered around a feature store. The architecture balances functional requirements (data processing, model training, model development, deployment, and monitoring) with non-functional requirements (scalability, high availability, reliability, and maintainability).

The pipeline consists of six interconnected components that form a coherent data flow from raw events through feature engineering to model serving and monitoring.

### Computing Layer

The computing layer handles feature engineering, transforming raw data into useful features for ML models. Binance categorizes this layer into two computational paradigms based on update frequency. Stream computing processes features at one-minute or one-second intervals, providing near real-time feature updates. Batch computing operates on daily or hourly schedules for features that don't require sub-minute freshness.

Input data for the computing layer originates from two primary sources. Event-based databases include Apache Kafka and AWS Kinesis, which capture streaming events in real-time. OLAP databases provide analytical data stores, with Apache Hive serving open-source deployments and Snowflake handling cloud-based solutions. This dual-source approach allows the team to leverage both real-time event streams and historical analytical data.

### Store Layer and Intermediate Buffer

The store layer manages feature definitions and deploys them into the feature store. A critical capability of this layer is backfill, which allows data scientists to rebuild features using historical data whenever new features are defined. Backfill typically runs as a one-time job that scientists can execute from a notebook environment.

A distinctive architectural decision is the deliberate placement of an intermediate layer—Hive and Kafka—between the computing and store layers. This intermediate buffer decouples producers (stream computing) from consumers (stream ingestion). The separation provides several architectural benefits that exemplify thoughtful systems design.

Kafka's retention limitation of seven days necessitates a backup mechanism into S3 or Hive tables, increasing fault tolerance. If either the ingestion or computing layer becomes unavailable due to operational issues, hardware failures, or network problems, data scientists can still retrieve feature values from the centralized database. This decoupling enhances pipeline robustness.

The architecture also enables independent scaling of different infrastructure components, reducing the operational burden. If the ingestion layer fails, it doesn't block the computing layer from continuing its work. This independence extends to technology adoption—the team can experiment with new technologies, such as upgraded Flink application versions, without impacting existing infrastructure.

Both the computing and store layers implement automated feature pipelines that operate independently on varying schedules. Batch pipelines might refresh one feature group nightly while updating another hourly. Streaming pipelines update feature groups in real-time as source data arrives on input streams like Apache Kafka topics.

### Centralized Database with Dual Feature Stores

The centralized database layer houses the online and offline feature stores, which serve distinct but complementary purposes in the ML lifecycle.

The online feature store is optimized for low latency and high availability, enabling real-time lookups during model inference. This store powers production scoring services that must respond to requests with minimal delay.

The offline feature store provides a secure, scalable repository of all feature data with complete historical records. Data scientists use this store to create training, validation, and batch-scoring datasets from centrally-managed feature groups. The full historical record in the object storage system enables point-in-time queries and temporal analysis.

A critical design decision is the automatic synchronization between online and offline feature stores every 10-15 minutes. This synchronization mechanism directly addresses training-serving skew, ensuring that features used during model training closely match those available during inference. The relatively short synchronization interval balances data freshness with system overhead.

### Model Training with Feedback Loop

The model training layer enables data scientists to extract training data from the offline feature store for model development and fine-tuning. The team uses point-in-time queries during extraction to prevent data leakage, a critical safeguard for maintaining model validity.

The training layer incorporates a model-retraining feedback loop, which serves as the primary mechanism for managing concept drift. This feedback loop ensures deployed models accurately represent the latest data patterns, automatically adapting as attacker behaviors evolve. The continuous retraining minimizes the risk of model degradation over time.

### Model Deployment and Inference

Binance primarily uses a cloud-based scoring service as the backbone for real-time data serving. The inference code integrates directly with the online feature store, retrieving features at serving time. This integration ensures that models have access to the most recent feature values when making predictions, maintaining consistency with the training environment.

### Model Monitoring

The monitoring layer tracks multiple dimensions of model and system health. Usage metrics include queries per second (QPS), latency, memory consumption, and CPU/GPU utilization rates. These operational metrics ensure the serving infrastructure maintains performance under production loads.

Beyond basic infrastructure metrics, the team monitors ML-specific concerns using captured data. They track feature distribution over time to detect statistical shifts, monitor training-serving skew to identify divergence between training and production environments, and measure prediction drift to ensure minimal concept drift. This comprehensive monitoring approach provides early warning signals when models begin to degrade.

## Technical Implementation

Binance's implementation leverages a diverse technology stack chosen for specific capabilities at each layer of the architecture.

For stream processing and event handling, the team uses Apache Kafka and AWS Kinesis as event-based databases. These systems capture real-time events that feed the stream computing layer. For stream processing frameworks, Apache Flink appears to be the primary choice, with the team explicitly mentioning the ability to experiment with new Flink versions.

The batch processing infrastructure uses Apache Hive for open-source deployments and Snowflake for cloud-based analytical workloads. These OLAP databases provide the historical data foundation for batch feature computation.

Storage infrastructure includes S3 for object storage, serving as both backup for Kafka events and long-term storage for the offline feature store. Hive tables also serve as backup storage, providing an alternative to S3 in certain deployments.

The feature store implementation follows a dual-store pattern with online and offline variants. While the specific feature store technology isn't explicitly named, the architecture describes a custom or configured solution that handles automated synchronization, backfill capabilities, and point-in-time queries.

The inference layer runs on cloud-based scoring services, suggesting a cloud-native deployment model. The scoring services integrate directly with the online feature store for real-time feature retrieval during inference.

Data scientists interact with the platform through notebook environments, which provide the interface for defining features, running backfill jobs, extracting training data, and conducting experiments.

## Scale & Performance

While the article doesn't provide extensive quantitative metrics, several performance characteristics emerge from the description.

The synchronization interval between online and offline feature stores operates at 10-15 minutes, striking a balance between data freshness and system overhead. This relatively tight synchronization window suggests the infrastructure can handle frequent updates across potentially large feature sets.

Stream computing operates at one-minute or one-second intervals, indicating the system handles near real-time feature updates for time-sensitive fraud detection scenarios. Batch computing runs on daily or hourly schedules for features with less stringent freshness requirements.

Kafka's seven-day retention window represents a practical constraint that influenced the backup architecture. The team addresses this limitation by persisting events to S3 or Hive tables for longer-term storage.

The monitoring layer tracks standard performance metrics including QPS, latency, memory, and CPU/GPU utilization, suggesting the infrastructure serves production traffic at scale, though specific throughput numbers aren't disclosed.

The fact that Binance explicitly built this infrastructure to protect "the world's largest crypto ecosystem" implies substantial scale, though concrete numbers about request volumes, feature counts, or model cardinality aren't provided in this article.

## Trade-offs & Lessons

Binance's architecture embodies several deliberate trade-offs that offer lessons for practitioners building MLOps infrastructure.

### Decoupling as a Core Design Principle

The most prominent architectural decision is the loose coupling between layers, particularly the intermediate buffer between computing and ingestion. This decoupling provides three key benefits explicitly called out by the team: more robust pipelines in case of failures, increased flexibility in choosing which tools to implement, and independently scalable components.

The robustness benefit is concrete—when ingestion fails, computing continues processing data, and data scientists can still access features from the centralized database. This fault tolerance prevents cascading failures that could take down the entire pipeline.

The flexibility benefit enables technology experimentation without risk. The team can test new versions of Flink or other processing frameworks without jeopardizing production systems. This architectural insurance policy reduces the cost of innovation.

Independent scalability means different components can be scaled based on their specific bottlenecks rather than scaling the entire system. This granular control improves resource efficiency and reduces operational costs.

However, this decoupling introduces complexity. The intermediate Kafka and Hive layer requires additional operational overhead and monitoring. The team must maintain consistency across multiple storage systems and ensure the buffer doesn't become a bottleneck or single point of failure.

### Dual Feature Store Architecture

The decision to maintain separate online and offline feature stores reflects a common pattern in production ML systems. The online store optimizes for low-latency lookups during inference, while the offline store optimizes for historical analysis and training dataset creation.

The 10-15 minute synchronization interval represents a trade-off between data freshness and system load. More frequent synchronization would reduce training-serving skew but increase infrastructure costs and operational complexity. The team judged that 10-15 minutes provides sufficient freshness for their use cases while keeping overhead manageable.

The synchronization mechanism doesn't guarantee perfect consistency—there's always a window where online and offline stores diverge. This eventual consistency model requires careful consideration during model development to ensure training datasets reflect realistic production conditions.

### Automated Retraining for Concept Drift

The model-retraining feedback loop addresses concept drift proactively rather than reactively. This automation reduces the operational burden on data scientists and ensures models stay current as fraud patterns evolve. The team explicitly calls out this capability as essential for their use case, where attackers continuously adapt their tactics.

However, automated retraining introduces risks. Models could inadvertently learn from poisoned data or temporary anomalies. The monitoring layer helps mitigate this risk by tracking prediction drift and feature distributions, but the team must balance automation with human oversight.

### Point-in-Time Queries and Data Leakage Prevention

Using point-in-time queries during training data extraction prevents temporal data leakage, a subtle but critical requirement for time-series ML problems. This capability requires the offline feature store to maintain complete historical records with timestamps, increasing storage costs but ensuring model validity.

The backfill capability allows data scientists to rebuild historical features when definitions change, enabling experimentation with new feature engineering approaches. This flexibility accelerates iteration but requires careful management to avoid inconsistent feature versions across experiments.

### Technology Stack Diversity

The architecture combines open-source tools (Apache Kafka, Hive, Flink) with cloud-managed services (Kinesis, Snowflake, cloud-based scoring). This hybrid approach leverages the flexibility and cost advantages of open-source software while using managed services for operational simplicity in specific areas.

The diversity introduces integration challenges and requires broader expertise across the team. However, it provides vendor independence and allows the team to optimize each component based on specific requirements rather than being constrained by a single vendor's ecosystem.

### Observability and Monitoring

The comprehensive monitoring layer tracks both infrastructure metrics (QPS, latency, resource utilization) and ML-specific metrics (feature distribution, training-serving skew, prediction drift). This dual focus recognizes that ML systems fail differently than traditional software—models can degrade silently without infrastructure failures.

The monitoring investment provides early warning signals but requires establishing baselines and thresholds for alerting. The team must balance sensitivity (catching issues early) with specificity (avoiding alert fatigue from false positives).

## Key Insights for Practitioners

Several lessons emerge from Binance's architecture that generalize to other MLOps implementations.

Loose coupling between pipeline stages provides genuine operational benefits beyond theoretical system design principles. The ability to iterate on components independently, recover from failures gracefully, and scale selectively justifies the additional architectural complexity.

The dual feature store pattern with regular synchronization directly addresses training-serving skew, one of the most pernicious sources of ML model degradation in production. The 10-15 minute synchronization interval provides a concrete reference point for teams designing similar systems.

Automated retraining feedback loops are essential for use cases where concept drift is expected rather than exceptional. In fraud detection and similar adversarial domains, building automation into the architecture is more effective than relying on manual retraining processes.

The intermediate buffer between computing and storage layers exemplifies the producer-consumer pattern applied thoughtfully to ML infrastructure. This pattern provides resilience and flexibility that justify the operational overhead.

Comprehensive monitoring must span both infrastructure and ML-specific metrics. Tracking feature distributions, skew, and drift alongside traditional system metrics provides the observability needed to maintain production ML systems effectively.

The architecture represents a mature MLOps implementation that balances theoretical best practices with practical operational concerns. The team's emphasis on automation, decoupling, and comprehensive monitoring reflects lessons learned from operating ML systems at scale in a high-stakes production environment.
