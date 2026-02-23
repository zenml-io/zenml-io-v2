---
title: "AI-Powered IT Operations Management with Multi-Agent Systems"
slug: "ai-powered-it-operations-management-with-multi-agent-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "698c539670d2c8145a90b8dd"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-12T18:34:22.611Z"
  lastUpdated: "2026-02-12T18:34:22.611Z"
  createdOn: "2026-02-11T10:01:58.291Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "structured-output"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "multi-agent-systems"
  - "agent-based"
  - "semantic-search"
  - "prompt-engineering"
  - "mcp"
  - "a2a"
  - "embeddings"
  - "vector-search"
  - "kubernetes"
  - "docker"
  - "postgresql"
  - "langchain"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "serverless"
  - "orchestration"
  - "databases"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "elasticsearch"
  - "amazon-aws"
  - "anthropic"
  - "microsoft-azure"
industryTags: "energy"
company: "Iberdrola"
summary: "Iberdrola, a global utility company, implemented AI agents using Amazon Bedrock AgentCore to transform IT operations in ServiceNow by addressing bottlenecks in change request validation and incident management. The solution deployed three agentic architectures: a deterministic workflow for validating change requests in the draft phase, a multi-agent orchestration system for enriching incident tickets with contextual intelligence, and a conversational AI assistant for simplifying change model selection. The implementation leveraged LangGraph agents containerized and deployed through AgentCore Runtime, with specialized agents working in sequence or adaptively based on incident complexity, resulting in reduced processing times, accelerated ticket resolution, and improved data quality across departments."
link: "https://aws.amazon.com/blogs/machine-learning/iberdrola-enhances-it-operations-using-amazon-bedrock-agentcore?tag=soumet-20"
year: 2026
seo:
  title: "Iberdrola: AI-Powered IT Operations Management with Multi-Agent Systems - ZenML LLMOps Database"
  description: "Iberdrola, a global utility company, implemented AI agents using Amazon Bedrock AgentCore to transform IT operations in ServiceNow by addressing bottlenecks in change request validation and incident management. The solution deployed three agentic architectures: a deterministic workflow for validating change requests in the draft phase, a multi-agent orchestration system for enriching incident tickets with contextual intelligence, and a conversational AI assistant for simplifying change model selection. The implementation leveraged LangGraph agents containerized and deployed through AgentCore Runtime, with specialized agents working in sequence or adaptively based on incident complexity, resulting in reduced processing times, accelerated ticket resolution, and improved data quality across departments."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-it-operations-management-with-multi-agent-systems"
  ogTitle: "Iberdrola: AI-Powered IT Operations Management with Multi-Agent Systems - ZenML LLMOps Database"
  ogDescription: "Iberdrola, a global utility company, implemented AI agents using Amazon Bedrock AgentCore to transform IT operations in ServiceNow by addressing bottlenecks in change request validation and incident management. The solution deployed three agentic architectures: a deterministic workflow for validating change requests in the draft phase, a multi-agent orchestration system for enriching incident tickets with contextual intelligence, and a conversational AI assistant for simplifying change model selection. The implementation leveraged LangGraph agents containerized and deployed through AgentCore Runtime, with specialized agents working in sequence or adaptively based on incident complexity, resulting in reduced processing times, accelerated ticket resolution, and improved data quality across departments."
---

## Overview

Iberdrola, one of the world's largest utility companies operating in the energy sector, has implemented a sophisticated multi-agent AI system to revolutionize its IT operations management through ServiceNow. This case study presents a production deployment of agentic AI architectures built on Amazon Bedrock AgentCore, targeting critical operational challenges in change request validation and incident management. The implementation demonstrates enterprise-scale LLMOps practices including managed infrastructure, comprehensive observability, secure deployment patterns, and framework-agnostic agent development.

The solution addresses three specific operational pain points: validating change requests during the draft phase to prevent manual resubmissions, enriching incident tickets with contextual intelligence for faster resolution, and simplifying the complex process of selecting appropriate change models through conversational interfaces. While the blog post is clearly promotional material for AWS services, it provides sufficient technical detail to understand the architectural decisions and production deployment patterns used by Iberdrola.

## Architectural Foundation and LLMOps Infrastructure

Iberdrola's implementation establishes a layered architecture that separates concerns while enabling seamless integration across IT workflows. The architecture comprises three distinct layers that demonstrate mature LLMOps thinking around separation of concerns and reusability.

The **Agentic AI Resources Layer** encompasses all agent deployments, Model Context Protocol (MCP) servers for standardized data access, authentication mechanisms, and memory objects that maintain contextual information across interactions. This design enables domain-specific agent development while sharing common infrastructure services, which is a key LLMOps principle for scaling AI systems across an organization. The use of MCP servers is particularly noteworthy as it provides a standardized interface pattern that allows agents to consume data consistently without requiring custom integration code for each data source.

The **Inference Layer** provides an abstraction for large language model access across Iberdrola's portfolio of integrated models. The implementation uses LiteLLM as a proxy layer to provide consistent access to Amazon Nova and Anthropic Claude models through Amazon Bedrock, as well as various other models. This abstraction is a critical LLMOps pattern that enables experimentation with different models without requiring modifications to agent code. The layer also integrates Amazon Bedrock Guardrails to provide safety controls for model outputs, addressing the production concern of ensuring appropriate and safe LLM responses.

The **Data Layer** maintains a comprehensive information foundation containing operational data, analytical datasets, and transactional records. The architecture implements a hybrid approach combining real-time operational access with enriched analytical datasets. Raw ServiceNow data flows through ETL processes into Amazon S3 storage, then into Amazon RDS databases enhanced with pgvector extensions for semantic search capabilities. This demonstrates a thoughtful approach to preparing data for LLM consumption, recognizing that agents need both real-time access to operational systems and enriched historical context for intelligent decision-making.

## Amazon Bedrock AgentCore as Production Runtime

The production implementation leverages Amazon Bedrock AgentCore, which provides managed primitives for building and deploying enterprise AI agents. From an LLMOps perspective, this represents a platform approach where infrastructure concerns are handled by managed services, allowing teams to focus on agent logic and business value.

**AgentCore Runtime** serves as the foundation for agent deployment, accepting containerized agents built with any framework—in Iberdrola's case, LangGraph—and deploying them through Amazon ECR repositories. The runtime maintains serverless characteristics, scaling based on request volume while providing session isolation. Each agent session can run up to 8 hours for complex workflows, which is important for long-running operational processes. The framework-agnostic approach is significant because it allows organizations to choose their preferred development tools rather than being locked into proprietary frameworks, which is a critical consideration for enterprise LLMOps.

**AgentCore Memory** provides contextual continuity across agent interactions by maintaining memory objects per agent session. This allows agents to store and retrieve session state, conversation history, and intermediate processing results. For Iberdrola's multi-step workflows, this capability is essential for maintaining context across validation phases or incident enrichment processes. From an LLMOps perspective, managed memory services reduce the complexity of building stateful agent systems.

**AgentCore Gateway** acts as an MCP server that standardizes external tool and service integrations. Rather than requiring custom integration code for each data source, AgentCore Gateway provides standardized interfaces that agents can consume consistently. This is particularly valuable for Iberdrola's ServiceNow endpoint connections and represents a key scalability pattern in production LLM systems.

**AgentCore Identity** manages both inbound and outbound authentication flows, integrating with Entra ID through OAuth 2.0 protocols. For inbound requests, it validates bearer tokens and authorizes access to underlying resources. For outbound operations, it handles token acquisition and manages secure communication with downstream tools. Enterprise security and identity management is often a significant barrier to production LLM deployments, so having managed identity services accelerates deployment timelines.

**AgentCore Observability** captures telemetry data from agents using OpenTelemetry standards and surfaces this information through Amazon CloudWatch. This integration provides comprehensive monitoring of operational metrics without requiring additional custom instrumentation. Iberdrola supplements this with their self-hosted Langfuse instance running on Amazon EKS for a holistic view of spans and traces generated by the LLMs and agents. This dual observability approach—using both platform-provided observability and specialized LLM observability tools—reflects best practices in production LLM monitoring.

## Security and Network Architecture

The implementation addresses enterprise security requirements through a VPC configuration within AgentCore Runtime, allowing agents to securely access internal resources while maintaining network isolation. VPC endpoints provide secure communication with internal data sources without exposing traffic to the public internet. This deployment pattern is critical for enterprise LLMOps where data security and compliance requirements often mandate that LLM processing occurs within controlled network boundaries.

Users initiate requests through ServiceNow, which communicates through a REST API to a MicroGateway that routes requests to appropriate use case agents. This gateway pattern provides a clean separation between the existing IT service management platform and the AI agent infrastructure, allowing for independent scaling and evolution of each component.

## Use Case 1: Enhanced Change Management Validation

The first production use case demonstrates an agentic workflow supporting the draft phase of Iberdrola's change management process through sequential agent execution within a single AgentCore Runtime. The workflow processes change requests through four specialized agents: Rule Extractor, Content Validator, AIM Model Analyst, and Phase Transition. Each agent receives context from the previous step, demonstrating a deterministic pipeline pattern.

The implementation uses LangGraph orchestration, which enables visual workflow representation, conditional branching based on validation results, and comprehensive audit trails. LangGraph is particularly well-suited for deterministic workflows where the sequence of agent operations is predefined, though it can also handle more dynamic orchestration patterns. From an LLMOps perspective, using graph-based orchestration provides transparency into agent execution flows and makes it easier to debug and optimize production systems.

A noteworthy technical detail is the use of pgvector-enabled PostgreSQL to support semantic similarity searches. This enables the AIM Model Analyst agent to match change models based on technical descriptions rather than simple keyword matching. This demonstrates a hybrid approach where traditional vector search augments LLM capabilities, which is often more efficient and cost-effective than having the LLM process large amounts of reference data directly.

The deterministic nature of this workflow—where change requests follow identical validation steps—helps meet compliance requirements and quality standards. This is important for regulated industries and demonstrates how agentic AI can be deployed in production environments with strict governance requirements.

## Use Case 2: Intelligent Incident Management

The second use case demonstrates intelligent multi-agent orchestration for incident management, where a Smart Solver Agent analyzes incoming incidents and selectively engages specialized agents based on contextual needs. This represents a more dynamic orchestration pattern compared to the change management workflow.

The Smart Solver Agent acts as an orchestration layer that analyzes incident content and determines which of five specialized agents to invoke: Tag Classifier, Incident Similarity, Incident Associator, Change Associator, and Context Retriever. The system adapts processing steps to each incident's unique characteristics—simple incidents might only require tagging, whereas complex issues receive full contextual analysis including similarity detection, change impact analysis, and configuration item details.

This adaptive processing approach optimizes resource utilization and cost, as not every incident requires the full suite of enrichment agents. From an LLMOps perspective, this demonstrates intelligent orchestration where a meta-agent makes decisions about which specialized agents to invoke based on the specific needs of each request. This pattern is more sophisticated than simple sequential pipelines and reflects production optimization thinking around compute costs and processing efficiency.

The incident management implementation serves Iberdrola's Networking department, processing incidents faster and with greater precision by providing technicians with categorized tickets, related historical incidents, and configuration item details. The value proposition centers on enhanced response times and the ability to swiftly address critical issues by providing contextual enrichment.

## Use Case 3: Conversational Change Model Assistant

The third use case addresses the complexity of selecting appropriate change models through a conversational AI assistant. The agent collects information about technology families, change objectives, and deployment environments to recommend suitable change models. The system provides clickable recommendations that open pre-filled change forms in ServiceNow, streamlining the change request initiation process.

This use case demonstrates a conversational interface pattern for complex decision support, where the LLM guides users through a structured information gathering process and then applies business logic to recommend appropriate actions. The integration back into ServiceNow with pre-filled forms shows production thinking around user experience and workflow integration.

## Observability and Monitoring Strategy

Iberdrola implements a comprehensive observability strategy that combines platform-provided monitoring with specialized LLM observability tools. AgentCore Observability automatically captures logs and metrics through OpenTelemetry standards and surfaces them through Amazon CloudWatch. This provides infrastructure-level monitoring without requiring additional instrumentation.

Additionally, Iberdrola has configured explicit logging to their self-hosted Langfuse instance running on Amazon EKS for centralized monitoring. Langfuse provides LLM-specific observability capabilities including trace visualization, cost tracking, and performance analysis of individual model calls. This dual-layer approach reflects mature LLMOps practices where both infrastructure monitoring and AI-specific observability are necessary for production operations.

The ability to monitor spans and traces generated by LLMs and agents is critical for debugging production issues, optimizing performance, and controlling costs. The combination of CloudWatch for infrastructure metrics and Langfuse for LLM-specific telemetry provides comprehensive visibility into system behavior.

## Production Deployment Patterns and Scalability

The serverless nature of AgentCore Runtime enables Iberdrola to scale based on request volume while maintaining session isolation. This is particularly important for enterprise deployments where demand can be variable and unpredictable. The platform's ability to scale from tens to hundreds of tool targets through AgentCore Gateway's automatic indexing and semantic search demonstrates production scalability patterns.

The containerized deployment approach using Amazon ECR provides flexibility in agent development while maintaining consistent deployment patterns. Teams can develop agents using their preferred frameworks and languages, package them as containers, and deploy them through the same infrastructure. This reduces friction in getting new agents into production and supports organizational scaling where multiple teams may be developing different agents.

The 8-hour session limit for agent execution provides sufficient time for complex workflows while preventing runaway processes. This type of operational guardrail is important for production systems where resource management and cost control are concerns.

## Critical Assessment and Limitations

While the case study presents an impressive implementation, several caveats and limitations should be noted. The blog post is clearly promotional material for AWS services and Amazon Bedrock AgentCore specifically, so claims about productivity gains and data quality improvements should be viewed with appropriate skepticism. No quantitative metrics are provided for processing time reductions, cost savings, or error rate improvements, making it difficult to assess the actual business impact.

The case study describes the architecture and deployment patterns but provides limited detail about challenges encountered during implementation, model performance issues, or iterations required to achieve production quality. This is typical of vendor case studies but means we don't have a complete picture of the implementation effort required or problems that needed to be solved.

The reliance on managed services from a single cloud provider (AWS) creates vendor lock-in concerns, though the use of open standards like MCP and OpenTelemetry, along with the framework-agnostic approach supporting LangGraph and other frameworks, provides some mitigation. The ability to use different model providers through LiteLLM also provides flexibility in model selection.

The case study doesn't address important production concerns like model evaluation methodologies, testing strategies for agent workflows, or approaches to handling model failures and edge cases. There's no discussion of how agent responses are validated, what accuracy metrics are tracked, or how the system handles situations where agents provide incorrect or inconsistent outputs.

The adaptive orchestration pattern in the incident management use case, where the Smart Solver Agent decides which specialized agents to invoke, introduces complexity in understanding system behavior and debugging issues. While this is likely more efficient than always invoking all agents, it also makes the system less deterministic and potentially harder to troubleshoot when unexpected behavior occurs.

## LLMOps Maturity and Best Practices

Despite these limitations, the implementation demonstrates several LLMOps best practices and represents a relatively mature approach to production LLM deployment:

**Separation of Concerns**: The layered architecture separating agentic resources, inference, and data layers enables independent scaling and evolution of each component. This architectural pattern supports long-term maintainability and allows different teams to work on different layers without tight coupling.

**Abstraction Layers**: The use of LiteLLM as a proxy and the inference layer abstraction enables model experimentation without code changes. This is critical for production systems where model capabilities evolve rapidly and organizations need flexibility to adopt new models as they become available.

**Standardized Integration**: The use of MCP for tool integration provides consistent patterns for connecting agents to data sources and external systems. This reduces custom integration code and makes it easier to add new capabilities to agents.

**Managed Infrastructure**: Leveraging managed services for compute, memory, identity, and observability allows teams to focus on agent logic rather than infrastructure management. This is particularly important for organizations that may not have deep expertise in distributed systems and want to reduce operational overhead.

**Comprehensive Observability**: The dual-layer observability approach using both CloudWatch and Langfuse provides visibility into both infrastructure and AI-specific metrics, which is essential for operating production LLM systems.

**Security and Compliance**: The VPC deployment pattern, integration with enterprise identity systems, and network isolation demonstrate attention to enterprise security requirements that are often barriers to production LLM adoption.

## Future Roadmap and Evolution

Iberdrola's stated future enhancements provide insight into areas where they see room for improvement. The desire for an agent catalog suggests they anticipate scaling to many agents and need better governance and discovery mechanisms. This is a common challenge in enterprise LLMOps as the number of agents grows across different use cases and teams.

The interest in new protocols like Agent-to-Agent (A2A) communication indicates plans for more sophisticated multi-agent systems where agents can interact dynamically rather than through predetermined workflows. This represents evolution toward more autonomous agent systems but also introduces additional complexity in testing and validation.

The desire for managed orchestration and real-time flow monitoring suggests that while the current implementation works, there are opportunities for better visibility into complex multi-agent interactions. This reflects a general challenge in agentic AI systems where understanding and debugging emergent behaviors from agent interactions can be difficult.

## Conclusion and Key Takeaways

Iberdrola's implementation represents a substantive production deployment of multi-agent AI systems for IT operations management. The use of Amazon Bedrock AgentCore demonstrates how managed platforms can accelerate enterprise LLM adoption by handling infrastructure concerns, though organizations should carefully evaluate the tradeoffs of platform dependencies.

The case study illustrates important LLMOps patterns including layered architectures, abstraction layers for model access, standardized tool integration, comprehensive observability, and secure deployment practices. The combination of deterministic workflows for change validation and adaptive orchestration for incident management shows thoughtful application of different agent patterns based on use case requirements.

From a critical perspective, the lack of quantitative results, limited discussion of challenges and iterations, and absence of details about evaluation and testing methodologies means we should view the claimed benefits with some caution. However, the technical architecture and deployment patterns described are sound and reflect mature thinking about production LLM systems. Organizations considering similar implementations can learn from Iberdrola's architectural approach while recognizing that successful production deployment requires addressing evaluation, testing, and validation concerns that this case study doesn't fully explore.