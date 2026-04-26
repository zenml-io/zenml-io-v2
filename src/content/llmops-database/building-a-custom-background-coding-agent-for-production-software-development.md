---
title: "Building a Custom Background Coding Agent for Production Software Development"
slug: "building-a-custom-background-coding-agent-for-production-software-development"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "error-handling"
  - "latency-optimization"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "cicd"
  - "orchestration"
  - "serverless"
  - "fastapi"
  - "crewai"
  - "anthropic"
  - "openai"
industryTags: "finance"
company: "Ramp"
summary: "Ramp, a fintech company, built Inspect, a custom background coding agent that now generates approximately 40% of their merged pull requests. The team decided to build their own solution rather than use off-the-shelf tools to ensure deep integration with internal tooling and to customize the experience for their specific needs. Using Modal for infrastructure, they implemented sandboxes that spin up in seconds with pre-configured repositories and dependencies refreshed every 30 minutes. The system has enabled not just engineers but also product managers and designers to ship code, with agents increasingly handling the full software development lifecycle from writing code to testing and verification. The first prototype took only a few days to build, demonstrating the feasibility of custom agentic coding solutions for companies committed to AI-driven development."
link: "https://www.youtube.com/watch?v=ii9E5z8Gsrc"
year: 2026
seo:
  title: "Ramp: Building a Custom Background Coding Agent for Production Software Development - ZenML LLMOps Database"
  description: "Ramp, a fintech company, built Inspect, a custom background coding agent that now generates approximately 40% of their merged pull requests. The team decided to build their own solution rather than use off-the-shelf tools to ensure deep integration with internal tooling and to customize the experience for their specific needs. Using Modal for infrastructure, they implemented sandboxes that spin up in seconds with pre-configured repositories and dependencies refreshed every 30 minutes. The system has enabled not just engineers but also product managers and designers to ship code, with agents increasingly handling the full software development lifecycle from writing code to testing and verification. The first prototype took only a few days to build, demonstrating the feasibility of custom agentic coding solutions for companies committed to AI-driven development."
  canonical: "https://www.zenml.io/llmops-database/building-a-custom-background-coding-agent-for-production-software-development"
  ogTitle: "Ramp: Building a Custom Background Coding Agent for Production Software Development - ZenML LLMOps Database"
  ogDescription: "Ramp, a fintech company, built Inspect, a custom background coding agent that now generates approximately 40% of their merged pull requests. The team decided to build their own solution rather than use off-the-shelf tools to ensure deep integration with internal tooling and to customize the experience for their specific needs. Using Modal for infrastructure, they implemented sandboxes that spin up in seconds with pre-configured repositories and dependencies refreshed every 30 minutes. The system has enabled not just engineers but also product managers and designers to ship code, with agents increasingly handling the full software development lifecycle from writing code to testing and verification. The first prototype took only a few days to build, demonstrating the feasibility of custom agentic coding solutions for companies committed to AI-driven development."
notion:
  pageId: "34ef8dff-2538-8127-9dbf-fc13e6112b65"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:00:23Z"
---

## Overview

Ramp built Inspect, a custom background coding agent that represents a significant production deployment of LLM technology for software development. The system currently powers approximately 40% of merged pull requests at Ramp, a number that has grown from 30% in their blog post to 40% in recent weeks, demonstrating rapid adoption and clear product-market fit within their engineering organization. What makes this case study particularly interesting from an LLMOps perspective is the deliberate decision to build custom infrastructure rather than adopt off-the-shelf solutions, the sophisticated use of cloud infrastructure to match local development performance, and the expansion of the tool's user base beyond traditional software engineers to include product managers and designers.

The project started as somewhat of a moonshot effort, with engineers working on it in their free time, but quickly became core infrastructure as the team recognized both its potential and the industry trajectory toward AI-assisted development. The fact that the first prototype took only a few days to build is noteworthy, suggesting that the barrier to entry for custom agentic coding solutions may be lower than many organizations assume. This rapid prototyping was followed by months of iteration focused on customization and UX refinement to make it effective for Ramp's diverse builder community.

## Strategic Decision: Build vs. Buy

The team at Ramp made a conscious decision to build their own coding agent rather than use existing solutions. The primary motivation was treating AI coding assistance as critical infrastructure that needed to be deeply integrated with both internal and third-party tooling. By building it themselves, they gained end-to-end control over the integration story, could customize responses, and could ensure the data inputs were highly specific to their needs. This represents an important LLMOps consideration: when AI systems become mission-critical infrastructure, the control and customization benefits of building custom solutions may outweigh the convenience of off-the-shelf tools.

The team emphasized that this investment didn't require enormous resources—the first working API and coding agent prototype was operational in just a few days. This suggests that companies with sufficient AI ambition should seriously consider custom solutions tailored to their specific workflows and tooling ecosystems. The customization enabled by this approach has been central to Inspect's success, allowing it to integrate seamlessly into Ramp's development workflows.

## Infrastructure and Architecture

The infrastructure architecture represents a sophisticated approach to LLMOps for coding agents, with Modal serving as the core platform. Modal provides the ability to spin up sandboxes and containers rapidly, which was essential for matching the performance characteristics of local development environments. The team uses virtually the entire Modal API, including functions, snapshots, dictionaries, and Modal queues, demonstrating a comprehensive deployment of the platform's capabilities.

A key innovation is the snapshot-based approach to repository management. Every 30 minutes, a Modal cron job clones all of Ramp's repositories, installs dependencies, and creates snapshots in a ready-to-go state for the coding agent. When a user sends a prompt to Inspect, the system grabs the most recent snapshot and only needs to synchronize the last 30 minutes of git commits rather than cloning entire repositories from scratch. This architectural decision dramatically reduces startup time, typically getting agents started on requests in 10 seconds or less. This performance optimization is crucial for user adoption—if the system took minutes to spin up, it would fail to accelerate builder productivity.

The use of file snapshots effectively creates a warm page cache in the cloud, mimicking one of the key advantages that local coding agents have over background agents. The team identified that local agents typically have significant advantages: repositories are already cloned, users are only a few commits off from master, they're logged into applications, the page cache is warm, and services are already running. By systematically addressing each of these advantages through infrastructure choices, Ramp has designed Inspect to eliminate the traditional performance gap between local and background agents.

The team also makes heavy use of Modal's secrets management capabilities, ensuring that the agent has access to the same credentials and tools that a developer would have locally. This comprehensive setup effectively gives every builder at Ramp access to hundreds of cloud computers that can work simultaneously, enabling a level of parallelization that would be impossible with purely local development.

## User Experience and Accessibility

A critical aspect of Inspect's LLMOps implementation is the multi-modal interface design. Rather than forcing users into a single interaction pattern, Ramp built multiple clients: a chat interface through a website, a Slack interface, and a Chrome extension. The philosophy was to put tools where builders actually live rather than requiring them to adopt new workflows. This distribution strategy proved essential for rapid adoption within the organization.

Particularly interesting is the emphasis on making coding accessible to non-engineering builders. Product managers and designers now have access to Inspect with no local setup required. They simply send a prompt, and the system spins up sandboxes and containers with all dependencies installed, providing them with the exact same developer setup that engineers have locally but available in seconds without any configuration burden. This democratization of coding capabilities represents a significant shift in how product development teams can operate, allowing non-engineers to ship smaller features and make UI tweaks without consuming engineering resources.

The early users from the non-engineering builder community were particularly enthusiastic, as they had previously had access to tools like Claude Code but found Inspect more accessible and better integrated into their workflows. The fact that 40% of merged PRs now come from Inspect, with many going in with no human intervention aside from code review, suggests that the UX design has successfully lowered barriers to adoption.

## Agent Capabilities and Parallelization

One of the most sophisticated aspects of Inspect from an LLMOps perspective is its ability to parallelize work through child sessions. The agent can decide to clone itself and work on multiple tasks simultaneously, spinning up multiple PRs in parallel. This is implemented by giving Inspect itself a tool that can spawn another Inspect session using the pre-built Modal images. The agent understands that it's working inside the Inspect system and can determine when parallel execution would be more efficient than sequential execution.

This parallelization capability mirrors how human software development teams work—multiple people working on different features simultaneously—and represents a more sophisticated agentic architecture than simple single-threaded coding assistants. The infrastructure enables this by making it trivial to spin up multiple sandboxes quickly, each with access to the same repository snapshots and tooling.

Interestingly, Inspect is now being used to develop itself, with approximately 80% of pull requests to the Inspect codebase written by Inspect. This recursive self-improvement loop accelerates iteration on the tool and demonstrates confidence in the agent's capabilities. The higher percentage for Inspect's own codebase compared to the 40% for Ramp's main application reflects an important LLMOps insight: coding agents perform better on smaller, newer codebases with modern frameworks and libraries that are well-represented in pre-training data, compared to larger codebases with legacy abstractions and obscure libraries.

## Verification and Full Lifecycle Coverage

A significant LLMOps challenge that Ramp is actively addressing is moving beyond just writing code to handling the full development lifecycle. The team recognizes that many coding agents only do about 50% of the work, leaving substantial reviewer burden to read code, verify correctness, perform integration testing, and for frontend changes, visually inspect results. Ramp has tried to make Inspect handle as much of this verification work as possible so that reviewers can simply glance at PRs and click merge.

To enable this comprehensive testing and verification, the team needed to create what they call "Ramp in a box"—the ability to spin up complete instances of Ramp's services quickly and on-demand. Modal's infrastructure capabilities have been essential for this, allowing them to spin up sandboxes with multiple services and data quickly. This represents a sophisticated production deployment where the LLM-powered agent isn't just generating code but is also executing tests, running services, and verifying its own work.

The goal is to minimize the cognitive burden on human reviewers, which is essential for the 40% merge rate to be sustainable. If every Inspect PR required extensive manual testing, the productivity gains would be limited. By investing in automated verification capabilities, Ramp is building a truly production-grade agentic system.

## Code Style and Agent-Human Collaboration

An interesting LLMOps consideration that emerged is that code written by agents differs from human-written code, but this doesn't necessarily make it worse—it's simply different. The team is working on accepting that they need a codebase that is amenable to both agents and humans working together. This involves letting go of some previous biases about what makes code great for humans and ensuring that the codebase is accessible to both agents and human developers. This represents a cultural and technical shift in how engineering organizations think about code quality and standards.

The team is also working on providing agents with better context about internal abstractions and patterns. They've given Inspect access to extensive documentation about Ramp's internal design system, examples of proper usage patterns, and instructions about patterns to avoid. This context provisioning—whether through MCP (Model Context Protocol), skills, or other mechanisms—is described as documentation written for agents to understand. Interestingly, this investment has dual benefits: not only does it improve agent performance, but it also benefits human developers by reducing information silos and improving overall documentation quality.

## Model and Infrastructure Evolution

The case study touches on important temporal aspects of LLMOps. The team emphasizes that what they've built would not have been possible three years ago, both from an infrastructure and model capability perspective. The current generation of models has reached a point where they can understand complex frameworks like Tailwind, and they're rapidly approaching the ability to understand internal component libraries and custom abstractions.

The team's advice for other companies is to be fearless and continuously experiment, trying ambitious projects every few months as models improve. Model capabilities are growing very quickly, but the level of ambition in what companies are attempting to build may not be keeping pace. Every few months, new models can one-shot more complex PRs or bigger features, and eventually may be able to build full applications. This means companies should continuously re-evaluate what's possible and increase the ceiling of their ambitions accordingly.

The team also notes that they're using Inspect and AI tools to build Inspect itself, creating a virtuous cycle of improvement. The fact that a frontend engineer by trade was able to quickly get started with Modal's infrastructure primitives suggests that good developer experience and clear documentation make sophisticated LLMOps deployments accessible to a broader range of engineers.

## Production Impact and Future Direction

The production impact is substantial: 40% of merged pull requests originated from Inspect, with that number trending upward. The system has freed engineers to work on larger features requiring deeper engineering insight while enabling product managers and designers to ship smaller features and make tweaks independently. This represents a fundamental shift in how product development operates at Ramp.

Looking forward, Ramp is focused on integrating Inspect into the full product development lifecycle, ensuring it can work natively across multiple repositories and comprehensively verify its work. They're also exploring making Inspect a flexible tool for all builders and extending it beyond code generation to answering questions about how Ramp works, treating code as documentation and the source of truth. This vision of code-as-documentation accessed through natural language interfaces represents another dimension of how LLMs are transforming software development.

The team's emphasis on trying things quickly and identifying gaps is a valuable LLMOps lesson. Rather than asking whether AI can do something, they advocate for attempting it and discovering the specific limitations—usually related to missing access or primitives—and then building what's needed to close those gaps. This bias toward experimentation and rapid iteration, enabled by infrastructure that makes spinning up new capabilities cheap and fast, represents a mature approach to LLMOps.

Finally, the case study highlights important considerations about where agents provide the most value. The benefits are unevenly distributed: smaller, newer codebases with standard frameworks see more benefit than large legacy codebases with obscure libraries and non-standard patterns. This is reflected in the 80% PR rate for Inspect's own codebase versus 40% for Ramp's main application. The team is actively working on ways to bring more of the larger application's development under Inspect's umbrella, likely through better context provisioning and documentation strategies.
