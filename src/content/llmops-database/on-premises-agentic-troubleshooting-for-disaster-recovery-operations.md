---
title: "On-Premises Agentic Troubleshooting for Disaster Recovery Operations"
slug: "on-premises-agentic-troubleshooting-for-disaster-recovery-operations"
draft: false
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "chatbot"
  - "summarization"
  - "realtime-application"
  - "high-stakes-application"
  - "structured-output"
  - "unstructured-data"
  - "rag"
  - "semantic-search"
  - "multi-agent-systems"
  - "agent-based"
  - "mcp"
  - "evals"
  - "system-prompts"
  - "token-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "monitoring"
  - "databases"
  - "serverless"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
industryTags: "tech"
company: "HPE Zerto"
summary: "HPE Zerto built an agentic troubleshooting assistant embedded in its on-premises disaster recovery management product to help operators investigate alerts, configuration problems, replication failures, SLA risks, and recovery readiness issues without manually assembling context from multiple dashboards and knowledge sources. The system uses locally hosted Strands Agents orchestration, a Model Context Protocol (MCP) server for structured access to live Zerto Manager data, Amazon Bedrock for foundation-model inference, Bedrock Knowledge Bases for documentation retrieval, and Bedrock Guardrails, CloudWatch, DynamoDB, and Lambda for governance, observability, and tenant limits. HPE Zerto reports that more than 20 percent of customers adopted the capability after its Q2 2026 release and that supported workflows saw a 10 percent reduction in support cases, although the source does not provide independent validation, detailed evaluation scores, or comparisons with preexisting troubleshooting processes."
link: "https://aws.amazon.com/blogs/machine-learning/how-hpe-zerto-built-an-agentic-troubleshooting-system-with-amazon-bedrock/"
year: 2026
seo:
  title: "HPE Zerto: On-Premises Agentic Troubleshooting for Disaster Recovery Operations - ZenML LLMOps Database"
  description: "HPE Zerto built an agentic troubleshooting assistant embedded in its on-premises disaster recovery management product to help operators investigate alerts, configuration problems, replication failures, SLA risks, and recovery readiness issues without manually assembling context from multiple dashboards and knowledge sources. The system uses locally hosted Strands Agents orchestration, a Model Context Protocol (MCP) server for structured access to live Zerto Manager data, Amazon Bedrock for foundation-model inference, Bedrock Knowledge Bases for documentation retrieval, and Bedrock Guardrails, CloudWatch, DynamoDB, and Lambda for governance, observability, and tenant limits. HPE Zerto reports that more than 20 percent of customers adopted the capability after its Q2 2026 release and that supported workflows saw a 10 percent reduction in support cases, although the source does not provide independent validation, detailed evaluation scores, or comparisons with preexisting troubleshooting processes."
  canonical: "https://www.zenml.io/llmops-database/on-premises-agentic-troubleshooting-for-disaster-recovery-operations"
  ogTitle: "HPE Zerto: On-Premises Agentic Troubleshooting for Disaster Recovery Operations - ZenML LLMOps Database"
  ogDescription: "HPE Zerto built an agentic troubleshooting assistant embedded in its on-premises disaster recovery management product to help operators investigate alerts, configuration problems, replication failures, SLA risks, and recovery readiness issues without manually assembling context from multiple dashboards and knowledge sources. The system uses locally hosted Strands Agents orchestration, a Model Context Protocol (MCP) server for structured access to live Zerto Manager data, Amazon Bedrock for foundation-model inference, Bedrock Knowledge Bases for documentation retrieval, and Bedrock Guardrails, CloudWatch, DynamoDB, and Lambda for governance, observability, and tenant limits. HPE Zerto reports that more than 20 percent of customers adopted the capability after its Q2 2026 release and that supported workflows saw a 10 percent reduction in support cases, although the source does not provide independent validation, detailed evaluation scores, or comparisons with preexisting troubleshooting processes."
notion:
  pageId: "3e9f8dff-2538-80fb-b081-e955d697f3ce"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:15:00.000Z"
  lastEditedTime: "2026-09-28T08:15:00.000Z"
  publishedAt: "2026-09-28T08:25:12Z"
---

## Overview

HPE Zerto, a provider of cyber-resilience, disaster-recovery, and continuous-data-protection software, developed an agentic troubleshooting system for operators managing complex hybrid and multi-cloud environments. The operational problem is that protection health, alerts, events, logs, documentation, service-level information, and recovery context are distributed across different interfaces and sources. During routine administration this fragmentation creates investigation overhead; during an outage or cyber event it can delay decisions when teams need trusted guidance quickly.

The resulting system is an AI assistant embedded in the existing Zerto management interface and deployed as a pod inside the customer’s on-premises Zerto environment. Users interact with it in natural language to obtain summaries, investigate active issues, understand likely causes, and receive guidance about mitigation or configuration. HPE Zerto reports that the system was released in Q2 2026, has been adopted by more than 20 percent of its customers, and is associated with a 10 percent reduction in support cases for workflows it supports. These are vendor-reported production outcomes: the source does not describe the measurement population, baseline period, statistical methodology, severity mix, or whether the results have been independently assessed.

## Problem and Use Case

Disaster-recovery administrators need to monitor protection groups, validate SLA compliance, interpret alerts, investigate service and replication failures, and assess recovery readiness across many sites and protected workloads. The required evidence may include current product state, recent alerts, component logs, environmental information, runbooks, and product documentation. Previously, an operator could need to move among dashboards, reports, APIs, and knowledge repositories before deciding what to do.

The assistant is intended to support three broad classes of work. It acts as a support assistant for configuration questions and troubleshooting, helps identify system-health problems and possible mitigations, and can perform tasks intended to accelerate setup and feature adoption. The system is also used internally by HPE Zerto engineering and QA teams for investigating issues found during development and testing. The text presents these capabilities as assistance and guided self-service rather than as an autonomous replacement for operators or support personnel; it does not establish that the system can safely execute every proposed remediation without human review.

## Production Architecture

The user interface is integrated into the existing Zerto console rather than exposed as a separate general-purpose chatbot. Server-Sent Events stream investigation progress to the interface, allowing users to see activity while a request is being processed. This is a practical production consideration for long-running, tool-using investigations: visible progress can reduce the perception that the system has stalled and may improve user trust, although the source provides no quantitative UX measurement.

The agent runtime uses the Strands Agents framework and runs as a pod within the Zerto product on premises. It maintains locally stored session history and uses an internal MCP server that exposes Zerto Manager (ZVM) APIs. MCP provides the agents with a structured and typed interface to live operational data instead of requiring the model to infer state from unstructured text alone. This design is particularly important for questions about current protection status, alerts, configuration, and environmental conditions, where stale or incomplete context could lead to unsafe conclusions.

For external knowledge, the system uses Amazon Bedrock Knowledge Bases to retrieve relevant public documentation, runbooks, and other operational knowledge through semantic search. This is a retrieval-augmented generation pattern: live state comes through local product APIs, while general product knowledge is retrieved from a managed knowledge repository. The source does not specify the document-ingestion schedule, chunking strategy, embedding model, retrieval thresholds, citation behavior, or procedures for handling outdated documentation. Those details would be important for independently evaluating grounding quality.

Model inference is sent to Amazon Bedrock, which provides access to selected foundation models. HPE Zerto evaluated larger and stronger models during proof-of-concept work and later compared faster, smaller, and less expensive alternatives. It ultimately adopted a multi-model approach and continues to evaluate newer models. The stated selection criteria were quality, latency, and cost. This is a conventional LLMOps optimization: use more capable reasoning models for difficult work while avoiding unnecessary cost and delay for routine questions. The case study does not disclose the specific models, routing thresholds, per-request cost, latency distributions, or quality differences between model configurations.

## Multi-Agent Design

An Orchestrator agent provides the primary control point. It can answer routine questions directly or delegate deeper, log-heavy work to specialized sub-agents. The described specialists include a ZVM agent for service crashes, networking issues, and upgrade failures, and a VRA agent for replication problems, delays, and networking between sites and installations. Each sub-agent has a separate context, its own system prompt, domain-specific skills, and a bounded tool set. Specialized agents can inspect relevant logs, apply structured log-pattern knowledge, and obtain environmental data through MCP before returning a compact report to the orchestrator.

The hub-and-spoke topology keeps delegation flowing through the orchestrator rather than allowing sub-agents to call one another directly. This gives the system a single control point for safety rules and final-answer handling, makes telemetry easier to trace, and reduces the risk of recursive delegation consuming excessive tokens or running indefinitely. Fresh sub-agent contexts also prevent raw logs and intermediate investigation work from unnecessarily inflating the parent context. The orchestrator is described as stripping secrets or raw logs from the final response, but the source does not explain the secret-detection mechanism, redaction coverage, or what happens when an agent identifies an issue outside its assigned domain.

## Security, Governance, and Operations

The architecture is designed around the requirement that sensitive disaster-recovery information remain in the customer environment as much as possible. The Strands Agents runtime, session history, and local MCP access operate on premises. Only model-inference requests and knowledge-base queries are sent to AWS over HTTPS. This separation can support air-gapped, latency-sensitive, or data-residency-constrained deployments, but it also creates operational dependencies on network availability, model-service connectivity, and the organization’s policies for sending selected prompts and retrieved context outside the local environment. The text does not specify whether fully disconnected operation is supported.

Amazon Bedrock Guardrails are applied before and after inference to enforce content boundaries, align prompts and outputs with company policy, and keep responses focused on operational topics. The design also uses per-tenant request tagging through IAM role tags. CloudWatch, DynamoDB, and Lambda are combined to enforce tenant quotas and limits, helping control usage and cost. CloudWatch receives telemetry about agent performance, errors, and usage patterns. Together, these components provide a foundation for production governance, but the case study does not report guardrail block rates, false positives, quota policies, audit-retention settings, or detailed incident-response procedures.

A significant architectural tradeoff is that local orchestration improves control over operational data while remote inference preserves access to managed foundation models. This avoids requiring a complete locally hosted LLM stack, but it may add network latency and introduces a boundary that must be reviewed for data leakage, residency, and availability risks. The deployment model therefore depends not only on model quality but also on careful prompt construction, access control, transport security, logging policy, and tenant isolation.

## Evaluation and LLMOps Practices

HPE Zerto created an ongoing evaluation process using PyTest and the Strands Agents Evals SDK. Evaluation jobs run a full suite as the system changes, allowing the team to look for regressions and improvements in agent behavior. The reported test categories cover different operational dimensions rather than only final answer quality.

- Basic query evaluations test a single user query and the resulting response.
- Multi-turn evaluations exercise a complete conversation, with an LLM-based user simulator generating follow-up interaction through Strands Agents ActorSimulators.
- Dynamic evaluations use the Strands Agents Experiment Generator to create test suites for uncovered or changing use cases.
- Response evaluators assess answers against predefined criteria and produce structured output.
- Trajectory evaluators assess whether the agent selected appropriate tools and followed expected investigation paths.
- Latency evaluators check whether response time remains within defined thresholds.
- Token evaluators check that token usage remains within specified boundaries.

This combination is valuable because agent quality is not limited to wording. Tool selection, delegation behavior, latency, and context size directly affect safety, cost, and usability in production. Dynamic test generation can expand coverage beyond a fixed regression set, while multi-turn simulation can expose failures that do not appear in isolated prompts. At the same time, the source does not state the size or representativeness of the test corpus, the evaluator agreement or calibration process, the proportion of tests based on real incidents, or the release gates used before deploying a model or prompt change. LLM-based evaluators and simulators can themselves introduce variability, so reproducibility and human review remain relevant concerns.

## Results and Tradeoffs

HPE Zerto reports that over 20 percent of customers were actively using the system after its Q2 2026 release, and that production usage reduced support cases by 10 percent for supported workflows. The reported benefits also include faster information gathering, quicker root-cause investigation, earlier identification of SLA and protection risks, and more rapid operational summaries. Internal engineering and QA teams reportedly use the system to investigate common issues and testing problems. These outcomes suggest meaningful adoption and potential support-efficiency gains, but they should be interpreted as case-study claims rather than a complete impact evaluation. No absolute support-case volume, time-to-resolution measure, accuracy rate, escalation rate, remediation-safety metric, or customer satisfaction result is provided.

The principal strengths are the grounding strategy, the separation between local operational data and managed model services, specialized agent boundaries, continuous evaluation, and production controls for observability and quotas. The main costs and risks are architectural complexity, dependence on multiple AWS services, model and retrieval variability, possible inference latency, and the need to govern what operational data is transmitted for inference. Multi-agent decomposition can improve focus and debugging, but it also introduces more prompts, tool calls, routing decisions, and failure modes than a single-agent design. The reported system addresses these issues with bounded contexts, centralized orchestration, streaming feedback, and explicit evaluation of responses and trajectories.

Overall, this is a concrete production LLMOps example in which generative AI is embedded into an established disaster-recovery workflow rather than deployed as an unconstrained chatbot. Its strongest evidence concerns the architecture and engineering practices used to operationalize the system. Its business claims are promising but limited by the absence of detailed experimental methodology and independently verifiable performance data.
