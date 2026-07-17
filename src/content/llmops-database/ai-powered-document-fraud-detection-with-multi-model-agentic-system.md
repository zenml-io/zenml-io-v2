---
title: "AI-Powered Document Fraud Detection with Multi-Model Agentic System"
slug: "ai-powered-document-fraud-detection-with-multi-model-agentic-system"
draft: false
llmopsTags:
  - "fraud-detection"
  - "document-processing"
  - "classification"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "embeddings"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "cost-optimization"
  - "model-optimization"
  - "monitoring"
  - "databases"
  - "scaling"
  - "serverless"
  - "orchestration"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "anthropic"
  - "meta"
  - "amazon-aws"
industryTags: "finance"
company: "Inscribe"
summary: "Inscribe, a document fraud detection company serving financial institutions, faced the challenge of detecting sophisticated AI-generated forgeries and tampered documents at scale, where manual review took 30 minutes per application and couldn't keep pace with evolving fraud tactics. They developed an agentic AI system using Amazon Bedrock that coordinates multiple foundation models—Claude Haiku for high-volume parsing, Llama models for transaction analysis, and Claude Sonnet for complex cross-document reasoning—alongside proprietary ML models on Amazon SageMaker for forensic analysis. The solution reduced review time from 30 minutes to under 90 seconds (20x improvement) while maintaining regulatory compliance, with customers reporting millions in fraud losses prevented, up to 99% reduction in manual review time, and the ability to detect coordinated fraud rings that manual processes missed."
link: "https://aws.amazon.com/blogs/machine-learning/how-inscribe-uses-amazon-bedrock-to-stop-document-fraud-in-seconds/"
year: 2026
seo:
  title: "Inscribe: AI-Powered Document Fraud Detection with Multi-Model Agentic System - ZenML LLMOps Database"
  description: "Inscribe, a document fraud detection company serving financial institutions, faced the challenge of detecting sophisticated AI-generated forgeries and tampered documents at scale, where manual review took 30 minutes per application and couldn't keep pace with evolving fraud tactics. They developed an agentic AI system using Amazon Bedrock that coordinates multiple foundation models—Claude Haiku for high-volume parsing, Llama models for transaction analysis, and Claude Sonnet for complex cross-document reasoning—alongside proprietary ML models on Amazon SageMaker for forensic analysis. The solution reduced review time from 30 minutes to under 90 seconds (20x improvement) while maintaining regulatory compliance, with customers reporting millions in fraud losses prevented, up to 99% reduction in manual review time, and the ability to detect coordinated fraud rings that manual processes missed."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-document-fraud-detection-with-multi-model-agentic-system"
  ogTitle: "Inscribe: AI-Powered Document Fraud Detection with Multi-Model Agentic System - ZenML LLMOps Database"
  ogDescription: "Inscribe, a document fraud detection company serving financial institutions, faced the challenge of detecting sophisticated AI-generated forgeries and tampered documents at scale, where manual review took 30 minutes per application and couldn't keep pace with evolving fraud tactics. They developed an agentic AI system using Amazon Bedrock that coordinates multiple foundation models—Claude Haiku for high-volume parsing, Llama models for transaction analysis, and Claude Sonnet for complex cross-document reasoning—alongside proprietary ML models on Amazon SageMaker for forensic analysis. The solution reduced review time from 30 minutes to under 90 seconds (20x improvement) while maintaining regulatory compliance, with customers reporting millions in fraud losses prevented, up to 99% reduction in manual review time, and the ability to detect coordinated fraud rings that manual processes missed."
notion:
  pageId: "397f8dff-2538-8046-a84e-f8de9b3c11f0"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:05:00.000Z"
  lastEditedTime: "2026-07-08T20:05:00.000Z"
  publishedAt: "2026-07-08T20:07:37Z"
---

## Overview

Inscribe is a document fraud detection company founded in 2017 that serves banks, lenders, and fintech companies. This case study details how they built a production agentic AI system using Amazon Bedrock to detect tampered, fabricated, and AI-generated financial documents. The system represents a sophisticated LLMOps implementation that coordinates multiple foundation models, proprietary ML models, and external APIs to analyze loan application documents at scale. The business context is critical: fraud now appears in 1 of every 16 documents, and AI-generated forgeries grew 5x from April to December 2025. Traditional manual review takes 30 minutes per application, creates consistency issues across different analysts, and struggles to detect evolving fraud tactics like deepfakes and synthetic identity fraud.

## The Production Problem Space

The case study articulates three core challenges that shape the LLMOps requirements: scale (application volume growth requires proportional analyst hiring without improving accuracy), adaptability (static rules miss sophisticated schemes), and consistency (different analysts reach different conclusions, creating compliance risks). Financial stakes are significant—a single missed fraud case can mean millions in losses plus regulatory exposure. The solution must operate within strict financial services regulations, requiring audit trails, explainability, and data security guarantees. This regulatory context fundamentally influences the architectural decisions and model selection process.

## Multi-Model Architecture and Strategic Model Selection

The core architectural insight driving Inscribe's LLMOps approach is that no single foundation model is optimal for every task in a complex workflow. Rather than applying one model to everything, they coordinate different models for different subtasks based on performance, latency, and cost characteristics. This strategic model selection represents a mature LLMOps practice that moves beyond "use the best model for everything" to "use the right model for each specific job."

The system uses three primary foundation model families from Amazon Bedrock. Claude Haiku 4.5 (Anthropic) handles high-volume operations including document parsing, field extraction, initial classification, and pre-screening checks. The upgrade to Haiku 4.5 delivered improved accuracy while reducing inference costs by approximately 40% compared to using Claude Sonnet for these routine tasks. This demonstrates cost-conscious model selection where faster, cheaper models handle well-defined extraction tasks.

Meta Llama 3.1 70B and Llama 4 handle transaction enrichment and entity extraction. The engineering manager's quote is revealing: "We didn't see much of a difference in terms of performance. The quality of Llama for those tasks was on par with what we wanted, so choosing Llama allowed us to reduce costs without sacrificing quality." This pragmatic approach—using less expensive models when performance is equivalent—reflects mature production thinking about cost management in LLM deployments.

Claude Sonnet 4 and 4.5 serve as the coordination layer for the most sophisticated tasks: cross-document fraud analysis, multi-step reasoning workflows, web search integration for employer verification, and natural language generation of audit-ready fraud reports. Sonnet's extended context window enables it to maintain awareness across entire document sets, identifying fraud patterns that would be invisible when documents are analyzed in isolation. This represents a thoughtful allocation of expensive, capable models to genuinely complex reasoning tasks.

## Agentic AI System Design

The solution is explicitly described as an "agentic AI system," which the case study defines as working from start to finish: taking a goal, breaking it into steps, using multiple tools, and working through to completion. Where a basic AI tool might answer a single question, an agentic system coordinates specialized models, calls external APIs when needed, and synthesizes everything into a final decision. For document fraud detection specifically, this means the system takes a submitted document, routes it through appropriate models, runs parallel forensic checks, searches the web to verify employer details, cross-references data across the full document set, and generates an audit-ready fraud report without requiring human intervention.

This agentic architecture represents a significant LLMOps pattern where foundation models serve not just as individual inference endpoints but as coordinated components in a larger decision-making system. The orchestration logic—deciding which model to invoke when, how to route information between models, when to call external APIs, and how to synthesize results—is a critical piece of production infrastructure that the case study doesn't fully detail but clearly exists as a substantial engineering effort.

## Production Infrastructure on AWS

The full architecture reveals a comprehensive LLMOps stack built on AWS services. Documents enter through a web interface or API, landing in Amazon S3. The web application (served through CloudFront and Application Load Balancer) creates a processing job and queues it in Amazon SQS. This queue-based architecture provides the asynchronous processing pattern that handles traffic spikes gracefully—more Celery workers scale up during business hours, then scale down overnight to minimize costs.

Celery worker processes running on Amazon EC2 pull jobs from the queue. Amazon Textract provides baseline OCR and text extraction, though Inscribe notes they've increasingly shifted parsing workloads directly to foundation models on Amazon Bedrock for more accurate extraction from complex financial documents. This migration from specialized OCR services to foundation models for document understanding represents an emerging LLMOps pattern enabled by increasingly capable multimodal models.

After text extraction, documents flow through the multi-model fraud detection pipeline on Amazon Bedrock in a coordinated sequence: Claude Haiku performs fast initial parsing and classification, Llama models process transaction data and extract entities, and Claude Sonnet conducts cross-document analysis and generates the final fraud assessment. Each model handles what it does best, completing the full review in under 90 seconds.

## Proprietary Models and Hybrid Architecture

In parallel with foundation model analysis, Inscribe runs proprietary machine learning models hosted on Amazon SageMaker. These models, built in-house and trained on millions of applications Inscribe processes annually, detect signals that general-purpose foundation models miss: pixel-level forensic analysis to identify digitally altered images, network pattern detection matching documents against a library of known fraud templates, and visual anomaly detection for manipulated signatures or layouts.

This hybrid architecture—combining general-purpose foundation models with specialized proprietary models—represents a pragmatic LLMOps pattern. Foundation models provide reasoning, language understanding, and cross-document analysis capabilities, while custom models trained on domain-specific data and signals provide detection capabilities that general models cannot match. SageMaker provides managed infrastructure for deploying these specialized models at scale, with built-in capabilities for model deployment, automatic scaling, and performance monitoring.

## Data Management and Observability

Inscribe stores both intermediate reasoning traces and final fraud reports in Amazon RDS, providing a reliable audit trail for compliance teams while supporting ongoing model improvements. The storage of reasoning traces is particularly important for an agentic system—being able to reconstruct why the system made a particular decision requires capturing the full chain of model invocations, intermediate results, and decision points. This represents mature thinking about explainability and auditability in production AI systems.

Amazon ElastiCache for Valkey caches short-lived data including webhook tokens, enforces rate limiting, and manages Celery task metadata. Amazon MemoryDB supports the vector database layer where transaction embeddings are stored and queried using K-nearest neighbor (KNN) search to power supporting models. This vector search capability enables the system to find similar historical fraud patterns, supporting the detection of coordinated fraud rings.

Amazon CloudWatch tracks model performance metrics including inference latency, error rates, token usage, and cost per request. This observability is explicitly called out as "critical for detecting model drift, changes in prediction accuracy that signal the need for retraining or model updates." The case study recognizes that production LLM systems require continuous monitoring not just for operational metrics (latency, errors) but for quality metrics (accuracy changes over time). Token usage and cost per request monitoring reflects the economic realities of running foundation models at scale.

## Amazon Bedrock Value Proposition for LLMOps

The case study articulates several specific benefits Amazon Bedrock provides for their LLMOps implementation. Broad model selection means Inscribe can choose the right foundation model for each task without managing separate infrastructure, "turning model selection into a configuration choice rather than an integration project." This addresses a real operational challenge in multi-model architectures—if each model requires custom integration work, the operational overhead becomes prohibitive.

Serverless scaling handles significant swings in document processing volume from quiet overnight hours to business-hour spikes without requiring Inscribe to provision dedicated serving infrastructure. This serverless pattern is particularly valuable for workloads with predictable daily patterns but unpredictable absolute volumes.

Enterprise security and compliance features (encryption in transit and at rest, IAM for fine-grained access control) meet the rigorous data protection standards financial services require. For a fraud detection system processing sensitive financial documents, these security guarantees aren't optional features but fundamental requirements.

Model versioning and governance allow Inscribe to test new model releases in staging environments before promoting to production, "which is critical for maintaining consistent fraud detection accuracy." This highlights a crucial LLMOps challenge: foundation model providers continuously release new versions, and production systems need controlled processes for evaluating and adopting these updates without disrupting accuracy or introducing regressions.

## Production Results and Customer Outcomes

The case study provides specific quantified results from three financial institutions using Inscribe's system. BHG Financial achieved more than 90% reduction in manual review time and prevented millions in potential fraud losses, transforming fraud detection "from a manual, subjective process into a scalable, transparent system." Logix Federal Credit Union prevented more than $3 million in potential loan fraud losses within eight months of deployment, with particular success catching AI-generated forgeries and synthetic documents. BCU prevented $5.6 million in fraud losses with the ability to detect coordinated fraud rings submitting multiple applications that manual review missed.

These results demonstrate that the agentic multi-model system achieves the dual goals of speed (90 seconds vs. 30 minutes, a 20x improvement) and accuracy (catching sophisticated fraud that human reviewers miss). The customer quotes emphasize transformation from subjective manual processes to systematic, repeatable workflows—a key value proposition of production AI systems.

## Critical LLMOps Considerations and Balanced Assessment

While the case study (being co-authored by Inscribe's CTO) presents a positive view of the solution, several important LLMOps considerations emerge. The multi-model orchestration architecture, while providing flexibility and cost optimization, introduces significant complexity in coordination logic, error handling across multiple model calls, and end-to-end latency management. The case study doesn't detail how they handle partial failures (what happens if Claude Sonnet times out but Haiku and Llama succeeded?) or how they maintain consistency in reasoning when models are updated.

The storage of reasoning traces for audit purposes is valuable, but the case study doesn't address how they validate that the stored reasoning actually reflects the model's decision-making process rather than post-hoc rationalization. This is a known challenge with LLM explainability—models can generate plausible-sounding explanations that don't accurately represent their actual reasoning.

The claim of "maintaining the accuracy and explainability required by financial services regulations" requires context. Financial services regulations vary by jurisdiction and application type, and "explainability" requirements range from basic audit trails to detailed counterfactual explanations. The case study doesn't specify which regulatory frameworks they comply with or how they've validated that their explanations meet regulatory standards.

The monitoring for model drift is mentioned but not detailed. Detecting accuracy degradation in fraud detection is challenging because ground truth is delayed (you only know you missed fraud when losses materialize) and fraud patterns evolve continuously. The case study doesn't explain how they establish baseline accuracy, track it over time, or distinguish between model drift and changes in fraud patterns.

The cost savings claims (40% reduction with Haiku, additional savings with Llama) are relative to hypothetical alternatives (using Sonnet for everything) rather than their previous system costs. While directionally meaningful for model selection within Amazon Bedrock, it doesn't provide insight into total cost of ownership compared to their previous manual process or other automated solutions.

## Architectural Patterns and Future Considerations

The case study concludes by noting that "as foundation models on Amazon Bedrock continue to evolve, the agentic approach means Inscribe can adopt new capabilities without rebuilding core infrastructure." This is both a strength and a potential challenge. The abstraction layer provided by coordinating multiple models through a unified API does provide flexibility to swap models. However, agentic systems with complex orchestration logic may be tightly coupled to specific model capabilities, making migration more complex than simple endpoint changes.

The multi-model architecture demonstrates a pragmatic pattern for production LLM systems: use fast, cheap models for well-defined extraction tasks, use powerful models for complex reasoning, and complement with specialized models for domain-specific signals that general models miss. This pattern is likely applicable beyond fraud detection to other complex document analysis and decision-making workflows.

The case study represents a relatively mature LLMOps implementation with appropriate attention to model selection, cost optimization, observability, audit trails, and security. The agentic architecture with multi-model coordination reflects sophisticated thinking about how to compose LLM capabilities into production systems that solve end-to-end business problems rather than just individual inference tasks. The quantified customer outcomes provide evidence that the approach delivers meaningful business value, though as with any vendor case study, the results should be understood in the context of customers who chose to provide testimonials.
