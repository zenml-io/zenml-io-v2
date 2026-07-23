---
title: "Building a World Model for Contextual AI Understanding in Workplace Software"
slug: "building-a-world-model-for-contextual-ai-understanding-in-workplace-software"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "data-analysis"
  - "agent-based"
  - "embeddings"
  - "semantic-search"
  - "memory"
  - "prompt-engineering"
  - "databases"
  - "cache"
  - "reliability"
  - "scalability"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "tech"
company: "Monday"
summary: "Monday developed an AI assistant called Sidekick that shifts their platform from a system of record to a system of context, addressing the fundamental challenge that while agents have access to massive amounts of workplace data (tasks, emails, messages, meetings), they lack true understanding of how these elements connect and what users should prioritize. Their solution, called the Monday World Model, uses a dual-engine architecture inspired by neuroscience and data processing systems: a slow engine that learns user patterns, personas, and work rhythms over weeks to build a durable profile, and a fast engine that processes recent activity to generate live signals about current priorities and urgencies. This architecture enables the AI to understand user context offline and ahead of time rather than attempting to construct meaning at query time, resulting in an assistant that can proactively determine what users should focus on based on deep understanding of their work patterns and current state."
link: "https://www.youtube.com/watch?v=Btk8wDUVs74"
year: 2026
seo:
  title: "Monday: Building a World Model for Contextual AI Understanding in Workplace Software - ZenML LLMOps Database"
  description: "Monday developed an AI assistant called Sidekick that shifts their platform from a system of record to a system of context, addressing the fundamental challenge that while agents have access to massive amounts of workplace data (tasks, emails, messages, meetings), they lack true understanding of how these elements connect and what users should prioritize. Their solution, called the Monday World Model, uses a dual-engine architecture inspired by neuroscience and data processing systems: a slow engine that learns user patterns, personas, and work rhythms over weeks to build a durable profile, and a fast engine that processes recent activity to generate live signals about current priorities and urgencies. This architecture enables the AI to understand user context offline and ahead of time rather than attempting to construct meaning at query time, resulting in an assistant that can proactively determine what users should focus on based on deep understanding of their work patterns and current state."
  canonical: "https://www.zenml.io/llmops-database/building-a-world-model-for-contextual-ai-understanding-in-workplace-software"
  ogTitle: "Monday: Building a World Model for Contextual AI Understanding in Workplace Software - ZenML LLMOps Database"
  ogDescription: "Monday developed an AI assistant called Sidekick that shifts their platform from a system of record to a system of context, addressing the fundamental challenge that while agents have access to massive amounts of workplace data (tasks, emails, messages, meetings), they lack true understanding of how these elements connect and what users should prioritize. Their solution, called the Monday World Model, uses a dual-engine architecture inspired by neuroscience and data processing systems: a slow engine that learns user patterns, personas, and work rhythms over weeks to build a durable profile, and a fast engine that processes recent activity to generate live signals about current priorities and urgencies. This architecture enables the AI to understand user context offline and ahead of time rather than attempting to construct meaning at query time, resulting in an assistant that can proactively determine what users should focus on based on deep understanding of their work patterns and current state."
notion:
  pageId: "3a6f8dff-2538-8022-8ec4-f5638750459e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T08:32:00.000Z"
  lastEditedTime: "2026-07-23T08:32:00.000Z"
  publishedAt: "2026-07-23T09:03:15Z"
---

## Overview

Monday presented their approach to building Sidekick, an AI assistant that transforms their work management platform from a passive system of record into an active system of context. The core insight driving this work is that the fundamental challenge in workplace AI is not data availability or retrieval but rather genuine understanding of how work elements connect and what matters to individual users. The presenters, Tormer and Omri (both engineering managers at Monday), emphasized that traditional AI agents can access all relevant data but still fail to answer basic questions like "what should I focus on right now?" because they lack contextual understanding of the user's work, priorities, and patterns.

## The Core Problem: The Agent Gap

Monday identified what they call "the agent gap" - the phenomenon where AI agents excel at executing specific tasks when told what to do but struggle to identify what problems need solving in the first place. An agent can draft a response to a customer escalation effectively when prompted, but when asked an open-ended question about priorities, it often produces generic, disconnected suggestions. The presenters illustrated this with an anecdote about an AI assistant suggesting gym attendance, highlighting how agents with access to comprehensive workplace data still provide irrelevant guidance.

The team identified three fundamental challenges that make building truly contextual AI difficult. First is the agent gap itself - agents are sharp at task execution but poor at problem identification. Second is the records-versus-meaning problem: logs and data points never inherently convey their significance. They used the analogy of a single line of code in GitHub - you can see the code and perhaps a comment, but understanding why it exists requires traversing through git blame to the commit message, then to the pull request description, and potentially to a Monday board item linked to a customer complaint. This chain of context is what enables true understanding. Third, they argue that constructing meaning at runtime when someone asks a question is fundamentally too late - understanding must be built ahead of time, offline, before queries are made.

## The Monday World Model Architecture

To address these challenges, Monday developed what they call the Monday World Model, which is explicitly not a retrieval system or a bigger prompt or longer context window, but rather a fundamentally different approach to enabling AI understanding. The architecture is built on dual-engine processing inspired by two distinct fields: neuroscience (complementary learning systems) and data processing (lambda architecture).

### Dual-Engine Design

The system employs two engines operating on different time windows and schedules:

**The Slow Engine** runs on long time windows spanning weeks and learns about the user and their work patterns. It processes user activity over extended periods to mine for patterns including the user's persona type, routines, work rhythms, collaboration patterns, main goals, and current projects. These patterns are distilled into a durable user profile that gets reinforced over time as patterns hold true. The slow engine's objective is to understand fundamentally who the user is and how they work. This mirrors the neocortex in the brain, which distills experiences into durable lessons over time.

**The Fast Engine** operates on short, recent time windows and recomputes a set of live signals over the user's current state. It identifies what's overdue, what has become suddenly urgent, which coworkers the user has been actively engaged with recently, and other immediate contextual signals. This engine tries to understand the user's current day and updates frequently. This parallels the hippocampus in the brain, which captures important experiences instantly.

The architectural inspiration from neuroscience's complementary learning systems and data processing's lambda architecture represents a thoughtful application of established patterns to the LLMOps domain. In lambda architecture terminology, the fast engine serves as the speed layer over recent real-time data, while the slow engine acts as the batch layer over full history, with both merged into a single served view.

## The Data Model Structure

The system constructs three key components that the agent can reason over:

First, it models how the user's work is structurally organized - the key entities, relationships, and connections between them. This includes understanding dependencies, how Slack messages connect to tasks, and who is blocking whom. Second, it maintains a current snapshot consisting of live signals over those entities - what's overdue, what's critically urgent right now, which coworkers the user has been actively working with and why. Third, it captures what can be learned about the user over time, including decisions and outcomes, work patterns and cadences, all distilled into the durable user profile.

## Data Collection and Processing Pipeline

The system collects thousands of data points on users, which they refer to as "breadcrumbs." These include item status changes, activity logs, messages and meetings across multiple platforms (Monday boards, Slack, emails, calendar events). The example provided showed collecting data such as current boards being worked on, emails from recent months, meeting transcripts, action items from meetings, calendar patterns (like bi-weekly meetings with VPs), and Slack messages from recent days.

This collected data flows into the dual processing engines. The slow engine builds the comprehensive profile - identifying that a user is an engineering manager, working on specific projects (they mentioned Sidekick and Notetaker as examples), based in a particular location, understanding how many working hours they have per day and their daily work patterns. The fast engine generates action items and commitments promised to others, identifies pending responses to important stakeholders, and surfaces other time-sensitive matters from recent activity windows.

## Serving Architecture and Runtime Behavior

When a user engages with Sidekick, the system follows a specific serving pattern. Both engines pre-compute their respective models offline and ahead of time. At serve time, only a thin slice of logic is recomputed for very recent activity, and the entire constructed context is served to the agent. Sidekick can then decide when and how to traverse and retrieve additional context from the data model itself, primed to reason on top of the pre-built understanding.

This architecture delivers two important operational characteristics. First, the system is resilient - data sources are isolated so a problematic feed cannot break the entire system. The thin layer of logic running at serve time verifies part of the context against live data while the rest falls back to the last verified context, enabling graceful degradation rather than complete failure. Second, the system understands the urgency of facts and can determine when it should proactively notify the user versus when it should remain silent, a critical capability for a workplace assistant.

## Compounding Knowledge and Scalability

A key design principle is that the system compounds over time. Each day data is captured, the layers fill in, and the profile sharpens. The architecture is designed to make adding new data sources deliberately cheap, with each new source only contributing additional understanding without disrupting existing models. This means the surface area of understanding continuously grows - the more the system sees, the more it understands, and the more it understands, the more users can rely on it.

The data model is unique to how each individual user works, representing a personalized understanding rather than a generic workplace model. This personalization is central to the value proposition.

## Acknowledged Limitations and Honest Assessment

To their credit, the presenters acknowledged significant limitations of their approach. The model is always trailing the actual live world state, creating an inherent lag between reality and understanding. New users have no reliable data for the system to reason from initially, creating a cold-start problem. The signals themselves have built-in biases from the team's design decisions. Most critically, they acknowledged that the hardest part is distinguishing important information from noise - a fundamental challenge in any contextual AI system.

They emphasized that this is an architectural design that can be enriched, tested, and improved over time rather than a complete solution. This represents a refreshingly honest assessment in a presentation that could easily have been purely promotional.

## LLMOps Implications and Production Considerations

From an LLMOps perspective, Monday's approach represents several important patterns and tradeoffs:

**Offline Processing Philosophy**: The core insight that understanding must be pre-computed rather than constructed at query time has significant implications for production systems. This shifts computational cost to background processing and reduces latency at serving time, but requires maintaining a complex dual-engine pipeline and managing data freshness tradeoffs.

**Agent Priming Through Structured Context**: Rather than relying solely on retrieval-augmented generation at query time, the system pre-constructs structured context that primes the agent for reasoning. This represents a middle ground between pure RAG approaches and fine-tuning, potentially offering better controllability and interpretability than either extreme.

**Graceful Degradation Design**: The resilient architecture with isolated data sources and fallback to last verified context represents mature production thinking. Many LLM systems fail completely when components break, whereas this design explicitly considers partial failures.

**The Cold Start Problem**: The acknowledgment that new users lack sufficient data for reliable reasoning highlights a fundamental challenge in personalized AI systems. The presentation did not detail their strategy for handling this phase, which would be valuable information for assessing production readiness.

**Signal Design as a Critical Layer**: The choice of what signals to compute and how to weight them represents a layer of human design that sits between raw data and AI reasoning. This is both a strength (enabling domain expertise to guide the AI) and a potential brittleness (the team's biases become systemic limitations).

**Scalability Through Cheap Source Integration**: The claim that adding new data sources is deliberately cheap is architecturally important for a production system that needs to integrate with an ever-expanding ecosystem of workplace tools. However, the presentation did not provide details on how this is achieved technically.

**Proactive Notification Intelligence**: The ability to understand when to notify versus remain silent is a critical but under-discussed aspect of production AI systems. Many systems err toward either excessive notifications or complete passivity. The dual-engine architecture potentially enables nuanced decisions by combining durable knowledge of user patterns with live urgency signals.

## Missing Technical Details

While the presentation provided a clear architectural vision, several technical details relevant to LLMOps practitioners were not addressed. The presentation did not specify which LLM models are used (whether Gemini, GPT, Claude, or others), how prompts are structured to leverage the pre-built context, how the system handles conflicting signals between fast and slow engines, what specific triggers cause profile updates or signal recomputation, how they measure whether the system truly "understands" versus simply retrieves, how they evaluate improvement over time, or what infrastructure supports the dual-engine architecture.

The lack of discussion around evaluation is particularly notable - how do you measure whether an AI truly understands a user's priorities versus simply making plausible-sounding suggestions? The distinction the presenters draw between retrieval and understanding is philosophically important but operationally difficult to validate.

## Comparative Context

The approach Monday describes represents a significant architectural commitment compared to simpler RAG-based systems. While RAG systems retrieve relevant context at query time, Monday's world model pre-processes and structures understanding offline. This is more complex to build and maintain but potentially offers lower latency and more sophisticated reasoning at serve time.

The inspiration from neuroscience and data architecture represents a thoughtful cross-disciplinary approach, though it remains to be seen whether the analogy holds at scale. The brain's complementary learning systems evolved over millions of years to handle human cognition, while Monday is applying the pattern to workplace productivity - potentially analogous domains, but with different constraints and requirements.

## Broader Product Context

The presentation positioned Sidekick within Monday's broader AI strategy, which includes Monday Vibe for building custom software, Monday Agent for creating custom agents, and Monday Workflows for deterministic automation. Sidekick appears to be the consumer-facing intelligence layer that sits across all user interactions. This suggests the world model architecture may serve as a foundation for multiple AI capabilities beyond just the assistant interface.

The positioning as transforming Monday from a "system of record" to a "system of context" represents a strategic shift in how workplace platforms create value. Rather than competing purely on features for capturing and organizing work, the differentiation becomes the quality of contextual understanding and proactive assistance.

## Production Maturity Assessment

The presentation format - a conference talk describing the architecture - leaves questions about production maturity unanswered. Are all described capabilities live in production? Are they rolling out gradually? What scale are they operating at? The presenters spoke about the system in present tense ("this is what we're building") suggesting active development rather than fully mature deployment.

The architectural decisions appear sound for production use, particularly the resilience and graceful degradation capabilities. However, the acknowledged limitations around new users, signal bias, and distinguishing signal from noise suggest this is an evolving system rather than a solved problem.

## Value Proposition Versus Reality

As with any product presentation, there is inherent promotional framing. The claim that agents "have zero understanding" when they have "all the data" is somewhat hyperbolic - agents do have understanding, just not the personalized, contextual understanding Monday aims to provide. The distinction between retrieval and understanding, while important, may be more of a spectrum than the binary the presentation suggests.

The example of traditional agents suggesting "go to the gym" is anecdotal and potentially cherry-picked to make competing approaches appear inadequate. Most modern AI assistants with proper context do provide work-relevant suggestions, though perhaps not with the depth Monday is targeting.

That said, the core insight that offline processing of patterns and relationships can provide qualitatively different context than query-time retrieval appears sound and represents genuine architectural innovation in the LLMOps space.

## Conclusion

Monday's world model represents a thoughtful architectural approach to building production AI systems that genuinely understand user context rather than simply retrieving relevant data. The dual-engine design inspired by neuroscience and data processing architecture provides a principled way to balance durable learning with real-time responsiveness. The emphasis on offline processing, graceful degradation, and compounding knowledge over time demonstrates mature production thinking. However, significant questions remain around evaluation, technical implementation details, cold start handling, and whether the system delivers on its ambitious claims in practice. The honest acknowledgment of limitations is refreshing and suggests a team thinking seriously about the challenges rather than simply promoting capabilities.
