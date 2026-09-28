---
title: "Sandboxed Agentic Email Threat Detection at Billion-Message Scale"
slug: "sandboxed-agentic-email-threat-detection-at-billion-message-scale"
draft: false
llmopsTags:
  - "classification"
  - "code-interpretation"
  - "data-analysis"
  - "realtime-application"
  - "unstructured-data"
  - "agent-based"
  - "harness-engineering"
  - "cost-optimization"
  - "fallback-strategies"
  - "error-handling"
  - "serverless"
  - "monitoring"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
industryTags: "tech"
company: "Abnormal AI"
summary: "Abnormal AI uses inline LLM-powered agents and Amazon Bedrock AgentCore Code Interpreter to investigate the hardest email threats that simpler rules and machine-learning models cannot confidently classify. The agents receive threat-intelligence data, write and execute analysis code in ephemeral isolated MicroVM sandboxes, and use computational checks to support real-time decisions. Abnormal AI reports processing billions of messages through a tiered pipeline, routing tens of thousands of difficult cases to agents, while a separate batch analyst agent uses misclassification data to propose improved heuristics and models. The AWS account presents this as a production-scale architecture, but the article does not provide independently validated detection-quality, latency, cost, or false-positive metrics."
link: "https://aws.amazon.com/blogs/machine-learning/abnormal-ai-amazon-bedrock-agentcore-for-agentic-email-security-at-scale/"
year: 2026
seo:
  title: "Abnormal AI: Sandboxed Agentic Email Threat Detection at Billion-Message Scale - ZenML LLMOps Database"
  description: "Abnormal AI uses inline LLM-powered agents and Amazon Bedrock AgentCore Code Interpreter to investigate the hardest email threats that simpler rules and machine-learning models cannot confidently classify. The agents receive threat-intelligence data, write and execute analysis code in ephemeral isolated MicroVM sandboxes, and use computational checks to support real-time decisions. Abnormal AI reports processing billions of messages through a tiered pipeline, routing tens of thousands of difficult cases to agents, while a separate batch analyst agent uses misclassification data to propose improved heuristics and models. The AWS account presents this as a production-scale architecture, but the article does not provide independently validated detection-quality, latency, cost, or false-positive metrics."
  canonical: "https://www.zenml.io/llmops-database/sandboxed-agentic-email-threat-detection-at-billion-message-scale"
  ogTitle: "Abnormal AI: Sandboxed Agentic Email Threat Detection at Billion-Message Scale - ZenML LLMOps Database"
  ogDescription: "Abnormal AI uses inline LLM-powered agents and Amazon Bedrock AgentCore Code Interpreter to investigate the hardest email threats that simpler rules and machine-learning models cannot confidently classify. The agents receive threat-intelligence data, write and execute analysis code in ephemeral isolated MicroVM sandboxes, and use computational checks to support real-time decisions. Abnormal AI reports processing billions of messages through a tiered pipeline, routing tens of thousands of difficult cases to agents, while a separate batch analyst agent uses misclassification data to propose improved heuristics and models. The AWS account presents this as a production-scale architecture, but the article does not provide independently validated detection-quality, latency, cost, or false-positive metrics."
notion:
  pageId: "3e9f8dff-2538-80d0-bf4b-ff2dac10a7bc"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:14:00.000Z"
  lastEditedTime: "2026-09-28T08:14:00.000Z"
  publishedAt: "2026-09-28T08:25:36Z"
---

## Overview

Abnormal AI operates a behavioral email-security service and applies agentic AI to the most difficult messages in its threat-detection workflow. Rather than sending every message to an LLM, it uses a three-tier pipeline: lightweight rules and classifiers handle the highest volume, deeper machine-learning models analyze uncertain cases, and inline agents investigate the comparatively small set of cases that would normally require human analyst attention. For those agents, Amazon Bedrock AgentCore Code Interpreter provides an ephemeral execution environment in which they can write scripts, process threat-intelligence data, calculate statistics, and verify conclusions.

The central LLMOps pattern is to give an agent a computational scratch pad while retaining deterministic or programmatic checks around its output. Abnormal AI states that the system processes billions of email messages and executes agent-driven code at a comparable scale, with tens of thousands of messages reaching the agent tier. It also runs an analyst agent in batch mode, approximately 100 jobs per week, to examine misclassifications and tuning signals and to draft candidate improvements for earlier pipeline tiers. These scale and production claims come from an AWS customer-success article and are not accompanied by independent benchmarks, detailed service-level objectives, or measured quality and cost results.

## Problem and use case

Email threat detection combines high-volume classification with a long tail of ambiguous, adversarial, and context-dependent cases. Basic counting, aggregation, feature analysis, and visualization are not tasks for which an LLM’s language-generation capability is sufficient. For example, determining how many phishing messages were detected in an interval requires reliable computation rather than a plausible textual answer. Investigating a difficult message may also require joining signals, transforming data, testing hypotheses, and checking whether an apparent behavioral pattern is meaningful.

Abnormal AI’s design treats the LLM as an agentic reasoning component rather than the sole classifier. The agent receives threat intelligence and relevant detection data, decides what analysis is needed, dynamically writes code, runs that code in a sandbox, and incorporates the results into a threat determination. The article describes a separate system for handling misclassifications and improving the overall detection system, but it does not specify the LLM model families, prompts, context-window strategies, training data, or exact decision policy used by the agents.

## Production architecture

The real-time pipeline is organized as a cascading architecture in which progressively more expensive computation is reserved for progressively harder cases. Tier 1 uses heuristics, small models, and lightweight classifiers such as logistic regression to process billions of messages per day. Messages for which Tier 1 is uncertain move to Tier 2, where deeper machine-learning and behavioral-signal models process millions of cases. Tier 3 sends the hardest cases to inline agents with Code Interpreter; the source describes this volume as tens of thousands per day.

This routing strategy is an important operational control. It limits the latency and cost exposure of agentic processing and avoids using a large model where a simpler, less variable method is adequate. It also creates natural escalation boundaries: low-risk or obvious cases can be handled using conventional inference, while agents are applied where flexible investigation may provide additional value. The article does not state the routing thresholds, end-to-end latency, availability targets, per-message cost, or how often agent decisions override lower-tier classifications.

AgentCore Code Interpreter is exposed as an API rather than as a complete agent orchestration framework. An existing agent harness can provision a session, upload files, execute commands, and retrieve results. The described service supplies Python and Node.js runtimes with common data-processing, statistics, and visualization libraries. Sessions run in ephemeral MicroVM sandboxes, have configurable time-to-live from 15 minutes by default up to eight hours, and can accept up to 100 MB through the API or use Amazon S3 for larger data. Logs are sent to Amazon CloudWatch and AWS CloudTrail, providing infrastructure and activity records for operational monitoring and auditing.

## Batch feedback loop

In addition to inline decisions, Abnormal AI operates an analyst agent in batch mode. It ingests misclassifications and tuning signals from the production detection pipeline, searches across larger message sets for recurring patterns, and uses Code Interpreter sessions to analyze those patterns. The agent can draft candidate heuristics for Tier 1 and improvements to Tier 2 models. This creates a feedback loop from production errors into detection-system development.

The batch workflow is not necessarily confined to one continuous sandbox session. Some jobs run for more than 30 minutes, and longer operations can span a day by intermittently invoking Code Interpreter. The article describes a checkpointing pattern in which the agent uses the sandbox for computation, persists state to files, performs a long-running operation such as external model training, and later reopens or re-invokes the interpreter to process the result. This avoids treating the session lifetime as the lifetime of the entire workflow and provides a recovery point for intermediate artifacts.

From an LLMOps perspective, this is an example of separating orchestration state, computation, and model execution. The agent’s working files become durable handoff artifacts, while longer model-training or pipeline tasks remain outside the bounded interpreter session. The source does not describe artifact versioning, approval gates, rollback procedures, data-labeling workflows, or whether proposed heuristics and models are automatically promoted to production. Those controls would be important before allowing an autonomous analyst agent to change a live security system.

## Security and isolation

Abnormal AI selected a no-egress sandbox configuration. Threat-intelligence data is intentionally admitted for analysis, but the environment is designed not to access the external internet. The stated goals are reproducibility and data-exfiltration prevention: eliminating uncontrolled network inputs should make session behavior less dependent on outside services, while also limiting the paths through which malicious or compromised agent behavior could transmit sensitive data.

The sandbox is presented as one layer in a broader zero-trust design. Abnormal AI controls what data enters Code Interpreter and what write actions are permitted, and it places the managed sandbox on top of an existing network-isolated harness. The source also notes that the service operates under the existing AWS subprocessor relationship, which the company considers helpful for compliance management. These measures reduce exposure, but they are not a guarantee that an agent is safe. File contents, generated artifacts, dependencies, model outputs, and downstream integrations still require validation and access controls. The article specifically raises prompt injection and stochastic malicious behavior as risks that the no-egress design is intended to mitigate, but it does not provide a threat model, penetration-test results, or measured containment guarantees.

## Verification, observability, and operational practice

The article recommends programmatic verifiers as guardrails for agent workflows. Unit tests, integration tests, and linting can be run in the sandbox so an agent can test generated code and outputs before returning them. This is particularly relevant in security operations, where an agent’s confident assertion is weaker evidence than a reproducible computation or a passing check. The architecture therefore combines probabilistic reasoning with executable validation rather than asking the LLM to perform arithmetic or claim that code would work.

CloudWatch and CloudTrail provide the managed service’s stated logging and audit integration. In a complete production evaluation system, those records could support analysis of session failures, execution duration, tool calls, data-access events, and anomalous behavior. However, the case study does not explain how Abnormal AI evaluates detection precision, recall, false positives, analyst agreement, agent failure rates, or regression performance over time. It also does not state whether every agent decision is retained with its prompt, retrieved data, code, outputs, and final disposition, which would be useful for forensic review and reproducibility.

Abnormal AI also describes an AI-native software-development practice in which 80 percent of code changes are built using an agent and 40 percent are reportedly built end-to-end by a background agent. That claim illustrates the company’s broader operating model, but it is separate from the email-detection architecture and is not evidence by itself that the security agents improve detection outcomes. The article does not provide a controlled comparison with a non-agent baseline.

## Results and tradeoffs

The reported result is an architecture capable of reserving agentic computation for difficult cases while conventional systems handle the majority of traffic. The company says this supports inline analysis across a billion-message-scale environment and batch analysis of production errors. The design also offers a practical way to give agents computational abilities without granting them unrestricted access to production systems or the public internet.

The main tradeoff is complexity. A multi-tier cascade requires calibration of confidence thresholds, routing logic, fallback behavior, and consistency between heuristic, machine-learning, and agent decisions. Sandboxed execution improves isolation but adds session management, file-transfer, runtime, and observability concerns. Dynamic code generation can increase analytical flexibility, yet it introduces risks from faulty code, resource exhaustion, data leakage through artifacts, and incorrect interpretation of computed results. No-egress operation improves containment and reproducibility, but it limits access to live external intelligence unless that information is explicitly ingested through a controlled path.

The case study therefore supports a reusable production pattern rather than a conclusive performance claim: use inexpensive deterministic or conventional models for broad screening, escalate uncertain cases to an LLM agent with a narrowly scoped execution environment, require programmatic verification where possible, and persist intermediate state for long-running workflows. Abnormal AI’s reported deployment demonstrates how that pattern can be integrated with managed cloud infrastructure, but readers should treat the scale, security, and business-value claims as vendor- and customer-reported until supported by detailed evaluation data.
