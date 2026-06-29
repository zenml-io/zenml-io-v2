---
title: "Building a Secure Kubernetes Platform for Autonomous AI Agents"
slug: "building-a-secure-kubernetes-platform-for-autonomous-ai-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "memory"
  - "harness-engineering"
  - "prompt-engineering"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "devops"
  - "security"
  - "guardrails"
  - "langchain"
  - "postgresql"
  - "redis"
  - "cache"
  - "anthropic"
industryTags: "tech"
company: "Grab"
summary: "Grab built Palana, a Kubernetes-native platform for running autonomous AI agents safely in production. As AI agents moved from experimental IDE plugins to long-running workloads that can access APIs, credentials, repositories, and internal services, Grab faced the challenge of providing teams with self-service agent deployment while maintaining security controls over identity, secrets, network access, and operational visibility. Palana addresses this by providing isolated namespaces per agent, proxy-mediated egress with policy enforcement, credential injection without exposing secrets to agents, structured audit logging, and emergency kill switches. The platform currently runs hundreds of agents including remote development environments, Slack automation, and long-running task agents, enabling teams to experiment with autonomous agents while maintaining enterprise security and compliance requirements."
link: "https://engineering.grab.com/palana-part-1-secure-platform-for-ai-agents"
year: 2026
seo:
  title: "Grab: Building a Secure Kubernetes Platform for Autonomous AI Agents - ZenML LLMOps Database"
  description: "Grab built Palana, a Kubernetes-native platform for running autonomous AI agents safely in production. As AI agents moved from experimental IDE plugins to long-running workloads that can access APIs, credentials, repositories, and internal services, Grab faced the challenge of providing teams with self-service agent deployment while maintaining security controls over identity, secrets, network access, and operational visibility. Palana addresses this by providing isolated namespaces per agent, proxy-mediated egress with policy enforcement, credential injection without exposing secrets to agents, structured audit logging, and emergency kill switches. The platform currently runs hundreds of agents including remote development environments, Slack automation, and long-running task agents, enabling teams to experiment with autonomous agents while maintaining enterprise security and compliance requirements."
  canonical: "https://www.zenml.io/llmops-database/building-a-secure-kubernetes-platform-for-autonomous-ai-agents"
  ogTitle: "Grab: Building a Secure Kubernetes Platform for Autonomous AI Agents - ZenML LLMOps Database"
  ogDescription: "Grab built Palana, a Kubernetes-native platform for running autonomous AI agents safely in production. As AI agents moved from experimental IDE plugins to long-running workloads that can access APIs, credentials, repositories, and internal services, Grab faced the challenge of providing teams with self-service agent deployment while maintaining security controls over identity, secrets, network access, and operational visibility. Palana addresses this by providing isolated namespaces per agent, proxy-mediated egress with policy enforcement, credential injection without exposing secrets to agents, structured audit logging, and emergency kill switches. The platform currently runs hundreds of agents including remote development environments, Slack automation, and long-running task agents, enabling teams to experiment with autonomous agents while maintaining enterprise security and compliance requirements."
notion:
  pageId: "38ef8dff-2538-8085-856f-d4af3f0a2fa2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-29T15:11:00.000Z"
  lastEditedTime: "2026-06-29T15:11:00.000Z"
  publishedAt: "2026-06-29T15:14:58Z"
---

## Overview

Grab, Southeast Asia's leading superapp company, developed Palana as a secure execution platform for autonomous and semi-autonomous AI agents running in production. This case study represents a sophisticated approach to operationalizing AI agents at enterprise scale, addressing the critical gap between experimental AI tooling and production-ready infrastructure. The platform was built by Grab's CyberSecurity team and is currently supporting hundreds of active agents across various use cases including development environments, Slack automation, OpenClaw workers, and long-running internal systems.

The fundamental problem Grab identified was that the first wave of AI coding tools lived primarily on developer laptops as IDE plugins or command-line assistants. While this model was easy to adopt, it created significant limitations for enterprise deployment. Long-running agents require persistent state management, team workflows need shared access through collaboration platforms, security teams need granular inspection and control capabilities, and platform teams need comprehensive lifecycle management and audit trails. The question became how to enable agents to perform useful work within the corporate environment without treating each new agent as a bespoke infrastructure project requiring custom security reviews and deployment procedures.

## Technical Architecture and Core Components

Palana takes a Kubernetes-native approach, building on top of standard Kubernetes primitives while adding specialized layers for agent workload management. At its core, the platform provides isolated Kubernetes namespaces for each agent, complete with role-based access control (RBAC), resource quotas, network policies, and scoped storage. This isolation model treats each agent as a separate trust boundary, ensuring that agents cannot see each other's pods, secrets, or filesystem state by default. Inter-agent communication is possible but requires explicit peering rules rather than relying on ambient pod-to-pod connectivity.

The platform offers both command-line interface (pcli) and web portal experiences for creating, running, stopping, configuring, and inspecting agents. Each agent receives persistent `/data` storage allowing long-running agents to preserve memory, caches, repositories, and session state across restarts. This addresses one of the key limitations of laptop-based agent deployments where state is lost when machines sleep or network connections change. The platform supports both browser-based and shell access for interactive workloads, accommodating various agent frameworks including Claude Code UI, OpenCode, IDEs, ttyd, and SSH-backed development flows.

## LLM Access and Routing

A critical component of Palana's architecture is its approach to LLM access management. Rather than allowing agents to directly call LLM APIs with embedded credentials, Palana routes LLM access through a LiteLLM wrapper that dynamically injects per-agent GrabGPT credentials retrieved from Vault. This pattern ensures that credentials are never embedded in agent code or configuration files, reducing the risk of credential leakage through prompt injection attacks, dependency compromises, or accidental logging.

The LiteLLM integration provides a standardized interface for accessing multiple LLM providers while maintaining consistent authentication, authorization, and auditing capabilities. This abstraction layer also enables centralized monitoring of LLM usage patterns, cost tracking, and rate limiting across all deployed agents, which are essential capabilities for managing LLM operations at scale.

## Credential Management and Security Model

One of Palana's most distinctive design decisions is its handling of credentials. The platform implements a two-tier secret management system that fundamentally changes the security model for agent workloads. Traditional application hosting typically provides credentials to workloads as environment variables or mounted files, which creates significant risk for agent workloads that may execute untrusted code, install packages, or expose web interfaces.

Palana distinguishes between agent-readable secrets and proxy-only secrets. Agent-readable secrets live under the agent's own Vault path and are available only to that specific agent's service account for cases where the agent genuinely needs direct access. However, for most external service integrations, Palana uses proxy-only secrets that are never exposed to the agent process itself. Instead, the agent references placeholder tokens like `TOKEN_GITHUB_PAT` or `TOKEN_GRABGPT_API_KEY` in its configuration or requests. When an outbound request travels through the proxy infrastructure, the proxy layer retrieves the actual credential from Vault and replaces the placeholder with the real token before forwarding the request to the external service. The remote service receives a valid credential, but the agent process never has access to the underlying secret.

This credential isolation pattern is particularly important for protecting against prompt injection attacks, where a malicious actor might attempt to manipulate an LLM-powered agent into revealing its credentials. It also protects against dependency compromise scenarios where a malicious package installed by the agent could attempt to exfiltrate secrets from the environment. By keeping credentials outside the agent's memory space and process boundary, Palana significantly reduces the attack surface.

## Network Control and Egress Management

Rather than blocking network access entirely, Palana makes egress traffic observable and policy-mediated through a sophisticated proxy architecture. Agent pods automatically receive proxy configuration, and all external HTTP and HTTPS traffic flows through Envoy proxies. The Envoy layer integrates with an ext-authz-proxy component that performs several critical functions: identifying the calling pod, evaluating policy rules using Open Policy Agent (OPA), logging structured request data, and optionally injecting credentials as described above.

For HTTPS traffic, Palana can terminate connections using a man-in-the-middle (MITM) approach with a platform-managed certificate authority distributed to agent pods. This enables header inspection and credential replacement even for encrypted connections, though this design choice reflects a tradeoff between security visibility and the complexities of SSL inspection. The proxy architecture enables the platform to answer questions that normal Kubernetes networking cannot address alone: which specific agent made a request, which user owns that agent, what host and method were requested, whether the request was allowed or denied by policy, which placeholder credentials were replaced, and whether the request targeted internal services, LLM gateways, GitLab, or the public internet.

The use of Open Policy Agent for egress policy enforcement provides flexibility in defining rules based on agent identity, destination, request method, and other contextual factors. This allows security teams to implement fine-grained controls such as allowing certain agents to access specific API endpoints while denying access to others, or restricting certain types of requests based on time of day or user role. The structured logging of all egress traffic provides an audit trail essential for security investigations and compliance requirements.

## Operational Controls and Agent Lifecycle Management

Palana's design assumes that agents might become confused, compromised, or uncooperative, and therefore operational controls must remain outside the agent process itself. The platform uses Kubernetes operators to reconcile namespaces and policies, ensuring that the desired state is maintained even if an agent attempts to modify its own environment. The proxy infrastructure controls egress independently of agent cooperation. The portal and pcli tools manage lifecycle operations from outside the agent runtime.

Critically, the platform implements kill switches enforced through network policy modifications rather than relying on agents to cooperate with shutdown requests. There's an important distinction here between a feature that asks an agent to stop and a safety control that removes the agent's network connectivity regardless of agent behavior. Additionally, Palana includes idle shutdown capabilities managed by separate reaper CronJobs that can terminate agents that have been inactive for specified periods, helping to manage resource utilization and reduce security exposure from forgotten or abandoned agent instances.

The platform represents agents as custom Kubernetes resources, allowing the operator pattern to reconcile namespaces, RBAC rules, storage volumes, services, ingress configurations, and network policies. This Kubernetes-native approach provides multiple interaction layers: simple workflows through pcli or the portal for everyday users, direct access to underlying Kubernetes objects for advanced operators debugging issues, and infrastructure-as-code capabilities for deploying and managing the platform itself.

## Use Cases and Production Workloads

Palana supports several distinct categories of production AI agent workloads. The original motivation came from security research, specifically the need to run and investigate OpenClaw and related agent frameworks without exposing the broader internal network or placing raw credentials inside agent runtimes. This security research use case drove many of the containment-focused design decisions.

However, the platform quickly expanded to support developer productivity scenarios. Cloud development environments accessible from browsers or SSH clients provide consistent, managed environments for development work. Fast prototyping and testing of agentic workloads in secure environments enable experimentation without compromising security. Slack-connected agents handle various automation tasks and assistant workflows. Long-running task agents like Hermes, Matlock, Butler, and custom team automations perform ongoing work that spans days or weeks, maintaining context and state across restarts. The platform also supports higher-order systems where agentic supervisors launch or route work to scoped agents, enabling more complex agent orchestration patterns.

## Design Principles and Tradeoffs

The architecture reflects several key design principles that shaped implementation decisions. Isolation is treated as the unit of trust, with each agent receiving its own namespace, service account, storage, network policy, and Vault scope. This approach means the platform doesn't need to assume that every agent framework has perfect multi-tenant isolation internally. A framework designed as a single-user assistant can be hosted safely by giving each user or worker its own Palana boundary, essentially outsourcing the isolation problem to the platform layer.

The principle that credentials should never be given directly to agents represents a significant departure from traditional application deployment patterns and reflects the unique security challenges of agent workloads. Similarly, treating egress as a control point rather than a binary allow/deny decision provides the observability and policy enforcement needed to manage autonomous systems safely.

The insistence that control planes must stay outside the agent acknowledges the reality that agents may not always behave as expected, whether due to bugs, prompt injection, or other issues. The use of Kubernetes primitives where they fit provides operational benefits like leveraging existing tooling, operational expertise, and infrastructure patterns while adding specialized agent-specific capabilities on top.

## Critical Assessment and Considerations

While the blog post presents Palana as a successful platform currently running hundreds of agents, it's important to note that this is promotional content from Grab's engineering blog and may present an optimized view of the system. Several aspects warrant balanced consideration.

The MITM approach to HTTPS inspection for credential injection, while providing strong security benefits, introduces complexity and potential trust issues. Organizations must carefully consider whether SSL interception aligns with their security model and compliance requirements. The approach requires distributing the platform's certificate authority to all agent pods and maintaining that trust infrastructure.

The overhead of providing isolated namespaces, persistent storage, proxy infrastructure, and monitoring for each agent represents a significant resource commitment compared to simply running agents as processes or containers without these controls. Organizations must evaluate whether this overhead is justified for their use cases and scale. For small-scale deployments or less sensitive use cases, simpler approaches might be more appropriate.

The platform's Kubernetes-native design provides significant benefits but also creates dependencies on Kubernetes expertise and infrastructure. Organizations without existing Kubernetes investments would face substantial adoption barriers. The custom resource definitions, operators, and specialized tooling create a platform-specific abstraction that teams must learn and maintain.

The blog post doesn't discuss performance implications of routing all egress traffic through proxy infrastructure with policy evaluation, credential injection, and logging. In high-throughput scenarios or latency-sensitive applications, these additional hops could impact agent performance. Similarly, the structured logging of all network activity could generate substantial data volumes requiring storage and analysis infrastructure.

The proxy-only credential pattern, while providing strong security properties, limits certain agent architectures that might legitimately need direct access to credentials for operations that don't flow through HTTP/HTTPS proxies. The text mentions Git access flows through a bastion path, suggesting additional infrastructure is needed to support different access patterns beyond the HTTP proxy model.

## LLMOps Maturity and Best Practices

Despite these considerations, Palana represents a sophisticated approach to several critical LLMOps challenges. The platform addresses identity and authorization for AI agents in a way that maintains audit trails and accountability. The credential management approach specifically tackles the prompt injection and credential leakage risks that are particularly relevant for LLM-powered agents. The observability infrastructure with structured logging of LLM calls, API requests, and Git operations provides the visibility needed to debug issues and investigate security incidents.

The self-service model with appropriate guardrails reflects mature platform thinking: making the secure path also the easy path increases adoption and reduces shadow IT risks. The kill switch and idle shutdown capabilities demonstrate recognition that agent lifecycle management is a first-class operational concern, not an afterthought.

The platform's support for long-running agents with persistent state addresses a real gap in the ecosystem. Many agent frameworks assume ephemeral execution contexts, but production use cases often require maintaining context over extended periods. Palana's persistent storage and state management enable agents to function more like traditional services than one-off scripts.

The isolation model allows organizations to experiment with various agent frameworks and models without needing to trust each framework's internal security model. This is particularly valuable given the rapid evolution of agent frameworks and the varying maturity levels of security considerations in the open-source agent ecosystem.

In summary, Palana represents a comprehensive approach to operationalizing AI agents in enterprise environments, addressing security, observability, lifecycle management, and developer experience in an integrated platform. While the implementation complexity and resource overhead are significant, the platform tackles genuine challenges in running autonomous AI agents safely at scale. The blog post is part one of a series, with part two promising deeper architectural details on agent lifecycle orchestration, LLM routing implementation, and operational visibility mechanisms.
