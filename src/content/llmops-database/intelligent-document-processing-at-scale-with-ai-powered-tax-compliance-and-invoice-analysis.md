---
title: "Intelligent Document Processing at Scale with AI-Powered Tax Compliance and Invoice Analysis"
slug: "intelligent-document-processing-at-scale-with-ai-powered-tax-compliance-and-invoice-analysis"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6911f5ac11eb1e3c510be5e0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:26:48.447Z"
  createdOn: "2025-11-10T14:24:44.139Z"
llmopsTags:
  - "document-processing"
  - "regulatory-compliance"
  - "classification"
  - "structured-output"
  - "multi-modality"
  - "unstructured-data"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "prompt-engineering"
  - "elasticsearch"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "anthropic"
  - "amazon-aws"
industryTags: "other"
company: "Syngenta"
summary: "Syngenta, a global agricultural company processing over one million invoices annually across 90 countries, implemented \"Wingman,\" an AI-powered intelligent document processing system to automate complex document analysis tasks. The solution leverages Amazon Bedrock Data Automation (BDA) for document parsing and LLMs (primarily Anthropic Claude) for intelligent content extraction and policy comparison. Starting with tax compliance in Argentina, where complex regional tax laws required manual verification of 4,000 invoices monthly, Wingman automatically extracts invoice content, compares it against tax policies, and identifies discrepancies with human-readable explanations. The system achieved near-perfect accuracy and is being scaled to additional use cases including indirect spend reduction, vendor master data accuracy, and expense compliance across multiple countries."
link: "https://www.youtube.com/watch?v=Bd0RCKugIb8"
year: 2025
seo:
  title: "Syngenta: Intelligent Document Processing at Scale with AI-Powered Tax Compliance and Invoice Analysis - ZenML LLMOps Database"
  description: "Syngenta, a global agricultural company processing over one million invoices annually across 90 countries, implemented \"Wingman,\" an AI-powered intelligent document processing system to automate complex document analysis tasks. The solution leverages Amazon Bedrock Data Automation (BDA) for document parsing and LLMs (primarily Anthropic Claude) for intelligent content extraction and policy comparison. Starting with tax compliance in Argentina, where complex regional tax laws required manual verification of 4,000 invoices monthly, Wingman automatically extracts invoice content, compares it against tax policies, and identifies discrepancies with human-readable explanations. The system achieved near-perfect accuracy and is being scaled to additional use cases including indirect spend reduction, vendor master data accuracy, and expense compliance across multiple countries."
  canonical: "https://www.zenml.io/llmops-database/intelligent-document-processing-at-scale-with-ai-powered-tax-compliance-and-invoice-analysis"
  ogTitle: "Syngenta: Intelligent Document Processing at Scale with AI-Powered Tax Compliance and Invoice Analysis - ZenML LLMOps Database"
  ogDescription: "Syngenta, a global agricultural company processing over one million invoices annually across 90 countries, implemented \"Wingman,\" an AI-powered intelligent document processing system to automate complex document analysis tasks. The solution leverages Amazon Bedrock Data Automation (BDA) for document parsing and LLMs (primarily Anthropic Claude) for intelligent content extraction and policy comparison. Starting with tax compliance in Argentina, where complex regional tax laws required manual verification of 4,000 invoices monthly, Wingman automatically extracts invoice content, compares it against tax policies, and identifies discrepancies with human-readable explanations. The system achieved near-perfect accuracy and is being scaled to additional use cases including indirect spend reduction, vendor master data accuracy, and expense compliance across multiple countries."
---

## Overview

Syngenta is a global agricultural science company operating in 90 countries with 30,000 employees, focused on crop protection products and seeds. The company processes approximately one million invoices per year (plus an additional 1.5 million related documents like credit notes), representing a massive document processing challenge. Brett Williams from Syngenta's Enterprise Application Support team, along with Miguel Moya from AWS, presented their "Wingman" project—an intelligent document processing (IDP) system that uses LLMs in production to automate complex document analysis and policy compliance tasks.

The presentation contextualizes the business problem within the broader challenge that 80% of enterprise data is unstructured, making it difficult to extract insights and feed downstream business processes. Syngenta had previously automated basic invoice processing using traditional OCR and machine learning about five to six years ago when they globally insourced accounts payable processing, but this legacy system could only extract minimal information sufficient for three-way matching in SAP. The Wingman project represents a significant evolution, leveraging modern LLM capabilities to extract and understand much richer content from documents.

## Use Cases and Business Problems

Syngenta identified four primary use cases for their Wingman system, each demonstrating different aspects of LLM-powered document processing in production:

**Tax Compliance (Primary Focus)**: The most mature use case involves processing invoices in Argentina, where tax law varies by state and product type, creating significant complexity. Previously, staff manually checked approximately 4,000 invoices per month against tax policy documents—tedious, error-prone work. The Wingman system automatically extracts invoice content, compares it against Syngenta's compiled tax policy (which itself summarizes Argentine tax law), and identifies mismatches in tax codes or calculations. The system not only flags errors but provides human-readable explanations in Spanish for why a particular tax classification is incorrect and what it should be instead. This use case has completed proof of concept and is being scaled to additional countries.

**Indirect Spend Reduction**: For the long tail of procurement spending (the 20% of purchases that lack good control), Wingman can categorize purchased items by running invoices through an LLM to understand what was actually bought. This enables better inventory management and, crucially, allows clustering of similar purchases across the organization to negotiate better volume deals with suppliers. This use case has proven technical capability and awaits scaling.

**Vendor Master Data Accuracy**: To prevent invoice processing interruptions caused by incorrect vendor details (name, bank information, etc.), Wingman compares vendor information extracted from invoices against what's stored in SAP Master Data Governance (MDG). By catching discrepancies before processing begins rather than mid-stream, the system prevents workflow disruptions and improves efficiency.

**Expense Policy Compliance**: For employee expense claims, Wingman can identify the spend type from receipts and compare against expense policy to flag non-compliant purchases. Syngenta is still debating whether to implement this inline within their Concur system or as periodic batch audits, but the technical capability exists for both approaches.

## Technical Architecture and LLMOps Implementation

The architecture demonstrates a well-designed, modular approach to intelligent document processing at scale. The system integrates multiple AWS services in a cohesive pipeline:

**Data Sources and Storage**: The foundation begins with SAP ERP running on EC2 instances, with regular data table extractions to Amazon Redshift for analytics. Documents are offloaded from SAP to a document archiving system hosted on Amazon S3. This creates the document lake that feeds the Wingman pipeline.

**Document Processing Pipeline**: Documents flow through Amazon Bedrock Data Automation (BDA), a fully managed service released as GA in December (presumably 2024). BDA accepts documents in various modalities (PDF, images, audio, video) and performs a combination of OCR and LLM processing to create a "linearization" of the document—essentially converting unstructured content into structured JSON output. BDA offers both standard output (generic document parsing) and custom output (using predefined or custom blueprints to extract specific fields).

**LLM Layer**: The structured output from BDA, along with relevant policy documents (tax policies, expense policies, etc.), is sent to Amazon Bedrock with Anthropic Claude as the primary model. Syngenta experimented with multiple models including Amazon Nova and various Anthropic models, testing different prompt caching techniques to optimize both cost per page and accuracy. The LLM performs the intelligent comparison between extracted invoice data and policy documents, generating suggestions and explanations.

**Storage and Presentation**: Results are stored in Amazon OpenSearch Serverless, which powers the Wingman dashboard built in Power BI. The dashboard presents three columns: SAP data (what was actually posted), Wingman suggestions (what the LLM determined), and visual indicators showing matches and mismatches. The system provides drill-down capabilities to see specific invoice details, confidence scores, and LLM-generated explanations.

**ETL and Orchestration**: AWS Glue jobs handle ETL processes to move data from Redshift into OpenSearch, ensuring the dashboard has access to both the original SAP data and the AI-generated insights.

The architecture deliberately emphasizes modularity, allowing Syngenta to swap out components, experiment with different models in Amazon Bedrock, and adapt the system for new use cases without major refactoring.

## Amazon Bedrock Data Automation (BDA) Deep Dive

A significant portion of the presentation focused on demonstrating BDA's capabilities, as this service serves as the critical parsing and extraction layer:

**Standard Output Mode**: When processing a document with standard output, BDA provides element-level blocks with HTML, markdown, or CSV formatting options. For images embedded in documents (like logos), it generates descriptions using computer vision—for example, describing a Capital One logo with its colors. The system provides visual grounding (bounding boxes showing where information was extracted), confidence scores for each extraction, and optional generative AI summaries of the entire document.

**Custom Output with Blueprints**: BDA includes approximately 40 predefined blueprints for common document types (bank statements, invoices, clinical trials, etc.). When uploading a document, BDA attempts to match it against these blueprints automatically. For example, a bank statement blueprint might define 10 expected extraction fields (account holder name, address, account number, etc.). The demo showed successful extraction of 7 out of 10 fields from a sample bank statement, with visual grounding showing exactly where each piece of information was found.

**Blueprint Customization**: Users can create entirely custom blueprints or modify existing ones. Each field in a blueprint has an "instruction" column—essentially a prompt sent to the LLM—that can be edited to change extraction behavior. The demo showed creating a custom invoice blueprint for travel and expenses with specific date format normalization, demonstrating how LLM capabilities enable on-the-fly data transformation during extraction. For Syngenta's life science work, custom blueprints could extract specific fields from clinical trial documents or experimental records.

**Multimodal Capabilities**: BDA handles audio transcription and summarization, video scene analysis and captioning, and image interpretation. This extends intelligent document processing beyond traditional documents to encompass a wider range of unstructured data. For RAG (Retrieval Augmented Generation) systems, BDA can serve as a sophisticated parser that interprets graphs, images, audio, and video before ingestion into vector databases, significantly enriching the searchable content.

**Integration with Knowledge Bases**: BDA integrates with Amazon Bedrock Knowledge Bases as a parsing method, allowing organizations already using RAG systems to enhance their document ingestion pipeline with multimodal parsing capabilities.

**Console and API Access**: While the demo focused on the AWS console interface for ease of demonstration, all functionality is available via API for programmatic access at scale. A GitHub repository with Jupyter notebooks was mentioned as a resource for developers to experiment with their own documents.

## Production Implementation Details

The tax compliance use case provides the clearest picture of LLMOps in production:

**Workflow**: The system operates primarily in batch mode currently. Invoices are processed through the pipeline, and results populate the Power BI dashboard. Tax and legal staff in Argentina review the dashboard to identify invoices with mismatches. The dashboard provides filtering capabilities to show partial mismatches, full mismatches, or correct classifications.

**Human-in-the-Loop**: While the system is highly automated, human validation remains crucial. Tax professionals review the LLM's suggestions and explanations before taking action (filing claims, paying additional taxes, or correcting future processes). This represents a responsible approach to AI deployment in high-stakes financial contexts.

**Explainability**: The system generates explanations in the appropriate language (Spanish for Argentina) describing why a particular tax code is incorrect and what it should be. This explainability is critical for building trust with users and enabling them to make informed decisions rather than blindly accepting AI outputs.

**Accuracy and Confidence Scoring**: While specific accuracy metrics weren't provided, Miguel mentioned the system achieving "closely to [very high accuracy]" with Brett confirming strong results. BDA's built-in confidence scoring provides additional transparency about extraction certainty.

**Error Detection Beyond Core Use Case**: The system demonstrated capabilities beyond its primary tax compliance mission. In one example, it flagged a currency mismatch where SAP had US dollars recorded for an Argentine invoice that should have been in pesos, showing the LLM's ability to catch errors across multiple dimensions.

## Scaling and Future Roadmap

Syngenta's approach to scaling demonstrates thoughtful LLMOps maturity:

**Phased Rollout**: They completed a proof of concept for tax compliance in Argentina before committing to broader deployment. The next step involves expanding to additional countries, which requires careful consideration since each country has different tax laws and document formats.

**Chat Interface for AP Staff**: Phase two involves bringing Wingman capabilities closer to accounts payable staff through a chatbot interface. This would allow AP processors to check single invoices or small batches in real-time before beginning processing, catching errors earlier in the workflow rather than discovering them in batch reviews.

**Autonomous Policy Updates**: Phase three envisions a highly sophisticated system where Wingman continuously monitors Argentine tax law for changes and proposes updates to Syngenta's compiled tax policy. Humans would still validate these proposed changes, but the LLM would handle the heavy lifting of monitoring legal changes and drafting policy updates. This represents a significant evolution toward more autonomous AI systems while maintaining appropriate human oversight.

**Use Case Discovery**: Brett noted that having the core capability in place generates additional use cases organically. For example, certificates of analysis for chemical products emerged as a new use case just the week before the presentation, following the same pattern of extracting content and comparing against standards or specifications.

**Centralized Patterns and Primitives**: The team is working toward building reusable patterns and primitives that can be centralized across the organization, allowing different business units to leverage the same core capabilities for their specific document processing needs.

**Invoice Data Lake**: A strategic goal involves creating a comprehensive "invoice data lake" containing the raw material from scanned and LLM-processed documents. This foundational data asset would enable various analyses and use cases beyond the initial implementations.

## Model Selection and Optimization

While specific technical details about model selection were limited, the presentation mentioned several important considerations:

**Model Experimentation**: Syngenta and their partner DXE experimented with multiple models available through Amazon Bedrock, including Amazon Nova and Anthropic Claude models. The modular architecture facilitated this experimentation.

**Prompt Caching**: The team tested different prompt caching techniques to optimize cost per page processed. Since the policy documents (tax law, expense policies) remain relatively static while invoices change constantly, prompt caching likely involves keeping the policy context in cache while varying the invoice content.

**Cost-Performance Tradeoffs**: The experimentation focused on balancing accuracy with cost, typical of production LLMOps scenarios. The page-level cost structure suggests they're carefully monitoring and optimizing per-document processing costs.

**Anthropic Claude Selection**: For the production tax compliance system, they selected Anthropic Claude, though the specific version wasn't mentioned. Claude's strong reasoning capabilities and multilingual performance likely influenced this choice, especially given the need for Spanish-language explanations.

## Key Lessons and Best Practices

Brett Williams shared valuable lessons from their implementation:

**Have Your Ground Truth Ready**: The most critical lesson emphasized that comparing documents against policies requires having those policies documented and structured. Organizations need their expense policies, tax policies, or whatever reference material the LLM will compare against prepared before implementing the system. The LLM can help create these policies, but they must exist as structured inputs.

**Modular Architecture Enables Innovation**: The deliberate choice to build a modular system allows Syngenta to experiment with new models, swap components, and adapt to new use cases without major refactoring.

**Start with High-Value, Well-Defined Problems**: Beginning with Argentine tax compliance provided a clear problem with measurable value and well-defined success criteria, rather than trying to solve everything at once.

**Build on Existing Capabilities**: Syngenta's five to six years of experience with traditional document processing automation provided operational knowledge about handling documents at scale, even though the technology has evolved significantly.

**Managed Services Reduce ML Expertise Requirements**: Using fully managed services like BDA and Amazon Bedrock means organizations don't need deep machine learning expertise in-house, lowering barriers to implementation.

## Critical Assessment

While the presentation showcases impressive capabilities, several considerations merit attention:

**Validation and Accuracy Claims**: The presentation mentions achieving high accuracy but doesn't provide specific metrics or discuss failure modes. In production financial systems, understanding edge cases, false positive/negative rates, and handling of ambiguous situations is crucial.

**Scaling Challenges**: Expanding from 4,000 invoices per month in Argentina to processing millions of invoices across 90 countries with varying legal systems, languages, and document formats represents a significant scaling challenge not fully addressed in the presentation.

**Policy Maintenance**: The success of comparing invoices against policies depends entirely on keeping those policies current and accurate. The phase three vision of automated policy updates is compelling but also represents a significant trust and validation challenge.

**Cost at Scale**: While prompt caching and optimization were mentioned, the presentation doesn't discuss total cost of ownership for processing millions of documents annually at scale, which would be a critical business consideration.

**Change Management**: Introducing AI systems that check human work (like expense compliance) or automate previously manual tasks (like tax review) requires careful change management, which wasn't discussed in detail.

**Vendor Lock-in**: The architecture is heavily AWS-centric, which provides integration benefits but also creates potential vendor lock-in concerns that organizations should consider.

Despite these considerations, the Wingman project represents a sophisticated, well-architected approach to intelligent document processing at scale. The emphasis on modularity, experimentation, phased rollout, and maintaining human oversight demonstrates mature LLMOps practices. The clear business value in tax compliance, spend reduction, and operational efficiency, combined with the technical sophistication of the implementation, makes this a valuable case study for organizations considering similar document processing challenges.