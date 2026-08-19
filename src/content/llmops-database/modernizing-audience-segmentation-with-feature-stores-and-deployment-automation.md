---
title: "Modernizing Audience Segmentation with Feature Stores and Deployment Automation"
slug: "modernizing-audience-segmentation-with-feature-stores-and-deployment-automation"
draft: false
llmopsTags:
  - "classification"
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "agent-based"
  - "human-in-the-loop"
  - "cicd"
  - "orchestration"
  - "devops"
  - "documentation"
  - "databases"
  - "fastapi"
  - "pytorch"
  - "databricks"
industryTags: "e-commerce"
company: "Lululemon"
summary: "Lululemon's audience data science team modernized their personalization infrastructure by implementing deployment automation bundles, building a custom feature store, and exploring agentic AI solutions for their PAVE model, which ranks guests from most to least engaged for digital marketing. The team addressed three core challenges: reducing deployment cycles from 2 weeks to 2 days through infrastructure-as-code approaches, scaling preprocessing across multiple models with a unified feature store architecture, and beginning to explore agentic solutions for automated error handling and next-best-action recommendations. The solutions leverage Databricks technologies including Unity Catalog, MLflow 3.0, and asset bundles, enabling better personalization across email, push, and web channels while maintaining reproducibility and reducing technical debt."
link: "https://www.youtube.com/watch?v=iopjc8N9i3c"
year: 2026
seo:
  title: "Lululemon: Modernizing Audience Segmentation with Feature Stores and Deployment Automation - ZenML LLMOps Database"
  description: "Lululemon's audience data science team modernized their personalization infrastructure by implementing deployment automation bundles, building a custom feature store, and exploring agentic AI solutions for their PAVE model, which ranks guests from most to least engaged for digital marketing. The team addressed three core challenges: reducing deployment cycles from 2 weeks to 2 days through infrastructure-as-code approaches, scaling preprocessing across multiple models with a unified feature store architecture, and beginning to explore agentic solutions for automated error handling and next-best-action recommendations. The solutions leverage Databricks technologies including Unity Catalog, MLflow 3.0, and asset bundles, enabling better personalization across email, push, and web channels while maintaining reproducibility and reducing technical debt."
  canonical: "https://www.zenml.io/llmops-database/modernizing-audience-segmentation-with-feature-stores-and-deployment-automation"
  ogTitle: "Lululemon: Modernizing Audience Segmentation with Feature Stores and Deployment Automation - ZenML LLMOps Database"
  ogDescription: "Lululemon's audience data science team modernized their personalization infrastructure by implementing deployment automation bundles, building a custom feature store, and exploring agentic AI solutions for their PAVE model, which ranks guests from most to least engaged for digital marketing. The team addressed three core challenges: reducing deployment cycles from 2 weeks to 2 days through infrastructure-as-code approaches, scaling preprocessing across multiple models with a unified feature store architecture, and beginning to explore agentic solutions for automated error handling and next-best-action recommendations. The solutions leverage Databricks technologies including Unity Catalog, MLflow 3.0, and asset bundles, enabling better personalization across email, push, and web channels while maintaining reproducibility and reducing technical debt."
notion:
  pageId: "3c1f8dff-2538-8088-99a1-eb2e86264f3d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:05:00.000Z"
  lastEditedTime: "2026-08-19T09:05:00.000Z"
  publishedAt: "2026-08-19T09:12:23Z"
---

## Overview

Lululemon's audience data science team presented their journey modernizing their audience segmentation infrastructure to support production machine learning at scale. The team is responsible for building decision systems that improve personalization in digital marketing across Lululemon's owned channels, including their website, stores, email, and push notifications. Lululemon has a distinctive advantage in that they own the entire process from manufacturing to sale, controlling 99% of their product distribution through their own stores and website, which provides rich first-party data about guest behavior, browsing patterns, and engagement.

The presentation focused on three key modernization efforts: implementing deployment automation through Databricks asset bundles, building a scalable feature store for preprocessing, and exploring agentic AI solutions for automated error handling and next-best-action recommendations. The flagship model discussed is PAVE, which ranks guests from most engaged to least engaged, enabling marketing and product teams to personalize content based on current guest interests and engagement levels.

## Technical Stack and Infrastructure

Lululemon's machine learning infrastructure is built primarily on Databricks technologies, with data storage split between Unity Catalog and Snowflake. The team uses MLflow for model tracking and registry, particularly MLflow 3.0 which they adopted for its flexible tagging capabilities and Unity Catalog integration. The production environment includes multiple workflows for training and inference, with separation of ETL and model training clusters to optimize compute resources appropriately for different workload requirements.

## CI/CD Challenges and Deployment Automation

The first major challenge addressed was the manual and fragile deployment process. Prior to modernization, deploying models to production required a comprehensive manual checklist that included access control configuration, cluster setup replication, environment variable configuration, smoke testing, and coordination with different engineering team members each deployment cycle. This process was not version controlled, prone to human error, and required extensive knowledge transfer since the team did not have dedicated engineering capacity and different engineers supported deployments from week to week.

The deployment cycle time was approximately two weeks from code completion to production, which significantly slowed iteration velocity. The challenge was particularly acute because many critical configurations existed outside the code itself, including cluster configurations, Spark versions, package versions, and environment variables. These had to be manually communicated and replicated each time, creating a brittle handoff between the data science team who developed solutions end-to-end and the technology team responsible for production deployment.

The team implemented Databricks asset bundles, later renamed deployment automation bundles but still referred to as DABs, to address these challenges. DABs provide a code-first approach to building, managing, and deploying entire workflows. The solution uses three primary files: databricks.yaml defines clusters, environment variables, and targets for dev, staging, and production environments with specific configurations for each; workflow.yaml provides parameterized workflow definitions; and the deployment process itself involves shipping the entire asset bundle to QA for minimal manual verification before deploying to production with a simple button click.

The implementation reduced deployment time from approximately two weeks to two days, representing a significant improvement in development velocity. Because the entire configuration is now captured in version-controlled code, the team eliminated most manual steps and associated human errors. The approach enabled them to define different cluster configurations for ETL versus model training workloads and maintain environment-specific configurations for tables that might have different naming conventions or schemas between development and production environments.

## Feature Store and Preprocessing at Scale

The second major modernization effort focused on preprocessing and feature engineering. The team identified that they had essentially duplicated the same preprocessing logic across three different flagship models including PAVE, lifetime value prediction, and others. This duplication led to version drift where different projects used slightly different feature definitions, making it unclear which version was current or correct. The challenges included long preprocessing times, data sources distributed across multiple systems, duplicated compute when different teams ran similar inference processes on different schedules, difficult onboarding for new team members reviewing complex preprocessing code, and opacity around data lineage.

From the data science perspective, the goal was to have clean, fast, reproducible, model-ready and inference-ready features available on demand. The team built a custom feature store architecture with four distinct layers. Layer one is the source layer, which can live in Snowflake, Unity Catalog, AWS, or other data platforms. Layer two consists of canonical facts, which pivot and aggregate raw data to prepare it for feature engineering. Layer three is the feature store itself, implemented as Python code and YAML definitions, where YAML controls all feature definitions, tags, and metadata while Python provides the interface and orchestration. Importantly, nothing is materialized in layer three; it only interacts with layer two dynamically.

Layer four splits into two tracks: 4A is the data scientist-owned point-in-time feature access, where nothing is materialized until explicitly called, and features are retrieved by conditioning on specific audiences and dates; 4B is the always-on inference tables owned by engineering teams, which provide continuous feature availability for production inference. This architecture provides flexibility for data scientists to experiment with different training configurations while also supporting production inference requirements.

The feature store is heavily parameterized and allows data scientists to specify domains like transactional features or email features, select specific features within those domains, and define temporal horizons like last 7 days, 90 days, 180 days, or 365 days. Features can be lazy-loaded into memory for exploration or materialized into Unity Catalog tables for downstream consumption. The system follows sequences to ensure logical feature computation order, for example calculating base features before ratio features that depend on them.

A particularly valuable aspect of the implementation is the metadata architecture, which was influenced by Tecton's approach. Instead of simple column comments on tables, the team built a comprehensive metadata schema with registries for each feature domain. Each feature includes tags, detailed descriptions, business logic documentation, and any other relevant information. This metadata is stored in its own schema and makes feature discovery significantly easier for data scientists unfamiliar with specific domains.

The demonstration showed how a data scientist can import the feature store library, load a spine dataset with entity IDs and dates totaling 100,000 records across 407 dates, request features from specific domains, and either lazy-load results or materialize them to tables. The lazy loading approach retrieves only requested features and loads a small sample for exploration, while the materialized approach writes full feature sets to Unity Catalog tables for production use. The system allows pre-specification of exact features needed, avoiding unnecessary computation when feature selection has already been performed.

## MLflow 3.0 Adoption

While not discussed in extensive detail, the team mentioned adopting MLflow 3.0 for their flagship models, particularly PAVE. The adoption was driven by the flexible tagging capabilities that allow different types of metadata to be associated with models, and the improved shareability through Unity Catalog integration, which associates models with specific schemas and improves discoverability and governance.

## Agentic AI Exploration

The team is exploring two agentic AI use cases, though both were noted to have been announced by Databricks that same morning, validating the team's thinking even if their implementation speed wasn't matching the vendor's announcements. The first use case addresses the common scenario of training pipeline failures on Monday mornings. Currently, their testing notebooks function as smoke alarms that alert when something goes wrong, requiring manual investigation that can consume a day or week of engineering time.

The vision is to evolve from a smoke alarm to a fire handler. Most pipeline failures result from upstream tables loading later than expected due to cascading delays in data pipelines. An agentic system could diagnose failures by executing queries, analyzing data, and identifying root causes like missing upstream tables. Once diagnosed, the agent could automatically retry data loading at a later time like 5 AM, and if successful, automatically kick off the model pipeline without human intervention. Different failure types would have different criticalities, with some being warnings and others breaking errors that require immediate human notification through channels like Microsoft Teams.

The second agentic exploration focuses on moving from segmentation to next-best-action recommendations. Currently, the team has built a predictive feature store that enables segment creation based on likelihood to purchase, likelihood to engage with channels, and shopping preferences. This process works effectively but involves humans in the loop for threshold tuning and segment definition. For example, stakeholders might ask questions about segment sizes under different threshold configurations or with different attribute combinations, requiring iterative analysis.

An intermediate step toward full next-best-action would be having agents reason over threshold curves autonomously. For email campaigns, segments are often pre-conditioned on attributes including likelihood thresholds. Setting a threshold to 0.7 for purchase likelihood will impact segment sizes and downstream campaign effectiveness. While observational analysis can be performed by looking back in time to estimate effects, this currently requires human involvement. The vision is a simple UI where users specify campaigns for what-if analysis, and agents automatically provide recommendations for optimal threshold cuts.

The more ambitious long-term vision is to move away from segments entirely and instead ask what individual guests want rather than what channels need. With inputs including paid media, email, push notifications, and content schedules, an agentic system could determine the most efficient action for each guest to increase their lifetime value and improve their experience with the brand. This aligns with Lululemon's positioning as a premium retailer that needs deep guest understanding. The question becomes: given all available channels and content, what is the optimal interaction for this specific guest at this specific time? This represents a shift from segment-based marketing to truly individualized next-best-action recommendations.

## Organizational Context and Approach

The presentation provided useful context about how the data science team operates within Lululemon. The team builds end-to-end solutions but hands off production deployment to technology teams. They don't have dedicated engineering capacity, meaning different engineers support them on different weeks or months, making reproducibility and documentation particularly important. The team has been maturing alongside their stakeholders, particularly the retention lifecycle team, who have evolved to effectively use predictive segmentation models.

The speakers emphasized their data science rather than engineering backgrounds, noting that the perspective of wanting clean, fast, reproducible features drives their architectural decisions. The presentation acknowledged that some practices like having different table names or column names between development and production environments may not be best practice but do occur in real-world situations, and their feature store architecture accommodates these realities.

## Critical Assessment

While the presentation provides a compelling narrative about modernization efforts, several aspects warrant balanced consideration. The deployment automation improvements are concrete and measurable, with the reduction from two weeks to two days representing genuine operational improvement. However, the feature store implementation appears to be a custom-built solution rather than using existing feature store technologies like Tecton, Feast, or native Databricks Feature Store capabilities that were available. While custom solutions can be tailored to specific needs, they also represent long-term maintenance obligations and may lack community support and established best practices.

The agentic AI use cases remain largely aspirational, with the team acknowledging that Databricks announced similar capabilities the same morning, suggesting these are ideas under exploration rather than production implementations. The value of automated error recovery is clear for common failure modes like delayed upstream tables, but the complexity of truly autonomous debugging and recovery should not be underestimated, particularly for less common failure modes that might require genuine investigation.

The next-best-action vision is compelling but represents a significant shift from current segment-based approaches. The presentation didn't address challenges around attribution, measurement, exploration versus exploitation tradeoffs, or how to validate that individualized recommendations genuinely improve guest lifetime value compared to well-designed segment-based campaigns. The move from segments to individualized actions also typically requires significant organizational change management beyond the technical implementation.

The feature store architecture's separation into point-in-time and always-on inference seems pragmatic but also suggests potential challenges around ensuring consistency between features used in training versus inference. The presentation didn't discuss feature drift monitoring, feature validation, or how they ensure the lazy-loaded features used in model development exactly match the always-on features used in production inference.

Overall, Lululemon's approach demonstrates practical modernization of machine learning infrastructure with concrete wins in deployment automation and feature engineering reproducibility. The exploration of agentic capabilities aligns with industry trends, though implementation details and production results remain to be seen. The case study is valuable for showing how data science teams without dedicated engineering resources can improve their production machine learning capabilities through infrastructure-as-code approaches and systematic feature management.
