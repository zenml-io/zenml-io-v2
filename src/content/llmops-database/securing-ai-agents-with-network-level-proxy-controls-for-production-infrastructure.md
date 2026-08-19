---
title: "Securing AI Agents with Network-Level Proxy Controls for Production Infrastructure"
slug: "securing-ai-agents-with-network-level-proxy-controls-for-production-infrastructure"
draft: false
llmopsTags:
  - "customer-support"
  - "high-stakes-application"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "multi-agent-systems"
  - "kubernetes"
  - "postgresql"
  - "monitoring"
  - "databases"
  - "security"
  - "guardrails"
  - "fastapi"
  - "docker"
  - "microservices"
  - "anthropic"
  - "openai"
  - "amazon-aws"
industryTags: "tech"
company: "Deno"
summary: "Deno faced the challenge of using AI agents powered by models like Claude Opus to automatically handle production incidents in their Deno Deploy hosting service, requiring agents to access critical systems like PostgreSQL, Kubernetes, ClickHouse, AWS, GitHub, and Slack with write permissions. While the agents proved capable of resolving many incidents that previously required human intervention, the company recognized that agents could not be trusted to police themselves due to risks like prompt injection attacks and unpredictable behavior. To address this, Deno developed Claw Patrol, an open-source network proxy that sits between agents and infrastructure, parsing every byte of network communication across multiple protocols including non-HTTP ones, enforcing granular permission rules defined in version-controlled configuration files, injecting credentials so agents never see secrets directly, and providing approval workflows and dashboards for monitoring agent actions in real-time."
link: "https://www.youtube.com/watch?v=MkRYPFIMCSA"
year: 2026
seo:
  title: "Deno: Securing AI Agents with Network-Level Proxy Controls for Production Infrastructure - ZenML LLMOps Database"
  description: "Deno faced the challenge of using AI agents powered by models like Claude Opus to automatically handle production incidents in their Deno Deploy hosting service, requiring agents to access critical systems like PostgreSQL, Kubernetes, ClickHouse, AWS, GitHub, and Slack with write permissions. While the agents proved capable of resolving many incidents that previously required human intervention, the company recognized that agents could not be trusted to police themselves due to risks like prompt injection attacks and unpredictable behavior. To address this, Deno developed Claw Patrol, an open-source network proxy that sits between agents and infrastructure, parsing every byte of network communication across multiple protocols including non-HTTP ones, enforcing granular permission rules defined in version-controlled configuration files, injecting credentials so agents never see secrets directly, and providing approval workflows and dashboards for monitoring agent actions in real-time."
  canonical: "https://www.zenml.io/llmops-database/securing-ai-agents-with-network-level-proxy-controls-for-production-infrastructure"
  ogTitle: "Deno: Securing AI Agents with Network-Level Proxy Controls for Production Infrastructure - ZenML LLMOps Database"
  ogDescription: "Deno faced the challenge of using AI agents powered by models like Claude Opus to automatically handle production incidents in their Deno Deploy hosting service, requiring agents to access critical systems like PostgreSQL, Kubernetes, ClickHouse, AWS, GitHub, and Slack with write permissions. While the agents proved capable of resolving many incidents that previously required human intervention, the company recognized that agents could not be trusted to police themselves due to risks like prompt injection attacks and unpredictable behavior. To address this, Deno developed Claw Patrol, an open-source network proxy that sits between agents and infrastructure, parsing every byte of network communication across multiple protocols including non-HTTP ones, enforcing granular permission rules defined in version-controlled configuration files, injecting credentials so agents never see secrets directly, and providing approval workflows and dashboards for monitoring agent actions in real-time."
notion:
  pageId: "3c1f8dff-2538-80a4-92d9-ebb4a9fa7ab8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T08:54:00.000Z"
  lastEditedTime: "2026-08-19T09:21:00.000Z"
  publishedAt: "2026-08-19T09:23:25Z"
---

## Overview

Deno operates Deno Deploy, a website hosting service that experiences occasional downtime and incidents requiring immediate response. The company, led by Ryan, the creator of Node.js, has been exploring the use of AI agents to automatically service these incidents rather than relying solely on human engineers responding to PagerDuty alerts. This case study demonstrates a production implementation of autonomous AI agents with comprehensive infrastructure access, while addressing the critical security challenges that emerge when deploying such agents at scale.

The core innovation involves giving agents like Claude Opus access to production systems including PostgreSQL databases, Kubernetes clusters, ClickHouse for traces, AWS infrastructure, GitHub repositories, and Slack communications. Importantly, these agents are granted write access, not just read-only permissions, enabling them to take corrective actions without human intervention. This approach has proven effective, with agents successfully resolving many incidents that previously required human involvement. However, Deno recognized early that this power created severe security risks that required systematic solutions beyond relying on model alignment.

## The Security Challenge

The fundamental problem Deno identified is that AI agents cannot be trusted to police themselves, regardless of how well-aligned the underlying models are. While Claude Opus demonstrates strong alignment and will typically refuse harmful requests like deleting user tables even when prompted directly, Deno takes the position that security cannot rely on wishful thinking about model behavior. Several factors compound this risk:

The agents are connected to support systems, making them vulnerable to prompt injection attacks from external actors. An adversary could potentially craft specific strings of characters that manipulate even well-aligned models into taking destructive actions while believing they are behaving correctly. The complexity of production systems creates additional vulnerabilities through composition of access. For example, an agent might tunnel through an EKS endpoint to reach a PostgreSQL database inside a VPC, then spawn a psql subprocess to execute destructive SQL commands. These attack paths can be extremely complicated in real-world enterprise environments.

Traditional approaches to this problem prove insufficient for Deno's needs. While ACLs and permission systems exist, careful credential provisioning across many different systems is complex and error-prone. The composition of access across multiple systems can create security holes even when individual components are properly secured. MCP tools can structure access with proper permissions, but agents can break through these boundaries by spawning subprocesses, as happens when Claude spawns psql to interact with PostgreSQL databases.

Existing security tools address parts of the problem but not the complete picture. LLM gateways like OpenRouter and LiteLLM offer guardrails features that scan for prompt injection and malicious patterns, but these operate only at the LLM communication layer, not at the infrastructure access layer. HTTP proxies like HTTP Jail allow rules based on HTTP methods and paths, while Crabtrap from Brex uses an LLM-as-judge approach for HTTP requests. Agent Vault injects credentials into outgoing requests so agents never see secrets directly. Process sandboxes like NVIDIA's OpenShell provide OS-level controls over filesystem access and system calls. However, none of these solutions comprehensively address the specific challenges Deno faces: controlling access across multiple protocols beyond HTTP, understanding complex tunneling scenarios, and enforcing granular rules at the network byte level.

## The Claw Patrol Solution

In response to these challenges, Deno developed Claw Patrol, an open-source MIT-licensed proxy system that treats agent software as untrusted and implements security boundaries external to the agent itself. The core architecture positions Claw Patrol as a network proxy sitting in front of agents, inspecting and controlling every byte flowing out of the agent to external systems.

Unlike HTTP-only proxies, Claw Patrol operates at a lower network level, understanding multiple protocols including non-HTTP ones like the PostgreSQL wire protocol and ClickHouse. This protocol awareness is critical because agents frequently spawn subprocesses like psql that communicate using protocol-specific formats. Claw Patrol includes a plugin system for extending support to additional protocols as needed.

The rule system represents the heart of Claw Patrol's functionality. Deno maintains rules in configuration files written in HCL, the HashiCorp Configuration Language used by Terraform. This approach provides several advantages: the configuration is version-controlled in Git, changes are reviewed carefully through standard code review processes, and the declarative syntax allows precise expression of complex permission scenarios. Deno's production rule file has grown to approximately one thousand lines, representing detailed permissions for all their services. Rules can block specific PostgreSQL functions, restrict access to certain database tables, limit HTTP methods and paths, and enforce any other protocol-specific constraints.

An example rule in the presentation demonstrates blocking certain PostgreSQL functions from being called, even when the connection is tunneled through other systems. This capability addresses the complex attack scenarios Deno identified, where agents might chain multiple access paths to reach sensitive systems.

## Credential Management

Claw Patrol implements comprehensive credential injection similar to Agent Vault but extended across multiple protocols. Agents never see actual credential values; instead, they use placeholder credentials that Claw Patrol intercepts and replaces with real secrets when proxying requests. This system supports diverse credential types beyond simple bearer tokens:

- HTTP cookies and headers
- PostgreSQL authentication
- ClickHouse credentials  
- OAuth protocols of various types
- AWS SigV4 signing for AWS API requests

This credential diversity reflects the real-world complexity of production systems where authentication mechanisms vary widely across different infrastructure components.

## Approval Workflows and Monitoring

Beyond simple allow/deny rules, Claw Patrol supports approval workflows where actions can be routed to humans for review before execution. Rules can specify that certain actions require approval through Slack channels, or they can invoke LLM-based judges to evaluate whether an action should proceed. These approval mechanisms can be chained, for example first running an LLM judge and then requesting human approval in Slack for particularly sensitive operations.

The system includes a dashboard for real-time monitoring and forensic analysis of agent behavior. The dashboard displays multiple agents or devices and shows all requests flowing through the system, with visual indicators for approved, denied, and pending-approval actions. Users can drill into individual actions to see detailed information about what the agent attempted, which rules applied, and what decision was made. Analytics capabilities allow teams to understand patterns in agent behavior over time.

This monitoring is essential for operating agents in production, providing visibility into what autonomous systems are doing and building confidence that security controls are working as intended. The dashboard also serves as an audit log for compliance and post-incident analysis.

## Network Architecture and Deployment

Deno runs their agents inside Tailscale networks, a zero-trust VPN solution. Claw Patrol operates as a Tailscale exit node, meaning all traffic from agents destined for external systems flows through the Claw Patrol proxy. This architecture ensures that agents cannot bypass security controls by establishing direct network connections. The system also supports WireGuard for teams not using Tailscale, providing flexibility in deployment scenarios.

Deno provisions standalone VMs for running agents, providing isolation at the system level. This approach means they are not particularly concerned about agents accessing files on the filesystem or making problematic system calls, since each agent runs in its own VM. The real security concerns focus on network communications, which is why Claw Patrol operates at the network boundary.

Authentication to the Claw Patrol dashboard leverages Tailscale identity, avoiding the need to implement a separate authentication mechanism. This integration reflects the broader pattern of building security infrastructure that composes multiple specialized tools rather than reimplementing common functionality.

Because Claw Patrol holds credentials to all production systems, securing the Claw Patrol instance itself becomes critical. The Tailscale integration helps address this by ensuring the dashboard and control plane remain off the public internet and accessible only to authenticated team members.

## Testing and Validation

The rule configuration system includes built-in testing capabilities. Developers can provide fixture actions representing requests that should flow through the rules, then create unit tests asserting that these fixtures will be blocked, allowed, or require approval according to the rule configuration. This test system allows teams to validate that rule changes have intended effects before deploying to production.

For the Claw Patrol software itself, Deno maintains a comprehensive test suite covering the various protocols, credential injection mechanisms, and rule evaluation logic. The demonstration in the presentation shows Claw Patrol running in "yellow mode" where an agent attempts to delete a users table from PostgreSQL, spawning a psql subprocess that establishes a network connection through Claw Patrol, which then parses the PostgreSQL protocol bytes, applies rules, and ultimately rejects the destructive action.

## Production Impact and Philosophy

The implementation has enabled Deno to confidently deploy agents with broad production access, resolving incidents that would otherwise require waking engineers in the middle of the night. The agents can investigate issues by examining traces in ClickHouse, querying the production PostgreSQL database for user project information, reviewing GitHub logs, and reading Slack communications to understand context. This comprehensive access enables more effective automated incident response.

Deno's philosophical stance is that agents fundamentally cannot be trusted to police themselves, and this includes security plugins or modifications to agent software. The security boundary must exist externally to the agent, treating it as a black box. This approach acknowledges that no amount of alignment training can provide the security guarantees required for production systems, especially given risks like prompt injection and the inherent unpredictability of large language models.

The company expects that as AI models become smarter and better aligned, they will be less likely to make destructive decisions. Claude Opus already demonstrates better alignment than previous models. However, Deno believes there will always be a need for backstop security mechanisms that provide deterministic guarantees about what agents can and cannot do, regardless of model capabilities.

## Technical Tradeoffs and Limitations

While the presentation focuses on Claw Patrol's capabilities, several tradeoffs and limitations are worth noting. The system requires maintaining detailed configuration files that mirror the complexity of production infrastructure. As the one-thousand-line rule file indicates, this represents significant overhead in understanding, documenting, and maintaining access policies. Changes to infrastructure may require corresponding updates to Claw Patrol rules.

Operating at the network protocol level means Claw Patrol must understand each protocol it supports. While the plugin system provides extensibility, adding support for new protocols requires development effort. Organizations using proprietary or uncommon protocols may need to build custom plugins.

The approval workflow introduces latency into agent operations. Actions requiring human approval cannot complete until a person responds, which may delay incident resolution. The LLM-as-judge option can reduce this latency but introduces its own complexity and potential failure modes.

By treating agents as completely untrusted, Claw Patrol takes a maximalist security approach that some organizations might find overly restrictive. Teams with different risk profiles might accept some level of trust in well-aligned models, potentially simplifying their security architecture at the cost of reduced guarantees.

## Broader LLMOps Implications

This case study illustrates several important principles for production LLM deployments. First, the gap between model capabilities and production readiness extends beyond accuracy and reliability to fundamental security concerns. Even highly capable and well-aligned models require external controls when granted meaningful access to systems.

Second, production LLMOps infrastructure must account for the full complexity of enterprise environments, including multiple protocols, complex network topologies, diverse authentication mechanisms, and intricate permission models. Solutions designed for simplified scenarios often fail to address real-world requirements.

Third, observability and auditability are critical for building confidence in autonomous systems. The monitoring dashboard and approval workflows provide mechanisms for humans to maintain oversight and understanding of agent behavior, which is essential for both security and operational purposes.

Finally, the case demonstrates the value of composing specialized tools rather than expecting single solutions to address all problems. Claw Patrol integrates with Tailscale for networking and authentication, uses HCL for configuration, and operates alongside traditional infrastructure security measures rather than replacing them.

The open-source release of Claw Patrol under an MIT license reflects a recognition that these security challenges affect the broader AI community and benefit from collaborative solutions rather than proprietary approaches. This positions the tool as potential infrastructure for the emerging ecosystem of production AI agent deployments.
