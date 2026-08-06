---
title: "Multi-Agent Mortgage Assistant on Amazon Bedrock"
slug: "multi-agent-mortgage-assistant-on-amazon-bedrock"
draft: false
llmopsTags:
  - "customer-support"
  - "classification"
  - "question-answering"
  - "multi-agent-systems"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "agent-based"
  - "chunking"
  - "system-prompts"
  - "langchain"
  - "postgresql"
  - "elasticsearch"
  - "guardrails"
  - "docker"
  - "orchestration"
  - "cicd"
  - "monitoring"
  - "amazon-aws"
industryTags: "finance"
company: "LendingTree"
summary: "LendingTree built a production-ready multi-agent mortgage assistant to help consumers navigate the complex home-buying process, addressing challenges like understanding loan types, qualification criteria, and personalized lending options. The solution uses Amazon Bedrock foundation models (Nova Pro and Nova Lite), LangGraph for agent orchestration, and Model Context Protocol (MCP) for inter-agent communication, with three specialized agents (supervisor, education worker, and matching worker) running on Amazon ECS with Fargate. Since launching in late 2025, the system has handled approximately 1,960 conversations and 12,100 messages through Q1 2026, achieving over 97% containment without human escalation while transitioning from primarily educational queries (75% initially) to over 50% transactional intent involving rate comparisons and lender matching."
link: "https://aws.amazon.com/blogs/machine-learning/how-lendingtree-built-a-multi-agent-mortgage-assistant-on-amazon-bedrock/"
year: 2026
seo:
  title: "LendingTree: Multi-Agent Mortgage Assistant on Amazon Bedrock - ZenML LLMOps Database"
  description: "LendingTree built a production-ready multi-agent mortgage assistant to help consumers navigate the complex home-buying process, addressing challenges like understanding loan types, qualification criteria, and personalized lending options. The solution uses Amazon Bedrock foundation models (Nova Pro and Nova Lite), LangGraph for agent orchestration, and Model Context Protocol (MCP) for inter-agent communication, with three specialized agents (supervisor, education worker, and matching worker) running on Amazon ECS with Fargate. Since launching in late 2025, the system has handled approximately 1,960 conversations and 12,100 messages through Q1 2026, achieving over 97% containment without human escalation while transitioning from primarily educational queries (75% initially) to over 50% transactional intent involving rate comparisons and lender matching."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-mortgage-assistant-on-amazon-bedrock"
  ogTitle: "LendingTree: Multi-Agent Mortgage Assistant on Amazon Bedrock - ZenML LLMOps Database"
  ogDescription: "LendingTree built a production-ready multi-agent mortgage assistant to help consumers navigate the complex home-buying process, addressing challenges like understanding loan types, qualification criteria, and personalized lending options. The solution uses Amazon Bedrock foundation models (Nova Pro and Nova Lite), LangGraph for agent orchestration, and Model Context Protocol (MCP) for inter-agent communication, with three specialized agents (supervisor, education worker, and matching worker) running on Amazon ECS with Fargate. Since launching in late 2025, the system has handled approximately 1,960 conversations and 12,100 messages through Q1 2026, achieving over 97% containment without human escalation while transitioning from primarily educational queries (75% initially) to over 50% transactional intent involving rate comparisons and lender matching."
notion:
  pageId: "3b4f8dff-2538-80b6-952a-f77916907ecc"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:36:00.000Z"
  lastEditedTime: "2026-08-06T11:36:00.000Z"
  publishedAt: "2026-08-06T11:42:30Z"
---

## Overview

LendingTree deployed a sophisticated multi-agent mortgage advisory system on Amazon Bedrock to address the complexity consumers face when navigating home-buying and mortgage decisions. The company, which has been connecting consumers with lenders for over 25 years, built this AI-powered assistant to go beyond simple chatbots and provide deep educational guidance alongside personalized lender matching. The system went into production in late 2025 and by Q1 2026 had processed roughly 1,960 conversations totaling 12,100 messages, with engaged users sustaining sessions averaging 10+ messages over 9 minutes.

The business challenge was clear: mortgage decisions involve intricate trade-offs between loan types (FHA, conventional, VA), term lengths, rate structures, and complex financial concepts like debt-to-income ratios and discount points. Operating in a heavily regulated industry, the solution required not just technical sophistication but also rigorous compliance controls for content filtering, PII protection, and audit trails. The architecture needed to handle both educational queries ("What is an FHA loan?") and transactional intent (personalized rate comparisons and lender matching) within the same conversational flow.

## Technical Architecture and LLMOps Implementation

The system implements a multi-agent architecture with three independent AI agents coordinated through LangGraph and the Model Context Protocol. All agents run as containerized services on Amazon ECS with AWS Fargate, providing independent scaling and deployment capabilities for each component.

**The Supervisor Agent** serves as the orchestrator, built on LangGraph as an explicit state machine following a plan-and-execute pattern. It functions as a graph of nodes and edges where nodes perform specific work (intent analysis, execution planning, response composition) and edges define routing logic based on results (route to Education worker, route to Matching worker, or answer directly). This design makes every decision path explicit, auditable, and traceable—critical for debugging and compliance. The Supervisor analyzes user intent using Amazon Nova Pro and produces an execution plan, then routes to appropriate workers over MCP using connection pooling for low-latency inter-agent calls. Importantly, the Supervisor implements multi-model architecture, automatically selecting between Amazon Nova Pro for complex reasoning and critical classification tasks, and Amazon Nova Lite for conversational responses and lightweight classification. This task-based model routing balances reliability with cost efficiency, avoiding the expense of using the most powerful model for every operation.

**The Education Worker** acts as the patient educator, helping users understand mortgage concepts through interactive conversation. It runs its own independent LangGraph workflow and maintains specialized Amazon Bedrock Knowledge Bases tailored to its domain, backed by Amazon OpenSearch Service as the vector store. This retrieval-augmented generation (RAG) approach ensures every response is grounded in authoritative documents rather than relying solely on model parametric knowledge. The team implemented semantic chunking for the Knowledge Bases, breaking documents into semantically coherent chunks aligned with natural topic breaks rather than arbitrary fixed-size chunks, which significantly improved retrieval quality. They also addressed knowledge base conflict resolution by implementing domain-based filtering and source prioritization: internal LendingTree content takes precedence for product-specific questions while external resources serve general mortgage education.

**The Matching Worker** serves as the connector between user needs and LendingTree's internal systems. It gathers user preferences through conversation and calls internal APIs for offers, eligibility checks, and rate information to deliver personalized lending options. The worker interprets qualification criteria and helps users compare options side by side, translating conversational preferences into structured API queries.

**Conversation Memory and State Management** proved critical for maintaining context across multi-turn conversations, agent handoffs, and even service restarts. The system uses the LangGraph PostgreSQL checkpointer on Amazon RDS to persist conversation state. Early versions experienced context loss during agent handoffs, which was resolved through a unified PostgreSQL-backed checkpointer with explicit state serialization. This allows users to pause conversations, return later, or ask follow-ups without losing context. The team also improved inter-agent context passing by including full conversation history and intent summaries in each MCP request, giving worker agents the broader conversational awareness they needed to provide relevant responses.

**Safety and Compliance Controls** are architected as structural pillars rather than optional layers. User inputs and model outputs pass through Amazon Bedrock Guardrails for content filtering (hate speech, profanity detection) and PII redaction. Incoming messages are also screened for prompt injection threats. In parallel with Guardrails, a safety classifier based on an LLM enforces LendingTree's conversational policy. Running these two safety checks concurrently provides added assurance without introducing additional latency. A business-logic layer handles operational rules like routing complex issues to human support and redirecting off-topic conversations. Guardrail tuning required ongoing work, as early configurations blocked legitimate mortgage terminology that triggered content filters; tuning against realistic conversation data resolved these false positives.

**Query Optimization** includes query rewriting to handle short user responses like "not sure" or "yes." These ambiguous inputs are rewritten into meaningful, searchable queries using conversation history before retrieval executes, which significantly improved retrieval quality and user experience.

## Deployment and Operational Practices

The system is deployed through Terraform and GitLab CI/CD pipelines with automated testing and health checks. Because agents communicate through MCP, each can be updated, scaled, and rolled back independently. For example, the Education worker can ship a new knowledge base update without requiring changes to the Supervisor or Matching worker. Each ECS service scales independently based on its own demand signals, allowing the system to handle varying loads across different agent types.

**Observability and Debugging** leverage Amazon CloudWatch logs and AWS X-Ray distributed tracing. This combination allows the engineering team to trace a single conversation's journey across all three agents with per-agent metrics and detailed timing information. This level of distributed tracing is essential for multi-agent systems where a single user interaction may trigger multiple service calls and agent transitions.

The team notes that building one agent is straightforward, but scaling to many agents requires shared foundations. They are now investing in reusable components including shared context layers for data access, standardized MCP contracts for tool integration, and consistent deployment processes. A registry lets teams discover existing capabilities instead of reinventing them, supporting smaller domain-focused agents that can be composed into broader consumer experiences.

## Production Results and Metrics

The production metrics from late 2025 through Q1 2026 reveal meaningful engagement patterns. With approximately 1,960 conversations and 12,100 messages, the average session length was 6.2 messages. More significantly, engaged users sustained sessions averaging 10+ messages over 9 minutes, indicating genuine utility rather than superficial interaction. The conversation depth signals trust—users don't maintain extended multi-turn conversations with systems they find unhelpful.

**Behavioral Evolution** in usage patterns is particularly telling. Early in the rollout, 75% of conversations were educational, with users asking foundational questions about loan types, credit requirements, and mortgage mechanics. As the system matured and word spread, transactional intent grew substantially: over 50% of recent conversations now involve rate comparisons, lender matching, or prequalification—actions directly tied to business conversion. This progression from education to action suggests the system successfully builds understanding and confidence that leads to concrete next steps.

**Containment Rates** exceeded 97%, with only about 3% of users explicitly requesting escalation to a human agent. For a regulated financial product where questions are genuinely complex and errors carry real consequences, this containment rate demonstrates the system's ability to operate as a self-contained advisory service rather than merely a triage layer filtering to call center agents.

**Question Complexity** reflects the sophisticated nature of user needs. The most common topics include loan type comparisons (FHA, conventional, VA), qualification criteria for specific credit profiles, rate negotiation strategies, closing timelines, and down payment trade-offs. These are precisely the situation-dependent questions that static FAQ pages cannot answer well—they require context about what the user said three turns ago, what they qualify for, and what they're optimizing for. The conversation memory and Supervisor's intent analysis capabilities directly address this need.

## Architectural Learnings and Tradeoffs

**Agent Design Patterns:** The plan-and-execute pattern with explicit graph-based orchestration proved essential for debuggability. When conversations go wrong, the team can trace exactly which node made which decision. Separating planning from execution creates clear audit trails. The multi-model routing strategy represents a practical cost-performance tradeoff—using Nova Pro only where complex reasoning is required while defaulting to Nova Lite for routine operations significantly reduced inference costs without sacrificing quality for tasks that don't require the most capable model.

**RAG and Knowledge Management:** Semantic chunking delivered measurable improvements over fixed-size chunking by aligning chunk boundaries with natural topic breaks. However, maintaining multiple knowledge bases introduced the challenge of conflicting information surfacing from different sources. Domain-based filtering and explicit source prioritization rules resolved this, though it requires ongoing curation as content evolves.

**Infrastructure Decisions:** The team chose Amazon ECS with Fargate over Amazon Bedrock AgentCore because they were already in production when AgentCore reached general availability. This required hand-wiring PostgreSQL checkpointers, ECS container configurations, health checks, and per-agent deployment pipelines—undifferentiated infrastructure work. The team is now evaluating re-architecting onto AgentCore to offload these operational concerns and shift engineering effort from "keeping the runtime alive" to "optimizing agent logic and domain knowledge." This represents a common LLMOps evolution: initial implementations on general-purpose infrastructure, followed by migration to purpose-built managed services as they mature.

**Conversation State Complexity:** Early versions that lost context during agent handoffs created frustrating user experiences. The PostgreSQL-backed checkpointer with explicit state serialization solved this, but required careful design around state schema evolution and backward compatibility as the system evolves.

**Safety as Infrastructure:** Running safety checks in parallel preserved latency while strengthening protections. However, guardrail tuning proved to be ongoing work rather than a one-time configuration task, requiring continuous refinement against production conversation data to balance protection with legitimate use cases.

## Critical Assessment

While the case study presents impressive metrics, several aspects warrant balanced consideration. The 97% containment rate is notable, but the text doesn't specify what quality measures determine whether those contained conversations actually provided correct, compliant advice versus simply keeping users engaged without escalation. The reported shift from 75% educational to 50%+ transactional intent suggests growing trust, but doesn't clarify whether this reflects broader user base changes, improved capability, or marketing adjustments.

The architectural choice of three specialized agents (Supervisor, Education, Matching) appears well-suited to the domain, but the case study doesn't detail why this particular decomposition was chosen over alternatives, or what challenges emerged from inter-agent coordination that might inform other implementations. The multi-model routing strategy (Nova Pro for reasoning, Nova Lite for conversation) demonstrates cost consciousness, but lacks quantitative comparison of cost savings versus quality tradeoffs.

The team's candid discussion of learnings—semantic chunking improvements, knowledge base conflicts, guardrail tuning challenges, and early context-loss problems—provides valuable operational insights often missing from vendor case studies. The acknowledgment that they're now considering migration to AgentCore after hand-rolling their own orchestration infrastructure reflects pragmatic engineering evolution rather than claiming they got everything right the first time.

From an LLMOps maturity perspective, the implementation demonstrates production-grade practices: structured deployment pipelines, distributed tracing, independent agent scaling, explicit state management, and layered safety controls. The separation of planning and execution in the Supervisor agent, while adding complexity, provides the auditability essential for regulated industries. The investment in reusable foundations (shared context layers, MCP contracts, capability registries) suggests the team is thinking beyond single-application deployment toward platform-scale agent development.

The production timeframe (late 2025 through Q1 2026) and relatively modest conversation volume (approximately 1,960 conversations) suggests this is early-stage production rather than massive scale deployment. The 9-minute average session length for engaged users and 10+ message exchanges indicate genuine utility, though the case study doesn't address what percentage of users abandon early or how the system performs across different user sophistication levels.

Overall, this represents a credible example of multi-agent LLM systems operating in production under significant regulatory constraints, with architectural patterns and operational learnings that transfer beyond the specific mortgage domain. The team's willingness to discuss what didn't work initially (context loss, guardrail false positives, knowledge base conflicts) alongside what succeeded provides practical value for practitioners building similar systems.
