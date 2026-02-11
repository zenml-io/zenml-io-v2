---
title: "Streamlining Clinical Trial Documentation Generation with RAG and LLMs"
slug: "streamlining-clinical-trial-documentation-generation-with-rag-and-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68135654989c949e35549cd1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:06:45.055Z"
  createdOn: "2025-05-01T11:09:08.022Z"
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "regulatory-compliance"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "elasticsearch"
  - "fastapi"
  - "documentation"
  - "security"
  - "compliance"
  - "amazon-aws"
  - "anthropic"
industryTags: "healthcare"
company: "Clario"
summary: "Clario, a clinical trials endpoint data solutions provider, transformed their time-consuming manual documentation process by implementing a generative AI solution using Amazon Bedrock. The system automates the generation of business requirement specifications from medical imaging charter documents using RAG architecture with Amazon OpenSearch for vector storage and Claude 3.7 Sonnet for text generation. The solution improved accuracy, reduced manual errors, and significantly streamlined their documentation workflow while maintaining security and compliance requirements."
link: "https://aws.amazon.com/blogs/machine-learning/clario-enhances-the-quality-of-the-clinical-trial-documentation-process-with-amazon-bedrock?tag=soumet-20"
year: 2025
seo:
  title: "Clario: Streamlining Clinical Trial Documentation Generation with RAG and LLMs - ZenML LLMOps Database"
  description: "Clario, a clinical trials endpoint data solutions provider, transformed their time-consuming manual documentation process by implementing a generative AI solution using Amazon Bedrock. The system automates the generation of business requirement specifications from medical imaging charter documents using RAG architecture with Amazon OpenSearch for vector storage and Claude 3.7 Sonnet for text generation. The solution improved accuracy, reduced manual errors, and significantly streamlined their documentation workflow while maintaining security and compliance requirements."
  canonical: "https://www.zenml.io/llmops-database/streamlining-clinical-trial-documentation-generation-with-rag-and-llms"
  ogTitle: "Clario: Streamlining Clinical Trial Documentation Generation with RAG and LLMs - ZenML LLMOps Database"
  ogDescription: "Clario, a clinical trials endpoint data solutions provider, transformed their time-consuming manual documentation process by implementing a generative AI solution using Amazon Bedrock. The system automates the generation of business requirement specifications from medical imaging charter documents using RAG architecture with Amazon OpenSearch for vector storage and Claude 3.7 Sonnet for text generation. The solution improved accuracy, reduced manual errors, and significantly streamlined their documentation workflow while maintaining security and compliance requirements."
---

## Overview

Clario is a leading provider of endpoint data solutions for the clinical trials industry, having supported over 26,000 clinical trials with more than 700 regulatory approvals across 100+ countries over the past 50 years. This case study describes their collaboration with AWS to develop a generative AI solution for automating the generation of clinical trial documentation, specifically Business Requirement Specification (BRS) documents derived from medical imaging charter documents.

It is worth noting that this case study is published on the AWS Blog and co-authored by AWS personnel, which means there is an inherent commercial interest in presenting AWS services favorably. The solution described is explicitly referred to as a "prototype" that Clario is working to productionize during 2025, so this represents an early-stage implementation rather than a battle-tested production system with proven long-term results.

## The Business Problem

When medical imaging analysis is part of a clinical trial, Clario prepares a medical imaging charter process document (the Charter) that outlines the format and requirements for central review of clinical trial images. From this Charter, the imaging team must create several subsequent documents including the BRS, training slides, and ancillary documents. The content of these downstream documents is largely derived from the Charter but requires significant reformatting and rephrasing.

This manual document generation process presented several challenges: it was time-consuming (potentially taking weeks), prone to inadvertent manual errors, and carried the risk of inconsistent or redundant information that could delay or negatively impact clinical trials. The regulatory nature of clinical trials makes accuracy and consistency particularly critical in this domain.

## Technical Architecture and LLMOps Implementation

The solution leverages a Retrieval Augmented Generation (RAG) architecture built on AWS managed services. The key components include:

**Data Ingestion Pipeline**: Charter-derived documents are processed by an on-premises script in preparation for uploading. The files are then sent to AWS using AWS Direct Connect, which provides a dedicated network connection from on-premises to AWS. The on-premises script handles document chunking and calls an embedding model to produce document embeddings. This approach of keeping some processing on-premises while leveraging cloud AI services represents a hybrid deployment pattern that may be chosen for regulatory compliance or data governance reasons in the healthcare industry.

**Embedding Generation**: Clario uses the Amazon Titan Text Embeddings model offered through Amazon Bedrock to generate embeddings for each document chunk. The use of a managed embedding model through Bedrock simplifies the operational burden of hosting and scaling embedding infrastructure.

**Vector Storage**: Amazon OpenSearch Serverless serves as the durable vector store, with document chunk embeddings stored in an OpenSearch vector index. This enables semantic search to find the most relevant documents for a given query. Clario also stores metadata attributes for the source document and associated trial to enable richer search capabilities. The choice of a serverless vector database aligns with the goal of scalability without managing infrastructure, though it's worth noting that serverless configurations can have cold start latencies and may have different cost profiles compared to provisioned infrastructure.

**User Interface and Workflow Orchestration**: A custom-built user interface serves as the primary access point for users to initiate generation jobs and interact with a chat UI. The UI is integrated with a workflow engine that manages the orchestration process. This workflow engine is responsible for calling the Amazon Bedrock API and orchestrating the BRS document generation.

**LLM Integration**: The workflow engine uses a global specification that stores the prompts to be used as input when calling the large language model. For each document generation request, the engine queries OpenSearch for the relevant Imaging charter, loops through every business requirement, and calls Claude 3.7 Sonnet from Amazon Bedrock to generate responses. Claude 3.7 Sonnet is used both for the question-answering generation and for a conversational AI application that allows users to interact with documents.

**Output and Review Process**: The generated BRS document is output to the user interface where a business requirement writer can review the answers to produce a final document. This human-in-the-loop approach is appropriate for regulatory-sensitive clinical trial documentation where automated outputs require expert verification. Final documents are written to Amazon S3 for consumption by additional document workflows planned for the future.

**Chat Agent**: An as-needed AI chat agent enables document-based discovery and allows users to converse with one or more documents, providing an interactive way to explore and query the document corpus.

## Production Considerations and Security

The case study emphasizes security as a key benefit, with Clario's data security strategy focusing on confining all information within the AWS ecosystem using Amazon Bedrock's security features. By keeping data isolated within AWS infrastructure, the solution aims to protect against external threats and unauthorized access while meeting compliance requirements. For the healthcare and life sciences industry, where patient data and clinical trial information are highly sensitive, this security posture is essential.

The serverless architecture choices (Amazon OpenSearch Serverless, Amazon Bedrock) are positioned as providing scalability and flexibility, allowing the solution to scale as demand increases without manual infrastructure management. The modular design is intended to enable straightforward integration with other Clario systems.

## Results and Current Status

The prototype solution demonstrated several claimed benefits including improved accuracy (minimizing translation errors and inconsistencies, reducing rework and study delays), scalability and flexibility through serverless architecture, and enhanced security. However, it's important to note that specific quantitative metrics are not provided in the case study, and the solution is still in the prototype phase.

The case study mentions that Clario is working to productionize the solution in their Medical Imaging business during 2025, indicating this is not yet a fully deployed production system. The lessons learned section notes the value of involving business stakeholders early and having a clear understanding of business value to be realized, suggesting that organizational alignment was as important as the technical implementation.

## Lessons for LLMOps Practitioners

This case study illustrates several patterns relevant to LLMOps in production environments:

The hybrid on-premises/cloud approach for data processing may be necessary in regulated industries where data governance requirements dictate where certain processing steps can occur. The use of managed services (Bedrock, OpenSearch Serverless) reduces operational burden but creates dependencies on specific cloud providers.

The RAG architecture with a workflow engine orchestrating multiple LLM calls represents a common pattern for domain-specific document generation tasks. The global specification for prompts suggests a centralized prompt management approach, though details on prompt versioning, testing, and iteration are not provided.

The human-in-the-loop review step before final document publication is appropriate for high-stakes applications in regulated industries, acknowledging that LLM outputs require verification rather than being trusted blindly.

The emphasis on security and data isolation within a managed cloud environment addresses a key concern for healthcare organizations considering generative AI adoption. Using Amazon Bedrock means that Clario's data is not used to train the underlying models, which is an important consideration for sensitive clinical data.

Overall, this case study represents an early-stage implementation of generative AI for document automation in the clinical trials space, with promising initial results but without the long-term production experience that would fully validate the approach.