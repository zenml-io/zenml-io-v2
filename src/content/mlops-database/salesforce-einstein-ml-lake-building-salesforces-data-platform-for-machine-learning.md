---
title: "ML Lake: Building Salesforce’s Data Platform for Machine Learning"
slug: "salesforce-einstein-ml-lake-building-salesforces-data-platform-for-machine-learning"
draft: false
mlopsTags:
  - "data-versioning"
  - "feature-store"
  - "metadata-store"
  - "pipeline-orchestration"
  - "databricks"
  - "dbt"
  - "docker"
  - "sagemaker"
  - "spark"
  - "terraform"
  - "data-ingestion"
  - "data-prep"
  - "feature-engineering"
  - "serving"
  - "training"
industryTags: "tech"
company: "Salesforce"
companySlug: "salesforce"
platformName: "Einstein"
contentType: "blog"
summary: "Salesforce built ML Lake as a centralized data platform to address the unique challenges of enabling machine learning across its multi-tenant, highly customized enterprise cloud environment. The platform abstracts away the complexity of data pipelines, storage, security, and compliance while providing machine learning application developers with access to both customer and non-customer data. ML Lake uses AWS S3 for storage, Apache Iceberg for table format, Spark on EMR for pipeline processing, and includes automated GDPR compliance capabilities. The platform has been in production for over a year, serving applications including Einstein Article Recommendations, Reply Recommendations, Case Wrap-Up, and Prediction Builder, enabling predictive capabilities across thousands of Salesforce features while maintaining strict tenant-level data isolation and granular access controls required in enterprise multi-tenant environments."
link: "https://engineering.salesforce.com/ml-lake-building-salesforces-data-platform-for-machine-learning-228c30e21f16/"
seo:
  title: "Salesforce: ML Lake: Building Salesforce’s Data Platform for Machine Learning - ZenML MLOps Database"
  description: "Salesforce built ML Lake as a centralized data platform to address the unique challenges of enabling machine learning across its multi-tenant, highly customized enterprise cloud environment. The platform abstracts away the complexity of data pipelines, storage, security, and compliance while providing machine learning application developers with access to both customer and non-customer data. ML Lake uses AWS S3 for storage, Apache Iceberg for table format, Spark on EMR for pipeline processing, and includes automated GDPR compliance capabilities. The platform has been in production for over a year, serving applications including Einstein Article Recommendations, Reply Recommendations, Case Wrap-Up, and Prediction Builder, enabling predictive capabilities across thousands of Salesforce features while maintaining strict tenant-level data isolation and granular access controls required in enterprise multi-tenant environments."
  canonical: "https://www.zenml.io/mlops-database/salesforce-einstein-ml-lake-building-salesforces-data-platform-for-machine-learning"
  ogTitle: "Salesforce: ML Lake: Building Salesforce’s Data Platform for Machine Learning - ZenML MLOps Database"
  ogDescription: "Salesforce built ML Lake as a centralized data platform to address the unique challenges of enabling machine learning across its multi-tenant, highly customized enterprise cloud environment. The platform abstracts away the complexity of data pipelines, storage, security, and compliance while providing machine learning application developers with access to both customer and non-customer data. ML Lake uses AWS S3 for storage, Apache Iceberg for table format, Spark on EMR for pipeline processing, and includes automated GDPR compliance capabilities. The platform has been in production for over a year, serving applications including Einstein Article Recommendations, Reply Recommendations, Case Wrap-Up, and Prediction Builder, enabling predictive capabilities across thousands of Salesforce features while maintaining strict tenant-level data isolation and granular access controls required in enterprise multi-tenant environments."
mlops:
  source: "sqlite"
  entryId: 23
  sourceUrl: "https://engineering.salesforce.com/ml-lake-building-salesforces-data-platform-for-machine-learning-228c30e21f16/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060561"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context: Multi-Tenant Enterprise ML at Scale

Salesforce faced a constellation of challenges unique to building machine learning capabilities in a multi-tenant enterprise cloud environment. The fundamental problem was enabling thousands of internal teams to build ML capabilities across diverse Salesforce products while managing the complexity of data access, security, and compliance in a system where every customer's data must remain isolated and every customer's object model is uniquely customized.

Multitenancy represents the "keystone of the Salesforce architecture," requiring granular access controls to ensure tenant-level data isolation for all machine learning applications. Data at Salesforce is owned by customers and must be strictly segregated to prevent any data mixing between tenants. This creates significant complexity when building centralized ML infrastructure, as every data access pattern must respect these boundaries.

Beyond multitenancy, Salesforce's growth through both acquisitions and organic expansion resulted in an architecture comprised of varied technology stacks and databases distributed across public cloud providers and Salesforce's own data centers. Teams building ML applications were consistently underestimating the effort required for ETL and integration work. The total cost of copying and storing data included many hidden expenses in compliance, synchronization, and security. Each team building their own data pipelines created redundant work and introduced compliance risks.

The extensibility of the Salesforce platform added another layer of complexity. Customers have heavily customized their Salesforce systems to suit unique business requirements, meaning every customer's object model is different. Machine learning applications must understand and leverage this customization metadata to build high-quality models tailored to each customer. Salesforce developed and open-sourced TransmogrifAI, an AutoML library specifically tailored to enterprise needs, to help leverage this highly structured and customized data.

ML Lake needed to scale not just in total data size but in the number and variety of datasets it houses. The common industry practice of carefully maintaining and curating a small number of key datasets for ML or analytics was impossible at Salesforce's scale of data and customization. Everything needed to be tracked and automated through extensive metadata. A key motivation was centralizing security controls required for maintaining trust while making it easy for applications to get the data they need without each team having to become experts in Salesforce's complex data landscape.

## Architecture and Design

ML Lake functions as a shared service deployed across multiple AWS regions, accessible to internal Salesforce teams and applications running in various stacks across both public cloud providers and Salesforce's own data centers. The architecture comprises three main subsystems: the data lake, pipelines, and data catalog, all unified under a single API surface.

The platform exposes OpenAPI-based interfaces running in a Spring Boot-based Java microservice. This microservice layer handles authentication, authorization, and orchestration of the underlying services. Application state and metadata are stored in PostgreSQL, providing transactional consistency for catalog operations and pipeline management. The actual machine learning data resides in AWS S3 in buckets that ML Lake manages and secures.

The data lake component uses AWS S3 as the backing store, chosen for its resiliency, cost-effectiveness, and ease of integration with data processing engines. S3 houses multiple categories of data: customer data from different parts of Salesforce, non-customer data such as public datasets containing word embeddings, and data generated and uploaded by internal machine learning applications. The typical interaction pattern involves an ML application requesting metadata for a particular dataset from the catalog, receiving a pointer to an S3 path, requesting a granularly-scoped data access token, and then interacting with the actual data using S3 APIs or S3's integration with tools like Apache Spark or Pandas.

Given that the majority of Salesforce data is highly structured with schemas often customized by clients, ML Lake needed strong support for structured datasets, partitioning and filtering of large datasets, and consistent schema changes and data updates. After evaluating multiple options including Hive Metastore and other emerging open source projects, the team selected Apache Iceberg as the table format for all structured datasets in ML Lake. Iceberg provides the ACID semantics, schema evolution, and partition evolution capabilities necessary for managing enterprise-scale structured data.

The pipelines component manages all data movement jobs bringing data in and out of ML Lake. These pipelines are controlled via APIs exposed to internal applications and handle bi-directional data movement of raw feature data into ML Lake as well as predictions and related data back to customer-facing systems in Salesforce. The pipelines service centralizes management of data movement jobs and handles common concerns like retries, error handling, and reporting. Pipeline jobs are implemented in Scala using Apache Spark running on Amazon EMR clusters. These jobs utilize custom connectors to various parts of Salesforce coupled with an intra-Salesforce integration authentication mechanism that complies with strict rules of granular and explicit authorization mandated by the Product Security organization.

The data catalog serves as the governance and discoverability layer for ML Lake. Rather than allowing the data lake to become an ungoverned "data graveyard," the catalog tracks and annotates every dataset stored inside. Each dataset carries metadata about which customer it belongs to, ingestion date, lineage information, specific metadata for automatic GDPR processing, time-to-live specifications, and many more attributes essential to keeping data organized and compliant. The catalog also maintains field-level metadata that enables datasets to be annotated with lineage information not present in the data or data schema itself, such as which Salesforce object a dataset represents and whether a string field originated as a Text or Email field. This granular metadata improves model quality by providing additional semantic information and enables record-level explainability for customers.

## Technical Implementation

The core ML Lake service is built as a Java microservice using the Spring Boot framework, exposing RESTful APIs defined via OpenAPI specifications. This design choice provides strong API contracts and enables automatic client generation for internal teams consuming the service. The microservice handles request routing, authentication and authorization, and coordination with the underlying storage and processing layers.

PostgreSQL serves as the system of record for all ML Lake application state and metadata. This includes the data catalog contents, pipeline job definitions and execution history, access control policies, and audit logs. The choice of a relational database provides strong consistency guarantees important for compliance and security requirements.

AWS S3 provides the storage layer with data organized in managed buckets. ML Lake controls bucket configuration, encryption settings, access policies, and lifecycle rules. The team leveraged S3's server-side encryption capabilities to ensure data at rest is encrypted. Access to S3 data is mediated through temporary, granularly-scoped credentials issued by ML Lake based on the requesting application's authorization level and the specific tenant data being accessed.

Apache Iceberg was chosen as the table format after evaluating alternatives including Hive Metastore and other emerging formats. Iceberg provides critical capabilities for managing structured data at scale including ACID transactions, time travel and snapshot isolation, schema evolution without rewriting data, hidden partitioning that abstracts partition layout from queries, and partition evolution allowing partition schemes to change over time. Iceberg's metadata layer integrates well with the ML Lake catalog, providing a consistent view of dataset schemas and statistics.

The pipeline implementation uses Scala as the primary language with Apache Spark as the distributed processing engine. Spark jobs run on Amazon EMR clusters that ML Lake provisions and manages. The team built custom Spark connectors to integrate with various Salesforce data sources and sinks, handling the authentication and data format conversions needed to move data between Salesforce systems and ML Lake. These connectors respect the multi-tenant isolation requirements by enforcing that jobs only access data they are authorized for.

ML Lake automatically provides GDPR compliance through specialized pipeline jobs. These compliance-related pipelines continuously ingest GDPR signals such as record deletions and do-not-profile flags from Salesforce systems. Periodic jobs then process these signals and remove the corresponding data from ML Lake datasets. Both signal ingestion and data deletion jobs are implemented in Scala using Spark, leveraging Iceberg's capabilities to perform efficient deletes and maintain historical snapshots for audit purposes.

The platform includes a sophisticated authentication and authorization system that integrates with Salesforce's internal identity infrastructure. When an application requests data access, ML Lake validates the request against policies stored in PostgreSQL that encode which applications can access which customer tenants' data. Upon successful authorization, ML Lake issues temporary AWS credentials scoped to only the specific S3 paths needed for that request, implementing the principle of least privilege.

## Scale and Performance

ML Lake has been serving production traffic for over a year, supporting multiple high-profile Einstein products used by Salesforce customers. The platform serves applications including Einstein Article Recommendations (which automatically recommends knowledge articles to customers), Einstein Reply Recommendations (which integrates with chatbot products to automate agent responses), Einstein Case Wrap-Up (which helps support agents close cases faster with on-demand recommendations), and Einstein Prediction Builder (which allows admins to build predictive models on any Salesforce object without writing code).

While the article does not provide specific throughput numbers, the platform operates at enterprise scale handling data from Salesforce's massive customer base. The multi-tenant architecture means ML Lake must simultaneously serve data for many different customer organizations, each with their own customized schemas and data volumes. The use of S3 as the backing store provides effectively unlimited storage capacity, allowing ML Lake to house the diverse datasets needed across thousands of Salesforce features.

A significant performance insight came from work on streaming data movement. While the original driver for adopting streaming was to reduce latency, internal studies showed that switching to streaming reduced overall compute costs by more than 70 percent compared to batch processing approaches. This dramatic cost reduction comes from more efficient resource utilization and the ability to move data incrementally rather than in large batch windows. ML Lake is actively working to convert pipelines to use streaming where possible to realize these benefits.

The choice of Apache Iceberg for structured data provides important performance characteristics. Iceberg's hidden partitioning means queries can be automatically pruned to only scan relevant data without applications needing to know the physical partition layout. This significantly improves query performance on large datasets. Iceberg's metadata layer allows Spark and other engines to skip entire files based on column-level statistics, further reducing data scanned for selective queries.

The platform scales not just in data volume but in the number of distinct datasets and schemas it manages. Unlike approaches that maintain a curated set of gold standard datasets, ML Lake must track potentially thousands of datasets with diverse schemas reflecting customer customizations. The extensive metadata in the catalog enables this scale while maintaining discoverability and compliance.

## Trade-offs and Lessons Learned

The decision to build ML Lake as a centralized shared service rather than allowing teams to build their own data infrastructure represents a fundamental trade-off. Centralization enables consistency in security controls, reduces duplicated effort, and provides a clear compliance boundary. However, it also means the ML Lake team must support diverse use cases and access patterns from many internal customers, requiring a flexible architecture and comprehensive API surface. The team addressed this by providing multiple levels of abstraction: low-level S3 access for teams needing full control, declarative transformation APIs for simpler use cases, and managed pipeline services for common patterns.

The choice of AWS S3 as the storage layer brings significant benefits in cost, durability, and ecosystem integration, but also introduces challenges. S3's eventual consistency model (though this has since improved) required careful design of metadata operations to avoid race conditions. The team addressed this by maintaining authoritative metadata in PostgreSQL and treating S3 as the storage substrate rather than the source of truth for dataset schemas or access policies. The separation of metadata from data allows ML Lake to provide strong consistency guarantees for catalog operations while leveraging S3's scalability for bulk storage.

Adopting Apache Iceberg early in its maturity curve was a risk but has paid dividends. Iceberg provides capabilities essential for enterprise data management including ACID transactions, time travel, and efficient schema evolution. However, being an early adopter meant encountering issues and limitations that required workarounds or contributions back to the project. The trade-off of cutting-edge capabilities versus stability is inherent in building with emerging open source technologies. The team's evaluation process that considered multiple table formats and their specific requirements for structured data management demonstrates thoughtful technology selection.

The pipeline architecture centralizes common concerns like retries, error handling, and reporting, reducing the burden on individual ML application teams. However, this centralization means the ML Lake team must maintain robust monitoring and debugging capabilities to diagnose issues across many different pipeline jobs. The choice to implement pipelines in Scala and Spark provides powerful data processing capabilities but requires specialized expertise to maintain and optimize. The team's work to shift toward streaming represents an evolution of this architecture based on learnings about cost and performance.

A key lesson is the importance of extensive metadata for managing ML data at enterprise scale. The dual purposes of metadata for compliance and model quality illustrate how infrastructure design decisions impact both operational requirements and ML outcomes. Field-level metadata about semantic types (such as whether a string represents an email address) improves model quality when used by systems like TransmogrifAI. This same metadata supports compliance operations and explainability requirements. The investment in building a comprehensive catalog with rich metadata pays dividends across multiple dimensions.

The automatic GDPR compliance through continuous signal ingestion and periodic data deletion represents a proactive approach to regulatory requirements. Rather than treating compliance as an afterthought, ML Lake bakes these capabilities into the platform itself. This architectural decision means individual ML applications don't need to implement their own GDPR deletion logic, reducing the risk of non-compliance. However, it also means the ML Lake team must maintain highly reliable compliance pipelines with robust monitoring and alerting.

The multi-tenant architecture creates significant complexity but is non-negotiable for Salesforce's business model. Every data access must be validated against tenant isolation policies, and credentials must be scoped to specific tenant data. This granular access control impacts performance compared to a simpler architecture where applications have broad data access. The trade-off of security and isolation versus performance reflects Salesforce's prioritization of trust and compliance.

Looking forward, the team identified feature stores as a key area for future investment. Feature stores enable feature sharing and discoverability across applications and provide low-latency access for real-time inference. This represents a natural evolution from ML Lake's current focus on training data management toward supporting the full ML lifecycle including serving. The team is also adding declarative transformation capabilities to simplify use cases that don't require the full power of Spark, further reducing the burden on ML application developers. These future directions show a platform evolving based on user needs and industry trends while maintaining its core focus on addressing Salesforce's unique requirements around multi-tenancy, customization, and trust.
