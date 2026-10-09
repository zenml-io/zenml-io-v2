---
title: "Securing and Scaling Agent Connectors Across Legal Tools"
slug: "securing-and-scaling-agent-connectors-across-legal-tools"
draft: false
llmopsTags:
  - "document-processing"
  - "high-stakes-application"
  - "unstructured-data"
  - "mcp"
  - "agent-based"
  - "error-handling"
  - "security"
  - "guardrails"
  - "monitoring"
  - "reliability"
  - "scalability"
industryTags: "legal"
company: "Harvey"
summary: "Harvey built a production Connector Library that lets legal agents use services such as email, document-management systems, and transaction data rooms while preserving user permissions and controlling the risks of third-party tools. The platform combines a code-based connector registry, native and MCP adapters, pre-launch security review, an in-process Rego/Open Policy Agent policy engine, tool-schema fingerprinting, customer-level controls, credential-management safeguards, and vendor-specific authorization normalization. Harvey reports more than 110,000 user connections, tens of thousands of connector tool calls per week, and approximately 13 million credential reads per day, although the source does not provide independent validation, error rates, quality measurements, or detailed security outcomes."
link: "https://www.harvey.ai/blog/how-we-built-harvey-connector-library"
year: 2026
seo:
  title: "Harvey: Securing and Scaling Agent Connectors Across Legal Tools - ZenML LLMOps Database"
  description: "Harvey built a production Connector Library that lets legal agents use services such as email, document-management systems, and transaction data rooms while preserving user permissions and controlling the risks of third-party tools. The platform combines a code-based connector registry, native and MCP adapters, pre-launch security review, an in-process Rego/Open Policy Agent policy engine, tool-schema fingerprinting, customer-level controls, credential-management safeguards, and vendor-specific authorization normalization. Harvey reports more than 110,000 user connections, tens of thousands of connector tool calls per week, and approximately 13 million credential reads per day, although the source does not provide independent validation, error rates, quality measurements, or detailed security outcomes."
  canonical: "https://www.zenml.io/llmops-database/securing-and-scaling-agent-connectors-across-legal-tools"
  ogTitle: "Harvey: Securing and Scaling Agent Connectors Across Legal Tools - ZenML LLMOps Database"
  ogDescription: "Harvey built a production Connector Library that lets legal agents use services such as email, document-management systems, and transaction data rooms while preserving user permissions and controlling the risks of third-party tools. The platform combines a code-based connector registry, native and MCP adapters, pre-launch security review, an in-process Rego/Open Policy Agent policy engine, tool-schema fingerprinting, customer-level controls, credential-management safeguards, and vendor-specific authorization normalization. Harvey reports more than 110,000 user connections, tens of thousands of connector tool calls per week, and approximately 13 million credential reads per day, although the source does not provide independent validation, error rates, quality measurements, or detailed security outcomes."
notion:
  pageId: "3f4f8dff-2538-8013-b023-cea8a1334633"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:39:00.000Z"
  lastEditedTime: "2026-10-09T08:40:00.000Z"
  publishedAt: "2026-10-09T08:53:30Z"
---

## Overview

Harvey is deploying AI agents for legal teams that need to work with existing enterprise systems, including Outlook or Gmail, iManage, and transaction data rooms. The production problem is not simply exposing APIs to a language model: every agent tool call must respect the requesting user's permissions, remain within workspace policy, avoid unsafe or unreviewed capabilities, and accommodate inconsistent behavior across external providers. Harvey's Connector Library addresses this by making approved external services available to agents through a common platform while keeping vendor-specific implementation details in adapters.

The source describes a substantial operational deployment: Harvey reports more than 110,000 individual connections and tens of thousands of connector tool calls each week. It also reports roughly 13 million credential reads per day. These are company-provided scale indicators rather than independently audited results. The article gives considerable detail about security and integration controls, but it does not report model-quality evaluations, tool-call success rates, latency, false refusals, incident counts, or measured productivity improvements. The main case study is therefore an account of production LLMOps and agent-platform engineering, rather than a controlled assessment of legal-agent accuracy.

## Problem and Use Case

A legal practice commonly relies on multiple systems for communications, document storage, research, and transactions. Harvey wants agents to use those systems during multi-step runs instead of requiring users to manually move information between applications. A single agent request may involve several calls, making authorization a continuous property of the run rather than a one-time check at the beginning.

The operational risks are unusually significant for legal work. A tool could expose confidential client information, perform an unauthorized write, leak data across tenants, or be manipulated through prompt injection. Third-party MCP servers introduce additional supply-chain and change-management concerns because the external vendor operates the server and may alter its advertised tools or schemas. At the same time, external providers implement authorization and tool schemas differently, creating reliability problems such as valid tokens being rejected, unnecessary reauthorization prompts, or schemas that are accepted by a provider but rejected by the agent SDK or model API.

## Connector Architecture

A connector is represented as a vendor-level object in Harvey's catalog. It has a catalog tile, an administrative permission, and one or more members. A member can be a native integration written by Harvey or an MCP connector operated by the vendor. A code-based registry defines the connector, the capabilities of its members, its permission, and a routing note for the agent. The rest of the backend extends this registration, which is intended to make adding connectors more repeatable as the catalog expands.

When a user selects connectors and tools, the client sends that selection with the request. The backend resolves it into the appropriate native or MCP members and their configurations. Unknown connector types and unknown tool keys are rejected. Resolution occurs once per turn, and the resulting configuration travels with the run so that the same approved tool set is reused while the agent works. Harvey registers the selected tools with the model through its own adapters; the model can choose calls only from that selected set.

An allowed call is sent using the connection's credential. For sources containing personal data, the source system receives the asking user's own grant and applies its native access-control list. This is an important design choice: Harvey describes its platform as enforcing boundaries, but the source application's ACL remains a primary authority over what the user can retrieve. Results from native members are presented with inline citations, while MCP output enters the model context as plain text. The different result treatment suggests a provenance distinction, although the article does not provide a formal citation-accuracy evaluation or explain how users should validate plain-text MCP results.

## Security and Policy Controls

Security review begins before a connector reaches production. Harvey says its security team evaluates prompt injection, misuse of write capabilities, credential compromise, cross-tenant leakage, and supply-chain risk. Native integrations are reviewed according to the APIs called and scopes requested. MCP members receive an additional admission process because the server is run by an external vendor. The vendor must provide its tool list and capability scope, hosting and authentication details, data-processing regions, and test credentials. Tools are reviewed individually, and approved tools receive risk and capability annotations.

These decisions are stored in a registry shipped with the code. The registry includes a structured URL matcher, the vendor's advertised tool list, the subset permitted for invocation, and hand-written risk and capability metadata. At runtime, Harvey's MCP policy engine checks that a requested tool remains approved, that its review metadata is still present, and that workspace and user settings permit the call. A missing risk or capability annotation causes refusal rather than permissive execution. The effective tool set is described as an intersection of vendor-advertised tools, Harvey-reviewed tools, workspace and user permissions, and any tools explicitly selected for the request.

The policy rules are written in Rego, the policy language associated with Open Policy Agent, and the interpreter is embedded in-process. The policy input is deliberately data-blind: it contains tool identity, risk level, capability flags, and the names of earlier MCP calls, but not user arguments or free text. This limits the possibility that arbitrary content influences policy evaluation and reduces the amount of sensitive data entering the policy layer. Evaluation errors fail closed, which favors confidentiality and safety over availability.

Harvey also fingerprints each approved tool's description and input schema. Discovery-time changes or disappearance of a tool produce an alert, helping detect unauthorized or unexpected capability changes. Tool results undergo sanitization, including detection of mixed-script confusable characters that could disguise malicious or misleading text. Health events and metrics reportedly exclude tool arguments, result contents, server URLs, and user identifiers. Workspace administrators can enable or disable an entire connector, an individual native or MCP member, or a single MCP tool; users can impose more restrictive settings.

## Authorization and Adapter Layer

The integration layer must bridge differences in the evolving MCP authorization ecosystem. The source references protected resource metadata discovery under RFC 9728, authorization-server metadata under RFC 8414, dynamic client registration under RFC 7591, OAuth 2.1 with PKCE, and resource binding under RFC 8707. Harvey reports that real servers do not consistently implement the expected sequence. Some omit the HTTP 401 challenge that would initiate discovery, one token endpoint returns a valid token with HTTP 201 rather than 200, and providers interpret scope declarations differently.

Harvey's adapters accommodate observed provider behavior without exposing those differences to the agent. They can discover metadata directly when a challenge is absent, accept valid tokens returned with either 200 or 201, and request scopes according to the server's advertised behavior. Client registration likewise has multiple paths: some servers support the newer Client ID Metadata Documents approach associated with the July 2026 specification revision, some retain dynamic client registration, and others require a Harvey-pre-registered client. The article characterizes this as compatibility engineering around a changing specification rather than a single uniform protocol implementation.

Credential concurrency is another production concern. Several providers issue single-use refresh tokens, while frontend checks, scheduled synchronization, exports, and background renewal may attempt to use or update the same user's credential concurrently. Harvey uses conditional write-backs instead of locks to handle competing token updates. This is a practical consistency mechanism, but the source does not explain its retry behavior, failure recovery, or measured impact on authorization failures. The stated volume of approximately 13 million credential reads per day indicates that credential storage and retrieval are core platform services, not incidental integration code.

Tool schemas pass through the MCP server, Harvey's agent SDK, and the model API. Harvey normalizes schemas during discovery before registering them with the agent. If an adapter encounters behavior it does not recognize, it alerts the team for investigation and integration updates. This creates an operational feedback loop for third-party drift, although the article does not describe alert thresholds, on-call procedures, automated regression tests, or rollout controls.

## Production LLMOps Assessment

The case illustrates that production agent operations extend beyond prompt design and model selection. Harvey treats tool availability as a governed runtime configuration, uses deterministic policy checks around nondeterministic model decisions, carries a resolved configuration through a multi-step run, and separates provider-specific compatibility from the agent-facing interface. These patterns reduce the chance that an agent can discover or invoke capabilities that were not explicitly approved.

The architecture also has tradeoffs. Strict allowlists, schema fingerprints, fail-closed policy evaluation, and customer-level restrictions improve security but can reduce availability when providers make benign changes or when policy metadata becomes stale. Supporting many authorization variants increases adapter and testing complexity. Using the source system's user credential and ACLs limits Harvey's need to reproduce every downstream permission rule, but it makes correct identity propagation, token lifecycle management, and provider behavior essential. Plain-text MCP results may also provide less built-in provenance than cited native results, leaving a potential review burden for legal users.

The reported connection and call volumes demonstrate adoption and operational scale, not necessarily correctness or business value. No independent evidence is supplied for resistance to prompt injection, prevention of cross-tenant leakage, tool-call reliability, agent answer quality, or reduction in legal-work time. A fuller evaluation would measure authorization-denial correctness, schema-drift detection, refresh-token race failures, policy false positives and false negatives, latency, citation or provenance quality, and security incidents over time. Based on the available text, Harvey's strongest documented contribution is a layered control plane for safely connecting legal agents to external tools, supported by adapters and policy-as-code, rather than a quantified proof that the agents perform legal work more accurately or efficiently.
