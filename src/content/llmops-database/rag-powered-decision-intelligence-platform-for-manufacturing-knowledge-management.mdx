---
title: "RAG-powered Decision Intelligence Platform for Manufacturing Knowledge Management"
slug: "rag-powered-decision-intelligence-platform-for-manufacturing-knowledge-management"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b1eccc01edf86b61e369a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:47:59.230Z"
  createdOn: "2024-12-12T17:35:08.319Z"
llmopsTags:
  - "chatbot"
  - "document-processing"
  - "question-answering"
  - "data-analysis"
  - "structured-output"
  - "internet-of-things"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "system-prompts"
  - "monitoring"
  - "databases"
  - "documentation"
  - "fastapi"
  - "wandb"
  - "databricks"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "tech"
company: "Circuitry.ai"
summary: "Circuitry.ai addressed the challenge of managing complex product information for manufacturers by developing an AI-powered decision intelligence platform. Using Databricks' infrastructure, they implemented RAG chatbots to process and serve proprietary customer data, resulting in a 60-70% reduction in information search time. The solution integrated Delta Lake for data management, Unity Catalog for governance, and custom knowledge bases with Llama and DBRX models for accurate response generation."
link: "https://www.databricks.com/customers/circuitry-ai"
year: 2023
seo:
  title: "Circuitry.ai: RAG-powered Decision Intelligence Platform for Manufacturing Knowledge Management - ZenML LLMOps Database"
  description: "Circuitry.ai addressed the challenge of managing complex product information for manufacturers by developing an AI-powered decision intelligence platform. Using Databricks' infrastructure, they implemented RAG chatbots to process and serve proprietary customer data, resulting in a 60-70% reduction in information search time. The solution integrated Delta Lake for data management, Unity Catalog for governance, and custom knowledge bases with Llama and DBRX models for accurate response generation."
  canonical: "https://www.zenml.io/llmops-database/rag-powered-decision-intelligence-platform-for-manufacturing-knowledge-management"
  ogTitle: "Circuitry.ai: RAG-powered Decision Intelligence Platform for Manufacturing Knowledge Management - ZenML LLMOps Database"
  ogDescription: "Circuitry.ai addressed the challenge of managing complex product information for manufacturers by developing an AI-powered decision intelligence platform. Using Databricks' infrastructure, they implemented RAG chatbots to process and serve proprietary customer data, resulting in a 60-70% reduction in information search time. The solution integrated Delta Lake for data management, Unity Catalog for governance, and custom knowledge bases with Llama and DBRX models for accurate response generation."
---

## Overview

Circuitry.ai is a startup founded in 2023 by industry leaders with the mission of providing decision intelligence to manufacturers of high-value, complex products such as heavy equipment and automotive. The company was explicitly founded to capitalize on recent advancements in generative AI, aiming to help manufacturers analyze, augment, and automate decisions throughout the buyer lifecycle. Their target customers face significant challenges in managing intricate products with complex bills of materials, requiring specialized knowledge for both sales and service operations. The core offering involves AI-powered advisors (RAG chatbots) that can disseminate product information effectively across various stakeholders including manufacturers, sales associates, channel partners, and end customers.

This case study, while presented as a customer success story by Databricks, offers valuable insights into the practical challenges of building and deploying RAG-based LLM applications in production environments, particularly when dealing with proprietary customer data and the need for multi-tenant data management.

## The Problem Space

Circuitry.ai encountered several significant technical challenges in their journey to productionize their GenAI-powered decision support tools. It's worth noting that these challenges are representative of what many organizations face when moving from prototype to production with RAG systems.

The first major challenge involved applying metadata filters on top of retrievers. The team found insufficient documentation around this capability, which is a common pain point in the RAG ecosystem where filtering retrieved results based on customer-specific metadata is essential for multi-tenant applications. This is particularly important when serving multiple manufacturing clients, each with their own product catalogs and proprietary information.

The second challenge centered on establishing internal quality checks for AI chatbots. The team needed to ensure their chatbots met evaluation criteria before deployment, highlighting the importance of having robust evaluation pipelines in any production LLM system. Without proper evaluation frameworks, organizations risk deploying chatbots that provide inaccurate or irrelevant responses, which could be particularly damaging in a B2B context where trust is paramount.

A third critical challenge was handling knowledge base updates without disrupting internal RAG chains. In a production environment where new products and knowledge articles are constantly being added, the system needs to support incremental updates without requiring full reprocessing of the entire knowledge base. This is a non-trivial problem that many RAG implementations struggle with.

Data segregation and governance emerged as a fundamental requirement. Since Circuitry.ai's models were trained on their customers' proprietary data (internal knowledge resources, product information, etc.), ensuring proper data isolation between tenants was essential for building customer trust. The CEO, Ashok Kartham, emphasized that "most of the data that we wanted to use was actually our customer's proprietary data."

Finally, the integration of multiple data sources with different structures and formats necessitated a robust data integration framework to ensure consistency. This is a common challenge in enterprise AI applications where information may be scattered across PDFs, manuals, knowledge bases, and various document formats.

## Technical Architecture and Implementation

### Data Infrastructure Layer

Circuitry.ai built their solution on the Databricks platform, leveraging several key components for their LLMOps infrastructure:

**Delta Lake** served as the foundational storage layer, providing ACID transactions and unified batch and streaming data processing. Critically, Delta Lake supported the incremental data updates that were crucial for keeping the knowledge base current as new products and knowledge articles were added. This addressed one of their primary pain points around knowledge base management and allowed them to update the RAG system without disrupting ongoing operations.

**Unity Catalog** provided unified governance for data and AI assets. This was particularly important for Circuitry.ai's multi-tenant use case, where proper data segregation was essential to protect proprietary customer information. Unity Catalog facilitated the security and governance requirements that were foundational to their model training processes and ensured that client A's data would never leak into client B's chatbot responses.

### Model Training and Deployment

**MLflow** enabled experiment tracking and model management, which is essential for any production ML/LLM system. While the case study doesn't go into extensive detail about their experimentation process, the use of MLflow suggests they were following best practices around reproducibility and model versioning.

**Databricks Model Serving** provided the deployment infrastructure for their machine learning models. The case study specifically mentions it as a "highly performant serverless vector database with governance built in," which suggests they were using it for both serving their embedding models and potentially their LLM endpoints.

### RAG Pipeline Architecture

The workflow for creating custom knowledge bases followed a structured approach:

- Customers upload documents via the user interface
- This triggers three key tasks: ingesting raw data, processing and generating embeddings, and deploying the serving endpoint
- Each task is supported by associated notebooks handling required inputs and dependencies from upstream tasks
- Once the endpoint is ready, it is published to the application stack for customer use

This notebook-driven approach, while perhaps not the most sophisticated CI/CD pipeline, provides a practical way for a small team to manage the deployment of customer-specific RAG instances.

### Model Selection and Flexibility

Circuitry.ai implemented their RAG pipeline using generative AI models, specifically **Llama** and **DBRX** (Databricks' own open-source LLM). The CEO highlighted the value of model flexibility: "Databricks has made it easier by supporting multiple models, and we saw this as an immediate benefit — the ability to switch between models and extensively test has been a real plus for us."

This model-agnostic approach is a best practice in LLMOps, as it allows organizations to swap in newer or better-performing models as they become available without requiring significant architectural changes. Given the rapid pace of LLM development, this flexibility is essential for maintaining competitive AI products.

### Continuous Improvement Through Feedback

A notable aspect of their implementation was the incorporation of a feedback mechanism for continuous improvement. Users could rate the GenAI-generated responses, creating a feedback loop that helped Circuitry.ai improve their Decision AIdvisor tool. This feedback was used to:

- Simplify the querying process
- Customize prompts for different customers and scenarios
- Make AI accessible to nontechnical users

This user feedback mechanism is a critical component of production LLM systems, as it provides real-world signal on model performance that can be used to improve prompts, fine-tune models, or identify gaps in the knowledge base.

### Metadata Filtering for Multi-Tenancy

With assistance from Databricks, Circuitry.ai implemented metadata filtering alongside Model Serving to filter results and make them more geared toward individual clients. This was particularly important for clients "with a multitude of products and applications," ensuring that search results were relevant to the specific user's context.

## Results and Outcomes

The case study claims a 60-70% reduction in time spent searching for information for Circuitry.ai's customers. While this is an impressive figure, it should be noted that this comes from a vendor case study and specific measurement methodologies are not provided. That said, this type of efficiency gain is consistent with what RAG systems can achieve when they effectively surface relevant information.

The efficiency gain was particularly evident in onboarding processes, where new employees could now have easier access to relevant information, allowing them to become productive more quickly. Customer feedback from proof-of-concept trials was described as "overwhelmingly positive," with praise for the speed and relevance of AI-driven responses. The case study notes that customers now receive answers in seconds rather than minutes, eliminating the need to search through large PDF files manually.

## Future Directions

Circuitry.ai has outlined several planned extensions to their platform:

- Handling more complex data types such as images and schematics in manuals and videos (multimodal capabilities)
- Integration of advanced analytics for customer lifetime value, quality control, and predictive maintenance
- Automation for order management, service scheduling, and dynamic pricing

These planned enhancements suggest a move toward more sophisticated AI agents that can take actions, not just answer questions, which represents the next frontier in enterprise AI applications.

## Critical Assessment

While this case study presents a positive picture of Circuitry.ai's implementation, there are some aspects worth noting from a balanced perspective:

- The specific evaluation criteria used to measure chatbot quality are not detailed
- Quantitative metrics beyond the 60-70% search time reduction are not provided
- The case study is authored by Databricks, creating a natural bias toward emphasizing the platform's benefits
- Details on handling hallucinations, edge cases, or failure modes are not discussed

Despite these caveats, the case study provides valuable insights into the practical challenges and solutions involved in deploying RAG-based LLM applications in a B2B SaaS context, particularly around multi-tenancy, data governance, incremental updates, and the importance of model flexibility and feedback mechanisms in production systems.