---
title: "Scaling AI-Powered Developer Support Through Agentic Systems"
slug: "scaling-ai-powered-developer-support-through-agentic-systems"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "classification"
  - "content-moderation"
  - "rag"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "few-shot"
  - "evals"
  - "mcp"
  - "semantic-search"
  - "vector-search"
  - "error-handling"
  - "fallback-strategies"
  - "langchain"
  - "fastapi"
  - "databases"
  - "redis"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "scalability"
  - "anthropic"
industryTags: "finance"
company: "Coinbase"
summary: "Coinbase's developer support engineering team transformed their support model from manual Discord responses to a comprehensive agentic AI system to scale support for their growing developer platform. The small team built multiple customer-facing and internal AI agents including Discord AI Chat, Slack Triage, and Support Engineer Assistant, leveraging Python services, self-hosted LangSmith for tracing, MCP tools with RAG fallback, and multi-layered guardrails. The transformation enabled the team to maintain high customer satisfaction while increasing automation levels, handling multilingual conversations, and establishing a foundation for human-in-the-loop workflows, though specific quantitative metrics on automation improvements were not yet finalized."
link: "https://www.youtube.com/watch?v=py9d6zTl4Dc"
year: 2026
seo:
  title: "Coinbase: Scaling AI-Powered Developer Support Through Agentic Systems - ZenML LLMOps Database"
  description: "Coinbase's developer support engineering team transformed their support model from manual Discord responses to a comprehensive agentic AI system to scale support for their growing developer platform. The small team built multiple customer-facing and internal AI agents including Discord AI Chat, Slack Triage, and Support Engineer Assistant, leveraging Python services, self-hosted LangSmith for tracing, MCP tools with RAG fallback, and multi-layered guardrails. The transformation enabled the team to maintain high customer satisfaction while increasing automation levels, handling multilingual conversations, and establishing a foundation for human-in-the-loop workflows, though specific quantitative metrics on automation improvements were not yet finalized."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-powered-developer-support-through-agentic-systems"
  ogTitle: "Coinbase: Scaling AI-Powered Developer Support Through Agentic Systems - ZenML LLMOps Database"
  ogDescription: "Coinbase's developer support engineering team transformed their support model from manual Discord responses to a comprehensive agentic AI system to scale support for their growing developer platform. The small team built multiple customer-facing and internal AI agents including Discord AI Chat, Slack Triage, and Support Engineer Assistant, leveraging Python services, self-hosted LangSmith for tracing, MCP tools with RAG fallback, and multi-layered guardrails. The transformation enabled the team to maintain high customer satisfaction while increasing automation levels, handling multilingual conversations, and establishing a foundation for human-in-the-loop workflows, though specific quantitative metrics on automation improvements were not yet finalized."
notion:
  pageId: "3a5f8dff-2538-80e8-9737-eec62954559e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-22T07:29:00.000Z"
  lastEditedTime: "2026-07-22T07:29:00.000Z"
  publishedAt: "2026-07-22T07:40:04Z"
---

## Overview

Coinbase's developer support engineering team undertook a significant transformation to scale AI-powered support for their developer platform, which serves a community building on crypto APIs, wallets, payments, staking, and infrastructure. The team, led by engineering manager Evan Kormos, evolved from a manual Discord-based support model to a sophisticated multi-agent system that could handle growing demands while maintaining customer satisfaction. This case study provides detailed insights into how a small team executed a 0-to-1 journey building self-improving, customer-facing agentic systems in production.

The challenge facing the team was multifaceted: they needed to maintain excellent support for individual developers working on side projects and trading bots while simultaneously scaling to meet new market expectations and customer segments. The original support model relied on people posting questions in Discord and receiving manual responses, supplemented by a basic AI chat integration using a hosted service. This initial version had significant limitations: documentation would become stale, there was no systematic way to track usage patterns or performance, and evaluation relied on manually tallying thumbs up and thumbs down votes. The team had little visibility into whether the system was truly serving customers effectively.

## System Architecture and Infrastructure

The team designed a comprehensive system architecture that provides multiple delivery channels while establishing a foundation for future expansion. On the customer-facing side, they maintained presence where developers already were—Discord and web interfaces—while building backend tooling for support engineers. The agentic foundation they established positions them to extend into partner Slack channels, new MCP channels, and generative UX experiences in the future.

A critical infrastructure decision was incorporating Python services as first-class infrastructure within Coinbase's environment. This represented the team's first service of this type and required new capabilities paired with existing internal infrastructure patterns. Caesar, a key team member mentioned by name, drove much of this transformation from proof of concept through implementation, bringing specialized skills in agent engineering to the team.

For observability and monitoring, the team deployed self-hosted LangSmith for tracing agent behavior. This decision to self-host rather than use cloud-hosted solutions reflects both organizational requirements and the team's commitment to comprehensive observability from the start. The AI platform team at Coinbase operates LangSmith and other infrastructure that multiple teams can leverage, demonstrating organizational investment in LLMOps capabilities.

## Tools and Knowledge Management

The team developed a shared set of tools centered around providing agents with access to developer documentation. They built a remote MCP server specifically for developer documentation that agents could query. However, recognizing that remote MCP tools can be unreliable for customer-facing agents, they implemented a RAG fallback system. This dual approach serves two purposes: ensuring reliability when the MCP server experiences issues, and enabling A/B testing between the MCP and RAG approaches to determine which performs better in practice.

Behind the scenes, the team maintains a straightforward knowledge pipeline that feeds a vector database supporting the RAG fallback. They also integrated with various internal services, some event-driven and others proxying to external services, creating a comprehensive toolset for their agents to leverage.

## Agent Portfolio and Use Cases

The team has deployed multiple agents serving different purposes within their support ecosystem, with three primary applications showcased in the presentation:

**Discord AI Chat** provides a menu-driven interface where users can launch AI chat sessions, open support cases, or access case management features. Developers receive expert responses drawing on technical documentation and guidance on obtaining further support when needed. The team member He was specifically credited with building this capability. The system is positioned to evolve toward automatic response capabilities on Discord channels, though that functionality was still in development at the time of the presentation.

**Slack Triage** operates internally to surface Discord messages requiring attention. Within a dedicated Slack channel, team members see messages flagged based on activity in Discord, along with direct links to LangSmith trace data for the initial response. This enables support engineers to review how classifiers are performing and tune them accordingly. The longer-term vision positions this as a lens and control plane for the team's workflow, flagging signals for improvement and providing visibility into agents in motion.

**Support Engineer Assistant** runs within Coinbase's internal service console, hosted on a local React site. This assistant allows support engineers to control chat context based on their access permissions in underlying systems. Initially deployed as read-only, the team established architectural building blocks for human-in-the-loop workflows with plans to add functions like automated customer response generation. The ability to pop out the interface in a new window provides responsive UX and fine-grained control over the experience.

Beyond these primary agents, the team has built or is building additional agents focused on compliance, risk reduction, and service quality—critical concerns for a financial services company operating in the cryptocurrency space.

## Guardrails and Safety

Despite not providing agents with access to transact or access sensitive data, the team invested significantly in detecting and preventing misuse. Their approach implements multiple layers of safeguards that go beyond simple deterministic rules. The guardrail architecture includes deterministic safeguards for clear-cut scenarios, the developer documentation tool for grounding responses in factual information, and LLM-based judgment applied to outputs using a lightweight model to evaluate both accuracy and risk.

This multi-layered approach to safety represents thoughtful design for customer-facing AI systems. The team explicitly describes these as "guardrails" distinct from the core agent functionality, recognizing that safety isn't just about what the agent can do but also about how it handles edge cases, adversarial inputs, and unexpected scenarios. This design became the foundation for their public auto-response capabilities and their overall approach to safely handling customer inquiries.

## Monitoring and Continuous Improvement

The team treats observability as fundamental rather than an afterthought, building what they describe as the "glass box before building the agent." Their monitoring approach provides both real-time evaluation and retrospective analysis capabilities. In production, agents generate traces that feed into real-time evaluations, creating a continuous pulse on agent behavior.

For deeper analysis, the team developed what they call "back-testing"—systematically examining traces to identify improvement signals. They built processes to analyze chat conversation turns both randomly and deterministically, profiling them to discover patterns. One concrete example involved double-checking security dashboards, where they found insights applicable beyond just security concerns. By deep-diving on specific conversation threads, they discovered signals to improve and harden the system in various ways.

The team uses LangSmith CLI together with Claude for coding to investigate traces, find improvement signals, and drive new development intent. This creates a feedback loop from production behavior back to development priorities, enabling data-driven iteration on agent capabilities.

## Development Workflow and Tooling

The team operates with a distinctive development workflow characterized as "intent-based." They use the Linear Slack bot to convert conversational context into structured intent-based work items. Once intent is defined, they proceed through a tech grooming process utilizing Claude for coding with multiple MCP tools to conduct deep research, plan work, and begin execution.

This process produces various code artifacts including system prompts and configuration. All artifacts go through rigorous testing, cross-model review, evaluation steps, and human approval before reaching production. The emphasis on human approval reflects appropriate caution for customer-facing AI systems, particularly in a regulated financial services context.

From production systems, the team collects traces and real-time evaluations that feed back into their improvement cycle, enabling them to identify new intents and continue iterating.

## Challenges and Lessons Learned

The team encountered several challenges that provide valuable insights for others building similar systems. On adversarial testing, they discovered that generating adversarial datasets is more difficult than anticipated due to terms and conditions restrictions in some development tooling. This highlights a practical constraint on AI safety testing that teams may not anticipate.

Multilingual support emerged as an immediate challenge, with multilingual conversations appearing in Discord almost as soon as the system launched—something the team wasn't initially prepared to handle. This experience underscores how customer-facing AI systems can quickly expose requirements that weren't visible in planning. The team also notes the additional complexity of considering multilingual adversaries when thinking about system robustness.

On automation metrics, the presentation candidly acknowledges that work remains to be done on measuring automation levels. Adding human-in-the-loop capabilities will drive efficiency improvements and enable more detailed tracking, including measuring tokens spent to resolve customer cases. This honest assessment of gaps in their current measurement capabilities reflects mature thinking about LLMOps.

The team shared positive feedback from a customer testimonial indicating they're successfully helping customers build, though specific metrics on customer satisfaction or case resolution were not provided. The presenter emphasizes that the hard part is making systems work for customers in a balanced way combining human and machine effort.

## Key Principles and Recommendations

The presentation concludes with three core principles derived from the team's experience:

**Treat agent engineering as its own discipline.** The team explicitly credits Harrison from LangChain's previous Interrupt conference for emphasizing this point, which they took to heart. They stress that building effective agent systems requires balancing product engineering and machine learning mindset strengths across the group, not just within individuals. Hiring and growing teams to achieve this balance is positioned as critically important.

**Build the glass box before you build the agent.** Observability isn't framed as a feature to add later but as the foundational layer that everything else builds upon. This principle reflects their architectural decision to establish comprehensive tracing and monitoring infrastructure before scaling agent deployments.

**The team is the multiplier.** While AI enables small teams to accomplish extraordinary things, this only works if teams are aligned for collective execution. The emphasis on team dynamics and alignment suggests that technical capabilities alone are insufficient—organizational factors determine whether small teams can successfully leverage AI to achieve scale.

## Critical Assessment

This case study provides valuable insights into practical LLMOps at a major financial technology company, with several strengths and some notable gaps. On the positive side, the presentation offers unusual transparency about infrastructure choices, tooling decisions, and challenges encountered. The emphasis on observability-first design and the candid discussion of gaps in automation metrics and adversarial testing demonstrate mature thinking about production AI systems.

The architectural decisions appear sound: incorporating Python services as first-class infrastructure, self-hosting LangSmith for control and visibility, implementing MCP with RAG fallback for reliability, and building multi-layered guardrails for safety. The team's workflow integrating trace analysis back into development priorities represents sophisticated continuous improvement practices.

However, the case study lacks quantitative results that would enable assessing actual impact. While the goal of maintaining customer satisfaction while increasing automation is clearly stated, no metrics are provided on baseline or current customer satisfaction scores, support ticket resolution times, support engineer productivity gains, or automation rates achieved. The acknowledgment that automation number tracking is still in progress suggests the system may be relatively early in its production lifecycle.

The presentation also doesn't discuss model selection, model performance comparisons, latency requirements, cost considerations, or failure mode handling in detail. For teams considering similar implementations, these aspects would be valuable to understand. The mention of using a "lightweight model" for output evaluation hints at cost-consciousness but doesn't elaborate on the tradeoffs involved.

The emphasis on team composition and agent engineering as a distinct discipline is notable and likely reflects genuine lessons learned. The specific callouts to individual team members by name and their contributions provides unusual color on how skills were distributed across the team and how the transformation actually unfolded organizationally.

Overall, this represents a thoughtful implementation of agentic AI for customer support at a company with significant regulatory and risk considerations. The architectural patterns and principles articulated—particularly around observability, safety, and iterative improvement—provide valuable guidance for practitioners. However, prospective implementers should recognize that this describes a system still maturing and should plan for significant iteration to achieve production-grade reliability and the quantified business outcomes they're seeking.
