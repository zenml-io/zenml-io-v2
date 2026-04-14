---
title: "Apache Airflow on AWS for scalable ETL pipeline authoring, CI/CD, and monitoring"
slug: "zillow-zillows-ml-platform-apache-airflow-on-aws-for-scalable-etl-pipeline-authoring-cicd-and-monitoring"
draft: false
mlopsTags:
  - "metadata-store"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "airflow"
  - "docker"
  - "spark"
  - "terraform"
  - "data-ingestion"
  - "data-prep"
industryTags: "other"
company: "Zillow"
companySlug: "zillow"
platformName: "Zillow's ML platform"
contentType: "blog"
summary: "Zillow's Data Science and Engineering team adopted Apache Airflow in 2016 to address the challenges of authoring and managing complex ETL pipelines for processing massive volumes of real estate data. The team built a comprehensive infrastructure combining Airflow with AWS services (ECS, ECR, RDS, S3, EMR), Docker containerization, RabbitMQ message brokering, and Splunk logging to create a fully automated CI/CD pipeline with high scalability, automatic service recovery, and enterprise-grade monitoring. By mid-2017, the platform was serving approximately 30 ETL pipelines across the team, with developers leveraging three separate environments (local, staging, production) to ensure robust testing and deployment workflows."
link: "https://www.zillow.com/tech/airflow-at-zillow/"
year: 2017
seo:
  title: "Zillow: Apache Airflow on AWS for scalable ETL pipeline authoring, CI/CD, and monitoring - ZenML MLOps Database"
  description: "Zillow's Data Science and Engineering team adopted Apache Airflow in 2016 to address the challenges of authoring and managing complex ETL pipelines for processing massive volumes of real estate data. The team built a comprehensive infrastructure combining Airflow with AWS services (ECS, ECR, RDS, S3, EMR), Docker containerization, RabbitMQ message brokering, and Splunk logging to create a fully automated CI/CD pipeline with high scalability, automatic service recovery, and enterprise-grade monitoring. By mid-2017, the platform was serving approximately 30 ETL pipelines across the team, with developers leveraging three separate environments (local, staging, production) to ensure robust testing and deployment workflows."
  canonical: "https://www.zenml.io/mlops-database/zillow-zillows-ml-platform-apache-airflow-on-aws-for-scalable-etl-pipeline-authoring-cicd-and-monitoring"
  ogTitle: "Zillow: Apache Airflow on AWS for scalable ETL pipeline authoring, CI/CD, and monitoring - ZenML MLOps Database"
  ogDescription: "Zillow's Data Science and Engineering team adopted Apache Airflow in 2016 to address the challenges of authoring and managing complex ETL pipelines for processing massive volumes of real estate data. The team built a comprehensive infrastructure combining Airflow with AWS services (ECS, ECR, RDS, S3, EMR), Docker containerization, RabbitMQ message brokering, and Splunk logging to create a fully automated CI/CD pipeline with high scalability, automatic service recovery, and enterprise-grade monitoring. By mid-2017, the platform was serving approximately 30 ETL pipelines across the team, with developers leveraging three separate environments (local, staging, production) to ensure robust testing and deployment workflows."
mlops:
  source: "sqlite"
  entryId: 142
  sourceUrl: "https://www.zillow.com/tech/airflow-at-zillow/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061840"
  lastUpdated: "2026-04-14T19:55:26.928389"
---

## Problem Context

Zillow's Data Science and Engineering (DSE) team faces significant challenges in managing ETL workloads that serve millions of web and mobile requests for real estate information. The team collects, processes, analyzes, and delivers massive volumes of data daily, with complexity stemming from both the sheer data scale and continually evolving business requirements. Before adopting Airflow in 2016, the team struggled to find a platform that could make authoring and managing ETL pipelines easier while maintaining reliability and scalability.

The pain points that motivated the search for a better solution included the complexity of managing self-scheduled standalone services, difficulty in expressing task dependencies and pipeline logic, limited visibility into job execution and failures, and challenges in scaling infrastructure to match growing data processing demands. The team needed a solution that could handle dynamic pipeline generation, provide robust scheduling and retry mechanisms, offer clear visibility into job status, and scale efficiently as workloads increased.

## Architecture & Design

Zillow's Airflow implementation represents a sophisticated, cloud-native architecture that integrates Airflow with multiple AWS services and supporting technologies. The overall design follows a distributed pattern where components work together to provide a highly available, scalable, and observable data pipeline platform.

### Core Airflow Components

The fundamental Airflow architecture consists of several key components working in concert. The Airflow scheduler analyzes DAG definitions to schedule jobs according to defined schedules and dependencies. Airflow workers pick up scheduled tasks and execute them with proper load balancing across the cluster. All job metadata, execution history, and state information is stored in a centralized meta database that is continuously updated. Users interact with the system through the Airflow web UI, which provides multiple views including graph visualization, tree views showing execution history, task duration metrics, and retry counts.

### AWS Integration Layer

The infrastructure leverages AWS services extensively to provide enterprise-grade reliability and scalability. Amazon ECS (Elastic Container Service) hosts the entire Airflow cluster, enabling Docker-based container management, easy scaling through instance adjustments, automatic service recovery when containers become unhealthy, and real-time visibility into resource utilization metrics. Amazon ECR (Elastic Container Registry) and Docker Hub store container images, with private images hosted in ECR and public base images pulled from Docker Hub.

Amazon RDS (Relational Database Service) hosts Airflow's meta database using a Postgres backend, providing managed database services with automated backups and high availability. Amazon S3 serves as the central storage layer for DAG definitions, plugins, and execution logs, enabling versioned storage and facilitating the CI/CD pipeline. Amazon ELB (Elastic Load Balancer) provides load balancing for both external web UI requests (airflow-webserver and airflow-flower) and internal service discovery for RabbitMQ.

Amazon SES (Simple Email Service) handles email notifications for job failures, retries, and alerts. Amazon EMR (Elastic MapReduce) serves as the execution platform for heavy computational workloads, with Airflow acting primarily as the orchestrator and scheduler while distributing intensive Spark and Hive jobs to EMR via SSHExecuteOperator.

### Message Broker

RabbitMQ serves as the message broker for task distribution across workers. The team specifically chose RabbitMQ over alternatives like Redis, Amazon SQS, and Zookeeper because of its feature completeness, proven stability, and resistance to data loss. RabbitMQ enables the distributed executor pattern where the scheduler publishes tasks to queues and workers consume tasks based on availability and capacity.

### Logging and Observability

Splunk provides comprehensive logging infrastructure for both DAG execution logs and backend service logs. All logs are directed to Splunk, which offers powerful visualization capabilities, search functionality, and analysis tools for debugging issues and monitoring system health. This centralized logging approach ensures that logs remain available even after containers are terminated and provides a unified interface for investigating problems across the entire platform.

## Technical Implementation

### Container-Based Deployment

The entire Airflow backend runs as containerized services managed by Amazon ECS. This containerization strategy provides several advantages including consistent environments across development, staging, and production; simplified deployment through container image versioning; resource isolation between services; and automated health checks and recovery mechanisms built into ECS.

### Three-Environment Development Workflow

Zillow established three completely independent Airflow environments to support the full development lifecycle:

**airflow-local** enables each developer to launch a complete Airflow cluster on their local development machine. Thanks to Docker's portability, spinning up a local cluster requires only a few commands. The team created a cookiecutter-enabled DAG archetype that provides templates and scaffolding for quick-starting new pipeline development, reducing the barrier to entry for developers new to Airflow.

**airflow-staging** mirrors the production environment with all necessary external connections configured. Every DAG that passes local testing must be validated in staging before promotion to production. This environment provides a safe testing ground where developers can verify integrations with production data sources and sinks without risking production workloads.

**airflow-prod** is the production environment where validated DAGs execute on real data. DAGs are promoted to production only after passing all necessary tests in both local and staging environments, ensuring high quality and reliability.

### CI/CD Pipeline

The team built a fully automated CI/CD pipeline that eliminates manual deployment steps and ensures consistency. Every push or merge to the Airflow DAG repository triggers automatic integration and deployment workflows without human intervention. The pipeline leverages S3 as the central storage point for DAG files, plugins, and configurations. When code is merged to the main branch, the CI/CD system updates S3 with the latest DAG definitions, and the Airflow schedulers and workers automatically detect and load the new code.

### Backend Management

Updating the Airflow cluster infrastructure is streamlined to a single command operation. This capability enables rapid scaling by adding or removing worker nodes, updating service configurations, or deploying new versions of the Airflow platform itself. The ECS-based approach means that changes to task definitions or service configurations can be applied consistently across the cluster with minimal downtime.

### Dynamic Pipeline Definition

Pipelines are defined as code using Python, enabling dynamic DAG generation based on configuration files, database queries, or other data sources. This code-based approach provides version control for pipeline definitions, enables code review processes for pipeline changes, allows programmatic generation of similar pipelines, and facilitates testing of pipeline logic using standard Python testing frameworks.

## Scale & Performance

By mid-2017, approximately six months after the initial rollout in late 2016, Airflow at Zillow was actively serving around 30 ETL pipelines across the DSE team. The platform processes what the team describes as a "giant size and numerous categories of data" daily, though specific throughput numbers are not disclosed in the source.

The distributed architecture enables horizontal scaling by adding worker nodes to the ECS cluster. The use of RabbitMQ as the message broker ensures reliable task distribution even under high load. The separation of scheduling from execution means that the scheduler can continue assigning tasks even when worker capacity is temporarily exhausted, with tasks queuing in RabbitMQ until workers become available.

The three-environment approach provides isolation between development, testing, and production workloads, ensuring that production performance is not impacted by development activities. The Postgres-backed RDS database provides sufficient performance for metadata operations while offering managed backup and recovery capabilities.

## Trade-offs & Lessons

### Key Advantages Realized

The team found that Airflow delivered significant benefits compared to their previous approach of creating and managing self-scheduled standalone services. The Python-based DAG definition enables dynamic pipeline generation, where pipelines can be created programmatically rather than requiring manual configuration for each workflow. The rich set of built-in operators and executors provides building blocks for common tasks while allowing custom operators for specialized needs.

High scalability proved straightforward to achieve through the ECS-based deployment model, where adding or removing workers simply requires adjusting the desired count in ECS service definitions. Flexible task dependency definitions support complex workflows with subdags for modular pipeline components and task branching for conditional logic. The flexible schedule settings and backfilling capabilities enable both regular scheduled execution and historical data processing.

The inherent support for task priority settings and load management ensures that critical pipelines receive preferential treatment during periods of high demand. Support for various connection types including databases, S3, SSH, and HDFS enables integration with diverse data sources and sinks. The logging and alerting capabilities, enhanced by integration with Splunk, provide comprehensive visibility into pipeline execution and problems. The web UI has proven particularly valuable, offering graph views for understanding pipeline structure, tree views for execution history, task duration metrics for performance optimization, and retry counts for reliability monitoring.

### Architectural Decisions

Several key architectural choices shaped the platform's capabilities and characteristics. The decision to use RabbitMQ over alternatives like Redis, Amazon SQS, or Zookeeper was driven by requirements for feature completeness, stability, and resistance to data loss. RabbitMQ's mature implementation and strong durability guarantees made it the preferred choice despite potentially higher operational complexity.

The choice to use Airflow primarily for orchestration while offloading heavy computational work to EMR represents a thoughtful division of responsibilities. This approach keeps the Airflow cluster focused on scheduling and coordination while leveraging EMR's specialized capabilities for data-intensive processing with Spark and Hive. The SSHExecuteOperator provides a clean integration point between the two systems.

The containerized deployment on ECS rather than managing bare instances provides automated recovery, resource monitoring, and scaling capabilities, though it introduces some complexity in image management and service configuration. The decision to use S3 as the central storage point for DAGs and logs creates a single source of truth and simplifies synchronization across environments, though it requires workers to have S3 access and introduces dependency on S3 availability.

### Developer Experience

The investment in three separate environments and the cookiecutter DAG archetype demonstrates the team's focus on developer productivity. By making it easy to run Airflow locally and providing templates for new DAGs, the platform reduces friction for developers and encourages adoption. The full CI/CD integration means developers can focus on pipeline logic rather than deployment mechanics.

### Growth Trajectory

The rapid adoption from zero to 30 pipelines in approximately six months indicates strong developer satisfaction and platform utility. The team observed that developers found it much easier to "simply plant their jobs on this fantastic platform" compared to creating standalone services. This organic growth suggests the platform successfully addressed the pain points that motivated its creation.

### Future Direction

As of mid-2017, the team anticipated continued growth in Airflow usage both within the DSE team and potentially expanding to other teams dealing with data workflows. The team was also exploring integration with other systems to build a "seamlessly connected ecosystem for Data Science and Engineering," suggesting an evolution toward a more comprehensive data platform where Airflow serves as a central orchestration layer.

### Implementation Insights for Practitioners

For organizations considering similar implementations, Zillow's experience highlights several important lessons. The combination of Airflow with cloud-native services like ECS provides significant operational benefits but requires investment in infrastructure-as-code and container expertise. The three-environment approach ensures quality but introduces complexity in maintaining consistency across environments. The CI/CD automation is essential for managing DAG deployments at scale and avoiding manual deployment errors. Integration with external logging systems like Splunk provides better long-term log retention and analysis than Airflow's built-in logging alone. The decision to separate orchestration from execution by using EMR for heavy workloads keeps the Airflow cluster appropriately sized and focused on its core strengths in scheduling and dependency management.
