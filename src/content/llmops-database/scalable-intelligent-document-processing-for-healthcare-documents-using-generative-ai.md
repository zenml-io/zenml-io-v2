---
title: "Scalable Intelligent Document Processing with Multi-Tenant Serverless Architecture"
slug: "scalable-intelligent-document-processing-for-healthcare-documents-using-generative-ai"
draft: false
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "classification"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "structured-output"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "multi-agent-systems"
  - "error-handling"
  - "cost-optimization"
  - "latency-optimization"
  - "serverless"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "devops"
  - "cicd"
  - "scaling"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "amazon-aws"
industryTags: "healthcare"
company: "Ricoh"
summary: "Ricoh USA faced significant scalability challenges in their healthcare document processing operations, where each new customer implementation required 40-60 hours of custom engineering work involving unique prompt engineering, model fine-tuning, and integration testing. To address anticipated sevenfold growth in document volume (from 10,000 to 70,000 documents monthly), Ricoh partnered with AWS to implement the GenAI IDP Accelerator using a serverless architecture combining Amazon Textract for OCR and Amazon Bedrock foundation models for intelligent classification and extraction. The solution reduced customer onboarding time from 4-6 weeks to 2-3 days, decreased engineering hours per deployment by over 90% (from ~80 hours to <5 hours), and created a reusable, multi-tenant framework that maintains strict healthcare compliance standards (HITRUST, HIPAA, SOC 2) while enabling effective human-in-the-loop workflows through confidence scoring mechanisms."
link: "https://aws.amazon.com/blogs/machine-learning/how-ricoh-built-a-scalable-intelligent-document-processing-solution-on-aws?tag=soumet-20"
year: 2026
seo:
  title: "Ricoh: Scalable Intelligent Document Processing with Multi-Tenant Serverless Architecture - ZenML LLMOps Database"
  description: "Ricoh USA faced significant scalability challenges in their healthcare document processing operations, where each new customer implementation required 40-60 hours of custom engineering work involving unique prompt engineering, model fine-tuning, and integration testing. To address anticipated sevenfold growth in document volume (from 10,000 to 70,000 documents monthly), Ricoh partnered with AWS to implement the GenAI IDP Accelerator using a serverless architecture combining Amazon Textract for OCR and Amazon Bedrock foundation models for intelligent classification and extraction. The solution reduced customer onboarding time from 4-6 weeks to 2-3 days, decreased engineering hours per deployment by over 90% (from ~80 hours to <5 hours), and created a reusable, multi-tenant framework that maintains strict healthcare compliance standards (HITRUST, HIPAA, SOC 2) while enabling effective human-in-the-loop workflows through confidence scoring mechanisms."
  canonical: "https://www.zenml.io/llmops-database/scalable-intelligent-document-processing-for-healthcare-documents-using-generative-ai"
  ogTitle: "Ricoh: Scalable Intelligent Document Processing with Multi-Tenant Serverless Architecture - ZenML LLMOps Database"
  ogDescription: "Ricoh USA faced significant scalability challenges in their healthcare document processing operations, where each new customer implementation required 40-60 hours of custom engineering work involving unique prompt engineering, model fine-tuning, and integration testing. To address anticipated sevenfold growth in document volume (from 10,000 to 70,000 documents monthly), Ricoh partnered with AWS to implement the GenAI IDP Accelerator using a serverless architecture combining Amazon Textract for OCR and Amazon Bedrock foundation models for intelligent classification and extraction. The solution reduced customer onboarding time from 4-6 weeks to 2-3 days, decreased engineering hours per deployment by over 90% (from ~80 hours to <5 hours), and created a reusable, multi-tenant framework that maintains strict healthcare compliance standards (HITRUST, HIPAA, SOC 2) while enabling effective human-in-the-loop workflows through confidence scoring mechanisms."
notion:
  pageId: "320f8dff-2538-8037-a145-cccfc9d00f29"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-11T13:58:00.000Z"
  lastEditedTime: "2026-03-11T14:10:00.000Z"
  publishedAt: "2026-03-11T14:14:56Z"
---

## Overview

Ricoh USA operates a healthcare practice serving major health insurance payers, managed care organizations, and healthcare providers across over 200 countries, processing hundreds of thousands of critical healthcare documents monthly. These documents include insurance claims, grievances, appeals, and clinical records. The company faced a classic LLMOps challenge: their initial approach to using generative AI for document processing relied heavily on custom engineering for each customer implementation, creating bottlenecks that limited expansion as demand grew. With an anticipated sevenfold increase in volume, Ricoh needed to transform their document processing from bespoke custom builds into a scalable, repeatable platform service.

The case study is particularly noteworthy because it demonstrates how a company successfully transitioned from using LLMs in a custom, high-touch manner to implementing a standardized, production-grade framework that could serve multiple customers efficiently while maintaining strict compliance requirements. This represents a maturation journey common to many enterprises adopting LLM-based solutions at scale.

## The Business Problem and Requirements

Ricoh's healthcare documents presented significant complexity. Documents ranged from 15-50 pages and often arrived as multi-part packets containing various document types such as fax covers, clinical notes, and appeal forms, each with different layouts and naming conventions. Different healthcare providers used varying document structures, field naming conventions, and placement of critical information, making template-based extraction approaches ineffective.

The functional requirements included capturing data attributes from scans of unstructured or semi-structured documents with confidence levels that could reliably identify when human review was needed. Every attribute below a predefined confidence threshold required human review to verify accuracy and compliance. Human reviewers would verify extracted data, correct errors, and validate that critical healthcare information such as member IDs, diagnosis codes, and claim amounts met the quality standards required for regulatory compliance and claims processing. This human-in-the-loop approach aimed to achieve two key business outcomes: maintaining high accuracy levels (typically 98-99%) required by healthcare payers while reducing manual review costs by 60-70% compared to fully manual processing.

The non-functional requirements addressed critical operational needs including handling traffic spikes to process up to 1,000 documents in minutes while avoiding wasted computational resources during low-traffic periods, meeting strict SLAs for delivery deadlines and data accuracy, enabling configurable confidence thresholds that balance accuracy requirements with manual review costs, and enabling quick customer onboarding through configuration changes rather than code changes.

Importantly, the solution needed to maintain strict compliance with HITRUST, HIPAA, and SOC 2 standards. These compliance frameworks typically restrict data sharing that limits model training capabilities and mandate rigorous security controls that can impede the agility needed for iterative AI development and deployment. Ricoh made it a priority to overcome this tension between compliance and innovation.

## The LLMOps Challenge: From Custom Engineering to Scalable Platform

Prior to implementing the AWS GenAI IDP Accelerator, Ricoh had been combining traditional OCR with multimodal AI models available through Amazon Bedrock. However, their approach had significant limitations. Each new healthcare customer implementation required unique development and tuning by specialized engineers, with custom prompt engineering, model fine-tuning, and integration testing that couldn't be reused across customers. While this provided an exceptional, bespoke experience for Ricoh customers, it created bottlenecks. The team discovered that complex workflows demanded 40-60 hours of developer time per customer to set up, including work to incorporate newly released features of underlying models.

The team quickly learned that simply making API calls to Amazon Bedrock—sending a scanned document along with a prompt—would not suffice for complex workflows. When documents are composed of multiple parts or sections, extraction rules often depend upon first successfully classifying the section type. Additionally, LLMs have context window limits and experience declining performance in following instructions as the context fills, requiring alternative approaches for larger documents.

The team required flexibility to integrate with their existing high-capacity document processing workflows, including document routing systems, case management services, and downstream business applications, while maintaining control over processing steps and model selection. This included unique requirements such as splitting documents based on healthcare provider or patient information.

To improve accuracy, the Ricoh team utilized sophisticated means of dynamically inserting context into prompts—a technique where relevant document metadata, previously extracted fields, and document structure information are programmatically added to the AI model's instructions based on the specific document being processed. This context-aware prompting improved extraction accuracy by 15-20% compared to static prompts, helping the model understand document relationships and field dependencies. However, recreating this success for new customers remained time-intensive.

## Solution Architecture: Multi-Tenant Serverless IDP

Ricoh partnered with AWS to implement the GenAI IDP Accelerator, a reference framework designed to help deploy production-grade document processing solutions. The team selected Processing Pattern 2, which combines Amazon Textract for OCR with Amazon Bedrock foundation models for intelligent classification and extraction. This pattern was specifically designed for complex, multi-part documents that require both text extraction and AI-powered understanding.

The architecture centers on a serverless approach where Lambda functions are automatically invoked upon upload of scanned documents to Amazon S3. The Lambda functions handle calls to AI services—Amazon Textract and Amazon Bedrock—and output the captured attributes along with their confidence scores to a DynamoDB database. Documents enter via S3, triggering event-driven workflows. AWS Lambda functions invoke Amazon Bedrock models to determine document types such as claims, appeals, faxes, grievances, prior authorization requests, and clinical documentation. Amazon Textract parses text and layout, and the results are combined with Amazon Bedrock models for structured data extraction.

A critical architectural component is the use of Amazon SQS queues to control the rate at which requests are made to Amazon Textract and Amazon Bedrock API endpoints. This design enables the team to stay within service quota limits (such as transactions per second for Amazon Textract and requests per minute for Amazon Bedrock) by controlling message processing velocity through Lambda concurrency settings and Amazon SQS visibility timeouts. Amazon SQS seamlessly facilitates retries and sending of unprocessed messages to dead-letter queues.

The architecture implements a multi-tenant design where each customer has its own Amazon EventBridge rule and SQS queue. This provides multi-tenant isolation (preventing one customer's high volume from impacting others) and independent scaling (allowing per-customer concurrency limits and throughput controls). This design choice was critical for operational efficiency and customer isolation.

Different S3 buckets were created to manage documents from various sources, including fax, scan, and SFTP systems. DynamoDB tables stored document metadata and processing state, tracking document versions and helping prevent multiple attempts to update the same document simultaneously. CloudWatch provided comprehensive monitoring and logging of successful extraction rates and processing anomalies.

## Model Orchestration and Hybrid Extraction Approach

The solution's approach to model orchestration is noteworthy. Rather than relying solely on Amazon Bedrock, the team used Amazon Textract to augment Amazon Bedrock prompts with structured data extracted from the scanned document. This hybrid approach addresses practical limitations around context window sizes when processing documents as images. For example, a 50-page clinical record would exceed most LLM context windows if sent as images, but Amazon Textract converts it to structured text that can be selectively included in prompts.

The team took advantage of their previous Amazon Textract-based solution and used it as another source of truth for the extracted values, making it possible to compute reliable confidence scores by comparing results from both extraction methods. This dual-extraction approach was used during the initial deployment phase to validate accuracy, with the legacy system phased out after confidence in the new system was established. This represents a thoughtful migration strategy that maintained operational continuity while building confidence in the new approach.

For document processing, Amazon Textract extracted text from large healthcare documents, while Amazon Bedrock foundation models handled the intelligent classification and extraction tasks, with tailored instructions designed to identify document types and extract healthcare-specific information such as member IDs, provider details, and claim information. The team used LLMs to intelligently identify document types and split multi-document packets based on provider or patient information.

## Prompt Engineering and Context-Aware Processing

The case study highlights the importance of sophisticated prompt engineering in production LLM systems. The team utilized dynamic context injection where relevant document metadata, previously extracted fields, and document structure information are programmatically added to the AI model's instructions based on the specific document being processed. This context-aware prompting improved extraction accuracy by 15-20% compared to static prompts, helping the model understand document relationships and field dependencies.

The solution was designed to handle complex document classification, distinguishing between claims, disputes, emails, and fax cover sheets without breaking down packets into granular document types. Custom business rules—configurable logic specific to each customer's requirements, such as field validation rules, document routing criteria, and data transformation specifications—work alongside confidence scoring to determine which fields require human review.

## Confidence Scoring and Human-in-the-Loop Workflows

A critical LLMOps component of the solution is the confidence scoring mechanism. Confidence scores are calculated by comparing extraction results from multiple sources (Amazon Textract and Amazon Bedrock) and assigning a numerical value (0-100%) indicating the system's certainty in each extracted field. Fields scoring below customer-defined thresholds (typically 70-85%) are flagged for human validation.

Final outputs are stored in Amazon S3, with low-confidence cases routed for human validation through review queues where operators verify extracted data, correct errors, and provide feedback that improves future processing. This human-in-the-loop approach is essential for maintaining the high accuracy levels required in healthcare document processing.

The configurable confidence thresholds proved essential for meeting customer requirements, helping teams keep wrongly captured attributes below agreed SLAs while minimizing the cost of manual review. This represents a practical approach to balancing automation benefits with accuracy requirements, acknowledging that full automation may not always be appropriate or cost-effective for critical healthcare applications.

## Deployment and Configuration Management

A key enabler of rapid customer onboarding was the decision to standardize using configuration rather than code changes. Each customer deployment is instantiated using a configurable AWS SAM application deployed as an AWS CloudFormation stack, supporting rapid onboarding. This abstracts away infrastructure details—including Amazon VPC configuration, security group rules, IAM role policies, and service quotas—so team members can focus only on customer-dependent parameters such as Lambda reserved concurrency or database connection details.

This focused approach proved valuable when onboarding new customers. The configurable AWS SAM application deployed as a CloudFormation nested stack for each customer meant that team members could concentrate on business-specific parameters rather than infrastructure concerns. This infrastructure-as-code approach enabled consistent deployments and reduced maintenance efforts.

The modular design helped Ricoh integrate specific parameters and custom functionality such as customer-defined proprietary document classification, custom data extraction for industry-specific forms, or redaction rules for PII compliance into their existing high-capacity workflow without disrupting established processes. This approach maintained operational efficiency through automated deployment that reduced customer onboarding time from weeks to days while adding advanced AI capabilities.

## Compliance and Security Architecture

The solution was architected to align with stringent healthcare compliance requirements. For HIPAA compliance, Protected Health Information (PHI) is encrypted at rest using AWS KMS and in transit using TLS 1.2+. Access controls follow the principle of least privilege, with IAM policies restricting data access to authorized personnel only.

For HITRUST certification requirements, the architecture implements comprehensive audit logging through CloudWatch and AWS CloudTrail, capturing data access and processing activities. SOC 2 Type II compliance alignment is supported through the use of AWS services that maintain their own SOC 2 certifications, combined with Ricoh's documented operational controls for change management, event response, and continuous monitoring.

The architecture incorporates AWS Well-Architected Framework principles across multiple pillars. For security, data is encrypted at rest using AWS KMS with customer-managed keys and in transit using TLS 1.2+, with IAM roles enforcing least-privilege access separated by function. CloudTrail logs API calls for audit trails, and CloudWatch Logs captures application-level events for security monitoring.

## Scalability and Performance Characteristics

The serverless design was chosen to remove infrastructure management overhead and align costs directly with usage. The pay-per-use pricing model removes idle infrastructure costs—Ricoh only pays for actual document processing, with no charges during periods of inactivity. This cost predictability was crucial for supporting multiple customers with varying document volumes, as each customer's costs scale proportionally with their usage rather than requiring fixed infrastructure investments.

For reliability, the serverless design removes single points of failure, with automatic retries and dead-letter queues handling transient errors. For performance efficiency, Lambda concurrency limits and Amazon SQS queue throttling help prevent API quota exhaustion while maintaining high throughput. The architecture handled spikes in traffic to seamlessly process up to 1,000 documents in a few minutes while not wasting computational resources during periods of low or no traffic.

The implementation of rate limiting with SQS queues proved essential for staying within quota limits while seamlessly facilitating retries and DLQ handling. This architectural decision helped prevent throttling issues and improved overall system reliability, representing a practical approach to managing API quota constraints in production LLM systems.

## Operational Excellence and Monitoring

For operational excellence, infrastructure as code using AWS SAM and CloudFormation enabled consistent deployments, and CloudWatch dashboards and alarms provided real-time visibility into processing metrics and error rates. The modular architecture of the GenAI IDP Accelerator proved valuable for integration with existing systems. Rather than replacing established workflows, the core IDP-Common engine helped Ricoh enhance their current infrastructure with AI capabilities including document classification, intelligent field extraction, confidence scoring, and natural language understanding.

The IDP Common Package is a Python library that provides shared functionality for the Accelerated Intelligent Document Processing solution on AWS. This solution helps businesses automatically extract and process information from documents using AI services, removing manual data entry and improving accuracy. The core IDP-Common engine from the AWS GenAI IDP Accelerator served as the integration layer, helping Ricoh maintain its established workflows.

## Results and Business Outcomes

The operational improvements were substantial. Customer onboarding time decreased from 4-6 weeks to 2-3 days, representing a greater than 90% reduction. Monthly throughput capacity increased from approximately 10,000 documents to over 70,000 documents, a sevenfold increase. Engineering hours per deployment decreased from approximately 80 hours to less than 5 hours, representing a greater than 90% reduction. The system now handles traffic spikes by processing up to 1,000 documents in minutes.

Ricoh has been able to lower prices for an important healthcare customer by measuring and achieving significant reductions in human labor required to index documents in production. Human indexers now concentrate their time on difficult documents and extractions, with AI serving as their partner in the process rather than performing routine data entry. The Intelligent Business Platform achieved significant operational improvements and potential annual savings exceeding 1,900 person-hours through automation, dramatically reducing the manual effort required for document processing.

The automated classification system successfully distinguished between insurance policy holders' grievances and appeals claims, a critical capability for healthcare compliance and workflow management. These document types have different regulatory timelines (grievances typically require 30-day resolution, appeals require 60 days) and must be routed to different processing teams. Misclassification can result in missed deadlines, regulatory penalties, and member dissatisfaction.

The solution demonstrated extraction accuracy levels that help minimize financial penalties from processing errors, a crucial outcome in the heavily regulated healthcare industry. The confidence scoring capabilities enabled effective human-in-the-loop review processes, helping verify that documents requiring expert validation were properly flagged while allowing high-confidence extractions to proceed automatically.

## Critical Assessment and Balanced Perspective

While the results are impressive, several considerations warrant attention. The case study is published on an AWS blog and co-authored by Ricoh and AWS personnel, which suggests some promotional motivation. The claims about cost savings, accuracy improvements, and time reductions should be understood in that context, though the specific metrics provided (90% reduction in engineering hours, 7x capacity increase) are concrete and verifiable.

The case study acknowledges some important limitations and design tradeoffs. The team's use of a dual-extraction approach during validation (comparing Amazon Textract and Amazon Bedrock results) suggests initial uncertainty about model performance that required validation against legacy systems. The phasing out of the legacy system "after confidence in the new system was established" indicates a cautious, staged migration approach rather than an immediate replacement.

The reliance on configurable confidence thresholds (typically 70-85%) and human-in-the-loop review for low-confidence extractions acknowledges that full automation is neither achievable nor appropriate for all healthcare document processing tasks. This represents a pragmatic approach that balances automation benefits with accuracy requirements, though it means the solution still requires significant human oversight for a portion of documents.

The case study mentions that the solution "is projected to grow sevenfold to over 70,000 documents per month," using future tense, which suggests this capacity increase is planned rather than fully realized. The actual production volume remains at approximately 10,000 documents monthly, with the infrastructure in place to scale as client needs grow.

The decision to use Processing Pattern 2 (combining Amazon Textract with Amazon Bedrock) rather than relying solely on Amazon Bedrock was driven by practical limitations around context window sizes and the need for structured text extraction. This represents a thoughtful engineering decision that acknowledges current limitations of LLM context windows for processing very large documents as images.

## Key LLMOps Lessons

The case study offers several valuable lessons for production LLM deployments. The importance of choosing appropriate processing patterns based on specific document requirements and workflow needs is highlighted. The value of a hybrid approach combining traditional OCR with foundation models to address practical limitations while maintaining accuracy is demonstrated. The critical role of confidence scoring from the beginning to enable effective human-in-the-loop workflows is emphasized. The architectural importance of rate limiting with message queues to manage API quotas and prevent throttling in production systems is shown.

The business value of standardizing using configuration rather than code changes to enable rapid customer onboarding and reduce maintenance overhead is illustrated. The benefits of modular architecture for integration with existing systems rather than wholesale replacement is demonstrated. The importance of planning for scalability from the outset, with serverless architecture enabling automatic scaling and pay-per-use economics is highlighted.

Overall, this case study represents a mature approach to deploying LLMs in production for document processing, demonstrating how to transition from custom, high-touch implementations to scalable, standardized platforms while maintaining compliance requirements and operational control. The focus on reusable frameworks, configuration-driven deployment, and hybrid extraction approaches offers practical guidance for organizations facing similar scaling challenges with LLM-based document processing.
