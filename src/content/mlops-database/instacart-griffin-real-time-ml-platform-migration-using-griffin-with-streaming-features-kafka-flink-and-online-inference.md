---
title: "Real-time ML platform migration using Griffin with streaming features (Kafka, Flink) and online inference to replace batch serving"
slug: "instacart-griffin-real-time-ml-platform-migration-using-griffin-with-streaming-features-kafka-flink-and-online-inference"
draft: false
mlopsTags:
  - "feature-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "deployment"
  - "feature-engineering"
  - "serving"
industryTags: "e-commerce"
company: "Instacart"
companySlug: "instacart"
platformName: "Griffin"
contentType: "blog"
summary: "Instacart transitioned its machine learning infrastructure from batch-oriented systems to a real-time ML platform to address critical limitations including stale predictions, inefficient resource usage, limited coverage, and response lag in their four-sided marketplace. The transformation involved two major transitions: moving from precomputed prediction serving to real-time inference using an Online Inference Platform and unified interface called Griffin, and implementing real-time feature processing using streaming technologies including Kafka for event storage and Flink for stream processing, all integrated with a Feature Store for on-demand access. The platform now processes terabytes of event data daily, generates features with latency in seconds rather than hours, serves hundreds of models in real-time, and has enabled applications like real-time item availability, session-based recommendations, and fraud detection that have driven considerable gross transaction value growth while reducing millions in fraud-related costs annually."
link: "https://www.instacart.com/company/how-its-made/lessons-learned-the-journey-to-real-time-machine-learning-at-instacart/"
year: 2022
seo:
  title: "Instacart: Real-time ML platform migration using Griffin with streaming features (Kafka, Flink) and online inference to replace batch serving - ZenML MLOps Database"
  description: "Instacart transitioned its machine learning infrastructure from batch-oriented systems to a real-time ML platform to address critical limitations including stale predictions, inefficient resource usage, limited coverage, and response lag in their four-sided marketplace. The transformation involved two major transitions: moving from precomputed prediction serving to real-time inference using an Online Inference Platform and unified interface called Griffin, and implementing real-time feature processing using streaming technologies including Kafka for event storage and Flink for stream processing, all integrated with a Feature Store for on-demand access. The platform now processes terabytes of event data daily, generates features with latency in seconds rather than hours, serves hundreds of models in real-time, and has enabled applications like real-time item availability, session-based recommendations, and fraud detection that have driven considerable gross transaction value growth while reducing millions in fraud-related costs annually."
  canonical: "https://www.zenml.io/mlops-database/instacart-griffin-real-time-ml-platform-migration-using-griffin-with-streaming-features-kafka-flink-and-online-inference"
  ogTitle: "Instacart: Real-time ML platform migration using Griffin with streaming features (Kafka, Flink) and online inference to replace batch serving - ZenML MLOps Database"
  ogDescription: "Instacart transitioned its machine learning infrastructure from batch-oriented systems to a real-time ML platform to address critical limitations including stale predictions, inefficient resource usage, limited coverage, and response lag in their four-sided marketplace. The transformation involved two major transitions: moving from precomputed prediction serving to real-time inference using an Online Inference Platform and unified interface called Griffin, and implementing real-time feature processing using streaming technologies including Kafka for event storage and Flink for stream processing, all integrated with a Feature Store for on-demand access. The platform now processes terabytes of event data daily, generates features with latency in seconds rather than hours, serves hundreds of models in real-time, and has enabled applications like real-time item availability, session-based recommendations, and fraud detection that have driven considerable gross transaction value growth while reducing millions in fraud-related costs annually."
mlops:
  source: "sqlite"
  entryId: 138
  sourceUrl: "https://www.instacart.com/company/how-its-made/lessons-learned-the-journey-to-real-time-machine-learning-at-instacart/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061798"
  lastUpdated: "2026-04-14T19:55:25.524508"
---

## Problem Context

Instacart operates a four-sided marketplace connecting customers seeking rapid grocery delivery (as fast as 30 minutes), shoppers fulfilling orders, retailers managing real-time catalog updates, and brand partners participating in advertising auctions. The shopping journey relies on hundreds of machine learning models operating in real-time, making the freshness of predictions and features critical to business success.

The company initially built batch-oriented ML systems leveraging existing batch infrastructure, which was a natural starting point for a growing company. These systems had two defining characteristics: models only accessed batch features extracted from historical data through batch processing, and predictions were generated offline in batches then consumed either for analytics or online via lookup tables. While this approach allowed machine learning engineers to write model outputs to database tables for application consumption without complex infrastructure, it created severe limitations that became increasingly problematic as the business evolved.

The batch-oriented approach suffered from five critical pain points. First, precomputed predictions provided stale responses based on past requests rather than current context, causing batch predictions to perform poorly on new queries. Second, generating daily predictions for all customers wasted resources since many customers weren't active every day. Third, the system provided limited coverage because caching predictions for all user-item pairs was impossible due to large cardinality, forcing truncation of long-tail pairs. Fourth, models couldn't respond to recent changes because real-time features like current shopping session intent and real-time product availability were inaccessible. Fifth, data freshness directly impacted model quality, and without up-to-date signals like supply and demand, the fulfillment process became suboptimal, leading to inefficient resource allocation due to decision-making lag.

As Instacart introduced product innovations emphasizing personalization and inspiration, capturing and serving dynamic features in real-time became essential rather than optional. This drove the need for two major platform transitions: moving from serving precomputed predictions to real-time serving, and transitioning from batch features to real-time features.

## Architecture and Design

The evolution of Instacart's ML platform progressed through three distinct architectural phases, each addressing specific limitations while building on previous capabilities.

The initial batch-oriented architecture generated predictions offline in batches. Models consumed batch features extracted from historical data, produced predictions that were written to database tables, and applications read these precomputed predictions either offline for analytics or online via lookup tables. This simple architecture required minimal infrastructure but couldn't meet the demands of a dynamic real-time marketplace.

The first major transition introduced real-time serving while maintaining batch features. This architecture incorporated two critical platform components: a Feature Store functioning as a key-value store for fast feature retrieval, and an Online Inference Platform hosting each model as an RPC (Remote Procedure Call) endpoint. The Feature Store provided low-latency access to batch features, while the Online Inference Platform enabled applications to request predictions on-demand rather than relying on precomputed results. This eliminated staleness, improved coverage for long-tail queries, and optimized resource utilization by only generating predictions when needed.

The final architecture added real-time feature processing to complement real-time serving. This introduced a streaming pipeline with several components working in concert. Services publish raw events to Kafka, which serves as centralized event storage. Flink consumes these events, transforms them into desired features through stream processing, and sinks the processed features into the Feature Store for on-demand access. When applications need predictions, they call the Online Inference Platform, which retrieves both batch and real-time features from the Feature Store, performs feature engineering, executes model inference, and returns predictions with tight latency budgets.

The data flow for real-time ML follows this path: application services generate events during user interactions, these events flow to Kafka within hundreds of milliseconds, Flink processes streams to compute real-time features, features are stored in the Feature Store with second-level latency (compared to hours previously), applications request predictions via the Online Inference Platform, the platform retrieves features from the Feature Store, performs inference, and returns results to the requesting service.

This architecture separates concerns between event storage (Kafka) and event computation (Flink), following the principle of separation of concerns. The modular design adopts the best tools for each job while providing ground truth reference for all events in single, durable storage with consistent format and configurable retention periods. This separation makes data audit and compliance review easier and supports event replay within retention periods when needed.

## Technical Implementation

Instacart made several specific technology choices that shaped their real-time ML platform. For the Online Inference Platform, they selected an RPC framework already widely used at Instacart for inter-service communications. This framework choice was strategic because it supported communication between multiple languages including Ruby, Scala, Python, and Go, allowing machine learning engineers to work in their preferred languages while maintaining consistency in how services communicate.

The unified interface called Griffin became the cornerstone of the serving infrastructure. Griffin provided standard workflow templates, integrated best practices like unit tests and integration tests, enabled canary deployments for safe model rollouts, and created a single entrypoint for standardizing monitoring, observability, and reliability processes. By reducing the learning curve through templates and fast troubleshooting tools, Griffin made real-time serving accessible to machine learning engineers who previously only worked with batch systems.

For real-time feature processing, the team faced a challenging landscape where different organizations had adopted three different streaming tools based on their varying needs from simple notifications to analytics. Rather than forcing standardization on a single streaming platform, they chose Kafka as centralized event storage to consolidate all raw events in consistent format. This pragmatic decision introduced some extra latency (usually within a few hundred milliseconds) and consumed additional resources, but provided critical benefits. Centralized storage scaled quickly and avoided building multiple interfaces between real-time ML systems and different streaming backends. It also didn't disrupt existing event usage patterns while enabling integration of schema validation and data quality checks.

Flink was selected for stream processing and feature transformation. The choice reflects Flink's strength in the JVM ecosystem (Java and Scala), though this created learning curve challenges since machine learning engineers and data scientists typically prefer Python. The team acknowledged this trade-off, recognizing that streaming technologies work best in JVM with suboptimal Python support, but the performance and capabilities justified the steeper learning curve.

The Feature Store serves as the central repository for both batch and real-time features, providing key-value store functionality optimized for low-latency retrieval. While the specific Feature Store technology isn't mentioned, the implementation supports second-level latency for real-time features compared to hour-level latency in the previous batch system.

The development process evolved significantly to accommodate streaming. Setting up development environments for stream processing proved more involved than batch processing. The team addressed this by forming cross-functional working groups early in the transition, bringing together experts in product/business development, streaming technologies, and ML development. These working groups were critical for discussing and reaching decisions that addressed existing challenges in enabling real-time ML.

## Scale and Performance

The real-time ML platform at Instacart operates at substantial scale with measurable performance improvements across multiple dimensions. The platform processes terabytes of event data per day flowing through Kafka and Flink, though the specific throughput numbers aren't detailed. Feature generation latency improved dramatically from hours to seconds, representing roughly three orders of magnitude improvement in freshness.

The platform serves hundreds of models in real-time through the Online Inference Platform. Each model operates as an RPC endpoint capable of handling synchronous prediction requests with tight latency budgets necessary for user-facing applications. The latency requirements are strict because users expect immediate responses when browsing, searching, and shopping, making millisecond-level response times critical for acceptable user experience.

Real-time item availability emerged as the foundational use case, updating availability scores in seconds compared to a couple of hours previously. This application alone directly improved item found rate, reduced bad orders, and increased customer satisfaction. The business impact extends beyond user experience to measurable financial outcomes.

Session-based recommendation and personalization models make predictions within shopping sessions in real-time, using real-time user impression data to make the Instacart storefront more fresh and dynamic. By removing items that wouldn't interest customers based on recent session choices, the platform delivers more relevant experiences.

Fraud detection algorithms catch suspicious behaviors in real-time, preventing fraudulent activities before losses occur. This application alone reduces millions of dollars in fraud-related costs annually, representing direct, measurable financial impact.

The platform has driven considerable gross transaction value (GTV) growth across a series of A/B experiments over the last year, though specific percentage increases aren't disclosed. The Griffin platform specifically enabled ML applications to triple in one year, suggesting rapid adoption once the infrastructure matured.

The event storage architecture includes configurable retention periods in Kafka, enabling event replay when needed for reprocessing or debugging. The centralized storage approach adds typically a few hundred milliseconds of latency to the pipeline, which the team considers acceptable given the benefits of consistency and scalability.

## Trade-offs and Lessons

Instacart's journey to real-time ML involved numerous technical trade-offs and generated valuable lessons for organizations undertaking similar transformations.

The transition to real-time serving introduced three major challenges that required careful navigation. Latency became critical because real-time serving creates dependencies on feature retrieval, feature engineering, and model prediction, all of which must execute within tight latency budgets to avoid degrading user experience. Availability concerns emerged because the real-time inference system introduced a failure point capable of causing backend service downtime, necessitating better monitoring, error handling, and deployment practices. The steep learning curve challenged machine learning engineers who had to understand many new components and processes, fundamentally changing their development workflow and introducing unfamiliar tools.

The decision to use a generalized RPC framework that was already widespread at Instacart proved highly beneficial. While this required some teams to adapt to the chosen framework, the reuse of existing tools allowed rapid development of a production-grade platform and enabled knowledge sharing between groups. Machine learning engineers could collaborate more effectively and grow faster because they shared common infrastructure patterns with other engineering teams.

The choice of centralized event storage in Kafka despite existing organizational streaming tools represents a pragmatic trade-off. The team explicitly acknowledged that this approach introduced some extra latency (typically a few hundred milliseconds) and consumed additional resources. However, the benefits of scaling quickly, avoiding multiple interface implementations, maintaining existing event usage patterns, and enabling centralized schema validation and data quality checks outweighed these costs. This decision reflects prioritizing long-term maintainability and consistency over short-term optimization.

Separating event storage from event computation rather than using a unified streaming platform embodies the separation of concerns principle. While this adds architectural complexity and potentially some latency overhead from transferring data between systems, it provides ground truth reference in durable storage with consistent format, simplifies audit and compliance, and enables event replay. The team valued these operational benefits over the theoretical efficiency of a more tightly coupled system.

The adoption of Flink for stream processing despite Python being the preferred language for many ML engineers represents another conscious trade-off. Streaming technologies work best in JVM environments (Java and Scala), making the learning curve steeper for Python-focused teams. The team accepted this difficulty because Flink provided the necessary performance and capabilities, investing in training and tooling to help engineers adapt.

Cross-functional working groups formed early in the process proved essential for success. Bringing together experts in product/business development, streaming technologies, and ML development enabled collective decision-making that addressed existing challenges and evaluated early use cases. The prioritization of real-time item availability as the first use case exemplifies the value of this approach—it was both essential by itself and provided fundamental availability scores that improved multiple downstream services, creating a foundation for rapid adoption of subsequent real-time ML applications.

The lesson of making incremental progress stands out as particularly important. Rather than attempting to transform everything simultaneously, the team executed two distinct transitions with clear goals and measurable impact for each phase. Each transition started with at least one impactful use case, enabling gradual platform updates while reducing the learning curve for adopting engineers. This approach made a massive transformation manageable and maintainable.

The balance between generalized and specialized solutions emerged as a key insight. The team adopted generalized solutions covering the majority of cases with excellent support, then built more specialized products like an Embedding Platform for targeted circumstances. This reduced support requests while improving productivity for specialized use cases and maintaining high reliability in the overall system.

Growing infrastructure with products rather than building infrastructure in isolation proved valuable. Machine learning engineers who adopted the platform during early development played significant roles in improving quality through feedback and growing adoption by marketing the platform to other product teams. This organic growth approach ensured the platform evolved to meet real needs rather than theoretical requirements.

The infrastructure investment required for real-time ML was substantial but necessary. Transitioning to a real-time system demanded major investment in infrastructure tools and processes to achieve better observability, efficient computation, high availability, and reliable deployment. The team used many tools and processes for real-time serving and real-time features, enabling rapid productionization and business impact. The unified interface approach allowing diverse tool integration was essential to success.

The challenges with siloed streaming technologies across different organizations highlight the importance of understanding existing infrastructure before planning major platform initiatives. Rather than forcing immediate standardization, the team found a practical path forward that respected existing investments while creating consistency where it mattered most for ML applications. This pragmatic approach likely prevented political conflicts and adoption resistance that could have derailed the transformation.
