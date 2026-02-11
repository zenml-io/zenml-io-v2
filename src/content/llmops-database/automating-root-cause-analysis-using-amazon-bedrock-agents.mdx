---
title: "Automating Root Cause Analysis Using Amazon Bedrock Agents"
slug: "automating-root-cause-analysis-using-amazon-bedrock-agents"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67cd5240fcc6403abab026dc"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:02:51.531Z"
  createdOn: "2025-03-09T08:33:04.069Z"
llmopsTags:
  - "high-stakes-application"
  - "realtime-application"
  - "agent-based"
  - "error-handling"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "monitoring"
  - "cicd"
  - "reliability"
  - "fastapi"
  - "postgresql"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "automotive"
company: "BMW"
summary: "BMW implemented a generative AI solution using Amazon Bedrock Agents to automate and accelerate root cause analysis (RCA) for cloud incidents in their connected vehicle services. The solution combines architecture analysis, log inspection, metrics monitoring, and infrastructure evaluation tools with a ReAct (Reasoning and Action) framework to identify service disruptions. The automated RCA agent achieved 85% accuracy in identifying root causes, significantly reducing diagnosis times and enabling less experienced engineers to effectively troubleshoot complex issues."
link: "https://aws.amazon.com/blogs/machine-learning/innovating-at-speed-bmws-generative-ai-solution-for-cloud-incident-analysis?tag=soumet-20"
year: 2025
seo:
  title: "BMW: Automating Root Cause Analysis Using Amazon Bedrock Agents - ZenML LLMOps Database"
  description: "BMW implemented a generative AI solution using Amazon Bedrock Agents to automate and accelerate root cause analysis (RCA) for cloud incidents in their connected vehicle services. The solution combines architecture analysis, log inspection, metrics monitoring, and infrastructure evaluation tools with a ReAct (Reasoning and Action) framework to identify service disruptions. The automated RCA agent achieved 85% accuracy in identifying root causes, significantly reducing diagnosis times and enabling less experienced engineers to effectively troubleshoot complex issues."
  canonical: "https://www.zenml.io/llmops-database/automating-root-cause-analysis-using-amazon-bedrock-agents"
  ogTitle: "BMW: Automating Root Cause Analysis Using Amazon Bedrock Agents - ZenML LLMOps Database"
  ogDescription: "BMW implemented a generative AI solution using Amazon Bedrock Agents to automate and accelerate root cause analysis (RCA) for cloud incidents in their connected vehicle services. The solution combines architecture analysis, log inspection, metrics monitoring, and infrastructure evaluation tools with a ReAct (Reasoning and Action) framework to identify service disruptions. The automated RCA agent achieved 85% accuracy in identifying root causes, significantly reducing diagnosis times and enabling less experienced engineers to effectively troubleshoot complex issues."
---

# BMW's Generative AI Solution for Cloud Incident Analysis

## Overview

BMW Group, the Munich-based premium automobile manufacturer with over 154,000 employees and a connected fleet of more than 23 million vehicles worldwide, developed a generative AI-powered solution for automating root cause analysis (RCA) of cloud service incidents. The solution was built in collaboration with AWS and centers on Amazon Bedrock Agents to streamline the traditionally cumbersome process of diagnosing partial or full service outages affecting BMW's digital connected vehicle services.

BMW Connected Company, a division within BMW, operates digital services that millions of vehicle owners use daily—from remotely locking/unlocking doors via mobile apps, to starting window defrost, purchasing navigation map updates, and streaming music. These services are implemented by chaining multiple software components together, often built and operated by different geographically dispersed teams across various AWS regions and other cloud environments. When service disruptions occur, determining the root cause becomes a complex investigation requiring engineers to check multiple systems, form hypotheses, trace component dependencies, and often backtrack when initial theories prove incorrect.

## The LLMOps Production Architecture

The production system uses an Amazon Bedrock agent that operates using the ReAct (Reasoning and Action) framework, which dynamically combines logical reasoning with task execution. Unlike traditional predefined workflow systems, the ReAct agent uses real-time inputs and iterative decision-making to adapt to specific incident circumstances.

### Agent Workflow in Production

When an incident occurs, an on-call engineer provides a textual description of the issue to the Amazon Bedrock agent. The agent then initiates its investigation using a structured but adaptive workflow:

The agent first interprets the incident description to identify which parts of the system are most likely impacted. It then gathers evidence by calling specialized tools, leveraging data centrally aggregated in a cross-account observability setup. The agent continuously reevaluates results from each tool invocation, progressively narrowing down potential causes until it isolates the root cause. The agent can identify issues ranging from expired certificates and revoked firewall rules to traffic spikes and misconfigured components.

### Custom Tools Implementation

The Amazon Bedrock agent's effectiveness relies on its integration with four specialized tools, each implemented as AWS Lambda functions:

**Architecture Tool**: This tool uses C4 diagrams enhanced through Structurizr to provide a hierarchical understanding of component relationships, dependencies, and workflows. When an issue affects a specific service, the Architecture Tool identifies upstream and downstream dependencies and suggests hypotheses focused on those systems. This contextual architectural reasoning prevents blind searching through logs and metrics, instead enabling targeted investigation based on how different systems interact.

**Logs Tool**: Leveraging CloudWatch Logs Insights, this tool analyzes log data in real time by searching for patterns, errors, and anomalies while comparing trends to previous periods. For example, it can identify spikes in error messages like "FATAL: password authentication failed" compared to the previous hour, allowing the agent to quickly associate failures with potential root causes such as improperly rotated database passwords.

**Metrics Tool**: This tool provides real-time insights into system health by monitoring key metrics through CloudWatch, including latency, error rates, resource utilization, and usage patterns. It identifies statistical anomalies by surfacing CloudWatch metric alarms, enabling the agent to prioritize hypotheses related to resource mismanagement, misconfigured thresholds, or unexpected system load.

**Infrastructure Tool**: Using CloudTrail data, this tool analyzes critical control-plane events such as configuration changes, security group updates, and API calls. It is particularly effective at identifying misconfigurations or breaking changes that trigger cascading failures, such as inadvertently removed security group ingress rules causing service connectivity issues.

### The ReAct Framework Benefits in Production

The ReAct framework provides several operational advantages for BMW's production environment. The agent tailors its approach dynamically to each specific incident rather than following a one-size-fits-all methodology, which is critical for BMW's multi-regional, multi-service architecture. The framework reasons about which tools to invoke and when, minimizing redundant queries and providing faster diagnostics without overloading AWS services like CloudWatch or CloudTrail. The agent mimics the logical thought process of a seasoned engineer, iteratively exploring hypotheses until it identifies the root cause, effectively bridging automation and human expertise.

## Real-World Production Example

The case study describes a realistic scenario where a security group was deliberately changed in a test environment, blocking requests from the fleet and preventing remote vehicle lock/unlock functionality. When engineers received a report that remote lock/unlock wasn't working via the iOS app, the agent was engaged with the problem description: "Users of the iOS app cannot unlock car doors remotely."

The agent's investigation proceeded through several phases. First, it called the Architecture Tool to understand the overall system architecture, revealing that the iOS app connects to a backend-for-frontend API, which connects to internal APIs including the Remote Vehicle Management API responsible for sending commands to cars via MQTT messaging. The agent then used its other tools in a targeted manner, scanning logs, metrics, and control plane activities only for components involved in the remote unlock flow.

The investigation uncovered multiple clues: anomalous logs indicating network timeouts, a sharp decrease in successful invocations of the Remote Vehicle Management API, and control plane activities showing security group changes in the central networking account. Based on these findings, the agent formulated hypotheses ordered by likelihood, correctly identifying that a security group was inadvertently changed in the central networking account, blocking network traffic between the backend-for-frontend and the Remote Vehicle Management API. The agent correlated logs, metrics, and control plane changes to reach this conclusion.

## Performance and Results

BMW reports that the fully automated RCA agent correctly identifies the right root cause in 85% of test cases. In the remaining cases, the agent provides detailed insights that significantly expedite engineers' investigations. The solution reduced diagnosis time from hours to minutes for validated test cases.

It is worth noting that these performance metrics appear to come from the proof of concept phase and representative use cases rather than extensive production deployment data. While the results are promising, real-world production performance may vary as the system encounters novel failure modes not represented in testing.

## Operational Benefits

Beyond raw accuracy, the solution provides several operational advantages. It helps engineers with system understanding and real-time insights even when it doesn't identify the exact root cause. The solution has lowered the barrier to entry for junior engineers, enabling less-experienced team members to diagnose issues effectively while maintaining reliability and scalability across BMW's operations. Engineers can ask follow-up questions or instruct the agent to investigate elsewhere, maintaining human oversight over the diagnostic process.

## Cross-Account Observability Architecture

A key enabling factor for the solution is BMW's cross-account observability setup, which centrally aggregates data from multiple AWS accounts and regions. This infrastructure allows the agent to access logs, metrics, and control plane events across BMW's distributed architecture without requiring manual log aggregation by engineers during incidents.

## Critical Assessment

While the solution demonstrates impressive capabilities, several considerations merit attention. The 85% accuracy figure comes from test cases rather than production incidents, and complex real-world failures may present scenarios the agent hasn't been trained to handle. The solution is deeply integrated with AWS services (CloudWatch, CloudTrail, Bedrock), which may limit applicability for organizations with multi-cloud or hybrid infrastructure. The case study is co-authored with AWS representatives and published on the AWS blog, suggesting some promotional intent that readers should consider when evaluating the claimed benefits.

The solution represents a practical application of agentic AI for IT operations, combining LLM reasoning capabilities with structured tool access to solve a genuine operational challenge at scale for a major automotive manufacturer's connected vehicle services.