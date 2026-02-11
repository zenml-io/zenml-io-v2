---
title: "Building an Enterprise GenAI Platform with Standardized LLMOps Framework"
slug: "building-an-enterprise-genai-platform-with-standardized-llmops-framework"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b20e90dc3fd12d5ce07fe"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:47:50.902Z"
  createdOn: "2024-12-12T17:44:09.974Z"
llmopsTags:
  - "code-generation"
  - "question-answering"
  - "structured-output"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "data-analysis"
  - "rag"
  - "fine-tuning"
  - "prompt-engineering"
  - "embeddings"
  - "vector-search"
  - "semantic-search"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "monitoring"
  - "cicd"
  - "kubernetes"
  - "docker"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "elasticsearch"
  - "security"
  - "compliance"
  - "databricks"
  - "openai"
  - "anthropic"
  - "meta"
  - "hugging-face"
industryTags: "finance"
company: "FactSet"
summary: "FactSet, a financial data and analytics provider, faced challenges with fragmented LLM development approaches across teams, leading to collaboration barriers and inconsistent quality. They implemented a standardized LLMOps framework using Databricks Mosaic AI and MLflow, enabling unified governance, efficient model development, and improved deployment capabilities. This transformation resulted in significant performance improvements, including a 70% reduction in response time for code generation and 60% reduction in end-to-end latency for formula generation, while maintaining high accuracy and enabling cost-effective use of fine-tuned open-source models alongside commercial LLMs."
link: "https://www.databricks.com/blog/factset-genai"
year: 2024
seo:
  title: "FactSet: Building an Enterprise GenAI Platform with Standardized LLMOps Framework - ZenML LLMOps Database"
  description: "FactSet, a financial data and analytics provider, faced challenges with fragmented LLM development approaches across teams, leading to collaboration barriers and inconsistent quality. They implemented a standardized LLMOps framework using Databricks Mosaic AI and MLflow, enabling unified governance, efficient model development, and improved deployment capabilities. This transformation resulted in significant performance improvements, including a 70% reduction in response time for code generation and 60% reduction in end-to-end latency for formula generation, while maintaining high accuracy and enabling cost-effective use of fine-tuned open-source models alongside commercial LLMs."
  canonical: "https://www.zenml.io/llmops-database/building-an-enterprise-genai-platform-with-standardized-llmops-framework"
  ogTitle: "FactSet: Building an Enterprise GenAI Platform with Standardized LLMOps Framework - ZenML LLMOps Database"
  ogDescription: "FactSet, a financial data and analytics provider, faced challenges with fragmented LLM development approaches across teams, leading to collaboration barriers and inconsistent quality. They implemented a standardized LLMOps framework using Databricks Mosaic AI and MLflow, enabling unified governance, efficient model development, and improved deployment capabilities. This transformation resulted in significant performance improvements, including a 70% reduction in response time for code generation and 60% reduction in end-to-end latency for formula generation, while maintaining high accuracy and enabling cost-effective use of fine-tuned open-source models alongside commercial LLMs."
---

## Overview

FactSet is a leading financial data and analytics company that provides services to buy-side and sell-side firms, wealth managers, private equity firms, and corporations. Their strategic focus in 2024 centered on leveraging AI to improve client workflows through search enhancements and chatbot experiences. The company's flagship GenAI initiative, FactSet Mercury, aims to enhance user experience within the FactSet workstation by offering an AI-driven interface powered by LLMs customized for tasks like code generation and data summarization.

This case study describes FactSet's journey from fragmented, early-stage GenAI experimentation to a standardized enterprise LLMOps framework. It is important to note that this article was co-authored by both FactSet and Databricks representatives, so some claims about platform benefits should be viewed in that context. However, the technical details and quantitative improvements cited provide valuable insights into enterprise LLMOps implementation.

## Initial Challenges

FactSet's early GenAI adoption efforts encountered several significant challenges that are common across enterprises attempting to operationalize LLMs at scale.

The lack of a standardized LLM development platform was a primary obstacle. Engineers across different teams were using diverse tools including cloud-native commercial offerings, specialized fine-tuning services, and on-premises solutions. This fragmentation created collaboration barriers where teams struggled to work together due to different tools and frameworks. It also led to duplicated efforts where similar models were being redeveloped in isolation, and inconsistent quality where varied environments resulted in uneven model performance across applications.

The absence of a common LLMOps framework created isolated workflows where teams could not share prompts, experiments, or models effectively. This hindered scalability as demand for ML and LLM solutions grew, and limited reusability of models and assets across projects.

Data governance and lineage posed significant challenges as well. Different teams stored data in various locations, creating data silos and increasing storage costs. Tracking data transformations was difficult, affecting understanding of data usage across pipelines. Ensuring compliance and data integrity with scattered data complicated governance efforts.

Model governance and serving challenges included maintaining multiple serving layers that became cumbersome and time-consuming, managing various model serving endpoints that increased complexity and impacted monitoring, and lacking centralized oversight for consistent performance tracking.

## The Databricks-Based Solution

After evaluating various platforms based on business requirements, FactSet selected Databricks as their enterprise ML/AI platform in late 2023. They standardized new LLM and AI application development on Databricks Mosaic AI and Databricks-managed MLflow.

For data preparation and AI/ML development, FactSet found that Databricks Mosaic AI tools and managed MLflow enhanced efficiency by abstracting away cloud infrastructure complexity. Developers could spend more time innovating with managed compute running on AWS, using both serverless and non-serverless compute options. Product engineers without deep cloud expertise or specialized AI/ML experience were able to access abstracted compute and install libraries directly from their Databricks environment.

A practical example cited in the case study involves an application developer creating an end-to-end RAG pipeline for earnings call summarization. The pipeline used Delta Live Tables to ingest and parse news data in XML format, chunked text by length and speaker, created embeddings and updated Vector Search indexes, and leveraged an open-source model for RAG. Model Serving endpoints then served responses to a front-end application.

Unity Catalog addressed prior governance challenges by providing cataloging capabilities with a hierarchical structure and fine-grained governance of data, models, and additional assets. It enables isolation at both metadata and physical storage levels in a shared environment with multiple users across different teams, reducing the need for individual user IAM role-based governance. FactSet organized projects with isolation where each project receives a pre-made catalog, schema, service principal, and volume.

By leveraging Unity Catalog, FactSet was able to capture table and column level lineage for all operations using Databricks compute, which is critical for monitoring underlying data and enabling explainability of downstream GenAI applications.

## GenAI Hub Integration

FactSet built a cross-business unit enterprise deployment integrated with their internal GenAI Hub, which manages all ML and LLM resources for a given project. This integration enabled centralization of Databricks workspaces, the Model Catalog, and other essential metadata that facilitates collaboration between ML producers and consumers and reusability of models across the firm. Significant integrations of MLflow and Databricks cost-attribution were included, streamlining project hub and cost-attribution workflows by leveraging Databricks cost views to provide per-project business transparency.

During model development, MLflow makes it easy to compare model performance across different iterations. By having MLflow integrated into the Databricks UI, practitioners can take advantage of MLflow through point-and-click operations while also having flexibility to programmatically leverage MLflow capabilities. MLflow also enables a collaborative experience for teams to iterate on model versions, reduce siloed work, and enhance efficiency.

A key consideration during FactSet's evaluation was Databricks' support for a wide range of open-source and commercial models. Mosaic AI enables serving multiple types of models from a single serving layer, including custom models built with Langchain or HuggingFace, open-source foundation models like Llama 3, DBRX, and Mistral, and external models from providers like OpenAI and Anthropic. The MLflow Deployments Server enables simplified model serving for various model types.

## Product Outcomes and Quantitative Results

The Mercury code generation component was an early adopter of the platform. This feature generates boilerplate data frames based on client prompts to request data from existing data interfaces. Initially, this application heavily leveraged a large commercial model that provided consistent, high-quality results. However, early testers encountered over a minute in response time. Using Mosaic AI, FactSet was able to fine-tune meta-llama-3-70b and later Databricks DBRX to reduce average user request latency by over 70%. This demonstrates the flexibility of Databricks Mosaic AI for testing and evaluating open-source models.

The Text-to-Formula project aimed to accurately generate custom FactSet formulas using natural language queries. The team started with a simple RAG workflow but quickly hit a quality ceiling and could not scale to more complex formulas. After extensive experimentation, they developed a compound AI architecture that achieved notable accuracy improvements, though with high end-to-end latency initially.

The Databricks Mosaic AI platform offered detailed fine-tuning metrics for monitoring training progress and supported model versioning for deploying and managing specific model versions in a native serverless environment. By incorporating fine-tuned models using both proprietary systems and open-source solutions, FactSet was able to significantly reduce end-to-end latency by about 60%. Most of these fine-tuned models were from open-source LLM models.

The case study includes a model inference cost analysis for their Transcript Chat Product showing annual cost comparisons based on token analysis across different models they fine-tuned, suggesting significant cost savings compared to commercial LLM alternatives, though training costs were not included in this comparison.

## Strategic Implications

With Databricks integrated into FactSet workflows, there is now a centralized, unified set of tools across the LLM project lifecycle. This allows different teams and business units to share models and data, reducing isolation and increasing LLM-related collaboration. The platform democratized many advanced AI workflows that were traditionally gated behind traditional AI engineers due to complexity.

Like many technology firms, FactSet's initial GenAI experimentation heavily leveraged commercial LLMs because of their ease of use and fast time to market. As their ML platform evolved, they realized the importance of governance and model management when building a GenAI strategy. Databricks MLflow allowed them to enforce best practice standards for LLMOps, experiment with open models, and evaluate across all model types.

The technology goal moving forward is to enable model choice and adopt a culture that lets teams use the right model for the job, supporting a unified experience that includes fine-tuned open-source models alongside commercial LLMs already embedded in their products. This approach balances cost considerations with flexibility, allowing FactSet to optimize for accuracy, performance, and cost depending on use case requirements.