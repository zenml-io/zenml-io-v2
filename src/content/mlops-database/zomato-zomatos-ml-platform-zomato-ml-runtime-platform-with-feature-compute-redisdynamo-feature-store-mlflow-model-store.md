---
title: "Zomato ML Runtime platform with feature compute, Redis/Dynamo feature store, MLflow model store, and Go API gateway for real-time serving"
slug: "zomato-zomatos-ml-platform-zomato-ml-runtime-platform-with-feature-compute-redisdynamo-feature-store-mlflow-model-store"
draft: false
mlopsTags:
  - "compute-management"
  - "feature-store"
  - "model-registry"
  - "model-serving"
  - "pipeline-orchestration"
  - "docker"
  - "kubernetes"
  - "mlflow"
  - "spark"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "Zomato"
companySlug: "zomato"
platformName: "Zomato's ML platform"
contentType: "blog"
summary: "Zomato built a comprehensive ML Runtime platform to scale machine learning across their food delivery ecosystem, addressing challenges in deploying models for real-time predictions like delivery times, food preparation estimates, and personalized recommendations. Their platform consists of four core components: a Feature Compute Engine that processes both real-time features via Apache Kafka and Flink and batched features via Apache Spark, a Feature Store using Redis Cluster and DynamoDB, a Model Store powered by MLFlow for standardized model management, and a Model Serving API Gateway written in Golang that decouples feature logic from client applications. This infrastructure enabled the team to reduce model deployment time to under 24 hours, achieve 18 million requests per minute throughput during load testing (a 3X improvement year-over-year), and deploy seven major ML systems including personalized recommendations, food preparation time prediction, delivery partner dispatch optimization, and automated menu digitization."
link: "https://blog.zomato.com/elements-of-scalable-machine-learning"
year: 2021
seo:
  title: "Zomato: Zomato ML Runtime platform with feature compute, Redis/Dynamo feature store, MLflow model store, and Go API gateway for real-time serving - ZenML MLOps Database"
  description: "Zomato built a comprehensive ML Runtime platform to scale machine learning across their food delivery ecosystem, addressing challenges in deploying models for real-time predictions like delivery times, food preparation estimates, and personalized recommendations. Their platform consists of four core components: a Feature Compute Engine that processes both real-time features via Apache Kafka and Flink and batched features via Apache Spark, a Feature Store using Redis Cluster and DynamoDB, a Model Store powered by MLFlow for standardized model management, and a Model Serving API Gateway written in Golang that decouples feature logic from client applications. This infrastructure enabled the team to reduce model deployment time to under 24 hours, achieve 18 million requests per minute throughput during load testing (a 3X improvement year-over-year), and deploy seven major ML systems including personalized recommendations, food preparation time prediction, delivery partner dispatch optimization, and automated menu digitization."
  canonical: "https://www.zenml.io/mlops-database/zomato-zomatos-ml-platform-zomato-ml-runtime-platform-with-feature-compute-redisdynamo-feature-store-mlflow-model-store"
  ogTitle: "Zomato: Zomato ML Runtime platform with feature compute, Redis/Dynamo feature store, MLflow model store, and Go API gateway for real-time serving - ZenML MLOps Database"
  ogDescription: "Zomato built a comprehensive ML Runtime platform to scale machine learning across their food delivery ecosystem, addressing challenges in deploying models for real-time predictions like delivery times, food preparation estimates, and personalized recommendations. Their platform consists of four core components: a Feature Compute Engine that processes both real-time features via Apache Kafka and Flink and batched features via Apache Spark, a Feature Store using Redis Cluster and DynamoDB, a Model Store powered by MLFlow for standardized model management, and a Model Serving API Gateway written in Golang that decouples feature logic from client applications. This infrastructure enabled the team to reduce model deployment time to under 24 hours, achieve 18 million requests per minute throughput during load testing (a 3X improvement year-over-year), and deploy seven major ML systems including personalized recommendations, food preparation time prediction, delivery partner dispatch optimization, and automated menu digitization."
mlops:
  source: "sqlite"
  entryId: 104
  sourceUrl: "https://blog.zomato.com/elements-of-scalable-machine-learning"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061432"
  lastUpdated: "2026-04-14T19:55:07.503484"
---

## Problem Context

Zomato faced the classic challenge of bridging the gap between machine learning experimentation and production deployment at scale. Despite having established data infrastructure with a functioning data lake and continuous event streams, the organization struggled with what they describe as an "overweight" ML Runtime that made the road to production "distant, broken and hard." The fundamental challenge was enabling real-time personalization and predictions across multiple business problems while maintaining sub-second latency. The company needed to predict delivery times, food preparation durations, optimal delivery partner assignments, content quality (identifying food photos, checking delivery partner grooming and mask compliance), and detect fake reviews—all in real-time or near-real-time to drive better customer experience and business outcomes.

The core MLOps challenges Zomato identified centered around formalizing model training and deployment processes to increase team cadence, enabling faster turnaround times, more experimentation, and ultimately better models. Without a well-architected ML Runtime, the organization couldn't effectively integrate ML into daily operating activities at the scale required for competitive differentiation in the food delivery market.

## Architecture & Design

Zomato's ML Runtime architecture consists of four essential, interconnected components that form a cohesive platform for scalable machine learning operations.

The **Feature Compute Engine** operates as a dual-path system handling both real-time and batched feature computation. Real-time features are computed from event streams published on Apache Kafka and processed by Apache Flink, a stream processing engine that enables low-latency feature calculations. Batched features follow a different path, computed using Apache Spark for large-scale data processing jobs. This dual-path approach allows the platform to balance between the immediacy required for real-time predictions and the computational efficiency of batch processing for less time-sensitive features.

The **Feature Store** architecture implements a clear separation between online and offline storage optimized for different access patterns. The Online Feature Store leverages Redis Cluster for ultra-low latency feature retrieval during prediction serving. The Offline Feature Store uses DynamoDB as the primary storage layer, with hot features cached in Redis Cluster to optimize retrieval performance for frequently accessed data. This two-tier storage strategy enables the system to handle both training workflows (which can tolerate higher latency and need historical feature access) and serving workflows (which demand sub-second response times).

The **Model Store** standardizes model artifacts across the organization using MLFlow as the registry system. All production models are converted to a standard format regardless of their original ML library (TensorFlow, PyTorch, LightGBM, or scikit-learn). This standardization creates a crucial decoupling layer that allows Zomato to build tools that work uniformly across different modeling frameworks without requiring custom integration for each library-tool combination.

The **Model Serving API Gateway** represents a key architectural innovation designed to solve the tight coupling problem between model features and production models. Written in Golang, this gateway implements a workflow engine that executes directed acyclic graphs (DAGs) of tasks. The gateway has native integration with the Feature Store, meaning it's responsible for fetching the necessary features for each model based on incoming requests according to the model's specified plan. This design makes client applications agnostic to the specific feature requirements and logic of individual models. When teams redeploy retrained models or deploy new models to solve the same problem, API requests to the gateway typically remain unchanged, providing tremendous flexibility for rapid experimentation and deployment.

The production deployment infrastructure runs on Kubernetes in the cloud, utilizing container orchestration to manage model serving workloads. The models are primarily tuned for CPU inference rather than GPU, and the infrastructure leverages spot instances in the Kubernetes cluster to optimize costs. This setup provides elasticity and scalability across multiple production models while maintaining cost efficiency.

## Technical Implementation

The technical stack reveals deliberate choices optimized for Zomato's scale and latency requirements. The streaming pipeline uses Apache Kafka as the messaging backbone with Apache Flink handling stream processing for real-time feature computation. This combination is industry-standard for high-throughput, low-latency event processing and provides exactly-once semantics critical for financial and operational features.

For batch processing, Apache Spark serves as the compute engine, enabling distributed processing of large-scale feature engineering jobs. The Feature Store's storage layer combines Redis Cluster for in-memory, microsecond-latency access with DynamoDB for durable, scalable storage of the full feature catalog. Redis serves as both the primary Online Feature Store and as a cache layer for hot features from DynamoDB, creating a multi-tier caching strategy.

MLFlow provides the model registry functionality, offering versioning, lineage tracking, and standardized model packaging. The standardization to MLFlow's format across different ML frameworks (TensorFlow, PyTorch, LightGBM, scikit-learn) creates operational efficiency by allowing teams to use the same deployment tooling regardless of modeling approach.

The Model Serving API Gateway implementation in Golang leverages the language's strong concurrency primitives and low overhead, making it well-suited for high-throughput request routing and feature fetching. The DAG-based workflow engine within the gateway provides flexibility to compose complex serving logic involving multiple feature retrievals and transformations.

Kubernetes orchestration enables containerized deployment with autoscaling capabilities. The choice to use CPU-optimized models with spot instances reflects a cost-performance trade-off where inference latency requirements can be met without expensive GPU infrastructure, and the distributed nature of the workload tolerates the occasional interruption of spot instances.

Specific models deployed on this infrastructure include:

- **Menu Digitization**: A multi-model pipeline combining Text Detection, Optical Character Recognition (OCR), Section Detection, and Dish Classifier models processing menu images. These appear to use convolutional neural networks for image understanding tasks.

- **Personalized Homepage**: LGBMRanker, the LambdaMART implementation from the LightGBM library, powers restaurant recommendations optimized for order-through rate (OTR).

- **Multi-objective Optimization**: Contextual Multi-Armed Bandit with Bayesian Regression implements reinforcement learning for balancing multiple business objectives (GMV and AOV optimization alongside OTR).

- **Food Preparation Time Prediction**: A Bidirectional LSTM deep learning model processes sequential features including dish quantities, types, restaurant behavior, temporal patterns, and footfall data for real-time FPT prediction.

- **Active DP Dispatch**: A Deep Q-Network-based multi-agent reinforcement learning model recommends locations to free delivery partners to balance supply and demand.

- **DP Grooming Audit**: Convolutional neural networks combined with image processing algorithms handle classification tasks for mask detection, asset verification (t-shirt and bag presence), implemented in a multi-stage pipeline.

## Scale & Performance

The quantitative metrics provided demonstrate production-scale operations. During load testing in preparation for 2021 New Year's Eve, the Feature Store handled approximately 18 million requests per minute with acceptable performance and latency characteristics. This represented a 3X improvement compared to the previous year's New Year's Eve capacity, indicating significant infrastructure maturation.

The system architecture enabled reduction of model deployment time to under 24 hours from ideation to production serving. This deployment velocity represents a critical operational metric, as faster deployment cycles enable more rapid experimentation and iteration.

Specific business impact metrics from deployed models include:

- The multi-objective optimization approach using Contextual MAB increased GMV per app open by INR 3 and average order value (AOV) by INR 6, demonstrating measurable revenue impact from ML systems.

- Menu digitization enabled automated dish-level search improvements and accelerated content team productivity in menu creation for online ordering.

- Active Dispatch increased the percentage of orders delivery partners received when following recommendations and decreased the time between completed delivery and next order assignment.

The DP grooming audit system processes selfies submitted during login and delivery flows in real-time, providing immediate feedback. The automation reduced manual moderation costs while enabling more frequent audits at scale.

The infrastructure supports multiple concurrent models across different domains (ranking, prediction, reinforcement learning, computer vision, NLP) all served through the unified ML Runtime. This multi-tenancy demonstrates the platform's flexibility and generalization beyond single-use-case systems.

## Trade-offs & Lessons

Several key architectural decisions reflect important trade-offs in building scalable ML infrastructure.

**Decoupling through standardization** emerges as a central theme. By standardizing all models to MLFlow format regardless of training framework, Zomato sacrificed some framework-specific optimizations in exchange for operational simplicity. This trade-off proves worthwhile at scale, as the ability to build common tooling across frameworks reduces maintenance burden and cognitive load on ML engineers. The same decoupling principle applies to the API Gateway design, where abstracting feature fetching logic from client applications adds an extra hop in the serving path but dramatically improves deployment velocity and reduces coordination costs.

**CPU vs GPU inference** represents a conscious cost-performance optimization. Most models are tuned for CPU inference, avoiding the expense of GPU infrastructure. This works because the serving latency requirements (sub-second, not sub-millisecond) can be met with CPU inference when combined with proper feature caching and efficient model architectures. The use of spot instances further reduces costs by tolerating occasional instance interruptions in exchange for significantly lower compute costs, which Kubernetes orchestration makes operationally feasible.

**Two-tier storage architecture** in the Feature Store balances cost, latency, and durability. DynamoDB provides durable, scalable storage while Redis Cluster delivers microsecond-latency access. The hot feature caching strategy avoids over-provisioning expensive in-memory storage while maintaining low latency for frequently accessed features. This tiered approach requires additional complexity in cache invalidation and consistency management but proves economical at scale.

**Real-time vs batch feature computation** creates architectural complexity with two parallel pipelines (Kafka/Flink and Spark) but allows appropriate tool selection for different temporal requirements. Stream processing for real-time features enables immediate availability of fresh signals while batch processing provides computational efficiency for features that don't require second-by-second updates.

**The DAG-based serving gateway** adds orchestration complexity but solves a critical operational problem: the tight coupling between models and their feature dependencies. By moving this logic into a centralized gateway, Zomato enables ML teams to iterate on models without coordinating with all downstream client teams. This architectural investment pays dividends in deployment velocity, as evidenced by the sub-24-hour deployment timeline.

Key lessons for practitioners include the importance of investing in platform infrastructure before scaling ML team headcount. The article emphasizes that a "small team of highly motivated explorers" accomplished significant model deployment across seven major use cases, suggesting that good infrastructure multiplies team effectiveness. The focus on deployment velocity (sub-24-hour timeline) as a north star metric rather than just model accuracy or infrastructure cost reflects mature MLOps thinking where business value comes from rapid iteration rather than perfect first attempts.

The decision to build a unified ML Runtime rather than point solutions for individual models demonstrates platform thinking. While this requires upfront investment, the reusability across use cases (ranking, time series prediction, computer vision, reinforcement learning) justifies the abstraction. However, this approach requires organizational commitment and may not suit organizations with fewer ML use cases or lower deployment frequency requirements.

The article reveals an evolution from manual processes to automated systems while retaining manual moderation as a backstop (mentioned in DP grooming audit context). This hybrid approach acknowledges that automation doesn't require eliminating human judgment entirely but rather augmenting it and reducing bottlenecks. The real-time feedback enabled by automated systems improves user experience beyond what pure manual moderation could achieve at scale.

Overall, Zomato's ML Runtime represents a mature, production-grade platform that prioritizes operational concerns (deployment velocity, standardization, decoupling) alongside traditional ML concerns (model accuracy, latency). The architecture demonstrates how thoughtful infrastructure investment enables a small team to deliver significant business impact across diverse ML applications.
