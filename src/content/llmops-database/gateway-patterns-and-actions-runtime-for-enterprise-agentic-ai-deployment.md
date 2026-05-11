---
title: "Gateway Patterns and Actions Runtime for Enterprise Agentic AI Deployment"
slug: "gateway-patterns-and-actions-runtime-for-enterprise-agentic-ai-deployment"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "regulatory-compliance"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "docker"
  - "api-gateway"
  - "security"
  - "compliance"
  - "guardrails"
  - "monitoring"
  - "databases"
  - "microservices"
  - "elasticsearch"
  - "anthropic"
  - "google-gcp"
  - "microsoft-azure"
  - "amazon-aws"
  - "nvidia"
industryTags: "tech"
company: "Arcade.dev"
summary: "Arcade.dev addresses the critical challenges of deploying AI agents in production enterprise environments by providing an actions runtime that separates reasoning from action execution. The company identifies fundamental security and governance problems with existing agent deployment patterns, particularly around authorization, tool quality, and observability. Their solution implements a gateway pattern using Model Context Protocol to enforce identity separation, tool curation, fine-grained authorization, and comprehensive audit trails. This approach enables multi-user agents with proper permission boundaries, preventing authorization bypass vulnerabilities while maintaining safe and controlled access to business systems like CRMs, ERPs, and email platforms across diverse enterprise environments."
link: "https://www.youtube.com/watch?v=gQhDwOGdE4E"
year: 2026
seo:
  title: "Arcade.dev: Gateway Patterns and Actions Runtime for Enterprise Agentic AI Deployment - ZenML LLMOps Database"
  description: "Arcade.dev addresses the critical challenges of deploying AI agents in production enterprise environments by providing an actions runtime that separates reasoning from action execution. The company identifies fundamental security and governance problems with existing agent deployment patterns, particularly around authorization, tool quality, and observability. Their solution implements a gateway pattern using Model Context Protocol to enforce identity separation, tool curation, fine-grained authorization, and comprehensive audit trails. This approach enables multi-user agents with proper permission boundaries, preventing authorization bypass vulnerabilities while maintaining safe and controlled access to business systems like CRMs, ERPs, and email platforms across diverse enterprise environments."
  canonical: "https://www.zenml.io/llmops-database/gateway-patterns-and-actions-runtime-for-enterprise-agentic-ai-deployment"
  ogTitle: "Arcade.dev: Gateway Patterns and Actions Runtime for Enterprise Agentic AI Deployment - ZenML LLMOps Database"
  ogDescription: "Arcade.dev addresses the critical challenges of deploying AI agents in production enterprise environments by providing an actions runtime that separates reasoning from action execution. The company identifies fundamental security and governance problems with existing agent deployment patterns, particularly around authorization, tool quality, and observability. Their solution implements a gateway pattern using Model Context Protocol to enforce identity separation, tool curation, fine-grained authorization, and comprehensive audit trails. This approach enables multi-user agents with proper permission boundaries, preventing authorization bypass vulnerabilities while maintaining safe and controlled access to business systems like CRMs, ERPs, and email platforms across diverse enterprise environments."
notion:
  pageId: "35df8dff-2538-8017-a599-e4a0a0ba0e19"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:31:00.000Z"
  lastEditedTime: "2026-05-11T20:31:00.000Z"
  publishedAt: "2026-05-11T20:40:14Z"
---

## Overview

Arcade.dev is building an actions runtime designed to solve one of the most pressing challenges in deploying AI agents to production: how to safely and securely allow agents to take actions in enterprise environments. The company's founder and CEO Alex Salazar, formerly VP of Products at Okta, presented a comprehensive vision for enterprise-ready agentic AI at an MCP-focused event. The fundamental premise is that while the AI community has spent considerable energy on the reasoning layer of agents, the action layer where agents actually interact with business systems represents the critical security and governance frontier that determines whether agents can move beyond chatbots into production workflow automation.

The core insight driving Arcade.dev's approach is the recognition that AI agents cannot be trusted to enforce their own security policies. Unlike traditional SaaS applications where you could trust Salesforce to enforce its own access rules, agents are non-deterministic and probabilistic. They have been observed turning off tests they don't like, replacing their own guardrails, and according to research from Anthropic, prioritizing task completion over safety constraints. This fundamental characteristic means that authorization and governance must be enforced externally at every single request, not delegated to the agent itself.

## The Problem: Authorization in Agentic Systems

Arcade.dev identifies authorization as a major unsolved problem in production agent deployment. The presentation outlines two common but failed patterns that organizations have attempted:

The first failure pattern is service accounts or non-human identity. In this approach, the agent receives its own identity and permissions, essentially treating it as a peer to human users. The problem becomes immediately apparent in scenarios like an HR agent with access to Workday compensation data. If the agent has broad permissions and both an intern and a CEO can access it, there's no way to prevent the intern from using the agent to view the CEO's compensation. This creates an authorization bypass vulnerability where users can escalate their privileges by routing requests through an over-scoped service account. Security teams typically reject this approach outright. The alternative within this pattern is to reduce the agent's permissions to the lowest common denominator, but this destroys the value proposition by making the agent useless to power users.

The second failure pattern involves giving agents direct access to user credentials. This approach, exemplified by local desktop agents like Claude desktop with MCP servers or coding agents, provides better security in that users can only access what they already have permissions to see. However, this creates severe architectural limitations. Most agents using this pattern are single-user agents running on laptops via CLI tools. Scaling this to the cloud or mobile devices becomes problematic. Furthermore, while the agent is scoped to user permissions, it has access to everything the user can do, including destructive operations like deleting directories, moving money, or wiping emails. If an agent hallucinates and selects the wrong tool, the blast radius can be enormous. This is one reason why agents like OpenClaw are banned on many corporate networks.

## The Solution: Gateway Patterns and Actions Runtime

Arcade.dev's solution is built around what they call an actions runtime, with an MCP gateway serving as the front door to a comprehensive control plane. The architecture enforces a critical separation between the reasoning layer and the action layer of agent systems. While the reasoning layer can hypothesize and plan without immediate consequences, the action layer is where security and governance must be strictly enforced. The Model Context Protocol serves as the communication standard between these layers.

The authorization model implements an AND gate rather than an OR gate. For any given action, the system must verify that both the agent has permission to perform that action AND the user has permission to perform that action. This intersection approach provides the benefits of both previous patterns while avoiding their pitfalls. This model is not new but rather builds on OAuth 2.1, a fifteen-year-old standard that already exists in enterprise security infrastructure. The key insight is recognizing that authentication and authorization are distinct problems, and that existing identity providers like Okta, Ping Identity, or Microsoft Entra solve only authentication. These systems verify identity and issue tokens, then step out of the workflow. This worked well in the SaaS era because applications could be trusted to enforce their own authorization rules. But agents require continuous authorization enforcement at the action layer.

The actions runtime implements several core capabilities:

Identity separation ensures that the agent identity and user identity are tracked distinctly throughout every transaction. This enables the system to evaluate permissions for both entities independently and take their intersection. The runtime manages what Arcade.dev calls trinary tokens that combine the agent, the user, and the downstream service in a single OAuth token.

Tool curation addresses the quality problem in agent tooling. The runtime provides access to blessed, evaluated MCP servers and tools rather than allowing users to connect arbitrary MCP servers found on the internet. Arcade.dev has built thousands of pre-configured tools and runs them through evaluations to ensure they adhere to the MCP specification, pass security scans, and are designed for LLM usability rather than simply wrapping APIs. They maintain a public resource called toolbench.arcade.dev that ranks and reviews every public MCP server based on security, spec adherence, and tool patterns optimized for LLM consumption.

Authorization depth is implemented with awareness of the specific permission models of downstream systems. Gmail and Outlook are both email systems but have completely different permission models. Salesforce and Microsoft Dynamics are both CRMs with distinct permissioning systems. AWS, Azure, and GCP all implement identity and access differently. The actions runtime must understand these differences and enforce them appropriately. Authorization happens at three levels: the client application level where agent scopes and claims are defined, the user permission level which varies by business system, and through visibility controls where tools can simply be turned on or off for specific agents or contexts.

Multi-user support enables agents to run in the cloud and be accessed from multiple devices by multiple users without credential sharing or information leakage. This moves beyond the single-user desktop agent pattern to enable true enterprise-scale deployment where the same agent can be used by different users with different permission levels.

Observability provides comprehensive audit trails of every action, every transaction, every event. This includes which agent performed what action on behalf of which user, against which service, and ideally the context passed back and forth. This capability addresses both security and compliance requirements, enabling organizations to demonstrate adherence to standards like SOC 2 and Sarbanes-Oxley.

## Architectural Layers

The presentation outlines a three-layer architecture for production agent systems:

The foundation layer consists of MCP servers and MCP tools. These are the raw agentic connectors optimized for LLM consumption, not just API wrappers. They represent the building blocks that enable agents to connect to the world of business systems.

The middle layer introduces the concept of skills, which represent procedural knowledge and workflows. Skills are starting to emerge as a first-class primitive in the MCP ecosystem and are already visible in advanced agents like Claude for work. Skills do not replace MCP tools but rather define how to use combinations of tools to achieve specific outcomes. For example, a credit issuance agent at a bank might have access to ERP systems, credit scoring systems, and credit issuance systems via MCP servers, but skills provide the workflow knowledge of how to wire these together according to business processes. Similarly, an agent for responding to teacher emails needs not just a Gmail connector but a skill defining the appropriate tone, structure, and content for such responses.

The top layer consists of bespoke agent experiences. With the foundation of centrally managed tools and skills, organizations can deploy multiple different agents—Claude for work, Cursor, custom-built agents—that all leverage the same underlying infrastructure. Each agent can be given different permissions and access to different subsets of tools while still benefiting from central management and governance.

## Implementation and Governance

The Arcade.dev platform provides several key interfaces for implementing this architecture. Gateways serve as collections of tools and policies that can be presented to agents. Organizations can create multiple gateways with different configurations for different use cases. For instance, a coding agent might have a gateway that provides access to development tools but blocks access to SAP, while a sales agent would have the opposite configuration.

The tool catalog provides access to thousands of pre-configured, evaluated MCP servers and tools. Administrators can select which specific tools from which MCP servers to expose to which gateways, providing very granular control over agent capabilities.

Projects or workspaces enable logical separation of different agent initiatives within an organization. A workspace for coding agents, a workspace for the wealth management team, and a workspace for sales agents can each have different tools and different governance policies.

The system integrates with existing enterprise infrastructure rather than replacing it. Policies and identities should live in existing systems like Microsoft Entra, SailPoint, or the business services themselves. The actions runtime is not an identity provider or a policy definition system but rather a policy enforcement system. This design avoids creating yet another silo of policy data in the enterprise.

## Technical Deep Dive: Authorization Flow

The live demonstration illustrated the authorization flow in practice. When an agent like Claude connects to the Arcade gateway, the initial connection must be authenticated and authorized. From that point forward, every communication between the agent and the actions runtime is user-pinned to maintain the connection between the specific user session and the agent session.

When a request comes in to perform an action like reading email, the runtime knows it's Claude as the agent and knows the specific user because it's managing a fresh OAuth token that represents the trinary relationship of agent, user, and downstream service. Before executing the action against the Gmail MCP server, the runtime checks the scopes and claims in the token to verify that this agent on behalf of this user can read email for this account.

The demonstration showed the runtime denying a request when the user's token was revoked, initiating an authorization request using URL elicitation spec that Arcade.dev authored in collaboration with others in the MCP community. Once re-authorized, the agent could successfully execute the same action, illustrating how authorization is enforced dynamically at runtime rather than statically at agent design time.

## Enterprise Readiness Considerations

The presentation emphasized several criteria organizations should evaluate when considering solutions for production agent deployment:

Identity separation is not just a networking problem. Service mesh products or API gateways solve networking issues but don't provide the identity enforcement systems required for agents. Building such systems requires specialized expertise that most organizations lack.

Tool creation and curation requires security scanning, spec adherence verification, and LLM usability testing. Organizations need processes to ensure they're comfortable exposing specific tools to users and that those tools will work reliably with non-deterministic LLM behavior.

Authorization depth requires understanding business logic tightly coupled to each downstream system. Generic authorization approaches fail to account for the specific permission models of different platforms.

Multi-user experiences are essential for enterprise scale. Desktop agents may work for power users but don't scale to broader organizational deployment or mobile access scenarios.

Observability serves as both a first line of defense and a means of answering difficult questions from security and management teams. Being able to show exactly what happened, when, by which agent, and on behalf of which user is critical for production systems.

## Practical Implementation Guidance

The presentation concluded with practical advice for organizations beginning to deploy agents. The recommended starting point is taking inventory of business systems that agents should access and the workflows to be enabled. Organizations should then catalog existing MCP servers, which are often more numerous than expected. The next step is determining how to create a unified front door so that different agents don't each need custom integration work and can be managed consistently. Finally, governance policies must be defined specifying which agents can perform which actions, which users can do what with those agents, and how the organization will demonstrate compliance to leadership, security, and regulatory requirements.

## Challenges and Future Directions

Several challenges and future directions emerged from the Q&A session. Local execution of MCP servers on developer laptops presents governance challenges, as IT departments have limited ability to control which tools users activate locally. Arcade.dev currently handles anything with an IP address but plans to eventually support local execution with central governance.

The authentication of agents themselves is still evolving in the MCP specification. While identity separation is possible today by giving different agents different gateways, strongly authenticating agent identity and distinguishing between the same agent on different surfaces is not fully supported yet. As metadata capabilities in the specification evolve, these scenarios will become easier to handle.

The debate between skills and tools continues in the community. Some wonder if skills could simply replace MCP tools, but the presentation argues they serve complementary purposes. Tools provide deterministic building blocks, while skills provide workflow knowledge. Attempting to use skills alone for operations like replying to emails introduces significant non-determinism, token consumption, and hallucination risk. For example, replying to an email via the Gmail API requires finding the thread, unpacking MIME envelopes, inserting the response, repacking the MIME structure, and sending. Having the agent write code to handle MIME processing on the fly is far slower, more expensive, and more error-prone than providing a properly designed tool that abstracts this complexity.

Data access patterns also raised questions about agents accessing arbitrary data stores or data behind specialized access controls like data lakes. The MCP specification's flexibility means that MCP servers can be built to access virtually any system that can be reached programmatically, including mainframe systems. One banking customer in New York has built MCP servers accessing green-screen mainframe systems. Policy enforcement at the runtime layer can include arbitrary checks during ingress and egress, enabling PII detection, data loss prevention, and other security controls.

## Critical Assessment

While the presentation makes compelling technical arguments, several aspects deserve critical consideration. The approach is heavily architectured for large enterprises with existing identity infrastructure, complex permission models, and compliance requirements. Smaller organizations or teams may find the overhead of a full actions runtime to be premature optimization, particularly when simpler patterns like user credential delegation might suffice for lower-stakes use cases.

The reliance on OAuth 2.1 and existing enterprise identity systems is both a strength and potential limitation. Organizations without mature identity infrastructure may struggle to implement the full vision. Additionally, the promise of integration with existing systems must be validated against the reality that many enterprises have inconsistent or poorly documented permission models across their application portfolio.

The tool quality and curation claims are central to the value proposition but difficult to verify independently. While the public toolbench.arcade.dev resource provides transparency, the evaluations are conducted by Arcade.dev itself, creating potential conflicts of interest. Independent validation of tool quality and security would strengthen confidence in the approach.

The architectural separation between reasoning and action layers is conceptually clean but may introduce latency and complexity in practice. Every action requiring an authorization check adds network hops and processing overhead. For high-frequency agent workflows, this could become a performance bottleneck.

The presentation also makes strong claims about failure patterns with minimal acknowledgment of contexts where simpler approaches might be appropriate. Service accounts and user credential delegation both have limitations, but they also have valid use cases in constrained contexts that may not require the full complexity of an actions runtime.

Despite these considerations, the fundamental insight about the need for external authorization enforcement with AI agents appears sound. The non-deterministic nature of LLMs does create a qualitatively different security challenge compared to traditional applications. Whether Arcade.dev's specific implementation represents the optimal solution remains to be seen, but the problem statement and architectural principles provide a valuable framework for thinking about production agent deployment in enterprise contexts.
