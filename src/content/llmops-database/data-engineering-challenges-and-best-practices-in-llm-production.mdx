---
title: "Data Engineering Challenges and Best Practices in LLM Production"
slug: "data-engineering-challenges-and-best-practices-in-llm-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed468e9a3a6d291c3fb"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:41:23.180Z"
  createdOn: "2024-11-21T14:08:20.366Z"
llmopsTags:
  - "chromadb"
  - "compliance"
  - "data-cleaning"
  - "data-integration"
  - "databases"
  - "guardrails"
  - "microsoft-azure"
  - "monitoring"
  - "pinecone"
  - "prompt-engineering"
  - "qdrant"
  - "rag"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "unstructured-data"
  - "vector-search"
industryTags: "consulting"
company: "QuantumBlack"
summary: "Data engineers from QuantumBlack discuss the evolving landscape of data engineering with the rise of LLMs, highlighting key challenges in handling unstructured data, maintaining data quality, and ensuring privacy. They share experiences dealing with vector databases, data freshness in RAG applications, and implementing proper guardrails when deploying LLM solutions in enterprise settings."
link: "https://www.youtube.com/watch?v=YPrrKd7Cvh4"
year: 2023
seo:
  title: "QuantumBlack: Data Engineering Challenges and Best Practices in LLM Production - ZenML LLMOps Database"
  description: "Data engineers from QuantumBlack discuss the evolving landscape of data engineering with the rise of LLMs, highlighting key challenges in handling unstructured data, maintaining data quality, and ensuring privacy. They share experiences dealing with vector databases, data freshness in RAG applications, and implementing proper guardrails when deploying LLM solutions in enterprise settings."
  canonical: "https://www.zenml.io/llmops-database/data-engineering-challenges-and-best-practices-in-llm-production"
  ogTitle: "QuantumBlack: Data Engineering Challenges and Best Practices in LLM Production - ZenML LLMOps Database"
  ogDescription: "Data engineers from QuantumBlack discuss the evolving landscape of data engineering with the rise of LLMs, highlighting key challenges in handling unstructured data, maintaining data quality, and ensuring privacy. They share experiences dealing with vector databases, data freshness in RAG applications, and implementing proper guardrails when deploying LLM solutions in enterprise settings."
---

## Overview

This case study comes from a podcast discussion featuring data engineering experts from QuantumBlack (part of McKinsey), specifically Anu Adora (Principal Data Engineer with 13 years of experience) and Alice (Social Partner). The conversation focuses on the often-overlooked but critical role of data engineering in successfully deploying LLMs in production environments, with particular emphasis on financial services and insurance clients.

The core thesis of this discussion is that despite the excitement around LLMs and generative AI, data engineering remains fundamentally important—perhaps more so than ever—and that the transition from MVP/proof-of-concept to production deployments reveals numerous operational challenges that organizations often underestimate.

## The Evolving Role of Data Engineering in the LLM Era

The speakers emphasize that data engineering is not being replaced by LLMs but rather is becoming more complex and critical. While there's been significant hype around technologies like text-to-SQL models that supposedly democratize data access, the reality on the ground is that data engineers' workloads have increased substantially since the emergence of LLMs. This is because the paradigm has shifted from primarily structured data (where solutions for quality measurement, lineage, and pipeline building were well-established) to unstructured data where many of these problems need to be solved anew.

The conversation draws an interesting historical parallel to the "data lake" era of 2008-2010, when organizations were promised they could store videos, audio, and other unstructured content and derive insights from it. In practice, unstructured data in data lakes often "went to die" because there were no effective tools to process it. Now, with LLMs, that promise is finally being realized—but it comes with new operational challenges.

## Key Technical Challenges in LLM Production

### Unstructured Data Ingestion and Quality

One of the most significant challenges discussed is ETL for unstructured data. Unlike traditional ETL where you might track event captures from button clicks on a website, ingesting PDFs and other documents requires entirely different quality considerations. The speakers note that there's a common misconception that you can "just put a PDF in an LLM and get an answer." In reality, substantial pre-processing is required, including chunking documents appropriately—failure to do so results in prohibitive costs when making LLM API calls.

Data quality measurement for unstructured data is fundamentally different from structured data. How do you measure whether a PDF has been correctly parsed? How do you verify that the extracted content is accurate and complete? These are open problems that traditional data quality tools weren't designed to address.

### RAG System Maintenance and Document Versioning

A particularly illustrative example from the discussion involves the challenge of keeping RAG (Retrieval-Augmented Generation) systems up to date. The speakers describe a scenario where an HR chatbot using RAG might retrieve outdated policy information—for instance, referencing an old European vacation policy of 30 days when the company has switched to a different policy. Even if the organization believes they've updated their documentation, remnants of old versions can persist in vector databases, creating what the speakers describe as "an absolute landmine."

This highlights a critical LLMOps consideration: vector databases require active maintenance and versioning strategies. It's not sufficient to simply embed documents once; organizations need processes for tracking document versions, removing outdated content, and ensuring the retrieval system always surfaces the most current information.

### The Insurance Claim Processing Example

A concrete production case study discussed involves an insurance client using LLMs to help agents process claims. The use case involves large commercial contracts (sometimes hundreds of pages) where the LLM checks whether a claim is covered by the policy. The POC worked well and demonstrated value, but moving to production revealed a critical data quality issue: the contracts were scanned and stored in document repositories, but there was no reliable way to ensure the system was using the latest version of each contract.

The implications are severe—if the system uses a two-year-old contract version where a particular coverage wasn't included, it could incorrectly deny valid claims. This example illustrates how LLM production deployments must consider the entire data supply chain, not just the model's capabilities.

## Infrastructure and Architecture Considerations

### Vector Databases

The speakers identify vector databases as a critical new component that enterprises need to add to their data stack. Unlike traditional databases, vector databases are specifically designed to store and query embeddings efficiently, which is essential for RAG architectures. The good news, they note, is that many solutions exist either as standalone products or as extensions to existing databases.

### LLM Deployment Architectures

Three main architectures are discussed for enterprise LLM deployments:

- **Fully hosted/online LLMs**: Using APIs from providers like OpenAI, which raises data privacy concerns but offers the most capable models
- **Offline/self-hosted LLMs**: Using models like Mistral or LLaMA that run entirely within the organization's infrastructure, eliminating data leakage concerns but potentially sacrificing accuracy
- **Hybrid approaches**: Where the LLM handles interaction and reasoning while sensitive data remains entirely within organizational premises, often in vector databases with PII stripped

### Data Management Tool Evolution

Traditional data management tools (ETL tools, data catalogs, data quality frameworks) are evolving to support LLM use cases. Examples include data catalogs that can be queried using natural language to generate SQL, and tools that use LLMs to scan documents for PII. The speakers note that their internal tool at QuantumBlack can analyze tables and identify potential data quality issues automatically.

## Data Privacy and Security

### PII Handling Strategies

The speakers emphasize a "privacy by design" approach: before sending any data to an LLM, organizations should ask whether they actually need to include PII. In 90-95% of cases, the answer is no—data can be anonymized, tokenized, or hashed before being sent to the model. Customer IDs, account numbers, and other sensitive identifiers can often be stripped without affecting the model's ability to perform its task.

For the 5% of cases where PII might seem necessary, additional considerations include:
- Where is the LLM hosted? (geographic data residency requirements)
- What access controls are in place?
- Can data be downloaded or exfiltrated?

### Regulatory Landscape

The European AI Act is mentioned as an emerging regulatory framework that will impose requirements similar to GDPR but specifically for AI applications. Organizations need to prepare for these requirements, which will likely mandate specific guard rails around privacy, quality, and access control.

### Trust and Maturity Parallels

The speakers draw an interesting parallel between current concerns about LLM data privacy and historical concerns about cloud computing. Just as organizations were initially hesitant to move data to the cloud but eventually built trust through experience and improved security practices, similar maturity will develop around LLM usage. However, they acknowledge a key difference: with LLMs, there's an additional layer of uncertainty because we don't fully understand what happens inside the models themselves.

## Production Deployment Strategies

### Risk-Value-Feasibility Framework

The speakers advocate for a structured approach to prioritizing LLM use cases:

- **Value assessment**: What is the dollar impact of this use case?
- **Feasibility evaluation**: How difficult is implementation, including technical complexity and data availability?
- **Risk consideration**: What are the potential negative consequences if something goes wrong?

High-value, high-feasibility, low-risk use cases should be prioritized first, allowing organizations to learn and build capabilities before tackling more challenging deployments.

### Controlled Rollouts

Several strategies for managing risk in production are discussed:

- **Internal-first deployment**: Start with internal use cases like HR chatbots before customer-facing applications
- **Limited user testing**: Launch with a small subset of users to identify issues before broader rollout
- **Intent limiting**: Restrict what the chatbot can do initially, then gradually expand capabilities as confidence grows
- **Human-in-the-loop**: Maintain human oversight and validation of LLM outputs, especially for high-stakes decisions

### Three-Layer Quality Framework

For production LLM systems, the speakers recommend quality checks at three levels:

- **Input quality**: Ensuring source documents are current, accurate, and properly formatted
- **Prompt quality**: Validating that prompts and context are appropriate and not introducing bias
- **Output quality**: Checking that responses are accurate, appropriate, and don't contain hallucinations or harmful content

### Cost Management

A critical but often overlooked aspect of LLMOps is cost management. The speakers note that while generative AI is often pitched as a cost-reduction technology, organizations need to verify this claim for each use case. LLM API costs can be substantial, especially at scale, and the total cost of ownership includes infrastructure, training, governance, and ongoing maintenance—not just API fees.

## LLMs as Tools for Data Engineering

Interestingly, the discussion also covers how LLMs can help data engineers in their work:

- **Code generation**: Assistance with writing data pipelines and ETL code
- **Unit test generation**: Automatically creating tests for data processing code
- **Synthetic data generation**: Creating mock data for integration testing
- **PII classification**: Automatically tagging sensitive data
- **Data cataloging**: Making data discovery more accessible through natural language queries
- **Data quality analysis**: Identifying potential issues in datasets

However, the speakers caution that LLMs "never take no for an answer"—they will always produce output even when hallucinating, so human oversight remains essential.

## Key Takeaways

The overall message is one of cautious optimism: LLMs are powerful tools that can unlock significant value, but production deployment requires careful attention to data engineering fundamentals. Organizations that treat LLMs as magic solutions without addressing data quality, privacy, versioning, and governance will likely face costly failures. Those that approach LLM deployment with the same rigor they would apply to any production data system—plus additional considerations specific to LLMs—will be better positioned for success.