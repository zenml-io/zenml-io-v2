---
title: "Implementing MCP Remote Server for CRM Agent Integration"
slug: "implementing-mcp-remote-server-for-crm-agent-integration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68e3781d878de12a8d91faaa"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:21:35.893Z"
  createdOn: "2025-10-06T08:04:45.243Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "code-generation"
  - "data-analysis"
  - "data-cleaning"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "a2a"
  - "mcp"
  - "microservices"
  - "api-gateway"
  - "fastapi"
  - "open-source"
  - "documentation"
  - "security"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "microsoft-azure"
  - "cloudflare"
  - "hugging-face"
industryTags: "tech"
company: "HubSpot"
summary: "HubSpot built a remote Model Context Protocol (MCP) server to enable AI agents like ChatGPT to interact with their CRM data. The challenge was to provide seamless, secure access to CRM objects (contacts, companies, deals) for ChatGPT's 500 million weekly users, most of whom aren't developers. In less than four weeks, HubSpot's team extended the Java MCP SDK to create a stateless, HTTP-based microservice that integrated with their existing REST APIs and RPC system, implementing OAuth 2.0 for authentication and user permission scoping. The solution made HubSpot the first CRM with an OpenAI connector, enabling read-only queries that allow customers to analyze CRM data through natural language interactions while maintaining enterprise-grade security and scale."
link: "https://stackoverflow.blog/2025/09/16/what-an-mcp-implementation-looks-like-at-a-crm-company/"
year: 2025
seo:
  title: "HubSpot: Implementing MCP Remote Server for CRM Agent Integration - ZenML LLMOps Database"
  description: "HubSpot built a remote Model Context Protocol (MCP) server to enable AI agents like ChatGPT to interact with their CRM data. The challenge was to provide seamless, secure access to CRM objects (contacts, companies, deals) for ChatGPT's 500 million weekly users, most of whom aren't developers. In less than four weeks, HubSpot's team extended the Java MCP SDK to create a stateless, HTTP-based microservice that integrated with their existing REST APIs and RPC system, implementing OAuth 2.0 for authentication and user permission scoping. The solution made HubSpot the first CRM with an OpenAI connector, enabling read-only queries that allow customers to analyze CRM data through natural language interactions while maintaining enterprise-grade security and scale."
  canonical: "https://www.zenml.io/llmops-database/implementing-mcp-remote-server-for-crm-agent-integration"
  ogTitle: "HubSpot: Implementing MCP Remote Server for CRM Agent Integration - ZenML LLMOps Database"
  ogDescription: "HubSpot built a remote Model Context Protocol (MCP) server to enable AI agents like ChatGPT to interact with their CRM data. The challenge was to provide seamless, secure access to CRM objects (contacts, companies, deals) for ChatGPT's 500 million weekly users, most of whom aren't developers. In less than four weeks, HubSpot's team extended the Java MCP SDK to create a stateless, HTTP-based microservice that integrated with their existing REST APIs and RPC system, implementing OAuth 2.0 for authentication and user permission scoping. The solution made HubSpot the first CRM with an OpenAI connector, enabling read-only queries that allow customers to analyze CRM data through natural language interactions while maintaining enterprise-grade security and scale."
---

## Overview

HubSpot, a customer relationship management (CRM) platform, implemented a remote Model Context Protocol (MCP) server to enable AI agents to interact with their CRM data in production. This case study, presented through a podcast interview with Karen Ng (EVP of Product at HubSpot), provides insight into the practical challenges and decisions involved in deploying MCP servers at scale for a large SaaS platform with millions of users.

The project was driven by the emergence of MCP as a potential standard for agent-to-system communication in the AI era. HubSpot's team recognized a critical moment when OpenAI adopted MCP, followed within 48 hours by Microsoft and Google. This convergence of major players adopting the protocol signaled to HubSpot that MCP could become the standard way for AI agents to access external data sources, similar to how REST APIs became standard in the cloud era.

## Strategic Context and Decision Making

Karen Ng brought a unique perspective to this initiative, having previously worked on programming language standards (specifically C# at Microsoft before its release). She drew parallels between the evolution of programming language standards and the emergence of protocols for AI systems. In the cloud era, REST APIs emerged because microservices needed standardized ways to communicate. Similarly, the AI era requires protocols for agents to access context, tools, and data.

HubSpot discovered that 75% of their customers already use ChatGPT, making it strategically important to meet users where they are. The goal was to become the first CRM with a connector to OpenAI's ChatGPT, enabling seamless interaction between the AI assistant and CRM data. This required building infrastructure that could serve both technical developers and non-technical business users.

## Technical Implementation

### Build vs. Buy Decision

HubSpot evaluated multiple options including off-the-shelf solutions from vendors like Cloudflare that had commoditized MCP server products. However, they chose to build their own implementation for several critical reasons:

- **Speed to market**: They needed to move at "AI speed" and determined they could build faster than going through vendor approval processes
- **Integration requirements**: The solution needed to work seamlessly with HubSpot's existing enterprise RPC system
- **Security and authentication**: They required specific OAuth implementations that weren't fully supported in available solutions
- **Customization needs**: Their use case required extending the Java MCP SDK to support HTTP streaming protocols

The team ultimately delivered the connector in less than four weeks, making HubSpot the first CRM to implement this capability.

### Architecture Decisions

HubSpot built their remote MCP server as a Dropwizard microservice within their standard Java stack. Key architectural choices included:

**Stateless Design**: They implemented the server as stateless with short-lived HTTP requests rather than long-ranging server-sent event connections. This decision was driven by their existing infrastructure patterns and concerns about managing long-lived connections at scale. The stateless approach also aligned with their microservices architecture and made the system easier to scale horizontally.

**HTTP Streaming Protocol**: The team extended the Java MCP SDK to support streamable HTTP transport, which was necessary for their use case but not originally part of the SDK. They contributed these changes back to the open source project.

**MCP Gateway with Auto-discovery**: They built an MCP gateway that automatically discovers tools across services, providing a centralized point for managing MCP capabilities across their platform.

**Annotation System**: To simplify the process of exposing Java RPC methods as MCP tools, they created an annotation system. This allowed developers to describe methods in a way that could be easily translated to MCP tool specifications.

### Authentication and Authorization Challenges

One of the most significant challenges was that the MCP specification at the time didn't fully address authentication and authorization. HubSpot needed to ensure that users could only access CRM data they had permissions to view. Their approach included:

- **OAuth Implementation**: They used OAuth 2.0 for authentication (though they noted that Anthropic's MCP spec supports OAuth 2.1, while OpenAI's spec required 2.0)
- **User Permission Mapping**: They mapped OAuth scopes to HubSpot seat tiers and user permissions
- **Enterprise Security**: Implementation of 2021 private keys and other enterprise security measures

The team had to navigate inconsistencies between different MCP implementations, including debates over seemingly trivial issues like snake_case versus camelCase naming conventions, which indicated the protocol was still in early stages.

### API Layer and Data Access

The implementation built on top of HubSpot's existing REST APIs, specifically their CRM search API. They created two different remote MCP servers:

- One exposing core raw APIs for CRM objects (contacts, companies, deals)
- Another using an OpenAI-specific MCP spec with search and fetch components for the connector

Both versions were built on their existing REST API infrastructure, allowing them to leverage mature, tested endpoints while providing a new interface layer for AI agents.

## Use of AI Tools in Development

Interestingly, HubSpot used AI tools to accelerate their own MCP server development. Specifically:

**Claude Code for Schema Generation**: They used Claude Code (an AI coding assistant) to generate templated versions of schemas and tool descriptions from the initial spec. This significantly accelerated development when working against a specification that wasn't yet fully released.

**Rapid Prototyping**: The use of AI-assisted coding tools allowed them to quickly iterate on implementations and generate boilerplate code, which was particularly valuable given the tight four-week timeline.

This represents a form of "meta-AI" development where AI tools are used to build infrastructure that will enable other AI systems.

## Production Considerations and Scale

### Read-Only Implementation

The initial deployment was deliberately read-only. This conservative approach provided several benefits:

- **Reduced risk**: No possibility of agents accidentally modifying or corrupting CRM data
- **Simplified architecture**: Stateless, read-only queries are easier to scale and cache
- **Security**: Lower attack surface for the initial rollout

The team acknowledged plans to eventually support write operations but recognized this would require additional safeguards around permissions and data validation, particularly since CRM data quality varies across customers.

### User Experience Design

A key differentiator in HubSpot's implementation was the focus on user experience for non-technical users. Traditional MCP server implementations require:

- NPM package installation
- Local desktop configuration
- Teaching desktop clients how to connect

HubSpot's remote server approach eliminated these friction points, allowing ChatGPT's 500 million weekly users to instantly connect to their HubSpot CRM data without technical setup. This was a critical product decision that influenced the entire technical architecture.

### Performance and Scaling

Because of the stateless, short-lived HTTP request architecture, HubSpot reported no load or scaling issues in production. The read-only nature and request architecture allowed them to handle traffic without concerns about connection management or state synchronization.

## Production Use Cases

The implementation enabled several valuable workflows for customers:

**CRM Analytics**: Users can ask questions like "Over the last 90 days, of all the new contacts and companies, give me an analysis of which areas they're from and which ones are the highest converting." The MCP server handles querying the appropriate CRM objects and returning structured data that the AI agent can analyze.

**Data Generation for Testing**: Product managers at HubSpot use local MCP servers to generate test and demo data with the right shape of deals, customers, and industry information for their specific needs.

**Workflow Automation**: The Breeze Assistant (HubSpot's AI tool) can interact with MCP clients to perform tasks like running nurture campaigns and saving results back to project management tools like Asana.

## Challenges with Emerging Standards

The case study reveals several challenges inherent in building on emerging protocols:

**Incomplete Specifications**: The MCP protocol was still evolving, missing key features like comprehensive authentication patterns, agent-to-agent protocols, and consistent formatting conventions.

**Version Fragmentation**: Different implementations (Anthropic's vs. OpenAI's) had incompatibilities, including different OAuth versions and features like search functionality that weren't in the base spec.

**SDK Maturity**: The Java MCP SDK required extensions to support production use cases, particularly around HTTP streaming and integration with existing infrastructure.

**Documentation and Best Practices**: As early adopters, HubSpot had to make architectural decisions (stateless vs. stateful, connection types, gateway patterns) without established best practices to reference.

## Broader Strategic Implications

### MCP as Infrastructure Layer

HubSpot views MCP servers and clients as distinct concerns:

**MCP Servers** solve the problem of exposing data and capabilities to agents in a standardized way. They're responsible for authentication, data retrieval, and providing the right interface for agents to query and interact with systems.

**MCP Clients** solve the discovery problem—finding and connecting to appropriate MCP servers. HubSpot is building discovery and registry services to help their agents find verified, secure MCP servers rather than randomly connecting to any available server.

### Agent-First Future

The interview reveals HubSpot's thinking about a future where agent interactions become primary:

- They're exploring agent-to-agent (A2A) protocols, watching Google's A2A donation to the Linux Foundation
- They expect MCP and A2A protocols will need to work together, as neither fully solves all interaction patterns
- They're building their own agents (mentioned as "Breeze Assistant") that use MCP clients to discover and use tools

However, Karen Ng maintains that traditional UIs will continue to be important even as agent interactions increase. She draws an analogy to human collaboration—you might ask a teammate to perform tasks, but you still need workspaces, homepages, and curated workflows as "landing spots" for focused work.

### Open Source Strategy

HubSpot is actively contributing back to the open source ecosystem:

- Contributing extensions to the Java MCP SDK
- Publishing engineering blogs to share learnings
- Working with partners like Anthropic and OpenAI on protocol evolution

Their philosophy aligns with the view that open standards benefit everyone by accelerating advancement through broader participation.

## Internal AI Adoption

The case study also touches on HubSpot's internal AI adoption, which contextualizes their MCP work:

- 70-80% adoption of AI coding tools among engineers
- Teams use tools like Claude Code for development
- Product managers use tools like Lovable and V0 for rapid prototyping
- AI is viewed as "supercharging" rather than replacing developers

Karen Ng characterizes the current state as "Iron Man suits" rather than fully autonomous systems—AI augments human expertise and creativity with humans remaining in the loop, particularly for domain knowledge and when debugging complex issues.

## Evaluation and Balanced Assessment

While HubSpot's implementation appears successful in meeting their goals, several factors warrant consideration:

**Protocol Maturity**: The need to navigate inconsistencies (like casing conventions) and missing features (like complete auth specs) suggests the protocol was indeed early stage. Organizations should expect to handle edge cases and potentially build custom extensions.

**Build vs. Buy Calculus**: HubSpot's decision to build was enabled by their existing Java infrastructure and engineering resources. Smaller organizations or those with different tech stacks might reach different conclusions about the four-week build timeline being "faster."

**Read-Only Limitations**: While appropriate for an initial release, the read-only restriction significantly limits use cases. The value proposition changes substantially when agents can only query data versus taking actions.

**Scale Claims**: The reported absence of scaling issues is credible given the stateless, read-only architecture, but it's worth noting this is a relatively constrained use case. More complex implementations with write operations, long-lived connections, or stateful interactions would face different challenges.

**First Mover Timing**: HubSpot benefited from being an early adopter and "first CRM" with this capability, but they also bore the cost of navigating an immature ecosystem. Later adopters will benefit from more mature tooling and established patterns but may have less competitive differentiation.

The case study demonstrates that production MCP implementation in 2025 requires navigating an evolving landscape, making pragmatic architectural tradeoffs, and being prepared to contribute back to emerging standards rather than simply consuming them. HubSpot's success appears to stem from clear product vision (meeting users where they are), strong technical execution within constraints (working with their existing stack), and appropriate scoping (read-only to start, stateless for scale).