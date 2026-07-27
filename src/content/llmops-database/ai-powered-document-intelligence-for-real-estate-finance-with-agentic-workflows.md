---
title: "AI-Powered Document Intelligence for Real Estate Finance with Agentic Workflows"
slug: "ai-powered-document-intelligence-for-real-estate-finance-with-agentic-workflows"
draft: false
llmopsTags:
  - "document-processing"
  - "classification"
  - "prompt-engineering"
  - "few-shot"
  - "agent-based"
  - "human-in-the-loop"
  - "chunking"
  - "evals"
  - "langchain"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "serverless"
  - "orchestration"
  - "cicd"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "scaling"
  - "documentation"
  - "guardrails"
  - "anthropic"
  - "amazon-aws"
industryTags: "finance"
company: "Built Technologies"
summary: "Built Technologies, a real estate finance software provider processing over $500B in real estate projects, developed an AI-powered document intelligence solution to automate the processing of complex, inconsistent documents across real estate finance workflows. Partnering with AWS GenAIIC and AND Digital, Built deployed a scalable document processing engine on Amazon Bedrock and the AWS Intelligent Document Processing Accelerator. The solution uses large language models for classification, splitting, extraction, and reasoning over 250+ document types, supporting agentic AI products across construction lending, insurance, underwriting, and compliance. The system reduced processing times from days to minutes, achieved over 95% confidence in production workflows, and now processes up to 20 million documents per month while enabling human-in-the-loop review for low-confidence results."
link: "https://aws.amazon.com/blogs/machine-learning/built-technologies-builds-an-ai-powered-document-intelligence-solution-on-aws-to-power-agents-across-real-estate-finance/"
year: 2026
seo:
  title: "Built Technologies: AI-Powered Document Intelligence for Real Estate Finance with Agentic Workflows - ZenML LLMOps Database"
  description: "Built Technologies, a real estate finance software provider processing over $500B in real estate projects, developed an AI-powered document intelligence solution to automate the processing of complex, inconsistent documents across real estate finance workflows. Partnering with AWS GenAIIC and AND Digital, Built deployed a scalable document processing engine on Amazon Bedrock and the AWS Intelligent Document Processing Accelerator. The solution uses large language models for classification, splitting, extraction, and reasoning over 250+ document types, supporting agentic AI products across construction lending, insurance, underwriting, and compliance. The system reduced processing times from days to minutes, achieved over 95% confidence in production workflows, and now processes up to 20 million documents per month while enabling human-in-the-loop review for low-confidence results."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-document-intelligence-for-real-estate-finance-with-agentic-workflows"
  ogTitle: "Built Technologies: AI-Powered Document Intelligence for Real Estate Finance with Agentic Workflows - ZenML LLMOps Database"
  ogDescription: "Built Technologies, a real estate finance software provider processing over $500B in real estate projects, developed an AI-powered document intelligence solution to automate the processing of complex, inconsistent documents across real estate finance workflows. Partnering with AWS GenAIIC and AND Digital, Built deployed a scalable document processing engine on Amazon Bedrock and the AWS Intelligent Document Processing Accelerator. The solution uses large language models for classification, splitting, extraction, and reasoning over 250+ document types, supporting agentic AI products across construction lending, insurance, underwriting, and compliance. The system reduced processing times from days to minutes, achieved over 95% confidence in production workflows, and now processes up to 20 million documents per month while enabling human-in-the-loop review for low-confidence results."
notion:
  pageId: "3aaf8dff-2538-80c9-9f51-d3a639a0ecde"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:06:00.000Z"
  lastEditedTime: "2026-07-27T12:06:00.000Z"
  publishedAt: "2026-07-27T12:13:00Z"
---

## Overview

Built Technologies operates in the real estate finance sector, managing over $500 billion in real estate projects and processing hundreds of thousands of documents. The company faced the challenge of automating document processing for complex, inconsistent, and domain-specific documents that traditional OCR and machine learning approaches struggled to handle. The case study describes how Built Technologies partnered with AWS Generative AI Innovation Center (GenAIIC), AWS Partner AND Digital, and AWS account teams to build a production-scale AI-powered document intelligence solution that serves as the foundation for multiple agentic AI products across the real estate finance lifecycle.

The solution represents a shift from simple OCR-based extraction to intelligent document understanding capable of reasoning, context interpretation, and domain-specific judgment. While the text is promotional in nature (published on AWS blogs), it provides substantial technical detail about production LLMOps patterns, infrastructure choices, and operational considerations that warrant careful examination.

## Business Context and Problem Statement

Real estate finance workflows are document-intensive, with single transactions involving hundreds or thousands of pages across diverse document types including draw packages, loan agreements, invoices, insurance certificates, inspection reports, appraisals, offering memorandums, and financial models. Built Technologies previously operated 26 processors using traditional OCR and machine learning for extraction, splitting, and classification. While these worked for narrower use cases with explicit fields and predictable layouts, the company needed to expand beyond simple extraction to support more than 250 document types and power agentic workflows that could reason over documents rather than merely extract text.

The challenges Built faced were multifaceted. Documents often exceeded 500 pages individually and contained nested tables, embedded imagery, scanned pages, custom layouts, handwritten annotations, and non-standard terminology. Important information was frequently implied rather than explicitly labeled, distributed across multiple sections, or expressed in domain-specific legal and financial language. The company required over 95% confidence in classification and extraction for production use in financial and compliance-sensitive processes. Perhaps most importantly, Built needed a horizontal capability that could support not just one workflow but many agentic AI products launching throughout their roadmap.

## Architectural Foundation and LLMOps Infrastructure

The solution uses the AWS Intelligent Document Processing (IDP) Accelerator as its foundation, with Amazon Bedrock providing generative AI capabilities for classification, splitting, schema generation, extraction, assessment, and document reasoning. The architecture is built around a multi-stage pipeline orchestrated by AWS Step Functions, with each document moving through discrete stages: OCR, classification and splitting, extraction, assessment, and optional rule validation.

The ingestion flow demonstrates careful attention to production concerns. When a document is uploaded to an Amazon S3 input bucket, it emits an Amazon EventBridge event. A Queue Sender Lambda function records the event in a DynamoDB tracking table and places a message on an Amazon SQS queue. A Queue Processor Lambda function manages concurrency through a DynamoDB atomic counter and, when capacity is available, starts a Step Functions execution. This design pattern addresses rate limiting and throttling concerns when processing both single documents and large batch runs.

Each processing stage is implemented as a discrete Lambda function within the Step Functions state machine. The extraction stage runs inside a Step Functions Map state, which enables parallel processing of classified document sections. When a 150-page draw package is split into constituent documents (invoices, lien waivers, insurance certificates, cover letters), each section receives its own concurrent extraction invocation. This parallelization is what enables the solution to reduce processing times from days to minutes—total processing time is bounded by the longest individual section rather than the sum of all sections.

Results are written to an S3 output bucket, and AWS AppSync delivers real-time status updates to the user interface through GraphQL subscriptions. The custom React-based UI, authenticated through Amazon Cognito, gives both technical users and business subject matter experts a central workspace to upload documents, manage processors, define schemas, review extraction results, compare versions, and inspect confidence scores.

## OCR and Structural Extraction

The OCR stage uses Amazon Textract to extract text, tables, forms, signatures, and structural hierarchy from documents. Textract provides the document structure that downstream generative AI workflows rely on for classification and extraction. For large documents, the system processes pages individually to enable parallelization, though this requires careful concurrency and throttle management at scale. The team validated the pipeline through production-scale testing and resolved Amazon Textract throttling limits when processing large documents at high concurrency.

Importantly, the solution can also use Amazon Bedrock as an alternative OCR backend for documents where a vision-capable model reads pages more reliably than traditional OCR, such as low-quality scans or dense handwritten annotations. The OCR backend is a configuration choice rather than a code change, allowing teams to select Textract or Bedrock per processor. The OCR stage normalizes its output into a consistent JSON structure recording the location of raw text, parsed text, and page images for every page in S3, which later stages consume.

## Intelligent Classification and Splitting Using LLMs

After OCR processing, the classification workflow uses Amazon Bedrock to determine document types and identify boundaries within combined PDFs. This is particularly important in real estate finance where a single package may contain many documents in unpredictable order. Rather than requiring a separate document splitter with rigid page limitations, the solution identifies constituent documents inside large packages and preserves their relationship to the broader transaction.

Classification is driven by configurable prompts that list available document types and examples. A critical LLMOps pattern employed here is prompt caching. The prompt uses a cache delimiter (marked as `<<CACHEPOINT>>`) that separates static instructions (class definitions and few-shot examples) from variable document text. Everything before the cache delimiter is identical for every document a processor handles, so Amazon Bedrock caches it and reuses it across requests. Only the document text after the marker changes from invocation to invocation. For a draw-package processor defining a dozen or more document classes with examples, this avoids reprocessing the same instructions on every page of every package, providing significant efficiency gains at scale.

The document splitting stage produces structured results mapping page ranges to document types. For example, a 150-page draw package might be split into sections: pages 1 as "CoverLetter", pages 2-6 as "Invoice", pages 7-8 as "LienWaiver", and pages 9-10 as "InsuranceCertificate". Each section group becomes an independent task in the Step Functions Map state, and extraction runs against the schema specific to that document type.

## Schema-Driven Extraction and Dynamic Schema Generation

A notable capability of the solution is dynamic schema generation. Users can upload examples of new document types, and Amazon Bedrock generates a proposed extraction schema including the fields, structures, and outputs that should be captured. Subject matter experts can then refine the schema, test it against examples, compare outputs across model versions, and create new processor versions. This represents a critical LLMOps pattern for enabling non-technical domain experts to participate in model improvement.

Each document type is defined by a JSON Schema, and the description written for each field becomes part of the extraction prompt. The case study emphasizes that much of the solution's accuracy comes from detailed field descriptions that include where values typically appear and what they're called, which guide the model far more effectively than field names alone. For instance, a lien waiver schema captures waiver type, contractor, project, applicable period, amount, and exceptions, with each field having rich descriptions like "The type of waiver: Conditional, Unconditional, Partial, or Final. Look for these terms in the heading at the top."

The `x-aws-idp-document-type` annotation links schemas to classification outputs. When classification labels specific pages as a particular document type, the extraction stage loads the corresponding schema and builds a prompt from field descriptions and OCR text for those pages. Where additional grounding helps, teams can attach few-shot examples to a class (a sample document paired with expected attributes) to demonstrate desired outputs for unusual layouts.

This schema-driven approach is what makes supporting over 250 document types practical. Rather than hand-authoring every schema, teams use the Accelerator's discovery capability to generate first drafts from sample documents: upload one or more examples, and Amazon Bedrock proposes a schema with field names, types, and descriptions for experts to refine. For bulk onboarding, the solution can cluster large collections of sample documents by similarity and propose a schema for each cluster.

## Model Selection Strategy and Flexibility

Because the schema, prompts, and model are all parameters in the configuration, Built can apply a flexible model strategy—a key LLMOps pattern for optimizing cost and performance. For straightforward documents like standard invoices or insurance certificates, teams may select smaller, faster models such as Amazon Nova Lite. For documents requiring deeper reasoning or more complex layout interpretation, such as loan agreements or offering memorandums, they may select larger models like Anthropic Claude available through Amazon Bedrock. The solution uses the right model for the right document and workflow instead of forcing every use case through a single extraction approach.

This flexibility is important from both a cost and performance perspective. Not all document processing tasks require the most capable (and expensive) models, and the ability to configure model selection per processor type allows for optimization across the entire document portfolio.

## Confidence Scoring, Assessment, and Human-in-the-Loop

Each extraction result includes field-level confidence scoring. Built requires over 95% confidence in key production workflows, and results below the required threshold are routed to human reviewers. Notably, confidence scores come from a dedicated assessment stage rather than from the extraction call itself. After extraction, a separate Amazon Bedrock invocation compares extracted values against the source document and OCR text and produces, for each field, a confidence score between 0 and 1, a short explanation, and the location of supporting evidence on the page.

This separation of extraction and assessment is an important LLMOps pattern. The assessment stage can provide more reliable confidence estimates by explicitly comparing extraction results against source material, and it can generate explanations and geometric bounding boxes that help reviewers understand where values were found and why confidence might be low. For instance, if a lien waiver has several dollar amounts and the model selected one near the waiver statement but a handwritten notation is partially illegible, the assessment stage might return a confidence score of 0.72 with an explanation noting the ambiguity.

Reviewers work in a split-pane interface with the original page image in the left pane and extracted fields in the right pane. Bounding-box overlays drawn from assessment geometry highlight where each value was found, and fields are color-coded so that values below the confidence threshold stand out. Reviewers can correct classifications, update extracted values, and mark sections complete. Role-based access controls keep this orderly at scale, with reviewers handling documents in their queues while administrators manage configurations and users.

Critically, reviewer corrections don't stop at the individual document. They feed back into the solution's evaluation baseline datasets, so the same reviewer effort that fixes one package also improves the schemas, prompts, and examples used for future documents. This human-in-the-loop feedback pattern is essential for continuous improvement in production LLM systems.

## Reasoning Over Documents and Rule Validation

The solution distinguishes between extraction (what a document contains) and reasoning (whether a document satisfies requirements). Many real estate finance workflows need to determine not just the coverage limit on an insurance certificate but whether that coverage meets loan agreement terms. The solution supports this through a rule-validation workflow that evaluates documents against business rules in two steps.

First, a fact-extraction step sends relevant document sections to Amazon Bedrock and gathers facts that bear on a given policy area, along with references to where each fact was found. Second, an orchestration step reasons over curated evidence and returns a determination (compliant, non-compliant, or insufficient evidence) with citations to supporting sections. Rules are expressed as plain questions grouped into policy classes, keeping them in language that subject matter experts can own. For example, loan covenant questions might include "Does the document specify a debt service coverage ratio requirement?" or "Are there restrictions on additional indebtedness?"

Separating fact-finding from judgment is presented as a key design decision for reliability on long, dense documents. The fact-extraction step concentrates the model's attention on locating relevant clauses across a hundred-page agreement, while the orchestration step can weigh evidence without being distracted by the rest of the document. This represents an agentic pattern where different invocations handle different reasoning tasks.

## Evaluation, Testing, and Version Management

The case study emphasizes the importance of collaborative schemas and evaluations for production LLM systems. Teams need shared definitions of what should be extracted, what correct answers look like, how accuracy is measured, and how changes are tested before deployment. This is particularly important in domain-specific contexts like real estate finance, where generic models may understand words but not the business meaning of documents.

The solution provides technical and non-technical teams a shared workspace for schema design, extraction testing, evaluation workflows, version management, and human feedback. Industry experts can shape the document understanding layer without requiring every change to become an engineering project. Engineering teams can operationalize those definitions through versioned schemas, evaluations, model orchestration, and deployment workflows.

Built's integration with evaluation workflows allows teams to test schema changes, compare model behavior, and maintain confidence thresholds before deploying changes into production. The ability to compare outputs across model versions is mentioned as a key capability in the UI, suggesting systematic A/B testing or evaluation frameworks are in place.

## Scale and Production Results

The solution was designed to handle production-scale workloads, validated through large batch processing runs. The architecture can process 20 million documents per month, 300,000 documents per week, and over 50,000 batch processing runs. The concurrency layer (DynamoDB atomic counter paired with SQS queue) keeps the rate of Step Functions executions within Amazon Bedrock and Amazon Textract service limits, allowing the same path to handle both single ad-hoc uploads and 50,000-document batch runs without changes.

Key outcomes reported include classification and extraction workflows reduced from 3-9 days to minutes per package, support for multi-hundred-page packages with nested tables and non-standard layouts, and the ability to support over 250 document types across real estate finance workflows. The solution achieves over 95% confidence thresholds in production workflows for financial and compliance-sensitive processes while maintaining human-in-the-loop trust for low-confidence or ambiguous outputs.

## Critical Assessment and LLMOps Considerations

While the case study provides substantial technical detail, it is promotional material published by AWS and should be evaluated accordingly. Several claims merit careful consideration. The "days to minutes" improvement is dramatic but lacks specificity about what the previous "days" entailed—was this purely processing time, or did it include manual review, queuing, and other organizational delays? The comparison may be somewhat apples-to-oranges if the previous workflow included human review that is now parallelized or automated.

The 95% confidence threshold is presented as an achievement, but the case study doesn't specify what happens to the remaining 5% or what proportion of documents fall below this threshold in practice. If 30% of documents require human review due to low confidence on critical fields, the automation value proposition changes significantly. The human-in-the-loop process is described as preserving expert oversight, which is appropriate, but the balance between automation gains and review burden is not quantified.

The flexible model selection strategy (Nova Lite for simple documents, Claude for complex ones) is architecturally sound, but the case study doesn't provide cost analysis or performance benchmarks comparing models. The claim that the solution can support 250+ document types is impressive, but it's unclear how many are actually in production versus theoretically supportable through the schema generation process.

The separation of extraction and assessment stages for confidence scoring is an interesting pattern, but it doubles the number of LLM calls required per document, which has cost and latency implications. The case study doesn't discuss whether this tradeoff was evaluated or how much the assessment stage adds to processing time and cost.

The prompt caching mechanism is a clear LLMOps win for efficiency, but the case study doesn't quantify the cost savings or latency improvements. Similarly, the parallel processing through Step Functions Map states is architecturally sound, but the actual speedup depends on document characteristics and may not always achieve the "days to minutes" headline.

The feedback loop from human corrections to evaluation baselines is described but not detailed. It's unclear whether this is fully automated, how often schemas and prompts are updated based on feedback, or how the system prevents overfitting to recent corrections at the expense of broader accuracy.

Despite these considerations, the case study describes a reasonably comprehensive LLMOps implementation addressing many production concerns: multi-stage pipelines, concurrency management, rate limiting, model selection flexibility, schema versioning, confidence scoring, human review workflows, evaluation frameworks, and feedback loops. The architectural patterns around prompt caching, parallel processing, and separation of concerns (extraction vs. assessment, fact-finding vs. reasoning) demonstrate thoughtful design for production LLM systems.

The horizontal reusability across multiple agentic products (draw review, loan agreement analysis, insurance validation, underwriting, asset management, compliance) is a strong architectural choice, avoiding the need to rebuild extraction pipelines for every product. This represents mature LLMOps thinking about shared capabilities and infrastructure.

The emphasis on collaborative workflows between technical and non-technical teams through schema design, discovery capabilities, and UI-driven testing reflects an understanding that production LLM systems require domain expertise to be embedded in the system design, not just applied during initial development. The ability for subject matter experts to generate, refine, and test schemas without engineering involvement is a valuable LLMOps pattern for organizational scalability.
