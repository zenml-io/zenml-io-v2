---
title: "Building a Digital Workforce with Multi-Agent Systems and User-Centric Design"
slug: "building-a-digital-workforce-with-multi-agent-systems-and-user-centric-design"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68342d4009a70be122c9f8a9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-01T11:07:45.646Z"
  lastUpdated: "2025-11-26T11:40:50.684Z"
  createdOn: "2025-05-26T08:58:40.239Z"
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "document-processing"
  - "code-generation"
  - "structured-output"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "fallback-strategies"
  - "prompt-engineering"
  - "system-prompts"
  - "error-handling"
  - "langchain"
  - "monitoring"
  - "orchestration"
  - "api-gateway"
  - "scalability"
  - "reliability"
  - "guardrails"
  - "anthropic"
industryTags: "tech"
company: "Monday.com"
summary: "Monday.com built a digital workforce of AI agents to handle their billion annual work tasks, focusing on user experience and trust over pure automation. They developed a multi-agent system using LangGraph that emphasizes user control, preview capabilities, and explainability, achieving 100% month-over-month growth in AI usage. The system includes specialized agents for data retrieval, board actions, and answer composition, with robust fallback mechanisms and evaluation frameworks to handle the 99% of user interactions they can't initially predict."
link: "https://www.youtube.com/watch?v=P8ewpJrZVwo"
year: 2025
seo:
  title: "Monday.com: Building a Digital Workforce with Multi-Agent Systems and User-Centric Design - ZenML LLMOps Database"
  description: "Monday.com built a digital workforce of AI agents to handle their billion annual work tasks, focusing on user experience and trust over pure automation. They developed a multi-agent system using LangGraph that emphasizes user control, preview capabilities, and explainability, achieving 100% month-over-month growth in AI usage. The system includes specialized agents for data retrieval, board actions, and answer composition, with robust fallback mechanisms and evaluation frameworks to handle the 99% of user interactions they can't initially predict."
  canonical: "https://www.zenml.io/llmops-database/building-a-digital-workforce-with-multi-agent-systems-and-user-centric-design"
  ogTitle: "Monday.com: Building a Digital Workforce with Multi-Agent Systems and User-Centric Design - ZenML LLMOps Database"
  ogDescription: "Monday.com built a digital workforce of AI agents to handle their billion annual work tasks, focusing on user experience and trust over pure automation. They developed a multi-agent system using LangGraph that emphasizes user control, preview capabilities, and explainability, achieving 100% month-over-month growth in AI usage. The system includes specialized agents for data retrieval, board actions, and answer composition, with robust fallback mechanisms and evaluation frameworks to handle the 99% of user interactions they can't initially predict."
---

## Overview

Monday.com, a publicly traded work operating system company that recently crossed $1 billion ARR, presented their journey building a "digital workforce" of AI agents. The presentation was delivered by Assaf, the Head of AI at Monday.com, who shared lessons learned from deploying LLM-powered agents in production at scale. Monday.com processes approximately 1 billion work tasks per year across their platform, representing a significant opportunity for AI automation. They launched their first AI feature in September 2024 and have since expanded to a full digital workforce offering.

The core premise is that Monday.com's existing platform—where users already assign people to tasks—provides a natural entry point for AI agents. Rather than requiring users to learn new workflows, agents can simply be assigned to tasks just like human workers. This seamless integration strategy reportedly contributed to significant adoption growth, with the company claiming 100% month-over-month growth in AI usage since launch.

## Technical Architecture

Monday.com built their entire agent ecosystem on LangGraph and LangSmith, having tested various frameworks before settling on this stack. The speaker emphasized that LangGraph struck the right balance between being opinionated enough to handle complex infrastructure concerns (interrupts, checkpoints, persistent memory, human-in-the-loop workflows) while remaining customizable for their specific needs.

Their architecture centers around several key components:

- **LangGraph Engine**: The core orchestration layer for all agent workflows
- **LangSmith**: Used for monitoring and observability across the system
- **AI Blocks**: Internal AI actions developed specifically for Monday.com's domain
- **Custom Evaluation Framework**: Built in-house because they believe evaluation is one of the most critical aspects of AI development
- **AI Gateway**: Controls and validates inputs and outputs throughout the system

The first digital worker they released was called the "Monday Expert," which uses a supervisor methodology. This multi-agent system comprises four distinct agents working together:

- **Supervisor Agent**: Orchestrates the overall workflow and delegates to specialized agents
- **Data Retrieval Agent**: Responsible for fetching data across Monday.com, including knowledge bases, board data, and web search results
- **Board Actions Agent**: Executes actual modifications on Monday.com boards
- **Answer Composer**: Takes into account user context, conversation history, tone of voice, and other parameters to compose final responses

A notable innovation is their "undo" tool, which gives the supervisor the ability to dynamically reverse actions based on user feedback. This represents a thoughtful approach to error recovery in production AI systems.

## Key Production Lessons

### User Control and Autonomy

One of the most significant insights shared was that full autonomy is often not what users want. Every company and user has a different risk appetite, and giving users control over their agents significantly increased adoption. Rather than pushing for maximum automation, they found success in letting users decide their comfort level with agent autonomy.

### Entry Points and Integration

For established products, the speaker strongly advised against rebuilding user experiences from scratch. Instead, they recommend finding ways to integrate AI capabilities into existing workflows. Since Monday.com users already assign people to tasks, extending this to assigning AI agents felt natural and required no new habits.

### Preview Mode for Production Actions

A critical UX lesson came from observing user behavior: when users could directly modify production data (Monday.com boards), they would freeze at the moment of commitment. The speaker drew an analogy to Cursor AI, noting that while the technology could push code directly to production, few developers would use it that way. By introducing a preview mode that shows users what changes will be made before execution, adoption increased dramatically. This mirrors the concept of staging environments in traditional software development.

### Explainability as a Learning Tool

The presentation pushed back against treating explainability as merely a "nice to have." Instead, it should be viewed as a mechanism for users to learn how to improve their AI interactions over time. When users understand why certain outputs were generated, they can modify their inputs to achieve better outcomes.

## Evaluation and Guardrails

The speaker emphasized that evaluations represent a company's intellectual property. While models and technology will change dramatically over the coming years, robust evaluation frameworks provide lasting competitive advantage and enable faster iteration.

For guardrails, they strongly recommend building them outside the LLM rather than relying on techniques like LLM-as-a-judge. They cited Cursor AI's 25-run limit on vibe coding as an example of an effective external guardrail—it stops execution regardless of whether the AI is running successfully. This external control provides more predictable behavior than in-context guardrails.

## The Compound Hallucination Problem

A particularly valuable technical insight was the concept of "compound hallucination" in multi-agent systems. While it seems intuitive that breaking complex tasks into specialized sub-agents would improve performance, there's a mathematical ceiling. If each agent operates at 90% accuracy, chaining four agents together yields only about 65% end-to-end accuracy (0.9^4 ≈ 0.656). This creates a delicate balance between specialization benefits and compounding error rates. The speaker noted there's no universal rule of thumb—teams must iterate based on their specific use case.

## Fallback Strategy

When building conversational agents, they assume 99% of user interactions will be novel cases not explicitly handled. Rather than trying to predict all possible inputs, they started by designing robust fallback behavior. For example, if a user requests an action the system doesn't support, it searches the knowledge base and provides instructions for how users can accomplish the task manually. This ensures the system remains useful even at the edges of its capabilities.

## Future Vision: Dynamic Orchestration

The presentation concluded with Monday.com's vision for dynamic agent orchestration. They described the challenge of building complex workflows (using earnings report preparation as an example) that only run periodically. By the next quarterly run, AI capabilities have changed so significantly that the workflow needs rebuilding.

Their proposed solution is a finite set of specialized agents that can be dynamically orchestrated to handle infinite tasks—mirroring how human teams operate. They envision systems where dynamic workflows are created on-the-fly with dynamic edges, rules, and agent selection, then dissolved after completion. This represents a shift from static workflow design to runtime orchestration.

## Scale and Performance

The system now processes millions of requests per month using LangGraph, which has proven scalable for their needs. They're opening their marketplace of agents to external developers, aiming to tackle the 1 billion annual tasks on their platform.

## Critical Assessment

While the presentation provides valuable production insights, some claims warrant scrutiny. The reported "100% month-over-month" growth, while impressive, needs context—early-stage growth rates from a small base are easier to achieve. The specific adoption improvements from features like preview mode weren't quantified, making it difficult to assess their actual impact.

The technical architecture described appears sound, leveraging established tools like LangGraph and LangSmith rather than building everything from scratch. Their emphasis on evaluation, guardrails, and human-in-the-loop workflows reflects mature thinking about production AI systems. The compound hallucination concept is mathematically valid and represents a practical consideration often overlooked in multi-agent system design discussions.