---
title: "Multi-Agent Skills Matching Platform for Construction Workforce"
slug: "multi-agent-skills-matching-platform-for-construction-workforce"
draft: false
llmopsTags:
  - "poc"
  - "data-analysis"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "memory"
  - "evals"
  - "few-shot"
  - "error-handling"
  - "fallback-strategies"
  - "human-in-the-loop"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "langchain"
  - "postgresql"
  - "google-gcp"
industryTags: "consulting"
company: "Burns & Mcdonnel"
summary: "Burns & McDonnell, a global architectural engineering and construction company, deployed a multi-agent system called \"Experience IQ\" to solve the challenge of matching employees with complex skill requirements across diverse projects and locations. Built using Google Cloud's Agent Development Kit (ADK) and deployed through Gemini Enterprise App, the system leverages historical data stored in Spanner, generates SQL queries from natural language, and uses multiple specialized agents with callbacks and routing logic to find qualified personnel. The solution successfully replaced tribal knowledge and disconnected systems with an automated, production-ready agent platform that pairs the right people with the right projects, improving project outcomes and client satisfaction."
link: "https://youtu.be/Req2PndZ7HM"
year: 2026
seo:
  title: "Burns & Mcdonnel: Multi-Agent Skills Matching Platform for Construction Workforce - ZenML LLMOps Database"
  description: "Burns & McDonnell, a global architectural engineering and construction company, deployed a multi-agent system called \"Experience IQ\" to solve the challenge of matching employees with complex skill requirements across diverse projects and locations. Built using Google Cloud's Agent Development Kit (ADK) and deployed through Gemini Enterprise App, the system leverages historical data stored in Spanner, generates SQL queries from natural language, and uses multiple specialized agents with callbacks and routing logic to find qualified personnel. The solution successfully replaced tribal knowledge and disconnected systems with an automated, production-ready agent platform that pairs the right people with the right projects, improving project outcomes and client satisfaction."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-skills-matching-platform-for-construction-workforce"
  ogTitle: "Burns & Mcdonnel: Multi-Agent Skills Matching Platform for Construction Workforce - ZenML LLMOps Database"
  ogDescription: "Burns & McDonnell, a global architectural engineering and construction company, deployed a multi-agent system called \"Experience IQ\" to solve the challenge of matching employees with complex skill requirements across diverse projects and locations. Built using Google Cloud's Agent Development Kit (ADK) and deployed through Gemini Enterprise App, the system leverages historical data stored in Spanner, generates SQL queries from natural language, and uses multiple specialized agents with callbacks and routing logic to find qualified personnel. The solution successfully replaced tribal knowledge and disconnected systems with an automated, production-ready agent platform that pairs the right people with the right projects, improving project outcomes and client satisfaction."
notion:
  pageId: "398f8dff-2538-8038-a982-d0a2aac75a4a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T11:50:00.000Z"
  lastEditedTime: "2026-07-09T15:19:00.000Z"
  publishedAt: "2026-07-09T15:25:32Z"
---

## Overview and Business Context

Burns & McDonnell is a 100% employee-owned architectural engineering and construction company operating across multiple industries and geographies. The company faces a critical operational challenge: they execute projects requiring people with specific skill combinations, but their workforce is distributed across many locations with knowledge residing in disconnected systems. Prior to their AI solution, the company relied on tribal knowledge, email chains, and fragmented systems of record to match people with project requirements—a manual, inefficient approach that couldn't scale with their diverse project portfolio.

The company built "Experience IQ," a multi-agent system deployed to production using Google Cloud's Agent Development Kit and Gemini Enterprise App. This case study is particularly valuable because it demonstrates real production deployment of agentic systems in an enterprise environment, complete with governance, evaluation, and scalability considerations.

## The Broader Context: Google Cloud's Agentic Platform Blueprint

The presentation situates Burns & McDonnell's implementation within Google Cloud's comprehensive agentic platform strategy, which addresses three major challenges observed across 70+ customers in their global customer partnership program:

- **Tool and data integration with authentication**: The difficulty of bringing disparate data sources together and providing proper privileged access to sensitive data
- **Agent evaluation as a "dark art"**: The challenge of measuring agent quality at scale and tracking improvements over time
- **Agent sprawl**: Organizations successfully democratizing agent development but losing visibility and governance once hundreds or thousands of agents proliferate

Google's research found that six months prior, 90% of customers were blocked or at risk on governance challenges specifically. The platform addresses this through a "build, scale, governance, and optimize" framework.

## Key Architectural Shifts in Production Agent Systems

The presentation highlights three critical shifts observed in production agent deployments:

**From monolithic to mesh topology**: Organizations are moving from single large agent applications to flexible mesh architectures where subagents can be decentralized across departments, called as needed, and reused across the company. This enables better modularity and team autonomy.

**From tools to skills**: While tools remain important, skills have emerged as a critical abstraction that ensures the right tool is called at the right time. Skills can be written in natural language by domain experts, bringing tribal knowledge into agent context while minimizing latency, reducing context bloat, and lowering costs.

**From probabilistic to deterministic workflows**: Production systems are shifting away from relying solely on prompt engineering and instructions to control agent behavior, moving toward embedding business logic and compliance rules at the framework layer. This provides the safety, legal compliance, and human-in-the-loop controls that production systems require.

## Google Cloud Agent Development Kit (ADK)

The ADK represents Google's synthesis of best features from existing frameworks like LangGraph and Crew, designed specifically for building multi-agent systems. Key differentiators include session management, multi-modality support, and continuous feature releases.

The development workflow includes:

- **Agent Garden**: A repository of code examples and reference agents that developers can use as starting points
- **Agent CLI**: A "vibe coding" approach where developers can generate agent code through prompts rather than writing from scratch
- **ADK Web**: A local frontend for developers to test agents before deployment, showing complete interaction traces, OpenTelemetry spans, and debugging information

The framework supports multiple agent orchestration patterns including sequential agents (guaranteed execution order), loop agents, parallel agents, and router agents with custom prompting. This flexibility allows developers to choose deterministic flows where needed while maintaining the flexibility of LLM-based routing elsewhere.

## Agent Platform Runtime and Deployment

Once developed, agents can be deployed to various runtimes (laptops, servers, Cloud Run, Kubernetes), but standard runtimes lack agent-specific capabilities. Google's Agent Platform Runtime provides a specialized deployment target that automatically includes:

- **Evaluation capabilities**: Including a simulator that can generate golden datasets by running the agent through various scenarios
- **Observability and monitoring**: Built-in OpenTelemetry support with detailed span information
- **Session management**: Handling stateful interactions across multiple turns
- **Sandbox environments**: For testing before production deployment
- **Memory Bank**: Storing past interactions to enable personalized, contextual responses rather than starting from scratch each time

Deployment requires only two lines of code: wrapping the root agent in an ADK app and creating an Agent Engine with configuration. The system handles containerization, deployment, and infrastructure provisioning automatically, taking approximately five minutes.

## Production Monitoring and Observability

The deployed agents provide extensive production visibility through the Agent Platform interface:

- **Usage metrics**: Session counts, interactions per session, request volumes over configurable time windows
- **Performance metrics**: Latency measurements, error rates, CPU and memory usage for optimization
- **Model analytics**: Tracking which models are called, how frequently, and their latency characteristics
- **Tool analytics**: Identifying most-used tools and their performance patterns
- **Session traces**: Complete OpenTelemetry traces showing step-by-step execution, tool calls, and timing information
- **Raw logs**: Full debugging capability for troubleshooting production issues

This observability is critical for the "hill climbing on agent quality" challenge—providing the quantitative foundation for systematic improvement.

## Governance and Security Infrastructure

The platform includes comprehensive governance tools released as part of the agent platform:

**Agent Identity**: Each agent receives a unique identity that can be tracked throughout its end-to-end lifecycle, enabling auditability and accountability.

**Agent Registry**: A centralized repository where all deployed agents are cataloged, enabling discovery and reuse across the organization. This directly addresses the agent sprawl problem by providing a "single pane of glass" for understanding what agents exist.

**Agent Gateway**: A centralized policy enforcement point that controls:
- Which users can access which agents
- Which agents can call other agents (important for multi-agent systems)
- Which agents can access which tools, with read/write permission granularity
- OAuth authentication management for external integrations

The gateway acts as the "centralized choke point" for deploying and enforcing policy—not glamorous work but essential for moving beyond prototypes to production.

**Security scanning**: The platform automatically scans deployed agents for vulnerabilities in dependencies, surfacing issues without requiring additional code or configuration from developers.

## Protocol Standardization

Google emphasizes protocol adoption for standardizing agent interactions:

- **Agent-to-Agent Protocol**: Standardizes communication between agents built on different frameworks, on-premise, in cloud, or across cloud providers
- **Model Context Protocol (MCP)**: Anthropic's protocol for standardizing agent-to-tool interactions, fully supported by Google Cloud
- **Universal Commercial Protocol**: For shopping and e-commerce agent interactions
- **Agent Payment Protocol**: Enabling coordination between e-wallets, banks, merchants, and retailers
- **Agent UI Protocol**: Standardizing UI generation by agents

This protocol-first approach is critical for enterprises with heterogeneous environments and long-term interoperability requirements.

## Enterprise Architecture Reference Design

The presentation provides a comprehensive reference architecture for enterprise agent platforms with distinct environments:

**Platform team responsibilities**: Creating projects, networking, IAM roles and policies, providing engineers with development environments

**Data environment**: A data lake implemented in a rug (likely referring to a data architecture pattern) linked to development environments

**Development environment**: Extended for backends, frontends, and agents-as-a-service, with a governance layer providing an "AI control tower"

**Staging environment**: For testing agents before production promotion, following the classic dev-staging-prod pipeline

**Production environment**: With augmentation for logging and long-term memory, recognizing that agents are stateful unlike traditional stateless applications

**Exposure layer**: Websites like Gemini Enterprise App where agents are made available to end users

This architecture separates concerns appropriately while maintaining the statefulness and observability requirements unique to agent systems.

## Burns & McDonnell's Experience IQ Implementation

### The Data Foundation

Burns & McDonnell's implementation begins with data preparation. The company ingested historical data from multiple systems into Google Spanner as their database of choice. Critically, they performed enrichment using Gemini before ingestion and generated embeddings to support semantic search and retrieval.

This data foundation is essential—as emphasized throughout the presentation, agent quality depends fundamentally on data quality. The team explicitly chose Spanner, likely for its strong consistency guarantees and global distribution capabilities.

### Multi-Agent Architecture

The Experience IQ system implements a sophisticated multi-agent architecture with specialized roles:

**Experience IQ Agent (coordinator)**: Greets users and orchestrates the overall interaction

**Callback-based retrieval**: The system uses ADK's callback functionality to retrieve:
- Previous schemas from successful queries
- Historical SQL execution examples
This contextualizes the SQL generation with relevant precedents.

**Router agent**: Makes routing decisions to either query the entire database or a subset based on query characteristics and retrieved context

**Schema narrowing agent**: When routing to the entire database, this subagent narrows down which schemas are relevant for SQL generation, reducing complexity and improving accuracy

**SQL code generation agent**: Generates SQL queries from natural language and executes them directly against Spanner

**Retry logic**: If SQL execution fails, the system refines the query up to three times before returning an error

### Addressing the Business-Technical Gap

An important lesson emerged after initial deployment: the agent was producing technically correct SQL that wasn't business-friendly. This highlights a common production challenge where technical correctness doesn't equal user satisfaction.

The team's solution demonstrates mature LLMOps practices:

- They sat with subject matter experts to annotate SQL examples that matched business requirements
- They used GEPA (likely a Google evaluation/preference alignment tool) to create a judge
- The judge determines which examples to use for biasing the text-to-SQL agent

This represents a sophisticated application of preference learning and evaluation-driven improvement—exactly the "hill climbing on agent quality" capability that was identified as a major challenge.

### Natural Language to SQL as an Extensible Pattern

Burns & McDonnell explicitly chose natural language to SQL as their approach but architected the system so this component could be swapped out for different approaches without changing the underlying agent deployment infrastructure. This demonstrates good engineering—separating the domain-specific logic (SQL generation) from the platform concerns (deployment, governance, monitoring).

### Production Validation and Results

Rather than creating hypothetical test scenarios, the team put the system in the hands of actual users and instructed them to ask questions they would normally only be able to answer through manual research. This production-first evaluation approach provides the most realistic assessment of system value.

The demonstration showed a complex query successfully returning a specific employee (Andrew Stearns himself) who matched multiple skill criteria. The system successfully replaced tribal knowledge, email chains, and disconnected systems with a unified interface.

The business outcomes are clear: pairing the right people with the right skills on the right projects leads to better project outcomes, happier employees, and satisfied customers—ultimately improving the company's financial performance.

### Future Vision

Burns & McDonnell views this as the starting point of their agent journey. Their future state envision a single interface that can handle any client request—whether a request for proposal or a simple question—by finding the right people and building complete teams automatically. This represents a progression from information retrieval to action and orchestration.

## Technical Demonstrations and Developer Experience

The presentation included several live demonstrations that illustrate the developer experience:

### Building a Multi-Agent System

The demo showed building a math tutoring agent for kids with multiple specialized subagents:
- A grammar checking agent
- A math operations agent with add, subtract, multiply, and divide tools
- A summary agent that translates responses into kid-friendly language

Each tool is defined as a simple Python function with a detailed docstring describing its purpose, inputs, outputs, and examples. This documentation becomes the agent's understanding of when and how to use the tool.

The sequential agent pattern guarantees execution order: grammar check first, then math operations, then summary. This deterministic flow ensures appropriate behavior for the use case.

### Multi-Modal Agents

A demonstration showed a voice-enabled agent that could:
- Respond in multiple languages (German, Spanish, French, Greek)
- Adjust speaking pace on request
- Adopt different personas (Santa Claus) for response delivery

This demonstrates ADK's native multi-modality support, going beyond text-only interactions.

### Agent CLI for Rapid Development

The most striking demonstration showed using natural language to generate a complete booking agent in under a minute:

"Could you create for me a booking agent to help the user book holidays. Use the development style in this code repo and add the new agent under agents folder."

The system:
- Analyzed the existing repository structure and coding patterns
- Generated an implementation plan
- Created multiple files following the repository's conventions
- Generated agent context, customer profiles, execution examples, instruction prompts, and tools
- Created the agent card metadata
- Resulted in a working agent that could handle holiday booking queries

This "vibe coding" approach dramatically accelerates agent development by allowing developers to describe what they want rather than implement every detail.

## Critical Evaluation and Balanced Assessment

While the presentation demonstrates impressive capabilities, several considerations merit attention:

**Vendor-specific lock-in**: The solution is deeply integrated with Google Cloud's proprietary stack (ADK, Agent Platform Runtime, Gemini). While protocols like MCP provide some standardization, migrating to another platform would require significant re-engineering. Organizations should weigh this against the substantial productivity benefits.

**SQL generation risks**: Natural language to SQL is a well-known challenge area. While Burns & McDonnell's approach of using historical examples and subject matter expert annotations is sound, SQL generation can produce incorrect queries, security vulnerabilities (SQL injection), or queries that don't match user intent despite being syntactically valid. The three-retry mechanism helps but doesn't eliminate these risks.

**Evaluation challenges remain**: Despite the extensive monitoring and observability, the presentation acknowledges that evaluation is still a "dark art." The simulator for generating golden datasets is helpful, but determining what constitutes "good" agent behavior for complex multi-turn interactions across diverse domains remains challenging.

**Governance overhead**: The comprehensive governance infrastructure (registry, gateway, identity) addresses real needs but introduces operational complexity. Organizations need sufficient scale and compliance requirements to justify this overhead—it may be overkill for smaller deployments.

**Production maturity**: While the demonstrations are impressive, the maturity of the Agent Platform Runtime in production at scale isn't fully established. Early adopters may encounter issues that haven't been discovered yet.

**Cost implications**: The presentation doesn't address cost—running multiple agents with multiple LLM calls, embeddings generation, Spanner queries, and comprehensive observability likely incurs substantial cloud costs. Organizations should model expected usage carefully.

That said, Burns & McDonnell's implementation demonstrates genuine production deployment with real business value. The comprehensive platform approach addresses authentic pain points observed across many enterprises, and the governance-first mindset is appropriate for regulated industries and large organizations.

## Key Takeaways for LLMOps Practitioners

This case study offers several valuable lessons:

**Data foundation is paramount**: Burns & McDonnell's success started with comprehensive data ingestion, enrichment, and embedding generation before building agents.

**Multi-agent architectures scale better than monoliths**: The specialized subagent approach with clear routing logic provides better modularity and maintainability than single large agents.

**Production requires governance from day one**: The registry, gateway, and identity infrastructure aren't afterthoughts—they're essential for moving beyond prototypes.

**Evaluation must be business-driven**: Technical correctness isn't sufficient; subject matter expert validation and preference learning are necessary to align agent behavior with business needs.

**Deterministic workflows where possible**: Using sequential agents and embedded business logic reduces reliance on probabilistic prompt engineering for critical paths.

**Observability must be comprehensive**: The detailed traces, metrics, and logs enable the systematic improvement necessary for production systems.

**Developer experience matters**: The rapid development capabilities demonstrated (Agent CLI, ADK Web) reduce time-to-value and lower barriers to entry for agent development.

The Burns & McDonnell case study represents a mature approach to production agent deployment in a complex enterprise environment, demonstrating that with appropriate platform infrastructure, governance, and evaluation practices, multi-agent systems can deliver tangible business value in production settings.
