---
title: "Multi-Model AI Architecture for Database Developer Assistant"
slug: "multi-model-ai-architecture-for-database-developer-assistant"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "question-answering"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "model-optimization"
  - "few-shot"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "evals"
  - "kubernetes"
  - "api-gateway"
  - "microservices"
  - "scaling"
  - "serverless"
  - "monitoring"
  - "databases"
  - "documentation"
  - "reliability"
  - "scalability"
  - "security"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "Couchbase"
summary: "Couchbase built Capella iQ, an AI-powered developer assistant that generates database queries, recommends indexes, and supports multi-turn conversational workflows. As enterprise adoption grew, they needed a scalable, multi-model inference architecture that could handle traffic bursts and maintain high availability across regions without pre-provisioned capacity. They adopted Amazon Bedrock with Anthropic's Claude Sonnet 4.5, implementing a provider-agnostic architecture on Amazon EKS with private VPC endpoints and Cross-Region Inference. The production system achieved approximately 76 percent accuracy on internal benchmarks modeled on BIRD methodology across core workflows including SQL++ generation, index recommendations, and multi-turn conversations, while delivering improved operational resilience and flexibility to adopt newer models through configuration changes rather than code modifications."
link: "https://aws.amazon.com/blogs/machine-learning/how-couchbase-built-a-multi-model-ai-architecture-for-capella-iq-with-amazon-bedrock/"
year: 2026
seo:
  title: "Couchbase: Multi-Model AI Architecture for Database Developer Assistant - ZenML LLMOps Database"
  description: "Couchbase built Capella iQ, an AI-powered developer assistant that generates database queries, recommends indexes, and supports multi-turn conversational workflows. As enterprise adoption grew, they needed a scalable, multi-model inference architecture that could handle traffic bursts and maintain high availability across regions without pre-provisioned capacity. They adopted Amazon Bedrock with Anthropic's Claude Sonnet 4.5, implementing a provider-agnostic architecture on Amazon EKS with private VPC endpoints and Cross-Region Inference. The production system achieved approximately 76 percent accuracy on internal benchmarks modeled on BIRD methodology across core workflows including SQL++ generation, index recommendations, and multi-turn conversations, while delivering improved operational resilience and flexibility to adopt newer models through configuration changes rather than code modifications."
  canonical: "https://www.zenml.io/llmops-database/multi-model-ai-architecture-for-database-developer-assistant"
  ogTitle: "Couchbase: Multi-Model AI Architecture for Database Developer Assistant - ZenML LLMOps Database"
  ogDescription: "Couchbase built Capella iQ, an AI-powered developer assistant that generates database queries, recommends indexes, and supports multi-turn conversational workflows. As enterprise adoption grew, they needed a scalable, multi-model inference architecture that could handle traffic bursts and maintain high availability across regions without pre-provisioned capacity. They adopted Amazon Bedrock with Anthropic's Claude Sonnet 4.5, implementing a provider-agnostic architecture on Amazon EKS with private VPC endpoints and Cross-Region Inference. The production system achieved approximately 76 percent accuracy on internal benchmarks modeled on BIRD methodology across core workflows including SQL++ generation, index recommendations, and multi-turn conversations, while delivering improved operational resilience and flexibility to adopt newer models through configuration changes rather than code modifications."
notion:
  pageId: "3a5f8dff-2538-80cc-a256-d8b53f10b9a8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-22T07:29:00.000Z"
  lastEditedTime: "2026-07-22T07:29:00.000Z"
  publishedAt: "2026-07-22T07:39:35Z"
---

## Overview

Couchbase developed Capella iQ, an AI-powered developer assistant designed to help database developers generate SQL++ queries, receive index recommendations, and engage in multi-turn conversational workflows about their database operations. This case study describes Couchbase's evolution from a single-model approach to a sophisticated multi-model LLMOps architecture built on Amazon Bedrock. The implementation demonstrates enterprise-grade production deployment with emphasis on scalability, resilience, operational flexibility, and provider abstraction.

As enterprise adoption of Capella iQ expanded, Couchbase recognized the need for architectural evolution beyond reliance on a single LLM provider. The requirements included support for multiple foundation model providers to improve operational resilience, alignment with diverse customer deployment preferences, flexibility to adopt newer models as they become available, and the ability to scale through traffic bursts while maintaining high availability across AWS Regions without pre-provisioned capacity. Critically, they needed a model-agnostic inference architecture that would treat model selection as a configuration decision rather than requiring code changes.

## Production Architecture

The production architecture for Capella iQ's integration with Amazon Bedrock operates within an AWS Control Plane spanning two AWS Regions (us-east-1 and us-west-2) for high availability. The core infrastructure is built on Amazon Elastic Kubernetes Service (EKS) running in us-east-1, hosting three primary microservices that orchestrate the LLM inference pipeline.

The **cp-api pod** serves as the primary API service receiving developer requests and orchestrating inference calls, forwarding Amazon Bedrock invocations through a VPC interface endpoint for private connectivity. The **cp-internal-api pod** handles internal service-to-service communication and implements model routing logic that determines which model to use for specific requests. The **cp-ns pod** manages namespace-level configuration including model vendor settings, tenant-level overrides, and organization preferences, enabling fine-grained control over model selection at different organizational levels.

A critical architectural decision was the use of Amazon VPC interface endpoints to provide private connectivity from the EKS cluster to the Amazon Bedrock runtime. This design ensures that inference traffic remains within the AWS infrastructure and never traverses the public internet, meeting enterprise security and data residency requirements. The VPC endpoint routes inference traffic to infrastructure managed by AWS for Bedrock and supports Cross-Region Inference (CRIS) within the US geography across us-east-1, us-east-2, and us-west-2.

## Request Processing Pipeline

The end-to-end request processing pipeline demonstrates sophisticated orchestration of multiple components. When a developer interacts with Capella iQ—whether asking for a SQL++ query, requesting an index recommendation, or continuing a multi-turn conversation—the request flows through a carefully designed pipeline. The cp-api pod handles authentication, retrieves session context, and determines the appropriate prompt template for the request type. This initial stage is critical for maintaining conversation continuity in multi-turn dialogues.

During inference orchestration, the cp-api pod assembles the inference payload by constructing the prompt, injecting conversation history for multi-turn context, and applying tenant-specific model configurations retrieved from the cp-ns pod. The cp-internal-api pod resolves model vendor selection and organization-level routing overrides, enabling different customers or teams to use different models based on their preferences or requirements. This abstraction layer is a key element of the provider-agnostic design.

For model invocation, the cp-api pod forwards requests through the VPC interface endpoint to the Amazon Bedrock runtime, ensuring the full prompt and response payload remains within AWS infrastructure. Amazon Bedrock automatically routes inference requests to the optimal US Region using Cross-Region Inference, keeping requests within the US geographic boundary while distributing load and providing failover capabilities. During demand spikes or regional degradation, requests route to available Regions without requiring application-level logic or manual intervention. The model response—whether a generated SQL++ query, index recommendation, or conversational reply—streams back through the same private path, with the cp-api pod applying response normalization and formatting before delivering results to developers. Conversation state is persisted to enable multi-turn continuity.

## Model Evaluation and Selection

Couchbase implemented a rigorous model evaluation framework before selecting models for production deployment. They established a benchmark suite covering all core Capella iQ workflows: SQL++ generation, index recommendations, query explanations, iQ Insights generation, and multi-turn conversations. Multiple models available on Amazon Bedrock were evaluated using standardized prompt/response test sets, with scoring focused on four critical dimensions: functional correctness, determinism, latency, and formatting consistency.

Anthropic's Claude Sonnet 4.5 achieved approximately 76 percent accuracy on an internal evaluation modeled on BIRD methodology, meeting the production quality bar across all evaluated workflows with no critical regressions. This performance validated Claude Sonnet 4.5 as the initial production model for Capella iQ's diverse workload profile, spanning structured code generation, natural language explanation, and multi-turn reasoning. The case study notes this as approximately 76 percent accuracy, and it's important to recognize that while this represents the stated performance, independent verification of this benchmark is not provided in the source material.

More importantly than selecting a single model, this process validated a model evaluation framework that enables Couchbase to rapidly qualify and adopt newer models as they become available on Amazon Bedrock. This framework represents a critical LLMOps capability, allowing systematic comparison of models across standardized criteria and reducing the time and effort required to adopt newer model generations.

## Amazon Bedrock Integration Benefits

The choice of Amazon Bedrock as the inference platform delivered several operational advantages. As a fully managed, serverless inference environment, Bedrock removes the need to manage model infrastructure, eliminating the operational overhead of provisioning, scaling, and maintaining inference servers. The growing catalog of foundation models available through Bedrock means Couchbase can evaluate and adopt newer model generations without re-architecting their inference pipeline—a key requirement for their multi-model strategy.

Cross-Region Inference provides built-in resilience and geographic distribution that would otherwise require significant custom engineering. For Couchbase, single-API access to multiple model families through Amazon Bedrock was a natural fit for their goal of building a provider-agnostic architecture where model selection is a configuration choice rather than a code change. This architectural approach ensures that model upgrades or provider changes require only configuration updates at the namespace layer, with no code changes, no downtime, and no impact to the developer experience.

Enterprise customers require deployment flexibility and confidence that inference traffic remains within a well-governed AWS footprint. By integrating with Amazon Bedrock, Couchbase offers customers the benefit of AWS security posture, data residency controls, and compliance certifications (SOC, HIPAA, ISO) for AI-assisted workflows within Capella iQ.

## Engineering Challenges and Solutions

While Amazon Bedrock simplified much of the infrastructure complexity, building a production-grade multi-model inference layer at enterprise scale introduced significant challenges. The most substantial challenge emerged during validation of cross-Region failover scenarios. Testing that inference traffic routed correctly between us-east-1 and us-west-2 under various failure modes—including partial endpoint degradation and regional throttling—required building custom test harnesses and simulating conditions difficult to reproduce in development environments. The team worked closely with AWS to validate that requests would automatically reroute to healthy Regions without impacting response quality or latency, and to tune timeout and retry configurations for production readiness.

Running comprehensive benchmarks across multiple candidate models introduced complexity in comparing results fairly. Differences in tokenization, context window handling, and response formatting required careful normalization before scores could be meaningfully compared. The team built automated evaluation pipelines to facilitate reproducibility and reduce manual overhead during model selection. This investment in evaluation infrastructure represents a critical LLMOps capability that will continue to provide value as new models are evaluated.

## Operational Lessons and Key Insights

Several key lessons emerged from Couchbase's implementation. Investing early in a provider abstraction layer enabled Bedrock integration without disrupting the Capella iQ user experience and maintains long-term flexibility to adopt new models or providers without re-engineering core application logic. This abstraction layer, implemented through the cp-ns and cp-internal-api pods, treats model selection as configuration rather than code, dramatically reducing the friction associated with model changes.

Cross-Region Inference simplified operations by handling bursty workloads across Regions without pre-provisioned capacity or custom failover logic, improving service availability while reducing operational complexity. This capability is particularly valuable for SaaS applications where traffic patterns can be unpredictable and provisioning for peak capacity would be cost-prohibitive.

Production-grade multi-model support demands sustained investment in benchmarking infrastructure, prompt engineering, and observability. The case study emphasizes that teams should plan for this as a continuous workstream rather than a one-time setup. This insight reflects the reality that LLMOps is an ongoing operational discipline rather than a deployment milestone.

## Production Results and Performance

In production deployment, Claude Sonnet 4.5 on Amazon Bedrock achieved approximately 76 percent accuracy across Capella iQ's core workflows. Latency and throughput targets were met within acceptable margins, with no user-impacting quality regressions observed during controlled traffic testing. End users experience the same quality and responsiveness they expect from Capella iQ, now backed by the managed infrastructure and cross-Region resilience of Amazon Bedrock.

It's worth noting that while these results are presented as validation of the approach, the case study is promotional in nature and published by AWS. The 76 percent accuracy figure is based on internal evaluation modeled on BIRD methodology rather than the actual BIRD benchmark, and independent verification is not available. Nevertheless, the absence of user-impacting quality regressions during controlled traffic testing suggests the system met production quality requirements for Couchbase's use case.

## Future Directions

Couchbase is actively exploring cost optimization through deployment of fine-tuned smaller models via Amazon Bedrock's Custom Model Import capability. By distilling task-specific knowledge into lightweight models for high-volume, well-bounded workloads such as index recommendations and query explanation, the team aims to reduce per-inference cost while maintaining quality. This approach exemplifies the value of a multi-model architecture: choosing the right model for the right task while continuously adopting the latest model advancements within a single managed infrastructure.

Starting with Claude Sonnet 4.5 and evolving to newer models as they become available—including Claude Sonnet 5 and future generations—the architecture is designed to support rapid adoption of new models through the evaluation framework and provider abstraction layer. This positions Couchbase to continuously improve Capella iQ's capabilities without requiring fundamental architectural changes.

## Critical Assessment

This case study demonstrates a well-architected approach to multi-model LLM deployment in production, with particular strengths in provider abstraction, regional resilience, and systematic model evaluation. The use of Kubernetes-based microservices with namespace-level configuration enables flexible model routing at different organizational levels, a capability valuable for multi-tenant SaaS applications.

However, readers should note that this is a promotional case study published on the AWS blog, and some claims should be viewed with appropriate skepticism. The 76 percent accuracy figure, while specific, is based on an internal evaluation "modeled on" BIRD methodology rather than the actual BIRD benchmark, and the methodology details are not provided. The case study does not discuss specific latency numbers, cost implications, or comparative performance against their previous single-model approach, which would strengthen the business case for the architectural investment.

The emphasis on provider abstraction and multi-model support is forward-looking and architecturally sound, but the case study doesn't describe actual production usage of multiple models—only the architecture's capability to support them. The single production model (Claude Sonnet 4.5) deployment suggests that while the architecture supports multi-model operation, the operational complexity or business requirements may not yet justify running multiple models in parallel.

The investment in systematic model evaluation infrastructure and provider abstraction represents solid LLMOps practice, particularly for organizations expecting to operate LLM-powered features over multi-year timeframes where model evolution is certain. The architectural pattern of treating model selection as configuration through namespace-level settings is reusable and represents a valuable contribution to LLMOps architectural patterns. The integration of Cross-Region Inference for automatic failover demonstrates thoughtful operational planning, though the case study would benefit from specific uptime or availability metrics to quantify the improvement.
