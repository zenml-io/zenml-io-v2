---
title: "Building Durable and Reliable AI Agents at Scale with Dapr Workflows"
slug: "building-durable-and-reliable-ai-agents-at-scale-with-dapr-workflows"
draft: false
llmopsTags:
  - "poc"
  - "chatbot"
  - "question-answering"
  - "document-processing"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "prompt-engineering"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "microservices"
  - "orchestration"
  - "devops"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "postgresql"
  - "redis"
  - "cache"
  - "langchain"
  - "fastapi"
  - "openai"
  - "nvidia"
  - "microsoft-azure"
  - "google-gcp"
  - "meta"
  - "anthropic"
industryTags: "tech"
company: "HumanLayer"
summary: "This case study presents Dapr, a CNCF graduated project, and its application to production AI agent systems through the Dapr Agents framework. The core problem addressed is the unreliability of current agent frameworks when running at scale in production environments, particularly the challenge of state loss during failures that forces expensive re-execution of long-running agentic workflows. Dapr Agents provides a durable agent framework with built-in workflow orchestration, automatic failure detection and recovery, exactly-once execution guarantees, and support for over 30 different state stores. The solution was demonstrated through live examples showing agents automatically resuming from their exact point of failure without manual intervention, multi-agent collaboration using pub/sub mechanisms, and complete observability through OpenTelemetry integration. Contributed by Nvidia to the Dapr project and reaching 1.0 stability in 2026, the framework addresses critical production gaps in existing agent frameworks like LangChain and LangGraph."
link: "https://www.youtube.com/watch?v=9gejXxl5JzE"
year: 2026
seo:
  title: "HumanLayer: Building Durable and Reliable AI Agents at Scale with Dapr Workflows - ZenML LLMOps Database"
  description: "This case study presents Dapr, a CNCF graduated project, and its application to production AI agent systems through the Dapr Agents framework. The core problem addressed is the unreliability of current agent frameworks when running at scale in production environments, particularly the challenge of state loss during failures that forces expensive re-execution of long-running agentic workflows. Dapr Agents provides a durable agent framework with built-in workflow orchestration, automatic failure detection and recovery, exactly-once execution guarantees, and support for over 30 different state stores. The solution was demonstrated through live examples showing agents automatically resuming from their exact point of failure without manual intervention, multi-agent collaboration using pub/sub mechanisms, and complete observability through OpenTelemetry integration. Contributed by Nvidia to the Dapr project and reaching 1.0 stability in 2026, the framework addresses critical production gaps in existing agent frameworks like LangChain and LangGraph."
  canonical: "https://www.zenml.io/llmops-database/building-durable-and-reliable-ai-agents-at-scale-with-dapr-workflows"
  ogTitle: "HumanLayer: Building Durable and Reliable AI Agents at Scale with Dapr Workflows - ZenML LLMOps Database"
  ogDescription: "This case study presents Dapr, a CNCF graduated project, and its application to production AI agent systems through the Dapr Agents framework. The core problem addressed is the unreliability of current agent frameworks when running at scale in production environments, particularly the challenge of state loss during failures that forces expensive re-execution of long-running agentic workflows. Dapr Agents provides a durable agent framework with built-in workflow orchestration, automatic failure detection and recovery, exactly-once execution guarantees, and support for over 30 different state stores. The solution was demonstrated through live examples showing agents automatically resuming from their exact point of failure without manual intervention, multi-agent collaboration using pub/sub mechanisms, and complete observability through OpenTelemetry integration. Contributed by Nvidia to the Dapr project and reaching 1.0 stability in 2026, the framework addresses critical production gaps in existing agent frameworks like LangChain and LangGraph."
notion:
  pageId: "34df8dff-2538-80c2-b30a-d1e8033e5d0d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-25T13:56:00.000Z"
  lastEditedTime: "2026-04-26T13:16:00.000Z"
  publishedAt: "2026-04-26T13:19:42Z"
---

## Overview

This case study centers on Dapr, a Cloud Native Computing Foundation (CNCF) graduated project that has been adapted to address critical production challenges in deploying AI agents at scale. The presentation was delivered by Yaron Schneider, CTO and co-founder of Dapr Grid, co-creator of the Dapr project, and chair of the workflow working group inside the GenAI Foundation. The talk focuses specifically on how Dapr's workflow capabilities solve fundamental reliability, security, and scalability problems that plague current agent frameworks when deployed in production environments.

The core motivation stems from a critical gap in the current AI agent ecosystem: existing frameworks like LangChain, LangGraph, CrewAI, and OpenAI Agents focus heavily on reasoning capabilities, tool calling abstractions, and LLM integrations, but largely ignore distributed systems challenges. This creates severe operational risks when these systems run in production at scale, particularly around state management, failure recovery, and inter-agent communication in distributed environments like Kubernetes.

## The Problem: Production Reliability of AI Agents

The fundamental challenge articulated throughout this case study is that current agent frameworks are not production-ready for enterprise scale. The speaker identifies several critical failure modes that occur when running agentic workflows in production:

**State Loss and Cost Implications**: When an agent executing a 100-step workflow fails at step 99, most frameworks would require replaying from the beginning. This has severe cost implications, as each step might involve expensive LLM calls. If the system crashes before completion, all progress is lost and must be recomputed from scratch. The speaker emphasizes the economic impact of this problem, noting that people don't realize "how much money they're going to have to pay when it basically picks back up and it's going to have to go through those 100 LLM calls over and over again."

**Infrastructure Failures**: The case study highlights real-world failure scenarios such as AWS outages, network blips, LLM provider throttling or downtime, and pod crashes in Kubernetes environments. When such failures occur across systems running thousands of concurrent agentic workflows with millions of workflow instances, the lack of built-in recovery mechanisms becomes catastrophic.

**Multi-Agent Communication in Distributed Systems**: For multi-agent systems where different agents might run in separate Kubernetes pods or across different services, there's no native mechanism in current frameworks to handle service discovery, secure communication, and at-least-once message delivery guarantees. The speaker asks pointedly: "How do you make them discover each other beyond a single process?"

**Non-Determinism and Attack Surface**: AI systems introduce unique challenges beyond traditional distributed systems. LLMs are inherently non-deterministic, which the speaker colorfully describes as being "like a five-year-old's brain on an ayahuasca trip." Additionally, Model Context Protocol (MCP) servers that agents interact with create expanded attack surfaces, accessing databases, CRM systems, and APIs with credentials that could enable lateral movement in case of security breaches.

## The Solution: Dapr and Dapr Agents Framework

Dapr (Distributed Application Runtime) has been positioned as foundational AI infrastructure that addresses these challenges through several building blocks that can be leveraged for AI workloads:

**Workflows**: The cornerstone capability that enables durable execution. Dapr workflows provide automatic failure detection, recovery, and replay capabilities. If a workflow fails at any step, it can resume from exactly that point without re-executing previous steps. This is implemented through a workflow engine that tracks execution state and manages recovery automatically.

**State Management**: Support for over 30 different databases allows agents to persist state across a wide range of backends including Redis, Postgres, DynamoDB, Azure Cosmos DB, Cassandra, and others. This contrasts sharply with frameworks like LangGraph that support only three databases out of the box (Redis, Postgres, and in-memory SQLite). The abstraction layer means switching databases doesn't require code changes, just YAML configuration updates.

**Pub/Sub**: Enables agent discovery and inter-agent communication with at-least-once delivery guarantees. If an agent in a multi-agent system goes down, messages are guaranteed to be processed when it comes back up. This works across different message brokers (Kafka, Pulsar, AWS SQS, Redis) through declarative YAML configuration.

**Conversation API**: Provides LLM abstraction with enterprise features including PII data obfuscation for credit card numbers, names, addresses, and other sensitive information. This works bidirectionally, obfuscating data both going into the LLM and coming out of it, without relying on external services.

**Security and Governance**: Access control policies determine which agents can communicate with which other agents and which MCP servers. Trust domains can be established to create boundaries between agent groups, enabling governance at scale.

**Observability**: Deep integration with OpenTelemetry provides complete audit logs and distributed tracing of all agent activities, crucial for compliance and debugging.

**Resiliency**: Built-in retry policies, circuit breakers, and configurable failure handling to prevent overwhelming downstream systems during failures or high load.

### Dapr Agents Framework

The Dapr Agents framework, contributed by Nvidia to the Dapr project and reaching 1.0 stability just before this presentation (described as "yesterday" in the talk, placing this in 2026), represents a purpose-built agent framework that leverages all of Dapr's capabilities. The key characteristics are:

**Durable Agents**: Agents that automatically persist their state and can recover from any failure point without losing progress. This durability is achieved through the underlying Dapr workflow engine.

**Cloud Native**: Runs natively on Kubernetes with minimal additional infrastructure beyond Dapr and a database of choice. Deployment is straightforward through Docker build and container push.

**Vendor Neutral**: Open source under CNCF, with plans to contribute to the AI Infrastructure Foundation (GenAI Foundation) for better alignment with the AI ecosystem.

**Exactly-Once Execution Guarantees**: Critical for preventing duplicate workflow executions. Even with multiple recovery system instances, Dapr guarantees only one instance of each workflow executes at a time, preventing unwanted side effects.

**Minimal Code Changes**: The framework is designed for simplicity. Agents are defined with name, role, instructions, LLM provider, and state store configuration. Inter-agent communication requires just four lines of code specifying a pub/sub mechanism.

## Technical Implementation Details

The case study demonstrates several technical implementation patterns through live demonstrations:

### Single Agent Durability Demo

A weather agent was demonstrated showing the durability guarantees. The agent process was started with the Dapr CLI development tool running locally with a Dapr sidecar. When a question about Amsterdam weather was submitted via curl, the process was abruptly killed (kill -9 equivalent) during execution before completion. This simulates catastrophic failure with no graceful shutdown. When the agent was restarted without re-submitting the query, it automatically picked up from exactly where it left off and completed the response.

The speaker emphasizes this is unique: "No agent framework can do this today. None will do this because, again, they are not focused on distributed systems challenges."

The underlying mechanism involves the agent state store (configured via YAML as a simple declaration) persisting not just workflow position but also conversation memory and agent state. On restart, Dapr automatically detects the incomplete workflow and resumes it.

### Retry Policies and Circuit Breakers

The demonstration also highlighted automatic retry behavior when the conference internet connectivity was unreliable. Dapr workflows automatically retry failed LLM calls with configurable policies. The speaker notes you can configure retry counts (e.g., "retry for five times before you essentially declare this agentic workflow as failed") and apply circuit breakers to prevent overwhelming systems under load.

### Multi-Agent Collaboration Demo

A more complex demonstration involved two agents - Frodo and Sam from Lord of the Rings - collaborating on inventory management. Each agent ran in its own Dapr process with its own sidecar, providing full isolation. The implementation showed:

- Agent definitions with goals and instructions
- Pub/sub configuration for agent discovery (in this case using Redis, but swappable to Kafka by changing YAML metadata)
- Asynchronous workflow invocation
- Automatic agent selection where the orchestrating agent (Frodo) determined which agent (Sam) to communicate with based on the query
- Conversation threading with "on behalf of" tracking showing which agent sent original messages

The multi-agent system supports unlimited agent scaling with each agent requiring only four lines of pub/sub configuration code. Agents discover each other automatically and can perform iterative loops until mission completion.

### Observability and Tracing

The demonstration included Zipkin traces showing complete audit logs of agent interactions. The traces revealed:

- Initial record entry points
- State get and save operations showing conversation state persistence
- Timing information for each step
- Complete execution flow across agents
- Which agent initiated workflows

All this observability data flows through OpenTelemetry, allowing integration with any OpenTelemetry endpoint.

## Comparison with Existing Agent Frameworks

A significant portion of the case study critiques current agent framework approaches to persistence and reliability, specifically calling out LangChain and LangGraph:

### The Checkpointing Limitation

The speaker explains that leading frameworks rely on checkpointing: "recording the output of every step, JSON serializing it, and saving it in a very, very non-efficient way to a database." While this gets state into the database, it's insufficient for production reliability because:

**No Automatic Recovery**: "You can take any agent framework today and hook up their checkpointing mechanism and try it out, it'll do nothing. It'll just sit there. It won't pick up where it left off." The frameworks save checkpoints but provide no mechanism to automatically detect failures and resume from those checkpoints.

**Missing Failure Detection**: With thousands of agents running thousands of workflows, how do you detect which specific step failed, which agent failed, when, on which cluster, and talking to which system? Frameworks hand this responsibility to users.

**Manual Recovery Burden**: Even if you detect failures, you need a separate system to iterate through checkpoints and call framework APIs to resume workflows. But what if that recovery system fails? How do you make it durable? This creates a recursive reliability problem.

**Duplicate Execution Risk**: If you have multiple instances of a recovery system, frameworks may allow the same workflow to be continued twice, causing duplicate executions with problematic side effects. Dapr's exactly-once guarantee prevents this.

**Limited Database Support**: LangGraph supports only three databases (Redis, Postgres, SQLite in-memory) versus Dapr's 30+ options including DynamoDB, Cosmos DB, Cassandra, and others.

The speaker's position is clear: "My position today is that none of those frameworks are actually production ready. Not for enterprise scale. Why? Because they don't give you the security and reliability primitives that you need."

## Integration with Existing Frameworks

Recognizing that many organizations have already invested in frameworks like LangChain, LangGraph, Strands, or OpenAI Agents, the case study addresses integration approaches. Dapr workflow extensions can be integrated into existing agent frameworks to bring durability and reliability benefits without complete rewrites.

The speaker mentions that integration code is available through community efforts and commercial implementations, though the open source integrations are still being developed. Organizations that have built custom agent frameworks over the past two years are exploring how to leverage Dapr to commercialize and scale their internal platforms across teams.

## Real-World Usage

The case study mentions several real-world applications:

**Nvidia's RAG Pipeline**: Nvidia uses Dapr internally for what's described as a modern RAG pipeline processing 1,000 documents. The workflow includes planning, classification, examining, and saving steps. With 1,000 agents running 1,000 workflows, this creates hundreds of thousands or millions of workflow instances. Dapr's durability ensures that failures at any point don't result in lost work or expensive re-computation.

**Enterprise Adoption**: The speaker references conversations with "very large" companies exploring Dapr integration, including one that built a custom agent framework on top of Dapr starting two years ago (around 2024), before most commercial agent frameworks existed. They used Dapr state management, pub/sub, and service invocation and are now looking to scale this as an internal platform.

**Community Growth**: The project has nearly 9,000 Discord members and almost 5,000 individual contributors, indicating significant community engagement and production usage.

## Architecture and Deployment

Dapr's architecture for AI agents follows a sidecar pattern common in cloud-native environments:

**Local Development**: The Dapr CLI provides a `dapr run` command that chains Python (or other language) agent applications to a local Dapr sidecar. This enables local testing with the same infrastructure abstractions that work in production.

**Kubernetes Deployment**: Dapr runs natively on Kubernetes. The deployment process involves building Docker containers and pushing them to a registry. No additional infrastructure is required beyond Dapr and the chosen state store database.

**Language Agnostic**: Any language that can speak HTTP can use Dapr, making it broadly accessible across technology stacks.

**Component Configuration**: Infrastructure components (databases, message brokers, etc.) are configured through YAML declarations rather than code, enabling environment-specific configuration without application changes.

## Enterprise Features for Production AI

Several enterprise-grade features distinguish this approach from prototype-focused frameworks:

**PII Obfuscation**: Automatic detection and obfuscation of personally identifiable information including credit card numbers, names, and addresses. This works bidirectionally, protecting data going to LLMs and sanitizing responses coming back, crucial for compliance in regulated industries.

**Access Policies**: Fine-grained control over which agents can communicate with which other agents and which external systems (MCP servers) they can access.

**Trust Domains**: Ability to create security boundaries grouping trusted agents separately from untrusted ones, with controlled communication between domains.

**Audit Trails**: Complete OpenTelemetry-based tracing provides forensic-level audit logs essential for compliance, debugging, and understanding complex multi-agent interactions.

**Multi-Instance Coordination**: Prevents duplicate executions when multiple instances of the same agent or workflow are present, critical for maintaining consistency and avoiding side effects.

## Critical Assessment

While the presentation makes compelling arguments about production reliability challenges, several aspects warrant balanced consideration:

**Framework Maturity**: Dapr Agents reached 1.0 only at the time of this presentation (2026), making it relatively new compared to established frameworks. Production validation at scale across diverse use cases is still emerging.

**Adoption Friction**: Organizations already invested in LangChain or LangGraph face migration costs. While integration points are mentioned, the completeness and maturity of these integrations is unclear from the presentation.

**Complexity Trade-offs**: Dapr introduces additional infrastructure complexity (sidecars, state stores, pub/sub systems) that may be overkill for simpler use cases. The speaker's assertion that existing frameworks aren't "production ready" may be overstated for certain scenarios.

**Performance Overhead**: The presentation doesn't address potential latency or throughput implications of the sidecar architecture and additional persistence operations, which could be significant for latency-sensitive applications.

**Vendor Positioning**: As the presenter is CTO of a company (Dapr Grid) that offers commercial integrations and extensions beyond the open source project, there's inherent bias toward positioning Dapr as essential infrastructure. The criticism of competing frameworks should be weighed against this commercial interest.

**Missing Evaluation Metrics**: The presentation lacks concrete performance benchmarks, recovery time metrics, or quantified cost savings compared to alternative approaches.

That said, the core technical arguments about the gap in distributed systems capabilities within current agent frameworks are sound and represent legitimate production concerns that organizations deploying agents at scale must address through some mechanism.

## Technical Innovation

The most significant technical contribution is applying proven distributed systems patterns (durable workflows, exactly-once semantics, state machine persistence) to the relatively new domain of AI agents. Rather than inventing new approaches, Dapr adapts battle-tested techniques from workflow orchestration systems to solve agent reliability problems.

The exactly-once execution guarantee for workflows, automatic failure detection and recovery without manual intervention, and the separation of business logic from infrastructure concerns through declarative configuration represent solid engineering principles being applied to an emerging problem space.

The integration of security, observability, and governance as first-class concerns rather than afterthoughts also reflects production-oriented thinking that's often missing from frameworks focused primarily on the AI/ML aspects of agent systems.

## Ecosystem and Community

The case study positions Dapr as part of the broader cloud-native ecosystem, being a CNCF graduated project that integrates with standard tooling like OpenTelemetry, Kubernetes, and various databases and message brokers. The planned contribution of Dapr Agents to the GenAI Foundation suggests efforts to align more closely with AI-specific governance and standards.

The availability of quickstarts and examples for deterministic workflows with non-deterministic agents, fully autonomous workflows, multi-agent collaboration, and LLM provider switching indicates investment in developer experience and documentation.

## Conclusion

This case study presents a infrastructure-focused approach to production AI agents that prioritizes reliability, durability, and distributed systems concerns often overlooked by AI-native frameworks. By leveraging Dapr's existing building blocks and introducing purpose-built agent capabilities through the Dapr Agents framework, it offers solutions to critical problems around state loss, failure recovery, multi-agent coordination, and production operations at scale. While some claims about competing frameworks may be somewhat overstated and the approach introduces additional infrastructure complexity, the core technical arguments about production reliability gaps are substantive and the solutions presented align with established distributed systems best practices. Organizations deploying agents in high-stakes production environments, particularly those already using Kubernetes and cloud-native infrastructure, should seriously evaluate whether these capabilities address their operational requirements.
