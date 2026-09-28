---
title: "Securing Multi-Tenant AI-Generated Code Execution"
slug: "securing-multi-tenant-ai-generated-code-execution"
draft: false
llmopsTags:
  - "code-interpretation"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "poc"
  - "structured-output"
  - "agent-based"
  - "error-handling"
  - "security"
  - "compliance"
  - "reliability"
  - "scalability"
  - "orchestration"
  - "amazon-aws"
industryTags: "healthcare"
company: "Benchling"
summary: "Benchling runs AI agent-generated scientific code for life sciences customers and needed to prevent cross-tenant access and data exfiltration at scale without creating an IAM role for every tenant or exposing its production account. It deployed Amazon Bedrock AgentCore Code Interpreter in a separate AWS account and locked it into a VPC with no internet or NAT gateway, Route 53 Resolver DNS Firewall, restricted VPC endpoints, network controls, and per-job AWS STS credentials. Benchling reports that the architecture now supports more than 600 execution sessions per day across more than 250 tenants per week, with zero reported security incidents or cross-tenant data leakage since deployment; however, these results are vendor-reported and do not establish that every possible attack path is eliminated."
link: "https://aws.amazon.com/blogs/machine-learning/how-benchling-secured-multi-tenant-ai-agents-with-amazon-bedrock-agentcore/"
year: 2026
seo:
  title: "Benchling: Securing Multi-Tenant AI-Generated Code Execution - ZenML LLMOps Database"
  description: "Benchling runs AI agent-generated scientific code for life sciences customers and needed to prevent cross-tenant access and data exfiltration at scale without creating an IAM role for every tenant or exposing its production account. It deployed Amazon Bedrock AgentCore Code Interpreter in a separate AWS account and locked it into a VPC with no internet or NAT gateway, Route 53 Resolver DNS Firewall, restricted VPC endpoints, network controls, and per-job AWS STS credentials. Benchling reports that the architecture now supports more than 600 execution sessions per day across more than 250 tenants per week, with zero reported security incidents or cross-tenant data leakage since deployment; however, these results are vendor-reported and do not establish that every possible attack path is eliminated."
  canonical: "https://www.zenml.io/llmops-database/securing-multi-tenant-ai-generated-code-execution"
  ogTitle: "Benchling: Securing Multi-Tenant AI-Generated Code Execution - ZenML LLMOps Database"
  ogDescription: "Benchling runs AI agent-generated scientific code for life sciences customers and needed to prevent cross-tenant access and data exfiltration at scale without creating an IAM role for every tenant or exposing its production account. It deployed Amazon Bedrock AgentCore Code Interpreter in a separate AWS account and locked it into a VPC with no internet or NAT gateway, Route 53 Resolver DNS Firewall, restricted VPC endpoints, network controls, and per-job AWS STS credentials. Benchling reports that the architecture now supports more than 600 execution sessions per day across more than 250 tenants per week, with zero reported security incidents or cross-tenant data leakage since deployment; however, these results are vendor-reported and do not establish that every possible attack path is eliminated."
notion:
  pageId: "3e9f8dff-2538-80a1-bd18-f3a9d78ea965"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:21:00.000Z"
  lastEditedTime: "2026-09-28T08:21:00.000Z"
  publishedAt: "2026-09-28T08:23:27Z"
---

## Overview

Benchling provides an AI platform for biotech research and development, where agents and models operate within scientific workflows and may generate code for researchers. The production use case described here is not simply text generation: AI-generated scientific code is executed in a multi-tenant environment to perform calculations, analyze data, and support research workflows. Because that code may be incorrect, compromised, or intentionally malicious, Benchling treats it as untrusted workload code rather than assuming that an AI agent will behave safely.

The central operational problem was to provide ephemeral code execution while ensuring that one life sciences tenant could access only the data needed for its own job. Benchling also needed to prevent network-based exfiltration, including DNS tunneling, and to avoid exposing its main production account to the execution environment. Its solution uses Amazon Bedrock AgentCore Code Interpreter in VPC mode inside a separate AWS account, combined with a locked-down VPC, Route 53 Resolver DNS Firewall, S3 VPC endpoint policies, network ACLs, security groups, and temporary per-job credentials issued through AWS STS. Benchling reports more than 600 sessions per day across more than 250 tenants per week and zero reported security incidents or cross-tenant data leakage since deployment in early April 2026.

## Production Problem and Threat Model

Benchling’s AI application generates scientific code on behalf of researchers across thousands of tenants. The execution service must support agent-generated code, as well as simpler calculations and code-generation sandbox tasks, without allowing arbitrary code to inspect other customers’ data. The requirements include ephemeral sessions, per-job isolation, no persistent state between jobs, and access only to the tenant data specifically required by the dispatched task.

The threat model assumes that agent- or user-written code can be unintended or compromised. Traditional controls that restrict HTTP traffic, outbound ports, or direct internet access may still leave DNS resolution available. A malicious program could attempt to encode stolen information into DNS queries and use recursive resolution as an exfiltration channel. Other relevant attack paths include direct connections to unauthorized IP addresses, calls to S3 buckets belonging to other tenants, abuse of overly broad IAM permissions, and attempts to move from the execution environment into production systems.

A per-tenant IAM-role design was rejected as operationally unsuitable because thousands of tenants would create substantial role sprawl. Granting a shared execution role broad access to every tenant bucket was also considered unsafe: a compromised session could potentially use those permissions to access data unrelated to its job. The design therefore needed both dynamic authorization and independent network-level restrictions.

## Architecture and Isolation

Benchling separates the execution environment from its primary production environment by using a dedicated untrusted-code AWS account. The production account contains the Benchling application stack, IAM roles, AWS STS, and customer data in Amazon S3. Tasks are dispatched to the separate account, which contains the AgentCore Code Interpreter environment in an isolated VPC. This account boundary reduces the blast radius if code execution is compromised and avoids placing untrusted execution directly alongside the main production data and roles.

The execution VPC has no internet gateway and no NAT gateway. Code Interpreter runs in a dedicated security group with tightly restricted traffic, while network ACLs and prefix-list routing limit communication to the approved VPC endpoints. The described deployment uses an S3 Gateway VPC endpoint for in-region access and an S3 Interface VPC endpoint for cross-region access. Endpoint policies identify the S3 buckets that can be reached. Requests directed at buckets outside those policies are rejected at the network layer before reaching S3.

AgentCore provides managed, short-lived execution sessions and handles the lifecycle of the Code Interpreter environment. This allows Benchling to use a managed execution capability rather than building its own orchestration, session cleanup, patching, and sandbox maintenance system. Benchling also has an existing container-based execution environment using gVisor for per-job isolation; the post explicitly distinguishes that pre-existing layer from the AgentCore architecture rather than presenting gVisor as a required component of the AgentCore pattern.

## DNS and Network Egress Controls

The DNS design follows a denylist, allowlist, and default-deny sequence in Route 53 Resolver DNS Firewall. A highest-priority rule blocks known malicious or unintended domains and provides logging for queries that match the explicit denylist. A second rule allows only explicitly approved domains, generally the S3 endpoints needed for the execution job. A final catch-all rule returns NODATA for every other query.

This final rule is important because absence from an allowlist is not enough unless the resolver actually denies all unmatched queries. Under the described configuration, an encoded subdomain created for DNS tunneling does not resolve unless its domain is explicitly permitted. The architecture therefore removes the normal recursive DNS path for unapproved destinations. The source describes this as closing the DNS exfiltration vector tested by Benchling, but the result should be understood as dependent on correct configuration, AWS behavior, logging, and ongoing validation rather than as a universal guarantee against all covert channels.

Network controls provide additional defense in depth. There is no general outbound route to the public internet, and traffic is constrained to the permitted endpoint paths and required ports. The security group has no default fallback rules, while network ACLs and prefix lists further restrict traffic. These controls are intended to ensure that even if code attempts a direct connection rather than DNS resolution, it cannot reach arbitrary external hosts.

## Per-Job Data Authorization

Benchling uses AWS STS to create and inject temporary credentials into each Code Interpreter session at dispatch time. The production account determines which data the job should access and supplies credentials scoped to that execution context. A session policy restricts S3 access to the tenant-specific path prefix within the authorized bucket. This avoids maintaining a static IAM role for every tenant while ensuring that the session receives only the permissions required for its individual job.

The endpoint policy and the temporary credentials serve different purposes. IAM and STS credentials express what the session is authorized to request, while the VPC endpoint policy limits what the network can deliver. This separation is valuable because a credential mistake or partial credential compromise does not automatically create a route to every S3 bucket. The source specifically presents endpoint restrictions as an independent defense: even valid credentials for an unauthorized bucket should be blocked by the endpoint policy. The effectiveness of that guarantee still depends on precise bucket policies, endpoint-policy maintenance, credential handling, and preventing alternative data paths.

## Validation and LLMOps Controls

Benchling first evaluated the architecture in a proof-of-concept VPC and tested individual layers against representative exfiltration attempts. DNS tunneling simulations checked that unapproved domains returned NODATA. Direct IP connection attempts checked that routing, network ACLs, and port restrictions prevented arbitrary external access. S3 access tests checked that endpoint policies rejected requests to buckets outside the approved scope. The absence of internet and NAT gateways was also part of the validation of the restricted-egress design.

The Infrastructure and Product Security teams then incorporated these checks into continuous integration. The tests simulate DNS tunneling, unauthorized endpoint access, and attempts to reach S3 buckets outside the permitted endpoint-policy scope. If a test finds that an unapproved domain resolves, an external endpoint is reachable, or data can move outside the approved buckets, the pipeline fails and blocks the release.

This is a significant LLMOps characteristic of the implementation. The system operationalizes an AI agent capability in production, but treats the generated code as an untrusted artifact whose execution environment must be continuously verified. Security properties are tested as infrastructure behaviors rather than reviewed only during initial deployment. This matters because VPC settings, endpoint inventories, IAM policies, and service integrations can change as the product evolves. Continuous adversarial integration tests can detect regressions introduced by those changes before they are released, although the described tests cover the vectors Benchling selected and should not be interpreted as exhaustive security assurance.

## Results and Tradeoffs

Benchling says that AgentCore Code Interpreter in VPC mode was deployed in early April 2026 and now processes more than 600 code execution sessions per day for more than 250 distinct tenants per week. It reports zero security incidents and zero cross-tenant data leakage since deployment. These are meaningful scale and operational outcomes for a multi-tenant scientific application, but they are self-reported case-study results rather than independently audited measurements. The text does not provide latency, cost, failure-rate, false-positive, or maintenance data, nor does it quantify the number of blocked attack attempts.

The principal benefit is the combination of managed ephemeral execution with customer-controlled network security. Benchling avoids building and continuously patching a custom sandbox service while retaining control over account boundaries, DNS policy, endpoint reachability, and per-job access. Defense in depth means that failure of one control does not necessarily expose all tenant data: account separation limits the blast radius, STS limits authorization, endpoint policies constrain service reachability, and DNS and routing controls reduce outbound channels.

The tradeoff is architectural complexity and ongoing policy management. Every permitted endpoint and bucket becomes a security-sensitive configuration item. Overly restrictive policies can break legitimate scientific workloads, while overly broad allowlists increase exfiltration risk. DNS Firewall, endpoint policies, IAM session policies, security groups, ACLs, routing, and CI tests must remain consistent as new features and services are introduced. The approach also remains dependent on the security properties and availability of AWS AgentCore, VPC, DNS Firewall, STS, and S3. Overall, the case demonstrates a practical production pattern for executing LLM- or agent-generated code in a regulated, multi-tenant setting, with the strongest evidence supporting layered isolation and continuous validation rather than the broader claim that all possible exfiltration paths have been eliminated.
