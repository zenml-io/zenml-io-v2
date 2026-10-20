---
title: "Agentic Cloud Security Remediation with Governed LLM Workflows"
slug: "agentic-cloud-security-remediation-with-governed-llm-workflows"
draft: false
llmopsTags:
  - "code-generation"
  - "classification"
  - "data-integration"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "structured-output"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "fallback-strategies"
  - "cost-optimization"
  - "evals"
  - "kubernetes"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "serverless"
  - "orchestration"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "databases"
  - "cache"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "Tamnoon"
summary: "Tamnoon built Tami, an agentic cloud-security remediation platform, to reduce the backlog of findings produced by CNAPPs, CSPM systems, and cloud-native security tools. The system uses specialized agents on Amazon Bedrock to investigate findings, score remediation safety, generate backup-remediate-verify plans, and produce executable code, while applying guardrails, human approval, least-privilege access, rollback procedures, and independent review before changes reach customer environments. Tamnoon reports that Tami has analyzed more than 14 million alerts, enabled up to a 90% reduction in critical cloud exposure within 90 days, delivered up to 100x efficiency through root-cause clustering, saved more than 13,000 engineer hours per week across its customer base, and produced zero reported production issues; these results are company-reported claims rather than independently validated benchmarks."
link: "https://aws.amazon.com/blogs/machine-learning/how-tamnoon-built-ai-powered-cloud-security-remediation-with-amazon-bedrock/"
year: 2026
seo:
  title: "Tamnoon: Agentic Cloud Security Remediation with Governed LLM Workflows - ZenML LLMOps Database"
  description: "Tamnoon built Tami, an agentic cloud-security remediation platform, to reduce the backlog of findings produced by CNAPPs, CSPM systems, and cloud-native security tools. The system uses specialized agents on Amazon Bedrock to investigate findings, score remediation safety, generate backup-remediate-verify plans, and produce executable code, while applying guardrails, human approval, least-privilege access, rollback procedures, and independent review before changes reach customer environments. Tamnoon reports that Tami has analyzed more than 14 million alerts, enabled up to a 90% reduction in critical cloud exposure within 90 days, delivered up to 100x efficiency through root-cause clustering, saved more than 13,000 engineer hours per week across its customer base, and produced zero reported production issues; these results are company-reported claims rather than independently validated benchmarks."
  canonical: "https://www.zenml.io/llmops-database/agentic-cloud-security-remediation-with-governed-llm-workflows"
  ogTitle: "Tamnoon: Agentic Cloud Security Remediation with Governed LLM Workflows - ZenML LLMOps Database"
  ogDescription: "Tamnoon built Tami, an agentic cloud-security remediation platform, to reduce the backlog of findings produced by CNAPPs, CSPM systems, and cloud-native security tools. The system uses specialized agents on Amazon Bedrock to investigate findings, score remediation safety, generate backup-remediate-verify plans, and produce executable code, while applying guardrails, human approval, least-privilege access, rollback procedures, and independent review before changes reach customer environments. Tamnoon reports that Tami has analyzed more than 14 million alerts, enabled up to a 90% reduction in critical cloud exposure within 90 days, delivered up to 100x efficiency through root-cause clustering, saved more than 13,000 engineer hours per week across its customer base, and produced zero reported production issues; these results are company-reported claims rather than independently validated benchmarks."
notion:
  pageId: "3faf8dff-2538-80a7-a092-e74eda6f664e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-15T07:00:00.000Z"
  lastEditedTime: "2026-10-15T07:00:00.000Z"
  publishedAt: "2026-10-20T14:47:12Z"
---

## Overview

Tamnoon is a cloud-security remediation company whose Tami platform operates downstream of CNAPPs, cloud security posture management systems, and cloud-native detection services. The operational problem is not a lack of findings: tools such as Wiz, CrowdStrike, Palo Alto Cortex, Upwind, SentinelOne, Orca, Cyera, AWS Security Hub, and Amazon GuardDuty can generate more alerts than security teams can investigate and safely close. Each item may require ownership discovery, dependency analysis, production-impact assessment, and a carefully sequenced change. Tami applies large language models and event-driven orchestration to automate much of this work while keeping a distinction between investigation and execution.

The central production design is a set of four specialized agents running on Amazon Bedrock. They investigate and contextualize findings, assign a conservative remediation-confidence classification, create plans with backup, remediation, verification, and rollback steps, and generate executable remediation artifacts. The system does not give an unconstrained model direct access to customer infrastructure. Instead, it combines model-based reasoning with read-only validation, guardrails, independent review, short-lived tenant-scoped credentials, approval workflows, audit trails, and human escalation. Tamnoon reports more than 14 million analyzed alerts and claims up to a 90% reduction in critical exposure within 90 days, but the source is an AWS/Tamnoon customer-success article and does not provide an independent methodology, control group, detailed error rates, or a breakdown of results by customer.

## Problem and operating model

Security findings accumulate because investigation and remediation are labor-intensive and risky. An engineer must determine the affected asset, identify its owner, understand related resources, establish the root cause, and decide whether a proposed change could interrupt production. Teams consequently tend to process alerts linearly or defer them, even when many findings share a common cause. Tamnoon’s approach is to normalize inputs from multiple detection systems into a common schema, enrich them with asset and exposure context, cluster related issues, and prioritize work before invoking the remediation agents.

Tami assigns each finding a Remediation Confidence Indicator: SAFE, RISKY, or AWAITING DATA. The deliberately conservative policy means uncertainty should reduce automation rather than increase it. SAFE findings can proceed toward automated remediation, while RISKY and AWAITING DATA cases require additional information or human review. This classification is an important operational control because an LLM’s ability to produce a plausible explanation is not treated as evidence that a destructive or production-affecting action is safe.

## Agent and model architecture

The investigation agent produces a read-only investigation plan covering the remediation objective, operational scope, and cloud-provider-specific verification. The article states that its behavior is informed by training from millions of real customer cloud environments and is filtered through an LLM-as-a-judge validation layer. The safety-scoring agent combines automated verification with analyst findings to construct an evidence chain for each asset. It then applies the conservative confidence classification.

Only after the safety stage considers a finding safe does the remediation agent reason about ordering, dependencies, and execution conditions. Its plans follow a backup, remediate, and verify structure and include rollback guidance. A separate code-generation agent converts approved plan steps into executable remediation. Before generation, an input guardrail checks relevance and prompt-injection risk. Generated artifacts then pass a generate-and-review loop in which a separate reviewer agent must approve the output. The system therefore uses multiple model calls for decomposition, critique, and approval instead of relying on a single completion.

Tamnoon invokes Anthropic Claude models through Amazon Bedrock using the ChatBedrockConverse interface. Bedrock provides a common API through which different foundation models can be matched to different workloads: more capable models for difficult investigations, lower-cost models for high-volume validation, and review-oriented models for quality and cost tradeoffs. This abstraction also makes model replacement or upgrading less disruptive than maintaining separate provider integrations. The source says model versions are pinned to dated identifiers, including an example such as `claude-sonnet-4-5-20250929`, so a model change is intended to be an explicit, reviewed deployment change. Temperature is set to zero for deterministic decoding in scoring and planning, although deterministic decoding does not by itself guarantee correct or safe decisions.

## Production infrastructure and orchestration

The platform runs in Tamnoon-controlled AWS accounts with isolation per environment. Amazon API Gateway provides the secure entry point, AWS Certificate Manager supports encryption, and Amazon Cognito handles sign-in. Core services run in private networks across multiple Availability Zones. Amazon EKS hosts always-on dashboard and platform services, while AWS Lambda handles event-driven finding collection, analysis, and remediation work.

Amazon EventBridge, Amazon SQS, and AWS Step Functions coordinate processing so findings can be handled in parallel and individual bad records do not block unrelated work. Queues include redrive behavior and dead-letter queues, with error-handler functions and CloudWatch alarms for timeouts and DLQ depth. This is a significant LLMOps characteristic: model calls are embedded in observable, retryable, failure-contained workflows rather than being performed synchronously inside an unmonitored application request. Amazon S3 stores playbooks and artifacts, managed databases and caching retain application state, and AWS Secrets Manager stores credentials. Bedrock AgentCore is described as providing a governed way for agents to connect and take action without open-ended access.

Bedrock Cross-Region inference routes requests to an appropriate AWS Region within a defined geographic boundary, reducing the need for Tamnoon to implement its own capacity distribution logic. The article says workloads run in US commercial Regions and that customer data remains within AWS. These are architectural and provider-policy claims in the source; organizations adopting a similar design would still need to verify current regional availability, data-residency requirements, model-specific behavior, and contractual controls.

## Safety, security, and governance

A defense-in-depth design separates planning from execution. Investigation is validated as read-only, while remediation is the only path permitted to modify infrastructure. Each proposed change includes backup, verification, and rollback steps. Reflection or critique accompanies generation, and the output can be regenerated after review. Recommendations are checked against automation results, user feedback, and data from previously fixed alerts. When the system cannot reach an accurate result, a human is brought into the workflow.

The AI agents do not hold cloud credentials. Execution is brokered through short-lived, tenant-scoped credentials under customer-controlled trust and occurs in an isolated environment separate from the planning agents. Approval workflows and complete audit trails provide governance around changes. This separation reduces blast radius, but it does not eliminate the need to test rollback behavior, handle partial failures, and validate that backups and verification checks are themselves correct.

Amazon Bedrock Guardrails are applied to requests and responses. According to the source, they mask PII and secret-like content, filter prompt injection in untrusted finding payloads, constrain topics to security remediation, and log interventions alongside AWS CloudTrail. Per-service IAM roles scope Bedrock access to `bedrock:InvokeModel` and selected model or inference-profile ARNs; services do not receive permissions to manage, train, or export models. Similar narrow permissions apply to secrets, queues, and CloudWatch. OAuth2 client credentials through Cognito and tenant context attached to each SQS message support multi-tenant isolation, with one invocation processing one tenant’s work.

Infrastructure definitions, IAM policies, network placement, model IDs, and alarms are maintained in versioned CloudFormation and SAM templates. This supports reviewable changes and reduces configuration drift. CloudTrail attribution, zero-temperature decoding, queue redrive, dead-letter handling, and operational alarms provide useful observability and control points. The source does not describe a complete offline evaluation suite, model-quality dashboard, false-positive rate, unsafe-action rate, latency or token-cost targets, or the frequency with which humans override the agents. Those would be important additions for a full production LLMOps assessment.

## Results and tradeoffs

Tamnoon reports that Tami has analyzed more than 14 million cloud alerts. For a typical customer, the article claims up to a 90% reduction in critical cloud exposure in 90 days, up to 100x remediation efficiency through root-cause clustering, zero production issues across millions of workloads, and more than 13,000 engineer hours saved per week across the customer base. The article attributes these figures to Tamnoon research and presents them as customer results, but does not disclose customer selection, baseline definitions, confidence intervals, independent verification, or whether “zero production issues” includes near misses and manually prevented failures. The metrics should therefore be treated as reported outcomes rather than generalizable proof that the architecture will achieve the same results elsewhere.

The main tradeoff is between automation and operational assurance. Specialized agents, model routing, review loops, and guardrails increase cost and latency compared with a single model call, but they address the higher consequences of changing live infrastructure. Conservative SAFE/RISKY/AWAITING DATA decisions may leave some automation opportunities unused, while aggressive thresholds would increase the risk of outages or security regressions. Root-cause clustering can improve throughput, but incorrect clustering could cause a broad remediation to affect assets that should have been treated separately. Likewise, prompt-injection filtering and IAM controls reduce common attack paths but cannot replace deterministic policy checks, sandbox testing, customer approvals, and post-change monitoring.

Overall, Tami is a substantial production LLMOps implementation because it treats models as fallible components inside a governed distributed system. Its strongest practices are specialized task decomposition, explicit model-version control, guarded input and output paths, read/write separation, least privilege, isolated execution, rollback-aware plans, human escalation, and queue-based observability. The evidence in the source supports the existence of this architecture and the company’s reported operational claims; it is not sufficient to independently establish the claimed causal impact or universal safety of autonomous cloud remediation.
