---
title: "Multi-Tenant AI Agent Deployment with Secure Isolation Using Amazon Bedrock AgentCore"
slug: "multi-tenant-ai-agent-deployment-with-secure-isolation-using-amazon-bedrock-agentcore"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "regulatory-compliance"
  - "data-analysis"
  - "question-answering"
  - "chatbot"
  - "rag"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "memory"
  - "cost-optimization"
  - "latency-optimization"
  - "langchain"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "security"
  - "compliance"
  - "guardrails"
  - "scalability"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "Axonious"
summary: "Axonius, a cybersecurity asset intelligence platform serving hundreds of isolated customer environments, needed to add AI agents to their SaaS offering while maintaining strict tenant isolation and security requirements. They deployed a silo-model architecture using Amazon Bedrock AgentCore runtime, where each customer receives a dedicated agent with microVM-level session isolation. This approach integrated with their existing VPC-based tenant deployment model, using JWT-based authentication, IAM role tagging for cost allocation, Amazon Bedrock Knowledge Bases for RAG, and VPC Lattice for private networking. The solution reduced development time from an estimated eight weeks to 10 days—a 75% reduction in time-to-market—while maintaining the security-first architecture required for handling sensitive cybersecurity data across multiple enterprise customers."
link: "https://aws.amazon.com/blogs/machine-learning/how-axonius-built-secure-multi-tenant-ai-agents-on-bedrock-agentcore/"
year: 2026
seo:
  title: "Axonious: Multi-Tenant AI Agent Deployment with Secure Isolation Using Amazon Bedrock AgentCore - ZenML LLMOps Database"
  description: "Axonius, a cybersecurity asset intelligence platform serving hundreds of isolated customer environments, needed to add AI agents to their SaaS offering while maintaining strict tenant isolation and security requirements. They deployed a silo-model architecture using Amazon Bedrock AgentCore runtime, where each customer receives a dedicated agent with microVM-level session isolation. This approach integrated with their existing VPC-based tenant deployment model, using JWT-based authentication, IAM role tagging for cost allocation, Amazon Bedrock Knowledge Bases for RAG, and VPC Lattice for private networking. The solution reduced development time from an estimated eight weeks to 10 days—a 75% reduction in time-to-market—while maintaining the security-first architecture required for handling sensitive cybersecurity data across multiple enterprise customers."
  canonical: "https://www.zenml.io/llmops-database/multi-tenant-ai-agent-deployment-with-secure-isolation-using-amazon-bedrock-agentcore"
  ogTitle: "Axonious: Multi-Tenant AI Agent Deployment with Secure Isolation Using Amazon Bedrock AgentCore - ZenML LLMOps Database"
  ogDescription: "Axonius, a cybersecurity asset intelligence platform serving hundreds of isolated customer environments, needed to add AI agents to their SaaS offering while maintaining strict tenant isolation and security requirements. They deployed a silo-model architecture using Amazon Bedrock AgentCore runtime, where each customer receives a dedicated agent with microVM-level session isolation. This approach integrated with their existing VPC-based tenant deployment model, using JWT-based authentication, IAM role tagging for cost allocation, Amazon Bedrock Knowledge Bases for RAG, and VPC Lattice for private networking. The solution reduced development time from an estimated eight weeks to 10 days—a 75% reduction in time-to-market—while maintaining the security-first architecture required for handling sensitive cybersecurity data across multiple enterprise customers."
notion:
  pageId: "3c1f8dff-2538-805a-8137-c42c3fbbe661"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T08:55:00.000Z"
  lastEditedTime: "2026-08-19T08:55:00.000Z"
  publishedAt: "2026-08-19T09:15:03Z"
---

## Overview

Axonius, a cybersecurity asset intelligence platform that helps Security and IT teams prioritize risks and coordinate fixes by reconciling data from over 1,400 systems, implemented a production-ready multi-tenant AI agent architecture using Amazon Bedrock AgentCore. The company runs its SaaS infrastructure on AWS, managing hundreds of isolated customer environments, and needed to add agentic AI capabilities while maintaining their existing security and isolation model. Their first AI agent interprets the state of large enterprise environments, identifying gaps and risks by analyzing millions of data points from dozens of concurrent integration sources, allowing junior analysts to run complex analyses without requiring extensive senior analyst time.

The case study is particularly noteworthy because it addresses the specific challenges Independent Software Vendors (ISVs) face when deploying LLMs in production multi-tenant environments. While the source material comes from an AWS blog post and should be viewed with appropriate skepticism regarding performance claims, the architectural patterns and technical approaches described offer valuable insights into real-world LLMOps challenges for SaaS providers.

## Multi-Tenancy Architectural Options

The case study provides valuable context by outlining three architectural patterns available for multi-tenant AI agent deployments, each with distinct LLMOps implications:

The **silo model** provides dedicated AgentCore runtime instances per tenant, with IAM resource-based policies as the primary enforcement mechanism. This offers maximum isolation with dedicated compute per tenant and no shared process state, since each session runs in its own microVM. The authorization model is straightforward—IAM policies applied to both the Runtime and its endpoint serve as the sole enforcement point, eliminating the need for application-level routing logic. Each runtime can run different agent versions, models, or endpoint configurations independently. However, this approach faces scale limitations with a default quota of 1,000 agents per AWS account (though adjustable), introduces provisioning latency when onboarding new tenants, and creates operational overhead in monitoring and managing hundreds of runtimes.

The **pool model** uses a single shared runtime serving multiple tenants, with structural separation enforced through dedicated microVMs per session. Tenants authenticate through OAuth 2.0 identity providers like Amazon Cognito, with JWTs carrying unique tenant claims. The runtime's built-in JWT authorizer validates tokens, and agent code reads claims to route tool calls and data access appropriately. This provides operational simplicity with only one runtime to deploy and monitor, and enables rapid onboarding without infrastructure provisioning. However, tenant separation relies entirely on application code, making it application-dependent, and per-tenant customization requires additional conditional logic.

The **bridge model** combines a shared runtime with gateway-enforced tool isolation through AgentCore Gateway. Every tool invocation routes through a shared Gateway with two enforcement mechanisms: Cedar policy rules for deterministic access control that evaluate each tool call against caller identity attributes, and AWS Lambda interceptors for dynamic validation and context enrichment that run before tool calls reach targets. The REQUEST interceptor extracts JWTs, looks up tenant context, and exchanges tokens for short-lived tenant-scoped IAM credentials through STS AssumeRole. This provides layered infrastructure enforcement where even buggy agent code cannot breach tenant boundaries, centralized governance with audit capabilities, and shared efficiency without sharing security risk. The tradeoff is setup complexity requiring configuration of Gateways, interceptor Lambdas, tenant mappings, Cedar policies, and STS role trust relationships, plus VPC connectivity requirements.

## Axonius's Chosen Architecture and Rationale

Axonius selected the silo model, maintaining consistency with their existing deployment methodology where each customer workload resides in a dedicated Amazon VPC containing Application Load Balancer (ALB), Network Load Balancer (NLB), databases, and general compute infrastructure. Their decision was driven by several key requirements that reflect critical LLMOps considerations for production multi-tenant systems:

**Tenant isolation** was paramount given that Axonius handles sensitive customer data—agents serving one customer must be scoped exclusively to that customer's data with no possibility of cross-tenant data leakage. **Identity integration** required seamlessly connecting with their existing authentication and authorization module residing on Amazon EC2 instances allocated to each tenant, without disrupting established workflows. **Cost tracking** at the tenant level was essential since agentic costs can spiral, with most costs coming from model invocation—knowing precise per-tenant costs is critical for pricing decisions. The agent instance must have **secure access to tenant workload APIs** within the isolated VPC environment. **Lifecycle management** needed to integrate the agentic workload into their current silo Continuous Delivery workflow. Finally, **observability** requirements included high-quality, straightforward-to-integrate monitoring capable of tracking large fleets of agents, issuing alarms when issues arise, and providing tracing capabilities for debugging.

Amazon Bedrock AgentCore runtime was chosen over alternatives like running agents as additional containers within existing EC2 instances for three primary reasons. First, AgentCore runtime's session isolation using dedicated microVMs was the decisive factor—each user session runs in a dedicated microVM with isolated CPU, memory, and filesystem resources, and after session completion the entire microVM is terminated and memory is sanitized, providing the deterministic security model required for sensitive cybersecurity asset inventories. Second, AgentCore runtime's framework-agnostic design allowed Axonius to deploy agents using their preferred tooling (LangGraph) while connecting securely to existing VPC infrastructure through elastic network interfaces (ENIs). Third, built-in observability capabilities including CloudWatch integration for logging, AWS X-Ray for distributed tracing, and agent-specific tracing capturing reasoning steps and tool invocations provided necessary visibility without building custom monitoring infrastructure.

## Technical Implementation Details

The production architecture consists of several key components working together. Each customer receives a dedicated AgentCore runtime with each user session running on an isolated microVM. Amazon Elastic Container Registry (Amazon ECR) stores per-tenant agent container images. Amazon Bedrock powers the underlying foundation models, specifically Claude based on the case study description, with IAM role tagging enabling cost allocation. Amazon Bedrock Knowledge Bases with Amazon S3 Vectors provide cost-efficient, scalable RAG capabilities, using metadata filtering to isolate tenant-specific data. Amazon Bedrock Guardrails apply content filtering and topic denial policies to every model response before sharing with users, keeping responses safe and on-topic. Amazon CloudWatch monitors the overall workload and is instrumental in cost control, tracking token consumption metrics for both input and output tokens, issuing alerts, and using IAM-deny enforcement for cost governance—if a customer exceeds their token budget, an automated IAM policy blocks further invocations. Amazon VPC Lattice manages cost-efficient private connectivity, connecting AgentCore runtime, customer VPCs, and AWS service endpoints. AWS CloudFormation automates per-customer provisioning and teardown, enabling scalable agent deployments across the customer base.

## User Session Flow and LLMOps Orchestration

The end-to-end flow for a user query demonstrates the sophisticated orchestration required for production multi-tenant LLM systems. When a customer asks a question like "Are there any major changes in my asset count compared to last week?" through the chat interface, the authentication phase begins with the Axonius application authenticating the already-signed-in user and minting a short-lived impersonation JWT carrying user identity, tenant ID, session ID, and actor ID. This token, rather than static credentials, authorizes all downstream operations.

The Axonius application control plane assembles an invocation payload and calls InvokeAgentRuntime on the customer's dedicated AgentCore runtime. The payload contains only tenant configuration: the AgentCore Memory ID, Knowledge Base and data-source IDs, AWS Region, current Axonius version, and the callback address for the customer's instance. Critically, the JWT rides in a custom AgentCore header rather than in the body, preventing authentication material from landing in the agent's saved state, while the session and actor IDs scope the call to one user's conversation.

Each customer's AgentCore runtime is attached to a dedicated elastic network interface (ENI) placed inside that customer's own VPC and subnet. AgentCore creates an isolated session, validates the JWT back against the customer's Axonius application (checking signature, expiry, revocation, and permissions), and scopes the reasoning to that single tenant. Invalid tokens are rejected before the model runs.

For agent reasoning, Axonius uses a LangGraph supervisor that inspects the question and routes it to the appropriate specialist agent. The specialist uses Amazon Bedrock to analyze the question, deciding at each step whether it can respond directly, needs product documentation, or needs live data from the customer's environment. When the question concerns how Axonius works, the agent retrieves relevant passages from a Bedrock Knowledge Base, which is kept current by uploading the latest Axonius documentation to Amazon S3 and syncing it, ensuring responses reflect the customer's running version.

When the question requires live data, the agent invokes its query tool, which uses the Knowledge Base and LLM to translate the natural-language question into an Axonius Query Language (AQL) expression. It then reaches the customer's Axonius application instance through the runtime's dedicated ENI, keeping traffic inside the customer's VPC and within the AWS network. The tool compiles the query, fetches matching assets while carrying the same JWT (ensuring the agent can only see data the user is allowed to see), and returns results to the agent for reasoning. Amazon Bedrock Guardrails are applied server-side to every model response, and the agent's answer streams back token by token through the runtime to the chat UI, with the exchange persisted in AgentCore Memory for conversational context.

## Tenant Isolation and Private Networking

The architecture maintains strict per-customer isolation through several mechanisms. Each customer gets a dedicated AgentCore runtime with its own ENI inside their VPC and subnet, ensuring one customer's agent has no network path to another customer's data. Because the ENI lives in the customer's VPC, the runtime reaches the internal Axonius EC2 instance over private addressing, with traffic staying within the AWS network rather than traversing the public internet.

A dedicated Axonius services VPC publishes AWS services the runtime depends on—Amazon ECR, Amazon S3, Amazon Bedrock, and others—through a set of private endpoints shared with each customer VPC through VPC Lattice. This allows the AgentCore runtime to pull the agent container image from Amazon ECR and reach Amazon Bedrock and the Knowledge Base privately, while restricting access so only the customer VPC and its runtime can reach those services. Amazon VPC Lattice specifically enables Axonius to define one private endpoint per AWS service, reducing cost and management overhead compared to AWS PrivateLink, which would require a private endpoint per VPC per service.

This design maintains clean trust boundaries: reasoning, knowledge retrieval, and guardrails run on Amazon Bedrock; authoritative data and identity stay on each customer's own VPC; and every hop between them travels over private AWS networking. The agent does not hold long-lived credentials—it borrows the user's JWT for the life of a request, and every session, memory, tool call, and network path is scoped to a single tenant.

## Token Governance and Cost Management

A particularly noteworthy aspect of Axonius's implementation from an LLMOps perspective is their comprehensive approach to token governance and cost management. CloudWatch metrics track the sum of input and output tokens per agent, while Axonius uses opentelemetry-instrument to obtain real-time token usage data. IAM role tagging leverages Amazon Bedrock's cost allocation by IAM user/role feature to enable per-tenant cost attribution. Automated IAM-deny policies can be triggered using CloudWatch alarms to block runaway agent usage, providing an enforcement mechanism beyond simple alerting. Application Inference Profiles per model allow granular tagging, alerting, and cost control through Amazon EventBridge.

This approach provides cost allocation visibility updated once or twice daily, with real-time alerting through CloudWatch for immediate enforcement. The combination of tracking, attribution, alerting, and automated enforcement represents a mature approach to the cost management challenges inherent in production LLM deployments, particularly in multi-tenant environments where cost attribution and control are essential for sustainable business models.

## Observability and Operational Management

The built-in observability capabilities of AgentCore runtime were a key selection factor. The platform provides CloudWatch integration for logging, AWS X-Ray for distributed tracing, and agent-specific tracing that captures reasoning steps and tool invocations. This comprehensive observability is essential when operating at scale with hundreds of dedicated runtimes across customer deployments. The ability to track large fleets of agents, issue alarms when issues arise, and provide detailed tracing for debugging without building custom infrastructure significantly reduces operational overhead.

The case study mentions using AWS CloudFormation for automated per-customer provisioning and teardown, allowing Axonius to scale agent deployments across their customer base. This infrastructure-as-code approach is critical for managing the operational complexity of the silo model, where each new customer requires creating a dedicated Runtime and endpoint.

## Development Velocity and Time-to-Market

The case study claims that by using AgentCore managed runtime, Knowledge Bases for RAG, and built-in session memory, Axonius reduced the development cycle from an estimated eight weeks of custom infrastructure work to only 10 days of production-ready deployment—a 75% reduction in time-to-market. While this claim should be viewed with appropriate skepticism given the source is vendor marketing material, it does highlight the potential value of managed services for LLMOps workflows. The quote from Dori Shmuel, SaaS DevOps Lead at Axonius, states: "AgentCore Runtime gave us the multi-tenant isolation and authentication framework we needed to deploy AI agents across large numbers of customer environments without compromising our security-first architecture."

## Critical LLMOps Considerations and Tradeoffs

This case study illustrates several important LLMOps considerations for production multi-tenant deployments. The choice between silo, pool, and bridge models involves fundamental tradeoffs between isolation guarantees, operational complexity, cost efficiency, and customization capabilities. Axonius chose to optimize for isolation and security consistency with their existing architecture, accepting the operational overhead of managing hundreds of runtimes.

The integration of identity and authentication with existing systems is non-trivial—the use of short-lived impersonation JWTs that travel in custom headers rather than request bodies, combined with validation against the customer's application and scoping to individual sessions, demonstrates the complexity required for secure multi-tenant LLM deployments.

Cost management in production LLM systems requires multiple layers: tracking at the token level, attribution to specific tenants through IAM role tagging, real-time alerting, and automated enforcement mechanisms. The combination of CloudWatch metrics, OpenTelemetry instrumentation, and IAM-deny policies triggered by alarms represents a mature approach to cost governance.

The networking architecture using VPC Lattice for private connectivity between AgentCore runtimes, customer VPCs, and AWS service endpoints demonstrates the infrastructure complexity required to maintain security and isolation in multi-tenant environments. The decision to use VPC Lattice over AWS PrivateLink for cost efficiency when managing many customer VPCs highlights practical economic considerations in LLMOps architectures.

The framework-agnostic nature of AgentCore runtime allowed Axonius to use their preferred LangGraph supervisor pattern for agent orchestration, demonstrating the importance of flexibility in production LLM deployments where teams may have established patterns and preferences.

Overall, while the case study comes from vendor marketing material and specific performance claims should be treated cautiously, it provides valuable insights into the architectural patterns, security considerations, cost management approaches, and operational challenges involved in deploying LLMs in production multi-tenant SaaS environments. The silo model with dedicated runtimes per tenant represents one end of the multi-tenancy spectrum, prioritizing isolation and security at the cost of operational complexity—a reasonable choice for a cybersecurity-focused platform handling sensitive enterprise data.
