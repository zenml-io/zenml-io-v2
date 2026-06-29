---
title: "Kubernetes-Native Secure Execution Platform for Autonomous AI Agents"
slug: "kubernetes-native-secure-execution-platform-for-autonomous-ai-agents"
draft: false
llmopsTags:
  - "chatbot"
  - "code-generation"
  - "high-stakes-application"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "redis"
  - "cache"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Grab"
summary: "Grab, Southeast Asia's leading superapp, developed Palana, a Kubernetes-native secure execution platform designed to enable autonomous AI agents to operate in production environments while maintaining strict isolation, identity, and auditability controls. The platform addresses the fundamental challenge of allowing AI agents to perform useful work in real environments without exposing critical credentials or allowing unauthorized network access. Palana treats each agent as an isolated namespace with default-deny network policies, proxies all egress traffic, mediates LLM access through a centralized gateway, and separates credential access from credential usage through a novel proxy-only secrets architecture. The platform has enabled teams at Grab to deploy agents for diverse use cases including Slack-native task handlers, remote development environments, operational monitoring agents, and agent swarms, all while maintaining security boundaries and full auditability."
link: "https://engineering.grab.com/part-2-palana-architecture"
year: 2026
seo:
  title: "Grab: Kubernetes-Native Secure Execution Platform for Autonomous AI Agents - ZenML LLMOps Database"
  description: "Grab, Southeast Asia's leading superapp, developed Palana, a Kubernetes-native secure execution platform designed to enable autonomous AI agents to operate in production environments while maintaining strict isolation, identity, and auditability controls. The platform addresses the fundamental challenge of allowing AI agents to perform useful work in real environments without exposing critical credentials or allowing unauthorized network access. Palana treats each agent as an isolated namespace with default-deny network policies, proxies all egress traffic, mediates LLM access through a centralized gateway, and separates credential access from credential usage through a novel proxy-only secrets architecture. The platform has enabled teams at Grab to deploy agents for diverse use cases including Slack-native task handlers, remote development environments, operational monitoring agents, and agent swarms, all while maintaining security boundaries and full auditability."
  canonical: "https://www.zenml.io/llmops-database/kubernetes-native-secure-execution-platform-for-autonomous-ai-agents"
  ogTitle: "Grab: Kubernetes-Native Secure Execution Platform for Autonomous AI Agents - ZenML LLMOps Database"
  ogDescription: "Grab, Southeast Asia's leading superapp, developed Palana, a Kubernetes-native secure execution platform designed to enable autonomous AI agents to operate in production environments while maintaining strict isolation, identity, and auditability controls. The platform addresses the fundamental challenge of allowing AI agents to perform useful work in real environments without exposing critical credentials or allowing unauthorized network access. Palana treats each agent as an isolated namespace with default-deny network policies, proxies all egress traffic, mediates LLM access through a centralized gateway, and separates credential access from credential usage through a novel proxy-only secrets architecture. The platform has enabled teams at Grab to deploy agents for diverse use cases including Slack-native task handlers, remote development environments, operational monitoring agents, and agent swarms, all while maintaining security boundaries and full auditability."
notion:
  pageId: "38ef8dff-2538-8065-938c-dfe3b7f5f34d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-29T15:11:00.000Z"
  lastEditedTime: "2026-06-29T15:11:00.000Z"
  publishedAt: "2026-06-29T15:15:20Z"
---

## Overview

Grab, Southeast Asia's leading superapp serving over 900 cities across eight countries, has developed Palana, a production-grade Kubernetes-native platform specifically designed for deploying and managing autonomous AI agents in secure, isolated environments. This case study represents Part 2 of a two-part series published in June 2026, focusing on the architectural implementation and operational lessons learned from running AI agents at scale. The platform addresses a critical challenge in LLMOps: how to enable AI agents to perform meaningful work in production environments while maintaining strict security boundaries, credential isolation, and full auditability of all actions.

The fundamental problem Palana solves is that AI agents are most valuable when they can act in real environments with access to production services, APIs, and data, but this is precisely when they become most risky. Traditional approaches to running workloads don't adequately address the unique security challenges posed by autonomous agents that can make tool calls, access services, and use credentials in ways that are difficult to predict or constrain at the prompt level alone. Palana's design philosophy centers on treating isolation as the unit of trust and implementing security controls at the platform layer rather than relying solely on prompt-level guardrails or model policies.

## Architectural Foundation

Palana's architecture is built around a core request path that strictly mediates all forms of agent interaction with external systems. Each agent runs in a dedicated Kubernetes pod within a namespace that is owned by exactly one user and one agent instance. This namespace isolation provides a consistent boundary for applying role-based access control (RBAC), storage policies, network restrictions, logging labels, resource quotas, and lifecycle management.

The network architecture implements a default-deny approach where agent namespaces are locked down to only the platform services they explicitly need. DNS resolution is controlled, and all network access must go through approved pathways. Browser traffic from human users enters through Traefik, an ingress controller that handles routing and provides OAuth2-Proxy integration for authentication. LLM traffic is routed to a LiteLLM wrapper service running in a dedicated gateway namespace. General HTTP and HTTPS egress traffic must transit through a proxy namespace where Open Policy Agent (OPA) evaluates application-level policies. Secrets are stored in HashiCorp Vault and are only accessible to the specific components authorized to use them, never directly to the agent runtime environment.

The platform uses a custom Kubernetes operator that transforms high-level user requests into the concrete Kubernetes resources needed to run an agent securely. When a user creates an agent through either the command-line interface (pcli) or the web portal, Palana writes a UserAgent or Agent custom resource that captures the raw user identity. The operator then provisions all necessary infrastructure: user and agent namespaces, service accounts with appropriate bindings, persistent storage volumes, network policies, and ingress rules. Admission webhooks inject proxy configuration environment variables and enforce pod-level security restrictions automatically during deployment.

## Identity and Authentication Architecture

Palana's approach to identity management is notable for its careful separation between human authentication, agent identity, and authorization subjects. Human users authenticate via Concedo OpenID Connect (OIDC) integration. The pcli tool performs a browser-based authorization code flow with Proof Key for Code Exchange (PKCE) and stores the resulting identity credentials in an isolated kubeconfig file. When users access agent user interfaces through their browsers, OAuth2-Proxy protects access via Traefik forward authentication, ensuring that only authorized users can interact with their agents.

A critical design decision in Palana is maintaining the raw user identity (such as an email address) as the authoritative owner field on custom resources. This raw identity is used directly for Kubernetes RBAC subject matching in authorization decisions. Sanitized versions of the identity are generated only where Kubernetes object naming constraints, label restrictions, namespace naming rules, or Vault path requirements demand safer string representations. This architectural split prevents a common class of identity bugs where display-safe or path-safe transformations of user identifiers accidentally become the authorization subject, potentially creating security vulnerabilities or access control bypasses.

Looking forward, Grab plans to integrate Palana with SPIFFE (Secure Production Identity Framework for Everyone) and SPIRE (SPIFFE Runtime Environment) to provide agentic identity—a composite identity combining both the user identity and the specific agent instance identifier. This will enable more nuanced "agents on behalf of users" scenarios where agents can operate with a restricted subset of their user's capabilities, providing a foundation for more sophisticated delegation patterns as industry standards around OAuth and other agent authorization mechanisms mature.

## Secrets Management and Credential Isolation

One of Palana's most innovative architectural features is its approach to secrets management, which fundamentally separates the concept of "an agent can read a credential" from "an agent can cause a credentialed request to be made." The platform uses HashiCorp Vault with a carefully designed path structure that implements least-privilege access patterns. Secrets are organized into two distinct categories with separate Vault paths: `kv/agents/{user}/{agent}/{secret}` for secrets the agent is allowed to read directly through its per-agent Vault role, and `kv/proxy-secrets/{user}/{agent}/{secret}` for credentials that the agent can only use indirectly through approved proxy paths.

For proxy-only secrets, Palana can create agent-visible placeholder values that look like valid tokens or credentials to the agent code but are actually inert unless the request transits through the approved proxy infrastructure. This design gives teams a practical migration path for existing applications: client code can often be configured with what appears to be a valid API token, while Palana keeps the real credential completely outside the agent's runtime environment, filesystem, process environment variables, logs, and prompt context.

This architectural choice is described in the case study as one of the highest-leverage design decisions in the entire platform. It enables agents to perform authenticated work against external services and APIs without turning the agent environment into a credential store that could be compromised through prompt injection, tool misuse, or other attack vectors. The proxy-only secrets pattern provides defense-in-depth by ensuring that even if an agent is fully compromised, the attacker cannot extract production credentials for use outside the controlled proxy environment.

## LLM Access Gateway

Palana implements centralized control over all LLM access through a custom component called `litellm-proxy-wrapper`, which sits in front of LiteLLM and Grab's internal LLM service called GrabGPT. This wrapper derives agent identity from Kubernetes service account context rather than trusting any client-provided headers or authentication tokens, preventing agents from impersonating other agents or accessing LLM quotas they aren't entitled to.

Once the agent identity is established, the wrapper looks up the per-agent GrabGPT credential from Vault dynamically and forwards the request to the appropriate upstream route with proper authentication. Agents are configured to use internal base URLs like `http://litellm-proxy.gateway:4000/aws/v1` or `http://litellm-proxy.gateway:4000/unified/v1`, which resolve to the gateway service within the Kubernetes cluster.

This architecture provides three important properties for LLMOps at scale. First, agents never need to possess raw upstream LLM provider credentials, eliminating a significant credential exposure risk. Second, all LLM traffic is automatically attributable to a specific agent instance, enabling precise quota management, cost allocation, and usage auditing. Third, the routing logic and credential handling for different LLM providers can evolve centrally in the gateway without requiring changes to individual agent configurations or redeployment of agent workloads. This abstraction layer is particularly valuable in an environment where LLM provider landscape is rapidly evolving and organizations frequently need to shift between different models or providers.

## Network Access Control

Palana implements network access control using a defense-in-depth approach that combines Layer 3/4 controls with Layer 7 application-aware policy enforcement. At the lower network layers, Kubernetes NetworkPolicy and Cilium enforce which pods can communicate with which namespaces, services, and CIDR blocks. Agent namespaces receive highly restrictive default policies that only permit communication with the specific platform services they require: DNS resolution, Vault access, the egress proxy, the LLM gateway, and narrowly scoped Kubernetes API patterns that the platform explicitly supports.

At Layer 7, the egress proxy implements HTTP and HTTPS destination control based on host, method, path, and agent identity. Open Policy Agent (OPA) evaluates per-agent policies expressed in a declarative format, making allow/deny decisions that are logged in structured form for audit and investigation. The proxy logs capture sufficient detail to reconstruct the complete context of each decision: which agent attempted to access which destination, what policy was evaluated, and whether the request was allowed or denied.

This split between network-layer containment and application-layer policy is described as deliberate and complementary. NetworkPolicy is excellent at preventing agents from being used as pivots into the broader internal network infrastructure—by default, agents get no network connectivity except to explicitly allowed platform services. The HTTP/HTTPS proxy is better suited for expressive, application-aware decisions and detailed audit trails. This layered approach allows operators to be extremely restrictive: agents receive only the specific access they need, cannot reach arbitrary internal services, and cannot be exploited as entry points into sensitive internal environments.

## Observability and Operational Intelligence

Palana treats observability as a first-class component of the security model rather than an operational afterthought. The platform emits structured logs for all significant events including proxy policy decisions, Git repository activity, LLM requests, agent lifecycle transitions, and idle-shutdown determinations. Operations teams can query this telemetry by namespace, user identity, destination host, policy decision outcome, or platform component, enabling rapid investigation during incidents and comprehensive audit reviews.

One concrete example of operational intelligence is the idle shutdown system. Long-running agents provide value by maintaining state and being instantly available, but idle workloads consume cluster resources and expand the attack surface that platform teams must monitor. Palana's reaper component records the most recent observable activity timestamp for each UserAgent by combining signals from multiple sources: gateway and proxy access logs, Git repository commits and pulls, agent messages routed through Slack, and Prometheus network activity metrics. After an agent has been idle for a configurable threshold period, the platform can warn the user and ultimately stop the workload while preserving all persistent state including the `/data` volume, RBAC bindings, namespace configuration, and Vault secrets. This embodies the platform philosophy of "stop the compute, keep the state, and make resumption easy."

Grab is also leveraging Palana's rich observability data to build agentic operations capabilities. They have developed an operational monitoring agent that analyzes user agent workloads and proactively provides advice when it detects issues. For example, if a user's agent consistently encounters out-of-memory (OOM) errors, the ops agent can detect this pattern in Palana logs and automatically message the user with instructions on how to increase allocated memory. This represents a shift from special-casing every possible operational issue to having agents that understand Palana's log schema and can communicate directly with users to resolve problems, demonstrating how LLMOps platforms can use LLMs to improve their own operations.

## User Experience and Developer Workflow

Despite the extensive security controls, Palana prioritizes making the secure path also the easy path. The platform provides a simple command-line interface (pcli) and web portal that abstract away the complexity of Kubernetes RBAC, Vault policy syntax, network policies, and proxy configuration. The basic workflow for getting started is deliberately minimal: users log in, create an agent with a name, add any required secrets, and run either a pre-built template or custom container image. Behind these simple commands, Palana provisions the entire isolated execution environment including namespace, service account, storage, ingress, egress policies, secrets access, and lifecycle management.

The case study emphasizes that if the secure path requires every team to learn Terraform, deep Vault policy syntax, Kubernetes RBAC internals, and proxy configuration before they can experiment with an agent, teams will find workarounds that bypass the security controls entirely. Palana's design recognizes that security controls are only effective if they're actually used, and they're only used if they're the path of least resistance for developers. Templates provide pre-configured environments for common use cases, while still allowing full customization for specialized needs.

## Key Lessons for LLMOps

The case study shares several important lessons learned from putting Palana into production that have broader applicability to LLMOps practices. First, agent platforms need security controls at the platform layer, not just at the prompt level. While prompt-level guardrails and model-level policies are useful, they are insufficient because agents call tools, tools call services, and services use credentials. Effective security must be enforced where actions cross trust boundaries: identity verification, egress control, secrets access, ingress authentication, Git operations, and Kubernetes API interactions.

Second, user experience matters as much as control mechanisms in determining whether a secure platform will actually be adopted. If the approved path is significantly more difficult than alternatives, teams will route around it, creating shadow IT and security gaps. Third, the separation between "can read a credential" and "can cause a credentialed request" through proxy-only secrets is described as one of the highest-leverage design choices, enabling authenticated work without credential exposure.

Fourth, using namespace boundaries as the fundamental isolation unit is simple conceptually but compounds in value because it provides a consistent place to apply RBAC, storage policies, network restrictions, logging labels, resource quotas, and lifecycle controls. During incidents, the response pattern is straightforward: identify the namespace, identify the owner, inspect the applied policies, and isolate if needed. Finally, long-running agents need comprehensive lifecycle management beyond just "run a container"—users need resume semantics, operators need idle cleanup, security teams need audit history, and platform teams need mechanisms to rotate credentials, update images, and stop workloads externally when necessary.

## Production Use Cases and Future Direction

Palana has evolved from a platform for running individual isolated agents to a substrate for larger autonomous systems. Emerging usage patterns include supervisor systems that route work to pools of scoped agents, Slack-native agents that wake up on demand to handle tasks and then scale down, remote development environments backed by persistent cloud state, agent swarms where each worker has separate namespace and credential scope, operational agents that investigate platform health and propose or apply small fixes under policy, and security experiments around supply chain monitoring, token rotation, TLS inspection, and automated isolation.

The stated "north star" for the platform is explicitly not "let every agent do anything." Instead, the goal is to make useful autonomy boring to operate by ensuring that all agent activity is attributable to specific identities, inspectable through comprehensive logging, revocable through policy changes, and recoverable if something goes wrong. This reflects a mature understanding that production AI agent systems need to balance capability with control, and that the most sustainable path forward is building platforms where safety and auditability are defaults rather than afterthoughts.

Looking forward, Grab expects the underlying tools, models, and agent frameworks to continue evolving rapidly, but believes the platform primitives are more durable. Regardless of what specific LLM or agent framework is used, agents will continue to need a place to run, a way to authenticate, boundaries around their actions, and comprehensive records of what happened. Palana is positioned to provide these foundational capabilities as the agent ecosystem matures, offering a practical reference architecture for organizations building production LLMOps platforms that must balance innovation velocity with security, compliance, and operational sustainability requirements.
