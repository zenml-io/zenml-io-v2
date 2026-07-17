---
title: "AI-Native Workflow Transformation for Enterprise Renewals at Scale"
slug: "ai-native-workflow-transformation-for-enterprise-renewals-at-scale"
draft: false
llmopsTags:
  - "customer-support"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "error-handling"
  - "memory"
  - "latency-optimization"
  - "cost-optimization"
  - "system-prompts"
  - "langchain"
  - "monitoring"
  - "orchestration"
  - "databases"
  - "api-gateway"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Cisco"
summary: "Cisco's Customer Experience organization, which manages over $26 billion in recurring revenue, evolved their renewals system from a basic chatbot to a sophisticated multi-agent agentic system operating as a \"teammate.\" The initial system achieved 95% accuracy but plateaued in adoption because it remained an optional tool rather than being embedded in daily workflows. The solution involved implementing a hierarchical planner-based architecture using LangGraph with dynamic task decomposition, self-correction, and confidence-based human-in-the-loop interventions. They also introduced deterministic workflow scheduling for business-critical tasks and personalization features. The key insight was shifting from AI-augmented workflows to AI-native workflows where humans help software get work done rather than the reverse, focusing on outcomes rather than process steps."
link: "https://www.youtube.com/watch?v=McZgnvn-e84"
year: 2026
seo:
  title: "Cisco: AI-Native Workflow Transformation for Enterprise Renewals at Scale - ZenML LLMOps Database"
  description: "Cisco's Customer Experience organization, which manages over $26 billion in recurring revenue, evolved their renewals system from a basic chatbot to a sophisticated multi-agent agentic system operating as a \"teammate.\" The initial system achieved 95% accuracy but plateaued in adoption because it remained an optional tool rather than being embedded in daily workflows. The solution involved implementing a hierarchical planner-based architecture using LangGraph with dynamic task decomposition, self-correction, and confidence-based human-in-the-loop interventions. They also introduced deterministic workflow scheduling for business-critical tasks and personalization features. The key insight was shifting from AI-augmented workflows to AI-native workflows where humans help software get work done rather than the reverse, focusing on outcomes rather than process steps."
  canonical: "https://www.zenml.io/llmops-database/ai-native-workflow-transformation-for-enterprise-renewals-at-scale"
  ogTitle: "Cisco: AI-Native Workflow Transformation for Enterprise Renewals at Scale - ZenML LLMOps Database"
  ogDescription: "Cisco's Customer Experience organization, which manages over $26 billion in recurring revenue, evolved their renewals system from a basic chatbot to a sophisticated multi-agent agentic system operating as a \"teammate.\" The initial system achieved 95% accuracy but plateaued in adoption because it remained an optional tool rather than being embedded in daily workflows. The solution involved implementing a hierarchical planner-based architecture using LangGraph with dynamic task decomposition, self-correction, and confidence-based human-in-the-loop interventions. They also introduced deterministic workflow scheduling for business-critical tasks and personalization features. The key insight was shifting from AI-augmented workflows to AI-native workflows where humans help software get work done rather than the reverse, focusing on outcomes rather than process steps."
notion:
  pageId: "387f8dff-2538-805d-9ea5-cfea3be12cea"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-22T14:43:00.000Z"
  lastEditedTime: "2026-06-22T14:43:00.000Z"
  publishedAt: "2026-07-01T19:43:33Z"
---

## Overview

Cisco's Customer Experience organization manages an enterprise-scale renewals operation that handles more than half of Cisco's $60 billion annual business, specifically over $26 billion in recurring revenue. Carlos, a fellow and chief architect in the CX organization, presented their evolution from experimental chatbot to production-scale agentic system deployed across their 18,000-20,000 person organization. This case study is particularly notable for its focus on the practical realities of moving from proof-of-concept to production at massive scale, including the difficult lessons learned about adoption, architecture, and the limitations of accuracy alone.

The CX organization operates across a standard customer lifecycle: land, adopt, expand, and renew. The renewals team specifically manages the critical end-of-term renewal cycle for customers across hardware, software, and SaaS offerings. The technical challenge was building a system that could handle complex multi-faceted queries at scale while maintaining accuracy, personalization, and most critically, actual business adoption.

## Initial System Architecture and the 95% Accuracy Plateau

In 2025, Cisco deployed what they called the "Agentic Foundation" - a multi-agent system built on a chatbot interface that achieved 95% accuracy. The initial architecture consisted of several specialized agents:

- A renewals agent handling contract and renewal-specific queries
- A sentiment analysis agent tracking customer satisfaction, based on the thesis that negative customer sentiment correlates with decreased renewal likelihood
- An adoption agent measuring product usage, operating on the principle that higher adoption drives higher renewal rates
- Discovery agents running in on-premises environments
- A traditional machine learning risk prediction model, separate from the LLM components

The decision to keep risk prediction separate from the LLM components is notable and reflects a pragmatic understanding of tool limitations. The team recognized that LLMs and predictions don't align well, so they built a traditional ML model for high-stakes risk scoring. This hybrid approach combining LLMs with traditional ML achieved 95% accuracy.

The initial system started with a guided interface where the renewals team predefined the questions users could ask, with GenAI only generating answers. This lasted approximately three months before users demanded open prompt capabilities, wanting freedom from interface constraints. The team accommodated this evolution, but a critical problem emerged: despite high accuracy and concurrent users generating many queries monthly, adoption plateaued. Users would try the system a handful of times and then ghost it, reverting to spreadsheets and familiar tools.

This adoption failure despite technical success represents a crucial lesson in LLMOps: accuracy is merely table stakes, not a sufficient condition for production success. The team realized the system was yet another optional tool rather than being embedded in the workflow and daily tasks of the renewals team. Human nature and organizational inertia meant users defaulted to their comfort zones despite having access to a more accurate system.

## Evolution to the Teammate Architecture

To address the adoption challenge, Cisco evolved from a chatbot paradigm to what they call a "teammate" - a system capable of receiving delegated tasks, proactively executing work, and focusing on workflows rather than just question-answering. This architectural evolution reflected a philosophical shift: instead of asking how AI can improve existing workflows, they asked whether those workflows were even needed and how they would solve outcomes differently if starting fresh.

The new architecture introduced several critical components:

**Hierarchical Planner-Based System**: Rather than having a supervisor directly route to agents, they introduced planning layers. The supervisor generates high-level plans mapping tasks to agents or subgraphs, but remains lean - focused only on metadata, policy, and routing rather than becoming a monolithic controller. The team explicitly noted that overloading the supervisor with intelligence and extensive prompting leads to maintenance nightmares and brittle systems.

**Domain-Specific Planners**: Within each major agent domain (renewals, sentiment, adoption), they introduced specialized planners that decompose questions into smaller tasks specific to that domain context. For example, the renewals planner handles Cisco-specific business logic like fiscal year definitions that no general LLM would know. When a user asks about Q1 fiscal year 2026, the renewals planner knows which months comprise Cisco's Q1, something impossible to encode in a general model.

**Dynamic Stage and Step Generation**: The planner creates stages dynamically, where each stage can have multiple steps. After each stage completes, the system checks if everything is okay before proceeding. If not, it triggers a replanning cycle. This continues until completion or a threshold is reached. The architecture supports both sequential and parallel execution depending on dependencies between stages.

**Reflection and Replanning Loops**: At both the supervisor level and within individual agent subgraphs, the system implements reflection and replanning mechanisms. This allows for self-correction without human intervention for many failure modes. The system can detect when a plan hasn't worked and dynamically adjust rather than failing outright.

## Handling Complex Multi-Stage Queries

The power of this architecture becomes evident in handling complex real-world queries. For example, a typical renewals person might ask: "Give me my top 10 customers by ATR for Q1 fiscal year 26 that have Duo, along with the sentiment of each." This single question requires:

- Acronym disambiguation: ATR means "available to renewals" in this context, but could mean different things elsewhere
- Stage identification: The supervisor recognizes this requires two stages - renewals data followed by sentiment analysis
- Dependency management: Sentiment analysis depends on the customer list from renewals
- Domain-specific knowledge: Fiscal year calendar mapping, product identification (Duo), business metric calculations (ATR)
- Result synthesis: Combining data from multiple agents into a coherent answer

The supervisor dynamically generates a plan with Stage 1 for renewals and Stage 2 for sentiment, understanding the dependency. It uses LangGraph's send execution patterns to manage parallel and sequential operations as appropriate. The renewals subgraph receives the query, and its internal planner breaks it down further into subtasks like fiscal calendar mapping, product filtering, and metric calculation.

This architectural approach avoids the hallucination and error problems that emerge with simpler architectures when handling complex queries at scale. By decomposing both at the supervisor level and within domain subgraphs, the system maintains coherence and accuracy even for questions with significant complexity and context requirements.

## Deterministic Workflows vs. LLM Reasoning

A critical insight from Cisco's production experience concerns when to use LLM reasoning versus deterministic execution. The team discovered that giving planners few-shot examples and instructions to follow specific steps led to inconsistent behavior - the LLM would follow instructions the first time, get creative and modify the approach the second time, reduce steps the third time, expand them the fourth time, essentially entering what Carlos humorously described as "a debate and an argument with LLM."

Their solution was to adopt a backslash-command pattern similar to coding agent tools like Claude Code, Codex, and Cursor. For deterministic, business-critical workflows, they created scheduled tasks with specific execution patterns that bypass LLM reasoning entirely. Examples include:

- Morning briefings: "Show me the top five renewal items and if there was a catastrophic outage overnight, tell me and if it affects sentiment, run this thing every morning" - executed programmatically without LLM interpretation
- Quarterly business reviews (QBR): Predefined execution patterns that don't allow the LLM to opine on how business reviews should be conducted
- Deal pulse workflows: Deterministic task execution that follows established business processes

The key insight is that for well-defined business processes that must execute consistently, deterministic programming is superior to LLM reasoning. The LLM's role is reserved for areas requiring interpretation, analysis, and dynamic planning - not for following established procedures. This hybrid approach uses each technology where it's strongest: LLMs for reasoning and adaptation, deterministic code for consistency and reliability.

## Technology Stack and Implementation

The production system runs on LangGraph as its core orchestration framework, with extensive use of LangSmith for observability. The team emphasized that observability is "a no-brainer" for production systems and that the complexity of their hierarchical planner architecture makes tracing and debugging essential.

The system supports multiple interfaces beyond the chatbot:
- Conversational UI with open prompting
- API endpoints for programmatic access by other systems
- Scheduled task execution
- Email-based delegation workflows

The architecture runs in on-premises environments for some components, reflecting enterprise security and data governance requirements. They use multiple LLM models, though specific model choices weren't detailed in the presentation. The emphasis was on architecture over model selection, with explicit warnings against "chasing benchmarks" or assuming newer, smarter models will solve architectural problems.

## Confidence Scoring and Human-in-the-Loop

A central concept in their AI-native workflow approach is confidence scoring to determine when human judgment is required. Rather than having humans orchestrate every step (the traditional workflow pattern), the default is AI-driven execution with autonomy. The system only pauses for human judgment when confidence scores drop below thresholds, effectively inverting the traditional human-software relationship.

This represents a philosophical shift: humans help software get work done, rather than software helping humans get work done. The focus moves from step-based workflow logic to context that enables personalization. Authority is given by default to the AI for execution, with humans jumping in for judgment calls rather than orchestrating every action.

This approach requires sophisticated confidence scoring mechanisms that the presentation didn't detail extensively, but the concept reflects a mature understanding of AI system design for production environments where complete automation isn't possible or desirable, but constant human oversight isn't scalable.

## Personalization and Long-Term Memory

The evolution from optional tool to teammate required personalization features that make the system adapt to individual users rather than forcing users to adapt to the system. Cisco implemented long-term memory capabilities, leveraging LangChain contributions in this area, to enable the system to learn user preferences, communication styles, and work patterns over time.

This personalization layer addresses the adoption problem identified earlier. By making the system personal and contextually aware of individual user needs, it becomes less of an external tool and more of an integrated work partner. The presentation emphasized that making systems personal - adapting to users rather than forcing user adaptation - is critical for actual adoption in enterprise environments.

## Production Lessons Learned: System Level

Cisco shared several hard-won lessons from their production deployment at scale:

**Accuracy is Table Stakes**: Achieving 95% accuracy was necessary but not sufficient. It created a floor for viability but didn't drive adoption by itself. Personalization and workflow integration proved equally critical.

**Move Past Chat**: Chatbots are just one surface for interaction. Real production value came from diversifying interaction patterns - APIs, scheduled tasks, email delegation, proactive intelligence - rather than limiting the system to conversational interfaces.

**Workflow Integration is Critical**: They introduced a concept called "forced curiosity" with management to drive adoption, but the real solution was embedding the AI into existing workflows and consolidating tools rather than adding yet another optional system to the stack.

**Proactive Intelligence**: Making the system proactive rather than purely reactive - scheduling tasks, sending briefings, identifying issues before they're queried - significantly improved value perception and adoption.

## Production Lessons Learned: Infrastructure Level

Beyond system design, Cisco shared infrastructure and automation insights:

**Start Bounded, Then Extend**: Let agents help before they act. Test reasoning quality in constrained contexts before allowing autonomous action at scale. The team discovered that reasoning quality varies significantly by task type, leading to their hybrid deterministic/LLM approach.

**Self-Correction is Not Optional**: The difference between pilot and production is implementing self-correction mechanisms where agents fix their own output. At scale, human intervention for every error is impossible.

**Quality Ceiling Requires Upfront Investment**: Including knowledge investment for models themselves. The assumption that newer, smarter models will automatically solve domain-specific problems is a fallacy. Models are helpers, not magic solutions.

**Routing is Your First Decision**: Before building agents, decide how classification and routing will work. This is hard and critical - without proper routing, models hallucinate because they don't understand business context. Routing quality determines whether subsequent agent work is even relevant.

**Don't Chase Benchmarks**: Model benchmarks don't translate directly to business value. Focus on architecture, integration, and solving actual business problems rather than deploying the highest-benchmark model.

## Organizational and Change Management Challenges

Carlos candidly acknowledged organizational resistance to AI-native workflow redesign. The people being asked to change are often the same people who built the existing workflows years ago and who currently run the business. Expecting resistance is realistic, and managing that change is part of the LLMOps challenge beyond pure technical implementation.

The shift from workflows with "human DNA by human orchestration by DNA" built over many years to AI-native workflows with human-in-the-loop only for judgment requires not just technical transformation but cultural and organizational change. This honest assessment of non-technical barriers distinguishes this case study from purely technical presentations.

## Critical Assessment and Balanced Perspective

This case study represents a mature, production-focused perspective on enterprise LLMOps that acknowledges both successes and failures candidly. Several aspects merit critical consideration:

**The 95% Accuracy Plateau**: The admission that high accuracy alone didn't drive adoption is valuable and often overlooked in vendor presentations. However, the case study doesn't provide quantitative metrics on adoption rates before and after the teammate evolution, leaving questions about the magnitude of improvement.

**Complexity vs. Maintainability**: The hierarchical planner architecture with subgraphs containing their own planners is sophisticated but potentially complex to maintain. The presentation advocates for lean supervisors but doesn't detail how they manage the overall system complexity or what observability tooling they've built around LangSmith.

**Deterministic Workflows**: The solution of bypassing LLM reasoning for scheduled tasks and predefined workflows is pragmatic but somewhat contradicts the AI-native workflow vision. It suggests limits to what LLMs can reliably execute, which is honest but indicates the technology hasn't fully delivered on autonomous workflow execution promises.

**Missing Metrics**: The presentation lacks quantitative business impact metrics - renewal rate improvements, time savings, cost reductions, or specific adoption figures. Without these, evaluating true production success is difficult.

**Model Choices**: The deliberate avoidance of discussing specific models and focus on architecture is both a strength (avoiding model-chasing) and a limitation (not understanding what capabilities were actually needed at different system layers).

**Human-in-the-Loop Balance**: While confidence scoring for human intervention is mentioned, the specifics of how thresholds are set, what percentage of tasks require human judgment, and how false positive/negative rates are managed remain unclear.

The case study is particularly valuable for its honesty about failures and its focus on production realities over demo success. The evolution from chatbot to teammate, the recognition that accuracy alone doesn't drive adoption, and the hybrid approach combining LLM reasoning with deterministic execution represent mature thinking about enterprise AI deployment. However, readers should recognize this as a work in progress rather than a fully solved problem, with ongoing challenges around complexity management, organizational change, and measuring true business impact.
