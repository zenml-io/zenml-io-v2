---
title: "Cloud-native data and ML platform migration on AWS using Kafka, Atlas, SageMaker, and Spark to cut deployment time and improve freshness"
slug: "intuit-intuits-ml-platform-cloud-native-data-and-ml-platform-migration-on-aws-using-kafka-atlas-sagemaker-and-spark-to-c"
draft: false
mlopsTags:
  - "compute-management"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "argo"
  - "dask"
  - "databricks"
  - "kubernetes"
  - "ray"
  - "sagemaker"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "data-validation"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "finance"
company: "Intuit"
companySlug: "intuit"
platformName: "Intuit's ML platform"
contentType: "blog"
summary: "Intuit faced a critical scaling crisis in 2017 where their legacy data infrastructure could not support exponential growth in data consumption, ML model deployment, or real-time processing needs. The company undertook a comprehensive two-year migration to AWS cloud, rebuilding their entire data and ML platform from the ground up using cloud-native technologies including Apache Kafka for event streaming, Apache Atlas for data cataloging, Amazon SageMaker extended with Argo Workflows for ML lifecycle management, and EMR/Spark/Databricks for data processing. The modernization resulted in dramatic improvements: 10x increase in data processing volume, 20x more model deployments, 99% reduction in model deployment time, data freshness improved from multiple days to one hour, and 50% fewer operational issues."
link: "https://medium.com/intuit-engineering/the-intuit-data-journey-d50e644ed279"
year: 2021
seo:
  title: "Intuit: Cloud-native data and ML platform migration on AWS using Kafka, Atlas, SageMaker, and Spark to cut deployment time and improve freshness - ZenML MLOps Database"
  description: "Intuit faced a critical scaling crisis in 2017 where their legacy data infrastructure could not support exponential growth in data consumption, ML model deployment, or real-time processing needs. The company undertook a comprehensive two-year migration to AWS cloud, rebuilding their entire data and ML platform from the ground up using cloud-native technologies including Apache Kafka for event streaming, Apache Atlas for data cataloging, Amazon SageMaker extended with Argo Workflows for ML lifecycle management, and EMR/Spark/Databricks for data processing. The modernization resulted in dramatic improvements: 10x increase in data processing volume, 20x more model deployments, 99% reduction in model deployment time, data freshness improved from multiple days to one hour, and 50% fewer operational issues."
  canonical: "https://www.zenml.io/mlops-database/intuit-intuits-ml-platform-cloud-native-data-and-ml-platform-migration-on-aws-using-kafka-atlas-sagemaker-and-spark-to-c"
  ogTitle: "Intuit: Cloud-native data and ML platform migration on AWS using Kafka, Atlas, SageMaker, and Spark to cut deployment time and improve freshness - ZenML MLOps Database"
  ogDescription: "Intuit faced a critical scaling crisis in 2017 where their legacy data infrastructure could not support exponential growth in data consumption, ML model deployment, or real-time processing needs. The company undertook a comprehensive two-year migration to AWS cloud, rebuilding their entire data and ML platform from the ground up using cloud-native technologies including Apache Kafka for event streaming, Apache Atlas for data cataloging, Amazon SageMaker extended with Argo Workflows for ML lifecycle management, and EMR/Spark/Databricks for data processing. The modernization resulted in dramatic improvements: 10x increase in data processing volume, 20x more model deployments, 99% reduction in model deployment time, data freshness improved from multiple days to one hour, and 50% fewer operational issues."
mlops:
  source: "sqlite"
  entryId: 110
  sourceUrl: "https://medium.com/intuit-engineering/the-intuit-data-journey-d50e644ed279"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061506"
  lastUpdated: "2026-04-14T19:55:10.969742"
---

## Problem Context

By late 2017, Intuit had reached a critical inflection point in their data infrastructure journey. The company was rapidly evolving from a collection of standalone products like TurboTax, QuickBooks, and Mint into a connected suite of AI-driven financial services. This transformation created exponential growth in both customer base and internal demand for high-quality, real-time data access, pushing their legacy on-premise infrastructure to its breaking point.

The legacy system exhibited multiple failure modes that were constraining innovation velocity. Model deployment timelines stretched across multiple quarters, making it impossible to respond quickly to market needs. The infrastructure lacked compute elasticity necessary for data-heavy workloads including real-time processing, batch jobs, feature extraction, and ML model training. Teams needed specialized talent just to maintain and operate proprietary infrastructure solutions, creating operational overhead that diverted engineering resources from product development.

Data silos represented another critical challenge. The company lacked reliable tooling for data discovery, lineage tracking, and data cleansing, making it difficult for the growing community of data workers—engineers, analysts, and data scientists—to find and trust the data they needed. Infrastructure refreshes were prohibitively expensive, and the small data platform team could not scale to support company-wide innovation at the required pace. The architecture fundamentally could not support the company's strategic vision of becoming an AI-driven expert platform.

## Architecture and Design

Intuit's refreshed data strategy centered on three foundational principles that shaped the entire architecture. First, complete cloud migration to leverage cloud-native technologies for scale, speed, and elasticity. Second, treating data as a product with a product-centric view toward building easy-to-use capabilities with best-in-class SLAs covering quality, availability, performance, security, and cost-effectiveness. Third, establishing a "paved road" approach that defined where the company would converge on fixed technologies, allow flexibility for customization, or permit free technology choice.

The new platform architecture spans three major capability domains. The data infrastructure layer includes transactional persistence, a comprehensive data catalog for discovery and lineage, an extensible ingestion framework, pipeline orchestration and management, real-time distributed stream processing, and data lake/lakehouse infrastructure. The ML infrastructure encompasses training and hosting capabilities, model lifecycle management tools and workflows, and feature engineering with feature store functionality. The analytics infrastructure provides a curated global data model, unified user experience and data portal, and tools for data exploration, curation, and enrichment.

A critical architectural decision involved the account structure design, which balanced blast radius reduction against data transfer cost management. The team implemented a hub-and-spoke account structure that defined clear perimeters for the data lake, established security and governance principles, clarified data access patterns, and assigned ownership and cost responsibilities between producing and consuming teams. This structure provided both isolation for security and efficiency for data movement.

The platform architecture embraced a data mesh philosophy where product teams treat data as an essential product feature. This required building a self-serve platform that abstracts complexity while providing semantic harmonization and governing standards. The approach distributes data ownership to domain teams while maintaining centralized observability and governance capabilities.

## Technical Implementation

The technical stack represents a carefully curated blend of AWS managed services, open-source technologies, and custom-built capabilities. For the foundational event streaming infrastructure, Intuit built Event Bus on Apache Kafka, which serves transactional, analytical, and machine learning use cases across the entire company. The stream processing platform extends to Apache Beam supporting both Apache Flink and Apache Samza runtime engines, enabling diverse real-time processing patterns.

For data cataloging, the team adopted Apache Atlas as the foundation but extended it significantly beyond traditional catalog capabilities. They customized it to handle metadata and lineage for events, schemas, ML features, models, data products, and additional data object types specific to Intuit's needs. This enables tracking data from production through ingestion and transformation all the way to business outcomes.

The ML platform leverages Amazon SageMaker as its foundation, but Intuit extended it substantially with custom capabilities. Engineers built additional security layers, monitoring infrastructure, scalability enhancements, and automated model development workflows using Intuit's open-source Argo Workflows for orchestration. The platform includes custom model lifecycle management covering training, testing, and deployment phases. A particularly notable addition is the model monitoring service that automatically detects drift and triggers model retraining, addressing a critical operational need for production ML systems.

For data processing, the platform supports multiple runtimes including AWS EMR running Hive and Spark, Databricks Spark runtime, and open-source Apache Spark running on Kubernetes infrastructure. The team is building an orchestration abstraction layer to streamline deployment and operations of these diverse runtimes, allowing domain teams to work at a higher level of abstraction while maintaining flexibility in execution environment choice.

The clickstream tracking infrastructure underwent complete standardization. Intuit defined a new company-wide clickstream tracking standard and drove adoption across all products, resulting in unified instrumentation that improved both data freshness and quality while providing better cross-product visibility.

Feature engineering emerged as a critical capability area. The implementation consists of two key components: feature creation, often performed as stream processing in real-time, and a feature repository for runtime feature access. This architecture enables consistent feature computation across training and serving, addressing the training-serving skew problem common in production ML systems.

The curation platform provides a framework for authoring custom domain processing logic that produces clean, connected entities into a data graph. This ensures data consumers access the highest quality data while empowering data producers to take ownership of producing consumable data assets.

## Scale and Performance

The migration and platform modernization delivered dramatic improvements across multiple dimensions. The platform now processes 10x more data in the cloud compared to the legacy on-premise system. Model deployment velocity increased by 20x, with deployment time decreasing by 99% from the multi-quarter timelines of the legacy system. Data freshness improved from multiple days to approximately one hour, fundamentally changing what types of analytics and ML use cases became feasible.

Operational reliability improved substantially, with 50% fewer operational issues after cutting over to the new platform. The team manages tens of thousands of data pipelines that ingest data into the lake and transform it for analytics and ML consumption. The stream processing infrastructure now runs hundreds of stream processors supporting both ML and analytics use cases, representing an exponential shift in how the company deploys real-time code.

The migration itself took two years to complete and involved every team at Intuit, including data platform engineers, business product teams, data scientists, analysts, product managers, and program managers. The company operated dual systems in parallel throughout the migration, with constant parity checking and validation before final cutover. This created significant "double-bubble" costs for the migration duration but enabled risk mitigation through thorough validation.

Infrastructure cost management became a daily engineering concern. The shift to cloud required teams to learn new patterns for managing hosting costs and be directly accountable for spend. Meticulous tagging of every provisioned component enables rapid reaction to spend anomalies. The team implemented waste sensors and continuously evaluates alternative technologies to optimize cost while maintaining performance.

## Trade-offs and Lessons Learned

Several architectural and process decisions proved particularly successful. Having highest-level executive support and budget commitment for the dual-system operation during migration was essential—without it, the two-year parallel operation would have been unsustainable. Obsessing about security, compliance, and governance upfront, rather than retrofitting these capabilities later, created a solid foundation. The team partnered closely with security teams to continuously monitor a "securability" index and conducted regular drills, maintaining vigilance through data observability with visibility into permissions, roles, policies, and data movement anomalies.

The "paved road" strategy proved valuable in preventing technology sprawl. While cloud and cloud-native solutions offered many technology choices, integrating them with existing company systems and adding necessary privacy, security, and compliance features represented hard work. By declaring fixed, flexible, and free zones, the company could pool efforts and move with speed toward common outcomes rather than fragmenting into isolated technology islands.

Early definition and adoption of the company-wide clickstream tracking standard created lasting value. This standardization proved critical for achieving unified instrumentation, improving data freshness and quality, and providing business visibility across the product portfolio.

The migration also revealed important lessons about what didn't work as planned. A lift-and-shift strategy that succeeded for some transactional systems failed for data and analytics systems. Cloud data solutions lacked one-to-one mapping to existing on-premise solutions, requiring complete rewrites of many capabilities including ingestion, processing, data classification, account management, and the machine learning platform. Not recognizing this upfront resulted in several months of delays.

Cost instrumentation should have been implemented from day one. Hidden costs like excessive logging and data transfer became apparent only after they had accumulated. Teams needed to learn and adopt new mental models for managing cloud hosting costs as a daily engineering concern rather than periodic infrastructure refresh cycles.

The "long tail" of data ingestion and processing pipelines presented unexpected challenges. Identifying owners and retiring jobs that were no longer relevant felt like an archaeological excavation. At one point, the team decided to shut down on-premise data systems to test what would break—a forcing function they acknowledged should have been applied sooner to accelerate the long tail migration.

Organizational structure changes proved essential to success. The migration gained momentum only after pulling together data producers, data consumers, and data platform teams into one mission-based team with real-time dashboards tracking impediments, progress, and data parity across on-premise and cloud pipelines. Data-backed dashboards increased focus and alignment on common outcomes in ways that traditional project management approaches could not achieve.

The platform continues evolving in several critical areas. The data mesh cultural shift requires ongoing effort to help product teams treat data as a core product feature with accountability for quality, freshness, and availability. Permissions management is moving toward more self-serve, fine-grained access control where data owners—who know their data best—can make decisions about granting or revoking access. Real-time processing is experiencing paradigm shifts in how applications, services, and features deploy on the distributed eventing infrastructure, with expected exponential growth. Operability and cost management require continuous innovation as data systems grow more complex with real-time SLA requirements and exponential growth in data and compute volumes.
