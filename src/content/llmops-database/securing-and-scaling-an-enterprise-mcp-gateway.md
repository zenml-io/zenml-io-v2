---
title: "Securing and Scaling an Enterprise MCP Gateway"
slug: "securing-and-scaling-an-enterprise-mcp-gateway"
draft: false
llmopsTags:
  - "mcp"
  - "agent-based"
  - "kubernetes"
  - "api-gateway"
  - "open-source"
  - "security"
  - "guardrails"
  - "scalability"
  - "microservices"
industryTags: "tech"
company: "Spotify"
summary: "Spotify scaled Model Context Protocol (MCP) adoption from informal experimentation to an enterprise platform serving roughly 150 internal and external MCP servers. The company first built an in-house gateway with single sign-on, gRPC-to-MCP transcoding, routing, and centralized authentication because no suitable solutions were available, then migrated the gateway toward Envoy and other open-source building blocks. A narrow YAML-based configuration interface, token exchange, account linking, least-privilege scopes, separate identities for headless agents, and centralized audit and policy enforcement enabled broad adoption while reducing the risk of inconsistent server implementations. Reported usage grew from approximately 50,000 tool calls per month in December 2025 to about 4 million per month, with 163,000 calls across agent sessions on a cited day, although these operational metrics do not by themselves demonstrate tool-call quality or business impact."
link: "https://www.youtube.com/watch?v=vYYmZtEZQFg"
year: 2025
seo:
  title: "Spotify: Securing and Scaling an Enterprise MCP Gateway - ZenML LLMOps Database"
  description: "Spotify scaled Model Context Protocol (MCP) adoption from informal experimentation to an enterprise platform serving roughly 150 internal and external MCP servers. The company first built an in-house gateway with single sign-on, gRPC-to-MCP transcoding, routing, and centralized authentication because no suitable solutions were available, then migrated the gateway toward Envoy and other open-source building blocks. A narrow YAML-based configuration interface, token exchange, account linking, least-privilege scopes, separate identities for headless agents, and centralized audit and policy enforcement enabled broad adoption while reducing the risk of inconsistent server implementations. Reported usage grew from approximately 50,000 tool calls per month in December 2025 to about 4 million per month, with 163,000 calls across agent sessions on a cited day, although these operational metrics do not by themselves demonstrate tool-call quality or business impact."
  canonical: "https://www.zenml.io/llmops-database/securing-and-scaling-an-enterprise-mcp-gateway"
  ogTitle: "Spotify: Securing and Scaling an Enterprise MCP Gateway - ZenML LLMOps Database"
  ogDescription: "Spotify scaled Model Context Protocol (MCP) adoption from informal experimentation to an enterprise platform serving roughly 150 internal and external MCP servers. The company first built an in-house gateway with single sign-on, gRPC-to-MCP transcoding, routing, and centralized authentication because no suitable solutions were available, then migrated the gateway toward Envoy and other open-source building blocks. A narrow YAML-based configuration interface, token exchange, account linking, least-privilege scopes, separate identities for headless agents, and centralized audit and policy enforcement enabled broad adoption while reducing the risk of inconsistent server implementations. Reported usage grew from approximately 50,000 tool calls per month in December 2025 to about 4 million per month, with 163,000 calls across agent sessions on a cited day, although these operational metrics do not by themselves demonstrate tool-call quality or business impact."
notion:
  pageId: "3f6f8dff-2538-8018-8def-de2127e1e4ef"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-11T09:43:00.000Z"
  lastEditedTime: "2026-10-11T09:43:00.000Z"
  publishedAt: "2026-10-11T09:45:58Z"
---

## Overview

Spotify developed an enterprise MCP platform to make agent-mediated access to internal systems practical, secure, and easy to adopt. After employees rapidly created MCP servers during a company hack week, the organization found that the servers used inconsistent technology choices and ad hoc authentication patterns. The platform team responded by making a centralized MCP gateway the easiest and safest route for exposing servers. The gateway provided authentication, routing, policy enforcement, and initially gRPC-to-MCP transcoding, allowing service owners to continue using familiar Spotify backend patterns while making their services available to agent clients.

The initial gateway was built quickly as custom infrastructure because the MCP ecosystem was immature and appropriate open-source components were not yet available. As the ecosystem developed, Spotify moved the gateway toward Envoy and other standard building blocks. The resulting architecture retained important platform opinions—centralized access control, controlled scopes, cataloging, and compatibility with gRPC—while reducing the amount of bespoke infrastructure that Spotify had to own. The reported scale is substantial: approximately 150 MCP servers sit behind the gateway, usage increased from about 50,000 tool calls per month in December 2025 to around 4 million per month, and a cited day recorded approximately 163,000 tool calls across human-driven and autonomous agent sessions. These figures indicate adoption and infrastructure load, but they are not an evaluation of response quality, task completion, safety incidents, or return on investment.

## Problem and Adoption Context

The emergence of agent coding tools and the relatively new MCP specification created strong demand for integrations before Spotify had a supported development path. During hack week, employees created many MCP servers independently. The resulting implementations varied in technology stack and authentication behavior, partly because existing backend frameworks did not directly support MCP APIs and there was no established internal security pattern for them.

This created familiar LLMOps and platform-engineering risks. Each team could make different decisions about identity, credentials, authorization, deployment, and service exposure. Agents could potentially be connected to systems without consistent governance, while service owners would need to understand both MCP and Spotify’s security requirements. Spotify therefore treated the gateway as an enablement layer as well as a security boundary. Adoption was encouraged by making the gateway the path of least resistance, rather than requiring every team to independently solve protocol integration and authentication.

An internal Backstage catalog was added to improve discoverability of MCP servers. The organization also observed that the earliest and simplest servers remained among the most heavily used. This suggests that operational value came not only from sophisticated agent capabilities, but also from reliable access to basic tools that solved recurring tasks.

## Initial Architecture and gRPC Compatibility

A major design decision was to build on Spotify’s existing gRPC ecosystem. Spotify already operated thousands of gRPC services with strongly defined APIs, protobuf-based contracts, and established implementation practices. Instead of requiring service owners to create entirely separate MCP-native backends, the first gateway accepted MCP’s JSON-RPC traffic over HTTP and transcoded it into gRPC internally.

This approach let a team define and operate a conventional gRPC backend while exposing an MCP-compatible interface externally. It reduced migration cost and allowed existing engineering knowledge, service frameworks, and operational practices to be reused. After the first gateway release, which included the transcoding capability and single sign-on, roughly 10 to 15 gRPC backends were reportedly connected within a few days. This is an example of an LLMOps adoption strategy in which compatibility with existing production systems matters as much as the model-facing protocol itself.

The transcoding functionality later moved out of the gateway into a reusable library. Service owners could therefore preserve the gRPC implementation model without making the gateway responsible for application-specific protocol conversion. This separation helped narrow the gateway’s responsibility and made the data-plane architecture easier to standardize.

## Migration from Custom Infrastructure to Open Source

The original custom gateway solved an urgent problem, but its success introduced organizational and maintenance challenges. Once many teams depended on it, there was pressure to add unrelated features to a central component. The gateway also contained code associated with different teams, complicating ownership, deployments, and on-call responsibilities.

Spotify already used Envoy extensively and had experience operating it at high scale. When Envoy gained a native MCP filter, the company began rebuilding the gateway around Envoy and open-source control-plane components. The migration provided a more constrained contract for what the gateway should do and reduced the temptation to turn it into an ever-expanding custom platform component. Spotify retained its internal policies and integrations through controlled extension mechanisms rather than embedding every function in bespoke gateway code.

The resulting design has a configuration path and a traffic path. A service owner declares that a service exposes MCP and supplies a concise resource definition. Spotify maps that declaration to Gateway API configuration, uses an open-source control plane to configure the Envoy data plane, and routes MCP traffic through Envoy. Authentication, guardrails, scanning, and related controls are attached through constrained mechanisms. The exact implementations of the control plane, scanning, and guardrails are not detailed, so their effectiveness cannot be assessed from the available information.

## Authentication and Credential Handling

Spotify designed authentication around three stated goals: users should sign in only once where possible, downstream credentials should not enter the language model’s context, and each MCP server should receive only the permissions it needs. The gateway acts as the centralized enforcement point rather than requiring every MCP server maintainer to implement OAuth flows independently.

Service owners specify routing and required token scopes in a small YAML resource based on a Kubernetes-style group-version-kind schema. Conceptually, the declaration identifies the destination and the required authorization scope:

```yaml
kind: MCPServer
spec:
  provider: google
  scopes:
    - required.scope
```

The important operational property is not the particular syntax but the narrow interface and centrally governed vocabulary. Spotify controls which providers and scopes can be requested, making the secure path relatively easy for service owners and making unsupported or overly broad configurations harder to introduce. The gateway verifies that the requested MCP server is known, then exchanges the caller’s token for a short-lived downstream token with the scopes declared for that server.

The implementation uses RFC 8693 token exchange. A user authenticates to the gateway, and the gateway obtains a provider-specific token without placing that credential in the LLM context. The downstream MCP server receives a token representing the user’s identity and constrained permissions. Account linking is required once per MCP server and provider: the user grants the required scopes through an out-of-band flow, after which a security token service stores a refresh token bound to the corporate identity and performs later exchanges behind the scenes.

This design centralizes credential handling and supports auditability, but it does not eliminate all user friction. Each MCP server may represent a separate OAuth resource, so users can face many account-linking or consent events. Expired refresh tokens, switching agent clients, and initial setup can add further friction. Repeated consent prompts can also lead to consent fatigue, where users approve requests without adequately reviewing them.

## Human-Driven and Headless Agents

The platform supports both agents acting on behalf of a human and autonomous or scheduled agents. In the human-driven flow, the agent inherits the user’s identity and permissions. For headless agents, there is no human available to provide consent or serve as the principal, so Spotify assigns the agent its own identity. The gateway evaluates that identity against a per-server access policy and issues permissions for the agent to act as itself.

This distinction is important for production operations. A headless workflow should not be allowed to present an arbitrary service token and obtain access merely because the token is valid. The gateway’s policy check limits which agent principals may access which MCP servers. The resulting actions can be audited as the service identity’s activity rather than being misleadingly attributed to a human. The same gateway, policy engine, and audit log are reused for both classes of agent.

## Standards, Evolution, and Tradeoffs

Spotify’s main architectural lesson is to start pragmatically at the frontier while designing for replacement. The company implemented custom components when MCP support and ready-made authentication solutions were unavailable, but based them on established or emerging standards and kept interfaces narrow. This allowed the platform to replace custom authentication behavior when vendor support became available and to adopt Envoy’s native MCP support without forcing users to change their daily workflows.

Enterprise Managed Authentication in the newer MCP specification is intended to reduce repeated interactive sign-ins by allowing users to authenticate to an agent client through enterprise SSO and complete subsequent MCP authorization flows without repeated manual interaction. Spotify’s current gateway cannot fully realize that model because the relevant flow is terminated at the gateway and the available mechanism is still effectively single-hop. Work on multi-hop identity continuation may address this limitation, but it is not presented as deployed capability.

The case demonstrates several production LLMOps principles: standardize access to tools, keep secrets outside model context, enforce least privilege at a centrally governed boundary, distinguish human delegation from autonomous service identity, reuse existing service infrastructure, and separate platform contracts from implementation details. It also exposes ongoing costs. A gateway becomes critical shared infrastructure and must be operated reliably at high request volume. Centralization can create ownership and feature-crowding problems, while the large number of MCP servers increases authorization and consent complexity. Finally, the reported call counts measure adoption and traffic, not whether agents selected appropriate tools, completed tasks correctly, or avoided harmful actions. Those dimensions would require additional evaluation and incident data that are not provided here.
