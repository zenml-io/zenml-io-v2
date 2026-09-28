---
title: "Multi-Agent Open Finance Onboarding on Amazon Bedrock"
slug: "multi-agent-open-finance-onboarding-on-amazon-bedrock"
draft: false
llmopsTags:
  - "classification"
  - "question-answering"
  - "document-processing"
  - "data-integration"
  - "data-analysis"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "chatbot"
  - "rag"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "system-prompts"
  - "monitoring"
  - "load-balancing"
  - "scaling"
  - "orchestration"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "docker"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
industryTags: "finance"
company: "Ninth Wave"
summary: "Ninth Wave built Compass to reduce the specialist effort required to validate bank APIs, map fields to the Financial Data Exchange (FDX) standard, answer integration questions, and assess readiness for production connectivity. The production system uses a Strands Agents orchestrator on Amazon Bedrock AgentCore, seven task-focused specialist agents, tenant-scoped grounding from Amazon OpenSearch Service and Amazon S3, and a narrowly scoped Amazon Bedrock Knowledge Base for readiness analysis. It combines per-task model selection, deterministic readiness scoring, application-layer safety controls, and AWS security and observability services. Ninth Wave reports a 95 percent reduction in API mapping and analysis time, although the source does not provide the baseline, measurement methodology, sample size, or independent validation for that result."
link: "https://aws.amazon.com/blogs/machine-learning/how-ninth-wave-built-ai-powered-open-finance-onboarding-on-amazon-bedrock/"
year: 2026
seo:
  title: "Ninth Wave: Multi-Agent Open Finance Onboarding on Amazon Bedrock - ZenML LLMOps Database"
  description: "Ninth Wave built Compass to reduce the specialist effort required to validate bank APIs, map fields to the Financial Data Exchange (FDX) standard, answer integration questions, and assess readiness for production connectivity. The production system uses a Strands Agents orchestrator on Amazon Bedrock AgentCore, seven task-focused specialist agents, tenant-scoped grounding from Amazon OpenSearch Service and Amazon S3, and a narrowly scoped Amazon Bedrock Knowledge Base for readiness analysis. It combines per-task model selection, deterministic readiness scoring, application-layer safety controls, and AWS security and observability services. Ninth Wave reports a 95 percent reduction in API mapping and analysis time, although the source does not provide the baseline, measurement methodology, sample size, or independent validation for that result."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-open-finance-onboarding-on-amazon-bedrock"
  ogTitle: "Ninth Wave: Multi-Agent Open Finance Onboarding on Amazon Bedrock - ZenML LLMOps Database"
  ogDescription: "Ninth Wave built Compass to reduce the specialist effort required to validate bank APIs, map fields to the Financial Data Exchange (FDX) standard, answer integration questions, and assess readiness for production connectivity. The production system uses a Strands Agents orchestrator on Amazon Bedrock AgentCore, seven task-focused specialist agents, tenant-scoped grounding from Amazon OpenSearch Service and Amazon S3, and a narrowly scoped Amazon Bedrock Knowledge Base for readiness analysis. It combines per-task model selection, deterministic readiness scoring, application-layer safety controls, and AWS security and observability services. Ninth Wave reports a 95 percent reduction in API mapping and analysis time, although the source does not provide the baseline, measurement methodology, sample size, or independent validation for that result."
notion:
  pageId: "3e9f8dff-2538-8074-8fb5-d834acde9e9a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:14:00.000Z"
  lastEditedTime: "2026-09-28T08:14:00.000Z"
  publishedAt: "2026-09-28T08:25:34Z"
---

## Overview

Ninth Wave provides connectivity between financial institutions and third-party applications, aggregators, and accounting systems. Its platform normalizes bank APIs to the Financial Data Exchange (FDX) standard so that a bank can integrate once and connect to a broader open finance network. The operational challenge is that banks expose APIs with different field names, formats, documentation quality, and coverage of the FDX standard. Traditionally, validating those APIs, mapping fields, and determining whether an integration is ready for production required specialist work across email, spreadsheets, and engineering teams.

Ninth Wave addressed this problem with Compass, an AI-enabled onboarding workspace for bank engineers, aggregator integration teams, fintech partners, and Ninth Wave staff. Compass uses a multi-agent architecture hosted on Amazon Bedrock AgentCore and orchestrated with the Strands Agents framework. The reported outcome is a 95 percent reduction in API mapping and analysis time, with activities that previously required specialist effort being completed in minutes. This is a vendor-authored AWS customer-success account, however, and the source does not state how the reduction was measured, what the baseline was, how many onboarding cases were evaluated, or whether the result was independently verified.

## Problem and requirements

Compass was intended to improve three related parts of onboarding: API validation, mapping of bank-specific fields to FDX fields, and readiness assessment for production connectivity. It also had to support collaboration and self-service for external partners rather than serving only as an internal engineering tool. That created a more demanding production setting than a private chatbot: different banks needed isolated data contexts, users needed reliable answers about technical documentation, and the workflow had financial-services security and audit requirements.

Ninth Wave identified requirements for faster and more consistent onboarding, a governed AI experience for external partners, and continuity with its existing security practices. The stated controls include least-privilege access, encryption in transit and at rest, audit logging, content-safety controls, and alignment with SOC 2 and PCI DSS requirements. The text describes architectural alignment and operational controls; it does not claim that Compass itself achieved a new certification or provide audit results.

## Architecture and agent design

The system uses a primary Compass agent as an intent classifier and router. It sends a request to one of seven specialists, each with a bounded context and a task-specific instruction set:

- A search agent ranks results across portal documentation.
- A documentation question-answering agent responds to natural-language questions using Compass and FDX documentation.
- A document-classification agent classifies uploaded material.
- A field-mapping agent aligns FDX fields with the bank's API structure.
- An analysis agent identifies field-level drift, formatting issues, and naming-convention gaps.
- An interactive-workflow agent drives guided onboarding processes through tool invocation.
- A readiness-analysis agent composes readiness narratives using an Amazon Bedrock Knowledge Base.

The design deliberately separates intent classification from specialist execution. Ninth Wave's rationale is that a single agent or a single-agent RAG design would be simpler, but could be less accurate when mapping, analysis, search, and interactive question answering compete for the same prompt context. Specialist agents reduce prompt dilution and allow instructions, safety boundaries, and model choices to be tuned per task. The tradeoff is additional orchestration complexity, more deployment units, and a larger testing and monitoring surface.

Models are selected by task rather than applied uniformly. Lightweight models handle high-volume work, while higher-reasoning models are used for mapping, analysis, and interactive question answering. This can improve the cost-capability tradeoff, but the source does not identify the specific models, provide quality comparisons, or show how routing and model selection are evaluated over time.

## Grounding, retrieval, and deterministic logic

Tenant-scoped grounding is a central production design choice. Before an agent is invoked, the application uses the authenticated tenant identity to retrieve the relevant bank's API documentation, configuration data, and prior interaction context. Data is stored in per-tenant OpenSearch indices and S3 prefixes, and the application assembles only the selected bank's context into the request. This approach gives Ninth Wave explicit control over the context sent to the model and is intended to prevent one bank's information from entering another bank's session, even though the model infrastructure is shared.

Most agents are grounded through application-managed retrieval and context assembly rather than through a shared general-purpose knowledge base. Readiness analysis is the exception. It uses an Amazon Bedrock Knowledge Base because it must synthesize information from a corpus of FDX reference documents that is too large to pass in one request. Limiting RAG to that specialist is a useful architectural boundary: application-layer retrieval supports tenant control and custom ranking for most tasks, while managed RAG is used where corpus-scale synthesis is required.

The readiness score itself is not generated by an LLM. Compass computes it deterministically in application code from required-field mapping coverage stored in OpenSearch. The model can produce a narrative around the assessment, but the underlying score is tied to an explicit coverage calculation. This separation reduces the risk that a probabilistic response will determine an auditable integration metric. It also illustrates an important LLMOps pattern: use language models for interpretation, explanation, and interaction while retaining conventional code for business-critical calculations.

## Production security and tenancy

Requests enter through Amazon CloudFront and AWS WAF v2, with TLS 1.2 or higher, HSTS, and default-deny web access control lists described at the edge. Traffic then reaches an internal Application Load Balancer using TLS 1.3. Amazon ECS on AWS Fargate validates sessions against an OAuth2/OIDC identity provider with MFA enforced. Tenant identity is propagated downstream so that queries can be scoped to the correct bank.

Secrets are stored in AWS Secrets Manager with per-environment customer-managed AWS KMS keys. AWS IAM supplies least-privilege permissions, and AWS CloudTrail records supported AWS API activity. The AI runtime is separated from the application workload through a dedicated Amazon Bedrock AgentCore environment and a cross-account IAM role. Ninth Wave presents this separation as a way to contain blast radius between accounts. OpenSearch indices and S3 prefixes are partitioned by tenant, while application-level authorization restricts each bank to its own onboarding workspace.

Agent behavior and safety constraints are applied at the application layer on a per-agent basis. This permits the team to restrict an agent's scope or output behavior without changing every specialist. The architecture supports defense in depth, but tenant isolation still depends on correct identity propagation, authorization, retrieval filtering, prompt construction, and tool permissions. The source describes the intended controls but does not report penetration-test findings, leakage tests, red-team results, or measured false-authorization rates.

## Deployment, observability, and operations

Infrastructure was provisioned with AWS CloudFormation and the AWS CDK across dedicated workload, Bedrock, and shared-services accounts. The application runs on ECS and AWS Fargate. The continuous integration and delivery pipeline uses GitHub Actions: a push builds a container image, publishes it to Amazon ECR, registers a new ECS task definition, and performs a rolling Fargate deployment with circuit-breaker rollback. The rollback mechanism is particularly relevant to LLM applications because prompt, grounding, and agent-code changes can affect behavior even when conventional service health checks remain green.

Compass monitors both infrastructure health and model-facing behavior. CloudWatch tracks load-balancer latency, ECS task counts, and OpenSearch cluster health. Custom application metrics record Bedrock invocation count, token usage, latency, and cost, with dimensions for individual agents. SNS routes alerts to the on-call team, and Amazon Managed Grafana provides dashboards. Per-agent dimensions allow operators to distinguish, for example, a regression in mapping from a broader platform outage and to identify which agent is driving token consumption or latency.

The described observability is strong on operational and cost telemetry, but the source does not mention systematic semantic evaluation, golden datasets, hallucination rates, citation or grounding accuracy, task-level precision and recall, human-review rates, or drift detection. Those omissions matter because infrastructure availability and token metrics do not establish that an agent is producing correct field mappings or safe onboarding guidance. A mature evaluation program would likely need separate quality tests for each specialist, regression tests for prompts and retrieval, authorization and tenant-isolation tests, and monitoring of the deterministic score against the narrative generated by the model.

## Delivery timeline and reported results

Compass was delivered in five phases. Ninth Wave first established OpenSearch, S3, infrastructure-as-code, cross-account roles, and the AgentCore model configuration. It then built the developer portal and onboarding automation, deployed the orchestrator and specialists, integrated tenant-scoped grounding and the readiness knowledge base, and completed a dedicated security-hardening phase. Beta clients were onboarded on March 1, 2026; the production environment was ready on May 15, 2026; and general availability began on June 1, 2026.

Ninth Wave reports faster API mapping and analysis, more centralized collaboration, documentation chat and API Explorer self-service, quicker readiness assessments, and custom-branded portals where banks can invite aggregators and fintech partners. The headline result is a claimed 95 percent reduction in mapping and analysis time. Other benefits are described qualitatively rather than with operational metrics. There is no stated impact on onboarding error rates, model quality, support volume, infrastructure cost, partner satisfaction, or production integration success.

## Tradeoffs and assessment

Compass is a notable production-oriented design because it does not treat the LLM as the complete system. Deterministic scoring handles an auditable business rule; tenant-aware application code controls context; specialist agents constrain task scope; managed AWS services supply identity, encryption, networking, deployment, and telemetry; and a knowledge base is used only where large-corpus synthesis justifies it. The per-task model strategy may also avoid spending a high-capability model on routine operations.

The principal costs are architectural complexity and platform dependence. Seven specialists, an orchestrator, multiple data stores, cross-account permissions, and separate safety policies require disciplined release management and end-to-end testing. Managed AgentCore and Bedrock reduce infrastructure burden, but increase reliance on AWS service availability, regional model support, service behavior, and pricing. The source also does not quantify token cost, latency targets, throughput, or the operational effort needed to maintain prompts, mappings, documentation, and retrieval indexes.

Overall, the case demonstrates a credible pattern for using LLMs in a regulated, multi-tenant integration workflow: keep models grounded and task-bounded, isolate tenants before inference, use deterministic logic for auditable outputs, and instrument cost and behavior at the agent level. Its reported efficiency gain is promising but should be treated as a company-reported outcome rather than a fully substantiated benchmark until the baseline, evaluation protocol, quality safeguards, and longer-term production data are disclosed.
