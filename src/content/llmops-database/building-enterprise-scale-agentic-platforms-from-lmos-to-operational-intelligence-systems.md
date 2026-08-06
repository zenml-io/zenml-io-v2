---
title: "Building Enterprise-Scale Agentic Platforms: From LMOS to Operational Intelligence Systems"
slug: "building-enterprise-scale-agentic-platforms-from-lmos-to-operational-intelligence-systems"
draft: false
llmopsTags:
  - "customer-support"
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "harness-engineering"
  - "system-prompts"
  - "mcp"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "microservices"
  - "orchestration"
  - "open-source"
  - "langchain"
  - "crewai"
  - "postgresql"
  - "fastapi"
  - "spacy"
  - "openai"
  - "meta"
  - "anthropic"
industryTags: "telecommunications"
company: "Deutsche Telekom"
summary: "Deutsche Telekom successfully deployed LMOS (Language Models Operating System), one of Europe's first enterprise agentic platforms in 2023, by prioritizing existing teams and technology stacks over trendy frameworks. The company built a JVM-based agentic framework using Kotlin that integrated with existing APIs, observability tools, and DevOps practices, while introducing an Agent Definition Language (ADL) to enable business users to define requirements directly. The platform went live across multiple countries, demonstrating that successful enterprise AI deployments require compressing fault lines between teams, platformizing hard infrastructure concerns, and enabling existing engineers rather than creating isolated AI teams with novel tech stacks."
link: "https://www.infoq.com/presentations/agentic-compute/"
year: 2023
seo:
  title: "Deutsche Telekom: Building Enterprise-Scale Agentic Platforms: From LMOS to Operational Intelligence Systems - ZenML LLMOps Database"
  description: "Deutsche Telekom successfully deployed LMOS (Language Models Operating System), one of Europe's first enterprise agentic platforms in 2023, by prioritizing existing teams and technology stacks over trendy frameworks. The company built a JVM-based agentic framework using Kotlin that integrated with existing APIs, observability tools, and DevOps practices, while introducing an Agent Definition Language (ADL) to enable business users to define requirements directly. The platform went live across multiple countries, demonstrating that successful enterprise AI deployments require compressing fault lines between teams, platformizing hard infrastructure concerns, and enabling existing engineers rather than creating isolated AI teams with novel tech stacks."
  canonical: "https://www.zenml.io/llmops-database/building-enterprise-scale-agentic-platforms-from-lmos-to-operational-intelligence-systems"
  ogTitle: "Deutsche Telekom: Building Enterprise-Scale Agentic Platforms: From LMOS to Operational Intelligence Systems - ZenML LLMOps Database"
  ogDescription: "Deutsche Telekom successfully deployed LMOS (Language Models Operating System), one of Europe's first enterprise agentic platforms in 2023, by prioritizing existing teams and technology stacks over trendy frameworks. The company built a JVM-based agentic framework using Kotlin that integrated with existing APIs, observability tools, and DevOps practices, while introducing an Agent Definition Language (ADL) to enable business users to define requirements directly. The platform went live across multiple countries, demonstrating that successful enterprise AI deployments require compressing fault lines between teams, platformizing hard infrastructure concerns, and enabling existing engineers rather than creating isolated AI teams with novel tech stacks."
notion:
  pageId: "3b4f8dff-2538-8076-b271-e6901fe9e65b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:37:00.000Z"
  lastEditedTime: "2026-08-06T11:37:00.000Z"
  publishedAt: "2026-08-06T11:42:49Z"
---

## Overview

This case study presents the journey of building LMOS (Language Models Operating System) at Deutsche Telekom, one of the first enterprise agentic platforms deployed in Europe in 2023. Arun Joseph, who led the AI engineering program at Deutsche Telekom before founding Masaic, shares detailed insights into what actually works when deploying LLMs in production within large enterprises. The presentation distinguishes between two classes of agentic systems: Level 1 agents focused on chatbots and automation, and Level 2 operational intelligence systems that perform complex decisioning and actioning across enterprise workflows.

The core thesis challenges the common approach of building AI systems with specialized teams using cutting-edge frameworks, instead advocating for leveraging existing engineering teams, technology stacks, and organizational knowledge. Deutsche Telekom's success stemmed from recognizing that enterprise AI is fundamentally about crossing organizational fault lines—the boundaries between teams, systems, and domains—rather than simply implementing the latest research papers.

## The Enterprise Challenge: Organizational Fault Lines

Joseph frames the enterprise AI problem through the concept of "fault lines," which represent boundaries between teams, systems, and domains. In typical enterprise architecture, any work can be summarized into four packages: storage layer, transformation layer, presentation layer, and transmission (events or APIs). Each API boundary represents a potential fault line where different teams own different services, each with their own expertise, processes, and technologies.

The fundamental issue with many enterprise AI initiatives is that they create new teams detached from domain expertise. A specialized AI team building a product ordering agent, for example, faces massive challenges when the underlying APIs follow complex specifications like TM Forum standards in telecommunications. These APIs are messy, poorly documented, and understood by only a few domain experts within specific fault lines. Creating a separate AI team with the latest frameworks but no domain knowledge leads to endless waiting for API access, documentation, and domain expertise—effectively guaranteeing failure.

Joseph illustrates this with a vivid metaphor: enterprises aren't building new aircraft from scratch where you'd bring in aeronautical engineers. Instead, they need to take existing cars and trucks (legacy systems) and make them fly. This requires working with the people who built and maintain those systems, not replacing them with external specialists.

## The Technology Stack Problem: Tool Sprawl

A second major challenge is the explosion of AI tooling that creates operational nightmares. Joseph provides a satirical but realistic example where a single line of code using decorators for evaluation, telemetry, and memory tools translates into five separate containers. In one consulting engagement, he witnessed a procurement decision that resulted in 25 containers just to support an evaluation tool, leaving the DevOps team completely overwhelmed.

This "vendor containers for line of code" problem creates new fault lines between AI developers and operations teams. When each AI capability—evaluation, telemetry, memory—comes from a different vendor with their own SDK and infrastructure requirements, the existing DevOps teams cannot support or understand the deployment requirements. The licensing costs are often trivial compared to the operational complexity introduced.

## The LMOS Solution: Magic Bullet #1 - Build with Existing Teams and Stacks

Deutsche Telekom's approach started with a small team of five distributed systems engineers in 2023, before "agents" became a widespread term. The critical decision was choosing a technology stack that worked with existing engineers rather than forcing a paradigm shift.

### Technology Choices

The entire Deutsche Telekom API ecosystem was built on Java/JVM, with hundreds of client libraries for invoking these APIs and comprehensive observability infrastructure supporting the JVM ecosystem. The team initially explored LangChain but found it unsuitable for their needs. Instead, they built their own framework called ARC (Agent ReaCtor) using Kotlin, specifically designed to work within the existing JVM ecosystem.

This decision allowed product API team members to immediately test and contribute to agent development using familiar tools and libraries. By attaching existing enterprise libraries as dependencies, the learning curve was dramatically reduced. Engineers who knew how to invoke the product API could now do so within the agent framework without learning entirely new paradigms.

### Observability Integration

For the DevOps and operations teams, LMOS integrated directly with existing observability infrastructure—Grafana, Prometheus, SigNoz, and distributed tracing systems—rather than requiring specialized AI observability tools. A single LLM API call generates extensive telemetry (tokens, tool calls, traces), and requiring specialized systems to understand this creates an unsustainable operational burden.

By plugging telemetry into existing systems using standard protocols like OpenTelemetry, the operations team could manage the AI infrastructure with their existing skillsets and tools. This "please don't come to us with more containers" approach was critical for operations team buy-in and sustainable deployment.

### The LMOS Platform Architecture

The overall architecture consisted of:

- **LMOS ARC**: The Agent ReaCtor framework built in Kotlin for defining and executing agents
- **LMOS Agent Platform**: A custom Kubernetes container with integrated capabilities for the specific enterprise needs
- **ADL Environment**: The Agent Definition Language platform for business users (described below)

The framework abstracted the hard parts of agent development while exposing familiar programming patterns to JVM developers. This allowed rapid iteration without requiring engineers to become experts in the latest AI frameworks.

## Magic Bullet #2: Agent Definition Language (ADL) - Logic for Business Users

A critical innovation was recognizing that traditional requirements processes don't work for agentic systems. Previously, business users would write Jira tickets requesting new buttons or features, which developers would implement. But how do you write requirements for a chatbot that handles fluid, natural language inputs?

### The ADL Approach

Deutsche Telekom developed an Agent Definition Language that enabled business users to define agent behaviors in a structured but accessible format. The ADL environment runs as a simple Spring Boot container with a UI, allowing business users to:

- Define agent use cases with specific patterns
- Write solutions, alternate solutions, and fallbacks
- Create conditional flows using constructs like "go to use case" to build decision trees
- Attach tools to specific use cases
- Immediately test their definitions in an integrated chat interface

For example, in a Volkswagen service bot scenario, business users could define the use case for "car broke down, need appointment" including the expected flow, alternate paths if appointment dates aren't available, and fallback behaviors. The use case structure included three key constructs: the solution, the alternate solution, and fallback logic.

### ADL Compilation

Critically, ADL definitions aren't sent directly to the LLM as raw prompts. Instead, an ADL compiler processes these definitions, performing optimizations similar to tree-shaking in JavaScript bundlers. The compiler generates optimized system prompts, compressing and structuring the business logic for efficient LLM consumption.

This approach compressed the loop between business requirements and implementation. Business users could iterate on agent behaviors without creating Jira tickets or waiting for development cycles. Engineers focused on wiring APIs and infrastructure, while business users defined the domain logic and customer experience.

## Production Deployment and Results

LMOS went live in 2023 across multiple countries within Deutsche Telekom. While specific numbers around agent handover rates aren't public, the platform demonstrated:

- **Industry-first capabilities**: Tested against best-in-class vendor products and outperformed them
- **Leverage of existing investments**: Demonstrated that enterprises could build sophisticated agentic systems using existing teams and technologies
- **Sustainable operations**: The platform remained operational and supported by existing teams without requiring specialized AI expertise

The platform has since moved to the Eclipse Foundation as an open-source project, continuing to run in production at Deutsche Telekom.

## Evolution to Level 2: Operational Intelligence Systems

After LMOS, Joseph's new company Masaic focuses on more sophisticated "Level 2" agentic systems for operational intelligence. These systems go beyond chatbots and simple automations to provide decisioning and actioning capabilities across complex enterprise workflows.

### Heavy Machinery Operations Example

The case study presents a detailed example from heavy machinery operations (companies like Hitachi, John Deere, SENNEBOGEN). The goal is reducing machine downtime by ingesting diverse data sources:

- IoT sensor data and telemetry
- Standard Operating Procedures (SOPs)
- Incident reports
- Frontline intelligence from service technicians

A service operations manager can query the system: "We've seen a spike in error code X in the Midwest, what can we do about it?" The system then:

- Analyzes patterns across the data, determining that 73% of cases relate to air filter management issues
- Classifies the specific types of issues
- Constructs dynamic SOPs combining agentic actions, documents, and human-in-the-loop processes
- Sends recommendations for approval and testing
- Provides actionable insights like stocking specific parts (JP-100 seal kits) in regional warehouses

This represents a decisioning system that combines analysis, recommendation, and action orchestration—far beyond simple question answering.

### Ephemeral Multi-Agent Architecture

The operational intelligence system uses ephemeral agents rather than pre-defined agent types. When a query comes in, the system:

- Plans the research required, spawning multiple ephemeral agents for specific tasks
- Executes agents in parallel to find frequent failure modes, analyze geographic patterns, etc.
- Synthesizes results across the multi-agent execution to arrive at outcomes

This approach scales better than creating dozens of named agents (fault analysis agent, testing agent, root cause analysis agent, etc.). The ephemeral model allows the system to dynamically construct the agent architecture needed for each query.

## Platform Evolution: Moving Hard Parts Down the Stack

As the team built 50-60 agents for heavy machinery operations, they recognized that most agent code was plumbing rather than business logic. Developers spent 95% of time on infrastructure concerns (observability, guardrails, evaluations, model integration) and only 5% on actual agent logic.

### Platformization Strategy

The team systematically moved hard parts into a platform layer, including:

- **Session and context management**: Maintaining conversation state and context across interactions
- **Telemetry fan-out**: Distributing telemetry to multiple destinations (evaluation tools, observability stacks, etc.) without requiring application-level plumbing
- **Model switching**: Enabling cost optimization by easily switching between larger and smaller models as the system matures
- **Tool execution**: Managing local and remote tool invocation
- **Security and guardrails**: Centralizing safety and policy enforcement

This platformization dramatically reduced the size and complexity of individual agents, allowing developers to focus on business logic.

### The Agent Loop Primitive

After building 100+ agents, the team identified a core programming paradigm: an agent is simply a loop that takes a goal, operates with context, accepts constraints, and executes tools (which may construct additional tools). This loop continues until the goal is achieved or human-in-the-loop intervention is required.

By moving this agent loop primitive into the platform and exposing it as a single API (similar to how S3 exposes object storage or Stripe exposes payments), agents became ephemeral constructs defined by goals rather than pre-built components.

## AgC: Agentic Compute as a Platform

The evolved platform, called AgC (Agentic Compute), exposes compute itself as an agent-making machine. Key characteristics:

- **Frameworkless design**: Works with any OpenAI-compatible client, allowing integration with any framework
- **Docker Compose deployment**: Developers can test locally with simple docker-compose up
- **Helm chart for production**: One-chart deployment to Kubernetes environments
- **Apache 2.0 licensed**: Fully open source
- **Model agnostic**: Easy switching between models for cost optimization
- **MCP compatible**: Supports Model Context Protocol for tool integration
- **OpenTelemetry native**: Built-in observability with fan-out to multiple backends

### Technical Demonstrations

The presentation includes several live demonstrations:

**Demo 1: Business Proposal Generation**
An agent helps a salesperson draft a B2B proposal after a call with a company. The system:
- Retrieves brand templates from document systems
- Pulls pricing information from B2B pricing engines
- Accesses call transcripts from communication servers
- Integrates all information into a formatted proposal

Importantly, no LangChain, LangGraph, or CrewAI code was written. The developer only attached the necessary tools and provided instructions.

**Demo 2: Dynamic Tool Integration**
The presenter demonstrates adding a completely unrelated MCP tool (Shopify's Allbirds shoe catalog) to the same agent with zero code changes. After adding the MCP configuration, the agent can immediately use the new capability to add shoes to business proposals—demonstrating true compute-as-agent flexibility.

**Demo 3: Model Switching**
The platform allows switching LLM providers/models with a single configuration change, demonstrating the abstraction of model choice from agent logic.

**Demo 4: Telemetry Fan-Out**
All agent interactions automatically generate telemetry distributed to configured backends (Langfuse, observability platforms, etc.) through OpenTelemetry collectors, without requiring application-level instrumentation.

**Demo 5: Remote Tool Execution**
The system supports attaching tools running on local machines (demonstrated with Salesforce updates requiring local browser automation for 2FA) to agents running in the platform, showing flexible tool execution models beyond simple MCP servers.

## Critical Success Factors and Lessons

### Start with Level 1 Agents

Joseph strongly advocates starting with Level 1 agents (fluid input orchestration) rather than attempting complex autonomous systems immediately. Level 1 agents provide significant value by:

- Eliminating schema changes and API modifications as change requests
- Enabling fluid bot interactions beyond rigid menu systems
- Automating workflow orchestrations that previously required workflow engineers

In large enterprises, "bot farms" built with workflow orchestration engines (Camunda, etc.) require dedicated engineers for each new automation. Level 1 agents democratize this capability, allowing business users to create automations without workflow engineering expertise.

### Bet on Current Stacks and Teams

The core lesson from LMOS is that successful enterprise AI requires working with existing teams, stacks, and organizational structures rather than creating isolated centers of excellence. Engineering expertise in distributed systems, APIs, and operations is not going away—it needs to be integrated into AI systems, not replaced.

### Business Needs Requirements Language, Not More UI

ADL represents a paradigm shift: business users don't need more user interfaces, they need a language for expressing requirements that directly translates into executable programs. This compression of the requirements-to-implementation loop is critical for sustainable agent development.

### Platformize Hard Parts

The evolution from individual agents to platform primitives demonstrates that successful LLMOps requires treating infrastructure concerns (observability, model management, tool execution, security) as platform responsibilities rather than application concerns.

### Compute as Agent

The ultimate abstraction exposes the compute layer itself as an agent-making capability, allowing ephemeral agent construction based on goals rather than pre-defined agent architectures. This scales far better than maintaining libraries of named agents.

## Production Considerations and Trade-offs

While the presentation advocates strongly for certain approaches, several trade-offs are implicit:

**Technology Lock-in vs. Familiarity**: Choosing JVM/Kotlin locked Deutsche Telekom into that ecosystem, but enabled rapid adoption. Organizations with different primary stacks would need different frameworks.

**Custom Framework vs. Ecosystem Tools**: Building ARC and LMOS meant maintaining custom code rather than leveraging ecosystem tools like LangChain. This trades maintenance burden for better enterprise fit.

**Platform Complexity**: While individual agents became simpler, the platform layer grew more complex. This requires skilled platform engineers and creates a different scaling challenge.

**Business User Programming**: ADL requires business users to think programmatically about agent behavior. Not all business users have this skillset or inclination.

**Open Source Strategy**: Moving LMOS to Eclipse Foundation demonstrates commitment to open source, but also means reduced competitive differentiation for Deutsche Telekom.

The case study represents a pragmatic, production-focused approach to enterprise LLMOps that prioritizes organizational fit, operational sustainability, and incremental value over theoretical purity or cutting-edge techniques. The success of LMOS demonstrates that enterprise AI adoption is fundamentally an organizational and architectural challenge rather than purely a technical one.
