---
title: "Unified Data Foundation for AI-Fueled Mortgage and Home Ownership Platform"
slug: "unified-data-foundation-for-ai-fueled-mortgage-and-home-ownership-platform"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69305dc98f207c3939053d60"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:31:30.921Z"
  createdOn: "2025-12-03T15:56:57.949Z"
llmopsTags:
  - "high-stakes-application"
  - "data-analysis"
  - "structured-output"
  - "chatbot"
  - "question-answering"
  - "rag"
  - "embeddings"
  - "agent-based"
  - "prompt-engineering"
  - "semantic-search"
  - "kubernetes"
  - "docker"
  - "databases"
  - "api-gateway"
  - "orchestration"
  - "devops"
  - "cicd"
  - "monitoring"
  - "scalability"
  - "reliability"
  - "security"
  - "fastapi"
  - "postgresql"
  - "amazon-aws"
industryTags: "finance"
company: "Rocket"
summary: "Rocket Companies, America's largest mortgage provider serving 1 in 6 mortgages, transformed its fragmented data landscape into a unified data foundation to support AI-driven home ownership services. The company consolidated 10+ petabytes of data from 12+ OLTP systems into a single S3-based data lake using open table formats like Apache Iceberg and Parquet, creating standardized data products (Customer 360, Mortgage 360, Transaction 360) accessible via APIs. This foundation enabled 210+ machine learning models running in full automation, reduced mortgage approval times from weeks to under 8 minutes, and powered production agentic AI applications that provide real-time business intelligence to executives. The integration of acquired companies (Redfin and Mr. Cooper) resulted in a 20% increase in refinance pipeline, 3x industry recapture rate, 10% lift in conversion rates, and 9-point improvement in banker follow-ups."
link: "https://www.youtube.com/watch?v=nfVRNsFIfBA"
year: 2025
seo:
  title: "Rocket: Unified Data Foundation for AI-Fueled Mortgage and Home Ownership Platform - ZenML LLMOps Database"
  description: "Rocket Companies, America's largest mortgage provider serving 1 in 6 mortgages, transformed its fragmented data landscape into a unified data foundation to support AI-driven home ownership services. The company consolidated 10+ petabytes of data from 12+ OLTP systems into a single S3-based data lake using open table formats like Apache Iceberg and Parquet, creating standardized data products (Customer 360, Mortgage 360, Transaction 360) accessible via APIs. This foundation enabled 210+ machine learning models running in full automation, reduced mortgage approval times from weeks to under 8 minutes, and powered production agentic AI applications that provide real-time business intelligence to executives. The integration of acquired companies (Redfin and Mr. Cooper) resulted in a 20% increase in refinance pipeline, 3x industry recapture rate, 10% lift in conversion rates, and 9-point improvement in banker follow-ups."
  canonical: "https://www.zenml.io/llmops-database/unified-data-foundation-for-ai-fueled-mortgage-and-home-ownership-platform"
  ogTitle: "Rocket: Unified Data Foundation for AI-Fueled Mortgage and Home Ownership Platform - ZenML LLMOps Database"
  ogDescription: "Rocket Companies, America's largest mortgage provider serving 1 in 6 mortgages, transformed its fragmented data landscape into a unified data foundation to support AI-driven home ownership services. The company consolidated 10+ petabytes of data from 12+ OLTP systems into a single S3-based data lake using open table formats like Apache Iceberg and Parquet, creating standardized data products (Customer 360, Mortgage 360, Transaction 360) accessible via APIs. This foundation enabled 210+ machine learning models running in full automation, reduced mortgage approval times from weeks to under 8 minutes, and powered production agentic AI applications that provide real-time business intelligence to executives. The integration of acquired companies (Redfin and Mr. Cooper) resulted in a 20% increase in refinance pipeline, 3x industry recapture rate, 10% lift in conversion rates, and 9-point improvement in banker follow-ups."
---

## Overview

This case study from Rocket Companies, presented at AWS re:Invent, demonstrates a comprehensive transformation of data infrastructure to support AI-driven operations in the mortgage and home ownership industry. Rocket Companies serves as America's number one mortgage provider, handling 1 in 6 mortgages nationwide, and has been an innovation leader in the housing industry since launching the first online mortgage in 1998. The presentation features three speakers: Sujan (Senior Architect at AWS), Garima Sharma (VP of Data at Rocket), and Ilya Fisher (Director of Engineering at Rocket), providing both vendor and practitioner perspectives on building production AI systems at scale.

The core challenge Rocket faced was typical of rapidly innovating enterprises: data fragmentation resulting from continuous innovation. As the company launched new products and capabilities—from fully digital mortgages in 2015 to mobile mortgages and e-closings in all 50 states by 2019—each initiative brought its own customer data schemas, pipelines, and data assets. This created multiple sources of truth, making it difficult to determine data ownership, cleanliness, and which datasets represented the "golden source." The company recognized that to support its "AI-fueled home ownership strategy" declared two years prior to the presentation, they needed a unified data foundation rather than continuing with siloed systems.

## Unified Data Foundation Architecture

Rocket's solution centered on migrating everything to a single unified data lake built on open table formats, specifically Apache Iceberg on Amazon S3. The scale of this undertaking was substantial: consolidating 10+ petabytes of data initially (growing to 30+ petabytes at the time of the presentation) from 12+ different OLTP systems into one standardized environment. This wasn't merely an infrastructure choice but represented an operating model shift—a recognition that innovation cannot happen rapidly when data lives on isolated islands.

The architecture follows a clean three-layer pattern that has become standard for modern data platforms. The **ingestion layer** focuses on getting any data in fast and reliably, supporting multiple patterns including gateways running on Amazon Elastic Kubernetes Service (EKS), replication between services into S3 buckets, and streaming data with Amazon Kinesis. The key principle here is landing data as it arrives in raw, immutable format using open formats like Parquet to ensure easy integration with various tools.

The **processing layer** implements a "transform once, serve many" philosophy to avoid redundant processing for different use cases. The data lake is partitioned into three zones that some organizations call bronze, silver, and gold: raw data (exactly as landed, forever unchanged), processed data (enriched, cleansed, PII-managed, and standardized), and conformed data (shaped for business-level, domain-aligned consumption). Transformations are event-driven when possible and scheduled when necessary, using declarative, version-controlled code to maintain audit trails. The processing orchestration leverages Amazon EMR for general-use cases, AWS Glue for highly scalable compute, Amazon Managed Flink for streaming data, and Lambda with Step Functions for lightweight workflows. Ilya Fisher noted an important lesson about Step Functions: while powerful and user-friendly, they can become expensive if workflows end up running thousands of times per minute, requiring careful cost monitoring and architectural adjustments.

The **consumption layer** serves as the gateway to the platform, providing one version of truth for every consumer—analysts doing business intelligence, generic applications, data scientists training models—all pointing to the same well-governed dataset. This eliminates the common problem where data scientists train models on different data than production applications use, causing unexpected behavior in production.

## Data Products and APIs

A critical innovation in Rocket's approach was moving from duplication to standardization through curated data products. Instead of 30 teams building their own versions of customer data, Rocket created three key standardized views: **Customer 360** (a single governed view of clients), **Mortgage 360** (comprehensive loan data), and **Transaction 360** (client transaction history). Each data product has standardized definitions, consistent metrics, and clear ownership. Importantly, these weren't just additional tables in the data lake—they were exposed as APIs, making them readily consumable for downstream systems including the agentic AI applications the company deployed.

This API-first approach to data products represents a crucial architectural decision for LLMOps. By exposing curated, governed data through APIs rather than requiring direct database access, Rocket could accelerate the development of AI agents and other ML-powered applications. The standardization meant that features for machine learning models, pulled directly through SageMaker Feature Store from the lake, were consistent with what business intelligence dashboards displayed and what operational applications used.

## Machine Learning and AI at Scale

Rocket operates 210 machine learning models in production, all running in full automation with zero human intervention. This represents a mature MLOps practice built on the unified data foundation. The models support critical business processes, including mortgage approval decisions that now happen in under 8 minutes—a dramatic reduction from the weeks-long process that was standard in the industry just a decade ago, as illustrated by Ilya Fisher's personal anecdote about buying his home.

The ML infrastructure leverages SageMaker Feature Store pulling features directly from the unified data lake, ensuring that training and inference use identical, governed data. The deployment process implements blue-green deployment patterns with embedded metrics and monitoring. If model drift occurs—where a model starts producing results outside initially expected ranges—or if software issues arise, automatic rollback happens without requiring middle-of-the-night pager duty alerts. Engineers simply receive notifications that their changes didn't perform as expected and can investigate during business hours.

## Agentic AI Applications in Production

Perhaps the most compelling LLMOps aspect of Rocket's implementation is their production deployment of agentic AI applications for business intelligence. Ilya Fisher demonstrated a live system (using synthetic data for the presentation) that executive stakeholders actually use in production. This is explicitly distinguished from general-purpose chatbots like ChatGPT or Grok—the system isn't providing best-effort general information from the internet, but rather querying the same unified data platform that powers BI dashboards, ensuring data reliability for executive decision-making.

The system enables non-technical users to quickly stand up new agents for their business use cases through an intuitive interface. Users explain the data sources, context, and information they want to retrieve, and the system creates a new bot application. The demo showed natural language queries like "What is the average mortgage amount right now?" being converted to SQL queries against the analytical data stores, returning results in seconds. Users can request data reorganization ("split this by states"), visualization in various chart formats, deeper analysis, and cross-referencing across metrics (e.g., correlating loan amounts with interest rates).

What makes this production-grade rather than experimental is several factors: the data comes from the governed, unified data platform rather than inconsistent silos; SQL queries are visible for transparency and verification; results can be embedded directly into reports and newsletters; and tens of such agents are actually running in production serving real business needs. The system essentially automates report generation that previously required business analysts to write complex queries, test them multiple times, and manually create visualizations.

## DevOps and Operational Excellence

The operational aspects of Rocket's platform demonstrate mature LLMOps practices. The company doesn't allocate hundreds of engineers to maintain the platform; instead, they rely on well-defined deployment patterns and DevOps systems that run on autopilot—repeatable, governed, and self-healing with no tickets, console clicking, exceptions, or heroics required.

The infrastructure-as-code approach evolved beyond standard practices. Initially using standard DevOps with infrastructure as code, Rocket realized that provisioning individual resources (a Glue job here, a Lambda there) still took days or weeks as engineers configured permissions, event listeners, and integrations. They addressed this by identifying common architectural patterns and creating reusable deployment blocks. Engineers can now deploy a complete pattern—including event listeners, Lambda functions, permissions, Glue jobs, tags, governance for PII processing—in under 10 minutes instead of spending weeks on infrastructure setup.

When new data lands in S3 buckets during ingestion, all downstream components are pre-provisioned: events, ETL pipelines, and even machine learning models expected to train that day. This automation extends to data scientists, who treat models as code—merging changes triggers automatic deployment in blue-green style with appropriate metrics and monitoring. Application developers building APIs use similar patterns with Canary deployments to safely test with lower volumes before full rollout, with automation and metrics helping identify issues before they impact customers.

Security and governance are built in from day one. Everything is encrypted—disk, file, field, address—both in transit and at rest. All resources are properly tagged for economics tracking and ownership identification. The system supports both general information processing and PII-specific workflows with appropriate controls.

## Business Impact and Results

The unified data foundation delivered measurable business impact, particularly during the integration of acquired companies Redfin (home finding), Rocket Mortgage (financing), and Mr. Cooper (home ownership services) to support clients across the entire home ownership journey rather than disconnected stages.

During the early integration phase, 40,000 servicing leads flowed into the unified platform within just 9 days—clean, governed, and ready for activation. On day 12 of integration, a client went from application to closing in just 3 days, compared to the weeks-long industry standard. The engagement engine analyzing conversations and client behavior to surface optimal outreach timing drove a 9-point improvement in banker follow-ups. Daily credit pulls and applications saw a 10% lift in conversion rates.

When a refinancing wave hit in September, systems instantly pulled qualified clients and activated personalized outreach, resulting in a 20% increase in refinance pipeline overnight. By unifying servicing data, client intent, and behavioral signals, Rocket achieved a 3x recapture rate compared to industry averages.

## Architectural Patterns and Best Practices

Several architectural patterns emerge as best practices from Rocket's implementation:

**Aggregation First**: Unify data from all sources—structured, semi-structured, unstructured—into a single place using standardized open table formats. This removes fragmentation and accelerates downstream teams and systems.

**Curation as Data Products**: Rather than having multiple teams rebuild the same data repeatedly, create curated data products organized by business dimensions. Use services like Amazon EMR, Glue Catalog, and Data Zone to support curation processes.

**API-First Consumption**: Expose curated data products through APIs rather than requiring direct database access. This accelerates AI agent development and ensures consistent data access patterns across use cases.

**Event-Driven When Possible**: Use event-driven architectures for real-time responsiveness, but don't hesitate to use scheduled workflows for heavy batch processing. Choose the right tool for each use case rather than forcing everything into one pattern.

**Elastic Economics**: Leverage elastically scalable services (Glue, EMR, Lambda, Kinesis) to match compute resources to actual needs, which vary by time of day, week, month, and year. This achieves near-perfect economics where you pay exactly for what you need when you need it.

**Deployment Patterns as Reusable Blocks**: Abstract common infrastructure patterns into reusable deployment blocks that include all necessary components (compute, events, permissions, governance) rather than requiring engineers to assemble individual pieces.

**Observability and Self-Healing**: Build monitoring, alerting, and automatic rollback into deployment pipelines so issues are detected and resolved before impacting customers, without requiring manual intervention or emergency pages.

## Critical Assessment

While the presentation showcases impressive results, several aspects warrant balanced consideration:

The presentation was delivered at an AWS conference and naturally highlights AWS services extensively. Organizations using other cloud providers or multi-cloud strategies would need to translate these patterns to their environments, though the architectural principles remain valid.

The business results, while specific (9-point improvement, 10% lift, 20% increase), don't always provide baseline context. For instance, a 9-point improvement in banker follow-ups is meaningful if the baseline was low but less impressive if it was already high. Similarly, the 3x industry recapture rate is compelling but doesn't specify whether this was measured against direct competitors or broader industry averages.

The claim of "210 machine learning models running in full automation with zero human intervention" is impressive but would benefit from clarification about what constitutes "zero human intervention." Does this mean no human involvement in ongoing operations, or does it exclude the initial development and periodic retraining? Most production ML systems require at least periodic human review and retraining, so understanding the scope here would be valuable.

The agentic AI demonstration, while compelling, used synthetic data for the presentation. While the speakers emphasized that the system runs identically in production with real data, the actual production performance, accuracy rates, and user satisfaction metrics aren't provided. Questions about how the system handles ambiguous queries, incorrect results, or edge cases aren't addressed.

The timeline and resource investment required for this transformation isn't detailed. Moving from fragmented systems to a unified foundation with 30+ petabytes of data and 210+ production ML models represents a multi-year effort requiring significant engineering resources. Organizations considering similar transformations would benefit from understanding the journey's duration and team size.

## Conclusion

Rocket Companies' case study demonstrates a mature, production-scale implementation of LLMOps principles built on a unified data foundation. The three-layer architecture (ingestion, processing, consumption) with standardized data products exposed via APIs provides a replicable pattern for organizations seeking to operationalize AI at scale. The deployment of agentic AI applications serving executive stakeholders in production, powered by the same governed data platform used for BI and ML, represents an evolution beyond experimental AI chatbots toward reliable, business-critical AI systems.

The operational maturity—including self-healing systems, blue-green and Canary deployments, automatic rollback on model drift, and reusable deployment patterns reducing infrastructure provisioning from weeks to minutes—reflects sophisticated LLMOps practices. The measurable business impacts during company integrations validate that the technical foundation successfully supports strategic business objectives.

While the presentation naturally emphasizes successes and AWS services, the architectural patterns and lessons about evolution from fragmented to unified systems, the importance of data products over duplicated datasets, and the value of treating infrastructure patterns as reusable blocks offer genuine value for practitioners building production AI systems.