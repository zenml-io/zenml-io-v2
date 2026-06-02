---
title: "Agent Identity and Access Management for Production AI Systems"
slug: "agent-identity-and-access-management-for-production-ai-systems"
draft: false
llmopsTags:
  - "chatbot"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "mcp"
  - "kubernetes"
  - "monitoring"
  - "security"
  - "guardrails"
  - "databases"
  - "microservices"
  - "api-gateway"
  - "devops"
  - "orchestration"
  - "scalability"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Uber"
summary: "Uber faced critical challenges in implementing production AI agents at scale, specifically around identity attribution and audit trails when agents acted on behalf of users across multi-hop workflows. Traditional identity models designed for humans and workloads couldn't adequately describe agency relationships or preserve provenance across agent-to-agent interactions. In early 2025, Uber built an internal Agent platform and extended their Zero Trust Architecture to support AI agents by implementing a Security Token Service (STS) that issues short-lived, single-hop JWT tokens with full actor chain attribution, integrated with SPIRE for workload identity verification. The solution enables thousands of production agents to operate with complete traceability while maintaining sub-40ms P99 latency for token exchanges, providing comprehensive audit logs and fine-grained access control across agent workflows."
link: "https://www.uber.com/us/en/blog/solving-the-agent-identity-crisis/"
year: 2026
seo:
  title: "Uber: Agent Identity and Access Management for Production AI Systems - ZenML LLMOps Database"
  description: "Uber faced critical challenges in implementing production AI agents at scale, specifically around identity attribution and audit trails when agents acted on behalf of users across multi-hop workflows. Traditional identity models designed for humans and workloads couldn't adequately describe agency relationships or preserve provenance across agent-to-agent interactions. In early 2025, Uber built an internal Agent platform and extended their Zero Trust Architecture to support AI agents by implementing a Security Token Service (STS) that issues short-lived, single-hop JWT tokens with full actor chain attribution, integrated with SPIRE for workload identity verification. The solution enables thousands of production agents to operate with complete traceability while maintaining sub-40ms P99 latency for token exchanges, providing comprehensive audit logs and fine-grained access control across agent workflows."
  canonical: "https://www.zenml.io/llmops-database/agent-identity-and-access-management-for-production-ai-systems"
  ogTitle: "Uber: Agent Identity and Access Management for Production AI Systems - ZenML LLMOps Database"
  ogDescription: "Uber faced critical challenges in implementing production AI agents at scale, specifically around identity attribution and audit trails when agents acted on behalf of users across multi-hop workflows. Traditional identity models designed for humans and workloads couldn't adequately describe agency relationships or preserve provenance across agent-to-agent interactions. In early 2025, Uber built an internal Agent platform and extended their Zero Trust Architecture to support AI agents by implementing a Security Token Service (STS) that issues short-lived, single-hop JWT tokens with full actor chain attribution, integrated with SPIRE for workload identity verification. The solution enables thousands of production agents to operate with complete traceability while maintaining sub-40ms P99 latency for token exchanges, providing comprehensive audit logs and fine-grained access control across agent workflows."
notion:
  pageId: "372f8dff-2538-8087-a1c0-fbbfb7b11eca"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-01T11:10:00.000Z"
  lastEditedTime: "2026-06-01T11:10:00.000Z"
  publishedAt: "2026-06-02T07:04:10Z"
---

## Overview

Uber's case study presents a comprehensive approach to solving identity and access management challenges for production AI agents at scale. Published in May 2026, this technical implementation details how Uber addressed fundamental gaps in existing identity models when deploying autonomous AI agents that act on behalf of users and interact with thousands of microservices. The case study is particularly valuable as it describes a complete production architecture built in early 2025 and subsequently adopted by thousands of internal agents, offering real-world performance metrics and practical insights into the security and operational challenges of running agentic AI systems.

The core problem Uber identified was twofold: existing identity models couldn't adequately describe agency relationships where AI agents act on behalf of humans, and execution context was being dropped across multi-hop agent workflows, leading to incomplete audit trails and inability to enforce fine-grained access policies. This became apparent through scenarios like an on-call engineer using an Oncall Agent that delegated to an Investigation Agent, which then invoked a Monitoring Agent to open a pull request—with downstream systems only seeing generic service identities rather than the complete chain of accountability.

## Technical Architecture and Platform Foundation

Uber's solution builds on their existing Zero Trust Architecture and involves multiple integrated components working together to provide verifiable cryptographic identity throughout the agent ecosystem. The architecture centers around several key systems that mediate different aspects of agent interaction and security.

The **Agent Registry** serves as the source of truth for agent registrations, storing associations between AI agents and their underlying workloads. AI agents at Uber are deployed as workloads managed by Kubernetes, and the Michelangelo AI platform handles these associations. This registry becomes critical during token minting as it enables verification that a specific agent is authorized to run on a particular workload, preventing impersonation attacks.

The **AI Agent Mesh** represents the data plane where AI agents communicate with each other to complete assigned tasks. This is conceptually analogous to a service mesh but specifically designed for agent-to-agent interactions. Within this mesh and for outbound calls to MCP (Model Context Protocol) tools, agents rely on JWT tokens minted by the Security Token Service for authentication.

The **Security Token Service (STS)** acts as the central trust broker, dynamically issuing short-lived, scoped tokens for every hop in an agent workflow rather than relying on broad, long-lived service credentials. This design decision reflects a conscious choice to prioritize security and auditability over simplicity, with the understanding that the overhead must be kept minimal to support high-scale operations.

The **MCP Gateway** serves as a central mediation layer for calls from the AI Agent Mesh to Uber's internal systems. By positioning this as a policy enforcement point for MCP tool invocations, Uber can apply consistent security controls across all agent-to-system interactions. Once the gateway successfully authenticates the caller and authorizes the tool call, it securely proxies requests to downstream microservice APIs and datastores.

The **AI Gateway** mediates all outbound calls from AI agents to AI models, serving as the central integration point with external APIs from providers like OpenAI and Anthropic. Importantly, this gateway is integrated with security guardrails implemented through Uber's AI Guard system to detect and handle prompt injection, jailbreaks, content safety violations, PII redaction, and related concerns.

## Agent Development and Deployment Options

Uber's Michelangelo AI platform provides two pathways for building agentic solutions, reflecting a pragmatic approach to democratizing agent development while maintaining production standards. Engineers can write agents in Python using Uber's internal production SDK, which is orchestration-framework agnostic and supports common agent programming patterns including planning loops, tool use, state management, and memory. The SDK provides standardized scaffolding, middleware hooks, observability instrumentation, and evaluation tooling specifically designed for production deployments.

Alternatively, the platform offers a no-code option where users can author agents through a UI without writing code. This lowers the barrier to entry and extends agent development capabilities beyond the engineering organization to the broader company. Regardless of which option is chosen, the resulting AI agent gets deployed within Uber's Kubernetes infrastructure with consistent security and operational characteristics.

An interesting architectural consideration mentioned in the case study is that Uber initially considered building or adopting an agent gateway to proxy calls between AI agents. However, as their agentic AI ecosystem standardized heavily around the SDK, they instead integrated the solution directly into the SDK itself. This decision was driven by the recognition that fully addressing the provenance problem required support in the agent application layer where execution context is created and propagated end-to-end, rather than relying solely on an external proxy.

## Agent Identity Implementation

The agent identity solution leverages SPIRE (SPIFFE Runtime Environment) to provide cryptographically verifiable workload identities as the foundation for agent authentication. The SDK was updated to automatically fetch AI agent identity during runtime through a multi-step process that establishes both workload legitimacy and agent authorization.

When an agent needs to make a call, the workload first fetches its own cryptographically signed workload SVID (SPIFFE Verifiable ID) from SPIRE. This proves the legitimacy of the underlying compute environment but doesn't yet identify the specific agent. The SDK then uses metadata available locally (such as agent configuration), JWT from inbound calls, and outbound destination audience information to request a new JWT token from the STS, authenticated with the workload SVID.

Critically, only the STS is permitted to mint tokens for AI agents. By centralizing this process, Uber ensures that the actor chain carries a cryptographic record of every entity involved in the request. The STS integrates with the Agent Registry to verify that the requesting agent ID is explicitly authorized to run on that specific workload. This prevents a workload from attempting to impersonate an agent it isn't authorized to host. Upon successful verification, the STS mints a JWT token and returns it to the requesting agent for use in the next hop of the agentic flow.

The design incorporates several key security features. Tokens are single-hop and short-lived, intended for a specific audience claim with a time-to-live measured in minutes rather than hours or days. A token issued for Agent A to call Agent B cannot be intercepted and replayed to call a database or another service—it's valid only for that specific destination. This significantly reduces the blast radius of any potential token compromise.

The tokens embed full contextual attribution, with the STS managing token exchange at every step and embedding the fully attested actor chain into each token. This allows the MCP Gateway or downstream systems to see every participant in the lineage (such as "engineer to Oncall Agent to Investigation Agent") rather than just the immediate caller. This visibility enables comprehensive audit logs and advanced workflow authorization that accounts for the full request lineage.

The JWT structure is designed to be extensible, allowing Uber to seamlessly add additional claims in the future such as session identifiers and request intent-related information to provide richer context for policy decisions. This high-fidelity visibility ensures that a tool's execution can be authorized not just by the last hop, but by the verified intent of the entire chain.

## Production Workflow Example

The case study provides a detailed walkthrough of how agent identity manifests in a real-world multi-hop investigation flow. An on-call engineer (user1) initiates a session with the Oncall Agent, with the request anchored by the user's personnel identity. The Oncall Agent cannot reuse the user's raw credentials to call downstream services, so it contacts the Security Token Service, presenting its SPIRE-issued identity and the user's context to request a new JWT specifically scoped for the next-hop audience (Investigation Agent).

This per-hop token exchange mechanism is conceptually based on OAuth 2.0 Token Exchange (RFC 8693) but has been customized to transmit agent identity and provenance in a streamlined way that integrates with Uber's internal auditing and performance requirements. The Oncall Agent receives the JWT and sends it to the Investigation Agent, which verifies the signature and audience. To call the MCP Gateway, the Investigation Agent performs its own token exchange with the STS with the audience set as MCP Gateway.

The newly minted JWT carries a verifiable history of everyone involved: [user1, oncall-agent, investigation-agent]. The MCP Gateway receives and verifies this JWT, then enforces tool-level policies including tool access checks and redaction of sensitive data if needed, powered by AI Guard. Policies are defined based on internal risk classification and are mandated for systems considered high risk.

Having identity across the entire call chain enables the system to enforce policies flexible enough to evaluate both the personnel identity (the human initiator) and the agent identity (the acting logic) simultaneously. The case study notes that Uber is closely tracking emerging standards, particularly the IETF WIMSE working group drafts and relevant individual drafts such as "AI Agent Authentication and Authorization" (draft-klrc-aiagent-auth-01), to stay aligned with broader industry direction.

## Developer Experience and Migration Strategy

Recognizing that several agents had been built before the architecture was implemented, Uber faced the challenge of ensuring every agent consistently performs STS token exchanges and preserves the actor chain. Rather than relying on manual compliance, they shifted to an automated, secure-by-default developer experience through what they call a "paved path" approach.

They developed a Standardized A2A (Agent-to-Agent) Client built on top of the A2A protocol. This client automates the STS JWT exchange and propagation of the actor chain, ensuring the secure path is also the easiest path for developers to implement A2A calls. This is a crucial LLMOps insight: security and operational best practices must be made the path of least resistance, or they won't be consistently adopted in fast-moving development environments.

Uber is actively working with stakeholders to migrate existing use cases to use A2A clients through a phased approach that identifies legacy agent-to-agent calls and refactors them to use the standard A2A client. By providing dedicated support and testing guidelines, they ensure existing agents gain full lineage attribution and centralized auditability without disrupting current functionality.

## Observability and Production Performance

The observability system provides real-time, end-to-end visibility into agentic traffic, making complex multi-agent workflows transparent and auditable. By capturing each hop in the actor chain from the originating user through multiple agents and downstream tool invocations, the system enables precise attribution of actions along with associated authorization decisions and security context. This level of visibility is positioned as a top priority in a Zero Trust environment where every interaction must be authenticated, authorized, and continuously monitored.

A common concern with per-hop token exchange is the potential for increased latency. In Uber's high-scale environment where a single agentic task might involve dozens of tool calls and agent delegations, even a few milliseconds of overhead per hop could compound rapidly and degrade user experience. The case study provides concrete production metrics showing that P99 latency for the STS Token Exchange API is consistently below 40 milliseconds. This demonstrates that the security model maintains low latency under current load conditions, though Uber indicates they intend to continue scaling the system as agentic AI adoption grows.

The system has been adopted by thousands of internal agents, representing substantial production validation of the approach. All agent interactions are subject to standard security and governance controls including policy enforcement, monitoring, and audit logging to ensure safe and compliant operation.

## Critical Assessment and Limitations

While this case study presents a comprehensive and well-architected solution, several aspects warrant balanced consideration. The architecture is explicitly described as reflecting Uber's internal architecture and controlled production environments, with the acknowledgment that "design choices, performance characteristics, and security controls may vary across organizations, use cases, and deployment contexts." This is an important caveat—the solution is tightly coupled to Uber's existing infrastructure including SPIRE, Kubernetes, and their microservices architecture.

Organizations without similar infrastructure maturity or scale may find aspects of this approach overly complex for their needs. The centralization of token minting through the STS creates a critical dependency point that must be highly available and performant. While the 40ms P99 latency is impressive, the case study doesn't discuss failure modes, fallback strategies, or how the system behaves when STS is unavailable or degraded.

The migration strategy for existing agents suggests that achieving consistent adoption required dedicated effort and organizational coordination. The "paved path" approach through standardized A2A clients is pragmatic, but the case study doesn't detail how complete the migration is or what percentage of agent interactions now flow through the secure path versus legacy patterns.

The case study positions this work primarily within the "Identity & Trust Foundation" layer of a three-layer vision that includes Dynamic Access Control and a Unified Policy Enforcement Plane. This suggests the work described is foundational but not complete—the full vision for risk-adaptive policies and unified enforcement is framed as future work for 2026 and beyond.

## Future Direction and Industry Context

Uber frames their future direction in three layers: the Identity & Trust Foundation (the primary focus of this case study), Dynamic Access Control on top of that foundation, and a Unified Policy Enforcement Plane that enables observability and consistent business-level controls across tools, sessions, and protocols. The long-term vision is described as a cohesive architecture where identity, risk, and policy work together seamlessly to enable humans and AI agents to collaborate at machine speed while maintaining strong trust and security controls.

The acknowledgment that they're tracking emerging standards from IETF WIMSE and related drafts suggests Uber is balancing proprietary internal solutions with standards alignment, which is prudent for long-term maintainability and potential interoperability. However, the case study doesn't detail specific plans for standards adoption or how their customized token exchange approach might evolve to align with emerging industry consensus.

The integration with AI Guard for security guardrails (prompt injection detection, jailbreak prevention, content safety, PII redaction) represents another dimension of production LLM operations that intersects with but extends beyond the identity and access focus of this case study. The reference to a conference presentation about AI Guard suggests this is substantial parallel work that would merit its own detailed analysis.

## Production LLMOps Insights

This case study exemplifies several important LLMOps principles for production AI systems. First, it demonstrates that autonomous agents require fundamentally new identity and access patterns beyond traditional human and service account models—the agency relationship where AI acts on behalf of users creates unique attribution and auditability requirements. Second, it shows the value of building security and compliance capabilities into the platform layer rather than expecting every agent developer to implement them correctly. Third, it illustrates the importance of performance engineering even for infrastructure concerns like authentication—40ms token exchange latency at P99 enables the security model to be practical at scale. Fourth, it highlights that observability and audit logging aren't afterthoughts but core requirements for production agent systems that may need to explain "who did what, when and why" for compliance and incident response.

The architectural decision to integrate identity propagation directly into the SDK rather than relying solely on external proxies reflects pragmatic recognition that application-layer context is essential for complete provenance tracking. This suggests that LLMOps platforms need to think holistically about the integration points between infrastructure, frameworks, and application code rather than assuming clean separation of concerns is always optimal.
