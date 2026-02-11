---
title: "Unified Healthcare Data Platform with LLMOps Integration"
slug: "unified-healthcare-data-platform-with-llmops-integration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "678a84b307939665a66138c3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:55:46.789Z"
  createdOn: "2025-01-17T16:26:27.379Z"
llmopsTags:
  - "healthcare"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "legacy-system-integration"
  - "rag"
  - "embeddings"
  - "fine-tuning"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "cicd"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "postgresql"
  - "redis"
  - "elasticsearch"
  - "langchain"
  - "wandb"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "healthcare"
company: "Doctolib"
summary: "Doctolib is transforming their healthcare data platform from a reporting-focused system to an AI-enabled unified platform. The company is implementing a comprehensive LLMOps infrastructure as part of their new architecture, including features for model training, inference, and GenAI assistance for data exploration. The platform aims to support both traditional analytics and advanced AI capabilities while ensuring security, governance, and scalability for healthcare data."
link: "https://medium.com/doctolib/building-a-unified-healthcare-data-platform-architecture-2bed2aaaf437"
year: 2025
seo:
  title: "Doctolib: Unified Healthcare Data Platform with LLMOps Integration - ZenML LLMOps Database"
  description: "Doctolib is transforming their healthcare data platform from a reporting-focused system to an AI-enabled unified platform. The company is implementing a comprehensive LLMOps infrastructure as part of their new architecture, including features for model training, inference, and GenAI assistance for data exploration. The platform aims to support both traditional analytics and advanced AI capabilities while ensuring security, governance, and scalability for healthcare data."
  canonical: "https://www.zenml.io/llmops-database/unified-healthcare-data-platform-with-llmops-integration"
  ogTitle: "Doctolib: Unified Healthcare Data Platform with LLMOps Integration - ZenML LLMOps Database"
  ogDescription: "Doctolib is transforming their healthcare data platform from a reporting-focused system to an AI-enabled unified platform. The company is implementing a comprehensive LLMOps infrastructure as part of their new architecture, including features for model training, inference, and GenAI assistance for data exploration. The platform aims to support both traditional analytics and advanced AI capabilities while ensuring security, governance, and scalability for healthcare data."
---

## Overview

Doctolib, a prominent European healthcare technology company, has published a detailed architectural blueprint for transforming their data platform from a monolithic, centralized system into a modern "Unified Healthcare Data Platform" capable of supporting AI and machine learning use cases at production scale. This case study is notable because it represents an aspirational architecture rather than a completed implementation—the company is transparent about their current limitations and their planned solutions. This distinction is important when evaluating the claims made, as many of the capabilities described are intended rather than proven in production.

The primary driver for this transformation is Doctolib's ambition to evolve from a reporting-focused platform to becoming a leader in AI for healthcare. Their existing platform, while effective for business intelligence and analytics, was not designed to handle the requirements of training and deploying machine learning models, particularly large language models (LLMs), in a healthcare context where data sensitivity and governance are paramount.

## Context and Problem Statement

Over the past 4-5 years, Doctolib's data team grew from a small startup team to over a hundred members. During this growth, they adopted a pragmatic but ultimately limiting approach: a single Git repository, single AWS account, single Redshift data warehouse, and single Airflow orchestrator. This monolithic architecture created several challenges that became particularly acute when attempting to support AI and ML use cases:

The centralized Git repository with a single daily release cycle led to CI pipelines taking 30-40 minutes, slowing development velocity. The shared Airflow instance struggled with event-driven workflows essential for ML pipelines, and all DAGs sharing the same IAM role created security vulnerabilities unacceptable for healthcare data. The monolithic Redshift warehouse meant all users had administrative rights, making it impossible to enforce fine-grained access controls needed for sensitive healthcare data used in AI training.

Perhaps most critically, the architecture lacked the foundation for supporting ML workloads: no vector databases for embeddings, no model registry, no feature store, and no infrastructure for deploying and monitoring models in production.

## LLMOps Architecture Components

The new platform architecture includes explicit components for LLMOps, which Doctolib describes as providing "the infrastructure, workflows, and management capabilities necessary to operationalize large language models (LLMs) in production." The key components include:

### LLMOps Tooling

The architecture explicitly calls out LLMOps tooling as a component of their ML Training Platform. This includes tools for model fine-tuning, deployment, monitoring, versioning, prompt optimization, and cost management. While the article does not specify which specific tools they plan to use (e.g., LangChain, LlamaIndex, or proprietary solutions), the functional requirements are clearly articulated. The inclusion of prompt optimization as a first-class concern suggests they anticipate significant investment in prompt engineering practices.

### Vector Database

As part of their ML Storage layer, Doctolib plans to implement a vector database "optimized for storing, indexing, and searching high-dimensional vector data, enabling efficient similarity searches for AI applications." This is a critical component for any LLM-based system that relies on retrieval-augmented generation (RAG) or semantic search. The vector database will work alongside their traditional Lakehouse architecture, which combines data lake storage with data warehouse governance.

### Model Serving and Inference

The Inference Platform includes several components essential for production LLM deployment:

- **LLM Providers**: APIs and tools for large language models to enhance text generation, summarization, translation, and language understanding
- **Model Serving**: Deploys ML models for real-time predictions with scaling, versioning, and API endpoint management
- **Model Inference Engine**: Optimizes execution across multiple hardware backends including GPUs, CPUs, and specialized accelerators
- **Model Monitoring**: Tracks production model performance, monitoring accuracy, drift, and resource usage with anomaly alerting
- **Model As a Service**: A catalog of pre-trained models exposed as APIs or endpoints

The Model Inference Engine's multi-backend support is particularly relevant for LLM deployment, where GPU optimization is crucial for acceptable latency and cost management.

### GenAI Assistant

Within their Data Exploration and Reporting layer, Doctolib includes a "GenAI Assistant" described as a "conversational AI tool enabling natural language data exploration for non-technical users." This represents an internal application of LLM technology to democratize data access—a common pattern where organizations first apply LLMs to their own internal workflows before exposing them to customers.

## Supporting Infrastructure

Several other components in the architecture indirectly support LLMOps but are essential for production-grade deployments:

### Feature Store

The feature store serves as a "centralized repository for managing, storing, and serving features used in machine learning models." For LLM applications, this could include pre-computed embeddings, user context features, or structured data used to augment prompts.

### Model Registry

The model registry provides "centralized management of machine learning model lifecycles, ensuring governance, traceability, and streamlined deployment." For LLMs, this becomes particularly important given the size and versioning complexity of these models, especially when fine-tuning is involved.

### ML Experiment Tracking

The experiment tracking capabilities help "data scientists and ML engineers log, organize, and compare experiments," recording metadata such as hyperparameters, model architectures, datasets, evaluation metrics, and results. For LLM work, this would extend to tracking prompt variations, fine-tuning runs, and evaluation benchmarks.

### Data Governance for AI

The data governance layer is particularly important for healthcare AI applications. Components include:

- Column-level and row-level access controls for protecting sensitive healthcare data
- Data masking and encryption to enable AI training on de-identified data
- Comprehensive audit logs for compliance
- A "DataShield Transformer" that enforces security measures like encryption and pseudonymization during transformations, helping data product developers comply with legal and regulatory standards

The emphasis on healthcare ontologies and standards (HL7, FHIR, OMOP, DICOM) suggests they plan to leverage structured medical knowledge in their AI applications, potentially for semantic search or knowledge-grounded responses.

## Team Structure and Ownership

Doctolib describes four teams within their Data and Machine Learning Platform organization, with the ML Platform team explicitly responsible for "implementing all platform components that allow data scientists and ML engineers to explore, train, deploy, and serve models that can be integrated into Doctolib's products at a production-grade level."

This clear ownership model is important for LLMOps maturity. The separation between the ML Platform team and other teams (Data Engineering Platform, Data Ingestion & Output, Data Tools) with well-defined interfaces helps prevent the common anti-pattern of unclear ownership that often plagues ML systems in production.

## Critical Assessment

It's important to note several caveats when evaluating this case study:

This is primarily an architectural vision rather than a proven implementation. The article explicitly states this is a planned rebuild, and subsequent posts will detail actual technical choices. The claims about LLMOps capabilities represent intentions rather than demonstrated results.

The article does not provide specific details about LLM use cases they plan to support. Beyond the GenAI Assistant for internal data exploration, there's no discussion of customer-facing LLM applications, which might be intentional given the sensitivity of healthcare AI.

There's no discussion of specific evaluation frameworks, testing strategies for LLM outputs, or approaches to handling hallucinations—critical concerns for healthcare applications where accuracy is paramount.

Cost management for LLM inference, while mentioned as part of LLMOps tooling, is not elaborated upon despite being a significant operational concern.

## Conclusion

Doctolib's architectural blueprint represents a thoughtful approach to building infrastructure capable of supporting LLMOps at scale in a healthcare context. The explicit inclusion of LLMOps tooling, vector databases, model serving infrastructure, and governance frameworks demonstrates awareness of the unique requirements of production LLM systems. However, as this represents planned rather than implemented architecture, the true test will come in subsequent publications that detail actual implementations and lessons learned. The emphasis on data governance and security is appropriate for healthcare AI, though the absence of discussion around LLM-specific challenges like evaluation, hallucination mitigation, and content safety leaves some important questions unanswered.