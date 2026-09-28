---
title: "A Governed MCP Knowledge Assistant for Enterprise Technology Teams"
slug: "a-governed-mcp-knowledge-assistant-for-enterprise-technology-teams"
draft: false
llmopsTags:
  - "question-answering"
  - "chatbot"
  - "unstructured-data"
  - "rag"
  - "mcp"
  - "semantic-search"
  - "reranking"
  - "agent-based"
  - "memory"
  - "evals"
  - "docker"
  - "api-gateway"
  - "serverless"
  - "security"
  - "guardrails"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "e-commerce"
company: "HEMA"
summary: "HEMA addressed fragmented internal technology knowledge by building HAL, an AI assistant that combines Amazon Bedrock Knowledge Bases, retrieval-augmented generation, live internal APIs, and Model Context Protocol (MCP). Hosted with Amazon Bedrock AgentCore and built with the Strands framework, HAL provides role-appropriate answers through its own web chat as well as tools such as Kiro and Claude, while using Microsoft Entra ID, Active Directory groups, OAuth, IAM, guardrails, and read-only access controls. HEMA reports that tasks that previously required navigating several portals can now be completed in seconds, although the source provides no quantitative accuracy, adoption, latency, or cost metrics and the assistant remains primarily a read-only knowledge layer."
link: "https://aws.amazon.com/blogs/machine-learning/from-portal-hopping-to-instant-answers-hemas-journey-with-mcp-and-amazon-bedrock/"
year: 2026
seo:
  title: "HEMA: A Governed MCP Knowledge Assistant for Enterprise Technology Teams - ZenML LLMOps Database"
  description: "HEMA addressed fragmented internal technology knowledge by building HAL, an AI assistant that combines Amazon Bedrock Knowledge Bases, retrieval-augmented generation, live internal APIs, and Model Context Protocol (MCP). Hosted with Amazon Bedrock AgentCore and built with the Strands framework, HAL provides role-appropriate answers through its own web chat as well as tools such as Kiro and Claude, while using Microsoft Entra ID, Active Directory groups, OAuth, IAM, guardrails, and read-only access controls. HEMA reports that tasks that previously required navigating several portals can now be completed in seconds, although the source provides no quantitative accuracy, adoption, latency, or cost metrics and the assistant remains primarily a read-only knowledge layer."
  canonical: "https://www.zenml.io/llmops-database/a-governed-mcp-knowledge-assistant-for-enterprise-technology-teams"
  ogTitle: "HEMA: A Governed MCP Knowledge Assistant for Enterprise Technology Teams - ZenML LLMOps Database"
  ogDescription: "HEMA addressed fragmented internal technology knowledge by building HAL, an AI assistant that combines Amazon Bedrock Knowledge Bases, retrieval-augmented generation, live internal APIs, and Model Context Protocol (MCP). Hosted with Amazon Bedrock AgentCore and built with the Strands framework, HAL provides role-appropriate answers through its own web chat as well as tools such as Kiro and Claude, while using Microsoft Entra ID, Active Directory groups, OAuth, IAM, guardrails, and read-only access controls. HEMA reports that tasks that previously required navigating several portals can now be completed in seconds, although the source provides no quantitative accuracy, adoption, latency, or cost metrics and the assistant remains primarily a read-only knowledge layer."
notion:
  pageId: "3e9f8dff-2538-80bf-9815-dae290d99fbb"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:21:00.000Z"
  lastEditedTime: "2026-09-28T08:21:00.000Z"
  publishedAt: "2026-09-28T08:23:27Z"
---

## Overview

HEMA, a Dutch retailer with more than 750 stores and a growing technology organization, built HAL to make internal engineering and operational knowledge accessible without requiring employees to search across disconnected portals, wikis, service catalogs, and documentation systems. The underlying information was not necessarily absent: HEMA already maintained structured records connecting teams, services, APIs, and business capabilities. The operational problem was discoverability, particularly for procedural questions such as how to request API access, provision a group, or follow an internal rule.

HAL addresses this problem as a governed knowledge layer rather than merely as a conversational interface. It combines Amazon Bedrock Knowledge Bases for retrieval-augmented generation (RAG), live internal APIs exposed through OpenAPI, service-catalog lookups, and MCP-based access from multiple user-facing clients. The initial implementation served a standalone web chat; a later phase made the same capabilities available from Kiro, Claude, and other MCP-compatible agents. HEMA states that questions that formerly required visiting several portals or asking colleagues can now be answered in seconds, but the published case study does not provide independently measured answer accuracy, time savings, cost, latency, adoption, or hallucination rates. The reported outcome should therefore be treated as an architectural and early-production account rather than a quantitatively validated performance study.

## Problem and use case

HEMA’s knowledge challenge had two related components. Its structured infrastructure knowledge was relatively mature: a service catalog represented ownership relationships, exposed APIs, and mappings to business capabilities. Data from systems including a product information management engine and data-mesh tables had also been organized. However, procedural and “how-to” information was scattered or undocumented. As the organization expanded, informal knowledge transfer through colleagues stopped scaling, causing slower onboarding, inconsistent answers, and context switching.

HAL serves several roles. Developers can search technical documentation, API specifications, Kafka topics and Avro schemas, Data Consolidation Layer channels, and the service catalog. Product owners primarily use documentation and process knowledge, while business analysts use information about services, APIs, and team ownership. This cross-role scope is important operationally: the system is not limited to code generation, and its usefulness depends on integrating authoritative organizational data with unstructured documentation.

## Architecture and serving path

The internal agent is implemented with the Strands framework, packaged as a Linux/ARM64 container, and hosted on Amazon Bedrock AgentCore Runtime. AgentCore Memory supplies short-term conversational context, while Amazon Bedrock Guardrails provides content filtering. The deployment uses EU cross-Region inference and is described as supporting Dutch-language use cases. HEMA manages infrastructure in an AWS CDK TypeScript monorepo using npm workspaces, with environment-specific tenant, client, and resource identifiers held in AWS Systems Manager parameters.

HAL reaches information through two principal paths. For semantic retrieval, local Strands tools call the Amazon Bedrock Retrieve API directly against several Bedrock Knowledge Bases. These bases contain IT and how-to documentation, API and OpenAPI specifications, Kafka event-streaming topics and Avro schemas, Data Consolidation Layer exchange channels, and service-catalog information about people, teams, services, and APIs. For live data and service-catalog or people/team queries, the agent uses MCP to connect to an AgentCore Gateway, which invokes internal APIs.

Retrieval uses an initial Knowledge Base search for most questions. When a retrieved chunk is insufficient, a `fetch_full_document` operation obtains the complete source document. HEMA also uses Bedrock reranking for semantic queries and `team_id` metadata filtering for team-scoped lookups. A `kb-search` Lambda wraps the Retrieve API for the Knowledge Bases and is restricted through IAM to specified Knowledge Base ARNs and read access to the relevant S3 source-document bucket. These controls reduce the blast radius of the search integration, although the source does not describe retrieval recall, grounding tests, source citation behavior, or formal answer-quality thresholds.

## MCP integration and identity

MCP provides a common interface between HAL’s capabilities and multiple AI clients. Instead of creating a bespoke integration for every client and backend, HEMA exposes knowledge and API capabilities as MCP tools. AgentCore Gateway can generate tools from OpenAPI specifications and Lambda functions, avoiding the need for HEMA to operate custom MCP server infrastructure.

The architecture uses two gateways because an AgentCore Gateway supports only one inbound authentication type. The first gateway uses IAM and serves the internal HAL agent. The second is an external-facing MCP Gateway authenticated through Microsoft Entra ID for clients such as Kiro and Claude. This second gateway shares read-only Knowledge Base access but not application code with the internal gateway, allowing the external surface to evolve independently. Knowledge Base search is made available to the external gateway through an intermediate Lambda, while live internal APIs are exposed as OpenAPI targets.

An Amazon API Gateway v2 HTTP API and Lambda form an MCP authentication proxy in front of the Entra Gateway. The proxy provides OAuth discovery documents, adapts requested scopes to the resource application’s invoke scope, removes an incompatible legacy resource parameter, adds `response_mode=query` for desktop-client authorization-code handling, and forwards the `/mcp` request with the bearer token. Clients do not receive AWS credentials; users authenticate through a browser on first connection, followed by token refresh.

A notable implementation limitation is that MCP Dynamic Client Registration is not implemented as genuine dynamic registration. The proxy exposes a `/register` endpoint that returns a fixed, pre-provisioned client ID. This emulates the expected protocol interaction rather than registering clients dynamically. That shortcut may simplify deployment, but it creates a compatibility and lifecycle consideration for organizations that need per-client identity, revocation, auditing, or strict protocol conformance.

## Deployment, governance, and rollout

Security is anchored in Microsoft Entra ID and existing Active Directory group authorization. The design deliberately starts with read-only access, and HEMA reports that no AWS credentials are placed on client machines. OAuth and IAM are used at different trust boundaries: the internal agent gateway uses IAM SigV4, while external MCP clients authenticate through Entra ID and the proxy. AgentCore Identity supplies managed inbound JWT authentication and outbound OAuth2 token-vault capabilities for internal APIs, according to the case study.

HEMA first built a standalone Next.js chat application and then opened the capabilities to external MCP clients. Before wider production rollout, the system was deployed to staging and made available to engineers and business users for a one-month hands-on test period. The stated purposes were to identify coverage gaps, assess answer quality, and validate usability. This is a sensible human-in-the-loop rollout pattern, but the article does not describe a formal evaluation set, labeling process, red-team program, regression suite, observability dashboard, or acceptance criteria. It also does not report the findings from the month of testing in numerical form.

## Results and future direction

The reported operational result is reduced portal-hopping and faster access to internal answers. HAL is described as already serving developers, product owners, and business analysts rather than only its original developer audience. Its distribution through an “Everyone Skill” and steering files, maintained through HEMA’s monthly AI Development Forum, provides an organizational mechanism for adoption and governance.

The current system is intentionally an answer layer. HEMA’s planned next step is an action layer in which users request operations such as provisioning an AWS account directly from chat, Kiro, Claude, or another MCP-compatible client. Because the existing portals already expose APIs and use Entra ID single sign-on, HEMA expects to reuse the identity and Active Directory group authorization model. This is a promising path, but moving from read-only retrieval to execution materially raises the requirements for confirmation flows, least-privilege tool design, audit logs, idempotency, error handling, policy enforcement, and protection against prompt injection or unauthorized delegation. The source says that carefully scoped action tools are planned, but does not report that these write capabilities are already in production.

## Assessment and tradeoffs

The case demonstrates a practical enterprise LLMOps pattern: reuse existing structured and unstructured knowledge, isolate retrieval and live API access, provide a shared tool protocol, authenticate users through the organization’s identity provider, and stage rollout before broader adoption. AgentCore reduces the amount of infrastructure HEMA must build for runtime hosting, gateway routing, memory, guardrails, and identity integration. MCP also reduces client-specific integration work and lets users access capabilities in tools they already use.

There are tradeoffs. Exposing existing system-to-system OpenAPI definitions directly as agent tools is expedient, but HEMA acknowledges that those APIs do not always map cleanly to tools that an agent can reason about; refactoring into agent-oriented interfaces is planned. Multiple gateways and an authentication proxy add operational components and protocol translation points. Managed AWS services can accelerate delivery but increase platform coupling and require careful cost, region, data-residency, and service-limit management. Most importantly, the published evidence is qualitative: no hard business metrics or independently verified evaluation results are supplied. HAL is therefore best characterized as a live, governed enterprise knowledge assistant with a staged production rollout, rather than proof that generative AI has already automated internal operations at scale.
