---
title: "Newsletter Edition #16 - The future of LLMOps @ ZenML (Your Voice Needed)"
slug: "newsletter-edition-16-future-of-llmops-at-zenml"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6867d78284f1f59807b63410"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-02-03T10:39:58.187Z"
  createdOn: "2025-07-04T13:30:42.903Z"
author: "hamza-tahir"
category: "newsletters"
tags:
  - "agents"
  - "llmops"
  - "bigger-picture"
  - "latest-news"
date: "2025-07-04T00:00:00.000Z"
readingTime: 3 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c1e7c6ba/6981cf3948be69340f5c1478_6981ce8f238b4775b0a81b38_zenml-newsletter-16_2.avif"
seo:
  title: "Newsletter Edition #16 - The future of LLMOps @ ZenML (Your Voice Needed) - ZenML Blog"
  description: "We're expanding ZenML beyond its original MLOps focus into the LLMOps space, recognizing the same fragmentation patterns that once plagued traditional machine learning operations. We're developing three core capabilities: native LLM components that provide unified APIs and management across providers like OpenAI and Anthropic, along with standardized prompt versioning and evaluation tools; applying established MLOps principles to agent development to bring systematic versioning, evaluation, and observability to what's currently a \"build it and pray\" approach; and enhancing orchestration to support both LLM framework integration and direct LLM calls within workflows. Central to our philosophy is the principle of starting simple before going autonomous, emphasizing controlled workflows over fully autonomous agents for enterprise production environments, and we're actively seeking community input through a survey to guide our development priorities, recognizing that today's infrastructure decisions will determine which organizations can successfully scale AI deployment versus remaining stuck in pilot phases."
  canonical: "https://www.zenml.io/blog/newsletter-edition-16-future-of-llmops-at-zenml"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c1e7c6ba/6981cf3948be69340f5c1478_6981ce8f238b4775b0a81b38_zenml-newsletter-16_2.avif"
  ogTitle: "Newsletter Edition #16 - The future of LLMOps @ ZenML (Your Voice Needed) - ZenML Blog"
  ogDescription: "We're expanding ZenML beyond its original MLOps focus into the LLMOps space, recognizing the same fragmentation patterns that once plagued traditional machine learning operations. We're developing three core capabilities: native LLM components that provide unified APIs and management across providers like OpenAI and Anthropic, along with standardized prompt versioning and evaluation tools; applying established MLOps principles to agent development to bring systematic versioning, evaluation, and observability to what's currently a \"build it and pray\" approach; and enhancing orchestration to support both LLM framework integration and direct LLM calls within workflows. Central to our philosophy is the principle of starting simple before going autonomous, emphasizing controlled workflows over fully autonomous agents for enterprise production environments, and we're actively seeking community input through a survey to guide our development priorities, recognizing that today's infrastructure decisions will determine which organizations can successfully scale AI deployment versus remaining stuck in pilot phases."
---

This edition is shorter and more focused—we want to talk about the future of ZenML and, more importantly, **how you can help shape it**. With almost **5,000** of you subscribed (still can't believe that number!), your input matters more than ever.

** 📿 The Pattern Repeats Itself**

When we wrote the first lines of ZenML four years ago, our goal wasn't to build yet another MLOps tool that solved one narrow problem. We wanted to introduce a **standardized process** for shipping ML workloads to production.

The idea was simple: there are so many brilliant platforms and tools out there—how do we combine them and get the best of all worlds in one coherent stack?

This led us to create the concept of [components and stacks](https://docs.zenml.io/stack-components/component-guide). Components are configurable entities that define *how* a workload (a pipeline) gets executed. We wanted to disconnect business logic from infrastructure logic, making ML development truly portable and reproducible.

This model has worked well. Companies from JetBrains to [Adeo Leroy Merlin](https://zenml.io/case-study/adeo-leroy-merlin) now use these abstractions for standardized ML development at [massive scale](https://www.zenml.io/blog/scaling-zenml-200x-performance-fastapi-database-v0830).

**The last two years have seen LLM-powered applications dominate the space. This year—the so-called "year of agents"—is gripping everyone's attention. And we're seeing the The last two years have seen LLM-powered applications dominate the space. This year—the so-called "year of agents"—is gripping everyone's attention. And we're seeing the exact same patterns unfold that we witnessed in early MLOps:exact same patterns unfold that we witnessed in early MLOps: unfold that we witnessed in early MLOps:☯The last two years have seen LLM-powered applications dominate the space. This year—the so-called "year of agents"—is gripping everyone's attention. And we're seeing the The last two years have seen LLM-powered applications dominate the space. This year—the so-called "year of agents"—is gripping everyone's attention. And we're seeing the exact same patterns unfold that we witnessed in early MLOps:exact same patterns unfold that we witnessed in early MLOps: unfold that we witnessed in early MLOps:☯**

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5b6d20c2/6867d7e95e34f697d7be792b_MLOps_AgentOps_Comparison-newsletter.jpg" alt="__wf_reserved_inherit" />
</figure>

Look familiar?

After watching agents struggle and fail in production for a few years, we're confident enough to apply what we learned in MLOps to the LLMOps/AgentOps space. There are enough scattered practices (check out our [LLMOps Database](https://www.zenml.io/llmops-database) if you haven't) that we can start unifying them under one umbrella.

** 📺 Our Three-Pillar Vision**

Based on extensive feedback from customers doing some really cool stuff, we're developing ZenML around three core pillars:

**1. LLM Abstractions as First-Class Citizens**

We're building native **LLM stack components** that bring the same standardization to LLM development that we brought to traditional ML:

<ul><li><strong>LLM Provider Component</strong>: Unified API management across OpenAI, Anthropic, Google, with automatic cost tracking, fallback models, and rate limiting</li><li><strong>Prompt Manager Component</strong>: Version-controlled prompt templates with Git integration and Jinja2 templating</li><li><strong>LLM Evaluator Component</strong>: Standardized interface with LLM-as-judge capabilities for comprehensive model comparison</li><li><strong>LLM Tracer</strong>: Deep observability for tracing every LLM call and agent session (powered by tools such as OpenTelemetry)</li></ul>

The beauty? These work alongside your existing MLOps stack. Same patterns, expanded capabilities.

*The following code snippets are just indicators of what the interface(s) might look like. Nothing's written in stone yet and this is certainly work in progress...*

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/26d6f5de/6867d800d1c1db3d977f518e_CleanShot_202025-07-02_20at_2016.51.40.png" alt="" />
</figure>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/0a0dc7c3/6867d801d1c1db3d977f5197_CleanShot_202025-07-02_20at_2016.52.06.png" alt="" />
</figure>

Note that here we are invoking an “agent” from within ZenML — a pattern we expect to see a lot more often (batch evals, invoking in production, iterating while developing etc).

**2. MLOps Principles for Agentic Development**

Having an MLOps flywheel while developing an agent is something that [excites us here at ZenML](https://www.linkedin.com/feed/update/urn:li:activity:7346114043243302913/). Picture a ZenML pipeline that orchestrates your agent (LangGraph, CrewAI, whatever you use) while automatically:

<ul><li>Setting up tracing observability through our stack components</li><li>Versioning prompts as artifacts with full lineage tracking</li><li>Running systematic evaluations after each agent execution</li><li>Creating feedback loops for continuous improvement</li><li>Providing unified visibility across traditional ML and agent workloads</li></ul>

This is our vision of the complete agent development lifecycle—not the current "build it and pray" approach.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8ceca900/6867d801d1c1db3d977f519a_CleanShot_202025-07-02_20at_2016.54.21.png" alt="" />
</figure>

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cf9059dc/6867d801d1c1db3d977f5194_CleanShot_202025-07-02_20at_2016.54.30.png" alt="" />
</figure>

**3. Faster, More Reliable Orchestration**

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/799d5e00/6867d801d1c1db3d977f51a6_CleanShot_202025-07-02_20at_2016.55.22.png" alt="" />
</figure>

As stated above, there will be cases where you might want to invoke agents within a ZenML pipeline. However, there are also other cases where it might make sense to bake the LLM calls directly into the workflows directly. As [we discussed last month](https://www.zenml.io/blog/newsletter-edition-15---why-you-dont-need-an-agent-but-you-might-need-a-workflow), we've learned that **workflows are often better than fully autonomous agents** for production use cases. More autonomy means more entropy, which enterprise applications can't tolerate.

*Read about a concrete example with the *[Steerable Deep Research](https://www.zenml.io/blog/steerable-deep-research-building-production-ready-agentic-workflows-with-controlled-autonomy)* product that we recently wrote about*

We're building orchestration that's lightning-fast for agent workloads. We already have a PR open for [Modal orchestration](https://github.com/zenml-io/zenml/pull/3733) that executes agents at scale with proper resource management and monitoring.

The insight from our [Paris keynote](https://www.youtube.com/watch?v=2OQxpmqIgNY) holds: "Start simple before you go full autonomous. Never go full autonomous." Our [200x performance improvements](https://www.zenml.io/blog/scaling-zenml-200x-performance-fastapi-database-v0830) unlock workflow complexity that simply wasn't feasible before, making these orchestration patterns practical at enterprise scale.

Moving, we expect ZenML to support both cases, i.e., integrating into LLM orchestration frameworks like Pydantic AI and Langgraph, and also integrating LLM provider component to invoke LLMs directly in the workflow.

** 🙏 We Need Your Input**

This is where you come in. We're not building this in isolation—we want to solve real problems you're facing today.

Whether you're:

 

<ul><li>Struggling with agent evaluation in production</li><li>Managing multiple LLM providers and their costs</li><li>Trying to apply MLOps discipline to LLM workflows</li><li>Building hybrid applications that combine traditional ML with agents</li><li>Or just curious about where this is all heading</li></ul>

**We want to hear from you.**

[Take our 5-minute survey](https://tally.so/r/mRQ1Lj) to help shape ZenML's LLMOps direction. Your feedback will directly influence what we build first and how we prioritize features. You will also be placed in a lucky draw **to win 3 months of ZenML Pro for free!**

[Take me to the survey!](https://tally.so/r/mRQ1Lj)

The infrastructure we build today determines which organizations can deploy AI at scale versus which ones stay stuck in pilot mode. That's the opportunity we're all working toward.

Until next time,

Hamza