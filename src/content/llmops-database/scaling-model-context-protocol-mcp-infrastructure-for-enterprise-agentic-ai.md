---
title: "Scaling Model Context Protocol (MCP) Infrastructure for Enterprise Agentic AI"
slug: "scaling-model-context-protocol-mcp-infrastructure-for-enterprise-agentic-ai"
draft: false
llmopsTags:
  - "code-generation"
  - "customer-support"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "memory"
  - "evals"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "orchestration"
  - "security"
  - "guardrails"
  - "documentation"
  - "crewai"
  - "anthropic"
industryTags: "tech"
company: "Uber"
summary: "Uber faced challenges scaling agentic AI workflows across over 5,000 engineers and 10,000+ services, with 1,500 monthly active agents generating 60,000+ executions per week. Without standardization, teams built custom integrations independently, creating security risks, governance concerns, and quality issues. The solution involved building an MCP Gateway and Registry as a centralized control plane, featuring automated translation of service endpoints into MCP tools, config-driven development, integrated security and PII redaction, and differentiated handling of internal versus third-party MCPs. This infrastructure now supports three main surfaces: a no-code agent builder, an agent SDK for production use cases like grocery assistance and customer support, and coding agents that generate approximately 1,800 code changes weekly."
link: "https://www.youtube.com/watch?v=yVqMxBahjfA"
year: 2026
seo:
  title: "Uber: Scaling Model Context Protocol (MCP) Infrastructure for Enterprise Agentic AI - ZenML LLMOps Database"
  description: "Uber faced challenges scaling agentic AI workflows across over 5,000 engineers and 10,000+ services, with 1,500 monthly active agents generating 60,000+ executions per week. Without standardization, teams built custom integrations independently, creating security risks, governance concerns, and quality issues. The solution involved building an MCP Gateway and Registry as a centralized control plane, featuring automated translation of service endpoints into MCP tools, config-driven development, integrated security and PII redaction, and differentiated handling of internal versus third-party MCPs. This infrastructure now supports three main surfaces: a no-code agent builder, an agent SDK for production use cases like grocery assistance and customer support, and coding agents that generate approximately 1,800 code changes weekly."
  canonical: "https://www.zenml.io/llmops-database/scaling-model-context-protocol-mcp-infrastructure-for-enterprise-agentic-ai"
  ogTitle: "Uber: Scaling Model Context Protocol (MCP) Infrastructure for Enterprise Agentic AI - ZenML LLMOps Database"
  ogDescription: "Uber faced challenges scaling agentic AI workflows across over 5,000 engineers and 10,000+ services, with 1,500 monthly active agents generating 60,000+ executions per week. Without standardization, teams built custom integrations independently, creating security risks, governance concerns, and quality issues. The solution involved building an MCP Gateway and Registry as a centralized control plane, featuring automated translation of service endpoints into MCP tools, config-driven development, integrated security and PII redaction, and differentiated handling of internal versus third-party MCPs. This infrastructure now supports three main surfaces: a no-code agent builder, an agent SDK for production use cases like grocery assistance and customer support, and coding agents that generate approximately 1,800 code changes weekly."
notion:
  pageId: "35af8dff-2538-80ba-a8aa-fbab7b79bb8d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-08T12:49:00.000Z"
  lastEditedTime: "2026-05-08T12:49:00.000Z"
  publishedAt: "2026-05-10T06:01:56Z"
---

## Overview

Uber has deployed an enterprise-scale agentic AI platform that leverages the Model Context Protocol (MCP) to standardize how AI agents interact with the company's massive service infrastructure. The platform supports over 5,000 engineers with more than 90% actively using AI monthly, plus thousands of non-engineering users. The system manages interactions across more than 10,000 services and coordinates over 1,500 monthly active agents that execute more than 60,000 operations per week. This case study provides insight into the operational challenges and architectural patterns needed to run MCP-based agentic workflows at production scale within a large enterprise environment.

The fundamental problem Uber faced was that agentic AI had moved beyond pilot status to become a standard way of working, but without proper infrastructure and standardization, the proliferation of agents and custom integrations threatened to become chaotic and ungovernable. The presentation was delivered by Meghna and Rush, who lead the agentic AI platform and initiatives at Uber, providing a practitioner's perspective on the real-world challenges of LLMOps at scale.

## Core Challenges

The challenges Uber encountered can be categorized into three major areas. First, the development lifecycle lacked standardization. Without a central framework or guidance, teams across Uber were independently building custom MCP server integrations with no reusability between teams. Different groups were solving the same fundamental problems in isolation, each in their own way. This created significant technical debt and made it impossible to trust these systems in production environments. The lack of standardization meant there was no reliable way to develop, test, and deploy MCP servers consistently.

Security and governance constituted the second major challenge area. At Uber's scale and given the sensitivity of data handled, security is non-negotiable. The proliferation of bespoke implementations made governance an immediate concern. The organization needed complete visibility into call patterns and data access. A particular concern was that while humans typically break things slowly, agents can fail much faster and with much larger blast radius. This meant that unauthorized access to data or critical endpoints, even if unintentional, posed significant risks. Additionally, the use of third-party MCPs introduced concerns around data handling practices for external systems.

The third challenge area involved discovery and quality assurance. Engineers and agents needed ways to find the right MCP server for their needs, and more importantly, they needed assurance that the tools they discovered were reliable, performant, and safe. Poor quality tools don't just fail, they degrade overall agent performance, making this a critical operational concern.

## Architectural Solution: MCP Gateway and Registry

Uber's solution centered on building an MCP Gateway and Registry that functions as a centralized control plane for all MCP interactions across the organization. This represents a significant architectural decision to centralize what was previously a distributed, ad-hoc landscape.

The system follows a config-driven approach that automatically translates Uber's service endpoints into MCP tools. This is accomplished by working with Interface Definition Language (IDL) files, specifically proto and thrift files that define the 10,000+ services at Uber. Service owners, who are the domain experts for their respective services, maintain control over which tools get exposed and can fine-tune the descriptions that are presented to LLMs. This approach removes duplication across the organization while enforcing consistency.

A key design decision was to implement differentiated strategies for internal versus third-party MCPs. External systems face significantly more stringent requirements, with additional levels of gating, scanning, and rigorous checks compared to trusted internal systems. This risk-based approach allows the platform to balance security with usability.

The platform deprecated all one-off standalone playground environments that teams had created independently. Everything is now centrally committed and managed in code, providing proper version control, auditability, and lifecycle management. The central registry serves as the single source of truth for discovering all MCPs at Uber and tracking their versions.

## Security and Privacy Architecture

Security and privacy are embedded at every layer of the architecture rather than being added as an afterthought. The system integrates directly with Uber's existing authorization service, ensuring that no data access occurs without proper permissions. Integration with a PII Redactor service provides automatic redaction of sensitive data, addressing privacy concerns systematically.

The platform implements periodic code scanning both at diff commit time and on an ongoing basis to detect problematic patterns, unintended endpoint exposures, or risky tool metadata. Full observability and guardrails are built into the system, including blocking of mutable endpoints that could potentially bring down critical services. Extensive logging, metrics, and tracing provide visibility into all operations, which is essential for debugging, auditing, and continuous improvement.

## Gateway Architecture Details

The gateway architecture comprises two critical components working in concert. The orchestrator component is responsible for generating MCP definitions from the 10,000+ service IDLs at Uber. The gateway service component serves these MCP servers to consumers and allows service owners to update MCP definitions through a controlled process.

The operational flow works as follows: The gateway orchestrator crawls all IDL files (proto and thrift files) across Uber's service landscape. It then invokes an LLM to generate MCP tool descriptions based on message names and comments found in these IDL files. This represents an interesting application of LLMs to generate the metadata that other LLMs will later consume when using these tools. The generated definitions are stored in object storage for persistence and versioning.

The gateway service includes a config provider that picks up these definitions and serves the MCP servers to different consumers across Uber. When service owners need to update definitions, this triggers the creation of a diff, which is essentially a pull request in their version control system. This diff is automatically scanned by Uber's engineering security unified scanning APIs. If the scan passes with no issues, the scan report is attached to the diff, and the diff is committed and deployed to object storage. The gateway service then picks up the updated definitions and exposes them to consumers, completing the update cycle.

## Consumption Patterns

Uber has implemented three main surfaces for consuming MCPs, each designed for different user personas and use cases. The Uber Agent Builder is a no-code solution for building agents, primarily used for internal productivity and team workflow automation. Thousands of these agents are active monthly, and adoption is growing rapidly. This surface democratizes agent creation, allowing non-technical users to leverage the MCP infrastructure.

The Uber Agent SDK represents the code-first solution for building agents, bundled with Uber's agent platform functionality including managed memory, managed chat history, and orchestration capabilities. This SDK powers some of Uber's most critical production use cases, including a grocery assistant agent, a care coordination agent, and the customer support agent that end users interact with when they need help. This demonstrates that the infrastructure is production-grade and handles customer-facing workloads.

The third surface consists of coding agents, including tools like Claude, Cursor, and other developer companions. A particular highlight is Minions, a background agent built on Claude that is producing approximately 1,800 code changes per week. These coding agents are used by 95% of engineers across Uber, demonstrating near-universal adoption for developer productivity.

## Configuration and Tool Selection

Each consumption surface implements MCP integration in ways appropriate to its users. In the Agent Builder, users can mention the MCP server name as an app mention inside system instructions, effectively scoping the MCP within the prompt. For example, a user might specify that when users ask for certain information, the agent should use a specific MCP server for internal search. 

Recognizing that LLMs can hallucinate and select incorrect tools, the platform allows users to pick specific tools from an MCP server rather than exposing all tools. This reduces the decision space for the LLM and makes agents more reliable. Taking this further, the system supports parameter overrides, where parameters can be scoped to static values rather than requiring the LLM to determine them dynamically. These features are accessible through the no-code UI, making reliability improvements accessible to non-technical users.

The Uber Agent SDK uses a YAML configuration file where developers specify the MCP name and identifier field, select specific tools they want to use, and override parameters as needed. The SDK automatically loads these tools and makes them available to the agent with the specified configurations, providing a developer-friendly interface to the same underlying capabilities.

For coding agents, Uber provides an AIFXC tool that allows developers to add MCPs by running an MCP add command. Once added, the MCP server (whether remote or local) becomes available to Claude, Cursor, or any other IDE-based agent available at Uber, providing a consistent experience across different development environments.

## Quality and Discovery Roadmap

Looking forward, Uber is focused on improving the quality of MCP servers and simplifying discovery. The roadmap includes extending the MCP registry to include more comprehensive evaluation information, allowing users to identify the highest quality MCP servers. This will involve surfacing evaluation metrics and including service-level agreements (SLAs) for MCPs, encompassing reliability and availability metrics. This tiered approach will help users understand which MCPs are production-ready versus experimental or lower-tier options.

A tool search tool is being developed to improve the accuracy of tool discovery through automatic discovery and on-demand loading. This addresses the context bloat problem, where including all possible tools in every agent's context window wastes tokens and degrades performance. By loading tools on-demand based on natural language queries, the system can maintain a smaller active context while still providing access to the full catalog when needed.

Evaluations are being built into the registry, complementing the overall agent platform's built-in evaluation capabilities for agents. This will provide systematic quality assurance across the MCP ecosystem.

## Skills and Reusability

An emerging focus is on skills, which can be thought of as recipes for using MCPs. Uber wants to make these skills shareable not just across the entire organization but across different teams, enabling the sharing of processes and conventions. The roadmap includes introducing evaluations for skills, measuring output quality, evaluating the correctness of skill invocation, and enabling A/B testing between different versions of the same skill. This represents a higher level of abstraction above individual tools, capturing best practices and proven patterns.

## LLMOps Considerations and Assessment

This case study illustrates several important LLMOps principles at enterprise scale. The decision to build centralized infrastructure rather than allowing decentralized proliferation addresses governance, security, and quality concerns that would otherwise be intractable at this scale. The config-driven, automated approach to generating tool definitions from existing service IDLs demonstrates how to bootstrap LLM tooling from existing infrastructure investments.

The differentiated treatment of internal versus external MCPs shows mature risk management thinking. The integration with existing enterprise systems like authorization services and PII redaction demonstrates how LLMOps infrastructure should leverage rather than duplicate existing capabilities. The emphasis on observability, logging, metrics, and tracing reflects understanding that production LLM systems require the same operational rigor as traditional software systems.

However, the presentation is delivered by the team building the platform and naturally emphasizes successes. Some questions remain about failure modes, recovery procedures, and how issues are diagnosed when agents misbehave. The metrics provided (1,500 agents, 60,000 executions weekly) demonstrate scale but don't provide insight into quality metrics like task completion rates, user satisfaction, or the distribution of failures. The claim that 95% of engineers use these tools monthly is impressive but doesn't distinguish between deep integration into workflows versus occasional experimentation.

The use of LLMs to generate tool descriptions from IDL comments is pragmatic but raises questions about quality and maintenance. Comments in code are often outdated or incomplete, and LLM-generated descriptions may inherit these problems or introduce hallucinations. The ability for service owners to fine-tune descriptions provides a correction mechanism, but it's unclear how systematic this process is or how quality is measured.

The roadmap items around evaluation and quality metrics suggest these are still evolving, which is reasonable given the rapid pace of development but also indicates the platform is still maturing. The emphasis on skills and reusability points to a recognition that raw tools are insufficient, and higher-level abstractions are needed for non-expert users to be successful.

Overall, this represents a sophisticated LLMOps implementation at genuine enterprise scale, with thoughtful attention to security, governance, and developer experience. The architectural patterns around centralized registries, automated tool generation, and tiered quality systems provide valuable lessons for other organizations scaling agentic AI. The case study would be strengthened by more discussion of failure modes, quality metrics, and the organizational change management required to achieve 90%+ adoption, but it nonetheless provides a valuable window into production LLMOps practices at a major technology company.
