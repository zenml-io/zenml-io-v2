---
title: "Adopting Model Context Protocol (MCP) in Financial Services for AI System Integration"
slug: "adopting-model-context-protocol-mcp-in-financial-services-for-ai-system-integration"
draft: false
llmopsTags:
  - "fraud-detection"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "chatbot"
  - "question-answering"
  - "data-analysis"
  - "rag"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "api-gateway"
  - "microservices"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "monitoring"
  - "fastapi"
  - "documentation"
  - "open-source"
  - "anthropic"
industryTags: "finance"
company: "Evergreen Wealth / Bloomberg / Saxo Bank"
summary: "Three financial services organizations—Evergreen Wealth, Bloomberg, and Saxo Bank—discuss their rapid adoption of Model Context Protocol (MCP) for integrating AI systems with backend data and services in highly regulated environments. The organizations use MCP primarily as an internal protocol layer to connect agentic AI systems to diverse data sources, boost developer productivity, and deliver customer-facing AI services while navigating stringent security, compliance, and regulatory requirements. Despite MCP being only 10 months old at the time of discussion, all three organizations have already deployed production systems leveraging the protocol, with use cases ranging from personalized financial advice engines to internal productivity tools, while working through challenges around authentication, authorization, entitlement management, and versioning in regulated settings."
link: "https://www.youtube.com/watch?v=gkPr538mJd0"
year: 2026
seo:
  title: "Evergreen Wealth / Bloomberg / Saxo Bank: Adopting Model Context Protocol (MCP) in Financial Services for AI System Integration - ZenML LLMOps Database"
  description: "Three financial services organizations—Evergreen Wealth, Bloomberg, and Saxo Bank—discuss their rapid adoption of Model Context Protocol (MCP) for integrating AI systems with backend data and services in highly regulated environments. The organizations use MCP primarily as an internal protocol layer to connect agentic AI systems to diverse data sources, boost developer productivity, and deliver customer-facing AI services while navigating stringent security, compliance, and regulatory requirements. Despite MCP being only 10 months old at the time of discussion, all three organizations have already deployed production systems leveraging the protocol, with use cases ranging from personalized financial advice engines to internal productivity tools, while working through challenges around authentication, authorization, entitlement management, and versioning in regulated settings."
  canonical: "https://www.zenml.io/llmops-database/adopting-model-context-protocol-mcp-in-financial-services-for-ai-system-integration"
  ogTitle: "Evergreen Wealth / Bloomberg / Saxo Bank: Adopting Model Context Protocol (MCP) in Financial Services for AI System Integration - ZenML LLMOps Database"
  ogDescription: "Three financial services organizations—Evergreen Wealth, Bloomberg, and Saxo Bank—discuss their rapid adoption of Model Context Protocol (MCP) for integrating AI systems with backend data and services in highly regulated environments. The organizations use MCP primarily as an internal protocol layer to connect agentic AI systems to diverse data sources, boost developer productivity, and deliver customer-facing AI services while navigating stringent security, compliance, and regulatory requirements. Despite MCP being only 10 months old at the time of discussion, all three organizations have already deployed production systems leveraging the protocol, with use cases ranging from personalized financial advice engines to internal productivity tools, while working through challenges around authentication, authorization, entitlement management, and versioning in regulated settings."
notion:
  pageId: "352f8dff-2538-80c9-a4ed-deae0053f96b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:13:00.000Z"
  lastEditedTime: "2026-04-30T13:13:00.000Z"
  publishedAt: "2026-04-30T13:17:08Z"
---

## Overview

This case study presents a roundtable discussion featuring three financial services organizations—Evergreen Wealth, Bloomberg, and Saxo Bank—that have adopted Model Context Protocol (MCP) for production AI systems despite the protocol being only 10 months old. The discussion provides valuable insights into how regulated industries are navigating the challenges of deploying agentic AI systems while maintaining strict security, compliance, and regulatory standards.

Brian Godwin, CTO at Evergreen Wealth, an online digital investment advisor serving affluent families, describes their use of MCP for what they call "Evergreen Intelligence," their AI advice engine. Sambhub, head of AI productivity at Bloomberg, focuses on making AI systems fast and safe to deploy to production. Peter, a principal developer at Saxo Bank, builds both internal and customer-facing AI systems for the investment bank's online trading and investment platform.

## Technical Implementation Approaches

### Evergreen Wealth's Architecture

Evergreen Wealth has built a custom MCP gateway that serves as the core integration layer for their AI advice engine. The system combines multiple data sources including a knowledge base, real-time market data from various sources, and continuously updated personalized financial information for individual clients. The architecture treats MCP strictly as internal tooling, not exposing the protocol directly to end users.

Their security model reflects defense-in-depth principles appropriate for financial services. They implement a zero-trust, least-privileged architecture where all LLM-generated content is treated as untrusted. Critically, they never provide the LLM direct access to session tokens or sensitive authentication credentials. This approach allows them to leverage MCP's integration capabilities while maintaining strict security boundaries. The gateway architecture provides a controlled chokepoint where security policies can be enforced consistently across all AI-driven interactions with backend systems and customer data.

### Bloomberg's Three-Tier Adoption Pattern

Bloomberg's adoption of MCP has matured across three distinct use cases, each at different stages of development. The most mature use case treats MCP as a plug-and-play layer for building agentic systems. Bloomberg draws an analogy between MCP and HTTP for the web—just as HTTP enabled a handful of browser clients to connect to countless websites, MCP enables their agentic systems to connect to Bloomberg's vast array of internal services and data sources. The tools functionality within MCP has been particularly valuable for this integration layer.

The second use case focuses on developer productivity, which started later than the agentic systems work but has experienced rapid adoption. This represents the traditional use case for MCP in code completion and development assistance scenarios.

The third and least mature area involves direct exposure of MCP servers to clients and external systems. Bloomberg acknowledges significant work remains in this area, particularly around guardrails, access control, versioning, and change management before they would be comfortable with broader external exposure.

### Saxo Bank's Integration Strategy

Saxo Bank saw MCP as addressing a critical need from the protocol's initial announcement: connecting their extensive data repositories, systems, and deep domain knowledge with AI capabilities. They are building both internal productivity-focused MCP servers and customer-facing integrations. The bank emphasizes that MCP fills a gap in tying together existing resources with AI systems in a standardized way.

## Security and Compliance Challenges in Regulated Environments

The discussion reveals several layers of security and compliance complexity that extend beyond typical enterprise AI deployments. These challenges are particularly acute in financial services due to regulatory oversight and contractual obligations.

### Authentication and Authorization Complexity

A fundamental challenge identified is the nondeterministic nature of LLM-based systems accessing data that users may or may not be entitled to view. In financial institutions, entitlements are highly granular—front office employees may have access to data that back office staff absolutely cannot access, even within the same organization. When an agent or chat application accesses data through MCP servers, user entitlements must be carried throughout the entire call chain along with user identity, not just the agent's identity.

This creates a complex identity propagation problem. The system must ensure that when an MCP server returns data, the authorization decision reflects the actual human user's permissions, not just the agent application's permissions. Furthermore, these entitlements don't just govern data access at the MCP server level but must also control how that data is subsequently used to derive answers and generate responses.

### Compliance and Data Redistribution

Financial institutions face contractual limitations on data redistribution that differ significantly from copyright law considerations. These obligations are unambiguous—organizations know exactly what they're contractually permitted to do with third-party data. This creates requirements for citations and attributions that go beyond what can be achieved through prompt engineering alone. The system must guarantee compliance, not merely encourage it through prompting.

This has implications for how MCP servers handle and tag data, how responses are constructed, and how the system maintains an audit trail of data provenance throughout the processing pipeline. The nondeterministic nature of LLM outputs makes this particularly challenging, as organizations cannot simply rely on the model to properly cite sources—they need architectural guarantees.

### Protocol-Level Security Perspective

Peter from Saxo Bank offers a pragmatic perspective on MCP security: MCP is fundamentally a protocol, and organizations still need to build secure, compliant services and infrastructure regardless of the protocol in use. As long as MCP supports OAuth and other necessary security mechanisms, organizations can apply their existing expertise in building secure services. MCP doesn't undermine security—it simply provides a new way to do what organizations are already good at.

This framing is important because it shifts the conversation from "Is MCP secure?" to "How do we build secure systems using MCP?" The latter is a more productive question that leverages existing organizational capabilities while addressing MCP-specific considerations.

## Developer Experience and Velocity

Multiple participants emphasized the velocity improvements MCP provides, particularly for organizations with diverse technology stacks. The availability of SDKs in multiple languages allows developers to write MCP integrations in their preferred or existing stack. Peter specifically noted the value of the C# SDK, enabling C# developers at Saxo Bank to build AI integrations without needing to become Python experts.

This polyglot support has important organizational implications. Rather than requiring AI integration work to be concentrated in a small team of Python specialists, MCP enables broader engineering teams to contribute to AI system development. This distributed capability can significantly accelerate AI adoption across an organization.

Evergreen Wealth, as a startup, highlighted the fast velocity they achieved using MCP to connect to various resources. For a smaller organization, MCP's standardization reduces the overhead of building custom integrations for each data source or service, allowing faster time-to-market for AI-enabled features.

## Tool Design and Observability Requirements

Brian from Evergreen Wealth identified tool selection and tool description as having huge impacts on system performance. Minor changes in tool descriptions or metadata provided to the LLM about available tools and their usage can dramatically affect results. This highlights the importance of careful prompt engineering at the tool definition level, not just at the user interaction level.

This observation underscores a critical need for observability and evaluation infrastructure. Organizations need quantitative ways to measure the impact of changes to tool definitions, ensuring that modifications actually improve performance rather than degrading it. Without proper observability, teams are essentially flying blind when tuning their AI systems.

Bloomberg's interest in structured outputs from MCP servers relates directly to this need for verification and control. Structured outputs make it easier to verify what's coming out of MCP servers and ensure responses conform to expected shapes. While tools typically benefit from flexibility allowing LLMs to interpret responses in natural language, structured outputs provide the predictability and verifiability required for production systems in regulated environments.

## Protocol Evolution and Requirements

The discussion revealed several areas where financial services organizations are pushing for MCP enhancements to better support their use cases.

### Structured Outputs and Determinism

Structured outputs in recent MCP versions have been particularly valuable for Bloomberg, enabling easier verification of MCP server responses and ensuring outputs conform to expected formats. This feature was critical for Bloomberg's migration from their original internal protocol to MCP. While flexibility is generally desirable for LLM interpretation, structured outputs provide the control and predictability required for production deployment in regulated settings.

### Asynchronous and Long-Running Operations

Bloomberg expressed strong interest in long-running and async tools and workflows, particularly for agentic use cases. Many financial operations involve complex, multi-step processes that may not complete immediately. Supporting asynchronous patterns at the protocol level would better align MCP with real-world financial workflows.

### Model and Agent Awareness

A particularly interesting requirement is model or agent awareness for tool outputs. Bloomberg would like the ability to customize tool descriptions, input parameter descriptions, and outputs based on the specific LLM interacting with the MCP server. Additionally, they want to pin or version manage these customizations.

This requirement stems from the need for controlled, predictable behavior in production systems. In financial services, systems must do exactly a defined set of things, and any change must be vetted and approved before rollout. While dynamically changing tools and outputs is attractive from a developer experience perspective, it's problematic for production agents that need to pass rigorous evaluation tests and maintain consistent behavior.

### Statelessness and Scalability

Saxo Bank emphasized the importance of statelessness for scaling MCP deployments. To achieve horizontal scalability, organizations need to connect any client to any MCP server without concerns about session affinity or sticky connections. Any protocol features that move toward statelessness are valuable for production-scale deployments.

Related to this, there's interest in HTTP-only versions of the protocol. Building strictly on REST API technology would simplify security and compliance conversations, as organizations have decades of experience securing HTTP-based services and can apply established patterns and tooling.

### Versioning and Change Management

The need for versioning and change management runs throughout the discussion, particularly for customer-facing or production-critical systems. Financial organizations need the ability to lock down exactly which version of which MCP servers are available to which agents, with controlled rollout of changes through proper evaluation and approval processes.

## Industry Collaboration and Standards

Bloomberg announced the formation of a financial services interest group under the MCP open source project, recognizing that while many organizations are building layers on top of MCP to meet financial services requirements, not all of these extensions belong in the core specification. However, there's a clear need for consistency and interoperability across the financial services industry.

This industry-specific working group approach is a mature response to the tension between general-purpose protocol design and industry-specific requirements. Rather than either fragmenting into incompatible extensions or forcing every financial services requirement into the core protocol, the interest group provides a forum for financial institutions to collaborate on shared requirements and potentially develop standardized extensions or best practices.

## Deployment Patterns and Maturity

The organizations represent different points on the maturity spectrum. Evergreen Wealth, as a startup, is moving quickly to deploy customer-facing AI features using MCP as an internal integration layer. Bloomberg and Saxo Bank, as larger established institutions, are taking more graduated approaches with clear distinctions between internal use, productivity tools, and customer-facing features.

All three organizations emphasized using MCP primarily as an internal protocol initially. This represents a pragmatic risk management approach—internal deployments allow organizations to gain experience with the technology, build out supporting infrastructure for security and observability, and understand operational characteristics before exposing MCP servers externally.

The external use case, where MCP servers might be exposed to partners or certain client types, represents a more complex scenario with different security considerations. Without control over the client-side system prompt or user behavior, organizations need additional guardrails and controls before being comfortable with external exposure.

## Evaluation and Testing

The emphasis on evaluation infrastructure reflects the maturity of these organizations' approaches to production AI. Bloomberg specifically mentioned the need for "very good evaluation systems to check whether agents are conforming to the basic set of tests that you expect them to conform to." This is essential when shipping production agents with defined, controlled behavior.

Evergreen Wealth's focus on quantitative measurement of changes reflects similar thinking. Without proper evaluation frameworks, organizations cannot confidently iterate on their AI systems, as they lack objective measures of whether changes improve or degrade performance.

## Critical Assessment

Several aspects of this discussion warrant balanced consideration. First, all three organizations are clearly enthusiastic early adopters of MCP, which may introduce some bias in their assessments. The discussion format—a promotional roundtable at what appears to be an MCP-focused event—creates an environment where participants are likely to emphasize successes and positive aspects rather than failures or significant obstacles.

The claim that financial services, typically slow to adopt new technologies, is "moving pretty quickly" with MCP should be qualified. These three organizations represent early adopters within the industry, not the industry as a whole. Many financial institutions are likely taking much more conservative approaches or have not yet begun MCP adoption.

The security and compliance challenges discussed are real and significant, but the discussion sometimes glosses over the difficulty of actually solving these problems. For example, while participants acknowledge the need for identity propagation and entitlement management throughout the call chain, they don't detail how they've actually implemented these controls or what trade-offs were involved.

The emphasis on MCP as "just a protocol" that doesn't change fundamental security requirements is both accurate and somewhat dismissive of the novel challenges that agentic AI systems introduce. While it's true that organizations can apply existing security expertise, the nondeterministic nature of LLM-based systems, the potential for prompt injection, and the complexity of tool-based architectures do introduce new attack surfaces and security considerations that may not be fully addressed by traditional approaches.

Finally, the discussion reveals that even these leading organizations are still working through fundamental challenges around versioning, change management, external exposure, and evaluation. The technology is clearly still maturing, and production deployment at scale in regulated environments remains an evolving practice rather than a solved problem.
