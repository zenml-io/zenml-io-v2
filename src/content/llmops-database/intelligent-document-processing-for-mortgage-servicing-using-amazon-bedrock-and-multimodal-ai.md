---
title: "Intelligent Document Processing for Mortgage Servicing Using Amazon Bedrock and Multimodal AI"
slug: "intelligent-document-processing-for-mortgage-servicing-using-amazon-bedrock-and-multimodal-ai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "683366ffceaa65170bf49eb6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:09:33.077Z"
  createdOn: "2025-05-25T18:52:47.044Z"
llmopsTags:
  - "document-processing"
  - "multi-modality"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "cost-optimization"
  - "fallback-strategies"
  - "fastapi"
  - "databases"
  - "monitoring"
  - "security"
  - "amazon-aws"
  - "anthropic"
industryTags: "finance"
company: "Onity Group"
summary: "Onity Group, a mortgage servicing company processing millions of pages annually across hundreds of document types, implemented an intelligent document processing solution using Amazon Bedrock foundation models to handle complex legal documents with verbose text, handwritten entries, and notarization verification. The solution combines Amazon Textract for basic OCR with Amazon Bedrock's multimodal models (Anthropic Claude Sonnet and Amazon Nova) for complex extraction tasks, using dynamic routing based on content complexity. This hybrid approach achieved a 50% reduction in document extraction costs while improving overall accuracy by 20% compared to their previous OCR and AI/ML solution, with some use cases like credit report processing achieving 85% accuracy."
link: "https://aws.amazon.com/blogs/machine-learning/automating-complex-document-processing-how-onity-group-built-an-intelligent-solution-using-amazon-bedrock?tag=soumet-20"
year: 2025
seo:
  title: "Onity Group: Intelligent Document Processing for Mortgage Servicing Using Amazon Bedrock and Multimodal AI - ZenML LLMOps Database"
  description: "Onity Group, a mortgage servicing company processing millions of pages annually across hundreds of document types, implemented an intelligent document processing solution using Amazon Bedrock foundation models to handle complex legal documents with verbose text, handwritten entries, and notarization verification. The solution combines Amazon Textract for basic OCR with Amazon Bedrock's multimodal models (Anthropic Claude Sonnet and Amazon Nova) for complex extraction tasks, using dynamic routing based on content complexity. This hybrid approach achieved a 50% reduction in document extraction costs while improving overall accuracy by 20% compared to their previous OCR and AI/ML solution, with some use cases like credit report processing achieving 85% accuracy."
  canonical: "https://www.zenml.io/llmops-database/intelligent-document-processing-for-mortgage-servicing-using-amazon-bedrock-and-multimodal-ai"
  ogTitle: "Onity Group: Intelligent Document Processing for Mortgage Servicing Using Amazon Bedrock and Multimodal AI - ZenML LLMOps Database"
  ogDescription: "Onity Group, a mortgage servicing company processing millions of pages annually across hundreds of document types, implemented an intelligent document processing solution using Amazon Bedrock foundation models to handle complex legal documents with verbose text, handwritten entries, and notarization verification. The solution combines Amazon Textract for basic OCR with Amazon Bedrock's multimodal models (Anthropic Claude Sonnet and Amazon Nova) for complex extraction tasks, using dynamic routing based on content complexity. This hybrid approach achieved a 50% reduction in document extraction costs while improving overall accuracy by 20% compared to their previous OCR and AI/ML solution, with some use cases like credit report processing achieving 85% accuracy."
---

## Overview

Onity Group is a financial services company founded in 1988 and headquartered in West Palm Beach, Florida. Through its primary operating subsidiary, PHH Mortgage Corporation, and Liberty Reverse Mortgage brand, the company provides mortgage servicing and origination solutions. This case study describes how Onity implemented an intelligent document processing (IDP) solution using Amazon Bedrock and other AWS services to transform their document processing capabilities at scale.

The core challenge faced by Onity was processing millions of pages across hundreds of document types annually. These documents included complex legal documents such as deeds of trust, where critical information is often buried within dense legal text. Traditional OCR and ML solutions struggled with several fundamental challenges inherent to mortgage servicing documents.

## The Problem with Traditional Approaches

Before implementing the LLM-powered solution, Onity faced several specific challenges that traditional OCR and machine learning models could not adequately address:

The first challenge involved verbose documents with data elements that were not clearly identified. Key mortgage documents contain extensive legal text with critical data elements embedded without clear identifiers or structure. For example, identifying the exact legal description from a deed of trust requires understanding context within paragraphs of complex legal language.

The second challenge related to inconsistent handwritten text. Documents frequently contain handwritten elements that vary significantly in quality, style, and legibility. Simple variations in writing formats—such as state abbreviations versus full names (GA vs. Georgia) or monetary value formats ($200K vs. $200,000)—created significant extraction difficulties for traditional systems.

The third challenge was notarization and legal seal detection. Verifying whether documents are properly notarized, detecting legal court stamps, checking notary commission expiration dates, and extracting data from legal seals of various shapes required deeper visual and textual analysis capabilities that traditional methods could not provide.

Finally, traditional OCR models lacked contextual understanding. While they could digitize text effectively, they could not interpret the semantic context within documents, preventing true comprehension of the information contained therein.

## Solution Architecture

Onity built an intelligent solution combining AWS AI/ML services (specifically Amazon Textract) with generative AI capabilities from Amazon Bedrock. The architecture implements a sophisticated workflow with several key stages.

**Document Ingestion and Preprocessing**: Documents are uploaded to Amazon S3, which triggers automated processing workflows. Before analysis, documents undergo optimization through image enhancement, noise reduction, and layout analysis. These preprocessing steps are designed to maximize accuracy for subsequent OCR processing.

**Classification via Dual-Model Architecture**: The classification process employs a three-step intelligent workflow orchestrated by Onity's document classification application. First, the application uses Amazon Textract to extract document contents. The extracted content is then processed by Onity's custom AI model. If the model's confidence score meets a predetermined threshold, classification is complete.

However, if the document isn't recognized because the custom model wasn't trained on that document type, the application automatically routes the document to Anthropic's Claude Sonnet via Amazon Bedrock. This foundation model can classify documents without additional training by analyzing both text and images. This dual-model approach is a key LLMOps pattern that balances cost efficiency with flexibility and speed to market.

**Dynamic Extraction Routing**: Onity's document extraction application employs an algorithm-driven approach that queries an internal database to retrieve specific extraction rules for each document type and data element. The system then dynamically routes extraction tasks between Amazon Textract and Amazon Bedrock foundation models based on content complexity.

For simpler extraction tasks, traditional OCR via Textract may be sufficient and more cost-effective. For complex tasks requiring visual and textual analysis—such as verifying notarization—the application leverages Amazon Bedrock's advanced text and vision models. This dynamic routing allows Onity to optimize the balance between cost, performance, and accuracy for each specific extraction task.

**Model Selection and Flexibility**: The solution is built on the Amazon Bedrock API, which provides access to multiple foundation models from various providers including Anthropic (Claude), Amazon (Nova), AI21 Labs, Cohere, Meta, Mistral AI, and Stability AI. This architecture allows Onity to select and potentially switch between models that provide the optimal balance of cost and accuracy for each document type. The case study specifically mentions Anthropic's Claude Sonnet and Amazon Nova Pro as models used for text and vision tasks.

**Persistence**: Extracted information is stored in a structured format in Onity's operational databases and in a semi-structured format in Amazon S3 for further downstream processing.

## Security Considerations

Given the sensitive nature of financial documents, the solution implements robust security measures. Data is encrypted at rest using AWS Key Management Service (KMS) and in transit using TLS protocols. Access to data is controlled using AWS Identity and Access Management (IAM) policies. The solution follows AWS Security best practices and the Security Pillar of the AWS Well-Architected Framework, with specific attention to Financial Services Industry (FSI) requirements.

## Specific Use Cases and Results

The case study provides several concrete examples of how the solution handles different document types:

**Deed of Trust Data Extraction**: For these verbose legal documents containing notarization details, legal stamps, property descriptions, and rider attachments, the intelligent extraction solution reportedly reduced data extraction costs by 50% while improving overall accuracy by 20% compared to the previous OCR and AI/ML solution. The system can extract notarization information including state, county, notary date, expiry date, presence of seal, and names from documents combining printed text, handwritten text, and visual seals.

**Home Appraisal Document Review**: For appraisal reports with detailed property comparisons requiring review of room counts, square footage, and property features, the automated solution validates property comparisons and identifies potential discrepancies. The case study claims a 65% improvement in accuracy over the manual process.

**Credit Report Analysis**: For credit reports containing information from multiple credit bureaus in diverse formats, the solution automatically extracts and standardizes credit scores and scoring models, achieving approximately 85% accuracy.

## Prompt Engineering Patterns

The case study reveals several prompt engineering patterns used in production. For notarization extraction, the prompt instructs the model to extract specific fields and includes the directive that if a field is manually crossed out or modified, the manually written or modified text should be used. For rider information extraction, the prompt specifies the output format as JSON with specific keys. For appraisal review, the prompt includes specific verification rules (such as checking if square footages are within a specified percentage) and requests explanations for the analysis.

## Critical Assessment

While the case study reports impressive results, several caveats should be noted. This is an AWS blog post, so it naturally presents the AWS services in a favorable light. The claimed metrics (50% cost reduction, 20% accuracy improvement, 85% accuracy on credit reports) are self-reported and not independently verified.

The dual-model architecture represents a pragmatic approach that many organizations are adopting—using cheaper traditional ML models when sufficient and falling back to more expensive LLMs only when needed. This pattern of intelligent routing based on confidence scores and task complexity is a sound LLMOps strategy that balances capability with cost.

The ability to switch between different foundation models via Amazon Bedrock is presented as a key advantage, allowing organizations to adapt as new models become available or as pricing changes. However, the case study doesn't discuss potential challenges such as prompt compatibility across models, evaluation frameworks for comparing model performance, or the operational complexity of managing multiple model integrations.

The security architecture described follows standard AWS patterns for financial services, though the specifics of how they handle data retention, model input/output logging, and compliance requirements are not detailed.

Overall, this case study demonstrates a mature production implementation of LLMs for document processing in a regulated industry, with thoughtful architecture decisions around model selection, task routing, and cost optimization.