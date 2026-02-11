---
title: "Document Metadata Extraction at Scale Using Generative AI for Healthcare and Financial Services"
slug: "document-metadata-extraction-at-scale-using-generative-ai-for-healthcare-and-financial-services"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6932b0f053cb3c6cf7581e35"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:33:26.593Z"
  createdOn: "2025-12-05T10:16:16.344Z"
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "classification"
  - "prompt-engineering"
  - "chunking"
  - "latency-optimization"
  - "cost-optimization"
  - "docker"
  - "serverless"
  - "databases"
  - "fastapi"
  - "anthropic"
  - "amazon-aws"
industryTags: "consulting"
company: "AArete"
summary: "AArete, a management and technology consulting firm serving healthcare payers and financial services, developed Doxy AI to extract structured metadata from complex business documents like provider and vendor contracts. The company evolved from manual document processing (100 documents per week per person) through rules-based approaches (50-60% accuracy) to a generative AI solution built on AWS Bedrock using Anthropic's Claude models. The production system achieved 99% accuracy while processing up to 500,000 documents per week, resulting in a 97% reduction in manual effort and $330 million in client savings through improved contract analysis, claims overpayment identification, and operational efficiency."
link: "https://www.youtube.com/watch?v=kzglciudj1I"
year: 2025
seo:
  title: "AArete: Document Metadata Extraction at Scale Using Generative AI for Healthcare and Financial Services - ZenML LLMOps Database"
  description: "AArete, a management and technology consulting firm serving healthcare payers and financial services, developed Doxy AI to extract structured metadata from complex business documents like provider and vendor contracts. The company evolved from manual document processing (100 documents per week per person) through rules-based approaches (50-60% accuracy) to a generative AI solution built on AWS Bedrock using Anthropic's Claude models. The production system achieved 99% accuracy while processing up to 500,000 documents per week, resulting in a 97% reduction in manual effort and $330 million in client savings through improved contract analysis, claims overpayment identification, and operational efficiency."
  canonical: "https://www.zenml.io/llmops-database/document-metadata-extraction-at-scale-using-generative-ai-for-healthcare-and-financial-services"
  ogTitle: "AArete: Document Metadata Extraction at Scale Using Generative AI for Healthcare and Financial Services - ZenML LLMOps Database"
  ogDescription: "AArete, a management and technology consulting firm serving healthcare payers and financial services, developed Doxy AI to extract structured metadata from complex business documents like provider and vendor contracts. The company evolved from manual document processing (100 documents per week per person) through rules-based approaches (50-60% accuracy) to a generative AI solution built on AWS Bedrock using Anthropic's Claude models. The production system achieved 99% accuracy while processing up to 500,000 documents per week, resulting in a 97% reduction in manual effort and $330 million in client savings through improved contract analysis, claims overpayment identification, and operational efficiency."
---

## Overview and Business Context

AArete is a Chicago-based global management and technology consulting firm that serves healthcare payers (health insurance companies) and financial services organizations. The company helps clients with claims processing, medical and administrative cost reduction, member engagement, care coordination, and care management. Led by Priya Vu, VP of Data Science and AI, AArete developed Doxy AI—a generative AI-powered metadata extraction and interpretation tool—to address a fundamental challenge in their consulting practice: data locked in unstructured documents.

The primary use case centers on processing provider contracts (agreements between health plans and healthcare providers such as hospitals and physicians) and vendor contracts that contain payment terms, contractual obligations, SLAs, KPIs, and other critical business metrics. The challenge was that traditional approaches to extracting this data were not scalable, required significant institutional knowledge, and introduced human subjectivity and inconsistency. Contract lifecycle management solutions available in the market only handled a limited number of configured fields, leaving substantial data inaccessible for downstream analytics and decision-making.

## Evolution Through Three Phases

AArete's journey to production LLM deployment demonstrates a measured, iterative approach to adopting increasingly sophisticated technologies:

**Pre-2020 Manual Phase**: The company relied entirely on manual document processing, leveraging 17 years of ontology experience. Consultants manually extracted information from documents at a rate of approximately 100 documents per week per person. This approach was not only unscalable but also demotivating for consultants who preferred more strategic client-facing work.

**2020-2023 Rules-Based Automation**: Recognizing the need for acceleration, AArete implemented AWS Textract for OCR conversion of PDFs to text, then built a rules-based engine on top. This engine used positional logic—directing the system to specific pages, lines, and character positions to extract predefined fields into JSON structures. While this worked reasonably well for standardized document templates, it struggled with documents that had varied information at different locations, achieving only 50-60% accuracy. When templates diverged from expectations, the system required human intervention, undermining scalability goals.

**2024 Generative AI Phase**: Following rapid prototyping with generative AI models in 2024, AArete developed Doxy AI as a production solution. This represented a fundamental shift from positional rules to semantic understanding, enabling the system to interpret documents "like a human would" regardless of template variations.

## Production Architecture and Technical Implementation

AArete built their entire production solution on AWS infrastructure, demonstrating a comprehensive approach to LLMOps that spans authentication, storage, compute, model inference, and data warehousing.

The architecture begins with a frontend interface built on Next.js where external users authenticate via AWS Cognito. When users upload documents, they are stored in Amazon S3 buckets, which trigger AWS Lambda functions. These Lambda functions invoke AWS Textract for OCR processing—a service AArete specifically noted as "the best OCR tool out there." Textract provides sophisticated document understanding capabilities beyond simple text extraction, including table detection, form and checkbox recognition, signature identification, and handwritten note conversion.

The processed text from Textract then flows to the core inference pipeline running on Amazon ECS as a containerized service. This architectural choice provides scalability and resource management capabilities essential for production workloads. Within this container environment, AArete implemented strategic document chunking—a critical LLMOps consideration for managing context windows and optimizing inference costs and performance. The chunked text is combined with proprietary prompts that encode 17 years of ontology and domain expertise before being sent to AWS Bedrock.

AWS Bedrock serves as the model inference layer, and AArete has been particularly aggressive in their adoption, reportedly becoming "one of the top consumers of AWS Bedrock until recently." They leverage multiple Anthropic Claude models including Claude 3.5, Claude 3.7, and Claude 4.0 (which appears to refer to Sonnet iterations). The ability to swap models based on performance and cost characteristics demonstrates operational flexibility—a hallmark of mature LLMOps practices.

Extracted structured data is stored in Snowflake, making it queryable, aggregable, and accessible for downstream analytics and decision-making through the frontend interface.

## Production Scale and Operational Challenges

The scale achieved by AArete in production is substantial: over 22 months, they processed approximately 2.5 million documents representing 442 billion tokens. This translates to processing up to 500,000 documents per week—a 5000x improvement over the manual approach on a per-person basis.

However, reaching this scale required continuous operational management and partnership with AWS. AArete repeatedly encountered rate limits—both tokens per minute and requests per minute—that constrained throughput. Through ongoing collaboration with their AWS team (specifically mentioned were Dave, Brett, Sanketh, and Garish), they progressively increased these limits to support their production demands. This highlights a critical LLMOps reality: production AI systems require not just technical infrastructure but also vendor relationships and limit management as usage scales.

## Accuracy, Validation, and Business Impact

AArete reports achieving 99% accuracy with their generative AI approach—a dramatic improvement over the 50-60% accuracy of their rules-based system. While the presentation doesn't detail the validation methodology, this accuracy level proved acceptable to both internal teams and clients. The accuracy claim should be viewed in context: it likely represents field-level extraction accuracy on their validation dataset rather than perfect semantic understanding across all edge cases.

The business impact is measured across multiple dimensions:

- **Efficiency**: 97% reduction in manual effort compared to previous approaches
- **Scale**: 500,000 documents per week processing capability versus 100 per person per week manually
- **Client Value**: $330 million in combined direct and indirect savings

Direct savings came primarily from healthcare payer clients who used extracted reimbursement information from provider contracts to identify claims overpayments—creating direct recoupment opportunities. Indirect savings resulted from avoided labor costs that would have been necessary to process documents manually at the required scale.

## Prompt Engineering and Domain Knowledge Integration

A critical success factor emphasized throughout the presentation is the integration of 17 years of ontology and domain expertise into the prompting strategy. While specific prompt details weren't disclosed, this represents a sophisticated approach to production LLM deployment where domain knowledge guides model interpretation rather than relying solely on the model's pre-trained capabilities.

The strategic chunking approach mentioned also suggests careful prompt engineering to maintain context across document segments while staying within model token limits. This likely involves decisions about overlap between chunks, metadata preservation, and field-specific extraction instructions.

## Productization and Future Direction

By the end of 2024, AArete planned to launch Doxy AI as a SaaS platform, with a patent pending on their approach. This transition from internal consulting tool to external product demonstrates confidence in the production maturity of their system.

The strategic vision involves embedding Doxy AI into healthcare payer and financial services operational workflows as part of business process automation. Rather than batch document processing, the goal is continuous integration where contracts are automatically processed through Doxy AI upon signing, with extracted metadata feeding directly into downstream systems for claims adjudication, claim accuracy verification, invoice accuracy checking, and pricing operations.

This vision of "living and breathing" integration represents a mature view of LLMOps—moving beyond standalone AI applications to embedded intelligence within existing business systems. AArete plans to support this through API integrations that allow payer ecosystems to incorporate document intelligence as a native capability.

The company also noted that the success of Doxy AI has unlocked opportunities beyond the initial healthcare provider contract use case, including expanded vendor management applications and contract management in adjacent domains.

## Balanced Assessment and LLMOps Considerations

From an LLMOps perspective, AArete's implementation demonstrates several strengths:

- **Measured evolution**: Rather than jumping directly to generative AI, they tested simpler approaches first, building institutional knowledge about the problem space
- **Robust architecture**: Full AWS stack with appropriate separation of concerns (authentication, storage, compute, inference, data warehousing)
- **Model flexibility**: Multi-model strategy allowing performance and cost optimization
- **Domain integration**: Systematic incorporation of domain expertise into prompts rather than relying on model capabilities alone
- **Production scale**: Demonstrated ability to handle millions of documents and hundreds of billions of tokens
- **Operational maturity**: Proactive management of rate limits and vendor relationships

However, several considerations warrant balanced assessment:

**Accuracy validation**: The 99% accuracy claim is presented without detailed methodology. Production document extraction typically involves trade-offs between recall (finding all relevant information) and precision (accuracy of extracted information). The validation approach, test set composition, and handling of edge cases aren't detailed.

**Cost economics**: Processing 442 billion tokens represents significant infrastructure cost. While client savings of $330 million are impressive, the presentation doesn't provide transparency on the cost structure, margin economics, or TCO comparison between approaches.

**Vendor lock-in**: The architecture is entirely AWS-based, which provides integration benefits but also creates dependency. The reliance specifically on Anthropic models through Bedrock means flexibility is limited to Bedrock's model catalog.

**Generalization claims**: The presentation suggests the system works across varied document types and templates, but the extent of template variability handled successfully isn't quantified. The 99% accuracy might apply to documents within expected ranges while novel document structures could still require human review.

**Human-in-the-loop**: While 97% manual effort reduction is significant, the remaining 3% and the nature of human oversight (validation, exception handling, continuous improvement) isn't detailed. Production document extraction systems typically require ongoing human review loops.

**SaaS platform readiness**: The announced SaaS launch involves additional LLMOps challenges beyond internal consulting use—multi-tenancy, security isolation, performance SLAs, customer-specific customization, and support infrastructure. The presentation doesn't detail how these challenges are addressed.

## Regulatory and Security Considerations

Operating in healthcare and financial services means AArete must navigate stringent regulatory requirements including HIPAA, HITECH, and financial data protection regulations. The presentation notes that High Trust compliance was achieved, and the solution runs within customer VPCs, providing data isolation and control. This is particularly important for production LLM systems handling sensitive contract and claims data.

The use of AWS Cognito for authentication and the containerized deployment on ECS within VPCs suggests appropriate security architecture, though detailed compliance certifications, data handling procedures, and audit capabilities aren't discussed.

## Conclusion and Production Maturity

AArete's Doxy AI represents a substantive production deployment of generative AI for document intelligence, demonstrating operational scale, business impact, and architectural maturity. The evolution from manual to rules-based to LLM-powered approaches shows pragmatic technology adoption. The reported accuracy, throughput, and business value suggest a successful production system, though some claims would benefit from more detailed validation evidence.

The partnership model with AWS—including proactive limit management and technical support—illustrates that production LLM deployments at scale often require more than self-service infrastructure; they need vendor engagement and customization. The planned evolution to SaaS and deeper workflow integration indicates confidence in production readiness and a sophisticated understanding of how AI capabilities should be embedded in business processes rather than deployed as standalone tools.

From an LLMOps maturity perspective, this case study demonstrates advanced capabilities in infrastructure, scaling, model management, and business integration, while leaving some questions around cost optimization, validation rigor, and operational details that would provide a complete picture of production AI system management.