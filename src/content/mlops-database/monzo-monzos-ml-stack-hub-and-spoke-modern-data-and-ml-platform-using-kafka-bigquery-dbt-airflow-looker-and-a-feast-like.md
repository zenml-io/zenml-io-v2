---
title: "Hub-and-spoke modern data and ML platform using Kafka, BigQuery, dbt, Airflow, Looker, and a Feast-like feature store"
slug: "monzo-monzos-ml-stack-hub-and-spoke-modern-data-and-ml-platform-using-kafka-bigquery-dbt-airflow-looker-and-a-feast-like"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-serving"
  - "pipeline-orchestration"
  - "airflow"
  - "databricks"
  - "dbt"
  - "docker"
  - "feast"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "monitoring"
  - "serving"
  - "training"
industryTags: "finance"
company: "Monzo"
companySlug: "monzo"
platformName: "Monzo's ML stack"
contentType: "blog"
summary: "Monzo, a UK digital bank, built a comprehensive modern data platform that serves both analytics and machine learning workloads across the organization following a hub-and-spoke model with centralized data management and decentralized value creation. The platform ingests event streams from backend services via Kafka and NSQ into BigQuery, uses dbt extensively for data transformation (over 4,700 models with approximately 600,000 lines of SQL), orchestrates workflows with Airflow, and visualizes insights through Looker with over 80% active user adoption among employees. For machine learning, they developed a feature store inspired by Feast that automates feature deployment between BigQuery (analytics) and Cassandra (production), along with Python microservices using Sanic for model serving, enabling data scientists to deploy models directly to production without engineering reimplementation, though they acknowledge significant challenges around dbt performance at scale, metadata management, and Looker responsiveness."
link: "https://monzo.com/blog/2021/10/14/an-introduction-to-monzos-data-stack"
year: 2021
seo:
  title: "Monzo: Hub-and-spoke modern data and ML platform using Kafka, BigQuery, dbt, Airflow, Looker, and a Feast-like feature store - ZenML MLOps Database"
  description: "Monzo, a UK digital bank, built a comprehensive modern data platform that serves both analytics and machine learning workloads across the organization following a hub-and-spoke model with centralized data management and decentralized value creation. The platform ingests event streams from backend services via Kafka and NSQ into BigQuery, uses dbt extensively for data transformation (over 4,700 models with approximately 600,000 lines of SQL), orchestrates workflows with Airflow, and visualizes insights through Looker with over 80% active user adoption among employees. For machine learning, they developed a feature store inspired by Feast that automates feature deployment between BigQuery (analytics) and Cassandra (production), along with Python microservices using Sanic for model serving, enabling data scientists to deploy models directly to production without engineering reimplementation, though they acknowledge significant challenges around dbt performance at scale, metadata management, and Looker responsiveness."
  canonical: "https://www.zenml.io/mlops-database/monzo-monzos-ml-stack-hub-and-spoke-modern-data-and-ml-platform-using-kafka-bigquery-dbt-airflow-looker-and-a-feast-like"
  ogTitle: "Monzo: Hub-and-spoke modern data and ML platform using Kafka, BigQuery, dbt, Airflow, Looker, and a Feast-like feature store - ZenML MLOps Database"
  ogDescription: "Monzo, a UK digital bank, built a comprehensive modern data platform that serves both analytics and machine learning workloads across the organization following a hub-and-spoke model with centralized data management and decentralized value creation. The platform ingests event streams from backend services via Kafka and NSQ into BigQuery, uses dbt extensively for data transformation (over 4,700 models with approximately 600,000 lines of SQL), orchestrates workflows with Airflow, and visualizes insights through Looker with over 80% active user adoption among employees. For machine learning, they developed a feature store inspired by Feast that automates feature deployment between BigQuery (analytics) and Cassandra (production), along with Python microservices using Sanic for model serving, enabling data scientists to deploy models directly to production without engineering reimplementation, though they acknowledge significant challenges around dbt performance at scale, metadata management, and Looker responsiveness."
mlops:
  source: "sqlite"
  entryId: 115
  sourceUrl: "https://monzo.com/blog/2021/10/14/an-introduction-to-monzos-data-stack"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061557"
  lastUpdated: "2026-04-14T19:55:13.702099"
---

## Problem Context

Monzo faced the challenge of building a modern data stack that could support both traditional analytics workloads and machine learning use cases at scale for a rapidly growing digital bank. The company needed to enable data-driven decision making across the entire organization while maintaining centralized data management for governance, compliance, and a 360-degree customer view. A critical challenge was democratizing data access so that teams closest to business problems could create their own data products, not just dedicated data specialists.

The organization adopted two guiding principles: centralized data management to ensure consistency, governance, and organizational efficiency, paired with decentralized value creation through a hub-and-spoke model where data professionals work embedded across product teams. This approach required tooling that would empower both data specialists and non-specialists (software engineers, business analysts) to work with data safely and efficiently.

Several specific pain points emerged as the platform scaled. The massive dbt project with over 4,700 models became painfully slow, with development iterations taking significant time. Data ownership remained unclear, particularly for event data where producing teams often differed from consuming teams, creating friction when data issues arose. The lack of proper metadata management and data discovery made it difficult to find relevant datasets and understand their lineage across the stack. Additionally, deploying machine learning models to production traditionally required reimplementation by software engineers, which would slow ML adoption unacceptably.

## Architecture & Design

Monzo's data architecture follows a streaming-first design where event data from backend services flows through "the firehose" (implemented using Kafka and NSQ) into BigQuery as the central data warehouse. The platform spans two cloud providers: Google Cloud Platform for analytics infrastructure and AWS for backend production systems, with the ML platform operating at the intersection of both.

The data ingestion layer consists of the Analytics Event Processor and Shipper, a custom-built tool composed of two microservices. The Analytics Event Processor consumes events from two NSQ topics: `firehose` for backend service events and `client_analytics` for app and internal tooling events. The Processor enriches event payloads by expanding references (for example, transforming an `account_id` into a full account object) and sanitizes data to remove personally identifiable information (PII). The Analytics Event Shipper then writes both sanitized and raw events to BigQuery event tables, automatically creating tables as needed. Event tables use a column-based payload structure that allows schema evolution, with data developers extracting specific fields using JSON_EXTRACT functions in BigQuery.

Beyond custom event processing, Monzo uses Fivetran for loading data from external systems including accounting and web analytics platforms. Some miscellaneous data arrives through direct uploads to BigQuery or Google Cloud Storage, though the team deliberately minimizes bespoke integration approaches.

The transformation layer centers on dbt (Data Build Tool) from dbt Labs, which has become the primary interface for data work at Monzo. The dbt project contains over 4,700 models representing approximately 600,000 lines of SQL. The company forked dbt in 2019 and packaged it in Docker containers to accelerate deployment of security and productivity features while ensuring consistency between local and production environments. This fork enabled several custom features that address Monzo-specific needs.

The orchestration layer uses Apache Airflow to schedule, execute, and monitor data warehouse refreshes. Most models run on nightly schedules, while some critical tables rebuild every 15 minutes for near-real-time analytics. Monzo converts dbt's compiled Directed Acyclic Graph (DAG) of data model dependencies into Airflow's task DAG format automatically, maintaining the dependency structure while enabling Airflow's scheduling capabilities.

The machine learning platform architecture bridges the analytics infrastructure on GCP with the backend production environment on AWS. Data scientists develop models using Google Colab for exploration and experimentation. For production deployment, Monzo built templating scripts that generate Python ML microservices using Sanic as the API webserver, allowing data scientists and ML engineers to deploy directly to production without backend engineering reimplementation.

The Feature Store represents a critical architectural component inspired by Feast's design. It automates the journey of shipping features between BigQuery (the analytics database) and Cassandra (the production database), solving the common challenge of maintaining feature consistency across training and serving environments. This automation ensures that features developed during model training in the analytics environment can be reliably deployed to production serving infrastructure.

The visualization layer uses Looker as the primary dashboard and reporting tool, with over 80% of Monzo employees as active users. Looker integrates with Slack for automated reporting, sending key performance indicators to all employees weekly and triggering alerts when specific conditions are met.

## Technical Implementation

The technology stack reflects deliberate choices to balance productivity, governance, and scale. BigQuery serves as the central data warehouse, chosen for its serverless architecture, scalability, and multi-cloud capabilities. The company operates at sufficient scale that Google Cloud Platform costs are substantial, requiring constant optimization efforts including configuration changes to execute models in different BigQuery projects and analytics engineering redesigns of large models (some rebuilding approximately 60 terabytes daily).

The dbt implementation involves several custom features built to address Monzo-specific challenges. The `dbt upstream prod` feature dramatically improves development speed and reduces costs by intelligently determining which parts of the data pipeline should run in the development environment versus reading from production tables. When a developer runs `dbt run -m +tableD` without this feature, all upstream dependencies execute in the development environment. With `dbt upstream prod`, the developer can run the same workload while reading most upstream dependencies from production, significantly reducing computation. The feature intelligently handles cases where developers modify multiple tables, automatically determining which intermediate tables must be rebuilt in the development environment based on the dependency graph.

The `indirect_ref` feature solves data access control challenges by introducing "interface tables" that act like API datasets at the boundaries of sensitive BigQuery projects. Only designated interface tables can be accessed by downstream consumers, and these interface tables explicitly declare their approved downstream consumers in dbt configuration. This creates an explicit contract between data producers and consumers, with GitHub code owners automatically tagging the producing team when downstream teams request changes, ensuring proper governance and review.

Version control and CI/CD leverage GitHub in a mono-repo approach, ensuring consistency of tooling and CI checks while improving discoverability. The data platform team invested significantly in CI performance, reducing check duration from approximately 30 minutes to approximately 5 minutes over the course of a year, though they acknowledge this remains an ongoing challenge as the pipeline complexity grows.

Airflow integration includes sophisticated automation for monitoring and notification. Using dbt model tags combined with Python glue code, the system posts model run statuses to a #data-monitoring Slack channel, tagging the person who last modified failing code and providing links to aid troubleshooting. Additional bots include a core models bot tracking daily runs of business-critical tables and a stale tables bot that scans for unused tables, archives them, and ultimately deletes them to reduce clutter and costs.

For machine learning serving, the Python microservices use Sanic, a Python async web framework, providing the API layer for model inference requests. Data scientists and ML engineers can deploy these services directly to production on AWS, integrating with Monzo's backend infrastructure without requiring reimplementation by software engineers.

The infrastructure leverages Docker containers for dbt execution (though the team plans to move away from this approach), Google Cloud Composer for managed Airflow (planned migration for 2022), and Cassandra as the production database for operational ML feature serving.

## Scale & Performance

Monzo operates data infrastructure at significant scale with concrete metrics demonstrating both the platform's capabilities and its challenges. The dbt project contains over 4,700 models comprising approximately 600,000 lines of SQL, representing one of the larger known dbt deployments. Some individual data models rebuild approximately 60 terabytes of data daily, indicating substantial data volumes flowing through the transformation pipeline.

Performance benchmarking revealed substantial optimization opportunities. Testing showed that upgrading from Apple Intel-based MacBooks to M1-based systems provided a 3x speed improvement for dbt operations. Upgrading dbt from version 0.15.0 to 0.20.0 yielded another 3x speed increase. Moving dbt out of Docker containers resulted in a 2x speed improvement for Intel CPU users. Combined, these optimizations translate to a 9x speed increase for developers using M1 Macs with the latest dbt version outside containers.

The dbt manifest.json and catalog.json files total over 300 megabytes, creating user experience challenges particularly for remote workers with slower internet connections. This size makes the native dbt docs interface unwieldy for navigation and discovery.

CI/CD pipeline performance improved dramatically through focused optimization, with CI check duration decreasing from approximately 30 minutes to approximately 5 minutes over one year. However, the team acknowledges this remains an ongoing challenge as model complexity and count continue growing.

Looker adoption reached over 80% of Monzo employees as active users, demonstrating successful democratization of data access. The company sends main KPIs to all employees weekly, reflecting a culture of transparency and data-driven decision making.

Near-real-time analytics operate on 15-minute rebuild cycles for critical tables, with most other models refreshing nightly. This frequency balances freshness requirements against computational costs.

Google Cloud Platform costs are substantial enough to warrant dedicated optimization efforts, including configuration changes and complete model redesigns to reduce query costs and storage requirements.

## Trade-offs & Lessons

The decision to fork dbt in 2019 and containerize it in Docker provided short-term benefits for security, productivity features, and environment consistency but created long-term maintenance burden and performance overhead. The team now plans to refactor customizations into plugins, potentially contributing them back to the dbt open-source project or releasing them as separate tools, and migrate away from containers. This experience highlights the trade-off between moving quickly with custom solutions versus investing in upstream contributions and standardization.

The custom dbt features (`upstream prod` and `indirect_ref`) solved real problems at Monzo's scale. The `upstream prod` feature addresses a common challenge with large dbt projects where full upstream rebuilds become prohibitively slow and expensive. The `indirect_ref` feature provides a elegant solution for data governance in multi-tenant BigQuery environments, creating explicit contracts between data producers and consumers. Both features demonstrate that extending open-source tools for organization-specific needs can provide substantial value, though the maintenance burden must be managed.

The mono-repo approach for data code provides consistency and discoverability benefits but creates CI performance challenges as the repository grows. The team's success reducing CI time from 30 minutes to 5 minutes shows that these challenges are solvable, but require dedicated engineering investment. Using CI/CD to enforce data quality standards (documentation, testing, metadata) represents an opportunity to systematically raise data quality across the organization.

The lack of clear data ownership, particularly for events where producing and consuming teams differ, created ongoing friction. The team recognized that proper metadata management and data discovery tooling are essential to solve this problem, not just documentation. They're moving toward solutions like Amundsen, Marquez, or DataHub that provide dedicated metadata management capabilities rather than relying on dbt docs alone.

The decision to enable data scientists to deploy ML models directly to production without engineering reimplementation represents a significant architectural choice. By building templating scripts for Python microservices, Monzo prioritized deployment velocity and data scientist autonomy over the traditional separation of concerns between data science and engineering. This approach works when data scientists have sufficient software engineering capabilities and when proper governance and monitoring exist, but may not suit all organizational contexts.

The Feature Store architecture, inspired by Feast, solves the critical challenge of maintaining feature consistency between training (BigQuery) and serving (Cassandra) environments. Automating this journey prevents the common problem of training-serving skew while reducing the manual work of feature deployment. The trade-off is the operational complexity of maintaining synchronization infrastructure across cloud providers (GCP to AWS).

Self-hosting Airflow provided flexibility but created a single point of failure and required ongoing maintenance effort. The planned migration to Google Cloud Composer in 2022 reflects a willingness to trade some flexibility for reduced operational burden, a common evolution as platforms mature.

Looker's importance to the organization (80% active users, weekly KPI distribution to all employees) combined with the lack of explicit ownership led to gradual degradation of cleanliness, structure, and speed over four years. This highlights a crucial lesson: critical infrastructure components need dedicated ownership and ongoing maintenance investment, not just ad-hoc cleanup projects. The automation scripts for cleaning broken dashboards and detecting nonexistent columns represent reactive solutions to what should have been proactively managed.

The hub-and-spoke organizational model with data professionals embedded across product teams enabled decentralized value creation while maintaining centralized standards. This worked because the platform provided self-service tooling (dbt, Looker) that non-specialists could use effectively. The observation that not just data specialists but also software engineers and business analysts use dbt validates this approach.

The multi-cloud architecture (GCP for analytics, AWS for backend) reflects pragmatic decisions based on different requirements for each workload, but creates complexity in the ML platform that must bridge both environments. The Feature Store specifically addresses this complexity by automating feature synchronization across clouds.
