---
title: "Automating Healthcare Documentation and Rule Management with GenAI"
slug: "automating-healthcare-documentation-and-rule-management-with-genai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b1ad52f58ec705455a2be"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:49:29.100Z"
  createdOn: "2024-12-12T17:18:13.708Z"
llmopsTags:
  - "healthcare"
  - "fraud-detection"
  - "chatbot"
  - "code-interpretation"
  - "regulatory-compliance"
  - "fine-tuning"
  - "prompt-engineering"
  - "error-handling"
  - "system-prompts"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "open-source"
  - "microsoft-azure"
  - "databricks"
industryTags: "healthcare"
company: "Orizon"
summary: "Orizon, a healthcare tech company, faced challenges with manual code documentation and rule interpretation for their medical billing fraud detection system. They implemented a GenAI solution using Databricks' platform to automate code documentation and rule interpretation, resulting in 63% of tasks being automated and reducing documentation time to under 5 minutes. The solution included fine-tuned Llama2-code and DBRX models deployed through Mosaic AI Model Serving, with strict governance and security measures for protecting sensitive healthcare data."
link: "https://www.databricks.com/customers/orizon"
year: 2024
seo:
  title: "Orizon: Automating Healthcare Documentation and Rule Management with GenAI - ZenML LLMOps Database"
  description: "Orizon, a healthcare tech company, faced challenges with manual code documentation and rule interpretation for their medical billing fraud detection system. They implemented a GenAI solution using Databricks' platform to automate code documentation and rule interpretation, resulting in 63% of tasks being automated and reducing documentation time to under 5 minutes. The solution included fine-tuned Llama2-code and DBRX models deployed through Mosaic AI Model Serving, with strict governance and security measures for protecting sensitive healthcare data."
  canonical: "https://www.zenml.io/llmops-database/automating-healthcare-documentation-and-rule-management-with-genai"
  ogTitle: "Orizon: Automating Healthcare Documentation and Rule Management with GenAI - ZenML LLMOps Database"
  ogDescription: "Orizon, a healthcare tech company, faced challenges with manual code documentation and rule interpretation for their medical billing fraud detection system. They implemented a GenAI solution using Databricks' platform to automate code documentation and rule interpretation, resulting in 63% of tasks being automated and reducing documentation time to under 5 minutes. The solution included fine-tuned Llama2-code and DBRX models deployed through Mosaic AI Model Serving, with strict governance and security measures for protecting sensitive healthcare data."
---

## Overview

Orizon is a health tech company within Brazil's Bradesco Group that operates a platform connecting insurance companies, hospitals, doctors, and patients. Their core mission involves using advanced analytics and artificial intelligence to detect financial fraud in medical billing—a significant challenge in Brazil's healthcare market. This case study demonstrates how LLMs were deployed in production to automate internal documentation workflows for medical billing rules, dramatically improving operational efficiency while maintaining stringent data governance requirements.

## The Problem

Orizon maintained approximately 40,000 medical rules in their system, with roughly 1,500 new rules being added each month. These rules, coded in legacy languages like C# and C++, were essential for determining healthcare eligibility and detecting fraudulent billing patterns. However, the documentation and interpretation process for these rules created severe operational bottlenecks.

The original workflow was highly manual and resource-intensive. Each time a new rule was added, developers had to manually examine the code, create documentation, and produce flowcharts. This process was described as "very manual and error-prone" by Guilherme Guisse, Head of Data and Analytics at Orizon. Business analysts frequently needed to request C++ developers to interpret code, creating additional delays. The documentation work alone required two dedicated developers from the business analysis team, and adding a single new rule could take several days to complete.

## The GenAI Solution Architecture

Orizon's approach to solving this problem involved several interconnected LLMOps components built on the Databricks Data Intelligence Platform.

### Data Infrastructure Modernization

Before deploying LLMs, Orizon transitioned to a data lakehouse architecture to consolidate previously isolated databases into a unified system. Delta Lake provided the foundation for reliable data storage and management, enabling ACID transactions and unified streaming and batch data processing. This infrastructure modernization was essential groundwork for supporting GenAI workloads at scale.

### Model Selection and Fine-Tuning

Orizon fine-tuned two models for their use case: Llama2-code and DBRX. The choice of Llama2-code is particularly relevant given the use case involves interpreting and documenting source code written in C# and C++. DBRX, Databricks' own foundation model, was also employed. The fine-tuning process incorporated Orizon's proprietary business rules and domain-specific data, which was critical for generating accurate documentation that reflected the company's specific healthcare fraud detection logic.

### MLflow for Lifecycle Management

MLflow, the open-source MLOps platform originally developed by Databricks, was used to manage the entire machine learning lifecycle. This included data ingestion, feature engineering, model building, tuning, and experiment tracking. The emphasis on reproducibility through MLflow is noteworthy—in a production LLMOps context, being able to track experiments and reproduce results is crucial for maintaining model quality over time and debugging issues that may arise.

### Model Serving and Deployment

The fine-tuned models were deployed through Mosaic AI Model Serving, making them accessible across the organization in a secure manner. This serverless model serving approach simplified the deployment process and ensured that the models could scale to meet organizational demand without requiring dedicated infrastructure management.

### Microsoft Teams Integration

A key aspect of the production deployment was the integration of the LLM-powered system into Microsoft Teams. This allowed business users to query the system using natural language and receive instant explanations about rules without relying on developers. The chatbot interface was designed to provide accurate, real-time answers along with graphical documentation, effectively democratizing access to code understanding across the organization.

## Data Governance and Security

Given the sensitive nature of healthcare data and the proprietary nature of Orizon's fraud detection rules, data governance was a critical consideration in the LLMOps implementation. Unity Catalog was employed to ensure secure data management of business rules. As Guisse noted, "We couldn't send this data outside the company because our business rules are confidential."

This constraint meant that Orizon needed to develop and deploy their LLM internally rather than relying on external API-based services. Unity Catalog's ability to define and enforce granular permissions allowed Orizon to maintain the necessary security and compliance while still enabling authorized personnel to access data for critical operations. This approach aligns with best practices for deploying LLMs in regulated industries where data sovereignty and confidentiality are paramount.

The company operates in Brazil, where privacy regulations require strict protection of patient and medical billing information. The LLMOps implementation had to accommodate these compliance requirements while still delivering the intended productivity benefits.

## Results and Outcomes

The case study reports several impressive outcomes, though as with any vendor-published case study, these should be considered with appropriate context:

- **63% automation rate**: Orizon reports that 63% of documentation tasks are now processed automatically through the GenAI system. This represents a significant shift in how work is distributed between humans and AI.

- **Documentation time reduced to under 5 minutes**: What previously took several days now takes less than five minutes, representing a dramatic acceleration of the workflow.

- **Developer resource reallocation**: The automation freed up approximately 1.5 developers who can now focus on higher-value work such as implementing new fraud detection rules rather than documentation tasks.

- **Cost savings of approximately $30K per month**: This figure represents the value of better-utilized developer resources.

- **Potential for 27x increase in rule creation**: The case study suggests that rule creation could scale from 1,500 to 40,000 rules per month, translating to 1 billion Brazilian reals in added productivity. It's worth noting this is described as "potential" rather than achieved results.

## Future Roadmap

Orizon has outlined additional AI use cases they plan to pursue, which indicates ongoing investment in LLMOps capabilities:

- **Medical materials validation**: Development of an LLM to check and validate materials approved for use in medical and hospital procedures, ensuring appropriate and cost-effective care.

- **Customer service enhancement**: Using AI to read application logs and answer customer inquiries in real time, potentially reducing response times from 5-6 days to near-immediate.

## Critical Assessment

While the case study presents compelling results, several factors warrant consideration. This is a Databricks-published customer story, so it naturally emphasizes positive outcomes. The 1 billion BRL productivity figure is described as potential rather than realized. Additionally, the long-term sustainability of the 63% automation rate and whether the system maintains accuracy over time as rules evolve is not addressed.

The technical approach appears sound, with appropriate attention to MLOps practices (using MLflow for lifecycle management), security considerations (Unity Catalog for governance), and practical deployment patterns (Microsoft Teams integration for accessibility). The choice to fine-tune models rather than rely on general-purpose LLMs reflects an understanding that domain-specific accuracy is critical in a fraud detection context.

The case study demonstrates a pragmatic approach to LLMOps in a regulated industry, balancing the productivity benefits of automation with the security and compliance requirements inherent in healthcare applications.