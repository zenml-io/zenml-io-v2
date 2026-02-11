---
title: "Building a Conversational AI Agent for Slack Integration"
slug: "building-a-conversational-ai-agent-for-slack-integration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "692d5f10b5cc323cd340ec37"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:30:49.679Z"
  createdOn: "2025-12-01T09:25:36.502Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "question-answering"
  - "summarization"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "few-shot"
  - "system-prompts"
  - "latency-optimization"
  - "error-handling"
  - "fastapi"
industryTags: "tech"
company: "Linear"
summary: "Linear, a project management tool for product teams, developed an experimental AI agent that operates within Slack to allow users to create issues and query workspace data without leaving their communication platform. The project faced challenges around balancing context provision to the LLM, maintaining conversation continuity, and determining appropriate boundaries between LLM-driven decisions and programmatic logic. The team solved these issues by providing localized context (10 messages) rather than full conversation history, splitting the system early to distinguish between issue creation and data lookup requests, and limiting LLM involvement to tasks it excels at (summarization, title generation) while handling complex business logic programmatically. This approach resulted in higher accuracy for issue creation, faster response times, and improved user satisfaction as the agent could quickly generate well-formed issues that users could then refine manually."
link: "https://www.youtube.com/watch?v=Xq3PrK7V9Vw"
year: 2025
seo:
  title: "Linear: Building a Conversational AI Agent for Slack Integration - ZenML LLMOps Database"
  description: "Linear, a project management tool for product teams, developed an experimental AI agent that operates within Slack to allow users to create issues and query workspace data without leaving their communication platform. The project faced challenges around balancing context provision to the LLM, maintaining conversation continuity, and determining appropriate boundaries between LLM-driven decisions and programmatic logic. The team solved these issues by providing localized context (10 messages) rather than full conversation history, splitting the system early to distinguish between issue creation and data lookup requests, and limiting LLM involvement to tasks it excels at (summarization, title generation) while handling complex business logic programmatically. This approach resulted in higher accuracy for issue creation, faster response times, and improved user satisfaction as the agent could quickly generate well-formed issues that users could then refine manually."
  canonical: "https://www.zenml.io/llmops-database/building-a-conversational-ai-agent-for-slack-integration"
  ogTitle: "Linear: Building a Conversational AI Agent for Slack Integration - ZenML LLMOps Database"
  ogDescription: "Linear, a project management tool for product teams, developed an experimental AI agent that operates within Slack to allow users to create issues and query workspace data without leaving their communication platform. The project faced challenges around balancing context provision to the LLM, maintaining conversation continuity, and determining appropriate boundaries between LLM-driven decisions and programmatic logic. The team solved these issues by providing localized context (10 messages) rather than full conversation history, splitting the system early to distinguish between issue creation and data lookup requests, and limiting LLM involvement to tasks it excels at (summarization, title generation) while handling complex business logic programmatically. This approach resulted in higher accuracy for issue creation, faster response times, and improved user satisfaction as the agent could quickly generate well-formed issues that users could then refine manually."
---

## Overview

Linear, a purpose-built project management tool for product teams, embarked on building an experimental AI agent designed to operate within Slack. The presentation by Kristen, a product engineer at Linear, provides insights into how the company approaches AI experimentation and specifically details the challenges and solutions encountered when deploying an LLM-powered conversational agent in production. Linear's philosophy involves only shipping features with strong product fit, which means extensive behind-the-scenes experimentation with AI capabilities before releasing them to users.

The broader context of Linear's AI initiatives includes multiple projects in various stages of maturity: an agent platform for building custom agents (released), update generation for projects and initiatives (in development), Pulse for compiling and summarizing updates into feeds, issue summarization (recently released), triage suggestions, and the Slack chat agent interface that forms the focus of this case study. This case study is particularly valuable because it candidly discusses the practical challenges of deploying LLM agents in constrained third-party platforms and reveals the iterative problem-solving approach taken.

## Use Case and Motivation

The primary motivation for building the Linear agent in Slack stemmed from meeting users where they already perform substantial work communication. Rather than forcing constant context switching between Slack and Linear, the team wanted to enable seamless interaction with Linear data directly within Slack conversations. The core use cases centered on two primary actions: creating issues from Slack threads and answering questions about workspace data.

A typical scenario illustrated in the presentation shows two engineers discussing feature capabilities in a Slack thread. When one decides to create an issue from the conversation, the Linear agent examines the thread context and automatically assigns the issue to the engineer who initiated the request. This workflow demonstrates the agent's ability to understand conversational context and apply appropriate defaults based on that understanding.

## Platform Constraints and Architecture Decisions

Building within Slack imposed limitations that differ significantly from developing features within Linear's own product. When building your own product, there's considerable latitude in designing interactions and product surfaces. Slack's platform constraints required careful consideration of how to present agent interactions, manage conversation state, and deliver responses within the expected performance envelope of a chat application.

The team made an early architectural decision to split the system based on user intent. Initially, they provided the agent with a unified set of tools covering both issue creation and data lookup/search capabilities. However, this approach led to the LLM making erroneous tool calls, attempting to gather arbitrary data to fill issue fields when users simply wanted to create an issue. The solution involved introducing a small, fast model at the beginning of the interaction to classify the user's intent: "Are you creating an issue or doing anything else?" This binary classification allowed the system to route requests to specialized subsystems with tailored prompts and tool sets.

This split architecture proved beneficial in multiple ways. For issue creation, the system prompt could focus exclusively on guidance around issue fields, what constitutes good issue data, and how to extract relevant information from conversations, without being cluttered with instructions about data search and retrieval. This resulted in higher accuracy for issue creation tasks and faster responses due to fewer erroneous tool invocations. The focused approach also made the system more maintainable and debuggable, as each path had clear responsibilities.

## Context Management and Conversation History

One of the most significant LLMOps challenges the team encountered involved finding the right balance between providing sufficient context for informed decision-making and avoiding information overload that could confuse the model. The initial impulse was to give the agent access to extensive data from both Slack and Linear, with tools to search conversation history, linear issues, projects, and other entities.

However, even with a limited tool set, this abundance of data frequently sent the agent down incorrect paths. A specific example involved providing a tool for searching Slack conversation history. The team instructed the agent that when invoked from within Slack, it should check conversation history to understand what had been discussed before responding. While the agent followed this guidance approximately 90% of the time, about one in ten requests would result in the agent reading only the immediate message and making a decision without consulting history.

The breakthrough came from analyzing actual user behavior. The team observed that even in lengthy conversations, most user requests were relatively scoped and localized in nature. This insight led to a elegant solution: provide approximately 10 messages of context upfront, allowing the agent to behave as if it were the "11th message in a conversation." This approach essentially eliminated the issue, as the agent rarely needed to invoke the conversation history search tool. The tool remained available for edge cases requiring full conversation context, but the vast majority of requests were handled successfully with just the local context window.

Despite this localized approach, maintaining conversation continuity remained important. If a user mentioned Linear at the beginning of a thread, had a brief interaction, then continued the conversation and invoked Linear again later, the agent needed to maintain awareness of the earlier interaction. The solution involved carrying forward conversation history as if the agent had been observing the entire thread, ready to respond when invoked again.

The team also made deliberate decisions about what minimal contextual state to provide. Slack channels in Linear's ecosystem can be synced to specific entities like issues, projects, or initiatives. Rather than making the LLM discover these relationships, the team provided the ID of whatever entity the Slack thread was associated with. This simple piece of context enabled the LLM to make informed decisions when calling tools for data aggregation and research, as substantial detail can be inferred from knowing the parent entity context.

## Issue Creation: Specialization and Scope

The issue creation path received particular attention and refinement, as it represented one of the most common use cases for the Slack agent. The team made the prompt highly opinionated and specific around this key action, stripping out context irrelevant to issue creation. This process scoping significantly improved behavior.

An interesting design decision involved user confirmation workflows. Initially, the team assumed users would want to confirm issue details before creation, ensuring correctness. However, internal user feedback revealed a different preference: users didn't want extended back-and-forth conversations with the agent. They preferred the agent to make a first attempt at issue creation, after which they could manually refine details in the Linear interface. This approach proved successful because the agent generally got major details correct and excelled at tasks users found tedious, like summarizing thread content for issue titles and descriptions. Users found it acceptable to manually adjust details like priority or assignee after creation, especially given the time saved on summarization.

## Division of Labor: LLM vs. Programmatic Logic

A critical insight that emerged from the project concerns determining appropriate boundaries between what the LLM should handle and what should be managed programmatically. The team found themselves spending considerable effort coaxing the AI to understand complex requirements and produce correctly formatted output. The lesson learned was to "do all the hard work for the LLM and let it do what it's good at."

This manifested in extensive pre- and post-processing of data. For tools with complex schemas, the team found the LLM provided poor input or failed to interpret requirements correctly. Rather than continuing to refine prompts to handle this complexity, they restructured data flows to simplify what the LLM needed to handle.

A compelling example involved default team selection for new issues. When a user creates an issue from a Slack thread attached to a project, the system needs to determine the appropriate team. The team's initial approach was to instruct the LLM with detailed logic: look at the project, examine associated teams, identify teams the requesting user belongs to, and if multiple matches exist, select the team with the most issues. This resulted in cascading tool calls as the LLM attempted to gather and process this information. While the LLM might get it right 99% of the time, that 1% where it selected an arbitrary team could trigger alerts to the wrong team and create confusion.

The solution was straightforward: handle this business logic programmatically. The team instructed the LLM to only fill in fields it could be certain about or that required its generative capabilities (titles, descriptions, summaries). Very specific business logic that doesn't change should be handled with deterministic code. This division of labor proved faster, more reliable, and easier to maintain.

Similarly, the team stopped fighting the LLM to follow specific formatting rules. Instructions like "produce a bulleted list except when there's only one item, then use a sentence" created unnecessary complexity and inconsistency. Instead, they had the LLM output structured data (like an array of ideas) and handled formatting programmatically. This approach eliminated formatting headaches and improved response speed.

## Ongoing Challenges and Future Considerations

The presentation acknowledges that this remains an area of ongoing exploration and refinement. Several open questions reflect the challenges of operating LLM agents in production environments:

When should additional data sources be incorporated? For example, enabling web research to help assemble PRDs could be valuable, but what implications does this have for agent behavior and response latency? In a platform like Slack where users expect fast responses, how do you introduce potentially slower, more thorough research capabilities without degrading user experience?

How should the system balance very fast responses versus more complex agentic workflows? Traditional conversational AI in chat platforms operates with the expectation of near-immediate responses. More sophisticated agentic patterns involving planning, tool orchestration, and iterative refinement take longer. If such workflows are introduced into Slack, how can they be presented elegantly without forcing users to leave Slack to monitor progress?

The challenge of presentation in constrained environments emerges as a recurring theme. Slack's interface limitations mean the team cannot simply replicate Linear's native interface for displaying agent progress and results. Finding ways to keep users informed about agent actions without imposing extra burden or requiring context switching to other tools represents an ongoing design challenge.

## Critical Assessment and LLMOps Insights

This case study provides valuable insights into practical LLM deployment, though it's worth noting that specific metrics around accuracy improvements, latency reductions, or user satisfaction are not provided. The claims about improved performance are largely qualitative, based on internal observation and user feedback rather than systematic measurement. This is understandable for an experimental project but limits our ability to fully assess the magnitude of improvements achieved.

The approach taken demonstrates several LLMOps best practices that are particularly relevant for production deployments:

**Early intent classification** to route requests to specialized subsystems represents a form of mixture-of-experts pattern at the application level. This is more maintainable and performant than trying to build a single omniscient agent, though it does require accurately classifying intents at the entry point.

**Aggressive context pruning** based on actual user behavior analysis proved more effective than providing comprehensive context. This challenges the assumption that more context is always better, highlighting the importance of empirical observation over theoretical completeness.

**Clear delineation between generative and deterministic tasks** represents mature thinking about LLM capabilities. The team recognized that LLMs excel at open-ended generation (summaries, titles, descriptions) but struggle with complex business logic that has deterministic correct answers. Attempting to encode such logic in prompts is fragile and slower than programmatic implementation.

**Iterative refinement based on user feedback** shaped major design decisions, like eliminating confirmation steps. Building experimental features with internal users allowed rapid iteration based on real usage patterns rather than assumptions.

**Pre- and post-processing as first-class concerns** reflects an understanding that the LLM is one component in a larger system. Rather than trying to make the LLM handle everything, strategically placing logic before and after LLM invocations can dramatically simplify prompts and improve reliability.

The presentation's candid discussion of failures and iterations provides valuable learning. The 90% success rate on using conversation history tools might seem high, but in production the 10% failure rate is unacceptable. Similarly, the 99% accuracy on team selection sounds good until you consider the impact of that 1% on user trust and workflow disruption.

One area not deeply explored is how the team handles prompt versioning, evaluation, and monitoring in production. While the talk describes the evolution of their approach, it doesn't detail how they test prompt changes, measure degradation, or roll back problematic updates. These operational concerns are critical for production LLM systems but aren't addressed in the presentation.

The choice to build an experimental feature in Slack before potentially bringing similar capabilities into Linear's native product represents an interesting strategy. Slack provides a constrained environment that forces clarity around essential functionality while offering access to where users already work. Lessons learned in this constrained environment can inform more sophisticated implementations in Linear's own product where fewer platform limitations exist.

Overall, this case study exemplifies thoughtful, iterative development of production LLM features with clear attention to user experience, system reliability, and maintainability. The willingness to use programmatic logic where appropriate rather than forcing the LLM to handle everything demonstrates engineering maturity. However, the experimental nature of the project means some production concerns like comprehensive evaluation frameworks, monitoring, and systematic performance measurement remain to be fully addressed as the feature potentially moves toward broader release.