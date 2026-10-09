---
title: "Scaling Enterprise Agent Access with a Centralized MCP Gateway"
slug: "scaling-enterprise-agent-access-with-a-centralized-mcp-gateway"
draft: false
llmopsTags:
  - "code-generation"
  - "legacy-system-integration"
  - "mcp"
  - "agent-based"
  - "token-optimization"
  - "cost-optimization"
  - "api-gateway"
  - "microservices"
  - "monitoring"
  - "orchestration"
  - "security"
  - "reliability"
  - "scalability"
  - "guardrails"
industryTags: "tech"
company: "Uber"
summary: "Uber built MCP Gateway to replace fragmented, team-specific integrations between AI agents and the company’s large estate of internal and third-party services. The platform separates a control plane, MCP Registry, and AutoCrawler from a runtime Proxy Gateway that discovers, governs, translates, and executes MCP tools backed by HTTP, gRPC, TChannel, or native MCP servers. It provides owner approval, access control, sensitive-data redaction, observability, incremental discovery, response projection, and code-oriented access through aifx. Uber reports that the gateway hosts more than 800 MCP servers and 5,000 tools, although the article provides limited independent evaluation of reliability, agent task quality, latency, or cost."
link: "https://www.uber.com/gb/en/blog/designing-mcp-gateway/"
year: 2026
seo:
  title: "Uber: Scaling Enterprise Agent Access with a Centralized MCP Gateway - ZenML LLMOps Database"
  description: "Uber built MCP Gateway to replace fragmented, team-specific integrations between AI agents and the company’s large estate of internal and third-party services. The platform separates a control plane, MCP Registry, and AutoCrawler from a runtime Proxy Gateway that discovers, governs, translates, and executes MCP tools backed by HTTP, gRPC, TChannel, or native MCP servers. It provides owner approval, access control, sensitive-data redaction, observability, incremental discovery, response projection, and code-oriented access through aifx. Uber reports that the gateway hosts more than 800 MCP servers and 5,000 tools, although the article provides limited independent evaluation of reliability, agent task quality, latency, or cost."
  canonical: "https://www.zenml.io/llmops-database/scaling-enterprise-agent-access-with-a-centralized-mcp-gateway"
  ogTitle: "Uber: Scaling Enterprise Agent Access with a Centralized MCP Gateway - ZenML LLMOps Database"
  ogDescription: "Uber built MCP Gateway to replace fragmented, team-specific integrations between AI agents and the company’s large estate of internal and third-party services. The platform separates a control plane, MCP Registry, and AutoCrawler from a runtime Proxy Gateway that discovers, governs, translates, and executes MCP tools backed by HTTP, gRPC, TChannel, or native MCP servers. It provides owner approval, access control, sensitive-data redaction, observability, incremental discovery, response projection, and code-oriented access through aifx. Uber reports that the gateway hosts more than 800 MCP servers and 5,000 tools, although the article provides limited independent evaluation of reliability, agent task quality, latency, or cost."
notion:
  pageId: "3eff8dff-2538-80cf-80d5-f58995f4ea8f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-04T15:15:00.000Z"
  lastEditedTime: "2026-10-04T15:15:00.000Z"
  publishedAt: "2026-10-09T08:54:19Z"
---

## Overview

Uber developed MCP Gateway as shared production infrastructure for its rapidly expanding ecosystem of AI agents. Early teams connected agents directly to internal services and MCP servers, demonstrating that live business context and the ability to take actions substantially broadened agent capabilities. At larger scale, however, independently implemented integrations created duplicated infrastructure, inconsistent security and operations, poor discoverability, and tight coupling between individual agents and services. The gateway addresses this platform problem by providing one governed integration layer through which agents can discover and invoke existing APIs and native MCP tools.

The design is primarily an LLMOps and agent-infrastructure solution rather than a new model-training system. Its purpose is to make tool use operationally manageable: services can be exposed without being rewritten as MCP servers; tool definitions can be cataloged and versioned; access can be approved by service owners; requests can be routed through established service infrastructure; and responses can be constrained before they reach an agent’s context. Uber states that the platform hosts more than 800 MCP servers and more than 5,000 tools. Those figures demonstrate adoption claimed by the source, but the article does not provide external validation or quantitative measurements for task success, latency, availability, token savings, or operating cost.

## Problem and production requirements

Uber operates thousands of internal services exposing APIs through HTTP, gRPC, and TChannel. Directly asking every service team to design, implement, deploy, and maintain an MCP server would make agent enablement slow and uneven. At the same time, simply exposing every API to every agent would introduce governance, security, context-window, and operational problems. The platform therefore had to support both automatically generated interfaces for existing services and deliberately designed native MCP servers, while preserving service-team ownership of what becomes available to agents.

The article identifies several requirements relevant to production LLMOps. Agents need a consistent interface despite protocol differences below the gateway. Developers need a registry that supports discovery, ownership, schemas, enablement, and reuse. Operators need centralized authorization, rate limiting for third-party integrations, sensitive-data redaction, and observability. Service owners need review and rollback controls rather than an automatic path from API discovery to exposure. Finally, agents need a way to find relevant tools without loading the descriptions of hundreds or thousands of tools into every model context.

## Architecture

MCP Gateway is organized as a microservice-based control plane and data plane. The MCP Registry is the control plane and the system of record for MCP servers, tools, ownership, schemas, and enablement state. The Proxy Gateway is the data plane. It consumes registry configuration, materializes virtual MCP servers, receives MCP requests, routes them to the appropriate backend, and translates responses back into MCP-compatible results.

For IDL-backed services, a server handler maintains in-memory mappings to destinations such as HTTP endpoints or gRPC and TChannel procedures. A request arriving as an MCP JSON payload is translated into the downstream wire format, serialized into Protobuf or Thrift where applicable, sent to the service, and converted back into MCP-compatible JSON. Execution uses Muttley, Uber’s service-mesh sidecar, allowing the gateway to reuse existing service-to-service routing capabilities rather than introducing a separate connectivity mechanism. Native MCP servers are represented as virtual servers in the registry and proxied to their original implementations.

The data plane refreshes configuration at a fixed cadence and applies enablement or tool-definition changes without a service restart or redeployment. The source describes this as allowing changes to take effect in real time, although it does not specify the refresh interval, propagation guarantees, consistency model, or behavior during configuration errors. The gateway exposes a service-specific MCP endpoint and resolves incoming requests to tool-aware, downstream-aware handlers.

## Discovery and authoring

AutoCrawler is a Cadence-powered distributed workflow system that subscribes to Uber’s IDL registry and internal service signals. Scheduled workflows scan for new services, APIs, and schema changes. For IDL-backed services, it creates or updates a virtual MCP server, parses Protobuf or Thrift definitions, extracts methods and request and response schemas, and generates MCP-compatible JSON-RPC schemas. An LLM is used to generate enriched, agent-friendly tool descriptions from extracted schemas and documentation comments. This is a practical use of an LLM inside a platform pipeline: the model improves interface descriptions, while the underlying API contract and schema translation remain the structural source of truth.

For native MCP servers, AutoCrawler monitors heartbeat metrics emitted through MCPFx, Uber’s framework for building native MCP servers. It calls listTools to obtain the server’s declared tools and schemas, then creates a proxy representation in the registry. In both discovery paths, newly created tools are disabled by default. Discovery therefore does not equal production exposure.

Service owners review generated definitions, refine descriptions when necessary, and explicitly enable servers and tools. Changes to descriptions create configuration diffs that require owner approval, and approved changes can be deployed or rolled back to a previous known version. This approval workflow is an important control against accidental exposure and against blindly trusting LLM-generated descriptions. The article does not describe automated semantic validation, adversarial testing, schema fuzzing, or human-review turnaround times, so those remain potential areas for further evaluation.

## Security, governance, and external integrations

Authorization is applied at server and tool granularity through Uber’s internal Access Control System. Charter policies can distinguish among human, service, and agent callers, with optional tool-level overrides. The gateway also performs redaction of personally identifiable information and other sensitive data in tool responses. These controls create a centralized policy enforcement point, but the article does not quantify redaction coverage, false positives, false negatives, or the effect of redaction on agent task completion.

Third-party MCP integrations such as Jira and Google use a two-part arrangement. MCP Gateway relays the caller’s user token and applies authorization, rate limiting, and sensitive-data redaction. A third-party MCP service exchanges the internal token for a corresponding external authentication token before dispatching the request. This separation keeps external credential exchange out of the core gateway while retaining centralized controls, but it also introduces dependency and identity-mapping considerations that are not explored in the article, such as external token failure modes, revocation timing, and audit-detail parity.

## Managing tool scale and model context

A conventional MCP client must know which server to contact before it can ask for that server’s tools. Configuring hundreds of servers directly would require large amounts of tool metadata and could consume model context even before an agent begins its task. Uber addresses this with Omni MCP, a single proxy that supports incremental discovery. An agent can discover a server from query intent, discover tools for that server, retrieve an individual tool schema, and invoke the tool. This progressive pattern limits the amount of tool information that must be placed in context and provides a centralized point at which the gateway’s access policies still apply.

Response Projection addresses the opposite side of the context problem: oversized tool results. The caller adds a projection field to the tool request containing the nested response paths it needs. The gateway requests or retains only those fields and trims the response at runtime. This resembles a GraphQL-style selection mechanism and can reduce unnecessary context transfer, but the source supplies no measured token reduction, latency impact, or evidence that models reliably generate valid projection paths.

Code Mode supports coding agents that can work more efficiently with files and shell commands than with large tool results embedded in a conversation. Through Uber’s aifx CLI, agents can list MCP servers, search for tools across servers, and call tools through the gateway without installing each MCP server or keeping all tool definitions in model context. Results can be written to files, allowing an agent to inspect only relevant portions with filesystem operations. The article says Code Mode is now the company default for MCP tool use in coding agents, but it does not provide comparative evaluation against direct MCP client integrations.

## Results and tradeoffs

Uber reports that MCP Gateway converted a fragmented set of integrations into a unified path that teams can use in minutes. Claimed benefits include easier discovery and installation, no-code exposure of existing APIs, centralized ownership, built-in security, and common observability. The reported scale—over 800 MCP servers and over 5,000 tools—is the clearest production adoption result in the source.

The architecture trades local simplicity for centralized platform complexity. A gateway can standardize authentication, routing, schemas, redaction, and operational policy, but it becomes a critical dependency and potential bottleneck for agent workflows. In-memory configuration refreshes avoid redeployment but require careful handling of stale state, rollout failures, and inconsistent versions. Automatically generated descriptions accelerate onboarding but can mislead agents if they are ambiguous or semantically inaccurate, which is why disabled-by-default registration and owner approval are significant safeguards. Incremental discovery and response projection address context and cost pressure, but their effectiveness depends on agent behavior and has not been quantified.

The case study’s main LLMOps lesson is that production agent capability depends on the connective tissue around the model. Uber’s gateway does not claim to make an agent intrinsically more intelligent; it makes access to enterprise actions more discoverable, governed, and operationally repeatable. A complete assessment would still need metrics for availability, request latency, authorization failures, redaction quality, tool-selection accuracy, rollback frequency, token consumption, cost, and downstream side effects. Within the evidence provided, MCP Gateway is a substantial internal platform investment for scaling agent-to-service interactions, with strong emphasis on discovery, governance, protocol abstraction, and context management.
