---
title: "Deploying AI Coding Agents in Highly Regulated Environments with Secure Infrastructure"
slug: "deploying-ai-coding-agents-in-highly-regulated-environments-with-secure-infrastructure"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908916441d25af05a3fc358"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:27.927Z"
  createdOn: "2025-11-03T11:26:28.347Z"
llmopsTags:
  - "code-generation"
  - "regulatory-compliance"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "docker"
  - "kubernetes"
  - "security"
  - "compliance"
  - "guardrails"
  - "orchestration"
  - "devops"
  - "cicd"
  - "anthropic"
  - "google-gcp"
  - "amazon-aws"
industryTags: "tech"
company: "ONA"
summary: "ONA addresses the challenge faced by companies in highly regulated sectors (finance, government) that need to leverage AI coding assistants while maintaining strict data security and compliance requirements. The problem stems from the fact that many organizations initially ban AI tools like ChatGPT due to data leakage concerns, but employees use them anyway (with surveys showing 45% admit using banned AI tools and 58% sending sensitive data to public AI services). ONA's solution is a software engineering agent platform that runs entirely within the customer's own virtual private cloud (VPC), using isolated disposable development environments (virtual machines with dev containers), providing admin controls and audit logs, and ensuring all data remains within the customer's network with client-side encryption. The platform enables secure AI-assisted development with direct connections to customers' Git providers and LLM services without ONA accessing any code or sensitive data."
link: "https://www.youtube.com/watch?v=atAxfIUMdqI"
year: 2025
seo:
  title: "ONA: Deploying AI Coding Agents in Highly Regulated Environments with Secure Infrastructure - ZenML LLMOps Database"
  description: "ONA addresses the challenge faced by companies in highly regulated sectors (finance, government) that need to leverage AI coding assistants while maintaining strict data security and compliance requirements. The problem stems from the fact that many organizations initially ban AI tools like ChatGPT due to data leakage concerns, but employees use them anyway (with surveys showing 45% admit using banned AI tools and 58% sending sensitive data to public AI services). ONA's solution is a software engineering agent platform that runs entirely within the customer's own virtual private cloud (VPC), using isolated disposable development environments (virtual machines with dev containers), providing admin controls and audit logs, and ensuring all data remains within the customer's network with client-side encryption. The platform enables secure AI-assisted development with direct connections to customers' Git providers and LLM services without ONA accessing any code or sensitive data."
  canonical: "https://www.zenml.io/llmops-database/deploying-ai-coding-agents-in-highly-regulated-environments-with-secure-infrastructure"
  ogTitle: "ONA: Deploying AI Coding Agents in Highly Regulated Environments with Secure Infrastructure - ZenML LLMOps Database"
  ogDescription: "ONA addresses the challenge faced by companies in highly regulated sectors (finance, government) that need to leverage AI coding assistants while maintaining strict data security and compliance requirements. The problem stems from the fact that many organizations initially ban AI tools like ChatGPT due to data leakage concerns, but employees use them anyway (with surveys showing 45% admit using banned AI tools and 58% sending sensitive data to public AI services). ONA's solution is a software engineering agent platform that runs entirely within the customer's own virtual private cloud (VPC), using isolated disposable development environments (virtual machines with dev containers), providing admin controls and audit logs, and ensuring all data remains within the customer's network with client-side encryption. The platform enables secure AI-assisted development with direct connections to customers' Git providers and LLM services without ONA accessing any code or sensitive data."
---

## Overview

ONA has developed a software engineering agent platform specifically designed for highly regulated environments where traditional AI coding assistants face significant adoption barriers due to data security and compliance concerns. The presentation addresses a critical tension in the AI adoption landscape: companies in regulated sectors like finance and government face substantial legal obligations around data protection, leading many to ban AI tools entirely as a first response. However, this creates a "shadow AI" problem where employees continue using banned tools anyway, creating even greater security risks.

The speaker cites compelling statistics from a cybersecurity firm survey showing that 45% of employees admit to using banned AI tools, 58% have sent sensitive company or client data to services like ChatGPT or Gemini, and 40% would use AI tools even against company policy if it makes their work faster. The presentation also references real-world examples of major companies blocking AI, including Samsung detecting code leaks and Wall Street banks banning ChatGPT. While acknowledging that initial blocking may be sensible given the uncertainties around new attack vectors like prompt injection, the speaker argues this position is unsustainable due to productivity losses and the shadow AI problem.

## The ONA Architecture and Approach

ONA's architecture is built around several key principles designed specifically for regulated environments. At the core is the concept of "environments" - isolated, disposable development environments implemented as virtual machines containing dev containers with all project dependencies, compilers, and configurations needed for immediate development work. This approach provides several critical advantages for running AI agents in production:

**Isolation and Disposability**: Each agent runs in a completely independent virtual machine, allowing parallel execution without interference. If an agent breaks something or behaves unexpectedly, the entire environment can simply be discarded and recreated without any lasting impact. This disposability is crucial for production deployments where AI agents might take unpredictable actions.

**In-VPC Deployment**: The entire platform can run within the customer's own virtual private cloud on AWS, Google Cloud, or other providers. This is perhaps the most significant architectural decision from a compliance perspective. ONA explicitly states they don't have access to customer data and don't want access to it. All code, all development activities, and all agent operations happen entirely within the customer's network perimeter.

**Runner Architecture**: ONA employs a "runner" component that operates within the customer's cloud environment. This runner is responsible for orchestrating the creation and management of development environments and agents. Critically, the architecture uses a pull model rather than push - the runner pulls information from ONA's servers about what environments and agents to run, rather than ONA pushing commands into the customer's network. This means customers don't need to open any inbound ports, significantly reducing the attack surface.

**Data Handling and Encryption**: ONA stores minimal data on their own servers - primarily metadata about projects (names, structure) and user information for authentication to their platform (not customer systems). Any data that must be stored and is considered private to the customer is encrypted client-side using the customer's own private keys before being stored on ONA's servers. This means ONA cannot decrypt or access this data even though it resides on their infrastructure.

## LLM Integration and Model Flexibility

A key aspect of the LLMOps architecture is how ONA handles LLM integration. Rather than forcing customers through a single API gateway or requiring all LLM calls to route through ONA's infrastructure, the platform supports direct connections from the customer's environment to their chosen LLM provider. The presentation mentions support for Anthropic, AWS Bedrock, Google Vertex AI, and other providers.

This direct connection approach is significant from both a security and operational perspective. From a security standpoint, it means sensitive code and prompts never transit through ONA's infrastructure - they go directly from the customer's VPC to their chosen LLM provider. From an operational perspective, it provides flexibility in model selection and allows customers to leverage existing agreements and credits with cloud providers.

The speaker mentions that approximately 70% of code commits in their own company are AI-generated (with the remaining 30% being human-written and all code being human-reviewed), and references reports from Google and Microsoft indicating that 30% of new code at those companies is AI-generated. These statistics are presented as evidence of the productivity gains that regulated companies are missing out on by blocking AI entirely.

## Guardrails and Control Mechanisms

The platform provides several layers of guardrails specifically designed for production LLM deployments:

**Administrative Controls**: Administrators can control what actions agents can execute, what networks they can access, and what resources they can interact with. This provides fine-grained security controls appropriate for regulated environments.

**Audit Logging**: All actions are logged, providing the traceability and accountability required in regulated sectors. This is crucial for compliance and forensic analysis if issues arise.

**Network Isolation**: By running in isolated virtual machines within the customer's VPC, agents can't access other parts of the customer's infrastructure or exfiltrate data outside the controlled environment.

**Developer Access Patterns**: The platform supports multiple access methods - SSH directly to environments, web-based Visual Studio Code, local Visual Studio Code or Cursor IDE connecting to remote environments. All of these connections happen directly within the customer's network without routing through ONA's infrastructure.

## Production Deployment Considerations

The architecture reveals several thoughtful considerations for running AI agents in production:

**Scalability through Parallelization**: The isolated environment approach allows running multiple agents in parallel without interference, which is crucial for scaling AI-assisted development across large organizations.

**State Management**: The disposable nature of environments means careful consideration must be given to what state needs to be persisted (in git repositories or other systems) versus what can be ephemeral.

**Multi-Device Continuity**: The platform supports a somewhat novel use case where developers can start work on one device (laptop), continue on another (mobile), and resume later, with the actual development environment persisting in the cloud. This is enabled by the server-side environment architecture.

**Cloud Agnosticism**: While the presentation focuses on AWS and Google Cloud, the architecture appears designed to be cloud-agnostic, with customers able to deploy on their preferred infrastructure.

## Critical Assessment and Tradeoffs

While the presentation is clearly promotional for ONA's product, the underlying architecture addresses real challenges in deploying LLM-based coding agents in regulated environments. The key tradeoffs and considerations include:

**Complexity vs. Security**: The architecture is significantly more complex than simply using ChatGPT or GitHub Copilot directly. Organizations must weigh whether the added complexity and operational overhead is justified by the security and compliance benefits. For truly regulated environments, this tradeoff likely makes sense, but for less regulated organizations, simpler solutions might suffice.

**Performance Implications**: Running everything in isolated virtual machines with dev containers adds overhead compared to running tools directly on developer workstations. The presentation doesn't discuss performance implications or latency considerations.

**Trust Model**: While ONA claims they don't access customer data, organizations must still trust that the ONA platform components running in their environment are behaving as described and not exfiltrating data. The runner component that connects to ONA's servers represents a potential trust boundary that would need careful evaluation.

**Operational Burden**: Managing infrastructure in your own VPC means the customer is responsible for availability, scaling, updates, and troubleshooting of the underlying infrastructure. This shifts operational burden from the vendor to the customer.

**Cost Structure**: Running dedicated virtual machine environments for each agent session likely has significant infrastructure costs compared to shared, multi-tenant solutions. The presentation doesn't address the economic tradeoffs.

**LLM Provider Dependence**: While the architecture supports multiple LLM providers, customers still need to establish their own relationships and handle billing with these providers. The productivity claims (70% AI-generated code) depend heavily on the quality and availability of the underlying LLM services.

**Limited Scope**: The solution focuses specifically on software engineering use cases. Organizations looking for AI assistance across other domains would need additional solutions, potentially complicating their overall AI strategy.

## LLMOps Maturity and Best Practices

The ONA architecture demonstrates several LLMOps best practices for production deployments:

**Infrastructure as Code Principles**: The disposable, reproducible nature of the development environments aligns with infrastructure-as-code principles, ensuring consistency and eliminating "works on my machine" problems.

**Security-First Design**: The architecture prioritizes security from the ground up rather than trying to retrofit security onto an existing system. The pull-based communication model, client-side encryption, and VPC deployment are all security-first design choices.

**Separation of Concerns**: Clear separation between the orchestration layer (ONA's control plane), the execution layer (runners and environments in customer VPC), and the data layer (which stays entirely in customer systems) follows good architectural principles.

**Observability**: The audit logging provides necessary observability for production AI systems, though the presentation doesn't detail what metrics are collected or how monitoring and alerting work.

However, the presentation also reveals some areas where the LLMOps maturity could be questioned or isn't fully addressed:

**Testing and Validation**: No discussion of how the AI-generated code is tested, validated, or what quality gates are in place before code is merged.

**Prompt Engineering and Management**: No mention of how prompts are managed, versioned, or optimized. Given that agent behavior is driven by prompts, this seems like a significant omission.

**Model Version Management**: No discussion of how organizations manage which model versions are used, how they handle model updates, or how they ensure consistency across their organization.

**Cost Monitoring**: No mention of how LLM API costs are tracked, attributed to specific teams or projects, or optimized.

**Evaluation and Metrics**: While productivity claims are made (70% AI-generated code), there's no discussion of how code quality is measured, how agent performance is evaluated, or what metrics are used to assess the value of the AI assistance.

**Failure Handling**: Limited discussion of what happens when agents fail, how errors are handled, or how developers are notified of issues.

## Industry Context and Adoption Challenges

The presentation situates ONA within a broader industry context where AI coding assistants have become increasingly mainstream, but adoption in regulated sectors lags due to legitimate security concerns. The "shadow AI" statistics are particularly compelling because they highlight that simply banning AI doesn't solve the problem - it just pushes usage underground where it's even less controlled and monitored.

The productivity claims (4-12x velocity improvements, though the speaker expresses skepticism about the high end) reflect the broader industry enthusiasm around AI coding assistants, but should be viewed critically. These improvements are often measured in narrow contexts (speed of initial code generation) rather than holistic software engineering productivity (including debugging, testing, maintenance, and understanding).

The references to Samsung and Wall Street banks blocking AI tools demonstrate that the concerns ONA is addressing are real and widespread. However, it's worth noting that the solution ONA proposes - running AI agents in customer infrastructure with careful security controls - is just one approach. Alternatives include using AI tools only for non-sensitive projects, extensive training on safe AI use, development of internal AI tools, or waiting for more mature and explicitly enterprise-focused offerings from major vendors.

## Conclusion

ONA's approach represents a thoughtful attempt to bring AI coding assistance to highly regulated environments through careful architectural choices that prioritize security, compliance, and data sovereignty. The VPC-based deployment, isolation through virtual machines, minimal data retention, and client-side encryption all demonstrate awareness of the requirements in regulated sectors.

However, the solution involves significant complexity and operational overhead, and the presentation leaves several important LLMOps questions unanswered around testing, evaluation, cost management, and monitoring. Organizations considering this approach would need to carefully evaluate whether their regulatory requirements truly necessitate this level of isolation and complexity, or whether simpler solutions with appropriate training and guardrails might suffice. For truly regulated environments with strict data residency and security requirements, ONA's architecture provides a viable path to AI adoption while maintaining compliance, but it's not a simple or lightweight solution.