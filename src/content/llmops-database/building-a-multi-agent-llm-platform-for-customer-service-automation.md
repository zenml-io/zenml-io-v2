---
title: "Building a Multi-Agent LLM Platform for Customer Service Automation"
slug: "building-a-multi-agent-llm-platform-for-customer-service-automation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67bc3737b484a0120f0b5cda"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:01:35.055Z"
  createdOn: "2025-02-24T09:09:11.949Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "structured-output"
  - "regulatory-compliance"
  - "multi-agent-systems"
  - "rag"
  - "prompt-engineering"
  - "error-handling"
  - "system-prompts"
  - "human-in-the-loop"
  - "latency-optimization"
  - "kubernetes"
  - "docker"
  - "microservices"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "monitoring"
  - "cicd"
  - "scaling"
  - "microsoft-azure"
  - "openai"
  - "google-gcp"
industryTags: "telecommunications"
company: "Deutsche Telekom"
summary: "Deutsche Telekom developed a comprehensive multi-agent LLM platform to automate customer service across multiple European countries and channels. They built their own agent computing platform called LMOS to manage agent lifecycles, routing, and deployment, moving away from traditional chatbot approaches. The platform successfully handled over 1 million customer queries with an 89% acceptable answer rate and showed 38% better performance compared to vendor solutions in A/B testing."
link: "https://www.infoq.com/presentations/ai-agents-platform/?topicPageSponsorship=88befbbd-30f0-4d18-9d43-0bf2cb3e751d"
year: 2023
seo:
  title: "Deutsche Telekom: Building a Multi-Agent LLM Platform for Customer Service Automation - ZenML LLMOps Database"
  description: "Deutsche Telekom developed a comprehensive multi-agent LLM platform to automate customer service across multiple European countries and channels. They built their own agent computing platform called LMOS to manage agent lifecycles, routing, and deployment, moving away from traditional chatbot approaches. The platform successfully handled over 1 million customer queries with an 89% acceptable answer rate and showed 38% better performance compared to vendor solutions in A/B testing."
  canonical: "https://www.zenml.io/llmops-database/building-a-multi-agent-llm-platform-for-customer-service-automation"
  ogTitle: "Deutsche Telekom: Building a Multi-Agent LLM Platform for Customer Service Automation - ZenML LLMOps Database"
  ogDescription: "Deutsche Telekom developed a comprehensive multi-agent LLM platform to automate customer service across multiple European countries and channels. They built their own agent computing platform called LMOS to manage agent lifecycles, routing, and deployment, moving away from traditional chatbot approaches. The platform successfully handled over 1 million customer queries with an 89% acceptable answer rate and showed 38% better performance compared to vendor solutions in A/B testing."
---

## Overview

Deutsche Telekom's AI Competence Center (AICC) embarked on an ambitious journey to deploy GenAI-powered customer service automation across their European footprint, serving approximately 100 million customers in 10 countries through multiple channels including chat and voice. The project, known as "Frag Magenta 1BOT," required solving complex challenges around scaling LLM applications across diverse languages, business processes, and APIs. Rather than taking a rudimentary approach with existing frameworks, the team decided to build a comprehensive open-source platform called LMOS (Language Models Operating System) that brings enterprise-grade constructs to agent development and deployment.

## Problem Space and Initial Challenges

When the team began their journey in mid-2023, they faced several significant challenges. LangChain was the primary framework available for building RAG applications, but nothing suitable existed in the JVM ecosystem that could scale to their requirements. Deutsche Telekom had substantial investments in JVM-based systems with existing SDKs and client libraries, making a Python-first approach less desirable. Additionally, most LLM models at the time were not considered production-ready by their providers, who advised against putting them directly in front of customers without human-in-the-loop oversight.

The team recognized early that a simple approach of building functions on top of prompts would not scale across all their target countries with different business processes and API specifications. They needed to consider what developer skillsets would be required, how to handle the non-deterministic nature of LLMs, and how to build applications where token streams could reliably control program flow—a paradigm shift from classical computing.

## Architectural Decisions and Multi-Agent Design

The team adopted a multi-agent architecture where a single customer-facing chatbot interfaces with multiple backend agents, each focusing on a specific business domain (billing, contracts, etc.) and running as an isolated microservice. An agent router sits in front of these agents, directing incoming requests based on intent. This design was driven by two key factors: the need to scale the number of teams working in parallel on different agents, and the concept of "prompt Jenga"—the fragility of LLM prompts where any change risks breaking the entire system. With isolated agents, the worst case scenario is breaking a single agent rather than collapsing the entire chatbot.

The architecture includes a search API layer where all RAG pipelines reside, meaning individual agents don't need to handle complex retrieval logic themselves. This separation of concerns simplifies agent development significantly.

## The LMOS Platform Stack

The platform evolved through several layers designed to address different concerns:

**LMOS Kernel**: The foundational layer handling low-level constructs like prompting optimization, memory management, and LLM interactions. This includes capabilities for parallel execution of checks (PII detection, injection detection) and step-chain processing.

**LMOS ARC (Agents Reactor)**: A Kotlin DSL designed for rapid agent development that combines the simplicity of low-code solutions with enterprise framework power. The team chose Kotlin for its DSL capabilities, advanced concurrency constructs, and compatibility with existing JVM investments. ARC allows agents to be defined in just two script files.

**LMOS Control Plane**: Built on Kubernetes and Istio, this provides agent lifecycle management through Custom Resource Definitions (CRDs). Agents and channels become first-class citizens in the Kubernetes ecosystem, enabling familiar tooling for deployment and management.

**LMOS Router**: Handles dynamic, intent-based routing between agents. Unlike traditional weight-based or canary routing, the router can bootstrap itself based on capabilities advertised by agents when they're deployed.

**LMOS Runtime**: Bootstraps systems with the required agents for particular channels or use cases.

## Agent Development with ARC DSL

The ARC DSL significantly reduces the barrier to entry for agent development. An agent definition includes metadata (name, description), model configuration (transitioning to GPT-4o with temperature set to 0 and static seed for reproducibility), input/output filters for validation and augmentation, and tool definitions for extending agent functionality.

Key features demonstrated include:

**System Prompts**: Dynamically generated per request, allowing customization for each customer, country (NatCo), or channel. The team emphasizes concise instructions and explicitly tells the LLM to answer briefly, which combined with low temperature settings reduces surplus information and hallucinations.

**Knowledge Blocks**: Rather than relying heavily on RAG, most agents inject one or two pages of curated knowledge directly into prompts. With modern LLMs having 100,000+ character context windows, this approach simplifies development significantly.

**Filters**: Input filters can detect customer requests for human agents or hacking attempts (using LLMs themselves for detection), throwing exceptions to halt agent execution. Output filters clean up formatting artifacts (back ticks from Markdown/JSON mixing), verify fabricated links using regex extraction, and detect when the LLM cannot answer, triggering fallback to FAQ/RAG agents.

**Tool Definitions**: Functions like get_bills, get_contracts with descriptions that help LLMs determine when to call them. The framework includes automatic handling of user authentication tokens and a sensitive data flag that triggers higher security constructs. Critically, personal data like IBANs is anonymized before being passed to the LLM and deanonymized only in the final response.

**Dialog Flow**: Steps can be defined to guide LLM behavior, preventing it from overwhelming users with all available information at once (e.g., asking whether the customer wants mobile or fixed line bill information before presenting options).

## Deployment and Operations

Agents are packaged as Docker images and deployed via Helm charts. The platform uses Kubernetes Custom Resources to manage agent lifecycle, with channels grouping agents for specific systems like Frag Magenta. When an agent is deployed advertising certain capabilities (e.g., "can handle news summary use cases"), the router automatically discovers it and adjusts routing for appropriate channels—no manual routing configuration required.

The platform supports tenant and channel management, allowing agents to be deployed only for specific countries or channels (web, app, voice). This enables gradual rollouts, starting with perhaps 1-2% of customers to gather feedback before wider deployment.

## Testing and Quality Assurance

The team acknowledges that testing LLM applications remains a significant challenge. Their approach combines several strategies:

Human annotators were essential at the start since no fully automated technique exists to detect hallucinations or risky answers with complete reliability. As flagged questions accumulate, they form test cases that run against new agent releases in a continual iteration process.

The platform's guardrails (hacking detection, PII handling, link verification) are absorbed at the platform level so individual developers don't need to implement them. Reducing the perimeter of what each agent can do also makes testing more tractable.

The isolated microservice architecture limits blast radius when something breaks—which, as they candidly admit, often isn't discovered until too late. Quick intervention capabilities allow fixes to be deployed within hours when issues are detected.

## Results and Performance

The platform has delivered impressive results:

- Over 1 million questions answered with 89% acceptable answer rate
- More than 300,000 human-agent conversations deflected with risk rate under 2%
- 38% better agent handover performance compared to vendor LLM products in A/B production testing
- Agent development time reduced from 2 months to 10 days
- New use case/feature development reduced from weeks to 2.5 days
- Release cadence improved from 1 per month to 2 per week in production

The team ran an initiative called "F9" (inspired by SpaceX's Falcon 9) that brought development time down to 12 days per agent, enabling 12 use cases to be released in a single month.

## Open Source and Future Vision

LMOS has been fully open-sourced, with the team explicitly designing for extensibility. The platform isn't locked to ARC agents—it can run Python, LangChain, or LlamaIndex agents as long as they follow the runtime specifications. The vision encompasses four computing layers: foundational abstractions, single agent abstractions, agent lifecycle management, and multi-agent collaboration—designed to enable a "sovereign" ecosystem of agents rather than dependence on closed vendor platforms.

## Key Takeaways

The team emphasizes that despite the hype around LLMs, much of traditional software engineering still applies—"LLMs is just another API to integrate." However, they acknowledge a new breed of "LLM engineer" is emerging, with prompt engineering becoming a significant skill (500+ hours spent on prompt refinement). For enterprises, the key insight is to platformify these capabilities rather than having multiple teams solve the same problems independently, enabling democratization while handling hard concerns at the platform level.