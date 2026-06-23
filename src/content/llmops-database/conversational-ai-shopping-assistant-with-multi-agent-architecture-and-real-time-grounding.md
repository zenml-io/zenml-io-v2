---
title: "Conversational AI Shopping Assistant with Multi-Agent Architecture and Real-Time Grounding"
slug: "conversational-ai-shopping-assistant-with-multi-agent-architecture-and-real-time-grounding"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "classification"
  - "summarization"
  - "realtime-application"
  - "structured-output"
  - "multi-modality"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "agent-based"
  - "memory"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "a2a"
  - "mcp"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "cache"
  - "langchain"
  - "google-gcp"
  - "openai"
  - "anthropic"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash built a conversational AI shopping assistant called \"Ask DoorDash\" to help consumers discover restaurants and shop for groceries through natural language interactions. The system addresses the challenge of maintaining accurate grounding against rapidly changing local commerce data (menus, prices, inventory, ETAs) while providing personalized recommendations across multi-turn conversations. Using a multi-agent architecture built on Google's Agent Development Kit, the solution incorporates a three-layer memory system, real-time catalog integration through Model Context Protocol tools, and a comprehensive LLM-as-judge evaluation framework. Early production results show that approximately 70% of traffic is discovery-related, most sessions are multi-turn interactions, and the largest failure category is grounding errors, which the team addresses by routing all claims through tool calls to authoritative data sources."
link: "https://careersatdoordash.com/blog/building-doordash-assistant-an-engineering-overview/"
year: 2026
seo:
  title: "Doordash: Conversational AI Shopping Assistant with Multi-Agent Architecture and Real-Time Grounding - ZenML LLMOps Database"
  description: "DoorDash built a conversational AI shopping assistant called \"Ask DoorDash\" to help consumers discover restaurants and shop for groceries through natural language interactions. The system addresses the challenge of maintaining accurate grounding against rapidly changing local commerce data (menus, prices, inventory, ETAs) while providing personalized recommendations across multi-turn conversations. Using a multi-agent architecture built on Google's Agent Development Kit, the solution incorporates a three-layer memory system, real-time catalog integration through Model Context Protocol tools, and a comprehensive LLM-as-judge evaluation framework. Early production results show that approximately 70% of traffic is discovery-related, most sessions are multi-turn interactions, and the largest failure category is grounding errors, which the team addresses by routing all claims through tool calls to authoritative data sources."
  canonical: "https://www.zenml.io/llmops-database/conversational-ai-shopping-assistant-with-multi-agent-architecture-and-real-time-grounding"
  ogTitle: "Doordash: Conversational AI Shopping Assistant with Multi-Agent Architecture and Real-Time Grounding - ZenML LLMOps Database"
  ogDescription: "DoorDash built a conversational AI shopping assistant called \"Ask DoorDash\" to help consumers discover restaurants and shop for groceries through natural language interactions. The system addresses the challenge of maintaining accurate grounding against rapidly changing local commerce data (menus, prices, inventory, ETAs) while providing personalized recommendations across multi-turn conversations. Using a multi-agent architecture built on Google's Agent Development Kit, the solution incorporates a three-layer memory system, real-time catalog integration through Model Context Protocol tools, and a comprehensive LLM-as-judge evaluation framework. Early production results show that approximately 70% of traffic is discovery-related, most sessions are multi-turn interactions, and the largest failure category is grounding errors, which the team addresses by routing all claims through tool calls to authoritative data sources."
notion:
  pageId: "384f8dff-2538-8080-9597-c019c03b5717"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-19T11:05:00.000Z"
  lastEditedTime: "2026-06-19T11:05:00.000Z"
  publishedAt: "2026-06-22T14:47:26Z"
---

## Overview

DoorDash developed an ambitious conversational AI assistant called "Ask DoorDash" that allows consumers to shop for food and groceries through natural language. The assistant handles requests ranging from simple restaurant discovery ("ramen near me") to complex grocery shopping tasks ("this week's groceries for two people, vegetarian, $60 budget"). This case study provides detailed insight into how DoorDash architected, deployed, and operates a production-scale agentic system that must maintain accurate grounding against rapidly changing local commerce data while delivering personalized, multi-turn conversations.

The core challenge DoorDash addresses is unique to local commerce: unlike general-purpose LLMs that can rely on static world knowledge, a food delivery assistant must ground every recommendation against real-time data about menus, prices, store hours, delivery ETAs, delivery radii, and inventory levels that change minute-by-minute and vary by location. None of this information exists in pre-trained model weights, and the company explicitly notes that almost none of it is scrapable—determining which restaurants serve vegetarian options today, whether the nearest grocery store has avocados in stock right now, or what a realistic ETA is from the consumer's specific address requires live integration with authoritative systems. DoorDash leverages a decade of investment in catalog infrastructure and consumer memory systems to power this grounding.

## Production Patterns and Usage

The system is currently rolling out to select U.S. areas on iOS, starting with restaurant search and grocery shopping, with Android and web clients in development. Early production data reveals important patterns about how consumers actually use conversational commerce:

Discovery dominates usage, accounting for roughly 70% of all messages. Consumers use the assistant to find restaurants, figure out meal plans, plan grocery runs, or browse for ideas. The remaining 30% covers support questions, deals inquiries, and general questions. Most sessions are multi-turn, with consumers who send an initial message typically continuing to iterate—refining recommendations, narrowing searches, swapping items, or building out shopping lists. This multi-turn behavior is critical for understanding the system's architecture, as it necessitates sophisticated session state management and memory persistence.

The largest category of production failures is grounding errors: stores recommended as open when they're actually closed, prices that don't match the live catalog, or items the agent claims to have added that aren't actually in the cart. DoorDash's solution is architectural rather than prompt-based—they route every consumer-visible claim through a tool call against the system of record on the turn it's made, ensuring the agent never hallucinates facts that can be verified.

## Example Session Architecture

A typical grocery shopping session illustrates the system's complexity. When a consumer requests "Build me a $60 vegetarian list for two people this week," the agent executes a coordinated workflow involving 6-8 LLM calls and multiple tool invocations: consumer memory lookup to retrieve dietary preferences and brand affinities, delivery-radius search for currently open stores with reasonable ETAs, per-merchant inspection, item search against current inventory, order history lookup, optional pricing or deals checks, display planning, and reply text generation with suggested follow-ups. A single turn processes low hundreds of thousands of input tokens once the candidate item set is loaded into context, taking 20-30 seconds end-to-end.

Critically, consumer edits to the resulting shopping list widget (swapping brands, removing items, adjusting quantities) happen directly through the Gateway without entering an LLM round trip, keeping the interface responsive. The subtotal recomputes against the live catalog immediately. When the consumer then asks "Add salad ingredients," the agent reads the artifact with applied edits, grounds against the same store's current inventory, appends matching items within remaining budget, and renders the updated list—all while maintaining conversational coherence across turns.

## Multi-Agent Architecture

DoorDash built a layered architecture with clear separation of concerns. At the top, iOS clients (with Android and web coming) send text, image, and voice inputs and receive Server-Sent Events (SSE) streams containing text deltas and widget payloads. The Gateway, implemented in DoorDash's consumer web monorepo using the Vercel AI SDK, handles authentication, session continuity, and the SSE plumbing for long-lived multi-turn requests. It translates between the UI message stream format and agent-to-agent (A2A) streaming gRPC.

An Orchestrator agent routes each turn to the appropriate domain agent—currently restaurant discovery or grocery shopping, with more in development. The orchestrator implements "agent pinning" to keep follow-up turns like "add to cart" routed to whichever agent answered the previous turn until the consumer's intent shifts. Domain agents are owned by separate teams and deploy on independent schedules, communicating over the same A2A protocol the Gateway uses. This loose coupling allows one domain to ship improvements or experience regressions without affecting others.

Each agent runs on Google's Agent Development Kit (ADK). DoorDash built a unified model factory that selects models per role (routing, restaurant discovery, grocery shopping, summarization) through configuration rather than code, with automatic fallback across providers. The team routinely shadow-evaluates alternative models in production, and their evaluation harness produces the data that informs per-role model swaps without requiring code releases. This architectural choice enables rapid model iteration—a critical capability given the pace of LLM improvement and the different capabilities required for different agent roles.

## Managed Agent Services

DoorDash developed three foundational services that all agents share, built once so that other agent teams at DoorDash can adopt agentic patterns without rebuilding infrastructure:

**Artifacts** are versioned objects with stable IDs representing widgets like shopping lists and store cards. Consumers edit them between turns directly through the Gateway, and agents read the latest version on the next turn. This design keeps the LLM out of the loop for simple interactions—when a consumer taps to change a quantity or remove an item, that edit runs as a direct artifact mutation with immediate feedback. The artifact system also enables the assistant to maintain complex state across turns without re-generating entire structures.

**Session** management stores conversation turns, tool calls, tool results, and agent state, with namespacing per agent and cross-agent sharing through A2A headers. This allows the orchestrator to maintain context about which domain agent is currently handling the conversation while enabling smooth handoffs when consumer intent shifts.

**Memory** provides consumer-level personalization signals through a sophisticated three-layer system described in detail below. The key architectural insight is that memory is accessed through the same tool-calling interface as business logic, making it a first-class part of the agent's grounding surface rather than a separate retrieval mechanism.

## Intelligence: The Three-Layer Memory System

DoorDash's approach to personalization recognizes that agents reason in natural language and start every session with no inherent history. The Intelligence pillar adds memory layers that let each session pick up consumer context, building on DoorDash's earlier unified consumer memory platform.

**Long-term memory** updates on daily or weekly batch cadences and contains structural patterns extracted from historical behavior: dietary preferences, dining patterns, brand affinity, item taxonomy preferences, store preferences, and cross-channel patterns. This layer captures what DoorDash knows about a consumer from months or years of orders.

**In-session memory** operates in real-time and reflects current intent from active cart, search, and browse activity within the current shopping session, even before the consumer opens the assistant. If someone has been browsing Italian restaurants for ten minutes, the assistant incorporates that signal.

**Agentic memory** is conversation-driven and stores durable facts the consumer states explicitly during assistant interactions. New facts are deduplicated against long-term memory and reconciled with profile data before being written back. DoorDash carefully distinguishes between facts worth persisting ("vegetarian preferences," "always shopping for two," "prefer a further Safeway that has better inventory availability for my usuals") and transient mentions that should not be saved ("getting this for a friend tonight," ambiguous statements, anything the consumer has overridden in later turns). An LLM extracts these facts from conversation, and health or medical information is never written even on explicit request.

Each memory block is a small, structured fact consisting of a category plus the preference itself, such as "dietary: prefers dairy-free" or "brand: prefers Oatly." Facts include timestamps and, where appropriate, time-to-live values so transient details expire automatically. The store is partitioned into namespaces by memory kind (durable facts, taste profile, brand preferences, category preferences), and writes are reconcilable rather than append-only. The extractor can add, revise, or retract facts as consumer preferences change, ensuring the store reflects current state rather than accumulating a growing log of potentially contradictory historical statements.

Crucially, DoorDash does not resolve memory against live inventory and catalog data in a separate pre-processing layer. This reconciliation happens on each turn during tool execution. The agent retrieves relevant stored preferences through memory tools, then reconciles them against live grounding data returned by search and cart tools, including availability, pricing, and store hours. When memory conflicts with reality—when Oatly is out of stock at the nearest store, or when the cheapest qualifying cart for the consumer's weekly request exceeds their stated $60 budget—the agent adjusts its plan accordingly and surfaces the constraint explicitly so the consumer understands the tradeoff.

## Model Context Protocol and Grounding

All agents call tools through a shared Model Context Protocol (MCP) layer. The same MCP server backs both the DoorDash Assistant and external integrations, with each surface configured to see the tools it needs. This architecture centralizes business logic—cart manipulation, store lookup, deal application—in the tools themselves, separate from the prompts that invoke them. Personalization runs through the same layer: the agent calls `memory_search` the same way it calls `find_nearby_stores`, creating a uniform interface for all grounding operations.

Underneath MCP are the same backend services the rest of the DoorDash app uses: search, catalog, order history, cart, deals, and the merchant pipeline. This has profound implications for reliability and accuracy. Improvements to these backend systems automatically benefit the assistant. Edge cases—freshly delisted items, mid-update menus, isochrone polygons that exclude a store the consumer can see geographically—are handled consistently across the entire DoorDash platform. The team's explicit goal is for every consumer-visible claim to come from a tool call against the system of record on the turn it's made, eliminating the possibility of the LLM hallucinating facts that can be verified.

## Evaluation: A Comprehensive Quality Framework

DoorDash recognizes that evaluating an agentic system differs fundamentally from traditional software testing or static model evaluation. Unit and integration tests verify component behavior, dashboards monitor service health, and model evaluations measure capabilities on predefined tasks—but none directly answer whether the agent successfully helped the user accomplish their task. The challenge stems from the stateful nature of agent interactions, where sessions span multiple turns and tool invocations, and each action shapes context for subsequent decisions. A seemingly minor change can alter how entire conversations unfold, making it difficult to reason about quality through pre-defined input-output mappings alone.

The evaluation system DoorDash built constructs a transcript for each session capturing user inputs, agent responses, tool calls, tool outputs, and grounding context. A suite of LLM-as-judge evaluators, calibrated against human-reviewed labels, assesses transcripts against relevant rubrics. The system distinguishes between two evaluation categories:

**Guardrail evals** monitor critical agent behaviors such as session integrity and safety, surfacing failures that could break user trust. These are binary pass/fail checks on must-have properties.

**Capability evals** measure quality dimensions such as result quality (did the recommendations match the request?) and execution quality (did the agent use tools correctly and efficiently?), helping quantify agent performance across dimensions the team cares about.

Critically, offline and online evaluations share the same rubric and judge, ensuring calibration stays aligned between development and production. This means that experiments run during development produce quality scores directly comparable to production metrics, enabling confident decisions about whether to ship changes.

As online evaluations run continuously in production, background agents cluster failures, perform deep-dive investigations, and generate reports for the team. Some reports identify bugs in the assistant itself, such as broken item-selection logic. Others uncover gaps in the evaluation system, such as an LLM-as-judge prompt producing false positives. The team reviews each report, makes necessary changes, generates synthetic sessions through a simulator, and validates fixes offline against the same rubric before deploying to production.

The simulation harness is a critical component of the development workflow. It generates synthetic sessions that exercise the assistant under various scenarios, enabling rapid iteration without requiring live user traffic. Every meaningful change runs through the simulation harness before shipping, and dynamic feature flags allow the team to flip behavior per consumer or roll back instantly. Through the project, DoorDash has reversed roughly as many architectural and model decisions as they've kept—static memory embeddings became dynamic, per-sub-agent prompt optimization became system-level joint optimization, and several model choices have moved in and out of the primary path. This willingness to reverse decisions reflects the team's experimental culture and the confidence their evaluation infrastructure provides.

## Platform Considerations and Operational Practices

DoorDash's platform choices reflect lessons learned from operating agentic systems at scale. The team maintains that architecture and model choices should be reversible by design. The model factory's per-role configuration enables swapping foundation models without code changes. The A2A protocol's agent independence means domain teams can iterate without coordinating releases. The artifact system's stable IDs mean widget schemas can evolve without breaking active sessions.

Latency is a persistent challenge. LLM responses taking 20-30 seconds represent an eternity in a shopping flow. DoorDash addresses this through several mechanisms: pre-generated suggestion prompts served from cache ensure something appears on screen instantly when the assistant opens. The SSE stream pushes partial results as the agent works, so widget skeletons settle into shape and text fills in progressively rather than blocking on full completion. Artifact mutations bypass LLM round trips entirely. The team continuously optimizes for perceived responsiveness even when underlying processing time remains constrained by model inference.

The team extensively uses AI-assisted development, maintaining a small library of reusable skills for sprint planning, CI failure triage, production debugging runbooks, queries against the memory store, repository synchronization, and end-to-end test orchestration. Weekly pull-request volume doubled in early sprints and roughly tripled by final pre-launch weeks, suggesting significant productivity gains, though the team doesn't claim this translates directly to feature velocity—code volume can reflect both increased capability and refactoring churn.

## User Experience Design

The UX design philosophy centers on making the assistant feel like a personal shopper where the consumer can lean on automation or take control at any point. The assistant has a persistent "Ask" button entry point, complemented by contextual entry points in surfaces where consumers are already shopping. Input modalities match the moment: typed shopping lists for weekly planning, photo upload for recipes saved from Instagram, camera snap of the fridge to identify missing items, or voice requests for dinner ideas on the walk home—all feeding the same conversational thread.

The design creates a collaborative environment rather than full automation. Consumers choose when to delegate tasks and when to operate manually. The assistant produces work but never commits it without explicit confirmation. When building a shopping list, the consumer reviews before it lands in the cart. Items, quantities, and stores can be tweaked directly on the widget (often faster than natural language) or through conversational requests in the next turn. The collaboration runs bidirectionally: for recipe-based shopping, the assistant pauses to ask which pantry staples the consumer already has before building out the rest of the list. Ambiguous requests get clarifying questions, and assumptions are surfaced explicitly for correction.

Responses lean heavily on widgets—store cards, lists, cart sheets—rendered from the same live data the rest of the app uses. This grounding in real data builds trust: consumers can verify what the assistant offers rather than taking its word. The client architecture is deliberately extensible, with adaptable frameworks decoupling chat infrastructure from specific specs or interaction paradigms, enabling new agent behaviors, widget contracts, and interaction patterns to land without significant rework.

## Critical Assessment

DoorDash's case study is notably comprehensive in its technical detail and honest about challenges. The acknowledgment that their largest failure category is grounding errors, and that they've addressed this architecturally rather than through prompt engineering, reflects mature thinking about LLM limitations. The decision to route all verifiable claims through tool calls against authoritative data represents sound engineering, though it comes at a latency cost the team continues to manage.

The three-layer memory system is sophisticated, but the case study would benefit from more detail on how reconciliation actually works when memory conflicts with live data. The example of "always buys Oatly" when Oatly is out of stock is mentioned, but the specifics of how the agent explains this to the user, whether it offers substitutes proactively, and how often these conflicts occur in practice remain unclear.

The evaluation framework appears robust, with the alignment between offline and online evaluation rubrics being particularly important for confidence in shipping decisions. However, the case study doesn't provide specific metrics on evaluation accuracy, inter-rater reliability between human labels and LLM judges, or how often background agents identify false positives versus true issues. The claim that "roughly as many decisions have been reversed as kept" suggests healthy experimentation but also raises questions about initial design confidence and whether certain patterns have emerged about which types of decisions tend to need reversal.

The multi-agent architecture with separate domain teams is well-motivated for organizational scaling, but the orchestrator's agent-pinning logic could become complex as more domains launch. The case study doesn't address how the orchestrator handles ambiguous intent that could map to multiple domains, or how it recovers when it routes to the wrong domain and the consumer's subsequent turn makes that clear.

Latency remains the elephant in the room. At 20-30 seconds for a turn with hundreds of thousands of tokens in context, the system operates at the edge of acceptable responsiveness for commerce. The team's focus on perceived latency through progressive rendering is appropriate, but this represents a fundamental tension in agentic architectures: comprehensive grounding requires extensive context, but extensive context means slow inference. The case study doesn't discuss whether they've experimented with smaller, faster models for certain steps, or whether they've implemented speculative execution patterns where multiple potential next steps are pre-computed.

The AI-assisted development claims are interesting but presented with appropriate caution. Tripled PR volume could reflect genuine productivity gains, but it could also reflect increased refactoring, experimental branches, or generated code requiring more review overhead. The library of "reusable skills" for development tasks suggests thoughtful scaffolding rather than ad-hoc tool use, which is promising.

Overall, this case study represents one of the more thorough public descriptions of a production agentic system operating at scale in a commercial context. The architecture reflects real operational lessons about grounding, evaluation, and cross-functional team coordination. The willingness to discuss failure modes and reversed decisions adds credibility, even as certain performance metrics and design rationale details remain underspecified.
