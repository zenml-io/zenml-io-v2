---
title: "Gateway Pattern for Managing Multi-Agent MCP and LLM Traffic"
slug: "gateway-pattern-for-managing-multi-agent-mcp-and-llm-traffic"
draft: false
llmopsTags:
  - "customer-support"
  - "code-generation"
  - "chatbot"
  - "agent-based"
  - "multi-agent-systems"
  - "cost-optimization"
  - "latency-optimization"
  - "mcp"
  - "kubernetes"
  - "api-gateway"
  - "monitoring"
  - "fastapi"
  - "security"
  - "compliance"
  - "open-source"
  - "microservices"
  - "orchestration"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Solo IO"
summary: "Solo.io faced challenges governing and observing traffic from their growing internal AI agents to MCP (Model Context Protocol) servers and LLMs, particularly around multiplexing services, authentication, cost tracking, and usage visibility. They implemented agentgateway as a centralized mediation layer that handles traffic governance, security policies, and observability without requiring modifications to agents or backend services. The solution enabled unified access to multiple MCP servers through a single endpoint, granular tracking of LLM usage and costs per user and organization, and enforcement of authentication and authorization policies across all AI workloads, providing the visibility and control needed to scale their agentic AI operations efficiently."
link: "https://aaif.io/blog/use-agentgateway-to-mediate-mcp-and-llm-traffic-at-solo-io/"
year: 2026
seo:
  title: "Solo IO: Gateway Pattern for Managing Multi-Agent MCP and LLM Traffic - ZenML LLMOps Database"
  description: "Solo.io faced challenges governing and observing traffic from their growing internal AI agents to MCP (Model Context Protocol) servers and LLMs, particularly around multiplexing services, authentication, cost tracking, and usage visibility. They implemented agentgateway as a centralized mediation layer that handles traffic governance, security policies, and observability without requiring modifications to agents or backend services. The solution enabled unified access to multiple MCP servers through a single endpoint, granular tracking of LLM usage and costs per user and organization, and enforcement of authentication and authorization policies across all AI workloads, providing the visibility and control needed to scale their agentic AI operations efficiently."
  canonical: "https://www.zenml.io/llmops-database/gateway-pattern-for-managing-multi-agent-mcp-and-llm-traffic"
  ogTitle: "Solo IO: Gateway Pattern for Managing Multi-Agent MCP and LLM Traffic - ZenML LLMOps Database"
  ogDescription: "Solo.io faced challenges governing and observing traffic from their growing internal AI agents to MCP (Model Context Protocol) servers and LLMs, particularly around multiplexing services, authentication, cost tracking, and usage visibility. They implemented agentgateway as a centralized mediation layer that handles traffic governance, security policies, and observability without requiring modifications to agents or backend services. The solution enabled unified access to multiple MCP servers through a single endpoint, granular tracking of LLM usage and costs per user and organization, and enforcement of authentication and authorization policies across all AI workloads, providing the visibility and control needed to scale their agentic AI operations efficiently."
notion:
  pageId: "352f8dff-2538-80a7-9920-e320ddc5078c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:24:00.000Z"
  lastEditedTime: "2026-04-30T13:24:00.000Z"
  publishedAt: "2026-04-30T13:28:34Z"
---

## Overview

This case study from Solo.io, published in April 2026, demonstrates a production implementation of the gateway pattern to manage and govern traffic between AI agents and both MCP (Model Context Protocol) servers and LLM providers. The company developed and open-sourced agentgateway (along with related projects kagent, agentregistry, and agentevals), donating these tools to vendor-neutral foundations under the Linux Foundation. The case study is particularly notable for addressing the operational challenges of scaling agentic AI systems in a production environment, though it's important to note this is a first-party account promoting their own open-source projects.

Solo.io's internal use of AI agents had grown significantly, including a support agent that employees could query via Slack mentions and various coding agents like Claude Code and Cursor. As their agent ecosystem expanded, they encountered classic LLMOps challenges around service aggregation, authentication, authorization, observability, and cost management. Rather than modifying individual agents or backend services, they implemented a centralized gateway layer that handles cross-cutting concerns transparently.

## Technical Architecture and MCP Server Management

The core architectural pattern involves positioning agentgateway as an intermediary between AI agents and their backend dependencies, which include both MCP servers (providing tools and context to agents) and LLM APIs. This separation of concerns allows Solo.io to add governance, security, and observability capabilities without coupling these concerns to application code.

### MCP Server Multiplexing

Solo.io developed multiple internal MCP servers to support different agent capabilities. Their support agent, for instance, requires access to MCP tools for searching internal Slack conversations, querying their codebase, interacting with internal tools, and retrieving information from documentation and GitHub issues. As the number of MCP servers proliferated, they needed a way to aggregate these services behind a unified interface.

The agentgateway configuration allows multiple MCP backends to be exposed through a single virtual MCP server on a designated port. In their example, they configure stateless MCP services including a knowledge-base service and slack-conversations service, all accessible through a single `/mcp` endpoint on port 3000. This multiplexing is achieved purely through configuration without requiring any code changes or redeployments of the underlying MCP servers.

The configuration-driven approach means that as new MCP servers are added to the environment, they can be incorporated into the agent ecosystem simply by updating the gateway configuration. This significantly reduces operational friction compared to approaches that would require updating agent code or managing multiple connection endpoints in client applications.

### Authentication and Policy Enforcement

A key LLMOps concern addressed by the gateway pattern is centralized authentication and policy enforcement. Rather than implementing authentication logic in each individual MCP server or requiring application-level modifications, Solo.io handles these concerns at the gateway layer. Their configuration demonstrates strict MCP authentication using JWT tokens with JWKS validation, audience verification, and resource metadata configuration.

The authentication policy includes an issuer validation against a specific auth endpoint, JWKS URL for public key retrieval, audience validation for the specific MCP resource, and detailed resource metadata including supported scopes, bearer token methods, and documentation links. Importantly, they also configure timeout policies at the gateway level, with both overall request timeouts and backend-specific timeouts set to 300 seconds.

This approach exemplifies a core LLMOps principle: centralizing cross-cutting concerns to avoid duplication and reduce the surface area for security vulnerabilities. The gateway handles authentication once rather than requiring each MCP server to implement and maintain its own authentication logic. This is particularly valuable given that the authentication requirements are consistent across all MCP backends serving the same agents.

From a practical standpoint, this configuration also simplifies client access. Engineers can access the multiplexed MCP servers via tools like Claude or Cursor using a simple configuration file that points to a single endpoint rather than managing multiple authenticated connections. The example mcp.json configuration for Cursor shows just how minimal the client-side setup becomes when the gateway handles complexity centrally.

### Observability for MCP Traffic

Solo.io uses agentgateway to add observability to MCP traffic without modifying backend services. Their metrics configuration demonstrates field-level enrichment where they extract product information from the request body parameters to tag metrics appropriately. This allows them to analyze tool usage distribution across different products and understand how their internal agents utilize different MCP tools over time.

The ability to enrich telemetry data at the gateway layer without instrumenting each MCP server individually is a significant operational advantage. As new metrics requirements emerge, they can be satisfied through gateway configuration updates rather than coordinated changes across multiple services. The case study mentions analyzing tool usage for the support agent, suggesting they've gained visibility into which MCP tools are most frequently invoked and how usage patterns evolve.

## LLM Traffic Governance

The second major use case for agentgateway at Solo.io involves governing traffic to LLM providers. As internal AI usage grew, particularly with coding agents accessing Anthropic models through Vertex AI, the company lacked visibility into usage patterns and per-user, per-model costs. The gateway pattern provides a solution by routing all LLM traffic through a centralized point where policies, authentication, and observability can be applied uniformly.

### Usage and Cost Tracking

A critical LLMOps requirement for any organization scaling LLM usage is understanding who is using what and at what cost. Solo.io addresses this by configuring agentgateway to track usage and spending at both individual and organizational levels. Their metrics configuration extracts the user email from JWT tokens and organization information from custom headers, correlating this metadata with each LLM request.

They also enable access logging with similar enrichment, adding user email to each log entry. This combination of metrics and logs provides comprehensive visibility into LLM consumption patterns. The case study notes that this visibility helps them make informed decisions about when subscription models make more sense economically than pay-as-you-go pricing, which is a common challenge for organizations with growing LLM usage.

The ability to visualize token usage by organization in Grafana dashboards demonstrates the practical value of this observability. They can see token distribution across different models and drill down to per-user consumption over any time window. This level of visibility is essential for capacity planning, budget forecasting, and identifying optimization opportunities.

### Authentication and Authorization for LLM Access

Solo.io enforces strict authentication and authorization policies for LLM access through the gateway. Their JWT authentication configuration validates tokens issued by Google accounts, verifying the issuer, audience, and JWKS signatures. Beyond authentication, they implement authorization rules that restrict access to verified Solo.io users with confirmed email addresses.

The authorization rule demonstrates a practical approach: they verify that the email claim ends with "@solo.io" and that the email_verified claim is true. These policies apply uniformly across all LLM models accessed through Vertex AI, again demonstrating the value of centralizing policy enforcement rather than implementing it separately for each model or agent.

This approach to authentication and authorization is particularly important for LLM access given the cost implications and potential for misuse. By enforcing these policies at the gateway layer, Solo.io ensures that even as new agents or applications are developed, they inherit consistent security controls without requiring explicit implementation in each application.

### Model Routing and Transformation

The agentgateway configuration includes sophisticated model routing capabilities that allow for dynamic model selection and request transformation. Solo.io's configuration demonstrates organization-specific routing where different organizational units can be directed to different Vertex AI projects with appropriate headers and transformations.

The transformation logic shown in their configuration is particularly interesting from an LLMOps perspective. They use conditional logic to determine the actual model being used based on the request path, handling both Google native models and partner models like Opus 4.7 and Sonnet 4.6. The regex-based path transformation extracts the model identifier from Anthropic model paths, while defaulting to the model specified in the LLM request for other cases.

This routing and transformation capability allows Solo.io to present a unified interface to agents and users while managing the complexity of multiple LLM providers, model versions, and organizational policies behind the scenes. It also provides flexibility to migrate between providers or models without requiring changes to agent code, as the gateway can handle the translation.

The configuration ties routes to specific Vertex AI projects based on organizational headers, suggesting they're managing multi-tenancy concerns at the gateway level. This allows different teams or business units to have separate billing, quotas, and potentially different model access policies while still using a common gateway infrastructure.

## LLMOps Patterns and Considerations

This case study illustrates several important LLMOps patterns that are applicable beyond Solo.io's specific implementation:

**Separation of Concerns**: By handling authentication, authorization, observability, and routing at a gateway layer, Solo.io avoids coupling these operational concerns to application logic. This reduces the burden on agent developers and ensures consistent policy enforcement.

**Configuration-Driven Operations**: The extensive use of configuration rather than code for managing policies, routes, and observability demonstrates a mature operational approach. Changes can be made and validated without rebuilding or redeploying applications.

**Centralized Observability**: Rather than instrumenting individual services, Solo.io centralizes telemetry collection at the gateway. This provides consistent visibility across all MCP servers and LLM providers while reducing the operational overhead of managing distributed instrumentation.

**Cost Visibility and Control**: The emphasis on tracking usage and costs per user and organization reflects a real-world concern as LLM usage scales. The gateway pattern provides a natural chokepoint for implementing this tracking without application-level changes.

**Multi-Provider Abstraction**: The model routing and transformation capabilities demonstrate how a gateway can abstract differences between LLM providers, allowing for provider diversity without complexity in agent code.

However, it's important to consider potential tradeoffs and limitations of this approach, particularly since this is promotional content for Solo.io's open-source projects:

**Single Point of Failure**: Centralizing traffic through a gateway creates a potential availability risk. The case study doesn't discuss high availability configurations, failover mechanisms, or what happens when the gateway is unavailable.

**Latency Considerations**: Adding a proxy layer introduces additional network hops and processing time. While the case study mentions timeout configurations, it doesn't provide performance metrics or discuss latency impacts, particularly for latency-sensitive agent interactions.

**Operational Complexity**: While the gateway simplifies application code, it shifts complexity to gateway configuration and operation. The YAML configurations shown are relatively complex and require careful management, versioning, and testing.

**Vendor Lock-in Considerations**: While agentgateway is open source, organizations adopting this pattern become dependent on the gateway as a critical infrastructure component. Migration away from the gateway or to alternative solutions would require significant work.

**Security Implications**: Centralizing authentication means the gateway handles sensitive credentials and tokens. The case study doesn't discuss how secrets are managed, rotated, or protected, which is critical for production security.

## Future Directions

Solo.io outlines several areas for future exploration that are relevant to the broader LLMOps community:

**Fine-grained Authorization for MCP Tools**: They plan to implement more precise control over which agents can access and execute specific MCP tools. This would extend the current organization and user-level controls to the individual tool level, allowing for more nuanced permission models.

**Progressive Disclosure of MCP Servers**: Rather than relying on static configuration, they envision agents discovering MCP capabilities dynamically through search and execution. This would support a more flexible and scalable approach as the number of available tools grows.

**Code Execution Modes**: They aim to reduce the iterative back-and-forth between agents and MCP tools through optimized code execution modes. This suggests they're working on ways to batch or optimize tool interactions to improve efficiency and response quality.

These future directions indicate that Solo.io is thinking about the evolution of agentic systems beyond simple request/response patterns toward more dynamic and efficient interaction models.

## Critical Assessment

This case study provides valuable insights into real-world LLMOps challenges and solutions, particularly around governance and observability for agent systems. The gateway pattern is well-suited to addressing cross-cutting concerns like authentication, authorization, and telemetry collection without coupling these concerns to application code.

However, readers should be aware that this is promotional content for Solo.io's open-source projects. The case study presents their approach and tooling in a uniformly positive light without discussing tradeoffs, challenges encountered during implementation, or comparisons with alternative approaches. Key operational details like performance impacts, failure modes, scaling characteristics, and operational overhead are not addressed.

The technical approach is sound and reflects genuine production concerns, but organizations considering similar patterns should conduct thorough evaluation of alternatives, performance testing, and operational readiness assessment before adopting a gateway-based architecture for LLMOps. The centralized gateway pattern trades application-level complexity for infrastructure-level complexity, which may or may not be the right tradeoff depending on organizational capabilities and requirements.

The emphasis on metrics and observability is particularly valuable, as these are critical but sometimes overlooked aspects of production LLM systems. The specific examples of tracking usage by user, organization, and model provide a useful template for organizations building similar visibility capabilities. Similarly, the configuration-driven approach to authentication and authorization represents a mature operational pattern that can reduce security risks and operational overhead compared to distributed implementation across multiple services.
