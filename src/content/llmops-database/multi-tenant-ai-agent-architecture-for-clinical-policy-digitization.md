---
title: "Multi-Tenant AI Agent Architecture for Clinical Policy Digitization"
slug: "multi-tenant-ai-agent-architecture-for-clinical-policy-digitization"
draft: false
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "structured-output"
  - "agent-based"
  - "multi-agent-systems"
  - "memory"
  - "prompt-engineering"
  - "semantic-search"
  - "human-in-the-loop"
  - "evals"
  - "kubernetes"
  - "docker"
  - "langchain"
  - "microservices"
  - "cicd"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "orchestration"
  - "open-source"
  - "guardrails"
  - "scalability"
  - "security"
  - "compliance"
  - "amazon-aws"
  - "cohere"
industryTags: "healthcare"
company: "Cohere Health"
summary: "Cohere Health, a clinical intelligence company powering health plan operations, faced the challenge of digitizing clinical policies from static, unstructured documents into machine-readable formats to enable automated prior authorization workflows. To address regulatory requirements mandating API-based electronic prior authorization by January 2027 and real-time approval targets, they built Cohere Policy Studio using Amazon Bedrock AgentCore with a flexible, multi-tenant agentic architecture. The solution leverages AgentCore Runtime's secure microVM isolation, AgentCore Gateway for unified tool access, AgentCore Memory for session management, and the Agent Skills open standard for rapid capability deployment. Results included a 30% reduction in policy digitization time (from 2 hours 15 minutes to 1 hour 35 minutes per policy), deployment velocity improvements from 3-4 months to 2-6 weeks for full agent deployments, and thousands of policies digitized to date with comprehensive coverage across formats and sources."
link: "https://aws.amazon.com/blogs/machine-learning/how-cohere-health-digitizes-clinical-policies-using-amazon-bedrock-agentcore/"
year: 2026
seo:
  title: "Cohere Health: Multi-Tenant AI Agent Architecture for Clinical Policy Digitization - ZenML LLMOps Database"
  description: "Cohere Health, a clinical intelligence company powering health plan operations, faced the challenge of digitizing clinical policies from static, unstructured documents into machine-readable formats to enable automated prior authorization workflows. To address regulatory requirements mandating API-based electronic prior authorization by January 2027 and real-time approval targets, they built Cohere Policy Studio using Amazon Bedrock AgentCore with a flexible, multi-tenant agentic architecture. The solution leverages AgentCore Runtime's secure microVM isolation, AgentCore Gateway for unified tool access, AgentCore Memory for session management, and the Agent Skills open standard for rapid capability deployment. Results included a 30% reduction in policy digitization time (from 2 hours 15 minutes to 1 hour 35 minutes per policy), deployment velocity improvements from 3-4 months to 2-6 weeks for full agent deployments, and thousands of policies digitized to date with comprehensive coverage across formats and sources."
  canonical: "https://www.zenml.io/llmops-database/multi-tenant-ai-agent-architecture-for-clinical-policy-digitization"
  ogTitle: "Cohere Health: Multi-Tenant AI Agent Architecture for Clinical Policy Digitization - ZenML LLMOps Database"
  ogDescription: "Cohere Health, a clinical intelligence company powering health plan operations, faced the challenge of digitizing clinical policies from static, unstructured documents into machine-readable formats to enable automated prior authorization workflows. To address regulatory requirements mandating API-based electronic prior authorization by January 2027 and real-time approval targets, they built Cohere Policy Studio using Amazon Bedrock AgentCore with a flexible, multi-tenant agentic architecture. The solution leverages AgentCore Runtime's secure microVM isolation, AgentCore Gateway for unified tool access, AgentCore Memory for session management, and the Agent Skills open standard for rapid capability deployment. Results included a 30% reduction in policy digitization time (from 2 hours 15 minutes to 1 hour 35 minutes per policy), deployment velocity improvements from 3-4 months to 2-6 weeks for full agent deployments, and thousands of policies digitized to date with comprehensive coverage across formats and sources."
notion:
  pageId: "3b5f8dff-2538-80d2-af72-e730226e2aa2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T20:04:00.000Z"
  lastEditedTime: "2026-08-07T20:04:00.000Z"
  publishedAt: "2026-08-07T20:07:57Z"
---

## Overview of the Case Study

Cohere Health is a clinical intelligence company that provides operational infrastructure for health plans, particularly in the complex domain of prior authorization—the approval process health plans require before covering certain medical services or medications. The company identified a critical bottleneck in healthcare operations: clinical policies governing prior authorization decisions were trapped in static, unstructured formats (PDFs, documents) that resisted automation. These policies vary significantly by clinical area, geography, line of business, and health plan, and they evolve continuously as medical knowledge and technology advance. Without a systematic way to manage, analyze, and optimize these policies in a machine-readable format, health plans struggled to modernize their operations at scale while maintaining clinical oversight.

The urgency of this problem intensified due to converging regulatory and industry pressures. CMS regulations require health plans to support API-based electronic prior authorization by January 2027, while AHIP commitments mandate that health plans achieve 80% real-time approvals for electronic prior authorization submissions. Each line of business has unique requirements, multiplying the complexity of managing and deploying clinical policies rapidly and accurately.

To address these challenges, Cohere Health built Cohere Policy Studio using Amazon Bedrock AgentCore, creating a multi-tenant agentic architecture designed specifically for policy digitization at scale. The solution demonstrates sophisticated LLMOps practices including modular agent deployment, unified tool orchestration, domain-specific skills management, and continuous evaluation workflows—all while maintaining the strict data isolation and audit capabilities required in healthcare.

## Technical Architecture and LLMOps Implementation

### Multi-Tenant Agent Runtime with Secure Isolation

A foundational LLMOps consideration for Cohere Health was multi-tenancy. Serving multiple health plans requires strict data isolation between tenants to comply with healthcare privacy regulations and competitive concerns. AgentCore Runtime addresses this through secure microVM (micro virtual machine) isolation, which provides dedicated compute, memory, and filesystem resources per session. This architectural choice eliminates the risk of data leakage between different health plan customers while allowing Cohere Health to operate a single, unified platform.

The microVM isolation model represents a sophisticated approach to production LLM deployment where traditional containerization might not provide sufficient security guarantees. Each agent session runs in its own isolated virtual machine, ensuring that even if one session were compromised, it could not access data from other tenants. This level of isolation is particularly critical in healthcare, where regulatory compliance requirements are stringent.

### Base Image Pattern for Consistent Agent Deployment

One of the key LLMOps innovations described in this case study is the "base image and consumer pattern" for agent deployment. Cohere Health developed a two-tier deployment architecture that separates the stable runtime environment from team-specific configurations. The base image, stored in Amazon Elastic Container Registry (ECR), contains the LangChain agent framework and common dependencies. Teams can then deploy new agents with minimal effort using a simple Dockerfile that pulls the base image and adds only their specific configuration file.

This pattern exemplifies several LLMOps best practices. First, it promotes consistency across deployments—all agents share the same tested runtime environment, reducing the risk of configuration drift and deployment errors. Second, it dramatically accelerates deployment velocity by eliminating the need to rebuild infrastructure for each new agent. Third, it enables versioning and rollback at both the infrastructure level (base image versions) and the configuration level (agent-specific settings).

The agent configuration file (`agent_config.yaml`) serves as a declarative interface for controlling numerous production LLM parameters without code changes. Teams can configure memory modes (stateless vs. persistent conversation history), storage strategies (full trace for correction workflows vs. conversation-only for clean history), session context caching to avoid redundant S3 fetches, prompt caching to reduce costs and latency, flexible tool configuration, base model selection on Amazon Bedrock, and LiteLLM configuration as a reverse proxy. This separation of configuration from code is a hallmark of mature LLMOps practices, enabling rapid experimentation and A/B testing without redeployment.

### Unified Tool Access Through AgentCore Gateway

A significant challenge in production LLM systems is managing access to external tools and data sources. Cohere Health's agents need to interact with multiple tool types: AWS Lambda functions for fetching skills and documents, internal APIs maintained by different teams, and various data sources. Managing these integrations individually would create a maintenance burden and slow down development.

AgentCore Gateway solves this by consolidating all tool access behind a single authenticated endpoint. The gateway implements the Model Context Protocol (MCP), providing a standardized interface for tool invocation. This architectural decision demonstrates several important LLMOps principles. The unified gateway abstracts away the complexity of individual tool implementations from the agent runtime, allowing teams to add new tools without redeploying agents. It provides a centralized point for authentication, authorization, and auditing of tool usage. It enables different projects to maintain their own tool collections (generic-tools for shared utilities, digitization-tools for project-specific capabilities) while presenting them through a consistent interface.

The implementation pattern involves a Lambda function that acts as a router, dispatching tool requests to appropriate handlers based on the tool name extracted from the gateway context. Each tool handler is a focused function that retrieves data from a specific source. The gateway adds prefixes to tool names to identify which target they belong to, and the Lambda handler strips these prefixes to route correctly. This design allows for clean separation of concerns and makes the system highly extensible.

### Modular Skills Framework

Perhaps the most significant LLMOps innovation in this case study is the modular skills framework built on the Agent Skills open standard. Traditional approaches to building specialized AI agents require rebuilding infrastructure for each new use case, creating bottlenecks in deployment velocity. Generic prompts produce inconsistent results and lack the nuanced understanding that domain experts bring. Cohere Health addressed this by decoupling domain expertise from agent mechanics through versioned, modular skill definitions.

Skills are authored by clinical policy experts, not just ML engineers, democratizing the development of agent capabilities. Each skill is a self-contained definition of a specific task the agent can perform, with its own prompts, expected inputs/outputs, and evaluation criteria. Skills are stored in S3 and fetched by agents at runtime through the AgentCore Gateway, meaning new capabilities can be deployed without restarting or redeploying the agent infrastructure.

This approach exemplifies several mature LLMOps practices. The separation of domain logic from infrastructure enables rapid iteration—clinical experts can refine skills based on real-world performance without waiting for engineering cycles. The versioning strategy provides both traceability and rollback capability. The framework makes agents composable—a single agent can combine multiple skills to handle complex workflows, and the same skill can be reused across different agents.

### Dual-Layer Versioning Strategy

Cohere Health implements a sophisticated dual-layer versioning scheme for skills that addresses both semantic versioning for capability tracking and deployment history. The first layer uses semantic versioning (e.g., `skill/policy_ingestion/v1.2.3`) to track capability changes, with each version tagged in the git repository. This allows teams to understand at a glance what has changed in a skill and whether those changes are backwards-compatible.

The second layer leverages S3 object versioning to maintain an immutable deployment history. Every upload to S3 is versioned automatically, providing a complete audit trail and the ability to roll back to any previous version instantly. Separate non-production and production S3 buckets ensure that skills are tested before production deployment. This dual-layer approach provides the benefits of both semantic meaning and operational robustness, a pattern that could be adopted broadly in LLMOps implementations.

### Evaluation and Observability

The case study describes a rigorous evaluation process that demonstrates production-grade LLMOps practices. Skills are not deployed to production based on subjective assessment alone—they go through a structured evaluation workflow that combines automated metrics with human review.

The evaluation process begins with reference datasets containing ground truth outputs for each skill. The team defines success metrics covering accuracy, completeness, and consistency. An automated evaluation suite runs against test cases, and when a skill fails, the team analyzes the failure mode, iterates on the skill definition, and retests. This iterative refinement continues until the skill passes the automated evaluation, at which point data science reviews the results against acceptance criteria before approving for production.

Post-deployment, Cohere Health uses Arize AI to track effectiveness metrics in production. This observability platform allows them to monitor skill performance over time, detect degradation, and identify opportunities for optimization. Clinical policy analysts annotate sample outputs to catch errors that automated metrics might miss, creating a feedback loop between real-world performance and skill refinement. This combination of automated and human evaluation represents a mature approach to ensuring LLM quality in production.

### Deployment Pipeline and CI/CD Integration

The skills deployment flow demonstrates production-grade CI/CD practices adapted for LLMOps. When a developer commits changes and opens a pull request to the develop branch, the CI/CD system automatically packages the skill into a `.tar.gz` archive with metadata upon merge. The pipeline uploads the packaged skill to a non-production S3 bucket and updates a manifest file that tracks available skills and their versions.

Teams then evaluate the skill in the non-production environment using the evaluation framework described earlier. Once validated, they open a pull request to the main branch, triggering deployment to production. The production deployment includes gradual rollout and monitoring capabilities, allowing teams to catch issues before they affect all users. This staged deployment approach with automated packaging, environment separation, and monitoring integration represents LLMOps best practices that ensure reliability and enable rapid iteration.

### Memory Management and Session Context

AgentCore Memory provides persistent conversation history and session context, enabling agents to maintain state across interactions. This is particularly important for policy digitization workflows, where analysts may provide feedback that should inform subsequent agent actions within the same session. The configurable memory modes (stateless vs. persistent) and storage strategies (full trace vs. conversation-only) give teams flexibility to optimize for different use cases—full traces support correction workflows where understanding the complete interaction history is valuable, while conversation-only mode provides cleaner history for user-facing interactions.

Session context caching is another performance optimization highlighted in the case study. By automatically caching skill definitions and documents, the system avoids redundant S3 fetches, reducing latency and costs. This kind of optimization is critical in production LLM systems where token costs and response times directly impact user experience and operational expenses.

### Prompt Caching for Cost and Latency Reduction

The agent configuration supports prompt caching, which helps reduce both costs and latency by caching system prompts and frequently used content. In production LLM deployments, the same prompts and context are often used repeatedly—skill definitions, system instructions, and standard documents don't change between invocations. By caching these elements, Cohere Health reduces the number of tokens that need to be processed on each request, directly lowering inference costs and improving response times. This optimization demonstrates attention to the operational concerns that dominate production LLM deployments.

### Model Configuration and LiteLLM Integration

The system uses Amazon Bedrock as the foundation model platform, with configurable parameters for token limits, temperature, and other inference settings. The integration of LiteLLM as a reverse proxy between the model and the agent provides additional flexibility and observability. LiteLLM acts as a unified interface to multiple LLM providers, enabling Cohere Health to potentially switch models or use multiple models without changing agent code. This abstraction layer is an important LLMOps pattern that reduces vendor lock-in and facilitates experimentation with different models.

## Results and Business Impact

The quantitative results demonstrate the business value of sophisticated LLMOps practices. Overall time spent on policy digitization reduced by 30%, from 2 hours 15 minutes to 1 hour 35 minutes per policy. While this might seem modest as a percentage, the impact multiplies across thousands of policies. Cohere Health has digitized thousands of policies to date, and the agent-based framework targets further time reduction as it scales.

Perhaps more impressive is the improvement in deployment velocity. Full agent deployments decreased from 3-4 months to 2-6 weeks. This acceleration comes directly from the LLMOps patterns described: reusable base images, unified tool access, and modular skills. The system now abstracts DevOps concerns sufficiently that traditional ML and data science engineers can deploy agents without extensive software engineering experience, democratizing agent development beyond specialized teams.

The policy coverage results speak to the system's effectiveness at its core mission. Cohere Policy Studio now represents policy content with verbatim text and a standard codified evidence layer, packaged together and available across original policy formats and sources. This comprehensive coverage enables downstream automation workflows that were previously impossible.

The statement from Dr. Brian Covino, Cohere Health's Chief Medical Officer, emphasizes an often-overlooked aspect of healthcare LLMOps—the importance of traceability and provenance. In clinical contexts, it's not enough for an AI system to produce correct answers; stakeholders must be able to trace exactly which policy version governed a decision and verify that this matches what was published to providers. The built-in memory and version tracking in AgentCore make provenance a first-class concern, supporting the clinical integrity requirements that are non-negotiable in healthcare.

## Critical Assessment and Considerations

While the case study presents impressive results, readers should approach vendor-published success stories with appropriate skepticism. The 30% time reduction in policy digitization is measured against a specific baseline workflow, and it's unclear how much of the remaining time is amenable to further automation versus requiring irreducible human judgment. The case study doesn't provide details on error rates, correction rates, or how often the agent's outputs require significant human revision—metrics that would provide a more complete picture of system effectiveness.

The deployment velocity improvements (from 3-4 months to 2-6 weeks) are substantial, but the case study doesn't clarify what percentage of that time in the original process was due to infrastructure limitations versus requirements gathering, testing, and organizational approval processes. Some of the acceleration may come from organizational learning and process improvements rather than purely from the technical architecture.

The multi-tenant isolation provided by microVMs is a strong security feature, but it likely comes with cost and performance tradeoffs compared to lighter-weight containerization. The case study doesn't discuss the resource overhead or cost implications of running separate microVMs for each session, which would be relevant for organizations considering similar architectures.

The reliance on AgentCore—a managed AWS service—provides significant development velocity but also creates vendor lock-in and potentially limits customization compared to building on open-source frameworks directly. Organizations should carefully evaluate whether the productivity gains justify the reduced flexibility and potential future migration costs.

## Future Directions: Knowledge Graph Integration

The case study concludes with a forward-looking section on connecting policies through a knowledge graph, which Cohere Health is prototyping in collaboration with the AWS Generative AI Innovation Center. This represents the next evolution of their LLMOps maturity—moving from isolated policy digitization to a semantic network that connects policies with clinical guidelines, medical codes, drug formularies, and prior authorization criteria across therapeutic areas.

The proposed architecture uses Amazon Neptune to build a graph layer between the policy representation engine and downstream decisioning systems. This semantic layer maps clinical policies to standardized healthcare ontologies (UMLS, SNOMED) to support greater interoperability. The knowledge graph is designed to identify relevant connections as new policies are digitized, flag potential conflicts, and suggest reusable patterns to support reviewer workflows.

This evolution demonstrates a sophisticated understanding of LLMOps at scale. Rather than treating each policy as an isolated artifact, the knowledge graph approach enables learning from patterns across clinical areas, suggesting templates that accelerate deployment of new policy types from days to hours. The bidirectional links between CMS requirements, AHIP commitments, and internal policy representations support regulatory alignment at scale—a critical capability for health plans navigating complex compliance landscapes.

The knowledge graph also enables decisioning engines to query using natural language or FHIR resources to retrieve relevant policy fragments with full provenance and version history. This combination of semantic reasoning, rapid retrieval, and complete audit trails represents a mature vision for healthcare AI infrastructure that balances automation with the oversight requirements of clinical decision-making.

## Broader Implications for LLMOps

This case study illustrates several patterns that extend beyond healthcare to LLMOps generally. The separation of stable infrastructure from configurable behavior through base images and configuration files accelerates iteration while maintaining reliability. The unified tool access pattern through a gateway with standardized protocols (MCP) reduces integration complexity and enables teams to add capabilities without coordination overhead. The modular skills framework demonstrates that domain expertise can be effectively decoupled from agent mechanics, allowing subject matter experts to contribute directly to system capabilities.

The dual-layer versioning strategy (semantic versioning for capability tracking, object versioning for deployment history) provides both human-readable meaning and operational robustness. The combination of automated evaluation with human-in-the-loop annotation creates feedback loops that improve system quality over time. The staged deployment pipeline with environment separation and gradual rollout enables teams to move quickly while catching issues before they impact all users.

These patterns collectively represent a mature approach to LLMOps that balances velocity with reliability, automation with oversight, and standardization with flexibility—lessons that apply across industries and use cases.
