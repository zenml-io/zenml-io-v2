---
title: "Centralized Gateway for AI Agent-Tool Access"
slug: "centralized-gateway-for-ai-agent-tool-access"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "cost-optimization"
  - "latency-optimization"
  - "api-gateway"
  - "monitoring"
  - "security"
  - "guardrails"
  - "databases"
  - "microservices"
industryTags: "tech"
company: "Doordash"
summary: "DoorDash encountered challenges managing AI agent access to internal and external tools as agents moved from experiments into production workflows. While the Model Context Protocol (MCP) standardized tool invocation, it didn't address critical production concerns around authentication, authorization, credential management, tool curation, and observability. DoorDash built an Agent Gateway as a centralized control plane that authenticates callers, checks authorization, curates tool surfaces, manages credentials, routes requests to downstream MCP servers, and emits structured usage events. The gateway now handles millions of tool calls weekly across more than 200 registered MCP servers and 30+ agents used by thousands of employees, providing a self-serve platform that delivers improved security, reduced agent complexity, better model behavior through curated tool catalogs, and centralized governance."
link: "https://careersatdoordash.com/blog/how-doordash-built-a-centralized-gateway-for-ai-agent-tool-access/"
year: 2026
seo:
  title: "Doordash: Centralized Gateway for AI Agent-Tool Access - ZenML LLMOps Database"
  description: "DoorDash encountered challenges managing AI agent access to internal and external tools as agents moved from experiments into production workflows. While the Model Context Protocol (MCP) standardized tool invocation, it didn't address critical production concerns around authentication, authorization, credential management, tool curation, and observability. DoorDash built an Agent Gateway as a centralized control plane that authenticates callers, checks authorization, curates tool surfaces, manages credentials, routes requests to downstream MCP servers, and emits structured usage events. The gateway now handles millions of tool calls weekly across more than 200 registered MCP servers and 30+ agents used by thousands of employees, providing a self-serve platform that delivers improved security, reduced agent complexity, better model behavior through curated tool catalogs, and centralized governance."
  canonical: "https://www.zenml.io/llmops-database/centralized-gateway-for-ai-agent-tool-access"
  ogTitle: "Doordash: Centralized Gateway for AI Agent-Tool Access - ZenML LLMOps Database"
  ogDescription: "DoorDash encountered challenges managing AI agent access to internal and external tools as agents moved from experiments into production workflows. While the Model Context Protocol (MCP) standardized tool invocation, it didn't address critical production concerns around authentication, authorization, credential management, tool curation, and observability. DoorDash built an Agent Gateway as a centralized control plane that authenticates callers, checks authorization, curates tool surfaces, manages credentials, routes requests to downstream MCP servers, and emits structured usage events. The gateway now handles millions of tool calls weekly across more than 200 registered MCP servers and 30+ agents used by thousands of employees, providing a self-serve platform that delivers improved security, reduced agent complexity, better model behavior through curated tool catalogs, and centralized governance."
notion:
  pageId: "3b4f8dff-2538-8085-92aa-dc946d4dd939"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:37:00.000Z"
  lastEditedTime: "2026-08-06T11:37:00.000Z"
  publishedAt: "2026-08-06T11:43:01Z"
---

## Overview

DoorDash's Agent Gateway represents a sophisticated approach to managing AI agent-tool access at production scale. The case study addresses a critical gap in the LLMOps landscape: while the Model Context Protocol (MCP) provided a standardized way for agents to describe, discover, and invoke tools, it left unresolved the complex production requirements around identity, authorization, credential management, tool curation, and operational observability. DoorDash built a centralized gateway that serves as both a data plane proxy and a control plane registry, enabling agents to securely access internal APIs, engineering systems, observability platforms, ticketing systems, knowledge bases, and third-party SaaS products.

The implementation is noteworthy for several reasons. First, it demonstrates production-scale deployment with millions of weekly tool calls across more than 200 registered MCP servers serving 30+ agents used by thousands of employees. Second, it tackles the practical governance challenges that emerge when moving from experimental agents to production systems that require strict access controls, audit trails, and cost attribution. Third, it shows how tool surface curation—exposing smaller, task-relevant subsets of available tools rather than raw catalogs—can improve both safety and agent effectiveness by reducing model confusion and irrelevant choices.

## The Production Challenge

DoorDash identified three core dimensions to the agent-tool access problem that MCP alone couldn't solve. The first dimension is access control, which requires determining caller identity, validating authorization, and selecting the appropriate credential model from among internal identity, gateway-held tokens, per-user OAuth grants, or service principal access. The second dimension is tool surface curation, addressing the reality that agents shouldn't receive unfiltered access to every tool exposed by downstream MCP servers. Raw tool dumps create safety risks, confuse models with irrelevant options, and make agents harder to operate. The third dimension is operations, encompassing rate limits, traces, metrics, usage events, cost attribution, ownership metadata, and production visibility.

The case study emphasizes that these concerns belong in a shared platform rather than being reimplemented across every agent and every MCP server. Without centralization, each agent-tool pairing ends up with custom auth code, OAuth flows, secret handling, tool catalogs, rate limits, and logging—an unsustainable approach as the agent ecosystem scales.

## Architecture Design

The Agent Gateway architecture separates concerns between a proxy (data plane) and a registry (control plane). The proxy receives each MCP request, authenticates the caller, authorizes the action, applies rate limits, injects appropriate credentials, forwards the request to downstream servers, and emits observability data. The registry serves as the source of truth, storing agents, MCP servers, owners, transport configurations, auth modes, policies, discovered tool catalogs, and tool-surface configurations.

This architectural split delivers several important properties. Agents use a consistent MCP endpoint pattern instead of learning each downstream server's unique auth and routing model. Tool owners register capabilities once, attach ownership and policy metadata, and gain visibility into production usage. Security teams get a single enforcement point for access control, grant revocation, and audit trails. Platform teams can improve the shared infrastructure path once and have all agents inherit the improvements automatically.

DoorDash maintains separate internal and external trust boundaries by running internal workflows and external-facing agentic use cases through separate proxy planes that share common libraries and registry concepts. This containment strategy limits the blast radius for internet-facing services and allows different auth models to evolve independently based on their distinct threat profiles.

## Identity, Authorization, and Credential Management

Every gateway request resolves to a specific caller—a user, service, or agent acting with delegated user context. This resolved identity flows through authorization checks, credential injection, routing decisions, and observability events, ensuring downstream actions can always be attributed to a specific principal.

The gateway implements centralized authorization that goes beyond simple caller-to-server access checks. Policy questions include whether a specific agent can access a particular server, whether a user can invoke a tool through a specific agent, whether a tool can be exposed in a given environment, whether write-capable or read-only variants should be available, and whether per-user OAuth is required versus team service principal credentials.

Centralizing policy in the gateway provides DoorDash a single location to modify access rules and revoke permissions. Tool owners avoid rebuilding authorization logic for every server, and agent builders avoid encoding security decisions in prompts or application code—a particularly important consideration given the difficulty of reliably controlling LLM behavior through prompt engineering alone.

Credential handling follows four distinct patterns based on the security requirements. Internal service identity leverages DoorDash infrastructure to forward verified caller context to internal services. Gateway-held tokens inject vendor or service tokens from secret storage without exposing them to the agent. Per-user OAuth manages encrypted per-user grant stores, injecting and refreshing user tokens for user-scoped actions. Service principals use gateway-managed team credentials to mint or broker short-lived non-personal tokens.

The case study emphasizes that agents should never hold raw credentials like vendor API keys, OAuth refresh tokens, or borrowed human grants for team automations. The gateway maintains these security boundaries explicitly and makes them auditable.

## OAuth Integration Without Breaking Agent Turns

User-scoped third-party tools require proper user authorization. Actions like reading a user's documents, filing tickets on their behalf, or updating SaaS data cannot safely rely on shared keys. Before the gateway deployment, each team typically built its own OAuth flow, token storage, and connection experience.

The gateway centralizes OAuth grant management with access scoped to the specific combination of agent, user, and server. On the first call requiring authorization, the gateway initiates the provider's OAuth flow, stores the resulting access and refresh tokens encrypted, and injects the user's token on subsequent calls. Agents never receive raw token values.

For clients supporting MCP elicitation, the gateway can pause the tool call, request the client to show a connection prompt, and resume the original call after user authorization. For clients without elicitation support, it returns a structured authorization-required response with a connection URL. This approach transforms connection from a failed turn into a recoverable part of the protocol flow, improving user experience significantly.

## Curated Tool Surfaces Through Bundles and Filtering

The case study makes a compelling argument that agents don't naturally think in terms of MCP servers—they think in terms of tasks. A coding agent doesn't want to separately configure GitHub, Jira, observability, and documentation systems; it wants the complete tool surface needed to investigate issues, modify code, open pull requests, inspect CI, and understand production behavior.

Simultaneously, most downstream MCP servers expose far more tools than any single agent should use. Third-party servers may publish hundreds of operations including administrative actions, destructive operations, billing APIs, and provider-specific features. Most DoorDash workflows require only a small approved subset.

The gateway addresses both concerns through curated tool surfaces implemented via bundles and filters. Bundles combine tools from multiple MCP servers into one logical MCP endpoint. Filters determine which tools from each server get exposed based on bundle, agent, user group, environment, or audience.

For example, a developer-tools bundle might include selected GitHub tools for repository and pull-request workflows, selected Jira tools for issue lookup and updates, selected observability tools for logs, metrics, and traces, selected code-search and documentation tools, and selected deployment or feature-flag tools. The agent connects to a single gateway URL representing the developer-tools endpoint. Behind this URL, the gateway fans out tools/list requests across servers in the bundle, applies authorization and tool filters, namespaces or aliases tool names where needed, and returns one coherent catalog. When the agent invokes tools/call, the gateway re-enforces policy, routes to the correct downstream server, and applies the appropriate credential model.

This approach delivers agents a product-quality interface rather than a raw dump of downstream capabilities. Benefits include approved tools, stable names, clearer descriptions, ownership metadata, and audience-specific bundles. Engineering, data analysis, support operations, and external bundles can all use the same gateway primitives while exposing different tool surfaces tailored to their needs.

The practical benefits are significant. Agent setup simplifies to configuring one gateway endpoint instead of many server endpoints. Tool discovery becomes safer because agents only see tools within approved boundaries. Model behavior improves because smaller catalogs reduce irrelevant choices and tool confusion—a critical point given how easily LLMs can become distracted by large option spaces. Authorization remains centralized with discovery and invocation enforcing consistent policies.

The case study notes that this is where the gateway transcends being merely an access proxy and becomes a shaping layer that controls what agents can discover, what they can call, and how much irrelevant context they must process. A well-curated tool surface can mean the difference between an agent that reliably picks the right tool and one that wanders through an oversized API catalog making poor choices.

## Observability, Cost Attribution, and Downstream Protection

Because every call flows through the gateway, each request can emit a structured event capturing the server, tool, bundle, and owning team; the user, agent, service, and platform involved; authorization results, status codes, error sources, and latency breakdowns; request and response sizes; and downstream-reported cost metadata when available.

The gateway also emits metrics for request volume, per-tool latency, authorization decisions, OAuth refresh outcomes, rate-limit decisions, streaming connections, and upstream failures. Trace propagation enables teams to follow calls from the agent through the gateway to downstream servers, providing end-to-end observability.

This observability infrastructure delivers direct operational value. Security teams can audit access patterns. Platform teams can identify noisy agents creating excessive load. Tool owners can monitor adoption and error rates. Infrastructure teams can attribute costs to specific agents, users, or workflows.

The same centralized position enables downstream system protection. Rate limits can be scoped by server, tool, caller, user, bundle, or caller type. New limits can run in shadow mode before enforcement, showing what would be rejected without disrupting production traffic. This transforms governance from something every team must implement correctly into structured data the platform automatically generates and enforces.

## Self-Service Onboarding

The case study emphasizes that a gateway only succeeds if teams prefer using it over direct connections. Registration, discovery, filtering, and bundle management must all be self-service to achieve adoption at scale.

Through the control-plane UI and API, teams can register MCP servers and agents, configure authentication, discover tools, attach ownership metadata, define filters, add tools to bundles, and inspect production usage. The onboarding loop follows a clear path: register the MCP server, discover its raw tool catalog through tools/list, select and approve the tools DoorDash wants to expose, attach auth mode, ownership, and policy, add approved tools to one or more bundles, and monitor traffic, latency, errors, authorization decisions, and costs.

The case study makes the important point that governance requiring tickets doesn't scale. The paved road must be easier than copying a secret into an agent and connecting directly to a server. This focus on developer experience is critical for platform adoption.

## Impact and Adoption

The gateway has achieved substantial adoption metrics that validate the approach. More than 200 MCP servers are registered behind the gateway, collectively exposing thousands of tools curated into approved, task-scoped subsets. More than 30 agents and services used by thousands of employees reach those tools through the gateway without handling raw credentials. Millions of tool calls every week route through the Agent Gateway, each authenticated, authorized, and recorded as a structured usage event. Onboarding is self-service and fast, with new MCP server registration taking minutes and pointing agents at already-registered tools happening even faster.

Different stakeholder groups receive distinct benefits. Agent builders get one integration, one curated catalog, and no downstream auth, OAuth, secret handling, or per-tool routing complexity. Tool owners get a managed distribution path with access control, approved tool exposure, and production usage data. Security teams get centralized policy, secrets, OAuth grants, revocation capabilities, and audit trails. Platform teams get leverage where identity, rate limiting, observability, tool quality, cost attribution, and builder experience all improve in one place. Agents themselves get smaller catalogs, clearer tool names, task-oriented bundles, fewer irrelevant choices, and recoverable connection flows.

## Lessons Learned and Critical Assessment

The case study offers several valuable lessons that extend beyond DoorDash's specific implementation. Most fundamentally, it demonstrates that MCP solves invocation but not governance—identity, policy, secrets, curation, observability, and revocation become the hard parts in production. This is a critical insight for the broader LLMOps community, as it highlights that standardizing the technical protocol for tool calling is necessary but far from sufficient for production deployments.

The treatment of discovered tool catalogs as interfaces with attention to names, descriptions, filtering, grouping, and audience represents sophisticated thinking about how to make agents effective in practice. The observation that bundles are the right unit for workflows—that agents need task-oriented toolkits rather than server lists—challenges common assumptions about how to organize agent capabilities.

The finding that tool filtering improves both security and agent quality by exposing smaller, clearer sets of actions validates the approach of treating context window optimization as a production concern, not just a cost optimization. The principle that credentials belong in the gateway where they can be rotated, audited, and revoked centrally rather than distributed to agents aligns with security best practices but requires infrastructure investment to implement properly.

The handling of missing OAuth grants as normal protocol states rather than exceptions—enabling connection flows to be integrated into the tool-calling experience rather than requiring pre-configuration—represents thoughtful user experience design that makes agents more practical for end users.

The insistence that governed paths must be self-service or teams will go direct acknowledges the reality of developer behavior and builds platform adoption requirements into the architecture from the start.

From a critical perspective, the case study is clearly written from DoorDash's engineering perspective to showcase their solution, so readers should consider what challenges aren't discussed. The text doesn't detail migration costs, what happened to agents built before the gateway existed, or how much work teams had to invest in refactoring existing integrations. There's no discussion of performance overhead introduced by the gateway layer, though with millions of weekly calls the impact appears acceptable. The text doesn't address failure modes—what happens when the gateway itself has issues, creating a single point of failure for all agent-tool access across the company.

The case study also doesn't discuss how they handle tool versioning and backward compatibility as MCP servers evolve, which could be complex with 200+ registered servers and 30+ agents. There's no mention of how they prevent or handle adversarial scenarios where an agent might try to exploit tool access, or how they validate that tool descriptions accurately represent tool behavior. The shadow mode for rate limiting suggests thoughtful rollout practices, but there's limited detail on other testing and validation approaches for gateway configuration changes.

## Future Directions

DoorDash identifies several future investment areas. The next major focus is stronger agent identity and user delegation, with a target model where every agent has a cryptographic identity and the gateway mints short-lived delegated credentials scoped to user, agent, task, and target tool. This would provide audit trails with two real principals—the user and the agent—enabling more granular attribution and accountability.

Additional planned investments include builder tooling such as quality and security report cards, checks for risky tool descriptions, detection of secrets or personally identifiable information in errors, scaffolded server creation, automatic registration, dynamic tool discovery, and redacted tool-call event streams for analytics and compliance.

Dynamic discovery represents a particularly interesting evolution. Instead of giving an agent every tool in a bundle, the gateway would use task context, policy, and usage signals to surface only tools likely to be useful for the current job. This suggests a move toward more intelligent, context-aware tool curation that could further reduce token consumption and improve agent focus.

## Conclusion

DoorDash's Agent Gateway case study represents a mature approach to production LLMOps for agent systems. It demonstrates how a well-designed infrastructure layer can address the gap between protocol standardization (MCP) and production requirements around security, governance, curation, and observability. The adoption metrics—200+ MCP servers, 30+ agents, millions of weekly calls, thousands of users—provide evidence that the approach scales and that teams prefer using the centralized platform over point-to-point integrations.

The emphasis on tool surface curation as a mechanism to improve both security and model performance is particularly valuable for the broader LLMOps community. The treatment of OAuth integration, credential management, and identity as platform capabilities rather than agent responsibilities establishes clear security boundaries. The self-service onboarding focus acknowledges that platform adoption depends on making the governed path easier than alternatives.

While the case study would benefit from more discussion of challenges, failure modes, and migration costs, it provides a valuable reference architecture for organizations building production agent systems that need to access diverse internal and external tools at scale.
