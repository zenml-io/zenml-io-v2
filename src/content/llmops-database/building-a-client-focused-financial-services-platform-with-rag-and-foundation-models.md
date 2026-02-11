---
title: "Building a Client-Focused Financial Services Platform with RAG and Foundation Models"
slug: "building-a-client-focused-financial-services-platform-with-rag-and-foundation-models"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b1b35360163c0f799892d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:50:16.315Z"
  createdOn: "2024-12-12T17:19:49.796Z"
llmopsTags:
  - "data-analysis"
  - "data-integration"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "vector-search"
  - "model-optimization"
  - "semantic-search"
  - "langchain"
  - "chromadb"
  - "monitoring"
  - "databases"
  - "security"
  - "compliance"
  - "databricks"
  - "microsoft-azure"
industryTags: "finance"
company: "MNP"
summary: "MNP, a Canadian professional services firm, faced challenges with their conventional data analytics platforms and needed to modernize to support advanced LLM applications. They partnered with Databricks to implement a lakehouse architecture that integrated Mixtral 8x7B using RAG for delivering contextual insights to clients. The solution was deployed in under 6 weeks, enabling secure, efficient processing of complex data queries while maintaining data isolation through Private AI standards."
link: "https://www.databricks.com/customers/mnp"
year: 2024
seo:
  title: "MNP: Building a Client-Focused Financial Services Platform with RAG and Foundation Models - ZenML LLMOps Database"
  description: "MNP, a Canadian professional services firm, faced challenges with their conventional data analytics platforms and needed to modernize to support advanced LLM applications. They partnered with Databricks to implement a lakehouse architecture that integrated Mixtral 8x7B using RAG for delivering contextual insights to clients. The solution was deployed in under 6 weeks, enabling secure, efficient processing of complex data queries while maintaining data isolation through Private AI standards."
  canonical: "https://www.zenml.io/llmops-database/building-a-client-focused-financial-services-platform-with-rag-and-foundation-models"
  ogTitle: "MNP: Building a Client-Focused Financial Services Platform with RAG and Foundation Models - ZenML LLMOps Database"
  ogDescription: "MNP, a Canadian professional services firm, faced challenges with their conventional data analytics platforms and needed to modernize to support advanced LLM applications. They partnered with Databricks to implement a lakehouse architecture that integrated Mixtral 8x7B using RAG for delivering contextual insights to clients. The solution was deployed in under 6 weeks, enabling secure, efficient processing of complex data queries while maintaining data isolation through Private AI standards."
---

## Overview

MNP is a leading Canadian professional services firm specializing in accounting, consulting, tax, and digital services, with nearly 9,000 team members across 127 offices nationwide. The firm sought to modernize their data and analytics platforms to deploy large language models (LLMs) that could help their diverse client base—ranging from small owner-managed businesses to large multinational enterprises—uncover insights and make data-driven business decisions. This case study, presented through the lens of a Databricks customer story, documents MNP's journey from initial GenAI challenges to production deployment of a RAG-based LLM solution.

## Initial Challenges and Failed Approaches

MNP's LLMOps journey began with an initial attempt at GenAI deployment that encountered several significant roadblocks. The firm had been fine-tuning prototypes on Llama 2 13B and 70B models, but faced fundamental infrastructure and operational issues that are instructive for understanding common LLMOps challenges.

The first major issue was tight integration between their foundation model and existing data warehouse, which hindered experimentation with alternative solutions. This architectural coupling is a common anti-pattern in LLMOps where model deployment becomes too dependent on specific infrastructure components, limiting flexibility and iteration speed. The second challenge involved the "time-to-first-token" evaluation metric causing lag issues that negatively affected user experience—a critical consideration for production LLM deployments where latency directly impacts adoption and satisfaction.

Perhaps most significantly, the total cost of ownership (TCO) became prohibitive. The case study attributes this to significant GPU usage driven by the large data volume required for a reliable corpus and the need for frequent retraining and serving of the model. This cost challenge highlights a fundamental tension in LLMOps: balancing model quality (which often requires larger models and more data) against operational sustainability.

## Architecture and Technology Stack

MNP partnered with Databricks to build a new data platform using lakehouse architecture. The solution consolidated structured, semi-structured, and unstructured data into a single repository, which simplified data governance, management, and security. This foundational data layer was essential for enabling the GenAI capabilities that followed.

### Vector Search and Embeddings

A key component of the production architecture was Databricks Vector Search, described as a "highly performant serverless vector database with built-in governance." Vector Search serves as a repository for data embeddings that optimizes data formats for rapid AI processing. The serverless nature of this component is noteworthy from an LLMOps perspective, as it reduces operational overhead for maintaining embedding infrastructure while providing the scalability needed for production workloads.

### Model Selection: From Llama to Mixtral

After their initial challenges with Llama 2 models, MNP ultimately selected Mixtral 8x7B as their foundation model. This is a significant choice from an LLMOps perspective because Mixtral uses a mixture-of-experts (MoE) architecture. The case study notes that MoE models enabled MNP to "tailor the model for context-specific sensitivity, broaden the parameters to accommodate a wider range of instructions and enhance parallel processing to support simultaneous workloads."

The MoE architecture is particularly relevant for production deployments because it allows for more efficient inference—only a subset of the model's parameters are activated for each input, which can significantly reduce computational costs compared to dense transformer models of similar capability. This architectural choice directly addressed the TCO concerns that plagued their initial Llama 2 deployment.

### Retrieval Augmented Generation (RAG)

MNP selected RAG as their preferred refinement strategy over alternatives like fine-tuning. The case study indicates this choice was influenced by "the need to work with datasets that required regular updates or additions." RAG is often preferred in enterprise LLMOps scenarios because it allows organizations to update the knowledge base without retraining the model—a significant advantage when working with dynamic data like financial statements and business metrics.

The ability to "continually integrate new data, refresh the embedding database and employ the information to provide contextual relevance" was described as fundamental to MNP's strategic initiative. This reflects a mature understanding of LLMOps requirements: production LLM systems need mechanisms for knowledge updates that don't require expensive and time-consuming model retraining.

## Model Serving and API Management

The case study describes two key components for production model operations: Databricks Foundation Model APIs and Mosaic AI Model Serving.

Foundation Model APIs are described as helping MNP "monitor the essential components for deploying and managing LLMs," acting as "a conduit between the raw computational power of the lakehouse infrastructure and the end-user application." This abstraction layer ensured smooth model deployment and interaction, which was especially crucial for the RAG approach that required integrating retrieved data into the generative process in real time.

Mosaic AI Model Serving provided production-grade capabilities including constant model availability and responsiveness to queries, resource allocation management, and performance maintenance during peak usage times. These are fundamental LLMOps requirements for any production LLM system, ensuring reliability and consistent user experience.

## Governance and Security

A notable aspect of MNP's deployment is the emphasis on "Private AI" standards. The case study states that the adoption of LLMs and RAG applications within the platform "ensures that MNP's data remains isolated and secure." This is particularly important for a professional services firm handling sensitive client financial data.

Unity Catalog is mentioned as the enabling technology for maintaining "the highest levels of information security while optimizing their AI capabilities." The firm reportedly has "a concrete understanding of how foundation models are trained and on what data"—a governance requirement that is increasingly important for regulated industries where model provenance and data lineage matter.

## Development Timeline and Support

One of the more concrete metrics provided is that MNP's data team was able to "build a model from start to quality assurance testing within four weeks." The headline claim of "less than 6 weeks to GenAI solution deployment" suggests a relatively rapid path to production, though it's worth noting this was achieved with support from Databricks' GenAI Advisory Program.

The GenAI Advisory Program is described as "a resource to help customers adopt GenAI technologies effectively." MNP's Senior Manager of Data Engineering characterized the program as "invaluable to our early successes" and noted that the support "vastly accelerated our path to deployment and adoption." This highlights an important LLMOps consideration: while platforms and tools are essential, expert guidance can significantly accelerate time-to-value, particularly for organizations new to GenAI deployments.

## Future Roadmap

MNP is evaluating DBRX, Databricks' open-source LLM, as a potential future foundation model. DBRX also uses a fine-grained MoE architecture with 132 billion total parameters and 36 billion active parameters per input. The case study suggests this would provide "improved model-serving capabilities through Databricks Foundation Model APIs."

This forward-looking evaluation demonstrates an ongoing commitment to model optimization and suggests a mature LLMOps approach where model selection and upgrades are part of continuous improvement rather than one-time decisions.

## Critical Assessment

While this case study presents a largely positive narrative, it's worth noting several considerations for balanced evaluation. First, the case study is published by Databricks about a Databricks customer, so it naturally emphasizes successful outcomes. The specific metrics around cost savings, accuracy improvements, or user adoption rates are not provided, making it difficult to quantify the actual business impact.

Second, the shift from Llama 2 fine-tuning to Mixtral with RAG represents a significant architectural change. While the case study frames this as a strategic decision, it also reflects the challenges many organizations face when initial GenAI approaches don't meet production requirements. The lessons from the failed Llama 2 approach are valuable but not deeply explored.

Third, the reliance on Databricks' GenAI Advisory Program for achieving the rapid deployment timeline should be factored into any organization attempting to replicate this approach—such expert support may not be available or affordable for all organizations.

Despite these caveats, the case study provides useful insights into the LLMOps challenges faced by professional services firms deploying LLMs for client-facing applications, including the importance of flexible architecture, the trade-offs between fine-tuning and RAG approaches, the critical role of cost management in production LLM deployments, and the governance requirements for handling sensitive client data.