---
title: "A Grounded, Artifact-Based Shopping Interface for Consumer Agents"
slug: "a-grounded-artifact-based-shopping-interface-for-consumer-agents"
draft: false
llmopsTags:
  - "chatbot"
  - "structured-output"
  - "data-integration"
  - "realtime-application"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "token-optimization"
  - "latency-optimization"
  - "fallback-strategies"
  - "evals"
  - "api-gateway"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash evolved Ask DoorDash from a chat interface that exposed per-item search carousels into a grounded shopping surface for grocery and restaurant agents. The production design uses an authoritative JSON shopping-list artifact with separate storage, agent, and consumer views; native widgets grounded in live catalog and cart systems; direct client-side edits for deterministic actions; and agent turns for changes requiring judgment. In July 2026, rendered grocery-list sessions averaged nearly two UI interactions, about one-third proceeded to apply the list to a cart, and nearly three-quarters of first follow-up actions occurred through components, although the article reports product usage metrics rather than controlled evidence that the architecture caused these outcomes."
link: "https://careersatdoordash.com/blog/building-ask-doordash-part-5-a-grounded-interface-for-shopping-agents/"
year: 2026
seo:
  title: "Doordash: A Grounded, Artifact-Based Shopping Interface for Consumer Agents - ZenML LLMOps Database"
  description: "DoorDash evolved Ask DoorDash from a chat interface that exposed per-item search carousels into a grounded shopping surface for grocery and restaurant agents. The production design uses an authoritative JSON shopping-list artifact with separate storage, agent, and consumer views; native widgets grounded in live catalog and cart systems; direct client-side edits for deterministic actions; and agent turns for changes requiring judgment. In July 2026, rendered grocery-list sessions averaged nearly two UI interactions, about one-third proceeded to apply the list to a cart, and nearly three-quarters of first follow-up actions occurred through components, although the article reports product usage metrics rather than controlled evidence that the architecture caused these outcomes."
  canonical: "https://www.zenml.io/llmops-database/a-grounded-artifact-based-shopping-interface-for-consumer-agents"
  ogTitle: "Doordash: A Grounded, Artifact-Based Shopping Interface for Consumer Agents - ZenML LLMOps Database"
  ogDescription: "DoorDash evolved Ask DoorDash from a chat interface that exposed per-item search carousels into a grounded shopping surface for grocery and restaurant agents. The production design uses an authoritative JSON shopping-list artifact with separate storage, agent, and consumer views; native widgets grounded in live catalog and cart systems; direct client-side edits for deterministic actions; and agent turns for changes requiring judgment. In July 2026, rendered grocery-list sessions averaged nearly two UI interactions, about one-third proceeded to apply the list to a cart, and nearly three-quarters of first follow-up actions occurred through components, although the article reports product usage metrics rather than controlled evidence that the architecture caused these outcomes."
notion:
  pageId: "3e9f8dff-2538-8089-ae7d-d946334c7dda"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:18:00.000Z"
  lastEditedTime: "2026-09-28T08:18:00.000Z"
  publishedAt: "2026-09-28T08:24:22Z"
---

## Overview

DoorDash uses Ask DoorDash as a production shopping assistant for grocery and restaurant use cases. A consumer can ask for a $60 dinner for ten people, help making chicken tacos, weekly snacks, or restaurant recommendations. For grocery requests, the assistant produces an editable shopping list containing matched products, prices, photos, quantities, substitutions, and an estimated total. The list can be revised conversationally and explicitly added to the cart. Restaurant requests use the same broad client and platform machinery but can return stores, dishes, or cart suggestions.

The central production insight is that an agent should not expose its intermediate tool results as the user interface. DoorDash’s early hackathon implementation rendered a carousel for each item and effectively presented the agent’s search work as a chat transcript. The current design instead treats the shopping list as a durable artifact and renders it through native, interactive components. The artifact is the system of record, while compact agent context and richer consumer views are derived from it. This enables immediate edits without an LLM round trip, keeps model context small, grounds commerce claims in live DoorDash systems, and preserves user control before anything is committed to a cart.

## Problem and evolution of the interface

The initial prototype reused DoorDash components but placed them in a conversation-oriented container. It displayed a store-selection carousel followed by one full-width result carousel per requested item. Consumers had to select products one at a time, and each carousel exposed the search term and candidate ordering used by the agent. This arrangement made the agent’s working material visible rather than giving the consumer a coherent shopping surface. It also constrained the agent to produce a sequence of item-level results because that was the structure the interface could display.

DoorDash retained the prototype’s streaming infrastructure, but replaced the decoding layer that translated tool results directly into UI. The production approach separates consumer requirements, storage requirements, and agent requirements. A shopping list can therefore be presented as a compact card in the conversation or opened as a full-page interactive list, while the agent reasons over a smaller representation and the backend retains complete state. This is an important LLMOps boundary: model/tool output is not treated as a stable end-user contract; typed artifacts and client schemas are used instead.

## Artifact architecture and state management

The shopping list has three readers with deliberately different representations. The stored form is a complete JSON blob held as an artifact in Managed Agent Services and serves as the only authoritative copy. It contains the information required to render and edit the list, including product choices, prices, quantities, metadata, and alternate matches.

The agent generally does not receive the full artifact on every turn. A median list is reported to persist as 40–60 KB of JSON, whereas the conversational context carries a compact summary of approximately 240 characters describing the store and list contents. When exact state is needed, the agent reads the artifact and receives a reduced view with display metadata removed. The article estimates that the contextual summary is roughly 250 times smaller than the median stored list. This reduces unnecessary context repetition and helps keep follow-up reasoning focused, although the source does not provide token-cost, latency, or model-accuracy measurements for the optimization.

The consumer receives a richer representation than the model. A compact conversation widget shows the store, list name, ETA, selected item photos, and an Add to Cart control with an estimated total. View List opens a full-page experience with quantities, substitutions, alternatives, and detailed controls. For each item, the assistant retains up to ten candidates from matching. DoorDash reports that 99.7% of items have enough matches to fill that set. The consumer can inspect alternate products, while the agent normally sees only the selected list state because choosing among alternates is assigned to the consumer unless explicitly requested.

This separation also establishes clear write semantics. A deterministic client action, such as changing quantity, deleting an item, or swapping to an already retrieved alternative, updates the artifact directly and becomes authoritative immediately. A change requiring judgment, such as rebuilding the list for another store, starts a new agent turn. The agent reads the current artifact rather than relying on an old transcript, so a prior direct deletion is preserved. Agent revisions create a new artifact derived from the previous one instead of overwriting it.

## Grounding and typed UI contracts

DoorDash grounds the assistant at both the interface and data layers. The agent selects a supported content type and supplies commerce data, while the iOS client owns presentation and interaction by mapping the content to native DoorDash design-system components. Supported outputs include editable grocery lists, store cards, item cards, and cart suggestions. Adding a new widget requires more than changing a prompt: the agent must know when to select it and how to populate it, and the client and backend need a named schema and decoding and rendering code.

Prices, inventory, store hours, and cart contents come from the same systems of record used elsewhere in the DoorDash application rather than being generated by the model. This means the price displayed in Ask is intended to match the store page at that moment. The approach reduces a major risk of shopping agents—hallucinated or stale commerce facts—but it introduces a continuing integration burden because model behavior, typed contracts, catalog services, and native client releases must remain compatible.

The assistant also places rationale inside or around widgets. For example, against a cart containing raspberry yogurt, it can suggest granola because it goes with the yogurt and blueberries to add fruit to the yogurt. This is contrasted with a conventional complementary-item carousel that offers plausible products without an explanation. Rationale can make a suggestion more understandable and actionable, but the article does not report a separate experiment proving that explanations improve conversion or trust.

## Human-in-the-loop interaction design

Widgets act as both output and input channels. A full-page list lets consumers change quantities, remove items, swap among retrieved alternatives, and add the list to the cart without model calls. These controls are used for local, structured operations. Structured clarification widgets collect multiple-choice or multi-select answers when the assistant genuinely needs consumer input, avoiding a sequence of free-text questions. DoorDash says this pattern is used in grocery and is being adopted by the restaurant agent, and it is conceptually similar to the AskUserQuestion interaction in Claude Code.

The boundary between direct manipulation and agent reasoning is a key operational design choice. Changing the store is treated as a semantic rebuild against a different catalog, so it starts an agent turn rather than mutating the current list. The article reports that changing stores was the first action in 0.1% of engaged sessions. In July 2026 grocery sessions where a shopping list was rendered, users averaged close to two UI interactions and roughly one-third went on to apply the list to a cart. Nearly three-quarters of first next actions after the initial request came through a component; from the second message onward, typed follow-ups were the majority at every measured depth. These figures indicate how controls and conversation divide the workflow, but they are observational product metrics and do not establish causal performance against an alternative design.

Every visible assistant revision remains live. Earlier lists stay in the conversation and can still be opened, edited, or added to the cart. This makes experimentation and revision less risky because requesting a new version does not destroy a previously acceptable result. Candidate lists that reveal a store lacks requested items are not rendered; instead, the consumer receives a textual explanation while a new list is generated. The design uses interaction to simplify common actions and prose to communicate exceptions and rationale.

## Cart commitment and safety

The shopping list is treated as a proposal rather than an autonomous cart mutation. The assistant can create and revise dozens of items, but nothing is added to the cart until the consumer explicitly selects Add to Cart. This limits the impact of an incorrect recommendation or an unwanted removal, which is particularly important because the cart is close to payment and silent changes could damage trust.

DoorDash separates list construction from cart reconciliation. The assistant reads the cart while building a list, but does not silently reduce a requested quantity merely because the consumer already owns or has added the product. At commit time, overlaps are surfaced and the consumer chooses whether to replace existing quantities or add to them. This is a practical human-approval gate for an agentic commerce workflow. It adds an interaction and does not eliminate all risks around inventory, price changes, or quantity interpretation, but it keeps the final commitment explicit.

## Context, routing, and orchestration

Ask DoorDash can be opened from many locations in the application, where the entry context provides useful signals. The client attaches a flat set of key-value pairs to each request, including the topic, such as grocery or restaurant, the current store, and related identifiers. A Gateway uses the topic to route the turn to an appropriate agent, while the other identifiers supply tools with the context needed to operate on the relevant store or catalog.

The scope format is intentionally extensible: unrecognized keys are carried through rather than rejected, allowing a new surface to provide context without waiting for a Gateway change. Adding a new domain is more expensive because the Gateway must learn how to route its topic. Scope applies primarily to the first message of a context, allowing the consumer to leave the initial domain explicitly. An agent can recognize an out-of-domain request and hand it back so another specialized agent can handle it.

Scope, agent pinning, and session state are kept separate. Scope is per-turn entry context; the pin keeps follow-up turns with the agent that resolved the previous request; and the transcript and pin are associated with the chat rather than with a particular store scope. This supports a continuous conversation as the consumer moves around the DoorDash app while still allowing routing to change. It is an orchestration pattern for multiple specialized agents that presents a single assistant experience.

Some flows bypass the LLM. Reorder my last cart can be handled deterministically when the previous store still carries every item. The result is still a normal editable shopping-list widget, so the consumer receives the same downstream controls. If an item is unavailable, the request is routed to the grocery agent to rebuild the list. This selective bypass can reduce latency and model usage for known operations while preserving an agent fallback for exceptions.

## Results, tradeoffs, and assessment

The case demonstrates a production-oriented pattern for shopping agents: durable typed artifacts, compact model views, native grounded widgets, explicit commit points, direct client mutations, and agent turns only where judgment is required. The reported usage data suggests that consumers engage with the rendered list and frequently use components for immediate refinement, while language remains important for broader follow-up requests.

The architecture’s strengths are consistency, user control, and separation of concerns. System-of-record commerce data limits unsupported model claims; artifact reads protect against stale transcript state; prior revisions remain recoverable; and deterministic edits avoid unnecessary latency and cost. The principal tradeoffs are implementation complexity and contract maintenance. Every widget requires coordination among agent logic, schemas, Gateway routing, streaming infrastructure, artifact storage, and native clients. Flat scope improves extensibility but weakens validation, and multi-agent handoffs add routing and state-management failure modes. The article provides useful product metrics and concrete design details, but it does not disclose model names, prompt designs, latency distributions, failure rates, offline evaluation results, experiment controls, or long-term business outcomes. Consequently, the reported success should be read as an internally described production design and early usage evidence rather than independently validated proof that the approach is superior to simpler alternatives.
