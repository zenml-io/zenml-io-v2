---
title: "Large-Scale Document Redaction Using ML-Powered Text Extraction and Detection"
slug: "large-scale-document-redaction-using-ml-powered-text-extraction-and-detection"
draft: false
llmopsTags:
  - "document-processing"
  - "regulatory-compliance"
  - "error-handling"
  - "latency-optimization"
  - "scaling"
  - "serverless"
  - "orchestration"
  - "monitoring"
  - "databases"
  - "security"
  - "compliance"
  - "amazon-aws"
industryTags: "finance"
company: "Huntingdon Bank"
summary: "Huntingdon Bank faced the challenge of redacting sensitive customer data from over 400 million documents accumulated since 2015 in their on-premises document management system. Initial estimates suggested this compliance initiative would take years to complete. By implementing a scalable cloud-based solution using Amazon Textract for text extraction and sensitive data detection, AWS Step Functions for orchestration, and AWS Lambda for processing, the bank reduced the timeline from years to just a few months. The solution processed approximately 10 million documents per day with redaction accuracy exceeding 95%, completing the entire project at approximately 5% of the original estimated cost while meeting strict PCI DSS compliance and data security requirements."
link: "https://aws.amazon.com/blogs/machine-learning/huntington-bank-redacting-sensitive-data-from-400m-documents-with-aws/"
year: 2026
seo:
  title: "Huntingdon Bank: Large-Scale Document Redaction Using ML-Powered Text Extraction and Detection - ZenML LLMOps Database"
  description: "Huntingdon Bank faced the challenge of redacting sensitive customer data from over 400 million documents accumulated since 2015 in their on-premises document management system. Initial estimates suggested this compliance initiative would take years to complete. By implementing a scalable cloud-based solution using Amazon Textract for text extraction and sensitive data detection, AWS Step Functions for orchestration, and AWS Lambda for processing, the bank reduced the timeline from years to just a few months. The solution processed approximately 10 million documents per day with redaction accuracy exceeding 95%, completing the entire project at approximately 5% of the original estimated cost while meeting strict PCI DSS compliance and data security requirements."
  canonical: "https://www.zenml.io/llmops-database/large-scale-document-redaction-using-ml-powered-text-extraction-and-detection"
  ogTitle: "Huntingdon Bank: Large-Scale Document Redaction Using ML-Powered Text Extraction and Detection - ZenML LLMOps Database"
  ogDescription: "Huntingdon Bank faced the challenge of redacting sensitive customer data from over 400 million documents accumulated since 2015 in their on-premises document management system. Initial estimates suggested this compliance initiative would take years to complete. By implementing a scalable cloud-based solution using Amazon Textract for text extraction and sensitive data detection, AWS Step Functions for orchestration, and AWS Lambda for processing, the bank reduced the timeline from years to just a few months. The solution processed approximately 10 million documents per day with redaction accuracy exceeding 95%, completing the entire project at approximately 5% of the original estimated cost while meeting strict PCI DSS compliance and data security requirements."
notion:
  pageId: "397f8dff-2538-80e5-b56a-da17723b4f9f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:52:00.000Z"
  lastEditedTime: "2026-07-08T19:52:00.000Z"
  publishedAt: "2026-07-08T20:14:12Z"
---

## Overview

Huntingdon Bank, a top 10 financial institution in the United States, undertook a massive compliance initiative in 2025 to systematically identify and redact sensitive customer data from over 400 million documents accumulated in their on-premises document management system since 2015. This case study describes a large-scale document processing pipeline that leverages machine learning services for text extraction and sensitive data detection, though it's worth noting that this appears to be primarily an ML-powered text extraction and pattern matching solution rather than a generative AI or large language model deployment in the traditional LLMOps sense.

The project demonstrates production-scale deployment of ML services for document understanding, though the blog post published in June 2026 represents AWS marketing content and should be evaluated with appropriate skepticism regarding claimed performance metrics and cost savings. The solution architecture does showcase several production ML operations principles including orchestration, scaling, monitoring, and error handling that are relevant to broader LLMOps practices.

## Business Context and Requirements

The bank's document repository contained hundreds of millions of files in various formats accumulated over nearly a decade. As part of a proactive compliance initiative, the institution needed to process all these documents to identify and redact sensitive customer information including Social Security numbers, account numbers, and personal addresses. Original estimates indicated this effort would take years using conventional approaches, which would have exposed the organization to extended compliance risk windows.

The project team established five core requirements that shaped the technical solution design. Data encryption was mandatory both at rest and in transit, reflecting standard financial services security practices. All storage and processing locations needed to meet strict access controls, with all services required to be in-scope for PCI DSS compliance—a critical regulatory framework for organizations handling payment card data. The solution also needed to replicate redacted outputs back to on-premises data stores, maintaining hybrid architecture compatibility. Finally, redaction accuracy needed to meet or exceed 95% to satisfy compliance requirements, establishing a clear quality threshold for the ML detection capabilities.

## Architecture and Data Movement

The solution architecture addresses several production concerns including secure data transfer, scalable processing, and hybrid cloud integration. The initial challenge involved moving over 400 million documents from on-premises file storage to AWS infrastructure while maintaining encryption and security controls. The team deployed AWS DataSync as an agent within their data center to monitor an SMB file share, with AWS Direct Connect providing dedicated network connectivity. Amazon S3 served as the cloud-based document repository with AWS Key Management Service handling encryption key management.

This bidirectional data movement capability proved essential since AWS DataSync supports both ingestion to the cloud and synchronization back to on-premises storage. The hybrid architecture reflects common enterprise realities where legacy systems and compliance requirements mandate on-premises data retention even while leveraging cloud processing capabilities.

## ML-Powered Text Extraction and Detection

The core document understanding capability relies on Amazon Textract, a managed machine learning service that extracts text, tables, and form data from scanned documents. While Amazon Textract represents trained ML models for optical character recognition and document structure understanding, this is not a generative AI or large language model application. Instead, it performs discriminative tasks—identifying and locating specific data types within document images.

Amazon Textract processes documents and returns JSON-formatted output containing detected text fields, their locations (as coordinate bounding boxes), field types, and confidence scores. The blog post demonstrates this with a sample invoice where the service identifies various fields and provides metadata about their positions within the document. This structured output enables downstream processing systems to precisely locate sensitive information for redaction.

The service detects various predefined field types relevant to financial documents, and the solution extends this capability through custom classifications using regular expression patterns. This hybrid approach—combining pre-trained model capabilities with rule-based pattern matching—represents a pragmatic production strategy that balances ML model flexibility with deterministic pattern recognition for known data formats.

## Orchestration and Workflow Management

Huntingdon Bank used AWS Step Functions to orchestrate the multi-stage document processing pipeline, addressing one of the fundamental challenges in production ML systems: coordinating complex workflows with dependencies, error handling, and retry logic. The Step Functions state machine architecture provided declarative workflow definition while handling execution management, state persistence, and failure recovery.

The orchestration flow integrated Amazon Textract detection jobs with downstream processing stages. When Textract jobs completed successfully, the workflow wrote detected field metadata to S3 storage for subsequent review and redaction processing. The state machine included wait states to verify process readiness before proceeding, pass states for successful completions, and error logging capabilities that captured failures for human review and potential reprocessing.

This architectural pattern demonstrates production ML operations principles including explicit workflow stages, state management between processing steps, and designed-in observability for failure modes. The separation of detection and redaction into distinct workflow stages enabled independent scaling and optimization of each phase while providing clear checkpoints for quality validation.

## Scaling to Production Throughput

The most operationally interesting aspect of this case study involves scaling document processing from sequential execution to processing millions of documents daily. This required addressing two interconnected challenges: maximizing concurrent Amazon Textract job execution within service quota limits, and controlling request rates to avoid throttling.

AWS services implement quotas—both soft limits that can be increased through support requests and hard limits representing infrastructure constraints. Amazon Textract specifically has a jobs-per-second quota that the team increased by submitting requests through the AWS Service Quotas console. However, simply having a higher quota doesn't automatically translate to achieved throughput; the application architecture must be designed to safely approach these limits without triggering throttling.

The team leveraged AWS Step Functions map state functionality operating in distributed mode to process document collections concurrently. They organized documents in Amazon S3 into JSON collection metadata and configured the map state to launch multiple parallel execution branches. This distributed processing pattern enabled horizontal scaling limited primarily by service quotas rather than single-threaded execution constraints.

To monitor and optimize throughput, the team implemented comprehensive observability using AWS Step Functions map run execution summaries combined with Amazon CloudWatch dashboards. They tracked metrics including response times, throttle counts, successful request rates, and error rates. This monitoring infrastructure enabled data-driven tuning of concurrency parameters—they could observe Amazon Textract successful request counts and throttled request counts, then adjust child workflow execution concurrency limits to maximize throughput while remaining safely under quota limits.

The blog post claims the solution processed approximately 10 million documents per day, which if accurate represents substantial production scale. However, readers should note this figure comes from marketing content without independent verification. The architectural patterns described—distributed processing with Step Functions map states, quota management, and CloudWatch monitoring—are sound production practices regardless of the specific throughput numbers achieved.

## Redaction Processing and Quality Controls

After detection, the pipeline performed actual document redaction using open-source Python libraries. The text mentions PyMuPDF and PIL (Python Imaging Library) as examples of tools capable of image and PDF manipulation. The redaction process took Amazon Textract's detected field coordinates and used drawing operations to obscure sensitive information in the original document images.

The solution incorporated quality validation steps before redaction execution. The workflow verified that detected fields matched expected patterns through additional validation logic, providing a secondary check beyond Amazon Textract's initial detection. This defense-in-depth approach to accuracy reflects appropriate caution for compliance-critical operations where incorrect redaction could expose sensitive data or over-redaction could destroy required information.

Amazon Textract provides confidence scores with its detections, and the architecture could trigger human validation workflows based on confidence thresholds. This human-in-the-loop capability represents a common production pattern for ML systems where predictions below certain confidence levels route to manual review rather than automated processing. The blog post mentions the 95% accuracy requirement was exceeded, though specific validation methodologies aren't described in detail.

After successful redaction, the workflow updated metadata for each processed file and placed redacted documents in designated S3 locations. AWS DataSync monitored these locations and synchronized redacted files back to on-premises storage, completing the round-trip data flow and maintaining consistency with legacy systems.

## Production Operations Considerations

Several aspects of this implementation demonstrate mature production operations thinking, though some details remain underspecified. The monitoring approach using CloudWatch dashboards for real-time metrics and Step Functions execution summaries for workflow-level visibility provides operators with observability at multiple granularities. The error handling design—capturing failures to logs for human review and enabling reprocessing—acknowledges that even well-designed systems encounter edge cases requiring manual intervention.

The architecture's use of managed services (Amazon Textract, AWS Step Functions, AWS Lambda) reduces operational overhead compared to self-managed ML model serving infrastructure. However, this introduces dependencies on AWS service availability and performance characteristics. The throttling management approach described suggests the team encountered rate limiting during initial scaling, requiring iterative tuning of concurrency parameters—a realistic detail that marketing materials often omit.

The solution's distributed processing architecture using Step Functions map states provides some fault isolation since individual document processing failures don't necessarily cascade to other concurrent executions. The state machine's explicit error handling and retry logic represent production-grade reliability patterns, though specific retry strategies and backoff policies aren't detailed in the blog post.

## Critical Assessment and LLMOps Relevance

This case study presents an interesting boundary case for LLMOps classification. It demonstrates production-scale deployment of machine learning services for document understanding, but Amazon Textract is fundamentally an OCR and document structure extraction service rather than a generative AI or large language model. The solution doesn't appear to involve prompt engineering, embedding models, retrieval-augmented generation, or other techniques central to contemporary LLMOps practices.

That said, many operational patterns described here translate directly to LLM deployments: orchestrating multi-stage ML workflows, scaling to meet throughput requirements while managing service quotas, implementing monitoring and observability, handling errors and edge cases, and validating ML system outputs against quality thresholds. The distributed processing architecture and throttling management strategies would apply equally well to high-volume LLM inference scenarios.

The blog post's claimed results—timeline reduction from years to months, cost reduction to 5% of original estimates, and 10 million documents per day throughput—should be interpreted cautiously as these come from AWS-published marketing content without independent verification. Such dramatic improvements often reflect comparisons to strawman alternatives rather than optimized conventional approaches. Financial institutions have processed large document volumes for decades; the actual innovation here likely involves applying managed cloud ML services to a specific compliance use case rather than inventing entirely new capabilities.

The 95% accuracy threshold mentioned raises questions about validation methodology. How was this measured? Against what ground truth? What happens to the 5% of cases that may be incorrectly redacted? The consequences of false negatives (failing to redact sensitive data) versus false positives (incorrectly redacting non-sensitive data) differ substantially for compliance purposes, but the blog post doesn't address this precision-recall tradeoff.

The solution's reliance on regular expressions alongside ML detection suggests the pre-trained Amazon Textract models alone didn't provide sufficient accuracy or coverage for all sensitive data types. This hybrid approach—combining ML models with deterministic rules—represents pragmatic engineering but also indicates limitations in the ML component's capabilities.

## Future Applications and Scalability

The conclusion mentions Huntingdon Bank plans to continue using this framework for high-volume redaction needs including mergers and acquisitions. This suggests the team views the architecture as a reusable platform rather than a one-time solution, which aligns with good production ML engineering practices of building flexible systems that can adapt to new use cases.

The architecture's separation of concerns—data movement, detection, redaction, and synchronization as distinct stages—should theoretically support modification of individual components. For example, the detection stage could potentially be enhanced with more sophisticated language models for context-aware sensitive data identification, though the current solution doesn't employ this approach.

From a broader LLMOps perspective, the case study illustrates how document understanding workloads can achieve production scale using managed services, workflow orchestration, and careful attention to throughput optimization. While not involving LLMs specifically, the operational patterns and architectural decisions provide useful reference points for teams building large-scale document processing systems that might incorporate generative AI capabilities for tasks like summarization, classification, or information extraction in addition to the redaction use case described here.
