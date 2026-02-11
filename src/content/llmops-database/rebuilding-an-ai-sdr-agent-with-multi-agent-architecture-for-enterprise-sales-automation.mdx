---
title: "Rebuilding an AI SDR Agent with Multi-Agent Architecture for Enterprise Sales Automation"
slug: "rebuilding-an-ai-sdr-agent-with-multi-agent-architecture-for-enterprise-sales-automation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68342dac50eb711fe85e8d46"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:09:49.788Z"
  createdOn: "2025-05-26T09:00:28.237Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "agent-based"
  - "few-shot"
  - "system-prompts"
  - "langchain"
  - "monitoring"
  - "api-gateway"
  - "databases"
  - "fastapi"
  - "postgresql"
  - "openai"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "11x"
summary: "11x rebuilt their AI Sales Development Representative (SDR) product Alice from scratch in just 3 months, transitioning from a basic campaign creation tool to a sophisticated multi-agent system capable of autonomous lead sourcing, research, and email personalization. The team experimented with three different agent architectures - React, workflow-based, and multi-agent systems - ultimately settling on a hierarchical multi-agent approach with specialized sub-agents for different tasks. The rebuilt system now processes millions of leads and messages with a 2% reply rate comparable to human SDRs, demonstrating the evolution from simple AI tools to true digital workers in production sales environments."
link: "https://www.youtube.com/watch?v=fegwPmaAPQk"
year: 2025
seo:
  title: "11x: Rebuilding an AI SDR Agent with Multi-Agent Architecture for Enterprise Sales Automation - ZenML LLMOps Database"
  description: "11x rebuilt their AI Sales Development Representative (SDR) product Alice from scratch in just 3 months, transitioning from a basic campaign creation tool to a sophisticated multi-agent system capable of autonomous lead sourcing, research, and email personalization. The team experimented with three different agent architectures - React, workflow-based, and multi-agent systems - ultimately settling on a hierarchical multi-agent approach with specialized sub-agents for different tasks. The rebuilt system now processes millions of leads and messages with a 2% reply rate comparable to human SDRs, demonstrating the evolution from simple AI tools to true digital workers in production sales environments."
  canonical: "https://www.zenml.io/llmops-database/rebuilding-an-ai-sdr-agent-with-multi-agent-architecture-for-enterprise-sales-automation"
  ogTitle: "11x: Rebuilding an AI SDR Agent with Multi-Agent Architecture for Enterprise Sales Automation - ZenML LLMOps Database"
  ogDescription: "11x rebuilt their AI Sales Development Representative (SDR) product Alice from scratch in just 3 months, transitioning from a basic campaign creation tool to a sophisticated multi-agent system capable of autonomous lead sourcing, research, and email personalization. The team experimented with three different agent architectures - React, workflow-based, and multi-agent systems - ultimately settling on a hierarchical multi-agent approach with specialized sub-agents for different tasks. The rebuilt system now processes millions of leads and messages with a 2% reply rate comparable to human SDRs, demonstrating the evolution from simple AI tools to true digital workers in production sales environments."
---

## Overview

11x is a company building "digital workers"—autonomous AI agents designed to handle specific business functions. Their flagship product, Alice, is an AI Sales Development Representative (SDR) that automates lead sourcing, research, personalized email writing, and follow-up communications. This case study documents their journey rebuilding Alice from scratch, transitioning from a traditional multi-step workflow product to a truly agentic system. The presentation was delivered by Sherwood, a tech lead at 11x who leads engineering for Alice, alongside Keith, the head of growth and product manager for the project.

The rebuild took place during a turbulent period for the company—they had just announced their Series A, their Series B leaked shortly after, and they relocated from London to San Francisco. Despite this chaos, they chose to undertake a complete ground-up rebuild of their core product, driven by the conviction that agentic AI systems represented the future of their product category.

## The Problem with Alice 1.0

The original Alice product allowed users to create custom AI-powered outreach campaigns through a five-step process: defining an audience, describing an offer, constructing a sequence, tweaking AI-generated messaging, and launching the campaign. While commercially successful, the team identified several limitations that prevented Alice 1.0 from being considered a true "digital worker":

- Excessive button clicking and manual user interaction
- Significant manual input requirements, especially for describing offers
- Basic lead research without deep web scraping or analysis
- Uninspiring email personalization stemming from shallow research
- No automatic reply handling or question answering
- No self-learning or improvement over time

The team observed the rapid evolution of the AI industry throughout 2023-2024, including the release of GPT-4, Claude models, function calling APIs, and production-ready agent frameworks like LangGraph. The Replit agent particularly impressed them as a demonstration that truly powerful agentic products were ready for production deployment.

## Vision for Alice 2.0

The new vision centered on seven agentic capabilities that would transform Alice into a genuine digital worker:

- Chat-first interaction where users communicate with Alice as they would a human team member
- Knowledge base support for uploading internal documents, websites, and meeting recordings
- AI-powered lead sourcing that evaluates lead quality and fit rather than simple filter matching
- Deep research on every lead
- True personalization in emails based on that research
- Automatic inbound message handling with question answering and meeting booking
- Self-learning capabilities that optimize performance based on campaign insights

## Technical Approach and Key Decisions

The rebuild was aggressive, taking just three months from first commit to migrating the last business customer. The team started with only two engineers on the agent, later expanding the team. They had approximately 300 customers to migrate while their go-to-market team continued acquiring new users.

Three key architectural decisions shaped the project:

**Starting from scratch**: Rather than incrementally improving Alice 1.0, they created a new repository, new infrastructure, and a new team to avoid encumbering the new product with legacy constraints.

**Avoiding unnecessary risk**: Given the inherent uncertainty in unfamiliar technologies like agents and knowledge bases, they chose a "vanilla" tech stack for everything else to minimize compounding risk factors.

**Leveraging vendors aggressively**: To move quickly, they relied heavily on vendor solutions rather than building non-essential components in-house.

LangChain emerged as a critical partner. The team valued LangChain's position as an industry leader in AI development tools, their production-ready agent framework with cloud hosting and observability, TypeScript support (important for their TypeScript-based codebase), and exceptional customer support that felt like "an extension of our team." They use the full LangChain suite including LangGraph and LangSmith for observability.

## Agent Architecture Evolution

The team's journey through three different agent architectures provides valuable insights into production agent design:

### React Architecture

Their first attempt used the React (Reason and Act) agent pattern, based on research from Google in 2022. This architecture maintains reasoning traces in the conversation context and operates in a loop of reasoning, action (tool calls), and observation. Their implementation consisted of a single node with 10-20 attached tools covering various campaign creation tasks—fetching leads, inserting database entities, drafting emails, etc.

The React agent ran to completion for every user turn, providing natural flexibility for multi-turn conversations. Its primary strength was simplicity—the team never needed to revise the agent structure. It also handled arbitrary user inputs well, allowing users to reference earlier steps without confusing the agent.

However, significant problems emerged. With many attached tools, the agent struggled with tool selection and sequencing, leading to infinite loops where it repeatedly attempted tasks without success. These would eventually trigger recursion limit errors (described as "the agent equivalent of a stack overflow"). Additionally, output quality was mediocre—the audiences, sequences, and emails produced weren't impressive. The team hypothesized that a single agent with one set of prompts couldn't excel at any particular aspect of campaign creation.

### Workflow Architecture

Seeking to address React's limitations, the team moved to a workflow architecture—defined by Anthropic as "a system where LLMs and tools are orchestrated through predefined code paths." Unlike agents where the LLM decides orchestration, workflows use deterministic code paths with LLM calls embedded within them.

Their workflow implementation was considerably more complex: 15 nodes split across five stages corresponding to campaign creation steps. Unlike the React agent, this graph ran to completion once for the entire campaign creation process, using LangGraph's node interrupts feature to collect user input at specific points.

The workflow solved the React agent's problems: no more tool confusion (tools were replaced with specialized nodes), a clearly defined execution flow with a fixed number of steps eliminated infinite loops, and output quality improved significantly because the structured approach forced the agent through specific steps.

However, new issues emerged. The architecture was extremely complex, and the frontend campaign creation experience became tightly coupled to the agent's graph structure. Any changes to the user experience required corresponding changes to the agent architecture. More critically, the workflow couldn't support users jumping between steps—when paused at step three, users couldn't easily reference or modify step one.

### Multi-Agent Architecture

The breakthrough came from a LangChain blog post about building customer support agents with a multi-agent architecture. This hierarchical approach uses a supervisor agent that interacts with users and routes tasks to specialized sub-agents. Sub-agents fulfill tasks and escalate back to the supervisor upon completion.

Their final implementation features a supervisor node at the top of the graph with four specialized sub-agents: a researcher, a positioning report generator (determining how to position products/services for specific leads), a LinkedIn message writer, and an email writer. Audience creation was kept separate for unspecified reasons.

This architecture delivered "the best of both worlds"—the flexibility of React agents combined with the performance of workflows.

## Key Reflections on Agent Development

The presentation concluded with several hard-won insights applicable to production agent development:

**Simplicity is key**: While structure and scaffolding can provide short-term performance gains, they risk locking teams into counterproductive patterns over time.

**Model releases change everything**: Amjad from Replit shared that the Replit agent "wasn't really working until Sonnet 3.5 came out and then they dropped it in and everything was magic." New model capabilities can suddenly unlock previously impossible behaviors.

**Mental models matter**: Thinking of agents as user flows or directed graphs led to wrong architectural choices. Viewing the agent as a human coworker or team of coworkers proved more productive.

**Break big tasks into small tasks**: Campaign creation as a monolithic task was difficult, but decomposing it into smaller tasks like "write an email" made implementation tractable.

**Tools over skills**: Rather than making agents "smart" through extensive prompting, it's more effective to provide tools and explain their usage. This minimizes token usage and improves reliability. The team offers a framework distinguishing between tools (like a calculator) and skills (like mental arithmetic), recommending tools whenever possible.

**Don't forget prompt engineering**: Agents are fundamentally "a series of LLM calls within a while loop." When performance lags, revisiting prompts often unlocks improvements.

## Production Results

Alice 2.0 went live in January 2025 with impressive metrics: nearly 2 million leads sourced, close to 3 million messages sent, and approximately 21,000 replies generated. The reply rate of around 2% matches human SDR performance, with the team observing improvement as self-learning and other optimizations take effect.

Future plans include integrating Alice with Julian (their voice agent) for multi-channel engagement, further development of self-learning capabilities, and exploration of emerging technologies like computer use, memory, and reinforcement learning.

## Observations and Caveats

While the results are impressive, this case study comes from a company promotional context, so claims should be evaluated accordingly. The 2% reply rate being "on par with human SDRs" is presented without context on email volume, lead quality, or comparison methodology. The three-month timeline is aggressive and reflects both strong execution and the advantages of modern agent frameworks, though it may not be representative for teams without similar resources or vendor relationships.

The architectural journey provides genuine value regardless of promotional intent—the evolution from React to workflow to multi-agent systems illustrates real trade-offs teams face when building production agents.