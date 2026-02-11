---
title: "Building a Reliable AI Quote Generation Assistant with LangGraph"
slug: "building-a-reliable-ai-quote-generation-assistant-with-langgraph"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "677662cf0bb0991a849432e0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:51:16.317Z"
  createdOn: "2025-01-02T09:56:31.243Z"
llmopsTags:
  - "chatbot"
  - "multi-modality"
  - "unstructured-data"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "langchain"
  - "fastapi"
  - "monitoring"
  - "documentation"
  - "openai"
industryTags: "finance"
company: "Tradestack"
summary: "Tradestack developed an AI-powered WhatsApp assistant to automate quote generation for trades businesses, reducing quote creation time from 3.5-10 hours to under 15 minutes. Using LangGraph Cloud, they built and launched their MVP in 6 weeks, improving end-to-end performance from 36% to 85% through rapid iteration and multimodal input processing. The system incorporated sophisticated agent architectures, human-in-the-loop interventions, and robust evaluation frameworks to ensure reliability and accuracy."
link: "https://blog.langchain.dev/customers-tradestack/"
year: 2024
seo:
  title: "Tradestack: Building a Reliable AI Quote Generation Assistant with LangGraph - ZenML LLMOps Database"
  description: "Tradestack developed an AI-powered WhatsApp assistant to automate quote generation for trades businesses, reducing quote creation time from 3.5-10 hours to under 15 minutes. Using LangGraph Cloud, they built and launched their MVP in 6 weeks, improving end-to-end performance from 36% to 85% through rapid iteration and multimodal input processing. The system incorporated sophisticated agent architectures, human-in-the-loop interventions, and robust evaluation frameworks to ensure reliability and accuracy."
  canonical: "https://www.zenml.io/llmops-database/building-a-reliable-ai-quote-generation-assistant-with-langgraph"
  ogTitle: "Tradestack: Building a Reliable AI Quote Generation Assistant with LangGraph - ZenML LLMOps Database"
  ogDescription: "Tradestack developed an AI-powered WhatsApp assistant to automate quote generation for trades businesses, reducing quote creation time from 3.5-10 hours to under 15 minutes. Using LangGraph Cloud, they built and launched their MVP in 6 weeks, improving end-to-end performance from 36% to 85% through rapid iteration and multimodal input processing. The system incorporated sophisticated agent architectures, human-in-the-loop interventions, and robust evaluation frameworks to ensure reliability and accuracy."
---

## Overview

Tradestack is a UK-based startup focused on improving operational efficiency for trades businesses in the construction and real estate sectors. The company identified that back-office tasks, particularly creating project quotes, consume significant time for tradespeople. Their solution was to develop an AI-powered assistant capable of reducing quote generation time from hours to minutes. This case study documents how they built and deployed their MVP using LangGraph Cloud, achieving notable performance improvements and user adoption within a compressed timeline.

It's worth noting that this case study originates from LangChain's blog, so the framing naturally emphasizes the benefits of the LangGraph ecosystem. While the reported results are impressive, readers should consider that this represents the vendor's perspective on a customer success story.

## The Problem Domain

Creating quotations for trades businesses involves multiple complex steps: analyzing floor plans, reviewing project images, estimating labor effort, calculating material prices, and producing professional client-facing documents. For painting and decorating projects specifically, Tradestack reported that this process typically takes between 3.5 to 10 hours per quote. The company's ambitious goal was to compress this timeline to under 15 minutes, representing a potential productivity improvement of 14x to 40x.

The challenge for building an AI solution in this space was handling the diversity and ambiguity inherent in real-world user inputs. Tradespeople needed to communicate via various modalities—voice messages, text, images, and documents—and the system needed to reliably process these inputs while producing accurate, personalized outputs.

## Technical Architecture and LLMOps Approach

### Choosing the Interface: WhatsApp Integration

Tradestack made a pragmatic decision to use WhatsApp as their primary user interface, recognizing its widespread adoption particularly among non-tech-savvy users in the trades industry. This decision had important LLMOps implications: the system needed to handle asynchronous messaging patterns, manage conversation state across sessions, and deal with the inherent constraints of a messaging platform.

### Agentic Architecture with LangGraph

The core of Tradestack's solution was built using LangGraph, which allowed them to design their cognitive architecture using graphs, nodes, and edges while maintaining a shared state that each node could read from and write to. This approach enabled them to experiment with different cognitive architectures and levels of guidance for the AI system.

The team started with LangGraph Templates, specifically adopting a hierarchical multi-agent system architecture. This featured a supervisor node responsible for expanding user queries and creating execution plans based on task goals. The graph-based structure gave them the flexibility to handle multiple input modalities while maintaining reliability in the output quality.

A key innovation was their approach to "personalized reasoning"—rather than just personalizing content generation, they tailored the reasoning process itself to user preferences. Using configuration variables, they customized instructions and pathways within their cognitive architecture, selecting appropriate sub-graphs depending on specific use cases. This architectural flexibility allowed them to balance input modality diversity with output reliability.

### Rapid Prototyping with LangGraph Studio

One of the significant LLMOps efficiencies Tradestack achieved was through the use of LangGraph Studio, a visual interface for agent interactions. By providing internal stakeholders access to this tool, non-technical team members could interact with the assistant, identify flaws, and record feedback in parallel with ongoing development. The team reported that this approach saved approximately two weeks of internal testing time—a substantial saving for a six-week MVP timeline.

This represents an important LLMOps pattern: enabling cross-functional teams to participate in AI system development and testing without requiring engineering resources for every interaction. The visual nature of the studio made the agent's decision-making process more transparent and debuggable.

### Deployment and Infrastructure

Tradestack deployed their MVP using LangGraph Cloud, which handled deployment, monitoring, and revision management. For a lean startup team, this infrastructure abstraction was crucial—it allowed them to focus on refining their AI agent rather than managing servers, scaling, and deployment pipelines.

To handle WhatsApp-specific challenges, Tradestack built custom middleware. They utilized LangGraph's "interrupt" feature to manage the asynchronous nature of messaging and implemented intelligent handling for "double-texting" (when users send multiple messages before receiving a response) and message queue management. These are practical LLMOps considerations that emerge when deploying LLM-powered systems in real-world messaging contexts.

### Observability and Tracing with LangSmith

LangSmith tracing was integrated directly into Tradestack's workflow, providing visibility into each execution run. This observability was essential for understanding system behavior, debugging issues, and evaluating performance. The case study emphasizes that this integration made it easy to review and evaluate runs, though specific details about their tracing setup and metrics are not provided.

### Evaluation and Model Selection

A particularly noteworthy aspect of Tradestack's LLMOps approach was their systematic evaluation methodology. They set up both node-level and end-to-end evaluations in LangSmith, allowing them to experiment with different models for specific components of their system.

One concrete finding from their evaluation work: they discovered that gpt-4-0125-preview performed better than gpt-4o for their planning node. This kind of node-level model optimization is an important LLMOps practice—rather than assuming the newest or most capable model is best for every task, they empirically tested alternatives and made data-driven decisions.

The reported improvement in end-to-end performance from 36% to 85% suggests significant iteration and optimization, though the case study doesn't specify exactly what metrics constitute "end-to-end performance" or how these percentages were calculated.

### Streaming and User Experience

Tradestack implemented thoughtful streaming strategies to create a good user experience on WhatsApp. Rather than streaming all intermediate steps to users (which could be overwhelming), they used LangGraph's flexible streaming options to selectively display key messages from chosen nodes. An aggregator node combined outputs from various intermediate steps, ensuring consistent tone of voice across communications.

This demonstrates an important LLMOps consideration: the technical capability to stream responses doesn't mean all responses should be streamed to end users. Thoughtful UX design requires controlling information flow based on user needs and context.

### Human-in-the-Loop Interventions

Tradestack implemented human-in-the-loop capabilities for handling edge cases. When the system encountered situations it couldn't handle reliably—such as users requesting materials unavailable in the UK—it would trigger manual intervention. Team members could then step in via Slack or directly through LangGraph Studio to adjust the conversation.

This hybrid approach acknowledges the limitations of fully autonomous AI systems and provides a practical fallback mechanism. It's a realistic pattern for production LLM deployments where edge cases are inevitable and graceful degradation to human intervention is preferable to system failure.

## Results and Performance

According to the case study, Tradestack achieved the following outcomes:

- Built and launched an MVP in 6 weeks
- Deployed to a community of 28,000+ users
- Acquired their first paying customers
- Improved end-to-end performance from 36% to 85%

The six-week timeline is notable, though it should be contextualized by the team's existing familiarity with the LangChain ecosystem and the use of templates as starting points. The performance improvement is substantial, though as noted earlier, the specific definition of "end-to-end performance" is not detailed.

## Future Directions

Tradestack indicated plans to deepen their integration with LangSmith for fine-tuning datasets, explore voice agent UX, develop agent training modes, and further integrate with external tools. These directions suggest ongoing investment in improving their AI system's capabilities and the LLMOps practices supporting it.

## Critical Assessment

While this case study demonstrates a successful rapid deployment of an LLM-powered application, readers should note several caveats:

- The case study comes from LangChain's blog, representing the vendor's perspective
- Specific technical details about evaluation metrics and methodologies are limited
- Long-term reliability and user retention data are not provided
- The 28,000+ user community figure may represent access rather than active usage

Despite these considerations, the case study provides valuable insights into practical LLMOps patterns for building agentic systems, including multimodal input handling, hierarchical agent architectures, node-level model optimization, and human-in-the-loop fallbacks.